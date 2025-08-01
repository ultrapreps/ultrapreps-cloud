import { NextRequest, NextResponse } from 'next/server';
import { createUser, getUserByEmail } from '@/lib/db/users';
import { searchSchools } from '@/lib/db/schools';
import { UserRole } from '@prisma/client';

export async function POST(req: NextRequest) {
  try {
    const { email, password, firstName, lastName, role, school } = await req.json();

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !role || !school) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Find or create school
    let schoolId: string | undefined;
    const schools = await searchSchools(school);
    
    if (schools.length > 0) {
      // Use the first matching school
      schoolId = schools[0].id;
    }
    // Note: If no school found, we'll create user without school association
    // School can be created/linked later

    // Generate username
    const baseUsername = `${firstName.toLowerCase()}_${lastName.toLowerCase()}`.replace(/[^a-z0-9_]/g, '');
    const timestamp = Date.now().toString().slice(-4);
    const username = `${baseUsername}_${timestamp}`;

    // Create user
    const user = await createUser({
      email,
      username,
      password,
      firstName,
      lastName,
      role: role as UserRole,
      schoolId,
      bio: role === UserRole.STUDENT ? 'Student Athlete' : 
           role === UserRole.PARENT ? 'Proud Parent' : 
           'Coach & Mentor',
    });

    // Return success (don't include sensitive data)
    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        name: `${user.firstName} ${user.lastName}`,
        role: user.role,
      }
    });

  } catch (error) {
    console.error('Signup error:', error);
    const err = error as { code?: string; meta?: { target?: string[] } };
    
    // Handle specific Prisma errors
    if (err.code === 'P2002') {
      const field = err.meta?.target?.[0];
      if (field === 'email') {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 409 }
        );
      }
      if (field === 'username') {
        return NextResponse.json(
          { error: 'Username already taken. Please try again.' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    );
  }
}