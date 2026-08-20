import type { Metadata } from 'next';
import HomeView from '@/components/views/HomeView';

export const metadata: Metadata = {
  title: "Beach Bar Corleone | Cliffside Bar, Cocktails & Sunset in Malinska, Krk",
  description:
    "Beach Bar Corleone is an exclusive cliffside cocktail bar & sunset lounge situated directly above Plaža Cuklićevo in Malinska, Island of Krk (Croatia). Serving artisan Illy espresso, signature Mediterranean cocktails, local Krk wines, and chilled sunset DJ sessions with 180° panoramic Adriatic sea views. Open daily 10:00–23:00 (May–October). Walk-ins welcome, dog friendly.",
  keywords: [
    "Beach Bar Corleone",
    "Beach Bar Corleone Malinska",
    "Best beach bar Krk Croatia",
    "Plaža Cuklićevo",
    "Sunset bar Malinska",
    "Cocktails Malinska Krk",
    "Kvarner bay sunset bar",
    "Illy coffee beach bar Krk",
    "Cuklicevo beach lounge",
    "Dog friendly beach bar Croatia",
  ],
  openGraph: {
    title: "Beach Bar Corleone | Sea Views, Signature Cocktails & Sunset in Malinska, Krk",
    description:
      "Perched on the limestone cliffs above Cuklićevo Beach in Malinska (Krk, Croatia). Artisan espresso, craft sunset cocktails, chilled coastal DJ beats, and unobstructed Adriatic sea views. Open daily 10:00–23:00.",
    url: "https://beachbar-corleone.com",
    siteName: "Beach Bar Corleone",
    images: [
      {
        url: "/images/hero-cliffside.jpg",
        width: 1200,
        height: 630,
        alt: "Beach Bar Corleone cliffside terrace overlooking Plaža Cuklićevo and the Adriatic Sea",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beach Bar Corleone | Cliffside Sunset & Cocktails in Malinska, Krk",
    description:
      "Cliffside cocktail bar & sunset lounge directly above Cuklićevo Beach, Malinska (Krk, Croatia). Artisan coffee, signature spritz, and Adriatic panoramas.",
    images: ["/images/hero-cliffside.jpg"],
  },
};

export default function HomePage() {
  return <HomeView />;
}
