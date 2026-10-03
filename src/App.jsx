import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getActiveBirthdayData, peopleData } from './config/birthdayData';

// Components
import IntroScreen from './components/IntroScreen';
import MusicController from './components/MusicController';
import ParticleBackground from './components/ParticleBackground';
import PersonSelector from './components/PersonSelector';
import RestrictedScreen from './components/RestrictedScreen';
import BirthdayHero from './components/BirthdayHero';
import PersonalMessage from './components/PersonalMessage';
import MemoryGallery from './components/MemoryGallery';
import FunFacts from './components/FunFacts';
import BirthdayCake from './components/BirthdayCake';
import GiftBox from './components/GiftBox';
import FinalSection from './components/FinalSection';

export default function App() {
  const [activeData, setActiveData] = useState(() => getActiveBirthdayData());
  const [isStarted, setIsStarted] = useState(false);
  const [giftUnlocked, setGiftUnlocked] = useState(false);

  const heroRef = useRef(null);
  const messageRef = useRef(null);
  const memoryRef = useRef(null);
  const factsRef = useRef(null);
  const cakeRef = useRef(null);
  const giftRef = useRef(null);
  const finalRef = useRef(null);

  // Sync with URL search params changes if any
  useEffect(() => {
    const handleLocationChange = () => {
      setActiveData(getActiveBirthdayData());
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const handleSelectPerson = (personId) => {
    const query = personId.trim().toLowerCase();
    const matchedEntry = Object.entries(peopleData).find(([key, p]) =>
      key.toLowerCase() === query ||
      p.id.toLowerCase() === query ||
      p.nickname.toLowerCase() === query ||
      p.friendName.toLowerCase().includes(query)
    );

    if (matchedEntry) {
      const matchedPerson = matchedEntry[1];
      setActiveData(matchedPerson);
      const url = new URL(window.location.href);
      url.searchParams.set('person', matchedPerson.id);
      window.history.pushState({}, '', url.toString());
      // Reset state for clean preview
      setIsStarted(false);
      setGiftUnlocked(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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

  // If no person key is passed or found in URL, show Restricted Access Screen to protect secrets
  if (!activeData) {
    return (
      <div className="min-h-screen bg-[#070714] text-white font-sans-custom relative">
        <ParticleBackground />
        <RestrictedScreen onUnlockPerson={handleSelectPerson} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070714] text-white selection:bg-pink-500 selection:text-white font-sans-custom relative">
      {/* Background Star & Particle Canvas */}
      <ParticleBackground />

      {/* Person Selector & Quick Share Link Menu */}
      <PersonSelector
        currentPersonId={activeData.id}
        onSelectPerson={handleSelectPerson}
      />

      {/* Floating Audio Controller */}
      <MusicController isStarted={isStarted} data={activeData} />

      {/* 1. Opening Mystery Screen */}
      <AnimatePresence>
        {!isStarted && <IntroScreen data={activeData} onEnter={handleStart} />}
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
            <BirthdayHero data={activeData} onScrollNext={() => scrollToRef(messageRef)} />
          </div>

          {/* Section 3: Personal Message */}
          <div ref={messageRef}>
            <PersonalMessage data={activeData} onScrollNext={() => scrollToRef(memoryRef)} />
          </div>

          {/* Section 4: Our Memories */}
          <div ref={memoryRef}>
            <MemoryGallery data={activeData} />
          </div>

          {/* Section 5: "Did You Know?" Interactive Section */}
          <div ref={factsRef}>
            <FunFacts data={activeData} />
          </div>

          {/* Section 6: Interactive Birthday Cake */}
          <div ref={cakeRef}>
            <BirthdayCake data={activeData} />
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
            <FinalSection data={activeData} onReplay={handleReplay} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
