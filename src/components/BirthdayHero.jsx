import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { birthdayData } from '../config/birthdayData';
import { Sparkles, Calendar, ChevronDown } from 'lucide-react';

export default function BirthdayHero({ onScrollNext }) {

  // Trigger celebratory confetti burst on mount
  useEffect(() => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#FF6584', '#FFD700', '#FFFFFF']
    });
    fire(0.2, {
      spread: 60,
      colors: ['#A78BFA', '#F472B6']
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center p-6 pt-16 pb-12 overflow-hidden">
      {/* Background Animated Gradient Glow */}
      <div className="absolute inset-0 bg-radial from-purple-900/20 via-[#070714] to-[#070714] pointer-events-none" />

      {/* Floating Decorative Balloons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { color: 'from-pink-500 to-rose-400', left: '8%', delay: 0, speed: 12 },
          { color: 'from-purple-500 to-indigo-400', left: '88%', delay: 2, speed: 14 },
          { color: 'from-amber-400 to-yellow-300', left: '18%', delay: 4, speed: 15 },
          { color: 'from-rose-400 to-pink-600', left: '80%', delay: 1, speed: 13 }
        ].map((b, i) => (
          <motion.div
            key={i}
            initial={{ y: '115vh', opacity: 0.7 }}
            animate={{ y: '-20vh' }}
            transition={{
              duration: b.speed,
              repeat: Infinity,
              delay: b.delay,
              ease: 'linear'
            }}
            style={{ left: b.left }}
            className="absolute flex flex-col items-center"
          >
            <div className={`w-12 h-14 sm:w-16 sm:h-20 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-gradient-to-tr ${b.color} shadow-lg shadow-pink-500/20 relative`}>
              {/* Balloon reflection */}
              <div className="absolute top-2 left-3 w-3 h-4 bg-white/40 rounded-full blur-[1px]" />
            </div>
            {/* Balloon string */}
            <div className="w-[1px] h-16 bg-white/20" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-3xl w-full z-10 space-y-6">
        {/* Date Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs sm:text-sm font-medium text-pink-300 border border-pink-500/30 shadow-lg mx-auto"
        >
          <Calendar className="w-4 h-4 text-amber-300" />
          <span>Special Celebration • {birthdayData.birthdayDate}</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
        </motion.div>

        {/* HAPPY BIRTHDAY 🎂 */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-2xl sm:text-4xl md:text-5xl font-serif-custom tracking-widest text-amber-300 uppercase font-semibold drop-shadow-md"
        >
          HAPPY BIRTHDAY 🎂
        </motion.h2>

        {/* Bushra Azmi Khan */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif-custom font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-200 to-amber-200 drop-shadow-[0_10px_20px_rgba(255,105,180,0.3)] py-2"
        >
          {birthdayData.friendName}
        </motion.h1>

        {/* Staggered Subtitle Lines */}
        <div className="space-y-3 pt-4 max-w-xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="text-lg sm:text-2xl font-sans-custom font-light text-slate-300"
          >
            Today isn't just another day...
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="text-xl sm:text-3xl font-garamond italic text-gradient-rose font-medium"
          >
            "...it's the day the world got a little more special."
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="pt-12"
        >
          <button
            onClick={onScrollNext}
            className="group flex flex-col items-center gap-2 mx-auto text-slate-400 hover:text-pink-300 transition-colors cursor-pointer"
          >
            <span className="text-xs uppercase tracking-widest font-sans-custom">Scroll down to explore</span>
            <ChevronDown className="w-5 h-5 animate-bounce text-pink-400" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
