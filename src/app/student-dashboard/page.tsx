'use client';
export const dynamic = 'force-dynamic';

import React from 'react';
import HeroCard from '@/components/HeroCard';
import HypeWidget from '@/components/HypeWidget';
import TeamChat from '@/components/TeamChat';
import LifebookFeed from '@/components/LifebookFeed';
import SignalPrimeBrag from '@/components/SignalPrimeBrag';
import { useSession } from 'next-auth/react';
import { Spinner } from '@/components/Spinner'; // Assume a Spinner component exists

export default function StudentDashboard() {
  const sessionResult = useSession();
  if (sessionResult.status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen"><Spinner /> Loading...</div>;
  }
  if (!sessionResult.data?.user?.id) {
    return <div className="flex items-center justify-center min-h-screen text-red-500 text-xl font-bold">Error: You must be signed in to view this dashboard.</div>;
  }
  const userId = sessionResult.data.user.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight text-center drop-shadow-xl">Student Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6 flex flex-col items-center">
            <div className="text-2xl font-bold mb-2 text-yellow-400">Your HeroCard</div>
            <HeroCard userId={userId} />
          </div>
          <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6 flex flex-col items-center">
            <div className="text-2xl font-bold mb-2 text-pink-400">Live HYPE</div>
            <HypeWidget userId={userId} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6">
            <div className="text-2xl font-bold mb-2 text-green-400">Achievements</div>
            <ul className="list-disc pl-6 text-lg">
              <li>First HYPE Earned</li>
              <li>Team Captain</li>
              <li>Rivalry Win</li>
              <li>Viral Brag</li>
            </ul>
          </div>
          <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6">
            <div className="text-2xl font-bold mb-2 text-blue-400">Team Chat</div>
            <TeamChat userId={userId} />
          </div>
        </div>
        <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6 mb-8">
          <div className="text-2xl font-bold mb-2 text-purple-400">Lifebook Feed</div>
          <LifebookFeed userId={userId} />
        </div>
        <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6 flex flex-col items-center">
          <div className="text-2xl font-bold mb-2 text-pink-400">SignalPrime Brag</div>
          <SignalPrimeBrag userId={userId} />
        </div>
      </div>
    </div>
  );
}