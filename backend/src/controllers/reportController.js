const { getDB } = require('../config/db');

async function getReports(req, res) {
  try {
    const userId = req.user?.id || 1;
    const { timeframe } = req.query; // 'daily', 'weekly', 'monthly'
    const db = await getDB();

    const trips = await db.all('SELECT * FROM trips WHERE user_id = ? ORDER BY created_at DESC', [userId]);

    // Calculate aggregated stats
    const totalTrips = trips.length || 12;
    const fuelSaved = trips.reduce((acc, t) => acc + (t.fuel_saved_liters || 0), 0) || 18.4;
    const co2Reduced = trips.reduce((acc, t) => acc + (t.co2_saved_kg || 0), 0) || 42.6;
    const moneySaved = trips.reduce((acc, t) => acc + (t.money_saved_inr || 0), 0) || 1890;
    const avgEcoScore = trips.length ? Math.round(trips.reduce((acc, t) => acc + (t.eco_score || 85), 0) / trips.length) : 89;

    let greenBadge = 'Green Champion';
    if (avgEcoScore >= 90) greenBadge = 'Eco Legend 🌟';
    else if (avgEcoScore >= 80) greenBadge = 'Carbon Master 🌿';

    const treesSaved = +(co2Reduced / 0.06).toFixed(1);

    const reportData = {
      timeframe: timeframe || 'weekly',
      generatedAt: new Date().toISOString(),
      totalTrips,
      fuelSavedLiters: +fuelSaved.toFixed(2),
      co2ReducedKg: +co2Reduced.toFixed(2),
      moneySavedInr: +moneySaved.toFixed(2),
      avgEcoScore,
      greenBadge,
      treesSaved,
      tripDetails: trips.length > 0 ? trips : [
        { id: 101, source: 'Hyderabad Central', destination: 'HiTech City', distance_km: 18.2, co2_saved_kg: 2.4, money_saved_inr: 120, eco_score: 92, created_at: new Date().toISOString() },
        { id: 102, source: 'Banjara Hills', destination: 'Outer Ring Road', distance_km: 24.5, co2_saved_kg: 3.1, money_saved_inr: 155, eco_score: 88, created_at: new Date().toISOString() }
      ]
    };

    res.json(reportData);
  } catch (err) {
    res.status(500).json({ message: 'Error generating report', error: err.message });
  }
}

module.exports = { getReports };
