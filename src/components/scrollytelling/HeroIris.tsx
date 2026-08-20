'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Compass, ArrowDown, Utensils, Music } from 'lucide-react';
import { BAR_INFO, DICTIONARY } from '@/lib/data';
import { Language } from '@/lib/types';
import KineticButton from '@/components/ui/KineticButton';

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
      const windowHeight = window.innerHeight;
      const totalScrollableDistance = rect.height - windowHeight;

      if (totalScrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const calculatedProgress = Math.min(
        Math.max(currentScroll / totalScrollableDistance, 0),
        1
      );
      setProgress(calculatedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Circle radius: Starts at 28vmax, reaches 120vmax at progress = 0.75 (100% full bleed), unpins at 1.0
  const isFullyOpen = progress >= 0.75;
  const circleRadius = isFullyOpen ? 150 : 28 + (progress / 0.75) * 105;
  const contentOpacity = Math.max(0, 1 - progress * 2.0);
  const contentTranslateY = progress * -80;
  const imageScale = 1.05 + progress * 0.12;

  return (
    <section ref={containerRef} className="relative h-[240vh] w-full bg-[#070509] select-none">
      
      {/* Sticky Pinned Viewport Container (Remains pinned at top during the entire circle expansion) */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#070509]">
        
        {/* Background Ghost Typography */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-20 overflow-hidden">
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

        {/* Overlay Content (Pinned with graceful fade & rise, responsive mobile padding) */}
        <div 
          className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center pointer-events-auto will-change-transform pt-20 sm:pt-16"
          style={{
            opacity: contentOpacity,
            transform: `translateY(${contentTranslateY}px)`,
          }}
        >
          
          {/* Massive Screen Title (Mobile optimized text scaling, fully centered) */}
          <h1 className="w-full text-center text-4xl sm:text-7xl md:text-9xl font-serif font-black tracking-tight text-white uppercase leading-[0.92] drop-shadow-2xl">
            <span className="block text-stone-100 text-center w-full">SEA VIEWS.</span>
            <span className="block animate-liquid-gradient text-center w-full">
              COCKTAILS.
            </span>
            <span className="block text-stone-200 text-center w-full">SUNSET VIBES.</span>
          </h1>

          <p className="mt-4 sm:mt-6 text-sm sm:text-xl text-stone-200 font-sans font-light max-w-2xl mx-auto text-center leading-relaxed text-balance px-2">
            {t.subtitle}
          </p>

          {/* Direct Action Hub: 3 Large Prominent Buttons with Kinetic Hover Animation */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm sm:max-w-3xl px-2">
            {/* Button 1: Speise- & Getränkekarte */}
            <KineticButton
              href="#menu"
              label={t.btnMenu}
              icon={<Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-stone-950" />}
              className="w-full sm:flex-1 min-h-[48px] px-5 py-3.5 sm:py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl active:scale-95 sm:hover:scale-105"
            />

            {/* Button 2: Abendprogramm & Events */}
            <KineticButton
              href="#events"
              label={t.btnEvents}
              icon={<Music className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />}
              hoverColor="text-amber-300"
              className="w-full sm:flex-1 min-h-[48px] px-5 py-3.5 sm:py-4 rounded-2xl bg-stone-900/85 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-amber-400/50 shadow-2xl active:scale-95 sm:hover:scale-105 backdrop-blur-md"
            />

            {/* Button 3: Route starten */}
            <KineticButton
              href={BAR_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              label={t.btnRoute}
              icon={<Compass className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />}
              hoverColor="text-amber-300"
              className="w-full sm:flex-1 min-h-[48px] px-5 py-3.5 sm:py-4 rounded-2xl bg-stone-900/85 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/20 shadow-xl active:scale-95 sm:hover:scale-105 backdrop-blur-md"
            />
          </div>

          {/* Scroll Indicator */}
          <div className="mt-8 sm:mt-12 flex items-center gap-2 text-[11px] sm:text-xs font-mono text-stone-400 uppercase tracking-widest animate-bounce">
            <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            <span>SCROLL TO EXPAND THE VIEW</span>
          </div>
        </div>

      </div>

    </section>
  );
}
