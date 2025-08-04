// 🏃 ULTRAPREPS TRACK ATHLETE COMPARISON SYSTEM
// Advanced track performance analysis and head-to-head comparisons

import { botNetwork } from './botSystem';

export interface TrackEvent {
  eventName: string;
  eventType: 'sprint' | 'distance' | 'hurdles' | 'field' | 'relay';
  unit: 'time' | 'distance' | 'height';
  format: string; // e.g., "mm:ss.xx", "ft-in", "m"
}

export interface TrackPerformance {
  eventName: string;
  time?: string;
  mark?: string;
  distance?: string;
  meetName: string;
  meetDate: string;
  place: number;
  season: string;
  conditions?: string;
  wind?: string;
  isPR: boolean;
  isSB: boolean; // Season Best
  source: 'UIL' | 'MaxPreps' | 'Athletic.net' | 'TexasTrack' | 'MileSplit';
}

export interface AthleteProfile {
  name: string;
  school: string;
  grade: string;
  season: string;
  events: string[];
  personalRecords: TrackPerformance[];
  seasonBests: TrackPerformance[];
  allPerformances: TrackPerformance[];
  rankings: {
    district?: number;
    region?: number;
    state?: number;
    class?: string;
  };
}

export interface ComparisonResult {
  athlete1: AthleteProfile;
  athlete2: AthleteProfile;
  commonEvents: string[];
  headToHeadResults: {
    eventName: string;
    athlete1Best: TrackPerformance;
    athlete2Best: TrackPerformance;
    winner: string;
    margin: string;
    analysis: string;
  }[];
  overallAnalysis: string;
  strengthsAndWeaknesses: {
    athlete1Strengths: string[];
    athlete1Weaknesses: string[];
    athlete2Strengths: string[];
    athlete2Weaknesses: string[];
  };
}

// Standard track events with conversion capabilities
const TRACK_EVENTS: { [key: string]: TrackEvent } = {
  '100m': { eventName: '100 Meter Dash', eventType: 'sprint', unit: 'time', format: 'ss.xx' },
  '200m': { eventName: '200 Meter Dash', eventType: 'sprint', unit: 'time', format: 'ss.xx' },
  '400m': { eventName: '400 Meter Dash', eventType: 'sprint', unit: 'time', format: 'ss.xx' },
  '800m': { eventName: '800 Meter Run', eventType: 'distance', unit: 'time', format: 'mm:ss.xx' },
  '1600m': { eventName: '1600 Meter Run', eventType: 'distance', unit: 'time', format: 'mm:ss.xx' },
  '3200m': { eventName: '3200 Meter Run', eventType: 'distance', unit: 'time', format: 'mm:ss.xx' },
  '110h': { eventName: '110 Meter Hurdles', eventType: 'hurdles', unit: 'time', format: 'ss.xx' },
  '300h': { eventName: '300 Meter Hurdles', eventType: 'hurdles', unit: 'time', format: 'ss.xx' },
  '4x100': { eventName: '4x100 Meter Relay', eventType: 'relay', unit: 'time', format: 'ss.xx' },
  '4x400': { eventName: '4x400 Meter Relay', eventType: 'relay', unit: 'time', format: 'mm:ss.xx' },
  'hj': { eventName: 'High Jump', eventType: 'field', unit: 'height', format: 'ft-in' },
  'pv': { eventName: 'Pole Vault', eventType: 'field', unit: 'height', format: 'ft-in' },
  'lj': { eventName: 'Long Jump', eventType: 'field', unit: 'distance', format: 'ft-in' },
  'tj': { eventName: 'Triple Jump', eventType: 'field', unit: 'distance', format: 'ft-in' },
  'shot': { eventName: 'Shot Put', eventType: 'field', unit: 'distance', format: 'ft-in' },
  'discus': { eventName: 'Discus', eventType: 'field', unit: 'distance', format: 'ft-in' }
};

export class TrackComparisonSystem {
  
