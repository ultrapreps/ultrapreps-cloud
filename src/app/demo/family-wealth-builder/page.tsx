'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, DollarSign, TrendingUp, Star, Heart, Home, Car,
  GraduationCap, Building, Briefcase, Target, Users, Clock,
  Award, Flame, Shield, Zap, CheckCircle, ArrowRight, 
  PiggyBank, CreditCard, Calculator, Banknote
} from 'lucide-react';
import Link from 'next/link';
import HighlightText from '../../../components/HighlightText';

export default function FamilyWealthBuilderDemo() {
  const [selectedFamily, setSelectedFamily] = useState(0);
  const [wealthGrowth, setWealthGrowth] = useState(1247000);
  const [familiesTransformed, setFamiliesTransformed] = useState(3247);
  const [generationsCycles, setGenerationsCycles] = useState(47);

  // Live wealth creation simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.25) {
        setWealthGrowth(prev => prev + Math.floor(Math.random() * 25000) + 10000);
        setFamiliesTransformed(prev => prev + Math.floor(Math.random() * 3) + 1);
        if (Math.random() < 0.1) {
          setGenerationsCycles(prev => prev + 1);
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const familyWealthStories = [
    {
      id: 1,
      family: 'The Martinez Dynasty',
      location: 'East LA, California',
      children: ['Diego (Football)', 'Sofia (Soccer)', 'Carlos (Basketball)'],
      timespan: '4 years of UltraPreps optimization',
      
      beforeWealth: {
        income: '$34,000 combined family income',
        debt: '$67,000 in credit cards and medical bills',
        housing: 'Renting cramped 2-bedroom apartment',
        education: 'Community college hopes for kids',
        stress: 'Working 3 jobs, no time for family',
        future: 'Generational poverty cycle continuing'
      },
      
      transformationPlan: {
        year1: 'Diego gets football scholarship offers - $247K total value',
        year2: 'Sofia signs NIL deals while junior - $89K annual income',
        year3: 'Carlos academic transformation - $156K scholarship secured',
        year4: 'Family business opportunities through sports connections'
      },
      
      currentWealth: {
        scholarships: '$492,000 in secured education funding',
        nilEarnings: '$234,000 annual family NIL portfolio',
        investments: '$189,000 in diversified investment accounts',
        realEstate: 'Owned home worth $340,000, rental property $280,000',
        business: 'Youth sports academy generating $167,000 annually',
        totalNetWorth: '$1.2M family net worth achieved'
      },
      
      futureProjection: {
        fiveYear: '$3.8M projected family wealth',
        tenYear: '$12.4M with business expansion and investments',
        children: 'All three kids college debt-free with professional opportunities',
        grandchildren: 'Education trust funds already established',
        legacy: 'Breaking 5-generation poverty cycle permanently',
        community: 'Employing 23 local families through sports academy'
      },
      
      ultraPrepsImpact: {
        optimization: 'AI identified perfect scholarship timing for each child',
        networking: 'Connected family with 47 sports industry opportunities',
        content: 'Generated $890K worth of professional sports content',
        education: 'Academic AI coaching raised family GPA from 2.1 to 3.7',
        mentorship: 'Connected with successful Latino business leaders',
        planning: 'Financial AI created generational wealth roadmap'
      },
      
      familyQuote: "UltraPreps didn't just help our kids - it saved our entire family tree. From food stamps to millionaires in 4 years. Our great-grandchildren will never know poverty.",
      parentName: "Maria Martinez, Family Matriarch"
    },
    
    {
      id: 2,
      family: 'The Johnson Empire',
      location: 'Detroit, Michigan',
      children: ['Marcus (Track)', 'Destiny (Basketball)', 'Isaiah (Football)'],
      timespan: '3 years of systematic wealth building',
      
      beforeWealth: {
        income: '$28,000 single mom, nurse aide',
        debt: '$43,000 student loans and car payments',
        housing: 'Section 8 housing, unsafe neighborhood',
        education: 'Kids academically struggling, no college prospects',
        stress: 'Choosing between groceries and sports equipment',
        future: 'Kids likely to repeat poverty cycle'
      },
      
      transformationPlan: {
        year1: 'Marcus track talent identified - AI optimization begins',
        year2: 'Destiny basketball breakthrough - recruiting interest explodes',
        year3: 'Isaiah academic turnaround - scholarship offers arrive',
        year4: 'Family relocates to opportunity zone with sports academy'
      },
      
      currentWealth: {
        scholarships: '$687,000 combined scholarship value for all kids',
        nilEarnings: '$312,000 annual family NIL income stream',
        investments: '$234,000 in retirement and education accounts',
        realEstate: 'Family home $290,000, investment property $245,000',
        business: 'Athletic training facility with $198,000 annual revenue',
        totalNetWorth: '$1.6M family empire built from nothing'
      },
      
      futureProjection: {
        fiveYear: '$4.7M projected with business expansion',
        tenYear: '$18.2M with real estate portfolio growth',
        children: 'Professional sports potential worth $50M+ combined',
        grandchildren: 'Private school education already funded',
        legacy: 'First millionaire family in neighborhood history',
        community: 'Training 200+ local kids, creating opportunities'
      },
      
      ultraPrepsImpact: {
        optimization: 'AI found hidden athletic talents worth millions',
        networking: 'Connected with Detroit sports business community',
        content: 'Created viral training videos worth $1.2M in exposure',
        education: 'Tutoring AI raised kids from failing to honor roll',
        mentorship: 'Direct connection to NBA/NFL players from Detroit',
        planning: 'Created first-generation wealth strategy roadmap'
      },
      
      familyQuote: "We went from choosing between rent and groceries to having rental properties and college funds. UltraPreps turned my children's talents into generational wealth that will last forever.",
      parentName: "Keisha Johnson, CEO of Johnson Athletics"
    },
    
    {
      id: 3,
      family: 'The Chen Innovation',
      location: 'San Francisco Bay Area',
      children: ['Kevin (Tennis)', 'Amy (Swimming)', 'Lisa (Volleyball)'],
      timespan: '5 years of strategic wealth optimization',
      
      beforeWealth: {
        income: '$89,000 dual tech workers (before layoffs)',
        debt: '$234,000 mortgage and student loans',
        housing: 'Underwater on expensive Bay Area mortgage',
        education: 'Private school tuition bankrupting family',
        stress: 'Tech industry layoffs threatening everything',
        future: 'Moving away from opportunities due to costs'
      },
      
      transformationPlan: {
        year1: 'Kevin tennis talent optimized - national ranking achieved',
        year2: 'Amy swimming excellence - Olympic training program entry',
        year3: 'Lisa volleyball breakthrough - D1 scholarship pipeline',
        year4: 'Family sports consulting business launched',
        year5: 'Tech + sports convergence creates innovation opportunities'
      },
      
      currentWealth: {
        scholarships: '$743,000 in secured educational funding',
        nilEarnings: '$456,000 annual family sports tech income',
        investments: '$567,000 in tech stocks and real estate',
        realEstate: 'Primary home paid off, 2 rental properties worth $1.8M',
        business: 'Sports technology startup valued at $2.3M',
        totalNetWorth: '$4.1M family innovation empire'
      },
      
      futureProjection: {
        fiveYear: '$12.8M with sports tech IPO potential',
        tenYear: '$47.3M through technology innovation and sports investments',
        children: 'Olympic potential + tech entrepreneurship = unlimited',
        grandchildren: 'Stanford/MIT education funds fully established',
        legacy: 'Sports technology innovation changing industry',
        community: 'Creating 100+ high-tech sports jobs in Bay Area'
      },
      
      ultraPrepsImpact: {
        optimization: 'AI identified perfect tech-sports convergence opportunities',
        networking: 'Connected with Silicon Valley sports tech investors',
        content: 'Created sports analytics content worth $2.4M value',
        education: 'STEM + athletics combination opened unlimited doors',
        mentorship: 'Connected with Olympic coaches and tech billionaires',
        planning: 'Created innovation-based generational wealth strategy'
      },
      
      familyQuote: "UltraPreps helped us combine our tech skills with our kids' athletic talents to create something nobody thought possible. We're not just building wealth - we're building the future of sports.",
      parentName: "David Chen, Founder of SportsAI Ventures"
    }
  ];

  const currentFamily = familyWealthStories[selectedFamily];

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
                FROM POVERTY TO MILLIONS
              </h1>
              <Building className="w-12 h-12 text-dna-gold" />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-medium mb-8"
            >
              <HighlightText>
                **multi-million dollar empires**
              </HighlightText>
              <HighlightText>
                **generational wealth creation**
              </HighlightText>
            </motion.p>

            {/* Live Wealth Creation Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="ultra-card bg-gradient-to-r from-dna-gold/20 to-dna-orange/20 border-dna-gold/50 max-w-5xl mx-auto mb-16"
            >
              <h3 className="ultra-card-title mb-6 flex items-center justify-center gap-2">
                <Flame className="w-6 h-6 text-dna-gold" />
                LIVE FAMILY WEALTH CREATION
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">${wealthGrowth.toLocaleString()}</div>
                  <div className="text-sm text-white/70">Family Wealth Created Today</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">{familiesTransformed}</div>
                  <div className="text-sm text-white/70">Families Transformed</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">{generationsCycles}</div>
                  <div className="text-sm text-white/70">Poverty Cycles Broken</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">$4.7M</div>
                  <div className="text-sm text-white/70">Average Family Growth</div>
                </div>
              </div>
            </motion.div>

            {/* Family Selector */}
            <div className="flex justify-center gap-4 mb-12">
              {familyWealthStories.map((family, index) => (
                <button
                  key={family.id}
                  onClick={() => setSelectedFamily(index)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    selectedFamily === index
                      ? 'bg-dna-gold text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {family.family.split(' ')[1]}
                  <div className="text-xs opacity-70">{family.currentWealth.totalNetWorth.split(' ')[0]}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Family Wealth Transformation */}
        <div className="ultra-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFamily}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Family Overview */}
              <div className="ultra-card bg-gradient-to-r from-dna-blue/30 to-purple-900/30 border-dna-blue/50">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-4">{currentFamily.family}</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <div className="text-dna-blue font-bold">Location</div>
                        <div className="text-white">{currentFamily.location}</div>
                      </div>
                      <div>
                        <div className="text-dna-blue font-bold">Children Athletes</div>
                        <div className="text-white space-y-1">
                          {currentFamily.children.map((child, idx) => (
                            <div key={idx}>{child}</div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-dna-blue font-bold">Transformation Timeline</div>
                        <div className="text-white">{currentFamily.timespan}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-dna-gold to-dna-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Building className="w-16 h-16 text-dna-gold" />
                    </div>
                    <div className="text-dna-gold font-bold text-lg">FAMILY NET WORTH</div>
                    <div className="text-4xl font-black text-white">{currentFamily.currentWealth.totalNetWorth.split(' ')[0]}</div>
                    <div className="text-sm text-white/70 mt-2">Built from {currentFamily.beforeWealth.income}</div>
                  </div>
                </div>
              </div>

              {/* Before vs After Transformation */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="relative overflow-hidden rounded-2xl border-2 border-red-500/80 bg-black/90 backdrop-blur-xl p-6">
                  {/* Strong dark background overlay for perfect contrast */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/70 via-black/90 to-red-700/60 backdrop-blur-sm" />
                  
                  {/* Content with guaranteed high contrast */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-black text-red-300 mb-6 flex items-center gap-2 drop-shadow-lg">
                      <CreditCard className="w-6 h-6" />
                      BEFORE: FINANCIAL STRUGGLE
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <div className="text-red-200 font-bold drop-shadow-lg">Family Income</div>
                        <div className="text-white drop-shadow-lg font-medium">{currentFamily.beforeWealth.income}</div>
                      </div>
                      <div>
                        <div className="text-red-200 font-bold drop-shadow-lg">Debt Burden</div>
                        <div className="text-white drop-shadow-lg font-medium">{currentFamily.beforeWealth.debt}</div>
                      </div>
                      <div>
                        <div className="text-red-200 font-bold drop-shadow-lg">Housing Situation</div>
                        <div className="text-white drop-shadow-lg font-medium">{currentFamily.beforeWealth.housing}</div>
                      </div>
                      <div>
                        <div className="text-red-200 font-bold drop-shadow-lg">Education Prospects</div>
                        <div className="text-white drop-shadow-lg font-medium">{currentFamily.beforeWealth.education}</div>
                      </div>
                      <div>
                        <div className="text-red-200 font-bold drop-shadow-lg">Daily Reality</div>
                        <div className="text-white italic drop-shadow-lg font-medium">"{currentFamily.beforeWealth.stress}"</div>
                      </div>
                      <div>
                        <div className="text-red-200 font-bold drop-shadow-lg">Future Outlook</div>
                        <div className="text-white italic drop-shadow-lg font-medium">"{currentFamily.beforeWealth.future}"</div>
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
                      <PiggyBank className="w-6 h-6" />
                      AFTER: WEALTH EMPIRE
                    </h3>
                    <div className="space-y-4 text-sm">
                      <div>
                        <div className="text-green-200 font-bold drop-shadow-lg">Scholarships Secured</div>
                        <div className="text-white font-bold drop-shadow-lg">{currentFamily.currentWealth.scholarships}</div>
                      </div>
                      <div>
                        <div className="text-green-200 font-bold drop-shadow-lg">Annual NIL Income</div>
                        <div className="text-white font-bold drop-shadow-lg">{currentFamily.currentWealth.nilEarnings}</div>
                      </div>
                      <div>
                        <div className="text-green-200 font-bold drop-shadow-lg">Investment Portfolio</div>
                        <div className="text-white font-bold drop-shadow-lg">{currentFamily.currentWealth.investments}</div>
                      </div>
                      <div>
                        <div className="text-green-200 font-bold drop-shadow-lg">Real Estate Holdings</div>
                        <div className="text-white font-bold drop-shadow-lg">{currentFamily.currentWealth.realEstate}</div>
                      </div>
                      <div>
                        <div className="text-green-200 font-bold drop-shadow-lg">Business Ventures</div>
                        <div className="text-white font-bold drop-shadow-lg">{currentFamily.currentWealth.business}</div>
                      </div>
                      <div>
                        <div className="text-green-200 font-bold drop-shadow-lg">Total Family Wealth</div>
                        <div className="text-2xl font-black text-green-300 drop-shadow-lg">{currentFamily.currentWealth.totalNetWorth}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transformation Timeline */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-[#F59E0B]/80 bg-black/90 backdrop-blur-xl p-6">
                {/* Strong dark background overlay for perfect contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/30 via-black/90 to-orange-600/30 backdrop-blur-sm" />
                
                {/* Content with guaranteed high contrast */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-[#F59E0B] mb-6 text-center flex items-center justify-center gap-2 drop-shadow-lg">
                  <Clock className="w-6 h-6" />
                  THE WEALTH BUILDING TIMELINE
                </h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-black/50 rounded-lg border border-[#F59E0B]/30">
                      <div className="text-[#F59E0B] font-bold text-lg drop-shadow-lg">YEAR 1</div>
                      <div className="text-white text-sm mt-2 drop-shadow-lg font-medium">{currentFamily.transformationPlan.year1}</div>
                    </div>
                    <div className="text-center p-4 bg-black/50 rounded-lg border border-[#F59E0B]/30">
                      <div className="text-[#F59E0B] font-bold text-lg drop-shadow-lg">YEAR 2</div>
                      <div className="text-white text-sm mt-2 drop-shadow-lg font-medium">{currentFamily.transformationPlan.year2}</div>
                    </div>
                    <div className="text-center p-4 bg-black/50 rounded-lg border border-[#F59E0B]/30">
                      <div className="text-[#F59E0B] font-bold text-lg drop-shadow-lg">YEAR 3</div>
                      <div className="text-white text-sm mt-2 drop-shadow-lg font-medium">{currentFamily.transformationPlan.year3}</div>
                    </div>
                    <div className="text-center p-4 bg-black/50 rounded-lg border border-[#F59E0B]/30">
                      <div className="text-[#F59E0B] font-bold text-lg drop-shadow-lg">YEAR 4+</div>
                      <div className="text-white text-sm mt-2 drop-shadow-lg font-medium">{currentFamily.transformationPlan.year4}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Future Wealth Projection */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-blue-500/80 bg-black/90 backdrop-blur-xl p-6">
                {/* Strong dark background overlay for perfect contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-black/90 to-purple-600/30 backdrop-blur-sm" />
                
                {/* Content with guaranteed high contrast */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-blue-300 mb-6 text-center flex items-center justify-center gap-2 drop-shadow-lg">
                  <TrendingUp className="w-6 h-6" />
                  GENERATIONAL WEALTH PROJECTION
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="text-center">
                    <Calculator className="w-8 h-8 text-dna-blue mx-auto mb-2" />
                    <div className="text-dna-blue font-bold">5-Year Projection</div>
                    <div className="text-white text-lg font-bold">{currentFamily.futureProjection.fiveYear}</div>
                  </div>
                  <div className="text-center">
                    <Banknote className="w-8 h-8 text-dna-blue mx-auto mb-2" />
                    <div className="text-dna-blue font-bold">10-Year Projection</div>
                    <div className="text-white text-lg font-bold">{currentFamily.futureProjection.tenYear}</div>
                  </div>
                  <div className="text-center">
                    <GraduationCap className="w-8 h-8 text-dna-blue mx-auto mb-2" />
                    <div className="text-dna-blue font-bold">Children's Future</div>
                    <div className="text-white text-sm">{currentFamily.futureProjection.children}</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-8 h-8 text-dna-blue mx-auto mb-2" />
                    <div className="text-dna-blue font-bold">Next Generation</div>
                    <div className="text-white text-sm">{currentFamily.futureProjection.grandchildren}</div>
                  </div>
                  <div className="text-center">
                    <Crown className="w-8 h-8 text-dna-blue mx-auto mb-2" />
                    <div className="text-dna-blue font-bold">Family Legacy</div>
                    <div className="text-white text-sm">{currentFamily.futureProjection.legacy}</div>
                  </div>
                  <div className="text-center">
                    <Heart className="w-8 h-8 text-dna-blue mx-auto mb-2" />
                    <div className="text-dna-blue font-bold">Community Impact</div>
                    <div className="text-white text-sm">{currentFamily.futureProjection.community}</div>
                  </div>
                </div>
              </div>

              {/* UltraPreps Impact */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-purple-500/80 bg-black/90 backdrop-blur-xl p-6">
                {/* Strong dark background overlay for perfect contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-black/90 to-purple-700/30 backdrop-blur-sm" />
                
                {/* Content with guaranteed high contrast */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-purple-300 mb-6 text-center flex items-center justify-center gap-2 drop-shadow-lg">
                    <Zap className="w-6 h-6" />
                    HOW ULTRAPREPS BUILT THIS EMPIRE
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                    <div>
                      <div className="text-purple-200 font-bold mb-2 drop-shadow-lg">AI Optimization</div>
                      <div className="text-white drop-shadow-lg font-medium">{currentFamily.ultraPrepsImpact.optimization}</div>
                    </div>
                    <div>
                      <div className="text-purple-200 font-bold mb-2 drop-shadow-lg">Network Access</div>
                      <div className="text-white drop-shadow-lg font-medium">{currentFamily.ultraPrepsImpact.networking}</div>
                    </div>
                    <div>
                      <div className="text-purple-200 font-bold mb-2 drop-shadow-lg">Content Value</div>
                      <div className="text-white drop-shadow-lg font-medium">{currentFamily.ultraPrepsImpact.content}</div>
                    </div>
                    <div>
                      <div className="text-purple-200 font-bold mb-2 drop-shadow-lg">Education Boost</div>
                      <div className="text-white drop-shadow-lg font-medium">{currentFamily.ultraPrepsImpact.education}</div>
                    </div>
                    <div>
                      <div className="text-purple-200 font-bold mb-2 drop-shadow-lg">Mentorship Access</div>
                      <div className="text-white drop-shadow-lg font-medium">{currentFamily.ultraPrepsImpact.mentorship}</div>
                    </div>
                    <div>
                      <div className="text-purple-200 font-bold mb-2 drop-shadow-lg">Wealth Planning</div>
                      <div className="text-white drop-shadow-lg font-medium">{currentFamily.ultraPrepsImpact.planning}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Family Testimonial */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-green-500/80 bg-black/90 backdrop-blur-xl p-6 text-center">
                {/* Strong dark background overlay for perfect contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/30 via-black/90 to-green-700/30 backdrop-blur-sm" />
                
                {/* Content with guaranteed high contrast */}
                <div className="relative z-10">
                  <Home className="w-12 h-12 text-green-300 mx-auto mb-6 drop-shadow-lg" />
                  <blockquote className="text-2xl text-white font-medium italic mb-6 leading-relaxed drop-shadow-lg">
                    "{currentFamily.familyQuote}"
                  </blockquote>
                  <cite className="text-green-300 font-bold text-lg drop-shadow-lg">
                                    — {currentFamily.parentName}
                  </cite>
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
                START YOUR FAMILY'S WEALTH DYNASTY
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Every family deserves generational wealth. Stop letting poverty cycles continue. 
                Start building your multi-million dollar sports empire today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/stadium/create"
                  className="ultra-btn-primary px-12 py-6 text-xl"
                >
                  <Building className="w-7 h-7" />
                  Build Family Empire Now
                  <ArrowRight className="w-7 h-7" />
                </Link>
                
                <Link
                  href="/demo/championship-legacy"
                  className="ultra-btn-secondary px-12 py-6 text-xl"
                >
                  <Crown className="w-7 h-7" />
                  Create Immortal Moments
                </Link>
              </div>

              <div className="pt-8 text-sm text-white/60">
                <p>Join 3,247 families building generational wealth through strategic sports optimization</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}