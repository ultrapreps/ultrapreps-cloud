// ULTRAPREPS HYPE ECONOMY SYSTEM
// The gamification engine that makes students addicted to achievement!

export interface HypeUser {
  id: string;
  username: string;
  currentHype: number;
  totalEarned: number;
  level: number;
  achievements: Achievement[];
  lastActivity: Date;
  streakDays: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  hypeReward: number;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Mythic';
  unlockedAt: Date;
  category: 'Sports' | 'Academic' | 'Social' | 'Leadership' | 'Creative';
}

export // SIMPLIFIED HYPE SYSTEM FOR RAPID MVP
interface HypeTransaction {
  id: string;
  userId: string;
  type: 'earn' | 'spend';
  amount: number;
  reason: string;
  category: string;
  timestamp: Date;
  multiplier?: number;
}

export interface HypeActivity {
  activity: string;
  baseHype: number;
  category: string;
  maxPerDay?: number;
  description: string;
}

// HYPE EARNING ACTIVITIES - Following the 130% Rule
export const HYPE_ACTIVITIES: Record<string, HypeActivity> = {
  // CONTENT CREATION
  'stadium_created': {
    activity: 'Created Personal Stadium', 
    baseHype: 100,
    category: 'milestone',
    description: 'Welcome to your digital home!'
  },
  'profile_completed': {
    activity: 'Completed Full Profile',
    baseHype: 50,
    category: 'profile',
    description: 'Show the world who you are!'
  },
  'bio_added': {
    activity: 'Added Personal Bio',
    baseHype: 25,
    category: 'profile',
    maxPerDay: 1,
    description: 'Tell your story!'
  },
  'activity_added': {
    activity: 'Added New Activity',
    baseHype: 15,
    category: 'profile',
    maxPerDay: 5,
    description: 'Showcase your talents!'
  },
  
  // SOCIAL ENGAGEMENT
  'daily_login': {
    activity: 'Daily Login',
    baseHype: 10,
    category: 'engagement',
    maxPerDay: 1,
    description: 'Consistency builds champions!'
  },
  'ai_chat_interaction': {
    activity: 'Chatted with AI Trainer',
    baseHype: 5,
    category: 'engagement',
    maxPerDay: 10,
    description: 'Learn from your AI mentor!'
  },
  'poster_created': {
    activity: 'Created Achievement Poster',
    baseHype: 30,
    category: 'content',
    maxPerDay: 3,
    description: 'Share your victories!'
  },
  
  // ACHIEVEMENTS
  'first_week': {
    activity: 'Completed First Week',
    baseHype: 75,
    category: 'milestone',
    description: 'You\'re getting the hang of this!'
  },
  'streak_7_days': {
    activity: '7-Day Login Streak',
    baseHype: 100,
    category: 'streak',
    description: 'Dedication pays off!'
  },
  'streak_30_days': {
    activity: '30-Day Login Streak',
    baseHype: 500,
    category: 'streak',
    description: 'You\'re officially obsessed!'
  }
};

// HYPE SPENDING OPTIONS - Maintaining 130% margin
export const HYPE_STORE = {
  'basic_poster': {
    name: 'Basic Achievement Poster',
    cost: 50,
    description: 'Celebrate your wins in style!',
    category: 'content'
  },
  'premium_poster': {
    name: 'Premium Achievement Poster',
    cost: 150,
    description: 'Extra effects and animations!',
    category: 'content'
  },
  'stadium_theme': {
    name: 'Custom Stadium Theme',
    cost: 300,
    description: 'Personalize your digital home!',
    category: 'customization'
  },
  'ai_trainer_upgrade': {
    name: 'Premium AI Trainer Features',
    cost: 500,
    description: 'Unlock advanced mentoring!',
    category: 'premium'
  },
  'highlight_boost': {
    name: 'Achievement Highlight Boost',
    cost: 100,
    description: 'Make your achievements shine!',
    category: 'boost'
  }
};

// LEVEL SYSTEM - Based on total HYPE earned
export const HYPE_LEVELS = [
  { level: 1, threshold: 0, title: 'Rookie', benefits: [] },
  { level: 2, threshold: 100, title: 'Player', benefits: ['Basic poster templates'] },
  { level: 3, threshold: 300, title: 'Starter', benefits: ['Stadium customization'] },
  { level: 4, threshold: 600, title: 'Star', benefits: ['Premium AI trainer'] },
  { level: 5, threshold: 1000, title: 'Captain', benefits: ['Leadership badges'] },
  { level: 6, threshold: 1500, title: 'MVP', benefits: ['Exclusive content'] },
  { level: 7, threshold: 2500, title: 'All-Star', benefits: ['Priority support'] },
  { level: 8, threshold: 4000, title: 'Legend', benefits: ['Beta features'] },
  { level: 9, threshold: 6000, title: 'Icon', benefits: ['Community influence'] },
  { level: 10, threshold: 10000, title: 'ULTRA', benefits: ['Platform partnership'] }
];

