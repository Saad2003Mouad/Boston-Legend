import type { Metadata, Viewport } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";

import { BUSINESS_CONFIG } from "@/lib/config";
import { getSettings } from "@/lib/settings";
import { constructMetadata } from "@/lib/seo";
import { Providers } from "./providers";
import PublicLayout from "@/components/layout/PublicLayout";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

// ─── FONTS ──────────────────────────────────────────────────────────

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// ─── METADATA ───────────────────────────────────────────────────────

export const metadata: Metadata = constructMetadata();

export const viewport: Viewport = {
  themeColor: "#FFFBF5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ─── LAYOUT ─────────────────────────────────────────────────────────

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch settings safely
  let settings = {};
  try {
    settings = await getSettings();
  } catch (e) {
    console.warn("Failed to fetch layout settings", e);
  }

  const footerConfig = {
    companyName: (settings as any).companyName,
    companyPhone: (settings as any).companyPhone,
    companyEmail: (settings as any).companyEmail,
    companyAddress: (settings as any).companyAddress,
    facebookUrl: (settings as any).facebookUrl,
    instagramUrl: (settings as any).instagramUrl,
  };

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "IceCreamShop",
      name: BUSINESS_CONFIG.name,
      image: `${BUSINESS_CONFIG.domain}/images/og-default.jpg`,
      "@id": BUSINESS_CONFIG.domain,
      url: BUSINESS_CONFIG.domain,
      telephone: BUSINESS_CONFIG.contact.phone1,
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS_CONFIG.address.street,
        addressLocality: BUSINESS_CONFIG.address.city,
        addressRegion: BUSINESS_CONFIG.address.state,
        postalCode: BUSINESS_CONFIG.address.zip,
        addressCountry: BUSINESS_CONFIG.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: BUSINESS_CONFIG.geo.lat,
        longitude: BUSINESS_CONFIG.geo.lng,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: BUSINESS_CONFIG.hours.days,
        opens: BUSINESS_CONFIG.hours.opens,
        closes: BUSINESS_CONFIG.hours.closes,
      },
      priceRange: BUSINESS_CONFIG.priceRange,
      servesCuisine: BUSINESS_CONFIG.cuisine,
      sameAs: [
        BUSINESS_CONFIG.social.facebook,
        BUSINESS_CONFIG.social.instagram,
        BUSINESS_CONFIG.social.tiktok
      ].filter(Boolean),
    };

  return (
    <html lang="en">
      <head>
        {/* Preloads go here */}
      </head>
      <body
        className={`${playfair.variable} ${outfit.variable} font-sans bg-cream text-charcoal antialiased min-h-screen flex flex-col relative`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <PublicLayout footerConfig={footerConfig}>{children}</PublicLayout>
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
