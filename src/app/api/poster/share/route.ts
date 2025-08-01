import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface SharePosterRequest {
  posterId: string;
  platform: 'twitter' | 'instagram' | 'facebook' | 'download';
  caption?: string;
  hashtags?: string[];
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { posterId, platform, caption, hashtags = [] } = await req.json() as SharePosterRequest;
    
    if (!posterId || !platform) {
      return NextResponse.json(
        { error: 'Poster ID and platform are required' },
        { status: 400 }
      );
    }
    
    // Get poster details
    const poster = await prisma.poster.findUnique({
      where: { id: posterId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true
          }
        }
      }
    });
    
    if (!poster) {
      return NextResponse.json(
        { error: 'Poster not found' },
        { status: 404 }
      );
    }
    
    // Build sharing data
    const defaultCaption = caption || `Check out this ${poster.type.toLowerCase().replace('_', ' ')} poster!`;
    const defaultHashtags = [
      'UltraPreps',
      'HighSchoolSports',
      ...hashtags
    ].map(tag => tag.startsWith('#') ? tag : `#${tag}`);
    
    // Generate share URLs based on platform
    let shareUrl = '';
    let shareData: any = {
      posterId,
      platform,
      caption: defaultCaption,
      hashtags: defaultHashtags,
      posterUrl: poster.imageUrl,
      timestamp: new Date()
    };
    
    switch (platform) {
      case 'twitter':
        const twitterText = `${defaultCaption} ${defaultHashtags.join(' ')}`;
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(poster.imageUrl)}`;
        shareData.shareUrl = shareUrl;
        break;
        
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(poster.imageUrl)}`;
        shareData.shareUrl = shareUrl;
        break;
        
      case 'instagram':
        // Instagram doesn't support direct URL sharing
        // Return instructions for manual sharing
        shareData.instructions = [
          '1. Download the poster image',
          '2. Open Instagram app',
          '3. Create new post with downloaded image',
          `4. Use caption: ${defaultCaption}`,
          `5. Add hashtags: ${defaultHashtags.join(' ')}`
        ];
        break;
        
      case 'download':
        // Return download URL
        shareData.downloadUrl = poster.imageUrl;
        shareData.filename = `ultrapreps-${poster.type.toLowerCase()}-${poster.id}.jpg`;
        break;
    }
    
    // Update poster engagement metrics
    await prisma.poster.update({
      where: { id: posterId },
      data: {
        shares: { increment: 1 }
      }
    });
    
    console.log(`📱 Poster ${posterId} shared to ${platform}`);
    
    return NextResponse.json({
      success: true,
      platform,
      shareData
    });
    
  } catch (error) {
    console.error('Poster sharing error:', error);
    return NextResponse.json(
      { error: 'Failed to share poster' },
      { status: 500 }
    );
  }
}

// GET endpoint to get share statistics
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const posterId = searchParams.get('posterId');
    
    if (!posterId) {
      return NextResponse.json(
        { error: 'Poster ID is required' },
        { status: 400 }
      );
    }
    
    // Get poster with share count
    const poster = await prisma.poster.findUnique({
      where: { id: posterId },
      select: {
        shares: true
      }
    });
    
    if (!poster) {
      return NextResponse.json(
        { error: 'Poster not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      posterId,
      totalShares: poster.shares,
      message: 'Detailed share analytics coming soon'
    });
    
  } catch (error) {
    console.error('Share statistics error:', error);
    return NextResponse.json(
      { error: 'Failed to get share statistics' },
      { status: 500 }
    );
  }
}