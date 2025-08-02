'use client';
export const dynamic = 'force-dynamic';

import React from 'react';
import PressKitGenerator from '@/components/PressKitGenerator';
import AnimatedInfographics from '@/components/AnimatedInfographics';
import SignalPrimeIntegration from '@/components/SignalPrimeIntegration';
import { useSession } from 'next-auth/react';

export default function MediaKit() {
  const sessionResult = useSession();
  
  if (!sessionResult || sessionResult.status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;
  }
  
  const adminId = sessionResult.data?.user?.id || '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight text-center drop-shadow-xl">Media Kit Generator</h1>
        <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6 mb-8">
          <div className="text-2xl font-bold mb-2 text-yellow-400">Auto-Generated Press Kits</div>
          <PressKitGenerator adminId={adminId} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6">
            <div className="text-2xl font-bold mb-2 text-green-400">Animated Infographics</div>
            <AnimatedInfographics adminId={adminId} />
          </div>
          <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6">
            <div className="text-2xl font-bold mb-2 text-pink-400">SignalPrime Integration</div>
            <SignalPrimeIntegration adminId={adminId} />
          </div>
        </div>
      </div>
    </div>
  );
}