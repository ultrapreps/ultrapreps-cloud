import { OpenAI } from 'openai';
import { School, User } from '@prisma/client';
import { VisionQA } from '@/lib/bots/VisionQA';
import { prisma } from '@/lib/prisma';

export type PosterType = 
  | 'GAME_DAY'
  | 'ACHIEVEMENT'
  | 'RECRUITING'
  | 'SEASON'
  | 'CUSTOM';

export interface PosterTemplate {
  type: PosterType;
  name: string;
  description: string;
  aspectRatio: '1:1' | '16:9' | '9:16' | '4:5';
  elements: string[];
  style: string;
}

export interface PosterRequest {
  type: PosterType;
  school: School;
  title: string;
  subtitle?: string;
  mainText?: string;
  date?: Date;
  players?: Array<{
    name: string;
    number: string;
    position?: string;
    photo?: string;
  }>;
  stats?: Record<string, any>;
  customPrompt?: string;
}

export interface GeneratedPoster {
  id: string;
  url: string;
  type: PosterType;
  prompt: string;
  schoolId: string;
  metadata: Record<string, any>;
  validationScore?: number;
  createdAt: Date;
}

export class PosterGenerator {
  private openai: OpenAI | null = null;
  private visionQA: VisionQA;
  
  // Poster templates
  private templates: Record<PosterType, PosterTemplate> = {
    'GAME_DAY': {
      type: 'GAME_DAY',
      name: 'Game Day',
      description: 'Hype poster for upcoming games',
      aspectRatio: '4:5',
      elements: ['team logos', 'date/time', 'venue', 'VS graphic'],
      style: 'dynamic sports poster, ESPN style, dramatic lighting'
    },
    'ACHIEVEMENT': {
      type: 'ACHIEVEMENT',
      name: 'Achievement',
      description: 'Celebrate milestones and records',
      aspectRatio: '16:9',
      elements: ['achievement text', 'player/team', 'stats', 'celebration'],
      style: 'celebratory, gold accents, confetti, triumphant'
    },
    'RECRUITING': {
      type: 'RECRUITING',
      name: 'Recruiting',
      description: 'College recruitment announcements',
      aspectRatio: '1:1',
      elements: ['player photo', 'college logo', 'commitment text'],
      style: 'professional, clean, college branding'
    },
    'SEASON': {
      type: 'SEASON',
      name: 'Season',
      description: 'Season highlights and schedules',
      aspectRatio: '16:9',
      elements: ['schedule', 'team branding', 'key games'],
      style: 'organized layout, team colors, professional'
    },
    'CUSTOM': {
      type: 'CUSTOM',
      name: 'Custom',
      description: 'Custom poster design',
      aspectRatio: '1:1',
      elements: ['flexible content', 'custom design'],
      style: 'varies based on requirements'
    }
  };

  constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
    this.visionQA = new VisionQA();
  }

  /**
   * Generate a poster using DALL-E 3
   */
  async generatePoster(request: PosterRequest): Promise<GeneratedPoster> {
    console.log(`🎨 Generating ${request.type} poster for ${request.school.name}`);
    
    // Build the prompt
    const prompt = this.buildPrompt(request);
    
    // Generate the image
    let imageUrl: string;
    
    if (this.openai) {
      try {
        const response = await this.openai.images.generate({
          model: "dall-e-3",
          prompt,
          n: 1,
          size: this.getImageSize(this.templates[request.type].aspectRatio),
          quality: "hd",
          style: "vivid"
        });
        
        imageUrl = response.data[0].url || '';
      } catch (error) {
        console.error('DALL-E 3 generation error:', error);
        imageUrl = this.generateMockPoster(request);
      }
    } else {
      imageUrl = this.generateMockPoster(request);
    }
    
    // Validate with VisionQA
    const validation = await this.visionQA.validateAsset(imageUrl, {
      assetType: 'poster',
      schoolName: request.school.name,
      schoolColors: {
        primary: request.school.primaryColor,
        secondary: request.school.secondaryColor,
        accent: request.school.accentColor
      },
      intendedUse: `${request.type} poster`,
      targetAudience: 'public'
    });
    
    // If validation fails, try to regenerate with improvements
    if (!validation.passed && validation.requiresRegeneration && this.openai) {
      console.log('🔄 Regenerating with improvements...');
      const improvedPrompt = this.visionQA.generateImprovementPrompt(prompt, validation);
      
      try {
        const response = await this.openai.images.generate({
          model: "dall-e-3",
          prompt: improvedPrompt,
          n: 1,
          size: this.getImageSize(this.templates[request.type].aspectRatio),
          quality: "hd",
          style: "vivid"
        });
        
        imageUrl = response.data[0].url || imageUrl;
      } catch (error) {
        console.error('Regeneration error:', error);
      }
    }
    
    // Save to database
    const poster: GeneratedPoster = {
      id: `poster_${Date.now()}`,
      url: imageUrl,
      type: request.type,
      prompt,
      schoolId: request.school.id,
      metadata: {
        title: request.title,
        subtitle: request.subtitle,
        template: this.templates[request.type].name,
        validationScore: validation.score
      },
      validationScore: validation.score,
      createdAt: new Date()
    };
    
    // In production, save to Poster model
    await this.savePoster(poster);
    
    return poster;
  }

  /**
   * Build DALL-E prompt from request
   */
  private buildPrompt(request: PosterRequest): string {
    const template = this.templates[request.type];
    const { school } = request;
    
    let prompt = `Create a ${template.style} poster for ${school.name} ${school.mascot || ''}. `;
    
    // Add school colors
    prompt += `Use school colors: primary ${school.primaryColor}, secondary ${school.secondaryColor}. `;
    
    // Add template-specific elements
    switch (request.type) {
      case 'GAME_DAY':
        prompt += `Show "${request.title}" prominently. `;
        if (request.subtitle) prompt += `Include "${request.subtitle}". `;
        if (request.date) prompt += `Display date: ${request.date.toLocaleDateString()}. `;
        prompt += `Make it exciting and energetic, ESPN GameDay style. `;
        break;
        
      case 'ACHIEVEMENT':
        prompt += `Celebrate: "${request.title}". `;
        prompt += `Make it feel triumphant with gold accents and celebration elements. `;
        if (request.stats) {
          prompt += `Include achievement details subtly in the design. `;
        }
        break;
        
      case 'RECRUITING':
        prompt += `College recruitment announcement: "${request.title}". `;
        if (request.subtitle) prompt += `${request.subtitle}. `;
        prompt += `Professional and clean design with college branding feel. `;
        break;
        
      case 'SEASON':
        prompt += `Season poster: "${request.title}". `;
        if (request.subtitle) prompt += `${request.subtitle}. `;
        prompt += `Include season highlights or schedule information. `;
        break;
        
      case 'CUSTOM':
      default:
        prompt += `"${request.title}" as the main focus. `;
        if (request.subtitle) prompt += `"${request.subtitle}" as supporting text. `;
    }
    
    // Add universal requirements
    prompt += 'Professional quality, no text errors, clean design. ';
    prompt += 'Suitable for social media sharing. ESPN/Nike aesthetic quality. ';
    prompt += `Aspect ratio: ${template.aspectRatio}. `;
    
    // Add custom prompt if provided
    if (request.customPrompt) {
      prompt += request.customPrompt;
    }
    
    return prompt;
  }

  /**
   * Get DALL-E size parameter based on aspect ratio
   */
  private getImageSize(aspectRatio: string): "1024x1024" | "1792x1024" | "1024x1792" {
    switch (aspectRatio) {
      case '16:9':
        return "1792x1024";
      case '9:16':
        return "1024x1792";
      default:
        return "1024x1024";
    }
  }

  /**
   * Generate mock poster for testing
   */
  private generateMockPoster(request: PosterRequest): string {
    const template = this.templates[request.type];
    const encodedText = encodeURIComponent(
      `${request.school.name}\n${template.name}\n${request.title}`
    );
    
    // Return placeholder with poster info
    return `/api/placeholder/1024/1024?text=${encodedText}&bg=${request.school.primaryColor.replace('#', '')}`;
  }

  /**
   * Save poster to database
   */
  private async savePoster(poster: GeneratedPoster): Promise<void> {
    // In production, save to Poster model
    await prisma.poster.create({
      data: {
        type: poster.type as PosterType,
        title: poster.metadata.title || 'Untitled',
        subtitle: poster.metadata.subtitle,
        imageUrl: poster.url,
        userId: 'system' // Would be actual user ID
      }
    });
  }

  /**
   * Get available templates
   */
  getTemplates(): PosterTemplate[] {
    return Object.values(this.templates);
  }

  /**
   * Generate game day poster
   */
  async generateGameDayPoster(
    school: School,
    opponent: string,
    gameDate: Date,
    venue: string
  ): Promise<GeneratedPoster> {
    return this.generatePoster({
      type: 'GAME_DAY',
      school,
      title: `${school.nickname || school.name} vs ${opponent}`,
      subtitle: venue,
      date: gameDate
    });
  }

  /**
   * Generate player spotlight poster
   */
  async generateAchievementPoster(
    school: School,
    achievement: string,
    details?: string,
    stats?: Record<string, any>
  ): Promise<GeneratedPoster> {
    return this.generatePoster({
      type: 'ACHIEVEMENT',
      school,
      title: achievement,
      subtitle: details,
      stats
    });
  }

  /**
   * Generate HYPE milestone poster
   */
  async generateRecruitingPoster(
    school: School,
    playerName: string,
    collegeName: string,
    commitment?: string
  ): Promise<GeneratedPoster> {
    return this.generatePoster({
      type: 'RECRUITING',
      school,
      title: `${playerName} Commits to ${collegeName}`,
      subtitle: commitment
    });
  }
}