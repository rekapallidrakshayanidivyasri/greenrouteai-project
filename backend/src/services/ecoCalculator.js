/**
 * GreenRoute AI - Eco Calculation Engine
 * Estimates fuel consumption, CO2 emissions, cost, and Eco-Score for routes.
 */

// Fuel Consumption Rates (Liters per 100km or kWh per 100km)
const CONSUMPTION_RATES = {
  Car: {
    Petrol: 7.5,    // 7.5 L / 100km
    Diesel: 6.2,    // 6.2 L / 100km
    Electric: 16.0  // 16 kWh / 100km
  },
  Bike: {
    Petrol: 2.5,    // 2.5 L / 100km
    Diesel: 2.2,    // 2.2 L / 100km
    Electric: 4.5   // 4.5 kWh / 100km
  },
  EV: {
    Electric: 14.0  // 14 kWh / 100km
  },
  Bus: {
    Diesel: 2.2,    // Effective per-passenger equivalent: 2.2 L / 100km
    Electric: 6.5,  // Effective per-passenger equivalent: 6.5 kWh / 100km
    Petrol: 2.8
  },
  Train: {
    Electric: 4.2,  // Effective per-passenger equivalent: 4.2 kWh / 100km
    Diesel: 1.5     // Effective per-passenger equivalent: 1.5 L / 100km
  }
};

// CO2 Emission Factors (kg CO2 per Liter or per kWh)
const EMISSION_FACTORS = {
  Petrol: 2.31,   // kg CO2 per Liter
  Diesel: 2.68,   // kg CO2 per Liter
  Electric: 0.85  // kg CO2 per kWh (based on grid mix emission factor)
};

// Fuel / Ticket Prices (INR per Liter / kWh / per-passenger fare benchmark)
const FUEL_PRICES = {
  Petrol: 102.50,
  Diesel: 89.20,
  Electric: 9.50
};

/**
 * Calculates eco metrics for a given route distance and conditions
 */
function calculateRouteEcoMetrics(distanceKm, durationMins, vehicleType, fuelType, trafficFactor = 1.0, elevationGain = 0) {
  const veh = vehicleType || 'Car';
  let fuelCategory = fuelType || 'Petrol';
  if (veh === 'EV') fuelCategory = 'Electric';
  if (veh === 'Train' && !['Electric', 'Diesel'].includes(fuelCategory)) fuelCategory = 'Electric';
  if (veh === 'Bus' && !['Diesel', 'Electric', 'Petrol'].includes(fuelCategory)) fuelCategory = 'Diesel';

  const baseRate = CONSUMPTION_RATES[veh]?.[fuelCategory] || CONSUMPTION_RATES[veh]?.Diesel || CONSUMPTION_RATES[veh]?.Electric || 7.0;
  
  // Traffic delay increases fuel consumption by up to 35% in heavy stop-and-go
  const trafficImpact = (veh === 'Train') ? 1.0 : (0.85 + (trafficFactor * 0.25));
  const adjustedConsumptionPer100km = baseRate * trafficImpact * (1 + (elevationGain * 0.0005));
  
  const fuelUsed = (distanceKm / 100) * adjustedConsumptionPer100km;
  
  const emissionFactor = EMISSION_FACTORS[fuelCategory] || 2.31;
  const co2Emitted = fuelUsed * emissionFactor;
  
  let unitPrice = FUEL_PRICES[fuelCategory] || 100;
  let fuelCost = fuelUsed * unitPrice;
  if (veh === 'Bus' || veh === 'Train') {
    // Standard per km public transit fare in INR
    fuelCost = distanceKm * (veh === 'Train' ? 0.85 : 1.75);
  }

  // Calculate Eco Score (0 - 100)
  const baselineEmissionKg = distanceKm * 0.173;
  const baselineCost = distanceKm * (7.5 / 100) * FUEL_PRICES.Petrol;

  let ecoScore = Math.round(100 - (co2Emitted / (baselineEmissionKg + 0.01)) * 25 - (trafficFactor - 1.0) * 10);

  // Bonus eco points for public mass transport (Bus & Train)
  if (veh === 'Train') ecoScore += 18;
  if (veh === 'Bus') ecoScore += 12;

  ecoScore = Math.max(30, Math.min(99, ecoScore));

  const co2SavedComparedToWorst = Math.max(0, baselineEmissionKg * 1.4 - co2Emitted);
  const fuelSavedLiters = Math.max(0, (distanceKm / 100 * 9.5) - fuelUsed);
  const moneySaved = Math.max(0, baselineCost * 1.2 - fuelCost);

  // Trees saved equivalent (1 tree absorbs ~21.77 kg CO2 / year = ~0.06 kg / day)
  const treesEquivalent = +(co2SavedComparedToWorst / 0.06).toFixed(1);

  return {
    distanceKm: +distanceKm.toFixed(1),
    durationMins: Math.round(durationMins),
    fuelUsed: +fuelUsed.toFixed(2),
    fuelUnit: fuelCategory === 'Electric' ? 'kWh' : 'Liters',
    fuelCost: +fuelCost.toFixed(2),
    co2EmittedKg: +co2Emitted.toFixed(2),
    co2SavedKg: +co2SavedComparedToWorst.toFixed(2),
    fuelSavedLiters: +fuelSavedLiters.toFixed(2),
    moneySavedInr: +moneySaved.toFixed(2),
    ecoScore,
    treesEquivalent
  };
}

module.exports = { calculateRouteEcoMetrics };
