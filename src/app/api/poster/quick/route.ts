import { NextRequest, NextResponse } from 'next/server';
import { PosterGenerator } from '@/lib/ai/PosterGenerator';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PosterType } from '@prisma/client';

// Quick poster generation templates
const quickTemplates = {
  gameday: {
    type: 'GAME_DAY' as PosterType,
    titleTemplate: '{home} vs {away}',
    subtitleTemplate: '{date} at {time}',
    defaultPrompt: 'Epic game day announcement poster'
  },
  achievement: {
    type: 'ACHIEVEMENT' as PosterType,
    titleTemplate: '{achievement}',
    subtitleTemplate: '{player} - {details}',
    defaultPrompt: 'Celebration achievement poster with gold accents'
  },
  recruiting: {
    type: 'RECRUITING' as PosterType,
    titleTemplate: '{player} Commits!',
    subtitleTemplate: 'Welcome to {school}',
    defaultPrompt: 'Professional college commitment announcement'
  },
  hype: {
    type: 'ACHIEVEMENT' as PosterType,
    titleTemplate: '{score} HYPE Points!',
    subtitleTemplate: '{player} reaches new milestone',
    defaultPrompt: 'Energy-filled HYPE milestone poster with lightning effects'
  }
};

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    const { 
      template,
      schoolId,
      data = {}
    } = await req.json();
    
    // Validate template
    if (!template || !quickTemplates[template as keyof typeof quickTemplates]) {
      return NextResponse.json(
        { error: 'Invalid template. Use: gameday, achievement, recruiting, or hype' },
        { status: 400 }
      );
    }
    
    // Get template config
    const templateConfig = quickTemplates[template as keyof typeof quickTemplates];
    
    // Build title and subtitle from template
    let title = templateConfig.titleTemplate;
    let subtitle = templateConfig.subtitleTemplate;
    
    // Replace placeholders with actual data
    Object.entries(data).forEach(([key, value]) => {
      title = title.replace(`{${key}}`, String(value));
      subtitle = subtitle.replace(`{${key}}`, String(value));
    });
    
    // Remove any remaining placeholders
    title = title.replace(/\{[^}]+\}/g, '');
    subtitle = subtitle.replace(/\{[^}]+\}/g, '').trim();
    
    // Get school or use demo school
    let school;
    if (schoolId) {
      school = await prisma.school.findUnique({
        where: { id: schoolId }
      });
    }
    
    if (!school) {
      // Create or get demo school for testing
      school = await prisma.school.findFirst({
        where: { name: 'Demo High School' }
      });
      
      if (!school) {
        school = await prisma.school.create({
          data: {
            name: 'Demo High School',
            nickname: 'Demo Eagles',
            mascot: 'Eagles',
            primaryColor: '#1E3A8A',
            secondaryColor: '#FFFFFF',
            accentColor: '#F59E0B',
            city: 'Demo City',
            state: 'TX',
            founded: 2024
          }
        });
      }
    }
    
    // Generate poster
    const generator = new PosterGenerator();
    console.log(`🚀 Quick generating ${template} poster`);
    
    const poster = await generator.generatePoster({
      type: templateConfig.type,
      school,
      title,
      subtitle: subtitle || undefined,
      customPrompt: data.customPrompt || templateConfig.defaultPrompt
    });
    
    console.log(`✅ Quick poster generated: ${poster.id}`);
    
    return NextResponse.json({
      success: true,
      poster: {
        id: poster.id,
        url: poster.url,
        type: poster.type,
        title,
        subtitle,
        shareUrl: `${process.env.NEXT_PUBLIC_APP_URL}/poster/${poster.id}`
      },
      quickShare: {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(poster.url)}`,
        download: poster.url
      }
    });
    
  } catch (error) {
    console.error('Quick poster generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate quick poster' },
      { status: 500 }
    );
  }
}

// GET endpoint to show available quick templates
export async function GET() {
  return NextResponse.json({
    templates: Object.entries(quickTemplates).map(([key, config]) => ({
      key,
      type: config.type,
      titleTemplate: config.titleTemplate,
      subtitleTemplate: config.subtitleTemplate,
      requiredData: extractPlaceholders(config.titleTemplate + ' ' + config.subtitleTemplate)
    })),
    examples: {
      gameday: {
        template: 'gameday',
        data: {
          home: 'Marble Falls',
          away: 'Austin High',
          date: 'Friday, Oct 20',
          time: '7:00 PM'
        }
      },
      achievement: {
        template: 'achievement',
        data: {
          achievement: '1000 Career Points',
          player: 'John Smith',
          details: 'Season High 35 Points'
        }
      },
      recruiting: {
        template: 'recruiting',
        data: {
          player: 'Jane Doe',
          school: 'University of Texas'
        }
      },
      hype: {
        template: 'hype',
        data: {
          score: '10,000',
          player: 'Mike Johnson'
        }
      }
    }
  });
}

// Helper function to extract placeholders from template
function extractPlaceholders(template: string): string[] {
  const matches = template.match(/\{([^}]+)\}/g) || [];
  return [...new Set(matches.map(m => m.slice(1, -1)))];
}