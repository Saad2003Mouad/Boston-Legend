// ============================================================
// BUSINESS CONFIGURATION — SINGLE SOURCE OF TRUTH
// American Legend Ice Cream Truck
// Change anything here and it updates across the entire site:
// footer, schema markup, contact page, SEO, click-to-call links
// ============================================================

export const BUSINESS_CONFIG = {
  name: "American Legend Ice Cream Truck",
  legalName: "American Legend Ice Cream Truck LLC",
  tagline: "A True American Ice Cream Experience.",
  description:
    "New England' premier ice cream truck catering service. Bringing classic American frozen treats, nostalgic novelties, and legendary sweet celebrations to birthdays, corporate events, weddings, and festivals across all of New England.",
  domain: "https://www.americanlegendicecreamtruck.com",

  contact: {
    phone1: "781-947-7676",
    phone1Formatted: "+17819477676",
    phone1Label: "Main Line",
    phone2: "781-947-7676",
    phone2Formatted: "+17819477676",
    phone2Label: "Reservations",
    email: "info@americanlegendicecreamtruck.com",
  },

  // Change this once to update ALL schema markup, footer, contact page
  address: {
    street: "38 Woodland Rd",
    city: "Georgetown",
    state: "MA",
    zip: "01833",
    country: "US",
    countryFull: "United States",
    display: "38 Woodland Rd, Georgetown, MA 01833",
  },

  geo: {
    lat: 42.4084,
    lng: -71.012,
  },

  hours: {
    description: "Available 24 hours by reservation, 7 days a week",
    opens: "08:00",
    closes: "22:00",
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
  },

  // Update when social accounts are created
  social: {
    instagram: "https://instagram.com/americanlegendicecream",
    facebook: "https://www.facebook.com/AmericanLegendIceCream/",
    tiktok: "",
    youtube: "",
  },

  // Live stats — update periodically
  stats: {
    eventsServed: 500,
    rating: 4.9,
    reviewCount: 142,
    citiesServed: 500,
    yearsInBusiness: 6,
    satisfactionRate: 100,
  },

  // SEO
  keywords: [
    // ── Brand & Core Service ──────────────────────────────────────────────
    "American Legend Ice Cream Truck",
    "American Legend Ice Cream",
    "boston ice cream truck rental",
    "ice cream truck catering boston",
    "ice cream truck for hire massachusetts",
    "mobile ice cream catering new england",
    "premium ice cream truck rental",
    "vintage ice cream truck booking",
    "ice cream truck event catering boston",
    "best ice cream truck in boston",
    "ice cream truck vendor massachusetts",

    // ── Events & Occasions ────────────────────────────────────────────────
    "wedding ice cream truck catering boston",
    "corporate event ice cream truck rental",
    "ice cream truck for birthday party boston",
    "ice cream truck school events massachusetts",
    "employee appreciation ice cream catering",
    "company picnic ice cream truck",
    "ice cream truck for graduation parties",
    "bridal shower dessert catering boston",
    "baby shower ice cream truck rental",
    "ice cream truck for festivals new england",
    "tenant appreciation event ice cream",
    "church event ice cream catering",
    "fundraiser ice cream truck vendor",
    "college event ice cream truck boston",
    "summer camp ice cream truck visit",

    // ── Near Me & Local Intent ────────────────────────────────────────────
    "ice cream truck rental near me",
    "ice cream truck catering near me",
    "rent an ice cream truck near me",
    "hire ice cream truck near me",
    "local ice cream truck for parties",

    // ── Cities & Regions (High Value Locations) ───────────────────────────
    "ice cream truck rental boston ma",
    "ice cream truck cambridge ma",
    "ice cream truck newton ma",
    "ice cream truck somerville ma",
    "ice cream truck brookline ma",
    "ice cream truck lexington ma",
    "ice cream truck wellesley ma",
    "ice cream truck needham ma",
    "ice cream truck burlington ma",
    "ice cream truck waltham ma",
    "ice cream truck salem ma",
    "ice cream truck peabody ma",
    "ice cream truck lynn ma",
    "ice cream truck worcester ma",
    "ice cream truck springfield ma",
    "ice cream truck andover ma",
    "ice cream truck georgetown ma",
    "ice cream truck north shore ma",
    "ice cream truck south shore ma",
    "ice cream truck rhode island",
    "ice cream truck southern new hampshire",

    // ── Specialties & Products ────────────────────────────────────────────
    "nostalgic ice cream novelties catering",
    "classic ice cream truck treats",
    "pre-packaged ice cream truck rental",
    "bomb pops and choco tacos catering",
    "nut-free ice cream truck options",
    "dairy-free ice cream truck treats",
    "ice cream truck packages pricing",
  ],

  // Languages supported
  languages: ["English", "Spanish", "Arabic"],

  // Payment methods
  paymentMethods: [
    "Cash",
    "Credit Card",
    "Debit Card",
    "Check",
    "Online Payment",
  ],

  // Cuisine types (for schema)
  cuisine: ["Ice Cream", "Frozen Desserts", "Soft Serve", "Novelties"],

  // Price range
  priceRange: "$$",
  startingPrice: 250,
  currency: "USD",
} as const;

export type BusinessConfig = typeof BUSINESS_CONFIG;
