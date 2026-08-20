'use client';

import React from 'react';
import Image from 'next/image';
import { Compass, Utensils, Waves, ArrowDownRight, MapPin, Sparkles } from 'lucide-react';
import { BAR_INFO, DICTIONARY } from '@/lib/data';
import { Language } from '@/lib/types';

interface HeroCliffsideProps {
  lang: Language;
}

export default function HeroCliffside({ lang }: HeroCliffsideProps) {
  const t = DICTIONARY[lang].hero;

  return (
    <section className="relative min-h-[96vh] flex flex-col justify-between overflow-hidden pt-24 sm:pt-28 pb-20 sm:pb-32">
      {/* Cinematic Full-Bleed Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-cliffside.jpg"
          alt="Beach Bar Corleone on the cliff above Cuklićevo beach in Malinska"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        {/* Layered Gradient Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/60 to-stone-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-black/60" />
      </div>

      {/* Grain / Noise Texture */}
      <div className="absolute inset-0 z-1 grain-overlay pointer-events-none opacity-30" />

      {/* Top Floating Coordinates */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="inline-flex items-center gap-2 text-amber-300/90 text-xs sm:text-sm font-semibold tracking-widest uppercase">
            <Waves className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.eyebrow}</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-stone-300">
            <span>45.1215° N, 14.5262° E</span>
            <span className="text-amber-400">•</span>
            <span>CLIFFSIDE ELEVATION 18M</span>
          </div>
        </div>
      </div>

      {/* Main Asymmetric Hero Stage */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          
          {/* Massive Left-Aligned Editorial Headline (7 Cols) */}
          <div className="lg:col-span-8 text-left space-y-4">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-black tracking-tight text-white uppercase leading-[0.92] drop-shadow-2xl">
              <span className="block text-stone-100">{t.titleStart}</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-rose-400">
                {t.titleAccent}
              </span>
              <span className="block text-stone-200">{t.titleEnd}</span>
            </h1>
          </div>

          {/* Asymmetric Offset Right Column (4 Cols) */}
          <div className="lg:col-span-4 lg:col-start-9 space-y-6 text-left">
            <div className="p-6 rounded-3xl bg-stone-900/70 border border-white/15 backdrop-blur-xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/30">
                  EST. MALINSKA
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
              </div>

              <p className="text-sm sm:text-base text-stone-200 font-sans font-normal leading-relaxed text-pretty">
                {t.subtitle}
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-2.5 pt-2">
                <a
                  href={BAR_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 text-stone-950 font-bold text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-amber-950/40 transition-all hover:scale-[1.02]"
                >
                  <span className="flex items-center gap-2">
                    <Compass className="w-4 h-4" />
                    <span>{t.btnRoute}</span>
                  </span>
                  <ArrowDownRight className="w-4 h-4" />
                </a>

                <a
                  href="#menu"
                  className="flex items-center justify-between px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Utensils className="w-4 h-4 text-amber-300" />
                    <span>{t.btnMenu}</span>
                  </span>
                  <span className="text-stone-400 text-xs">Explore →</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Ticker & Overlapping Cue */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs text-stone-300">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/30 text-emerald-300 font-semibold text-[11px] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.liveBadge}</span>
            </span>
            <span className="text-stone-400 hidden sm:inline">{t.walkInNote}</span>
          </div>

          <a
            href="#live-radar"
            className="flex items-center gap-2 text-stone-300 hover:text-amber-400 transition-colors uppercase font-mono text-[11px] tracking-widest group"
          >
            <span>DISCOVER LIVE RADAR</span>
            <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
