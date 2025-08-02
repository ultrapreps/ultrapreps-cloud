'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

const shareTemplates = [
  'Check out my HeroCard on UltraPreps!',
  'Our school just took the lead in the RivalryBot leaderboard!',
  'Earned a new HYPE badge—can you beat me?',
  'On This Day: Legendary family moment on UltraPreps!',
];

export default function SignalPrimeViralityCenter() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;
  }
  const userId = session?.user?.id || '';
  const [selectedTemplate, setSelectedTemplate] = useState(shareTemplates[0]);
  const [showBrag, setShowBrag] = useState(false);
  const [hypeBonus, setHypeBonus] = useState(0);
  const [viralLeaderboard, setViralLeaderboard] = useState<any[]>([]);

  async function handleShare() {
    // Call SignalPrime API to share/brag and get HYPE bonus
    const res = await fetch('/api/signalprime/share', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, message: selectedTemplate })
    });
    const data = await res.json();
    setShowBrag(true);
    setHypeBonus(data.hypeBonus || 0);
  }

  useEffect(() => {
    // Fetch real viral leaderboard from SignalPrime API
    fetch('/api/signalprime/leaderboard')
      .then(res => res.json())
      .then(data => setViralLeaderboard(data.leaderboard || []));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight text-center drop-shadow-xl">SignalPrime Virality Center</h1>
        <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Share Your Brag</h2>
          <select
            value={selectedTemplate}
            onChange={e => setSelectedTemplate(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2 mb-4 text-lg"
          >
            {shareTemplates.map((template, i) => (
              <option key={i} value={template}>{template}</option>
            ))}
          </select>
          <button
            onClick={handleShare}
            className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg text-xl shadow-lg hover:bg-yellow-300 transition"
          >
            Share & Brag Now
          </button>
        </div>
        {showBrag && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-black/90 p-8 rounded-2xl shadow-2xl border-4 border-yellow-400 flex flex-col items-center animate-bounceIn">
              <div className="text-4xl font-extrabold mb-2 text-yellow-400">BRAG ALERT!</div>
              <div className="text-2xl mb-4">{selectedTemplate}</div>
              <div className="text-3xl font-bold text-green-400 mb-4">+{hypeBonus} HYPE Bonus!</div>
              <button
                onClick={() => setShowBrag(false)}
                className="bg-gray-800 text-white px-6 py-2 rounded-lg mt-2 border border-gray-600 hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
        <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">Viral Leaderboard</h2>
          {viralLeaderboard.length > 0 ? (
            <table className="w-full text-lg">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2">User</th>
                  <th className="py-2">Most Viral Moment</th>
                  <th className="py-2">Shares</th>
                  <th className="py-2">HYPE Earned</th>
                </tr>
              </thead>
              <tbody>
                {viralLeaderboard.map((entry, i) => (
                  <tr key={entry.userId} className="border-b border-gray-800">
                    <td className="py-2 font-bold">{entry.username}</td>
                    <td className="py-2">{entry.viralMoment}</td>
                    <td className="py-2">{entry.shares}</td>
                    <td className="py-2 text-yellow-400 font-extrabold">+{entry.hypeEarned}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8 text-xl">No viral moments yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}