  async compareAthletes(athlete1Name: string, athlete2Name: string, schoolName: string = 'Marble Falls High School'): Promise<ComparisonResult> {
    console.log(`🏃 Starting comprehensive track comparison: ${athlete1Name} vs ${athlete2Name}`);
    
    // Use bot network to gather comprehensive data
    const [athlete1Data, athlete2Data, schoolTrackData] = await Promise.all([
      this.gatherAthleteData(athlete1Name, schoolName),
      this.gatherAthleteData(athlete2Name, schoolName),
      this.gatherSchoolTrackData(schoolName)
    ]);

    // Find common events
    const commonEvents = this.findCommonEvents(athlete1Data, athlete2Data);
    console.log(`📊 Found ${commonEvents.length} common events: ${commonEvents.join(', ')}`);

    // Perform head-to-head analysis
    const headToHeadResults = await this.analyzeHeadToHead(athlete1Data, athlete2Data, commonEvents);

    // Generate overall analysis
    const overallAnalysis = await this.generateOverallAnalysis(athlete1Data, athlete2Data, headToHeadResults);

    // Identify strengths and weaknesses
    const strengthsAndWeaknesses = this.analyzeStrengthsAndWeaknesses(athlete1Data, athlete2Data, headToHeadResults);

    return {
      athlete1: athlete1Data,
      athlete2: athlete2Data,
      commonEvents,
      headToHeadResults,
      overallAnalysis,
      strengthsAndWeaknesses
    };
  }

  private async gatherAthleteData(athleteName: string, schoolName: string): Promise<AthleteProfile> {
    console.log(`🔍 CrawlerBot gathering comprehensive track data for ${athleteName}`);
    
    // Use the bot network to get athlete profile and track-specific stats
    const [profileData, trackStats] = await Promise.all([
      botNetwork.analyzeStudent(athleteName, schoolName, 'track'),
      this.fetchTrackPerformances(athleteName, schoolName)
    ]);

    return {
      name: athleteName,
      school: schoolName,
      grade: this.extractGrade(profileData.profile),
      season: '2024',
      events: this.extractEvents(trackStats),
      personalRecords: this.extractPersonalRecords(trackStats),
      seasonBests: this.extractSeasonBests(trackStats),
      allPerformances: trackStats.allPerformances || [],
      rankings: this.extractRankings(trackStats)
    };
  }

  private async fetchTrackPerformances(athleteName: string, schoolName: string): Promise<any> {
    console.log(`📊 StatsBot analyzing track performance data for ${athleteName}`);
    
    // Simulate comprehensive track data from multiple sources
    return {
      allPerformances: [
        // 100m performances
        {
          eventName: '100m',
          time: '11.23',
          meetName: 'District 25-5A Championships',
          meetDate: '2024-04-15',
          place: 2,
          season: '2024',
          wind: '+1.2',
          isPR: true,
          isSB: true,
          source: 'UIL'
        },
        {
          eventName: '100m',
          time: '11.45',
          meetName: 'Marble Falls Invitational',
          meetDate: '2024-03-20',
          place: 1,
          season: '2024',
          wind: '+0.8',
          isPR: false,
          isSB: false,
          source: 'Athletic.net'
        },
        // 200m performances
        {
          eventName: '200m',
          time: '22.87',
          meetName: 'District 25-5A Championships',
          meetDate: '2024-04-15',
          place: 1,
          season: '2024',
          wind: '+0.5',
          isPR: true,
          isSB: true,
          source: 'UIL'
        },
        {
          eventName: '200m',
          time: '23.12',
          meetName: 'Cedar Park Relays',
          meetDate: '2024-03-30',
          place: 3,
          season: '2024',
          wind: '+1.1',
          isPR: false,
          isSB: false,
          source: 'MileSplit'
        },
        // 400m performances
        {
          eventName: '400m',
          time: '51.34',
          meetName: 'Regional Championships',
          meetDate: '2024-04-25',
          place: 4,
          season: '2024',
          isPR: true,
          isSB: true,
          source: 'UIL'
        },
        // Long Jump performances
        {
          eventName: 'lj',
          mark: '21-08.50',
          meetName: 'District 25-5A Championships',
          meetDate: '2024-04-15',
          place: 1,
          season: '2024',
          wind: '+1.8',
          isPR: true,
          isSB: true,
          source: 'UIL'
        }
      ],
      rankings: {
        district: 2,
        region: 8,
        state: 25,
        class: '5A'
      }
    };
  }

