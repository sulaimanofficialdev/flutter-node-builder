module.exports = (sequelize, DataTypes) => {
  const Vehicle = sequelize.define('Vehicle', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    chassisNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    make: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    engineType: {
      type: DataTypes.STRING,
    },
    transmission: {
      type: DataTypes.ENUM('automatic', 'manual', 'cvt'),
    },
    color: {
      type: DataTypes.STRING,
    },
    mileage: {
      type: DataTypes.INTEGER,
    },
    purchasePrice: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    purchaseCurrency: {
      type: DataTypes.ENUM('JPY', 'AED', 'USD'),
      defaultValue: 'JPY',
    },
    purchaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    auctionHouse: {
      type: DataTypes.STRING,
    },
    auctionLotNumber: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM('purchased', 'in_transit', 'in_stock', 'dismantling', 'sold', 'scrapped'),
      defaultValue: 'purchased',
    },
    location: {
      type: DataTypes.ENUM('japan', 'dubai'),
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
    },
    containerId: {
      type: DataTypes.UUID,
      references: {
        model: 'containers',
        key: 'id',
      },
    },
  }, {
    tableName: 'vehicles',
    timestamps: true,
  });

  return Vehicle;
};
