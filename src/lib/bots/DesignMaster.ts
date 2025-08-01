'use client';

import OpenAI from 'openai';
import { autonomousUltraBrain } from './AutonomousUltraBrain';

export interface DesignRequest {
  type: 'poster' | 'herocard' | 'stadium_background' | 'team_logo' | 'highlight_thumbnail';
  context: {
    athleteName?: string;
    school?: string;
    sport?: string;
    event?: string;
    theme?: string;
    colors?: string[];
    style?: 'cinematic' | 'modern' | 'vintage' | 'minimal';
  };
  dimensions?: {
    width: number;
    height: number;
  };
}

export interface DesignResult {
  imageUrl: string;
  prompt: string;
  style: string;
  schoolColors: string[];
  timestamp: Date;
}

class DesignMaster {
  private openai: OpenAI | null = null;
  private schoolColorDatabase: Map<string, string[]> = new Map([
    ['Lincoln High School', ['#1E40AF', '#FBBF24']], // Blue & Gold
    ['Washington Academy', ['#DC2626', '#F3F4F6']], // Red & White
    ['Jefferson Prep', ['#059669', '#FBBF24']], // Green & Gold
    ['Roosevelt High', ['#7C3AED', '#F59E0B']], // Purple & Orange
    ['Kennedy School', ['#0891B2', '#F3F4F6']], // Cyan & White
    ['Madison Academy', ['#DC2626', '#1F2937']], // Red & Black
    ['Hamilton High', ['#059669', '#F3F4F6']], // Green & White
    ['Franklin Prep', ['#1E40AF', '#F59E0B']], // Blue & Orange
    ['Adams Academy', ['#7C3AED', '#FBBF24']] // Purple & Gold
  ]);

