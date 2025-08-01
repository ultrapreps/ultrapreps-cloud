'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import PosterManager from '@/components/PosterManager';
import { ArrowLeft, Image as ImageIcon, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CreatePosterPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isCreating, setIsCreating] = useState(false);

  const handlePosterCreated = (poster: any) => {
    // Show success message
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-pulse';
    message.textContent = 'Poster created successfully!';
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.remove();
      // Redirect to gallery view
      router.push('/poster/gallery');
    }, 2000);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sign in Required</h1>
          <p className="text-gray-400 mb-6">You need to be signed in to create posters.</p>
          <Link
            href="/auth/signin"
            className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

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
                  <ImageIcon className="w-7 h-7 text-white" />
                  Create Poster
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  Design professional sports posters with AI
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              <span className="text-sm text-gray-400">Powered by DALL-E 3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8">
        <PosterManager onPosterCreated={handlePosterCreated} />
      </div>

      {/* Tips Section */}
      <div className="max-w-7xl mx-auto px-8 pb-12">
        <div className="bg-gray-900 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4">Pro Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-3">
              <span className="text-yellow-500 mt-0.5">💡</span>
              <div>
                <p className="font-medium mb-1">Clear Titles</p>
                <p className="text-gray-400">Use concise, impactful titles that grab attention</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-500 mt-0.5">🎨</span>
              <div>
                <p className="font-medium mb-1">School Colors</p>
                <p className="text-gray-400">AI automatically matches your school brand colors</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-yellow-500 mt-0.5">📱</span>
              <div>
                <p className="font-medium mb-1">Social Ready</p>
                <p className="text-gray-400">All posters are optimized for social media sharing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}