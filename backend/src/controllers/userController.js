const { getDB } = require('../config/db');

async function getProfile(req, res) {
  try {
    const userId = req.user?.id || 1;
    const db = await getDB();

    let user = await db.get('SELECT id, name, email, eco_score, total_trips, fuel_saved, co2_reduced, money_saved, created_at FROM users WHERE id = ?', [userId]);

    if (!user) {
      user = {
        id: 1,
        name: 'Eco Traveler',
        email: 'demo@greenroute.ai',
        eco_score: 89,
        total_trips: 14,
        fuel_saved: 24.5,
        co2_reduced: 52.8,
        money_saved: 2450.00,
        created_at: new Date().toISOString()
      };
    }

    const badges = await db.all('SELECT * FROM green_badges WHERE user_id = ?', [userId]);

    let greenBadge = 'Sustainability Champion';
    if (user.eco_score >= 90) greenBadge = 'Eco Legend 🌟';
    else if (user.eco_score >= 80) greenBadge = 'Carbon Master 🌿';

    const treesSaved = +(user.co2_reduced / 0.06).toFixed(1);

    res.json({
      user,
      greenBadge,
      treesSaved,
      badges: badges.length > 0 ? badges : [
        { id: 1, badge_title: 'Eco Pioneer', badge_code: 'eco_pioneer', description: 'Joined GreenRoute AI to travel sustainably', icon_name: 'Leaf' },
        { id: 2, badge_title: 'Carbon Cutter', badge_code: 'carbon_cutter', description: 'Saved over 25kg of CO2 emissions', icon_name: 'ShieldCheck' },
        { id: 3, badge_title: 'EV Champion', badge_code: 'ev_champion', description: 'Completed trips using zero-emission energy', icon_name: 'Zap' },
        { id: 4, badge_title: 'Tree Saver', badge_code: 'tree_saver', description: 'Equivalent to planting 15 trees this month', icon_name: 'Trees' }
      ]
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching profile', error: err.message });
  }
}

async function updateProfile(req, res) {
  try {
    const userId = req.user?.id || 1;
    const { name, email } = req.body;
    const db = await getDB();

    await db.run('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, userId]);

    res.json({ message: 'Profile updated successfully', user: { id: userId, name, email } });
  } catch (err) {
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
}

module.exports = { getProfile, updateProfile };
