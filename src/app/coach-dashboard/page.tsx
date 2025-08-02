'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  Users, Trophy, MessageCircle, Calendar, 
  ArrowLeft, TrendingUp, BarChart3,
  Crown, Zap, Clipboard, UserCheck, Settings,
  Video, Play, Eye, Target, Brain, Shield,
  AlertTriangle, HeartHandshake, BookOpen, Gamepad2, Heart,
  Megaphone, Send, Bell, MapPin, Clock, Phone,
  Stethoscope, Bandage, Activity, Thermometer,
  GraduationCap, Calculator, TrendingDown, Award,
  FileText, PlusCircle, Edit3, Search, Filter,
  Download, Upload, Share2, Star, Flame,
  Mic, Camera, Pause, SkipForward, RotateCcw,
  BarChart, PieChart, LineChart, Globe
} from 'lucide-react';
import GageAIChat from '../../components/GageAIChat';
import HypeWidget from '../../components/HypeWidget';


interface TeamPlayer {
  id: string;
  name: string;
  school: string;
  graduationYear: number;
  position: string;
  jerseyNumber: number;
  gpa: number;
  hypeScore: number;
  level: number;
  profileImage?: string;
  stats: {
    gamesPlayed: number;
    keyStats: Record<string, string | number>;
    weeklyActiveTime: string;
    lastActive: Date;
  };
  performance: {
    practiceAttendance: number; // percentage
    gamePerformance: number; // rating 1-10
    teamworkRating: number; // rating 1-10
    academicStatus: 'excellent' | 'good' | 'warning' | 'concern';
  };
  achievements: Achievement[];
  recentActivities: Activity[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  earnedDate: Date;
  hypeValue: number;
}

interface Activity {
  id: string;
  type: 'achievement' | 'training' | 'game' | 'academic' | 'hype_earned';
  title: string;
  description: string;
  timestamp: Date;
  hypeAwarded?: number;
}

interface TeamStats {
  totalPlayers: number;
  activeToday: number;
  averageGPA: number;
  totalHypeEarned: number;
  upcomingGames: number;
  practiceAttendance: number;
}

interface FilmSession {
  id: string;
  title: string;
  opponent: string;
  date: Date;
  gameType: 'practice' | 'scrimmage' | 'game';
  duration: string;
  aiAnalysisComplete: boolean;
  highlights: number;
  keyPlays: number;
  playerFocus: string[];
  thumbnail: string;
}

interface PlaybookPlay {
  id: string;
  name: string;
  category: 'offense' | 'defense' | 'special';
  formation: string;
  description: string;
  successRate: number;
  recommendedVs: string[];
  aiRecommendation: boolean;
  lastUsed: Date;
}

interface HealthAlert {
  id: string;
  playerId: string;
  playerName: string;
  type: 'injury' | 'illness' | 'medical' | 'concussion' | 'fatigue';
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'new' | 'monitoring' | 'cleared' | 'restricted';
  description: string;
  dateReported: Date;
  estimatedReturn?: Date;
}

interface AcademicAlert {
  id: string;
  playerId: string;
  playerName: string;
  type: 'gpa' | 'attendance' | 'eligibility' | 'missing_assignment' | 'failing_grade';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  subject?: string;
  currentGPA: number;
  requiredGPA: number;
  daysUntilIneligible?: number;
}

interface MessageThread {
  id: string;
  type: 'team' | 'parent' | 'individual' | 'emergency';
  subject: string;
  participants: string[];
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  priority: 'low' | 'normal' | 'high' | 'urgent';
}

interface CoachTab {
  id: string;
  label: string;
  icon: React.ComponentType<{className?: string}>;
}

const COACH_TABS: CoachTab[] = [
  { id: 'overview', label: 'Command Center', icon: BarChart3 },
      { id: 'filmroom', label: 'AI Film Room', icon: Video },
  { id: 'roster', label: 'Smart Roster', icon: Users },
  { id: 'playbook', label: 'AI Playbook', icon: Gamepad2 },
      { id: 'communication', label: 'Team Communication', icon: Megaphone },
  { id: 'academics', label: 'Academic Command', icon: GraduationCap },
  { id: 'health', label: 'Health & Safety', icon: Shield },
  { id: 'analytics', label: 'Performance AI', icon: Brain },
  { id: 'schedule', label: 'Smart Schedule', icon: Calendar }
];

// Mock team data
const MOCK_TEAM_STATS: TeamStats = {
  totalPlayers: 28,
  activeToday: 24,
  averageGPA: 3.4,
  totalHypeEarned: 15240,
  upcomingGames: 3,
  practiceAttendance: 87
};

const MOCK_PLAYERS: TeamPlayer[] = [
  {
    id: '1',
    name: 'Marcus Thompson',
    school: 'Central High School',
    graduationYear: 2025,
    position: 'Quarterback',
    jerseyNumber: 12,
    gpa: 3.8,
    hypeScore: 1520,
    level: 9,
    stats: {
      gamesPlayed: 8,
      keyStats: {
        'Passing Yards': '2,247',
        'Touchdowns': 18,
        'Completion %': '67.3%',
        'QBR': 88.4
      },
      weeklyActiveTime: '14h 22m',
      lastActive: new Date(Date.now() - 1 * 60 * 60 * 1000)
    },
    performance: {
      practiceAttendance: 95,
      gamePerformance: 8.5,
      teamworkRating: 9.2,
      academicStatus: 'excellent'
    },
    achievements: [
      {
        id: '1',
        title: 'Team Captain',
        description: 'Selected as team captain',
        category: 'Leadership',
        earnedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        hypeValue: 150
      }
    ],
    recentActivities: [
      {
        id: '1',
        type: 'game',
        title: 'Homecoming Victory',
        description: 'Led team to 28-14 victory',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        hypeAwarded: 75
      }
    ]
  },
  {
    id: '2',
    name: 'David Rodriguez',
    school: 'Central High School',
    graduationYear: 2026,
    position: 'Running Back',
    jerseyNumber: 22,
    gpa: 3.2,
    hypeScore: 980,
    level: 7,
    stats: {
      gamesPlayed: 7,
      keyStats: {
        'Rushing Yards': '1,156',
        'Touchdowns': 12,
        'Avg per Carry': '5.8',
        'Fumbles': 1
      },
      weeklyActiveTime: '11h 45m',
      lastActive: new Date(Date.now() - 4 * 60 * 60 * 1000)
    },
    performance: {
      practiceAttendance: 88,
      gamePerformance: 7.8,
      teamworkRating: 8.5,
      academicStatus: 'good'
    },
    achievements: [
      {
        id: '2',
        title: 'Breakout Performance',
        description: '200+ yard rushing game',
        category: 'Athletic',
        earnedDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
        hypeValue: 100
      }
    ],
    recentActivities: [
      {
        id: '2',
        type: 'training',
        title: 'Speed Training Session',
        description: 'Completed advanced agility drills',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        hypeAwarded: 25
      }
    ]
  },
  {
    id: '3',
    name: 'Isaiah Washington',
    school: 'Central High School',
    graduationYear: 2027,
    position: 'Wide Receiver',
    jerseyNumber: 84,
    gpa: 2.8,
    hypeScore: 720,
    level: 5,
    stats: {
      gamesPlayed: 6,
      keyStats: {
        'Receptions': 34,
        'Receiving Yards': '568',
        'Touchdowns': 6,
        'Drops': 3
      },
      weeklyActiveTime: '8h 30m',
      lastActive: new Date(Date.now() - 12 * 60 * 60 * 1000)
    },
    performance: {
      practiceAttendance: 75,
      gamePerformance: 6.5,
      teamworkRating: 7.0,
      academicStatus: 'warning'
    },
    achievements: [],
    recentActivities: [
      {
        id: '3',
        type: 'academic',
        title: 'Study Hall Session',
        description: 'Attended mandatory academic support',
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        hypeAwarded: 15
      }
    ]
  }
];

// Mock Film Room Data
const MOCK_FILM_SESSIONS: FilmSession[] = [
  {
    id: '1',
    title: 'vs. Eagles - Championship Game',
    opponent: 'East Valley Eagles',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    gameType: 'game',
    duration: '2:47:32',
    aiAnalysisComplete: true,
    highlights: 23,
    keyPlays: 47,
    playerFocus: ['Marcus Thompson', 'David Rodriguez'],
    thumbnail: '/herocard-1.png'
  },
  {
    id: '2',
    title: 'Practice - Red Zone Efficiency',
    opponent: 'Internal',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    gameType: 'practice',
    duration: '1:23:15',
    aiAnalysisComplete: true,
    highlights: 12,
    keyPlays: 28,
    playerFocus: ['Isaiah Washington'],
    thumbnail: '/herocard-2.png'
  }
];

// Mock Playbook Data
const MOCK_PLAYBOOK_PLAYS: PlaybookPlay[] = [
  {
    id: '1',
    name: 'Thunder Strike',
    category: 'offense',
    formation: 'Shotgun Spread',
    description: 'Quick slant combination with RB swing route',
    successRate: 87,
    recommendedVs: ['Cover 2', 'Man Coverage'],
    aiRecommendation: true,
    lastUsed: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: '2',
    name: 'Blitz Crusher',
    category: 'offense',
    formation: 'I-Formation',
    description: 'Hot route protection with quick release',
    successRate: 73,
    recommendedVs: ['Blitz Package', 'Aggressive Defense'],
    aiRecommendation: false,
    lastUsed: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  }
];

// Mock Health Alerts
const MOCK_HEALTH_ALERTS: HealthAlert[] = [
  {
    id: '1',
    playerId: '2',
    playerName: 'David Rodriguez',
    type: 'injury',
    severity: 'medium',
    status: 'monitoring',
    description: 'Minor ankle strain during practice',
    dateReported: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    estimatedReturn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: '2',
    playerId: '3',
    playerName: 'Isaiah Washington',
    type: 'fatigue',
    severity: 'low',
    status: 'monitoring',
    description: 'Showing signs of overexertion in recent practices',
    dateReported: new Date(Date.now() - 2 * 60 * 60 * 1000)
  }
];

// Mock Academic Alerts
const MOCK_ACADEMIC_ALERTS: AcademicAlert[] = [
  {
    id: '1',
    playerId: '3',
    playerName: 'Isaiah Washington',
    type: 'gpa',
    severity: 'high',
    description: 'GPA dropped below eligibility threshold',
    subject: 'Mathematics',
    currentGPA: 2.8,
    requiredGPA: 3.0,
    daysUntilIneligible: 14
  }
];

// Mock Message Threads
const MOCK_MESSAGE_THREADS: MessageThread[] = [
  {
    id: '1',
    type: 'emergency',
    subject: 'Practice Cancelled - Weather Alert',
    participants: ['All Team', 'All Parents'],
    lastMessage: 'Due to severe weather conditions, tonight\'s practice is cancelled...',
    lastMessageTime: new Date(Date.now() - 30 * 60 * 1000),
    unreadCount: 0,
    priority: 'urgent'
  },
  {
    id: '2',
    type: 'parent',
    subject: 'Championship Game Travel Details',
    participants: ['Parents Group'],
    lastMessage: 'Bus departure time confirmed for 2:00 PM...',
    lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
    unreadCount: 3,
    priority: 'high'
  },
  {
    id: '3',
    type: 'individual',
    subject: 'Marcus - College Recruiter Interest',
    participants: ['Marcus Thompson', 'Thompson Parents'],
    lastMessage: 'State University coach wants to schedule a visit...',
    lastMessageTime: new Date(Date.now() - 4 * 60 * 60 * 1000),
    unreadCount: 1,
    priority: 'normal'
  }
];

export default function CoachDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPlayer, setSelectedPlayer] = useState<TeamPlayer | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('varsity');
  const [selectedFilm, setSelectedFilm] = useState<FilmSession | null>(null);
  const [selectedPlay, setSelectedPlay] = useState<PlaybookPlay | null>(null);
  const [messageFilter, setMessageFilter] = useState('all');

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.5) return 'text-green-400';
    if (gpa >= 3.0) return 'text-yellow-400';
    if (gpa >= 2.5) return 'text-orange-400';
    return 'text-red-400';
  };

  const getAcademicStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'good': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'concern': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPerformanceRating = (rating: number) => {
    if (rating >= 8) return 'text-green-400';
    if (rating >= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getAttendanceColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 80) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'medium': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'critical': return 'bg-red-600/20 text-red-300 border-red-600/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'normal': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'low': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 80) return 'text-green-400';
    if (rate >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Stadium Background */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/stadium-crowd-energy.jpg')`,
          backgroundAttachment: 'scroll',
          backgroundPosition: 'center top',
          backgroundSize: '120% auto',
          filter: 'grayscale(100%) contrast(1.2) brightness(0.3) blur(3px)',
          WebkitFilter: 'grayscale(100%) contrast(1.2) brightness(0.3) blur(3px)'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10">
              
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-[#F59E0B] hover:text-[#F97316] transition-colors">
                  <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="text-white/60">|</div>
                <h1 className="text-white font-bold text-xl">Coach Dashboard</h1>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-white/60 text-sm">
                  Managing {MOCK_TEAM_STATS.totalPlayers} players
                </div>
                <HypeWidget userId="coach_user" compact />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Enhanced Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="relative inline-block">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-6 relative z-10">
                <span className="text-[#F59E0B] drop-shadow-[0_0_30px_rgba(245,158,11,0.5)]">ULTRA</span> 
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"> COACH</span>
              </h2>
              <div className="absolute -inset-4 bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 rounded-2xl blur-2xl opacity-50" />
            </div>
            <div className="bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 backdrop-blur-sm rounded-2xl border border-[#F59E0B]/30 p-6 max-w-4xl mx-auto">
              <p className="text-white/90 text-xl font-medium leading-relaxed">
                🏈 <span className="text-[#F59E0B] font-bold">Championship Command Center</span> - Film room, AI analytics, player development, and recruiting tools
              </p>
              <p className="text-white/70 text-lg mt-2">
                The complete coaching ecosystem to build championship teams and develop future stars
              </p>
            </div>
          </motion.div>

          {/* Enhanced Team Overview Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-6 gap-6 mb-12"
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-400/30 text-center shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:shadow-[0_0_50px_rgba(59,130,246,0.2)] transition-all duration-300"
            >
              <Users className="w-10 h-10 text-blue-400 mx-auto mb-3 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              <div className="text-white font-black text-3xl mb-1">{MOCK_TEAM_STATS.totalPlayers}</div>
              <div className="text-blue-200 text-sm font-bold">Total Players</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-green-500/20 to-green-600/10 backdrop-blur-lg rounded-2xl p-6 border border-green-400/30 text-center shadow-[0_0_30px_rgba(34,197,94,0.1)] hover:shadow-[0_0_50px_rgba(34,197,94,0.2)] transition-all duration-300"
            >
              <UserCheck className="w-10 h-10 text-green-400 mx-auto mb-3 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <div className="text-white font-black text-3xl mb-1">{MOCK_TEAM_STATS.activeToday}</div>
              <div className="text-green-200 text-sm font-bold">Active Today</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 backdrop-blur-lg rounded-2xl p-6 border border-yellow-400/30 text-center shadow-[0_0_30px_rgba(234,179,8,0.1)] hover:shadow-[0_0_50px_rgba(234,179,8,0.2)] transition-all duration-300"
            >
              <Trophy className="w-10 h-10 text-yellow-400 mx-auto mb-3 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
              <div className={`font-black text-3xl mb-1 ${getGPAColor(MOCK_TEAM_STATS.averageGPA)}`}>{MOCK_TEAM_STATS.averageGPA}</div>
              <div className="text-yellow-200 text-sm font-bold">Avg GPA</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-[#F59E0B]/20 to-[#F97316]/10 backdrop-blur-lg rounded-2xl p-6 border border-[#F59E0B]/30 text-center shadow-[0_0_30px_rgba(245,158,11,0.1)] hover:shadow-[0_0_50px_rgba(245,158,11,0.2)] transition-all duration-300"
            >
              <Zap className="w-10 h-10 text-[#F59E0B] mx-auto mb-3 drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
              <div className="text-white font-black text-3xl mb-1">{MOCK_TEAM_STATS.totalHypeEarned.toLocaleString()}</div>
              <div className="text-orange-200 text-sm font-bold">Team HYPE</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 backdrop-blur-lg rounded-2xl p-6 border border-purple-400/30 text-center shadow-[0_0_30px_rgba(168,85,247,0.1)] hover:shadow-[0_0_50px_rgba(168,85,247,0.2)] transition-all duration-300"
            >
              <Calendar className="w-10 h-10 text-purple-400 mx-auto mb-3 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              <div className="text-white font-black text-3xl mb-1">{MOCK_TEAM_STATS.upcomingGames}</div>
              <div className="text-purple-200 text-sm font-bold">Next Games</div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-gradient-to-br from-orange-500/20 to-orange-600/10 backdrop-blur-lg rounded-2xl p-6 border border-orange-400/30 text-center shadow-[0_0_30px_rgba(249,115,22,0.1)] hover:shadow-[0_0_50px_rgba(249,115,22,0.2)] transition-all duration-300"
            >
              <Clipboard className="w-10 h-10 text-orange-400 mx-auto mb-3 drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
              <div className={`font-black text-3xl mb-1 ${getAttendanceColor(MOCK_TEAM_STATS.practiceAttendance)}`}>{MOCK_TEAM_STATS.practiceAttendance}%</div>
              <div className="text-orange-200 text-sm font-bold">Attendance</div>
            </motion.div>
          </motion.div>

          {/* Tab Navigation */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 mb-8">
            <div className="flex flex-wrap gap-2">
              {COACH_TABS.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 font-medium ${
                      activeTab === tab.id
                        ? 'bg-[#F59E0B] text-white shadow-lg'
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {/* Command Center Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Multi-Team Selector */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white font-bold text-lg">Team Command Center</h4>
                    <div className="flex gap-2">
                      {['varsity', 'jv', 'freshman'].map((team) => (
                        <button
                          key={team}
                          onClick={() => setSelectedTeam(team)}
                          className={`px-4 py-2 rounded-xl font-medium transition-all ${
                            selectedTeam === team
                              ? 'bg-[#F59E0B] text-white'
                              : 'bg-white/10 text-white/70 hover:bg-white/20'
                          }`}
                        >
                          {team.charAt(0).toUpperCase() + team.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Critical Alerts */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                      <h4 className="text-white font-bold text-lg">Critical Alerts</h4>
                    </div>
                    <div className="space-y-3">
                      {MOCK_HEALTH_ALERTS.filter(alert => alert.severity === 'high' || alert.severity === 'critical').map((alert) => (
                        <div key={alert.id} className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-red-400" />
                            <span className="text-white font-medium">{alert.playerName}</span>
                          </div>
                          <p className="text-red-400 text-sm mt-1">{alert.description}</p>
                        </div>
                      ))}
                      {MOCK_ACADEMIC_ALERTS.filter(alert => alert.severity === 'high' || alert.severity === 'critical').map((alert) => (
                        <div key={alert.id} className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-orange-400" />
                            <span className="text-white font-medium">{alert.playerName}</span>
                          </div>
                          <p className="text-orange-400 text-sm mt-1">{alert.description}</p>
                          <p className="text-white/60 text-xs mt-1">Days until ineligible: {alert.daysUntilIneligible}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Recommendations */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center gap-2 mb-4">
                      <Brain className="w-6 h-6 text-[#F59E0B]" />
                      <h4 className="text-white font-bold text-lg">AI Insights</h4>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-[#F59E0B]/10 rounded-xl border border-[#F59E0B]/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-4 h-4 text-[#F59E0B]" />
                          <span className="text-[#F59E0B] font-bold">Game Strategy</span>
                        </div>
                        <p className="text-white text-sm">Against Eagles: Use Thunder Strike play 40% more - their secondary struggles with quick slants.</p>
                      </div>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-400 font-bold">Player Development</span>
                        </div>
                        <p className="text-white text-sm">Isaiah needs 15% more red zone reps to improve catch rate in tight spaces.</p>
                      </div>
                      <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <HeartHandshake className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 font-bold">Team Chemistry</span>
                        </div>
                        <p className="text-white text-sm">Marcus & David show 94% success rate on combo plays - increase usage by 20%.</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <h4 className="text-white font-bold text-lg mb-4">Quick Actions</h4>
                    <div className="space-y-3">
                      <button className="w-full flex items-center gap-3 p-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all">
                        <Bell className="w-5 h-5" />
                        <span>Send Emergency Alert</span>
                      </button>
                      <button className="w-full flex items-center gap-3 p-3 bg-[#F59E0B]/20 text-[#F59E0B] rounded-xl hover:bg-[#F59E0B]/30 transition-all">
                        <Video className="w-5 h-5" />
                        <span>Analyze Latest Film</span>
                      </button>
                      <button className="w-full flex items-center gap-3 p-3 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all">
                        <Megaphone className="w-5 h-5" />
                        <span>Message All Parents</span>
                      </button>
                      <button className="w-full flex items-center gap-3 p-3 bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500/30 transition-all">
                        <Calendar className="w-5 h-5" />
                        <span>Schedule Team Meeting</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* AI FILM ROOM */}
            {activeTab === 'filmroom' && (
              <motion.div
                key="filmroom"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Video className="w-8 h-8 text-[#F59E0B]" />
                    <h3 className="text-3xl font-black text-white">AI FILM ROOM</h3>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-bold rounded-full">AI-POWERED</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-[#F59E0B] text-white rounded-xl hover:bg-[#F97316] transition-colors">
                      <Upload className="w-4 h-4 inline-block mr-2" />
                      Upload Film
                    </button>
                    <button className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
                      <Eye className="w-4 h-4 inline-block mr-2" />
                      Live Analysis
                    </button>
                  </div>
                </div>

                {/* Film Sessions Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {MOCK_FILM_SESSIONS.map((session) => (
                    <div key={session.id} 
                         className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden hover:border-[#F59E0B]/50 transition-all cursor-pointer"
                         onClick={() => setSelectedFilm(session)}>
                      <div className="relative h-48 bg-white/5">
                        <img src={session.thumbnail} alt={session.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-16 h-16 text-white/80" />
                        </div>
                        <div className="absolute top-3 right-3">
                          {session.aiAnalysisComplete ? (
                            <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                              AI COMPLETE
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full border border-yellow-500/30">
                              PROCESSING...
                            </span>
                          )}
                        </div>
                        <div className="absolute bottom-3 left-3 text-white text-sm font-bold">
                          {session.duration}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="text-white font-bold text-lg mb-2">{session.title}</h4>
                        <p className="text-white/60 text-sm mb-3">vs. {session.opponent}</p>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <span className="text-[#F59E0B]">{session.highlights} highlights</span>
                            <span className="text-blue-400">{session.keyPlays} key plays</span>
                          </div>
                          <span className="text-white/60">{formatTimeAgo(session.date)}</span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {session.playerFocus.slice(0, 2).map((player) => (
                            <span key={player} className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-full">
                              {player.split(' ')[0]}
                            </span>
                          ))}
                          {session.playerFocus.length > 2 && (
                            <span className="px-2 py-1 bg-white/10 text-white/70 text-xs rounded-full">
                              +{session.playerFocus.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI Analysis Dashboard */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <Brain className="w-6 h-6 text-[#F59E0B]" />
                    <h4 className="text-white font-bold text-xl">AI Performance Analytics</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-[#F59E0B]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Target className="w-10 h-10 text-[#F59E0B]" />
                      </div>
                      <h5 className="text-white font-bold text-lg">87%</h5>
                      <p className="text-white/60 text-sm">Play Success Rate</p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Eye className="w-10 h-10 text-blue-400" />
                      </div>
                      <h5 className="text-white font-bold text-lg">342</h5>
                      <p className="text-white/60 text-sm">Plays Analyzed</p>
                    </div>
                    <div className="text-center">
                      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <TrendingUp className="w-10 h-10 text-green-400" />
                      </div>
                      <h5 className="text-white font-bold text-lg">+23%</h5>
                      <p className="text-white/60 text-sm">Performance Improvement</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* AI PLAYBOOK ASSISTANT */}
            {activeTab === 'playbook' && (
              <motion.div
                key="playbook"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Gamepad2 className="w-8 h-8 text-[#F59E0B]" />
                    <h3 className="text-3xl font-black text-white">AI PLAYBOOK ASSISTANT</h3>
                    <span className="px-3 py-1 bg-[#F59E0B]/20 text-[#F59E0B] text-sm font-bold rounded-full">STRATEGY GENIUS</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-[#F59E0B] text-white rounded-xl hover:bg-[#F97316] transition-colors">
                      <PlusCircle className="w-4 h-4 inline-block mr-2" />
                      Create Play
                    </button>
                    <button className="px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
                      <Brain className="w-4 h-4 inline-block mr-2" />
                      AI Optimize
                    </button>
                  </div>
                </div>

                {/* Play Categories */}
                <div className="grid grid-cols-3 gap-4">
                  {['offense', 'defense', 'special'].map((category) => (
                    <div key={category} className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
                      <h4 className="text-white font-bold text-lg capitalize mb-2">{category}</h4>
                      <div className="text-2xl font-black text-[#F59E0B]">
                        {MOCK_PLAYBOOK_PLAYS.filter(play => play.category === category).length}
                      </div>
                      <p className="text-white/60 text-sm">Plays</p>
                    </div>
                  ))}
                </div>

                {/* AI Recommended Plays */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <Brain className="w-6 h-6 text-[#F59E0B]" />
                    <h4 className="text-white font-bold text-xl">AI Recommended for Next Game</h4>
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">vs Eagles</span>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {MOCK_PLAYBOOK_PLAYS.filter(play => play.aiRecommendation).map((play) => (
                      <div key={play.id} className="p-4 bg-[#F59E0B]/10 rounded-xl border border-[#F59E0B]/20 cursor-pointer hover:bg-[#F59E0B]/20 transition-all"
                           onClick={() => setSelectedPlay(play)}>
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="text-white font-bold">{play.name}</h5>
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-[#F59E0B]" />
                            <span className={`font-bold ${getSuccessRateColor(play.successRate)}`}>{play.successRate}%</span>
                          </div>
                        </div>
                        <p className="text-white/70 text-sm mb-3">{play.description}</p>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="px-2 py-1 bg-white/10 text-white/70 rounded-full">{play.formation}</span>
                          <span className="text-white/60">Best vs: {play.recommendedVs[0]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* All Plays Library */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-white font-bold text-xl">Playbook Library</h4>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-white/10 text-white/70 rounded-xl text-sm hover:bg-white/20 transition-all">
                        <Filter className="w-4 h-4 inline-block mr-1" />
                        Filter
                      </button>
                      <button className="px-3 py-1 bg-white/10 text-white/70 rounded-xl text-sm hover:bg-white/20 transition-all">
                        <Search className="w-4 h-4 inline-block mr-1" />
                        Search
                      </button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {MOCK_PLAYBOOK_PLAYS.map((play) => (
                      <div key={play.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h5 className="text-white font-bold">{play.name}</h5>
                            <span className={`px-2 py-1 text-xs rounded-full ${play.category === 'offense' ? 'bg-blue-500/20 text-blue-400' : play.category === 'defense' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                              {play.category.toUpperCase()}
                            </span>
                            {play.aiRecommendation && <Star className="w-4 h-4 text-[#F59E0B]" />}
                          </div>
                          <p className="text-white/60 text-sm mb-2">{play.description}</p>
                          <div className="flex items-center gap-4 text-xs text-white/60">
                            <span>Formation: {play.formation}</span>
                            <span>Last used: {formatTimeAgo(play.lastUsed)}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getSuccessRateColor(play.successRate)}`}>{play.successRate}%</div>
                          <div className="text-white/60 text-xs">Success Rate</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TEAM COMMUNICATION */}
            {activeTab === 'communication' && (
              <motion.div
                key="communication"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Megaphone className="w-8 h-8 text-[#F59E0B]" />
                    <h3 className="text-3xl font-black text-white">TEAM COMMUNICATION HUB</h3>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-sm font-bold rounded-full">UNIFIED PLATFORM</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors">
                      <Bell className="w-4 h-4 inline-block mr-2" />
                      Emergency Alert
                    </button>
                    <button className="px-4 py-2 bg-[#F59E0B] text-white rounded-xl hover:bg-[#F97316] transition-colors">
                      <Send className="w-4 h-4 inline-block mr-2" />
                      New Message
                    </button>
                  </div>
                </div>

                {/* Message Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
                    <MessageCircle className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-white font-bold text-2xl">{MOCK_MESSAGE_THREADS.length}</div>
                    <div className="text-white/60 text-sm">Active Threads</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
                    <Bell className="w-8 h-8 text-red-400 mx-auto mb-2" />
                    <div className="text-white font-bold text-2xl">{MOCK_MESSAGE_THREADS.reduce((sum, thread) => sum + thread.unreadCount, 0)}</div>
                    <div className="text-white/60 text-sm">Unread</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
                    <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-white font-bold text-2xl">67</div>
                    <div className="text-white/60 text-sm">Contacts</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
                    <Clock className="w-8 h-8 text-[#F59E0B] mx-auto mb-2" />
                    <div className="text-white font-bold text-2xl">2m</div>
                    <div className="text-white/60 text-sm">Avg Response</div>
                  </div>
                </div>

                {/* Message Filters */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                  <div className="flex flex-wrap gap-2">
                    {['all', 'emergency', 'parent', 'team', 'individual'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setMessageFilter(filter)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all capitalize ${
                          messageFilter === filter
                            ? 'bg-[#F59E0B] text-white'
                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                        }`}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Threads */}
                <div className="space-y-4">
                  {MOCK_MESSAGE_THREADS
                    .filter(thread => messageFilter === 'all' || thread.type === messageFilter)
                    .map((thread) => (
                    <div key={thread.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all cursor-pointer">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-white font-bold text-lg">{thread.subject}</h4>
                            <span className={`px-2 py-1 text-xs rounded-full border ${getPriorityColor(thread.priority)}`}>
                              {thread.priority.toUpperCase()}
                            </span>
                            {thread.unreadCount > 0 && (
                              <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                                {thread.unreadCount} new
                              </span>
                            )}
                          </div>
                          <p className="text-white/70 mb-3">{thread.lastMessage}</p>
                          <div className="flex items-center gap-4 text-sm text-white/60">
                            <span>To: {thread.participants.join(', ')}</span>
                            <span>{formatTimeAgo(thread.lastMessageTime)}</span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-xl text-sm hover:bg-blue-500/30 transition-all">
                            Reply
                          </button>
                          {thread.type === 'emergency' && (
                            <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded-xl text-sm hover:bg-red-500/30 transition-all">
                              Urgent
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ACADEMIC COMMAND CENTER */}
            {activeTab === 'academics' && (
              <motion.div
                key="academics"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-8 h-8 text-[#F59E0B]" />
                    <h3 className="text-3xl font-black text-white">ACADEMIC COMMAND CENTER</h3>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-bold rounded-full">LIVE INTEGRATION</span>
                  </div>
                </div>

                {/* Academic Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
                    <Calculator className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className={`text-2xl font-bold ${getGPAColor(MOCK_TEAM_STATS.averageGPA)}`}>{MOCK_TEAM_STATS.averageGPA}</div>
                    <div className="text-white/60 text-sm">Team GPA</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
                    <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                    <div className="text-white font-bold text-2xl">{MOCK_ACADEMIC_ALERTS.length}</div>
                    <div className="text-white/60 text-sm">At Risk</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
                    <Trophy className="w-8 h-8 text-[#F59E0B] mx-auto mb-2" />
                    <div className="text-white font-bold text-2xl">89%</div>
                    <div className="text-white/60 text-sm">Eligibility Rate</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
                    <BookOpen className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-white font-bold text-2xl">15</div>
                    <div className="text-white/60 text-sm">Study Hall Hours</div>
                  </div>
                </div>

                {/* Academic Alerts */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                    <h4 className="text-white font-bold text-xl">Academic Alerts</h4>
                  </div>
                  <div className="space-y-4">
                    {MOCK_ACADEMIC_ALERTS.map((alert) => (
                      <div key={alert.id} className={`p-4 rounded-xl border ${getSeverityColor(alert.severity)}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-white font-bold">{alert.playerName}</h5>
                          <span className="text-xs font-bold">{alert.severity.toUpperCase()}</span>
                        </div>
                        <p className="text-white/80 text-sm mb-2">{alert.description}</p>
                        <div className="flex items-center gap-4 text-xs text-white/60">
                          <span>Current GPA: {alert.currentGPA}</span>
                          <span>Required: {alert.requiredGPA}</span>
                          {alert.daysUntilIneligible && (
                            <span className="text-red-400 font-bold">Ineligible in {alert.daysUntilIneligible} days</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Player Academic Tracking */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h4 className="text-white font-bold text-xl mb-6">Individual Player Tracking</h4>
                  <div className="space-y-4">
                    {MOCK_PLAYERS.map((player) => (
                      <div key={player.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-white/60" />
                          </div>
                          <div>
                            <h5 className="text-white font-bold">{player.name}</h5>
                            <p className="text-white/60 text-sm">{player.position}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className={`text-lg font-bold ${getGPAColor(player.gpa)}`}>{player.gpa}</div>
                            <div className="text-white/60 text-xs">GPA</div>
                          </div>
                          <div className="text-center">
                            <div className={`text-lg font-bold ${getAttendanceColor(player.performance.practiceAttendance)}`}>{player.performance.practiceAttendance}%</div>
                            <div className="text-white/60 text-xs">Attendance</div>
                          </div>
                          <span className={`px-3 py-1 text-xs rounded-full border ${getAcademicStatusColor(player.performance.academicStatus)}`}>
                            {player.performance.academicStatus.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* HEALTH & SAFETY COMMAND CENTER */}
            {activeTab === 'health' && (
              <motion.div
                key="health"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-[#F59E0B]" />
                    <h3 className="text-3xl font-black text-white">HEALTH & SAFETY COMMAND</h3>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-bold rounded-full">COMPREHENSIVE CARE</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors">
                      <AlertTriangle className="w-4 h-4 inline-block mr-2" />
                      Report Injury
                    </button>
                    <button className="px-4 py-2 bg-[#F59E0B] text-white rounded-xl hover:bg-[#F97316] transition-colors">
                      <Stethoscope className="w-4 h-4 inline-block mr-2" />
                      Health Check
                    </button>
                  </div>
                </div>

                {/* Health Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
                    <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-white font-bold text-2xl">{MOCK_PLAYERS.length - MOCK_HEALTH_ALERTS.length}</div>
                    <div className="text-white/60 text-sm">Healthy Players</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
                    <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                    <div className="text-white font-bold text-2xl">{MOCK_HEALTH_ALERTS.length}</div>
                    <div className="text-white/60 text-sm">Health Alerts</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
                    <Bandage className="w-8 h-8 text-[#F59E0B] mx-auto mb-2" />
                    <div className="text-white font-bold text-2xl">3</div>
                    <div className="text-white/60 text-sm">Injured</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
                    <Activity className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-white font-bold text-2xl">98%</div>
                    <div className="text-white/60 text-sm">Clearance Rate</div>
                  </div>
                </div>

                {/* Active Health Alerts */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                    <h4 className="text-white font-bold text-xl">Active Health Alerts</h4>
                  </div>
                  <div className="space-y-4">
                    {MOCK_HEALTH_ALERTS.map((alert) => (
                      <div key={alert.id} className={`p-4 rounded-xl border ${getSeverityColor(alert.severity)}`}>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                              {alert.type === 'injury' && <Bandage className="w-5 h-5 text-red-400" />}
                              {alert.type === 'illness' && <Thermometer className="w-5 h-5 text-orange-400" />}
                              {alert.type === 'fatigue' && <Activity className="w-5 h-5 text-yellow-400" />}
                              {alert.type === 'concussion' && <Brain className="w-5 h-5 text-red-500" />}
                            </div>
                            <div>
                              <h5 className="text-white font-bold">{alert.playerName}</h5>
                              <p className="text-white/60 text-sm capitalize">{alert.type} - {alert.status}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(alert.severity)}`}>
                            {alert.severity.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-white/80 text-sm mb-3">{alert.description}</p>
                        <div className="flex items-center gap-4 text-xs text-white/60">
                          <span>Reported: {formatTimeAgo(alert.dateReported)}</span>
                          {alert.estimatedReturn && (
                            <span className="text-green-400">Est. Return: {alert.estimatedReturn.toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Injury Prevention AI */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 mb-6">
                    <Brain className="w-6 h-6 text-[#F59E0B]" />
                    <h4 className="text-white font-bold text-xl">AI Injury Prevention</h4>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-400" />
                          <span className="text-yellow-400 font-bold">Fatigue Risk</span>
                        </div>
                        <p className="text-white text-sm">David Rodriguez showing 85% fatigue markers - recommend rest day.</p>
                      </div>
                      <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-400 font-bold">Load Management</span>
                        </div>
                        <p className="text-white text-sm">Team averages 23% above optimal training load this week.</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 font-bold">Recovery Tracking</span>
                        </div>
                        <p className="text-white text-sm">Marcus Thompson shows optimal recovery patterns - cleared for full contact.</p>
                      </div>
                      <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="w-4 h-4 text-purple-400" />
                          <span className="text-purple-400 font-bold">Wellness Check</span>
                        </div>
                        <p className="text-white text-sm">Team mood score: 8.2/10 - highest this season!</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medical Clearances */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                  <h4 className="text-white font-bold text-xl mb-6">Medical Clearances & Documentation</h4>
                  <div className="space-y-3">
                    {MOCK_PLAYERS.map((player) => (
                      <div key={player.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                            <Users className="w-6 h-6 text-white/60" />
                          </div>
                          <div>
                            <h5 className="text-white font-bold">{player.name}</h5>
                            <p className="text-white/60 text-sm">{player.position}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded-full border border-green-500/30">
                              CLEARED
                            </span>
                          </div>
                          <div className="text-center">
                            <span className="text-white/60 text-xs">Physical: 08/15/2024</span>
                          </div>
                          <button className="px-3 py-1 bg-white/10 text-white/70 rounded-xl text-sm hover:bg-white/20 transition-all">
                            View Records
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Roster Tab */}
            {activeTab === 'roster' && (
              <motion.div
                key="roster"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Team Roster</h3>
                  <button className="px-4 py-2 bg-[#F59E0B] text-white rounded-xl hover:bg-[#F97316] transition-colors">
                    <Settings className="w-4 h-4 inline-block mr-2" />
                    Manage Roster
                  </button>
                </div>

                <div className="grid gap-4">
                  {MOCK_PLAYERS.map((player) => (
                    <div 
                      key={player.id} 
                      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-200 cursor-pointer"
                      onClick={() => setSelectedPlayer(selectedPlayer?.id === player.id ? null : player)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center relative">
                          {player.profileImage ? (
                            <img 
                              src={player.profileImage} 
                              alt={player.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <Users className="w-8 h-8 text-white/60" />
                          )}
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#F59E0B] text-white text-xs font-bold rounded-full flex items-center justify-center">
                            {player.jerseyNumber}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-white font-bold text-xl">{player.name}</h4>
                            <div className="flex items-center gap-1 px-2 py-1 bg-[#F59E0B]/20 rounded-full">
                              <Crown className="w-3 h-3 text-[#F59E0B]" />
                              <span className="text-[#F59E0B] text-xs font-bold">L{player.level}</span>
                            </div>
                            <span className={`px-2 py-1 text-xs rounded-full border ${getAcademicStatusColor(player.performance.academicStatus)}`}>
                              {player.performance.academicStatus.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-white/60 mb-3">{player.position} • Class of {player.graduationYear}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                            <div>
                              <span className="text-white/60">HYPE:</span>
                              <div className="text-[#F59E0B] font-bold">{player.hypeScore.toLocaleString()}</div>
                            </div>
                            <div>
                              <span className="text-white/60">GPA:</span>
                              <div className={`font-bold ${getGPAColor(player.gpa)}`}>{player.gpa}</div>
                            </div>
                            <div>
                              <span className="text-white/60">Attendance:</span>
                              <div className={`font-bold ${getAttendanceColor(player.performance.practiceAttendance)}`}>{player.performance.practiceAttendance}%</div>
                            </div>
                            <div>
                              <span className="text-white/60">Performance:</span>
                              <div className={`font-bold ${getPerformanceRating(player.performance.gamePerformance)}`}>{player.performance.gamePerformance}/10</div>
                            </div>
                            <div>
                              <span className="text-white/60">Last Active:</span>
                              <div className="text-white/80">{formatTimeAgo(player.stats.lastActive)}</div>
                            </div>
                          </div>

                          {/* Expanded Details */}
                          {selectedPlayer?.id === player.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 pt-4 border-t border-white/10"
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h5 className="text-white font-bold mb-2">Season Stats</h5>
                                  <div className="space-y-1">
                                    {Object.entries(player.stats.keyStats).map(([key, value]) => (
                                      <div key={key} className="flex justify-between">
                                        <span className="text-white/60">{key}:</span>
                                        <span className="text-white">{value}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-white font-bold mb-2">Recent Activity</h5>
                                  <div className="space-y-2">
                                    {player.recentActivities.slice(0, 3).map((activity) => (
                                      <div key={activity.id} className="text-sm">
                                        <div className="text-white">{activity.title}</div>
                                        <div className="text-white/60">{formatTimeAgo(activity.timestamp)}</div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Performance Tab */}
            {activeTab === 'performance' && (
              <motion.div
                key="performance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <BarChart3 className="w-24 h-24 text-white/20 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Performance Analytics</h3>
                <p className="text-white/60 max-w-md mx-auto mb-8">
                                          Comprehensive performance analytics with AI-powered insights, advanced game film analysis, and real-time player development tracking.
                </p>
                <button className="px-8 py-3 bg-[#F59E0B] text-white font-bold rounded-xl hover:bg-[#F97316] transition-colors">
                  View Analytics
                </button>
              </motion.div>
            )}

            {/* Schedule Tab */}
            {activeTab === 'schedule' && (
              <motion.div
                key="schedule"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <Calendar className="w-24 h-24 text-white/20 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Team Schedule</h3>
                <p className="text-white/60 max-w-md mx-auto mb-8">
                  Manage practice schedules, game times, team meetings, and coordinate with parents and players.
                </p>
                <button className="px-8 py-3 bg-[#F59E0B] text-white font-bold rounded-xl hover:bg-[#F97316] transition-colors">
                  Manage Schedule
                </button>
              </motion.div>
            )}

            {/* Communication Tab */}
            {activeTab === 'communication' && (
              <motion.div
                key="communication"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-16"
              >
                <MessageCircle className="w-24 h-24 text-white/20 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">Team Communication</h3>
                <p className="text-white/60 max-w-md mx-auto mb-8">
                  Send messages to players, communicate with parents, coordinate with school administration, and manage team announcements.
                </p>
                <div className="flex gap-4 justify-center">
                  <button className="px-6 py-3 bg-[#F59E0B] text-white font-bold rounded-xl hover:bg-[#F97316] transition-colors">
                    Message Team
                  </button>
                  <button className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-colors">
                    Contact Parents
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Gage AI Chat */}
      <GageAIChat
        userId="coach_user"
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
}