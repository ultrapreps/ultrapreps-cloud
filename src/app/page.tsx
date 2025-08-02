'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, Heart, Users, Crown, Play, ArrowRight, Rocket, Zap, Star, Camera, BarChart3, Bot
} from "lucide-react";
import Link from 'next/link';

export default function UltraPrepsHomepage() {
  const [activeDemo, setActiveDemo] = useState('student');

  const coreFeatures = [
    { icon: Trophy, title: "AI HeroCards", description: "Professional athletic cards in 60 seconds", href: "/stadium/create" },
    { icon: Camera, title: "Championship Posters", description: "Victory celebration generator", href: "/poster/create" },
    { icon: BarChart3, title: "Performance Analytics", description: "Live athletic intelligence", href: "/test-hud" },
    { icon: Bot, title: "AI Mascots", description: "Custom school spirit creation", href: "/test-mascot" },
    { icon: Zap, title: "HYPE Economy", description: "Community-powered rewards", href: "/test-hype" },
    { icon: Star, title: "MediaKit Generator", description: "ESPN-quality press materials", href: "/media-kit" }
  ];

  const stakeholderDemos = [
    { id: 'student', label: 'Student Athlete', icon: Trophy, href: '/stadium/create', color: 'from-orange-500 to-red-500' },
    { id: 'parent', label: 'Parent & Family', icon: Heart, href: '/parent-dashboard', color: 'from-blue-500 to-indigo-600' },
    { id: 'coach', label: 'Coach', icon: Users, href: '/coach-dashboard', color: 'from-green-500 to-emerald-600' },
    { id: 'grandpa', label: 'Grandpa Jim Demo', icon: Crown, href: '/grandpa-jim-demo', color: 'from-purple-500 to-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/stadium-crowd-energy.jpg')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
        </div>

        {/* ULTRAPREPS Crown Logo */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex items-center gap-3">
            <Crown className="w-12 h-12 text-[#F59E0B]" />
            <div className="text-center">
              <h1 className="text-3xl font-black tracking-wider text-white">ULTRAPREPS</h1>
              <p className="text-xs text-[#F59E0B] font-bold tracking-widest">AI-POWERED ATHLETICS</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight">
              <span className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
                DIGITAL
              </span>
              <br />
              <span className="text-white">IMMORTALITY</span>
            </h1>
            
            <p className="text-2xl md:text-3xl mb-4 max-w-4xl mx-auto leading-relaxed text-gray-300">
              The World's First AI-Powered Athletic Legacy Platform
            </p>
            
            <p className="text-xl text-[#F59E0B] font-bold mb-16 max-w-3xl mx-auto leading-relaxed">
              From First T-Ball Practice to Professional Championship - Every Moment Preserved Forever
            </p>

            {/* Core Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
              {coreFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    href={feature.href}
                    className="group bg-white/5 hover:bg-white/15 border border-white/20 hover:border-[#F59E0B]/60 
                             rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl 
                             hover:shadow-[#F59E0B]/20 flex flex-col items-center gap-3 text-center min-h-[140px]"
                  >
                    <feature.icon className="w-8 h-8 text-white group-hover:text-[#F59E0B] transition-colors" />
                    <div>
                      <h3 className="font-black text-white group-hover:text-[#F59E0B] transition-colors mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors leading-tight">
                        {feature.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Call to Actions */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <Link
                href="/stadium/create"
                className="inline-flex items-center gap-4 px-12 py-6 text-white bg-gradient-to-r from-[#F59E0B] to-[#F97316] 
                         rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-[#F59E0B]/30"
              >
                <Rocket className="w-7 h-7" />
                Create Your Stadium
                <ArrowRight className="w-7 h-7" />
              </Link>
              
              <Link
                href="/beta"
                className="inline-flex items-center gap-4 px-12 py-6 text-white bg-white/10 border-2 border-white/30 
                         rounded-2xl font-black text-xl hover:bg-white/20 hover:border-white/50 transition-all"
              >
                <Crown className="w-7 h-7" />
                Join Beta Program
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STAKEHOLDER DEMOS SECTION */}
      <section className="py-24 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-4 mb-8">
              <Play className="w-8 h-8 text-[#F59E0B]" />
              <h2 className="text-4xl font-black text-white">LIVE DEMO EXPERIENCES</h2>
              <Play className="w-8 h-8 text-[#F59E0B]" />
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the power of UltraPreps from any perspective - no signup required
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stakeholderDemos.map((demo, index) => (
              <motion.div
                key={demo.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={demo.href}
                  className={`group bg-gradient-to-br ${demo.color} p-6 rounded-xl transition-all duration-300 
                           hover:scale-105 hover:shadow-2xl flex flex-col items-center gap-4 text-center min-h-[160px]`}
                >
                  <demo.icon className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
                  <div>
                    <h3 className="font-black text-white text-lg mb-2">{demo.label}</h3>
                    <p className="text-white/80 text-sm">Live Demo</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 
                          backdrop-blur-sm rounded-full border border-[#F59E0B]/50">
              <Zap className="w-6 h-6 text-[#F59E0B]" />
              <span className="text-white font-black text-lg">🚀 LIVE FEATURES - NO SIGNUP REQUIRED</span>
              <Zap className="w-6 h-6 text-[#F59E0B]" />
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM NAVIGATION - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-[#F59E0B]/30 md:hidden">
        <div className="grid grid-cols-5 h-16">
          <Link href="/" className="flex flex-col items-center justify-center gap-1 text-[#F59E0B]">
            <Crown className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Link>
          <Link href="/stadium/create" className="flex flex-col items-center justify-center gap-1 text-white/90 hover:text-[#F59E0B] transition-colors">
            <Trophy className="w-5 h-5" />
            <span className="text-xs">Stadium</span>
          </Link>
          <Link href="/community" className="flex flex-col items-center justify-center gap-1 text-white/90 hover:text-[#F59E0B] transition-colors">
            <Users className="w-5 h-5" />
            <span className="text-xs">Community</span>
          </Link>
          <Link href="/feed" className="flex flex-col items-center justify-center gap-1 text-white/90 hover:text-[#F59E0B] transition-colors">
            <Star className="w-5 h-5" />
            <span className="text-xs">Feed</span>
          </Link>
          <Link href="/dashboard" className="flex flex-col items-center justify-center gap-1 text-white/90 hover:text-[#F59E0B] transition-colors">
            <BarChart3 className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}