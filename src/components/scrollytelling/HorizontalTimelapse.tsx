'use client';

import React from 'react';
import Image from 'next/image';
import { Sun, Sunset, Moon, Sparkles, Waves, Music, Disc, ArrowRight, Check } from 'lucide-react';
import { SIGNATURE_COCKTAILS, BAR_INFO, DICTIONARY } from '@/lib/data';
import { Language } from '@/lib/types';

interface HorizontalTimelapseProps {
  lang: Language;
  progress: number; // 0 to 1 across this stage
}

export default function HorizontalTimelapse({ lang, progress }: HorizontalTimelapseProps) {
  // Horizontal offset from 0vw to -200vw across 3 full-width panoramic panels
  const translateX = progress * -200;

  // Background atmosphere color morphing
  let bgGradient = 'from-[#0A1624] via-[#0D2838] to-[#0A1624]';
  if (progress > 0.35 && progress <= 0.7) {
    bgGradient = 'from-[#2B1009] via-[#4A1E0E] to-[#1F0C07]';
  } else if (progress > 0.7) {
    bgGradient = 'from-[#080B10] via-[#0F141C] to-[#080B10]';
  }

  const sunsetDrink = SIGNATURE_COCKTAILS[0]; // Corleone Sunset Spritz
  const ginDrink = SIGNATURE_COCKTAILS[1]; // Adriatic Mist Gin Tonic

  return (
    <div className={`relative w-full h-full overflow-hidden bg-gradient-to-r ${bgGradient} text-white transition-colors duration-700 select-none`}>
      
      {/* Floating Ambient Glow Spot */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[180px] pointer-events-none opacity-30 transition-all duration-700"
        style={{
          transform: `translate(${progress * -300}px, -50%)`,
          backgroundColor: progress < 0.4 ? '#2A9D8F' : progress < 0.75 ? '#E76F51' : '#457B9D'
        }}
      />

      {/* Panoramic Horizontal Track (300vw width) */}
      <div 
        className="flex h-full w-[300vw] will-change-transform transition-transform duration-75 ease-out"
        style={{
          transform: `translateX(${translateX}vw)`,
        }}
      >
        
        {/* ========================================================================= */}
        {/* PANEL 1: MORNING / DAYTIME (100vw) */}
        {/* ========================================================================= */}
        <div className="relative w-[100vw] h-full flex items-center justify-between px-6 sm:px-16 lg:px-24 shrink-0">
          <div className="max-w-xl space-y-6 text-left z-10">
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-black tracking-tight text-white uppercase leading-[0.95]">
              MORNING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-teal-200 to-emerald-300">
                SERENITY.
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-stone-200 font-sans font-light leading-relaxed">
              Before the sun peaks, the cove belongs to early swimmers and coffee lovers. Pull up a chair on the limestone terrace for freshly extracted Illy espresso and crisp sea breeze.
            </p>

            <div className="flex items-center gap-6 pt-4 text-xs font-mono text-stone-300">
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Cold Brew & Freddo</span>
              </span>
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Direct Pebble Beach Dip</span>
              </span>
            </div>
          </div>

          {/* Floating Day Visual with Parallax */}
          <div className="relative w-[45vw] max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 rotate-[-3deg] hover:rotate-0 transition-transform duration-500 hidden md:block">
            <Image
              src="/images/day-drinks.jpg"
              alt="Morning coffee and fresh iced drinks at Beach Bar Corleone"
              fill
              sizes="50vw"
              className="object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-xs font-mono text-sky-300 flex items-center justify-between">
              <span>Plaža Cuklićevo Shoreline</span>
              <span>Water: 24°C</span>
            </div>
          </div>
        </div>


        {/* ========================================================================= */}
        {/* PANEL 2: THE GOLDEN HOUR SUNSET (100vw) */}
        {/* ========================================================================= */}
        <div className="relative w-[100vw] h-full flex items-center justify-between px-6 sm:px-16 lg:px-24 shrink-0">
          <div className="max-w-xl space-y-6 text-left z-10">
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-black tracking-tight text-white uppercase leading-[0.95]">
              GOLDEN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-rose-400">
                ALCHEMY.
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-stone-200 font-sans font-light leading-relaxed">
              The sky catches fire over the Kvarner horizon. The music shifts to melodic lounge beats, shakers start ringing, and complimentary Mediterranean bar snacks arrive with every Spritz.
            </p>

            {/* Cocktail Spotlight Card */}
            <div className="p-5 rounded-2xl liquid-glass-amber border border-amber-400/40 max-w-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                  {sunsetDrink.name}
                </span>
                <span className="text-lg font-serif font-bold text-amber-400">
                  {sunsetDrink.price}
                </span>
              </div>
              <p className="text-xs text-stone-200">
                {sunsetDrink.description[lang]}
              </p>
            </div>
          </div>

          {/* Floating Sunset Cocktail with Parallax */}
          <div className="relative w-[45vw] max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/50 rotate-[3deg] hover:rotate-0 transition-transform duration-500 hidden md:block">
            <Image
              src="/images/sunset-cocktail.jpg"
              alt="Corleone Sunset Spritz against golden Adriatic horizon"
              fill
              sizes="50vw"
              className="object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-amber-400/30 text-xs font-mono text-amber-300 flex items-center justify-between">
              <span>Sunset Time: approx. 20:15 CEST</span>
              <span>Free Walk-ins</span>
            </div>
          </div>
        </div>


        {/* ========================================================================= */}
        {/* PANEL 3: NOCTURNAL BEATS & STARLIT ADRIATIC (100vw) */}
        {/* ========================================================================= */}
        <div className="relative w-[100vw] h-full flex items-center justify-between px-6 sm:px-16 lg:px-24 shrink-0">
          <div className="max-w-xl space-y-6 text-left z-10">
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-black tracking-tight text-white uppercase leading-[0.95]">
              STARLIT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-purple-400">
                BEATS.
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-stone-200 font-sans font-light leading-relaxed">
              Warm summer winds, hanging rattan lanterns casting warm shadows on the stone, and DJ Dugina playing deep-house grooves into the moonlit night.
            </p>

            {/* Night Gin Card */}
            <div className="p-5 rounded-2xl liquid-glass border border-white/20 max-w-md space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-300">
                  {ginDrink.name}
                </span>
                <span className="text-lg font-serif font-bold text-amber-400">
                  {ginDrink.price}
                </span>
              </div>
              <p className="text-xs text-stone-300">
                {ginDrink.description[lang]}
              </p>
            </div>
          </div>

          {/* Floating Night Visual with Parallax */}
          <div className="relative w-[45vw] max-w-lg aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 rotate-[-2deg] hover:rotate-0 transition-transform duration-500 hidden md:block">
            <Image
              src="/images/night-vibe.jpg"
              alt="Night party and DJ music at Beach Bar Corleone"
              fill
              sizes="50vw"
              className="object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-rose-300 flex items-center justify-between">
              <span>DJ Dugina & Guests</span>
              <span>Deep House • Open End</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Horizontal Progress Indicator Strip */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-5 py-2 rounded-full bg-black/60 border border-white/15 backdrop-blur-md">
        <span className={`text-[11px] font-mono font-bold uppercase ${progress < 0.35 ? 'text-sky-300' : 'text-stone-500'}`}>
          10:00 MORNING
        </span>
        <span className="text-stone-600">→</span>
        <span className={`text-[11px] font-mono font-bold uppercase ${progress >= 0.35 && progress < 0.7 ? 'text-amber-300' : 'text-stone-500'}`}>
          18:00 SUNSET
        </span>
        <span className="text-stone-600">→</span>
        <span className={`text-[11px] font-mono font-bold uppercase ${progress >= 0.7 ? 'text-rose-300' : 'text-stone-500'}`}>
          22:00 NIGHT
        </span>
      </div>

    </div>
  );
}
