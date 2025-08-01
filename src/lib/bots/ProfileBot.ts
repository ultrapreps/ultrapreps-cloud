'use client';

import { designMaster } from './DesignMaster';
// import { autonomousUltraBrain } from './AutonomousUltraBrain';

export interface AthleteIdentity {
  id: string;
  name: string;
  username: string;
  school: string;
  sport: string;
  position: string;
  jerseyNumber: string;
  graduationYear: number;
  bio: string;
  personality: {
    traits: string[];
    motto: string;
    inspiration: string;
  };
  visualIdentity: {
    primaryPhoto: string;
    actionShots: string[];
    heroCardDesign: string;
    signatureColor: string;
  };
  achievements: {
    title: string;
    date: Date;
    description: string;
    impact: 'high' | 'medium' | 'low';
  }[];
  socialPresence: {
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    youtube?: string;
  };
}

class ProfileBot {
  private identityTemplates = {
    personalities: [
      { traits: ['Leader', 'Motivator', 'Team Player'], motto: 'Excellence is a habit, not an act' },
      { traits: ['Competitor', 'Focused', 'Relentless'], motto: 'Champions train when no one is watching' },
      { traits: ['Creative', 'Strategic', 'Innovative'], motto: 'Play smart, play hard, play together' },
      { traits: ['Humble', 'Dedicated', 'Consistent'], motto: 'Let your game do the talking' }
    ],
    bioTemplates: [
      '{position} for {school} | Class of {year} | {motto}',
      'Student-Athlete at {school} | {sport} {position} #{jersey} | {motto}',
      '{school} {sport} | {position} | Living my dream one game at a time',
      'Future D1 {position} | {school} Pride | {motto}'
    ]
  };

  async buildIdentity(basicInfo: {
    name: string;
    school: string;
    sport: string;
    position?: string;
    graduationYear?: number;
  }): Promise<AthleteIdentity> {
    // Generate username
    const username = this.generateUsername(basicInfo.name);
    
    // Select personality template
    const personality = this.identityTemplates.personalities[
      Math.floor(Math.random() * this.identityTemplates.personalities.length)
    ];
    
    // Generate visual identity
    const visualIdentity = await this.generateVisualIdentity(basicInfo);
    
    // Generate jersey number
    const jerseyNumber = Math.floor(Math.random() * 99 + 1).toString();
    
    // Build bio
    const bioTemplate = this.identityTemplates.bioTemplates[
      Math.floor(Math.random() * this.identityTemplates.bioTemplates.length)
    ];
    
    const bio = bioTemplate
      .replace('{position}', basicInfo.position || 'Athlete')
      .replace('{school}', basicInfo.school)
      .replace('{year}', (basicInfo.graduationYear || new Date().getFullYear() + 2).toString())
      .replace('{motto}', personality.motto)
      .replace('{sport}', basicInfo.sport)
      .replace('{jersey}', jerseyNumber);
    
    return {
      id: Date.now().toString(),
      name: basicInfo.name,
      username,
      school: basicInfo.school,
      sport: basicInfo.sport,
      position: basicInfo.position || 'Player',
      jerseyNumber,
      graduationYear: basicInfo.graduationYear || new Date().getFullYear() + 2,
      bio,
      personality: {
        ...personality,
        inspiration: this.generateInspiration()
      },
      visualIdentity,
      achievements: await this.generateAchievements(basicInfo.sport),
      socialPresence: this.generateSocialPresence(username)
    };
  }

  private generateUsername(name: string): string {
    const parts = name.toLowerCase().split(' ');
    const bases = [
      `${parts[0]}_${parts[1] || 'athlete'}`,
      `${parts[0]}.${parts[1] || 'sports'}`,
      `${parts[0]}${Math.floor(Math.random() * 99)}`,
      `the.real.${parts[0]}`,
      `${parts[0]}_official`
    ];
    
    return bases[Math.floor(Math.random() * bases.length)];
  }

