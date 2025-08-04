'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Zap, Radio, Signal, TrendingUp, Users, Globe,
  Eye, Target, Brain, Crown, Shield, Star,
  BarChart3, Activity, Wifi, Satellite, Radar,
  Bell, MessageCircle, Share2, Download, Upload
} from 'lucide-react';

interface SignalMetrics {
  activeSources: number;
  signalStrength: number;
  dataPoints: number;
  predictions: number;
  accuracy: number;
  coverage: number;
}

interface SignalSource {
  id: string;
  name: string;
  type: 'social' | 'news' | 'recruiting' | 'performance' | 'network';
  strength: number;
  status: 'active' | 'monitoring' | 'analyzing' | 'critical';
  dataFlow: number;
  insights: number;
}

interface SignalAlert {
  id: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  source: string;
  message: string;
  timestamp: string;
  action: string;
}

const MOCK_METRICS: SignalMetrics = {
  activeSources: 847,
  signalStrength: 94,
  dataPoints: 2400000,
  predictions: 156,
  accuracy: 87,
  coverage: 99
};

const MOCK_SOURCES: SignalSource[] = [
  { id: '1', name: 'Social Media Intelligence', type: 'social', strength: 94, status: 'active', dataFlow: 12000, insights: 47 },
  { id: '2', name: 'Recruiting Network Pulse', type: 'recruiting', strength: 89, status: 'critical', dataFlow: 8500, insights: 23 },
  { id: '3', name: 'Performance Data Stream', type: 'performance', strength: 92, status: 'analyzing', dataFlow: 15000, insights: 34 },
  { id: '4', name: 'News & Media Scanner', type: 'news', strength: 78, status: 'monitoring', dataFlow: 6700, insights: 12 },
  { id: '5', name: 'Network Effect Tracker', type: 'network', strength: 96, status: 'active', dataFlow: 18000, insights: 67 }
];

const MOCK_ALERTS: SignalAlert[] = [
  { id: '1', priority: 'critical', source: 'Recruiting Intelligence', message: 'Alabama coach viewed Marcus profile 8 times in 24 hours', timestamp: '2 min ago', action: 'Contact immediately' },
  { id: '2', priority: 'high', source: 'Social Signal', message: 'Viral potential detected - highlight video gaining momentum', timestamp: '15 min ago', action: 'Amplify content' },
  { id: '3', priority: 'medium', source: 'Performance Analytics', message: 'Statistical anomaly - performance spike detected', timestamp: '1 hour ago', action: 'Investigate metrics' },
  { id: '4', priority: 'high', source: 'Network Analysis', message: 'Influence cluster forming around your content', timestamp: '2 hours ago', action: 'Engage community' }
];

