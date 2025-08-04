'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Trophy, Timer, Target, TrendingUp, Users, Award, 
  Calendar, MapPin, Clock, Wind, Medal, BarChart3 
} from 'lucide-react';

interface TrackPerformance {
  eventName: string;
  time?: string;
  mark?: string;
  meetName: string;
  meetDate: string;
  place: number;
  season: string;
  wind?: string;
  isPR: boolean;
  isSB: boolean;
  source: string;
}

interface AthleteProfile {
  name: string;
  school: string;
  grade: string;
  season: string;
  events: string[];
  personalRecords: TrackPerformance[];
  seasonBests: TrackPerformance[];
  rankings: {
    district?: number;
    region?: number;
    state?: number;
    class?: string;
  };
}

interface ComparisonResult {
  athlete1: AthleteProfile;
  athlete2: AthleteProfile;
  commonEvents: string[];
  headToHeadResults: {
    eventName: string;
    athlete1Best: TrackPerformance;
    athlete2Best: TrackPerformance;
    winner: string;
    margin: string;
    analysis: string;
  }[];
  overallAnalysis: string;
  strengthsAndWeaknesses: {
    athlete1Strengths: string[];
    athlete1Weaknesses: string[];
    athlete2Strengths: string[];
    athlete2Weaknesses: string[];
  };
}

