'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users,
  TrendingUp,
  Heart,
  Trophy,
  Calendar,
  MessageSquare,
  Brain,
  Star,
  Target,
  Clock,
  Award,
  Smile,
  Frown,
  Meh,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Activity,
  BarChart3,
  BookOpen,
  Medal,
  Flag,
  Zap,
  Crown,
  Shield,
  Gift,
  Camera,
  Video,
  ChevronRight,
  Plus,
  Settings,
  Sparkles
} from 'lucide-react';
import MegaNavigation from '../../components/MegaNavigation';
import HypeWidget from '../../components/HypeWidget';
import GageAIChat from '../../components/GageAIChat';

interface YoungAthlete {
  id: string;
  name: string;
  age: number;
  position: string;
  parentName: string;
  parentContact: {
    email: string;
    phone: string;
    preferredMethod: 'email' | 'text' | 'call';
  };
  skillLevel: 'beginner' | 'intermediate' | 'advanced';
  attendance: number;
  behavior: {
    effort: number;
    teamwork: number;
    listening: number;
    attitude: number;
  };
  skillProgress: {
    [skill: string]: {
      baseline: number;
      current: number;
      goal: number;
    };
  };
  medicalInfo: {
    allergies: string[];
    medications: string[];
    emergencyContact: string;
  };
  achievements: string[];
  recentFeedback: string;
  parentSatisfaction: number;
}

interface Practice {
  id: string;
  date: string;
  duration: number;
  focus: string;
  activities: Array<{
    name: string;
    duration: number;
    skillFocus: string[];
    funFactor: number;
  }>;
  attendance: number;
  weather: string;
  notes: string;
  playerHighlights: Array<{
    playerId: string;
    highlight: string;
  }>;
}

interface ParentCommunication {
  id: string;
  playerId: string;
  playerName: string;
  parentName: string;
  type: 'update' | 'concern' | 'achievement' | 'schedule' | 'feedback';
  message: string;
  sent: string;
  response?: string;
  status: 'sent' | 'read' | 'responded';
}

