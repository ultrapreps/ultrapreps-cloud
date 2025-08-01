import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import * as cheerio from 'cheerio';

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

// MAIN PROFILE CREATION - PROGRESSIVE REVELATION BUILT IN
export async function POST(req: NextRequest) {
  const { name, school, email, userType } = await req.json();
  
  // Determine revelation level based on user type
  const revelationLevel = userType === 'athlete' ? 1 : 2;
  
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
  
  // Phase 3: Create initial profile with limited data
  const profile = {
    id: Date.now().toString(),
    name,
    school,
    email,
    sport: maxPrepsData?.sport || 'Unknown',
    position: maxPrepsData?.position || 'Unknown',
    currentStats: revelationLevel >= 1 ? maxPrepsData?.stats : [],
    aiAnalysis: revelationLevel >= 2 ? analysis : null,
    revelationLevel,
    createdAt: new Date().toISOString(),
    // Hidden data (we collect but don't show yet)
    _hiddenData: {
      familyConnections: [], // Will populate in background
      historicalStats: [],   // Will populate in background
      generationalData: []   // Will populate in background
    }
  };
  
  // Store in database (using in-memory for MVP)
  // In production, this would be PostgreSQL
  // For now, we'll just return the profile
  console.log('Profile created:', profile);
  
  // Trigger background enrichment (non-blocking)
  setTimeout(() => enrichProfileInBackground(profile.id), 1000);
  
  return NextResponse.json({
    success: true,
    profile: {
      ...profile,
      _hiddenData: undefined // Don't send hidden data to client
    }
  });
}

// Background enrichment (happens after initial response)
async function enrichProfileInBackground(profileId: string) {
  // This runs AFTER we've already responded to the user
  // So the profile loads fast, but we keep gathering data
  
  console.log(`Enriching profile ${profileId} in background...`);
  
  // Here we would:
  // 1. Scrape more sources
  // 2. Look for family connections
  // 3. Find historical data
  // 4. Build generational patterns
  
  // But we do it AFTER the user already has their profile
}