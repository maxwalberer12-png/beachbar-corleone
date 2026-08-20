'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import MobileQuickBar from '@/components/layout/MobileQuickBar';
import Footer from '@/components/layout/Footer';
import SchemeHero from '@/components/hero/SchemeHero';
import StoryDescent from '@/components/features/StoryDescent';
import DayNightCurtain from '@/components/scrollytelling/DayNightCurtain';
import LiquidCocktailScroller from '@/components/menu/LiquidCocktailScroller';
import SunsetNightStage from '@/components/events/SunsetNightStage';
import InteractiveWaypoint from '@/components/location/InteractiveWaypoint';
import ConsentModal from '@/components/ui/ConsentModal';
import { Language } from '@/lib/types';

export default function HomePage() {
  const [lang, setLang] = useState<Language>('en');

  return (
    <div className="relative flex min-h-screen flex-col bg-[#070509] text-white selection:bg-amber-400 selection:text-stone-950">
      {/* Top Scheme Engine Style Centered Glass Navbar */}
      <Navbar currentLang={lang} onLanguageChange={setLang} />

      {/* Main Experience */}
      <main className="flex-1">
        {/* 1. Scheme Engine Centered Brand Monolith & Action Hub */}
        <SchemeHero lang={lang} />

        {/* 2. The Cliff Experience & Ambient Soundwave Bar */}
        <StoryDescent lang={lang} />

        {/* 3. Interactive Day/Night Split Curtain Slider */}
        <DayNightCurtain lang={lang} />

        {/* 4. Liquid Alchemy (Interactive Cocktail Spotlight & Category Drawer) */}
        <LiquidCocktailScroller lang={lang} />

        {/* 5. Nightfall Rhythm & Vinyl Stage Pass */}
        <SunsetNightStage lang={lang} />

        {/* 6. The Waypoint (Live Radar HUD & 2-Click Map) */}
        <InteractiveWaypoint lang={lang} />
      </main>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Mobile Sticky Quick Action Bar */}
      <MobileQuickBar lang={lang} />

      {/* 100% DSGVO Consent Modal */}
      <ConsentModal lang={lang} />
    </div>
  );
}
