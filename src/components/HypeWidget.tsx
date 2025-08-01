'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, ShoppingCart, Plus, 
  ArrowUpRight, ArrowDownRight, Star,
  X
} from 'lucide-react';
import { useHypeEconomy } from '@/lib/hype/HypeEconomy';
import type { HypeTransaction, HypePurchasePackage } from '@/lib/hype/HypeEconomy';

interface HypeWidgetProps {
  userId: string;
  compact?: boolean;
  className?: string;
}

export default function HypeWidget({ userId, compact = false, className = '' }: HypeWidgetProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [showPurchase, setShowPurchase] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'history' | 'earn' | 'spend'>('history');
  
  const { 
    balance, 
    earningOpportunities, 
    spendingOptions, 
    purchasePackages,
    earnHype,
    spendHype,
    purchaseHype
  } = useHypeEconomy(userId);

  const handleEarn = async (ruleId: string) => {
    const result = await earnHype(ruleId);
    if (result.success) {
      // Show success animation
      console.log(`Earned ${result.amount} HYPE!`);
    }
  };

  const handleSpend = async (optionId: string) => {
    const result = await spendHype(optionId);
    if (result.success) {
      console.log('Spent HYPE successfully!');
    } else {
      alert(result.error);
    }
  };

  const handlePurchase = async (packageId: string) => {
    const result = await purchaseHype(packageId, 'mock-payment');
    if (result.success) {
      setShowPurchase(false);
      console.log('Purchased HYPE successfully!');
    }
  };

  if (compact) {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowDetails(true)}
        className={`relative group ${className}`}
      >
        <div className="flex items-center gap-2 bg-gradient-to-r from-[#F59E0B] to-[#F97316] px-4 py-2 rounded-full">
          <Zap className="w-5 h-5 text-white" />
          <span className="font-bold text-white">{balance.total.toLocaleString()}</span>
          <span className="text-white/80 text-sm">HYPE</span>
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
      </motion.button>
    );
  }

  return (
    <>
      {/* Main Widget */}
      <div className={`bg-black/80 backdrop-blur-md rounded-2xl border border-white/20 p-6 ${className}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Your HYPE Balance</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Zap className="w-6 h-6 text-[#F59E0B]" />
                <span className="text-3xl font-black text-white">{balance.total.toLocaleString()}</span>
              </div>
              <div className="flex flex-col text-sm">
                <span className="text-green-400">+{balance.earned.toLocaleString()} earned</span>
                <span className="text-red-400">-{balance.spent.toLocaleString()} spent</span>
              </div>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowPurchase(true)}
            className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Get HYPE
          </motion.button>
        </div>

        {/* Balance Breakdown */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-white/70 text-sm">Free HYPE</span>
            </div>
            <span className="text-2xl font-bold text-white">{balance.free.toLocaleString()}</span>
          </div>
          
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <ShoppingCart className="w-5 h-5 text-purple-400" />
              <span className="text-white/70 text-sm">Paid HYPE</span>
            </div>
            <span className="text-2xl font-bold text-white">{balance.paid.toLocaleString()}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowDetails(true)}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium transition-colors"
          >
            View Details
          </button>
          <button
            onClick={() => {
              setSelectedTab('earn');
              setShowDetails(true);
            }}
            className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium transition-colors"
          >
            Earn More
          </button>
        </div>
      </div>

      {/* Detailed View Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/90 backdrop-blur-xl rounded-2xl border border-white/20 max-w-2xl w-full max-h-[80vh] overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">HYPE Economy</h2>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Tabs */}
                <div className="flex gap-4 mt-4">
                  {(['history', 'earn', 'spend'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedTab === tab
                          ? 'bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white'
                          : 'bg-white/10 text-white/70 hover:text-white'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                {selectedTab === 'history' && (
                  <div className="space-y-3">
                    {balance.history.length === 0 ? (
                      <p className="text-white/60 text-center py-8">No transactions yet</p>
                    ) : (
                      balance.history.slice(0, 20).map((transaction) => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                      ))
                    )}
                  </div>
                )}

                {selectedTab === 'earn' && (
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-4 mb-6">
                      <h3 className="text-lg font-bold text-white mb-2">Available Opportunities</h3>
                      <p className="text-white/60 text-sm">Complete these actions to earn HYPE points</p>
                    </div>
                    
                    {earningOpportunities.map((opportunity) => (
                      <motion.button
                        key={opportunity.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleEarn(opportunity.id)}
                        className="w-full bg-white/10 hover:bg-white/20 rounded-xl p-4 text-left transition-all"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-white">{opportunity.name}</h4>
                            <p className="text-white/60 text-sm mt-1">
                              {opportunity.frequency === 'once' && 'One-time bonus'}
                              {opportunity.frequency === 'daily' && 'Available daily'}
                              {opportunity.frequency === 'weekly' && 'Available weekly'}
                              {opportunity.frequency === 'unlimited' && 'Unlimited'}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-[#F59E0B]" />
                            <span className="text-xl font-bold text-[#F59E0B]">+{opportunity.amount}</span>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}

                {selectedTab === 'spend' && (
                  <div className="space-y-4">
                    <div className="bg-white/5 rounded-xl p-4 mb-6">
                      <h3 className="text-lg font-bold text-white mb-2">Spend Your HYPE</h3>
                      <p className="text-white/60 text-sm">Use HYPE for AI services and premium features</p>
                    </div>
                    
                    {spendingOptions.map((option) => (
                      <motion.button
                        key={option.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSpend(option.id)}
                        disabled={balance.total < option.cost}
                        className="w-full bg-white/10 hover:bg-white/20 rounded-xl p-4 text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-white">{option.name}</h4>
                            <p className="text-white/60 text-sm mt-1">{option.description}</p>
                            <span className={`text-xs px-2 py-1 rounded-full mt-2 inline-block ${
                              option.tier === 'free' ? 'bg-green-500/20 text-green-400' :
                              option.tier === 'premium' ? 'bg-purple-500/20 text-purple-400' :
                              'bg-orange-500/20 text-orange-400'
                            }`}>
                              {option.tier.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-[#F97316]" />
                            <span className="text-xl font-bold text-[#F97316]">{option.cost}</span>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Purchase Modal */}
      <AnimatePresence>
        {showPurchase && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowPurchase(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black/90 backdrop-blur-xl rounded-2xl border border-white/20 max-w-md w-full p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Get More HYPE</h2>
              
              <div className="space-y-3">
                {purchasePackages.map((pkg) => (
                  <PackageCard key={pkg.id} package={pkg} onPurchase={handlePurchase} />
                ))}
              </div>
              
              <button
                onClick={() => setShowPurchase(false)}
                className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-medium transition-colors"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Transaction Item Component
function TransactionItem({ transaction }: { transaction: HypeTransaction }) {
  const isPositive = transaction.amount > 0;
  const Icon = isPositive ? ArrowUpRight : ArrowDownRight;
  
  return (
    <div className="flex items-center justify-between bg-white/5 rounded-xl p-4">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${
          isPositive ? 'bg-green-500/20' : 'bg-red-500/20'
        }`}>
          <Icon className={`w-5 h-5 ${
            isPositive ? 'text-green-400' : 'text-red-400'
          }`} />
        </div>
        <div>
          <p className="font-medium text-white">{transaction.description}</p>
          <p className="text-white/60 text-sm">
            {transaction.timestamp.toLocaleString()}
          </p>
        </div>
      </div>
      <span className={`text-lg font-bold ${
        isPositive ? 'text-green-400' : 'text-red-400'
      }`}>
        {isPositive ? '+' : ''}{Math.abs(transaction.amount).toLocaleString()}
      </span>
    </div>
  );
}

// Package Card Component
function PackageCard({ 
  package: pkg, 
  onPurchase 
}: { 
  package: HypePurchasePackage; 
  onPurchase: (id: string) => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onPurchase(pkg.id)}
      className={`relative w-full bg-white/10 hover:bg-white/20 rounded-xl p-4 text-left transition-all ${
        pkg.popular ? 'ring-2 ring-[#F59E0B]' : ''
      }`}
    >
      {pkg.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white text-xs px-3 py-1 rounded-full">
          MOST POPULAR
        </span>
      )}
      
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-bold text-white">{pkg.name}</h4>
          <p className="text-white/60 text-sm mt-1">{pkg.description}</p>
          {pkg.bonus > 0 && (
            <p className="text-[#F59E0B] text-sm mt-2">
              +{pkg.bonus} bonus HYPE included!
            </p>
          )}
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">${pkg.price.toFixed(2)}</p>
          <p className="text-sm text-white/60">{pkg.hypeAmount + pkg.bonus} HYPE</p>
        </div>
      </div>
    </motion.button>
  );
}