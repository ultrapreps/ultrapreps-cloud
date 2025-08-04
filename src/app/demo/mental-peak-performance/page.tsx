'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Heart, Zap, Target, Shield, Star, Trophy, Crown,
  TrendingUp, Eye, Clock, Flame, CheckCircle, ArrowRight,
  Activity, Moon, Sun, Battery, Smile, Frown, AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

export default function MentalPeakPerformanceDemo() {
  const [selectedAthlete, setSelectedAthlete] = useState(0);
  const [mentalScore, setMentalScore] = useState(94);
  const [peakMoments, setPeakMoments] = useState(847);
  const [wellnessMetric, setWellnessMetric] = useState(96);

  // Live performance simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMentalScore(prev => Math.max(85, Math.min(100, prev + (Math.random() - 0.5) * 4)));
      if (Math.random() < 0.3) {
        setPeakMoments(prev => prev + Math.floor(Math.random() * 3) + 1);
        setWellnessMetric(prev => Math.max(88, Math.min(100, prev + (Math.random() - 0.5) * 3)));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const mentalTransformations = [
    {
      id: 1,
      athlete: 'Emma "Phoenix" Carter',
      sport: 'Gymnastics',
      age: 16,
      location: 'Phoenix, Arizona',
      
      mentalStruggles: {
        anxiety: 'Panic attacks before every competition for 2 years',
        pressure: 'Family pressure to be perfect, never good enough',
        fear: 'Terrified of failing, stopped trying new skills',
        confidence: 'Self-worth completely tied to gymnastics performance',
        isolation: 'Lost all friends, only focused on gymnastics',
        burnout: 'Wanted to quit gymnastics entirely at age 15'
      },
      
      transformation: {
        timeline: '8 months of AI mental wellness coaching',
        breakthrough: 'Month 4 - Learned to separate identity from performance',
        techniques: 'Mindfulness AI, pressure simulation training, confidence building',
        support: 'AI therapist available 24/7, personalized coping strategies',
        family: 'Family therapy AI helped parents understand healthy support',
        community: 'Connected with 47 athletes who overcame similar challenges'
      },
      
      currentMental: {
        anxiety: 'Completely eliminated competition anxiety',
        confidence: '98% confidence score in high-pressure situations',
        focus: 'Laser focus on demand, mental clarity in crucial moments',
        resilience: 'Bounces back from mistakes in under 30 seconds',
        joy: 'Rediscovered love of gymnastics, pure joy in movement',
        balance: 'Healthy relationships, 4.0 GPA, social life thriving'
      },
      
      performanceResults: {
        before: 'Regional competitor, frequent falls, inconsistent',
        after: 'National champion, perfect routines, Olympic training team',
        scores: 'Average score improved from 8.2 to 9.7',
        consistency: '97% routine completion rate (was 67%)',
        clutch: 'Performs best under highest pressure situations',
        recruitment: '$347,000 in scholarship offers from top programs'
      },
      
      aiImpact: {
        monitoring: 'Real-time stress monitoring through biometric sensors',
        intervention: 'AI detected anxiety spikes and provided instant coping tools',
        personalization: 'Learned Emma\'s unique triggers and optimal mental states',
        prediction: 'Predicted confidence drops 24 hours before they happened',
        optimization: 'Found perfect pre-competition mental routine formula',
        connection: 'Connected with Olympic athletes who shared similar journeys'
      },
      
      familyQuote: "Emma was ready to quit gymnastics forever. The AI mental wellness coaching didn't just save her sport - it saved our daughter. She's happier, healthier, and more successful than we ever imagined possible.",
      parentName: "Sarah Carter, Emma's Mom"
    },
    
    {
      id: 2,
      athlete: 'Marcus "Zen" Thompson',
      sport: 'Basketball',
      age: 17,
      location: 'Chicago, Illinois',
      
      mentalStruggles: {
        anger: 'Explosive temper, ejected from 12 games junior year',
        pressure: 'Inner city pressure to be family savior through basketball',
        trauma: 'Witnessed violence, PTSD affecting sleep and focus',
        trust: 'Couldn\'t trust coaches or teammates, isolated mindset',
        academics: 'Failing classes due to inability to concentrate',
        future: 'Convinced he\'d never escape his environment'
      },
      
      transformation: {
        timeline: '12 months of comprehensive mental wellness program',
        breakthrough: 'Month 6 - First full night of sleep without nightmares',
        techniques: 'Trauma-informed AI therapy, anger management protocols',
        support: 'Crisis intervention AI, meditation training, emotional regulation',
        community: 'Connected with NBA players who overcame similar backgrounds',
        education: 'Academic anxiety coaching raised GPA from 1.8 to 3.6'
      },
      
      currentMental: {
        anger: 'Complete emotional regulation, zero technical fouls this year',
        trauma: 'Processed trauma healthily, no longer controlled by past',
        leadership: 'Team captain, leading team to state championship',
        academics: 'Honor roll student, loves learning, wants to study psychology',
        sleep: 'Consistent 8 hours sleep, meditation routine mastered',
        purpose: 'Mentoring younger kids, breaking cycles of violence'
      },
      
      performanceResults: {
        before: 'Talented but uncontrollable, teams avoided recruiting him',
        after: 'Elite point guard, Duke scholarship, projected NBA draft pick',
        stats: 'PPG improved from 14.2 to 24.7, assists up 300%',
        leadership: 'Team went from losing record to state championship contenders',
        clutch: 'Thrives in pressure moments, never loses composure',
        recruitment: '$428,000 full ride + academic support at Duke'
      },
      
      aiImpact: {
        crisis: 'AI crisis intervention prevented 3 potential breaking points',
        triggers: 'Identified and eliminated 89% of anger triggers',
        patterns: 'Analyzed sleep, mood, performance patterns for optimization',
        support: 'Connected with Chicago NBA alumni mentor network',
        academics: 'AI tutoring addressed learning anxiety and concentration',
        community: 'Created youth mentorship program in his neighborhood'
      },
      
      familyQuote: "Marcus was angry at the world and heading nowhere good. The AI mental wellness program gave him tools to heal, grow, and become a leader. He's not just playing basketball - he's changing lives.",
      parentName: "Denise Thompson, Marcus's Grandmother"
    },
    
    {
      id: 3,
      athlete: 'Sophia "Mindful" Rodriguez',
      sport: 'Tennis',
      age: 15,
      location: 'San Diego, California',
      
      mentalStruggles: {
        perfectionism: 'Paralyzed by need to be perfect, wouldn\'t try unless guaranteed success',
        comparison: 'Constantly comparing to other players, never good enough',
        pressure: 'Parents invested $200K in tennis, crushing financial pressure',
        anxiety: 'Severe social anxiety, couldn\'t speak to coaches or teammates',
        identity: 'Entire self-worth based on tennis ranking and results',
        burnout: 'Physical and mental exhaustion, losing matches she should win'
      },
      
      transformation: {
        timeline: '10 months of AI-powered mental performance optimization',
        breakthrough: 'Month 5 - Lost a match and felt genuinely happy with effort',
        techniques: 'Perfectionism rewiring, growth mindset AI coaching',
        support: 'Social anxiety therapy, communication skills building',
        family: 'Family dynamic coaching to reduce financial pressure',
        peers: 'Connected with top junior players who overcame perfectionism'
      },
      
      currentMental: {
        perfectionism: 'Embraces mistakes as learning opportunities',
        confidence: 'Unshakeable confidence regardless of results',
        communication: 'Team leader, mentors younger players naturally',
        pressure: 'Thrives under pressure, plays best in biggest moments',
        identity: 'Strong sense of self beyond tennis achievements',
        joy: 'Rediscovered pure love of competition and improvement'
      },
      
      performanceResults: {
        before: 'Ranked #247 nationally, choking in crucial matches',
        after: 'Top 10 nationally, won 3 major junior tournaments',
        ranking: 'Jumped from #247 to #8 in 10 months',
        clutch: 'Undefeated in 3-set matches this year (0-12 previous year)',
        consistency: 'Reaches semifinals or better in 94% of tournaments',
        recruitment: '$267,000 scholarship offers from Stanford, USC, UCLA'
      },
      
      aiImpact: {
        patterns: 'Identified perfectionism triggers down to specific situations',
        optimization: 'Created personalized pre-match mental routines',
        comparison: 'AI blocked social media comparisons during tournaments',
        biometrics: 'Heart rate variability training improved stress response',
        community: 'Connected with pro players who share similar mental journey',
        family: 'Family coaching reduced financial pressure by 78%'
      },
      
      familyQuote: "Sophia was so stressed about tennis that she lost her childhood. The AI mental wellness program gave her back her joy, confidence, and love of competition. She's playing better and living better.",
      parentName: "Carlos Rodriguez, Sophia's Dad"
    }
  ];

  const currentAthlete = mentalTransformations[selectedAthlete];

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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <Brain className="w-12 h-12 text-dna-blue" />
              <h1 className="ultra-hero-text">
                FROM MENTAL BREAKDOWN TO PEAK PERFORMANCE
              </h1>
              <Zap className="w-12 h-12 text-dna-blue" />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-medium mb-8"
            >
              Watch athletes transform from **anxiety and burnout** to **unshakeable mental dominance**. 
              This isn't just therapy - it's **performance optimization** that creates champions.
            </motion.p>

            {/* Live Mental Performance Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="ultra-card bg-gradient-to-r from-dna-blue/20 to-purple-900/20 border-dna-blue/50 max-w-5xl mx-auto mb-16"
            >
              <h3 className="ultra-card-title mb-6 flex items-center justify-center gap-2">
                <Activity className="w-6 h-6 text-dna-blue" />
                LIVE MENTAL PERFORMANCE OPTIMIZATION
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl font-black text-dna-blue mb-1">{mentalScore}%</div>
                  <div className="text-sm text-white/70">Average Mental Score</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dna-blue mb-1">{peakMoments}</div>
                  <div className="text-sm text-white/70">Peak States Created Today</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dna-blue mb-1">{wellnessMetric}%</div>
                  <div className="text-sm text-white/70">Wellness Improvement</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dna-blue mb-1">24/7</div>
                  <div className="text-sm text-white/70">AI Mental Support</div>
                </div>
              </div>
            </motion.div>

            {/* Athlete Selector */}
            <div className="flex justify-center gap-4 mb-12">
              {mentalTransformations.map((athlete, index) => (
                <button
                  key={athlete.id}
                  onClick={() => setSelectedAthlete(index)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    selectedAthlete === index
                      ? 'bg-dna-blue text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {athlete.athlete.split(' ')[0]}
                  <div className="text-xs opacity-70">{athlete.sport}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mental Transformation Story */}
        <div className="ultra-container">
          <div className="space-y-12">
              {/* Athlete Profile */}
              <div className="ultra-card bg-gradient-to-r from-dna-blue/30 to-purple-900/30 border-dna-blue/50">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-4">{currentAthlete.athlete}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-dna-blue font-bold">Sport</div>
                        <div className="text-white">{currentAthlete.sport}</div>
                      </div>
                      <div>
                        <div className="text-dna-blue font-bold">Age</div>
                        <div className="text-white">{currentAthlete.age} years old</div>
                      </div>
                      <div>
                        <div className="text-dna-blue font-bold">Location</div>
                        <div className="text-white">{currentAthlete.location}</div>
                      </div>
                      <div>
                        <div className="text-dna-blue font-bold">Transformation</div>
                        <div className="text-white">{currentAthlete.transformation.timeline}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-dna-blue to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Brain className="w-16 h-16 text-white" />
                    </div>
                    <div className="text-dna-blue font-bold text-lg">MENTAL SCORE</div>
                    <div className="text-4xl font-black text-white">{currentAthlete.currentMental.confidence || '98%'}</div>
                    <div className="text-sm text-white/70 mt-2">Peak Performance State</div>
                  </div>
                </div>
              </div>

              {/* Before vs After Mental State */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="relative overflow-hidden rounded-2xl border-2 border-red-500/80 bg-black/90 backdrop-blur-xl p-6">
                  {/* Strong dark background overlay for perfect contrast */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/70 via-black/90 to-red-700/60 backdrop-blur-sm" />
                  
                  {/* Content with guaranteed high contrast */}
                  <div className="relative z-10">
                  <h3 className="text-2xl font-black text-red-400 mb-6 flex items-center gap-2">
                    <Frown className="w-6 h-6" />
                    BEFORE: MENTAL STRUGGLES
                  </h3>
                  <div className="space-y-4 text-sm">
                    {Object.entries(currentAthlete.mentalStruggles).map(([key, value], index) => (
                      <div key={index}>
                        <div className="text-red-300 font-bold capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        <div className="text-white italic">"{value}"</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border-2 border-green-500/80 bg-black/90 backdrop-blur-xl p-6">
                  {/* Strong dark background overlay for perfect contrast */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-black/90 to-green-700/60 backdrop-blur-sm" />
                  
                  {/* Content with guaranteed high contrast */}
                  <div className="relative z-10">
                  <h3 className="text-2xl font-black text-green-400 mb-6 flex items-center gap-2">
                    <Smile className="w-6 h-6" />
                    AFTER: MENTAL MASTERY
                  </h3>
                  <div className="space-y-4 text-sm">
                    {Object.entries(currentAthlete.currentMental).map(([key, value], index) => (
                      <div key={index}>
                        <div className="text-green-300 font-bold capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        <div className="text-white font-medium">"{value}"</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Transformation Process */}
              <div className="ultra-card bg-gradient-to-r from-dna-gold/20 to-dna-orange/20 border-dna-gold/50">
                <h3 className="text-2xl font-black text-dna-gold mb-6 text-center flex items-center justify-center gap-2">
                  <Target className="w-6 h-6" />
                  THE MENTAL TRANSFORMATION PROCESS
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                  <div>
                    <div className="text-dna-gold font-bold mb-2">Timeline</div>
                    <div className="text-white">{currentAthlete.transformation.timeline}</div>
                  </div>
                  <div>
                    <div className="text-dna-gold font-bold mb-2">Breakthrough Moment</div>
                    <div className="text-white">{currentAthlete.transformation.breakthrough}</div>
                  </div>
                  <div>
                    <div className="text-dna-gold font-bold mb-2">AI Techniques</div>
                    <div className="text-white">{currentAthlete.transformation.techniques}</div>
                  </div>
                  <div>
                    <div className="text-dna-gold font-bold mb-2">24/7 Support</div>
                    <div className="text-white">{currentAthlete.transformation.support}</div>
                  </div>
                  <div>
                    <div className="text-dna-gold font-bold mb-2">Family Healing</div>
                    <div className="text-white">{currentAthlete.transformation.family}</div>
                  </div>
                  <div>
                    <div className="text-dna-gold font-bold mb-2">Peer Network</div>
                    <div className="text-white">{currentAthlete.transformation.community}</div>
                  </div>
                </div>
              </div>

              {/* Performance Results */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-green-500/80 bg-black/90 backdrop-blur-xl p-6">
                {/* Strong dark background overlay for perfect contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-black/90 to-green-700/60 backdrop-blur-sm" />
                
                {/* Content with guaranteed high contrast */}
                <div className="relative z-10">
                <h3 className="text-2xl font-black text-green-400 mb-6 text-center flex items-center justify-center gap-2">
                  <Trophy className="w-6 h-6" />
                  PERFORMANCE TRANSFORMATION RESULTS
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(currentAthlete.performanceResults).map(([key, value], index) => (
                    <div key={index} className="text-center p-4 bg-black/20 rounded-lg">
                      <div className="text-green-300 font-bold mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                      <div className="text-white text-sm">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Impact Technology */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-purple-500/80 bg-black/90 backdrop-blur-xl p-6">
                {/* Strong dark background overlay for perfect contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 via-black/90 to-purple-700/60 backdrop-blur-sm" />
                
                {/* Content with guaranteed high contrast */}
                <div className="relative z-10">
                <h3 className="text-2xl font-black text-purple-400 mb-6 text-center flex items-center justify-center gap-2">
                  <Zap className="w-6 h-6" />
                  ULTRAPREPS AI MENTAL WELLNESS TECHNOLOGY
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(currentAthlete.aiImpact).map(([key, value], index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                        {key === 'monitoring' && <Activity className="w-6 h-6 text-purple-400" />}
                        {key === 'intervention' && <Shield className="w-6 h-6 text-purple-400" />}
                        {key === 'personalization' && <Target className="w-6 h-6 text-purple-400" />}
                        {key === 'prediction' && <Eye className="w-6 h-6 text-purple-400" />}
                        {key === 'optimization' && <TrendingUp className="w-6 h-6 text-purple-400" />}
                        {key === 'connection' && <Heart className="w-6 h-6 text-purple-400" />}
                      </div>
                      <div className="text-purple-400 font-bold mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                      <div className="text-white text-sm">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
              </div>

              {/* Family Testimonial */}
              <div className="ultra-card bg-gradient-to-r from-dna-blue/20 to-purple-900/20 border-dna-blue/50 text-center">
                <Heart className="w-12 h-12 text-dna-blue mx-auto mb-6" />
                <blockquote className="text-2xl text-white font-medium italic mb-6 leading-relaxed">
                  "{currentAthlete.familyQuote}"
                </blockquote>
                <cite className="text-dna-blue font-bold text-lg">
                  — {currentAthlete.parentName}
                </cite>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
          <div className="text-center ultra-section-spacing">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-6"
            >
              <h2 className="ultra-section-title">
                TRANSFORM YOUR ATHLETE'S MENTAL GAME
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Mental wellness isn't optional - it's the foundation of peak performance. Give your athlete 
                the unshakeable confidence and mental tools to dominate their sport and life.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/stadium/create"
                  className="ultra-btn-primary px-12 py-6 text-xl"
                >
                  <Brain className="w-7 h-7" />
                  Start Mental Optimization
                  <ArrowRight className="w-7 h-7" />
                </Link>
                
                <Link
                  href="/demo/championship-legacy"
                  className="ultra-btn-secondary px-12 py-6 text-xl"
                >
                  <Crown className="w-7 h-7" />
                  Create Champion Mindset
                </Link>
              </div>

              <div className="pt-8 text-sm text-white/60">
                <p>Join 8,000+ athletes who've transformed their mental game and unlocked peak performance</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}