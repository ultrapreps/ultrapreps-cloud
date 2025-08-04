'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Crown, Heart, Users, Globe, Star, Trophy, Target, Shield,
  TrendingUp, Zap, CheckCircle, ArrowRight, Award, Flame,
  Home, School, Building, Gift, Handshake, Vote, Megaphone
} from 'lucide-react';
import Link from 'next/link';
import HighlightText from '../../../components/HighlightText';

export default function CommunityImpactLeadershipDemo() {
  const [selectedLeader, setSelectedLeader] = useState(0);
  const [livesImpacted, setLivesImpacted] = useState(47823);
  const [foundationsStarted, setFoundationsStarted] = useState(127);
  const [communityValue, setCommunityValue] = useState(8247000);

  // Live community impact simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        setLivesImpacted(prev => prev + Math.floor(Math.random() * 25) + 10);
        setCommunityValue(prev => prev + Math.floor(Math.random() * 15000) + 5000);
        if (Math.random() < 0.1) {
          setFoundationsStarted(prev => prev + 1);
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const communityLeaders = [
    {
      id: 1,
      athlete: 'Jamal "Change" Washington',
      sport: 'Football',
      age: 18,
      location: 'East Baltimore, Maryland',
      
      communityBackground: {
        environment: 'High crime area, 47% poverty rate, limited opportunities',
        education: 'Underfunded schools, 23% graduation rate',
        youth: '78% of kids have no positive role models or after-school programs',
        violence: 'Daily exposure to drugs, gangs, and violence',
        hope: 'Community has lost faith in possibility of positive change',
        resources: 'No youth centers, sports programs, or mentorship opportunities'
      },
      
      leadershipJourney: {
        awakening: 'Realized his athletic success meant nothing if community stayed broken',
        decision: 'Age 16 - committed to creating change through sports and education',
        platform: 'Used football recruitment attention to highlight community needs',
        learning: 'UltraPreps connected him with community leaders and changemakers',
        action: 'Started with 5 kids in a church basement teaching life skills',
        growth: 'Program expanded to serve 200+ youth across East Baltimore'
      },
      
      foundationImpact: {
        name: 'Baltimore Rising Athletics & Education Foundation',
        mission: 'Using sports to build character, education, and opportunity',
        programs: [
          'After-school tutoring for 150+ kids daily',
          'Youth football league serving 8 neighborhoods',
          'College prep program - 89% acceptance rate',
          'Mentorship network connecting 200 local professionals',
          'Summer jobs program placing 75 teens annually',
          'Family support services reaching 300+ households'
        ],
        results: [
          'Youth crime reduced 67% in served neighborhoods',
          '156 kids received college scholarships through program',
          '23 local businesses created to employ community members',
          '8 new community centers built with Jamal\'s advocacy',
          'Graduation rate increased from 23% to 78% in target schools',
          '$2.4M in community investment attracted through foundation'
        ]
      },
      
      nationalRecognition: {
        awards: 'ESPN Community Impact Award, Presidential Volunteer Service Award',
        media: 'Featured on 60 Minutes, Good Morning America, CNN Heroes',
        speaking: 'Keynote speaker at 47 national conferences on youth development',
        policy: 'Testified before Congress on community sports investment',
        network: 'Connected with Obama Foundation, Bill Gates Foundation',
        influence: 'Model program replicated in 23 cities nationwide'
      },
      
      athleticSuccess: {
        performance: 'All-American linebacker, maintained 4.0 GPA throughout leadership work',
        recruitment: '$427,000 full ride to University of Maryland',
        balance: 'Athletic performance improved as leadership responsibilities grew',
        character: 'Team captain, unanimous selection by coaches and players',
        future: 'Plans to study public policy and continue community work'
      },
      
      ultraPrepsImpact: {
        platform: 'Provided global platform to showcase community work',
        connections: 'Connected with foundations, donors, and policy makers',
        resources: 'Facilitated $890,000 in grants and donations',
        media: 'AI content creation generated millions of views for cause',
        scaling: 'Connected with similar programs worldwide for best practices',
        sustainability: 'Built long-term funding and leadership succession plans'
      },
      
      communityQuote: "Jamal didn't just escape our neighborhood - he transformed it. Through sports and leadership, he showed our kids they can be champions in life, not just on the field.",
      communityName: "Rev. Marcus Brown, Community Leader",
      
      familyQuote: "My son used his athletic gifts to lift up an entire community. UltraPreps gave him the platform and connections to turn his vision into reality. He's changing generations.",
      parentName: "Gloria Washington, Jamal's Mom"
    },
    
    {
      id: 2,
      athlete: 'Maria "Esperanza" Gutierrez',
      sport: 'Soccer',
      age: 17,
      location: 'Phoenix, Arizona',
      
      communityBackground: {
        environment: 'Predominantly Latino community, 52% undocumented families',
        education: 'Limited English resources, 31% dropout rate',
        youth: 'Girls have few sports opportunities, early pregnancy rates high',
        culture: 'Traditional expectations limit girls\' athletic participation',
        hope: 'Community dreams deferred by immigration fears and poverty',
        resources: 'No girls\' soccer programs, limited athletic opportunities'
      },
      
      leadershipJourney: {
        awakening: 'Realized many talented girls never got chances due to cultural barriers',
        decision: 'Age 15 - started first-ever girls\' soccer league in community',
        platform: 'Used soccer recruitment attention to advocate for immigrant rights',
        learning: 'Connected with Latino leaders and women\'s rights advocates',
        action: 'Organized 50 families to start community soccer program',
        growth: 'Program now serves 300+ girls across 12 communities'
      },
      
      foundationImpact: {
        name: 'Esperanza Girls Soccer & Leadership Academy',
        mission: 'Empowering Latina girls through sports, education, and leadership',
        programs: [
          'Girls soccer leagues for ages 6-18 across Phoenix',
          'Bilingual tutoring and college prep for 180+ students',
          'Leadership development and public speaking training',
          'Family education workshops on college planning',
          'Scholarship fund providing $150,000 annually',
          'Immigration legal aid connecting families with resources'
        ],
        results: [
          '73 girls received college scholarships through program',
          'Teen pregnancy rates dropped 45% in program participants',
          '12 community soccer fields built through advocacy',
          '89% of program graduates attend college (vs 23% community average)',
          '$1.8M in scholarship money secured for community girls',
          '200+ families received immigration assistance and resources'
        ]
      },
      
      nationalRecognition: {
        awards: 'FIFA Community Award, Hispanic Heritage Foundation Leader',
        media: 'Univision documentary, ESPN Feature, Teen Vogue cover story',
        speaking: 'Keynote at National Immigration Forum, Girls Soccer Summit',
        policy: 'Advocated for Title IX enforcement in Latino communities',
        network: 'Connected with Megan Rapinoe, AOC, Hispanic Caucus',
        influence: 'Program model adopted by US Soccer Foundation nationally'
      },
      
      athleticSuccess: {
        performance: 'All-State midfielder, team captain for 3 consecutive years',
        recruitment: '$347,000 full ride to UCLA with academic support',
        balance: 'Soccer performance peaked while leading community initiatives',
        character: 'Unanimous team leadership award, community service recognition',
        future: 'Plans to study international relations and continue advocacy'
      },
      
      ultraPrepsImpact: {
        platform: 'Global exposure for Latino girls\' rights and opportunities',
        connections: 'Connected with international soccer and women\'s organizations',
        resources: 'Facilitated $650,000 in program funding and donations',
        media: 'Bilingual content reached 2.3M Latino families nationwide',
        scaling: 'Connected program with similar initiatives in Mexico and Central America',
        sustainability: 'Built partnerships with major corporations for ongoing funding'
      },
      
      communityQuote: "Maria gave our daughters permission to dream big. Through soccer, she showed them they can be leaders, scholars, and champions. She changed our community forever.",
      communityName: "Carmen Rodriguez, Parent & Community Organizer",
      
      familyQuote: "Maria didn't just break barriers for herself - she broke them for every Latina girl in Phoenix. Her leadership shows what's possible when sports meet purpose.",
      parentName: "Isabel Gutierrez, Maria's Mom"
    },
    
    {
      id: 3,
      athlete: 'Tyler "Unity" Chen',
      sport: 'Basketball',
      age: 18,
      location: 'Oakland, California',
      
      communityBackground: {
        environment: 'Racially divided community, Asian-Black tensions after recent incidents',
        education: 'Schools struggling with racial conflicts and academic achievement gaps',
        youth: 'Limited cross-cultural interaction, stereotypes dividing communities',
        violence: 'Recent hate crimes and community conflicts escalating',
        hope: 'Community leaders struggling to build bridges across racial lines',
        resources: 'No programs addressing racial healing or unity building'
      },
      
      leadershipJourney: {
        awakening: 'Witnessed best friend (Black) attacked due to racial hate, decided to act',
        decision: 'Age 16 - created first interracial basketball league in Oakland',
        platform: 'Used basketball recruitment attention to promote racial healing',
        learning: 'Connected with civil rights leaders and conflict resolution experts',
        action: 'Organized tournament bringing together Asian and Black youth',
        growth: 'Program expanded to serve 400+ youth from all racial backgrounds'
      },
      
      foundationImpact: {
        name: 'Oakland Unity Through Sports Foundation',
        mission: 'Building racial understanding and unity through athletic competition',
        programs: [
          'Interracial basketball leagues serving 400+ youth',
          'Cultural exchange programs pairing Asian and Black families',
          'Conflict resolution workshops for teens and adults',
          'Community healing circles facilitated by trained mediators',
          'Academic tutoring with cross-cultural mentorship',
          'Small business collaboration between Asian and Black entrepreneurs'
        ],
        results: [
          'Hate incidents reduced 78% in program neighborhoods',
          '156 cross-cultural friendships formed through sports',
          '89 students from program received college scholarships',
          '12 new interracial businesses started through connections',
          'Community trust scores increased 65% in independent surveys',
          '$3.2M in economic development through unity initiatives'
        ]
      },
      
      nationalRecognition: {
        awards: 'MLK Community Service Award, Anti-Defamation League Honor',
        media: 'CNN feature, Washington Post profile, NBA social justice spotlight',
        speaking: 'Keynote at National Race Relations Conference, NBA Community Summit',
        policy: 'Consulted with DOJ on community healing after racial conflicts',
        network: 'Connected with NBA players, civil rights organizations',
        influence: 'Unity model implemented in 18 cities with racial tensions'
      },
      
      athleticSuccess: {
        performance: 'All-State point guard, led team to state championship',
        recruitment: '$378,000 full ride to UC Berkeley',
        balance: 'Basketball leadership enhanced by community leadership experience',
        character: 'Team voted him most valuable leader, community impact award',
        future: 'Plans to study sociology and continue racial justice work'
      },
      
      ultraPrepsImpact: {
        platform: 'National visibility for racial healing through sports',
        connections: 'Connected with NBA players and civil rights organizations',
        resources: 'Facilitated $750,000 in community healing program funding',
        media: 'Content showcasing unity reached 3.1M views across communities',
        scaling: 'Program methodology shared with cities facing similar challenges',
        sustainability: 'Built ongoing partnerships with NBA and tech companies'
      },
      
      communityQuote: "Tyler turned our pain into purpose. He showed us that basketball could heal wounds that politics couldn't touch. Our community is stronger because of his courage.",
      communityName: "Dr. James Washington, Community Mediator",
      
      familyQuote: "Tyler saw division and chose unity. His basketball skills opened doors, but his heart for justice changed lives. We're proud of the leader he's become.",
      parentName: "Linda Chen, Tyler's Mom"
    }
  ];

  const currentLeader = communityLeaders[selectedLeader];

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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <Crown className="w-12 h-12 text-dna-gold" />
              <h1 className="ultra-hero-text">
                ATHLETES CHANGING THE WORLD
              </h1>
              <Heart className="w-12 h-12 text-dna-gold" />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-medium mb-8"
            >
              <HighlightText>
                **community transformation leaders**
              </HighlightText>
              <HighlightText>
                **social impact**
              </HighlightText>
            </motion.p>

            {/* Live Community Impact Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="ultra-card bg-gradient-to-r from-dna-gold/20 to-dna-orange/20 border-dna-gold/50 max-w-5xl mx-auto mb-16"
            >
              <h3 className="ultra-card-title mb-6 flex items-center justify-center gap-2">
                <Flame className="w-6 h-6 text-dna-gold" />
                LIVE COMMUNITY TRANSFORMATION IMPACT
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">{livesImpacted.toLocaleString()}</div>
                  <div className="text-sm text-white/70">Lives Directly Impacted</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">{foundationsStarted}</div>
                  <div className="text-sm text-white/70">Foundations Started</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">${(communityValue / 1000000).toFixed(1)}M</div>
                  <div className="text-sm text-white/70">Community Value Created</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-dna-gold mb-1">89%</div>
                  <div className="text-sm text-white/70">Go to College (vs 23% avg)</div>
                </div>
              </div>
            </motion.div>

            {/* Leader Selector */}
            <div className="flex justify-center gap-4 mb-12">
              {communityLeaders.map((leader, index) => (
                <button
                  key={leader.id}
                  onClick={() => setSelectedLeader(index)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all ${
                    selectedLeader === index
                      ? 'bg-dna-gold text-white'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {leader.athlete.split(' ')[0]}
                  <div className="text-xs opacity-70">{leader.foundationImpact.name.split(' ')[0]}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Community Leadership Story */}
        <div className="ultra-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedLeader}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Leader Profile */}
              <div className="ultra-card bg-gradient-to-r from-dna-blue/30 to-purple-900/30 border-dna-blue/50">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-4">{currentLeader.athlete}</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-dna-blue font-bold">Sport & Position</div>
                        <div className="text-white">{currentLeader.sport} Leader</div>
                      </div>
                      <div>
                        <div className="text-dna-blue font-bold">Age</div>
                        <div className="text-white">{currentLeader.age} years old</div>
                      </div>
                      <div>
                        <div className="text-dna-blue font-bold">Community</div>
                        <div className="text-white">{currentLeader.location}</div>
                      </div>
                      <div>
                        <div className="text-dna-blue font-bold">Foundation</div>
                        <div className="text-white">Founded & Leading</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-dna-gold to-dna-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-16 h-16 text-dna-gold" />
                    </div>
                    <div className="text-dna-gold font-bold text-lg">COMMUNITY IMPACT</div>
                    <div className="text-4xl font-black text-white">{currentLeader.foundationImpact.results[0].split(' ')[0]}</div>
                    <div className="text-sm text-white/70 mt-2">Lives Transformed</div>
                  </div>
                </div>
              </div>

              {/* Community Challenge vs Solution */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="relative overflow-hidden rounded-2xl border-2 border-red-500/80 bg-black/90 backdrop-blur-xl p-6">
                  {/* Strong dark background overlay for perfect contrast */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-900/70 via-black/90 to-red-700/60 backdrop-blur-sm" />
                  
                  {/* Content with guaranteed high contrast */}
                  <div className="relative z-10">
                  <h3 className="text-2xl font-black text-red-400 mb-6 flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    COMMUNITY CHALLENGES
                  </h3>
                  <div className="space-y-4 text-sm">
                    {Object.entries(currentLeader.communityBackground).map(([key, value], index) => (
                      <div key={index}>
                        <div className="text-red-300 font-bold capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        <div className="text-white">"{value}"</div>
                      </div>
                    ))}
                  </div>
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-2xl border-2 border-green-500/80 bg-black/90 backdrop-blur-xl p-6">
                  {/* Strong dark background overlay for perfect contrast */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-900/70 via-black/90 to-green-700/60 backdrop-blur-sm" />
                  
                  {/* Content with guaranteed high contrast */}
                  <div className="relative z-10">
                  <h3 className="text-2xl font-black text-green-400 mb-6 flex items-center gap-2">
                    <Award className="w-6 h-6" />
                    LEADERSHIP JOURNEY
                  </h3>
                  <div className="space-y-4 text-sm">
                    {Object.entries(currentLeader.leadershipJourney).map(([key, value], index) => (
                      <div key={index}>
                        <div className="text-green-300 font-bold capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        <div className="text-white font-medium">"{value}"</div>
                      </div>
                    ))}
                  </div>
                  </div>
                </div>
              </div>

              {/* Foundation Impact */}
              <div className="ultra-card bg-gradient-to-r from-dna-gold/20 to-dna-orange/20 border-dna-gold/50">
                <h3 className="text-2xl font-black text-dna-gold mb-6 text-center flex items-center justify-center gap-2">
                  <Building className="w-6 h-6" />
                  {currentLeader.foundationImpact.name}
                </h3>
                <div className="text-center mb-8">
                  <div className="text-lg text-white font-medium italic">
                    "{currentLeader.foundationImpact.mission}"
                  </div>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-dna-gold font-bold text-lg mb-4">PROGRAMS CREATED</h4>
                    <div className="space-y-3">
                      {currentLeader.foundationImpact.programs.map((program, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                          <div className="text-white text-sm">{program}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-dna-gold font-bold text-lg mb-4">MEASURABLE RESULTS</h4>
                    <div className="space-y-3">
                      {currentLeader.foundationImpact.results.map((result, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Trophy className="w-5 h-5 text-dna-gold mt-0.5 flex-shrink-0" />
                          <div className="text-white text-sm font-medium">{result}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* National Recognition & Athletic Success */}
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="relative overflow-hidden rounded-2xl border-2 border-purple-500/80 bg-black/90 backdrop-blur-xl p-6">
                {/* Strong dark background overlay for perfect contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 via-black/90 to-purple-700/60 backdrop-blur-sm" />
                
                {/* Content with guaranteed high contrast */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-purple-400 mb-6 flex items-center gap-2">
                    <Star className="w-6 h-6" />
                    NATIONAL RECOGNITION
                  </h3>
                  <div className="space-y-4 text-sm">
                    {Object.entries(currentLeader.nationalRecognition).map(([key, value], index) => (
                      <div key={index}>
                        <div className="text-purple-300 font-bold capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        <div className="text-white">{value}</div>
                      </div>
                    ))}
                  </div>
                  </div>
                </div>

                <div className="ultra-card bg-gradient-to-r from-dna-blue/30 to-blue-700/20 border-dna-blue/50">
                  <h3 className="text-2xl font-black text-dna-blue mb-6 flex items-center gap-2">
                    <Trophy className="w-6 h-6" />
                    ATHLETIC SUCCESS
                  </h3>
                  <div className="space-y-4 text-sm">
                    {Object.entries(currentLeader.athleticSuccess).map(([key, value], index) => (
                      <div key={index}>
                        <div className="text-dna-blue font-bold capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        <div className="text-white font-medium">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* UltraPreps Platform Impact */}
              <div className="ultra-card bg-gradient-to-r from-dna-blue/30 to-purple-900/30 border-dna-blue/50">
                <h3 className="text-2xl font-black text-dna-blue mb-6 text-center flex items-center justify-center gap-2">
                  <Zap className="w-6 h-6" />
                  ULTRAPREPS COMMUNITY LEADERSHIP PLATFORM
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(currentLeader.ultraPrepsImpact).map(([key, value], index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-dna-blue/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                        {key === 'platform' && <Megaphone className="w-6 h-6 text-dna-blue" />}
                        {key === 'connections' && <Handshake className="w-6 h-6 text-dna-blue" />}
                        {key === 'resources' && <Gift className="w-6 h-6 text-dna-blue" />}
                        {key === 'media' && <Globe className="w-6 h-6 text-dna-blue" />}
                        {key === 'scaling' && <TrendingUp className="w-6 h-6 text-dna-blue" />}
                        {key === 'sustainability' && <Building className="w-6 h-6 text-dna-blue" />}
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
                  <Users className="w-12 h-12 text-dna-gold mx-auto mb-6" />
                  <div className="text-dna-gold font-bold text-lg mb-4">COMMUNITY VOICE</div>
                  <blockquote className="text-xl text-white font-medium italic mb-6 leading-relaxed">
                    "{currentLeader.communityQuote}"
                  </blockquote>
                  <cite className="text-dna-gold font-bold">
                    — {currentLeader.communityName}
                  </cite>
                </div>

                <div className="relative overflow-hidden rounded-2xl border-2 border-green-500/80 bg-black/90 backdrop-blur-xl p-6 text-center">
                {/* Strong dark background overlay for perfect contrast */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-black/90 to-green-700/60 backdrop-blur-sm" />
                
                {/* Content with guaranteed high contrast */}
                <div className="relative z-10">
                  <Heart className="w-12 h-12 text-green-400 mx-auto mb-6" />
                  <div className="text-green-400 font-bold text-lg mb-4">FAMILY PRIDE</div>
                  <blockquote className="text-xl text-green-100 font-medium italic mb-6 leading-relaxed">
                    "{currentLeader.familyQuote}"
                  </blockquote>
                  <cite className="text-green-400 font-bold">
                    — {currentLeader.parentName}
                  </cite>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Call to Action */}
          <div className="text-center ultra-section-spacing">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="space-y-6"
            >
              <h2 className="ultra-section-title">
                RAISE THE NEXT GENERATION OF LEADERS
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
                Sports teach more than competition - they build character, leadership, and community impact. 
                Give your athlete the platform to change the world through their talents.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  href="/stadium/create"
                  className="ultra-btn-primary px-12 py-6 text-xl"
                >
                  <Crown className="w-7 h-7" />
                  Build Community Leaders
                  <ArrowRight className="w-7 h-7" />
                </Link>
                
                <Link
                  href="/demo/global-mentorship-network"
                  className="ultra-btn-secondary px-12 py-6 text-xl"
                >
                  <Globe className="w-7 h-7" />
                  Connect with Legends
                </Link>
              </div>

              <div className="pt-8 text-sm text-white/60">
                <p>Join 127 young athletes who've started foundations and transformed their communities</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}