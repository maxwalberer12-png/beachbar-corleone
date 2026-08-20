'use client';

import React, { useState, useEffect } from 'react';
import { Phone } from 'lucide-react';
import { BAR_INFO, DICTIONARY } from '@/lib/data';
import { Language } from '@/lib/types';

interface FloatingCallButtonProps {
  lang: Language;
}

export default function FloatingCallButton({ lang }: FloatingCallButtonProps) {
  const [isNearFooter, setIsNearFooter] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const t = DICTIONARY[lang].mobileBar;

  useEffect(() => {
    const handleScroll = () => {
      // 1. Reveal button after user has started scrolling
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // 2. Check if user is approaching the footer
      const footer = document.getElementById('site-footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        // If the top of footer is within 80px from viewport bottom
        if (footerRect.top <= window.innerHeight - 20) {
          setIsNearFooter(true);
        } else {
          setIsNearFooter(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`md:hidden fixed z-40 transition-all duration-500 ease-out pointer-events-auto ${
        isVisible && !isNearFooter
          ? 'bottom-6 right-5 opacity-100 translate-y-0 scale-100'
          : 'bottom-6 right-5 opacity-0 translate-y-8 scale-90 pointer-events-none'
      }`}
    >
      <a
        href={`tel:${BAR_INFO.phone}`}
        className="flex items-center gap-3 px-5 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 text-stone-950 font-black text-xs uppercase tracking-wider shadow-2xl shadow-amber-500/50 active:scale-95 transition-all border border-white/30 backdrop-blur-md"
        aria-label="Call Beach Bar Corleone"
      >
        {/* Pulsing Green/Black Live Dot */}
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stone-950 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-stone-950"></span>
        </span>
        
        <Phone className="w-4 h-4 fill-stone-950 text-stone-950" />
        <span className="font-extrabold tracking-widest">{t.call}</span>
      </a>
    </div>
  );
}
