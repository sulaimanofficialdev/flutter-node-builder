module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    transactionNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.ENUM('income', 'expense', 'transfer'),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(
        'sales', 'purchase', 'shipping', 'customs', 'salary', 'rent', 
        'utilities', 'maintenance', 'insurance', 'tax', 'other'
      ),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.ENUM('JPY', 'AED', 'USD'),
      allowNull: false,
    },
    exchangeRate: {
      type: DataTypes.DECIMAL(10, 4),
      defaultValue: 1,
    },
    amountUSD: {
      type: DataTypes.DECIMAL(14, 2),
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM('cash', 'bank_transfer', 'credit_card', 'check'),
    },
    account: {
      type: DataTypes.ENUM('cash_japan', 'cash_dubai', 'bank_japan', 'bank_dubai'),
    },
    reference: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    propertyId: {
      type: DataTypes.UUID,
      references: {
        model: 'properties',
        key: 'id',
      },
    },
    orderId: {
      type: DataTypes.UUID,
      references: {
        model: 'orders',
        key: 'id',
      },
    },
    containerId: {
      type: DataTypes.UUID,
      references: {
        model: 'containers',
        key: 'id',
      },
    },
    location: {
      type: DataTypes.ENUM('japan', 'dubai'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
      defaultValue: 'completed',
    },
    notes: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'transactions',
    timestamps: true,
  });

  return Transaction;
};
