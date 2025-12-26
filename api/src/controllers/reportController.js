const db = require('../models');
const { Op } = require('sequelize');

// Dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const { location } = req.query;
    const where = {};
    if (location) where.location = location;

    // Get counts
    const vehicleCount = await db.Vehicle.count({ where });
    const containerCount = await db.Container.count();
    const inventoryCount = await db.Inventory.count({ where });
    const customerCount = await db.Customer.count();
    const employeeCount = await db.Employee.count({ where });
    const propertyCount = await db.Property.count({ where });

    // Get this month's data
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const ordersThisMonth = await db.Order.findAll({
      where: {
        ...where,
        orderDate: { [Op.gte]: startOfMonth },
      },
    });

    const revenue = ordersThisMonth.reduce((sum, o) => sum + parseFloat(o.totalAmount), 0);
    const ordersCount = ordersThisMonth.length;

    // Inventory value
    const inventory = await db.Inventory.findAll({
      where: { ...where, status: 'in_stock' },
    });
    const inventoryValue = inventory.reduce((sum, i) => 
      sum + (parseFloat(i.costPrice) * i.quantity), 0
    );

    res.json({
      vehicles: vehicleCount,
      containers: containerCount,
      inventoryItems: inventoryCount,
      customers: customerCount,
      employees: employeeCount,
      properties: propertyCount,
      monthlyRevenue: revenue,
      monthlyOrders: ordersCount,
      inventoryValue,
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
};

// Container profit/loss report
exports.getContainerProfitLoss = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const where = {};
    if (startDate && endDate) {
      where.arrivalDate = { [Op.between]: [startDate, endDate] };
    }

    const containers = await db.Container.findAll({
      where,
      include: [{
        model: db.Vehicle,
        as: 'vehicles',
        include: [{ model: db.Inventory, as: 'parts' }],
      }],
    });

    const report = containers.map(container => {
      const containerCosts = 
        parseFloat(container.shippingCost || 0) +
        parseFloat(container.insuranceCost || 0) +
        parseFloat(container.customsDuty || 0) +
        parseFloat(container.clearanceFees || 0) +
        parseFloat(container.transportCost || 0);

      const vehicleCosts = container.vehicles.reduce((sum, v) => 
        sum + parseFloat(v.purchasePrice || 0), 0
      );

      const soldParts = container.vehicles.flatMap(v => 
        (v.parts || []).filter(p => p.status === 'sold')
      );
      const unsoldParts = container.vehicles.flatMap(v => 
        (v.parts || []).filter(p => p.status === 'in_stock')
      );

      const revenue = soldParts.reduce((sum, p) => 
        sum + parseFloat(p.sellingPrice || 0) * p.quantity, 0
      );
      const unsoldValue = unsoldParts.reduce((sum, p) => 
        sum + parseFloat(p.costPrice || 0) * p.quantity, 0
      );

      const totalCost = containerCosts + vehicleCosts;
      const realizedPL = revenue - totalCost;
      const projectedPL = revenue + unsoldValue - totalCost;

      return {
        id: container.id,
        containerNumber: container.containerNumber,
        status: container.status,
        arrivalDate: container.arrivalDate,
        vehicleCount: container.vehicles.length,
        containerCosts,
        vehicleCosts,
        totalCost,
        revenue,
        unsoldInventoryValue: unsoldValue,
        realizedProfitLoss: realizedPL,
        projectedProfitLoss: projectedPL,
        margin: totalCost > 0 ? ((realizedPL / totalCost) * 100).toFixed(2) : 0,
      };
    });

    const summary = {
      totalContainers: report.length,
      totalCost: report.reduce((sum, r) => sum + r.totalCost, 0),
      totalRevenue: report.reduce((sum, r) => sum + r.revenue, 0),
      totalUnsoldValue: report.reduce((sum, r) => sum + r.unsoldInventoryValue, 0),
      realizedProfitLoss: report.reduce((sum, r) => sum + r.realizedProfitLoss, 0),
      projectedProfitLoss: report.reduce((sum, r) => sum + r.projectedProfitLoss, 0),
    };

    res.json({ summary, containers: report });
  } catch (error) {
    console.error('Get container P/L report error:', error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
};

// Receivables report
exports.getReceivables = async (req, res) => {
  try {
    const orders = await db.Order.findAll({
      where: {
        paymentStatus: { [Op.ne]: 'paid' },
      },
      include: [{ model: db.Customer, as: 'customer' }],
      order: [['orderDate', 'DESC']],
    });

    const receivables = orders.map(order => ({
      orderId: order.id,
      orderNumber: order.orderNumber,
      customer: order.customer?.name,
      orderDate: order.orderDate,
      totalAmount: order.totalAmount,
      paidAmount: order.paidAmount,
      balance: parseFloat(order.totalAmount) - parseFloat(order.paidAmount),
      paymentStatus: order.paymentStatus,
      daysOutstanding: Math.floor(
        (new Date() - new Date(order.orderDate)) / (1000 * 60 * 60 * 24)
      ),
    }));

    const summary = {
      totalReceivables: receivables.reduce((sum, r) => sum + r.balance, 0),
      orderCount: receivables.length,
      averageOutstandingDays: receivables.length > 0 
        ? Math.round(receivables.reduce((sum, r) => sum + r.daysOutstanding, 0) / receivables.length)
        : 0,
      aging: {
        current: receivables.filter(r => r.daysOutstanding <= 30).reduce((sum, r) => sum + r.balance, 0),
        '31-60': receivables.filter(r => r.daysOutstanding > 30 && r.daysOutstanding <= 60).reduce((sum, r) => sum + r.balance, 0),
        '61-90': receivables.filter(r => r.daysOutstanding > 60 && r.daysOutstanding <= 90).reduce((sum, r) => sum + r.balance, 0),
        'over90': receivables.filter(r => r.daysOutstanding > 90).reduce((sum, r) => sum + r.balance, 0),
      },
    };

    res.json({ summary, receivables });
  } catch (error) {
    console.error('Get receivables error:', error);
    res.status(500).json({ error: 'Failed to fetch receivables' });
  }
};

// Payables report (from expenses)
exports.getPayables = async (req, res) => {
  try {
    const expenses = await db.Expense.findAll({
      where: { status: 'pending' },
      include: [{ model: db.Employee, as: 'employee' }],
      order: [['date', 'DESC']],
    });

    const payables = expenses.map(exp => ({
      id: exp.id,
      employeeName: exp.employee?.name,
      type: exp.type,
      amount: exp.amount,
      currency: exp.currency,
      date: exp.date,
      description: exp.description,
      daysOutstanding: Math.floor(
        (new Date() - new Date(exp.date)) / (1000 * 60 * 60 * 24)
      ),
    }));

    const summary = {
      totalPayables: payables.reduce((sum, p) => sum + parseFloat(p.amount), 0),
      expenseCount: payables.length,
      byType: payables.reduce((acc, p) => {
        acc[p.type] = (acc[p.type] || 0) + parseFloat(p.amount);
        return acc;
      }, {}),
    };

    res.json({ summary, payables });
  } catch (error) {
    console.error('Get payables error:', error);
    res.status(500).json({ error: 'Failed to fetch payables' });
  }
};
