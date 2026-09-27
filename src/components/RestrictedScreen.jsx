import { motion } from 'framer-motion';
import { Lock, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { peopleData } from '../config/birthdayData';

export default function RestrictedScreen({ onUnlockPerson }) {
  const [inputKey, setInputKey] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleUnlock = (e) => {
    e?.preventDefault();
    if (!inputKey.trim()) return;

    const query = inputKey.toLowerCase().trim();

    // Check against direct key or friendName
    const foundKey = Object.keys(peopleData).find(k =>
      k === query ||
      peopleData[k].id === query ||
      peopleData[k].friendName.toLowerCase().includes(query) ||
      peopleData[k].nickname.toLowerCase() === query
    );

    if (foundKey) {
      setErrorMsg('');
      onUnlockPerson(foundKey);
    } else {
      setErrorMsg("This name or key isn't registered in our circle of special people ✨");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#070714] via-[#0E0B24] to-[#160A29] text-white select-none overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-900/15 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full glass-card p-8 sm:p-10 rounded-3xl text-center space-y-6 border border-white/10 shadow-2xl relative overflow-hidden"
      >
        {/* Glow Accent */}
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Lock Icon */}
        <div className="w-16 h-16 rounded-full glass-btn mx-auto flex items-center justify-center text-amber-300 border border-amber-400/40 shadow-xl">
          <Lock className="w-8 h-8 animate-pulse text-amber-300" />
        </div>

        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-card text-[11px] font-semibold text-pink-300 border border-pink-500/30">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>Private Surprise Experience</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif-custom font-bold text-white tracking-tight">
            This Space is Secret 🔒
          </h2>
        </div>

        {/* Message */}
        <p className="text-sm font-sans-custom text-slate-300 leading-relaxed">
          This digital experience was built exclusively for a few extraordinary people. Its secrets are kept protected for them only.
        </p>

        {/* Secret Key Input Form */}
        {/* <form onSubmit={handleUnlock} className="space-y-4 pt-2">
          <div className="relative">
            <input
              type="text"
              value={inputKey}
              onChange={(e) => {
                setInputKey(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder="Enter your name or secret key..."
              className="w-full px-4 py-3.5 pl-11 rounded-2xl bg-white/5 border border-white/15 focus:border-pink-400 focus:outline-none text-sm text-white placeholder-slate-400 transition-all font-sans-custom"
            />
            <KeyRound className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-rose-400 flex items-center justify-center gap-1.5 font-sans-custom"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{errorMsg}</span>
            </motion.div>
          )}

          <button
            type="submit"
            className="w-full glass-btn py-3.5 rounded-2xl text-sm font-semibold text-white flex items-center justify-center gap-2 cursor-pointer border border-pink-400/40 hover:border-pink-300 transition-all shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Unlock My Surprise ✨</span>
          </button>
        </form> */}

        <div className="pt-2 text-[11px] text-slate-400 font-sans-custom italic">
          "Only special souls hold the key."
        </div>
      </motion.div>
    </div>
  );
}
