'use client';

import React, { useState } from 'react';
import { Sparkles, Wine, Coffee, GlassWater, Utensils, Droplets, Check, Compass, ChevronRight, ChevronLeft, Flame } from 'lucide-react';
import { SIGNATURE_COCKTAILS, MENU_CATEGORIES, DICTIONARY, BAR_INFO } from '@/lib/data';
import { Language, SignatureCocktail } from '@/lib/types';
import CurvedDivider from '@/components/ui/CurvedDivider';

interface LiquidCocktailScrollerProps {
  lang: Language;
}

export default function LiquidCocktailScroller({ lang }: LiquidCocktailScrollerProps) {
  const [selectedCocktailIndex, setSelectedCocktailIndex] = useState(0);
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('coffee');
  const t = DICTIONARY[lang].menu;

  const currentCocktail = SIGNATURE_COCKTAILS[selectedCocktailIndex];
  const activeCategory = MENU_CATEGORIES.find((cat) => cat.id === activeCategoryTab) || MENU_CATEGORIES[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-4 h-4" />;
      case 'Wine':
        return <Wine className="w-4 h-4" />;
      case 'GlassWater':
        return <GlassWater className="w-4 h-4" />;
      case 'Utensils':
        return <Utensils className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section id="menu" className="relative -mt-16 sm:-mt-24 z-20 pb-32 bg-stone-950 text-white select-none">
      {/* Continuous Halbrunde Kuppel / Majestic Arched Dome Divider */}
      <CurvedDivider fillColor="#0c0a09" className="-translate-y-[98%]" />
      {/* Background Liquid Aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[180px] pointer-events-none transition-colors duration-1000 opacity-20"
        style={{ backgroundColor: currentCocktail.color }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetrical Left-Aligned Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-white/10">
          <div className="max-w-2xl text-left space-y-3">
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black text-white tracking-tight leading-[0.95]">
              {t.title}
            </h2>
            <p className="text-base sm:text-lg text-stone-400 font-sans leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Navigation Arrows for Cocktail Showcase */}
          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setSelectedCocktailIndex((prev) =>
                  prev === 0 ? SIGNATURE_COCKTAILS.length - 1 : prev - 1
                )
              }
              className="w-12 h-12 rounded-full liquid-glass border border-white/20 hover:border-amber-400 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105"
              aria-label="Previous cocktail"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-xs font-mono text-stone-400 tracking-widest">
              0{selectedCocktailIndex + 1} / 0{SIGNATURE_COCKTAILS.length}
            </span>
            <button
              onClick={() =>
                setSelectedCocktailIndex((prev) =>
                  prev === SIGNATURE_COCKTAILS.length - 1 ? 0 : prev + 1
                )
              }
              className="w-12 h-12 rounded-full liquid-glass border border-white/20 hover:border-amber-400 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105"
              aria-label="Next cocktail"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* INTERACTIVE SPOTLIGHT SHOWCASE (Massive Centerpiece) */}
        <div className="relative rounded-3xl liquid-glass border-2 border-white/20 p-8 sm:p-14 shadow-2xl overflow-hidden mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Drink Story & Ingredients (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <h3 className="text-4xl sm:text-6xl font-serif font-black text-white leading-tight">
                  {currentCocktail.name}
                </h3>
                <p className="text-base sm:text-lg italic text-amber-300/90 mt-1 font-serif">
                  „{currentCocktail.tagline}“
                </p>
              </div>

              <p className="text-base sm:text-lg text-stone-300 font-sans leading-relaxed max-w-xl">
                {currentCocktail.description[lang]}
              </p>

              {/* Alchemy Ingredients Tags */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-mono uppercase tracking-widest text-stone-400 block">
                  CRAFTED WITH:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentCocktail.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3.5 py-1.5 rounded-xl bg-black/60 border border-white/15 text-stone-200 font-mono font-medium shadow-inner"
                    >
                      ✦ {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Flavor Profile Equalizer */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-4 gap-3 text-center text-xs font-mono uppercase text-stone-400">
                <div>
                  <div className="flex gap-1 justify-center mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full ${
                          i <= currentCocktail.tasteProfile.sweet ? 'bg-amber-400' : 'bg-stone-800'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="mt-2 block">{t.sweet}</span>
                </div>

                <div>
                  <div className="flex gap-1 justify-center mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full ${
                          i <= currentCocktail.tasteProfile.sour ? 'bg-amber-400' : 'bg-stone-800'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="mt-2 block">{t.sour}</span>
                </div>

                <div>
                  <div className="flex gap-1 justify-center mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full ${
                          i <= currentCocktail.tasteProfile.bitter ? 'bg-amber-400' : 'bg-stone-800'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="mt-2 block">{t.bitter}</span>
                </div>

                <div>
                  <div className="flex gap-1 justify-center mt-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`h-2 flex-1 rounded-full ${
                          i <= currentCocktail.tasteProfile.refreshing ? 'bg-emerald-400' : 'bg-stone-800'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="mt-2 block">{t.refreshing}</span>
                </div>
              </div>
            </div>

            {/* Right: Glass Visual & Fast Selector Tabs (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-8">
              <div className="p-8 rounded-3xl bg-black/40 border border-white/10 w-full text-center space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-stone-400">
                  ALCOHOL BY VOLUME: {currentCocktail.alcoholContent}
                </span>
                <p className="text-5xl sm:text-6xl font-serif font-black text-amber-400">
                  {currentCocktail.price}
                </p>
                <p className="text-xs text-stone-400 font-mono">
                  Prepared fresh at the cliffside bar with crystal clear ice
                </p>
              </div>

              {/* Cocktail Selector Pills */}
              <div className="grid grid-cols-2 gap-2 w-full">
                {SIGNATURE_COCKTAILS.map((cocktail, idx) => (
                  <button
                    key={cocktail.id}
                    onClick={() => setSelectedCocktailIndex(idx)}
                    className={`p-3.5 rounded-2xl text-left text-xs font-mono font-bold transition-all cursor-pointer border ${
                      selectedCocktailIndex === idx
                        ? 'bg-white text-stone-950 border-white shadow-xl scale-[1.02]'
                        : 'bg-stone-900/80 text-stone-300 border-stone-800 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{cocktail.name.split(' ')[0]}</span>
                      <span>{cocktail.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* FULL CATEGORY DRAWER (Coffee, Wines, Mocktails, Bites) */}
        <div className="pt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white">
              {t.allCategories}
            </h3>

            {/* Category Selector Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {MENU_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryTab(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer ${
                    activeCategoryTab === cat.id
                      ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/25 scale-105 font-bold'
                      : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                  }`}
                >
                  {getIcon(cat.iconName)}
                  <span>{cat.title[lang]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Category Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-stone-900/60 p-6 sm:p-10 rounded-3xl border border-stone-800 backdrop-blur-xl">
            {activeCategory.items.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-stone-950/80 border border-stone-800 hover:border-amber-500/40 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-semibold text-white text-base font-sans">
                      {item.name[lang]}
                    </h4>
                    <span className="font-bold text-amber-400 font-serif whitespace-nowrap text-sm">
                      {item.price}
                    </span>
                  </div>
                  {item.description && (
                    <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                      {item.description[lang]}
                    </p>
                  )}
                </div>
                {item.isPopular && (
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/20">
                      <Check className="w-3 h-3 text-amber-400" />
                      <span>{t.popularBadge}</span>
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-stone-500 text-left mt-4 font-mono">
            * {BAR_INFO.seasonNotice[lang]} • All prices in Euro (€) incl. VAT.
          </p>
        </div>

      </div>
    </section>
  );
}