// HYPE SYSTEM CLASS
export class HypeSystem {
  
  // Award HYPE for activities
  static awardHype(userId: string, activityKey: string, multiplier: number = 1): HypeTransaction {
    const activity = HYPE_ACTIVITIES[activityKey];
    if (!activity) throw new Error(`Unknown activity: ${activityKey}`);
    
    const amount = Math.floor(activity.baseHype * multiplier);
    
    const transaction: HypeTransaction = {
      id: `hype_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type: 'earn',
      amount,
      reason: activity.activity,
      category: activity.category,
      timestamp: new Date(),
      multiplier: multiplier > 1 ? multiplier : undefined
    };
    
    console.log(`🎉 HYPE AWARDED: ${amount} points to ${userId} for ${activity.activity}`);
    return transaction;
  }
  
  // Spend HYPE on store items
  static spendHype(userId: string, itemKey: string): HypeTransaction {
    const item = HYPE_STORE[itemKey as keyof typeof HYPE_STORE];
    if (!item) throw new Error(`Unknown store item: ${itemKey}`);
    
    const transaction: HypeTransaction = {
      id: `spend_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      type: 'spend',
      amount: -item.cost,
      reason: `Purchased ${item.name}`,
      category: item.category,
      timestamp: new Date()
    };
    
    console.log(`💰 HYPE SPENT: ${item.cost} points by ${userId} for ${item.name}`);
    return transaction;
  }
  
  // Calculate user level based on total HYPE earned
  static calculateLevel(totalEarned: number): { level: number; title: string; progress: number } {
    let userLevel = HYPE_LEVELS[0];
    
    for (let i = HYPE_LEVELS.length - 1; i >= 0; i--) {
      if (totalEarned >= HYPE_LEVELS[i].threshold) {
        userLevel = HYPE_LEVELS[i];
        break;
      }
    }
    
    // Calculate progress to next level
    const nextLevel = HYPE_LEVELS.find(l => l.threshold > totalEarned);
    const progress = nextLevel 
      ? Math.floor(((totalEarned - userLevel.threshold) / (nextLevel.threshold - userLevel.threshold)) * 100)
      : 100;
    
    return {
      level: userLevel.level,
      title: userLevel.title,
      progress
    };
  }
  
  // Check for new achievements
  static checkAchievements(user: HypeUser): Achievement[] {
    const newAchievements: Achievement[] = [];
    
    // Level-based achievements
    const currentLevel = this.calculateLevel(user.totalEarned);
    if (currentLevel.level > user.level) {
      newAchievements.push({
        id: `level_${currentLevel.level}`,
        title: `${currentLevel.title} Rank Achieved!`,
        description: `Reached level ${currentLevel.level}`,
        icon: '🏆',
        hypeReward: currentLevel.level * 50,
        rarity: currentLevel.level >= 8 ? 'Legendary' : currentLevel.level >= 5 ? 'Epic' : 'Rare',
        unlockedAt: new Date(),
        category: 'Leadership'
      });
    }
    
    // Streak achievements
    if (user.streakDays === 7) {
      newAchievements.push({
        id: 'streak_7',
        title: 'Week Warrior',
        description: 'Logged in for 7 days straight!',
        icon: '🔥',
        hypeReward: 100,
        rarity: 'Rare',
        unlockedAt: new Date(),
        category: 'Social'
      });
    }
    
    if (user.streakDays === 30) {
      newAchievements.push({
        id: 'streak_30',
        title: 'Month Master',
        description: 'Logged in for 30 days straight!',
        icon: '💎',
        hypeReward: 500,
        rarity: 'Legendary',
        unlockedAt: new Date(),
        category: 'Social'
      });
    }
    
    return newAchievements;
  }
  
  // Get event multipliers (rivalry week, homecoming, etc.)
  static getEventMultiplier(): number {
    const now = new Date();
    const dayOfWeek = now.getDay();
    
    // Weekend boost (Friday-Sunday)
    if (dayOfWeek >= 5 || dayOfWeek === 0) {
      return 1.5;
    }
    
    // TODO: Add seasonal events, rivalry weeks, homecoming, etc.
    // This would integrate with school calendar and events
    
    return 1.0;
  }
}

// In-memory storage (in production, use database)
export const hypeUsers: Map<string, HypeUser> = new Map();
export const hypeTransactions: HypeTransaction[] = [];