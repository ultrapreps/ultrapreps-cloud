'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, Zap, Palette, Sparkles, Eye, Heart, Shield, 
  ArrowRight, Download, Share, Wand2, Stars, Trophy,
  Target, Flame, Bolt, Mountain, Bird
} from 'lucide-react';
import Link from 'next/link';

export default function MascotDemo() {
  const [selectedSchool, setSelectedSchool] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPose, setSelectedPose] = useState('victory');

  const demoSchools = [
    {
      name: "Liberty High School",
      mascot: "Eagles",
      colors: { primary: "#1E3A8A", secondary: "#F59E0B", accent: "#FFFFFF" },
      personality: "Soaring, Fierce, Majestic",
      description: "The Liberty Eagles embody freedom, power, and the pursuit of excellence.",
      poses: ['victory', 'flying', 'perched', 'defending'],
      characteristics: ["Sharp talons and beak", "Spread wings for flight", "Fierce golden eyes", "Blue and gold plumage"]
    },
    {
      name: "Westfield Academy",
      mascot: "Mustangs",
      colors: { primary: "#4B0082", secondary: "#FFD700", accent: "#FFFFFF" },
      personality: "Wild, Powerful, Unstoppable",
      description: "The Westfield Mustangs represent untamed spirit and championship drive.",
      poses: ['rearing', 'galloping', 'standing', 'charging'],
      characteristics: ["Flowing mane", "Muscular build", "Determined stance", "Purple and gold colors"]
    },
    {
      name: "Roosevelt High",
      mascot: "Wolves",
      colors: { primary: "#1F2937", secondary: "#DC2626", accent: "#FFFFFF" },
      personality: "Pack-minded, Loyal, Fierce",
      description: "The Roosevelt Wolves showcase teamwork, loyalty, and relentless pursuit.",
      poses: ['howling', 'prowling', 'pack', 'alpha'],
      characteristics: ["Piercing eyes", "Strong jaw", "Pack leadership", "Gray and red markings"]
    },
    {
      name: "Mountain View High",
      mascot: "Lions",
      colors: { primary: "#B45309", secondary: "#F59E0B", accent: "#FFFFFF" },
      personality: "Regal, Courageous, Dominant",
      description: "The Mountain View Lions embody courage, leadership, and royal strength.",
      poses: ['roaring', 'stalking', 'resting', 'pouncing'],
      characteristics: ["Majestic mane", "Powerful roar", "Golden fur", "Commanding presence"]
    }
  ];

  const currentSchool = demoSchools[selectedSchool];

  const poses = {
    victory: { icon: Trophy, label: "Victory Celebration" },
    flying: { icon: Bird, label: "Soaring High" },
    perched: { icon: Mountain, label: "Watchful Guardian" },
    defending: { icon: Shield, label: "Defensive Stance" },
    rearing: { icon: Bolt, label: "Rearing Power" },
    galloping: { icon: Flame, label: "Full Gallop" },
    standing: { icon: Crown, label: "Noble Standing" },
    charging: { icon: Target, label: "Charging Forward" },
    howling: { icon: Stars, label: "Pack Call" },
    prowling: { icon: Eye, label: "Prowling Hunt" },
    pack: { icon: Heart, label: "Pack Unity" },
    alpha: { icon: Crown, label: "Alpha Leader" },
    roaring: { icon: Bolt, label: "Mighty Roar" },
    stalking: { icon: Target, label: "Stealth Mode" },
    resting: { icon: Mountain, label: "Regal Rest" },
    pouncing: { icon: Flame, label: "Attack Pounce" }
  };

  const generateMascot = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 4000));
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Wand2 className="w-16 h-16 mx-auto mb-4 text-purple-300" />
            <h1 className="text-5xl font-black text-white mb-4">
              AI MASCOT DESIGNER
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Create stunning, personalized school mascots that capture your institution's spirit, 
              values, and championship attitude with cutting-edge AI technology.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* School Selection & Controls */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                <Crown className="w-6 h-6 text-purple-400" />
                Select School & Mascot
              </h2>
              
              <div className="grid gap-4">
                {demoSchools.map((school, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setSelectedSchool(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-6 rounded-xl border-2 transition-all text-left ${
                      selectedSchool === index
                        ? 'border-purple-400 bg-purple-500/10'
                        : 'border-white/20 bg-white/5 hover:border-white/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold">{school.name}</h3>
                      {selectedSchool === index && (
                        <Crown className="w-6 h-6 text-purple-400" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-lg font-bold text-purple-300">{school.mascot}</span>
                      <div className="flex gap-2">
                        <div 
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: school.colors.primary }}
                        />
                        <div 
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: school.colors.secondary }}
                        />
                      </div>
                    </div>
                    <p className="text-sm text-white/70 mb-2">{school.description}</p>
                    <p className="text-xs text-purple-300 font-medium">Personality: {school.personality}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Pose Selection */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-400" />
                Select Mascot Pose
              </h3>
              
              <div className="grid grid-cols-2 gap-3">
                {currentSchool.poses.map((pose) => {
                  const PoseIcon = poses[pose]?.icon || Trophy;
                  return (
                    <button
                      key={pose}
                      onClick={() => setSelectedPose(pose)}
                      className={`p-4 rounded-lg border transition-all flex items-center gap-3 ${
                        selectedPose === pose
                          ? 'border-purple-400 bg-purple-500/20'
                          : 'border-white/20 bg-white/5 hover:border-white/40'
                      }`}
                    >
                      <PoseIcon className="w-5 h-5 text-purple-400" />
                      <span className="text-sm font-medium">{poses[pose]?.label || pose}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Customization */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5 text-purple-400" />
                School Colors
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-white/20"
                    style={{ backgroundColor: currentSchool.colors.primary }}
                  />
                  <span className="text-xs text-white/70">Primary</span>
                </div>
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-white/20"
                    style={{ backgroundColor: currentSchool.colors.secondary }}
                  />
                  <span className="text-xs text-white/70">Secondary</span>
                </div>
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-2 border-4 border-white/20"
                    style={{ backgroundColor: currentSchool.colors.accent }}
                  />
                  <span className="text-xs text-white/70">Accent</span>
                </div>
              </div>
            </div>

            {/* Characteristics */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Stars className="w-5 h-5 text-purple-400" />
                Mascot Characteristics
              </h3>
              
              <div className="space-y-2">
                {currentSchool.characteristics.map((characteristic, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <span className="text-white/90">{characteristic}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <motion.button
              onClick={generateMascot}
              disabled={isGenerating}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-full py-6 rounded-xl font-black text-xl flex items-center justify-center gap-4 transition-all ${
                isGenerating
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-2xl hover:shadow-purple-500/30'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                  AI DESIGNING MASCOT...
                </>
              ) : (
                <>
                  <Wand2 className="w-6 h-6" />
                  GENERATE AI MASCOT
                  <Sparkles className="w-6 h-6" />
                </>
              )}
            </motion.button>
          </div>

          {/* Mascot Preview */}
          <div className="sticky top-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedSchool}-${selectedPose}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative"
              >
                {/* Mascot Display */}
                <div 
                  className="relative w-full aspect-square rounded-3xl overflow-hidden border-4 p-8"
                  style={{ 
                    borderColor: currentSchool.colors.primary,
                    background: `linear-gradient(135deg, ${currentSchool.colors.primary}20, ${currentSchool.colors.secondary}20)` 
                  }}
                >
                  {/* Background Elements */}
                  <div className="absolute inset-0">
                    <div className="absolute top-4 left-4 right-4 text-center">
                      <div 
                        className="inline-block px-4 py-2 rounded-full text-sm font-bold"
                        style={{ backgroundColor: currentSchool.colors.primary, color: 'white' }}
                      >
                        {currentSchool.name.toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4 text-center">
                      <h2 className="text-3xl font-black text-white mb-2">
                        {currentSchool.mascot.toUpperCase()}
                      </h2>
                      <p className="text-sm font-bold" style={{ color: currentSchool.colors.secondary }}>
                        {poses[selectedPose]?.label || selectedPose}
                      </p>
                    </div>
                  </div>

                  {/* Mascot Placeholder */}
                  <div className="absolute inset-8 flex items-center justify-center">
                    <div 
                      className="w-48 h-48 rounded-full border-4 flex items-center justify-center"
                      style={{ 
                        borderColor: currentSchool.colors.secondary,
                        backgroundColor: `${currentSchool.colors.primary}60`
                      }}
                    >
                      {currentSchool.mascot.includes('Eagle') && <Bird className="w-24 h-24 text-white" />}
                      {currentSchool.mascot.includes('Mustang') && <Bolt className="w-24 h-24 text-white" />}
                      {currentSchool.mascot.includes('Wolves') && <Eye className="w-24 h-24 text-white" />}
                      {currentSchool.mascot.includes('Lions') && <Crown className="w-24 h-24 text-white" />}
                    </div>
                  </div>

                  {/* Generation Overlay */}
                  {isGenerating && (
                    <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4" />
                        <p className="text-xl font-bold">AI Designing...</p>
                        <p className="text-white/70">Creating your {currentSchool.mascot} mascot</p>
                      </div>
                    </div>
                  )}

                  {/* Design Elements */}
                  <div className="absolute top-6 right-6">
                    <Sparkles className="w-6 h-6 text-white/40 animate-pulse" />
                  </div>
                  <div className="absolute bottom-20 left-6">
                    <Stars className="w-4 h-4 text-white/30 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                  <div className="absolute top-20 left-8">
                    <Zap className="w-5 h-5 text-white/30 animate-pulse" style={{ animationDelay: '1s' }} />
                  </div>
                </div>

                {/* Action Buttons */}
                {!isGenerating && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 grid grid-cols-3 gap-4"
                  >
                    <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                      <Download className="w-4 h-4" />
                      <span className="text-sm font-bold">Download</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 px-4 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                      <Share className="w-4 h-4" />
                      <span className="text-sm font-bold">Share</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 py-3 px-4 bg-purple-500/20 hover:bg-purple-500/30 rounded-xl transition-all">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-bold">Preview</span>
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mt-24 text-center">
          <h2 className="text-4xl font-black mb-8">Bring Your School Spirit to Life</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 p-8 rounded-xl">
              <Wand2 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">AI-Powered Design</h3>
              <p className="text-white/70">Advanced artificial intelligence creates unique, professional mascots that perfectly represent your school's character and values.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Palette className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Full Customization</h3>
              <p className="text-white/70">Personalize every detail from colors and poses to personality traits, ensuring your mascot is truly one-of-a-kind.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-xl">
              <Crown className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-4">Professional Quality</h3>
              <p className="text-white/70">High-resolution designs ready for merchandise, marketing materials, and digital platforms across your entire athletic program.</p>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-16 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-2xl p-8">
          <h3 className="text-2xl font-black text-center mb-8">Complete Mascot Ecosystem</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Trophy className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Multiple Poses</h4>
              <p className="text-sm text-white/70">Victory, action, defensive, and celebration poses</p>
            </div>
            <div className="text-center">
              <Palette className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Brand Integration</h4>
              <p className="text-sm text-white/70">Seamless integration with school colors and branding</p>
            </div>
            <div className="text-center">
              <Share className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Multi-Format Export</h4>
              <p className="text-sm text-white/70">Ready for print, digital, and merchandise applications</p>
            </div>
            <div className="text-center">
              <Sparkles className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Animated Versions</h4>
              <p className="text-sm text-white/70">Dynamic animations for digital displays and social media</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Link
            href="/stadium/create"
            className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl hover:shadow-purple-500/30"
          >
            <Crown className="w-7 h-7" />
            Create Your School's Digital Identity
            <ArrowRight className="w-7 h-7" />
          </Link>
        </div>
      </div>
    </div>
  );
}