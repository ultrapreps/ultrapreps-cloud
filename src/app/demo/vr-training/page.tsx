'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Headphones, Users, Trophy, Zap, Eye, Target, Crown, Star,
  Play, Pause, RotateCcw, Volume2, VolumeX, Maximize, Settings,
  ArrowRight, Brain, Clock, Award, Flame, Heart, Camera,
  Gamepad2, Smartphone, Monitor, Download, Share, Calendar,
  MessageCircle, Phone, Video, BookOpen, TrendingUp, Shield
} from 'lucide-react';
import Link from 'next/link';

export default function VRTrainingDemo() {
  const [selectedCamp, setSelectedCamp] = useState(0);
  const [vrSessionActive, setVrSessionActive] = useState(false);
  const [currentCoach, setCurrentCoach] = useState(0);
  const [skillLevel, setSkillLevel] = useState(87);
  const [sessionProgress, setSessionProgress] = useState(0);
  const [participantCount, setParticipantCount] = useState(342);
  const [heartRate, setHeartRate] = useState(156);
  const [vrImmersion, setVrImmersion] = useState(94);

  // Real-time session simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (vrSessionActive) {
        setSessionProgress(prev => Math.min(100, prev + 1));
        setHeartRate(prev => prev + (Math.random() - 0.5) * 8);
        setSkillLevel(prev => Math.min(100, prev + 0.1));
        setParticipantCount(prev => prev + Math.floor(Math.random() * 3));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [vrSessionActive]);

  const trainingCamps = [
    {
      id: 1,
      name: "Elite Quarterback Academy",
      coach: "Coach Tom Brady",
      specialty: "QB Development",
      level: "Professional",
      duration: "8 weeks",
      participants: 24,
      rating: 4.9,
      description: "Master elite quarterback techniques with 7x Super Bowl Champion coaching in immersive VR",
      skills: ["Pocket Presence", "Read Defense", "Accuracy", "Leadership", "Game Management"],
      vrFeatures: [
        "Real-time defensive reads",
        "Pressure situation training", 
        "Championship game simulations",
        "Elite coach interaction"
      ],
      schedule: "Mon/Wed/Fri 6PM ET",
      cost: "$2,500",
      testimonial: "Improved my completion percentage by 23% in just 4 weeks!"
    },
    {
      id: 2, 
      name: "Speed & Agility Masters",
      coach: "Coach Usain Bolt",
      specialty: "Speed Training",
      level: "All Levels",
      duration: "6 weeks",
      participants: 45,
      rating: 4.8,
      description: "World record holder teaches explosive speed techniques in virtual Olympic training facilities",
      skills: ["Sprint Mechanics", "Acceleration", "Reaction Time", "Mental Focus", "Race Strategy"],
      vrFeatures: [
        "Olympic stadium environment",
        "Slow-motion technique analysis",
        "World record pace training",
        "Mental preparation modules"
      ],
      schedule: "Tue/Thu/Sat 7PM ET",
      cost: "$1,800",
      testimonial: "Cut 0.7 seconds off my 40-yard dash time!"
    },
    {
      id: 3,
      name: "Basketball IQ Elite",
      coach: "Coach Steve Kerr",
      specialty: "Basketball Strategy",
      level: "Advanced",
      duration: "10 weeks", 
      participants: 32,
      rating: 4.9,
      description: "Championship coach reveals elite basketball IQ and strategic thinking in virtual court scenarios",
      skills: ["Court Vision", "Decision Making", "Team Play", "Clutch Performance", "Leadership"],
      vrFeatures: [
        "NBA arena simulations",
        "Real-time strategy adaptation",
        "Pressure situation training",
        "Championship mindset development"
      ],
      schedule: "Mon/Wed/Fri 8PM ET",
      cost: "$2,200",
      testimonial: "My basketball IQ improved dramatically - coach noticed immediately!"
    }
  ];

  const vrTechnologies = [
    {
      name: "Haptic Feedback",
      description: "Feel every movement, impact, and environmental factor",
      icon: Target,
      advancement: "Industry Leading"
    },
    {
      name: "Eye Tracking",
      description: "Analyze focus patterns and visual decision making",
      icon: Eye,
      advancement: "Cutting Edge"
    },
    {
      name: "Motion Capture",
      description: "Perfect technique analysis down to micro-movements",
      icon: Camera,
      advancement: "Professional Grade"
    },
    {
      name: "AI Coaching",
      description: "Real-time AI feedback and performance optimization",
      icon: Brain,
      advancement: "Proprietary AI"
    }
  ];

  const eliteCoaches = [
    {
      name: "Tom Brady",
      sport: "Football",
      achievements: "7x Super Bowl Champion",
      specialty: "Quarterback Excellence",
      avatar: "🏈",
      rating: 5.0,
      students: 2847
    },
    {
      name: "Serena Williams", 
      sport: "Tennis",
      achievements: "23x Grand Slam Champion",
      specialty: "Mental Toughness",
      avatar: "🎾",
      rating: 5.0,
      students: 1923
    },
    {
      name: "Michael Phelps",
      sport: "Swimming",
      achievements: "28x Olympic Medalist",
      specialty: "Champion Mindset",
      avatar: "🏊",
      rating: 5.0,
      students: 1456
    },
    {
      name: "Usain Bolt",
      sport: "Track & Field", 
      achievements: "8x Olympic Gold",
      specialty: "Speed Development",
      avatar: "⚡",
      rating: 5.0,
      students: 3421
    }
  ];

  const liveStats = {
    activeSessions: 127,
    totalUsers: 15420,
    skillImprovement: "42%",
    completionRate: "94%",
    coachRating: "4.9/5",
    vrUptime: "99.8%"
  };

  const currentCamp = trainingCamps[selectedCamp];
  const activeCoach = eliteCoaches[currentCoach];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-pink-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Headphones className="w-16 h-16 mx-auto mb-4 text-purple-300" />
            <h1 className="text-5xl font-black text-white mb-4">
              VR ELITE TRAINING CAMPS
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Train with world champions and Olympic athletes in immersive virtual reality. 
              Revolutionary haptic feedback, real-time coaching, and elite skill development that transcends physical limitations.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Live VR Session Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full animate-pulse ${vrSessionActive ? 'bg-green-500' : 'bg-gray-500'}`} />
              <span className="font-bold">
                {vrSessionActive ? 'VR TRAINING SESSION ACTIVE' : 'VR TRAINING STANDBY'}
              </span>
              {vrSessionActive && (
                <div className="px-3 py-1 bg-purple-500 rounded-full text-sm font-bold">
                  IMMERSIVE MODE
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setVrSessionActive(!vrSessionActive)}
                className={`px-6 py-2 rounded-lg font-bold ${
                  vrSessionActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {vrSessionActive ? 'Exit VR' : 'Enter VR'}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-3xl font-black text-purple-400">{liveStats.activeSessions}</div>
              <div className="text-xs text-white/70">Active Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-pink-400">{participantCount}</div>
              <div className="text-xs text-white/70">Live Participants</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-blue-400">{Math.round(heartRate)}</div>
              <div className="text-xs text-white/70">Heart Rate BPM</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-400">{Math.round(skillLevel)}%</div>
              <div className="text-xs text-white/70">Skill Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-yellow-400">{Math.round(vrImmersion)}%</div>
              <div className="text-xs text-white/70">VR Immersion</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-orange-400">{Math.round(sessionProgress)}%</div>
              <div className="text-xs text-white/70">Progress</div>
            </div>
          </div>

          {/* Session Progress */}
          {vrSessionActive && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold">Training Progress</span>
                <span className="text-sm">{Math.round(sessionProgress)}% Complete</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${sessionProgress}%` }}
                />
              </div>
            </div>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* VR Training Environment */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Main VR View */}
            <div className="relative bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl overflow-hidden border-2 border-purple-500/30">
              <div className="relative w-full aspect-video bg-gradient-to-br from-gray-900 to-purple-900 flex items-center justify-center">
                
                {/* VR Environment Simulation */}
                <div className="absolute inset-0">
                  {/* Stadium Background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 to-blue-900/80" />
                  
                  {/* Training Field */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-3/5 bg-green-600 rounded-t-3xl opacity-70">
                    {/* Field markings */}
                    <div className="absolute inset-0">
                      {[...Array(8)].map((_, i) => (
                        <div 
                          key={i} 
                          className="absolute w-full h-px bg-white/40"
                          style={{ top: `${i * 12.5}%` }}
                        />
                      ))}
                    </div>
                    
                    {/* Virtual Coach */}
                    <motion.div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-2xl"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotateY: [0, 180, 360]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {activeCoach.avatar}
                    </motion.div>

                    {/* Training Equipment */}
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 bg-white/60 rounded-full"
                        style={{
                          left: `${15 + (i % 6) * 12}%`,
                          top: `${25 + Math.floor(i / 6) * 50}%`
                        }}
                        animate={{
                          y: [0, -10, 0],
                          opacity: [0.6, 1, 0.6]
                        }}
                        transition={{
                          duration: 2 + Math.random(),
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>

                  {/* VR Interface Elements */}
                  <div className="absolute top-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div className="bg-black/70 rounded-lg p-3">
                        <div className="text-sm font-bold">{currentCamp.name}</div>
                        <div className="text-xs text-purple-400">Coach: {currentCamp.coach}</div>
                      </div>
                      <div className="bg-black/70 rounded-lg p-3">
                        <div className="text-sm font-bold text-green-400">Live: {participantCount} athletes</div>
                        <div className="text-xs text-white/70">VR Training Active</div>
                      </div>
                    </div>
                  </div>

                  {/* Haptic Feedback Visualization */}
                  {vrSessionActive && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/70 rounded-lg p-4">
                        <div className="grid grid-cols-4 gap-2">
                          <div className="text-center">
                            <Target className="w-4 h-4 mx-auto mb-1 text-blue-400" />
                            <div className="text-xs">Accuracy</div>
                            <div className="text-sm font-bold">{Math.round(Math.random() * 20 + 80)}%</div>
                          </div>
                          <div className="text-center">
                            <Zap className="w-4 h-4 mx-auto mb-1 text-yellow-400" />
                            <div className="text-xs">Power</div>
                            <div className="text-sm font-bold">{Math.round(Math.random() * 15 + 85)}%</div>
                          </div>
                          <div className="text-center">
                            <Clock className="w-4 h-4 mx-auto mb-1 text-green-400" />
                            <div className="text-xs">Timing</div>
                            <div className="text-sm font-bold">{Math.round(Math.random() * 10 + 90)}%</div>
                          </div>
                          <div className="text-center">
                            <Brain className="w-4 h-4 mx-auto mb-1 text-purple-400" />
                            <div className="text-xs">Focus</div>
                            <div className="text-sm font-bold">{Math.round(Math.random() * 8 + 92)}%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* VR Mode Overlay */}
                  {vrSessionActive && (
                    <div className="absolute inset-0 bg-purple-500/10 border-4 border-purple-400 rounded-lg">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <motion.div
                          animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.8, 1, 0.8]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity
                          }}
                        >
                          <Headphones className="w-20 h-20 mx-auto mb-4 text-purple-400" />
                          <div className="text-3xl font-black text-purple-300">VR IMMERSION ACTIVE</div>
                          <div className="text-sm text-white/70">Elite Training in Progress</div>
                        </motion.div>
                      </div>
                    </div>
                  )}
                </div>

                {/* VR Controls Overlay */}
                <div className="absolute top-4 right-4 space-y-2">
                  <button className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Training Camp Selection */}
            <div className="grid gap-4">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <Trophy className="w-6 h-6 text-purple-400" />
                Elite VR Training Camps
              </h2>
              
              {trainingCamps.map((camp, index) => (
                <motion.div
                  key={camp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedCamp(index)}
                  className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedCamp === index
                      ? 'border-purple-400 bg-purple-500/10'
                      : 'border-white/20 bg-white/5 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{camp.name}</h3>
                        <div className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-bold">
                          {camp.level}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/70 mb-2">
                        <span>{camp.coach}</span>
                        <span>•</span>
                        <span>{camp.duration}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400" />
                          {camp.rating}
                        </span>
                      </div>
                      <div className="text-purple-400 text-sm font-bold">{camp.schedule}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-purple-400">{camp.cost}</div>
                      <div className="text-xs text-white/70">{camp.participants} athletes</div>
                    </div>
                  </div>
                  
                  <p className="text-white/80 mb-4">{camp.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-bold mb-2">Skills Developed:</h4>
                      <div className="flex flex-wrap gap-2">
                        {camp.skills.map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-white/10 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">VR Features:</h4>
                      <div className="space-y-1">
                        {camp.vrFeatures.slice(0, 2).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <Headphones className="w-3 h-3 text-purple-400" />
                            <span className="text-white/70">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-500/10 p-3 rounded-lg border border-green-500/30">
                    <div className="text-sm italic text-green-400">"{camp.testimonial}"</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* VR Controls & Coach Panel */}
          <div className="space-y-6">
            
            {/* Elite Coaches */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                Elite Coaches
              </h3>
              
              <div className="space-y-3">
                {eliteCoaches.map((coach, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentCoach(index)}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      currentCoach === index
                        ? 'border-yellow-400 bg-yellow-500/10'
                        : 'border-white/20 bg-white/5 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{coach.avatar}</span>
                      <div>
                        <div className="font-bold">{coach.name}</div>
                        <div className="text-xs text-white/70">{coach.sport}</div>
                      </div>
                    </div>
                    <div className="text-sm text-yellow-400 font-bold mb-1">{coach.achievements}</div>
                    <div className="text-sm text-white/70 mb-2">{coach.specialty}</div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        {coach.rating}
                      </span>
                      <span className="text-white/50">{coach.students.toLocaleString()} students</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* VR Technology */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Headphones className="w-5 h-5 text-purple-400" />
                VR Technology
              </h3>
              
              <div className="space-y-3">
                {vrTechnologies.map((tech, index) => {
                  const TechIcon = tech.icon;
                  return (
                    <div key={index} className="p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <TechIcon className="w-4 h-4 text-purple-400" />
                        <div className="font-bold text-sm">{tech.name}</div>
                      </div>
                      <p className="text-xs text-white/70 mb-2">{tech.description}</p>
                      <div className="text-xs text-purple-400 font-bold">{tech.advancement}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Session Stats */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Live Stats
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Users</span>
                  <span className="text-sm font-bold text-green-400">{liveStats.totalUsers.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Skill Improvement</span>
                  <span className="text-sm font-bold text-blue-400">{liveStats.skillImprovement}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Completion Rate</span>
                  <span className="text-sm font-bold text-purple-400">{liveStats.completionRate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Coach Rating</span>
                  <span className="text-sm font-bold text-yellow-400">{liveStats.coachRating}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">VR Uptime</span>
                  <span className="text-sm font-bold text-green-400">{liveStats.vrUptime}</span>
                </div>
              </div>
            </div>

            {/* Device Compatibility */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">VR Compatibility</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-green-500/20 rounded-lg">
                  <Headphones className="w-6 h-6 mx-auto mb-2 text-green-400" />
                  <div className="text-xs font-bold">VR Headsets</div>
                </div>
                <div className="text-center p-3 bg-blue-500/20 rounded-lg">
                  <Monitor className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                  <div className="text-xs font-bold">Desktop</div>
                </div>
                <div className="text-center p-3 bg-purple-500/20 rounded-lg">
                  <Smartphone className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                  <div className="text-xs font-bold">Mobile VR</div>
                </div>
                <div className="text-center p-3 bg-yellow-500/20 rounded-lg">
                  <Gamepad2 className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                  <div className="text-xs font-bold">Controllers</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-purple-500/20 rounded-lg text-center hover:bg-purple-500/30 transition-colors">
                  <Calendar className="w-5 h-5 mx-auto mb-2 text-purple-400" />
                  <div className="text-xs font-bold">Schedule</div>
                </button>
                <button className="p-3 bg-green-500/20 rounded-lg text-center hover:bg-green-500/30 transition-colors">
                  <MessageCircle className="w-5 h-5 mx-auto mb-2 text-green-400" />
                  <div className="text-xs font-bold">Chat Coach</div>
                </button>
                <button className="p-3 bg-blue-500/20 rounded-lg text-center hover:bg-blue-500/30 transition-colors">
                  <Download className="w-5 h-5 mx-auto mb-2 text-blue-400" />
                  <div className="text-xs font-bold">Record</div>
                </button>
                <button className="p-3 bg-yellow-500/20 rounded-lg text-center hover:bg-yellow-500/30 transition-colors">
                  <Share className="w-5 h-5 mx-auto mb-2 text-yellow-400" />
                  <div className="text-xs font-bold">Share</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-black mb-8">Elite VR Training Revolution</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 p-8 rounded-xl">
              <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">World Champion Coaches</h3>
              <p className="text-white/70">Train directly with Olympic champions, Super Bowl winners, and world record holders in immersive VR environments.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Headphones className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Advanced VR Technology</h3>
              <p className="text-white/70">Cutting-edge haptic feedback, eye tracking, and motion capture create the most realistic training experience possible.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Proven Results</h3>
              <p className="text-white/70">42% average skill improvement with 94% completion rate. Athletes achieve elite performance faster than ever before.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-purple-500/30"
          >
            <Headphones className="w-7 h-7" />
            Enter VR Training
            <ArrowRight className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </div>
  );
}