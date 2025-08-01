'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Zap, Users, Trophy, Star, ArrowRight, Heart, MessageCircle, Share2, Crown, Target, Calendar } from 'lucide-react';
import Link from 'next/link';
import GageAIChat from '../../../components/GageAIChat';
import MegaNavigation from '../../../components/MegaNavigation';

interface StadiumData {
  username: string;
  schoolName: string;
  mascot: string;
  colors: {
    primary: string;
    secondary: string;
  };
  sports: string[];
  goals: string[];
  bio: string;
  createdAt: string;
  heroCardGenerated: boolean;
  aiTrainerAssigned: boolean;
}

export default function CinematicStadiumPage() {
  const params = useParams();
  const username = params.username as string;
  const [stadium, setStadium] = useState<StadiumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const fetchStadium = async () => {
      try {
        const response = await fetch(`/api/stadium-create?username=${username}`);
        if (response.ok) {
          const data = await response.json();
          setStadium(data.stadium);
        } else {
          setError('Stadium not found');
        }
      } catch {
        setError('Failed to load stadium');
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchStadium();
    }
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-[#111827] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 border-4 border-[#F59E0B] border-t-transparent rounded-full mx-auto mb-6"
          />
          <h2 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Oswald, sans-serif' }}>
            LOADING YOUR STADIUM
          </h2>
          <p className="text-white/60">Preparing your digital arena...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !stadium) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-[#111827] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <Trophy className="w-32 h-32 text-[#F59E0B]/50 mx-auto mb-8" />
          <h1 className="text-4xl font-black text-white mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
            STADIUM NOT FOUND
          </h1>
          <p className="text-white/70 mb-8 text-lg">This stadium hasn&apos;t been built yet. Ready to create something legendary?</p>
          <Link 
            href="/stadium/create"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-bold rounded-2xl hover:scale-105 transition-transform duration-200"
            style={{ boxShadow: '0px 8px 32px rgba(245, 158, 11, 0.35)' }}
          >
            <Crown className="w-6 h-6" />
            Build Your Stadium
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#111827]">
      {/* Cinematic Stadium Background */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/stadium-crowd-energy.jpg')`,
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          filter: 'grayscale(20%) contrast(1.3) brightness(0.4) saturate(1.2)',
          WebkitFilter: 'grayscale(20%) contrast(1.3) brightness(0.4) saturate(1.2)'
        }}
      />
      
      {/* Professional Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/90 via-[#111827]/85 to-black/95" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-[#1E3A8A]/30" />
      
      {/* Dynamic Light Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#F97316]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Navigation */}
      <MegaNavigation currentPage="stadium" userRole="guest" userName={stadium?.username || 'Guest'} />

      {/* Content */}
      <div className="relative z-10 min-h-screen px-4 py-12">
        
        {/* Stadium Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Crown className="w-12 h-12 text-[#F59E0B]" />
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-wider bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#F59E0B] bg-clip-text text-transparent">
              {stadium.username}&apos;s Stadium
            </h1>
            <Crown className="w-12 h-12 text-[#F59E0B]" />
          </div>
          <p className="text-2xl text-white font-bold">
            {stadium.schoolName} {stadium.mascot}
          </p>
          <p className="text-white/70 text-lg mt-2">
            Member since {new Date(stadium.createdAt).toLocaleDateString()}
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Left Column - Hero Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="lg:col-span-1"
            >
              {/* HeroCard */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-6">
                <div className="text-center">
                  <div className="w-64 h-80 mx-auto mb-6 bg-gradient-to-br from-[#F59E0B]/20 to-[#F97316]/20 rounded-2xl border-2 border-[#F59E0B]/60 flex items-center justify-center">
                    {stadium.heroCardGenerated ? (
                      <div className="text-center">
                        <Trophy className="w-16 h-16 text-[#F59E0B] mx-auto mb-4" />
                        <p className="text-white font-bold text-lg">HeroCard</p>
                        <p className="text-white/70 text-sm">AI Generated</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-8 h-8 border-2 border-[#F59E0B] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <p className="text-white/70 text-sm">Generating HeroCard...</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-center gap-4 mb-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl text-white/80 hover:bg-white/30 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span>125</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl text-white/80 hover:bg-white/30 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>32</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-xl text-white/80 hover:bg-white/30 transition-colors">
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* AI Trainer Status */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#F59E0B]" />
                  AI Trainer
                </h3>
                {stadium.aiTrainerAssigned ? (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{stadium.mascot[0]}</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{stadium.mascot} Trainer</p>
                      <p className="text-white/70 text-sm">Your AI mentor is ready!</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border-2 border-[#F59E0B] border-t-transparent rounded-full animate-spin" />
                    <p className="text-white/70">Assigning your AI trainer...</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              
              {/* Bio Section */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                  <Target className="w-6 h-6 text-[#F59E0B]" />
                  My Story
                </h3>
                <p className="text-white/90 leading-relaxed">{stadium.bio}</p>
              </div>

              {/* Sports & Goals Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Sports */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-[#F59E0B]" />
                    My Activities
                  </h3>
                  <div className="space-y-2">
                    {stadium.sports.map((activity) => (
                      <div key={activity} className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-[#F59E0B]" />
                        <span className="text-white/90">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Goals */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#F59E0B]" />
                    My Goals
                  </h3>
                  <div className="space-y-2">
                    {stadium.goals.slice(0, 5).map((goal) => (
                      <div key={goal} className="flex items-center gap-2">
                        <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
                        <span className="text-white/90 text-sm">{goal}</span>
                      </div>
                    ))}
                    {stadium.goals.length > 5 && (
                      <p className="text-white/60 text-sm">+{stadium.goals.length - 5} more goals</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#F59E0B]" />
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link
                    href="/poster/create"
                    className="p-4 bg-white/10 rounded-xl text-center hover:bg-white/20 transition-colors block"
                  >
                    <Trophy className="w-8 h-8 text-[#F59E0B] mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Create Poster</p>
                  </Link>
                  <Link
                    href="/community"
                    className="p-4 bg-white/10 rounded-xl text-center hover:bg-white/20 transition-colors block"
                  >
                    <Users className="w-8 h-8 text-[#F59E0B] mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Join Team Chat</p>
                  </Link>
                  <Link
                    href="/dashboard"
                    className="p-4 bg-white/10 rounded-xl text-center hover:bg-white/20 transition-colors block"
                  >
                    <Star className="w-8 h-8 text-[#F59E0B] mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">Earn HYPE</p>
                  </Link>
                  <button 
                    onClick={() => setIsChatOpen(true)}
                    className="p-4 bg-white/10 rounded-xl text-center hover:bg-white/20 transition-colors"
                  >
                    <Zap className="w-8 h-8 text-[#F59E0B] mx-auto mb-2" />
                    <p className="text-white text-sm font-medium">AI Chat</p>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <h3 className="text-white font-bold text-lg mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Stadium Created!</p>
                      <p className="text-white/60 text-sm">Welcome to UltraPreps</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full flex items-center justify-center">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">AI Trainer Assignment</p>
                      <p className="text-white/60 text-sm">Your {stadium.mascot} trainer is being prepared</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Gage AI Chat */}
      <GageAIChat
        userId={stadium?.username || 'guest'}
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
}