'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  Home, Search, Trophy, Users, User, Bell, Menu, X, Plus,
  Zap, Crown, Settings, LogOut,
  ChevronDown, Command,
  Grid3X3, Compass, Camera
} from 'lucide-react';
import HypeWidget from '../HypeWidget';
import { useAuth } from '@/lib/hooks/useAuth';

interface NotificationItem {
  id: string;
  type: 'hype' | 'message' | 'achievement' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  icon?: React.ReactNode;
}



export default function UltraNavigation() {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      type: 'hype',
      title: 'HYPE Milestone! 🔥',
      message: 'You just hit 1000 HYPE points!',
      timestamp: new Date(),
      read: false,
      icon: <Zap className="w-4 h-4 text-[#F59E0B]" />
    },
    {
      id: '2',
      type: 'achievement',
      title: 'New Achievement',
      message: 'Stadium Creator badge unlocked',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
      icon: <Trophy className="w-4 h-4 text-[#F97316]" />
    }
  ]);

  // Use actual user data from session, with fallback
  const currentUser = user ? {
    id: user.id,
    name: user.name || 'User',
    username: user.username,
    hypeScore: 1250, // TODO: Fetch from database
    school: user.schoolId || 'UltraPreps',
    sport: 'Athlete',
    role: user.role as 'student' | 'parent' | 'coach' | 'admin' | 'scout'
  } : {
    id: 'guest',
    name: 'Guest User',
    username: 'guest',
    hypeScore: 0,
    school: 'UltraPreps',
    sport: 'Athlete',
    role: 'student' as const
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsNotificationsOpen(false);
        setIsProfileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const mainNavItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Discover', href: '/discover', icon: Compass },
    { name: 'Stadium', href: '/stadium/create', icon: Trophy },
    { name: 'Social', href: '/feed', icon: Users },
    { name: 'Profile', href: '/dashboard', icon: User }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-50">
        <div className="bg-black/95 backdrop-blur-md border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo with HYPE indicator */}
              <Link href="/" className="flex items-center gap-3">
                <div className="relative">
                  <Crown className="w-8 h-8 text-[#F59E0B]" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#F97316] rounded-full animate-pulse" />
                </div>
                <span className="text-xl font-black tracking-tight">ULTRAPREPS</span>
              </Link>

              {/* Main Navigation */}
              <div className="flex items-center gap-1">
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-lg
                        transition-all duration-200 relative
                        ${isActive 
                          ? 'text-white bg-white/10' 
                          : 'text-white hover:text-white hover:bg-white/10'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium">{item.name}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 rounded-lg"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-3">
                {/* HYPE Widget */}
                <HypeWidget userId={currentUser.id} compact />

                {/* Search */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                    bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span className="text-sm text-white/90">Search</span>
                  <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 
                    text-xs bg-white/10 rounded">
                    <Command className="w-3 h-3" />K
                  </kbd>
                </button>

                {/* Notifications */}
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 
                      bg-[#F97316] rounded-full flex items-center justify-center
                      text-xs font-bold">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Create Button */}
                <Link
                  href="/stadium/create"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg
                    bg-gradient-to-r from-[#F59E0B] to-[#F97316]
                    hover:from-[#F59E0B]/90 hover:to-[#F97316]/90
                    transition-all duration-200 font-bold"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create</span>
                </Link>

                {/* Profile Dropdown */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 p-2 rounded-lg
                    hover:bg-white/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br 
                    from-[#F59E0B] to-[#F97316] flex items-center justify-center">
                    <span className="text-sm font-bold">
                      {currentUser.name.charAt(0)}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden">
        {/* Mobile Top Bar */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/20">
          <div className="flex items-center justify-between h-14 px-4">
            <Link href="/" className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-[#F59E0B]" />
              <span className="font-black">UP</span>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full">
                <Zap className="w-3 h-3" />
                <span className="text-xs font-bold">{currentUser.hypeScore}</span>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-white/20">
          <div className="grid grid-cols-5 h-16">
            {mainNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex flex-col items-center justify-center gap-1
                    transition-colors relative
                    ${isActive ? 'text-[#F59E0B]' : 'text-white'}
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeMobileTab"
                      className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#F59E0B] to-[#F97316]"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
              onClick={() => setIsSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-[101]"
            >
              <div className="bg-black/90 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
                <div className="flex items-center gap-3 p-4 border-b border-white/10">
                  <Search className="w-5 h-5 text-white/60" />
                  <input
                    type="text"
                    placeholder="Search athletes, schools, events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-lg"
                    autoFocus
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-1 rounded hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Search Suggestions */}
                <div className="p-4">
                  <div className="space-y-2">
                    <div className="text-sm text-white/60 mb-2">Quick Actions</div>
                    <Link
                      href="/stadium/create"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <Trophy className="w-5 h-5 text-[#F59E0B]" />
                      <span>Create Your Stadium</span>
                    </Link>
                    <Link
                      href="/poster/create"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                      onClick={() => setIsSearchOpen(false)}
                    >
                      <Camera className="w-5 h-5 text-[#F97316]" />
                      <span>Generate Poster</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Notifications Dropdown */}
      <AnimatePresence>
        {isNotificationsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 right-4 w-96 bg-black/90 backdrop-blur-md 
              rounded-xl border border-white/20 overflow-hidden z-50"
          >
            <div className="p-4 border-b border-white/10">
              <h3 className="text-lg font-bold">Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-white/10 hover:bg-white/5 
                    transition-colors cursor-pointer ${!notification.read ? 'bg-white/5' : ''}`}
                  onClick={() => {
                    setNotifications(notifications.map(n => 
                      n.id === notification.id ? { ...n, read: true } : n
                    ));
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-white/10">
                      {notification.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{notification.title}</h4>
                      <p className="text-sm text-white/70">{notification.message}</p>
                      <p className="text-xs text-white/50 mt-1">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Dropdown */}
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-20 right-4 w-80 bg-black/90 backdrop-blur-md 
              rounded-xl border border-white/20 overflow-hidden z-50"
          >
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br 
                  from-[#F59E0B] to-[#F97316] flex items-center justify-center">
                  <span className="text-lg font-bold">
                    {currentUser.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold">{currentUser.name}</h3>
                  <p className="text-sm text-white/70">@{currentUser.username}</p>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-4 text-sm">
                <div>
                  <span className="text-white/60">HYPE</span>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4 text-[#F59E0B]" />
                    <span className="font-bold">{currentUser.hypeScore}</span>
                  </div>
                </div>
                <div>
                  <span className="text-white/60">School</span>
                  <p className="font-semibold">{currentUser.school}</p>
                </div>
                <div>
                  <span className="text-white/60">Sport</span>
                  <p className="font-semibold">{currentUser.sport}</p>
                </div>
              </div>
            </div>
            
            <div className="p-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setIsProfileOpen(false)}
              >
                <Grid3X3 className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setIsProfileOpen(false)}
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 
                    transition-colors w-full text-left text-red-400"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <Link
                  href="/auth/signin"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 
                    transition-colors w-full text-left text-[#F59E0B]"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 w-80 
                bg-black/90 backdrop-blur-md border-l border-white/20 z-[101]"
            >
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Menu</h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg hover:bg-white/10"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* User Profile Section */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br 
                    from-[#F59E0B] to-[#F97316] flex items-center justify-center">
                    <span className="text-lg font-bold">
                      {currentUser.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold">{currentUser.name}</h3>
                    <p className="text-sm text-white/60">@{currentUser.username}</p>
                  </div>
                </div>
                
                {/* HYPE Widget */}
                <div className="mt-3">
                  <HypeWidget userId={currentUser.id} compact className="w-full" />
                </div>
              </div>

              {/* Quick Actions */}
              <div className="p-4">
                <Link
                  href="/stadium/create"
                  className="flex items-center justify-center gap-2 p-3 
                    bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-lg
                    font-bold mb-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Stadium</span>
                </Link>

                <div className="space-y-2">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Grid3X3 className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    href="/notifications"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Bell className="w-5 h-5" />
                    <span>Notifications</span>
                    {unreadCount > 0 && (
                      <span className="ml-auto bg-[#F97316] px-2 py-0.5 rounded-full text-xs">
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/settings"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Action Button (Mobile) */}
      <Link
        href="/stadium/create"
        className="lg:hidden fixed bottom-20 right-4 w-14 h-14 
          bg-gradient-to-br from-[#F59E0B] to-[#F97316] rounded-full
          flex items-center justify-center shadow-lg z-40
          hover:scale-110 transition-transform"
      >
        <Plus className="w-6 h-6" />
      </Link>
    </>
  );
}