'use client';

import React from 'react';
import Image from 'next/image';
import { Sun, Sunset, Moon, Sparkles, Waves, ArrowRight, Dog, Mountain } from 'lucide-react';
import { DICTIONARY } from '@/lib/data';
import { Language } from '@/lib/types';
import CurvedDivider from '@/components/ui/CurvedDivider';

interface StoryDescentProps {
  lang: Language;
}

export default function StoryDescent({ lang }: StoryDescentProps) {
  const t = DICTIONARY[lang].story;

  return (
    <section 
      id="experience" 
      className="relative z-20 bg-[#0C121A] text-stone-100 pb-32 pt-8 sm:pt-14 overflow-x-clip"
    >
      {/* Continuous Halbrunde Kuppel / Majestic Arched Dome Divider */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%] overflow-hidden leading-none pointer-events-none">
        <CurvedDivider fillColor="#0C121A" />
      </div>
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-[-10%] w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Horizontal Giant Editorial Marquee */}
      <div className="w-full overflow-hidden select-none pointer-events-none opacity-20 my-6">
        <div className="animate-marquee whitespace-nowrap text-6xl sm:text-9xl font-serif font-black uppercase tracking-tighter text-stroke-white">
          <span>{t.marquee}</span>
          <span>{t.marquee}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetrical Floating Stage: Manifesto & Polaroids */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Wild Editorial Cutout (6 Cols) */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-500/30 px-3.5 py-1.5 rounded-full inline-block">
              {t.eyebrow}
            </span>
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
          </div>

          {/* Right Column: Layered Overlapping Parallax Composition (6 Cols) */}
          <div className="lg:col-span-6 relative">
            
            {/* Primary Angled Hero Image */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/15 rotate-[-2deg] hover:rotate-0 transition-transform duration-700 group">
              <Image
                src="/images/day-drinks.jpg"
                alt="Artisan drinks on limestone terrace overlooking the sea at Beach Bar Corleone"
                fill
                loading="lazy"
                quality={75}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-between text-xs font-mono text-stone-200">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <Sun className="w-4 h-4" />
                  <span>{t.badgeMorning}</span>
                </span>
                <span className="text-stone-400">{t.badgeMorningSub}</span>
              </div>
            </div>

            {/* Overlapping Secondary Tilted Card (Golden Hour) */}
            <div className="sm:absolute sm:-bottom-12 sm:-left-10 mt-6 sm:mt-0 w-full sm:w-72 aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/40 rotate-[4deg] hover:rotate-0 transition-transform duration-500 z-20 group">
              <Image
                src="/images/sunset-cocktail.jpg"
                alt="Sunset cocktail at Corleone"
                fill
                loading="lazy"
                quality={75}
                sizes="300px"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-[11px] font-mono text-amber-300 font-bold flex items-center justify-between">
                <span>{t.badgeSunset}</span>
                <Sunset className="w-4 h-4 text-amber-400" />
              </div>
            </div>

            {/* Overlapping Floating Stamp */}
            <div className="hidden sm:block absolute -top-8 -right-6 z-30 p-4 rounded-2xl bg-amber-500 text-stone-950 shadow-2xl rotate-[8deg]">
              <span className="text-[11px] font-black uppercase tracking-widest font-mono block">
                {t.stampTitle}
              </span>
              <span className="text-xs font-bold font-serif">
                {t.stampSubtitle}
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
                {t.stage1Time}
              </span>
              <Sun className="w-5 h-5 text-sky-400" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white group-hover:text-sky-300 transition-colors">
              {t.stage1Title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans">
              {t.stage1Desc}
            </p>
          </div>

          {/* Stage 2: Sunset */}
          <div className="p-7 rounded-3xl liquid-glass-amber border-2 border-amber-400/30 hover:border-amber-400 transition-all group space-y-4 shadow-xl shadow-amber-950/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
                {t.stage2Time}
              </span>
              <Sunset className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
              {t.stage2Title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
              {t.stage2Desc}
            </p>
          </div>

          {/* Stage 3: Night */}
          <div className="p-7 rounded-3xl liquid-glass border border-white/10 hover:border-rose-400/40 transition-all group space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400">
                {t.stage3Time}
              </span>
              <Moon className="w-5 h-5 text-rose-400" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-white group-hover:text-rose-300 transition-colors">
              {t.stage3Title}
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-sans">
              {t.stage3Desc}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
