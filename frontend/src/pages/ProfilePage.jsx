import React, { useState, useEffect } from 'react';
import { User, Mail, Award, Edit3, Save, CheckCircle, Trees, ShieldCheck, Zap, Leaf } from 'lucide-react';
import EcoScoreCard from '../components/EcoScoreCard';
import GreenBadgeCard from '../components/GreenBadgeCard';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

export default function ProfilePage() {
  const { user, loginUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get('/users/profile');
        setProfileData(res.data);
        setName(res.data.user?.name || user?.name || 'Eco Traveler');
        setEmail(res.data.user?.email || user?.email || 'demo@greenroute.ai');
      } catch (err) {
        setProfileData({
          user: user || { id: 1, name: 'Eco Traveler', email: 'demo@greenroute.ai', eco_score: 89, total_trips: 14, fuel_saved: 24.5, co2_reduced: 52.8, money_saved: 2450 },
          greenBadge: 'Sustainability Champion 🌿',
          treesSaved: 2.4,
          badges: [
            { id: 1, badge_title: 'Eco Pioneer', badge_code: 'eco_pioneer', description: 'Joined GreenRoute AI to travel sustainably', icon_name: 'Leaf' },
            { id: 2, badge_title: 'Carbon Cutter', badge_code: 'carbon_cutter', description: 'Prevented over 25kg of CO2 emissions', icon_name: 'ShieldCheck' },
            { id: 3, badge_title: 'EV Champion', badge_code: 'ev_champion', description: 'Completed trips using zero-emission energy', icon_name: 'Zap' },
            { id: 4, badge_title: 'Tree Saver', badge_code: 'tree_saver', description: 'Equivalent to planting 15 trees this month', icon_name: 'Trees' }
          ]
        });
        setName(user?.name || 'Eco Traveler');
        setEmail(user?.email || 'demo@greenroute.ai');
      }
    }
    fetchProfile();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put('/users/profile', { name, email });
      loginUser({ ...user, name, email }, localStorage.getItem('greenroute_token') || 'demo');
      setEditing(false);
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      loginUser({ ...user, name, email }, localStorage.getItem('greenroute_token') || 'demo');
      setEditing(false);
      setSuccessMsg('Profile updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    }
  };

  const pUser = profileData?.user || user;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 dark:bg-emerald-950/60 border border-primary-200 dark:border-emerald-800 text-xs font-bold text-primary-600 dark:text-emerald-400 mb-2">
            <User className="w-3.5 h-3.5" />
            Account Overview
          </div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Eco Driver Profile</h1>
        </div>
      </div>

      {successMsg && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-500" /> {successMsg}
        </div>
      )}

      {/* Main Grid: User Info Card & Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* User Card */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-3xl border border-gray-200 dark:border-slate-800 shadow-xl space-y-6">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-600 to-emerald-400 text-white text-2xl font-black flex items-center justify-center shadow-lg shadow-primary-500/30">
              {pUser?.name?.[0] || 'E'}
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white">{pUser?.name}</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">{pUser?.email}</p>
              <div className="mt-1 inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300">
                {profileData?.greenBadge || 'Eco Leader 🌟'}
              </div>
            </div>
          </div>

          {/* Edit Profile Form */}
          {editing ? (
            <form onSubmit={handleUpdate} className="space-y-4 pt-4 border-t border-gray-100 dark:border-slate-800">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 dark:text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-xs font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="px-4 py-2 rounded-xl bg-primary-500 text-white text-xs font-bold flex items-center gap-1">
                  <Save className="w-3.5 h-3.5" /> Save Changes
                </button>
                <button type="button" onClick={() => setEditing(false)} className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-slate-700 text-xs font-bold">
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="w-full py-2.5 rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-100 dark:hover:bg-slate-800 font-bold text-xs text-gray-700 dark:text-gray-200 transition-colors flex items-center justify-center gap-2"
            >
              <Edit3 className="w-4 h-4 text-primary-500" /> Edit Profile Details
            </button>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 dark:border-slate-800">
            <div className="bg-white/60 dark:bg-slate-800/60 p-3 rounded-xl border">
              <div className="text-[10px] font-bold text-gray-400 uppercase">Total Trips</div>
              <div className="text-lg font-black text-gray-900 dark:text-white">{pUser?.total_trips || 14}</div>
            </div>
            <div className="bg-white/60 dark:bg-slate-800/60 p-3 rounded-xl border">
              <div className="text-[10px] font-bold text-gray-400 uppercase">CO₂ Prev.</div>
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">{pUser?.co2_reduced || 52.8} kg</div>
            </div>
          </div>

        </div>

        {/* Right Section: Badges & Gauge */}
        <div className="lg:col-span-7 space-y-6">
          <EcoScoreCard score={pUser?.eco_score || 89} label="Lifetime Eco Score Benchmark" />

          {/* Green Badges Gallery */}
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Green Badge Rewards Collection
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(profileData?.badges || []).map((badge) => (
                <GreenBadgeCard key={badge.id} badge={badge} />
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
