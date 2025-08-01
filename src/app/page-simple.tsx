'use client';

import { useState } from 'react';

export default function HomePage() {
  const [showSignup, setShowSignup] = useState(false);
  const [profileData, setProfileData] = useState<{
    name: string;
    school: string;
    sport: string;
    position: string;
    currentStats: string[];
    aiAnalysis: string | null;
    revelationLevel: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [revelationLevel, setRevelationLevel] = useState(1);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      school: formData.get('school'),
      email: formData.get('email'),
      userType: formData.get('userType')
    };

    try {
      const response = await fetch('/api/profile-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      if (result.success) {
        setProfileData(result.profile);
        setRevelationLevel(result.profile.revelationLevel);
        setShowSignup(false);
        
        // Simulate progressive revelation
        setTimeout(() => {
          if (revelationLevel < 2) {
            setRevelationLevel(2);
            // Show "new features unlocked" notification
          }
        }, 30000); // After 30 seconds
      }
    } catch (error) {
      console.error('Signup failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 mb-8">
            <h1 className="text-4xl font-black mb-2">{profileData.name}</h1>
            <p className="text-xl text-gray-400">{profileData.school}</p>
            <p className="text-lg text-blue-400">{profileData.sport} - {profileData.position}</p>
          </div>

          {/* Progressive Revelation UI */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Level 1: Basic Stats */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold mb-4">📊 Current Season</h2>
              {profileData.currentStats && profileData.currentStats.map((stat: string, i: number) => (
                <p key={i} className="text-gray-300">{stat}</p>
              ))}
            </div>

            {/* Level 2: AI Analysis */}
            {revelationLevel >= 2 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 animate-fadeIn">
                <h2 className="text-2xl font-bold mb-4">🧠 AI Analysis</h2>
                <p className="text-gray-300 whitespace-pre-wrap">{profileData.aiAnalysis}</p>
              </div>
            )}

            {/* Level 3: Family Hints */}
            {revelationLevel >= 3 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 animate-fadeIn">
                <h2 className="text-2xl font-bold mb-4">👨‍👩‍👦 Family Legacy</h2>
                <p className="text-gray-300">Discovering family connections...</p>
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
                  Search Family History
                </button>
              </div>
            )}

            {/* Level 4: Full Digital Lifebook */}
            {revelationLevel >= 4 && (
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 animate-fadeIn">
                <h2 className="text-2xl font-bold mb-4">📖 Digital Lifebook</h2>
                <p className="text-gray-300">Your complete athletic journey from birth to legacy</p>
                <button className="mt-4 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded">
                  View Full Timeline
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex gap-4">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-6 py-3 rounded-lg font-bold">
              Create Hero Card
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-bold">
              View Stadium
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      {!showSignup ? (
        <main className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
            UltraPreps
          </h1>
          <p className="text-2xl mb-8 text-gray-300">
            Elite Athletic Intelligence Platform
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-2">🏆 Athletic Profiles</h2>
              <p className="text-gray-400">AI-powered athletic analysis and digital immortality</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-2">🧠 Smart Tutoring</h2>
              <p className="text-gray-400">Personalized AI education for student athletes</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-2">🎯 Recruitment</h2>
              <p className="text-gray-400">Connect with colleges and unlock your future</p>
            </div>
          </div>

          <div className="mt-12">
            <button
              onClick={() => setShowSignup(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105"
            >
              Get Started
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </main>
      ) : (
        <div className="max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-center">Create Your Profile</h2>
          <form onSubmit={handleSignup} className="space-y-4">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
            <input
              name="school"
              type="text"
              placeholder="School Name"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
            />
            <select
              name="userType"
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:outline-none"
            >
              <option value="athlete">Student Athlete</option>
              <option value="parent">Parent</option>
              <option value="grandparent">Grandparent</option>
              <option value="coach">Coach</option>
            </select>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg disabled:opacity-50"
            >
              {loading ? 'Creating Profile...' : 'Create Profile'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}