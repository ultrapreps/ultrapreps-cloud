import { NextRequest, NextResponse } from 'next/server';
import { SchoolUniverseBot } from '@/lib/bots/SchoolUniverseBot';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    // Check if user is authenticated (optional for initial creation)
    const session = await getServerSession(authOptions);
    
    const { name, city, state, district } = await req.json();
    
    // Validate required fields
    if (!name || !city || !state) {
      return NextResponse.json(
        { error: 'School name, city, and state are required' },
        { status: 400 }
      );
    }
    
    // Initialize SchoolUniverseBot
    const bot = new SchoolUniverseBot();
    
    // Check if school already exists
    const exists = await bot.schoolExists(name);
    if (exists) {
      return NextResponse.json(
        { error: 'School already exists', exists: true },
        { status: 409 }
      );
    }
    
    // Create school universe
    console.log(`🏫 Creating school universe for: ${name}`);
    const { school, spaces, staff } = await bot.createSchoolUniverse({
      name,
      city,
      state,
      district
    });
    
    // Log creation details
    console.log(`✅ School created: ${school.id}`);
    console.log(`   - Mascot: ${school.mascot}`);
    console.log(`   - Colors: ${school.primaryColor} / ${school.secondaryColor}`);
    console.log(`   - Spaces: ${Object.keys(spaces).length} hubs created`);
    console.log(`   - Staff: ${staff.length} placeholder accounts`);
    
    return NextResponse.json({
      success: true,
      school: {
        id: school.id,
        name: school.name,
        nickname: school.nickname,
        mascot: school.mascot,
        colors: {
          primary: school.primaryColor,
          secondary: school.secondaryColor,
          accent: school.accentColor
        },
        location: {
          city: school.city,
          state: school.state,
          district: school.district
        },
        assets: {
          bannerUrl: school.bannerUrl,
          logoUrl: school.logoUrl,
          mascotImageUrl: school.mascotImageUrl
        }
      },
      spaces,
      staff: staff.map(s => ({
        title: s.title,
        department: s.department,
        email: s.email
      }))
    });
    
  } catch (error) {
    console.error('School creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create school universe' },
      { status: 500 }
    );
  }
}

// GET endpoint to search schools
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const city = searchParams.get('city');
    const state = searchParams.get('state');
    const id = searchParams.get('id');
    
    const bot = new SchoolUniverseBot();
    
    // Get specific school by ID
    if (id) {
      const school = await bot.getSchool(id);
      if (!school) {
        return NextResponse.json(
          { error: 'School not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ school });
    }
    
    // Search schools by location
    if (city && state) {
      const schools = await bot.searchSchools(city, state);
      return NextResponse.json({ schools });
    }
    
    return NextResponse.json(
      { error: 'Please provide either school ID or city/state for search' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('School search error:', error);
    return NextResponse.json(
      { error: 'Failed to search schools' },
      { status: 500 }
    );
  }
}