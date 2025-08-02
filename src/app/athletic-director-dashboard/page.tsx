'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy,
  Users,
  Calendar,
  DollarSign,
  TrendingUp,
  Medal,
  Target,
  Star,
  Crown,
  Flame,
  Shield,
  Zap,
  Award,
  BarChart3,
  Clock,
  MapPin,
  Heart,
  CheckCircle,
  AlertTriangle,
  Building,
  Gamepad2,
  Activity,
  Brain,
  Eye,
  ChevronRight,
  Plus,
  Settings,
  FileText,
  MessageSquare
} from 'lucide-react';

import HypeWidget from '../../components/HypeWidget';
import GageAIChat from '../../components/GageAIChat';

interface Sport {
  id: string;
  name: string;
  season: 'fall' | 'winter' | 'spring' | 'year-round';
  teams: {
    varsity: boolean;
    jv: boolean;
    freshman: boolean;
  };
  athletes: {
    total: number;
    male: number;
    female: number;
  };
  coaches: {
    head: string;
    assistant: number;
  };
  performance: {
    wins: number;
    losses: number;
    championships: number;
    ranking: number;
  };
  budget: {
    allocated: number;
    spent: number;
    revenue: number;
  };
  facilities: string[];
}

interface Championship {
  id: string;
  sport: string;
  level: 'conference' | 'region' | 'state' | 'national';
  year: number;
  title: string;
  coach: string;
}

interface AthleticDirectorTab {
  id: string;
  label: string;
  icon: React.ComponentType<{className?: string}>;
}

