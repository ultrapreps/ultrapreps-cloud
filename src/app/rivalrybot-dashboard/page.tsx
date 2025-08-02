'use client';

import React, { useEffect, useState } from 'react';
import { HypeLeaderboard } from '@/components/HypeLeaderboard';
import MascotAnimation from '@/components/MascotAnimation'; // Assume this will be created for animated mascots
import { useSession } from 'next-auth/react';

interface RivalryEntry {
  schoolId: string;
  schoolName: string;
  rivalryName?: string;
  hype: number;
  since?: number;
  intensity?: string;
  annualGame?: string;
}

export default function RivalryBotDashboard() {
  const [scope, setScope] = useState<'global' | 'school' | 'district' | 'conference'>('global');
  const [schoolId, setSchoolId] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [conference, setConference] = useState<string>('');
  const [leaderboard, setLeaderboard] = useState<RivalryEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      let url = `/api/rivalry/leaderboard?scope=${scope}`;
      if (scope === 'school' && schoolId) url += `&schoolId=${schoolId}`;
      if (scope === 'district' && district) url += `&district=${district}`;
      if (scope === 'conference' && conference) url += `&conference=${conference}`;
      const res = await fetch(url);
      const data = await res.json();
      setLeaderboard(data.leaderboard || []);
      setLoading(false);
    }
    fetchLeaderboard();
  }, [scope, schoolId, district, conference]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-4 tracking-tight text-center drop-shadow-xl">RivalryBot Dashboard</h1>
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <select value={scope} onChange={e => setScope(e.target.value as any)} className="bg-gray-900 border border-gray-700 rounded px-4 py-2">
            <option value="global">Global</option>
            <option value="school">School</option>
            <option value="district">District</option>
            <option value="conference">Conference</option>
          </select>
          {scope === 'school' && (
            <input value={schoolId} onChange={e => setSchoolId(e.target.value)} placeholder="School ID" className="bg-gray-900 border border-gray-700 rounded px-4 py-2" />
          )}
          {scope === 'district' && (
            <input value={district} onChange={e => setDistrict(e.target.value)} placeholder="District" className="bg-gray-900 border border-gray-700 rounded px-4 py-2" />
          )}
          {scope === 'conference' && (
            <input value={conference} onChange={e => setConference(e.target.value)} placeholder="Conference" className="bg-gray-900 border border-gray-700 rounded px-4 py-2" />
          )}
        </div>
        <div className="mb-8 flex justify-center">
          {/* Raid Mode Banner */}
          <div className="bg-red-700 text-white px-6 py-3 rounded-lg shadow-lg text-2xl font-bold animate-pulse flex items-center gap-4">
            <span>🔥 RAID MODE: Live Rivalry Event!</span>
            <MascotAnimation />
          </div>
        </div>
        <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6">
          <h2 className="text-3xl font-bold mb-4 text-center">Live Rivalry Leaderboard</h2>
          {loading ? (
            <div className="text-center py-8 text-xl">Loading...</div>
          ) : (
            <table className="w-full text-lg">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2">School</th>
                  <th className="py-2">Rivalry</th>
                  <th className="py-2">HYPE</th>
                  <th className="py-2">Since</th>
                  <th className="py-2">Intensity</th>
                  <th className="py-2">Annual Game</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, i) => (
                  <tr key={entry.schoolId} className="border-b border-gray-800 hover:bg-gray-800/60 transition">
                    <td className="py-2 font-bold">{entry.schoolName}</td>
                    <td className="py-2">{entry.rivalryName || '-'}</td>
                    <td className="py-2 text-yellow-400 font-extrabold">{entry.hype}</td>
                    <td className="py-2">{entry.since || '-'}</td>
                    <td className="py-2 capitalize">{entry.intensity || '-'}</td>
                    <td className="py-2">{entry.annualGame || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}