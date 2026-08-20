export type Language = 'en' | 'hr' | 'de';

export interface SignatureCocktail {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: Record<Language, string>;
  ingredients: string[];
  tasteProfile: {
    sweet: number; // 1-5
    sour: number;
    bitter: number;
    refreshing: number;
  };
  alcoholContent: string;
  price: string;
  badge?: string;
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
  title: string;
  date: string;
  time: string;
  djOrAct?: string;
  genre: string;
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
