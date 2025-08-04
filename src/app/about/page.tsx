'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Trophy, Users, Zap, Target, Crown, Star,
  Heart, Brain, Shield, Globe, Rocket, Award,
  TrendingUp, Building, Camera, Video
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-600/20 via-black/90 to-orange-600/20 border-b border-yellow-500/30 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            THE FUTURE OF
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
              ATHLETIC EXCELLENCE
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed">
            UltraPreps is revolutionizing how athletes build their digital legacy, connect with opportunities, 
            and unlock their full potential through AI-powered insights and professional-grade content creation.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Mission Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              To democratize athletic excellence by giving every athlete, regardless of background, 
              access to professional-grade tools, AI insights, and opportunities that were once 
              reserved for elite programs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
              <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Excellence for All</h3>
              <p className="text-white/70">
                Every athlete deserves access to the same tools and opportunities as elite programs. 
                We're leveling the playing field.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
              <Brain className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Insights</h3>
              <p className="text-white/70">
                Advanced artificial intelligence analyzes performance, predicts outcomes, 
                and provides personalized recommendations for improvement.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
              <Heart className="w-16 h-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Community First</h3>
              <p className="text-white/70">
                Building stronger connections between athletes, families, coaches, and communities 
                through shared experiences and achievements.
              </p>
            </div>
          </div>
        </div>

        {/* What We Do */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">What We Do</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Professional Content Creation</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Camera className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <div className="text-white font-semibold">ESPN-Grade HeroCards</div>
                    <div className="text-white/70">Professional athlete trading cards with real-time stats</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Video className="w-6 h-6 text-blue-400 mt-1" />
                  <div>
                    <div className="text-white font-semibold">Highlight Reels</div>
                    <div className="text-white/70">AI-generated video packages for recruiting and social media</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Building className="w-6 h-6 text-green-400 mt-1" />
                  <div>
                    <div className="text-white font-semibold">Digital Stadiums</div>
                    <div className="text-white/70">Personal sports universes with live updates and fan engagement</div>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white mb-6">AI-Powered Analytics</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-purple-400 mt-1" />
                  <div>
                    <div className="text-white font-semibold">Performance Analysis</div>
                    <div className="text-white/70">Deep insights into strengths, weaknesses, and improvement areas</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-6 h-6 text-orange-400 mt-1" />
                  <div>
                    <div className="text-white font-semibold">Recruiting Intelligence</div>
                    <div className="text-white/70">Smart matching with college programs and scholarship opportunities</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-yellow-400 mt-1" />
                  <div>
                    <div className="text-white font-semibold">Real-Time HYPE</div>
                    <div className="text-white/70">Community engagement metrics that boost visibility and opportunities</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Impact</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">50K+</div>
              <div className="text-white/60">Athletes Empowered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">1.2M</div>
              <div className="text-white/60">HeroCards Created</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">500+</div>
              <div className="text-white/60">Schools Connected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">$2.4M</div>
              <div className="text-white/60">NIL Deals Facilitated</div>
            </div>
          </div>
        </div>

        {/* Team Values */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Our Values</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Integrity</h3>
              <p className="text-white/70 text-sm">
                Honest, transparent, and ethical in everything we do
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <Rocket className="w-12 h-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Innovation</h3>
              <p className="text-white/70 text-sm">
                Pushing boundaries with cutting-edge technology
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Community</h3>
              <p className="text-white/70 text-sm">
                Building stronger connections and support networks
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Excellence</h3>
              <p className="text-white/70 text-sm">
                Relentless pursuit of the highest standards
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Powered by Advanced Technology</h2>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">Artificial Intelligence</h3>
                <p className="text-white/70">
                  GPT-4 powered analysis, computer vision for video processing, 
                  and machine learning for performance prediction.
                </p>
              </div>
              
              <div className="text-center">
                <Globe className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">Real-Time Data</h3>
                <p className="text-white/70">
                  Live statistics integration, social media monitoring, 
                  and instant updates across all platforms.
                </p>
              </div>
              
              <div className="text-center">
                <Shield className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">Enterprise Security</h3>
                <p className="text-white/70">
                  Bank-grade encryption, GDPR compliance, 
                  and robust privacy protection for all users.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Athletic Journey?</h2>
          <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
            Join thousands of athletes who are already using UltraPreps to showcase their talent, 
            connect with opportunities, and build their digital legacy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/stadium/create"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 rounded-lg transition-colors"
            >
              Create Your Stadium
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-lg border border-white/20 transition-colors"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}