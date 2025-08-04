'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Activity, School, Users, BarChart3, CheckCircle, AlertCircle, Loader } from 'lucide-react';

interface BotStatus {
  name: string;
  status: 'active' | 'idle' | 'processing' | 'error';
  lastAction: string;
  uptime: number;
  processedRequests: number;
}

interface BotNetworkState {
  crawlerBot: BotStatus;
  statsBot: BotStatus;
  networkHealth: 'optimal' | 'degraded' | 'critical';
  totalProcessedRequests: number;
  averageResponseTime: number;
}

export default function BotDashboard() {
  const [botStatus, setBotStatus] = useState<BotNetworkState | null>(null);
  const [loading, setLoading] = useState(true);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [activeTest, setActiveTest] = useState<string | null>(null);

  useEffect(() => {
    fetchBotStatus();
    // Refresh status every 5 seconds
    const interval = setInterval(fetchBotStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchBotStatus = async () => {
    try {
      const response = await fetch('/api/bot-status');
      const data = await response.json();
      if (data.success) {
        setBotStatus(data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch bot status:', error);
      setLoading(false);
    }
  };

  const runBotTest = async (testType: string, params: any) => {
    setActiveTest(testType);
    try {
      const response = await fetch('/api/bot-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: testType, ...params })
      });
      
      const data = await response.json();
      setTestResults(prev => [{
        type: testType,
        timestamp: new Date().toLocaleTimeString(),
        success: data.success,
        data: data.data,
        params
      }, ...prev.slice(0, 4)]); // Keep last 5 results
    } catch (error) {
      setTestResults(prev => [{
        type: testType,
        timestamp: new Date().toLocaleTimeString(),
        success: false,
        error: error,
        params
      }, ...prev.slice(0, 4)]);
    }
    setActiveTest(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'optimal':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <Loader className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'error':
      case 'critical':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Bot className="w-5 h-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="p-8 bg-gray-900 text-white rounded-lg">
        <div className="flex items-center justify-center">
          <Loader className="w-8 h-8 animate-spin mr-3" />
          <span>Loading Bot Network...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">🤖 UltraPreps Bot Network</h2>
        <p className="text-gray-300">CrawlerBot & StatsBot Live Dashboard</p>
      </div>

      {/* Network Status */}
      {botStatus && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* CrawlerBot Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <School className="w-6 h-6 text-blue-400 mr-2" />
                <h3 className="font-semibold">CrawlerBot</h3>
              </div>
              {getStatusIcon(botStatus.crawlerBot.status)}
            </div>
            <div className="text-sm text-gray-300 space-y-1">
              <p>Status: <span className="capitalize">{botStatus.crawlerBot.status}</span></p>
              <p>Requests: {botStatus.crawlerBot.processedRequests}</p>
              <p>Uptime: {Math.round(botStatus.crawlerBot.uptime / 1000)}s</p>
              <p className="text-xs">Last: {botStatus.crawlerBot.lastAction}</p>
            </div>
          </motion.div>

          {/* StatsBot Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <BarChart3 className="w-6 h-6 text-green-400 mr-2" />
                <h3 className="font-semibold">StatsBot</h3>
              </div>
              {getStatusIcon(botStatus.statsBot.status)}
            </div>
            <div className="text-sm text-gray-300 space-y-1">
              <p>Status: <span className="capitalize">{botStatus.statsBot.status}</span></p>
              <p>Requests: {botStatus.statsBot.processedRequests}</p>
              <p>Uptime: {Math.round(botStatus.statsBot.uptime / 1000)}s</p>
              <p className="text-xs">Last: {botStatus.statsBot.lastAction}</p>
            </div>
          </motion.div>

          {/* Network Health */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 p-4 rounded-lg border border-gray-700"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Activity className="w-6 h-6 text-purple-400 mr-2" />
                <h3 className="font-semibold">Network</h3>
              </div>
              {getStatusIcon(botStatus.networkHealth)}
            </div>
            <div className="text-sm text-gray-300 space-y-1">
              <p>Health: <span className="capitalize">{botStatus.networkHealth}</span></p>
              <p>Total Requests: {botStatus.totalProcessedRequests}</p>
              <p>Avg Response: {botStatus.averageResponseTime}ms</p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Test Actions */}
      <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
        <h3 className="font-semibold mb-4 flex items-center">
          <Bot className="w-5 h-5 mr-2" />
          Live Bot Testing
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => runBotTest('researchSchool', { schoolName: 'Marble Falls High School' })}
            disabled={activeTest !== null}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
          >
            {activeTest === 'researchSchool' ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <School className="w-4 h-4 mr-1" />
                School Research
              </>
            )}
          </button>

          <button
            onClick={() => runBotTest('researchActivity', { activityType: 'theater', schoolName: 'Marble Falls High School' })}
            disabled={activeTest !== null}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
          >
            {activeTest === 'researchActivity' ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Activity className="w-4 h-4 mr-1" />
                Theater Research
              </>
            )}
          </button>

          <button
            onClick={() => runBotTest('analyzeStudent', { studentName: 'Caleb Johnson', schoolName: 'Marble Falls High School', activityType: 'football' })}
            disabled={activeTest !== null}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
          >
            {activeTest === 'analyzeStudent' ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Users className="w-4 h-4 mr-1" />
                Student Analysis
              </>
            )}
          </button>

          <button
            onClick={() => runBotTest('healthCheck', {})}
            disabled={activeTest !== null}
            className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center"
          >
            {activeTest === 'healthCheck' ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-1" />
                Health Check
              </>
            )}
          </button>
        </div>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
          <h3 className="font-semibold mb-4">Recent Test Results</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {testResults.map((result, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-3 rounded-lg border ${
                  result.success 
                    ? 'border-green-500 bg-green-500/10' 
                    : 'border-red-500 bg-red-500/10'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium capitalize">{result.type.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-xs text-gray-400">{result.timestamp}</span>
                </div>
                {result.success ? (
                  <div className="text-sm text-gray-300">
                    {result.type === 'researchSchool' && result.data && (
                      <p>Found: {result.data.name} - {result.data.mascot}</p>
                    )}
                    {result.type === 'analyzeStudent' && result.data && (
                      <p>Analyzed: {result.data.profile?.name} - GPA: {result.data.stats?.gpa}</p>
                    )}
                    {result.type === 'researchActivity' && result.data && (
                      <p>Activity: {result.params.activityType} research complete</p>
                    )}
                    {result.type === 'healthCheck' && result.data && (
                      <p>Health: {result.data.healthy ? '✅ Healthy' : '⚠️ Issues detected'}</p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-red-300">Test failed: {result.error}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}