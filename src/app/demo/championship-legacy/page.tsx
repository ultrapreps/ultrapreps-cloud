'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, Trophy, Star, Camera, Video, Eye, Heart, Clock,
  Award, Flame, Shield, Target, Users, Download, Share2,
  Zap, CheckCircle, ArrowRight, Play, Pause, RotateCcw
} from 'lucide-react';
import Link from 'next/link';

export default function ChampionshipLegacyDemo() {
  const [selectedLegacy, setSelectedLegacy] = useState(0);
  const [liveViews, setLiveViews] = useState(2847000);
  const [legacyMoments, setLegacyMoments] = useState(47892);
  const [playingMoment, setPlayingMoment] = useState(false);

  // Live legacy creation simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        setLiveViews(prev => prev + Math.floor(Math.random() * 1000) + 500);
        setLegacyMoments(prev => prev + Math.floor(Math.random() * 5) + 1);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const championshipLegacies = [
    {
      id: 1,
      athlete: 'Michael "Lightning" Rodriguez',
      sport: 'Track & Field',
      event: '2024 State Championship - 100m Final',
      location: 'Phoenix Olympic Stadium',
      date: 'May 18, 2024',
      
      theMoment: {
        description: 'Coming from lane 8, dead last at 50m, most incredible comeback in state history',
        time: '9.89 seconds - NEW STATE RECORD',
        emotion: 'Tears streaming, falling to knees, pointing to heaven',
        crowd: '47,000 people on their feet screaming',
        family: 'Dad sobbing in stands, mom fainting from emotion',
        impact: 'Moment viewed 2.4M times, featured on ESPN, SportsCenter'
      },
      
      aiCapture: {
        cameras: '12 AI-synchronized cameras capturing every angle',
        slowMotion: '8K ultra-slow motion of the finish line moment',
        audio: 'Stadium roar, heartbeat, family screams isolated and layered',
        emotion: 'Facial expression analysis showing pure joy transformation',
        data: 'Split times, acceleration curves, biomechanical perfection',
        preservation: 'Holographic recreation possible for 100+ years'
      },
      
      legacyValue: {
        personalWorth: 'Priceless family treasure forever',
        recruitment: '$347,000 in scholarship offers within 48 hours',
        inspiration: '12,000+ kids started track after watching',
        lifetime: 'Story will be told for 5 generations',
        community: 'Entire town rallied around this moment',
        global: 'International track community knows this race'
      },
      
      futureImpact: {
        college: 'Full ride to Stanford - Engineering + Track',
        olympics: '2028 Olympics team potential',
        business: 'Nike sponsorship talks already started',
        family: 'First college graduate in family history',
        legacy: 'Race will be studied in sports psychology classes',
        immortality: 'Digital preservation for eternity'
      },
      
      familyQuote: "That moment when Michael broke the tape... our entire family's destiny changed forever. UltraPreps captured it in ways that still give me chills. Our great-grandchildren will feel like they were there.",
      parentName: "Carmen Rodriguez, Michael's Mom"
    },
    
    {
      id: 2,
      athlete: 'Sarah "The Wall" Thompson',
      sport: 'Basketball',
      event: '2024 Regional Final - Game Winner',
      location: 'Madison Square Garden',
      date: 'March 12, 2024',
      
      theMoment: {
        description: '3-pointer from half court with 0.3 seconds left, down by 2, championship on the line',
        time: 'Buzzer beater from 47 feet - PERFECT SWISH',
        emotion: 'Team dog pile, confetti falling, pure disbelief and ecstasy',
        crowd: '20,000 people losing their minds, security can\'t control celebration',
        family: 'Little brother crying happy tears, grandma jumping out of wheelchair',
        impact: 'Shot replayed on every major network, became internet legend'
      },
      
      aiCapture: {
        cameras: '16 AI cameras tracked ball trajectory and crowd reaction',
        slowMotion: 'Ball rotation, net movement, facial expressions in 8K detail',
        audio: 'Swish sound, crowd explosion, heartbeat during shot attempt',
        emotion: 'Confidence transformation from doubt to pure belief captured',
        data: 'Shot arc analysis, pressure statistics, clutch performance metrics',
        preservation: 'VR recreation allows anyone to experience the moment'
      },
      
      legacyValue: {
        personalWorth: 'Most precious moment in family history',
        recruitment: '$428,000 scholarship offers from 23 schools',
        inspiration: '8,000+ girls joined basketball programs after seeing',
        lifetime: 'Shot will be legendary for generations',
        community: 'Town named street after her, statue planned',
        global: 'ESPN Classic moment, international basketball fame'
      },
      
      futureImpact: {
        college: 'UConn full ride - Business + Basketball',
        wnba: 'WNBA draft projection first round',
        business: 'Under Armour signature deal in discussion',
        family: 'Scholarship covers entire extended family education',
        legacy: 'Shot studied in sports psychology and physics classes',
        immortality: 'Moment preserved in Basketball Hall of Fame'
      },
      
      familyQuote: "When Sarah's shot went in, our whole world changed. The AI captured every emotion, every angle, every heartbeat. It's not just a basketball shot - it's our family's greatest moment, preserved forever.",
      parentName: "David Thompson, Sarah's Dad"
    },
    
    {
      id: 3,
      athlete: 'Marcus "Tank" Washington',
      sport: 'Football',
      event: '2024 Championship - Goal Line Stand',
      location: 'AT&T Stadium, Dallas',
      date: 'December 8, 2024',
      
      theMoment: {
        description: '4th down, 1 yard to go, championship on the line, Marcus stops 250lb running back cold',
        time: '2:47 remaining - STUFFED AT THE LINE',
        emotion: 'Primal scream, team celebration, pure warrior spirit unleashed',
        crowd: '80,000 people shaking the stadium, earthquake registers on seismograph',
        family: 'Single mom weeping with pride, siblings going crazy',
        impact: 'Hit replayed globally, featured in NFL analysis shows'
      },
      
      aiCapture: {
        cameras: '24 AI cameras captured impact from every conceivable angle',
        slowMotion: 'Collision physics, muscle engagement, determination in eyes',
        audio: 'Helmet crack, crowd roar, teammates screaming support',
        emotion: 'Fear transformation to unstoppable confidence captured',
        data: 'Impact force, tackling technique, leadership under pressure',
        preservation: 'Physics professors use this to teach momentum and force'
      },
      
      legacyValue: {
        personalWorth: 'Defining moment of competitive spirit',
        recruitment: '$512,000 in scholarship offers from 31 schools',
        inspiration: '15,000+ kids joined football after watching',
        lifetime: 'Play will be shown on championship anniversary forever',
        community: 'Inner city kids see dreams are possible',
        global: 'International football coaches study this tackle'
      },
      
      futureImpact: {
        college: 'Alabama full ride - Engineering + Football',
        nfl: 'NFL scouts already taking meetings',
        business: 'Nike equipment endorsement signed',
        family: 'First in family to escape poverty cycle',
        legacy: 'Play studied in sports biomechanics research',
        immortality: 'Tackle preserved in Football Hall of Fame archives'
      },
      
      familyQuote: "That tackle saved our championship and changed Marcus's life forever. UltraPreps captured the heart, soul, and power of my son's greatest moment. We watch it every day and still get goosebumps.",
      parentName: "Keisha Washington, Marcus's Mom"
    }
  ];

  const currentLegacy = championshipLegacies[selectedLegacy];

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
              <Crown className="w-12 h-12 text-dna-gold" />
              <h1 className="ultra-hero-text">
                IMMORTAL CHAMPIONSHIP MOMENTS
              </h1>
              <Trophy className="w-12 h-12 text-dna-gold" />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-medium mb-8"
            >
              These aren't just highlights - they're **legendary moments preserved forever** with AI precision. 
              Watch families create **priceless treasures** that will inspire 5 generations.
            </motion.p>

            {/* Live Legacy Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="ultra-card bg-gradient-to-r from-dna-gold/20 to-dna-orange/20 border-dna-gold/50 max-w-5xl mx-auto mb-16"
            >
              <h3 className="ultra-card-title mb-6 flex items-center justify-center gap-2">
                <Flame className="w-6 h-6 text-dna-gold" />
                LIVE LEGACY MOMENTS BEING CREATED
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">{liveViews.toLocaleString()}</div>
                  <div className="text-sm text-white/70">Views This Month</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">{legacyMoments.toLocaleString()}</div>
                  <div className="text-sm text-white/70">Moments Preserved</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">∞</div>
                  <div className="text-sm text-white/70">Years Preserved</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">47</div>
                  <div className="text-sm text-white/70">Legendary Moments Daily</div>
                </div>
              </div>
            </motion.div>

            {/* Legacy Selector */}
            <div className="flex justify-center gap-4 mb-12">
              {championshipLegacies.map((legacy, index) => (
                <button
                  key={legacy.id}
                  onClick={() => setSelectedLegacy(index)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    selectedLegacy === index
                      ? 'bg-dna-gold text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {legacy.athlete.split(' ')[0]}
                  <div className="text-xs opacity-70">{legacy.sport}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Championship Legacy Story */}
        <div className="ultra-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLegacy}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* The Legendary Moment */}
              <div className="ultra-card bg-gradient-to-r from-dna-gold/30 to-dna-orange/20 border-dna-gold/50">
                <div className="text-center mb-8">
                  <h3 className="text-4xl font-black text-dna-gold mb-4">{currentLegacy.athlete}</h3>
                  <div className="text-xl text-white font-bold mb-2">{currentLegacy.event}</div>
                  <div className="text-dna-gold font-bold">{currentLegacy.location} • {currentLegacy.date}</div>
                </div>
                
                {/* Video Player Mockup */}
                <div className="bg-black rounded-xl p-4 mb-6">
                  <div className="aspect-video bg-gradient-to-br from-dna-gold/20 to-dna-orange/20 rounded-lg flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-black/50 rounded-lg" />
                    <button
                      onClick={() => setPlayingMoment(!playingMoment)}
                      className="relative z-10 w-20 h-20 bg-dna-gold rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                    >
                      {playingMoment ? (
                        <Pause className="w-10 h-10 text-black" />
                      ) : (
                        <Play className="w-10 h-10 text-black ml-1" />
                      )}
                    </button>
                    <div className="absolute bottom-4 left-4 text-white font-bold">
                      THE MOMENT THAT CHANGED EVERYTHING
                    </div>
                    <div className="absolute bottom-4 right-4 text-dna-gold font-bold">
                      2.4M VIEWS
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-dna-gold font-bold mb-3">THE LEGENDARY MOMENT</h4>
                    <div className="text-white space-y-2 text-sm">
                      <div><strong>What Happened:</strong> {currentLegacy.theMoment.description}</div>
                      <div><strong>The Result:</strong> {currentLegacy.theMoment.time}</div>
                      <div><strong>Athlete Reaction:</strong> {currentLegacy.theMoment.emotion}</div>
                      <div><strong>Crowd:</strong> {currentLegacy.theMoment.crowd}</div>
                      <div><strong>Family:</strong> {currentLegacy.theMoment.family}</div>
                      <div><strong>Global Impact:</strong> {currentLegacy.theMoment.impact}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-dna-gold font-bold mb-3">AI CAPTURE TECHNOLOGY</h4>
                    <div className="text-white space-y-2 text-sm">
                      <div><strong>Camera Array:</strong> {currentLegacy.aiCapture.cameras}</div>
                      <div><strong>Slow Motion:</strong> {currentLegacy.aiCapture.slowMotion}</div>
                      <div><strong>Audio Design:</strong> {currentLegacy.aiCapture.audio}</div>
                      <div><strong>Emotion Mapping:</strong> {currentLegacy.aiCapture.emotion}</div>
                      <div><strong>Data Analytics:</strong> {currentLegacy.aiCapture.data}</div>
                      <div><strong>Future Tech:</strong> {currentLegacy.aiCapture.preservation}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legacy Value Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Personal Legacy */}
                <div className="relative overflow-hidden rounded-2xl border-2 border-purple-500/80 bg-black/90 backdrop-blur-xl p-6">
                  {/* Strong dark background overlay for perfect contrast */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-black/90 to-purple-700/60 backdrop-blur-sm" />
                  
                  {/* Content with guaranteed high contrast */}
                  <div className="relative z-10">
                  <h3 className="text-2xl font-black text-purple-400 mb-6 flex items-center gap-2">
                    <Heart className="w-6 h-6" />
                    PERSONAL LEGACY
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <div className="text-purple-300 font-bold">Family Treasure</div>
                      <div className="text-white">{currentLegacy.legacyValue.personalWorth}</div>
                    </div>
                    <div>
                      <div className="text-purple-300 font-bold">Recruitment Impact</div>
                      <div className="text-white">{currentLegacy.legacyValue.recruitment}</div>
                    </div>
                    <div>
                      <div className="text-purple-300 font-bold">Community Inspiration</div>
                      <div className="text-white">{currentLegacy.legacyValue.inspiration}</div>
                    </div>
                    <div>
                      <div className="text-purple-300 font-bold">Generational Story</div>
                      <div className="text-white">{currentLegacy.legacyValue.lifetime}</div>
                    </div>
                  </div>
                </div>

                {/* Global Impact */}
                <div className="ultra-card border-dna-blue/50 bg-gradient-to-br from-dna-blue/30 to-blue-700/20">
                  <h3 className="text-2xl font-black text-dna-blue mb-6 flex items-center gap-2">
                    <Star className="w-6 h-6" />
                    GLOBAL IMPACT
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <div className="text-dna-blue font-bold">Community Pride</div>
                      <div className="text-white">{currentLegacy.legacyValue.community}</div>
                    </div>
                    <div>
                      <div className="text-dna-blue font-bold">International Fame</div>
                      <div className="text-white">{currentLegacy.legacyValue.global}</div>
                    </div>
                    <div>
                      <div className="text-dna-blue font-bold">College Destination</div>
                      <div className="text-white">{currentLegacy.futureImpact.college}</div>
                    </div>
                    <div>
                      <div className="text-dna-blue font-bold">Professional Path</div>
                      <div className="text-white">{currentLegacy.futureImpact.olympics || currentLegacy.futureImpact.wnba || currentLegacy.futureImpact.nfl}</div>
                    </div>
                  </div>
                </div>

                {/* Future Legacy */}
                <div className="relative overflow-hidden rounded-2xl border-2 border-green-500/80 bg-black/90 backdrop-blur-xl p-6">
                  {/* Strong dark background overlay for perfect contrast */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-black/90 to-green-700/60 backdrop-blur-sm" />
                  
                  {/* Content with guaranteed high contrast */}
                  <div className="relative z-10">
                  <h3 className="text-2xl font-black text-green-400 mb-6 flex items-center gap-2">
                    <Crown className="w-6 h-6" />
                    FUTURE LEGACY
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <div className="text-green-300 font-bold">Business Opportunities</div>
                      <div className="text-white">{currentLegacy.futureImpact.business}</div>
                    </div>
                    <div>
                      <div className="text-green-300 font-bold">Family Impact</div>
                      <div className="text-white">{currentLegacy.futureImpact.family}</div>
                    </div>
                    <div>
                      <div className="text-green-300 font-bold">Academic Study</div>
                      <div className="text-white">{currentLegacy.futureImpact.legacy}</div>
                    </div>
                    <div>
                      <div className="text-green-300 font-bold">Digital Immortality</div>
                      <div className="text-white">{currentLegacy.futureImpact.immortality}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Family Testimonial */}
              <div className="ultra-card bg-gradient-to-r from-dna-gold/20 to-dna-orange/20 border-dna-gold/50 text-center">
                <Camera className="w-12 h-12 text-dna-gold mx-auto mb-6" />
                <blockquote className="text-2xl text-white font-medium italic mb-6 leading-relaxed">
                  "{currentLegacy.familyQuote}"
                </blockquote>
                <cite className="text-dna-gold font-bold text-lg">
                  — {currentLegacy.parentName}
                </cite>
              </div>

              {/* AI Technology Showcase */}
              <div className="ultra-card bg-gradient-to-r from-dna-blue/30 to-purple-900/30 border-dna-blue/50">
                <h3 className="text-2xl font-black text-dna-blue mb-6 text-center flex items-center justify-center gap-2">
                  <Zap className="w-6 h-6" />
                  ULTRAPREPS AI LEGACY TECHNOLOGY
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <Video className="w-8 h-8 text-dna-blue mx-auto mb-2" />
                    <div className="text-dna-blue font-bold">Multi-Angle Capture</div>
                    <div className="text-white text-sm">24+ AI cameras sync perfectly</div>
                  </div>
                  <div className="text-center">
                    <Eye className="w-8 h-8 text-dna-blue mx-auto mb-2" />
                    <div className="text-dna-blue font-bold">Emotion Recognition</div>
                    <div className="text-white text-sm">AI maps joy, determination, triumph</div>
                  </div>
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-dna-blue mx-auto mb-2" />
                    <div className="text-dna-blue font-bold">Perfect Timing</div>
                    <div className="text-white text-sm">Never miss the crucial moment</div>
                  </div>
                  <div className="text-center">
                    <Shield className="w-8 h-8 text-dna-blue mx-auto mb-2" />
                    <div className="text-dna-blue font-bold">Forever Preservation</div>
                    <div className="text-white text-sm">Quantum storage for eternity</div>
                  </div>
                </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Call to Action */}
          <div className="text-center ultra-section-spacing">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-6"
            >
              <h2 className="ultra-section-title">
                CREATE YOUR FAMILY'S IMMORTAL MOMENT
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Every championship moment deserves legendary preservation. Don't let your athlete's 
                greatest achievements fade into memory. Capture them with AI precision forever.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/stadium/create"
                  className="ultra-btn-primary px-12 py-6 text-xl"
                >
                  <Crown className="w-7 h-7" />
                  Start Creating Legends
                  <ArrowRight className="w-7 h-7" />
                </Link>
                
                <Link
                  href="/demo/nil-wealth-engine"
                  className="ultra-btn-secondary px-12 py-6 text-xl"
                >
                  <Star className="w-7 h-7" />
                  Build Athletic Empire
                </Link>
              </div>

              <div className="pt-8 text-sm text-white/60">
                <p>Join 47,000+ families preserving their greatest athletic moments with AI precision</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}