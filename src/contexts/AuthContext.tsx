import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI, profileAPI } from '../services/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  updateProfile: (profileData: { fullName: string; phoneNumber: string }) => Promise<boolean>;
}

interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jelai_token');
    if (token) {
      // Verify token and get user data
      profileAPI.getProfile()
        .then(userData => {
          setUser(userData);
        })
        .catch(() => {
          localStorage.removeItem('jelai_token');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await authAPI.login(email, password);
      localStorage.setItem('jelai_token', response.token);
      setUser(response.user);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await authAPI.register(userData);
      localStorage.setItem('jelai_token', response.token);
      setUser(response.user);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const updateProfile = async (profileData: { fullName: string; phoneNumber: string }): Promise<boolean> => {
    try {
      const response = await profileAPI.updateProfile(profileData);
      setUser(response.user);
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('jelai_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};