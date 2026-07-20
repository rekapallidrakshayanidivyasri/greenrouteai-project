import React from 'react';
import { Thermometer, CloudRain, Wind, Droplets, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function WeatherCard({ weather }) {
  if (!weather) return null;

  return (
    <div className="glass-card p-5 rounded-2xl border border-secondary-500/20 shadow-lg relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-secondary-600 dark:text-secondary-400">Route Corridor Weather</span>
          <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">{weather.location || 'Destination Corridor'}</h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-secondary-50 dark:bg-secondary-950/60 border border-secondary-200 dark:border-secondary-800 text-xs font-bold text-secondary-600 dark:text-secondary-400">
          {weather.condition}
        </div>
      </div>

      {/* Grid Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        
        <div className="bg-white/60 dark:bg-slate-800/60 p-3 rounded-xl border border-gray-100 dark:border-slate-700/60 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">Temperature</div>
            <div className="text-base font-extrabold text-gray-900 dark:text-white">{weather.temperature}°C</div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-slate-800/60 p-3 rounded-xl border border-gray-100 dark:border-slate-700/60 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <CloudRain className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">Rain Prob.</div>
            <div className="text-base font-extrabold text-gray-900 dark:text-white">{weather.rainProbability}%</div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-slate-800/60 p-3 rounded-xl border border-gray-100 dark:border-slate-700/60 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">Wind Speed</div>
            <div className="text-base font-extrabold text-gray-900 dark:text-white">{weather.windSpeed} km/h</div>
          </div>
        </div>

        <div className="bg-white/60 dark:bg-slate-800/60 p-3 rounded-xl border border-gray-100 dark:border-slate-700/60 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400">Humidity</div>
            <div className="text-base font-extrabold text-gray-900 dark:text-white">{weather.humidity}%</div>
          </div>
        </div>

      </div>

      {/* Weather Alerts */}
      {weather.alerts && weather.alerts.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl p-3 text-xs flex items-start gap-2 text-amber-800 dark:text-amber-300">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Live Weather Alert: </span>
            {weather.alerts.join(' • ')}
          </div>
        </div>
      )}
    </div>
  );
}
