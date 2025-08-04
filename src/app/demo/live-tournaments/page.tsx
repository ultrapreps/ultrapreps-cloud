'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Users, Crown, Zap, Target, Clock, Star, Flame,
  Play, Pause, ArrowRight, TrendingUp, Award, Shield, Heart,
  Video, Camera, Share, Download, Settings, Eye, Volume2,
  Gamepad2, Smartphone, Monitor, MessageCircle, DollarSign,
  Calendar, MapPin, Globe, ThumbsUp, Gift, Medal
} from 'lucide-react';
import Link from 'next/link';

export default function LiveTournamentsDemo() {
  const [selectedTournament, setSelectedTournament] = useState(0);
  const [liveViewers, setLiveViewers] = useState(8247);
  const [activePlayers, setActivePlayers] = useState(1543);
  const [prizePool, setPrizePool] = useState(25000);
  const [tournamentStatus, setTournamentStatus] = useState('live');
  const [userRank, setUserRank] = useState(127);
  const [currentRound, setCurrentRound] = useState('Quarter Finals');
  const [timeRemaining, setTimeRemaining] = useState(2847);

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViewers(prev => prev + Math.floor(Math.random() * 15) - 7);
      setActivePlayers(prev => Math.max(32, prev - Math.floor(Math.random() * 3)));
      setPrizePool(prev => prev + Math.floor(Math.random() * 100));
      setTimeRemaining(prev => Math.max(0, prev - 1));
      
      if (Math.random() < 0.1) {
        setUserRank(prev => Math.max(1, prev - Math.floor(Math.random() * 5)));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const tournaments = [
    {
      id: 1,
      name: "Friday Night Lights Championship",
      sport: "Football",
      type: "Skill Challenge",
      status: "Live",
      participants: 2048,
      prizePool: "$50,000",
      timeLeft: "2h 34m",
      rounds: ["Qualifying", "Round of 16", "Quarter Finals", "Semi Finals", "Championship"],
      currentRound: "Quarter Finals",
      description: "Ultimate football skills tournament featuring QB accuracy, WR routes, and defensive challenges",
      requirements: ["High School Football", "3.0+ GPA", "Verified Stats"],
      format: "Single Elimination",
      duration: "6 hours",
      streaming: true,
      sponsors: ["Nike", "Gatorade", "Under Armour"],
      rewards: {
        first: "$15,000 + College Scouts",
        top8: "$2,500 + Exposure",
        top32: "$500 + Recognition"
      }
    },
    {
      id: 2,
      name: "Elite Basketball Skills Showdown",
      sport: "Basketball",
      type: "1v1 + Skills",
      status: "Starting Soon",
      participants: 1024,
      prizePool: "$30,000",
      timeLeft: "45m",
      rounds: ["Skills Prelim", "1v1 Round 1", "Elite 8", "Final Four", "Championship"],
      currentRound: "Registration",
      description: "Basketball excellence tournament combining skills challenges with competitive 1v1 gameplay",
      requirements: ["Varsity Basketball", "Video Verification", "Coach Approval"],
      format: "Skills + Bracket",
      duration: "4 hours",
      streaming: true,
      sponsors: ["Jordan", "NBA", "Spalding"],
      rewards: {
        first: "$10,000 + Training Camp",
        top4: "$1,500 + Gear Package",
        top16: "$300 + Equipment"
      }
    },
    {
      id: 3,
      name: "Track & Field Lightning League",
      sport: "Track & Field",
      type: "Multi-Event",
      status: "Weekly Series",
      participants: 856,
      prizePool: "$20,000",
      timeLeft: "3d 12h",
      rounds: ["Sprint Events", "Field Events", "Distance", "Relays", "Overall Champion"],
      currentRound: "Event 3 of 5",
      description: "Multi-week track and field competition with events across sprints, jumps, throws, and distance",
      requirements: ["Track Team Member", "Season PR Verification", "Medical Clearance"],
      format: "Points Series",
      duration: "5 weeks",
      streaming: true,
      sponsors: ["Adidas", "USATF", "Garmin"],
      rewards: {
        first: "$8,000 + Training Stipend",
        top5: "$1,000 + Elite Camp",
        top20: "$200 + Recognition"
      }
    }
  ];

  const liveMatches = [
    {
      player1: "Marcus Johnson",
      player2: "Tyler Williams", 
      sport: "Football",
      challenge: "QB Accuracy",
      score1: 847,
      score2: 823,
      viewers: 2341,
      timeLeft: "4:23",
      status: "live"
    },
    {
      player1: "Sarah Chen",
      player2: "Emma Rodriguez",
      sport: "Basketball", 
      challenge: "3-Point Contest",
      score1: 23,
      score2: 19,
      viewers: 1876,
      timeLeft: "2:15",
      status: "live"
    },
    {
      player1: "David Thompson",
      player2: "Alex Rivera",
      sport: "Track",
      challenge: "100m Sprint",
      score1: 10.84,
      score2: 10.91,
      viewers: 1542,
      timeLeft: "Final",
      status: "finished"
    }
  ];

  const leaderboard = [
    { rank: 1, name: "Lightning_Speed47", points: 15840, sport: "Track", wins: 23, streak: 8 },
    { rank: 2, name: "QB_Elite22", points: 14920, sport: "Football", wins: 19, streak: 5 },
    { rank: 3, name: "Hoops_Master", points: 14650, sport: "Basketball", wins: 21, streak: 12 },
    { rank: 4, name: "Field_General", points: 13980, sport: "Football", wins: 17, streak: 3 },
    { rank: 5, name: "Court_Vision", points: 13420, sport: "Basketball", wins: 15, streak: 7 },
    { rank: userRank, name: "You", points: 8450, sport: "Football", wins: 12, streak: 4 }
  ];

  const challenges = [
    {
      name: "QB Accuracy Challenge",
      sport: "Football",
      description: "Hit targets at increasing distances",
      difficulty: "Expert",
      timeLimit: "5 minutes",
      participants: 234,
      topScore: 985,
      reward: "$500"
    },
    {
      name: "3-Point Marathon",
      sport: "Basketball", 
      description: "Consecutive 3-pointers from 5 positions",
      difficulty: "Advanced",
      timeLimit: "3 minutes",
      participants: 189,
      topScore: 47,
      reward: "$300"
    },
    {
      name: "Speed & Agility Course",
      sport: "Track",
      description: "Navigate complex agility course for time",
      difficulty: "Intermediate", 
      timeLimit: "90 seconds",
      participants: 156,
      topScore: 42.8,
      reward: "$200"
    }
  ];

  const tournamentFeatures = [
    {
      name: "Live Streaming",
      description: "Multi-camera professional broadcasting",
      icon: Video,
      status: "Active"
    },
    {
      name: "Real-time Scoring",
      description: "AI-powered performance tracking",
      icon: Target,
      status: "Live"
    },
    {
      name: "Interactive Chat", 
      description: "Engage with competitors and fans",
      icon: MessageCircle,
      status: "Active"
    },
    {
      name: "Prize Distribution",
      description: "Automated secure payouts",
      icon: DollarSign,
      status: "Verified"
    }
  ];

  const currentTournament = tournaments[selectedTournament];

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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
            <Trophy className="w-16 h-16 mx-auto mb-4 text-orange-300" />
            <h1 className="text-5xl font-black text-white mb-4">
              LIVE TOURNAMENT ARENA
            </h1>
            <p className="text-xl text-orange-200 max-w-3xl mx-auto">
              Compete in live tournaments with real prizes, professional streaming, and college scout visibility. 
              Showcase your skills against elite competition from across the nation.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        
        {/* Live Tournament Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="font-bold">LIVE TOURNAMENTS ACTIVE</span>
              <div className="px-3 py-1 bg-red-500 rounded-full text-sm font-bold">
                {activePlayers} COMPETING
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-2xl font-black text-orange-400">${prizePool.toLocaleString()}</div>
                <div className="text-xs text-white/70">Live Prize Pool</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-3xl font-black text-orange-400">{liveViewers.toLocaleString()}</div>
              <div className="text-xs text-white/70">Live Viewers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-red-400">{activePlayers}</div>
              <div className="text-xs text-white/70">Active Players</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-yellow-400">{tournaments.length}</div>
              <div className="text-xs text-white/70">Live Tournaments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-green-400">{currentRound}</div>
              <div className="text-xs text-white/70">Current Round</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-blue-400">#{userRank}</div>
              <div className="text-xs text-white/70">Your Rank</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-purple-400">{formatTime(timeRemaining)}</div>
              <div className="text-xs text-white/70">Time Left</div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          
          {/* Tournament Arena */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Live Tournament Feed */}
            <div className="relative bg-gradient-to-br from-orange-900/20 to-red-900/20 rounded-2xl overflow-hidden border-2 border-orange-500/30">
              <div className="relative w-full aspect-video bg-gradient-to-br from-gray-900 to-orange-900 flex items-center justify-center">
                
                {/* Tournament Arena Simulation */}
                <div className="absolute inset-0">
                  {/* Arena Background */}
                  <div className="absolute inset-0 bg-gradient-to-b from-orange-900/50 to-red-900/80" />
                  
                  {/* Competition Area */}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-3/5 bg-blue-600 rounded-t-3xl opacity-70">
                    {/* Competition Lines */}
                    <div className="absolute inset-0">
                      {[...Array(6)].map((_, i) => (
                        <div 
                          key={i} 
                          className="absolute w-full h-px bg-white/40"
                          style={{ top: `${i * 16.67}%` }}
                        />
                      ))}
                    </div>
                    
                    {/* Competing Athletes */}
                    <motion.div
                      className="absolute top-1/3 left-1/4 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold"
                      animate={{
                        scale: [1, 1.2, 1],
                        y: [0, -10, 0]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      P1
                    </motion.div>

                    <motion.div
                      className="absolute top-1/3 right-1/4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold"
                      animate={{
                        scale: [1, 1.2, 1],
                        y: [0, -8, 0]
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    >
                      P2
                    </motion.div>

                    {/* Tournament Elements */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                        style={{
                          left: `${20 + (i % 4) * 15}%`,
                          top: `${30 + Math.floor(i / 4) * 40}%`
                        }}
                        animate={{
                          scale: [0.8, 1.2, 0.8],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>

                  {/* Live Tournament HUD */}
                  <div className="absolute top-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <div className="bg-black/70 rounded-lg p-3">
                        <div className="text-sm font-bold">{currentTournament.name}</div>
                        <div className="text-xs text-orange-400">{currentTournament.currentRound}</div>
                      </div>
                      <div className="bg-black/70 rounded-lg p-3">
                        <div className="text-sm font-bold text-red-400">🔴 LIVE</div>
                        <div className="text-xs text-white/70">{liveViewers.toLocaleString()} watching</div>
                      </div>
                    </div>
                  </div>

                  {/* Live Scores */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-black/80 rounded-lg p-4 min-w-64">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-black text-red-400">847</div>
                          <div className="text-xs">Marcus J.</div>
                        </div>
                        <div>
                          <div className="text-sm text-yellow-400">VS</div>
                          <div className="text-xs">QB Accuracy</div>
                        </div>
                        <div>
                          <div className="text-lg font-black text-blue-400">823</div>
                          <div className="text-xs">Tyler W.</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Prize Pool Display */}
                  <div className="absolute bottom-4 right-4 bg-black/70 rounded-lg p-3">
                    <div className="text-xs text-white/70">Prize Pool</div>
                    <div className="text-xl font-black text-green-400">${prizePool.toLocaleString()}</div>
                  </div>
                </div>

                {/* Stream Controls */}
                <div className="absolute top-4 right-4 space-y-2">
                  <button className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors">
                    <Share className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Tournaments */}
            <div className="space-y-4">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <Trophy className="w-6 h-6 text-orange-400" />
                Live Tournaments
              </h2>
              
              {tournaments.map((tournament, index) => (
                <motion.div
                  key={tournament.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedTournament(index)}
                  className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedTournament === index
                      ? 'border-orange-400 bg-orange-500/10'
                      : 'border-white/20 bg-white/5 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{tournament.name}</h3>
                        <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                          tournament.status === 'Live' ? 'bg-red-500/20 text-red-400 animate-pulse' :
                          tournament.status === 'Starting Soon' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {tournament.status}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/70 mb-2">
                        <span>{tournament.sport}</span>
                        <span>•</span>
                        <span>{tournament.type}</span>
                        <span>•</span>
                        <span>{tournament.format}</span>
                      </div>
                      <div className="text-orange-400 text-sm font-bold">{tournament.currentRound} • {tournament.timeLeft} remaining</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-green-400">{tournament.prizePool}</div>
                      <div className="text-xs text-white/70">{tournament.participants} players</div>
                    </div>
                  </div>
                  
                  <p className="text-white/80 mb-4">{tournament.description}</p>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <h4 className="font-bold mb-2">Requirements:</h4>
                      <div className="space-y-1">
                        {tournament.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <Shield className="w-3 h-3 text-blue-400" />
                            <span className="text-white/70">{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Sponsors:</h4>
                      <div className="flex flex-wrap gap-2">
                        {tournament.sponsors.map((sponsor, idx) => (
                          <span key={idx} className="px-2 py-1 bg-purple-500/20 rounded text-xs text-purple-300">
                            {sponsor}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Top Rewards:</h4>
                      <div className="space-y-1 text-sm">
                        <div className="text-yellow-400">🥇 {tournament.rewards.first}</div>
                        <div className="text-gray-300">🥈 {tournament.rewards.top8}</div>
                        <div className="text-orange-400">🥉 {tournament.rewards.top32}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2">
                      {tournament.streaming && (
                        <span className="flex items-center gap-1 text-xs text-red-400">
                          <Video className="w-3 h-3" />
                          Live Stream
                        </span>
                      )}
                    </div>
                    <button className="px-6 py-2 bg-orange-500 rounded-lg font-bold hover:bg-orange-600 transition-colors">
                      {tournament.status === 'Live' ? 'Watch Live' : 'Join Tournament'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Live Matches */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Play className="w-5 h-5 text-red-400" />
                Live Matches
              </h3>
              
              <div className="space-y-4">
                {liveMatches.map((match, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/20">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${match.status === 'live' ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
                        <span className="font-bold">{match.challenge}</span>
                        <span className="text-sm text-white/70">• {match.sport}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Eye className="w-4 h-4 text-blue-400" />
                        <span>{match.viewers.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="font-bold">{match.player1}</div>
                        <div className="text-2xl font-black text-blue-400">{match.score1}</div>
                      </div>
                      <div>
                        <div className="text-yellow-400 font-bold">VS</div>
                        <div className="text-sm text-white/70">{match.timeLeft}</div>
                      </div>
                      <div>
                        <div className="font-bold">{match.player2}</div>
                        <div className="text-2xl font-black text-red-400">{match.score2}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leaderboard & Features */}
          <div className="space-y-6">
            
            {/* Live Leaderboard */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                Live Leaderboard
              </h3>
              
              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <div 
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      player.name === 'You' ? 'bg-orange-500/20 border border-orange-500/40' : 'bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        player.rank === 1 ? 'bg-yellow-500 text-black' :
                        player.rank === 2 ? 'bg-gray-400 text-black' :
                        player.rank === 3 ? 'bg-orange-600 text-white' :
                        'bg-white/20'
                      }`}>
                        {player.rank}
                      </div>
                      <div>
                        <div className="font-bold">{player.name}</div>
                        <div className="text-xs text-white/70">{player.sport} • {player.wins} wins</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-400">{player.points.toLocaleString()}</div>
                      <div className="text-xs text-white/70 flex items-center gap-1">
                        <Flame className="w-3 h-3 text-orange-400" />
                        {player.streak}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Challenges */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                Quick Challenges
              </h3>
              
              <div className="space-y-3">
                {challenges.map((challenge, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-bold text-sm">{challenge.name}</div>
                      <div className="text-green-400 font-bold text-sm">{challenge.reward}</div>
                    </div>
                    <p className="text-xs text-white/70 mb-2">{challenge.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className={`px-2 py-1 rounded ${
                        challenge.difficulty === 'Expert' ? 'bg-red-500/20 text-red-400' :
                        challenge.difficulty === 'Advanced' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {challenge.difficulty}
                      </span>
                      <span className="text-white/50">{challenge.participants} competing</span>
                    </div>
                    <button className="w-full mt-3 py-2 bg-yellow-500/20 rounded-lg text-sm font-bold hover:bg-yellow-500/30 transition-colors">
                      Join Challenge
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tournament Features */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Tournament Features</h3>
              
              <div className="space-y-3">
                {tournamentFeatures.map((feature, index) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FeatureIcon className="w-4 h-4 text-orange-400" />
                        <div>
                          <div className="font-bold text-sm">{feature.name}</div>
                          <div className="text-xs text-white/70">{feature.description}</div>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-bold ${
                        feature.status === 'Active' || feature.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {feature.status}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tournament Stats */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Your Stats
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Global Rank</span>
                  <span className="text-sm font-bold text-orange-400">#{userRank}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tournaments Won</span>
                  <span className="text-sm font-bold text-green-400">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Win Streak</span>
                  <span className="text-sm font-bold text-yellow-400">4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Prize Money</span>
                  <span className="text-sm font-bold text-green-400">$2,400</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Scout Views</span>
                  <span className="text-sm font-bold text-blue-400">47</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-orange-500/20 rounded-lg text-center hover:bg-orange-500/30 transition-colors">
                  <Trophy className="w-5 h-5 mx-auto mb-2 text-orange-400" />
                  <div className="text-xs font-bold">Join Tournament</div>
                </button>
                <button className="p-3 bg-yellow-500/20 rounded-lg text-center hover:bg-yellow-500/30 transition-colors">
                  <Zap className="w-5 h-5 mx-auto mb-2 text-yellow-400" />
                  <div className="text-xs font-bold">Quick Challenge</div>
                </button>
                <button className="p-3 bg-blue-500/20 rounded-lg text-center hover:bg-blue-500/30 transition-colors">
                  <Video className="w-5 h-5 mx-auto mb-2 text-blue-400" />
                  <div className="text-xs font-bold">Live Stream</div>
                </button>
                <button className="p-3 bg-green-500/20 rounded-lg text-center hover:bg-green-500/30 transition-colors">
                  <Share className="w-5 h-5 mx-auto mb-2 text-green-400" />
                  <div className="text-xs font-bold">Share Victory</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-black mb-8">Elite Competitive Platform</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 p-8 rounded-xl">
              <Trophy className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Real Prize Competitions</h3>
              <p className="text-white/70">Compete for substantial cash prizes, scholarships, and equipment in professionally organized tournaments with verified results.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Eye className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Scout Visibility</h3>
              <p className="text-white/70">Live streaming and recorded performances give college scouts and recruiters direct access to your competitive abilities.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Elite Competition</h3>
              <p className="text-white/70">Face the best student-athletes nationwide in skill-based tournaments that showcase true athletic excellence and mental toughness.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-orange-500/30"
          >
            <Trophy className="w-7 h-7" />
            Join Live Tournament
            <ArrowRight className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </div>
  );
}