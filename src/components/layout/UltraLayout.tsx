'use client';

import React, { useEffect } from 'react';
import UltraNavigation from '../navigation/UltraNavigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useAutonomousUltraBrain } from '@/lib/bots/AutonomousUltraBrain';

interface UltraLayoutProps {
  children: React.ReactNode;
}

export default function UltraLayout({ children }: UltraLayoutProps) {
  const { status: brainStatus, activate, deactivate } = useAutonomousUltraBrain();

  // Initialize AutonomousUltraBrain
  useEffect(() => {
    // Activate the brain when component mounts
    activate();
    
    // Cleanup on unmount
    return () => {
      deactivate();
    };
  }, [activate, deactivate]);

  return (
    <>
      <UltraNavigation />
      
      {/* Main Content with Navigation Offset */}
      <main className="min-h-screen">
        <div className="lg:pt-16 pt-14 pb-16 lg:pb-0">
          {children}
        </div>
      </main>

      {/* UltraBrain Status Indicator */}
      <AnimatePresence>
        {brainStatus.isActive && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed bottom-4 left-4 z-40"
          >
            <div className="bg-black/80 backdrop-blur-md rounded-lg border border-white/20 p-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Brain className="w-5 h-5 text-[#F59E0B]" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">UltraBrain Active</span>
                    <span className="text-xs text-white/60">
                      {brainStatus.issuesFixed} fixed | {brainStatus.learningScore}% accuracy
                    </span>
                  </div>
                  {brainStatus.currentTask && (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin text-[#F97316]" />
                      <span className="text-xs text-white/70">
                        {brainStatus.currentTask}
                      </span>
                    </div>
                  )}
                  {brainStatus.issuesFound > 0 && (
                    <div className="flex items-center gap-2 mt-1">
                      <AlertCircle className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs text-yellow-400">
                        {brainStatus.issuesFound} issues detected
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progressive Web App Install Prompt */}
      <div id="pwa-install-container" />
    </>
  );
}