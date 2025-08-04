'use client';

import React, { useState, useEffect } from 'react';
// Removed framer motion - no cheesy animations
import { 
  Crown, Star, Globe, Users, Video, MessageCircle, Trophy,
  Target, Heart, Zap, CheckCircle, ArrowRight, Clock,
  Award, Flame, Shield, Eye, Phone, Calendar, BookOpen, TrendingUp
} from 'lucide-react';
import HighlightText from '../../../components/HighlightText';
import Link from 'next/link';

export default function GlobalMentorshipNetworkDemo() {
  const [selectedMentorship, setSelectedMentorship] = useState(0);
  const [liveMentors, setLiveMentors] = useState(247);
  const [activeConnections, setActiveConnections] = useState(12847);
  const [sessionProgress, setSessionProgress] = useState(73);

  // Live mentorship simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.4) {
        setLiveMentors(prev => prev + Math.floor(Math.random() * 3) + 1);
        setActiveConnections(prev => prev + Math.floor(Math.random() * 15) + 5);
        setSessionProgress(prev => Math.max(60, Math.min(100, prev + (Math.random() - 0.5) * 8)));
      }
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const mentorshipStories = [
    {
      id: 1,
      athlete: 'Kevin "Future" Davis',
      sport: 'Basketball',
      age: 16,
      location: 'Cleveland, Ohio',
      
      beforeMentorship: {
        guidance: 'No role models or successful examples in family/community',
        knowledge: 'No understanding of what it takes to go pro',
        connections: 'Zero access to professional sports networks',
        mindset: 'Thought talent alone would be enough for success',
        planning: 'No strategic approach to development or recruiting',
        confidence: 'Intimidated by elite competition and opportunities'
      },
      
      mentorConnection: {
        mentor: 'LeBron James',
        connection: 'AI matched based on Cleveland background, leadership style',
        firstMeeting: 'Virtual session - LeBron shared his high school journey',
        frequency: 'Monthly 1-on-1 sessions, weekly group calls',
        focus: 'Mental toughness, business mindset, community responsibility',
        network: 'Access to LeBron\'s trainer, nutritionist, agent network'
      },
      
      additionalMentors: [
        { name: 'Chris Paul', focus: 'Point guard skills, leadership development' },
        { name: 'Kevin Durant', focus: 'Work ethic, handling pressure and criticism' },
        { name: 'Stephen Curry', focus: 'Shooting mechanics, faith-based approach' },
        { name: 'Draymond Green', focus: 'Defensive mindset, teammate relationships' },
        { name: 'Rich Paul (Agent)', focus: 'Business strategy, NIL opportunities' }
      ],
      
      transformation: {
        timeline: '18 months of elite mentorship access',
        mindset: 'From local talent to global perspective on basketball career',
        skills: 'Elite training methods from NBA players and coaches',
        network: 'Connected with 47 NBA/college professionals',
        opportunities: 'Invited to exclusive camps and training sessions',
        development: 'Accelerated growth in all aspects of game and life'
      },
      
      currentStatus: {
        ranking: 'Top 25 national recruit (was unranked regionally)',
        offers: '$1.2M in scholarship offers from Duke, Kentucky, UNC',
        nba: 'NBA scouts already taking meetings about future potential',
        business: 'NIL deals worth $89,000 annually through mentor connections',
        character: 'Started youth foundation in Cleveland with LeBron\'s guidance',
        future: 'Clear pathway mapped to NBA with business empire backup plan'
      },
      
      ultraPrepsImpact: {
        matching: 'AI analyzed personality, background, goals to find perfect mentor matches',
        access: 'Platform provided exclusive access to mentor network',
        scheduling: 'AI coordinated global schedules for maximum connection time',
        learning: 'Personalized learning paths based on mentor recommendations',
        tracking: 'Progress monitoring with mentor feedback integration',
        expansion: 'Network grew exponentially through mentor introductions'
      },
      
      mentorQuote: "Kevin reminds me of myself at 16 - raw talent with hunger to be great. UltraPreps allowed me to share lessons I wish I had at his age. Watching him grow has been incredible.",
      mentorName: "LeBron James, NBA Champion & Mentor",
      
      familyQuote: "Kevin went from shooting on rusty hoops to learning directly from LeBron James. The mentorship network opened doors we never knew existed. Our son has NBA legends teaching him life.",
      parentName: "Monica Davis, Kevin's Mom"
    },
    
    {
      id: 2,
      athlete: 'Isabella "Destined" Martinez',
      sport: 'Soccer',
      age: 15,
      location: 'Los Angeles, California',
      
      beforeMentorship: {
        guidance: 'First-generation American, parents don\'t understand US sports system',
        knowledge: 'No understanding of professional soccer pathway for women',
        connections: 'Isolated from professional soccer community',
        mindset: 'Unsure if professional soccer was realistic goal',
        planning: 'No strategic development plan or clear pathway',
        confidence: 'Felt too small and inexperienced for elite levels'
      },
      
      mentorConnection: {
        mentor: 'Megan Rapinoe',
        connection: 'AI matched based on playing style, social consciousness',
        firstMeeting: 'Virtual training session analyzing Isabella\'s game film',
        frequency: 'Bi-weekly tactical sessions, monthly life coaching calls',
        focus: 'Technical skills, mental toughness, advocacy and leadership',
        network: 'USWNT players, college coaches, international opportunities'
      },
      
      additionalMentors: [
        { name: 'Alex Morgan', focus: 'Goal scoring, marketing and brand building' },
        { name: 'Crystal Dunn', focus: 'Versatility, adapting to different positions' },
        { name: 'Julie Ertz', focus: 'Physical preparation, college to pro transition' },
        { name: 'Carli Lloyd', focus: 'Clutch performance, longevity in sport' },
        { name: 'Jill Ellis (Coach)', focus: 'Tactical understanding, leadership development' }
      ],
      
      transformation: {
        timeline: '14 months of USWNT mentorship program',
        mindset: 'From uncertain to confident about professional soccer future',
        skills: 'Elite technical development with world-class instruction',
        network: 'Connected with entire US Women\'s Soccer ecosystem',
        opportunities: 'Invited to national team youth camps and showcases',
        development: 'Accelerated growth tracked by national team coaches'
      },
      
      currentStatus: {
        ranking: 'Top 10 national recruit in her age group',
        offers: '$347,000 in scholarship offers from Stanford, UCLA, UNC',
        uswnt: 'Youth national team call-ups, Olympic development program',
        international: 'Training opportunities with Barcelona and Lyon academies',
        advocacy: 'Youth soccer equality ambassador with Megan\'s foundation',
        future: 'Clear pathway to USWNT with professional contracts in Europe'
      },
      
      ultraPrepsImpact: {
        matching: 'AI connected playing style and values with perfect mentor fit',
        access: 'Exclusive platform access to USWNT mentorship program',
        translation: 'Real-time language support for international connections',
        planning: 'Strategic development roadmap created with mentor input',
        tracking: 'Performance analytics shared directly with mentors',
        global: 'International opportunities through mentor global networks'
      },
      
      mentorQuote: "Isabella has the technical ability and heart to represent the US at the highest levels. UltraPreps created a connection that's transforming her trajectory and our sport's future.",
      mentorName: "Megan Rapinoe, USWNT Legend & Mentor",
      
      familyQuote: "We came to America dreaming of opportunities for our daughter. Megan Rapinoe personally mentoring Isabella feels like a miracle. She's learning from the absolute best in the world.",
      parentName: "Carmen Martinez, Isabella's Mom"
    },
    
    {
      id: 3,
      athlete: 'Marcus "Elite" Johnson',
      sport: 'Track & Field',
      age: 17,
      location: 'Atlanta, Georgia',
      
      beforeMentorship: {
        guidance: 'Small town with no track tradition or elite coaching',
        knowledge: 'No understanding of international track competition levels',
        connections: 'Zero access to Olympic-level training and competition',
        mindset: 'Thought local success was the ceiling for achievement',
        planning: 'No systematic approach to Olympic-level development',
        confidence: 'Intimidated by world-class competition and standards'
      },
      
      mentorConnection: {
        mentor: 'Usain Bolt',
        connection: 'AI identified similar running mechanics and personality',
        firstMeeting: 'Virtual technique session analyzing Marcus\'s sprint form',
        frequency: 'Monthly training calls, quarterly in-person sessions',
        focus: 'Sprint technique, mental preparation, global competition mindset',
        network: 'Olympic coaches, agents, international competition opportunities'
      },
      
      additionalMentors: [
        { name: 'Noah Lyles', focus: 'Current elite competition, media handling' },
        { name: 'Ryan Bailey', focus: 'Relay technique, team dynamics' },
        { name: 'Tyson Gay', focus: 'Speed development, injury prevention' },
        { name: 'Glen Mills (Coach)', focus: 'Training methodology, technical perfection' },
        { name: 'Ricky Simms (Agent)', focus: 'Professional opportunities, sponsorships' }
      ],
      
      transformation: {
        timeline: '16 months of Olympic-level mentorship',
        mindset: 'From regional athlete to Olympic contender perspective',
        skills: 'World-class technique refinement with legendary coaches',
        network: 'Connected with global track and field elite community',
        opportunities: 'International competition invitations and training camps',
        development: 'Systematic progression toward Olympic qualifying standards'
      },
      
      currentStatus: {
        times: 'Personal bests dropped by 0.7 seconds across all events',
        ranking: 'Top 5 nationally in 100m and 200m for his age group',
        competitions: 'Invited to Diamond League youth events internationally',
        olympics: '2028 Olympics team projection with current development trajectory',
        sponsorship: '$127,000 in Nike development deal through mentor connections',
        future: 'Clear pathway to professional track career and Olympic medals'
      },
      
      ultraPrepsImpact: {
        matching: 'AI analyzed biomechanics to connect with optimal sprint mentors',
        access: 'Exclusive Olympic athlete mentorship network access',
        analysis: 'High-speed video analysis shared directly with Usain Bolt',
        global: 'International training opportunities coordinated through platform',
        tracking: 'Performance data integration with Olympic-level coaching staff',
        development: 'World-class training plans adapted for high school athlete'
      },
      
      mentorQuote: "Marcus has natural speed that reminds me of my younger days. UltraPreps allowed me to share techniques and mindset that took me years to develop. He's going to be special.",
      mentorName: "Usain Bolt, World Record Holder & Mentor",
      
      familyQuote: "Marcus was fast, but Usain Bolt is teaching him to be legendary. The mentorship network gave our son access to Olympic champions. He's training like a professional now.",
      parentName: "Denise Johnson, Marcus's Mom"
    }
  ];

  const currentMentorship = mentorshipStories[selectedMentorship];

  return (
    <div className="ultra-page-layout">
      {/* Standardized Stadium Background */}
      <div className="absolute inset-0 ultra-stadium-bg" />
      
      {/* Standardized Overlays */}
      <div className="absolute inset-0 ultra-overlay-primary" />
      <div className="absolute inset-0 ultra-overlay-secondary" />

      {/* Header */}
      <div className="ultra-content-wrapper">
        <div className="ultra-container">
          <div className="text-center ultra-section-spacing">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Crown className="w-12 h-12 text-dna-gold" />
              <h1 className="ultra-hero-text">
                LEGENDS CREATING LEGENDS
              </h1>
              <Globe className="w-12 h-12 text-dna-gold" />
            </div>
            
            <p className="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-medium mb-8">
              <HighlightText>
                Watch young athletes get **personally mentored by LeBron, Megan Rapinoe, and Usain Bolt**. 
                This isn't just inspiration - it's **direct access to greatness** that transforms careers.
              </HighlightText>
            </p>

            {/* Live Mentorship Stats */}
            <div className="ultra-card bg-gradient-to-r from-dna-gold/20 to-dna-orange/20 border-dna-gold/50 max-w-5xl mx-auto mb-16">
              <h3 className="ultra-card-title mb-6 flex items-center justify-center gap-2">
                <Flame className="w-6 h-6 text-dna-gold" />
                LIVE GLOBAL MENTORSHIP NETWORK
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">{liveMentors}</div>
                  <div className="text-sm text-white/70">Elite Mentors Active</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">{activeConnections.toLocaleString()}</div>
                  <div className="text-sm text-white/70">Active Mentorship Connections</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">{sessionProgress}%</div>
                  <div className="text-sm text-white/70">Success Rate to Elite Levels</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">47</div>
                  <div className="text-sm text-white/70">Countries Connected</div>
                </div>
              </div>
            </div>

            {/* Mentorship Selector */}
            <div className="flex justify-center gap-4 mb-12">
              {mentorshipStories.map((story, index) => (
                <button
                  key={story.id}
                  onClick={() => setSelectedMentorship(index)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    selectedMentorship === index
                      ? 'bg-dna-gold text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {story.athlete.split(' ')[0]}
                  <div className="text-xs opacity-70">{story.mentorConnection.mentor.split(' ')[0]}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mentorship Transformation Story */}
        <div className="ultra-container">
          <div className="space-y-12">
              {/* Athlete & Mentor Profile */}
              <div className="ultra-card bg-gradient-to-r from-dna-blue/30 to-purple-900/30 border-dna-blue/50">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-4">YOUNG ATHLETE</h3>
                    <h4 className="text-xl font-bold text-dna-blue mb-3">{currentMentorship.athlete}</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-dna-blue font-bold">Sport:</span>
                        <span className="text-white ml-2">{currentMentorship.sport}</span>
                      </div>
                      <div>
                        <span className="text-dna-blue font-bold">Age:</span>
                        <span className="text-white ml-2">{currentMentorship.age} years old</span>
                      </div>
                      <div>
                        <span className="text-dna-blue font-bold">Location:</span>
                        <span className="text-white ml-2">{currentMentorship.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-dna-gold to-dna-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-10 h-10 text-dna-gold" />
                    </div>
                    <div className="text-dna-gold font-bold">MENTORSHIP</div>
                    <div className="text-white font-bold">CONNECTION</div>
                    <div className="text-sm text-white/70 mt-2">{currentMentorship.transformation.timeline}</div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white mb-4">LEGEND MENTOR</h3>
                    <h4 className="text-xl font-bold text-dna-gold mb-3">{currentMentorship.mentorConnection.mentor}</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-dna-gold font-bold">Connection:</span>
                        <span className="text-white ml-2">{currentMentorship.mentorConnection.connection}</span>
                      </div>
                      <div>
                        <span className="text-dna-gold font-bold">Frequency:</span>
                        <span className="text-white ml-2">{currentMentorship.mentorConnection.frequency}</span>
                      </div>
                      <div>
                        <span className="text-dna-gold font-bold">Focus:</span>
                        <span className="text-white ml-2">{currentMentorship.mentorConnection.focus}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Before vs After */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="relative overflow-hidden rounded-2xl border-2 border-red-500/80 bg-black/90 backdrop-blur-xl p-6">
                  {/* Strong dark background overlay for perfect contrast */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/70 via-black/90 to-red-700/60 backdrop-blur-sm" />
                  
                  {/* Content with guaranteed high contrast */}
                  <div className="relative z-10">
                  <h3 className="text-2xl font-black text-red-400 mb-6 flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    BEFORE: LIMITED PERSPECTIVE
                  </h3>
                  <div className="space-y-4 text-sm">
                    {Object.entries(currentMentorship.beforeMentorship).map(([key, value], index) => (
                      <div key={index}>
                        <div className="text-red-300 font-bold capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        <div className="text-white italic">"{value}"</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border-2 border-green-500/80 bg-black/90 backdrop-blur-xl p-6">
                  {/* Strong dark background overlay for perfect contrast */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-black/90 to-green-700/60 backdrop-blur-sm" />
                  
                  {/* Content with guaranteed high contrast */}
                  <div className="relative z-10">
                  <h3 className="text-2xl font-black text-green-400 mb-6 flex items-center gap-2">
                    <Crown className="w-6 h-6" />
                    AFTER: ELITE TRAJECTORY
                  </h3>
                  <div className="space-y-4 text-sm">
                    {Object.entries(currentMentorship.currentStatus).map(([key, value], index) => (
                      <div key={index}>
                        <div className="text-green-300 font-bold capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        <div className="text-white font-medium">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Elite Mentor Network */}
              <div className="ultra-card bg-gradient-to-r from-dna-gold/20 to-dna-orange/20 border-dna-gold/50">
                <h3 className="text-2xl font-black text-dna-gold mb-6 text-center flex items-center justify-center gap-2">
                  <Star className="w-6 h-6" />
                  ELITE MENTOR NETWORK ACCESS
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Primary Mentor */}
                  <div className="lg:col-span-3 bg-black/30 rounded-lg p-6 border border-dna-gold/50 mb-4">
                    <div className="text-center">
                      <Crown className="w-8 h-8 text-dna-gold mx-auto mb-2" />
                      <div className="text-dna-gold font-bold text-lg">PRIMARY MENTOR</div>
                      <div className="text-2xl font-black text-white mb-2">{currentMentorship.mentorConnection.mentor}</div>
                      <div className="text-white text-sm">{currentMentorship.mentorConnection.firstMeeting}</div>
                    </div>
                  </div>
                  
                  {/* Additional Mentors */}
                  {currentMentorship.additionalMentors.map((mentor, index) => (
                    <div key={index} className="bg-black/20 rounded-lg p-4 border border-dna-gold/30">
                      <div className="text-center">
                        <Trophy className="w-6 h-6 text-dna-gold mx-auto mb-2" />
                        <div className="text-dna-gold font-bold">{mentor.name}</div>
                        <div className="text-white text-sm mt-1">{mentor.focus}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* UltraPreps Platform Impact */}
              <div className="ultra-card bg-gradient-to-r from-dna-blue/30 to-purple-900/30 border-dna-blue/50">
                <h3 className="text-2xl font-black text-dna-blue mb-6 text-center flex items-center justify-center gap-2">
                  <Zap className="w-6 h-6" />
                  ULTRAPREPS AI MENTORSHIP TECHNOLOGY
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(currentMentorship.ultraPrepsImpact).map(([key, value], index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-dna-blue/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                        {key === 'matching' && <Target className="w-6 h-6 text-dna-blue" />}
                        {key === 'access' && <Crown className="w-6 h-6 text-dna-blue" />}
                        {key === 'scheduling' && <Calendar className="w-6 h-6 text-dna-blue" />}
                        {key === 'learning' && <BookOpen className="w-6 h-6 text-dna-blue" />}
                        {key === 'tracking' && <Eye className="w-6 h-6 text-dna-blue" />}
                        {key === 'global' && <Globe className="w-6 h-6 text-dna-blue" />}
                        {key === 'analysis' && <Video className="w-6 h-6 text-dna-blue" />}
                        {key === 'development' && <TrendingUp className="w-6 h-6 text-dna-blue" />}
                        {key === 'expansion' && <Users className="w-6 h-6 text-dna-blue" />}
                        {key === 'translation' && <MessageCircle className="w-6 h-6 text-dna-blue" />}
                        {key === 'planning' && <Shield className="w-6 h-6 text-dna-blue" />}
                        {key === 'network' && <Star className="w-6 h-6 text-dna-blue" />}
                      </div>
                      <div className="text-dna-blue font-bold mb-2 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                      <div className="text-white text-sm">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dual Testimonials */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="ultra-card bg-gradient-to-r from-dna-gold/20 to-dna-orange/20 border-dna-gold/50 text-center">
                  <Crown className="w-12 h-12 text-dna-gold mx-auto mb-6" />
                  <div className="text-dna-gold font-bold text-lg mb-4">LEGEND MENTOR</div>
                  <blockquote className="text-xl text-white font-medium italic mb-6 leading-relaxed">
                    "{currentMentorship.mentorQuote}"
                  </blockquote>
                  <cite className="text-dna-gold font-bold">
                    — {currentMentorship.mentorName}
                  </cite>
                </div>

                <div className="relative overflow-hidden rounded-2xl border-2 border-green-500/80 bg-black/90 backdrop-blur-xl p-6 text-center">
                {/* Strong dark background overlay for perfect contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-black/90 to-green-700/60 backdrop-blur-sm" />
                
                {/* Content with guaranteed high contrast */}
                <div className="relative z-10">
                  <Heart className="w-12 h-12 text-green-400 mx-auto mb-6" />
                  <div className="text-green-400 font-bold text-lg mb-4">FAMILY TRANSFORMATION</div>
                  <blockquote className="text-xl text-green-100 font-medium italic mb-6 leading-relaxed">
                    "{currentMentorship.familyQuote}"
                  </blockquote>
                  <cite className="text-green-400 font-bold">
                    — {currentMentorship.parentName}
                  </cite>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
          <div className="text-center ultra-section-spacing">
            <div className="space-y-6">
              <h2 className="ultra-section-title">
                CONNECT WITH GREATNESS
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Your athlete deserves to learn directly from legends. Stop settling for local coaching 
                when global champions are ready to share their secrets for success.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/stadium/create"
                  className="ultra-btn-primary px-12 py-6 text-xl"
                >
                  <Globe className="w-7 h-7" />
                  Access Legend Network
                  <ArrowRight className="w-7 h-7" />
                </Link>
                
                <Link
                  href="/demo/mental-peak-performance"
                  className="ultra-btn-secondary px-12 py-6 text-xl"
                >
                  <Star className="w-7 h-7" />
                  Develop Champion Mindset
                </Link>
              </div>

              <div className="pt-8 text-sm text-white/60">
                <p>Join 12,847 athletes connected with 247 elite mentors from around the world</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}