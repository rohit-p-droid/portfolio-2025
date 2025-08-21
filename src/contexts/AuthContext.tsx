import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { tokenStorage } from '../utils/tokenStorage';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const existingToken = tokenStorage.get();
    if (existingToken) {
      setToken(existingToken);
      // TODO: Optionally validate token with API call
      // For now, we'll assume token is valid if it exists
      // You might want to decode JWT to get user info or make API call
    }
    setIsLoading(false);
  }, []);

  const login = (accessToken: string, userData: User) => {
    setToken(accessToken);
    setUser(userData);
    tokenStorage.set(accessToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    tokenStorage.remove();
  };

  const isAuthenticated = !!token;

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
