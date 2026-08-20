'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Heart, MapPin, Phone, Mail } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from '@/components/ui/Icons';
import { BAR_INFO, DICTIONARY } from '@/lib/data';
import { Language } from '@/lib/types';

interface FooterProps {
  lang: Language;
}

export default function Footer({ lang }: FooterProps) {
  const t = DICTIONARY[lang].footer;
  const nav = DICTIONARY[lang].nav;

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-28 md:pb-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand & Vision */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-bold tracking-widest text-white uppercase">
                CORLEONE
              </span>
              <span className="block text-[10px] uppercase tracking-[0.25em] text-amber-400 font-sans font-semibold">
                Beach Bar • Cuklićevo
              </span>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed">
              {t.tagline}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={BAR_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Beach Bar Corleone"
                className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-stone-300 flex items-center justify-center transition-colors border border-stone-800"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={BAR_INFO.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Beach Bar Corleone"
                className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-stone-300 flex items-center justify-center transition-colors border border-stone-800"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              {t.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <a href="#experience" className="hover:text-amber-400 transition-colors">
                  {nav.experience}
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors">
                  {nav.drinks}
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-amber-400 transition-colors">
                  {nav.events}
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition-colors">
                  {nav.location}
                </a>
              </li>
            </ul>
          </div>

          {/* Direct Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Contact & Location
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{BAR_INFO.locationName}, {BAR_INFO.address}, {BAR_INFO.city}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${BAR_INFO.phone}`} className="hover:text-amber-400 transition-colors">
                  {BAR_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${BAR_INFO.email}`} className="hover:text-amber-400 transition-colors">
                  {BAR_INFO.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal / Compliance (§ 5 DDG & DSGVO) */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              {t.legal}
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <Link href="/impressum" className="hover:text-amber-400 transition-colors">
                  {t.impressum}
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="hover:text-amber-400 transition-colors">
                  {t.privacy}
                </Link>
              </li>
            </ul>
            <div className="mt-4 p-3 rounded-xl bg-stone-900 border border-stone-800 text-[11px] text-stone-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t.deCompliance}</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {BAR_INFO.name}. {t.rights}</p>
          <div className="flex items-center gap-4">
            <Link href="/impressum" className="hover:text-stone-400 transition-colors">Impressum</Link>
            <span>•</span>
            <Link href="/datenschutz" className="hover:text-stone-400 transition-colors">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
