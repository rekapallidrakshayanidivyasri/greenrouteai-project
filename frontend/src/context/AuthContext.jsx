import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('greenroute_user');
    return saved ? JSON.parse(saved) : { id: 1, name: 'Eco Traveler', email: 'demo@greenroute.ai', eco_score: 89, total_trips: 14 };
  });
  const [token, setToken] = useState(() => localStorage.getItem('greenroute_token') || 'demo_token');

  const loginUser = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('greenroute_user', JSON.stringify(userData));
    localStorage.setItem('greenroute_token', userToken);
  };

  const logoutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('greenroute_user');
    localStorage.removeItem('greenroute_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loginUser, logoutUser, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
