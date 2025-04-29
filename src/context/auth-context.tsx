
"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  user: { name: string; email: string } | null; // Simple user object
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Simulate user data - in a real app, this would come from login
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Check localStorage for persisted login state on initial load
   useEffect(() => {
     const storedLoginState = localStorage.getItem('isLoggedIn');
     if (storedLoginState === 'true') {
       setIsLoggedIn(true);
       // In a real app, you'd fetch user data here based on a token/session
       setUser({ name: 'Demo User', email: 'user@example.com' });
     }
   }, []);


  const login = () => {
     setIsLoggedIn(true);
     setUser({ name: 'Demo User', email: 'user@example.com' }); // Set mock user on login
     localStorage.setItem('isLoggedIn', 'true'); // Persist login state
     console.log("User logged in (simulated)");
  };

  const logout = () => {
     setIsLoggedIn(false);
     setUser(null); // Clear user on logout
     localStorage.removeItem('isLoggedIn'); // Remove persisted state
     console.log("User logged out (simulated)");
     // Optionally redirect to home or login page
     // window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