  private async gatherSchoolTrackData(schoolName: string): Promise<any> {
    console.log(`🏫 Gathering ${schoolName} track program data`);
    
    return botNetwork.researchActivity('track', schoolName);
  }

  private findCommonEvents(athlete1: AthleteProfile, athlete2: AthleteProfile): string[] {
    const athlete1Events = new Set(athlete1.events);
    const athlete2Events = new Set(athlete2.events);
    
    return Array.from(athlete1Events).filter(event => athlete2Events.has(event));
  }

  private async analyzeHeadToHead(
    athlete1: AthleteProfile, 
    athlete2: AthleteProfile, 
    commonEvents: string[]
  ): Promise<ComparisonResult['headToHeadResults']> {
    const results = [];

    for (const event of commonEvents) {
      const athlete1Best = this.getBestPerformance(athlete1, event);
      const athlete2Best = this.getBestPerformance(athlete2, event);

      if (athlete1Best && athlete2Best) {
        const comparison = this.comparePerformances(athlete1Best, athlete2Best, event);
        
        results.push({
          eventName: event,
          athlete1Best,
          athlete2Best,
          winner: comparison.winner,
          margin: comparison.margin,
          analysis: comparison.analysis
        });
      }
    }

    return results;
  }

  private getBestPerformance(athlete: AthleteProfile, event: string): TrackPerformance | null {
    const eventPerformances = athlete.personalRecords.filter(p => p.eventName === event);
    if (eventPerformances.length === 0) return null;

    // Return the performance marked as PR (Personal Record)
    return eventPerformances.find(p => p.isPR) || eventPerformances[0];
  }

  private comparePerformances(perf1: TrackPerformance, perf2: TrackPerformance, event: string): {
    winner: string;
    margin: string;
    analysis: string;
  } {
    const eventInfo = TRACK_EVENTS[event];
    
    if (eventInfo.unit === 'time') {
      const time1 = this.parseTime(perf1.time || '99:99.99');
      const time2 = this.parseTime(perf2.time || '99:99.99');
      
      const winner = time1 < time2 ? 'athlete1' : 'athlete2';
      const margin = Math.abs(time1 - time2).toFixed(2) + ' seconds';
      
      return {
        winner,
        margin,
        analysis: `${winner === 'athlete1' ? 'Athlete 1' : 'Athlete 2'} has the faster time by ${margin}. ${this.getEventAnalysis(event, time1, time2)}`
      };
    } else {
      // Field events - higher/farther is better
      const mark1 = this.parseMark(perf1.mark || '0-00');
      const mark2 = this.parseMark(perf2.mark || '0-00');
      
      const winner = mark1 > mark2 ? 'athlete1' : 'athlete2';
      const margin = Math.abs(mark1 - mark2).toFixed(2) + ' inches';
      
      return {
        winner,
        margin,
        analysis: `${winner === 'athlete1' ? 'Athlete 1' : 'Athlete 2'} has the better mark by ${margin}. ${this.getFieldEventAnalysis(event, mark1, mark2)}`
      };
    }
  }

  private parseTime(timeString: string): number {
    // Convert time string to seconds for comparison
    if (timeString.includes(':')) {
      const [minutes, seconds] = timeString.split(':');
      return parseInt(minutes) * 60 + parseFloat(seconds);
    }
    return parseFloat(timeString);
  }

  private parseMark(markString: string): number {
    // Convert field event marks to inches for comparison
    if (markString.includes('-')) {
      const [feet, inches] = markString.split('-');
      return parseInt(feet) * 12 + parseFloat(inches || '0');
    }
    return parseFloat(markString);
  }

  private getEventAnalysis(event: string, time1: number, time2: number): string {
    const timeDiff = Math.abs(time1 - time2);
    
    if (event === '100m' || event === '200m') {
      if (timeDiff > 0.5) return 'Significant speed advantage';
      if (timeDiff > 0.2) return 'Noticeable speed difference';
      return 'Very close times - excellent competition';
    }
    
    if (event === '400m') {
      if (timeDiff > 2.0) return 'Major endurance/speed advantage';
      if (timeDiff > 1.0) return 'Clear advantage in 400m speed';
      return 'Competitive 400m matchup';
    }
    
    return 'Competitive performances';
  }

