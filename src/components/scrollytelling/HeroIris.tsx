'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Compass, ArrowDown, Utensils, Music } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BAR_INFO, DICTIONARY } from '@/lib/data';
import { Language } from '@/lib/types';
import KineticButton from '@/components/ui/KineticButton';

interface HeroIrisProps {
  lang: Language;
  scrollProgress?: number;
}

export default function HeroIris({ lang }: HeroIrisProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ghostTextRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const t = DICTIONARY[lang].hero;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: '(max-width: 767px)',
        isDesktop: '(min-width: 768px)',
      },
      (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean; isDesktop: boolean };
        const initialRadius = isMobile ? '24vmax' : '28vmax';

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          maskRef.current,
          {
            clipPath: `circle(${initialRadius} at 50% 50%)`,
            WebkitClipPath: `circle(${initialRadius} at 50% 50%)`,
          },
          {
            clipPath: 'circle(140vmax at 50% 50%)',
            WebkitClipPath: 'circle(140vmax at 50% 50%)',
            ease: 'power2.inOut',
            duration: 0.8,
          },
          0
        );

        if (ringRef.current) {
          tl.fromTo(
            ringRef.current,
            {
              scale: 1,
              opacity: 0.95,
              transformOrigin: '50% 50%',
            },
            {
              scale: isMobile ? 5.83 : 5.0,
              opacity: 0,
              transformOrigin: '50% 50%',
              ease: 'power2.inOut',
              duration: 0.8,
            },
            0
          );
        }

        if (imageRef.current) {
          tl.fromTo(
            imageRef.current,
            { scale: 1.18 },
            { scale: 1.0, ease: 'power1.out', duration: 1.0 },
            0
          );
        }

        if (contentRef.current) {
          tl.to(
            contentRef.current,
            { autoAlpha: 0, y: -25, ease: 'power1.out', duration: 0.35 },
            0
          );
        }

        if (scrollIndicatorRef.current) {
          tl.to(
            scrollIndicatorRef.current,
            { opacity: 0, y: 20, ease: 'power1.out', duration: 0.25 },
            0
          );
        }

        if (ghostTextRef.current) {
          tl.to(
            ghostTextRef.current,
            { scale: 1.2, opacity: 0.05, ease: 'power1.inOut', duration: 1.0 },
            0
          );
        }
      },
      containerRef
    );

    return () => mm.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative h-[230vh] w-full bg-[#070509] select-none"
    >
      {/* Sticky Pinned Viewport Container */}
      <div 
        ref={stickyRef}
        className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#070509] gpu-layer"
      >
        {/* Background Typography (Desktop only) */}
        <div 
          ref={ghostTextRef}
          className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none z-0 opacity-15 overflow-hidden will-change-transform"
        >
          <span className="text-[24vw] font-serif font-black tracking-tighter text-stroke-white whitespace-nowrap select-none">
            CORLEONE
          </span>
        </div>

        {/* Expanding Circular Iris Mask */}
        <div 
          ref={maskRef}
          className="absolute inset-0 z-10 overflow-hidden flex items-center justify-center pointer-events-none will-change-[clip-path] gpu-layer"
          style={{
            clipPath: 'circle(28vmax at 50% 50%)',
            WebkitClipPath: 'circle(28vmax at 50% 50%)',
          }}
        >
          <div 
            ref={imageRef} 
            className="absolute inset-0 w-full h-full will-change-transform gpu-layer"
          >
            <Image
              src="/images/hero-cliffside.jpg"
              alt="Beach Bar Corleone Cliffside Panorama"
              fill
              priority
              quality={65}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
              className="object-cover object-center"
            />
            {/* High-Contrast Atmospheric Overlay for Crisp Text Legibility */}
            <div className="absolute inset-0 bg-stone-950/35" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-black/70" />
            <div className="absolute inset-0 bg-radial-at-c from-black/20 via-black/40 to-black/80" />
          </div>
        </div>

        {/* Ambient Ring Border */}
        <div
          ref={ringRef}
          className="absolute inset-0 m-auto z-15 pointer-events-none rounded-full w-[48vmax] h-[48vmax] md:w-[56vmax] md:h-[56vmax] border-2 border-amber-400/70 shadow-[0_0_60px_rgba(245,158,11,0.5),inset_0_0_40px_rgba(245,158,11,0.25)] will-change-transform gpu-layer"
        />

        {/* Hero Content */}
        <div 
          ref={contentRef}
          className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center justify-center pointer-events-auto will-change-transform pt-16 sm:pt-16 gpu-layer"
        >
          <h1 className={`w-full text-center font-serif font-black tracking-tight text-white uppercase leading-[0.98] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] ${
            lang === 'hr'
              ? 'text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
              : 'text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'
          }`}>
            <span className="block text-white text-center w-full whitespace-pre-line animate-cascade-1">{t.titleStart}</span>
            <span className="block text-amber-400 sm:animate-liquid-gradient text-center w-full whitespace-pre-line drop-shadow-md animate-cascade-2">
              {t.titleAccent}
            </span>
            <span className="block text-stone-100 text-center w-full whitespace-pre-line animate-cascade-3">{t.titleEnd}</span>
          </h1>

          <p className="mt-3 sm:mt-5 text-xs sm:text-base md:text-lg text-stone-200 font-sans font-medium max-w-xl mx-auto text-center leading-relaxed text-balance px-2 drop-shadow-md animate-cascade-sub">
            {t.subtitle}
          </p>

          <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-sm sm:max-w-3xl px-2 animate-cascade-buttons">
            <KineticButton
              href="#menu"
              label={t.btnMenu}
              icon={<Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-stone-950" />}
              className="w-full min-h-[48px] px-5 py-3.5 sm:py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl active:scale-95 sm:hover:scale-105"
            />

            <KineticButton
              href="#events"
              label={t.btnEvents}
              icon={<Music className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />}
              hoverColor="text-amber-300"
              className="w-full min-h-[48px] px-5 py-3.5 sm:py-4 rounded-2xl bg-stone-900/90 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-amber-400/50 shadow-2xl active:scale-95 sm:hover:scale-105 backdrop-blur-md"
            />

            <KineticButton
              href={BAR_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              label={t.btnRoute}
              icon={<Compass className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />}
              hoverColor="text-amber-300"
              className="w-full min-h-[48px] px-5 py-3.5 sm:py-4 rounded-2xl bg-stone-900/90 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/20 shadow-xl active:scale-95 sm:hover:scale-105 backdrop-blur-md"
            />
          </div>

          <div 
            ref={scrollIndicatorRef}
            className="mt-8 sm:mt-12 flex items-center gap-2 text-[11px] sm:text-xs font-mono text-stone-400 uppercase tracking-widest animate-bounce animate-cascade-buttons"
          >
            <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            <span>{t.scrollHint}</span>
          </div>
        </div>

      </div>
    </section>
  );
}

