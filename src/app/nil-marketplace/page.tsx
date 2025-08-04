'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  DollarSign, TrendingUp, Users, Award, Star, Target,
  Calendar, Shield, Eye, Share2, Download, Upload,
  Search, Filter, BarChart3, Crown, Heart, Zap,
  Building, MapPin, Clock, CheckCircle, AlertCircle
} from 'lucide-react';

interface NILMetrics {
  totalEarnings: number;
  activeBrands: number;
  completedDeals: number;
  monthlyIncome: number;
  socialReach: number;
  complianceScore: number;
}

interface NILDeal {
  id: string;
  brand: string;
  value: number;
  type: 'social' | 'appearance' | 'endorsement' | 'content';
  status: 'active' | 'pending' | 'completed' | 'expired';
  deadline: string;
  deliverables: string[];
  compliance: 'approved' | 'pending' | 'flagged';
}

interface BrandOpportunity {
  id: string;
  company: string;
  campaign: string;
  value: number;
  requirements: string[];
  deadline: string;
  category: string;
  match: number;
}

const MOCK_METRICS: NILMetrics = {
  totalEarnings: 847000,
  activeBrands: 12,
  completedDeals: 23,
  monthlyIncome: 67000,
  socialReach: 2400000,
  complianceScore: 98
};

const MOCK_DEALS: NILDeal[] = [
  { 
    id: '1', 
    brand: 'Nike Football', 
    value: 25000, 
    type: 'endorsement', 
    status: 'active', 
    deadline: '2024-12-31',
    deliverables: ['3 Instagram posts', '1 TikTok video', 'Game day gear'],
    compliance: 'approved'
  },
  { 
    id: '2', 
    brand: 'Local Auto Dealership', 
    value: 5000, 
    type: 'appearance', 
    status: 'pending', 
    deadline: '2024-12-15',
    deliverables: ['Commercial appearance', '2 social posts'],
    compliance: 'pending'
  },
  { 
    id: '3', 
    brand: 'Sports Nutrition Co', 
    value: 8000, 
    type: 'content', 
    status: 'active', 
    deadline: '2025-01-15',
    deliverables: ['Monthly workout videos', 'Nutrition tips content'],
    compliance: 'approved'
  }
];

const MOCK_OPPORTUNITIES: BrandOpportunity[] = [
  { 
    id: '1', 
    company: 'Under Armour', 
    campaign: 'Rising Stars Program', 
    value: 35000, 
    requirements: ['10K+ followers', 'Football player', 'High school senior'],
    deadline: '2024-12-20',
    category: 'Athletic Apparel',
    match: 95
  },
  { 
    id: '2', 
    company: 'Gatorade', 
    campaign: 'Fuel Your Fire', 
    value: 15000, 
    requirements: ['Active athlete', '5K+ TikTok followers', 'Training content'],
    deadline: '2024-12-25',
    category: 'Sports Nutrition',
    match: 88
  },
  { 
    id: '3', 
    company: 'Local Restaurant Chain', 
    campaign: 'Community Champions', 
    value: 3000, 
    requirements: ['Local athlete', 'Community involvement', 'Social presence'],
    deadline: '2024-12-10',
    category: 'Food & Beverage',
    match: 76
  }
];

