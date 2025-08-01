'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Trophy, TrendingUp, Gift, Target, Star, Activity, RefreshCw } from 'lucide-react';
import HypeLeaderboard from '@/components/HypeLeaderboard';
import { useWebSocket } from '@/lib/websocket/client';

// Mock users for testing
const mockUsers = [
  { id: 'user-1', name: 'Jake Thompson', school: 'Marble Falls HS', sport: 'Football' },
  { id: 'user-2', name: 'Sarah Williams', school: 'Austin HS', sport: 'Basketball' },
  { id: 'user-3', name: 'Mike Chen', school: 'North Dallas HS', sport: 'Track' },
  { id: 'user-4', name: 'Emma Rodriguez', school: 'Memorial HS', sport: 'Soccer' },
  { id: 'user-5', name: 'Tyler Johnson', school: 'Central HS', sport: 'Baseball' }
];

// HYPE transaction types
const transactionTypes = [
  { type: 'game_performance', name: 'Game Performance', icon: Trophy, amount: 50, color: 'text-yellow-500' },
  { type: 'achievement', name: 'Achievement', icon: Star, amount: 30, color: 'text-purple-500' },
  { type: 'social_share', name: 'Social Share', icon: Activity, amount: 15, color: 'text-blue-500' },
  { type: 'fan_boost', name: 'Fan Boost', icon: Zap, amount: 25, color: 'text-orange-500' },
  { type: 'daily_login', name: 'Daily Login', icon: Gift, amount: 10, color: 'text-green-500' },
  { type: 'milestone', name: 'Milestone', icon: Target, amount: 100, color: 'text-pink-500' }
];

