'use client';

import { designMaster } from './DesignMaster';

export interface SchoolProfile {
  id: string;
  name: string;
  nickname?: string;
  mascot: string;
  colors: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  location: {
    city: string;
    state: string;
    coordinates?: { lat: number; lng: number };
  };
  campus: {
    zones: CampusZone[];
    stadiums: Stadium[];
    facilities: Facility[];
  };
  rivals: Rival[];
  traditions: Tradition[];
  stats: {
    enrollment: number;
    founded: number;
    championships: number;
    famousAlumni: string[];
  };
  brandAssets: {
    logo: string;
    stadiumBackground: string;
    mascotImage: string;
    fonts: string[];
  };
}

interface CampusZone {
  id: string;
  name: string;
  type: 'athletic' | 'academic' | 'social' | 'administrative';
  description: string;
  features: string[];
}

interface Stadium {
  name: string;
  sport: string;
  capacity: number;
  features: string[];
  imageUrl: string;
}

interface Facility {
  name: string;
  type: 'training' | 'academic' | 'recreation';
  sports?: string[];
  amenities: string[];
}

interface Rival {
  schoolName: string;
  rivalryName?: string;
  since: number;
  intensity: 'friendly' | 'heated' | 'legendary';
  annualGame?: string;
}

interface Tradition {
  name: string;
  description: string;
  type: 'pregame' | 'victory' | 'annual' | 'mascot';
  since?: number;
}

class SchoolUniverse {
  private mascotDatabase = [
    'Eagles', 'Tigers', 'Warriors', 'Knights', 'Panthers', 
    'Wildcats', 'Lions', 'Bears', 'Hawks', 'Spartans',
    'Bulldogs', 'Mustangs', 'Wolves', 'Dragons', 'Titans'
  ];

  private traditionsTemplates = [
    { name: 'Victory Bell', type: 'victory' as const, description: 'Ring the bell after every home victory' },
    { name: 'Spirit Week', type: 'annual' as const, description: 'Annual week of school pride and competitions' },
    { name: 'Senior Night', type: 'annual' as const, description: 'Honor senior athletes in their final home game' },
    { name: 'Tunnel Walk', type: 'pregame' as const, description: 'Team runs through student-formed tunnel' },
    { name: 'Fight Song', type: 'victory' as const, description: 'School fight song played after touchdowns' }
  ];

  async createSchoolProfile(schoolName: string, location?: { city: string; state: string }): Promise<SchoolProfile> {
    // Generate basic info
    const mascot = this.generateMascot(schoolName);
    const colors = await this.generateSchoolColors(schoolName);
    
    // Generate brand assets
    const brandAssets = await this.generateBrandAssets(schoolName, mascot, colors);
    
    // Build campus
    const campus = this.generateCampus(schoolName);
    
    // Generate rivals
    const rivals = this.generateRivals(schoolName, location?.state);
    
    // Generate traditions
    const traditions = this.generateTraditions(mascot);
    
    return {
      id: Date.now().toString(),
      name: schoolName,
      nickname: this.generateNickname(schoolName),
      mascot,
      colors,
      location: location || this.generateLocation(),
      campus,
      rivals,
      traditions,
      stats: {
        enrollment: Math.floor(Math.random() * 2000) + 800,
        founded: Math.floor(Math.random() * 100) + 1920,
        championships: Math.floor(Math.random() * 50),
        famousAlumni: this.generateFamousAlumni()
      },
      brandAssets
    };
  }

  private generateMascot(schoolName: string): string {
    // Use school name length to consistently pick a mascot
    const index = schoolName.length % this.mascotDatabase.length;
    return this.mascotDatabase[index];
  }

  private async generateSchoolColors(schoolName: string): Promise<SchoolProfile['colors']> {
    const theme = await designMaster.generateSchoolTheme(schoolName);
    
    return {
      primary: theme.primaryColor,
      secondary: theme.secondaryColor,
      accent: this.generateAccentColor(theme.primaryColor)
    };
  }

  private generateAccentColor(primaryColor: string): string {
    // Generate a complementary accent color
    const accentColors = ['#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EF4444'];
    return accentColors[Math.floor(Math.random() * accentColors.length)];
  }

