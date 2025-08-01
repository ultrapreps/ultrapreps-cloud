'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, CheckCircle, XCircle, AlertCircle, RefreshCw, Sparkles, Image as ImageIcon } from 'lucide-react';

interface ValidationResult {
  passed: boolean;
  score: number;
  issues: string[];
  suggestions: string[];
  requiresRegeneration: boolean;
}

interface TestAsset {
  id: string;
  name: string;
  type: 'herocard' | 'mascot' | 'poster';
  imageUrl: string;
  context: any;
  description: string;
}

export default function TestVisionPage() {
  const [selectedAsset, setSelectedAsset] = useState<TestAsset | null>(null);
  const [validating, setValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    success: boolean;
    validation: ValidationResult;
    recommendation: string;
  } | null>(null);
  const [visionStatus, setVisionStatus] = useState<any>(null);

  // Test assets with various quality levels
  const testAssets: TestAsset[] = [
    {
      id: 'hero1',
      name: 'High Quality HeroCard',
      type: 'herocard',
      imageUrl: '/api/placeholder/800/1200?text=Premium+HeroCard',
      context: {
        athleteName: 'Jake Thompson',
        sport: 'Football',
        schoolName: 'Marble Falls High School',
        schoolColors: { primary: '#B91C1C', secondary: '#F59E0B' }
      },
      description: 'ESPN-quality hero card with perfect branding'
    },
    {
      id: 'hero2',
      name: 'Low Quality HeroCard',
      type: 'herocard',
      imageUrl: '/api/placeholder/400/600?text=Blurry+Card',
      context: {
        athleteName: 'Mike Johnson',
        sport: 'Basketball',
        schoolName: 'Austin High School',
        schoolColors: { primary: '#1E3A8A', secondary: '#FFFFFF' }
      },
      description: 'Poor quality with wrong colors and blur'
    },
    {
      id: 'mascot1',
      name: 'Consistent Mustang',
      type: 'mascot',
      imageUrl: '/api/placeholder/600/600?text=Mustang+Mascot',
      context: {
        schoolName: 'Marble Falls High School',
        mascotType: 'Mustang',
        schoolColors: { primary: '#B91C1C', secondary: '#F59E0B' },
        pose: 'victory celebration'
      },
      description: 'Style-locked mascot with correct branding'
    },
    {
      id: 'mascot2',
      name: 'Drifted Eagle',
      type: 'mascot',
      imageUrl: '/api/placeholder/600/600?text=Wrong+Eagle',
      context: {
        schoolName: 'Austin High School',
        mascotType: 'Eagle',
        schoolColors: { primary: '#1E3A8A', secondary: '#FFFFFF' },
        pose: 'flying high'
      },
      description: 'Mascot with visual drift and wrong style'
    },
    {
      id: 'poster1',
      name: 'Game Day Poster',
      type: 'poster',
      imageUrl: '/api/placeholder/1080/1350?text=Game+Day',
      context: {
        schoolName: 'Central High School',
        schoolColors: { primary: '#F59E0B', secondary: '#1F2937' },
        intendedUse: 'Social media game announcement',
        targetAudience: 'student'
      },
      description: 'High-energy game day announcement'
    }
  ];

  // Check VisionQA status on mount
  useState(() => {
    fetch('/api/vision/validate')
      .then(res => res.json())
      .then(data => setVisionStatus(data))
      .catch(err => console.error('Failed to get VisionQA status:', err));
  });

  const validateAsset = async () => {
    if (!selectedAsset) return;
    
    setValidating(true);
    setValidationResult(null);
    
    try {
      const response = await fetch('/api/vision/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageUrl: selectedAsset.imageUrl,
          assetType: selectedAsset.type,
          context: selectedAsset.context
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setValidationResult(data);
      } else {
        console.error('Validation failed:', data.error);
      }
    } catch (err) {
      console.error('Validation error:', err);
    } finally {
      setValidating(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.9) return 'text-green-500';
    if (score >= 0.8) return 'text-yellow-500';
    if (score >= 0.7) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreIcon = (passed: boolean) => {
    return passed ? 
      <CheckCircle className="w-8 h-8 text-green-500" /> : 
      <XCircle className="w-8 h-8 text-red-500" />;
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Eye className="w-10 h-10 text-[#F59E0B]" />
            VisionQA Test Suite
          </h1>
          <p className="text-gray-400">
            AI-powered quality validation for all generated assets - No more cheesy AI look!
          </p>
          
          {/* Status Badge */}
          {visionStatus && (
            <div className="mt-4 flex items-center gap-4">
              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                visionStatus.openAIEnabled ? 'bg-green-900/50 text-green-400' : 'bg-yellow-900/50 text-yellow-400'
              }`}>
                {visionStatus.mode}
              </div>
              <div className="text-sm text-gray-500">
                Quality Threshold: {(visionStatus.qualityThreshold * 100)}% | 
                Branding Threshold: {(visionStatus.brandingThreshold * 100)}%
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Asset Selection */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-4">Test Assets</h2>
            
            <div className="space-y-4">
              {testAssets.map(asset => (
                <motion.div
                  key={asset.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedAsset(asset)}
                  className={`bg-gray-900 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedAsset?.id === asset.id ? 'ring-2 ring-[#F59E0B]' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        {asset.name}
                        <span className="text-xs px-2 py-1 bg-gray-800 rounded-full">
                          {asset.type}
                        </span>
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">{asset.description}</p>
                      <div className="mt-2 text-xs text-gray-500">
                        School: {asset.context.schoolName || 'N/A'}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <button
              onClick={validateAsset}
              disabled={!selectedAsset || validating}
              className="w-full px-6 py-3 bg-[#F59E0B] hover:bg-[#F59E0B]/80 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold rounded-lg transition-all flex items-center justify-center gap-2"
            >
              {validating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Validating...
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5" />
                  Validate Selected Asset
                </>
              )}
            </button>
          </div>

          {/* Validation Results */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Validation Results</h2>
            
            {!validationResult ? (
              <div className="text-center py-12 text-gray-500">
                <Eye className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Select an asset and click validate to see quality analysis</p>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {/* Overall Score */}
                  <div className="text-center">
                    {getScoreIcon(validationResult.validation.passed)}
                    <h3 className={`text-3xl font-bold mt-2 ${getScoreColor(validationResult.validation.score)}`}>
                      {(validationResult.validation.score * 100).toFixed(1)}%
                    </h3>
                    <p className="text-gray-400">Quality Score</p>
                  </div>
                  
                  {/* Recommendation */}
                  <div className={`p-4 rounded-lg ${
                    validationResult.validation.passed ? 
                    'bg-green-900/20 border border-green-500' : 
                    'bg-red-900/20 border border-red-500'
                  }`}>
                    <p className={`font-semibold ${
                      validationResult.validation.passed ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {validationResult.recommendation}
                    </p>
                  </div>
                  
                  {/* Issues */}
                  {validationResult.validation.issues.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        Issues Found ({validationResult.validation.issues.length})
                      </h4>
                      <ul className="space-y-2">
                        {validationResult.validation.issues.map((issue, idx) => (
                          <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Suggestions */}
                  {validationResult.validation.suggestions.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#F59E0B]" />
                        Improvement Suggestions
                      </h4>
                      <ul className="space-y-2">
                        {validationResult.validation.suggestions.map((suggestion, idx) => (
                          <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                            <span className="text-[#F59E0B] mt-1">→</span>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Regeneration Required */}
                  {validationResult.validation.requiresRegeneration && (
                    <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-500 rounded-lg">
                      <h4 className="font-semibold text-yellow-400 mb-2">
                        🔄 Regeneration Required
                      </h4>
                      <p className="text-sm text-gray-300">
                        This asset does not meet quality standards and should be regenerated
                        with the suggested improvements applied to the prompt.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-12 bg-gray-900 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">How VisionQA Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 bg-[#F59E0B]/20 rounded-lg flex items-center justify-center mb-3">
                <Eye className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <h4 className="font-semibold mb-2">1. Visual Analysis</h4>
              <p className="text-sm text-gray-400">
                GPT-4 Vision analyzes the image for quality, composition, and brand accuracy
              </p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-[#F59E0B]/20 rounded-lg flex items-center justify-center mb-3">
                <CheckCircle className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <h4 className="font-semibold mb-2">2. Multi-Point Validation</h4>
              <p className="text-sm text-gray-400">
                Checks colors, mascot accuracy, professional quality, and contextual appropriateness
              </p>
            </div>
            
            <div>
              <div className="w-12 h-12 bg-[#F59E0B]/20 rounded-lg flex items-center justify-center mb-3">
                <RefreshCw className="w-6 h-6 text-[#F59E0B]" />
              </div>
              <h4 className="font-semibold mb-2">3. Smart Regeneration</h4>
              <p className="text-sm text-gray-400">
                Provides specific improvements for the generation prompt if quality fails
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p>VisionQA v1.0 - Ensuring every asset meets ESPN/Nike quality standards</p>
          <p className="text-sm mt-2">No more cheesy AI-generated look!</p>
        </div>
      </div>
    </div>
  );
}