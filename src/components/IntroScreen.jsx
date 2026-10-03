import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export default function IntroScreen({ data, onEnter }) {
  const [step, setStep] = useState(0);

  const personName = data?.nickname || data?.friendName;
  const greetingText = personName ? `Hey ${personName}... 👀` : `Hey... 👀`;

  useEffect(() => {
    // Sequenced step transitions
    const timer1 = setTimeout(() => setStep(1), 1200); // "Hey [Name]... 👀"
    const timer2 = setTimeout(() => setStep(2), 3200); // "I made something for you."
    const timer3 = setTimeout(() => setStep(3), 5200); // "But before you see it..."

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#070714] via-[#0F0E26] to-[#170E2B] text-white select-none overflow-hidden"
    >
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-8 z-10 relative">
        {/* Step 0 & 1: Hey [Name]... 👀 */}
        <AnimatePresence mode="wait">
          {step >= 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl font-serif-custom font-bold tracking-tight text-gradient-rose"
            >
              {greetingText}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: I made something for you. */}
        <AnimatePresence mode="wait">
          {step >= 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-3xl font-sans-custom font-light text-slate-200 tracking-wide"
            >
              I made something for you.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: But before you see it... */}
        <AnimatePresence mode="wait">
          {step >= 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8 }}
              className="space-y-8 pt-4"
            >
              <p className="text-lg sm:text-xl font-garamond italic text-purple-200/90">
                But before you see it...
              </p>

              <motion.button
                onClick={onEnter}
                whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(255,105,180,0.6)' }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="glass-btn relative group px-8 py-4 rounded-full text-lg font-semibold text-white tracking-wider flex items-center justify-center gap-3 mx-auto border border-pink-400/40 shadow-xl overflow-hidden cursor-pointer"
              >
                {/* Glowing light streak */}
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />

                <Sparkles className="w-5 h-5 text-yellow-300 animate-spin-slow" />
                <span>Enter Your Surprise ✨</span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: step >= 3 ? 0.6 : 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 text-xs font-sans-custom text-slate-400 flex items-center gap-1"
      >
        <span>Best experienced with sound</span>
        <Heart className="w-3 h-3 text-pink-400 inline" />
      </motion.div>
    </motion.div>
  );
}
