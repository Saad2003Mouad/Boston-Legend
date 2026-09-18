// ============================================================
// BUSINESS CONFIGURATION — SINGLE SOURCE OF TRUTH
// Boston Legend Ice Cream Truck
// Change anything here and it updates across the entire site:
// footer, schema markup, contact page, SEO, click-to-call links
// ============================================================

export const BUSINESS_CONFIG = {
  name: "Boston Legend Ice Cream Truck",
  legalName: "Boston Legend Ice Cream Truck LLC",
  tagline: "Boston's Legendary Sweet Experience.",
  description:
    "Massachusetts' premier ice cream truck catering service. Bringing artisan frozen treats, nostalgic novelties, and legendary sweet celebrations to birthdays, corporate events, weddings, and festivals across all of Massachusetts.",
  domain: "https://bostonlegendicecreamtruck.com",

  contact: {
    phone1: "617-999-3803",
    phone1Formatted: "+16179993803",
    phone1Label: "Main Line",
    phone2: "617-866-2727",
    phone2Formatted: "+16178662727",
    phone2Label: "Reservations",
    email: "info@bostonlegendicecreamtruck.com",
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
    instagram: "https://instagram.com/bostonlegendicecream",
    facebook: "https://www.facebook.com/BostonLegend/",
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
    // ── Brand ─────────────────────────────────────────────────────────────
    "Boston Legend Ice Cream Truck",
    "Boston Legend Ice Cream",
    "Boston Legend",
    "Boston Legend Ice Cream Truck Massachusetts",
    "bostonlegendicecreamtruck",
    "Boston Legend Ice Cream Truck Boston",

    // ── Core Service ──────────────────────────────────────────────────────
    "ice cream truck rental Massachusetts",
    "ice cream truck rental MA",
    "ice cream truck catering Massachusetts",
    "ice cream truck catering MA",
    "ice cream truck for hire Massachusetts",
    "ice cream truck for hire MA",
    "ice cream truck booking Massachusetts",
    "mobile ice cream catering Massachusetts",
    "mobile ice cream truck Massachusetts",
    "premium ice cream truck Massachusetts",
    "best ice cream truck Massachusetts",
    "ice cream truck service Massachusetts",
    "ice cream truck company Massachusetts",
    "professional ice cream truck Massachusetts",
    "luxury ice cream truck Massachusetts",

    // ── Near Me ───────────────────────────────────────────────────────────
    "ice cream truck near me",
    "ice cream truck rental near me",
    "ice cream truck catering near me",
    "ice cream catering near me Massachusetts",
    "ice cream truck hire near me",
    "mobile ice cream near me",

    // ── Events & Occasions ────────────────────────────────────────────────
    "ice cream truck birthday party Massachusetts",
    "ice cream truck birthday party Boston",
    "birthday party ice cream truck MA",
    "ice cream truck for birthday",
    "corporate ice cream truck catering Massachusetts",
    "corporate ice cream truck catering Boston",
    "corporate event ice cream truck MA",
    "office party ice cream truck Massachusetts",
    "wedding ice cream truck Massachusetts",
    "wedding ice cream truck Boston",
    "ice cream truck for weddings MA",
    "wedding dessert catering Massachusetts",
    "ice cream truck school event Massachusetts",
    "school ice cream day Massachusetts",
    "end of school year ice cream truck",
    "ice cream truck school party MA",
    "ice cream truck graduation party Massachusetts",
    "graduation party catering MA",
    "ice cream truck company picnic Massachusetts",
    "company picnic catering Boston",
    "ice cream truck block party Massachusetts",
    "block party ice cream truck MA",
    "ice cream truck community event Massachusetts",
    "ice cream truck fundraiser Massachusetts",
    "fundraiser ice cream truck MA",
    "ice cream truck festival Massachusetts",
    "ice cream truck grand opening Massachusetts",
    "business opening ice cream truck MA",
    "ice cream truck marketing event Massachusetts",
    "ice cream truck product launch MA",
    "ice cream truck baby shower Massachusetts",
    "baby shower catering Massachusetts",
    "ice cream truck bridal shower MA",
    "bridal shower dessert catering Massachusetts",
    "ice cream truck retirement party MA",
    "retirement party catering Massachusetts",
    "ice cream truck anniversary party MA",
    "ice cream truck summer camp Massachusetts",
    "summer camp ice cream day MA",
    "ice cream truck family reunion Massachusetts",
    "family reunion catering MA",
    "ice cream truck church event Massachusetts",
    "ice cream truck nonprofit event MA",
    "ice cream truck customer appreciation event Massachusetts",
    "employee appreciation ice cream truck MA",

    // ── Cities & Regions ──────────────────────────────────────────────────
    "ice cream truck Boston MA",
    "ice cream truck Cambridge MA",
    "ice cream truck Somerville MA",
    "ice cream truck Newton MA",
    "ice cream truck Brookline MA",
    "ice cream truck Quincy MA",
    "ice cream truck Worcester MA",
    "ice cream truck Springfield MA",
    "ice cream truck Lowell MA",
    "ice cream truck Lynn MA",
    "ice cream truck Fall River MA",
    "ice cream truck New Bedford MA",
    "ice cream truck Brockton MA",
    "ice cream truck Malden MA",
    "ice cream truck Medford MA",
    "ice cream truck Peabody MA",
    "ice cream truck Salem MA",
    "ice cream truck Waltham MA",
    "ice cream truck Haverhill MA",
    "ice cream truck Lawrence MA",
    "ice cream truck Revere MA",
    "ice cream truck Methuen MA",
    "ice cream truck Framingham MA",
    "ice cream truck Arlington MA",
    "ice cream truck Belmont MA",
    "ice cream truck Burlington MA",
    "ice cream truck Lexington MA",
    "ice cream truck Concord MA",
    "ice cream truck Woburn MA",
    "ice cream truck Needham MA",
    "ice cream truck Wellesley MA",
    "ice cream truck Natick MA",
    "ice cream truck Norwood MA",
    "ice cream truck Canton MA",
    "ice cream truck Dedham MA",
    "ice cream truck Westwood MA",
    "ice cream truck Randolph MA",
    "ice cream truck Stoughton MA",
    "ice cream truck Weymouth MA",
    "ice cream truck Marshfield MA",
    "ice cream truck Plymouth MA",
    "ice cream truck Hingham MA",
    "ice cream truck Scituate MA",
    "ice cream truck Cohasset MA",
    "ice cream truck Milton MA",
    "ice cream truck Hyde Park MA",
    "ice cream truck Roslindale MA",
    "ice cream truck Jamaica Plain MA",
    "ice cream truck Dorchester MA",
    "ice cream truck South Boston MA",
    "ice cream truck East Boston MA",
    "ice cream truck Charlestown MA",

    // ── Greater Boston Area ────────────────────────────────────────────────
    "ice cream truck Greater Boston",
    "ice cream truck MetroWest MA",
    "ice cream truck North Shore MA",
    "ice cream truck South Shore MA",
    "ice cream truck Cape Cod MA",
    "ice cream truck Central Massachusetts",

    // ── Vehicle Type ──────────────────────────────────────────────────────
    "ice cream truck rental",
    "ice cream van rental Massachusetts",
    "soft serve ice cream truck Massachusetts",
    "novelty ice cream truck Massachusetts",
    "ice cream bike rental Massachusetts",

    // ── Long Tail / High Intent ────────────────────────────────────────────
    "how much does it cost to rent an ice cream truck in Massachusetts",
    "rent an ice cream truck for a party Boston",
    "ice cream truck for kids birthday party Massachusetts",
    "ice cream truck for 100 guests Massachusetts",
    "ice cream truck for 200 guests Massachusetts",
    "ice cream truck for large events Massachusetts",
    "ice cream truck with server Massachusetts",
    "ice cream truck with attendant MA",
    "all inclusive ice cream truck party Massachusetts",
    "ice cream truck party package Massachusetts",
    "ice cream truck with unlimited servings Massachusetts",
    "ice cream truck catering price Massachusetts",
    "ice cream truck quote Massachusetts",

    // ── Competitive ────────────────────────────────────────────────────────
    "ice cream catering Massachusetts",
    "frozen dessert catering Massachusetts",
    "gelato cart rental Massachusetts",
    "dessert catering Boston",
    "sweet catering Massachusetts",
    "frozen treats catering MA",
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
  startingPrice: 190,
  currency: "USD",
} as const;

export type BusinessConfig = typeof BUSINESS_CONFIG;
