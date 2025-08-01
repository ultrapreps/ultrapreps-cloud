'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Zap, Crown, Trophy, Target, Star, BookOpen } from 'lucide-react';
import Image from 'next/image';

interface ChatMessage {
  id: string;
  type: 'user' | 'gage';
  content: string;
  timestamp: Date;
  hypeAwarded?: number;
}

interface GageAIChatProps {
  userId: string;
  isOpen: boolean;
  onToggle: () => void;
}

// Gage's LEGENDARY knowledge base - The Ultimate Mentor
const GAGE_RESPONSES = {
  greetings: [
    "Hey there, champion! 🏆 I'm Gage Coleman, founder of UltraPreps and your first friend here! Ready to build something LEGENDARY?",
    "What's up, superstar! Welcome to your new digital home where dreams become reality! 🚀",
    "Welcome to the family! I'm here to help you dominate every aspect of your journey! 💪",
    "Hey future legend! Time to unlock your full potential - I've got the keys! ✨",
    "Champion! You just stepped into the most powerful student platform ever created. Let's get started! ⚡"
  ],

  // SPORTS KNOWLEDGE (Football)
  football_strategy: [
    "Football IQ is everything! Study film like Tom Brady - 3 hours of film for every 1 hour of practice. Break down opposing defenses and learn to read coverage pre-snap!",
    "Want to dominate at QB? Master the pocket presence first. Practice your footwork daily - 3-step, 5-step, 7-step drops until they're muscle memory!",
    "Running backs: Vision beats speed every time. Study how Saquon Barkley sets up his cuts. Plant and go - no dancing in the backfield!",
    "Defense wins championships! Study Ray Lewis' film - see how he reads the offense's keys and communicates. Leadership on defense is game-changing!",
    "O-line dominance starts with footwork. Master your kick-step, punch technique, and hand placement. Protect your QB like your life depends on it!"
  ],

  basketball_strategy: [
    "Basketball is a game of inches and IQ! Study Kobe's footwork - the jab step, pivot moves, and shot mechanics. Fundamentals separate good from great!",
    "Want to be unstoppable? Master the triple threat position. Catch, square up, read the defense - then attack! Kobe spent hours perfecting this!",
    "Defense creates offense! Study Kawhi Leonard's hand positioning and anticipation. Active hands, quick feet, and force players into tough shots!",
    "Point guards: Court vision is everything! Study how CP3 controls tempo. Always keep your head up and see the floor two passes ahead!",
    "Shooters are made, not born! Steph Curry shoots 500 shots daily. Perfect your form - balance, follow-through, and arc are everything!"
  ],

  baseball_strategy: [
    "Baseball is a mental game! Study pitch sequences like Mookie Betts. Learn to read pitchers' tells and count tendencies. Every at-bat is a chess match!",
    "Pitching dominance starts with command, not velocity! Study Greg Maddux - location beats gas every time. Paint the corners and change eye levels!",
    "Hit for average AND power! Study Vladimir Guerrero Jr.'s approach - short stride, quiet hands, and attack strikes early in counts!",
    "Defense saves games! Study Andrelton Simmons' footwork and glove work. Every play matters - make the routine plays look easy!",
    "Catchers are field generals! Study how Yadier Molina calls games. Know every pitcher's strengths and weaknesses inside out!"
  ],

  recruiting_secrets: [
    "Recruiting secret: Coaches want COACHABLE players! Show up early, stay late, ask questions, and never complain. Character matters more than talent!",
    "Film is your best friend! Create a 3-4 minute highlight reel showing your best plays. Quality over quantity - show your range and impact!",
    "Grades unlock doors! A 3.5+ GPA opens 80% more opportunities. Academic performance shows discipline and future potential!",
    "Build authentic relationships! Follow coaches on social media, engage with their content, and show genuine interest in their program!",
    "Showcase your leadership! Coaches recruit leaders who make teammates better. Show how you elevate others both on and off the field!",
    "Size matters, but heart matters more! Tim Tebow was 'too slow' for the NFL but won everything in college. Play with passion and prove doubters wrong!",
    "Create your brand! Be known for something special - work ethic, clutch performances, leadership. Make yourself unforgettable!"
  ],

  scholarship_advice: [
    "Academic scholarships often have less competition than athletic ones! Maintain a 3.7+ GPA and score 1300+ on SAT for serious money!",
    "Apply to 15-20 schools minimum! Cast a wide net - you only need ONE yes! Don't limit yourself geographically!",
    "FAFSA is your friend! Fill it out even if your family makes good money. You might qualify for grants you didn't expect!",
    "Smaller schools often offer MORE money! Division II and III schools can provide better financial packages than Division I!",
    "Merit scholarships stack! Academic + athletic + need-based can cover 100% of costs. Layer your opportunities!",
    "Apply early! Many scholarships are first-come, first-served. Don't wait until senior year - start junior year!"
  ],

  motivation_legendary: [
    "Champions are made in the off-season! When everyone else is relaxing, you're grinding. That's how legends separate themselves! 🔥",
    "Kobe's 4 AM workouts weren't about basketball - they were about the mindset! What are YOU willing to do that others won't?",
    "Every rep counts! Tom Brady doesn't skip workouts at 45 because he knows every detail matters. Your next rep could be the difference!",
    "Pressure creates diamonds! Michael Jordan was cut from his high school team. Use setbacks as setup for comebacks!",
    "Your work ethic is your signature! Make it so legendary that people know your name before they see your face!",
    "Champions think differently! While others see obstacles, you see opportunities. That mindset shift changes everything!",
    "Your dreams are on the other side of your fears! Attack what scares you - that's where growth lives!"
  ],

  mental_toughness: [
    "Mental toughness is a skill you build! Practice visualization daily - see yourself succeeding in high-pressure moments!",
    "Breath control wins battles! When pressure hits, take 3 deep breaths. Calm mind, clear decisions, clutch performance!",
    "Failure is data, not defeat! Every mistake teaches you something. Champions learn faster because they embrace feedback!",
    "Focus on process, not outcome! Control what you can control - effort, attitude, and preparation. Results follow!",
    "Self-talk is everything! Replace 'I can't' with 'How can I?' Your inner voice determines your outer results!",
    "Pressure is privilege! Only champions get to play when it matters most. Embrace the spotlight - you've earned it!"
  ],

  platform_mastery: [
    "Your HeroCard is your digital business card! Upload your best action shots and keep stats updated. Scouts are watching!",
    "HYPE points aren't just fun - they show engagement! Active profiles get 300% more views from recruiters!",
    "Use our AI tools daily! The Poster Generator and Stats Tracker help you build your brand consistently!",
    "Your Stadium is your home base! Customize it to reflect your personality and achievements. Make it YOURS!",
    "Connect with teammates! The strongest profiles show team chemistry and leadership. Sports are about WE, not ME!",
    "Post consistently! Share workouts, game highlights, and achievements. Consistency builds your brand over time!",
    "Engage with other athletes! Comment, support, and build genuine relationships. Your network is your net worth!"
  ],

  academic_excellence: [
    "GPA is your foundation! Every grade matters - a 3.5 opens doors, a 3.8 opens MORE doors, a 4.0 opens ALL doors!",
    "Time management wins! Use the 50/10 rule - 50 minutes focused study, 10 minute break. Your brain needs rest to retain!",
    "Active reading beats passive reading! Take notes, ask questions, and teach concepts to others. Engage with the material!",
    "Find your learning style! Visual, auditory, or kinesthetic - once you know how you learn best, studying becomes easier!",
    "Seek help early! Don't wait until you're struggling. Teachers respect students who ask for help - it shows maturity!",
    "Connect academics to athletics! Math helps with stats analysis, science helps with nutrition and training. Everything connects!"
  ],

  life_advice: [
    "Character is what you do when nobody's watching! Build habits that make you proud even in private moments!",
    "Surround yourself with champions! Your five closest friends determine your future. Choose wisely!",
    "Give back always! Help younger athletes, volunteer in your community. Success isn't just about what you get!",
    "Stay humble, stay hungry! Confidence is good, arrogance is deadly. There's always someone working harder!",
    "Take care of your body! Sleep 8+ hours, eat clean, stay hydrated. Your body is your vehicle to success!",
    "Read daily! Champions are students first. Read biographies of great athletes and learn from their journeys!",
    "Gratitude changes everything! Write down 3 things you're grateful for daily. Positive mindset attracts positive results!"
  ],

  encouragement: [
    "That's the UltraPreps spirit! Keep pushing forward! Every champion has moments of doubt - push through! 🔥",
    "I see that fire in you! You're not just participating, you're DOMINATING! Keep that energy!",
    "Now THAT'S what I'm talking about! You're built different! Champions recognize champions! ⚡",
    "Every legend started exactly where you are. The difference? They never stopped believing! Keep grinding!",
    "Your potential is UNLIMITED! I've seen thousands of athletes reach the top - you have that same spark!",
    "Obstacles don't stop champions - they reveal champions! You're proving your strength right now!"
  ],

  hype_celebration: [
    "BOOM! 🎉 You just earned some HYPE! That's championship energy right there!",
    "Look at you stacking those HYPE points! The platform feels your momentum! Unstoppable! ⚡",
    "Your HYPE game is LEGENDARY! Every point represents your dedication and growth!",
    "That's how we build empires! HYPE by HYPE, rep by rep! The whole community sees your fire! 🚂",
    "HYPE EXPLOSION! 💥 You're not just earning points - you're inspiring others! That's leadership!",
    "The HYPE meter is going CRAZY! Your energy is contagious - keep spreading those champion vibes!"
  ],

  goals_achievement: [
    "I believe in your dreams 1000%! Every great achievement started with someone believing it was possible!",
    "Goals without a plan are just wishes! Let's break this down into daily actions that create your reality!",
    "Your ambition gives me CHILLS! That hunger is what separates dreamers from achievers!",
    "I've seen thousands of students achieve the 'impossible' - you have that same fire! Let's channel it!",
    "Big dreams require big action! What's the ONE thing you can do TODAY to move closer to your goal?",
    "Your vision is clear, now let's make it REAL! Champions commit to the process, not just the outcome!"
  ]
};