  private getFieldEventAnalysis(event: string, mark1: number, mark2: number): string {
    const markDiff = Math.abs(mark1 - mark2);
    
    if (event === 'lj' || event === 'tj') {
      if (markDiff > 12) return 'Significant jumping advantage';
      if (markDiff > 6) return 'Clear technical superiority';
      return 'Evenly matched jumpers';
    }
    
    return 'Competitive field event performances';
  }

  private async generateOverallAnalysis(
    athlete1: AthleteProfile,
    athlete2: AthleteProfile,
    headToHead: ComparisonResult['headToHeadResults']
  ): Promise<string> {
    const athlete1Wins = headToHead.filter(h => h.winner === 'athlete1').length;
    const athlete2Wins = headToHead.filter(h => h.winner === 'athlete2').length;
    
    const overallWinner = athlete1Wins > athlete2Wins ? athlete1.name : athlete2.name;
    const winCount = Math.max(athlete1Wins, athlete2Wins);
    const totalEvents = headToHead.length;
    
    return `Based on head-to-head comparison across ${totalEvents} common events, ${overallWinner} holds the advantage with ${winCount} superior performances. Both athletes show strong potential for continued improvement and success at the district and regional levels. The close competition in several events indicates both athletes push each other to perform at their best.`;
  }

  private analyzeStrengthsAndWeaknesses(
    athlete1: AthleteProfile,
    athlete2: AthleteProfile,
    headToHead: ComparisonResult['headToHeadResults']
  ): ComparisonResult['strengthsAndWeaknesses'] {
    const athlete1Strengths = [];
    const athlete1Weaknesses = [];
    const athlete2Strengths = [];
    const athlete2Weaknesses = [];

    // Analyze event types where each athlete excels
    const sprintEvents = headToHead.filter(h => ['100m', '200m'].includes(h.eventName));
    const distanceEvents = headToHead.filter(h => ['400m', '800m', '1600m'].includes(h.eventName));
    const fieldEvents = headToHead.filter(h => ['lj', 'tj', 'hj', 'shot', 'discus'].includes(h.eventName));

    // Sprint analysis
    const athlete1SprintWins = sprintEvents.filter(e => e.winner === 'athlete1').length;
    if (athlete1SprintWins > sprintEvents.length / 2) {
      athlete1Strengths.push('Superior sprint speed and acceleration');
    } else {
      athlete2Strengths.push('Dominant in sprint events');
    }

    // Distance analysis
    const athlete1DistanceWins = distanceEvents.filter(e => e.winner === 'athlete1').length;
    if (athlete1DistanceWins > distanceEvents.length / 2) {
      athlete1Strengths.push('Strong endurance and race tactics');
    } else {
      athlete2Strengths.push('Excellent endurance and pacing');
    }

    // Field events analysis
    const athlete1FieldWins = fieldEvents.filter(e => e.winner === 'athlete1').length;
    if (athlete1FieldWins > fieldEvents.length / 2) {
      athlete1Strengths.push('Technical excellence in field events');
    } else {
      athlete2Strengths.push('Superior technique in field events');
    }

    return {
      athlete1Strengths,
      athlete1Weaknesses,
      athlete2Strengths,
      athlete2Weaknesses
    };
  }

  private extractGrade(profile: any): string {
    // Extract grade from profile data
    return profile.activities?.includes('Senior') ? '12' : 
           profile.activities?.includes('Junior') ? '11' : 
           profile.activities?.includes('Sophomore') ? '10' : '9';
  }

  private extractEvents(trackStats: any): string[] {
    // Extract events from performance data
    const events = new Set();
    trackStats.allPerformances?.forEach((perf: any) => {
      events.add(perf.eventName);
    });
    return Array.from(events) as string[];
  }

  private extractPersonalRecords(trackStats: any): TrackPerformance[] {
    return trackStats.allPerformances?.filter((perf: any) => perf.isPR) || [];
  }

  private extractSeasonBests(trackStats: any): TrackPerformance[] {
    return trackStats.allPerformances?.filter((perf: any) => perf.isSB) || [];
  }

  private extractRankings(trackStats: any): AthleteProfile['rankings'] {
    return trackStats.rankings || {};
  }
}

// Export singleton instance
export const trackComparison = new TrackComparisonSystem();