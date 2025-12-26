const db = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const { status, location, containerId, page = 1, limit = 20 } = req.query;
    
    const where = {};
    if (status) where.status = status;
    if (location) where.location = location;
    if (containerId) where.containerId = containerId;

    const offset = (page - 1) * limit;

    const { count, rows: vehicles } = await db.Vehicle.findAndCountAll({
      where,
      include: [{ model: db.Container, as: 'container' }],
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      vehicles,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error('Get vehicles error:', error);
    res.status(500).json({ error: 'Failed to fetch vehicles' });
  }
};

exports.getById = async (req, res) => {
  try {
    const vehicle = await db.Vehicle.findByPk(req.params.id, {
      include: [
        { model: db.Container, as: 'container' },
        { model: db.Inventory, as: 'parts' },
      ],
    });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    res.json({ vehicle });
  } catch (error) {
    console.error('Get vehicle error:', error);
    res.status(500).json({ error: 'Failed to fetch vehicle' });
  }
};

exports.create = async (req, res) => {
  try {
    const vehicle = await db.Vehicle.create(req.body);
    res.status(201).json({
      message: 'Vehicle created successfully',
      vehicle,
    });
  } catch (error) {
    console.error('Create vehicle error:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Chassis number already exists' });
    }
    res.status(500).json({ error: 'Failed to create vehicle' });
  }
};

exports.update = async (req, res) => {
  try {
    const vehicle = await db.Vehicle.findByPk(req.params.id);
    
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    await vehicle.update(req.body);
    
    res.json({
      message: 'Vehicle updated successfully',
      vehicle,
    });
  } catch (error) {
    console.error('Update vehicle error:', error);
    res.status(500).json({ error: 'Failed to update vehicle' });
  }
};

exports.delete = async (req, res) => {
  try {
    const vehicle = await db.Vehicle.findByPk(req.params.id);
    
    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    await vehicle.destroy();
    
    res.json({ message: 'Vehicle deleted successfully' });
  } catch (error) {
    console.error('Delete vehicle error:', error);
    res.status(500).json({ error: 'Failed to delete vehicle' });
  }
};

exports.search = async (req, res) => {
  try {
    const { q } = req.query;
    
    const vehicles = await db.Vehicle.findAll({
      where: {
        [Op.or]: [
          { chassisNumber: { [Op.iLike]: `%${q}%` } },
          { make: { [Op.iLike]: `%${q}%` } },
          { model: { [Op.iLike]: `%${q}%` } },
        ],
      },
      limit: 20,
    });

    res.json({ vehicles });
  } catch (error) {
    console.error('Search vehicles error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
};
