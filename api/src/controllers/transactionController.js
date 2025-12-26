const db = require('../models');
const { Op } = require('sequelize');

const generateTransactionNumber = () => {
  const date = new Date();
  const prefix = 'TXN';
  const timestamp = date.getFullYear().toString().slice(-2) +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    date.getDate().toString().padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

exports.getAll = async (req, res) => {
  try {
    const { type, category, location, startDate, endDate, page = 1, limit = 20 } = req.query;
    
    const where = {};
    if (type) where.type = type;
    if (category) where.category = category;
    if (location) where.location = location;
    if (startDate && endDate) {
      where.date = { [Op.between]: [startDate, endDate] };
    }

    const offset = (page - 1) * limit;

    const { count, rows: transactions } = await db.Transaction.findAndCountAll({
      where,
      include: [{ model: db.Property, as: 'property' }],
      limit: parseInt(limit),
      offset,
      order: [['date', 'DESC'], ['createdAt', 'DESC']],
    });

    res.json({
      transactions,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};

exports.getById = async (req, res) => {
  try {
    const transaction = await db.Transaction.findByPk(req.params.id, {
      include: [{ model: db.Property, as: 'property' }],
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({ transaction });
  } catch (error) {
    console.error('Get transaction error:', error);
    res.status(500).json({ error: 'Failed to fetch transaction' });
  }
};

exports.create = async (req, res) => {
  try {
    const transaction = await db.Transaction.create({
      ...req.body,
      transactionNumber: generateTransactionNumber(),
    });
    res.status(201).json({
      message: 'Transaction created successfully',
      transaction,
    });
  } catch (error) {
    console.error('Create transaction error:', error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
};

exports.update = async (req, res) => {
  try {
    const transaction = await db.Transaction.findByPk(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    await transaction.update(req.body);
    
    res.json({
      message: 'Transaction updated successfully',
      transaction,
    });
  } catch (error) {
    console.error('Update transaction error:', error);
    res.status(500).json({ error: 'Failed to update transaction' });
  }
};

exports.delete = async (req, res) => {
  try {
    const transaction = await db.Transaction.findByPk(req.params.id);
    
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    await transaction.destroy();
    
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error('Delete transaction error:', error);
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
};

exports.getFinancialSummary = async (req, res) => {
  try {
    const { year, month, location } = req.query;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const where = {
      date: { [Op.between]: [startDate, endDate] },
      status: 'completed',
    };
    if (location) where.location = location;

    const transactions = await db.Transaction.findAll({ where });

    const summary = {
      period: { year, month, startDate, endDate },
      income: {
        total: 0,
        byCategory: {},
      },
      expense: {
        total: 0,
        byCategory: {},
      },
      netIncome: 0,
      byAccount: {},
      byLocation: {},
    };

    transactions.forEach(txn => {
      const amount = parseFloat(txn.amount);
      const type = txn.type;
      const category = txn.category;
      const account = txn.account;
      const loc = txn.location;

      if (type === 'income') {
        summary.income.total += amount;
        summary.income.byCategory[category] = (summary.income.byCategory[category] || 0) + amount;
      } else if (type === 'expense') {
        summary.expense.total += amount;
        summary.expense.byCategory[category] = (summary.expense.byCategory[category] || 0) + amount;
      }

      if (account) {
        if (!summary.byAccount[account]) {
          summary.byAccount[account] = { income: 0, expense: 0 };
        }
        if (type === 'income') {
          summary.byAccount[account].income += amount;
        } else if (type === 'expense') {
          summary.byAccount[account].expense += amount;
        }
      }

      if (!summary.byLocation[loc]) {
        summary.byLocation[loc] = { income: 0, expense: 0 };
      }
      if (type === 'income') {
        summary.byLocation[loc].income += amount;
      } else if (type === 'expense') {
        summary.byLocation[loc].expense += amount;
      }
    });

    summary.netIncome = summary.income.total - summary.expense.total;

    res.json({ summary, transactionCount: transactions.length });
  } catch (error) {
    console.error('Get financial summary error:', error);
    res.status(500).json({ error: 'Failed to generate financial summary' });
  }
};

exports.getCashFlow = async (req, res) => {
  try {
    const { year, location } = req.query;
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const where = {
      date: { [Op.between]: [startDate, endDate] },
      status: 'completed',
    };
    if (location) where.location = location;

    const transactions = await db.Transaction.findAll({
      where,
      order: [['date', 'ASC']],
    });

    const monthlyData = {};
    for (let m = 0; m < 12; m++) {
      monthlyData[m + 1] = { income: 0, expense: 0, net: 0 };
    }

    transactions.forEach(txn => {
      const month = new Date(txn.date).getMonth() + 1;
      const amount = parseFloat(txn.amount);
      
      if (txn.type === 'income') {
        monthlyData[month].income += amount;
      } else if (txn.type === 'expense') {
        monthlyData[month].expense += amount;
      }
      monthlyData[month].net = monthlyData[month].income - monthlyData[month].expense;
    });

    let runningTotal = 0;
    const cashFlow = Object.entries(monthlyData).map(([month, data]) => {
      runningTotal += data.net;
      return {
        month: parseInt(month),
        ...data,
        cumulativeNet: runningTotal,
      };
    });

    res.json({ year, cashFlow });
  } catch (error) {
    console.error('Get cash flow error:', error);
    res.status(500).json({ error: 'Failed to generate cash flow report' });
  }
};

exports.getAccountBalances = async (req, res) => {
  try {
    const transactions = await db.Transaction.findAll({
      where: { status: 'completed' },
    });

    const balances = {
      cash_japan: 0,
      cash_dubai: 0,
      bank_japan: 0,
      bank_dubai: 0,
    };

    transactions.forEach(txn => {
      const amount = parseFloat(txn.amount);
      const account = txn.account;
      
      if (account && balances.hasOwnProperty(account)) {
        if (txn.type === 'income') {
          balances[account] += amount;
        } else if (txn.type === 'expense') {
          balances[account] -= amount;
        }
      }
    });

    res.json({
      balances,
      total: Object.values(balances).reduce((sum, b) => sum + b, 0),
    });
  } catch (error) {
    console.error('Get account balances error:', error);
    res.status(500).json({ error: 'Failed to fetch account balances' });
  }
};
