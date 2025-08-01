import { PrismaClient, UserRole, Sport, AchievementCategory } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create schools
  const schools = await Promise.all([
    prisma.school.create({
      data: {
        name: 'Central High School',
        state: 'CA',
        city: 'Los Angeles',
        district: 'LAUSD',
        address: '123 Main St',
        zipCode: '90001',
        mascot: 'Tigers',
        primaryColor: '#FF6B00',
        secondaryColor: '#000000',
        nickname: 'The Orange Storm',
        traditions: {
          gameDay: ['Tiger Walk', 'Victory Bell', 'Orange Out'],
          annual: ['Homecoming Bonfire', 'Senior Night', 'Ring Ceremony']
        },
        rivals: [],
        famousAlumni: [
          { name: 'John Smith', year: '2010', achievement: 'NFL Player' },
          { name: 'Sarah Johnson', year: '2015', achievement: 'Olympic Swimmer' }
        ],
      }
    }),
    prisma.school.create({
      data: {
        name: 'Lincoln High School',
        state: 'TX',
        city: 'Houston',
        district: 'HISD',
        mascot: 'Eagles',
        primaryColor: '#004C8C',
        secondaryColor: '#FFD700',
        nickname: 'Eagle Nation',
        traditions: {
          gameDay: ['Eagle Flight', 'Gold Rush', 'Tailgate City'],
          annual: ['Spring Showcase', 'Eagle Awards', 'Senior Sunrise']
        },
      }
    }),
    prisma.school.create({
      data: {
        name: 'Washington High School',
        state: 'FL',
        city: 'Miami',
        district: 'MDCPS',
        mascot: 'Warriors',
        primaryColor: '#8B0000',
        secondaryColor: '#FFFFFF',
        nickname: 'The Red Army',
      }
    }),
  ]);

  console.log(`✅ Created ${schools.length} schools`);

  // Update rivals
  await prisma.school.update({
    where: { id: schools[0].id },
    data: { rivals: [schools[1].id] }
  });
  await prisma.school.update({
    where: { id: schools[1].id },
    data: { rivals: [schools[0].id] }
  });

  // Create users
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  // Create students
  const students = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john.athlete@example.com',
        username: 'john_athlete',
        password: hashedPassword,
        firstName: 'John',
        lastName: 'Athlete',
        role: UserRole.STUDENT,
        schoolId: schools[0].id,
        dateOfBirth: new Date('2007-05-15'),
        bio: 'Varsity QB | 3.8 GPA | Future Engineer',
        hypeBalance: {
          create: {
            freeHype: 2500,
            totalEarned: 2500,
            dailyStreak: 7,
            maxStreak: 30,
          }
        },
        stadium: {
          create: {
            theme: 'cinematic',
            bannerStyle: 'dynamic',
            headline: 'Future NFL Star in the Making',
            tagline: 'Speed, Power, Precision',
            highlights: ['State Champion 2023', '3,500 Passing Yards', 'Team Captain'],
            schoolId: schools[0].id,
          }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'sarah.basketball@example.com',
        username: 'sarah_hoops',
        password: hashedPassword,
        firstName: 'Sarah',
        lastName: 'Johnson',
        role: UserRole.STUDENT,
        schoolId: schools[0].id,
        dateOfBirth: new Date('2008-02-20'),
        bio: 'Point Guard | Honor Roll | Community Leader',
        hypeBalance: {
          create: {
            freeHype: 3200,
            totalEarned: 3200,
            dailyStreak: 14,
            maxStreak: 45,
          }
        },
        stadium: {
          create: {
            theme: 'modern',
            bannerStyle: 'gradient',
            headline: 'Breaking Barriers On and Off the Court',
            tagline: 'Leadership • Excellence • Impact',
            highlights: ['All-State 2024', '1,000 Career Points', 'Academic All-American'],
            schoolId: schools[0].id,
          }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'mike.soccer@example.com',
        username: 'mike_striker',
        password: hashedPassword,
        firstName: 'Mike',
        lastName: 'Rodriguez',
        role: UserRole.STUDENT,
        schoolId: schools[1].id,
        dateOfBirth: new Date('2007-11-10'),
        bio: 'Soccer Captain | 4.0 GPA | Bilingual Leader',
        hypeBalance: {
          create: {
            freeHype: 1800,
            totalEarned: 1800,
            dailyStreak: 3,
            maxStreak: 21,
          }
        },
        stadium: {
          create: {
            theme: 'minimal',
            headline: 'Precision on the Pitch',
            tagline: 'Goals, Assists, Leadership',
            schoolId: schools[1].id,
          }
        }
      }
    }),
  ]);

  console.log(`✅ Created ${students.length} students`);

  // Create parents
  const parents = await Promise.all([
    prisma.user.create({
      data: {
        email: 'parent.athlete@example.com',
        username: 'proud_parent_1',
        password: hashedPassword,
        firstName: 'Mary',
        lastName: 'Athlete',
        role: UserRole.PARENT,
        schoolId: schools[0].id,
        hypeBalance: {
          create: { freeHype: 500 }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'parent2.athlete@example.com',
        username: 'proud_parent_2',
        password: hashedPassword,
        firstName: 'Robert',
        lastName: 'Athlete',
        role: UserRole.PARENT,
        schoolId: schools[0].id,
        hypeBalance: {
          create: { freeHype: 500 }
        }
      }
    }),
  ]);

  // Create family connections
  await Promise.all([
    prisma.familyConnection.create({
      data: {
        memberId: students[0].id,
        connectedToId: parents[0].id,
        relationship: 'mother',
        isVerified: true,
      }
    }),
    prisma.familyConnection.create({
      data: {
        memberId: students[0].id,
        connectedToId: parents[1].id,
        relationship: 'father',
        isVerified: true,
      }
    }),
  ]);

  console.log(`✅ Created ${parents.length} parents and family connections`);

  // Create coaches
  const coaches = await Promise.all([
    prisma.user.create({
      data: {
        email: 'coach.smith@example.com',
        username: 'coach_smith',
        password: hashedPassword,
        firstName: 'Tom',
        lastName: 'Smith',
        role: UserRole.COACH,
        schoolId: schools[0].id,
        bio: '20 years coaching | 5x State Champion',
        hypeBalance: {
          create: { freeHype: 1000 }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'coach.williams@example.com',
        username: 'coach_williams',
        password: hashedPassword,
        firstName: 'Jennifer',
        lastName: 'Williams',
        role: UserRole.COACH,
        schoolId: schools[0].id,
        bio: 'Basketball Coach | Player Development Specialist',
        hypeBalance: {
          create: { freeHype: 1000 }
        }
      }
    }),
  ]);

  console.log(`✅ Created ${coaches.length} coaches`);

  // Create teams
  const teams = await Promise.all([
    prisma.team.create({
      data: {
        schoolId: schools[0].id,
        name: 'Central Tigers Football',
        sport: Sport.FOOTBALL,
        level: 'Varsity',
        season: '2024',
        headCoachId: coaches[0].id,
        wins: 8,
        losses: 2,
      }
    }),
    prisma.team.create({
      data: {
        schoolId: schools[0].id,
        name: 'Central Tigers Basketball',
        sport: Sport.BASKETBALL,
        level: 'Varsity',
        season: '2024',
        headCoachId: coaches[1].id,
        wins: 15,
        losses: 5,
      }
    }),
  ]);

  // Add team members
  await Promise.all([
    prisma.teamMember.create({
      data: {
        teamId: teams[0].id,
        userId: students[0].id,
        jerseyNumber: '7',
        position: 'Quarterback',
        role: 'captain',
      }
    }),
    prisma.teamMember.create({
      data: {
        teamId: teams[1].id,
        userId: students[1].id,
        jerseyNumber: '23',
        position: 'Point Guard',
        role: 'captain',
      }
    }),
  ]);

  console.log(`✅ Created ${teams.length} teams with members`);

  // Create HeroCards
  const heroCards = await Promise.all([
    prisma.heroCard.create({
      data: {
        userId: students[0].id,
        title: 'John Athlete - Football Season 2024',
        sport: Sport.FOOTBALL,
        position: 'Quarterback',
        stats: {
          passingYards: 3500,
          touchdowns: 42,
          completionRate: '68%',
          qbRating: 158.3,
        },
        imageUrl: '/images/herocard-football.jpg',
        aiHighlights: [
          'Elite arm strength with 65+ yard range',
          'Exceptional decision making under pressure',
          'Natural leader who elevates teammates',
        ],
        growthScore: 94.5,
        season: '2024',
      }
    }),
    prisma.heroCard.create({
      data: {
        userId: students[1].id,
        title: 'Sarah Johnson - Basketball 2024',
        sport: Sport.BASKETBALL,
        position: 'Point Guard',
        stats: {
          pointsPerGame: 22.5,
          assists: 8.2,
          steals: 3.1,
          shootingPercentage: '47%',
        },
        imageUrl: '/images/herocard-basketball.jpg',
        aiHighlights: [
          'Court vision rivals D1 players',
          'Clutch performer in big moments',
          'Defensive intensity sets the tone',
        ],
        growthScore: 91.2,
        season: '2024',
      }
    }),
  ]);

  console.log(`✅ Created ${heroCards.length} HeroCards`);

  // Create achievements
  const achievements = await Promise.all([
    prisma.achievement.create({
      data: {
        userId: students[0].id,
        title: 'State Championship Victory',
        description: 'Led team to first state championship in 10 years',
        category: AchievementCategory.ATHLETIC,
        date: new Date('2023-12-15'),
        location: 'State Stadium',
        details: {
          score: '35-28',
          personalStats: '325 yards, 4 TDs',
          attendance: 15000,
        },
        mediaUrls: ['/images/state-champ.jpg'],
        isVerified: true,
        verifiedBy: coaches[0].id,
      }
    }),
    prisma.achievement.create({
      data: {
        userId: students[1].id,
        title: 'Academic All-American',
        description: 'Named to National Academic All-American Team',
        category: AchievementCategory.ACADEMIC,
        date: new Date('2024-03-01'),
        details: {
          gpa: 4.0,
          testScores: { SAT: 1520, ACT: 34 },
        },
        isVerified: true,
      }
    }),
    prisma.achievement.create({
      data: {
        userId: students[0].id,
        title: 'Community Service Award',
        description: 'Completed 200+ volunteer hours at local youth center',
        category: AchievementCategory.COMMUNITY,
        date: new Date('2024-01-20'),
        location: 'City Youth Center',
        details: {
          hours: 215,
          impact: 'Mentored 30 youth athletes',
        },
        isVerified: true,
      }
    }),
  ]);

  console.log(`✅ Created ${achievements.length} achievements`);

  // Create HYPE events
  const hypeEvents = await Promise.all([
    prisma.hypeEvent.create({
      data: {
        toUserId: students[0].id,
        type: 'EARNED',
        amount: 500,
        category: 'achievement',
        description: 'State Championship Victory',
      }
    }),
    prisma.hypeEvent.create({
      data: {
        toUserId: students[1].id,
        type: 'EARNED',
        amount: 250,
        category: 'academic',
        description: 'Academic All-American Award',
      }
    }),
    prisma.hypeEvent.create({
      data: {
        fromUserId: parents[0].id,
        toUserId: students[0].id,
        type: 'GIFTED',
        amount: 100,
        category: 'gift',
        description: 'Great job this season!',
      }
    }),
  ]);

  console.log(`✅ Created ${hypeEvents.length} HYPE events`);

  // Create posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        authorId: students[0].id,
        content: 'State Champions! 🏆 Couldn\'t have done it without my amazing team and coaches. #CentralTigers #StateChamps',
        mediaUrls: ['/images/team-celebration.jpg'],
        tags: ['football', 'champions', 'teamwork'],
        likes: 245,
      }
    }),
    prisma.post.create({
      data: {
        authorId: students[1].id,
        content: 'Honored to be named Academic All-American! Proof that you can excel in the classroom and on the court. 📚🏀',
        tags: ['academic', 'basketball', 'excellence'],
        likes: 189,
      }
    }),
  ]);

  // Create comments
  await Promise.all([
    prisma.comment.create({
      data: {
        postId: posts[0].id,
        authorId: coaches[0].id,
        content: 'So proud of you and the entire team! Championship mentality! 💪',
        likes: 45,
      }
    }),
    prisma.comment.create({
      data: {
        postId: posts[0].id,
        authorId: parents[0].id,
        content: 'We\'re so proud of you! All those early morning practices paid off!',
        likes: 32,
      }
    }),
  ]);

  console.log(`✅ Created ${posts.length} posts with comments`);

  // Create upcoming events
  const events = await Promise.all([
    prisma.event.create({
      data: {
        schoolId: schools[0].id,
        title: 'Tigers vs Eagles - Football',
        description: 'Rivalry game of the year!',
        type: 'game',
        sport: Sport.FOOTBALL,
        startTime: new Date('2024-09-15T19:00:00'),
        location: 'Central High Stadium',
        homeTeamId: teams[0].id,
      }
    }),
    prisma.event.create({
      data: {
        schoolId: schools[0].id,
        title: 'Basketball Season Opener',
        type: 'game',
        sport: Sport.BASKETBALL,
        startTime: new Date('2024-11-20T18:00:00'),
        location: 'Central High Gym',
        homeTeamId: teams[1].id,
      }
    }),
  ]);

  console.log(`✅ Created ${events.length} events`);

  // Create posters
  await Promise.all([
    prisma.poster.create({
      data: {
        userId: students[0].id,
        type: 'GAME_DAY',
        title: 'GAMEDAY: Tigers vs Eagles',
        subtitle: 'Friday Night Lights',
        imageUrl: '/images/poster-gameday.jpg',
        thumbnailUrl: '/images/poster-gameday-thumb.jpg',
        eventDate: events[0].startTime,
        opponent: 'Lincoln Eagles',
        location: 'Home',
      }
    }),
    prisma.poster.create({
      data: {
        userId: students[1].id,
        type: 'ACHIEVEMENT',
        title: 'Academic All-American',
        subtitle: 'Excellence On and Off the Court',
        imageUrl: '/images/poster-achievement.jpg',
        thumbnailUrl: '/images/poster-achievement-thumb.jpg',
      }
    }),
  ]);

  console.log(`✅ Created posters`);

  // Create notifications
  await Promise.all([
    prisma.notification.create({
      data: {
        userId: students[0].id,
        type: 'achievement_unlocked',
        title: 'New Achievement!',
        message: 'You\'ve been awarded State Championship Victory',
        read: true,
        readAt: new Date(),
      }
    }),
    prisma.notification.create({
      data: {
        userId: students[0].id,
        type: 'hype_earned',
        title: 'You earned 500 HYPE!',
        message: 'State Championship Victory earned you 500 HYPE points',
        read: false,
      }
    }),
  ]);

  console.log(`✅ Created notifications`);

  // Create activities
  await Promise.all([
    prisma.activity.create({
      data: {
        userId: students[0].id,
        type: 'achievement_earned',
        title: 'Earned State Championship Victory',
        description: 'Led team to first state championship in 10 years',
      }
    }),
    prisma.activity.create({
      data: {
        userId: students[1].id,
        type: 'joined_team',
        title: 'Joined Central Tigers Basketball',
        description: 'Now playing as Point Guard for Varsity team',
      }
    }),
  ]);

  console.log(`✅ Created activities`);

  // Create media
  await Promise.all([
    prisma.media.create({
      data: {
        userId: students[0].id,
        type: 'image',
        url: '/images/touchdown-celebration.jpg',
        thumbnailUrl: '/images/touchdown-celebration-thumb.jpg',
        title: 'Touchdown Celebration',
        description: 'Celebrating the game-winning TD',
        mimeType: 'image/jpeg',
        size: 2048000,
        width: 1920,
        height: 1080,
        tags: ['football', 'touchdown', 'victory'],
      }
    }),
    prisma.media.create({
      data: {
        userId: students[1].id,
        type: 'video',
        url: '/videos/game-highlights.mp4',
        thumbnailUrl: '/images/video-thumb.jpg',
        title: 'Season Highlights',
        description: 'Best plays from the 2024 season',
        mimeType: 'video/mp4',
        size: 50000000,
        duration: 180,
        tags: ['basketball', 'highlights', '2024'],
      }
    }),
  ]);

  console.log(`✅ Created media files`);

  // Create admin and other roles
  await prisma.user.create({
    data: {
      email: 'admin@ultrapreps.com',
      username: 'admin',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: UserRole.ADMIN,
      hypeBalance: {
        create: { freeHype: 10000 }
      }
    }
  });

  console.log('✅ Created admin user');

  console.log('\n🎉 Database seed completed successfully!');
  console.log('\n📝 Test credentials:');
  console.log('Student: john.athlete@example.com / password123');
  console.log('Parent: parent.athlete@example.com / password123');
  console.log('Coach: coach.smith@example.com / password123');
  console.log('Admin: admin@ultrapreps.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });