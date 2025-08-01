import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export interface HUDData {
  hype_score: number;
  recent_stats: {
    [sport: string]: Record<string, any>;
  };
  achievements: string[];
  highlight_reels: Array<{
    title: string;
    url: string;
  }>;
  academics: {
    gpa: number;
    honors: string[];
  };
  recruiting: {
    contact: {
      coach_email?: string;
    };
    test_scores: {
      sat?: number;
      act?: number;
    };
  };
  share_actions: {
    share_url: string;
    boost_hype: boolean;
    donate: boolean;
  };
  // Role-specific data
  role_data?: {
    parent_view?: {
      milestones: string[];
      family_giving_enabled: boolean;
    };
    recruiter_view?: {
      full_stats: boolean;
      contact_enabled: boolean;
      academic_details: boolean;
    };
    coach_view?: {
      team_overview: boolean;
      direct_messaging: boolean;
    };
  };
}

export async function GET(
  req: NextRequest,
  { params }: { params: { athleteId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const userRole = session?.user?.role || 'guest';
    
    // Fetch athlete data with relations
    const athlete = await prisma.user.findUnique({
      where: { id: params.athleteId },
      include: {
        school: true,
        heroCards: {
          where: { isActive: true },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        hypeBalance: true,
        achievements: {
          where: { isVerified: true },
          orderBy: { date: 'desc' },
          take: 5,
        },
        stadium: true,
      },
    });

    if (!athlete) {
      return NextResponse.json(
        { error: 'Athlete not found' },
        { status: 404 }
      );
    }

    // Get current HeroCard
    const currentHeroCard = athlete.heroCards[0];
    
    // Calculate total HYPE (free + paid)
    const totalHype = (athlete.hypeBalance?.freeHype || 0) + 
                     (athlete.hypeBalance?.paidHype || 0);

    // Build HUD data with role-based filtering
    const hudData: HUDData = {
      hype_score: totalHype,
      recent_stats: currentHeroCard?.stats as any || {},
      achievements: athlete.achievements.map(a => a.title),
      highlight_reels: [], // TODO: Implement media fetching
      academics: {
        gpa: 3.7, // TODO: Fetch from academic records
        honors: ['NHS', 'Honor Roll'], // TODO: Fetch from achievements
      },
      recruiting: {
        contact: {
          coach_email: userRole === 'COLLEGE_SCOUT' ? 'coach@school.edu' : undefined,
        },
        test_scores: {
          sat: userRole === 'COLLEGE_SCOUT' ? 1300 : undefined,
          act: userRole === 'COLLEGE_SCOUT' ? 28 : undefined,
        },
      },
      share_actions: {
        share_url: `${process.env.NEXTAUTH_URL}/athlete/${athlete.username}`,
        boost_hype: true,
        donate: athlete.school?.id ? true : false,
      },
    };

    // Add role-specific data
    switch (userRole) {
      case 'PARENT':
        hudData.role_data = {
          parent_view: {
            milestones: athlete.achievements.map(a => 
              `${a.title} - ${new Date(a.date).toLocaleDateString()}`
            ),
            family_giving_enabled: true,
          },
        };
        break;
      
      case 'COLLEGE_SCOUT':
        hudData.role_data = {
          recruiter_view: {
            full_stats: true,
            contact_enabled: true,
            academic_details: true,
          },
        };
        break;
      
      case 'COACH':
        hudData.role_data = {
          coach_view: {
            team_overview: true,
            direct_messaging: true,
          },
        };
        break;
    }

    // Set cache headers for performance
    return NextResponse.json(hudData, {
      headers: {
        'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
      },
    });

  } catch (error) {
    console.error('HUD API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch HUD data' },
      { status: 500 }
    );
  }
}

// POST endpoint for updating HYPE
export async function POST(
  req: NextRequest,
  { params }: { params: { athleteId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { action, amount } = await req.json();

    if (action === 'boost_hype') {
      // Create HYPE event
      const hypeEvent = await prisma.hypeEvent.create({
        data: {
          fromUserId: session.user.id,
          toUserId: params.athleteId,
          type: 'GIFTED',
          amount: amount || 10,
          category: 'boost',
          description: `Boosted by ${session.user.name}`,
        },
      });

      // Update recipient's balance
      await prisma.hypeBalance.upsert({
        where: { userId: params.athleteId },
        create: {
          userId: params.athleteId,
          freeHype: amount || 10,
        },
        update: {
          freeHype: { increment: amount || 10 },
          totalEarned: { increment: amount || 10 },
        },
      });

      // Emit WebSocket event (this will be handled by the socket server)
      // For now, just return success
      return NextResponse.json({
        success: true,
        message: 'HYPE sent successfully',
        amount: amount || 10,
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('HUD POST Error:', error);
    return NextResponse.json(
      { error: 'Failed to process action' },
      { status: 500 }
    );
  }
}