export default function SignalPrime() {
  const [activeView, setActiveView] = useState('command');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'analyzing': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'monitoring': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600/20 via-black/90 to-purple-600/20 border-b border-pink-500/30 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <Signal className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-pink-400">SIGNALPRIME</h1>
              <p className="text-white/70">Advanced Signal Intelligence & Predictive Analytics</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-sm rounded">SIGNAL LOCK</span>
                <span className="px-2 py-1 bg-pink-500/20 text-pink-400 text-sm rounded">AI PRIME</span>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-sm rounded">NEURAL ACTIVE</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors">
              <Radar className="w-4 h-4 inline-block mr-2" />
              Deep Scan
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
              <Brain className="w-4 h-4 inline-block mr-2" />
              AI Predict
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-white/10">
        <div className="flex gap-8 px-6">
          {[
            { id: 'command', label: 'Command Center', icon: Radio },
            { id: 'sources', label: 'Signal Sources', icon: Satellite },
            { id: 'intelligence', label: 'AI Intelligence', icon: Brain },
            { id: 'predictions', label: 'Predictions', icon: Target },
            { id: 'network', label: 'Network Analysis', icon: Globe },
            { id: 'alerts', label: 'Live Alerts', icon: Bell }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                activeView === tab.id
                  ? 'border-pink-400 text-pink-400'
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
        {activeView === 'command' && (
          <div className="space-y-6">
            {/* Signal Strength Grid */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Satellite className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_METRICS.activeSources}</div>
                <div className="text-sm text-white/60">Active Sources</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Signal className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_METRICS.signalStrength}%</div>
                <div className="text-sm text-white/60">Signal Strength</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Activity className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{(MOCK_METRICS.dataPoints / 1000000).toFixed(1)}M</div>
                <div className="text-sm text-white/60">Data Points</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_METRICS.predictions}</div>
                <div className="text-sm text-white/60">Predictions</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <BarChart3 className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_METRICS.accuracy}%</div>
                <div className="text-sm text-white/60">AI Accuracy</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Globe className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_METRICS.coverage}%</div>
                <div className="text-sm text-white/60">Coverage</div>
              </div>
            </div>

            {/* Main Intelligence Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Signal Sources Status */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Radio className="w-5 h-5 text-pink-400" />
                  Live Signal Sources
                </h3>
                <div className="space-y-4">
                  {MOCK_SOURCES.map((source) => (
                    <div key={source.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-white">{source.name}</h4>
                          <p className="text-white/60 text-sm">{source.type} • {source.dataFlow.toLocaleString()} data/hr</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`px-2 py-1 rounded border text-xs ${getStatusColor(source.status)}`}>
                            {source.status.toUpperCase()}
                          </div>
                          <div className="text-white font-bold">{source.strength}%</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/60">{source.insights} insights generated</span>
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-pink-500 h-2 rounded-full transition-all"
                            style={{ width: `${source.strength}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Critical Alerts */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-orange-400" />
                  Critical Signal Alerts
                </h3>
                <div className="space-y-4">
                  {MOCK_ALERTS.map((alert) => (
                    <div key={alert.id} className="bg-white/5 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`px-2 py-1 rounded border text-xs ${getPriorityColor(alert.priority)}`}>
                              {alert.priority.toUpperCase()}
                            </div>
                            <span className="text-white/60 text-sm">{alert.source}</span>
                          </div>
                          <p className="text-white font-medium">{alert.message}</p>
                          <p className="text-white/60 text-sm mt-1">{alert.timestamp}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-purple-400 font-medium">Action: {alert.action}</span>
                        <button className="px-3 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                          Execute
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Neural Network Visualization */}
            <div className="bg-gradient-to-r from-pink-500/10 via-black/80 to-purple-500/10 border border-pink-500/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-pink-400 mb-4 flex items-center gap-2">
                <Brain className="w-6 h-6" />
                Neural Signal Processing
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-black/40 rounded-lg p-4 text-center">
                  <Radar className="w-12 h-12 text-green-400 mx-auto mb-3 animate-spin" />
                  <h5 className="text-lg font-bold text-white mb-2">Deep Scanning</h5>
                  <p className="text-sm text-white/70">Continuous 360° signal monitoring across all networks</p>
                </div>
                <div className="bg-black/40 rounded-lg p-4 text-center">
                  <Activity className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <h5 className="text-lg font-bold text-white mb-2">Pattern Recognition</h5>
                  <p className="text-sm text-white/70">AI identifies emerging trends and behavioral patterns</p>
                </div>
                <div className="bg-black/40 rounded-lg p-4 text-center">
                  <Target className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                  <h5 className="text-lg font-bold text-white mb-2">Predictive Analysis</h5>
                  <p className="text-sm text-white/70">Future outcome modeling with 87% accuracy</p>
                </div>
                <div className="bg-black/40 rounded-lg p-4 text-center">
                  <Zap className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                  <h5 className="text-lg font-bold text-white mb-2">Action Triggers</h5>
                  <p className="text-sm text-white/70">Automated responses to critical signal changes</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}