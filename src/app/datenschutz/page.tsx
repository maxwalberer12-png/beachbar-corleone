'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Globe, Lock } from 'lucide-react';
import { Language } from '@/lib/types';

const DATENSCHUTZ_CONTENT: Record<Language, {
  back: string;
  badge: string;
  title: string;
  s1Title: string;
  s1Text: string;
  s2Title: string;
  s2Address: string;
  s3Title: string;
  s3Sub1: string;
  s3Text1: string;
  s3Sub2: string;
  s3Text2: string;
  s3Sub3: string;
  s3Text3: string;
  s4Title: string;
  s4Text: string;
  stand: string;
  impressumLink: string;
}> = {
  de: {
    back: "Zurück zur Startseite",
    badge: "100% DSGVO-Konformität",
    title: "Datenschutzerklärung (DSGVO)",
    s1Title: "1. Datenschutz auf einen Blick",
    s1Text: "Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. Diese Website wird nach dem Prinzip der Datensparsamkeit betrieben. Wir binden keine externen Webfonts über Google-Server ein (alle Schriften werden lokal von unserem Server ausgeliefert) und setzen keine invasiven Tracking- oder Profiling-Skripte ein.",
    s2Title: "2. Verantwortliche Stelle",
    s2Address: "Beach Bar Corleone\nPlaža Cuklićevo, 51511 Malinska, Otok Krk, Kroatien\nTelefon: +385 98 398 745\nE-Mail: corleone.malinska@gmail.com",
    s3Title: "3. Datenerfassung auf dieser Website",
    s3Sub1: "Server-Log-Dateien",
    s3Text1: "Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die dein Browser automatisch an uns übermittelt (Browsertyp, Betriebssystem, Referrer URL, anonymisierte IP-Adresse). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.",
    s3Sub2: "Kontaktaufnahme per E-Mail oder Telefon",
    s3Text2: "Wenn du uns per E-Mail oder Telefon kontaktierst, wird deine Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten zum Zwecke der Bearbeitung deines Anliegens verarbeitet (Art. 6 Abs. 1 lit. b DSGVO).",
    s3Sub3: "2-Klick-Lösung für Kartendienste (OpenStreetMap)",
    s3Text3: "Um deinen Datenschutz zu gewährleisten, ist die interaktive Karte auf unserer Website standardmäßig deaktiviert. Erst wenn du aktiv auf „Interaktive Karte laden“ klickst (2-Klick-Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO), wird eine Verbindung zu den Servern des Kartendienstanbieters hergestellt.",
    s4Title: "4. Deine Rechte als betroffene Person",
    s4Text: "Du hast im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über deine gespeicherten personenbezogenen Daten (Art. 15 DSGVO) sowie ein Recht auf Berichtigung (Art. 16 DSGVO), Sperrung oder Löschung dieser Daten (Art. 17 DSGVO).",
    stand: "Stand: 2026 • Beach Bar Corleone",
    impressumLink: "Zum Impressum →",
  },
  hr: {
    back: "Natrag na početnu",
    badge: "100% GDPR sukladnost",
    title: "Pravila privatnosti (GDPR)",
    s1Title: "1. Zaštita podataka ukratko",
    s1Text: "Zaštitu vaših osobnih podataka shvaćamo vrlo ozbiljno. Ova web stranica posluje po načelu minimalne obrade podataka. Ne učitavamo vanjske fontove s Google poslužitelja (svi fontovi se poslužuju lokalno s našeg poslužitelja) i ne koristimo invazivne alate za praćenje.",
    s2Title: "2. Voditelj obrade podataka",
    s2Address: "Beach Bar Corleone\nPlaža Cuklićevo, 51511 Malinska, Otok Krk, Hrvatska\nTelefon: +385 98 398 745\nE-pošta: corleone.malinska@gmail.com",
    s3Title: "3. Prikupljanje podataka na ovoj stranici",
    s3Sub1: "Poslužiteljski zapisi (Server Logs)",
    s3Text1: "Pružatelj hostinga automatski prikuplja i pohranjuje tehničke podatke u poslužiteljskim zapisima koje vaš preglednik šalje (vrsta preglednika, operativni sustav, anonimizirana IP adresa). Pravna osnova je čl. 6. st. 1. t. f GDPR.",
    s3Sub2: "Kontakt putem e-pošte ili telefona",
    s3Text2: "Kada nas kontaktirate putem e-pošte ili telefona, vaši se podaci obrađuju isključivo u svrhu odgovora na vaš upit (čl. 6. st. 1. t. b GDPR).",
    s3Sub3: "Rješenje s 2 klika za karte (OpenStreetMap)",
    s3Text3: "Radi zaštite vaše privatnosti, interaktivna karta je prema zadanim postavkama isključena. Tek kada kliknete 'Učitaj interaktivnu kartu' uspostavlja se veza s poslužiteljem pružatelja karata.",
    s4Title: "4. Vaša prava kao ispitanika",
    s4Text: "U svakom trenutku imate pravo na besplatan pristup svojim podacima (čl. 15. GDPR), pravo na ispravak (čl. 16. GDPR) te pravo na brisanje svojih osobnih podataka (čl. 17. GDPR).",
    stand: "Ažurirano: 2026. • Beach Bar Corleone",
    impressumLink: "Impresum →",
  },
  en: {
    back: "Back to Home",
    badge: "100% GDPR Compliant",
    title: "Privacy Policy (GDPR)",
    s1Title: "1. Privacy at a Glance",
    s1Text: "We take the protection of your personal data very seriously. This website operates on the principle of data minimization. We do not load external web fonts via Google servers (all fonts are served locally from our server) and we do not use invasive tracking or profiling scripts.",
    s2Title: "2. Controller / Responsible Entity",
    s2Address: "Beach Bar Corleone\nPlaža Cuklićevo, 51511 Malinska, Island of Krk, Croatia\nPhone: +385 98 398 745\nEmail: corleone.malinska@gmail.com",
    s3Title: "3. Data Collection on this Website",
    s3Sub1: "Server Log Files",
    s3Text1: "The hosting provider automatically collects and stores technical information in server log files that your browser transmits (browser type, operating system, anonymized IP address). The legal basis is Art. 6 (1) (f) GDPR.",
    s3Sub2: "Contact via Email or Phone",
    s3Text2: "When contacting us via email or phone, your details and request are processed solely for the purpose of handling your inquiry (Art. 6 (1) (b) GDPR).",
    s3Sub3: "2-Click Solution for Map Services",
    s3Text3: "To ensure your privacy, the interactive map is deactivated by default. Only when you actively click 'Load Interactive Map' is a connection to map servers established.",
    s4Title: "4. Your Rights as a Data Subject",
    s4Text: "Under applicable regulations, you have the right to access your stored personal data at any time (Art. 15 GDPR), as well as the right to rectification (Art. 16 GDPR) or erasure of such data (Art. 17 GDPR).",
    stand: "Status: 2026 • Beach Bar Corleone",
    impressumLink: "To Legal Notice →",
  },
};

