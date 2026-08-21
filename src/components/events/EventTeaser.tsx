'use client';

import React from 'react';
import Image from 'next/image';
import { Calendar, Clock, Music, Sparkles, ArrowUpRight, Radio, Waves } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { EVENTS_DATA, DICTIONARY, BAR_INFO } from '@/lib/data';
import { Language } from '@/lib/types';

interface EventTeaserProps {
  lang: Language;
}

export default function EventTeaser({ lang }: EventTeaserProps) {
  const t = DICTIONARY[lang].events;
  const tonightEvent = EVENTS_DATA.find((e) => e.isTonight) || EVENTS_DATA[0];
  const upcomingEvents = EVENTS_DATA.filter((e) => e.id !== tonightEvent.id);

  return (
    <section id="events" className="py-24 sm:py-36 relative overflow-hidden bg-stone-900 text-white">
      {/* Background Night Vibe Image with Deep Gradient */}
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="/images/night-vibe.jpg"
          alt="Night vibe and DJ music at Beach Bar Corleone"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-stone-900/90 to-stone-900" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetrical Left-Aligned Header */}
        <div className="max-w-2xl text-left mb-16 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-500/30 px-3 py-1 rounded-full inline-block">
            {t.eyebrow}
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif font-black text-white tracking-tight leading-[0.95]">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-stone-300 font-sans leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Asymmetrical Bento Events Grid (8 Cols Featured + 4 Cols Stacked) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main 8-Col Event Spotlight */}
          <div className="lg:col-span-8 rounded-3xl bg-gradient-to-br from-amber-950/50 via-stone-950/90 to-stone-950 border-2 border-amber-500/50 p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-stone-950 text-xs font-black uppercase tracking-widest shadow-md">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.tonightLineup}</span>
                </span>

                <div className="flex items-center gap-4 text-xs font-mono text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{tonightEvent.date[lang]}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-stone-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{tonightEvent.time}</span>
                  </span>
                </div>
              </div>

              <h3 className="text-3xl sm:text-5xl font-serif font-black text-white mt-6 group-hover:text-amber-300 transition-colors">
                {tonightEvent.title[lang]}
              </h3>

              {tonightEvent.djOrAct && (
                <p className="text-sm font-semibold text-amber-300/90 flex items-center gap-2 mt-2 font-mono">
                  <Music className="w-4 h-4 text-amber-400" />
                  <span>
                    {typeof tonightEvent.djOrAct === 'string' ? tonightEvent.djOrAct : tonightEvent.djOrAct[lang]}
                  </span>
                </p>
              )}

              <span className="inline-block text-xs font-mono text-stone-300 mt-3 px-3 py-1 rounded-xl bg-stone-900 border border-stone-800">
                {tonightEvent.genre[lang]}
              </span>

              <p className="text-base sm:text-lg text-stone-300 mt-6 leading-relaxed font-sans max-w-2xl">
                {tonightEvent.description[lang]}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-stone-400 font-mono">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <span>Walk-ins Welcome • No Reservations Needed</span>
              </div>

              <a
                href={BAR_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-amber-400 text-xs font-bold uppercase tracking-wider transition-colors border border-stone-800"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Instagram Live Updates</span>
              </a>
            </div>
          </div>

          {/* 4-Col Stacked Upcoming Dates & Instagram Radar */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            {upcomingEvents.map((evt) => (
              <div
                key={evt.id}
                className="rounded-3xl bg-stone-950/70 border border-stone-800 p-6 flex flex-col justify-between hover:border-stone-700 transition-colors shadow-xl flex-1"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-stone-400 mb-2">
                    <span>{evt.date[lang]}</span>
                    <span>{evt.time}</span>
                  </div>

                  <h4 className="text-xl font-serif font-bold text-white">
                    {evt.title[lang]}
                  </h4>

                  <span className="text-xs font-mono text-amber-400/80 block mt-1">
                    {evt.genre[lang]}
                  </span>

                  <p className="text-xs sm:text-sm text-stone-300 mt-2.5 leading-relaxed font-sans">
                    {evt.description[lang]}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-900 flex items-center justify-between text-xs font-mono text-stone-400">
                  <span>Free Entry</span>
                  <a
                    href={BAR_INFO.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold"
                  >
                    <span>Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}

            {/* Instagram Quick Hub */}
            <div className="rounded-3xl bg-gradient-to-r from-rose-950/30 to-amber-950/30 border border-white/10 p-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Follow the Summer</p>
                <p className="text-[11px] text-stone-400">@beachbarcorleone</p>
              </div>
              <a
                href={BAR_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
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
