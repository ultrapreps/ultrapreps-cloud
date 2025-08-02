import { NextRequest, NextResponse } from 'next/server';
import { getRivalSchools, getSchoolsLeaderboard } from '@/lib/db/schools';
import { HypeManager } from '@/lib/hype/HypeManager';
import { prisma } from '@/lib/prisma';

// GET /api/rivalry/leaderboard?scope=school&schoolId=...&district=...&conference=...&limit=...
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const scope = searchParams.get('scope') || 'global'; // global, school, district, conference
    const schoolId = searchParams.get('schoolId');
    const district = searchParams.get('district');
    const conference = searchParams.get('conference');
    const limit = parseInt(searchParams.get('limit') || '25');

    let leaderboard = [];
    let meta: any = {};

    if (scope === 'school' && schoolId) {
      // Rivalries for a specific school
      const rivals = await getRivalSchools(schoolId);
      const hypeManager = new HypeManager();
      leaderboard = await Promise.all(
        rivals.map(async (rival) => {
          const hype = await hypeManager.getSchoolRivalryHype(schoolId, rival.id);
          return {
            schoolId: rival.id,
            schoolName: rival.name,
            rivalryName: rival.rivalryName,
            hype,
            since: rival.since,
            intensity: rival.intensity,
            annualGame: rival.annualGame,
          };
        })
      );
      meta.schoolId = schoolId;
    } else if (scope === 'district' && district) {
      // Rivalries within a district
      const schools = await prisma.school.findMany({ where: { district }, take: limit });
      const hypeManager = new HypeManager();
      leaderboard = await Promise.all(
        schools.map(async (school) => {
          const hype = await hypeManager.getSchoolRivalryHype(school.id, undefined);
          return {
            schoolId: school.id,
            schoolName: school.name,
            hype,
            district: school.district,
            mascot: school.mascot,
          };
        })
      );
      meta.district = district;
    } else if (scope === 'conference' && conference) {
      // Rivalries within a conference
      const schools = await prisma.school.findMany({ where: { conference }, take: limit });
      const hypeManager = new HypeManager();
      leaderboard = await Promise.all(
        schools.map(async (school) => {
          const hype = await hypeManager.getSchoolRivalryHype(school.id, undefined);
          return {
            schoolId: school.id,
            schoolName: school.name,
            hype,
            conference: school.conference,
            mascot: school.mascot,
          };
        })
      );
      meta.conference = conference;
    } else {
      // Global top rivalries (by HYPE, games, or other metric)
      leaderboard = await getSchoolsLeaderboard(limit);
      meta.global = true;
    }

    return NextResponse.json({
      scope,
      count: leaderboard.length,
      leaderboard,
      meta,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error('RivalryBot leaderboard error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rivalry leaderboard' },
      { status: 500 }
    );
  }
}