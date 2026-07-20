import React from 'react';
import { Leaf, Award, ShieldCheck } from 'lucide-react';

export default function EcoScoreCard({ score = 85, label = 'Eco Efficiency Score' }) {
  // Determine color theme based on score
  let strokeColor = '#2E7D32'; // Emerald green
  let badgeText = 'Excellent Eco Route';
  let badgeBg = 'bg-emerald-100 text-emerald-800 border-emerald-300';

  if (score < 65) {
    strokeColor = '#e11d48'; // Red
    badgeText = 'High Emission Corridor';
    badgeBg = 'bg-red-100 text-red-800 border-red-300';
  } else if (score < 80) {
    strokeColor = '#0288D1'; // Blue
    badgeText = 'Moderate Eco Efficiency';
    badgeBg = 'bg-blue-100 text-blue-800 border-blue-300';
  }

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-panel p-5 rounded-2xl border border-primary-500/20 flex flex-col items-center justify-center text-center shadow-lg relative">
      <span className="text-[10px] uppercase font-extrabold tracking-wider text-primary-600 dark:text-emerald-400 mb-2">
        {label}
      </span>

      {/* SVG Radial Gauge */}
      <div className="relative w-32 h-32 flex items-center justify-center mb-3">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={radius}
            className="text-gray-200 dark:text-slate-700 stroke-current"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            stroke={strokeColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-gray-900 dark:text-white leading-none">{score}</span>
          <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">/ 100</span>
        </div>
      </div>

      <div className={`px-3 py-1 rounded-full text-xs font-bold border ${badgeBg}`}>
        {badgeText}
      </div>
    </div>
  );
}
