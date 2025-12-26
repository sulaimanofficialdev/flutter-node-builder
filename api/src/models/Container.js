module.exports = (sequelize, DataTypes) => {
  const Container = sequelize.define('Container', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    containerNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    bookingNumber: {
      type: DataTypes.STRING,
    },
    shippingLine: {
      type: DataTypes.STRING,
    },
    size: {
      type: DataTypes.ENUM('20ft', '40ft', '40ft_hc'),
      allowNull: false,
    },
    origin: {
      type: DataTypes.STRING,
      defaultValue: 'Japan',
    },
    destination: {
      type: DataTypes.STRING,
      defaultValue: 'Dubai',
    },
    departureDate: {
      type: DataTypes.DATEONLY,
    },
    arrivalDate: {
      type: DataTypes.DATEONLY,
    },
    actualArrivalDate: {
      type: DataTypes.DATEONLY,
    },
    status: {
      type: DataTypes.ENUM('loading', 'in_transit', 'arrived', 'cleared', 'delivered'),
      defaultValue: 'loading',
    },
    shippingCost: {
      type: DataTypes.DECIMAL(12, 2),
    },
    insuranceCost: {
      type: DataTypes.DECIMAL(12, 2),
    },
    customsDuty: {
      type: DataTypes.DECIMAL(12, 2),
    },
    clearanceFees: {
      type: DataTypes.DECIMAL(12, 2),
    },
    transportCost: {
      type: DataTypes.DECIMAL(12, 2),
    },
    totalCost: {
      type: DataTypes.DECIMAL(12, 2),
    },
    currency: {
      type: DataTypes.ENUM('JPY', 'AED', 'USD'),
      defaultValue: 'USD',
    },
    notes: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'containers',
    timestamps: true,
  });

  return Container;
};
