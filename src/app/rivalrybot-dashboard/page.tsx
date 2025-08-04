'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, Target, Users, Trophy, BarChart3, Crown,
  MessageCircle, Calendar, Bell, Settings, Flame,
  Eye, Play, Share2, Download, Upload, Search,
  Filter, TrendingUp, Award, Brain, Shield
} from 'lucide-react';

interface RivalryMetrics {
  activeRivalries: number;
  weeklyEngagement: number;
  viralMoments: number;
  totalReach: number;
  contentCreated: number;
  hypeGenerated: number;
}

interface Rivalry {
  id: string;
  opponent: string;
  sport: string;
  nextGame: string;
  hypeLevel: 'low' | 'medium' | 'high' | 'nuclear';
  engagement: number;
  prediction: string;
}

interface ViralMoment {
  id: string;
  title: string;
  type: 'video' | 'image' | 'stat' | 'prediction';
  views: number;
  engagement: number;
  timestamp: string;
  rivalry: string;
}

const MOCK_METRICS: RivalryMetrics = {
  activeRivalries: 12,
  weeklyEngagement: 847000,
  viralMoments: 23,
  totalReach: 2400000,
  contentCreated: 156,
  hypeGenerated: 94700
};

const MOCK_RIVALRIES: Rivalry[] = [
  { id: '1', opponent: 'Central High Eagles', sport: 'Football', nextGame: '2024-12-06', hypeLevel: 'nuclear', engagement: 94000, prediction: '78% Win Probability' },
  { id: '2', opponent: 'West Side Warriors', sport: 'Basketball', nextGame: '2024-12-08', hypeLevel: 'high', engagement: 67000, prediction: '65% Win Probability' },
  { id: '3', opponent: 'North Valley Wildcats', sport: 'Soccer', nextGame: '2024-12-10', hypeLevel: 'medium', engagement: 34000, prediction: '82% Win Probability' },
  { id: '4', opponent: 'South Park Panthers', sport: 'Wrestling', nextGame: '2024-12-12', hypeLevel: 'high', engagement: 45000, prediction: '71% Win Probability' }
];

const MOCK_VIRAL_MOMENTS: ViralMoment[] = [
  { id: '1', title: 'NUCLEAR PREDICTION: Eagles Upset Incoming!', type: 'prediction', views: 234000, engagement: 89, timestamp: '2 hours ago', rivalry: 'vs Central High' },
  { id: '2', title: 'Marcus Johnson Clutch TD Highlight', type: 'video', views: 156000, engagement: 94, timestamp: '5 hours ago', rivalry: 'vs Central High' },
  { id: '3', title: 'Statistical Domination Breakdown', type: 'stat', views: 98000, engagement: 76, timestamp: '1 day ago', rivalry: 'vs West Side' },
  { id: '4', title: 'Rivalry History: 10 Years of Battles', type: 'image', views: 67000, engagement: 82, timestamp: '2 days ago', rivalry: 'vs Central High' }
];

