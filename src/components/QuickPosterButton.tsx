'use client';

import { useState } from 'react';
import { Zap, X } from 'lucide-react';

interface QuickPosterButtonProps {
  template?: 'gameday' | 'achievement' | 'recruiting' | 'hype';
  data?: Record<string, any>;
  schoolId?: string;
  className?: string;
  children?: React.ReactNode;
  onSuccess?: (poster: any) => void;
}

export default function QuickPosterButton({
  template = 'gameday',
  data = {},
  schoolId,
  className = '',
  children,
  onSuccess
}: QuickPosterButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [generatedPoster, setGeneratedPoster] = useState<any>(null);

  const handleQuickGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/poster/quick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template,
          schoolId,
          data
        })
      });

      const result = await res.json();
      if (result.success) {
        setGeneratedPoster(result);
        setShowModal(true);
        if (onSuccess) onSuccess(result.poster);
      } else {
        alert(result.error || 'Failed to generate poster');
      }
    } catch (error) {
      console.error('Quick poster error:', error);
      alert('Failed to generate poster');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleQuickGenerate}
        disabled={loading}
        className={`flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      >
        <Zap className="w-4 h-4" />
        {loading ? 'Generating...' : (children || 'Quick Poster')}
      </button>

      {/* Success Modal */}
      {showModal && generatedPoster && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Poster Generated!</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Poster Preview */}
              <div className="mb-6">
                <img
                  src={generatedPoster.poster.url}
                  alt={generatedPoster.poster.title}
                  className="w-full rounded-lg"
                />
              </div>

              {/* Poster Info */}
              <div className="mb-6">
                <h4 className="font-bold text-white mb-2">{generatedPoster.poster.title}</h4>
                {generatedPoster.poster.subtitle && (
                  <p className="text-gray-400">{generatedPoster.poster.subtitle}</p>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3">
                <a
                  href={generatedPoster.quickShare.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all text-center"
                >
                  Share on Twitter
                </a>
                <a
                  href={generatedPoster.quickShare.download}
                  download
                  className="flex-1 px-4 py-2 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-all text-center"
                >
                  Download
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}