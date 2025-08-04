'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, TrendingUp, Target, Trophy, Zap, Brain, Eye, Crown,
  ArrowUp, ArrowDown, Activity, Users, Star, Award, Calendar,
  MapPin, Clock, Flame, Shield, Rocket, CheckCircle, AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

export default function AnalyticsDemo() {
  const [activeMetric, setActiveMetric] = useState('performance');
  const [timeRange, setTimeRange] = useState('season');
  const [isLive, setIsLive] = useState(false);

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLive(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const performanceMetrics = {
    current: {
      overall: 94.2,
      improvement: 12.8,
      prediction: 97.1,
      ranking: 3
    },
    breakdown: {
      technical: { score: 92, trend: 'up', change: 8.2 },
      physical: { score: 96, trend: 'up', change: 15.1 },
      mental: { score: 91, trend: 'up', change: 7.5 },
      strategic: { score: 88, trend: 'up', change: 18.3 }
    }
  };

  const recruitingMetrics = {
    interest: 89,
    scholarshipProbability: 76,
    divisionLevel: 'D1',
    recruitingRank: 47,
    viewsThisWeek: 234,
    collegeInterest: [
      { school: 'University of Texas', interest: 95, tier: 'High' },
      { school: 'Ohio State', interest: 88, tier: 'High' },
      { school: 'Stanford', interest: 82, tier: 'Medium' },
      { school: 'Duke', interest: 79, tier: 'Medium' }
    ]
  };

  const achievements = [
    { title: 'Regional Champion', date: '2024-10-15', impact: 'High', type: 'competition' },
    { title: 'Personal Record', date: '2024-10-10', impact: 'Medium', type: 'performance' },
    { title: 'Team MVP', date: '2024-09-28', impact: 'High', type: 'leadership' },
    { title: 'Academic Honor Roll', date: '2024-09-15', impact: 'High', type: 'academic' }
  ];

  const predictionInsights = [
    { metric: 'Next Game Performance', prediction: '94.2%', confidence: 'High', trend: 'up' },
    { metric: 'Season Goal Achievement', prediction: '87.5%', confidence: 'High', trend: 'up' },
    { metric: 'Scholarship Probability', prediction: '76.3%', confidence: 'Medium', trend: 'up' },
    { metric: 'Injury Risk', prediction: '12.1%', confidence: 'High', trend: 'down' }
  ];

  return (
    <div className="ultra-page-layout">
      {/* Standardized Stadium Background */}
      <div className="absolute inset-0 ultra-stadium-bg" />
      
      {/* Standardized Overlays */}
      <div className="absolute inset-0 ultra-overlay-primary" />
      <div className="absolute inset-0 ultra-overlay-secondary" />

      {/* Header */}
      <div className="ultra-content-wrapper">
        <div className="ultra-container">
          <div className="text-center ultra-section-spacing">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Brain className="w-16 h-16 mx-auto mb-4 text-blue-300" />
            <h1 className="ultra-hero-text text-white">
              ATHLETIC INTELLIGENCE DASHBOARD
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-blue-200 max-w-3xl mx-auto px-4">
              Advanced AI analytics that transform student-athlete performance data into 
              actionable insights for coaches, parents, and recruiters.
            </p>
          </motion.div>
          </div>
        </div>
      </div>

      <div className="ultra-content-wrapper">
        <div className="ultra-container">
        {/* Live Status Indicator */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black">Marcus Johnson - QB #12</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full">
              <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-green-500' : 'bg-green-400'} animate-pulse`} />
              <span className="text-green-300 text-xs sm:text-sm font-bold">LIVE TRACKING</span>
            </div>
          </div>
          
          <div className="flex gap-1 sm:gap-2 w-full sm:w-auto">
            {['week', 'month', 'season'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all ${
                  timeRange === range
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* Overall Performance Score */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="sm:col-span-2 lg:col-span-2 ultra-card bg-gradient-to-br from-dna-blue/30 to-purple-900/30 border-dna-blue/50"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-bold">Overall Performance</h3>
              <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            </div>
            
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-white/20"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - performanceMetrics.current.overall / 100)}`}
                    className="text-blue-400 transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-black text-white">{performanceMetrics.current.overall}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-green-400 mb-1">
                    <ArrowUp className="w-4 h-4" />
                    <span className="font-bold">+{performanceMetrics.current.improvement}%</span>
                  </div>
                  <div className="text-xs text-white/60">Improvement</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-300 font-bold mb-1">#{performanceMetrics.current.ranking}</div>
                  <div className="text-xs text-white/60">State Ranking</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Prediction */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="ultra-card bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-500/30"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">AI Prediction</h3>
              <Brain className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-purple-300 mb-2">
                {performanceMetrics.current.prediction}
              </div>
              <div className="text-sm text-white/70 mb-3">Next Game Score</div>
              <div className="flex items-center justify-center gap-1 text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-bold">97% Confidence</span>
              </div>
            </div>
          </motion.div>

          {/* Recruiting Interest */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="ultra-card bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-500/30"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Recruiting Heat</h3>
              <Flame className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-orange-300 mb-2">
                {recruitingMetrics.interest}%
              </div>
              <div className="text-sm text-white/70 mb-3">Interest Level</div>
              <div className="flex items-center justify-center gap-1 text-orange-400">
                <Eye className="w-4 h-4" />
                <span className="text-xs font-bold">{recruitingMetrics.viewsThisWeek} views this week</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Performance Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="ultra-card bg-white/5"
          >
            <h3 className="ultra-section-title text-xl sm:text-2xl mb-4 sm:mb-6 flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-blue-400" />
              Performance Breakdown
            </h3>
            
            <div className="space-y-6">
              {Object.entries(performanceMetrics.breakdown).map(([category, data]) => (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium capitalize">{category}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{data.score}%</span>
                      <div className={`flex items-center gap-1 ${
                        data.trend === 'up' ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {data.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                        <span className="text-xs font-bold">+{data.change}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${data.score}%` }}
                      transition={{ delay: 0.5, duration: 1 }}
                      className={`h-3 rounded-full ${
                        data.score >= 90 ? 'bg-green-500' :
                        data.score >= 80 ? 'bg-blue-500' :
                        data.score >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="ultra-card bg-white/5"
          >
            <h3 className="ultra-section-title text-xl sm:text-2xl mb-4 sm:mb-6 flex items-center gap-3">
              <Target className="w-6 h-6 text-green-400" />
              AI Predictions
            </h3>
            
            <div className="space-y-4">
              {predictionInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-4 bg-white/5 rounded-xl"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{insight.metric}</span>
                    <div className={`flex items-center gap-1 ${
                      insight.trend === 'up' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {insight.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-300">{insight.prediction}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      insight.confidence === 'High' ? 'bg-green-500/20 text-green-300' :
                      insight.confidence === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {insight.confidence} Confidence
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* College Interest & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="ultra-card bg-white/5"
          >
            <h3 className="ultra-section-title text-xl sm:text-2xl mb-4 sm:mb-6 flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-400" />
              College Interest
            </h3>
            
            <div className="space-y-4">
              {recruitingMetrics.collegeInterest.map((college, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-xl"
                >
                  <div>
                    <div className="font-bold">{college.school}</div>
                    <div className="text-sm text-white/70">Interest Level: {college.tier}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-yellow-400">{college.interest}%</div>
                    <div className="text-xs text-white/60">Match Score</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="ultra-card bg-white/5"
          >
            <h3 className="ultra-section-title text-xl sm:text-2xl mb-4 sm:mb-6 flex items-center gap-3">
              <Activity className="w-6 h-6 text-purple-400" />
              Recent Achievements
            </h3>
            
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-4 p-4 bg-white/5 rounded-xl"
                >
                  <div className={`p-2 rounded-full ${
                    achievement.type === 'competition' ? 'bg-yellow-500/20' :
                    achievement.type === 'performance' ? 'bg-blue-500/20' :
                    achievement.type === 'leadership' ? 'bg-purple-500/20' :
                    'bg-green-500/20'
                  }`}>
                    {achievement.type === 'competition' && <Trophy className="w-4 h-4 text-yellow-400" />}
                    {achievement.type === 'performance' && <TrendingUp className="w-4 h-4 text-blue-400" />}
                    {achievement.type === 'leadership' && <Crown className="w-4 h-4 text-purple-400" />}
                    {achievement.type === 'academic' && <Star className="w-4 h-4 text-green-400" />}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">{achievement.title}</div>
                    <div className="text-sm text-white/70">{achievement.date}</div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-bold ${
                    achievement.impact === 'High' ? 'bg-green-500/20 text-green-300' :
                    'bg-yellow-500/20 text-yellow-300'
                  }`}>
                    {achievement.impact}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Value Proposition */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="ultra-section-title text-center px-4">Transform Data Into Championship Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 p-6 sm:p-8 rounded-xl">
              <Brain className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-4">AI-Powered Insights</h3>
              <p className="text-white/70">Advanced machine learning analyzes performance patterns and predicts outcomes with 94% accuracy.</p>
            </div>
            <div className="bg-white/5 p-6 sm:p-8 rounded-xl">
              <Target className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-4">Performance Optimization</h3>
              <p className="text-white/70">Identify strengths, weaknesses, and improvement opportunities to maximize athletic potential.</p>
            </div>
            <div className="bg-white/5 p-6 sm:p-8 rounded-xl">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-bold mb-4">Recruiting Advantage</h3>
              <p className="text-white/70">Professional analytics that help student-athletes showcase their potential to college recruiters.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/dashboard"
            className="ultra-btn-primary inline-flex items-center gap-2 sm:gap-4 px-6 sm:px-8 lg:px-12 py-4 sm:py-6 text-base sm:text-lg lg:text-xl"
          >
            <Brain className="w-6 h-6 sm:w-7 sm:h-7" />
            Explore Full Analytics Suite
            <Rocket className="w-6 h-6 sm:w-7 sm:h-7" />
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}