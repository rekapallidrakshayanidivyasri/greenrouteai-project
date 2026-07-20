import React from 'react';
import { Trees, Sparkles, Sprout } from 'lucide-react';

export default function TreeCalculatorCard({ co2SavedKg = 5.2, treesCount = 2.4 }) {
  return (
    <div className="bg-gradient-to-br from-emerald-600 via-primary-700 to-emerald-900 text-white p-5 rounded-2xl shadow-xl border border-emerald-400/30 relative overflow-hidden">
      <div className="absolute -right-6 -bottom-6 opacity-15 pointer-events-none">
        <Trees className="w-40 h-40" />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md">
          <Sprout className="w-5 h-5 text-emerald-300" />
        </div>
        <div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-200">Environmental Impact</span>
          <h4 className="text-base font-extrabold text-white leading-tight">Tree Equivalent Calculator</h4>
        </div>
      </div>

      <div className="my-4 p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-between">
        <div>
          <div className="text-[11px] text-emerald-100">CO₂ Reduced</div>
          <div className="text-xl font-black text-white">{co2SavedKg} kg</div>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-emerald-100">Trees Planted Equivalent</div>
          <div className="text-2xl font-black text-emerald-300 flex items-center justify-end gap-1">
            <Trees className="w-6 h-6 text-emerald-300" />
            {treesCount} Trees
          </div>
        </div>
      </div>

      <p className="text-[11px] text-emerald-100 leading-relaxed">
        🌲 <b>Did you know?</b> Reducing 21.7 kg of CO₂ emissions is equivalent to planting 1 mature tree absorbing carbon for an entire year!
      </p>
    </div>
  );
}
