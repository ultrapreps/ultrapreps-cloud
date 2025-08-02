'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building,
  Users,
  Trophy,
  TrendingUp,
  DollarSign,
  GraduationCap,
  Star,
  Target,
  BarChart3,
  Award,
  Flame,
  Crown,
  Shield,
  MapPin,
  Calendar,
  FileText,
  MessageSquare,
  Zap,
  Eye,
  Brain,
  Heart,
  Globe,
  CheckCircle,
  AlertTriangle,
  Clock,
  ChevronRight,
  TrendingDown,
  Plus,
  Settings
} from 'lucide-react';

import HypeWidget from '../../components/HypeWidget';
import GageAIChat from '../../components/GageAIChat';

interface School {
  id: string;
  name: string;
  type: 'elementary' | 'middle' | 'high';
  students: number;
  teachers: number;
  athletics: boolean;
  performance: {
    academic: number;
    athletic: number;
    engagement: number;
  };
  demographics: {
    enrollment: number;
    freeReduced: number;
    diversity: number;
  };
  facilities: {
    stadiums: number;
    gyms: number;
    classrooms: number;
  };
}

interface DistrictMetric {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ComponentType<{className?: string}>;
  color: string;
}

interface SuperintendentTab {
  id: string;
  label: string;
  icon: React.ComponentType<{className?: string}>;
}

