'use client';

import React, { useState } from 'react';
import { Sparkles, Wine, Coffee, GlassWater, Utensils, Droplets, Check, Compass, ArrowRight, Flame } from 'lucide-react';
import { SIGNATURE_COCKTAILS, MENU_CATEGORIES, DICTIONARY, BAR_INFO } from '@/lib/data';
import { Language, SignatureCocktail } from '@/lib/types';

interface HybridMenuProps {
  lang: Language;
}

export default function HybridMenu({ lang }: HybridMenuProps) {
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('coffee');
  const [selectedTasteFilter, setSelectedTasteFilter] = useState<string>('all');
  const t = DICTIONARY[lang].menu;

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

  const filteredSignatures = SIGNATURE_COCKTAILS.filter((drink) => {
    if (selectedTasteFilter === 'refreshing') return drink.tasteProfile.refreshing >= 5;
    if (selectedTasteFilter === 'sour') return drink.tasteProfile.sour >= 3;
    if (selectedTasteFilter === 'bitter') return drink.tasteProfile.bitter >= 3;
    if (selectedTasteFilter === 'sweet') return drink.tasteProfile.sweet >= 3;
    return true;
  });

  const heroCocktail = filteredSignatures[0] || SIGNATURE_COCKTAILS[0];
  const auxiliaryCocktails = filteredSignatures.slice(1);
  const activeCategory = MENU_CATEGORIES.find((cat) => cat.id === activeCategoryTab) || MENU_CATEGORIES[0];

  return (
    <section id="menu" className="py-24 sm:py-36 bg-stone-950 text-stone-100 relative overflow-hidden">
      {/* Background Ambient Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetrical Left-Aligned Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 pb-8 border-b border-stone-800">
          <div className="max-w-2xl text-left space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-500/30 px-3 py-1 rounded-full inline-block">
              {t.eyebrow}
            </span>
            <h2 className="text-4xl sm:text-6xl font-serif font-black text-white tracking-tight leading-[0.95]">
              {t.title}
            </h2>
            <p className="text-base sm:text-lg text-stone-400 font-sans leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          {/* Flavor Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-stone-400 text-xs font-mono uppercase tracking-wider mr-1">{t.flavorProfile}:</span>
            {[
              { id: 'all', label: 'All Signatures' },
              { id: 'refreshing', label: t.refreshing },
              { id: 'sour', label: t.sour },
              { id: 'bitter', label: t.bitter },
              { id: 'sweet', label: t.sweet },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedTasteFilter(filter.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  selectedTasteFilter === filter.id
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-lg shadow-amber-500/20 scale-105'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* PART 1: ASYMMETRIC BENTO COCKTAIL SHOWCASE (7 COLS HERO + 5 COLS STACKED) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-20">
          
          {/* Main 7-Col Spotlight Cocktail */}
          {heroCocktail && (
            <div className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-900 border-2 border-amber-500/40 p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-mono uppercase font-bold tracking-widest text-amber-400 bg-amber-950 px-3 py-1 rounded-full border border-amber-500/30">
                    FEATURED SIGNATURE • {heroCocktail.category}
                  </span>
                  <span className="text-2xl sm:text-3xl font-serif font-black text-amber-400">
                    {heroCocktail.price}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white mt-6 group-hover:text-amber-300 transition-colors">
                  {heroCocktail.name}
                </h3>
                <p className="text-sm italic text-amber-300/90 mt-1 font-serif">
                  „{heroCocktail.tagline}“
                </p>

                <p className="text-base sm:text-lg text-stone-300 mt-4 leading-relaxed font-sans max-w-xl">
                  {heroCocktail.description[lang]}
                </p>

                {/* Ingredients Pills */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {heroCocktail.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-xl bg-stone-950/80 border border-stone-800 text-stone-200 font-medium"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 text-xs text-stone-400 font-mono">
                <span>ALC: {heroCocktail.alcoholContent}</span>
                <span className="text-amber-400 font-semibold">{heroCocktail.badge}</span>
              </div>
            </div>
          )}

          {/* 5-Col Stacked Auxiliary Cocktails */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            {auxiliaryCocktails.slice(0, 2).map((drink) => (
              <div
                key={drink.id}
                className="rounded-3xl bg-stone-900/80 border border-stone-800 p-6 sm:p-7 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-xl flex-1 group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-mono tracking-widest text-stone-400">
                      {drink.category}
                    </span>
                    <span className="text-lg font-serif font-bold text-amber-400">
                      {drink.price}
                    </span>
                  </div>

                  <h4 className="text-2xl font-serif font-bold text-white mt-2 group-hover:text-amber-300 transition-colors">
                    {drink.name}
                  </h4>
                  <p className="text-xs italic text-stone-400 mt-0.5">
                    „{drink.tagline}“
                  </p>
                  <p className="text-xs sm:text-sm text-stone-300 mt-3 leading-relaxed font-sans">
                    {drink.description[lang]}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 font-mono">
                  <span>{drink.alcoholContent}</span>
                  <span className="text-stone-300">{drink.ingredients.slice(0, 3).join(' • ')}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* PART 2: CATEGORIZED DRINK TRACKS */}
        <div className="pt-12 border-t border-stone-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
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
                      ? 'bg-amber-500 text-stone-950 shadow-lg shadow-amber-500/25 scale-105'
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-stone-900/50 p-6 sm:p-8 rounded-3xl border border-stone-800">
            {activeCategory.items.map((item, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl bg-stone-950/70 border border-stone-800/80 hover:border-amber-500/30 transition-colors flex flex-col justify-between"
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
