'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GraduationCap, Trophy, Users, Home, Eye, Building,
  Sparkles, Crown, Zap, Shield, ChevronRight, ArrowRight,
  Star, Play, Target, Rocket, Lock, CheckCircle,
  TrendingUp, Heart, Share2, Award, Loader2
} from 'lucide-react';
import UltraNavigation from '@/components/navigation/UltraNavigation';


export default function HomePage() {
  const [activeRole, setActiveRole] = useState<string>('student');
  const [showConsent, setShowConsent] = useState(false);

  // Role definitions for MVP focus
  const roles = [
    {
      id: 'student',
      label: 'Student Athlete',
      icon: GraduationCap,
      color: 'from-[#F59E0B] to-[#F97316]',
      tagline: 'Build Your Digital Legacy',
      features: ['AI HeroCards', 'HYPE Rewards', 'Recruiting Tools'],
      cta: 'Create Your HeroCard',
      href: '/herocard/create'
    },
    {
      id: 'parent',
      label: 'Parent',
      icon: Home,
      color: 'from-[#3B82F6] to-[#1E3A8A]',
      tagline: 'Celebrate Every Moment',
      features: ['Milestone Tracking', 'Safe Sharing', 'Legacy Mode'],
      cta: 'Start Family Legacy',
      href: '/parent-signup'
    },
    {
      id: 'coach',
      label: 'Coach',
      icon: Trophy,
      color: 'from-[#DC2626] to-[#EF4444]',
      tagline: 'Build Championship Programs',
      features: ['Team Analytics', 'Recruiting Pipeline', 'Film Room'],
      cta: 'Get Coach Tools',
      href: '/coach-signup'
    }
  ];

  const currentRole = roles.find(r => r.id === activeRole) || roles[0];

  // MVP Features - Phase 1 Focus
  const mvpFeatures = [
    {
      icon: Sparkles,
      title: 'AI HeroCards',
      description: 'ESPN-quality player cards generated in seconds',
      stat: '< 20s',
      color: 'text-[#F59E0B]'
    },
    {
      icon: Crown,
      title: 'Living Mascots',
      description: 'Your school mascot comes to life with AI',
      stat: '100% Unique',
      color: 'text-[#F97316]'
    },
    {
      icon: Zap,
      title: 'HYPE Economy',
      description: 'Earn rewards for achievements & sharing',
      stat: '∞ HYPE',
      color: 'text-yellow-500'
    },
    {
      icon: Shield,
      title: 'Safe & Compliant',
      description: 'FERPA/COPPA compliant with parent controls',
      stat: '100% Safe',
      color: 'text-green-500'
    }
  ];

  // Sample HYPE leaderboard for virality
  const hypeLeaders = [
    { name: 'Jake Thompson', school: 'Central HS', hype: 2847, trend: '+124' },
    { name: 'Maria Garcia', school: 'North Academy', hype: 2654, trend: '+98' },
    { name: 'Tyler Chen', school: 'East Prep', hype: 2398, trend: '+87' }
  ];

  return (
    <>
      <UltraNavigation />
      
      {/* Main content with proper padding for navigation */}
      <main className="min-h-screen bg-black">
        {/* Hero Section - MVP Focused */}
        <section className="relative overflow-hidden pt-20">
          {/* Dynamic gradient background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
            <motion.div
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, rgba(245, 158, 11, 0.15) 0%, transparent 50%)'
                ]
              }}
              transition={{ duration: 10, repeat: Infinity }}
              className="absolute inset-0"
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-32">
            <div className="text-center mb-12">
              {/* MVP Tagline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 bg-[#F59E0B]/10 text-[#F59E0B] px-4 py-2 rounded-full text-sm font-bold">
                  <Rocket className="w-4 h-4" />
                  Phase 1 MVP Live
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl sm:text-7xl font-black text-white mb-6"
              >
                Every Athlete Deserves
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-[#F97316]">
                  Digital Immortality
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-400 max-w-2xl mx-auto mb-8"
              >
                AI-powered HeroCards • Living Mascots • HYPE Rewards • Safe for Families
              </motion.p>
            </div>

            {/* Role Selector */}
            <div className="flex flex-col items-center mb-12">
              <p className="text-gray-400 mb-4">I am a...</p>
              <div className="flex flex-wrap justify-center gap-3">
                {roles.map(role => (
                  <button
                    key={role.id}
                    onClick={() => setActiveRole(role.id)}
                    className={`
                      relative px-6 py-3 rounded-xl font-semibold transition-all duration-300
                      ${activeRole === role.id 
                        ? 'text-white scale-105' 
                        : 'text-gray-400 hover:text-white'
                      }
                    `}
                  >
                    {activeRole === role.id && (
                      <motion.div
                        layoutId="roleSelector"
                        className={`absolute inset-0 bg-gradient-to-r ${role.color} rounded-xl`}
                        transition={{ type: "spring", duration: 0.5 }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      <role.icon className="w-5 h-5" />
                      {role.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Role-Specific Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto"
              >
                <div className={`relative bg-gradient-to-r ${currentRole.color} p-[1px] rounded-2xl`}>
                  <div className="bg-black rounded-2xl p-8 sm:p-12">
                    <div className="flex flex-col sm:flex-row items-center gap-8">
                      <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-3xl font-bold text-white mb-4">
                          {currentRole.tagline}
                        </h2>
                        <div className="space-y-3 mb-6">
                          {currentRole.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-gray-300">
                              <CheckCircle className="w-5 h-5 text-[#F59E0B]" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-4 justify-center sm:justify-start">
                          <Link
                            href={currentRole.href}
                            className={`
                              inline-flex items-center gap-2 px-6 py-3 
                              bg-gradient-to-r ${currentRole.color} 
                              text-white font-bold rounded-xl 
                              hover:scale-105 transition-transform duration-200
                            `}
                          >
                            {currentRole.cta}
                            <ArrowRight className="w-5 h-5" />
                          </Link>
                          {activeRole === 'student' && (
                            <button
                              onClick={() => setShowConsent(true)}
                              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-gray-300 font-medium rounded-xl hover:bg-gray-700 transition-colors"
                            >
                              <Lock className="w-4 h-4" />
                              Parent Info
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {/* Visual Demo */}
                      <div className="relative">
                        <div className="w-64 h-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden">
                          {activeRole === 'student' && (
                            <div className="p-4 space-y-3">
                              <div className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] h-40 rounded-lg flex items-center justify-center">
                                <Sparkles className="w-16 h-16 text-white" />
                              </div>
                              <div className="space-y-2">
                                <div className="h-3 bg-gray-700 rounded" />
                                <div className="h-3 bg-gray-700 rounded w-3/4" />
                              </div>
                              <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-2">
                                  <Zap className="w-5 h-5 text-[#F59E0B]" />
                                  <span className="text-sm font-bold text-white">2,847</span>
                                </div>
                                <div className="flex gap-2">
                                  <Heart className="w-5 h-5 text-gray-600" />
                                  <Share2 className="w-5 h-5 text-gray-600" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* MVP Features Grid */}
        <section className="py-20 px-4 bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Phase 1 MVP Features
              </h2>
              <p className="text-gray-400">
                Core features available now • More coming in Phase 2
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mvpFeatures.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-black/50 border border-gray-800 rounded-xl p-6 hover:border-[#F59E0B]/50 transition-colors"
                >
                  <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{feature.description}</p>
                  <div className={`text-2xl font-bold ${feature.color}`}>
                    {feature.stat}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* HYPE Leaderboard - Virality Feature */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] p-[1px] rounded-2xl">
              <div className="bg-black rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Live HYPE Leaderboard
                    </h3>
                    <p className="text-gray-400">
                      Top athletes earning HYPE this week
                    </p>
                  </div>
                  <Link
                    href="/leaderboard"
                    className="text-[#F59E0B] hover:text-[#F97316] font-medium flex items-center gap-2"
                  >
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {hypeLeaders.map((leader, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg hover:bg-gray-900 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full flex items-center justify-center font-bold text-white">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{leader.name}</p>
                          <p className="text-sm text-gray-400">{leader.school}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <Zap className="w-5 h-5 text-[#F59E0B]" />
                          <span className="text-xl font-bold text-white">{leader.hype}</span>
                        </div>
                        <span className="text-sm text-green-500">{leader.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <p className="text-gray-400 text-sm mb-4">
                    Share your HeroCard to earn HYPE and climb the leaderboard!
                  </p>
                  <Link
                    href="/herocard/create"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-bold rounded-xl hover:scale-105 transition-transform duration-200"
                  >
                    <Zap className="w-5 h-5" />
                    Start Earning HYPE
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety & Consent Modal */}
        <AnimatePresence>
          {showConsent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowConsent(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gray-900 rounded-2xl p-8 max-w-md w-full"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-8 h-8 text-green-500" />
                  <h3 className="text-2xl font-bold text-white">Safety First</h3>
                </div>
                
                <div className="space-y-4 text-gray-300 mb-6">
                  <p>UltraPreps is committed to protecting student athletes:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>FERPA & COPPA compliant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>Parent consent required for minors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>SafeHUD mode masks sensitive data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <span>All recruiter interactions logged</span>
                    </li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <Link
                    href="/parent-signup"
                    className="flex-1 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-xl text-center hover:scale-105 transition-transform duration-200"
                  >
                    Parent Portal
                  </Link>
                  <button
                    onClick={() => setShowConsent(false)}
                    className="flex-1 py-3 bg-gray-800 text-gray-300 font-medium rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer CTA */}
        <section className="py-20 px-4 bg-gradient-to-t from-gray-900 to-black">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Build Your Legacy?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of athletes creating their digital immortality
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/herocard/create"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-bold text-lg rounded-xl hover:scale-105 transition-transform duration-200"
              >
                <Sparkles className="w-6 h-6" />
                Create Your HeroCard Now
              </Link>
              <Link
                href="/beta"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800 text-gray-300 font-bold text-lg rounded-xl hover:bg-gray-700 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </main>


    </>
  );
}