  private async generateBrandAssets(
    schoolName: string, 
    mascot: string, 
    colors: SchoolProfile['colors']
  ): Promise<SchoolProfile['brandAssets']> {
    // Generate logo
    const logoResult = await designMaster.generateDesign({
      type: 'team_logo',
      context: {
        school: schoolName,
        theme: mascot,
        colors: [colors.primary, colors.secondary]
      }
    });
    
    // Generate stadium background
    const stadiumResult = await designMaster.generateDesign({
      type: 'stadium_background',
      context: {
        school: schoolName,
        colors: [colors.primary, colors.secondary]
      }
    });
    
    return {
      logo: logoResult.imageUrl,
      stadiumBackground: stadiumResult.imageUrl,
      mascotImage: `https://source.unsplash.com/800x800/?${mascot},mascot,cartoon`,
      fonts: ['Bebas Neue', 'Montserrat', 'Oswald']
    };
  }

  private generateCampus(schoolName: string): SchoolProfile['campus'] {
    const zones: CampusZone[] = [
      {
        id: '1',
        name: 'Athletic Complex',
        type: 'athletic',
        description: 'State-of-the-art training facilities',
        features: ['Weight Room', 'Recovery Center', 'Film Room', 'Locker Rooms']
      },
      {
        id: '2',
        name: 'Academic Center',
        type: 'academic',
        description: 'Student-athlete study center',
        features: ['Study Halls', 'Tutoring Rooms', 'Computer Lab', 'Library Access']
      },
      {
        id: '3',
        name: 'Student Union',
        type: 'social',
        description: 'Central hub for student life',
        features: ['Food Court', 'Game Room', 'Meeting Spaces', 'Spirit Store']
      }
    ];
    
    const stadiums: Stadium[] = [
      {
        name: `${schoolName} Stadium`,
        sport: 'Football',
        capacity: Math.floor(Math.random() * 5000) + 3000,
        features: ['Artificial Turf', 'LED Scoreboard', 'Press Box', 'Concessions'],
        imageUrl: 'https://source.unsplash.com/1200x800/?football,stadium,field'
      },
      {
        name: `${schoolName} Gymnasium`,
        sport: 'Basketball',
        capacity: Math.floor(Math.random() * 2000) + 1500,
        features: ['Hardwood Floor', 'Video Board', 'Student Section', 'Championship Banners'],
        imageUrl: 'https://source.unsplash.com/1200x800/?basketball,gymnasium,court'
      }
    ];
    
    const facilities: Facility[] = [
      {
        name: 'Performance Training Center',
        type: 'training',
        sports: ['All Sports'],
        amenities: ['Olympic Weights', 'Cardio Equipment', 'Plyometric Area', 'Recovery Pools']
      },
      {
        name: 'Academic Success Center',
        type: 'academic',
        amenities: ['Private Study Rooms', '24/7 Access', 'Academic Advisors', 'Printing Services']
      }
    ];
    
    return { zones, stadiums, facilities };
  }

  private generateLocation(): SchoolProfile['location'] {
    const cities = [
      { city: 'Springfield', state: 'IL' },
      { city: 'Columbus', state: 'OH' },
      { city: 'Madison', state: 'WI' },
      { city: 'Austin', state: 'TX' },
      { city: 'Portland', state: 'OR' }
    ];
    
    return cities[Math.floor(Math.random() * cities.length)];
  }

  private generateRivals(schoolName: string, state?: string): Rival[] {
    const rivalSchools = [
      'Central High', 'North Academy', 'East Prep', 'West School', 'South Institute'
    ];
    
    const rivals: Rival[] = [];
    const rivalCount = Math.floor(Math.random() * 2) + 1;
    
    for (let i = 0; i < rivalCount; i++) {
      const rivalName = rivalSchools[i];
      rivals.push({
        schoolName: rivalName,
        rivalryName: Math.random() > 0.5 ? `The ${this.generateRivalryName()} Trophy` : undefined,
        since: Math.floor(Math.random() * 50) + 1970,
        intensity: ['friendly', 'heated', 'legendary'][Math.floor(Math.random() * 3)] as Rival['intensity'],
        annualGame: Math.random() > 0.5 ? 'Thanksgiving Classic' : undefined
      });
    }
    
    return rivals;
  }

  private generateRivalryName(): string {
    const names = ['Battle', 'Iron', 'Victory', 'Golden', 'Heritage'];
    return names[Math.floor(Math.random() * names.length)];
  }

  private generateTraditions(mascot: string): Tradition[] {
    const selected: Tradition[] = [];
    const count = Math.floor(Math.random() * 3) + 2;
    
    // Add some standard traditions
    for (let i = 0; i < count && i < this.traditionsTemplates.length; i++) {
      const template = this.traditionsTemplates[i];
      selected.push({
        ...template,
        since: Math.floor(Math.random() * 40) + 1980
      });
    }
    
    // Add mascot-specific tradition
    selected.push({
      name: `${mascot} Roar`,
      description: `Students perform the ${mascot} roar after big plays`,
      type: 'mascot',
      since: Math.floor(Math.random() * 30) + 1990
    });
    
    return selected;
  }

