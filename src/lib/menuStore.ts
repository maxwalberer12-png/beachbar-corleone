'use client';

import { useState, useEffect, useCallback } from 'react';
import { SIGNATURE_COCKTAILS, MENU_CATEGORIES } from '@/lib/data';
import { SignatureCocktail, MenuCategory, MenuItem, Language } from '@/lib/types';

const STORAGE_KEYS = {
  COCKTAILS: 'corleone_menu_signature_cocktails',
  CATEGORIES: 'corleone_menu_categories',
  PIN: 'corleone_admin_pin',
  AUTH: 'corleone_admin_auth',
};

const DEFAULT_PIN = 'corleone2026';
const MENU_UPDATE_EVENT = 'corleone_menu_updated';

// Helper to safely dispatch updates across components
function notifyMenuUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(MENU_UPDATE_EVENT));
  }
}

export function getStoredSignatureCocktails(): SignatureCocktail[] {
  if (typeof window === 'undefined') return SIGNATURE_COCKTAILS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COCKTAILS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse stored cocktails', e);
  }
  return SIGNATURE_COCKTAILS;
}

export function saveSignatureCocktails(cocktails: SignatureCocktail[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.COCKTAILS, JSON.stringify(cocktails));
    notifyMenuUpdated();
  } catch (e) {
    console.error('Failed to save cocktails', e);
  }
}

export function getStoredMenuCategories(): MenuCategory[] {
  if (typeof window === 'undefined') return MENU_CATEGORIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse stored categories', e);
  }
  return MENU_CATEGORIES;
}

export function saveMenuCategories(categories: MenuCategory[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    notifyMenuUpdated();
  } catch (e) {
    console.error('Failed to save categories', e);
  }
}

export function resetMenuToDefaults() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEYS.COCKTAILS);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    notifyMenuUpdated();
  } catch (e) {
    console.error('Failed to reset menu', e);
  }
}

export function exportMenuAsJSON(): string {
  const data = {
    version: '1.0',
    exportDate: new Date().toISOString(),
    signatureCocktails: getStoredSignatureCocktails(),
    menuCategories: getStoredMenuCategories(),
  };
  return JSON.stringify(data, null, 2);
}

export function importMenuFromJSON(jsonString: string): boolean {
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed.signatureCocktails && Array.isArray(parsed.signatureCocktails)) {
      saveSignatureCocktails(parsed.signatureCocktails);
    }
    if (parsed.menuCategories && Array.isArray(parsed.menuCategories)) {
      saveMenuCategories(parsed.menuCategories);
    }
    return true;
  } catch (e) {
    console.error('Invalid menu JSON import', e);
    return false;
  }
}

// Admin PIN Management
export function getAdminPin(): string {
  if (typeof window === 'undefined') return DEFAULT_PIN;
  try {
    return localStorage.getItem(STORAGE_KEYS.PIN) || DEFAULT_PIN;
  } catch {
    return DEFAULT_PIN;
  }
}

export function setAdminPin(newPin: string) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEYS.PIN, newPin.trim());
  } catch (e) {
    console.error('Failed to save PIN', e);
  }
}

export function verifyAdminPin(enteredPin: string): boolean {
  const currentPin = getAdminPin();
  const isValid = enteredPin.trim() === currentPin;
  if (isValid && typeof window !== 'undefined') {
    sessionStorage.setItem(STORAGE_KEYS.AUTH, 'true');
  }
  return isValid;
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return sessionStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  } catch {
    return false;
  }
}

export function logoutAdmin() {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
  } catch {}
}

// React Hook for live synchronization in components
export function useMenuData() {
  const [signatureCocktails, setSignatureCocktails] = useState<SignatureCocktail[]>(SIGNATURE_COCKTAILS);
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>(MENU_CATEGORIES);
  const [isLoaded, setIsLoaded] = useState(false);

  const loadData = useCallback(() => {
    setSignatureCocktails(getStoredSignatureCocktails());
    setMenuCategories(getStoredMenuCategories());
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    loadData();

    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener(MENU_UPDATE_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener(MENU_UPDATE_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [loadData]);

  return {
    signatureCocktails,
    menuCategories,
    isLoaded,
    saveSignatureCocktails,
    saveMenuCategories,
    resetMenuToDefaults,
  };
}
