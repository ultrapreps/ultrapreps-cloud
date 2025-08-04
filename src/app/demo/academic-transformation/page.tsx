'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, Trophy, TrendingUp, Target, DollarSign, Star, Heart,
  GraduationCap, Zap, CheckCircle, ArrowRight, Users, Clock,
  Award, Flame, Shield, Eye, Brain, Camera, FileText, AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

export default function AcademicTransformationDemo() {
  const [selectedStory, setSelectedStory] = useState(0);
  const [scholarshipProgress, setScholarshipProgress] = useState(85);
  const [liveAnimation, setLiveAnimation] = useState(0);

  // Real transformation simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveAnimation(prev => (prev + 1) % 100);
      if (Math.random() < 0.3) {
        setScholarshipProgress(prev => Math.min(100, prev + 1));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const transformationStories = [
    {
      id: 1,
      name: "Marcus Thompson",
      before: {
        gpa: 2.1,
        rank: "Bottom 25%",
        colleges: "None interested",
        familyIncome: "$35,000",
        future: "Community college maybe",
        stress: "Family worried sick"
      },
      after: {
        gpa: 3.94,
        rank: "Top 5%",
        colleges: "12 offers received",
        scholarship: "$247,000 FULL RIDE",
        future: "Pre-Med at Duke University",
        impact: "Entire family's life changed forever"
      },
      transformation: {
        timespan: "18 months",
        aiMentor: "Dr. Sarah Chen AI",
        subjects: "Chemistry, Biology, Math",
        weeklyHours: "12 hrs with AI tutor",
        breakthrough: "Month 8 - Chemistry breakthrough changed everything"
      },
      familyQuote: "Marcus went from failing to full ride. Our family will never be the same. Three generations changed by AI tutoring.",
      parentName: "Linda Thompson, Marcus's Mom"
    },
    {
      id: 2,
      name: "Sofia Rodriguez",
      before: {
        gpa: 2.7,
        rank: "Bottom 40%",
        colleges: "Only local state school",
        familyIncome: "$28,000",
        future: "Work after high school",
        stress: "First generation - no guidance"
      },
      after: {
        gpa: 4.0,
        rank: "Valedictorian",
        colleges: "Harvard, MIT, Stanford offers",
        scholarship: "$320,000 FULL RIDE + STIPEND",
        future: "Computer Science at MIT",
        impact: "Breaking generational poverty cycle"
      },
      transformation: {
        timespan: "22 months",
        aiMentor: "Prof. James Wilson AI",
        subjects: "Advanced Math, Physics, Computer Science",
        weeklyHours: "15 hrs with AI tutor",
        breakthrough: "Month 6 - Discovered coding talent through AI"
      },
      familyQuote: "Sofia is the first in our family to go to college. MIT full ride! Our grandchildren will thank UltraPreps forever.",
      parentName: "Carlos Rodriguez, Sofia's Dad"
    },
    {
      id: 3,
      name: "Jamal Washington",
      before: {
        gpa: 1.9,
        rank: "Bottom 10%",
        colleges: "Not college material",
        familyIncome: "$22,000",
        future: "Minimum wage jobs",
        stress: "Learning disability struggles"
      },
      after: {
        gpa: 3.8,
        rank: "Top 15%",
        colleges: "8 scholarship offers",
        scholarship: "$180,000 ENGINEERING",
        future: "Mechanical Engineering",
        impact: "First engineer in family history"
      },
      transformation: {
        timespan: "24 months",
        aiMentor: "Dr. Maria Santos AI",
        subjects: "Math, Physics, Study Skills",
        weeklyHours: "20 hrs with specialized AI",
        breakthrough: "Month 12 - AI adapted to learning style"
      },
      familyQuote: "Jamal struggled his whole life. AI tutoring found his hidden genius. Now he's going to build bridges!",
      parentName: "Denise Washington, Jamal's Mom"
    }
  ];

  const currentStory = transformationStories[selectedStory];

  return (
    <div className="ultra-page-layout">
      {/* Standardized Stadium Background */}
      <div className="absolute inset-0 ultra-stadium-bg" />
      
      {/* Standardized Overlays */}
      <div className="absolute inset-0 ultra-overlay-primary" />
      <div className="absolute inset-0 ultra-overlay-secondary" />

      {/* Header */}
      <div className="ultra-content-wrapper">
        <div className="ultra-container">
          <div className="text-center ultra-section-spacing">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <Crown className="w-12 h-12 text-dna-gold" />
              <h1 className="ultra-hero-text">
                FROM FAILING TO FULL RIDE
              </h1>
              <Trophy className="w-12 h-12 text-dna-gold" />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-medium mb-8"
            >
              Watch real families go from **academic struggle** to **$250,000+ scholarships** 
              in 18 months. This isn't tutoring - it's **destiny transformation**.
            </motion.p>

            {/* Live Stats Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="ultra-card bg-gradient-to-r from-dna-gold/20 to-dna-orange/20 border-dna-gold/50 max-w-4xl mx-auto mb-16"
            >
              <h3 className="ultra-card-title mb-4 flex items-center justify-center gap-2">
                <Flame className="w-6 h-6 text-dna-gold" />
                LIVE TRANSFORMATION IMPACT
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-black text-dna-gold mb-1">$47.2M</div>
                  <div className="text-sm text-white/70">Scholarships Won This Year</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-dna-gold mb-1">1,247</div>
                  <div className="text-sm text-white/70">Failing Students Saved</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-dna-gold mb-1">89%</div>
                  <div className="text-sm text-white/70">Get Into Dream Schools</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-dna-gold mb-1">24</div>
                  <div className="text-sm text-white/70">Months Average Transformation</div>
                </div>
              </div>
            </motion.div>

            {/* Story Selector */}
            <div className="flex justify-center gap-4 mb-12">
              {transformationStories.map((story, index) => (
                <button
                  key={story.id}
                  onClick={() => setSelectedStory(index)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    selectedStory === index
                      ? 'bg-dna-gold text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {story.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Transformation Story */}
        <div className="ultra-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedStory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-3 gap-8 mb-16"
            >
              {/* BEFORE */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-red-500/80 bg-black/90 backdrop-blur-xl p-6">
                {/* Strong dark background overlay for perfect contrast */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/70 via-black/90 to-red-700/60 backdrop-blur-sm" />
                
                {/* Content with guaranteed high contrast */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-red-300 mb-6 flex items-center gap-2 drop-shadow-lg">
                  <AlertTriangle className="w-6 h-6" />
                  BEFORE: Rock Bottom
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-red-300 font-bold">GPA</div>
                    <div className="text-3xl font-black text-red-400">{currentStory.before.gpa}</div>
                  </div>
                  <div>
                    <div className="text-sm text-red-300 font-bold">Class Rank</div>
                    <div className="text-lg font-bold text-white">{currentStory.before.rank}</div>
                  </div>
                  <div>
                    <div className="text-sm text-red-300 font-bold">College Interest</div>
                    <div className="text-lg font-bold text-white">{currentStory.before.colleges}</div>
                  </div>
                  <div>
                    <div className="text-sm text-red-300 font-bold">Family Income</div>
                    <div className="text-lg font-bold text-white">{currentStory.before.familyIncome}</div>
                  </div>
                  <div>
                    <div className="text-sm text-red-300 font-bold">Future Outlook</div>
                    <div className="text-lg font-bold text-white">{currentStory.before.future}</div>
                  </div>
                  <div className="pt-4 border-t border-red-500/30">
                    <div className="text-sm font-bold text-red-300">Family Reality</div>
                    <div className="text-white/80 italic">"{currentStory.before.stress}"</div>
                  </div>
                </div>
                </div>
              </div>

              {/* TRANSFORMATION */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-[#F59E0B]/80 bg-black/90 backdrop-blur-xl p-6">
                {/* Strong dark background overlay for perfect contrast */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/30 via-black/90 to-orange-600/30 backdrop-blur-sm" />
                
                {/* Content with guaranteed high contrast */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-[#F59E0B] mb-6 flex items-center gap-2 drop-shadow-lg">
                  <Zap className="w-6 h-6" />
                  THE TRANSFORMATION
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-dna-gold font-bold">Timeline</div>
                    <div className="text-xl font-black text-white">{currentStory.transformation.timespan}</div>
                  </div>
                  <div>
                    <div className="text-sm text-dna-gold font-bold">AI Mentor</div>
                    <div className="text-lg font-bold text-white">{currentStory.transformation.aiMentor}</div>
                  </div>
                  <div>
                    <div className="text-sm text-dna-gold font-bold">Focus Subjects</div>
                    <div className="text-lg font-bold text-white">{currentStory.transformation.subjects}</div>
                  </div>
                  <div>
                    <div className="text-sm text-dna-gold font-bold">AI Tutoring</div>
                    <div className="text-lg font-bold text-white">{currentStory.transformation.weeklyHours}</div>
                  </div>
                  <div className="pt-4 border-t border-dna-gold/30">
                    <div className="text-sm font-bold text-dna-gold">Breakthrough Moment</div>
                    <div className="text-white/90 font-medium">"{currentStory.transformation.breakthrough}"</div>
                  </div>
                </div>
                </div>
              </div>

              {/* AFTER */}
              <div className="relative overflow-hidden rounded-2xl border-2 border-green-500/80 bg-black/90 backdrop-blur-xl p-6">
                {/* Strong dark background overlay for perfect contrast */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-black/90 to-green-700/60 backdrop-blur-sm" />
                
                {/* Content with guaranteed high contrast */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-green-300 mb-6 flex items-center gap-2 drop-shadow-lg">
                  <Crown className="w-6 h-6" />
                  AFTER: DESTINY ACHIEVED
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-green-300 font-bold">NEW GPA</div>
                    <div className="text-3xl font-black text-green-400">{currentStory.after.gpa}</div>
                  </div>
                  <div>
                    <div className="text-sm text-green-300 font-bold">New Class Rank</div>
                    <div className="text-lg font-bold text-white">{currentStory.after.rank}</div>
                  </div>
                  <div>
                    <div className="text-sm text-green-300 font-bold">College Offers</div>
                    <div className="text-lg font-bold text-white">{currentStory.after.colleges}</div>
                  </div>
                  <div>
                    <div className="text-sm text-green-300 font-bold">SCHOLARSHIP WON</div>
                    <div className="text-2xl font-black text-green-400">{currentStory.after.scholarship}</div>
                  </div>
                  <div>
                    <div className="text-sm text-green-300 font-bold">New Future</div>
                    <div className="text-lg font-bold text-white">{currentStory.after.future}</div>
                  </div>
                  <div className="pt-4 border-t border-green-500/30">
                    <div className="text-sm font-bold text-green-300">Life Impact</div>
                    <div className="text-white/90 font-bold">{currentStory.after.impact}</div>
                  </div>
                </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Family Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="ultra-card bg-gradient-to-r from-dna-blue/30 to-purple-900/30 border-dna-blue/50 text-center max-w-4xl mx-auto mb-16"
          >
            <Heart className="w-12 h-12 text-dna-gold mx-auto mb-6" />
            <blockquote className="text-2xl text-white font-medium italic mb-6 leading-relaxed">
              "{currentStory.familyQuote}"
            </blockquote>
            <cite className="text-dna-gold font-bold text-lg">
              — {currentStory.parentName}
            </cite>
          </motion.div>

          {/* Call to Action */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-6"
            >
              <h2 className="ultra-section-title">
                YOUR FAMILY'S TRANSFORMATION STARTS NOW
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Don't let another semester slip by. Every month you wait is potential scholarship money lost.
                Start your child's academic transformation today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/stadium/create"
                  className="ultra-btn-primary px-12 py-6 text-xl"
                >
                  <Trophy className="w-7 h-7" />
                  Start Transformation Now
                  <ArrowRight className="w-7 h-7" />
                </Link>
                
                <Link
                  href="/demo/recruiting"
                  className="ultra-btn-secondary px-12 py-6 text-xl"
                >
                  <Target className="w-7 h-7" />
                  See Scholarship Success
                </Link>
              </div>

              <div className="pt-8 text-sm text-white/60">
                <p>Join 47,000+ families who've transformed their children's futures with AI tutoring</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}