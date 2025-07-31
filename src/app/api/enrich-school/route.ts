import { NextRequest, NextResponse } from 'next/server';
import { CrawlerBot } from '../../../bots/CrawlerBot';
import { aggregateStats } from '../../../bots/StatsBot';
import { blendSelfie } from '../../../bots/SelfieEngine';

export async function POST(req: NextRequest) {
  console.log('🚀 HeroCard API called');
  const { athleteName, school, classYear, selfie } = await req.json();
  console.log('📝 Request data:', { athleteName, school, classYear, hasSelfie: !!selfie });

  // Fetch real athlete stats and image
  let athleteStats = null;
  let aggregatedStats = null;
  let blendedSelfieUrl = undefined;
  try {
    console.log('🤖 Calling universal bots...');
    
    // Research and fetch student profile using universal CrawlerBot
    const crawlerBot = new CrawlerBot();
    const baseStats = await crawlerBot.fetchStudentProfile(athleteName);
    
    // Convert StudentProfile to legacy AthleteStats format for compatibility
    const legacyStats = {
      height: baseStats.stats?.gpa || '',
      weight: baseStats.stats?.volunteerHours || '',
      position: baseStats.activities?.[0] || '',
      stats: baseStats.achievements || [],
      achievements: baseStats.roles || [],
      imageUrl: baseStats.imageUrl
    };
    
    athleteStats = legacyStats;
    console.log('✅ CrawlerBot result:', athleteStats);
    
    // Aggregate with additional stats
    aggregatedStats = await aggregateStats(athleteName);
    console.log('✅ StatsBot result:', aggregatedStats);
    
    blendedSelfieUrl = await blendSelfie(selfie, athleteStats?.imageUrl);
    console.log('✅ SelfieEngine result:', blendedSelfieUrl);
  } catch (e) {
    console.log('⚠️ Bot error (will fallback to OpenAI):', e);
    // fallback: ignore errors, let OpenAI fill in gaps
  }

  // Compose a DNA-exact OpenAI prompt referencing atomicdna.md and visual DNA gallery, injecting bot data
  const prompt = `You are UltraPreps HeroCard Generator. Generate a realistic, cinematic HeroCard for a HIGH SCHOOL athlete using verified data sources and realistic athletic statistics. Follow UltraPreps Atomic DNA specifications exactly.

ATHLETE INFO:
Name: ${athleteName}
School: ${school}  
Class Year: ${classYear}
Selfie Provided: ${!!selfie}

CRITICAL REQUIREMENTS:
1. Use REALISTIC high school athlete stats (not college/pro numbers)
2. School mascot must be authentic to the region/state
3. School colors must be realistic team colors  
4. Stats must be age-appropriate for class year
5. Hype score should reflect realistic high school achievement level

REALISTIC STAT RANGES:
Football: rushing yards (800-1500/season), passing yards (1200-2800/season), touchdowns (8-25/season)
Basketball: points per game (8-25), assists (2-8), rebounds (3-12) 
Baseball: batting avg (.250-.450), RBIs (15-45/season), home runs (2-12/season)
Include: height (5'8"-6'4"), weight (140-250 lbs), jersey number (1-99)

BOT DATA (use if available):
${JSON.stringify({ athleteStats, aggregatedStats, blendedSelfieUrl })}

UltraPreps Atomic DNA Rules:
${await getAtomicDnaSummary()}

Return ONLY valid JSON:
{
  "athleteName": "${athleteName}",
  "school": "Full School Name (realistic for location)",
  "classYear": "${classYear}",
  "mascot": "Realistic mascot for region",
  "schoolColors": ["#PRIMARY", "#SECONDARY"],
  "roles": [
    {
      "type": "Primary Sport", 
      "position": "Specific Position",
      "stats": {
        "height": "5'10\"",
        "weight": "175 lbs", 
        "number": 12,
        "realistic_stat_1": realistic_value,
        "realistic_stat_2": realistic_value
      }
    }
  ],
  "hypeScore": 65-95,
  "overlays": ["Hype Wheel", "Stat Blocks", "Role Stacking"],
  "avatarMode": ${!selfie},
  "chainOfCustody": "OpenAI GPT-4o completion, timestamp: ${new Date().toISOString()}"
}`;

  console.log('🔑 Checking OpenAI API key...');
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.log('❌ Missing OpenAI API key');
    return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 });
  }
  console.log('✅ OpenAI API key found');

  console.log('🧠 Calling OpenAI...');
  const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are an expert in US high school sports, branding, and atomic design.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1200,
      temperature: 0.2,
    }),
  });

  if (!openaiRes.ok) {
    const err = await openaiRes.text();
    console.log('❌ OpenAI API error:', openaiRes.status, err);
    return NextResponse.json({ error: `OpenAI API error: ${err}` }, { status: 500 });
  }

  const data = await openaiRes.json();
  console.log('✅ OpenAI response received');
  console.log('📄 Raw OpenAI content:', data.choices[0]?.message?.content);
  
  let heroCard = null;
  try {
    let content = data.choices[0].message.content;
    
    // Strip markdown code blocks if present
    if (content.includes('```json')) {
      content = content.replace(/```json\s*/, '').replace(/```\s*$/, '');
    } else if (content.includes('```')) {
      content = content.replace(/```\s*/, '').replace(/```\s*$/, '');
    }
    
    heroCard = JSON.parse(content);

    // --- DNA Validation & Correction ---
    function isHexColor(str: string) {
      return /^#[0-9A-Fa-f]{6}$/.test(str);
    }
    const dnaMascots = [
      'Chaparrals', 'Mustangs', 'Tigers', 'Eagles', 'Lions', 'Bulldogs', 'Panthers', 'Wildcats', 'Warriors', 'Cougars', 'Knights', 'Vikings', 'Patriots', 'Spartans', 'Hawks', 'Falcons', 'Bears', 'Rangers', 'Raiders', 'Wolves'
    ];
    // const dnaColorPalette = ['#1E3A8A', '#F59E0B', '#F97316', '#111827', '#FFFFFF']; // Reserved for future use

    // --- STRICT REAL STATS ENFORCEMENT ---
    // If bots did not return real stats, only allow position/role, no stats
    let botsReturnedStats = false;
    if (athleteStats && athleteStats.stats && Object.keys(athleteStats.stats).length > 0) {
      botsReturnedStats = true;
    } else if (aggregatedStats && Object.keys(aggregatedStats).length > 0) {
      botsReturnedStats = true;
    }
    type HeroCardRole = { type: string; position: string; stats?: Record<string, unknown>; };
    heroCard.roles = heroCard.roles.map((role: HeroCardRole) => {
      if (!botsReturnedStats) {
        // Only allow type and position, no stats
        return {
          type: role.type,
          position: role.position,
        };
      } else {
        // If bots returned stats, keep them
        if (!role.stats) role.stats = {};
        // Optionally, you could cross-check here with athleteStats/aggregatedStats for even stricter enforcement
        return role;
      }
    });
    // --- END STRICT REAL STATS ENFORCEMENT ---

    // Validate mascot
    if (!heroCard.mascot || !dnaMascots.includes(heroCard.mascot)) {
      return NextResponse.json({ error: 'Invalid or missing mascot per DNA rules.' }, { status: 400 });
    }
    // Validate school colors
    if (!Array.isArray(heroCard.schoolColors) || heroCard.schoolColors.length !== 2 || !heroCard.schoolColors.every(isHexColor)) {
      return NextResponse.json({ error: 'Invalid or missing school colors per DNA rules.' }, { status: 400 });
    }
    // Validate overlays
    if (!Array.isArray(heroCard.overlays) || heroCard.overlays.length === 0) {
      heroCard.overlays = ['Hype Wheel', 'Stat Blocks', 'Role Stacking'];
    }
    // Validate hypeScore
    if (typeof heroCard.hypeScore !== 'number' || heroCard.hypeScore < 0 || heroCard.hypeScore > 100) {
      heroCard.hypeScore = Math.max(0, Math.min(100, Number(heroCard.hypeScore) || 75));
    }
    // Validate roles and stats (already handled above)
    if (!Array.isArray(heroCard.roles) || heroCard.roles.length === 0) {
      return NextResponse.json({ error: 'Missing roles per DNA rules.' }, { status: 400 });
    }
    // Avatar mode enforcement
    if (heroCard.avatarMode === undefined) {
      heroCard.avatarMode = !Boolean(heroCard.selfie);
    }
    // Chain of custody
    if (!heroCard.chainOfCustody) {
      heroCard.chainOfCustody = `OpenAI GPT-4o completion, timestamp: ${new Date().toISOString()}`;
    }
    // Final DNA check: block if any required field is still missing
    const requiredFields = ['athleteName', 'school', 'classYear', 'mascot', 'schoolColors', 'roles', 'hypeScore', 'overlays', 'avatarMode', 'chainOfCustody'];
    for (const field of requiredFields) {
      if (heroCard[field] === undefined || heroCard[field] === null || heroCard[field] === '') {
        return NextResponse.json({ error: `Missing required field: ${field} per DNA rules.` }, { status: 400 });
      }
    }
    // --- END DNA Validation ---
    console.log('✅ HeroCard DNA validation/correction complete:', heroCard);
  } catch (parseError) {
    console.log('❌ Failed to parse OpenAI JSON:', parseError);
    console.log('Raw content was:', data.choices[0]?.message?.content);
    return NextResponse.json({ error: 'OpenAI returned invalid JSON.' }, { status: 500 });
  }
  
  console.log('🎉 Returning HeroCard to frontend');
  return NextResponse.json(heroCard);
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