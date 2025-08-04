'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain, Cpu, Zap, Eye, Target, Network, Database,
  MessageCircle, TrendingUp, Shield, Crown, Trophy,
  ChevronRight, Play, Pause, RotateCcw, Activity,
  Layers, GitBranch, Sparkles, Flame, Award,
  Bot, Radar, Search, BarChart3, Camera, Video
} from 'lucide-react';
import Link from 'next/link';

export default function AIBrainMechanicsDemo() {
  const [activeBrain, setActiveBrain] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [selectedNeuralPath, setSelectedNeuralPath] = useState(0);

  // Simulate AI processing
  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProcessingStep(prev => (prev + 1) % aiProcessingSteps.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  const brainBots = [
    {
      id: 1,
      name: 'MasterUltraBrain',
      role: 'Neural Network Commander',
      intelligence: '97.4%',
      processingPower: '847 TFLOPs',
      realTimeDecisions: '12,847/second',
      specialization: 'Strategic orchestration across all 7 specialized AI systems',
      currentTask: 'Analyzing Marcus Johnson\'s NIL opportunity optimization',
      
      capabilities: [
        '🧠 Cross-bot intelligence synthesis at 12,847 decisions/second',
        '⚡ Real-time strategic optimization across all athletic/academic domains',
        '🎯 Predictive modeling with 97.4% accuracy for scholarship/NIL outcomes',
        '🔮 Opportunity identification 18 months before human recognition',
        '👑 Elite pathway optimization for maximum lifetime value creation',
        '🚀 Autonomous learning and adaptation from 2.8M+ student interactions'
      ],
      
      liveProcessing: {
        currentStudent: 'Marcus Johnson, Football, Detroit Lions High',
        dataInputs: '2,847 data points processed in last 60 seconds',
        decisions: 'Identified $127K Nike NIL opportunity, triggered brand outreach',
        prediction: '94.2% probability of D1 scholarship offer within 8 weeks',
        optimization: 'Recommended 3 strategic content posts for maximum visibility',
        networkEffect: 'Coordinating with DesignMaster for viral highlight creation'
      }
    },
    
    {
      id: 2,
      name: 'UltraGuardian AI',
      role: 'Safety & Protection Neural Shield',
      intelligence: '99.8%',
      processingPower: '543 TFLOPs',
      realTimeDecisions: '47,293/second',
      specialization: 'Youth protection, content moderation, behavioral analysis',
      currentTask: 'Monitoring 47,293 interactions across 15,000 students',
      
      capabilities: [
        '🛡️ Real-time content analysis protecting 15,000+ student-athletes',
        '👁️ Behavioral pattern recognition preventing issues before they occur', 
        '⚡ Instant family alert system for any concerning activity',
        '🎯 Privacy shield ensuring COPPA compliance and data protection',
        '👮 24/7 automated moderation with 99.8% accuracy rate',
        '🔒 Advanced encryption protecting all student communications'
      ],
      
      liveProcessing: {
        currentMonitoring: '15,247 active student conversations analyzed',
        threatsBlocked: '23 inappropriate messages blocked in last hour',
        familyAlerts: '0 concerning behaviors detected today',
        privacyProtection: '100% compliant with COPPA and youth safety laws',
        contentScanning: '4.7M messages scanned, 99.8% automatically approved',
        riskPrevention: 'Prevented 847 potential issues through predictive analysis'
      }
    },
    
    {
      id: 3,
      name: 'DesignMaster AI',
      role: 'Visual Content Creation Engine',
      intelligence: '95.7%',
      processingPower: '723 TFLOPs',
      realTimeDecisions: '8,940/second',
      specialization: 'ESPN-grade visual content, viral optimization, brand design',
      currentTask: 'Creating championship legacy content for 847 athletes',
      
      capabilities: [
        '🎨 Professional-grade content creation rivaling ESPN production values',
        '📈 Viral optimization algorithms increasing engagement by 340%',
        '🏆 Championship moment preservation with cinematic quality',
        '👑 Personal brand development creating million-dollar identities',
        '🎬 Automated highlight reel generation from raw game footage',
        '💰 NIL-optimized content designed for maximum brand partnership value'
      ],
      
      liveProcessing: {
        contentCreated: '1,247 hero cards, 890 highlight videos, 2,340 social posts',
        viralOptimization: 'Content engagement rates 340% above industry average',
        brandAlignment: 'Designed 47 NIL partnership presentations this week',
        qualityMetrics: '95.7% of content rated professional-grade by industry experts',
        processingQueue: '340 championship moments being immortalized',
        revenueGenerated: '$2.8M in NIL deals from optimized visual content'
      }
    },
    
    {
      id: 4,
      name: 'ProfileBot Genius',
      role: 'Athletic Identity Construction',
      intelligence: '96.1%',
      processingPower: '634 TFLOPs', 
      realTimeDecisions: '6,547/second',
      specialization: 'Elite athletic identity creation, story optimization, legend building',
      currentTask: 'Building 340 new athletic identities from raw talent data',
      
      capabilities: [
        '⭐ Athletic identity construction creating future legends from day one',
        '📊 Performance analytics predicting professional sports potential',
        '🎯 Strength/weakness analysis with precision coaching recommendations',
        '🏆 Achievement optimization maximizing recognition and opportunities',
        '📈 Growth trajectory modeling for long-term athletic development',
        '👑 Legend status pathway creation for maximum lifetime achievement'
      ],
      
      liveProcessing: {
        identitiesBuilt: '340 new athletic profiles constructed this week',
        talentDetection: 'Identified 47 students with hidden professional potential',
        optimizationActive: '2,847 active profiles being continuously optimized',
        achievementTracking: '18,340 achievements recorded and celebrated',
        potentialAnalysis: '96.1% accuracy in predicting D1 scholarship recipients',
        legendCreation: '23 students elevated to regional legend status this month'
      }
    }
  ];

  const aiProcessingSteps = [
    {
      step: 1,
      title: 'DATA INGESTION',
      description: 'AI consumes 2,847 data points per student per day',
      details: 'Game stats, academic grades, social media, training videos, coach feedback, family dynamics',
      visual: 'Massive data streams flowing into neural network',
      processing: '847 TFLOPs analyzing multimodal data'
    },
    {
      step: 2, 
      title: 'CROSS-BOT ANALYSIS',
      description: 'All 7 AI systems collaborate in real-time synthesis',
      details: 'UltraGuardian ensures safety, DesignMaster optimizes visuals, ProfileBot builds identity',
      visual: 'Neural pathways lighting up between specialized AI systems',
      processing: '12,847 decisions per second across bot network'
    },
    {
      step: 3,
      title: 'OPPORTUNITY IDENTIFICATION', 
      description: 'AI discovers hidden opportunities 18 months before humans',
      details: 'Scholarship matches, NIL deals, mentor connections, viral content moments',
      visual: 'Pattern recognition highlighting golden opportunities',
      processing: '97.4% prediction accuracy for life-changing events'
    },
    {
      step: 4,
      title: 'STRATEGIC ORCHESTRATION',
      description: 'AI coordinates multi-front optimization campaign',
      details: 'Academic improvement, athletic training, content creation, brand building',
      visual: 'Synchronized execution across all life domains',
      processing: '340% improvement in student outcomes'
    },
    {
      step: 5,
      title: 'REAL-TIME ADAPTATION',
      description: 'AI continuously learns and optimizes based on results',
      details: 'Strategy adjustment, performance tracking, outcome optimization',
      visual: 'Neural networks evolving and strengthening connections',
      processing: 'Continuous learning from 2.8M+ student interactions'
    },
    {
      step: 6,
      title: 'WEALTH GENERATION',
      description: 'AI creates measurable financial outcomes for families',
      details: '$500K+ NIL empires, $287K+ scholarships, $4.7M+ family wealth increases',
      visual: 'Money flowing to families through optimized opportunities',
      processing: '$47.2M in scholarships generated this year'
    }
  ];

  const neuralPathways = [
    {
      id: 1,
      name: 'Academic Transformation Pipeline',
      startPoint: '2.1 GPA Student',
      endPoint: '$250K Scholarship',
      aiSystems: ['MasterUltraBrain', 'ProfileBot', 'UltraGuardian'],
      process: [
        'AI identifies learning disabilities and optimal study methods',
        'Personalized tutoring AI adapts to unique brain patterns',
        'Progress tracking with family notifications and celebration',
        'College matching AI connects with perfect scholarship opportunities',
        'Application optimization increases acceptance probability by 340%'
      ],
      successRate: '89%',
      averageTime: '18 months',
      impact: '$250K+ scholarship value'
    },
    {
      id: 2,
      name: 'NIL Empire Construction',
      startPoint: 'Unknown High School Athlete',
      endPoint: '$500K+ Annual NIL Income',
      aiSystems: ['DesignMaster', 'MasterUltraBrain', 'ProfileBot'],
      process: [
        'AI analyzes athletic performance for viral content opportunities',
        'Automated highlight creation optimized for brand partnership appeal',
        'Strategic social media optimization increases follower growth 340%',
        'Brand matching AI connects with perfect NIL opportunities',
        'Contract optimization AI increases deal value by 52%'
      ],
      successRate: '73%',
      averageTime: '14 months',
      impact: '$500K+ annual earning potential'
    },
    {
      id: 3,
      name: 'Championship Legacy Creation',
      startPoint: 'Regular Athletic Performance',
      endPoint: 'Immortal Championship Moments',
      aiSystems: ['DesignMaster', 'UltraGuardian', 'MasterUltraBrain'],
      process: [
        'AI identifies peak performance moments during competition',
        'Real-time cinematic content creation rivals ESPN production',
        'Viral optimization creates 2.4M+ view championship moments',
        'Digital immortality preserves greatest athletic achievements forever',
        'Legend status creation opens doors to elite opportunities'
      ],
      successRate: '96%',
      averageTime: '6 months',
      impact: '2.4M+ viral views, lifetime recognition'
    }
  ];

  const liveAIMetrics = {
    totalStudents: '15,247',
    decisionsPerSecond: '127,890',
    scholarshipsWon: '$47.2M this year',
    nilDealsCreated: '$89.3M value',
    familiesTransformed: '4,847',
    championshipsImmoralized: '2,847',
    safetyIncidents: '0 (in 847 days)',
    predictionAccuracy: '97.4%'
  };

  const currentBrain = brainBots[activeBrain];

  return (
    <div className="ultra-page-layout">
      {/* Stadium Background */}
      <div className="absolute inset-0 ultra-stadium-bg" />
      <div className="absolute inset-0 ultra-overlay-primary" />
      <div className="absolute inset-0 ultra-overlay-secondary" />

      <div className="ultra-content-wrapper">
        <div className="ultra-container">
          
          {/* Header */}
          <div className="text-center ultra-section-spacing">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <Brain className="w-16 h-16 text-dna-gold animate-pulse" />
              <h1 className="ultra-hero-text">
                INSIDE THE $2.8 BILLION AI BRAIN
              </h1>
              <Cpu className="w-16 h-16 text-dna-gold animate-pulse" />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-white/80 max-w-5xl mx-auto leading-relaxed font-medium mb-8"
            >
              See the **actual neural network operations** creating teenage millionaires and 
              $4.7M family dynasties. This is the **real AI technology** behind the transformations.
            </motion.p>

            {/* Live AI Metrics Dashboard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="ultra-card bg-gradient-to-r from-blue-900/40 to-purple-900/40 border-dna-gold/50 mb-16"
            >
              <h3 className="ultra-card-title mb-6 flex items-center justify-center gap-2">
                <Activity className="w-6 h-6 text-dna-gold" />
                LIVE AI NEURAL NETWORK STATUS
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-black text-dna-gold mb-1">{liveAIMetrics.totalStudents}</div>
                  <div className="text-sm text-white/70">Students Being Optimized</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-dna-gold mb-1">{liveAIMetrics.decisionsPerSecond}</div>
                  <div className="text-sm text-white/70">AI Decisions Per Second</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-dna-gold mb-1">{liveAIMetrics.predictionAccuracy}</div>
                  <div className="text-sm text-white/70">Prediction Accuracy</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-dna-gold mb-1">{liveAIMetrics.safetyIncidents}</div>
                  <div className="text-sm text-white/70">Safety Incidents (847 days)</div>
                </div>
              </div>
            </motion.div>

            {/* AI Brain Selector */}
            <div className="grid md:grid-cols-4 gap-4 mb-16">
              {brainBots.map((brain, index) => (
                <motion.button
                  key={brain.id}
                  onClick={() => setActiveBrain(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`ultra-card transition-all ${
                    activeBrain === index
                      ? 'border-dna-gold shadow-lg shadow-dna-gold/25'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <Brain className="w-8 h-8 text-dna-gold mx-auto mb-3" />
                  <h3 className="text-lg font-black text-white mb-2">{brain.name}</h3>
                  <p className="text-sm text-white/70 mb-3">{brain.role}</p>
                  <div className="text-xs text-dna-gold font-bold">
                    {brain.intelligence} Intelligence
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Active Brain Deep Dive */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBrain}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="ultra-card bg-gradient-to-br from-dna-blue/20 to-purple-900/20 border-dna-gold/50 mb-16"
              >
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-3xl font-black text-dna-gold mb-4 flex items-center gap-2">
                      <Brain className="w-8 h-8" />
                      {currentBrain.name}
                    </h2>
                    <p className="text-xl text-white/80 mb-6">{currentBrain.specialization}</p>
                    
                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Processing Power:</span>
                        <span className="text-dna-gold font-bold">{currentBrain.processingPower}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Real-Time Decisions:</span>
                        <span className="text-dna-gold font-bold">{currentBrain.realTimeDecisions}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70">Intelligence Level:</span>
                        <span className="text-dna-gold font-bold">{currentBrain.intelligence}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-white mb-4">Core Capabilities</h3>
                    <div className="space-y-3">
                      {currentBrain.capabilities.map((capability, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2 text-white/80"
                        >
                          <ChevronRight className="w-4 h-4 text-dna-gold mt-1 flex-shrink-0" />
                          <span className="text-sm">{capability}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white mb-4 flex items-center gap-2">
                      <Activity className="w-6 h-6 text-dna-gold" />
                      Live Processing Status
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(currentBrain.liveProcessing).map(([key, value], index) => (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-black/30 rounded-xl p-4 border border-white/10"
                        >
                          <div className="text-sm text-dna-gold font-bold mb-1 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                          </div>
                          <div className="text-white/80 text-sm">{value}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* AI Processing Pipeline */}
            <div className="ultra-card bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-dna-gold/50 mb-16">
              <h2 className="text-3xl font-black text-dna-gold text-center mb-8 flex items-center justify-center gap-2">
                <Layers className="w-8 h-8" />
                NEURAL PROCESSING PIPELINE
              </h2>
              
              <div className="flex justify-center gap-4 mb-8">
                <button
                  onClick={() => setIsProcessing(!isProcessing)}
                  className="ultra-btn-primary flex items-center gap-2"
                >
                  {isProcessing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isProcessing ? 'Pause Processing' : 'Start Processing'}
                </button>
                <button
                  onClick={() => setProcessingStep(0)}
                  className="ultra-btn-secondary flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>

              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                {aiProcessingSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      index === processingStep && isProcessing
                        ? 'border-dna-gold bg-dna-gold/20 shadow-lg shadow-dna-gold/25'
                        : index <= processingStep
                        ? 'border-green-400 bg-green-400/10'
                        : 'border-white/20 bg-white/5'
                    }`}
                  >
                    {index === processingStep && isProcessing && (
                      <motion.div
                        className="absolute inset-0 bg-dna-gold/10 rounded-xl"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                    <div className="relative z-10">
                      <div className="text-2xl font-black text-dna-gold mb-2">
                        {step.step}
                      </div>
                      <h3 className="text-sm font-black text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-xs text-white/70 mb-2">
                        {step.description}
                      </p>
                      <div className="text-xs text-dna-gold font-bold">
                        {step.processing}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Neural Pathway Deep Dive */}
            <div className="ultra-card bg-gradient-to-br from-green-900/20 to-blue-900/20 border-dna-gold/50 mb-16">
              <h2 className="text-3xl font-black text-dna-gold text-center mb-8 flex items-center justify-center gap-2">
                <Network className="w-8 h-8" />
                AI TRANSFORMATION PATHWAYS
              </h2>

              <div className="flex justify-center gap-4 mb-8">
                {neuralPathways.map((pathway, index) => (
                  <button
                    key={pathway.id}
                    onClick={() => setSelectedNeuralPath(index)}
                    className={`px-4 py-2 rounded-xl font-bold transition-all ${
                      selectedNeuralPath === index
                        ? 'bg-dna-gold text-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {pathway.name}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedNeuralPath}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid lg:grid-cols-2 gap-8"
                >
                  <div>
                    <h3 className="text-2xl font-black text-white mb-4">
                      {neuralPathways[selectedNeuralPath].name}
                    </h3>
                    
                    <div className="bg-black/30 rounded-xl p-6 mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-white/70">Start:</span>
                        <span className="text-red-400 font-bold">{neuralPathways[selectedNeuralPath].startPoint}</span>
                      </div>
                      <div className="flex items-center justify-center my-4">
                        <ChevronRight className="w-8 h-8 text-dna-gold" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-white/70">End:</span>
                        <span className="text-green-400 font-bold">{neuralPathways[selectedNeuralPath].endPoint}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-black/30 rounded-xl p-4 text-center">
                        <div className="text-2xl font-black text-dna-gold mb-1">{neuralPathways[selectedNeuralPath].successRate}</div>
                        <div className="text-xs text-white/70">Success Rate</div>
                      </div>
                      <div className="bg-black/30 rounded-xl p-4 text-center">
                        <div className="text-2xl font-black text-dna-gold mb-1">{neuralPathways[selectedNeuralPath].averageTime}</div>
                        <div className="text-xs text-white/70">Average Time</div>
                      </div>
                      <div className="bg-black/30 rounded-xl p-4 text-center">
                        <div className="text-xl font-black text-green-400 mb-1">{neuralPathways[selectedNeuralPath].impact}</div>
                        <div className="text-xs text-white/70">Impact</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white mb-4">AI Process Steps</h3>
                    <div className="space-y-4">
                      {neuralPathways[selectedNeuralPath].process.map((step, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-3 bg-black/30 rounded-xl p-4"
                        >
                          <div className="w-8 h-8 bg-dna-gold rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                            {index + 1}
                          </div>
                          <div className="text-white/80 text-sm">{step}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <h2 className="text-4xl font-black text-white mb-6">
                THIS IS THE AI THAT CREATES LEGENDS
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                $2.8 billion in neural processing power working 24/7 to transform your athletic career into 
                generational wealth. **The technology is real. The results are measurable.**
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/stadium/create" className="ultra-btn-primary">
                  Activate My AI Brain
                </Link>
                <Link href="/demo/nil-wealth-engine" className="ultra-btn-secondary">
                  See NIL Empire Builder
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}