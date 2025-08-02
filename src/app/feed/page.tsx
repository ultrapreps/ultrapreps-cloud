'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Heart, MessageCircle, Share2, Zap, Trophy, Star, 
  Crown, User, ArrowLeft, Filter, Sparkles,
  TrendingUp, Clock, Target
} from 'lucide-react';
import GageAIChat from '../../components/GageAIChat';
import HypeWidget from '../../components/HypeWidget';


interface ActivityItem {
  id: string;
  type: 'hype_earned' | 'poster_created' | 'herocard_generated' | 'achievement_unlocked' | 'level_up' | 'stadium_created' | 'ai_chat';
  user: {
    username: string;
    displayName: string;
    school: string;
    avatar?: string;
    level: number;
  };
  content: {
    title: string;
    description: string;
    image?: string;
    hypeAmount?: number;
    achievement?: string;
    newLevel?: number;
  };
  timestamp: Date;
  likes: number;
  comments: number;
  isLiked: boolean;
}

interface FilterOption {
  id: string;
  label: string;
  icon: React.ComponentType<{className?: string}>;
  color: string;
}

const ACTIVITY_FILTERS: FilterOption[] = [
  { id: 'all', label: 'All Activity', icon: TrendingUp, color: '#F59E0B' },
  { id: 'hype_earned', label: 'HYPE Events', icon: Zap, color: '#F59E0B' },
  { id: 'poster_created', label: 'New Posters', icon: Star, color: '#8B5CF6' },
  { id: 'herocard_generated', label: 'HeroCards', icon: Crown, color: '#F97316' },
  { id: 'achievement_unlocked', label: 'Achievements', icon: Trophy, color: '#10B981' },
  { id: 'level_up', label: 'Level Ups', icon: Target, color: '#EF4444' }
];

// Mock activity data - in production, fetch from API
const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    type: 'herocard_generated',
    user: {
      username: 'marcus_johnson',
      displayName: 'Marcus Johnson',
      school: 'Oak Valley High',
      level: 8
    },
    content: {
      title: 'New HeroCard Created!',
      description: 'Just generated my official UltraPreps HeroCard!',
      image: '/herocard-1.png'
    },
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 min ago
    likes: 12,
    comments: 3,
    isLiked: false
  },
  {
    id: '2',
    type: 'hype_earned',
    user: {
      username: 'sarah_chen',
      displayName: 'Sarah Chen',
      school: 'Lincoln Prep Academy',
      level: 12
    },
    content: {
      title: 'HYPE Milestone Reached!',
      description: 'Earned 50 HYPE points for completing my profile!',
      hypeAmount: 50
    },
    timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 min ago
    likes: 8,
    comments: 1,
    isLiked: true
  },
  {
    id: '3',
    type: 'poster_created',
    user: {
      username: 'alex_rivera',
      displayName: 'Alex Rivera',
      school: 'Central High School',
      level: 6
    },
    content: {
      title: 'Achievement Poster Created',
      description: 'Check out my latest achievement poster!',
      image: '/herocard-2.png'
    },
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
    likes: 15,
    comments: 5,
    isLiked: false
  },
  {
    id: '4',
    type: 'level_up',
    user: {
      username: 'jamie_williams',
      displayName: 'Jamie Williams',
      school: 'Riverside Academy',
      level: 10
    },
    content: {
      title: 'Level Up Achievement!',
      description: 'Just reached Level 10! The grind never stops!',
      newLevel: 10
    },
    timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 min ago
    likes: 23,
    comments: 7,
    isLiked: true
  },
  {
    id: '5',
    type: 'achievement_unlocked',
    user: {
      username: 'taylor_brown',
      displayName: 'Taylor Brown',
      school: 'Mountain View High',
      level: 7
    },
    content: {
      title: 'New Achievement Unlocked!',
      description: 'Earned the "Social Butterfly" achievement for connecting with 25 students!',
      achievement: 'Social Butterfly'
    },
    timestamp: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    likes: 18,
    comments: 4,
    isLiked: false
  }
];

