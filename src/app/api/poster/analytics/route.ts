import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const timeframe = searchParams.get('timeframe') || '7d';
    const schoolId = searchParams.get('schoolId');
    const userId = searchParams.get('userId') || session?.user?.id;
    
    // Calculate date range
    const now = new Date();
    let startDate = new Date();
    
    switch (timeframe) {
      case '24h':
        startDate.setHours(now.getHours() - 24);
        break;
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      case 'all':
        startDate = new Date(0);
        break;
    }
    
    // Build where clause
    const where: any = {
      createdAt: { gte: startDate }
    };
    
    if (userId) where.userId = userId;
    
    // Get poster statistics
    const [
      totalPosters,
      totalShares,
      postersByType,
      topPosters,
      engagementTimeline,
      userStats
    ] = await Promise.all([
      // Total posters created
      prisma.poster.count({ where }),
      
      // Total shares
      prisma.poster.aggregate({
        where,
        _sum: {
          shares: true
        }
      }),
      
      // Posters by type
      prisma.poster.groupBy({
        by: ['type'],
        where,
        _count: { type: true }
      }),
      
      // Top performing posters
      prisma.poster.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              username: true,
              firstName: true,
              lastName: true,
              image: true
            }
          }
        },
        orderBy: {
          shares: 'desc'
        },
        take: 10
      }),
      
      // Engagement timeline - simplified for now
      [],
      
      // Top users - instead of schools
      prisma.user.findMany({
        where: {
          posters: {
            some: {
              createdAt: { gte: startDate }
            }
          }
        },
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          image: true,
          _count: {
            select: {
              posters: {
                where: {
                  createdAt: { gte: startDate }
                }
              }
            }
          }
        },
        orderBy: {
          posters: {
            _count: 'desc'
          }
        },
        take: 5
      })
    ]);
    
    // Calculate engagement metrics
    const totalSharesCount = totalShares._sum.shares || 0;
    const avgSharesPerPoster = totalPosters > 0 ? totalSharesCount / totalPosters : 0;
    
    // Format response
    const analytics = {
      timeframe,
      dateRange: {
        start: startDate,
        end: now
      },
      overview: {
        totalPosters,
        totalShares: totalSharesCount,
        avgSharesPerPoster: avgSharesPerPoster.toFixed(2)
      },
      postersByType: postersByType.reduce((acc, item) => ({
        ...acc,
        [item.type.toLowerCase()]: item._count.type
      }), {}),
      topPosters: topPosters.map(poster => ({
        id: poster.id,
        type: poster.type,
        title: poster.title,
        createdBy: poster.user,
        shares: poster.shares,
        imageUrl: poster.imageUrl,
        createdAt: poster.createdAt
      })),
      engagementTimeline,
      topUsers: userStats
    };
    
    return NextResponse.json(analytics);
    
  } catch (error) {
    console.error('Analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to get analytics' },
      { status: 500 }
    );
  }
}

// POST endpoint to track poster engagement
export async function POST(req: NextRequest) {
  try {
    const { posterId, action, metadata } = await req.json();
    
    if (!posterId || !action) {
      return NextResponse.json(
        { error: 'Poster ID and action are required' },
        { status: 400 }
      );
    }
    
    // Validate poster exists
    const poster = await prisma.poster.findUnique({
      where: { id: posterId }
    });
    
    if (!poster) {
      return NextResponse.json(
        { error: 'Poster not found' },
        { status: 404 }
      );
    }
    
    // Track engagement based on action
    switch (action) {
      case 'view':
        await prisma.poster.update({
          where: { id: posterId },
          data: {
            views: { increment: 1 }
          }
        });
        break;
        
      case 'download':
        await prisma.poster.update({
          where: { id: posterId },
          data: {
            downloads: { increment: 1 }
          }
        });
        break;
        
      case 'like':
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
          return NextResponse.json(
            { error: 'Must be logged in to like' },
            { status: 401 }
          );
        }
        
                // For now, just log the like action
        console.log(`User ${session.user.id} liked poster ${posterId}`);
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
    
    // Log engagement event
    console.log(`📊 Poster ${posterId} - ${action} recorded`);
    
    return NextResponse.json({
      success: true,
      action,
      posterId
    });
    
  } catch (error) {
    console.error('Engagement tracking error:', error);
    return NextResponse.json(
      { error: 'Failed to track engagement' },
      { status: 500 }
    );
  }
}