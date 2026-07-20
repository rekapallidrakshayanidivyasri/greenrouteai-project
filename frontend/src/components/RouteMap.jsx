import React from 'react';
import { Navigation, Clock } from 'lucide-react';

export default function RouteMap({ routes, selectedRouteId, source, destination }) {
  if (!routes || routes.length === 0) return null;

  const selectedRoute = routes.find(r => r.id === selectedRouteId) || routes[0];

  const googleEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(source || 'Origin')}+to+${encodeURIComponent(destination || 'Destination')}&output=embed`;

  return (
    <div className="w-full space-y-4">
      {/* Distance Display Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-primary-600 text-white p-5 rounded-2xl shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3.5 rounded-xl bg-white/20 backdrop-blur-md">
            <Navigation className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-100">Distance Covered</div>
            <div className="text-3xl font-black text-white">
              {selectedRoute.distanceKm} <span className="text-base font-bold">km</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 border-l border-white/20 pl-6">
          <div className="p-3.5 rounded-xl bg-white/20 backdrop-blur-md">
            <Clock className="w-7 h-7 text-white" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-100">Estimated Duration</div>
            <div className="text-3xl font-black text-white">
              {selectedRoute.durationMins} <span className="text-base font-bold">mins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pure Clean Google Map */}
      <div className="w-full h-[480px] rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-slate-800">
        <iframe
          title="Google Map Route"
          src={googleEmbedUrl}
          className="w-full h-full border-0 rounded-2xl"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
