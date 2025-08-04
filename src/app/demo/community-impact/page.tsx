'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Globe, Users, TreePine, BookOpen, Home, 
  TrendingUp, Award, ArrowRight, Play, Target,
  Clock, MapPin, DollarSign, CheckCircle, Star,
  Zap, Sparkles, Crown, Trophy, Shield
} from 'lucide-react';
import Link from 'next/link';

export default function CommunityImpactDemo() {
  const [selectedProject, setSelectedProject] = useState(0);
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchProgress, setLaunchProgress] = useState(0);
  const [impactMetrics, setImpactMetrics] = useState({
    livesChanged: 2847,
    dollarsRaised: 156789,
    hoursVolunteered: 12403,
    projectsActive: 89
  });

  // Demo community impact projects
  const communityProjects = [
    {
      id: 1,
      title: "Clean Water Initiative",
      category: "Environmental Impact",
      description: "Student-athletes leading community water conservation and clean-up efforts",
      studentLeader: "Maria Rodriguez",
      school: "Riverside High School",
      participants: 247,
      hoursLogged: 1856,
      fundsRaised: 12450,
      impactArea: "Environmental Sustainability",
      timeline: "6 months active",
      achievements: [
        "Cleaned 12 miles of riverbank",
        "Planted 500 trees",
        "Reduced local pollution by 23%",
        "Engaged 8 elementary schools"
      ],
      nextGoals: [
        "Partner with city water department",
        "Expand to neighboring districts",
        "Create educational curriculum",
        "Launch water quality monitoring"
      ],
      socialMedia: {
        posts: 156,
        followers: 2847,
        engagement: 94.2
      }
    },
    {
      id: 2,
      title: "Literacy Champions Network",
      category: "Educational Equity",
      description: "High school athletes mentoring elementary students in reading and academics",
      studentLeader: "Jordan Thompson",
      school: "Central Valley Academy",
      participants: 89,
      hoursLogged: 2340,
      fundsRaised: 8750,
      impactArea: "Educational Access",
      timeline: "8 months active",
      achievements: [
        "Improved reading scores by 34%",
        "Mentored 156 elementary students",
        "Donated 2,400 books",
        "Created 12 reading spaces"
      ],
      nextGoals: [
        "Expand to middle schools",
        "Launch summer reading camps",
        "Partner with local libraries",
        "Create digital literacy program"
      ],
      socialMedia: {
        posts: 203,
        followers: 1967,
        engagement: 91.7
      }
    },
    {
      id: 3,
      title: "Senior Support Squad",
      category: "Community Care",
      description: "Student-athletes providing technology help and companionship to elderly residents",
      studentLeader: "Alex Chen",
      school: "Northside Prep",
      participants: 134,
      hoursLogged: 1678,
      fundsRaised: 6890,
      impactArea: "Intergenerational Connection",
      timeline: "4 months active",
      achievements: [
        "Supported 89 senior citizens",
        "Taught 67 technology classes",
        "Delivered 450 meals",
        "Created 23 digital photo albums"
      ],
      nextGoals: [
        "Launch virtual reality experiences",
        "Expand to assisted living facilities",
        "Create intergenerational sports leagues",
        "Develop senior fitness programs"
      ],
      socialMedia: {
        posts: 178,
        followers: 1523,
        engagement: 96.3
      }
    }
  ];

  const impactCategories = [
    { name: "Environmental", icon: TreePine, projects: 23, impact: "12,450 trees planted" },
    { name: "Education", icon: BookOpen, projects: 31, impact: "4,200 students helped" },
    { name: "Community Care", icon: Heart, projects: 18, impact: "890 families supported" },
    { name: "Social Justice", icon: Shield, projects: 12, impact: "15 policy changes" },
    { name: "Health & Wellness", icon: Heart, projects: 27, impact: "2,100 health screenings" },
    { name: "Economic Development", icon: TrendingUp, projects: 14, impact: "$89,000 local investment" }
  ];

  const launchProject = async () => {
    setIsLaunching(true);
    setLaunchProgress(0);

    const steps = [
      "Analyzing community needs...",
      "Connecting student leaders...",
      "Building volunteer network...",
      "Setting impact goals...",
      "Creating action plan...",
      "Launching project!"
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setLaunchProgress(((i + 1) / steps.length) * 100);
      
      // Update metrics during launch
      setImpactMetrics(prev => ({
        livesChanged: prev.livesChanged + Math.floor(Math.random() * 50),
        dollarsRaised: prev.dollarsRaised + Math.floor(Math.random() * 1000),
        hoursVolunteered: prev.hoursVolunteered + Math.floor(Math.random() * 100),
        projectsActive: prev.projectsActive + (i === steps.length - 1 ? 1 : 0)
      }));
    }

    setIsLaunching(false);
    setLaunchProgress(0);
  };

  const selectedProjectData = communityProjects[selectedProject];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Globe className="w-12 h-12 text-green-400" />
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              COMMUNITY IMPACT HUB
            </h1>
            <Heart className="w-12 h-12 text-red-400" />
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
            Where Student-Athletes Become Community Changemakers - Digital Immortality for Social Impact
          </p>
          <div className="flex items-center justify-center gap-8 mt-8 text-lg font-bold">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-400" />
              <span>{impactMetrics.livesChanged.toLocaleString()} Lives Changed</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-green-400" />
              <span>${impactMetrics.dollarsRaised.toLocaleString()} Raised</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-6 h-6 text-blue-400" />
              <span>{impactMetrics.hoursVolunteered.toLocaleString()} Hours</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Project Selection */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-green-400">Active Projects</h2>
            {communityProjects.map((project, index) => (
              <motion.div
                key={project.id}
                onClick={() => setSelectedProject(index)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedProject === index 
                    ? 'border-green-400 bg-green-900/30' 
                    : 'border-gray-600 bg-gray-800/30 hover:border-green-500'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <h3 className="font-bold text-lg">{project.title}</h3>
                </div>
                <p className="text-sm text-gray-300 mb-2">{project.category}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {project.participants}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {project.hoursLogged}h
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Project Details */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-green-400 mb-2">{selectedProjectData.title}</h2>
                <p className="text-gray-300 text-lg mb-4">{selectedProjectData.description}</p>
                <div className="flex items-center gap-6 text-sm">
                  <span className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    Led by {selectedProjectData.studentLeader}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    {selectedProjectData.school}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-green-400">{selectedProjectData.participants}</div>
                <div className="text-sm text-gray-300">Participants</div>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-900/30 p-4 rounded-lg text-center">
                <Clock className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{selectedProjectData.hoursLogged}</div>
                <div className="text-sm text-gray-300">Hours Volunteered</div>
              </div>
              <div className="bg-blue-900/30 p-4 rounded-lg text-center">
                <DollarSign className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">${selectedProjectData.fundsRaised.toLocaleString()}</div>
                <div className="text-sm text-gray-300">Funds Raised</div>
              </div>
              <div className="bg-purple-900/30 p-4 rounded-lg text-center">
                <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{selectedProjectData.socialMedia.engagement}%</div>
                <div className="text-sm text-gray-300">Engagement Rate</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-green-400">Major Achievements</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {selectedProjectData.achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-green-900/20 p-3 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm">{achievement}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Next Goals */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Upcoming Goals</h3>
              <div className="space-y-2">
                {selectedProjectData.nextGoals.map((goal, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-blue-900/20 p-3 rounded-lg"
                  >
                    <Target className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <span className="text-sm">{goal}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Impact Categories */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-green-400">Community Impact Areas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600 hover:border-green-400 transition-all group hover:scale-105"
                whileHover={{ y: -5 }}
              >
                <category.icon className="w-12 h-12 text-green-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <div className="text-2xl font-bold text-green-400 mb-1">{category.projects}</div>
                <div className="text-sm text-gray-300 mb-3">Active Projects</div>
                <div className="text-sm text-blue-300">{category.impact}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Launch New Project */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 backdrop-blur-sm p-8 rounded-xl border border-green-500/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-green-400">Launch New Community Project</h3>
            <p className="text-gray-300 mb-6">Join the movement of student-athletes creating lasting social impact in their communities.</p>
            
            <motion.button
              onClick={launchProject}
              disabled={isLaunching}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-green-500 hover:to-blue-500 transition-all flex items-center gap-3 mx-auto disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLaunching ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                  Launching Project...
                </>
              ) : (
                <>
                  <Play className="w-6 h-6" />
                  Start New Impact Project
                </>
              )}
            </motion.button>

            {isLaunching && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6"
              >
                <div className="bg-gray-800 rounded-full h-3 mb-2">
                  <motion.div
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                    style={{ width: `${launchProgress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${launchProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-300">Building community connections...</p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors font-medium"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            Back to UltraPreps Universe
          </Link>
        </motion.div>
      </div>

      {/* Launch Animation Overlay */}
      <AnimatePresence>
        {isLaunching && (
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
                className="w-32 h-32 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-8"
              />
              <h2 className="text-3xl font-bold text-green-400 mb-4">Building Community Impact</h2>
              <p className="text-gray-300 text-lg">Connecting student changemakers...</p>
              <div className="mt-6 text-2xl font-bold text-white">
                {launchProgress.toFixed(0)}% Complete
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}