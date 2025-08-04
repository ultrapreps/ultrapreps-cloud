'use client';

import { useState, useEffect } from 'react';
import { 
  Trophy, Star, Eye, Share2, Heart, TrendingUp,
  Video, Award, GraduationCap, Users, Zap,
  Phone, Mail, Download, ExternalLink, Bell,
  MessageCircle, Calendar, Target, Crown
} from 'lucide-react';

interface HUDData {
  hype_score: number;
  recent_stats: {
    [sport: string]: Record<string, string | number>;
  };
  achievements: string[];
  highlight_reels: Array<{
    title: string;
    url: string;
  }>;
  academics: {
    gpa: number;
    honors: string[];
  };
  recruiting: {
    contact: {
      coach_email: string;
    };
    test_scores: {
      sat?: number;
      act?: number;
    };
  };
  share_actions: {
    share_url: string;
    boost_hype: boolean;
    donate: boolean;
  };
  last_updated?: string;
  // Role-specific additions
  motivational_message?: string;
  progress_tracking?: any;
  brag_mode?: any;
  family_giving?: any;
  recruiting_package?: any;
  comparative_metrics?: any;
  team_context?: any;
  coaching_tools?: any;
}

interface HeroCardHUDProps {
  athleteId: string;
  role?: 'student' | 'parent' | 'recruiter' | 'coach' | 'public';
  isLive?: boolean;
  className?: string;
}

