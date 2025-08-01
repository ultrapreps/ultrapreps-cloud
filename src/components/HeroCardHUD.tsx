'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Trophy, TrendingUp, Share2, Eye, Users, Star } from 'lucide-react';
// Temporarily disabled WebSocket import
// import { useWebSocket } from '@/lib/websocket/client';
import { HUDData } from '@/app/api/hud/[athleteId]/route';

interface HeroCardHUDProps {
  athleteId: string;
  initialData?: HUDData;
  userRole?: string;
}

export default function HeroCardHUD({ athleteId, initialData, userRole = 'guest' }: HeroCardHUDProps) {
  const [hudData, setHudData] = useState<HUDData | null>(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [hypeAnimation, setHypeAnimation] = useState(false);
  
  // Temporarily disabled WebSocket
  // const { onHypeUpdate, onLiveActivity, sendHype } = useWebSocket();

  // Fetch initial HUD data
  useEffect(() => {
    if (!initialData) {
      fetchHUDData();
    }
  }, [athleteId]);

  // Subscribe to WebSocket updates - TEMPORARILY DISABLED
  // useEffect(() => {
  //   const unsubscribeHype = onHypeUpdate((data) => {
  //     if (data.userId === athleteId) {
  //       setHudData(prev => prev ? {
  //         ...prev,
  //         hype_score: prev.hype_score + data.amount
  //       } : null);
        
  //       // Trigger animation
  //       setHypeAnimation(true);
  //       setTimeout(() => setHypeAnimation(false), 1000);
  //     }
  //   });

  //   const unsubscribeActivity = onLiveActivity((activity) => {
  //     // Handle live updates for achievements, stats, etc.
  //     if (activity.userId === athleteId && activity.type === 'achievement') {
  //       setHudData(prev => prev ? {
  //         ...prev,
  //         achievements: [activity.message, ...prev.achievements].slice(0, 5)
  //       } : null);
  //     }
  //   });

  //   return () => {
  //     unsubscribeHype();
  //     unsubscribeActivity();
  //   };
  // }, [athleteId, onHypeUpdate, onLiveActivity]);

  const fetchHUDData = async () => {
    try {
      const response = await fetch(`/api/hud/${athleteId}`);
      if (response.ok) {
        const data = await response.json();
        setHudData(data);
      }
    } catch (error) {
      console.error('Failed to fetch HUD data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBoostHype = async () => {
    try {
      const response = await fetch(`/api/hud/${athleteId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'boost_hype', amount: 10 }),
      });

      if (response.ok) {
        // Simulate real-time update without WebSocket
        setHudData(prev => prev ? {
          ...prev,
          hype_score: prev.hype_score + 10
        } : null);
        
        // Trigger animation
        setHypeAnimation(true);
        setTimeout(() => setHypeAnimation(false), 1000);
      }
    } catch (error) {
      console.error('Failed to boost HYPE:', error);
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-800/50 rounded-lg p-6">
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }

  if (!hudData) return null;

  return (
    <div className="relative bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-xl rounded-lg p-6 border border-gray-800">
      {/* HYPE Score with Animation */}
      <motion.div 
        className="flex items-center justify-between mb-6"
        animate={hypeAnimation ? { scale: [1, 1.1, 1] } : {}}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <Zap className="w-8 h-8 text-[#F59E0B]" />
            {hypeAnimation && (
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Zap className="w-8 h-8 text-[#F59E0B]" />
              </motion.div>
            )}
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{hudData.hype_score.toLocaleString()}</div>
            <div className="text-xs text-gray-400">HYPE Points</div>
          </div>
        </div>
        
        {hudData.share_actions.boost_hype && (
          <button
            onClick={handleBoostHype}
            className="px-4 py-2 bg-[#F59E0B] hover:bg-[#F59E0B]/80 text-black font-semibold rounded-lg transition-all transform hover:scale-105"
          >
            +10 HYPE
          </button>
        )}
      </motion.div>

      {/* Recent Stats */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-400 mb-3">RECENT STATS</h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(hudData.recent_stats).map(([sport, stats]) => (
            <div key={sport} className="bg-gray-800/50 rounded-lg p-3">
              <div className="text-xs text-gray-400 uppercase mb-1">{sport}</div>
              {Object.entries(stats).slice(0, 2).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="text-xs text-gray-300">{key}:</span>
                  <span className="text-sm font-semibold text-white">{value}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      {hudData.achievements.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            ACHIEVEMENTS
          </h3>
          <div className="space-y-2">
            <AnimatePresence>
              {hudData.achievements.map((achievement, index) => (
                <motion.div
                  key={achievement}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-sm text-gray-300 flex items-center gap-2"
                >
                  <Star className="w-3 h-3 text-[#F59E0B]" />
                  {achievement}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Academic Info (Role-based) */}
      {(userRole === 'PARENT' || userRole === 'COLLEGE_SCOUT') && hudData.academics && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">ACADEMICS</h3>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-300">GPA:</span>
              <span className="text-lg font-bold text-white">{hudData.academics.gpa}</span>
            </div>
            {hudData.academics.honors.map(honor => (
              <div key={honor} className="text-xs text-[#F59E0B]">{honor}</div>
            ))}
          </div>
        </div>
      )}

      {/* Recruiter View */}
      {userRole === 'COLLEGE_SCOUT' && hudData.recruiting && (
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-400 mb-3">RECRUITING INFO</h3>
          <div className="bg-gray-800/50 rounded-lg p-3 space-y-2">
            {hudData.recruiting.test_scores.sat && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-300">SAT:</span>
                <span className="font-semibold text-white">{hudData.recruiting.test_scores.sat}</span>
              </div>
            )}
            {hudData.recruiting.test_scores.act && (
              <div className="flex justify-between">
                <span className="text-sm text-gray-300">ACT:</span>
                <span className="font-semibold text-white">{hudData.recruiting.test_scores.act}</span>
              </div>
            )}
            {hudData.recruiting.contact.coach_email && (
              <button className="w-full mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all">
                Contact Coach
              </button>
            )}
          </div>
        </div>
      )}

      {/* Share Actions */}
      <div className="flex gap-3">
        <button className="flex-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2">
          <Share2 className="w-4 h-4" />
          Share
        </button>
        {hudData.share_actions.donate && (
          <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2">
            <Users className="w-4 h-4" />
            Support
          </button>
        )}
      </div>

      {/* Live Indicator */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs text-green-500">LIVE</span>
      </div>
    </div>
  );
}