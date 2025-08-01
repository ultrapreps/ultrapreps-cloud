'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield,
  Users,
  Vote,
  FileText,
  DollarSign,
  TrendingUp,
  Building,
  Heart,
  Eye,
  MessageSquare,
  Calendar,
  Gavel,
  BookOpen,
  Star,
  Crown,
  Target,
  BarChart3,
  Globe,
  CheckCircle,
  Clock,
  AlertCircle,
  ChevronRight,
  Plus,
  Settings,
  PieChart,
  Award
} from 'lucide-react';
import MegaNavigation from '../../components/MegaNavigation';
import HypeWidget from '../../components/HypeWidget';
import GageAIChat from '../../components/GageAIChat';

interface PolicyItem {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'review' | 'voting' | 'approved' | 'rejected';
  category: 'academic' | 'athletic' | 'financial' | 'safety' | 'technology';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  submittedBy: string;
  submittedDate: string;
  votes: {
    for: number;
    against: number;
    abstain: number;
  };
}

interface BoardMember {
  id: string;
  name: string;
  position: string;
  district: string;
  yearsServed: number;
  committees: string[];
  avatar: string;
  expertise: string[];
}

interface SchoolBoardTab {
  id: string;
  label: string;
  icon: React.ComponentType<{className?: string}>;
}

