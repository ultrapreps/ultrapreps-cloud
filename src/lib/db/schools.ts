import { prisma } from '@/lib/prisma';

export interface CreateSchoolInput {
  name: string;
  district?: string;
  state: string;
  city: string;
  address?: string;
  zipCode?: string;
  phone?: string;
  website?: string;
  primaryColor?: string;
  secondaryColor?: string;
  mascot?: string;
}

// Create a new school
export async function createSchool(data: CreateSchoolInput) {
  return prisma.school.create({
    data: {
      ...data,
      primaryColor: data.primaryColor || '#F59E0B',
      secondaryColor: data.secondaryColor || '#F97316',
    }
  });
}

// Get school by ID
export async function getSchoolById(id: string) {
  return prisma.school.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          users: true,
          events: true,
          teams: true,
        }
      }
    }
  });
}

// Search schools
export async function searchSchools(query: string, state?: string, limit = 20) {
  return prisma.school.findMany({
    where: {
      AND: [
        {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { city: { contains: query, mode: 'insensitive' } },
            { district: { contains: query, mode: 'insensitive' } },
          ]
        },
        state ? { state } : {}
      ]
    },
    orderBy: { name: 'asc' },
    take: limit,
  });
}

// Get schools by state
export async function getSchoolsByState(state: string, limit = 50) {
  return prisma.school.findMany({
    where: { state },
    orderBy: { totalStudents: 'desc' },
    take: limit,
  });
}

// Update school
export async function updateSchool(id: string, data: Partial<CreateSchoolInput>) {
  return prisma.school.update({
    where: { id },
    data,
  });
}

// Update school branding
export async function updateSchoolBranding(
  id: string, 
  branding: {
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    mascot?: string;
    mascotImageUrl?: string;
    logoUrl?: string;
    bannerUrl?: string;
  }
) {
  return prisma.school.update({
    where: { id },
    data: branding,
  });
}

// Update school AI data
export async function updateSchoolAIData(
  id: string,
  aiData: {
    nickname?: string;
    traditions?: any;
    rivals?: string[];
    famousAlumni?: any;
    campusLayout?: any;
  }
) {
  return prisma.school.update({
    where: { id },
    data: aiData,
  });
}

// Get school stats
export async function getSchoolStats(schoolId: string) {
  const [
    userCount,
    totalHype,
    activeEvents,
    teams,
    topAthletes
  ] = await Promise.all([
    prisma.user.count({ where: { schoolId } }),
    prisma.hypeBalance.aggregate({
      where: { user: { schoolId } },
      _sum: { totalEarned: true }
    }),
    prisma.event.count({
      where: {
        schoolId,
        startTime: { gte: new Date() }
      }
    }),
    prisma.team.count({ where: { schoolId } }),
    prisma.user.findMany({
      where: { schoolId, role: 'STUDENT' },
      include: {
        hypeBalance: true,
        achievements: { take: 3 },
      },
      orderBy: {
        hypeBalance: {
          totalEarned: 'desc'
        }
      },
      take: 10
    })
  ]);

  return {
    totalStudents: userCount,
    totalHype: totalHype._sum.totalEarned || 0,
    activeEvents,
    totalTeams: teams,
    topAthletes,
  };
}

// Get rival schools
export async function getRivalSchools(schoolId: string) {
  const school = await prisma.school.findUnique({
    where: { id: schoolId },
    select: { rivals: true }
  });

  if (!school?.rivals || school.rivals.length === 0) {
    return [];
  }

  return prisma.school.findMany({
    where: {
      id: { in: school.rivals }
    }
  });
}

// Get schools leaderboard
export async function getSchoolsLeaderboard(limit = 100) {
  return prisma.school.findMany({
    orderBy: { totalHype: 'desc' },
    include: {
      _count: {
        select: { users: true }
      }
    },
    take: limit,
  });
}

// Popular schools data for seeding
export const popularSchools = [
  {
    name: 'Central High School',
    state: 'CA',
    city: 'Los Angeles',
    mascot: 'Tigers',
    primaryColor: '#FF6B00',
    secondaryColor: '#000000',
  },
  {
    name: 'Lincoln High School',
    state: 'TX',
    city: 'Houston',
    mascot: 'Eagles',
    primaryColor: '#004C8C',
    secondaryColor: '#FFD700',
  },
  {
    name: 'Washington High School',
    state: 'FL',
    city: 'Miami',
    mascot: 'Warriors',
    primaryColor: '#8B0000',
    secondaryColor: '#FFFFFF',
  },
  {
    name: 'Roosevelt High School',
    state: 'NY',
    city: 'New York',
    mascot: 'Lions',
    primaryColor: '#FFB300',
    secondaryColor: '#1E3A8A',
  },
  {
    name: 'Jefferson High School',
    state: 'IL',
    city: 'Chicago',
    mascot: 'Patriots',
    primaryColor: '#DC143C',
    secondaryColor: '#002868',
  },
];