export default function NILMarketplace() {
  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'completed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getComplianceColor = (compliance: string) => {
    switch (compliance) {
      case 'approved': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'flagged': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600/20 via-black/90 to-blue-600/20 border-b border-green-500/30 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-white font-bold" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-green-400">NIL MARKETPLACE</h1>
              <p className="text-white/70">Name, Image & Likeness Opportunities Hub</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-sm rounded">VERIFIED ATHLETE</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-sm rounded">COMPLIANCE: 98%</span>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-sm rounded">HIGH VALUE</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
              <Search className="w-4 h-4 inline-block mr-2" />
              Browse Deals
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              <Upload className="w-4 h-4 inline-block mr-2" />
              Submit Content
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-white/10">
        <div className="flex gap-8 px-6">
          {[
            { id: 'overview', label: 'Dashboard', icon: BarChart3 },
            { id: 'deals', label: 'Active Deals', icon: DollarSign },
            { id: 'opportunities', label: 'New Opportunities', icon: Target },
            { id: 'earnings', label: 'Earnings', icon: TrendingUp },
            { id: 'compliance', label: 'Compliance', icon: Shield },
            { id: 'portfolio', label: 'Portfolio', icon: Award }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-green-400 text-green-400'
                  : 'border-transparent text-white/70 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">${(MOCK_METRICS.totalEarnings / 1000).toFixed(0)}K</div>
                <div className="text-sm text-white/60">Total Earnings</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Building className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_METRICS.activeBrands}</div>
                <div className="text-sm text-white/60">Active Brands</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <CheckCircle className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_METRICS.completedDeals}</div>
                <div className="text-sm text-white/60">Completed Deals</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <TrendingUp className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">${(MOCK_METRICS.monthlyIncome / 1000).toFixed(0)}K</div>
                <div className="text-sm text-white/60">Monthly Income</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Eye className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{(MOCK_METRICS.socialReach / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-white/60">Social Reach</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_METRICS.complianceScore}%</div>
                <div className="text-sm text-white/60">Compliance Score</div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Active Deals */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  Active NIL Deals
                </h3>
                <div className="space-y-4">
                  {MOCK_DEALS.filter(deal => deal.status === 'active').map((deal) => (
                    <div key={deal.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-white">{deal.brand}</h4>
                          <p className="text-white/70">${deal.value.toLocaleString()} • {deal.type}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`px-2 py-1 rounded border text-xs ${getStatusColor(deal.status)}`}>
                            {deal.status.toUpperCase()}
                          </div>
                          <div className={`px-2 py-1 rounded text-xs ${getComplianceColor(deal.compliance)}`}>
                            <Shield className="w-3 h-3 inline-block mr-1" />
                            {deal.compliance}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-white/60">
                          <strong>Deliverables:</strong> {deal.deliverables.join(', ')}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white/60">Due: {deal.deadline}</span>
                          <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* New Opportunities */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  New Opportunities
                </h3>
                <div className="space-y-4">
                  {MOCK_OPPORTUNITIES.slice(0, 3).map((opportunity) => (
                    <div key={opportunity.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-white">{opportunity.company}</h4>
                          <p className="text-white/70">{opportunity.campaign}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-green-400 font-bold">${opportunity.value.toLocaleString()}</div>
                          <div className={`px-2 py-1 rounded text-xs ${
                            opportunity.match >= 90 ? 'bg-green-500/20 text-green-400' :
                            opportunity.match >= 80 ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {opportunity.match}% match
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-white/60">
                          <strong>Requirements:</strong> {opportunity.requirements.join(', ')}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white/60">Apply by: {opportunity.deadline}</span>
                          <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* NIL Education & Tools */}
            <div className="bg-gradient-to-r from-purple-500/10 via-black/80 to-blue-500/10 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                <Crown className="w-6 h-6" />
                NIL Success Tools
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-black/40 rounded-lg p-4 text-center">
                  <Shield className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <h5 className="text-lg font-bold text-white mb-2">Compliance Checker</h5>
                  <p className="text-sm text-white/70">Ensure all deals meet NCAA and state regulations</p>
                </div>
                <div className="bg-black/40 rounded-lg p-4 text-center">
                  <BarChart3 className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <h5 className="text-lg font-bold text-white mb-2">Value Calculator</h5>
                  <p className="text-sm text-white/70">Calculate fair market value for your NIL deals</p>
                </div>
                <div className="bg-black/40 rounded-lg p-4 text-center">
                  <Award className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                  <h5 className="text-lg font-bold text-white mb-2">Brand Matching</h5>
                  <p className="text-sm text-white/70">AI-powered brand compatibility analysis</p>
                </div>
                <div className="bg-black/40 rounded-lg p-4 text-center">
                  <TrendingUp className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                  <h5 className="text-lg font-bold text-white mb-2">Performance Tracking</h5>
                  <p className="text-sm text-white/70">Track ROI and engagement for all campaigns</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs would be implemented with real NIL management tools */}
      </div>
    </div>
  );
}