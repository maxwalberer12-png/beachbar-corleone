'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Globe } from 'lucide-react';
import { Language } from '@/lib/types';

const IMPRESSUM_CONTENT: Record<Language, {
  back: string;
  eyebrow: string;
  title: string;
  s1Title: string;
  s1OperatorLabel: string;
  s1OwnerLabel: string;
  s1OwnerValue: string;
  s1Address: string;
  s2Title: string;
  s2PhoneLabel: string;
  s2EmailLabel: string;
  s2WebLabel: string;
  s3Title: string;
  s3OibLabel: string;
  s3OibValue: string;
  s3RegLabel: string;
  s3RegValue: string;
  s4Title: string;
  s4Text: string;
  s5Title: string;
  s5Text: string;
  stand: string;
  privacyLink: string;
}> = {
  de: {
    back: "Zurück zur Startseite",
    eyebrow: "Rechtliche Hinweise / Legal Notice",
    title: "Impressum (§ 5 DDG / Gesetzliche Anbieterkennzeichnung)",
    s1Title: "1. Angaben gemäß § 5 DDG",
    s1OperatorLabel: "Betreiber des gastronomischen Betriebs / Website:",
    s1OwnerLabel: "Inhaber / Vertretungsberechtigte Person:",
    s1OwnerValue: "[Name des Betreibers / Geschäftsführer eintragen]",
    s1Address: "Plaža Cuklićevo / Cuklićevo bb, 51511 Malinska, Otok Krk, Kroatien",
    s2Title: "2. Kontakt",
    s2PhoneLabel: "Telefon:",
    s2EmailLabel: "E-Mail:",
    s2WebLabel: "Website:",
    s3Title: "3. Register- und Steuernummer (Kroatien)",
    s3OibLabel: "OIB (Kroatische Steuer-Identifikationsnummer):",
    s3OibValue: "[HR-OIB Nummer]",
    s3RegLabel: "Gewerberegister / Obrtni registar:",
    s3RegValue: "[Zuständiges Gewerbeamt Krk/Rijeka]",
    s4Title: "4. Verbraucherstreitbeilegung",
    s4Text: "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    s5Title: "5. Haftung für Inhalte & Links",
    s5Text: "Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir übernehmen keine Gewähr für die Richtigkeit oder Aktualität von tagesaktuellen Drittangaben.",
    stand: "Stand: 2026 • Beach Bar Corleone",
    privacyLink: "Zur Datenschutzerklärung →",
  },
  hr: {
    back: "Natrag na početnu",
    eyebrow: "Pravne informacije",
    title: "Impresum (Pravne informacije o pružatelju usluga)",
    s1Title: "1. Podaci o pružatelju usluga",
    s1OperatorLabel: "Nositelj ugostiteljske djelatnosti / Web stranica:",
    s1OwnerLabel: "Vlasnik / Odgovorna osoba:",
    s1OwnerValue: "[Ime vlasnika / voditelja]",
    s1Address: "Plaža Cuklićevo / Cuklićevo bb, 51511 Malinska, Otok Krk, Hrvatska",
    s2Title: "2. Kontakt",
    s2PhoneLabel: "Telefon:",
    s2EmailLabel: "E-pošta:",
    s2WebLabel: "Web stranica:",
    s3Title: "3. Porezni broj i registar (Hrvatska)",
    s3OibLabel: "OIB (Osobni identifikacijski broj):",
    s3OibValue: "[HR-OIB broj]",
    s3RegLabel: "Obrtni registar:",
    s3RegValue: "[Nadležni ured Krk/Rijeka]",
    s4Title: "4. Rješavanje potrošačkih sporova",
    s4Text: "Europska komisija pruža platformu za internetsko rješavanje sporova (ORS): https://ec.europa.eu/consumers/odr/. Nismo obvezni niti spremni sudjelovati u postupcima rješavanja sporova pred arbitražnim tijelom.",
    s5Title: "5. Odgovornost za sadržaj i poveznice",
    s5Text: "Kao pružatelj usluga odgovorni smo za vlastite sadržaje na ovim stranicama u skladu sa zakonima. Ne preuzimamo odgovornost za točnost i ažurnost podataka trećih strana.",
    stand: "Ažurirano: 2026. • Beach Bar Corleone",
    privacyLink: "Pravila privatnosti →",
  },
  en: {
    back: "Back to Home",
    eyebrow: "Legal Information",
    title: "Legal Notice / Impressum",
    s1Title: "1. Information according to legal requirements",
    s1OperatorLabel: "Operator of the establishment / website:",
    s1OwnerLabel: "Owner / Authorized Representative:",
    s1OwnerValue: "[Owner / Manager Name]",
    s1Address: "Plaža Cuklićevo / Cuklićevo bb, 51511 Malinska, Island of Krk, Croatia",
    s2Title: "2. Contact",
    s2PhoneLabel: "Phone:",
    s2EmailLabel: "Email:",
    s2WebLabel: "Website:",
    s3Title: "3. Tax and Business Registry (Croatia)",
    s3OibLabel: "OIB (Croatian Tax ID):",
    s3OibValue: "[HR-OIB Number]",
    s3RegLabel: "Business Registry:",
    s3RegValue: "[Responsible office Krk/Rijeka]",
    s4Title: "4. Consumer Dispute Resolution",
    s4Text: "The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr/. We are not obliged or willing to participate in dispute resolution proceedings before a consumer arbitration board.",
    s5Title: "5. Liability for Content and Links",
    s5Text: "As a service provider, we are responsible for our own content on these pages under general laws. We assume no liability for the accuracy and completeness of third-party data.",
    stand: "Status: 2026 • Beach Bar Corleone",
    privacyLink: "To Privacy Policy →",
  },
};

