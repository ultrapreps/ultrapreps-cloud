import { prisma } from '@/lib/prisma';

export interface CreateStadiumInput {
  userId: string;
  theme?: string;
  bannerStyle?: string;
  backgroundUrl?: string;
  headline?: string;
  tagline?: string;
  highlights?: string[];
  schoolId?: string;
  isPublic?: boolean;
  allowComments?: boolean;
  showStats?: boolean;
}

// Create or update stadium
export async function createOrUpdateStadium(data: CreateStadiumInput) {
  const { userId, ...stadiumData } = data;
  
  return prisma.stadium.upsert({
    where: { userId },
    update: {
      ...stadiumData,
      updatedAt: new Date(),
    },
    create: {
      userId,
      ...stadiumData,
    },
    include: {
      user: {
        include: {
          school: true,
          hypeBalance: true,
          achievements: {
            orderBy: { date: 'desc' },
            take: 5,
          },
          heroCards: {
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
            take: 1,
          }
        }
      },
      school: true,
    }
  });
}

// Get stadium by username
export async function getStadiumByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true }
  });

  if (!user) return null;

  const stadium = await prisma.stadium.findUnique({
    where: { userId: user.id },
    include: {
      user: {
        include: {
          school: true,
          hypeBalance: true,
          achievements: {
            orderBy: { date: 'desc' },
            take: 10,
          },
          heroCards: {
            where: { isActive: true },
            orderBy: { createdAt: 'desc' },
            take: 3,
          },
          media: {
            where: { isPublic: true },
            orderBy: { createdAt: 'desc' },
            take: 12,
          },
          posts: {
            where: { visibility: 'PUBLIC' },
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: {
              _count: {
                select: { comments: true }
              }
            }
          }
        }
      },
      school: true,
    }
  });

  if (stadium) {
    // Increment view count
    await prisma.stadium.update({
      where: { id: stadium.id },
      data: { views: { increment: 1 } }
    });
  }

  return stadium;
}

// Get stadium by user ID
export async function getStadiumByUserId(userId: string) {
  return prisma.stadium.findUnique({
    where: { userId },
    include: {
      user: {
        include: {
          school: true,
          hypeBalance: true,
        }
      },
      school: true,
    }
  });
}

// Update stadium theme
export async function updateStadiumTheme(
  userId: string,
  theme: {
    theme?: string;
    bannerStyle?: string;
    backgroundUrl?: string;
  }
) {
  return prisma.stadium.update({
    where: { userId },
    data: {
      ...theme,
      updatedAt: new Date(),
    }
  });
}

// Update stadium content
export async function updateStadiumContent(
  userId: string,
  content: {
    headline?: string;
    tagline?: string;
    highlights?: string[];
  }
) {
  return prisma.stadium.update({
    where: { userId },
    data: {
      ...content,
      updatedAt: new Date(),
    }
  });
}

// Toggle stadium privacy
export async function toggleStadiumPrivacy(userId: string, isPublic: boolean) {
  return prisma.stadium.update({
    where: { userId },
    data: {
      isPublic,
      updatedAt: new Date(),
    }
  });
}

// Like stadium
export async function likeStadium(stadiumId: string) {
  return prisma.stadium.update({
    where: { id: stadiumId },
    data: {
      likes: { increment: 1 }
    }
  });
}

// Get popular stadiums
export async function getPopularStadiums(limit = 20) {
  return prisma.stadium.findMany({
    where: { isPublic: true },
    include: {
      user: {
        include: {
          school: true,
          hypeBalance: true,
          heroCards: {
            where: { isActive: true },
            take: 1,
          }
        }
      },
      school: true,
    },
    orderBy: [
      { views: 'desc' },
      { likes: 'desc' }
    ],
    take: limit,
  });
}

// Get stadiums by school
export async function getStadiumsBySchool(schoolId: string, limit = 20) {
  return prisma.stadium.findMany({
    where: {
      schoolId,
      isPublic: true,
    },
    include: {
      user: {
        include: {
          hypeBalance: true,
          achievements: {
            take: 3,
          }
        }
      }
    },
    orderBy: {
      user: {
        hypeBalance: {
          totalEarned: 'desc'
        }
      }
    },
    take: limit,
  });
}

// Get stadium stats
export async function getStadiumStats(stadiumId: string) {
  const stadium = await prisma.stadium.findUnique({
    where: { id: stadiumId },
    include: {
      user: {
        include: {
          achievements: { select: { id: true } },
          posts: { select: { id: true } },
          media: { select: { id: true } },
          heroCards: { select: { id: true } },
        }
      }
    }
  });

  if (!stadium) return null;

  return {
    views: stadium.views,
    likes: stadium.likes,
    achievements: stadium.user.achievements.length,
    posts: stadium.user.posts.length,
    media: stadium.user.media.length,
    heroCards: stadium.user.heroCards.length,
  };
}