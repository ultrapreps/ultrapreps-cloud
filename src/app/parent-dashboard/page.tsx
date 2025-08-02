'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Users, Trophy, MessageCircle, Calendar, Clock, 
  ArrowLeft, Star, TrendingUp, Heart,
  BarChart3, Crown, Zap, Brain, Camera, Target,
  DollarSign, GraduationCap, Shield, Award, Gift,
  Briefcase, Network, Eye, CheckCircle, Book
} from 'lucide-react';
import GageAIChat from '../../components/GageAIChat';
import HypeWidget from '../../components/HypeWidget';
import { useTheme, getThemeColors, getThemeGradients } from '../../components/ThemeContext';
import ThemeToggle from '../../components/ThemeToggle';


interface StudentChild {
  id: string;
  name: string;
  school: string;
  graduationYear: number;
  sports: string[];
  gpa: number;
  hypeScore: number;
  level: number;
  profileImage?: string;
  recentActivities: Activity[];
  achievements: Achievement[];
  upcomingEvents: Event[];
  stats: {
    totalPosts: number;
    totalConnections: number;
    weeklyActiveTime: string;
    lastActive: Date;
  };
}

interface Activity {
  id: string;
  type: 'achievement' | 'post' | 'event' | 'connection' | 'hype_earned';
  title: string;
  description: string;
  timestamp: Date;
  hypeAwarded?: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  earnedDate: Date;
  hypeValue: number;
}

interface Event {
  id: string;
  title: string;
  date: Date;
  location: string;
  type: 'game' | 'practice' | 'meeting' | 'event';
}

interface ParentTab {
  id: string;
  label: string;
  icon: React.ComponentType<{className?: string}>;
}

const PARENT_TABS: ParentTab[] = [
  { id: 'overview', label: 'Family Command Center', icon: BarChart3 },
  { id: 'multi_generational', label: 'Multi-Generational Hub', icon: Users },
  { id: 'hype_boost_center', label: 'HYPE Boost Center', icon: Zap },
  { id: 'family_legacy_builder', label: 'Family Legacy Builder', icon: Crown },
  { id: 'health_wellness_360', label: 'Health & Wellness 360°', icon: Heart },
  { id: 'college_financial_planning', label: 'College & Financial Planning', icon: TrendingUp },
  { id: 'educational_partnership', label: 'Educational Partnership', icon: MessageCircle },
  { id: 'family_achievements', label: 'Family Achievement Gallery', icon: Trophy }
];

// Mock data for parent's children
const MOCK_CHILDREN: StudentChild[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    school: 'Central High School',
    graduationYear: 2026,
    sports: ['Football', 'Track & Field'],
    gpa: 3.7,
    hypeScore: 1420,
    level: 8,
    stats: {
      totalPosts: 23,
      totalConnections: 156,
      weeklyActiveTime: '12h 34m',
      lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    recentActivities: [
      {
        id: '1',
        type: 'achievement',
        title: 'All-Conference Team',
        description: 'Selected for All-Conference Football Team',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        hypeAwarded: 100
      },
      {
        id: '2',
        type: 'hype_earned',
        title: 'Daily Login Streak',
        description: 'Maintained 7-day login streak',
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        hypeAwarded: 25
      }
    ],
    achievements: [
      {
        id: '1',
        title: 'Team Captain',
        description: 'Selected as football team captain',
        category: 'Leadership',
        earnedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        hypeValue: 150
      },
      {
        id: '2',
        title: 'Academic Excellence',
        description: 'Maintained 3.5+ GPA for semester',
        category: 'Academic',
        earnedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        hypeValue: 75
      }
    ],
    upcomingEvents: [
      {
        id: '1',
        title: 'Championship Game',
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        location: 'Memorial Stadium',
        type: 'game'
      },
      {
        id: '2',
        title: 'Team Practice',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000),
        location: 'School Field',
        type: 'practice'
      }
    ]
  }
];

