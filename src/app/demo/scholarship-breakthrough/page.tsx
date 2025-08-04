'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, Trophy, DollarSign, Star, Heart, Phone, Mail,
  TrendingUp, Zap, CheckCircle, ArrowRight, Eye, Camera,
  Award, Flame, Shield, Target, Users, Clock, Video
} from 'lucide-react';
import Link from 'next/link';
import HighlightText from '../../../components/HighlightText';

export default function ScholarshipBreakthroughDemo() {
  const [selectedAthlete, setSelectedAthlete] = useState(0);
  const [liveOffers, setLiveOffers] = useState(47);
  const [totalScholarships, setTotalScholarships] = useState(8247000);
  const [liveMoment, setLiveMoment] = useState(0);

  // Live recruiting simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMoment(prev => (prev + 1) % 100);
      if (Math.random() < 0.2) {
        setLiveOffers(prev => prev + 1);
        setTotalScholarships(prev => prev + 25000);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const lifeBangingMoments = [
    {
      id: 1,
      name: 'Destiny Williams',
      sport: 'Basketball',
      position: 'Point Guard',
      school: 'Lincoln High School',
      location: 'Detroit, MI',
      familyIncome: '$31,000',
      parentJob: 'Single mom, nurse aide',
      
      beforeMoment: {
        hope: 'Maybe community college if we save enough',
        stress: 'Working 3 jobs to afford basic gear',
        future: 'Probably student loans and debt forever',
        gpa: 3.2,
        ranking: 'Unknown outside local league'
      },
      
      theCall: {
        date: 'March 15, 2024',
        time: '6:47 PM',
        caller: 'Coach Dawn Staley - University of South Carolina',
        offer: 'FULL RIDE + $5,000 STIPEND',
        totalValue: '$287,000',
        duration: '4 years guaranteed',
        extras: 'Academic support, housing, meals, books, travel'
      },
      
      theMoment: {
        familyReaction: 'Mom literally collapsed crying in the kitchen',
        neighborhood: 'Entire block came outside cheering',
        quote: "Coach Staley said my AI-generated highlights made me impossible to ignore. Three generations of our family just got saved.",
        impact: 'First in family to go to college, breaking poverty cycle forever'
      },
      
      ultraPrepsImpact: {
        visibility: '2.4M coach views on AI-generated highlights',
        optimization: 'AI found her perfect position match',
        timing: 'Platform identified recruiting window perfectly',
        content: '47 professional-quality game films auto-generated',
        networking: 'Connected with 23 D1 coaches through platform'
      },
      
      futureProjection: {
        college: 'University of South Carolina - Full Ride',
        major: 'Sports Medicine',
        careerEarnings: '$2.8M lifetime projected',
        familyWealth: 'From poverty to middle class in 4 years',
        legacy: 'Inspiring 200+ kids in her neighborhood'
      }
    },
    
    {
      id: 2,
      name: 'Carlos Mendoza',
      sport: 'Football',
      position: 'Linebacker',
      school: 'East Valley High',
      location: 'Fresno, CA',
      familyIncome: '$24,000',
      parentJob: 'Dad works fields, mom cleans offices',
      
      beforeMoment: {
        hope: 'Maybe junior college if lucky',
        stress: 'No money for showcase camps or training',
        future: 'Expected to work fields after graduation',
        gpa: 2.9,
        ranking: 'Zero stars, completely unknown'
      },
      
      theCall: {
        date: 'December 20, 2023',
        time: '4:23 PM',
        caller: 'Coach Mario Cristobal - University of Miami',
        offer: 'FULL SCHOLARSHIP',
        totalValue: '$312,000',
        duration: '4 years + potential 5th year',
        extras: 'Family travel budget, summer training stipend'
      },
      
      theMoment: {
        familyReaction: 'Dad dropped to knees, thanked God in Spanish for 10 minutes',
        neighborhood: 'News crew came to interview the family',
        quote: "UltraPreps AI made my son visible when no scout would drive to our town. We went from invisible to scholarship in 8 months.",
        impact: 'First scholarship athlete in town history'
      },
      
      ultraPrepsImpact: {
        visibility: '1.8M coach views across all platforms',
        optimization: 'AI identified elite tackling technique patterns',
        timing: 'Got him seen during peak recruiting period',
        content: '34 AI-enhanced highlight reels created',
        networking: 'Direct communication with 31 college programs'
      },
      
      futureProjection: {
        college: 'University of Miami - Full Ride',
        major: 'Business Administration',
        careerEarnings: '$3.2M lifetime (NFL potential)',
        familyWealth: 'Bought parents their first house',
        legacy: 'Inspiring entire immigrant community'
      }
    },
    
    {
      id: 3,
      name: 'Aiden Foster',
      sport: 'Track & Field',
      position: '400m/800m Runner',
      school: 'Rural Mountain High',
      location: 'Nowhere, WV',
      familyIncome: '$19,000',
      parentJob: 'Coal miner family, mine closed',
      
      beforeMoment: {
        hope: 'Maybe get a job at the remaining mine',
        stress: 'No track facilities, trains on mountain roads',
        future: 'Generational poverty cycle continues',
        gpa: 3.7,
        ranking: 'Fast but completely unseen by recruiters'
      },
      
      theCall: {
        date: 'May 8, 2024',
        time: '7:15 PM',
        caller: 'Coach Wayne Tinkle - Oregon State',
        offer: 'FULL ACADEMIC + ATHLETIC SCHOLARSHIP',
        totalValue: '$294,000',
        duration: '4 years guaranteed',
        extras: 'Pre-med track support, lab internships'
      },
      
      theMoment: {
        familyReaction: 'Grandpa cried - first time family saw him emotional',
        neighborhood: 'Town of 800 people threw parade',
        quote: "Coach said Aiden's AI-tracked times and training data showed elite potential hidden in the mountains. UltraPreps gave my son wings.",
        impact: 'Breaking 4-generation cycle of poverty'
      },
      
      ultraPrepsImpact: {
        visibility: '897K views from D1 track coaches',
        optimization: 'AI tracked micro-improvements showing elite trajectory',
        timing: 'Platform got attention during recruiting peak',
        content: '28 training progression videos auto-generated',
        networking: 'Connected with 18 track programs nationally'
      },
      
      futureProjection: {
        college: 'Oregon State - Pre-Med Track',
        major: 'Pre-Medicine',
        careerEarnings: '$4.1M lifetime as doctor',
        familyWealth: 'From coal poverty to doctor family',
        legacy: 'First doctor from his county in 30 years'
      }
    }
  ];

  const currentAthlete = lifeBangingMoments[selectedAthlete];

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
              <Trophy className="w-12 h-12 text-dna-gold" />
              <h1 className="ultra-hero-text">
                THE PHONE CALL THAT CHANGED EVERYTHING
              </h1>
              <Crown className="w-12 h-12 text-dna-gold" />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-medium mb-8"
            >
              These aren't just scholarships - they're **family salvation moments**. 
              <HighlightText>
                **poverty to prosperity**
              </HighlightText>
            </motion.p>

            {/* Live Recruiting Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="ultra-card bg-gradient-to-r from-dna-gold/20 to-dna-orange/20 border-dna-gold/50 max-w-5xl mx-auto mb-16"
            >
              <h3 className="ultra-card-title mb-6 flex items-center justify-center gap-2">
                <Flame className="w-6 h-6 text-dna-gold" />
                LIVE SCHOLARSHIP OFFERS RIGHT NOW
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">${totalScholarships.toLocaleString()}</div>
                  <div className="text-sm text-white/70">Won This Month</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">{liveOffers}</div>
                  <div className="text-sm text-white/70">Offers Made Today</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">97%</div>
                  <div className="text-sm text-white/70">Get Full Rides</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">18</div>
                  <div className="text-sm text-white/70">Families Saved Today</div>
                </div>
              </div>
            </motion.div>

            {/* Athlete Selector */}
            <div className="flex justify-center gap-4 mb-12">
              {lifeBangingMoments.map((athlete, index) => (
                <button
                  key={athlete.id}
                  onClick={() => setSelectedAthlete(index)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    selectedAthlete === index
                      ? 'bg-dna-gold text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {athlete.name}
                  <div className="text-xs opacity-70">{athlete.sport}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* The Life-Changing Story */}
        <div className="ultra-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedAthlete}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Athlete Profile */}
              <div className="ultra-card bg-gradient-to-r from-dna-blue/30 to-purple-900/30 border-dna-blue/50">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-4">{currentAthlete.name}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-dna-blue font-bold">Sport</div>
                        <div className="text-white">{currentAthlete.sport} - {currentAthlete.position}</div>
                      </div>
                      <div>
                        <div className="text-dna-blue font-bold">School</div>
                        <div className="text-white">{currentAthlete.school}</div>
                      </div>
                      <div>
                        <div className="text-dna-blue font-bold">Location</div>
                        <div className="text-white">{currentAthlete.location}</div>
                      </div>
                      <div>
                        <div className="text-dna-blue font-bold">Family Income</div>
                        <div className="text-white">{currentAthlete.familyIncome}</div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="text-dna-blue font-bold mb-2">Parent Background</div>
                      <div className="text-white/80">{currentAthlete.parentJob}</div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-dna-gold to-dna-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Trophy className="w-16 h-16 text-dna-gold" />
                    </div>
                    <div className="text-dna-gold font-bold text-lg">SCHOLARSHIP WINNER</div>
                    <div className="text-3xl font-black text-white">{currentAthlete.theCall.totalValue}</div>
                  </div>
                </div>
              </div>

              {/* Before the Call */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="relative overflow-hidden rounded-2xl border-2 border-red-500/80 bg-black/90 backdrop-blur-xl p-6">
                  {/* Strong dark background overlay for perfect contrast */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/70 via-black/90 to-red-700/60 backdrop-blur-sm" />
                  
                  {/* Content with guaranteed high contrast */}
                  <div className="relative z-10">
                  <h3 className="text-2xl font-black text-red-400 mb-6 flex items-center gap-2">
                    <Heart className="w-6 h-6" />
                    BEFORE: THE STRUGGLE
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-red-300 font-bold text-sm">Family Hope</div>
                      <div className="text-white italic">"{currentAthlete.beforeMoment.hope}"</div>
                    </div>
                    <div>
                      <div className="text-red-300 font-bold text-sm">Daily Reality</div>
                      <div className="text-white italic">"{currentAthlete.beforeMoment.stress}"</div>
                    </div>
                    <div>
                      <div className="text-red-300 font-bold text-sm">Expected Future</div>
                      <div className="text-white italic">"{currentAthlete.beforeMoment.future}"</div>
                    </div>
                    <div>
                      <div className="text-red-300 font-bold text-sm">Recruiting Status</div>
                      <div className="text-white">{currentAthlete.beforeMoment.ranking}</div>
                    </div>
                  </div>
                </div>

                {/* The Call That Changed Everything */}
                <div className="ultra-card border-dna-gold/50 bg-gradient-to-br from-dna-gold/30 to-dna-orange/20">
                  <h3 className="text-2xl font-black text-dna-gold mb-6 flex items-center gap-2">
                    <Phone className="w-6 h-6" />
                    THE CALL THAT SAVED A FAMILY
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-dna-gold font-bold text-sm">Date & Time</div>
                      <div className="text-white font-bold">{currentAthlete.theCall.date} at {currentAthlete.theCall.time}</div>
                    </div>
                    <div>
                      <div className="text-dna-gold font-bold text-sm">Who Called</div>
                      <div className="text-white font-bold">{currentAthlete.theCall.caller}</div>
                    </div>
                    <div>
                      <div className="text-dna-gold font-bold text-sm">The Offer</div>
                      <div className="text-2xl font-black text-dna-gold">{currentAthlete.theCall.offer}</div>
                    </div>
                    <div>
                      <div className="text-dna-gold font-bold text-sm">Total Value</div>
                      <div className="text-3xl font-black text-white">{currentAthlete.theCall.totalValue}</div>
                    </div>
                    <div>
                      <div className="text-dna-gold font-bold text-sm">Includes</div>
                      <div className="text-white text-sm">{currentAthlete.theCall.extras}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Moment */}
                              <div className="relative overflow-hidden rounded-2xl border-2 border-green-500/80 bg-black/90 backdrop-blur-xl p-6">
                  {/* Strong dark background overlay for perfect contrast */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-black/90 to-green-700/60 backdrop-blur-sm" />
                  
                  {/* Content with guaranteed high contrast */}
                  <div className="relative z-10">
                <h3 className="text-3xl font-black text-green-400 mb-6 text-center flex items-center justify-center gap-2">
                  <Zap className="w-8 h-8" />
                  THE MOMENT EVERYTHING CHANGED
                </h3>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-green-300 font-bold mb-2">Family Reaction</div>
                    <div className="text-white">{currentAthlete.theMoment.familyReaction}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-300 font-bold mb-2">Community Impact</div>
                    <div className="text-white">{currentAthlete.theMoment.neighborhood}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-300 font-bold mb-2">Life Impact</div>
                    <div className="text-white">{currentAthlete.theMoment.impact}</div>
                  </div>
                </div>
                
                <blockquote className="text-2xl text-green-100 font-medium italic text-center leading-relaxed border-t border-green-500/30 pt-6">
                  "{currentAthlete.theMoment.quote}"
                </blockquote>
              </div>
              </div>

              {/* UltraPreps Impact */}
              <div className="ultra-card bg-gradient-to-r from-dna-blue/30 to-purple-900/30 border-dna-blue/50">
                <h3 className="text-2xl font-black text-dna-blue mb-6 text-center flex items-center justify-center gap-2">
                  <Eye className="w-6 h-6" />
                  HOW ULTRAPREPS MADE THIS POSSIBLE
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-dna-blue mx-auto mb-2" />
                    <div className="text-dna-blue font-bold">Visibility Created</div>
                    <div className="text-white text-sm">{currentAthlete.ultraPrepsImpact.visibility}</div>
                  </div>
                  <div className="text-center">
                    <Target className="w-8 h-8 text-dna-blue mx-auto mb-2" />
                    <div className="text-dna-blue font-bold">AI Optimization</div>
                    <div className="text-white text-sm">{currentAthlete.ultraPrepsImpact.optimization}</div>
                  </div>
                  <div className="text-center">
                    <Clock className="w-8 h-8 text-dna-blue mx-auto mb-2" />
                    <div className="text-dna-blue font-bold">Perfect Timing</div>
                    <div className="text-white text-sm">{currentAthlete.ultraPrepsImpact.timing}</div>
                  </div>
                  <div className="text-center">
                    <Video className="w-8 h-8 text-dna-blue mx-auto mb-2" />
                    <div className="text-dna-blue font-bold">Content Created</div>
                    <div className="text-white text-sm">{currentAthlete.ultraPrepsImpact.content}</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-8 h-8 text-dna-blue mx-auto mb-2" />
                    <div className="text-dna-blue font-bold">Networking</div>
                    <div className="text-white text-sm">{currentAthlete.ultraPrepsImpact.networking}</div>
                  </div>
                  <div className="text-center">
                    <Shield className="w-8 h-8 text-dna-blue mx-auto mb-2" />
                    <div className="text-dna-blue font-bold">Success Guarantee</div>
                    <div className="text-white text-sm">Platform guaranteed visibility</div>
                  </div>
                </div>
              </div>

              {/* Future Projection */}
              <div className="ultra-card bg-gradient-to-r from-dna-gold/20 to-dna-orange/20 border-dna-gold/50">
                <h3 className="text-2xl font-black text-dna-gold mb-6 text-center flex items-center justify-center gap-2">
                  <Star className="w-6 h-6" />
                  THE GENERATIONAL WEALTH CREATED
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-dna-gold font-bold">College Destination</div>
                    <div className="text-white font-bold">{currentAthlete.futureProjection.college}</div>
                  </div>
                  <div>
                    <div className="text-dna-gold font-bold">Career Path</div>
                    <div className="text-white font-bold">{currentAthlete.futureProjection.major}</div>
                  </div>
                  <div>
                    <div className="text-dna-gold font-bold">Lifetime Earnings</div>
                    <div className="text-2xl font-black text-dna-gold">{currentAthlete.futureProjection.careerEarnings}</div>
                  </div>
                  <div>
                    <div className="text-dna-gold font-bold">Legacy Impact</div>
                    <div className="text-white">{currentAthlete.futureProjection.legacy}</div>
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
                YOUR PHONE CALL IS WAITING
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Every day you wait is potential scholarship money lost. Don't let your child be the hidden gem 
                that never gets discovered. Start building their recruiting visibility today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/stadium/create"
                  className="ultra-btn-primary px-12 py-6 text-xl"
                >
                  <Trophy className="w-7 h-7" />
                  Start Getting Recruited Now
                  <ArrowRight className="w-7 h-7" />
                </Link>
                
                <Link
                  href="/demo/academic-transformation"
                  className="ultra-btn-secondary px-12 py-6 text-xl"
                >
                  <Star className="w-7 h-7" />
                  See Academic Success
                </Link>
              </div>

              <div className="pt-8 text-sm text-white/60">
                <p>Join 12,000+ families who've received life-changing scholarship offers through UltraPreps</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}