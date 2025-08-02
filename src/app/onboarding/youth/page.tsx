'use client';
export const dynamic = 'force-dynamic';

import { useSession } from 'next-auth/react';
import HeroCard from '@/components/HeroCard';
import { useState } from 'react';

export default function YouthOnboarding() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;
  }
  const userId = session?.user?.id || '';
  const [teamName, setTeamName] = useState('');
  const [league, setLeague] = useState('');
  const [nostalgia, setNostalgia] = useState(false);
  const [created, setCreated] = useState(false);
  const [heroCardId, setHeroCardId] = useState<string | null>(null);

  async function handleCreateTeam(e: React.FormEvent) {
    e.preventDefault();
    // Call onboarding API to create team and generate HeroCard
    const res = await fetch('/api/onboarding/youth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, teamName, league })
    });
    const data = await res.json();
    setCreated(true);
    setNostalgia(true);
    setHeroCardId(data.heroCardId || null);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-xl w-full bg-gray-900/90 rounded-2xl shadow-2xl p-8 flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-center drop-shadow-xl">Youth Team Onboarding</h1>
        <div className="mb-6 text-lg text-center text-gray-300">Cinematic onboarding for rec leagues, youth teams, and first-time athletes. Create your team and get your HeroCard instantly!</div>
        {!created ? (
          <form onSubmit={handleCreateTeam} className="w-full flex flex-col gap-4">
            <input
              value={teamName}
              onChange={e => setTeamName(e.target.value)}
              placeholder="Team Name"
              className="bg-gray-800 border border-gray-700 rounded px-4 py-3 text-lg"
              required
            />
            <input
              value={league}
              onChange={e => setLeague(e.target.value)}
              placeholder="League/Rec Program"
              className="bg-gray-800 border border-gray-700 rounded px-4 py-3 text-lg"
              required
            />
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg text-xl shadow-lg hover:bg-yellow-300 transition"
            >
              Create Team & Get HeroCard
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold text-green-400 mb-4 animate-bounce">Team Created!</div>
            <div className="text-xl mb-4">Welcome to UltraPreps, <span className="text-yellow-400 font-extrabold">{teamName}</span>!</div>
            {nostalgia && (
              <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-black font-bold px-6 py-4 rounded-xl shadow-xl text-2xl mb-4 animate-pulse">
                On This Day: Your team’s legacy begins. <span className="text-white">🏆</span>
              </div>
            )}
            <div className="bg-gray-800 rounded-xl p-6 mt-4 shadow-lg w-full text-center">
              <div className="text-2xl font-bold mb-2 text-yellow-400">Instant HeroCard</div>
              {heroCardId ? (
                <HeroCard userId={userId} heroCardId={heroCardId} />
              ) : (
                <div className="bg-black/80 rounded-lg p-4 mt-2 text-white">No HeroCard yet.</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}