export default function RivalryBotDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const getHypeLevelColor = (level: string) => {
    switch (level) {
      case 'nuclear': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600/20 via-black/90 to-orange-600/20 border-b border-yellow-500/30 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <Zap className="w-8 h-8 text-black font-bold" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-yellow-400">RIVALRYBOT</h1>
              <p className="text-white/70">AI-Powered Rivalry Intelligence & Hype Generation</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-sm rounded">ACTIVE</span>
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-sm rounded">HYPE MODE: ON</span>
                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-sm rounded">NUCLEAR READY</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-yellow-600 text-black font-bold rounded hover:bg-yellow-700 transition-colors">
              <Flame className="w-4 h-4 inline-block mr-2" />
              Generate Hype
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
              <Target className="w-4 h-4 inline-block mr-2" />
              Launch Campaign
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-white/10">
        <div className="flex gap-8 px-6">
          {[
            { id: 'overview', label: 'Command Center', icon: BarChart3 },
            { id: 'rivalries', label: 'Active Rivalries', icon: Target },
            { id: 'viral', label: 'Viral Moments', icon: Flame },
            { id: 'predictions', label: 'AI Predictions', icon: Brain },
            { id: 'campaigns', label: 'Hype Campaigns', icon: Crown },
            { id: 'analytics', label: 'Performance', icon: TrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-yellow-400 text-yellow-400'
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
                <Target className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_METRICS.activeRivalries}</div>
                <div className="text-sm text-white/60">Active Rivalries</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Users className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{(MOCK_METRICS.weeklyEngagement / 1000).toFixed(0)}K</div>
                <div className="text-sm text-white/60">Weekly Engagement</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Flame className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_METRICS.viralMoments}</div>
                <div className="text-sm text-white/60">Viral Moments</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Eye className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{(MOCK_METRICS.totalReach / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-white/60">Total Reach</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Crown className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_METRICS.contentCreated}</div>
                <div className="text-sm text-white/60">Content Created</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{(MOCK_METRICS.hypeGenerated / 1000).toFixed(0)}K</div>
                <div className="text-sm text-white/60">HYPE Generated</div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Top Rivalries */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-yellow-400" />
                  Nuclear Rivalries
                </h3>
                <div className="space-y-4">
                  {MOCK_RIVALRIES.map((rivalry) => (
                    <div key={rivalry.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-white">{rivalry.opponent}</h4>
                          <p className="text-white/70">{rivalry.sport} • {rivalry.nextGame}</p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm border ${getHypeLevelColor(rivalry.hypeLevel)}`}>
                          {rivalry.hypeLevel.toUpperCase()}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/60">{rivalry.engagement.toLocaleString()} engagement</span>
                        <span className="text-sm text-green-400 font-semibold">{rivalry.prediction}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Viral Content */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Flame className="w-5 h-5 text-red-400" />
                  Viral Moments
                </h3>
                <div className="space-y-4">
                  {MOCK_VIRAL_MOMENTS.map((moment) => (
                    <div key={moment.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{moment.title}</h4>
                          <p className="text-sm text-white/60">{moment.rivalry} • {moment.timestamp}</p>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs ${
                          moment.type === 'video' ? 'bg-red-500/20 text-red-400' :
                          moment.type === 'prediction' ? 'bg-purple-500/20 text-purple-400' :
                          moment.type === 'stat' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {moment.type}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/60">{moment.views.toLocaleString()} views</span>
                        <span className="text-sm text-yellow-400 font-semibold">{moment.engagement}% engagement</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Live Hype Generator */}
            <div className="bg-gradient-to-r from-yellow-500/10 via-black/80 to-red-500/10 border border-yellow-500/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                <Zap className="w-6 h-6" />
                Live Hype Generator
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-black/40 rounded-lg p-4 text-center">
                  <Flame className="w-12 h-12 text-red-400 mx-auto mb-3" />
                  <h5 className="text-lg font-bold text-white mb-2">Nuclear Content</h5>
                  <p className="text-sm text-white/70">Generate viral-ready rivalry content with AI-powered insights</p>
                  <button className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                    Generate
                  </button>
                </div>
                <div className="bg-black/40 rounded-lg p-4 text-center">
                  <Brain className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <h5 className="text-lg font-bold text-white mb-2">AI Predictions</h5>
                  <p className="text-sm text-white/70">Data-driven game predictions and statistical analysis</p>
                  <button className="mt-3 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                    Predict
                  </button>
                </div>
                <div className="bg-black/40 rounded-lg p-4 text-center">
                  <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                  <h5 className="text-lg font-bold text-white mb-2">Hype Campaigns</h5>
                  <p className="text-sm text-white/70">Launch coordinated social media and community campaigns</p>
                  <button className="mt-3 px-4 py-2 bg-yellow-600 text-black font-bold rounded hover:bg-yellow-700 transition-colors">
                    Launch
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs would be implemented with real rivalry analysis tools */}
      </div>
    </div>
  );
}