'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X } from 'lucide-react';
import { Language } from '@/lib/types';
import KineticButton from '@/components/ui/KineticButton';

interface ConsentModalProps {
  lang: Language;
}

export default function ConsentModal({ lang }: ConsentModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('corleone_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsOpen(true), 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('corleone_consent', 'all');
    setIsOpen(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('corleone_consent', 'essential');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const content = {
    en: {
      title: "Privacy & Cookie Settings",
      text: "We value your privacy. We only use essential cookies to ensure this website works properly and optional maps embeds with your consent. No tracking or profiling cookies are used.",
      essentialBtn: "Essential Only",
      acceptBtn: "Accept & Continue",
      privacyLink: "Privacy Policy",
    },
    hr: {
      title: "Privatnost i kolačići",
      text: "Cijenimo vašu privatnost. Koristimo samo nužne kolačiće za ispravan rad web stranice i opcionalne karte uz vaš pristanak. Ne koristimo kolačiće za praćenje.",
      essentialBtn: "Samo nužni",
      acceptBtn: "Prihvati sve",
      privacyLink: "Pravila privatnosti",
    },
    de: {
      title: "Privatsphäre & Datenschutz",
      text: "Wir respektieren deine Privatsphäre. Wir setzen ausschließlich technisch notwendige Cookies ein sowie optionale Kartendienste nur nach deiner ausdrücklichen Einwilligung. Keine Tracking-Cookies.",
      essentialBtn: "Nur essenzielle",
      acceptBtn: "Einverstanden",
      privacyLink: "Datenschutzerklärung",
    },
  }[lang];

  return (
    <div 
      role="dialog" 
      aria-label={content.title}
      className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="glass-panel p-5 rounded-2xl border border-stone-200/80 shadow-2xl bg-white/95 backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-stone-900 text-sm tracking-tight flex items-center gap-1.5">
              <span>{content.title}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">DSGVO</span>
            </h3>
            <p className="text-xs text-stone-600 mt-1 leading-relaxed">
              {content.text}
            </p>
          </div>
          <button 
            onClick={handleEssentialOnly}
            className="text-stone-400 hover:text-stone-700 p-1 -mr-1 -mt-1 rounded-lg cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 pt-2 border-t border-stone-100">
          <KineticButton
            onClick={handleEssentialOnly}
            label={content.essentialBtn}
            className="flex-1 px-3 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl"
          />
          <KineticButton
            onClick={handleAcceptAll}
            label={content.acceptBtn}
            className="flex-1 px-3 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-amber-600 rounded-xl shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
