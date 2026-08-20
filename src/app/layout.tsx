import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B1521",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://beachbar-corleone.com'),
  title: "Beach Bar Corleone | Sea Views, Cocktails & Sunset in Malinska, Krk",
  description:
    "Perched on the cliffs above Cuklićevo Beach in Malinska (Krk, Croatia). Artisan espresso, craft sunset cocktails, chilled coastal beats, and unobstructed Adriatic sea views.",
  keywords: [
    "Beach Bar Corleone",
    "Malinska Beach Bar",
    "Krk Island Cocktails",
    "Cuklićevo Beach",
    "Sunset Bar Croatia",
    "Adria Lounge",
  ],
  authors: [{ name: "Beach Bar Corleone" }],
  openGraph: {
    title: "Beach Bar Corleone | Cocktails & Sunset over Cuklićevo Beach, Malinska",
    description:
      "Your cliffside oasis on Krk. Come for the morning coffee, stay for the sunset cocktails and chill summer nights.",
    url: "https://beachbar-corleone.com",
    siteName: "Beach Bar Corleone",
    images: [
      {
        url: "/images/hero-cliffside.jpg",
        width: 1200,
        height: 630,
        alt: "Beach Bar Corleone cliffside terrace with Adriatic sea view",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BarOrPub",
    name: "Beach Bar Corleone",
    image: "https://beachbar-corleone.com/images/hero-cliffside.jpg",
    telephone: "+385 98 398 745",
    email: "corleone.malinska@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plaža Cuklićevo, Cuklićevo bb",
      addressLocality: "Malinska",
      postalCode: "51511",
      addressRegion: "Otok Krk",
      addressCountry: "HR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.1215,
      longitude: 14.5262,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "23:00",
      },
    ],
    servesCuisine: ["Cocktails", "Coffee", "Mediterranean Snacks", "Ice Cream"],
    priceRange: "€€",
    url: "https://beachbar-corleone.com",
  };

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${playfair.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#F7F5EE] text-stone-900 font-sans antialiased selection:bg-amber-400 selection:text-stone-950">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
