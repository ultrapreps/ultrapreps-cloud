'use client';

import React from 'react';
import FamilyLifebook from '@/components/FamilyLifebook';
import AnimatedHeroCards from '@/components/AnimatedHeroCards';
import LegacySection from '@/components/LegacySection';
import TeamChat from '@/components/TeamChat';

export default function GrandpaJimDemo() {
  // PUBLIC DEMO - NO LOGIN REQUIRED
  const userId = 'demo-user';

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight text-center drop-shadow-xl">Grandpa Jim’s Demo Page</h1>
        <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6 mb-8">
          <div className="text-2xl font-bold mb-2 text-yellow-400">Family Lifebook</div>
          <FamilyLifebook parentId={userId} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6">
            <div className="text-2xl font-bold mb-2 text-green-400">Animated HeroCards</div>
            <AnimatedHeroCards userId={userId} />
          </div>
          <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6">
            <div className="text-2xl font-bold mb-2 text-blue-400">Legacy</div>
            <LegacySection userId={userId} />
          </div>
        </div>
        <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6 mt-8">
          <div className="text-2xl font-bold mb-2 text-blue-400">Team Chat</div>
          <TeamChat userId={userId} />
        </div>
      </div>
    </div>
  );
}