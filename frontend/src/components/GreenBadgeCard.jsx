import React from 'react';
import { Leaf, ShieldCheck, Zap, Trees, Award, Star } from 'lucide-react';

const ICON_MAP = {
  Leaf: Leaf,
  ShieldCheck: ShieldCheck,
  Zap: Zap,
  Trees: Trees,
  Award: Award
};

export default function GreenBadgeCard({ badge }) {
  const IconComponent = ICON_MAP[badge.icon_name] || Award;

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700/60 shadow-md hover:shadow-lg transition-all flex items-start gap-3 group">
      <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-primary-500 border border-emerald-200 dark:border-emerald-800 group-hover:scale-110 transition-transform">
        <IconComponent className="w-6 h-6" />
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <h4 className="text-sm font-extrabold text-gray-900 dark:text-white">{badge.badge_title}</h4>
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{badge.description}</p>
        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-2 inline-block">
          Unlocked • Active Reward
        </span>
      </div>
    </div>
  );
}
