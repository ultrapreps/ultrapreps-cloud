'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Settings,
  Search,
  Brain,
  Mic,
  MicOff,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Building,
  Shield,
  BookOpen,
  Gamepad2,
  DollarSign,
  Heart,
  Eye,
  Target,
  Star,
  Flame,
  Zap,
  MapPin,
  Calendar,
  FileText,
  Award,
  Globe,
  Camera,
  Video,
  Headphones,
  Wrench,
  GraduationCap,
  BarChart3,
  Sparkles,
  Bell,
  ChevronsLeft,
  ChevronsRight,
  Activity,
  Rocket
} from 'lucide-react';
import clsx from 'clsx';

interface MegaNavigationProps {
  currentPage?: string;
  userRole?: 'student' | 'teacher' | 'coach' | 'parent' | 'admin' | 'superintendent' | 'board' | 'athletic_director' | 'recruiter' | 'media' | 'guest';
  userName?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
  icon: React.ComponentType<{className?: string}>;
  description: string;
  roles: string[];
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{className?: string}>;
  description: string;
  badge?: string;
  new?: boolean;
  roles: string[];
}

export default function MegaNavigation({ 
  currentPage = 'home', 
  userRole = 'guest',
  userName = 'Guest User'
}: MegaNavigationProps) {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [aiSuggestions, setAiSuggestions] = useState<NavItem[]>([]);
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [showFeatureSpotlight, setShowFeatureSpotlight] = useState(true);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Enhanced scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // AI-powered suggestions based on role and current page
  useEffect(() => {
    const generateAISuggestions = () => {
      const suggestions: NavItem[] = [];
      
      // Context-aware suggestions
      if (currentPage === 'home') {
        if (userRole === 'student') {
          suggestions.push(
            { name: 'Start Your Stadium', href: '/stadium/create', icon: Crown, description: 'Create your digital identity', roles: ['student'] },
            { name: 'AI Tutoring', href: '/dashboard', icon: Brain, description: 'Get personalized help', roles: ['student'] }
          );
        } else if (userRole === 'teacher') {
          suggestions.push(
            { name: 'Lesson Planner', href: '/teacher-dashboard', icon: BookOpen, description: 'AI-powered lesson creation', roles: ['teacher'] },
            { name: 'Student Analytics', href: '/teacher-dashboard', icon: TrendingUp, description: 'Track student progress', roles: ['teacher'] }
          );
        }
      }

      // Role-specific quick actions
      switch (userRole) {
        case 'coach':
          suggestions.push(
            { name: 'Team Performance', href: '/coach-dashboard', icon: Trophy, description: 'View latest stats', roles: ['coach'] },
            { name: 'Recruitment Hub', href: '/recruiting', icon: Target, description: 'Scout new talent', roles: ['coach'] }
          );
          break;
        case 'parent':
          suggestions.push(
            { name: 'Child Progress', href: '/parent-dashboard', icon: Heart, description: 'Monitor your child', roles: ['parent'] },
            { name: 'Communication', href: '/parent-dashboard', icon: MessageCircle, description: 'Connect with teachers', roles: ['parent'] }
          );
          break;
      }

      setAiSuggestions(suggestions);
    };

    generateAISuggestions();
  }, [currentPage, userRole]);

  const navSections: NavSection[] = [
    {
      title: 'Core Platform',
      icon: Crown,
      description: 'Essential UltraPreps features for everyone',
      roles: ['all'],
      items: [
        { name: 'Home', href: '/', icon: Home, description: 'UltraPreps homepage', roles: ['all'] },
        { name: 'Community Feed', href: '/feed', icon: MessageCircle, description: 'Connect with your network', roles: ['all'] },
        { name: 'Events & News', href: '/community', icon: Calendar, description: 'Stay updated on happenings', roles: ['all'] },
        { name: 'Content Creation', href: '/poster/create', icon: Camera, description: 'Create shareable content', roles: ['student', 'coach', 'teacher'] }
      ]
    },
    {
      title: 'Student Universe',
      icon: Star,
      description: 'Complete student experience and development',
      roles: ['student', 'parent', 'teacher', 'coach'],
      items: [
        { name: 'Student Dashboard', href: '/dashboard', icon: Flame, description: 'Your personal command center', roles: ['student'] },
        { name: 'Create Stadium', href: '/stadium/create', icon: Crown, description: 'Build your digital identity', new: true, roles: ['student'] },
        { name: 'HeroCard Generator', href: '/herocard/create', icon: Star, description: 'Create your athletic profile', roles: ['student'] },
        { name: 'AI Tutoring', href: '/dashboard', icon: Brain, description: 'Personalized learning assistance', roles: ['student'] }
      ]
    },
    {
      title: 'Educational Leadership',
      icon: Building,
      description: 'Administrative and leadership tools',
      roles: ['admin', 'superintendent', 'board', 'teacher'],
      items: [
        { name: 'Superintendent Portal', href: '/superintendent-dashboard', icon: Building, description: 'District-wide oversight', roles: ['superintendent', 'admin'] },
        { name: 'School Board Hub', href: '/school-board-dashboard', icon: Shield, description: 'Governance and policy', roles: ['board', 'admin'] },
        { name: 'Teacher Dashboard', href: '/teacher-dashboard', icon: BookOpen, description: 'Classroom management', roles: ['teacher'] },
        { name: 'Academic Analytics', href: '/teacher-dashboard', icon: TrendingUp, description: 'Student performance insights', roles: ['teacher', 'admin'] }
      ]
    },
    {
      title: 'Athletic Excellence',
      icon: Trophy,
      description: 'Sports programs and athletic development',
      roles: ['coach', 'athletic_director', 'student', 'parent'],
      items: [
        { name: 'Athletic Director', href: '/athletic-director-dashboard', icon: Trophy, description: 'Sports program management', roles: ['athletic_director'] },
        { name: 'Coach Dashboard', href: '/coach-dashboard', icon: Gamepad2, description: 'Team management tools', roles: ['coach'] },
        { name: 'Recruiting Hub', href: '/recruiting', icon: Target, description: 'Talent discovery platform', roles: ['recruiter', 'coach'] },
        { name: 'Performance Analytics', href: '/coach-dashboard', icon: BarChart3, description: 'Athletic performance data', roles: ['coach', 'athletic_director'] }
      ]
    },
    {
      title: 'Family & Support',
      icon: Heart,
      description: 'Parent engagement and community support',
      roles: ['parent', 'student'],
      items: [
        { name: 'Parent Dashboard', href: '/parent-dashboard', icon: Heart, description: 'Monitor your child\'s progress', roles: ['parent'] },
        { name: 'Family Connection', href: '/parent-dashboard', icon: Users, description: 'Multi-generational linking', roles: ['parent', 'student'] },
        { name: 'Communication Hub', href: '/parent-dashboard', icon: MessageCircle, description: 'Connect with educators', roles: ['parent'] },
        { name: 'Safety & Support', href: '/parent-dashboard', icon: Shield, description: 'Student safety tools', roles: ['parent'] }
      ]
    },
    {
      title: 'Media & Content',
      icon: Camera,
      description: 'Content creation and media tools',
      roles: ['media', 'student', 'coach'],
      items: [
        { name: 'Media Dashboard', href: '/media-dashboard', icon: Video, description: 'Content creation tools', roles: ['media'] },
        { name: 'Live Streaming', href: '/community', icon: Eye, description: 'Broadcast events live', roles: ['media', 'coach'] },
        { name: 'Photo Gallery', href: '/community', icon: Camera, description: 'Event photography', roles: ['media', 'student'] },
        { name: 'Podcast Studio', href: '/community', icon: Headphones, description: 'Audio content creation', roles: ['media'] }
      ]
    },
    {
      title: 'Operations & Facilities',
      icon: Wrench,
      description: 'Behind-the-scenes operations',
      roles: ['admin', 'facility_manager'],
      items: [
        { name: 'Facility Management', href: '/facility-dashboard', icon: Building, description: 'Venue and equipment oversight', roles: ['facility_manager'] },
        { name: 'Transportation Hub', href: '/transport-dashboard', icon: MapPin, description: 'Bus and travel coordination', roles: ['admin'] },
        { name: 'Equipment Tracking', href: '/facility-dashboard', icon: Wrench, description: 'Athletic gear management', roles: ['facility_manager'] },
        { name: 'Event Scheduling', href: '/facility-dashboard', icon: Calendar, description: 'Venue booking system', roles: ['facility_manager'] }
      ]
    }
  ];

  // Filter sections and items based on user role
  const getFilteredSections = () => {
    return navSections.filter(section => 
      section.roles.includes('all') || section.roles.includes(userRole)
    ).map(section => ({
      ...section,
      items: section.items.filter(item => 
        item.roles.includes('all') || item.roles.includes(userRole)
      )
    }));
  };

  // Simplified search - just updates query for now (remove search functionality until implemented)
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // AI-powered search across all features
    const lowerQuery = query.toLowerCase();
    
    // Smart routing based on search terms
    if (lowerQuery.includes('coach') || lowerQuery.includes('film') || lowerQuery.includes('playbook')) {
      window.location.href = '/coach-dashboard';
    } else if (lowerQuery.includes('teacher') || lowerQuery.includes('lesson') || lowerQuery.includes('grade')) {
      window.location.href = '/teacher-dashboard';
    } else if (lowerQuery.includes('parent') || lowerQuery.includes('child') || lowerQuery.includes('family')) {
      window.location.href = '/parent-dashboard';
    } else if (lowerQuery.includes('student') || lowerQuery.includes('homework') || lowerQuery.includes('academic')) {
      window.location.href = '/dashboard';
    } else if (lowerQuery.includes('create') || lowerQuery.includes('stadium') || lowerQuery.includes('build')) {
      window.location.href = '/stadium/create';
    } else if (lowerQuery.includes('recruit') || lowerQuery.includes('college') || lowerQuery.includes('scout')) {
      window.location.href = '/recruiting';
    } else if (lowerQuery.includes('community') || lowerQuery.includes('feed') || lowerQuery.includes('social')) {
      window.location.href = '/community';
    }
  };

  // Voice search - FULLY FUNCTIONAL with Web Speech API
  const toggleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      interface ISpeechRecognition extends EventTarget {
        continuous: boolean;
        interimResults: boolean;
        lang: string;
        onstart: (() => void) | null;
        onresult: ((event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void) | null;
        onerror: (() => void) | null;
        onend: (() => void) | null;
        start: () => void;
      }
      
      const SpeechRecognition = ((window as typeof window & { webkitSpeechRecognition?: new () => ISpeechRecognition }).webkitSpeechRecognition || 
                                (window as typeof window & { SpeechRecognition?: new () => ISpeechRecognition }).SpeechRecognition)!;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onstart = () => {
        setIsVoiceActive(true);
      };
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        handleSearch(transcript);
        setIsVoiceActive(false);
      };
      
      recognition.onerror = () => {
        setIsVoiceActive(false);
        alert('Voice search requires microphone permissions. Please allow access and try again.');
      };
      
      recognition.onend = () => {
        setIsVoiceActive(false);
      };
      
      recognition.start();
    } else {
      alert('Voice search is not supported in your browser. Please use Chrome, Edge, or Safari.');
    }
  };

  const filteredSections = getFilteredSections();

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={clsx(
        'fixed top-0 left-0 w-full z-50 backdrop-blur-xl shadow-2xl transition-all duration-300',
        {
          'bg-black/98 border-b border-[#F59E0B]/80': isScrolled || isMegaMenuOpen || isMobileMenuOpen || !isNavCollapsed,
          'bg-black/60 border-b border-[#F59E0B]/40': !isScrolled && currentPage === 'home' && isNavCollapsed,
          'bg-black/95 border-b border-[#F59E0B]/60': !isScrolled && currentPage !== 'home'
        }
      )}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      {/* Feature Spotlight for Homepage */}
      {currentPage === 'home' && showFeatureSpotlight && !isScrolled && !isNavCollapsed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#F59E0B] overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
              <span className="text-white text-sm font-bold">
                🚀 NEW: AI Film Room, Smart Gradebook, and 26 Revolutionary Dashboards Now Live!
              </span>
              <Link href="/dashboard" className="ml-3 px-3 py-1 bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded-full transition-colors">
                Explore Now →
              </Link>
            </div>
            <button
              onClick={() => setShowFeatureSpotlight(false)}
              className="text-white/80 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className={clsx(
          "flex items-center justify-between px-4 sm:px-6 transition-all duration-300",
          {
            "py-3 sm:py-4": !isNavCollapsed || currentPage !== 'home',
            "py-2": isNavCollapsed && currentPage === 'home'
          }
        )}>
          {/* Logo with Collapse Toggle */}
          <div className="flex items-center gap-3">
            {/* Collapse Toggle - Desktop Only */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsNavCollapsed(!isNavCollapsed)}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              title={isNavCollapsed ? "Expand Navigation" : "Collapse Navigation"}
            >
              {isNavCollapsed ? (
                <ChevronsRight className="w-4 h-4 text-white" />
              ) : (
                <ChevronsLeft className="w-4 h-4 text-white" />
              )}
            </motion.button>

            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Link href="/" className="flex items-center gap-2">
                <div className="relative">
                  <Crown className="w-6 h-6 sm:w-7 sm:h-7 text-[#F59E0B]" />
                  {currentPage === 'home' && (
                    <motion.div
                      className="absolute -top-1 -right-1 w-2 h-2 bg-[#F59E0B] rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </div>
                <AnimatePresence>
                  {!isNavCollapsed && (
                    <motion.span 
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 'auto', opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-xl sm:text-2xl font-black uppercase tracking-wide sm:tracking-widest text-white drop-shadow-xl overflow-hidden whitespace-nowrap"
                    >
                      UltraPreps
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          </div>

          {/* Desktop Mega Navigation */}
          <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
            {/* Homepage Live Stats - Only show on homepage when not collapsed */}
            {currentPage === 'home' && !isNavCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 mr-4"
              >
                <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                  <Activity className="w-4 h-4 text-[#F59E0B]" />
                  <span className="text-white text-sm font-bold">12,847 Online</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                  <Flame className="w-4 h-4 text-[#F97316]" />
                  <span className="text-white text-sm font-bold">98% HYPE</span>
                </div>
              </motion.div>
            )}

            {/* AI-Powered Search - Enhanced */}
            <AnimatePresence>
              {!isNavCollapsed && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="relative"
                >
                  <div className="flex items-center bg-black/40 backdrop-blur-sm rounded-full border border-white/20 px-4 py-2 hover:border-[#F59E0B]/50 transition-colors">
                    <Search className="w-4 h-4 text-white/60 mr-2" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search anything..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchQuery.trim()) {
                          handleSearch(searchQuery);
                        }
                      }}
                      className="bg-transparent text-white placeholder:text-white/60 text-sm w-32 sm:w-40 lg:w-48 focus:outline-none"
                    />
                    <button
                      onClick={toggleVoiceSearch}
                      className={`ml-2 p-1 rounded-full transition-colors ${
                        isVoiceActive ? 'bg-[#F59E0B] text-black' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {isVoiceActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick Access based on role - Enhanced for homepage */}
            {currentPage === 'home' && !isNavCollapsed ? (
              <div className="flex items-center gap-2">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    href="/stadium/create"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-bold text-sm rounded-full hover:shadow-lg transition-all duration-300 group"
                  >
                    <Rocket className="w-4 h-4 group-hover:animate-pulse" />
                    Create Stadium
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-full transition-colors"
                  >
                    <Brain className="w-4 h-4" />
                    AI Dashboard
                  </Link>
                </motion.div>
              </div>
            ) : !isNavCollapsed && (
              <div className="flex items-center gap-2">
                {aiSuggestions.slice(0, 2).map((suggestion, index) => (
                  <Link
                    key={index}
                    href={suggestion.href}
                    className="flex items-center gap-1 px-3 py-2 text-white/80 hover:text-[#F59E0B] transition-colors text-sm font-bold rounded-lg hover:bg-white/10"
                  >
                    <suggestion.icon className="w-4 h-4" />
                    {suggestion.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Mega Menu Trigger - Enhanced */}
            <AnimatePresence>
              {!isNavCollapsed && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setIsMegaMenuOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 text-white/90 hover:text-[#F59E0B] transition-colors font-bold text-sm rounded-lg hover:bg-white/10 border border-transparent hover:border-[#F59E0B]/30"
                >
                  <Building className="w-4 h-4" />
                  All Platforms
                  <ChevronDown className="w-3 h-3" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Notifications - New Feature */}
            {!isNavCollapsed && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                <Bell className="w-5 h-5 text-white" />
              </motion.button>
            )}

            {/* User Profile - Enhanced */}
            <div className="flex items-center gap-3">
              {!isNavCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-right"
                >
                  <div className="text-white text-sm font-bold">{userName}</div>
                  <div className="text-[#F59E0B] text-xs font-bold capitalize">{userRole}</div>
                </motion.div>
              )}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={clsx(
                  "rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] flex items-center justify-center shadow-lg transition-all",
                  {
                    "w-8 h-8": isNavCollapsed,
                    "w-10 h-10": !isNavCollapsed
                  }
                )}
              >
                <UserCircle className={clsx(
                  "text-white",
                  {
                    "w-5 h-5": isNavCollapsed,
                    "w-6 h-6": !isNavCollapsed
                  }
                )} />
              </motion.div>
            </div>
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

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {isMegaMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              onMouseLeave={() => setIsMegaMenuOpen(false)}
              className="absolute top-full left-0 w-full bg-black/98 backdrop-blur-xl border-b border-[#F59E0B]/30 shadow-2xl hidden lg:block"
            >
              <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredSections.map((section, sectionIndex) => (
                    <motion.div
                      key={section.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: sectionIndex * 0.1 }}
                      className="space-y-4"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#F97316] flex items-center justify-center">
                          <section.icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-black text-sm">{section.title}</h3>
                          <p className="text-white/60 text-xs">{section.description}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <Link
                            key={itemIndex}
                            href={item.href}
                            onClick={() => setIsMegaMenuOpen(false)}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors group"
                          >
                            <item.icon className="w-4 h-4 text-white/60 group-hover:text-[#F59E0B] transition-colors" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-white text-sm font-bold group-hover:text-[#F59E0B] transition-colors">{item.name}</span>
                                {item.new && (
                                  <span className="px-2 py-0.5 bg-[#F59E0B] text-black text-xs font-black rounded-full">NEW</span>
                                )}
                                {item.badge && (
                                  <span className="px-2 py-0.5 bg-white/20 text-white text-xs font-bold rounded-full">{item.badge}</span>
                                )}
                              </div>
                              <p className="text-white/60 text-xs">{item.description}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* AI Suggestions Section */}
                {aiSuggestions.length > 0 && (
                  <div className="border-t border-white/10 mt-8 pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Brain className="w-5 h-5 text-[#F59E0B]" />
                      <h3 className="text-white font-black">AI Suggestions for You</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {aiSuggestions.map((suggestion, index) => (
                        <Link
                          key={index}
                          href={suggestion.href}
                          onClick={() => setIsMegaMenuOpen(false)}
                          className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 border border-[#F59E0B]/30 rounded-xl hover:border-[#F59E0B]/50 transition-colors"
                        >
                          <suggestion.icon className="w-5 h-5 text-[#F59E0B]" />
                          <div>
                            <div className="text-white font-bold text-sm">{suggestion.name}</div>
                            <div className="text-white/60 text-xs">{suggestion.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

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
              <div className="px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
                {/* Mobile Search */}
                <div className="flex items-center bg-black/40 backdrop-blur-sm rounded-full border border-white/20 px-4 py-3">
                  <Search className="w-5 h-5 text-white/60 mr-3" />
                                <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    handleSearch(searchQuery);
                    setIsMobileMenuOpen(false);
                  }
                }}
                className="bg-transparent text-white placeholder:text-white/60 flex-1 focus:outline-none"
              />
                  <button
                    onClick={toggleVoiceSearch}
                    className={`ml-2 p-2 rounded-full transition-colors ${
                      isVoiceActive ? 'bg-[#F59E0B] text-black' : 'text-white/60'
                    }`}
                  >
                    {isVoiceActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                </div>

                {/* Mobile Navigation Sections */}
                {filteredSections.map((section, sectionIndex) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: sectionIndex * 0.1 }}
                  >
                    <button
                      onClick={() => setActiveSection(activeSection === section.title ? null : section.title)}
                      className="flex items-center justify-between w-full p-3 bg-white/5 rounded-xl border border-white/10"
                    >
                      <div className="flex items-center gap-3">
                        <section.icon className="w-5 h-5 text-[#F59E0B]" />
                        <span className="text-white font-bold">{section.title}</span>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-white/60 transition-transform ${
                        activeSection === section.title ? 'rotate-90' : ''
                      }`} />
                    </button>
                    
                    <AnimatePresence>
                      {activeSection === section.title && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-2 space-y-2"
                        >
                          {section.items.map((item, itemIndex) => (
                            <Link
                              key={itemIndex}
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center gap-3 p-3 ml-4 hover:bg-white/10 rounded-lg transition-colors"
                            >
                              <item.icon className="w-4 h-4 text-white/60" />
                              <div>
                                <div className="text-white font-bold text-sm">{item.name}</div>
                                <div className="text-white/60 text-xs">{item.description}</div>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}