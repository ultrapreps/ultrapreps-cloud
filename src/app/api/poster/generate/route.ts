import { NextRequest, NextResponse } from 'next/server';
import { PosterGenerator } from '@/lib/ai/PosterGenerator';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { PosterType } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    // Check authentication (optional for demo)
    const session = await getServerSession(authOptions);
    
    const { 
      type, 
      schoolId, 
      title, 
      subtitle, 
      mainText,
      date,
      players,
      stats,
      customPrompt 
    } = await req.json();
    
    // Validate required fields
    if (!type || !schoolId || !title) {
      return NextResponse.json(
        { error: 'Type, school ID, and title are required' },
        { status: 400 }
      );
    }
    
    // Fetch school data
    const school = await prisma.school.findUnique({
      where: { id: schoolId }
    });
    
    if (!school) {
      return NextResponse.json(
        { error: 'School not found' },
        { status: 404 }
      );
    }
    
    // Initialize PosterGenerator
    const generator = new PosterGenerator();
    
    // Generate poster
    console.log(`🎨 Generating ${type} poster for ${school.name}`);
    const poster = await generator.generatePoster({
      type,
      school,
      title,
      subtitle,
      mainText,
      date: date ? new Date(date) : undefined,
      players,
      stats,
      customPrompt
    });
    
    // Log generation
    console.log(`✅ Poster generated: ${poster.id}`);
    console.log(`   - Type: ${poster.type}`);
    console.log(`   - Validation Score: ${(poster.validationScore || 0) * 100}%`);
    
    return NextResponse.json({
      success: true,
      poster: {
        id: poster.id,
        url: poster.url,
        type: poster.type,
        metadata: poster.metadata,
        validationScore: poster.validationScore,
        createdAt: poster.createdAt
      }
    });
    
  } catch (error) {
    console.error('Poster generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate poster' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve poster templates
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action');
  
  // List user's posters
  if (action === 'list') {
    try {
      const session = await getServerSession(authOptions);
      const userId = searchParams.get('userId') || session?.user?.id;
      const type = searchParams.get('type');
      const limit = parseInt(searchParams.get('limit') || '20');
      const offset = parseInt(searchParams.get('offset') || '0');
      
      const where: any = {};
      if (userId) where.userId = userId;
      if (type) where.type = type.toUpperCase() as PosterType;
      
      const [posters, total] = await Promise.all([
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
          orderBy: { createdAt: 'desc' },
          take: limit,
          skip: offset
        }),
        prisma.poster.count({ where })
      ]);
      
      return NextResponse.json({
        posters,
        total,
        limit,
        offset,
        hasMore: offset + limit < total
      });
    } catch (error) {
      console.error('Error listing posters:', error);
      return NextResponse.json(
        { error: 'Failed to list posters' },
        { status: 500 }
      );
    }
  }
  
  // Get poster statistics
  if (action === 'stats') {
    try {
      const session = await getServerSession(authOptions);
      const userId = searchParams.get('userId') || session?.user?.id;
      
      const stats = await prisma.poster.groupBy({
        by: ['type'],
        where: userId ? { userId } : {},
        _count: true
      });
      
      const totalPosters = await prisma.poster.count({
        where: userId ? { userId } : {}
      });
      
      return NextResponse.json({
        total: totalPosters,
        byType: stats.reduce((acc, stat) => ({
          ...acc,
          [stat.type.toLowerCase()]: stat._count
        }), {}),
        userId
      });
    } catch (error) {
      console.error('Error getting poster stats:', error);
      return NextResponse.json(
        { error: 'Failed to get poster statistics' },
        { status: 500 }
      );
    }
  }
  
  // Default: get templates
  const generator = new PosterGenerator();
  const templates = generator.getTemplates();
  
  return NextResponse.json({
    templates,
    count: templates.length
  });
}

// DELETE endpoint to remove a poster
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(req.url);
    const posterId = searchParams.get('id');
    
    if (!posterId) {
      return NextResponse.json(
        { error: 'Poster ID is required' },
        { status: 400 }
      );
    }
    
    // Check if user owns the poster
    const poster = await prisma.poster.findUnique({
      where: { id: posterId }
    });
    
    if (!poster) {
      return NextResponse.json(
        { error: 'Poster not found' },
        { status: 404 }
      );
    }
    
    if (poster.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'You can only delete your own posters' },
        { status: 403 }
      );
    }
    
    // Delete the poster
    await prisma.poster.delete({
      where: { id: posterId }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Poster deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting poster:', error);
    return NextResponse.json(
      { error: 'Failed to delete poster' },
      { status: 500 }
    );
  }
}