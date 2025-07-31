'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Trophy, Star, Gift } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  hypeReward: number;
  rarity: string;
  unlockedAt: Date;
  category: string;
}

interface HypeUser {
  id: string;
  username: string;
  currentHype: number;
  totalEarned: number;
  level: number;
  achievements: Achievement[];
  streakDays: number;
  levelInfo: {
    level: number;
    title: string;
    progress: number;
  };
}

interface HypeWidgetProps {
  userId: string;
  compact?: boolean;
}

export default function HypeWidget({ userId, compact = false }: HypeWidgetProps) {
  const [user, setUser] = useState<HypeUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [animatingHype, setAnimatingHype] = useState(false);

  // Fetch user HYPE profile
  useEffect(() => {
    const fetchHypeProfile = async () => {
      try {
        const response = await fetch(`/api/hype?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Failed to fetch HYPE profile:', error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchHypeProfile();
    }
  }, [userId]);

  // Award HYPE for activities
  const awardHype = async (activity: string, multiplier = 1) => {
    setAnimatingHype(true);
    
    try {
      const response = await fetch('/api/hype', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          activity,
          multiplier
        })
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        
        // Show achievement notifications
        if (data.newAchievements?.length > 0) {
          // TODO: Show achievement popup
          console.log('🏆 New achievements:', data.newAchievements);
        }
      }
    } catch (error) {
      console.error('Failed to award HYPE:', error);
    } finally {
      setTimeout(() => setAnimatingHype(false), 1000);
    }
  };

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-white/20 h-10 w-10"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-white/20 rounded w-3/4"></div>
            <div className="h-3 bg-white/20 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
        <button
          onClick={() => awardHype('stadium_created')}
          className="w-full text-center text-white/70"
        >
          Start earning HYPE! Click to begin.
        </button>
      </div>
    );
  }

  if (compact) {
    return (
      <motion.div 
        className="bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 backdrop-blur-lg rounded-xl p-3 border border-[#F59E0B]/30"
        animate={animatingHype ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#F59E0B]" />
            <span className="text-white font-bold">{user.currentHype.toLocaleString()}</span>
            <span className="text-white/60 text-sm">HYPE</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-white/70">
            <Trophy className="w-3 h-3" />
            <span>{user.levelInfo.title}</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
      animate={animatingHype ? { scale: [1, 1.02, 1] } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          <Zap className="w-6 h-6 text-[#F59E0B]" />
          HYPE System
        </h3>
        {user.streakDays > 1 && (
          <div className="flex items-center gap-1 text-sm text-[#F59E0B]">
            <TrendingUp className="w-4 h-4" />
            <span>{user.streakDays} day streak!</span>
          </div>
        )}
      </div>

      {/* Current HYPE */}
      <div className="mb-4">
        <div className="text-center">
          <motion.div 
            className="text-3xl font-black text-[#F59E0B] mb-1"
            animate={animatingHype ? { scale: [1, 1.2, 1] } : {}}
          >
            {user.currentHype.toLocaleString()}
          </motion.div>
          <div className="text-white/70 text-sm">Current HYPE Points</div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-bold flex items-center gap-1">
            <Trophy className="w-4 h-4 text-[#F59E0B]" />
            {user.levelInfo.title}
          </span>
          <span className="text-white/70 text-sm">Level {user.levelInfo.level}</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <motion.div 
            className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${user.levelInfo.progress}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <div className="text-xs text-white/60 mt-1 text-center">
          {user.levelInfo.progress}% to next level
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => awardHype('daily_login')}
          className="bg-[#F59E0B]/20 hover:bg-[#F59E0B]/30 border border-[#F59E0B]/50 rounded-lg p-3 transition-all duration-200 text-white text-sm font-medium"
        >
          <Gift className="w-4 h-4 mx-auto mb-1" />
          Daily Bonus
        </button>
        <button
          onClick={() => awardHype('ai_chat_interaction')}
          className="bg-[#F97316]/20 hover:bg-[#F97316]/30 border border-[#F97316]/50 rounded-lg p-3 transition-all duration-200 text-white text-sm font-medium"
        >
          <Star className="w-4 h-4 mx-auto mb-1" />
          Chat with AI
        </button>
      </div>

      {/* Recent Achievements */}
      {user.achievements.length > 0 && (
        <div className="mt-4">
          <div className="text-white/70 text-sm mb-2">Recent Achievements:</div>
          <div className="space-y-1">
            {user.achievements.slice(-3).map((achievement, index) => (
              <div key={index} className="flex items-center gap-2 text-xs text-white/60">
                <span>{achievement.icon}</span>
                <span>{achievement.title}</span>
                <span className="text-[#F59E0B]">+{achievement.hypeReward}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}