module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('warehouse', 'office', 'showroom', 'residential', 'land'),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.ENUM('japan', 'dubai'),
      allowNull: false,
    },
    size: {
      type: DataTypes.DECIMAL(10, 2),
    },
    sizeUnit: {
      type: DataTypes.ENUM('sqft', 'sqm'),
      defaultValue: 'sqm',
    },
    ownership: {
      type: DataTypes.ENUM('owned', 'rented', 'leased'),
      allowNull: false,
    },
    purchasePrice: {
      type: DataTypes.DECIMAL(14, 2),
    },
    currentValue: {
      type: DataTypes.DECIMAL(14, 2),
    },
    monthlyRent: {
      type: DataTypes.DECIMAL(12, 2),
    },
    monthlyExpenses: {
      type: DataTypes.DECIMAL(12, 2),
    },
    currency: {
      type: DataTypes.ENUM('JPY', 'AED', 'USD'),
      allowNull: false,
    },
    leaseStartDate: {
      type: DataTypes.DATEONLY,
    },
    leaseEndDate: {
      type: DataTypes.DATEONLY,
    },
    status: {
      type: DataTypes.ENUM('active', 'vacant', 'under_maintenance', 'sold'),
      defaultValue: 'active',
    },
    notes: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'properties',
    timestamps: true,
  });

  return Property;
};
