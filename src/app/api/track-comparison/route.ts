// 🏃 TRACK ATHLETE COMPARISON API
// Comprehensive track performance analysis and comparison endpoint

import { NextRequest, NextResponse } from 'next/server';
import { trackComparison } from '@/lib/trackComparisonSystem';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { athlete1Name, athlete2Name, schoolName = 'Marble Falls High School' } = body;

    if (!athlete1Name || !athlete2Name) {
      return NextResponse.json({
        success: false,
        error: 'Both athlete1Name and athlete2Name are required'
      }, { status: 400 });
    }

    console.log(`🏃 Starting track comparison: ${athlete1Name} vs ${athlete2Name} at ${schoolName}`);

    // Perform comprehensive comparison using the track comparison system
    const comparisonResult = await trackComparison.compareAthletes(
      athlete1Name,
      athlete2Name,
      schoolName
    );

    // Enhanced response with additional metadata
    const response = {
      ...comparisonResult,
      metadata: {
        comparisonDate: new Date().toISOString(),
        dataSource: 'UltraPreps CrawlerBot & StatsBot',
        sourceSites: ['UIL', 'MaxPreps', 'Athletic.net', 'TexasTrack', 'MileSplit'],
        analysisType: 'head-to-head-common-events',
        confidence: 'high'
      }
    };

    return NextResponse.json({
      success: true,
      data: response
    });
  } catch (error) {
    console.error('Track comparison API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to perform track comparison'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const athlete1 = searchParams.get('athlete1');
    const athlete2 = searchParams.get('athlete2');
    const school = searchParams.get('school') || 'Marble Falls High School';

    if (!athlete1 || !athlete2) {
      return NextResponse.json({
        success: false,
        error: 'Query parameters athlete1 and athlete2 are required'
      }, { status: 400 });
    }

    // Perform comparison using GET parameters
    const comparisonResult = await trackComparison.compareAthletes(
      athlete1,
      athlete2,
      school
    );

    return NextResponse.json({
      success: true,
      data: comparisonResult
    });
  } catch (error) {
    console.error('Track comparison GET API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to perform track comparison'
    }, { status: 500 });
  }
}