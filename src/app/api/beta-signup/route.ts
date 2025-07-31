import { NextRequest, NextResponse } from 'next/server';

interface BetaSignupData {
  email: string;
  name: string;
  school: string;
  role: string;
  timestamp: string;
}

// In-memory storage for beta signups (in production, use a database)
const betaSignups: BetaSignupData[] = [];

export async function POST(request: NextRequest) {
  try {
    const data: BetaSignupData = await request.json();
    
    // Validate required fields
    if (!data.email || !data.name || !data.school || !data.role) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingSignup = betaSignups.find(signup => signup.email === data.email);
    if (existingSignup) {
      return NextResponse.json(
        { error: 'Email already registered for beta' },
        { status: 409 }
      );
    }

    // Add to beta signups
    betaSignups.push({
      ...data,
      timestamp: new Date().toISOString()
    });

    // Log the signup (in production, this would go to your analytics/database)
    console.log('New beta signup:', {
      email: data.email,
      name: data.name,
      school: data.school,
      role: data.role,
      timestamp: data.timestamp,
      totalSignups: betaSignups.length
    });

    // TODO: In production, add to email list, send welcome email, etc.

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully joined beta waitlist',
        position: betaSignups.length
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Beta signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve beta signups (admin only in production)
export async function GET() {
  return NextResponse.json({
    totalSignups: betaSignups.length,
    signups: betaSignups.map(signup => ({
      name: signup.name,
      school: signup.school,
      role: signup.role,
      timestamp: signup.timestamp
      // Don't expose emails in this endpoint
    }))
  });
}