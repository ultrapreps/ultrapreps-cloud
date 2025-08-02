'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

export default function ThemeToggle() {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-3 rounded-xl backdrop-blur-md border transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] ${
        isDark 
          ? 'bg-white/10 border-white/20 text-white hover:bg-white/20' 
          : 'bg-black/10 border-black/20 text-gray-900 hover:bg-black/20 shadow-lg'
      }`}
      aria-label="Toggle theme"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </button>
  );
}