'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, DollarSign, TrendingUp, Star, Zap, Trophy, 
  Target, CheckCircle, ArrowRight, Eye, Camera, Award,
  Flame, Shield, Users, Clock, Building, Briefcase, Heart
} from 'lucide-react';
import Link from 'next/link';

export default function NILWealthEngineDemo() {
  const [selectedAthlete, setSelectedAthlete] = useState(0);
  const [liveDeals, setLiveDeals] = useState(127);
  const [totalNILValue, setTotalNILValue] = useState(3247000);
  const [wealthAnimation, setWealthAnimation] = useState(0);

  // Live NIL deals simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setWealthAnimation(prev => (prev + 1) % 100);
      if (Math.random() < 0.15) {
        setLiveDeals(prev => prev + 1);
        setTotalNILValue(prev => prev + Math.floor(Math.random() * 50000) + 15000);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const nilSuccessStories = [
    {
      id: 1,
      name: 'Isabella "Izzy" Chen',
      sport: 'Soccer',
      position: 'Forward',
      school: 'Pacific Coast High',
      location: 'San Diego, CA',
      age: 17,
      followers: '2.4M',
      
      beforeNIL: {
        income: '$0',
        familyStruggle: 'Parents working 2 jobs each to afford club soccer',
        equipment: 'Using borrowed gear, worn-out cleats',
        future: 'Hoping for partial scholarship, massive student debt expected',
        stress: 'Almost quit soccer due to financial pressure'
      },
      
      nilPortfolio: {
        totalAnnual: '$347,000',
        topDeals: [
          { brand: 'Nike Soccer', value: '$125,000', duration: '2 years', type: 'Equipment & Content' },
          { brand: 'Gatorade', value: '$89,000', duration: '18 months', type: 'Performance Partner' },
          { brand: 'EA Sports FC', value: '$67,000', duration: '1 year', type: 'Gaming Ambassador' },
          { brand: 'Local Toyota Dealership', value: '$36,000', duration: '1 year', type: 'Community Partner' },
          { brand: 'Chipotle', value: '$24,000', duration: '6 months', type: 'Nutrition Partner' },
          { brand: 'Under Armour Training', value: '$18,000', duration: '1 year', type: 'Fitness Content' }
        ],
        passiveIncome: '$12,000/month from content licensing',
        projectedLifetime: '$2.8M through college'
      },
      
      wealthTransformation: {
        personalSavings: '$178,000 in 18 months',
        familyDebt: 'Paid off parents\' $47,000 in debt',
        investments: '$89,000 in index funds and college savings',
        realEstate: 'Down payment saved for family home',
        futureValue: '$8.2M projected career earnings',
        generational: 'Set up college funds for younger siblings'
      },
      
      ultraPrepsImpact: {
        contentOptimization: 'AI created 347 viral posts generating 24M views',
        brandMatching: 'Platform matched her with 23 perfect brand partners',
        dealNegotiation: 'AI optimized contracts for 40% higher value',
        globalReach: 'Content translated and distributed to 47 countries',
        timing: 'Launched NIL strategy during peak recruiting season'
      },
      
      familyQuote: "Izzy went from us barely affording soccer to her supporting our entire family. UltraPreps made our daughter a business empire at 17.",
      parentName: "David Chen, Izzy's Dad"
    },
    
    {
      id: 2,
      name: 'Marcus "Tank" Johnson',
      sport: 'Football',
      position: 'Defensive End',
      school: 'Motor City Prep',
      location: 'Detroit, MI',
      age: 18,
      followers: '1.8M',
      
      beforeNIL: {
        income: '$0',
        familyStruggle: 'Single mom, two jobs, struggling with rent',
        equipment: 'Community donated old equipment',
        future: 'College maybe, but family needs income now',
        stress: 'Considering skipping college to work and help family'
      },
      
      nilPortfolio: {
        totalAnnual: '$419,000',
        topDeals: [
          { brand: 'Nike Football', value: '$156,000', duration: '2 years', type: 'Signature Gear Line' },
          { brand: 'Muscle Milk', value: '$78,000', duration: '2 years', type: 'Nutrition Ambassador' },
          { brand: 'Madden NFL', value: '$65,000', duration: '1 year', type: 'Gaming Content Creator' },
          { brand: 'Ford Detroit', value: '$43,000', duration: '18 months', type: 'Local Pride Campaign' },
          { brand: 'Beats by Dre', value: '$38,000', duration: '1 year', type: 'Music & Motivation' },
          { brand: 'ESPN+', value: '$29,000', duration: '6 months', type: 'Documentary Feature' },
          { brand: 'Dick\'s Sporting Goods', value: '$22,000', duration: '1 year', type: 'Equipment Ambassador' }
        ],
        passiveIncome: '$18,000/month from training content',
        projectedLifetime: '$3.7M through college + NFL potential'
      },
      
      wealthTransformation: {
        personalSavings: '$267,000 in 14 months',
        familyDebt: 'Paid off mom\'s student loans $23,000',
        investments: '$134,000 in diversified portfolio',
        realEstate: 'Bought mom a house - $180,000 down payment',
        futureValue: '$15.3M projected career earnings (NFL potential)',
        generational: 'First generational wealth in family history'
      },
      
      ultraPrepsImpact: {
        contentOptimization: 'AI generated 289 training videos with 18M views',
        brandMatching: 'Platform connected him with 31 interested brands',
        dealNegotiation: 'AI contract analysis increased deal value by 52%',
        globalReach: 'Training content licensed internationally',
        timing: 'Maximized senior year visibility for peak NIL value'
      },
      
      familyQuote: "Marcus bought us our first house before he even graduated high school. My son became the family hero through UltraPreps NIL coaching.",
      parentName: "Keisha Johnson, Marcus's Mom"
    },
    
    {
      id: 3,
      name: 'Sophia Rodriguez',
      sport: 'Basketball',
      position: 'Point Guard',
      school: 'Valley Vista Academy',
      location: 'Phoenix, AZ',
      age: 16,
      followers: '3.1M',
      
      beforeNIL: {
        income: '$0',
        familyStruggle: 'Dad\'s construction business struggling, mom\'s salon closed',
        equipment: 'Hand-me-down basketball shoes and gear',
        future: 'Family considering moving for cheaper housing',
        stress: 'Basketball almost secondary to family survival'
      },
      
      nilPortfolio: {
        totalAnnual: '$523,000',
        topDeals: [
          { brand: 'Jordan Brand', value: '$198,000', duration: '3 years', type: 'Signature Shoe Partnership' },
          { brand: 'Powerade', value: '$87,000', duration: '2 years', type: 'Hydration Ambassador' },
          { brand: 'NBA 2K', value: '$76,000', duration: '18 months', type: 'Gaming & Streaming' },
          { brand: 'Phoenix Suns Community', value: '$54,000', duration: '2 years', type: 'Youth Development' },
          { brand: 'Lululemon', value: '$43,000', duration: '1 year', type: 'Athleisure Collection' },
          { brand: 'State Farm', value: '$35,000', duration: '1 year', type: 'Good Neighbor Campaign' },
          { brand: 'Apple Fitness+', value: '$28,000', duration: '6 months', type: 'Training Content' }
        ],
        passiveIncome: '$21,000/month from skill tutorials and endorsements',
        projectedLifetime: '$4.2M through college + WNBA potential'
      },
      
      wealthTransformation: {
        personalSavings: '$312,000 in 16 months',
        familyDebt: 'Paid off family business debt $89,000',
        investments: '$156,000 in growth stocks and real estate',
        realEstate: 'Bought family a new home and dad a work truck',
        futureValue: '$12.8M projected career earnings (WNBA + international)',
        generational: 'Set up trust funds for future family education'
      },
      
      ultraPrepsImpact: {
        contentOptimization: 'AI created 412 skill videos generating 31M views',
        brandMatching: 'Platform identified 29 perfect brand alignments',
        dealNegotiation: 'AI analysis resulted in 47% higher contract values',
        globalReach: 'Content viral in 23 countries, international deals pending',
        timing: 'Strategic rollout maximized early adoption advantage'
      },
      
      familyQuote: "Sophia saved our family business and bought us a home before junior year. UltraPreps turned our daughter into a teenage millionaire.",
      parentName: "Carmen Rodriguez, Sophia's Mom"
    }
  ];

  const currentAthlete = nilSuccessStories[selectedAthlete];

  return (
    <div className="ultra-page-layout">
      {/* Standardized Stadium Background */}
      <div className="absolute inset-0 ultra-stadium-bg" />
      
      {/* Standardized Overlays */}
      <div className="absolute inset-0 ultra-overlay-primary" />
      <div className="absolute inset-0 ultra-overlay-secondary" />

      {/* Header */}
      <div className="ultra-content-wrapper">
        <div className="ultra-container text-white">
          <div className="text-center ultra-section-spacing">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <Crown className="w-12 h-12 text-dna-gold" />
              <h1 className="ultra-hero-text text-white">
                TEENAGE MILLIONAIRES MADE HERE
              </h1>
              <DollarSign className="w-12 h-12 text-dna-gold" />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-medium mb-8"
            >
              Watch high school athletes build **$500K+ annual empires** through AI-optimized NIL deals. 
              This isn't pocket money - it's **generational wealth creation** at 17.
            </motion.p>

            {/* Live NIL Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="ultra-card bg-gradient-to-r from-dna-gold/20 to-dna-orange/20 border-dna-gold/50 max-w-5xl mx-auto mb-16"
            >
              <h3 className="ultra-card-title mb-6 flex items-center justify-center gap-2">
                <Flame className="w-6 h-6 text-dna-gold" />
                LIVE NIL DEALS HAPPENING RIGHT NOW
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">${totalNILValue.toLocaleString()}</div>
                  <div className="text-sm text-white/70">NIL Value This Week</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">{liveDeals}</div>
                  <div className="text-sm text-white/70">Deals Signed Today</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">$347K</div>
                  <div className="text-sm text-white/70">Average Annual Value</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">73</div>
                  <div className="text-sm text-white/70">Millionaires Created</div>
                </div>
              </div>
            </motion.div>

            {/* Athlete Selector */}
            <div className="flex justify-center gap-4 mb-12">
              {nilSuccessStories.map((athlete, index) => (
                <button
                  key={athlete.id}
                  onClick={() => setSelectedAthlete(index)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    selectedAthlete === index
                      ? 'bg-dna-gold text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {athlete.name.split(' ')[0]}
                  <div className="text-xs text-white/70">{athlete.nilPortfolio.totalAnnual}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* NIL Success Story */}
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
                    <div className="grid grid-cols-2 gap-4 text-sm text-white">
                      <div>
                        <div className="text-dna-blue font-bold">Sport & Position</div>
                        <div className="text-white">{currentAthlete.sport} - {currentAthlete.position}</div>
                      </div>
                      <div>
                        <div className="text-dna-blue font-bold">Age</div>
                        <div className="text-white">{currentAthlete.age} years old</div>
                      </div>
                      <div>
                        <div className="text-dna-blue font-bold">School</div>
                        <div className="text-white">{currentAthlete.school}</div>
                      </div>
                      <div>
                        <div className="text-dna-blue font-bold">Followers</div>
                        <div className="text-white">{currentAthlete.followers}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-dna-gold to-dna-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                      <DollarSign className="w-16 h-16 text-black" />
                    </div>
                    <div className="text-dna-gold font-bold text-lg">ANNUAL NIL VALUE</div>
                    <div className="text-4xl font-black text-white">{currentAthlete.nilPortfolio.totalAnnual}</div>
                    <div className="text-sm text-white/70 mt-2">+ {currentAthlete.nilPortfolio.passiveIncome} passive income</div>
                  </div>
                </div>
              </div>

              {/* Before vs After */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="relative overflow-hidden rounded-2xl border-2 border-red-500/80 bg-black/90 backdrop-blur-xl p-6">
                  {/* Strong dark background overlay for perfect contrast */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/70 via-black/90 to-red-700/60 backdrop-blur-sm" />
                  
                  {/* Content with guaranteed high contrast */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black text-red-300 mb-6 flex items-center gap-2 drop-shadow-lg">
                      <Heart className="w-6 h-6" />
                      BEFORE: FINANCIAL STRUGGLE
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-red-200 font-bold text-sm drop-shadow-lg">Annual Income</div>
                        <div className="text-3xl font-black text-red-300 drop-shadow-lg">{currentAthlete.beforeNIL.income}</div>
                      </div>
                      <div>
                        <div className="text-red-200 font-bold text-sm drop-shadow-lg">Family Reality</div>
                        <div className="text-white italic text-sm drop-shadow-lg font-medium">"{currentAthlete.beforeNIL.familyStruggle}"</div>
                      </div>
                      <div>
                        <div className="text-red-200 font-bold text-sm drop-shadow-lg">Equipment Status</div>
                        <div className="text-white text-sm drop-shadow-lg font-medium">{currentAthlete.beforeNIL.equipment}</div>
                      </div>
                      <div>
                        <div className="text-red-200 font-bold text-sm drop-shadow-lg">Future Outlook</div>
                        <div className="text-white text-sm drop-shadow-lg font-medium">{currentAthlete.beforeNIL.future}</div>
                      </div>
                      <div>
                        <div className="text-red-200 font-bold text-sm drop-shadow-lg">Stress Level</div>
                        <div className="text-white italic text-sm drop-shadow-lg font-medium">"{currentAthlete.beforeNIL.stress}"</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border-2 border-green-500/80 bg-black/90 backdrop-blur-xl p-6">
                  {/* Strong dark background overlay for perfect contrast */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-black/90 to-green-700/60 backdrop-blur-sm" />
                  
                  {/* Content with guaranteed high contrast */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black text-green-300 mb-6 flex items-center gap-2 drop-shadow-lg">
                      <Trophy className="w-6 h-6" />
                      AFTER: FINANCIAL EMPIRE
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-green-200 font-bold text-sm drop-shadow-lg">Annual Income</div>
                        <div className="text-3xl font-black text-green-300 drop-shadow-lg">{currentAthlete.nilPortfolio.totalAnnual}</div>
                      </div>
                      <div>
                        <div className="text-green-200 font-bold text-sm drop-shadow-lg">Personal Savings</div>
                        <div className="text-white font-bold drop-shadow-lg">{currentAthlete.wealthTransformation.personalSavings}</div>
                      </div>
                      <div>
                        <div className="text-green-200 font-bold text-sm drop-shadow-lg">Family Debt Status</div>
                        <div className="text-white font-bold drop-shadow-lg">{currentAthlete.wealthTransformation.familyDebt}</div>
                      </div>
                      <div>
                        <div className="text-green-200 font-bold text-sm drop-shadow-lg">Investments</div>
                        <div className="text-white font-bold drop-shadow-lg">{currentAthlete.wealthTransformation.investments}</div>
                      </div>
                      <div>
                        <div className="text-green-200 font-bold text-sm drop-shadow-lg">Generational Impact</div>
                        <div className="text-white font-bold drop-shadow-lg">{currentAthlete.wealthTransformation.generational}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* NIL Deal Portfolio */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-[#F59E0B]/80 bg-black/90 backdrop-blur-xl p-6">
                {/* Strong dark background overlay for perfect contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/30 via-black/90 to-orange-600/30 backdrop-blur-sm" />
                
                {/* Content with guaranteed high contrast */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-[#F59E0B] mb-6 text-center flex items-center justify-center gap-2 drop-shadow-lg">
                    <Briefcase className="w-6 h-6" />
                    ACTIVE NIL DEAL PORTFOLIO
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentAthlete.nilPortfolio.topDeals.map((deal, index) => (
                      <div key={index} className="bg-black/80 rounded-lg p-4 border-2 border-[#F59E0B]/50 backdrop-blur-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div className="text-white font-bold text-sm drop-shadow-lg">{deal.brand}</div>
                          <div className="text-[#F59E0B] font-black drop-shadow-lg">{deal.value}</div>
                        </div>
                        <div className="text-white/90 text-xs mb-1 drop-shadow-lg font-medium">{deal.type}</div>
                        <div className="text-white/80 text-xs drop-shadow-lg font-medium">{deal.duration}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <div className="text-[#F59E0B] font-bold drop-shadow-lg">Projected Lifetime NIL Value</div>
                    <div className="text-3xl font-black text-white drop-shadow-lg">{currentAthlete.nilPortfolio.projectedLifetime}</div>
                  </div>
                </div>
              </div>

              {/* UltraPreps NIL Engine */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-blue-500/80 bg-black/90 backdrop-blur-xl p-6">
                {/* Strong dark background overlay for perfect contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-black/90 to-purple-600/30 backdrop-blur-sm" />
                
                {/* Content with guaranteed high contrast */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-blue-300 mb-6 text-center flex items-center justify-center gap-2 drop-shadow-lg">
                    <Zap className="w-6 h-6" />
                    HOW ULTRAPREPS BUILT THIS EMPIRE
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="text-center">
                      <Camera className="w-8 h-8 text-blue-300 mx-auto mb-2 drop-shadow-lg" />
                      <div className="text-blue-200 font-bold drop-shadow-lg">Content Optimization</div>
                      <div className="text-white text-sm drop-shadow-lg font-medium">{currentAthlete.ultraPrepsImpact.contentOptimization}</div>
                    </div>
                    <div className="text-center">
                      <Target className="w-8 h-8 text-blue-300 mx-auto mb-2 drop-shadow-lg" />
                      <div className="text-blue-200 font-bold drop-shadow-lg">Brand Matching</div>
                      <div className="text-white text-sm drop-shadow-lg font-medium">{currentAthlete.ultraPrepsImpact.brandMatching}</div>
                    </div>
                    <div className="text-center">
                      <Shield className="w-8 h-8 text-blue-300 mx-auto mb-2 drop-shadow-lg" />
                      <div className="text-blue-200 font-bold drop-shadow-lg">Deal Optimization</div>
                      <div className="text-white text-sm drop-shadow-lg font-medium">{currentAthlete.ultraPrepsImpact.dealNegotiation}</div>
                    </div>
                    <div className="text-center">
                      <Eye className="w-8 h-8 text-blue-300 mx-auto mb-2 drop-shadow-lg" />
                      <div className="text-blue-200 font-bold drop-shadow-lg">Global Reach</div>
                      <div className="text-white text-sm drop-shadow-lg font-medium">{currentAthlete.ultraPrepsImpact.globalReach}</div>
                    </div>
                    <div className="text-center">
                      <Clock className="w-8 h-8 text-blue-300 mx-auto mb-2 drop-shadow-lg" />
                      <div className="text-blue-200 font-bold drop-shadow-lg">Strategic Timing</div>
                      <div className="text-white text-sm drop-shadow-lg font-medium">{currentAthlete.ultraPrepsImpact.timing}</div>
                    </div>
                    <div className="text-center">
                      <TrendingUp className="w-8 h-8 text-blue-300 mx-auto mb-2 drop-shadow-lg" />
                      <div className="text-blue-200 font-bold drop-shadow-lg">Growth Engine</div>
                      <div className="text-white text-sm drop-shadow-lg font-medium">AI optimizes every deal for maximum value</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Family Testimonial */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-green-500/80 bg-black/90 backdrop-blur-xl p-6">
                {/* Strong dark background overlay for perfect contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/30 via-black/90 to-green-700/30 backdrop-blur-sm" />
                
                {/* Content with guaranteed high contrast */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-green-300 mb-6 text-center flex items-center justify-center gap-2 drop-shadow-lg">
                    <Heart className="w-6 h-6" />
                    FAMILY TRANSFORMATION
                  </h3>
                  <blockquote className="text-2xl text-white font-medium italic text-center leading-relaxed mb-6 drop-shadow-lg">
                    "{currentAthlete.familyQuote}"
                  </blockquote>
                  <cite className="text-green-300 font-bold text-lg text-center block drop-shadow-lg">
                    — {currentAthlete.parentName}
                  </cite>
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
                YOUR NIL EMPIRE STARTS TODAY
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Every month without NIL optimization is money left on the table. Start building your 
                child's financial empire with AI-powered brand partnerships and content creation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/stadium/create"
                  className="ultra-btn-primary px-12 py-6 text-xl"
                >
                  <DollarSign className="w-7 h-7" />
                  Start Building Wealth Now
                  <ArrowRight className="w-7 h-7" />
                </Link>
                
                <Link
                  href="/demo/scholarship-breakthrough"
                  className="ultra-btn-secondary px-12 py-6 text-xl"
                >
                  <Star className="w-7 h-7" />
                  See Scholarship Success
                </Link>
              </div>

              <div className="pt-8 text-sm text-white/60">
                <p>Join 8,000+ student-athletes earning $250K+ annually through UltraPreps NIL optimization</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}