import React from 'react';
import { Mic, MicOff, Volume2, Sparkles, AlertCircle, Fuel, BatteryCharging, CloudRain, ShieldAlert } from 'lucide-react';
import { useVoice } from '../context/VoiceContext';

export default function VoiceAssistantPanel() {
  const { isMuted, toggleMute, speakText, isSpeaking, lastSpokenText, language } = useVoice();

  const promptsList = [
    { key: 'welcome', label: 'Welcome Journey', icon: Sparkles, color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60' },
    { key: 'recommendation', label: 'Route B Eco Recommended', icon: Sparkles, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60' },
    { key: 'traffic', label: 'Heavy Traffic Ahead', icon: AlertCircle, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60' },
    { key: 'heavyRain', label: 'Heavy Rain in 10 Mins', icon: CloudRain, color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60' },
    { key: 'rain', label: 'Rain Warning', icon: CloudRain, color: 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950/60' },
    { key: 'fuelSavings', label: 'Saved ₹35 Fuel', icon: Fuel, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60' },
    { key: 'co2Savings', label: '2 kg CO₂ Reduced', icon: Sparkles, color: 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60' },
    { key: 'evStation', label: 'EV Charger in 1.2 km', icon: BatteryCharging, color: 'text-teal-500 bg-teal-50 dark:bg-teal-950/60' },
    { key: 'accident', label: 'Accident Reroute', icon: ShieldAlert, color: 'text-red-500 bg-red-50 dark:bg-red-950/60' },
    { key: 'airQuality', label: 'Poor Air Quality Alert', icon: AlertCircle, color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60' },
    { key: 'construction', label: 'Road Work Recalculate', icon: AlertCircle, color: 'text-orange-500 bg-orange-50 dark:bg-orange-950/60' },
    { key: 'lowFuel', label: 'Low Fuel Warning', icon: Fuel, color: 'text-red-500 bg-red-50 dark:bg-red-950/60' },
    { key: 'lowBattery', label: 'EV Low Battery', icon: BatteryCharging, color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60' },
    { key: 'arrival', label: 'Destination Reached', icon: Sparkles, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60' }
  ];

  return (
    <div className="glass-card p-5 rounded-2xl border border-primary-500/20 shadow-xl space-y-4">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl text-white ${isMuted ? 'bg-red-500' : 'bg-primary-500 animate-pulse'}`}>
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              AI Driver Voice Assistant
              <span className="text-[10px] bg-primary-100 dark:bg-emerald-950 text-primary-700 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                {language === 'te-IN' ? 'తెలుగు Voice' : 'English Voice'}
              </span>
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Web Speech API Real-Time Voice Navigation</p>
          </div>
        </div>

        <button
          onClick={toggleMute}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold text-xs border transition-all ${
            isMuted
              ? 'bg-red-50 text-red-600 border-red-200 dark:bg-red-950/40 dark:border-red-900'
              : 'bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/20'
          }`}
        >
          {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          {isMuted ? 'Voice Guidance Off' : 'Voice Enabled'}
        </button>
      </div>

      {/* Currently Speaking Subtitle Box */}
      {isSpeaking && (
        <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 p-3 rounded-xl flex items-center gap-2 animate-bounce-subtle">
          <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200 italic">"{lastSpokenText}"</p>
        </div>
      )}

      {/* Pre-configured Voice Prompts Matrix */}
      <div>
        <span className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 tracking-wider mb-2 block">
          Trigger Instant Driver Announcements ({language === 'te-IN' ? 'తెలుగు' : 'English'}):
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {promptsList.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => speakText(item.key)}
                className={`p-2.5 rounded-xl border border-gray-100 dark:border-slate-800 hover:border-primary-400 text-left text-xs font-bold transition-all flex items-center gap-2 group ${item.color}`}
              >
                <Icon className="w-4 h-4 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="truncate text-gray-800 dark:text-gray-200">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
