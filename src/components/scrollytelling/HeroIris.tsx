'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Compass, ArrowDown, Utensils, Music } from 'lucide-react';
import { BAR_INFO, DICTIONARY } from '@/lib/data';
import { Language } from '@/lib/types';

interface HeroIrisProps {
  lang: Language;
  scrollProgress?: number;
}

export default function HeroIris({ lang }: HeroIrisProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const t = DICTIONARY[lang].hero;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollDistance = containerRef.current.offsetHeight - window.innerHeight;
      if (scrollDistance <= 0) return;

      // Distance from top of container to top of viewport
      const currentScroll = -rect.top;
      const p = Math.min(1, Math.max(0, currentScroll / scrollDistance));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Circle radius:
  // Starts at 26vmax (distinct circle portal)
  // Reaches 120vmax at progress = 0.75 (100% full bleed screen)
  // From 0.75 to 1.0, it remains 100% full bleed before unpinning
  const isFullyOpen = progress >= 0.75;
  const circleRadius = isFullyOpen ? 150 : 26 + (progress / 0.75) * 110;
  const contentOpacity = Math.max(0, 1 - progress * 2.0);
  const contentTranslateY = progress * -80;
  const imageScale = 1.05 + progress * 0.12;

  return (
    <section ref={containerRef} className="relative h-[250vh] w-full bg-[#070509] select-none">
      
      {/* Sticky Pinned Viewport Container (Remains pinned at top during the entire circle expansion) */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#070509]">
        
        {/* Background Ghost Typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-20">
          <span className="text-[24vw] font-serif font-black tracking-tighter text-stroke-white whitespace-nowrap">
            CORLEONE
          </span>
        </div>

        {/* Dynamic Expanding Circular Iris Mask (Opens to 100% full bleed BEFORE unpinning) */}
        <div 
          className="absolute inset-0 z-10 overflow-hidden flex items-center justify-center pointer-events-none will-change-[clip-path]"
          style={{
            clipPath: isFullyOpen ? 'none' : `circle(${circleRadius}vmax at 50% 50%)`,
          }}
        >
          <Image
            src="/images/hero-cliffside.jpg"
            alt="Beach Bar Corleone Cliffside Panorama"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center will-change-transform"
            style={{
              transform: `scale(${imageScale})`,
            }}
          />
          {/* Layered cinematic lighting */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-black/60" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/70" />
        </div>

        {/* Overlay Content (Pinned with graceful fade & rise) */}
        <div 
          className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center pointer-events-auto will-change-transform pt-16"
          style={{
            opacity: contentOpacity,
            transform: `translateY(${contentTranslateY}px)`,
          }}
        >
          
          {/* Massive Screen Title */}
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-serif font-black tracking-tight text-white uppercase leading-[0.9] drop-shadow-2xl">
            <span className="block text-stone-100">SEA VIEWS.</span>
            <span className="block animate-liquid-gradient">
              COCKTAILS.
            </span>
            <span className="block text-stone-200">SUNSET VIBES.</span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-stone-200 font-sans font-light max-w-2xl leading-relaxed text-balance">
            {t.subtitle}
          </p>

          {/* Direct Action Hub: 3 Large Prominent Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 w-full max-w-3xl">
            {/* Button 1: Speise- & Getränkekarte */}
            <a
              href="#menu"
              className="flex-1 min-w-[220px] sm:min-w-[200px] flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm uppercase tracking-wider shadow-2xl transition-all hover:scale-105 cursor-pointer"
            >
              <Utensils className="w-5 h-5 text-stone-950" />
              <span>{t.btnMenu}</span>
            </a>

            {/* Button 2: Abendprogramm & Events */}
            <a
              href="#events"
              className="flex-1 min-w-[220px] sm:min-w-[200px] flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-stone-900/80 hover:bg-stone-800 text-white font-bold text-sm uppercase tracking-wider border border-amber-400/50 shadow-2xl hover:scale-105 transition-all cursor-pointer backdrop-blur-md"
            >
              <Music className="w-5 h-5 text-amber-400" />
              <span>{t.btnEvents}</span>
            </a>

            {/* Button 3: Route starten */}
            <a
              href={BAR_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[220px] sm:min-w-[200px] flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-stone-900/80 hover:bg-stone-800 text-white font-bold text-sm uppercase tracking-wider border border-white/20 shadow-xl hover:scale-105 transition-all cursor-pointer backdrop-blur-md"
            >
              <Compass className="w-5 h-5 text-amber-300" />
              <span>{t.btnRoute}</span>
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-12 flex items-center gap-2 text-xs font-mono text-stone-400 uppercase tracking-widest animate-bounce">
            <ArrowDown className="w-4 h-4 text-amber-400" />
            <span>SCROLL TO EXPAND THE VIEW</span>
          </div>
        </div>

      </div>

    </section>
  );
}
