'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, Star, ArrowRight, Sparkles, Target, Crown, 
  Palette, Image, Zap, Eye, ChevronLeft, Camera,
  Music, Gamepad2, Brush, Book, Users, Shield
} from 'lucide-react';
import { useSchoolUniverse } from '@/lib/bots/SchoolUniverse';
import { useDesignMaster } from '@/lib/bots/DesignMaster';
import { useProfileBot } from '@/lib/bots/ProfileBot';

interface StadiumData {
  username: string;
  schoolName: string;
  mascot: string;
  colors: {
    primary: string;
    secondary: string;
  };
  theme: 'modern' | 'cinematic' | 'vintage' | 'minimal';
  sports: string[];  // Keep as sports for API compatibility, but represents all activities!
  goals: string[];
  bio: string;
  profileImage?: string;
  bannerStyle: 'stadium' | 'arena' | 'field' | 'stage';
  highlights: string[];
}

export default function StadiumCreatePage() {
  const [step, setStep] = useState(1);
  const [stadiumData, setStadiumData] = useState<StadiumData>({
    username: '',
    schoolName: '',
    mascot: '',
    colors: {
      primary: '#F59E0B',
      secondary: '#F97316'
    },
    theme: 'modern',
    sports: [],
    goals: [],
    bio: '',
    bannerStyle: 'stadium',
    highlights: []
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isGeneratingDesign, setIsGeneratingDesign] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const { createSchoolProfile } = useSchoolUniverse();
  const { generateDesign, getSchoolTheme } = useDesignMaster();
  const { buildIdentity } = useProfileBot();

  // Auto-generate school colors when school name changes
  useEffect(() => {
    const fetchSchoolColors = async () => {
      if (stadiumData.schoolName) {
        try {
          const theme = await getSchoolTheme(stadiumData.schoolName);
          setStadiumData(prev => ({
            ...prev,
            colors: {
              primary: theme.primaryColor,
              secondary: theme.secondaryColor
            }
          }));
        } catch (error) {
          console.error('Failed to fetch school colors:', error);
        }
      }
    };

    fetchSchoolColors();
  }, [stadiumData.schoolName, getSchoolTheme]);

  const handleSubmit = async () => {
    setIsCreating(true);
    
    try {
      // Create school profile with AI
      const schoolProfile = await createSchoolProfile(stadiumData.schoolName, {
        city: 'Your City', // This could be collected in the form
        state: 'Your State'
      });

      // Build athlete identity with AI
      const identity = await buildIdentity({
        name: stadiumData.username,
        school: stadiumData.schoolName,
        sport: stadiumData.sports[0], // Primary sport
        position: stadiumData.sports.length > 0 ? 'Multi-Sport Athlete' : undefined,
        graduationYear: new Date().getFullYear() + 2
      });

      // Generate stadium design if not already generated
      let finalDesign = previewImage;
      if (!finalDesign) {
        const design = await generateDesign({
          type: 'stadium_background',
          context: {
            school: stadiumData.schoolName,
            colors: [stadiumData.colors.primary, stadiumData.colors.secondary],
            style: stadiumData.theme
          }
        });
        finalDesign = design.imageUrl;
      }

      // Create the stadium with enhanced data
      const enhancedData = {
        ...stadiumData,
        schoolProfile,
        identity,
        stadiumBackground: finalDesign
      };

      const response = await fetch('/api/stadium-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enhancedData),
      });

      if (response.ok) {
        await response.json();
        // Redirect to the created stadium
        window.location.href = `/stadium/${stadiumData.username}`;
      }
    } catch (error) {
      console.error('Stadium creation error:', error);
    } finally {
      setIsCreating(false);
    }
  };

  const nextStep = () => {
    if (step < 5) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const activityOptions = [
    // ATHLETICS
    'Football', 'Basketball', 'Baseball', 'Soccer', 'Tennis', 'Golf',
    'Swimming', 'Track & Field', 'Wrestling', 'Volleyball', 'Softball',
    'Cross Country', 'Lacrosse', 'Hockey', 'Gymnastics', 'Cheerleading',
    
    // PERFORMING ARTS
    'Theater/Drama', 'Musical Theater', 'Marching Band', 'Concert Band',
    'Jazz Band', 'Orchestra', 'Choir', 'Show Choir', 'Tech Crew',
    
    // ACADEMICS & COMPETITIONS
    'Math Team', 'Debate Team', 'Academic Decathlon', 'Science Olympiad',
    'Robotics', 'Chess Club', 'Quiz Bowl', 'Model UN',
    
    // VISUAL ARTS & MEDIA
    'Visual Arts', 'Photography', 'Digital Media', 'Yearbook',
    'Journalism', 'Creative Writing', 'Film Production',
    
    // SPECIAL INTERESTS
    'Gaming/Esports', 'Pokemon TCG', 'Anime Club', 'Coding Club',
    'Environmental Club', 'Volunteer Work', 'Student Government',
    
    // MILITARY & LEADERSHIP
    'JROTC/ROTC', 'Student Council', 'National Honor Society',
    'Key Club', 'Beta Club', 'Peer Mediation'
  ];

  const goalOptions = [
    // UNIVERSAL GOALS
    'Build my personal brand', 'Showcase my achievements', 'Track my progress',
    'Find scholarships & opportunities', 'Build my network', 'Document my journey',
    'Increase my visibility', 'Work with AI mentors', 'Connect with like-minded peers',
    
    // ATHLETICS GOALS
    'Get recruited to college', 'Improve my athletic skills', 'Connect with coaches',
    'Showcase sports highlights', 'Join team communications',
    
    // ARTS & PERFORMANCE GOALS  
    'Audition for productions', 'Share performance videos', 'Connect with directors',
    'Build my portfolio', 'Find summer programs', 'Get into art schools',
    
    // ACADEMIC & COMPETITION GOALS
    'Compete in tournaments', 'Join academic teams', 'Find STEM opportunities',
    'Connect with mentors', 'Prepare for competitions', 'Get into honor societies',
    
    // LEADERSHIP & SERVICE GOALS
    'Run for student government', 'Lead volunteer projects', 'Organize events',
    'Mentor younger students', 'Build leadership skills', 'Make a difference'
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
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

      {/* Navigation is handled by UltraLayout */}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl mx-auto w-full">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <Sparkles className="w-12 h-12 text-[#F59E0B]" />
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-wider bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#F59E0B] bg-clip-text text-transparent">
                Create Your Stadium
              </h1>
              <Sparkles className="w-12 h-12 text-[#F59E0B]" />
            </div>
            <p className="text-xl text-white/90">
              Build your personal digital stadium where your journey begins
            </p>
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex justify-center mb-8"
          >
            <div className="flex items-center gap-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= num 
                      ? 'bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white' 
                      : 'bg-white/20 text-white/60'
                  }`}>
                    {num}
                  </div>
                  {num < 5 && (
                    <div className={`w-12 h-1 mx-2 ${
                      step > num ? 'bg-[#F59E0B]' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
          >
            
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <Target className="w-16 h-16 text-[#F59E0B] mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Let&apos;s Get You Started</h2>
                  <p className="text-white/70">Tell us about yourself and your school</p>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Your Stadium Username</label>
                  <input
                    type="text"
                    value={stadiumData.username}
                    onChange={(e) => setStadiumData({...stadiumData, username: e.target.value})}
                    placeholder="e.g., johnsmith_tigers"
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  />
                  <p className="text-white/50 text-sm mt-1">This will be your stadium URL: ultrapreps.com/stadium/{stadiumData.username || 'your-username'}</p>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">School Name</label>
                  <input
                    type="text"
                    value={stadiumData.schoolName}
                    onChange={(e) => setStadiumData({...stadiumData, schoolName: e.target.value})}
                    placeholder="Enter your school name"
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">School Mascot</label>
                  <input
                    type="text"
                    value={stadiumData.mascot}
                    onChange={(e) => setStadiumData({...stadiumData, mascot: e.target.value})}
                    placeholder="e.g., Tigers, Eagles, Warriors"
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#F59E0B]"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">School Colors</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-white/70 mb-1 block">Primary Color</label>
                      <div className="relative">
                        <input
                          type="color"
                          value={stadiumData.colors.primary}
                          onChange={(e) => setStadiumData({...stadiumData, colors: {...stadiumData.colors, primary: e.target.value}})}
                          className="w-full h-12 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-white/70 mb-1 block">Secondary Color</label>
                      <div className="relative">
                        <input
                          type="color"
                          value={stadiumData.colors.secondary}
                          onChange={(e) => setStadiumData({...stadiumData, colors: {...stadiumData.colors, secondary: e.target.value}})}
                          className="w-full h-12 rounded-lg cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Theme & Style */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <Palette className="w-16 h-16 text-[#F59E0B] mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Choose Your Style</h2>
                  <p className="text-white/70">Select the theme and atmosphere for your digital stadium</p>
                </div>

                {/* Theme Selection */}
                <div>
                  <label className="block text-white font-semibold mb-3">Stadium Theme</label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: 'modern', label: 'Modern', icon: Zap, description: 'Clean, sleek, professional' },
                      { value: 'cinematic', label: 'Cinematic', icon: Crown, description: 'Epic, dramatic, powerful' },
                      { value: 'minimal', label: 'Minimal', icon: Sparkles, description: 'Simple, focused, elegant' },
                      { value: 'vintage', label: 'Vintage', icon: Camera, description: 'Retro, nostalgic, unique' }
                    ].map(({ value, label, icon: Icon, description }) => (
                      <button
                        key={value}
                        onClick={() => setStadiumData({...stadiumData, theme: value as StadiumData['theme']})}
                        className={`p-4 rounded-xl transition-all duration-200 text-left ${
                          stadiumData.theme === value
                            ? 'bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white'
                            : 'bg-white/20 text-white/80 hover:bg-white/30'
                        }`}
                      >
                        <Icon className="w-8 h-8 mb-2" />
                        <h3 className="font-bold">{label}</h3>
                        <p className="text-sm opacity-80">{description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Banner Style */}
                <div>
                  <label className="block text-white font-semibold mb-3">Banner Style</label>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: 'stadium', label: 'Stadium', description: 'Football field atmosphere' },
                      { value: 'arena', label: 'Arena', description: 'Basketball court energy' },
                      { value: 'field', label: 'Field', description: 'Multi-sport outdoor vibe' },
                      { value: 'stage', label: 'Stage', description: 'Performance spotlight' }
                    ].map(({ value, label, description }) => (
                      <button
                        key={value}
                        onClick={() => setStadiumData({...stadiumData, bannerStyle: value as StadiumData['bannerStyle']})}
                        className={`p-3 rounded-xl transition-all duration-200 text-left ${
                          stadiumData.bannerStyle === value
                            ? 'bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white'
                            : 'bg-white/20 text-white/80 hover:bg-white/30'
                        }`}
                      >
                        <h3 className="font-bold">{label}</h3>
                        <p className="text-sm opacity-80">{description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Activities */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <Trophy className="w-16 h-16 text-[#F59E0B] mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Your Activities</h2>
                  <p className="text-white/70">Select all activities you participate in - sports, arts, academics, clubs, everything!</p>
                </div>

                <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {activityOptions.map((activity) => (
                    <button
                      key={activity}
                      onClick={() => {
                        const newActivities = stadiumData.sports.includes(activity)
                          ? stadiumData.sports.filter(s => s !== activity)
                          : [...stadiumData.sports, activity];
                        setStadiumData({...stadiumData, sports: newActivities});
                      }}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        stadiumData.sports.includes(activity)
                          ? 'bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white'
                          : 'bg-white/20 text-white/80 hover:bg-white/30'
                      }`}
                    >
                      {activity}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Goals */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <Star className="w-16 h-16 text-[#F59E0B] mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Your Goals</h2>
                  <p className="text-white/70">What do you want to achieve on UltraPreps?</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {goalOptions.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => {
                        const newGoals = stadiumData.goals.includes(goal)
                          ? stadiumData.goals.filter(g => g !== goal)
                          : [...stadiumData.goals, goal];
                        setStadiumData({...stadiumData, goals: newGoals});
                      }}
                      className={`p-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
                        stadiumData.goals.includes(goal)
                          ? 'bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white'
                          : 'bg-white/20 text-white/80 hover:bg-white/30'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 5: Review & Launch */}
            {step === 5 && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="text-center mb-6">
                  <Crown className="w-16 h-16 text-[#F59E0B] mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-white mb-2">Review & Launch</h2>
                  <p className="text-white/70">Preview your stadium and tell your story</p>
                </div>

                {/* Stadium Preview */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-b from-black/50 to-black/80 border border-white/20">
                  {/* Banner Preview */}
                  <div className="h-48 relative overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-gradient-to-br"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${stadiumData.colors.primary}, ${stadiumData.colors.secondary})`,
                        filter: 'brightness(0.8)'
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="text-center"
                      >
                        <h3 className="text-4xl font-black text-white mb-2">{stadiumData.username || 'YourUsername'}</h3>
                        <p className="text-xl text-white/90">{stadiumData.schoolName} {stadiumData.mascot}</p>
                      </motion.div>
                    </div>
                  </div>

                  {/* Profile Preview */}
                  <div className="p-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-white/60 text-sm">Theme</p>
                        <p className="text-white font-semibold capitalize">{stadiumData.theme}</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-white/60 text-sm">Activities</p>
                        <p className="text-white font-semibold">{stadiumData.sports.length} Selected</p>
                      </div>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-4">
                      <h4 className="text-white font-bold mb-2">Your Story</h4>
                      <textarea
                        value={stadiumData.bio}
                        onChange={(e) => setStadiumData({...stadiumData, bio: e.target.value})}
                        placeholder="Tell your story... What drives you? What are your achievements? What makes you unique?"
                        rows={4}
                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] resize-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* AI Enhancement Option */}
                {!isGeneratingDesign && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={async () => {
                      setIsGeneratingDesign(true);
                      try {
                        const design = await generateDesign({
                          type: 'stadium_background',
                          context: {
                            school: stadiumData.schoolName,
                            colors: [stadiumData.colors.primary, stadiumData.colors.secondary],
                            style: stadiumData.theme
                          }
                        });
                        setPreviewImage(design.imageUrl);
                      } catch (error) {
                        console.error('Design generation failed:', error);
                      } finally {
                        setIsGeneratingDesign(false);
                      }
                    }}
                    className="w-full p-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <Sparkles className="w-5 h-5" />
                    Generate AI Stadium Design
                  </motion.button>
                )}
              </motion.div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevStep}
                disabled={step === 1}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  step === 1
                    ? 'opacity-50 cursor-not-allowed bg-white/10 text-white/50'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                Previous
              </button>

              {step < 5 ? (
                <button
                  onClick={nextStep}
                  disabled={
                    (step === 1 && (!stadiumData.username || !stadiumData.schoolName || !stadiumData.mascot)) ||
                    (step === 3 && stadiumData.sports.length === 0) ||
                    (step === 4 && stadiumData.goals.length === 0)
                  }
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                    (step === 1 && (!stadiumData.username || !stadiumData.schoolName || !stadiumData.mascot)) ||
                    (step === 3 && stadiumData.sports.length === 0) ||
                    (step === 4 && stadiumData.goals.length === 0)
                      ? 'opacity-50 cursor-not-allowed bg-white/10 text-white/50'
                      : 'bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white hover:scale-105'
                  }`}
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isCreating || !stadiumData.bio}
                  className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                    isCreating || !stadiumData.bio
                      ? 'opacity-50 cursor-not-allowed bg-white/10 text-white/50'
                      : 'bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white hover:scale-105'
                  }`}
                >
                  {isCreating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating Stadium...
                    </>
                  ) : (
                    <>
                      Create My Stadium
                      <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}