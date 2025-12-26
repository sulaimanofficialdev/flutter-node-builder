const db = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const { type, isActive, page = 1, limit = 20 } = req.query;
    
    const where = {};
    if (type) where.type = type;
    if (isActive !== undefined) where.isActive = isActive === 'true';

    const offset = (page - 1) * limit;

    const { count, rows: customers } = await db.Customer.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      customers,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error('Get customers error:', error);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
};

exports.getById = async (req, res) => {
  try {
    const customer = await db.Customer.findByPk(req.params.id, {
      include: [{ model: db.Order, as: 'orders' }],
    });

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    res.json({ customer });
  } catch (error) {
    console.error('Get customer error:', error);
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
};

exports.create = async (req, res) => {
  try {
    const customer = await db.Customer.create(req.body);
    res.status(201).json({
      message: 'Customer created successfully',
      customer,
    });
  } catch (error) {
    console.error('Create customer error:', error);
    res.status(500).json({ error: 'Failed to create customer' });
  }
};

exports.update = async (req, res) => {
  try {
    const customer = await db.Customer.findByPk(req.params.id);
    
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    await customer.update(req.body);
    
    res.json({
      message: 'Customer updated successfully',
      customer,
    });
  } catch (error) {
    console.error('Update customer error:', error);
    res.status(500).json({ error: 'Failed to update customer' });
  }
};

exports.delete = async (req, res) => {
  try {
    const customer = await db.Customer.findByPk(req.params.id);
    
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    await customer.destroy();
    
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Delete customer error:', error);
    res.status(500).json({ error: 'Failed to delete customer' });
  }
};

exports.search = async (req, res) => {
  try {
    const { q } = req.query;
    
    const customers = await db.Customer.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${q}%` } },
          { email: { [Op.iLike]: `%${q}%` } },
          { phone: { [Op.iLike]: `%${q}%` } },
          { company: { [Op.iLike]: `%${q}%` } },
        ],
      },
      limit: 20,
    });

    res.json({ customers });
  } catch (error) {
    console.error('Search customers error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const customer = await db.Customer.findByPk(req.params.id, {
      include: [{
        model: db.Order,
        as: 'orders',
        where: { paymentStatus: { [Op.ne]: 'paid' } },
        required: false,
      }],
    });

    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const outstandingOrders = customer.orders || [];
    const totalOutstanding = outstandingOrders.reduce((sum, order) => 
      sum + (parseFloat(order.totalAmount) - parseFloat(order.paidAmount)), 0
    );

    res.json({
      customer: {
        id: customer.id,
        name: customer.name,
        creditLimit: customer.creditLimit,
        currentBalance: customer.currentBalance,
      },
      outstandingOrders: outstandingOrders.length,
      totalOutstanding,
      availableCredit: parseFloat(customer.creditLimit) - totalOutstanding,
    });
  } catch (error) {
    console.error('Get customer balance error:', error);
    res.status(500).json({ error: 'Failed to fetch balance' });
  }
};
