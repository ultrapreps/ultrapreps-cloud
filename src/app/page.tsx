"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Zap, 
  Building2, 
  Users, 
  Star, 
  Activity,
  Play,
  Sparkles,
  Target,
  Rocket,
  Crown,
  Flame,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useInView } from "react-intersection-observer";

// import { Progress } from "@radix-ui/react-progress";
import clsx from "clsx";
import MegaNavigation from '../components/MegaNavigation';

// OLD NAVBAR REMOVED - Using GlobalNavigation instead

function Footer() {
  return (
    <footer className="w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 border-t-2 border-[#F59E0B]/40 text-center relative z-20">
      {/* Footer background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F59E0B]/3 to-transparent" />
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Crown className="w-8 h-8 text-[#F59E0B]" />
            <h3 className="text-3xl font-black uppercase tracking-widest text-white">
              UltraPreps
            </h3>
            <Crown className="w-8 h-8 text-[#F59E0B]" />
          </div>
          <p className="text-xl text-white font-bold mb-4">
            Built for Every Student, Every Achievement, Every Family
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#F59E0B] to-[#F97316] mx-auto rounded-full" />
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8"
        >
          {[
            { name: "Dashboard", href: "/dashboard" },
            { name: "Community", href: "/community" },
            { name: "Recruiting", href: "/recruiting" },
            { name: "Feed", href: "/feed" },
            { name: "Coach Portal", href: "/coach-dashboard" },
            { name: "Parent Portal", href: "/parent-dashboard" }
          ].map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ scale: 1.05, color: "#F59E0B" }}
              className="text-white/70 text-sm sm:text-base font-bold uppercase tracking-wide sm:tracking-widest hover:text-[#F59E0B] transition-all duration-300 border-b border-transparent hover:border-[#F59E0B] px-2 py-1"
            >
              {link.name}
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-white/60 text-sm uppercase tracking-wider"
        >
          <div className="mb-2">
            UltraPreps &copy; {new Date().getFullYear()} &mdash; Every Student Deserves Greatness
          </div>
          <div className="flex items-center justify-center gap-2">
            <Star className="w-4 h-4 text-[#F59E0B]" />
            <span>Your Own Stadium — Powered by UltraAI</span>
            <Star className="w-4 h-4 text-[#F59E0B]" />
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

function PepRallySection() {
  const [hypeLevel] = useState(91);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  const liveMessages = [
    { user: "fanmom", message: "LET'S GO MUSTANGS!", time: "2s", avatar: "👩", verified: true },
    { user: "coachcoleman", message: "BELIEVE IN YOURSELF!", time: "5s", avatar: "🏈", verified: true },
    { user: "gage11", message: "Friday night, every night!", time: "8s", avatar: "⭐", verified: true },
    { user: "stadiumfan", message: "ULTRAPREPS IS THE FUTURE!", time: "12s", avatar: "🚀", verified: false }
  ];

  return (
    <section ref={ref} className="w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden" id="pep-rally">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        transition={{ duration: 1 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <Activity className="w-12 h-12 text-[#F59E0B]" />
          <h2 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tight drop-shadow-xl">
            PEP RALLY LIVE HYPE
          </h2>
          <Flame className="w-12 h-12 text-[#F97316]" />
        </div>
        <div className="w-32 h-1 bg-gradient-to-r from-[#F59E0B] to-[#F97316] mx-auto rounded-full" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 sm:px-0 flex flex-col lg:flex-row items-center justify-center gap-16">
        {/* Enterprise HYPE Meter */}
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
          transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
          className="flex flex-col items-center relative"
        >
          <div className="relative w-64 h-64 mb-8">
            {/* Professional progress ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] p-2">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                <div className="relative w-48 h-48">
                  {/* Custom circular progress */}
                  <svg width="192" height="192" viewBox="0 0 192 192" className="absolute inset-0">
                    <defs>
                      <linearGradient id="hype-gradient-new" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: "#F59E0B" }} />
                        <stop offset="50%" style={{ stopColor: "#F97316" }} />
                        <stop offset="100%" style={{ stopColor: "#F59E0B" }} />
                      </linearGradient>
                    </defs>
                    {/* Background circle */}
                    <circle cx="96" cy="96" r="80" stroke="#1E3A8A" strokeWidth="12" fill="none" opacity="0.3" />
                    {/* Progress circle */}
                    <motion.circle 
                      cx="96" 
                      cy="96" 
                      r="80" 
                      stroke="url(#hype-gradient-new)" 
                      strokeWidth="12" 
                      fill="none" 
                      strokeDasharray="502"
                      strokeDashoffset={502 - (hypeLevel / 100 * 502)}
                      strokeLinecap="round"
                      initial={{ strokeDashoffset: 502 }}
                      animate={{ strokeDashoffset: 502 - (hypeLevel / 100 * 502) }}
                      transition={{ duration: 2, ease: "easeOut" }}
                    />
        </svg>
                  
                  {/* Center display */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 1, duration: 0.5 }}
                      className="text-center"
                    >
                      <div className="text-6xl font-black text-[#F59E0B] drop-shadow-xl mb-2">
                        {hypeLevel}
                      </div>
                      <div className="flex items-center gap-2 bg-[#F59E0B] px-4 py-2 rounded-full">
                        <Zap className="w-5 h-5 text-black" />
                        <span className="text-black font-black text-lg tracking-widest uppercase">
                          HYPE
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating stats */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-[#F59E0B] text-black px-3 py-1 rounded-full text-sm font-bold"
            >
              +847 Live
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ delay: 2 }}
            className="text-center"
          >
            <h3 className="text-white/90 font-black uppercase text-2xl tracking-wider mb-2">
              LIVE STADIUM ENERGY
            </h3>
            <div className="flex items-center gap-2 text-[#F59E0B] font-bold">
              <Users className="w-5 h-5" />
              Real-time fan engagement
            </div>
          </motion.div>
        </motion.div>

        {/* Professional Live Stream Feed */}
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex-1 max-w-2xl"
        >
          <div className="bg-gradient-to-br from-black/95 to-[#1E3A8A]/30 border-2 border-[#F59E0B] rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                <Play className="w-6 h-6 text-[#F59E0B]" />
                <h3 className="text-2xl font-black uppercase text-white tracking-widest">
                  LIVE PEP RALLY STREAM
                </h3>
      </div>
    </div>
            
            <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
              {liveMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ x: -50, opacity: 0 }}
                  animate={inView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                  transition={{ delay: 2 + i * 0.3 }}
                  className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full flex items-center justify-center text-black font-bold shadow-lg">
                    {msg.user[0].toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#F59E0B] font-bold">@{msg.user}</span>
                      {msg.verified && <Star className="w-4 h-4 text-[#F59E0B]" />}
                      <span className="text-white/50 text-xs">{msg.time} ago</span>
                    </div>
                    <p className="text-white/90 font-medium leading-relaxed">{msg.message}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 4 }}
              className="mt-6 p-4 bg-gradient-to-r from-[#F59E0B]/10 to-[#F97316]/10 rounded-xl border border-[#F59E0B]/20"
            >
              <div className="flex items-center justify-center gap-2 text-[#F59E0B] font-bold uppercase tracking-wider">
                <Flame className="w-5 h-5" />
                847 fans cheering live • Join the HYPE!
                <Flame className="w-5 h-5" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 py-8 sm:py-12 overflow-hidden">
      {/* Explosive Campaign Headlines */}
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center mb-8 sm:mb-12 z-20 relative"
      >

        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tight leading-none mb-4 sm:mb-6 text-center text-white px-4"
          style={{ 
            textShadow: "0 8px 32px rgba(0,0,0,0.9), 0 0 40px rgba(245,158,11,0.3)"
          }}
        >
          EVERY STUDENT<br/>DESERVES GREATNESS
        </motion.h1>
        <motion.h2 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold uppercase tracking-wide text-[#F59E0B] drop-shadow-2xl px-4"
        >
          Your Own Stadium — Powered by UltraAI
        </motion.h2>


      </motion.div>

      {/* Founder HeroCard - Massive Impact */}
      <motion.div 
        initial={{ y: 200, opacity: 0, rotateY: -15 }}
        animate={{ y: 0, opacity: 1, rotateY: 0 }}
        transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05, rotateY: 5, z: 100 }}
        className="relative group z-20 flex flex-col items-center justify-center w-full"
      >
        {/* Meet the Founder label with subtle glow */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.8, type: "spring", bounce: 0.4 }}
          className="mb-6 sm:mb-8 text-center"
        >
          <span className="inline-block bg-gradient-to-r from-[#F59E0B]/80 to-[#F97316]/80 text-black font-black text-base sm:text-lg md:text-xl uppercase tracking-wide sm:tracking-widest px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full shadow-2xl border-2 border-white/80 transform hover:scale-110 transition-all duration-300"
                style={{ boxShadow: "0 0 20px rgba(245,158,11,0.4), 0 20px 40px rgba(0,0,0,0.5)" }}>
            MEET THE FOUNDER
          </span>
        </motion.div>

        {/* HeroCard with extreme effects - Matching Student Spotlight Size */}
        <div className="relative w-80 md:w-96 lg:w-[28rem] h-auto max-h-[32rem] md:max-h-[38rem] lg:max-h-[44rem] mx-auto flex items-center justify-center transform-gpu perspective-1000">
          <motion.div
            whileHover={{ rotateX: 2, rotateY: 2 }}
            className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-[#F59E0B]/60 shadow-2xl"
            style={{ 
              boxShadow: "0 0 30px rgba(245,158,11,0.3), 0 30px 60px rgba(0,0,0,0.7), inset 0 0 20px rgba(245,158,11,0.1)" 
            }}
          >
            <Image
              src="/gage-coleman-herocard.png"
              alt="Gage Coleman Hero Card"
              width={400}
              height={600}
              className="w-full h-auto rounded-3xl shadow-2xl block"
              priority
            />
            {/* Dynamic lighting overlays */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl" 
                 style={{
                   background: 'linear-gradient(135deg, rgba(245,158,11,0.08) 0%, transparent 30%, rgba(255,255,255,0.05) 70%, rgba(245,158,11,0.1) 100%)', 
                   mixBlendMode: 'screen'
                 }} 
            />
            <motion.div 
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-t-3xl" 
            />
            {/* Stadium light reflection - full sweep */}
            <motion.div
              animate={{ x: ['-120%', '120%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{ 
                width: '60%',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 25%, rgba(245,158,11,0.15) 50%, rgba(255,255,255,0.08) 75%, transparent 100%)',
                filter: 'blur(1px)'
              }}
            />
            {/* Secondary dramatic flare */}
            <motion.div
              animate={{ x: ['-150%', '150%'] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 5 }}
              className="absolute inset-0 pointer-events-none rounded-3xl"
              style={{ 
                width: '40%',
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.05) 70%, transparent 100%)',
                filter: 'blur(2px)'
              }}
            />
          </motion.div>
        </div>

        {/* Founder info with energy */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mt-6 sm:mt-8 text-center max-w-4xl mx-auto px-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase text-white mb-3 sm:mb-4 tracking-wide sm:tracking-wider drop-shadow-xl">GAGE COLEMAN</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <span className="text-sm sm:text-base md:text-lg lg:text-xl text-[#F59E0B] font-black uppercase tracking-wide sm:tracking-widest border-2 border-[#F59E0B] px-3 sm:px-4 py-1 sm:py-2 rounded-full">FOUNDER & WR #11</span>
            <span className="text-sm sm:text-base md:text-lg lg:text-xl text-white font-bold uppercase tracking-wide sm:tracking-widest">MARBLE FALLS MUSTANGS</span>
          </div>
          
          {/* Gage's inspiring quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.8, duration: 0.8 }}
            className="p-4 sm:p-6 bg-black/60 border border-[#F59E0B]/30 rounded-2xl backdrop-blur-sm"
          >
            <blockquote className="text-lg sm:text-xl md:text-2xl text-white font-bold italic leading-relaxed mb-3">
              &ldquo;Every student deserves their stadium. Not just the starters—every student who represents their school deserves to be seen and celebrated.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-2">
              <Crown className="w-5 h-5 text-[#F59E0B]" />
              <cite className="text-[#F59E0B] font-black uppercase tracking-wider">— Gage Coleman</cite>
              <Crown className="w-5 h-5 text-[#F59E0B]" />
      </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function StudentSpotlightGallery() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const heroCards = [
    { 
      id: 1, 
      src: "/herocard-1.png",
      name: "Maria Rodriguez",
      school: "Austin Hawks",
      sport: "Soccer • State Champion",
      year: "Junior",
      stats: "23 Goals • 15 Assists",
      quote: "UltraPreps helped me get recruited!"
    },
    { 
      id: 2, 
      src: "/herocard-2.png",
      name: "James Thompson",
      school: "Dallas Eagles",
      sport: "Basketball • MVP Season",
      year: "Senior",
      stats: "18.5 PPG • 7.2 APG",
      quote: "My highlight reel changed everything!"
    },
    { 
      id: 3, 
      src: "/herocard-3.png",
      name: "Sarah Chen",
      school: "Houston Lions",
      sport: "Track & Field • Record Holder",
      year: "Sophomore", 
      stats: "100m: 11.2s • 200m: 23.8s",
      quote: "Every achievement preserved forever!"
    },
    { 
      id: 4, 
      src: "/herocard-4.png",
      name: "Marcus Williams",
      school: "San Antonio Bears",
      sport: "Football • All-District QB",
      year: "Senior",
      stats: "3,200 Yards • 32 TDs",
      quote: "My stadium is where scouts find me!"
    },
    { 
      id: 5, 
      src: "/herocard-5.png",
      name: "Emma Johnson",
      school: "Fort Worth Rams",
      sport: "Volleyball • Team Captain",
      year: "Junior",
      stats: "452 Kills • 89 Blocks",
      quote: "Leadership tracked, legacy built!"
    },
    { 
      id: 6, 
      src: "/herocard-6.png",
      name: "David Lee",
      school: "El Paso Tigers",
      sport: "Baseball • League Leader",
      year: "Senior",
      stats: ".385 AVG • 42 RBIs",
      quote: "From Little League to College Dreams!"
    },
    { 
      id: 7, 
      src: "/herocard-7.png",
      name: "Ashley Martinez",
      school: "Plano Panthers",
      sport: "Tennis • Regional Champion",
      year: "Freshman",
      stats: "32-2 Record • #1 Seed",
      quote: "My journey just started!"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % heroCards.length);
  }, [heroCards.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + heroCards.length) % heroCards.length);
  }, [heroCards.length]);

  // Manual navigation only - no auto-rotate

  return (
    <section ref={ref} className="w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Background energy patterns removed */}

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
        className="text-center mb-16 relative z-10"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <Users className="w-12 h-12 text-white" />
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight drop-shadow-xl">
            STUDENT SPOTLIGHT
          </h2>
          <Star className="w-12 h-12 text-white" />
        </div>
        <div className="w-32 h-1 bg-white/30 mx-auto rounded-full mb-8" />
        
        {/* Inspiring message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <p className="text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white font-bold leading-relaxed mb-8"
             style={{ 
               textShadow: "0 4px 16px rgba(0,0,0,0.8)" 
             }}
          >
            Every student will have their own{' '}
            <span className="text-[#F59E0B] font-black uppercase tracking-wide bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent drop-shadow-lg">
              SPACE
            </span>
            , their own{' '}
            <span className="text-[#F59E0B] font-black uppercase tracking-wide bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent drop-shadow-lg">
              PORTAL
            </span>
            , and{' '}
            <span className="text-[#F59E0B] font-black uppercase tracking-wide bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent drop-shadow-lg">
              TOOLS
            </span>
            {' '}that will link their entire journey from{' '}
            <span className="text-white font-black border-b-2 border-[#F59E0B]/50">youth to college recruitment</span>
            —all in their own{' '}
            <span className="text-[#F59E0B] font-black uppercase tracking-widest">STADIUM</span>
            {' '}on UltraPreps.
          </p>
          
          {/* Enhanced UltraAI branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="relative"
          >
            <div className="flex items-center justify-center gap-4 text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-widest mb-4">
              <motion.div
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Zap className="w-8 h-8 md:w-10 md:h-10 text-[#F59E0B]" />
              </motion.div>
              
              <span className="text-white drop-shadow-xl">ALL POWERED BY</span>
              
              <motion.div
                animate={{ 
                  rotate: [0, -15, 15, 0],
                  scale: [1, 1.1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              >
                <Zap className="w-8 h-8 md:w-10 md:h-10 text-[#F59E0B]" />
              </motion.div>
            </div>
            
            {/* Ultra AI with extreme styling */}
            <motion.div
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(245,158,11,0.5)",
                  "0 0 40px rgba(245,158,11,0.8)",
                  "0 0 20px rgba(245,158,11,0.5)"
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-widest bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#F59E0B] bg-clip-text text-transparent"
              style={{
                textShadow: "0 0 20px rgba(245,158,11,0.5), 0 4px 8px rgba(0,0,0,0.8)"
              }}
            >
              ULTRA<span className="text-white">AI</span>
            </motion.div>
            
            {/* Glowing underline */}
            <motion.div
              animate={{ 
                width: ["0%", "100%", "100%", "0%"],
                opacity: [0, 1, 1, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="h-1 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent mx-auto mt-4"
              style={{ maxWidth: "400px" }}
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Rotating HeroCard Gallery */}
      <div className="max-w-6xl mx-auto px-4 sm:px-0 relative overflow-hidden">
        <div className="relative h-[36rem] md:h-[42rem] lg:h-[48rem] rounded-3xl overflow-hidden">
          {/* Main carousel container */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            {/* Center HeroCard */}
            <motion.div
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="relative w-80 md:w-96 lg:w-[28rem] h-auto max-h-[32rem] md:max-h-[38rem] lg:max-h-[44rem] mx-auto"
              style={{ overflow: 'hidden' }}
            >
              {/* HeroCard with natural aspect ratio */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative max-w-full max-h-full rounded-2xl overflow-hidden border-2 border-[#F59E0B]/60" style={{ overflow: 'hidden' }}>
                  <Image
                    src={heroCards[currentIndex].src}
                    alt="UltraPreps Student HeroCard"
                    width={400}
                    height={600}
                    className="w-full h-auto rounded-2xl shadow-2xl block"
                    style={{ 
                      boxShadow: "0 40px 80px rgba(0,0,0,0.8)"
                    }}
                  />
                  {/* Dynamic overlay effects - STRICTLY CONTAINED TO IMAGE */}
                  <motion.div
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-2xl"
                  />
                  {/* Stadium light sweep - STRICTLY CONTAINED TO IMAGE ONLY */}
                  <motion.div
                    animate={{ x: ['0%', '60%', '0%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-0 left-0 pointer-events-none"
                    style={{ 
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)',
                      filter: 'blur(1px)',
                      width: '40%',
                      height: '100%',
                      borderRadius: '1rem'
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Side cards preview */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-30">
            <motion.div
              animate={{ scale: [0.6, 0.65, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 md:w-32 lg:w-36 h-32 md:h-40 lg:h-48 flex items-center justify-center"
            >
              <Image
                src={heroCards[(currentIndex - 1 + heroCards.length) % heroCards.length].src}
                alt="Previous card"
                width={120}
                height={180}
                className="w-full h-auto rounded-xl border-2 border-[#F59E0B]/60 shadow-lg"
              />
            </motion.div>
          </div>

          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-30">
            <motion.div
              animate={{ scale: [0.6, 0.65, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="w-24 md:w-32 lg:w-36 h-32 md:h-40 lg:h-48 flex items-center justify-center"
            >
              <Image
                src={heroCards[(currentIndex + 1) % heroCards.length].src}
                alt="Next card"
                width={120}
                height={180}
                className="w-full h-auto rounded-xl border-2 border-[#F59E0B]/60 shadow-lg"
              />
            </motion.div>
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-black/80 border-2 border-white/60 text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 p-3 rounded-full bg-black/80 border-2 border-white/60 text-white hover:bg-white hover:text-black transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        

        {/* Carousel indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {heroCards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={clsx(
                "w-3 h-3 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-white scale-125 shadow-lg"
                  : "bg-white/30 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function UltraAISystemsSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [hoveredSystem, setHoveredSystem] = useState<string | null>(null);

  const ultraAISystems = [
    {
      id: "video_engine",
      title: "VIDEO DOMINATION",
      subtitle: "AI Auto-Highlight Engine",
      description: "Weekly ESPN-grade highlight reels automatically generated from your content with AI voiceover, cinematic effects, and professional school branding",
      icon: Play,
      color: "from-[#DC2626] to-[#7C2D12]",
      stats: ["60-90 Second Reels", "Auto-Scripted Voiceover", "Cinematic Effects", "Auto-Distribution"]
    },
    {
      id: "stats_engine",
      title: "STATS REVOLUTION",
      subtitle: "Dynamic Stadium Engine",
      description: "Interactive leaderboards, animated stats, real-time HYPE tracking, and rivalry-enhanced themes that make static stat sites look prehistoric",
      icon: Trophy,
      color: "from-[#1E3A8A] to-[#3B82F6]",
      stats: ["Live HYPE Tracking", "Rivalry Themes", "Interactive Stats", "Community Submissions"]
    },
    {
      id: "recruiting_engine",
      title: "RECRUITING REIMAGINED",
      subtitle: "Transparent Growth Engine",
      description: "AI-driven evaluation over time, underdog spotlight algorithm, transparent metrics, and verified college pipelines that destroy traditional recruiting models",
      icon: Target,
      color: "from-[#059669] to-[#065F46]",
      stats: ["Growth Tracking", "Underdog Priority", "Transparent Metrics", "College Connections"]
    }
  ];

  return (
    <section ref={ref} id="ultraaisystems" className="w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
        className="text-center mb-12 sm:mb-16 md:mb-20"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <Zap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#F59E0B]" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase text-white tracking-tight drop-shadow-xl text-center">
            ULTRAAI SYSTEMS
          </h2>
          <Zap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#F59E0B]" />
        </div>
        <div className="w-24 sm:w-28 md:w-32 h-1 bg-gradient-to-r from-[#F59E0B]/60 to-[#F97316]/60 mx-auto rounded-full mb-8" />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-white/80 font-bold uppercase tracking-wider max-w-4xl mx-auto"
        >
          Advanced AI systems that revolutionize how students showcase their talents — <span className="text-[#F59E0B]">BEYOND ANYTHING ELSE</span>
        </motion.p>
      </motion.div>

      {/* UltraAI Systems Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {ultraAISystems.map((system, index) => {
          const IconComponent = system.icon;
          return (
            <motion.div
              key={system.id}
              initial={{ opacity: 0, y: 100, rotateY: -15 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 100, rotateY: -15 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(245, 158, 11, 0.2)"
              }}
              onMouseEnter={() => setHoveredSystem(system.id)}
              onMouseLeave={() => setHoveredSystem(null)}
              className="relative group"
            >
              <div className={clsx(
                "bg-gradient-to-br from-black/95 to-[#1E3A8A]/30 border-2 rounded-3xl p-4 sm:p-6 md:p-8 text-center h-full backdrop-blur-xl transform-gpu perspective-1000 transition-all duration-500 hover:shadow-2xl",
                hoveredSystem === system.id ? "border-[#F59E0B]/80 scale-105" : "border-white/20"
              )}>
                {/* Animated background glow */}
                <AnimatePresence>
                  {hoveredSystem === system.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className={`absolute inset-0 bg-gradient-to-r ${system.color} opacity-5 rounded-3xl blur-xl`}
                    />
                  )}
                </AnimatePresence>

                {/* Icon with enterprise styling */}
                <motion.div
                  animate={hoveredSystem === system.id ? { 
                    scale: 1.2,
                    rotateY: 10
                  } : { scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 flex justify-center mb-4 sm:mb-6"
                >
                  <div className="p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-black/80 to-[#1E3A8A]/60 border border-[#F59E0B]/30 shadow-2xl">
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#F59E0B]" />
                  </div>
                </motion.div>

                {/* Title with enterprise typography */}
                <motion.h3
                  animate={hoveredSystem === system.id ? { 
                    scale: 1.05,
                    color: "#F59E0B"
                  } : { scale: 1 }}
                  className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-white mb-2 tracking-wide sm:tracking-wider drop-shadow-xl relative z-10"
                >
                  {system.title}
                </motion.h3>

                {/* Subtitle with professional styling */}
                <div className="text-[#F59E0B]/80 font-bold uppercase tracking-wide sm:tracking-widest mb-3 sm:mb-4 text-sm sm:text-base md:text-lg relative z-10">
                  {system.subtitle}
                </div>

                {/* Animated divider */}
                <motion.div 
                  animate={hoveredSystem === system.id ? { width: "100%" } : { width: "50%" }}
                  className="h-1 bg-gradient-to-r from-[#F59E0B]/40 to-[#F97316]/40 mx-auto rounded-full mb-6 transition-all duration-300"
                />

                {/* Description */}
                <p className="text-white/80 text-lg font-medium leading-relaxed relative z-10 mb-6">
                  {system.description}
                </p>

                {/* Professional stats display */}
                <div className="space-y-2 relative z-10">
                  {system.stats.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 1 + index * 0.2 + i * 0.1 }}
                      className="flex items-center gap-2 text-white/70 text-sm font-medium"
                    >
                      <Star className="w-4 h-4 text-[#F59E0B]" />
                      {stat}
                    </motion.div>
                  ))}
                </div>

                {/* Hover effect overlay */}
                <div className={`absolute inset-0 rounded-3xl pointer-events-none transition-all duration-500 bg-gradient-to-t ${system.color} opacity-0 group-hover:opacity-3`} />
              </div>
            </motion.div>
          );
        })}
        </div>
      </div>
    </section>
  );
}

function DigitalImmortalitySection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  const preservationFeatures = [
    {
      title: "VIDEO DOMINATION ENGINE",
      description: "Every moment becomes ESPN-grade highlights with AI-generated voiceover and cinematic effects",
      icon: Play,
      features: ["Auto-Generated Highlights", "AI Voiceover", "Cinematic Effects", "Weekly Reels"]
    },
    {
      title: "IMMORTAL ARCHIVE",
      description: "Every achievement, article, photo, video, and moment preserved forever with AI curation",
      icon: Activity,
      features: ["Complete Preservation", "AI Curation", "Instant Retrieval", "Blockchain Verified"]
    },
    {
      title: "FAMILY LEGACY",
      description: "Multi-generational connections from grandparents to grandchildren, all linked together",
      icon: Users,
      features: ["Family Tree", "Generational Stories", "Shared Achievements", "Legacy Connections"]
    }
  ];

  return (
    <section ref={ref} className="w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ 
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, #F59E0B 2px, transparent 2px), radial-gradient(circle at 75% 75%, #3B82F6 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Sparkles className="w-12 h-12 text-[#F59E0B]" />
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-white tracking-tight drop-shadow-xl">
              DIGITAL IMMORTALITY
            </h2>
            <Sparkles className="w-12 h-12 text-[#F59E0B]" />
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-[#F59E0B] to-[#F97316] mx-auto rounded-full mb-8" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/90 font-bold max-w-5xl mx-auto leading-relaxed"
          >
            <span className="text-[#F59E0B]">Every moment is preserved forever.</span> From your first game to your grandchild&apos;s championship, 
            UltraPreps creates a lifebook that spans generations with AI-powered curation and storytelling.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {preservationFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 100 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-gradient-to-br from-black/90 to-[#1E3A8A]/30 border border-[#F59E0B]/30 rounded-3xl p-8 backdrop-blur-xl text-center group hover:border-[#F59E0B]/60 transition-all duration-500"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 border border-[#F59E0B]/40">
                    <IconComponent className="w-12 h-12 text-[#F59E0B]" />
                  </div>
                </div>
                <h3 className="text-2xl font-black uppercase text-white mb-4 tracking-wider">
                  {feature.title}
                </h3>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  {feature.description}
                </p>
                <div className="space-y-2">
                  {feature.features.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-white/70">
                      <Star className="w-4 h-4 text-[#F59E0B]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Central Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-center bg-gradient-to-r from-black/80 to-[#1E3A8A]/40 border-2 border-[#F59E0B]/40 rounded-3xl p-12 backdrop-blur-xl"
        >
          <h3 className="text-3xl md:text-4xl font-black uppercase text-white mb-6 tracking-wider">
            <span className="text-[#F59E0B]">YOUR LEGACY</span> LIVES FOREVER
          </h3>
          <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            From a 6-year-old&apos;s first soccer game to an 80-year-old grandparent cheering from the stands, 
            every achievement, every moment, every connection is preserved forever in an AI-curated digital legacy 
            that grows richer with each generation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function DemoSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeDemo, setActiveDemo] = useState(0);

  const demos = [
    {
      title: "Student Universe",
      description: "Experience a student's complete digital stadium with AI tutoring, HYPE economy, content creation, and college prep tools",
      preview: "/herocard-1.png",
      action: "Explore Student Dashboard",
      href: "/dashboard",
      color: "from-[#F59E0B] to-[#F97316]",
      features: ["AI Tutoring", "HYPE Economy", "College Prep", "Social Features"]
    },
    {
      title: "Teacher Command Center",
      description: "Comprehensive classroom management with AI-powered lesson plans, student analytics, and automated grading systems",
      preview: "/herocard-2.png",
      action: "See Teacher Dashboard",
      href: "/teacher-dashboard",
      color: "from-[#3B82F6] to-[#1E3A8A]",
      features: ["Lesson Planning", "Student Analytics", "Grade Management", "AI Resources"]
    },
    {
      title: "Coach Championship Suite",
      description: "Team management, player development tracking, performance analytics, and recruitment tools for winning programs",
      preview: "/herocard-3.png",
      action: "View Coach Dashboard",
      href: "/coach-dashboard",
      color: "from-[#059669] to-[#10B981]",
      features: ["Team Management", "Performance Tracking", "Recruitment", "Analytics"]
    },
    {
      title: "Parent Partnership Portal",
      description: "Complete oversight of your child's academic and athletic progress with real-time updates and communication tools",
      preview: "/herocard-4.png",
      action: "Experience Parent Dashboard",
      href: "/parent-dashboard",
      color: "from-[#DC2626] to-[#EF4444]",
      features: ["Progress Monitoring", "Communication", "Academic Support", "Schedule Management"]
    },
    {
      title: "Recruiting Intelligence Hub",
      description: "Advanced talent discovery platform with AI-powered scouting, comprehensive player analytics, and recruitment pipelines",
      preview: "/herocard-5.png",
      action: "Explore Recruiting Dashboard",
      href: "/recruiting",
      color: "from-[#7C3AED] to-[#5B21B6]",
      features: ["Talent Discovery", "AI Scouting", "Analytics", "Pipeline Management"]
    },
    {
      title: "Community & Social Feed",
      description: "Dynamic social ecosystem with real-time activity feeds, community events, school rivalries, and viral content creation",
      preview: "/herocard-6.png",
      action: "Join Community Feed",
      href: "/feed",
      color: "from-[#EC4899] to-[#BE185D]",
      features: ["Activity Feed", "Community Events", "School Rivalries", "Content Sharing"]
    }
  ];

  return (
    <section ref={ref} className="w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
        className="text-center mb-20"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <Play className="w-12 h-12 text-[#F59E0B]" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase text-white tracking-tight drop-shadow-xl">
            EXPERIENCE THE PLATFORM
          </h2>
          <Play className="w-12 h-12 text-[#F59E0B]" />
        </div>
        <div className="w-32 h-1 bg-gradient-to-r from-[#F59E0B]/60 to-[#F97316]/60 mx-auto rounded-full" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-0">
        {/* Demo Navigation Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-8 sm:mb-12 lg:mb-16"
        >
          {demos.map((demo, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveDemo(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={clsx(
                "px-2 py-2 sm:px-3 sm:py-2 md:px-4 md:py-3 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 border-2",
                activeDemo === index 
                  ? "bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black border-[#F59E0B] shadow-lg" 
                  : "bg-black/40 backdrop-blur-sm text-white border-white/20 hover:border-[#F59E0B] hover:text-[#F59E0B]"
              )}
            >
              {demo.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Active Demo Display */}
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-black/90 to-[#1E3A8A]/30 border-2 border-[#F59E0B]/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 backdrop-blur-xl shadow-2xl"
        >
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Demo Content */}
            <div className="text-center lg:text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase text-white mb-4 sm:mb-6 tracking-wider">
                {demos[activeDemo].title}
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-white/80 mb-6 sm:mb-8 leading-relaxed">
                {demos[activeDemo].description}
              </p>
              <motion.a
                href={demos[activeDemo].href}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(245, 158, 11, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-gradient-to-r ${demos[activeDemo].color} text-black font-black rounded-full text-sm sm:text-base lg:text-lg uppercase shadow-xl transition-all duration-300 border-2 border-[#F59E0B]`}
              >
                <Rocket className="w-5 h-5" />
                {demos[activeDemo].action}
              </motion.a>
            </div>

            {/* Demo Preview */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02, rotateY: 2 }}
                className="relative rounded-2xl overflow-hidden border-2 border-[#F59E0B]/40 shadow-2xl bg-black/50 backdrop-blur"
              >
                <div className="aspect-video bg-gradient-to-br from-[#1E3A8A] to-black flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-12 sm:w-16 lg:w-20 h-12 sm:h-16 lg:h-20 text-[#F59E0B] mx-auto mb-2 sm:mb-4" />
                    <div className="text-white font-bold text-base sm:text-lg lg:text-xl">Interactive Demo</div>
                    <div className="text-white/60 text-sm sm:text-base">Click to Experience</div>
                  </div>
            </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-[#F59E0B]/10" />
              </motion.div>
            </div>
        </div>
        </motion.div>
      </div>
    </section>
  );
}

function VisionSection() {
  return (
    <section className="w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Target className="w-12 h-12 text-[#F59E0B]" />
            <h2 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tight drop-shadow-xl">
              THE VISION
            </h2>
            <Target className="w-12 h-12 text-[#F59E0B]" />
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-[#F59E0B] to-[#F97316] mx-auto rounded-full mb-8" />
        </div>
        
        <div className="text-center mb-12">
          <p className="text-xl md:text-2xl text-white/80 font-bold uppercase mb-8 max-w-4xl mx-auto leading-relaxed">
            UltraPreps is building the world&apos;s first AI-powered, pro-grade digital stadium where every student, every achievement, every talent, and every family belongs.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <ul className="text-lg text-white/70 font-medium space-y-4 text-left">
            <li>• Every student deserves greatness—cinematic HeroCards for all, not just the stars</li>
            <li>• Stadium Spaces: Digital arenas for every school, event, and community</li>
            <li>• Live HYPE Meter, Pep Rally Streams, and real-time fan/family engagement</li>
            <li>• AI-powered showcasing, achievement highlights, and digital legacy tools for every student</li>
            <li>• Family-first privacy, 101 AI safety bots, and verified digital identity</li>
            <li>• Built for Friday Night Lights, Saturday College Dreams, and every journey in between</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// Deterministic particle positions for SSR compatibility
const PARTICLE_POSITIONS = Array.from({ length: 60 }, (_, i) => {
  const seed = i * 1234567; // Use index as seed for deterministic randomness
  const random1 = (seed % 97) / 97; // Pseudo-random 0-1
  const random2 = ((seed * 7) % 89) / 89;
  const random3 = ((seed * 13) % 83) / 83;
  const random4 = ((seed * 19) % 79) / 79;
  const random5 = ((seed * 23) % 73) / 73;
  const random6 = ((seed * 29) % 71) / 71;
  
  return {
    left: random1 * 100,
    top: random2 * 100,
    width: 2 + random3 * 3,
    height: 2 + random4 * 3,
    color: ["#F59E0B", "#3B82F6", "#FFFFFF", "#F97316"][i % 4],
    opacity: 0.2 + random5 * 0.15,
    boxShadowSize: 4 + random6 * 8,
    animationDelay: random1 * 10,
    animationDuration: 12 + random2 * 10,
    yDistance: -60 - random3 * 40,
    xDistance: (random4 - 0.5) * 40
  };
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function AIParticles() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render particles until after hydration
  if (!isMounted) {
    return <div className="absolute inset-0 pointer-events-none" />;
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      {PARTICLE_POSITIONS.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.width}px`,
            height: `${particle.height}px`,
            background: particle.color,
            opacity: particle.opacity,
            filter: 'blur(0.5px)',
            boxShadow: `0 0 ${particle.boxShadowSize}px currentColor`
          }}
          animate={{ 
            y: [0, particle.yDistance, 0],
            x: [0, particle.xDistance, 0],
            opacity: [particle.opacity, particle.opacity + 0.2, particle.opacity]
          }}
          transition={{ 
            duration: particle.animationDuration, 
            repeat: Infinity, 
            delay: particle.animationDelay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}



function CallToAction() {
  return (
    <section className="relative z-20 py-16 sm:py-20 md:py-24 px-4 sm:px-6 border-t border-[#F59E0B]/30 text-center overflow-hidden">
      {/* Dynamic background effects */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full"
          style={{ filter: 'blur(100px)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-r from-[#3B82F6] to-[#1E3A8A] rounded-full"
          style={{ filter: 'blur(80px)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

              <div className="relative z-10 max-w-4xl mx-auto">
        {/* Explosive headline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-white mb-6 tracking-tight drop-shadow-2xl">
            <span className="block text-[#F59E0B]">READY TO</span>
            <span className="block">BUILD YOUR LEGACY?</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-[#F59E0B] to-[#F97316] mx-auto rounded-full mb-6" />
        </motion.div>

        {/* Compelling description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          Experience the future of student achievement showcase. 
          <span className="text-[#F59E0B] font-bold"> Join thousands of students, educators, and families</span> who are building their digital legacy right now.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          {/* Primary CTA - Create Stadium */}
          <motion.a
            href="/stadium/create"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(245, 158, 11, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black font-black rounded-full text-xl uppercase shadow-2xl hover:from-[#F97316] hover:to-[#F59E0B] transition-all duration-300 border-2 border-[#F59E0B] group"
          >
            <Rocket className="w-6 h-6 group-hover:animate-pulse" />
            Create Your Stadium
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2"
            >
              →
            </motion.div>
          </motion.a>

          {/* Secondary CTA - Explore Platform */}
          <motion.a
            href="/dashboard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-bold rounded-full text-lg uppercase border-2 border-white/30 hover:border-[#F59E0B] hover:text-[#F59E0B] transition-all duration-300 backdrop-blur-sm"
          >
            <Building2 className="w-5 h-5" />
            Explore Platform
          </motion.a>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-12 text-white/60 text-sm uppercase tracking-widest"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Star className="w-4 h-4 text-[#F59E0B]" />
            <span>Trusted by 500+ Schools</span>
            <Star className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <div>Free to Start • Create Your Stadium in Minutes</div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomePage() {
  // Register service worker for PWA functionality
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('🏈 UltraPreps SW registered:', registration);
        })
        .catch((error) => {
          console.log('❌ SW registration failed:', error);
        });
    }
  }, []);

  // Simple mobile viewport height for CSS custom properties only
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', () => {
      setTimeout(setViewportHeight, 100);
    });
    
    return () => {
      window.removeEventListener('resize', setViewportHeight);
      window.removeEventListener('orientationchange', setViewportHeight);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      {/* DRAMATIC DARK STADIUM BACKGROUND - NIKE STYLE */}
      <div className="absolute inset-0 z-0">
        {/* REFINED STADIUM BACKGROUND - LAYOUT OPTIMIZED */}
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
        
        {/* Enhanced dark overlay for content readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
        
        {/* Subtle texture layer */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <MegaNavigation currentPage="home" userRole="guest" userName="Guest User" />
      <div className="pt-16 sm:pt-18 md:pt-20">
        <HeroSection />
        <StudentSpotlightGallery />
        <UltraAISystemsSection />
        <DigitalImmortalitySection />
        <DemoSection />
        <PepRallySection />
        <VisionSection />
        <CallToAction />
        <Footer />
      </div>
    </main>
  );
}