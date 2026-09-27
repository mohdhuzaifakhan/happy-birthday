import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function MusicController({ isStarted, data }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);
  const synthRef = useRef({ audioCtx: null, isRunning: false, timer: null });

  const bgMusicUrl = data?.bgMusicUrl || '';

  const startSynthMelody = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      
      if (!synthRef.current.audioCtx) {
        synthRef.current.audioCtx = new AudioCtx();
      }
      const ctx = synthRef.current.audioCtx;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      synthRef.current.isRunning = true;

      const notes = [
        { note: 261.63, dur: 0.4 }, { note: 261.63, dur: 0.3 }, { note: 293.66, dur: 0.7 }, { note: 261.63, dur: 0.7 }, { note: 349.23, dur: 0.7 }, { note: 329.63, dur: 1.2 },
        { note: 261.63, dur: 0.4 }, { note: 261.63, dur: 0.3 }, { note: 293.66, dur: 0.7 }, { note: 261.63, dur: 0.7 }, { note: 392.00, dur: 0.7 }, { note: 349.23, dur: 1.2 },
        { note: 261.63, dur: 0.4 }, { note: 261.63, dur: 0.3 }, { note: 523.25, dur: 0.7 }, { note: 440.00, dur: 0.7 }, { note: 349.23, dur: 0.7 }, { note: 329.63, dur: 0.7 }, { note: 293.66, dur: 1.2 },
        { note: 466.16, dur: 0.4 }, { note: 466.16, dur: 0.3 }, { note: 440.00, dur: 0.7 }, { note: 349.23, dur: 0.7 }, { note: 392.00, dur: 0.7 }, { note: 349.23, dur: 1.5 }
      ];

      let noteIndex = 0;

      const playNextNote = () => {
        if (!synthRef.current.isRunning || !synthRef.current.audioCtx) return;
        const currentCtx = synthRef.current.audioCtx;
        
        const item = notes[noteIndex];
        const osc = currentCtx.createOscillator();
        const gain = currentCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(item.note, currentCtx.currentTime);

        gain.gain.setValueAtTime(0.001, currentCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.12, currentCtx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, currentCtx.currentTime + item.dur * 0.95);

        osc.connect(gain);
        gain.connect(currentCtx.destination);

        osc.start();
        osc.stop(currentCtx.currentTime + item.dur);

        noteIndex = (noteIndex + 1) % notes.length;
        synthRef.current.timer = setTimeout(playNextNote, item.dur * 1000);
      };

      playNextNote();
    } catch (e) {
      console.warn("Web Audio synth error:", e);
    }
  };

  const stopSynthMelody = () => {
    synthRef.current.isRunning = false;
    if (synthRef.current.timer) {
      clearTimeout(synthRef.current.timer);
    }
  };

  useEffect(() => {
    if (isStarted && !isPlaying) {
      togglePlay(true);
    }
  }, [isStarted]);

  const togglePlay = (forceState) => {
    const nextState = forceState !== undefined ? forceState : !isPlaying;
    setIsPlaying(nextState);

    if (bgMusicUrl && audioRef.current) {
      if (nextState) {
        audioRef.current.play().catch(() => startSynthMelody());
      } else {
        audioRef.current.pause();
      }
    } else {
      if (nextState) {
        startSynthMelody();
      } else {
        stopSynthMelody();
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    if (synthRef.current.audioCtx) {
      if (!isMuted) {
        stopSynthMelody();
      } else if (isPlaying) {
        startSynthMelody();
      }
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      {bgMusicUrl && (
        <audio
          ref={audioRef}
          src={bgMusicUrl}
          loop
          preload="auto"
        />
      )}

      <button
        onClick={() => togglePlay()}
        className={`glass-card hover:bg-white/10 text-white rounded-full p-3 flex items-center gap-2 transition-all duration-300 ${
          isPlaying ? 'border-pink-500/50 shadow-lg shadow-pink-500/20' : 'opacity-80'
        }`}
        title={isPlaying ? "Pause Music" : "Play Music"}
      >
        <Music className={`w-4 h-4 ${isPlaying ? 'text-pink-400 animate-pulse' : 'text-gray-400'}`} />
        
        {isPlaying && !isMuted && (
          <div className="flex items-end gap-[2px] h-4 w-4">
            <span className="w-1 bg-gradient-to-t from-pink-500 to-purple-400 rounded-full animate-[bounce_0.8s_infinite_100ms] h-full" />
            <span className="w-1 bg-gradient-to-t from-pink-500 to-purple-400 rounded-full animate-[bounce_0.8s_infinite_300ms] h-3/4" />
            <span className="w-1 bg-gradient-to-t from-pink-500 to-purple-400 rounded-full animate-[bounce_0.8s_infinite_200ms] h-2/4" />
          </div>
        )}

        <span className="text-xs font-medium pr-1 hidden sm:inline">
          {isPlaying ? "Music ON" : "Music"}
        </span>
      </button>

      {isPlaying && (
        <button
          onClick={toggleMute}
          className="glass-card hover:bg-white/10 text-white rounded-full p-3 transition-all duration-300 opacity-80 hover:opacity-100"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-rose-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-emerald-400" />
          )}
        </button>
      )}
    </div>
  );
}
