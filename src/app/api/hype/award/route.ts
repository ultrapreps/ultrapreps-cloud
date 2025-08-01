import { NextRequest, NextResponse } from 'next/server';
import { HypeManager } from '@/lib/hype/HypeManager';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    // Check authentication (in production, verify admin/system role)
    const session = await getServerSession(authOptions);
    
    const { userId, amount, type, description, metadata } = await req.json();
    
    // Validate required fields
    if (!userId || !amount || !type || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Initialize HypeManager
    const hypeManager = new HypeManager();
    
    // Award HYPE
    const hypeEvent = await hypeManager.awardHype({
      userId,
      amount,
      type,
      description,
      metadata
    });
    
    // Get updated balance
    const newBalance = await hypeManager.getBalance(userId);
    
    return NextResponse.json({
      success: true,
      event: hypeEvent,
      newBalance
    });
    
  } catch (error) {
    console.error('HYPE award error:', error);
    return NextResponse.json(
      { error: 'Failed to award HYPE' },
      { status: 500 }
    );
  }
}