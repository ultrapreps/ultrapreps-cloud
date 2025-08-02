'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Heart, Users, GraduationCap, Building, Search, 
  ArrowRight, ArrowLeft, Crown, Shield, Target, Star,
  BarChart3, DollarSign, Brain, Award, MessageCircle,
  Calendar, Briefcase, Globe, X
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from './ThemeContext';

// SOPHISTICATED INFORMATION ARCHITECTURE
// Based on User Journey & Cognitive Load Theory

interface StakeholderRole {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{className?: string}>;
  href: string;
  description: string;
  primaryAudience?: boolean;
}

interface StakeholderCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{className?: string}>;
  color: string;
  roles: StakeholderRole[];
}

// NAVIGATION THEORY: Progressive Disclosure + Visual Hierarchy
const STAKEHOLDER_CATEGORIES: StakeholderCategory[] = [
  {
    id: 'athletes-families',
    title: 'Athletes & Families',
    subtitle: 'The heart of high school athletics',
    icon: Trophy,
    color: 'from-orange-500 to-red-500',
    roles: [
      {
        id: 'student',
        title: 'Student Athlete',
        subtitle: 'Your digital legacy awaits',
        icon: Trophy,
        href: '/stadium/create',
        description: 'AI HeroCards, performance tracking, college recruitment',
        primaryAudience: true
      },
      {
        id: 'parent',
        title: 'Parent & Family',
        subtitle: 'Multi-generational support hub',
        icon: Heart,
        href: '/parent-dashboard',
        description: 'Family command center, legacy building, health tracking',
        primaryAudience: true
      }
    ]
  },
  {
    id: 'coaching-staff',
    title: 'Coaching & Athletics',
    subtitle: 'Leading champions to victory',
    icon: Users,
    color: 'from-green-500 to-emerald-600',
    roles: [
      {
        id: 'coach',
        title: 'Head Coach',
        subtitle: 'Team management & strategy',
        icon: Users,
        href: '/coach-dashboard',
        description: 'Team analytics, recruitment, rivalry campaigns',
        primaryAudience: true
      },
      {
        id: 'youth-coach',
        title: 'Youth Coach',
        subtitle: 'Development & mentorship',
        icon: Star,
        href: '/youth-coach-dashboard',
        description: 'Young athlete development, parent communication'
      },
      {
        id: 'athletic-director',
        title: 'Athletic Director',
        subtitle: 'Program leadership',
        icon: Shield,
        href: '/athletic-director-dashboard',
        description: 'Multi-sport oversight, facility management, championships'
      }
    ]
  },
  {
    id: 'school-administration',
    title: 'School Leadership',
    subtitle: 'Educational excellence & governance',
    icon: Building,
    color: 'from-blue-500 to-indigo-600',
    roles: [
      {
        id: 'superintendent',
        title: 'Superintendent',
        subtitle: 'District-wide vision',
        icon: Crown,
        href: '/superintendent-dashboard',
        description: 'District analytics, media kits, strategic oversight'
      },
      {
        id: 'school-board',
        title: 'School Board Member',
        subtitle: 'Governance & policy',
        icon: Building,
        href: '/school-board-dashboard',
        description: 'Policy management, budget oversight, community relations'
      },
      {
        id: 'teacher',
        title: 'Teacher',
        subtitle: 'Academic & athletic integration',
        icon: GraduationCap,
        href: '/teacher-dashboard',
        description: 'Student holistic development, academic-athletic balance'
      }
    ]
  },
  {
    id: 'community-recruiting',
    title: 'Community & Recruiting',
    subtitle: 'Support network & opportunities',
    icon: Globe,
    color: 'from-purple-500 to-pink-500',
    roles: [
      {
        id: 'booster-club',
        title: 'Booster Club',
        subtitle: 'Community fundraising',
        icon: DollarSign,
        href: '/booster-club-dashboard',
        description: 'Fundraising campaigns, event management, community building'
      },
      {
        id: 'college-scout',
        title: 'College Scout',
        subtitle: 'Talent identification',
        icon: Search,
        href: '/college-scout-dashboard',
        description: 'Athlete discovery, recruitment pipeline, evaluation tools'
      }
    ]
  }
];

