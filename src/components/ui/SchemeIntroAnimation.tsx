'use client';

import React, { useState, useEffect } from 'react';

export default function SchemeIntroAnimation() {
  const [introState, setIntroState] = useState<'initial' | 'animating' | 'finished'>('initial');

  useEffect(() => {
    // Step 1: Start morph animation after 0.8s
    const animTimer = setTimeout(() => {
      setIntroState('animating');
    }, 800);

    // Step 2: Finish and remove overlay after 2.2s
    const finishTimer = setTimeout(() => {
      setIntroState('finished');
    }, 2200);

    // Allow user to click or scroll to skip intro
    const handleSkip = () => {
      setIntroState('finished');
    };

    window.addEventListener('wheel', handleSkip, { passive: true, once: true });
    window.addEventListener('touchstart', handleSkip, { passive: true, once: true });

    return () => {
      clearTimeout(animTimer);
      clearTimeout(finishTimer);
      window.removeEventListener('wheel', handleSkip);
      window.removeEventListener('touchstart', handleSkip);
    };
  }, []);

  if (introState === 'finished') return null;

  return (
    <div
      onClick={() => setIntroState('finished')}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#070509] overflow-hidden select-none cursor-pointer transition-opacity duration-1000 ease-out ${
        introState === 'animating' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* 1. Atmospheric Ambient Grain & Mesh Gradient (Scheme Engine style) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Sunset Magenta & Amber Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[900px] h-[500px] rounded-full bg-gradient-to-tr from-amber-600/30 via-rose-600/30 to-purple-900/35 blur-[140px] opacity-75"
        />
        {/* Film Grain Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* 2. Scheme Engine Centered Logo Morphing to Navbar */}
      <div
        className="relative z-10 text-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{
          transform:
            introState === 'animating'
              ? 'translateY(-44vh) scale(0.24)'
              : 'translateY(0) scale(1)',
        }}
      >
        <h1 className="text-7xl sm:text-9xl md:text-[14vw] font-serif font-black tracking-tighter text-white uppercase leading-[0.85] drop-shadow-2xl">
          CORLEONE
        </h1>
        <p
          className={`text-xs sm:text-base font-mono font-bold tracking-[0.5em] text-stone-400 uppercase mt-3 transition-opacity duration-500 ${
            introState === 'animating' ? 'opacity-0' : 'opacity-100'
          }`}
        >
          BEACH BAR • CUKLIĆEVO
        </p>
      </div>

      {/* Subtle Skip Hint */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono text-stone-500 uppercase tracking-widest transition-opacity duration-300 ${
          introState === 'animating' ? 'opacity-0' : 'opacity-60'
        }`}
      >
        CLICK OR SCROLL TO SKIP
      </div>
    </div>
  );
}
