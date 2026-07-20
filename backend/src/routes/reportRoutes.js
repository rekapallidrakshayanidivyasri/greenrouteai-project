const express = require('express');
const router = express.Router();
const { getReports } = require('../controllers/reportController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, getReports);

module.exports = router;
