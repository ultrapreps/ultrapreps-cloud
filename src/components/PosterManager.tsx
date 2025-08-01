'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface PosterTemplate {
  type: string;
  name: string;
  description: string;
  aspectRatio: string;
  elements: string[];
  style: string;
}

interface Poster {
  id: string;
  type: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    image?: string;
  };
  shares: number;
  createdAt: string;
}

interface PosterManagerProps {
  onPosterCreated?: (poster: any) => void;
}

export default function PosterManager({ onPosterCreated }: PosterManagerProps) {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState<'create' | 'gallery' | 'analytics'>('create');
  const [templates, setTemplates] = useState<PosterTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [posters, setPosters] = useState<Poster[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  
  // Form fields
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [mainText, setMainText] = useState('');
  const [date, setDate] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  
  // Fetch templates
  useEffect(() => {
    fetchTemplates();
  }, []);
  
  // Fetch posters when gallery tab is active
  useEffect(() => {
    if (activeTab === 'gallery') {
      fetchPosters();
    } else if (activeTab === 'analytics') {
      fetchAnalytics();
    }
  }, [activeTab]);
  
  const fetchTemplates = async () => {
    try {
      const res = await fetch('/api/poster/generate');
      const data = await res.json();
      setTemplates(data.templates || []);
      if (data.templates?.length > 0) {
        setSelectedTemplate(data.templates[0].type);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
    }
  };
  
  const fetchPosters = async () => {
    try {
      const params = new URLSearchParams({
        action: 'list',
        limit: '20'
      });
      
      const res = await fetch(`/api/poster/generate?${params}`);
      const data = await res.json();
      setPosters(data.posters || []);
    } catch (error) {
      console.error('Error fetching posters:', error);
    }
  };
  
  const fetchAnalytics = async () => {
    try {
      const params = new URLSearchParams({
        timeframe: '30d'
      });
      
      const res = await fetch(`/api/poster/analytics?${params}`);
      const data = await res.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };
  
  const handleGeneratePoster = async () => {
    if (!selectedTemplate || !title) {
      alert('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    try {
      // For demo, we'll use a mock school ID
      const mockSchoolId = 'school_demo';
      
      const res = await fetch('/api/poster/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: selectedTemplate,
          schoolId: mockSchoolId,
          title,
          subtitle,
          mainText,
          date: date || undefined,
          customPrompt
        })
      });
      
      const data = await res.json();
      if (data.success) {
        alert('Poster generated successfully!');
        if (onPosterCreated) onPosterCreated(data.poster);
        
        // Reset form
        setTitle('');
        setSubtitle('');
        setMainText('');
        setDate('');
        setCustomPrompt('');
        
        // Switch to gallery to see new poster
        setActiveTab('gallery');
        fetchPosters();
      } else {
        alert(data.error || 'Failed to generate poster');
      }
    } catch (error) {
      console.error('Error generating poster:', error);
      alert('Failed to generate poster');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSharePoster = async (posterId: string, platform: string) => {
    try {
      const res = await fetch('/api/poster/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          posterId,
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
        } else if (data.shareData.instructions) {
          alert(data.shareData.instructions.join('\n'));
        }
      }
    } catch (error) {
      console.error('Error sharing poster:', error);
    }
  };
  
  const handleDeletePoster = async (posterId: string) => {
    if (!confirm('Are you sure you want to delete this poster?')) return;
    
    try {
      const res = await fetch(`/api/poster/generate?id=${posterId}`, {
        method: 'DELETE'
      });
      
      const data = await res.json();
      if (data.success) {
        fetchPosters();
      } else {
        alert(data.error || 'Failed to delete poster');
      }
    } catch (error) {
      console.error('Error deleting poster:', error);
    }
  };
  
  const selectedTemplateData = templates.find(t => t.type === selectedTemplate);
  
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-black rounded-xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-black to-gray-900 p-6 border-b border-gray-800">
          <h2 className="text-3xl font-bold text-white">Poster Manager</h2>
          <p className="text-gray-400 mt-2">Create, manage, and share professional sports posters</p>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-800">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-all ${
              activeTab === 'create'
                ? 'text-white bg-gray-900 border-b-2 border-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
            }`}
          >
            Create Poster
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-all ${
              activeTab === 'gallery'
                ? 'text-white bg-gray-900 border-b-2 border-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
            }`}
          >
            Gallery
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-all ${
              activeTab === 'analytics'
                ? 'text-white bg-gray-900 border-b-2 border-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
            }`}
          >
            Analytics
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Create Tab */}
          {activeTab === 'create' && (
            <div className="space-y-6">
              {/* Template Selection */}
              <div>
                <label className="block text-sm font-medium text-white mb-3">
                  Select Template
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <button
                      key={template.type}
                      onClick={() => setSelectedTemplate(template.type)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedTemplate === template.type
                          ? 'border-white bg-gray-900'
                          : 'border-gray-700 hover:border-gray-500'
                      }`}
                    >
                      <h3 className="font-bold text-white">{template.name}</h3>
                      <p className="text-xs text-gray-400 mt-1">{template.description}</p>
                      <p className="text-xs text-gray-500 mt-2">Ratio: {template.aspectRatio}</p>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Selected Template Details */}
                            {selectedTemplateData && (
                <div className="bg-gray-900 rounded-lg p-4">
                  <h4 className="font-bold text-white mb-2">{selectedTemplateData.name}</h4>
                  <p className="text-sm text-gray-400 mb-3">{selectedTemplateData.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplateData.elements.map((element) => (
                      <span key={element} className="px-2 py-1 bg-gray-800 rounded text-xs text-gray-300">
                        {element}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white"
                    placeholder="Enter poster title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white"
                    placeholder="Optional subtitle"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white mb-2">
                    Main Text
                  </label>
                  <textarea
                    value={mainText}
                    onChange={(e) => setMainText(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white"
                    placeholder="Additional text content"
                  />
                </div>
                
                {selectedTemplate === 'GAME_DAY' && (
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Game Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white"
                    />
                  </div>
                )}
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-white mb-2">
                    Custom Instructions
                  </label>
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    rows={2}
                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white"
                    placeholder="Any specific design requirements?"
                  />
                </div>
              </div>
              
              {/* Generate Button */}
              <button
                onClick={handleGeneratePoster}
                disabled={loading || !selectedTemplate || !title}
                className="w-full md:w-auto px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Generating...' : 'Generate Poster'}
              </button>
            </div>
          )}
          
          {/* Gallery Tab */}
          {activeTab === 'gallery' && (
            <div>
              {posters.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">No posters created yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posters.map((poster) => (
                    <div key={poster.id} className="bg-gray-900 rounded-lg overflow-hidden group">
                      <div className="aspect-square relative">
                        <Image
                          src={poster.imageUrl}
                          alt={`${poster.type} poster`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSharePoster(poster.id, 'twitter')}
                              className="p-2 bg-white rounded-full hover:bg-gray-200 transition-all"
                              title="Share on Twitter"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                              </svg>
                            </button>
                            <button
                              onClick={() => handleSharePoster(poster.id, 'download')}
                              className="p-2 bg-white rounded-full hover:bg-gray-200 transition-all"
                              title="Download"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                            </button>
                            {session?.user?.id === poster.user.id && (
                              <button
                                onClick={() => handleDeletePoster(poster.id)}
                                className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all"
                                title="Delete"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-gray-400 uppercase">{poster.type.replace('_', ' ')}</span>
                          {poster.shares > 0 && (
                            <span className="text-xs text-gray-500">{poster.shares} shares</span>
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
                              width={20}
                              height={20}
                              className="rounded-full"
                            />
                          )}
                          <span className="text-xs text-gray-400">{poster.user.firstName} {poster.user.lastName}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(poster.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* Analytics Tab */}
          {activeTab === 'analytics' && analytics && (
            <div className="space-y-6">
              {/* Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Total Posters</h3>
                  <p className="text-3xl font-bold text-white">{analytics.overview.totalPosters}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Total Shares</h3>
                  <p className="text-3xl font-bold text-white">{analytics.overview.totalShares}</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Avg Shares/Poster</h3>
                  <p className="text-3xl font-bold text-white">{analytics.overview.avgSharesPerPoster}</p>
                </div>
              </div>
              
              {/* Posters by Type */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4">Posters by Type</h3>
                <div className="space-y-3">
                  {Object.entries(analytics.postersByType).map(([type, count]: [string, any]) => (
                    <div key={type} className="flex items-center justify-between">
                      <span className="text-gray-300 capitalize">{type.replace('_', ' ')}</span>
                      <span className="text-white font-medium">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Top Performing Posters */}
              {analytics.topPosters.length > 0 && (
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Top Performing Posters</h3>
                  <div className="space-y-3">
                    {analytics.topPosters.slice(0, 5).map((poster: any) => (
                      <div key={poster.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-800 rounded overflow-hidden">
                            <Image
                              src={poster.imageUrl}
                              alt={poster.type}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-white font-medium">{poster.title}</p>
                            <p className="text-xs text-gray-400">{poster.type.replace('_', ' ')}</p>
                          </div>
                        </div>
                        <span className="text-white font-medium">{poster.shares} shares</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}