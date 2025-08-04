'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Star, TrendingUp, MapPin, Calendar, Trophy, 
  Target, Eye, Heart, Phone, Mail, User, School,
  Filter, ArrowRight, Crown, Shield, Zap, Award,
  BarChart3, Users, Clock, DollarSign, CheckCircle,
  AlertTriangle, Flame, Camera, Video, FileText
} from 'lucide-react';
import Link from 'next/link';

export default function RecruitingDemo() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAthlete, setSelectedAthlete] = useState(0);
  const [liveUpdates, setLiveUpdates] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    sport: 'all',
    position: 'all',
    grade: 'all',
    gpa: 'all',
    location: 'all'
  });

  // Simulate live recruiting activity
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUpdates(prev => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const athletes = [
    {
      id: 1,
      name: 'Marcus Johnson',
      position: 'Quarterback',
      sport: 'Football',
      school: 'Liberty High School',
      grade: '12th',
      gpa: 4.2,
      sat: 1480,
      height: '6\'2"',
      weight: '195 lbs',
      speed: '4.4s',
      location: 'Austin, TX',
      stats: { 
        passingYards: 3247, 
        touchdowns: 31, 
        completion: 68.5,
        rating: 94.2 
      },
      highlights: 12,
      offers: [
        { school: 'University of Texas', status: 'pending', tier: 'D1', scholarship: 85 },
        { school: 'Texas A&M', status: 'interested', tier: 'D1', scholarship: 70 },
        { school: 'Oklahoma', status: 'watching', tier: 'D1', scholarship: 60 },
        { school: 'Rice University', status: 'offered', tier: 'D1', scholarship: 95 }
      ],
      character: {
        leadership: 95,
        workEthic: 92,
        teamwork: 89,
        coachability: 96
      },
      recruiting: {
        interest: 94,
        fit: 88,
        likelihood: 76,
        timeline: '2 weeks'
      },
      recentActivity: [
        { date: '2 days ago', action: 'Official visit scheduled', school: 'UT' },
        { date: '1 week ago', action: 'Film review completed', coach: 'Coach Smith' },
        { date: '2 weeks ago', action: 'Scholarship offer received', school: 'Rice' }
      ]
    },
    {
      id: 2,
      name: 'Sarah Martinez',
      position: 'Point Guard',
      sport: 'Basketball',
      school: 'Roosevelt High',
      grade: '11th',
      gpa: 4.0,
      sat: 1520,
      height: '5\'7"',
      weight: '140 lbs',
      speed: 'Elite',
      location: 'Phoenix, AZ',
      stats: { 
        points: 18.5, 
        assists: 7.2, 
        steals: 3.1,
        rating: 96.8 
      },
      highlights: 15,
      offers: [
        { school: 'Stanford', status: 'offered', tier: 'D1', scholarship: 90 },
        { school: 'UConn', status: 'interested', tier: 'D1', scholarship: 85 },
        { school: 'Arizona State', status: 'watching', tier: 'D1', scholarship: 75 }
      ],
      character: {
        leadership: 98,
        workEthic: 94,
        teamwork: 96,
        coachability: 93
      },
      recruiting: {
        interest: 92,
        fit: 94,
        likelihood: 82,
        timeline: '3 months'
      },
      recentActivity: [
        { date: '1 day ago', action: 'Game film uploaded', performance: 'Outstanding' },
        { date: '3 days ago', action: 'Coach call scheduled', school: 'Stanford' },
        { date: '1 week ago', action: 'Academic transcripts sent', schools: 'Multiple' }
      ]
    }
  ];

  const currentAthlete = athletes[selectedAthlete];

  const recruitingMetrics = {
    totalProspects: 1247,
    activeOffers: 89,
    commitments: 23,
    visitsPending: 34,
    averageGPA: 3.8,
    scholarshipTotal: 2850000
  };

  const topTargets = [
    { name: 'Marcus Johnson', position: 'QB', rating: 94, likelihood: 76 },
    { name: 'Sarah Martinez', position: 'PG', rating: 97, likelihood: 82 },
    { name: 'Tyler Chen', position: 'RB', rating: 91, likelihood: 65 },
    { name: 'Emma Rodriguez', position: 'F', rating: 93, likelihood: 71 }
  ];

  const recentActivity = [
    { time: '5 min ago', action: 'Marcus Johnson uploaded highlight reel', type: 'media' },
    { time: '12 min ago', action: 'New scholarship offer sent to Sarah Martinez', type: 'offer' },
    { time: '25 min ago', action: 'Official visit confirmed for this weekend', type: 'visit' },
    { time: '1 hour ago', action: 'Academic transcript received', type: 'academic' },
    { time: '2 hours ago', action: 'Coach evaluation completed', type: 'evaluation' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Search className="w-16 h-16 mx-auto mb-4 text-purple-300" />
            <h1 className="text-5xl font-black text-white mb-4">
              AI RECRUITING COMMAND CENTER
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Revolutionary AI-powered recruiting platform that identifies, analyzes, and connects 
              with the perfect student-athletes 2-3 years ahead of competition.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Live Metrics Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-bold">LIVE RECRUITING INTELLIGENCE</span>
            </div>
            <div className="text-sm text-white/70">Last update: {liveUpdates * 3} seconds ago</div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-black text-purple-400">{recruitingMetrics.totalProspects.toLocaleString()}</div>
              <div className="text-xs text-white/70">Active Prospects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-blue-400">{recruitingMetrics.activeOffers}</div>
              <div className="text-xs text-white/70">Active Offers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-green-400">{recruitingMetrics.commitments}</div>
              <div className="text-xs text-white/70">Commitments</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-yellow-400">{recruitingMetrics.visitsPending}</div>
              <div className="text-xs text-white/70">Visits Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-orange-400">{recruitingMetrics.averageGPA}</div>
              <div className="text-xs text-white/70">Avg GPA</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-red-400">${(recruitingMetrics.scholarshipTotal / 1000000).toFixed(1)}M</div>
              <div className="text-xs text-white/70">Scholarship Value</div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white/5 p-2 rounded-xl">
          {[
            { id: 'dashboard', label: 'Command Center', icon: BarChart3 },
            { id: 'prospects', label: 'Prospect Database', icon: Users },
            { id: 'pipeline', label: 'Recruiting Pipeline', icon: Target },
            { id: 'analytics', label: 'AI Analytics', icon: TrendingUp },
            { id: 'communications', label: 'Communications', icon: Phone }
          ].map(tab => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-500 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
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

            {/* Command Center Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* Top Recruiting Targets */}
                  <div className="bg-white/5 p-6 rounded-xl">
                    <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                      <Target className="w-6 h-6 text-purple-400" />
                      Priority Recruiting Targets
                    </h2>
                    
                    <div className="space-y-4">
                      {topTargets.map((target, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center font-bold">
                              {target.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-bold">{target.name}</div>
                              <div className="text-sm text-white/70">{target.position}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <div className="text-lg font-bold text-purple-400">{target.rating}</div>
                              <div className="text-xs text-white/60">Rating</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-green-400">{target.likelihood}%</div>
                              <div className="text-xs text-white/60">Likelihood</div>
                            </div>
                            <button className="px-4 py-2 bg-purple-500 rounded-lg font-bold hover:bg-purple-600 transition-colors">
                              Contact
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Recruiting Pipeline Visualization */}
                  <div className="bg-white/5 p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-6">Recruiting Pipeline Flow</h3>
                    
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { stage: 'Prospects', count: 847, color: 'text-blue-400' },
                        { stage: 'Evaluating', count: 156, color: 'text-yellow-400' },
                        { stage: 'Offers Out', count: 89, color: 'text-orange-400' },
                        { stage: 'Committed', count: 23, color: 'text-green-400' }
                      ].map((stage, index) => (
                        <div key={index} className="text-center">
                          <div className={`text-3xl font-black ${stage.color}`}>{stage.count}</div>
                          <div className="text-sm text-white/70">{stage.stage}</div>
                          <div className="w-full bg-white/20 rounded-full h-2 mt-2">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${
                                index === 0 ? 'from-blue-500 to-blue-600' :
                                index === 1 ? 'from-yellow-500 to-yellow-600' :
                                index === 2 ? 'from-orange-500 to-orange-600' :
                                'from-green-500 to-green-600'
                              }`}
                              style={{ width: `${(stage.count / 847) * 100}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Live Activity Feed */}
                <div className="space-y-6">
                  <div className="bg-white/5 p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-green-400" />
                      Live Activity
                    </h3>
                    
                    <div className="space-y-3">
                      {recentActivity.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 p-3 bg-white/5 rounded-lg"
                        >
                          <div className={`p-2 rounded-full ${
                            activity.type === 'media' ? 'bg-purple-500/20' :
                            activity.type === 'offer' ? 'bg-green-500/20' :
                            activity.type === 'visit' ? 'bg-blue-500/20' :
                            activity.type === 'academic' ? 'bg-yellow-500/20' :
                            'bg-gray-500/20'
                          }`}>
                            {activity.type === 'media' && <Camera className="w-4 h-4 text-purple-400" />}
                            {activity.type === 'offer' && <Award className="w-4 h-4 text-green-400" />}
                            {activity.type === 'visit' && <MapPin className="w-4 h-4 text-blue-400" />}
                            {activity.type === 'academic' && <FileText className="w-4 h-4 text-yellow-400" />}
                            {activity.type === 'evaluation' && <Eye className="w-4 h-4 text-gray-400" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-white/90">{activity.action}</p>
                            <p className="text-xs text-white/60">{activity.time}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white/5 p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-3 bg-purple-500/20 rounded-lg text-center hover:bg-purple-500/30 transition-colors">
                        <Phone className="w-5 h-5 mx-auto mb-2 text-purple-400" />
                        <div className="text-sm font-bold">Schedule Call</div>
                      </button>
                      <button className="p-3 bg-green-500/20 rounded-lg text-center hover:bg-green-500/30 transition-colors">
                        <Award className="w-5 h-5 mx-auto mb-2 text-green-400" />
                        <div className="text-sm font-bold">Send Offer</div>
                      </button>
                      <button className="p-3 bg-blue-500/20 rounded-lg text-center hover:bg-blue-500/30 transition-colors">
                        <Calendar className="w-5 h-5 mx-auto mb-2 text-blue-400" />
                        <div className="text-sm font-bold">Plan Visit</div>
                      </button>
                      <button className="p-3 bg-yellow-500/20 rounded-lg text-center hover:bg-yellow-500/30 transition-colors">
                        <Video className="w-5 h-5 mx-auto mb-2 text-yellow-400" />
                        <div className="text-sm font-bold">Review Film</div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs content would go here */}
            {activeTab !== 'dashboard' && (
              <div className="text-center py-20">
                <h2 className="text-3xl font-bold mb-4">
                  {activeTab === 'prospects' && 'Advanced Prospect Database'}
                  {activeTab === 'pipeline' && 'Recruiting Pipeline Management'}
                  {activeTab === 'analytics' && 'AI-Powered Analytics'}
                  {activeTab === 'communications' && 'Automated Communications'}
                </h2>
                <p className="text-white/70 text-lg mb-8">
                  Full feature suite available in production platform
                </p>
                <Link
                  href="/recruiting"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-purple-500 rounded-xl font-bold hover:bg-purple-600 transition-colors"
                >
                  Explore Full Platform
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Value Proposition */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-black mb-8">Revolutionary Recruiting Intelligence</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 p-8 rounded-xl">
              <Search className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">AI-Powered Discovery</h3>
              <p className="text-white/70">Identify hidden talent 2-3 years before competitors using advanced machine learning algorithms.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Predictive Analytics</h3>
              <p className="text-white/70">94% accuracy in predicting athletic development and academic success trajectories.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Championship Results</h3>
              <p className="text-white/70">500% improvement in recruiting ROI and 2000% return on investment for participating programs.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/recruiting"
            className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-purple-500/30"
          >
            <Search className="w-7 h-7" />
            Access Full Recruiting Platform
            <ArrowRight className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </div>
  );
}