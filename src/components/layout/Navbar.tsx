'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, Menu, X } from 'lucide-react';
import { BAR_INFO, DICTIONARY } from '@/lib/data';
import { Language } from '@/lib/types';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const LETTERS = ['C', 'O', 'R', 'L', 'E', 'O', 'N', 'E'];

export default function Navbar({ currentLang, onLanguageChange }: NavbarProps) {
  const [introStep, setIntroStep] = useState<'building' | 'assembled' | 'flying' | 'done'>('building');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = DICTIONARY[currentLang].nav;

  useEffect(() => {
    // 1. Letters assemble during first 1.0s -> assembled
    const assembledTimer = setTimeout(() => {
      setIntroStep('assembled');
    }, 1100);

    // 2. Hold in center until 2.2s -> trigger flight to top navbar
    const flyTimer = setTimeout(() => {
      setIntroStep('flying');
    }, 2200);

    // 3. Arrive in navbar after 3.4s -> intro complete
    const doneTimer = setTimeout(() => {
      setIntroStep('done');
    }, 3400);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(assembledTimer);
      clearTimeout(flyTimer);
      clearTimeout(doneTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isIntro = introStep !== 'done';
  const isAtTop = introStep === 'flying' || introStep === 'done';

  return (
    <>
      {/* 1. Fullscreen Dark Backdrop Curtain (Fades out when logo starts flying) */}
      {introStep !== 'done' && (
        <div
          className={`fixed inset-0 z-40 bg-[#070509] pointer-events-none transition-opacity duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
            isAtTop ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {/* Ambient Sunset/Purple Glow & Film Grain */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(231,111,81,0.25)_0%,rgba(43,16,9,0.3)_45%,rgba(7,5,9,0.95)_75%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_0)] [background-size:24px_24px] opacity-40" />
        </div>
      )}

      {/* 2. Top Scheme Engine Symmetrical Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 select-none transition-colors duration-500 ${
          isScrolled && !isIntro
            ? 'py-4 bg-[#080A0F]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between relative">
          
          {/* Left Nav Links (Fade in once logo arrives at top) */}
          <nav
            className={`hidden md:flex items-center gap-10 flex-1 justify-start transition-all duration-700 delay-300 ${
              isAtTop ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4 pointer-events-none'
            }`}
          >
            <a
              href="#experience"
              className="text-xs font-mono font-bold tracking-[0.2em] text-stone-300 hover:text-white uppercase transition-colors"
            >
              {t.experience}
            </a>
            <a
              href="#menu"
              className="text-xs font-mono font-bold tracking-[0.2em] text-stone-300 hover:text-amber-400 uppercase transition-colors"
            >
              {t.drinks}
            </a>
          </nav>

          {/* Center Travelling Brand Logo: Assembles letter-by-letter in center, then glides to top navbar */}
          <div className="flex-1 flex justify-center text-center">
            <Link
              href="/"
              className="flex flex-col items-center group will-change-transform"
              style={{
                transform: isAtTop
                  ? 'translateY(0) scale(1)'
                  : 'translateY(calc(50vh - 2rem)) scale(1.65)',
                transition: 'transform 1.1s cubic-bezier(0.76, 0, 0.24, 1)',
                transformOrigin: 'top center',
              }}
            >
              {/* Kinetic Letter-by-Letter Assembly */}
              <div className="font-serif text-3xl sm:text-4xl font-black tracking-widest text-white group-hover:text-amber-400 transition-colors uppercase leading-none drop-shadow-2xl flex items-center justify-center">
                {LETTERS.map((letter, idx) => (
                  <span
                    key={idx}
                    className="inline-block transition-all duration-500 ease-out"
                    style={{
                      transitionDelay: isIntro ? `${idx * 90}ms` : '0ms',
                      opacity: 1,
                      transform: 'translateY(0)',
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </div>

              {/* Subline that fades in after letters build */}
              <span
                className={`text-[9px] uppercase tracking-[0.3em] font-mono font-semibold mt-1 transition-all duration-700 ${
                  isAtTop
                    ? 'text-stone-400'
                    : 'text-stone-300 tracking-[0.4em] scale-110'
                }`}
                style={{
                  transitionDelay: '800ms',
                }}
              >
                BEACH BAR • CUKLIĆEVO
              </span>
            </Link>
          </div>

          {/* Right Nav Links & Language Switcher (Fade in once logo arrives at top) */}
          <div
            className={`hidden md:flex items-center gap-8 flex-1 justify-end transition-all duration-700 delay-300 ${
              isAtTop ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
            }`}
          >
            <a
              href="#events"
              className="text-xs font-mono font-bold tracking-[0.2em] text-stone-300 hover:text-white uppercase transition-colors"
            >
              {t.events}
            </a>
            <a
              href="#location"
              className="text-xs font-mono font-bold tracking-[0.2em] text-stone-300 hover:text-white uppercase transition-colors"
            >
              {t.location}
            </a>

            {/* Language Switcher */}
            <div className="flex items-center rounded-full bg-white/10 p-1 border border-white/15 backdrop-blur-md text-[11px] font-mono font-bold text-stone-200 ml-2">
              {(['en', 'hr', 'de'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-2.5 py-0.5 rounded-full uppercase transition-all cursor-pointer ${
                    currentLang === lang
                      ? 'bg-amber-500 text-stone-950 font-black shadow-sm'
                      : 'hover:text-white text-stone-400'
                  }`}
                  aria-label={`Switch to ${lang.toUpperCase()}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div
            className={`flex items-center gap-3 md:hidden transition-all duration-700 delay-300 ${
              isAtTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="flex items-center rounded-full bg-black/40 p-0.5 border border-white/15 text-[11px] font-mono font-semibold text-stone-200">
              {(['en', 'hr', 'de'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-2 py-0.5 rounded-full uppercase transition-all ${
                    currentLang === lang
                      ? 'bg-amber-500 text-stone-950 font-bold'
                      : 'text-stone-300'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#080A0F]/95 backdrop-blur-2xl border-b border-stone-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200 mt-4">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
              <span>{t.openStatus}: <strong className="text-white">{BAR_INFO.regularHours}</strong></span>
            </div>

            <nav className="flex flex-col space-y-3 pt-2">
              <a
                href="#experience"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-stone-200 hover:text-amber-400 py-1 transition-colors"
              >
                {t.experience}
              </a>
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-stone-200 hover:text-amber-400 py-1 transition-colors"
              >
                {t.drinks}
              </a>
              <a
                href="#events"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-stone-200 hover:text-amber-400 py-1 transition-colors"
              >
                {t.events}
              </a>
              <a
                href="#location"
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-stone-200 hover:text-amber-400 py-1 transition-colors"
              >
                {t.location}
              </a>
            </nav>

            <div className="pt-4 border-t border-stone-800 flex flex-col gap-3">
              <a
                href={BAR_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-amber-500 text-stone-950 font-bold text-sm uppercase tracking-wider shadow-lg"
              >
                <Compass className="w-4 h-4" />
                <span>{t.directions} (Google Maps)</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
