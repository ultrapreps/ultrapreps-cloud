'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  MessageCircle, Users, Calendar, Trophy, Flame, 
  ArrowLeft, Plus, Clock, MapPin, ChevronRight, Heart, Share2
} from 'lucide-react';
import GageAIChat from '../../components/GageAIChat';
import HypeWidget from '../../components/HypeWidget';

interface CommunityTab {
  id: string;
  label: string;
  icon: React.ComponentType<{className?: string}>;
  color: string;
}

interface Event {
  id: string;
  title: string;
  type: 'rivalry' | 'rally' | 'championship' | 'social';
  date: Date;
  location: string;
  participants: number;
  hypeLevel: number;
  description: string;
  schools: string[];
}

interface Rivalry {
  id: string;
  school1: string;
  school2: string;
  hypeScore1: number;
  hypeScore2: number;
  nextGame: Date;
  totalGames: number;
  record: { wins1: number; wins2: number };
}

interface TeamChat {
  id: string;
  name: string;
  school: string;
  sport: string;
  memberCount: number;
  lastMessage: {
    user: string;
    content: string;
    timestamp: Date;
  };
  unreadCount: number;
}

const COMMUNITY_TABS: CommunityTab[] = [
  { id: 'events', label: 'Events', icon: Calendar, color: '#F59E0B' },
  { id: 'rivalries', label: 'Rivalries', icon: Flame, color: '#EF4444' },
  { id: 'chats', label: 'Team Chats', icon: MessageCircle, color: '#8B5CF6' },
  { id: 'rallies', label: 'Rallies', icon: Users, color: '#10B981' }
];

// Mock data
const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Championship Game',
    type: 'championship',
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    location: 'Memorial Stadium',
    participants: 2847,
    hypeLevel: 98,
    description: 'The ultimate showdown for the state championship!',
    schools: ['Central High', 'Riverside Academy']
  },
  {
    id: '2',
    title: 'Homecoming Rally',
    type: 'rally',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    location: 'School Gymnasium',
    participants: 1234,
    hypeLevel: 85,
    description: 'Get hyped for homecoming week! Spirit contest, performances, and more!',
    schools: ['Lincoln Prep Academy']
  },
  {
    id: '3',
    title: 'Cross-Town Rivalry',
    type: 'rivalry',
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    location: 'Eagle Stadium',
    participants: 3421,
    hypeLevel: 92,
    description: 'The annual cross-town rivalry game that decides bragging rights!',
    schools: ['Oak Valley High', 'Mountain View High']
  }
];

const MOCK_RIVALRIES: Rivalry[] = [
  {
    id: '1',
    school1: 'Central High Eagles',
    school2: 'Riverside Academy Hawks',
    hypeScore1: 15420,
    hypeScore2: 13890,
    nextGame: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    totalGames: 47,
    record: { wins1: 25, wins2: 22 }
  },
  {
    id: '2',
    school1: 'Oak Valley High Panthers',
    school2: 'Mountain View High Bears',
    hypeScore1: 12340,
    hypeScore2: 14560,
    nextGame: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
    totalGames: 32,
    record: { wins1: 14, wins2: 18 }
  }
];

