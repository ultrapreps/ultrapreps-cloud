'use client';

import { useState, useEffect } from 'react';

// Types
export interface HypeTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'earned' | 'spent' | 'purchased' | 'gifted';
  category: HypeCategory;
  description: string;
  timestamp: Date;
  metadata?: {
    source?: string;
    target?: string;
    multiplier?: number;
    achievement?: string;
    message?: string;
  };
}

export interface HypeBalance {
  free: number;
  paid: number;
  total: number;
  earned: number;
  spent: number;
  gifted: number;
  history: HypeTransaction[];
}

export interface HypeEarningRule {
  id: string;
  name: string;
  category: HypeCategory;
  amount: number;
  frequency: 'once' | 'daily' | 'weekly' | 'unlimited';
  conditions?: string[];
  multipliers?: {
    condition: string;
    multiplier: number;
  }[];
}

export interface HypeSpendingOption {
  id: string;
  name: string;
  category: HypeCategory;
  cost: number;
  tier: 'free' | 'premium' | 'paid-priority';
  description: string;
  icon?: string;
  cooldown?: number;
}

export interface HypePurchasePackage {
  id: string;
  name: string;
  hypeAmount: number;
  price: number;
  bonus: number;
  popular?: boolean;
  description: string;
}

export type HypeCategory = 
  | 'onboarding'
  | 'engagement'
  | 'social'
  | 'achievement'
  | 'academic'
  | 'athletic'
  | 'content'
  | 'entertainment'
  | 'community'
  | 'gift';

// Constants
const HYPE_CONVERSION_RATE = 100; // 100 HYPE = $1.00
const SUSTAINABILITY_MULTIPLIER = 2.3; // 130% rule

// Earning Rules
const EARNING_RULES: HypeEarningRule[] = [
  // Onboarding (One-time)
  { id: 'welcome', name: 'Welcome Bonus', category: 'onboarding', amount: 100, frequency: 'once' },
  { id: 'profile-complete', name: 'Complete Profile', category: 'onboarding', amount: 50, frequency: 'once' },
  { id: 'school-verify', name: 'Verify School', category: 'onboarding', amount: 25, frequency: 'once' },
  { id: 'first-herocard', name: 'First Hero Card', category: 'onboarding', amount: 75, frequency: 'once' },
  { id: 'family-invite', name: 'Family Member Join', category: 'onboarding', amount: 100, frequency: 'unlimited' },
  { id: 'coach-team', name: 'Coach Team Creation', category: 'onboarding', amount: 200, frequency: 'once' },
  
  // Daily Engagement
  { id: 'daily-login', name: 'Daily Login', category: 'engagement', amount: 10, frequency: 'daily' },
  { id: 'profile-view', name: 'Profile View Received', category: 'engagement', amount: 2, frequency: 'unlimited' },
  { id: 'comment', name: 'Comment Interaction', category: 'engagement', amount: 5, frequency: 'unlimited' },
  { id: 'content-upload', name: 'Content Upload', category: 'engagement', amount: 25, frequency: 'unlimited', 
    multipliers: [
      { condition: 'trending', multiplier: 2.0 },
      { condition: 'featured', multiplier: 1.5 }
    ]
  },
  
  // Social Actions
  { id: 'teammate-invite', name: 'Teammate Invitation', category: 'social', amount: 50, frequency: 'unlimited' },
  { id: 'viral-content', name: 'Viral Content', category: 'social', amount: 100, frequency: 'unlimited' },
  { id: 'event-participation', name: 'Event Participation', category: 'social', amount: 50, frequency: 'unlimited' },
  { id: 'peer-tutoring', name: 'Peer Tutoring', category: 'social', amount: 30, frequency: 'unlimited' },
  { id: 'school-spirit', name: 'School Spirit Activity', category: 'social', amount: 40, frequency: 'unlimited' },
  
  // Achievement Recognition
  { id: 'grade-improve', name: 'Grade Improvement', category: 'achievement', amount: 50, frequency: 'unlimited' },
  { id: 'athletic-milestone', name: 'Athletic Milestone', category: 'achievement', amount: 75, frequency: 'unlimited' },
  { id: 'leadership-role', name: 'Leadership Position', category: 'achievement', amount: 100, frequency: 'unlimited' },
  { id: 'community-service', name: 'Community Service Hour', category: 'achievement', amount: 40, frequency: 'unlimited' },
  { id: 'scholarship-earned', name: 'Scholarship Earned', category: 'achievement', amount: 500, frequency: 'unlimited' }
];

