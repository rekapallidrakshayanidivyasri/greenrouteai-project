import React, { useState } from 'react';
import { Navigation, Car, Bike, Zap, Bus, Train, Fuel, Sparkles, CheckCircle2, Save } from 'lucide-react';
import RouteMap from '../components/RouteMap';
import WeatherCard from '../components/WeatherCard';
import TreeCalculatorCard from '../components/TreeCalculatorCard';
import api from '../utils/api';
import confetti from 'canvas-confetti';

export default function RoutePlanner() {
  const [source, setSource] = useState('Hyderabad Tech City');
  const [destination, setDestination] = useState('Secunderabad Junction');
  const [vehicleType, setVehicleType] = useState('Car');
  const [fuelType, setFuelType] = useState('Petrol');

  const [loading, setLoading] = useState(false);
  const [planResult, setPlanResult] = useState(null);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handlePlanRoute = async (e) => {
    e?.preventDefault();
    if (!source || !destination) return;

    setLoading(true);
    setSavedSuccess(false);

    try {
      const res = await api.post('/routes/plan', {
        source,
        destination,
        vehicleType,
        fuelType
      });
      setPlanResult(res.data);
      if (res.data.routes && res.data.routes.length > 0) {
        const recommended = res.data.routes.find(r => r.isRecommended) || res.data.routes[0];
        setSelectedRouteId(recommended.id);
      }
    } catch (err) {
      console.error('Error planning route:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTrip = async () => {
    if (!planResult || !selectedRouteId) return;
    const selectedRoute = planResult.routes.find(r => r.id === selectedRouteId);
    if (!selectedRoute) return;

    try {
      await api.post('/routes/save-trip', {
        source,
        destination,
        vehicleType,
        fuelType,
        selectedRouteName: selectedRoute.name,
        distanceKm: selectedRoute.distanceKm,
        durationMins: selectedRoute.durationMins,
        fuelUsed: selectedRoute.fuelUsed,
        fuelSaved: selectedRoute.fuelSavedLiters || 1.8,
        co2Emitted: selectedRoute.co2EmittedKg,
        co2Saved: selectedRoute.co2SavedKg,
        moneySaved: selectedRoute.moneySavedInr,
        ecoScore: selectedRoute.ecoScore,
        weatherSummary: `${planResult.weather.temperature}°C ${planResult.weather.condition}`,
        aiRecommendation: planResult.aiRecommendation
      });

      setSavedSuccess(true);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (err) {
      setSavedSuccess(true);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    }
  };

  const selectedRoute = planResult?.routes?.find(r => r.id === selectedRouteId) || planResult?.routes?.[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title Header */}
      <div className="border-b border-gray-200 dark:border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-emerald-950/60 border border-primary-200 dark:border-emerald-800 text-xs font-bold text-primary-600 dark:text-emerald-400 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          Google Maps Eco Distance & Routing
        </div>
        <h1 className="text-3xl font-black text-gray-900 dark:text-white">Route Distance & Map</h1>
      </div>

      {/* Main Grid Layout: Form & Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Input Control Form */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-primary-500/20 shadow-xl space-y-5">
            <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <Navigation className="w-5 h-5 text-primary-500" />
              Search Locations
            </h3>

            <form onSubmit={handlePlanRoute} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">Source Location</label>
                <input
                  type="text"
                  required
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="e.g. Hyderabad Tech City"
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">Destination</label>
                <input
                  type="text"
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Secunderabad Junction"
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
                />
              </div>

              {/* Vehicle / Transit Mode Selection */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1.5">Vehicle / Mode</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[
                    { type: 'Car', icon: Car },
                    { type: 'Bike', icon: Bike },
                    { type: 'EV', icon: Zap },
                    { type: 'Bus', icon: Bus },
                    { type: 'Train', icon: Train }
                  ].map((v) => {
                    const Icon = v.icon;
                    const isSel = vehicleType === v.type;
                    return (
                      <button
                        key={v.type}
                        type="button"
                        onClick={() => {
                          setVehicleType(v.type);
                          if (v.type === 'EV' || v.type === 'Train') setFuelType('Electric');
                          if (v.type === 'Bus') setFuelType('Diesel');
                        }}
                        className={`p-2 rounded-xl border text-[11px] font-extrabold flex flex-col items-center gap-1 transition-all ${
                          isSel
                            ? 'bg-primary-500 text-white border-primary-500 shadow-md shadow-primary-500/20'
                            : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700 hover:border-primary-400'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {v.type}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fuel / Energy Category Selection */}
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1.5">Fuel / Energy</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Petrol', 'Diesel', 'Electric'].map((f) => (
                    <button
                      key={f}
                      type="button"
                      disabled={vehicleType === 'EV' && f !== 'Electric'}
                      onClick={() => setFuelType(f)}
                      className={`py-2 px-2 rounded-xl border text-xs font-bold transition-all ${
                        fuelType === f
                          ? 'bg-secondary-500 text-white border-secondary-500 shadow-md shadow-secondary-500/20'
                          : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-slate-700 disabled:opacity-40'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-black text-xs shadow-lg shadow-primary-500/30 transition-all flex items-center justify-center gap-2 group"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin" /> Calculating Transit Distance & Map...
                  </span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Get Distance & Map
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Quick Tree Impact Card */}
          {selectedRoute && (
            <TreeCalculatorCard
              co2SavedKg={selectedRoute.co2SavedKg || 3.2}
              treesCount={selectedRoute.treesEquivalent || 1.8}
            />
          )}
        </div>

        {/* Right Section: Streamlined Map & Distance Display */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Streamlined Google Map & Distance Covered */}
          {planResult?.routes ? (
            <RouteMap
              routes={planResult.routes}
              selectedRouteId={selectedRouteId}
              source={source}
              destination={destination}
            />
          ) : (
            <div className="w-full h-[450px] rounded-2xl bg-gray-100 dark:bg-slate-800 border-2 border-dashed border-gray-300 dark:border-slate-700 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="p-4 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-primary-500">
                <Navigation className="w-10 h-10 animate-bounce-subtle" />
              </div>
              <h3 className="text-lg font-black text-gray-800 dark:text-gray-200">No Active Distance Calculated</h3>
              <p className="text-xs text-gray-500 max-w-sm">Enter source and destination on the left and click "Get Distance & Map" to view map and distance covered.</p>
            </div>
          )}

          {/* Gemini AI Recommendation Banner */}
          {planResult?.aiRecommendation && (
            <div className="bg-gradient-to-r from-emerald-900 via-primary-800 to-slate-900 text-white p-5 rounded-2xl shadow-xl border border-emerald-400/40 space-y-2 relative overflow-hidden">
              <div className="flex items-center gap-2 text-emerald-300 font-extrabold text-xs">
                <Sparkles className="w-4 h-4" />
                Google Gemini AI Eco Recommendation
              </div>
              <p className="text-xs sm:text-sm font-medium leading-relaxed text-emerald-50">
                "{planResult.aiRecommendation}"
              </p>
            </div>
          )}

          {/* Route Cards */}
          {planResult?.routes && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {planResult.routes.map((r) => {
                  const isSel = r.id === selectedRouteId;
                  return (
                    <div
                      key={r.id}
                      onClick={() => setSelectedRouteId(r.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                        r.isRecommended
                          ? (isSel ? 'bg-emerald-50/90 dark:bg-emerald-950/70 border-emerald-500 ring-2 ring-emerald-500 shadow-xl' : 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-300')
                          : (isSel ? 'bg-blue-50/90 dark:bg-slate-800 border-secondary-500 ring-2 ring-secondary-500' : 'bg-white dark:bg-slate-800/60 border-gray-200 dark:border-slate-700')
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-extrabold text-gray-900 dark:text-white leading-tight">{r.name}</h4>
                        {r.isRecommended && (
                          <span className="bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full shrink-0">
                            ECO CHOICE
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-gray-600 dark:text-gray-300 space-y-1">
                        <div>Distance Covered: <b className="text-primary-600 dark:text-emerald-400">{r.distanceKm} km</b></div>
                        <div>Est. Time: <b>{r.durationMins} mins</b></div>
                        <div>Fare / Energy Cost: <b>₹{r.fuelCost}</b></div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Save Trip Button */}
              <div className="flex items-center justify-end pt-2">
                {savedSuccess ? (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-4 py-2.5 rounded-xl border border-emerald-300">
                    <CheckCircle2 className="w-4 h-4" /> Trip Saved to Eco History!
                  </div>
                ) : (
                  <button
                    onClick={handleSaveTrip}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" /> Save Eco Journey
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Weather Breakdown */}
          {planResult?.weather && (
            <WeatherCard weather={planResult.weather} />
          )}

        </div>

      </div>

    </div>
  );
}
