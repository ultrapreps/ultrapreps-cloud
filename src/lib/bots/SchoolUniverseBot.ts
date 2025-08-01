import { prisma } from '@/lib/prisma';
import { School, Prisma } from '@prisma/client';

interface SchoolMetadata {
  name: string;
  city: string;
  state: string;
  district?: string;
  mascot?: string;
  nickname?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  website?: string;
  enrollmentSize?: number;
  founded?: number;
  athleticConference?: string;
  rivals?: string[];
}

interface SchoolSpaces {
  athleticsHub: {
    id: string;
    name: string;
    description: string;
    features: string[];
  };
  academicHub: {
    id: string;
    name: string;
    description: string;
    features: string[];
  };
  communityHub: {
    id: string;
    name: string;
    description: string;
    features: string[];
  };
}

interface StaffPlaceholder {
  role: string;
  title: string;
  email: string;
  department: string;
  isClaimable: boolean;
}

export class SchoolUniverseBot {
  // Common mascot color mappings
  private readonly mascotColors: Record<string, { primary: string; secondary: string }> = {
    'eagles': { primary: '#1E3A8A', secondary: '#FFFFFF' },
    'hawks': { primary: '#DC2626', secondary: '#1F2937' },
    'wildcats': { primary: '#7C3AED', secondary: '#FCD34D' },
    'mustangs': { primary: '#B91C1C', secondary: '#F59E0B' },
    'lions': { primary: '#F59E0B', secondary: '#1F2937' },
    'tigers': { primary: '#EA580C', secondary: '#111827' },
    'bulldogs': { primary: '#991B1B', secondary: '#FFFFFF' },
    'panthers': { primary: '#111827', secondary: '#6366F1' },
    'warriors': { primary: '#DC2626', secondary: '#FCD34D' },
    'spartans': { primary: '#166534', secondary: '#FFFFFF' },
    'knights': { primary: '#1E293B', secondary: '#C0C0C0' },
    'bears': { primary: '#92400E', secondary: '#F59E0B' },
    'wolves': { primary: '#4B5563', secondary: '#B91C1C' },
    'rams': { primary: '#1E3A8A', secondary: '#FCD34D' },
    'falcons': { primary: '#DC2626', secondary: '#111827' },
    'cougars': { primary: '#7C2D12', secondary: '#FCD34D' },
    'vikings': { primary: '#6D28D9', secondary: '#FCD34D' },
    'patriots': { primary: '#1E3A8A', secondary: '#DC2626' },
    'chargers': { primary: '#3B82F6', secondary: '#FCD34D' },
    'rockets': { primary: '#DC2626', secondary: '#FFFFFF' }
  };

  // Texas high school athletic conferences
  private readonly texasConferences: Record<string, string[]> = {
    '6A': ['Region 1', 'Region 2', 'Region 3', 'Region 4'],
    '5A': ['Division I', 'Division II'],
    '4A': ['Division I', 'Division II'],
    '3A': ['Division I', 'Division II'],
    '2A': ['Division I', 'Division II'],
    '1A': ['Six-Man Division I', 'Six-Man Division II']
  };

  /**
   * Create or update a school's digital universe
   */
  async createSchoolUniverse(schoolData: {
    name: string;
    city: string;
    state: string;
    district?: string;
  }): Promise<{
    school: School;
    spaces: SchoolSpaces;
    staff: StaffPlaceholder[];
  }> {
    // Step 1: Resolve school metadata
    const metadata = await this.resolveSchoolMetadata(schoolData);
    
    // Step 2: Create or update school in database
    const school = await this.upsertSchool(metadata);
    
    // Step 3: Generate school spaces
    const spaces = await this.createSchoolSpaces(school);
    
    // Step 4: Create staff placeholders
    const staff = await this.createStaffPlaceholders(school);
    
    // Step 5: Generate initial assets (banner, stadium cover)
    await this.generateSchoolAssets(school);
    
    return { school, spaces, staff };
  }

  /**
   * Resolve school metadata from various sources
   */
  private async resolveSchoolMetadata(data: {
    name: string;
    city: string;
    state: string;
    district?: string;
  }): Promise<SchoolMetadata> {
    // Extract mascot from school name if present
    const mascot = this.extractMascot(data.name);
    const colors = this.getSchoolColors(mascot, data.name);
    
    // Determine athletic conference (Texas-specific)
    const conference = this.determineAthleticConference(data.city, data.state);
    
    // Find potential rivals based on location
    const rivals = await this.findLocalRivals(data.city, data.state);
    
    return {
      name: data.name,
      city: data.city,
      state: data.state,
      district: data.district,
      mascot: mascot,
      nickname: this.generateNickname(data.name, mascot),
      primaryColor: colors.primary,
      secondaryColor: colors.secondary,
      accentColor: colors.accent,
      website: this.guessWebsite(data.name, data.district),
      athleticConference: conference,
      rivals: rivals
    };
  }

