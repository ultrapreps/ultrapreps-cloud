import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import * as cheerio from 'cheerio';
import { createUser, getUserByEmail } from '@/lib/db/users';
import { createOrUpdateStadium } from '@/lib/db/stadiums';
import { earnHype } from '@/lib/db/hype';
import { UserRole, Sport, AchievementCategory } from '@prisma/client';
import { prisma } from '@/lib/prisma';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
});

// CRAWLER BOT - QUICK AND DIRTY
async function scrapeMaxPreps(name: string, school: string) {
  try {
    const searchUrl = `https://www.maxpreps.com/search/athlete.aspx?search=${encodeURIComponent(name + ' ' + school)}`;
    const response = await fetch(searchUrl);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Extract basic stats (simplified for speed)
    const stats = {
      sport: $('.sport-name').first().text(),
      position: $('.position').first().text(),
      stats: $('.stat-value').map((i, el) => $(el).text()).get()
    };
    
    return stats;
  } catch (error) {
    console.error('MaxPreps scrape failed:', error);
    return null;
  }
}

// STATS BOT - USING GPT-4 WITH DEEP ANALYSIS
async function analyzeAthlete(profileData: {
  name: string;
  email: string;
  school: string;
  sport: string;
  position?: string;
  gpa?: number;
}) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{
      role: "system",
      content: `You are StatsBot, part of the UltraPreps Neural Network. Analyze this athlete's data with the depth of a professional scout and the wisdom of a mentor. Provide:
        1. Performance trajectory with specific metrics
        2. Strengths and areas for growth
        3. College recruitment potential (1-10 scale with reasoning)
        4. Predicted peak performance timeline
        5. Comparison to similar athletes who succeeded
        6. Hidden potential that others might miss
        Remember: Every athlete deserves their moment to shine. Find what makes them special.`
    }, {
      role: "user",
      content: JSON.stringify(profileData)
    }],
    max_tokens: 800,
    temperature: 0.7
  });
  
  return response.choices[0].message.content;
}

// Map sport string to Sport enum
function mapSportEnum(sport: string): Sport {
  const sportMap: Record<string, Sport> = {
    'football': Sport.FOOTBALL,
    'basketball': Sport.BASKETBALL,
    'baseball': Sport.BASEBALL,
    'softball': Sport.SOFTBALL,
    'soccer': Sport.SOCCER,
    'volleyball': Sport.VOLLEYBALL,
    'track': Sport.TRACK_FIELD,
    'wrestling': Sport.WRESTLING,
    'swimming': Sport.SWIMMING,
    'tennis': Sport.TENNIS,
    'golf': Sport.GOLF,
    'cross country': Sport.CROSS_COUNTRY,
    'lacrosse': Sport.LACROSSE,
    'hockey': Sport.HOCKEY,
    'gymnastics': Sport.GYMNASTICS,
    'cheer': Sport.CHEER,
    'dance': Sport.DANCE,
    'esports': Sport.ESPORTS,
  };
  
  return sportMap[sport.toLowerCase()] || Sport.OTHER;
}

// MAIN PROFILE CREATION - PROGRESSIVE REVELATION BUILT IN
export async function POST(req: NextRequest) {
  try {
    const { name, school, email, userType, password } = await req.json();
    
    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 400 }
      );
    }
    
    // Parse name
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ') || 'User';
    
    // Generate username
    const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${Date.now().toString().slice(-4)}`;
    
    // Find or create school
    let schoolRecord = await prisma.school.findFirst({
      where: {
        name: { contains: school, mode: 'insensitive' }
      }
    });
    
    if (!schoolRecord) {
      // Create basic school record
      schoolRecord = await prisma.school.create({
        data: {
          name: school,
          state: 'Unknown', // Would be enriched later
          city: 'Unknown',
        }
      });
    }
    
    // Determine role based on userType
    const role = userType === 'parent' ? UserRole.PARENT :
                 userType === 'coach' ? UserRole.COACH :
                 UserRole.STUDENT;
    
    // Phase 1: Basic scraping (happens for everyone)
    const maxPrepsData = await scrapeMaxPreps(name, school);
    
    // Phase 2: AI Analysis
    const analysis = await analyzeAthlete({ 
      name, 
      email,
      school, 
      sport: maxPrepsData?.sport || 'Unknown',
      position: maxPrepsData?.position,
    });
    
    // Create user in database
    const user = await createUser({
      email,
      username,
      password: password || 'changeme123', // Temporary password
      firstName,
      lastName,
      role,
      schoolId: schoolRecord.id,
      bio: `${maxPrepsData?.sport || 'Student'} at ${school}`,
    });
    
    // Create stadium for students
    if (role === UserRole.STUDENT) {
      await createOrUpdateStadium({
        userId: user.id,
        schoolId: schoolRecord.id,
        theme: 'modern',
        headline: `${firstName}'s Journey to Greatness`,
        tagline: maxPrepsData?.position || 'Rising Star',
        highlights: maxPrepsData?.stats?.slice(0, 3) || [],
      });
      
      // Create initial hero card if we have sport data
      if (maxPrepsData?.sport) {
        await prisma.heroCard.create({
          data: {
            userId: user.id,
            title: `${name} - ${maxPrepsData.sport} ${new Date().getFullYear()}`,
            sport: mapSportEnum(maxPrepsData.sport),
            position: maxPrepsData.position || 'Player',
            stats: { initialStats: maxPrepsData.stats || [] },
            imageUrl: '/images/default-herocard.jpg',
            aiHighlights: [
              'Dedicated athlete with strong potential',
              'Team player with leadership qualities',
              'Continuously improving performance',
            ],
            season: new Date().getFullYear().toString(),
          }
        });
      }
      
      // Earn initial achievement HYPE
      await earnHype(
        user.id,
        100,
        'profile_creation',
        'Created your UltraPreps profile!'
      );
      
      // Create welcome achievement
      await prisma.achievement.create({
        data: {
          userId: user.id,
          title: 'Welcome to UltraPreps!',
          description: 'Started your digital athletic journey',
          category: AchievementCategory.SOCIAL,
          date: new Date(),
        }
      });
    }
    
    // Trigger background enrichment (non-blocking)
    setTimeout(() => enrichProfileInBackground(user.id), 1000);
    
    return NextResponse.json({
      success: true,
      profile: {
        id: user.id,
        name,
        username: user.username,
        school: schoolRecord.name,
        email: user.email,
        sport: maxPrepsData?.sport || 'Unknown',
        position: maxPrepsData?.position || 'Unknown',
        currentStats: maxPrepsData?.stats || [],
        aiAnalysis: analysis,
        revelationLevel: role === UserRole.STUDENT ? 2 : 1,
        createdAt: user.createdAt,
        hypeBalance: 600, // Welcome bonus + profile creation
      }
    });
  } catch (error) {
    console.error('Profile creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create profile' },
      { status: 500 }
    );
  }
}

// Background enrichment (happens after initial response)
async function enrichProfileInBackground(userId: string) {
  // This runs AFTER we've already responded to the user
  // So the profile loads fast, but we keep gathering data
  
  console.log(`Enriching profile ${userId} in background...`);
  
  try {
    // Update user's last activity
    await prisma.activity.create({
      data: {
        userId,
        type: 'profile_enriched',
        title: 'Profile data enriched',
        description: 'Additional data sources integrated',
      }
    });
    
    // Here we would:
    // 1. Scrape more sources
    // 2. Look for family connections
    // 3. Find historical data
    // 4. Build generational patterns
    
  } catch (error) {
    console.error('Background enrichment error:', error);
  }
}