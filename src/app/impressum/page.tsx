import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { BAR_INFO } from '@/lib/data';

export const metadata = {
  title: 'Impressum / Legal Notice | Beach Bar Corleone, Malinska',
  description: 'Impressum und rechtliche Angaben gemäß § 5 DDG für die Beach Bar Corleone in Malinska, Krk.',
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-stone-900 text-stone-200 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8 bg-stone-950/80 p-8 sm:p-12 rounded-3xl border border-stone-800 shadow-2xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zur Startseite / Back to Home</span>
        </Link>

        <div className="border-b border-stone-800 pb-6">
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
            Rechtliche Hinweise / Legal Notice
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2">
            Impressum (§ 5 DDG / Gesetzliche Anbieterkennzeichnung)
          </h1>
        </div>

        <section className="space-y-4 text-sm text-stone-300 leading-relaxed font-sans">
          <h2 className="text-lg font-bold text-white font-serif">1. Angaben gemäß § 5 DDG</h2>
          <p>
            <strong>Betreiber des gastronomischen Betriebs / Website:</strong><br />
            Beach Bar Corleone<br />
            Inhaber / Vertretungsberechtigte Person: [Name des Betreibers / Geschäftsführer eintragen]<br />
            Plaža Cuklićevo / Cuklićevo bb<br />
            51511 Malinska, Otok Krk<br />
            Kroatien / Hrvatska
          </p>
        </section>

        <section className="space-y-4 text-sm text-stone-300 leading-relaxed font-sans border-t border-stone-800/80 pt-6">
          <h2 className="text-lg font-bold text-white font-serif">2. Kontakt</h2>
          <p>
            <strong>Telefon:</strong> +385 98 398 745<br />
            <strong>E-Mail:</strong> corleone.malinska@gmail.com<br />
            <strong>Website:</strong> www.beachbar-corleone.com (oder offizielle Domain)
          </p>
        </section>

        <section className="space-y-4 text-sm text-stone-300 leading-relaxed font-sans border-t border-stone-800/80 pt-6">
          <h2 className="text-lg font-bold text-white font-serif">3. Register- und Steuernummer (Kroatien)</h2>
          <p>
            <strong>OIB (Kroatische Steuer-Identifikationsnummer):</strong> [HR-OIB Nummer]<br />
            <strong>Gewerberegister / Obrtni registar:</strong> [Registernummer / Zuständiges Gewerbeamt Krk/Rijeka]
          </p>
        </section>

        <section className="space-y-4 text-sm text-stone-300 leading-relaxed font-sans border-t border-stone-800/80 pt-6">
          <h2 className="text-lg font-bold text-white font-serif">4. Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
            <a 
              href="https://ec.europa.eu/consumers/odr/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline ml-1"
            >
              https://ec.europa.eu/consumers/odr/
            </a>.
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </section>

        <section className="space-y-4 text-sm text-stone-300 leading-relaxed font-sans border-t border-stone-800/80 pt-6">
          <h2 className="text-lg font-bold text-white font-serif">5. Haftung für Inhalte und Links</h2>
          <p>
            Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir übernehmen jedoch keine Gewähr für die Richtigkeit, Vollständigkeit und Aktualität von tagesaktuellen Drittangaben (z. B. externe Wetterdaten oder verlinkte Profile).
          </p>
        </section>

        <div className="pt-6 border-t border-stone-800 flex items-center justify-between text-xs text-stone-500">
          <span>Stand: 2026 • Beach Bar Corleone</span>
          <Link href="/datenschutz" className="text-amber-400 hover:underline">
            Zur Datenschutzerklärung →
          </Link>
        </div>
      </div>
    </main>
  );
}
