const { Sequelize } = require('sequelize');
const config = require('../config/database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
    pool: dbConfig.pool,
  }
);

const db = {};

// Import models
db.User = require('./User')(sequelize, Sequelize.DataTypes);
db.Vehicle = require('./Vehicle')(sequelize, Sequelize.DataTypes);
db.Container = require('./Container')(sequelize, Sequelize.DataTypes);
db.Inventory = require('./Inventory')(sequelize, Sequelize.DataTypes);
db.Customer = require('./Customer')(sequelize, Sequelize.DataTypes);
db.Order = require('./Order')(sequelize, Sequelize.DataTypes);
db.OrderItem = require('./OrderItem')(sequelize, Sequelize.DataTypes);
db.Employee = require('./Employee')(sequelize, Sequelize.DataTypes);
db.Property = require('./Property')(sequelize, Sequelize.DataTypes);
db.Transaction = require('./Transaction')(sequelize, Sequelize.DataTypes);
db.Expense = require('./Expense')(sequelize, Sequelize.DataTypes);

// Define associations
// Container - Vehicle (One-to-Many)
db.Container.hasMany(db.Vehicle, { foreignKey: 'containerId', as: 'vehicles' });
db.Vehicle.belongsTo(db.Container, { foreignKey: 'containerId', as: 'container' });

// Vehicle - Inventory (One-to-Many)
db.Vehicle.hasMany(db.Inventory, { foreignKey: 'vehicleId', as: 'parts' });
db.Inventory.belongsTo(db.Vehicle, { foreignKey: 'vehicleId', as: 'vehicle' });

// Customer - Order (One-to-Many)
db.Customer.hasMany(db.Order, { foreignKey: 'customerId', as: 'orders' });
db.Order.belongsTo(db.Customer, { foreignKey: 'customerId', as: 'customer' });

// Order - OrderItem (One-to-Many)
db.Order.hasMany(db.OrderItem, { foreignKey: 'orderId', as: 'items' });
db.OrderItem.belongsTo(db.Order, { foreignKey: 'orderId', as: 'order' });

// Inventory - OrderItem (One-to-Many)
db.Inventory.hasMany(db.OrderItem, { foreignKey: 'inventoryId', as: 'orderItems' });
db.OrderItem.belongsTo(db.Inventory, { foreignKey: 'inventoryId', as: 'inventory' });

// Employee - Expense (One-to-Many)
db.Employee.hasMany(db.Expense, { foreignKey: 'employeeId', as: 'expenses' });
db.Expense.belongsTo(db.Employee, { foreignKey: 'employeeId', as: 'employee' });

// Property - Transaction (One-to-Many)
db.Property.hasMany(db.Transaction, { foreignKey: 'propertyId', as: 'transactions' });
db.Transaction.belongsTo(db.Property, { foreignKey: 'propertyId', as: 'property' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