export default function AthleticDirectorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState<Sport | null>(null);

  const athleticData = {
    director: 'Coach Marcus Johnson',
    school: 'Champions High School',
    totalSports: 23,
    totalAthletes: 847,
    totalCoaches: 67,
    championships: 34,
    annualBudget: '$2.4M',
    motto: 'Excellence in Every Arena'
  };

  const mockSports: Sport[] = [
    {
      id: '1',
      name: 'Football',
      season: 'fall',
      teams: { varsity: true, jv: true, freshman: true },
      athletes: { total: 89, male: 89, female: 0 },
      coaches: { head: 'Coach Williams', assistant: 8 },
      performance: { wins: 12, losses: 2, championships: 3, ranking: 2 },
      budget: { allocated: 240000, spent: 230000, revenue: 180000 },
      facilities: ['Championship Stadium', 'Practice Fields', 'Weight Room']
    },
    {
      id: '2',
      name: 'Basketball',
      season: 'winter',
      teams: { varsity: true, jv: true, freshman: true },
      athletes: { total: 34, male: 18, female: 16 },
      coaches: { head: 'Coach Thompson', assistant: 4 },
      performance: { wins: 24, losses: 6, championships: 2, ranking: 4 },
      budget: { allocated: 85000, spent: 82000, revenue: 45000 },
      facilities: ['Main Gymnasium', 'Practice Gym', 'Training Center']
    },
    {
      id: '3',
      name: 'Track & Field',
      season: 'spring',
      teams: { varsity: true, jv: true, freshman: false },
      athletes: { total: 67, male: 34, female: 33 },
      coaches: { head: 'Coach Davis', assistant: 6 },
      performance: { wins: 8, losses: 2, championships: 5, ranking: 1 },
      budget: { allocated: 95000, spent: 88000, revenue: 25000 },
      facilities: ['Championship Track', 'Field House', 'Throwing Areas']
    }
  ];

  const recentChampionships: Championship[] = [
    {
      id: '1',
      sport: 'Track & Field',
      level: 'state',
      year: 2024,
      title: 'State Division I Champions',
      coach: 'Coach Davis'
    },
    {
      id: '2',
      sport: 'Football',
      level: 'region',
      year: 2024,
      title: 'Regional Championship',
      coach: 'Coach Williams'
    },
    {
      id: '3',
      sport: 'Swimming',
      level: 'conference',
      year: 2024,
      title: 'Conference Champions',
      coach: 'Coach Martinez'
    }
  ];

  const tabs: AthleticDirectorTab[] = [
    { id: 'overview', label: 'Athletic Overview', icon: Trophy },
    { id: 'sports', label: 'Sports Management', icon: Gamepad2 },
    { id: 'performance', label: 'Performance Analytics', icon: BarChart3 },
    { id: 'finance', label: 'Budget & Finance', icon: DollarSign },
    { id: 'facilities', label: 'Facilities Management', icon: Building },
    { id: 'recruitment', label: 'Athlete Recruitment', icon: Target },
    { id: 'compliance', label: 'Compliance & Safety', icon: Shield }
  ];

  const getSeasonColor = (season: string) => {
    const colors = {
      fall: 'from-orange-500 to-red-600',
      winter: 'from-blue-500 to-blue-700',
      spring: 'from-green-500 to-green-600',
      'year-round': 'from-purple-500 to-purple-600'
    };
    return colors[season as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* ATHLETIC STADIUM BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/stadium-crowd-energy.jpg')`,
            backgroundAttachment: 'scroll',
            backgroundPosition: 'center top',
            backgroundSize: '120% auto',
            filter: 'grayscale(100%) contrast(1.5) brightness(0.18) blur(2px)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/85 via-[#111827]/80 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-[#F59E0B]/15" />
      </div>

      {/* Championship Light Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] bg-[#F97316]/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2.5s' }} />

      {/* Global Navigation */}
      

      {/* Content */}
      <div className="relative z-10 pt-20">
        {/* Athletic Header */}
        <header className="border-b border-white/10 bg-black/30 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] flex items-center justify-center border-2 border-white/20">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-white font-black text-2xl bg-gradient-to-r from-white via-[#F59E0B] to-white bg-clip-text text-transparent">
                    {athleticData.director}
                  </h1>
                  <p className="text-white/70 text-lg font-bold">Athletic Director • {athleticData.school}</p>
                  <p className="text-white/50 text-sm">{athleticData.motto}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="grid grid-cols-2 gap-4 text-right">
                  <div>
                    <div className="text-white font-bold text-lg">{athleticData.totalSports}</div>
                    <div className="text-white/60 text-xs">Sports</div>
                  </div>
                  <div>
                    <div className="text-[#F59E0B] font-bold text-lg">{athleticData.championships}</div>
                    <div className="text-white/60 text-xs">Championships</div>
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">{athleticData.totalAthletes}</div>
                    <div className="text-white/60 text-xs">Athletes</div>
                  </div>
                  <div>
                    <div className="text-[#F59E0B] font-bold text-lg">{athleticData.annualBudget}</div>
                    <div className="text-white/60 text-xs">Budget</div>
                  </div>
                </div>
                <HypeWidget userId="athletic_director_demo" compact />
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
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black shadow-lg'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
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
                  {/* Athletic Performance Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: 'Overall Win Rate', value: '84%', change: '+7%', icon: Trophy, color: 'from-[#F59E0B] to-[#F97316]' },
                      { label: 'Active Athletes', value: athleticData.totalAthletes, change: '+12%', icon: Users, color: 'from-blue-500 to-blue-600' },
                      { label: 'Conference Championships', value: '8', change: '+3', icon: Medal, color: 'from-green-500 to-green-600' },
                      { label: 'Scholarship Athletes', value: '47', change: '+9', icon: Star, color: 'from-purple-500 to-purple-600' }
                    ].map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-gradient-to-r ${metric.color} p-6 rounded-2xl text-white shadow-xl relative overflow-hidden`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <metric.icon className="w-10 h-10" />
                          <div className="text-right">
                            <div className="text-3xl font-black">{metric.value}</div>
                            <div className="text-sm font-bold text-green-200">{metric.change}</div>
                          </div>
                        </div>
                        <p className="font-bold text-sm opacity-90">{metric.label}</p>
                        
                        {/* Championship glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Sports Overview & Recent Championships */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Top Sports Programs */}
                    <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                      <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                        <Gamepad2 className="w-6 h-6 text-[#F59E0B]" />
                        Elite Sports Programs
                      </h3>
                      <div className="space-y-4">
                        {mockSports.map((sport, index) => (
                          <motion.div
                            key={sport.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedSport(sport)}
                            className={`bg-gradient-to-r ${getSeasonColor(sport.season)} bg-opacity-20 border border-white/20 rounded-xl p-4 cursor-pointer hover:border-[#F59E0B]/50 transition-all duration-300`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h4 className="text-white font-bold text-lg">{sport.name}</h4>
                                <p className="text-white/70 text-sm capitalize">{sport.season} Season • {sport.coaches.head}</p>
                              </div>
                              <div className="text-right">
                                <div className="text-[#F59E0B] font-bold text-lg">{sport.performance.wins}-{sport.performance.losses}</div>
                                <div className="text-white/60 text-xs">W-L Record</div>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4">
                              <div className="text-center">
                                <div className="text-lg font-bold text-white">{sport.athletes.total}</div>
                                <div className="text-white/60 text-xs">Athletes</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-[#F59E0B]">#{sport.performance.ranking}</div>
                                <div className="text-white/60 text-xs">Ranking</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-white">{sport.performance.championships}</div>
                                <div className="text-white/60 text-xs">Titles</div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Championships */}
                    <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                      <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                        <Crown className="w-6 h-6 text-[#F59E0B]" />
                        Championship Legacy
                      </h3>
                      <div className="space-y-4">
                        {recentChampionships.map((championship, index) => (
                          <motion.div
                            key={championship.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 border border-[#F59E0B]/30 rounded-xl p-4"
                          >
                            <div className="flex items-center gap-4 mb-3">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] flex items-center justify-center">
                                <Trophy className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-white font-bold">{championship.title}</h4>
                                <p className="text-[#F59E0B] text-sm font-bold">{championship.sport} • {championship.year}</p>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                                championship.level === 'state' ? 'bg-red-500/20 text-red-400' :
                                championship.level === 'region' ? 'bg-orange-500/20 text-orange-400' :
                                championship.level === 'conference' ? 'bg-blue-500/20 text-blue-400' :
                                'bg-purple-500/20 text-purple-400'
                              }`}>
                                {championship.level.toUpperCase()}
                              </div>
                            </div>
                            <p className="text-white/60 text-sm">Head Coach: {championship.coach}</p>
                          </motion.div>
                        ))}
                        
                        {/* Championship Summary */}
                        <div className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl p-4 mt-6">
                          <div className="text-center">
                            <div className="text-3xl font-black text-[#F59E0B] mb-2">{athleticData.championships}</div>
                            <div className="text-white font-bold">Total Championships</div>
                            <div className="text-white/60 text-sm">Since 2010</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'sports' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-black text-white">Sports Program Management</h3>
                    <button className="px-6 py-3 bg-[#F59E0B] text-black rounded-xl font-bold hover:bg-[#F97316] transition-colors">
                      <Plus className="w-5 h-5 inline mr-2" />
                      Add New Sport
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {mockSports.map((sport, index) => (
                      <motion.div
                        key={sport.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-gradient-to-br from-black/60 to-[#1E3A8A]/20 border border-white/20 rounded-2xl p-6 hover:border-[#F59E0B]/50 transition-all duration-300`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-white font-bold text-xl mb-1">{sport.name}</h4>
                            <p className="text-white/70 text-sm capitalize">{sport.season} Season</p>
                            <p className="text-[#F59E0B] text-sm font-bold">{sport.coaches.head}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getSeasonColor(sport.season)}`}>
                            {sport.season.toUpperCase()}
                          </div>
                        </div>

                        {/* Performance Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center bg-white/5 rounded-lg p-3">
                            <div className="text-2xl font-black text-[#F59E0B]">{sport.performance.wins}</div>
                            <div className="text-white/60 text-xs">Wins</div>
                          </div>
                          <div className="text-center bg-white/5 rounded-lg p-3">
                            <div className="text-2xl font-black text-white">{sport.performance.losses}</div>
                            <div className="text-white/60 text-xs">Losses</div>
                          </div>
                        </div>

                        {/* Team Info */}
                        <div className="space-y-3 mb-4">
                          <div className="flex justify-between items-center">
                            <span className="text-white/70 text-sm">Total Athletes</span>
                            <span className="text-white font-bold">{sport.athletes.total}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70 text-sm">Conference Ranking</span>
                            <span className="text-[#F59E0B] font-bold">#{sport.performance.ranking}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/70 text-sm">Championships</span>
                            <span className="text-white font-bold">{sport.performance.championships}</span>
                          </div>
                        </div>

                        {/* Budget Overview */}
                        <div className="bg-white/5 rounded-lg p-3 mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-white/70 text-sm">Budget Used</span>
                            <span className="text-white font-bold">
                              ${(sport.budget.spent / 1000).toFixed(0)}k / ${(sport.budget.allocated / 1000).toFixed(0)}k
                            </span>
                          </div>
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] h-2 rounded-full"
                              style={{ width: `${(sport.budget.spent / sport.budget.allocated) * 100}%` }}
                            />
                          </div>
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
        userId="athletic_director_demo"
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
}