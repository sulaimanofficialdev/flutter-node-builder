const db = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const { type, location, ownership, status, page = 1, limit = 20 } = req.query;
    
    const where = {};
    if (type) where.type = type;
    if (location) where.location = location;
    if (ownership) where.ownership = ownership;
    if (status) where.status = status;

    const offset = (page - 1) * limit;

    const { count, rows: properties } = await db.Property.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      properties,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error('Get properties error:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
};

exports.getById = async (req, res) => {
  try {
    const property = await db.Property.findByPk(req.params.id, {
      include: [{ model: db.Transaction, as: 'transactions' }],
    });

    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    res.json({ property });
  } catch (error) {
    console.error('Get property error:', error);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
};

exports.create = async (req, res) => {
  try {
    const property = await db.Property.create(req.body);
    res.status(201).json({
      message: 'Property created successfully',
      property,
    });
  } catch (error) {
    console.error('Create property error:', error);
    res.status(500).json({ error: 'Failed to create property' });
  }
};

exports.update = async (req, res) => {
  try {
    const property = await db.Property.findByPk(req.params.id);
    
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    await property.update(req.body);
    
    res.json({
      message: 'Property updated successfully',
      property,
    });
  } catch (error) {
    console.error('Update property error:', error);
    res.status(500).json({ error: 'Failed to update property' });
  }
};

exports.delete = async (req, res) => {
  try {
    const property = await db.Property.findByPk(req.params.id);
    
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    await property.destroy();
    
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Delete property error:', error);
    res.status(500).json({ error: 'Failed to delete property' });
  }
};

exports.getIncomeReport = async (req, res) => {
  try {
    const { year, month, location } = req.query;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const where = { status: 'active' };
    if (location) where.location = location;

    const properties = await db.Property.findAll({
      where,
      include: [{
        model: db.Transaction,
        as: 'transactions',
        where: {
          date: { [Op.between]: [startDate, endDate] },
        },
        required: false,
      }],
    });

    const report = properties.map(prop => {
      const transactions = prop.transactions || [];
      const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);
      const expenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + parseFloat(t.amount), 0);

      return {
        property: {
          id: prop.id,
          name: prop.name,
          type: prop.type,
          location: prop.location,
          ownership: prop.ownership,
          monthlyRent: prop.monthlyRent,
          monthlyExpenses: prop.monthlyExpenses,
        },
        actualIncome: income,
        actualExpenses: expenses,
        netIncome: income - expenses,
        expectedRent: parseFloat(prop.monthlyRent) || 0,
        variance: income - (parseFloat(prop.monthlyRent) || 0),
      };
    });

    const summary = {
      totalProperties: properties.length,
      totalIncome: report.reduce((sum, r) => sum + r.actualIncome, 0),
      totalExpenses: report.reduce((sum, r) => sum + r.actualExpenses, 0),
      netIncome: report.reduce((sum, r) => sum + r.netIncome, 0),
      byType: {},
      byLocation: {},
    };

    report.forEach(r => {
      const type = r.property.type;
      const loc = r.property.location;
      
      if (!summary.byType[type]) {
        summary.byType[type] = { count: 0, income: 0, expenses: 0 };
      }
      summary.byType[type].count++;
      summary.byType[type].income += r.actualIncome;
      summary.byType[type].expenses += r.actualExpenses;

      if (!summary.byLocation[loc]) {
        summary.byLocation[loc] = { count: 0, income: 0, expenses: 0 };
      }
      summary.byLocation[loc].count++;
      summary.byLocation[loc].income += r.actualIncome;
      summary.byLocation[loc].expenses += r.actualExpenses;
    });

    res.json({ summary, properties: report });
  } catch (error) {
    console.error('Get property income report error:', error);
    res.status(500).json({ error: 'Failed to generate income report' });
  }
};
