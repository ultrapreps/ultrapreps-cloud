'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, Trophy, TrendingUp, BarChart3, Star, Target,
  Calendar, Book, Award, Heart, Brain, Camera,
  MessageCircle, Bell, Settings, User, Crown,
  Play, Eye, Download, Share2, Search, Filter
} from 'lucide-react';

interface StudentStats {
  gpa: number;
  hypeScore: number;
  scholarshipValue: number;
  achievements: number;
  videoViews: number;
  recruitingInterest: number;
}

interface Achievement {
  id: string;
  title: string;
  date: string;
  category: 'academic' | 'athletic' | 'social' | 'leadership';
  value: string;
}

interface RecruitingLead {
  id: string;
  school: string;
  coach: string;
  interest: 'high' | 'medium' | 'watching';
  sport: string;
  lastContact: string;
}

const MOCK_STUDENT_STATS: StudentStats = {
  gpa: 3.87,
  hypeScore: 8947,
  scholarshipValue: 847000,
  achievements: 23,
  videoViews: 12847,
  recruitingInterest: 7
};

const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: '1', title: 'State Championship MVP', date: '2024-11-15', category: 'athletic', value: 'Football' },
  { id: '2', title: 'Honor Roll Q1', date: '2024-10-30', category: 'academic', value: '3.9 GPA' },
  { id: '3', title: 'Team Captain', date: '2024-08-15', category: 'leadership', value: 'Football' },
  { id: '4', title: 'Community Service Award', date: '2024-09-20', category: 'social', value: '100+ hours' },
  { id: '5', title: 'All-Conference First Team', date: '2024-11-01', category: 'athletic', value: 'Football' }
];

const MOCK_RECRUITING_LEADS: RecruitingLead[] = [
  { id: '1', school: 'University of Texas', coach: 'Steve Sarkisian', interest: 'high', sport: 'Football', lastContact: '2024-11-20' },
  { id: '2', school: 'Alabama', coach: 'Kalen DeBoer', interest: 'high', sport: 'Football', lastContact: '2024-11-18' },
  { id: '3', school: 'Ohio State', coach: 'Ryan Day', interest: 'medium', sport: 'Football', lastContact: '2024-11-15' },
  { id: '4', school: 'Georgia', coach: 'Kirby Smart', interest: 'watching', sport: 'Football', lastContact: '2024-11-10' }
];

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-black/90 border-b border-white/10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Marcus Johnson</h1>
              <p className="text-white/70">Senior • Quarterback • Lincoln High School</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-sm rounded">ACTIVE</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-sm rounded">RECRUITING: HOT</span>
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-sm rounded">VERIFIED</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/herocard/create" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              <Camera className="w-4 h-4 inline-block mr-2" />
              Create HeroCard
            </Link>
            <Link href="/stadium/create" className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
              <Crown className="w-4 h-4 inline-block mr-2" />
              Build Stadium
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-white/10">
        <div className="flex gap-8 px-6">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'recruiting', label: 'Recruiting', icon: Target },
            { id: 'academics', label: 'Academics', icon: Book },
            { id: 'athletics', label: 'Athletics', icon: Trophy },
            { id: 'content', label: 'Content', icon: Camera },
            { id: 'network', label: 'Network', icon: Users }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-400 text-blue-400'
                  : 'border-transparent text-white/70 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Book className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_STUDENT_STATS.gpa}</div>
                <div className="text-sm text-white/60">GPA</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_STUDENT_STATS.hypeScore.toLocaleString()}</div>
                <div className="text-sm text-white/60">HYPE Score</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Trophy className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">${(MOCK_STUDENT_STATS.scholarshipValue / 1000).toFixed(0)}K</div>
                <div className="text-sm text-white/60">Scholarship Value</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Award className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_STUDENT_STATS.achievements}</div>
                <div className="text-sm text-white/60">Achievements</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Eye className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_STUDENT_STATS.videoViews.toLocaleString()}</div>
                <div className="text-sm text-white/60">Video Views</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Target className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_STUDENT_STATS.recruitingInterest}</div>
                <div className="text-sm text-white/60">College Interest</div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Achievements */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Recent Achievements
                </h3>
                <div className="space-y-3">
                  {MOCK_ACHIEVEMENTS.slice(0, 4).map((achievement) => (
                    <div key={achievement.id} className="flex items-center justify-between p-3 bg-white/5 rounded">
                      <div>
                        <div className="font-medium text-white">{achievement.title}</div>
                        <div className="text-sm text-white/60">{achievement.value} • {achievement.date}</div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        achievement.category === 'athletic' ? 'bg-orange-500/20 text-orange-400' :
                        achievement.category === 'academic' ? 'bg-green-500/20 text-green-400' :
                        achievement.category === 'leadership' ? 'bg-purple-500/20 text-purple-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {achievement.category}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recruiting Activity */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Recruiting Activity
                </h3>
                <div className="space-y-3">
                  {MOCK_RECRUITING_LEADS.slice(0, 4).map((lead) => (
                    <div key={lead.id} className="flex items-center justify-between p-3 bg-white/5 rounded">
                      <div>
                        <div className="font-medium text-white">{lead.school}</div>
                        <div className="text-sm text-white/60">{lead.coach} • {lead.lastContact}</div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        lead.interest === 'high' ? 'bg-red-500/20 text-red-400' :
                        lead.interest === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {lead.interest}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recruiting' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Recruiting Command Center</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                  <Target className="w-4 h-4 inline-block mr-2" />
                  Update Profile
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                  <Download className="w-4 h-4 inline-block mr-2" />
                  Export Resume
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Active Recruiting Leads</h3>
                  <div className="space-y-4">
                    {MOCK_RECRUITING_LEADS.map((lead) => (
                      <div key={lead.id} className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-white">{lead.school}</h4>
                            <p className="text-white/70">{lead.coach} • {lead.sport}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm ${
                            lead.interest === 'high' ? 'bg-red-500/20 text-red-400' :
                            lead.interest === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {lead.interest.toUpperCase()}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white/60">Last Contact: {lead.lastContact}</span>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                              Message
                            </button>
                            <button className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700">
                              Send Film
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Recruiting Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">Profile Views</span>
                      <span className="text-white font-semibold">2,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Coach Contacts</span>
                      <span className="text-white font-semibold">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Scholarship Offers</span>
                      <span className="text-white font-semibold">4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Campus Visits</span>
                      <span className="text-white font-semibold">2</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Next Steps</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                      <div className="text-yellow-400 font-medium">Senior Film Upload</div>
                      <div className="text-sm text-white/70">Due: Dec 15, 2024</div>
                    </div>
                    <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                      <div className="text-blue-400 font-medium">Texas Campus Visit</div>
                      <div className="text-sm text-white/70">Scheduled: Dec 20, 2024</div>
                    </div>
                    <div className="p-3 bg-green-500/10 border border-green-500/30 rounded">
                      <div className="text-green-400 font-medium">Update Transcripts</div>
                      <div className="text-sm text-white/70">Complete by: Jan 1, 2025</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs would be implemented similarly with real functional content */}
      </div>
    </div>
  );
}