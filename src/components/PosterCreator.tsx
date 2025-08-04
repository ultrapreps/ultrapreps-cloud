'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Image as ImageIcon, 
  Download, 
  Share2, 
  Sparkles, 
  Calendar,
  Trophy,
  Star,
  Users,
  Zap,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import Image from 'next/image';

interface PosterTemplate {
  type: string;
  name: string;
  description: string;
  aspectRatio: string;
  elements: string[];
  style: string;
}

interface GeneratedPoster {
  id: string;
  url: string;
  type: string;
  metadata: Record<string, any>;
  validationScore?: number;
  createdAt: string;
}

interface PosterCreatorProps {
  schoolId: string;
  schoolName: string;
  schoolColors: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  onPosterGenerated?: (poster: GeneratedPoster) => void;
}

const templateIcons: Record<string, React.ReactNode> = {
  'game_day': <Calendar className="w-6 h-6" />,
  'player_spotlight': <Star className="w-6 h-6" />,
  'achievement': <Trophy className="w-6 h-6" />,
  'recruitment': <Users className="w-6 h-6" />,
  'season_schedule': <Calendar className="w-6 h-6" />,
  'championship': <Trophy className="w-6 h-6" />,
  'senior_night': <Star className="w-6 h-6" />,
  'team_roster': <Users className="w-6 h-6" />,
  'hype_milestone': <Zap className="w-6 h-6" />
};

