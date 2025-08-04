'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Mic, MicOff, Play, Pause, BarChart3, Target, 
  TrendingUp, Trophy, Star, Zap, Clock, User, Video,
  ArrowRight, CheckCircle, AlertTriangle, Award, Crown,
  Activity, Heart, Flame, Eye, Camera, Sparkles,
  Volume2, VolumeX, MessageCircle, Phone, Calendar,
  FileText, Download, Share, Settings, Shield
} from 'lucide-react';
import Link from 'next/link';

export default function AICoachDemo() {
  const [isListening, setIsListening] = useState(false);
  const [currentDrill, setCurrentDrill] = useState(0);
  const [sessionActive, setSessionActive] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [realTimeMetrics, setRealTimeMetrics] = useState({
    heartRate: 145,
    speed: 12.5,
    accuracy: 87,
    endurance: 72,
    focus: 94
  });
  const [aiInsights, setAiInsights] = useState([]);
  const [sessionProgress, setSessionProgress] = useState(0);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (sessionActive) {
        setRealTimeMetrics(prev => ({
          heartRate: prev.heartRate + (Math.random() - 0.5) * 10,
          speed: Math.max(0, prev.speed + (Math.random() - 0.5) * 2),
          accuracy: Math.max(0, Math.min(100, prev.accuracy + (Math.random() - 0.5) * 8)),
          endurance: Math.max(0, Math.min(100, prev.endurance + (Math.random() - 0.5) * 5)),
          focus: Math.max(0, Math.min(100, prev.focus + (Math.random() - 0.5) * 6))
        }));
        setSessionProgress(prev => Math.min(100, prev + 0.5));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sessionActive]);

  const trainingDrills = [
    {
      id: 1,
      name: "Sprint Acceleration",
      duration: "3 minutes",
      difficulty: "Intermediate",
      category: "Speed",
      description: "AI-guided sprint intervals with real-time form correction",
      metrics: ["Speed", "Acceleration", "Form", "Recovery"],
      instructions: [
        "Start in athletic position",
        "Listen for AI cues",
        "Maintain proper form",
        "Follow pace guidance"
      ],
      aiFeatures: [
        "Real-time form analysis",
        "Pace optimization",
        "Fatigue monitoring",
        "Performance prediction"
      ]
    },
    {
      id: 2,
      name: "Agility Ladder Pro",
      duration: "5 minutes",
      difficulty: "Advanced",
      category: "Agility",
      description: "Dynamic footwork patterns with AI pattern recognition",
      metrics: ["Footwork", "Coordination", "Reaction Time", "Precision"],
      instructions: [
        "Follow visual cues",
        "Maintain center of gravity",
        "Quick, light steps",
        "Stay focused on patterns"
      ],
      aiFeatures: [
        "Movement pattern AI",
        "Coordination scoring",
        "Mistake identification",
        "Progressive difficulty"
      ]
    },
    {
      id: 3,
      name: "Mental Focus Training",
      duration: "4 minutes",
      difficulty: "Expert",
      category: "Mental",
      description: "Cognitive load training with distraction resistance",
      metrics: ["Focus", "Decision Speed", "Accuracy", "Stress Management"],
      instructions: [
        "Follow audio instructions",
        "Ignore distractions",
        "Make quick decisions",
        "Stay mentally sharp"
      ],
      aiFeatures: [
        "Cognitive load analysis",
        "Attention tracking",
        "Stress level monitoring",
        "Mental fatigue detection"
      ]
    }
  ];

  const aiCoachPersonalities = [
    {
      id: 'motivator',
      name: 'Coach Thunder',
      personality: 'High-energy motivator',
      style: 'Intense, encouraging, championship-focused',
      avatar: '💪',
      voice: 'Deep, powerful, energetic'
    },
    {
      id: 'technical',
      name: 'Coach Precision',
      personality: 'Technical perfectionist',
      style: 'Detailed, analytical, improvement-focused',
      avatar: '🎯',
      voice: 'Clear, measured, instructional'
    },
    {
      id: 'zen',
      name: 'Coach Flow',
      personality: 'Mindful performance coach',
      style: 'Calm, focused, mental strength oriented',
      avatar: '🧘',
      voice: 'Soothing, centered, wise'
    }
  ];

  const liveInsights = [
    "Your acceleration improved 15% since last session",
    "Heart rate recovery is excellent - maintaining endurance",
    "Slight form deviation detected - adjust left shoulder",
    "Mental focus peak detected - perfect time for skill work",
    "Fatigue markers low - you can push harder",
    "Coordination patterns show 12% improvement"
  ];

  const currentDrillData = trainingDrills[currentDrill];

  const startSession = () => {
    setSessionActive(true);
    setSessionProgress(0);
    setAiInsights([]);
    // Simulate AI insights during session
    setTimeout(() => {
      setAiInsights(prev => [...prev, liveInsights[Math.floor(Math.random() * liveInsights.length)]]);
    }, 5000);
  };

  const stopSession = () => {
    setSessionActive(false);
    setSessionProgress(0);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Brain className="w-16 h-16 mx-auto mb-4 text-indigo-300" />
            <h1 className="text-5xl font-black text-white mb-4">
              AI VIRTUAL COACHING ASSISTANT
            </h1>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              Revolutionary AI coach that provides real-time feedback, personalized training plans, 
              and expert guidance using advanced computer vision and machine learning.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Live Session Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full animate-pulse ${sessionActive ? 'bg-green-500' : 'bg-gray-500'}`} />
              <span className="font-bold">
                {sessionActive ? 'LIVE TRAINING SESSION' : 'TRAINING STANDBY'}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`p-2 rounded-full ${voiceEnabled ? 'bg-green-500' : 'bg-gray-600'}`}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsListening(!isListening)}
                className={`p-2 rounded-full ${isListening ? 'bg-red-500 animate-pulse' : 'bg-gray-600'}`}
              >
                {isListening ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          {/* Real-time Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-3xl font-black text-red-400">
                {Math.round(realTimeMetrics.heartRate)}
              </div>
              <div className="text-sm text-white/70">Heart Rate</div>
              <div className="text-xs text-red-400">BPM</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-blue-400">
                {realTimeMetrics.speed.toFixed(1)}
              </div>
              <div className="text-sm text-white/70">Speed</div>
              <div className="text-xs text-blue-400">mph</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-400">
                {Math.round(realTimeMetrics.accuracy)}%
              </div>
              <div className="text-sm text-white/70">Accuracy</div>
              <div className="text-xs text-green-400">precision</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-yellow-400">
                {Math.round(realTimeMetrics.endurance)}%
              </div>
              <div className="text-sm text-white/70">Endurance</div>
              <div className="text-xs text-yellow-400">remaining</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-purple-400">
                {Math.round(realTimeMetrics.focus)}%
              </div>
              <div className="text-sm text-white/70">Focus</div>
              <div className="text-xs text-purple-400">mental</div>
            </div>
          </div>

          {/* Session Progress */}
          {sessionActive && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold">Session Progress</span>
                <span className="text-sm">{Math.round(sessionProgress)}% Complete</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${sessionProgress}%` }}
                />
              </div>
            </div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Training Drills */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <Target className="w-6 h-6 text-indigo-400" />
              AI-Powered Training Drills
            </h2>
            
            <div className="grid gap-4">
              {trainingDrills.map((drill, index) => (
                <motion.div
                  key={drill.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setCurrentDrill(index)}
                  className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                    currentDrill === index
                      ? 'border-indigo-400 bg-indigo-500/10'
                      : 'border-white/20 bg-white/5 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{drill.name}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-bold">
                          {drill.category}
                        </span>
                        <span className="text-white/70">{drill.duration}</span>
                        <span className={`text-sm ${
                          drill.difficulty === 'Expert' ? 'text-red-400' :
                          drill.difficulty === 'Advanced' ? 'text-yellow-400' :
                          'text-green-400'
                        }`}>
                          {drill.difficulty}
                        </span>
                      </div>
                    </div>
                    {currentDrill === index && (
                      <Crown className="w-6 h-6 text-indigo-400" />
                    )}
                  </div>
                  
                  <p className="text-white/80 mb-4">{drill.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-bold mb-2">AI Features:</h4>
                      <div className="space-y-1">
                        {drill.aiFeatures.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <Brain className="w-3 h-3 text-indigo-400" />
                            <span className="text-white/70">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Tracked Metrics:</h4>
                      <div className="flex flex-wrap gap-2">
                        {drill.metrics.map((metric, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white/10 rounded text-xs">
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Session Controls */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Session Controls</h3>
              
              <div className="flex items-center gap-4 mb-6">
                {!sessionActive ? (
                  <button
                    onClick={startSession}
                    className="flex items-center gap-3 px-8 py-4 bg-green-500 rounded-xl font-bold hover:bg-green-600 transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    Start AI Coaching Session
                  </button>
                ) : (
                  <button
                    onClick={stopSession}
                    className="flex items-center gap-3 px-8 py-4 bg-red-500 rounded-xl font-bold hover:bg-red-600 transition-colors"
                  >
                    <Pause className="w-5 h-5" />
                    End Session
                  </button>
                )}
                
                <button className="flex items-center gap-2 px-6 py-4 bg-indigo-500/20 rounded-xl font-bold hover:bg-indigo-500/30 transition-colors">
                  <Video className="w-5 h-5" />
                  Video Analysis
                </button>
                
                <button className="flex items-center gap-2 px-6 py-4 bg-purple-500/20 rounded-xl font-bold hover:bg-purple-500/30 transition-colors">
                  <Camera className="w-5 h-5" />
                  Form Check
                </button>
              </div>

              {/* Current Drill Instructions */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-3">Instructions:</h4>
                  <div className="space-y-2">
                    {currentDrillData.instructions.map((instruction, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="text-sm">{instruction}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold mb-3">AI Coach Settings:</h4>
                  <div className="space-y-3">
                    {aiCoachPersonalities.map((coach) => (
                      <div key={coach.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                        <span className="text-2xl">{coach.avatar}</span>
                        <div>
                          <div className="font-bold">{coach.name}</div>
                          <div className="text-xs text-white/70">{coach.personality}</div>
                        </div>
                        <input type="radio" name="coach" className="ml-auto" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Insights & Live Feedback */}
          <div className="space-y-6">
            
            {/* Live AI Insights */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-400" />
                Live AI Insights
              </h3>
              
              <div className="space-y-3">
                {sessionActive && aiInsights.length > 0 ? (
                  aiInsights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-3 p-3 bg-indigo-500/10 rounded-lg border-l-4 border-indigo-400"
                    >
                      <Sparkles className="w-4 h-4 text-indigo-400 mt-0.5" />
                      <p className="text-sm text-white/90">{insight}</p>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8 text-white/50">
                    <Brain className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Start a session to see live AI insights</p>
                  </div>
                )}
              </div>
            </div>

            {/* Performance Analytics */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                Performance Analytics
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Weekly Improvement</span>
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-2xl font-black text-green-400">+18.5%</div>
                  <div className="text-xs text-white/70">Across all metrics</div>
                </div>

                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Training Streak</span>
                    <Flame className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-black text-blue-400">12 Days</div>
                  <div className="text-xs text-white/70">Personal best!</div>
                </div>

                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">AI Accuracy</span>
                    <Target className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-black text-purple-400">96.8%</div>
                  <div className="text-xs text-white/70">Prediction success</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-green-500/20 rounded-lg text-center hover:bg-green-500/30 transition-colors">
                  <Calendar className="w-5 h-5 mx-auto mb-2 text-green-400" />
                  <div className="text-sm font-bold">Schedule</div>
                </button>
                <button className="p-3 bg-blue-500/20 rounded-lg text-center hover:bg-blue-500/30 transition-colors">
                  <FileText className="w-5 h-5 mx-auto mb-2 text-blue-400" />
                  <div className="text-sm font-bold">Reports</div>
                </button>
                <button className="p-3 bg-purple-500/20 rounded-lg text-center hover:bg-purple-500/30 transition-colors">
                  <Share className="w-5 h-5 mx-auto mb-2 text-purple-400" />
                  <div className="text-sm font-bold">Share</div>
                </button>
                <button className="p-3 bg-yellow-500/20 rounded-lg text-center hover:bg-yellow-500/30 transition-colors">
                  <Settings className="w-5 h-5 mx-auto mb-2 text-yellow-400" />
                  <div className="text-sm font-bold">Settings</div>
                </button>
              </div>
            </div>

            {/* Voice Commands */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Mic className="w-5 h-5 text-green-400" />
                Voice Commands
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-3 h-3 text-green-400" />
                  <span>"Start training session"</span>
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 className="w-3 h-3 text-blue-400" />
                  <span>"Check my form"</span>
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 className="w-3 h-3 text-purple-400" />
                  <span>"Show performance stats"</span>
                </div>
                <div className="flex items-center gap-2">
                  <Volume2 className="w-3 h-3 text-yellow-400" />
                  <span>"Adjust difficulty"</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-black mb-8">Revolutionary AI Coaching Technology</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 p-8 rounded-xl">
              <Brain className="w-12 h-12 text-indigo-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Advanced AI Analysis</h3>
              <p className="text-white/70">Computer vision and machine learning provide real-time form analysis and performance optimization.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Target className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Personalized Training</h3>
              <p className="text-white/70">AI adapts training plans in real-time based on performance, fatigue, and individual progress patterns.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Championship Results</h3>
              <p className="text-white/70">Athletes using AI coaching show 60% faster skill development and 40% better performance consistency.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-indigo-500/30"
          >
            <Brain className="w-7 h-7" />
            Start AI Coaching Session
            <ArrowRight className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </div>
  );
}