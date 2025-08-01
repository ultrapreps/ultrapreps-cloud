import { NextRequest, NextResponse } from 'next/server';
import { MascotEngine } from '@/lib/bots/MascotEngine';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { schoolId } = await req.json();
    
    if (!schoolId) {
      return NextResponse.json(
        { error: 'School ID is required' },
        { status: 400 }
      );
    }
    
    // Get school data
    let school = await prisma.school.findUnique({
      where: { id: schoolId }
    });
    
    // Demo fallback for testing
    if (!school && schoolId.startsWith('demo-')) {
      const demoSchools: Record<string, any> = {
        'demo-1': {
          id: 'demo-1',
          name: 'Marble Falls High School',
          city: 'Marble Falls',
          state: 'Texas',
          mascot: 'Mustangs',
          nickname: 'Marble Falls Mustangs',
          primaryColor: '#B91C1C',
          secondaryColor: '#F59E0B',
          accentColor: '#3B82F6'
        },
        'demo-2': {
          id: 'demo-2',
          name: 'Austin High School',
          city: 'Austin',
          state: 'Texas',
          mascot: 'Eagles',
          nickname: 'Austin Eagles',
          primaryColor: '#1E3A8A',
          secondaryColor: '#FFFFFF',
          accentColor: '#F59E0B'
        },
        'demo-3': {
          id: 'demo-3',
          name: 'North Dallas High School',
          city: 'Dallas',
          state: 'Texas',
          mascot: 'Bulldogs',
          nickname: 'North Dallas Bulldogs',
          primaryColor: '#991B1B',
          secondaryColor: '#FFFFFF',
          accentColor: '#F59E0B'
        },
        'demo-4': {
          id: 'demo-4',
          name: 'Memorial High School',
          city: 'Houston',
          state: 'Texas',
          mascot: 'Patriots',
          nickname: 'Memorial Patriots',
          primaryColor: '#1E3A8A',
          secondaryColor: '#DC2626',
          accentColor: '#FFFFFF'
        },
        'demo-5': {
          id: 'demo-5',
          name: 'Central High School',
          city: 'San Antonio',
          state: 'Texas',
          mascot: 'Lions',
          nickname: 'Central Lions',
          primaryColor: '#F59E0B',
          secondaryColor: '#1F2937',
          accentColor: '#DC2626'
        }
      };
      
      school = demoSchools[schoolId];
    }
    
    if (!school) {
      return NextResponse.json(
        { error: 'School not found' },
        { status: 404 }
      );
    }
    
    // Initialize MascotEngine
    const engine = new MascotEngine();
    
    // Create mascot identity
    console.log(`🎭 Creating mascot for ${school.name}`);
    const mascotIdentity = await engine.createMascotIdentity(school);
    
    // Generate sample dialogue
    const welcomeMessage = await engine.generateMascotDialogue(
      mascotIdentity, 
      'welcome'
    );
    
    return NextResponse.json({
      success: true,
      mascot: mascotIdentity,
      sampleDialogue: {
        welcome: welcomeMessage,
        victory: await engine.generateMascotDialogue(mascotIdentity, 'victory'),
        encouragement: await engine.generateMascotDialogue(mascotIdentity, 'encouragement'),
        achievement: await engine.generateMascotDialogue(mascotIdentity, 'achievement')
      }
    });
    
  } catch (error) {
    console.error('Mascot creation error:', error);
    return NextResponse.json(
      { error: 'Failed to create mascot identity' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve mascot by school ID
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const schoolId = searchParams.get('schoolId');
    
    if (!schoolId) {
      return NextResponse.json(
        { error: 'School ID is required' },
        { status: 400 }
      );
    }
    
    // In production, this would fetch from a MascotIdentity table
    // For now, we'll generate it on demand
    const school = await prisma.school.findUnique({
      where: { id: schoolId }
    });
    
    if (!school) {
      return NextResponse.json(
        { error: 'School not found' },
        { status: 404 }
      );
    }
    
    const engine = new MascotEngine();
    const mascotIdentity = await engine.createMascotIdentity(school);
    
    return NextResponse.json({ mascot: mascotIdentity });
    
  } catch (error) {
    console.error('Mascot retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve mascot' },
      { status: 500 }
    );
  }
}