interface StakeholderRoleSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StakeholderRoleSelector({ isOpen, onClose }: StakeholderRoleSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [step, setStep] = useState<'categories' | 'roles'>('categories');
  const { isDark } = useTheme();

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setStep('roles');
  };

  const handleBack = () => {
    setStep('categories');
    setSelectedCategory(null);
  };

  const selectedCategoryData = STAKEHOLDER_CATEGORIES.find(cat => cat.id === selectedCategory);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`absolute inset-0 backdrop-blur-xl ${
              isDark ? 'bg-black/70' : 'bg-white/70'
            }`}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`relative w-full max-w-6xl mx-4 rounded-3xl border backdrop-blur-md overflow-hidden ${
              isDark 
                ? 'bg-gray-900/90 border-white/20' 
                : 'bg-white/95 border-gray-200 shadow-2xl'
            }`}
          >
            {/* Header */}
            <div className={`px-8 py-6 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {step === 'roles' && (
                    <button
                      onClick={handleBack}
                      className={`p-2 rounded-xl transition-colors ${
                        isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                      }`}
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                  )}
                  <div>
                    <h2 className={`text-3xl font-black ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {step === 'categories' ? 'Choose Your Role' : selectedCategoryData?.title}
                    </h2>
                    <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {step === 'categories' 
                        ? 'Discover your personalized UltraPreps experience' 
                        : selectedCategoryData?.subtitle
                      }
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className={`p-3 rounded-xl transition-colors ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'
                  }`}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                {step === 'categories' ? (
                  <motion.div
                    key="categories"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {STAKEHOLDER_CATEGORIES.map((category, index) => (
                      <motion.button
                        key={category.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`group relative p-8 rounded-2xl border text-left transition-all duration-300 hover:scale-105 ${
                          isDark 
                            ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#F59E0B]/50' 
                            : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-[#F59E0B]/50 shadow-lg hover:shadow-xl'
                        }`}
                      >
                        {/* Gradient Background */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`} />
                        
                        <div className="relative">
                          <category.icon className="w-12 h-12 text-[#F59E0B] mb-4 group-hover:scale-110 transition-transform duration-300" />
                          <h3 className={`text-2xl font-black mb-2 group-hover:text-[#F59E0B] transition-colors ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {category.title}
                          </h3>
                          <p className={`text-lg mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {category.subtitle}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                              {category.roles.length} option{category.roles.length > 1 ? 's' : ''}
                            </span>
                            <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${
                              isDark ? 'text-gray-400' : 'text-gray-500'
                            }`} />
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="roles"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {selectedCategoryData?.roles.map((role, index) => (
                      <motion.div
                        key={role.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          href={role.href}
                          onClick={onClose}
                          className={`group block p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                            role.primaryAudience
                              ? `ring-2 ring-[#F59E0B]/30 ${
                                  isDark 
                                    ? 'bg-[#F59E0B]/10 border-[#F59E0B]/30' 
                                    : 'bg-[#F59E0B]/5 border-[#F59E0B]/30'
                                }`
                              : isDark 
                                ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#F59E0B]/50' 
                                : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-[#F59E0B]/50 shadow-lg hover:shadow-xl'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <role.icon className={`w-10 h-10 ${
                              role.primaryAudience ? 'text-[#F59E0B]' : isDark ? 'text-white' : 'text-gray-700'
                            } group-hover:text-[#F59E0B] transition-colors`} />
                            {role.primaryAudience && (
                              <span className="px-2 py-1 bg-[#F59E0B] text-black text-xs font-bold rounded-full">
                                POPULAR
                              </span>
                            )}
                          </div>
                          <h4 className={`text-xl font-bold mb-1 group-hover:text-[#F59E0B] transition-colors ${
                            isDark ? 'text-white' : 'text-gray-900'
                          }`}>
                            {role.title}
                          </h4>
                          <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {role.subtitle}
                          </p>
                          <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {role.description}
                          </p>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className={`px-8 py-6 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
              <div className="flex items-center justify-between">
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {step === 'categories' ? '4 stakeholder categories' : `${selectedCategoryData?.roles.length} roles available`}
                </p>
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-[#F59E0B]" />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    AI-Powered Athletics Platform
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}