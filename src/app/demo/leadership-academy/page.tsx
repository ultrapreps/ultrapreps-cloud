'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, Users, Target, TrendingUp, Award, Star,
  Brain, Shield, Globe, Zap, Trophy, CheckCircle,
  ArrowRight, Play, Clock, DollarSign, BarChart3,
  Lightbulb, Heart, Medal, Flame, Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function LeadershipAcademyDemo() {
  const [selectedTrack, setSelectedTrack] = useState(0);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentProgress, setEnrollmentProgress] = useState(0);
  const [leadershipMetrics, setLeadershipMetrics] = useState({
    leadersGraduated: 1247,
    companiesStarted: 89,
    scholarshipsEarned: 234,
    communitiesImpacted: 567
  });

  // Leadership Development Tracks
  const leadershipTracks = [
    {
      id: 1,
      title: "Future CEO Academy",
      subtitle: "Business & Entrepreneurship Leadership",
      description: "Transform student-athletes into future business leaders and entrepreneurs who change industries",
      mentor: "Sara Blakely",
      mentorTitle: "Spanx Founder & Billionaire Entrepreneur",
      duration: "12 months intensive",
      graduates: 156,
      successRate: 94.7,
      averageImpact: "$2.3M in business value created",
      modules: [
        {
          title: "Entrepreneurial Mindset",
          description: "Learn to identify opportunities, take calculated risks, and innovate",
          duration: "4 weeks",
          skills: ["Opportunity Recognition", "Risk Assessment", "Innovation Thinking", "Market Analysis"]
        },
        {
          title: "Business Strategy & Execution",
          description: "Master strategic planning, team building, and operational excellence",
          duration: "6 weeks", 
          skills: ["Strategic Planning", "Team Leadership", "Operations", "Financial Management"]
        },
        {
          title: "Leadership Under Pressure",
          description: "Athletic pressure translates to business leadership in high-stakes situations",
          duration: "4 weeks",
          skills: ["Crisis Management", "Decision Making", "Stress Leadership", "Performance Under Pressure"]
        },
        {
          title: "Scale & Impact",
          description: "Build systems that create lasting change and generational wealth",
          duration: "6 weeks",
          skills: ["Scaling Systems", "Impact Measurement", "Wealth Building", "Legacy Creation"]
        }
      ],
      careerPaths: [
        "Startup Founder",
        "Fortune 500 CEO",
        "Private Equity Partner",
        "Venture Capitalist",
        "Social Entrepreneur"
      ],
      achievements: [
        "23 startups launched by graduates",
        "$45M in total funding raised",
        "89% of graduates in leadership roles within 2 years",
        "14 companies valued over $1M"
      ]
    },
    {
      id: 2,
      title: "Political Leadership Institute",
      subtitle: "Public Service & Governance",
      description: "Develop student-athletes into ethical public servants and political leaders who serve communities",
      mentor: "Barack Obama",
      mentorTitle: "44th President of the United States",
      duration: "10 months comprehensive",
      graduates: 203,
      successRate: 97.2,
      averageImpact: "2.1M citizens positively impacted",
      modules: [
        {
          title: "Ethical Leadership Foundation",
          description: "Build unshakeable ethical foundation for public service",
          duration: "3 weeks",
          skills: ["Ethical Decision Making", "Moral Leadership", "Integrity Under Pressure", "Character Building"]
        },
        {
          title: "Community Organizing",
          description: "Learn grassroots organizing, coalition building, and community mobilization",
          duration: "5 weeks",
          skills: ["Grassroots Organizing", "Coalition Building", "Community Engagement", "Social Movement"]
        },
        {
          title: "Policy & Governance",
          description: "Master policy creation, legislative processes, and effective governance",
          duration: "8 weeks",
          skills: ["Policy Development", "Legislative Process", "Governance Systems", "Public Administration"]
        },
        {
          title: "Campaign & Communication",
          description: "Build skills in political communication, campaign management, and public speaking",
          duration: "6 weeks",
          skills: ["Public Speaking", "Campaign Strategy", "Media Relations", "Digital Communication"]
        }
      ],
      careerPaths: [
        "City Council Member",
        "State Representative",
        "Congressional Representative",
        "Governor/Senator",
        "Presidential Candidate"
      ],
      achievements: [
        "12 graduates currently in elected office",
        "34 graduates running successful campaigns",
        "156 community organizing victories",
        "89% community approval ratings"
      ]
    },
    {
      id: 3,
      title: "Social Impact Changemakers",
      subtitle: "Non-Profit & Social Justice Leadership",
      description: "Empower student-athletes to lead social movements and create systemic change for justice",
      mentor: "Malala Yousafzai",
      mentorTitle: "Nobel Peace Prize Winner & Education Activist",
      duration: "8 months mission-focused",
      graduates: 312,
      successRate: 96.1,
      averageImpact: "47,000 lives directly improved",
      modules: [
        {
          title: "Social Justice Foundations",
          description: "Understand systemic issues, root causes, and effective intervention strategies",
          duration: "4 weeks",
          skills: ["Social Analysis", "Systemic Thinking", "Justice Theory", "Historical Context"]
        },
        {
          title: "Movement Building",
          description: "Learn to build and lead social movements for lasting change",
          duration: "6 weeks",
          skills: ["Movement Strategy", "Coalition Building", "Protest Organization", "Digital Activism"]
        },
        {
          title: "Non-Profit Leadership",
          description: "Master non-profit management, fundraising, and sustainable impact",
          duration: "5 weeks",
          skills: ["Non-Profit Management", "Fundraising", "Grant Writing", "Board Development"]
        },
        {
          title: "Global Impact Scaling",
          description: "Scale local solutions to global impact and sustainable change",
          duration: "7 weeks",
          skills: ["Global Strategy", "Cross-Cultural Leadership", "Impact Scaling", "Sustainable Change"]
        }
      ],
      careerPaths: [
        "Non-Profit Executive Director",
        "Social Movement Leader",
        "International Development Director",
        "Human Rights Advocate",
        "Social Justice Lawyer"
      ],
      achievements: [
        "67 non-profits founded by graduates",
        "$12M in social impact funding secured",
        "234,000 people reached by graduate programs",
        "23 policy changes influenced by graduates"
      ]
    }
  ];

  const enrollInAcademy = async () => {
    setIsEnrolling(true);
    setEnrollmentProgress(0);

    const steps = [
      "Analyzing leadership potential...",
      "Matching with optimal mentor...",
      "Creating personalized curriculum...",
      "Building peer network...",
      "Setting impact goals...",
      "Welcome to Leadership Academy!"
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setEnrollmentProgress(((i + 1) / steps.length) * 100);
      
      // Update metrics during enrollment
      setLeadershipMetrics(prev => ({
        leadersGraduated: prev.leadersGraduated + (i === steps.length - 1 ? 1 : 0),
        companiesStarted: prev.companiesStarted + Math.floor(Math.random() * 2),
        scholarshipsEarned: prev.scholarshipsEarned + Math.floor(Math.random() * 3),
        communitiesImpacted: prev.communitiesImpacted + Math.floor(Math.random() * 10)
      }));
    }

    setIsEnrolling(false);
    setEnrollmentProgress(0);
  };

  const selectedTrackData = leadershipTracks[selectedTrack];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Crown className="w-12 h-12 text-yellow-400" />
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              LEADERSHIP ACADEMY
            </h1>
            <Trophy className="w-12 h-12 text-purple-400" />
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
            Where Student-Athletes Become Future Presidents, CEOs, and World Changers
          </p>
          <div className="flex items-center justify-center gap-8 mt-8 text-lg font-bold">
            <div className="flex items-center gap-2">
              <Crown className="w-6 h-6 text-yellow-400" />
              <span>{leadershipMetrics.leadersGraduated.toLocaleString()} Leaders Graduated</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <span>{leadershipMetrics.companiesStarted} Companies Started</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-blue-400" />
              <span>{leadershipMetrics.communitiesImpacted} Communities Impacted</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Track Selection */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-purple-400">Leadership Tracks</h2>
            {leadershipTracks.map((track, index) => (
              <motion.div
                key={track.id}
                onClick={() => setSelectedTrack(index)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedTrack === index 
                    ? 'border-purple-400 bg-purple-900/30' 
                    : 'border-gray-600 bg-gray-800/30 hover:border-purple-500'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Crown className="w-6 h-6 text-yellow-400" />
                  <h3 className="font-bold text-lg">{track.title}</h3>
                </div>
                <p className="text-sm text-gray-300 mb-2">{track.subtitle}</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {track.graduates}
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {track.successRate}%
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Track Details */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-purple-400 mb-2">{selectedTrackData.title}</h2>
                <p className="text-gray-300 text-lg mb-4">{selectedTrackData.description}</p>
                <div className="flex items-center gap-6 text-sm">
                  <span className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    Led by {selectedTrackData.mentor}
                  </span>
                  <span className="text-blue-400">{selectedTrackData.mentorTitle}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-purple-400">{selectedTrackData.successRate}%</div>
                <div className="text-sm text-gray-300">Success Rate</div>
              </div>
            </div>

            {/* Impact Metrics */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-purple-900/30 p-4 rounded-lg text-center">
                <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{selectedTrackData.graduates}</div>
                <div className="text-sm text-gray-300">Graduates</div>
              </div>
              <div className="bg-blue-900/30 p-4 rounded-lg text-center">
                <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{selectedTrackData.duration}</div>
                <div className="text-sm text-gray-300">Program Length</div>
              </div>
              <div className="bg-green-900/30 p-4 rounded-lg text-center">
                <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">{selectedTrackData.averageImpact}</div>
                <div className="text-sm text-gray-300">Average Impact</div>
              </div>
            </div>

            {/* Learning Modules */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-purple-400">Learning Modules</h3>
              <div className="space-y-4">
                {selectedTrackData.modules.map((module, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/30 p-4 rounded-lg border border-gray-600"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg">{module.title}</h4>
                      <span className="text-sm text-blue-400">{module.duration}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{module.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {module.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Career Paths */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-blue-400">Career Paths</h3>
                <div className="space-y-2">
                  {selectedTrackData.careerPaths.map((path, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 bg-blue-900/20 p-3 rounded-lg"
                    >
                      <Target className="w-5 h-5 text-blue-400 flex-shrink-0" />
                      <span className="text-sm">{path}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-400">Graduate Achievements</h3>
                <div className="space-y-2">
                  {selectedTrackData.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 bg-green-900/20 p-3 rounded-lg"
                    >
                      <Trophy className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-sm">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enrollment Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-purple-400">Enroll in Leadership Academy</h3>
            <p className="text-gray-300 mb-6">Join the next generation of leaders who will shape the future of business, politics, and social change.</p>
            
            <motion.button
              onClick={enrollInAcademy}
              disabled={isEnrolling}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-500 hover:to-blue-500 transition-all flex items-center gap-3 mx-auto disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isEnrolling ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                  Enrolling in Academy...
                </>
              ) : (
                <>
                  <Play className="w-6 h-6" />
                  Begin Leadership Journey
                </>
              )}
            </motion.button>

            {isEnrolling && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6"
              >
                <div className="bg-gray-800 rounded-full h-3 mb-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
                    style={{ width: `${enrollmentProgress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${enrollmentProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-300">Building your leadership path...</p>
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
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            Back to UltraPreps Universe
          </Link>
        </motion.div>
      </div>

      {/* Enrollment Animation Overlay */}
      <AnimatePresence>
        {isEnrolling && (
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
                className="w-32 h-32 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-8"
              />
              <h2 className="text-3xl font-bold text-purple-400 mb-4">Welcome to Leadership Academy</h2>
              <p className="text-gray-300 text-lg">Building tomorrow's leaders...</p>
              <div className="mt-6 text-2xl font-bold text-white">
                {enrollmentProgress.toFixed(0)}% Complete
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}