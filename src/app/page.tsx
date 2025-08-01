"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Zap, 
  Building2, 
  Users, 
  Star, 
  Activity,
  Play,
  Sparkles,
  Target,
  Rocket,
  Crown,
  Flame,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Bell,
  GraduationCap,
  BookOpen,
  BarChart3,
  Shield,
  Heart,
  Brain,
  Video,
  Camera,
  Gamepad2,
  MapPin,
  Calendar,
  DollarSign,
  Check,
  ArrowRight,
  School,
  UserCheck,
  FileText,
  Globe,
  Megaphone,
  Award,
  TrendingUp,
  Clock,
  Send,
  X,
  Home,
  Eye,
  Bot,
  Building,
  Briefcase,
  Gift,
  ChevronDown,
  Music,
  Palette,
  Calculator,
  TestTube,
  Database,
  Wifi,
  Phone,
  Mail,
  MessageCircle
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import MegaNavigation from '../components/MegaNavigation';
import GageAIChat from '../components/GageAIChat';
import Link from 'next/link';

// Enhanced Hero Section with User Type Selection
function HeroSection() {
  const [activeUserType, setActiveUserType] = useState('student');
  const [showNotification, setShowNotification] = useState(false);

  const userTypes = [
    { id: 'student', label: 'Students', icon: GraduationCap, color: 'from-[#F59E0B] to-[#F97316]' },
    { id: 'parent', label: 'Parents', icon: Home, color: 'from-[#3B82F6] to-[#1E3A8A]' },
    { id: 'teacher', label: 'Teachers', icon: BookOpen, color: 'from-[#059669] to-[#10B981]' },
    { id: 'coach', label: 'Coaches', icon: Trophy, color: 'from-[#DC2626] to-[#EF4444]' },
    { id: 'admin', label: 'Administrators', icon: Building, color: 'from-[#7C3AED] to-[#5B21B6]' },
    { id: 'scout', label: 'Scouts', icon: Eye, color: 'from-[#EC4899] to-[#BE185D]' }
  ];

  const userContent = {
    student: {
      title: "Your Digital Stadium Awaits",
      subtitle: "Build your legacy from youth sports to college recruitment",
      features: [
        "AI-powered highlight reels every week",
        "College recruiting dashboard",
        "Academic & athletic tracking",
        "HYPE rewards system"
      ],
      cta: "Create Your Stadium",
      href: "/stadium/create",
      demo: "/dashboard"
    },
    parent: {
      title: "Track Every Achievement",
      subtitle: "Monitor your children's academic and athletic journey in one place",
      features: [
        "Multi-child dashboard",
        "Real-time notifications",
        "Direct teacher/coach messaging",
        "Schedule management"
      ],
      cta: "Get Parent Access",
      href: "/parent-signup",
      demo: "/parent-dashboard"
    },
    teacher: {
      title: "Revolutionize Your Classroom",
      subtitle: "AI-powered tools to enhance learning and communication",
      features: [
        "AI lesson planning assistant",
        "Smart gradebook integration",
        "Parent communication hub",
        "Student analytics dashboard"
      ],
      cta: "Join as Teacher",
      href: "/teacher-signup",
      demo: "/teacher-dashboard"
    },
    coach: {
      title: "Build Championship Programs",
      subtitle: "Professional tools for team management and player development",
      features: [
        "AI film room & analysis",
        "Team communication platform",
        "Player development tracking",
        "Recruiting pipeline manager"
      ],
      cta: "Start Coaching",
      href: "/coach-signup",
      demo: "/coach-dashboard"
    },
    admin: {
      title: "District-Wide Excellence",
      subtitle: "Comprehensive oversight and analytics for school leadership",
      features: [
        "District performance metrics",
        "Resource allocation tools",
        "Community engagement platform",
        "Strategic planning dashboard"
      ],
      cta: "Request Admin Demo",
      href: "/admin-demo",
      demo: "/superintendent-dashboard"
    },
    scout: {
      title: "Discover Tomorrow's Stars",
      subtitle: "AI-powered talent discovery and recruitment platform",
      features: [
        "Advanced search filters",
        "AI talent matching",
        "Video analysis tools",
        "Direct communication system"
      ],
      cta: "Scout Platform",
      href: "/scout-signup",
      demo: "/college-scout-dashboard"
    }
  };

  const currentContent = userContent[activeUserType as keyof typeof userContent];
  const IconComponent = userTypes.find(u => u.id === activeUserType)?.icon || GraduationCap;
  const gradient = userTypes.find(u => u.id === activeUserType)?.color || 'from-[#F59E0B] to-[#F97316]';

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#111827] to-black" />
        <motion.div
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      {/* Live Activity Ticker */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-16 md:top-20 left-0 right-0 bg-black/80 backdrop-blur-md border-y border-[#F59E0B]/30 py-2 md:py-4 overflow-hidden z-20 shadow-lg"
      >
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-6 md:gap-12 whitespace-nowrap"
        >
          <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1 bg-[#F59E0B]/10 rounded-full">
            <motion.span 
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[#F59E0B] font-bold text-xs md:text-sm flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#F59E0B] rounded-full"></span>
              LIVE
            </motion.span>
            <span className="text-white text-sm md:text-base font-medium">🏆 Marcus Thompson just earned 500 HYPE</span>
          </div>
          <span className="text-[#F59E0B] text-lg md:text-2xl">•</span>
          <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1 bg-[#F59E0B]/10 rounded-full">
            <span className="text-[#F59E0B] font-bold text-xs md:text-sm">TRENDING</span>
            <span className="text-white text-sm md:text-base font-medium">📹 Sarah Chen&apos;s highlight reel is trending</span>
          </div>
          <span className="text-[#F59E0B] text-lg md:text-2xl">•</span>
          <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1 bg-[#F59E0B]/10 rounded-full">
            <span className="text-[#F59E0B] font-bold text-xs md:text-sm">NEW</span>
            <span className="text-white text-sm md:text-base font-medium">🎯 Coach Martinez posted new training videos</span>
          </div>
          <span className="text-[#F59E0B] text-lg md:text-2xl">•</span>
          <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1 bg-[#F59E0B]/10 rounded-full">
            <span className="text-[#F59E0B] font-bold text-xs md:text-sm">UPDATE</span>
            <span className="text-white text-sm md:text-base font-medium">📚 Ms. Johnson shared AI lesson plans</span>
          </div>
          <span className="text-[#F59E0B] text-lg md:text-2xl">•</span>
          <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1 bg-[#F59E0B]/10 rounded-full">
            <span className="text-[#F59E0B] font-bold text-xs md:text-sm">ONLINE</span>
            <span className="text-white text-sm md:text-base font-medium">🏟️ 12,847 students online now</span>
          </div>
          {/* Duplicate for seamless loop */}
          <span className="text-[#F59E0B] text-lg md:text-2xl">•</span>
          <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1 bg-[#F59E0B]/10 rounded-full">
            <motion.span 
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-[#F59E0B] font-bold text-xs md:text-sm flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#F59E0B] rounded-full"></span>
              LIVE
            </motion.span>
            <span className="text-white text-sm md:text-base font-medium">🏆 Marcus Thompson just earned 500 HYPE</span>
          </div>
          <span className="text-[#F59E0B] text-lg md:text-2xl">•</span>
          <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1 bg-[#F59E0B]/10 rounded-full">
            <span className="text-[#F59E0B] font-bold text-xs md:text-sm">TRENDING</span>
            <span className="text-white text-sm md:text-base font-medium">📹 Sarah Chen&apos;s highlight reel is trending</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 pb-24">
        {/* User Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-xl md:text-2xl font-bold text-white/80 mb-6">I am a...</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {userTypes.map((type) => {
              const TypeIcon = type.icon;
              return (
                <motion.button
                  key={type.id}
                  onClick={() => setActiveUserType(type.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={clsx(
                    "px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2",
                    activeUserType === type.id
                      ? `bg-gradient-to-r ${type.color} text-white shadow-lg`
                      : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/20"
                  )}
                >
                  <TypeIcon className="w-5 h-5" />
                  {type.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Dynamic Content Based on User Type */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeUserType}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-8 inline-block"
            >
              <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${gradient} p-1 shadow-2xl`}>
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <IconComponent className="w-12 h-12 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6"
            >
              {currentContent.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto"
            >
              {currentContent.subtitle}
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12"
            >
              {currentContent.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
                >
                  <Check className="w-5 h-5 text-[#F59E0B] mb-2" />
                  <p className="text-white/90 text-sm">{feature}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href={currentContent.href}
                className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${gradient} text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300`}
              >
                <Rocket className="w-5 h-5" />
                {currentContent.cta}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={currentContent.demo}
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <Play className="w-5 h-5" />
                View Demo
              </Link>
            </motion.div>

            {/* UltraAI Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-12"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-black/50 backdrop-blur-sm rounded-full border border-[#F59E0B]/30">
                <Bot className="w-5 h-5 text-[#F59E0B]" />
                <span className="text-white font-bold">Powered by</span>
                <span className="text-[#F59E0B] font-black text-xl">UltraAI</span>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-10 left-10 hidden lg:block"
      >
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-[#F59E0B]" />
            <div>
              <p className="text-white font-bold">500+ Schools</p>
              <p className="text-white/60 text-sm">Already on UltraPreps</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sample Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="fixed top-24 right-4 bg-black/90 backdrop-blur-md rounded-xl p-4 border border-[#F59E0B]/30 shadow-2xl z-50 max-w-sm"
          >
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-[#F59E0B] mt-1" />
              <div className="flex-1">
                <p className="text-white font-bold">New Message from Coach</p>
                <p className="text-white/70 text-sm mt-1">Great practice today! Your highlight reel is ready.</p>
                <div className="flex gap-2 mt-3">
                  <Link href="/messages" className="text-[#F59E0B] text-sm font-bold hover:underline">View</Link>
                  <button 
                    onClick={() => setShowNotification(false)}
                    className="text-white/50 text-sm hover:text-white"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
              <button onClick={() => setShowNotification(false)}>
                <X className="w-4 h-4 text-white/50 hover:text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// Quick Access Portal Section
function QuickAccessPortal() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  const stakeholders = [
    {
      title: "Student Athletes",
      icon: Trophy,
      color: "from-[#F59E0B] to-[#F97316]",
      description: "Build your digital stadium, earn HYPE, get recruited",
      link: "/dashboard",
      features: ["Digital Stadium", "HYPE Economy", "AI Highlights", "Recruiting Tools"]
    },
    {
      title: "Coaches",
      icon: Megaphone,
      color: "from-[#3B82F6] to-[#1E3A8A]",
      description: "AI film room, team management, recruiting pipeline",
      link: "/coach-dashboard",
      features: ["AI Film Analysis", "Team Communication", "Player Development", "Game Planning"]
    },
    {
      title: "Parents",
      icon: Heart,
      color: "from-[#EC4899] to-[#BE185D]",
      description: "Monitor all your children, communicate with coaches & teachers",
      link: "/parent-dashboard",
      features: ["Multi-Child Tracking", "Direct Messaging", "Event Calendar", "Progress Reports"]
    },
    {
      title: "Teachers",
      icon: GraduationCap,
      color: "from-[#8B5CF6] to-[#6D28D9]",
      description: "AI lesson planning, smart gradebook, parent communication",
      link: "/teacher-dashboard",
      features: ["AI Lesson Planner", "Smart Gradebook", "Parent Hub", "Student Analytics"]
    },
    {
      title: "Athletic Directors",
      icon: Shield,
      color: "from-[#10B981] to-[#059669]",
      description: "Manage all sports programs, facilities, and championships",
      link: "/athletic-director-dashboard",
      features: ["Program Analytics", "Facility Management", "Budget Tracking", "Championship Legacy"]
    },
    {
      title: "College Scouts",
      icon: Eye,
      color: "from-[#F59E0B] to-[#D97706]",
      description: "AI talent matching, virtual scouting, predictive analytics",
      link: "/college-scout-dashboard",
      features: ["AI Talent Search", "Video Analysis", "Recruiting Pipeline", "Performance Metrics"]
    },
    {
      title: "School Boards",
      icon: Building2,
      color: "from-[#6366F1] to-[#4F46E5]",
      description: "District oversight, policy management, community engagement",
      link: "/school-board-dashboard",
      features: ["Policy Management", "Budget Oversight", "Community Metrics", "Strategic Planning"]
    },
    {
      title: "Booster Clubs",
      icon: DollarSign,
      color: "from-[#14B8A6] to-[#0D9488]",
      description: "Fundraising tools, member management, event coordination",
      link: "/booster-club-dashboard",
      features: ["Fundraising Campaigns", "Member Portal", "Event Planning", "Financial Reports"]
    },
    {
      title: "Youth Coaches",
      icon: Users,
      color: "from-[#FB923C] to-[#F97316]",
      description: "Develop young athletes, communicate with parents, track progress",
      link: "/youth-coach-dashboard",
      features: ["Skill Development", "Parent Updates", "Practice Planning", "Player Safety"]
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1E3A8A]/10 to-black" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-3xl" />

      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#F59E0B]/20 border border-[#F59E0B]/40 rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5 text-[#F59E0B]" />
            <span className="text-[#F59E0B] font-bold uppercase tracking-wider">Choose Your Path</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 uppercase"
          >
            Who Are You?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            Select your role to access your personalized dashboard and revolutionary AI tools
          </motion.p>
        </div>

        {/* Stakeholder Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stakeholders.map((stakeholder, index) => {
            const Icon = stakeholder.icon;
            return (
              <motion.a
                key={stakeholder.title}
                href={stakeholder.link}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 overflow-hidden hover:border-[#F59E0B]/50 transition-all duration-300"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stakeholder.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <div className={`w-16 h-16 mb-4 rounded-xl bg-gradient-to-r ${stakeholder.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-[#F59E0B] transition-colors">
                  {stakeholder.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 mb-4 text-sm">
                  {stakeholder.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {stakeholder.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#F59E0B]" />
                      <span className="text-white/60 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="flex items-center gap-2 text-[#F59E0B] font-bold group-hover:gap-4 transition-all duration-300">
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-[#F59E0B] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.a>
            );
          })}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Active Students", value: "4.2M+", icon: Users },
            { label: "Schools Connected", value: "12,847", icon: School },
            { label: "HYPE Distributed", value: "50M+", icon: Zap },
            { label: "Success Rate", value: "98%", icon: Trophy }
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <Icon className="w-8 h-8 text-[#F59E0B] mx-auto mb-2" />
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-white/80 mb-6 text-lg">
            Not sure where to start? Create your free account and we&apos;ll guide you!
          </p>
          <motion.a
            href="/stadium/create"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black font-black rounded-full text-lg uppercase tracking-wider hover:shadow-2xl transition-all duration-300"
            style={{
              boxShadow: '0 10px 40px rgba(245, 158, 11, 0.3)'
            }}
          >
            <Rocket className="w-6 h-6" />
            Get Started Now
            <ArrowRight className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Platform Overview Section
function PlatformOverview() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const stats = [
    { number: "4.2M+", label: "Active Students", icon: Users },
    { number: "500+", label: "Partner Schools", icon: School },
    { number: "98%", label: "Satisfaction Rate", icon: Star },
    { number: "50M+", label: "HYPE Distributed", icon: Zap }
  ];

  return (
    <section ref={ref} className="py-24 px-4 bg-gradient-to-b from-black via-[#111827] to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            The Future of Student Achievement
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            One platform connecting students, parents, teachers, coaches, and schools with UltraAI technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <Icon className="w-12 h-12 text-[#F59E0B] mx-auto mb-4" />
                <p className="text-4xl font-black text-white mb-2">{stat.number}</p>
                <p className="text-white/60">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Platform Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#F59E0B]/50 transition-all"
          >
            <Video className="w-10 h-10 text-[#F59E0B] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">UltraAI Video Engine</h3>
            <p className="text-white/70">Weekly highlight reels with AI voiceover and professional editing</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#F59E0B]/50 transition-all"
          >
            <MessageSquare className="w-10 h-10 text-[#F59E0B] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Universal Communication</h3>
            <p className="text-white/70">Real-time messaging between all stakeholders with AI translation</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-[#F59E0B]/50 transition-all"
          >
            <Shield className="w-10 h-10 text-[#F59E0B] mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Digital Legacy Vault</h3>
            <p className="text-white/70">Preserve every achievement and memory forever in the cloud</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Features Showcase Section
function FeaturesShowcase() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Digital Stadium",
      icon: Trophy,
      description: "Your personalized arena showcasing all achievements",
      link: "/stadium/create",
      image: "/feature-stadium.jpg",
      highlights: [
        "Custom branding with school colors",
        "Interactive 3D trophy room",
        "Real-time stats dashboard",
        "Social sharing tools"
      ]
    },
    {
      title: "HYPE Economy",
      icon: Zap,
      description: "Earn, spend, and transfer HYPE points for real rewards",
      link: "/dashboard",
      image: "/feature-hype.jpg",
      highlights: [
        "130% sustainability rule",
        "Real-world rewards",
        "Achievement multipliers",
        "Community challenges"
      ]
    },
    {
      title: "AI Highlights",
      icon: Video,
      description: "ESPN-grade highlight reels generated automatically",
      link: "/dashboard",
      image: "/feature-highlights.jpg",
      highlights: [
        "Professional voiceover",
        "Cinematic effects",
        "School branding",
        "Social media ready"
      ]
    },
    {
      title: "HeroCard Creator",
      icon: Star,
      description: "Professional trading cards with your stats and achievements",
      link: "/herocard/create",
      image: "/feature-herocard.jpg",
      highlights: [
        "Custom designs",
        "QR code linking",
        "Holographic effects",
        "Print-ready formats"
      ]
    },
    {
      title: "Recruiting Hub",
      icon: Eye,
      description: "Connect with college scouts and showcase your talent",
      link: "/recruiting",
      image: "/feature-recruiting.jpg",
      highlights: [
        "AI talent matching",
        "Direct scout messaging",
        "Performance analytics",
        "Virtual tryouts"
      ]
    },
    {
      title: "Community Feed",
      icon: Users,
      description: "Connect with teammates, schools, and the UltraPreps network",
      link: "/community",
      image: "/feature-community.jpg",
      highlights: [
        "Real-time updates",
        "Event coordination",
        "Team challenges",
        "Parent engagement"
      ]
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-black via-[#1E3A8A]/5 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-[#F59E0B]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-[600px] h-[600px] bg-[#3B82F6]/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#F59E0B]/20 border border-[#F59E0B]/40 rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5 text-[#F59E0B]" />
            <span className="text-[#F59E0B] font-bold uppercase tracking-wider">Platform Features</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 uppercase"
          >
            Everything You Need
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            Comprehensive tools and features designed to elevate every aspect of your journey
          </motion.p>
        </div>

        {/* Feature Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.button
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => setActiveFeature(index)}
                  className={`
                    flex items-center gap-3 px-6 py-3 rounded-full font-bold transition-all duration-300
                    ${activeFeature === index 
                      ? 'bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black scale-105' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{feature.title}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Active Feature Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Feature Details */}
            <div>
              <h3 className="text-3xl font-black text-white mb-4">
                {features[activeFeature].title}
              </h3>
              <p className="text-xl text-white/80 mb-8">
                {features[activeFeature].description}
              </p>
              
              {/* Highlights */}
              <div className="space-y-3 mb-8">
                {features[activeFeature].highlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-[#F59E0B]" />
                    </div>
                    <span className="text-white/70">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.a
                href={features[activeFeature].link}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black font-bold rounded-xl hover:shadow-2xl transition-all duration-300"
              >
                Explore {features[activeFeature].title}
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>

            {/* Feature Visual */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#F59E0B]/20 to-[#F97316]/20 p-8">
                {/* Placeholder for feature visual */}
                <div className="aspect-video bg-black/50 rounded-xl flex items-center justify-center">
                  {React.createElement(features[activeFeature].icon, {
                    className: "w-32 h-32 text-[#F59E0B]/50"
                  })}
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-[#F59E0B]/20 rounded-full blur-2xl" />
                <div className="absolute bottom-4 left-4 w-24 h-24 bg-[#F97316]/20 rounded-full blur-2xl" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Quick Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { title: "Create Stadium", link: "/stadium/create", icon: Building2 },
            { title: "Create HeroCard", link: "/herocard/create", icon: Star },
            { title: "Create Poster", link: "/poster/create", icon: Trophy },
            { title: "Join Community", link: "/community", icon: Users }
          ].map((quickLink) => {
            const Icon = quickLink.icon;
            return (
              <motion.a
                key={quickLink.title}
                href={quickLink.link}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:border-[#F59E0B]/50 transition-all duration-300"
              >
                <Icon className="w-12 h-12 text-[#F59E0B] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-white group-hover:text-[#F59E0B] transition-colors">
                  {quickLink.title}
                </h4>
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}

// Final Call to Action Section
function CallToAction() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/10 via-transparent to-[#F97316]/10" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <Crown className="w-20 h-20 text-[#F59E0B] mx-auto mb-6" />
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6">
            Your Stadium Awaits
          </h2>
          <p className="text-2xl text-white/80 mb-12">
            Join 4.2 million students already building their legacy
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/stadium/create"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black font-black rounded-full text-xl shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <Rocket className="w-6 h-6" />
            Create Your Stadium Now
            <ArrowRight className="w-6 h-6" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-5 bg-white/10 text-white font-bold rounded-full text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <MessageSquare className="w-5 h-5" />
            Questions? Let&apos;s Talk
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "500+", label: "Schools" },
            { number: "4.2M+", label: "Students" },
            { number: "98%", label: "Satisfaction" },
            { number: "24/7", label: "Support" }
          ].map((stat, index) => (
            <div key={index}>
              <p className="text-3xl font-black text-[#F59E0B]">{stat.number}</p>
              <p className="text-white/60">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Enhanced Footer
function EnhancedFooter() {
  const footerLinks = {
    product: {
      title: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Demos", href: "/demos" },
        { name: "UltraAI Technology", href: "/ultraai" }
      ]
    },
    solutions: {
      title: "Solutions",
      links: [
        { name: "For Students", href: "/solutions/students" },
        { name: "For Parents", href: "/solutions/parents" },
        { name: "For Teachers", href: "/solutions/teachers" },
        { name: "For Schools", href: "/solutions/schools" },
        { name: "For Districts", href: "/solutions/districts" }
      ]
    },
    resources: {
      title: "Resources",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Blog", href: "/blog" },
        { name: "API Documentation", href: "/api-docs" },
        { name: "System Status", href: "/status" },
        { name: "Video Tutorials", href: "/tutorials" }
      ]
    },
    company: {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
        { name: "Press Kit", href: "/press" },
        { name: "Partners", href: "/partners" }
      ]
    }
  };

  const socialLinks = [
    { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>, href: "https://facebook.com/ultrapreps" },
    { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>, href: "https://twitter.com/ultrapreps" },
    { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/></svg>, href: "https://instagram.com/ultrapreps" },
    { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>, href: "https://youtube.com/ultrapreps" },
    { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, href: "https://linkedin.com/company/ultrapreps" }
  ];

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-8 h-8 text-[#F59E0B]" />
              <span className="text-2xl font-black text-white">UltraPreps</span>
            </div>
            <p className="text-white/60 mb-6">
              Every student deserves greatness. Build your digital legacy with UltraAI technology.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#F59E0B] transition-all text-white hover:text-black"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-white font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-[#F59E0B] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-bold text-white mb-4">Stay in the Game</h3>
            <p className="text-white/60 mb-4">Get updates on new features and tips for success</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/50 focus:outline-none focus:border-[#F59E0B]"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black font-bold rounded-full hover:scale-105 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} UltraPreps. All rights reserved. Powered by UltraAI.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-white/60 hover:text-[#F59E0B] text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-[#F59E0B] text-sm">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-white/60 hover:text-[#F59E0B] text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Homepage Component
export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeUserType, setActiveUserType] = useState('student');
  const [showWelcomeNotification, setShowWelcomeNotification] = useState(false);

  // Register service worker for PWA functionality
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('🏈 UltraPreps SW registered:', registration);
        })
        .catch((error) => {
          console.log('❌ SW registration failed:', error);
        });
    }

    // Show welcome notification after 2 seconds
    const timer = setTimeout(() => {
      setShowWelcomeNotification(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Navigation */}
      <MegaNavigation currentPage="home" userRole="guest" userName="Guest User" />
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Quick Access Portal */}
        <QuickAccessPortal />
        
        {/* Platform Overview */}
        <PlatformOverview />
        
        {/* Features Showcase */}
        <FeaturesShowcase />
        
        {/* Final CTA */}
        <CallToAction />
        
        {/* Enhanced Footer */}
        <EnhancedFooter />
      </div>
      
      {/* Gage AI Chat */}
      <GageAIChat
        userId="guest"
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
      
      {/* Welcome Notification */}
      <AnimatePresence>
        {showWelcomeNotification && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="fixed top-24 right-4 bg-black/90 backdrop-blur-md rounded-xl p-4 border border-[#F59E0B]/30 shadow-2xl z-50 max-w-sm"
          >
            <div className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-[#F59E0B] mt-1" />
              <div className="flex-1">
                <p className="text-white font-bold">Welcome to UltraPreps!</p>
                <p className="text-white/70 text-sm mt-1">Your journey to greatness starts here. Create your stadium now!</p>
                <div className="flex gap-2 mt-3">
                  <Link href="/stadium/create" className="text-[#F59E0B] text-sm font-bold hover:underline">Get Started</Link>
                  <button 
                    onClick={() => setShowWelcomeNotification(false)}
                    className="text-white/50 text-sm hover:text-white"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
              <button onClick={() => setShowWelcomeNotification(false)}>
                <X className="w-4 h-4 text-white/50 hover:text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}