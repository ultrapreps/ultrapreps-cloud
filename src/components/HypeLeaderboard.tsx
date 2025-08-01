'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, TrendingUp, TrendingDown, Minus, Zap, School, Medal, Users } from 'lucide-react';
import { useWebSocket } from '@/lib/websocket/client';
import Image from 'next/image';

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  schoolName: string;
  sport: string;
  totalHype: number;
  weeklyHype: number;
  rank: number;
  change: number;
  avatar?: string;
}

interface HypeLeaderboardProps {
  type?: 'global' | 'school' | 'sport';
  schoolId?: string;
  sport?: string;
  limit?: number;
  showWeekly?: boolean;
  compact?: boolean;
}

export default function HypeLeaderboard({
  type = 'global',
  schoolId,
  sport,
  limit = 10,
  showWeekly = true,
  compact = false
}: HypeLeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const { onHypeUpdate } = useWebSocket();

  // Fetch leaderboard data
  const fetchLeaderboard = async () => {
    try {
      const params = new URLSearchParams({
        type,
        limit: limit.toString()
      });
      
      if (schoolId) params.append('schoolId', schoolId);
      if (sport) params.append('sport', sport);
      
      const response = await fetch(`/api/hype/leaderboard?${params}`);
      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data.leaderboard);
        setLastUpdate(new Date(data.lastUpdated));
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, [type, schoolId, sport, limit]);

  // Listen for real-time HYPE updates
  useEffect(() => {
    const unsubscribe = onHypeUpdate((update) => {
      // Update the leaderboard entry if the user is in it
      setLeaderboard(prev => prev.map(entry => {
        if (entry.userId === update.userId) {
          return {
            ...entry,
            totalHype: update.totalHype,
            weeklyHype: entry.weeklyHype + update.amount
          };
        }
        return entry;
      }));
      
      // Trigger animation effect
      const element = document.getElementById(`hype-user-${update.userId}`);
      if (element) {
        element.classList.add('hype-pulse');
        setTimeout(() => element.classList.remove('hype-pulse'), 1000);
      }
    });

    return unsubscribe;
  }, [onHypeUpdate]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-400" />;
      default:
        return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    } else if (change < 0) {
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    }
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'school':
        return <School className="w-5 h-5" />;
      case 'sport':
        return <Trophy className="w-5 h-5" />;
      default:
        return <Users className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-800 rounded w-1/3 mb-4" />
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-800 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gray-900 rounded-lg ${compact ? 'p-4' : 'p-6'}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F59E0B]/20 rounded-lg flex items-center justify-center">
            {getTypeIcon()}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">
              {type === 'global' && 'Global Leaderboard'}
              {type === 'school' && 'School Leaderboard'}
              {type === 'sport' && `${sport} Leaderboard`}
            </h3>
            <p className="text-sm text-gray-400">
              Updated {new Date(lastUpdate).toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#F59E0B]" />
          <span className="text-sm font-semibold text-[#F59E0B]">LIVE</span>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="space-y-2">
        <AnimatePresence>
          {leaderboard.map((entry, index) => (
            <motion.div
              key={entry.userId}
              id={`hype-user-${entry.userId}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: index * 0.05 }}
              className={`hype-entry flex items-center gap-4 p-3 rounded-lg transition-all ${
                index < 3 ? 'bg-gray-800/70' : 'bg-gray-800/30'
              } hover:bg-gray-800/50`}
            >
              {/* Rank */}
              <div className="w-10 flex items-center justify-center">
                {getRankIcon(entry.rank)}
              </div>

              {/* Avatar */}
              <div className="relative">
                {entry.avatar ? (
                  <Image
                    src={entry.avatar}
                    alt={entry.userName}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-lg font-bold">
                      {entry.userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                {entry.rank <= 3 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#F59E0B] rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-black">{entry.rank}</span>
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="font-semibold text-white">{entry.userName}</div>
                <div className="text-xs text-gray-400">
                  {entry.schoolName} • {entry.sport}
                </div>
              </div>

              {/* Change Indicator */}
              {!compact && (
                <div className="flex items-center gap-1">
                  {getChangeIcon(entry.change)}
                  {entry.change !== 0 && (
                    <span className={`text-xs font-medium ${
                      entry.change > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {Math.abs(entry.change)}
                    </span>
                  )}
                </div>
              )}

              {/* HYPE Score */}
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-[#F59E0B]" />
                  <span className="text-lg font-bold text-white">
                    {entry.totalHype.toLocaleString()}
                  </span>
                </div>
                {showWeekly && !compact && (
                  <div className="text-xs text-gray-400">
                    +{entry.weeklyHype} this week
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer */}
      {!compact && (
        <div className="mt-6 pt-4 border-t border-gray-800">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">
              Showing top {leaderboard.length} of {type}
            </span>
            <button className="text-[#F59E0B] hover:text-[#F59E0B]/80 font-medium">
              View All →
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        .hype-pulse {
          animation: pulse 1s ease-out;
        }
        
        @keyframes pulse {
          0% {
            background-color: rgba(245, 158, 11, 0.3);
            transform: scale(1);
          }
          50% {
            background-color: rgba(245, 158, 11, 0.5);
            transform: scale(1.02);
          }
          100% {
            background-color: transparent;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}