  private generateNickname(schoolName: string): string | undefined {
    if (Math.random() > 0.5) {
      const nicknames = ['The Hill', 'The Nest', 'The Den', 'The Fort', 'The Academy'];
      return nicknames[Math.floor(Math.random() * nicknames.length)];
    }
    return undefined;
  }

  private generateFamousAlumni(): string[] {
    const firstNames = ['Michael', 'Sarah', 'James', 'Maria', 'David', 'Jessica'];
    const lastNames = ['Johnson', 'Williams', 'Davis', 'Martinez', 'Anderson', 'Thompson'];
    const achievements = ['NFL Player', 'Olympic Athlete', 'NBA Player', 'MLB All-Star', 'Soccer Pro'];
    
    const count = Math.floor(Math.random() * 3) + 2;
    const alumni: string[] = [];
    
    for (let i = 0; i < count; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const achievement = achievements[Math.floor(Math.random() * achievements.length)];
      alumni.push(`${firstName} ${lastName} - ${achievement}`);
    }
    
    return alumni;
  }

  // Advanced features
  async detectRivalries(school1: SchoolProfile, school2: SchoolProfile): Promise<{
    shouldBeRivals: boolean;
    reasons: string[];
    suggestedIntensity: Rival['intensity'];
  }> {
    const reasons: string[] = [];
    
    // Check geographic proximity
    if (school1.location.state === school2.location.state) {
      reasons.push('Same state rivals');
    }
    
    // Check similar mascots (natural rivals)
    const naturalRivals: Record<string, string[]> = {
      'Eagles': ['Hawks', 'Falcons'],
      'Tigers': ['Lions', 'Panthers'],
      'Warriors': ['Spartans', 'Knights']
    };
    
    if (naturalRivals[school1.mascot]?.includes(school2.mascot)) {
      reasons.push('Natural mascot rivalry');
    }
    
    // Check enrollment similarity
    const enrollmentDiff = Math.abs(school1.stats.enrollment - school2.stats.enrollment);
    if (enrollmentDiff < 500) {
      reasons.push('Similar size schools');
    }
    
    const intensity: Rival['intensity'] = 
      reasons.length >= 3 ? 'legendary' :
      reasons.length >= 2 ? 'heated' : 'friendly';
    
    return {
      shouldBeRivals: reasons.length > 0,
      reasons,
      suggestedIntensity: intensity
    };
  }

  async generateGameDayAtmosphere(school: SchoolProfile): Promise<{
    crowdSize: number;
    energy: 'electric' | 'intense' | 'excited' | 'nervous';
    traditions: string[];
    soundtrack: string[];
  }> {
    const maxCapacity = school.campus.stadiums[0]?.capacity || 5000;
    const crowdSize = Math.floor(maxCapacity * (0.7 + Math.random() * 0.3));
    
    const energy = ['electric', 'intense', 'excited', 'nervous'][
      Math.floor(Math.random() * 4)
    ] as 'electric' | 'intense' | 'excited' | 'nervous';
    
    const activeTraditions = school.traditions
      .filter(t => t.type === 'pregame' || t.type === 'mascot')
      .map(t => t.name);
    
    const soundtrack = [
      'Fight Song',
      'We Will Rock You',
      'Eye of the Tiger',
      'Thunderstruck',
      'Seven Nation Army'
    ].slice(0, Math.floor(Math.random() * 3) + 3);
    
    return {
      crowdSize,
      energy,
      traditions: activeTraditions,
      soundtrack
    };
  }
}

// Singleton instance
export const schoolUniverse = new SchoolUniverse();

// React hook for using SchoolUniverse
export function useSchoolUniverse() {
  const createSchoolProfile = async (
    schoolName: string, 
    location?: { city: string; state: string }
  ) => {
    return await schoolUniverse.createSchoolProfile(schoolName, location);
  };

  const detectRivalries = async (school1: SchoolProfile, school2: SchoolProfile) => {
    return await schoolUniverse.detectRivalries(school1, school2);
  };

  const generateGameDayAtmosphere = async (school: SchoolProfile) => {
    return await schoolUniverse.generateGameDayAtmosphere(school);
  };

  return {
    createSchoolProfile,
    detectRivalries,
    generateGameDayAtmosphere
  };
}