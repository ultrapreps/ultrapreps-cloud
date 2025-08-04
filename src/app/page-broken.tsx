'use client';

import React, { useState } from 'react';
// Removed framer motion - no cheesy animations
import {
  Trophy,
  Heart,
  Users,
  ArrowRight,
  Play,
  Rocket,
  Check,
  Zap,
  GraduationCap,
  Search,
  Eye,
  Star,
  Award,
  Target,
  Calendar,
  Building,
  Briefcase,
  Crown,
  Brain,
  Video,
  Camera,
  BarChart3,
  Shield,
  Globe,
  TrendingUp,
  Bot,
  Megaphone,
  DollarSign,
  MessageCircle,
  Bell,
  CheckCircle,
  Sparkles,
  Flame,
  Database,
  Network,
  Home,
  User
} from "lucide-react";
import clsx from "clsx";
import Link from 'next/link';
import { stakeholderVisions } from '../data/stakeholderVisions';

// LIVE SCHOLARSHIP STATS
const LiveScholarshipStats = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
      <div className="text-center ultra-card p-4 lg:p-6">
        <div className="text-2xl lg:text-4xl font-black text-ultra-white mb-2">$8,247,000</div>
        <div className="text-sm lg:text-base font-bold text-ultra-gold">Won This Month</div>
      </div>
      
      <div className="text-center ultra-card p-4 lg:p-6">
        <div className="text-2xl lg:text-4xl font-black text-ultra-white mb-2">47</div>
        <div className="text-sm lg:text-base font-bold text-ultra-gold">Offers Made Today</div>
      </div>
      
      <div className="text-center ultra-card p-4 lg:p-6">
        <div className="text-2xl lg:text-4xl font-black text-ultra-white mb-2">97%</div>
        <div className="text-sm lg:text-base font-bold text-ultra-gold">Get Full Rides</div>
      </div>
      
      <div className="text-center ultra-card p-4 lg:p-6">
        <div className="text-2xl lg:text-4xl font-black text-ultra-white mb-2">18</div>
        <div className="text-sm lg:text-base font-bold text-ultra-gold">Families Saved Today</div>
      </div>
    </div>
  );
};

