import { Metadata } from "next";
import { BUSINESS_CONFIG } from "./config";

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
  keywords?: string[];
};

export function constructMetadata({
  title,
  description,
  image = "/images/Cover Image.png",
  url = "",
  noIndex = false,
  keywords = [],
}: SEOProps = {}): Metadata {
  const fullTitle = title
    ? `${title} | ${BUSINESS_CONFIG.name}`
    : `${BUSINESS_CONFIG.name} | ${BUSINESS_CONFIG.tagline}`;

  const fullDescription = description || BUSINESS_CONFIG.description;
  const fullUrl = `${BUSINESS_CONFIG.domain}${url}`;

  const allKeywords = [...BUSINESS_CONFIG.keywords, ...keywords];

  return {
    title: fullTitle,
    description: fullDescription,
    authors: [{ name: BUSINESS_CONFIG.name }],
    keywords: allKeywords,
    metadataBase: new URL(BUSINESS_CONFIG.domain),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: BUSINESS_CONFIG.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [image],
    },
    icons: {
      icon: "/icon.png",
      shortcut: "/favicon.ico",
      apple: "/apple-icon.png",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    manifest: "/site.webmanifest",
  };
}
