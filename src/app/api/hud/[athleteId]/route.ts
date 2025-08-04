import { NextRequest, NextResponse } from 'next/server';

// HUD Data Interface from Bible
interface HUDData {
  hype_score: number;
  recent_stats: {
    [sport: string]: Record<string, string | number>;
  };
  achievements: string[];
  highlight_reels: Array<{
    title: string;
    url: string;
  }>;
  academics: {
    gpa: number;
    honors: string[];
  };
  recruiting: {
    contact: {
      coach_email: string;
    };
    test_scores: {
      sat?: number;
      act?: number;
    };
  };
  share_actions: {
    share_url: string;
    boost_hype: boolean;
    donate: boolean;
  };
}

// Mock data - would be replaced with real database calls
const MOCK_HUD_DATA: Record<string, HUDData> = {
  'kolebecker': {
    hype_score: 86,
    recent_stats: {
      football: { yards: 998, receptions: 48, tds: 12 },
      track: { "100m": "11.2s" }
    },
    achievements: ["All-District 1st Team", "State Champion"],
    highlight_reels: [
      {
        title: "2024 Season Highlights",
        url: "https://cdn.ultrapreps.com/highlights/kolebecker2024.mp4"
      }
    ],
    academics: {
      gpa: 3.7,
      honors: ["NHS", "Honor Roll"]
    },
    recruiting: {
      contact: { coach_email: "coach@school.edu" },
      test_scores: { sat: 1300, act: 28 }
    },
    share_actions: {
      share_url: "https://ultrapreps.com/athlete/kolebecker",
      boost_hype: true,
      donate: true
    }
  },
  'marcus-johnson': {
    hype_score: 94,
    recent_stats: {
      football: { yards: 1247, receptions: 67, tds: 18 },
      basketball: { points: 24.5, assists: 8.2, rebounds: 6.1 }
    },
    achievements: ["State Champion", "MVP", "All-Conference", "Team Captain"],
    highlight_reels: [
      {
        title: "Championship Game Highlights",
        url: "https://cdn.ultrapreps.com/highlights/marcus-championship.mp4"
      },
      {
        title: "Season Best Moments",
        url: "https://cdn.ultrapreps.com/highlights/marcus-season.mp4"
      }
    ],
    academics: {
      gpa: 3.87,
      honors: ["National Honor Society", "AP Scholar", "Student Council"]
    },
    recruiting: {
      contact: { coach_email: "recruiting@example.edu" },
      test_scores: { sat: 1340, act: 29 }
    },
    share_actions: {
      share_url: "https://ultrapreps.com/athlete/marcus-johnson",
      boost_hype: true,
      donate: true
    }
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: { athleteId: string } }
) {
  try {
    const athleteId = params.athleteId;
    
    // Get role from query params for role-specific views
    const role = request.nextUrl.searchParams.get('role') || 'public';
    
    // Get base HUD data
    const hudData = MOCK_HUD_DATA[athleteId];
    
    if (!hudData) {
      return NextResponse.json(
        { error: 'Athlete not found' },
        { status: 404 }
      );
    }

    // Customize data based on role
    let responseData = { ...hudData };

    switch (role) {
      case 'student':
        // Students see motivational feedback and progress tracking
        responseData = {
          ...responseData,
          motivational_message: "Keep pushing! Your HYPE is trending upward!",
          progress_tracking: {
            weekly_improvement: "+5.2%",
            next_milestone: "100 HYPE Score",
            achievement_progress: "2/3 State Records"
          }
        };
        break;

      case 'parent':
        // Parents see brag mode and family giving options
        responseData = {
          ...responseData,
          brag_mode: {
            milestones: ["First Touchdown", "Academic Honor Roll", "Team Captain"],
            share_templates: [
              "Proud of Marcus's championship win! 🏆",
              "Honor roll again! Academic excellence! 📚"
            ]
          },
          family_giving: {
            suggested_amount: "$25",
            team_fund_goal: "$5000",
            current_progress: "$3200"
          }
        };
        break;

      case 'recruiter':
        // Recruiters see academic + athletic data with contact options
        responseData = {
          ...responseData,
          recruiting_package: {
            full_transcript: "Available upon request",
            video_packages: [
              "Senior Highlights (12 min)",
              "Skills & Drills (8 min)",
              "Game Film Collection (45 min)"
            ],
            coach_contact: "Coach Smith - coach@school.edu",
            visit_availability: "Available weekends"
          },
          comparative_metrics: {
            peer_rank: "Top 5%",
            state_rank: "Top 15%",
            position_rank: "#3 QB in region"
          }
        };
        break;

      case 'coach':
        // Coaches see team overview and messaging options
        responseData = {
          ...responseData,
          team_context: {
            team_role: "Starting QB, Team Captain",
            leadership_score: 9.2,
            attendance: "100%",
            practice_performance: "Excellent"
          },
          coaching_tools: {
            send_message: true,
            schedule_meeting: true,
            performance_notes: "Exceptional leadership in playoffs"
          }
        };
        break;
    }

    // Add real-time timestamp
    responseData.last_updated = new Date().toISOString();

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('HUD API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST endpoint for boosting HYPE
export async function POST(
  request: NextRequest,
  { params }: { params: { athleteId: string } }
) {
  try {
    const athleteId = params.athleteId;
    const body = await request.json();
    const { action, amount = 1 } = body;

    if (action === 'boost') {
      // Simulate HYPE boost
      const currentData = MOCK_HUD_DATA[athleteId];
      if (currentData) {
        currentData.hype_score += amount;
        
        return NextResponse.json({
          success: true,
          new_hype_score: currentData.hype_score,
          message: `HYPE boosted by ${amount}!`
        });
      }
    }

    if (action === 'share') {
      // Track share action
      return NextResponse.json({
        success: true,
        share_url: MOCK_HUD_DATA[athleteId]?.share_actions?.share_url,
        message: 'Share tracked successfully!'
      });
    }

    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );

  } catch (error) {
    console.error('HUD POST Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}