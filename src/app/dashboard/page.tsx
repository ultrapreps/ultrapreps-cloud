'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  User, Settings, Trophy, Star, Zap, MessageCircle,
  Calendar, Target, TrendingUp, Award,
  Camera, Edit3, Plus, ArrowRight, Crown, Gift
} from 'lucide-react';



interface StudentData {
  username: string;
  fullName: string;
  school: string;
  activities: string[];
  goals: string[];
  bio: string;
  joinedDate: string;
  stats: {
    totalHype: number;
    level: number;
    achievements: number;
    streakDays: number;
  };
}

export default function StudentDashboard() {
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);

  // Check if user is new (show welcome popup)
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('gage_welcome_seen');
    if (!hasSeenWelcome) {
      // Show welcome popup after a short delay
      setTimeout(() => {
        setShowWelcomePopup(true);
      }, 1500);
    }
  }, []);

  // Manual trigger for testing (remove in production)
  const triggerWelcomePopup = () => {
    setShowWelcomePopup(true);
  };

  const handleWelcomeClose = () => {
    setShowWelcomePopup(false);
    localStorage.setItem('gage_welcome_seen', 'true');
    // Auto-open chat after welcome
    setTimeout(() => {
      setIsChatOpen(true);
    }, 500);
  };

  // Mock student data (in production, fetch from API)
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStudent({
        username: 'student_demo',
        fullName: 'Student Demo',
        school: 'UltraPreps High School',
        activities: ['Football', 'Theater', 'Student Council'],
        goals: ['Get recruited to college', 'Build my brand', 'Lead my team'],
        bio: 'Passionate student-athlete ready to make an impact!',
        joinedDate: '2025-01-01',
        stats: {
          totalHype: 250,
          level: 3,
          achievements: 5,
          streakDays: 7
        }
      });
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="ultra-page-layout">
        {/* Standardized Stadium Background */}
        <div className="absolute inset-0 ultra-stadium-bg" />
        
        {/* Standardized Overlays */}
        <div className="absolute inset-0 ultra-overlay-primary" />
        <div className="absolute inset-0 ultra-overlay-secondary" />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full opacity-10"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ filter: 'blur(100px)' }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-[#3B82F6] to-[#1E3A8A] rounded-full opacity-10"
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ filter: 'blur(80px)' }}
        />
        
        {/* Loading Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center bg-black/40 backdrop-blur-xl p-12 rounded-3xl border border-[#F59E0B]/30 shadow-2xl"
          >
            {/* Animated Crown Logo */}
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative w-24 h-24 mx-auto mb-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full animate-pulse opacity-20" />
              <div className="relative w-full h-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full flex items-center justify-center">
                <Crown className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            
            {/* Loading Text */}
            <motion.h2 
              className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-wide drop-shadow-2xl"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Loading Your Stadium
            </motion.h2>
            
            {/* Progress Bar */}
            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mb-6 mx-auto">
              <motion.div
                className="h-full bg-gradient-to-r from-[#F59E0B] to-[#F97316]"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: '100%' }}
              />
            </div>
            
            {/* Loading Messages */}
            <motion.p 
              className="text-white/80 text-lg"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Preparing your command center...
            </motion.p>
            
            {/* Loading Stats */}
            <motion.div 
              className="mt-8 flex justify-center gap-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-[#F59E0B]">98%</div>
                <div className="text-white/60 text-sm">HYPE Ready</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#F97316]">7</div>
                <div className="text-white/60 text-sm">AI Systems</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#3B82F6]">∞</div>
                <div className="text-white/60 text-sm">Possibilities</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="ultra-page-layout">
        {/* Standardized Stadium Background */}
        <div className="absolute inset-0 ultra-stadium-bg" />
        
        {/* Standardized Overlays */}
        <div className="absolute inset-0 ultra-overlay-primary" />
        <div className="absolute inset-0 ultra-overlay-secondary" />
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full opacity-20"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ filter: 'blur(100px)' }}
        />
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl"
          >
            {/* Animated Trophy */}
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="relative inline-block mb-8"
            >
              <div className="absolute inset-0 w-32 h-32 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full blur-3xl opacity-50" />
              <Trophy className="w-32 h-32 text-[#F59E0B] relative z-10" />
            </motion.div>
            
            {/* Welcome Text */}
            <motion.h2 
              className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tight drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="block text-[#F59E0B]">Welcome to</span>
              <span className="block">UltraPreps!</span>
            </motion.h2>
            
            <motion.p 
              className="text-white/80 mb-12 text-xl md:text-2xl font-medium max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Your journey to greatness starts with creating your digital stadium.
            </motion.p>
            
            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/stadium/create"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black font-black text-lg rounded-full hover:shadow-2xl transition-all duration-300 group"
                style={{ boxShadow: '0px 8px 32px rgba(245, 158, 11, 0.5)' }}
              >
                <Crown className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                BUILD YOUR STADIUM
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </Link>
            </motion.div>
            
            {/* Stats */}
            <motion.div 
              className="mt-12 flex justify-center gap-8 md:gap-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-[#F59E0B]">500+</div>
                <div className="text-white/60 text-sm uppercase tracking-wider">Schools</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#F97316]">10K+</div>
                <div className="text-white/60 text-sm uppercase tracking-wider">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#3B82F6]">∞</div>
                <div className="text-white/60 text-sm uppercase tracking-wider">Dreams</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

          return (
        <div className="ultra-page-layout">
          {/* Standardized Stadium Background */}
          <div className="absolute inset-0 ultra-stadium-bg" />
          
          {/* Standardized Overlays */}
          <div className="absolute inset-0 ultra-overlay-primary" />
          <div className="absolute inset-0 ultra-overlay-secondary" />

          {/* Dynamic Light Effects */}
          <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-[#F59E0B]/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#F97316]/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />



          {/* Content */}
          <div className="relative z-10 pt-20">
            {/* Welcome Header */}
            <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center gap-4">
                    <h1 className="text-white font-bold text-xl">
                      Welcome back, {student.fullName}!
                    </h1>
                  </div>

                  <div className="flex items-center gap-4">
                    <HypeWidget userId={student.username} compact />
                    <button 
                      onClick={triggerWelcomePopup}
                      className="px-3 py-1 bg-[#F59E0B] text-black rounded-lg text-sm font-bold hover:bg-[#F97316] transition-colors"
                    >
                      Test Gage Popup
                    </button>
                    <button className="p-2 text-white/70 hover:text-white transition-colors">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </header>

        {/* Main Content */}
        <main className="ultra-container py-8">
          {/* Stats Overview */}
          <div className="ultra-stats-grid mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="ultra-card"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-[#F59E0B]" />
                <div>
                  <div className="text-lg sm:text-2xl font-black text-white">{student.stats.totalHype}</div>
                  <div className="text-white/60 text-xs sm:text-sm">Total HYPE</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="ultra-card"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-[#F97316]" />
                <div>
                  <div className="text-lg sm:text-2xl font-black text-white">{student.stats.level}</div>
                  <div className="text-white/60 text-xs sm:text-sm">Level</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="ultra-card"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-[#F59E0B]" />
                <div>
                  <div className="text-lg sm:text-2xl font-black text-white">{student.stats.achievements}</div>
                  <div className="text-white/60 text-xs sm:text-sm">Achievements</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="ultra-card"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-[#F97316]" />
                <div>
                  <div className="text-lg sm:text-2xl font-black text-white">{student.stats.streakDays}</div>
                  <div className="text-white/60 text-xs sm:text-sm">Day Streak</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-white/20">
              <nav className="-mb-px flex space-x-2 sm:space-x-4 lg:space-x-8 overflow-x-auto scrollbar-hide">
                {[
                  { id: 'overview', label: 'Command Center', icon: User },
                  { id: 'academic_command', label: 'Academic AI', icon: Target },
                  { id: 'athletic_performance', label: 'Athletic HQ', icon: Trophy },
                  { id: 'college_recruiting', label: 'College Scout', icon: Star },
                  { id: 'achievements', label: 'Achievements', icon: Award },
                  { id: 'chat', label: 'AI Mentor', icon: MessageCircle },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-[#F59E0B] text-[#F59E0B]'
                        : 'border-transparent text-white/70 hover:text-white hover:border-white/30'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {activeTab === 'overview' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  {/* Profile Section */}
                  <div className="ultra-card">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="ultra-card-title">Your Profile</h3>
                      <button className="text-[#F59E0B] hover:text-[#F97316] transition-colors">
                        <Edit3 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="text-white/70 text-sm">Bio</label>
                        <p className="text-white">{student.bio}</p>
                      </div>
                      
                      <div>
                        <label className="text-white/70 text-sm">School</label>
                        <p className="text-white">{student.school}</p>
                      </div>
                      
                      <div>
                        <label className="text-white/70 text-sm">Member Since</label>
                        <p className="text-white">{new Date(student.joinedDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="ultra-card">
                    <h3 className="ultra-card-title mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Link
                        href="/poster/create"
                        className="ultra-btn-secondary flex-col !p-4 !rounded-xl text-left group"
                      >
                        <Camera className="w-6 h-6 text-[#F59E0B] mb-2" />
                        <div className="text-white font-medium">Create Poster</div>
                        <div className="text-white/60 text-sm">Share your achievements</div>
                      </Link>
                      
                      <button 
                        onClick={() => {
                          console.log('Chat with Gage button clicked! Setting chat open...');
                          setIsChatOpen(true);
                        }}
                        className="ultra-btn-secondary flex-col !p-4 !rounded-xl text-left group"
                      >
                        <MessageCircle className="w-6 h-6 text-[#F97316] mb-2" />
                        <div className="text-white font-medium">Chat with Gage</div>
                        <div className="text-white/60 text-sm">Your first friend on UltraPreps</div>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ACADEMIC COMMAND CENTER */}
              {activeTab === 'academic_command' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Target className="w-8 h-8 text-[#F59E0B]" />
                      <h2 className="text-3xl font-black text-white">ACADEMIC COMMAND CENTER</h2>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-bold rounded-full">AI POWERED</span>
                    </div>
                    <p className="text-white/70 text-lg">Your personal academic assistant - manage grades, assignments, and goals</p>
                  </div>

                  {/* Live Grade Tracking */}
                  <div className="ultra-card">
                    <h3 className="ultra-card-title text-xl mb-6">Live Grade Tracking</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        {[
                          { subject: "English Literature", grade: "A-", trend: "+3%", color: "text-green-400" },
                          { subject: "AP History", grade: "B+", trend: "+5%", color: "text-green-400" },
                          { subject: "Chemistry", grade: "B", trend: "-2%", color: "text-yellow-400" },
                          { subject: "Calculus", grade: "C+", trend: "-1%", color: "text-red-400" }
                        ].map((course, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                            <div>
                              <h4 className="text-white font-bold">{course.subject}</h4>
                              <p className="text-white/60 text-sm">Current Grade</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-black text-[#F59E0B]">{course.grade}</div>
                              <div className={`text-sm font-bold ${course.color}`}>{course.trend}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <h4 className="text-white font-bold mb-3">AI Study Recommendations</h4>
                        <div className="space-y-3 text-sm">
                          <div className="text-green-400">
                            <strong>📚 English:</strong> Great improvement! Keep up the essay work.
                          </div>
                          <div className="text-yellow-400">
                            <strong>⚗️ Chemistry:</strong> Schedule extra lab time this week.
                          </div>
                          <div className="text-red-400">
                            <strong>📐 Calculus:</strong> Meet with tutor - derivatives need work.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Assignment Tracker */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <h3 className="text-white font-bold text-xl mb-6">Smart Assignment Tracker</h3>
                    <div className="space-y-3">
                      {[
                        { title: "Character Analysis Essay", subject: "English", due: "Tomorrow", priority: "high" },
                        { title: "Chemistry Lab Report", subject: "Chemistry", due: "Friday", priority: "medium" },
                        { title: "History Chapter Review", subject: "AP History", due: "Next Week", priority: "low" }
                      ].map((assignment, index) => (
                        <div key={index} className={`p-4 rounded-xl border ${
                          assignment.priority === 'high' ? 'bg-red-500/10 border-red-500/30' :
                          assignment.priority === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' :
                          'bg-green-500/10 border-green-500/30'
                        }`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-white font-bold">{assignment.title}</h4>
                              <p className="text-white/60 text-sm">{assignment.subject}</p>
                            </div>
                            <div className="text-right">
                              <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                assignment.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                                assignment.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-green-500/20 text-green-400'
                              }`}>
                                Due {assignment.due}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ATHLETIC PERFORMANCE HQ */}
              {activeTab === 'athletic_performance' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Trophy className="w-8 h-8 text-[#F59E0B]" />
                      <h2 className="text-3xl font-black text-white">ATHLETIC PERFORMANCE HQ</h2>
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-bold rounded-full">TRAINING OPTIMIZATION</span>
                    </div>
                    <p className="text-white/70 text-lg">Track performance, monitor training, and optimize your athletic development</p>
                  </div>

                  {/* Performance Metrics */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <h3 className="text-white font-bold text-xl mb-6">Performance Metrics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { metric: "40-Yard Dash", value: "4.6s", improvement: "-0.2s", color: "text-green-400" },
                        { metric: "Bench Press", value: "185 lbs", improvement: "+15 lbs", color: "text-green-400" },
                        { metric: "Vertical Jump", value: "32\"", improvement: "+2\"", color: "text-green-400" },
                        { metric: "Mile Time", value: "6:15", improvement: "-0:30", color: "text-green-400" }
                      ].map((stat, index) => (
                        <div key={index} className="bg-white/5 rounded-xl p-4 text-center">
                          <h4 className="text-white/70 text-sm">{stat.metric}</h4>
                          <div className="text-2xl font-black text-white">{stat.value}</div>
                          <div className={`text-sm font-bold ${stat.color}`}>{stat.improvement}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Training Schedule */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <h3 className="text-white font-bold text-xl mb-6">AI Training Schedule</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="text-white font-bold">This Week&apos;s Focus</h4>
                        {[
                          { day: "Monday", focus: "Speed & Agility", intensity: "High" },
                          { day: "Tuesday", focus: "Strength Training", intensity: "Medium" },
                          { day: "Wednesday", focus: "Skill Practice", intensity: "Medium" },
                          { day: "Thursday", focus: "Recovery", intensity: "Low" },
                          { day: "Friday", focus: "Game Prep", intensity: "High" }
                        ].map((session, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                            <div>
                              <h5 className="text-white font-medium">{session.day}</h5>
                              <p className="text-white/60 text-sm">{session.focus}</p>
                            </div>
                            <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                              session.intensity === 'High' ? 'bg-red-500/20 text-red-400' :
                              session.intensity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {session.intensity}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-white/5 rounded-xl p-4">
                        <h4 className="text-white font-bold mb-3">AI Coaching Insights</h4>
                        <div className="space-y-3 text-sm">
                          <div className="text-blue-400">
                            <strong>🏃 Speed:</strong> Your 40-time improved 0.2s! Keep up the sprint work.
                          </div>
                          <div className="text-yellow-400">
                            <strong>💪 Strength:</strong> Increase bench reps by 10% next week.
                          </div>
                          <div className="text-green-400">
                            <strong>🎯 Recovery:</strong> Sleep quality excellent - 8.2 hours average.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* COLLEGE RECRUITING CENTER */}
              {activeTab === 'college_recruiting' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <Star className="w-8 h-8 text-[#F59E0B]" />
                      <h2 className="text-3xl font-black text-white">COLLEGE RECRUITING CENTER</h2>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm font-bold rounded-full">RECRUITMENT READY</span>
                    </div>
                    <p className="text-white/70 text-lg">Get discovered by college scouts and build your recruitment profile</p>
                  </div>

                  {/* Recruitment Readiness */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <h3 className="text-white font-bold text-xl mb-6">Recruitment Readiness Score</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-4xl font-black text-white">87%</span>
                        </div>
                        <h4 className="text-white font-bold">Recruitment Ready</h4>
                        <p className="text-white/60 text-sm">Strong profile, keep improving!</p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">Academic Performance</span>
                          <div className="w-24 bg-white/20 rounded-full h-2">
                            <div className="bg-green-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">Athletic Performance</span>
                          <div className="w-24 bg-white/20 rounded-full h-2">
                            <div className="bg-blue-400 h-2 rounded-full" style={{ width: '92%' }}></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">Leadership & Character</span>
                          <div className="w-24 bg-white/20 rounded-full h-2">
                            <div className="bg-purple-400 h-2 rounded-full" style={{ width: '78%' }}></div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">Highlight Reel</span>
                          <div className="w-24 bg-white/20 rounded-full h-2">
                            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '95%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scout Interest */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <h3 className="text-white font-bold text-xl mb-6">Scout Interest & Opportunities</h3>
                    <div className="space-y-4">
                      {[
                        { school: "State University", level: "D1", interest: "High", contact: "Coach Johnson" },
                        { school: "Regional College", level: "D2", interest: "Medium", contact: "Coach Smith" },
                        { school: "Local University", level: "D3", interest: "Interested", contact: "Coach Davis" }
                      ].map((opportunity, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                              <span className="text-blue-400 font-bold text-sm">{opportunity.level}</span>
                            </div>
                            <div>
                              <h4 className="text-white font-bold">{opportunity.school}</h4>
                              <p className="text-white/60 text-sm">Contact: {opportunity.contact}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                            opportunity.interest === 'High' ? 'bg-green-500/20 text-green-400' :
                            opportunity.interest === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {opportunity.interest} Interest
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'activities' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-bold text-lg">Your Activities</h3>
                    <Link
                      href="/poster/create"
                      className="flex items-center gap-2 text-[#F59E0B] hover:text-[#F97316] transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Activity
                    </Link>
                  </div>
                  
                  <div className="space-y-3">
                    {student.activities.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Star className="w-5 h-5 text-[#F59E0B]" />
                          <span className="text-white">{activity}</span>
                        </div>
                        <button className="text-white/60 hover:text-white transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'achievements' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                >
                  <h3 className="text-white font-bold text-lg mb-4">Your Achievements</h3>
                  <div className="text-center py-8">
                    <Trophy className="w-16 h-16 text-[#F59E0B] mx-auto mb-4" />
                    <p className="text-white/70">Complete activities to unlock achievements!</p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'analytics' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  {/* Analytics Overview */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <h3 className="text-white font-bold text-lg mb-6">Your Analytics</h3>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <div className="text-3xl font-black text-[#F59E0B]">250</div>
                        <div className="text-white/60 text-sm">Total HYPE</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <div className="text-3xl font-black text-[#F97316]">3</div>
                        <div className="text-white/60 text-sm">Level</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <div className="text-3xl font-black text-[#10B981]">5</div>
                        <div className="text-white/60 text-sm">Achievements</div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <div className="text-3xl font-black text-[#8B5CF6]">7</div>
                        <div className="text-white/60 text-sm">Day Streak</div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <h3 className="text-white font-bold text-lg mb-4">Activity Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Profile Views This Week</span>
                        <span className="text-[#F59E0B] font-bold">42</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Poster Shares</span>
                        <span className="text-[#F59E0B] font-bold">8</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Chat Messages with Gage</span>
                        <span className="text-[#F59E0B] font-bold">15</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* HYPE Widget */}
              <HypeWidget userId={student.username} />

              {/* Goals */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-bold text-lg flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#F59E0B]" />
                    Your Goals
                  </h3>
                  <button className="text-[#F59E0B] hover:text-[#F97316] transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  {student.goals.map((goal, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
                      <span className="text-white/90 text-sm">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#F59E0B]" />
                  Recent Activity
                </h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-white/70">
                    <Gift className="w-4 h-4 text-[#F59E0B]" />
                    <span>Daily login bonus earned</span>
                    <span className="ml-auto text-[#F59E0B]">+10 HYPE</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Trophy className="w-4 h-4 text-[#F97316]" />
                    <span>Profile completed</span>
                    <span className="ml-auto text-[#F59E0B]">+50 HYPE</span>
                  </div>
                  <div className="flex items-center gap-2 text-white/70">
                    <Star className="w-4 h-4 text-[#F59E0B]" />
                    <span>Stadium created</span>
                    <span className="ml-auto text-[#F59E0B]">+100 HYPE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Gage AI Chat */}
      <GageAIChat
        userId={student?.username || 'guest'}
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />

      {/* Gage Welcome Popup */}
      {showWelcomePopup && (
                <GageWelcomePopup
          onClose={handleWelcomeClose}
        />
      )}
    </div>
  );
}