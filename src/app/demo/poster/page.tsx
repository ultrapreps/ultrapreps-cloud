'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Sparkles, Zap, Crown, Trophy, Target, Calendar,
  ArrowRight, Download, Share, Play, Star, Flame, Users,
  Award, MapPin, Clock, Eye, TrendingUp, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function PosterDemo() {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const posterTemplates = [
    {
      id: 'gameday',
      name: 'Game Day Hype',
      description: 'High-energy posters for upcoming games',
      style: 'Dynamic action shots with bold typography',
      bestFor: 'Home games, rivalry matches, championship games'
    },
    {
      id: 'achievement',
      name: 'Victory Celebration',
      description: 'Celebrate wins and achievements',
      style: 'Triumphant designs with golden accents',
      bestFor: 'Championships, records, major victories'
    },
    {
      id: 'recruiting',
      name: 'Player Spotlight',
      description: 'Professional player showcases',
      style: 'Clean, modern layouts highlighting individual talent',
      bestFor: 'Senior nights, recruiting, player features'
    },
    {
      id: 'season',
      name: 'Season Kickoff',
      description: 'Season announcements and schedules',
      style: 'Comprehensive layouts with schedule integration',
      bestFor: 'Season launches, schedule releases, team presentations'
    }
  ];

  const demoEvents = [
    {
      type: 'Championship Game',
      teams: { home: 'Liberty Eagles', away: 'Roosevelt Wolves' },
      date: 'Friday, November 15, 2024',
      time: '7:00 PM',
      venue: 'Eagle Stadium',
      stakes: 'State Championship Final',
      colors: { home: '#1E3A8A', away: '#1F2937' },
      season: 'Undefeated Season'
    },
    {
      type: 'Victory Celebration',
      achievement: 'Regional Champions',
      player: 'Marcus Johnson',
      stats: '347 yards, 4 TDs',
      date: 'October 28, 2024',
      venue: 'Liberty High',
      celebration: 'Back-to-Back Championships',
      colors: { primary: '#F59E0B', secondary: '#1E3A8A' }
    },
    {
      type: 'Player Spotlight',
      player: 'Sarah Martinez',
      position: 'Point Guard',
      achievements: ['All-State First Team', 'School Record Holder', '4.0 GPA'],
      stats: { points: '18.5 PPG', assists: '7.2 APG', steals: '3.1 SPG' },
      college: 'Stanford University',
      colors: { primary: '#7C2D12', secondary: '#DC2626' }
    },
    {
      type: 'Season Launch',
      season: '2024-25 Basketball',
      coach: 'Coach Thompson',
      returning: 8,
      newcomers: 4,
      schedule: '24 Games',
      goal: 'State Championship',
      colors: { primary: '#4B0082', secondary: '#FFD700' }
    }
  ];

  const currentEvent = demoEvents[selectedEvent];
  const currentTemplate = posterTemplates[selectedTemplate];

  const generatePoster = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 5000));
    setIsGenerating(false);
  };

  const getPosterBackground = () => {
    if (selectedTemplate === 0) return 'from-blue-900 to-red-900'; // Game Day
    if (selectedTemplate === 1) return 'from-yellow-600 to-orange-600'; // Victory
    if (selectedTemplate === 2) return 'from-purple-900 to-blue-900'; // Player
    return 'from-green-900 to-blue-900'; // Season
  };

  const getPosterContent = () => {
    switch (selectedTemplate) {
      case 0: // Game Day
        return (
          <div className="h-full flex flex-col justify-between p-8">
            <div className="text-center">
              <div className="text-sm font-bold mb-2">{currentEvent.stakes}</div>
              <div className="text-3xl font-black mb-4">GAME DAY</div>
            </div>
            
            <div className="text-center flex-1 flex items-center justify-center">
              <div>
                <div className="text-2xl font-bold mb-2">{currentEvent.teams?.home}</div>
                <div className="text-6xl font-black my-4">VS</div>
                <div className="text-2xl font-bold">{currentEvent.teams?.away}</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-bold">{currentEvent.date}</div>
              <div className="text-sm">{currentEvent.time} • {currentEvent.venue}</div>
            </div>
          </div>
        );
      
      case 1: // Victory
        return (
          <div className="h-full flex flex-col justify-between p-8">
            <div className="text-center">
              <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-300" />
              <div className="text-3xl font-black">{currentEvent.achievement}</div>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">{currentEvent.player}</div>
              <div className="text-lg mb-4">{currentEvent.stats}</div>
              <div className="text-xl font-bold">{currentEvent.celebration}</div>
            </div>
            
            <div className="text-center">
              <div className="text-sm">{currentEvent.date}</div>
            </div>
          </div>
        );
      
      case 2: // Player Spotlight
        return (
          <div className="h-full flex flex-col justify-between p-8">
            <div className="text-center">
              <div className="text-sm font-bold mb-2">PLAYER SPOTLIGHT</div>
              <div className="text-3xl font-black">{currentEvent.player}</div>
              <div className="text-lg">{currentEvent.position}</div>
            </div>
            
            <div className="text-center">
              <div className="grid grid-cols-3 gap-2 text-sm mb-4">
                {Object.entries(currentEvent.stats || {}).map(([key, value]) => (
                  <div key={key}>
                    <div className="font-bold">{value}</div>
                    <div className="text-xs opacity-70">{key}</div>
                  </div>
                ))}
              </div>
              <div className="text-sm">
                {currentEvent.achievements?.map((achievement, index) => (
                  <div key={index} className="mb-1">• {achievement}</div>
                ))}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm">Committed to {currentEvent.college}</div>
            </div>
          </div>
        );
      
      default: // Season Launch
        return (
          <div className="h-full flex flex-col justify-between p-8">
            <div className="text-center">
              <div className="text-3xl font-black mb-2">{currentEvent.season}</div>
              <div className="text-sm">Season Launch</div>
            </div>
            
            <div className="text-center">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-bold">{currentEvent.returning}</div>
                  <div className="opacity-70">Returning</div>
                </div>
                <div>
                  <div className="font-bold">{currentEvent.newcomers}</div>
                  <div className="opacity-70">New Players</div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-lg font-bold">{currentEvent.goal}</div>
                <div className="text-sm opacity-70">Season Goal</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm">{currentEvent.coach}</div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-900 to-red-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Camera className="w-16 h-16 mx-auto mb-4 text-orange-300" />
            <h1 className="text-5xl font-black text-white mb-4">
              CHAMPIONSHIP POSTER GENERATOR
            </h1>
            <p className="text-xl text-orange-200 max-w-3xl mx-auto">
              Create professional ESPN-quality sports posters that amplify your team's achievements, 
              boost fan engagement, and showcase athletic excellence.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Template & Event Selection */}
          <div className="space-y-8">
            {/* Template Selection */}
            <div>
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-orange-400" />
                Select Poster Template
              </h2>
              
              <div className="grid gap-4">
                {posterTemplates.map((template, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedTemplate(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      selectedTemplate === index
                        ? 'border-orange-400 bg-orange-500/10'
                        : 'border-white/20 bg-white/5 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold">{template.name}</h3>
                      {selectedTemplate === index && (
                        <Crown className="w-6 h-6 text-orange-400" />
                      )}
                    </div>
                    <p className="text-white/80 mb-2">{template.description}</p>
                    <p className="text-sm text-orange-300 mb-2">{template.style}</p>
                    <p className="text-xs text-white/60">Best for: {template.bestFor}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Event Selection */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-400" />
                Select Event Type
              </h3>
              
              <div className="grid gap-3">
                {demoEvents.map((event, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedEvent(index)}
                    className={`p-4 rounded-lg border transition-all text-left ${
                      selectedEvent === index
                        ? 'border-orange-400 bg-orange-500/20'
                        : 'border-white/20 bg-white/5 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold">{event.type}</div>
                        <div className="text-sm text-white/70">
                          {event.teams ? `${event.teams.home} vs ${event.teams.away}` :
                           event.player ? event.player :
                           event.achievement ? event.achievement :
                           event.season ? event.season : ''}
                        </div>
                      </div>
                      {selectedEvent === index && (
                        <ChevronRight className="w-5 h-5 text-orange-400" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-orange-400" />
                Event Details
              </h3>
              
              <div className="space-y-3">
                {currentEvent.date && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-orange-400" />
                    <span>{currentEvent.date}</span>
                  </div>
                )}
                {currentEvent.venue && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-orange-400" />
                    <span>{currentEvent.venue}</span>
                  </div>
                )}
                {currentEvent.time && (
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-orange-400" />
                    <span>{currentEvent.time}</span>
                  </div>
                )}
                {currentEvent.stakes && (
                  <div className="flex items-center gap-3">
                    <Trophy className="w-4 h-4 text-orange-400" />
                    <span>{currentEvent.stakes}</span>
                  </div>
                )}
              </div>
            </div>

            {/* AI Enhancement Options */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-400" />
                AI Enhancements
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Dynamic Background</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Auto Typography</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Team Colors</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Action Effects</span>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <motion.button
              onClick={generatePoster}
              disabled={isGenerating}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 transition-all ${
                isGenerating
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-orange-600 to-red-600 hover:shadow-2xl hover:shadow-orange-500/30'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                  AI CREATING POSTER...
                </>
              ) : (
                <>
                  <Camera className="w-6 h-6" />
                  GENERATE AI POSTER
                  <Sparkles className="w-6 h-6" />
                </>
              )}
            </motion.button>
          </div>

          {/* Poster Preview */}
          <div className="sticky top-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedTemplate}-${selectedEvent}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative"
              >
                {/* Poster Display */}
                <div className={`relative w-full aspect-[3/4] rounded-3xl overflow-hidden border-4 border-orange-400 bg-gradient-to-br ${getPosterBackground()}`}>
                  
                  {/* Content */}
                  <div className="relative w-full h-full text-white">
                    {getPosterContent()}
                  </div>

                  {/* UltraPreps Branding */}
                  <div className="absolute bottom-4 right-4">
                    <div className="flex items-center gap-2 text-xs bg-black/50 px-2 py-1 rounded">
                      <Crown className="w-3 h-3 text-orange-400" />
                      <span className="text-orange-400 font-bold">ULTRAPREPS</span>
                    </div>
                  </div>

                  {/* Generation Overlay */}
                  {isGenerating && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-400 mx-auto mb-4" />
                        <p className="text-xl font-bold">AI Creating...</p>
                        <p className="text-white/70">Generating championship poster</p>
                      </div>
                    </div>
                  )}

                  {/* Design Elements */}
                  <div className="absolute top-4 left-4">
                    <Sparkles className="w-6 h-6 text-white/20 animate-pulse" />
                  </div>
                  <div className="absolute bottom-16 left-4">
                    <Star className="w-4 h-4 text-white/20 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                  <div className="absolute top-8 right-8">
                    <Flame className="w-5 h-5 text-white/20 animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>
                </div>

                {/* Template Info */}
                <div className="mt-4 p-4 bg-white/5 rounded-xl">
                  <h4 className="font-bold text-orange-400 mb-2">{currentTemplate.name}</h4>
                  <p className="text-sm text-white/70">{currentTemplate.description}</p>
                </div>

                {/* Action Buttons */}
                {!isGenerating && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 grid grid-cols-3 gap-4"
                  >
                    <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                      <Download className="w-4 h-4" />
                      <span className="text-sm font-bold">Download</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                      <Share className="w-4 h-4" />
                      <span className="text-sm font-bold">Share</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 px-4 bg-orange-500/20 hover:bg-orange-500/30 rounded-xl transition-all">
                      <Play className="w-4 h-4" />
                      <span className="text-sm font-bold">Preview</span>
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-black mb-8">Amplify Your Athletic Program</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 p-8 rounded-xl">
              <Camera className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Professional Quality</h3>
              <p className="text-white/70">ESPN-grade poster designs that make your events look like major league productions, boosting attendance and excitement.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Zap className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Instant Creation</h3>
              <p className="text-white/70">Generate stunning promotional materials in minutes, not hours. Perfect for last-minute events and social media campaigns.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <TrendingUp className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Boost Engagement</h3>
              <p className="text-white/70">Eye-catching designs that increase social media engagement by 300% and drive higher attendance at sporting events.</p>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mt-16 bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-2xl p-8">
          <h3 className="text-2xl font-black text-center mb-8">Perfect For Every Occasion</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Trophy className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Championship Games</h4>
              <p className="text-sm text-white/70">High-stakes game promotion and celebration</p>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Senior Nights</h4>
              <p className="text-sm text-white/70">Honor graduating athletes with style</p>
            </div>
            <div className="text-center">
              <Eye className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Recruiting</h4>
              <p className="text-sm text-white/70">Showcase talent to college scouts</p>
            </div>
            <div className="text-center">
              <Star className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Achievements</h4>
              <p className="text-sm text-white/70">Celebrate records and milestones</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/poster/create"
            className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-orange-500/30"
          >
            <Camera className="w-7 h-7" />
            Start Creating Championship Content
            <ArrowRight className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </div>
  );
}