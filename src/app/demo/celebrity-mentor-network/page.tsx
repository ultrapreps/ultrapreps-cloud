'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Crown, Star, Trophy, Users, MessageCircle, Video,
  Calendar, Target, Award, Globe, Phone, Mail,
  Clock, CheckCircle, Flame, Zap, Brain, Heart,
  Camera, Mic, BookOpen, TrendingUp, Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function CelebrityMentorNetworkDemo() {
  const [selectedMentor, setSelectedMentor] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(0);
  const [showMentorshipCall, setShowMentorshipCall] = useState(false);

  const celebrityMentors = [
    {
      id: 1,
      name: 'LeBron James',
      sport: 'Basketball',
      achievements: '4x NBA Champion, 4x Finals MVP, 19x All-Star',
      netWorth: '$1.2 Billion',
      expertise: ['Leadership', 'Business Empire Building', 'Media Mastery', 'Community Impact'],
      currentStudents: 23,
      totalMentored: 847,
      successStories: '$47M in scholarships generated for mentees',
      
      availabilityThisWeek: [
        { day: 'Tuesday', time: '7:00 PM EST', duration: '45 minutes', type: 'Group Leadership Call' },
        { day: 'Thursday', time: '6:30 PM EST', duration: '30 minutes', type: '1-on-1 Career Strategy' },
        { day: 'Saturday', time: '10:00 AM EST', duration: '60 minutes', type: 'Basketball Skills Clinic' }
      ],
      
      mentorshipStyle: 'Direct, challenging, focused on building complete champions both on and off the court',
      costToAccess: 'Free through UltraPreps AI matching algorithm',
      
      recentMentorshipWins: [
        { student: 'Jaylen Washington', achievement: 'Duke University Full Ride', value: '$320,000', timeframe: '6 months' },
        { student: 'Marcus Thompson', achievement: 'Nike NIL Deal', value: '$180,000', timeframe: '4 months' },
        { student: 'Zion Miller', achievement: 'ESPN Feature Story', value: 'Priceless exposure', timeframe: '2 months' }
      ],
      
      mentorshipQuote: "I don't just teach basketball. I teach young kings and queens how to build empires that change their families forever.",
      
      connectionProcess: {
        step1: 'AI analyzes your athletic profile and identifies LeBron alignment',
        step2: 'Platform submits your highlights and story to LeBron\'s team',
        step3: 'LeBron personally reviews top 3 candidates each week',
        step4: 'Selected students get direct calendar access for mentorship calls',
        step5: 'Ongoing relationship with monthly check-ins and opportunity sharing'
      }
    },
    
    {
      id: 2,
      name: 'Megan Rapinoe',
      sport: 'Soccer',
      achievements: '2x World Cup Champion, Olympic Gold Medal, Ballon d\'Or Winner',
      netWorth: '$85 Million',
      expertise: ['Leadership Excellence', 'Social Impact', 'Brand Partnerships', 'Mental Toughness'],
      currentStudents: 31,
      totalMentored: 1124,
      successStories: '$23M in NIL deals negotiated for female athlete mentees',
      
      availabilityThisWeek: [
        { day: 'Monday', time: '5:00 PM EST', duration: '60 minutes', type: 'Women\'s Leadership Workshop' },
        { day: 'Wednesday', time: '7:00 PM EST', duration: '30 minutes', type: '1-on-1 Career Guidance' },
        { day: 'Friday', time: '4:00 PM EST', duration: '45 minutes', type: 'Brand Building Masterclass' }
      ],
      
      mentorshipStyle: 'Empowering, authentic, focused on using athletic platform for maximum social and financial impact',
      costToAccess: 'Free through UltraPreps women\'s athletics priority matching',
      
      recentMentorshipWins: [
        { student: 'Sofia Martinez', achievement: 'Adidas Partnership', value: '$240,000', timeframe: '5 months' },
        { student: 'Ashley Chen', achievement: 'Stanford Full Scholarship', value: '$280,000', timeframe: '7 months' },
        { student: 'Maya Johnson', achievement: 'ESPN Documentary Feature', value: 'Career-changing exposure', timeframe: '3 months' }
      ],
      
      mentorshipQuote: "Every young woman athlete has the power to change the world. I'm here to show them exactly how to use that power.",
      
      connectionProcess: {
        step1: 'AI identifies female athletes with leadership potential and social impact goals',
        step2: 'Platform curates your story highlighting community involvement and athletic excellence',
        step3: 'Megan personally selects mentees based on potential for positive change',
        step4: 'Selected athletes get access to private mentorship group and 1-on-1 sessions',
        step5: 'Ongoing support with brand partnership negotiations and social impact projects'
      }
    },
    
    {
      id: 3,
      name: 'Usain Bolt',
      sport: 'Track & Field',
      achievements: '8x Olympic Gold Medal, 11x World Champion, World Record Holder',
      netWorth: '$120 Million',
      expertise: ['Peak Performance', 'Global Brand Building', 'Mental Preparation', 'Legacy Creation'],
      currentStudents: 18,
      totalMentored: 623,
      successStories: '$31M in international opportunities created for sprint mentees',
      
      availabilityThisWeek: [
        { day: 'Tuesday', time: '6:00 AM EST', duration: '30 minutes', type: 'Morning Motivation Session' },
        { day: 'Thursday', time: '8:00 PM EST', duration: '45 minutes', type: 'Speed & Technique Analysis' },
        { day: 'Sunday', time: '2:00 PM EST', duration: '60 minutes', type: 'Legacy Building Workshop' }
      ],
      
      mentorshipStyle: 'High-energy, precision-focused, dedicated to creating the next generation of track legends',
      costToAccess: 'Free through UltraPreps track & field excellence matching',
      
      recentMentorshipWins: [
        { student: 'Damian Foster', achievement: 'Olympic Training Center Invitation', value: 'Elite pathway access', timeframe: '8 months' },
        { student: 'Alicia Brown', achievement: 'Puma Sponsorship Deal', value: '$195,000', timeframe: '6 months' },
        { student: 'Tyler Jackson', achievement: 'World Youth Championships Team', value: 'International competition', timeframe: '10 months' }
      ],
      
      mentorshipQuote: "Speed is not just about running fast. It's about moving through life with purpose, precision, and unstoppable confidence.",
      
      connectionProcess: {
        step1: 'AI identifies track athletes with sub-elite times and improvement potential',
        step2: 'Platform analyzes training videos and performance data for technical optimization',
        step3: 'Usain reviews athletes showing dedication and explosive potential',
        step4: 'Selected sprinters get technical coaching and mental preparation sessions',
        step5: 'Pathway to international competition and professional sponsorship opportunities'
      }
    },
    
    {
      id: 4,
      name: 'Simone Biles',
      sport: 'Gymnastics',
      achievements: '7x Olympic Medal, 25x World Medal, Most Decorated Gymnast Ever',
      netWorth: '$16 Million',
      expertise: ['Mental Resilience', 'Pressure Performance', 'Personal Brand', 'Overcoming Adversity'],
      currentStudents: 27,
      totalMentored: 891,
      successStories: '$18M in gymnastics scholarships and endorsements for mentees',
      
      availabilityThisWeek: [
        { day: 'Monday', time: '7:30 PM EST', duration: '45 minutes', type: 'Mental Toughness Training' },
        { day: 'Wednesday', time: '6:00 PM EST', duration: '30 minutes', type: '1-on-1 Confidence Building' },
        { day: 'Saturday', time: '11:00 AM EST', duration: '60 minutes', type: 'Competition Prep Workshop' }
      ],
      
      mentorshipStyle: 'Compassionate, resilient-focused, committed to building mentally and physically strong champions',
      costToAccess: 'Free through UltraPreps gymnastics and mental wellness matching',
      
      recentMentorshipWins: [
        { student: 'Grace Kim', achievement: 'UCLA Gymnastics Scholarship', value: '$240,000', timeframe: '9 months' },
        { student: 'Emma Rodriguez', achievement: 'Nike Partnership', value: '$125,000', timeframe: '7 months' },
        { student: 'Sarah Williams', achievement: 'Elite National Team Selection', value: 'Olympic pathway', timeframe: '14 months' }
      ],
      
      mentorshipQuote: "Greatness isn't about being perfect. It's about having the courage to keep going when everything seems impossible.",
      
      connectionProcess: {
        step1: 'AI identifies gymnasts and athletes struggling with mental pressure or adversity',
        step2: 'Platform assesses mental resilience needs and competitive potential',
        step3: 'Simone personally connects with athletes who show heart and determination',
        step4: 'Selected athletes receive mental coaching and pressure performance training',
        step5: 'Ongoing support through competition cycles and personal challenges'
      }
    },
    
    {
      id: 5,
      name: 'Tom Brady',
      sport: 'Football',
      achievements: '7x Super Bowl Champion, 5x Super Bowl MVP, 15x Pro Bowler',
      netWorth: '$333 Million',
      expertise: ['Championship Mindset', 'Longevity', 'Business Ventures', 'Leadership Under Pressure'],
      currentStudents: 19,
      totalMentored: 567,
      successStories: '$73M in football scholarships and NFL preparation for QB mentees',
      
      availabilityThisWeek: [
        { day: 'Tuesday', time: '8:00 PM EST', duration: '60 minutes', type: 'QB Leadership Clinic' },
        { day: 'Thursday', time: '7:00 PM EST', duration: '30 minutes', type: '1-on-1 Game Film Review' },
        { day: 'Sunday', time: '1:00 PM EST', duration: '45 minutes', type: 'Championship Mindset Workshop' }
      ],
      
      mentorshipStyle: 'Disciplined, detail-oriented, focused on building champions who excel under the highest pressure',
      costToAccess: 'Free through UltraPreps quarterback and football leadership matching',
      
      recentMentorshipWins: [
        { student: 'Cameron Davis', achievement: 'Alabama Football Offer', value: '$350,000', timeframe: '11 months' },
        { student: 'Jackson Miller', achievement: 'Elite 11 QB Camp Selection', value: 'NFL pathway access', timeframe: '8 months' },
        { student: 'Ryan Foster', achievement: 'Under Armour All-America Game', value: 'National recognition', timeframe: '6 months' }
      ],
      
      mentorshipQuote: "Champions aren't made in the spotlight. They're forged in the preparation when nobody's watching.",
      
      connectionProcess: {
        step1: 'AI identifies quarterbacks and team leaders with championship potential',
        step2: 'Platform analyzes leadership qualities and performance under pressure',
        step3: 'Tom personally evaluates athletes who demonstrate Brady-level work ethic',
        step4: 'Selected QBs get game film review and mental preparation coaching',
        step5: 'Pathway to elite camps, college recruitment, and professional development'
      }
    }
  ];

  const studentSuccessStories = [
    {
      id: 1,
      name: 'Marcus Williams',
      age: 17,
      sport: 'Basketball',
      school: 'King High School, Detroit',
      mentor: 'LeBron James',
      
      beforeMentorship: {
        gpa: '2.3',
        ranking: 'Unranked regionally',
        colleges: 'No interest',
        income: '$0',
        future: 'Uncertain basketball future'
      },
      
      mentorshipJourney: {
        duration: '8 months',
        sessions: '12 direct calls with LeBron',
        focusAreas: ['Leadership development', 'Academic accountability', 'Media training', 'Business mindset'],
        breakthroughMoment: 'Month 4 - LeBron connected Marcus with Lakers youth development program'
      },
      
      afterMentorship: {
        gpa: '3.7',
        ranking: 'Top 50 nationally',
        colleges: 'Duke, UNC, UCLA offers',
        scholarshipValue: '$280,000',
        nilDeals: '$147,000 Nike partnership',
        future: 'Clear pathway to NBA'
      },
      
      mentorshipHighlights: [
        'Personal phone call from LeBron after championship game',
        'Invited to Lakers practice facility for private workout',
        'Connected with LeBron\'s agent for NIL deal negotiations',
        'Featured in ESPN story about LeBron\'s mentorship program',
        'Direct text message support before every big game'
      ],
      
      testimonial: "LeBron didn't just teach me basketball. He taught me how to be a leader, a student, and a businessman. He literally changed my family's entire future.",
      
      familyImpact: "Marcus used his NIL earnings to help his mom avoid eviction and is now planning to buy the family their first house."
    },
    
    {
      id: 2,
      name: 'Sofia Rodriguez',
      age: 16,
      sport: 'Soccer',
      school: 'Valley Academy, Phoenix',
      mentor: 'Megan Rapinoe',
      
      beforeMentorship: {
        gpa: '3.2',
        ranking: 'State level player',
        colleges: 'Few D2 interests',
        activism: 'No platform',
        future: 'Limited soccer opportunities'
      },
      
      mentorshipJourney: {
        duration: '10 months',
        sessions: '15 video calls with Megan',
        focusAreas: ['Social impact leadership', 'Brand building', 'College recruitment', 'Equal pay advocacy'],
        breakthroughMoment: 'Month 6 - Megan helped Sofia start youth soccer program for immigrant families'
      },
      
      afterMentorship: {
        gpa: '3.9',
        ranking: 'National team development program',
        colleges: 'Stanford, Duke, UNC full ride offers',
        scholarshipValue: '$320,000',
        activism: 'Founded nonprofit serving 200+ kids',
        future: 'World Cup potential + social impact career'
      },
      
      mentorshipHighlights: [
        'Joint Instagram Live with Megan reaching 2.3M viewers',
        'Invited to US Women\'s National Team training camp',
        'Megan personally introduced Sofia to Stanford coaches',
        'Featured in People Magazine profile about young activists',
        'Received surprise video message from Megan before state championship'
      ],
      
      testimonial: "Megan showed me that being a great athlete means using your platform to make the world better. She gave me the confidence to dream bigger than I ever thought possible.",
      
      familyImpact: "Sofia's nonprofit work and scholarship earned her family recognition in their community, and her success opened doors for her younger siblings."
    }
  ];

  const mentorshipLiveStats = {
    totalMentors: '247',
    activeMentorships: '1,847',
    successRate: '94%',
    scholarshipsGenerated: '$127M',
    nilDealsCreated: '$89M',
    averageResponseTime: '6 hours',
    studentsWaitingList: '4,847',
    mentorHoursThisMonth: '2,340'
  };

  const currentMentor = celebrityMentors[selectedMentor];
  const currentStudent = studentSuccessStories[selectedStudent];

  return (
    <div className="ultra-page-layout">
      {/* Stadium Background */}
      <div className="absolute inset-0 ultra-stadium-bg" />
      <div className="absolute inset-0 ultra-overlay-primary" />
      <div className="absolute inset-0 ultra-overlay-secondary" />

      <div className="ultra-content-wrapper">
        <div className="ultra-container">
          
          {/* Header */}
          <div className="text-center ultra-section-spacing">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-4 mb-6"
            >
              <Crown className="w-16 h-16 text-dna-gold animate-bounce" />
              <h1 className="ultra-hero-text">
                DIRECT ACCESS TO LEGENDS
              </h1>
              <Star className="w-16 h-16 text-dna-gold animate-bounce" />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-white/80 max-w-5xl mx-auto leading-relaxed font-medium mb-8"
            >
              Get **personal mentorship** from LeBron James, Megan Rapinoe, Usain Bolt, and 247 other 
              celebrity athletes. This isn't a meet-and-greet - it's **life-changing career coaching**.
            </motion.p>

            {/* Live Mentorship Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="ultra-card bg-gradient-to-r from-purple-900/40 to-blue-900/40 border-dna-gold/50 mb-16"
            >
              <h3 className="ultra-card-title mb-6 flex items-center justify-center gap-2">
                <Users className="w-6 h-6 text-dna-gold" />
                LIVE MENTORSHIP NETWORK STATUS
              </h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-black text-dna-gold mb-1">{mentorshipLiveStats.totalMentors}</div>
                  <div className="text-sm text-white/70">Celebrity Mentors</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-dna-gold mb-1">{mentorshipLiveStats.activeMentorships}</div>
                  <div className="text-sm text-white/70">Active Mentorships</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-dna-gold mb-1">{mentorshipLiveStats.successRate}</div>
                  <div className="text-sm text-white/70">Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-dna-gold mb-1">{mentorshipLiveStats.averageResponseTime}</div>
                  <div className="text-sm text-white/70">Avg Response Time</div>
                </div>
              </div>
            </motion.div>

            {/* Celebrity Mentor Selector */}
            <div className="grid md:grid-cols-5 gap-4 mb-16">
              {celebrityMentors.map((mentor, index) => (
                <motion.button
                  key={mentor.id}
                  onClick={() => setSelectedMentor(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`ultra-card transition-all ${
                    selectedMentor === index
                      ? 'border-dna-gold shadow-lg shadow-dna-gold/25'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <Star className="w-8 h-8 text-dna-gold mx-auto mb-3" />
                  <h3 className="text-lg font-black text-white mb-2">{mentor.name}</h3>
                  <p className="text-sm text-white/70 mb-3">{mentor.sport}</p>
                  <div className="text-xs text-dna-gold font-bold">
                    {mentor.currentStudents} Active Students
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Active Mentor Deep Dive */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMentor}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="ultra-card bg-gradient-to-br from-dna-blue/20 to-purple-900/20 border-dna-gold/50 mb-16"
              >
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <Crown className="w-12 h-12 text-dna-gold" />
                      <div>
                        <h2 className="text-3xl font-black text-dna-gold">{currentMentor.name}</h2>
                        <p className="text-white/70">{currentMentor.achievements}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-black/30 rounded-xl p-4">
                        <div className="text-sm text-white/70 mb-1">Net Worth</div>
                        <div className="text-lg font-black text-dna-gold">{currentMentor.netWorth}</div>
                      </div>
                      <div className="bg-black/30 rounded-xl p-4">
                        <div className="text-sm text-white/70 mb-1">Students Mentored</div>
                        <div className="text-lg font-black text-dna-gold">{currentMentor.totalMentored}</div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-black text-white mb-3">Expertise Areas</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentMentor.expertise.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-dna-gold text-black text-sm font-bold rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-xl p-4">
                      <h3 className="text-lg font-black text-white mb-2">Mentorship Style</h3>
                      <p className="text-white/80 text-sm italic">"{currentMentor.mentorshipStyle}"</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white mb-4">This Week's Availability</h3>
                    <div className="space-y-3 mb-6">
                      {currentMentor.availabilityThisWeek.map((session, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-green-900/30 border border-green-400/50 rounded-xl p-4"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div className="text-green-400 font-bold">{session.day}</div>
                            <div className="text-white/70 text-sm">{session.duration}</div>
                          </div>
                          <div className="text-white font-bold mb-1">{session.time}</div>
                          <div className="text-white/80 text-sm">{session.type}</div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="bg-dna-gold/20 border border-dna-gold/50 rounded-xl p-4 mb-6">
                      <h3 className="text-lg font-black text-dna-gold mb-2 flex items-center gap-2">
                        <Trophy className="w-5 h-5" />
                        Recent Success Stories
                      </h3>
                      <div className="space-y-2">
                        {currentMentor.recentMentorshipWins.slice(0, 2).map((win, index) => (
                          <div key={index} className="text-sm">
                            <div className="text-white font-bold">{win.student}</div>
                            <div className="text-white/70">{win.achievement} - {win.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        onClick={() => setShowMentorshipCall(true)}
                        className="ultra-btn-primary w-full flex items-center justify-center gap-2"
                      >
                        <Video className="w-4 h-4" />
                        Request Mentorship Session
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Student Success Story Selector */}
            <div className="ultra-card bg-gradient-to-r from-green-900/20 to-blue-900/20 border-dna-gold/50 mb-16">
              <h2 className="text-3xl font-black text-dna-gold text-center mb-8 flex items-center justify-center gap-2">
                <Sparkles className="w-8 h-8" />
                REAL MENTORSHIP TRANSFORMATIONS
              </h2>

              <div className="flex justify-center gap-4 mb-8">
                {studentSuccessStories.map((student, index) => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudent(index)}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${
                      selectedStudent === index
                        ? 'bg-dna-gold text-black'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {student.name}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedStudent}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid lg:grid-cols-3 gap-8"
                >
                  <div>
                    <h3 className="text-2xl font-black text-white mb-4">{currentStudent.name}</h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-white/70">Age:</span>
                        <span className="text-white">{currentStudent.age}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Sport:</span>
                        <span className="text-white">{currentStudent.sport}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Mentor:</span>
                        <span className="text-dna-gold font-bold">{currentStudent.mentor}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/70">Duration:</span>
                        <span className="text-white">{currentStudent.mentorshipJourney.duration}</span>
                      </div>
                    </div>

                    <div className="bg-black/30 rounded-xl p-4">
                      <h4 className="text-lg font-black text-white mb-2">Testimonial</h4>
                      <p className="text-white/80 text-sm italic">"{currentStudent.testimonial}"</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white mb-4">Before vs After</h3>
                    <div className="space-y-4">
                      <div className="bg-red-900/30 border border-red-400/50 rounded-xl p-4">
                        <h4 className="text-red-400 font-bold mb-2">Before Mentorship</h4>
                        <div className="space-y-1 text-sm">
                          <div>GPA: {currentStudent.beforeMentorship.gpa}</div>
                          <div>Ranking: {currentStudent.beforeMentorship.ranking}</div>
                          <div>Colleges: {currentStudent.beforeMentorship.colleges}</div>
                        </div>
                      </div>
                      
                      <div className="bg-green-900/30 border border-green-400/50 rounded-xl p-4">
                        <h4 className="text-green-400 font-bold mb-2">After Mentorship</h4>
                        <div className="space-y-1 text-sm">
                          <div>GPA: {currentStudent.afterMentorship.gpa}</div>
                          <div>Ranking: {currentStudent.afterMentorship.ranking}</div>
                          <div>Scholarship: {currentStudent.afterMentorship.scholarshipValue}</div>
                          <div>NIL Deals: {currentStudent.afterMentorship.nilDeals}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white mb-4">Mentorship Highlights</h3>
                    <div className="space-y-3">
                      {currentStudent.mentorshipHighlights.map((highlight, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2 text-white/80 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                          <span>{highlight}</span>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="bg-dna-gold/20 border border-dna-gold/50 rounded-xl p-4 mt-6">
                      <h4 className="text-dna-gold font-bold mb-2">Family Impact</h4>
                      <p className="text-white/80 text-sm">{currentStudent.familyImpact}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* How AI Matches Students to Mentors */}
            <div className="ultra-card bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-dna-gold/50 mb-16">
              <h2 className="text-3xl font-black text-dna-gold text-center mb-8 flex items-center justify-center gap-2">
                <Brain className="w-8 h-8" />
                AI MENTOR MATCHING SYSTEM
              </h2>
              
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-black text-white mb-4">How AI Connects You</h3>
                  <div className="space-y-4">
                    {currentMentor.connectionProcess && Object.entries(currentMentor.connectionProcess).map(([step, description], index) => (
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 bg-black/30 rounded-xl p-4"
                      >
                        <div className="w-8 h-8 bg-dna-gold rounded-full flex items-center justify-center text-black font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="text-white/80 text-sm">{description}</div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-black text-white mb-4">Success Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/30 rounded-xl p-4 text-center">
                      <div className="text-2xl font-black text-dna-gold mb-1">{mentorshipLiveStats.scholarshipsGenerated}</div>
                      <div className="text-xs text-white/70">Scholarships Generated</div>
                    </div>
                    <div className="bg-black/30 rounded-xl p-4 text-center">
                      <div className="text-2xl font-black text-dna-gold mb-1">{mentorshipLiveStats.nilDealsCreated}</div>
                      <div className="text-xs text-white/70">NIL Deals Created</div>
                    </div>
                    <div className="bg-black/30 rounded-xl p-4 text-center">
                      <div className="text-2xl font-black text-dna-gold mb-1">{mentorshipLiveStats.successRate}</div>
                      <div className="text-xs text-white/70">Success Rate</div>
                    </div>
                    <div className="bg-black/30 rounded-xl p-4 text-center">
                      <div className="text-2xl font-black text-green-400 mb-1">FREE</div>
                      <div className="text-xs text-white/70">Cost to Students</div>
                    </div>
                  </div>
                  
                  <div className="bg-dna-gold/20 border border-dna-gold/50 rounded-xl p-4 mt-6">
                    <h4 className="text-dna-gold font-bold mb-2 flex items-center gap-2">
                      <Flame className="w-5 h-5" />
                      Why Legends Mentor Through UltraPreps
                    </h4>
                    <ul className="text-white/80 text-sm space-y-1">
                      <li>• AI pre-screens for serious, dedicated athletes</li>
                      <li>• Platform handles all scheduling and logistics</li>
                      <li>• Direct impact tracking shows measurable results</li>
                      <li>• Exclusive access to the most promising young talent</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Mentorship Request Demo Modal */}
            <AnimatePresence>
              {showMentorshipCall && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                  onClick={() => setShowMentorshipCall(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="ultra-card bg-gradient-to-br from-dna-blue/30 to-purple-900/30 border-dna-gold/50 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Crown className="w-8 h-8 text-dna-gold" />
                        <h3 className="text-2xl font-black text-dna-gold">Mentorship Request Demo</h3>
                      </div>
                      <button
                        onClick={() => setShowMentorshipCall(false)}
                        className="text-white/70 hover:text-white"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-green-900/30 border border-green-400/50 rounded-xl p-4">
                        <h4 className="text-green-400 font-bold mb-2 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          AI Auto-Matched with {currentMentor.name}
                        </h4>
                        <p className="text-white/80 text-sm">
                          Based on your athletic profile, AI has identified {currentMentor.name} as your 
                          perfect mentor match with 97.4% compatibility.
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-black/30 rounded-xl p-4">
                          <h4 className="text-white font-bold mb-3">Your Request Status</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-white/70">Submitted:</span>
                              <span className="text-green-400">✓ Just now</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">AI Review:</span>
                              <span className="text-green-400">✓ Approved</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Mentor Match:</span>
                              <span className="text-green-400">✓ 97.4% compatibility</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Response Time:</span>
                              <span className="text-dna-gold">~6 hours</span>
                            </div>
                          </div>
                        </div>

                        <div className="bg-black/30 rounded-xl p-4">
                          <h4 className="text-white font-bold mb-3">Next Steps</h4>
                          <div className="space-y-2 text-sm text-white/80">
                            <div className="flex items-start gap-2">
                              <Clock className="w-4 h-4 text-dna-gold mt-0.5 flex-shrink-0" />
                              <span>{currentMentor.name} will review your athletic highlights</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <MessageCircle className="w-4 h-4 text-dna-gold mt-0.5 flex-shrink-0" />
                              <span>Personal video message response within 6 hours</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Calendar className="w-4 h-4 text-dna-gold mt-0.5 flex-shrink-0" />
                              <span>Direct calendar access for 1-on-1 sessions</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-dna-gold/20 border border-dna-gold/50 rounded-xl p-4">
                        <h4 className="text-dna-gold font-bold mb-2">Why You're a Perfect Match</h4>
                        <ul className="text-white/80 text-sm space-y-1">
                          <li>• Your leadership style aligns with {currentMentor.name}'s mentorship approach</li>
                          <li>• Athletic performance metrics show championship potential</li>
                          <li>• Community engagement scores match {currentMentor.name}'s values</li>
                          <li>• Academic-athletic balance demonstrates coachability</li>
                        </ul>
                      </div>

                      <div className="bg-black/30 rounded-xl p-4">
                        <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-dna-gold" />
                          What Happens Next (Demo Preview)
                        </h4>
                        <div className="space-y-3 text-sm text-white/80">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-dna-gold rounded-full flex items-center justify-center text-black font-bold text-xs flex-shrink-0">1</div>
                            <span>Personal video message from {currentMentor.name} acknowledging your request</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-dna-gold rounded-full flex items-center justify-center text-black font-bold text-xs flex-shrink-0">2</div>
                            <span>Calendar access for weekly 30-minute mentorship sessions</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-dna-gold rounded-full flex items-center justify-center text-black font-bold text-xs flex-shrink-0">3</div>
                            <span>Direct text/call access during critical decision moments</span>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-dna-gold rounded-full flex items-center justify-center text-black font-bold text-xs flex-shrink-0">4</div>
                            <span>Introduction to {currentMentor.name}'s professional network and opportunities</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-green-400 font-bold mb-2 flex items-center justify-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Request Successfully Submitted
                        </div>
                        <p className="text-white/70 text-sm mb-4">
                          This is a demo - but the actual process is this seamless!
                        </p>
                        <Link href="/stadium/create" className="ultra-btn-primary">
                          Create Your Real Profile
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Final CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-center"
            >
              <h2 className="text-4xl font-black text-white mb-6">
                YOUR LEGEND MENTOR IS WAITING
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
                247 celebrity athletes ready to personally guide your career. AI matching ensures 
                you connect with the **perfect mentor** for your sport, goals, and personality.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/stadium/create" className="ultra-btn-primary">
                  Get Matched With My Mentor
                </Link>
                <Link href="/demo/ai-brain-mechanics" className="ultra-btn-secondary">
                  See AI Matching System
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}