export default function DatenschutzPage() {
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

  const t = DATENSCHUTZ_CONTENT[lang];

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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white leading-tight">
            {t.title}
          </h1>
        </div>

        <section className="space-y-3 text-sm text-stone-300 leading-relaxed font-sans">
          <h2 className="text-lg font-bold text-white font-serif">{t.s1Title}</h2>
          <p className="text-stone-300 leading-relaxed text-xs sm:text-sm">
            {t.s1Text}
          </p>
        </section>

        <section className="space-y-3 text-sm text-stone-300 leading-relaxed font-sans border-t border-white/10 pt-6">
          <h2 className="text-lg font-bold text-white font-serif">{t.s2Title}</h2>
          <div className="p-4 rounded-2xl bg-stone-950/60 border border-white/5 whitespace-pre-line text-xs sm:text-sm text-stone-300 font-sans">
            {t.s2Address}
          </div>
        </section>

        <section className="space-y-4 text-sm text-stone-300 leading-relaxed font-sans border-t border-white/10 pt-6">
          <h2 className="text-lg font-bold text-white font-serif">{t.s3Title}</h2>
          
          <div className="space-y-2">
            <h3 className="font-semibold text-white text-sm">{t.s3Sub1}</h3>
            <p className="text-stone-400 text-xs sm:text-sm">{t.s3Text1}</p>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="font-semibold text-white text-sm">{t.s3Sub2}</h3>
            <p className="text-stone-400 text-xs sm:text-sm">{t.s3Text2}</p>
          </div>

          <div className="space-y-2 pt-2">
            <h3 className="font-semibold text-white text-sm">{t.s3Sub3}</h3>
            <p className="text-stone-400 text-xs sm:text-sm">{t.s3Text3}</p>
          </div>
        </section>

        <section className="space-y-3 text-sm text-stone-300 leading-relaxed font-sans border-t border-white/10 pt-6">
          <h2 className="text-lg font-bold text-white font-serif">{t.s4Title}</h2>
          <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
            {t.s4Text}
          </p>
        </section>

        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
          <span>{t.stand}</span>
          <Link href="/impressum" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
            {t.impressumLink}
          </Link>
        </div>
      </div>
    </main>
  );
}