  /**
   * Extract mascot from school name
   */
  private extractMascot(schoolName: string): string {
    const words = schoolName.toLowerCase().split(' ');
    
    // Check last word first (most common pattern)
    const lastWord = words[words.length - 1];
    if (this.mascotColors[lastWord]) {
      return lastWord.charAt(0).toUpperCase() + lastWord.slice(1);
    }
    
    // Check all words
    for (const word of words) {
      if (this.mascotColors[word]) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    }
    
    // Default mascots based on common patterns
    if (schoolName.includes('Central')) return 'Lions';
    if (schoolName.includes('North')) return 'Hawks';
    if (schoolName.includes('South')) return 'Panthers';
    if (schoolName.includes('East')) return 'Eagles';
    if (schoolName.includes('West')) return 'Warriors';
    if (schoolName.includes('Memorial')) return 'Patriots';
    
    return 'Wildcats'; // Default
  }

  /**
   * Get school colors based on mascot and name
   */
  private getSchoolColors(mascot: string, schoolName: string): {
    primary: string;
    secondary: string;
    accent: string;
  } {
    const mascotLower = mascot.toLowerCase();
    const colors = this.mascotColors[mascotLower] || {
      primary: '#1E3A8A',
      secondary: '#F59E0B'
    };
    
    // Add accent color
    const accent = this.generateAccentColor(colors.primary);
    
    return {
      primary: colors.primary,
      secondary: colors.secondary,
      accent: accent
    };
  }

  /**
   * Generate accent color from primary
   */
  private generateAccentColor(primary: string): string {
    // Simple complementary color logic
    const colorMap: Record<string, string> = {
      '#1E3A8A': '#F59E0B', // Blue -> Amber
      '#DC2626': '#10B981', // Red -> Green
      '#7C3AED': '#F59E0B', // Purple -> Amber
      '#F59E0B': '#3B82F6', // Amber -> Blue
      '#111827': '#F59E0B', // Black -> Amber
      '#FFFFFF': '#3B82F6', // White -> Blue
    };
    
    return colorMap[primary] || '#F59E0B';
  }

  /**
   * Generate school nickname
   */
  private generateNickname(schoolName: string, mascot: string): string {
    const city = schoolName.split(' ')[0];
    return `${city} ${mascot}`;
  }

  /**
   * Guess school website URL
   */
  private guessWebsite(schoolName: string, district?: string): string {
    const nameSlug = schoolName
      .toLowerCase()
      .replace(/high school/g, '')
      .replace(/\s+/g, '')
      .trim();
    
    if (district) {
      const districtSlug = district
        .toLowerCase()
        .replace(/isd|school district/g, '')
        .replace(/\s+/g, '')
        .trim();
      return `https://${districtSlug}isd.org/${nameSlug}`;
    }
    
    return `https://${nameSlug}.edu`;
  }

  /**
   * Determine athletic conference
   */
  private determineAthleticConference(city: string, state: string): string {
    if (state.toLowerCase() === 'texas' || state.toLowerCase() === 'tx') {
      // Texas UIL classifications based on city size (simplified)
      const majorCities = ['houston', 'dallas', 'austin', 'san antonio', 'fort worth'];
      const mediumCities = ['plano', 'laredo', 'lubbock', 'garland', 'irving'];
      
      if (majorCities.some(c => city.toLowerCase().includes(c))) {
        return 'UIL 6A';
      } else if (mediumCities.some(c => city.toLowerCase().includes(c))) {
        return 'UIL 5A Division I';
      }
      
      // Default for smaller Texas cities
      return 'UIL 4A Division I';
    }
    
    // Other states
    return `${state} High School Athletic Association`;
  }

  /**
   * Find local rival schools
   */
  private async findLocalRivals(city: string, state: string): Promise<string[]> {
    // In production, this would query nearby schools
    // For now, return common rivalry patterns
    
    const rivalPatterns = [
      { pattern: 'North', rival: 'South' },
      { pattern: 'East', rival: 'West' },
      { pattern: 'Central', rival: 'Memorial' },
      { pattern: 'Heights', rival: 'Valley' }
    ];
    
    // Return empty for now - would query database in production
    return [];
  }

