'use client';

import React from 'react';
import Image from 'next/image';
import { Compass, ArrowDown, Utensils, Music, Waves, Sparkles } from 'lucide-react';
import { BAR_INFO, DICTIONARY } from '@/lib/data';
import { Language } from '@/lib/types';

interface SchemeHeroProps {
  lang: Language;
}

export default function SchemeHero({ lang }: SchemeHeroProps) {
  const t = DICTIONARY[lang].hero;

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#070509] text-white select-none px-6">
      
      {/* 1. Atmospheric Ambient Grain & Mesh Gradient (Scheme Engine style) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Sunset Magenta & Amber Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[900px] h-[500px] rounded-full bg-gradient-to-tr from-amber-600/25 via-rose-600/25 to-purple-900/30 blur-[140px] opacity-70 animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-10 right-10 w-[40vw] max-w-[500px] h-[400px] rounded-full bg-purple-900/20 blur-[160px]" />
        
        {/* Subtle Film Grain Noise Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:24px_24px] opacity-40" />
      </div>

      {/* 2. Main Scheme Engine Centered Brand Monolith */}
      <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center justify-center py-20">
        
        {/* Giant Monolithic Brand Logo */}
        <div className="space-y-2 mb-6">
          <h1 className="text-7xl sm:text-9xl md:text-[13vw] font-serif font-black tracking-tighter text-white uppercase leading-[0.85] drop-shadow-2xl">
            CORLEONE
          </h1>
          <p className="text-xs sm:text-base font-mono font-bold tracking-[0.4em] sm:tracking-[0.6em] text-stone-400 uppercase">
            BEACH BAR • CUKLIĆEVO CLIFF
          </p>
        </div>

        {/* Animated Liquid Gradient Sub-Headline */}
        <div className="mt-4 mb-8 max-w-2xl">
          <p className="text-2xl sm:text-4xl md:text-5xl font-serif font-black tracking-tight uppercase leading-tight">
            <span className="text-stone-200">{t.titleStart} </span>
            <span className="animate-liquid-gradient">{t.titleAccent} </span>
            <span className="text-stone-200">{t.titleEnd}</span>
          </p>
          <p className="mt-4 text-stone-400 font-sans text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Direct Action Hub: 3 Large Prominent Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 w-full max-w-3xl">
          {/* Button 1: Speise- & Getränkekarte */}
          <a
            href="#menu"
            className="flex-1 min-w-[220px] sm:min-w-[200px] flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm uppercase tracking-wider shadow-2xl transition-all hover:scale-105 cursor-pointer"
          >
            <Utensils className="w-5 h-5 text-stone-950" />
            <span>{t.btnMenu}</span>
          </a>

          {/* Button 2: Abendprogramm & Events */}
          <a
            href="#events"
            className="flex-1 min-w-[220px] sm:min-w-[200px] flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase tracking-wider border border-amber-400/40 shadow-2xl hover:scale-105 transition-all cursor-pointer backdrop-blur-md"
          >
            <Music className="w-5 h-5 text-amber-400" />
            <span>{t.btnEvents}</span>
          </a>

          {/* Button 3: Route starten */}
          <a
            href={BAR_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[220px] sm:min-w-[200px] flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm uppercase tracking-wider border border-white/20 shadow-xl hover:scale-105 transition-all cursor-pointer backdrop-blur-md"
          >
            <Compass className="w-5 h-5 text-amber-300" />
            <span>{t.btnRoute}</span>
          </a>
        </div>

        {/* Minimal Scroll Down Cue */}
        <div className="mt-16 flex items-center gap-2 text-xs font-mono text-stone-500 uppercase tracking-widest animate-bounce">
          <ArrowDown className="w-4 h-4 text-amber-400" />
          <span>{t.scrollHint}</span>
        </div>

      </div>

    </section>
  );
}