export default function ImpressumPage() {
  const [lang, setLang] = useState<Language>('de');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('corleone_lang') as Language | null;
      if (saved && (saved === 'en' || saved === 'hr' || saved === 'de')) {
        setLang(saved);
      }
    } catch {}
  }, []);

  const handleLangSelect = (newLang: Language) => {
    setLang(newLang);
    try {
      localStorage.setItem('corleone_lang', newLang);
    } catch {}
  };

  const t = IMPRESSUM_CONTENT[lang];

  return (
    <main className="min-h-screen bg-[#070509] text-stone-200 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8 bg-[#0D121A]/90 p-6 sm:p-12 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-xl">
        
        {/* Top Header Row: Back Link + Language Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.back}</span>
          </Link>

          {/* Glass Language Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-stone-900/90 border border-white/10 backdrop-blur-md">
            <Globe className="w-3.5 h-3.5 text-stone-400 ml-2 mr-1" />
            {(['de', 'hr', 'en'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => handleLangSelect(l)}
                className={`px-2.5 py-1 text-xs font-mono font-bold uppercase rounded-full transition-all duration-200 cursor-pointer ${
                  lang === l
                    ? 'bg-amber-400 text-stone-950 shadow-md'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs uppercase font-mono font-bold tracking-widest text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full inline-block">
            {t.eyebrow}
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white mt-3 leading-tight">
            {t.title}
          </h1>
        </div>

        <section className="space-y-3 text-sm text-stone-300 leading-relaxed font-sans">
          <h2 className="text-lg font-bold text-white font-serif">{t.s1Title}</h2>
          <div className="p-4 rounded-2xl bg-stone-950/60 border border-white/5 space-y-1.5">
            <p className="text-xs text-stone-400 font-mono">{t.s1OperatorLabel}</p>
            <p className="font-bold text-white text-base">Beach Bar Corleone</p>
            <p className="text-stone-300">{t.s1Address}</p>
            <p className="text-xs text-stone-400 pt-2">{t.s1OwnerLabel} <span className="text-stone-300">{t.s1OwnerValue}</span></p>
          </div>
        </section>

        <section className="space-y-3 text-sm text-stone-300 leading-relaxed font-sans border-t border-white/10 pt-6">
          <h2 className="text-lg font-bold text-white font-serif">{t.s2Title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-white/5">
              <span className="text-xs text-stone-400 block font-mono">{t.s2PhoneLabel}</span>
              <a href="tel:+38598398745" className="text-amber-400 font-semibold hover:underline text-sm">+385 98 398 745</a>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-white/5">
              <span className="text-xs text-stone-400 block font-mono">{t.s2EmailLabel}</span>
              <a href="mailto:corleone.malinska@gmail.com" className="text-amber-400 font-semibold hover:underline text-xs truncate block">corleone.malinska@gmail.com</a>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-950/60 border border-white/5">
              <span className="text-xs text-stone-400 block font-mono">{t.s2WebLabel}</span>
              <span className="text-stone-200 text-xs">beachbar-corleone.vercel.app</span>
            </div>
          </div>
        </section>

        <section className="space-y-3 text-sm text-stone-300 leading-relaxed font-sans border-t border-white/10 pt-6">
          <h2 className="text-lg font-bold text-white font-serif">{t.s3Title}</h2>
          <div className="p-4 rounded-2xl bg-stone-950/60 border border-white/5 space-y-2">
            <p><strong>{t.s3OibLabel}</strong> <span className="text-stone-300">{t.s3OibValue}</span></p>
            <p><strong>{t.s3RegLabel}</strong> <span className="text-stone-300">{t.s3RegValue}</span></p>
          </div>
        </section>

        <section className="space-y-3 text-sm text-stone-300 leading-relaxed font-sans border-t border-white/10 pt-6">
          <h2 className="text-lg font-bold text-white font-serif">{t.s4Title}</h2>
          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
            {t.s4Text}
          </p>
        </section>

        <section className="space-y-3 text-sm text-stone-300 leading-relaxed font-sans border-t border-white/10 pt-6">
          <h2 className="text-lg font-bold text-white font-serif">{t.s5Title}</h2>
          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
            {t.s5Text}
          </p>
        </section>

        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
          <span>{t.stand}</span>
          <Link href="/datenschutz" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
            {t.privacyLink}
          </Link>
        </div>
      </div>
    </main>
  );
}
