import { prisma } from '@/lib/prisma';
import { HypeEvent, User, Prisma } from '@prisma/client';
import { emitHypeUpdate } from '@/lib/websocket/server';

export type HypeTransactionType = 
  | 'game_performance'
  | 'achievement'
  | 'social_share'
  | 'fan_boost'
  | 'milestone'
  | 'daily_login'
  | 'content_creation'
  | 'community_engagement'
  | 'academic_achievement'
  | 'signup_bonus';

export interface HypeTransaction {
  userId: string;
  amount: number;
  type: HypeTransactionType;
  description: string;
  metadata?: Record<string, any>;
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  schoolName: string;
  sport: string;
  totalHype: number;
  weeklyHype: number;
  rank: number;
  change: number; // Position change from last week
  avatar?: string;
}

export interface HypeMultiplier {
  type: string;
  multiplier: number;
  reason: string;
}

export class HypeManager {
  // Base HYPE rewards
  private readonly HYPE_REWARDS = {
    signup_bonus: 100,
    daily_login: 10,
    game_win: 50,
    game_participation: 20,
    touchdown: 25,
    goal_scored: 25,
    personal_record: 30,
    social_share: 15,
    fan_boost_small: 10,
    fan_boost_medium: 25,
    fan_boost_large: 50,
    milestone_100: 50,
    milestone_500: 100,
    milestone_1000: 200,
    academic_honor_roll: 75,
    academic_4_0_gpa: 100,
    content_post: 20,
    highlight_video: 40
  };

  /**
   * Award HYPE to a user
   */
  async awardHype(transaction: HypeTransaction): Promise<HypeEvent> {
    console.log(`🔥 Awarding ${transaction.amount} HYPE to ${transaction.userId}`);
    
    // Create HYPE event
    const hypeEvent = await prisma.hypeEvent.create({
      data: {
        userId: transaction.userId,
        amount: transaction.amount,
        type: transaction.type.toUpperCase(),
        description: transaction.description,
        metadata: transaction.metadata || {}
      },
      include: {
        user: {
          include: {
            school: true
          }
        }
      }
    });

    // Update user's HYPE balance
    const updatedBalance = await prisma.hypeBalance.upsert({
      where: { userId: transaction.userId },
      update: {
        totalEarned: { increment: transaction.amount },
        currentBalance: { increment: transaction.amount }
      },
      create: {
        userId: transaction.userId,
        totalEarned: transaction.amount,
        currentBalance: transaction.amount,
        totalSpent: 0
      }
    });

    // Emit real-time update via WebSocket
    emitHypeUpdate({
      userId: transaction.userId,
      amount: transaction.amount,
      totalHype: updatedBalance.currentBalance,
      type: transaction.type,
      description: transaction.description
    });

    // Check for milestones
    await this.checkMilestones(transaction.userId, updatedBalance.totalEarned);

    return hypeEvent;
  }

  /**
   * Spend HYPE (for future features like boosts, items, etc.)
   */
  async spendHype(userId: string, amount: number, reason: string): Promise<boolean> {
    const balance = await prisma.hypeBalance.findUnique({
      where: { userId }
    });

    if (!balance || balance.currentBalance < amount) {
      return false; // Insufficient balance
    }

    // Update balance
    await prisma.hypeBalance.update({
      where: { userId },
      data: {
        currentBalance: { decrement: amount },
        totalSpent: { increment: amount }
      }
    });

    // Record the spend event
    await prisma.hypeEvent.create({
      data: {
        userId,
        amount: -amount, // Negative for spending
        type: 'SPEND',
        description: reason
      }
    });

    return true;
  }

  /**
   * Get user's HYPE balance
   */
  async getBalance(userId: string): Promise<number> {
    const balance = await prisma.hypeBalance.findUnique({
      where: { userId }
    });

    return balance?.currentBalance || 0;
  }

