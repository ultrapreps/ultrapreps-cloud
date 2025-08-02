'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target,
  Users,
  TrendingUp,
  Star,
  MapPin,
  Calendar,
  Eye,
  Brain,
  Zap,
  Trophy,
  Clock,
  Filter,
  Search,
  Bookmark,
  Video,
  BarChart3,
  MessageSquare,
  Phone,
  Mail,
  Plane,
  DollarSign,
  Award,
  Flame,
  Crown,
  Shield,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Plus,
  Settings,
  Radar,
  Crosshair,
  Telescope,
  Activity
} from 'lucide-react';

import HypeWidget from '../../components/HypeWidget';
import GageAIChat from '../../components/GageAIChat';

interface TalentProfile {
  id: string;
  name: string;
  position: string;
  school: string;
  grade: string;
  height: string;
  weight: string;
  gpa: number;
  stats: {
    [key: string]: number;
  };
  athleticScore: number;
  academicScore: number;
  characterScore: number;
  recruitmentStatus: 'uncontacted' | 'interested' | 'offered' | 'committed' | 'not_interested';
  highlights: string[];
  upcomingGames: Array<{
    date: string;
    opponent: string;
    location: string;
  }>;
  socialMedia: {
    followers: number;
    engagement: number;
  };
  aiInsights: string[];
  predictedFit: number;
  riskFactors: string[];
  competingSchools: string[];
}

interface ScoutingReport {
  id: string;
  playerId: string;
  playerName: string;
  date: string;
  game: string;
  overallRating: number;
  categories: {
    [key: string]: number;
  };
  notes: string;
  videoTimestamps: Array<{
    time: string;
    description: string;
    rating: number;
  }>;
  recommendations: string;
  followUpActions: string[];
}

