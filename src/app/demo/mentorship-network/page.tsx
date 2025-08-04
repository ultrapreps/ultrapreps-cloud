'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, Crown, Star, Heart, TrendingUp, Trophy, Target, Zap,
  MessageCircle, Phone, Video, Calendar, ArrowRight, Shield,
  GraduationCap, Briefcase, DollarSign, Globe, Award, Flame,
  Clock, Eye, Brain, Sparkles, BookOpen, Map, Camera, Share
} from 'lucide-react';
import Link from 'next/link';

export default function MentorshipNetworkDemo() {
  const [selectedMentor, setSelectedMentor] = useState(0);
  const [activeMentorships, setActiveMentorships] = useState(1247);
  const [liveConnections, setLiveConnections] = useState(89);
  const [successStories, setSuccessStories] = useState(2847);
  const [scholarshipsSecured, setScholarshipsSecured] = useState(1823);
  const [careerPlacements, setCareerPlacements] = useState(456);
  const [connectionStatus, setConnectionStatus] = useState('available');

  // Real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMentorships(prev => prev + Math.floor(Math.random() * 3));
      setLiveConnections(prev => prev + Math.floor(Math.random() * 2) - 1);
      setSuccessStories(prev => prev + Math.floor(Math.random() * 2));
      
      if (Math.random() < 0.1) {
        setScholarshipsSecured(prev => prev + 1);
      }
      if (Math.random() < 0.05) {
        setCareerPlacements(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const mentors = [
    {
      id: 1,
      name: "Michael Jordan",
      title: "NBA Legend & Business Mogul",
      company: "Jordan Brand / Charlotte Hornets",
      expertise: ["Athletic Excellence", "Business Development", "Brand Building", "Leadership"],
      experience: "6x NBA Champion, Global Icon, Billion-Dollar Business Empire",
      mentees: 847,
      successRate: 98,
      availability: "2 slots this month",
      sessionType: "1-on-1 Video Calls",
      focusAreas: [
        "Championship Mindset Development",
        "Professional Sports Career Guidance", 
        "Business & Entrepreneurship",
        "Brand Building & Marketing",
        "Leadership Under Pressure"
      ],
      impact: "Mentees average 340% career advancement",
      testimonial: "Michael doesn't just teach basketball - he teaches how to win at life. His guidance on mental toughness changed everything for me.",
      avatar: "🐐",
      rating: 5.0,
      responseTime: "2 hours",
      languages: ["English"],
      timeZone: "EST",
      nextAvailable: "Tomorrow 3:00 PM"
    },
    {
      id: 2,
      name: "Serena Williams",
      title: "Tennis Champion & Entrepreneur",
      company: "Serena Ventures",
      expertise: ["Athletic Performance", "Women's Leadership", "Entrepreneurship", "Social Impact"],
      experience: "23x Grand Slam Champion, Venture Capital, Social Advocate",
      mentees: 623,
      successRate: 96,
      availability: "3 slots this month",
      sessionType: "Group Sessions + 1-on-1",
      focusAreas: [
        "Breaking Barriers & Glass Ceilings",
        "Female Athletic Leadership",
        "Entrepreneurship & Investing",
        "Social Justice & Advocacy",
        "Balancing Competition & Life"
      ],
      impact: "94% of mentees secure leadership positions",
      testimonial: "Serena taught me that being an athlete is just the beginning. She showed me how to use my platform for real change.",
      avatar: "👑",
      rating: 5.0,
      responseTime: "1 hour",
      languages: ["English", "French"],
      timeZone: "PST",
      nextAvailable: "Monday 10:00 AM"
    },
    {
      id: 3,
      name: "LeBron James",
      title: "NBA Superstar & Media Mogul",
      company: "SpringHill Company / Uninterrupted",
      expertise: ["Athletic Longevity", "Media & Entertainment", "Education", "Community Impact"],
      experience: "4x NBA Champion, Media Empire, Educational Philanthropy",
      mentees: 1156,
      successRate: 97,
      availability: "1 slot this month",
      sessionType: "Exclusive Mastermind",
      focusAreas: [
        "Athletic Longevity & Career Management",
        "Media & Entertainment Ventures",
        "Educational Philanthropy",
        "Community Building & Impact",
        "Legacy Development"
      ],
      impact: "89% launch successful community programs",
      testimonial: "LeBron doesn't just mentor athletes - he mentors future leaders. His vision for community impact is unmatched.",
      avatar: "👨‍🎓",
      rating: 5.0,
      responseTime: "4 hours",
      languages: ["English"],
      timeZone: "EST",
      nextAvailable: "Next Week"
    }
  ];

  const mentorshipPrograms = [
    {
      name: "Elite Athletic Performance",
      description: "Train with world champions and Olympic medalists",
      mentors: 45,
      participants: 1200,
      successRate: 94,
      duration: "6 months",
      outcomes: ["Professional contracts", "Olympic trials", "Championship wins"],
      icon: Trophy,
      color: "yellow"
    },
    {
      name: "Business & Entrepreneurship",
      description: "Learn from successful athlete-entrepreneurs",
      mentors: 67,
      participants: 890,
      successRate: 91,
      duration: "8 months", 
      outcomes: ["Business launches", "Investment deals", "Brand partnerships"],
      icon: Briefcase,
      color: "blue"
    },
    {
      name: "Education & Scholarship",
      description: "Academic excellence guidance from scholar-athletes",
      mentors: 89,
      participants: 2340,
      successRate: 96,
      duration: "4 months",
      outcomes: ["Full scholarships", "Academic honors", "Graduate programs"],
      icon: GraduationCap,
      color: "green"
    },
    {
      name: "Community Leadership",
      description: "Social impact training with activist-athletes",
      mentors: 34,
      participants: 567,
      successRate: 92,
      duration: "12 months",
      outcomes: ["Non-profit launches", "Policy changes", "Community programs"],
      icon: Heart,
      color: "red"
    }
  ];

  const liveSuccess = [
    {
      mentee: "Sarah M.",
      mentor: "Maya Moore",
      achievement: "Full ride to Stanford + Social Justice Fellowship",
      timeFrame: "3 months",
      category: "Academic + Advocacy"
    },
    {
      mentee: "Marcus J.", 
      mentor: "Russell Wilson",
      achievement: "NFL Draft Selection + Tech Startup Launch",
      timeFrame: "18 months",
      category: "Athletic + Business"
    },
    {
      mentee: "Aisha K.",
      mentor: "Candace Parker",
      achievement: "WNBA Contract + Youth Foundation $2M Funding",
      timeFrame: "2 years",
      category: "Athletic + Community"
    }
  ];

  const mentorshipFeatures = [
    {
      name: "AI Mentor Matching",
      description: "Perfect mentor-mentee pairing using advanced algorithms",
      icon: Brain,
      metric: "98% satisfaction rate"
    },
    {
      name: "Live Career Guidance",
      description: "Real-time advice during critical career moments",
      icon: Phone,
      metric: "24/7 access network"
    },
    {
      name: "Success Tracking",
      description: "Measure and celebrate mentorship outcomes",
      icon: TrendingUp,
      metric: "340% avg. advancement"
    },
    {
      name: "Global Network",
      description: "Connect with mentors and peers worldwide",
      icon: Globe,
      metric: "89 countries active"
    }
  ];

  const currentMentor = mentors[selectedMentor];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Users className="w-16 h-16 mx-auto mb-4 text-purple-300" />
            <h1 className="text-5xl font-black text-white mb-4">
              LIFE-CHANGING MENTORSHIP NETWORK
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Connect with legendary athletes, successful entrepreneurs, and industry leaders who transform 
              student-athletes into champions, leaders, and changemakers. Real mentorship that changes destinies.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Live Network Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-bold">MENTORSHIP NETWORK LIVE</span>
              <div className="px-3 py-1 bg-purple-500 rounded-full text-sm font-bold">
                {liveConnections} ACTIVE SESSIONS
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-black text-purple-400">{activeMentorships.toLocaleString()}</div>
                <div className="text-xs text-white/70">Active Mentorships</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-3xl font-black text-purple-400">{activeMentorships.toLocaleString()}</div>
              <div className="text-xs text-white/70">Active Mentorships</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-400">{successStories.toLocaleString()}</div>
              <div className="text-xs text-white/70">Success Stories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-yellow-400">{scholarshipsSecured.toLocaleString()}</div>
              <div className="text-xs text-white/70">Scholarships Won</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-blue-400">{careerPlacements}</div>
              <div className="text-xs text-white/70">Career Placements</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-orange-400">97%</div>
              <div className="text-xs text-white/70">Success Rate</div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Elite Mentors */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Featured Mentors */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <Crown className="w-6 h-6 text-yellow-400" />
                Elite Mentors & Champions
              </h2>
              
              {mentors.map((mentor, index) => (
                <motion.div
                  key={mentor.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedMentor(index)}
                  className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedMentor === index
                      ? 'border-purple-400 bg-purple-500/10'
                      : 'border-white/20 bg-white/5 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{mentor.avatar}</div>
                      <div>
                        <h3 className="text-xl font-bold">{mentor.name}</h3>
                        <div className="text-sm text-white/70">{mentor.title}</div>
                        <div className="text-sm text-purple-400">{mentor.company}</div>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="font-bold">{mentor.rating}</span>
                          </span>
                          <span className="text-sm text-white/70">{mentor.mentees} mentees</span>
                          <span className="text-sm text-green-400">{mentor.successRate}% success</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-bold mb-2">
                        Available
                      </div>
                      <div className="text-xs text-white/70">{mentor.availability}</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
                    <div className="text-sm font-bold mb-2">Experience & Achievements:</div>
                    <div className="text-sm text-white/80">{mentor.experience}</div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-bold mb-2">Expertise Areas:</h4>
                      <div className="flex flex-wrap gap-2">
                        {mentor.expertise.map((skill, idx) => (
                          <span key={idx} className="px-2 py-1 bg-purple-500/20 rounded text-xs text-purple-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Focus Areas:</h4>
                      <div className="space-y-1">
                        {mentor.focusAreas.slice(0, 3).map((area, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <Target className="w-3 h-3 text-indigo-400" />
                            <span className="text-white/70">{area}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-indigo-500/10 p-4 rounded-lg border border-indigo-500/30 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-indigo-400" />
                      <span className="font-bold text-indigo-300">Impact:</span>
                    </div>
                    <div className="text-sm text-indigo-200">{mentor.impact}</div>
                  </div>

                  <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 mb-4">
                    <div className="text-sm italic text-green-300">"{mentor.testimonial}"</div>
                    <div className="text-xs text-white/50 mt-2">- Former Mentee</div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-blue-400" />
                        {mentor.responseTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3 text-green-400" />
                        {mentor.sessionType}
                      </span>
                    </div>
                    <button className="px-6 py-2 bg-purple-500 rounded-lg font-bold hover:bg-purple-600 transition-colors">
                      Request Mentorship
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mentorship Programs */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                Specialized Mentorship Programs
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {mentorshipPrograms.map((program, index) => {
                  const ProgramIcon = program.icon;
                  return (
                    <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/20">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`p-2 rounded-lg bg-${program.color}-500/20`}>
                          <ProgramIcon className={`w-5 h-5 text-${program.color}-400`} />
                        </div>
                        <div>
                          <div className="font-bold">{program.name}</div>
                          <div className="text-sm text-white/70">{program.description}</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                        <div>
                          <div className="text-white/70">Mentors:</div>
                          <div className="font-bold text-blue-400">{program.mentors}</div>
                        </div>
                        <div>
                          <div className="text-white/70">Participants:</div>
                          <div className="font-bold text-green-400">{program.participants}</div>
                        </div>
                        <div>
                          <div className="text-white/70">Success Rate:</div>
                          <div className="font-bold text-yellow-400">{program.successRate}%</div>
                        </div>
                        <div>
                          <div className="text-white/70">Duration:</div>
                          <div className="font-bold text-purple-400">{program.duration}</div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="text-sm font-bold mb-2">Typical Outcomes:</div>
                        <div className="flex flex-wrap gap-2">
                          {program.outcomes.map((outcome, idx) => (
                            <span key={idx} className="px-2 py-1 bg-green-500/20 rounded text-xs text-green-300">
                              {outcome}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button className="w-full py-2 bg-purple-500/20 rounded-lg font-bold hover:bg-purple-500/30 transition-colors">
                        Apply to Program
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Live Success Stories */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Live Success Stories
              </h3>
              
              <div className="space-y-4">
                {liveSuccess.map((story, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/30"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold">{story.mentee} + {story.mentor}</div>
                      <div className="text-sm text-green-400">{story.timeFrame}</div>
                    </div>
                    <div className="text-white/90 mb-2">{story.achievement}</div>
                    <div className="text-xs text-blue-400">{story.category}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mentorship Dashboard */}
          <div className="space-y-6">
            
            {/* Current Mentor Profile */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                Featured Mentor
              </h3>
              
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{currentMentor.avatar}</div>
                <div className="font-bold">{currentMentor.name}</div>
                <div className="text-sm text-white/70">{currentMentor.title}</div>
                <div className="text-sm text-purple-400">{currentMentor.company}</div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Response Time:</span>
                  <span className="text-green-400">{currentMentor.responseTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Success Rate:</span>
                  <span className="text-yellow-400">{currentMentor.successRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Mentees:</span>
                  <span className="text-blue-400">{currentMentor.mentees}</span>
                </div>
                <div className="flex justify-between">
                  <span>Next Available:</span>
                  <span className="text-green-400">{currentMentor.nextAvailable}</span>
                </div>
              </div>

              <button className="w-full mt-4 py-3 bg-purple-500 rounded-lg font-bold hover:bg-purple-600 transition-colors">
                Connect Now
              </button>
            </div>

            {/* Network Features */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Network Features</h3>
              
              <div className="space-y-4">
                {mentorshipFeatures.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div key={index} className="p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <FeatureIcon className="w-4 h-4 text-purple-400" />
                        <div className="font-bold text-sm">{feature.name}</div>
                      </div>
                      <p className="text-xs text-white/70 mb-2">{feature.description}</p>
                      <div className="text-xs text-purple-400 font-bold">{feature.metric}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Your Mentorship Journey */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Map className="w-5 h-5 text-green-400" />
                Your Journey
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                  <span className="text-sm">Profile Created</span>
                  <Crown className="w-4 h-4 text-green-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <span className="text-sm">Mentor Matched</span>
                  <Clock className="w-4 h-4 text-yellow-400" />
                </div>
                <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                  <span className="text-sm">First Session</span>
                  <Video className="w-4 h-4 text-white/50" />
                </div>
                <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg">
                  <span className="text-sm">Goal Achievement</span>
                  <Trophy className="w-4 h-4 text-white/50" />
                </div>
              </div>
            </div>

            {/* Global Impact */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                Global Impact
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Lives Changed</span>
                    <Sparkles className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-2xl font-black text-green-400">47,382</div>
                  <div className="text-xs text-white/70">Student-athletes empowered</div>
                </div>

                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Scholarships Won</span>
                    <GraduationCap className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-black text-blue-400">$847M</div>
                  <div className="text-xs text-white/70">In scholarship value</div>
                </div>

                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Communities Served</span>
                    <Heart className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-black text-purple-400">2,847</div>
                  <div className="text-xs text-white/70">Underserved areas reached</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-purple-500/20 rounded-lg text-center hover:bg-purple-500/30 transition-colors">
                  <Users className="w-5 h-5 mx-auto mb-2 text-purple-400" />
                  <div className="text-xs font-bold">Find Mentor</div>
                </button>
                <button className="p-3 bg-green-500/20 rounded-lg text-center hover:bg-green-500/30 transition-colors">
                  <Calendar className="w-5 h-5 mx-auto mb-2 text-green-400" />
                  <div className="text-xs font-bold">Schedule</div>
                </button>
                <button className="p-3 bg-blue-500/20 rounded-lg text-center hover:bg-blue-500/30 transition-colors">
                  <MessageCircle className="w-5 h-5 mx-auto mb-2 text-blue-400" />
                  <div className="text-xs font-bold">Message</div>
                </button>
                <button className="p-3 bg-yellow-500/20 rounded-lg text-center hover:bg-yellow-500/30 transition-colors">
                  <Share className="w-5 h-5 mx-auto mb-2 text-yellow-400" />
                  <div className="text-xs font-bold">Share Story</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-black mb-8">Transform Your Destiny with Elite Mentorship</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 p-8 rounded-xl">
              <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Legendary Mentors</h3>
              <p className="text-white/70">Learn directly from world champions, business moguls, and industry leaders who achieved greatness and want to pass it forward.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Proven Results</h3>
              <p className="text-white/70">97% success rate with mentees achieving 340% career advancement. Real relationships that create life-changing opportunities.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Life-Changing Impact</h3>
              <p className="text-white/70">Beyond career success - mentors help develop character, leadership, and the mindset needed to make a lasting impact on the world.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-purple-500/30"
          >
            <Users className="w-7 h-7" />
            Start Your Mentorship Journey
            <ArrowRight className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </div>
  );
}