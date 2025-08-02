import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { UserRole } from '@prisma/client';

// Define protected routes and their required roles
const protectedRoutes: Record<string, UserRole[]> = {
  '/dashboard': [UserRole.STUDENT],
  '/parent-dashboard': [UserRole.PARENT],
  '/teacher-dashboard': [UserRole.TEACHER],
  '/coach-dashboard': [UserRole.COACH],
  '/athletic-director-dashboard': [UserRole.ATHLETIC_DIRECTOR],
  '/superintendent-dashboard': [UserRole.SUPERINTENDENT],
  '/school-board-dashboard': [UserRole.SCHOOL_BOARD],
  '/booster-club-dashboard': [UserRole.BOOSTER_CLUB],
  '/college-scout-dashboard': [UserRole.COLLEGE_SCOUT],
  '/youth-coach-dashboard': [UserRole.YOUTH_COACH],
  '/admin': [UserRole.ADMIN],
  '/api/admin': [UserRole.ADMIN],
};

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/auth/signin',
  '/auth/signup',
  '/auth/error',
  '/auth/verify-request',
  '/beta',
  '/community',
  '/feed',
  '/api/auth',
  // STAKEHOLDER DEMOS - NO LOGIN REQUIRED
  '/grandpa-jim-demo',
  '/poster/create',
  '/poster/gallery',
  '/stadium/create',
  '/media-kit',
  '/recruiting',
  '/discover',
];

export default withAuth(
  function middleware(req) {
    const path = req.nextUrl.pathname;
    const token = req.nextauth.token;
    
    // Check if route requires specific role
    for (const [route, roles] of Object.entries(protectedRoutes)) {
      if (path.startsWith(route)) {
        if (!token || !roles.includes(token.role as UserRole)) {
          // Redirect to appropriate dashboard based on user's actual role
          if (token?.role) {
            const dashboardMap: Record<UserRole, string> = {
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
              [UserRole.ADMIN]: '/admin',
            };
            
            const correctDashboard = dashboardMap[token.role as UserRole];
            if (correctDashboard && correctDashboard !== path) {
              return NextResponse.redirect(new URL(correctDashboard, req.url));
            }
          }
          
          // No valid role, redirect to signin
          return NextResponse.redirect(new URL('/auth/signin', req.url));
        }
      }
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        
        // Allow public routes
        if (publicRoutes.some(route => path.startsWith(route))) {
          return true;
        }
        
        // Require authentication for all other routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
};