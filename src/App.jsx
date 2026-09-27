import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import IntroScreen from './components/IntroScreen';
import MusicController from './components/MusicController';
import ParticleBackground from './components/ParticleBackground';
import BirthdayHero from './components/BirthdayHero';
import PersonalMessage from './components/PersonalMessage';
import MemoryGallery from './components/MemoryGallery';
import FunFacts from './components/FunFacts';
import BirthdayCake from './components/BirthdayCake';
import GiftBox from './components/GiftBox';
import FinalSection from './components/FinalSection';

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [giftUnlocked, setGiftUnlocked] = useState(false);

  const heroRef = useRef(null);
  const messageRef = useRef(null);
  const memoryRef = useRef(null);
  const factsRef = useRef(null);
  const cakeRef = useRef(null);
  const giftRef = useRef(null);
  const finalRef = useRef(null);

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleReplay = () => {
    setIsStarted(false);
    setGiftUnlocked(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToRef = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070714] text-white selection:bg-pink-500 selection:text-white font-sans-custom relative">
      {/* Background Star & Particle Canvas */}
      <ParticleBackground />

      {/* Floating Audio Controller */}
      <MusicController isStarted={isStarted} />

      {/* 1. Opening Mystery Screen */}
      <AnimatePresence>
        {!isStarted && <IntroScreen onEnter={handleStart} />}
      </AnimatePresence>

      {/* Main Experience Journey */}
      {isStarted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 space-y-12 sm:space-y-24"
        >
          {/* Section 2: Main Birthday Reveal */}
          <div ref={heroRef}>
            <BirthdayHero onScrollNext={() => scrollToRef(messageRef)} />
          </div>

          {/* Section 3: Personal Message */}
          <div ref={messageRef}>
            <PersonalMessage onScrollNext={() => scrollToRef(memoryRef)} />
          </div>

          {/* Section 4: Our Memories */}
          <div ref={memoryRef}>
            <MemoryGallery />
          </div>

          {/* Section 5: "Did You Know?" Interactive Section */}
          <div ref={factsRef}>
            <FunFacts />
          </div>

          {/* Section 6: Interactive Birthday Cake */}
          <div ref={cakeRef}>
            <BirthdayCake />
          </div>

          {/* Section 7: Hidden Surprise Gift */}
          <div ref={giftRef}>
            <GiftBox onOpenComplete={() => {
              setGiftUnlocked(true);
              setTimeout(() => scrollToRef(finalRef), 500);
            }} />
          </div>

          {/* Section 8 & 9: Final Emotional Message & Ending */}
          <div ref={finalRef}>
            <FinalSection onReplay={handleReplay} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
