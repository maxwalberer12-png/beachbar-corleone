'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SchemeIntroAnimationProps {
  onComplete?: () => void;
}

export default function SchemeIntroAnimation({ onComplete }: SchemeIntroAnimationProps) {
  const [stage, setStage] = useState<'center' | 'flying' | 'done'>('center');

  useEffect(() => {
    // 1. Hold in center for 700ms
    const timer1 = setTimeout(() => {
      setStage('flying');
    }, 700);

    // 2. Settle in navbar at top after 1900ms
    const timer2 = setTimeout(() => {
      setStage('done');
      if (onComplete) onComplete();
    }, 1900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  if (stage === 'done') return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden select-none">
      {/* 1. Fullscreen Dark Background Curtain that dissolves as the logo flies up */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: stage === 'flying' ? 0 : 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
        className="absolute inset-0 bg-[#070509]"
      >
        {/* Soft Ambient Sunset/Purple Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(231,111,81,0.25)_0%,rgba(43,16,9,0.3)_45%,rgba(7,5,9,0.95)_75%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:24px_24px] opacity-40" />
      </motion.div>

      {/* 2. The Travelling Logo: Moves from exact screen center to the top navbar */}
      <motion.div
        initial={{
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
          scale: 1,
        }}
        animate={
          stage === 'flying'
            ? {
                top: '24px',
                left: '50%',
                x: '-50%',
                y: '0%',
                scale: 0.28,
              }
            : {
                top: '50%',
                left: '50%',
                x: '-50%',
                y: '-50%',
                scale: 1,
              }
        }
        transition={{
          duration: 1.1,
          ease: [0.76, 0, 0.24, 1], // luxury cubic-bezier easing
        }}
        className="absolute z-[110] text-center origin-top will-change-transform"
      >
        <span className="font-serif text-7xl sm:text-9xl md:text-[13vw] font-black tracking-tighter text-white uppercase leading-none block drop-shadow-2xl">
          CORLEONE
        </span>
        <span
          className={`text-xs sm:text-sm uppercase tracking-[0.4em] text-stone-400 font-mono font-bold block mt-3 transition-opacity duration-300 ${
            stage === 'flying' ? 'opacity-0' : 'opacity-100'
          }`}
        >
          BEACH BAR • CUKLIĆEVO
        </span>
      </motion.div>
    </div>
  );
}
