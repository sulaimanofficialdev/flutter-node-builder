module.exports = (sequelize, DataTypes) => {
  const Inventory = sequelize.define('Inventory', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    partName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    partNumber: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.ENUM('engine', 'transmission', 'body', 'interior', 'electrical', 'suspension', 'brakes', 'other'),
      allowNull: false,
    },
    condition: {
      type: DataTypes.ENUM('new', 'excellent', 'good', 'fair', 'poor'),
      defaultValue: 'good',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    costPrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    sellingPrice: {
      type: DataTypes.DECIMAL(12, 2),
    },
    currency: {
      type: DataTypes.ENUM('JPY', 'AED', 'USD'),
      defaultValue: 'AED',
    },
    location: {
      type: DataTypes.ENUM('japan', 'dubai'),
      allowNull: false,
    },
    warehouseLocation: {
      type: DataTypes.STRING,
    },
    shelfNumber: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('in_stock', 'reserved', 'sold', 'damaged'),
      defaultValue: 'in_stock',
    },
    vehicleId: {
      type: DataTypes.UUID,
      references: {
        model: 'vehicles',
        key: 'id',
      },
    },
    compatibleModels: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    images: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    notes: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'inventory',
    timestamps: true,
  });

  return Inventory;
};
