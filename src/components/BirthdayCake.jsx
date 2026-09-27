import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import FireworksCanvas from './FireworksCanvas';
import { Flame, Sparkles } from 'lucide-react';

export default function BirthdayCake({ data }) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showFireworks, setShowFireworks] = useState(false);
  const [wishBlown, setWishBlown] = useState(false);

  const nickname = data?.nickname || "Bestie";
  const birthdayDate = data?.birthdayDate || "17 Nov";

  const blowOutCandles = () => {
    if (!candlesLit) return;
    
    setCandlesLit(false);
    setWishBlown(true);
    setShowFireworks(true);

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setShowFireworks(false);
    }, 6000);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 max-w-3xl mx-auto text-center overflow-hidden">
      <FireworksCanvas active={showFireworks} duration={6000} />

      <AnimatePresence>
        {!candlesLit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black z-30 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-20 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-2"
        >
          <h2 className="text-3xl sm:text-5xl font-serif-custom font-bold text-white tracking-tight">
            {candlesLit ? "Make a wish..." : "Wish granted. ✨"}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-sans-custom">
            {candlesLit ? "Tap the candles to blow them out!" : "Your wish has been sent to the universe!"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          onClick={blowOutCandles}
          className="relative max-w-xs mx-auto py-8 glass-card rounded-3xl p-6 border border-pink-500/20 shadow-2xl cursor-pointer group hover:border-pink-500/50 transition-all select-none"
        >
          <div className={`absolute inset-0 rounded-3xl transition-opacity duration-700 ${candlesLit ? 'bg-amber-500/10 blur-xl animate-pulse' : 'bg-pink-500/10 blur-xl'}`} />

          <div className="flex justify-center items-end gap-3 mb-2 relative z-10">
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className="flex flex-col items-center">
                <AnimatePresence mode="wait">
                  {candlesLit ? (
                    <motion.div
                      key="flame"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: [1, 1.2, 0.9, 1.1, 1] }}
                      exit={{ opacity: 0, y: -10, scale: 0 }}
                      transition={{
                        repeat: Infinity,
                        duration: 1 + index * 0.2,
                        ease: 'easeInOut'
                      }}
                      className="text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)] cursor-pointer"
                    >
                      <Flame className="w-6 h-6 fill-amber-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="smoke"
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: [0.8, 0], y: -20 }}
                      transition={{ duration: 1 }}
                      className="w-1.5 h-6 bg-slate-400/50 rounded-full blur-[1px]"
                    />
                  )}
                </AnimatePresence>

                <div className="w-2.5 h-10 rounded-full bg-gradient-to-t from-pink-400 via-rose-300 to-amber-200 border border-white/20 shadow-sm" />
              </div>
            ))}
          </div>

          <div className="space-y-1 relative z-10">
            <div className="w-48 sm:w-56 h-10 mx-auto rounded-t-2xl bg-gradient-to-r from-pink-400 via-rose-300 to-pink-400 shadow-inner flex items-center justify-around border-t border-white/40">
              <span className="w-3 h-3 rounded-full bg-rose-500 inline-block shadow" />
              <span className="w-3 h-3 rounded-full bg-amber-300 inline-block shadow" />
              <span className="w-3 h-3 rounded-full bg-purple-400 inline-block shadow" />
              <span className="w-3 h-3 rounded-full bg-pink-500 inline-block shadow" />
            </div>

            <div className="w-56 sm:w-64 h-12 mx-auto bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 border-y border-pink-500/30 flex items-center justify-center">
              <span className="text-xs font-serif-custom tracking-widest text-pink-200 uppercase font-semibold">
                {nickname} • {birthdayDate}
              </span>
            </div>

            <div className="w-64 sm:w-72 h-14 mx-auto rounded-b-2xl bg-gradient-to-r from-rose-600 via-pink-500 to-rose-600 border-t border-white/30 shadow-2xl flex items-center justify-around px-4">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <Sparkles className="w-4 h-4 text-white" />
              <Sparkles className="w-4 h-4 text-amber-300" />
            </div>
          </div>

          {candlesLit && (
            <p className="text-xs font-sans-custom text-amber-300 mt-6 animate-pulse">
              ✨ Tap to blow out the candles!
            </p>
          )}
        </motion.div>

        {wishBlown && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-3 max-w-md mx-auto glass-card p-6 rounded-2xl border border-pink-400/30"
          >
            <p className="text-lg font-serif-custom text-slate-200">
              "Okay... maybe I can't actually control that."
            </p>
            <p className="text-xl font-garamond italic text-gradient-gold font-medium">
              "But I can definitely wish you the very best!"
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
