'use client';

import React, { useState } from 'react';
// Removed framer motion - no cheesy animations
import {
  Trophy,
  Heart,
  Users,
  ArrowRight,
  Zap,
  Star,
  Shield,
  Crown,
  Target,
  Camera,
  Home,
  Calendar,
  User,
  Brain,
  Award,
  Gamepad2,
  Sparkles,
  Rocket,
  TrendingUp,
  Globe,
  Medal,
  Building,
  MessageCircle,
  School,
  GraduationCap,
  DollarSign,
  Map,
  Eye,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import HeroCardDemo from '../components/HeroCardDemo';
import PosterCreator from '../components/PosterCreator';
import HypeWidget from '../components/HypeWidget';
import QuickPosterButton from '../components/QuickPosterButton';
import GageAIChat from '../components/GageAIChat';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  href: string;
  category: 'core' | 'ai' | 'social' | 'professional';
  gradient: string;
}

const FEATURES: Feature[] = [
  {
    id: 'herocard',
    title: 'HeroCard Creator',
    description: 'ESPN-grade athlete cards with real-time stats and achievements',
    icon: Trophy,
    href: '/demo/herocard',
    category: 'core',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'stadium',
    title: 'Digital Stadium',
    description: 'Personal sports universe with live updates and fan engagement',
    icon: Building,
    href: '/stadium/create',
    category: 'core',
    gradient: 'from-blue-500 to-purple-500'
  },
  {
    id: 'ai-coach',
    title: 'AI Personal Coach',
    description: 'Advanced performance analysis and personalized training',
    icon: Brain,
    href: '/demo/ai-coach',
    category: 'ai',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    id: 'recruiting',
    title: 'Smart Recruiting',
    description: 'Connect with college scouts through AI-powered matching',
    icon: Target,
    href: '/demo/recruiting',
    category: 'professional',
    gradient: 'from-red-500 to-pink-500'
  },
  {
    id: 'nil',
    title: 'NIL Marketplace',
    description: 'Monetize your athletic brand with Name, Image, Likeness deals',
    icon: DollarSign,
    href: '/demo/nil',
    category: 'professional',
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'community',
    title: 'Team Community',
    description: 'Connect teammates, families, and fans in one platform',
    icon: Users,
    href: '/community',
    category: 'social',
    gradient: 'from-cyan-500 to-blue-500'
  }
];

function HeroSection() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const heroCards = [
    {
      name: "Marcus Johnson",
      position: "QB",
      number: "12",
      school: "Central High",
      year: "2025",
      stats: { yards: "3,247", touchdowns: "28", completions: "156" },
      image: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=400&h=600&fit=crop&crop=face"
    },
    {
      name: "Sarah Chen",
      position: "PG",
      number: "5",
      school: "West Valley",
      year: "2026",
      stats: { points: "24.5", assists: "8.2", rebounds: "6.1" },
      image: "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?w=400&h=600&fit=crop&crop=face"
    }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            THE FUTURE OF
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              ATHLETIC EXCELLENCE
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            Where athletes build their digital legacy, connect with opportunities, and unlock their full potential through AI-powered insights.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/stadium/create"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Building className="w-5 h-5" />
            Create Your Stadium
          </Link>
          <Link
            href="/poster/create"
            className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-lg border border-white/20 transition-colors flex items-center justify-center gap-2"
          >
            <Camera className="w-5 h-5" />
            Generate HeroCard
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {FEATURES.slice(0, 6).map((feature) => (
            <Link
              key={feature.id}
              href={feature.href}
              className="group bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.description}</p>
            </Link>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">50K+</div>
            <div className="text-white/60">Athletes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">1.2M</div>
            <div className="text-white/60">HeroCards</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">500+</div>
            <div className="text-white/60">Schools</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">$2.4M</div>
            <div className="text-white/60">NIL Deals</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function UltraPrepsPlatform() {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-yellow-500/30 md:hidden">
        <div className="grid grid-cols-5 h-16">
          <Link
            href="/"
            className="flex flex-col items-center justify-center gap-1 text-yellow-500 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Link>
          
          <Link
            href="/stadium/create"
            className="flex flex-col items-center justify-center gap-1 text-white/90 hover:text-yellow-500 transition-colors"
          >
            <Trophy className="w-5 h-5" />
            <span className="text-xs">Stadium</span>
          </Link>
          
          <Link
            href="/community"
            className="flex flex-col items-center justify-center gap-1 text-white/90 hover:text-yellow-500 transition-colors"
          >
            <Users className="w-5 h-5" />
            <span className="text-xs">Community</span>
          </Link>
          
          <Link
            href="/feed"
            className="flex flex-col items-center justify-center gap-1 text-white/90 hover:text-yellow-500 transition-colors"
          >
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Feed</span>
          </Link>
          
          <Link
            href="/dashboard"
            className="flex flex-col items-center justify-center gap-1 text-white/90 hover:text-yellow-500 transition-colors"
          >
            <User className="w-5 h-5" />
            <span className="text-xs">Dashboard</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">UltraPreps</h3>
              <p className="text-gray-400">The future of athletic excellence starts here.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><Link href="/stadium/create" className="text-gray-400 hover:text-white">Create Stadium</Link></li>
                <li><Link href="/poster/create" className="text-gray-400 hover:text-white">HeroCard Creator</Link></li>
                <li><Link href="/community" className="text-gray-400 hover:text-white">Community</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Features</h4>
              <ul className="space-y-2">
                <li><Link href="/demo/ai-coach" className="text-gray-400 hover:text-white">AI Coach</Link></li>
                <li><Link href="/demo/recruiting" className="text-gray-400 hover:text-white">Recruiting</Link></li>
                <li><Link href="/demo/nil" className="text-gray-400 hover:text-white">NIL Marketplace</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><Link href="/beta" className="text-gray-400 hover:text-white">Join Beta</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 UltraPreps. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Components */}
      <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40">
        <QuickPosterButton />
      </div>
      
      <div className="fixed bottom-32 right-4 md:bottom-20 md:right-6 z-40">
        <HypeWidget />
      </div>

      <GageAIChat />
    </div>
  );
}