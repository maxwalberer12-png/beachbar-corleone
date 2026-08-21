export type Language = 'en' | 'hr' | 'de';

export interface SignatureCocktail {
  id: string;
  name: Record<Language, string> | string;
  category: Record<Language, string>;
  tagline: Record<Language, string>;
  description: Record<Language, string>;
  ingredients: Record<Language, string[]>;
  tasteProfile: {
    sweet: number; // 1-5
    sour: number;
    bitter: number;
    refreshing: number;
  };
  alcoholContent: string;
  price: string;
  badge?: Record<Language, string>;
  color: string;
}

export interface MenuItem {
  name: Record<Language, string>;
  description?: Record<Language, string>;
  price: string;
  tags?: string[];
  isPopular?: boolean;
}

export interface MenuCategory {
  id: string;
  title: Record<Language, string>;
  iconName: string;
  items: MenuItem[];
}

export interface EventItem {
  id: string;
  title: Record<Language, string>;
  date: Record<Language, string>;
  time: string;
  djOrAct?: Record<Language, string> | string;
  genre: Record<Language, string>;
  description: Record<Language, string>;
  isTonight?: boolean;
}

export interface BarInfo {
  name: string;
  locationName: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  instagram: string;
  facebook: string;
  mapsUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  regularHours: string;
  seasonNotice: Record<Language, string>;
}