  private async generateVisualIdentity(info: {
    name: string;
    school: string;
    sport: string;
  }): Promise<AthleteIdentity['visualIdentity']> {
    // Generate hero card design
    const heroCardResult = await designMaster.generateDesign({
      type: 'herocard',
      context: {
        athleteName: info.name,
        school: info.school,
        sport: info.sport,
        style: 'modern'
      }
    });
    
    // Get school colors
    const schoolTheme = await designMaster.generateSchoolTheme(info.school);
    
    return {
      primaryPhoto: `https://source.unsplash.com/800x800/?athlete,portrait,${info.sport}`,
      actionShots: [
        `https://source.unsplash.com/1200x800/?${info.sport},action,athlete`,
        `https://source.unsplash.com/1200x800/?sports,competition,${info.sport}`,
        `https://source.unsplash.com/1200x800/?athlete,training,${info.sport}`
      ],
      heroCardDesign: heroCardResult.imageUrl,
      signatureColor: schoolTheme.primaryColor
    };
  }

  private generateInspiration(): string {
    const inspirations = [
      'My family who supports me every step of the way',
      'My coaches who push me to be my best',
      'The teammates who have my back on and off the field',
      'Every setback that made me stronger',
      'The dream of playing at the next level'
    ];
    
    return inspirations[Math.floor(Math.random() * inspirations.length)];
  }

