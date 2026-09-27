import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, RotateCcw, Sparkles } from 'lucide-react';

export default function FunFacts({ data }) {
  const [flippedCards, setFlippedCards] = useState({});

  const funFacts = data?.funFacts || [];

  const toggleFlip = (id) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-3 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card text-xs text-purple-300 font-medium border border-purple-400/20"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Interactive Secrets</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl font-serif-custom font-bold text-white tracking-tight"
        >
          Things You Probably Don't Know...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base font-sans-custom"
        >
          Tap any card to flip & reveal the secret!
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {funFacts.map((fact, index) => {
          const isFlipped = flippedCards[fact.id];

          return (
            <motion.div
              key={fact.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              onClick={() => toggleFlip(fact.id)}
              className="h-44 sm:h-48 perspective-1000 cursor-pointer group"
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="w-full h-full relative transform-style-3d glass-card rounded-2xl border border-white/10 shadow-xl group-hover:border-pink-500/40"
              >
                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col items-center justify-center space-y-3 backface-hidden transition-opacity ${
                    isFlipped ? 'opacity-0 pointer-events-none' : 'opacity-100'
                  }`}
                >
                  <div className="w-10 h-10 rounded-full glass-btn flex items-center justify-center text-pink-300">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                  <h3 className="text-xl font-serif-custom font-bold text-white">
                    {fact.front}
                  </h3>
                  <span className="text-xs font-sans-custom text-slate-400 flex items-center gap-1 group-hover:text-pink-300 transition-colors">
                    Tap to flip <RotateCcw className="w-3 h-3" />
                  </span>
                </div>

                <div
                  className={`absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col items-center justify-center text-center bg-gradient-to-br from-purple-900/60 to-pink-900/60 backdrop-blur-xl border border-pink-400/40 shadow-2xl transform rotate-y-180 backface-hidden transition-opacity ${
                    isFlipped ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="text-base sm:text-lg font-sans-custom font-medium text-white leading-relaxed">
                    "{fact.back}"
                  </p>
                  <span className="text-[11px] font-sans-custom text-pink-200 mt-3 opacity-80">
                    ✨ Tap again to flip back
                  </span>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
