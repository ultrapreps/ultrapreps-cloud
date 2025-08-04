'use client';

import { useState, useEffect } from 'react';
import { 
  Bot, User, Brain, Zap, Target, Trophy,
  Clock, CheckCircle, AlertCircle, Eye,
  Camera, Video, FileText, Award, Star
} from 'lucide-react';

interface ProfileData {
  athleticData: {
    sport: string;
    position: string;
    stats: Record<string, number>;
    achievements: string[];
    videoCount: number;
  };
  academicData: {
    gpa: number;
    honors: string[];
    activities: string[];
    testScores: Record<string, number>;
  };
  socialData: {
    followers: number;
    engagement: number;
    posts: number;
    reach: number;
  };
  completionScore: number;
}

interface ProcessingStep {
  id: string;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  timeRemaining: string;
  details: string;
}

const MOCK_PROFILE_DATA: ProfileData = {
  athleticData: {
    sport: 'Football',
    position: 'Quarterback',
    stats: { touchdowns: 28, yards: 3247, completions: 156 },
    achievements: ['State Champion', 'MVP', 'All-Conference'],
    videoCount: 47
  },
  academicData: {
    gpa: 3.87,
    honors: ['National Honor Society', 'AP Scholar'],
    activities: ['Student Council', 'Volunteer Club'],
    testScores: { sat: 1340, act: 29 }
  },
  socialData: {
    followers: 2847,
    engagement: 8.4,
    posts: 156,
    reach: 124000
  },
  completionScore: 94
};

const MOCK_PROCESSING_STEPS: ProcessingStep[] = [
  { id: '1', name: 'Athletic Data Mining', status: 'completed', progress: 100, timeRemaining: '0s', details: 'Discovered 47 game videos, 156 statistical records' },
  { id: '2', name: 'Academic Intelligence', status: 'completed', progress: 100, timeRemaining: '0s', details: 'Processed transcripts, test scores, activities' },
  { id: '3', name: 'Social Network Analysis', status: 'processing', progress: 76, timeRemaining: '12s', details: 'Analyzing engagement patterns, reach metrics' },
  { id: '4', name: 'Media Enhancement', status: 'pending', progress: 0, timeRemaining: '30s', details: 'Auto-generating highlights, photo editing' },
  { id: '5', name: 'Profile Synthesis', status: 'pending', progress: 0, timeRemaining: '45s', details: 'Creating comprehensive digital identity' }
];

interface ProfileBotProps {
  isActive: boolean;
  studentName: string;
  onComplete?: (data: ProfileData) => void;
}

export default function ProfileBot({ isActive, studentName, onComplete }: ProfileBotProps) {
  const [processingSteps, setProcessingSteps] = useState(MOCK_PROCESSING_STEPS);
  const [currentStep, setCurrentStep] = useState(2);
  const [overallProgress, setOverallProgress] = useState(54);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setProcessingSteps(prev => prev.map((step, index) => {
        if (index === currentStep && step.status === 'processing') {
          const newProgress = Math.min(step.progress + Math.random() * 15, 100);
          if (newProgress >= 100) {
            setCurrentStep(prev => prev + 1);
            return { ...step, status: 'completed', progress: 100, timeRemaining: '0s' };
          }
          return { 
            ...step, 
            progress: newProgress,
            timeRemaining: `${Math.ceil((100 - newProgress) / 5)}s`
          };
        }
        if (index === currentStep + 1 && processingSteps[currentStep].status === 'completed') {
          return { ...step, status: 'processing' };
        }
        return step;
      }));

      setOverallProgress(prev => Math.min(prev + Math.random() * 3, 95));
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, currentStep]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'processing': return <Bot className="w-5 h-5 text-blue-400 animate-pulse" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-400" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">ProfileBot</h3>
            <p className="text-white/70">AI Profile Generation for {studentName}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-400">{overallProgress.toFixed(0)}%</div>
          <div className="text-sm text-white/60">Complete</div>
        </div>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-medium">Overall Progress</span>
          <span className="text-blue-400 font-semibold">{overallProgress.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Processing Steps */}
      <div className="space-y-4 mb-6">
        {processingSteps.map((step) => (
          <div key={step.id} className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                {getStatusIcon(step.status)}
                <span className="text-white font-medium">{step.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/60">{step.timeRemaining}</span>
                <span className="text-sm font-semibold text-blue-400">{step.progress.toFixed(0)}%</span>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  step.status === 'completed' ? 'bg-green-500' :
                  step.status === 'processing' ? 'bg-blue-500' :
                  step.status === 'error' ? 'bg-red-500' : 'bg-gray-600'
                }`}
                style={{ width: `${step.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-white/60">{step.details}</p>
          </div>
        ))}
      </div>

      {/* Discovered Data Preview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 text-center">
          <Trophy className="w-8 h-8 text-orange-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-white">{MOCK_PROFILE_DATA.athleticData.stats.touchdowns}</div>
          <div className="text-xs text-white/60">Touchdowns</div>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
          <Award className="w-8 h-8 text-green-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-white">{MOCK_PROFILE_DATA.academicData.gpa}</div>
          <div className="text-xs text-white/60">GPA</div>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
          <Eye className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-white">{(MOCK_PROFILE_DATA.socialData.reach / 1000).toFixed(0)}K</div>
          <div className="text-xs text-white/60">Reach</div>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
          <Video className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-white">{MOCK_PROFILE_DATA.athleticData.videoCount}</div>
          <div className="text-xs text-white/60">Videos</div>
        </div>
      </div>

      {/* Real-time Discovery Feed */}
      <div className="mt-6 bg-black/40 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          Live Discovery Feed
        </h4>
        <div className="space-y-2 text-xs">
          <div className="text-green-400">✓ Found MaxPreps game statistics for 8 games</div>
          <div className="text-green-400">✓ Discovered 12 highlight videos on Hudl</div>
          <div className="text-blue-400">⚡ Processing social media engagement data...</div>
          <div className="text-yellow-400">⏳ Analyzing academic achievements...</div>
          <div className="text-gray-400">○ Waiting: Media enhancement</div>
        </div>
      </div>
    </div>
  );
}