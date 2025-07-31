'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, 
  Users, 
  Trophy,
  TrendingUp,
  MessageCircle,
  Menu,
  X,
  Home,
  UserCircle,
  Settings
} from 'lucide-react';
import clsx from 'clsx';

interface GlobalNavigationProps {
  currentPage?: string;
}

export default function GlobalNavigation({ currentPage = 'home' }: GlobalNavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Enhanced scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainNavItems = [
    { name: "Home", href: "/", icon: Home, active: currentPage === 'home' },
    { name: "Dashboard", href: "/dashboard", icon: Trophy, active: currentPage === 'dashboard' },
    { name: "Community", href: "/community", icon: Users, active: currentPage === 'community' },
    { name: "Feed", href: "/feed", icon: MessageCircle, active: currentPage === 'feed' },
    { name: "Recruiting", href: "/recruiting", icon: TrendingUp, active: currentPage === 'recruiting' }
  ];

  const utilityNavItems = [
    { name: "Profile", href: "/dashboard", icon: UserCircle },
    { name: "Settings", href: "/dashboard", icon: Settings }
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl shadow-2xl transition-all duration-300 ${
        isScrolled || isMobileMenuOpen 
          ? 'bg-black/98 border-b border-[#F59E0B]/80' 
          : 'bg-black/95 border-b border-[#F59E0B]/60'
      }`}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-2">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <Link href="/" className="flex items-center gap-2">
            <Crown className="w-6 h-6 sm:w-7 sm:h-7 text-[#F59E0B]" />
            <span className="text-xl sm:text-2xl font-black uppercase tracking-wide sm:tracking-widest text-white drop-shadow-xl">
              UltraPreps
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          {/* Main Navigation */}
          <div className="flex items-center gap-4 text-sm xl:text-base font-bold uppercase text-white/90">
            {mainNavItems.map((item, i) => {
              const IconComponent = item.icon;
              return (
                <motion.div key={item.name}>
                  <Link
                    href={item.href}
                    className={clsx(
                      "flex items-center gap-1 hover:text-[#F59E0B] transition-all duration-300 tracking-wide xl:tracking-widest group px-3 py-2 rounded-lg",
                      item.active ? "text-[#F59E0B] bg-[#F59E0B]/10" : "text-white/90"
                    )}
                  >
                    <IconComponent className={clsx(
                      "w-4 h-4 xl:w-5 xl:h-5 transition-all duration-300",
                      item.active ? "text-[#F59E0B] scale-110" : "text-white/70"
                    )} />
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-white/20" />

          {/* Utility Navigation */}
          <div className="flex items-center gap-2">
            {utilityNavItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="p-2 text-white/70 hover:text-[#F59E0B] transition-colors rounded-lg hover:bg-white/10"
                >
                  <IconComponent className="w-5 h-5" />
                </Link>
              );
            })}
          </div>

          {/* CTA Button */}
          <motion.div>
            <Link
              href="/stadium/create"
              className="flex items-center gap-2 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black px-4 xl:px-5 py-2 rounded-full font-black border border-[#F59E0B]/60 hover:scale-105 transition-all duration-300 tracking-wide xl:tracking-widest text-sm xl:text-base"
            >
              <Crown className="w-4 h-4 xl:w-5 xl:h-5" />
              <span className="hidden xl:inline">CREATE STADIUM</span>
              <span className="xl:hidden">CREATE</span>
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden flex items-center justify-center w-8 h-8"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/98 border-t border-[#F59E0B]/30 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {/* Main Navigation */}
              {mainNavItems.map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <motion.div 
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={clsx(
                        "flex items-center gap-3 hover:text-[#F59E0B] transition-all duration-300 font-bold uppercase tracking-wide py-3 px-2 rounded-lg",
                        item.active ? "text-[#F59E0B] bg-[#F59E0B]/10" : "text-white/90"
                      )}
                    >
                      <IconComponent className="w-5 h-5" />
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
              
              {/* Divider */}
              <div className="w-full h-px bg-white/20 my-4" />
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/stadium/create"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black px-6 py-3 rounded-full font-black border-2 border-white/20 shadow-lg transition-all duration-300 tracking-wide uppercase mt-4"
                >
                  <Crown className="w-5 h-5" />
                  CREATE YOUR STADIUM
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}