const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDB } = require('../config/db');
const { JWT_SECRET } = require('../middleware/authMiddleware');

async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const db = await getDB();
    const existing = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (existing) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );

    const userId = result.lastID;
    const token = jwt.sign({ id: userId, email, name }, JWT_SECRET, { expiresIn: '7d' });

    // Insert starter green badges for new user
    await db.run(`
      INSERT INTO green_badges (user_id, badge_title, badge_code, description, icon_name)
      VALUES 
      (?, 'Eco Pioneer', 'eco_pioneer', 'Joined GreenRoute AI to travel sustainably', 'Leaf'),
      (?, 'Carbon Cutter', 'carbon_cutter', 'Planned 1st eco-optimized route', 'ShieldCheck')
    `, [userId, userId]);

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: { id: userId, name, email, eco_score: 85, total_trips: 0 }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user', error: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const db = await getDB();
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        eco_score: user.eco_score,
        total_trips: user.total_trips,
        fuel_saved: user.fuel_saved,
        co2_reduced: user.co2_reduced,
        money_saved: user.money_saved
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err.message });
  }
}

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const db = await getDB();
    const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
    if (!user) {
      return res.status(404).json({ message: 'No account found with this email' });
    }

    res.json({
      message: 'Password reset instructions have been sent to your email address.',
      resetToken: 'demo_reset_token_89712'
    });
  } catch (err) {
    res.status(500).json({ message: 'Error sending password reset', error: err.message });
  }
}

module.exports = { register, login, forgotPassword };
