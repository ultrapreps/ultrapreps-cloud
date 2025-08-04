'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign, TrendingUp, Target, Clock, Award, Shield,
  BarChart3, Eye, MessageCircle, FileText, Calculator,
  Zap, Crown, Trophy, CheckCircle, AlertTriangle,
  Calendar, Users, Handshake, Briefcase, Star,
  Brain, ChevronRight, Play, Pause, Heart
} from 'lucide-react';
import Link from 'next/link';
import HighlightText from '../../../components/HighlightText';

export default function NILDealMechanicsDemo() {
  const [selectedDeal, setSelectedDeal] = useState(0);
  const [showNegotiation, setShowNegotiation] = useState(false);
  const [negotiationStep, setNegotiationStep] = useState(0);
  const [activeContract, setActiveContract] = useState(0);

  // Simulate deal negotiation process
  useEffect(() => {
    if (showNegotiation) {
      const interval = setInterval(() => {
        setNegotiationStep(prev => (prev + 1) % dealNegotiationSteps.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showNegotiation]);

  const activeDealPipeline = [
    {
      id: 1,
      athlete: 'Marcus Johnson',
      sport: 'Football',
      school: 'Detroit High',
      position: 'Quarterback',
      followers: '847K',
      engagement: '23.4%',
      aiValuation: '$347,000 annual potential',
      
      currentDeals: [
        {
          brand: 'Nike Football',
          status: 'Final Negotiation',
          originalOffer: '$89,000',
          aiOptimizedValue: '$156,000',
          aiIncrease: '+75%',
          dealStructure: '2-year signature gear partnership',
          timeline: 'Sign by Friday',
          keyTerms: ['Exclusive football gear rights', 'Social media content (12 posts/year)', 'Appearance at 2 Nike events', 'Performance bonuses up to $25K'],
          negotiationInsights: [
            'AI identified Marcus\'s engagement rate is 67% above category average',
            'Platform timed outreach during peak recruiting visibility',
            'Leveraged competing offers from Adidas and Under Armour',
            'Negotiated removal of restrictive social media clauses'
          ]
        },
        {
          brand: 'Gatorade',
          status: 'Brand Interest',
          estimatedValue: '$78,000',
          timeline: 'Initial outreach next week',
          dealType: 'Hydration performance campaign',
          aiConfidence: '87% match probability'
        },
        {
          brand: 'EA Sports Madden',
          status: 'Contract Sent',
          offeredValue: '$45,000',
          aiRecommendation: 'Counter at $65,000',
          reasoning: 'Gaming content has 340% higher engagement for Marcus'
        }
      ],
      
      totalPipelineValue: '$734,000',
      projectLifetimeEarnings: '$3.7M through college',
      familyImpact: 'Parents quit second jobs, bought first house',
      
      aiOptimizations: {
        contentStrategy: 'Viral training videos increase brand appeal 340%',
        timingStrategy: 'Peak visibility during playoff season maximizes leverage',
        brandAlignment: 'Athletic performance + leadership narrative = premium deals',
        negotiationAI: 'Contract analysis increased deal values by average 52%',
        marketPosition: 'Positioned as next-generation dual-threat QB for national brands'
      }
    },
    
    {
      id: 2,
      athlete: 'Sophia Martinez',
      sport: 'Basketball',
      school: 'Phoenix Academy',
      position: 'Point Guard',
      followers: '1.2M',
      engagement: '31.7%',
      aiValuation: '$523,000 annual potential',
      
      currentDeals: [
        {
          brand: 'Jordan Brand',
          status: 'Active Contract',
          contractValue: '$198,000',
          duration: '3 years',
          dealStructure: 'Signature shoe development pathway',
          keyTerms: ['Exclusive basketball footwear', 'Signature shoe design input', 'Youth basketball clinics', 'Content creation partnership'],
          performance: 'Exceeded engagement targets by 147% in first 6 months'
        },
        {
          brand: 'Apple Fitness+',
          status: 'Pending Signature',
          offeredValue: '$87,000',
          dealType: 'Training content series',
          timeline: 'Sign by Monday',
          aiInsight: 'Content series could generate additional $134K in passive income'
        },
        {
          brand: 'State Farm',
          status: 'Negotiation Active',
          originalOffer: '$23,000',
          aiCounterOffer: '$43,000',
          dealType: 'Good neighbor community campaign',
          leverage: 'AI identified Sophia\'s community engagement rate is 290% above average'
        }
      ],
      
      totalPipelineValue: '$891,000',
      projectLifetimeEarnings: '$4.2M through college + WNBA',
      familyImpact: 'Funded parents\' business expansion, college funds for siblings',
      
      aiOptimizations: {
        contentStrategy: 'Basketball skill tutorials generate 89% brand engagement',
        audienceAnalysis: 'Female empowerment content drives premium brand interest',
        brandMatching: 'AI identified 23 perfect brand alignments based on values',
        globalStrategy: 'International content expanded deal opportunities by 340%',
        negotiationEdge: 'Contract AI spotted and removed 7 restrictive clauses'
      }
    },
    
    {
      id: 3,
      athlete: 'Tyler Washington',
      sport: 'Track & Field',
      school: 'Atlanta Elite',
      events: '100m, 200m Sprint',
      followers: '623K',
      engagement: '28.9%',
      aiValuation: '$312,000 annual potential',
      
      currentDeals: [
        {
          brand: 'Puma Track',
          status: 'Contract Review',
          offeredValue: '$134,000',
          dealStructure: '2-year sprint gear partnership',
          timeline: 'Decision needed by Wednesday',
          competitorOffers: 'Nike offered $89K, Adidas offered $97K',
          aiAdvantage: 'Puma offer 47% higher due to AI positioning strategy'
        },
        {
          brand: 'Red Bull',
          status: 'Brand Outreach',
          estimatedValue: '$67,000',
          dealType: 'Energy performance campaign',
          aiTiming: 'Outreach scheduled for post-state championship visibility'
        },
        {
          brand: 'Omega Watches',
          status: 'Exploratory',
          estimatedValue: '$89,000',
          dealType: 'Precision timing campaign',
          uniqueAngle: 'AI identified Tyler\'s timing precision as premium brand story'
        }
      ],
      
      totalPipelineValue: '$456,000',
      projectLifetimeEarnings: '$2.8M through college + Olympics potential',
      familyImpact: 'First generation wealth - parents started investment accounts',
      
      aiOptimizations: {
        performanceData: 'AI tracks split times and projects improvement for brand value',
        contentTiming: 'Race highlight content strategically released for maximum brand impact',
        brandEducation: 'AI educated brands on track & field audience value propositions',
        globalPositioning: 'Olympic pathway narrative drives international brand interest',
        contractIntelligence: 'AI negotiated performance bonuses based on split time improvements'
      }
    }
  ];

  const dealNegotiationSteps = [
    {
      step: 1,
      title: 'AI BRAND ANALYSIS',
      description: 'AI analyzes 2,847 data points to identify perfect brand matches',
      details: 'Athletic performance, content engagement, audience demographics, brand values alignment',
      aiAction: 'Scanning 1,247 active brand partnerships for compatibility matches',
      duration: '2-4 hours',
      successMetrics: '97% brand-athlete alignment accuracy'
    },
    {
      step: 2,
      title: 'STRATEGIC POSITIONING',
      description: 'AI creates compelling athlete narrative optimized for target brands',
      details: 'Performance highlights, personal story, audience demographics, engagement analytics',
      aiAction: 'Generating brand-specific presentation materials and value propositions',
      duration: '6-8 hours',
      successMetrics: '340% higher response rate than industry standard'
    },
    {
      step: 3,
      title: 'INITIAL OUTREACH',
      description: 'AI-timed brand outreach during peak athlete visibility windows',
      details: 'Strategic timing based on performance cycles, media coverage, viral content',
      aiAction: 'Coordinating multi-brand outreach with personalized athlete packages',
      duration: '1-2 weeks',
      successMetrics: '73% brands respond with initial interest'
    },
    {
      step: 4,
      title: 'CONTRACT OPTIMIZATION',
      description: 'AI analyzes contract terms and negotiates maximum value',
      details: 'Legal clause analysis, market rate comparison, performance bonus structure',
      aiAction: 'Identifying restrictive clauses and optimizing deal structure for athlete benefit',
      duration: '3-5 days',
      successMetrics: '52% average increase in deal value'
    },
    {
      step: 5,
      title: 'COMPETITIVE LEVERAGE',
      description: 'AI creates bidding environment to maximize final contract value',
      details: 'Multi-brand interest, strategic timing, performance-based negotiations',
      aiAction: 'Orchestrating competitive offers to drive premium pricing',
      duration: '1-2 weeks',
      successMetrics: '67% of deals exceed initial offer by 40%+'
    },
    {
      step: 6,
      title: 'DEAL EXECUTION',
      description: 'AI facilitates contract signature and performance optimization',
      details: 'Legal review, payment terms, performance tracking, content strategy',
      aiAction: 'Ensuring optimal contract terms and ongoing performance monitoring',
      duration: '2-3 days',
      successMetrics: '94% of deals exceed performance expectations'
    }
  ];

  const contractAnalysisExamples = [
    {
      id: 1,
      brand: 'Nike Football Partnership',
      athlete: 'Marcus Johnson',
      originalContract: {
        value: '$89,000',
        duration: '18 months',
        posts: '24 social posts',
        exclusivity: 'All athletic footwear',
        events: '4 appearances',
        bonuses: 'None specified'
      },
      aiOptimizedContract: {
        value: '$156,000',
        duration: '24 months',
        posts: '18 strategic posts',
        exclusivity: 'Football-specific only',
        events: '2 appearances + virtual content',
        bonuses: 'Performance bonuses up to $25K'
      },
      keyImprovements: [
        'Removed restrictive all-sports exclusivity clause',
        'Negotiated 75% increase in base compensation',
        'Added performance-based bonus structure',
        'Reduced content obligations while increasing quality focus',
        'Included signature gear development pathway'
      ],
      aiInsights: [
        'Original exclusivity clause would have prevented other lucrative deals',
        'Market analysis showed similar athletes earning 67% more',
        'Performance data suggested bonus structure would add $25K annually',
        'Content quality analysis showed fewer, high-quality posts outperform volume',
        'Signature gear pathway could lead to $500K+ deals post-graduation'
      ]
    },
    
    {
      id: 2,
      brand: 'Jordan Brand Basketball',
      athlete: 'Sophia Martinez',
      originalContract: {
        value: '$127,000',
        duration: '2 years',
        posts: '36 social posts',
        exclusivity: 'All basketball gear',
        events: '6 appearances',
        development: 'Standard athlete program'
      },
      aiOptimizedContract: {
        value: '$198,000',
        duration: '3 years',
        posts: '24 premium posts',
        exclusivity: 'Basketball footwear only',
        events: '3 appearances + signature events',
        development: 'Signature shoe pathway'
      },
      keyImprovements: [
        'Negotiated signature shoe development track',
        'Increased compensation by 56% through market analysis',
        'Limited exclusivity to footwear only, allowing apparel deals',
        'Quality over quantity content strategy',
        'Extended term for better long-term value'
      ],
      aiInsights: [
        'Female basketball signature shoes have 340% growth opportunity',
        'Sophia\'s engagement rates in top 3% of Jordan Brand athletes',
        'Limiting exclusivity opens door to $200K+ apparel deals',
        'Signature shoe pathway historically worth $2M+ for top athletes',
        'Premium content strategy aligns with Jordan Brand\'s quality focus'
      ]
    }
  ];

  const liveNILMetrics = {
    activeDeals: '2,847',
    totalValue: '$127M',
    averageDealValue: '$67,000',
    aiOptimizationRate: '52%',
    successRate: '89%',
    averageNegotiationTime: '12 days',
    brandsInNetwork: '1,247',
    studentAthletes: '15,000+'
  };

  const currentDeal = activeDealPipeline[selectedDeal];
  const currentContract = contractAnalysisExamples[activeContract];

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
              <DollarSign className="w-16 h-16 text-dna-gold animate-pulse" />
              <h1 className="ultra-hero-text">
                AI NIL DEAL ORCHESTRATION
              </h1>
              <Briefcase className="w-16 h-16 text-dna-gold animate-pulse" />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-white/80 max-w-5xl mx-auto leading-relaxed font-medium mb-8"
            >
              <HighlightText>
                **negotiate million-dollar contracts**
              </HighlightText>
              process that turns high school talent into **$500K+ annual empires**.
            </motion.p>

            {/* Live NIL Network Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="ultra-card bg-gradient-to-r from-green-900/40 to-blue-900/40 border-dna-gold/50 mb-16"
            >
              <h3 className="ultra-card-title mb-6 flex items-center justify-center gap-2">
                <TrendingUp className="w-6 h-6 text-dna-gold" />
                LIVE NIL DEAL NETWORK STATUS
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-black text-dna-gold mb-1">{liveNILMetrics.activeDeals}</div>
                  <div className="text-sm text-white/70">Active NIL Deals</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-dna-gold mb-1">{liveNILMetrics.totalValue}</div>
                  <div className="text-sm text-white/70">Total Deal Value</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-dna-gold mb-1">{liveNILMetrics.aiOptimizationRate}</div>
                  <div className="text-sm text-white/70">AI Value Increase</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-dna-gold mb-1">{liveNILMetrics.successRate}</div>
                  <div className="text-sm text-white/70">Deal Success Rate</div>
                </div>
              </div>
            </motion.div>

            {/* Active Deal Pipeline */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {activeDealPipeline.map((deal, index) => (
                <motion.button
                  key={deal.id}
                  onClick={() => setSelectedDeal(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`ultra-card transition-all text-left ${
                    selectedDeal === index
                      ? 'border-dna-gold shadow-lg shadow-dna-gold/25'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Crown className="w-8 h-8 text-dna-gold" />
                    <div>
                      <h3 className="text-lg font-black text-white">{deal.athlete}</h3>
                      <p className="text-sm text-white/70">{deal.sport} • {deal.school}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">Followers:</span>
                      <span className="text-dna-gold font-bold text-sm">{deal.followers}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">Engagement:</span>
                      <span className="text-green-400 font-bold text-sm">{deal.engagement}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/70 text-sm">Pipeline Value:</span>
                      <span className="text-dna-gold font-bold text-sm">{deal.totalPipelineValue}</span>
                    </div>
                  </div>
                  
                  <div className="text-xs text-white/50">
                    {deal.currentDeals.length} active negotiations
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Selected Deal Deep Dive */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDeal}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="ultra-card bg-gradient-to-br from-dna-blue/20 to-purple-900/20 border-dna-gold/50 mb-16"
              >
                <div className="grid lg:grid-cols-3 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <Star className="w-10 h-10 text-dna-gold" />
                      <div>
                        <h2 className="text-2xl font-black text-dna-gold">{currentDeal.athlete}</h2>
                        <p className="text-white/70">{currentDeal.position} • {currentDeal.school}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="bg-black/30 rounded-xl p-4">
                        <div className="text-sm text-white/70 mb-1">AI Valuation</div>
                        <div className="text-xl font-black text-dna-gold">{currentDeal.aiValuation}</div>
                      </div>
                      <div className="bg-black/30 rounded-xl p-4">
                        <div className="text-sm text-white/70 mb-1">Pipeline Value</div>
                        <div className="text-xl font-black text-green-400">{currentDeal.totalPipelineValue}</div>
                      </div>
                      <div className="bg-black/30 rounded-xl p-4">
                        <div className="text-sm text-white/70 mb-1">Lifetime Projection</div>
                        <div className="text-xl font-black text-purple-400">{currentDeal.projectLifetimeEarnings}</div>
                      </div>
                    </div>

                    <div className="bg-dna-gold/20 border border-dna-gold/50 rounded-xl p-4">
                      <h3 className="text-dna-gold font-bold mb-2 flex items-center gap-2">
                        <Heart className="w-5 h-5" />
                        Family Impact
                      </h3>
                      <p className="text-white/80 text-sm">{currentDeal.familyImpact}</p>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <h3 className="text-xl font-black text-white mb-6 flex items-center gap-2">
                      <Handshake className="w-6 h-6 text-dna-gold" />
                      Active Deal Negotiations
                    </h3>
                    
                    <div className="space-y-4">
                      {currentDeal.currentDeals.map((deal, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`border rounded-xl p-4 ${
                            deal.status === 'Final Negotiation' 
                              ? 'bg-green-900/30 border-green-400/50'
                              : deal.status === 'Active Contract'
                              ? 'bg-blue-900/30 border-blue-400/50'
                              : 'bg-yellow-900/30 border-yellow-400/50'
                          }`}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="text-lg font-black text-white">{deal.brand}</h4>
                              <p className="text-white/70 text-sm">{deal.dealStructure || deal.dealType}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-dna-gold font-bold">
                                {deal.aiOptimizedValue || deal.contractValue || deal.offeredValue || deal.estimatedValue}
                              </div>
                              {deal.aiIncrease && (
                                <div className="text-green-400 text-sm">{deal.aiIncrease}</div>
                              )}
                              <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                                deal.status === 'Final Negotiation' 
                                  ? 'bg-green-400/20 text-green-400'
                                  : deal.status === 'Active Contract'
                                  ? 'bg-blue-400/20 text-blue-400'
                                  : 'bg-yellow-400/20 text-yellow-400'
                              }`}>
                                {deal.status}
                              </div>
                            </div>
                          </div>
                          
                          {deal.keyTerms && (
                            <div className="mb-3">
                              <h5 className="text-white font-bold text-sm mb-2">Key Terms:</h5>
                              <ul className="text-white/70 text-xs space-y-1">
                                {deal.keyTerms.map((term, termIndex) => (
                                  <li key={termIndex} className="flex items-start gap-1">
                                    <CheckCircle className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                                    {term}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {deal.timeline && (
                            <div className="flex items-center gap-2 text-white/70 text-sm">
                              <Clock className="w-4 h-4" />
                              {deal.timeline}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* AI Deal Negotiation Process */}
            <div className="ultra-card bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-dna-gold/50 mb-16">
              <h2 className="text-3xl font-black text-dna-gold text-center mb-8 flex items-center justify-center gap-2">
                <Brain className="w-8 h-8" />
                AI NEGOTIATION PROCESS
              </h2>
              
              <div className="flex justify-center gap-4 mb-8">
                <button
                  onClick={() => setShowNegotiation(!showNegotiation)}
                  className="ultra-btn-primary flex items-center gap-2"
                >
                  {showNegotiation ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {showNegotiation ? 'Pause Process' : 'Start AI Negotiation'}
                </button>
              </div>

              <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                {dealNegotiationSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    className={`relative p-4 rounded-xl border-2 transition-all ${
                      index === negotiationStep && showNegotiation
                        ? 'border-dna-gold bg-dna-gold/20 shadow-lg shadow-dna-gold/25'
                        : index < negotiationStep && showNegotiation
                        ? 'border-green-400 bg-green-400/10'
                        : 'border-white/20 bg-white/5'
                    }`}
                  >
                    {index === negotiationStep && showNegotiation && (
                      <motion.div
                        className="absolute inset-0 bg-dna-gold/10 rounded-xl"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
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
                        {step.duration}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contract Analysis Examples */}
            <div className="ultra-card bg-gradient-to-br from-green-900/20 to-blue-900/20 border-dna-gold/50 mb-16">
              <h2 className="text-3xl font-black text-dna-gold text-center mb-8 flex items-center justify-center gap-2">
                <FileText className="w-8 h-8" />
                AI CONTRACT OPTIMIZATION
              </h2>

              <div className="flex justify-center gap-4 mb-8">
                {contractAnalysisExamples.map((contract, index) => (
                  <button
                    key={contract.id}
                    onClick={() => setActiveContract(index)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${
                      activeContract === index
                        ? 'bg-dna-gold text-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {contract.brand}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeContract}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid lg:grid-cols-2 gap-8"
                >
                  <div>
                    <h3 className="text-2xl font-black text-white mb-6">{currentContract.brand}</h3>
                    
                    <div className="space-y-6">
                      <div className="bg-red-900/30 border border-red-400/50 rounded-xl p-4">
                        <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2">
                          <AlertTriangle className="w-5 h-5" />
                          Original Contract
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/70">Value:</span>
                            <span className="text-white">{currentContract.originalContract.value}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Duration:</span>
                            <span className="text-white">{currentContract.originalContract.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Content:</span>
                            <span className="text-white">{currentContract.originalContract.posts}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Exclusivity:</span>
                            <span className="text-white">{currentContract.originalContract.exclusivity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Bonuses:</span>
                            <span className="text-white">{currentContract.originalContract.bonuses}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-green-900/30 border border-green-400/50 rounded-xl p-4">
                        <h4 className="text-green-400 font-bold mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          AI-Optimized Contract
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/70">Value:</span>
                            <span className="text-green-400 font-bold">{currentContract.aiOptimizedContract.value}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Duration:</span>
                            <span className="text-white">{currentContract.aiOptimizedContract.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Content:</span>
                            <span className="text-white">{currentContract.aiOptimizedContract.posts}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Exclusivity:</span>
                            <span className="text-white">{currentContract.aiOptimizedContract.exclusivity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Bonuses:</span>
                            <span className="text-green-400">{currentContract.aiOptimizedContract.bonuses}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white mb-4">AI Optimization Analysis</h3>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-bold text-dna-gold mb-3">Key Improvements</h4>
                      <div className="space-y-2">
                        {currentContract.keyImprovements.map((improvement, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-2 text-white/80 text-sm"
                          >
                            <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>{improvement}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-bold text-dna-gold mb-3">AI Strategic Insights</h4>
                      <div className="space-y-3">
                        {currentContract.aiInsights.map((insight, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-black/30 rounded-xl p-3 border border-dna-gold/30"
                          >
                            <div className="flex items-start gap-2">
                              <Brain className="w-4 h-4 text-dna-gold mt-0.5 flex-shrink-0" />
                              <span className="text-white/80 text-sm">{insight}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
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
                AI THAT NEGOTIATES LIKE A $2B AGENCY
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                <HighlightText>
                  **exact AI system**
                </HighlightText>
                Contract analysis, brand matching, and negotiation optimization that beats human agents.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/stadium/create" className="ultra-btn-primary">
                  Activate My NIL Engine
                </Link>
                <Link href="/demo/celebrity-mentor-network" className="ultra-btn-secondary">
                  See Celebrity Mentor Network
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}