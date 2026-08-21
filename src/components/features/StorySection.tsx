'use client';

import React from 'react';
import Image from 'next/image';
import { Mountain, GlassWater, Dog, Sun, ArrowRight, Waves, Sparkles } from 'lucide-react';
import { DICTIONARY } from '@/lib/data';
import { Language } from '@/lib/types';

interface StorySectionProps {
  lang: Language;
}

export default function StorySection({ lang }: StorySectionProps) {
  const t = DICTIONARY[lang].story;

  return (
    <section id="experience" className="py-24 sm:py-36 relative overflow-hidden bg-[#F7F5EE]">
      {/* Subtle organic background aura */}
      <div className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Editorial Header & Manifesto (5 Cols) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-8 text-left">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800 bg-amber-200/60 px-3.5 py-1.5 rounded-full inline-block mb-4">
                {t.eyebrow}
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-stone-950 tracking-tight leading-[0.95] text-balance">
                {t.title}
              </h2>
            </div>

            <div className="space-y-4 text-base sm:text-lg text-stone-700 font-sans font-normal leading-relaxed text-pretty">
              <p>{t.paragraph1}</p>
              <p>{t.paragraph2}</p>
            </div>

            {/* Micro Pillars in Vertical Flow */}
            <div className="space-y-3 pt-4 border-t border-stone-300/80">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Mountain className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{t.stage1Title}</h4>
                  <p className="text-xs text-stone-500 mt-0.5">{t.stage1Desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-sky-500/15 text-sky-800 flex items-center justify-center shrink-0 mt-0.5">
                  <GlassWater className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{t.stage2Title}</h4>
                  <p className="text-xs text-stone-500 mt-0.5">{t.stage2Desc}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <Dog className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{t.stage3Title}</h4>
                  <p className="text-xs text-stone-500 mt-0.5">{t.stage3Desc}</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#menu"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-amber-800 hover:text-amber-950 group"
              >
                <span>{DICTIONARY[lang].hero.btnMenu}</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Asymmetrical Staggered Scrollytelling Cards (7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Card 1: Large Day-to-Sea Experience */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200/80 aspect-[16/11] group">
              <Image
                src="/images/day-drinks.jpg"
                alt="Daytime coffee, botanical iced drinks and crystal sea view at Beach Bar Corleone"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/40 flex items-center justify-between shadow-lg">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700 block">
                    MORNING • AFTERNOON
                  </span>
                  <p className="text-sm font-bold text-stone-900">
                    Artisan Coffee, Iced Tonics & Pebble Beach
                  </p>
                </div>
                <Sun className="w-6 h-6 text-amber-500" />
              </div>
            </div>

            {/* Card 2: Overlapping Asymmetric Offset Sunset Card */}
            <div className="sm:-ml-8 relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-stone-900 text-white p-6 sm:p-8 rounded-3xl border border-stone-800 shadow-2xl">
              <div className="sm:col-span-6 relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-white/10">
                <Image
                  src="/images/sunset-cocktail.jpg"
                  alt="Sunset Spritz cocktail at Corleone overlooking the Adriatic horizon"
                  fill
                  sizes="320px"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="sm:col-span-6 space-y-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/30 inline-block">
                  GOLDEN HOUR
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug">
                  The Daily Sunset Ritual
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-sans leading-relaxed">
                  As the sun dips below the Kvarner Bay, the cliffs glow in gold and amber. The music shifts, shakers start ringing, and signature spritzes are served.
                </p>
                <div className="pt-2 text-xs font-mono text-amber-400">
                  Daily from 17:30 • Free Walk-ins
                </div>
              </div>
            </div>

            {/* Card 3: Deep Night Atmosphere Box */}
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-stone-800 aspect-[16/9] group">
              <Image
                src="/images/night-vibe.jpg"
                alt="Moonlit sea and evening DJ sessions at Beach Bar Corleone"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-rose-400 block mb-1">
                    NIGHTFALL
                  </span>
                  <h4 className="text-xl font-serif font-bold text-white">
                    Summer Nights Under the Stars
                  </h4>
                  <p className="text-xs text-stone-300 mt-1 max-w-md">
                    Warm breezes, starlit cliffs, and ambient tunes echoing over the water.
                  </p>
                </div>
                <Sparkles className="w-6 h-6 text-amber-400 shrink-0" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
