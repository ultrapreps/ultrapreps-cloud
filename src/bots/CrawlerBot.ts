// UNIVERSAL STUDENT INTERFACES - Not just athletes!
export interface StudentProfile {
  name: string;
  activities: string[];
  achievements: string[];
  roles: string[];
  stats?: StudentStats;
  imageUrl?: string;
}

export interface StudentStats {
  gpa?: string;
  volunteerHours?: string;
  leadershipPositions?: number;
  competitionResults?: string[];
  performanceRatings?: string[];
}

export interface SchoolData {
  name: string;
  location: string;
  enrollment: string;
  mascot: string;
  colors: string[];
  athletics: AthleticsData;
  performingArts: PerformingArtsData;
  academics: AcademicsData;
  clubs: ClubsData;
  competitions: CompetitionsData;
}

export interface AthleticsData {
  sports: string[];
  conferences: string[];
  championships: string[];
  coaches: string[];
}

export interface PerformingArtsData {
  theater: {
    productions: string[];
    competitions: string[];
    directors: string[];
  };
  band: {
    ensembles: string[];
    competitions: string[];
    directors: string[];
  };
  choir: {
    groups: string[];
    competitions: string[];
  };
}

export interface AcademicsData {
  gpa: string;
  testScores: string;
  programs: string[];
  competitions: {
    mathTeam: string[];
    debate: string[];
    academicDecathlon: string[];
    robotics: string[];
    chess: string[];
    scienceOlympiad: string[];
  };
}

export interface ClubsData {
  gaming: string[];
  service: string[];
  academic: string[];
  special: string[];
  military: string[];
  leadership: string[];
  visual: string[];
}

export interface CompetitionsData {
  recentWins: string[];
  upcoming: string[];
}

export interface ActivityData {
  recentProductions?: string[];
  upcomingAuditions?: string[];
  competitions?: string[];
  awards?: string[];
  opportunities?: string[];
  performances?: string[];
  ensembles?: string[];
  team?: string;
  achievements?: string[];
  mentors?: string[];
  teams?: string[];
  tournaments?: string[];
  unit?: string;
  leadership?: string[];
  message?: string;
}

// CrawlerBot - Universal Student Research AI
// Researches schools and ALL student activities, not just sports
export class CrawlerBot {
  private status: {
    name: string;
    status: 'active' | 'idle' | 'processing' | 'error';
    lastAction: string;
    uptime: number;
    processedRequests: number;
  };
  private startTime: number;

  constructor() {
    this.status = {
      name: 'CrawlerBot',
      status: 'idle',
      lastAction: 'System initialized',
      uptime: 0,
      processedRequests: 0
    };
    this.startTime = Date.now();
  }

  private updateStatus(action: string, status: 'active' | 'idle' | 'processing' | 'error' = 'active') {
    this.status.status = status;
    this.status.lastAction = action;
    this.status.uptime = Date.now() - this.startTime;
    this.status.processedRequests++;
  }

  getStatus() {
    this.status.uptime = Date.now() - this.startTime;
    return { ...this.status };
  }
  
  async enrichSchoolData(schoolName: string): Promise<SchoolData> {
    this.updateStatus(`Researching comprehensive data for ${schoolName}`, 'processing');
    console.log(`🤖 CrawlerBot researching ALL activities at: ${schoolName}`);
    
    // This would integrate with real web scraping and APIs
    // For now, return comprehensive mock data for ALL student types
    const schoolData: SchoolData = {
      name: schoolName,
      location: "Research Location", 
      enrollment: "2,500 students",
      mascot: "Research Mascot",
      colors: ["#FF0000", "#000000"],
      
      // ATHLETICS
      athletics: {
        sports: ["Football", "Basketball", "Soccer", "Track", "Swimming", "Tennis", "Golf", "Wrestling"],
        conferences: ["District 5A"],
        championships: ["2023 Regional Champions"],
        coaches: ["John Smith - Head Football", "Jane Doe - Basketball"]
      },
      
      // PERFORMING ARTS
      performingArts: {
        theater: {
          productions: ["Romeo & Juliet 2024", "The Lion King 2023"],
          competitions: ["UIL One Act Play - State Qualifier"],
          directors: ["Ms. Johnson - Theater Director"]
        },
        band: {
          ensembles: ["Marching Band", "Jazz Band", "Concert Band", "Orchestra"],
          competitions: ["Marching Band State Champions 2023"],
          directors: ["Mr. Williams - Band Director"]
        },
        choir: {
          groups: ["Concert Choir", "Chamber Singers", "Show Choir"],
          competitions: ["All-State Choir Qualifiers: 3 students"]
        }
      },
      
      // ACADEMICS & COMPETITIONS
      academics: {
        gpa: "3.4 average",
        testScores: "SAT: 1150 average",
        programs: ["STEM", "Arts", "CTE", "Dual Credit"],
        competitions: {
          mathTeam: ["District Champions 2024", "Regional Qualifiers"],
          debate: ["State Tournament Participants"],
          academicDecathlon: ["Regional 3rd Place"],
          robotics: ["FIRST Robotics Team 5847", "Regional Finalists"],
          chess: ["District Champions"],
          scienceOlympiad: ["State Qualifiers"]
        }
      },
      
      // CLUBS & SPECIAL INTERESTS
      clubs: {
        gaming: ["Esports Team", "Pokemon TCG Club", "Board Game Society"],
        service: ["National Honor Society", "Key Club", "Beta Club"],
        academic: ["Science Club", "History Club", "Foreign Language Clubs"],
        special: ["Anime Club", "Gaming Club", "Coding Club", "Environmental Club"],
        military: ["Army JROTC Battalion", "Drill Team State Champions"],
        leadership: ["Student Council", "Class Officers", "Peer Mediators"],
        visual: ["Art Club", "Photography Club", "Yearbook", "Digital Media"]
      },
      
      competitions: {
        recentWins: ["Math Team District Champions", "Theater Regional Qualifiers", "Robotics Regional Finalists"],
        upcoming: ["State Academic Decathlon", "Spring Drama Festival", "Pokemon Regional Tournament"]
      }
    };
    
    this.updateStatus(`Completed research for ${schoolName}`, 'active');
    return schoolData;
  }

