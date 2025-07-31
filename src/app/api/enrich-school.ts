import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { athleteName, school, classYear, selfie } = await req.json();

  // Compose a DNA-exact OpenAI prompt referencing atomicdna.md and visual DNA gallery
  const prompt = `You are UltraPreps HeroCard Generator. Using the UltraPreps Atomic DNA and Visual DNA system (see below), generate a complete JSON object for a cinematic HeroCard for the following athlete. If a selfie is provided, use it; if not, generate avatar mode per DNA rules. All fields must be filled using your world knowledge and best guess if not known. Return all fields needed for a DNA-exact HeroCard, including mascot, schoolColors, roles, stats, hypeScore, overlays, and avatarMode if no selfie. Log this completion as the chain-of-custody source.\n\nAthlete Name: ${athleteName}\nSchool: ${school}\nClass Year: ${classYear}\nSelfie Provided: ${!!selfie}\n\nUltraPreps Atomic DNA/Visual DNA Rules:\n${await getAtomicDnaSummary()}\n\nReturn format:\n{\n  "athleteName": "...",\n  "school": "...",\n  "classYear": "...",\n  "mascot": "...",\n  "schoolColors": ["#RRGGBB", "#RRGGBB"],\n  "roles": [ { "type": "...", "position": "...", "stats": { ... } } ],\n  "hypeScore": 0-100,\n  "overlays": [ ... ],\n  "avatarMode": true/false,\n  "chainOfCustody": "OpenAI GPT-4o completion, timestamp: ${new Date().toISOString()}"\n}`;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 });
  }

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
    return NextResponse.json({ error: err }, { status: 500 });
  }

  const data = await openaiRes.json();
  let heroCard = null;
  try {
    heroCard = JSON.parse(data.choices[0].message.content);
  } catch {
    return NextResponse.json({ error: 'OpenAI returned invalid JSON.' }, { status: 500 });
  }
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