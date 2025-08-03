'use client';
export const dynamic = 'force-dynamic';

import React from 'react';
import DistrictMap from '@/components/DistrictMap';
import MediaKitGenerator from '@/components/MediaKitGenerator';
import RivalryHeatmap from '@/components/RivalryHeatmap';
import AdminAnalytics from '@/components/AdminAnalytics';
import TeamChat from '@/components/TeamChat';
import { useSession } from 'next-auth/react';
import { Spinner } from '@/components/Spinner'; // Assume a Spinner component exists

export default function SuperintendentDashboard() {
  const sessionResult = useSession();
  if (!sessionResult || sessionResult.status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen"><Spinner /> Loading...</div>;
  }
  if (!sessionResult.data?.user?.id) {
    return <div className="flex items-center justify-center min-h-screen text-red-500 text-xl font-bold">Error: You must be signed in to view this dashboard.</div>;
  }
  const adminId = sessionResult.data.user.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight text-center drop-shadow-xl">Superintendent/Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6">
            <div className="text-2xl font-bold mb-2 text-yellow-400">District/Conference Map</div>
            <DistrictMap adminId={adminId} />
          </div>
          <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6">
            <div className="text-2xl font-bold mb-2 text-pink-400">Rivalry Heatmap</div>
            <RivalryHeatmap adminId={adminId} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6">
            <div className="text-2xl font-bold mb-2 text-green-400">Media Kits</div>
            <MediaKitGenerator adminId={adminId} />
          </div>
          <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6">
            <div className="text-2xl font-bold mb-2 text-blue-400">Analytics</div>
            <AdminAnalytics adminId={adminId} />
          </div>
        </div>
        <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6 mt-8">
          <div className="text-2xl font-bold mb-2 text-blue-400">Team Chat</div>
          <TeamChat userId={adminId} />
        </div>
      </div>
    </div>
  );
}