  private async generateAchievements(sport: string): Promise<AthleteIdentity['achievements']> {
    const achievementTemplates = [
      { title: 'Team Captain', impact: 'high' as const },
      { title: 'All-Conference Selection', impact: 'high' as const },
      { title: 'Player of the Week', impact: 'medium' as const },
      { title: 'Academic Honor Roll', impact: 'medium' as const },
      { title: 'Community Service Award', impact: 'medium' as const },
      { title: 'Most Improved Player', impact: 'medium' as const },
      { title: 'Season MVP', impact: 'high' as const },
      { title: 'State Tournament Qualifier', impact: 'high' as const }
    ];
    
    // Select 3-5 random achievements
    const count = Math.floor(Math.random() * 3) + 3;
    const selected: AthleteIdentity['achievements'] = [];
    
    for (let i = 0; i < count; i++) {
      const template = achievementTemplates[Math.floor(Math.random() * achievementTemplates.length)];
      const monthsAgo = Math.floor(Math.random() * 12);
      
      selected.push({
        title: template.title,
        date: new Date(Date.now() - monthsAgo * 30 * 24 * 60 * 60 * 1000),
        description: `Recognized for outstanding performance in ${sport}`,
        impact: template.impact
      });
    }
    
    return selected.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  private generateSocialPresence(username: string): AthleteIdentity['socialPresence'] {
    const platforms = ['instagram', 'twitter', 'tiktok', 'youtube'];
    const presence: AthleteIdentity['socialPresence'] = {};
    
    // Randomly assign 2-3 social platforms
    const platformCount = Math.floor(Math.random() * 2) + 2;
    const selectedPlatforms = platforms
      .sort(() => Math.random() - 0.5)
      .slice(0, platformCount);
    
    selectedPlatforms.forEach(platform => {
      presence[platform as keyof AthleteIdentity['socialPresence']] = `@${username}`;
    });
    
    return presence;
  }

  // Advanced identity features
  async evolveIdentity(
    currentIdentity: AthleteIdentity, 
    newAchievements: Array<{
      title: string;
      date: string | Date;
      description: string;
      impact: 'high' | 'medium' | 'low';
    }>
  ): Promise<AthleteIdentity> {
    // Update achievements
    const updatedAchievements = [
      ...currentIdentity.achievements,
      ...newAchievements.map(a => ({
        title: a.title,
        date: new Date(a.date),
        description: a.description,
        impact: a.impact as 'high' | 'medium' | 'low'
      }))
    ].sort((a, b) => b.date.getTime() - a.date.getTime());
    
    // Potentially update personality based on achievements
    const updatedPersonality = { ...currentIdentity.personality };
    if (newAchievements.some(a => a.impact === 'high')) {
      updatedPersonality.traits = [...new Set([...updatedPersonality.traits, 'Champion'])];
    }
    
    return {
      ...currentIdentity,
      achievements: updatedAchievements,
      personality: updatedPersonality
    };
  }

  async generateHighlightReel(identity: AthleteIdentity): Promise<{
    title: string;
    thumbnail: string;
    duration: string;
    views: number;
  }> {
    const thumbnail = await designMaster.generateDesign({
      type: 'highlight_thumbnail',
      context: {
        athleteName: identity.name,
        school: identity.school,
        sport: identity.sport
      }
    });
    
    return {
      title: `${identity.name} | ${identity.school} ${identity.sport} Highlights`,
      thumbnail: thumbnail.imageUrl,
      duration: `${Math.floor(Math.random() * 3) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      views: Math.floor(Math.random() * 5000) + 500
    };
  }

  async generateRecruitingProfile(identity: AthleteIdentity): Promise<{
    gpa: number;
    satScore?: number;
    height: string;
    weight: string;
    stats: { [key: string]: string | number };
    coachContact: string;
    recruitingVideo: string;
  }> {
    return {
      gpa: Math.round((Math.random() * 1.5 + 3) * 100) / 100, // 3.0 - 4.5
      satScore: Math.random() > 0.5 ? Math.floor(Math.random() * 600) + 1000 : undefined,
      height: `${Math.floor(Math.random() * 12) + 5}'${Math.floor(Math.random() * 12)}"`,
      weight: `${Math.floor(Math.random() * 80) + 140} lbs`,
      stats: this.generateSportSpecificStats(identity.sport),
      coachContact: `coach@${identity.school.toLowerCase().replace(/\s+/g, '')}.edu`,
      recruitingVideo: `https://ultrapreps.com/recruit/${identity.username}`
    };
  }

  private generateSportSpecificStats(sport: string): { [key: string]: string | number } {
    const statTemplates: { [key: string]: () => { [key: string]: string | number } } = {
      Football: () => ({
        'Passing Yards': Math.floor(Math.random() * 3000) + 1000,
        'Touchdowns': Math.floor(Math.random() * 30) + 10,
        '40-yard dash': `${(Math.random() * 0.5 + 4.4).toFixed(2)}s`
      }),
      Basketball: () => ({
        'Points/Game': Math.floor(Math.random() * 15) + 10,
        'Rebounds/Game': Math.floor(Math.random() * 8) + 4,
        'Vertical Jump': `${Math.floor(Math.random() * 10) + 25}"`
      }),
      Soccer: () => ({
        'Goals': Math.floor(Math.random() * 20) + 5,
        'Assists': Math.floor(Math.random() * 15) + 3,
        'Mile Time': `${Math.floor(Math.random() * 60) + 300}s`
      }),
      default: () => ({
        'Games Played': Math.floor(Math.random() * 20) + 10,
        'Win Rate': `${Math.floor(Math.random() * 30) + 60}%`,
        'Team MVP': Math.random() > 0.7 ? 'Yes' : 'No'
      })
    };
    
    const generator = statTemplates[sport] || statTemplates.default;
    return generator();
  }
}

// Singleton instance
export const profileBot = new ProfileBot();

// React hook for using ProfileBot
export function useProfileBot() {
  const buildIdentity = async (info: Parameters<ProfileBot['buildIdentity']>[0]) => {
    return await profileBot.buildIdentity(info);
  };

  const evolveIdentity = async (
    identity: AthleteIdentity,
    achievements: Parameters<typeof profileBot.evolveIdentity>[1]
  ) => {
    return await profileBot.evolveIdentity(identity, achievements);
  };

  const generateHighlightReel = async (identity: AthleteIdentity) => {
    return await profileBot.generateHighlightReel(identity);
  };

  const generateRecruitingProfile = async (identity: AthleteIdentity) => {
    return await profileBot.generateRecruitingProfile(identity);
  };

  return {
    buildIdentity,
    evolveIdentity,
    generateHighlightReel,
    generateRecruitingProfile
  };
}