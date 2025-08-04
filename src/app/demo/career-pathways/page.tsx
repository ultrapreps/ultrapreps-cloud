'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Target, TrendingUp, Star, Award, Trophy,
  Lightbulb, Zap, Crown, Shield, Globe, Heart,
  BarChart3, Clock, DollarSign, Users, Book,
  ArrowRight, Play, CheckCircle, Medal, Flame,
  Sparkles, Eye, Search, Map, Compass
} from 'lucide-react';
import Link from 'next/link';

export default function CareerPathwaysDemo() {
  const [selectedStudent, setSelectedStudent] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [careerMetrics, setCareerMetrics] = useState({
    pathwaysAnalyzed: 23789,
    careersUnlocked: 1247,
    successPredictions: 94.7,
    salaryIncrease: 47
  });

  // Demo students with career pathway analysis
  const demoStudents = [
    {
      id: 1,
      name: "Aisha Patel",
      grade: "11th Grade",
      school: "Metro Science Academy",
      currentActivities: ["Robotics Team Captain", "Math Olympiad", "Volunteer Coding Tutor"],
      academicStrengths: ["Advanced Mathematics", "Computer Science", "Physics", "Leadership"],
      personalityTraits: ["Analytical", "Creative Problem Solver", "Team Leader", "Tech Innovator"],
      careerMatches: [
        {
          title: "AI Research Scientist",
          match: 97,
          salaryRange: "$120k-$280k",
          growthRate: 22.1,
          description: "Lead breakthrough research in artificial intelligence and machine learning",
          pathway: [
            "Computer Science + Math Double Major",
            "AI/ML Research Internships",
            "Graduate Research in Neural Networks",
            "PhD in AI/Robotics",
            "Senior Research Scientist Role"
          ],
          skills: ["Machine Learning", "Deep Learning", "Python", "Mathematical Modeling", "Research Design"]
        },
        {
          title: "Robotics Engineer",
          match: 95,
          salaryRange: "$85k-$160k",
          growthRate: 9.2,
          description: "Design and build the robots that will shape tomorrow's world",
          pathway: [
            "Mechanical/Electrical Engineering Degree",
            "Robotics Club Leadership",
            "Engineering Internships",
            "Advanced Robotics Specialization",
            "Lead Robotics Engineer"
          ],
          skills: ["Mechanical Design", "Electronics", "Programming", "Systems Integration", "Project Management"]
        },
        {
          title: "Tech Startup Founder",
          match: 89,
          salaryRange: "$50k-$500k+",
          growthRate: 15.4,
          description: "Launch innovative tech companies that solve global problems",
          pathway: [
            "Computer Science + Business Minor",
            "Startup Incubator Programs",
            "Build MVP Products",
            "Secure Venture Funding",
            "Scale Technology Company"
          ],
          skills: ["Entrepreneurship", "Product Development", "Team Building", "Fundraising", "Strategic Vision"]
        }
      ],
      nextSteps: [
        "Apply for NASA Summer Internship Program",
        "Compete in International Robotics Competition",
        "Start coding boot camp for local middle schoolers",
        "Begin college applications with strong STEM focus"
      ],
      strengthsAnalysis: {
        technical: 96,
        leadership: 91,
        creativity: 88,
        communication: 85
      }
    },
    {
      id: 2,
      name: "Marcus Thompson",
      grade: "12th Grade", 
      school: "Lincoln Community High",
      currentActivities: ["Varsity Basketball Captain", "Student Government President", "Youth Mentor"],
      academicStrengths: ["Business Studies", "Communications", "Psychology", "Athletic Performance"],
      personalityTraits: ["Natural Leader", "Motivational Speaker", "Team Builder", "Community Focused"],
      careerMatches: [
        {
          title: "Sports Management Executive",
          match: 98,
          salaryRange: "$75k-$200k",
          growthRate: 13.7,
          description: "Lead professional sports organizations and athlete development programs",
          pathway: [
            "Sports Management Degree",
            "Athletic Department Internships",
            "Professional Sports Intern",
            "Sports Agency Experience",
            "Executive Leadership Role"
          ],
          skills: ["Leadership", "Negotiation", "Athletic Knowledge", "Business Strategy", "People Management"]
        },
        {
          title: "Youth Development Director",
          match: 94,
          salaryRange: "$55k-$120k",
          growthRate: 11.9,
          description: "Create programs that transform young lives and build stronger communities",
          pathway: [
            "Social Work + Business Degree",
            "Non-Profit Internships",
            "Program Coordinator Role",
            "Grant Writing & Fundraising",
            "Executive Director Position"
          ],
          skills: ["Program Development", "Community Organizing", "Fundraising", "Mentorship", "Social Impact"]
        },
        {
          title: "Corporate Leadership",
          match: 87,
          salaryRange: "$90k-$300k",
          growthRate: 8.4,
          description: "Guide major corporations and inspire teams to achieve extraordinary results",
          pathway: [
            "Business Administration Degree",
            "Leadership Development Programs",
            "Management Trainee Position",
            "Department Management",
            "C-Suite Executive Role"
          ],
          skills: ["Strategic Planning", "Team Leadership", "Financial Analysis", "Change Management", "Executive Presence"]
        }
      ],
      nextSteps: [
        "Apply for business school leadership programs",
        "Expand youth mentoring to neighboring schools",
        "Seek basketball scholarship opportunities",
        "Connect with sports industry professionals"
      ],
      strengthsAnalysis: {
        leadership: 98,
        communication: 95,
        teamwork: 97,
        strategy: 84
      }
    },
    {
      id: 3,
      name: "Sofia Rodriguez",
      grade: "10th Grade",
      school: "Arts & Sciences Prep",
      currentActivities: ["Theater Lead", "Environmental Club Founder", "Debate Team"],
      academicStrengths: ["Literature", "Environmental Science", "Public Speaking", "Creative Writing"],
      personalityTraits: ["Passionate Advocate", "Creative Storyteller", "Environmental Champion", "Social Justice Leader"],
      careerMatches: [
        {
          title: "Environmental Lawyer",
          match: 96,
          salaryRange: "$70k-$180k",
          growthRate: 6.1,
          description: "Fight for environmental protection and climate justice through legal advocacy",
          pathway: [
            "Environmental Studies + Pre-Law",
            "Environmental Law Internships",
            "Law School Specialization",
            "Environmental Law Firm",
            "Partner or Government Role"
          ],
          skills: ["Legal Research", "Environmental Law", "Advocacy", "Public Speaking", "Policy Analysis"]
        },
        {
          title: "Documentary Filmmaker",
          match: 91,
          salaryRange: "$45k-$150k",
          growthRate: 12.8,
          description: "Create powerful films that expose environmental issues and inspire change",
          pathway: [
            "Film Production + Environmental Studies",
            "Documentary Assistant Roles",
            "Independent Film Projects",
            "Film Festival Recognition",
            "Award-Winning Director"
          ],
          skills: ["Storytelling", "Video Production", "Research", "Interviewing", "Social Impact"]
        },
        {
          title: "Climate Policy Advisor",
          match: 88,
          salaryRange: "$65k-$140k",
          growthRate: 14.3,
          description: "Shape government policies that address climate change and environmental protection",
          pathway: [
            "Environmental Policy Degree",
            "Government Internships",
            "Policy Research Analyst",
            "Senior Policy Advisor",
            "Environmental Agency Director"
          ],
          skills: ["Policy Development", "Climate Science", "Government Relations", "Data Analysis", "Strategic Communication"]
        }
      ],
      nextSteps: [
        "Apply for environmental summer camps and programs",
        "Start environmental documentary project",
        "Join Model UN for policy experience",
        "Connect with environmental organizations"
      ],
      strengthsAnalysis: {
        creativity: 94,
        advocacy: 97,
        communication: 92,
        research: 89
      }
    }
  ];

  const analyzeCareerPath = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const steps = [
      "Analyzing academic performance patterns...",
      "Evaluating extracurricular leadership roles...",
      "Mapping personality traits to career fits...",
      "Calculating salary and growth projections...",
      "Identifying skill development opportunities...",
      "Generating personalized career roadmap..."
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAnalysisProgress(((i + 1) / steps.length) * 100);
      
      // Update metrics during analysis
      setCareerMetrics(prev => ({
        pathwaysAnalyzed: prev.pathwaysAnalyzed + Math.floor(Math.random() * 10),
        careersUnlocked: prev.careersUnlocked + Math.floor(Math.random() * 3),
        successPredictions: Math.min(99.9, prev.successPredictions + Math.random() * 0.5),
        salaryIncrease: Math.min(65, prev.salaryIncrease + Math.random() * 2)
      }));
    }

    setIsAnalyzing(false);
    setAnalysisProgress(0);
  };

  const selectedStudentData = demoStudents[selectedStudent];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <Brain className="w-12 h-12 text-purple-400" />
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              AI CAREER PATHWAYS
            </h1>
            <Compass className="w-12 h-12 text-blue-400" />
          </div>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed">
            Map Every Student's Future Potential - Digital Immortality for Career Journeys
          </p>
          <div className="flex items-center justify-center gap-8 mt-8 text-lg font-bold">
            <div className="flex items-center gap-2">
              <Map className="w-6 h-6 text-purple-400" />
              <span>{careerMetrics.pathwaysAnalyzed.toLocaleString()} Pathways Analyzed</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6 text-blue-400" />
              <span>{careerMetrics.successPredictions}% Prediction Accuracy</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-400" />
              <span>+{careerMetrics.salaryIncrease}% Average Salary Increase</span>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Student Selection */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-purple-400">Student Profiles</h2>
            {demoStudents.map((student, index) => (
              <motion.div
                key={student.id}
                onClick={() => setSelectedStudent(index)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedStudent === index 
                    ? 'border-purple-400 bg-purple-900/30' 
                    : 'border-gray-600 bg-gray-800/30 hover:border-purple-500'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Target className="w-6 h-6 text-purple-400" />
                  <h3 className="font-bold text-lg">{student.name}</h3>
                </div>
                <p className="text-sm text-gray-300 mb-2">{student.grade} • {student.school}</p>
                <div className="text-sm text-purple-300">
                  {student.currentActivities.length} Activities • {student.careerMatches.length} Career Matches
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Career Analysis */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-3 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-purple-400 mb-2">{selectedStudentData.name}</h2>
                <p className="text-gray-300 text-lg mb-2">{selectedStudentData.grade} • {selectedStudentData.school}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedStudentData.personalityTraits.map((trait, index) => (
                    <span
                      key={index}
                      className="bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-purple-400">{selectedStudentData.careerMatches.length}</div>
                <div className="text-sm text-gray-300">Career Matches</div>
              </div>
            </div>

            {/* Strengths Analysis */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-blue-400">AI Strengths Analysis</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {Object.entries(selectedStudentData.strengthsAnalysis).map(([strength, score], index) => (
                  <motion.div
                    key={strength}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-blue-900/20 p-4 rounded-lg text-center"
                  >
                    <div className="text-2xl font-bold text-blue-400 mb-1">{score}%</div>
                    <div className="text-sm text-gray-300 capitalize">{strength}</div>
                    <div className="bg-gray-700 rounded-full h-2 mt-2">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${score}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 1.5, delay: index * 0.2 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Top Career Matches */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-4 text-green-400">Top Career Matches</h3>
              <div className="space-y-4">
                {selectedStudentData.careerMatches.map((career, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/30 p-5 rounded-lg border border-gray-600"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${career.match >= 95 ? 'bg-green-400' : career.match >= 90 ? 'bg-yellow-400' : 'bg-blue-400'}`}></div>
                        <h4 className="font-bold text-lg">{career.title}</h4>
                        <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded-full text-sm font-bold">
                          {career.match}% Match
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-green-400 font-bold">{career.salaryRange}</div>
                        <div className="text-sm text-gray-300">+{career.growthRate}% growth</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-4">{career.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-bold text-purple-400 mb-2">Career Pathway</h5>
                        <div className="space-y-1">
                          {career.pathway.map((step, stepIndex) => (
                            <div key={stepIndex} className="flex items-center gap-2 text-sm">
                              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                              <span className="text-gray-300">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h5 className="font-bold text-blue-400 mb-2">Key Skills</h5>
                        <div className="flex flex-wrap gap-2">
                          {career.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="bg-blue-900/30 text-blue-300 px-2 py-1 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Next Steps */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Recommended Next Steps</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {selectedStudentData.nextSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 bg-yellow-900/20 p-3 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <span className="text-sm">{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Career Analysis Button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-sm p-8 rounded-xl border border-purple-500/50 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-purple-400">AI Career Analysis</h3>
            <p className="text-gray-300 mb-6">Get personalized career guidance powered by advanced AI that analyzes your unique strengths, interests, and potential.</p>
            
            <motion.button
              onClick={analyzeCareerPath}
              disabled={isAnalyzing}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-purple-500 hover:to-blue-500 transition-all flex items-center gap-3 mx-auto disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                  Analyzing Career Path...
                </>
              ) : (
                <>
                  <Play className="w-6 h-6" />
                  Analyze My Career Path
                </>
              )}
            </motion.button>

            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6"
              >
                <div className="bg-gray-800 rounded-full h-3 mb-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full"
                    style={{ width: `${analysisProgress}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${analysisProgress}%` }}
                  />
                </div>
                <p className="text-sm text-gray-300">Mapping your future potential...</p>
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

      {/* Analysis Animation Overlay */}
      <AnimatePresence>
        {isAnalyzing && (
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
              <h2 className="text-3xl font-bold text-purple-400 mb-4">AI Career Analysis</h2>
              <p className="text-gray-300 text-lg">Mapping your future potential...</p>
              <div className="mt-6 text-2xl font-bold text-white">
                {analysisProgress.toFixed(0)}% Complete
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}