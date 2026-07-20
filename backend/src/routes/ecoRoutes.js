const express = require('express');
const router = express.Router();
const { planEcoRoute, saveTrip, getTripHistory } = require('../controllers/ecoController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/plan', authenticateToken, planEcoRoute);
router.post('/save-trip', authenticateToken, saveTrip);
router.get('/trips', authenticateToken, getTripHistory);

module.exports = router;
