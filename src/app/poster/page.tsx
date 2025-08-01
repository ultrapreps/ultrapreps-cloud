'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, TrendingUp, Clock, Award, Plus, ArrowRight, Zap, Share2, BarChart3 } from 'lucide-react';

export default function PosterHomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalPosters: 0,
    todayPosters: 0,
    totalShares: 0
  });
  const [recentPosters, setRecentPosters] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const statsRes = await fetch('/api/poster/analytics?timeframe=24h');
      const statsData = await statsRes.json();
      
      // Fetch recent posters
      const postersRes = await fetch('/api/poster/generate?action=list&limit=4');
      const postersData = await postersRes.json();
      
      setStats({
        totalPosters: statsData.overview?.totalPosters || 0,
        todayPosters: statsData.overview?.totalPosters || 0,
        totalShares: statsData.overview?.totalShares || 0
      });
      
      setRecentPosters(postersData.posters || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-900/20 via-transparent to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl">
                <Sparkles className="w-12 h-12 text-black" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              AI Poster Studio
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Create ESPN-quality sports posters in seconds with AI-powered design. 
              Every moment deserves a professional poster.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                href="/poster/create"
                className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2 group"
              >
                <Plus className="w-5 h-5" />
                Create Poster
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/poster/gallery"
                className="px-8 py-4 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-all"
              >
                View Gallery
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto">
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-500">{stats.totalPosters}</p>
              <p className="text-sm text-gray-400 mt-1">Total Posters</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-500">{stats.totalShares}</p>
              <p className="text-sm text-gray-400 mt-1">Total Shares</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-500">~12s</p>
              <p className="text-sm text-gray-400 mt-1">Avg Generation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-all">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Design</h3>
              <p className="text-gray-400">
                DALL-E 3 generates stunning posters with automatic school branding and color matching.
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-all">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Validation</h3>
              <p className="text-gray-400">
                VisionQA ensures every poster meets professional standards with 85%+ quality scores.
              </p>
            </div>
            
            <div className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-all">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Share2 className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2">Social Sharing</h3>
              <p className="text-gray-400">
                One-click sharing to Twitter, Facebook, and Instagram with optimized formats.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Posters */}
      {recentPosters.length > 0 && (
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Recent Creations</h2>
              <Link
                href="/poster/gallery"
                className="text-gray-400 hover:text-white transition-all flex items-center gap-2"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recentPosters.map((poster) => (
                <div key={poster.id} className="group cursor-pointer" onClick={() => router.push('/poster/gallery')}>
                  <div className="aspect-square relative rounded-lg overflow-hidden">
                    <Image
                      src={poster.imageUrl}
                      alt={poster.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="font-bold text-white">{poster.title}</p>
                        <p className="text-sm text-gray-300 mt-1">
                          {poster.type.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Templates Preview */}
      <div className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Professional Templates</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['Game Day', 'Achievement', 'Recruiting', 'Season', 'Custom'].map((template) => (
              <div key={template} className="bg-gray-900 rounded-lg p-6 text-center hover:bg-gray-800 transition-all">
                <div className="w-16 h-16 bg-gray-800 rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-gray-600" />
                </div>
                <p className="font-medium">{template}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create?</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands of teams creating professional posters with AI
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/poster/create"
              className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Start Creating
            </Link>
            <Link
              href="/poster/analytics"
              className="px-8 py-4 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-all flex items-center gap-2"
            >
              <BarChart3 className="w-5 h-5" />
              View Analytics
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold">UltraPreps Poster Studio</p>
              <p className="text-sm text-gray-400 mt-1">AI-powered design for every moment</p>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/poster/create" className="text-gray-400 hover:text-white transition-all">
                Create
              </Link>
              <Link href="/poster/gallery" className="text-gray-400 hover:text-white transition-all">
                Gallery
              </Link>
              <Link href="/poster/analytics" className="text-gray-400 hover:text-white transition-all">
                Analytics
              </Link>
              <Link href="/test-poster" className="text-gray-400 hover:text-white transition-all">
                Test Mode
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}