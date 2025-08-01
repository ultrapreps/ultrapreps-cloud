'use client';

export interface SafetyReport {
  id: string;
  timestamp: Date;
  type: 'content' | 'behavior' | 'language' | 'image' | 'interaction';
  severity: 'info' | 'warning' | 'alert' | 'critical';
  userId?: string;
  content?: string;
  action: 'none' | 'flag' | 'hide' | 'remove' | 'notify_parent';
  details: string;
  context?: unknown;
}

export interface UserSafetyProfile {
  userId: string;
  trustScore: number; // 0-100
  violations: SafetyReport[];
  lastReview: Date;
  restrictions: string[];
  parentNotifications: boolean;
}

export interface ModeratedContent {
  original: string;
  moderated: string;
  changes: string[];
  safe: boolean;
}

class UltraGuardian {
  private safetyRules = {
    bannedWords: [
      // This would contain actual inappropriate words in production
      'badword1', 'badword2', 'inappropriate'
    ],
    suspiciousPatterns: [
      /(\d{3}[-.\s]?\d{3}[-.\s]?\d{4})/g, // Phone numbers
      /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, // Email addresses
      /(https?:\/\/[^\s]+)/g, // URLs (check for safety)
    ],
    positiveKeywords: [
      'team', 'practice', 'game', 'win', 'support', 'proud', 
      'achievement', 'goal', 'improvement', 'dedication'
    ]
  };

  private userProfiles = new Map<string, UserSafetyProfile>();
  private reportHistory: SafetyReport[] = [];

  async moderateContent(content: string, userId?: string): Promise<ModeratedContent> {
    const changes: string[] = [];
    let moderated = content;
    let safe = true;

    // Check for banned words
    for (const word of this.safetyRules.bannedWords) {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      if (regex.test(moderated)) {
        moderated = moderated.replace(regex, '*'.repeat(word.length));
        changes.push(`Removed inappropriate language: ${word}`);
        safe = false;
      }
    }

    // Check for personal information
    const phoneMatches = moderated.match(this.safetyRules.suspiciousPatterns[0]);
    if (phoneMatches) {
      phoneMatches.forEach(match => {
        moderated = moderated.replace(match, '[PHONE REMOVED]');
        changes.push('Removed phone number for privacy');
      });
    }

    const emailMatches = moderated.match(this.safetyRules.suspiciousPatterns[1]);
    if (emailMatches) {
      emailMatches.forEach(match => {
        moderated = moderated.replace(match, '[EMAIL REMOVED]');
        changes.push('Removed email address for privacy');
      });
    }

    // Log if content was moderated
    if (changes.length > 0 && userId) {
      await this.logSafetyReport({
        type: 'content',
        severity: 'warning',
        userId,
        content: content.substring(0, 100),
        action: 'flag',
        details: changes.join(', ')
      });
    }

    return {
      original: content,
      moderated,
      changes,
      safe
    };
  }

  async analyzeUserBehavior(userId: string, actions: string[]): Promise<{
    riskLevel: 'low' | 'medium' | 'high';
    concerns: string[];
    recommendations: string[];
  }> {
    const profile = this.getUserProfile(userId);
    const concerns: string[] = [];
    const recommendations: string[] = [];

    // Analyze recent actions
    const suspiciousActions = actions.filter(action => 
      action.includes('delete') || 
      action.includes('private') ||
      action.includes('contact')
    );

    if (suspiciousActions.length > 3) {
      concerns.push('Unusual activity pattern detected');
      recommendations.push('Monitor user activity more closely');
    }

    // Check violation history
    const recentViolations = profile.violations.filter(v => 
      v.timestamp > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    );

    if (recentViolations.length > 2) {
      concerns.push('Multiple recent violations');
      recommendations.push('Consider temporary restrictions');
    }

    // Calculate risk level
    const riskScore = 
      suspiciousActions.length * 10 + 
      recentViolations.length * 20 +
      (100 - profile.trustScore);

    const riskLevel = 
      riskScore > 60 ? 'high' :
      riskScore > 30 ? 'medium' : 'low';

    return { riskLevel, concerns, recommendations };
  }

  async checkImageSafety(imageUrl: string): Promise<{
    safe: boolean;
    concerns: string[];
    confidence: number;
  }> {
    // In production, this would use computer vision AI
    // For now, simulate basic checks
    const concerns: string[] = [];
    let safe = true;
    
    // Check for suspicious URLs
    if (imageUrl.includes('adult') || imageUrl.includes('nsfw')) {
      safe = false;
      concerns.push('URL contains inappropriate keywords');
    }

    // Check image source
    const trustedDomains = [
      'ultrapreps.com',
      'source.unsplash.com',
      'images.unsplash.com',
      'cloudinary.com'
    ];

    const domain = new URL(imageUrl).hostname;
    if (!trustedDomains.some(trusted => domain.includes(trusted))) {
      concerns.push('Image from untrusted source');
    }

    return {
      safe,
      concerns,
      confidence: safe ? 0.95 : 0.7
    };
  }

  async protectMinor(userId: string, age: number): Promise<{
    restrictions: string[];
    parentalControls: boolean;
    privacyLevel: 'high' | 'medium' | 'low';
  }> {
    const restrictions: string[] = [];
    let parentalControls = false;
    let privacyLevel: 'high' | 'medium' | 'low' = 'medium';

    if (age < 13) {
      restrictions.push('No private messaging');
      restrictions.push('No public contact information');
      restrictions.push('Parent approval for posts');
      parentalControls = true;
      privacyLevel = 'high';
    } else if (age < 16) {
      restrictions.push('Limited private messaging');
      restrictions.push('No contact sharing');
      parentalControls = true;
      privacyLevel = 'medium';
    } else if (age < 18) {
      restrictions.push('Monitored interactions');
      privacyLevel = 'medium';
    }

    // Update user profile
    const profile = this.getUserProfile(userId);
    profile.restrictions = restrictions;
    profile.parentNotifications = parentalControls;

    return {
      restrictions,
      parentalControls,
      privacyLevel
    };
  }

