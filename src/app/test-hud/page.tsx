'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, RefreshCw } from 'lucide-react';
import HeroCardHUD from '@/components/HeroCardHUD';
// Temporarily disabled WebSocket import due to auth issues
// import { useWebSocket } from '@/lib/websocket/client';

// Mock athlete data for testing
const mockAthleteData = {
  id: 'test-athlete-123',
  name: 'Kole Becker',
  school: 'Marble Falls High School',
  sport: 'Football',
  position: 'Wide Receiver',
  heroCardImage: '/api/placeholder/400/600', // Placeholder image
};

export default function TestHUDPage() {
  const [userRole, setUserRole] = useState<string>('guest');
  const [isConnected, setIsConnected] = useState(false);
  // Temporarily disabled WebSocket
  // const { socket, sendHype } = useWebSocket();

  // Mock WebSocket connection for testing
  useEffect(() => {
    // Simulate connection after 1 second
    setTimeout(() => setIsConnected(true), 1000);
  }, []);

  const simulateHypeBoost = () => {
    // Simulate sending HYPE without WebSocket
    console.log('Simulating HYPE boost of 25 points');
    alert('HYPE sent! (WebSocket disabled for testing)');
  };

  const roles = [
    { value: 'guest', label: 'Guest' },
    { value: 'STUDENT', label: 'Student' },
    { value: 'PARENT', label: 'Parent' },
    { value: 'COLLEGE_SCOUT', label: 'College Scout' },
    { value: 'COACH', label: 'Coach' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">HUD Engine Test Page</h1>
          <p className="text-gray-400 mb-4">
            Testing real-time HUD overlay with WebSocket integration
          </p>
          
          {/* Connection Status */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm">
                WebSocket: {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>

          {/* Role Selector */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">View as:</span>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-[#F59E0B] focus:outline-none"
            >
              {roles.map(role => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* HeroCard with HUD Overlay */}
          <div className="relative">
            <h2 className="text-2xl font-bold mb-4">HeroCard with Live HUD</h2>
            
            {/* Mock HeroCard Background */}
            <div className="relative rounded-lg overflow-hidden">
              <div className="w-full h-[600px] bg-gradient-to-b from-[#1E3A8A] to-[#F59E0B] flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-2">{mockAthleteData.name}</h3>
                  <p className="text-xl mb-1">{mockAthleteData.school}</p>
                  <p className="text-lg opacity-80">
                    {mockAthleteData.position} • {mockAthleteData.sport}
                  </p>
                </div>
              </div>
              
              {/* HUD Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <HeroCardHUD
                  athleteId={mockAthleteData.id}
                  userRole={userRole}
                  initialData={{
                    hype_score: 1250,
                    recent_stats: {
                      football: {
                        yards: 998,
                        receptions: 48,
                        touchdowns: 12,
                      },
                      track: {
                        '100m': '11.2s',
                        '200m': '23.1s',
                      },
                    },
                    achievements: [
                      'All-District 1st Team',
                      'State Champion 2024',
                      'Scholar Athlete Award',
                    ],
                    highlight_reels: [
                      {
                        title: '2024 Season Highlights',
                        url: 'https://example.com/highlights',
                      },
                    ],
                    academics: {
                      gpa: 3.7,
                      honors: ['NHS', 'Honor Roll'],
                    },
                    recruiting: {
                      contact: {
                        coach_email: 'coach@school.edu',
                      },
                      test_scores: {
                        sat: 1300,
                        act: 28,
                      },
                    },
                    share_actions: {
                      share_url: `/athlete/${mockAthleteData.id}`,
                      boost_hype: true,
                      donate: true,
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Testing Controls */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Test Controls</h2>
            
            <div className="space-y-6">
              {/* Simulate HYPE */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Simulate Real-time Updates</h3>
                
                <button
                  onClick={simulateHypeBoost}
                  className="w-full px-6 py-3 bg-[#F59E0B] hover:bg-[#F59E0B]/80 text-black font-bold rounded-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Send 25 HYPE (WebSocket)
                </button>
                
                <p className="text-sm text-gray-400 mt-4">
                  Click to simulate another user sending HYPE. Watch the HUD update in real-time!
                </p>
              </div>

              {/* Instructions */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">How It Works</h3>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-[#F59E0B]">1.</span>
                    <p>The HUD overlay displays real-time data on top of static HeroCards</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#F59E0B]">2.</span>
                    <p>WebSocket connection enables instant updates without page refresh</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#F59E0B]">3.</span>
                    <p>Role-based views show different data to different user types</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#F59E0B]">4.</span>
                    <p>HYPE animations trigger when points are received</p>
                  </div>
                </div>
              </div>

              {/* Architecture */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Architecture</h3>
                
                <div className="space-y-2 text-sm font-mono">
                  <div className="bg-black/50 rounded p-3">
                    <span className="text-green-400">WebSocket Server</span>
                    <span className="text-gray-500"> → Port 3001</span>
                  </div>
                  <div className="bg-black/50 rounded p-3">
                    <span className="text-blue-400">Next.js App</span>
                    <span className="text-gray-500"> → Port 3002</span>
                  </div>
                  <div className="bg-black/50 rounded p-3">
                    <span className="text-purple-400">HUD API</span>
                    <span className="text-gray-500"> → /api/hud/[athleteId]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-gray-500">
          <p>HUD Engine v1.0 - Real-time overlay system for UltraPreps</p>
          <p className="text-sm mt-2">Static visuals + Dynamic data = Living profiles</p>
        </div>
      </div>
    </div>
  );
}