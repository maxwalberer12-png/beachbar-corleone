'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, ShieldCheck, Compass, ExternalLink, ArrowDownRight, Waves } from 'lucide-react';
import { BAR_INFO, DICTIONARY } from '@/lib/data';
import { Language } from '@/lib/types';

interface InteractiveWaypointProps {
  lang: Language;
}

export default function InteractiveWaypoint({ lang }: InteractiveWaypointProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const t = DICTIONARY[lang].location;

  return (
    <section id="location" className="relative py-32 bg-stone-950 text-white overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-500/10 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Asymmetrical Left-Aligned Header */}
        <div className="max-w-2xl text-left mb-16 space-y-3">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black text-white tracking-tight leading-[0.95]">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-stone-400 font-sans leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Asymmetrical Overlapping Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Navigation HUD Card (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="liquid-glass p-8 sm:p-10 rounded-3xl border border-white/15 shadow-2xl space-y-6">
              
              {/* Coordinates HUD */}
              <div className="p-4 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between text-xs font-mono text-amber-300">
                <span>45.1215° N, 14.5262° E</span>
                <span className="text-emerald-400 font-bold">● ACTIVE SPOT</span>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs uppercase font-mono tracking-widest text-stone-400">{t.addressLabel}</h3>
                  <p className="text-xl font-serif font-bold text-white mt-1">{BAR_INFO.name}</p>
                  <p className="text-sm text-stone-300">{BAR_INFO.address}</p>
                  <p className="text-sm text-stone-300">{BAR_INFO.city}, {BAR_INFO.country}</p>
                  <p className="text-xs font-mono text-amber-400 mt-2 font-bold">
                    Directly on the cliff above Plaža Cuklićevo
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs uppercase font-mono tracking-widest text-stone-400">{t.openHoursLabel}</h3>
                  <p className="text-lg font-bold text-white mt-0.5 font-mono">{BAR_INFO.regularHours}</p>
                  <p className="text-xs text-stone-400">{t.openHoursText}</p>
                </div>
              </div>

              {/* Phone & Direct Call */}
              <div className="flex items-start gap-4 pt-4 border-t border-white/10">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 border border-sky-500/30">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs uppercase font-mono tracking-widest text-stone-400">{t.phoneLabel}</h3>
                  <a
                    href={`tel:${BAR_INFO.phone}`}
                    className="text-base font-bold text-amber-400 hover:text-amber-300 transition-colors mt-0.5 block font-mono"
                  >
                    {BAR_INFO.phone}
                  </a>
                </div>
              </div>

            </div>

            {/* 1-Click Launch Button */}
            <a
              href={BAR_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 text-stone-950 font-black text-sm uppercase tracking-wider flex items-center justify-between transition-all shadow-xl hover:scale-[1.02] cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <Navigation className="w-5 h-5 text-stone-950" />
                <span>{t.openInMapsBtn}</span>
              </span>
              <ArrowDownRight className="w-5 h-5" />
            </a>
          </div>

          {/* Right: 2-Click Privacy Map Canvas (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="h-full min-h-[480px] rounded-3xl overflow-hidden liquid-glass border border-white/15 shadow-2xl relative flex flex-col items-center justify-center">
              {mapLoaded ? (
                <iframe
                  title="Beach Bar Corleone Location Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=14.515%2C45.115%2C14.535%2C45.128&layer=mapnik&marker=45.1215%2C14.5262"
                  className="w-full h-full min-h-[480px] border-0"
                  loading="lazy"
                />
              ) : (
                <div className="p-8 text-center max-w-md space-y-5">
                  <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-xl flex items-center justify-center mx-auto">
                    <Compass className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-bold text-white font-serif">
                    {BAR_INFO.name} @ Cuklićevo
                  </h3>

                  <p className="text-xs text-stone-300 leading-relaxed font-sans">
                    {t.consentNotice}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <button
                      onClick={() => setMapLoaded(true)}
                      className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
                    >
                      {t.loadMapBtn}
                    </button>
                    <a
                      href={BAR_INFO.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 rounded-2xl liquid-glass hover:bg-white/15 text-white font-semibold text-xs transition-colors shadow-sm inline-flex items-center justify-center gap-2 border border-white/20"
                    >
                      <span>Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xs text-emerald-400 pt-2 font-mono">
                    <ShieldCheck className="w-4 h-4" />
                    <span>2-Click DSGVO-Consent (Zero External Tracking)</span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
