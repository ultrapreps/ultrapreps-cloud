'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Heart, Users, Calendar, Camera, Video, Trophy,
  Star, Clock, MapPin, Eye, Share2, Download,
  Play, Pause, Volume2, BookOpen, Award, Crown
} from 'lucide-react';

interface FamilyMoment {
  id: string;
  title: string;
  date: string;
  type: 'game' | 'ceremony' | 'milestone' | 'family';
  description: string;
  participants: string[];
  media: string[];
  emotion: 'pride' | 'joy' | 'achievement' | 'love';
}

const MOCK_MOMENTS: FamilyMoment[] = [
  {
    id: '1',
    title: "Grandpa Jim's First Game in 30 Years",
    date: '2024-09-08',
    type: 'game',
    description: "After 30 years away from the stadium, Grandpa Jim attended Marcus's homecoming game. The moment he saw his grandson score the winning touchdown, tears of pride filled his eyes.",
    participants: ['Grandpa Jim', 'Marcus Johnson', 'Johnson Family'],
    media: ['grandpa-first-game.mp4', 'family-celebration.jpg', 'touchdown-moment.jpg'],
    emotion: 'pride'
  },
  {
    id: '2',
    title: "Three Generations United",
    date: '2024-10-15',
    type: 'milestone',
    description: "Grandpa Jim, Dad, and Marcus all wearing their letterman jackets from their respective high school careers - spanning 60 years of athletic excellence.",
    participants: ['Grandpa Jim', 'Robert Johnson', 'Marcus Johnson'],
    media: ['three-generations.jpg', 'letterman-comparison.jpg'],
    emotion: 'love'
  },
  {
    id: '3',
    title: "State Championship Victory",
    date: '2024-11-15',
    type: 'ceremony',
    description: "Grandpa Jim was invited onto the field for the state championship trophy presentation. His reaction to seeing his grandson achieve what he never could was priceless.",
    participants: ['Grandpa Jim', 'Marcus Johnson', 'Team', 'Coaching Staff'],
    media: ['trophy-presentation.mp4', 'grandpa-reaction.jpg', 'team-celebration.mp4'],
    emotion: 'achievement'
  }
];

