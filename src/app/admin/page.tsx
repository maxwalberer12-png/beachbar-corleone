'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Lock,
  Unlock,
  KeyRound,
  LogOut,
  ArrowLeft,
  Sparkles,
  Plus,
  Trash2,
  Edit3,
  Check,
  X,
  Download,
  Upload,
  RotateCcw,
  GlassWater,
  UtensilsCrossed,
  Save,
  Eye,
  DollarSign,
  AlertCircle,
  CheckCircle2,
  Search,
} from 'lucide-react';
import {
  useMenuData,
  verifyAdminPin,
  isAdminAuthenticated,
  logoutAdmin,
  setAdminPin,
  getAdminPin,
  exportMenuAsJSON,
  importMenuFromJSON,
} from '@/lib/menuStore';
import { SignatureCocktail, MenuCategory, MenuItem, Language } from '@/lib/types';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'cocktails' | 'menu' | 'quick_prices' | 'settings'>('cocktails');
  const [selectedLang, setSelectedLang] = useState<Language>('de');

  // New/Edit Cocktail state
  const [editingCocktail, setEditingCocktail] = useState<SignatureCocktail | null>(null);

  // New/Edit Menu Item state
  const [editingItemCategoryIndex, setEditingItemCategoryIndex] = useState<number | null>(null);
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
  const [itemForm, setItemForm] = useState<MenuItem | null>(null);

  // Success toast message
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Settings PIN change state
  const [newPin, setNewPinState] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  // Menu store hook
  const {
    signatureCocktails,
    menuCategories,
    saveSignatureCocktails,
    saveMenuCategories,
    resetMenuToDefaults,
  } = useMenuData();

  // Search filter for full menu
  const [searchQuery, setSearchQuery] = useState('');

  // File import ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPin(pinInput)) {
      setIsAuthenticated(true);
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
  };

  // ---- SIGNATURE COCKTAILS CRUD ----
  const handleSaveCocktail = (updated: SignatureCocktail) => {
    const updatedList = signatureCocktails.map((c) => (c.id === updated.id ? updated : c));
    saveSignatureCocktails(updatedList);
    setEditingCocktail(null);
    showToast('Cocktail erfolgreich aktualisiert!');
  };

  // ---- FULL MENU ITEMS CRUD ----
  const handleOpenAddItem = (catIdx: number) => {
    setEditingItemCategoryIndex(catIdx);
    setEditingItemIndex(null);
    setItemForm({
      name: { de: '', hr: '', en: '' },
      description: { de: '', hr: '', en: '' },
      price: '10,00 €',
      tags: [],
      isPopular: false,
      isSoldOut: false,
    });
  };

  const handleOpenEditItem = (catIdx: number, itemIdx: number) => {
    setEditingItemCategoryIndex(catIdx);
    setEditingItemIndex(itemIdx);
    const item = menuCategories[catIdx].items[itemIdx];
    setItemForm(JSON.parse(JSON.stringify(item)));
  };

  const handleSaveItem = () => {
    if (editingItemCategoryIndex === null || !itemForm) return;

    const newCategories = [...menuCategories];
    const category = newCategories[editingItemCategoryIndex];

    if (editingItemIndex === null) {
      // Add new
      category.items.push(itemForm);
    } else {
      // Update existing
      category.items[editingItemIndex] = itemForm;
    }

    saveMenuCategories(newCategories);
    setEditingItemCategoryIndex(null);
    setEditingItemIndex(null);
    setItemForm(null);
    showToast('Menü-Eintrag gespeichert!');
  };

  const handleDeleteItem = (catIdx: number, itemIdx: number) => {
    if (!confirm('Diesen Eintrag wirklich aus der Speisekarte löschen?')) return;
    const newCategories = [...menuCategories];
    newCategories[catIdx].items.splice(itemIdx, 1);
    saveMenuCategories(newCategories);
    showToast('Eintrag gelöscht.');
  };

  const handleToggleSoldOut = (catIdx: number, itemIdx: number) => {
    const newCategories = [...menuCategories];
    const item = newCategories[catIdx].items[itemIdx];
    item.isSoldOut = !item.isSoldOut;
    saveMenuCategories(newCategories);
    showToast(item.isSoldOut ? 'Als ausverkauft markiert' : 'Wieder verfügbar');
  };

  // ---- QUICK PRICE CHANGES ----
  const handleQuickPriceChange = (catIdx: number, itemIdx: number, newPrice: string) => {
    const newCategories = [...menuCategories];
    newCategories[catIdx].items[itemIdx].price = newPrice;
    saveMenuCategories(newCategories);
  };

  const handleQuickCocktailPriceChange = (cocktailId: string, newPrice: string) => {
    const updatedList = signatureCocktails.map((c) =>
      c.id === cocktailId ? { ...c, price: newPrice } : c
    );
    saveSignatureCocktails(updatedList);
  };

  // ---- BACKUP & RESTORE ----
  const handleExportJSON = () => {
    const json = exportMenuAsJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `corleone-speisekarte-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup-Datei heruntergeladen!');
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (importMenuFromJSON(content)) {
        showToast('Speisekarte erfolgreich wiederhergestellt!');
      } else {
        alert('Fehler beim Importieren der Datei. Ungültiges Format.');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('Möchtest du die gesamte Speisekarte wirklich auf die Standardeinstellungen zurücksetzen? Alle manuellen Änderungen gehen verloren.')) {
      resetMenuToDefaults();
      showToast('Standardwerte wiederhergestellt!');
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      setAdminPin(newPin.trim());
      setNewPinState('');
      setPinChangeSuccess(true);
      setTimeout(() => setPinChangeSuccess(false), 3000);
      showToast('PIN erfolgreich geändert!');
    } else {
      alert('Der PIN muss mindestens 4 Zeichen lang sein.');
    }
  };

  // ----------------------------------------------------
  // 1. PIN LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-[#070509] text-white flex items-center justify-center p-4 selection:bg-amber-400 selection:text-stone-950">
        <div className="w-full max-w-md bg-[#0D121A] border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-lg">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full">
              BEACH BAR CORLEONE
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-white mt-3">
              Admin Dashboard
            </h1>
            <p className="text-xs text-stone-400 mt-1">
              Verwalte Getränke, Speisen & Preise in Echtzeit
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 pt-2">
            <div>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="PIN eingeben (Standard: corleone2026)"
                autoFocus
                className="w-full px-4 py-3.5 rounded-xl bg-stone-950 border border-white/15 text-white text-center tracking-widest font-mono text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all placeholder:tracking-normal placeholder:font-sans placeholder:text-stone-600"
              />
              {pinError && (
                <p className="text-rose-400 text-xs mt-2 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Falscher PIN. Bitte erneut versuchen.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm uppercase tracking-wider shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" /> Anmelden
            </button>
          </form>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-stone-500">
            <Link href="/" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Zurück zur Website
            </Link>
            <span className="font-mono text-[10px]">PIN-Hinweis: corleone2026</span>
          </div>
        </div>
      </main>
    );
  }

  // ----------------------------------------------------
  // 2. AUTHENTICATED ADMIN DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-[#070509] text-stone-200 selection:bg-amber-400 selection:text-stone-950">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-amber-500 text-stone-950 px-5 py-3 rounded-2xl shadow-2xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0D121A]/95 border-b border-white/10 backdrop-blur-xl px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors text-xs font-mono">
              <ArrowLeft className="w-4 h-4" /> Live-Website
            </Link>
            <span className="text-stone-600">|</span>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-serif font-black text-white text-base tracking-wider">CORLEONE</span>
              <span className="text-[10px] uppercase font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded-full">
                ADMIN
              </span>
            </div>
          </div>

          {/* Language Selector for Live Previews */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 p-1 rounded-full bg-stone-950 border border-white/10 text-xs font-mono">
              <span className="text-stone-500 text-[10px] px-2 font-sans font-medium">Sprachansicht:</span>
              {(['de', 'hr', 'en'] as Language[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setSelectedLang(l)}
                  className={`px-2 py-0.5 rounded-full font-bold uppercase cursor-pointer transition-all ${
                    selectedLang === l ? 'bg-amber-400 text-stone-950' : 'text-stone-400 hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-rose-400 transition-colors border border-white/5 cursor-pointer"
              title="Abmelden"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#0D121A] border border-white/10 w-fit">
          <button
            onClick={() => setActiveTab('cocktails')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'cocktails'
                ? 'bg-amber-500 text-stone-950 shadow-lg'
                : 'text-stone-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <GlassWater className="w-4 h-4" /> 4 Signature Cocktails
          </button>

          <button
            onClick={() => setActiveTab('menu')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'menu'
                ? 'bg-amber-500 text-stone-950 shadow-lg'
                : 'text-stone-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <UtensilsCrossed className="w-4 h-4" /> Speise- & Getränkekarte
          </button>

          <button
            onClick={() => setActiveTab('quick_prices')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'quick_prices'
                ? 'bg-amber-500 text-stone-950 shadow-lg'
                : 'text-stone-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <DollarSign className="w-4 h-4" /> Schnell-Preise
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-amber-500 text-stone-950 shadow-lg'
                : 'text-stone-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <KeyRound className="w-4 h-4" /> Backup & PIN
          </button>
        </div>

        {/* ============================================================ */}
        {/* TAB 1: SIGNATURE COCKTAILS                                   */}
        {/* ============================================================ */}
        {activeTab === 'cocktails' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-serif font-black text-white">Signature Cocktail Spotlight (4 Drinks)</h2>
                <p className="text-xs text-stone-400">Diese 4 Highlights werden prominent im 3D-Scroller auf der Startseite präsentiert.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {signatureCocktails.map((c) => {
                const localizedName = typeof c.name === 'object' ? c.name[selectedLang] : c.name;
                const localizedTagline = c.tagline[selectedLang];
                const localizedBadge = c.badge ? c.badge[selectedLang] : '';

                return (
                  <div key={c.id} className="p-6 rounded-3xl bg-[#0D121A] border border-white/10 space-y-4 hover:border-amber-500/40 transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        {localizedBadge && (
                          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-500/30 px-2 py-0.5 rounded-full inline-block mb-1.5">
                            ★ {localizedBadge}
                          </span>
                        )}
                        <h3 className="text-xl font-serif font-bold text-white">{localizedName}</h3>
                        <p className="text-xs text-stone-400 italic">{localizedTagline}</p>
                      </div>

                      <div className="text-right">
                        <span className="text-lg font-mono font-black text-amber-400 block">{c.price}</span>
                        <span className="text-[10px] font-mono text-stone-500">{c.alcoholContent}</span>
                      </div>
                               <div className="pt-2 border-t border-white/5 space-y-2">
                      <div className="text-xs text-stone-300">
                        <span className="text-stone-500 font-mono text-[10px] uppercase block">Zutaten ({selectedLang.toUpperCase()}):</span>
                        {c.ingredients[selectedLang]?.join(' • ')}
                      </div>
                    </div>                </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingCocktail(JSON.parse(JSON.stringify(c)))}
                        className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-stone-200 text-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Bearbeiten
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cocktail Edit Modal */}
            {editingCocktail && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                <div className="w-full max-w-2xl bg-[#0D121A] border border-white/15 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                      <GlassWater className="w-5 h-5 text-amber-400" />
                      Cocktail bearbeiten
                    </h3>
                    <button
                      onClick={() => setEditingCocktail(null)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Price & Alcohol */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-stone-400 block mb-1">Preis (€)</label>
                      <input
                        type="text"
                        value={editingCocktail.price}
                        onChange={(e) => setEditingCocktail({ ...editingCocktail, price: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-white/15 text-white font-mono text-sm focus:border-amber-400 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-mono text-stone-400 block mb-1">Alkoholgehalt / Vol.</label>
                      <input
                        type="text"
                        value={editingCocktail.alcoholContent}
                        onChange={(e) => setEditingCocktail({ ...editingCocktail, alcoholContent: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-white/15 text-white font-mono text-sm focus:border-amber-400 outline-none"
                      />
                    </div>
                  </div>

                  {/* Multi-language Names */}
                  <div className="space-y-3 pt-2 border-t border-white/5">
                    <h4 className="text-xs font-mono font-bold uppercase text-amber-400">Name in 3 Sprachen</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] font-mono text-stone-400 block mb-1">DEUTSCH</label>
                        <input
                          type="text"
                          value={typeof editingCocktail.name === 'object' ? editingCocktail.name.de : editingCocktail.name}
                          onChange={(e) => {
                            const prev = typeof editingCocktail.name === 'object' ? editingCocktail.name : { de: editingCocktail.name, hr: editingCocktail.name, en: editingCocktail.name };
                            setEditingCocktail({ ...editingCocktail, name: { ...prev, de: e.target.value } });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-white/15 text-white text-xs focus:border-amber-400 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-stone-400 block mb-1">KROATISCH (HR)</label>
                        <input
                          type="text"
                          value={typeof editingCocktail.name === 'object' ? editingCocktail.name.hr : editingCocktail.name}
                          onChange={(e) => {
                            const prev = typeof editingCocktail.name === 'object' ? editingCocktail.name : { de: editingCocktail.name, hr: editingCocktail.name, en: editingCocktail.name };
                            setEditingCocktail({ ...editingCocktail, name: { ...prev, hr: e.target.value } });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-white/15 text-white text-xs focus:border-amber-400 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-stone-400 block mb-1">ENGLISCH (EN)</label>
                        <input
                          type="text"
                          value={typeof editingCocktail.name === 'object' ? editingCocktail.name.en : editingCocktail.name}
                          onChange={(e) => {
                            const prev = typeof editingCocktail.name === 'object' ? editingCocktail.name : { de: editingCocktail.name, hr: editingCocktail.name, en: editingCocktail.name };
                            setEditingCocktail({ ...editingCocktail, name: { ...prev, en: e.target.value } });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-white/15 text-white text-xs focus:border-amber-400 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Multi-language Taglines */}
                  <div className="space-y-3 pt-2 border-t border-white/5">
                    <h4 className="text-xs font-mono font-bold uppercase text-amber-400">Tagline / Untertitel</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] font-mono text-stone-400 block mb-1">DEUTSCH</label>
                        <input
                          type="text"
                          value={editingCocktail.tagline.de}
                          onChange={(e) => setEditingCocktail({ ...editingCocktail, tagline: { ...editingCocktail.tagline, de: e.target.value } })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-white/15 text-white text-xs focus:border-amber-400 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-stone-400 block mb-1">KROATISCH (HR)</label>
                        <input
                          type="text"
                          value={editingCocktail.tagline.hr}
                          onChange={(e) => setEditingCocktail({ ...editingCocktail, tagline: { ...editingCocktail.tagline, hr: e.target.value } })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-white/15 text-white text-xs focus:border-amber-400 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-stone-400 block mb-1">ENGLISCH (EN)</label>
                        <input
                          type="text"
                          value={editingCocktail.tagline.en}
                          onChange={(e) => setEditingCocktail({ ...editingCocktail, tagline: { ...editingCocktail.tagline, en: e.target.value } })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-white/15 text-white text-xs focus:border-amber-400 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setEditingCocktail(null)}
                      className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-bold uppercase cursor-pointer"
                    >
                      Abbrechen
                    </button>
                    <button
                      onClick={() => handleSaveCocktail(editingCocktail)}
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-4 h-4" /> Änderungen speichern
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: FULL FOOD & DRINKS MENU                               */}
        {/* ============================================================ */}
        {activeTab === 'menu' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-serif font-black text-white">Gesamte Speise- & Getränkekarte</h2>
                <p className="text-xs text-stone-400">Verwalte alle Kategorien, Einzelartikel, Preise und Verfügbarkeiten.</p>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
                <input
                  type="text"
                  placeholder="Artikel suchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-xl bg-[#0D121A] border border-white/10 text-xs text-white focus:border-amber-400 outline-none w-56 sm:w-72"
                />
              </div>
            </div>

            {menuCategories.map((cat, catIdx) => {
              const filteredItems = cat.items.filter((item) => {
                if (!searchQuery) return true;
                const q = searchQuery.toLowerCase();
                return (
                  item.name.de.toLowerCase().includes(q) ||
                  item.name.hr.toLowerCase().includes(q) ||
                  item.name.en.toLowerCase().includes(q) ||
                  item.price.toLowerCase().includes(q)
                );
              });

              if (searchQuery && filteredItems.length === 0) return null;

              return (
                <div key={cat.id} className="p-6 rounded-3xl bg-[#0D121A] border border-white/10 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase text-amber-400 tracking-wider">
                        KATEGORIE #{catIdx + 1}
                      </span>
                      <h3 className="text-xl font-serif font-bold text-white">
                        {cat.title[selectedLang]} ({cat.items.length} Artikel)
                      </h3>
                    </div>

                    <button
                      onClick={() => handleOpenAddItem(catIdx)}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500 text-amber-300 hover:text-stone-950 border border-amber-500/40 text-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Artikel hinzufügen
                    </button>
                  </div>

                  <div className="divide-y divide-white/5">
                    {filteredItems.map((item, itemIdx) => (
                      <div
                        key={itemIdx}
                        className={`py-3 flex flex-wrap items-center justify-between gap-3 transition-colors ${
                          item.isSoldOut ? 'opacity-45' : ''
                        }`}
                      >
                        <div className="space-y-0.5 max-w-md">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{item.name[selectedLang]}</span>
                            {item.isPopular && (
                              <span className="text-[9px] font-mono uppercase bg-amber-500/20 text-amber-400 border border-amber-500/40 px-1.5 py-0.2 rounded font-bold">
                                Bestseller
                              </span>
                            )}
                            {item.isSoldOut && (
                              <span className="text-[9px] font-mono uppercase bg-rose-500/20 text-rose-400 border border-rose-500/40 px-1.5 py-0.2 rounded font-bold">
                                Ausverkauft
                              </span>
                            )}
                          </div>
                          {item.description && item.description[selectedLang] && (
                            <p className="text-xs text-stone-400">{item.description[selectedLang]}</p>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-mono font-bold text-amber-400">{item.price}</span>

                          {/* Toggle Sold Out Button */}
                          <button
                            onClick={() => handleToggleSoldOut(catIdx, itemIdx)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-colors cursor-pointer ${
                              item.isSoldOut
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            }`}
                            title={item.isSoldOut ? 'Wieder verfügbar machen' : 'Als ausverkauft markieren'}
                          >
                            {item.isSoldOut ? 'Aktivieren' : 'Ausverkauft'}
                          </button>

                          {/* Edit Item Button */}
                          <button
                            onClick={() => handleOpenEditItem(catIdx, itemIdx)}
                            className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 cursor-pointer"
                            title="Bearbeiten"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Delete Item Button */}
                          <button
                            onClick={() => handleDeleteItem(catIdx, itemIdx)}
                            className="p-1.5 rounded-lg bg-stone-900 hover:bg-rose-900/60 text-stone-400 hover:text-rose-300 cursor-pointer"
                            title="Löschen"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Modal for Add/Edit Menu Item */}
            {itemForm && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                <div className="w-full max-w-xl bg-[#0D121A] border border-white/15 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 my-8">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h3 className="text-xl font-serif font-bold text-white">
                      {editingItemIndex === null ? 'Neuen Artikel anlegen' : 'Artikel bearbeiten'}
                    </h3>
                    <button
                      onClick={() => setItemForm(null)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Price & Popular Tag */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-stone-400 block mb-1">Preis (inkl. Währung)</label>
                      <input
                        type="text"
                        value={itemForm.price}
                        onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                        placeholder="z. B. 12,00 €"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-white/15 text-white font-mono text-sm focus:border-amber-400 outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-4 pt-6">
                      <label className="flex items-center gap-2 text-xs font-sans cursor-pointer text-stone-300">
                        <input
                          type="checkbox"
                          checked={itemForm.isPopular || false}
                          onChange={(e) => setItemForm({ ...itemForm, isPopular: e.target.checked })}
                          className="accent-amber-500 w-4 h-4 rounded"
                        />
                        <span>Bestseller-Badge</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs font-sans cursor-pointer text-stone-300">
                        <input
                          type="checkbox"
                          checked={itemForm.isSoldOut || false}
                          onChange={(e) => setItemForm({ ...itemForm, isSoldOut: e.target.checked })}
                          className="accent-rose-500 w-4 h-4 rounded"
                        />
                        <span>Ausverkauft</span>
                      </label>
                    </div>
                  </div>

                  {/* Multi-language Names */}
                  <div className="space-y-3 pt-2 border-t border-white/5">
                    <h4 className="text-xs font-mono font-bold uppercase text-amber-400">Artikelname in 3 Sprachen</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-[10px] font-mono text-stone-400 block mb-1">DEUTSCH</label>
                        <input
                          type="text"
                          value={itemForm.name.de}
                          onChange={(e) => setItemForm({ ...itemForm, name: { ...itemForm.name, de: e.target.value } })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-white/15 text-white text-xs focus:border-amber-400 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-stone-400 block mb-1">KROATISCH (HR)</label>
                        <input
                          type="text"
                          value={itemForm.name.hr}
                          onChange={(e) => setItemForm({ ...itemForm, name: { ...itemForm.name, hr: e.target.value } })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-white/15 text-white text-xs focus:border-amber-400 outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono text-stone-400 block mb-1">ENGLISCH (EN)</label>
                        <input
                          type="text"
                          value={itemForm.name.en}
                          onChange={(e) => setItemForm({ ...itemForm, name: { ...itemForm.name, en: e.target.value } })}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-white/15 text-white text-xs focus:border-amber-400 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Multi-language Descriptions */}
                  <div className="space-y-3 pt-2 border-t border-white/5">
                    <h4 className="text-xs font-mono font-bold uppercase text-amber-400">Beschreibung / Zutaten (optional)</h4>
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Deutsch: z. B. Aperol, Prosecco, Soda, frische Orange"
                        value={itemForm.description?.de || ''}
                        onChange={(e) =>
                          setItemForm({
                            ...itemForm,
                            description: {
                              de: e.target.value,
                              hr: itemForm.description?.hr || '',
                              en: itemForm.description?.en || '',
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-white/15 text-white text-xs focus:border-amber-400 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Kroatisch (HR): z. B. Aperol, Prosecco, mineralna voda, svježa naranča"
                        value={itemForm.description?.hr || ''}
                        onChange={(e) =>
                          setItemForm({
                            ...itemForm,
                            description: {
                              de: itemForm.description?.de || '',
                              hr: e.target.value,
                              en: itemForm.description?.en || '',
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-white/15 text-white text-xs focus:border-amber-400 outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Englisch (EN): e. g. Aperol, Prosecco, soda, fresh orange slice"
                        value={itemForm.description?.en || ''}
                        onChange={(e) =>
                          setItemForm({
                            ...itemForm,
                            description: {
                              de: itemForm.description?.de || '',
                              hr: itemForm.description?.hr || '',
                              en: e.target.value,
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-white/15 text-white text-xs focus:border-amber-400 outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                    <button
                      onClick={() => setItemForm(null)}
                      className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs font-bold uppercase cursor-pointer"
                    >
                      Abbrechen
                    </button>
                    <button
                      onClick={handleSaveItem}
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-4 h-4" /> Artikel speichern
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: QUICK PRICE EDITOR                                    */}
        {/* ============================================================ */}
        {activeTab === 'quick_prices' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-serif font-black text-white">Schnell-Preis-Editor</h2>
              <p className="text-xs text-stone-400">Ändere Preise direkt in der Tabelle wie an einer Kasse. Änderungen werden sofort gespeichert.</p>
            </div>

            {/* Signature Cocktails Quick Prices */}
            <div className="p-6 rounded-3xl bg-[#0D121A] border border-white/10 space-y-4">
              <h3 className="text-lg font-serif font-bold text-amber-400">4 Signature Cocktails</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {signatureCocktails.map((c) => {
                  const localizedName = typeof c.name === 'object' ? c.name[selectedLang] : c.name;
                  return (
                    <div key={c.id} className="p-4 rounded-2xl bg-stone-950 border border-white/5 space-y-2">
                      <span className="text-xs font-bold text-white block truncate">{localizedName}</span>
                      <input
                        type="text"
                        value={c.price}
                        onChange={(e) => handleQuickCocktailPriceChange(c.id, e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg bg-[#0D121A] border border-white/20 text-amber-400 font-mono font-bold text-sm focus:border-amber-400 outline-none"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* All Menu Categories Quick Prices */}
            {menuCategories.map((cat, catIdx) => (
              <div key={cat.id} className="p-6 rounded-3xl bg-[#0D121A] border border-white/10 space-y-4">
                <h3 className="text-lg font-serif font-bold text-white">{cat.title[selectedLang]}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {cat.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="p-3.5 rounded-2xl bg-stone-950 border border-white/5 space-y-1.5">
                      <span className="text-xs font-bold text-stone-200 block truncate">{item.name[selectedLang]}</span>
                      <input
                        type="text"
                        value={item.price}
                        onChange={(e) => handleQuickPriceChange(catIdx, itemIdx, e.target.value)}
                        className="w-full px-2.5 py-1 rounded-lg bg-[#0D121A] border border-white/20 text-amber-400 font-mono font-bold text-xs focus:border-amber-400 outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 4: BACKUP & PIN SETTINGS                                 */}
        {/* ============================================================ */}
        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* PIN Settings */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0D121A] border border-white/10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-white">Admin-PIN ändern</h3>
                  <p className="text-xs text-stone-400">Passe das Passwort für diesen Admin-Bereich an.</p>
                </div>
              </div>

              <form onSubmit={handleChangePin} className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-stone-400 block mb-1">Neuer PIN</label>
                  <input
                    type="password"
                    value={newPin}
                    onChange={(e) => setNewPinState(e.target.value)}
                    placeholder="Neuen PIN eingeben (min. 4 Zeichen)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-white/15 text-white font-mono text-sm focus:border-amber-400 outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer"
                >
                  PIN aktualisieren
                </button>

                {pinChangeSuccess && (
                  <p className="text-emerald-400 text-xs flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> PIN erfolgreich gespeichert!
                  </p>
                )}
              </form>
            </div>

            {/* Backup & Restore */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0D121A] border border-white/10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-white">Backup & Wiederherstellung</h3>
                  <p className="text-xs text-stone-400">Sichere alle Menü- und Cocktaildaten als JSON-Datei.</p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleExportJSON}
                  className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider border border-white/10 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4 text-amber-400" /> Speisekarte exportieren (.JSON)
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImportFile}
                  accept=".json"
                  className="hidden"
                />

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider border border-white/10 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <Upload className="w-4 h-4 text-sky-400" /> Backup importieren (.JSON)
                </button>

                <button
                  onClick={handleReset}
                  className="w-full py-3 rounded-xl bg-rose-950/40 hover:bg-rose-950 text-rose-300 text-xs font-bold uppercase tracking-wider border border-rose-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all mt-4"
                >
                  <RotateCcw className="w-4 h-4" /> Auf Werkseinstellungen zurücksetzen
                </button>
              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
}
