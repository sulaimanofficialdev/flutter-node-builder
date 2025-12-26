const db = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const { department, location, status, page = 1, limit = 20 } = req.query;
    
    const where = {};
    if (department) where.department = department;
    if (location) where.location = location;
    if (status) where.status = status;

    const offset = (page - 1) * limit;

    const { count, rows: employees } = await db.Employee.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
    });

    res.json({
      employees,
      pagination: {
        total: count,
        page: parseInt(page),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error('Get employees error:', error);
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
};

exports.getById = async (req, res) => {
  try {
    const employee = await db.Employee.findByPk(req.params.id, {
      include: [{ model: db.Expense, as: 'expenses' }],
    });

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ employee });
  } catch (error) {
    console.error('Get employee error:', error);
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
};

exports.create = async (req, res) => {
  try {
    const employee = await db.Employee.create(req.body);
    res.status(201).json({
      message: 'Employee created successfully',
      employee,
    });
  } catch (error) {
    console.error('Create employee error:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Employee ID already exists' });
    }
    res.status(500).json({ error: 'Failed to create employee' });
  }
};

exports.update = async (req, res) => {
  try {
    const employee = await db.Employee.findByPk(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await employee.update(req.body);
    
    res.json({
      message: 'Employee updated successfully',
      employee,
    });
  } catch (error) {
    console.error('Update employee error:', error);
    res.status(500).json({ error: 'Failed to update employee' });
  }
};

exports.delete = async (req, res) => {
  try {
    const employee = await db.Employee.findByPk(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    await employee.destroy();
    
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Delete employee error:', error);
    res.status(500).json({ error: 'Failed to delete employee' });
  }
};

exports.addExpense = async (req, res) => {
  try {
    const employee = await db.Employee.findByPk(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const expense = await db.Expense.create({
      ...req.body,
      employeeId: employee.id,
    });

    res.status(201).json({
      message: 'Expense added successfully',
      expense,
    });
  } catch (error) {
    console.error('Add expense error:', error);
    res.status(500).json({ error: 'Failed to add expense' });
  }
};

exports.getExpenseReport = async (req, res) => {
  try {
    const { year, month, location } = req.query;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const where = {};
    if (location) where.location = location;

    const employees = await db.Employee.findAll({
      where,
      include: [{
        model: db.Expense,
        as: 'expenses',
        where: {
          date: { [Op.between]: [startDate, endDate] },
          status: 'paid',
        },
        required: false,
      }],
    });

    const report = employees.map(emp => {
      const expenses = emp.expenses || [];
      const totalExpenses = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
      const salary = parseFloat(emp.salary);
      
      return {
        employee: {
          id: emp.id,
          employeeId: emp.employeeId,
          name: emp.name,
          department: emp.department,
          position: emp.position,
          location: emp.location,
        },
        salary,
        salaryCurrency: emp.salaryCurrency,
        additionalExpenses: totalExpenses,
        totalCost: salary + totalExpenses,
        expenseBreakdown: expenses.reduce((acc, e) => {
          acc[e.type] = (acc[e.type] || 0) + parseFloat(e.amount);
          return acc;
        }, {}),
      };
    });

    const summary = {
      totalEmployees: employees.length,
      totalSalary: report.reduce((sum, r) => sum + r.salary, 0),
      totalAdditionalExpenses: report.reduce((sum, r) => sum + r.additionalExpenses, 0),
      totalCost: report.reduce((sum, r) => sum + r.totalCost, 0),
      byDepartment: {},
      byLocation: {},
    };

    report.forEach(r => {
      const dept = r.employee.department;
      const loc = r.employee.location;
      
      if (!summary.byDepartment[dept]) {
        summary.byDepartment[dept] = { count: 0, totalCost: 0 };
      }
      summary.byDepartment[dept].count++;
      summary.byDepartment[dept].totalCost += r.totalCost;

      if (!summary.byLocation[loc]) {
        summary.byLocation[loc] = { count: 0, totalCost: 0 };
      }
      summary.byLocation[loc].count++;
      summary.byLocation[loc].totalCost += r.totalCost;
    });

    res.json({ summary, employees: report });
  } catch (error) {
    console.error('Get expense report error:', error);
    res.status(500).json({ error: 'Failed to generate expense report' });
  }
};
