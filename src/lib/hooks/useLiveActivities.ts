import { useState, useEffect } from 'react';

export interface LiveActivity {
  id: string;
  type: 'hype' | 'trending' | 'achievement' | 'milestone' | 'event' | 'update';
  emoji: string;
  message: string;
  timestamp: Date;
  priority: 'normal' | 'high';
}

const activityTemplates = [
  { type: 'hype', emoji: '🏆', messages: [
    '{name} just earned {points} HYPE',
    '{name} completed their stadium profile',
    '{name} reached {milestone} HYPE milestone',
    '{name} shared their highlight reel'
  ]},
  { type: 'trending', emoji: '📹', messages: [
    '{name}&apos;s highlight reel is trending',
    '{school} vs {opponent} game highlights going viral',
    '{name} broke school record in {sport}',
    'New poster from {name} getting massive engagement'
  ]},
  { type: 'achievement', emoji: '🌟', messages: [
    '{name} unlocked {achievement} badge',
    '{school} {team} won district championship',
    '{name} named player of the week',
    '{count} students joined {school} stadium today'
  ]},
  { type: 'milestone', emoji: '🎯', messages: [
    '{school} reached {count} active students',
    'Platform hits {total} total HYPE points awarded',
    '{name} celebrating {years} years on UltraPreps',
    '{school} stadium is now verified'
  ]},
  { type: 'event', emoji: '🔥', messages: [
    'Big game tonight: {school} vs {opponent}',
    '{event} starts in {time}',
    'Live stream starting for {school} {sport}',
    '{school} hosting {event} this weekend'
  ]},
  { type: 'update', emoji: '🚀', messages: [
    'New feature: {feature} now available',
    '{school} launches new {program}',
    'AI highlights now processing 2x faster',
    'Mobile app update rolling out'
  ]}
];

const names = [
  'Marcus Thompson', 'Sarah Chen', 'James Rodriguez', 'Emily Johnson',
  'Michael Davis', 'Jessica Martinez', 'David Lee', 'Ashley Williams',
  'Chris Taylor', 'Samantha Brown', 'Ryan Miller', 'Olivia Garcia'
];

const schools = [
  'Westbrook High', 'Central Valley', 'Riverside Academy', 'Mountain View',
  'Lakeshore Prep', 'Edison High', 'Lincoln Academy', 'Washington High'
];

const sports = [
  'Football', 'Basketball', 'Soccer', 'Track', 'Volleyball', 'Baseball',
  'Tennis', 'Swimming', 'Cross Country', 'Wrestling', 'Golf', 'Softball'
];

const achievements = [
  'Rising Star', 'Team Captain', 'Scholar Athlete', 'Community Leader',
  'MVP Candidate', 'All-District', 'State Qualifier', 'Record Breaker'
];

function generateActivity(): LiveActivity {
  const templateGroup = activityTemplates[Math.floor(Math.random() * activityTemplates.length)];
  const template = templateGroup.messages[Math.floor(Math.random() * templateGroup.messages.length)];
  
  const message = template
    .replace('{name}', names[Math.floor(Math.random() * names.length)])
    .replace('{school}', schools[Math.floor(Math.random() * schools.length)])
    .replace('{opponent}', schools[Math.floor(Math.random() * schools.length)])
    .replace('{sport}', sports[Math.floor(Math.random() * sports.length)])
    .replace('{achievement}', achievements[Math.floor(Math.random() * achievements.length)])
    .replace('{points}', (Math.floor(Math.random() * 10) + 1) * 50 + '')
    .replace('{milestone}', (Math.floor(Math.random() * 10) + 1) * 1000 + '')
    .replace('{count}', Math.floor(Math.random() * 50) + 10 + '')
    .replace('{total}', '1M+')
    .replace('{years}', Math.floor(Math.random() * 3) + 1 + '')
    .replace('{time}', Math.floor(Math.random() * 4) + 1 + ' hours')
    .replace('{event}', 'Spring Championship')
    .replace('{feature}', 'AI Coach Assistant')
    .replace('{program}', 'Esports League')
    .replace('{team}', sports[Math.floor(Math.random() * sports.length)]);

  return {
    id: Date.now().toString() + Math.random(),
    type: templateGroup.type as LiveActivity['type'],
    emoji: templateGroup.emoji,
    message,
    timestamp: new Date(),
    priority: Math.random() > 0.8 ? 'high' : 'normal'
  };
}

export function useLiveActivities(interval: number = 5000) {
  const [activities, setActivities] = useState<LiveActivity[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Generate initial activities
    const initialActivities = Array.from({ length: 10 }, () => generateActivity());
    setActivities(initialActivities);
    setIsConnected(true);

    // Simulate real-time updates
    const timer = setInterval(() => {
      const newActivity = generateActivity();
      setActivities(prev => [newActivity, ...prev].slice(0, 50)); // Keep last 50
    }, interval);

    // In production, this would connect to WebSocket
    // const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);
    // ws.onmessage = (event) => { ... }

    return () => {
      clearInterval(timer);
      // ws.close();
    };
  }, [interval]);

  return { activities, isConnected };
}