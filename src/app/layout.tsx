import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfairDisplay = Playfair_Display({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
});

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Nature Brique | Fabricant de Briques en Terre Cuite au Bénin",
  description:
    "Nature Brique, première industrie céramique du Bénin. Fabricant de briques en terre cuite pour une construction durable, confortable et écologique. Siège social à Cotonou, usine à Zogbodomey.",
  keywords: [
    "brique terre cuite",
    "brique Bénin",
    "construction écologique",
    "brique naturelle",
    "terre cuite Afrique",
    "Nature Brique",
    "construction durable Bénin",
    "brique argile",
    "confort thermique",
    "isolation thermique",
    "fabricant brique Cotonou",
    "brique porteuse",
    "construction maison Bénin",
    "matériau construction naturel",
    "Eco-Build Bénin",
  ],
  authors: [{ name: "Nature Brique", url: "https://naturebrique.com" }],
  creator: "Nature Brique",
  publisher: "Nature Brique",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  metadataBase: new URL("https://naturebrique.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Nature Brique | Construisons notre monde écologique",
    description:
      "Première industrie céramique du Bénin. Des briques en terre cuite pour un confort thermique naturel, une durabilité exceptionnelle et une esthétique authentique.",
    url: "https://naturebrique.com",
    siteName: "Nature Brique",
    locale: "fr_BJ",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 400,
        height: 400,
        alt: "Nature Brique - Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nature Brique | Briques en Terre Cuite au Bénin",
    description:
      "Construisez durablement avec les briques en terre cuite Nature Brique. Confort, esthétique et performance.",
    images: ["/images/logo.png"],
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
  icons: {
    icon: "/images/logo.png",
  },
  verification: {
    google: "google-site-verification-code-here",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://naturebrique.com/#business",
    name: "Nature Brique",
    alternateName: "Nature Brique Bénin",
    description:
      "Première industrie céramique du Bénin, spécialisée dans la fabrication de briques en terre cuite pour une construction durable et écologique.",
    url: "https://naturebrique.com",
    logo: "https://naturebrique.com/images/logo.png",
    image: "https://naturebrique.com/images/logo.png",
    telephone: "+22996505057",
    email: "info@naturebrique.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Lot 3614, Fidjrosse-Houta",
      addressLocality: "Cotonou",
      addressRegion: "Littoral",
      postalCode: "BP 5099",
      addressCountry: "BJ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "6.3654",
      longitude: "2.4183",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/naturebrique.net",
      "https://www.instagram.com/naturebrique",
    ],
    priceRange: "$$",
    currenciesAccepted: "XOF",
    paymentAccepted: "Cash, Bank Transfer",
    areaServed: { "@type": "Country", name: "Bénin" },
    knowsLanguage: ["fr", "fon", "yo"],
    foundingDate: "2011",
    founder: {
      "@type": "Person",
      name: "Franck Kidjo",
      jobTitle: "Fondateur et Directeur Général",
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 25,
      maxValue: 35,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Briques en terre cuite",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Briques porteuses en terre cuite", description: "Briques structurelles en terre cuite pour la construction de murs porteurs." } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Briques de parement", description: "Briques de finition décorative pour les façades." } },
        { "@type": "Offer", itemOffered: { "@type": "Product", name: "Pavés en terre cuite", description: "Pavés pour aménagement extérieur." } },
      ],
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nature Brique",
    url: "https://naturebrique.com",
    logo: "https://naturebrique.com/images/logo.png",
    contactPoint: { "@type": "ContactPoint", telephone: "+229-96-50-50-57", contactType: "sales", availableLanguage: ["fr"], areaServed: "BJ" },
    address: { "@type": "PostalAddress", streetAddress: "Lot 3614, Fidjrosse-Houta", addressLocality: "Cotonou", addressCountry: "BJ" },
    sameAs: ["https://www.facebook.com/naturebrique.net", "https://www.instagram.com/naturebrique"],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nature Brique",
    url: "https://naturebrique.com",
    potentialAction: { "@type": "SearchAction", target: "https://naturebrique.com/?s={search_term_string}", "query-input": "required name=search_term_string" },
    inLanguage: "fr",
  };

  const placeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: "Nature Brique - Usine de production",
    address: { "@type": "PostalAddress", streetAddress: "Zone de Tanwé Hessou", addressLocality: "Zogbodomey", addressRegion: "Zou", addressCountry: "BJ" },
    geo: { "@type": "GeoCoordinates", latitude: "7.0333", longitude: "2.3167" },
  };

  return (
    <html lang="fr" suppressHydrationWarning className={`${playfairDisplay.variable} ${outfit.variable}`}>
      <head>
        <meta name="geo.region" content="BJ-LI" />
        <meta name="geo.placename" content="Cotonou" />
        <meta name="geo.position" content="6.3654;2.4183" />
        <meta name="ICBM" content="6.3654, 2.4183" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeJsonLd) }} />
      </head>
      <body className="antialiased bg-background text-foreground font-body">
        {children}
        <Toaster />
      </body>
    </html>
  );
}