import React from 'react';
import { Leaf, Heart, Shield, CloudSun, Navigation, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 pt-16 pb-8 border-t border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary-500 flex items-center justify-center text-white">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white">GreenRoute <span className="text-primary-500">AI</span></span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Empowering sustainable mobility with AI-driven eco-route optimization, live traffic, weather analysis, and CO₂ reduction algorithms.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-lg w-max">
              <Sparkles className="w-3.5 h-3.5" />
              ClimateTech Hackathon Edition 2026
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-primary-500 pl-2">Navigation</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="hover:text-emerald-400 transition-colors">Home Landing</Link></li>
              <li><Link to="/planner" className="hover:text-emerald-400 transition-colors">AI Route Planner</Link></li>
              <li><Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Eco Analytics Dashboard</Link></li>
              <li><Link to="/weather" className="hover:text-emerald-400 transition-colors">Weather Corridor Analysis</Link></li>
              <li><Link to="/reports" className="hover:text-emerald-400 transition-colors">Green PDF Reports</Link></li>
            </ul>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-secondary-500 pl-2">Core Tech</h4>
            <ul className="space-y-2.5 text-xs text-gray-400">
              <li className="flex items-center gap-2"><Navigation className="w-3.5 h-3.5 text-emerald-400" /> Multi-Route Traffic Analysis</li>
              <li className="flex items-center gap-2"><CloudSun className="w-3.5 h-3.5 text-secondary-500" /> OpenWeather Route Alerts</li>
              <li className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-amber-400" /> Gemini AI Driver Insights</li>
              <li className="flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-purple-400" /> Bilingual Text-To-Speech Assistant</li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">Eco Newsletter</h4>
            <p className="text-xs text-gray-400 mb-3">Join our community reducing carbon footprint trip by trip.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 text-xs px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:ring-1 focus:ring-primary-500 text-white w-full"
              />
              <button className="bg-primary-500 hover:bg-primary-600 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© 2026 GreenRoute AI. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-current" /> for a Cleaner & Greener Planet
          </p>
        </div>
      </div>
    </footer>
  );
}
