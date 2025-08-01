import { NextRequest, NextResponse } from 'next/server';
import { CrawlerBot } from '../../../bots/CrawlerBot';
import { aggregateStats } from '../../../bots/StatsBot';
import { blendSelfie } from '../../../bots/SelfieEngine';
import { heroCardGenerator } from '@/lib/ai/HeroCardGenerator';

export async function POST(req: NextRequest) {
  console.log('🚀 HeroCard API called - Using ULTRAPREPS_PROMPT_BIBLE_V3.0');
  const { athleteName, school, classYear, selfie, sport = 'Football', jerseyNumber = '6' } = await req.json();
  console.log('📝 Request data:', { athleteName, school, classYear, hasSelfie: !!selfie, sport, jerseyNumber });

  try {
    // Check OpenAI API key first
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.log('❌ Missing OpenAI API key');
      return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 });
    }

    // Fetch real athlete stats using bots
    let realStats = null;
    try {
      const crawlerBot = new CrawlerBot();
      const baseStats = await crawlerBot.fetchStudentProfile(athleteName);
      realStats = await aggregateStats(athleteName);
      console.log('✅ Got real stats from bots');
    } catch (e) {
      console.log('⚠️ Bot error, proceeding without real stats:', e);
    }

    // Get school info from SchoolUniverseBot
    const { SchoolUniverseBot } = await import('@/lib/bots/SchoolUniverseBot');
    const schoolBot = new SchoolUniverseBot();
    
    // Check if school exists or create it
    let schoolData;
    const schoolExists = await schoolBot.schoolExists(school);
    
    if (!schoolExists) {
      // Create the school universe (following ULTRAPREPS_ONBOARDING_BIBLE_V1.0)
      const result = await schoolBot.createSchoolUniverse({
        name: school,
        city: 'Marble Falls', // In production, get from user input or geolocation
        state: 'TX',
        district: 'Marble Falls ISD'
      });
      schoolData = result.school;
    } else {
      // Get existing school data
      const schools = await prisma.school.findMany({
        where: { name: school }
      });
      schoolData = schools[0];
    }
    
    const schoolInfo = {
      mascotName: schoolData.mascot || 'Mustangs',
      teamColors: {
        primary: schoolData.primaryColor || '#4B0082',
        secondary: schoolData.secondaryColor || '#FFD700'
      }
    };

    // Generate VISUAL HeroCard following ULTRAPREPS_PROMPT_BIBLE_V3.0
    console.log('🎨 Generating ESPN x Marvel x Nike style HeroCard...');
    const heroCardResult = await heroCardGenerator.generateFounderHeroCard({
      studentName: athleteName,
      classYear,
      schoolName: school,
      mascotName: schoolInfo.mascotName,
      jerseyNumber,
      sport,
      teamColors: schoolInfo.teamColors,
      selfies: selfie ? [selfie] : undefined,
      stats: realStats || {
        receptions: 48,
        yards: 998,
        touchdowns: 12
      }
    });

    console.log('✅ HeroCard generated successfully');
    
    // Return the visual HeroCard data
    return NextResponse.json({
      athleteName,
      school,
      classYear,
      mascot: schoolInfo.mascotName,
      schoolColors: [schoolInfo.teamColors.primary, schoolInfo.teamColors.secondary],
      sport,
      jerseyNumber,
      heroCardUrl: heroCardResult.herocard.herocard_url,
      studentPortraitUrl: heroCardResult.studentDNA.portrait_url,
      mascotUrl: heroCardResult.mascotDNA.mascot_url,
      stats: heroCardResult.herocard.composition.elements.stats_block,
      hypeScore: 75,
      validation: heroCardResult.validation,
      status: heroCardResult.status,
      chainOfCustody: `UltraPreps HeroCard Generator v3.0 - ${new Date().toISOString()}`
    });

  } catch (error) {
    console.error('❌ HeroCard generation error:', error);
    return NextResponse.json({ 
      error: 'Failed to generate HeroCard',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Helper to get atomic DNA summary from docs
async function getAtomicDnaSummary(): Promise<string> {
  // For now, just return a static summary. In production, read from docs/visual-dna/atomicdna.md
  return `
- Use Oswald Bold for display, Inter Regular for body.
- Primary colors: #1E3A8A (blue), #F59E0B (gold). Secondary: #F97316, #111827, #FFFFFF.
- HeroCard: 3:4 ratio, 600x800px, 32px safe zone, 2-col stat grid, mascot 70–85% athlete height.
- Borders: 24px (cards), 12px (buttons). Shadows: 0px 8px 32px rgba(0,0,0,0.35).
- Hype Wheel, overlays, stat blocks, role stacking, avatar mode per DNA rules.
- All data must be plausible, visually accurate, and match the DNA gallery.`;
}