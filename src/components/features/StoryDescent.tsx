'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sun, Sunset, Moon, Volume2, VolumeX, Sparkles, Waves, ArrowRight, Dog, Mountain } from 'lucide-react';
import { DICTIONARY } from '@/lib/data';
import { Language } from '@/lib/types';

interface StoryDescentProps {
  lang: Language;
}

export default function StoryDescent({ lang }: StoryDescentProps) {
  const [soundPlaying, setSoundPlaying] = useState(false);
  const t = DICTIONARY[lang].story;

  return (
    <section 
      id="experience" 
      className="relative -mt-20 sm:-mt-28 z-20 py-32 overflow-hidden bg-[#0C121A] text-stone-100 rounded-t-[3.5rem] sm:rounded-t-[6rem] lg:rounded-t-[8rem] border-t border-white/20 shadow-[0_-30px_70px_rgba(0,0,0,0.9)]"
    >
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-[-10%] w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Horizontal Giant Editorial Marquee */}
      <div className="w-full overflow-hidden select-none pointer-events-none opacity-20 my-6">
        <div className="animate-marquee whitespace-nowrap text-6xl sm:text-9xl font-serif font-black uppercase tracking-tighter text-stroke-white">
          <span>THE CLIFFSIDE RITUAL • CUKLIĆEVO BEACH • </span>
          <span>THE CLIFFSIDE RITUAL • CUKLIĆEVO BEACH • </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetrical Floating Stage: Manifesto & Polaroids */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Wild Editorial Cutout (6 Cols) */}
          <div className="lg:col-span-6 space-y-8 text-left">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black text-white tracking-tight leading-[0.95] text-balance">
              {t.title}
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-stone-300 font-sans font-normal leading-relaxed text-pretty">
              <p className="border-l-2 border-amber-500/50 pl-4 italic text-stone-200">
                {t.paragraph1}
              </p>
              <p className="text-stone-400">
                {t.paragraph2}
              </p>
            </div>

            {/* Interactive Ambient Soundwave Bar */}
            <div className="p-5 rounded-2xl liquid-glass border border-white/15 flex items-center justify-between gap-4 max-w-md">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSoundPlaying(!soundPlaying)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                    soundPlaying ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/30' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                  aria-label="Toggle ambient vibe"
                >
                  {soundPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-stone-400" />}
                </button>
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    {soundPlaying ? 'Waves & Sunset Beats' : 'Ambient Lounge Vibe'}
                  </p>
                  <p className="text-[11px] text-stone-400 font-mono">
                    {soundPlaying ? 'Broadcasting live ambience' : 'Click to feel the mood'}
                  </p>
                </div>
              </div>

              {/* Animated Equalizer Bars */}
              <div className="flex items-end gap-1 h-6">
                <div className={`w-1 bg-amber-400 rounded-full ${soundPlaying ? 'eq-bar-1' : 'h-1.5'}`} />
                <div className={`w-1 bg-rose-400 rounded-full ${soundPlaying ? 'eq-bar-2' : 'h-3'}`} />
                <div className={`w-1 bg-amber-300 rounded-full ${soundPlaying ? 'eq-bar-3' : 'h-2'}`} />
                <div className={`w-1 bg-emerald-400 rounded-full ${soundPlaying ? 'eq-bar-4' : 'h-4'}`} />
              </div>
            </div>

          </div>

          {/* Right Column: Layered Overlapping Parallax Composition (6 Cols) */}
          <div className="lg:col-span-6 relative">
            
            {/* Primary Angled Hero Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/15 rotate-[-2deg] hover:rotate-0 transition-transform duration-700 group">
              <Image
                src="/images/day-drinks.jpg"
                alt="Artisan drinks on limestone terrace overlooking the sea at Beach Bar Corleone"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs font-mono text-stone-200">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Sun className="w-4 h-4" />
                  <span>Morning Escape</span>
                </span>
                <span className="text-stone-400">Illy Espresso & Sea Dip</span>
              </div>
            </div>

            {/* Overlapping Secondary Tilted Card (Golden Hour) */}
            <div className="sm:absolute sm:-bottom-12 sm:-left-10 mt-6 sm:mt-0 w-full sm:w-72 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/40 rotate-[4deg] hover:rotate-0 transition-transform duration-500 z-20 group">
              <Image
                src="/images/sunset-cocktail.jpg"
                alt="Sunset cocktail at Corleone"
                fill
                sizes="300px"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-amber-300 font-bold flex items-center justify-between">
                <span>Golden Hour Spritz</span>
                <Sunset className="w-4 h-4 text-amber-400" />
              </div>
            </div>

            {/* Overlapping Floating Stamp */}
            <div className="hidden sm:block absolute -top-8 -right-6 z-30 p-4 rounded-2xl bg-amber-500 text-stone-950 shadow-2xl rotate-[8deg]">
              <span className="text-[11px] font-black uppercase tracking-widest font-mono block">
                CLIFFSIDE PERCH
              </span>
              <span className="text-xs font-bold font-serif">
                100% Sea View
              </span>
            </div>

          </div>

        </div>

        {/* 3 Asymmetric Experiential Stages (Morning -> Sunset -> Night) */}
        <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Stage 1: Morning */}
          <div className="p-7 rounded-3xl liquid-glass border border-white/10 hover:border-sky-400/40 transition-all group space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-400">
                10:00 AM
              </span>
              <Sun className="w-5 h-5 text-sky-400" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white group-hover:text-sky-300 transition-colors">
              Morning Espresso & Swims
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans">
              Quiet morning breeze, authentic Illy espresso, and steps down to the secluded pebble beach before the crowds arrive.
            </p>
          </div>

          {/* Stage 2: Sunset */}
          <div className="p-7 rounded-3xl liquid-glass-amber border-2 border-amber-400/30 hover:border-amber-400 transition-all group space-y-4 shadow-xl shadow-amber-950/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                17:30 PM
              </span>
              <Sunset className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
              The Golden Hour Spritz
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
              The sky turns fiery amber, glasses clink with homemade rosemary spritz, and complimentary Mediterranean bar snacks are served.
            </p>
          </div>

          {/* Stage 3: Night */}
          <div className="p-7 rounded-3xl liquid-glass border border-white/10 hover:border-rose-400/40 transition-all group space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400">
                21:00 PM
              </span>
              <Moon className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white group-hover:text-rose-300 transition-colors">
              Starlit Beats & Gin
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans">
              Lanterns illuminate the limestone tables, deep house rhythms echo across the water, and handcrafted gin tonics flow under the stars.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
