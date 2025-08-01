import { prisma } from '@/lib/prisma';

// HYPE earning rules
export const HYPE_RULES = {
  // Daily activities
  DAILY_LOGIN: 10,
  FIRST_POST: 25,
  ACHIEVEMENT_POSTED: 50,
  HEROCARD_CREATED: 100,
  POSTER_CREATED: 75,
  
  // Social engagement
  POST_LIKED: 5,
  POST_SHARED: 10,
  COMMENT_RECEIVED: 15,
  FOLLOWER_GAINED: 20,
  
  // Athletic achievements
  GAME_WIN: 100,
  PERSONAL_BEST: 150,
  CHAMPIONSHIP: 500,
  MVP_AWARD: 300,
  
  // Academic achievements
  HONOR_ROLL: 200,
  PERFECT_ATTENDANCE: 50,
  ACADEMIC_AWARD: 250,
  
  // Community
  VOLUNTEER_HOUR: 25,
  LEADERSHIP_ROLE: 100,
  COMMUNITY_SERVICE: 75,
  
  // Multipliers
  STREAK_3_DAYS: 1.5,
  STREAK_7_DAYS: 2.0,
  STREAK_30_DAYS: 3.0,
  SPECIAL_EVENT: 2.5,
};

// HYPE spending options
export const HYPE_SPEND_OPTIONS = {
  POSTER_TEMPLATE: 100,
  PREMIUM_THEME: 250,
  HIGHLIGHT_REEL: 500,
  PROFILE_BOOST: 150,
  GIFT_HYPE: 1, // 1:1 ratio
  TOURNAMENT_ENTRY: 200,
  CUSTOM_BADGE: 300,
};

// Earn HYPE
export async function earnHype(
  userId: string,
  amount: number,
  category: string,
  description: string,
  metadata?: Record<string, unknown>
) {
  // Get current balance and streak
  const balance = await prisma.hypeBalance.findUnique({
    where: { userId },
  });

  if (!balance) {
    throw new Error('HYPE balance not found');
  }

  // Calculate multiplier based on streak
  let multiplier = 1.0;
  if (balance.dailyStreak >= 30) {
    multiplier = HYPE_RULES.STREAK_30_DAYS;
  } else if (balance.dailyStreak >= 7) {
    multiplier = HYPE_RULES.STREAK_7_DAYS;
  } else if (balance.dailyStreak >= 3) {
    multiplier = HYPE_RULES.STREAK_3_DAYS;
  }

  const finalAmount = Math.floor(amount * multiplier);

  // Update balance
  const updatedBalance = await prisma.hypeBalance.update({
    where: { userId },
    data: {
      freeHype: { increment: finalAmount },
      totalEarned: { increment: finalAmount },
      currentMultiplier: multiplier,
    }
  });

  // Log event
  await prisma.hypeEvent.create({
    data: {
      toUserId: userId,
      type: 'EARNED',
      amount: finalAmount,
      category,
      description,
      metadata: (metadata || { multiplier }) as any,
    }
  });

  // Update school total
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { schoolId: true }
  });

  if (user?.schoolId) {
    await prisma.school.update({
      where: { id: user.schoolId },
      data: {
        totalHype: { increment: finalAmount }
      }
    });
  }

  return updatedBalance;
}

// Spend HYPE
export async function spendHype(
  userId: string,
  amount: number,
  category: string,
  description: string,
  metadata?: Record<string, unknown>
) {
  const balance = await prisma.hypeBalance.findUnique({
    where: { userId },
  });

  if (!balance) {
    throw new Error('HYPE balance not found');
  }

  const totalAvailable = balance.freeHype + balance.paidHype;
  if (totalAvailable < amount) {
    throw new Error('Insufficient HYPE balance');
  }

  // Deduct from free HYPE first, then paid
  const freeDeduction = Math.min(amount, balance.freeHype);
  const paidDeduction = amount - freeDeduction;

  const updatedBalance = await prisma.hypeBalance.update({
    where: { userId },
    data: {
      freeHype: { decrement: freeDeduction },
      paidHype: { decrement: paidDeduction },
      totalSpent: { increment: amount },
    }
  });

  // Log event
  await prisma.hypeEvent.create({
    data: {
      fromUserId: userId,
      type: 'SPENT',
      amount,
      category,
      description,
      metadata: metadata as any,
    }
  });

  return updatedBalance;
}

