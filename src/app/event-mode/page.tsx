'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, Clock, MapPin, Users, Trophy, Camera,
  Video, Mic, Radio, Satellite, Eye, Share2,
  Bell, Zap, Crown, Star, Target, Activity,
  Play, Pause, SkipForward, Volume2, Settings
} from 'lucide-react';

interface LiveEvent {
  id: string;
  title: string;
  type: 'game' | 'tournament' | 'ceremony' | 'practice' | 'meeting';
  status: 'live' | 'upcoming' | 'ended';
  startTime: string;
  location: string;
  viewers: number;
  duration: string;
  featured: boolean;
}

interface EventMetrics {
  liveViewers: number;
  totalStreams: number;
  activeEvents: number;
  hoursStreamed: number;
  socialShares: number;
  engagementRate: number;
}

const MOCK_METRICS: EventMetrics = {
  liveViewers: 2847,
  totalStreams: 156,
  activeEvents: 12,
  hoursStreamed: 847,
  socialShares: 4567,
  engagementRate: 94
};

const MOCK_EVENTS: LiveEvent[] = [
  { 
    id: '1', 
    title: 'State Championship Final', 
    type: 'game', 
    status: 'live', 
    startTime: '7:00 PM', 
    location: 'Memorial Stadium', 
    viewers: 1247, 
    duration: '2:34:12',
    featured: true 
  },
  { 
    id: '2', 
    title: 'Team Practice Session', 
    type: 'practice', 
    status: 'live', 
    startTime: '3:30 PM', 
    location: 'Training Facility', 
    viewers: 234, 
    duration: '1:45:30',
    featured: false 
  },
  { 
    id: '3', 
    title: 'Awards Ceremony', 
    type: 'ceremony', 
    status: 'upcoming', 
    startTime: '8:30 PM', 
    location: 'School Auditorium', 
    viewers: 0, 
    duration: '0:00:00',
    featured: true 
  },
  { 
    id: '4', 
    title: 'Regional Semifinals', 
    type: 'tournament', 
    status: 'ended', 
    startTime: '2:00 PM', 
    location: 'Central High', 
    viewers: 0, 
    duration: '3:12:45',
    featured: false 
  }
];

export default function EventMode() {
  const [selectedEvent, setSelectedEvent] = useState<LiveEvent | null>(MOCK_EVENTS[0]);
  const [isStreaming, setIsStreaming] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'upcoming': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'ended': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'game': return <Trophy className="w-4 h-4" />;
      case 'tournament': return <Crown className="w-4 h-4" />;
      case 'ceremony': return <Star className="w-4 h-4" />;
      case 'practice': return <Target className="w-4 h-4" />;
      case 'meeting': return <Users className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600/20 via-black/90 to-blue-600/20 border-b border-red-500/30 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center">
              <Radio className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-red-400">EVENT MODE</h1>
              <p className="text-white/70">Live Streaming & Event Broadcasting Hub</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-sm rounded flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  LIVE
                </span>
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-sm rounded">{MOCK_METRICS.liveViewers.toLocaleString()} WATCHING</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-sm rounded">HD QUALITY</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
              <Video className="w-4 h-4 inline-block mr-2" />
              Go Live
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              <Calendar className="w-4 h-4 inline-block mr-2" />
              Schedule Event
            </button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Live Stream Player */}
          {selectedEvent && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-6">
              <div className="aspect-video bg-gradient-to-br from-red-500/20 to-blue-500/20 rounded-lg mb-4 relative overflow-hidden">
                {/* Video Player Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Video className="w-24 h-24 text-white/50 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-white mb-2">{selectedEvent.title}</h3>
                    <div className="flex items-center justify-center gap-4 text-white/70">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {selectedEvent.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {selectedEvent.viewers.toLocaleString()} viewers
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedEvent.duration}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Live Indicator */}
                {selectedEvent.status === 'live' && (
                  <div className="absolute top-4 left-4">
                    <div className="px-3 py-1 bg-red-500 text-white text-sm font-bold rounded flex items-center gap-2">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      LIVE
                    </div>
                  </div>
                )}

                {/* Controls Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                          {isStreaming ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </button>
                        <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                          <SkipForward className="w-5 h-5" />
                        </button>
                        <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                          <Volume2 className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                          <Share2 className="w-4 h-4 inline-block mr-1" />
                          Share
                        </button>
                        <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                          <Settings className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Info */}
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{selectedEvent.title}</h2>
                  <div className="flex items-center gap-4 text-white/70">
                    <span className="flex items-center gap-1">
                      {getTypeIcon(selectedEvent.type)}
                      {selectedEvent.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedEvent.startTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {selectedEvent.location}
                    </span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded border ${getStatusColor(selectedEvent.status)}`}>
                  {selectedEvent.status.toUpperCase()}
                </div>
              </div>
            </div>
          )}

          {/* Event Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <Eye className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{MOCK_METRICS.liveViewers.toLocaleString()}</div>
              <div className="text-sm text-white/60">Live Viewers</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <Video className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{MOCK_METRICS.totalStreams}</div>
              <div className="text-sm text-white/60">Total Streams</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <Radio className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{MOCK_METRICS.activeEvents}</div>
              <div className="text-sm text-white/60">Active Events</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{MOCK_METRICS.hoursStreamed}</div>
              <div className="text-sm text-white/60">Hours Streamed</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <Share2 className="w-8 h-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{MOCK_METRICS.socialShares.toLocaleString()}</div>
              <div className="text-sm text-white/60">Social Shares</div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-center">
              <Zap className="w-8 h-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{MOCK_METRICS.engagementRate}%</div>
              <div className="text-sm text-white/60">Engagement</div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 border-l border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Live Events</h3>
          <div className="space-y-4">
            {MOCK_EVENTS.map((event) => (
              <div 
                key={event.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedEvent?.id === event.id 
                    ? 'bg-blue-500/20 border-blue-500/50' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(event.type)}
                    <span className="font-medium text-white text-sm">{event.title}</span>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs ${getStatusColor(event.status)}`}>
                    {event.status}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <Clock className="w-3 h-3" />
                    {event.startTime}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </div>
                  {event.status === 'live' && (
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <Eye className="w-3 h-3" />
                      {event.viewers.toLocaleString()} watching
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 space-y-3">
            <button className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              <Video className="w-4 h-4 inline-block mr-2" />
              Start New Stream
            </button>
            <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Calendar className="w-4 h-4 inline-block mr-2" />
              Schedule Event
            </button>
            <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <Camera className="w-4 h-4 inline-block mr-2" />
              Upload Recording
            </button>
          </div>

          {/* Live Chat Preview */}
          <div className="mt-6">
            <h4 className="text-sm font-semibold text-white mb-3">Live Chat</h4>
            <div className="bg-black/40 rounded-lg p-3 h-32 overflow-y-auto">
              <div className="space-y-2 text-xs">
                <div className="text-blue-400">Coach_Mike: Great play!</div>
                <div className="text-green-400">Parent_Sarah: Go Marcus! 🏆</div>
                <div className="text-purple-400">Fan_123: TOUCHDOWN!!!</div>
                <div className="text-yellow-400">Alumni_2019: Best game ever!</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}