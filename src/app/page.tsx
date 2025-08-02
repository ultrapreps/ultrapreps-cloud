'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// ULTRAPREPS BILLION-DOLLAR VISION SHOWCASE
function HeroSection() {
  const [activeUserType, setActiveUserType] = useState('student');

  // COMPLETE ATHLETIC LIFECYCLE ECOSYSTEM - T-BALL TO MLB RETIREMENT
  const userTypes = [
    // YOUTH SPORTS FOUNDATION
    { id: 'student', label: 'Student Athlete', icon: Trophy, color: 'from-[#F59E0B] to-[#F97316]' },
    { id: 'parent', label: 'Parent & Family', icon: Heart, color: 'from-[#3B82F6] to-[#1E3A8A]' },
    { id: 'youthCoach', label: 'Youth Coach', icon: Star, color: 'from-[#10B981] to-[#059669]' },
    { id: 'campAdmin', label: 'Camp Admin', icon: Calendar, color: 'from-[#0891B2] to-[#0E7490]' },
    
    // SCHOOL SPORTS ECOSYSTEM  
    { id: 'coach', label: 'School Coach', icon: Users, color: 'from-[#059669] to-[#10B981]' },
    { id: 'educator', label: 'Educator', icon: GraduationCap, color: 'from-[#7C3AED] to-[#5B21B6]' },
    { id: 'athleticDirector', label: 'Athletic Director', icon: Building, color: 'from-[#374151] to-[#1F2937]' },
    { id: 'schoolAdmin', label: 'School Admin', icon: Shield, color: 'from-[#92400E] to-[#7C2D12]' },
    
    // SELECT/ELITE LEVEL
    { id: 'selectCoach', label: 'Select Coach', icon: Target, color: 'from-[#7C2D12] to-[#92400E]' },
    { id: 'selectAthlete', label: 'Elite Athlete', icon: Award, color: 'from-[#DC2626] to-[#991B1B]' },
    { id: 'travelTeam', label: 'Travel Team', icon: Globe, color: 'from-[#059669] to-[#047857]' },
    
    // COLLEGE/RECRUITING
    { id: 'recruiter', label: 'Recruiter', icon: Search, color: 'from-[#DC2626] to-[#B91C1C]' },
    { id: 'scout', label: 'College Scout', icon: Eye, color: 'from-[#059669] to-[#047857]' },
    { id: 'collegeCoach', label: 'College Coach', icon: Crown, color: 'from-[#F59E0B] to-[#D97706]' },
    
    // BUSINESS/PROFESSIONAL
    { id: 'nilBrand', label: 'NIL Brand', icon: Briefcase, color: 'from-[#7C3AED] to-[#6D28D9]' },
    { id: 'agent', label: 'Sports Agent', icon: DollarSign, color: 'from-[#16A34A] to-[#15803D]' },
    
    // ADMINISTRATIVE
    { id: 'districtAdmin', label: 'District Admin', icon: Network, color: 'from-[#6B7280] to-[#4B5563]' },
    { id: 'boosterClub', label: 'Booster Club', icon: Megaphone, color: 'from-[#EAB308] to-[#CA8A04]' }
  ];

  const currentStakeholder = stakeholderVisions[activeUserType as keyof typeof stakeholderVisions] || stakeholderVisions.student;

  const IconComponent = userTypes.find(u => u.id === activeUserType)?.icon || Trophy;
  const gradient = userTypes.find(u => u.id === activeUserType)?.color || 'from-[#F59E0B] to-[#F97316]';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="absolute inset-0 bg-[url('/stadium-crowd-energy.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      {/* ULTRAPREPS Crown Logo */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-3">
          <Crown className="w-12 h-12 text-[#F59E0B]" />
          <div className="text-center">
            <h1 className="text-3xl font-black text-white tracking-wider">ULTRAPREPS</h1>
            <p className="text-xs text-[#F59E0B] font-bold tracking-widest">BILLION-DOLLAR ATHLETICS AI</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        {/* Stakeholder Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-black text-white/90 mb-4 tracking-wide">
            COMPLETE ATHLETIC LIFECYCLE ECOSYSTEM
          </h2>
          <p className="text-lg text-[#F59E0B] font-bold mb-8">
            From First T-Ball Practice to MLB Retirement - Every Stakeholder, Every Stage
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-9 gap-3 max-w-full mx-auto">
            {userTypes.map((type) => {
              const TypeIcon = type.icon;
              return (
                <motion.button
                  key={type.id}
                  onClick={() => setActiveUserType(type.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={clsx(
                    "px-3 py-4 rounded-xl font-bold transition-all duration-300 flex flex-col items-center gap-2 text-center min-h-[100px] border-2",
                    activeUserType === type.id
                      ? `bg-gradient-to-r ${type.color} text-white shadow-2xl border-white/50 shadow-current/25`
                      : "bg-white/5 text-white/70 hover:bg-white/15 border-white/20 hover:border-white/40"
                  )}
                >
                  <TypeIcon className="w-6 h-6" />
                  <span className="text-xs font-black leading-tight">{type.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

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
            <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r ${gradient} p-2 shadow-2xl mb-8`}>
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <IconComponent className="w-16 h-16 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight">
              {currentStakeholder.title}
            </h1>
            
            <p className="text-2xl md:text-3xl text-white/80 mb-4 max-w-5xl mx-auto leading-relaxed">
              {currentStakeholder.subtitle}
            </p>
            
            <p className="text-xl text-[#F59E0B] font-bold mb-16 max-w-4xl mx-auto leading-relaxed">
              {currentStakeholder.visionStatement}
            </p>
          </motion.div>

          {/* Live Demo Experiences (NO SIGNUP WALLS) */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <Play className="w-8 h-8 text-[#F59E0B]" />
              <h3 className="text-3xl font-black text-white">LIVE DEMO EXPERIENCES</h3>
              <Sparkles className="w-8 h-8 text-[#F59E0B]" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto mb-8">
              {currentStakeholder.liveExperiences.map((demo, index) => (
                <Link
                  key={index}
                  href={demo.href}
                  className="group bg-gradient-to-br from-white/10 to-white/5 hover:from-[#F59E0B]/20 hover:to-[#F97316]/20 
                           border border-white/20 hover:border-[#F59E0B]/60 rounded-xl p-6 transition-all duration-300 
                           hover:scale-105 hover:shadow-2xl hover:shadow-[#F59E0B]/20"
                >
                  <div className="flex flex-col items-center gap-3 text-center">
                    <demo.icon className="w-10 h-10 text-white group-hover:text-[#F59E0B] transition-colors" />
                    <span className="text-sm font-black text-white group-hover:text-[#F59E0B] transition-colors">
                      {demo.label}
                    </span>
                    <span className="text-xs text-white/60 group-hover:text-white/80 leading-tight">
                      {demo.description}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 backdrop-blur-sm rounded-2xl border border-[#F59E0B]/50 p-6 max-w-4xl mx-auto">
              <h4 className="text-xl font-black text-white mb-4">🚀 LIVE FEATURES - NO SIGNUP REQUIRED</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentStakeholder.liveFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-white/90">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* 7-Bot AI Neural Network */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <Brain className="w-8 h-8 text-purple-400" />
              <h3 className="text-3xl font-black text-white">7-BOT AI NEURAL NETWORK</h3>
              <Network className="w-8 h-8 text-purple-400" />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-7 gap-4 max-w-7xl mx-auto">
              {currentStakeholder.aiEcosystem.map((bot, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-5 rounded-xl border border-purple-500/40 
                           hover:border-purple-400/70 transition-all group hover:scale-105"
                >
                  <Bot className="w-8 h-8 text-purple-400 mb-3 group-hover:text-purple-300 transition-colors" />
                  <p className="text-white text-sm font-medium group-hover:text-purple-200 transition-colors leading-relaxed">
                    {bot}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Digital Immortality Engine */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <Crown className="w-8 h-8 text-[#F59E0B]" />
              <h3 className="text-3xl font-black text-white">DIGITAL IMMORTALITY ENGINE</h3>
              <Flame className="w-8 h-8 text-[#F59E0B]" />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {currentStakeholder.digitalImmortality.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.05 }}
                  className="bg-gradient-to-br from-[#F59E0B]/10 to-[#F97316]/10 p-6 rounded-xl border border-[#F59E0B]/30 
                           hover:border-[#F59E0B]/60 transition-all group hover:scale-105 hover:shadow-xl hover:shadow-[#F59E0B]/20"
                >
                  <Crown className="w-6 h-6 text-[#F59E0B] mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-white text-sm font-medium group-hover:text-[#F59E0B] transition-colors leading-relaxed">
                    {feature}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* HYPE Fuel Economy */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <Zap className="w-8 h-8 text-yellow-400" />
              <h3 className="text-3xl font-black text-white">HYPE FUEL ECONOMY</h3>
              <DollarSign className="w-8 h-8 text-green-400" />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {currentStakeholder.hypeEconomy.map((economic, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 + index * 0.1 }}
                  className="bg-gradient-to-br from-yellow-900/20 to-green-900/20 p-6 rounded-xl border border-yellow-500/40 
                           hover:border-yellow-400/70 transition-all group hover:scale-105"
                >
                  <Zap className="w-6 h-6 text-yellow-400 mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-white text-sm font-medium group-hover:text-yellow-200 transition-colors leading-relaxed">
                    {economic}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Opportunity Metrics */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <TrendingUp className="w-8 h-8 text-green-400" />
              <h3 className="text-3xl font-black text-white">BILLION-DOLLAR OPPORTUNITY</h3>
              <BarChart3 className="w-8 h-8 text-green-400" />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {currentStakeholder.opportunityMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3 + index * 0.1 }}
                  className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 p-6 rounded-xl border border-green-500/50 
                           text-center group hover:scale-105 transition-all hover:shadow-xl hover:shadow-green-500/20"
                >
                  <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-green-300 text-lg font-black group-hover:text-green-200 transition-colors leading-tight">
                    {metric}
                  </p>
                </motion.div>
              ))}
            </div>
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
              className="inline-flex items-center gap-4 px-12 py-6 text-white bg-gradient-to-r from-[#F59E0B] to-[#F97316] 
                       rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-[#F59E0B]/30"
            >
              <Rocket className="w-7 h-7" />
              {currentStakeholder.cta}
              <ArrowRight className="w-7 h-7" />
            </Link>
            
            <Link
              href="/beta"
              className="inline-flex items-center gap-4 px-12 py-6 text-white bg-white/10 border-2 border-white/30 
                       rounded-2xl font-black text-xl hover:bg-white/20 hover:border-white/50 transition-all"
            >
              <Crown className="w-7 h-7" />
              Join Beta Program
            </Link>
          </motion.div>

          {/* VIRAL HYPE SHARING BONUS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="mt-12"
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 
                          backdrop-blur-sm rounded-full border border-[#F59E0B]/50">
              <Zap className="w-6 h-6 text-[#F59E0B]" />
              <span className="text-white font-black text-lg">Share & Earn:</span>
              <span className="text-[#F59E0B] font-black text-2xl">+100 HYPE</span>
              <span className="text-white/80 font-bold">per share!</span>
            </div>
          </motion.div>
        </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default function UltraPrepsPlatform() {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      
      {/* AMAZING BOTTOM NAVIGATION - RESTORED! */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-[#F59E0B]/30 md:hidden">
        <div className="grid grid-cols-5 h-16">
          <Link
            href="/"
            className="flex flex-col items-center justify-center gap-1 text-[#F59E0B] transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Link>
          
          <Link
            href="/stadium/create"
            className="flex flex-col items-center justify-center gap-1 text-white/90 hover:text-[#F59E0B] transition-colors"
          >
            <Trophy className="w-5 h-5" />
            <span className="text-xs">Stadium</span>
          </Link>
          
          <Link
            href="/community"
            className="flex flex-col items-center justify-center gap-1 text-white/90 hover:text-[#F59E0B] transition-colors"
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Community</span>
          </Link>
          
          <Link
            href="/feed"
            className="flex flex-col items-center justify-center gap-1 text-white/90 hover:text-[#F59E0B] transition-colors"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Feed</span>
          </Link>
          
          <Link
            href="/dashboard"
            className="flex flex-col items-center justify-center gap-1 text-white/90 hover:text-[#F59E0B] transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}