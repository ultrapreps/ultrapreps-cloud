'use client';
export const dynamic = 'force-dynamic';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { School, User, Camera, Trophy, Sparkles, ChevronRight, Loader2, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Zap, School as SchoolIcon, Sparkles as SparklesIcon, Image as ImageIcon, Trophy as TrophyIcon } from 'lucide-react';

interface OnboardingStep {
  id: number;
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface SchoolInfo {
  id?: string;
  name: string;
  city: string;
  state: string;
  mascot?: string;
  colors?: {
    primary: string;
    secondary: string;
  };
}

interface StudentInfo {
  firstName: string;
  lastName: string;
  grade: string;
  sports: string[];
  position?: string;
  jerseyNumber?: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;
  }
  const userId = session?.user?.id || '';
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [heroCardGenerating, setHeroCardGenerating] = useState(false);
  const [heroCardUrl, setHeroCardUrl] = useState('');
  
  // Form data
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>({
    name: '',
    city: '',
    state: 'Texas'
  });
  const [studentInfo, setStudentInfo] = useState<StudentInfo>({
    firstName: '',
    lastName: '',
    grade: '9',
    sports: []
  });
  const [selfieUrl, setSelfieUrl] = useState('');
  const [accountInfo, setAccountInfo] = useState({
    email: '',
    password: '',
    parentEmail: ''
  });

