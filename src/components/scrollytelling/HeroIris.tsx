'use client';

import React from 'react';
import Image from 'next/image';
import { Compass, ArrowDown, Utensils, Music } from 'lucide-react';
import { BAR_INFO, DICTIONARY } from '@/lib/data';
import { Language } from '@/lib/types';

interface HeroIrisProps {
  lang: Language;
  scrollProgress?: number;
}

export default function HeroIris({ lang }: HeroIrisProps) {
  const t = DICTIONARY[lang].hero;

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black select-none pt-24 pb-16">
      
      {/* Background Ghost Typography */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-20">
        <span className="text-[24vw] font-serif font-black tracking-tighter text-stroke-white whitespace-nowrap">
          CORLEONE
        </span>
      </div>

      {/* Circular Iris Mask Portal (The iconic circular cliffside window) */}
      <div 
        className="absolute inset-0 z-10 overflow-hidden flex items-center justify-center pointer-events-none"
        style={{
          clipPath: 'circle(min(46vw, 480px) at 50% 50%)',
        }}
      >
        <Image
          src="/images/hero-cliffside.jpg"
          alt="Beach Bar Corleone Cliffside Panorama"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        {/* Layered cinematic lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-black/60" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/70" />
      </div>

      {/* Overlay Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center pointer-events-auto">
        
        {/* Massive Screen Title */}
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-serif font-black tracking-tight text-white uppercase leading-[0.9] drop-shadow-2xl">
          <span className="block text-stone-100">SEA VIEWS.</span>
          <span className="block animate-liquid-gradient">
            COCKTAILS.
          </span>
          <span className="block text-stone-200">SUNSET VIBES.</span>
        </h1>

        <p className="mt-6 text-base sm:text-xl text-stone-200 font-sans font-light max-w-2xl leading-relaxed text-balance">
          {t.subtitle}
        </p>

        {/* Direct Action Hub: 3 Large Prominent Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 w-full max-w-3xl">
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
            className="flex-1 min-w-[220px] sm:min-w-[200px] flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-stone-900/80 hover:bg-stone-800 text-white font-bold text-sm uppercase tracking-wider border border-amber-400/50 shadow-2xl hover:scale-105 transition-all cursor-pointer backdrop-blur-md"
          >
            <Music className="w-5 h-5 text-amber-400" />
            <span>{t.btnEvents}</span>
          </a>

          {/* Button 3: Route starten */}
          <a
            href={BAR_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 min-w-[220px] sm:min-w-[200px] flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-stone-900/80 hover:bg-stone-800 text-white font-bold text-sm uppercase tracking-wider border border-white/20 shadow-xl hover:scale-105 transition-all cursor-pointer backdrop-blur-md"
          >
            <Compass className="w-5 h-5 text-amber-300" />
            <span>{t.btnRoute}</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-12 flex items-center gap-2 text-xs font-mono text-stone-400 uppercase tracking-widest animate-bounce">
          <ArrowDown className="w-4 h-4 text-amber-400" />
          <span>SCROLL DOWN</span>
        </div>
      </div>

    </section>
  );
}
