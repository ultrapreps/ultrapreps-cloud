'use client';

import { useState } from 'react';
import PosterManager from '@/components/PosterManager';
import { Image as ImageIcon, Sparkles, Zap, Trophy, Calendar, Users } from 'lucide-react';

export default function TestPosterPage() {
  const [notification, setNotification] = useState<string | null>(null);

  const handlePosterCreated = (poster: any) => {
    setNotification(`Poster created successfully! Type: ${poster.type}`);
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <ImageIcon className="w-8 h-8 text-white" />
                AI Poster Studio
              </h1>
              <p className="text-gray-400 mt-1">
                Create professional posters with AI-powered design
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Powered by</p>
                <p className="font-bold">DALL-E 3 + VisionQA</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="grid grid-cols-5 gap-8 text-center">
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 text-yellow-500" />
              <div>
                <p className="text-xs text-gray-400">Generation Speed</p>
                <p className="font-bold">~12s</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-xs text-gray-400">Quality Score</p>
                <p className="font-bold">85%+</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-xs text-gray-400">Templates</p>
                <p className="font-bold">5 Types</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-xs text-gray-400">Sharing</p>
                <p className="font-bold">3 Platforms</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-xs text-gray-400">AI Model</p>
                <p className="font-bold">DALL-E 3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse">
          {notification}
        </div>
      )}

      {/* Main Content */}
      <div className="py-8">
        <PosterManager onPosterCreated={handlePosterCreated} />
      </div>

      {/* Footer */}
      <div className="bg-gray-900 border-t border-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="grid grid-cols-3 gap-8 text-sm">
            <div>
              <h3 className="font-bold mb-3">AI Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• DALL-E 3 HD Generation</li>
                <li>• VisionQA Validation</li>
                <li>• Auto Color Matching</li>
                <li>• Smart Templates</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">Poster Types</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Game Day Announcements</li>
                <li>• Achievement Celebrations</li>
                <li>• Recruiting Updates</li>
                <li>• Season Highlights</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3">Export Options</h3>
              <ul className="space-y-2 text-gray-400">
                <li>• Twitter Share</li>
                <li>• Facebook Post</li>
                <li>• Instagram Story</li>
                <li>• Direct Download</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
            <p>UltraPreps AI Poster Studio v2.0</p>
            <p className="text-xs mt-2">Every moment deserves a professional poster</p>
          </div>
        </div>
      </div>
    </div>
  );
}