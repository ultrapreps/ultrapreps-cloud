'use client';

import { useState } from 'react';
import PosterManager from '@/components/PosterManager';
import { Image as ImageIcon, Sparkles, Zap, Trophy, Calendar, Users, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function TestPosterPage() {
  const [notification, setNotification] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);
  const handlePosterCreated = (poster: any) => {
    setNotification(`Poster created successfully! Type: ${poster.type}`);
    setTimeout(() => setNotification(null), 5000);
  };
  const resetDemo = () => {
    setNotification(null);
    setResetKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Onboarding Banner */}
      <div className="mb-8 bg-gradient-to-r from-[#F59E0B]/80 to-[#F97316]/80 rounded-xl p-6 text-black text-center font-bold text-2xl shadow-xl">
        UltraPreps Onboarding Demo: Instantly create ESPN-quality posters with AI. Try different templates and share your creations!
      </div>
      {/* Onboarding Tips */}
      <div className="mb-8 bg-blue-900/20 border border-blue-500 rounded-xl p-4 text-blue-200 text-lg shadow">
        <ul className="list-disc pl-6 space-y-2 text-left">
          <li>Use the <span className="font-bold">Poster Studio</span> to create ESPN-quality posters with AI-powered design.</li>
          <li>Try different templates and poster types to see the full range of options.</li>
          <li>Share your creations using the export options or download them directly.</li>
          <li>Use the <span className="font-bold">Reset Demo</span> button to start over and try different scenarios.</li>
        </ul>
      </div>
      {/* Header */}
      <div className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <ImageIcon className="w-8 h-8 text-white" /> AI Poster Studio Onboarding Demo
            </h1>
            <p className="text-gray-400 mt-1">Create ESPN-quality posters with AI-powered design. All data is for demo purposes only.</p>
          </div>
          <button onClick={resetDemo} className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-bold transition-all">
            <RefreshCw className="w-5 h-5" /> Reset Demo
          </button>
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
        <PosterManager key={resetKey} onPosterCreated={handlePosterCreated} />
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
          {/* Next Step CTA */}
          <div className="mt-8 text-center">
            <Link href="/onboarding" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black font-bold text-xl rounded-xl shadow-lg hover:scale-105 transition-all">
              <Sparkles className="w-6 h-6 text-pink-500" /> Finish Onboarding
            </Link>
            <div className="mt-2 text-gray-400 text-sm">You’ve completed the demo journey! Start your real UltraPreps experience.</div>
          </div>
        </div>
      </div>
    </div>
  );
}