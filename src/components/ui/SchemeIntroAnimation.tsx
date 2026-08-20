'use client';

import React, { useState, useEffect } from 'react';

export default function SchemeIntroAnimation() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden select-none animate-scheme-curtain">
      {/* 1. Fullscreen Dark Background Curtain */}
      <div className="absolute inset-0 bg-[#070509]">
        {/* Soft Ambient Sunset/Purple Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(231,111,81,0.25)_0%,rgba(43,16,9,0.3)_45%,rgba(7,5,9,0.95)_75%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* 2. The Travelling Logo: Moves from exact screen center to the top navbar */}
      <div className="fixed left-1/2 -translate-x-1/2 z-[10000] text-center origin-top will-change-transform animate-scheme-logo">
        <span className="font-serif text-7xl sm:text-9xl md:text-[13vw] font-black tracking-tighter text-white uppercase leading-none block drop-shadow-2xl">
          CORLEONE
        </span>
        <span className="text-xs sm:text-sm uppercase tracking-[0.4em] text-stone-400 font-mono font-bold block mt-3 animate-scheme-subline">
          BEACH BAR • CUKLIĆEVO
        </span>
      </div>
    </div>
  );
}