export default function PosterCreator({
  schoolId,
  schoolName,
  schoolColors,
  onPosterGenerated
}: PosterCreatorProps) {
  const [templates, setTemplates] = useState<PosterTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<PosterTemplate | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    date: '',
    playerName: '',
    playerNumber: '',
    playerPosition: '',
    customPrompt: ''
  });
  const [generating, setGenerating] = useState(false);
  const [generatedPoster, setGeneratedPoster] = useState<GeneratedPoster | null>(null);
  const [error, setError] = useState('');

  // Fetch available templates
  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/poster/generate');
      if (response.ok) {
        const data = await response.json();
        setTemplates(data.templates);
        if (data.templates.length > 0) {
          setSelectedTemplate(data.templates[0]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch templates:', error);
    }
  };

  const generatePoster = async () => {
    if (!selectedTemplate || !formData.title) {
      setError('Please select a template and enter a title');
      return;
    }
    
    setGenerating(true);
    setError('');
    setGeneratedPoster(null);
    
    try {
      const requestData: any = {
        type: selectedTemplate.type,
        schoolId,
        title: formData.title,
        subtitle: formData.subtitle,
        customPrompt: formData.customPrompt
      };
      
      // Add template-specific data
      if (selectedTemplate.type === 'game_day' && formData.date) {
        requestData.date = formData.date;
      }
      
      if (selectedTemplate.type === 'player_spotlight' && formData.playerName) {
        requestData.players = [{
          name: formData.playerName,
          number: formData.playerNumber,
          position: formData.playerPosition
        }];
      }
      
      const response = await fetch('/api/poster/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setGeneratedPoster(data.poster);
        if (onPosterGenerated) {
          onPosterGenerated(data.poster);
        }
      } else {
        setError(data.error || 'Failed to generate poster');
      }
    } catch (err) {
      setError('Network error - please try again');
    } finally {
      setGenerating(false);
    }
  };

  const downloadPoster = () => {
    if (!generatedPoster) return;
    
    // In production, implement proper download
    const link = document.createElement('a');
    link.href = generatedPoster.url;
    link.download = `${generatedPoster.type}_${Date.now()}.png`;
    link.target = '_blank';
    link.click();
  };

  const sharePoster = () => {
    if (!generatedPoster) return;
    
    // In production, implement share functionality
    if (navigator.share) {
      navigator.share({
        title: generatedPoster.metadata.title || 'Check out this poster!',
        text: `Amazing poster from ${schoolName}`,
        url: generatedPoster.url
      });
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Sparkles className="w-8 h-8 text-[#F59E0B]" />
        AI Poster Creator
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Form */}
        <div className="space-y-6">
          {/* Template Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">Select Template</label>
            <div className="grid grid-cols-2 gap-3">
              {templates.map(template => (
                <button
                  key={template.type}
                  onClick={() => setSelectedTemplate(template)}
                  className={`p-4 rounded-lg border transition-all ${
                    selectedTemplate?.type === template.type
                      ? 'bg-[#F59E0B] text-black border-[#F59E0B]'
                      : 'bg-gray-800 hover:bg-gray-700 border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {templateIcons[template.type] || <ImageIcon className="w-6 h-6" />}
                    <span className="font-semibold">{template.name}</span>
                  </div>
                  <p className="text-xs text-left opacity-80">{template.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Form Fields */}
          {selectedTemplate && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-[#F59E0B] focus:outline-none"
                  placeholder={`e.g., ${schoolName} vs Rival High`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({...formData, subtitle: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-[#F59E0B] focus:outline-none"
                  placeholder="Optional subtitle"
                />
              </div>

              {/* Template-specific fields */}
              {selectedTemplate.type === 'game_day' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Game Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-[#F59E0B] focus:outline-none"
                  />
                </div>
              )}

              {selectedTemplate.type === 'player_spotlight' && (
                <>
                  <div>
                    <label className="block text-sm font-medium mb-2">Player Name</label>
                    <input
                      type="text"
                      value={formData.playerName}
                      onChange={(e) => setFormData({...formData, playerName: e.target.value})}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-[#F59E0B] focus:outline-none"
                      placeholder="John Smith"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Jersey #</label>
                      <input
                        type="text"
                        value={formData.playerNumber}
                        onChange={(e) => setFormData({...formData, playerNumber: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-[#F59E0B] focus:outline-none"
                        placeholder="23"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Position</label>
                      <input
                        type="text"
                        value={formData.playerPosition}
                        onChange={(e) => setFormData({...formData, playerPosition: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-[#F59E0B] focus:outline-none"
                        placeholder="QB"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">
                  Custom Instructions (Optional)
                </label>
                <textarea
                  value={formData.customPrompt}
                  onChange={(e) => setFormData({...formData, customPrompt: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:border-[#F59E0B] focus:outline-none"
                  rows={3}
                  placeholder="Add any specific details or style preferences..."
                />
              </div>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={generatePoster}
            disabled={generating || !selectedTemplate || !formData.title}
            className="w-full px-6 py-3 bg-[#F59E0B] hover:bg-[#F59E0B]/80 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold rounded-lg transition-all flex items-center justify-center gap-2"
          >
            {generating ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Generating Poster...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Poster
              </>
            )}
          </button>

          {error && (
            <div className="p-4 bg-red-900/20 border border-red-500 rounded-lg text-red-400 flex items-start gap-2">
              <AlertCircle className="w-5 h-5 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Right Column - Preview */}
        <div className="space-y-4">
          <div className="bg-gray-800 rounded-lg p-6 min-h-[400px] flex items-center justify-center">
            {generating ? (
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-[#F59E0B] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Creating your professional poster...</p>
                <p className="text-sm text-gray-500 mt-2">This may take 10-15 seconds</p>
              </div>
            ) : generatedPoster ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full"
              >
                <div className="relative">
                  <img
                    src={generatedPoster.url}
                    alt="Generated poster"
                    className="w-full rounded-lg shadow-2xl"
                  />
                  
                  {/* Validation Score */}
                  {generatedPoster.validationScore !== undefined && (
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${
                      generatedPoster.validationScore >= 0.8 
                        ? 'bg-green-500 text-white' 
                        : 'bg-yellow-500 text-black'
                    }`}>
                      <CheckCircle className="w-4 h-4" />
                      {(generatedPoster.validationScore * 100).toFixed(0)}% Quality
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={downloadPoster}
                    className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium flex items-center justify-center gap-2"
                  >
                    <Download className="w-5 h-5" />
                    Download
                  </button>
                  <button
                    onClick={sharePoster}
                    className="flex-1 px-4 py-2 bg-[#F59E0B] hover:bg-[#F59E0B]/80 text-black rounded-lg font-medium flex items-center justify-center gap-2"
                  >
                    <Share2 className="w-5 h-5" />
                    Share
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="text-center text-gray-500">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Your poster will appear here</p>
                <p className="text-sm mt-2">Select a template and fill in the details</p>
              </div>
            )}
          </div>

          {/* School Colors Preview */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h4 className="font-semibold mb-3">School Colors</h4>
            <div className="flex gap-3">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: schoolColors.primary }}
                />
                <span className="text-sm">Primary</span>
              </div>
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 rounded"
                  style={{ backgroundColor: schoolColors.secondary }}
                />
                <span className="text-sm">Secondary</span>
              </div>
              {schoolColors.accent && (
                <div className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded"
                    style={{ backgroundColor: schoolColors.accent }}
                  />
                  <span className="text-sm">Accent</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}