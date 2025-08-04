'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, TrendingUp, PiggyBank, Shield, CreditCard, Home,
  Target, Brain, Trophy, Star, Zap, Clock, CheckCircle, Alert,
  ArrowRight, Calendar, BookOpen, Calculator, BarChart3, Percent,
  Users, Globe, Award, Crown, Heart, Lightbulb, FileText, Eye
} from 'lucide-react';
import Link from 'next/link';

export default function FinancialAcademyDemo() {
  const [selectedModule, setSelectedModule] = useState(0);
  const [completedModules, setCompletedModules] = useState(3);
  const [totalSavings, setTotalSavings] = useState(47500);
  const [investmentGrowth, setInvestmentGrowth] = useState(12.4);
  const [creditScore, setCreditScore] = useState(748);
  const [nilEarnings, setNilEarnings] = useState(125000);
  const [financialLiteracyScore, setFinancialLiteracyScore] = useState(87);

  // Real-time financial tracking
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSavings(prev => prev + Math.floor(Math.random() * 50));
      setInvestmentGrowth(prev => Math.max(8, Math.min(20, prev + (Math.random() - 0.5) * 0.5)));
      setNilEarnings(prev => prev + Math.floor(Math.random() * 100));
      
      if (Math.random() < 0.1) {
        setCreditScore(prev => Math.min(850, prev + 1));
        setFinancialLiteracyScore(prev => Math.min(100, prev + 0.2));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const financialModules = [
    {
      id: 1,
      title: "NIL Money Management",
      level: "Essential",
      duration: "45 minutes",
      completed: true,
      progress: 100,
      description: "Master the fundamentals of managing Name, Image, and Likeness earnings responsibly",
      topics: [
        "Understanding NIL contracts and payments",
        "Tax obligations and quarterly payments", 
        "Setting aside money for taxes (25-30%)",
        "Creating separate business and personal accounts",
        "Working with agents and representatives"
      ],
      practicalExercise: "Calculate taxes on a $50,000 NIL deal",
      realWorldApplication: "Set up proper account structure for NIL earnings",
      icon: Trophy,
      color: "yellow",
      successMetric: "Students save 90% more from NIL earnings",
      mentorTip: "Always pay yourself first - save 20% of every NIL payment before spending anything."
    },
    {
      id: 2,
      title: "Building Your Credit Foundation",
      level: "Critical",
      duration: "60 minutes", 
      completed: true,
      progress: 100,
      description: "Establish excellent credit early to unlock opportunities for your future",
      topics: [
        "Understanding credit scores and reports",
        "Student credit cards vs secured cards",
        "Payment history importance (35% of score)",
        "Credit utilization best practices",
        "Building credit without debt mistakes"
      ],
      practicalExercise: "Create a credit building plan",
      realWorldApplication: "Apply for your first responsible credit card",
      icon: CreditCard,
      color: "blue",
      successMetric: "Students achieve 750+ credit scores 2x faster",
      mentorTip: "Never use more than 10% of your credit limit, and always pay in full every month."
    },
    {
      id: 3,
      title: "Investment Fundamentals for Athletes",
      level: "Growth",
      duration: "90 minutes",
      completed: true,
      progress: 100,
      description: "Build long-term wealth through smart investing strategies tailored for athletes",
      topics: [
        "Index funds vs individual stocks",
        "401(k) and Roth IRA advantages",
        "Dollar-cost averaging strategy",
        "Risk tolerance based on career stage",
        "Avoiding high-fee investment products"
      ],
      practicalExercise: "Design a 20-year investment portfolio",
      realWorldApplication: "Open and fund your first investment account",
      icon: TrendingUp,
      color: "green",
      successMetric: "Students achieve 15% higher investment returns",
      mentorTip: "Time in the market beats timing the market - start investing early, even with small amounts."
    },
    {
      id: 4,
      title: "Emergency Fund & Insurance Strategy",
      level: "Protection",
      duration: "50 minutes",
      completed: false,
      progress: 65,
      description: "Protect your financial future with proper emergency planning and insurance coverage",
      topics: [
        "6-month emergency fund calculation",
        "High-yield savings account selection", 
        "Health insurance during college transition",
        "Disability insurance for athletes",
        "Life insurance considerations"
      ],
      practicalExercise: "Calculate your personal emergency fund target",
      realWorldApplication: "Set up automatic emergency fund contributions",
      icon: Shield,
      color: "red",
      successMetric: "Students have 80% larger emergency funds",
      mentorTip: "Your emergency fund is insurance, not an investment - keep it safe and accessible."
    },
    {
      id: 5,
      title: "Real Estate & Home Ownership",
      level: "Advanced",
      duration: "75 minutes",
      completed: false,
      progress: 0,
      description: "Navigate the path to homeownership and real estate investment opportunities",
      topics: [
        "Rent vs buy calculations",
        "Down payment saving strategies",
        "Mortgage pre-approval process",
        "Property taxes and insurance costs",
        "Real estate investment basics"
      ],
      practicalExercise: "Analyze rent vs buy for your area",
      realWorldApplication: "Create a home buying timeline and savings plan",
      icon: Home,
      color: "purple",
      successMetric: "Students achieve homeownership 3 years earlier",
      mentorTip: "Don't rush into homeownership - ensure you have emergency fund, stable income, and 20% down payment."
    },
    {
      id: 6,
      title: "Business & Entrepreneurship Finance",
      level: "Elite",
      duration: "120 minutes",
      completed: false,
      progress: 0,
      description: "Learn to manage business finances, from side hustles to full entrepreneurship",
      topics: [
        "Business entity selection (LLC, Corp, etc)",
        "Separating business and personal finances",
        "Business credit building",
        "Cash flow management",
        "Scaling and reinvestment strategies"
      ],
      practicalExercise: "Create a business financial plan",
      realWorldApplication: "Set up business banking and accounting system",
      icon: Lightbulb,
      color: "orange",
      successMetric: "Students build businesses with 40% better profit margins",
      mentorTip: "Track every business expense - good record keeping is the foundation of business success."
    }
  ];

  const financialMetrics = [
    {
      label: "Total Savings",
      value: `$${totalSavings.toLocaleString()}`,
      icon: PiggyBank,
      color: "green",
      trend: "+$2,400 this month",
      target: "$75,000"
    },
    {
      label: "Investment Growth",
      value: `${investmentGrowth.toFixed(1)}%`,
      icon: TrendingUp,
      color: "blue",
      trend: "Beating market average",
      target: "15% annually"
    },
    {
      label: "Credit Score",
      value: creditScore,
      icon: CreditCard,
      color: "purple",
      trend: "+12 points this quarter",
      target: "800+"
    },
    {
      label: "NIL Earnings",
      value: `$${nilEarnings.toLocaleString()}`,
      icon: Trophy,
      color: "yellow",
      trend: "+$15,000 this month",
      target: "$200,000"
    }
  ];

  const learningPaths = [
    {
      name: "NIL Money Mastery",
      description: "Complete financial management for student-athlete earnings",
      modules: 4,
      duration: "6 weeks",
      students: 2847,
      successRate: 94,
      outcomes: ["90% increase in savings rate", "Zero tax penalties", "Professional financial structure"],
      difficulty: "Beginner",
      priority: "High"
    },
    {
      name: "Wealth Building Foundation", 
      description: "Long-term wealth strategies for athletic careers",
      modules: 6,
      duration: "10 weeks",
      students: 1923,
      successRate: 91,
      outcomes: ["15% higher investment returns", "Faster credit building", "Emergency fund completion"],
      difficulty: "Intermediate",
      priority: "Medium"
    },
    {
      name: "Entrepreneur Financial Elite",
      description: "Advanced business and investment strategies",
      modules: 8,
      duration: "16 weeks", 
      students: 567,
      successRate: 96,
      outcomes: ["Business launch readiness", "40% better profit margins", "Investment portfolio mastery"],
      difficulty: "Advanced",
      priority: "High"
    }
  ];

  const financialTools = [
    {
      name: "NIL Tax Calculator",
      description: "Calculate taxes and savings from NIL earnings",
      icon: Calculator,
      users: 15420,
      avgSavings: "$12,500"
    },
    {
      name: "Investment Portfolio Builder",
      description: "Design age-appropriate investment strategies",
      icon: BarChart3,
      users: 8934,
      avgSavings: "$47,000"
    },
    {
      name: "Credit Score Optimizer",
      description: "Improve credit score with personalized action plan",
      icon: CreditCard,
      users: 12847,
      avgSavings: "50 point increase"
    },
    {
      name: "Emergency Fund Tracker",
      description: "Automate emergency fund building and tracking",
      icon: Shield,
      users: 9876,
      avgSavings: "$8,400"
    }
  ];

  const currentModule = financialModules[selectedModule];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-900 to-emerald-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <DollarSign className="w-16 h-16 mx-auto mb-4 text-green-300" />
            <h1 className="text-5xl font-black text-white mb-4">
              FINANCIAL LITERACY ACADEMY
            </h1>
            <p className="text-xl text-green-200 max-w-3xl mx-auto">
              Master money management, investing, and wealth building specifically designed for student-athletes. 
              Build financial literacy that sets you up for lifelong success, from NIL earnings to retirement planning.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Financial Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-bold">FINANCIAL ACADEMY ACTIVE</span>
              <div className="px-3 py-1 bg-green-500 rounded-full text-sm font-bold">
                BUILDING WEALTH
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-black text-green-400">{financialLiteracyScore}%</div>
                <div className="text-xs text-white/70">Financial Literacy Score</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {financialMetrics.map((metric, index) => {
              const MetricIcon = metric.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <MetricIcon className={`w-4 h-4 text-${metric.color}-400`} />
                    <div className={`text-2xl font-black text-${metric.color}-400`}>
                      {metric.value}
                    </div>
                  </div>
                  <div className="text-xs text-white/70">{metric.label}</div>
                  <div className="text-xs text-green-400">{metric.trend}</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Financial Learning Modules */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Learning Modules */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-green-400" />
                Financial Mastery Curriculum
              </h2>
              
              {financialModules.map((module, index) => {
                const ModuleIcon = module.icon;
                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedModule(index)}
                    className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedModule === index
                        ? 'border-green-400 bg-green-500/10'
                        : 'border-white/20 bg-white/5 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg bg-${module.color}-500/20`}>
                          <ModuleIcon className={`w-6 h-6 text-${module.color}-400`} />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold">{module.title}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              module.level === 'Essential' ? 'bg-red-500/20 text-red-400' :
                              module.level === 'Critical' ? 'bg-orange-500/20 text-orange-400' :
                              module.level === 'Growth' ? 'bg-green-500/20 text-green-400' :
                              module.level === 'Protection' ? 'bg-blue-500/20 text-blue-400' :
                              module.level === 'Advanced' ? 'bg-purple-500/20 text-purple-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {module.level}
                            </span>
                            <span className="text-sm text-white/70">{module.duration}</span>
                            {module.completed && (
                              <span className="flex items-center gap-1 text-xs text-green-400">
                                <CheckCircle className="w-3 h-3" />
                                Completed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-green-400">{module.progress}%</div>
                        <div className="text-xs text-white/70">Progress</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r from-${module.color}-500 to-${module.color}-400 h-2 rounded-full`}
                          style={{ width: `${module.progress}%` }}
                        />
                      </div>
                    </div>

                    <p className="text-white/80 mb-4">{module.description}</p>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-bold mb-2">Learning Topics:</h4>
                        <div className="space-y-1">
                          {module.topics.slice(0, 3).map((topic, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <Target className="w-3 h-3 text-green-400" />
                              <span className="text-white/70">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">Practical Application:</h4>
                        <div className="space-y-2">
                          <div className="text-sm text-white/70">{module.practicalExercise}</div>
                          <div className="text-sm text-blue-400">{module.realWorldApplication}</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/30 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-400" />
                        <span className="font-bold text-green-300">Success Impact:</span>
                      </div>
                      <div className="text-sm text-green-200">{module.successMetric}</div>
                    </div>

                    <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Brain className="w-4 h-4 text-yellow-400" />
                        <span className="font-bold text-yellow-300">Mentor Tip:</span>
                      </div>
                      <div className="text-sm italic text-yellow-200">"{module.mentorTip}"</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-green-400 font-bold">
                        {module.completed ? 'Review Module' : 'Continue Learning'}
                      </div>
                      <button className="px-4 py-2 bg-green-500 rounded-lg font-bold hover:bg-green-600 transition-colors">
                        {module.completed ? 'Review' : 'Start Module'}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Learning Paths */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-400" />
                Specialized Learning Paths
              </h3>
              
              <div className="grid gap-4">
                {learningPaths.map((path, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/20">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold">{path.name}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            path.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                            path.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {path.difficulty}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            path.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {path.priority} Priority
                          </span>
                        </div>
                        <p className="text-sm text-white/70 mb-2">{path.description}</p>
                        <div className="flex items-center gap-4 text-xs text-white/60">
                          <span>{path.modules} modules</span>
                          <span>{path.duration}</span>
                          <span>{path.students} students</span>
                          <span className="text-green-400">{path.successRate}% success</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm font-bold mb-2">Expected Outcomes:</div>
                      <div className="flex flex-wrap gap-2">
                        {path.outcomes.map((outcome, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-500/20 rounded text-xs text-green-300">
                            {outcome}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button className="w-full py-2 bg-green-500/20 rounded-lg font-bold hover:bg-green-500/30 transition-colors">
                      Start Learning Path
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Financial Tools & Dashboard */}
          <div className="space-y-6">
            
            {/* Financial Progress */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-400" />
                Your Progress
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Modules Completed</span>
                    <Trophy className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="text-2xl font-black text-green-400">{completedModules}/6</div>
                  <div className="text-xs text-white/70">50% Complete</div>
                </div>

                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Knowledge Score</span>
                    <Star className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="text-2xl font-black text-blue-400">{Math.round(financialLiteracyScore)}%</div>
                  <div className="text-xs text-white/70">Above average</div>
                </div>

                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">Money Saved</span>
                    <PiggyBank className="w-4 h-4 text-yellow-400" />
                  </div>
                  <div className="text-2xl font-black text-yellow-400">$47.5K</div>
                  <div className="text-xs text-white/70">Due to smart choices</div>
                </div>
              </div>
            </div>

            {/* Financial Tools */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Financial Tools</h3>
              
              <div className="space-y-3">
                {financialTools.map((tool, index) => {
                  const ToolIcon = tool.icon;
                  return (
                    <div key={index} className="p-3 bg-white/5 rounded-lg border border-white/20 hover:border-green-400/50 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3 mb-2">
                        <ToolIcon className="w-4 h-4 text-green-400" />
                        <div className="font-bold text-sm">{tool.name}</div>
                      </div>
                      <p className="text-xs text-white/70 mb-2">{tool.description}</p>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white/50">{tool.users.toLocaleString()} users</span>
                        <span className="text-green-400 font-bold">Avg: {tool.avgSavings}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Financial Goals */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Financial Goals
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                  <span className="text-sm">Emergency Fund</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">$15K/15K</span>
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <span className="text-sm">Credit Score 750+</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{creditScore}/750</span>
                    <Clock className="w-4 h-4 text-yellow-400" />
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <span className="text-sm">Investment Portfolio</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">$32K</span>
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Achievement Badges */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Achievements
              </h3>
              
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                  <Trophy className="w-6 h-6 mx-auto mb-2 text-green-400" />
                  <div className="text-xs font-bold">NIL Master</div>
                </div>
                <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <CreditCard className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                  <div className="text-xs font-bold">Credit Builder</div>
                </div>
                <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <TrendingUp className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                  <div className="text-xs font-bold">Investor</div>
                </div>
                <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <PiggyBank className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                  <div className="text-xs font-bold">Super Saver</div>
                </div>
                <div className="text-center p-3 bg-white/10 rounded-lg opacity-50">
                  <Home className="w-6 h-6 mx-auto mb-2 text-white/50" />
                  <div className="text-xs font-bold">Home Owner</div>
                </div>
                <div className="text-center p-3 bg-white/10 rounded-lg opacity-50">
                  <Lightbulb className="w-6 h-6 mx-auto mb-2 text-white/50" />
                  <div className="text-xs font-bold">Entrepreneur</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-green-500/20 rounded-lg text-center hover:bg-green-500/30 transition-colors">
                  <Calculator className="w-5 h-5 mx-auto mb-2 text-green-400" />
                  <div className="text-xs font-bold">NIL Calculator</div>
                </button>
                <button className="p-3 bg-blue-500/20 rounded-lg text-center hover:bg-blue-500/30 transition-colors">
                  <BarChart3 className="w-5 h-5 mx-auto mb-2 text-blue-400" />
                  <div className="text-xs font-bold">Portfolio</div>
                </button>
                <button className="p-3 bg-purple-500/20 rounded-lg text-center hover:bg-purple-500/30 transition-colors">
                  <Eye className="w-5 h-5 mx-auto mb-2 text-purple-400" />
                  <div className="text-xs font-bold">Credit Check</div>
                </button>
                <button className="p-3 bg-yellow-500/20 rounded-lg text-center hover:bg-yellow-500/30 transition-colors">
                  <FileText className="w-5 h-5 mx-auto mb-2 text-yellow-400" />
                  <div className="text-xs font-bold">Tax Prep</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-black mb-8">Financial Success for Life</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 p-8 rounded-xl">
              <DollarSign className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">NIL Money Management</h3>
              <p className="text-white/70">Master the complexities of Name, Image, and Likeness earnings with tax-smart strategies and professional financial structure.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Investment Excellence</h3>
              <p className="text-white/70">Build long-term wealth through smart investing strategies tailored for athletic careers and income fluctuations.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Financial Freedom</h3>
              <p className="text-white/70">Achieve true financial independence with comprehensive financial literacy that goes far beyond sports earnings.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-green-500/30"
          >
            <DollarSign className="w-7 h-7" />
            Start Building Wealth
            <ArrowRight className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </div>
  );
}