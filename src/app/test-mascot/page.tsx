'use client';
export const dynamic = 'force-dynamic';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Palette, MessageCircle, Image as ImageIcon, Zap, RefreshCw } from 'lucide-react';
import type { MascotIdentity } from '@/lib/bots/MascotEngine';
import Link from 'next/link';

interface SampleDialogue {
  welcome: string;
  victory: string;
  encouragement: string;
  achievement: string;
}

export default function TestMascotPage() {
  const [schools, setSchools] = useState<any[]>([]);
  const [selectedSchoolId, setSelectedSchoolId] = useState('');
  const [loading, setLoading] = useState(false);
  const [mascotData, setMascotData] = useState<{
    mascot: MascotIdentity;
    sampleDialogue: SampleDialogue;
  } | null>(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'personality' | 'visual' | 'assets' | 'dialogue'>('personality');

  // Load schools on mount
  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () => {
    try {
      // For demo, we'll use hardcoded schools
      // In production, this would fetch from the database
      const demoSchools = [
        { id: 'demo-1', name: 'Marble Falls High School', mascot: 'Mustangs' },
        { id: 'demo-2', name: 'Austin High School', mascot: 'Eagles' },
        { id: 'demo-3', name: 'North Dallas High School', mascot: 'Bulldogs' },
        { id: 'demo-4', name: 'Memorial High School', mascot: 'Patriots' },
        { id: 'demo-5', name: 'Central High School', mascot: 'Lions' }
      ];
      setSchools(demoSchools);
      setSelectedSchoolId(demoSchools[0].id);
    } catch (err) {
      console.error('Failed to load schools:', err);
    }
  };

  const createMascot = async () => {
    if (!selectedSchoolId) return;
    
    setLoading(true);
    setError('');
    setMascotData(null);
    
    try {
      const response = await fetch('/api/mascot/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schoolId: selectedSchoolId }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setError(data.error || 'Failed to create mascot');
        return;
      }
      
      setMascotData(data);
    } catch (err) {
      setError('Network error - please try again');
    } finally {
      setLoading(false);
    }
  };

  const resetDemo = () => {
    setSelectedSchoolId(schools[0]?.id || '');
    setMascotData(null);
    setError('');
  };

  const selectedSchool = schools.find(s => s.id === selectedSchoolId);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Onboarding Banner */}
        <div className="mb-8 bg-gradient-to-r from-[#F59E0B]/80 to-[#F97316]/80 rounded-xl p-6 text-black text-center font-bold text-2xl shadow-xl">
          UltraPreps Onboarding Demo: Instantly generate a living mascot for your school. Try the demo schools or select your own!
        </div>
        {/* Onboarding Tips */}
        <div className="mb-8 bg-blue-900/20 border border-blue-500 rounded-xl p-4 text-blue-200 text-lg shadow">
          <ul className="list-disc pl-6 space-y-2 text-left">
            <li>Select a <span className="font-bold">Demo School</span> or enter your own to generate a mascot.</li>
            <li>Explore the <span className="font-bold">Personality</span>, <span className="font-bold">Visual</span>, <span className="font-bold">Assets</span>, and <span className="font-bold">Dialogue</span> tabs to see the full mascot profile.</li>
            <li>Use the <span className="font-bold">Reset Demo</span> button to start over and try different schools or scenarios.</li>
          </ul>
        </div>
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <Sparkles className="w-10 h-10 text-[#F59E0B]" /> Mascot Engine Onboarding Demo
            </h1>
            <p className="text-gray-400">Create living mascot identities with personality, visual profiles, and style-locked assets. All data is for demo purposes only.</p>
          </div>
          <button onClick={resetDemo} className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-bold transition-all">
            <RefreshCw className="w-5 h-5" /> Reset Demo
          </button>
        </div>

        {/* School Selection */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Select Demo School</h2>
          
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">Choose a school to generate mascot</label>
              <select
                value={selectedSchoolId}
                onChange={(e) => setSelectedSchoolId(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-[#F59E0B] focus:outline-none"
              >
                {schools.map(school => (
                  <option key={school.id} value={school.id}>
                    {school.name} ({school.mascot})
                  </option>
                ))}
              </select>
            </div>
            
            <button
              onClick={createMascot}
              disabled={loading || !selectedSchoolId}
              className="px-6 py-2 bg-[#F59E0B] hover:bg-[#F59E0B]/80 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold rounded-lg transition-all flex items-center gap-2"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Mascot
                </>
              )}
            </button>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-400">
              {error}
            </div>
          )}
        </div>

        {/* Results */}
        {mascotData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Mascot Overview */}
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div 
                className="h-48 relative flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${mascotData.mascot.visualProfile.colorPalette.primary} 0%, ${mascotData.mascot.visualProfile.colorPalette.secondary} 100%)`
                }}
              >
                <div className="text-center">
                  <h2 className="text-4xl font-bold mb-2">{mascotData.mascot.name}</h2>
                  <p className="text-xl">{mascotData.mascot.species} Mascot</p>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="flex border-b border-gray-800">
                {(['personality', 'visual', 'assets', 'dialogue'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-4 py-3 font-semibold transition-all ${
                      activeTab === tab
                        ? 'bg-[#F59E0B] text-black'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              
              {/* Tab Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {/* Personality Tab */}
                  {activeTab === 'personality' && (
                    <motion.div
                      key="personality"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <MessageCircle className="w-6 h-6 text-[#F59E0B]" />
                        Personality Profile
                      </h3>
                      
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Character Tone</h4>
                        <p className="text-gray-300">{mascotData.mascot.personality.tone}</p>
                      </div>
                      
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Core Traits</h4>
                        <div className="flex flex-wrap gap-2">
                          {mascotData.mascot.personality.traits.map((trait, idx) => (
                            <span key={idx} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                              {trait}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Catchphrases</h4>
                        <ul className="space-y-2">
                          {mascotData.mascot.personality.catchphrases.map((phrase, idx) => (
                            <li key={idx} className="text-gray-300 italic">"{phrase}"</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Role & Purpose</h4>
                        <p className="text-gray-300">{mascotData.mascot.personality.chatRole}</p>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Visual Tab */}
                  {activeTab === 'visual' && (
                    <motion.div
                      key="visual"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Palette className="w-6 h-6 text-[#F59E0B]" />
                        Visual Profile
                      </h3>
                      
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Color Palette</h4>
                        <div className="space-y-2">
                          {Object.entries(mascotData.mascot.visualProfile.colorPalette).map(([key, color]) => (
                            <div key={key} className="flex items-center gap-3">
                              <div 
                                className="w-12 h-12 rounded border-2 border-gray-700"
                                style={{ backgroundColor: color as string }}
                              />
                              <div>
                                <span className="font-medium capitalize">{key}:</span>
                                <span className="text-gray-400 ml-2">{color}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Art Style Guide</h4>
                        <p className="text-gray-300 mb-2">
                          <strong>Style:</strong> {mascotData.mascot.visualProfile.styleGuide.artStyle}
                        </p>
                        <p className="text-gray-300 mb-2">
                          <strong>Mood:</strong> {mascotData.mascot.visualProfile.styleGuide.mood}
                        </p>
                        <div>
                          <strong>Key Details:</strong>
                          <ul className="mt-1 space-y-1">
                            {mascotData.mascot.visualProfile.styleGuide.details.map((detail, idx) => (
                              <li key={idx} className="text-gray-300 text-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800 rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Pose Variations</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {mascotData.mascot.visualProfile.actionPoses.map((pose, idx) => (
                            <div key={idx} className="text-gray-300 text-sm">
                              • {pose}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Assets Tab */}
                  {activeTab === 'assets' && (
                    <motion.div
                      key="assets"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <ImageIcon className="w-6 h-6 text-[#F59E0B]" />
                        Asset Pack
                      </h3>
                      
                      <div className="space-y-6">
                        {/* Portraits */}
                        <div>
                          <h4 className="font-semibold mb-3">Portrait Collection</h4>
                          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                            {Object.entries(mascotData.mascot.assetPack.portraits).map(([mood, url]) => (
                              <div key={mood} className="text-center">
                                <div className="bg-gray-800 rounded-lg p-4 mb-2">
                                  <div className="text-4xl mb-2">
                                    {mood === 'happy' && '😊'}
                                    {mood === 'excited' && '🤩'}
                                    {mood === 'proud' && '😤'}
                                    {mood === 'determined' && '😠'}
                                    {mood === 'celebrating' && '🎉'}
                                  </div>
                                </div>
                                <p className="text-sm capitalize">{mood}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Action Poses */}
                        <div>
                          <h4 className="font-semibold mb-3">Action Poses</h4>
                          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                            {Object.entries(mascotData.mascot.assetPack.poses).map(([pose, url]) => (
                              <div key={pose} className="text-center">
                                <div className="bg-gray-800 rounded-lg p-4 mb-2">
                                  <div className="text-4xl mb-2">
                                    {pose === 'standing' && '🚶'}
                                    {pose === 'action' && '🏃'}
                                    {pose === 'victory' && '🏆'}
                                    {pose === 'thinking' && '🤔'}
                                    {pose === 'cheering' && '📣'}
                                  </div>
                                </div>
                                <p className="text-sm capitalize">{pose}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Stickers */}
                        <div>
                          <h4 className="font-semibold mb-3">Reaction Stickers</h4>
                          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                            {Object.entries(mascotData.mascot.assetPack.stickers).map(([sticker, url]) => (
                              <div key={sticker} className="text-center">
                                <div className="bg-gray-800 rounded-lg p-4 mb-2">
                                  <div className="text-4xl mb-2">
                                    {sticker === 'thumbsUp' && '👍'}
                                    {sticker === 'highFive' && '✋'}
                                    {sticker === 'flex' && '💪'}
                                    {sticker === 'wink' && '😉'}
                                    {sticker === 'fire' && '🔥'}
                                  </div>
                                </div>
                                <p className="text-sm capitalize">{sticker}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Dialogue Tab */}
                  {activeTab === 'dialogue' && (
                    <motion.div
                      key="dialogue"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Zap className="w-6 h-6 text-[#F59E0B]" />
                        Sample Dialogue
                      </h3>
                      
                      <div className="space-y-4">
                        {Object.entries(mascotData.sampleDialogue).map(([situation, dialogue]) => (
                          <div key={situation} className="bg-gray-800 rounded-lg p-4">
                            <h4 className="font-semibold mb-2 capitalize flex items-center gap-2">
                              {situation === 'welcome' && '👋'}
                              {situation === 'victory' && '🏆'}
                              {situation === 'encouragement' && '💪'}
                              {situation === 'achievement' && '⭐'}
                              {situation}
                            </h4>
                            <p className="text-gray-300 italic">"{dialogue}"</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="bg-blue-900/20 border border-blue-500 rounded-lg p-4 mt-6">
                        <p className="text-sm text-blue-300">
                          <strong>Note:</strong> In production, dialogue would be generated dynamically by GPT-4 
                          based on the mascot's personality, current context, and user interactions.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Brand technical details as demo */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Demo Technical Details</h3>
              <div className="bg-black/50 rounded-lg p-4 font-mono text-sm space-y-2">
                <p className="text-green-400">// Mascot Identity Generated</p>
                <p className="text-gray-400">Mascot ID: <span className="text-white">{mascotData.mascot.id}</span></p>
                <p className="text-gray-400">School ID: <span className="text-white">{mascotData.mascot.schoolId}</span></p>
                <p className="text-gray-400">LoRA Model: <span className="text-white">{mascotData.mascot.loraModelId || 'Pending'}</span></p>
                <p className="text-gray-400">Total Assets: <span className="text-white">15 variations</span></p>
                <p className="text-gray-400">Style Lock: <span className="text-white">Enabled (LoRA training)</span></p>
              </div>
              
              <div className="mt-4 bg-yellow-900/20 border border-yellow-500 rounded-lg p-4">
                <p className="text-sm text-yellow-300">
                  <strong>LoRA Training:</strong> In production, a custom LoRA model would be trained on 50+ 
                  variations of this mascot to ensure perfect style consistency across all future generations. 
                  Training time: ~2 hours. Cost: ~$1.50 per school.
                </p>
              </div>
            </div>
            {/* Next Step CTA */}
            <div className="mt-8 text-center">
              <Link href="/test-hud" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black font-bold text-xl rounded-xl shadow-lg hover:scale-105 transition-all">
                <Zap className="w-6 h-6 text-yellow-400" /> Next: HUD Demo
              </Link>
              <div className="mt-2 text-gray-400 text-sm">See your mascot in action with the real-time HUD overlay!</div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p>Mascot Engine v1.0 - Living mascot identities that never drift</p>
          <p className="text-sm mt-2">Personality + Visual Identity + Style-Locked Assets = Consistent Brand</p>
        </div>
      </div>
    </div>
  );
}