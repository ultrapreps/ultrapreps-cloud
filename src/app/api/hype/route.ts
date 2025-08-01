import { NextRequest, NextResponse } from 'next/server';
import { earnHype, spendHype, giftHype, getHypeHistory, updateDailyStreak } from '@/lib/db/hype';
import { getUserById } from '@/lib/db/users';
import { prisma } from '@/lib/prisma';

// Award HYPE points for activities
export async function POST(request: NextRequest) {
  try {
    const { userId, action, activity, amount, targetUserId, message, metadata } = await request.json();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Verify user exists
    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    let result;
    
    switch (action) {
      case 'earn':
        if (!activity) {
          return NextResponse.json(
            { error: 'Activity is required for earning HYPE' },
            { status: 400 }
          );
        }
        
        // Update daily streak
        await updateDailyStreak(userId);
        
        // Award HYPE
        result = await earnHype(
          userId,
          amount || getActivityPoints(activity),
          activity,
          getActivityDescription(activity),
          metadata
        );
        
        // Check for achievements
        await checkAndAwardAchievements(userId, activity);
        
        break;
        
      case 'spend':
        if (!activity || !amount) {
          return NextResponse.json(
            { error: 'Activity and amount are required for spending HYPE' },
            { status: 400 }
          );
        }
        
        result = await spendHype(
          userId,
          amount,
          activity,
          getActivityDescription(activity),
          metadata
        );
        break;
        
      case 'gift':
        if (!targetUserId || !amount) {
          return NextResponse.json(
            { error: 'Target user and amount are required for gifting HYPE' },
            { status: 400 }
          );
        }
        
        await giftHype(userId, targetUserId, amount, message);
        result = await prisma.hypeBalance.findUnique({ where: { userId } });
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: earn, spend, or gift' },
          { status: 400 }
        );
    }
    
    // Get updated user data
    const updatedUser = await getUserById(userId);
    const history = await getHypeHistory(userId, 5);
    
    return NextResponse.json({
      success: true,
      balance: result,
      user: {
        id: updatedUser!.id,
        username: updatedUser!.username,
        firstName: updatedUser!.firstName,
        lastName: updatedUser!.lastName,
        hypeBalance: result,
        school: updatedUser!.school,
      },
      recentTransactions: history,
      message: `Successfully ${action}ed HYPE`,
    });
    
  } catch (error) {
    console.error('HYPE system error:', error);
    const err = error as Error;
    return NextResponse.json(
      { error: err.message || 'Failed to process HYPE transaction' },
      { status: 500 }
    );
  }
}

// Get user HYPE profile
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const action = url.searchParams.get('action');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Get user with HYPE balance
    const user = await getUserById(userId);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    if (action === 'history') {
      const history = await getHypeHistory(userId, 50);
      return NextResponse.json({
        userId,
        transactions: history,
        balance: user.hypeBalance,
      });
    }
    
    // Get spending options
    const spendingOptions = [
      { id: 'poster_template', name: 'Premium Poster Template', cost: 100, category: 'design' },
      { id: 'stadium_theme', name: 'Custom Stadium Theme', cost: 250, category: 'customization' },
      { id: 'highlight_reel', name: 'AI Highlight Reel', cost: 500, category: 'media' },
      { id: 'profile_boost', name: '7-Day Profile Boost', cost: 150, category: 'visibility' },
      { id: 'custom_badge', name: 'Custom Achievement Badge', cost: 300, category: 'achievement' },
    ];
    
    // Get purchase packages
    const purchasePackages = [
      { id: 'starter', name: 'Starter Pack', hype: 1000, price: 4.99, bonus: 0 },
      { id: 'athlete', name: 'Athlete Pack', hype: 2500, price: 9.99, bonus: 250 },
      { id: 'champion', name: 'Champion Pack', hype: 5500, price: 19.99, bonus: 1000 },
      { id: 'legend', name: 'Legend Pack', hype: 12000, price: 39.99, bonus: 3000 },
    ];
    
    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        school: user.school,
      },
      balance: user.hypeBalance,
      spendingOptions,
      purchasePackages,
      recentActivity: await getHypeHistory(userId, 10),
    });
    
  } catch (error) {
    console.error('HYPE profile error:', error);
    return NextResponse.json(
      { error: 'Failed to get user profile' },
      { status: 500 }
    );
  }
}

// Helper functions
function getActivityPoints(activity: string): number {
  const pointsMap: Record<string, number> = {
    'daily_login': 10,
    'first_post': 25,
    'achievement_posted': 50,
    'herocard_created': 100,
    'poster_created': 75,
    'post_liked': 5,
    'post_shared': 10,
    'comment_received': 15,
    'follower_gained': 20,
    'game_win': 100,
    'personal_best': 150,
    'championship': 500,
    'mvp_award': 300,
    'honor_roll': 200,
    'perfect_attendance': 50,
    'academic_award': 250,
    'volunteer_hour': 25,
    'leadership_role': 100,
    'community_service': 75,
  };
  
  return pointsMap[activity] || 10;
}

function getActivityDescription(activity: string): string {
  const descriptions: Record<string, string> = {
    'daily_login': 'Daily login bonus',
    'first_post': 'Created your first post',
    'achievement_posted': 'Posted an achievement',
    'herocard_created': 'Created a HeroCard',
    'poster_created': 'Created a poster',
    'post_liked': 'Your post was liked',
    'post_shared': 'Your post was shared',
    'comment_received': 'Received a comment',
    'follower_gained': 'Gained a new follower',
    'game_win': 'Won a game!',
    'personal_best': 'Set a personal best',
    'championship': 'Championship victory!',
    'mvp_award': 'MVP Award',
    'honor_roll': 'Made the honor roll',
    'perfect_attendance': 'Perfect attendance',
    'academic_award': 'Academic achievement',
    'volunteer_hour': 'Community service',
    'leadership_role': 'Leadership position',
    'community_service': 'Community contribution',
  };
  
  return descriptions[activity] || activity;
}

async function checkAndAwardAchievements(userId: string, activity: string) {
  // Get user's current achievements count
  const achievementCount = await prisma.achievement.count({
    where: { userId }
  });
  
  // Check for milestone achievements
  const milestones = [
    { count: 1, title: 'First Steps', hype: 50 },
    { count: 5, title: 'Getting Started', hype: 100 },
    { count: 10, title: 'Rising Star', hype: 200 },
    { count: 25, title: 'Dedicated Athlete', hype: 500 },
    { count: 50, title: 'Elite Performer', hype: 1000 },
    { count: 100, title: 'Legendary Status', hype: 2500 },
  ];
  
  for (const milestone of milestones) {
    if (achievementCount === milestone.count - 1) {
      // Award milestone achievement
      await prisma.achievement.create({
        data: {
          userId,
          title: milestone.title,
          description: `Reached ${milestone.count} achievements!`,
          category: 'SOCIAL',
          date: new Date(),
        }
      });
      
      // Award bonus HYPE
      await earnHype(
        userId,
        milestone.hype,
        'milestone_achievement',
        `Milestone: ${milestone.title}`
      );
      
      // Create notification
      await prisma.notification.create({
        data: {
          userId,
          type: 'achievement_unlocked',
          title: 'New Achievement!',
          message: `You've unlocked "${milestone.title}" and earned ${milestone.hype} HYPE!`,
        }
      });
      
      break;
    }
  }
}