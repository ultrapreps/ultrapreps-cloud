// 🤖 ULTRAPREPS BOT STATUS API ENDPOINT
// Provides real-time status and capabilities of the bot network

import { NextRequest, NextResponse } from 'next/server';
import { getBotNetworkStatus, botNetwork } from '@/lib/botSystem';

export async function GET(request: NextRequest) {
  try {
    // Get current bot network status
    const status = await getBotNetworkStatus();
    
    // Enhanced status with capabilities
    const enhancedStatus = {
      ...status,
      capabilities: {
        crawlerBot: {
          schoolResearch: true,
          activityResearch: true,
          studentProfileFetch: true,
          supportedActivities: [
            'athletics', 'football', 'basketball', 'soccer',
            'theater', 'band', 'choir', 'robotics', 'gaming',
            'academics', 'math', 'jrotc', 'debate', 'art'
          ]
        },
        statsBot: {
          performanceAnalysis: true,
          growthTrajectory: true,
          multiActivitySupport: true,
          supportedMetrics: [
            'gpa', 'testScores', 'athleticPerformance',
            'theaterRoles', 'musicalInstruments', 'competitionWins',
            'leadershipPositions', 'volunteerHours'
          ]
        }
      },
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    };

    return NextResponse.json({
      success: true,
      data: enhancedStatus
    });
  } catch (error) {
    console.error('Bot status API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to retrieve bot status'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, studentName, schoolName, activityType } = body;

    switch (action) {
      case 'analyzeStudent':
        if (!studentName || !schoolName) {
          return NextResponse.json({
            success: false,
            error: 'studentName and schoolName are required'
          }, { status: 400 });
        }

        const analysis = await botNetwork.analyzeStudent(
          studentName, 
          schoolName, 
          activityType || 'all'
        );

        return NextResponse.json({
          success: true,
          data: analysis
        });

      case 'researchSchool':
        if (!schoolName) {
          return NextResponse.json({
            success: false,
            error: 'schoolName is required'
          }, { status: 400 });
        }

        const schoolData = await botNetwork.researchSchool(schoolName);
        
        return NextResponse.json({
          success: true,
          data: schoolData
        });

      case 'researchActivity':
        if (!activityType || !schoolName) {
          return NextResponse.json({
            success: false,
            error: 'activityType and schoolName are required'
          }, { status: 400 });
        }

        const activityData = await botNetwork.researchActivity(activityType, schoolName);
        
        return NextResponse.json({
          success: true,
          data: activityData
        });

      case 'healthCheck':
        const healthStatus = await getBotNetworkStatus();
        const isHealthy = healthStatus.networkHealth === 'optimal' && 
                         healthStatus.crawlerBot.status !== 'error' && 
                         healthStatus.statsBot.status !== 'error';

        return NextResponse.json({
          success: true,
          data: {
            healthy: isHealthy,
            status: healthStatus
          }
        });

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action. Supported actions: analyzeStudent, researchSchool, researchActivity, healthCheck'
        }, { status: 400 });
    }
  } catch (error) {
    console.error('Bot action API error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to execute bot action'
    }, { status: 500 });
  }
}