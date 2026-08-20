'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Navigation, ShieldCheck, Compass, ExternalLink, ArrowDownRight } from 'lucide-react';
import { BAR_INFO, DICTIONARY } from '@/lib/data';
import { Language } from '@/lib/types';

interface LocationSectionProps {
  lang: Language;
}

export default function LocationSection({ lang }: LocationSectionProps) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const t = DICTIONARY[lang].location;

  return (
    <section id="location" className="py-24 sm:py-36 relative bg-[#F7F5EE] text-stone-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Asymmetrical Left-Aligned Section Header */}
        <div className="max-w-2xl text-left mb-16 space-y-3">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-800 bg-amber-200/60 px-3 py-1 rounded-full inline-block">
            {t.eyebrow}
          </span>
          <h2 className="text-4xl sm:text-6xl font-serif font-black text-stone-950 tracking-tight leading-[0.95]">
            {t.title}
          </h2>
          <p className="text-base sm:text-lg text-stone-600 font-sans leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Asymmetrical Grid with Overlapping Map Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Contact & Access Details (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="bg-white p-7 sm:p-9 rounded-3xl border border-stone-200/80 shadow-xl space-y-6">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-stone-500">{t.addressLabel}</h3>
                  <p className="text-lg font-bold text-stone-900 mt-0.5">{BAR_INFO.name}</p>
                  <p className="text-sm text-stone-600">{BAR_INFO.address}</p>
                  <p className="text-sm text-stone-600">{BAR_INFO.city}, {BAR_INFO.country}</p>
                  <p className="text-xs font-bold text-amber-700 mt-1.5 uppercase font-mono tracking-wider">
                    Directly above Plaža Cuklićevo
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4 pt-5 border-t border-stone-100">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-700 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-stone-500">{t.openHoursLabel}</h3>
                  <p className="text-lg font-bold text-stone-900 mt-0.5">{BAR_INFO.regularHours}</p>
                  <p className="text-xs text-stone-500">{t.openHoursText}</p>
                </div>
              </div>

              {/* Direct Phone */}
              <div className="flex items-start gap-4 pt-5 border-t border-stone-100">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-700 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-stone-500">{t.phoneLabel}</h3>
                  <a
                    href={`tel:${BAR_INFO.phone}`}
                    className="text-base font-bold text-amber-700 hover:text-amber-800 transition-colors mt-0.5 block font-mono"
                  >
                    {BAR_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Direct Email */}
              <div className="flex items-start gap-4 pt-5 border-t border-stone-100">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-700 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xs uppercase font-mono font-bold tracking-wider text-stone-500">{t.emailLabel}</h3>
                  <a
                    href={`mailto:${BAR_INFO.email}`}
                    className="text-sm font-semibold text-stone-700 hover:text-amber-700 transition-colors mt-0.5 block font-mono"
                  >
                    {BAR_INFO.email}
                  </a>
                </div>
              </div>

            </div>

            {/* 1-Click Route Button */}
            <a
              href={BAR_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-2xl bg-stone-950 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-between transition-all shadow-xl hover:shadow-amber-600/20 group"
            >
              <span className="flex items-center gap-2.5">
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>{t.openInMapsBtn}</span>
              </span>
              <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Right Column: 2-Click Privacy Map Canvas (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="h-full min-h-[460px] rounded-3xl overflow-hidden bg-stone-200 border border-stone-300 shadow-xl relative flex flex-col items-center justify-center">
              {mapLoaded ? (
                <iframe
                  title="Beach Bar Corleone Location Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=14.515%2C45.115%2C14.535%2C45.128&layer=mapnik&marker=45.1215%2C14.5262"
                  className="w-full h-full min-h-[460px] border-0"
                  loading="lazy"
                />
              ) : (
                <div className="p-8 text-center max-w-md space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-white/90 text-amber-600 shadow-md flex items-center justify-center mx-auto">
                    <Compass className="w-8 h-8" />
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 font-serif">
                    {BAR_INFO.name} @ Cuklićevo
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {t.consentNotice}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2.5 justify-center pt-2">
                    <button
                      onClick={() => setMapLoaded(true)}
                      className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider transition-colors shadow cursor-pointer"
                    >
                      {t.loadMapBtn}
                    </button>
                    <a
                      href={BAR_INFO.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 rounded-xl bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 font-semibold text-xs transition-colors shadow-sm inline-flex items-center justify-center gap-1.5"
                    >
                      <span>Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-2 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>2-Click Privacy Consent</span>
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
