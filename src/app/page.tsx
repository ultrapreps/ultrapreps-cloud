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

function Navbar() {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Enhanced scroll detection for mobile
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl shadow-2xl transition-all duration-300 ${
        isScrolled || isMobileMenuOpen 
          ? 'bg-black/98 border-b border-[#F59E0B]/80' 
          : 'bg-black/95 border-b border-[#F59E0B]/60'
      }`}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-2">
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2"
        >
          <Crown className="w-6 h-6 sm:w-7 sm:h-7 text-[#F59E0B]" />
          <span className="text-xl sm:text-2xl font-black uppercase tracking-wide sm:tracking-widest text-white drop-shadow-xl">
            UltraPreps
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4 text-sm xl:text-base font-bold uppercase text-white/90">
          {[
            { name: "Features", icon: Sparkles },
            { name: "Vision", icon: Target },
            { name: "About", icon: Users }
          ].map((item, i) => {
            const IconComponent = item.icon;
            return (
              <motion.a 
                key={item.name}
                href={`#${item.name.toLowerCase()}`}
                onMouseEnter={() => setIsHovered(item.name)}
                onMouseLeave={() => setIsHovered(null)}
                whileHover={{ scale: 1.08, color: "#F59E0B" }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-1 hover:text-[#F59E0B] transition-all duration-300 tracking-wide xl:tracking-widest group"
              >
                <IconComponent className={clsx(
                  "w-4 h-4 xl:w-5 xl:h-5 transition-all duration-300",
                  isHovered === item.name ? "text-[#F59E0B] scale-110" : "text-white/70"
                )} />
                {item.name}
              </motion.a>
            );
          })}
          <motion.a 
            href="#join"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px #F59E0B" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
            className="flex items-center gap-2 bg-gradient-to-r from-[#222] to-[#1E3A8A] text-[#F59E0B] px-4 xl:px-5 py-2 rounded-full font-black border border-[#F59E0B]/60 hover:from-[#F59E0B]/10 hover:to-[#F97316]/10 hover:text-[#F59E0B] shadow transition-all duration-300 tracking-wide xl:tracking-widest text-sm xl:text-base"
          >
            <Rocket className="w-4 h-4 xl:w-5 xl:h-5" />
            <span className="hidden xl:inline">JOIN THE STADIUM</span>
            <span className="xl:hidden">JOIN</span>
          </motion.a>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden flex flex-col items-center justify-center w-8 h-8 gap-1"
        >
          <motion.div 
            animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? 6 : 0 }}
            className="w-6 h-0.5 bg-white"
          />
          <motion.div 
            animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
            className="w-6 h-0.5 bg-white"
          />
          <motion.div 
            animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? -6 : 0 }}
            className="w-6 h-0.5 bg-white"
          />
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/98 border-t border-[#F59E0B]/30 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4">
              {[
                { name: "Features", icon: Sparkles },
                { name: "Vision", icon: Target },
                { name: "About", icon: Users }
              ].map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <motion.a 
                    key={item.name}
                    href={`#${item.name.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 text-white/90 hover:text-[#F59E0B] transition-all duration-300 font-bold uppercase tracking-wide py-2"
                  >
                    <IconComponent className="w-5 h-5" />
                    {item.name}
                  </motion.a>
                );
              })}
              <motion.a 
                href="#join"
                onClick={() => setIsMobileMenuOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black px-6 py-3 rounded-full font-black border-2 border-white/20 shadow-lg transition-all duration-300 tracking-wide uppercase mt-4"
              >
                <Rocket className="w-5 h-5" />
                JOIN THE STADIUM
              </motion.a>
    </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

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
            { name: "Twitter", href: "#" },
            { name: "Instagram", href: "#" },
            { name: "Contact", href: "#" },
            { name: "Privacy", href: "#" }
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
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black uppercase tracking-tight leading-none mb-4 sm:mb-6 text-center text-white"
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
          className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold uppercase tracking-wide text-[#F59E0B] drop-shadow-2xl"
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
    { id: 1, src: "/herocard-1.png" },
    { id: 2, src: "/herocard-2.png" },
    { id: 3, src: "/herocard-3.png" },
    { id: 4, src: "/herocard-4.png" },
    { id: 5, src: "/herocard-5.png" },
    { id: 6, src: "/herocard-6.png" },
    { id: 7, src: "/herocard-7.png" }
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

function FeaturesSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const features = [
    {
      id: "herocards",
      title: "HEROCARDS",
      subtitle: "Pro-Grade Digital Identity",
              description: "Professional student profiles showcasing achievements, talents, and digital legacy",
      icon: Trophy,
      color: "from-[#1E3A8A] to-[#3B82F6]",
      stats: ["10M+ Cards Created", "Pro Sports Quality", "AI-Powered Analytics"]
    },
    {
      id: "stadium",
      title: "STADIUM SPACES",
      subtitle: "Digital Arenas",
      description: "Virtual stadiums for schools, events, and community engagement",
      icon: Building2,
      color: "from-[#111827] to-[#1E3A8A]",
      stats: ["500+ Schools", "Live Streaming", "Fan Engagement Hub"]
    },
    {
      id: "hype",
      title: "HYPE & NIL",
      subtitle: "Recognition Engine",
              description: "Live community engagement, achievement recognition, and opportunity discovery",
      icon: Zap,
      color: "from-[#1E3A8A] to-[#111827]",
      stats: ["Real-time HYPE", "NIL Marketplace", "Brand Partnerships"]
    }
  ];

  return (
    <section ref={ref} id="features" className="w-full py-16 sm:py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
        className="text-center mb-12 sm:mb-16 md:mb-20"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#F59E0B]" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase text-white tracking-tight drop-shadow-xl text-center">
            GAME-CHANGING FEATURES
          </h2>
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#F59E0B]" />
        </div>
        <div className="w-24 sm:w-28 md:w-32 h-1 bg-gradient-to-r from-[#F59E0B]/60 to-[#F97316]/60 mx-auto rounded-full" />
      </motion.div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 100, rotateY: -15 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : { opacity: 0, y: 100, rotateY: -15 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{ 
                scale: 1.05, 
                rotateY: 5,
                boxShadow: "0 25px 50px rgba(245, 158, 11, 0.2)"
              }}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="relative group"
            >
              <div className={clsx(
                "bg-gradient-to-br from-black/95 to-[#1E3A8A]/30 border-2 rounded-3xl p-4 sm:p-6 md:p-8 text-center h-full backdrop-blur-xl transform-gpu perspective-1000 transition-all duration-500 hover:shadow-2xl",
                hoveredFeature === feature.id ? "border-[#F59E0B]/80 scale-105" : "border-white/20"
              )}>
                {/* Animated background glow */}
                <AnimatePresence>
                  {hoveredFeature === feature.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-5 rounded-3xl blur-xl`}
                    />
                  )}
                </AnimatePresence>

                {/* Icon with enterprise styling */}
                <motion.div
                  animate={hoveredFeature === feature.id ? { 
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
                  animate={hoveredFeature === feature.id ? { 
                    scale: 1.05,
                    color: "#F59E0B"
                  } : { scale: 1 }}
                  className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-white mb-2 tracking-wide sm:tracking-wider drop-shadow-xl relative z-10"
                >
                  {feature.title}
                </motion.h3>

                {/* Subtitle with professional styling */}
                <div className="text-[#F59E0B]/80 font-bold uppercase tracking-wide sm:tracking-widest mb-3 sm:mb-4 text-sm sm:text-base md:text-lg relative z-10">
                  {feature.subtitle}
                </div>

                {/* Animated divider */}
                <motion.div 
                  animate={hoveredFeature === feature.id ? { width: "100%" } : { width: "50%" }}
                  className="h-1 bg-gradient-to-r from-[#F59E0B]/40 to-[#F97316]/40 mx-auto rounded-full mb-6 transition-all duration-300"
                />

                {/* Description */}
                <p className="text-white/80 text-lg font-medium leading-relaxed relative z-10 mb-6">
                  {feature.description}
                </p>

                {/* Professional stats display */}
                <div className="space-y-2 relative z-10">
                  {feature.stats.map((stat, i) => (
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
                <div className={`absolute inset-0 rounded-3xl pointer-events-none transition-all duration-500 bg-gradient-to-t ${feature.color} opacity-0 group-hover:opacity-3`} />
              </div>
            </motion.div>
          );
        })}
        </div>
      </div>
    </section>
  );
}

function DemoSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeDemo, setActiveDemo] = useState(0);

  const demos = [
    {
      title: "HeroCard Generator",
      description: "Watch your profile transform into a cinematic HeroCard",
      preview: "/gage-coleman-herocard.png",
      action: "Try Demo",
      color: "from-[#F59E0B] to-[#F97316]"
    },
    {
      title: "Stadium Builder", 
      description: "Create your school's digital arena in seconds",
      preview: "/visual-dna/sample.png",
      action: "Build Stadium",
      color: "from-[#3B82F6] to-[#1E3A8A]"
    },
    {
      title: "Live HYPE Stream",
      description: "Experience real-time fan engagement",
      preview: "/gage-coleman-herocard.png", 
      action: "Join Stream",
      color: "from-[#F97316] to-[#F59E0B]"
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
          <h2 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tight drop-shadow-xl">
            EXPERIENCE THE PLATFORM
          </h2>
          <Play className="w-12 h-12 text-[#F59E0B]" />
        </div>
        <div className="w-32 h-1 bg-gradient-to-r from-[#F59E0B]/60 to-[#F97316]/60 mx-auto rounded-full" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-0">
        {/* Demo Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {demos.map((demo, index) => (
            <motion.button
              key={index}
              onClick={() => setActiveDemo(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={clsx(
                "px-8 py-4 rounded-full font-bold uppercase tracking-widest transition-all duration-300 border-2",
                activeDemo === index 
                  ? "bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black border-[#F59E0B]" 
                  : "bg-transparent text-white border-white/30 hover:border-[#F59E0B] hover:text-[#F59E0B]"
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
          className="bg-gradient-to-br from-black/90 to-[#1E3A8A]/30 border-2 border-[#F59E0B]/30 rounded-3xl p-8 backdrop-blur-xl shadow-2xl"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Demo Content */}
            <div className="text-center lg:text-left">
              <h3 className="text-4xl md:text-5xl font-black uppercase text-white mb-6 tracking-wider">
                {demos[activeDemo].title}
              </h3>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                {demos[activeDemo].description}
              </p>
              <motion.a
                href="#demo"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(245, 158, 11, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${demos[activeDemo].color} text-black font-black rounded-full text-lg uppercase shadow-xl transition-all duration-300 border-2 border-[#F59E0B]`}
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
                    <Play className="w-20 h-20 text-[#F59E0B] mx-auto mb-4" />
                    <div className="text-white font-bold text-xl">Interactive Demo</div>
                    <div className="text-white/60">Click to Experience</div>
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
            <span className="block">JOIN THE STADIUM?</span>
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
          Be the first to experience the future of high school sports. 
          <span className="text-[#F59E0B] font-bold"> Join thousands of students, educators, and families</span> who are already building their digital legacy.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          {/* Primary CTA */}
          <motion.a
            href="#join"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(245, 158, 11, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black font-black rounded-full text-xl uppercase shadow-2xl hover:from-[#F97316] hover:to-[#F59E0B] transition-all duration-300 border-2 border-[#F59E0B] group"
          >
            <Rocket className="w-6 h-6 group-hover:animate-pulse" />
            Get Early Access
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2"
            >
              →
            </motion.div>
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="#features"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white font-bold rounded-full text-lg uppercase border-2 border-white/30 hover:border-[#F59E0B] hover:text-[#F59E0B] transition-all duration-300 backdrop-blur-sm"
          >
            <Play className="w-5 h-5" />
            Watch Demo
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
          <div>No Credit Card Required • Free Early Access</div>
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

      <Navbar />
      <div className="pt-16 sm:pt-18 md:pt-20">
        <HeroSection />
        <StudentSpotlightGallery />
        <FeaturesSection />
        <DemoSection />
        <PepRallySection />
        <VisionSection />
        <CallToAction />
        <Footer />
      </div>
    </main>
  );
}