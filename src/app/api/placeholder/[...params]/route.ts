import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { params: string[] } }
) {
  try {
    const [width, height] = params.params;
    const url = new URL(request.url);
    const text = url.searchParams.get('text') || 'UltraPreps';
    
    // Parse dimensions
    const w = parseInt(width) || 400;
    const h = parseInt(height) || 400;
    
    // Generate SVG placeholder
    const svg = `
      <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1f2937;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#111827;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
              fill="#F59E0B" font-family="Arial, sans-serif" font-size="${Math.max(12, Math.min(w, h) / 8)}" 
              font-weight="bold">
          ${decodeURIComponent(text)}
        </text>
        <rect x="5" y="5" width="${w-10}" height="${h-10}" fill="none" stroke="#F59E0B" stroke-width="2" stroke-dasharray="5,5"/>
      </svg>
    `;
    
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Placeholder API error:', error);
    
    // Return minimal SVG on error
    const svg = `
      <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#1f2937"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" 
              fill="#F59E0B" font-family="Arial, sans-serif" font-size="24" font-weight="bold">
          UltraPreps
        </text>
      </svg>
    `;
    
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }
}