// Spending Options
const SPENDING_OPTIONS: HypeSpendingOption[] = [
  // AI Academic Services
  { id: 'single-tutor', name: 'Single Subject Tutoring', category: 'academic', cost: 50, tier: 'free', description: 'AI tutoring for one subject' },
  { id: 'homework-help', name: 'Homework Assistance', category: 'academic', cost: 25, tier: 'free', description: 'Help with specific assignment' },
  { id: 'study-guide', name: 'Study Guide Generation', category: 'academic', cost: 75, tier: 'free', description: 'Custom study guide creation' },
  { id: 'essay-help', name: 'Basic Essay Help', category: 'academic', cost: 100, tier: 'free', description: 'Essay structure and feedback' },
  
  // Advanced Academic AI
  { id: 'sat-prep', name: 'SAT/ACT Prep Session', category: 'academic', cost: 150, tier: 'premium', description: 'Test prep with AI tutor' },
  { id: 'college-essay', name: 'College Essay Optimization', category: 'academic', cost: 200, tier: 'premium', description: 'Advanced essay assistance' },
  { id: 'app-strategy', name: 'Application Strategy', category: 'academic', cost: 300, tier: 'premium', description: 'College application planning' },
  { id: 'scholarship-search', name: 'Scholarship Search', category: 'academic', cost: 100, tier: 'premium', description: 'Personalized scholarship matching' },
  
  // Content Creation
  { id: 'premium-herocard', name: 'Premium Hero Card', category: 'content', cost: 150, tier: 'free', description: 'Enhanced hero card design' },
  { id: 'elite-herocard', name: 'Elite Hero Card', category: 'content', cost: 300, tier: 'premium', description: 'Professional hero card' },
  { id: 'legendary-herocard', name: 'Legendary Hero Card', category: 'content', cost: 500, tier: 'paid-priority', description: 'Ultimate hero card design' },
  { id: 'highlight-video', name: 'Game Highlight Video', category: 'content', cost: 300, tier: 'premium', description: 'AI-generated highlight reel' },
  { id: 'recruitment-showcase', name: 'Recruitment Showcase', category: 'content', cost: 500, tier: 'paid-priority', description: 'College recruitment package' },
  
  // Entertainment
  { id: 'basic-sticker', name: 'Basic Sticker Roll', category: 'entertainment', cost: 25, tier: 'free', description: 'Common sticker chance' },
  { id: 'premium-sticker', name: 'Premium Sticker Roll', category: 'entertainment', cost: 50, tier: 'free', description: 'Rare sticker boost' },
  { id: 'legendary-sticker', name: 'Legendary Sticker Roll', category: 'entertainment', cost: 150, tier: 'premium', description: 'Guaranteed rare+' },
  { id: 'profile-boost', name: 'Profile Boost', category: 'entertainment', cost: 50, tier: 'free', description: '24hr featured status' },
  
  // Community
  { id: 'school-boost', name: 'School Spirit Boost', category: 'community', cost: 100, tier: 'free', description: 'School-wide benefit' },
  { id: 'team-support', name: 'Team Support Package', category: 'community', cost: 200, tier: 'premium', description: 'Team-wide benefits' },
  { id: 'rivalry-challenge', name: 'Rivalry Challenge', category: 'community', cost: 150, tier: 'premium', description: 'Cross-school competition' }
];

// Purchase Packages
const PURCHASE_PACKAGES: HypePurchasePackage[] = [
  { id: 'starter', name: 'Starter Pack', hypeAmount: 500, price: 5.00, bonus: 0, description: 'Get started with HYPE' },
  { id: 'player', name: 'Player Pack', hypeAmount: 1200, price: 10.00, bonus: 200, description: '20% bonus HYPE', popular: true },
  { id: 'allstar', name: 'All-Star Pack', hypeAmount: 2500, price: 20.00, bonus: 500, description: '25% bonus HYPE' },
  { id: 'champion', name: 'Champion Pack', hypeAmount: 6000, price: 40.00, bonus: 2000, description: '50% bonus HYPE' }
];

// Main HypeEconomy Class
export class HypeEconomy {
  private userBalances: Map<string, HypeBalance> = new Map();
  private dailyEarningTrackers: Map<string, Map<string, Date>> = new Map();
  private totalRevenue = 0;
  private freeHypeBudget = 0;
  private listeners: ((userId: string, balance: HypeBalance) => void)[] = [];

  constructor() {
    // Initialize with mock data in development
    if (process.env.NODE_ENV === 'development') {
      this.initializeMockData();
    }
  }