  constructor() {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
      });
    }
  }

  async generateDesign(request: DesignRequest): Promise<DesignResult> {
    const { type, context, dimensions } = request;
    const schoolColors = this.getSchoolColors(context.school || '');
    const prompt = this.buildPrompt(type, context, schoolColors);
    const style = context.style || 'cinematic';

    try {
      if (this.openai) {
        // In production, use DALL-E 3
        const response = await this.openai.images.generate({
          model: 'dall-e-3',
          prompt,
          n: 1,
          size: this.getImageSize(dimensions),
          quality: 'hd',
          style: 'vivid'
        });

        return {
          imageUrl: response.data?.[0]?.url || this.getFallbackImage(type),
          prompt,
          style,
          schoolColors,
          timestamp: new Date()
        };
      }
    } catch (error) {
      console.error('Design generation failed:', error);
    }

    // Fallback for development or error
    return {
      imageUrl: this.getFallbackImage(type),
      prompt,
      style,
      schoolColors,
      timestamp: new Date()
    };
  }

  private buildPrompt(type: DesignRequest['type'], context: DesignRequest['context'], colors: string[]): string {
    const colorDesc = this.colorsToDescription(colors);
    const baseStyle = 'Professional sports design, high quality, dramatic lighting';

    switch (type) {
      case 'poster':
        return `${baseStyle}, game day poster for ${context.athleteName || 'athlete'} from ${context.school || 'school'}, 
                playing ${context.sport || 'sports'}, ${colorDesc} color scheme, ${context.style || 'cinematic'} style,
                dynamic action pose, stadium lights, crowd in background, ESPN quality graphics`;

      case 'herocard':
        return `${baseStyle}, trading card design for ${context.athleteName || 'athlete'}, 
                ${context.school || 'school'} ${context.sport || 'athlete'}, ${colorDesc} accents,
                holographic effects, premium metallic finish, stats overlay, professional portrait`;

      case 'stadium_background':
        return `${baseStyle}, aerial view of modern high school stadium at golden hour,
                ${colorDesc} team colors in stands and field, packed crowd, dramatic sky,
                Friday night lights atmosphere, cinematic wide shot`;

      case 'team_logo':
        return `Modern sports logo design for ${context.school || 'school'}, 
                ${colorDesc} colors, fierce mascot, professional vector style,
                suitable for jerseys and merchandise, bold and memorable`;

      case 'highlight_thumbnail':
        return `${baseStyle}, sports highlight thumbnail for ${context.athleteName || 'athlete'},
                ${context.sport || 'sports'} action shot, ${colorDesc} color grading,
                motion blur, explosive moment, YouTube thumbnail style`;

      default:
        return `${baseStyle}, sports themed image with ${colorDesc} colors`;
    }
  }

  private getSchoolColors(school: string): string[] {
    return this.schoolColorDatabase.get(school) || ['#F59E0B', '#1F2937']; // Default: Orange & Black
  }

  private colorsToDescription(colors: string[]): string {
    const colorNames = {
      '#1E40AF': 'deep blue',
      '#FBBF24': 'bright gold',
      '#DC2626': 'vibrant red',
      '#F3F4F6': 'crisp white',
      '#059669': 'emerald green',
      '#7C3AED': 'royal purple',
      '#F59E0B': 'electric orange',
      '#0891B2': 'cyan blue',
      '#1F2937': 'jet black'
    };

    const names = colors.map(c => colorNames[c as keyof typeof colorNames] || 'custom').join(' and ');
    return names;
  }

  private getImageSize(dimensions?: { width: number; height: number }): '1024x1024' | '1792x1024' | '1024x1792' {
    if (!dimensions) return '1024x1024';
    
    const ratio = dimensions.width / dimensions.height;
    if (ratio > 1.5) return '1792x1024'; // Landscape
    if (ratio < 0.67) return '1024x1792'; // Portrait
    return '1024x1024'; // Square
  }

  private getFallbackImage(type: DesignRequest['type']): string {
    const fallbacks = {
      poster: 'https://source.unsplash.com/800x1200/?sports,poster',
      herocard: 'https://source.unsplash.com/600x900/?athlete,portrait',
      stadium_background: 'https://source.unsplash.com/1920x1080/?stadium,sports',
      team_logo: 'https://source.unsplash.com/800x800/?logo,sports',
      highlight_thumbnail: 'https://source.unsplash.com/1280x720/?sports,action'
    };
    
    return fallbacks[type] || 'https://source.unsplash.com/800x600/?sports';
  }

  // Advanced Features
  async enhanceImage(imageUrl: string, enhancements: string[]): Promise<string> {
    // In production, this would apply filters and enhancements
    console.log('Applying enhancements:', enhancements);
    return imageUrl;
  }

  async generateSchoolTheme(school: string): Promise<{
    primaryColor: string;
    secondaryColor: string;
    mascot: string;
    fonts: string[];
  }> {
    const colors = this.getSchoolColors(school);
    
    // In production, this would use AI to detect actual school branding
    return {
      primaryColor: colors[0],
      secondaryColor: colors[1],
      mascot: this.generateMascot(school),
      fonts: ['Bebas Neue', 'Montserrat', 'Impact']
    };
  }

  private generateMascot(school: string): string {
    const mascots = ['Eagles', 'Tigers', 'Warriors', 'Knights', 'Panthers', 'Wildcats', 'Lions', 'Bears'];
    const index = school.length % mascots.length;
    return mascots[index];
  }

  async generateAnimatedPoster(request: DesignRequest): Promise<{
    frames: string[];
    duration: number;
    loop: boolean;
  }> {
    // Generate multiple frames for animation
    const frames: string[] = [];
    const baseDesign = await this.generateDesign(request);
    
    // In production, generate actual animated frames
    frames.push(baseDesign.imageUrl);
    
    return {
      frames,
      duration: 3000, // 3 seconds
      loop: true
    };
  }

  // Integration with AutonomousUltraBrain
  async fixBrokenImage(imageUrl: string, context?: unknown): Promise<string> {
    const athleteProfile = await autonomousUltraBrain.generateAthleteProfile();
    
    const designRequest: DesignRequest = {
      type: 'herocard',
      context: {
        athleteName: athleteProfile.name,
        school: athleteProfile.school,
        sport: athleteProfile.sport,
        style: 'modern'
      }
    };
    
    const result = await this.generateDesign(designRequest);
    return result.imageUrl;
  }
}

// Singleton instance
export const designMaster = new DesignMaster();

// React hook for using DesignMaster
export function useDesignMaster() {
  const generateDesign = async (request: DesignRequest) => {
    return await designMaster.generateDesign(request);
  };

  const getSchoolTheme = async (school: string) => {
    return await designMaster.generateSchoolTheme(school);
  };

  const generateAnimatedPoster = async (request: DesignRequest) => {
    return await designMaster.generateAnimatedPoster(request);
  };

  return {
    generateDesign,
    getSchoolTheme,
    generateAnimatedPoster
  };
}