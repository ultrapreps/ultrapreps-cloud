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
import ProfileBot from '../../components/bots/ProfileBot';
import PredatorEngine from '../../components/bots/PredatorEngine';


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
  { id: 'filmroom', label: 'HUDL KILLER 🔥', icon: Video },
  { id: 'maxpreps', label: 'MAXPREPS KILLER 📊', icon: TrendingUp },
  { id: 'sportsyou', label: 'SPORTSYOU KILLER ⚡', icon: Users },
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
            name: 'Blitz Defender',
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
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-white mb-4">
              <span className="text-[#F59E0B]">ULTRA</span> Coach Hub
            </h2>
            <p className="text-white/70 text-lg">
              Manage your team, track player performance, and drive success with data-driven insights.
            </p>
            
            {/* AI SYSTEMS STATUS */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded border border-green-500/30">
                <Video className="w-4 h-4" />
                <span className="text-sm font-medium">HUDL KILLER: ACTIVE</span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded border border-blue-500/30">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">PREDATOR ENGINE: LOADED</span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/20 text-orange-400 rounded border border-orange-500/30">
                <Brain className="w-4 h-4" />
                <span className="text-sm font-medium">MAXPREPS KILLER: ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Team Overview Cards */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-white font-bold text-2xl">{MOCK_TEAM_STATS.totalPlayers}</div>
              <div className="text-white/60 text-sm">Total Players</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
              <UserCheck className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-white font-bold text-2xl">{MOCK_TEAM_STATS.activeToday}</div>
              <div className="text-white/60 text-sm">Active Today</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className={`font-bold text-2xl ${getGPAColor(MOCK_TEAM_STATS.averageGPA)}`}>{MOCK_TEAM_STATS.averageGPA}</div>
              <div className="text-white/60 text-sm">Avg GPA</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
              <Zap className="w-8 h-8 text-[#F59E0B] mx-auto mb-2" />
              <div className="text-white font-bold text-2xl">{MOCK_TEAM_STATS.totalHypeEarned.toLocaleString()}</div>
              <div className="text-white/60 text-sm">Team HYPE</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
              <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-white font-bold text-2xl">{MOCK_TEAM_STATS.upcomingGames}</div>
              <div className="text-white/60 text-sm">Next Games</div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 text-center">
              <Clipboard className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <div className={`font-bold text-2xl ${getAttendanceColor(MOCK_TEAM_STATS.practiceAttendance)}`}>{MOCK_TEAM_STATS.practiceAttendance}%</div>
              <div className="text-white/60 text-sm">Attendance</div>
            </div>
          </div>

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

                  {/* AI INTELLIGENCE CENTER */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <div className="flex items-center gap-2 mb-6">
                      <motion.div
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Brain className="w-8 h-8 text-green-400" />
                      </motion.div>
                      <h4 className="text-white font-bold text-xl">AI INTELLIGENCE CENTER</h4>
                      <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full">LIVE PROCESSING</span>
                    </div>
                    
                    {/* REAL-TIME DATA DISCOVERY */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-3">
                        <h5 className="text-green-400 font-bold text-sm">🤖 AI DATA ENGINE - LIVE DISCOVERIES</h5>
                        <div className="space-y-2">
                          <motion.div
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="p-3 bg-green-500/10 rounded-xl border border-green-500/20"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                              <span className="text-green-400 font-bold text-xs">MaxPreps • 2s ago</span>
                            </div>
                            <p className="text-white text-sm">Marcus Thompson: +127 passing yards vs Eagles (validated by 2 sources)</p>
                          </motion.div>
                          
                          <motion.div
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2.3, repeat: Infinity }}
                            className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                              <span className="text-blue-400 font-bold text-xs">Hudl • 4s ago</span>
                            </div>
                            <p className="text-white text-sm">David Rodriguez: Leadership moment detected (clutch 4th down conversion)</p>
                          </motion.div>
                          
                          <motion.div
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 1.8, repeat: Infinity }}
                            className="p-3 bg-[#F59E0B]/10 rounded-xl border border-orange-500/20"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-2 h-2 bg-[#F59E0B] rounded-full animate-pulse" />
                              <span className="text-[#F59E0B] font-bold text-xs">247Sports • 7s ago</span>
                            </div>
                            <p className="text-white text-sm">Isaiah Washington: Recruiting interest from State University (confidence: 87%)</p>
                          </motion.div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h5 className="text-blue-400 font-bold text-sm">👤 AI PROFILES - AUTO-GENERATION</h5>
                        <div className="space-y-2">
                          <motion.div
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2.1, repeat: Infinity }}
                            className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                              <span className="text-purple-400 font-bold text-xs">Profile Generation • 1s ago</span>
                            </div>
                            <p className="text-white text-sm">Digital Legacy created for Marcus (3-year performance timeline)</p>
                          </motion.div>
                          
                          <motion.div
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 1.9, repeat: Infinity }}
                            className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                              <span className="text-yellow-400 font-bold text-xs">Achievement Tracking • 3s ago</span>
                            </div>
                            <p className="text-white text-sm">David: Academic improvement detected (+0.4 GPA this semester)</p>
                          </motion.div>
                          
                          <motion.div
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2.4, repeat: Infinity }}
                            className="p-3 bg-pink-500/10 rounded-xl border border-pink-500/20"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
                              <span className="text-pink-400 font-bold text-xs">Character Analysis • 6s ago</span>
                            </div>
                            <p className="text-white text-sm">Isaiah: Leadership growth pattern identified (mentoring younger players)</p>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                    
                    {/* SYSTEM STATISTICS */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
                      <div className="text-center">
                        <div className="text-2xl font-black text-green-400 mb-1">2,847</div>
                        <div className="text-white/60 text-xs">Data Points Harvested</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-black text-blue-400 mb-1">847</div>
                        <div className="text-white/60 text-xs">Profiles Auto-Generated</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-black text-[#F59E0B] mb-1">94%</div>
                        <div className="text-white/60 text-xs">Data Validation Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-black text-purple-400 mb-1">0.3s</div>
                        <div className="text-white/60 text-xs">Avg Processing Time</div>
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


            {/* HUDL KILLER - REVOLUTIONARY AI VIDEO INTELLIGENCE */}
            {activeTab === 'filmroom' && (
              <motion.div
                key="filmroom"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Video className="w-6 h-6 text-blue-400" />
                      <div>
                        <h3 className="text-xl font-semibold text-white">Video Intelligence</h3>
                        <p className="text-sm text-white/70">Multi-source video aggregation and analysis</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                        <Camera className="w-4 h-4 inline-block mr-2" />
                        Discover Film
                      </button>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
                        <Brain className="w-4 h-4 inline-block mr-2" />
                        Analyze
                      </button>
                    </div>
                  </div>

                  {/* Video Source Monitoring */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white/5 border border-white/10 rounded p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/70">Hudl</span>
                        <span className="text-xs text-green-400">Connected</span>
                      </div>
                      <div className="text-lg font-semibold text-white">24</div>
                      <div className="text-xs text-white/50">videos found</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/70">Social Media</span>
                        <span className="text-xs text-blue-400">Scanning</span>
                      </div>
                      <div className="text-lg font-semibold text-white">7</div>
                      <div className="text-xs text-white/50">highlights detected</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/70">Parent Videos</span>
                        <span className="text-xs text-yellow-400">Processing</span>
                      </div>
                      <div className="text-lg font-semibold text-white">12</div>
                      <div className="text-xs text-white/50">submissions</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/70">News Sources</span>
                        <span className="text-xs text-green-400">Active</span>
                      </div>
                      <div className="text-lg font-semibold text-white">3</div>
                      <div className="text-xs text-white/50">segments found</div>
                    </div>
                  </div>

                  {/* Video Processing Features */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    {/* Source Aggregation */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Camera className="w-5 h-5" />
                        Source Aggregation
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <span className="text-white text-sm">Game Film</span>
                          <span className="text-green-400 text-xs">24 videos</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <span className="text-white text-sm">Social Highlights</span>
                          <span className="text-blue-400 text-xs">7 clips</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <span className="text-white text-sm">Parent Uploads</span>
                          <span className="text-yellow-400 text-xs">12 files</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <span className="text-white text-sm">Training Sessions</span>
                          <span className="text-purple-400 text-xs">8 recordings</span>
                        </div>
                      </div>
                    </div>

                    {/* Analysis Results */}
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Brain className="w-5 h-5" />
                        Analysis Results
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <span className="text-white text-sm">Technique Score</span>
                          <span className="text-green-400 text-xs font-semibold">8.4/10</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <span className="text-white text-sm">Decision Making</span>
                          <span className="text-blue-400 text-xs font-semibold">7.8/10</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <span className="text-white text-sm">Leadership Events</span>
                          <span className="text-yellow-400 text-xs font-semibold">23 tagged</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <span className="text-white text-sm">Clutch Moments</span>
                          <span className="text-purple-400 text-xs font-semibold">6 identified</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Generation Queue */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Video className="w-5 h-5" />
                      Content Generation Queue
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded border-l-4 border-green-500">
                        <div>
                          <div className="text-white font-medium">Marcus Johnson - Highlight Reel</div>
                          <div className="text-sm text-white/60">Processing 12 clips from Friday's game</div>
                        </div>
                        <span className="text-green-400 text-sm">Completed</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded border-l-4 border-blue-500">
                        <div>
                          <div className="text-white font-medium">Team Season Summary</div>
                          <div className="text-sm text-white/60">Compiling 8 game highlights</div>
                        </div>
                        <span className="text-blue-400 text-sm">In Progress</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded border-l-4 border-yellow-500">
                        <div>
                          <div className="text-white font-medium">David Smith - Recruiting Package</div>
                          <div className="text-sm text-white/60">Adding stat overlays and analysis</div>
                        </div>
                        <span className="text-yellow-400 text-sm">Queued</span>
                                          </div>
                  </div>
                                  </div>
                </div>

                {/* MULTI-SOURCE VIDEO INTELLIGENCE GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {MOCK_FILM_SESSIONS.map((session) => (
                    <div key={session.id} 
                         className="relative overflow-hidden rounded-2xl border-2 border-[#F59E0B]/30 bg-black/90 backdrop-blur-xl hover:border-red-500/80 transition-all cursor-pointer transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30"
                         onClick={() => setSelectedFilm(session)}>
                      
                      {/* NUCLEAR GLOW EFFECT */}
                      <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-[#F59E0B] to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-100 transition-all duration-500" />
                      
                      <div className="relative z-10">
                        <div className="relative h-48 bg-black/80">
                          <img src={session.thumbnail} alt={session.title} className="w-full h-full object-cover opacity-90" />
                          
                          {/* AI OVERLAY EFFECTS */}
                          <div className="absolute inset-0 bg-gradient-to-br from-red-600/30 via-black/60 to-orange-600/30 flex items-center justify-center">
                            <motion.div
                              animate={{ 
                                scale: [1, 1.3, 1],
                                opacity: [0.8, 1, 0.8]
                              }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                              <Play className="w-20 h-20 text-white drop-shadow-2xl" />
                            </motion.div>
                          </div>
                          
                          {/* HUDL KILLER STATUS */}
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 bg-red-500/90 text-white text-xs font-black rounded-full border-2 border-red-400 drop-shadow-lg">
                              🔥 HUDL KILLER
                            </span>
                          </div>
                          
                          <div className="absolute top-3 right-3">
                            {session.aiAnalysisComplete ? (
                              <span className="px-3 py-1 bg-green-500/90 text-white text-xs font-black rounded-full border-2 border-green-400 drop-shadow-lg">
                                🤖 AI SUPREME
                              </span>
                            ) : (
                              <motion.span 
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="px-3 py-1 bg-[#F59E0B]/90 text-white text-xs font-black rounded-full border-2 border-orange-400 drop-shadow-lg">
                                ⚡ AI ANALYZING
                              </motion.span>
                            )}
                          </div>
                          
                          <div className="absolute bottom-3 left-3 text-white text-sm font-bold drop-shadow-lg">
                            ⏱️ {session.duration}
                          </div>
                          
                          {/* AI POWER INDICATORS */}
                          <div className="absolute bottom-3 right-3 flex gap-1">
                            <div className="w-2 h-6 bg-gradient-to-t from-red-600 to-red-400 rounded-full"></div>
                            <div className="w-2 h-5 bg-gradient-to-t from-[#F59E0B] to-orange-400 rounded-full"></div>
                            <div className="w-2 h-4 bg-gradient-to-t from-green-600 to-green-400 rounded-full"></div>
                          </div>
                        </div>
                        
                        <div className="p-6 bg-gradient-to-br from-black/90 via-gray-900/90 to-black/90">
                          <h4 className="text-white font-black text-lg mb-2 drop-shadow-lg">{session.title}</h4>
                          <p className="text-white/80 text-sm mb-3 font-medium drop-shadow-lg">🏟️ vs. {session.opponent}</p>
                          
                          {/* ENHANCED STATS DISPLAY */}
                          <div className="flex items-center justify-between text-sm mb-4">
                            <div className="flex items-center gap-4">
                              <span className="text-red-400 font-bold drop-shadow-lg">🎯 {session.highlights} highlights</span>
                              <span className="text-blue-400 font-bold drop-shadow-lg">⚡ {session.keyPlays} key plays</span>
                            </div>
                            <span className="text-white/70 font-medium drop-shadow-lg">{formatTimeAgo(session.date)}</span>
                          </div>
                          
                          {/* AI ANALYSIS TAGS */}
                          <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs font-bold rounded-full border border-red-500/30">
                                🔥 Clutch Moments
                              </span>
                              <span className="px-2 py-1 bg-[#F59E0B]/20 text-orange-300 text-xs font-bold rounded-full border border-orange-500/30">
                                💡 Leadership
                              </span>
                              <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs font-bold rounded-full border border-green-500/30">
                                📈 Improvement
                              </span>
                            </div>
                          </div>
                          
                          {/* PLAYER FOCUS WITH ENHANCED STYLING */}
                          <div className="flex flex-wrap gap-1">
                            {session.playerFocus.slice(0, 2).map((player) => (
                              <span key={player} className="px-3 py-1 bg-white/20 text-white font-bold text-xs rounded-full border border-white/30 drop-shadow-lg">
                                ⭐ {player.split(' ')[0]}
                              </span>
                            ))}
                            {session.playerFocus.length > 2 && (
                              <span className="px-3 py-1 bg-[#F59E0B]/20 text-[#F59E0B] font-bold text-xs rounded-full border border-orange-500/30 drop-shadow-lg">
                                +{session.playerFocus.length - 2} more stars
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* REVOLUTIONARY AI VIDEO INTELLIGENCE DASHBOARD */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600/20 via-black/90 to-blue-600/20 p-8 border-2 border-purple-500/50">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-black/80 to-blue-600/10 backdrop-blur-sm" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <motion.div
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.3, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Brain className="w-12 h-12 text-purple-400 drop-shadow-2xl" />
                      </motion.div>
                      <div>
                        <h4 className="text-4xl font-black text-white drop-shadow-2xl">AI VIDEO INTELLIGENCE</h4>
                        <p className="text-lg font-bold text-purple-300 drop-shadow-lg">Multi-Source Analysis Engine</p>
                      </div>
                      <div className="flex gap-2 ml-auto">
                        <span className="px-4 py-2 bg-purple-500/80 text-white text-sm font-black rounded-full border-2 border-purple-400 drop-shadow-lg">
                          🧠 NEURAL SUPREME
                        </span>
                        <span className="px-4 py-2 bg-blue-500/80 text-white text-sm font-black rounded-full border-2 border-blue-400 drop-shadow-lg">
                          👁️ VISION AI
                        </span>
                      </div>
                    </div>

                    {/* ADVANCED ANALYTICS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      <div className="text-center p-6 bg-gradient-to-br from-red-500/20 via-black/80 to-red-600/20 rounded-2xl border border-red-500/30">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl"
                        >
                          <Target className="w-10 h-10 text-white drop-shadow-lg" />
                        </motion.div>
                        <h5 className="text-3xl font-black text-red-400 mb-2 drop-shadow-lg">94%</h5>
                        <p className="text-white font-bold text-sm drop-shadow-lg">🎯 Clutch Success Rate</p>
                        <p className="text-red-300 text-xs mt-1">+7% vs Hudl Analysis</p>
                      </div>

                      <div className="text-center p-6 bg-gradient-to-br from-[#F59E0B]/20 via-black/80 to-orange-600/20 rounded-2xl border border-orange-500/30">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.2, 1],
                            y: [0, -5, 0]
                          }}
                          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                          className="w-20 h-20 bg-gradient-to-br from-[#F59E0B] to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl"
                        >
                          <Eye className="w-10 h-10 text-white drop-shadow-lg" />
                        </motion.div>
                        <h5 className="text-3xl font-black text-[#F59E0B] mb-2 drop-shadow-lg">2,847</h5>
                        <p className="text-white font-bold text-sm drop-shadow-lg">👁️ Plays Auto-Analyzed</p>
                        <p className="text-orange-300 text-xs mt-1">10x Hudl Detection</p>
                      </div>

                      <div className="text-center p-6 bg-gradient-to-br from-green-500/20 via-black/80 to-green-600/20 rounded-2xl border border-green-500/30">
                        <motion.div
                          animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.15, 1]
                          }}
                          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                          className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl"
                        >
                          <TrendingUp className="w-10 h-10 text-white drop-shadow-lg" />
                        </motion.div>
                        <h5 className="text-3xl font-black text-green-400 mb-2 drop-shadow-lg">+87%</h5>
                        <p className="text-white font-bold text-sm drop-shadow-lg">📈 Performance Boost</p>
                        <p className="text-green-300 text-xs mt-1">Since AI Integration</p>
                      </div>

                      <div className="text-center p-6 bg-gradient-to-br from-purple-500/20 via-black/80 to-purple-600/20 rounded-2xl border border-purple-500/30">
                        <motion.div
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.8, 1, 0.8]
                          }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl"
                        >
                          <Flame className="w-10 h-10 text-white drop-shadow-lg" />
                        </motion.div>
                        <h5 className="text-3xl font-black text-purple-400 mb-2 drop-shadow-lg">LIVE</h5>
                        <p className="text-white font-bold text-sm drop-shadow-lg">🔥 Real-Time Intel</p>
                        <p className="text-purple-300 text-xs mt-1">0.3s Processing</p>
                      </div>
                    </div>

                    {/* MULTI-SOURCE INTELLIGENCE */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h5 className="text-2xl font-black text-white mb-4 drop-shadow-lg">🎯 AI DISCOVERIES</h5>
                        <div className="space-y-3">
                          <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Target className="w-5 h-5 text-red-400" />
                              <span className="text-red-400 font-bold">Leadership Moments Detected</span>
                            </div>
                            <p className="text-white text-sm drop-shadow-lg">Marcus shows 94% leadership correlation in clutch moments - compile into recruiting reel.</p>
                          </div>
                          <div className="p-4 bg-[#F59E0B]/10 rounded-xl border border-orange-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Brain className="w-5 h-5 text-[#F59E0B]" />
                              <span className="text-[#F59E0B] font-bold">Decision Making Analysis</span>
                            </div>
                            <p className="text-white text-sm drop-shadow-lg">David's pre-snap reads improved 67% this season - create development timeline.</p>
                          </div>
                          <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp className="w-5 h-5 text-green-400" />
                              <span className="text-green-400 font-bold">Technique Evolution</span>
                            </div>
                            <p className="text-white text-sm drop-shadow-lg">Isaiah's route precision up 43% - auto-generate improvement showcase.</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h5 className="text-2xl font-black text-white mb-4 drop-shadow-lg">🚀 AUTO-CONTENT CREATION</h5>
                        <div className="space-y-3">
                          <div className="p-4 bg-purple-500/10 rounded-xl border border-purple-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Video className="w-5 h-5 text-purple-400" />
                              <span className="text-purple-400 font-bold">ESPN-Style Highlights</span>
                            </div>
                            <p className="text-white text-sm drop-shadow-lg">23 broadcast-quality highlight reels generated automatically.</p>
                          </div>
                          <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Eye className="w-5 h-5 text-blue-400" />
                              <span className="text-blue-400 font-bold">Recruiting Packages</span>
                            </div>
                            <p className="text-white text-sm drop-shadow-lg">College-ready scouting videos for 12 players completed.</p>
                          </div>
                          <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                            <div className="flex items-center gap-2 mb-2">
                              <Share2 className="w-5 h-5 text-yellow-400" />
                              <span className="text-yellow-400 font-bold">Family Shareables</span>
                            </div>
                            <p className="text-white text-sm drop-shadow-lg">47 pride-worthy family moments ready for social sharing.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* MAXPREPS KILLER - STATISTICAL INTELLIGENCE */}
            {activeTab === 'maxpreps' && (
              <motion.div
                key="maxpreps"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-6 h-6 text-green-400" />
                      <div>
                        <h3 className="text-xl font-semibold text-white">Statistical Intelligence</h3>
                        <p className="text-sm text-white/70">Advanced analytics and performance metrics</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                        <BarChart3 className="w-4 h-4 inline-block mr-2" />
                        Analyze Stats
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                        <Download className="w-4 h-4 inline-block mr-2" />
                        Export Report
                      </button>
                    </div>
                  </div>

                  {/* Statistical Sources */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white/5 border border-white/10 rounded p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/70">MaxPreps</span>
                        <span className="text-xs text-green-400">Synced</span>
                      </div>
                      <div className="text-lg font-semibold text-white">8</div>
                      <div className="text-xs text-white/50">games tracked</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/70">Athletic.net</span>
                        <span className="text-xs text-blue-400">Active</span>
                      </div>
                      <div className="text-lg font-semibold text-white">24</div>
                      <div className="text-xs text-white/50">events logged</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/70">Team Stats</span>
                        <span className="text-xs text-yellow-400">Updated</span>
                      </div>
                      <div className="text-lg font-semibold text-white">156</div>
                      <div className="text-xs text-white/50">data points</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/70">Predictions</span>
                        <span className="text-xs text-purple-400">Generated</span>
                      </div>
                      <div className="text-lg font-semibold text-white">12</div>
                      <div className="text-xs text-white/50">forecasts ready</div>
                    </div>
                  </div>

                  {/* Advanced Analytics */}
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Performance Metrics
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <span className="text-white text-sm">Team Efficiency</span>
                          <span className="text-green-400 text-xs font-semibold">87.3%</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <span className="text-white text-sm">Win Probability</span>
                          <span className="text-blue-400 text-xs font-semibold">73.2%</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <span className="text-white text-sm">Clutch Rating</span>
                          <span className="text-yellow-400 text-xs font-semibold">8.4/10</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <span className="text-white text-sm">Momentum Score</span>
                          <span className="text-purple-400 text-xs font-semibold">+24.7</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        Predictive Analysis
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <span className="text-white text-sm">Next Game Projection</span>
                          <span className="text-green-400 text-xs font-semibold">68% Win</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <span className="text-white text-sm">Season Outlook</span>
                          <span className="text-blue-400 text-xs font-semibold">9-3 Record</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <span className="text-white text-sm">Playoff Odds</span>
                          <span className="text-yellow-400 text-xs font-semibold">84.2%</span>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-white/5 rounded">
                          <span className="text-white text-sm">Championship Path</span>
                          <span className="text-purple-400 text-xs font-semibold">22.1%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Player Performance Grid */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Player Statistical Leaders
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-white/80">Offensive Leaders</h5>
                        <div className="space-y-1">
                          <div className="flex justify-between p-2 bg-white/5 rounded text-sm">
                            <span className="text-white">Marcus Johnson</span>
                            <span className="text-green-400">2,847 yards</span>
                          </div>
                          <div className="flex justify-between p-2 bg-white/5 rounded text-sm">
                            <span className="text-white">David Smith</span>
                            <span className="text-blue-400">28 TDs</span>
                          </div>
                          <div className="flex justify-between p-2 bg-white/5 rounded text-sm">
                            <span className="text-white">Alex Williams</span>
                            <span className="text-yellow-400">847 rec yards</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-white/80">Defensive Leaders</h5>
                        <div className="space-y-1">
                          <div className="flex justify-between p-2 bg-white/5 rounded text-sm">
                            <span className="text-white">Kevin Brown</span>
                            <span className="text-red-400">89 tackles</span>
                          </div>
                          <div className="flex justify-between p-2 bg-white/5 rounded text-sm">
                            <span className="text-white">Tyler Davis</span>
                            <span className="text-orange-400">12 sacks</span>
                          </div>
                          <div className="flex justify-between p-2 bg-white/5 rounded text-sm">
                            <span className="text-white">Josh Miller</span>
                            <span className="text-purple-400">7 INTs</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-white/80">Efficiency Ratings</h5>
                        <div className="space-y-1">
                          <div className="flex justify-between p-2 bg-white/5 rounded text-sm">
                            <span className="text-white">Team QBR</span>
                            <span className="text-green-400">87.4</span>
                          </div>
                          <div className="flex justify-between p-2 bg-white/5 rounded text-sm">
                            <span className="text-white">Red Zone %</span>
                            <span className="text-blue-400">78.9%</span>
                          </div>
                          <div className="flex justify-between p-2 bg-white/5 rounded text-sm">
                            <span className="text-white">3rd Down %</span>
                            <span className="text-yellow-400">67.2%</span>
                          </div>
                        </div>
                      </div>
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