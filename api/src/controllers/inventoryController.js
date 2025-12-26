const db = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const { category, status, location, page = 1, limit = 20 } = req.query;
    
    const where = {};
    if (category) where.category = category;
    if (status) where.status = status;
    if (location) where.location = location;

    const offset = (page - 1) * limit;

    const { count, rows: inventory } = await db.Inventory.findAndCountAll({
      where,
      include: [{ model: db.Vehicle, as: 'vehicle' }],
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      inventory,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error('Get inventory error:', error);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
};

exports.getById = async (req, res) => {
  try {
    const item = await db.Inventory.findByPk(req.params.id, {
      include: [{ model: db.Vehicle, as: 'vehicle' }],
    });

    if (!item) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }

    res.json({ item });
  } catch (error) {
    console.error('Get inventory item error:', error);
    res.status(500).json({ error: 'Failed to fetch inventory item' });
  }
};

exports.create = async (req, res) => {
  try {
    const item = await db.Inventory.create(req.body);
    res.status(201).json({
      message: 'Inventory item created successfully',
      item,
    });
  } catch (error) {
    console.error('Create inventory error:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'SKU already exists' });
    }
    res.status(500).json({ error: 'Failed to create inventory item' });
  }
};

exports.update = async (req, res) => {
  try {
    const item = await db.Inventory.findByPk(req.params.id);
    
    if (!item) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }

    await item.update(req.body);
    
    res.json({
      message: 'Inventory item updated successfully',
      item,
    });
  } catch (error) {
    console.error('Update inventory error:', error);
    res.status(500).json({ error: 'Failed to update inventory item' });
  }
};

exports.delete = async (req, res) => {
  try {
    const item = await db.Inventory.findByPk(req.params.id);
    
    if (!item) {
      return res.status(404).json({ error: 'Inventory item not found' });
    }

    await item.destroy();
    
    res.json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    console.error('Delete inventory error:', error);
    res.status(500).json({ error: 'Failed to delete inventory item' });
  }
};

exports.search = async (req, res) => {
  try {
    const { q } = req.query;
    
    const items = await db.Inventory.findAll({
      where: {
        [Op.or]: [
          { sku: { [Op.iLike]: `%${q}%` } },
          { partName: { [Op.iLike]: `%${q}%` } },
          { partNumber: { [Op.iLike]: `%${q}%` } },
        ],
      },
      limit: 20,
    });

    res.json({ items });
  } catch (error) {
    console.error('Search inventory error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
};

exports.getValuation = async (req, res) => {
  try {
    const { location } = req.query;
    
    const where = { status: 'in_stock' };
    if (location) where.location = location;

    const inventory = await db.Inventory.findAll({ where });

    const valuation = inventory.reduce((acc, item) => {
      const costValue = parseFloat(item.costPrice) * item.quantity;
      const sellValue = parseFloat(item.sellingPrice || item.costPrice) * item.quantity;
      
      acc.totalCostValue += costValue;
      acc.totalSellValue += sellValue;
      acc.totalItems += item.quantity;
      
      if (!acc.byCategory[item.category]) {
        acc.byCategory[item.category] = { costValue: 0, sellValue: 0, items: 0 };
      }
      acc.byCategory[item.category].costValue += costValue;
      acc.byCategory[item.category].sellValue += sellValue;
      acc.byCategory[item.category].items += item.quantity;
      
      return acc;
    }, { totalCostValue: 0, totalSellValue: 0, totalItems: 0, byCategory: {} });

    res.json({ valuation });
  } catch (error) {
    console.error('Get valuation error:', error);
    res.status(500).json({ error: 'Failed to calculate valuation' });
  }
};

exports.getLowStock = async (req, res) => {
  try {
    const items = await db.Inventory.findAll({
      where: {
        status: 'in_stock',
        quantity: { [Op.lte]: 2 },
      },
      order: [['quantity', 'ASC']],
    });

    res.json({ items });
  } catch (error) {
    console.error('Get low stock error:', error);
    res.status(500).json({ error: 'Failed to fetch low stock items' });
  }
};
