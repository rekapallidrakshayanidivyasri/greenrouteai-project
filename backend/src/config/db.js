const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

let dbInstance = null;

async function getDB() {
  if (dbInstance) return dbInstance;

  const dbPath = path.join(__dirname, '../../greenroute.db');
  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      eco_score INTEGER DEFAULT 85,
      total_trips INTEGER DEFAULT 0,
      fuel_saved REAL DEFAULT 0.0,
      co2_reduced REAL DEFAULT 0.0,
      money_saved REAL DEFAULT 0.0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS trips (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      source TEXT NOT NULL,
      destination TEXT NOT NULL,
      vehicle_type TEXT NOT NULL,
      fuel_type TEXT NOT NULL,
      selected_route_name TEXT NOT NULL,
      distance_km REAL NOT NULL,
      duration_mins REAL NOT NULL,
      fuel_used_liters REAL NOT NULL,
      fuel_saved_liters REAL NOT NULL,
      co2_emitted_kg REAL NOT NULL,
      co2_saved_kg REAL NOT NULL,
      money_saved_inr REAL NOT NULL,
      eco_score INTEGER NOT NULL,
      weather_summary TEXT,
      ai_recommendation TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );

    CREATE TABLE IF NOT EXISTS green_badges (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      badge_title TEXT NOT NULL,
      badge_code TEXT NOT NULL,
      description TEXT NOT NULL,
      icon_name TEXT NOT NULL,
      unlocked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    );
  `);

  return dbInstance;
}

module.exports = { getDB };