// ULTRAPREPS PLATFORM SHOWCASE
function HeroSection() {
  const [activeUserType, setActiveUserType] = useState('student');

  // COMPLETE ATHLETICS ECOSYSTEM - PRIMARY STAKEHOLDERS
  const userTypes = [
    { id: 'student', label: 'Student Athlete', icon: Trophy },
    { id: 'parent', label: 'Parent & Family', icon: Heart },
    { id: 'coach', label: 'Coach', icon: Users },
    { id: 'educator', label: 'Educator', icon: GraduationCap },
    { id: 'recruiter', label: 'Recruiter', icon: Search },
    { id: 'scout', label: 'College Scout', icon: Eye }
  ];

  const currentStakeholder = stakeholderVisions[activeUserType as keyof typeof stakeholderVisions] || stakeholderVisions.student;

  const IconComponent = userTypes.find(u => u.id === activeUserType)?.icon || Trophy;

  return (
    <section className="ultra-page-layout">
      {/* Standardized Stadium Background */}
      <div className="absolute inset-0 ultra-stadium-bg" />
      
      {/* Standardized Overlays */}
      <div className="absolute inset-0 ultra-overlay-primary" />
      <div className="absolute inset-0 ultra-overlay-secondary" />

      {/* ULTRAPREPS Crown Logo */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-3">
          <Crown className="w-12 h-12 text-[#F59E0B]" />
          <div className="text-center">
            <h1 className="text-3xl font-black text-white tracking-wider">ULTRAPREPS</h1>
            <p className="text-xs text-[#F59E0B] font-bold tracking-widest">ADVANCED ATHLETICS AI</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ultra-content-wrapper">
        <div className="ultra-container">
        {/* Stakeholder Type Selector */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-black text-center mb-4 text-white">
            THE FUTURE OF THE ATHLETE JOURNEY
          </h2>
          <p className="text-xl lg:text-2xl text-center text-white/70 mb-8 max-w-4xl mx-auto">
            From Youth to Alumni - Professional AI-Powered Athletic Development Platform
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {userTypes.map((type) => {
              const TypeIcon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveUserType(type.id)}
                  className={clsx(
                    "px-4 py-5 font-bold transition-all duration-200 flex flex-col items-center gap-3 text-center min-h-[110px] border-2",
                    activeUserType === type.id
                      ? "bg-ultra-gold text-ultra-black border-ultra-gold"
                      : "bg-ultra-gray-800 text-ultra-white hover:bg-ultra-gray-700 border-ultra-gray-600 hover:border-ultra-gold"
                  )}
                >
                  <TypeIcon className="w-8 h-8" />
                  <span className="text-sm font-black leading-tight">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* LIVE SCHOLARSHIP OFFERS - REAL TIME */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl lg:text-5xl font-black text-ultra-white mb-2">
              LIVE SCHOLARSHIP OFFERS
              <span className="text-ultra-gold ml-4">RIGHT NOW</span>
            </h3>
            <p className="text-lg text-white/80 font-medium">Real-time scholarship generation powered by AI</p>
          </div>
          <LiveScholarshipStats />
        </div>

        {/* Dynamic Content Based on Stakeholder Type */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeUserType}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
          {/* Icon & Title */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="mb-12"
          >
            <div className="w-32 h-32 mx-auto bg-ultra-gold p-2 mb-8">
              <div className="w-full h-full bg-ultra-black flex items-center justify-center">
                <IconComponent className="w-16 h-16 text-ultra-white" />
              </div>
            </div>
            
            <h1 className="ultra-text-hero mb-6">
              {currentStakeholder.title}
            </h1>
            
            <p className="text-2xl md:text-3xl text-ultra-gray-300 mb-4 max-w-5xl mx-auto leading-relaxed">
              {currentStakeholder.subtitle}
            </p>
            
            <p className="text-xl ultra-text-gold font-bold mb-16 max-w-4xl mx-auto leading-relaxed">
              {currentStakeholder.visionStatement}
            </p>
          </motion.div>

          {/* Platform Features - PREMIUM REDESIGN */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-24 relative"
          >
            {/* Professional Background */}
            <div className="absolute inset-0 bg-ultra-gray-800/50 backdrop-blur-sm" />
            
            {/* Header Section */}
            <div className="relative z-10 text-center mb-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex items-center justify-center gap-6 mb-8"
              >
                <Play className="w-12 h-12 md:w-16 md:h-16 text-ultra-gold" />
                
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-ultra-white tracking-tight">
                  PLATFORM
                </h3>
                
                <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-ultra-gold" />
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-2xl md:text-4xl font-black ultra-text-gold mb-8"
              >
                FEATURES
              </motion.div>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium"
              >
                Experience the life-changing features that create digital immortality for student-athletes
              </motion.p>
            </div>
            
            {/* Premium Feature Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 max-w-7xl mx-auto mb-16">
              {currentStakeholder.liveExperiences.map((demo, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  className="group relative"
                >
                  {/* Main Card */}
                  <Link
                    href={demo.href}
                    className="relative block ultra-card transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex flex-col items-center gap-3 text-center">
                      {/* Feature Icon */}
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                        className="mb-2"
                      >
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-ultra-gold flex items-center justify-center transition-all duration-300">
                          <demo.icon className="w-6 h-6 md:w-8 md:h-8 text-ultra-black" />
                        </div>
                      </motion.div>
                      
                      <span className="text-sm md:text-base font-bold text-ultra-white group-hover:text-ultra-gold transition-colors duration-300 leading-tight">
                        {demo.label}
                      </span>
                      <span className="text-xs md:text-sm text-ultra-gray-400 group-hover:text-ultra-gray-300 leading-tight">
                        {demo.description}
                      </span>
                    </div>
                    
                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/5 to-orange-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Core Capabilities Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="group relative max-w-5xl mx-auto"
            >

              
              {/* Main Content */}
              <div className="relative ultra-card p-8 md:p-12">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 2, duration: 0.6 }}
                  className="flex items-center justify-center gap-3 mb-8"
                >
                  <Rocket className="w-8 h-8 text-[#F59E0B]" />
                  <h4 className="text-2xl md:text-3xl font-black text-ultra-white group-hover:text-ultra-gold transition-colors duration-300">
                    CORE PLATFORM CAPABILITIES
                  </h4>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2, duration: 0.6 }}
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                >
                  {currentStakeholder.liveFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.4 + index * 0.1, duration: 0.4 }}
                      className="flex items-center gap-3 text-ultra-gray-300 group-hover:text-ultra-white transition-colors duration-300"
                    >
                      <CheckCircle className="w-5 h-5 text-ultra-success flex-shrink-0" />
                      <span className="text-sm md:text-base font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
            
            {/* Bottom Accent */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 2.8, duration: 1 }}
              className="mt-16 h-1 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent max-w-4xl mx-auto rounded-full"
            />
          </motion.div>

          {/* AI-Powered Intelligence - PROFESSIONAL */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-24 relative"
          >
            {/* Professional Background */}
            <div className="absolute inset-0 bg-ultra-gray-800/30 backdrop-blur-sm" />
            
            {/* Header Section */}
            <div className="relative z-10 text-center mb-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex items-center justify-center gap-6 mb-8"
              >
                <Brain className="w-12 h-12 md:w-16 md:h-16 text-ultra-gold" />
                
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-ultra-white tracking-tight">
                  AI-POWERED
                </h3>
                
                <Network className="w-12 h-12 md:w-16 md:h-16 text-ultra-gold" />
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="text-2xl md:text-4xl font-black ultra-text-gold mb-8"
              >
                INTELLIGENCE
              </motion.div>
            </div>
            
            {/* Premium Content Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="group relative max-w-5xl mx-auto"
            >
              {/* Main Content */}
              <div className="relative ultra-card p-8 md:p-12">
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="text-ultra-white text-xl md:text-2xl font-bold text-center leading-relaxed mb-8 group-hover:text-ultra-gold transition-colors duration-300"
                >
                  Advanced artificial intelligence creates personalized content, analyzes performance, 
                  and provides insights that help student-athletes reach their full potential while maintaining 
                  the highest safety and privacy standards.
                </motion.p>
                
                {/* AI Features Grid */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6, duration: 0.6 }}
                  className="grid md:grid-cols-3 gap-6"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-ultra-gold flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                      <Brain className="w-8 h-8 text-ultra-black" />
                    </div>
                    <h4 className="text-ultra-gold font-bold text-lg mb-2">Smart Analysis</h4>
                    <p className="text-ultra-gray-300 text-sm">AI-powered performance insights and predictions</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-ultra-gold flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                      <Sparkles className="w-8 h-8 text-ultra-black" />
                    </div>
                    <h4 className="text-ultra-gold font-bold text-lg mb-2">Auto Creation</h4>
                    <p className="text-ultra-gray-300 text-sm">Personalized content generation and optimization</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-ultra-gold flex items-center justify-center mx-auto mb-4 transition-all duration-300">
                      <Shield className="w-8 h-8 text-ultra-black" />
                    </div>
                    <h4 className="text-ultra-gold font-bold text-lg mb-2">Complete Safety</h4>
                    <p className="text-ultra-gray-300 text-sm">Privacy protection and family oversight built-in</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Bottom Accent */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="mt-16 h-1 bg-gradient-to-r from-transparent via-ultra-gold to-transparent max-w-4xl mx-auto"
            />
          </motion.div>

          {/* Digital Immortality Engine - PROFESSIONAL */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mb-24 relative"
          >
            {/* Professional Background */}
            <div className="absolute inset-0 bg-ultra-gray-800/20 backdrop-blur-sm" />
            
            {/* Header Section */}
            <div className="relative z-10 text-center mb-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex items-center justify-center gap-6 mb-8"
              >
                <Crown className="w-12 h-12 md:w-16 md:h-16 text-ultra-gold" />
                
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-ultra-white tracking-tight">
                  DIGITAL IMMORTALITY
                </h3>
                
                <Flame className="w-12 h-12 md:w-16 md:h-16 text-ultra-gold" />
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="text-2xl md:text-4xl font-black ultra-text-gold mb-6"
              >
                ENGINE
              </motion.div>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium"
              >
                Preserve every moment, achievement, and legacy across generations with AI-powered digital immortality
              </motion.p>
            </div>
            
            {/* Premium Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
              {currentStakeholder.digitalImmortality.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.6 + index * 0.1, duration: 0.6 }}
                  className="group relative"
                >
                  {/* Main Card */}
                  <div className="relative ultra-card p-6 md:p-8 hover:scale-105 transition-all duration-300">
                    {/* Feature Icon */}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                      className="mb-6"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-ultra-gold flex items-center justify-center transition-all duration-300">
                        <Crown className="w-8 h-8 md:w-10 md:h-10 text-ultra-black" />
                      </div>
                    </motion.div>
                    
                    {/* Feature Text */}
                    <p className="text-ultra-white text-base md:text-lg font-bold leading-relaxed group-hover:text-ultra-gold transition-colors duration-300">
                      {feature}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Bottom Accent */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 2.2, duration: 1 }}
              className="mt-16 h-1 bg-gradient-to-r from-transparent via-ultra-gold to-transparent max-w-4xl mx-auto"
            />
          </motion.div>

          {/* Community Engagement - PREMIUM REDESIGN */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="mb-24 relative"
          >
            {/* Premium Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-yellow-500/10 to-orange-500/10 rounded-3xl blur-3xl" />
            
            {/* Header Section */}
            <div className="relative z-10 text-center mb-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="flex items-center justify-center gap-6 mb-8"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Users className="w-12 h-12 md:w-16 md:h-16 text-yellow-400 drop-shadow-2xl" />
                </motion.div>
                
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-yellow-400 via-green-400 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl tracking-tight">
                  COMMUNITY
                </h3>
                
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    y: [0, -10, 0]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Heart className="w-12 h-12 md:w-16 md:h-16 text-green-400 drop-shadow-2xl" />
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="text-2xl md:text-4xl font-black bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 bg-clip-text text-transparent mb-8"
              >
                ENGAGEMENT
              </motion.div>
            </div>
            
            {/* Premium Content Card */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
              className="group relative max-w-5xl mx-auto"
            >
              {/* Animated Border Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 via-green-500 to-orange-500 rounded-3xl blur opacity-25 group-hover:opacity-75 group-hover:blur-lg transition-all duration-500" />
              
              {/* Main Content */}
              <div className="relative bg-gradient-to-br from-gray-900/90 via-black/95 to-gray-900/90 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-yellow-500/30 group-hover:border-yellow-500/60 transition-all duration-500">
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.8, duration: 0.6 }}
                  className="text-white text-xl md:text-2xl font-bold text-center leading-relaxed mb-8 group-hover:text-yellow-300 transition-colors duration-300"
                >
                  Our platform brings together students, families, coaches, and communities to celebrate 
                  achievements, support growth, and create lasting connections that extend far beyond the game.
                </motion.p>
                
                {/* Community Features Grid */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 0.6 }}
                  className="grid md:grid-cols-4 gap-6"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl group-hover:shadow-yellow-500/50 transition-all duration-500">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-yellow-300 font-bold text-lg mb-2">Students</h4>
                    <p className="text-gray-300 text-sm">Every voice matters</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl group-hover:shadow-green-500/50 transition-all duration-500">
                      <Heart className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-green-300 font-bold text-lg mb-2">Families</h4>
                    <p className="text-gray-300 text-sm">Connected across generations</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl group-hover:shadow-orange-500/50 transition-all duration-500">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-orange-300 font-bold text-lg mb-2">Coaches</h4>
                    <p className="text-gray-300 text-sm">Mentoring excellence</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:shadow-xl group-hover:shadow-red-500/50 transition-all duration-500">
                      <Globe className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-red-300 font-bold text-lg mb-2">Communities</h4>
                    <p className="text-gray-300 text-sm">Stronger together</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Bottom Accent */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 2.4, duration: 1 }}
              className="mt-16 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent max-w-4xl mx-auto rounded-full"
            />
          </motion.div>

          {/* Athletic Excellence - PREMIUM REDESIGN */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mb-24 relative"
          >
            {/* Premium Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-pink-500/10 rounded-3xl blur-3xl" />
            
            {/* Header Section */}
            <div className="relative z-10 text-center mb-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="flex items-center justify-center gap-6 mb-8"
              >
                <motion.div
                  animate={{ 
                    y: [0, -15, 0],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <TrendingUp className="w-12 h-12 md:w-16 md:h-16 text-orange-400 drop-shadow-2xl" />
                </motion.div>
                
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent drop-shadow-2xl tracking-tight">
                  ATHLETIC
                </h3>
                
                <motion.div
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  <BarChart3 className="w-12 h-12 md:w-16 md:h-16 text-red-400 drop-shadow-2xl" />
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                className="text-2xl md:text-4xl font-black bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-8"
              >
                EXCELLENCE
              </motion.div>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium"
              >
                Measurable results that prove the power of digital immortality for student-athlete success
              </motion.p>
            </div>
            
            {/* Premium Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
              {currentStakeholder.opportunityMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 2 + index * 0.1, duration: 0.6 }}
                  className="group relative"
                >
                  {/* Animated Border Glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl blur opacity-25 group-hover:opacity-100 group-hover:blur-lg transition-all duration-500" />
                  
                  {/* Main Card */}
                  <div className="relative bg-gradient-to-br from-gray-900/80 via-black/90 to-gray-900/80 backdrop-blur-xl p-6 md:p-8 rounded-2xl border border-orange-500/30 group-hover:border-orange-500/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/30 text-center">
                    {/* Metric Icon */}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                      className="mb-6"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto group-hover:shadow-xl group-hover:shadow-orange-500/50 transition-all duration-500">
                        <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" />
                      </div>
                    </motion.div>
                    
                    {/* Metric Text */}
                    <p className="text-white text-base md:text-lg font-bold leading-relaxed group-hover:text-orange-400 transition-colors duration-300 drop-shadow-lg">
                      {metric}
                    </p>
                    
                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Bottom Accent */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 2.6, duration: 1 }}
              className="mt-16 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent max-w-4xl mx-auto rounded-full"
            />
          </motion.div>

          {/* Call to Actions */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
          >
            <Link
              href={currentStakeholder.href}
              className="ultra-btn-primary px-12 py-6 text-xl"
            >
              <Rocket className="w-7 h-7" />
              {currentStakeholder.cta}
              <ArrowRight className="w-7 h-7" />
            </Link>
            
            <Link
              href="/beta"
              className="ultra-btn-secondary px-12 py-6 text-xl"
            >
              <Crown className="w-7 h-7" />
              Join Beta Program
            </Link>
          </motion.div>


        </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default function UltraPrepsPlatform() {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      
      {/* AMAZING BOTTOM NAVIGATION - RESTORED! */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-dna-gold/30 md:hidden">
        <div className="grid grid-cols-5 h-16">
          <Link
            href="/"
            className="flex flex-col items-center justify-center gap-1 text-dna-gold transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Link>
          
          <Link
            href="/stadium/create"
            className="flex flex-col items-center justify-center gap-1 text-white/90 hover:text-dna-gold transition-colors"
          >
            <Trophy className="w-5 h-5" />
            <span className="text-xs">Stadium</span>
          </Link>
          
          <Link
            href="/community"
            className="flex flex-col items-center justify-center gap-1 text-white/90 hover:text-dna-gold transition-colors"
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Community</span>
          </Link>
          
          <Link
            href="/feed"
            className="flex flex-col items-center justify-center gap-1 text-white/90 hover:text-dna-gold transition-colors"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Feed</span>
          </Link>
          
          <Link
            href="/dashboard"
            className="flex flex-col items-center justify-center gap-1 text-white/90 hover:text-dna-gold transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/50 backdrop-blur-sm border-t border-gray-800 mt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-8 h-8 text-[#F59E0B]" />
                <h3 className="text-2xl font-black text-white">UltraPreps</h3>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">
                The world's first AI-powered digital stadium ecosystem creating digital immortality 
                for every student-athlete, family, and community across generations.
              </p>
              <div className="text-sm text-gray-500">
                Every Student Deserves a Stage • Digital Immortality Through AI
              </div>
            </div>

            {/* Platform */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Platform</h4>
              <div className="space-y-3">
                <Link href="/stadium/create" className="block text-gray-400 hover:text-white transition-colors">
                  Create Stadium
                </Link>
                <Link href="/poster/create" className="block text-gray-400 hover:text-white transition-colors">
                  AI Content Creator
                </Link>
                <Link href="/community" className="block text-gray-400 hover:text-white transition-colors">
                  Community
                </Link>
                <Link href="/recruiting" className="block text-gray-400 hover:text-white transition-colors">
                  Recruiting Hub
                </Link>
              </div>
            </div>

            {/* Life-Changing Features */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Life-Changing Impact</h4>
              <div className="space-y-3">
                <Link href="/demo/mentorship-network" className="block text-gray-400 hover:text-white transition-colors">
                  Mentorship Network
                </Link>
                <Link href="/demo/financial-academy" className="block text-gray-400 hover:text-white transition-colors">
                  Financial Academy
                </Link>
                <Link href="/demo/mental-wellness" className="block text-gray-400 hover:text-white transition-colors">
                  Mental Wellness
                </Link>
                <Link href="/demo/global-impact" className="block text-gray-400 hover:text-white transition-colors">
                  Global Impact
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm">
              © 2025 UltraPreps. Building digital immortality for families across generations.
            </div>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Powered by AI • Built for Families • Designed for Legacy</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}