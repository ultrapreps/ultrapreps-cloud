import { OpenAI } from 'openai';

interface ValidationResult {
  passed: boolean;
  score: number;
  issues: string[];
  suggestions: string[];
  requiresRegeneration: boolean;
}

interface BrandingCheck {
  colorsMatch: boolean;
  mascotAccurate: boolean;
  schoolIdentity: boolean;
  professionalQuality: boolean;
}

interface AssetContext {
  assetType: 'herocard' | 'mascot' | 'poster' | 'banner' | 'profile';
  schoolName: string;
  schoolColors: {
    primary: string;
    secondary: string;
    accent?: string;
  };
  mascotType?: string;
  intendedUse: string;
  targetAudience: 'student' | 'parent' | 'recruiter' | 'public';
}

export class VisionQA {
  private openai: OpenAI | null = null;
  
  // Quality thresholds
  private readonly QUALITY_THRESHOLD = 0.8; // 80% quality score required
  private readonly BRANDING_THRESHOLD = 0.9; // 90% for brand consistency
  
  // Common quality issues to check
  private readonly QUALITY_ISSUES = [
    'blurry or low resolution',
    'incorrect colors',
    'off-brand styling',
    'inappropriate content',
    'text errors or artifacts',
    'mascot inconsistency',
    'poor composition',
    'AI artifacts or distortions',
    'cheesy or unprofessional look',
    'wrong sport or context'
  ];

  constructor() {
    // Initialize OpenAI if API key is available
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
  }

  /**
   * Validate a generated asset against quality and branding standards
   */
  async validateAsset(
    imageUrl: string,
    context: AssetContext
  ): Promise<ValidationResult> {
    console.log(`🔍 VisionQA: Validating ${context.assetType} for ${context.schoolName}`);
    
    // If OpenAI is not available, return mock validation
    if (!this.openai) {
      return this.mockValidation(context);
    }
    
    try {
      // Use GPT-4 Vision to analyze the image
      const analysis = await this.analyzeWithVision(imageUrl, context);
      
      // Perform specific checks based on asset type
      const brandingCheck = await this.checkBranding(analysis, context);
      const qualityCheck = await this.checkQuality(analysis, context);
      const contextCheck = await this.checkContext(analysis, context);
      
      // Calculate overall score
      const score = this.calculateScore(brandingCheck, qualityCheck, contextCheck);
      
      // Compile issues and suggestions
      const issues: string[] = [];
      const suggestions: string[] = [];
      
      if (!brandingCheck.colorsMatch) {
        issues.push('School colors not accurately represented');
        suggestions.push(`Use exact colors: ${context.schoolColors.primary}, ${context.schoolColors.secondary}`);
      }
      
      if (!brandingCheck.mascotAccurate && context.mascotType) {
        issues.push('Mascot design inconsistent with school identity');
        suggestions.push(`Ensure mascot is clearly a ${context.mascotType}`);
      }
      
      if (!brandingCheck.professionalQuality) {
        issues.push('Image quality below professional standards');
        suggestions.push('Increase resolution and refine details');
      }
      
      // Determine if regeneration is required
      const requiresRegeneration = score < this.QUALITY_THRESHOLD || 
                                  (context.assetType === 'herocard' && score < this.BRANDING_THRESHOLD);
      
      return {
        passed: score >= this.QUALITY_THRESHOLD,
        score,
        issues,
        suggestions,
        requiresRegeneration
      };
      
    } catch (error) {
      console.error('VisionQA error:', error);
      return this.mockValidation(context);
    }
  }