  /**
   * Get HYPE transaction history
   */
  async getHistory(userId: string, limit: number = 20): Promise<HypeEvent[]> {
    return await prisma.hypeEvent.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      include: {
        user: true
      }
    });
  }

  /**
   * Check and award milestone HYPE
   */
  private async checkMilestones(userId: string, totalEarned: number): Promise<void> {
    const milestones = [
      { threshold: 100, reward: this.HYPE_REWARDS.milestone_100 },
      { threshold: 500, reward: this.HYPE_REWARDS.milestone_500 },
      { threshold: 1000, reward: this.HYPE_REWARDS.milestone_1000 },
      { threshold: 5000, reward: 500 },
      { threshold: 10000, reward: 1000 }
    ];

    for (const milestone of milestones) {
      if (totalEarned >= milestone.threshold && 
          totalEarned - milestone.reward < milestone.threshold) {
        // User just crossed this milestone
        await this.awardHype({
          userId,
          amount: milestone.reward,
          type: 'milestone',
          description: `Reached ${milestone.threshold} total HYPE!`
        });
      }
    }
  }

  /**
   * Get global leaderboard
   */
  async getGlobalLeaderboard(limit: number = 100): Promise<LeaderboardEntry[]> {
    const topUsers = await prisma.hypeBalance.findMany({
      take: limit,
      orderBy: { totalEarned: 'desc' },
      include: {
        user: {
          include: {
            school: true
          }
        }
      }
    });

    return topUsers.map((entry, index) => ({
      userId: entry.userId,
      userName: entry.user.name || 'Anonymous',
      schoolName: entry.user.school?.name || 'Unknown School',
      sport: 'Multiple', // Would need to get primary sport
      totalHype: entry.totalEarned,
      weeklyHype: 0, // Would need to calculate
      rank: index + 1,
      change: 0, // Would need to track historical data
      avatar: entry.user.image
    }));
  }

  /**
   * Get school leaderboard
   */
  async getSchoolLeaderboard(schoolId: string, limit: number = 50): Promise<LeaderboardEntry[]> {
    const schoolUsers = await prisma.hypeBalance.findMany({
      where: {
        user: {
          schoolId
        }
      },
      take: limit,
      orderBy: { totalEarned: 'desc' },
      include: {
        user: {
          include: {
            school: true
          }
        }
      }
    });

    return schoolUsers.map((entry, index) => ({
      userId: entry.userId,
      userName: entry.user.name || 'Anonymous',
      schoolName: entry.user.school?.name || 'Unknown School',
      sport: 'Multiple',
      totalHype: entry.totalEarned,
      weeklyHype: 0,
      rank: index + 1,
      change: 0,
      avatar: entry.user.image
    }));
  }

  /**
   * Get sport-specific leaderboard
   */
  async getSportLeaderboard(sport: string, limit: number = 50): Promise<LeaderboardEntry[]> {
    // This would need sport association in the user model
    // For now, returning global leaderboard
    return this.getGlobalLeaderboard(limit);
  }

  /**
   * Calculate weekly HYPE (last 7 days)
   */
  async getWeeklyHype(userId: string): Promise<number> {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const weeklyEvents = await prisma.hypeEvent.aggregate({
      where: {
        userId,
        createdAt: {
          gte: sevenDaysAgo
        },
        amount: {
          gt: 0 // Only count positive transactions
        }
      },
      _sum: {
        amount: true
      }
    });

    return weeklyEvents._sum.amount || 0;
  }

  /**
   * Get HYPE multipliers for a user
   */
  async getMultipliers(userId: string): Promise<HypeMultiplier[]> {
    const multipliers: HypeMultiplier[] = [];
    
    // Check user data for multiplier conditions
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        school: true,
        hypeBalance: true
      }
    });

    if (!user) return multipliers;

    // Streak multiplier (would need streak tracking)
    // Premium multiplier (would need subscription status)
    // Event multipliers (would need event system)
    
    // Example multipliers
    if (user.hypeBalance && user.hypeBalance.totalEarned > 1000) {
      multipliers.push({
        type: 'veteran',
        multiplier: 1.1,
        reason: '10% bonus for 1000+ total HYPE'
      });
    }

    return multipliers;
  }

  /**
   * Award HYPE for specific game events
   */
  async awardGamePerformance(userId: string, stats: {
    sport: string;
    won: boolean;
    personalStats?: Record<string, number>;
  }): Promise<void> {
    let totalHype = 0;
    const transactions: HypeTransaction[] = [];

    // Base participation
    transactions.push({
      userId,
      amount: this.HYPE_REWARDS.game_participation,
      type: 'game_performance',
      description: `Played in ${stats.sport} game`
    });

    // Win bonus
    if (stats.won) {
      transactions.push({
        userId,
        amount: this.HYPE_REWARDS.game_win,
        type: 'game_performance',
        description: `Won ${stats.sport} game!`
      });
    }

    // Sport-specific achievements
    if (stats.personalStats) {
      if (stats.sport === 'Football' && stats.personalStats.touchdowns) {
        transactions.push({
          userId,
          amount: this.HYPE_REWARDS.touchdown * stats.personalStats.touchdowns,
          type: 'achievement',
          description: `Scored ${stats.personalStats.touchdowns} touchdown(s)`
        });
      }
      // Add more sport-specific rewards
    }

    // Award all transactions
    for (const transaction of transactions) {
      await this.awardHype(transaction);
      totalHype += transaction.amount;
    }

    console.log(`⚡ Awarded ${totalHype} total HYPE for game performance`);
  }
}