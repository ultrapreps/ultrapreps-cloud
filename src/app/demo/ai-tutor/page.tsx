'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Brain, TrendingUp, Target, Clock, Star, Trophy,
  GraduationCap, Zap, Heart, CheckCircle, AlertTriangle,
  ArrowRight, Users, Eye, MessageCircle, Calendar, Settings,
  Award, Crown, Flame, Shield, Download, Share, Play, Pause,
  FileText, Calculator, Microscope, Globe, Music, Palette
} from 'lucide-react';
import Link from 'next/link';

export default function AITutorDemo() {
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [studyStreak, setStudyStreak] = useState(12);
  const [currentGPA, setCurrentGPA] = useState(3.87);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [aiTutorActive, setAiTutorActive] = useState(false);
  const [focusScore, setFocusScore] = useState(94);
  const [weeklyHours, setWeeklyHours] = useState(18);
  const [improvementRate, setImprovementRate] = useState(23);

  // Real-time learning simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (aiTutorActive) {
        setSessionProgress(prev => Math.min(100, prev + 2));
        setFocusScore(prev => Math.max(70, Math.min(100, prev + (Math.random() - 0.5) * 6)));
        
        if (Math.random() < 0.1) {
          setCurrentGPA(prev => Math.min(4.0, prev + 0.01));
          setImprovementRate(prev => Math.min(50, prev + 0.2));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [aiTutorActive]);

  const subjects = [
    {
      id: 1,
      name: "Advanced Mathematics",
      level: "AP Calculus BC",
      currentGrade: "A-",
      targetGrade: "A+",
      progress: 89,
      weakAreas: ["Integration by Parts", "Series Convergence", "Vector Calculus"],
      strengths: ["Derivatives", "Limits", "Applications"],
      nextSession: "Optimization Problems",
      icon: Calculator,
      color: "blue",
      recentScore: 94,
      improvement: "+12%",
      timeToTarget: "3 weeks",
      aiRecommendations: [
        "Focus on practice problems for integration techniques",
        "Review fundamental theorem applications",
        "Complete 3 optimization word problems daily"
      ]
    },
    {
      id: 2,
      name: "Chemistry",
      level: "AP Chemistry",
      currentGrade: "B+",
      targetGrade: "A",
      progress: 76,
      weakAreas: ["Thermodynamics", "Kinetics", "Equilibrium"],
      strengths: ["Atomic Structure", "Bonding", "Stoichiometry"],
      nextSession: "Chemical Equilibrium",
      icon: Microscope,
      color: "green",
      recentScore: 87,
      improvement: "+18%",
      timeToTarget: "5 weeks",
      aiRecommendations: [
        "Practice Le Chatelier's principle applications",
        "Review reaction rate calculations",
        "Focus on thermodynamic problem solving"
      ]
    },
    {
      id: 3,
      name: "English Literature",
      level: "AP English Lit",
      currentGrade: "A",
      targetGrade: "A+",
      progress: 92,
      weakAreas: ["Poetry Analysis", "Historical Context", "Thesis Development"],
      strengths: ["Character Analysis", "Theme Identification", "Writing Style"],
      nextSession: "Shakespearean Sonnets",
      icon: FileText,
      color: "purple",
      recentScore: 96,
      improvement: "+8%",
      timeToTarget: "2 weeks",
      aiRecommendations: [
        "Analyze 2 sonnets daily focusing on meter and rhyme",
        "Practice connecting historical context to themes",
        "Strengthen thesis statements with specific evidence"
      ]
    }
  ];

  const studyMetrics = [
    {
      label: "Study Streak",
      value: studyStreak,
      unit: "days",
      icon: Flame,
      color: "orange",
      trend: "+2 from last week"
    },
    {
      label: "Current GPA",
      value: currentGPA.toFixed(2),
      unit: "",
      icon: Trophy,
      color: "yellow",
      trend: "+0.15 this semester"
    },
    {
      label: "Weekly Study Hours",
      value: weeklyHours,
      unit: "hrs",
      icon: Clock,
      color: "blue",
      trend: "+3 from target"
    },
    {
      label: "Improvement Rate",
      value: improvementRate,
      unit: "%",
      icon: TrendingUp,
      color: "green",
      trend: "Above average"
    }
  ];

  const aiFeatures = [
    {
      name: "Personalized Learning Path",
      description: "AI adapts to your learning style and pace",
      icon: Target,
      status: "Active",
      impact: "40% faster learning"
    },
    {
      name: "Real-time Performance Analysis",
      description: "Instant feedback on strengths and weaknesses",
      icon: Brain,
      status: "Live",
      impact: "23% better retention"
    },
    {
      name: "Athletic Schedule Integration",
      description: "Balances academics with sports commitments",
      icon: Trophy,
      status: "Optimized",
      impact: "Perfect balance maintained"
    },
    {
      name: "College Prep Optimization",
      description: "Targets skills needed for college success",
      icon: GraduationCap,
      status: "Active",
      impact: "95% college readiness"
    }
  ];

  const learningActivities = [
    {
      subject: "Mathematics",
      activity: "Derivative practice problems",
      completed: 12,
      total: 15,
      difficulty: "Advanced",
      timeSpent: "45 min",
      accuracy: 89
    },
    {
      subject: "Chemistry",
      activity: "Equilibrium constant calculations",
      completed: 8,
      total: 10,
      difficulty: "Expert",
      timeSpent: "32 min",
      accuracy: 76
    },
    {
      subject: "English",
      activity: "Shakespearean sonnet analysis",
      completed: 3,
      total: 5,
      difficulty: "Intermediate",
      timeSpent: "28 min",
      accuracy: 94
    }
  ];

  const currentSubject = subjects[selectedSubject];

  const startTutoringSession = () => {
    setAiTutorActive(true);
    setSessionProgress(0);
  };

  const endTutoringSession = () => {
    setAiTutorActive(false);
    setSessionProgress(0);
    setStudyStreak(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Brain className="w-16 h-16 mx-auto mb-4 text-indigo-300" />
            <h1 className="text-5xl font-black text-white mb-4">
              AI ACADEMIC TUTOR
            </h1>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              Revolutionary AI tutoring system that adapts to your learning style, balances academics with athletics, 
              and optimizes your path to college success with personalized instruction and real-time feedback.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* AI Tutor Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-900/30 to-blue-900/30 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full animate-pulse ${aiTutorActive ? 'bg-green-500' : 'bg-gray-500'}`} />
              <span className="font-bold">
                {aiTutorActive ? 'AI TUTOR SESSION ACTIVE' : 'AI TUTOR STANDBY'}
              </span>
              {aiTutorActive && (
                <div className="px-3 py-1 bg-indigo-500 rounded-full text-sm font-bold">
                  LEARNING MODE
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => aiTutorActive ? endTutoringSession() : startTutoringSession()}
                className={`px-6 py-2 rounded-lg font-bold ${
                  aiTutorActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {aiTutorActive ? 'End Session' : 'Start Learning'}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {studyMetrics.map((metric, index) => {
              const MetricIcon = metric.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <MetricIcon className={`w-4 h-4 text-${metric.color}-400`} />
                    <div className={`text-2xl font-black text-${metric.color}-400`}>
                      {metric.value}{metric.unit}
                    </div>
                  </div>
                  <div className="text-xs text-white/70">{metric.label}</div>
                  <div className="text-xs text-green-400">{metric.trend}</div>
                </div>
              );
            })}
          </div>

          {/* Session Progress */}
          {aiTutorActive && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold">Learning Progress: {currentSubject.nextSession}</span>
                <span className="text-sm">{Math.round(sessionProgress)}% Complete</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${sessionProgress}%` }}
                />
              </div>
            </div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Learning Dashboard */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Subject Selection */}
            <div className="grid gap-4">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-indigo-400" />
                Active Subjects
              </h2>
              
              {subjects.map((subject, index) => {
                const SubjectIcon = subject.icon;
                return (
                  <motion.div
                    key={subject.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedSubject(index)}
                    className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedSubject === index
                        ? 'border-indigo-400 bg-indigo-500/10'
                        : 'border-white/20 bg-white/5 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg bg-${subject.color}-500/20`}>
                          <SubjectIcon className={`w-6 h-6 text-${subject.color}-400`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{subject.name}</h3>
                          <div className="text-sm text-white/70">{subject.level}</div>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm">Current: <span className="font-bold text-blue-400">{subject.currentGrade}</span></span>
                            <span className="text-sm">Target: <span className="font-bold text-green-400">{subject.targetGrade}</span></span>
                            <span className="text-sm">ETA: <span className="font-bold text-yellow-400">{subject.timeToTarget}</span></span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-green-400">{subject.recentScore}</div>
                        <div className="text-xs text-green-400">{subject.improvement}</div>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-bold">Overall Progress</span>
                        <span className="text-sm">{subject.progress}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r from-${subject.color}-500 to-${subject.color}-400 h-2 rounded-full`}
                          style={{ width: `${subject.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-bold mb-2 text-red-400">Areas to Improve:</h4>
                        <div className="space-y-1">
                          {subject.weakAreas.map((area, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <AlertTriangle className="w-3 h-3 text-red-400" />
                              <span className="text-white/70">{area}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold mb-2 text-green-400">Strengths:</h4>
                        <div className="space-y-1">
                          {subject.strengths.slice(0, 3).map((strength, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-3 h-3 text-green-400" />
                              <span className="text-white/70">{strength}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* AI Recommendations */}
                    <div className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30 mb-4">
                      <h4 className="font-bold mb-2 flex items-center gap-2">
                        <Brain className="w-4 h-4 text-purple-400" />
                        AI Recommendations
                      </h4>
                      <div className="space-y-2">
                        {subject.aiRecommendations.map((rec, idx) => (
                          <div key={idx} className="text-sm text-purple-200">
                            • {rec}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-indigo-400 font-bold">
                        Next Session: {subject.nextSession}
                      </div>
                      <button className="px-4 py-2 bg-indigo-500 rounded-lg font-bold hover:bg-indigo-600 transition-colors">
                        Start Learning
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Current Learning Activities */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-green-400" />
                Active Learning Sessions
              </h3>
              
              <div className="space-y-4">
                {learningActivities.map((activity, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/20">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="font-bold">{activity.subject}: {activity.activity}</div>
                        <div className="text-sm text-white/70 flex items-center gap-4">
                          <span>Difficulty: <span className={`font-bold ${
                            activity.difficulty === 'Expert' ? 'text-red-400' :
                            activity.difficulty === 'Advanced' ? 'text-yellow-400' :
                            'text-green-400'
                          }`}>{activity.difficulty}</span></span>
                          <span>Time: {activity.timeSpent}</span>
                          <span>Accuracy: <span className="font-bold text-blue-400">{activity.accuracy}%</span></span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{activity.completed}/{activity.total}</div>
                        <div className="text-xs text-white/70">Problems</div>
                      </div>
                    </div>
                    
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                        style={{ width: `${(activity.completed / activity.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Tutor Control Panel */}
          <div className="space-y-6">
            
            {/* AI Features */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-400" />
                AI Tutor Features
              </h3>
              
              <div className="space-y-4">
                {aiFeatures.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div key={index} className="p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <FeatureIcon className="w-4 h-4 text-indigo-400" />
                        <div className="font-bold text-sm">{feature.name}</div>
                      </div>
                      <p className="text-xs text-white/70 mb-2">{feature.description}</p>
                      <div className="flex items-center justify-between">
                        <div className={`px-2 py-1 rounded text-xs font-bold ${
                          feature.status === 'Active' || feature.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                          feature.status === 'Optimized' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {feature.status}
                        </div>
                        <div className="text-xs text-green-400 font-bold">{feature.impact}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Focus Tracking */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-400" />
                Focus Tracking
              </h3>
              
              <div className="text-center mb-4">
                <div className="text-4xl font-black text-blue-400 mb-2">{Math.round(focusScore)}%</div>
                <div className="text-sm text-white/70">Current Focus Level</div>
              </div>

              <div className="w-full bg-white/20 rounded-full h-3 mb-4">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full"
                  animate={{ width: `${focusScore}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Optimal Range:</span>
                  <span className="text-green-400">85-100%</span>
                </div>
                <div className="flex justify-between">
                  <span>Break Suggested:</span>
                  <span className="text-yellow-400">&lt;70%</span>
                </div>
                <div className="flex justify-between">
                  <span>Session Duration:</span>
                  <span className="text-blue-400">42 minutes</span>
                </div>
              </div>
            </div>

            {/* Athletic-Academic Balance */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Athletic Balance
              </h3>
              
              <div className="space-y-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Practice Schedule</span>
                    <Clock className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="text-sm text-white/70">Today: 3:30 PM - 6:00 PM</div>
                  <div className="text-xs text-yellow-400">Optimal study time: After dinner</div>
                </div>

                <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Recovery Time</span>
                    <Heart className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-sm text-white/70">Cognitive: 95% Ready</div>
                  <div className="text-xs text-green-400">Perfect for complex subjects</div>
                </div>

                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Game Week</span>
                    <Shield className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-sm text-white/70">Light study mode active</div>
                  <div className="text-xs text-blue-400">Review sessions prioritized</div>
                </div>
              </div>
            </div>

            {/* Study Schedule */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                Today's Schedule
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-2 bg-green-500/10 rounded">
                  <span className="text-sm">Math - Completed</span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between p-2 bg-yellow-500/10 rounded">
                  <span className="text-sm">Chemistry - In Progress</span>
                  <Clock className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="flex items-center justify-between p-2 bg-white/10 rounded">
                  <span className="text-sm">English - Pending</span>
                  <BookOpen className="w-4 h-4 text-white/50" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-indigo-500/20 rounded-lg text-center hover:bg-indigo-500/30 transition-colors">
                  <Brain className="w-5 h-5 mx-auto mb-2 text-indigo-400" />
                  <div className="text-xs font-bold">Ask AI</div>
                </button>
                <button className="p-3 bg-green-500/20 rounded-lg text-center hover:bg-green-500/30 transition-colors">
                  <Calendar className="w-5 h-5 mx-auto mb-2 text-green-400" />
                  <div className="text-xs font-bold">Schedule</div>
                </button>
                <button className="p-3 bg-yellow-500/20 rounded-lg text-center hover:bg-yellow-500/30 transition-colors">
                  <Trophy className="w-5 h-5 mx-auto mb-2 text-yellow-400" />
                  <div className="text-xs font-bold">Progress</div>
                </button>
                <button className="p-3 bg-purple-500/20 rounded-lg text-center hover:bg-purple-500/30 transition-colors">
                  <Settings className="w-5 h-5 mx-auto mb-2 text-purple-400" />
                  <div className="text-xs font-bold">Settings</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-black mb-8">Intelligent Academic Success System</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 p-8 rounded-xl">
              <Brain className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Personalized AI Tutoring</h3>
              <p className="text-white/70">Advanced AI adapts to your learning style, identifies weaknesses, and creates personalized study plans for maximum improvement.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Athletic Integration</h3>
              <p className="text-white/70">Seamlessly balances academic demands with athletic schedules, optimizing study times around training and recovery.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <GraduationCap className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">College Preparation</h3>
              <p className="text-white/70">Target skills and knowledge for college success while maintaining competitive athletic performance and scholarship eligibility.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-indigo-500/30"
          >
            <Brain className="w-7 h-7" />
            Start AI Tutoring
            <ArrowRight className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </div>
  );
}