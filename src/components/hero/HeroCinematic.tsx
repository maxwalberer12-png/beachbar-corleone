'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { Compass, Waves, ArrowDownRight, Sparkles, Navigation, SunMedium } from 'lucide-react';
import { BAR_INFO, DICTIONARY } from '@/lib/data';
import { Language } from '@/lib/types';

interface HeroCinematicProps {
  lang: Language;
}

export default function HeroCinematic({ lang }: HeroCinematicProps) {
  const t = DICTIONARY[lang].hero;

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-stone-950 text-white pt-24 pb-12">
      {/* Parallax Multi-Layer Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/images/hero-cliffside.jpg"
          alt="Beach Bar Corleone perched high on the limestone cliff in Malinska"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-110 opacity-75 transition-transform duration-1000 ease-out"
        />
        {/* Cinematic Gradient Grading */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-black/70" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-stone-950/30 to-stone-950/90" />
      </div>

      {/* Grain / Noise Texture */}
      <div className="absolute inset-0 z-1 grain-overlay pointer-events-none opacity-40" />

      {/* Top Floating Meta Strip */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40">
              OPEN TODAY 10:00 – 23:00
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-xs font-mono text-stone-300">
            <span className="text-amber-400">LAT: 45.1215° N</span>
            <span className="text-stone-600">•</span>
            <span className="text-sky-400">LON: 14.5262° E</span>
            <span className="text-stone-600">•</span>
            <span>CLIFF ELEVATION: +18M</span>
          </div>
        </div>
      </div>

      {/* Monumental Editorial Stage */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-12">
        <div className="relative">
          
          {/* Huge Background Ghost Typography */}
          <div className="absolute -top-16 sm:-top-28 left-0 right-0 select-none pointer-events-none overflow-hidden opacity-15">
            <span className="text-[20vw] font-serif font-black tracking-tighter text-stroke-white whitespace-nowrap leading-none">
              CORLEONE
            </span>
          </div>

          {/* Main Kinetic Title Block */}
          <div className="relative z-10 max-w-4xl text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-mono font-bold tracking-widest uppercase backdrop-blur-md">
              <Waves className="w-4 h-4 text-amber-400" />
              <span>CUKLIĆEVO CLIFF • MALINSKA • KRK</span>
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-black tracking-tight text-white uppercase leading-[0.9] text-balance drop-shadow-2xl">
              <span>{t.titleStart} </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-rose-400">
                {t.titleAccent}
              </span>
              <br />
              <span className="text-stone-200">{t.titleEnd}</span>
            </h1>

            <p className="text-base sm:text-xl text-stone-200/90 font-sans font-normal max-w-2xl leading-relaxed text-pretty">
              {t.subtitle}
            </p>
          </div>

          {/* Floating Organic Brutalist Stamp (Tilted) */}
          <div className="hidden lg:block absolute -right-4 bottom-4 rotate-[-6deg] hover:rotate-0 transition-transform duration-300 z-20">
            <div className="p-6 rounded-3xl liquid-glass-amber border-2 border-amber-400/40 shadow-2xl backdrop-blur-2xl max-w-xs space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-amber-300">
                <span>EST. 2024</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-sm font-serif font-bold text-white leading-snug">
                „No dress code. No table bookings needed. Just pure Adriatic horizon & cold drinks.“
              </p>
              <div className="text-[11px] font-mono text-stone-400 border-t border-white/10 pt-2 flex items-center justify-between">
                <span>Plaža Cuklićevo</span>
                <span className="text-emerald-400 font-bold">Walk-in Spot</span>
              </div>
            </div>
          </div>

        </div>

        {/* Action Controls & Live HUD */}
        <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <a
            href={BAR_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 text-stone-950 font-black text-sm sm:text-base uppercase tracking-wider shadow-2xl shadow-amber-500/30 hover:scale-105 transition-all cursor-pointer"
          >
            <Compass className="w-5 h-5 text-stone-950" />
            <span>{t.btnRoute}</span>
          </a>

          <a
            href="#experience"
            className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full liquid-glass hover:bg-white/15 text-white font-bold text-sm sm:text-base tracking-wide transition-all border border-white/20"
          >
            <span>Dive into the Experience</span>
            <ArrowDownRight className="w-4 h-4 text-amber-400" />
          </a>
        </div>
      </div>

      {/* Infinite Kinetic Marquee Ticker Strip */}
      <div className="relative z-10 w-full overflow-hidden border-y border-white/10 py-3 bg-black/40 backdrop-blur-md">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-8 text-xs font-mono uppercase tracking-[0.25em] text-stone-400">
          <span>• ADRIATIC CLIFFSIDE ESCAPE</span>
          <span className="text-amber-400">• FRESH ILLY ESPRESSO</span>
          <span>• SUNSET SPRITZ RITUAL</span>
          <span className="text-rose-400">• CHILLED HOUSE GROOVES</span>
          <span>• 100% SEA HORIZON</span>
          <span className="text-emerald-400">• DOGS WELCOME</span>
          <span>• PLAŽA CUKLIĆEVO MALINSKA</span>
          <span>• ADRIATIC CLIFFSIDE ESCAPE</span>
          <span className="text-amber-400">• FRESH ILLY ESPRESSO</span>
          <span>• SUNSET SPRITZ RITUAL</span>
          <span className="text-rose-400">• CHILLED HOUSE GROOVES</span>
          <span>• 100% SEA HORIZON</span>
          <span className="text-emerald-400">• DOGS WELCOME</span>
          <span>• PLAŽA CUKLIĆEVO MALINSKA</span>
        </div>
      </div>
    </section>
  );
}