export default function GrandpaJimDemo() {
  const [selectedMoment, setSelectedMoment] = useState<FamilyMoment>(MOCK_MOMENTS[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'pride': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'joy': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'achievement': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'love': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'game': return <Trophy className="w-5 h-5" />;
      case 'ceremony': return <Award className="w-5 h-5" />;
      case 'milestone': return <Star className="w-5 h-5" />;
      case 'family': return <Heart className="w-5 h-5" />;
      default: return <Calendar className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/20 via-black/90 to-pink-600/20 border-b border-purple-500/30 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-purple-400">GRANDPA JIM'S JOURNEY</h1>
              <p className="text-white/70 text-lg">From Skeptic to Biggest Fan - A Family Legacy Story</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm rounded">FAMILY FIRST</span>
                <span className="px-3 py-1 bg-pink-500/20 text-pink-400 text-sm rounded">3 GENERATIONS</span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded">LEGACY CONTINUES</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-6xl font-bold text-white">30</div>
            <div className="text-white/70">Years Since Last Game</div>
            <div className="text-purple-400 font-semibold">Until Marcus Changed Everything</div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Featured Story */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 mb-8">
            <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl mb-6 relative overflow-hidden">
              {/* Video Player Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Video className="w-32 h-32 text-white/50 mx-auto mb-6" />
                  <h3 className="text-3xl font-bold text-white mb-3">{selectedMoment.title}</h3>
                  <p className="text-xl text-white/70 max-w-2xl mx-auto">{selectedMoment.description}</p>
                </div>
              </div>
              
              {/* Emotion Badge */}
              <div className="absolute top-6 left-6">
                <div className={`px-4 py-2 rounded-full border ${getEmotionColor(selectedMoment.emotion)}`}>
                  <span className="font-semibold capitalize">{selectedMoment.emotion}</span>
                </div>
              </div>

              {/* Play Controls */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/80 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
                      >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                      </button>
                      <div className="text-white">
                        <div className="font-semibold">{selectedMoment.title}</div>
                        <div className="text-sm text-white/70">{selectedMoment.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Share2 className="w-4 h-4 inline-block mr-2" />
                        Share Story
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <Download className="w-4 h-4 inline-block mr-2" />
                        Save Memory
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Details */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">The Impact</h4>
                <div className="space-y-4">
                  <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <div className="text-purple-400 font-semibold mb-2">Family Reconnection</div>
                    <div className="text-white/80">This moment bridged a 30-year gap between grandfather and grandson, reigniting Grandpa Jim's passion for sports and family.</div>
                  </div>
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="text-green-400 font-semibold mb-2">Legacy Continuation</div>
                    <div className="text-white/80">Three generations of Johnson men, each contributing their own chapter to the family's athletic legacy.</div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Participants</h4>
                <div className="space-y-3">
                  {selectedMoment.participants.map((participant, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-white font-medium">{participant}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Memory Timeline */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-purple-400" />
              The Complete Journey
            </h3>
            <div className="space-y-8">
              {MOCK_MOMENTS.map((moment, index) => (
                <div key={moment.id} className="relative">
                  {/* Timeline line */}
                  {index < MOCK_MOMENTS.length - 1 && (
                    <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-purple-500/30"></div>
                  )}
                  
                  <div className="flex gap-6">
                    {/* Timeline dot */}
                    <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 relative z-10">
                      {getTypeIcon(moment.type)}
                    </div>
                    
                    {/* Content */}
                    <div 
                      className={`flex-1 p-6 rounded-xl border cursor-pointer transition-all ${
                        selectedMoment.id === moment.id 
                          ? 'bg-purple-500/20 border-purple-500/50' 
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                      onClick={() => setSelectedMoment(moment)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-xl font-semibold text-white">{moment.title}</h4>
                          <p className="text-white/60">{moment.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`px-3 py-1 rounded-full border ${getEmotionColor(moment.emotion)}`}>
                            {moment.emotion}
                          </div>
                        </div>
                      </div>
                      <p className="text-white/80 mb-4">{moment.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white/60">{moment.media.length} memories captured</span>
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
        </div>

        {/* Sidebar */}
        <div className="w-96 border-l border-white/10 bg-white/5 p-8">
          <div className="space-y-8">
            {/* Impact Stats */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Family Impact</h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-purple-500/10 rounded-lg">
                  <div className="text-3xl font-bold text-purple-400">3</div>
                  <div className="text-sm text-white/60">Generations United</div>
                </div>
                <div className="text-center p-4 bg-green-500/10 rounded-lg">
                  <div className="text-3xl font-bold text-green-400">30</div>
                  <div className="text-sm text-white/60">Year Gap Bridged</div>
                </div>
                <div className="text-center p-4 bg-pink-500/10 rounded-lg">
                  <div className="text-3xl font-bold text-pink-400">∞</div>
                  <div className="text-sm text-white/60">Memories Created</div>
                </div>
              </div>
            </div>

            {/* The Transformation */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">The Transformation</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-red-400 font-semibold text-sm">BEFORE</div>
                  <div className="text-white/80 text-sm">"I'm too old for this sports nonsense"</div>
                </div>
                <div className="border-t border-white/10 pt-4">
                  <div className="text-green-400 font-semibold text-sm">AFTER</div>
                  <div className="text-white/80 text-sm">"I wouldn't miss a game for the world"</div>
                </div>
              </div>
            </div>

            {/* Family Legacy */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Johnson Legacy</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="text-white font-medium">Grandpa Jim</div>
                    <div className="text-xs text-white/60">High School All-State 1970</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">Dad Robert</div>
                    <div className="text-xs text-white/60">State Champions 1995</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-white font-medium">Marcus</div>
                    <div className="text-xs text-white/60">State Champions 2024</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Start Your Family's Story</h3>
              <p className="text-white/70 text-sm mb-4">Every family has moments worth preserving. Let UltraPreps help you capture and celebrate your legacy.</p>
              <Link href="/lifebook" className="block w-full px-4 py-3 bg-purple-600 text-white text-center rounded-lg hover:bg-purple-700 transition-colors">
                Create Your Lifebook
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}