import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, Navigation, LayoutDashboard, FileText, User, Sun, Moon, Mic, MicOff, LogOut, Menu, X, Volume2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useVoice } from '../context/VoiceContext';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { user, logoutUser, isAuthenticated } = useAuth();
  const { isMuted, toggleMute, language, setLanguage, isSpeaking } = useVoice();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Route Planner', path: '/planner', icon: Navigation },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Weather', path: '/weather' },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Profile', path: '/profile', icon: User }
  ];

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel bg-white/80 dark:bg-slate-900/80 border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform">
              <Leaf className="w-6 h-6 animate-pulse-slow" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-gray-900 dark:text-white flex items-center gap-1">
                GreenRoute <span className="text-primary-500 font-black">AI</span>
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 tracking-wider uppercase font-medium">Drive Smarter, Travel Greener</span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                    active
                      ? 'bg-primary-500 text-white shadow-md shadow-primary-500/20'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-primary-600 dark:hover:text-emerald-400'
                  }`}
                >
                  {link.icon && <link.icon className="w-4 h-4" />}
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Quick Controls & User Profile */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-100 dark:bg-slate-800 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
              title="Voice Assistant Language"
            >
              <option value="en-US">EN (English)</option>
              <option value="te-IN">TE (తెలుగు)</option>
            </select>

            {/* Voice Mute Button */}
            <button
              onClick={toggleMute}
              className={`p-2 rounded-xl border transition-all relative ${
                isMuted
                  ? 'bg-red-50 text-red-500 border-red-200 dark:bg-red-950/40 dark:border-red-900'
                  : isSpeaking
                  ? 'bg-emerald-500 text-white border-emerald-400 animate-pulse'
                  : 'bg-emerald-50 text-primary-600 border-emerald-200 dark:bg-slate-800 dark:border-slate-700 dark:text-emerald-400'
              }`}
              title={isMuted ? 'Voice Guidance Muted' : 'Voice Guidance Active'}
            >
              {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              {isSpeaking && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-amber-400 border border-gray-200 dark:border-slate-700 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              title="Toggle Light/Dark Mode"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2 border-l border-gray-200 dark:border-slate-800 pl-3">
                <Link to="/profile" className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 hover:opacity-90 transition-opacity">
                  <div className="w-7 h-7 rounded-full bg-primary-600 text-white text-xs font-bold flex items-center justify-center">
                    {user?.name?.[0] || 'E'}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-gray-900 dark:text-white leading-none">{user?.name}</span>
                    <span className="text-[10px] font-semibold text-primary-600 dark:text-emerald-400 leading-tight">Score {user?.eco_score || 85}</span>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2">
                <Link to="/login" className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                  Login
                </Link>
                <Link to="/register" className="px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-primary-500 hover:bg-primary-600 shadow-md shadow-primary-500/20 transition-all">
                  Register
                </Link>
              </div>
            )}

          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-amber-400"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-gray-700 dark:text-gray-200"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-slate-800"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 flex items-center justify-between border-t border-gray-200 dark:border-slate-800">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-100 dark:bg-slate-800 text-xs font-semibold px-2.5 py-1.5 rounded-lg border"
            >
              <option value="en-US">EN (English)</option>
              <option value="te-IN">TE (తెలుగు)</option>
            </select>
            <button onClick={toggleMute} className="flex items-center gap-1 text-xs font-bold text-primary-600">
              {isMuted ? <MicOff className="w-4 h-4 text-red-500" /> : <Mic className="w-4 h-4" />}
              {isMuted ? 'Muted' : 'Voice On'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
