import { NextRequest, NextResponse } from 'next/server';
import { HypeSystem, hypeUsers, hypeTransactions } from '../../../lib/hypeSystem';

// Award HYPE points for activities
export async function POST(request: NextRequest) {
  try {
    const { userId, activity, multiplier = 1 } = await request.json();
    
    if (!userId || !activity) {
      return NextResponse.json(
        { error: 'User ID and activity are required' },
        { status: 400 }
      );
    }
    
    // Get or create user
    let user = hypeUsers.get(userId);
    if (!user) {
      user = {
        id: userId,
        username: `user_${userId}`,
        currentHype: 0,
        totalEarned: 0,
        level: 1,
        achievements: [],
        lastActivity: new Date(),
        streakDays: 1
      };
      hypeUsers.set(userId, user);
    }
    
    // Apply event multipliers
    const eventMultiplier = HypeSystem.getEventMultiplier();
    const finalMultiplier = multiplier * eventMultiplier;
    
    // Award HYPE
    const transaction = HypeSystem.awardHype(userId, activity, finalMultiplier);
    hypeTransactions.push(transaction);
    
    // Update user
    user.currentHype += transaction.amount;
    user.totalEarned += transaction.amount;
    user.lastActivity = new Date();
    
    // Check for new achievements
    const newAchievements = HypeSystem.checkAchievements(user);
    if (newAchievements.length > 0) {
      user.achievements.push(...newAchievements);
      
      // Award HYPE for achievements
      for (const achievement of newAchievements) {
        const achievementTransaction = HypeSystem.awardHype(userId, 'achievement_unlocked');
        achievementTransaction.reason = `Achievement: ${achievement.title}`;
        achievementTransaction.amount = achievement.hypeReward;
        hypeTransactions.push(achievementTransaction);
        user.currentHype += achievement.hypeReward;
        user.totalEarned += achievement.hypeReward;
      }
    }
    
    // Update level
    const levelInfo = HypeSystem.calculateLevel(user.totalEarned);
    user.level = levelInfo.level;
    
    console.log(`🎉 HYPE UPDATE: User ${userId} earned ${transaction.amount} HYPE for ${activity}`);
    
    return NextResponse.json({
      success: true,
      transaction,
      user: {
        ...user,
        levelInfo
      },
      newAchievements,
      eventMultiplier: eventMultiplier > 1 ? eventMultiplier : null
    });
    
  } catch (error) {
    console.error('HYPE system error:', error);
    return NextResponse.json(
      { error: 'Failed to process HYPE transaction' },
      { status: 500 }
    );
  }
}

// Get user HYPE profile
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    const user = hypeUsers.get(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    const levelInfo = HypeSystem.calculateLevel(user.totalEarned);
    const userTransactions = hypeTransactions
      .filter(t => t.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 20); // Last 20 transactions
    
    return NextResponse.json({
      user: {
        ...user,
        levelInfo
      },
      recentTransactions: userTransactions,
      eventMultiplier: HypeSystem.getEventMultiplier()
    });
    
  } catch (error) {
    console.error('HYPE profile error:', error);
    return NextResponse.json(
      { error: 'Failed to get user profile' },
      { status: 500 }
    );
  }
}