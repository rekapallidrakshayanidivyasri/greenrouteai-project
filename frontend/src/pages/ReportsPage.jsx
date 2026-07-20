import React, { useState, useEffect } from 'react';
import { FileText, Download, Fuel, Leaf, DollarSign, Award, Calendar, Trees, Sparkles } from 'lucide-react';
import StatCard from '../components/StatCard';
import { generateEcoReportPDF } from '../utils/pdfReportGenerator';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

export default function ReportsPage() {
  const [timeframe, setTimeframe] = useState('weekly');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchReport() {
      setLoading(true);
      try {
        const res = await api.get(`/reports?timeframe=${timeframe}`);
        setReportData(res.data);
      } catch (err) {
        // Fallback demo report
        setReportData({
          timeframe,
          generatedAt: new Date().toISOString(),
          totalTrips: timeframe === 'daily' ? 3 : (timeframe === 'weekly' ? 14 : 48),
          fuelSavedLiters: timeframe === 'daily' ? 3.4 : (timeframe === 'weekly' ? 24.5 : 98.2),
          co2ReducedKg: timeframe === 'daily' ? 7.8 : (timeframe === 'weekly' ? 52.8 : 215.4),
          moneySavedInr: timeframe === 'daily' ? 345 : (timeframe === 'weekly' ? 2450 : 9800),
          avgEcoScore: 91,
          greenBadge: 'Eco Legend 🌟',
          treesSaved: timeframe === 'daily' ? 0.4 : (timeframe === 'weekly' ? 2.4 : 9.9),
          tripDetails: [
            { id: 1, source: 'Hyderabad Tech City', destination: 'Secunderabad Junction', distance_km: 22.4, co2_saved_kg: 3.2, money_saved_inr: 185, eco_score: 94 },
            { id: 2, source: 'Gachibowli Financial Dist', destination: 'Airport Expressway', distance_km: 35.1, co2_saved_kg: 4.6, money_saved_inr: 260, eco_score: 89 }
          ]
        });
      } finally {
        setLoading(false);
      }
    }
    fetchReport();
  }, [timeframe]);

  const handleDownloadPDF = () => {
    if (reportData) {
      generateEcoReportPDF(reportData, user?.name || 'Eco Traveler');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-primary-600 dark:text-emerald-400 mb-2">
            <FileText className="w-3.5 h-3.5" />
            Sustainability Reports
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Environmental Impact Reports</h1>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Timeframe selector */}
          <div className="bg-gray-100 dark:bg-slate-800 p-1 rounded-xl border border-gray-200 dark:border-slate-700 flex items-center text-xs font-bold">
            {['daily', 'weekly', 'monthly'].map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                  timeframe === t
                    ? 'bg-primary-500 text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary-600'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Download PDF Button */}
          <button
            onClick={handleDownloadPDF}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" /> Download PDF Report
          </button>
        </div>
      </div>

      {/* Metrics Banner */}
      {reportData && (
        <div className="space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Fuel Saved"
              value={`${reportData.fuelSavedLiters} L`}
              subtext={`${timeframe.toUpperCase()} total`}
              icon={Fuel}
              colorClass="text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60"
            />
            <StatCard
              title="Money Saved"
              value={`₹${reportData.moneySavedInr}`}
              subtext="Direct fuel savings"
              icon={DollarSign}
              colorClass="text-secondary-600 bg-secondary-50 dark:bg-secondary-950/60"
            />
            <StatCard
              title="CO₂ Reduced"
              value={`${reportData.co2ReducedKg} kg`}
              subtext="Emissions avoided"
              icon={Leaf}
              colorClass="text-emerald-700 bg-emerald-100 dark:bg-emerald-950/80"
            />
            <StatCard
              title="Green Badge"
              value={reportData.greenBadge}
              subtext="Earned achievement"
              icon={Award}
              colorClass="text-purple-600 bg-purple-50 dark:bg-purple-950/60"
            />
          </div>

          {/* Report Summary Card */}
          <div className="glass-panel p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary-500" />
                {timeframe.toUpperCase()} Eco Journey Log
              </h3>
              <span className="text-xs text-gray-400 font-semibold">
                Generated: {new Date(reportData.generatedAt).toLocaleDateString()}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 font-extrabold uppercase">
                  <tr>
                    <th className="p-3">#</th>
                    <th className="p-3">Origin</th>
                    <th className="p-3">Destination</th>
                    <th className="p-3">Distance</th>
                    <th className="p-3">CO₂ Saved</th>
                    <th className="p-3">Money Saved</th>
                    <th className="p-3">Eco Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-800 font-medium">
                  {reportData.tripDetails.map((t, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/80 dark:hover:bg-slate-800/50">
                      <td className="p-3 font-bold">{idx + 1}</td>
                      <td className="p-3 font-bold text-gray-900 dark:text-white">{t.source}</td>
                      <td className="p-3 font-bold text-gray-900 dark:text-white">{t.destination}</td>
                      <td className="p-3">{t.distance_km} km</td>
                      <td className="p-3 text-emerald-600 dark:text-emerald-400 font-extrabold">+{t.co2_saved_kg} kg</td>
                      <td className="p-3 text-secondary-600 dark:text-secondary-400 font-extrabold">₹{t.money_saved_inr}</td>
                      <td className="p-3 font-black text-primary-600">{t.eco_score}/100</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
