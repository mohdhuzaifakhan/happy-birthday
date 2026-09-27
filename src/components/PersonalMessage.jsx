import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

export default function PersonalMessage({ onScrollNext }) {
  const { title, paragraphs } = birthdayData.personalMessage;

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center p-6 py-20 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl h-96 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl w-full z-10 space-y-10 text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-xs text-pink-400 font-medium">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>From the Heart</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif-custom font-bold text-white tracking-tight leading-snug">
            "{title}"
          </h2>
        </motion.div>

        {/* Emotional Message Glass Container */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card p-8 sm:p-12 rounded-3xl space-y-6 text-left relative overflow-hidden border border-white/10 shadow-2xl"
        >
          {/* Decorative Corner Shimmer */}
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-xl pointer-events-none" />

          {paragraphs.map((paragraph, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 + index * 0.2 }}
              className={`text-base sm:text-lg leading-relaxed font-sans-custom ${
                index === paragraphs.length - 1
                  ? 'text-pink-200 font-medium text-lg sm:text-xl border-l-2 border-pink-400/60 pl-4 py-1 italic font-garamond'
                  : 'text-slate-300'
              }`}
            >
              {paragraph}
            </motion.p>
          ))}

          <div className="pt-4 flex items-center justify-end text-xs text-amber-300 font-cursive text-xl">
            <Sparkles className="w-4 h-4 mr-2 text-amber-300" />
            <span>Forever grateful</span>
          </div>
        </motion.div>

        {/* Button: There's More → */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button
            onClick={onScrollNext}
            className="glass-btn px-8 py-3.5 rounded-full text-base font-medium text-white flex items-center gap-3 mx-auto cursor-pointer group border border-pink-500/30 hover:border-pink-400 transition-all duration-300 shadow-lg"
          >
            <span>There’s More</span>
            <ArrowRight className="w-4 h-4 text-pink-300 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
