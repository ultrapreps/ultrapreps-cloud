'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Users, Trophy, MessageCircle, Calendar, Clock, 
  ArrowLeft, Star, TrendingUp, Heart,
  BarChart3, Crown, Zap
} from 'lucide-react';
import GageAIChat from '../../components/GageAIChat';
import HypeWidget from '../../components/HypeWidget';


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
  { id: 'multi_child_monitor', label: 'Multi-Child Monitor', icon: Users },
  { id: 'communication_hub', label: 'Communication Hub', icon: MessageCircle },
  { id: 'logistics_manager', label: 'Smart Logistics', icon: Calendar },
  { id: 'achievements', label: 'Family Achievements', icon: Trophy },
  { id: 'health_wellness', label: 'Health & Wellness', icon: Heart }
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
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-white mb-4">
              <span className="text-[#F59E0B]">ULTRA</span> Parent Hub
            </h2>
            <p className="text-white/70 text-lg">
              Monitor your student-athlete&apos;s progress, achievements, and activities in real-time.
            </p>
          </div>

          {/* Child Selector */}
          {MOCK_CHILDREN.length > 1 && (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 mb-8">
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
            </div>
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

          {/* Tab Navigation */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 mb-8">
            <div className="flex flex-wrap gap-2">
              {PARENT_TABS.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 font-medium ${
                      activeTab === tab.id
                        ? 'bg-[#F59E0B] text-white shadow-lg'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

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

            {/* MULTI-CHILD MONITOR */}
            {activeTab === 'multi_child_monitor' && (
              <motion.div
                key="multi_child_monitor"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Users className="w-8 h-8 text-[#F59E0B]" />
                    <h2 className="text-3xl font-black text-white">MULTI-CHILD COMMAND CENTER</h2>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-bold rounded-full">FAMILY OVERVIEW</span>
                  </div>
                  <p className="text-white/70 text-lg">Monitor all your children&apos;s activities, grades, and achievements in one place</p>
                </div>

                {/* All Children Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {MOCK_CHILDREN.map((child) => (
                    <div key={child.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                          <Users className="w-8 h-8 text-white/60" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-xl">{child.name}</h3>
                          <p className="text-white/60 text-sm">{child.school}</p>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className={`text-xl font-black ${getGPAColor(child.gpa)}`}>{child.gpa}</div>
                          <div className="text-white/60 text-xs">GPA</div>
                        </div>
                        <div className="text-center">
                          <div className="text-[#F59E0B] text-xl font-black">{child.hypeScore}</div>
                          <div className="text-white/60 text-xs">HYPE</div>
                        </div>
                      </div>

                      {/* Sports */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {child.sports.map((sport, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                            {sport}
                          </span>
                        ))}
                      </div>

                      {/* Recent Activity */}
                      <div className="text-sm">
                        <p className="text-white/70">Recent:</p>
                        <p className="text-white">{child.recentActivities[0]?.title || 'No recent activity'}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Family Analytics */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-white font-bold text-xl mb-6">Family Performance Analytics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-black text-green-400">3.6</div>
                      <div className="text-white/60 text-sm">Family Avg GPA</div>
                    </div>
                    <div className="text-center">
                                                <div className="text-3xl font-black text-[#F59E0B]">2,847</div>
                          <div className="text-white/60 text-sm">Total HYPE</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-black text-blue-400">12</div>
                          <div className="text-white/60 text-sm">This Month&apos;s Achievements</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-black text-purple-400">95%</div>
                      <div className="text-white/60 text-sm">Attendance Rate</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* COMMUNICATION HUB */}
            {activeTab === 'communication_hub' && (
              <motion.div
                key="communication_hub"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <MessageCircle className="w-8 h-8 text-[#F59E0B]" />
                    <h2 className="text-3xl font-black text-white">ALL-TEACHER COMMUNICATION HUB</h2>
                    <span className="px-3 py-1 bg-red-500/20 text-red-400 text-sm font-bold rounded-full">UNIFIED MESSAGING</span>
                  </div>
                  <p className="text-white/70 text-lg">Communicate with all teachers and coaches in one powerful interface</p>
                </div>

                {/* Active Conversations */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-white font-bold text-xl mb-6">Active Conversations</h3>
                  <div className="space-y-4">
                    {[
                      { 
                        teacher: "Ms. Sarah Johnson", 
                        subject: "English Literature", 
                        child: "Alex Johnson",
                        lastMessage: "Alex's essay showed remarkable improvement this week...", 
                        time: "2 hours ago",
                        unread: 1,
                        priority: "high"
                      },
                      { 
                        teacher: "Coach Martinez", 
                        subject: "Football Team", 
                        child: "Alex Johnson",
                        lastMessage: "Great practice today! Alex's speed work is paying off...", 
                        time: "5 hours ago",
                        unread: 0,
                        priority: "normal"
                      },
                      { 
                        teacher: "Mr. Thompson", 
                        subject: "AP Chemistry", 
                        child: "Emma Johnson",
                        lastMessage: "Emma needs to schedule lab makeup time...", 
                        time: "1 day ago",
                        unread: 2,
                        priority: "medium"
                      }
                    ].map((conversation, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all cursor-pointer">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                            <span className="text-blue-400 font-bold text-sm">{conversation.teacher.split(' ')[0][0]}{conversation.teacher.split(' ')[1][0]}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-white font-bold">{conversation.teacher}</h4>
                              <span className="text-white/60 text-sm">• {conversation.subject}</span>
                              <span className="text-[#F59E0B] text-xs">({conversation.child})</span>
                            </div>
                            <p className="text-white/70 text-sm">{conversation.lastMessage}</p>
                            <p className="text-white/50 text-xs mt-1">{conversation.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {conversation.unread > 0 && (
                            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                              {conversation.unread}
                            </span>
                          )}
                          <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                            conversation.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                            conversation.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {conversation.priority}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-white font-bold text-xl mb-6">Quick Actions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="flex items-center gap-3 p-4 bg-[#F59E0B]/20 text-[#F59E0B] rounded-xl hover:bg-[#F59E0B]/30 transition-all">
                      <MessageCircle className="w-6 h-6" />
                      <div>
                        <div className="font-bold">Message All Teachers</div>
                        <div className="text-sm opacity-80">Send update to entire team</div>
                      </div>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all">
                      <Calendar className="w-6 h-6" />
                      <div>
                        <div className="font-bold">Schedule Conferences</div>
                        <div className="text-sm opacity-80">Parent-teacher meetings</div>
                      </div>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500/30 transition-all">
                      <Trophy className="w-6 h-6" />
                      <div>
                        <div className="font-bold">Share Good News</div>
                        <div className="text-sm opacity-80">Celebrate achievements</div>
                      </div>
                    </button>
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