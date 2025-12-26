module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    orderNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id',
      },
    },
    orderDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'),
      defaultValue: 'pending',
    },
    paymentStatus: {
      type: DataTypes.ENUM('unpaid', 'partial', 'paid', 'refunded'),
      defaultValue: 'unpaid',
    },
    paymentMethod: {
      type: DataTypes.ENUM('cash', 'bank_transfer', 'credit_card', 'credit'),
    },
    subtotal: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },
    discount: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },
    tax: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },
    shippingCost: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    paidAmount: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 0,
    },
    currency: {
      type: DataTypes.ENUM('JPY', 'AED', 'USD'),
      defaultValue: 'AED',
    },
    location: {
      type: DataTypes.ENUM('japan', 'dubai'),
      allowNull: false,
    },
    shippingAddress: {
      type: DataTypes.TEXT,
    },
    notes: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'orders',
    timestamps: true,
  });

  return Order;
};
