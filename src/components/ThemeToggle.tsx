'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Palette } from 'lucide-react';
import { useTheme } from './ThemeContext';

interface ThemeToggleProps {
  compact?: boolean;
  showLabel?: boolean;
  className?: string;
}

export default function ThemeToggle({ compact = false, showLabel = true, className = '' }: ThemeToggleProps) {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all duration-300
        ${isDark 
          ? 'bg-gradient-to-r from-white/10 to-white/5 border border-white/20 hover:border-[#F59E0B]/50 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
          : 'bg-gradient-to-r from-gray-100 to-white border border-gray-200 hover:border-[#F59E0B]/50 text-gray-900 shadow-[0_0_20px_rgba(0,0,0,0.1)]'
        }
        ${compact ? 'px-3 py-2' : 'px-4 py-3'}
        ${className}
      `}
    >
      {/* Theme Icon with Animation */}
      <div className="relative w-6 h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute"
          >
            {isDark ? (
              <Moon className="w-5 h-5 text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Label */}
      {showLabel && !compact && (
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm font-black"
        >
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </motion.span>
      )}

      {/* Compact indicator */}
      {compact && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
            isDark ? 'bg-blue-400' : 'bg-yellow-500'
          } shadow-lg`}
        />
      )}

      {/* Glow effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isDark ? 0.3 : 0.2 }}
        className={`absolute inset-0 rounded-xl blur-xl ${
          isDark 
            ? 'bg-gradient-to-r from-blue-400/20 to-purple-400/20' 
            : 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20'
        }`}
      />
    </motion.button>
  );
}

// Floating Theme Toggle for corners
export function FloatingThemeToggle({ position = 'top-right' }: { position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' }) {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4', 
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      <ThemeToggle compact showLabel={false} />
    </div>
  );
}

// Theme Palette Selector (Advanced)
export function ThemeSelector() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className={`
      p-6 rounded-2xl border backdrop-blur-lg
      ${isDark 
        ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/20' 
        : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
      }
    `}>
      <div className="flex items-center gap-3 mb-4">
        <Palette className={`w-6 h-6 ${isDark ? 'text-[#F59E0B]' : 'text-[#F59E0B]'}`} />
        <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Visual Preference
        </h3>
      </div>
      
      <p className={`text-sm mb-6 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
        Choose your preferred visual theme for the ultimate UltraPreps experience
      </p>

      <div className="grid grid-cols-2 gap-4">
        {/* Dark Theme Option */}
        <motion.button
          onClick={() => !isDark && toggleTheme()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            relative p-4 rounded-xl border-2 transition-all duration-300
            ${isDark 
              ? 'bg-gradient-to-br from-gray-900 to-black border-[#F59E0B] shadow-[0_0_20px_rgba(245,158,11,0.3)]' 
              : 'bg-gradient-to-br from-gray-800 to-black border-gray-300 hover:border-[#F59E0B]/50'
            }
          `}
        >
          <div className="flex items-center gap-3 mb-2">
            <Moon className="w-5 h-5 text-blue-400" />
            <span className="text-white font-bold">Dark Mode</span>
          </div>
          <p className="text-white/70 text-xs text-left">
            Sleek, professional interface perfect for focus and extended use
          </p>
          {isDark && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-2 w-3 h-3 bg-[#F59E0B] rounded-full"
            />
          )}
        </motion.button>

        {/* Light Theme Option */}
        <motion.button
          onClick={() => isDark && toggleTheme()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            relative p-4 rounded-xl border-2 transition-all duration-300
            ${!isDark 
              ? 'bg-gradient-to-br from-white to-gray-50 border-[#F59E0B] shadow-[0_0_20px_rgba(245,158,11,0.3)]' 
              : 'bg-gradient-to-br from-white to-gray-100 border-white/20 hover:border-[#F59E0B]/50'
            }
          `}
        >
          <div className="flex items-center gap-3 mb-2">
            <Sun className="w-5 h-5 text-yellow-500" />
            <span className={`font-bold ${!isDark ? 'text-gray-900' : 'text-gray-800'}`}>Light Mode</span>
          </div>
          <p className={`text-xs text-left ${!isDark ? 'text-gray-600' : 'text-gray-600'}`}>
            Clean, bright interface ideal for daytime use and maximum clarity
          </p>
          {!isDark && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-2 w-3 h-3 bg-[#F59E0B] rounded-full"
            />
          )}
        </motion.button>
      </div>
    </div>
  );
}