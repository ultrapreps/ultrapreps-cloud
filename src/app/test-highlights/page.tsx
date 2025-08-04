'use client';

import React from 'react';
import HighlightText, { GoldHighlight, BlueHighlight, GreenHighlight } from '../../components/HighlightText';
import { Star, Trophy, Crown } from 'lucide-react';

export default function TestHighlights() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">
            HIGHLIGHT METHOD TEST
          </h1>
          <p className="text-white/70">Testing the fixed highlight method across different components</p>
        </div>

        <div className="space-y-8">
          {/* Basic Highlight Test */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-400" />
              Basic Highlight Test
            </h2>
            <p className="text-lg leading-relaxed">
              <HighlightText>
                Watch young athletes get **personally mentored by LeBron, Megan Rapinoe, and Usain Bolt**. 
                This isn't just inspiration - it's **direct access to greatness** that transforms careers.
              </HighlightText>
            </p>
          </div>

          {/* Colored Highlights */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-blue-400" />
              Colored Highlight Variants
            </h2>
            <div className="space-y-4">
              <p className="text-lg">
                <GoldHighlight>
                  Watch real families build **multi-million dollar empires** through strategic sports optimization.
                </GoldHighlight>
              </p>
              <p className="text-lg">
                <BlueHighlight>
                  See the **actual neural network operations** creating teenage millionaires.
                </BlueHighlight>
              </p>
              <p className="text-lg">
                <GreenHighlight>
                  These aren't just scholarships - they're **family salvation moments**.
                </GreenHighlight>
              </p>
            </div>
          </div>

          {/* Complex Text */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Crown className="w-6 h-6 text-purple-400" />
              Complex Highlight Examples
            </h2>
            <div className="space-y-4">
              <p className="text-lg leading-relaxed">
                <HighlightText>
                  Watch AI **negotiate million-dollar contracts** for teenage athletes. See the exact
                  process that turns high school talent into **$500K+ annual empires**.
                </HighlightText>
              </p>
              <p className="text-lg leading-relaxed">
                <HighlightText>
                  Watch young athletes become **community transformation leaders** who create lasting change.
                  This isn't just sports - it's **social impact** that builds legacies beyond trophies.
                </HighlightText>
              </p>
              <p className="text-lg leading-relaxed">
                <HighlightText>
                  Watch real families go from **academic struggle** to **$250,000+ scholarships**
                  in 18 months. This isn't tutoring - it's **destiny transformation**.
                </HighlightText>
              </p>
            </div>
          </div>

          {/* Inline Custom Styling */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Custom Styled Highlights</h2>
            <div className="space-y-4">
              <p className="text-lg">
                <HighlightText highlightClass="text-red-400 font-bold bg-red-500/20 px-2 py-1 rounded">
                  This is **custom red highlighting** with background and padding.
                </HighlightText>
              </p>
              <p className="text-lg">
                <HighlightText highlightClass="text-green-400 font-bold underline">
                  This is **underlined green highlighting** for emphasis.
                </HighlightText>
              </p>
              <p className="text-lg">
                <HighlightText highlightClass="text-purple-400 font-bold text-xl">
                  This is **larger purple highlighting** that stands out.
                </HighlightText>
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-green-400 mb-2">
              ✅ HIGHLIGHT METHOD WORKING!
            </h2>
            <p className="text-green-300">
              All **highlighted text** should now render with proper styling across the entire site.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}