'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  User, Settings, Trophy, Star, Zap, MessageCircle,
  Calendar, Target, TrendingUp, Award,
  Camera, Edit3, Plus, ArrowRight, Crown, Gift, Brain
} from 'lucide-react';
import HypeWidget from '../../components/HypeWidget';
import GageAIChat from '../../components/GageAIChat';
import GageWelcomePopup from '../../components/GageWelcomePopup';
import { useTheme, getThemeColors, getThemeGradients } from '../../components/ThemeContext';
import ThemeToggle from '../../components/ThemeToggle';
import { useSession } from 'next-auth/react';



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
  const { data: session, status } = useSession();
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting for theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only use theme hook after mounting
  const theme = mounted ? useTheme() : { isDark: true, isLight: false };
  const { isDark, isLight } = theme;
  const themeColors = getThemeColors(isDark);
  const themeGradients = getThemeGradients(isDark);

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
    if (status === 'authenticated' && session?.user?.id) {
      fetch(`/api/student/${session.user.id}`)
        .then(res => res.json())
        .then(data => {
          setStudent(data);
          setLoading(false);
        });
    }
  }, [session, status]);

  if (loading || status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen text-xl">Loading your dashboard...</div>;
  }
  if (!student) {
    return <div className="flex items-center justify-center min-h-screen text-red-500 text-xl font-bold">Error: Could not load your data. Please try again.</div>;
  }

  return (
    <div className={`min-h-screen relative overflow-hidden ${isDark ? 'bg-gradient-to-br from-black via-gray-900 to-black' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}>
      {/* Theme Toggle */}
      {mounted && (
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
      )}

      {/* Theme-Aware Stadium Background */}
      <div className={`absolute inset-0 bg-[url('/stadium-crowd-energy.jpg')] bg-cover bg-center ${isDark ? 'opacity-20' : 'opacity-10'}`} />
      
      {/* Theme-Aware Overlays */}
      <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-b from-black/85 via-black/75 to-black/90' : 'bg-gradient-to-b from-white/85 via-white/75 to-white/90'}`} />
      <div className={`absolute inset-0 ${isDark ? 'bg-black/40' : 'bg-white/40'}`} />

      {/* Dynamic Light Effects */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-[#F59E0B]/8 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#F97316]/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />



      {/* Content */}
      <div className="relative z-10 pt-20">
        {/* Welcome Header */}
        <header className={`${themeColors.border} ${isDark ? 'bg-black/20' : 'bg-white/20'} backdrop-blur-lg border-b`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <h1 className={`font-bold text-xl ${themeColors.text.primary}`}>
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
                <button className={`p-2 ${themeColors.text.secondary} hover:${themeColors.text.primary} transition-colors`}>
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
              { id: 'multiple_intelligence', label: 'Intelligence DNA', icon: Brain },
              { id: 'academic_command', label: 'Academic AI', icon: Target },
              { id: 'athletic_performance', label: 'Athletic HQ', icon: Trophy },
              { id: 'creative_studio', label: 'Creative Studio', icon: Camera },
              { id: 'life_skills', label: 'Life Skills', icon: TrendingUp },
              { id: 'future_pathways', label: 'Future Planning', icon: Star },
              { id: 'digital_legacy', label: 'Digital Legacy', icon: Crown },
              { id: 'ai_ecosystem', label: '100+ AI Bots', icon: Zap },
              { id: 'achievements', label: 'Achievements', icon: Award },
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

          {/* MULTIPLE INTELLIGENCE DNA CENTER */}
          {activeTab === 'multiple_intelligence' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Brain className="w-8 h-8 text-[#F59E0B]" />
                  <h2 className="text-3xl font-black text-white">MULTIPLE INTELLIGENCE DNA</h2>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm font-bold rounded-full">AI POWERED</span>
                </div>
                <p className="text-white/70 text-lg">Your complete human potential map - Track all 8 intelligence types and optimize your unique genius</p>
              </div>

              {/* Intelligence Overview */}
              <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
                <h3 className="text-white font-bold text-xl mb-6">Your Intelligence Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { intelligence: "Bodily-Kinesthetic", score: 92, activity: "Football", color: "from-green-400 to-green-600", icon: "🏃", description: "Athletic mastery & physical coordination" },
                    { intelligence: "Interpersonal", score: 88, activity: "Student Council", color: "from-blue-400 to-blue-600", icon: "👥", description: "Leadership & social connection" },
                    { intelligence: "Linguistic", score: 85, activity: "Theater", color: "from-purple-400 to-purple-600", icon: "📝", description: "Communication & storytelling" },
                    { intelligence: "Mathematical", score: 79, activity: "Calculus", color: "from-yellow-400 to-orange-600", icon: "🔢", description: "Logic & problem solving" },
                    { intelligence: "Musical", score: 76, activity: "School Band", color: "from-pink-400 to-red-600", icon: "🎵", description: "Rhythm & musical composition" },
                    { intelligence: "Spatial", score: 73, activity: "Art Class", color: "from-indigo-400 to-purple-600", icon: "🎨", description: "Visual & design thinking" },
                    { intelligence: "Intrapersonal", score: 82, activity: "Journaling", color: "from-teal-400 to-cyan-600", icon: "🧘", description: "Self-awareness & reflection" },
                    { intelligence: "Naturalist", score: 71, activity: "Environmental Club", color: "from-green-400 to-teal-600", icon: "🌱", description: "Nature connection & sustainability" }
                  ].map((intel, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/10 rounded-xl p-4 border border-white/20 hover:border-white/40 transition-all"
                    >
                      <div className="text-center mb-3">
                        <div className="text-3xl mb-2">{intel.icon}</div>
                        <h4 className="text-white font-bold text-sm">{intel.intelligence}</h4>
                        <p className="text-white/60 text-xs mb-2">{intel.description}</p>
                      </div>
                      
                      <div className="relative w-full h-2 bg-white/20 rounded-full overflow-hidden mb-2">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${intel.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${intel.score}%` }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                        />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-white font-bold text-lg">{intel.score}%</span>
                        <span className="text-white/60 text-xs">{intel.activity}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* AI Development Recommendations */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-xl mb-6">🤖 AI Development Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-green-400 font-bold">🚀 Strengths to Maximize</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <strong className="text-green-400">🏃 Bodily-Kinesthetic (92%):</strong>
                        <p className="text-white/80 text-sm">Elite athlete potential - consider specialized training camps and college recruitment preparation.</p>
                      </div>
                      <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                        <strong className="text-blue-400">👥 Interpersonal (88%):</strong>
                        <p className="text-white/80 text-sm">Natural leader - expand into team captain roles and community leadership positions.</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-yellow-400 font-bold">💡 Growth Opportunities</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                        <strong className="text-yellow-400">🌱 Naturalist (71%):</strong>
                        <p className="text-white/80 text-sm">Join environmental projects, start a sustainability initiative, or explore outdoor leadership.</p>
                      </div>
                      <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                        <strong className="text-purple-400">🎨 Spatial (73%):</strong>
                        <p className="text-white/80 text-sm">Try digital design, photography, or architectural visualization to enhance visual thinking.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personalized Growth Plan */}
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/30">
                <h3 className="text-white font-bold text-xl mb-6">🎯 Personalized 30-Day Growth Plan</h3>
                <div className="space-y-4">
                  {[
                    { week: "Week 1", focus: "Leadership Expansion", tasks: ["Run for student body president", "Organize team building event", "Start mentoring younger students"], color: "text-blue-400" },
                    { week: "Week 2", focus: "Athletic Excellence", tasks: ["Film training sessions", "Meet with college recruiter", "Improve 40-yard dash time"], color: "text-green-400" },
                    { week: "Week 3", focus: "Creative Expression", tasks: ["Create digital art portfolio", "Write team motivational speeches", "Design team graphics"], color: "text-purple-400" },
                    { week: "Week 4", focus: "Environmental Impact", tasks: ["Launch school recycling program", "Organize outdoor team training", "Connect athletics with sustainability"], color: "text-teal-400" }
                  ].map((plan, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 bg-white/5 rounded-xl"
                    >
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-current to-current/50 flex items-center justify-center ${plan.color}`}>
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <h5 className={`font-bold ${plan.color}`}>{plan.week}: {plan.focus}</h5>
                        <ul className="text-white/80 text-sm mt-2 space-y-1">
                          {plan.tasks.map((task, taskIndex) => (
                            <li key={taskIndex} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60" />
                              {task}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
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

          {/* CREATIVE STUDIO */}
          {activeTab === 'creative_studio' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Camera className="w-8 h-8 text-[#F59E0B]" />
                  <h2 className="text-3xl font-black text-white">CREATIVE STUDIO</h2>
                  <span className="px-3 py-1 bg-pink-500/20 text-pink-400 text-sm font-bold rounded-full">ARTISTIC AI</span>
                </div>
                <p className="text-white/70 text-lg">Express your creativity through multiple mediums - Art, Music, Theater, Writing, Photography, and Digital Design</p>
              </div>

              {/* Creative Projects Portfolio */}
              <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-6 border border-pink-500/30">
                <h3 className="text-white font-bold text-xl mb-6">🎨 Creative Projects Portfolio</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { 
                      type: "Theater Performance", 
                      title: "Hamlet Monologue", 
                      status: "Completed", 
                      skill: "Acting",
                      growth: "+15%",
                      color: "from-purple-400 to-pink-600",
                      icon: "🎭",
                      description: "Dramatic interpretation and stage presence"
                    },
                    { 
                      type: "Digital Art", 
                      title: "Team Logo Design", 
                      status: "In Progress", 
                      skill: "Visual Design",
                      growth: "+8%",
                      color: "from-blue-400 to-indigo-600",
                      icon: "🎨",
                      description: "Digital illustration and branding"
                    },
                    { 
                      type: "Music Composition", 
                      title: "School Fight Song", 
                      status: "Planning", 
                      skill: "Musical Intelligence",
                      growth: "+12%",
                      color: "from-green-400 to-teal-600",
                      icon: "🎵",
                      description: "Musical composition and arrangement"
                    },
                    { 
                      type: "Creative Writing", 
                      title: "Sports Blog", 
                      status: "Active", 
                      skill: "Storytelling",
                      growth: "+20%",
                      color: "from-yellow-400 to-orange-600",
                      icon: "✍️",
                      description: "Written communication and narrative"
                    },
                    { 
                      type: "Photography", 
                      title: "Game Day Photo Series", 
                      status: "Completed", 
                      skill: "Visual Storytelling",
                      growth: "+25%",
                      color: "from-red-400 to-pink-600",
                      icon: "📸",
                      description: "Visual documentation and composition"
                    },
                    { 
                      type: "Video Production", 
                      title: "Team Highlight Reel", 
                      status: "In Progress", 
                      skill: "Media Creation",
                      growth: "+18%",
                      color: "from-indigo-400 to-purple-600",
                      icon: "🎬",
                      description: "Video editing and storytelling"
                    }
                  ].map((project, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/10 rounded-xl p-4 border border-white/20 hover:border-white/40 transition-all"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${project.color} flex items-center justify-center text-lg`}>
                          {project.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-bold text-sm">{project.title}</h4>
                          <p className="text-white/60 text-xs">{project.type}</p>
                        </div>
                      </div>
                      
                      <p className="text-white/70 text-xs mb-3">{project.description}</p>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          project.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                          project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                          project.status === 'Active' ? 'bg-purple-500/20 text-purple-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {project.status}
                        </span>
                        <span className="text-green-400 text-xs font-bold">{project.growth}</span>
                      </div>
                      
                      <div className="text-center">
                        <button className="text-[#F59E0B] hover:text-[#F97316] text-xs font-bold transition-colors">
                          View Project →
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Creative Skills Development */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-xl mb-6">🌟 Creative Skills Development</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-purple-400 font-bold">🎭 Performing Arts</h4>
                    {[
                      { skill: "Stage Presence", level: 85, trend: "+12%" },
                      { skill: "Voice Projection", level: 78, trend: "+8%" },
                      { skill: "Character Development", level: 82, trend: "+15%" }
                    ].map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-white/80 text-sm">{skill.skill}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-purple-400 rounded-full"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                          <span className="text-green-400 text-xs font-bold w-12 text-right">{skill.trend}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-blue-400 font-bold">🎨 Visual Arts</h4>
                    {[
                      { skill: "Digital Design", level: 73, trend: "+20%" },
                      { skill: "Photography", level: 88, trend: "+18%" },
                      { skill: "Color Theory", level: 69, trend: "+5%" }
                    ].map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-white/80 text-sm">{skill.skill}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-400 rounded-full"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                          <span className="text-green-400 text-xs font-bold w-12 text-right">{skill.trend}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* LIFE SKILLS MASTERY */}
          {activeTab === 'life_skills' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <TrendingUp className="w-8 h-8 text-[#F59E0B]" />
                  <h2 className="text-3xl font-black text-white">LIFE SKILLS MASTERY</h2>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-bold rounded-full">REAL WORLD READY</span>
                </div>
                <p className="text-white/70 text-lg">Build essential life skills for success in college, career, and beyond - Leadership, Communication, Time Management, and more</p>
              </div>

              {/* Life Skills Dashboard */}
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl p-6 border border-green-500/30">
                <h3 className="text-white font-bold text-xl mb-6">🛠️ Essential Life Skills Tracker</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { 
                      category: "Leadership", 
                      skills: ["Team Management", "Decision Making", "Conflict Resolution"],
                      level: 88,
                      color: "from-blue-400 to-blue-600",
                      icon: "👑",
                      projects: ["Student Council President", "Team Captain"]
                    },
                    { 
                      category: "Communication", 
                      skills: ["Public Speaking", "Active Listening", "Written Communication"],
                      level: 82,
                      color: "from-purple-400 to-purple-600",
                      icon: "💬",
                      projects: ["Debate Team", "School Presentations"]
                    },
                    { 
                      category: "Time Management", 
                      skills: ["Priority Setting", "Schedule Organization", "Deadline Management"],
                      level: 75,
                      color: "from-orange-400 to-red-600",
                      icon: "⏰",
                      projects: ["Academic Planner", "Training Schedule"]
                    },
                    { 
                      category: "Financial Literacy", 
                      skills: ["Budgeting", "Investment Basics", "Career Planning"],
                      level: 67,
                      color: "from-green-400 to-teal-600",
                      icon: "💰",
                      projects: ["Personal Budget", "College Fund Planning"]
                    },
                    { 
                      category: "Emotional Intelligence", 
                      skills: ["Self-Awareness", "Empathy", "Stress Management"],
                      level: 85,
                      color: "from-pink-400 to-rose-600",
                      icon: "❤️",
                      projects: ["Peer Mentoring", "Mindfulness Practice"]
                    },
                    { 
                      category: "Problem Solving", 
                      skills: ["Critical Thinking", "Creative Solutions", "Research Skills"],
                      level: 79,
                      color: "from-yellow-400 to-orange-600",
                      icon: "🧩",
                      projects: ["Science Fair", "Strategy Planning"]
                    }
                  ].map((category, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/10 rounded-xl p-4 border border-white/20 hover:border-white/40 transition-all"
                    >
                      <div className="text-center mb-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-xl mx-auto mb-2`}>
                          {category.icon}
                        </div>
                        <h4 className="text-white font-bold">{category.category}</h4>
                      </div>
                      
                      <div className="relative w-full h-3 bg-white/20 rounded-full overflow-hidden mb-3">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${category.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${category.level}%` }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                        />
                      </div>
                      
                      <div className="text-center mb-3">
                        <span className="text-white font-bold text-lg">{category.level}%</span>
                      </div>
                      
                      <div className="space-y-1 mb-3">
                        {category.skills.map((skill, skillIndex) => (
                          <div key={skillIndex} className="text-white/70 text-xs flex items-center gap-1">
                            <div className="w-1 h-1 bg-white/40 rounded-full" />
                            {skill}
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t border-white/20 pt-2">
                        <p className="text-white/60 text-xs font-bold mb-1">Active Projects:</p>
                        {category.projects.map((project, projectIndex) => (
                          <div key={projectIndex} className="text-[#F59E0B] text-xs">
                            • {project}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Life Skills Challenges */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-xl mb-6">🏆 30-Day Life Skills Challenges</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {[
                      { 
                        challenge: "Public Speaking Mastery", 
                        description: "Give 3 presentations this month",
                        progress: 2,
                        total: 3,
                        reward: "+50 HYPE",
                        deadline: "3 days left"
                      },
                      { 
                        challenge: "Financial Planning", 
                        description: "Create and follow a monthly budget",
                        progress: 1,
                        total: 1,
                        reward: "+75 HYPE",
                        deadline: "Completed!"
                      },
                      { 
                        challenge: "Leadership Initiative", 
                        description: "Lead a team project to completion",
                        progress: 0,
                        total: 1,
                        reward: "+100 HYPE",
                        deadline: "2 weeks left"
                      }
                    ].map((challenge, index) => (
                      <div key={index} className={`p-4 rounded-xl border ${
                        challenge.progress === challenge.total 
                          ? 'bg-green-500/10 border-green-500/30' 
                          : 'bg-blue-500/10 border-blue-500/30'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-bold text-sm">{challenge.challenge}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            challenge.progress === challenge.total 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {challenge.deadline}
                          </span>
                        </div>
                        <p className="text-white/70 text-xs mb-3">{challenge.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  challenge.progress === challenge.total ? 'bg-green-400' : 'bg-blue-400'
                                }`}
                                style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                              />
                            </div>
                            <span className="text-white/60 text-xs">{challenge.progress}/{challenge.total}</span>
                          </div>
                          <span className="text-[#F59E0B] text-xs font-bold">{challenge.reward}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-white/5 rounded-xl p-4">
                    <h4 className="text-white font-bold mb-4">🎯 Recommended Next Steps</h4>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <strong className="text-blue-400">💬 Communication:</strong>
                        <p className="text-white/80 text-xs mt-1">Join the debate team to improve public speaking and critical thinking skills.</p>
                      </div>
                      <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <strong className="text-green-400">⏰ Time Management:</strong>
                        <p className="text-white/80 text-xs mt-1">Use the Pomodoro Technique for studying and training schedules.</p>
                      </div>
                      <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                        <strong className="text-purple-400">❤️ Emotional Intelligence:</strong>
                        <p className="text-white/80 text-xs mt-1">Start a daily reflection journal to improve self-awareness.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* FUTURE PATHWAYS PLANNING */}
          {activeTab === 'future_pathways' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Star className="w-8 h-8 text-[#F59E0B]" />
                  <h2 className="text-3xl font-black text-white">FUTURE PATHWAYS PLANNING</h2>
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-sm font-bold rounded-full">AI GUIDANCE</span>
                </div>
                <p className="text-white/70 text-lg">Plan your path from high school to your dream career - College prep, scholarship hunting, and career exploration</p>
              </div>

              {/* Career Path Explorer */}
              <div className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-6 border border-indigo-500/30">
                <h3 className="text-white font-bold text-xl mb-6">🎯 Career Path Explorer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { 
                      career: "Professional Athlete", 
                      match: 95,
                      timeline: "2-4 years",
                      requirements: ["Athletic Excellence", "Mental Toughness", "Team Leadership"],
                      colleges: ["Stanford", "Duke", "Notre Dame"],
                      color: "from-green-400 to-emerald-600",
                      icon: "🏆",
                      salary: "$2M+ potential",
                      steps: ["NCAA Division 1", "NFL Draft", "Professional Contract"]
                    },
                    { 
                      career: "Sports Management", 
                      match: 88,
                      timeline: "4-6 years",
                      requirements: ["Business Acumen", "Communication", "Industry Knowledge"],
                      colleges: ["USC", "Syracuse", "Ohio University"],
                      color: "from-blue-400 to-cyan-600",
                      icon: "📈",
                      salary: "$75K-$150K",
                      steps: ["Sports Management Degree", "Internships", "Front Office Role"]
                    },
                    { 
                      career: "Sports Medicine", 
                      match: 82,
                      timeline: "8-10 years",
                      requirements: ["Science Excellence", "Athletic Background", "Helping Others"],
                      colleges: ["Penn State", "University of Florida", "Texas A&M"],
                      color: "from-red-400 to-rose-600",
                      icon: "🏥",
                      salary: "$85K-$200K",
                      steps: ["Pre-Med Studies", "Medical School", "Sports Medicine Residency"]
                    },
                    { 
                      career: "Sports Broadcasting", 
                      match: 79,
                      timeline: "4-5 years",
                      requirements: ["Communication", "Sports Knowledge", "Media Presence"],
                      colleges: ["Northwestern", "Missouri", "Arizona State"],
                      color: "from-yellow-400 to-orange-600",
                      icon: "📺",
                      salary: "$45K-$2M",
                      steps: ["Communications Degree", "Campus Media", "Network Internship"]
                    },
                    { 
                      career: "Athletic Director", 
                      match: 85,
                      timeline: "10-15 years",
                      requirements: ["Leadership", "Management", "Educational Background"],
                      colleges: ["UNC", "Michigan", "UCLA"],
                      color: "from-purple-400 to-indigo-600",
                      icon: "🎓",
                      salary: "$75K-$500K",
                      steps: ["Education Degree", "Coaching Experience", "Administrative Roles"]
                    },
                    { 
                      career: "Sports Technology", 
                      match: 76,
                      timeline: "4-6 years",
                      requirements: ["Technical Skills", "Innovation", "Problem Solving"],
                      colleges: ["MIT", "Stanford", "Georgia Tech"],
                      color: "from-teal-400 to-blue-600",
                      icon: "💻",
                      salary: "$80K-$300K",
                      steps: ["Computer Science", "Sports Analytics", "Tech Innovation"]
                    }
                  ].map((path, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/10 rounded-xl p-4 border border-white/20 hover:border-white/40 transition-all cursor-pointer"
                    >
                      <div className="text-center mb-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${path.color} flex items-center justify-center text-xl mx-auto mb-2`}>
                          {path.icon}
                        </div>
                        <h4 className="text-white font-bold text-sm">{path.career}</h4>
                        <p className="text-white/60 text-xs">{path.timeline}</p>
                      </div>
                      
                      <div className="text-center mb-3">
                        <div className="relative w-full h-2 bg-white/20 rounded-full overflow-hidden mb-1">
                          <div 
                            className={`h-full bg-gradient-to-r ${path.color}`}
                            style={{ width: `${path.match}%` }}
                          />
                        </div>
                        <span className="text-white font-bold text-sm">{path.match}% Match</span>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="text-white/60 text-xs font-bold">Key Requirements:</div>
                        {path.requirements.map((req, reqIndex) => (
                          <div key={reqIndex} className="text-white/70 text-xs flex items-center gap-1">
                            <div className="w-1 h-1 bg-white/40 rounded-full" />
                            {req}
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t border-white/20 pt-2 space-y-1">
                        <div className="text-[#F59E0B] text-xs font-bold">{path.salary}</div>
                        <div className="text-white/60 text-xs">Top Colleges: {path.colleges.slice(0, 2).join(", ")}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* College Planning Dashboard */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-xl mb-6">🎓 College Planning Dashboard</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-blue-400 font-bold">📚 Academic Readiness</h4>
                    <div className="space-y-3">
                      {[
                        { metric: "GPA", current: "3.7", target: "3.8+", status: "On Track", color: "text-green-400" },
                        { metric: "SAT Score", current: "1250", target: "1350+", status: "Needs Improvement", color: "text-yellow-400" },
                        { metric: "AP Courses", current: "3", target: "5+", status: "Consider Adding", color: "text-blue-400" },
                        { metric: "Extracurriculars", current: "Strong", target: "Leadership Role", status: "Excellent", color: "text-green-400" }
                      ].map((metric, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                          <div>
                            <h5 className="text-white font-medium text-sm">{metric.metric}</h5>
                            <p className="text-white/60 text-xs">Current: {metric.current} | Target: {metric.target}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            metric.color === 'text-green-400' ? 'bg-green-500/20 text-green-400' :
                            metric.color === 'text-yellow-400' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {metric.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-purple-400 font-bold">💰 Scholarship Opportunities</h4>
                    <div className="space-y-3">
                      {[
                        { 
                          scholarship: "Athletic Scholarship", 
                          amount: "$25,000/year", 
                          probability: "High",
                          deadline: "March 1st",
                          requirements: "Continue athletic excellence"
                        },
                        { 
                          scholarship: "Academic Merit", 
                          amount: "$15,000/year", 
                          probability: "Medium",
                          deadline: "December 15th",
                          requirements: "Improve SAT score"
                        },
                        { 
                          scholarship: "Leadership Award", 
                          amount: "$10,000/year", 
                          probability: "High",
                          deadline: "February 1st",
                          requirements: "Student council position"
                        }
                      ].map((scholarship, index) => (
                        <div key={index} className="p-3 bg-white/5 rounded-xl border border-purple-500/30">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="text-white font-bold text-sm">{scholarship.scholarship}</h5>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              scholarship.probability === 'High' ? 'bg-green-500/20 text-green-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {scholarship.probability} Chance
                            </span>
                          </div>
                          <div className="text-[#F59E0B] font-bold text-sm mb-1">{scholarship.amount}</div>
                          <div className="text-white/60 text-xs">Due: {scholarship.deadline}</div>
                          <div className="text-white/70 text-xs mt-1">{scholarship.requirements}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* DIGITAL LEGACY BUILDER */}
          {activeTab === 'digital_legacy' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Crown className="w-8 h-8 text-[#F59E0B]" />
                  <h2 className="text-3xl font-black text-white">DIGITAL LEGACY BUILDER</h2>
                  <span className="px-3 py-1 bg-gold-500/20 text-yellow-400 text-sm font-bold rounded-full">IMMORTAL</span>
                </div>
                <p className="text-white/70 text-lg">Build your permanent digital legacy - Stories, achievements, and memories that will inspire future generations</p>
              </div>

              {/* Legacy Timeline */}
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/30">
                <h3 className="text-white font-bold text-xl mb-6">📜 Your Legacy Timeline</h3>
                <div className="space-y-6">
                  {[
                    {
                      year: "2025",
                      title: "High School Champion",
                      achievements: ["State Championship", "Team Captain", "Academic Honor Roll"],
                      media: ["Championship Game Highlights", "Leadership Speech", "Award Ceremony"],
                      impact: "Led team to first state title in 20 years",
                      color: "from-blue-400 to-blue-600",
                      icon: "🏆"
                    },
                    {
                      year: "2026-2029",
                      title: "College Star",
                      achievements: ["NCAA All-American", "Team Captain", "Dean's List"],
                      media: ["College Highlight Reel", "Graduation Speech", "Community Service"],
                      impact: "Projected college scholarship recipient and academic excellence",
                      color: "from-purple-400 to-purple-600",
                      icon: "🎓"
                    },
                    {
                      year: "2030-2035",
                      title: "Professional Athlete",
                      achievements: ["Professional Draft", "Rookie Year Stats", "Community Impact"],
                      media: ["Draft Day Coverage", "Professional Highlights", "Charity Work"],
                      impact: "Projected professional career and community leadership",
                      color: "from-green-400 to-green-600",
                      icon: "⭐"
                    },
                    {
                      year: "2040+",
                      title: "Legacy & Mentorship",
                      achievements: ["Youth Foundation", "Coaching Career", "Hall of Fame"],
                      media: ["Foundation Launch", "Mentoring Stories", "Legacy Documentary"],
                      impact: "Projected lifetime impact on youth and community development",
                      color: "from-gold-400 to-orange-600",
                      icon: "👑"
                    }
                  ].map((era, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-start gap-4"
                    >
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${era.color} flex items-center justify-center text-2xl flex-shrink-0`}>
                        {era.icon}
                      </div>
                      <div className="flex-1 bg-white/10 rounded-xl p-4 border border-white/20">
                        <div className="flex items-center gap-3 mb-3">
                          <h4 className="text-white font-bold text-lg">{era.title}</h4>
                          <span className="text-[#F59E0B] font-bold text-sm">{era.year}</span>
                        </div>
                        
                        <p className="text-white/80 text-sm mb-3">{era.impact}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-white/70 font-bold text-xs mb-2">🏆 ACHIEVEMENTS</h5>
                            <div className="space-y-1">
                              {era.achievements.map((achievement, achIndex) => (
                                <div key={achIndex} className="text-white/70 text-xs flex items-center gap-1">
                                  <div className="w-1 h-1 bg-[#F59E0B] rounded-full" />
                                  {achievement}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="text-white/70 font-bold text-xs mb-2">📸 MEDIA LEGACY</h5>
                            <div className="space-y-1">
                              {era.media.map((media, mediaIndex) => (
                                <div key={mediaIndex} className="text-white/70 text-xs flex items-center gap-1">
                                  <div className="w-1 h-1 bg-blue-400 rounded-full" />
                                  {media}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Digital Archive */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-xl mb-6">🏛️ Digital Archive</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-blue-400 font-bold">📊 Statistics Archive</h4>
                    <div className="space-y-2">
                      {[
                        "Career Game Stats",
                        "Training Progress Data",
                        "Academic Achievements",
                        "Leadership Metrics",
                        "Community Impact Numbers"
                      ].map((stat, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                          <span className="text-white/80 text-sm">{stat}</span>
                          <span className="text-green-400 text-xs">✓ Saved</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-purple-400 font-bold">🎬 Media Collection</h4>
                    <div className="space-y-2">
                      {[
                        "Game Highlights (24 videos)",
                        "Training Sessions (15 videos)",
                        "Award Ceremonies (8 videos)",
                        "Photo Gallery (200+ photos)",
                        "Written Stories (12 articles)"
                      ].map((media, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                          <span className="text-white/80 text-sm">{media}</span>
                          <button className="text-[#F59E0B] text-xs hover:text-[#F97316]">View →</button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-green-400 font-bold">💭 Wisdom Sharing</h4>
                    <div className="space-y-2">
                      {[
                        "Training Tips Blog",
                        "Leadership Lessons",
                        "Academic Strategies",
                        "Life Advice Videos",
                        "Mentorship Letters"
                      ].map((wisdom, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white/5 rounded-lg">
                          <span className="text-white/80 text-sm">{wisdom}</span>
                          <span className="text-blue-400 text-xs">Draft</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* AI ECOSYSTEM - 100+ BOTS */}
          {activeTab === 'ai_ecosystem' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Zap className="w-8 h-8 text-[#F59E0B]" />
                  <h2 className="text-3xl font-black text-white">AI ECOSYSTEM - 100+ BOTS</h2>
                  <span className="px-3 py-1 bg-electric-500/20 text-yellow-400 text-sm font-bold rounded-full">NEURAL NETWORK</span>
                </div>
                <p className="text-white/70 text-lg">Your personal AI army - 100+ specialized bots working 24/7 to accelerate your complete human development</p>
              </div>

              {/* AI Bot Categories */}
              <div className="bg-gradient-to-r from-electric-500/20 to-cyan-500/20 backdrop-blur-lg rounded-2xl p-6 border border-electric-500/30">
                <h3 className="text-white font-bold text-xl mb-6">🤖 Your Personal AI Development Army</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {[
                    {
                      category: "Academic Mastery",
                      bots: ["MathBot", "LiteratureBot", "ScienceBot", "HistoryBot", "LanguageBot"],
                      description: "AI tutors for every subject",
                      color: "from-blue-400 to-indigo-600",
                      icon: "📚",
                      active: 5,
                      total: 15
                    },
                    {
                      category: "Athletic Excellence", 
                      bots: ["CoachBot", "NutritionBot", "RecoveryBot", "PerformanceBot", "InjuryBot"],
                      description: "Elite athletic optimization",
                      color: "from-green-400 to-emerald-600",
                      icon: "🏃",
                      active: 8,
                      total: 12
                    },
                    {
                      category: "Creative Expression",
                      bots: ["ArtBot", "MusicBot", "TheaterBot", "WritingBot", "PhotoBot"],
                      description: "Artistic talent development", 
                      color: "from-purple-400 to-pink-600",
                      icon: "🎨",
                      active: 6,
                      total: 10
                    },
                    {
                      category: "Life Skills Mastery",
                      bots: ["LeadershipBot", "CommunicationBot", "TimeBot", "MoneyBot", "EmpathyBot"],
                      description: "Essential life competencies",
                      color: "from-orange-400 to-red-600", 
                      icon: "🛠️",
                      active: 7,
                      total: 8
                    },
                    {
                      category: "Future Planning",
                      bots: ["CareerBot", "CollegeBot", "ScholarshipBot", "NetworkBot", "GoalBot"],
                      description: "Strategic life planning",
                      color: "from-indigo-400 to-purple-600",
                      icon: "🎯",
                      active: 4,
                      total: 6
                    },
                    {
                      category: "Social Intelligence",
                      bots: ["RelationshipBot", "ConflictBot", "CharismaBot", "InfluenceBot", "TeamBot"],
                      description: "Human connection mastery",
                      color: "from-teal-400 to-cyan-600",
                      icon: "👥",
                      active: 5,
                      total: 7
                    },
                    {
                      category: "Mental Wellness",
                      bots: ["MindfulnessBot", "StressBot", "ConfidenceBot", "FocusBot", "ResilienceBot"],
                      description: "Psychological optimization",
                      color: "from-pink-400 to-rose-600",
                      icon: "🧘",
                      active: 6,
                      total: 9
                    },
                    {
                      category: "Innovation Engine",
                      bots: ["CreativityBot", "ProblemBot", "InventionBot", "TechBot", "StrategyBot"],
                      description: "Next-generation thinking",
                      color: "from-yellow-400 to-orange-600",
                      icon: "💡",
                      active: 3,
                      total: 5
                    }
                  ].map((category, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/10 rounded-xl p-4 border border-white/20 hover:border-white/40 transition-all cursor-pointer"
                    >
                      <div className="text-center mb-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-xl mx-auto mb-2`}>
                          {category.icon}
                        </div>
                        <h4 className="text-white font-bold text-sm">{category.category}</h4>
                        <p className="text-white/60 text-xs">{category.description}</p>
                      </div>
                      
                      <div className="space-y-2 mb-3">
                        <div className="flex justify-between items-center">
                          <span className="text-white/70 text-xs">Active Bots</span>
                          <span className="text-green-400 text-xs font-bold">{category.active}/{category.total}</span>
                        </div>
                        <div className="relative w-full h-2 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${category.color}`}
                            style={{ width: `${(category.active / category.total) * 100}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        {category.bots.slice(0, 3).map((bot, botIndex) => (
                          <div key={botIndex} className="text-white/70 text-xs flex items-center gap-1">
                            <div className={`w-1 h-1 rounded-full ${botIndex < category.active ? 'bg-green-400' : 'bg-white/40'}`} />
                            {bot}
                          </div>
                        ))}
                        {category.bots.length > 3 && (
                          <div className="text-[#F59E0B] text-xs">
                            +{category.bots.length - 3} more bots
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Active AI Assistance */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-xl mb-6">⚡ Live AI Assistance Right Now</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-cyan-400 font-bold">🔄 Currently Working For You</h4>
                    <div className="space-y-3">
                      {[
                        { 
                          bot: "MathBot", 
                          task: "Analyzing your calculus performance patterns",
                          status: "Generating personalized study plan",
                          progress: 78,
                          eta: "2 minutes"
                        },
                        { 
                          bot: "CoachBot", 
                          task: "Optimizing tomorrow's training session",
                          status: "Reviewing today's performance data",
                          progress: 45,
                          eta: "5 minutes"
                        },
                        { 
                          bot: "ScholarshipBot", 
                          task: "Scanning 500+ new scholarship opportunities",
                          status: "Found 3 perfect matches for your profile",
                          progress: 100,
                          eta: "Complete!"
                        },
                        { 
                          bot: "NetworkBot", 
                          task: "Connecting you with alumni at target colleges",
                          status: "Identified 12 potential mentor connections",
                          progress: 67,
                          eta: "8 minutes"
                        }
                      ].map((task, index) => (
                        <div key={index} className="p-3 bg-white/5 rounded-xl border border-cyan-500/30">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="text-white font-bold text-sm">{task.bot}</h5>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              task.progress === 100 ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                            }`}>
                              {task.eta}
                            </span>
                          </div>
                          <p className="text-white/70 text-xs mb-2">{task.task}</p>
                          <p className="text-cyan-400 text-xs mb-2">{task.status}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-cyan-400 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${task.progress}%` }}
                                transition={{ delay: index * 0.1, duration: 1 }}
                              />
                            </div>
                            <span className="text-white/60 text-xs">{task.progress}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-purple-400 font-bold">🎯 AI Recommendations</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <strong className="text-green-400">🏃 PerformanceBot:</strong>
                        <p className="text-white/80 text-xs mt-1">Your sprint times improved 0.2s this week! PerformanceBot suggests adding plyometric drills to maintain momentum.</p>
                      </div>
                      <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-xl">
                        <strong className="text-blue-400">📚 MathBot:</strong>
                        <p className="text-white/80 text-xs mt-1">Calculus grade trending upward! MathBot recommends AP Statistics next semester to strengthen college applications.</p>
                      </div>
                      <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                        <strong className="text-purple-400">🎭 TheaterBot:</strong>
                        <p className="text-white/80 text-xs mt-1">Your Hamlet performance was exceptional! TheaterBot suggests auditioning for the spring musical lead role.</p>
                      </div>
                      <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl">
                        <strong className="text-orange-400">👑 LeadershipBot:</strong>
                        <p className="text-white/80 text-xs mt-1">Team responds well to your leadership style. LeadershipBot recommends running for student body president.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Network Stats */}
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
                <h3 className="text-white font-bold text-xl mb-6">📊 Your AI Network Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { metric: "Total AI Bots", value: "127", description: "Personal assistants", color: "text-cyan-400" },
                    { metric: "Active Today", value: "89", description: "Currently working", color: "text-green-400" },
                    { metric: "Tasks Completed", value: "2,847", description: "This month", color: "text-blue-400" },
                    { metric: "Recommendations", value: "156", description: "Generated today", color: "text-purple-400" }
                  ].map((stat, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center bg-white/10 rounded-xl p-4"
                    >
                      <div className={`text-3xl font-black ${stat.color} mb-2`}>{stat.value}</div>
                      <div className="text-white font-bold text-sm">{stat.metric}</div>
                      <div className="text-white/60 text-xs">{stat.description}</div>
                    </motion.div>
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
    <GageWelcomePopup onClose={handleWelcomeClose} />
  )}
</div>
  );
}