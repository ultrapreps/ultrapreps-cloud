'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, ArrowLeft, Sparkles, Trophy, Users } from 'lucide-react';

export default function CatchAllContent() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Animated Logo */}
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="mb-8 inline-block"
        >
          <Sparkles className="w-24 h-24 text-[#F59E0B]" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
          Coming Soon!
        </h1>

        <p className="text-xl text-white/60 mb-8">
          This feature is being built by our AI team and will be available soon!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link href="/dashboard" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <Trophy className="w-12 h-12 text-[#F59E0B] mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Student Dashboard</h3>
              <p className="text-sm text-white/60">Your personal command center</p>
            </div>
          </Link>

          <Link href="/stadium/create" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <Sparkles className="w-12 h-12 text-[#F97316] mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Create Stadium</h3>
              <p className="text-sm text-white/60">Build your digital identity</p>
            </div>
          </Link>

          <Link href="/community" className="group">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <Users className="w-12 h-12 text-[#F59E0B] mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2">Community</h3>
              <p className="text-sm text-white/60">Connect with others</p>
            </div>
          </Link>
        </div>

        <div className="flex gap-4 justify-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
          
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] hover:from-[#F59E0B]/90 hover:to-[#F97316]/90 rounded-xl transition-all font-bold"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Background Effects */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#F59E0B]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F97316]/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </motion.div>
    </div>
  );
}