export default function YouthCoachDashboard() {
  const [activeTab, setActiveTab] = useState('team-overview');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState<YoungAthlete | null>(null);

  const coachData = {
    name: 'Coach Sarah Martinez',
    team: 'Lightning Bolts U12',
    sport: 'Soccer',
    season: 'Spring 2025',
    players: 16,
    practicesPerWeek: 2,
    gamesPlayed: 8,
    wins: 6,
    seasonGoal: 'Fun, Development, and Fundamentals',
    certifications: ['Youth Sports Safety', 'Positive Coaching Alliance']
  };

  const mockAthletes: YoungAthlete[] = [
    {
      id: '1',
      name: 'Emma Rodriguez',
      age: 11,
      position: 'Forward',
      parentName: 'Maria Rodriguez',
      parentContact: {
        email: 'maria.rodriguez@email.com',
        phone: '(555) 123-4567',
        preferredMethod: 'text'
      },
      skillLevel: 'intermediate',
      attendance: 95,
      behavior: {
        effort: 95,
        teamwork: 88,
        listening: 92,
        attitude: 96
      },
      skillProgress: {
        'Ball Control': { baseline: 60, current: 78, goal: 85 },
        'Passing': { baseline: 55, current: 72, goal: 80 },
        'Shooting': { baseline: 45, current: 68, goal: 75 },
        'Teamwork': { baseline: 70, current: 88, goal: 90 }
      },
      medicalInfo: {
        allergies: ['Peanuts'],
        medications: [],
        emergencyContact: '(555) 987-6543'
      },
      achievements: ['Most Improved Player', 'Team Spirit Award', 'Perfect Attendance'],
      recentFeedback: 'Emma showed incredible improvement in ball control this week! Her positive attitude is contagious.',
      parentSatisfaction: 98
    },
    {
      id: '2',
      name: 'Tyler Johnson',
      age: 12,
      position: 'Defender',
      parentName: 'David Johnson',
      parentContact: {
        email: 'david.johnson@email.com',
        phone: '(555) 456-7890',
        preferredMethod: 'email'
      },
      skillLevel: 'beginner',
      attendance: 87,
      behavior: {
        effort: 85,
        teamwork: 92,
        listening: 78,
        attitude: 88
      },
      skillProgress: {
        'Defensive Position': { baseline: 40, current: 65, goal: 75 },
        'Communication': { baseline: 50, current: 74, goal: 80 },
        'Tackling': { baseline: 35, current: 58, goal: 70 },
        'Confidence': { baseline: 45, current: 72, goal: 85 }
      },
      medicalInfo: {
        allergies: [],
        medications: ['Inhaler for Asthma'],
        emergencyContact: '(555) 321-9876'
      },
      achievements: ['Best Teammate Award', 'Defensive Player of the Game'],
      recentFeedback: 'Tyler is gaining confidence every practice. His defensive positioning has improved dramatically!',
      parentSatisfaction: 92
    }
  ];

  const mockCommunications: ParentCommunication[] = [
    {
      id: '1',
      playerId: '1',
      playerName: 'Emma Rodriguez',
      parentName: 'Maria Rodriguez',
      type: 'achievement',
      message: 'Emma scored her first goal today! She showed excellent ball control and determination. Very proud of her progress! 🎉',
      sent: '2025-01-28 16:30',
      response: 'Thank you so much! Emma was so excited to tell me about it!',
      status: 'responded'
    },
    {
      id: '2',
      playerId: '2',
      playerName: 'Tyler Johnson',
      parentName: 'David Johnson',
      type: 'update',
      message: 'Tyler had a great practice today focusing on defensive positioning. He\'s gaining confidence and asking great questions!',
      sent: '2025-01-28 15:45',
      status: 'read'
    }
  ];

  const tabs = [
    { id: 'team-overview', label: 'Team Overview', icon: Users },
    { id: 'skill-development', label: 'Skill Development', icon: TrendingUp },
    { id: 'parent-communication', label: 'Parent Hub', icon: MessageSquare },
    { id: 'practice-planning', label: 'AI Practice Planner', icon: Brain },
    { id: 'behavior-tracking', label: 'Behavior & Fun', icon: Heart },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'safety-wellness', label: 'Safety & Wellness', icon: Shield }
  ];

  const getSkillProgressColor = (progress: number) => {
    if (progress >= 80) return 'from-green-500 to-green-600';
    if (progress >= 60) return 'from-[#F59E0B] to-[#F97316]';
    return 'from-red-500 to-red-600';
  };

  const getBehaviorColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-[#F59E0B]';
    return 'text-red-400';
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return 'text-green-400';
    if (attendance >= 80) return 'text-[#F59E0B]';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* YOUTH DEVELOPMENT STADIUM BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/stadium-crowd-energy.jpg')`,
            backgroundAttachment: 'scroll',
            backgroundPosition: 'center top',
            backgroundSize: '120% auto',
            filter: 'grayscale(100%) contrast(1.2) brightness(0.17) blur(2px)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/85 via-[#111827]/80 to-black/92" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-[#F59E0B]/12" />
      </div>

      {/* Youth Development Light Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F59E0B]/8 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-[450px] h-[450px] bg-[#F97316]/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2.5s' }} />

      {/* Mega Navigation */}
      <MegaNavigation currentPage="youth-coach-dashboard" userRole="coach" userName="Coach Sarah Martinez" />

      {/* Content */}
      <div className="relative z-10 pt-20">
        {/* Coach Header */}
        <header className="border-b border-white/10 bg-black/30 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] flex items-center justify-center border-2 border-white/20">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-white font-black text-2xl bg-gradient-to-r from-white via-[#F59E0B] to-white bg-clip-text text-transparent">
                    {coachData.name}
                  </h1>
                  <p className="text-white/70 text-lg font-bold">{coachData.team} • {coachData.sport}</p>
                  <p className="text-white/50 text-sm">{coachData.seasonGoal}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-right">
                <div>
                  <div className="text-white font-bold text-lg">{coachData.players}</div>
                  <div className="text-white/60 text-xs">Players</div>
                </div>
                <div>
                  <div className="text-[#F59E0B] font-bold text-lg">{coachData.wins}-{coachData.gamesPlayed - coachData.wins}</div>
                  <div className="text-white/60 text-xs">Record</div>
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{coachData.practicesPerWeek}x</div>
                  <div className="text-white/60 text-xs">Per Week</div>
                </div>
                <div>
                  <div className="text-[#F59E0B] font-bold text-lg">98%</div>
                  <div className="text-white/60 text-xs">Fun Score</div>
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
              {activeTab === 'team-overview' && (
                <div className="space-y-8">
                  {/* Team Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {[
                      { label: 'Team Fun Score', value: '98%', description: 'Kids having a blast!', icon: Smile, color: 'from-green-500 to-green-600' },
                      { label: 'Skill Development', value: '87%', description: 'Average improvement', icon: TrendingUp, color: 'from-[#F59E0B] to-[#F97316]' },
                      { label: 'Parent Satisfaction', value: '95%', description: 'Happy families', icon: Heart, color: 'from-purple-500 to-purple-600' },
                      { label: 'Team Attendance', value: '91%', description: 'Great commitment', icon: CheckCircle, color: 'from-blue-500 to-blue-600' }
                    ].map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-gradient-to-r ${metric.color} p-4 sm:p-6 rounded-xl sm:rounded-2xl text-white shadow-xl`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <metric.icon className="w-8 h-8" />
                          <span className="text-2xl sm:text-3xl font-black">{metric.value}</span>
                        </div>
                        <p className="font-bold text-sm opacity-90">{metric.label}</p>
                        <p className="text-xs opacity-75">{metric.description}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Player Roster */}
                  <div className="space-y-6">
                    <h3 className="text-3xl font-black text-white flex items-center gap-3">
                      <Users className="w-8 h-8 text-[#F59E0B]" />
                      Player Development Roster
                    </h3>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {mockAthletes.map((athlete, index) => (
                        <motion.div
                          key={athlete.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedAthlete(athlete)}
                          className="bg-gradient-to-br from-black/60 to-[#1E3A8A]/20 border border-white/20 rounded-2xl p-6 cursor-pointer hover:border-[#F59E0B]/50 transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="text-white font-bold text-xl">{athlete.name}</h4>
                              <p className="text-[#F59E0B] font-bold">{athlete.position} • Age {athlete.age}</p>
                              <p className="text-white/70 text-sm">Parent: {athlete.parentName}</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                              athlete.skillLevel === 'advanced' ? 'bg-green-500/20 text-green-400' :
                              athlete.skillLevel === 'intermediate' ? 'bg-[#F59E0B]/20 text-[#F59E0B]' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>
                              {athlete.skillLevel.toUpperCase()}
                            </div>
                          </div>

                          {/* Progress Overview */}
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="text-center">
                              <div className={`text-lg font-bold ${getAttendanceColor(athlete.attendance)}`}>
                                {athlete.attendance}%
                              </div>
                              <div className="text-white/60 text-xs">Attendance</div>
                            </div>
                            <div className="text-center">
                              <div className={`text-lg font-bold ${getBehaviorColor(
                                (athlete.behavior.effort + athlete.behavior.teamwork + athlete.behavior.listening + athlete.behavior.attitude) / 4
                              )}`}>
                                {Math.round((athlete.behavior.effort + athlete.behavior.teamwork + athlete.behavior.listening + athlete.behavior.attitude) / 4)}%
                              </div>
                              <div className="text-white/60 text-xs">Behavior</div>
                            </div>
                          </div>

                          {/* Recent Feedback */}
                          <div className="mb-4 p-3 bg-black/40 rounded-xl border border-white/10">
                            <h5 className="text-white font-bold text-sm mb-2">Latest Coach Feedback</h5>
                            <p className="text-white/60 text-sm line-clamp-2">{athlete.recentFeedback}</p>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex gap-2">
                            <button className="flex-1 px-3 py-2 bg-[#F59E0B] text-black rounded-lg font-bold hover:bg-[#F97316] transition-colors text-sm">
                              Message Parent
                            </button>
                            <button className="flex-1 px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-medium text-sm">
                              Track Skills
                            </button>
                          </div>

                          {/* Achievements */}
                          {athlete.achievements.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-1">
                              {athlete.achievements.slice(0, 2).map((achievement, idx) => (
                                <span key={idx} className="px-2 py-1 bg-[#F59E0B]/20 text-[#F59E0B] text-xs rounded-full">
                                  🏆 {achievement}
                                </span>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'parent-communication' && (
                <div className="space-y-8">
                  {/* Communication Hub */}
                  <div className="bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 border border-[#F59E0B]/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <MessageSquare className="w-8 h-8 text-[#F59E0B]" />
                      <div>
                        <h3 className="text-2xl font-black text-white">Parent Communication Hub</h3>
                        <p className="text-white/70">Building strong relationships through transparent communication</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { label: 'Messages Sent Today', value: '12', icon: Mail, description: 'All positive updates!' },
                        { label: 'Parent Response Rate', value: '96%', icon: Heart, description: 'Engaged families' },
                        { label: 'Avg Response Time', value: '2.3hrs', icon: Clock, description: 'Quick communication' }
                      ].map((stat, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-black/40 rounded-xl p-4 border border-white/10"
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <stat.icon className="w-6 h-6 text-[#F59E0B]" />
                            <span className="text-2xl font-black text-white">{stat.value}</span>
                          </div>
                          <h4 className="text-white font-bold text-sm">{stat.label}</h4>
                          <p className="text-white/60 text-xs">{stat.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Communications */}
                  <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-black text-white">Recent Parent Communications</h3>
                      <button className="px-4 py-2 bg-[#F59E0B] text-black rounded-lg font-bold hover:bg-[#F97316] transition-colors">
                        <Plus className="w-4 h-4 inline mr-2" />
                        Send Update
                      </button>
                    </div>

                    <div className="space-y-4">
                      {mockCommunications.map((comm, index) => (
                        <motion.div
                          key={comm.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/5 rounded-xl p-4 border border-white/10"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="text-white font-bold">{comm.playerName}</h4>
                              <p className="text-white/70 text-sm">To: {comm.parentName}</p>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-bold mt-1 ${
                                comm.type === 'achievement' ? 'bg-green-500/20 text-green-400' :
                                comm.type === 'update' ? 'bg-blue-500/20 text-blue-400' :
                                comm.type === 'concern' ? 'bg-red-500/20 text-red-400' :
                                'bg-[#F59E0B]/20 text-[#F59E0B]'
                              }`}>
                                {comm.type.toUpperCase()}
                              </span>
                            </div>
                            <div className="text-right">
                              <div className="text-white/60 text-xs">{comm.sent}</div>
                              <div className={`text-xs font-bold mt-1 ${
                                comm.status === 'responded' ? 'text-green-400' :
                                comm.status === 'read' ? 'text-[#F59E0B]' : 'text-gray-400'
                              }`}>
                                {comm.status.toUpperCase()}
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-white/80 mb-3">{comm.message}</p>
                          
                          {comm.response && (
                            <div className="bg-white/5 rounded-lg p-3 border-l-4 border-[#F59E0B]">
                              <p className="text-white/70 text-sm">Parent Response:</p>
                              <p className="text-white text-sm">{comm.response}</p>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'practice-planning' && (
                <div className="space-y-8">
                  {/* AI Practice Planner */}
                  <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <Brain className="w-8 h-8 text-purple-400" />
                      <div>
                        <h3 className="text-2xl font-black text-white">AI Practice Planner</h3>
                        <p className="text-white/70">Intelligent practice design based on player development needs</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { title: 'Skill-Based Drills', count: '47', description: 'AI recommended', icon: Target },
                        { title: 'Fun Activities', count: '23', description: 'High engagement', icon: Sparkles },
                        { title: 'Practice Plans', count: '12', description: 'This season', icon: BookOpen },
                        { title: 'Success Rate', count: '94%', description: 'Player improvement', icon: TrendingUp }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-black/40 rounded-xl p-4 border border-white/10"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <item.icon className="w-6 h-6 text-purple-400" />
                            <span className="text-xl font-black text-white">{item.count}</span>
                          </div>
                          <h4 className="text-white font-bold text-sm">{item.title}</h4>
                          <p className="text-white/60 text-xs">{item.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Practice */}
                  <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                    <h3 className="text-2xl font-black text-white mb-6">Next Practice: Tuesday, Feb 1st</h3>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Practice Plan */}
                      <div>
                        <h4 className="text-white font-bold text-lg mb-4">AI-Generated Practice Plan</h4>
                        <div className="space-y-3">
                          {[
                            { time: '5 min', activity: 'Dynamic Warm-up', focus: 'Movement preparation', fun: 4 },
                            { time: '10 min', activity: 'Ball Control Stations', focus: 'Individual skill', fun: 5 },
                            { time: '15 min', activity: 'Passing in Pairs', focus: 'Teamwork & accuracy', fun: 4 },
                            { time: '20 min', activity: 'Small-sided Games', focus: 'Decision making', fun: 5 },
                            { time: '5 min', activity: 'Cool Down & Team Talk', focus: 'Recovery & feedback', fun: 3 }
                          ].map((activity, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-[#F59E0B]/20 flex items-center justify-center">
                                  <span className="text-[#F59E0B] font-bold text-sm">{activity.time}</span>
                                </div>
                                <div>
                                  <h5 className="text-white font-bold">{activity.activity}</h5>
                                  <p className="text-white/60 text-sm">{activity.focus}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < activity.fun ? 'text-[#F59E0B] fill-current' : 'text-gray-400'}`} 
                                  />
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Focus Areas */}
                      <div>
                        <h4 className="text-white font-bold text-lg mb-4">Focus Areas This Week</h4>
                        <div className="space-y-4">
                          {[
                            { skill: 'Ball Control', players: ['Emma R.', 'Tyler J.'], priority: 'high' },
                            { skill: 'Teamwork', players: ['Whole Team'], priority: 'medium' },
                            { skill: 'Confidence Building', players: ['Tyler J.', 'Sarah M.'], priority: 'high' },
                            { skill: 'Fun & Enjoyment', players: ['Everyone!'], priority: 'critical' }
                          ].map((focus, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="bg-white/5 rounded-lg p-4 border border-white/10"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="text-white font-bold">{focus.skill}</h5>
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                  focus.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                                  focus.priority === 'high' ? 'bg-[#F59E0B]/20 text-[#F59E0B]' :
                                  'bg-blue-500/20 text-blue-400'
                                }`}>
                                  {focus.priority.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-white/60 text-sm">Focus players: {focus.players.join(', ')}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
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
        userId="youth_coach_demo"
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
}