export default function TrackComparison() {
  const [athlete1Name, setAthlete1Name] = useState('');
  const [athlete2Name, setAthlete2Name] = useState('');
  const [schoolName, setSchoolName] = useState('Marble Falls High School');
  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runComparison = async () => {
    if (!athlete1Name.trim() || !athlete2Name.trim()) {
      setError('Please enter both athlete names');
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/track-comparison', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          athlete1Name: athlete1Name.trim(),
          athlete2Name: athlete2Name.trim(),
          schoolName: schoolName.trim()
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setComparisonResult(data.data);
      } else {
        setError(data.error || 'Comparison failed');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Track comparison error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time: string | undefined) => {
    if (!time) return 'N/A';
    return time;
  };

  const formatMark = (mark: string | undefined) => {
    if (!mark) return 'N/A';
    return mark;
  };

  const getEventIcon = (eventName: string) => {
    if (eventName.includes('100m') || eventName.includes('200m')) return <Timer className="w-4 h-4" />;
    if (eventName.includes('400m') || eventName.includes('800m')) return <Target className="w-4 h-4" />;
    if (eventName.includes('lj') || eventName.includes('tj')) return <TrendingUp className="w-4 h-4" />;
    return <Award className="w-4 h-4" />;
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 flex items-center justify-center">
          🏃 Track Athlete Comparison
        </h2>
        <p className="text-gray-300">Head-to-head analysis using UIL, MaxPreps, and Texas track sites</p>
      </div>

      {/* Input Form */}
      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
        <h3 className="font-semibold mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2" />
          Athlete Comparison Setup
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Athlete 1 Name</label>
            <input
              type="text"
              value={athlete1Name}
              onChange={(e) => setAthlete1Name(e.target.value)}
              placeholder="e.g., Sarah Johnson"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Athlete 2 Name</label>
            <input
              type="text"
              value={athlete2Name}
              onChange={(e) => setAthlete2Name(e.target.value)}
              placeholder="e.g., Emily Rodriguez"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">School Name</label>
            <input
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="Marble Falls High School"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
            {error}
          </div>
        )}

        <div className="mt-6">
          <button
            onClick={runComparison}
            disabled={loading}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing Athletes...
              </>
            ) : (
              <>
                <BarChart3 className="w-4 h-4 mr-2" />
                Compare Athletes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Comparison Results */}
      {comparisonResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Athlete Profiles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Athlete 1 Profile */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-blue-400" />
                {comparisonResult.athlete1.name}
              </h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">School:</span> {comparisonResult.athlete1.school}</p>
                <p><span className="font-medium">Grade:</span> {comparisonResult.athlete1.grade}</p>
                <p><span className="font-medium">Season:</span> {comparisonResult.athlete1.season}</p>
                <p><span className="font-medium">Events:</span> {comparisonResult.athlete1.events.join(', ')}</p>
                {comparisonResult.athlete1.rankings.district && (
                  <p><span className="font-medium">District Rank:</span> #{comparisonResult.athlete1.rankings.district}</p>
                )}
              </div>
            </div>

            {/* Athlete 2 Profile */}
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-green-400" />
                {comparisonResult.athlete2.name}
              </h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">School:</span> {comparisonResult.athlete2.school}</p>
                <p><span className="font-medium">Grade:</span> {comparisonResult.athlete2.grade}</p>
                <p><span className="font-medium">Season:</span> {comparisonResult.athlete2.season}</p>
                <p><span className="font-medium">Events:</span> {comparisonResult.athlete2.events.join(', ')}</p>
                {comparisonResult.athlete2.rankings.district && (
                  <p><span className="font-medium">District Rank:</span> #{comparisonResult.athlete2.rankings.district}</p>
                )}
              </div>
            </div>
          </div>

          {/* Common Events Analysis */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-yellow-400" />
              Head-to-Head Comparison ({comparisonResult.commonEvents.length} Common Events)
            </h3>
            
            <div className="space-y-4">
              {comparisonResult.headToHeadResults.map((result, index) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold flex items-center">
                      {getEventIcon(result.eventName)}
                      <span className="ml-2">{result.eventName}</span>
                    </h4>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      result.winner === 'athlete1' 
                        ? 'bg-blue-900 text-blue-200' 
                        : 'bg-green-900 text-green-200'
                    }`}>
                      Winner: {result.winner === 'athlete1' ? comparisonResult.athlete1.name : comparisonResult.athlete2.name}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div className={`p-3 rounded border ${
                      result.winner === 'athlete1' ? 'border-blue-500 bg-blue-900/20' : 'border-gray-500'
                    }`}>
                      <div className="font-medium text-blue-400">{comparisonResult.athlete1.name}</div>
                      <div className="text-lg font-bold">
                        {formatTime(result.athlete1Best.time) || formatMark(result.athlete1Best.mark)}
                      </div>
                      <div className="text-xs text-gray-400">
                        <div className="flex items-center mt-1">
                          <Calendar className="w-3 h-3 mr-1" />
                          {result.athlete1Best.meetName}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {result.athlete1Best.meetDate}
                        </div>
                        {result.athlete1Best.wind && (
                          <div className="flex items-center">
                            <Wind className="w-3 h-3 mr-1" />
                            Wind: {result.athlete1Best.wind}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={`p-3 rounded border ${
                      result.winner === 'athlete2' ? 'border-green-500 bg-green-900/20' : 'border-gray-500'
                    }`}>
                      <div className="font-medium text-green-400">{comparisonResult.athlete2.name}</div>
                      <div className="text-lg font-bold">
                        {formatTime(result.athlete2Best.time) || formatMark(result.athlete2Best.mark)}
                      </div>
                      <div className="text-xs text-gray-400">
                        <div className="flex items-center mt-1">
                          <Calendar className="w-3 h-3 mr-1" />
                          {result.athlete2Best.meetName}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {result.athlete2Best.meetDate}
                        </div>
                        {result.athlete2Best.wind && (
                          <div className="flex items-center">
                            <Wind className="w-3 h-3 mr-1" />
                            Wind: {result.athlete2Best.wind}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-sm bg-gray-600 p-2 rounded">
                    <span className="font-medium">Margin:</span> {result.margin} | 
                    <span className="ml-2">{result.analysis}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Overall Analysis */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
              Overall Analysis
            </h3>
            <p className="text-gray-300 leading-relaxed">{comparisonResult.overallAnalysis}</p>
          </div>

          {/* Strengths and Weaknesses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-bold mb-4 text-blue-400">
                {comparisonResult.athlete1.name} - Strengths
              </h3>
              <ul className="space-y-2">
                {comparisonResult.strengthsAndWeaknesses.athlete1Strengths.map((strength, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Medal className="w-4 h-4 mr-2 text-yellow-400" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <h3 className="text-lg font-bold mb-4 text-green-400">
                {comparisonResult.athlete2.name} - Strengths
              </h3>
              <ul className="space-y-2">
                {comparisonResult.strengthsAndWeaknesses.athlete2Strengths.map((strength, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <Medal className="w-4 h-4 mr-2 text-yellow-400" />
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Data Sources */}
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h4 className="font-medium mb-2">Data Sources & Analysis</h4>
            <div className="text-sm text-gray-400 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>📊 UIL Official Results</div>
              <div>🏃 MaxPreps Statistics</div>
              <div>⚡ Athletic.net Times</div>
              <div>🤖 AI-Powered Analysis</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}