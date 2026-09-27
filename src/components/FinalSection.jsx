import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import FireworksCanvas from './FireworksCanvas';
import { Heart, RotateCcw } from 'lucide-react';

export default function FinalSection({ data, onReplay }) {
  const [showGrandEnding, setShowGrandEnding] = useState(false);

  const { title, salutation, body, closing } = data?.finalMessage || { title: '', salutation: '', body: [], closing: '' };
  const { subtitle1, subtitle2, fromText } = data?.ending || { subtitle1: '', subtitle2: '', fromText: '' };

  useEffect(() => {
    setShowGrandEnding(true);

    const end = Date.now() + 5000;
    const colors = ['#FF6584', '#FFD700', '#A78BFA', '#F472B6'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, [data]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center p-6 py-24 text-center overflow-hidden bg-gradient-to-b from-[#070714] via-[#0E0C26] to-[#070714]">
      <FireworksCanvas active={showGrandEnding} duration={10000} />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl w-full z-10 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card text-xs text-rose-300 font-medium border border-rose-400/30">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>Final Words</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif-custom font-bold text-white tracking-tight">
            {title}
          </h2>

          <p className="text-xl sm:text-2xl font-garamond italic text-gradient-rose">
            "{salutation}"
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="glass-card p-8 sm:p-12 rounded-3xl space-y-6 text-left border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="space-y-4">
            {body.map((line, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 + idx * 0.15 }}
                className={`text-base sm:text-lg leading-relaxed font-sans-custom ${
                  line.startsWith('Keep') || line.startsWith('never')
                    ? 'text-pink-300 font-medium font-serif-custom text-lg sm:text-xl pl-2 border-l-2 border-pink-400/60'
                    : 'text-slate-200'
                }`}
              >
                {line}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.6 }}
            className="pt-6 border-t border-white/10 text-center"
          >
            <h3 className="text-xl sm:text-3xl font-serif-custom font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-300 to-pink-300">
              {closing}
            </h3>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="space-y-6 pt-4"
        >
          <div className="glass-card p-6 rounded-2xl max-w-md mx-auto space-y-2 border border-pink-400/20 shadow-lg">
            <p className="text-base sm:text-lg font-serif-custom text-white">
              {subtitle1}
            </p>
            <p className="text-sm font-sans-custom text-slate-300">
              {subtitle2}
            </p>
            <div className="pt-3 text-lg font-cursive text-pink-300 font-bold">
              {fromText}
            </div>
          </div>

          <motion.button
            onClick={onReplay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass-btn px-8 py-3.5 rounded-full text-sm font-semibold text-white inline-flex items-center gap-2 cursor-pointer border border-white/20 hover:border-pink-400 transition-all shadow-xl"
          >
            <RotateCcw className="w-4 h-4 text-pink-300" />
            <span>Experience It Again ↻</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
