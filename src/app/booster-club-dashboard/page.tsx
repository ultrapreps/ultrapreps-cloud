'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign,
  Users,
  TrendingUp,
  Heart,
  Trophy,
  Calendar,
  Target,
  Gift,
  Star,
  Crown,
  Flame,
  Building,
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Plus,
  Settings,
  Award,
  Zap,
  Eye,
  Share2
} from 'lucide-react';
import MegaNavigation from '../../components/MegaNavigation';
import HypeWidget from '../../components/HypeWidget';
import GageAIChat from '../../components/GageAIChat';

interface Fundraiser {
  id: string;
  title: string;
  description: string;
  goal: number;
  raised: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'upcoming';
  category: 'equipment' | 'facilities' | 'travel' | 'scholarships' | 'general';
}

interface BoosterMember {
  id: string;
  name: string;
  role: string;
  joinDate: string;
  totalContributed: number;
  volunteerHours: number;
  contactInfo: {
    email: string;
    phone: string;
  };
  membershipLevel: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';
}

export default function BoosterClubDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);

  const clubData = {
    name: 'Champions High Booster Club',
    president: 'Michael Thompson',
    totalMembers: 847,
    activeMembers: 623,
    totalRaised: 284750,
    goalThisYear: 350000,
    eventsThisYear: 23,
    volunteerHours: 3240
  };

  const mockFundraisers: Fundraiser[] = [
    {
      id: '1',
      title: 'New Football Stadium Lights',
      description: 'State-of-the-art LED lighting system for night games',
      goal: 125000,
      raised: 97500,
      startDate: '2025-01-01',
      endDate: '2025-03-31',
      status: 'active',
      category: 'facilities'
    },
    {
      id: '2',
      title: 'Athletic Scholarship Fund',
      description: 'Supporting student-athletes with academic excellence',
      goal: 50000,
      raised: 34800,
      startDate: '2024-09-01',
      endDate: '2025-06-30',
      status: 'active',
      category: 'scholarships'
    },
    {
      id: '3',
      title: 'Basketball Team Travel Fund',
      description: 'Championship tournament travel expenses',
      goal: 15000,
      raised: 15000,
      startDate: '2024-12-01',
      endDate: '2025-02-15',
      status: 'completed',
      category: 'travel'
    }
  ];

  const mockMembers: BoosterMember[] = [
    {
      id: '1',
      name: 'Robert Johnson',
      role: 'Diamond Supporter',
      joinDate: '2020-08-15',
      totalContributed: 25000,
      volunteerHours: 156,
      contactInfo: {
        email: 'rjohnson@email.com',
        phone: '(555) 123-4567'
      },
      membershipLevel: 'diamond'
    },
    {
      id: '2',
      name: 'Sarah Williams',
      role: 'Event Coordinator',
      joinDate: '2021-03-20',
      totalContributed: 8500,
      volunteerHours: 284,
      contactInfo: {
        email: 'swilliams@email.com',
        phone: '(555) 987-6543'
      },
      membershipLevel: 'gold'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Club Overview', icon: Building },
    { id: 'fundraising', label: 'Fundraising', icon: DollarSign },
    { id: 'members', label: 'Members', icon: Users },
    { id: 'events', label: 'Events & Activities', icon: Calendar },
    { id: 'communications', label: 'Communications', icon: MessageSquare },
    { id: 'reports', label: 'Reports & Analytics', icon: TrendingUp }
  ];

  const getMembershipColor = (level: string) => {
    const colors = {
      bronze: 'from-amber-600 to-amber-700',
      silver: 'from-gray-400 to-gray-500',
      gold: 'from-yellow-400 to-yellow-500',
      platinum: 'from-purple-400 to-purple-500',
      diamond: 'from-blue-400 to-blue-500'
    };
    return colors[level as keyof typeof colors] || 'from-gray-400 to-gray-500';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      equipment: 'from-green-500 to-green-600',
      facilities: 'from-blue-500 to-blue-600',
      travel: 'from-purple-500 to-purple-600',
      scholarships: 'from-[#F59E0B] to-[#F97316]',
      general: 'from-gray-500 to-gray-600'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* BOOSTER STADIUM BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/stadium-crowd-energy.jpg')`,
            backgroundAttachment: 'scroll',
            backgroundPosition: 'center top',
            backgroundSize: '120% auto',
            filter: 'grayscale(100%) contrast(1.3) brightness(0.16) blur(2px)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/87 via-[#111827]/82 to-black/92" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-[#F59E0B]/12" />
      </div>

      {/* Community Light Effects */}
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-[#F59E0B]/9 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-[480px] h-[480px] bg-[#F97316]/7 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2.5s' }} />

      {/* Mega Navigation */}
      <MegaNavigation currentPage="booster-club-dashboard" userRole="admin" userName="Michael Thompson" />

      {/* Content */}
      <div className="relative z-10 pt-20">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/30 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] flex items-center justify-center border-2 border-white/20">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-white font-black text-2xl bg-gradient-to-r from-white via-[#F59E0B] to-white bg-clip-text text-transparent">
                    {clubData.name}
                  </h1>
                  <p className="text-white/70 text-lg font-bold">President: {clubData.president}</p>
                  <p className="text-white/50 text-sm">Powering Champions Since 1987</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-right">
                <div>
                  <div className="text-white font-bold text-lg">{clubData.totalMembers}</div>
                  <div className="text-white/60 text-xs">Members</div>
                </div>
                <div>
                  <div className="text-[#F59E0B] font-bold text-lg">${(clubData.totalRaised / 1000).toFixed(0)}K</div>
                  <div className="text-white/60 text-xs">Raised</div>
                </div>
                <div>
                  <div className="text-white font-bold text-lg">{clubData.eventsThisYear}</div>
                  <div className="text-white/60 text-xs">Events</div>
                </div>
                <div>
                  <div className="text-[#F59E0B] font-bold text-lg">{clubData.volunteerHours}</div>
                  <div className="text-white/60 text-xs">Vol Hours</div>
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
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {[
                      { label: 'Annual Goal Progress', value: `${Math.round((clubData.totalRaised / clubData.goalThisYear) * 100)}%`, icon: Target, color: 'from-[#F59E0B] to-[#F97316]' },
                      { label: 'Active Members', value: clubData.activeMembers, icon: Users, color: 'from-blue-500 to-blue-600' },
                      { label: 'Events This Year', value: clubData.eventsThisYear, icon: Calendar, color: 'from-green-500 to-green-600' },
                      { label: 'Volunteer Hours', value: clubData.volunteerHours, icon: Heart, color: 'from-purple-500 to-purple-600' }
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
                      </motion.div>
                    ))}
                  </div>

                  {/* Active Fundraisers & Top Members */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Active Fundraisers */}
                    <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                      <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                        <DollarSign className="w-6 h-6 text-[#F59E0B]" />
                        Active Fundraisers
                      </h3>
                      <div className="space-y-4">
                        {mockFundraisers.filter(f => f.status === 'active').map((fundraiser, index) => (
                          <motion.div
                            key={fundraiser.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl p-4"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="text-white font-bold">{fundraiser.title}</h4>
                                <p className="text-white/60 text-sm">{fundraiser.description}</p>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getCategoryColor(fundraiser.category)} text-white`}>
                                {fundraiser.category.toUpperCase()}
                              </span>
                            </div>
                            
                            <div className="mb-3">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-white/60">Progress</span>
                                <span className="text-white font-bold">${fundraiser.raised.toLocaleString()} / ${fundraiser.goal.toLocaleString()}</span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] h-2 rounded-full"
                                  style={{ width: `${(fundraiser.raised / fundraiser.goal) * 100}%` }}
                                />
                              </div>
                            </div>
                            
                            <div className="flex justify-between text-xs text-white/60">
                              <span>Ends: {fundraiser.endDate}</span>
                              <span>{Math.round((fundraiser.raised / fundraiser.goal) * 100)}% Complete</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Top Contributors */}
                    <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                      <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                        <Star className="w-6 h-6 text-[#F59E0B]" />
                        Top Contributors
                      </h3>
                      <div className="space-y-4">
                        {mockMembers.map((member, index) => (
                          <motion.div
                            key={member.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl p-4"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h4 className="text-white font-bold">{member.name}</h4>
                                <p className="text-[#F59E0B] text-sm font-bold">{member.role}</p>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getMembershipColor(member.membershipLevel)} text-white`}>
                                {member.membershipLevel.toUpperCase()}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div className="text-center">
                                <div className="text-lg font-bold text-[#F59E0B]">${member.totalContributed.toLocaleString()}</div>
                                <div className="text-white/60 text-xs">Contributed</div>
                              </div>
                              <div className="text-center">
                                <div className="text-lg font-bold text-white">{member.volunteerHours}</div>
                                <div className="text-white/60 text-xs">Vol Hours</div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
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
        userId="booster_club_demo"
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
}