export default function GageAIChat({ userId, isOpen, onToggle }: GageAIChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStage, setConversationStage] = useState<'intro' | 'chatting'>('intro');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize conversation when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: `gage_${Date.now()}`,
        type: 'gage',
        content: GAGE_RESPONSES.greetings[Math.floor(Math.random() * GAGE_RESPONSES.greetings.length)],
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      
      // Follow up with platform introduction
      setTimeout(() => {
        const introMessage: ChatMessage = {
          id: `gage_${Date.now() + 1}`,
          type: 'gage',
          content: "I'm here 24/7 to help you navigate UltraPreps, celebrate your wins, and keep you motivated! What's on your mind?",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, introMessage]);
      }, 2000);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Generate Gage's LEGENDARY AI responses with 100x intelligence
  const generateGageResponse = async (userMessage: string): Promise<ChatMessage> => {
    const lowerMessage = userMessage.toLowerCase();
    let responseCategory = 'encouragement';
    let shouldAwardHype = false;
    let hypeAmount = 5;
    
    // ADVANCED AI - Detect user intent with multiple keywords
    // Sports Strategy
    if (lowerMessage.includes('football') || lowerMessage.includes('quarterback') || lowerMessage.includes('defense') || lowerMessage.includes('offense')) {
      responseCategory = 'football_strategy';
      shouldAwardHype = true;
      hypeAmount = 10;
    } else if (lowerMessage.includes('basketball') || lowerMessage.includes('shooting') || lowerMessage.includes('dribbling') || lowerMessage.includes('defense')) {
      responseCategory = 'basketball_strategy';
      shouldAwardHype = true;
      hypeAmount = 10;
    } else if (lowerMessage.includes('baseball') || lowerMessage.includes('pitching') || lowerMessage.includes('batting') || lowerMessage.includes('catching')) {
      responseCategory = 'baseball_strategy';
      shouldAwardHype = true;
      hypeAmount = 10;
    }
    
    // Recruiting & Scholarships
    else if (lowerMessage.includes('recruit') || lowerMessage.includes('college') || lowerMessage.includes('scout') || lowerMessage.includes('coach')) {
      responseCategory = 'recruiting_secrets';
      shouldAwardHype = true;
      hypeAmount = 15;
    } else if (lowerMessage.includes('scholarship') || lowerMessage.includes('money') || lowerMessage.includes('financial') || lowerMessage.includes('pay')) {
      responseCategory = 'scholarship_advice';
      shouldAwardHype = true;
      hypeAmount = 15;
    }
    
    // Mental & Motivation
    else if (lowerMessage.includes('motivation') || lowerMessage.includes('inspire') || lowerMessage.includes('pump up') || lowerMessage.includes('fired up')) {
      responseCategory = 'motivation_legendary';
      shouldAwardHype = true;
      hypeAmount = 12;
    } else if (lowerMessage.includes('mental') || lowerMessage.includes('pressure') || lowerMessage.includes('nervous') || lowerMessage.includes('confidence')) {
      responseCategory = 'mental_toughness';
      shouldAwardHype = true;
      hypeAmount = 12;
    }
    
    // Platform & Academics
    else if (lowerMessage.includes('ultrapreps') || lowerMessage.includes('platform') || lowerMessage.includes('feature') || lowerMessage.includes('how to')) {
      responseCategory = 'platform_mastery';
      shouldAwardHype = true;
      hypeAmount = 8;
    } else if (lowerMessage.includes('grades') || lowerMessage.includes('study') || lowerMessage.includes('school') || lowerMessage.includes('academic')) {
      responseCategory = 'academic_excellence';
      shouldAwardHype = true;
      hypeAmount = 10;
    }
    
    // Life Advice
    else if (lowerMessage.includes('life') || lowerMessage.includes('advice') || lowerMessage.includes('wisdom') || lowerMessage.includes('character')) {
      responseCategory = 'life_advice';
      shouldAwardHype = true;
      hypeAmount = 10;
    }
    
    // Goals & Dreams
    else if (lowerMessage.includes('goal') || lowerMessage.includes('dream') || lowerMessage.includes('want to') || lowerMessage.includes('achieve')) {
      responseCategory = 'goals_achievement';
      shouldAwardHype = true;
      hypeAmount = 12;
    }
    
    // Gratitude & Positive
    else if (lowerMessage.includes('thanks') || lowerMessage.includes('awesome') || lowerMessage.includes('great') || lowerMessage.includes('amazing')) {
      responseCategory = 'hype_celebration';
      shouldAwardHype = true;
      hypeAmount = 8;
    }

    // Select response from category
    const responses = GAGE_RESPONSES[responseCategory as keyof typeof GAGE_RESPONSES];
    const selectedResponse = responses[Math.floor(Math.random() * responses.length)];

    // Award HYPE for positive interactions
    if (shouldAwardHype) {
      try {
        await fetch('/api/hype', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            activity: 'ai_chat_interaction'
          })
        });
      } catch (error) {
        console.error('Failed to award HYPE:', error);
      }
    }

    return {
      id: `gage_${Date.now()}`,
      type: 'gage',
      content: selectedResponse,
      timestamp: new Date(),
      hypeAwarded: shouldAwardHype ? hypeAmount : undefined
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setConversationStage('chatting');

    // Simulate Gage typing delay
    setTimeout(async () => {
      const gageResponse = await generateGageResponse(userMessage.content);
      setMessages(prev => [...prev, gageResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // 1-3 second delay
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <motion.button
        onClick={() => {
          console.log('Gage button clicked!');
          onToggle();
        }}
        className="fixed bottom-6 right-6 z-[9999] group cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        style={{ pointerEvents: 'auto' }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full blur-lg opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Button */}
        <div className="relative bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white p-2 rounded-full shadow-2xl border-2 border-white/20">
          {/* Professional Circular Face Cutout */}
          <div className="w-12 h-12 rounded-full overflow-hidden bg-black relative">
            <Image
              src="/gage-coleman-herocard.png"
              alt="Gage Coleman - UltraPreps Founder"
              fill
              className="object-cover object-top scale-150 translate-y-2"
              style={{
                clipPath: 'circle(50% at 50% 40%)',
              }}
              priority
            />
            {/* Gradient overlay for professional look */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 rounded-full" />
          </div>
          
          {/* Crown Badge (replaces pulse indicator) */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full flex items-center justify-center border-2 border-black shadow-lg animate-pulse">
            <Crown className="w-3 h-3 text-white" />
          </div>
          
          {/* Floating text hint */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/80 text-white px-3 py-1 rounded-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Chat with Gage! 💬
          </motion.div>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-gradient-to-br from-black via-[#1E3A8A]/10 to-black backdrop-blur-xl border-2 border-[#F59E0B]/30 rounded-3xl flex flex-col overflow-hidden shadow-2xl"
    >
      {/* Animated Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#F59E0B] p-5 flex items-center justify-between relative overflow-hidden"
      >
        {/* Background animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 animate-pulse" />
        
        <div className="flex items-center gap-3 relative z-10">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="relative"
          >
            {/* Glowing Ring Effect */}
            <div className="absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-r from-white/30 via-[#F59E0B]/30 to-white/30 p-0.5 animate-pulse">
              <div className="w-full h-full rounded-full bg-transparent" />
            </div>
            
            {/* Main Profile Image */}
            <div className="relative w-12 h-12 rounded-full bg-gradient-to-r from-white/20 to-white/10 border-2 border-white/30 overflow-hidden">
              <Image
                src="/gage-coleman-herocard.png"
                alt="Gage Coleman - UltraPreps Founder"
                fill
                className="object-cover object-top scale-150 translate-y-2"
                style={{
                  clipPath: 'circle(50% at 50% 40%)',
                }}
                priority
              />
              {/* Gradient Overlay for Professional Look */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 rounded-full" />
            </div>
            
            {/* Crown Badge */}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full flex items-center justify-center border border-white shadow-lg">
              <Crown className="w-2.5 h-2.5 text-white" />
            </div>
          </motion.div>
          <div>
            <h3 className="text-white font-black text-lg tracking-wide">Gage Coleman</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-white/90 text-sm font-bold">Your Ultimate Mentor</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 relative z-10">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-6 h-6 text-white/60"
          >
            <Crown className="w-full h-full" />
          </motion.div>
          <button
            onClick={onToggle}
            className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Messages Container */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-transparent via-black/5 to-black/10">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} group`}
            >
              {message.type === 'gage' && (
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="relative mr-2 mt-1"
                >
                  {/* Mini Professional Face Cutout */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] p-0.5 border border-white/20">
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-black">
                      <Image
                        src="/gage-coleman-herocard.png"
                        alt="Gage Coleman"
                        fill
                        className="object-cover object-top scale-150 translate-y-1"
                        style={{
                          clipPath: 'circle(50% at 50% 40%)',
                        }}
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 rounded-full" />
                    </div>
                  </div>
                  
                  {/* Tiny Crown Badge */}
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full flex items-center justify-center border border-white shadow-sm">
                    <Crown className="w-1.5 h-1.5 text-white" />
                  </div>
                </motion.div>
              )}
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`max-w-[75%] p-4 rounded-2xl relative ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white shadow-lg'
                    : 'bg-gradient-to-br from-white/15 to-white/5 text-white border border-white/20 backdrop-blur-sm'
                }`}
              >
                {/* Message Content */}
                <p className="text-sm leading-relaxed font-medium">{message.content}</p>
                
                {/* HYPE Award */}
                {message.hypeAwarded && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: "spring", bounce: 0.6 }}
                    className="flex items-center gap-2 mt-3 p-2 bg-[#F59E0B]/20 rounded-lg border border-[#F59E0B]/30"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, repeat: 2 }}
                    >
                      <Zap className="w-4 h-4 text-[#F59E0B]" />
                    </motion.div>
                    <span className="text-xs font-bold text-[#F59E0B]">
                      +{message.hypeAwarded} HYPE EARNED!
                    </span>
                    <Trophy className="w-3 h-3 text-[#F59E0B]" />
                  </motion.div>
                )}
                
                {/* Timestamp */}
                <p className="text-xs opacity-50 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                
                {/* Message tail */}
                <div className={`absolute top-3 ${
                  message.type === 'user' 
                    ? 'right-0 translate-x-2' 
                    : 'left-0 -translate-x-2'
                } w-0 h-0 border-4 ${
                  message.type === 'user'
                    ? 'border-l-[#F59E0B] border-y-transparent border-r-transparent'
                    : 'border-r-white/15 border-y-transparent border-l-transparent'
                }`} />
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white/10 text-white border border-white/20 p-3 rounded-xl">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-[#F59E0B] rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-[#F59E0B] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-[#F59E0B] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Message Gage..."
            className="flex-1 bg-white/10 text-white placeholder-white/60 border border-white/20 rounded-xl px-4 py-2 focus:outline-none focus:border-[#F59E0B] transition-colors"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
            className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white p-2 rounded-xl hover:scale-105 transition-transform duration-200 disabled:opacity-50 disabled:hover:scale-100"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        
        {/* Enhanced Quick Responses */}
        {conversationStage === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-2 mt-4"
          >
            {[
              { text: "Football strategy", icon: Target },
              { text: "Basketball tips", icon: Trophy },
              { text: "Recruiting secrets", icon: Star },
              { text: "Motivation boost", icon: Zap },
              { text: "How to earn HYPE?", icon: Crown },
              { text: "Academic advice", icon: BookOpen }
            ].map((quickResponse) => {
              const IconComponent = quickResponse.icon;
              return (
                <motion.button
                  key={quickResponse.text}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setInputValue(quickResponse.text);
                    setTimeout(handleSendMessage, 100);
                  }}
                  className="text-xs bg-gradient-to-r from-white/10 to-white/5 text-white/90 hover:from-[#F59E0B]/20 hover:to-[#F97316]/20 border border-white/20 hover:border-[#F59E0B]/50 px-3 py-2 rounded-full transition-all duration-300 flex items-center gap-1.5 font-medium"
                >
                  <IconComponent className="w-3 h-3" />
                  {quickResponse.text}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}