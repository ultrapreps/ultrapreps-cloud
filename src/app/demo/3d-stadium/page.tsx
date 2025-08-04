'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Maximize, Minimize, RotateCcw, ZoomIn, ZoomOut, Move3D,
  VolumeX, Volume2, Eye, Users, Trophy, Camera, Share,
  ArrowRight, Crown, Star, Flame, Target, Heart, Settings,
  Play, Pause, SkipForward, Rewind, FastForward, 
  Headphones, Smartphone, Monitor, Gamepad2, MousePointer
} from 'lucide-react';
import Link from 'next/link';

export default function Stadium3DDemo() {
  const [viewMode, setViewMode] = useState('stadium');
  const [cameraAngle, setCameraAngle] = useState('aerial');
  const [isVRMode, setIsVRMode] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [crowdLevel, setCrowdLevel] = useState(85);
  const [timeOfDay, setTimeOfDay] = useState('night');
  const [weatherEffect, setWeatherEffect] = useState('clear');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [gameMode, setGameMode] = useState('replay');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const stadiumRef = useRef(null);

  const stadiumViews = [
    { id: 'stadium', name: 'Full Stadium', description: 'Complete 360° stadium experience' },
    { id: 'field', name: 'Field Level', description: 'Ground-level player perspective' },
    { id: 'stands', name: 'Fan Experience', description: 'Crowd perspective from stands' },
    { id: 'skybox', name: 'VIP Skybox', description: 'Premium viewing experience' },
    { id: 'broadcast', name: 'Broadcast View', description: 'TV camera angles' }
  ];

  const cameraAngles = [
    { id: 'aerial', name: 'Aerial View', icon: '🚁' },
    { id: 'sideline', name: 'Sideline Cam', icon: '📹' },
    { id: 'endzone', name: 'End Zone', icon: '🏈' },
    { id: 'player', name: 'Player POV', icon: '👁️' },
    { id: 'crowd', name: 'Crowd Cam', icon: '👥' }
  ];

  const vrFeatures = [
    { name: 'Immersive Audio', description: '360° spatial audio with crowd noise' },
    { name: 'Hand Tracking', description: 'Natural gesture controls' },
    { name: 'Haptic Feedback', description: 'Feel the crowd and game intensity' },
    { name: 'Social VR', description: 'Watch with friends in virtual space' }
  ];

  const interactiveElements = [
    { name: 'Player Stats Overlay', active: true },
    { name: 'Play Prediction AI', active: true },
    { name: 'Crowd Reaction Meter', active: true },
    { name: 'Weather Effects', active: false },
    { name: 'Historical Moments', active: true },
    { name: 'Social Chat', active: false }
  ];

  const liveStats = {
    attendance: 47892,
    virtualViewers: 12847,
    socialEngagement: 94.2,
    audioQuality: 'HD Dolby',
    latency: '0.2ms',
    resolution: '8K 360°'
  };

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        // Simulate dynamic crowd reaction
        setCrowdLevel(prev => Math.max(20, Math.min(100, prev + (Math.random() - 0.5) * 20)));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Move3D className="w-16 h-16 mx-auto mb-4 text-blue-300" />
            <h1 className="text-5xl font-black text-white mb-4">
              IMMERSIVE 3D VIRTUAL STADIUM
            </h1>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Experience games like never before with cutting-edge 3D technology, VR support, 
              and interactive features that put you in the center of the action.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Live Experience Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="font-bold">LIVE 3D STADIUM EXPERIENCE</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsVRMode(!isVRMode)}
                className={`px-4 py-2 rounded-lg font-bold ${isVRMode ? 'bg-purple-500' : 'bg-gray-600'}`}
              >
                VR Mode
              </button>
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`p-2 rounded-full ${audioEnabled ? 'bg-green-500' : 'bg-gray-600'}`}
              >
                {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-2xl font-black text-blue-400">{liveStats.attendance.toLocaleString()}</div>
              <div className="text-xs text-white/70">Stadium Attendance</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-purple-400">{liveStats.virtualViewers.toLocaleString()}</div>
              <div className="text-xs text-white/70">Virtual Viewers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-green-400">{liveStats.socialEngagement}%</div>
              <div className="text-xs text-white/70">Engagement</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-yellow-400">{liveStats.resolution}</div>
              <div className="text-xs text-white/70">Resolution</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-orange-400">{liveStats.latency}</div>
              <div className="text-xs text-white/70">Latency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black text-red-400">{Math.round(crowdLevel)}%</div>
              <div className="text-xs text-white/70">Crowd Energy</div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* 3D Stadium Viewport */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Main 3D View */}
            <div className="relative bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-2xl overflow-hidden border-2 border-blue-500/30">
              
              {/* 3D Stadium Simulation */}
              <div 
                ref={stadiumRef}
                className="relative w-full aspect-video bg-gradient-to-b from-blue-900 to-green-800 flex items-center justify-center"
              >
                {/* Stadium Background */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-green-800/80" />
                
                {/* Field */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-3/5 bg-green-600 rounded-t-3xl opacity-80">
                  {/* Field lines */}
                  <div className="absolute inset-0">
                    {[...Array(11)].map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute w-full h-px bg-white/30"
                        style={{ top: `${i * 10}%` }}
                      />
                    ))}
                  </div>
                  
                  {/* Players (animated dots) */}
                  {[...Array(22)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-2 h-2 rounded-full ${
                        i < 11 ? 'bg-blue-400' : 'bg-red-400'
                      }`}
                      style={{
                        left: `${10 + (i % 11) * 7}%`,
                        top: `${20 + Math.floor(i / 11) * 60}%`
                      }}
                      animate={{
                        x: [0, Math.random() * 20 - 10, 0],
                        y: [0, Math.random() * 10 - 5, 0]
                      }}
                      transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                {/* Stadium Structure */}
                <div className="absolute inset-0">
                  {/* Stands */}
                  <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-700 to-gray-600 opacity-60" />
                  <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-gray-700 to-gray-600 opacity-60" />
                  
                  {/* Stadium Lights */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-yellow-300 rounded-full animate-pulse"
                      style={{
                        left: `${10 + i * 10}%`,
                        top: `${5 + (i % 2) * 5}%`
                      }}
                    />
                  ))}
                </div>

                {/* Weather Effects */}
                {weatherEffect === 'rain' && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(50)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-px h-4 bg-blue-200 opacity-60"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`
                        }}
                        animate={{
                          y: [0, 100],
                          opacity: [0.6, 0]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: Math.random()
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Crowd Energy Visualization */}
                <div className="absolute top-4 left-4 right-4">
                  <div className="flex items-center gap-2 bg-black/50 rounded-lg p-2">
                    <Heart className="w-4 h-4 text-red-400" />
                    <div className="flex-1">
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-red-500 to-yellow-500 h-2 rounded-full"
                          animate={{ width: `${crowdLevel}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                    <span className="text-sm font-bold">{Math.round(crowdLevel)}%</span>
                  </div>
                </div>

                {/* Current View Indicator */}
                <div className="absolute bottom-4 left-4 bg-black/70 rounded-lg p-3">
                  <div className="text-sm font-bold">{stadiumViews.find(v => v.id === viewMode)?.name}</div>
                  <div className="text-xs text-white/70">{cameraAngles.find(a => a.id === cameraAngle)?.name}</div>
                </div>

                {/* VR Mode Overlay */}
                {isVRMode && (
                  <div className="absolute inset-0 bg-purple-500/20 border-4 border-purple-400 rounded-lg">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <Headphones className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                      <div className="text-2xl font-black text-purple-300">VR MODE ACTIVE</div>
                      <div className="text-sm text-white/70">Immersive 360° Experience</div>
                    </div>
                  </div>
                )}
              </div>

              {/* 3D Controls Overlay */}
              <div className="absolute top-4 right-4 space-y-2">
                <button className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                  <Maximize className="w-4 h-4" />
                </button>
              </div>

              {/* Playback Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-3 bg-black/70 rounded-lg p-3">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                  <Rewind className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                  <FastForward className="w-4 h-4" />
                </button>
                <div className="text-sm font-bold">{playbackSpeed}x</div>
              </div>
            </div>

            {/* View Mode Selection */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {stadiumViews.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setViewMode(view.id)}
                  className={`p-4 rounded-xl text-left transition-all ${
                    viewMode === view.id
                      ? 'bg-blue-500 border-2 border-blue-400'
                      : 'bg-white/5 border-2 border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="font-bold text-sm">{view.name}</div>
                  <div className="text-xs text-white/70 mt-1">{view.description}</div>
                </button>
              ))}
            </div>

            {/* Camera Angles */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Camera Angles</h3>
              <div className="grid grid-cols-5 gap-3">
                {cameraAngles.map((angle) => (
                  <button
                    key={angle.id}
                    onClick={() => setCameraAngle(angle.id)}
                    className={`p-4 rounded-lg text-center transition-all ${
                      cameraAngle === angle.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    <div className="text-2xl mb-2">{angle.icon}</div>
                    <div className="text-xs font-bold">{angle.name}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Controls & Settings */}
          <div className="space-y-6">
            
            {/* Environment Controls */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-400" />
                Environment
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Time of Day</label>
                  <select 
                    value={timeOfDay}
                    onChange={(e) => setTimeOfDay(e.target.value)}
                    className="w-full p-2 rounded bg-white/10 border border-white/20"
                  >
                    <option value="day">Daytime</option>
                    <option value="sunset">Sunset</option>
                    <option value="night">Night Game</option>
                    <option value="dawn">Dawn</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Weather</label>
                  <select 
                    value={weatherEffect}
                    onChange={(e) => setWeatherEffect(e.target.value)}
                    className="w-full p-2 rounded bg-white/10 border border-white/20"
                  >
                    <option value="clear">Clear</option>
                    <option value="rain">Rain</option>
                    <option value="snow">Snow</option>
                    <option value="fog">Fog</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Crowd Level: {Math.round(crowdLevel)}%</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={crowdLevel}
                    onChange={(e) => setCrowdLevel(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* VR Features */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Headphones className="w-5 h-5 text-purple-400" />
                VR Features
              </h3>
              
              <div className="space-y-3">
                {vrFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <Crown className="w-4 h-4 text-purple-400 mt-0.5" />
                    <div>
                      <div className="font-bold text-sm">{feature.name}</div>
                      <div className="text-xs text-white/70">{feature.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-4 py-3 bg-purple-500 rounded-lg font-bold hover:bg-purple-600 transition-colors">
                Enter VR Mode
              </button>
            </div>

            {/* Interactive Elements */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Interactive Elements</h3>
              
              <div className="space-y-2">
                {interactiveElements.map((element, index) => (
                  <label key={index} className="flex items-center gap-3 p-2 hover:bg-white/5 rounded transition-colors">
                    <input 
                      type="checkbox" 
                      defaultChecked={element.active}
                      className="rounded"
                    />
                    <span className="text-sm">{element.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Device Compatibility */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Device Support</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-green-500/20 rounded-lg">
                  <Smartphone className="w-6 h-6 mx-auto mb-2 text-green-400" />
                  <div className="text-xs font-bold">Mobile VR</div>
                </div>
                <div className="text-center p-3 bg-blue-500/20 rounded-lg">
                  <Monitor className="w-6 h-6 mx-auto mb-2 text-blue-400" />
                  <div className="text-xs font-bold">Desktop</div>
                </div>
                <div className="text-center p-3 bg-purple-500/20 rounded-lg">
                  <Headphones className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                  <div className="text-xs font-bold">VR Headset</div>
                </div>
                <div className="text-center p-3 bg-yellow-500/20 rounded-lg">
                  <Gamepad2 className="w-6 h-6 mx-auto mb-2 text-yellow-400" />
                  <div className="text-xs font-bold">Controller</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-green-500/20 rounded-lg text-center hover:bg-green-500/30 transition-colors">
                  <Camera className="w-5 h-5 mx-auto mb-2 text-green-400" />
                  <div className="text-xs font-bold">Screenshot</div>
                </button>
                <button className="p-3 bg-blue-500/20 rounded-lg text-center hover:bg-blue-500/30 transition-colors">
                  <Share className="w-5 h-5 mx-auto mb-2 text-blue-400" />
                  <div className="text-xs font-bold">Share View</div>
                </button>
                <button className="p-3 bg-purple-500/20 rounded-lg text-center hover:bg-purple-500/30 transition-colors">
                  <Trophy className="w-5 h-5 mx-auto mb-2 text-purple-400" />
                  <div className="text-xs font-bold">Highlights</div>
                </button>
                <button className="p-3 bg-yellow-500/20 rounded-lg text-center hover:bg-yellow-500/30 transition-colors">
                  <Users className="w-5 h-5 mx-auto mb-2 text-yellow-400" />
                  <div className="text-xs font-bold">Invite Friends</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-black mb-8">Next-Generation Stadium Experience</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 p-8 rounded-xl">
              <Move3D className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Immersive 3D Technology</h3>
              <p className="text-white/70">Experience games from every angle with photorealistic 3D rendering and real-time stadium simulation.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Headphones className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">VR & AR Integration</h3>
              <p className="text-white/70">Full virtual reality support with haptic feedback and social viewing experiences.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Social Features</h3>
              <p className="text-white/70">Watch games with friends, share moments, and experience the crowd energy together.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/stadium/create"
            className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-blue-500/30"
          >
            <Move3D className="w-7 h-7" />
            Enter Your 3D Stadium
            <ArrowRight className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </div>
  );
}