'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Brain, Sun, Moon, Battery, Shield, Smile, Frown,
  TrendingUp, Target, Clock, Calendar, MessageCircle, Phone,
  ArrowRight, AlertTriangle, CheckCircle, Star, Award, Zap,
  Users, Eye, Headphones, BookOpen, Activity, Flower2, Waves
} from 'lucide-react';
import Link from 'next/link';

export default function MentalWellnessDemo() {
  const [moodScore, setMoodScore] = useState(78);
  const [stressLevel, setStressLevel] = useState(34);
  const [sleepQuality, setSleepQuality] = useState(85);
  const [energyLevel, setEnergyLevel] = useState(72);
  const [wellnessStreak, setWellnessStreak] = useState(14);
  const [meditationMinutes, setMeditationMinutes] = useState(234);
  const [currentState, setCurrentState] = useState('balanced');
  const [aiRecommendation, setAiRecommendation] = useState('');

  // Real-time wellness monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setMoodScore(prev => Math.max(50, Math.min(100, prev + (Math.random() - 0.5) * 8)));
      setStressLevel(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 6)));
      setSleepQuality(prev => Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 4)));
      setEnergyLevel(prev => Math.max(40, Math.min(100, prev + (Math.random() - 0.5) * 5)));
      
      if (Math.random() < 0.1) {
        setMeditationMinutes(prev => prev + Math.floor(Math.random() * 5));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // AI wellness recommendations
  useEffect(() => {
    const recommendations = [
      "Your stress levels are elevated. Try the 4-7-8 breathing technique.",
      "Great sleep quality! This is boosting your athletic performance.",
      "Consider a 10-minute meditation before your next practice.",
      "Your mood trends show excellent progress this week.",
      "Energy levels are optimal for high-intensity training today.",
      "Mindfulness session recommended before competition."
    ];

    const timer = setTimeout(() => {
      setAiRecommendation(recommendations[Math.floor(Math.random() * recommendations.length)]);
    }, 2000);

    return () => clearTimeout(timer);
  }, [moodScore, stressLevel, sleepQuality]);

  const wellnessModules = [
    {
      id: 1,
      title: "Competition Anxiety Management",
      category: "Performance Psychology",
      difficulty: "Essential",
      duration: "25 minutes",
      completed: true,
      sessions: 12,
      techniques: ["Progressive Muscle Relaxation", "Visualization", "Positive Self-Talk", "Breathing Techniques"],
      description: "Master pre-game nerves and perform at your peak when it matters most",
      icon: Target,
      color: "blue",
      successRate: 94,
      avgImprovement: "40% reduction in pre-game anxiety"
    },
    {
      id: 2,
      title: "Stress & Pressure Resilience",
      category: "Mental Toughness",
      difficulty: "Critical",
      duration: "30 minutes",
      completed: true,
      sessions: 8,
      techniques: ["Stress Inoculation", "Cognitive Reframing", "Pressure Training", "Recovery Protocols"],
      description: "Build unshakeable mental toughness for high-pressure situations",
      icon: Shield,
      color: "red",
      successRate: 91,
      avgImprovement: "60% better stress management"
    },
    {
      id: 3,
      title: "Sleep Optimization for Athletes",
      category: "Recovery & Performance",
      difficulty: "Foundation",
      duration: "20 minutes",
      completed: false,
      sessions: 0,
      techniques: ["Sleep Hygiene", "Recovery Tracking", "Circadian Rhythm Optimization", "Pre-Sleep Routines"],
      description: "Maximize recovery and performance through elite sleep strategies",
      icon: Moon,
      color: "purple",
      successRate: 96,
      avgImprovement: "45% better sleep quality"
    },
    {
      id: 4,
      title: "Mindfulness & Focus Training",
      category: "Attention & Awareness",
      difficulty: "Growth",
      duration: "35 minutes", 
      completed: false,
      sessions: 0,
      techniques: ["Meditation", "Present Moment Awareness", "Flow State Training", "Attention Control"],
      description: "Develop laser focus and present-moment awareness for peak performance",
      icon: Brain,
      color: "green",
      successRate: 89,
      avgImprovement: "35% improvement in focus duration"
    }
  ];

  const wellnessMetrics = [
    {
      label: "Mood Score",
      value: Math.round(moodScore),
      unit: "%",
      icon: moodScore >= 75 ? Smile : moodScore >= 50 ? Sun : Frown,
      color: moodScore >= 75 ? "green" : moodScore >= 50 ? "yellow" : "red",
      trend: moodScore >= 75 ? "Excellent" : moodScore >= 50 ? "Good" : "Needs attention",
      description: "Overall emotional wellbeing"
    },
    {
      label: "Stress Level",
      value: Math.round(stressLevel),
      unit: "%",
      icon: AlertTriangle,
      color: stressLevel <= 30 ? "green" : stressLevel <= 60 ? "yellow" : "red",
      trend: stressLevel <= 30 ? "Low (Optimal)" : stressLevel <= 60 ? "Moderate" : "High",
      description: "Current stress measurement"
    },
    {
      label: "Sleep Quality",
      value: Math.round(sleepQuality),
      unit: "%",
      icon: Moon,
      color: sleepQuality >= 80 ? "green" : sleepQuality >= 65 ? "yellow" : "red",
      trend: sleepQuality >= 80 ? "Excellent" : sleepQuality >= 65 ? "Good" : "Poor",
      description: "Recovery sleep effectiveness"
    },
    {
      label: "Energy Level",
      value: Math.round(energyLevel),
      unit: "%",
      icon: Battery,
      color: energyLevel >= 75 ? "green" : energyLevel >= 50 ? "yellow" : "red",
      trend: energyLevel >= 75 ? "High" : energyLevel >= 50 ? "Moderate" : "Low",
      description: "Physical and mental energy"
    }
  ];

  const mentalHealthTools = [
    {
      name: "Guided Meditation Library",
      description: "500+ meditations for athletes, from 5-60 minutes",
      icon: Headphones,
      users: 15420,
      usage: "23 min avg session",
      effectiveness: "87% stress reduction"
    },
    {
      name: "Mood & Stress Tracker",
      description: "AI-powered emotional intelligence monitoring",
      icon: Activity,
      users: 23847,
      usage: "3x daily check-ins",
      effectiveness: "94% accuracy prediction"
    },
    {
      name: "Sleep Recovery Optimizer",
      description: "Personalized sleep coaching and tracking",
      icon: Moon,
      users: 18934,
      usage: "8.2 hrs avg sleep",
      effectiveness: "40% recovery improvement"
    },
    {
      name: "Crisis Support Network",
      description: "24/7 professional mental health support",
      icon: Phone,
      users: 5672,
      usage: "< 2 min response time",
      effectiveness: "100% student safety record"
    }
  ];

  const supportPrograms = [
    {
      name: "Peer Support Groups",
      description: "Connect with other student-athletes facing similar challenges",
      participants: 2847,
      meetingFrequency: "Weekly",
      topics: ["Competition pressure", "Academic balance", "Identity beyond sports"],
      facilitator: "Licensed sports psychologist",
      icon: Users,
      color: "blue"
    },
    {
      name: "One-on-One Counseling",
      description: "Private sessions with specialized sports psychologists",
      participants: 1456,
      meetingFrequency: "Bi-weekly",
      topics: ["Performance anxiety", "Career transitions", "Personal relationships"],
      facilitator: "Board-certified professionals",
      icon: MessageCircle,
      color: "green"
    },
    {
      name: "Family Support Resources",
      description: "Help families understand and support mental health journey",
      participants: 3421,
      meetingFrequency: "Monthly",
      topics: ["Supporting your athlete", "Recognizing warning signs", "Building resilience"],
      facilitator: "Family therapy specialists",
      icon: Heart,
      color: "red"
    }
  ];

  const crisisResources = [
    { name: "24/7 Crisis Hotline", contact: "Call: 1-800-ATHLETE", responseTime: "Immediate" },
    { name: "Emergency Text Support", contact: "Text: HELP to 741741", responseTime: "< 5 minutes" },
    { name: "Campus Counseling Centers", contact: "In-app directory", responseTime: "Same day" },
    { name: "Psychiatric Emergency Services", contact: "911 or local emergency", responseTime: "Immediate" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 to-cyan-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Heart className="w-16 h-16 mx-auto mb-4 text-teal-300" />
            <h1 className="text-5xl font-black text-white mb-4">
              AI MENTAL HEALTH & WELLNESS
            </h1>
            <p className="text-xl text-teal-200 max-w-3xl mx-auto">
              Comprehensive mental health support system designed specifically for student-athletes. 
              AI-powered wellness monitoring, professional counseling, and peer support to ensure your mental game is as strong as your physical performance.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Wellness Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-teal-900/30 to-cyan-900/30 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-bold">WELLNESS MONITORING ACTIVE</span>
              <div className="px-3 py-1 bg-teal-500 rounded-full text-sm font-bold">
                {wellnessStreak} DAY STREAK
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-black text-teal-400">{meditationMinutes}</div>
                <div className="text-xs text-white/70">Meditation Minutes</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {wellnessMetrics.map((metric, index) => {
              const MetricIcon = metric.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MetricIcon className={`w-5 h-5 text-${metric.color}-400`} />
                    <div className={`text-2xl font-black text-${metric.color}-400`}>
                      {metric.value}{metric.unit}
                    </div>
                  </div>
                  <div className="text-xs text-white/70">{metric.label}</div>
                  <div className="text-xs text-teal-400">{metric.trend}</div>
                </div>
              );
            })}
          </div>

          {/* AI Recommendation */}
          {aiRecommendation && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-purple-500/10 p-4 rounded-lg border border-purple-500/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-purple-300">AI Wellness Recommendation:</span>
              </div>
              <div className="text-sm text-purple-200">{aiRecommendation}</div>
            </motion.div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Mental Wellness Modules */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Wellness Training Modules */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <Brain className="w-6 h-6 text-teal-400" />
                Mental Wellness Training
              </h2>
              
              {wellnessModules.map((module, index) => {
                const ModuleIcon = module.icon;
                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 rounded-xl border-2 border-white/20 bg-white/5 hover:border-white/40 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg bg-${module.color}-500/20`}>
                          <ModuleIcon className={`w-6 h-6 text-${module.color}-400`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{module.title}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-white/70">{module.category}</span>
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              module.difficulty === 'Essential' ? 'bg-red-500/20 text-red-400' :
                              module.difficulty === 'Critical' ? 'bg-orange-500/20 text-orange-400' :
                              module.difficulty === 'Foundation' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {module.difficulty}
                            </span>
                            <span className="text-sm text-white/70">{module.duration}</span>
                            {module.completed && (
                              <span className="flex items-center gap-1 text-xs text-green-400">
                                <CheckCircle className="w-3 h-3" />
                                Completed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-black text-teal-400">{module.sessions}</div>
                        <div className="text-xs text-white/70">Sessions</div>
                      </div>
                    </div>
                    
                    <p className="text-white/80 mb-4">{module.description}</p>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-bold mb-2">Techniques Covered:</h4>
                        <div className="space-y-1">
                          {module.techniques.map((technique, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <Star className="w-3 h-3 text-teal-400" />
                              <span className="text-white/70">{technique}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">Proven Results:</h4>
                        <div className="space-y-2">
                          <div className="text-sm text-green-400">{module.successRate}% success rate</div>
                          <div className="text-sm text-blue-400">{module.avgImprovement}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-teal-400 font-bold">
                        {module.completed ? 'Review Content' : 'Start Training'}
                      </div>
                      <button className="px-4 py-2 bg-teal-500 rounded-lg font-bold hover:bg-teal-600 transition-colors">
                        {module.completed ? 'Review' : 'Begin Module'}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Support Programs */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Professional Support Programs
              </h3>
              
              <div className="grid gap-4">
                {supportPrograms.map((program, index) => {
                  const ProgramIcon = program.icon;
                  return (
                    <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/20">
                      <div className="flex items-start gap-4">
                        <div className={`p-2 rounded-lg bg-${program.color}-500/20`}>
                          <ProgramIcon className={`w-5 h-5 text-${program.color}-400`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold">{program.name}</h4>
                            <span className="text-sm font-bold text-green-400">{program.participants} participants</span>
                          </div>
                          <p className="text-sm text-white/70 mb-3">{program.description}</p>
                          
                          <div className="grid md:grid-cols-2 gap-4 mb-3">
                            <div>
                              <div className="text-xs text-white/60 mb-1">Meeting Frequency:</div>
                              <div className="text-sm font-bold">{program.meetingFrequency}</div>
                            </div>
                            <div>
                              <div className="text-xs text-white/60 mb-1">Facilitator:</div>
                              <div className="text-sm font-bold">{program.facilitator}</div>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="text-xs text-white/60 mb-2">Common Topics:</div>
                            <div className="flex flex-wrap gap-2">
                              {program.topics.map((topic, idx) => (
                                <span key={idx} className="px-2 py-1 bg-teal-500/20 rounded text-xs text-teal-300">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>

                          <button className="w-full py-2 bg-teal-500/20 rounded-lg font-bold hover:bg-teal-500/30 transition-colors">
                            Join Program
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mental Health Tools */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Headphones className="w-5 h-5 text-purple-400" />
                Mental Health Tools & Resources
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {mentalHealthTools.map((tool, index) => {
                  const ToolIcon = tool.icon;
                  return (
                    <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/20">
                      <div className="flex items-center gap-3 mb-3">
                        <ToolIcon className="w-5 h-5 text-purple-400" />
                        <div>
                          <div className="font-bold">{tool.name}</div>
                          <div className="text-sm text-white/70">{tool.description}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <div className="text-white/60">Users:</div>
                          <div className="font-bold text-blue-400">{tool.users.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-white/60">Usage:</div>
                          <div className="font-bold text-green-400">{tool.usage}</div>
                        </div>
                        <div>
                          <div className="text-white/60">Results:</div>
                          <div className="font-bold text-yellow-400">{tool.effectiveness}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Crisis Resources */}
            <div className="bg-red-500/10 p-6 rounded-xl border border-red-500/30">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                Crisis Support Resources
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {crisisResources.map((resource, index) => (
                  <div key={index} className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                    <div className="font-bold text-red-300 mb-2">{resource.name}</div>
                    <div className="text-sm text-white/90 mb-1">{resource.contact}</div>
                    <div className="text-xs text-red-400">Response Time: {resource.responseTime}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-yellow-400" />
                  <span className="font-bold text-yellow-300">Remember:</span>
                </div>
                <div className="text-sm text-yellow-200">
                  Mental health struggles are common among student-athletes. Seeking help is a sign of strength, not weakness. 
                  You are not alone, and support is always available.
                </div>
              </div>
            </div>
          </div>

          {/* Wellness Dashboard */}
          <div className="space-y-6">
            
            {/* Daily Check-in */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-400" />
                Daily Check-in
              </h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-sm font-bold mb-2">How are you feeling today?</div>
                  <div className="grid grid-cols-5 gap-2">
                    {[Frown, Sun, Smile, Star, Heart].map((Icon, idx) => (
                      <button key={idx} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                        <Icon className="w-5 h-5 mx-auto text-teal-400" />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-bold mb-2">Current stress level:</div>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={stressLevel}
                    onChange={(e) => setStressLevel(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="text-xs text-center mt-1">{Math.round(stressLevel)}% stress</div>
                </div>

                <button className="w-full py-3 bg-teal-500 rounded-lg font-bold hover:bg-teal-600 transition-colors">
                  Submit Check-in
                </button>
              </div>
            </div>

            {/* Wellness Streak */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Wellness Streak
              </h3>
              
              <div className="text-center mb-4">
                <div className="text-4xl font-black text-yellow-400 mb-2">{wellnessStreak}</div>
                <div className="text-sm text-white/70">Days of consistent wellness</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                  <span className="text-sm">Daily Check-in</span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                  <span className="text-sm">Mindfulness Practice</span>
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <span className="text-sm">Sleep Goal (8 hrs)</span>
                  <Clock className="w-4 h-4 text-yellow-400" />
                </div>
              </div>
            </div>

            {/* Meditation Timer */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Flower2 className="w-5 h-5 text-green-400" />
                Quick Meditation
              </h3>
              
              <div className="text-center mb-4">
                <div className="w-24 h-24 mx-auto rounded-full border-4 border-teal-400 flex items-center justify-center mb-4">
                  <span className="text-2xl font-black">5:00</span>
                </div>
                <div className="text-sm text-white/70">Breathing Exercise</div>
              </div>

              <div className="space-y-3">
                <button className="w-full py-3 bg-green-500 rounded-lg font-bold hover:bg-green-600 transition-colors">
                  Start 5-Minute Session
                </button>
                <div className="grid grid-cols-3 gap-2">
                  <button className="py-2 bg-white/10 rounded text-xs">2 min</button>
                  <button className="py-2 bg-white/10 rounded text-xs">10 min</button>
                  <button className="py-2 bg-white/10 rounded text-xs">20 min</button>
                </div>
              </div>
            </div>

            {/* Professional Support */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                Professional Support
              </h3>
              
              <div className="space-y-3">
                <button className="w-full p-3 bg-blue-500/20 rounded-lg text-left hover:bg-blue-500/30 transition-colors">
                  <div className="font-bold">Schedule Counseling</div>
                  <div className="text-xs text-white/70">Available today</div>
                </button>
                <button className="w-full p-3 bg-green-500/20 rounded-lg text-left hover:bg-green-500/30 transition-colors">
                  <div className="font-bold">Join Support Group</div>
                  <div className="text-xs text-white/70">Next session: Thursday 7PM</div>
                </button>
                <button className="w-full p-3 bg-red-500/20 rounded-lg text-left hover:bg-red-500/30 transition-colors">
                  <div className="font-bold">Crisis Support</div>
                  <div className="text-xs text-white/70">24/7 immediate help</div>
                </button>
              </div>
            </div>

            {/* Resources Library */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-400" />
                Resource Library
              </h3>
              
              <div className="space-y-2">
                <div className="p-2 bg-white/5 rounded text-sm cursor-pointer hover:bg-white/10 transition-colors">
                  📱 Mental Health Apps for Athletes
                </div>
                <div className="p-2 bg-white/5 rounded text-sm cursor-pointer hover:bg-white/10 transition-colors">
                  📚 Self-Help Resources & Books
                </div>
                <div className="p-2 bg-white/5 rounded text-sm cursor-pointer hover:bg-white/10 transition-colors">
                  🎵 Relaxation & Sleep Playlists
                </div>
                <div className="p-2 bg-white/5 rounded text-sm cursor-pointer hover:bg-white/10 transition-colors">
                  🧘 Guided Meditation Library
                </div>
                <div className="p-2 bg-white/5 rounded text-sm cursor-pointer hover:bg-white/10 transition-colors">
                  💬 Anonymous Support Forums
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-black mb-8">Your Mental Health Matters</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 p-8 rounded-xl">
              <Brain className="w-12 h-12 text-teal-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">AI-Powered Monitoring</h3>
              <p className="text-white/70">Advanced AI tracks your mental wellness patterns and provides personalized recommendations to maintain peak mental performance.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Professional Support</h3>
              <p className="text-white/70">Access to licensed sports psychologists, counselors, and peer support groups who understand the unique challenges of student-athletes.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Safe & Confidential</h3>
              <p className="text-white/70">Complete privacy protection with crisis intervention protocols and family-safe environments for mental health support.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-teal-500/30"
          >
            <Heart className="w-7 h-7" />
            Start Your Wellness Journey
            <ArrowRight className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </div>
  );
}