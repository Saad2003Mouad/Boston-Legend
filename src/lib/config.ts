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
  domain: "https://americanlegendicecreamtruck.com",

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
    // ── Brand ─────────────────────────────────────────────────────────────
    "American Legend Ice Cream Truck",
    "American Legend Ice Cream",
    "American Legend",
    "American Legend Ice Cream Truck New England",
    "americanlegendicecreamtruck",
    "American Legend Ice Cream Truck Boston",

    // ── Core Service ──────────────────────────────────────────────────────
    "ice cream truck rental New England",
    "ice cream truck rental NE",
    "ice cream truck catering New England",
    "ice cream truck catering NE",
    "ice cream truck for hire New England",
    "ice cream truck for hire NE",
    "ice cream truck booking New England",
    "mobile ice cream catering New England",
    "mobile ice cream truck New England",
    "premium ice cream truck New England",
    "best ice cream truck New England",
    "ice cream truck service New England",
    "ice cream truck company New England",
    "professional ice cream truck New England",
    "luxury ice cream truck New England",

    // ── Near Me ───────────────────────────────────────────────────────────
    "ice cream truck near me",
    "ice cream truck rental near me",
    "ice cream truck catering near me",
    "ice cream catering near me New England",
    "ice cream truck hire near me",
    "mobile ice cream near me",

    // ── Events & Occasions ────────────────────────────────────────────────
    "ice cream truck birthday party New England",
    "ice cream truck birthday party Boston",
    "birthday party ice cream truck NE",
    "ice cream truck for birthday",
    "corporate ice cream truck catering New England",
    "corporate ice cream truck catering Boston",
    "corporate event ice cream truck NE",
    "office party ice cream truck New England",
    "wedding ice cream truck New England",
    "wedding ice cream truck Boston",
    "ice cream truck for weddings NE",
    "wedding dessert catering New England",
    "ice cream truck school event New England",
    "school ice cream day New England",
    "end of school year ice cream truck",
    "ice cream truck school party NE",
    "ice cream truck graduation party New England",
    "graduation party catering NE",
    "ice cream truck company picnic New England",
    "company picnic catering Boston",
    "ice cream truck block party New England",
    "block party ice cream truck NE",
    "ice cream truck community event New England",
    "ice cream truck fundraiser New England",
    "fundraiser ice cream truck NE",
    "ice cream truck festival New England",
    "ice cream truck grand opening New England",
    "business opening ice cream truck NE",
    "ice cream truck marketing event New England",
    "ice cream truck product launch NE",
    "ice cream truck baby shower New England",
    "baby shower catering New England",
    "ice cream truck bridal shower NE",
    "bridal shower dessert catering New England",
    "ice cream truck retirement party NE",
    "retirement party catering New England",
    "ice cream truck anniversary party NE",
    "ice cream truck summer camp New England",
    "summer camp ice cream day NE",
    "ice cream truck family reunion New England",
    "family reunion catering NE",
    "ice cream truck church event New England",
    "ice cream truck nonprofit event NE",
    "ice cream truck customer appreciation event New England",
    "employee appreciation ice cream truck NE",

    // ── Cities & Regions ──────────────────────────────────────────────────
    "ice cream truck Boston NE",
    "ice cream truck Cambridge NE",
    "ice cream truck Somerville NE",
    "ice cream truck Newton NE",
    "ice cream truck Brookline NE",
    "ice cream truck Quincy NE",
    "ice cream truck Worcester NE",
    "ice cream truck Springfield NE",
    "ice cream truck Lowell NE",
    "ice cream truck Lynn NE",
    "ice cream truck Fall River NE",
    "ice cream truck New Bedford NE",
    "ice cream truck Brockton NE",
    "ice cream truck Malden NE",
    "ice cream truck Medford NE",
    "ice cream truck Peabody NE",
    "ice cream truck Salem NE",
    "ice cream truck Waltham NE",
    "ice cream truck Haverhill NE",
    "ice cream truck Lawrence NE",
    "ice cream truck Revere NE",
    "ice cream truck Methuen NE",
    "ice cream truck Framingham NE",
    "ice cream truck Arlington NE",
    "ice cream truck Belmont NE",
    "ice cream truck Burlington NE",
    "ice cream truck Lexington NE",
    "ice cream truck Concord NE",
    "ice cream truck Woburn NE",
    "ice cream truck Needham NE",
    "ice cream truck Wellesley NE",
    "ice cream truck Natick NE",
    "ice cream truck Norwood NE",
    "ice cream truck Canton NE",
    "ice cream truck Dedham NE",
    "ice cream truck Westwood NE",
    "ice cream truck Randolph NE",
    "ice cream truck Stoughton NE",
    "ice cream truck Weymouth NE",
    "ice cream truck Marshfield NE",
    "ice cream truck Plymouth NE",
    "ice cream truck Hingham NE",
    "ice cream truck Scituate NE",
    "ice cream truck Cohasset NE",
    "ice cream truck Milton NE",
    "ice cream truck Hyde Park NE",
    "ice cream truck Roslindale NE",
    "ice cream truck Jamaica Plain NE",
    "ice cream truck Dorchester NE",
    "ice cream truck South Boston NE",
    "ice cream truck East Boston NE",
    "ice cream truck Charlestown NE",

    // ── Greater Boston Area ────────────────────────────────────────────────
    "ice cream truck Greater Boston",
    "ice cream truck MetroWest NE",
    "ice cream truck North Shore NE",
    "ice cream truck South Shore NE",
    "ice cream truck Cape Cod NE",
    "ice cream truck Central New England",

    // ── Vehicle Type ──────────────────────────────────────────────────────
    "ice cream truck rental",
    "ice cream van rental New England",
    "soft serve ice cream truck New England",
    "novelty ice cream truck New England",
    "ice cream bike rental New England",

    // ── Long Tail / High Intent ────────────────────────────────────────────
    "how much does it cost to rent an ice cream truck in New England",
    "rent an ice cream truck for a party Boston",
    "ice cream truck for kids birthday party New England",
    "ice cream truck for 100 guests New England",
    "ice cream truck for 200 guests New England",
    "ice cream truck for large events New England",
    "ice cream truck with server New England",
    "ice cream truck with attendant NE",
    "all inclusive ice cream truck party New England",
    "ice cream truck party package New England",
    "ice cream truck with unlimited servings New England",
    "ice cream truck catering price New England",
    "ice cream truck quote New England",

    // ── Competitive ────────────────────────────────────────────────────────
    "ice cream catering New England",
    "frozen dessert catering New England",
    "gelato cart rental New England",
    "dessert catering Boston",
    "sweet catering New England",
    "frozen treats catering NE",
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
