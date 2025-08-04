'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, Brain, TrendingUp, Target, CheckCircle, Clock,
  Star, Award, DollarSign, FileText, Send, Calendar, Search,
  ArrowRight, Crown, Trophy, Sparkles, Eye, Users, Shield,
  BookOpen, AlertCircle, ThumbsUp, Download, Share, Settings,
  Zap, Heart, Flame, MapPin, Phone, Mail, Globe, Camera
} from 'lucide-react';
import Link from 'next/link';

export default function ScholarshipAdvisorDemo() {
  const [selectedScholarship, setSelectedScholarship] = useState(0);
  const [applicationProgress, setApplicationProgress] = useState(73);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [profileScore, setProfileScore] = useState(94.2);
  const [essayStatus, setEssayStatus] = useState('reviewing');
  const [matchingScholarships, setMatchingScholarships] = useState(247);
  const [deadlineAlerts, setDeadlineAlerts] = useState(12);
  const [applicationsSent, setApplicationsSent] = useState(18);

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMatchingScholarships(prev => prev + Math.floor(Math.random() * 3));
      if (Math.random() < 0.2) {
        const newRecommendation = aiRecommendations.length < 5 ? [
          "Your GPA qualifies for 23 additional academic scholarships",
          "Leadership experience opens 17 new merit-based opportunities", 
          "Athletic performance matches 31 sport-specific scholarships",
          "Community service hours unlock 14 service scholarships",
          "STEM focus creates eligibility for 19 technical scholarships"
        ][aiRecommendations.length] : null;
        
        if (newRecommendation) {
          setAiRecommendations(prev => [...prev, newRecommendation]);
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [aiRecommendations.length]);

  const scholarships = [
    {
      id: 1,
      name: "Stanford Academic Excellence",
      amount: "$75,000",
      deadline: "Feb 15, 2025",
      match: 98,
      status: "Perfect Match",
      requirements: ["3.8+ GPA", "Leadership Experience", "Athletic Achievement"],
      description: "Full tuition scholarship for outstanding student-athletes",
      university: "Stanford University",
      type: "Academic Merit",
      applicants: 2847,
      awarded: 25,
      aiInsights: [
        "Your profile exceeds 94% of previous winners",
        "Leadership experience gives you significant advantage",
        "Essay topic should focus on community impact"
      ]
    },
    {
      id: 2,
      name: "Nike Athletic Leadership",
      amount: "$50,000",
      deadline: "Mar 1, 2025", 
      match: 94,
      status: "Excellent Match",
      requirements: ["Varsity Sports", "Community Leadership", "3.5+ GPA"],
      description: "Supporting future athletic leaders and role models",
      university: "Multiple Universities",
      type: "Athletic Merit",
      applicants: 4231,
      awarded: 100,
      aiInsights: [
        "Your athletic achievements align perfectly",
        "Community service hours exceed requirements",
        "Video essay component recommended"
      ]
    },
    {
      id: 3,
      name: "STEM Innovation Award",
      amount: "$40,000",
      deadline: "Jan 30, 2025",
      match: 87,
      status: "Strong Match", 
      requirements: ["STEM Major Intent", "Research Experience", "3.7+ GPA"],
      description: "Encouraging next generation of STEM leaders",
      university: "MIT",
      type: "Academic Specialty",
      applicants: 1923,
      awarded: 50,
      aiInsights: [
        "Your math scores are in top 5%",
        "Science fair participation is valuable",
        "Consider highlighting technology projects"
      ]
    }
  ];

  const applicationTasks = [
    { task: "Personal Statement", status: "completed", ai_help: "AI-enhanced draft ready" },
    { task: "Letters of Recommendation", status: "pending", ai_help: "Automated follow-up sent" },
    { task: "Transcript Submission", status: "completed", ai_help: "Verified and optimized" },
    { task: "Financial Aid Forms", status: "in_progress", ai_help: "Auto-filled with verification" },
    { task: "Essay Responses", status: "reviewing", ai_help: "AI grammar and impact check" },
    { task: "Interview Preparation", status: "scheduled", ai_help: "AI practice sessions available" }
  ];

  const aiCapabilities = [
    {
      name: "Smart Matching",
      description: "AI analyzes 15,000+ scholarships daily to find perfect matches",
      icon: Target,
      metrics: "247 current matches • 98% accuracy rate"
    },
    {
      name: "Essay Enhancement", 
      description: "Advanced AI writing assistance with impact optimization",
      icon: FileText,
      metrics: "94% acceptance rate improvement • Real-time feedback"
    },
    {
      name: "Deadline Management",
      description: "Automated tracking and intelligent reminders",
      icon: Clock,
      metrics: "Zero missed deadlines • Smart priority scheduling"
    },
    {
      name: "Application Automation",
      description: "Auto-fill forms and streamlined submission process",
      icon: Zap,
      metrics: "75% time savings • Error-free submissions"
    }
  ];

  const liveStats = {
    totalValue: "$2.4M",
    averageAward: "$47,300",
    successRate: "89.3%",
    timeToAward: "6.2 weeks",
    profileStrength: "Exceptional",
    competitiveEdge: "Top 3%"
  };

  const currentScholarship = scholarships[selectedScholarship];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <GraduationCap className="w-16 h-16 mx-auto mb-4 text-emerald-300" />
            <h1 className="text-5xl font-black text-white mb-4">
              AI SCHOLARSHIP ADVISOR
            </h1>
            <p className="text-xl text-emerald-200 max-w-3xl mx-auto">
              Revolutionary AI-powered scholarship discovery, application assistance, and success optimization. 
              Find and win scholarships worth millions with intelligent automation and personalized guidance.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Live Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-bold">AI SCHOLARSHIP ADVISOR ACTIVE</span>
              <div className="px-3 py-1 bg-emerald-500 rounded-full text-sm font-bold">
                LIVE ANALYSIS
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-2xl font-black text-emerald-400">{profileScore}%</div>
              <span className="text-sm">Profile Strength</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-400">{matchingScholarships}</div>
              <div className="text-xs text-white/70">Active Matches</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-400">{liveStats.totalValue}</div>
              <div className="text-xs text-white/70">Total Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-blue-400">{applicationsSent}</div>
              <div className="text-xs text-white/70">Applications Sent</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-yellow-400">{liveStats.successRate}</div>
              <div className="text-xs text-white/70">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-purple-400">{deadlineAlerts}</div>
              <div className="text-xs text-white/70">Deadline Alerts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-orange-400">{Math.round(applicationProgress)}%</div>
              <div className="text-xs text-white/70">Progress</div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Scholarship Opportunities */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Featured Scholarships */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <Target className="w-6 h-6 text-emerald-400" />
                AI-Matched Scholarship Opportunities
              </h2>
              
              {scholarships.map((scholarship, index) => (
                <motion.div
                  key={scholarship.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedScholarship(index)}
                  className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedScholarship === index
                      ? 'border-emerald-400 bg-emerald-500/10'
                      : 'border-white/20 bg-white/5 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{scholarship.name}</h3>
                        <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                          scholarship.match >= 95 ? 'bg-green-500/20 text-green-400' :
                          scholarship.match >= 90 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {scholarship.match}% Match
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/70">
                        <span>{scholarship.university}</span>
                        <span>•</span>
                        <span>{scholarship.type}</span>
                        <span>•</span>
                        <span className="text-red-400">Due: {scholarship.deadline}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-emerald-400">{scholarship.amount}</div>
                      <div className="text-xs text-white/70">Annual Award</div>
                    </div>
                  </div>
                  
                  <p className="text-white/80 mb-4">{scholarship.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold mb-2">Requirements:</h4>
                      <div className="space-y-1">
                        {scholarship.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            <span className="text-white/70">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">AI Insights:</h4>
                      <div className="space-y-1">
                        {scholarship.aiInsights.slice(0, 2).map((insight, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm">
                            <Brain className="w-3 h-3 text-purple-400 mt-0.5" />
                            <span className="text-white/70">{insight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-white/50">{scholarship.applicants} applicants</span>
                      <span className="text-white/50">•</span>
                      <span className="text-green-400">{scholarship.awarded} awards</span>
                    </div>
                    <button className="px-4 py-2 bg-emerald-500 rounded-lg font-bold hover:bg-emerald-600 transition-colors">
                      Apply with AI
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Application Progress */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                AI-Assisted Application Progress
              </h3>
              
              <div className="space-y-4">
                {applicationTasks.map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${
                        task.status === 'completed' ? 'bg-green-500' :
                        task.status === 'in_progress' ? 'bg-yellow-500 animate-pulse' :
                        task.status === 'reviewing' ? 'bg-blue-500 animate-pulse' :
                        'bg-gray-500'
                      }`} />
                      <div>
                        <div className="font-bold">{task.task}</div>
                        <div className="text-xs text-purple-400">{task.ai_help}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.status === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : task.status === 'in_progress' ? (
                        <Clock className="w-5 h-5 text-yellow-400" />
                      ) : task.status === 'reviewing' ? (
                        <Eye className="w-5 h-5 text-blue-400" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold">Overall Progress</span>
                  <span className="font-bold">{Math.round(applicationProgress)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3">
                  <motion.div
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${applicationProgress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI Tools & Insights */}
          <div className="space-y-6">
            
            {/* Live AI Recommendations */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                Live AI Insights
              </h3>
              
              <div className="space-y-3">
                {aiRecommendations.length > 0 ? (
                  aiRecommendations.map((recommendation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-3 p-3 bg-purple-500/10 rounded-lg border-l-4 border-purple-400"
                    >
                      <Sparkles className="w-4 h-4 text-purple-400 mt-0.5" />
                      <p className="text-sm text-white/90">{recommendation}</p>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-white/50">
                    <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>AI analyzing your profile for new opportunities...</p>
                  </div>
                )}
              </div>
            </div>

            {/* AI Capabilities */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">AI Advisor Capabilities</h3>
              
              <div className="space-y-4">
                {aiCapabilities.map((capability, index) => {
                  const CapabilityIcon = capability.icon;
                  return (
                    <div key={index} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <CapabilityIcon className="w-5 h-5 text-emerald-400" />
                        <div className="font-bold">{capability.name}</div>
                      </div>
                      <p className="text-sm text-white/70 mb-2">{capability.description}</p>
                      <div className="text-xs text-emerald-400 font-bold">{capability.metrics}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Deadline Tracker */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-red-400" />
                Upcoming Deadlines
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                  <div>
                    <div className="font-bold">STEM Innovation Award</div>
                    <div className="text-sm text-white/70">MIT • $40,000</div>
                  </div>
                  <div className="text-right">
                    <div className="text-red-400 font-bold">3 days</div>
                    <div className="text-xs">Jan 30</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <div>
                    <div className="font-bold">Stanford Academic Excellence</div>
                    <div className="text-sm text-white/70">Stanford • $75,000</div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-bold">18 days</div>
                    <div className="text-xs">Feb 15</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                  <div>
                    <div className="font-bold">Nike Athletic Leadership</div>
                    <div className="text-sm text-white/70">Multiple • $50,000</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400 font-bold">32 days</div>
                    <div className="text-xs">Mar 1</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Success Metrics */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Success Metrics
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Profile Strength</span>
                    <Crown className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="text-2xl font-black text-yellow-400">{liveStats.profileStrength}</div>
                  <div className="text-xs text-white/70">Top 3% of applicants</div>
                </div>

                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Time to Award</span>
                    <Clock className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-2xl font-black text-green-400">{liveStats.timeToAward}</div>
                  <div className="text-xs text-white/70">Average processing time</div>
                </div>

                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Average Award</span>
                    <DollarSign className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-black text-blue-400">{liveStats.averageAward}</div>
                  <div className="text-xs text-white/70">Per scholarship won</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-emerald-500/20 rounded-lg text-center hover:bg-emerald-500/30 transition-colors">
                  <FileText className="w-5 h-5 mx-auto mb-2 text-emerald-400" />
                  <div className="text-xs font-bold">Essay AI</div>
                </button>
                <button className="p-3 bg-blue-500/20 rounded-lg text-center hover:bg-blue-500/30 transition-colors">
                  <Search className="w-5 h-5 mx-auto mb-2 text-blue-400" />
                  <div className="text-xs font-bold">Find More</div>
                </button>
                <button className="p-3 bg-purple-500/20 rounded-lg text-center hover:bg-purple-500/30 transition-colors">
                  <Calendar className="w-5 h-5 mx-auto mb-2 text-purple-400" />
                  <div className="text-xs font-bold">Schedule</div>
                </button>
                <button className="p-3 bg-yellow-500/20 rounded-lg text-center hover:bg-yellow-500/30 transition-colors">
                  <Settings className="w-5 h-5 mx-auto mb-2 text-yellow-400" />
                  <div className="text-xs font-bold">Optimize</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-black mb-8">Revolutionary Scholarship Success System</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 p-8 rounded-xl">
              <Brain className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">AI-Powered Matching</h3>
              <p className="text-white/70">Advanced algorithms analyze 15,000+ scholarships daily, finding perfect matches with 98% accuracy and zero manual searching.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <FileText className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Application Automation</h3>
              <p className="text-white/70">AI-assisted essay writing, form auto-fill, and submission management reduces application time by 75% while improving quality.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Proven Results</h3>
              <p className="text-white/70">89.3% success rate with average awards of $47,300. Students using AI Advisor win 4x more scholarships than traditional methods.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-emerald-500/30"
          >
            <GraduationCap className="w-7 h-7" />
            Start AI Scholarship Hunt
            <ArrowRight className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </div>
  );
}