import { NextRequest, NextResponse } from 'next/server';
import { HypeManager } from '@/lib/hype/HypeManager';

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    const hypeManager = new HypeManager();
    const balance = await hypeManager.getBalance(userId);
    const weeklyHype = await hypeManager.getWeeklyHype(userId);
    const history = await hypeManager.getHistory(userId, 10);
    
    return NextResponse.json({
      userId,
      balance,
      weeklyHype,
      recentTransactions: history,
      lastUpdated: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Balance fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch balance' },
      { status: 500 }
    );
  }
}