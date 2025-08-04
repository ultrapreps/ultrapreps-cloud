'use client';

import { useState, useEffect } from 'react';
import { 
  Radar, Target, Eye, Zap, Shield, Brain,
  Globe, Satellite, Activity, TrendingUp,
  AlertTriangle, CheckCircle, Clock, Search
} from 'lucide-react';

interface DataSource {
  id: string;
  name: string;
  type: 'sports' | 'academic' | 'social' | 'media' | 'recruiting';
  status: 'scanning' | 'found' | 'processing' | 'complete';
  itemsFound: number;
  confidence: number;
  lastUpdate: string;
}

interface Discovery {
  id: string;
  type: 'video' | 'stat' | 'article' | 'social' | 'achievement';
  source: string;
  title: string;
  confidence: number;
  timestamp: string;
  verified: boolean;
}

const MOCK_DATA_SOURCES: DataSource[] = [
  { id: '1', name: 'MaxPreps', type: 'sports', status: 'complete', itemsFound: 47, confidence: 98, lastUpdate: '2 min ago' },
  { id: '2', name: 'Hudl', type: 'sports', status: 'processing', itemsFound: 23, confidence: 94, lastUpdate: '1 min ago' },
  { id: '3', name: 'Instagram', type: 'social', status: 'scanning', itemsFound: 156, confidence: 87, lastUpdate: '30s ago' },
  { id: '4', name: 'TikTok', type: 'social', status: 'found', itemsFound: 89, confidence: 92, lastUpdate: '45s ago' },
  { id: '5', name: 'YouTube', type: 'media', status: 'complete', itemsFound: 34, confidence: 96, lastUpdate: '3 min ago' },
  { id: '6', name: 'Twitter/X', type: 'social', status: 'scanning', itemsFound: 234, confidence: 85, lastUpdate: '15s ago' },
  { id: '7', name: 'Athletic.net', type: 'sports', status: 'processing', itemsFound: 67, confidence: 99, lastUpdate: '1 min ago' },
  { id: '8', name: 'Local News', type: 'media', status: 'found', itemsFound: 12, confidence: 91, lastUpdate: '2 min ago' }
];

const MOCK_DISCOVERIES: Discovery[] = [
  { id: '1', type: 'video', source: 'Hudl', title: 'State Championship Highlight Reel', confidence: 98, timestamp: '30s ago', verified: true },
  { id: '2', type: 'stat', source: 'MaxPreps', title: 'Season Statistics Update', confidence: 99, timestamp: '1 min ago', verified: true },
  { id: '3', type: 'article', source: 'Local Herald', title: 'Rising Star: Marcus Johnson Profile', confidence: 94, timestamp: '2 min ago', verified: false },
  { id: '4', type: 'social', source: 'Instagram', title: 'Training Session Post', confidence: 87, timestamp: '3 min ago', verified: true },
  { id: '5', type: 'achievement', source: 'School Records', title: 'Academic Honor Roll', confidence: 96, timestamp: '5 min ago', verified: true }
];

interface PredatorEngineProps {
  isActive: boolean;
  targetProfile: string;
  onDataFound?: (discoveries: Discovery[]) => void;
}

export default function PredatorEngine({ isActive, targetProfile, onDataFound }: PredatorEngineProps) {
  const [dataSources, setDataSources] = useState(MOCK_DATA_SOURCES);
  const [discoveries, setDiscoveries] = useState(MOCK_DISCOVERIES);
  const [scanProgress, setScanProgress] = useState(67);
  const [totalItemsFound, setTotalItemsFound] = useState(662);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      // Simulate real-time scanning
      setDataSources(prev => prev.map(source => {
        if (source.status === 'scanning') {
          return {
            ...source,
            itemsFound: source.itemsFound + Math.floor(Math.random() * 5),
            lastUpdate: 'just now'
          };
        }
        if (source.status === 'processing' && Math.random() > 0.7) {
          return {
            ...source,
            status: 'complete',
            confidence: Math.min(source.confidence + Math.random() * 5, 99),
            lastUpdate: 'just now'
          };
        }
        return source;
      }));

      setScanProgress(prev => Math.min(prev + Math.random() * 2, 95));
      setTotalItemsFound(prev => prev + Math.floor(Math.random() * 3));

      // Simulate new discoveries
      if (Math.random() > 0.8) {
        const newDiscovery: Discovery = {
          id: Date.now().toString(),
          type: ['video', 'stat', 'article', 'social', 'achievement'][Math.floor(Math.random() * 5)] as any,
          source: 'Live Scan',
          title: 'New data discovered...',
          confidence: 85 + Math.random() * 10,
          timestamp: 'just now',
          verified: Math.random() > 0.5
        };
        setDiscoveries(prev => [newDiscovery, ...prev.slice(0, 9)]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'found': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'scanning': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete': return <CheckCircle className="w-4 h-4" />;
      case 'processing': return <Brain className="w-4 h-4 animate-pulse" />;
      case 'found': return <Eye className="w-4 h-4" />;
      case 'scanning': return <Radar className="w-4 h-4 animate-spin" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return '🎥';
      case 'stat': return '📊';
      case 'article': return '📰';
      case 'social': return '📱';
      case 'achievement': return '🏆';
      default: return '🔍';
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
            <Radar className="w-6 h-6 text-white animate-spin" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">PREDATOR ENGINE</h3>
            <p className="text-white/70">Multi-Source Data Harvesting for {targetProfile}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-red-400">{totalItemsFound}</div>
          <div className="text-sm text-white/60">Items Found</div>
        </div>
      </div>

      {/* Scan Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-medium flex items-center gap-2">
            <Satellite className="w-4 h-4 text-red-400" />
            Deep Scan Progress
          </span>
          <span className="text-red-400 font-semibold">{scanProgress.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${scanProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Data Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {dataSources.map((source) => (
          <div key={source.id} className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(source.status)}
                <span className="text-white font-medium">{source.name}</span>
              </div>
              <div className={`px-2 py-1 rounded border text-xs ${getStatusColor(source.status)}`}>
                {source.status.toUpperCase()}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/60">{source.itemsFound} items</span>
              <span className="text-sm text-green-400 font-semibold">{source.confidence}% confidence</span>
            </div>
            <div className="text-xs text-white/40 mt-1">{source.lastUpdate}</div>
          </div>
        ))}
      </div>

      {/* Live Discovery Feed */}
      <div className="bg-black/40 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-orange-400" />
          Live Discovery Feed
        </h4>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {discoveries.map((discovery) => (
            <div key={discovery.id} className="flex items-start gap-3 p-3 bg-white/5 rounded">
              <div className="text-lg">{getTypeIcon(discovery.type)}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium text-sm">{discovery.title}</span>
                  <div className="flex items-center gap-2">
                    {discovery.verified && <Shield className="w-3 h-3 text-green-400" />}
                    <span className="text-xs text-orange-400">{discovery.confidence.toFixed(0)}%</span>
                  </div>
                </div>
                <div className="text-xs text-white/60">
                  {discovery.source} • {discovery.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Engine Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
          <Search className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-white">8</div>
          <div className="text-xs text-white/60">Sources Active</div>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-center">
          <TrendingUp className="w-6 h-6 text-orange-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-white">94%</div>
          <div className="text-xs text-white/60">Avg Confidence</div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-center">
          <Globe className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-white">∞</div>
          <div className="text-xs text-white/60">Coverage</div>
        </div>
      </div>
    </div>
  );
}