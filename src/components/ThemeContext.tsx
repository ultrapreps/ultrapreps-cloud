'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
  isLight: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Get theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('ultrapreps-theme') as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // Check system preference
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setTheme(systemTheme);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('ultrapreps-theme', theme);
      document.documentElement.setAttribute('data-theme', theme);
      
      // Add theme class to body for CSS variables
      document.body.className = document.body.className.replace(/theme-\w+/g, '');
      document.body.classList.add(`theme-${theme}`);
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <div className="opacity-0">{children}</div>;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

// Theme utility functions
export const getThemeColors = (isDark: boolean) => ({
  // Backgrounds
  primary: isDark ? 'from-black via-gray-900 to-black' : 'from-gray-50 via-white to-gray-100',
  secondary: isDark ? 'bg-white/10' : 'bg-black/10',
  card: isDark ? 'bg-white/10' : 'bg-white',
  overlay: isDark ? 'bg-black/40' : 'bg-white/40',
  
  // Text
  text: {
    primary: isDark ? 'text-white' : 'text-gray-900',
    secondary: isDark ? 'text-white/70' : 'text-gray-600',
    muted: isDark ? 'text-white/60' : 'text-gray-500',
  },
  
  // Borders
  border: isDark ? 'border-white/20' : 'border-gray-200',
  borderAccent: isDark ? 'border-[#F59E0B]/30' : 'border-[#F59E0B]/50',
  
  // Shadows
  shadow: isDark ? 'shadow-[0_0_50px_rgba(245,158,11,0.1)]' : 'shadow-[0_0_50px_rgba(245,158,11,0.15)]',
  
  // Interactive states
  hover: isDark ? 'hover:bg-white/15' : 'hover:bg-gray-100',
  active: isDark ? 'bg-white/20' : 'bg-gray-200',
});

export const getThemeGradients = (isDark: boolean) => ({
  hero: isDark 
    ? 'bg-gradient-to-br from-black via-gray-900 to-black' 
    : 'bg-gradient-to-br from-gray-50 via-white to-blue-50',
  accent: isDark
    ? 'bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20'
    : 'bg-gradient-to-r from-[#F59E0B]/10 to-[#F97316]/10',
  card: isDark
    ? 'bg-gradient-to-br from-white/10 to-white/5'
    : 'bg-gradient-to-br from-white to-gray-50',
});