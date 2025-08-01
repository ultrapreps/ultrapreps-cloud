import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import { getUserByEmail, verifyPassword } from '@/lib/db/users';
import { UserRole } from '@prisma/client';

// Extend NextAuth types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: UserRole;
      username: string;
      schoolId?: string;
      image?: string;
    };
  }
  
  interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    username: string;
    schoolId?: string;
    image?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: UserRole;
    username: string;
    schoolId?: string;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials');
        }

        const user = await getUserByEmail(credentials.email);
        
        if (!user || !user.password) {
          throw new Error('Invalid credentials');
        }

        const isValid = await verifyPassword(credentials.password, user.password);
        
        if (!isValid) {
          throw new Error('Invalid credentials');
        }

        // Update last login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() }
        });

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
          username: user.username,
          schoolId: user.schoolId || undefined,
          image: user.image || undefined,
        };
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.username = user.username;
        token.schoolId = user.schoolId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.username = token.username;
        session.user.schoolId = token.schoolId;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
};

// Role-based access control helpers
export function hasRole(userRole: UserRole, allowedRoles: UserRole[]): boolean {
  return allowedRoles.includes(userRole);
}

export function isStudent(role: UserRole): boolean {
  return role === UserRole.STUDENT;
}

export function isParent(role: UserRole): boolean {
  return role === UserRole.PARENT;
}

export function isCoach(role: UserRole): boolean {
  return role === UserRole.COACH;
}

export function isAdmin(role: UserRole): boolean {
  return role === UserRole.ADMIN;
}

export function isSchoolStaff(role: UserRole): boolean {
  const schoolStaffRoles: UserRole[] = [
    UserRole.TEACHER,
    UserRole.COACH,
    UserRole.ATHLETIC_DIRECTOR,
    UserRole.SUPERINTENDENT,
    UserRole.SCHOOL_BOARD
  ];
  return schoolStaffRoles.includes(role);
}

export function canAccessStudentData(userRole: UserRole): boolean {
  const allowedRoles: UserRole[] = [
    UserRole.STUDENT,
    UserRole.PARENT,
    UserRole.TEACHER,
    UserRole.COACH,
    UserRole.ATHLETIC_DIRECTOR,
    UserRole.ADMIN
  ];
  return allowedRoles.includes(userRole);
}

export function canManageSchool(userRole: UserRole): boolean {
  const managementRoles: UserRole[] = [
    UserRole.ATHLETIC_DIRECTOR,
    UserRole.SUPERINTENDENT,
    UserRole.SCHOOL_BOARD,
    UserRole.ADMIN
  ];
  return managementRoles.includes(userRole);
}

export function canViewRecruitingData(userRole: UserRole): boolean {
  const recruitingRoles: UserRole[] = [
    UserRole.STUDENT,
    UserRole.PARENT,
    UserRole.COACH,
    UserRole.ATHLETIC_DIRECTOR,
    UserRole.COLLEGE_SCOUT,
    UserRole.ADMIN
  ];
  return recruitingRoles.includes(userRole);
}

// Dashboard route mapping by role
export function getDashboardRoute(role: UserRole): string {
  const routeMap: Record<UserRole, string> = {
    [UserRole.STUDENT]: '/dashboard',
    [UserRole.PARENT]: '/parent-dashboard',
    [UserRole.TEACHER]: '/teacher-dashboard',
    [UserRole.COACH]: '/coach-dashboard',
    [UserRole.ATHLETIC_DIRECTOR]: '/athletic-director-dashboard',
    [UserRole.SUPERINTENDENT]: '/superintendent-dashboard',
    [UserRole.SCHOOL_BOARD]: '/school-board-dashboard',
    [UserRole.BOOSTER_CLUB]: '/booster-club-dashboard',
    [UserRole.COLLEGE_SCOUT]: '/college-scout-dashboard',
    [UserRole.YOUTH_COACH]: '/youth-coach-dashboard',
    [UserRole.ADMIN]: '/admin-dashboard',
  };
  
  return routeMap[role] || '/dashboard';
}