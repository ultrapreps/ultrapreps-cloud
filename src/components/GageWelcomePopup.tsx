'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Zap, Star, Rocket, X, Flame, Users, TrendingUp, MessageCircle } from 'lucide-react';
import Image from 'next/image';

interface GageWelcomePopupProps {
  onClose: () => void;
}

export default function GageWelcomePopup({ onClose }: GageWelcomePopupProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPopup, setShowPopup] = useState(true);

  const welcomeSteps = [
    {
      title: "Welcome to YOUR STADIUM! 🏟️",
      content: "I'm Gage Coleman, founder of UltraPreps! This entire platform exists to make YOU legendary. Every feature, every AI system, every tool - it's all designed around YOUR success!",
      icon: Crown,
      color: "from-[#F59E0B] to-[#F97316]",
      stats: "4.2M+ Students Powered"
    },
    {
              title: "I'm Your Personal Mentor!",
      content: "24/7 access to recruiting secrets, performance tips, motivation, and platform guidance. I know EVERYTHING about building your digital legacy. Think of me as your success co-pilot!",
      icon: Zap,
      color: "from-[#1E3A8A] to-[#3B82F6]",
      stats: "98% Success Rate"
    },
    {
              title: "The HYPE Economy Awaits!",
      content: "Earn HYPE for every achievement, level up your profile, unlock premium features, and watch recruiters take notice. This isn't just social media - this is your career launchpad!",
      icon: TrendingUp,
      color: "from-[#059669] to-[#10B981]",
      stats: "50M+ HYPE Distributed"
    },
    {
      title: "Let's Build Greatness Together! 🚀",
      content: "Click my chat button anytime for motivation, strategy, or just to talk! I'm here to help you dominate your sport and build a legacy that lasts forever. Ready to become LEGENDARY?",
      icon: Rocket,
      color: "from-[#DC2626] to-[#EF4444]",
      stats: "Your Journey Starts NOW!"
    }
  ];

  const handleNext = () => {
    if (currentStep < welcomeSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleClose = () => {
    setShowPopup(false);
    setTimeout(onClose, 300);
  };

  if (!showPopup) return null;

  const currentStepData = welcomeSteps[currentStep];
  const IconComponent = currentStepData.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          className="bg-gradient-to-br from-black via-[#1E3A8A]/30 to-black border-2 border-[#F59E0B] rounded-3xl p-6 md:p-8 max-w-2xl w-full relative overflow-visible shadow-2xl"
          style={{
            minHeight: '600px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
        >
          {/* Stadium Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#F59E0B]/10 via-black/50 to-black rounded-3xl" />
          <div className="absolute inset-0 bg-[url('/stadium-crowd-energy.jpg')] bg-cover bg-center opacity-5 rounded-3xl" />
          
          {/* Animated Gold Accents */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#F59E0B] to-transparent" />
          
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Gage Face Cutout - Professional Circular Profile */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              {/* Glowing Ring Effect */}
              <div className="absolute inset-0 w-24 h-24 rounded-full bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#F59E0B] p-1 animate-pulse">
                <div className="w-full h-full rounded-full bg-black" />
              </div>
              
              {/* Main Profile Image */}
              <div className="relative w-24 h-24 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] p-1 shadow-2xl">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-black">
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
              </div>
              
              {/* Crown Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-[#F59E0B] to-[#F97316] rounded-full flex items-center justify-center border-2 border-black shadow-lg"
              >
                <Crown className="w-4 h-4 text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="text-center relative z-10"
          >
            {/* Icon with Stats */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center mb-6"
            >
              <div className={`w-16 h-16 mb-3 rounded-2xl bg-gradient-to-r ${currentStepData.color} flex items-center justify-center shadow-xl border border-white/20`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="px-4 py-1 bg-gradient-to-r from-[#F59E0B]/20 to-[#F97316]/20 border border-[#F59E0B]/40 rounded-full"
              >
                <span className="text-[#F59E0B] text-sm font-bold tracking-wide">
                  {currentStepData.stats}
                </span>
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight text-center bg-gradient-to-r from-white via-[#F59E0B] to-white bg-clip-text text-transparent"
              style={{
                textShadow: '0 0 20px rgba(245, 158, 11, 0.3)'
              }}
            >
              {currentStepData.title}
            </motion.h2>

            {/* Content */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/90 text-base md:text-lg leading-relaxed mb-8 text-center max-w-lg mx-auto px-4"
              style={{
                minHeight: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {currentStepData.content}
            </motion.p>
          </motion.div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {welcomeSteps.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStep ? 'bg-[#F59E0B] scale-125' : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {currentStep > 0 && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 font-bold"
              >
                Back
              </motion.button>
            )}
            
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              onClick={handleNext}
              className={`${currentStep === 0 ? 'w-full' : 'flex-1'} px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black rounded-xl hover:scale-105 transition-all duration-300 font-black flex items-center justify-center gap-2 shadow-2xl border border-[#F59E0B]/50 text-lg uppercase tracking-wider`}
              style={{
                boxShadow: '0 0 30px rgba(245, 158, 11, 0.4)'
              }}
            >
              {currentStep === welcomeSteps.length - 1 ? (
                <>
                  <MessageCircle className="w-6 h-6" />
                  START CHATTING WITH GAGE!
                </>
              ) : (
                <>
                  CONTINUE
                  <Star className="w-5 h-5" />
                </>
              )}
            </motion.button>
          </div>

          {/* Enhanced Stadium Effects */}
          <div className="absolute top-6 left-6 w-3 h-3 bg-[#F59E0B] rounded-full animate-pulse shadow-lg" />
          <div className="absolute top-16 right-12 w-2 h-2 bg-[#F97316] rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-12 left-12 w-2.5 h-2.5 bg-[#F59E0B] rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 right-6 w-2 h-2 bg-[#F97316] rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1.5s' }} />
          
          {/* Additional Glow Effects */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#F59E0B]/5 rounded-full blur-3xl"
          />
          
          {/* Flame Icons for Stadium Feel */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute top-8 right-8"
          >
            <Flame className="w-4 h-4 text-[#F59E0B]/60" />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-10 left-10"
          >
            <Users className="w-4 h-4 text-[#F59E0B]/40" />
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}