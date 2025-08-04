'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Camera, Video, Download, Share2, Eye, Star,
  Crown, Trophy, Target, Users, BarChart3, Zap,
  FileText, Image, Film, Mic, Edit3, Upload,
  Palette, Layout, Type, Sparkles
} from 'lucide-react';

interface MediaAsset {
  id: string;
  name: string;
  type: 'image' | 'video' | 'graphic' | 'logo' | 'template';
  category: 'athletic' | 'academic' | 'lifestyle' | 'brand';
  size: string;
  format: string;
  downloads: number;
  quality: 'standard' | 'hd' | '4k' | 'professional';
}

interface BrandElement {
  id: string;
  name: string;
  type: 'color' | 'font' | 'logo' | 'pattern';
  value: string;
  usage: string;
}

const MOCK_ASSETS: MediaAsset[] = [
  { id: '1', name: 'Championship Celebration', type: 'image', category: 'athletic', size: '4.2 MB', format: 'PNG', downloads: 847, quality: '4k' },
  { id: '2', name: 'Training Highlight Reel', type: 'video', category: 'athletic', size: '156 MB', format: 'MP4', downloads: 234, quality: '4k' },
  { id: '3', name: 'Academic Achievement Banner', type: 'graphic', category: 'academic', size: '2.1 MB', format: 'SVG', downloads: 456, quality: 'professional' },
  { id: '4', name: 'Personal Brand Logo', type: 'logo', category: 'brand', size: '890 KB', format: 'PNG', downloads: 1200, quality: 'professional' },
  { id: '5', name: 'Social Media Template Pack', type: 'template', category: 'lifestyle', size: '12.4 MB', format: 'PSD', downloads: 678, quality: 'professional' }
];

const MOCK_BRAND_ELEMENTS: BrandElement[] = [
  { id: '1', name: 'Primary Gold', type: 'color', value: '#F59E0B', usage: 'Headlines, accents, CTA buttons' },
  { id: '2', name: 'Athletic Blue', type: 'color', value: '#3B82F6', usage: 'Athletic content, sports graphics' },
  { id: '3', name: 'Victory Red', type: 'color', value: '#EF4444', usage: 'Achievements, celebrations' },
  { id: '4', name: 'Montserrat Bold', type: 'font', value: 'Montserrat', usage: 'Headlines, titles, emphasis' },
  { id: '5', name: 'Inter Regular', type: 'font', value: 'Inter', usage: 'Body text, descriptions' }
];

