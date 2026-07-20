const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const ecoRoutes = require('./routes/ecoRoutes');
const reportRoutes = require('./routes/reportRoutes');
const userRoutes = require('./routes/userRoutes');
const { getDB } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/routes', ecoRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/users', userRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'GreenRoute AI ClimateTech Service',
    timestamp: new Date().toISOString()
  });
});

// Initialize DB and start server
getDB().then(() => {
  console.log('✓ SQLite Database initialized successfully');
  app.listen(PORT, () => {
    console.log(`🚀 GreenRoute AI Backend running at http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
});
