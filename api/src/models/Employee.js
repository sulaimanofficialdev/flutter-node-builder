module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    department: {
      type: DataTypes.ENUM('management', 'sales', 'warehouse', 'logistics', 'finance', 'admin'),
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.ENUM('japan', 'dubai'),
      allowNull: false,
    },
    hireDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    salary: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    salaryCurrency: {
      type: DataTypes.ENUM('JPY', 'AED', 'USD'),
      allowNull: false,
    },
    salaryFrequency: {
      type: DataTypes.ENUM('monthly', 'biweekly', 'weekly'),
      defaultValue: 'monthly',
    },
    status: {
      type: DataTypes.ENUM('active', 'on_leave', 'terminated'),
      defaultValue: 'active',
    },
    visaStatus: {
      type: DataTypes.STRING,
    },
    visaExpiry: {
      type: DataTypes.DATEONLY,
    },
    emergencyContact: {
      type: DataTypes.STRING,
    },
    emergencyPhone: {
      type: DataTypes.STRING,
    },
    notes: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'employees',
    timestamps: true,
  });

  return Employee;
};
