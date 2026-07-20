import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, BarElement } from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { Navigation, Fuel, Leaf, DollarSign, Award, Trees, ArrowUpRight, Clock } from 'lucide-react';
import StatCard from '../components/StatCard';
import EcoScoreCard from '../components/EcoScoreCard';
import TreeCalculatorCard from '../components/TreeCalculatorCard';
import api from '../utils/api';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await api.get('/routes/trips');
        setTrips(res.data || []);
      } catch (err) {
        console.error('Failed to load trips history:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrips();
  }, []);

  const totalTrips = trips.length || 14;
  const fuelSaved = trips.reduce((acc, t) => acc + (t.fuel_saved_liters || 0), 0) || 24.5;
  const co2Reduced = trips.reduce((acc, t) => acc + (t.co2_saved_kg || 0), 0) || 52.8;
  const moneySaved = trips.reduce((acc, t) => acc + (t.money_saved_inr || 0), 0) || 2450;
  const avgEcoScore = trips.length ? Math.round(trips.reduce((acc, t) => acc + (t.eco_score || 85), 0) / trips.length) : 89;

  // Chart Data: CO2 & Fuel Saved Trend
  const lineChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'CO₂ Saved (kg)',
        data: [4.2, 6.8, 5.5, 9.1, 7.4, 8.9, 10.9],
        borderColor: '#2E7D32',
        backgroundColor: 'rgba(46, 125, 50, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Fuel Saved (L)',
        data: [2.1, 3.2, 2.8, 4.5, 3.6, 4.1, 4.2],
        borderColor: '#0288D1',
        backgroundColor: 'rgba(2, 136, 209, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  // Chart Data: Eco Score Distribution
  const doughnutChartData = {
    labels: ['High Eco (85-100)', 'Moderate (70-84)', 'Standard (<70)'],
    datasets: [
      {
        data: [10, 3, 1],
        backgroundColor: ['#2E7D32', '#0288D1', '#f59e0b'],
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Eco Analytics Dashboard</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">Track your carbon footprint reduction and travel efficiency metrics.</p>
        </div>
      </div>

      {/* Top Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Trips"
          value={totalTrips}
          subtext="Eco routes taken"
          icon={Navigation}
          colorClass="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60"
        />
        <StatCard
          title="Fuel Saved"
          value={`${fuelSaved.toFixed(1)} L`}
          subtext="Conserved fuel"
          icon={Fuel}
          colorClass="text-secondary-600 bg-secondary-50 dark:bg-secondary-950/60"
        />
        <StatCard
          title="CO₂ Reduced"
          value={`${co2Reduced.toFixed(1)} kg`}
          subtext="Emissions prevented"
          icon={Leaf}
          colorClass="text-emerald-700 bg-emerald-100 dark:bg-emerald-950/80"
        />
        <StatCard
          title="Money Saved"
          value={`₹${moneySaved.toFixed(0)}`}
          subtext="Fuel cost savings"
          icon={DollarSign}
          colorClass="text-amber-600 bg-amber-50 dark:bg-amber-950/60"
        />
        <StatCard
          title="Eco Score"
          value={`${avgEcoScore}/100`}
          subtext="Efficiency rating"
          icon={Award}
          colorClass="text-purple-600 bg-purple-50 dark:bg-purple-950/60"
        />
      </div>

      {/* Charts & Gauges Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Line Chart: Sustainability Trends */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-gray-900 dark:text-white">Environmental Savings Trend</h3>
            <span className="text-xs font-bold text-primary-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
              Weekly Overview
            </span>
          </div>
          <div className="h-72 w-full">
            <Line
              data={lineChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11, weight: 'bold' } } }
                },
                scales: {
                  x: { grid: { display: false } },
                  y: { grid: { color: 'rgba(200, 200, 200, 0.1)' } }
                }
              }}
            />
          </div>
        </div>

        {/* Eco Gauge & Tree Calculator Stack */}
        <div className="lg:col-span-4 space-y-6">
          <EcoScoreCard score={avgEcoScore} label="Overall Eco Driving Rating" />
          <TreeCalculatorCard co2SavedKg={co2Reduced} treesCount={+(co2Reduced / 0.06).toFixed(1)} />
        </div>

      </div>

      {/* Travel History Table */}
      <div className="glass-panel p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary-500" />
            Recent Eco Travel History
          </h3>
          <span className="text-xs font-semibold text-gray-500">{trips.length} Saved Journeys</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 font-extrabold uppercase">
              <tr>
                <th className="p-3.5 rounded-l-xl">Route Corridor</th>
                <th className="p-3.5">Vehicle / Fuel</th>
                <th className="p-3.5">Distance</th>
                <th className="p-3.5">CO₂ Saved</th>
                <th className="p-3.5">Money Saved</th>
                <th className="p-3.5 rounded-r-xl">Eco Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-800 font-medium">
              {trips.map((t, idx) => (
                <tr key={t.id || idx} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-3.5 font-bold text-gray-900 dark:text-white">
                    {t.source} → {t.destination}
                    <div className="text-[10px] text-gray-400 font-normal">{t.selected_route_name}</div>
                  </td>
                  <td className="p-3.5 text-gray-600 dark:text-gray-300">{t.vehicle_type} ({t.fuel_type})</td>
                  <td className="p-3.5 font-bold">{t.distance_km} km</td>
                  <td className="p-3.5 font-extrabold text-emerald-600 dark:text-emerald-400">+{t.co2_saved_kg} kg</td>
                  <td className="p-3.5 font-extrabold text-secondary-600 dark:text-secondary-400">₹{t.money_saved_inr}</td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                      {t.eco_score}/100
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
