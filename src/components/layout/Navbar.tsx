'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Compass, Menu, X } from 'lucide-react';
import { BAR_INFO, DICTIONARY } from '@/lib/data';
import { Language } from '@/lib/types';
import KineticNavLink from '@/components/ui/KineticNavLink';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

const LETTERS = ['C', 'O', 'R', 'L', 'E', 'O', 'N', 'E'];

export default function Navbar({ currentLang, onLanguageChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = DICTIONARY[currentLang].nav;

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-3.5 bg-stone-950/90 backdrop-blur-2xl border-b border-white/10 shadow-2xl'
          : 'py-6 bg-gradient-to-b from-black/80 via-black/30 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between relative min-h-[40px]">
        
        {/* Left Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-10 flex-1 justify-start">
          <KineticNavLink
            href="#experience"
            label={t.experience}
            activeColor="text-amber-400"
          />
          <KineticNavLink
            href="#menu"
            label={t.drinks}
            activeColor="text-amber-400"
          />
        </nav>

        {/* Center Brand Logo */}
        <div className="flex-1 flex justify-center text-center">
          <Link
            href="/"
            className="flex flex-col items-center group will-change-transform"
          >
            {/* Letter-by-Letter Assembly */}
            <div className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black tracking-[0.16em] sm:tracking-widest text-white group-hover:text-amber-400 transition-colors uppercase leading-none drop-shadow-2xl flex items-center justify-center whitespace-nowrap">
              {LETTERS.map((letter, idx) => (
                <span
                  key={idx}
                  className="inline-block animate-letter-build"
                  style={{
                    animationDelay: `${60 + idx * 60}ms`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </div>

            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] sm:tracking-[0.3em] font-mono font-semibold mt-1 transition-all duration-700 animate-subline-build whitespace-nowrap text-stone-400">
              BEACH BAR • CUKLIĆEVO
            </span>
          </Link>
        </div>

        {/* Right Nav Links & Language Switcher */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-end">
            <KineticNavLink
              href="#events"
              label={t.events}
              activeColor="text-amber-400"
            />
            <KineticNavLink
              href="#location"
              label={t.location}
              activeColor="text-amber-400"
            />

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

          {/* Mobile Menu Button & Language Switcher */}
          <div className="flex items-center gap-2 lg:hidden ml-auto">
            <div className="flex items-center rounded-full bg-black/40 p-0.5 border border-white/15 text-[10px] font-mono font-semibold text-stone-200">
              {(['en', 'hr', 'de'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onLanguageChange(lang)}
                  className={`px-1.5 py-0.5 rounded-full uppercase transition-all ${
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
              className="p-2 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#080A0F]/95 backdrop-blur-2xl border-b border-stone-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200 mt-4">
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
  );
}
