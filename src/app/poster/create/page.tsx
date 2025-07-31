'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Download, Trophy, Zap, 
  ArrowLeft, Sparkles, Crown,
  Instagram, Facebook, Twitter, Copy, Check
} from 'lucide-react';
import GageAIChat from '../../../components/GageAIChat';

interface PosterTemplate {
  id: string;
  name: string;
  category: 'achievement' | 'event' | 'milestone' | 'motivation';
  description: string;
  thumbnail: string;
  hypeReward: number;
}

interface PosterData {
  template: string;
  title: string;
  subtitle: string;
  school: string;
  colors: {
    primary: string;
    secondary: string;
  };
  achievement?: string;
  stats?: Record<string, string>;
}

const POSTER_TEMPLATES: PosterTemplate[] = [
  {
    id: 'achievement_basic',
    name: 'Achievement Celebration',
    category: 'achievement',
    description: 'Celebrate your latest accomplishment!',
    thumbnail: '/herocard-1.png',
    hypeReward: 30
  },
  {
    id: 'game_day',
    name: 'Game Day Hype',
    category: 'event',
    description: 'Build excitement for upcoming games!',
    thumbnail: '/herocard-2.png',
    hypeReward: 25
  },
  {
    id: 'milestone_reached',
    name: 'Milestone Moment',
    category: 'milestone',
    description: 'Mark major achievements in your journey!',
    thumbnail: '/herocard-3.png',
    hypeReward: 40
  },
  {
    id: 'motivation_boost',
    name: 'Motivation Station',
    category: 'motivation',
    description: 'Inspire yourself and others!',
    thumbnail: '/herocard-4.png',
    hypeReward: 20
  },
  {
    id: 'recruitment_ready',
    name: 'Recruitment Spotlight',
    category: 'achievement',
    description: 'Showcase your skills to recruiters!',
    thumbnail: '/herocard-5.png',
    hypeReward: 50
  },
  {
    id: 'team_spirit',
    name: 'Team Unity',
    category: 'event',
    description: 'Show your team pride and spirit!',
    thumbnail: '/herocard-6.png',
    hypeReward: 35
  }
];

