'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Download, Share2, Trash2, Plus, Grid, BarChart, Search, Filter } from 'lucide-react';

interface Poster {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  shares: number;
  createdAt: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    image?: string;
  };
}

export default function PosterGalleryPage() {
  const router = useRouter();
  const sessionResult = useSession();
  
  if (sessionResult.status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;
  }
  const [posters, setPosters] = useState<Poster[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchPosters();
  }, [filter]);

  const fetchPosters = async () => {
    try {
      const params = new URLSearchParams({
        action: 'list',
        limit: '50'
      });
      
      if (filter !== 'all') {
        params.append('type', filter);
      }
      
      const res = await fetch(`/api/poster/generate?${params}`);
      const data = await res.json();
      setPosters(data.posters || []);
    } catch (error) {
      console.error('Error fetching posters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async (poster: Poster, platform: string) => {
    try {
      const res = await fetch('/api/poster/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          posterId: poster.id,
          platform
        })
      });
      
      const data = await res.json();
      if (data.success) {
        if (data.shareData.shareUrl) {
          window.open(data.shareData.shareUrl, '_blank');
        } else if (data.shareData.downloadUrl) {
          const a = document.createElement('a');
          a.href = data.shareData.downloadUrl;
          a.download = data.shareData.filename;
          a.click();
        }
        
        // Refresh to update share count
        fetchPosters();
      }
    } catch (error) {
      console.error('Error sharing poster:', error);
    }
  };

  const handleDelete = async (posterId: string) => {
    if (!confirm('Are you sure you want to delete this poster?')) return;
    
    try {
      const res = await fetch(`/api/poster/generate?id=${posterId}`, {
        method: 'DELETE'
      });
      
      if (res.ok) {
        setPosters(posters.filter(p => p.id !== posterId));
      }
    } catch (error) {
      console.error('Error deleting poster:', error);
    }
  };

  const filteredPosters = posters.filter(poster => 
    searchQuery === '' || 
    poster.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    poster.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                  <Grid className="w-7 h-7 text-white" />
                  Poster Gallery
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  View and manage your poster collection
                </p>
              </div>
            </div>
            <Link
              href="/poster/create"
              className="px-4 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create New
            </Link>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 flex-1">
              {/* Search */}
              <div className="relative max-w-md flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white"
                />
              </div>
              
              {/* Type Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white"
                >
                  <option value="all">All Types</option>
                  <option value="GAME_DAY">Game Day</option>
                  <option value="ACHIEVEMENT">Achievement</option>
                  <option value="RECRUITING">Recruiting</option>
                  <option value="SEASON">Season</option>
                  <option value="CUSTOM">Custom</option>
                </select>
              </div>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded ${view === 'grid' ? 'bg-gray-700' : 'hover:bg-gray-700'} transition-all`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded ${view === 'list' ? 'bg-gray-700' : 'hover:bg-gray-700'} transition-all`}
              >
                <BarChart className="w-4 h-4 rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-gray-400 mt-4">Loading posters...</p>
          </div>
        ) : filteredPosters.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 mb-4">No posters found</p>
            <Link
              href="/poster/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all"
            >
              <Plus className="w-4 h-4" />
              Create Your First Poster
            </Link>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPosters.map((poster) => (
              <div key={poster.id} className="bg-gray-900 rounded-lg overflow-hidden group hover:shadow-2xl transition-all">
                <div className="aspect-square relative">
                  <Image
                    src={poster.imageUrl}
                    alt={poster.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleShare(poster, 'twitter')}
                          className="flex-1 px-3 py-2 bg-white/20 backdrop-blur rounded hover:bg-white/30 transition-all"
                          title="Share on Twitter"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleShare(poster, 'download')}
                          className="flex-1 px-3 py-2 bg-white/20 backdrop-blur rounded hover:bg-white/30 transition-all"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        {session?.user?.id === poster.user.id && (
                          <button
                            onClick={() => handleDelete(poster.id)}
                            className="px-3 py-2 bg-red-600/80 backdrop-blur rounded hover:bg-red-700 transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-400 uppercase">
                      {poster.type.replace('_', ' ')}
                    </span>
                    {poster.shares > 0 && (
                      <span className="text-xs text-gray-500">{poster.shares} shares</span>
                    )}
                  </div>
                  <h3 className="font-bold text-white">{poster.title}</h3>
                  {poster.subtitle && (
                    <p className="text-sm text-gray-400 mt-1">{poster.subtitle}</p>
                  )}
                  <div className="flex items-center gap-2 mt-3">
                    {poster.user.image && (
                      <Image
                        src={poster.user.image}
                        alt={`${poster.user.firstName} ${poster.user.lastName}`}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                    )}
                    <span className="text-xs text-gray-400">
                      {poster.user.firstName} {poster.user.lastName}
                    </span>
                    <span className="text-xs text-gray-500">
                      • {new Date(poster.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosters.map((poster) => (
              <div key={poster.id} className="bg-gray-900 rounded-lg p-4 flex items-center gap-4 hover:bg-gray-800 transition-all">
                <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={poster.imageUrl}
                    alt={poster.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-gray-400 uppercase">
                      {poster.type.replace('_', ' ')}
                    </span>
                    {poster.shares > 0 && (
                      <span className="text-xs text-gray-500">• {poster.shares} shares</span>
                    )}
                  </div>
                  <h3 className="font-bold text-white">{poster.title}</h3>
                  {poster.subtitle && (
                    <p className="text-sm text-gray-400">{poster.subtitle}</p>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    {poster.user.image && (
                      <Image
                        src={poster.user.image}
                        alt={`${poster.user.firstName} ${poster.user.lastName}`}
                        width={16}
                        height={16}
                        className="rounded-full"
                      />
                    )}
                    <span className="text-xs text-gray-400">
                      {poster.user.firstName} {poster.user.lastName}
                    </span>
                    <span className="text-xs text-gray-500">
                      • {new Date(poster.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleShare(poster, 'twitter')}
                    className="p-2 hover:bg-gray-700 rounded transition-all"
                    title="Share on Twitter"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShare(poster, 'download')}
                    className="p-2 hover:bg-gray-700 rounded transition-all"
                    title="Download"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  {session?.user?.id === poster.user.id && (
                    <button
                      onClick={() => handleDelete(poster.id)}
                      className="p-2 hover:bg-red-700 rounded transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="bg-gray-900 border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between text-sm">
            <p className="text-gray-400">
              Showing {filteredPosters.length} of {posters.length} posters
            </p>
            <Link
              href="/poster/analytics"
              className="text-white hover:underline flex items-center gap-2"
            >
              <BarChart className="w-4 h-4" />
              View Analytics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}