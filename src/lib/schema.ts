import { BUSINESS_CONFIG } from "./config";
import type { CityData } from "./cities-data";
import type { Package } from "./packages-data";

/**
 * Global Organization and LocalBusiness schema
 * Applied to every page for max local SEO authority
 */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FoodEstablishment"],
    "@id": `${BUSINESS_CONFIG.domain}/#organization`,
    name: BUSINESS_CONFIG.legalName,
    alternateName: BUSINESS_CONFIG.name,
    url: BUSINESS_CONFIG.domain,
    logo: `${BUSINESS_CONFIG.domain}/images/logo-dark.png`,
    image: `${BUSINESS_CONFIG.domain}/images/fundraise.jpg`,
    description: BUSINESS_CONFIG.description,
    telephone: BUSINESS_CONFIG.contact.phone1Formatted,
    email: BUSINESS_CONFIG.contact.email,
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS_CONFIG.stats.rating,
      reviewCount: BUSINESS_CONFIG.stats.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: BUSINESS_CONFIG.hours.days,
        opens: BUSINESS_CONFIG.hours.opens,
        closes: BUSINESS_CONFIG.hours.closes,
      },
    ],
    priceRange: BUSINESS_CONFIG.priceRange,
    servesCuisine: BUSINESS_CONFIG.cuisine,
    sameAs: [
      BUSINESS_CONFIG.social.instagram,
      BUSINESS_CONFIG.social.facebook,
      BUSINESS_CONFIG.social.tiktok,
    ].filter(Boolean),
  };
}

/**
 * FAQ Schema generator
 */
export function getFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * City Page Specific Schema
 */
export function getCityPageSchema(city: CityData) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Ice Cream Truck Rental in ${city.name}, MA`,
    provider: {
      "@id": `${BUSINESS_CONFIG.domain}/#organization`,
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      containedInPlace: {
        "@type": "State",
        name: "Massachusetts",
      },
    },
    serviceType: "Ice Cream Catering",
    description: city.localIntro,
  };
}

/**
 * Package / Product Schema
 */
export function getPackageSchema(pkg: Package) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: pkg.name,
    description: pkg.description,
    provider: {
      "@id": `${BUSINESS_CONFIG.domain}/#organization`,
    },
    offers: {
      "@type": "Offer",
      price: pkg.price,
      priceCurrency: BUSINESS_CONFIG.currency,
      availability: "https://schema.org/InStock",
      url: `${BUSINESS_CONFIG.domain}/packages#${pkg.slug}`,
    },
  };
}

/**
 * Breadcrumb Schema
 */
export function getBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BUSINESS_CONFIG.domain}${item.url}`,
    })),
  };
}