export default function PosterCreatePage() {
  const [step, setStep] = useState<'template' | 'customize' | 'preview' | 'share'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<PosterTemplate | null>(null);
  const [posterData, setPosterData] = useState<PosterData>({
    template: '',
    title: '',
    subtitle: '',
    school: '',
    colors: {
      primary: '#F59E0B',
      secondary: '#F97316'
    }
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPoster, setGeneratedPoster] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied'>('idle');

  const handleTemplateSelect = (template: PosterTemplate) => {
    setSelectedTemplate(template);
    setPosterData(prev => ({
      ...prev,
      template: template.id
    }));
    setStep('customize');
  };

  const handleGeneratePoster = async () => {
    setIsGenerating(true);
    
    try {
      // Award HYPE for poster creation
      await fetch('/api/hype', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 'current_user', // In production, get from session
          activity: 'poster_created'
        })
      });

      // Simulate poster generation (in production, use AI service)
      setTimeout(() => {
        setGeneratedPoster(selectedTemplate?.thumbnail || '/herocard-1.png');
        setIsGenerating(false);
        setStep('preview');
      }, 3000);
      
    } catch (error) {
      console.error('Failed to generate poster:', error);
      setIsGenerating(false);
    }
  };

  const handleShare = async (platform: string) => {
    if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(window.location.origin + generatedPoster);
        setShareStatus('copied');
        setTimeout(() => setShareStatus('idle'), 2000);
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    } else {
      // In production, integrate with social media APIs
      console.log(`Sharing to ${platform}`);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Stadium Background */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/stadium-crowd-energy.jpg')`,
          backgroundAttachment: 'scroll',
          backgroundPosition: 'center top',
          backgroundSize: '120% auto',
          filter: 'grayscale(100%) contrast(1.2) brightness(0.3) blur(3px)',
          WebkitFilter: 'grayscale(100%) contrast(1.2) brightness(0.3) blur(3px)'
        }}
      />
      
      {/* Enhanced dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/10 bg-black/20 backdrop-blur-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-4">
                <Link href="/dashboard" className="text-[#F59E0B] hover:text-[#F97316] transition-colors">
                  <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="text-white/60">|</div>
                <h1 className="text-white font-bold text-xl">Poster Creator</h1>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex text-white/60 text-sm">
                  Step {step === 'template' ? '1' : step === 'customize' ? '2' : step === 'preview' ? '3' : '4'} of 4
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Step 1: Template Selection */}
          {step === 'template' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="mb-8">
                <h2 className="text-4xl font-black text-white mb-4">
                  Create Your <span className="text-[#F59E0B]">ULTRA</span> Poster
                </h2>
                <p className="text-white/70 text-lg max-w-2xl mx-auto">
                  Share your achievements, celebrate milestones, and inspire your community with AI-powered poster creation!
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {POSTER_TEMPLATES.map((template) => (
                  <motion.div
                    key={template.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTemplateSelect(template)}
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 cursor-pointer hover:border-[#F59E0B]/50 transition-all duration-200 group"
                  >
                    <div className="aspect-[3/4] bg-white/5 rounded-xl mb-4 overflow-hidden">
                      <img 
                        src={template.thumbnail} 
                        alt={template.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    
                    <h3 className="text-white font-bold text-lg mb-2">{template.name}</h3>
                    <p className="text-white/60 text-sm mb-3">{template.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-[#F59E0B]/20 text-[#F59E0B] text-xs font-medium rounded-full">
                        {template.category}
                      </span>
                      <div className="flex items-center gap-1 text-[#F59E0B] text-sm">
                        <Zap className="w-4 h-4" />
                        <span>+{template.hypeReward}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Customize */}
          {step === 'customize' && selectedTemplate && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="grid lg:grid-cols-2 gap-8"
            >
              {/* Customization Form */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-black text-white mb-2">Customize Your Poster</h2>
                  <p className="text-white/70">Make it uniquely yours!</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">Poster Title</label>
                    <input
                      type="text"
                      value={posterData.title}
                      onChange={(e) => setPosterData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Amazing Achievement Unlocked!"
                      className="w-full bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F59E0B] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={posterData.subtitle}
                      onChange={(e) => setPosterData(prev => ({ ...prev, subtitle: e.target.value }))}
                      placeholder="Keep grinding, champions!"
                      className="w-full bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F59E0B] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">School Name</label>
                    <input
                      type="text"
                      value={posterData.school}
                      onChange={(e) => setPosterData(prev => ({ ...prev, school: e.target.value }))}
                      placeholder="Your High School"
                      className="w-full bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F59E0B] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Achievement (Optional)</label>
                    <input
                      type="text"
                      value={posterData.achievement || ''}
                      onChange={(e) => setPosterData(prev => ({ ...prev, achievement: e.target.value }))}
                      placeholder="MVP Award, Conference Champions, etc."
                      className="w-full bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-[#F59E0B] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Primary Color</label>
                      <input
                        type="color"
                        value={posterData.colors.primary}
                        onChange={(e) => setPosterData(prev => ({ 
                          ...prev, 
                          colors: { ...prev.colors, primary: e.target.value }
                        }))}
                        className="w-full h-12 bg-white/10 border border-white/20 rounded-xl cursor-pointer"
                      />
                    </div>
                    <div>
                      <label className="block text-white font-medium mb-2">Secondary Color</label>
                      <input
                        type="color"
                        value={posterData.colors.secondary}
                        onChange={(e) => setPosterData(prev => ({ 
                          ...prev, 
                          colors: { ...prev.colors, secondary: e.target.value }
                        }))}
                        className="w-full h-12 bg-white/10 border border-white/20 rounded-xl cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep('template')}
                    className="flex-1 px-6 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-colors"
                  >
                    Back to Templates
                  </button>
                  <button
                    onClick={handleGeneratePoster}
                    disabled={!posterData.title || !posterData.school}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-bold rounded-xl hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    Generate Poster
                  </button>
                </div>
              </div>

              {/* Preview */}
              <div className="space-y-4">
                <h3 className="text-white font-bold text-xl">Live Preview</h3>
                <div className="aspect-[3/4] bg-white/5 rounded-xl border border-white/20 overflow-hidden">
                  <div 
                    className="w-full h-full relative"
                    style={{
                      background: `linear-gradient(135deg, ${posterData.colors.primary}, ${posterData.colors.secondary})`
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                      <div>
                        <h4 className="text-2xl font-black mb-2">
                          {posterData.title || 'Your Title Here'}
                        </h4>
                        <p className="text-lg opacity-90">
                          {posterData.subtitle || 'Your subtitle here'}
                        </p>
                      </div>
                      
                      <div>
                        {posterData.achievement && (
                          <div className="bg-white/20 rounded-lg p-3 mb-4">
                            <div className="flex items-center gap-2 mb-1">
                              <Trophy className="w-5 h-5" />
                              <span className="font-bold">Achievement</span>
                            </div>
                            <p>{posterData.achievement}</p>
                          </div>
                        )}
                        
                        <div className="text-center">
                          <p className="text-xl font-bold">{posterData.school || 'Your School'}</p>
                          <div className="flex items-center justify-center gap-2 mt-2">
                            <Crown className="w-5 h-5" />
                            <span className="text-sm">ULTRAPREPS</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Preview & Generate */}
          {step === 'preview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              {isGenerating ? (
                <div className="space-y-6">
                  <div className="w-24 h-24 border-4 border-[#F59E0B] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <h2 className="text-3xl font-black text-white">Creating Your ULTRA Poster</h2>
                  <p className="text-white/70">Our AI is crafting something amazing...</p>
                  <div className="flex items-center justify-center gap-2 text-[#F59E0B]">
                    <Sparkles className="w-5 h-5" />
                    <span>+{selectedTemplate?.hypeReward} HYPE will be awarded!</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <h2 className="text-3xl font-black text-white mb-4">Your Poster is Ready!</h2>
                  
                  <div className="max-w-md mx-auto">
                    <div className="aspect-[3/4] bg-white/5 rounded-xl border border-white/20 overflow-hidden mb-6">
                      {generatedPoster && (
                        <img 
                          src={generatedPoster} 
                          alt="Generated Poster"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={() => setStep('customize')}
                      className="px-6 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-colors"
                    >
                      Edit Poster
                    </button>
                    <button
                      onClick={() => setStep('share')}
                      className="px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-bold rounded-xl hover:scale-105 transition-transform duration-200"
                    >
                      Share Your Creation
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 4: Share */}
          {step === 'share' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-8"
            >
              <div>
                <h2 className="text-3xl font-black text-white mb-4">Share Your ULTRA Poster!</h2>
                <p className="text-white/70">Show the world your achievements!</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <button
                  onClick={() => handleShare('instagram')}
                  className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl hover:scale-105 transition-transform duration-200"
                >
                  <Instagram className="w-8 h-8" />
                  <span className="font-medium">Instagram</span>
                </button>

                <button
                  onClick={() => handleShare('facebook')}
                  className="flex flex-col items-center gap-3 p-6 bg-blue-600 text-white rounded-xl hover:scale-105 transition-transform duration-200"
                >
                  <Facebook className="w-8 h-8" />
                  <span className="font-medium">Facebook</span>
                </button>

                <button
                  onClick={() => handleShare('twitter')}
                  className="flex flex-col items-center gap-3 p-6 bg-blue-400 text-white rounded-xl hover:scale-105 transition-transform duration-200"
                >
                  <Twitter className="w-8 h-8" />
                  <span className="font-medium">Twitter</span>
                </button>

                <button
                  onClick={() => handleShare('copy')}
                  className="flex flex-col items-center gap-3 p-6 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-colors"
                >
                  {shareStatus === 'copied' ? (
                    <Check className="w-8 h-8 text-green-400" />
                  ) : (
                    <Copy className="w-8 h-8" />
                  )}
                  <span className="font-medium">
                    {shareStatus === 'copied' ? 'Copied!' : 'Copy Link'}
                  </span>
                </button>
              </div>

              <div className="space-y-4">
                <button className="px-8 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-colors">
                  <Download className="w-5 h-5 inline-block mr-2" />
                  Download High Quality
                </button>
                
                <div className="text-sm text-white/60">
                  Your poster has been saved to your UltraPreps profile!
                </div>
              </div>

              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-bold rounded-xl hover:scale-105 transition-transform duration-200"
              >
                Back to Dashboard
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </Link>
            </motion.div>
          )}
        </main>
      </div>

      {/* Gage AI Chat */}
      <GageAIChat
        userId="current_user"
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
}