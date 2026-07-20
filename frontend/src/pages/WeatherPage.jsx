import React, { useState, useEffect } from 'react';
import { CloudSun, Thermometer, Wind, Droplets, CloudRain, AlertTriangle, ShieldCheck, Search } from 'lucide-react';
import WeatherCard from '../components/WeatherCard';
import api from '../utils/api';

export default function WeatherPage() {
  const [city, setCity] = useState('Hyderabad');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    try {
      const res = await api.post('/routes/plan', {
        source: 'Start Location',
        destination: cityName,
        vehicleType: 'Car',
        fuelType: 'Petrol'
      });
      setWeatherData(res.data.weather);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-50 dark:bg-secondary-950/60 border border-secondary-200 dark:border-secondary-800 text-xs font-bold text-secondary-600 dark:text-secondary-400 mb-2">
            <CloudSun className="w-3.5 h-3.5" />
            OpenWeather Corridor Analysis
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Route Weather Intelligence</h1>
        </div>

        {/* Search Bar */}
        <form onSubmit={(e) => { e.preventDefault(); fetchWeather(city); }} className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter destination city..."
              className="pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-secondary-500 focus:outline-none"
            />
          </div>
          <button type="submit" className="px-4 py-2 rounded-xl bg-secondary-500 hover:bg-secondary-600 text-white text-xs font-bold transition-all">
            Analyze
          </button>
        </form>
      </div>

      {weatherData && <WeatherCard weather={weatherData} />}

      {/* Weather Safety Guidelines */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-5 rounded-2xl border border-blue-500/20 space-y-2">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 w-max">
            <CloudRain className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">Rain & Wet Road Optimization</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            Rain increases tire rolling resistance by up to 15%. GreenRoute AI adjusts recommended speed limits to prevent hydroplaning while maintaining maximum fuel efficiency.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-teal-500/20 space-y-2">
          <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 w-max">
            <Wind className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">Aerodynamic Drag Analysis</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            Headwinds over 20 km/h spike fuel burn by 12%. Our algorithm routes around exposed open highway bridges when crosswinds peak.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-orange-500/20 space-y-2">
          <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400 w-max">
            <Thermometer className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">EV Thermal Battery Guard</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
            High ambient temperatures consume extra battery for cabin AC cooling. EV eco routing incorporates shaded arterial expressways.
          </p>
        </div>
      </div>

    </div>
  );
}
