// MIDDLEWARE TEMPORARILY DISABLED TO FIX REDIRECT LOOPS
// The withAuth middleware was causing infinite redirects
// 
// import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
// import { UserRole } from '@prisma/client';

// Simplified middleware that allows all requests through temporarily
export default function middleware() {
  // Allow all requests through for now
  return NextResponse.next();
}

// Disable matcher temporarily
export const config = {
  matcher: [],
};