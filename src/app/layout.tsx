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
  title: {
    default: "Beach Bar Corleone | Cliffside Bar, Cocktails & Sunset in Malinska, Krk",
    template: "%s | Beach Bar Corleone",
  },
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
  authors: [{ name: "Beach Bar Corleone", url: "https://beachbar-corleone.com" }],
  creator: "Beach Bar Corleone",
  publisher: "Beach Bar Corleone",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
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
    alternateLocale: ["de_DE", "hr_HR"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beach Bar Corleone | Cliffside Sunset & Cocktails in Malinska, Krk",
    description:
      "Cliffside cocktail bar & sunset lounge directly above Cuklićevo Beach, Malinska (Krk, Croatia). Artisan coffee, signature spritz, and Adriatic panoramas.",
    images: ["/images/hero-cliffside.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://beachbar-corleone.com",
    languages: {
      "en-US": "https://beachbar-corleone.com",
      "de-DE": "https://beachbar-corleone.com",
      "hr-HR": "https://beachbar-corleone.com",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Comprehensive Structured Data for AI Search Engines (Perplexity, ChatGPT, Google AI Overviews)
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": ["BarOrPub", "LocalBusiness", "TouristAttraction"],
    "@id": "https://beachbar-corleone.com/#business",
    name: "Beach Bar Corleone",
    alternateName: [
      "Beach Bar Corleone Malinska",
      "Corleone Beach Bar Krk",
      "Corleone Cuklićevo",
    ],
    description:
      "Beach Bar Corleone is a premier cliffside bar and sunset lounge in Malinska on the island of Krk, Croatia. Located directly above Plaža Cuklićevo, offering artisan espresso, signature Mediterranean spritz cocktails, local island wines, and DJ sunset sessions with unobstructed sea views.",
    url: "https://beachbar-corleone.com",
    telephone: "+385 98 398 745",
    email: "corleone.malinska@gmail.com",
    image: [
      "https://beachbar-corleone.com/images/hero-cliffside.jpg",
      "https://beachbar-corleone.com/images/sunset-cocktail.jpg",
      "https://beachbar-corleone.com/images/day-drinks.jpg",
    ],
    logo: "https://beachbar-corleone.com/images/hero-cliffside.jpg",
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Credit Card",
    servesCuisine: [
      "Cocktails",
      "Artisan Coffee",
      "Mediterranean Spritz",
      "Local Krk Wine",
      "Craft Beer",
      "Bar Snacks",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Cuklićevo bb (above Plaža Cuklićevo)",
      addressLocality: "Malinska",
      postalCode: "51511",
      addressRegion: "Otok Krk, Primorje-Gorski Kotar",
      addressCountry: "HR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.1215,
      longitude: 14.5262,
    },
    hasMap: "https://maps.google.com/?q=Beach+Bar+Corleone+Malinska+Cuklicevo",
    sameAs: [
      "https://instagram.com/beachbarcorleone",
      "https://facebook.com/beachbarcorleone",
    ],
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
        validFrom: "2026-05-01",
        validThrough: "2026-10-15",
      },
    ],
    amenityFeature: [
      {
        "@type": "LocationFeatureSpecification",
        name: "180° Panoramic Adriatic Sea View",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Direct Beach Access (Plaža Cuklićevo)",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Outdoor Cliff Terrace",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Dog Friendly / Pets Allowed",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Sunset DJ Sessions & Music",
        value: true,
      },
      {
        "@type": "LocationFeatureSpecification",
        name: "Free Entry / No Reservation Required",
        value: true,
      },
    ],
  };

  // FAQ Schema for AI Knowledge Extraction
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Where is Beach Bar Corleone located?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Beach Bar Corleone is situated directly on the cliffs above Plaža Cuklićevo in Malinska, on the Island of Krk, Croatia (GPS: 45.1215° N, 14.5262° E). It is accessible on foot via the coastal promenade or by car with nearby parking.",
        },
      },
      {
        "@type": "Question",
        name: "What are the opening hours of Beach Bar Corleone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Beach Bar Corleone is open daily from 10:00 AM to 23:00 PM (11:00 PM) during the summer season from May to October (weather permitting).",
        },
      },
      {
        "@type": "Question",
        name: "Do I need a reservation for Beach Bar Corleone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No reservation or guestlist is required. Walk-ins are always welcome and entry is completely free.",
        },
      },
      {
        "@type": "Question",
        name: "Are dogs allowed at Beach Bar Corleone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Beach Bar Corleone is dog-friendly and pets are warmly welcome on the cliff terrace.",
        },
      },
      {
        "@type": "Question",
        name: "What drinks are served at Beach Bar Corleone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The bar serves authentic Italian Illy espresso, iced coffee specialties, signature spritz cocktails (such as the Corleone Sunset Spritz), local Krk wines (like Žlahtina), Croatian craft beers, and refreshing mocktails.",
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${playfair.variable}`}
    >
      <head>
        {/* Local Business Structured Data for AI & Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        {/* FAQ Structured Data for AI Summaries */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
