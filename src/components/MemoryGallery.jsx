import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Calendar, X, Sparkles, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

export default function MemoryGallery() {
  const [selectedMemory, setSelectedMemory] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-8 max-w-6xl mx-auto overflow-hidden">
      {/* Background Radial Light */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-rose-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card text-xs text-amber-300 font-medium border border-amber-400/20"
        >
          <Camera className="w-3.5 h-3.5" />
          <span>Treasured Moments</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl sm:text-4xl font-serif-custom font-bold text-white tracking-tight"
        >
          A Few Moments I’ll Always Remember ❤️
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base font-sans-custom"
        >
          Tap any memory card to relive the story
        </motion.p>
      </div>

      {/* Mobile Swipe / Desktop Carousel Navigation controls */}
      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-card items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10 cursor-pointer"
          aria-label="Previous Memory"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass-card items-center justify-center text-white hover:bg-white/20 transition-all border border-white/10 cursor-pointer"
          aria-label="Next Memory"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Swipeable Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar py-4 px-2 scroll-smooth"
        >
          {birthdayData.memories.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelectedMemory(item)}
              className="flex-none w-[280px] sm:w-[320px] snap-center glass-card rounded-2xl p-4 cursor-pointer relative overflow-hidden group border border-white/10 hover:border-pink-500/40 transition-all duration-300 shadow-xl"
            >
              {/* Image Box */}
              <div className="relative h-48 sm:h-56 w-full rounded-xl overflow-hidden mb-4 bg-slate-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Date Tag */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full glass-card text-xs font-semibold text-white flex items-center gap-1 border border-white/20">
                  <Calendar className="w-3 h-3 text-pink-300" />
                  <span>{item.date}</span>
                </div>

                {/* Expand Icon */}
                <div className="absolute bottom-3 right-3 p-2 rounded-full glass-card text-white/80 group-hover:text-white group-hover:scale-110 transition-all">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Card Text Content */}
              <div className="space-y-1 text-left px-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-pink-400">
                  {item.tag}
                </span>
                <h3 className="text-lg font-serif-custom font-semibold text-white leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 font-sans-custom line-clamp-2 pt-1">
                  "{item.caption}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Memory Modal Overlay */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-lg w-full rounded-3xl p-6 relative border border-white/20 shadow-2xl overflow-hidden text-left space-y-4"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 p-2 rounded-full glass-card text-slate-300 hover:text-white transition-colors cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Full Photo */}
              <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src={selectedMemory.image}
                  alt={selectedMemory.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 px-3 py-1 rounded-full glass-card text-xs font-semibold text-pink-300 border border-pink-400/30">
                  {selectedMemory.date} • {selectedMemory.tag}
                </div>
              </div>

              {/* Text Info */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-serif-custom font-bold text-white">
                  {selectedMemory.title}
                </h3>
                <p className="text-base font-garamond italic text-pink-300">
                  "{selectedMemory.caption}"
                </p>
                <p className="text-sm font-sans-custom text-slate-300 leading-relaxed pt-2 border-t border-white/10">
                  {selectedMemory.fullDescription}
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="px-5 py-2 rounded-full glass-btn text-xs font-semibold text-white cursor-pointer"
                >
                  Close Memory ✨
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
