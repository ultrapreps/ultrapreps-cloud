'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Heart, MessageCircle, Trophy, Star, Crown, Shield, 
  ArrowRight, Flame, Target, Award, Calendar, MapPin, Eye,
  TrendingUp, Zap, Bell, Share, ThumbsUp, ChevronRight,
  School, Home, Activity, Camera, Clock, User
} from 'lucide-react';
import Link from 'next/link';

export default function CommunityDemo() {
  const [activeTab, setActiveTab] = useState('feed');
  const [liveUpdates, setLiveUpdates] = useState(0);

  // Simulate live activity
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUpdates(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const feedActivity = [
    {
      id: 1,
      type: 'achievement',
      user: 'Marcus Johnson',
      school: 'Liberty High Eagles',
      content: 'Threw for 347 yards and 4 TDs in the championship game!',
      achievement: 'State Championship MVP',
      time: '2 minutes ago',
      likes: 124,
      comments: 18,
      avatar: 'MJ',
      trending: true
    },
    {
      id: 2,
      type: 'celebration',
      user: 'Sarah Martinez',
      school: 'Roosevelt Wolves',
      content: 'Broke the school record for assists! 🏀',
      achievement: 'School Record Holder',
      time: '15 minutes ago',
      likes: 89,
      comments: 12,
      avatar: 'SM'
    },
    {
      id: 3,
      type: 'game_result',
      school: 'Westfield Mustangs',
      content: 'FINAL SCORE: Mustangs 28 - Wildcats 14',
      game: 'Regional Championship',
      time: '1 hour ago',
      likes: 156,
      comments: 24,
      avatar: 'WM',
      highlight: true
    },
    {
      id: 4,
      type: 'parent_pride',
      user: 'Coach Thompson',
      school: 'Mountain View Lions',
      content: 'Proud of our team\'s 4.0 GPA average this semester!',
      achievement: 'Academic Excellence',
      time: '3 hours ago',
      likes: 67,
      comments: 8,
      avatar: 'CT'
    }
  ];

  const communityStats = {
    totalUsers: 12847,
    schoolsActive: 45,
    postsToday: 234,
    connectionsThisWeek: 567,
    engagementRate: 94.2
  };

  const upcomingEvents = [
    {
      title: 'State Championship Final',
      school: 'Liberty High vs Roosevelt',
      date: 'Friday, Nov 15',
      time: '7:00 PM',
      attending: 245,
      type: 'game'
    },
    {
      title: 'Senior Night Celebration',
      school: 'Westfield Academy',
      date: 'Saturday, Nov 16',
      time: '6:00 PM',
      attending: 89,
      type: 'ceremony'
    },
    {
      title: 'College Signing Day',
      school: 'Multiple Schools',
      date: 'Wednesday, Dec 4',
      time: '10:00 AM',
      attending: 567,
      type: 'signing'
    }
  ];

  const familyConnections = [
    {
      student: 'Marcus Johnson',
      family: ['John Johnson (Father)', 'Lisa Johnson (Mother)', 'Emma Johnson (Sister)'],
      supporters: 24,
      engagement: 'High'
    },
    {
      student: 'Sarah Martinez',
      family: ['Carlos Martinez (Father)', 'Maria Martinez (Mother)'],
      supporters: 18,
      engagement: 'High'
    }
  ];

  const safetyFeatures = [
    {
      feature: 'Family Oversight',
      description: 'Parents can monitor all interactions',
      icon: Shield,
      status: 'Active'
    },
    {
      feature: 'Content Moderation',
      description: '24/7 AI-powered safety monitoring',
      icon: Eye,
      status: 'Active'
    },
    {
      feature: 'Private Messaging',
      description: 'Secure, family-viewable communications',
      icon: MessageCircle,
      status: 'Active'
    },
    {
      feature: 'Verified Accounts',
      description: 'All users verified through schools',
      icon: Award,
      status: 'Active'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 to-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Users className="w-16 h-16 mx-auto mb-4 text-green-300" />
            <h1 className="text-5xl font-black text-white mb-4">
              COMMUNITY ENGAGEMENT HUB
            </h1>
            <p className="text-xl text-green-200 max-w-3xl mx-auto">
              Connect student-athletes, families, coaches, and communities in a safe, 
              supportive environment that celebrates achievements and builds lasting bonds.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Live Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-bold">LIVE COMMUNITY ACTIVITY</span>
            </div>
            <div className="flex items-center gap-8 text-sm">
              <div>
                <span className="text-green-400 font-bold">{communityStats.totalUsers.toLocaleString()}</span>
                <span className="text-white/70 ml-1">Active Users</span>
              </div>
              <div>
                <span className="text-blue-400 font-bold">{communityStats.schoolsActive}</span>
                <span className="text-white/70 ml-1">Schools</span>
              </div>
              <div>
                <span className="text-purple-400 font-bold">{communityStats.postsToday}</span>
                <span className="text-white/70 ml-1">Posts Today</span>
              </div>
              <div>
                <span className="text-yellow-400 font-bold">{communityStats.engagementRate}%</span>
                <span className="text-white/70 ml-1">Engagement</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 bg-white/5 p-2 rounded-xl">
          {[
            { id: 'feed', label: 'Community Feed', icon: Activity },
            { id: 'events', label: 'Upcoming Events', icon: Calendar },
            { id: 'families', label: 'Family Connections', icon: Home },
            { id: 'safety', label: 'Safety Features', icon: Shield }
          ].map(tab => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-500 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            
            {/* Community Feed */}
            {activeTab === 'feed' && (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <h2 className="text-2xl font-black flex items-center gap-3">
                    <Activity className="w-6 h-6 text-green-400" />
                    Live Activity Feed
                  </h2>
                  
                  {feedActivity.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-6 rounded-xl border transition-all hover:scale-[1.02] ${
                        post.trending ? 'border-yellow-500/50 bg-yellow-500/10' :
                        post.highlight ? 'border-green-500/50 bg-green-500/10' :
                        'border-white/20 bg-white/5'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center font-bold">
                          {post.avatar}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-bold">{post.user || post.school}</span>
                            {post.trending && <Flame className="w-4 h-4 text-yellow-500" />}
                            {post.highlight && <Trophy className="w-4 h-4 text-green-500" />}
                            <span className="text-white/50 text-sm ml-auto">{post.time}</span>
                          </div>
                          
                          <p className="text-white/90 mb-3">{post.content}</p>
                          
                          {(post.achievement || post.game) && (
                            <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-sm font-bold mb-3">
                              {post.achievement || post.game}
                            </div>
                          )}
                          
                          <div className="flex items-center gap-6 text-sm">
                            <button className="flex items-center gap-2 text-white/70 hover:text-red-400 transition-colors">
                              <Heart className="w-4 h-4" />
                              {post.likes}
                            </button>
                            <button className="flex items-center gap-2 text-white/70 hover:text-blue-400 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              {post.comments}
                            </button>
                            <button className="flex items-center gap-2 text-white/70 hover:text-green-400 transition-colors">
                              <Share className="w-4 h-4" />
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Trending Sidebar */}
                <div className="space-y-6">
                  <div className="bg-white/5 p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      Trending Now
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <Flame className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">#ChampionshipFinals</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <Trophy className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium">#StatePlayers</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <Star className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium">#SeniorNight</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/70">New Connections</span>
                        <span className="font-bold text-green-400">+{communityStats.connectionsThisWeek}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Active Schools</span>
                        <span className="font-bold text-blue-400">{communityStats.schoolsActive}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Posts Today</span>
                        <span className="font-bold text-purple-400">{communityStats.postsToday}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Upcoming Events */}
            {activeTab === 'events' && (
              <div>
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-blue-400" />
                  Upcoming Events
                </h2>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 p-6 rounded-xl border border-white/20 hover:border-blue-400/50 transition-all"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        {event.type === 'game' && <Trophy className="w-5 h-5 text-yellow-500" />}
                        {event.type === 'ceremony' && <Crown className="w-5 h-5 text-purple-500" />}
                        {event.type === 'signing' && <Award className="w-5 h-5 text-green-500" />}
                        <span className="text-sm font-bold text-white/70 uppercase">{event.type}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                      <p className="text-white/70 mb-4">{event.school}</p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-green-400" />
                          <span className="text-sm font-bold">{event.attending} attending</span>
                        </div>
                        <button className="text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors">
                          Join Event
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Family Connections */}
            {activeTab === 'families' && (
              <div>
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <Home className="w-6 h-6 text-purple-400" />
                  Family Connections
                </h2>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {familyConnections.map((family, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 p-6 rounded-xl border border-white/20"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center font-bold">
                          {family.student.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{family.student}</h3>
                          <p className="text-white/70">Student-Athlete</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-bold mb-2 flex items-center gap-2">
                          <Heart className="w-4 h-4 text-pink-400" />
                          Family Members
                        </h4>
                        <div className="space-y-1">
                          {family.family.map((member, idx) => (
                            <div key={idx} className="text-sm text-white/80 flex items-center gap-2">
                              <User className="w-3 h-3" />
                              {member}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-green-400" />
                          <span className="text-sm font-bold">{family.supporters} supporters</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          family.engagement === 'High' ? 'bg-green-500/20 text-green-300' :
                          'bg-yellow-500/20 text-yellow-300'
                        }`}>
                          {family.engagement} Engagement
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-8 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-8">
                  <h3 className="text-2xl font-black text-center mb-6">Family-First Platform</h3>
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <Heart className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                      <h4 className="font-bold mb-2">Safe Environment</h4>
                      <p className="text-sm text-white/70">Family oversight on all interactions and content</p>
                    </div>
                    <div>
                      <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                      <h4 className="font-bold mb-2">Multi-Generation</h4>
                      <p className="text-sm text-white/70">Connect grandparents, parents, and siblings</p>
                    </div>
                    <div>
                      <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
                      <h4 className="font-bold mb-2">Privacy Protected</h4>
                      <p className="text-sm text-white/70">Advanced privacy controls for family peace of mind</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Safety Features */}
            {activeTab === 'safety' && (
              <div>
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-green-400" />
                  Safety & Security Features
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  {safetyFeatures.map((feature, index) => {
                    const FeatureIcon = feature.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 p-6 rounded-xl border border-green-500/30"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                            <FeatureIcon className="w-6 h-6 text-green-400" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{feature.feature}</h3>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full" />
                              <span className="text-sm text-green-400 font-bold">{feature.status}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-white/70">{feature.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
                
                <div className="bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-2xl p-8">
                  <h3 className="text-2xl font-black text-center mb-6">Comprehensive Safety Framework</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                    <div>
                      <Eye className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                      <h4 className="font-bold mb-2">24/7 Monitoring</h4>
                      <p className="text-sm text-white/70">AI-powered content monitoring around the clock</p>
                    </div>
                    <div>
                      <Shield className="w-8 h-8 text-green-400 mx-auto mb-3" />
                      <h4 className="font-bold mb-2">Family Controls</h4>
                      <p className="text-sm text-white/70">Parents have full visibility and control</p>
                    </div>
                    <div>
                      <Award className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                      <h4 className="font-bold mb-2">Verified Users</h4>
                      <p className="text-sm text-white/70">All accounts verified through schools</p>
                    </div>
                    <div>
                      <Bell className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                      <h4 className="font-bold mb-2">Instant Alerts</h4>
                      <p className="text-sm text-white/70">Immediate notifications for any concerns</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Value Proposition */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-black mb-8">Building Stronger Athletic Communities</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 p-8 rounded-xl">
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Connected Community</h3>
              <p className="text-white/70">Bring together students, families, coaches, and fans in one unified platform that celebrates athletic achievement.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Family-Safe Environment</h3>
              <p className="text-white/70">Advanced safety features and family oversight ensure a secure space for student-athletes to shine.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Heart className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Meaningful Connections</h3>
              <p className="text-white/70">Foster lasting relationships between athletes, families, and communities that extend far beyond the game.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/community"
            className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-green-500/30"
          >
            <Users className="w-7 h-7" />
            Join Our Athletic Community
            <ArrowRight className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </div>
  );
}