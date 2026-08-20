'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navigation, Menu, X, Compass, Clock, MapPin, Sparkles, GlassWater } from 'lucide-react';
import { BAR_INFO, DICTIONARY } from '@/lib/data';
import { Language } from '@/lib/types';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function Navbar({ currentLang, onLanguageChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = DICTIONARY[currentLang].nav;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#experience', label: t.experience },
    { href: '#menu', label: t.drinks },
    { href: '#events', label: t.events },
    { href: '#location', label: t.location },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-stone-900/90 backdrop-blur-md border-b border-stone-800/60 shadow-xl'
          : 'py-5 bg-gradient-to-b from-black/60 via-black/30 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="group flex flex-col items-start focus:outline-none"
        >
          <span className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-white group-hover:text-amber-400 transition-colors uppercase">
            CORLEONE
          </span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-stone-300 font-sans font-medium -mt-0.5">
            Beach Bar • Cuklićevo
          </span>
        </Link>

        {/* Live Status Badge (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-medium backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
          <span>{t.openStatus}: <strong className="text-white font-semibold">{BAR_INFO.regularHours}</strong></span>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone-200 hover:text-amber-400 transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Controls & Language Selector */}
        <div className="hidden md:flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center rounded-full bg-white/10 p-1 border border-white/15 backdrop-blur-md text-xs font-semibold text-stone-200">
            {(['en', 'hr', 'de'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => onLanguageChange(lang)}
                className={`px-2.5 py-1 rounded-full uppercase transition-all cursor-pointer ${
                  currentLang === lang
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-sm'
                    : 'hover:text-white text-stone-300'
                }`}
                aria-label={`Switch to ${lang.toUpperCase()}`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Direct Route CTA */}
          <a
            href={BAR_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider transition-all transform hover:scale-105 shadow-lg shadow-amber-900/30"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>{t.directions}</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Mobile Lang switcher */}
          <div className="flex items-center rounded-full bg-black/40 p-0.5 border border-white/15 text-[11px] font-semibold text-stone-200">
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
        <div className="md:hidden bg-stone-950/95 backdrop-blur-2xl border-b border-stone-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-dot" />
            <span>{t.openStatus}: <strong className="text-white">{BAR_INFO.regularHours}</strong></span>
          </div>

          <nav className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-stone-200 hover:text-amber-400 py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
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
            <a
              href={`tel:${BAR_INFO.phone}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-stone-800 text-white font-medium text-sm hover:bg-stone-700 transition-colors"
            >
              <span>{BAR_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
