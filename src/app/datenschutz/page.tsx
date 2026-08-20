import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock } from 'lucide-react';
import { BAR_INFO } from '@/lib/data';

export const metadata = {
  title: 'Datenschutzerklärung | Beach Bar Corleone, Malinska',
  description: 'Datenschutzerklärung nach der DSGVO für die Website der Beach Bar Corleone in Malinska, Krk.',
};

export default function DatenschutzPage() {
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% DSGVO-Konformität</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            Datenschutzerklärung (DSGVO / GDPR)
          </h1>
        </div>

        <section className="space-y-4 text-sm text-stone-300 leading-relaxed font-sans">
          <h2 className="text-lg font-bold text-white font-serif">1. Datenschutz auf einen Blick</h2>
          <p>
            Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. Diese Website wird nach dem Prinzip der Datensparsamkeit betrieben. Wir binden keine externen Webfonts über Google-Server ein (alle Schriften werden lokal von unserem Server ausgeliefert) und setzen keine invasiven Tracking- oder Profiling-Skripte ein.
          </p>
        </section>

        <section className="space-y-4 text-sm text-stone-300 leading-relaxed font-sans border-t border-stone-800/80 pt-6">
          <h2 className="text-lg font-bold text-white font-serif">2. Verantwortliche Stelle</h2>
          <p>
            Beach Bar Corleone<br />
            Plaža Cuklićevo, 51511 Malinska, Otok Krk, Kroatien<br />
            Telefon: +385 98 398 745<br />
            E-Mail: corleone.malinska@gmail.com
          </p>
        </section>

        <section className="space-y-4 text-sm text-stone-300 leading-relaxed font-sans border-t border-stone-800/80 pt-6">
          <h2 className="text-lg font-bold text-white font-serif">3. Datenerfassung auf dieser Website</h2>
          <h3 className="font-semibold text-white">Server-Log-Dateien</h3>
          <p>
            Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die dein Browser automatisch an uns übermittelt (Browsertyp, Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage, anonymisierte IP-Adresse). Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
          </p>

          <h3 className="font-semibold text-white mt-4">Kontaktaufnahme per E-Mail oder Telefon</h3>
          <p>
            Wenn du uns per E-Mail oder Telefon kontaktierst, wird deine Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung deines Anliegens bei uns gespeichert und verarbeitet (Art. 6 Abs. 1 lit. b DSGVO).
          </p>

          <h3 className="font-semibold text-white mt-4">2-Klick-Lösung für Kartendienste (OpenStreetMap)</h3>
          <p>
            Um deinen Datenschutz zu gewährleisten, ist die interaktive Karte auf unserer Website standardmäßig deaktiviert. Erst wenn du aktiv auf „Interaktive Karte laden“ klickst (2-Klick-Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO), wird eine Verbindung zu den Servern des Kartendienstanbieters hergestellt.
          </p>
        </section>

        <section className="space-y-4 text-sm text-stone-300 leading-relaxed font-sans border-t border-stone-800/80 pt-6">
          <h2 className="text-lg font-bold text-white font-serif">4. Deine Rechte als betroffene Person</h2>
          <p>
            Du hast im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über deine gespeicherten personenbezogenen Daten (Art. 15 DSGVO), deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung (Art. 16 DSGVO), Sperrung oder Löschung dieser Daten (Art. 17 DSGVO). Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten kannst du dich jederzeit unter der oben angegebenen Adresse an uns wenden.
          </p>
        </section>

        <div className="pt-6 border-t border-stone-800 flex items-center justify-between text-xs text-stone-500">
          <span>Stand: August 2026</span>
          <Link href="/impressum" className="text-amber-400 hover:underline">
            Zum Impressum →
          </Link>
        </div>
      </div>
    </main>
  );
}
