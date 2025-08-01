import { NextRequest, NextResponse } from 'next/server';
import { PosterGenerator } from '@/lib/ai/PosterGenerator';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface BatchPosterRequest {
  type: string;
  schoolId: string;
  title: string;
  subtitle?: string;
  customData?: any;
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { requests, options } = await req.json();
    
    if (!Array.isArray(requests) || requests.length === 0) {
      return NextResponse.json(
        { error: 'Requests array is required' },
        { status: 400 }
      );
    }
    
    if (requests.length > 10) {
      return NextResponse.json(
        { error: 'Maximum 10 posters per batch' },
        { status: 400 }
      );
    }
    
    // Validate all requests first
    const schoolIds = [...new Set(requests.map(r => r.schoolId))];
    const schools = await prisma.school.findMany({
      where: { id: { in: schoolIds } }
    });
    
    const schoolMap = new Map(schools.map(s => [s.id, s]));
    
    for (const request of requests) {
      if (!schoolMap.has(request.schoolId)) {
        return NextResponse.json(
          { error: `School not found: ${request.schoolId}` },
          { status: 404 }
        );
      }
    }
    
    // Generate posters in parallel
    const generator = new PosterGenerator();
    const results = await Promise.allSettled(
      requests.map(async (request) => {
        const school = schoolMap.get(request.schoolId)!;
        
        console.log(`🎨 Batch generating ${request.type} poster for ${school.name}`);
        
        return generator.generatePoster({
          type: request.type as any,
          school,
          title: request.title,
          subtitle: request.subtitle,
          ...request.customData
        });
      })
    );
    
    // Process results
    const successful = [];
    const failed = [];
    
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const request = requests[i];
      
      if (result.status === 'fulfilled') {
        successful.push({
          request,
          poster: result.value
        });
      } else {
        failed.push({
          request,
          error: result.reason?.message || 'Unknown error'
        });
      }
    }
    
    console.log(`✅ Batch complete: ${successful.length} successful, ${failed.length} failed`);
    
    return NextResponse.json({
      success: true,
      total: requests.length,
      successful: successful.length,
      failed: failed.length,
      results: {
        successful,
        failed
      }
    });
    
  } catch (error) {
    console.error('Batch poster generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate batch posters' },
      { status: 500 }
    );
  }
}

// GET endpoint to check batch generation status
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { searchParams } = new URL(req.url);
    const batchId = searchParams.get('batchId');
    
    // In a real implementation, you would track batch jobs
    // For now, return a mock response
    return NextResponse.json({
      batchId,
      status: 'completed',
      progress: 100,
      message: 'Batch generation completed'
    });
    
  } catch (error) {
    console.error('Batch status error:', error);
    return NextResponse.json(
      { error: 'Failed to get batch status' },
      { status: 500 }
    );
  }
}