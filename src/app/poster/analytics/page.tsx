'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, BarChart3, TrendingUp, Share2, Download, Calendar, Users, Award, Clock } from 'lucide-react';

interface Analytics {
  timeframe: string;
  overview: {
    totalPosters: number;
    totalShares: number;
    avgSharesPerPoster: string;
  };
  postersByType: Record<string, number>;
  topPosters: Array<{
    id: string;
    type: string;
    title: string;
    createdBy: {
      id: string;
      username: string;
      firstName: string;
      lastName: string;
      image?: string;
    };
    shares: number;
    imageUrl: string;
    createdAt: string;
  }>;
  engagementTimeline: any[];
  topUsers: Array<{
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    image?: string;
    _count: {
      posters: number;
    };
  }>;
}

export default function PosterAnalyticsPage() {
  const router = useRouter();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState('30d');

  useEffect(() => {
    fetchAnalytics();
  }, [timeframe]);

  const fetchAnalytics = async () => {
    try {
      const res = await fetch(`/api/poster/analytics?timeframe=${timeframe}`);
      const data = await res.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const posterTypeColors: Record<string, string> = {
    game_day: 'bg-blue-600',
    achievement: 'bg-green-600',
    recruiting: 'bg-purple-600',
    season: 'bg-orange-600',
    custom: 'bg-gray-600'
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-800 rounded-lg transition-all"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-3">
                  <BarChart3 className="w-7 h-7 text-white" />
                  Poster Analytics
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  Track performance and engagement metrics
                </p>
              </div>
            </div>
            
            {/* Timeframe Selector */}
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-gray-400 mt-4">Loading analytics...</p>
          </div>
        ) : analytics ? (
          <div className="space-y-8">
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-400">Total Posters</h3>
                  <BarChart3 className="w-5 h-5 text-gray-600" />
                </div>
                <p className="text-3xl font-bold">{analytics.overview.totalPosters}</p>
                <p className="text-xs text-gray-500 mt-2">Created in selected period</p>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-400">Total Shares</h3>
                  <Share2 className="w-5 h-5 text-gray-600" />
                </div>
                <p className="text-3xl font-bold">{analytics.overview.totalShares}</p>
                <p className="text-xs text-gray-500 mt-2">Across all platforms</p>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-400">Avg Shares/Poster</h3>
                  <TrendingUp className="w-5 h-5 text-gray-600" />
                </div>
                <p className="text-3xl font-bold">{analytics.overview.avgSharesPerPoster}</p>
                <p className="text-xs text-gray-500 mt-2">Engagement rate</p>
              </div>
            </div>

            {/* Posters by Type */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-500" />
                Posters by Type
              </h3>
              <div className="space-y-4">
                {Object.entries(analytics.postersByType).map(([type, count]) => {
                  const percentage = analytics.overview.totalPosters > 0 
                    ? (count / analytics.overview.totalPosters * 100).toFixed(1)
                    : '0';
                  return (
                    <div key={type}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium capitalize">{type.replace('_', ' ')}</span>
                        <span className="text-sm text-gray-400">{count} ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${posterTypeColors[type] || 'bg-white'}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Top Performing Posters */}
            {analytics.topPosters.length > 0 && (
              <div className="bg-gray-900 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Top Performing Posters
                </h3>
                <div className="space-y-4">
                  {analytics.topPosters.map((poster, index) => (
                    <div key={poster.id} className="flex items-center gap-4 p-3 hover:bg-gray-800 rounded-lg transition-all">
                      <div className="text-lg font-bold text-gray-500 w-6">
                        {index + 1}
                      </div>
                      <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={poster.imageUrl}
                          alt={poster.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{poster.title}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                          <span className="capitalize">{poster.type.replace('_', ' ')}</span>
                          <span>•</span>
                          <span>{poster.createdBy.firstName} {poster.createdBy.lastName}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{poster.shares}</p>
                        <p className="text-xs text-gray-400">shares</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Top Creators */}
            {analytics.topUsers && analytics.topUsers.length > 0 && (
              <div className="bg-gray-900 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  Top Creators
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analytics.topUsers.map((user) => (
                    <div key={user.id} className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={`${user.firstName} ${user.lastName}`}
                          width={48}
                          height={48}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-gray-400">{user._count.posters} posters</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Failed to load analytics</p>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div className="bg-gray-900 border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-400">
              <Clock className="w-4 h-4 inline mr-1" />
              Analytics updated in real-time
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/poster/gallery"
                className="text-white hover:underline text-sm"
              >
                View Gallery
              </Link>
              <Link
                href="/poster/create"
                className="px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all text-sm"
              >
                Create Poster
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}