  /**
   * Create or update school in database
   */
  private async upsertSchool(metadata: SchoolMetadata): Promise<School> {
    const schoolData: Prisma.SchoolCreateInput = {
      name: metadata.name,
      city: metadata.city,
      state: metadata.state,
      district: metadata.district,
      mascot: metadata.mascot,
      nickname: metadata.nickname,
      primaryColor: metadata.primaryColor || '#F59E0B',
      secondaryColor: metadata.secondaryColor || '#F97316',
      accentColor: metadata.accentColor,
      website: metadata.website,
      rivals: metadata.rivals || [],
      traditions: {
        chants: [`Go ${metadata.mascot}!`, `${metadata.nickname} Pride!`],
        events: ['Homecoming', 'Spirit Week', 'Senior Night']
      }
    };

    return await prisma.school.upsert({
      where: {
        name: metadata.name
      },
      update: schoolData,
      create: schoolData
    });
  }

  /**
   * Create school spaces (hubs)
   */
  private async createSchoolSpaces(school: School): Promise<SchoolSpaces> {
    return {
      athleticsHub: {
        id: `athletics_${school.id}`,
        name: `${school.nickname} Athletics`,
        description: `Home of ${school.name} sports teams and athletic programs`,
        features: [
          'Team Rosters & Schedules',
          'Live Game Updates',
          'Athletic Achievements',
          'Recruiting Portal',
          'Booster Club'
        ]
      },
      academicHub: {
        id: `academic_${school.id}`,
        name: `${school.nickname} Academics`,
        description: `Academic excellence and student achievements at ${school.name}`,
        features: [
          'Honor Roll',
          'AP Programs',
          'Academic Competitions',
          'Scholarship Opportunities',
          'College Preparation'
        ]
      },
      communityHub: {
        id: `community_${school.id}`,
        name: `${school.nickname} Community`,
        description: `Connect with the ${school.name} family and community`,
        features: [
          'Parent Portal',
          'Alumni Network',
          'School Events',
          'Volunteer Opportunities',
          'Fundraising Campaigns'
        ]
      }
    };
  }

  /**
   * Create staff placeholder accounts
   */
  private async createStaffPlaceholders(school: School): Promise<StaffPlaceholder[]> {
    const staffRoles = [
      { role: 'SUPERINTENDENT', title: 'Superintendent', department: 'Administration' },
      { role: 'SUPERINTENDENT', title: 'Principal', department: 'Administration' },
      { role: 'ATHLETIC_DIRECTOR', title: 'Athletic Director', department: 'Athletics' },
      { role: 'COACH', title: 'Head Football Coach', department: 'Athletics' },
      { role: 'COACH', title: 'Head Basketball Coach', department: 'Athletics' },
      { role: 'COACH', title: 'Head Baseball Coach', department: 'Athletics' },
      { role: 'COACH', title: 'Head Track Coach', department: 'Athletics' },
      { role: 'TEACHER', title: 'Student Council Advisor', department: 'Student Life' },
      { role: 'TEACHER', title: 'Band Director', department: 'Fine Arts' },
      { role: 'TEACHER', title: 'Drama Director', department: 'Fine Arts' }
    ];

    return staffRoles.map(staff => ({
      role: staff.role,
      title: staff.title,
      email: this.generateStaffEmail(staff.title, school.name),
      department: staff.department,
      isClaimable: true
    }));
  }

  /**
   * Generate staff email placeholder
   */
  private generateStaffEmail(title: string, schoolName: string): string {
    const titleSlug = title
      .toLowerCase()
      .replace(/head |director|coach/g, '')
      .replace(/\s+/g, '.')
      .trim();
    
    const schoolSlug = schoolName
      .toLowerCase()
      .replace(/high school/g, '')
      .replace(/\s+/g, '')
      .trim();
    
    return `${titleSlug}@${schoolSlug}.edu`;
  }

  /**
   * Generate initial school assets
   */
  private async generateSchoolAssets(school: School): Promise<void> {
    // In production, this would call AI image generation
    // For now, we'll set placeholder URLs
    
    await prisma.school.update({
      where: { id: school.id },
      data: {
        bannerUrl: `/api/placeholder/1920/400?text=${encodeURIComponent(school.name)}`,
        logoUrl: `/api/placeholder/200/200?text=${encodeURIComponent(school.mascot || 'Logo')}`,
        mascotImageUrl: `/api/placeholder/400/400?text=${encodeURIComponent(school.mascot || 'Mascot')}`
      }
    });
  }

  /**
   * Check if a school exists
   */
  async schoolExists(name: string): Promise<boolean> {
    const school = await prisma.school.findFirst({
      where: { name }
    });
    return !!school;
  }

  /**
   * Get school by ID
   */
  async getSchool(id: string): Promise<School | null> {
    return await prisma.school.findUnique({
      where: { id }
    });
  }

  /**
   * Search schools by location
   */
  async searchSchools(city: string, state: string): Promise<School[]> {
    return await prisma.school.findMany({
      where: {
        city: {
          contains: city,
          mode: 'insensitive'
        },
        state: {
          equals: state,
          mode: 'insensitive'
        }
      },
      take: 10
    });
  }
}