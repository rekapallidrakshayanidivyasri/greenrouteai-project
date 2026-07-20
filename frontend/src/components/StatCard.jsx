import React from 'react';

export default function StatCard({ title, value, subtext, icon: Icon, colorClass = 'text-primary-500 bg-primary-50 dark:bg-emerald-950/60' }) {
  return (
    <div className="bg-white dark:bg-slate-800/80 p-5 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-between">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">{title}</span>
        <div className="text-2xl font-black text-gray-900 dark:text-white mt-1">{value}</div>
        {subtext && <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">{subtext}</div>}
      </div>
      {Icon && (
        <div className={`p-3 rounded-2xl ${colorClass}`}>
          <Icon className="w-6 h-6" />
        </div>
      )}
    </div>
  );
}