export default function TestHypePage() {
  const [selectedUser, setSelectedUser] = useState(mockUsers[0]);
  const [userBalance, setUserBalance] = useState<number>(0);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [leaderboardType, setLeaderboardType] = useState<'global' | 'school' | 'sport'>('global');
  const { isConnected, sendHype } = useWebSocket();

  // Fetch user balance
  const fetchUserBalance = async () => {
    try {
      const response = await fetch(`/api/hype/balance/${selectedUser.id}`);
      if (response.ok) {
        const data = await response.json();
        setUserBalance(data.balance);
      }
    } catch (error) {
      console.error('Failed to fetch balance:', error);
      // Use mock balance for demo
      setUserBalance(Math.floor(Math.random() * 1000) + 100);
    }
  };

  useEffect(() => {
    fetchUserBalance();
  }, [selectedUser]);

  // Award HYPE to selected user
  const awardHype = async (transactionType: typeof transactionTypes[0]) => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/hype/award', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: selectedUser.id,
          amount: transactionType.amount,
          type: transactionType.type,
          description: `${transactionType.name} for ${selectedUser.name}`,
          metadata: {
            school: selectedUser.school,
            sport: selectedUser.sport
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        setUserBalance(data.newBalance);
        
        // Add to recent transactions
        setRecentTransactions(prev => [{
          ...transactionType,
          timestamp: new Date(),
          user: selectedUser
        }, ...prev].slice(0, 5));
        
        // Send WebSocket update (if connected)
        if (isConnected && sendHype) {
          sendHype(selectedUser.id, transactionType.amount);
        }
      }
    } catch (error) {
      console.error('Failed to award HYPE:', error);
      
      // Mock for demo
      const newBalance = userBalance + transactionType.amount;
      setUserBalance(newBalance);
      setRecentTransactions(prev => [{
        ...transactionType,
        timestamp: new Date(),
        user: selectedUser
      }, ...prev].slice(0, 5));
    } finally {
      setLoading(false);
    }
  };

  // Simulate random HYPE events
  const simulateRandomEvent = () => {
    const randomUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const randomTransaction = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
    
    if (isConnected && sendHype) {
      sendHype(randomUser.id, randomTransaction.amount);
    }
    
    // Show in UI
    setRecentTransactions(prev => [{
      ...randomTransaction,
      timestamp: new Date(),
      user: randomUser
    }, ...prev].slice(0, 5));
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Zap className="w-10 h-10 text-[#F59E0B]" />
            HYPE Economy Test Suite
          </h1>
          <p className="text-gray-400">
            Real-time HYPE transactions and leaderboard system
          </p>
          
          {/* Connection Status */}
          <div className="mt-4 flex items-center gap-4">
            <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
              isConnected ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
            }`}>
              WebSocket: {isConnected ? 'Connected' : 'Disconnected'}
            </div>
            <button
              onClick={simulateRandomEvent}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-all"
            >
              Simulate Random Event
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - HYPE Controls */}
          <div className="space-y-6">
            {/* User Selection */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Select User</h2>
              <div className="grid grid-cols-1 gap-3">
                {mockUsers.map(user => (
                  <button
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`p-4 rounded-lg text-left transition-all ${
                      selectedUser.id === user.id
                        ? 'bg-[#F59E0B] text-black'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm opacity-80">{user.school} • {user.sport}</div>
                  </button>
                ))}
              </div>
              
              {/* Current Balance */}
              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Current Balance</div>
                <div className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-[#F59E0B]" />
                  <span className="text-3xl font-bold">{userBalance.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Award HYPE */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Award HYPE</h2>
              <div className="grid grid-cols-2 gap-3">
                {transactionTypes.map((type, index) => {
                  const Icon = type.icon;
                  return (
                    <motion.button
                      key={type.type}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => awardHype(type)}
                      disabled={loading}
                      className="bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed p-4 rounded-lg transition-all"
                    >
                      <Icon className={`w-8 h-8 mb-2 ${type.color}`} />
                      <div className="font-semibold">{type.name}</div>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        <Zap className="w-4 h-4 text-[#F59E0B]" />
                        <span className="text-[#F59E0B] font-bold">+{type.amount}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Activity className="w-6 h-6" />
                Recent Activity
              </h2>
              <div className="space-y-3">
                {recentTransactions.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No recent transactions</p>
                ) : (
                  recentTransactions.map((transaction, index) => {
                    const Icon = transaction.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg"
                      >
                        <Icon className={`w-6 h-6 ${transaction.color}`} />
                        <div className="flex-1">
                          <div className="font-semibold">{transaction.user.name}</div>
                          <div className="text-sm text-gray-400">{transaction.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <Zap className="w-4 h-4 text-[#F59E0B]" />
                            <span className="font-bold text-[#F59E0B]">+{transaction.amount}</span>
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(transaction.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Leaderboards */}
          <div className="space-y-6">
            {/* Leaderboard Type Selector */}
            <div className="flex gap-2">
              {(['global', 'school', 'sport'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setLeaderboardType(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    leaderboardType === type
                      ? 'bg-[#F59E0B] text-black'
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>

            {/* Leaderboard Component */}
            <HypeLeaderboard
              type={leaderboardType}
              schoolId={leaderboardType === 'school' ? 'test-school-1' : undefined}
              sport={leaderboardType === 'sport' ? 'Football' : undefined}
              limit={10}
              showWeekly={true}
            />

            {/* HYPE Economy Stats */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-green-500" />
                Economy Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Total HYPE in Circulation</div>
                  <div className="text-2xl font-bold text-[#F59E0B]">2.4M</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Active Users Today</div>
                  <div className="text-2xl font-bold text-green-500">1,247</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Transactions (24h)</div>
                  <div className="text-2xl font-bold text-blue-500">8,934</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-sm text-gray-400 mb-1">Avg HYPE per User</div>
                  <div className="text-2xl font-bold text-purple-500">1,923</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500">
          <p>HYPE Economy v1.0 - Real-time engagement rewards</p>
          <p className="text-sm mt-2">Every action counts. Every moment matters.</p>
        </div>
      </div>
    </div>
  );
}