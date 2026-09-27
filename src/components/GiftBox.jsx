import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Lock, Unlock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GiftBox({ onOpenComplete }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    if (isOpening || isOpen) return;

    setIsOpening(true);

    // Confetti explosion
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.5 }
    });

    setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      onOpenComplete();
    }, 2000);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 max-w-3xl mx-auto text-center overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-8">
        {/* Teaser Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card text-xs text-amber-300 font-medium border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Mystery Box</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif-custom font-bold text-white tracking-tight">
            Wait... I almost forgot something.
          </h2>

          <p className="text-slate-300 text-sm sm:text-base font-sans-custom">
            There's one final surprise...
          </p>
        </motion.div>

        {/* Gift Box Container */}
        <div className="relative py-6">
          <motion.div
            animate={
              isOpening
                ? {
                    rotate: [0, -5, 5, -8, 8, -12, 12, 0],
                    scale: [1, 1.05, 1.1, 1.15, 1.2]
                  }
                : { y: [0, -10, 0] }
            }
            transition={
              isOpening
                ? { duration: 1.8 }
                : { repeat: Infinity, duration: 3, ease: 'easeInOut' }
            }
            className="w-44 h-44 sm:w-52 sm:h-52 mx-auto relative flex items-center justify-center cursor-pointer select-none"
            onClick={handleOpenGift}
          >
            {/* Beam of glowing light on open */}
            <AnimatePresence>
              {isOpening && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: 1, scale: 2.5 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-t from-amber-400 via-pink-500 to-purple-400 rounded-full blur-2xl z-0"
                />
              )}
            </AnimatePresence>

            {/* Gift Box Graphic */}
            <div className="relative z-10 w-full h-full glass-card-glow rounded-3xl flex flex-col items-center justify-center p-6 border-2 border-amber-400/40 shadow-[0_0_50px_rgba(251,191,36,0.3)]">
              {/* Ribbon Cross */}
              <div className="absolute inset-y-0 w-8 bg-gradient-to-b from-amber-400 to-amber-600 rounded-sm" />
              <div className="absolute inset-x-0 h-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-sm" />

              {/* Gift Bow */}
              <div className="absolute -top-5 w-16 h-10 bg-amber-400 rounded-full shadow-lg border border-amber-300 flex items-center justify-center z-20">
                <Gift className="w-6 h-6 text-slate-950" />
              </div>

              {/* Status Lock/Unlock Badge */}
              <div className="relative z-20 bg-slate-950/80 rounded-full p-3 border border-amber-400/50 shadow-md">
                {isOpen ? (
                  <Unlock className="w-8 h-8 text-emerald-400 animate-bounce" />
                ) : isOpening ? (
                  <Sparkles className="w-8 h-8 text-amber-300 animate-spin" />
                ) : (
                  <Lock className="w-8 h-8 text-amber-300" />
                )}
              </div>
            </div>
          </motion.div>

          {/* Action Button: Open the Gift 🎁 */}
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-8"
            >
              <button
                onClick={handleOpenGift}
                disabled={isOpening}
                className="glass-btn px-8 py-4 rounded-full text-lg font-semibold text-white flex items-center gap-3 mx-auto cursor-pointer border border-amber-400/40 hover:border-amber-300 transition-all duration-300 shadow-xl"
              >
                <span>{isOpening ? "Opening Gift..." : "Open the Gift 🎁"}</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
