'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, Music, Sparkles, ArrowUpRight, Radio, Disc } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { EVENTS_DATA, DICTIONARY, BAR_INFO } from '@/lib/data';
import { Language } from '@/lib/types';

interface SunsetNightStageProps {
  lang: Language;
}

export default function SunsetNightStage({ lang }: SunsetNightStageProps) {
  const t = DICTIONARY[lang].events;
  const tonightEvent = EVENTS_DATA.find((e) => e.isTonight) || EVENTS_DATA[0];
  const upcomingEvents = EVENTS_DATA.filter((e) => e.id !== tonightEvent.id);

  return (
    <section id="events" className="relative py-32 bg-[#080B10] text-white overflow-hidden">
      {/* Background Moonlit Atmosphere Image */}
      <div className="absolute inset-0 z-0 opacity-25">
        <Image
          src="/images/night-vibe.jpg"
          alt="Night vibe and DJ music at Beach Bar Corleone"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080B10] via-[#080B10]/85 to-[#080B10]" />
      </div>

      {/* Kinetic Marquee Ticker */}
      <div className="w-full overflow-hidden select-none pointer-events-none opacity-20 mb-8">
        <div className="animate-marquee-reverse whitespace-nowrap text-6xl sm:text-9xl font-serif font-black uppercase tracking-tighter text-stroke-amber">
          <span>SUNSET SESSIONS • LIVE DJS • NO DRESSCODE • </span>
          <span>SUNSET SESSIONS • LIVE DJS • NO DRESSCODE • </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetrical Left-Aligned Header */}
        <div className="max-w-2xl text-left mb-16 space-y-3">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black text-white tracking-tight leading-[0.95]">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-stone-300 font-sans leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* VINYL PASS & STAGE SHOWCASE (Asymmetrical Overlap) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main 8-Col Vinyl Stage Pass */}
          <div className="lg:col-span-8 rounded-3xl liquid-glass-amber border-2 border-amber-400/50 p-8 sm:p-12 shadow-2xl relative overflow-hidden group">
            {/* Spinning Disc Accent */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 opacity-20 pointer-events-none group-hover:rotate-180 transition-transform duration-1000">
              <Disc className="w-full h-full text-amber-400" />
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500 text-stone-950 text-xs font-black uppercase tracking-widest shadow-xl">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>TONIGHT'S LINE-UP</span>
                </span>

                <div className="flex items-center gap-4 text-xs font-mono text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>{tonightEvent.date}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-stone-300">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>{tonightEvent.time}</span>
                  </span>
                </div>
              </div>

              <h3 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-white mt-6 group-hover:text-amber-300 transition-colors">
                {tonightEvent.title}
              </h3>

              {tonightEvent.djOrAct && (
                <div className="flex items-center gap-3 mt-3 font-mono text-sm text-amber-300">
                  <Music className="w-5 h-5 text-amber-400" />
                  <span className="font-bold">{tonightEvent.djOrAct}</span>
                  <span className="text-stone-500">•</span>
                  <span className="text-stone-300 text-xs">{tonightEvent.genre}</span>
                </div>
              )}

              <p className="text-base sm:text-lg text-stone-300 mt-6 leading-relaxed font-sans max-w-xl">
                {tonightEvent.description[lang]}
              </p>
            </div>

            <div className="mt-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-stone-400 font-mono">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Free Entry • No Guestlist Needed</span>
              </div>

              <a
                href={BAR_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black uppercase tracking-wider transition-all shadow-lg hover:scale-105"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Check Instagram Story</span>
              </a>
            </div>
          </div>

          {/* 4-Col Stacked Upcoming Sessions */}
          <div className="lg:col-span-4 space-y-5">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-6 rounded-3xl liquid-glass border border-white/10 hover:border-white/30 transition-all shadow-xl group"
              >
                <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-2">
                  <span>{evt.date}</span>
                  <span className="text-amber-400">{evt.time}</span>
                </div>

                <h4 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                  {evt.title}
                </h4>

                <p className="text-xs font-mono text-stone-400 mt-1">
                  {evt.genre}
                </p>

                <p className="text-xs text-stone-300 mt-3 leading-relaxed font-sans">
                  {evt.description[lang]}
                </p>
              </div>
            ))}

            {/* Instagram Community Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-rose-950/40 via-amber-950/40 to-stone-900 border border-white/15 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white font-mono uppercase">Follow the Summer</p>
                <p className="text-xs text-stone-400">@beachbarcorleone</p>
              </div>
              <a
                href={BAR_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
