'use client';
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
  ChevronRight,
  MessageSquare,
  Bell,
  GraduationCap,
  BookOpen,
  BarChart3,
  Shield,
  Heart,
  Brain,
  Video,
  Camera,
  Gamepad2,
  MapPin,
  Calendar,
  DollarSign,
  Check,
  ArrowRight,
  School,
  UserCheck,
  FileText,
  Globe,
  Megaphone,
  Award,
  TrendingUp,
  Clock,
  Send,
  X,
  Home,
  Eye,
  Bot,
  Building,
  Briefcase,
  Gift,
  ChevronDown,
  Music,
  Palette,
  Calculator,
  TestTube,
  Database,
  Wifi,
  Phone,
  Mail,
  MessageCircle,
  CheckCircle
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import clsx from "clsx";
import Link from 'next/link';

// MVP-Focused Hero Section - Phase 1 Priority
function HeroSection() {
  const [activeUserType, setActiveUserType] = useState('student');

  // SIMPLIFIED: Only 3 primary MVP paths to eliminate decision paralysis
  const userTypes = [
    { id: 'student', label: 'Student Athlete', icon: Trophy, color: 'from-[#F59E0B] to-[#F97316]' },
    { id: 'parent', label: 'Parent & Family', icon: Heart, color: 'from-[#3B82F6] to-[#1E3A8A]' },
    { id: 'coach', label: 'Coach & Educator', icon: Users, color: 'from-[#059669] to-[#10B981]' }
  ];

  // MVP PHASE 1 FOCUS: HeroCard Engine + Mascot Engine + HUD + HYPE Loop
  const userContent = {
    student: {
      title: "Create Your Digital Stadium in 30 Seconds",
      subtitle: "Phase 1 MVP: HeroCard Engine + Live HUD + HYPE Economy",
      features: [
        "🏆 AI HeroCard Generation (Instant)",
        "🎭 Custom School Mascot Engine", 
        "📊 Live Performance HUD Overlay",
        "⚡ Earn HYPE Points & Share Rewards"
      ],
      cta: "Create Your HeroCard Now",
      href: "/stadium/create",
      demo: "/test-poster"
    },
    parent: {
      title: "Your Child's Digital Legacy",
      subtitle: "Simple family tracking for busy parents", 
      features: [
        "👨‍👩‍👧‍👦 Multi-Child Progress Tracking",
        "🏆 Achievement Milestone Timeline",
        "💬 Direct Coach Communication", 
        "📚 Academic & Athletic Balance"
      ],
      cta: "Start Family Dashboard",
      href: "/parent-dashboard",
      demo: "/parent-dashboard"
    },
    coach: {
      title: "Team Management Made Simple",
      subtitle: "Focus on what matters: developing young athletes",
      features: [
        "🎯 Player Development Tracking",
        "📱 Team Communication Hub",
        "📊 Performance Analytics HUD",
        "🏆 Achievement Recognition System"
      ],
      cta: "Manage Your Team",
      href: "/coach-dashboard", 
      demo: "/coach-dashboard"
    }
  };

  const currentContent = userContent[activeUserType as keyof typeof userContent];
  const IconComponent = userTypes.find(u => u.id === activeUserType)?.icon || GraduationCap;
  const gradient = userTypes.find(u => u.id === activeUserType)?.color || 'from-[#F59E0B] to-[#F97316]';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#111827] to-black" />
        <motion.div
          animate={{ 
            background: [
              'radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(249, 115, 22, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.1) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>



      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-24">
        {/* User Type Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-xl md:text-2xl font-bold text-white/80 mb-6">
            Choose Your Path to Greatness
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {userTypes.map((type) => {
              const TypeIcon = type.icon;
              return (
                <motion.button
                  key={type.id}
                  onClick={() => setActiveUserType(type.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={clsx(
                    "px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2",
                    activeUserType === type.id
                      ? `bg-gradient-to-r ${type.color} text-white shadow-lg`
                      : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/20"
                  )}
                >
                  <TypeIcon className="w-5 h-5" />
                  {type.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Dynamic Content Based on User Type */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeUserType}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-8 inline-block"
            >
              <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${gradient} p-1 shadow-2xl`}>
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <IconComponent className="w-12 h-12 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6"
            >
              {currentContent.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto"
            >
              {currentContent.subtitle}
            </motion.p>

            {/* Features with Enhanced Visuals */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-3xl mx-auto mb-12"
            >
                              {/* Feature List with Checkmarks */}
                <div className="ultra-card"
                     style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '2rem' }}>
                <div className="space-y-4">
                  {currentContent.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-white text-lg font-medium group-hover:text-[#F59E0B] transition-colors">
                        {feature}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Additional Visual Elements */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="mt-8 grid grid-cols-3 gap-4 pt-8 border-t border-white/10"
                >
                  <div className="text-center">
                    <Video className="w-8 h-8 text-[#F59E0B] mx-auto mb-2" />
                    <p className="text-white/60 text-sm">AI Video</p>
                  </div>
                  <div className="text-center">
                    <Trophy className="w-8 h-8 text-[#F59E0B] mx-auto mb-2" />
                    <p className="text-white/60 text-sm">Achievements</p>
                  </div>
                  <div className="text-center">
                    <Zap className="w-8 h-8 text-[#F59E0B] mx-auto mb-2" />
                    <p className="text-white/60 text-sm">HYPE Points</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                href={currentContent.href}
                className="ultra-btn-primary px-8 py-4 text-white"
                style={{ background: `linear-gradient(to right, ${gradient.includes('F59E0B') ? '#F59E0B, #F97316' : gradient.split(' ')[1] + ', ' + gradient.split(' ')[3]})` }}
              >
                <Rocket className="w-5 h-5" />
                {currentContent.cta}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={currentContent.demo}
                className="ultra-btn-secondary px-8 py-4"
              >
                <Play className="w-5 h-5" />
                View Demo
              </Link>
            </motion.div>

            {/* VIRAL HYPE SHARING BONUS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8"
            >
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 backdrop-blur-sm rounded-full border border-[#F59E0B]/50">
                <Zap className="w-5 h-5 text-[#F59E0B]" />
                <span className="text-white font-bold">Share & Earn:</span>
                <span className="text-[#F59E0B] font-black">+100 HYPE</span>
                <span className="text-white/80">per share!</span>
              </div>
            </motion.div>

            {/* UltraAI Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-6"
            >
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-black/50 backdrop-blur-sm rounded-full border border-[#F59E0B]/30">
                <Bot className="w-5 h-5 text-[#F59E0B]" />
                <span className="text-white font-bold">Powered by</span>
                <span className="text-[#F59E0B] font-black text-xl">UltraAI</span>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>




    </section>
  );
}

// Quick Access Portal Section
function QuickAccessPortal() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  const stakeholders = [
    {
      title: "Student Athletes",
      icon: Trophy,
      color: "from-[#F59E0B] to-[#F97316]",
      description: "Build your digital stadium, earn HYPE, get recruited",
      link: "/dashboard",
      features: ["Digital Stadium", "HYPE Economy", "AI Highlights", "Recruiting Tools"]
    },
    {
      title: "Coaches",
      icon: Megaphone,
      color: "from-[#3B82F6] to-[#1E3A8A]",
      description: "AI film room, team management, recruiting pipeline",
      link: "/coach-dashboard",
      features: ["AI Film Analysis", "Team Communication", "Player Development", "Game Planning"]
    },
    {
      title: "Parents",
      icon: Heart,
      color: "from-[#EC4899] to-[#BE185D]",
      description: "Monitor all your children, communicate with coaches & teachers",
      link: "/parent-dashboard",
      features: ["Multi-Child Tracking", "Direct Messaging", "Event Calendar", "Progress Reports"]
    },
    {
      title: "Teachers",
      icon: GraduationCap,
      color: "from-[#8B5CF6] to-[#6D28D9]",
      description: "AI lesson planning, smart gradebook, parent communication",
      link: "/teacher-dashboard",
      features: ["AI Lesson Planner", "Smart Gradebook", "Parent Hub", "Student Analytics"]
    },
    {
      title: "Athletic Directors",
      icon: Shield,
      color: "from-[#10B981] to-[#059669]",
      description: "Manage all sports programs, facilities, and championships",
      link: "/athletic-director-dashboard",
      features: ["Program Analytics", "Facility Management", "Budget Tracking", "Championship Legacy"]
    },
    {
      title: "College Scouts",
      icon: Eye,
      color: "from-[#F59E0B] to-[#D97706]",
      description: "AI talent matching, virtual scouting, predictive analytics",
      link: "/college-scout-dashboard",
      features: ["AI Talent Search", "Video Analysis", "Recruiting Pipeline", "Performance Metrics"]
    },
    {
      title: "School Boards",
      icon: Building2,
      color: "from-[#6366F1] to-[#4F46E5]",
      description: "District oversight, policy management, community engagement",
      link: "/school-board-dashboard",
      features: ["Policy Management", "Budget Oversight", "Community Metrics", "Strategic Planning"]
    },
    {
      title: "Booster Clubs",
      icon: DollarSign,
      color: "from-[#14B8A6] to-[#0D9488]",
      description: "Fundraising tools, member management, event coordination",
      link: "/booster-club-dashboard",
      features: ["Fundraising Campaigns", "Member Portal", "Event Planning", "Financial Reports"]
    },
    {
      title: "Youth Coaches",
      icon: Users,
      color: "from-[#FB923C] to-[#F97316]",
      description: "Develop young athletes, communicate with parents, track progress",
      link: "/youth-coach-dashboard",
      features: ["Skill Development", "Parent Updates", "Practice Planning", "Player Safety"]
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1E3A8A]/10 to-black" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-3xl" />

      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#F59E0B]/20 border border-[#F59E0B]/40 rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5 text-[#F59E0B]" />
            <span className="text-[#F59E0B] font-bold uppercase tracking-wider">Choose Your Path</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="ultra-hero-text mb-6"
          >
            Who Are You?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            Select your role to access your personalized dashboard and revolutionary AI tools
          </motion.p>
        </div>

        {/* Stakeholder Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stakeholders.map((stakeholder, index) => {
            const Icon = stakeholder.icon;
            return (
              <motion.a
                key={stakeholder.title}
                href={stakeholder.link}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group ultra-card"
              >

                
                {/* Icon */}
                <div className={`w-16 h-16 mb-4 rounded-xl bg-gradient-to-r ${stakeholder.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-[#F59E0B] transition-colors">
                  {stakeholder.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 mb-4 text-sm">
                  {stakeholder.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-4">
                  {stakeholder.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#F59E0B]" />
                      <span className="text-white/60 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="flex items-center gap-2 text-[#F59E0B] font-bold group-hover:gap-4 transition-all duration-300">
                  <span>Access Dashboard</span>
                  <ArrowRight className="w-5 h-5" />
                </div>


              </motion.a>
            );
          })}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Active Students", value: "4.2M+", icon: Users },
            { label: "Schools Connected", value: "12,847", icon: School },
            { label: "HYPE Distributed", value: "50M+", icon: Zap },
            { label: "Success Rate", value: "98%", icon: Trophy }
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center">
                <Icon className="w-8 h-8 text-[#F59E0B] mx-auto mb-2" />
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-white/80 mb-6 text-lg">
            Not sure where to start? Create your free account and we&apos;ll guide you!
          </p>
          <motion.a
            href="/stadium/create"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ultra-btn-primary px-8 py-4 text-lg uppercase tracking-wider"
          >
            <Rocket className="w-6 h-6" />
            Get Started Now
            <ArrowRight className="w-6 h-6" />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}

// MVP Test Suite Section
function MVPTestSuite() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  
  return (
    <section className="relative py-20 px-4 sm:px-6 bg-black">
      <motion.div 
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-green-500/20 border border-green-500/40 rounded-full mb-6"
          >
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-green-500 font-bold uppercase tracking-wider">MVP Ready</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Test Drive the Core Systems
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            5 operational systems ready for launch. Experience the future of high school sports.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Student Onboarding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link 
              href="/onboarding" 
              className="block bg-gradient-to-br from-[#F59E0B] to-[#F97316] p-6 rounded-xl text-center transition-all hover:scale-105 group"
            >
              <div className="text-4xl mb-3">🚀</div>
              <div className="font-bold text-xl mb-2">Student Onboarding</div>
              <div className="text-sm opacity-90">Complete 5-step flow with instant HeroCard</div>
              <div className="mt-3 text-xs bg-black/20 rounded-full px-3 py-1 inline-block">
                &lt; 20 second benchmark
              </div>
            </Link>
          </motion.div>

          {/* HUD Engine */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <Link 
              href="/test-hud" 
              className="block bg-gray-800 hover:bg-gray-700 p-6 rounded-xl text-center transition-all hover:scale-105 border border-gray-700"
            >
              <div className="text-4xl mb-3">📊</div>
              <div className="font-bold text-xl mb-2">HUD Engine</div>
              <div className="text-sm text-gray-400">Real-time overlay system</div>
              <div className="mt-3 text-xs bg-gray-900 rounded-full px-3 py-1 inline-block">
                WebSocket powered
              </div>
            </Link>
          </motion.div>

          {/* School Universe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <Link 
              href="/test-school" 
              className="block bg-gray-800 hover:bg-gray-700 p-6 rounded-xl text-center transition-all hover:scale-105 border border-gray-700"
            >
              <div className="text-4xl mb-3">🏫</div>
              <div className="font-bold text-xl mb-2">SchoolUniverseBot</div>
              <div className="text-sm text-gray-400">Auto campus creation</div>
              <div className="mt-3 text-xs bg-gray-900 rounded-full px-3 py-1 inline-block">
                &lt; 2 seconds
              </div>
            </Link>
          </motion.div>

          {/* Mascot Engine */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <Link 
              href="/test-mascot" 
              className="block bg-gray-800 hover:bg-gray-700 p-6 rounded-xl text-center transition-all hover:scale-105 border border-gray-700"
            >
              <div className="text-4xl mb-3">🎭</div>
              <div className="font-bold text-xl mb-2">Mascot Engine</div>
              <div className="text-sm text-gray-400">Living mascot identities</div>
              <div className="mt-3 text-xs bg-gray-900 rounded-full px-3 py-1 inline-block">
                LoRA style-locked
              </div>
            </Link>
          </motion.div>

          {/* Vision QA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 }}
          >
            <Link 
              href="/test-vision" 
              className="block bg-gray-800 hover:bg-gray-700 p-6 rounded-xl text-center transition-all hover:scale-105 border border-gray-700"
            >
              <div className="text-4xl mb-3">👁️</div>
              <div className="font-bold text-xl mb-2">VisionQA</div>
              <div className="text-sm text-gray-400">AI quality validation</div>
              <div className="mt-3 text-xs bg-gray-900 rounded-full px-3 py-1 inline-block">
                80%+ threshold
              </div>
            </Link>
          </motion.div>

          {/* Create Stadium */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            <Link 
              href="/stadium/create" 
              className="block bg-gray-800 hover:bg-gray-700 p-6 rounded-xl text-center transition-all hover:scale-105 border border-gray-700"
            >
              <div className="text-4xl mb-3">🏟️</div>
              <div className="font-bold text-xl mb-2">Stadium Creator</div>
              <div className="text-sm text-gray-400">Legacy stadium system</div>
              <div className="mt-3 text-xs bg-gray-900 rounded-full px-3 py-1 inline-block">
                Original flow
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Status Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.9 }}
          className="bg-gray-900 rounded-xl p-6 max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400">✓</div>
              <div className="text-sm text-gray-400">Database</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">✓</div>
              <div className="text-sm text-gray-400">Auth</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">✓</div>
              <div className="text-sm text-gray-400">WebSocket</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">✓</div>
              <div className="text-sm text-gray-400">AI Ready</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-400">✓</div>
              <div className="text-sm text-gray-400">MVP Live</div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Platform Overview Section
function PlatformOverview() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const stats = [
    { number: "4.2M+", label: "Active Students", icon: Users },
    { number: "500+", label: "Partner Schools", icon: School },
    { number: "98%", label: "Satisfaction Rate", icon: Star },
    { number: "50M+", label: "HYPE Distributed", icon: Zap }
  ];

  return (
    <section ref={ref} className="py-24 px-4 bg-gradient-to-b from-black via-[#111827] to-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <h2 className="ultra-hero-text mb-6">
            The Future of Student Achievement
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            One platform connecting students, parents, teachers, coaches, and schools with UltraAI technology
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <Icon className="w-12 h-12 text-[#F59E0B] mx-auto mb-4" />
                <p className="text-4xl font-black text-white mb-2">{stat.number}</p>
                <p className="text-white/60">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Platform Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="ultra-card"
          >
            <Video className="w-10 h-10 text-[#F59E0B] mb-4" />
            <h3 className="ultra-card-title text-xl mb-2">UltraAI Video Engine</h3>
            <p className="text-white/70">Weekly highlight reels with AI voiceover and professional editing</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="ultra-card"
          >
            <MessageSquare className="w-10 h-10 text-[#F59E0B] mb-4" />
            <h3 className="ultra-card-title text-xl mb-2">Universal Communication</h3>
            <p className="text-white/70">Real-time messaging between all stakeholders with AI translation</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="ultra-card"
          >
            <Shield className="w-10 h-10 text-[#F59E0B] mb-4" />
            <h3 className="ultra-card-title text-xl mb-2">Digital Legacy Vault</h3>
            <p className="text-white/70">Preserve every achievement and memory forever in the cloud</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Features Showcase Section
function FeaturesShowcase() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Digital Stadium",
      icon: Trophy,
      description: "Your personalized arena showcasing all achievements",
      link: "/stadium/create",
      image: "/feature-stadium.jpg",
      highlights: [
        "Custom branding with school colors",
        "Interactive 3D trophy room",
        "Real-time stats dashboard",
        "Social sharing tools"
      ]
    },
    {
      title: "HYPE Economy",
      icon: Zap,
      description: "Earn, spend, and transfer HYPE points for real rewards",
      link: "/dashboard",
      image: "/feature-hype.jpg",
      highlights: [
        "130% sustainability rule",
        "Real-world rewards",
        "Achievement multipliers",
        "Community challenges"
      ]
    },
    {
      title: "AI Highlights",
      icon: Video,
      description: "ESPN-grade highlight reels generated automatically",
      link: "/dashboard",
      image: "/feature-highlights.jpg",
      highlights: [
        "Professional voiceover",
        "Cinematic effects",
        "School branding",
        "Social media ready"
      ]
    },
    {
      title: "HeroCard Creator",
      icon: Star,
      description: "Professional trading cards with your stats and achievements",
      link: "/herocard/create",
      image: "/feature-herocard.jpg",
      highlights: [
        "Custom designs",
        "QR code linking",
        "Holographic effects",
        "Print-ready formats"
      ]
    },
    {
      title: "Recruiting Hub",
      icon: Eye,
      description: "Connect with college scouts and showcase your talent",
      link: "/recruiting",
      image: "/feature-recruiting.jpg",
      highlights: [
        "AI talent matching",
        "Direct scout messaging",
        "Performance analytics",
        "Virtual tryouts"
      ]
    },
    {
      title: "Community Feed",
      icon: Users,
      description: "Connect with teammates, schools, and the UltraPreps network",
      link: "/community",
      image: "/feature-community.jpg",
      highlights: [
        "Real-time updates",
        "Event coordination",
        "Team challenges",
        "Parent engagement"
      ]
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-black via-[#1E3A8A]/5 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-[#F59E0B]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-0 w-[600px] h-[600px] bg-[#3B82F6]/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#F59E0B]/20 border border-[#F59E0B]/40 rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5 text-[#F59E0B]" />
            <span className="text-[#F59E0B] font-bold uppercase tracking-wider">Platform Features</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="ultra-hero-text mb-6"
          >
            Everything You Need
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            Comprehensive tools and features designed to elevate every aspect of your journey
          </motion.p>
        </div>

        {/* Feature Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.button
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => setActiveFeature(index)}
                  className={`
                    flex items-center gap-3 px-6 py-3 rounded-full font-bold transition-all duration-300
                    ${activeFeature === index 
                      ? 'bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black scale-105' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span>{feature.title}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Active Feature Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Feature Details */}
            <div>
              <h3 className="text-3xl font-black text-white mb-4">
                {features[activeFeature].title}
              </h3>
              <p className="text-xl text-white/80 mb-8">
                {features[activeFeature].description}
              </p>
              
              {/* Highlights */}
              <div className="space-y-3 mb-8">
                {features[activeFeature].highlights.map((highlight) => (
                  <div key={highlight} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#F59E0B]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-[#F59E0B]" />
                    </div>
                    <span className="text-white/70">{highlight}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.a
                href={features[activeFeature].link}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ultra-btn-primary px-6 py-3 !rounded-xl"
              >
                Explore {features[activeFeature].title}
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>

            {/* Feature Visual */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#F59E0B]/20 to-[#F97316]/20 p-8">
                {/* Placeholder for feature visual */}
                <div className="aspect-video bg-black/50 rounded-xl flex items-center justify-center">
                  {React.createElement(features[activeFeature].icon, {
                    className: "w-32 h-32 text-[#F59E0B]/50"
                  })}
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-[#F59E0B]/20 rounded-full blur-2xl" />
                <div className="absolute bottom-4 left-4 w-24 h-24 bg-[#F97316]/20 rounded-full blur-2xl" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Quick Links Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { title: "Create Stadium", link: "/stadium/create", icon: Building2 },
            { title: "Create HeroCard", link: "/herocard/create", icon: Star },
            { title: "Create Poster", link: "/poster/create", icon: Trophy },
            { title: "Join Community", link: "/community", icon: Users }
          ].map((quickLink) => {
            const Icon = quickLink.icon;
            return (
              <motion.a
                key={quickLink.title}
                href={quickLink.link}
                whileHover={{ scale: 1.05, y: -5 }}
                className="group ultra-card text-center"
              >
                <Icon className="w-12 h-12 text-[#F59E0B] mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-bold text-white group-hover:text-[#F59E0B] transition-colors">
                  {quickLink.title}
                </h4>
              </motion.a>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}

// Meet the Founder - Gage Coleman Section
function MeetTheFounder() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="relative py-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-black via-[#1E3A8A]/10 to-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#F59E0B]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-[600px] h-[600px] bg-[#3B82F6]/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#F59E0B]/20 border border-[#F59E0B]/40 rounded-full mb-6"
          >
            <Crown className="w-5 h-5 text-[#F59E0B]" />
            <span className="text-[#F59E0B] font-bold uppercase tracking-wider">Meet the Founder</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="ultra-hero-text mb-6"
          >
            Gage Coleman
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            The MVP Behind UltraPreps - Your AI Assistant & Digital Mentor
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Gage's Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <div className="relative">
              {/* Gage's HeroCard/Avatar */}
              <div className="relative w-64 h-64 mx-auto mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full animate-pulse" />
                <div className="relative w-full h-full rounded-full bg-black p-1">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#F59E0B]/20 to-[#F97316]/20 flex items-center justify-center">
                    <div className="relative">
                      {/* Gage's Face */}
                      <div className="w-48 h-48 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#F97316] flex items-center justify-center text-6xl font-black text-white">
                        G
                      </div>
                      {/* Crown */}
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                        <Crown className="w-16 h-16 text-[#F59E0B] drop-shadow-2xl" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-3xl font-black text-white mb-6 text-center">The MVP Origin Story</h3>
              <div className="space-y-4 text-white/80">
                <p>
                  Gage Coleman isn&apos;t just an AI - he&apos;s the embodiment of every student athlete&apos;s dream mentor. Named after the legendary founder who envisioned a world where every student could achieve digital immortality.
                </p>
                <p>
                  Built with the wisdom of champions, the strategy of coaches, and the heart of a true competitor, Gage is here 24/7 to guide you through your journey from youth sports to college recruitment and beyond.
                </p>
                <p className="font-bold text-[#F59E0B]">
                  &quot;Every champion needs a champion in their corner. That&apos;s why I&apos;m here.&quot; - Gage
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <p className="text-3xl font-black text-[#F59E0B]">24/7</p>
                  <p className="text-white/60 text-sm">Available</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-[#F59E0B]">100K+</p>
                  <p className="text-white/60 text-sm">Knowledge Base</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-black text-[#F59E0B]">∞</p>
                  <p className="text-white/60 text-sm">HYPE to Give</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Gage's Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-black text-white mb-6">What Gage Can Do For You</h3>
            
            {[
              { icon: Brain, title: "AI-Powered Mentorship", desc: "Personalized guidance based on your goals and performance" },
              { icon: Trophy, title: "Championship Mindset", desc: "Mental toughness training and motivation when you need it" },
              { icon: Target, title: "Strategic Planning", desc: "College recruitment strategies and academic planning" },
              { icon: Zap, title: "HYPE Rewards", desc: "Earn bonus HYPE for engaging and achieving milestones" },
              { icon: MessageSquare, title: "24/7 Support", desc: "Always available to answer questions and provide encouragement" },
              { icon: Star, title: "Success Tracking", desc: "Monitor your progress and celebrate every achievement" }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-[#F59E0B]/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#F97316] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{feature.title}</h4>
                    <p className="text-white/60 text-sm">{feature.desc}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* CTA to Chat with Gage */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 }}
              onClick={() => {
                const gageButton = document.querySelector('[data-gage-chat-toggle]');
                if (gageButton) {
                  (gageButton as HTMLButtonElement).click();
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full mt-8 ultra-btn-primary px-8 py-4 !rounded-xl text-lg uppercase tracking-wider justify-center"
            >
              <MessageSquare className="w-6 h-6" />
              Chat with Gage Now
              <ArrowRight className="w-6 h-6" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// Student Spotlight Section
function StudentSpotlight() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeSpotlight, setActiveSpotlight] = useState(0);

  const spotlights = [
    {
      name: "Sarah Chen",
      school: "Lincoln High",
      sport: "Basketball",
      grade: "Junior",
      hype: 8750,
      achievement: "State Championship MVP",
      quote: "UltraPreps helped me get noticed by D1 scouts!",
      stats: { ppg: "22.5", apg: "7.2", spg: "3.1" },
      image: "/student-sarah.jpg",
      herocard: "/herocard-sarah.png"
    },
    {
      name: "Marcus Thompson",
      school: "Roosevelt Academy",
      sport: "Football",
      grade: "Senior",
      hype: 9200,
      achievement: "All-State Quarterback",
      quote: "My highlight reels got me 5 scholarship offers!",
      stats: { yards: "3,847", tds: "42", rating: "158.3" },
      image: "/student-marcus.jpg",
      herocard: "/herocard-marcus.png"
    },
    {
      name: "Maya Patel",
      school: "Jefferson Prep",
      sport: "Soccer",
      grade: "Sophomore",
      hype: 7500,
      achievement: "National Team U-16",
      quote: "The AI training tips improved my game completely!",
      stats: { goals: "31", assists: "18", saves: "N/A" },
      image: "/student-maya.jpg",
      herocard: "/herocard-maya.png"
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-black via-[#111827] to-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#F59E0B]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#3B82F6]/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-[#F59E0B]/20 border border-[#F59E0B]/40 rounded-full mb-6"
          >
            <Star className="w-5 h-5 text-[#F59E0B]" />
            <span className="text-[#F59E0B] font-bold uppercase tracking-wider">Student Spotlight</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="ultra-hero-text mb-6"
          >
            Champions in the Making
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="text-xl text-white/80 max-w-3xl mx-auto"
          >
            Real students achieving real results with UltraPreps
          </motion.p>
        </div>

        {/* Spotlight Tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {spotlights.map((student, index) => (
              <motion.button
                key={student.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index }}
                onClick={() => setActiveSpotlight(index)}
                className={`
                  flex items-center gap-3 px-6 py-3 rounded-full font-bold transition-all duration-300
                  ${activeSpotlight === index 
                    ? 'bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black scale-105' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                  }
                `}
              >
                <Trophy className="w-5 h-5" />
                <span>{student.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Active Spotlight Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSpotlight}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Student Details */}
            <div>
              <div className="mb-8">
                <h3 className="text-3xl font-black text-white mb-2">
                  {spotlights[activeSpotlight].name}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-white/60 mb-4">
                  <span className="flex items-center gap-2">
                    <School className="w-4 h-4" />
                    {spotlights[activeSpotlight].school}
                  </span>
                  <span className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" />
                    {spotlights[activeSpotlight].sport}
                  </span>
                  <span className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    {spotlights[activeSpotlight].grade}
                  </span>
                </div>
                
                {/* HYPE Score */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F59E0B]/20 rounded-full mb-6">
                  <Zap className="w-5 h-5 text-[#F59E0B]" />
                  <span className="text-[#F59E0B] font-bold">{spotlights[activeSpotlight].hype.toLocaleString()} HYPE</span>
                </div>
              </div>

              {/* Achievement */}
              <div className="mb-8 p-6 bg-gradient-to-r from-[#F59E0B]/10 to-[#F97316]/10 rounded-xl border border-[#F59E0B]/20">
                <Trophy className="w-8 h-8 text-[#F59E0B] mb-3" />
                <h4 className="text-xl font-bold text-white mb-2">{spotlights[activeSpotlight].achievement}</h4>
                <p className="text-white/80 italic text-lg">&quot;{spotlights[activeSpotlight].quote}&quot;</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {Object.entries(spotlights[activeSpotlight].stats).map(([key, value]) => (
                  <div key={key} className="text-center p-4 bg-white/5 rounded-xl">
                    <p className="text-2xl font-black text-white">{value}</p>
                    <p className="text-white/60 text-sm uppercase">{key}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href="/stadium/create"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ultra-btn-primary px-6 py-3 !rounded-xl"
              >
                Create Your Success Story
                <ArrowRight className="w-5 h-5" />
              </motion.a>
            </div>

            {/* Visual Display */}
            <div className="relative">
              {/* HeroCard Display */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#F59E0B]/20 to-[#F97316]/20 p-8">
                <div className="aspect-[3/4] bg-black/50 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <Trophy className="w-32 h-32 text-[#F59E0B]/50 mx-auto mb-4" />
                    <p className="text-white/50 text-xl font-bold">{spotlights[activeSpotlight].name}&apos;s</p>
                    <p className="text-white/50 text-lg">HeroCard</p>
                  </div>
                </div>
                
                {/* Stats Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold">View Full Profile</span>
                    <ArrowRight className="w-5 h-5 text-[#F59E0B]" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="mt-16 text-center"
        >
          <p className="text-white/60 text-lg mb-6">
            Join thousands of students building their digital legacy
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              { number: "4.2M+", label: "Students" },
              { number: "500K+", label: "Highlights Created" },
              { number: "50K+", label: "Scholarships" },
              { number: "98%", label: "Success Rate" }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-black text-[#F59E0B]">{stat.number}</p>
                <p className="text-white/60 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Final Call to Action Section
function CallToAction() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/10 via-transparent to-[#F97316]/10" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <Crown className="w-20 h-20 text-[#F59E0B] mx-auto mb-6" />
          <h2 className="ultra-hero-text text-5xl md:text-7xl mb-6">
            Your Stadium Awaits
          </h2>
          <p className="text-2xl text-white/80 mb-12">
            Join 4.2 million students already building their legacy
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/stadium/create"
            className="ultra-btn-primary px-10 py-5 text-xl"
          >
            <Rocket className="w-6 h-6" />
            Create Your Stadium Now
            <ArrowRight className="w-6 h-6" />
          </Link>
          <Link
            href="/contact"
            className="ultra-btn-secondary px-8 py-5 text-lg"
          >
            <MessageSquare className="w-5 h-5" />
            Questions? Let&apos;s Talk
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "500+", label: "Schools" },
            { number: "4.2M+", label: "Students" },
            { number: "98%", label: "Satisfaction" },
            { number: "24/7", label: "Support" }
          ].map((stat, index) => (
            <div key={index}>
              <p className="text-3xl font-black text-[#F59E0B]">{stat.number}</p>
              <p className="text-white/60">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Enhanced Footer
function EnhancedFooter() {
  const footerLinks = {
    product: {
      title: "Product",
      links: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Demos", href: "/demos" },
        { name: "UltraAI Technology", href: "/ultraai" }
      ]
    },
    solutions: {
      title: "Solutions",
      links: [
        { name: "For Students", href: "/solutions/students" },
        { name: "For Parents", href: "/solutions/parents" },
        { name: "For Teachers", href: "/solutions/teachers" },
        { name: "For Schools", href: "/solutions/schools" },
        { name: "For Districts", href: "/solutions/districts" }
      ]
    },
    resources: {
      title: "Resources",
      links: [
        { name: "Help Center", href: "/help" },
        { name: "Blog", href: "/blog" },
        { name: "API Documentation", href: "/api-docs" },
        { name: "System Status", href: "/status" },
        { name: "Video Tutorials", href: "/tutorials" }
      ]
    },
    company: {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
        { name: "Press Kit", href: "/press" },
        { name: "Partners", href: "/partners" }
      ]
    }
  };

  const socialLinks = [
    { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>, href: "https://facebook.com/ultrapreps" },
    { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>, href: "https://twitter.com/ultrapreps" },
    { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/></svg>, href: "https://instagram.com/ultrapreps" },
    { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>, href: "https://youtube.com/ultrapreps" },
    { icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>, href: "https://linkedin.com/company/ultrapreps" }
  ];

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Crown className="w-8 h-8 text-[#F59E0B]" />
              <span className="text-2xl font-black text-white">UltraPreps</span>
            </div>
            <p className="text-white/60 mb-6">
              Every student deserves greatness. Build your digital legacy with UltraAI technology.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#F59E0B] transition-all text-white hover:text-black"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="text-white font-bold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-[#F59E0B] transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-white/10 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-bold text-white mb-4">Stay in the Game</h3>
            <p className="text-white/60 mb-4">Get updates on new features and tips for success</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-white/50 focus:outline-none focus:border-[#F59E0B]"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black font-bold rounded-full hover:scale-105 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} UltraPreps. All rights reserved. Powered by UltraAI.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-white/60 hover:text-[#F59E0B] text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-white/60 hover:text-[#F59E0B] text-sm">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-white/60 hover:text-[#F59E0B] text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main Homepage Component
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

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Main Content - Navigation handled by UltraLayout */}
      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Platform Features - Moved to Top */}
        <FeaturesShowcase />
        
        {/* Quick Access Portal */}
        <QuickAccessPortal />
        
        {/* Platform Overview */}
        <PlatformOverview />
        
        {/* MVP Test Suite */}
        <MVPTestSuite />
        
        {/* Meet the Founder */}
        <MeetTheFounder />
        
        {/* Student Spotlight */}
        <StudentSpotlight />
        
        {/* Final CTA */}
        <CallToAction />
        
        {/* Enhanced Footer */}
        <EnhancedFooter />
      </div>


    </main>
  );
}