export default function ActivityFeedPage() {
  const [activities, setActivities] = useState<ActivityItem[]>(MOCK_ACTIVITIES);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter activities based on selected filter
  const filteredActivities = activities.filter(activity => 
    activeFilter === 'all' || activity.type === activeFilter
  );

  const handleLike = async (activityId: string) => {
    setActivities(prev => prev.map(activity => 
      activity.id === activityId 
        ? {
            ...activity,
            likes: activity.isLiked ? activity.likes - 1 : activity.likes + 1,
            isLiked: !activity.isLiked
          }
        : activity
    ));
  };

  const handleComment = (activityId: string) => {
    // In production, open comment modal or navigate to detailed view
    console.log('Comment on activity:', activityId);
  };

  const handleShare = (activityId: string) => {
    // In production, implement sharing functionality
    console.log('Share activity:', activityId);
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return timestamp.toLocaleDateString();
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'hype_earned': return <Zap className="w-5 h-5 text-[#F59E0B]" />;
      case 'poster_created': return <Star className="w-5 h-5 text-purple-400" />;
      case 'herocard_generated': return <Crown className="w-5 h-5 text-[#F97316]" />;
      case 'achievement_unlocked': return <Trophy className="w-5 h-5 text-green-400" />;
      case 'level_up': return <Target className="w-5 h-5 text-red-400" />;
      default: return <Sparkles className="w-5 h-5 text-blue-400" />;
    }
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // In production, this would be replaced by WebSocket or Server-Sent Events
      const randomActivity = MOCK_ACTIVITIES[Math.floor(Math.random() * MOCK_ACTIVITIES.length)];
      const newActivity = {
        ...randomActivity,
        id: Date.now().toString(),
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        isLiked: false
      };
      
      // Randomly add new activity (10% chance every 30 seconds)
      if (Math.random() < 0.1) {
        setActivities(prev => [newActivity, ...prev.slice(0, 19)]); // Keep latest 20
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black">
      {/* Stadium Background */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/stadium-crowd-energy.jpg')`,
          backgroundAttachment: 'scroll',
          backgroundPosition: 'center top',
          backgroundSize: '120% auto',
          filter: 'grayscale(100%) contrast(1.2) brightness(0.3) blur(3px)',
          WebkitFilter: 'grayscale(100%) contrast(1.2) brightness(0.3) blur(3px)'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
      <div className="absolute inset-0 bg-black/40" />

      {/* Navigation */}


      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-[#F59E0B] hover:text-[#F97316] transition-colors">
                  <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="text-white/60">|</div>
                <h1 className="text-white font-bold text-xl">Live Activity Feed</h1>
              </div>
              
              <div className="flex items-center gap-4">
                <HypeWidget userId="current_user" compact />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-white mb-4">
              <span className="text-[#F59E0B]">ULTRA</span> Activity Feed
            </h2>
            <p className="text-white/70 text-lg">
              See what&apos;s happening across the UltraPreps community in real-time!
            </p>
          </div>

          {/* Filter Bar */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-white/60" />
              <span className="text-white font-medium">Filter Activities</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {ACTIVITY_FILTERS.map((filter) => {
                const IconComponent = filter.icon;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                      activeFilter === filter.id
                        ? 'bg-[#F59E0B] text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="text-sm font-medium">{filter.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="space-y-6">
            <AnimatePresence>
              {filteredActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-200"
                >
                  {/* Activity Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      {activity.user.avatar ? (
                        <img 
                          src={activity.user.avatar} 
                          alt={activity.user.displayName}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6 text-white/60" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-bold">{activity.user.displayName}</h3>
                        <div className="flex items-center gap-1 px-2 py-1 bg-[#F59E0B]/20 rounded-full">
                          <Crown className="w-3 h-3 text-[#F59E0B]" />
                          <span className="text-[#F59E0B] text-xs font-bold">L{activity.user.level}</span>
                        </div>
                      </div>
                      <p className="text-white/60 text-sm">{activity.user.school}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getActivityIcon(activity.type)}
                      <span className="text-white/60 text-sm">{formatTimeAgo(activity.timestamp)}</span>
                    </div>
                  </div>

                  {/* Activity Content */}
                  <div className="mb-4">
                    <h4 className="text-white font-bold text-lg mb-2">{activity.content.title}</h4>
                    <p className="text-white/80 mb-3">{activity.content.description}</p>
                    
                    {/* Special Content Based on Type */}
                    {activity.content.hypeAmount && (
                      <div className="flex items-center gap-2 p-3 bg-[#F59E0B]/20 rounded-xl border border-[#F59E0B]/30 mb-3">
                        <Zap className="w-5 h-5 text-[#F59E0B]" />
                        <span className="text-[#F59E0B] font-bold text-lg">+{activity.content.hypeAmount} HYPE</span>
                      </div>
                    )}
                    
                    {activity.content.newLevel && (
                      <div className="flex items-center gap-2 p-3 bg-red-500/20 rounded-xl border border-red-500/30 mb-3">
                        <Target className="w-5 h-5 text-red-400" />
                        <span className="text-red-400 font-bold text-lg">Level {activity.content.newLevel} Reached!</span>
                      </div>
                    )}
                    
                    {activity.content.achievement && (
                      <div className="flex items-center gap-2 p-3 bg-green-500/20 rounded-xl border border-green-500/30 mb-3">
                        <Trophy className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-bold text-lg">&quot;{activity.content.achievement}&quot;</span>
                      </div>
                    )}
                    
                    {activity.content.image && (
                      <div className="rounded-xl overflow-hidden border border-white/20">
                        <img 
                          src={activity.content.image} 
                          alt="Activity content"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Activity Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => handleLike(activity.id)}
                        className={`flex items-center gap-2 transition-colors ${
                          activity.isLiked 
                            ? 'text-red-400' 
                            : 'text-white/60 hover:text-red-400'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${activity.isLiked ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium">{activity.likes}</span>
                      </button>
                      
                      <button
                        onClick={() => handleComment(activity.id)}
                        className="flex items-center gap-2 text-white/60 hover:text-blue-400 transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm font-medium">{activity.comments}</span>
                      </button>
                      
                      <button
                        onClick={() => handleShare(activity.id)}
                        className="flex items-center gap-2 text-white/60 hover:text-green-400 transition-colors"
                      >
                        <Share2 className="w-5 h-5" />
                        <span className="text-sm font-medium">Share</span>
                      </button>
                    </div>
                    
                    <div className="text-white/40 text-xs">
                      <Clock className="w-4 h-4 inline-block mr-1" />
                      {activity.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button
              onClick={() => setIsLoading(!isLoading)}
              disabled={isLoading}
              className="px-8 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Loading...</span>
                </div>
              ) : (
                'Load More Activities'
              )}
            </button>
          </div>
        </main>
      </div>

      {/* Gage AI Chat */}
      <GageAIChat
        userId="current_user"
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
}