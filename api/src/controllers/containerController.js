const db = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    
    const where = {};
    if (status) where.status = status;

    const offset = (page - 1) * limit;

    const { count, rows: containers } = await db.Container.findAndCountAll({
      where,
      include: [{ model: db.Vehicle, as: 'vehicles' }],
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      containers,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error('Get containers error:', error);
    res.status(500).json({ error: 'Failed to fetch containers' });
  }
};

exports.getById = async (req, res) => {
  try {
    const container = await db.Container.findByPk(req.params.id, {
      include: [{ model: db.Vehicle, as: 'vehicles' }],
    });

    if (!container) {
      return res.status(404).json({ error: 'Container not found' });
    }

    res.json({ container });
  } catch (error) {
    console.error('Get container error:', error);
    res.status(500).json({ error: 'Failed to fetch container' });
  }
};

exports.create = async (req, res) => {
  try {
    const container = await db.Container.create(req.body);
    res.status(201).json({
      message: 'Container created successfully',
      container,
    });
  } catch (error) {
    console.error('Create container error:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Container number already exists' });
    }
    res.status(500).json({ error: 'Failed to create container' });
  }
};

exports.update = async (req, res) => {
  try {
    const container = await db.Container.findByPk(req.params.id);
    
    if (!container) {
      return res.status(404).json({ error: 'Container not found' });
    }

    await container.update(req.body);
    
    res.json({
      message: 'Container updated successfully',
      container,
    });
  } catch (error) {
    console.error('Update container error:', error);
    res.status(500).json({ error: 'Failed to update container' });
  }
};

exports.delete = async (req, res) => {
  try {
    const container = await db.Container.findByPk(req.params.id);
    
    if (!container) {
      return res.status(404).json({ error: 'Container not found' });
    }

    await container.destroy();
    
    res.json({ message: 'Container deleted successfully' });
  } catch (error) {
    console.error('Delete container error:', error);
    res.status(500).json({ error: 'Failed to delete container' });
  }
};

exports.addVehicle = async (req, res) => {
  try {
    const container = await db.Container.findByPk(req.params.id);
    
    if (!container) {
      return res.status(404).json({ error: 'Container not found' });
    }

    const vehicle = await db.Vehicle.findByPk(req.body.vehicleId);
    
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    await vehicle.update({ containerId: container.id });
    
    res.json({
      message: 'Vehicle added to container',
      vehicle,
    });
  } catch (error) {
    console.error('Add vehicle to container error:', error);
    res.status(500).json({ error: 'Failed to add vehicle' });
  }
};

exports.getProfitLoss = async (req, res) => {
  try {
    const container = await db.Container.findByPk(req.params.id, {
      include: [
        { 
          model: db.Vehicle, 
          as: 'vehicles',
          include: [{ model: db.Inventory, as: 'parts' }]
        },
      ],
    });

    if (!container) {
      return res.status(404).json({ error: 'Container not found' });
    }

    // Calculate costs
    const containerCosts = parseFloat(container.totalCost) || 0;
    const vehicleCosts = container.vehicles.reduce((sum, v) => sum + parseFloat(v.purchasePrice || 0), 0);
    const totalCost = containerCosts + vehicleCosts;

    // Calculate revenue from sold parts
    const soldParts = container.vehicles.flatMap(v => 
      v.parts.filter(p => p.status === 'sold')
    );
    const revenue = soldParts.reduce((sum, p) => sum + parseFloat(p.sellingPrice || 0) * p.quantity, 0);

    // Unsold inventory value
    const unsoldParts = container.vehicles.flatMap(v => 
      v.parts.filter(p => p.status === 'in_stock')
    );
    const unsoldValue = unsoldParts.reduce((sum, p) => sum + parseFloat(p.costPrice || 0) * p.quantity, 0);

    res.json({
      container: {
        id: container.id,
        containerNumber: container.containerNumber,
        status: container.status,
      },
      financials: {
        containerCosts,
        vehicleCosts,
        totalCost,
        revenue,
        unsoldInventoryValue: unsoldValue,
        realizedProfitLoss: revenue - totalCost,
        projectedProfitLoss: revenue + unsoldValue - totalCost,
      },
      vehicles: container.vehicles.length,
      soldParts: soldParts.length,
      unsoldParts: unsoldParts.length,
    });
  } catch (error) {
    console.error('Get container P/L error:', error);
    res.status(500).json({ error: 'Failed to calculate profit/loss' });
  }
};