export default function ParentDashboard() {
  const [selectedChild, setSelectedChild] = useState<StudentChild>(MOCK_CHILDREN[0]);
  const [activeTab, setActiveTab] = useState('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Handle client-side mounting for theme
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Only use theme hook after mounting
  const theme = mounted ? useTheme() : { isDark: true, isLight: false };
  const { isDark, isLight } = theme;
  const themeColors = getThemeColors(isDark);
  const themeGradients = getThemeGradients(isDark);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'achievement': return <Trophy className="w-4 h-4 text-yellow-400" />;
      case 'hype_earned': return <Zap className="w-4 h-4 text-[#F59E0B]" />;
      case 'post': return <MessageCircle className="w-4 h-4 text-blue-400" />;
      case 'event': return <Calendar className="w-4 h-4 text-green-400" />;
      default: return <Star className="w-4 h-4 text-purple-400" />;
    }
  };

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.7) return 'text-green-400';
    if (gpa >= 3.0) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Stadium Background */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/stadium-crowd-energy.jpg')`,
          backgroundAttachment: 'scroll',
          backgroundPosition: 'center top',
          backgroundSize: '120% auto',
          filter: 'grayscale(100%) contrast(1.2) brightness(0.3) blur(3px)',
          WebkitFilter: 'grayscale(100%) contrast(1.2) brightness(0.3) blur(3px)'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
      <div className="absolute inset-0 bg-black/40" />

      {/* Navigation */}


      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-[#F59E0B] hover:text-[#F97316] transition-colors">
                  <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="text-white/60">|</div>
                <h1 className="text-white font-bold text-xl">Parent Dashboard</h1>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-white/60 text-sm">
                  Monitoring {MOCK_CHILDREN.length} student{MOCK_CHILDREN.length !== 1 ? 's' : ''}
                </div>
                <HypeWidget userId="parent_user" compact />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Enhanced Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 relative z-10">
                <span className="text-[#F59E0B] drop-shadow-[0_0_30px_rgba(245,158,11,0.5)]">ULTRA</span> 
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"> FAMILY</span>
              </h2>
              <div className="absolute -inset-4 bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 rounded-2xl blur-2xl opacity-50" />
            </div>
            <div className="bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 backdrop-blur-sm rounded-2xl border border-[#F59E0B]/30 p-6 max-w-4xl mx-auto">
              <p className="text-white/90 text-xl font-medium leading-relaxed">
                🏆 <span className="text-[#F59E0B] font-bold">Command Center</span> for monitoring your student-athletes&apos; complete development journey
              </p>
              <p className="text-white/70 text-lg mt-2">
                From academic excellence to athletic achievements - track every milestone, celebrate every victory
              </p>
            </div>
          </motion.div>

          {/* Enhanced Child Selector */}
          {MOCK_CHILDREN.length > 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-[#F59E0B]/30 mb-8 shadow-[0_0_50px_rgba(245,158,11,0.1)]"
            >
              <div className="flex items-center gap-4 mb-4">
                <Users className="w-6 h-6 text-[#F59E0B]" />
                <h3 className="text-xl font-black text-white">Select Your Athlete</h3>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white font-medium">Select Student:</span>
                <div className="flex gap-2">
                  {MOCK_CHILDREN.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => setSelectedChild(child)}
                      className={`px-4 py-2 rounded-xl transition-colors ${
                        selectedChild.id === child.id
                          ? 'bg-[#F59E0B] text-white'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {child.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Student Overview Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                {selectedChild.profileImage ? (
                  <img 
                    src={selectedChild.profileImage} 
                    alt={selectedChild.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <Users className="w-10 h-10 text-white/60" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-white font-bold text-2xl">{selectedChild.name}</h3>
                  <div className="flex items-center gap-1 px-3 py-1 bg-[#F59E0B]/20 rounded-full">
                    <Crown className="w-4 h-4 text-[#F59E0B]" />
                    <span className="text-[#F59E0B] font-bold">L{selectedChild.level}</span>
                  </div>
                </div>
                <p className="text-white/60 mb-4">{selectedChild.school} • Class of {selectedChild.graduationYear}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-[#F59E0B] text-2xl font-black">{selectedChild.hypeScore.toLocaleString()}</div>
                    <div className="text-white/60 text-sm">HYPE Points</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-black ${getGPAColor(selectedChild.gpa)}`}>{selectedChild.gpa}</div>
                    <div className="text-white/60 text-sm">GPA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400 text-2xl font-black">{selectedChild.stats.totalConnections}</div>
                    <div className="text-white/60 text-sm">Connections</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 text-2xl font-black">{selectedChild.achievements.length}</div>
                    <div className="text-white/60 text-sm">Achievements</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Tab Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 border border-[#F59E0B]/30 mb-8 shadow-[0_0_50px_rgba(245,158,11,0.1)]"
          >
            <div className="flex items-center gap-3 mb-4">
              <BarChart3 className="w-6 h-6 text-[#F59E0B]" />
              <h3 className="text-xl font-black text-white">Family Dashboard Controls</h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {PARENT_TABS.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 font-bold border-2 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white shadow-2xl border-white/50 shadow-[#F59E0B]/25'
                        : 'bg-white/5 text-white/70 hover:bg-white/15 border-white/20 hover:border-[#F59E0B]/50 hover:text-white'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="text-sm font-black">{tab.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activities */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <h4 className="text-white font-bold text-lg mb-4">Recent Activities</h4>
                    <div className="space-y-3">
                      {selectedChild.recentActivities.slice(0, 5).map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                          {getActivityIcon(activity.type)}
                          <div className="flex-1">
                            <h5 className="text-white font-medium">{activity.title}</h5>
                            <p className="text-white/60 text-sm">{activity.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-white/40 text-xs">{formatTimeAgo(activity.timestamp)}</span>
                              {activity.hypeAwarded && (
                                <span className="text-[#F59E0B] text-xs font-bold">+{activity.hypeAwarded} HYPE</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Events */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <h4 className="text-white font-bold text-lg mb-4">Upcoming Events</h4>
                    <div className="space-y-3">
                      {selectedChild.upcomingEvents.map((event) => (
                        <div key={event.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                          <Calendar className="w-4 h-4 text-blue-400 mt-0.5" />
                          <div className="flex-1">
                            <h5 className="text-white font-medium">{event.title}</h5>
                            <p className="text-white/60 text-sm">{event.location}</p>
                            <p className="text-blue-400 text-xs">{formatDate(event.date)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Weekly Summary */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h4 className="text-white font-bold text-lg mb-4">This Week&apos;s Summary</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                      <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <div className="text-white font-bold">{selectedChild.stats.weeklyActiveTime}</div>
                      <div className="text-white/60 text-sm">Active Time</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                      <MessageCircle className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <div className="text-white font-bold">{selectedChild.stats.totalPosts}</div>
                      <div className="text-white/60 text-sm">Posts Created</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                      <Heart className="w-8 h-8 text-red-400 mx-auto mb-2" />
                      <div className="text-white font-bold">{selectedChild.recentActivities.length}</div>
                      <div className="text-white/60 text-sm">Activities</div>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl">
                      <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <div className="text-white font-bold">{selectedChild.achievements.length}</div>
                      <div className="text-white/60 text-sm">Total Achievements</div>
                    </div>
                  </div>
                </div>
              </motion.div>
                          )}

            {/* MULTI-GENERATIONAL HUB - GRANDPA JIM'S DIGITAL STADIUM */}
            {activeTab === 'multi_generational' && (
              <motion.div
                key="multi_generational"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Users className="w-8 h-8 text-[#F59E0B]" />
                    <h2 className="text-3xl font-black text-white">MULTI-GENERATIONAL FAMILY HUB</h2>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm font-bold rounded-full">3 GENERATIONS</span>
                  </div>
                  <p className="text-white/70 text-lg">Connect grandparents, parents, and children in one unified family legacy system</p>
                </div>

                {/* Family Tree Dashboard */}
                <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/30">
                  <h3 className="text-white font-bold text-xl mb-6">👨‍👩‍👧‍👦 Complete Family Ecosystem</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Grandparents Generation */}
                    <div className="space-y-4">
                      <h4 className="text-purple-400 font-bold text-center">👴👵 Grandparents Generation</h4>
                      {[
                        { 
                          name: "Grandpa Jim", 
                          role: "Family Historian", 
                          engagement: "High",
                          features: ["Memory Palace", "Wisdom Sharing", "Legacy Builder"],
                          stats: { storiesShared: 12, photosUploaded: 47, grandkidsConnected: 3 }
                        },
                        { 
                          name: "Grandma Sue", 
                          role: "Family Cheerleader", 
                          engagement: "Very High",
                          features: ["HYPE Booster", "Achievement Tracker", "Recipe Sharing"],
                          stats: { hypeGiven: 250, achievementsCelebrated: 8, recipesShared: 15 }
                        }
                      ].map((grandparent, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/10 rounded-xl p-4 border border-white/20"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                              <Crown className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                              <h5 className="text-white font-bold">{grandparent.name}</h5>
                              <p className="text-white/60 text-xs">{grandparent.role}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-3">
                            {grandparent.features.map((feature, fIndex) => (
                              <div key={fIndex} className="text-white/70 text-xs flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                {feature}
                              </div>
                            ))}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {Object.entries(grandparent.stats).map(([key, value]) => (
                              <div key={key} className="text-center">
                                <div className="text-purple-400 font-bold">{value}</div>
                                <div className="text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Parents Generation */}
                    <div className="space-y-4">
                      <h4 className="text-blue-400 font-bold text-center">👫 Parents Generation</h4>
                      {[
                        { 
                          name: "Mom (Sarah)", 
                          role: "Family Coordinator", 
                          engagement: "Very High",
                          features: ["Logistics Manager", "Communication Hub", "Health Monitor"],
                          stats: { eventsManaged: 23, teachersContacted: 8, healthCheckIns: 31 }
                        },
                        { 
                          name: "Dad (Mike)", 
                          role: "Career Mentor", 
                          engagement: "High",
                          features: ["College Planning", "Financial Guide", "Skills Coach"],
                          stats: { collegesTours: 5, scholarshipsFound: 12, mentoringSessions: 18 }
                        }
                      ].map((parent, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                          className="bg-white/10 rounded-xl p-4 border border-white/20"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                              <Heart className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                              <h5 className="text-white font-bold">{parent.name}</h5>
                              <p className="text-white/60 text-xs">{parent.role}</p>
                            </div>
                          </div>
                          
                          <div className="space-y-2 mb-3">
                            {parent.features.map((feature, fIndex) => (
                              <div key={fIndex} className="text-white/70 text-xs flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                {feature}
                              </div>
                            ))}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            {Object.entries(parent.stats).map(([key, value]) => (
                              <div key={key} className="text-center">
                                <div className="text-blue-400 font-bold">{value}</div>
                                <div className="text-white/60 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Children Generation */}
                    <div className="space-y-4">
                      <h4 className="text-green-400 font-bold text-center">👦👧 Children Generation</h4>
                      {MOCK_CHILDREN.map((child, index) => (
                        <motion.div 
                          key={child.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.4 }}
                          className="bg-white/10 rounded-xl p-4 border border-white/20"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                              <Trophy className="w-5 h-5 text-green-400" />
                            </div>
                            <div>
                              <h5 className="text-white font-bold">{child.name}</h5>
                              <p className="text-white/60 text-xs">{child.school}</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 mb-3">
                            <div className="text-center">
                              <div className="text-green-400 font-bold">{child.gpa}</div>
                              <div className="text-white/60 text-xs">GPA</div>
                            </div>
                            <div className="text-center">
                              <div className="text-[#F59E0B] font-bold">{child.hypeScore}</div>
                              <div className="text-white/60 text-xs">HYPE</div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {child.sports.map((sport, sportIndex) => (
                              <span key={sportIndex} className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                                {sport}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Family Communication Network */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-white font-bold text-xl mb-6">🌐 Family Communication Network</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-cyan-400 font-bold">💬 Active Family Conversations</h4>
                      {[
                        { 
                          thread: "Alex's Championship Game", 
                          participants: ["Grandpa Jim", "Mom", "Dad", "Alex"],
                          lastMessage: "Grandpa Jim: So proud of you champ! Remember what we practiced...",
                          unread: 2,
                          priority: "high"
                        },
                        { 
                          thread: "Emma's Science Fair Project", 
                          participants: ["Grandma Sue", "Mom", "Emma"],
                          lastMessage: "Grandma Sue: Your volcano experiment reminds me of when your dad...",
                          unread: 0,
                          priority: "normal"
                        },
                        { 
                          thread: "Family Vacation Planning", 
                          participants: ["All Family Members"],
                          lastMessage: "Dad: Found great deals on Disney World tickets for spring break...",
                          unread: 5,
                          priority: "medium"
                        }
                      ].map((conversation, index) => (
                        <div key={index} className="p-3 bg-white/5 rounded-xl">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="text-white font-bold text-sm">{conversation.thread}</h5>
                            {conversation.unread > 0 && (
                              <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                                {conversation.unread}
                              </span>
                            )}
                          </div>
                          <p className="text-white/70 text-xs mb-2">{conversation.lastMessage}</p>
                          <p className="text-white/50 text-xs">
                            Participants: {Array.isArray(conversation.participants) ? conversation.participants.join(', ') : conversation.participants}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-4">
                      <h4 className="text-white font-bold mb-4">🤖 AI Family Insights</h4>
                      <div className="space-y-3 text-sm">
                        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <strong className="text-green-400">👴 Grandpa Engagement:</strong>
                          <p className="text-white/80 text-xs mt-1">Grandpa Jim has shared 3 new family stories this week, boosting family connection by 45%.</p>
                        </div>
                        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                          <strong className="text-blue-400">💰 Financial Planning:</strong>
                          <p className="text-white/80 text-xs mt-1">College savings on track. Recommend increasing contributions by $200/month for optimal timeline.</p>
                        </div>
                        <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                          <strong className="text-purple-400">🏆 Achievement Momentum:</strong>
                          <p className="text-white/80 text-xs mt-1">Family achievement rate up 23% this quarter. All children exceeding their personal bests.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* HYPE BOOST CENTER */}
            {activeTab === 'hype_boost_center' && (
              <motion.div
                key="hype_boost_center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Zap className="w-8 h-8 text-[#F59E0B]" />
                    <h2 className="text-3xl font-black text-white">FAMILY HYPE BOOST CENTER</h2>
                    <span className="px-3 py-1 bg-electric-500/20 text-yellow-400 text-sm font-bold rounded-full">ENGAGEMENT ENGINE</span>
                  </div>
                  <p className="text-white/70 text-lg">Boost your children's achievements, celebrate milestones, and fuel family engagement through the HYPE economy</p>
                </div>

                {/* HYPE Balance & Family Economy */}
                <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-2xl p-6 border border-yellow-500/30">
                  <h3 className="text-white font-bold text-xl mb-6">⚡ Family HYPE Economy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-[#F59E0B]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-10 h-10 text-[#F59E0B]" />
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2">Family HYPE Balance</h4>
                      <div className="text-4xl font-black text-[#F59E0B] mb-2">3,847</div>
                      <p className="text-white/60 text-sm">Available to boost your children</p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Gift className="w-10 h-10 text-green-400" />
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2">This Month Given</h4>
                      <div className="text-4xl font-black text-green-400 mb-2">1,250</div>
                      <p className="text-white/60 text-sm">HYPE Points distributed</p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-10 h-10 text-purple-400" />
                      </div>
                      <h4 className="text-white font-bold text-lg mb-2">Engagement Level</h4>
                      <div className="text-4xl font-black text-purple-400 mb-2">92%</div>
                      <p className="text-white/60 text-sm">Family participation rate</p>
                    </div>
                  </div>
                </div>

                {/* Quick HYPE Boost Actions */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-white font-bold text-xl mb-6">🚀 Quick HYPE Boost Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { 
                        action: "Celebrate Achievement", 
                        hype: "+100", 
                        description: "Boost for great grades, goals, or milestones",
                        color: "from-green-400 to-emerald-600",
                        icon: Trophy
                      },
                      { 
                        action: "Good Behavior Reward", 
                        hype: "+50", 
                        description: "Positive reinforcement for character growth",
                        color: "from-blue-400 to-cyan-600",
                        icon: Heart
                      },
                      { 
                        action: "Effort Recognition", 
                        hype: "+75", 
                        description: "Acknowledge hard work and dedication",
                        color: "from-purple-400 to-pink-600",
                        icon: Target
                      },
                      { 
                        action: "Family Contribution", 
                        hype: "+25", 
                        description: "Helping family, chores, kindness",
                        color: "from-orange-400 to-red-600",
                        icon: Users
                      }
                    ].map((boost, index) => (
                      <motion.button 
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-4 bg-white/5 rounded-xl border border-white/20 hover:border-white/40 transition-all text-left"
                      >
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${boost.color} flex items-center justify-center mb-3`}>
                          <boost.icon className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-white font-bold text-sm mb-1">{boost.action}</h4>
                        <div className="text-[#F59E0B] font-bold text-lg mb-2">{boost.hype} HYPE</div>
                        <p className="text-white/60 text-xs">{boost.description}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Recent HYPE Boosts Given */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-white font-bold text-xl mb-6">📊 Recent HYPE Boosts Given</h3>
                  <div className="space-y-4">
                    {[
                      {
                        child: "Alex Johnson",
                        achievement: "Made All-Conference Team",
                        hypeGiven: 150,
                        giver: "Dad",
                        time: "2 hours ago",
                        impact: "Alex reached Level 8!"
                      },
                      {
                        child: "Emma Johnson", 
                        achievement: "Helped with dishes without being asked",
                        hypeGiven: 25,
                        giver: "Mom",
                        time: "Yesterday",
                        impact: "Character building"
                      },
                      {
                        child: "Alex Johnson",
                        achievement: "Studied 3 hours for AP Chemistry test",
                        hypeGiven: 75,
                        giver: "Grandpa Jim",
                        time: "2 days ago",
                        impact: "Work ethic development"
                      },
                      {
                        child: "Emma Johnson",
                        achievement: "Volunteered at animal shelter",
                        hypeGiven: 100,
                        giver: "Grandma Sue",
                        time: "3 days ago",
                        impact: "Community impact milestone"
                      }
                    ].map((boost, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 bg-[#F59E0B]/20 rounded-full flex items-center justify-center">
                            <Zap className="w-6 h-6 text-[#F59E0B]" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-white font-bold">{boost.child}</h4>
                              <span className="text-[#F59E0B] font-bold">+{boost.hypeGiven} HYPE</span>
                            </div>
                            <p className="text-white/80 text-sm">{boost.achievement}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-white/50 text-xs">Given by {boost.giver} • {boost.time}</span>
                              <span className="text-green-400 text-xs">• {boost.impact}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Family HYPE Goals & Challenges */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-white font-bold text-xl mb-6">🎯 Family HYPE Goals & Challenges</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-cyan-400 font-bold">Monthly Family Goals</h4>
                      {[
                        {
                          goal: "Family Reading Challenge",
                          description: "Each family member reads 2 books this month",
                          progress: 6,
                          target: 8,
                          reward: "+500 Family HYPE"
                        },
                        {
                          goal: "Community Service Hours",
                          description: "Complete 20 total volunteer hours as a family",
                          progress: 14,
                          target: 20,
                          reward: "+300 Family HYPE"
                        },
                        {
                          goal: "Academic Excellence",
                          description: "Maintain family GPA above 3.5",
                          progress: 3.7,
                          target: 3.5,
                          reward: "+750 Family HYPE"
                        }
                      ].map((goal, index) => (
                        <div key={index} className="p-4 bg-white/5 rounded-xl">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="text-white font-bold text-sm">{goal.goal}</h5>
                            <span className="text-[#F59E0B] text-xs font-bold">{goal.reward}</span>
                          </div>
                          <p className="text-white/70 text-xs mb-3">{goal.description}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-cyan-400 rounded-full"
                                style={{ width: `${Math.min((goal.progress / goal.target) * 100, 100)}%` }}
                              />
                            </div>
                            <span className="text-white/60 text-xs">{goal.progress}/{goal.target}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-4">
                      <h4 className="text-white font-bold mb-4">🏆 Family Achievement Unlocks</h4>
                      <div className="space-y-3 text-sm">
                        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <strong className="text-green-400">🥇 Family Legacy Status:</strong>
                          <p className="text-white/80 text-xs mt-1">Unlock exclusive family features when you reach 10,000 total family HYPE.</p>
                          <div className="text-green-400 text-xs mt-1">Progress: 3,847/10,000 (38%)</div>
                        </div>
                        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                          <strong className="text-blue-400">🎯 Multi-Gen Connection:</strong>
                          <p className="text-white/80 text-xs mt-1">Special grandparent features activate when all generations are active weekly.</p>
                          <div className="text-blue-400 text-xs mt-1">Status: 3/3 generations active ✅</div>
                        </div>
                        <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                          <strong className="text-purple-400">⚡ HYPE Multiplier:</strong>
                          <p className="text-white/80 text-xs mt-1">2x HYPE boost weekends unlock when family goals are consistently met.</p>
                          <div className="text-purple-400 text-xs mt-1">Next unlock: 2 goals away</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* SMART LOGISTICS MANAGER */}
            {activeTab === 'logistics_manager' && (
              <motion.div
                key="logistics_manager"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Calendar className="w-8 h-8 text-[#F59E0B]" />
                    <h2 className="text-3xl font-black text-white">SMART LOGISTICS MANAGER</h2>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm font-bold rounded-full">FAMILY COORDINATION</span>
                  </div>
                  <p className="text-white/70 text-lg">Manage schedules, transportation, and family logistics with AI assistance</p>
                </div>

                {/* Today's Schedule */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-white font-bold text-xl mb-6">Today&apos;s Family Schedule</h3>
                  <div className="space-y-4">
                    {[
                      { time: "3:00 PM", child: "Alex", event: "Football Practice", location: "School Stadium", type: "practice" },
                      { time: "4:30 PM", child: "Emma", event: "Chemistry Lab", location: "Science Building", type: "academic" },
                      { time: "6:00 PM", child: "Alex", event: "Team Dinner", location: "Coach Martinez&apos;s House", type: "team" },
                      { time: "7:30 PM", child: "Emma", event: "Study Group", location: "Library", type: "academic" }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="text-[#F59E0B] font-bold text-lg">{item.time}</div>
                          <div>
                            <h4 className="text-white font-bold">{item.event}</h4>
                            <p className="text-white/60 text-sm">{item.child} • {item.location}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                          item.type === 'practice' ? 'bg-blue-500/20 text-blue-400' :
                          item.type === 'academic' ? 'bg-green-500/20 text-green-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {item.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transportation Coordination */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-white font-bold text-xl mb-6">Smart Transportation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-white font-bold">Carpool Coordination</h4>
                      {[
                        { route: "To Football Practice", driver: "You", passengers: ["Alex", "Marcus T.", "David R."], time: "2:45 PM" },
                        { route: "From Practice", driver: "Sarah's Mom", passengers: ["Alex", "Emma"], time: "5:30 PM" }
                      ].map((carpool, index) => (
                        <div key={index} className="p-4 bg-white/5 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="text-white font-bold">{carpool.route}</h5>
                            <span className="text-[#F59E0B] font-bold">{carpool.time}</span>
                          </div>
                          <p className="text-white/60 text-sm">Driver: {carpool.driver}</p>
                          <p className="text-white/60 text-sm">Passengers: {carpool.passengers.join(', ')}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-white/5 rounded-xl p-4">
                      <h4 className="text-white font-bold mb-3">AI Travel Insights</h4>
                      <div className="space-y-3 text-sm">
                        <div className="text-green-400">
                          <strong>🚗 Efficient:</strong> Today&apos;s routes save 45 minutes vs individual trips
                        </div>
                        <div className="text-yellow-400">
                          <strong>⏰ Alert:</strong> Traffic delay on Route 35 - leave 10 min early
                        </div>
                        <div className="text-blue-400">
                          <strong>🤝 Carpool:</strong> 3 families coordinated for football practice
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Activities Tab */}
            {activeTab === 'activities' && (
              <motion.div
                key="activities"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold text-white">All Activities</h3>
                {selectedChild.recentActivities.map((activity) => (
                  <div key={activity.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <div className="flex items-start gap-4">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-lg">{activity.title}</h4>
                        <p className="text-white/80 mb-2">{activity.description}</p>
                        <div className="flex items-center gap-4">
                          <span className="text-white/60 text-sm">{formatTimeAgo(activity.timestamp)}</span>
                          {activity.hypeAwarded && (
                            <span className="text-[#F59E0B] font-bold">+{activity.hypeAwarded} HYPE</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <motion.div
                key="achievements"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold text-white">Achievements Earned</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {selectedChild.achievements.map((achievement) => (
                    <div key={achievement.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-yellow-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-bold text-lg">{achievement.title}</h4>
                          <p className="text-white/80 mb-2">{achievement.description}</p>
                          <div className="flex items-center gap-4">
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                              {achievement.category}
                            </span>
                            <span className="text-[#F59E0B] font-bold">+{achievement.hypeValue} HYPE</span>
                            <span className="text-white/60 text-sm">{formatDate(achievement.earnedDate)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Schedule Tab */}
            {activeTab === 'schedule' && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold text-white">Upcoming Schedule</h3>
                {selectedChild.upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-lg">{event.title}</h4>
                        <p className="text-white/80 mb-2">{event.location}</p>
                        <div className="flex items-center gap-4">
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full uppercase">
                            {event.type}
                          </span>
                          <span className="text-white/60">{formatDate(event.date)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Communication Tab */}
            {activeTab === 'communication' && (
              <motion.div
                key="communication"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <MessageCircle className="w-24 h-24 text-white/20 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Communication Center</h3>
                <p className="text-white/60 max-w-md mx-auto mb-8">
                  Direct messaging with coaches, teachers, and school administrators. Stay connected with your student&apos;s support network.
                </p>
                <button className="px-8 py-3 bg-[#F59E0B] text-white font-bold rounded-xl hover:bg-[#F97316] transition-colors">
                  Start Conversation
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Gage AI Chat */}
      <GageAIChat
        userId="parent_user"
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
}