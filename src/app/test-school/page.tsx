'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { School, MapPin, Palette, Users, Building2, Trophy, BookOpen, Heart, RefreshCw, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface SchoolData {
  id: string;
  name: string;
  nickname: string;
  mascot: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  location: {
    city: string;
    state: string;
    district?: string;
  };
  assets: {
    bannerUrl: string;
    logoUrl: string;
    mascotImageUrl: string;
  };
}

interface SchoolSpaces {
  athleticsHub: {
    name: string;
    description: string;
    features: string[];
  };
  academicHub: {
    name: string;
    description: string;
    features: string[];
  };
  communityHub: {
    name: string;
    description: string;
    features: string[];
  };
}

interface StaffMember {
  title: string;
  department: string;
  email: string;
}

export default function TestSchoolPage() {
  const [schoolName, setSchoolName] = useState('Marble Falls High School');
  const [city, setCity] = useState('Marble Falls');
  const [state, setState] = useState('Texas');
  const [district, setDistrict] = useState('Marble Falls ISD');
  
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    school: SchoolData;
    spaces: SchoolSpaces;
    staff: StaffMember[];
  } | null>(null);
  const [error, setError] = useState('');

  const createSchool = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    
    try {
      const response = await fetch('/api/school/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: schoolName, city, state, district }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Failed to create school');
        return;
      }
      
      setResult(data);
    } catch (err) {
      setError('Network error - please try again');
    } finally {
      setLoading(false);
    }
  };

  const resetDemo = () => {
    setSchoolName('');
    setCity('');
    setState('');
    setDistrict('');
    setResult(null);
    setError('');
  };

  // Test data for quick testing
  const testSchools = [
    { name: 'Marble Falls High School', city: 'Marble Falls', state: 'Texas', district: 'Marble Falls ISD' },
    { name: 'Austin High School', city: 'Austin', state: 'Texas', district: 'Austin ISD' },
    { name: 'North Dallas Eagles', city: 'Dallas', state: 'Texas', district: 'Dallas ISD' },
    { name: 'Memorial Patriots High School', city: 'Houston', state: 'Texas', district: 'Houston ISD' },
    { name: 'Central Lions Academy', city: 'San Antonio', state: 'Texas', district: 'SAISD' },
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Onboarding Banner */}
        <div className="mb-8 bg-gradient-to-r from-[#F59E0B]/80 to-[#F97316]/80 rounded-xl p-6 text-black text-center font-bold text-2xl shadow-xl">
          UltraPreps Onboarding Demo: Instantly create a digital school universe. Try the quick test buttons or enter your own school!
        </div>
        {/* Onboarding Tips */}
        <div className="mb-8 bg-blue-900/20 border border-blue-500 rounded-xl p-4 text-blue-200 text-lg shadow">
          <ul className="list-disc pl-6 space-y-2 text-left">
            <li>Use the <span className="font-bold">Quick Demo Schools</span> to instantly see a school universe, or enter your own school details.</li>
            <li>After creation, explore the <span className="font-bold">Athletics</span>, <span className="font-bold">Academics</span>, <span className="font-bold">Community</span>, and <span className="font-bold">Staff</span> sections.</li>
            <li>Use the <span className="font-bold">Reset Demo</span> button to start over and try different schools or scenarios.</li>
          </ul>
        </div>
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">SchoolUniverseBot Onboarding Demo</h1>
            <p className="text-gray-400">Create a complete digital campus with automatic metadata, spaces, and staff. All data is for demo purposes only.</p>
          </div>
          <button onClick={resetDemo} className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-bold transition-all">
            <RefreshCw className="w-5 h-5" /> Reset Demo
          </button>
        </div>

        {/* Input Form */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <School className="w-6 h-6 text-[#F59E0B]" />
            Create School Universe
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">School Name</label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-[#F59E0B] focus:outline-none"
                placeholder="e.g., Marble Falls High School"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-[#F59E0B] focus:outline-none"
                placeholder="e.g., Marble Falls"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-[#F59E0B] focus:outline-none"
                placeholder="e.g., Texas"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">District (Optional)</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-[#F59E0B] focus:outline-none"
                placeholder="e.g., Marble Falls ISD"
              />
            </div>
          </div>

          {/* Quick Test Buttons */}
          <div className="mb-4">
            <p className="text-sm text-yellow-400 mb-2 font-bold">Quick Demo Schools:</p>
            <div className="flex flex-wrap gap-2">
              {testSchools.map((school, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSchoolName(school.name);
                    setCity(school.city);
                    setState(school.state);
                    setDistrict(school.district);
                  }}
                  className="px-3 py-1 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black font-bold rounded text-sm transition-all shadow"
                >
                  {school.name}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={createSchool}
            disabled={loading || !schoolName || !city || !state}
            className="w-full px-6 py-3 bg-[#F59E0B] hover:bg-[#F59E0B]/80 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold rounded-lg transition-all"
          >
            {loading ? 'Creating Universe...' : 'Create School Universe'}
          </button>
          
          {error && (
            <div className="mt-4 p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-400">
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* School Overview */}
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              {/* Banner */}
              <div 
                className="h-48 relative"
                style={{
                  background: `linear-gradient(135deg, ${result.school.colors.primary} 0%, ${result.school.colors.secondary} 100%)`
                }}
              >
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-4xl font-bold mb-2">{result.school.name}</h2>
                    <p className="text-xl">{result.school.nickname}</p>
                  </div>
                </div>
              </div>
              
              {/* School Info */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Identity</h3>
                    <p className="text-lg font-semibold">{result.school.mascot}</p>
                    <p className="text-sm text-gray-400">{result.school.nickname}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Location
                    </h3>
                    <p className="text-lg font-semibold">{result.school.location.city}, {result.school.location.state}</p>
                    {result.school.location.district && (
                      <p className="text-sm text-gray-400">{result.school.location.district}</p>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      School Colors
                    </h3>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded"
                          style={{ backgroundColor: result.school.colors.primary }}
                        />
                        <span className="text-sm">Primary</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded"
                          style={{ backgroundColor: result.school.colors.secondary }}
                        />
                        <span className="text-sm">Secondary</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-8 h-8 rounded"
                          style={{ backgroundColor: result.school.colors.accent }}
                        />
                        <span className="text-sm">Accent</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* School Spaces */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Athletics Hub */}
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="w-8 h-8 text-[#F59E0B]" />
                  <h3 className="text-xl font-bold">{result.spaces.athleticsHub.name}</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">{result.spaces.athleticsHub.description}</p>
                <ul className="space-y-2">
                  {result.spaces.athleticsHub.features.map((feature, idx) => (
                    <li key={idx} className="text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Academic Hub */}
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-8 h-8 text-[#3B82F6]" />
                  <h3 className="text-xl font-bold">{result.spaces.academicHub.name}</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">{result.spaces.academicHub.description}</p>
                <ul className="space-y-2">
                  {result.spaces.academicHub.features.map((feature, idx) => (
                    <li key={idx} className="text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Community Hub */}
              <div className="bg-gray-900 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-8 h-8 text-[#10B981]" />
                  <h3 className="text-xl font-bold">{result.spaces.communityHub.name}</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">{result.spaces.communityHub.description}</p>
                <ul className="space-y-2">
                  {result.spaces.communityHub.features.map((feature, idx) => (
                    <li key={idx} className="text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Staff Placeholders */}
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-8 h-8 text-[#F59E0B]" />
                <h3 className="text-xl font-bold">Demo Staff Placeholders ({result.staff.length})</h3>
              </div>
              <p className="text-sm text-yellow-400 mb-4 font-bold">
                These are demo staff accounts, ready to be claimed by real staff during onboarding.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {result.staff.map((member, idx) => (
                  <div key={idx} className="bg-gray-800 rounded-lg p-4">
                    <h4 className="font-semibold">{member.title}</h4>
                    <p className="text-sm text-gray-400">{member.department}</p>
                    <p className="text-xs text-gray-500 mt-1">{member.email}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Details */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Building2 className="w-6 h-6" />
                Technical Details
              </h3>
              <div className="bg-black/50 rounded-lg p-4 font-mono text-sm">
                <p className="text-green-400">// School Universe Created Successfully</p>
                <p className="text-gray-400">School ID: <span className="text-white">{result.school.id}</span></p>
                <p className="text-gray-400">Mascot Detection: <span className="text-white">{result.school.mascot}</span></p>
                <p className="text-gray-400">Color Scheme: <span className="text-white">Auto-generated based on mascot</span></p>
                <p className="text-gray-400">Spaces Created: <span className="text-white">3 hubs</span></p>
                <p className="text-gray-400">Staff Placeholders: <span className="text-white">{result.staff.length} accounts</span></p>
                <p className="text-gray-400">Total Setup Time: <span className="text-white">&lt; 2 seconds</span></p>
              </div>
            </div>
            {/* Next Step CTA */}
            <div className="mt-8 text-center">
              <Link href="/test-mascot" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black font-bold text-xl rounded-xl shadow-lg hover:scale-105 transition-all">
                <Sparkles className="w-6 h-6 text-pink-500" /> Next: Mascot Demo
              </Link>
              <div className="mt-2 text-gray-400 text-sm">Bring your school to life with a living mascot identity!</div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p>SchoolUniverseBot v1.0 - Automatic school digital campus creation</p>
          <p className="text-sm mt-2">Every school arrives alive with spaces, staff, and identity</p>
        </div>
      </div>
    </div>
  );
}