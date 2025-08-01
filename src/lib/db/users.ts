import { prisma } from '@/lib/prisma';
import { UserRole, PrivacyLevel } from '@prisma/client';
import bcrypt from 'bcryptjs';

export interface CreateUserInput {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  schoolId?: string;
  dateOfBirth?: Date;
  phone?: string;
  bio?: string;
}

export interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  bio?: string;
  phone?: string;
  image?: string;
  privacyLevel?: PrivacyLevel;
  notificationsEnabled?: boolean;
  twoFactorEnabled?: boolean;
}

// Create a new user
export async function createUser(data: CreateUserInput) {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  
  const user = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
      // Create associated HypeBalance
      hypeBalance: {
        create: {
          freeHype: 500, // Welcome bonus
        }
      }
    },
    include: {
      school: true,
      hypeBalance: true,
    }
  });

  // Log initial HYPE earning event
  await prisma.hypeEvent.create({
    data: {
      toUserId: user.id,
      type: 'EARNED',
      amount: 500,
      category: 'welcome_bonus',
      description: 'Welcome to UltraPreps! Here\'s 500 HYPE to get started.',
    }
  });

  return user;
}

// Get user by ID
export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: {
      school: true,
      stadium: true,
      hypeBalance: true,
      familyMembers: {
        include: {
          connectedTo: true
        }
      },
      achievements: {
        orderBy: { date: 'desc' },
        take: 5
      },
      heroCards: {
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    }
  });
}

// Get user by email
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      school: true,
      hypeBalance: true,
    }
  });
}

// Get user by username
export async function getUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
    include: {
      school: true,
      stadium: true,
      hypeBalance: true,
      achievements: {
        orderBy: { date: 'desc' },
        take: 10
      },
      heroCards: {
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    }
  });
}

// Update user
export async function updateUser(id: string, data: UpdateUserInput) {
  return prisma.user.update({
    where: { id },
    data: {
      ...data,
      updatedAt: new Date(),
    },
    include: {
      school: true,
      hypeBalance: true,
    }
  });
}

// Update last login
export async function updateLastLogin(id: string) {
  return prisma.user.update({
    where: { id },
    data: {
      lastLoginAt: new Date(),
    }
  });
}

// Verify user password
export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

// Get users by school
export async function getUsersBySchool(schoolId: string, limit = 20) {
  return prisma.user.findMany({
    where: { schoolId },
    include: {
      hypeBalance: true,
      stadium: true,
    },
    orderBy: {
      hypeBalance: {
        totalEarned: 'desc'
      }
    },
    take: limit,
  });
}

// Get family connections
export async function getFamilyConnections(userId: string) {
  const connections = await prisma.familyConnection.findMany({
    where: {
      OR: [
        { memberId: userId },
        { connectedToId: userId }
      ]
    },
    include: {
      member: {
        include: {
          school: true,
          stadium: true
        }
      },
      connectedTo: {
        include: {
          school: true,
          stadium: true
        }
      }
    }
  });

  // Format connections to always show the other person
  return connections.map(conn => {
    const isOriginalMember = conn.memberId === userId;
    return {
      id: conn.id,
      user: isOriginalMember ? conn.connectedTo : conn.member,
      relationship: conn.relationship,
      isVerified: conn.isVerified,
      createdAt: conn.createdAt,
    };
  });
}

// Add family connection
export async function addFamilyConnection(
  memberId: string, 
  connectedToId: string, 
  relationship: string
) {
  // Check if connection already exists
  const existing = await prisma.familyConnection.findFirst({
    where: {
      OR: [
        { memberId, connectedToId },
        { memberId: connectedToId, connectedToId: memberId }
      ]
    }
  });

  if (existing) {
    throw new Error('Family connection already exists');
  }

  return prisma.familyConnection.create({
    data: {
      memberId,
      connectedToId,
      relationship,
      isVerified: false, // Require verification from other party
    },
    include: {
      member: true,
      connectedTo: true,
    }
  });
}

// Search users
export async function searchUsers(query: string, limit = 10) {
  return prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: query, mode: 'insensitive' } },
        { firstName: { contains: query, mode: 'insensitive' } },
        { lastName: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
      ]
    },
    include: {
      school: true,
      stadium: true,
    },
    take: limit,
  });
}

// Get user stats
export async function getUserStats(userId: string) {
  const [
    achievementCount,
    postCount,
    mediaCount,
    familyCount,
    user
  ] = await Promise.all([
    prisma.achievement.count({ where: { userId } }),
    prisma.post.count({ where: { authorId: userId } }),
    prisma.media.count({ where: { userId } }),
    prisma.familyConnection.count({
      where: {
        OR: [
          { memberId: userId },
          { connectedToId: userId }
        ]
      }
    }),
    prisma.user.findUnique({
      where: { id: userId },
      include: {
        hypeBalance: true,
        stadium: true,
      }
    })
  ]);

  return {
    achievements: achievementCount,
    posts: postCount,
    media: mediaCount,
    family: familyCount,
    hype: user?.hypeBalance?.freeHype || 0,
    stadiumViews: user?.stadium?.views || 0,
  };
}