  private getUserProfile(userId: string): UserSafetyProfile {
    if (!this.userProfiles.has(userId)) {
      this.userProfiles.set(userId, {
        userId,
        trustScore: 80, // Start with good trust
        violations: [],
        lastReview: new Date(),
        restrictions: [],
        parentNotifications: false
      });
    }
    return this.userProfiles.get(userId)!;
  }

  private async logSafetyReport(report: Omit<SafetyReport, 'id' | 'timestamp'>): Promise<void> {
    const fullReport: SafetyReport = {
      ...report,
      id: Date.now().toString(),
      timestamp: new Date()
    };

    this.reportHistory.push(fullReport);

    if (report.userId) {
      const profile = this.getUserProfile(report.userId);
      profile.violations.push(fullReport);
      
      // Adjust trust score
      if (report.severity === 'critical') {
        profile.trustScore = Math.max(0, profile.trustScore - 20);
      } else if (report.severity === 'alert') {
        profile.trustScore = Math.max(0, profile.trustScore - 10);
      } else if (report.severity === 'warning') {
        profile.trustScore = Math.max(0, profile.trustScore - 5);
      }
    }

    // Notify parents if needed
    if (report.severity === 'critical' || report.severity === 'alert') {
      await this.notifyParents(report.userId!, fullReport);
    }
  }

  private async notifyParents(userId: string, report: SafetyReport): Promise<void> {
    // In production, this would send actual notifications
    console.log('Parent notification:', { userId, report });
  }

  // Advanced safety features
  async createSafetyNet(userIds: string[]): Promise<{
    monitored: number;
    flagged: number;
    alerts: SafetyReport[];
  }> {
    let monitored = 0;
    let flagged = 0;
    const alerts: SafetyReport[] = [];

    for (const userId of userIds) {
      const profile = this.getUserProfile(userId);
      monitored++;

      if (profile.trustScore < 50) {
        flagged++;
        
        const report: SafetyReport = {
          id: Date.now().toString(),
          timestamp: new Date(),
          type: 'behavior',
          severity: 'warning',
          userId,
          action: 'flag',
          details: `Low trust score: ${profile.trustScore}`
        };
        
        alerts.push(report);
      }
    }

    return { monitored, flagged, alerts };
  }

  async generateSafetyReport(timeRange: { start: Date; end: Date }): Promise<{
    totalReports: number;
    byType: { [key: string]: number };
    bySeverity: { [key: string]: number };
    topConcerns: string[];
    recommendations: string[];
  }> {
    const relevantReports = this.reportHistory.filter(r => 
      r.timestamp >= timeRange.start && r.timestamp <= timeRange.end
    );

    const byType: { [key: string]: number } = {};
    const bySeverity: { [key: string]: number } = {};

    relevantReports.forEach(report => {
      byType[report.type] = (byType[report.type] || 0) + 1;
      bySeverity[report.severity] = (bySeverity[report.severity] || 0) + 1;
    });

    const topConcerns: string[] = [];
    if (byType['content'] > 5) topConcerns.push('High volume of content violations');
    if (byType['behavior'] > 3) topConcerns.push('Behavioral issues detected');
    if (bySeverity['critical'] > 0) topConcerns.push('Critical safety incidents occurred');

    const recommendations: string[] = [];
    if (topConcerns.length > 0) {
      recommendations.push('Increase moderation frequency');
      recommendations.push('Review safety policies with users');
      recommendations.push('Consider additional parental controls');
    }

    return {
      totalReports: relevantReports.length,
      byType,
      bySeverity,
      topConcerns,
      recommendations
    };
  }

  // Positive reinforcement
  async rewardPositiveBehavior(userId: string, action: string): Promise<{
    trustIncreased: boolean;
    newTrustScore: number;
    reward?: string;
  }> {
    const profile = this.getUserProfile(userId);
    let trustIncreased = false;
    let reward: string | undefined;

    // Check if action contains positive keywords
    const hasPositiveContent = this.safetyRules.positiveKeywords.some(keyword => 
      action.toLowerCase().includes(keyword)
    );

    if (hasPositiveContent && profile.trustScore < 100) {
      profile.trustScore = Math.min(100, profile.trustScore + 2);
      trustIncreased = true;

      if (profile.trustScore >= 90) {
        reward = 'Trusted Member Badge';
      } else if (profile.trustScore >= 80) {
        reward = 'Good Standing Status';
      }
    }

    return {
      trustIncreased,
      newTrustScore: profile.trustScore,
      reward
    };
  }
}

// Singleton instance
export const ultraGuardian = new UltraGuardian();

// React hook for using UltraGuardian
export function useUltraGuardian() {
  const moderateContent = async (content: string, userId?: string) => {
    return await ultraGuardian.moderateContent(content, userId);
  };

  const checkImageSafety = async (imageUrl: string) => {
    return await ultraGuardian.checkImageSafety(imageUrl);
  };

  const protectMinor = async (userId: string, age: number) => {
    return await ultraGuardian.protectMinor(userId, age);
  };

  const analyzeUserBehavior = async (userId: string, actions: string[]) => {
    return await ultraGuardian.analyzeUserBehavior(userId, actions);
  };

  const rewardPositiveBehavior = async (userId: string, action: string) => {
    return await ultraGuardian.rewardPositiveBehavior(userId, action);
  };

  return {
    moderateContent,
    checkImageSafety,
    protectMinor,
    analyzeUserBehavior,
    rewardPositiveBehavior
  };
}