  // Subscribe to balance changes
  subscribe(listener: (userId: string, balance: HypeBalance) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify subscribers
  private notifyListeners(userId: string, balance: HypeBalance) {
    this.listeners.forEach(listener => listener(userId, balance));
  }

  // Get user balance
  getBalance(userId: string): HypeBalance {
    if (!this.userBalances.has(userId)) {
      this.userBalances.set(userId, {
        free: 0,
        paid: 0,
        total: 0,
        earned: 0,
        spent: 0,
        gifted: 0,
        history: []
      });
    }
    return this.userBalances.get(userId)!;
  }

  // Earn HYPE
  async earnHype(userId: string, ruleId: string, metadata?: Record<string, unknown>): Promise<{ success: boolean; amount?: number; error?: string }> {
    const rule = EARNING_RULES.find(r => r.id === ruleId);
    if (!rule) {
      return { success: false, error: 'Invalid earning rule' };
    }

    // Check frequency limits
    if (rule.frequency === 'once') {
      const balance = this.getBalance(userId);
      const alreadyEarned = balance.history.some(t => t.metadata?.source === ruleId);
      if (alreadyEarned) {
        return { success: false, error: 'Already claimed this one-time bonus' };
      }
    }

    if (rule.frequency === 'daily') {
      const tracker = this.dailyEarningTrackers.get(userId) || new Map();
      const lastClaim = tracker.get(ruleId);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (lastClaim && lastClaim >= today) {
        return { success: false, error: 'Already claimed today' };
      }
      
      tracker.set(ruleId, new Date());
      this.dailyEarningTrackers.set(userId, tracker);
    }

    // Calculate amount with multipliers
    let amount = rule.amount;
    if (rule.multipliers && metadata) {
      for (const { condition, multiplier } of rule.multipliers) {
        if (metadata[condition]) {
          amount = Math.floor(amount * multiplier);
        }
      }
    }

    // Add transaction
    const transaction: HypeTransaction = {
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      amount,
      type: 'earned',
      category: rule.category,
      description: rule.name,
      timestamp: new Date(),
      metadata: { source: ruleId, ...metadata }
    };

    const balance = this.getBalance(userId);
    balance.free += amount;
    balance.total += amount;
    balance.earned += amount;
    balance.history.unshift(transaction);
    
    this.notifyListeners(userId, balance);
    
    return { success: true, amount };
  }

  // Spend HYPE
  async spendHype(userId: string, optionId: string, usePaid: boolean = false): Promise<{ success: boolean; error?: string }> {
    const option = SPENDING_OPTIONS.find(o => o.id === optionId);
    if (!option) {
      return { success: false, error: 'Invalid spending option' };
    }

    const balance = this.getBalance(userId);

    // Check if user has enough HYPE
    if (usePaid) {
      if (balance.paid < option.cost) {
        return { success: false, error: 'Insufficient paid HYPE balance' };
      }
    } else {
      if (balance.free < option.cost) {
        return { success: false, error: 'Insufficient free HYPE balance' };
      }

      // Check 130% rule for free HYPE spending
      if (option.tier === 'premium' || option.tier === 'paid-priority') {
        const canSpendFree = this.checkSustainabilityRule(option.cost);
        if (!canSpendFree) {
          return { success: false, error: 'Free HYPE budget exceeded. Please use paid HYPE or try again later.' };
        }
      }
    }

    // Process transaction
    const transaction: HypeTransaction = {
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      amount: -option.cost,
      type: 'spent',
      category: option.category,
      description: option.name,
      timestamp: new Date(),
      metadata: { target: optionId }
    };

    if (usePaid) {
      balance.paid -= option.cost;
    } else {
      balance.free -= option.cost;
    }
    balance.total -= option.cost;
    balance.spent += option.cost;
    balance.history.unshift(transaction);

    this.notifyListeners(userId, balance);

    return { success: true };
  }

  // Purchase HYPE
  async purchaseHype(userId: string, packageId: string, _paymentMethod: string): Promise<{ success: boolean; error?: string }> {
    const pkg = PURCHASE_PACKAGES.find(p => p.id === packageId);
    if (!pkg) {
      return { success: false, error: 'Invalid package' };
    }

    // In production, this would process payment
    // For now, simulate successful payment
    const totalHype = pkg.hypeAmount + pkg.bonus;

    const transaction: HypeTransaction = {
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      amount: totalHype,
      type: 'purchased',
      category: 'entertainment',
      description: `Purchased ${pkg.name}`,
      timestamp: new Date(),
      metadata: { source: packageId }
    };

    const balance = this.getBalance(userId);
    balance.paid += totalHype;
    balance.total += totalHype;
    balance.history.unshift(transaction);

    // Update revenue for 130% rule
    this.totalRevenue += pkg.price;
    this.updateFreeHypeBudget();

    this.notifyListeners(userId, balance);

    return { success: true };
  }

  // Gift HYPE
  async giftHype(fromUserId: string, toUserId: string, amount: number, message?: string): Promise<{ success: boolean; error?: string }> {
    const fromBalance = this.getBalance(fromUserId);
    
    if (fromBalance.paid < amount) {
      return { success: false, error: 'Insufficient paid HYPE for gifting' };
    }

    // Deduct from sender
    const fromTransaction: HypeTransaction = {
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: fromUserId,
      amount: -amount,
      type: 'gifted',
      category: 'gift',
      description: `Gifted to ${toUserId}`,
      timestamp: new Date(),
      metadata: { target: toUserId, message }
    };

    fromBalance.paid -= amount;
    fromBalance.total -= amount;
    fromBalance.gifted += amount;
    fromBalance.history.unshift(fromTransaction);

    // Add to recipient
    const toBalance = this.getBalance(toUserId);
    const toTransaction: HypeTransaction = {
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: toUserId,
      amount,
      type: 'gifted',
      category: 'gift',
      description: `Received from ${fromUserId}`,
      timestamp: new Date(),
      metadata: { source: fromUserId, message }
    };

    toBalance.paid += amount;
    toBalance.total += amount;
    toBalance.history.unshift(toTransaction);

    this.notifyListeners(fromUserId, fromBalance);
    this.notifyListeners(toUserId, toBalance);

    return { success: true };
  }

  // Check 130% sustainability rule
  private checkSustainabilityRule(cost: number): boolean {
    const costInDollars = cost / HYPE_CONVERSION_RATE;
    return this.freeHypeBudget >= costInDollars;
  }

  // Update free HYPE budget based on revenue
  private updateFreeHypeBudget() {
    this.freeHypeBudget = this.totalRevenue / SUSTAINABILITY_MULTIPLIER;
  }

  // Get available earning opportunities for user
  getEarningOpportunities(userId: string): HypeEarningRule[] {
    const balance = this.getBalance(userId);
    const earnedRuleIds = new Set(
      balance.history
        .filter(t => t.type === 'earned')
        .map(t => t.metadata?.source)
        .filter(Boolean)
    );

    return EARNING_RULES.filter(rule => {
      // Filter out one-time rules already claimed
      if (rule.frequency === 'once' && earnedRuleIds.has(rule.id)) {
        return false;
      }

      // Check daily rules
      if (rule.frequency === 'daily') {
        const tracker = this.dailyEarningTrackers.get(userId);
        if (tracker) {
          const lastClaim = tracker.get(rule.id);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (lastClaim && lastClaim >= today) {
            return false;
          }
        }
      }

      return true;
    });
  }

  // Get spending options
  getSpendingOptions(): HypeSpendingOption[] {
    return SPENDING_OPTIONS;
  }

  // Get purchase packages
  getPurchasePackages(): HypePurchasePackage[] {
    return PURCHASE_PACKAGES;
  }

  // Initialize mock data for development
  private initializeMockData() {
    // Set some initial revenue
    this.totalRevenue = 10000;
    this.updateFreeHypeBudget();

    // Create a test user with some balance
    const testUserId = 'test-user-123';
    this.earnHype(testUserId, 'welcome');
    this.earnHype(testUserId, 'profile-complete');
    this.earnHype(testUserId, 'daily-login');
  }

  // Get system stats (for admin dashboard)
  getSystemStats() {
    return {
      totalRevenue: this.totalRevenue,
      freeHypeBudget: this.freeHypeBudget,
      sustainabilityRatio: this.totalRevenue > 0 ? (this.freeHypeBudget * SUSTAINABILITY_MULTIPLIER) / this.totalRevenue : 0,
      totalUsers: this.userBalances.size,
      totalHypeInCirculation: Array.from(this.userBalances.values()).reduce((sum, balance) => sum + balance.total, 0)
    };
  }
}

// Singleton instance
export const hypeEconomy = new HypeEconomy();

// React Hook
export function useHypeEconomy(userId: string) {
  const [balance, setBalance] = useState<HypeBalance>(hypeEconomy.getBalance(userId));
  const [earningOpportunities, setEarningOpportunities] = useState<HypeEarningRule[]>([]);

  useEffect(() => {
    // Subscribe to balance changes
    const unsubscribe = hypeEconomy.subscribe((changedUserId, newBalance) => {
      if (changedUserId === userId) {
        setBalance(newBalance);
      }
    });

    // Update earning opportunities
    const updateOpportunities = () => {
      setEarningOpportunities(hypeEconomy.getEarningOpportunities(userId));
    };

    updateOpportunities();
    const interval = setInterval(updateOpportunities, 60000); // Update every minute

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [userId]);

  return {
    balance,
    earningOpportunities,
    spendingOptions: hypeEconomy.getSpendingOptions(),
    purchasePackages: hypeEconomy.getPurchasePackages(),
    earnHype: (ruleId: string, metadata?: Record<string, unknown>) => hypeEconomy.earnHype(userId, ruleId, metadata),
    spendHype: (optionId: string, usePaid?: boolean) => hypeEconomy.spendHype(userId, optionId, usePaid),
    purchaseHype: (packageId: string, paymentMethod: string) => hypeEconomy.purchaseHype(userId, packageId, paymentMethod),
    giftHype: (toUserId: string, amount: number, message?: string) => hypeEconomy.giftHype(userId, toUserId, amount, message)
  };
}