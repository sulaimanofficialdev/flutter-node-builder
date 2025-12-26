const db = require('../models');
const { Op } = require('sequelize');

const generateOrderNumber = () => {
  const date = new Date();
  const prefix = 'ORD';
  const timestamp = date.getFullYear().toString().slice(-2) +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    date.getDate().toString().padStart(2, '0');
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

exports.getAll = async (req, res) => {
  try {
    const { status, paymentStatus, location, customerId, page = 1, limit = 20 } = req.query;
    
    const where = {};
    if (status) where.status = status;
    if (paymentStatus) where.paymentStatus = paymentStatus;
    if (location) where.location = location;
    if (customerId) where.customerId = customerId;

    const offset = (page - 1) * limit;

    const { count, rows: orders } = await db.Order.findAndCountAll({
      where,
      include: [
        { model: db.Customer, as: 'customer' },
        { model: db.OrderItem, as: 'items' },
      ],
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      orders,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

exports.getById = async (req, res) => {
  try {
    const order = await db.Order.findByPk(req.params.id, {
      include: [
        { model: db.Customer, as: 'customer' },
        { 
          model: db.OrderItem, 
          as: 'items',
          include: [{ model: db.Inventory, as: 'inventory' }]
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

exports.create = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  
  try {
    const { customerId, items, location, paymentMethod, discount = 0, tax = 0, shippingCost = 0, notes } = req.body;

    // Validate customer
    const customer = await db.Customer.findByPk(customerId);
    if (!customer) {
      await transaction.rollback();
      return res.status(404).json({ error: 'Customer not found' });
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const inventory = await db.Inventory.findByPk(item.inventoryId);
      if (!inventory) {
        await transaction.rollback();
        return res.status(404).json({ error: `Inventory item ${item.inventoryId} not found` });
      }
      if (inventory.quantity < item.quantity) {
        await transaction.rollback();
        return res.status(400).json({ error: `Insufficient stock for ${inventory.partName}` });
      }

      const unitPrice = item.unitPrice || inventory.sellingPrice;
      const itemDiscount = item.discount || 0;
      const totalPrice = (unitPrice * item.quantity) - itemDiscount;
      subtotal += totalPrice;

      orderItems.push({
        inventoryId: item.inventoryId,
        quantity: item.quantity,
        unitPrice,
        discount: itemDiscount,
        totalPrice,
      });

      // Reserve inventory
      await inventory.update({ 
        quantity: inventory.quantity - item.quantity,
        status: inventory.quantity - item.quantity === 0 ? 'sold' : inventory.status,
      }, { transaction });
    }

    const totalAmount = subtotal - discount + tax + shippingCost;

    // Create order
    const order = await db.Order.create({
      orderNumber: generateOrderNumber(),
      customerId,
      location,
      paymentMethod,
      subtotal,
      discount,
      tax,
      shippingCost,
      totalAmount,
      notes,
    }, { transaction });

    // Create order items
    for (const item of orderItems) {
      await db.OrderItem.create({
        orderId: order.id,
        ...item,
      }, { transaction });
    }

    await transaction.commit();

    const fullOrder = await db.Order.findByPk(order.id, {
      include: [
        { model: db.Customer, as: 'customer' },
        { model: db.OrderItem, as: 'items' },
      ],
    });

    res.status(201).json({
      message: 'Order created successfully',
      order: fullOrder,
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

exports.update = async (req, res) => {
  try {
    const order = await db.Order.findByPk(req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.update(req.body);
    
    res.json({
      message: 'Order updated successfully',
      order,
    });
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ error: 'Failed to update order' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await db.Order.findByPk(req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.update({ status });
    
    res.json({
      message: 'Order status updated',
      order,
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ error: 'Failed to update order status' });
  }
};

exports.recordPayment = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  
  try {
    const { amount, paymentMethod } = req.body;
    const order = await db.Order.findByPk(req.params.id);
    
    if (!order) {
      await transaction.rollback();
      return res.status(404).json({ error: 'Order not found' });
    }

    const newPaidAmount = parseFloat(order.paidAmount) + parseFloat(amount);
    const paymentStatus = newPaidAmount >= parseFloat(order.totalAmount) ? 'paid' : 
      newPaidAmount > 0 ? 'partial' : 'unpaid';

    await order.update({ 
      paidAmount: newPaidAmount,
      paymentStatus,
      paymentMethod: paymentMethod || order.paymentMethod,
    }, { transaction });

    // Create transaction record
    await db.Transaction.create({
      transactionNumber: `TXN-${Date.now()}`,
      type: 'income',
      category: 'sales',
      amount,
      currency: order.currency,
      date: new Date(),
      paymentMethod,
      orderId: order.id,
      location: order.location,
      description: `Payment for order ${order.orderNumber}`,
    }, { transaction });

    await transaction.commit();
    
    res.json({
      message: 'Payment recorded successfully',
      order,
      newBalance: parseFloat(order.totalAmount) - newPaidAmount,
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Record payment error:', error);
    res.status(500).json({ error: 'Failed to record payment' });
  }
};

exports.delete = async (req, res) => {
  try {
    const order = await db.Order.findByPk(req.params.id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    if (order.status !== 'pending') {
      return res.status(400).json({ error: 'Only pending orders can be deleted' });
    }

    await order.destroy();
    
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Delete order error:', error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
};

exports.getMonthlySales = async (req, res) => {
  try {
    const { year, month, location } = req.query;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const where = {
      orderDate: { [Op.between]: [startDate, endDate] },
      status: { [Op.ne]: 'cancelled' },
    };
    if (location) where.location = location;

    const orders = await db.Order.findAll({
      where,
      include: [{ model: db.Customer, as: 'customer' }],
    });

    const summary = {
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, o) => sum + parseFloat(o.totalAmount), 0),
      paidAmount: orders.reduce((sum, o) => sum + parseFloat(o.paidAmount), 0),
      pendingAmount: orders.reduce((sum, o) => sum + (parseFloat(o.totalAmount) - parseFloat(o.paidAmount)), 0),
      byStatus: {},
      byPaymentStatus: {},
    };

    orders.forEach(order => {
      summary.byStatus[order.status] = (summary.byStatus[order.status] || 0) + 1;
      summary.byPaymentStatus[order.paymentStatus] = (summary.byPaymentStatus[order.paymentStatus] || 0) + 1;
    });

    res.json({ summary, orders });
  } catch (error) {
    console.error('Get monthly sales error:', error);
    res.status(500).json({ error: 'Failed to fetch monthly sales' });
  }
};
