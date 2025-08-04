'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, Users, MessageCircle, Heart, Share, Eye, Mic, MicOff,
  Camera, CameraOff, Settings, Crown, Star, Trophy, Flame,
  ArrowRight, Play, Pause, Volume2, VolumeX, Maximize,
  Phone, UserPlus, Gift, Zap, Target, Award, Clock,
  ThumbsUp, Send, Smile, MoreHorizontal, Bell, Shield
} from 'lucide-react';
import Link from 'next/link';

export default function LiveStreamDemo() {
  const [isStreaming, setIsStreaming] = useState(false);
  const [viewerCount, setViewerCount] = useState(1247);
  const [chatMessage, setChatMessage] = useState('');
  const [streamQuality, setStreamQuality] = useState('4K');
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Coach_Mike', message: 'Great play! 🏈', timestamp: '2:34', verified: true },
    { id: 2, user: 'ProudParent', message: 'Go Eagles! That\'s my kid!', timestamp: '2:35', verified: false },
    { id: 3, user: 'ScoutWatcher', message: 'Impressive speed on that run', timestamp: '2:36', verified: true },
    { id: 4, user: 'TeamSpirit', message: 'TOUCHDOWN! 🔥', timestamp: '2:37', verified: false }
  ]);
  const [liveReactions, setLiveReactions] = useState({
    hearts: 342,
    fire: 189,
    thumbsUp: 267,
    crown: 94
  });

  // Simulate real-time data
  useEffect(() => {
    const interval = setInterval(() => {
      if (isStreaming) {
        setViewerCount(prev => prev + Math.floor(Math.random() * 10) - 5);
        
        // Add random chat message
        if (Math.random() < 0.3) {
          const randomMessages = [
            'Amazing play call!',
            'Defense looking strong 💪',
            'This team is going places',
            'Coach knows what he\'s doing',
            'Future college stars right here',
            'What a game! 🏆'
          ];
          const newMessage = {
            id: Date.now(),
            user: `Fan${Math.floor(Math.random() * 1000)}`,
            message: randomMessages[Math.floor(Math.random() * randomMessages.length)],
            timestamp: new Date().toLocaleTimeString().slice(0, 5),
            verified: Math.random() < 0.3
          };
          setChatMessages(prev => [...prev.slice(-10), newMessage]);
        }

        // Update live reactions
        setLiveReactions(prev => ({
          hearts: prev.hearts + Math.floor(Math.random() * 5),
          fire: prev.fire + Math.floor(Math.random() * 3),
          thumbsUp: prev.thumbsUp + Math.floor(Math.random() * 4),
          crown: prev.crown + Math.floor(Math.random() * 2)
        }));
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isStreaming]);

  const streamFeatures = [
    { name: 'Multi-Camera Views', description: '4 simultaneous camera angles', icon: Camera },
    { name: 'Real-time Analytics', description: 'Live stats and performance data', icon: Target },
    { name: 'Interactive Chat', description: 'Engage with viewers and families', icon: MessageCircle },
    { name: 'Screen Recording', description: 'Automatic highlight capture', icon: Video },
    { name: 'Family Notifications', description: 'Alert loved ones when streaming', icon: Bell },
    { name: 'Privacy Controls', description: 'Family-safe streaming environment', icon: Shield }
  ];

  const collaborativeTools = [
    { name: 'Co-streaming', users: 3, description: 'Stream with teammates' },
    { name: 'Coach Commentary', users: 1, description: 'Live coaching insights' },
    { name: 'Parent View', users: 12, description: 'Family watching together' },
    { name: 'Scout Room', users: 7, description: 'College recruiters viewing' }
  ];

  const streamSettings = {
    resolution: '4K Ultra HD',
    fps: '60 FPS',
    bitrate: '15,000 kbps',
    latency: 'Ultra Low (0.5s)',
    platform: 'Multi-platform',
    encryption: 'End-to-end'
  };

  const sendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: Date.now(),
        user: 'You',
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString().slice(0, 5),
        verified: false
      };
      setChatMessages(prev => [...prev, newMessage]);
      setChatMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-900 to-pink-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Video className="w-16 h-16 mx-auto mb-4 text-red-300" />
            <h1 className="text-5xl font-black text-white mb-4">
              LIVE STREAMING & COLLABORATION HUB
            </h1>
            <p className="text-xl text-red-200 max-w-3xl mx-auto">
              Stream games, practices, and achievements in real-time with advanced collaboration tools, 
              family-safe environments, and professional broadcasting quality.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Live Stream Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-900/30 to-pink-900/30 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full animate-pulse ${isStreaming ? 'bg-red-500' : 'bg-gray-500'}`} />
              <span className="font-bold">
                {isStreaming ? 'LIVE STREAM ACTIVE' : 'STREAM OFFLINE'}
              </span>
              {isStreaming && (
                <div className="px-3 py-1 bg-red-500 rounded-full text-sm font-bold">
                  LIVE
                </div>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMicEnabled(!micEnabled)}
                className={`p-2 rounded-full ${micEnabled ? 'bg-green-500' : 'bg-red-500'}`}
              >
                {micEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setCameraEnabled(!cameraEnabled)}
                className={`p-2 rounded-full ${cameraEnabled ? 'bg-green-500' : 'bg-red-500'}`}
              >
                {cameraEnabled ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsStreaming(!isStreaming)}
                className={`px-6 py-2 rounded-lg font-bold ${
                  isStreaming ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {isStreaming ? 'End Stream' : 'Go Live'}
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-3xl font-black text-red-400">{viewerCount.toLocaleString()}</div>
              <div className="text-xs text-white/70">Live Viewers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-pink-400">{streamSettings.resolution}</div>
              <div className="text-xs text-white/70">Resolution</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-purple-400">{streamSettings.fps}</div>
              <div className="text-xs text-white/70">Frame Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-blue-400">{streamSettings.latency}</div>
              <div className="text-xs text-white/70">Latency</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-400">{chatMessages.length}</div>
              <div className="text-xs text-white/70">Chat Messages</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-yellow-400">
                {Object.values(liveReactions).reduce((a, b) => a + b, 0)}
              </div>
              <div className="text-xs text-white/70">Reactions</div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Main Stream View */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Video Stream */}
            <div className="relative bg-gradient-to-br from-red-900/20 to-pink-900/20 rounded-2xl overflow-hidden border-2 border-red-500/30">
              <div className="relative w-full aspect-video bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                
                {/* Stream Content Simulation */}
                <div className="absolute inset-0">
                  {/* Football Field Background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-green-800 to-green-600 opacity-60" />
                  
                  {/* Field Lines */}
                  <div className="absolute inset-0">
                    {[...Array(6)].map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute w-full h-px bg-white/30"
                        style={{ top: `${20 + i * 15}%` }}
                      />
                    ))}
                  </div>

                  {/* Animated Players */}
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 bg-white rounded-full"
                      style={{
                        left: `${20 + i * 8}%`,
                        top: `${40 + (i % 2) * 20}%`
                      }}
                      animate={{
                        x: [0, Math.random() * 40 - 20, 0],
                        y: [0, Math.random() * 20 - 10, 0]
                      }}
                      transition={{
                        duration: 4 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                {/* Live Stream Overlays */}
                <div className="absolute top-4 left-4 flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-red-500 rounded-full px-3 py-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-sm font-bold">LIVE</span>
                  </div>
                  <div className="bg-black/70 rounded-lg px-3 py-1">
                    <span className="text-sm font-bold">{viewerCount.toLocaleString()} watching</span>
                  </div>
                </div>

                {/* Live Reactions Overlay */}
                <div className="absolute top-4 right-4 space-y-2">
                  {isStreaming && (
                    <>
                      <motion.div
                        key={liveReactions.hearts}
                        initial={{ opacity: 1, y: 0, scale: 1 }}
                        animate={{ opacity: 0, y: -50, scale: 0.5 }}
                        transition={{ duration: 2 }}
                        className="text-2xl"
                      >
                        ❤️
                      </motion.div>
                      <motion.div
                        key={liveReactions.fire}
                        initial={{ opacity: 1, y: 0, scale: 1 }}
                        animate={{ opacity: 0, y: -50, scale: 0.5 }}
                        transition={{ duration: 2, delay: 0.5 }}
                        className="text-2xl"
                      >
                        🔥
                      </motion.div>
                    </>
                  )}
                </div>

                {/* Stream Quality Indicator */}
                <div className="absolute bottom-4 left-4 bg-black/70 rounded-lg p-2">
                  <div className="text-sm font-bold">{streamSettings.resolution} • {streamSettings.fps}</div>
                  <div className="text-xs text-green-400">Quality: Excellent</div>
                </div>

                {/* Collaboration Indicators */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  {collaborativeTools.map((tool, index) => (
                    <div key={index} className="bg-black/70 rounded-lg p-2 text-xs">
                      <div className="font-bold">{tool.name}</div>
                      <div className="text-white/70">{tool.users} active</div>
                    </div>
                  ))}
                </div>

                {!isStreaming && (
                  <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                    <div className="text-center">
                      <Video className="w-16 h-16 mx-auto mb-4 text-white/50" />
                      <div className="text-2xl font-black text-white/70">Stream Offline</div>
                      <div className="text-sm text-white/50">Click "Go Live" to start streaming</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Stream Controls */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <div className="text-sm font-bold">Liberty Eagles vs Roosevelt Wolves</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                      <Share className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Multi-Camera Views */}
            <div className="grid grid-cols-4 gap-4">
              {['Sideline Cam', 'End Zone', 'Coach View', 'Crowd Cam'].map((cam, index) => (
                <div key={index} className="relative aspect-video bg-gray-800 rounded-lg overflow-hidden border border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white/50" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
                    <div className="text-xs font-bold">{cam}</div>
                  </div>
                  {index === 0 && (
                    <div className="absolute top-2 left-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  )}
                </div>
              ))}
            </div>

            {/* Collaboration Tools */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" />
                Active Collaborations
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {collaborativeTools.map((tool, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold">{tool.name}</div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-bold">{tool.users}</span>
                      </div>
                    </div>
                    <div className="text-sm text-white/70 mb-3">{tool.description}</div>
                    <button className="w-full py-2 bg-blue-500/20 rounded-lg text-sm font-bold hover:bg-blue-500/30 transition-colors">
                      Join Session
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat & Engagement Panel */}
          <div className="space-y-6">
            
            {/* Live Chat */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-green-400" />
                Live Chat
              </h3>
              
              <div className="space-y-3 h-64 overflow-y-auto mb-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                      {msg.user[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{msg.user}</span>
                        {msg.verified && <Crown className="w-3 h-3 text-yellow-400" />}
                        <span className="text-xs text-white/50">{msg.timestamp}</span>
                      </div>
                      <div className="text-sm text-white/90">{msg.message}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 p-2 bg-white/10 border border-white/20 rounded-lg text-sm"
                />
                <button
                  onClick={sendMessage}
                  className="p-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Live Reactions */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Live Reactions</h3>
              
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button className="flex items-center justify-center gap-2 p-3 bg-red-500/20 rounded-lg hover:bg-red-500/30 transition-colors">
                  <Heart className="w-5 h-5 text-red-400" />
                  <span className="font-bold">{liveReactions.hearts}</span>
                </button>
                <button className="flex items-center justify-center gap-2 p-3 bg-orange-500/20 rounded-lg hover:bg-orange-500/30 transition-colors">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <span className="font-bold">{liveReactions.fire}</span>
                </button>
                <button className="flex items-center justify-center gap-2 p-3 bg-blue-500/20 rounded-lg hover:bg-blue-500/30 transition-colors">
                  <ThumbsUp className="w-5 h-5 text-blue-400" />
                  <span className="font-bold">{liveReactions.thumbsUp}</span>
                </button>
                <button className="flex items-center justify-center gap-2 p-3 bg-yellow-500/20 rounded-lg hover:bg-yellow-500/30 transition-colors">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  <span className="font-bold">{liveReactions.crown}</span>
                </button>
              </div>
            </div>

            {/* Stream Features */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Stream Features</h3>
              
              <div className="space-y-3">
                {streamFeatures.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                      <FeatureIcon className="w-4 h-4 text-blue-400 mt-0.5" />
                      <div>
                        <div className="font-bold text-sm">{feature.name}</div>
                        <div className="text-xs text-white/70">{feature.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Stream Settings */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-400" />
                Stream Quality
              </h3>
              
              <div className="space-y-3">
                {Object.entries(streamSettings).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-sm capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="text-sm font-bold text-green-400">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-green-500/20 rounded-lg text-center hover:bg-green-500/30 transition-colors">
                  <UserPlus className="w-5 h-5 mx-auto mb-2 text-green-400" />
                  <div className="text-xs font-bold">Invite</div>
                </button>
                <button className="p-3 bg-blue-500/20 rounded-lg text-center hover:bg-blue-500/30 transition-colors">
                  <Share className="w-5 h-5 mx-auto mb-2 text-blue-400" />
                  <div className="text-xs font-bold">Share</div>
                </button>
                <button className="p-3 bg-purple-500/20 rounded-lg text-center hover:bg-purple-500/30 transition-colors">
                  <Gift className="w-5 h-5 mx-auto mb-2 text-purple-400" />
                  <div className="text-xs font-bold">Gifts</div>
                </button>
                <button className="p-3 bg-yellow-500/20 rounded-lg text-center hover:bg-yellow-500/30 transition-colors">
                  <Trophy className="w-5 h-5 mx-auto mb-2 text-yellow-400" />
                  <div className="text-xs font-bold">Highlights</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-black mb-8">Professional Live Streaming Platform</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 p-8 rounded-xl">
              <Video className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Broadcast Quality</h3>
              <p className="text-white/70">4K streaming with ultra-low latency and professional broadcasting features for every game and practice.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Collaborative Viewing</h3>
              <p className="text-white/70">Multi-user streaming with real-time chat, reactions, and family-safe engagement tools.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Family Safe</h3>
              <p className="text-white/70">Advanced privacy controls and content moderation ensure a safe environment for student-athletes.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-red-600 to-pink-600 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-red-500/30"
          >
            <Video className="w-7 h-7" />
            Start Live Streaming
            <ArrowRight className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </div>
  );
}