export default function MediaKit() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'professional': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case '4k': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'hd': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const filteredAssets = activeCategory === 'all' 
    ? MOCK_ASSETS 
    : MOCK_ASSETS.filter(asset => asset.category === activeCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600/20 via-black/90 to-purple-600/20 border-b border-blue-500/30 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-blue-400">MEDIA KIT</h1>
              <p className="text-white/70">Professional Brand Assets & Content Library</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-sm rounded">147 ASSETS</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-sm rounded">4K READY</span>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-sm rounded">BRAND APPROVED</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              <Upload className="w-4 h-4 inline-block mr-2" />
              Upload Asset
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
              <Download className="w-4 h-4 inline-block mr-2" />
              Download All
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-white/10">
        <div className="flex gap-8 px-6">
          <button
            onClick={() => setActiveCategory('all')}
            className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
              activeCategory === 'all'
                ? 'border-blue-400 text-blue-400'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            All Assets
          </button>
          <button
            onClick={() => setActiveCategory('athletic')}
            className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
              activeCategory === 'athletic'
                ? 'border-blue-400 text-blue-400'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4" />
            Athletic
          </button>
          <button
            onClick={() => setActiveCategory('academic')}
            className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
              activeCategory === 'academic'
                ? 'border-blue-400 text-blue-400'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <Target className="w-4 h-4" />
            Academic
          </button>
          <button
            onClick={() => setActiveCategory('lifestyle')}
            className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
              activeCategory === 'lifestyle'
                ? 'border-blue-400 text-blue-400'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            Lifestyle
          </button>
          <button
            onClick={() => setActiveCategory('brand')}
            className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
              activeCategory === 'brand'
                ? 'border-blue-400 text-blue-400'
                : 'border-transparent text-white/70 hover:text-white'
            }`}
          >
            <Crown className="w-4 h-4" />
            Brand Elements
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Asset Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssets.map((asset) => (
                <div 
                  key={asset.id} 
                  className="bg-white/5 border border-white/10 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition-all"
                  onClick={() => setSelectedAsset(asset)}
                >
                  <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
                    {asset.type === 'image' && <Image className="w-12 h-12 text-white/50" />}
                    {asset.type === 'video' && <Video className="w-12 h-12 text-white/50" />}
                    {asset.type === 'graphic' && <Palette className="w-12 h-12 text-white/50" />}
                    {asset.type === 'logo' && <Crown className="w-12 h-12 text-white/50" />}
                    {asset.type === 'template' && <Layout className="w-12 h-12 text-white/50" />}
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">{asset.name}</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60">{asset.format} • {asset.size}</span>
                      <div className={`px-2 py-1 rounded border text-xs ${getQualityColor(asset.quality)}`}>
                        {asset.quality}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/60">{asset.downloads} downloads</span>
                      <div className="flex gap-1">
                        <button className="p-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                          <Eye className="w-3 h-3" />
                        </button>
                        <button className="p-1 bg-green-600 text-white rounded hover:bg-green-700">
                          <Download className="w-3 h-3" />
                        </button>
                        <button className="p-1 bg-purple-600 text-white rounded hover:bg-purple-700">
                          <Share2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Media Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/70">Total Assets</span>
                  <span className="text-white font-semibold">147</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Total Downloads</span>
                  <span className="text-white font-semibold">3,415</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Storage Used</span>
                  <span className="text-white font-semibold">2.4 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/70">Brand Score</span>
                  <span className="text-green-400 font-semibold">94%</span>
                </div>
              </div>
            </div>

            {/* Brand Colors */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Brand Colors</h3>
              <div className="space-y-3">
                {MOCK_BRAND_ELEMENTS.filter(el => el.type === 'color').map((color) => (
                  <div key={color.id} className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-white/20"
                      style={{ backgroundColor: color.value }}
                    ></div>
                    <div>
                      <div className="text-white font-medium">{color.name}</div>
                      <div className="text-xs text-white/60">{color.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Typography</h3>
              <div className="space-y-3">
                {MOCK_BRAND_ELEMENTS.filter(el => el.type === 'font').map((font) => (
                  <div key={font.id}>
                    <div className="text-white font-bold text-lg" style={{ fontFamily: font.value }}>
                      {font.name}
                    </div>
                    <div className="text-xs text-white/60">{font.usage}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="text-sm">
                  <div className="text-white">Championship photo downloaded</div>
                  <div className="text-white/60">2 hours ago</div>
                </div>
                <div className="text-sm">
                  <div className="text-white">New template uploaded</div>
                  <div className="text-white/60">5 hours ago</div>
                </div>
                <div className="text-sm">
                  <div className="text-white">Logo updated</div>
                  <div className="text-white/60">1 day ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Asset Preview Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{selectedAsset.name}</h3>
              <button 
                onClick={() => setSelectedAsset(null)}
                className="text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
              {selectedAsset.type === 'image' && <Image className="w-24 h-24 text-white/50" />}
              {selectedAsset.type === 'video' && <Video className="w-24 h-24 text-white/50" />}
              {selectedAsset.type === 'graphic' && <Palette className="w-24 h-24 text-white/50" />}
              {selectedAsset.type === 'logo' && <Crown className="w-24 h-24 text-white/50" />}
              {selectedAsset.type === 'template' && <Layout className="w-24 h-24 text-white/50" />}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-white/70 text-sm">Format</div>
                <div className="text-white font-semibold">{selectedAsset.format}</div>
              </div>
              <div>
                <div className="text-white/70 text-sm">Size</div>
                <div className="text-white font-semibold">{selectedAsset.size}</div>
              </div>
              <div>
                <div className="text-white/70 text-sm">Quality</div>
                <div className="text-white font-semibold">{selectedAsset.quality}</div>
              </div>
              <div>
                <div className="text-white/70 text-sm">Downloads</div>
                <div className="text-white font-semibold">{selectedAsset.downloads}</div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4 inline-block mr-2" />
                Download
              </button>
              <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                <Share2 className="w-4 h-4 inline-block mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}