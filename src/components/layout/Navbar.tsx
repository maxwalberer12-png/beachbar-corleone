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

export default function Navbar({ currentLang, onLanguageChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const t = DICTIONARY[currentLang].nav;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroDone(true);
    }, 1800);

    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 select-none ${
        isScrolled
          ? 'py-4 bg-[#080A0F]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex items-center justify-between">
        
        {/* Left Nav Links */}
        <nav
          className={`hidden md:flex items-center gap-10 flex-1 justify-start transition-opacity duration-700 ${
            introDone ? 'opacity-100' : 'opacity-0'
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

        {/* Center Brand Logo (Scheme Engine Style) */}
        <div className="flex-1 flex justify-center text-center">
          <Link
            href="/"
            className={`transition-all duration-700 flex flex-col items-center group ${
              introDone ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <span className="font-serif text-2xl sm:text-3xl font-black tracking-widest text-white group-hover:text-amber-400 transition-colors uppercase leading-none">
              CORLEONE
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-stone-400 font-mono font-semibold mt-0.5">
              BEACH BAR • CUKLIĆEVO
            </span>
          </Link>
        </div>

        {/* Right Nav Links & Language Switcher */}
        <div
          className={`hidden md:flex items-center gap-8 flex-1 justify-end transition-opacity duration-700 ${
            introDone ? 'opacity-100' : 'opacity-0'
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
          className={`flex items-center gap-3 md:hidden transition-opacity duration-700 ${
            introDone ? 'opacity-100' : 'opacity-0'
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
        <div className="md:hidden bg-[#080A0F]/95 backdrop-blur-2xl border-b border-stone-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
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