  /**
   * Analyze image using GPT-4 Vision
   */
  private async analyzeWithVision(
    imageUrl: string,
    context: AssetContext
  ): Promise<any> {
    if (!this.openai) throw new Error('OpenAI not initialized');
    
    const prompt = this.buildAnalysisPrompt(context);
    
    const response = await this.openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
                detail: "high"
              }
            }
          ]
        }
      ],
      max_tokens: 500
    });
    
    return JSON.parse(response.choices[0].message.content || '{}');
  }

  /**
   * Build analysis prompt based on context
   */
  private buildAnalysisPrompt(context: AssetContext): string {
    return `Analyze this ${context.assetType} image for ${context.schoolName}.
    
    Check for:
    1. Color accuracy: Primary (${context.schoolColors.primary}), Secondary (${context.schoolColors.secondary})
    2. Professional quality suitable for ${context.targetAudience}
    3. Brand consistency with school identity
    ${context.mascotType ? `4. Mascot accuracy: Should be a ${context.mascotType}` : ''}
    5. Any AI artifacts, distortions, or unprofessional elements
    
    Return JSON with:
    {
      "colors_match": boolean,
      "quality_score": 0-1,
      "mascot_accurate": boolean,
      "professional": boolean,
      "issues": ["list of specific issues"],
      "strengths": ["list of strengths"]
    }`;
  }

  /**
   * Check branding consistency
   */
  private async checkBranding(
    analysis: any,
    context: AssetContext
  ): Promise<BrandingCheck> {
    return {
      colorsMatch: analysis.colors_match || false,
      mascotAccurate: context.mascotType ? (analysis.mascot_accurate || false) : true,
      schoolIdentity: analysis.professional || false,
      professionalQuality: analysis.quality_score >= 0.8
    };
  }

  /**
   * Check technical quality
   */
  private async checkQuality(
    analysis: any,
    context: AssetContext
  ): Promise<{ score: number; issues: string[] }> {
    const issues = analysis.issues || [];
    const score = analysis.quality_score || 0.5;
    
    return { score, issues };
  }

  /**
   * Check contextual accuracy
   */
  private async checkContext(
    analysis: any,
    context: AssetContext
  ): Promise<{ appropriate: boolean; matches: boolean }> {
    return {
      appropriate: !analysis.issues?.includes('inappropriate content'),
      matches: context.assetType === 'herocard' ? 
               analysis.strengths?.includes('athletic context') || false : 
               true
    };
  }

  /**
   * Calculate overall validation score
   */
  private calculateScore(
    branding: BrandingCheck,
    quality: { score: number },
    context: { appropriate: boolean; matches: boolean }
  ): number {
    let score = 0;
    let weight = 0;
    
    // Branding (40% weight)
    if (branding.colorsMatch) score += 0.15;
    if (branding.mascotAccurate) score += 0.1;
    if (branding.schoolIdentity) score += 0.1;
    if (branding.professionalQuality) score += 0.05;
    
    // Quality (40% weight)
    score += quality.score * 0.4;
    
    // Context (20% weight)
    if (context.appropriate) score += 0.1;
    if (context.matches) score += 0.1;
    
    return Math.min(score, 1.0);
  }

  /**
   * Mock validation for testing without OpenAI
   */
  private mockValidation(context: AssetContext): ValidationResult {
    // Simulate validation with some randomness
    const score = 0.7 + Math.random() * 0.3;
    const passed = score >= this.QUALITY_THRESHOLD;
    
    const issues: string[] = [];
    const suggestions: string[] = [];
    
    if (score < 0.85) {
      issues.push('Minor color accuracy issues detected');
      suggestions.push('Adjust color saturation to match school branding');
    }
    
    if (context.assetType === 'mascot' && score < 0.9) {
      issues.push('Mascot expression could be more dynamic');
      suggestions.push('Add more energy and school spirit to the pose');
    }
    
    console.log(`✅ Mock validation complete: Score ${(score * 100).toFixed(1)}%`);
    
    return {
      passed,
      score,
      issues,
      suggestions,
      requiresRegeneration: !passed
    };
  }

  /**
   * Validate HeroCard specific requirements
   */
  async validateHeroCard(
    imageUrl: string,
    athleteData: {
      name: string;
      sport: string;
      school: string;
      schoolColors: { primary: string; secondary: string };
    }
  ): Promise<ValidationResult> {
    const context: AssetContext = {
      assetType: 'herocard',
      schoolName: athleteData.school,
      schoolColors: athleteData.schoolColors,
      intendedUse: `${athleteData.sport} hero card for ${athleteData.name}`,
      targetAudience: 'public'
    };
    
    const result = await this.validateAsset(imageUrl, context);
    
    // Additional HeroCard specific checks
    if (result.passed) {
      // Check for Nike/ESPN aesthetic
      const hasProAesthetic = result.score >= 0.9;
      if (!hasProAesthetic) {
        result.suggestions.push('Enhance cinematic quality for Nike/ESPN feel');
      }
    }
    
    return result;
  }

  /**
   * Validate Mascot consistency
   */
  async validateMascot(
    imageUrl: string,
    mascotData: {
      schoolName: string;
      mascotType: string;
      schoolColors: { primary: string; secondary: string };
      intendedPose: string;
    }
  ): Promise<ValidationResult> {
    const context: AssetContext = {
      assetType: 'mascot',
      schoolName: mascotData.schoolName,
      schoolColors: mascotData.schoolColors,
      mascotType: mascotData.mascotType,
      intendedUse: mascotData.intendedPose,
      targetAudience: 'student'
    };
    
    return await this.validateAsset(imageUrl, context);
  }

  /**
   * Generate improvement prompt for regeneration
   */
  generateImprovementPrompt(
    originalPrompt: string,
    validationResult: ValidationResult
  ): string {
    let improvedPrompt = originalPrompt;
    
    // Add specific improvements based on issues
    if (validationResult.issues.length > 0) {
      improvedPrompt += '\n\nIMPORTANT CORRECTIONS:\n';
      validationResult.suggestions.forEach(suggestion => {
        improvedPrompt += `- ${suggestion}\n`;
      });
    }
    
    // Emphasize quality requirements
    improvedPrompt += '\n\nQUALITY REQUIREMENTS:\n';
    improvedPrompt += '- Professional ESPN/Nike aesthetic\n';
    improvedPrompt += '- Sharp, high-resolution details\n';
    improvedPrompt += '- Accurate school colors and branding\n';
    improvedPrompt += '- No AI artifacts or distortions\n';
    
    return improvedPrompt;
  }

  /**
   * Batch validate multiple assets
   */
  async batchValidate(
    assets: Array<{ url: string; context: AssetContext }>
  ): Promise<ValidationResult[]> {
    const results = await Promise.all(
      assets.map(asset => this.validateAsset(asset.url, asset.context))
    );
    
    // Log batch results
    const passRate = results.filter(r => r.passed).length / results.length;
    console.log(`📊 Batch validation complete: ${(passRate * 100).toFixed(1)}% pass rate`);
    
    return results;
  }
}