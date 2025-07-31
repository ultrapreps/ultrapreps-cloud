"use client";
import React, { useState, useEffect } from "react";
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
  Flame
} from "lucide-react";
import { useInView } from "react-intersection-observer";

// import { Progress } from "@radix-ui/react-progress";
import clsx from "clsx";

function Navbar() {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full bg-black/95 border-b border-[#F59E0B]/60 z-50 flex items-center justify-between px-6 py-2 backdrop-blur-xl shadow-2xl"
    >
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="flex items-center gap-2"
      >
        <Crown className="w-7 h-7 text-[#F59E0B]" />
        <span className="text-2xl font-black uppercase tracking-widest text-white drop-shadow-xl">
          UltraPreps
        </span>
      </motion.div>

      <div className="flex items-center gap-4 text-base font-bold uppercase text-white/90">
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
              className="flex items-center gap-1 hover:text-[#F59E0B] transition-all duration-300 tracking-widest group"
            >
              <IconComponent className={clsx(
                "w-5 h-5 transition-all duration-300",
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
          className="flex items-center gap-2 bg-gradient-to-r from-[#222] to-[#1E3A8A] text-[#F59E0B] px-5 py-2 rounded-full font-black border border-[#F59E0B]/60 hover:from-[#F59E0B]/10 hover:to-[#F97316]/10 hover:text-[#F59E0B] shadow transition-all duration-300 tracking-widest"
        >
          <Rocket className="w-5 h-5" />
          JOIN THE STADIUM
        </motion.a>
      </div>
    </motion.nav>
  );
}

function Footer() {
  return (
    <footer className="w-full py-16 bg-gradient-to-t from-black via-[#1E3A8A]/20 to-black border-t-2 border-[#F59E0B]/40 text-center relative z-20">
      {/* Footer background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F59E0B]/5 to-transparent" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4">
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
            Built for Every Athlete, Every Fan, Every Family
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-[#F59E0B] to-[#F97316] mx-auto rounded-full" />
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex justify-center gap-8 mb-8"
        >
          {[
            { name: "Twitter", href: "#" },
            { name: "Instagram", href: "#" },
            { name: "Contact", href: "#" },
            { name: "Privacy", href: "#" }
          ].map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              whileHover={{ scale: 1.1, color: "#F59E0B" }}
              className="text-white/70 font-bold uppercase tracking-widest hover:text-[#F59E0B] transition-all duration-300 border-b border-transparent hover:border-[#F59E0B]"
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
            UltraPreps &copy; {new Date().getFullYear()} &mdash; Every Student Deserves a Stage
          </div>
          <div className="flex items-center justify-center gap-2">
            <Star className="w-4 h-4 text-[#F59E0B]" />
            <span>Friday Night Lights in Your Pocket</span>
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
    <section ref={ref} className="w-full py-32 px-4 relative overflow-hidden" id="pep-rally">
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

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16">
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
    <div className="relative min-h-screen flex flex-col justify-center items-center px-4 py-12 overflow-hidden">
      {/* Explosive Campaign Headlines */}
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-center mb-12 z-20 relative"
      >
        {/* Floating School Colors Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[
            { color: "#DC2626", delay: 0, x: "10%", y: "20%" }, // Red (Stanford, Alabama, etc)
            { color: "#7C3AED", delay: 1, x: "80%", y: "30%" }, // Purple (LSU, Northwestern, etc)
            { color: "#059669", delay: 2, x: "20%", y: "70%" }, // Green (Oregon, Michigan State, etc)
            { color: "#0EA5E9", delay: 3, x: "90%", y: "80%" }, // Blue (Duke, Kentucky, etc)
            { color: "#F59E0B", delay: 4, x: "60%", y: "10%" }, // Gold (Notre Dame, Cal, etc)
            { color: "#EF4444", delay: 5, x: "30%", y: "90%" }  // Bright Red (Ohio State, etc)
          ].map((particle, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full opacity-60"
              style={{ 
                backgroundColor: particle.color,
                left: particle.x,
                top: particle.y,
                boxShadow: `0 0 20px ${particle.color}`
              }}
              animate={{
                y: [0, -30, 0],
                scale: [1, 1.5, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        <motion.h1 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1.2 }}
          className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-none mb-6 text-center"
          style={{ 
            textShadow: "0 0 60px #F59E0B, 0 0 120px #3B82F6, 0 15px 30px rgba(0,0,0,0.9)",
            background: "linear-gradient(135deg, #FFFFFF 0%, #F59E0B 15%, #DC2626 25%, #7C3AED 35%, #059669 45%, #0EA5E9 55%, #F59E0B 65%, #EF4444 75%, #8B5CF6 85%, #FFFFFF 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            backgroundSize: "300% 300%",
            animation: "collegiateGlow 8s ease-in-out infinite"
          }}
        >
          EVERY STUDENT<br/>DESERVES A STAGE
        </motion.h1>
        <motion.h2 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-wide text-[#F59E0B] drop-shadow-2xl"
        >
          Friday Night Lights in Your Pocket
        </motion.h2>

        {/* Floating College Logos Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="relative mt-12 overflow-hidden"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-24" />
            <span className="px-6 text-white/70 text-sm uppercase tracking-wider font-medium">
              Your Bridge to Elite Universities
            </span>
            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-24" />
          </div>
          
          <div className="relative h-24 overflow-hidden">
            <motion.div
              className="flex items-center gap-12 absolute"
              animate={{ x: [0, -2400] }}
              transition={{
                duration: 60,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ width: "4800px" }}
            >
              {[
                // Ivy League Elite - Authentic Colors
                { name: "Harvard University", colors: "#A51C30", logo: "HARVARD", accent: "#FFF" },
                { name: "Yale University", colors: "#00356B", logo: "YALE", accent: "#FFF" },
                { name: "Princeton University", colors: "#E77500", logo: "PRINCETON", accent: "#000" },
                { name: "Columbia University", colors: "#B9D9EB", logo: "COLUMBIA", accent: "#003C71" },
                { name: "University of Pennsylvania", colors: "#011F5B", logo: "PENN", accent: "#990000" },
                { name: "Dartmouth College", colors: "#00693E", logo: "DARTMOUTH", accent: "#FFF" },
                { name: "Brown University", colors: "#ED1C24", logo: "BROWN", accent: "#FFF" },
                { name: "Cornell University", colors: "#B31B1B", logo: "CORNELL", accent: "#FFF" },
                
                // Tech Powerhouses - Authentic Colors
                { name: "MIT", colors: "#8A8B8C", logo: "MIT", accent: "#A31F34" },
                { name: "Stanford University", colors: "#8C1515", logo: "STANFORD", accent: "#FFF" },
                { name: "Caltech", colors: "#FF6C0C", logo: "CALTECH", accent: "#FFF" },
                { name: "Carnegie Mellon", colors: "#C41E3A", logo: "CMU", accent: "#FFF" },
                
                // UC System - Authentic Colors
                { name: "UC Berkeley", colors: "#003262", logo: "UC BERKELEY", accent: "#FDB515" },
                { name: "UCLA", colors: "#2774AE", logo: "UCLA", accent: "#FFD100" },
                { name: "UC San Diego", colors: "#182B49", logo: "UC SAN DIEGO", accent: "#C69214" },
                
                // Sports Dynasties - Authentic Colors
                { name: "Duke University", colors: "#012169", logo: "DUKE", accent: "#FFF" },
                { name: "University of North Carolina", colors: "#7BAFD4", logo: "UNC", accent: "#13294B" },
                { name: "University of Kentucky", colors: "#0033A0", logo: "UK", accent: "#FFF" },
                { name: "University of Kansas", colors: "#0051BA", logo: "KANSAS", accent: "#E8000D" },
                { name: "Notre Dame", colors: "#0C2340", logo: "NOTRE DAME", accent: "#AE9142" },
                
                // State Flagships - Authentic Colors
                { name: "University of Michigan", colors: "#00274C", logo: "MICHIGAN", accent: "#FFCB05" },
                { name: "University of Texas", colors: "#BF5700", logo: "TEXAS", accent: "#FFF" },
                { name: "Ohio State University", colors: "#BB0000", logo: "OHIO STATE", accent: "#C5C5C5" },
                { name: "University of Florida", colors: "#0021A5", logo: "FLORIDA", accent: "#FA4616" },
                
                // Repeat first few for seamless loop
                { name: "Harvard University", colors: "#A51C30", logo: "HARVARD", accent: "#FFF" },
                { name: "Yale University", colors: "#00356B", logo: "YALE", accent: "#FFF" },
                { name: "Stanford University", colors: "#8C1515", logo: "STANFORD", accent: "#FFF" },
                { name: "MIT", colors: "#8A8B8C", logo: "MIT", accent: "#A31F34" }
              ].map((college, index) => (
                <motion.div
                  key={`${college.name}-${index}`}
                  className="flex-shrink-0 relative group cursor-pointer"
                  whileHover={{ scale: 1.3, zIndex: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* College Logo Badge */}
                  <div 
                    className="w-20 h-20 rounded-xl flex items-center justify-center font-bold text-xs border-2 border-white/30 shadow-xl group-hover:border-[#F59E0B] transition-all duration-300 backdrop-blur-sm overflow-hidden relative"
                    style={{ 
                      backgroundColor: college.colors,
                      boxShadow: `0 6px 25px ${college.colors}60, 0 0 50px ${college.colors}30`,
                      color: college.accent
                    }}
                  >
                    {/* University Name */}
                    <div className="text-center leading-tight tracking-tight font-black uppercase">
                      {college.logo}
                    </div>
                    
                    {/* Subtle pattern overlay */}
                    <div 
                      className="absolute inset-0 opacity-10"
                      style={{
                        background: `radial-gradient(circle at 30% 30%, ${college.accent}40 0%, transparent 50%)`
                      }}
                    />
                  </div>
                  
                  {/* Hover Popup */}
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    whileHover={{ opacity: 1, y: -5, scale: 1 }}
                    className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border border-[#F59E0B]/40 backdrop-blur-xl shadow-xl whitespace-nowrap"
                  >
                    {college.name}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90" />
                  </motion.div>

                  {/* Center Highlight Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${college.colors}40 0%, transparent 70%)`,
                      filter: 'blur(10px)'
                    }}
                    animate={{
                      opacity: [0, 0.6, 0],
                      scale: [1, 1.4, 1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Gradient Overlays for Seamless Effect */}
            <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="text-center text-white/50 text-xs uppercase tracking-wider mt-6 font-medium"
          >
            Connecting Athletic Excellence to Academic Achievement
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Founder HeroCard - Massive Impact */}
      <motion.div 
        initial={{ y: 200, opacity: 0, rotateY: -15 }}
        animate={{ y: 0, opacity: 1, rotateY: 0 }}
        transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
        whileHover={{ scale: 1.05, rotateY: 5, z: 100 }}
        className="relative group z-20 flex flex-col items-center justify-center w-full"
      >
        {/* Meet the Founder label with glow */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.8, type: "spring", bounce: 0.4 }}
          className="mb-8 text-center"
        >
          <span className="inline-block bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black font-black text-xl uppercase tracking-widest px-8 py-4 rounded-full shadow-2xl border-4 border-white transform hover:scale-110 transition-all duration-300"
                style={{ boxShadow: "0 0 40px #F59E0B, 0 20px 40px rgba(0,0,0,0.5)" }}>
            MEET THE FOUNDER
          </span>
        </motion.div>

        {/* HeroCard with extreme effects */}
        <div className="relative w-full max-w-[400px] md:max-w-[500px] lg:max-w-[700px] aspect-[3/4] mx-auto flex items-center justify-center transform-gpu perspective-1000">
          <motion.div
            whileHover={{ rotateX: 2, rotateY: 2 }}
            className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-[#F59E0B] shadow-2xl"
            style={{ 
              boxShadow: "0 0 60px #F59E0B, 0 30px 60px rgba(0,0,0,0.7), inset 0 0 40px rgba(245,158,11,0.2)" 
            }}
          >
            <Image
              src="/gage-coleman-herocard.png"
              alt="Gage Coleman Hero Card"
              fill
              className="object-cover w-full h-full"
              priority
            />
            {/* Dynamic lighting overlays */}
            <div className="absolute inset-0 pointer-events-none rounded-3xl" 
                 style={{
                   background: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, transparent 30%, rgba(255,255,255,0.1) 70%, rgba(245,158,11,0.2) 100%)', 
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
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 25%, rgba(245,158,11,0.3) 50%, rgba(255,255,255,0.1) 75%, transparent 100%)',
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
          className="mt-8 text-center max-w-3xl"
        >
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-4 tracking-wider drop-shadow-xl">GAGE COLEMAN</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <span className="text-xl text-[#F59E0B] font-black uppercase tracking-widest border-2 border-[#F59E0B] px-4 py-2 rounded-full">FOUNDER & WR #11</span>
            <span className="text-xl text-white font-bold uppercase tracking-widest">MARBLE FALLS MUSTANGS</span>
          </div>
          
          {/* Gage's inspiring quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.8, duration: 0.8 }}
            className="p-6 bg-black/60 border border-[#F59E0B]/30 rounded-2xl backdrop-blur-sm"
          >
            <blockquote className="text-xl md:text-2xl text-white font-bold italic leading-relaxed mb-3">
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

function FeaturesSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  const features = [
    {
      id: "herocards",
      title: "HEROCARDS",
      subtitle: "Pro-Grade Digital Identity",
      description: "Professional athlete profiles with stats, highlights, and digital legacy tools",
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
      description: "Live fan engagement, NIL opportunities, and athlete recognition",
      icon: Zap,
      color: "from-[#1E3A8A] to-[#111827]",
      stats: ["Real-time HYPE", "NIL Marketplace", "Brand Partnerships"]
    }
  ];

  return (
    <section ref={ref} id="features" className="w-full py-32 px-4 relative overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 1 }}
        className="text-center mb-20"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <Sparkles className="w-12 h-12 text-[#F59E0B]" />
          <h2 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tight drop-shadow-xl">
            GAME-CHANGING FEATURES
          </h2>
          <Sparkles className="w-12 h-12 text-[#F59E0B]" />
        </div>
        <div className="w-32 h-1 bg-gradient-to-r from-[#F59E0B]/60 to-[#F97316]/60 mx-auto rounded-full" />
      </motion.div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
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
                "bg-gradient-to-br from-black/95 to-[#1E3A8A]/30 border-2 rounded-3xl p-8 text-center h-full backdrop-blur-xl transform-gpu perspective-1000 transition-all duration-500 hover:shadow-2xl",
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
                  className="relative z-10 flex justify-center mb-6"
                >
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-black/80 to-[#1E3A8A]/60 border border-[#F59E0B]/30 shadow-2xl">
                    <IconComponent className="w-12 h-12 text-[#F59E0B]" />
                  </div>
                </motion.div>

                {/* Title with enterprise typography */}
                <motion.h3
                  animate={hoveredFeature === feature.id ? { 
                    scale: 1.05,
                    color: "#F59E0B"
                  } : { scale: 1 }}
                  className="text-3xl font-black uppercase text-white mb-2 tracking-wider drop-shadow-xl relative z-10"
                >
                  {feature.title}
                </motion.h3>

                {/* Subtitle with professional styling */}
                <div className="text-[#F59E0B]/80 font-bold uppercase tracking-widest mb-4 text-lg relative z-10">
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
    <section ref={ref} className="w-full py-32 px-4 relative overflow-hidden bg-gradient-to-br from-black/95 via-[#1E3A8A]/20 to-black/95">
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

      <div className="max-w-7xl mx-auto">
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
    <section className="w-full max-w-4xl mx-auto py-20 px-4 text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold uppercase text-white mb-6 tracking-tight">The Vision</h2>
      <p className="text-xl md:text-2xl text-white/80 font-bold uppercase mb-8">UltraPreps is building the world’s first AI-powered, pro-grade digital stadium where every student, every athlete, every fan, and every family belongs.</p>
      <ul className="text-lg text-white/70 font-medium space-y-4 max-w-2xl mx-auto text-left">
        <li>• Every student deserves a stage—cinematic HeroCards for all, not just the stars</li>
        <li>• Stadium Spaces: Digital arenas for every school, event, and community</li>
        <li>• Live HYPE Meter, Pep Rally Streams, and real-time fan/family engagement</li>
        <li>• AI-powered recruiting, highlight reels, and digital legacy tools for every athlete</li>
        <li>• Family-first privacy, 101 AI safety bots, and verified digital identity</li>
        <li>• Built for Friday Night Lights, Saturday College Dreams, and every journey in between</li>
      </ul>
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

function StadiumBackground() {
  return (
    <div className="fixed inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Massive stadium gradient with Friday Night Lights atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0F1419] to-[#1E3A8A]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60" />
      
      {/* Stadium spotlights - more dramatic */}
      <motion.div
        className="absolute -top-32 left-1/4 w-[600px] h-[600px] opacity-25"
        style={{ 
          background: 'conic-gradient(from 180deg, transparent 0deg, #F59E0B 20deg, #FFFFFF 45deg, #F59E0B 70deg, transparent 90deg)', 
          filter: 'blur(80px)' 
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute -top-32 right-1/4 w-[500px] h-[500px] opacity-20"
        style={{ 
          background: 'conic-gradient(from 0deg, transparent 0deg, #3B82F6 25deg, #FFFFFF 50deg, #1E3A8A 75deg, transparent 100deg)', 
          filter: 'blur(70px)' 
        }}
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Center field floodlight */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-96 opacity-15"
        style={{ 
          background: 'radial-gradient(ellipse, #FFFFFF 0%, #F59E0B 30%, transparent 80%)', 
          filter: 'blur(60px)' 
        }}
        animate={{ 
          opacity: [0.15, 0.25, 0.15],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Dynamic lens flares */}
      <motion.div
        className="absolute left-1/2 top-1/3 w-3/4 h-40 rounded-full opacity-12"
        style={{ background: 'radial-gradient(circle, #FFFFFF 0%, #F59E0B 40%, transparent 80%)', filter: 'blur(40px)' }}
        animate={{ x: ['-30%', '30%', '-30%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* AI energy particles - deterministic for SSR */}
      <AIParticles />
      
      {/* Stadium field lines */}
      <div className="absolute bottom-0 left-0 w-full h-2/3 opacity-5">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-px bg-white" />
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-3/5 h-px bg-white" />
        <div className="absolute bottom-64 left-1/2 -translate-x-1/2 w-2/5 h-px bg-white" />
            </div>
      
      {/* Stadium floor shadow - more dramatic */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black via-black/70 to-transparent" />
      
      {/* Side stadium lights */}
      <motion.div
        className="absolute top-1/4 left-0 w-32 h-full opacity-8"
        style={{ background: 'linear-gradient(90deg, #F59E0B, transparent)', filter: 'blur(40px)' }}
        animate={{ opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/4 right-0 w-32 h-full opacity-8"
        style={{ background: 'linear-gradient(270deg, #3B82F6, transparent)', filter: 'blur(40px)' }}
        animate={{ opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      />
    </div>
  );
}

function CallToAction() {
  return (
    <section className="relative z-20 py-24 bg-gradient-to-br from-black via-[#1E3A8A]/40 to-black border-t border-[#F59E0B]/30 text-center overflow-hidden">
      {/* Dynamic background effects */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full"
          style={{ filter: 'blur(100px)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-r from-[#3B82F6] to-[#1E3A8A] rounded-full"
          style={{ filter: 'blur(80px)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4">
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
          <span className="text-[#F59E0B] font-bold"> Join thousands of athletes, coaches, and fans</span> who are already building their digital legacy.
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
  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      {/* EPIC NIGHT STADIUM BACKGROUND */}
      <div className="fixed inset-0 z-0">
        {/* Stadium Field Base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1428] via-[#1a3a5c] to-[#0f2027]" />
        
        {/* Stadium Lights Grid - Friday Night Lights Effect */}
        <div className="absolute inset-0">
          {/* Top Stadium Light Towers */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`top-light-${i}`}
              className="absolute"
              style={{ 
                top: '8%', 
                left: `${12 + i * 9.5}%`,
              }}
            >
              {/* Light Tower */}
              <div className="w-2 h-16 bg-gray-800 relative">
                {/* Stadium Light */}
                <motion.div
                  className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-white shadow-white"
                  style={{
                    boxShadow: '0 0 30px #fff, 0 0 60px #fff, 0 0 90px #fff'
                  }}
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
                {/* Light Beam */}
                <motion.div
                  className="absolute -left-8 top-4 w-20 h-1 bg-gradient-to-r from-white/80 via-[#F59E0B]/60 to-transparent"
                  style={{ filter: 'blur(2px)' }}
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                    scaleX: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              </div>
            </motion.div>
          ))}
          
          {/* Bottom Stadium Light Towers */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`bottom-light-${i}`}
              className="absolute"
              style={{ 
                bottom: '8%', 
                left: `${12 + i * 9.5}%`,
              }}
            >
              {/* Light Tower */}
              <div className="w-2 h-16 bg-gray-800 relative">
                {/* Stadium Light */}
                <motion.div
                  className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-white shadow-white"
                  style={{
                    boxShadow: '0 0 30px #fff, 0 0 60px #fff, 0 0 90px #fff'
                  }}
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    scale: [1, 1.3, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.25
                  }}
                />
                {/* Light Beam Up */}
                <motion.div
                  className="absolute -left-8 -bottom-1 w-20 h-1 bg-gradient-to-r from-white/80 via-[#F59E0B]/60 to-transparent"
                  style={{ filter: 'blur(2px)' }}
                  animate={{
                    opacity: [0.4, 0.8, 0.4],
                    scaleX: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.25
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stadium Field with Yard Lines */}
        <div className="absolute inset-0">
          {/* Field Boundaries */}
          <div className="absolute left-[20%] right-[20%] top-[25%] bottom-[25%] border border-white/20 bg-gradient-to-b from-green-900/10 to-green-800/10" />
          
          {/* Yard Lines */}
          {[...Array(11)].map((_, i) => (
            <div
              key={`yard-line-${i}`}
              className="absolute left-[20%] right-[20%] h-px bg-white/30"
              style={{ top: `${25 + i * 4.5}%` }}
            />
          ))}
          
          {/* 50 Yard Line - SPECIAL */}
          <div className="absolute left-[20%] right-[20%] top-[47%] h-1 bg-[#F59E0B]/80 shadow-lg" />
          
          {/* End Zones */}
          <div className="absolute left-[20%] right-[20%] top-[25%] h-[9%] bg-gradient-to-b from-[#F59E0B]/20 to-transparent border-b-2 border-[#F59E0B]/60" />
          <div className="absolute left-[20%] right-[20%] bottom-[25%] h-[9%] bg-gradient-to-t from-[#F59E0B]/20 to-transparent border-t-2 border-[#F59E0B]/60" />
        </div>

        {/* Stadium Crowd Atmosphere */}
        <div className="absolute inset-0">
          {/* Left Grandstand */}
          <motion.div className="absolute left-0 top-[20%] bottom-[20%] w-[18%] bg-gradient-to-r from-black/90 via-gray-900/60 to-transparent">
            <div className="h-full bg-gradient-to-t from-black/80 via-[#1a1a2e]/50 to-black/70 relative">
              {/* Crowd Lights - Phone Flashlights */}
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`left-crowd-${i}`}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    left: `${10 + Math.random() * 70}%`,
                    top: `${20 + Math.random() * 60}%`
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 4
                  }}
                />
              ))}
            </div>
          </motion.div>
          
          {/* Right Grandstand */}
          <motion.div className="absolute right-0 top-[20%] bottom-[20%] w-[18%] bg-gradient-to-l from-black/90 via-gray-900/60 to-transparent">
            <div className="h-full bg-gradient-to-t from-black/80 via-[#1a1a2e]/50 to-black/70 relative">
              {/* Crowd Lights - Phone Flashlights */}
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`right-crowd-${i}`}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  style={{
                    right: `${10 + Math.random() * 70}%`,
                    top: `${20 + Math.random() * 60}%`
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 4
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Epic Light Rays From Stadium Lights */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`light-ray-${i}`}
              className="absolute"
              style={{
                left: `${10 + i * 7}%`,
                top: '0%',
                width: '3px',
                height: '100%',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.6) 0%, rgba(245,158,11,0.3) 30%, rgba(245,158,11,0.1) 60%, transparent 100%)',
                filter: 'blur(1px)',
                transform: `rotate(${-2 + Math.random() * 4}deg)`
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scaleX: [0.8, 1.2, 0.8]
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                delay: i * 0.4
              }}
            />
          ))}
        </div>

        {/* Stadium Jumbotron Glow */}
        <motion.div
          className="absolute top-[3%] left-1/2 transform -translate-x-1/2 w-40 h-24 rounded-lg"
          style={{
            background: 'radial-gradient(ellipse, rgba(245,158,11,0.8) 0%, rgba(245,158,11,0.4) 50%, transparent 80%)',
            filter: 'blur(3px)'
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [0.9, 1.1, 0.9]
          }}
          transition={{
            duration: 4,
            repeat: Infinity
          }}
        />

        {/* Atmospheric Particles - Stadium Energy */}
        <div className="absolute inset-0">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={`energy-${i}`}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: Math.random() > 0.7 ? '#F59E0B' : '#fff'
              }}
              animate={{
                y: [0, -50, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0, 0.8, 0],
                scale: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 8
              }}
            />
          ))}
        </div>

        {/* Final Atmosphere Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      <StadiumBackground />
      <Navbar />
      <div className="pt-20">
        <HeroSection />
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