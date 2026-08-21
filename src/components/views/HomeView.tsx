'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import FloatingCallButton from '@/components/layout/FloatingCallButton';
import Footer from '@/components/layout/Footer';
import HeroIris from '@/components/scrollytelling/HeroIris';
import StoryDescent from '@/components/features/StoryDescent';
import DayNightCurtain from '@/components/scrollytelling/DayNightCurtain';
import LiquidCocktailScroller from '@/components/menu/LiquidCocktailScroller';
import SunsetNightStage from '@/components/events/SunsetNightStage';
import InteractiveWaypoint from '@/components/location/InteractiveWaypoint';
import ConsentModal from '@/components/ui/ConsentModal';
import { Language } from '@/lib/types';

export default function HomeView() {
  const [lang, setLangState] = useState<Language>('de');

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('corleone_lang') as Language | null;
      if (saved && (saved === 'en' || saved === 'hr' || saved === 'de')) {
        setLangState(saved);
      } else if (typeof navigator !== 'undefined') {
        const browserLang = navigator.language.slice(0, 2);
        if (browserLang === 'de' || browserLang === 'hr') {
          setLangState(browserLang as Language);
        }
      }
    } catch {}
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('corleone_lang', newLang);
    } catch {}
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#0A0D12] text-white selection:bg-amber-400 selection:text-stone-950 overflow-x-clip max-w-full">
      <Navbar currentLang={lang} onLanguageChange={handleLanguageChange} />

      <main className="flex-1 overflow-x-clip max-w-full">
        <HeroIris lang={lang} />
        <StoryDescent lang={lang} />
        <DayNightCurtain lang={lang} />
        <LiquidCocktailScroller lang={lang} />
        <SunsetNightStage lang={lang} />
        <InteractiveWaypoint lang={lang} />
      </main>

      <Footer lang={lang} />
      <FloatingCallButton lang={lang} />
      <ConsentModal lang={lang} />
    </div>
  );
}