// Gift HYPE
export async function giftHype(
  fromUserId: string,
  toUserId: string,
  amount: number,
  message?: string
) {
  // Verify sender has enough HYPE
  const senderBalance = await prisma.hypeBalance.findUnique({
    where: { userId: fromUserId },
  });

  if (!senderBalance || senderBalance.freeHype + senderBalance.paidHype < amount) {
    throw new Error('Insufficient HYPE to gift');
  }

  // Transfer HYPE
  await prisma.$transaction([
    // Deduct from sender
    prisma.hypeBalance.update({
      where: { userId: fromUserId },
      data: {
        freeHype: { decrement: Math.min(amount, senderBalance.freeHype) },
        paidHype: { decrement: Math.max(0, amount - senderBalance.freeHype) },
        totalSpent: { increment: amount },
      }
    }),
    // Add to receiver
    prisma.hypeBalance.update({
      where: { userId: toUserId },
      data: {
        freeHype: { increment: amount },
        totalEarned: { increment: amount },
      }
    }),
    // Log event
    prisma.hypeEvent.create({
      data: {
        fromUserId,
        toUserId,
        type: 'GIFTED',
        amount,
        category: 'gift',
        description: message || 'HYPE gift',
      }
    }),
    // Create notification
    prisma.notification.create({
      data: {
        userId: toUserId,
        type: 'hype_gift',
        title: 'You received HYPE!',
        message: `Someone gifted you ${amount} HYPE${message ? `: "${message}"` : '!'}`,
        relatedUserId: fromUserId,
      }
    })
  ]);
}

// Purchase HYPE
export async function purchaseHype(
  userId: string,
  amount: number,
  paymentId: string
) {
  const updatedBalance = await prisma.hypeBalance.update({
    where: { userId },
    data: {
      paidHype: { increment: amount },
    }
  });

  // Log event
  await prisma.hypeEvent.create({
    data: {
      toUserId: userId,
      type: 'PURCHASED',
      amount,
      category: 'purchase',
      description: `Purchased ${amount} HYPE`,
      paymentId,
    }
  });

  return updatedBalance;
}

// Update daily streak
export async function updateDailyStreak(userId: string) {
  const balance = await prisma.hypeBalance.findUnique({
    where: { userId },
  });

  if (!balance) return;

  const lastUpdate = balance.updatedAt;
  const now = new Date();
  const daysSinceLastUpdate = Math.floor(
    (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24)
  );

  let newStreak = balance.dailyStreak;
  
  if (daysSinceLastUpdate === 1) {
    // Consecutive day - increase streak
    newStreak = balance.dailyStreak + 1;
  } else if (daysSinceLastUpdate > 1) {
    // Streak broken - reset to 1
    newStreak = 1;
  }
  // If daysSinceLastUpdate === 0, keep current streak

  const updatedBalance = await prisma.hypeBalance.update({
    where: { userId },
    data: {
      dailyStreak: newStreak,
      maxStreak: Math.max(newStreak, balance.maxStreak),
    }
  });

  // Award streak bonus
  if (newStreak === 3 || newStreak === 7 || newStreak === 30) {
    const bonus = newStreak * 10;
    await earnHype(
      userId,
      bonus,
      'streak_bonus',
      `${newStreak} day streak bonus!`
    );
  }

  return updatedBalance;
}

// Get HYPE history
export async function getHypeHistory(userId: string, limit = 50) {
  return prisma.hypeEvent.findMany({
    where: {
      OR: [
        { fromUserId: userId },
        { toUserId: userId }
      ]
    },
    include: {
      fromUser: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          image: true,
        }
      },
      toUser: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          image: true,
        }
      }
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

// Get HYPE leaderboard
export async function getHypeLeaderboard(
  scope: 'global' | 'school' = 'global',
  schoolId?: string,
  limit = 100
) {
  const where = scope === 'school' && schoolId 
    ? { user: { schoolId } }
    : {};

  return prisma.hypeBalance.findMany({
    where,
    include: {
      user: {
        include: {
          school: true,
          stadium: true,
        }
      }
    },
    orderBy: { totalEarned: 'desc' },
    take: limit,
  });
}

// Calculate HYPE sustainability (130% rule)
export async function checkHypeSustainability() {
  const [totalEarned, totalSpent] = await Promise.all([
    prisma.hypeEvent.aggregate({
      where: { type: 'EARNED' },
      _sum: { amount: true }
    }),
    prisma.hypeEvent.aggregate({
      where: { type: 'SPENT' },
      _sum: { amount: true }
    })
  ]);

  const earned = totalEarned._sum.amount || 0;
  const spent = totalSpent._sum.amount || 0;
  const sustainabilityRatio = earned / (spent || 1);

  return {
    totalEarned: earned,
    totalSpent: spent,
    sustainabilityRatio,
    isSustainable: sustainabilityRatio >= 1.3, // 130% rule
  };
}