import { NextRequest, NextResponse } from 'next/server';
import { HypeManager } from '@/lib/hype/HypeManager';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const type = searchParams.get('type') || 'global';
    const limit = parseInt(searchParams.get('limit') || '50');
    const schoolId = searchParams.get('schoolId');
    const sport = searchParams.get('sport');
    
    const hypeManager = new HypeManager();
    let leaderboard;
    
    switch (type) {
      case 'school':
        if (!schoolId) {
          return NextResponse.json(
            { error: 'School ID required for school leaderboard' },
            { status: 400 }
          );
        }
        leaderboard = await hypeManager.getSchoolLeaderboard(schoolId, limit);
        break;
        
      case 'sport':
        if (!sport) {
          return NextResponse.json(
            { error: 'Sport required for sport leaderboard' },
            { status: 400 }
          );
        }
        leaderboard = await hypeManager.getSportLeaderboard(sport, limit);
        break;
        
      case 'global':
      default:
        leaderboard = await hypeManager.getGlobalLeaderboard(limit);
    }
    
    // Add weekly HYPE for top 10
    if (leaderboard.length > 0) {
      const topTen = leaderboard.slice(0, 10);
      for (const entry of topTen) {
        entry.weeklyHype = await hypeManager.getWeeklyHype(entry.userId);
      }
    }
    
    return NextResponse.json({
      type,
      count: leaderboard.length,
      leaderboard,
      lastUpdated: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}