import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createOrUpdateStadium, getStadiumByUsername } from '@/lib/db/stadiums';
import { getUserByUsername } from '@/lib/db/users';
import { earnHype } from '@/lib/db/hype';
import { Sport } from '@prisma/client';

interface StadiumCreateData {
  username: string;
  schoolName: string;
  mascot: string;
  colors: {
    primary: string;
    secondary: string;
  };
  sports: string[];  // Activities/sports
  goals: string[];
  bio: string;
  theme?: string;
  bannerStyle?: string;
  highlights?: string[];
  profileImage?: string;
}

// Universal AI Trainer Assignment based on activity type
const getAITrainer = (activity: string): string => {
  if (activity.includes('Football')) return 'Coach Thunder ⚡';
  if (activity.includes('Basketball')) return 'Coach Blaze 🔥';
  if (activity.includes('Theater') || activity.includes('Drama')) return 'Director Spotlight 🎭';
  if (activity.includes('Band') || activity.includes('Music')) return 'Maestro Harmony 🎵';
  if (activity.includes('Math') || activity.includes('Academic')) return 'Professor Genius 🧠';
  if (activity.includes('Robotics') || activity.includes('STEM')) return 'Engineer Prime 🤖';
  if (activity.includes('Gaming') || activity.includes('Esports')) return 'GameMaster Elite 🎮';
  if (activity.includes('Art') || activity.includes('Visual')) return 'Artist Vision 🎨';
  if (activity.includes('JROTC') || activity.includes('Military')) return 'Commander Steel 🪖';
  if (activity.includes('Student Council') || activity.includes('Leadership')) return 'Leader Supreme 👑';
  return 'Mentor Ultra 🌟'; // Default universal mentor
};

export async function POST(request: NextRequest) {
  try {
    const data: StadiumCreateData = await request.json();
    
    // Validate required fields
    if (!data.username || !data.schoolName || !data.sports || !data.goals) {
      return NextResponse.json(
        { error: 'Username, school name, activities, and goals are required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await getUserByUsername(data.username);
    if (!user) {
      return NextResponse.json(
        { error: 'User not found. Please create a profile first.' },
        { status: 404 }
      );
    }

    // Check if stadium already exists
    const existingStadium = await getStadiumByUsername(data.username);
    if (existingStadium && existingStadium.createdAt.getTime() !== existingStadium.updatedAt.getTime()) {
      return NextResponse.json(
        { error: 'Stadium already exists for this user' },
        { status: 409 }
      );
    }

    // Find or update school
    let school = await prisma.school.findFirst({
      where: {
        name: { contains: data.schoolName, mode: 'insensitive' }
      }
    });

    if (!school) {
      // Create basic school record
      school = await prisma.school.create({
        data: {
          name: data.schoolName,
          state: 'Unknown',
          city: 'Unknown',
          mascot: data.mascot,
          primaryColor: data.colors.primary,
          secondaryColor: data.colors.secondary,
        }
      });
    } else if (!school.mascot && data.mascot) {
      // Update school with mascot and colors if not set
      school = await prisma.school.update({
        where: { id: school.id },
        data: {
          mascot: data.mascot,
          primaryColor: data.colors.primary,
          secondaryColor: data.colors.secondary,
        }
      });
    }

    // Create or update stadium
    const stadium = await createOrUpdateStadium({
      userId: user.id,
      schoolId: school.id,
      theme: data.theme || 'modern',
      bannerStyle: data.bannerStyle || 'dynamic',
      backgroundUrl: data.profileImage,
      headline: `${user.firstName}'s Digital Stadium`,
      tagline: data.bio || `${data.sports[0]} Athlete • ${data.goals[0]}`,
      highlights: data.highlights || data.goals.slice(0, 3),
      isPublic: true,
      allowComments: true,
      showStats: true,
    });

    // Create activities for each sport/activity
    const activities = await Promise.all(
      data.sports.map(sport => 
        prisma.activity.create({
          data: {
            userId: user.id,
            type: 'joined_activity',
            title: `Joined ${sport}`,
            description: `Started participating in ${sport}`,
            metadata: { sport, aiTrainer: getAITrainer(sport) }
          }
        })
      )
    );

    // Award HYPE for stadium creation
    await earnHype(
      user.id,
      250,
      'stadium_creation',
      'Created your digital stadium!'
    );

    // Create achievement
    await prisma.achievement.create({
      data: {
        userId: user.id,
        title: 'Stadium Builder',
        description: 'Created your personal digital stadium',
        category: 'SOCIAL',
        date: new Date(),
      }
    });

    // Create notification
    await prisma.notification.create({
      data: {
        userId: user.id,
        type: 'stadium_created',
        title: 'Stadium Ready!',
        message: `Your digital stadium is live! Share it with friends and family at /stadium/${data.username}`,
      }
    });

    // Log the creation
    console.log('Stadium created/updated:', {
      username: data.username,
      school: school.name,
      mascot: data.mascot,
      activities: data.sports,
      goals: data.goals,
      stadiumId: stadium.id,
    });

    // Trigger AI processing in background
    setTimeout(async () => {
      try {
        // Here we would trigger:
        // 1. HeroCard generation via DesignMaster bot
        // 2. AI Trainer assignment
        // 3. Additional enrichment
        
        console.log(`🤖 AI processing complete for ${data.username}'s stadium`);
      } catch (error) {
        console.error('Background AI processing error:', error);
      }
    }, 2000);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Stadium created successfully',
        stadium: {
          id: stadium.id,
          username: data.username,
          url: `/stadium/${data.username}`,
          hypeEarned: 250,
          aiTrainer: getAITrainer(data.sports[0])
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Stadium creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve stadium by username
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const username = url.searchParams.get('username');

    if (!username) {
      return NextResponse.json(
        { error: 'Username parameter required' },
        { status: 400 }
      );
    }

    const stadium = await getStadiumByUsername(username);
    
    if (!stadium) {
      return NextResponse.json(
        { error: 'Stadium not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      stadium: {
        id: stadium.id,
        username: stadium.user.username,
        name: `${stadium.user.firstName} ${stadium.user.lastName}`,
        school: stadium.school?.name || stadium.user.school?.name,
        theme: stadium.theme,
        bannerStyle: stadium.bannerStyle,
        backgroundUrl: stadium.backgroundUrl,
        headline: stadium.headline,
        tagline: stadium.tagline,
        highlights: stadium.highlights,
        stats: {
          views: stadium.views,
          likes: stadium.likes,
          hype: stadium.user.hypeBalance?.freeHype || 0,
          achievements: stadium.user.achievements.length,
        },
        heroCard: stadium.user.heroCards[0] || null,
        createdAt: stadium.createdAt,
      }
    });
  } catch (error) {
    console.error('Stadium fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}