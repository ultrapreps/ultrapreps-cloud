'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Users, Star, Trophy, Globe, Shield,
  Smartphone, Wifi, Book, GraduationCap, Home,
  DollarSign, Clock, CheckCircle, ArrowRight,
  Play, Target, Zap, Sparkles, Crown, Award,
  TrendingUp, BarChart3, Medal, Gift
} from 'lucide-react';
import Link from 'next/link';

export default function UnderservedAccessDemo() {
  const [selectedProgram, setSelectedProgram] = useState(0);
  const [isApplying, setIsApplying] = useState(false);
  const [applicationProgress, setApplicationProgress] = useState(0);
  const [accessMetrics, setAccessMetrics] = useState({
    studentsServed: 45678,
    schoolsReached: 234,
    devicesProvided: 2847,
    scholarshipsAwarded: 156
  });

  // Access Programs
  const accessPrograms = [
    {
      id: 1,
      title: "Digital Bridge Initiative",
      subtitle: "Technology Access & Digital Literacy",
      description: "Providing free devices, internet access, and digital literacy training to ensure every student can participate in the digital stadium",
      icon: Smartphone,
      beneficiaries: 12456,
      cost: "100% Free",
      eligibility: "Title I Schools & Low-Income Families",
      benefits: [
        "Free tablet or laptop device",
        "2 years of free internet access",
        "24/7 technical support in multiple languages",
        "Digital literacy training for entire family",
        "Device protection and replacement program"
      ],
      successStories: [
        {
          name: "Maria Gonzalez",
          school: "East Side Community High",
          story: "Went from no internet at home to full scholarship recipient after showcasing talents on UltraPreps",
          impact: "First in family to attend college"
        },
        {
          name: "Jamal Washington", 
          school: "Inner City Prep Academy",
          story: "Used UltraPreps to connect with mentors and build leadership skills",
          impact: "Started community garden feeding 200 families"
        }
      ],
      stats: {
        devicesProvided: 2847,
        familiesConnected: 1923,
        averageGradeImprovement: "2.3 GPA points",
        collegeAcceptanceRate: "94%"
      }
    },
    {
      id: 2,
      title: "Opportunity Scholarship Fund",
      subtitle: "Financial Support & Educational Access",
      description: "Comprehensive scholarship program ensuring financial barriers never prevent student achievement and digital immortality",
      icon: GraduationCap,
      beneficiaries: 8934,
      cost: "Merit-Based Aid",
      eligibility: "Demonstrated Financial Need + Academic/Athletic Merit",
      benefits: [
        "Full college tuition assistance up to $50,000",
        "K-12 private school tuition support",
        "Summer camp and training program funding",
        "Equipment and gear scholarships for sports",
        "Family support services and counseling"
      ],
      successStories: [
        {
          name: "Ashley Chen",
          school: "Roosevelt High School",
          story: "Received $47,000 scholarship after UltraPreps showcased her robotics achievements",
          impact: "Now studying engineering at MIT"
        },
        {
          name: "Marcus Johnson",
          school: "Lincoln Community High",
          story: "Football scholarship + academic support helped him become first doctor in family",
          impact: "Returned to serve his community as pediatrician"
        }
      ],
      stats: {
        scholarshipsAwarded: 1567,
        totalFunding: "$12.3M",
        averageAward: "$18,450",
        graduationRate: "98%"
      }
    },
    {
      id: 3,
      title: "Community Support Network",
      subtitle: "Mentorship & Family Assistance",
      description: "Wraparound support services addressing housing, food security, and family stability to enable student success",
      icon: Heart,
      beneficiaries: 15623,
      cost: "Fully Subsidized",
      eligibility: "Families Experiencing Financial Hardship",
      benefits: [
        "Emergency financial assistance for families",
        "Free meal programs and food security support",
        "Housing assistance and utility bill support",
        "Transportation to athletic events and activities",
        "Mental health counseling and family therapy"
      ],
      successStories: [
        {
          name: "The Rodriguez Family",
          school: "Valley View High School",
          story: "Support prevented eviction, allowing daughter to focus on academics and earn scholarship",
          impact: "Daughter became first-generation college graduate"
        },
        {
          name: "David Park",
          school: "Metro Community High",
          story: "Food assistance and counseling helped him overcome depression and excel in track",
          impact: "State champion + full athletic scholarship"
        }
      ],
      stats: {
        familiesSupported: 3421,
        emergencyAidProvided: "$890,000",
        mealsProvided: 45678,
        counselingHours: 12340
      }
    },
    {
      id: 4,
      title: "Rural Reach Program",
      subtitle: "Connecting Remote Communities",
      description: "Specialized program for rural and geographically isolated communities to ensure equal access to opportunities",
      icon: Globe,
      beneficiaries: 6789,
      cost: "Community Sponsored",
      eligibility: "Rural Schools & Isolated Communities",
      benefits: [
        "Satellite internet installation for entire communities",
        "Mobile coaching units that travel to remote areas",
        "Virtual reality training systems for skill development",
        "Regional tournament transportation assistance",
        "College recruiter video conference sessions"
      ],
      successStories: [
        {
          name: "Sarah Thompson",
          school: "Pine Ridge Rural High",
          story: "Virtual coaching helped her develop basketball skills without leaving 200-person town",
          impact: "D1 scholarship to University of Colorado"
        },
        {
          name: "Jake Miller",
          school: "Mountain View Academy",
          story: "Satellite internet connection enabled online advanced courses",
          impact: "Accepted to engineering program at state university"
        }
      ],
      stats: {
        communitiesConnected: 89,
        satelliteInstallations: 234,
        mobileVisits: 567,
        ruralScholarships: 156
      }
    }
  ];

  const applyForAccess = async () => {
    setIsApplying(true);
    setApplicationProgress(0);

    const steps = [
      "Verifying eligibility requirements...",
      "Assessing community needs...",
      "Matching optimal support programs...",
      "Connecting with local coordinators...",
      "Preparing welcome package...",
      "Welcome to UltraPreps Access!"
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setApplicationProgress(((i + 1) / steps.length) * 100);
      
      // Update metrics during application
      setAccessMetrics(prev => ({
        studentsServed: prev.studentsServed + (i === steps.length - 1 ? 1 : 0),
        schoolsReached: prev.schoolsReached + Math.floor(Math.random() * 2),
        devicesProvided: prev.devicesProvided + Math.floor(Math.random() * 3),
        scholarshipsAwarded: prev.scholarshipsAwarded + Math.floor(Math.random() * 2)
      }));
    }

    setIsApplying(false);
    setApplicationProgress(0);
  };

  const selectedProgramData = accessPrograms[selectedProgram];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-green-900 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Heart className="w-12 h-12 text-red-400" />
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
              ACCESS FOR ALL
            </h1>
            <Shield className="w-12 h-12 text-blue-400" />
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
            Digital Immortality for Every Student - Regardless of Background, Location, or Economic Status
          </p>
          <div className="flex items-center justify-center gap-8 mt-8 text-lg font-bold">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-400" />
              <span>{accessMetrics.studentsServed.toLocaleString()} Students Served</span>
            </div>
            <div className="flex items-center gap-2">
              <Home className="w-6 h-6 text-green-400" />
              <span>{accessMetrics.schoolsReached} Schools Reached</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="w-6 h-6 text-purple-400" />
              <span>{accessMetrics.devicesProvided.toLocaleString()} Devices Provided</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Program Selection */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">Access Programs</h2>
            {accessPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                onClick={() => setSelectedProgram(index)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedProgram === index 
                    ? 'border-blue-400 bg-blue-900/30' 
                    : 'border-gray-600 bg-gray-800/30 hover:border-blue-500'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <program.icon className="w-6 h-6 text-blue-400" />
                  <h3 className="font-bold text-lg">{program.title}</h3>
                </div>
                <p className="text-sm text-gray-300 mb-2">{program.subtitle}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {program.beneficiaries.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    {program.cost}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Program Details */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-blue-400 mb-2">{selectedProgramData.title}</h2>
                <p className="text-gray-300 text-lg mb-4">{selectedProgramData.description}</p>
                <div className="flex items-center gap-6 text-sm">
                  <span className="flex items-center gap-2 text-green-400 font-bold">
                    <CheckCircle className="w-4 h-4" />
                    {selectedProgramData.cost}
                  </span>
                  <span className="text-blue-400">{selectedProgramData.eligibility}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-400">{selectedProgramData.beneficiaries.toLocaleString()}</div>
                <div className="text-sm text-gray-300">Students Helped</div>
              </div>
            </div>

            {/* Program Benefits */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Program Benefits</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {selectedProgramData.benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-green-900/20 p-3 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Success Stories */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Success Stories</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {selectedProgramData.successStories.map((story, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <div>
                        <h4 className="font-bold">{story.name}</h4>
                        <p className="text-sm text-gray-300">{story.school}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{story.story}</p>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400 font-medium">{story.impact}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Program Statistics */}
            <div className="grid md:grid-cols-4 gap-4">
              {Object.entries(selectedProgramData.stats).map(([key, value], index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-4 rounded-lg text-center"
                >
                  <div className="text-2xl font-bold text-blue-400 mb-1">{value}</div>
                  <div className="text-sm text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Application Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-blue-900/50 to-green-900/50 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-blue-400">Apply for Access Program</h3>
            <p className="text-gray-300 mb-6">Every student deserves their shot at digital immortality. Financial barriers should never prevent achievement.</p>
            
            <motion.button
              onClick={applyForAccess}
              disabled={isApplying}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-500 hover:to-green-500 transition-all flex items-center gap-3 mx-auto disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isApplying ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                  Processing Application...
                </>
              ) : (
                <>
                  <Play className="w-6 h-6" />
                  Apply for Free Access
                </>
              )}
            </motion.button>

            {isApplying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6"
              >
                <div className="bg-gray-800 rounded-full h-3 mb-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full"
                    style={{ width: `${applicationProgress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${applicationProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-300">Connecting you to opportunities...</p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Impact Statistics */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">Our Commitment to Access</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              className="bg-gradient-to-br from-blue-900/30 to-green-900/30 p-6 rounded-xl text-center"
              whileHover={{ scale: 1.05 }}
            >
              <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-gray-300">Free for Qualified Students</div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-green-900/30 to-purple-900/30 p-6 rounded-xl text-center"
              whileHover={{ scale: 1.05 }}
            >
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-gray-300">Support in Multiple Languages</div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 p-6 rounded-xl text-center"
              whileHover={{ scale: 1.05 }}
            >
              <Globe className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-purple-400 mb-2">All 50</div>
              <div className="text-gray-300">States Covered</div>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-blue-900/30 to-green-900/30 p-6 rounded-xl text-center"
              whileHover={{ scale: 1.05 }}
            >
              <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <div className="text-3xl font-bold text-yellow-400 mb-2">98%</div>
              <div className="text-gray-300">Success Rate</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 text-center"
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            Back to UltraPreps Universe
          </Link>
        </motion.div>
      </div>

      {/* Application Animation Overlay */}
      <AnimatePresence>
        {isApplying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-8"
              />
              <h2 className="text-3xl font-bold text-blue-400 mb-4">Opening Doors to Opportunity</h2>
              <p className="text-gray-300 text-lg">Building bridges to your digital future...</p>
              <div className="mt-6 text-2xl font-bold text-white">
                {applicationProgress.toFixed(0)}% Complete
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}