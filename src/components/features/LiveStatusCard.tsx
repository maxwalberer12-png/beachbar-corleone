'use client';

import React from 'react';
import { Clock, SunMedium, Sunset, Sparkles, Navigation, Phone, Compass, Waves, ArrowRight } from 'lucide-react';
import { BAR_INFO, DICTIONARY } from '@/lib/data';
import { Language } from '@/lib/types';

interface LiveStatusCardProps {
  lang: Language;
}

export default function LiveStatusCard({ lang }: LiveStatusCardProps) {
  const t = DICTIONARY[lang].liveRadar;
  const common = DICTIONARY[lang].location;

  return (
    <section id="live-radar" className="relative z-20 -mt-12 sm:-mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Asymmetric Bento-Grid Layout (8 Cols + 4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        
        {/* Main 8-Col Bento Spotlight: Live Status & Sunset Radar */}
        <div className="lg:col-span-8 glass-panel p-6 sm:p-10 rounded-3xl border border-stone-200/90 shadow-2xl bg-white/95 backdrop-blur-2xl flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-amber-500/10 to-rose-500/10 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-full border border-emerald-300/50">
                  {t.statusOpen}
                </span>
                <span className="text-xs font-mono text-stone-600">
                  {BAR_INFO.regularHours}
                </span>
              </div>

              <span className="text-xs font-mono uppercase text-stone-600 tracking-wider">
                RADAR: MALINSKA COAST
              </span>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
              <div className="md:col-span-7 space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                  {t.badge}
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-950 tracking-tight leading-tight">
                  {t.heading}
                </h2>
                <p className="text-sm text-stone-600 font-sans leading-relaxed">
                  {BAR_INFO.seasonNotice[lang]}
                </p>
              </div>

              {/* Sunset Highlight Box */}
              <div className="md:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-stone-100 border border-amber-500/20 space-y-2">
                <div className="flex items-center gap-2 text-rose-700">
                  <Sunset className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider">{t.sunsetLabel}</span>
                </div>
                <p className="text-xl font-serif font-black text-stone-950">
                  {t.sunsetValue}
                </p>
                <p className="text-xs text-stone-500">
                  {t.tonightValue}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Footer Bar inside Bento */}
          <div className="mt-8 pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
              <Compass className="w-4 h-4 text-amber-600" />
              <span>Direct access above Cuklićevo beach</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={`tel:${BAR_INFO.phone}`}
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-bold tracking-wider transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-amber-600" />
                <span>{common.callUsBtn}</span>
              </a>
              <a
                href={BAR_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-stone-950 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>{common.openInMapsBtn}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 4-Col Stacked Auxiliary Bento Cards */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-5">
          
          {/* Stacked Card 1: Coast Weather & Waves */}
          <div className="p-6 rounded-3xl bg-stone-900 text-white border border-stone-800 shadow-xl flex-1 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-widest text-sky-400">
                {t.weatherLabel}
              </span>
              <SunMedium className="w-6 h-6 text-amber-400 animate-spin-slow" />
            </div>

            <div className="my-4">
              <p className="text-3xl font-serif font-black text-white">
                28°C
              </p>
              <p className="text-xs text-stone-300 mt-1">
                Sunny, clear Adriatic visibility & calm sea breeze
              </p>
            </div>

            <div className="pt-3 border-t border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
              <span>Water Temp: 24°C</span>
              <span className="text-emerald-400 font-semibold">Perfect Swim Day</span>
            </div>
          </div>

          {/* Stacked Card 2: Tonight's Atmosphere & Music */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-amber-950/60 to-stone-900 text-white border border-amber-500/30 shadow-xl flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
                {t.tonightLabel}
              </span>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>

            <div className="my-3">
              <p className="text-lg font-serif font-bold text-white">
                Sunset Beats & Aperitivo
              </p>
              <p className="text-xs text-stone-300 mt-1">
                Chilled house grooves, complimentary bites with Spritz
              </p>
            </div>

            <a
              href="#events"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 uppercase tracking-wider group"
            >
              <span>See Schedule</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
