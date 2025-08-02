'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Search, TrendingUp, Star, Trophy, Crown,
  Sparkles, Filter, ChevronRight, Clock,
  Flame, Target, Zap, School, Eye, Calendar
} from 'lucide-react';

interface TrendingItem {
  id: string;
  type: 'athlete' | 'school' | 'event' | 'achievement';
  title: string;
  subtitle: string;
  stats: {
    views: number;
    hype: number;
    trending: number;
  };
  image?: string;
  verified: boolean;
}

export default function DiscoverPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'athletes' | 'schools' | 'events'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock trending data
  const trendingItems: TrendingItem[] = [
    {
      id: '1',
      type: 'athlete',
      title: 'Marcus Johnson',
      subtitle: 'Central High School | Football QB',
      stats: { views: 15420, hype: 8900, trending: 95 },
      verified: true
    },
    {
      id: '2',
      type: 'school',
      title: 'Westside Academy',
      subtitle: 'State Champions 2024',
      stats: { views: 12300, hype: 7200, trending: 88 },
      verified: true
    },
    {
      id: '3',
      type: 'event',
      title: 'Regional Basketball Finals',
      subtitle: 'Live Tonight at 7:00 PM',
      stats: { views: 8900, hype: 5600, trending: 92 },
      verified: false
    },
    {
      id: '4',
      type: 'achievement',
      title: 'Sarah Chen Sets State Record',
      subtitle: '100m Sprint - 11.2 seconds',
      stats: { views: 22100, hype: 12400, trending: 98 },
      verified: true
    },
    {
      id: '5',
      type: 'athlete',
      title: 'Jordan Williams',
      subtitle: 'East High | Basketball Forward',
      stats: { views: 9800, hype: 6700, trending: 85 },
      verified: true
    },
    {
      id: '6',
      type: 'school',
      title: 'North Valley High',
      subtitle: '50 Years of Excellence',
      stats: { views: 7600, hype: 4300, trending: 78 },
      verified: true
    }
  ];

  const categories = [
    { id: 'all', label: 'All', icon: Sparkles },
    { id: 'athletes', label: 'Athletes', icon: Trophy },
    { id: 'schools', label: 'Schools', icon: School },
    { id: 'events', label: 'Events', icon: Calendar }
  ];

  const filteredItems = trendingItems.filter(item => {
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'athletes' && !['athlete', 'achievement'].includes(item.type)) {
        return false;
      }
      if (selectedCategory === 'schools' && item.type !== 'school') {
        return false;
      }
      if (selectedCategory === 'events' && item.type !== 'event') {
        return false;
      }
    }
    if (searchQuery) {
      return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             item.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#F59E0B]/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
                Discover
              </span>{' '}
              <span className="text-white">Greatness</span>
            </h1>
            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-8">
              Explore trending athletes, schools, and achievements across the UltraPreps universe
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search athletes, schools, events..."
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="sticky top-16 z-10 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as 'all' | 'athletes' | 'schools' | 'events')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white'
                      : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Trending Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-[#F59E0B]" />
            Trending Now
          </h2>
          <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Trending Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={item.type === 'athlete' ? `/stadium/${item.title.toLowerCase().replace(' ', '-')}` : '#'}>
                <div className="group relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-[#F59E0B]/50 transition-all">
                  {/* Trending Indicator */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center gap-1 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Flame className="w-4 h-4 text-[#F97316]" />
                      <span className="text-sm font-bold text-white">{item.stats.trending}%</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-white">{item.title}</h3>
                          {item.verified && (
                            <div className="w-5 h-5 bg-[#F59E0B] rounded-full flex items-center justify-center">
                              <Crown className="w-3 h-3 text-black" />
                            </div>
                          )}
                        </div>
                        <p className="text-white/60">{item.subtitle}</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-white/40" />
                        <span className="text-white/60">{(item.stats.views / 1000).toFixed(1)}K</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4 text-[#F59E0B]" />
                        <span className="text-white/60">{(item.stats.hype / 1000).toFixed(1)}K</span>
                      </div>
                    </div>

                    {/* Type Badge */}
                    <div className="mt-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                        item.type === 'athlete' ? 'bg-blue-500/20 text-blue-400' :
                        item.type === 'school' ? 'bg-green-500/20 text-green-400' :
                        item.type === 'event' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {item.type === 'athlete' && <Trophy className="w-3 h-3" />}
                        {item.type === 'school' && <School className="w-3 h-3" />}
                        {item.type === 'event' && <Clock className="w-3 h-3" />}
                        {item.type === 'achievement' && <Star className="w-3 h-3" />}
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#F59E0B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-white font-medium">
            Load More
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Featured Sections */}
      <div className="bg-white/5 border-t border-white/10 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-white mb-8">Explore by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/dashboard">
              <div className="group bg-gradient-to-br from-blue-600/20 to-blue-600/10 rounded-2xl p-8 border border-blue-500/20 hover:border-blue-500/40 transition-all">
                <Trophy className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Rising Athletes</h3>
                <p className="text-white/60">Discover the next generation of sports stars</p>
                <ChevronRight className="w-5 h-5 text-blue-400 mt-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link href="/community">
              <div className="group bg-gradient-to-br from-green-600/20 to-green-600/10 rounded-2xl p-8 border border-green-500/20 hover:border-green-500/40 transition-all">
                <School className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Top Schools</h3>
                <p className="text-white/60">Explore champion programs nationwide</p>
                <ChevronRight className="w-5 h-5 text-green-400 mt-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link href="/recruiting">
              <div className="group bg-gradient-to-br from-purple-600/20 to-purple-600/10 rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/40 transition-all">
                <Target className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Recruiting Hub</h3>
                <p className="text-white/60">Connect with college opportunities</p>
                <ChevronRight className="w-5 h-5 text-purple-400 mt-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}