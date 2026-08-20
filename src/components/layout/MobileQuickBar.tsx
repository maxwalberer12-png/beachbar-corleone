'use client';

import React from 'react';
import { Navigation, Phone, Wine, Radio } from 'lucide-react';
import { BAR_INFO, DICTIONARY } from '@/lib/data';
import { Language } from '@/lib/types';

interface MobileQuickBarProps {
  lang: Language;
}

export default function MobileQuickBar({ lang }: MobileQuickBarProps) {
  const t = DICTIONARY[lang].mobileBar;

  return (
    <aside
      aria-label="Quick Actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-950/95 backdrop-blur-2xl border-t border-stone-800/80 px-3 py-2 shadow-2xl"
    >
      <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto">
        {/* 1-Tap Route Button */}
        <a
          href={BAR_INFO.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-amber-500 text-stone-950 font-bold active:scale-95 transition-transform"
        >
          <Navigation className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] uppercase tracking-wider">{t.route}</span>
        </a>

        {/* 1-Tap Call Button */}
        <a
          href={`tel:${BAR_INFO.phone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-stone-900 text-stone-100 hover:bg-stone-800 active:scale-95 transition-all border border-stone-800"
        >
          <Phone className="w-5 h-5 mb-0.5 text-amber-400" />
          <span className="text-[11px] font-medium tracking-wider">{t.call}</span>
        </a>

        {/* 1-Tap Menu Scroll */}
        <a
          href="#menu"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-stone-900 text-stone-100 hover:bg-stone-800 active:scale-95 transition-all border border-stone-800"
        >
          <Wine className="w-5 h-5 mb-0.5 text-rose-400" />
          <span className="text-[11px] font-medium tracking-wider">{t.menu}</span>
        </a>

        {/* 1-Tap Live Radar Scroll */}
        <a
          href="#live-radar"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-stone-900 text-stone-100 hover:bg-stone-800 active:scale-95 transition-all border border-stone-800"
        >
          <div className="relative mb-0.5">
            <Radio className="w-5 h-5 text-emerald-400" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="text-[11px] font-medium tracking-wider">{t.status}</span>
        </a>
      </div>
    </aside>
  );
}
