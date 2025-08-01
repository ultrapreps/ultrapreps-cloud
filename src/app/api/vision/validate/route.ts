import { NextRequest, NextResponse } from 'next/server';
import { VisionQA } from '@/lib/bots/VisionQA';

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, assetType, context } = await req.json();
    
    if (!imageUrl || !assetType) {
      return NextResponse.json(
        { error: 'Image URL and asset type are required' },
        { status: 400 }
      );
    }
    
    // Initialize VisionQA
    const visionQA = new VisionQA();
    
    // Perform validation based on asset type
    let result;
    
    switch (assetType) {
      case 'herocard':
        result = await visionQA.validateHeroCard(imageUrl, {
          name: context.athleteName || 'Test Athlete',
          sport: context.sport || 'Football',
          school: context.schoolName || 'Test High School',
          schoolColors: context.schoolColors || {
            primary: '#1E3A8A',
            secondary: '#F59E0B'
          }
        });
        break;
        
      case 'mascot':
        result = await visionQA.validateMascot(imageUrl, {
          schoolName: context.schoolName || 'Test High School',
          mascotType: context.mascotType || 'Eagle',
          schoolColors: context.schoolColors || {
            primary: '#1E3A8A',
            secondary: '#F59E0B'
          },
          intendedPose: context.pose || 'standing proud'
        });
        break;
        
      default:
        result = await visionQA.validateAsset(imageUrl, {
          assetType: assetType as any,
          schoolName: context.schoolName || 'Test High School',
          schoolColors: context.schoolColors || {
            primary: '#1E3A8A',
            secondary: '#F59E0B'
          },
          intendedUse: context.intendedUse || 'general',
          targetAudience: context.targetAudience || 'public'
        });
    }
    
    // Log validation result
    console.log(`🎯 VisionQA Result for ${assetType}:`);
    console.log(`   - Score: ${(result.score * 100).toFixed(1)}%`);
    console.log(`   - Passed: ${result.passed ? '✅' : '❌'}`);
    console.log(`   - Issues: ${result.issues.length}`);
    
    return NextResponse.json({
      success: true,
      validation: result,
      recommendation: result.requiresRegeneration ? 
        'Asset should be regenerated with improvements' : 
        'Asset meets quality standards'
    });
    
  } catch (error) {
    console.error('Vision validation error:', error);
    return NextResponse.json(
      { error: 'Failed to validate asset' },
      { status: 500 }
    );
  }
}

// GET endpoint to check VisionQA status
export async function GET() {
  const hasOpenAIKey = !!process.env.OPENAI_API_KEY;
  
  return NextResponse.json({
    status: 'operational',
    openAIEnabled: hasOpenAIKey,
    mode: hasOpenAIKey ? 'AI-powered validation' : 'Mock validation',
    qualityThreshold: 0.8,
    brandingThreshold: 0.9,
    supportedAssetTypes: ['herocard', 'mascot', 'poster', 'banner', 'profile']
  });
}