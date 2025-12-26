module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
    },
    whatsapp: {
      type: DataTypes.STRING,
    },
    company: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.ENUM('retail', 'wholesale', 'garage', 'dealer'),
      defaultValue: 'retail',
    },
    country: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.TEXT,
    },
    taxId: {
      type: DataTypes.STRING,
    },
    creditLimit: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },
    currentBalance: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },
    currency: {
      type: DataTypes.ENUM('JPY', 'AED', 'USD'),
      defaultValue: 'AED',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    notes: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'customers',
    timestamps: true,
  });

  return Customer;
};