export default function SuperintendentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  const districtData = {
    name: 'Metro Excellence School District',
    superintendent: 'Dr. Sarah Washington',
    totalSchools: 47,
    totalStudents: 38427,
    totalTeachers: 2847,
    totalStaff: 5632,
    annualBudget: '$124.8M',
    coverage: 'Serving 12 communities across 247 square miles'
  };

  const mockSchools: School[] = [
    {
      id: '1',
      name: 'Champions High School',
      type: 'high',
      students: 1847,
      teachers: 124,
      athletics: true,
      performance: {
        academic: 92,
        athletic: 88,
        engagement: 94
      },
      demographics: {
        enrollment: 1847,
        freeReduced: 32,
        diversity: 78
      },
      facilities: {
        stadiums: 2,
        gyms: 3,
        classrooms: 67
      }
    },
    {
      id: '2',
      name: 'Excellence Middle School',
      type: 'middle',
      students: 934,
      teachers: 67,
      athletics: true,
      performance: {
        academic: 87,
        athletic: 79,
        engagement: 91
      },
      demographics: {
        enrollment: 934,
        freeReduced: 41,
        diversity: 82
      },
      facilities: {
        stadiums: 0,
        gyms: 2,
        classrooms: 42
      }
    },
    {
      id: '3',
      name: 'Future Stars Elementary',
      type: 'elementary',
      students: 567,
      teachers: 38,
      athletics: false,
      performance: {
        academic: 89,
        athletic: 0,
        engagement: 96
      },
      demographics: {
        enrollment: 567,
        freeReduced: 28,
        diversity: 71
      },
      facilities: {
        stadiums: 0,
        gyms: 1,
        classrooms: 28
      }
    }
  ];

  const districtMetrics: DistrictMetric[] = [
    {
      label: 'District Academic Performance',
      value: '91%',
      change: '+3.2%',
      trend: 'up',
      icon: GraduationCap,
      color: 'from-green-500 to-green-600'
    },
    {
      label: 'Athletic Championship Rate',
      value: '68%',
      change: '+12%',
      trend: 'up',
      icon: Trophy,
      color: 'from-[#F59E0B] to-[#F97316]'
    },
    {
      label: 'Student Engagement Score',
      value: '94.2',
      change: '+2.1',
      trend: 'up',
      icon: Heart,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Teacher Retention Rate',
      value: '96%',
      change: '+4%',
      trend: 'up',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Digital Adoption Rate',
      value: '97%',
      change: '+23%',
      trend: 'up',
      icon: Brain,
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      label: 'Community Investment',
      value: '$8.4M',
      change: '+18%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-emerald-500 to-emerald-600'
    }
  ];

  const tabs: SuperintendentTab[] = [
    { id: 'overview', label: 'District Overview', icon: Building },
    { id: 'schools', label: 'School Management', icon: Globe },
    { id: 'performance', label: 'Performance Analytics', icon: BarChart3 },
    { id: 'athletics', label: 'Athletic Programs', icon: Trophy },
    { id: 'finance', label: 'Financial Dashboard', icon: DollarSign },
    { id: 'community', label: 'Community Engagement', icon: Heart },
    { id: 'strategic', label: 'Strategic Planning', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* EXECUTIVE STADIUM BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/stadium-crowd-energy.jpg')`,
            backgroundAttachment: 'scroll',
            backgroundPosition: 'center top',
            backgroundSize: '120% auto',
            filter: 'grayscale(100%) contrast(1.3) brightness(0.15) blur(2px)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/90 via-[#111827]/85 to-black/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-[#1E3A8A]/30" />
      </div>

      {/* Executive Light Effects */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#F59E0B]/6 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#F97316]/4 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />

      {/* Mega Navigation */}
      

      {/* Content */}
      <div className="relative z-10 pt-20">
        {/* Executive Header */}
        <header className="border-b border-white/10 bg-black/30 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] flex items-center justify-center border-2 border-white/20">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-white font-black text-2xl bg-gradient-to-r from-white via-[#F59E0B] to-white bg-clip-text text-transparent">
                    {districtData.superintendent}
                  </h1>
                  <p className="text-white/70 text-lg font-bold">{districtData.name}</p>
                  <p className="text-white/50 text-sm">{districtData.coverage}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-white font-bold text-xl">{districtData.totalSchools} Schools</div>
                  <div className="text-[#F59E0B] font-bold">{districtData.totalStudents.toLocaleString()} Students</div>
                </div>
                <HypeWidget userId="superintendent_demo" compact />
                <button className="p-3 text-white/70 hover:text-white transition-colors">
                  <Settings className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 bg-black/40 backdrop-blur-lg rounded-2xl p-2 border border-white/10">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-2 px-6 py-4 rounded-xl font-bold text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Executive Metrics Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {districtMetrics.map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-gradient-to-r ${metric.color} p-4 sm:p-6 rounded-xl sm:rounded-2xl text-white shadow-xl relative overflow-hidden`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <metric.icon className="w-10 h-10" />
                          <div className="text-right">
                            <div className="text-2xl sm:text-3xl font-black">{metric.value}</div>
                            <div className={`text-sm font-bold flex items-center gap-1 ${
                              metric.trend === 'up' ? 'text-green-200' : 
                              metric.trend === 'down' ? 'text-red-200' : 'text-white/80'
                            }`}>
                              {metric.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : 
                               metric.trend === 'down' ? <TrendingDown className="w-4 h-4" /> : null}
                              {metric.change}
                            </div>
                          </div>
                        </div>
                        <p className="font-bold text-sm opacity-90">{metric.label}</p>
                        
                        {/* Subtle pattern overlay */}
                        <div className="absolute inset-0 bg-white/5 opacity-20" style={{
                          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3), transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15), transparent 50%)'
                        }} />
                      </motion.div>
                    ))}
                  </div>

                  {/* District Summary */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Schools Overview */}
                    <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                      <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                        <Globe className="w-6 h-6 text-[#F59E0B]" />
                        School Performance Matrix
                      </h3>
                      <div className="space-y-4">
                        {mockSchools.map((school, index) => (
                          <motion.div
                            key={school.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedSchool(school)}
                            className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl p-4 cursor-pointer hover:border-[#F59E0B]/50 transition-all duration-300"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h4 className="text-white font-bold text-lg">{school.name}</h4>
                                <p className="text-white/60 text-sm capitalize">{school.type} School • {school.students} students</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <ChevronRight className="w-4 h-4 text-white/50" />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center">
                                <div className="text-lg font-bold text-[#F59E0B]">{school.performance.academic}%</div>
                                <div className="text-white/60 text-xs">Academic</div>
                              </div>
                              {school.athletics && (
                                <div className="text-center">
                                  <div className="text-lg font-bold text-[#F59E0B]">{school.performance.athletic}%</div>
                                  <div className="text-white/60 text-xs">Athletic</div>
                                </div>
                              )}
                              <div className="text-center">
                                <div className="text-lg font-bold text-[#F59E0B]">{school.performance.engagement}%</div>
                                <div className="text-white/60 text-xs">Engagement</div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Strategic Initiatives */}
                    <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                      <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                        <Target className="w-6 h-6 text-[#F59E0B]" />
                        Strategic Initiatives 2025
                      </h3>
                      <div className="space-y-4">
                        {[
                          {
                            initiative: 'AI-Powered Academic Enhancement',
                            progress: 87,
                            status: 'On Track',
                            deadline: 'Q2 2025',
                            impact: 'High'
                          },
                          {
                            initiative: 'Athletic Excellence Program',
                            progress: 94,
                            status: 'Ahead of Schedule',
                            deadline: 'Q1 2025',
                            impact: 'High'
                          },
                          {
                            initiative: 'Digital Transformation Phase 3',
                            progress: 73,
                            status: 'On Track',
                            deadline: 'Q3 2025',
                            impact: 'Medium'
                          },
                          {
                            initiative: 'Community Engagement Platform',
                            progress: 91,
                            status: 'Exceeding Goals',
                            deadline: 'Q1 2025',
                            impact: 'High'
                          }
                        ].map((item, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 rounded-xl p-4 border border-white/10"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-white font-bold">{item.initiative}</h4>
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                item.status === 'Ahead of Schedule' || item.status === 'Exceeding Goals'
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-blue-500/20 text-blue-400'
                              }`}>
                                {item.status}
                              </span>
                            </div>
                            
                            <div className="mb-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-white/60">Progress</span>
                                <span className="text-white font-bold">{item.progress}%</span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${item.progress}%` }}
                                />
                              </div>
                            </div>
                            
                            <div className="flex justify-between text-xs text-white/60">
                              <span>Due: {item.deadline}</span>
                              <span className={`font-bold ${
                                item.impact === 'High' ? 'text-red-400' : 
                                item.impact === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                              }`}>
                                {item.impact} Impact
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'schools' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-black text-white">School Management Hub</h3>
                    <button className="px-6 py-3 bg-[#F59E0B] text-black rounded-xl font-bold hover:bg-[#F97316] transition-colors">
                      <Plus className="w-5 h-5 inline mr-2" />
                      Add New School
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {mockSchools.map((school, index) => (
                      <motion.div
                        key={school.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-black/60 to-[#1E3A8A]/20 border border-white/20 rounded-2xl p-6 hover:border-[#F59E0B]/50 transition-all duration-300"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-white font-bold text-xl mb-1">{school.name}</h4>
                            <p className="text-white/70 text-sm capitalize">{school.type} School</p>
                          </div>
                          <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse"></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-2xl font-black text-[#F59E0B]">{school.students}</div>
                            <div className="text-white/60 text-xs">Students</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-black text-[#F59E0B]">{school.teachers}</div>
                            <div className="text-white/60 text-xs">Teachers</div>
                          </div>
                        </div>

                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between items-center">
                            <span className="text-white/70 text-sm">Academic Performance</span>
                            <span className="text-white font-bold">{school.performance.academic}%</span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                              style={{ width: `${school.performance.academic}%` }}
                            />
                          </div>
                          
                          {school.athletics && (
                            <>
                              <div className="flex justify-between items-center">
                                <span className="text-white/70 text-sm">Athletic Excellence</span>
                                <span className="text-white font-bold">{school.performance.athletic}%</span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] h-2 rounded-full"
                                  style={{ width: `${school.performance.athletic}%` }}
                                />
                              </div>
                            </>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <button className="flex-1 px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-medium text-sm">
                            View Details
                          </button>
                          <button className="flex-1 px-3 py-2 bg-[#F59E0B] text-black rounded-lg hover:bg-[#F97316] transition-colors font-bold text-sm">
                            Manage
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional tabs would be implemented similarly... */}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Gage AI Chat */}
      <GageAIChat
        userId="superintendent_demo"
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
}