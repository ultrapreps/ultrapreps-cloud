'use client';
export const dynamic = 'force-dynamic';

import React from 'react';
import InteractiveStream from '@/components/InteractiveStream'; // To be created
import Stickers from '@/components/Stickers';
import Comments from '@/components/Comments';
import HypeBoosts from '@/components/HypeBoosts';
import ESPNEventTicker from '@/components/ESPNEventTicker';

export default function EventMode() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight text-center drop-shadow-xl">Live Event Mode</h1>
        <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6 mb-8">
          <div className="text-2xl font-bold mb-2 text-yellow-400">Interactive Stream</div>
          <InteractiveStream eventId="demo-event-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6">
            <div className="text-2xl font-bold mb-2 text-green-400">Stickers & Comments</div>
            <Stickers eventId="demo-event-1" />
            <Comments eventId="demo-event-1" />
          </div>
          <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6">
            <div className="text-2xl font-bold mb-2 text-pink-400">HYPE Boosts & ESPN Ticker</div>
            <HypeBoosts eventId="demo-event-1" />
            <ESPNEventTicker eventId="demo-event-1" />
          </div>
        </div>
      </div>
    </div>
  );
}