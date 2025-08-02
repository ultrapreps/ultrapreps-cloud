'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, RefreshCw, Trophy } from 'lucide-react';
import HeroCardHUD from '@/components/HeroCardHUD';
import Link from 'next/link';
// Temporarily disabled WebSocket import due to auth issues
// import { useWebSocket } from '@/lib/websocket/client';

import TestHUDRedirect from './redirect';

export default function TestHUDPage() {
  return <TestHUDRedirect />;
  const [userRole, setUserRole] = useState<string>('guest');
  const [isConnected, setIsConnected] = useState(false);
  const [athleteData, setAthleteData] = useState<any>(null);

  // Temporarily disabled WebSocket
  // const { socket, sendHype } = useWebSocket();

  useEffect(() => {
    // Fetch real athlete data from backend
    fetch('/api/athlete/test-athlete-123')
      .then(res => res.json())
      .then(data => setAthleteData(data));
    setTimeout(() => setIsConnected(true), 1000);
  }, []);

  const simulateHypeBoost = () => {
    // Simulate sending HYPE without WebSocket
    console.log('Simulating HYPE boost of 25 points');
    alert('HYPE sent! (WebSocket disabled for testing)');
  };

  const resetDemo = () => {
    setUserRole('guest');
    setAthleteData(null);
    setIsConnected(false);
    setTimeout(() => setIsConnected(true), 1000);
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
        {/* Onboarding Banner */}
        <div className="mb-8 bg-gradient-to-r from-[#F59E0B]/80 to-[#F97316]/80 rounded-xl p-6 text-black text-center font-bold text-2xl shadow-xl">
          UltraPreps Onboarding Demo: Experience the real-time HUD engine. Try different roles, simulate HYPE, and see live overlays!
        </div>
        {/* Onboarding Tips */}
        <div className="mb-8 bg-blue-900/20 border border-blue-500 rounded-xl p-4 text-blue-200 text-lg shadow">
          <ul className="list-disc pl-6 space-y-2 text-left">
            <li>Use the <span className="font-bold">Role Selector</span> to see how the HUD changes for students, parents, coaches, and scouts.</li>
            <li>Click <span className="font-bold">Simulate HYPE</span> to trigger a real-time HYPE animation in the HUD overlay.</li>
            <li>Review the <span className="font-bold">How It Works</span> and <span className="font-bold">Architecture</span> sections for a technical overview.</li>
            <li>Use the <span className="font-bold">Reset Demo</span> button to start over and try different scenarios.</li>
          </ul>
        </div>
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">HUD Engine Onboarding Demo</h1>
            <p className="text-gray-400 mb-4">Testing real-time HUD overlay with WebSocket integration. All data is for demo purposes only.</p>
          </div>
          <button onClick={resetDemo} className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-bold transition-all">
            <RefreshCw className="w-5 h-5" /> Reset Demo
          </button>
        </div>

        {/* Brand role selector and connection status as demo */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm font-bold text-yellow-400">WebSocket (Demo): {isConnected ? 'Connected' : 'Disconnected'}</span>
          </div>
          <span className="text-sm text-gray-400">View as (Demo Role):</span>
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

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* HeroCard with HUD Overlay */}
          <div className="relative">
            <h2 className="text-2xl font-bold mb-4">HeroCard with Live HUD</h2>
            
            {/* Mock HeroCard Background */}
            <div className="relative rounded-lg overflow-hidden">
              <div className="w-full h-[600px] bg-gradient-to-b from-[#1E3A8A] to-[#F59E0B] flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-2">{athleteData?.name || 'Loading...'}</h3>
                  <p className="text-xl mb-1">{athleteData?.school || ''}</p>
                  <p className="text-lg opacity-80">
                    {athleteData?.position} • {athleteData?.sport}
                  </p>
                  {athleteData?.heroCardImage && (
                    <img src={athleteData.heroCardImage} alt="HeroCard" className="mx-auto mt-4 rounded shadow-lg max-h-80" />
                  )}
                </div>
              </div>
              
              {/* HUD Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {athleteData && (
                  <HeroCardHUD
                    athleteId={athleteData.id}
                    userRole={userRole}
                    initialData={athleteData.hudData}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Brand test controls as demo */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Demo Test Controls</h2>
            
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
        {/* Next Step CTA */}
        <div className="mt-8 text-center">
          <Link href="/test-hype" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black font-bold text-xl rounded-xl shadow-lg hover:scale-105 transition-all">
            <Trophy className="w-6 h-6 text-green-400" /> Next: HYPE Demo
          </Link>
          <div className="mt-2 text-gray-400 text-sm">Experience the real-time HYPE economy and leaderboard!</div>
        </div>
      </div>
    </div>
  );
}