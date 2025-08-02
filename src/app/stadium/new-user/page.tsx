'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Users, Calendar, TrendingUp, Zap, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import HeroCardHUD from '@/components/HeroCardHUD';

export default function NewUserStadiumPage() {
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Mock user data (would come from session in production)
  const userData = {
    name: 'Jake Thompson',
    school: 'Marble Falls High School',
    mascot: 'Mustangs',
    sport: 'Football',
    grade: '11',
    heroCardUrl: '/api/placeholder/800/1200?text=Jake+Thompson+HeroCard',
    hypeScore: 100, // Starting HYPE
    schoolColors: {
      primary: '#B91C1C',
      secondary: '#F59E0B'
    }
  };

  useEffect(() => {
    // Celebration animation
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  }, []);

  const quickActions = [
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Update Stats',
      description: 'Add your latest game performance',
      href: '/stats/update',
      color: 'bg-yellow-500'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Find Teammates',
      description: 'Connect with your team',
      href: '/team',
      color: 'bg-blue-500'
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Game Schedule',
      description: 'View upcoming events',
      href: '/schedule',
      color: 'bg-green-500'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Growth Score',
      description: 'Track your progress',
      href: '/growth',
      color: 'bg-purple-500'
    }
  ];

  const nextSteps = [
    { 
      title: 'Complete Your Profile', 
      description: 'Add stats, achievements, and academics',
      completed: false 
    },
    { 
      title: 'Invite Family', 
      description: 'Let parents and relatives follow your journey',
      completed: false 
    },
    { 
      title: 'Join Your Team', 
      description: 'Connect with coaches and teammates',
      completed: false 
    },
    { 
      title: 'Upload Highlights', 
      description: 'Share your best plays and moments',
      completed: false 
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-[#F59E0B]"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10,
                rotate: 0
              }}
              animate={{
                y: window.innerHeight + 10,
                rotate: 360 * (Math.random() > 0.5 ? 1 : -1)
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                ease: 'linear',
                delay: Math.random() * 2
              }}
              style={{
                left: `${Math.random() * 100}%`
              }}
            />
          ))}
        </div>
      )}

      {/* Hero Section */}
      <div 
        className="relative h-64 md:h-80"
        style={{
          background: `linear-gradient(135deg, ${userData.schoolColors.primary} 0%, ${userData.schoolColors.secondary} 100%)`
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-[#F59E0B]" />
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Welcome to Your Stadium!
            </h1>
            <p className="text-xl text-gray-200">
              {userData.name} • {userData.school} {userData.mascot}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - HeroCard and HYPE */}
          <div className="space-y-6">
            {/* HeroCard with HUD */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <HeroCardHUD 
                athleteId="new-user-123"
                initialData={{
                  hype_score: userData.hypeScore,
                  recent_stats: {
                    football: { yards: 0, receptions: 0, tds: 0 }
                  },
                  achievements: ['New Member', 'Rising Star'],
                  highlight_reels: [],
                  academics: { gpa: 0, honors: [] },
                  recruiting: { 
                    contact: { coach_email: '' }, 
                    test_scores: { sat: 0, act: 0 } 
                  },
                  share_actions: { 
                    share_url: 'https://ultrapreps.com/athlete/new', 
                    boost_hype: true, 
                    donate: false 
                  },
                  roleSpecificData: {
                    student: "Your journey starts here!",
                    parent: "Watch your child shine!",
                    coach: "New talent on the roster",
                    scout: "Potential star athlete",
                    guest: "Rising athlete to watch"
                  }
                }}
                userRole="STUDENT"
              />
            </motion.div>

            {/* Starting HYPE Bonus */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500 rounded-lg p-4"
            >
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-yellow-400" />
                <div>
                  <p className="font-semibold text-yellow-400">Welcome Bonus!</p>
                  <p className="text-sm text-gray-300">
                    You earned 100 HYPE for joining UltraPreps
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Middle Column - Quick Actions */}
          <div className="space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-900 rounded-lg p-4 h-full transition-all group-hover:bg-gray-800"
                    >
                      <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                        {action.icon}
                      </div>
                      <h3 className="font-semibold mb-1">{action.title}</h3>
                      <p className="text-sm text-gray-400">{action.description}</p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Your Mascot */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-900 rounded-lg p-6 text-center"
            >
              <img
                src="/api/placeholder/200/200?text=Mustang+Mascot"
                alt="Mascot"
                className="w-32 h-32 mx-auto mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold mb-2">Meet Max the Mustang!</h3>
              <p className="text-gray-400 text-sm mb-4">
                Your school spirit guide is here to cheer you on
              </p>
              <button className="px-4 py-2 bg-[#F59E0B] text-black font-semibold rounded-lg hover:bg-[#F59E0B]/80 transition-all">
                Chat with Max
              </button>
            </motion.div>
          </div>

          {/* Right Column - Next Steps */}
          <div className="space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-900 rounded-lg p-6"
            >
              <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
              <div className="space-y-4">
                {nextSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 ${
                      step.completed ? 'bg-green-500 border-green-500' : 'border-gray-600'
                    } flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      {step.completed && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{step.title}</h4>
                      <p className="text-sm text-gray-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tips */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-blue-900/20 border border-blue-500 rounded-lg p-4"
            >
              <h3 className="font-semibold mb-2 text-blue-400">💡 Pro Tips</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Update your stats after every game</li>
                <li>• More activity = more HYPE</li>
                <li>• Coaches can see verified stats</li>
                <li>• Share achievements to boost visibility</li>
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#F59E0B] hover:bg-[#F59E0B]/80 text-black font-bold rounded-lg transition-all"
          >
            Go to Full Dashboard
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}