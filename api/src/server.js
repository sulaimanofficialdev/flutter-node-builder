require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');
const authRoutes = require('./routes/auth');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', apiRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const start = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Database connected');
    await db.sequelize.sync({ alter: true });
    console.log('Models synced');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to start:', error);
    process.exit(1);
  }
};

start();
