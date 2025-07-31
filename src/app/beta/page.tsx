'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Users, Trophy, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BetaSignupPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [school, setSchool] = useState('');
  const [role, setRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/beta-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          school,
          role,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Beta signup error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-black">
        {/* Stadium Background */}
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
        
        {/* Enhanced dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
        <div className="absolute inset-0 bg-black/40" />

        {/* Success Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] flex items-center justify-center"
            >
              <Trophy className="w-12 h-12 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-4xl md:text-6xl font-black uppercase tracking-wider mb-6 bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#F59E0B] bg-clip-text text-transparent"
            >
              Welcome to the Stadium!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-xl md:text-2xl text-white font-bold mb-8"
              style={{ textShadow: "0 4px 16px rgba(0,0,0,0.8)" }}
            >
              You&apos;re officially on the <span className="text-[#F59E0B]">ULTRAPREPS BETA</span> waitlist!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="space-y-4 text-lg text-white/90"
            >
              <p>🏈 Get ready for your personal digital stadium</p>
              <p>⚡ Gage Coleman will be your first friend</p>
              <p>🎯 Early access coming soon</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="mt-12"
            >
                              <Link
                  href="/"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-bold rounded-xl hover:scale-105 transition-transform duration-200"
                >
                Back to Home
                <ArrowRight className="w-5 h-5" />
                              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Stadium Background */}
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
      
      {/* Enhanced dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Branding */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex items-center justify-center lg:justify-start gap-4 mb-8"
              >
                <Zap className="w-12 h-12 text-[#F59E0B]" />
                <h1 className="text-5xl md:text-6xl font-black uppercase tracking-wider bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#F59E0B] bg-clip-text text-transparent">
                  UltraPreps
                </h1>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                style={{ textShadow: "0 4px 16px rgba(0,0,0,0.8)" }}
              >
                Join the <span className="text-[#F59E0B]">BETA</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-xl text-white/90 mb-8 leading-relaxed"
              >
                Be among the first to experience the world&apos;s first{' '}
                <span className="text-[#F59E0B] font-bold">AI-powered digital stadium</span>{' '}
                for student-athletes.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="grid grid-cols-2 gap-4 text-sm"
              >
                <div className="flex items-center gap-2 text-white/80">
                  <Users className="w-5 h-5 text-[#F59E0B]" />
                  <span>Personal Stadium</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Trophy className="w-5 h-5 text-[#F59E0B]" />
                  <span>AI HeroCards</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Star className="w-5 h-5 text-[#F59E0B]" />
                  <span>HYPE Economy</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Zap className="w-5 h-5 text-[#F59E0B]" />
                  <span>AI Mentors</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="school" className="block text-white font-semibold mb-2">
                    School Name
                  </label>
                  <input
                    type="text"
                    id="school"
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                    placeholder="Enter your school name"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-white font-semibold mb-2">
                    I am a...
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
                  >
                    <option value="" className="bg-black">Select your role</option>
                    <option value="student" className="bg-black">Student Athlete</option>
                    <option value="parent" className="bg-black">Parent</option>
                    <option value="coach" className="bg-black">Coach</option>
                    <option value="athletic-director" className="bg-black">Athletic Director</option>
                    <option value="recruiter" className="bg-black">College Recruiter</option>
                  </select>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-bold text-lg rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Joining the Stadium...
                    </>
                  ) : (
                    <>
                      Join the Beta
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>

              <p className="text-white/60 text-sm text-center mt-6">
                Early access • Family-safe platform • Free to join
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}