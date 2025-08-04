'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Calendar, Trophy, Heart, Users, Star,
  Camera, Video, FileText, Download, Share2, Eye,
  Clock, Award, Target, Crown, Zap, Brain
} from 'lucide-react';

interface LifebookStats {
  totalMoments: number;
  yearsTracked: number;
  achievements: number;
  familyMembers: number;
  videosStored: number;
  storiesWritten: number;
}

interface LifeMoment {
  id: string;
  title: string;
  date: string;
  category: 'athletic' | 'academic' | 'family' | 'milestone' | 'achievement';
  description: string;
  media: string[];
  importance: 'high' | 'medium' | 'low';
}

const MOCK_STATS: LifebookStats = {
  totalMoments: 1247,
  yearsTracked: 4,
  achievements: 89,
  familyMembers: 12,
  videosStored: 345,
  storiesWritten: 67
};

const MOCK_MOMENTS: LifeMoment[] = [
  { 
    id: '1', 
    title: 'State Championship Victory', 
    date: '2024-11-15', 
    category: 'athletic', 
    description: 'Led team to first state championship in 20 years with 4 touchdowns',
    media: ['game-highlights.mp4', 'trophy-ceremony.jpg'],
    importance: 'high' 
  },
  { 
    id: '2', 
    title: 'National Honor Society Induction', 
    date: '2024-10-12', 
    category: 'academic', 
    description: 'Inducted into NHS with 3.9 GPA and 200+ community service hours',
    media: ['induction-ceremony.jpg'],
    importance: 'high' 
  },
  { 
    id: '3', 
    title: 'Grandpa\'s First Game', 
    date: '2024-09-08', 
    category: 'family', 
    description: 'Grandpa Joe attended his first high school game in 30 years',
    media: ['grandpa-game.jpg', 'family-photo.jpg'],
    importance: 'high' 
  }
];

export default function Lifebook() {
  const [activeView, setActiveView] = useState('timeline');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'athletic': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'academic': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'family': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'milestone': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'achievement': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/20 via-black/90 to-blue-600/20 border-b border-purple-500/30 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-purple-400">LIFEBOOK</h1>
              <p className="text-white/70">Digital Immortality Engine - Your Complete Life Story</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-sm rounded">ACTIVE RECORDING</span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-sm rounded">AI ENHANCED</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-sm rounded">FAMILY CONNECTED</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors">
              <Camera className="w-4 h-4 inline-block mr-2" />
              Add Moment
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              <Download className="w-4 h-4 inline-block mr-2" />
              Export Book
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-white/10">
        <div className="flex gap-8 px-6">
          {[
            { id: 'timeline', label: 'Life Timeline', icon: Clock },
            { id: 'achievements', label: 'Achievements', icon: Trophy },
            { id: 'family', label: 'Family Stories', icon: Heart },
            { id: 'media', label: 'Media Vault', icon: Video },
            { id: 'legacy', label: 'Legacy Builder', icon: Crown },
            { id: 'ai', label: 'AI Insights', icon: Brain }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveView(tab.id)}
              className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors ${
                activeView === tab.id
                  ? 'border-purple-400 text-purple-400'
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
        {activeView === 'timeline' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Clock className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_STATS.totalMoments.toLocaleString()}</div>
                <div className="text-sm text-white/60">Life Moments</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Calendar className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_STATS.yearsTracked}</div>
                <div className="text-sm text-white/60">Years Tracked</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_STATS.achievements}</div>
                <div className="text-sm text-white/60">Achievements</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Users className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_STATS.familyMembers}</div>
                <div className="text-sm text-white/60">Family Members</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <Video className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_STATS.videosStored}</div>
                <div className="text-sm text-white/60">Videos Stored</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                <FileText className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{MOCK_STATS.storiesWritten}</div>
                <div className="text-sm text-white/60">Stories Written</div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-400" />
                Recent Life Moments
              </h3>
              <div className="space-y-6">
                {MOCK_MOMENTS.map((moment) => (
                  <div key={moment.id} className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-purple-500/30"></div>
                    
                    <div className="flex gap-4">
                      {/* Timeline dot */}
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                        {moment.category === 'athletic' && <Trophy className="w-6 h-6 text-white" />}
                        {moment.category === 'academic' && <BookOpen className="w-6 h-6 text-white" />}
                        {moment.category === 'family' && <Heart className="w-6 h-6 text-white" />}
                        {moment.category === 'milestone' && <Star className="w-6 h-6 text-white" />}
                        {moment.category === 'achievement' && <Award className="w-6 h-6 text-white" />}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 bg-white/5 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-white">{moment.title}</h4>
                            <p className="text-white/60">{moment.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className={`px-2 py-1 rounded border text-xs ${getCategoryColor(moment.category)}`}>
                              {moment.category}
                            </div>
                            <div className={`px-2 py-1 rounded text-xs ${
                              moment.importance === 'high' ? 'bg-red-500/20 text-red-400' :
                              moment.importance === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>
                              {moment.importance}
                            </div>
                          </div>
                        </div>
                        <p className="text-white/80 mb-3">{moment.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-white/60">{moment.media.length} media files</span>
                          </div>
                          <div className="flex gap-2">
                            <button className="px-3 py-1 bg-purple-600 text-white text-sm rounded hover:bg-purple-700">
                              <Eye className="w-3 h-3 inline-block mr-1" />
                              View
                            </button>
                            <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                              <Share2 className="w-3 h-3 inline-block mr-1" />
                              Share
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Legacy Insights */}
            <div className="bg-gradient-to-r from-purple-500/10 via-black/80 to-blue-500/10 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                <Brain className="w-6 h-6" />
                AI Legacy Analysis
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-black/40 rounded-lg p-4">
                  <h5 className="text-lg font-bold text-white mb-2">Life Themes</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-white/70">Leadership</span>
                      <span className="text-purple-400">94%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Perseverance</span>
                      <span className="text-blue-400">87%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/70">Family Values</span>
                      <span className="text-green-400">91%</span>
                    </div>
                  </div>
                </div>
                <div className="bg-black/40 rounded-lg p-4">
                  <h5 className="text-lg font-bold text-white mb-2">Growth Trajectory</h5>
                  <div className="space-y-2">
                    <div className="text-green-400 font-semibold">📈 Exponential Growth</div>
                    <div className="text-sm text-white/70">Your achievement rate has increased 340% over the past 2 years</div>
                  </div>
                </div>
                <div className="bg-black/40 rounded-lg p-4">
                  <h5 className="text-lg font-bold text-white mb-2">Legacy Impact</h5>
                  <div className="space-y-2">
                    <div className="text-yellow-400 font-semibold">🏆 High Impact</div>
                    <div className="text-sm text-white/70">Your story inspires 2,400+ followers across platforms</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}