export default function HeroCardHUD({ 
  athleteId, 
  role = 'public', 
  isLive = true,
  className = '' 
}: HeroCardHUDProps) {
  const [hudData, setHudData] = useState<HUDData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [boostCount, setBoostCount] = useState(0);

  // Fetch HUD data
  useEffect(() => {
    const fetchHUDData = async () => {
      try {
        const response = await fetch(`/api/hud/${athleteId}?role=${role}`);
        if (!response.ok) throw new Error('Failed to fetch HUD data');
        
        const data = await response.json();
        setHudData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHUDData();
  }, [athleteId, role]);

  // Real-time updates via WebSocket (simplified simulation)
  useEffect(() => {
    if (!isLive || !hudData) return;

    const interval = setInterval(() => {
      // Simulate real-time HYPE updates
      setHudData(prev => prev ? {
        ...prev,
        hype_score: prev.hype_score + Math.floor(Math.random() * 3) - 1, // -1 to +2
        last_updated: new Date().toISOString()
      } : null);
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [isLive, hudData]);

  const handleBoostHype = async () => {
    try {
      const response = await fetch(`/api/hud/${athleteId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'boost', amount: 1 })
      });
      
      if (response.ok) {
        const result = await response.json();
        setBoostCount(prev => prev + 1);
        setHudData(prev => prev ? {
          ...prev,
          hype_score: result.new_hype_score
        } : null);
      }
    } catch (err) {
      console.error('Failed to boost HYPE:', err);
    }
  };

  const handleShare = async () => {
    try {
      await fetch(`/api/hud/${athleteId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'share' })
      });
      
      if (hudData?.share_actions?.share_url) {
        navigator.share?.({
          title: `Check out this athlete on UltraPreps!`,
          url: hudData.share_actions.share_url
        }) || window.open(hudData.share_actions.share_url, '_blank');
      }
    } catch (err) {
      console.error('Failed to share:', err);
    }
  };

  if (loading) {
    return (
      <div className={`bg-black/90 border border-white/20 rounded-xl p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-white/20 rounded mb-4"></div>
          <div className="h-8 bg-white/20 rounded mb-4"></div>
          <div className="h-20 bg-white/20 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !hudData) {
    return (
      <div className={`bg-red-500/10 border border-red-500/30 rounded-xl p-6 ${className}`}>
        <p className="text-red-400">Failed to load HUD data: {error}</p>
      </div>
    );
  }

  const getHypeColor = (score: number) => {
    if (score >= 90) return 'text-yellow-400 bg-yellow-500/20';
    if (score >= 75) return 'text-green-400 bg-green-500/20';
    if (score >= 50) return 'text-blue-400 bg-blue-500/20';
    return 'text-gray-400 bg-gray-500/20';
  };

  return (
    <div className={`bg-black/90 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden ${className}`}>
      {/* Live Indicator */}
      {isLive && (
        <div className="bg-red-500/20 border-b border-red-500/30 px-4 py-2">
          <div className="flex items-center gap-2 text-red-400 text-sm">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            LIVE HUD • Last updated: {new Date(hudData.last_updated || Date.now()).toLocaleTimeString()}
          </div>
        </div>
      )}

      <div className="p-6">
        {/* HYPE Score Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getHypeColor(hudData.hype_score)}`}>
              <span className="text-2xl font-bold">{hudData.hype_score}</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">HYPE SCORE</h3>
              <p className="text-white/60 text-sm">
                {hudData.hype_score >= 90 ? 'NUCLEAR' : 
                 hudData.hype_score >= 75 ? 'HIGH' : 
                 hudData.hype_score >= 50 ? 'RISING' : 'BUILDING'}
              </p>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="flex gap-2">
            {hudData.share_actions.boost_hype && (
              <button
                onClick={handleBoostHype}
                className="px-3 py-2 bg-yellow-600 text-black font-bold rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <Zap className="w-4 h-4 inline mr-1" />
                Boost
              </button>
            )}
            <button
              onClick={handleShare}
              className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Role-Specific Content */}
        {role === 'student' && hudData.motivational_message && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
            <p className="text-green-400 font-medium">{hudData.motivational_message}</p>
            {hudData.progress_tracking && (
              <div className="mt-3 grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-white font-bold">{hudData.progress_tracking.weekly_improvement}</div>
                  <div className="text-white/60 text-xs">Weekly Growth</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold">{hudData.progress_tracking.next_milestone}</div>
                  <div className="text-white/60 text-xs">Next Goal</div>
                </div>
                <div className="text-center">
                  <div className="text-white font-bold">{hudData.progress_tracking.achievement_progress}</div>
                  <div className="text-white/60 text-xs">Progress</div>
                </div>
              </div>
            )}
          </div>
        )}

        {role === 'parent' && hudData.brag_mode && (
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 mb-6">
            <h4 className="text-purple-400 font-bold mb-3 flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Brag Mode
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {hudData.brag_mode.milestones.slice(0, 4).map((milestone: string, index: number) => (
                <div key={index} className="bg-white/5 rounded p-2 text-sm text-white/80">
                  {milestone}
                </div>
              ))}
            </div>
          </div>
        )}

        {role === 'recruiter' && hudData.recruiting_package && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
            <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Recruiting Package
            </h4>
            <div className="space-y-2">
              <button className="w-full text-left p-2 bg-white/5 rounded hover:bg-white/10 transition-colors">
                <Mail className="w-4 h-4 inline mr-2" />
                Contact Coach: {hudData.recruiting.contact.coach_email}
              </button>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-white/5 rounded text-center">
                  <div className="text-white font-bold">{hudData.recruiting.test_scores.sat}</div>
                  <div className="text-white/60 text-xs">SAT</div>
                </div>
                <div className="p-2 bg-white/5 rounded text-center">
                  <div className="text-white font-bold">{hudData.recruiting.test_scores.act}</div>
                  <div className="text-white/60 text-xs">ACT</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {Object.entries(hudData.recent_stats).map(([sport, stats]) => (
            <div key={sport} className="bg-white/5 rounded-lg p-4">
              <h4 className="text-white font-semibold mb-2 capitalize">{sport}</h4>
              <div className="space-y-1">
                {Object.entries(stats).slice(0, 3).map(([stat, value]) => (
                  <div key={stat} className="flex justify-between text-sm">
                    <span className="text-white/60 capitalize">{stat}:</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div className="mb-6">
          <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Award className="w-4 h-4 text-yellow-400" />
            Recent Achievements
          </h4>
          <div className="flex flex-wrap gap-2">
            {hudData.achievements.slice(0, 4).map((achievement, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm rounded-full"
              >
                {achievement}
              </span>
            ))}
          </div>
        </div>

        {/* Highlight Reels */}
        {hudData.highlight_reels.length > 0 && (
          <div className="mb-6">
            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Video className="w-4 h-4 text-blue-400" />
              Highlight Reels
            </h4>
            <div className="space-y-2">
              {hudData.highlight_reels.map((reel, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                  onClick={() => window.open(reel.url, '_blank')}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Video className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{reel.title}</div>
                      <div className="text-white/60 text-sm">Click to watch</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/40 ml-auto" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Academic Info */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Academics
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{hudData.academics.gpa}</div>
              <div className="text-white/60 text-sm">GPA</div>
            </div>
            <div>
              <div className="text-white/60 text-sm mb-1">Honors:</div>
              <div className="flex flex-wrap gap-1">
                {hudData.academics.honors.slice(0, 2).map((honor, index) => (
                  <span key={index} className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                    {honor}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}