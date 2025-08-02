'use client';
export const dynamic = 'force-dynamic';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';

export default function LiveLaunchRedirect() {
  // Redirect to stadium creation since we're going LIVE!
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/stadium/create';
    }, 3000); // 3 second delay to show the message

    return () => clearTimeout(timer);
  }, []);


  return (
    <div className="ultra-page-layout flex flex-col items-center justify-center">
      {/* Standardized Stadium Background */}
      <div className="absolute inset-0 ultra-stadium-bg" />

      {/* Standardized Overlays */}
      <div className="absolute inset-0 ultra-overlay-primary" />
      <div className="absolute inset-0 ultra-overlay-secondary" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl ultra-card text-center"
        style={{ padding: '2rem' }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-8xl mb-6"
        >
          🚀
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight"
        >
          <span className="text-[#F59E0B]">WE&apos;RE LIVE!</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-white/80 text-xl leading-relaxed mb-8"
        >
          No more beta, no more waiting! <br/>
          <span className="text-[#F59E0B] font-bold">Create your stadium</span> and start building your legacy <span className="text-[#F59E0B] font-bold">RIGHT NOW!</span>
        </motion.p>
        
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[#F59E0B] font-bold text-lg mb-4"
        >
          Redirecting to Stadium Creation...
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "easeInOut" }}
          className="h-2 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full mx-auto"
        />
      </motion.div>
    </div>
  );
}