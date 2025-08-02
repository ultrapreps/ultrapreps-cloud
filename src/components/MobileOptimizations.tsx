'use client';

import { useState, useEffect } from 'react';
import { WifiOff, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: ReadonlyArray<string>;
  prompt(): Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
}

export default function MobileOptimizations() {
  const [isOnline, setIsOnline] = useState(true);
  const [isPWAInstallable, setIsPWAInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  useEffect(() => {
    // Check online status
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);

    // PWA Installation
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsPWAInstallable(true);
      
      // Show install banner after a delay
      setTimeout(() => setShowInstallBanner(true), 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Haptic feedback registration
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('SW registered'))
        .catch(() => console.log('SW registration failed'));
    }

    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallPWA = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowInstallBanner(false);
      setIsPWAInstallable(false);
    }
    
    setDeferredPrompt(null);
  };

  const triggerHapticFeedback = (intensity: 'light' | 'medium' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [50]
      };
      navigator.vibrate(patterns[intensity]);
    }
  };

  // Add haptic feedback to global context
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as Window & { haptic?: typeof triggerHapticFeedback }).haptic = triggerHapticFeedback;
    }
  }, []);

  return (
    <>
      {/* Offline Banner */}
      <div className={`offline-banner ${!isOnline ? 'visible' : ''}`}>
        <div className="flex items-center justify-center gap-2">
          <WifiOff className="w-4 h-4" />
          <span>You&apos;re offline. Some features may be limited.</span>
        </div>
      </div>

      {/* PWA Install Banner */}
      {showInstallBanner && isPWAInstallable && (
        <div className="fixed bottom-20 left-4 right-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] p-4 rounded-2xl shadow-lg z-40 md:hidden">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-bold text-sm">Install UltraPreps</h3>
              <p className="text-white/80 text-xs">Get the full app experience</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowInstallBanner(false)}
                className="px-3 py-1 text-white/80 text-sm"
              >
                Later
              </button>
              <button
                onClick={handleInstallPWA}
                className="px-4 py-2 bg-white text-[#F59E0B] font-bold text-sm rounded-lg"
              >
                Install
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}