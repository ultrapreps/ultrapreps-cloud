'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, TrendingUp, Star, Shield, Users, Crown,
  Camera, Heart, Share, Eye, ArrowRight, CheckCircle,
  AlertTriangle, Clock, Award, Target, Zap, Trophy,
  User, Building, Handshake, FileText, Calendar,
  BarChart3, MapPin, Phone, Mail, Instagram, Twitter
} from 'lucide-react';
import Link from 'next/link';

export default function NILDemo() {
  const [activeTab, setActiveTab] = useState('marketplace');
  const [selectedDeal, setSelectedDeal] = useState(0);
  const [liveEarnings, setLiveEarnings] = useState(125640);
  const [newDeals, setNewDeals] = useState(12);

  // Simulate live earnings updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveEarnings(prev => prev + Math.floor(Math.random() * 500));
      if (Math.random() < 0.3) setNewDeals(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nilDeals = [
    {
      id: 1,
      brand: 'Nike Athletics',
      type: 'Equipment Partnership',
      value: 25000,
      duration: '12 months',
      status: 'active',
      category: 'Apparel',
      deliverables: ['Social media posts (monthly)', 'Training gear usage', 'Event appearances'],
      metrics: { 
        engagement: 94.5,
        reach: 45000,
        conversions: 1200,
        roi: 340
      },
      athlete: 'Marcus Johnson',
      school: 'Liberty High',
      sport: 'Football',
      startDate: '2024-09-01',
      endDate: '2025-08-31',
      requirements: [
        'Wear Nike gear during training',
        'Post 2 social media updates monthly',
        'Attend 1 promotional event per quarter'
      ],
      earnings: {
        upfront: 10000,
        monthly: 1250,
        bonuses: 3750,
        total: 25000
      }
    },
    {
      id: 2,
      brand: 'Gatorade Performance',
      type: 'Hydration Ambassador',
      value: 15000,
      duration: '6 months',
      status: 'pending',
      category: 'Nutrition',
      deliverables: ['Product testimonials', 'Training content', 'Hydration education'],
      metrics: { 
        engagement: 87.2,
        reach: 28000,
        conversions: 850,
        roi: 285
      },
      athlete: 'Sarah Martinez',
      school: 'Roosevelt High',
      sport: 'Basketball',
      startDate: '2024-11-01',
      endDate: '2025-04-30',
      requirements: [
        'Use Gatorade products during training',
        'Create educational hydration content',
        'Participate in wellness campaigns'
      ],
      earnings: {
        upfront: 5000,
        monthly: 1667,
        bonuses: 2000,
        total: 15000
      }
    },
    {
      id: 3,
      brand: 'Local Auto Dealership',
      type: 'Community Ambassador',
      value: 8000,
      duration: '12 months',
      status: 'negotiating',
      category: 'Local Business',
      deliverables: ['Community events', 'Local advertising', 'Dealership visits'],
      metrics: { 
        engagement: 76.8,
        reach: 12000,
        conversions: 320,
        roi: 220
      },
      athlete: 'Tyler Chen',
      school: 'Westfield Academy',
      sport: 'Track & Field',
      startDate: '2024-12-01',
      endDate: '2025-11-30',
      requirements: [
        'Appear in local TV commercials',
        'Attend grand opening events',
        'Social media promotion'
      ],
      earnings: {
        upfront: 2000,
        monthly: 500,
        bonuses: 1000,
        total: 8000
      }
    }
  ];

  const marketplaceOpportunities = [
    {
      id: 1,
      brand: 'Under Armour',
      title: 'Rising Star Program',
      value: '$30,000',
      category: 'Apparel',
      requirements: ['High school athlete', 'Social media following 5K+', 'GPA 3.5+'],
      deadline: '2024-12-15',
      applicants: 47,
      description: 'Year-long partnership with gear, training camps, and mentorship'
    },
    {
      id: 2,
      brand: 'Chipotle',
      title: 'Fuel Greatness Campaign',
      value: '$12,000',
      category: 'Food & Beverage',
      requirements: ['Team captain or leadership role', 'Clean social media', 'Local market'],
      deadline: '2024-11-30',
      applicants: 23,
      description: 'Nutrition partnership with meal credits and social content'
    },
    {
      id: 3,
      brand: 'Beats by Dre',
      title: 'Young Athletes Program',
      value: '$18,000',
      category: 'Electronics',
      requirements: ['Music/audio content creation', 'Training content', '10K+ followers'],
      deadline: '2025-01-10',
      applicants: 156,
      description: 'Audio gear partnership with content creation requirements'
    }
  ];

  const athletePortfolio = {
    totalEarnings: liveEarnings,
    activeDeals: 3,
    pendingOffers: 5,
    monthlyIncome: 4200,
    projectedAnnual: 52000,
    socialMetrics: {
      followers: 15400,
      engagement: 7.8,
      growth: 12.5
    }
  };

  const currentDeal = nilDeals[selectedDeal];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 to-emerald-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <DollarSign className="w-16 h-16 mx-auto mb-4 text-green-300" />
            <h1 className="text-5xl font-black text-white mb-4">
              NIL MARKETPLACE & EARNINGS HUB
            </h1>
            <p className="text-xl text-green-200 max-w-3xl mx-auto">
              Revolutionary Name, Image, and Likeness platform that connects student-athletes 
              with premium brand partnerships while ensuring compliance and maximizing earnings.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Live Earnings Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-bold">LIVE NIL EARNINGS TRACKER</span>
            </div>
            <div className="text-sm text-white/70">Real-time updates</div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <div className="text-center">
              <div className="text-3xl font-black text-green-400">
                ${liveEarnings.toLocaleString()}
              </div>
              <div className="text-sm text-white/70">Total Platform Earnings</div>
              <div className="text-xs text-green-400 mt-1">+$2,340 this week</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-blue-400">{athletePortfolio.activeDeals}</div>
              <div className="text-sm text-white/70">Active Deals</div>
              <div className="text-xs text-blue-400 mt-1">2 new this month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-purple-400">${athletePortfolio.monthlyIncome.toLocaleString()}</div>
              <div className="text-sm text-white/70">Monthly Income</div>
              <div className="text-xs text-purple-400 mt-1">+15% vs last month</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-yellow-400">{newDeals}</div>
              <div className="text-sm text-white/70">New Opportunities</div>
              <div className="text-xs text-yellow-400 mt-1">3 matched today</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-orange-400">{athletePortfolio.socialMetrics.followers.toLocaleString()}</div>
              <div className="text-sm text-white/70">Social Reach</div>
              <div className="text-xs text-orange-400 mt-1">+{athletePortfolio.socialMetrics.growth}% growth</div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white/5 p-2 rounded-xl">
          {[
            { id: 'marketplace', label: 'Marketplace', icon: Building },
            { id: 'active-deals', label: 'Active Deals', icon: Handshake },
            { id: 'earnings', label: 'Earnings', icon: DollarSign },
            { id: 'compliance', label: 'Compliance', icon: Shield },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 }
          ].map(tab => {
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-green-500 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <TabIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >

            {/* Marketplace */}
            {activeTab === 'marketplace' && (
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <h2 className="text-2xl font-black flex items-center gap-3">
                    <Building className="w-6 h-6 text-green-400" />
                    Premium Brand Opportunities
                  </h2>
                  
                  {marketplaceOpportunities.map((opportunity, index) => (
                    <motion.div
                      key={opportunity.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 p-6 rounded-xl border border-white/20 hover:border-green-400/50 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{opportunity.brand}</h3>
                          <p className="text-green-400 font-bold">{opportunity.title}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-2xl font-black text-green-400">{opportunity.value}</span>
                            <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm font-bold">
                              {opportunity.category}
                            </span>
                          </div>
                        </div>
                        <button className="px-6 py-3 bg-green-500 rounded-lg font-bold hover:bg-green-600 transition-colors">
                          Apply Now
                        </button>
                      </div>
                      
                      <p className="text-white/80 mb-4">{opportunity.description}</p>
                      
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-bold mb-2">Requirements:</h4>
                          <ul className="text-sm text-white/70 space-y-1">
                            {opportunity.requirements.map((req, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                                {req}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-blue-400" />
                              <span>Deadline: {opportunity.deadline}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-purple-400" />
                              <span>{opportunity.applicants} applicants</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quick Application Form */}
                <div className="space-y-6">
                  <div className="bg-white/5 p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-400" />
                      AI Match Finder
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Sport</label>
                        <select className="w-full p-3 rounded-lg bg-white/10 border border-white/20">
                          <option>Football</option>
                          <option>Basketball</option>
                          <option>Track & Field</option>
                          <option>Soccer</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Social Following</label>
                        <select className="w-full p-3 rounded-lg bg-white/10 border border-white/20">
                          <option>1K - 5K</option>
                          <option>5K - 10K</option>
                          <option>10K - 25K</option>
                          <option>25K+</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Preferred Categories</label>
                        <div className="grid grid-cols-2 gap-2">
                          {['Apparel', 'Food', 'Tech', 'Local'].map((cat) => (
                            <label key={cat} className="flex items-center gap-2">
                              <input type="checkbox" className="rounded" />
                              <span className="text-sm">{cat}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      <button className="w-full py-3 bg-green-500 rounded-lg font-bold hover:bg-green-600 transition-colors">
                        Find Matches
                      </button>
                    </div>
                  </div>

                  <div className="bg-white/5 p-6 rounded-xl">
                    <h3 className="text-xl font-bold mb-4">Success Stories</h3>
                    
                    <div className="space-y-4">
                      <div className="border-l-4 border-green-400 pl-4">
                        <p className="font-bold">Marcus J.</p>
                        <p className="text-sm text-white/70">Earned $45K in first year</p>
                        <p className="text-xs text-green-400">"Platform changed my life!"</p>
                      </div>
                      <div className="border-l-4 border-blue-400 pl-4">
                        <p className="font-bold">Sarah M.</p>
                        <p className="text-sm text-white/70">3 active partnerships</p>
                        <p className="text-xs text-blue-400">"Professional guidance amazing"</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Active Deals */}
            {activeTab === 'active-deals' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-black flex items-center gap-3">
                    <Handshake className="w-6 h-6 text-green-400" />
                    Current Partnerships
                  </h2>
                  
                  {nilDeals.map((deal, index) => (
                    <motion.div
                      key={deal.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSelectedDeal(index)}
                      className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedDeal === index
                          ? 'border-green-400 bg-green-500/10'
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{deal.brand}</h3>
                          <p className="text-green-400">{deal.type}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-2xl font-black text-green-400">
                              ${deal.value.toLocaleString()}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              deal.status === 'active' ? 'bg-green-500/20 text-green-300' :
                              deal.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-blue-500/20 text-blue-300'
                            }`}>
                              {deal.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        {selectedDeal === index && (
                          <Crown className="w-6 h-6 text-green-400" />
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-white/60">Duration:</span>
                          <span className="ml-2 font-bold">{deal.duration}</span>
                        </div>
                        <div>
                          <span className="text-white/60">Category:</span>
                          <span className="ml-2 font-bold">{deal.category}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Deal Details */}
                <div className="space-y-6">
                  <div className="bg-white/5 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold mb-6">{currentDeal.brand} Partnership</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-3">Earnings Breakdown</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/5 p-4 rounded-lg">
                            <div className="text-lg font-bold text-green-400">
                              ${currentDeal.earnings.upfront.toLocaleString()}
                            </div>
                            <div className="text-sm text-white/70">Upfront Payment</div>
                          </div>
                          <div className="bg-white/5 p-4 rounded-lg">
                            <div className="text-lg font-bold text-blue-400">
                              ${currentDeal.earnings.monthly.toLocaleString()}
                            </div>
                            <div className="text-sm text-white/70">Monthly</div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold mb-3">Performance Metrics</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span>Engagement Rate</span>
                            <span className="font-bold text-green-400">{currentDeal.metrics.engagement}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Monthly Reach</span>
                            <span className="font-bold text-blue-400">{currentDeal.metrics.reach.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Conversions</span>
                            <span className="font-bold text-purple-400">{currentDeal.metrics.conversions.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>ROI</span>
                            <span className="font-bold text-yellow-400">{currentDeal.metrics.roi}%</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold mb-3">Requirements</h4>
                        <div className="space-y-2">
                          {currentDeal.requirements.map((req, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                              <span className="text-sm">{req}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs content placeholders */}
            {activeTab !== 'marketplace' && activeTab !== 'active-deals' && (
              <div className="text-center py-20">
                <h2 className="text-3xl font-bold mb-4">
                  {activeTab === 'earnings' && 'Comprehensive Earnings Analytics'}
                  {activeTab === 'compliance' && 'Automated Compliance Management'}
                  {activeTab === 'analytics' && 'Advanced Performance Analytics'}
                </h2>
                <p className="text-white/70 text-lg mb-8">
                  Full feature suite available in production platform
                </p>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-green-500 rounded-xl font-bold hover:bg-green-600 transition-colors"
                >
                  Explore Full Platform
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Value Proposition */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-black mb-8">Maximize NIL Potential Safely</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 p-8 rounded-xl">
              <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">100% Compliant</h3>
              <p className="text-white/70">Automated compliance monitoring ensures all deals meet NCAA and state regulations.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Maximize Earnings</h3>
              <p className="text-white/70">AI-powered matching and negotiation tools increase earning potential by 400%.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Family Oversight</h3>
              <p className="text-white/70">Parents maintain full visibility and approval rights for all partnerships and earnings.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-green-500/30"
          >
            <DollarSign className="w-7 h-7" />
            Start Earning with NIL
            <ArrowRight className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </div>
  );
}