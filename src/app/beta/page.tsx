'use client';

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
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
      {/* Stadium Background */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/stadium-crowd-energy.jpg')`,
          backgroundAttachment: 'scroll',
          backgroundPosition: 'center top',
          backgroundSize: '120% auto',
          filter: 'grayscale(100%) contrast(1.2) brightness(0.3) blur(3px)',
          WebkitFilter: 'grayscale(100%) contrast(1.2) brightness(0.3) blur(3px)'
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
      <div className="absolute inset-0 bg-black/40" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-2xl bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl text-center"
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