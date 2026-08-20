'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sun, Moon, Sparkles, Compass } from 'lucide-react';
import { Language } from '@/lib/types';
import { DICTIONARY } from '@/lib/data';
import CurvedDivider from '@/components/ui/CurvedDivider';

interface DayNightCurtainProps {
  lang: Language;
}

export default function DayNightCurtain({ lang }: DayNightCurtainProps) {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(10, Math.min(90, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(10, Math.min(90, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  return (
    <section className="relative z-20 pt-16 sm:pt-24 pb-28 bg-[#080B10] text-white select-none">
      {/* Continuous Halbrunde Kuppel / Majestic Arched Dome Divider */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%] overflow-hidden leading-none pointer-events-none">
        <CurvedDivider fillColor="#080B10" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-left">
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black text-white tracking-tight leading-[0.95]">
          TWO WORLDS. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-amber-300 to-rose-400">
            ONE CLIFF.
          </span>
        </h2>
        <p className="text-stone-400 text-base sm:text-lg mt-3 max-w-xl font-sans">
          Drag or hover across the curtain to reveal the morning serenity versus the nightfall rhythm at Cuklićevo.
        </p>
      </div>

      {/* Interactive Curtain Canvas */}
      <div 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[65vh] sm:h-[75vh] cursor-ew-resize"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20">
          
          {/* Layer 1: Night Mood (Base) */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/night-vibe.jpg"
              alt="Night party and lights at Beach Bar Corleone"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
            
            {/* Night Label (Right side) */}
            <div className="absolute bottom-8 right-8 text-right z-10 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/30 border border-rose-400 text-rose-300 text-xs font-mono font-bold">
                <Moon className="w-4 h-4" />
                <span>NIGHTFALL CHILL</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                DJ Grooves & Cocktails
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xs font-sans">
                Lanterns glowing on limestone, music echoing across the sea.
              </p>
            </div>
          </div>

          {/* Layer 2: Day Mood (Clipped Curtain) */}
          <div 
            className="absolute inset-0 z-10 overflow-hidden"
            style={{
              clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
            }}
          >
            <Image
              src="/images/day-drinks.jpg"
              alt="Daytime coffee and drinks at Beach Bar Corleone"
              fill
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />

            {/* Day Label (Left side) */}
            <div className="absolute bottom-8 left-8 text-left z-10 space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/30 border border-teal-400 text-teal-300 text-xs font-mono font-bold">
                <Sun className="w-4 h-4" />
                <span>DAYTIME SERENITY</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white">
                Espresso & Morning Swims
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xs font-sans">
                Silence of the cove, turquoise water, and freshly extracted coffee.
              </p>
            </div>
          </div>

          {/* Dividing Curtain Bar & Handle */}
          <div 
            className="absolute top-0 bottom-0 z-20 w-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white text-stone-950 shadow-2xl flex items-center justify-center font-mono text-xs font-black border-2 border-amber-400 cursor-ew-resize hover:scale-110 transition-transform">
              ⇄
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
