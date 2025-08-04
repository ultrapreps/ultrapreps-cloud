'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, Users, Star, Trophy, Heart, Shield,
  Zap, Crown, Target, TrendingUp, Award, Medal,
  ArrowRight, Play, CheckCircle, Clock, Map,
  Lightbulb, Flame, Sparkles, Eye, Book, Home
} from 'lucide-react';
import Link from 'next/link';

export default function GlobalImpactDemo() {
  const [selectedRegion, setSelectedRegion] = useState(0);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionProgress, setConnectionProgress] = useState(0);
  const [globalMetrics, setGlobalMetrics] = useState({
    activeChangemakers: 47892,
    countriesConnected: 89,
    projectsLaunched: 2847,
    livesImpacted: 1247389
  });

  // Global regions with changemaker networks
  const globalRegions = [
    {
      id: 1,
      name: "North America",
      countries: ["United States", "Canada", "Mexico"],
      activeChangemakers: 15678,
      majorProjects: [
        {
          title: "Climate Action Youth Alliance",
          leader: "Emma Rodriguez (Texas, USA)",
          participants: 2847,
          countries: 3,
          impact: "Reduced carbon emissions by 45,000 tons",
          description: "Student-athletes leading renewable energy initiatives across North American schools"
        },
        {
          title: "Indigenous Sports Heritage Project",
          leader: "Joseph Blackhorse (Alberta, Canada)",
          participants: 1234,
          countries: 2,
          impact: "Preserved 23 traditional sports and connected 89 tribes",
          description: "Preserving indigenous athletic traditions while building modern opportunities"
        }
      ],
      upcomingInitiatives: [
        "Youth Olympics Preparation Alliance",
        "Cross-Border Leadership Exchange",
        "Sustainable Athletics Initiative"
      ],
      connectionStrength: 94
    },
    {
      id: 2,
      name: "Europe & UK",
      countries: ["United Kingdom", "Germany", "France", "Netherlands", "Spain", "Italy"],
      activeChangemakers: 12456,
      majorProjects: [
        {
          title: "European Unity Through Sport",
          leader: "Alessandro Rossi (Rome, Italy)",
          participants: 3456,
          countries: 6,
          impact: "Connected 156 schools across language barriers",
          description: "Using sports as universal language to build European youth unity"
        },
        {
          title: "Refugee Athlete Integration Network",
          leader: "Fatima Al-Hassan (London, UK)",
          participants: 897,
          countries: 4,
          impact: "Integrated 234 refugee athletes into local teams",
          description: "Creating pathways for refugee youth through athletic opportunity"
        }
      ],
      upcomingInitiatives: [
        "Multi-Language Coaching Exchange",
        "European Youth Parliament Sports Committee",
        "Cultural Athletic Heritage Festival"
      ],
      connectionStrength: 91
    },
    {
      id: 3,
      name: "Asia Pacific",
      countries: ["Japan", "South Korea", "Australia", "New Zealand", "Singapore", "Taiwan"],
      activeChangemakers: 9876,
      majorProjects: [
        {
          title: "Asia Pacific Leadership Circle",
          leader: "Yuki Tanaka (Tokyo, Japan)",
          participants: 2156,
          countries: 6,
          impact: "Developed 67 future leaders across Pacific region",
          description: "Cross-cultural leadership development through athletic excellence"
        },
        {
          title: "Ocean Conservation Athletic Alliance",
          leader: "Sophie Chen (Sydney, Australia)",
          participants: 1678,
          countries: 4,
          impact: "Cleaned 1,200 miles of coastline",
          description: "Surfers, swimmers, and water sport athletes protecting ocean environments"
        }
      ],
      upcomingInitiatives: [
        "Pacific Games Youth Movement",
        "Technology Innovation Sports Hub",
        "Traditional vs Modern Athletic Integration"
      ],
      connectionStrength: 88
    },
    {
      id: 4,
      name: "Africa",
      countries: ["South Africa", "Kenya", "Nigeria", "Ghana", "Egypt", "Morocco"],
      activeChangemakers: 6789,
      majorProjects: [
        {
          title: "African Youth Athletic Renaissance",
          leader: "Amara Okafor (Lagos, Nigeria)",
          participants: 4567,
          countries: 6,
          impact: "Built 89 new athletic facilities in underserved areas",
          description: "Harnessing Africa's athletic talent to build infrastructure and opportunity"
        },
        {
          title: "Education Through Sport Initiative",
          leader: "Kesi Mbeki (Cape Town, South Africa)",
          participants: 3245,
          countries: 4,
          impact: "Improved literacy rates by 34% in participating communities",
          description: "Using athletic programs to drive educational achievement across Africa"
        }
      ],
      upcomingInitiatives: [
        "African Games Youth Preparation",
        "Athletic Scholarship Continental Network",
        "Rural Sports Development Program"
      ],
      connectionStrength: 85
    },
    {
      id: 5,
      name: "Latin America",
      countries: ["Brazil", "Argentina", "Colombia", "Chile", "Peru", "Uruguay"],
      activeChangemakers: 8234,
      majorProjects: [
        {
          title: "Football for Social Change",
          leader: "Carlos Silva (São Paulo, Brazil)",
          participants: 5678,
          countries: 6,
          impact: "Reduced youth crime by 42% in participating neighborhoods",
          description: "Using football passion to create positive social change across Latin America"
        },
        {
          title: "Indigenous Athletic Heritage Preservation",
          leader: "Maria Quispe (Cusco, Peru)",
          participants: 1897,
          countries: 5,
          impact: "Documented and preserved 45 traditional sports",
          description: "Connecting indigenous athletic traditions with modern sports science"
        }
      ],
      upcomingInitiatives: [
        "Copa América Youth Leadership",
        "Andean Athletic Alliance",
        "Amazon Conservation Sports Network"
      ],
      connectionStrength: 87
    },
    {
      id: 6,
      name: "Middle East",
      countries: ["UAE", "Jordan", "Lebanon", "Saudi Arabia", "Kuwait", "Bahrain"],
      activeChangemakers: 4567,
      majorProjects: [
        {
          title: "Peace Through Athletic Diplomacy",
          leader: "Omar Al-Rashid (Dubai, UAE)",
          participants: 2134,
          countries: 6,
          impact: "Facilitated 23 peace-building athletic exchanges",
          description: "Building bridges across cultural and political divides through sport"
        },
        {
          title: "Desert Sports Innovation Lab",
          leader: "Layla Hassan (Amman, Jordan)",
          participants: 1456,
          countries: 4,
          impact: "Developed 12 heat-resistant training technologies",
          description: "Innovating athletic training for extreme climate conditions"
        }
      ],
      upcomingInitiatives: [
        "Regional Athletic Technology Exchange",
        "Cultural Athletic Festival Network",
        "Youth Peace Ambassador Program"
      ],
      connectionStrength: 82
    }
  ];

  const connectToNetwork = async () => {
    setIsConnecting(true);
    setConnectionProgress(0);

    const steps = [
      "Scanning global changemaker networks...",
      "Identifying aligned project opportunities...",
      "Matching skills with global needs...",
      "Establishing secure communication channels...",
      "Creating collaborative project spaces...",
      "Welcome to the Global Impact Network!"
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setConnectionProgress(((i + 1) / steps.length) * 100);
      
      // Update metrics during connection
      setGlobalMetrics(prev => ({
        activeChangemakers: prev.activeChangemakers + Math.floor(Math.random() * 20),
        countriesConnected: prev.countriesConnected + Math.floor(Math.random() * 2),
        projectsLaunched: prev.projectsLaunched + Math.floor(Math.random() * 5),
        livesImpacted: prev.livesImpacted + Math.floor(Math.random() * 1000)
      }));
    }

    setIsConnecting(false);
    setConnectionProgress(0);
  };

  const selectedRegionData = globalRegions[selectedRegion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-green-900 to-teal-900 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-96 h-96 bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Globe className="w-12 h-12 text-blue-400" />
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-green-400 to-teal-400 bg-clip-text text-transparent">
              GLOBAL IMPACT NETWORK
            </h1>
            <Heart className="w-12 h-12 text-red-400" />
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
            Where Student-Athletes Unite Worldwide to Create Immortal Social Change
          </p>
          <div className="flex items-center justify-center gap-8 mt-8 text-lg font-bold">
            <div className="flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-400" />
              <span>{globalMetrics.activeChangemakers.toLocaleString()} Active Changemakers</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-green-400" />
              <span>{globalMetrics.countriesConnected} Countries Connected</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-red-400" />
              <span>{globalMetrics.livesImpacted.toLocaleString()} Lives Impacted</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Region Selection */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-blue-400">Global Regions</h2>
            {globalRegions.map((region, index) => (
              <motion.div
                key={region.id}
                onClick={() => setSelectedRegion(index)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedRegion === index 
                    ? 'border-blue-400 bg-blue-900/30' 
                    : 'border-gray-600 bg-gray-800/30 hover:border-blue-500'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Globe className="w-6 h-6 text-blue-400" />
                  <h3 className="font-bold text-lg">{region.name}</h3>
                </div>
                <p className="text-sm text-gray-300 mb-2">{region.countries.length} Countries</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {region.activeChangemakers.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {region.connectionStrength}%
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Region Details */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-blue-400 mb-2">{selectedRegionData.name}</h2>
                <p className="text-gray-300 text-lg mb-4">
                  Connected Countries: {selectedRegionData.countries.join(", ")}
                </p>
                <div className="flex items-center gap-6 text-sm">
                  <span className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    {selectedRegionData.connectionStrength}% Network Strength
                  </span>
                  <span className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-green-400" />
                    {selectedRegionData.activeChangemakers.toLocaleString()} Active Members
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-400">{selectedRegionData.majorProjects.length}</div>
                <div className="text-sm text-gray-300">Major Projects</div>
              </div>
            </div>

            {/* Major Projects */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-green-400">Major Impact Projects</h3>
              <div className="space-y-4">
                {selectedRegionData.majorProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/30 p-5 rounded-lg border border-gray-600"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Trophy className="w-6 h-6 text-yellow-400" />
                        <h4 className="font-bold text-lg">{project.title}</h4>
                      </div>
                      <div className="text-right text-sm">
                        <div className="text-green-400 font-bold">{project.participants.toLocaleString()} Participants</div>
                        <div className="text-gray-300">{project.countries} Countries</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-3">
                      <Star className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400 font-medium">Led by {project.leader}</span>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                    
                    <div className="bg-green-900/20 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-bold text-sm">Impact Achievement</span>
                      </div>
                      <p className="text-green-300 text-sm">{project.impact}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Upcoming Initiatives */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-purple-400">Upcoming Initiatives</h3>
              <div className="grid md:grid-cols-3 gap-3">
                {selectedRegionData.upcomingInitiatives.map((initiative, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-purple-900/20 p-3 rounded-lg"
                  >
                    <Target className="w-5 h-5 text-purple-400 flex-shrink-0" />
                    <span className="text-sm">{initiative}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Network Visualization */}
            <div className="bg-gradient-to-br from-blue-900/20 to-green-900/20 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-blue-400">Live Network Activity</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center animate-pulse">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-gray-300">Active Now</div>
                  <div className="text-xl font-bold text-blue-400">2,847</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-2 flex items-center justify-center animate-pulse">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-gray-300">New Ideas</div>
                  <div className="text-xl font-bold text-green-400">156</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-yellow-500 rounded-full mx-auto mb-2 flex items-center justify-center animate-pulse">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-gray-300">Projects Launched</div>
                  <div className="text-xl font-bold text-yellow-400">89</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center animate-pulse">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-gray-300">Lives Changed</div>
                  <div className="text-xl font-bold text-red-400">12,450</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Join Network Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-blue-900/50 to-green-900/50 backdrop-blur-sm p-8 rounded-xl border border-blue-500/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-blue-400">Join the Global Impact Network</h3>
            <p className="text-gray-300 mb-6">Connect with student changemakers worldwide. Create projects that span continents. Build digital immortality through global social impact.</p>
            
            <motion.button
              onClick={connectToNetwork}
              disabled={isConnecting}
              className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-500 hover:to-green-500 transition-all flex items-center gap-3 mx-auto disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isConnecting ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                  Connecting to Network...
                </>
              ) : (
                <>
                  <Play className="w-6 h-6" />
                  Connect Globally
                </>
              )}
            </motion.button>

            {isConnecting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6"
              >
                <div className="bg-gray-800 rounded-full h-3 mb-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full"
                    style={{ width: `${connectionProgress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${connectionProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-300">Building global connections...</p>
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
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            Back to UltraPreps Universe
          </Link>
        </motion.div>
      </div>

      {/* Connection Animation Overlay */}
      <AnimatePresence>
        {isConnecting && (
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
              <h2 className="text-3xl font-bold text-blue-400 mb-4">Connecting to Global Network</h2>
              <p className="text-gray-300 text-lg">Building bridges across continents...</p>
              <div className="mt-6 text-2xl font-bold text-white">
                {connectionProgress.toFixed(0)}% Complete
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}