export default function CollegeScoutDashboard() {
  const [activeTab, setActiveTab] = useState('ai-matching');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedTalent, setSelectedTalent] = useState<TalentProfile | null>(null);
  const [searchFilters, setSearchFilters] = useState({
    position: '',
    location: '',
    gpa: 0,
    athleticRating: 0
  });

  const scoutData = {
    name: 'Coach Mike Rodriguez',
    university: 'State University',
    program: 'Football',
    territory: 'Southeast Region',
    activeRecruits: 247,
    offersExtended: 23,
    commitments: 8,
    targetClass: '2026',
    budget: 85000,
    travelDays: 45
  };

  const mockTalentProfiles: TalentProfile[] = [
    {
      id: '1',
      name: 'Marcus Johnson',
      position: 'Wide Receiver',
      school: 'Champions High School',
      grade: '11th',
      height: '6\'2"',
      weight: '185 lbs',
      gpa: 3.8,
      stats: {
        receptions: 67,
        yards: 1240,
        touchdowns: 15,
        average: 18.5
      },
      athleticScore: 92,
      academicScore: 88,
      characterScore: 95,
      recruitmentStatus: 'interested',
      highlights: ['Game-winning catch vs. Rivals', '200+ yard performance', 'All-State Honorable Mention'],
      upcomingGames: [
        { date: '2025-02-15', opponent: 'City High', location: 'Home' },
        { date: '2025-02-22', opponent: 'North Valley', location: 'Away' }
      ],
      socialMedia: {
        followers: 2400,
        engagement: 8.5
      },
      aiInsights: [
        'Elite route-running ability with advanced separation techniques',
        'Shows exceptional hands in traffic and contested catches',
        'Leadership qualities evident in team communication',
        'Academic trajectory suggests early graduation potential'
      ],
      predictedFit: 94,
      riskFactors: ['Minor injury history - ankle'],
      competingSchools: ['Tech University', 'Mountain State', 'Coastal College']
    },
    {
      id: '2',
      name: 'Samantha Davis',
      position: 'Point Guard',
      school: 'Excellence Academy',
      grade: '12th',
      height: '5\'6"',
      weight: '130 lbs',
      gpa: 4.0,
      stats: {
        points: 18.5,
        assists: 9.2,
        steals: 3.1,
        fieldGoalPercentage: 47.3
      },
      athleticScore: 89,
      academicScore: 98,
      characterScore: 96,
      recruitmentStatus: 'offered',
      highlights: ['Triple-double in state semifinals', 'Academic All-American', 'Team Captain 2 years'],
      upcomingGames: [
        { date: '2025-02-10', opponent: 'Regional Finals', location: 'Neutral' }
      ],
      socialMedia: {
        followers: 1800,
        engagement: 12.3
      },
      aiInsights: [
        'Exceptional court vision and basketball IQ',
        'Natural leader with strong communication skills',
        'Academic excellence with STEM focus',
        'Character references consistently outstanding'
      ],
      predictedFit: 97,
      riskFactors: [],
      competingSchools: ['Ivy League Schools', 'Academic Powerhouses']
    }
  ];

  const mockScoutingReports: ScoutingReport[] = [
    {
      id: '1',
      playerId: '1',
      playerName: 'Marcus Johnson',
      date: '2025-01-28',
      game: 'vs. Central High',
      overallRating: 4.2,
      categories: {
        speed: 4.5,
        hands: 4.8,
        routes: 4.6,
        blocking: 3.8,
        character: 4.9
      },
      notes: 'Outstanding performance in adverse weather conditions. Made several difficult catches in traffic. Leadership visible in huddle communication.',
      videoTimestamps: [
        { time: '2:14', description: 'Spectacular diving catch', rating: 5.0 },
        { time: '15:32', description: 'Perfect route execution', rating: 4.7 },
        { time: '28:45', description: 'Clutch third-down conversion', rating: 4.8 }
      ],
      recommendations: 'Immediate priority recruit. Schedule official visit ASAP.',
      followUpActions: ['Contact head coach', 'Schedule home visit', 'Invite to campus']
    }
  ];

  const tabs = [
    { id: 'ai-matching', label: 'AI Talent Matching', icon: Brain },
    { id: 'virtual-scouting', label: 'Virtual Scouting', icon: Telescope },
    { id: 'talent-pipeline', label: 'Talent Pipeline', icon: Target },
    { id: 'analytics', label: 'Predictive Analytics', icon: BarChart3 },
    { id: 'recruitment', label: 'Active Recruitment', icon: MessageSquare },
    { id: 'territory', label: 'Territory Management', icon: MapPin },
    { id: 'reports', label: 'AI Scouting Reports', icon: Award }
  ];

  const getRecruitmentStatusColor = (status: string) => {
    const colors = {
      uncontacted: 'from-gray-500 to-gray-600',
      interested: 'from-blue-500 to-blue-600',
      offered: 'from-[#F59E0B] to-[#F97316]',
      committed: 'from-green-500 to-green-600',
      not_interested: 'from-red-500 to-red-600'
    };
    return colors[status as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getPredictedFitColor = (fit: number) => {
    if (fit >= 90) return 'text-green-400';
    if (fit >= 80) return 'text-[#F59E0B]';
    if (fit >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* SCOUTING STADIUM BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/stadium-crowd-energy.jpg')`,
            backgroundAttachment: 'scroll',
            backgroundPosition: 'center top',
            backgroundSize: '120% auto',
            filter: 'grayscale(100%) contrast(1.4) brightness(0.14) blur(2px)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/88 via-[#111827]/83 to-black/94" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-[#F59E0B]/10" />
      </div>

      {/* Talent Discovery Light Effects */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#F59E0B]/7 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-[#F97316]/9 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Mega Navigation */}
      

      {/* Content */}
      <div className="relative z-10 pt-20">
        {/* Scout Header */}
        <header className="border-b border-white/10 bg-black/30 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] flex items-center justify-center border-2 border-white/20">
                  <Crosshair className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-white font-black text-2xl bg-gradient-to-r from-white via-[#F59E0B] to-white bg-clip-text text-transparent">
                    {scoutData.name}
                  </h1>
                  <p className="text-white/70 text-lg font-bold">{scoutData.university} • {scoutData.program}</p>
                  <p className="text-white/50 text-sm">Territory: {scoutData.territory}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-right">
                <div>
                  <div className="text-white font-bold text-lg">{scoutData.activeRecruits}</div>
                  <div className="text-white/60 text-xs">Active Recruits</div>
                </div>
                <div>
                  <div className="text-[#F59E0B] font-bold text-lg">{scoutData.commitments}</div>
                  <div className="text-white/60 text-xs">Commitments</div>
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{scoutData.offersExtended}</div>
                  <div className="text-white/60 text-xs">Offers</div>
                </div>
                <div>
                  <div className="text-[#F59E0B] font-bold text-lg">${(scoutData.budget / 1000).toFixed(0)}K</div>
                  <div className="text-white/60 text-xs">Budget</div>
                </div>
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
              {activeTab === 'ai-matching' && (
                <div className="space-y-8">
                  {/* AI Recommendations */}
                  <div className="bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 border border-[#F59E0B]/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Brain className="w-8 h-8 text-[#F59E0B]" />
                      <div>
                        <h3 className="text-2xl font-black text-white">AI Talent Recommendations</h3>
                        <p className="text-white/70">Powered by advanced predictive analytics and fit algorithms</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      {[
                        { label: 'Perfect Fit Matches', value: '12', description: '95%+ predicted success', icon: Target },
                        { label: 'Hidden Gems Found', value: '8', description: 'Undervalued talent', icon: Star },
                        { label: 'Risk Assessments', value: '247', description: 'AI-powered analysis', icon: Shield }
                      ].map((metric, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-black/40 rounded-xl p-4 border border-white/10"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <metric.icon className="w-6 h-6 text-[#F59E0B]" />
                            <span className="text-2xl font-black text-white">{metric.value}</span>
                          </div>
                          <h4 className="text-white font-bold text-sm">{metric.label}</h4>
                          <p className="text-white/60 text-xs">{metric.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Top AI Matched Talent */}
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black text-white flex items-center gap-3">
                      <Radar className="w-8 h-8 text-[#F59E0B]" />
                      Top AI Matched Talent
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {mockTalentProfiles.map((talent, index) => (
                        <motion.div
                          key={talent.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedTalent(talent)}
                          className="bg-gradient-to-br from-black/60 to-[#1E3A8A]/20 border border-white/20 rounded-2xl p-6 cursor-pointer hover:border-[#F59E0B]/50 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-white font-bold text-xl">{talent.name}</h4>
                              <p className="text-[#F59E0B] font-bold">{talent.position}</p>
                              <p className="text-white/70 text-sm">{talent.school} • {talent.grade}</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r ${getRecruitmentStatusColor(talent.recruitmentStatus)} text-white`}>
                              {talent.recruitmentStatus.replace('_', ' ').toUpperCase()}
                            </div>
                          </div>

                          {/* AI Predicted Fit */}
                          <div className="mb-4 p-3 bg-black/40 rounded-xl border border-white/10">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white/70 text-sm">AI Predicted Fit</span>
                              <span className={`font-black text-xl ${getPredictedFitColor(talent.predictedFit)}`}>
                                {talent.predictedFit}%
                              </span>
                            </div>
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div 
                                className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] h-2 rounded-full"
                                style={{ width: `${talent.predictedFit}%` }}
                              />
                            </div>
                          </div>

                          {/* Scores */}
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center">
                              <div className="text-lg font-bold text-[#F59E0B]">{talent.athleticScore}</div>
                              <div className="text-white/60 text-xs">Athletic</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-[#F59E0B]">{talent.academicScore}</div>
                              <div className="text-white/60 text-xs">Academic</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-[#F59E0B]">{talent.characterScore}</div>
                              <div className="text-white/60 text-xs">Character</div>
                            </div>
                          </div>

                          {/* AI Insights Preview */}
                          <div className="mb-4">
                            <h5 className="text-white font-bold text-sm mb-2">🧠 AI Insights</h5>
                            <p className="text-white/60 text-sm line-clamp-2">{talent.aiInsights[0]}</p>
                          </div>

                          {/* Quick Stats */}
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-white/60">GPA: <strong className="text-white">{talent.gpa}</strong></span>
                            <span className="text-white/60">Physical: <strong className="text-white">{talent.height}, {talent.weight}</strong></span>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-2 mt-4">
                            <button className="flex-1 px-3 py-2 bg-[#F59E0B] text-black rounded-lg font-bold hover:bg-[#F97316] transition-colors text-sm">
                              Contact
                            </button>
                            <button className="flex-1 px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-medium text-sm">
                              Schedule Visit
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'virtual-scouting' && (
                <div className="space-y-8">
                  {/* Virtual Scouting Hub */}
                  <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                      <Telescope className="w-6 h-6 text-[#F59E0B]" />
                      Virtual Scouting Command Center
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { title: 'Live Game Streams', count: '45', description: 'Active now', icon: Video, color: 'from-red-500 to-red-600' },
                        { title: 'AI Highlight Reels', count: '128', description: 'Generated today', icon: Zap, color: 'from-[#F59E0B] to-[#F97316]' },
                        { title: 'Virtual Meetings', count: '12', description: 'Scheduled this week', icon: MessageSquare, color: 'from-blue-500 to-blue-600' },
                        { title: 'Remote Evaluations', count: '67', description: 'Completed', icon: CheckCircle, color: 'from-green-500 to-green-600' }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`bg-gradient-to-r ${item.color} p-4 rounded-xl text-white`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <item.icon className="w-6 h-6" />
                            <span className="text-2xl font-black">{item.count}</span>
                          </div>
                          <h4 className="font-bold text-sm">{item.title}</h4>
                          <p className="text-xs opacity-80">{item.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Game Schedule with Virtual Viewing */}
                  <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <h3 className="text-2xl font-black text-white mb-6">Today&apos;s Virtual Scouting Schedule</h3>
                    <div className="space-y-4">
                      {[
                        { time: '7:00 PM', game: 'Champions High vs. City Prep', target: 'Marcus Johnson', status: 'live' },
                        { time: '7:30 PM', game: 'Excellence Academy vs. North Valley', target: 'Samantha Davis', status: 'upcoming' },
                        { time: '8:00 PM', game: 'Metro High vs. Westside', target: 'Multiple Targets', status: 'upcoming' }
                      ].map((game, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10"
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-[#F59E0B] font-bold">{game.time}</div>
                              <div className={`w-3 h-3 rounded-full mx-auto mt-1 ${
                                game.status === 'live' ? 'bg-red-500 animate-pulse' : 'bg-yellow-500'
                              }`}></div>
                            </div>
                            <div>
                              <h4 className="text-white font-bold">{game.game}</h4>
                              <p className="text-white/60 text-sm">Target: {game.target}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-4 py-2 bg-[#F59E0B] text-black rounded-lg font-bold hover:bg-[#F97316] transition-colors text-sm">
                              {game.status === 'live' ? 'Watch Live' : 'Set Alert'}
                            </button>
                            <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-medium text-sm">
                              AI Notes
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
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
        userId="college_scout_demo"
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
}