export default function SchoolBoardDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyItem | null>(null);

  const boardData = {
    district: 'Metro Excellence School District',
    boardSize: 7,
    currentTerm: '2023-2027',
    nextElection: 'November 2025',
    meetingSchedule: 'Second Tuesday of each month',
    publicParticipation: 94.2
  };

  const mockBoardMembers: BoardMember[] = [
    {
      id: '1',
      name: 'Maria Rodriguez',
      position: 'Board President',
      district: 'District 1',
      yearsServed: 8,
      committees: ['Executive', 'Policy', 'Finance'],
      avatar: '/herocard-1.png',
      expertise: ['Education Policy', 'Community Engagement', 'Strategic Planning']
    },
    {
      id: '2',
      name: 'James Patterson',
      position: 'Vice President',
      district: 'District 3',
      yearsServed: 6,
      committees: ['Athletics', 'Facilities', 'Safety'],
      avatar: '/herocard-2.png',
      expertise: ['Sports Administration', 'Facility Management', 'Budget Oversight']
    },
    {
      id: '3',
      name: 'Dr. Angela Chen',
      position: 'Secretary',
      district: 'District 2',
      yearsServed: 4,
      committees: ['Academic Excellence', 'Technology', 'Curriculum'],
      avatar: '/herocard-3.png',
      expertise: ['Curriculum Development', 'Educational Technology', 'Assessment']
    }
  ];

  const mockPolicies: PolicyItem[] = [
    {
      id: '1',
      title: 'AI Integration in Classroom Learning',
      description: 'Comprehensive policy framework for implementing artificial intelligence tools to enhance student learning outcomes and teacher effectiveness.',
      status: 'voting',
      category: 'technology',
      priority: 'high',
      submittedBy: 'Dr. Angela Chen',
      submittedDate: '2025-01-15',
      votes: { for: 5, against: 1, abstain: 1 }
    },
    {
      id: '2',
      title: 'Athletic Excellence Funding Initiative',
      description: 'Proposal to increase athletic program funding by 25% to support championship-level facilities and coaching staff development.',
      status: 'approved',
      category: 'athletic',
      priority: 'medium',
      submittedBy: 'James Patterson',
      submittedDate: '2025-01-08',
      votes: { for: 6, against: 0, abstain: 1 }
    },
    {
      id: '3',
      title: 'Community Safety Enhancement Protocol',
      description: 'Updated safety protocols including advanced security systems, emergency response procedures, and mental health support services.',
      status: 'review',
      category: 'safety',
      priority: 'urgent',
      submittedBy: 'Maria Rodriguez',
      submittedDate: '2025-01-20',
      votes: { for: 0, against: 0, abstain: 0 }
    }
  ];

  const tabs: SchoolBoardTab[] = [
    { id: 'overview', label: 'Board Overview', icon: Shield },
    { id: 'policies', label: 'Policy Management', icon: FileText },
    { id: 'governance', label: 'Governance & Voting', icon: Vote },
    { id: 'community', label: 'Community Engagement', icon: Heart },
    { id: 'finance', label: 'Budget Oversight', icon: DollarSign },
    { id: 'strategic', label: 'Strategic Planning', icon: Target },
    { id: 'transparency', label: 'Public Transparency', icon: Eye }
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      academic: 'from-blue-500 to-blue-600',
      athletic: 'from-[#F59E0B] to-[#F97316]',
      financial: 'from-green-500 to-green-600',
      safety: 'from-red-500 to-red-600',
      technology: 'from-purple-500 to-purple-600'
    };
    return colors[category as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      urgent: 'bg-red-500/20 text-red-400 border-red-500/30',
      high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      low: 'bg-green-500/20 text-green-400 border-green-500/30'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-500/20 text-gray-400',
      review: 'bg-blue-500/20 text-blue-400',
      voting: 'bg-[#F59E0B]/20 text-[#F59E0B]',
      approved: 'bg-green-500/20 text-green-400',
      rejected: 'bg-red-500/20 text-red-400'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500/20 text-gray-400';
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* GOVERNANCE STADIUM BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/stadium-crowd-energy.jpg')`,
            backgroundAttachment: 'scroll',
            backgroundPosition: 'center top',
            backgroundSize: '120% auto',
            filter: 'grayscale(100%) contrast(1.4) brightness(0.12) blur(2px)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/92 via-[#111827]/88 to-black/96" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-[#1E3A8A]/25" />
      </div>

      {/* Governance Light Effects */}
      <div className="absolute top-1/4 right-1/3 w-80 h-80 bg-[#F59E0B]/8 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-[#F97316]/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Global Navigation */}
      <MegaNavigation currentPage="school-board-dashboard" userRole="board" userName="Board Member" />

      {/* Content */}
      <div className="relative z-10 pt-20">
        {/* Board Header */}
        <header className="border-b border-white/10 bg-black/30 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] flex items-center justify-center border-2 border-white/20">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-white font-black text-2xl bg-gradient-to-r from-white via-[#F59E0B] to-white bg-clip-text text-transparent">
                    School Board Portal
                  </h1>
                  <p className="text-white/70 text-lg font-bold">{boardData.district}</p>
                  <p className="text-white/50 text-sm">Governing Excellence Since 1987</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-white font-bold text-xl">{boardData.boardSize} Board Members</div>
                  <div className="text-[#F59E0B] font-bold">Term: {boardData.currentTerm}</div>
                </div>
                <HypeWidget userId="school_board_demo" compact />
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
                  {/* Governance Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { label: 'Active Policies', value: '47', icon: FileText, color: 'from-blue-500 to-blue-600' },
                      { label: 'Pending Votes', value: '3', icon: Vote, color: 'from-[#F59E0B] to-[#F97316]' },
                      { label: 'Community Engagement', value: '94.2%', icon: Heart, color: 'from-purple-500 to-purple-600' },
                      { label: 'Meeting Attendance', value: '98%', icon: Users, color: 'from-green-500 to-green-600' }
                    ].map((metric, index) => (
                      <motion.div
                        key={metric.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-gradient-to-r ${metric.color} p-6 rounded-2xl text-white shadow-xl`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <metric.icon className="w-8 h-8" />
                          <span className="text-3xl font-black">{metric.value}</span>
                        </div>
                        <p className="font-bold text-sm opacity-90">{metric.label}</p>
                      </motion.div>
                    ))}
                  </div>

                  {/* Board Members & Recent Policies */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Board Members */}
                    <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                      <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                        <Users className="w-6 h-6 text-[#F59E0B]" />
                        Board Leadership
                      </h3>
                      <div className="space-y-4">
                        {mockBoardMembers.map((member, index) => (
                          <motion.div
                            key={member.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gradient-to-r from-white/5 to-white/10 border border-white/20 rounded-xl p-4"
                          >
                            <div className="flex items-center gap-4">
                              <img 
                                src={member.avatar} 
                                alt={member.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-[#F59E0B]/50"
                              />
                              <div className="flex-1">
                                <h4 className="text-white font-bold">{member.name}</h4>
                                <p className="text-[#F59E0B] text-sm font-bold">{member.position}</p>
                                <p className="text-white/60 text-sm">{member.district} • {member.yearsServed} years</p>
                              </div>
                              <div className="text-right">
                                <div className="text-white/60 text-xs">Committees</div>
                                <div className="text-white font-bold text-sm">{member.committees.length}</div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Policy Activity */}
                    <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                      <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
                        <FileText className="w-6 h-6 text-[#F59E0B]" />
                        Recent Policy Activity
                      </h3>
                      <div className="space-y-4">
                        {mockPolicies.map((policy, index) => (
                          <motion.div
                            key={policy.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedPolicy(policy)}
                            className="bg-white/5 rounded-xl p-4 border border-white/10 cursor-pointer hover:border-[#F59E0B]/50 transition-all duration-300"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="text-white font-bold text-sm flex-1 pr-2">{policy.title}</h4>
                              <div className="flex flex-col gap-1">
                                <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(policy.status)}`}>
                                  {policy.status.toUpperCase()}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getPriorityColor(policy.priority)}`}>
                                  {policy.priority.toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <p className="text-white/60 text-xs mb-3 line-clamp-2">{policy.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-white/50 text-xs">By {policy.submittedBy}</span>
                              <ChevronRight className="w-4 h-4 text-white/50" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'policies' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-3xl font-black text-white">Policy Management Center</h3>
                    <button className="px-6 py-3 bg-[#F59E0B] text-black rounded-xl font-bold hover:bg-[#F97316] transition-colors">
                      <Plus className="w-5 h-5 inline mr-2" />
                      Draft New Policy
                    </button>
                  </div>

                  <div className="space-y-4">
                    {mockPolicies.map((policy, index) => (
                      <motion.div
                        key={policy.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-black/40 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-white font-bold text-xl">{policy.title}</h4>
                              <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(policy.status)}`}>
                                {policy.status.toUpperCase()}
                              </span>
                              <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getPriorityColor(policy.priority)}`}>
                                {policy.priority.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-white/70 mb-3">{policy.description}</p>
                            <div className="flex items-center gap-4 text-sm text-white/60">
                              <span>Submitted by: <strong className="text-white">{policy.submittedBy}</strong></span>
                              <span>Date: <strong className="text-white">{policy.submittedDate}</strong></span>
                              <span className={`px-2 py-1 rounded bg-gradient-to-r ${getCategoryColor(policy.category)} text-white text-xs font-bold`}>
                                {policy.category.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {policy.status === 'voting' && (
                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div className="text-center bg-green-500/20 rounded-xl p-3 border border-green-500/30">
                              <div className="text-2xl font-black text-green-400">{policy.votes.for}</div>
                              <div className="text-green-400 text-sm font-bold">FOR</div>
                            </div>
                            <div className="text-center bg-red-500/20 rounded-xl p-3 border border-red-500/30">
                              <div className="text-2xl font-black text-red-400">{policy.votes.against}</div>
                              <div className="text-red-400 text-sm font-bold">AGAINST</div>
                            </div>
                            <div className="text-center bg-yellow-500/20 rounded-xl p-3 border border-yellow-500/30">
                              <div className="text-2xl font-black text-yellow-400">{policy.votes.abstain}</div>
                              <div className="text-yellow-400 text-sm font-bold">ABSTAIN</div>
                            </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-medium">
                            View Full Policy
                          </button>
                          <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors font-medium">
                            Edit Draft
                          </button>
                          {policy.status === 'voting' && (
                            <button className="px-4 py-2 bg-[#F59E0B] text-black rounded-lg hover:bg-[#F97316] transition-colors font-bold">
                              Cast Vote
                            </button>
                          )}
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
        userId="school_board_demo"
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
}