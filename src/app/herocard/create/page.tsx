'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  User, Download, Share2, Zap, Star, 
  ArrowLeft, Sparkles, Crown, Upload, Check
} from 'lucide-react';
import GageAIChat from '../../../components/GageAIChat';
import HypeWidget from '../../../components/HypeWidget';
import MegaNavigation from '../../../components/MegaNavigation';

interface HeroCardData {
  // Student Info
  athleteName: string;
  school: string;
  classYear: string;
  sport?: string;
  jerseyNumber?: string;
  
  // Selfie
  selfie?: File | null;
  
  // Generated Data (from AI)
  mascot?: string;
  schoolColors?: [string, string];
  roles?: Array<{
    type: string;
    position: string;
    stats?: Record<string, string | number>;
  }>;
  stats?: {
    receptions?: number;
    yards?: number;
    touchdowns?: number;
  };
  hypeScore?: number;
  overlays?: string[];
  avatarMode?: boolean;
  chainOfCustody?: string;
  
  // Visual HeroCard URLs
  heroCardUrl?: string;
  studentPortraitUrl?: string;
  mascotUrl?: string;
  validation?: any;
  status?: string;
}

export default function HeroCardCreatePage() {
  const [step, setStep] = useState<'info' | 'selfie' | 'generating' | 'preview'>('info');
  const [heroCardData, setHeroCardData] = useState<HeroCardData>({
    athleteName: '',
    school: '',
    classYear: '2025',
    sport: 'Football',
    jerseyNumber: '',
    selfie: null
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [generatedCard, setGeneratedCard] = useState<HeroCardData | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setHeroCardData(prev => ({ ...prev, selfie: file }));
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleGenerateHeroCard = async () => {
    setStep('generating');
    
    try {
      // Prepare form data for selfie upload
      const formData = new FormData();
      formData.append('athleteName', heroCardData.athleteName);
      formData.append('school', heroCardData.school);
      formData.append('classYear', heroCardData.classYear);
      
      if (heroCardData.selfie) {
        formData.append('selfie', heroCardData.selfie);
      }

      // Call the HeroCard API following ULTRAPREPS_PROMPT_BIBLE_V3.0
      const response = await fetch('/api/enrich-school', {
        method: 'POST',
        body: JSON.stringify({
          athleteName: heroCardData.athleteName,
          school: heroCardData.school,
          classYear: heroCardData.classYear,
          sport: heroCardData.sport || 'Football',
          jerseyNumber: heroCardData.jerseyNumber || '6',
          selfie: previewUrl // In production, handle file upload properly
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const cardData = await response.json();
        console.log('HeroCard API Response:', cardData);
        setGeneratedCard(cardData);
        
        // Award HYPE for HeroCard creation
        await fetch('/api/hype', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: heroCardData.athleteName.toLowerCase().replace(/\s+/g, '_'),
            activity: 'profile_completed'
          })
        });
        
        setStep('preview');
      } else {
        console.error('Failed to generate HeroCard:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error details:', errorText);
      }
    } catch (error) {
      console.error('Error generating HeroCard:', error);
    }
  };

  const handleDownload = () => {
    if (generatedCard?.heroCardUrl) {
      // Create a link element to download the image
      const link = document.createElement('a');
      link.href = generatedCard.heroCardUrl;
      link.download = `${heroCardData.athleteName.replace(/\s+/g, '_')}_HeroCard.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = (platform: string) => {
    // In production, implement social media sharing
    console.log(`Sharing to ${platform}`);
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
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/90" />
      <div className="absolute inset-0 bg-black/40" />

      {/* Navigation */}
      <MegaNavigation currentPage="herocard-create" userRole="student" userName="Create HeroCard" />

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
                <h1 className="text-white font-bold text-xl">HeroCard Creator</h1>
              </div>
              
              <div className="flex items-center gap-4">
                <HypeWidget userId={heroCardData.athleteName.toLowerCase().replace(/\s+/g, '_') || 'guest'} compact />
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Step 1: Basic Info */}
          {step === 'info' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-4xl font-black text-white mb-4">
                  Create Your <span className="text-[#F59E0B]">HERO</span>Card
                </h2>
                <p className="text-white/70 text-lg max-w-2xl mx-auto">
                  Your digital identity that showcases your achievements and helps you stand out to recruiters, coaches, and your community!
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 max-w-2xl mx-auto">
                <div className="space-y-6">
                  <div>
                    <label className="block text-white font-medium mb-3">Your Full Name</label>
                    <input
                      type="text"
                      value={heroCardData.athleteName}
                      onChange={(e) => setHeroCardData(prev => ({ ...prev, athleteName: e.target.value }))}
                      placeholder="Enter your full name"
                      className="w-full bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-xl px-4 py-4 text-lg focus:outline-none focus:border-[#F59E0B] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-3">School Name</label>
                    <input
                      type="text"
                      value={heroCardData.school}
                      onChange={(e) => setHeroCardData(prev => ({ ...prev, school: e.target.value }))}
                      placeholder="Enter your school name"
                      className="w-full bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-xl px-4 py-4 text-lg focus:outline-none focus:border-[#F59E0B] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-3">Graduation Year</label>
                    <select
                      value={heroCardData.classYear}
                      onChange={(e) => setHeroCardData(prev => ({ ...prev, classYear: e.target.value }))}
                      className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-4 text-lg focus:outline-none focus:border-[#F59E0B] transition-colors"
                    >
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white font-medium mb-3">Primary Sport</label>
                      <select
                        value={heroCardData.sport}
                        onChange={(e) => setHeroCardData(prev => ({ ...prev, sport: e.target.value }))}
                        className="w-full bg-white/10 text-white border border-white/20 rounded-xl px-4 py-4 text-lg focus:outline-none focus:border-[#F59E0B] transition-colors"
                      >
                        <option value="Football">Football</option>
                        <option value="Basketball">Basketball</option>
                        <option value="Baseball">Baseball</option>
                        <option value="Soccer">Soccer</option>
                        <option value="Track">Track & Field</option>
                        <option value="Wrestling">Wrestling</option>
                        <option value="Volleyball">Volleyball</option>
                        <option value="Softball">Softball</option>
                        <option value="Tennis">Tennis</option>
                        <option value="Golf">Golf</option>
                        <option value="Swimming">Swimming</option>
                        <option value="Cross Country">Cross Country</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-3">Jersey Number</label>
                      <input
                        type="text"
                        value={heroCardData.jerseyNumber}
                        onChange={(e) => setHeroCardData(prev => ({ ...prev, jerseyNumber: e.target.value }))}
                        placeholder="e.g., 6"
                        className="w-full bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-xl px-4 py-4 text-lg focus:outline-none focus:border-[#F59E0B] transition-colors"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => setStep('selfie')}
                    disabled={!heroCardData.athleteName || !heroCardData.school}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-bold text-lg rounded-xl hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    Continue to Photo Upload
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Selfie Upload */}
          {step === 'selfie' && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-3xl font-black text-white mb-4">Add Your Photo</h2>
                <p className="text-white/70">Upload a clear photo or we&apos;ll create an awesome avatar for you!</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Upload Area */}
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                    <div className="text-center">
                      <label className="cursor-pointer block">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <div className="border-2 border-dashed border-white/30 rounded-xl p-8 hover:border-[#F59E0B]/50 transition-colors">
                          <Upload className="w-12 h-12 text-white/60 mx-auto mb-4" />
                          <p className="text-white font-medium mb-2">Click to upload your photo</p>
                          <p className="text-white/60 text-sm">JPG, PNG up to 10MB</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-white/60 text-sm mb-4">Don&apos;t have a photo ready?</p>
                    <button
                      onClick={() => {
                        setHeroCardData(prev => ({ ...prev, selfie: null }));
                        setPreviewUrl(null);
                        handleGenerateHeroCard();
                      }}
                      className="px-6 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-colors"
                    >
                      Skip - Create Avatar Mode
                    </button>
                  </div>
                </div>

                {/* Preview */}
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <h3 className="text-white font-bold text-lg mb-4">Preview</h3>
                    <div className="aspect-[3/4] bg-white/5 rounded-xl border border-white/20 overflow-hidden">
                      {previewUrl ? (
                        <img 
                          src={previewUrl} 
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="text-center">
                            <User className="w-16 h-16 text-white/40 mx-auto mb-4" />
                            <p className="text-white/60">Your photo will appear here</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {previewUrl && (
                    <button
                      onClick={handleGenerateHeroCard}
                      className="w-full px-6 py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white font-bold text-lg rounded-xl hover:scale-105 transition-transform duration-200"
                    >
                      Generate My HeroCard
                    </button>
                  )}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setStep('info')}
                  className="px-6 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-colors"
                >
                  Back to Info
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Generating */}
          {step === 'generating' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-8"
            >
              <div className="w-32 h-32 border-4 border-[#F59E0B] border-t-transparent rounded-full animate-spin mx-auto"></div>
              
              <div>
                <h2 className="text-4xl font-black text-white mb-4">Creating Your HeroCard</h2>
                <p className="text-white/70 text-lg mb-6">Our AI is researching your school, analyzing your profile, and crafting something incredible...</p>
                
                <div className="space-y-4 max-w-md mx-auto">
                  <div className="flex items-center gap-3 text-white/80">
                    <Check className="w-5 h-5 text-green-400" />
                    <span>Researching school data...</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/80">
                    <div className="w-5 h-5 border-2 border-[#F59E0B] border-t-transparent rounded-full animate-spin"></div>
                    <span>Generating Visual DNA...</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <div className="w-5 h-5 border-2 border-white/30 rounded-full"></div>
                    <span>Creating your unique profile...</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-[#F59E0B]">
                <Sparkles className="w-6 h-6" />
                <span className="text-lg font-bold">+50 HYPE will be awarded!</span>
              </div>
            </motion.div>
          )}

          {/* Step 4: Preview & Share */}
          {step === 'preview' && generatedCard && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="text-center">
                <h2 className="text-4xl font-black text-white mb-4">Your HeroCard is Ready!</h2>
                <p className="text-white/70">Share it with the world and show everyone what makes you special!</p>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* HeroCard Preview */}
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    {generatedCard.heroCardUrl ? (
                      // Display the actual generated HeroCard
                      <div className="aspect-[3/4] rounded-xl overflow-hidden relative">
                        <img 
                          src={generatedCard.heroCardUrl} 
                          alt={`${generatedCard.athleteName} HeroCard`}
                          className="w-full h-full object-cover"
                        />
                        {generatedCard.status === 'needs_review' && (
                          <div className="absolute top-4 right-4 bg-yellow-500/90 text-black px-3 py-1 rounded-full text-sm font-bold">
                            Needs Review
                          </div>
                        )}
                      </div>
                    ) : (
                      // Fallback to mock design if no URL
                      <div className="aspect-[3/4] bg-gradient-to-br from-[#1E3A8A] to-[#F59E0B] rounded-xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-black/20"></div>
                        
                        {/* HeroCard Content */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                          <div>
                            <h3 className="text-2xl font-black mb-1">{generatedCard.athleteName}</h3>
                            <p className="text-lg opacity-90">{generatedCard.school}</p>
                            <p className="text-sm opacity-80">Class of {generatedCard.classYear}</p>
                          </div>
                          
                          <div className="space-y-3">
                            {generatedCard.mascot && (
                              <div className="bg-white/20 rounded-lg p-3">
                                <div className="flex items-center gap-2">
                                  <Crown className="w-5 h-5" />
                                  <span className="font-bold">{generatedCard.mascot}</span>
                                </div>
                              </div>
                            )}
                            
                            {generatedCard.stats && (
                              <div className="bg-white/20 rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-2">
                                  <Star className="w-5 h-5" />
                                  <span className="font-bold">Stats</span>
                                </div>
                                <div className="text-sm space-y-1">
                                  {generatedCard.stats.receptions && <p>Receptions: {generatedCard.stats.receptions}</p>}
                                  {generatedCard.stats.yards && <p>Yards: {generatedCard.stats.yards}</p>}
                                  {generatedCard.stats.touchdowns && <p>TDs: {generatedCard.stats.touchdowns}</p>}
                                </div>
                              </div>
                            )}
                            
                            {generatedCard.hypeScore && (
                              <div className="bg-white/20 rounded-lg p-3">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Zap className="w-5 h-5" />
                                    <span className="font-bold">HYPE Score</span>
                                  </div>
                                  <span className="text-2xl font-black">{generatedCard.hypeScore}</span>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="text-center text-xs opacity-60">
                            <p>ULTRAPREPS • {new Date().getFullYear()}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <h3 className="text-white font-bold text-lg mb-4">Share Your HeroCard</h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <button
                        onClick={() => handleShare('instagram')}
                        className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-xl hover:scale-105 transition-transform duration-200"
                      >
                        <Share2 className="w-6 h-6" />
                        <span className="text-sm font-medium">Instagram</span>
                      </button>
                      
                      <button
                        onClick={() => handleShare('twitter')}
                        className="flex flex-col items-center gap-2 p-4 bg-blue-400 text-white rounded-xl hover:scale-105 transition-transform duration-200"
                      >
                        <Share2 className="w-6 h-6" />
                        <span className="text-sm font-medium">Twitter</span>
                      </button>
                    </div>

                    <button
                      onClick={handleDownload}
                      className="w-full px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl hover:bg-white/20 transition-colors mb-4"
                    >
                      <Download className="w-5 h-5 inline-block mr-2" />
                      Download High Quality
                    </button>

                    <div className="text-sm text-white/60 text-center">
                      Your HeroCard has been saved to your profile!
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <h3 className="text-white font-bold text-lg mb-4">What&apos;s Next?</h3>
                    
                    <div className="space-y-3">
                      <Link
                        href="/poster/create"
                        className="block w-full px-4 py-3 bg-[#F59E0B]/20 hover:bg-[#F59E0B]/30 text-white rounded-xl transition-colors text-center"
                      >
                        Create Achievement Posters
                      </Link>
                      
                      <Link
                        href="/dashboard"
                        className="block w-full px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors text-center"
                      >
                        View Your Dashboard
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* Gage AI Chat */}
      <GageAIChat
        userId={heroCardData.athleteName.toLowerCase().replace(/\s+/g, '_') || 'guest'}
        isOpen={isChatOpen}
        onToggle={() => setIsChatOpen(!isChatOpen)}
      />
    </div>
  );
}