  // Timer for 20-second benchmark
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: 'Find Your School',
      icon: <School className="w-6 h-6" />,
      description: 'Select or create your school universe'
    },
    {
      id: 2,
      title: 'Tell Us About You',
      icon: <User className="w-6 h-6" />,
      description: 'Basic info to personalize your experience'
    },
    {
      id: 3,
      title: 'Upload Your Photo',
      icon: <Camera className="w-6 h-6" />,
      description: 'For your cinematic HeroCard'
    },
    {
      id: 4,
      title: 'Select Your Sports',
      icon: <Trophy className="w-6 h-6" />,
      description: 'Choose your athletic activities'
    },
    {
      id: 5,
      title: 'Your HeroCard',
      icon: <Sparkles className="w-6 h-6" />,
      description: 'See your instant ESPN-quality card'
    }
  ];

  const sports = [
    'Football', 'Basketball', 'Baseball', 'Soccer', 'Track & Field',
    'Cross Country', 'Volleyball', 'Softball', 'Tennis', 'Golf',
    'Swimming', 'Wrestling', 'Lacrosse', 'Cheer', 'Band'
  ];

  // Track elapsed time
  useEffect(() => {
    if (startTime && !heroCardUrl) {
      const interval = setInterval(() => {
        setElapsedTime((Date.now() - startTime) / 1000);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [startTime, heroCardUrl]);

  const handleSchoolSubmit = async () => {
    setLoading(true);
    try {
      // Check if school exists or create new one
      const response = await fetch('/api/school/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schoolInfo),
      });
      
      const data = await response.json();
      if (data.school) {
        setSchoolInfo({
          ...schoolInfo,
          id: data.school.id,
          mascot: data.school.mascot,
          colors: data.school.colors
        });
      }
      
      setCurrentStep(2);
    } catch (error) {
      console.error('School creation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In production, upload to S3
      // For demo, use placeholder
      setSelfieUrl('/api/placeholder/400/400?text=' + encodeURIComponent(studentInfo.firstName));
      setCurrentStep(4);
    }
  };

  const generateHeroCard = async () => {
    setCurrentStep(5);
    setHeroCardGenerating(true);
    setStartTime(Date.now()); // Start 20-second timer
    
    try {
      // Call the actual HeroCard API following ULTRAPREPS_PROMPT_BIBLE_V3.0
      console.log('🚀 Calling HeroCard API with data:', {
        athleteName: `${studentInfo.firstName} ${studentInfo.lastName}`,
        school: schoolInfo.name,
        classYear: new Date().getFullYear() + (12 - parseInt(studentInfo.grade)),
        sport: studentInfo.sports[0] || 'Football',
        selfie: selfieUrl
      });
      
      const response = await fetch('/api/enrich-school', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          athleteName: `${studentInfo.firstName} ${studentInfo.lastName}`,
          school: schoolInfo.name,
          classYear: String(new Date().getFullYear() + (12 - parseInt(studentInfo.grade))),
          sport: studentInfo.sports[0] || 'Football',
          jerseyNumber: '6', // Default jersey number
          selfie: selfieUrl
        })
      });
      
      if (response.ok) {
        const cardData = await response.json();
        console.log('✅ HeroCard API response:', cardData);
        
        // Update school info with mascot from API
        if (cardData.mascot) {
          setSchoolInfo(prev => ({ ...prev, mascot: cardData.mascot }));
        }
        
        // Set the actual generated HeroCard URL
        setHeroCardUrl(cardData.heroCardUrl || `/api/placeholder/800/1200?text=${encodeURIComponent(
          `${studentInfo.firstName} ${studentInfo.lastName} - ${cardData.school} ${studentInfo.sports[0] || 'Sports'}`
        )}`);
        
        console.log('🎨 HeroCard generated in:', elapsedTime.toFixed(1), 'seconds');
      } else {
        console.error('HeroCard API error:', response.status, response.statusText);
        throw new Error('Failed to generate HeroCard');
      }
      
    } catch (error) {
      console.error('HeroCard generation error:', error);
      // Fallback to placeholder on error
      const heroCardPlaceholder = `/api/placeholder/800/1200?text=${encodeURIComponent(
        `${studentInfo.firstName} ${studentInfo.lastName} - ${schoolInfo.name} ${studentInfo.sports[0] || 'Sports'}`
      )}`;
      setHeroCardUrl(heroCardPlaceholder);
    } finally {
      setHeroCardGenerating(false);
    }
  };

  const completeOnboarding = async () => {
    // In production, create user account and redirect to dashboard
    router.push('/stadium/new-user');
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Real Onboarding CTA */}
        <div className="mb-12 bg-gradient-to-r from-green-400/80 to-blue-500/80 rounded-xl p-8 text-black text-center font-bold text-2xl shadow-xl flex flex-col items-center">
          <div className="mb-2 flex items-center gap-3">
            <User className="w-8 h-8 text-white" />
            Start Your Real UltraPreps Experience
          </div>
          <div className="text-lg text-black/80 font-normal mb-4">You’ve completed the demo journey. Now create your real account and unlock the full platform!</div>
          <a href="/auth/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black font-bold text-xl rounded-xl shadow-lg hover:scale-105 transition-all">
            Sign Up Now
          </a>
        </div>
        {/* Onboarding Demo Section */}
        <div className="mb-12 bg-gradient-to-r from-[#F59E0B]/80 to-[#F97316]/80 rounded-xl p-8 text-black text-center font-bold text-2xl shadow-xl">
          <div className="mb-4">UltraPreps Onboarding Demo: Explore every system live!</div>
          <div className="flex flex-wrap gap-6 justify-center mt-4">
            <Link href="/test-hud" className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg text-white font-bold text-lg shadow transition-all">
              <Zap className="w-6 h-6 text-yellow-400" /> HUD Demo
            </Link>
            <Link href="/test-school" className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg text-white font-bold text-lg shadow transition-all">
              <SchoolIcon className="w-6 h-6 text-blue-400" /> School Demo
            </Link>
            <Link href="/test-mascot" className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg text-white font-bold text-lg shadow transition-all">
              <SparklesIcon className="w-6 h-6 text-pink-400" /> Mascot Demo
            </Link>
            <Link href="/test-hype" className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg text-white font-bold text-lg shadow transition-all">
              <TrophyIcon className="w-6 h-6 text-green-400" /> HYPE Demo
            </Link>
            <Link href="/test-poster" className="flex items-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 rounded-lg text-white font-bold text-lg shadow transition-all">
              <ImageIcon className="w-6 h-6 text-purple-400" /> Poster Demo
            </Link>
          </div>
          <div className="mt-6 text-lg text-black/80 font-normal">Start with any demo, or follow the full onboarding journey to see how UltraPreps changes lives.</div>
        </div>
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-gray-900 z-50">
          <motion.div
            className="h-full bg-gradient-to-r from-[#F59E0B] to-[#F97316]"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / steps.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Header */}
        <div className="pt-8 pb-4 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2">
              Welcome to UltraPreps
            </h1>
            <p className="text-center text-gray-400">
              Every Student Deserves a Stage
            </p>
          </div>
        </div>

        {/* Step Indicators */}
        <div className="px-4 mb-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                    currentStep > step.id ? 'bg-green-500' :
                    currentStep === step.id ? 'bg-[#F59E0B]' : 'bg-gray-800'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.icon
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-full h-0.5 mx-2 ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-gray-800'
                    }`} style={{ width: '60px' }} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-12">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {/* Step 1: School Selection */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <School className="w-16 h-16 mx-auto mb-4 text-[#F59E0B]" />
                    <h2 className="text-2xl font-bold mb-2">Find Your School</h2>
                    <p className="text-gray-400">We'll create your school's digital universe</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">School Name</label>
                      <input
                        type="text"
                        value={schoolInfo.name}
                        onChange={(e) => setSchoolInfo({...schoolInfo, name: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-[#F59E0B] focus:outline-none"
                        placeholder="e.g., Marble Falls High School"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">City</label>
                        <input
                          type="text"
                          value={schoolInfo.city}
                          onChange={(e) => setSchoolInfo({...schoolInfo, city: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-[#F59E0B] focus:outline-none"
                          placeholder="e.g., Marble Falls"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">State</label>
                        <select
                          value={schoolInfo.state}
                          onChange={(e) => setSchoolInfo({...schoolInfo, state: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-[#F59E0B] focus:outline-none"
                        >
                          <option value="Texas">Texas</option>
                          <option value="California">California</option>
                          <option value="Florida">Florida</option>
                          {/* Add more states */}
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleSchoolSubmit}
                    disabled={!schoolInfo.name || !schoolInfo.city || loading}
                    className="w-full px-6 py-4 bg-[#F59E0B] hover:bg-[#F59E0B]/80 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Creating School Universe...
                      </>
                    ) : (
                      <>
                        Continue
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </motion.div>
              )}

              {/* Step 2: Student Info */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <User className="w-16 h-16 mx-auto mb-4 text-[#F59E0B]" />
                    <h2 className="text-2xl font-bold mb-2">Tell Us About You</h2>
                    <p className="text-gray-400">Basic info to personalize your experience</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">First Name</label>
                        <input
                          type="text"
                          value={studentInfo.firstName}
                          onChange={(e) => setStudentInfo({...studentInfo, firstName: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-[#F59E0B] focus:outline-none"
                          placeholder="John"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Last Name</label>
                        <input
                          type="text"
                          value={studentInfo.lastName}
                          onChange={(e) => setStudentInfo({...studentInfo, lastName: e.target.value})}
                          className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-[#F59E0B] focus:outline-none"
                          placeholder="Smith"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Graduating Class</label>
                      <select
                        value={studentInfo.grade}
                        onChange={(e) => setStudentInfo({...studentInfo, grade: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-[#F59E0B] focus:outline-none"
                      >
                        <option value="9">Class of 2028 (Freshman)</option>
                        <option value="10">Class of 2027 (Sophomore)</option>
                        <option value="11">Class of 2026 (Junior)</option>
                        <option value="12">Class of 2025 (Senior)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentStep(3)}
                    disabled={!studentInfo.firstName || !studentInfo.lastName}
                    className="w-full px-6 py-4 bg-[#F59E0B] hover:bg-[#F59E0B]/80 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    Continue
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* Step 3: Photo Upload */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <Camera className="w-16 h-16 mx-auto mb-4 text-[#F59E0B]" />
                    <h2 className="text-2xl font-bold mb-2">Upload Your Photo</h2>
                    <p className="text-gray-400">We'll create your cinematic HeroCard</p>
                  </div>

                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        {selfieUrl ? (
                          <div className="space-y-4">
                            <img
                              src={selfieUrl}
                              alt="Profile"
                              className="w-32 h-32 rounded-full mx-auto object-cover"
                            />
                            <p className="text-sm text-gray-400">Click to change photo</p>
                          </div>
                        ) : (
                          <>
                            <Camera className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                            <p className="text-lg font-medium">Click to upload photo</p>
                            <p className="text-sm text-gray-400 mt-2">
                              Or drag and drop your image here
                            </p>
                          </>
                        )}
                      </label>
                    </div>

                    <div className="bg-gray-900 rounded-lg p-4">
                      <p className="text-sm text-gray-400">
                        <strong>Tips for best results:</strong>
                        <br />• Use a clear, front-facing photo
                        <br />• Good lighting helps
                        <br />• Action shots work great!
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => {
                        setSelfieUrl('/api/placeholder/400/400?text=Avatar');
                        setCurrentStep(4);
                      }}
                      className="flex-1 px-6 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg transition-all"
                    >
                      Skip for Now
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Sports Selection */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-[#F59E0B]" />
                    <h2 className="text-2xl font-bold mb-2">Select Your Sports</h2>
                    <p className="text-gray-400">Choose all that apply</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {sports.map(sport => (
                      <button
                        key={sport}
                        onClick={() => {
                          const current = studentInfo.sports;
                          if (current.includes(sport)) {
                            setStudentInfo({
                              ...studentInfo,
                              sports: current.filter(s => s !== sport)
                            });
                          } else {
                            setStudentInfo({
                              ...studentInfo,
                              sports: [...current, sport]
                            });
                          }
                        }}
                        className={`px-4 py-3 rounded-lg font-medium transition-all ${
                          studentInfo.sports.includes(sport)
                            ? 'bg-[#F59E0B] text-black'
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                        }`}
                      >
                        {sport}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={generateHeroCard}
                    disabled={studentInfo.sports.length === 0}
                    className="w-full px-6 py-4 bg-[#F59E0B] hover:bg-[#F59E0B]/80 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    Generate My HeroCard
                    <Sparkles className="w-5 h-5" />
                  </button>
                </motion.div>
              )}

              {/* Step 5: HeroCard Generation */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 text-[#F59E0B]" />
                    <h2 className="text-2xl font-bold mb-2">
                      {heroCardGenerating ? 'Creating Your HeroCard...' : 'Your HeroCard is Ready!'}
                    </h2>
                    {heroCardGenerating && (
                      <div className="text-[#F59E0B] font-mono text-2xl">
                        {elapsedTime.toFixed(1)}s
                      </div>
                    )}
                  </div>

                  <div className="relative">
                    {heroCardGenerating ? (
                      <div className="bg-gray-900 rounded-lg p-32 flex items-center justify-center">
                        <div className="text-center">
                          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-[#F59E0B]" />
                          <p className="text-gray-400">Generating ESPN-quality card...</p>
                          <p className="text-sm text-gray-500 mt-2">Target: Under 20 seconds</p>
                        </div>
                      </div>
                    ) : heroCardUrl ? (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 200 }}
                        className="relative"
                      >
                        <img
                          src={heroCardUrl}
                          alt="Your HeroCard"
                          className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
                        />
                        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Generated in {elapsedTime.toFixed(1)}s ✨
                        </div>
                      </motion.div>
                    ) : null}
                  </div>

                  {heroCardUrl && (
                    <div className="space-y-4">
                      <div className="bg-gray-900 rounded-lg p-4 text-center">
                        <p className="text-lg font-semibold text-green-400">
                          🎉 Welcome to UltraPreps, {studentInfo.firstName}!
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                          Your journey to greatness starts here
                        </p>
                      </div>

                      <button
                        onClick={completeOnboarding}
                        className="w-full px-6 py-4 bg-[#F59E0B] hover:bg-[#F59E0B]/80 text-black font-bold rounded-lg transition-all flex items-center justify-center gap-2"
                      >
                        Enter Your Stadium
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}