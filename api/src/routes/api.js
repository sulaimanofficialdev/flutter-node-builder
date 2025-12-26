const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const containerController = require('../controllers/containerController');
const inventoryController = require('../controllers/inventoryController');
const customerController = require('../controllers/customerController');
const orderController = require('../controllers/orderController');
const employeeController = require('../controllers/employeeController');
const propertyController = require('../controllers/propertyController');
const transactionController = require('../controllers/transactionController');
const reportController = require('../controllers/reportController');
const { authMiddleware, requireRole } = require('../middleware/auth');

// Apply auth to all routes
router.use(authMiddleware);

// Vehicles
router.get('/vehicles', vehicleController.getAll);
router.get('/vehicles/search', vehicleController.search);
router.get('/vehicles/:id', vehicleController.getById);
router.post('/vehicles', vehicleController.create);
router.put('/vehicles/:id', vehicleController.update);
router.delete('/vehicles/:id', requireRole('admin', 'manager'), vehicleController.delete);

// Containers
router.get('/containers', containerController.getAll);
router.get('/containers/:id', containerController.getById);
router.get('/containers/:id/profit-loss', containerController.getProfitLoss);
router.post('/containers', containerController.create);
router.put('/containers/:id', containerController.update);
router.post('/containers/:id/vehicles', containerController.addVehicle);
router.delete('/containers/:id', requireRole('admin', 'manager'), containerController.delete);

// Inventory
router.get('/inventory', inventoryController.getAll);
router.get('/inventory/search', inventoryController.search);
router.get('/inventory/valuation', inventoryController.getValuation);
router.get('/inventory/low-stock', inventoryController.getLowStock);
router.get('/inventory/:id', inventoryController.getById);
router.post('/inventory', inventoryController.create);
router.put('/inventory/:id', inventoryController.update);
router.delete('/inventory/:id', requireRole('admin', 'manager'), inventoryController.delete);

// Customers
router.get('/customers', customerController.getAll);
router.get('/customers/search', customerController.search);
router.get('/customers/:id', customerController.getById);
router.get('/customers/:id/balance', customerController.getBalance);
router.post('/customers', customerController.create);
router.put('/customers/:id', customerController.update);
router.delete('/customers/:id', requireRole('admin', 'manager'), customerController.delete);

// Orders
router.get('/orders', orderController.getAll);
router.get('/orders/monthly-sales', orderController.getMonthlySales);
router.get('/orders/:id', orderController.getById);
router.post('/orders', orderController.create);
router.put('/orders/:id', orderController.update);
router.patch('/orders/:id/status', orderController.updateStatus);
router.post('/orders/:id/payment', orderController.recordPayment);
router.delete('/orders/:id', requireRole('admin', 'manager'), orderController.delete);

// Employees
router.get('/employees', employeeController.getAll);
router.get('/employees/expense-report', employeeController.getExpenseReport);
router.get('/employees/:id', employeeController.getById);
router.post('/employees', requireRole('admin', 'manager'), employeeController.create);
router.put('/employees/:id', requireRole('admin', 'manager'), employeeController.update);
router.post('/employees/:id/expenses', employeeController.addExpense);
router.delete('/employees/:id', requireRole('admin'), employeeController.delete);

// Properties
router.get('/properties', propertyController.getAll);
router.get('/properties/income-report', propertyController.getIncomeReport);
router.get('/properties/:id', propertyController.getById);
router.post('/properties', requireRole('admin', 'manager'), propertyController.create);
router.put('/properties/:id', requireRole('admin', 'manager'), propertyController.update);
router.delete('/properties/:id', requireRole('admin'), propertyController.delete);

// Transactions
router.get('/transactions', transactionController.getAll);
router.get('/transactions/summary', transactionController.getFinancialSummary);
router.get('/transactions/cash-flow', transactionController.getCashFlow);
router.get('/transactions/balances', transactionController.getAccountBalances);
router.get('/transactions/:id', transactionController.getById);
router.post('/transactions', transactionController.create);
router.put('/transactions/:id', transactionController.update);
router.delete('/transactions/:id', requireRole('admin', 'manager'), transactionController.delete);

// Reports
router.get('/reports/dashboard', reportController.getDashboardStats);
router.get('/reports/container-profit-loss', reportController.getContainerProfitLoss);
router.get('/reports/receivables', reportController.getReceivables);
router.get('/reports/payables', reportController.getPayables);

module.exports = router;
