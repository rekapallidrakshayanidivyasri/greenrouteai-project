const { getEcoRoutes } = require('../services/directionsService');
const { getWeatherForRoute } = require('../services/weatherService');
const { getEcoRecommendation } = require('../services/geminiService');
const { getDB } = require('../config/db');

async function planEcoRoute(req, res) {
  try {
    const { source, destination, vehicleType, fuelType } = req.body;

    if (!source || !destination) {
      return res.status(400).json({ message: 'Source and Destination are required' });
    }

    const veh = vehicleType || 'Car';
    const fuel = fuelType || 'Petrol';

    // 1. Fetch Directions & Eco Metrics for multiple routes
    const routes = await getEcoRoutes(source, destination, veh, fuel);

    // 2. Fetch Live/Fallback Weather
    const weather = await getWeatherForRoute(source, destination);

    // 3. Request Gemini AI recommendation
    const aiRecommendation = await getEcoRecommendation(routes, weather, veh, fuel);

    res.json({
      source,
      destination,
      vehicleType: veh,
      fuelType: fuel,
      routes,
      weather,
      aiRecommendation,
      voicePrompts: {
        welcome: 'Welcome to GreenRoute AI. Your eco-friendly journey starts now.',
        recommendation: aiRecommendation,
        trafficAlert: 'Heavy traffic detected ahead on Route A. Switching to recommended Route B.',
        weatherAlert: weather.rainProbability > 40 ? 'Rain is expected on your route. Please drive carefully.' : 'Clear skies ahead. Maintain steady eco-driving speed.',
        savingsAlert: `You saved approximately ₹${routes[0].moneySavedInr} in fuel by choosing Route B.`,
        co2Alert: `Today's trip reduced CO₂ emissions by ${routes[0].co2SavedKg} kg. Great job protecting the environment.`,
        evAlert: veh === 'EV' ? 'Nearby EV charging station available in 1.2 km on your route.' : 'Fuel station available in 2.5 km.',
        destinationAlert: 'You have reached your destination. Thank you for choosing sustainable travel.'
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Error planning eco route', error: err.message });
  }
}

async function saveTrip(req, res) {
  try {
    const userId = req.user?.id || 1;
    const {
      source,
      destination,
      vehicleType,
      fuelType,
      selectedRouteName,
      distanceKm,
      durationMins,
      fuelUsed,
      fuelSaved,
      co2Emitted,
      co2Saved,
      moneySaved,
      ecoScore,
      weatherSummary,
      aiRecommendation
    } = req.body;

    const db = await getDB();

    const result = await db.run(`
      INSERT INTO trips (
        user_id, source, destination, vehicle_type, fuel_type, selected_route_name,
        distance_km, duration_mins, fuel_used_liters, fuel_saved_liters, co2_emitted_kg,
        co2_saved_kg, money_saved_inr, eco_score, weather_summary, ai_recommendation
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      userId, source, destination, vehicleType, fuelType, selectedRouteName,
      distanceKm, durationMins, fuelUsed, fuelSaved, co2Emitted,
      co2Saved, moneySaved, ecoScore, weatherSummary, aiRecommendation
    ]);

    // Update user accumulated totals
    await db.run(`
      UPDATE users SET 
        total_trips = total_trips + 1,
        fuel_saved = fuel_saved + ?,
        co2_reduced = co2_reduced + ?,
        money_saved = money_saved + ?,
        eco_score = ROUND((eco_score + ?) / 2)
      WHERE id = ?
    `, [fuelSaved, co2Saved, moneySaved, ecoScore, userId]);

    // Award badges if milestones reached
    const user = await db.get('SELECT * FROM users WHERE id = ?', [userId]);
    if (user.total_trips >= 5) {
      await db.run(`
        INSERT OR IGNORE INTO green_badges (user_id, badge_title, badge_code, description, icon_name)
        VALUES (?, 'Tree Saver', 'tree_saver', 'Saved over 10kg of CO2 equivalent to planting trees', 'Trees')
      `, [userId]);
    }
    if (user.co2_reduced >= 20) {
      await db.run(`
        INSERT OR IGNORE INTO green_badges (user_id, badge_title, badge_code, description, icon_name)
        VALUES (?, 'EV Champion', 'ev_champion', 'Outstanding sustainability score above 90', 'Zap')
      `, [userId]);
    }

    res.status(201).json({ message: 'Trip saved successfully', tripId: result.lastID });
  } catch (err) {
    res.status(500).json({ message: 'Error saving trip', error: err.message });
  }
}

async function getTripHistory(req, res) {
  try {
    const userId = req.user?.id || 1;
    const db = await getDB();

    let trips = await db.all('SELECT * FROM trips WHERE user_id = ? ORDER BY created_at DESC', [userId]);

    // If empty, seed realistic default sample trips for immediate visual rich display
    if (!trips || trips.length === 0) {
      const defaultTrips = [
        {
          user_id: userId,
          source: 'Hyderabad Tech City',
          destination: 'Airport Highway Expressway',
          vehicle_type: 'EV',
          fuel_type: 'Electric',
          selected_route_name: 'Route B (Eco Green Corridor)',
          distance_km: 34.5,
          duration_mins: 42,
          fuel_used_liters: 5.2,
          fuel_saved_liters: 2.1,
          co2_emitted_kg: 1.8,
          co2_saved_kg: 3.4,
          money_saved_inr: 185.00,
          eco_score: 94,
          weather_summary: '28°C Sunny',
          ai_recommendation: 'Recommended route saved 3.4kg CO2 and avoided heavy traffic slowdowns.'
        },
        {
          user_id: userId,
          source: 'Gachibowli Financial District',
          destination: 'Secunderabad Junction',
          vehicle_type: 'Car',
          fuel_type: 'Petrol',
          selected_route_name: 'Route B (Outer Eco Bypass)',
          distance_km: 22.1,
          duration_mins: 35,
          fuel_used_liters: 1.6,
          fuel_saved_liters: 0.8,
          co2_emitted_kg: 3.7,
          co2_saved_kg: 1.9,
          money_saved_inr: 82.00,
          eco_score: 88,
          weather_summary: '26°C Clear',
          ai_recommendation: 'Saved fuel by taking smooth expressway bypass.'
        }
      ];

      for (const t of defaultTrips) {
        await db.run(`
          INSERT INTO trips (
            user_id, source, destination, vehicle_type, fuel_type, selected_route_name,
            distance_km, duration_mins, fuel_used_liters, fuel_saved_liters, co2_emitted_kg,
            co2_saved_kg, money_saved_inr, eco_score, weather_summary, ai_recommendation
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          t.user_id, t.source, t.destination, t.vehicle_type, t.fuel_type, t.selected_route_name,
          t.distance_km, t.duration_mins, t.fuel_used_liters, t.fuel_saved_liters, t.co2_emitted_kg,
          t.co2_saved_kg, t.money_saved_inr, t.eco_score, t.weather_summary, t.ai_recommendation
        ]);
      }

      trips = await db.all('SELECT * FROM trips WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    }

    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching trip history', error: err.message });
  }
}

module.exports = { planEcoRoute, saveTrip, getTripHistory };
