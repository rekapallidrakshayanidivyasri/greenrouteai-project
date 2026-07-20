import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Navigation, ShieldCheck, CloudSun, Mic, Trees, Sparkles, ArrowRight, Zap, Award, BarChart3 } from 'lucide-react';
import TreeCalculatorCard from '../components/TreeCalculatorCard';

export default function LandingPage() {
  return (
    <div className="space-y-24 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Glow ambient background circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
        
        <div className="max-w-5xl mx-auto text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-primary-600 dark:text-emerald-400 shadow-sm animate-bounce-subtle">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            <span>AI-Powered ClimateTech Route Recommendation System</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.15]">
            GreenRoute AI – <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary-600 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
              Drive Smarter, Travel Greener
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-normal">
            Bypass heavy congestion, minimize fuel consumption, and reduce carbon emissions. GreenRoute AI combines real-time weather analytics, Google Gemini AI route evaluation, and bilingual voice guidance for sustainable journeys.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              to="/planner"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary-500 hover:bg-primary-600 text-white font-extrabold text-base shadow-xl shadow-primary-500/30 hover:scale-105 transition-all flex items-center justify-center gap-2 group"
            >
              Get Started – Find Eco Route
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 font-extrabold text-base border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <BarChart3 className="w-5 h-5 text-secondary-500" />
              View Impact Dashboard
            </Link>
          </div>

          {/* Quick Stat Pill Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 text-left">
            <div className="glass-panel p-4 rounded-2xl border border-emerald-500/20">
              <div className="text-2xl font-black text-primary-600 dark:text-emerald-400">25%</div>
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Lower CO₂ Emissions</div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-secondary-500/20">
              <div className="text-2xl font-black text-secondary-500">20%</div>
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Fuel Savings per Trip</div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-amber-500/20">
              <div className="text-2xl font-black text-amber-500">Dual</div>
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">English & Telugu Voice</div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-purple-500/20">
              <div className="text-2xl font-black text-purple-500">Gemini AI</div>
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">Route Recommendation</div>
            </div>
          </div>

        </div>
      </section>

      {/* About Project Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-50 dark:bg-secondary-950 text-secondary-600 dark:text-secondary-400 text-xs font-bold uppercase tracking-wider">
              About Project
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Tackling Navigation Inefficiency & Carbon Pollution
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Standard navigation apps route drivers based purely on distance or time. They ignore idling fuel waste in traffic congestion, weather impacts, vehicle powertrain efficiency, and greenhouse emissions.
            </p>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              <b>GreenRoute AI</b> bridges this gap by combining live weather metrics, fuel consumption algorithms, and Google Gemini AI to highlight the most eco-friendly travel option.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">Fuel & Cost Savings</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                  <CloudSun className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-gray-800 dark:text-gray-200">Live Weather Radar</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <TreeCalculatorCard co2SavedKg={48.2} treesCount={2.2} />
          </div>

        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white">Smart Eco Features</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Designed for modern eco-conscious drivers, EV commuters, and logistics fleets.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-card p-6 rounded-2xl space-y-4 border border-emerald-500/20 hover:-translate-y-1 transition-transform">
            <div className="p-3 rounded-xl bg-emerald-500 text-white w-max">
              <Navigation className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Multi-Route Eco Evaluation</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Compares distances, traffic delays, elevation gains, and fuel consumption to generate a 0-100 Eco Score for every route alternative.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4 border border-secondary-500/20 hover:-translate-y-1 transition-transform">
            <div className="p-3 rounded-xl bg-secondary-500 text-white w-max">
              <CloudSun className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">OpenWeather Live Corridor</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Monitors rain probabilities, crosswinds, temperature extremes, and road hazard warnings along your travel path.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4 border border-purple-500/20 hover:-translate-y-1 transition-transform">
            <div className="p-3 rounded-xl bg-purple-600 text-white w-max">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Gemini AI Recommendation</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Generates natural language driver advisories explaining exact fuel savings, reduced carbon footprints, and safety benefits.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4 border border-amber-500/20 hover:-translate-y-1 transition-transform">
            <div className="p-3 rounded-xl bg-amber-500 text-white w-max">
              <Mic className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">AI Bilingual Voice Assistant</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Hands-free Web Speech text-to-speech announcements in English & Telugu for heavy rain, traffic, EV charger alerts, and money saved.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4 border border-teal-500/20 hover:-translate-y-1 transition-transform">
            <div className="p-3 rounded-xl bg-teal-500 text-white w-max">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">PDF Green Reports</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Generate daily, weekly, and monthly sustainability summaries formatted into downloadable PDF reports with Green Badges.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4 border border-emerald-500/20 hover:-translate-y-1 transition-transform">
            <div className="p-3 rounded-xl bg-emerald-600 text-white w-max">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Green Badge Gamification</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              Earn Eco Pioneer, Carbon Cutter, EV Champion, and Tree Saver achievement badges as your eco travel streak grows.
            </p>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">Contact GreenRoute AI Team</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Have questions about our eco routing algorithm or API partnerships?</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
              />
            </div>
            <textarea
              rows="4"
              placeholder="Your Message..."
              required
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs font-semibold text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:outline-none"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-extrabold text-xs shadow-md shadow-primary-500/20 transition-all"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}