  // NEW: Research specific activity/competition data for ANY student type
  async enrichActivityData(activityType: string, schoolName: string): Promise<ActivityData> {
    this.updateStatus(`Researching ${activityType} data at ${schoolName}`, 'processing');
    console.log(`🔍 CrawlerBot researching ${activityType} at ${schoolName}`);
    
    const activityDatabase: { [key: string]: ActivityData } = {
      "theater": {
        recentProductions: ["Romeo & Juliet", "The Lion King", "Hamilton"],
        upcomingAuditions: ["Spring Musical Auditions - March 15"],
        competitions: ["UIL One Act Play", "Regional Drama Festival"],
        awards: ["Best Actor - Regional Competition"],
        opportunities: ["Summer Theater Camp", "Community Theater Connections"]
      },
      "band": {
        competitions: ["Marching Band State Championships", "Concert Band Festival"],
        performances: ["Fall Concert Oct 15", "Spring Concert May 10"],
        awards: ["Division 1 Sweepstakes Award"],
        ensembles: ["Marching Band", "Jazz Band", "Concert Band"],
        opportunities: ["All-State Band Auditions", "Honor Band"]
      },
      "robotics": {
        team: "FIRST Robotics Team 5847 - The Techno Tigers",
        competitions: ["Regional Championship", "State Tournament"],
        achievements: ["Innovation Award 2023", "Regional Finalists"],
        mentors: ["Mr. Peterson - Lead Mentor"],
        opportunities: ["Engineering Internships", "STEM Scholarships"]
      },
      "gaming": {
        teams: ["Varsity Esports", "Pokemon TCG Team"],
        tournaments: ["State Esports Championship", "Regional Pokemon Tournament"],
        achievements: ["League of Legends State Qualifiers", "Pokemon Regional Champions"],
        opportunities: ["Gaming Scholarships", "Tournament Prize Pools"]
      },
      "math": {
        competitions: ["Math League", "AMC Competitions", "Academic Decathlon"],
        achievements: ["District Champions", "State Qualifiers"],
        opportunities: ["Math Scholarships", "STEM Summer Programs"],
        mentors: ["Ms. Davis - Math Team Coach"]
      },
      "jrotc": {
        unit: "Army JROTC Battalion",
        competitions: ["Drill Team Championships", "Academic Bowl"],
        leadership: ["Battalion Commander", "Company Commanders"],
        opportunities: ["Military Academy Nominations", "ROTC Scholarships"]
      }
    };
    
    const result = activityDatabase[activityType.toLowerCase()] || {
      message: "Activity type not found, but we're always expanding our database!"
    };
    
    this.updateStatus(`Completed ${activityType} research for ${schoolName}`, 'active');
    return result;
  }

  // Legacy function for backward compatibility
  async fetchAthleteStats(name: string): Promise<StudentProfile> {
    console.log(`🏈 Legacy athlete lookup for: ${name}`);
    return this.fetchStudentProfile(name, "athletics");
  }

  // NEW: Universal student profile lookup
  async fetchStudentProfile(name: string, activityType?: string): Promise<StudentProfile> {
    this.updateStatus(`Fetching profile for ${name} (${activityType || 'all activities'})`, 'processing');
    console.log(`👤 Researching student profile: ${name} (${activityType || 'all activities'})`);
    
    // This would integrate with real APIs and databases
    // Mock comprehensive student data
    const profile = {
      name: name,
      activities: ["Football", "National Honor Society", "Student Council"],
      achievements: ["Team Captain", "Honor Roll", "Volunteer of the Year"],
      roles: ["Team Leader", "Student Representative"],
      stats: {
        gpa: "3.8",
        volunteerHours: "150+",
        leadershipPositions: 3
      }
    };
    
    this.updateStatus(`Completed profile research for ${name}`, 'active');
    return profile;
  }
}