const MOCK_TEAM_CHATS: TeamChat[] = [
  {
    id: '1',
    name: 'Varsity Football',
    school: 'Central High',
    sport: 'Football',
    memberCount: 45,
    lastMessage: {
      user: 'Coach Smith',
      content: 'Great practice today team! Championship prep starts tomorrow.',
      timestamp: new Date(Date.now() - 15 * 60 * 1000)
    },
    unreadCount: 3
  },
  {
    id: '2',
    name: 'Girls Basketball',
    school: 'Lincoln Prep Academy',
    sport: 'Basketball',
    memberCount: 28,
    lastMessage: {
      user: 'Sarah M.',
      content: 'Who&apos;s ready for the homecoming game? 🏀',
      timestamp: new Date(Date.now() - 45 * 60 * 1000)
    },
    unreadCount: 7
  },
  {
    id: '3',
    name: 'Drama Club',
    school: 'Riverside Academy',
    sport: 'Theater',
    memberCount: 62,
    lastMessage: {
      user: 'Director Wilson',
      content: 'Final rehearsal tomorrow at 6 PM. Break a leg everyone!',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    unreadCount: 0
  }
];

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState('events');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const formatTimeUntil = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h`;
    return 'Soon';
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'championship': return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 'rivalry': return <Flame className="w-5 h-5 text-red-400" />;
      case 'rally': return <Users className="w-5 h-5 text-green-400" />;
      default: return <Calendar className="w-5 h-5 text-blue-400" />;
    }
  };

  const getHypeColor = (level: number) => {
    if (level >= 90) return 'text-red-400';
    if (level >= 70) return 'text-orange-400';
    if (level >= 50) return 'text-yellow-400';
    return 'text-green-400';
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
                <h1 className="text-white font-bold text-xl">Community Hub</h1>
              </div>
              
              <div className="flex items-center gap-4">
                <HypeWidget userId="current_user" compact />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-black text-white mb-4">
              <span className="text-[#F59E0B]">ULTRA</span> Community
            </h2>
            <p className="text-white/70 text-lg">
              Connect, compete, and celebrate with your school community!
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 mb-8">
            <div className="flex flex-wrap gap-2">
              {COMMUNITY_TABS.map((tab) => {
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

          {/* Content */}
          <AnimatePresence mode="wait">
            {/* Events Tab */}
            {activeTab === 'events' && (
              <motion.div
                key="events"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Upcoming Events</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#F59E0B] text-white rounded-xl hover:bg-[#F97316] transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>Create Event</span>
                  </button>
                </div>

                <div className="grid gap-6">
                  {MOCK_EVENTS.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {getEventIcon(event.type)}
                          <div>
                            <h4 className="text-white font-bold text-xl">{event.title}</h4>
                            <p className="text-white/60">{event.schools.join(' vs ')}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`text-2xl font-black ${getHypeColor(event.hypeLevel)}`}>
                            {event.hypeLevel}%
                          </div>
                          <div className="text-white/60 text-sm">HYPE Level</div>
                        </div>
                      </div>

                      <p className="text-white/80 mb-4">{event.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-white/70">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm">{formatTimeUntil(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{event.participants.toLocaleString()} attending</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{event.date.toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#F59E0B] text-white rounded-xl hover:bg-[#F97316] transition-colors">
                          <Heart className="w-4 h-4" />
                          <span>I&apos;m Going</span>
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors">
                          <Share2 className="w-4 h-4" />
                          <span>Share</span>
                        </button>
                        <Link
                          href={`/community/events/${event.id}`}
                          className="flex items-center gap-2 text-[#F59E0B] hover:text-[#F97316] transition-colors ml-auto"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Rivalries Tab */}
            {activeTab === 'rivalries' && (
              <motion.div
                key="rivalries"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-white mb-6">School Rivalries</h3>

                <div className="grid gap-6">
                  {MOCK_RIVALRIES.map((rivalry) => (
                    <div
                      key={rivalry.id}
                      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <Flame className="w-8 h-8 text-red-400" />
                          <div>
                            <h4 className="text-white font-bold text-xl">Epic Rivalry</h4>
                            <p className="text-white/60">{rivalry.totalGames} games played</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-white/60 text-sm mb-1">Next Game</div>
                          <div className="text-[#F59E0B] font-bold">{formatTimeUntil(rivalry.nextGame)}</div>
                        </div>
                      </div>

                      {/* Schools Comparison */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                        {/* School 1 */}
                        <div className="text-center">
                          <h5 className="text-white font-bold text-lg mb-2">{rivalry.school1}</h5>
                          <div className="space-y-2">
                            <div className="bg-blue-500/20 p-3 rounded-xl border border-blue-500/30">
                              <div className="text-blue-400 text-2xl font-black">{rivalry.hypeScore1.toLocaleString()}</div>
                              <div className="text-white/60 text-sm">HYPE Points</div>
                            </div>
                            <div className="text-white/60 text-sm">
                              Wins: {rivalry.record.wins1}
                            </div>
                          </div>
                        </div>

                        {/* VS */}
                        <div className="text-center">
                          <div className="text-4xl font-black text-red-400 mb-2">VS</div>
                          <div className="text-white/60 text-sm">
                            All-time record: {rivalry.record.wins1}-{rivalry.record.wins2}
                          </div>
                        </div>

                        {/* School 2 */}
                        <div className="text-center">
                          <h5 className="text-white font-bold text-lg mb-2">{rivalry.school2}</h5>
                          <div className="space-y-2">
                            <div className="bg-red-500/20 p-3 rounded-xl border border-red-500/30">
                              <div className="text-red-400 text-2xl font-black">{rivalry.hypeScore2.toLocaleString()}</div>
                              <div className="text-white/60 text-sm">HYPE Points</div>
                            </div>
                            <div className="text-white/60 text-sm">
                              Wins: {rivalry.record.wins2}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center mt-6">
                        <Link
                          href={`/community/rivalries/${rivalry.id}`}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-bold rounded-xl hover:scale-105 transition-transform duration-200"
                        >
                          <span>View Rivalry Details</span>
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Team Chats Tab */}
            {activeTab === 'chats' && (
              <motion.div
                key="chats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Team Chats</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#F59E0B] text-white rounded-xl hover:bg-[#F97316] transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>Join Chat</span>
                  </button>
                </div>

                <div className="grid gap-4">
                  {MOCK_TEAM_CHATS.map((chat) => (
                    <Link
                      key={chat.id}
                      href={`/community/chats/${chat.id}`}
                      className="block bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/30 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                            <MessageCircle className="w-6 h-6 text-purple-400" />
                          </div>
                          <div>
                            <h4 className="text-white font-bold text-lg">{chat.name}</h4>
                            <p className="text-white/60 text-sm">{chat.school} • {chat.sport}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-white/60 text-sm">{chat.memberCount} members</div>
                            <div className="text-white/40 text-xs">{formatTimeAgo(chat.lastMessage.timestamp)}</div>
                          </div>
                          {chat.unreadCount > 0 && (
                            <div className="w-6 h-6 bg-[#F59E0B] text-white text-xs font-bold rounded-full flex items-center justify-center">
                              {chat.unreadCount}
                            </div>
                          )}
                          <ChevronRight className="w-5 h-5 text-white/40" />
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-white/5 rounded-xl">
                        <div className="text-white/60 text-xs mb-1">{chat.lastMessage.user}:</div>
                        <div className="text-white/80 text-sm">{chat.lastMessage.content}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Rallies Tab */}
            {activeTab === 'rallies' && (
              <motion.div
                key="rallies"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">School Rallies</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#F59E0B] text-white rounded-xl hover:bg-[#F97316] transition-colors">
                    <Plus className="w-4 h-4" />
                    <span>Organize Rally</span>
                  </button>
                </div>

                <div className="text-center py-16">
                  <Users className="w-24 h-24 text-white/20 mx-auto mb-6" />
                  <h4 className="text-2xl font-bold text-white mb-4">Rally Your School!</h4>
                  <p className="text-white/60 max-w-md mx-auto mb-8">
                    Create and organize school-wide rallies, spirit weeks, and community events that bring everyone together!
                  </p>
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20 max-w-sm mx-auto">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="text-left">
                          <div className="text-white font-medium">Spirit Week Rally</div>
                          <div className="text-white/60 text-sm">Live updates every 30 seconds</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Gage AI Chat */}
      <GageAIChat
        userId="current_user"
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
}