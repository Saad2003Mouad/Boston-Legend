// ============================================================
// MASSACHUSETTS CITIES DATA — 100+ CITIES
// Full dataset for programmatic SEO city pages
// ============================================================

export type CityTier = 1 | 2 | 3;

export type CityData = {
  slug: string;
  name: string;
  county: string;
  region: string;
  population?: number;
  lat: number;
  lng: number;

  // SEO
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubline: string;
  localIntro: string;
  localKeywords?: string[];

  // Content
  neighborhoods?: string[];
  nearbyAreas: string[];
  zipCodes?: string[];
  landmarkMentions?: string[];
  localFAQs: { question: string; answer: string }[];

  // Visual
  heroImageQuery: string; // AI image generation prompt

  // Tier system
  tier: CityTier;
  isTopCity: boolean;
  priorityScore: number;
};

export const MASSACHUSETTS_CITIES: CityData[] = [
  // ─── TIER 1 — FLAGSHIP CITIES ──────────────────────────────
  {
    slug: "boston",
    name: "Boston",
    zipCodes: [
      "02108",
      "02109",
      "02110",
      "02111",
      "02112",
      "02113",
      "02114",
      "02115",
      "02116",
      "02117",
      "02118",
      "02123",
      "02127",
      "02128",
      "02133",
      "02163",
      "02196",
      "02199",
      "02201",
      "02203",
      "02204",
      "02205",
      "02206",
      "02210",
      "02211",
      "02212",
      "02215",
      "02217",
      "02222",
      "02241",
      "02266",
      "02283",
      "02284",
      "02293",
      "02295",
      "02297",
      "02298",
      "02216",
    ],
    county: "Suffolk County",
    region: "Greater Boston",
    population: 675647,
    lat: 42.3601,
    lng: -71.0589,
    metaTitle:
      "Ice Cream Truck Rental in Boston, MA | American Legend Ice Cream Truck | Book Now",
    metaDescription:
      "Premium ice cream truck catering in Boston, MA. Serving all Boston neighborhoods for birthdays, corporate events, weddings & more. Call 617-999-3803 for a free quote.",
    heroHeadline: "Boston's Favorite Ice Cream Truck",
    heroSubline:
      "Serving every Boston neighborhood — from Back Bay to Dorchester. Premium ice cream catering for birthdays, corporate events, weddings, and every celebration.",
    localIntro:
      "American Legend Ice Cream Truck is Boston's premier mobile ice cream catering service, proudly serving the entire city and its surrounding neighborhoods. Whether you're planning a birthday party in Beacon Hill, a corporate employee appreciation day in the Financial District, a wedding reception near the Charles River, or a school event in Dorchester — we bring premium, freshly-served ice cream directly to your event. Our professional team arrives on time, sets up quickly, and delivers an unforgettable experience for every guest. Boston deserves the best, and that's exactly what we deliver.",
    neighborhoods: [
      "Back Bay",
      "South End",
      "Beacon Hill",
      "Fenway",
      "Dorchester",
      "Jamaica Plain",
      "Roxbury",
      "Charlestown",
      "East Boston",
      "South Boston",
      "Allston",
      "Brighton",
      "Hyde Park",
      "Mattapan",
      "Roslindale",
      "West Roxbury",
    ],
    nearbyAreas: ["Cambridge", "Somerville", "Brookline", "Newton", "Quincy"],
    landmarkMentions: [
      "Fenway Park",
      "Boston Common",
      "Charles River",
      "Faneuil Hall",
    ],
    localFAQs: [
      {
        question: "Do you serve ice cream trucks in all Boston neighborhoods?",
        answer:
          "Yes! American Legend Ice Cream Truck serves all Boston neighborhoods including Back Bay, South End, Beacon Hill, Fenway, Dorchester, Jamaica Plain, Charlestown, South Boston, Allston, Brighton, Hyde Park, Mattapan, Roslindale, and West Roxbury.",
      },
      {
        question: "How much does an ice cream truck rental cost in Boston?",
        answer:
          "Our Boston packages start at $190 for the Lumière (Sprinter Van, up to 30 guests) and go up to $825 for The Grand (200 guests, 3 hours). Custom quotes are available for larger events. Call 617-999-3803 or request a free quote online.",
      },
      {
        question: "Can you park an ice cream truck at a Boston venue or park?",
        answer:
          "We handle all logistics including parking coordination for your Boston event. We're experienced with Boston's streets and can work with your venue to find the best setup location.",
      },
      {
        question: "How far in advance should I book for a Boston event?",
        answer:
          "We recommend booking 2–4 weeks in advance for Boston events, especially during peak summer months (June–August). Boston weekends in July and August fill up quickly. Contact us early for the best date selection.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Boston Massachusetts golden hour skyline Charles River event celebration",
    tier: 1,
    isTopCity: true,
    priorityScore: 100,
  },
  {
    slug: "cambridge",
    name: "Cambridge",
    zipCodes: ["02138", "02139", "02140", "02141", "02142", "02238", "02239"],
    county: "Middlesex County",
    region: "Greater Boston",
    population: 118977,
    lat: 42.3736,
    lng: -71.1097,
    metaTitle: "Ice Cream Truck Rental in Cambridge, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Cambridge, MA. Serving Harvard Square, MIT, and all Cambridge neighborhoods. Free quotes available — call 617-999-3803.",
    heroHeadline: "Cambridge's Premier Ice Cream Truck",
    heroSubline:
      "From Harvard Square to MIT — serving Cambridge's vibrant neighborhoods with premium ice cream catering for every celebration.",
    localIntro:
      "American Legend Ice Cream Truck brings premium mobile ice cream catering to Cambridge, MA — home to Harvard University, MIT, and some of the most vibrant neighborhoods in New England. Whether you're planning a corporate event for a Cambridge tech company, a birthday celebration near Harvard Square, a school festival for Cambridge public schools, or a community block party in Inman Square — our professional team delivers an unforgettable experience. Cambridge's unique energy deserves a premium catering partner, and American Legend Ice Cream Truck is proud to serve every corner of this incredible city.",
    neighborhoods: [
      "Harvard Square",
      "Central Square",
      "Inman Square",
      "Kendall Square",
      "Porter Square",
      "East Cambridge",
      "Mid-Cambridge",
      "Cambridgeport",
      "Area IV",
    ],
    nearbyAreas: ["Boston", "Somerville", "Watertown", "Belmont", "Arlington"],
    landmarkMentions: [
      "Harvard University",
      "MIT",
      "Charles River",
      "Harvard Square",
    ],
    localFAQs: [
      {
        question:
          "Do you serve corporate events near Kendall Square in Cambridge?",
        answer:
          "Absolutely! Kendall Square is one of our most popular corporate event locations. We regularly serve tech companies, biotech firms, and startups in the Cambridge innovation district.",
      },
      {
        question: "Can you serve a Harvard or MIT event in Cambridge?",
        answer:
          "Yes! We frequently serve university events, student celebrations, faculty appreciation days, and orientation events at both Harvard and MIT. We're experienced working with university venues and their specific requirements.",
      },
      {
        question: "How much does an ice cream truck cost in Cambridge, MA?",
        answer:
          "Cambridge packages start at $190 for The Lumière (up to 30 guests) and scale up based on guest count and duration. Request a free quote online or call 617-999-3803.",
      },
      {
        question: "Do you serve all Cambridge neighborhoods?",
        answer:
          "Yes — we serve all Cambridge neighborhoods including Harvard Square, Central Square, Inman Square, Kendall Square, Porter Square, East Cambridge, and more.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Cambridge Massachusetts Harvard MIT golden hour celebration event",
    tier: 1,
    isTopCity: true,
    priorityScore: 95,
  },
  {
    slug: "worcester",
    name: "Worcester",
    zipCodes: [
      "01601",
      "01602",
      "01603",
      "01604",
      "01605",
      "01606",
      "01607",
      "01608",
      "01609",
      "01610",
      "01613",
      "01614",
      "01615",
      "01653",
      "01654",
      "01655",
    ],
    county: "Worcester County",
    region: "Central Massachusetts",
    population: 206518,
    lat: 42.2626,
    lng: -71.8023,
    metaTitle: "Ice Cream Truck Rental in Worcester, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Worcester, MA. Serving all Worcester neighborhoods for birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Worcester's Favorite Ice Cream Experience",
    heroSubline:
      "Central Massachusetts' premier ice cream truck catering service — serving all of Worcester for birthdays, corporate events, school festivals, and every celebration.",
    localIntro:
      "American Legend Ice Cream Truck is proud to serve Worcester, Massachusetts — the heart of Central Massachusetts and New England's second-largest city. From birthday parties in Shrewsbury Street to corporate events downtown, school festivals in the city's vibrant neighborhoods, and community gatherings at Elm Park — our premium mobile ice cream service brings joy to every occasion. Worcester's diverse, energetic community deserves a premium experience, and that's exactly what American Legend Ice Cream Truck delivers.",
    neighborhoods: [
      "Downtown Worcester",
      "Shrewsbury Street",
      "Elm Park",
      "Burncoat",
      "Greendale",
      "Main South",
      "Bell Hill",
    ],
    nearbyAreas: [
      "Shrewsbury",
      "Millbury",
      "Auburn",
      "Northborough",
      "Grafton",
    ],
    landmarkMentions: ["Elm Park", "Shrewsbury Street", "Hanover Theatre"],
    localFAQs: [
      {
        question: "Do you serve ice cream trucks in Worcester, MA?",
        answer:
          "Yes! American Legend Ice Cream Truck proudly serves all of Worcester, including downtown, Shrewsbury Street, Elm Park, and all surrounding neighborhoods.",
      },
      {
        question: "How much does an ice cream truck cost in Worcester?",
        answer:
          "Worcester packages start at $190 for The Lumière (up to 30 guests). Request a free quote online or call 617-999-3803 for personalized pricing.",
      },
      {
        question: "Can you serve large school events in Worcester?",
        answer:
          "Absolutely. Our Grand package serves up to 200 guests over 3 hours, making it perfect for Worcester school festivals, field days, and graduation celebrations.",
      },
      {
        question: "Do you travel to Worcester from Greater Boston?",
        answer:
          "Yes — we regularly serve Worcester and Central Massachusetts. A travel fee may apply depending on your event location. Contact us for a custom quote.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Worcester Massachusetts central MA golden hour celebration event community",
    tier: 1,
    isTopCity: true,
    priorityScore: 88,
  },

  // ─── TIER 2 — PRIORITY CITIES (sample — full list continues) ──
  {
    slug: "somerville",
    name: "Somerville",
    zipCodes: ["02143", "02144", "02145"],
    county: "Middlesex County",
    region: "Greater Boston",
    lat: 42.3876,
    lng: -71.0995,
    metaTitle: "Ice Cream Truck Rental in Somerville, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Somerville, MA. Serving Davis Square, Union Square & all Somerville neighborhoods. Call 617-999-3803.",
    heroHeadline: "Somerville's Sweet Spot",
    heroSubline:
      "From Davis Square to Union Square — bringing premium ice cream catering to every Somerville celebration.",
    localIntro:
      "American Legend Ice Cream Truck serves Somerville, MA — one of Greater Boston's most vibrant and community-focused cities. Perfect for Davis Square birthday parties, Union Square block parties, corporate events near Assembly Row, and school events throughout the city.",
    neighborhoods: [
      "Davis Square",
      "Union Square",
      "Assembly Row",
      "Ball Square",
      "Teele Square",
      "Winter Hill",
    ],
    nearbyAreas: ["Cambridge", "Medford", "Arlington", "Boston"],
    localFAQs: [
      {
        question: "Do you serve Davis Square in Somerville?",
        answer:
          "Yes! We serve all Somerville neighborhoods including Davis Square, Union Square, Assembly Row, and more. Call 617-999-3803 for availability.",
      },
      {
        question: "How much does an ice cream truck cost in Somerville?",
        answer:
          "Packages start at $190. Request a free quote online or call 617-999-3803.",
      },
      {
        question: "Can you serve Assembly Row events in Somerville?",
        answer:
          "Absolutely — Assembly Row corporate events are one of our specialties in the Somerville area.",
      },
      {
        question: "How far in advance should I book in Somerville?",
        answer:
          "2–4 weeks in advance is recommended for summer events. Somerville weekend dates fill quickly.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Somerville Massachusetts Davis Square golden hour",
    tier: 2,
    isTopCity: true,
    priorityScore: 82,
  },
  {
    slug: "newton",
    name: "Newton",
    zipCodes: ["02458"],
    county: "Middlesex County",
    region: "Greater Boston",
    lat: 42.337,
    lng: -71.2092,
    metaTitle: "Ice Cream Truck Rental in Newton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Newton, MA for birthdays, corporate events & more. Free quote — call 617-999-3803.",
    heroHeadline: "Newton's Premier Ice Cream Experience",
    heroSubline:
      "Serving Newton's villages with premium ice cream catering for every occasion.",
    localIntro:
      "American Legend Ice Cream Truck serves Newton, MA — home to beautiful neighborhoods, top schools, and vibrant community events. From Newtonville birthday parties to corporate events in Newton Upper Falls and school celebrations throughout the city, we deliver premium ice cream catering with professional service.",
    neighborhoods: [
      "Newtonville",
      "Newton Centre",
      "Newton Highlands",
      "West Newton",
      "Newton Corner",
      "Newton Upper Falls",
      "Waban",
      "Chestnut Hill",
    ],
    nearbyAreas: ["Brookline", "Waltham", "Needham", "Wellesley", "Boston"],
    localFAQs: [
      {
        question: "Do you serve all Newton villages?",
        answer:
          "Yes — we serve all of Newton's villages including Newtonville, Newton Centre, Newton Highlands, West Newton, and more.",
      },
      {
        question: "How much does ice cream truck catering cost in Newton?",
        answer:
          "Packages start at $190. Request a free quote online or call 617-999-3803.",
      },
      {
        question: "Do you serve school events in Newton?",
        answer:
          "Absolutely — Newton public and private school events are a specialty. Our Grand package handles up to 200 guests.",
      },
      {
        question: "Do you serve Newton for corporate events?",
        answer:
          "Yes — we regularly serve Newton corporate events, employee appreciation days, and company picnics.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Newton Massachusetts suburban golden hour birthday celebration",
    tier: 2,
    isTopCity: true,
    priorityScore: 79,
  },
  {
    slug: "quincy",
    name: "Quincy",
    zipCodes: ["02169", "02170", "02171", "02269"],
    county: "Norfolk County",
    region: "Greater Boston",
    lat: 42.2529,
    lng: -71.0023,
    metaTitle: "Ice Cream Truck Rental in Quincy, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Quincy, MA. Serving all Quincy neighborhoods for birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Quincy's Favorite Ice Cream Truck",
    heroSubline:
      "South Shore's premium ice cream truck catering — serving all of Quincy for every celebration.",
    localIntro:
      "American Legend Ice Cream Truck serves Quincy, MA — the City of Presidents and one of Greater Boston's most dynamic South Shore communities. Whether it's a Quincy Center birthday party, a North Quincy corporate event, or a community celebration near Wollaston Beach, we deliver premium ice cream catering with professional service.",
    neighborhoods: [
      "Quincy Center",
      "North Quincy",
      "Wollaston",
      "Quincy Point",
      "Merrymount",
      "Germantown",
      "Adams Shore",
      "Marina Bay",
    ],
    nearbyAreas: ["Braintree", "Milton", "Weymouth", "Brockton", "Boston"],
    localFAQs: [
      {
        question: "Do you serve Quincy for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Quincy including Quincy Center, North Quincy, Wollaston, and Marina Bay.",
      },
      {
        question: "Can you set up near Wollaston Beach in Quincy?",
        answer:
          "We can coordinate with outdoor venue locations. Contact us to discuss your Wollaston Beach event.",
      },
      {
        question: "How much does an ice cream truck cost in Quincy, MA?",
        answer:
          "Packages start at $190. Request a free quote online or call 617-999-3803.",
      },
      {
        question: "How far in advance should I book for a Quincy event?",
        answer:
          "2–4 weeks in advance is recommended, especially for summer weekend events.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Quincy Massachusetts South Shore golden hour",
    tier: 2,
    isTopCity: true,
    priorityScore: 76,
  },
  {
    slug: "brookline",
    name: "Brookline",
    zipCodes: ["02445", "02446"],
    county: "Norfolk County",
    region: "Greater Boston",
    lat: 42.3318,
    lng: -71.1212,
    metaTitle: "Ice Cream Truck Rental in Brookline, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Brookline, MA. Serving Coolidge Corner and all Brookline for birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Brookline's Premium Ice Cream Experience",
    heroSubline:
      "Serving Coolidge Corner, Brookline Village, and beyond with world-class ice cream catering.",
    localIntro:
      "American Legend Ice Cream Truck proudly serves Brookline, MA — one of Greater Boston's most sought-after communities. From elegant birthday parties near Coolidge Corner to corporate events downtown and school celebrations throughout Brookline, our premium service matches the high standards this community expects.",
    neighborhoods: [
      "Coolidge Corner",
      "Brookline Village",
      "Chestnut Hill",
      "Washington Square",
      "Longwood",
      "South Brookline",
    ],
    nearbyAreas: ["Boston", "Newton", "Cambridge", "Chestnut Hill"],
    localFAQs: [
      {
        question: "Do you serve Coolidge Corner events in Brookline?",
        answer:
          "Yes! Coolidge Corner and all Brookline neighborhoods are fully covered by American Legend Ice Cream Truck.",
      },
      {
        question: "How much does ice cream truck catering cost in Brookline?",
        answer:
          "Packages start at $190. Request a free quote online or call 617-999-3803.",
      },
      {
        question: "Do you serve Brookline school events?",
        answer:
          "Absolutely. We serve Brookline public and private school events including field days, fundraisers, and graduation celebrations.",
      },
      {
        question: "Can you serve Longwood Medical Area events in Brookline?",
        answer:
          "Yes — we serve medical campus events, hospital appreciation days, and healthcare corporate events in the Longwood area.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Brookline Massachusetts Coolidge Corner golden hour premium",
    tier: 2,
    isTopCity: true,
    priorityScore: 75,
  },
  {
    slug: "salem",
    name: "Salem",
    zipCodes: ["01970", "01971"],
    county: "Essex County",
    region: "North Shore",
    lat: 42.5195,
    lng: -70.8967,
    metaTitle: "Ice Cream Truck Rental in Salem, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Salem, MA. Serving all Salem events — birthdays, corporate, festivals & more. Call 617-999-3803.",
    heroHeadline: "Salem's Sweetest Celebration Upgrade",
    heroSubline:
      "From historic downtown to Pickering Wharf — premium ice cream catering for every Salem celebration.",
    localIntro:
      "American Legend Ice Cream Truck serves Salem, MA — the Witch City and one of Massachusetts' most historically rich and vibrant communities. Whether it's a summer birthday celebration near Pickering Wharf, a corporate event downtown, a school festival, or a Halloween season event, we bring premium ice cream service to every corner of Salem.",
    neighborhoods: [
      "Downtown Salem",
      "Pickering Wharf",
      "Derby Wharf",
      "South Salem",
      "North Salem",
      "Point Neighborhood",
    ],
    nearbyAreas: ["Beverly", "Peabody", "Marblehead", "Swampscott", "Danvers"],
    landmarkMentions: [
      "Salem Common",
      "Pickering Wharf",
      "Derby Wharf",
      "Peabody Essex Museum",
    ],
    localFAQs: [
      {
        question: "Do you serve Salem events during Halloween season?",
        answer:
          "Yes! Salem's Halloween season is one of our busiest periods. Book early — October dates fill up extremely fast for Salem events.",
      },
      {
        question: "How much does an ice cream truck cost in Salem, MA?",
        answer:
          "Packages start at $190. Request a free quote or call 617-999-3803.",
      },
      {
        question: "Can you serve outdoor events near Salem Common?",
        answer:
          "Yes — we regularly serve outdoor events near Salem Common and other Salem outdoor venues. Contact us to coordinate logistics.",
      },
      {
        question: "Do you serve corporate events in Salem?",
        answer:
          "Absolutely — Salem's growing business community is well-served by our corporate event packages.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Salem Massachusetts historic downtown North Shore golden hour",
    tier: 2,
    isTopCity: false,
    priorityScore: 72,
  },

  // ─── TIER 3 — STANDARD COVERAGE (sample entries) ────────────
  {
    slug: "medford",
    name: "Medford",
    zipCodes: ["02153", "02155"],
    county: "Middlesex County",
    region: "Greater Boston",
    lat: 42.4184,
    lng: -71.1062,
    metaTitle: "Ice Cream Truck Rental in Medford, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Medford, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Premium Ice Cream Catering in Medford, MA",
    heroSubline:
      "Serving all of Medford with professional ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Medford, MA with premium mobile ice cream catering. Whether it's a birthday party, corporate event, or school celebration, we deliver an unforgettable experience to every Medford neighborhood.",
    nearbyAreas: ["Somerville", "Arlington", "Malden", "Cambridge", "Woburn"],
    localFAQs: [
      {
        question: "Do you serve Medford for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Medford, MA. Call 617-999-3803 or request a free quote online.",
      },
      {
        question: "How much does an ice cream truck cost in Medford?",
        answer:
          "Packages start at $190 for up to 30 guests. Get a free quote online.",
      },
      {
        question: "What events do you serve in Medford?",
        answer:
          "We serve birthdays, corporate events, school events, block parties, weddings, and all celebrations in Medford.",
      },
      {
        question: "How far in advance should I book?",
        answer:
          "2–4 weeks in advance is recommended for Medford events during peak season.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Medford Massachusetts golden hour celebration",
    tier: 3,
    isTopCity: false,
    priorityScore: 65,
  },
  {
    slug: "waltham",
    name: "Waltham",
    zipCodes: ["02451", "02452", "02453", "02454"],
    county: "Middlesex County",
    region: "Greater Boston",
    lat: 42.3765,
    lng: -71.2356,
    metaTitle: "Ice Cream Truck Rental in Waltham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Waltham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Waltham, MA",
    heroSubline:
      "Serving all of Waltham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Waltham, MA with premium mobile ice cream catering for every occasion. From birthday parties to corporate employee appreciation days near Route 128 — we deliver.",
    nearbyAreas: ["Watertown", "Newton", "Belmont", "Lexington", "Burlington"],
    localFAQs: [
      {
        question: "Do you serve Waltham for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Waltham. Call 617-999-3803 or request a free quote online.",
      },
      {
        question: "Do you serve corporate events near Route 128 in Waltham?",
        answer:
          "Absolutely — Route 128 corporate campuses are a specialty for our Waltham events.",
      },
      {
        question: "How much does an ice cream truck cost in Waltham?",
        answer: "Packages start at $190. Get a free quote online or call us.",
      },
      {
        question: "How far in advance should I book in Waltham?",
        answer: "2–4 weeks is recommended for summer events.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Waltham Massachusetts corporate celebration golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 62,
  },
  {
    slug: "lynn",
    name: "Lynn",
    zipCodes: ["01901", "01902", "01903", "01904", "01905", "01910"],
    county: "Essex County",
    region: "North Shore",
    lat: 42.4668,
    lng: -70.9495,
    metaTitle: "Ice Cream Truck Rental in Lynn, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Lynn, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Lynn, MA",
    heroSubline: "Serving all of Lynn with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Lynn, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: ["Revere", "Saugus", "Swampscott", "Salem", "Peabody"],
    localFAQs: [
      {
        question: "Do you serve Lynn, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Lynn. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Lynn?",
        answer:
          "Packages start at $190 for up to 30 guests. Request a free quote.",
      },
      {
        question: "What events do you serve in Lynn?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Lynn, MA.",
      },
      {
        question: "How far in advance should I book?",
        answer: "2–4 weeks is recommended for peak summer dates.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Lynn Massachusetts North Shore golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 60,
  },
  {
    slug: "lowell",
    name: "Lowell",
    zipCodes: ["01850", "01851", "01852", "01853", "01854"],
    county: "Middlesex County",
    region: "Merrimack Valley",
    lat: 42.6334,
    lng: -71.3162,
    metaTitle: "Ice Cream Truck Rental in Lowell, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Lowell, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Lowell, MA",
    heroSubline:
      "Serving Lowell and the Merrimack Valley with premium ice cream catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Lowell, MA with premium mobile ice cream catering. From downtown Lowell corporate events to school celebrations and birthday parties throughout the city.",
    nearbyAreas: [
      "Chelmsford",
      "Tewksbury",
      "Billerica",
      "Dracut",
      "Haverhill",
    ],
    localFAQs: [
      {
        question: "Do you serve Lowell, MA?",
        answer:
          "Yes! We serve Lowell and the surrounding Merrimack Valley area. Call 617-999-3803.",
      },
      {
        question: "How much does ice cream truck catering cost in Lowell?",
        answer:
          "Packages start at $190. Travel fees may apply — request a free custom quote.",
      },
      {
        question: "What events do you serve in Lowell?",
        answer:
          "Birthdays, corporate events, school events, festivals, and community celebrations.",
      },
      {
        question: "Do you serve events at Boarding House Park in Lowell?",
        answer:
          "Yes — we can coordinate service at outdoor venues including Lowell's parks and public spaces.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Lowell Massachusetts Merrimack Valley golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 58,
  },
  {
    slug: "springfield",
    name: "Springfield",
    zipCodes: [
      "01101",
      "01102",
      "01103",
      "01104",
      "01105",
      "01107",
      "01108",
      "01109",
      "01111",
      "01115",
      "01118",
      "01119",
      "01128",
      "01129",
      "01138",
      "01139",
      "01144",
      "01152",
      "01199",
      "01133",
    ],
    county: "Hampden County",
    region: "Pioneer Valley",
    lat: 42.1015,
    lng: -72.5898,
    metaTitle: "Ice Cream Truck Rental in Springfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Springfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Springfield, MA",
    heroSubline:
      "Bringing premium ice cream catering to Western Massachusetts.",
    localIntro:
      "American Legend Ice Cream Truck serves Springfield, MA and the Pioneer Valley with premium mobile ice cream catering. From birthday celebrations to large corporate events in Western Massachusetts, we travel the distance.",
    nearbyAreas: [
      "Chicopee",
      "Holyoke",
      "West Springfield",
      "Agawam",
      "Longmeadow",
    ],
    localFAQs: [
      {
        question: "Do you travel to Springfield, MA?",
        answer:
          "Yes! We serve Springfield and the Pioneer Valley. A travel fee applies — request a custom quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Springfield?",
        answer:
          "Packages start at $190 plus travel fee. Request a free quote online or call 617-999-3803.",
      },
      {
        question: "What events do you serve in Springfield?",
        answer:
          "Birthdays, corporate events, school events, festivals, and community celebrations in Western MA.",
      },
      {
        question: "Can you serve Basketball Hall of Fame area events?",
        answer:
          "Yes — we can coordinate service at Springfield venues and event spaces.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Springfield Massachusetts Pioneer Valley Western MA golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 55,
  },
  {
    slug: "framingham",
    name: "Framingham",
    zipCodes: ["01701", "01702", "01703", "01704", "01705"],
    county: "Middlesex County",
    region: "MetroWest",
    lat: 42.2793,
    lng: -71.4162,
    metaTitle: "Ice Cream Truck Rental in Framingham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Framingham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Framingham, MA",
    heroSubline:
      "Serving MetroWest Massachusetts with premium ice cream catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Framingham, MA and the MetroWest region with premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [
      "Natick",
      "Ashland",
      "Southborough",
      "Hopkinton",
      "Marlborough",
    ],
    localFAQs: [
      {
        question: "Do you serve Framingham for ice cream truck rentals?",
        answer:
          "Yes! We serve Framingham and all of MetroWest. Call 617-999-3803.",
      },
      {
        question: "How much does ice cream truck catering cost in Framingham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "Do you serve corporate events in Framingham?",
        answer:
          "Yes — MetroWest corporate events including Framingham office parks are well-served by our packages.",
      },
      {
        question: "How far is Framingham from your base?",
        answer:
          "We regularly travel to Framingham and the MetroWest area. A small travel fee may apply depending on event details.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Framingham Massachusetts MetroWest golden hour celebration",
    tier: 3,
    isTopCity: false,
    priorityScore: 58,
  },
  {
    slug: "brockton",
    name: "Brockton",
    zipCodes: ["02301", "02302", "02303", "02304", "02305"],
    county: "Plymouth County",
    region: "South Shore",
    lat: 42.0834,
    lng: -71.0184,
    metaTitle: "Ice Cream Truck Rental in Brockton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Brockton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Brockton, MA",
    heroSubline:
      "Serving Brockton and Plymouth County with premium ice cream catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Brockton, MA with premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations throughout Plymouth County.",
    nearbyAreas: ["Stoughton", "Avon", "Abington", "Whitman", "Randolph"],
    localFAQs: [
      {
        question: "Do you serve Brockton for ice cream truck rentals?",
        answer:
          "Yes! We serve Brockton and all of Plymouth County. Call 617-999-3803.",
      },
      {
        question: "How much does ice cream truck catering cost in Brockton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Brockton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and community celebrations.",
      },
      {
        question: "How far in advance should I book?",
        answer:
          "2–4 weeks in advance is recommended for summer events in Brockton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Brockton Massachusetts South Shore golden hour community celebration",
    tier: 3,
    isTopCity: false,
    priorityScore: 55,
  },
  {
    slug: "plymouth",
    name: "Plymouth",
    zipCodes: ["02360", "02361", "02362"],
    county: "Plymouth County",
    region: "South Shore",
    lat: 41.9584,
    lng: -70.6673,
    metaTitle: "Ice Cream Truck Rental in Plymouth, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Plymouth, MA. Serving America's Hometown for birthdays, events & more. Call 617-999-3803.",
    heroHeadline: "Plymouth's Favorite Ice Cream Experience",
    heroSubline:
      "Serving America's Hometown with premium ice cream catering for every celebration.",
    localIntro:
      "American Legend Ice Cream Truck serves Plymouth, MA — America's Hometown. From birthday parties near Plymouth Harbor to corporate events and school celebrations throughout this historic coastal city, we deliver premium ice cream service with a smile.",
    nearbyAreas: ["Kingston", "Duxbury", "Marshfield", "Carver", "Bourne"],
    landmarkMentions: ["Plymouth Rock", "Plymouth Harbor", "Plimoth Patuxent"],
    localFAQs: [
      {
        question: "Do you serve Plymouth, MA?",
        answer:
          "Yes! We serve Plymouth and the surrounding South Shore area. Call 617-999-3803.",
      },
      {
        question: "How much does ice cream truck catering cost in Plymouth?",
        answer:
          "Packages start at $190. Travel fees may apply — request a free custom quote.",
      },
      {
        question: "Can you serve outdoor events near Plymouth Harbor?",
        answer:
          "Yes — we coordinate outdoor venue events including waterfront locations in Plymouth.",
      },
      {
        question: "Do you serve Plymouth school events?",
        answer:
          "Yes — school field days, graduation celebrations, and festivals in Plymouth are a specialty.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Plymouth Massachusetts coastal harbor golden hour summer celebration",
    tier: 3,
    isTopCity: false,
    priorityScore: 52,
  },
  {
    slug: "revere",
    name: "Revere",
    zipCodes: ["02151"],
    county: "Suffolk County",
    region: "Greater Boston",
    lat: 42.4084,
    lng: -71.012,
    metaTitle: "Ice Cream Truck Rental in Revere, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Revere, MA. Serving Revere Beach and all neighborhoods. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Revere, MA",
    heroSubline:
      "Serving Revere Beach and all neighborhoods with premium ice cream catering.",
    localIntro:
      "American Legend Ice Cream Truck is based in Revere, MA — giving us unparalleled access to serve the city and surrounding communities. From Revere Beach events to birthday parties and corporate celebrations throughout the city, we deliver premium ice cream with hometown pride.",
    neighborhoods: [
      "Revere Beach",
      "Point of Pines",
      "Beachmont",
      "Wonderland",
      "North Revere",
    ],
    nearbyAreas: ["Lynn", "Winthrop", "Chelsea", "Boston", "Saugus"],
    landmarkMentions: ["Revere Beach", "Wonderland Station"],
    localFAQs: [
      {
        question: "Is American Legend Ice Cream Truck based in Revere?",
        answer:
          "Yes! Our base of operations is in Revere, MA — meaning we can serve Revere events with the fastest response time.",
      },
      {
        question: "Do you serve Revere Beach events?",
        answer:
          "Yes — Revere Beach outdoor events and celebrations are a specialty. Contact us to coordinate logistics for beachside events.",
      },
      {
        question: "How much does ice cream truck catering cost in Revere?",
        answer:
          "Packages start at $190 with no travel fee for Revere events. Request a free quote.",
      },
      {
        question: "What events do you serve in Revere?",
        answer:
          "Birthdays, corporate events, school events, block parties, beach events, and all celebrations in Revere.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Revere Massachusetts Revere Beach golden hour summer",
    tier: 2,
    isTopCity: true,
    priorityScore: 70,
  },
  // NOTE: Additional cities follow the same pattern

  {
    slug: "agawam",
    name: "Agawam",
    zipCodes: ["01001"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.140549,
    lng: -72.788661,
    metaTitle: "Ice Cream Truck Rental in Agawam, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Agawam, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Agawam, MA",
    heroSubline: "Serving all of Agawam with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Agawam, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Agawam, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Agawam. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Agawam?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Agawam?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Agawam.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Agawam Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "amherst",
    name: "Amherst",
    zipCodes: ["01002", "01003", "01004"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.367092,
    lng: -72.464571,
    metaTitle: "Ice Cream Truck Rental in Amherst, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Amherst, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Amherst, MA",
    heroSubline:
      "Serving all of Amherst with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Amherst, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Amherst, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Amherst. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Amherst?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Amherst?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Amherst.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Amherst Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "barre",
    name: "Barre",
    zipCodes: ["01005"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.32916,
    lng: -72.139465,
    metaTitle: "Ice Cream Truck Rental in Barre, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Barre, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Barre, MA",
    heroSubline: "Serving all of Barre with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Barre, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Barre, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Barre. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Barre?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Barre?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Barre.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Barre Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "belchertown",
    name: "Belchertown",
    zipCodes: ["01007"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.280267,
    lng: -72.402056,
    metaTitle: "Ice Cream Truck Rental in Belchertown, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Belchertown, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Belchertown, MA",
    heroSubline:
      "Serving all of Belchertown with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Belchertown, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Belchertown, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Belchertown. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Belchertown?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Belchertown?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Belchertown.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Belchertown Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "blandford",
    name: "Blandford",
    zipCodes: ["01008"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.177833,
    lng: -72.958359,
    metaTitle: "Ice Cream Truck Rental in Blandford, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Blandford, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Blandford, MA",
    heroSubline:
      "Serving all of Blandford with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Blandford, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Blandford, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Blandford. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Blandford?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Blandford?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Blandford.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Blandford Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "bondsville",
    name: "Bondsville",
    zipCodes: ["01009"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.206092,
    lng: -72.340486,
    metaTitle: "Ice Cream Truck Rental in Bondsville, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Bondsville, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Bondsville, MA",
    heroSubline:
      "Serving all of Bondsville with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Bondsville, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Bondsville, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Bondsville. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Bondsville?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Bondsville?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Bondsville.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Bondsville Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "brimfield",
    name: "Brimfield",
    zipCodes: ["01010"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.108585,
    lng: -72.20448,
    metaTitle: "Ice Cream Truck Rental in Brimfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Brimfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Brimfield, MA",
    heroSubline:
      "Serving all of Brimfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Brimfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Brimfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Brimfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Brimfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Brimfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Brimfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Brimfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "chester",
    name: "Chester",
    zipCodes: ["01011"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.294259,
    lng: -72.952776,
    metaTitle: "Ice Cream Truck Rental in Chester, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Chester, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Chester, MA",
    heroSubline:
      "Serving all of Chester with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Chester, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Chester, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Chester. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Chester?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Chester?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Chester.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Chester Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "chesterfield",
    name: "Chesterfield",
    zipCodes: ["01012"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.392274,
    lng: -72.825607,
    metaTitle:
      "Ice Cream Truck Rental in Chesterfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Chesterfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Chesterfield, MA",
    heroSubline:
      "Serving all of Chesterfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Chesterfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Chesterfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Chesterfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Chesterfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Chesterfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Chesterfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Chesterfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "chicopee",
    name: "Chicopee",
    zipCodes: ["01013", "01014", "01020", "01021", "01022"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.161492,
    lng: -72.667341,
    metaTitle: "Ice Cream Truck Rental in Chicopee, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Chicopee, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Chicopee, MA",
    heroSubline:
      "Serving all of Chicopee with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Chicopee, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Chicopee, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Chicopee. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Chicopee?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Chicopee?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Chicopee.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Chicopee Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "cummington",
    name: "Cummington",
    zipCodes: ["01026"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.428617,
    lng: -72.909841,
    metaTitle: "Ice Cream Truck Rental in Cummington, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Cummington, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Cummington, MA",
    heroSubline:
      "Serving all of Cummington with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Cummington, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Cummington, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Cummington. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Cummington?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Cummington?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Cummington.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Cummington Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "easthampton",
    name: "Easthampton",
    zipCodes: ["01027"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.368303,
    lng: -72.768839,
    metaTitle: "Ice Cream Truck Rental in Easthampton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Easthampton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Easthampton, MA",
    heroSubline:
      "Serving all of Easthampton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Easthampton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Easthampton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Easthampton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Easthampton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Easthampton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Easthampton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Easthampton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "east-longmeadow",
    name: "East Longmeadow",
    zipCodes: ["01028"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.062009,
    lng: -72.49874,
    metaTitle:
      "Ice Cream Truck Rental in East Longmeadow, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in East Longmeadow, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in East Longmeadow, MA",
    heroSubline:
      "Serving all of East Longmeadow with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves East Longmeadow, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve East Longmeadow, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of East Longmeadow. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in East Longmeadow?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in East Longmeadow?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in East Longmeadow.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck East Longmeadow Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "east-otis",
    name: "East Otis",
    zipCodes: ["01029"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.190904,
    lng: -73.051661,
    metaTitle: "Ice Cream Truck Rental in East Otis, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in East Otis, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in East Otis, MA",
    heroSubline:
      "Serving all of East Otis with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves East Otis, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve East Otis, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of East Otis. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in East Otis?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in East Otis?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in East Otis.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck East Otis Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "feeding-hills",
    name: "Feeding Hills",
    zipCodes: ["01030"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.189335,
    lng: -72.79774,
    metaTitle:
      "Ice Cream Truck Rental in Feeding Hills, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Feeding Hills, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Feeding Hills, MA",
    heroSubline:
      "Serving all of Feeding Hills with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Feeding Hills, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Feeding Hills, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Feeding Hills. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Feeding Hills?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Feeding Hills?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Feeding Hills.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Feeding Hills Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "gilbertville",
    name: "Gilbertville",
    zipCodes: ["01031"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.352554,
    lng: -72.205724,
    metaTitle:
      "Ice Cream Truck Rental in Gilbertville, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Gilbertville, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Gilbertville, MA",
    heroSubline:
      "Serving all of Gilbertville with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Gilbertville, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Gilbertville, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Gilbertville. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Gilbertville?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Gilbertville?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Gilbertville.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Gilbertville Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "goshen",
    name: "Goshen",
    zipCodes: ["01032"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.443837,
    lng: -72.819446,
    metaTitle: "Ice Cream Truck Rental in Goshen, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Goshen, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Goshen, MA",
    heroSubline: "Serving all of Goshen with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Goshen, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Goshen, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Goshen. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Goshen?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Goshen?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Goshen.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Goshen Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "granby",
    name: "Granby",
    zipCodes: ["01033"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.262285,
    lng: -72.504086,
    metaTitle: "Ice Cream Truck Rental in Granby, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Granby, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Granby, MA",
    heroSubline: "Serving all of Granby with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Granby, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Granby, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Granby. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Granby?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Granby?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Granby.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Granby Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "granville",
    name: "Granville",
    zipCodes: ["01034"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.112748,
    lng: -72.952003,
    metaTitle: "Ice Cream Truck Rental in Granville, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Granville, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Granville, MA",
    heroSubline:
      "Serving all of Granville with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Granville, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Granville, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Granville. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Granville?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Granville?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Granville.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Granville Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "hadley",
    name: "Hadley",
    zipCodes: ["01035"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.356804,
    lng: -72.576613,
    metaTitle: "Ice Cream Truck Rental in Hadley, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Hadley, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Hadley, MA",
    heroSubline: "Serving all of Hadley with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Hadley, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Hadley, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Hadley. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Hadley?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Hadley?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Hadley.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Hadley Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "hampden",
    name: "Hampden",
    zipCodes: ["01036"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.067614,
    lng: -72.417507,
    metaTitle: "Ice Cream Truck Rental in Hampden, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Hampden, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Hampden, MA",
    heroSubline:
      "Serving all of Hampden with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Hampden, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Hampden, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Hampden. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Hampden?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Hampden?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Hampden.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Hampden Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "hardwick",
    name: "Hardwick",
    zipCodes: ["01037"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.347856,
    lng: -72.225251,
    metaTitle: "Ice Cream Truck Rental in Hardwick, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Hardwick, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Hardwick, MA",
    heroSubline:
      "Serving all of Hardwick with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Hardwick, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Hardwick, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Hardwick. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Hardwick?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Hardwick?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Hardwick.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Hardwick Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "hatfield",
    name: "Hatfield",
    zipCodes: ["01038"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.387269,
    lng: -72.643081,
    metaTitle: "Ice Cream Truck Rental in Hatfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Hatfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Hatfield, MA",
    heroSubline:
      "Serving all of Hatfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Hatfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Hatfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Hatfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Hatfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Hatfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Hatfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Hatfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "haydenville",
    name: "Haydenville",
    zipCodes: ["01039"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.35641,
    lng: -72.682127,
    metaTitle: "Ice Cream Truck Rental in Haydenville, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Haydenville, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Haydenville, MA",
    heroSubline:
      "Serving all of Haydenville with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Haydenville, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Haydenville, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Haydenville. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Haydenville?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Haydenville?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Haydenville.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Haydenville Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "holyoke",
    name: "Holyoke",
    zipCodes: ["01040", "01041"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.198291,
    lng: -72.64207,
    metaTitle: "Ice Cream Truck Rental in Holyoke, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Holyoke, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Holyoke, MA",
    heroSubline:
      "Serving all of Holyoke with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Holyoke, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Holyoke, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Holyoke. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Holyoke?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Holyoke?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Holyoke.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Holyoke Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "huntington",
    name: "Huntington",
    zipCodes: ["01050"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.313427,
    lng: -72.903677,
    metaTitle: "Ice Cream Truck Rental in Huntington, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Huntington, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Huntington, MA",
    heroSubline:
      "Serving all of Huntington with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Huntington, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Huntington, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Huntington. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Huntington?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Huntington?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Huntington.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Huntington Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "leeds",
    name: "Leeds",
    zipCodes: ["01053"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.353838,
    lng: -72.704385,
    metaTitle: "Ice Cream Truck Rental in Leeds, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Leeds, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Leeds, MA",
    heroSubline: "Serving all of Leeds with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Leeds, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Leeds, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Leeds. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Leeds?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Leeds?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Leeds.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Leeds Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "leverett",
    name: "Leverett",
    zipCodes: ["01054"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.474681,
    lng: -72.467543,
    metaTitle: "Ice Cream Truck Rental in Leverett, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Leverett, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Leverett, MA",
    heroSubline:
      "Serving all of Leverett with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Leverett, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Leverett, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Leverett. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Leverett?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Leverett?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Leverett.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Leverett Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "ludlow",
    name: "Ludlow",
    zipCodes: ["01056"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.173276,
    lng: -72.627038,
    metaTitle: "Ice Cream Truck Rental in Ludlow, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Ludlow, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Ludlow, MA",
    heroSubline: "Serving all of Ludlow with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Ludlow, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Ludlow, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Ludlow. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Ludlow?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Ludlow?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Ludlow.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Ludlow Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "monson",
    name: "Monson",
    zipCodes: ["01057"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.095323,
    lng: -72.282063,
    metaTitle: "Ice Cream Truck Rental in Monson, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Monson, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Monson, MA",
    heroSubline: "Serving all of Monson with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Monson, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Monson, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Monson. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Monson?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Monson?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Monson.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Monson Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-amherst",
    name: "North Amherst",
    zipCodes: ["01059"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.369562,
    lng: -72.63599,
    metaTitle:
      "Ice Cream Truck Rental in North Amherst, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Amherst, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Amherst, MA",
    heroSubline:
      "Serving all of North Amherst with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Amherst, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve North Amherst, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Amherst. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Amherst?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Amherst?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Amherst.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Amherst Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "northampton",
    name: "Northampton",
    zipCodes: ["01060", "01061", "01063"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.415154,
    lng: -72.76927,
    metaTitle: "Ice Cream Truck Rental in Northampton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Northampton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Northampton, MA",
    heroSubline:
      "Serving all of Northampton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Northampton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Northampton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Northampton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Northampton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Northampton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Northampton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Northampton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "florence",
    name: "Florence",
    zipCodes: ["01062"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.328838,
    lng: -72.845227,
    metaTitle: "Ice Cream Truck Rental in Florence, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Florence, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Florence, MA",
    heroSubline:
      "Serving all of Florence with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Florence, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Florence, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Florence. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Florence?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Florence?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Florence.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Florence Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-hatfield",
    name: "North Hatfield",
    zipCodes: ["01066"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.406697,
    lng: -72.633901,
    metaTitle:
      "Ice Cream Truck Rental in North Hatfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Hatfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Hatfield, MA",
    heroSubline:
      "Serving all of North Hatfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Hatfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve North Hatfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Hatfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Hatfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Hatfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Hatfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Hatfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "oakham",
    name: "Oakham",
    zipCodes: ["01068"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.346144,
    lng: -72.058847,
    metaTitle: "Ice Cream Truck Rental in Oakham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Oakham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Oakham, MA",
    heroSubline: "Serving all of Oakham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Oakham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Oakham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Oakham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Oakham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Oakham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Oakham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Oakham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "palmer",
    name: "Palmer",
    zipCodes: ["01069"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.176131,
    lng: -72.31457,
    metaTitle: "Ice Cream Truck Rental in Palmer, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Palmer, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Palmer, MA",
    heroSubline: "Serving all of Palmer with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Palmer, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Palmer, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Palmer. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Palmer?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Palmer?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Palmer.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Palmer Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "plainfield",
    name: "Plainfield",
    zipCodes: ["01070"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.448984,
    lng: -72.958397,
    metaTitle: "Ice Cream Truck Rental in Plainfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Plainfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Plainfield, MA",
    heroSubline:
      "Serving all of Plainfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Plainfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Plainfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Plainfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Plainfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Plainfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Plainfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Plainfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "russell",
    name: "Russell",
    zipCodes: ["01071"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.177432,
    lng: -72.864558,
    metaTitle: "Ice Cream Truck Rental in Russell, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Russell, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Russell, MA",
    heroSubline:
      "Serving all of Russell with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Russell, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Russell, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Russell. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Russell?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Russell?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Russell.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Russell Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "shutesbury",
    name: "Shutesbury",
    zipCodes: ["01072"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.471562,
    lng: -72.44017,
    metaTitle: "Ice Cream Truck Rental in Shutesbury, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Shutesbury, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Shutesbury, MA",
    heroSubline:
      "Serving all of Shutesbury with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Shutesbury, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Shutesbury, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Shutesbury. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Shutesbury?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Shutesbury?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Shutesbury.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Shutesbury Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "southampton",
    name: "Southampton",
    zipCodes: ["01073"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.230008,
    lng: -72.728463,
    metaTitle: "Ice Cream Truck Rental in Southampton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Southampton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Southampton, MA",
    heroSubline:
      "Serving all of Southampton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Southampton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Southampton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Southampton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Southampton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Southampton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Southampton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Southampton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "south-barre",
    name: "South Barre",
    zipCodes: ["01074"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.375998,
    lng: -72.149388,
    metaTitle: "Ice Cream Truck Rental in South Barre, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in South Barre, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in South Barre, MA",
    heroSubline:
      "Serving all of South Barre with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves South Barre, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve South Barre, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of South Barre. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in South Barre?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in South Barre?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in South Barre.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck South Barre Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "south-hadley",
    name: "South Hadley",
    zipCodes: ["01075"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.24984,
    lng: -72.58152,
    metaTitle:
      "Ice Cream Truck Rental in South Hadley, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in South Hadley, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in South Hadley, MA",
    heroSubline:
      "Serving all of South Hadley with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves South Hadley, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve South Hadley, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of South Hadley. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in South Hadley?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in South Hadley?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in South Hadley.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck South Hadley Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "southwick",
    name: "Southwick",
    zipCodes: ["01077"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.066644,
    lng: -72.541205,
    metaTitle: "Ice Cream Truck Rental in Southwick, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Southwick, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Southwick, MA",
    heroSubline:
      "Serving all of Southwick with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Southwick, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Southwick, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Southwick. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Southwick?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Southwick?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Southwick.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Southwick Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "thorndike",
    name: "Thorndike",
    zipCodes: ["01079"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.192892,
    lng: -72.329574,
    metaTitle: "Ice Cream Truck Rental in Thorndike, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Thorndike, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Thorndike, MA",
    heroSubline:
      "Serving all of Thorndike with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Thorndike, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Thorndike, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Thorndike. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Thorndike?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Thorndike?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Thorndike.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Thorndike Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "three-rivers",
    name: "Three Rivers",
    zipCodes: ["01080"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.179805,
    lng: -72.517813,
    metaTitle:
      "Ice Cream Truck Rental in Three Rivers, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Three Rivers, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Three Rivers, MA",
    heroSubline:
      "Serving all of Three Rivers with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Three Rivers, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Three Rivers, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Three Rivers. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Three Rivers?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Three Rivers?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Three Rivers.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Three Rivers Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "wales",
    name: "Wales",
    zipCodes: ["01081"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.061948,
    lng: -72.213598,
    metaTitle: "Ice Cream Truck Rental in Wales, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Wales, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Wales, MA",
    heroSubline: "Serving all of Wales with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Wales, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Wales, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Wales. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Wales?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Wales?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Wales.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Wales Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "ware",
    name: "Ware",
    zipCodes: ["01082"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.377471,
    lng: -72.548549,
    metaTitle: "Ice Cream Truck Rental in Ware, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Ware, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Ware, MA",
    heroSubline: "Serving all of Ware with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Ware, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Ware, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Ware. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Ware?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Ware?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Ware.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Ware Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "warren",
    name: "Warren",
    zipCodes: ["01083"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.204027,
    lng: -72.199439,
    metaTitle: "Ice Cream Truck Rental in Warren, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Warren, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Warren, MA",
    heroSubline: "Serving all of Warren with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Warren, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Warren, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Warren. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Warren?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Warren?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Warren.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Warren Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-chesterfield",
    name: "West Chesterfield",
    zipCodes: ["01084"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.390303,
    lng: -72.870857,
    metaTitle:
      "Ice Cream Truck Rental in West Chesterfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Chesterfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Chesterfield, MA",
    heroSubline:
      "Serving all of West Chesterfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Chesterfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve West Chesterfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Chesterfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in West Chesterfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Chesterfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Chesterfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Chesterfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "westfield",
    name: "Westfield",
    zipCodes: ["01085", "01086"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.14869,
    lng: -72.501887,
    metaTitle: "Ice Cream Truck Rental in Westfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Westfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Westfield, MA",
    heroSubline:
      "Serving all of Westfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Westfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Westfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Westfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Westfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Westfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Westfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Westfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-hatfield",
    name: "West Hatfield",
    zipCodes: ["01088"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.390583,
    lng: -72.646894,
    metaTitle:
      "Ice Cream Truck Rental in West Hatfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Hatfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Hatfield, MA",
    heroSubline:
      "Serving all of West Hatfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Hatfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve West Hatfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Hatfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in West Hatfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Hatfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Hatfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Hatfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-springfield",
    name: "West Springfield",
    zipCodes: ["01089", "01090"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.125793,
    lng: -72.645334,
    metaTitle:
      "Ice Cream Truck Rental in West Springfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Springfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Springfield, MA",
    heroSubline:
      "Serving all of West Springfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Springfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve West Springfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Springfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in West Springfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Springfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Springfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Springfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-warren",
    name: "West Warren",
    zipCodes: ["01092"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.202887,
    lng: -72.229025,
    metaTitle: "Ice Cream Truck Rental in West Warren, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Warren, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Warren, MA",
    heroSubline:
      "Serving all of West Warren with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Warren, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve West Warren, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Warren. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in West Warren?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Warren?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Warren.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Warren Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "whately",
    name: "Whately",
    zipCodes: ["01093"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.442673,
    lng: -72.652511,
    metaTitle: "Ice Cream Truck Rental in Whately, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Whately, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Whately, MA",
    heroSubline:
      "Serving all of Whately with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Whately, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Whately, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Whately. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Whately?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Whately?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Whately.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Whately Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "wheelwright",
    name: "Wheelwright",
    zipCodes: ["01094"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.358201,
    lng: -72.140846,
    metaTitle: "Ice Cream Truck Rental in Wheelwright, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Wheelwright, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Wheelwright, MA",
    heroSubline:
      "Serving all of Wheelwright with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Wheelwright, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Wheelwright, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Wheelwright. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Wheelwright?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Wheelwright?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Wheelwright.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Wheelwright Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "wilbraham",
    name: "Wilbraham",
    zipCodes: ["01095"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.125974,
    lng: -72.489988,
    metaTitle: "Ice Cream Truck Rental in Wilbraham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Wilbraham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Wilbraham, MA",
    heroSubline:
      "Serving all of Wilbraham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Wilbraham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Wilbraham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Wilbraham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Wilbraham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Wilbraham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Wilbraham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Wilbraham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "williamsburg",
    name: "Williamsburg",
    zipCodes: ["01096"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.413069,
    lng: -72.821653,
    metaTitle:
      "Ice Cream Truck Rental in Williamsburg, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Williamsburg, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Williamsburg, MA",
    heroSubline:
      "Serving all of Williamsburg with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Williamsburg, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Williamsburg, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Williamsburg. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Williamsburg?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Williamsburg?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Williamsburg.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Williamsburg Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "woronoco",
    name: "Woronoco",
    zipCodes: ["01097"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.161743,
    lng: -72.845912,
    metaTitle: "Ice Cream Truck Rental in Woronoco, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Woronoco, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Woronoco, MA",
    heroSubline:
      "Serving all of Woronoco with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Woronoco, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Woronoco, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Woronoco. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Woronoco?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Woronoco?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Woronoco.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Woronoco Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "worthington",
    name: "Worthington",
    zipCodes: ["01098"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.40494,
    lng: -72.896133,
    metaTitle: "Ice Cream Truck Rental in Worthington, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Worthington, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Worthington, MA",
    heroSubline:
      "Serving all of Worthington with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Worthington, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Worthington, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Worthington. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Worthington?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Worthington?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Worthington.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Worthington Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "longmeadow",
    name: "Longmeadow",
    zipCodes: ["01106", "01116"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.049194,
    lng: -72.567882,
    metaTitle: "Ice Cream Truck Rental in Longmeadow, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Longmeadow, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Longmeadow, MA",
    heroSubline:
      "Serving all of Longmeadow with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Longmeadow, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Longmeadow, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Longmeadow. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Longmeadow?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Longmeadow?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Longmeadow.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Longmeadow Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "indian-orchard",
    name: "Indian Orchard",
    zipCodes: ["01151"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.150593,
    lng: -72.51278,
    metaTitle:
      "Ice Cream Truck Rental in Indian Orchard, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Indian Orchard, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Indian Orchard, MA",
    heroSubline:
      "Serving all of Indian Orchard with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Indian Orchard, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Indian Orchard, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Indian Orchard. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Indian Orchard?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Indian Orchard?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Indian Orchard.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Indian Orchard Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "pittsfield",
    name: "Pittsfield",
    zipCodes: ["01201", "01202", "01203"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.479475,
    lng: -73.24807,
    metaTitle: "Ice Cream Truck Rental in Pittsfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Pittsfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Pittsfield, MA",
    heroSubline:
      "Serving all of Pittsfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Pittsfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Pittsfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Pittsfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Pittsfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Pittsfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Pittsfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Pittsfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "adams",
    name: "Adams",
    zipCodes: ["01220"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.385595,
    lng: -73.172166,
    metaTitle: "Ice Cream Truck Rental in Adams, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Adams, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Adams, MA",
    heroSubline: "Serving all of Adams with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Adams, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Adams, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Adams. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Adams?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Adams?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Adams.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Adams Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "ashley-falls",
    name: "Ashley Falls",
    zipCodes: ["01222"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.185969,
    lng: -73.318695,
    metaTitle:
      "Ice Cream Truck Rental in Ashley Falls, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Ashley Falls, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Ashley Falls, MA",
    heroSubline:
      "Serving all of Ashley Falls with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Ashley Falls, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Ashley Falls, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Ashley Falls. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Ashley Falls?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Ashley Falls?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Ashley Falls.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Ashley Falls Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "becket",
    name: "Becket",
    zipCodes: ["01223"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.3418,
    lng: -73.103468,
    metaTitle: "Ice Cream Truck Rental in Becket, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Becket, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Becket, MA",
    heroSubline: "Serving all of Becket with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Becket, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Becket, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Becket. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Becket?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Becket?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Becket.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Becket Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "berkshire",
    name: "Berkshire",
    zipCodes: ["01224"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.3929,
    lng: -73.228483,
    metaTitle: "Ice Cream Truck Rental in Berkshire, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Berkshire, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Berkshire, MA",
    heroSubline:
      "Serving all of Berkshire with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Berkshire, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Berkshire, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Berkshire. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Berkshire?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Berkshire?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Berkshire.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Berkshire Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "cheshire",
    name: "Cheshire",
    zipCodes: ["01225"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.482125,
    lng: -73.127483,
    metaTitle: "Ice Cream Truck Rental in Cheshire, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Cheshire, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Cheshire, MA",
    heroSubline:
      "Serving all of Cheshire with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Cheshire, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Cheshire, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Cheshire. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Cheshire?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Cheshire?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Cheshire.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Cheshire Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "dalton",
    name: "Dalton",
    zipCodes: ["01226", "01227"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.470296,
    lng: -73.08895,
    metaTitle: "Ice Cream Truck Rental in Dalton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Dalton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Dalton, MA",
    heroSubline: "Serving all of Dalton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Dalton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Dalton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Dalton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Dalton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Dalton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Dalton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Dalton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "glendale",
    name: "Glendale",
    zipCodes: ["01229"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.279292,
    lng: -73.343545,
    metaTitle: "Ice Cream Truck Rental in Glendale, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Glendale, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Glendale, MA",
    heroSubline:
      "Serving all of Glendale with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Glendale, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Glendale, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Glendale. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Glendale?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Glendale?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Glendale.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Glendale Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "great-barrington",
    name: "Great Barrington",
    zipCodes: ["01230"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.299392,
    lng: -73.26665,
    metaTitle:
      "Ice Cream Truck Rental in Great Barrington, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Great Barrington, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Great Barrington, MA",
    heroSubline:
      "Serving all of Great Barrington with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Great Barrington, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Great Barrington, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Great Barrington. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Great Barrington?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Great Barrington?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Great Barrington.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Great Barrington Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "hinsdale",
    name: "Hinsdale",
    zipCodes: ["01235"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.29237,
    lng: -73.22164,
    metaTitle: "Ice Cream Truck Rental in Hinsdale, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Hinsdale, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Hinsdale, MA",
    heroSubline:
      "Serving all of Hinsdale with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Hinsdale, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Hinsdale, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Hinsdale. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Hinsdale?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Hinsdale?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Hinsdale.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Hinsdale Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "housatonic",
    name: "Housatonic",
    zipCodes: ["01236"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.291299,
    lng: -73.358798,
    metaTitle: "Ice Cream Truck Rental in Housatonic, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Housatonic, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Housatonic, MA",
    heroSubline:
      "Serving all of Housatonic with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Housatonic, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Housatonic, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Housatonic. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Housatonic?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Housatonic?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Housatonic.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Housatonic Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "lanesboro",
    name: "Lanesboro",
    zipCodes: ["01237"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.487569,
    lng: -73.235048,
    metaTitle: "Ice Cream Truck Rental in Lanesboro, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Lanesboro, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Lanesboro, MA",
    heroSubline:
      "Serving all of Lanesboro with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Lanesboro, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Lanesboro, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Lanesboro. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Lanesboro?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Lanesboro?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Lanesboro.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Lanesboro Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "lee",
    name: "Lee",
    zipCodes: ["01238"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.369856,
    lng: -73.267465,
    metaTitle: "Ice Cream Truck Rental in Lee, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Lee, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Lee, MA",
    heroSubline: "Serving all of Lee with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Lee, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Lee, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Lee. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Lee?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Lee?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Lee.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Lee Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "lenox",
    name: "Lenox",
    zipCodes: ["01240"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.459202,
    lng: -73.219858,
    metaTitle: "Ice Cream Truck Rental in Lenox, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Lenox, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Lenox, MA",
    heroSubline: "Serving all of Lenox with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Lenox, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Lenox, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Lenox. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Lenox?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Lenox?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Lenox.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Lenox Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "lenox-dale",
    name: "Lenox Dale",
    zipCodes: ["01242"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.338594,
    lng: -73.250891,
    metaTitle: "Ice Cream Truck Rental in Lenox Dale, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Lenox Dale, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Lenox Dale, MA",
    heroSubline:
      "Serving all of Lenox Dale with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Lenox Dale, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Lenox Dale, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Lenox Dale. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Lenox Dale?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Lenox Dale?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Lenox Dale.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Lenox Dale Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "middlefield",
    name: "Middlefield",
    zipCodes: ["01243"],
    county: "Hampshire County",
    region: "Massachusetts",
    lat: 42.356088,
    lng: -73.010448,
    metaTitle: "Ice Cream Truck Rental in Middlefield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Middlefield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Middlefield, MA",
    heroSubline:
      "Serving all of Middlefield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Middlefield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Middlefield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Middlefield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Middlefield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Middlefield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Middlefield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Middlefield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "mill-river",
    name: "Mill River",
    zipCodes: ["01244"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.122827,
    lng: -73.253983,
    metaTitle: "Ice Cream Truck Rental in Mill River, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Mill River, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Mill River, MA",
    heroSubline:
      "Serving all of Mill River with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Mill River, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Mill River, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Mill River. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Mill River?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Mill River?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Mill River.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Mill River Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "monterey",
    name: "Monterey",
    zipCodes: ["01245"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.18669,
    lng: -73.206498,
    metaTitle: "Ice Cream Truck Rental in Monterey, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Monterey, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Monterey, MA",
    heroSubline:
      "Serving all of Monterey with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Monterey, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Monterey, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Monterey. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Monterey?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Monterey?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Monterey.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Monterey Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-adams",
    name: "North Adams",
    zipCodes: ["01247"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.426974,
    lng: -73.18632,
    metaTitle: "Ice Cream Truck Rental in North Adams, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Adams, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Adams, MA",
    heroSubline:
      "Serving all of North Adams with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Adams, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve North Adams, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Adams. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in North Adams?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Adams?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Adams.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Adams Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-egremont",
    name: "North Egremont",
    zipCodes: ["01252"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.198648,
    lng: -73.446234,
    metaTitle:
      "Ice Cream Truck Rental in North Egremont, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Egremont, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Egremont, MA",
    heroSubline:
      "Serving all of North Egremont with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Egremont, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve North Egremont, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Egremont. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Egremont?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Egremont?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Egremont.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Egremont Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "otis",
    name: "Otis",
    zipCodes: ["01253"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.213156,
    lng: -73.090434,
    metaTitle: "Ice Cream Truck Rental in Otis, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Otis, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Otis, MA",
    heroSubline: "Serving all of Otis with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Otis, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Otis, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Otis. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Otis?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Otis?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Otis.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Otis Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "richmond",
    name: "Richmond",
    zipCodes: ["01254"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.233105,
    lng: -73.238358,
    metaTitle: "Ice Cream Truck Rental in Richmond, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Richmond, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Richmond, MA",
    heroSubline:
      "Serving all of Richmond with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Richmond, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Richmond, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Richmond. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Richmond?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Richmond?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Richmond.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Richmond Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "sandisfield",
    name: "Sandisfield",
    zipCodes: ["01255"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.148975,
    lng: -73.14861,
    metaTitle: "Ice Cream Truck Rental in Sandisfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Sandisfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Sandisfield, MA",
    heroSubline:
      "Serving all of Sandisfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Sandisfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Sandisfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Sandisfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Sandisfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Sandisfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Sandisfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Sandisfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "savoy",
    name: "Savoy",
    zipCodes: ["01256"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.367341,
    lng: -73.128528,
    metaTitle: "Ice Cream Truck Rental in Savoy, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Savoy, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Savoy, MA",
    heroSubline: "Serving all of Savoy with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Savoy, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Savoy, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Savoy. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Savoy?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Savoy?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Savoy.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Savoy Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "sheffield",
    name: "Sheffield",
    zipCodes: ["01257"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.314564,
    lng: -73.267694,
    metaTitle: "Ice Cream Truck Rental in Sheffield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Sheffield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Sheffield, MA",
    heroSubline:
      "Serving all of Sheffield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Sheffield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Sheffield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Sheffield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Sheffield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Sheffield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Sheffield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Sheffield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "south-egremont",
    name: "South Egremont",
    zipCodes: ["01258"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.128075,
    lng: -73.36089,
    metaTitle:
      "Ice Cream Truck Rental in South Egremont, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in South Egremont, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in South Egremont, MA",
    heroSubline:
      "Serving all of South Egremont with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves South Egremont, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve South Egremont, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of South Egremont. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in South Egremont?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in South Egremont?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in South Egremont.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck South Egremont Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "southfield",
    name: "Southfield",
    zipCodes: ["01259"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.198712,
    lng: -73.278543,
    metaTitle: "Ice Cream Truck Rental in Southfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Southfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Southfield, MA",
    heroSubline:
      "Serving all of Southfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Southfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Southfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Southfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Southfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Southfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Southfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Southfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "south-lee",
    name: "South Lee",
    zipCodes: ["01260"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.286586,
    lng: -73.313274,
    metaTitle: "Ice Cream Truck Rental in South Lee, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in South Lee, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in South Lee, MA",
    heroSubline:
      "Serving all of South Lee with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves South Lee, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve South Lee, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of South Lee. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in South Lee?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in South Lee?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in South Lee.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck South Lee Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "stockbridge",
    name: "Stockbridge",
    zipCodes: ["01262", "01263"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.304604,
    lng: -73.330001,
    metaTitle: "Ice Cream Truck Rental in Stockbridge, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Stockbridge, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Stockbridge, MA",
    heroSubline:
      "Serving all of Stockbridge with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Stockbridge, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Stockbridge, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Stockbridge. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Stockbridge?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Stockbridge?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Stockbridge.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Stockbridge Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "tyringham",
    name: "Tyringham",
    zipCodes: ["01264"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.220001,
    lng: -73.197865,
    metaTitle: "Ice Cream Truck Rental in Tyringham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Tyringham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Tyringham, MA",
    heroSubline:
      "Serving all of Tyringham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Tyringham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Tyringham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Tyringham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Tyringham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Tyringham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Tyringham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Tyringham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-stockbridge",
    name: "West Stockbridge",
    zipCodes: ["01266"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.360482,
    lng: -73.265354,
    metaTitle:
      "Ice Cream Truck Rental in West Stockbridge, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Stockbridge, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Stockbridge, MA",
    heroSubline:
      "Serving all of West Stockbridge with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Stockbridge, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve West Stockbridge, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Stockbridge. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in West Stockbridge?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Stockbridge?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Stockbridge.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Stockbridge Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "williamstown",
    name: "Williamstown",
    zipCodes: ["01267"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.642075,
    lng: -73.257699,
    metaTitle:
      "Ice Cream Truck Rental in Williamstown, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Williamstown, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Williamstown, MA",
    heroSubline:
      "Serving all of Williamstown with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Williamstown, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Williamstown, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Williamstown. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Williamstown?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Williamstown?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Williamstown.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Williamstown Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "windsor",
    name: "Windsor",
    zipCodes: ["01270"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.443726,
    lng: -73.116127,
    metaTitle: "Ice Cream Truck Rental in Windsor, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Windsor, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Windsor, MA",
    heroSubline:
      "Serving all of Windsor with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Windsor, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Windsor, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Windsor. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Windsor?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Windsor?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Windsor.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Windsor Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "greenfield",
    name: "Greenfield",
    zipCodes: ["01301", "01302"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.601335,
    lng: -72.623619,
    metaTitle: "Ice Cream Truck Rental in Greenfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Greenfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Greenfield, MA",
    heroSubline:
      "Serving all of Greenfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Greenfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Greenfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Greenfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Greenfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Greenfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Greenfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Greenfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "ashfield",
    name: "Ashfield",
    zipCodes: ["01330"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.562391,
    lng: -72.738152,
    metaTitle: "Ice Cream Truck Rental in Ashfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Ashfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Ashfield, MA",
    heroSubline:
      "Serving all of Ashfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Ashfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Ashfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Ashfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Ashfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Ashfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Ashfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Ashfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "athol",
    name: "Athol",
    zipCodes: ["01331"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.547302,
    lng: -72.183903,
    metaTitle: "Ice Cream Truck Rental in Athol, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Athol, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Athol, MA",
    heroSubline: "Serving all of Athol with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Athol, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Athol, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Athol. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Athol?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Athol?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Athol.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Athol Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "bernardston",
    name: "Bernardston",
    zipCodes: ["01337"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.62706,
    lng: -72.642888,
    metaTitle: "Ice Cream Truck Rental in Bernardston, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Bernardston, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Bernardston, MA",
    heroSubline:
      "Serving all of Bernardston with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Bernardston, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Bernardston, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Bernardston. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Bernardston?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Bernardston?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Bernardston.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Bernardston Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "buckland",
    name: "Buckland",
    zipCodes: ["01338"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.573832,
    lng: -72.769487,
    metaTitle: "Ice Cream Truck Rental in Buckland, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Buckland, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Buckland, MA",
    heroSubline:
      "Serving all of Buckland with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Buckland, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Buckland, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Buckland. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Buckland?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Buckland?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Buckland.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Buckland Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "charlemont",
    name: "Charlemont",
    zipCodes: ["01339"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.594252,
    lng: -72.665507,
    metaTitle: "Ice Cream Truck Rental in Charlemont, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Charlemont, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Charlemont, MA",
    heroSubline:
      "Serving all of Charlemont with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Charlemont, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Charlemont, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Charlemont. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Charlemont?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Charlemont?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Charlemont.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Charlemont Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "colrain",
    name: "Colrain",
    zipCodes: ["01340"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.681539,
    lng: -72.822986,
    metaTitle: "Ice Cream Truck Rental in Colrain, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Colrain, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Colrain, MA",
    heroSubline:
      "Serving all of Colrain with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Colrain, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Colrain, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Colrain. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Colrain?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Colrain?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Colrain.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Colrain Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "conway",
    name: "Conway",
    zipCodes: ["01341"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.590824,
    lng: -72.70976,
    metaTitle: "Ice Cream Truck Rental in Conway, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Conway, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Conway, MA",
    heroSubline: "Serving all of Conway with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Conway, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Conway, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Conway. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Conway?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Conway?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Conway.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Conway Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "deerfield",
    name: "Deerfield",
    zipCodes: ["01342"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.54723,
    lng: -72.607679,
    metaTitle: "Ice Cream Truck Rental in Deerfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Deerfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Deerfield, MA",
    heroSubline:
      "Serving all of Deerfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Deerfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Deerfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Deerfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Deerfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Deerfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Deerfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Deerfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "drury",
    name: "Drury",
    zipCodes: ["01343"],
    county: "Berkshire County",
    region: "Massachusetts",
    lat: 42.642666,
    lng: -72.986231,
    metaTitle: "Ice Cream Truck Rental in Drury, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Drury, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Drury, MA",
    heroSubline: "Serving all of Drury with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Drury, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Drury, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Drury. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Drury?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Drury?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Drury.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Drury Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "erving",
    name: "Erving",
    zipCodes: ["01344"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.627072,
    lng: -72.553654,
    metaTitle: "Ice Cream Truck Rental in Erving, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Erving, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Erving, MA",
    heroSubline: "Serving all of Erving with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Erving, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Erving, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Erving. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Erving?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Erving?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Erving.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Erving Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "heath",
    name: "Heath",
    zipCodes: ["01346"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.618011,
    lng: -72.788896,
    metaTitle: "Ice Cream Truck Rental in Heath, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Heath, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Heath, MA",
    heroSubline: "Serving all of Heath with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Heath, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Heath, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Heath. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Heath?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Heath?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Heath.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Heath Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "lake-pleasant",
    name: "Lake Pleasant",
    zipCodes: ["01347"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.556558,
    lng: -72.518104,
    metaTitle:
      "Ice Cream Truck Rental in Lake Pleasant, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Lake Pleasant, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Lake Pleasant, MA",
    heroSubline:
      "Serving all of Lake Pleasant with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Lake Pleasant, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Lake Pleasant, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Lake Pleasant. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Lake Pleasant?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Lake Pleasant?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Lake Pleasant.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Lake Pleasant Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "turners-falls",
    name: "Turners Falls",
    zipCodes: ["01376"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.621412,
    lng: -72.705633,
    metaTitle:
      "Ice Cream Truck Rental in Turners Falls, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Turners Falls, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Turners Falls, MA",
    heroSubline:
      "Serving all of Turners Falls with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Turners Falls, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Turners Falls, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Turners Falls. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Turners Falls?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Turners Falls?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Turners Falls.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Turners Falls Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "monroe-bridge",
    name: "Monroe Bridge",
    zipCodes: ["01350"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.721456,
    lng: -72.976204,
    metaTitle:
      "Ice Cream Truck Rental in Monroe Bridge, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Monroe Bridge, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Monroe Bridge, MA",
    heroSubline:
      "Serving all of Monroe Bridge with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Monroe Bridge, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Monroe Bridge, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Monroe Bridge. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Monroe Bridge?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Monroe Bridge?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Monroe Bridge.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Monroe Bridge Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "montague",
    name: "Montague",
    zipCodes: ["01351"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.548107,
    lng: -72.48693,
    metaTitle: "Ice Cream Truck Rental in Montague, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Montague, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Montague, MA",
    heroSubline:
      "Serving all of Montague with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Montague, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Montague, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Montague. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Montague?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Montague?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Montague.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Montague Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "northfield",
    name: "Northfield",
    zipCodes: ["01360"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.522178,
    lng: -72.624164,
    metaTitle: "Ice Cream Truck Rental in Northfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Northfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Northfield, MA",
    heroSubline:
      "Serving all of Northfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Northfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Northfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Northfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Northfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Northfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Northfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Northfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "new-salem",
    name: "New Salem",
    zipCodes: ["01355"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.518718,
    lng: -72.534371,
    metaTitle: "Ice Cream Truck Rental in New Salem, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in New Salem, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in New Salem, MA",
    heroSubline:
      "Serving all of New Salem with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves New Salem, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve New Salem, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of New Salem. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in New Salem?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in New Salem?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in New Salem.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck New Salem Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "orange",
    name: "Orange",
    zipCodes: ["01364"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.578325,
    lng: -72.556589,
    metaTitle: "Ice Cream Truck Rental in Orange, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Orange, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Orange, MA",
    heroSubline: "Serving all of Orange with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Orange, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Orange, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Orange. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Orange?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Orange?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Orange.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Orange Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "petersham",
    name: "Petersham",
    zipCodes: ["01366"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.459632,
    lng: -72.182962,
    metaTitle: "Ice Cream Truck Rental in Petersham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Petersham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Petersham, MA",
    heroSubline:
      "Serving all of Petersham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Petersham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Petersham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Petersham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Petersham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Petersham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Petersham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Petersham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "rowe",
    name: "Rowe",
    zipCodes: ["01367"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.683065,
    lng: -72.715667,
    metaTitle: "Ice Cream Truck Rental in Rowe, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Rowe, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Rowe, MA",
    heroSubline: "Serving all of Rowe with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Rowe, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Rowe, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Rowe. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Rowe?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Rowe?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Rowe.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Rowe Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "royalston",
    name: "Royalston",
    zipCodes: ["01368"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.672182,
    lng: -72.196376,
    metaTitle: "Ice Cream Truck Rental in Royalston, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Royalston, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Royalston, MA",
    heroSubline:
      "Serving all of Royalston with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Royalston, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Royalston, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Royalston. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Royalston?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Royalston?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Royalston.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Royalston Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "shattuckville",
    name: "Shattuckville",
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.522178,
    lng: -72.624164,
    metaTitle:
      "Ice Cream Truck Rental in Shattuckville, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Shattuckville, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Shattuckville, MA",
    heroSubline:
      "Serving all of Shattuckville with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Shattuckville, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Shattuckville, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Shattuckville. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Shattuckville?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Shattuckville?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Shattuckville.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Shattuckville Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "shelburne-falls",
    name: "Shelburne Falls",
    zipCodes: ["01370"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.588812,
    lng: -72.758781,
    metaTitle:
      "Ice Cream Truck Rental in Shelburne Falls, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Shelburne Falls, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Shelburne Falls, MA",
    heroSubline:
      "Serving all of Shelburne Falls with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Shelburne Falls, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Shelburne Falls, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Shelburne Falls. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Shelburne Falls?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Shelburne Falls?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Shelburne Falls.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Shelburne Falls Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "south-deerfield",
    name: "South Deerfield",
    zipCodes: ["01373"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.464522,
    lng: -72.682346,
    metaTitle:
      "Ice Cream Truck Rental in South Deerfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in South Deerfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in South Deerfield, MA",
    heroSubline:
      "Serving all of South Deerfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves South Deerfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve South Deerfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of South Deerfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in South Deerfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in South Deerfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in South Deerfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck South Deerfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "sunderland",
    name: "Sunderland",
    zipCodes: ["01375"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.565346,
    lng: -72.70094,
    metaTitle: "Ice Cream Truck Rental in Sunderland, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Sunderland, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Sunderland, MA",
    heroSubline:
      "Serving all of Sunderland with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Sunderland, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Sunderland, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Sunderland. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Sunderland?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Sunderland?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Sunderland.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Sunderland Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "warwick",
    name: "Warwick",
    zipCodes: ["01378"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.667059,
    lng: -72.339655,
    metaTitle: "Ice Cream Truck Rental in Warwick, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Warwick, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Warwick, MA",
    heroSubline:
      "Serving all of Warwick with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Warwick, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Warwick, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Warwick. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Warwick?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Warwick?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Warwick.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Warwick Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "wendell",
    name: "Wendell",
    zipCodes: ["01379"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.581007,
    lng: -72.437179,
    metaTitle: "Ice Cream Truck Rental in Wendell, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Wendell, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Wendell, MA",
    heroSubline:
      "Serving all of Wendell with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Wendell, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Wendell, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Wendell. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Wendell?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Wendell?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Wendell.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Wendell Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "wendell-depot",
    name: "Wendell Depot",
    zipCodes: ["01380"],
    county: "Franklin County",
    region: "Massachusetts",
    lat: 42.553431,
    lng: -72.392694,
    metaTitle:
      "Ice Cream Truck Rental in Wendell Depot, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Wendell Depot, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Wendell Depot, MA",
    heroSubline:
      "Serving all of Wendell Depot with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Wendell Depot, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Wendell Depot, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Wendell Depot. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Wendell Depot?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Wendell Depot?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Wendell Depot.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Wendell Depot Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "fitchburg",
    name: "Fitchburg",
    zipCodes: ["01420"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.583689,
    lng: -71.816767,
    metaTitle: "Ice Cream Truck Rental in Fitchburg, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Fitchburg, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Fitchburg, MA",
    heroSubline:
      "Serving all of Fitchburg with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Fitchburg, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Fitchburg, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Fitchburg. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Fitchburg?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Fitchburg?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Fitchburg.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Fitchburg Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "ashburnham",
    name: "Ashburnham",
    zipCodes: ["01430"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.654906,
    lng: -71.920942,
    metaTitle: "Ice Cream Truck Rental in Ashburnham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Ashburnham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Ashburnham, MA",
    heroSubline:
      "Serving all of Ashburnham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Ashburnham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Ashburnham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Ashburnham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Ashburnham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Ashburnham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Ashburnham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Ashburnham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "ashby",
    name: "Ashby",
    zipCodes: ["01431"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Ashby, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Ashby, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Ashby, MA",
    heroSubline: "Serving all of Ashby with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Ashby, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Ashby, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Ashby. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Ashby?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Ashby?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Ashby.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Ashby Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "ayer",
    name: "Ayer",
    zipCodes: ["01432"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Ayer, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Ayer, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Ayer, MA",
    heroSubline: "Serving all of Ayer with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Ayer, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Ayer, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Ayer. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Ayer?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Ayer?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Ayer.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Ayer Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "baldwinville",
    name: "Baldwinville",
    zipCodes: ["01436"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.601427,
    lng: -72.083838,
    metaTitle:
      "Ice Cream Truck Rental in Baldwinville, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Baldwinville, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Baldwinville, MA",
    heroSubline:
      "Serving all of Baldwinville with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Baldwinville, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Baldwinville, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Baldwinville. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Baldwinville?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Baldwinville?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Baldwinville.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Baldwinville Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "east-templeton",
    name: "East Templeton",
    zipCodes: ["01438"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.551681,
    lng: -72.029434,
    metaTitle:
      "Ice Cream Truck Rental in East Templeton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in East Templeton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in East Templeton, MA",
    heroSubline:
      "Serving all of East Templeton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves East Templeton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve East Templeton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of East Templeton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in East Templeton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in East Templeton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in East Templeton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck East Templeton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "gardner",
    name: "Gardner",
    zipCodes: ["01440"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.582529,
    lng: -72.025884,
    metaTitle: "Ice Cream Truck Rental in Gardner, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Gardner, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Gardner, MA",
    heroSubline:
      "Serving all of Gardner with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Gardner, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Gardner, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Gardner. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Gardner?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Gardner?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Gardner.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Gardner Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "westminster",
    name: "Westminster",
    zipCodes: ["01441", "01473"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.364807,
    lng: -71.896868,
    metaTitle: "Ice Cream Truck Rental in Westminster, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Westminster, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Westminster, MA",
    heroSubline:
      "Serving all of Westminster with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Westminster, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Westminster, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Westminster. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Westminster?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Westminster?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Westminster.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Westminster Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "groton",
    name: "Groton",
    zipCodes: ["01450", "01470", "01471"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Groton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Groton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Groton, MA",
    heroSubline: "Serving all of Groton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Groton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Groton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Groton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Groton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Groton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Groton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Groton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "harvard",
    name: "Harvard",
    zipCodes: ["01451"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.500187,
    lng: -71.575864,
    metaTitle: "Ice Cream Truck Rental in Harvard, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Harvard, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Harvard, MA",
    heroSubline:
      "Serving all of Harvard with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Harvard, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Harvard, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Harvard. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Harvard?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Harvard?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Harvard.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Harvard Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "hubbardston",
    name: "Hubbardston",
    zipCodes: ["01452"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.483895,
    lng: -72.011516,
    metaTitle: "Ice Cream Truck Rental in Hubbardston, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Hubbardston, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Hubbardston, MA",
    heroSubline:
      "Serving all of Hubbardston with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Hubbardston, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Hubbardston, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Hubbardston. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Hubbardston?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Hubbardston?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Hubbardston.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Hubbardston Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "leominster",
    name: "Leominster",
    zipCodes: ["01453"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.471316,
    lng: -71.837509,
    metaTitle: "Ice Cream Truck Rental in Leominster, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Leominster, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Leominster, MA",
    heroSubline:
      "Serving all of Leominster with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Leominster, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Leominster, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Leominster. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Leominster?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Leominster?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Leominster.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Leominster Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "littleton",
    name: "Littleton",
    zipCodes: ["01460"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Littleton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Littleton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Littleton, MA",
    heroSubline:
      "Serving all of Littleton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Littleton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Littleton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Littleton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Littleton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Littleton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Littleton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Littleton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "lunenburg",
    name: "Lunenburg",
    zipCodes: ["01462"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.583322,
    lng: -71.752266,
    metaTitle: "Ice Cream Truck Rental in Lunenburg, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Lunenburg, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Lunenburg, MA",
    heroSubline:
      "Serving all of Lunenburg with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Lunenburg, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Lunenburg, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Lunenburg. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Lunenburg?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Lunenburg?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Lunenburg.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Lunenburg Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "pepperell",
    name: "Pepperell",
    zipCodes: ["01463"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Pepperell, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Pepperell, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Pepperell, MA",
    heroSubline:
      "Serving all of Pepperell with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Pepperell, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Pepperell, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Pepperell. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Pepperell?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Pepperell?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Pepperell.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Pepperell Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "shirley",
    name: "Shirley",
    zipCodes: ["01464"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Shirley, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Shirley, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Shirley, MA",
    heroSubline:
      "Serving all of Shirley with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Shirley, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Shirley, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Shirley. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Shirley?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Shirley?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Shirley.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Shirley Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "still-river",
    name: "Still River",
    zipCodes: ["01467"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.487056,
    lng: -71.613078,
    metaTitle: "Ice Cream Truck Rental in Still River, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Still River, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Still River, MA",
    heroSubline:
      "Serving all of Still River with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Still River, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Still River, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Still River. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Still River?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Still River?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Still River.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Still River Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "templeton",
    name: "Templeton",
    zipCodes: ["01468"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.555059,
    lng: -72.072285,
    metaTitle: "Ice Cream Truck Rental in Templeton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Templeton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Templeton, MA",
    heroSubline:
      "Serving all of Templeton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Templeton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Templeton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Templeton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Templeton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Templeton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Templeton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Templeton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "townsend",
    name: "Townsend",
    zipCodes: ["01469"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Townsend, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Townsend, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Townsend, MA",
    heroSubline:
      "Serving all of Townsend with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Townsend, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Townsend, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Townsend. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Townsend?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Townsend?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Townsend.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Townsend Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-groton",
    name: "West Groton",
    zipCodes: ["01472"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in West Groton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Groton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Groton, MA",
    heroSubline:
      "Serving all of West Groton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Groton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve West Groton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Groton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in West Groton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Groton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Groton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Groton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-townsend",
    name: "West Townsend",
    zipCodes: ["01474"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle:
      "Ice Cream Truck Rental in West Townsend, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Townsend, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Townsend, MA",
    heroSubline:
      "Serving all of West Townsend with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Townsend, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve West Townsend, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Townsend. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in West Townsend?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Townsend?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Townsend.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Townsend Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "winchendon",
    name: "Winchendon",
    zipCodes: ["01475"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.661612,
    lng: -72.047876,
    metaTitle: "Ice Cream Truck Rental in Winchendon, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Winchendon, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Winchendon, MA",
    heroSubline:
      "Serving all of Winchendon with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Winchendon, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Winchendon, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Winchendon. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Winchendon?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Winchendon?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Winchendon.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Winchendon Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "winchendon-springs",
    name: "Winchendon Springs",
    zipCodes: ["01477"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.364807,
    lng: -71.896868,
    metaTitle:
      "Ice Cream Truck Rental in Winchendon Springs, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Winchendon Springs, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Winchendon Springs, MA",
    heroSubline:
      "Serving all of Winchendon Springs with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Winchendon Springs, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Winchendon Springs, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Winchendon Springs. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Winchendon Springs?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Winchendon Springs?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Winchendon Springs.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Winchendon Springs Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "auburn",
    name: "Auburn",
    zipCodes: ["01501"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.184835,
    lng: -71.947184,
    metaTitle: "Ice Cream Truck Rental in Auburn, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Auburn, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Auburn, MA",
    heroSubline: "Serving all of Auburn with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Auburn, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Auburn, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Auburn. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Auburn?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Auburn?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Auburn.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Auburn Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "berlin",
    name: "Berlin",
    zipCodes: ["01503"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.3129,
    lng: -71.841656,
    metaTitle: "Ice Cream Truck Rental in Berlin, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Berlin, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Berlin, MA",
    heroSubline: "Serving all of Berlin with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Berlin, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Berlin, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Berlin. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Berlin?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Berlin?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Berlin.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Berlin Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "blackstone",
    name: "Blackstone",
    zipCodes: ["01504"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.114078,
    lng: -71.799785,
    metaTitle: "Ice Cream Truck Rental in Blackstone, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Blackstone, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Blackstone, MA",
    heroSubline:
      "Serving all of Blackstone with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Blackstone, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Blackstone, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Blackstone. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Blackstone?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Blackstone?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Blackstone.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Blackstone Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "boylston",
    name: "Boylston",
    zipCodes: ["01505"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.300037,
    lng: -71.943458,
    metaTitle: "Ice Cream Truck Rental in Boylston, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Boylston, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Boylston, MA",
    heroSubline:
      "Serving all of Boylston with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Boylston, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Boylston, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Boylston. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Boylston?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Boylston?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Boylston.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Boylston Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "brookfield",
    name: "Brookfield",
    zipCodes: ["01506"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.19169,
    lng: -72.105011,
    metaTitle: "Ice Cream Truck Rental in Brookfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Brookfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Brookfield, MA",
    heroSubline:
      "Serving all of Brookfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Brookfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Brookfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Brookfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Brookfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Brookfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Brookfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Brookfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "charlton",
    name: "Charlton",
    zipCodes: ["01507"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.13277,
    lng: -71.972627,
    metaTitle: "Ice Cream Truck Rental in Charlton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Charlton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Charlton, MA",
    heroSubline:
      "Serving all of Charlton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Charlton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Charlton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Charlton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Charlton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Charlton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Charlton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Charlton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "charlton-city",
    name: "Charlton City",
    zipCodes: ["01508"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.109748,
    lng: -72.079455,
    metaTitle:
      "Ice Cream Truck Rental in Charlton City, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Charlton City, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Charlton City, MA",
    heroSubline:
      "Serving all of Charlton City with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Charlton City, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Charlton City, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Charlton City. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Charlton City?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Charlton City?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Charlton City.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Charlton City Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "charlton-depot",
    name: "Charlton Depot",
    zipCodes: ["01509"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.364807,
    lng: -71.896868,
    metaTitle:
      "Ice Cream Truck Rental in Charlton Depot, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Charlton Depot, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Charlton Depot, MA",
    heroSubline:
      "Serving all of Charlton Depot with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Charlton Depot, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Charlton Depot, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Charlton Depot. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Charlton Depot?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Charlton Depot?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Charlton Depot.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Charlton Depot Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "clinton",
    name: "Clinton",
    zipCodes: ["01510"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.413972,
    lng: -71.687523,
    metaTitle: "Ice Cream Truck Rental in Clinton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Clinton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Clinton, MA",
    heroSubline:
      "Serving all of Clinton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Clinton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Clinton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Clinton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Clinton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Clinton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Clinton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Clinton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "east-brookfield",
    name: "East Brookfield",
    zipCodes: ["01515"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.205311,
    lng: -72.049907,
    metaTitle:
      "Ice Cream Truck Rental in East Brookfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in East Brookfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in East Brookfield, MA",
    heroSubline:
      "Serving all of East Brookfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves East Brookfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve East Brookfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of East Brookfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in East Brookfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in East Brookfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in East Brookfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck East Brookfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "douglas",
    name: "Douglas",
    zipCodes: ["01516"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.113076,
    lng: -71.891139,
    metaTitle: "Ice Cream Truck Rental in Douglas, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Douglas, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Douglas, MA",
    heroSubline:
      "Serving all of Douglas with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Douglas, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Douglas, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Douglas. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Douglas?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Douglas?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Douglas.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Douglas Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "east-princeton",
    name: "East Princeton",
    zipCodes: ["01517"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.364807,
    lng: -71.896868,
    metaTitle:
      "Ice Cream Truck Rental in East Princeton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in East Princeton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in East Princeton, MA",
    heroSubline:
      "Serving all of East Princeton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves East Princeton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve East Princeton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of East Princeton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in East Princeton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in East Princeton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in East Princeton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck East Princeton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "fiskdale",
    name: "Fiskdale",
    zipCodes: ["01518"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.106405,
    lng: -72.114045,
    metaTitle: "Ice Cream Truck Rental in Fiskdale, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Fiskdale, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Fiskdale, MA",
    heroSubline:
      "Serving all of Fiskdale with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Fiskdale, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Fiskdale, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Fiskdale. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Fiskdale?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Fiskdale?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Fiskdale.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Fiskdale Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "grafton",
    name: "Grafton",
    zipCodes: ["01519"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.203944,
    lng: -71.682862,
    metaTitle: "Ice Cream Truck Rental in Grafton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Grafton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Grafton, MA",
    heroSubline:
      "Serving all of Grafton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Grafton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Grafton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Grafton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Grafton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Grafton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Grafton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Grafton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "holden",
    name: "Holden",
    zipCodes: ["01520"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.336791,
    lng: -71.845316,
    metaTitle: "Ice Cream Truck Rental in Holden, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Holden, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Holden, MA",
    heroSubline: "Serving all of Holden with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Holden, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Holden, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Holden. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Holden?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Holden?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Holden.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Holden Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "holland",
    name: "Holland",
    zipCodes: ["01521"],
    county: "Hampden County",
    region: "Massachusetts",
    lat: 42.061063,
    lng: -72.163991,
    metaTitle: "Ice Cream Truck Rental in Holland, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Holland, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Holland, MA",
    heroSubline:
      "Serving all of Holland with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Holland, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Holland, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Holland. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Holland?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Holland?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Holland.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Holland Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "jefferson",
    name: "Jefferson",
    zipCodes: ["01522"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.264629,
    lng: -71.795442,
    metaTitle: "Ice Cream Truck Rental in Jefferson, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Jefferson, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Jefferson, MA",
    heroSubline:
      "Serving all of Jefferson with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Jefferson, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Jefferson, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Jefferson. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Jefferson?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Jefferson?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Jefferson.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Jefferson Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "lancaster",
    name: "Lancaster",
    zipCodes: ["01523"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.427188,
    lng: -71.91177,
    metaTitle: "Ice Cream Truck Rental in Lancaster, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Lancaster, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Lancaster, MA",
    heroSubline:
      "Serving all of Lancaster with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Lancaster, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Lancaster, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Lancaster. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Lancaster?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Lancaster?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Lancaster.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Lancaster Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "leicester",
    name: "Leicester",
    zipCodes: ["01524"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.238192,
    lng: -72.012379,
    metaTitle: "Ice Cream Truck Rental in Leicester, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Leicester, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Leicester, MA",
    heroSubline:
      "Serving all of Leicester with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Leicester, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Leicester, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Leicester. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Leicester?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Leicester?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Leicester.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Leicester Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "linwood",
    name: "Linwood",
    zipCodes: ["01525"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.364807,
    lng: -71.896868,
    metaTitle: "Ice Cream Truck Rental in Linwood, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Linwood, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Linwood, MA",
    heroSubline:
      "Serving all of Linwood with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Linwood, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Linwood, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Linwood. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Linwood?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Linwood?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Linwood.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Linwood Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "manchaug",
    name: "Manchaug",
    zipCodes: ["01526"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.364807,
    lng: -71.896868,
    metaTitle: "Ice Cream Truck Rental in Manchaug, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Manchaug, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Manchaug, MA",
    heroSubline:
      "Serving all of Manchaug with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Manchaug, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Manchaug, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Manchaug. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Manchaug?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Manchaug?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Manchaug.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Manchaug Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "millbury",
    name: "Millbury",
    zipCodes: ["01527"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.255642,
    lng: -71.819961,
    metaTitle: "Ice Cream Truck Rental in Millbury, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Millbury, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Millbury, MA",
    heroSubline:
      "Serving all of Millbury with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Millbury, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Millbury, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Millbury. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Millbury?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Millbury?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Millbury.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Millbury Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "millville",
    name: "Millville",
    zipCodes: ["01529"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.124662,
    lng: -71.846943,
    metaTitle: "Ice Cream Truck Rental in Millville, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Millville, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Millville, MA",
    heroSubline:
      "Serving all of Millville with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Millville, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Millville, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Millville. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Millville?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Millville?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Millville.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Millville Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "new-braintree",
    name: "New Braintree",
    zipCodes: ["01531"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.320938,
    lng: -72.128644,
    metaTitle:
      "Ice Cream Truck Rental in New Braintree, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in New Braintree, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in New Braintree, MA",
    heroSubline:
      "Serving all of New Braintree with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves New Braintree, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve New Braintree, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of New Braintree. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in New Braintree?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in New Braintree?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in New Braintree.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck New Braintree Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "northborough",
    name: "Northborough",
    zipCodes: ["01532"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.322118,
    lng: -71.64282,
    metaTitle:
      "Ice Cream Truck Rental in Northborough, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Northborough, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Northborough, MA",
    heroSubline:
      "Serving all of Northborough with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Northborough, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Northborough, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Northborough. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Northborough?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Northborough?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Northborough.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Northborough Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "northbridge",
    name: "Northbridge",
    zipCodes: ["01534"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.207191,
    lng: -71.856807,
    metaTitle: "Ice Cream Truck Rental in Northbridge, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Northbridge, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Northbridge, MA",
    heroSubline:
      "Serving all of Northbridge with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Northbridge, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Northbridge, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Northbridge. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Northbridge?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Northbridge?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Northbridge.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Northbridge Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-brookfield",
    name: "North Brookfield",
    zipCodes: ["01535"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.275382,
    lng: -72.089338,
    metaTitle:
      "Ice Cream Truck Rental in North Brookfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Brookfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Brookfield, MA",
    heroSubline:
      "Serving all of North Brookfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Brookfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve North Brookfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Brookfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Brookfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Brookfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Brookfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Brookfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-grafton",
    name: "North Grafton",
    zipCodes: ["01536"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.407556,
    lng: -71.860402,
    metaTitle:
      "Ice Cream Truck Rental in North Grafton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Grafton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Grafton, MA",
    heroSubline:
      "Serving all of North Grafton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Grafton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve North Grafton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Grafton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Grafton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Grafton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Grafton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Grafton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-oxford",
    name: "North Oxford",
    zipCodes: ["01537"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.166241,
    lng: -71.891052,
    metaTitle:
      "Ice Cream Truck Rental in North Oxford, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Oxford, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Oxford, MA",
    heroSubline:
      "Serving all of North Oxford with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Oxford, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve North Oxford, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Oxford. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Oxford?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Oxford?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Oxford.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Oxford Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-uxbridge",
    name: "North Uxbridge",
    zipCodes: ["01538"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.364807,
    lng: -71.896868,
    metaTitle:
      "Ice Cream Truck Rental in North Uxbridge, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Uxbridge, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Uxbridge, MA",
    heroSubline:
      "Serving all of North Uxbridge with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Uxbridge, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve North Uxbridge, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Uxbridge. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Uxbridge?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Uxbridge?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Uxbridge.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Uxbridge Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "oxford",
    name: "Oxford",
    zipCodes: ["01540"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.109223,
    lng: -71.855444,
    metaTitle: "Ice Cream Truck Rental in Oxford, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Oxford, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Oxford, MA",
    heroSubline: "Serving all of Oxford with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Oxford, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Oxford, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Oxford. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Oxford?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Oxford?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Oxford.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Oxford Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "princeton",
    name: "Princeton",
    zipCodes: ["01541"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.451926,
    lng: -71.880057,
    metaTitle: "Ice Cream Truck Rental in Princeton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Princeton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Princeton, MA",
    heroSubline:
      "Serving all of Princeton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Princeton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Princeton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Princeton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Princeton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Princeton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Princeton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Princeton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "rochdale",
    name: "Rochdale",
    zipCodes: ["01542"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.220085,
    lng: -71.914361,
    metaTitle: "Ice Cream Truck Rental in Rochdale, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Rochdale, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Rochdale, MA",
    heroSubline:
      "Serving all of Rochdale with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Rochdale, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Rochdale, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Rochdale. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Rochdale?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Rochdale?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Rochdale.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Rochdale Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "rutland",
    name: "Rutland",
    zipCodes: ["01543"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.383516,
    lng: -71.95463,
    metaTitle: "Ice Cream Truck Rental in Rutland, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Rutland, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Rutland, MA",
    heroSubline:
      "Serving all of Rutland with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Rutland, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Rutland, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Rutland. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Rutland?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Rutland?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Rutland.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Rutland Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "shrewsbury",
    name: "Shrewsbury",
    zipCodes: ["01545", "01546"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.286992,
    lng: -71.715313,
    metaTitle: "Ice Cream Truck Rental in Shrewsbury, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Shrewsbury, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Shrewsbury, MA",
    heroSubline:
      "Serving all of Shrewsbury with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Shrewsbury, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Shrewsbury, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Shrewsbury. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Shrewsbury?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Shrewsbury?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Shrewsbury.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Shrewsbury Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "southbridge",
    name: "Southbridge",
    zipCodes: ["01550"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.129251,
    lng: -72.031155,
    metaTitle: "Ice Cream Truck Rental in Southbridge, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Southbridge, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Southbridge, MA",
    heroSubline:
      "Serving all of Southbridge with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Southbridge, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Southbridge, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Southbridge. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Southbridge?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Southbridge?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Southbridge.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Southbridge Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "south-grafton",
    name: "South Grafton",
    zipCodes: ["01560"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.176544,
    lng: -71.681912,
    metaTitle:
      "Ice Cream Truck Rental in South Grafton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in South Grafton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in South Grafton, MA",
    heroSubline:
      "Serving all of South Grafton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves South Grafton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve South Grafton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of South Grafton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in South Grafton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in South Grafton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in South Grafton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck South Grafton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "south-lancaster",
    name: "South Lancaster",
    zipCodes: ["01561"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.443539,
    lng: -71.686137,
    metaTitle:
      "Ice Cream Truck Rental in South Lancaster, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in South Lancaster, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in South Lancaster, MA",
    heroSubline:
      "Serving all of South Lancaster with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves South Lancaster, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve South Lancaster, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of South Lancaster. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in South Lancaster?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in South Lancaster?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in South Lancaster.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck South Lancaster Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "spencer",
    name: "Spencer",
    zipCodes: ["01562"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.254837,
    lng: -72.065612,
    metaTitle: "Ice Cream Truck Rental in Spencer, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Spencer, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Spencer, MA",
    heroSubline:
      "Serving all of Spencer with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Spencer, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Spencer, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Spencer. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Spencer?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Spencer?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Spencer.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Spencer Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "sterling",
    name: "Sterling",
    zipCodes: ["01564"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.366765,
    lng: -71.939375,
    metaTitle: "Ice Cream Truck Rental in Sterling, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Sterling, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Sterling, MA",
    heroSubline:
      "Serving all of Sterling with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Sterling, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Sterling, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Sterling. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Sterling?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Sterling?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Sterling.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Sterling Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "sturbridge",
    name: "Sturbridge",
    zipCodes: ["01566"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.10273,
    lng: -72.080996,
    metaTitle: "Ice Cream Truck Rental in Sturbridge, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Sturbridge, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Sturbridge, MA",
    heroSubline:
      "Serving all of Sturbridge with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Sturbridge, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Sturbridge, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Sturbridge. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Sturbridge?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Sturbridge?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Sturbridge.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Sturbridge Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "upton",
    name: "Upton",
    zipCodes: ["01568"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.175591,
    lng: -71.603197,
    metaTitle: "Ice Cream Truck Rental in Upton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Upton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Upton, MA",
    heroSubline: "Serving all of Upton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Upton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Upton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Upton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Upton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Upton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Upton.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Upton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "uxbridge",
    name: "Uxbridge",
    zipCodes: ["01569"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.059736,
    lng: -71.638438,
    metaTitle: "Ice Cream Truck Rental in Uxbridge, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Uxbridge, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Uxbridge, MA",
    heroSubline:
      "Serving all of Uxbridge with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Uxbridge, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Uxbridge, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Uxbridge. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Uxbridge?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Uxbridge?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Uxbridge.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Uxbridge Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "webster",
    name: "Webster",
    zipCodes: ["01570"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.1351,
    lng: -71.994169,
    metaTitle: "Ice Cream Truck Rental in Webster, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Webster, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Webster, MA",
    heroSubline:
      "Serving all of Webster with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Webster, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Webster, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Webster. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Webster?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Webster?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Webster.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Webster Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "dudley",
    name: "Dudley",
    zipCodes: ["01571"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.059189,
    lng: -71.937037,
    metaTitle: "Ice Cream Truck Rental in Dudley, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Dudley, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Dudley, MA",
    heroSubline: "Serving all of Dudley with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Dudley, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Dudley, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Dudley. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Dudley?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Dudley?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Dudley.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Dudley Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "westborough",
    name: "Westborough",
    zipCodes: ["01580", "01581", "01582"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.364807,
    lng: -71.896868,
    metaTitle: "Ice Cream Truck Rental in Westborough, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Westborough, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Westborough, MA",
    heroSubline:
      "Serving all of Westborough with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Westborough, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Westborough, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Westborough. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Westborough?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Westborough?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Westborough.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Westborough Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-boylston",
    name: "West Boylston",
    zipCodes: ["01583"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.362783,
    lng: -71.781215,
    metaTitle:
      "Ice Cream Truck Rental in West Boylston, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Boylston, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Boylston, MA",
    heroSubline:
      "Serving all of West Boylston with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Boylston, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve West Boylston, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Boylston. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in West Boylston?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Boylston?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Boylston.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Boylston Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-brookfield",
    name: "West Brookfield",
    zipCodes: ["01585"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.235638,
    lng: -72.172523,
    metaTitle:
      "Ice Cream Truck Rental in West Brookfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Brookfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Brookfield, MA",
    heroSubline:
      "Serving all of West Brookfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Brookfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve West Brookfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Brookfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in West Brookfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Brookfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Brookfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Brookfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-millbury",
    name: "West Millbury",
    zipCodes: ["01586"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.364807,
    lng: -71.896868,
    metaTitle:
      "Ice Cream Truck Rental in West Millbury, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Millbury, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Millbury, MA",
    heroSubline:
      "Serving all of West Millbury with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Millbury, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve West Millbury, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Millbury. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in West Millbury?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Millbury?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Millbury.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Millbury Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "whitinsville",
    name: "Whitinsville",
    zipCodes: ["01588"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.166554,
    lng: -71.899484,
    metaTitle:
      "Ice Cream Truck Rental in Whitinsville, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Whitinsville, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Whitinsville, MA",
    heroSubline:
      "Serving all of Whitinsville with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Whitinsville, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Whitinsville, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Whitinsville. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Whitinsville?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Whitinsville?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Whitinsville.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Whitinsville Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "sutton",
    name: "Sutton",
    zipCodes: ["01590"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.126575,
    lng: -71.755193,
    metaTitle: "Ice Cream Truck Rental in Sutton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Sutton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Sutton, MA",
    heroSubline: "Serving all of Sutton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Sutton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Sutton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Sutton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Sutton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Sutton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Sutton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Sutton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "cherry-valley",
    name: "Cherry Valley",
    zipCodes: ["01611"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.239392,
    lng: -71.878716,
    metaTitle:
      "Ice Cream Truck Rental in Cherry Valley, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Cherry Valley, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Cherry Valley, MA",
    heroSubline:
      "Serving all of Cherry Valley with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Cherry Valley, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Cherry Valley, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Cherry Valley. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Cherry Valley?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Cherry Valley?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Cherry Valley.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Cherry Valley Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "paxton",
    name: "Paxton",
    zipCodes: ["01612"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.304675,
    lng: -71.892875,
    metaTitle: "Ice Cream Truck Rental in Paxton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Paxton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Paxton, MA",
    heroSubline: "Serving all of Paxton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Paxton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Paxton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Paxton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Paxton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Paxton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Paxton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Paxton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "village-of-nagog-woods",
    name: "Village Of Nagog Woods",
    zipCodes: ["01718"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle:
      "Ice Cream Truck Rental in Village Of Nagog Woods, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Village Of Nagog Woods, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Village Of Nagog Woods, MA",
    heroSubline:
      "Serving all of Village Of Nagog Woods with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Village Of Nagog Woods, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Village Of Nagog Woods, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Village Of Nagog Woods. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Village Of Nagog Woods?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Village Of Nagog Woods?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Village Of Nagog Woods.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Village Of Nagog Woods Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "boxborough",
    name: "Boxborough",
    zipCodes: ["01719"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Boxborough, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Boxborough, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Boxborough, MA",
    heroSubline:
      "Serving all of Boxborough with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Boxborough, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Boxborough, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Boxborough. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Boxborough?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Boxborough?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Boxborough.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Boxborough Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "acton",
    name: "Acton",
    zipCodes: ["01720"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Acton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Acton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Acton, MA",
    heroSubline: "Serving all of Acton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Acton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Acton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Acton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Acton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Acton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Acton.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Acton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "ashland",
    name: "Ashland",
    zipCodes: ["01721"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Ashland, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Ashland, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Ashland, MA",
    heroSubline:
      "Serving all of Ashland with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Ashland, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Ashland, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Ashland. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Ashland?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Ashland?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Ashland.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Ashland Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "bedford",
    name: "Bedford",
    zipCodes: ["01730"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Bedford, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Bedford, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Bedford, MA",
    heroSubline:
      "Serving all of Bedford with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Bedford, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Bedford, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Bedford. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Bedford?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Bedford?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Bedford.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Bedford Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "hanscom-afb",
    name: "Hanscom Afb",
    zipCodes: ["01731"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Hanscom Afb, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Hanscom Afb, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Hanscom Afb, MA",
    heroSubline:
      "Serving all of Hanscom Afb with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Hanscom Afb, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Hanscom Afb, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Hanscom Afb. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Hanscom Afb?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Hanscom Afb?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Hanscom Afb.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Hanscom Afb Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "bolton",
    name: "Bolton",
    zipCodes: ["01740"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.436043,
    lng: -71.605916,
    metaTitle: "Ice Cream Truck Rental in Bolton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Bolton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Bolton, MA",
    heroSubline: "Serving all of Bolton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Bolton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Bolton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Bolton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Bolton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Bolton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Bolton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Bolton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "carlisle",
    name: "Carlisle",
    zipCodes: ["01741"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Carlisle, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Carlisle, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Carlisle, MA",
    heroSubline:
      "Serving all of Carlisle with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Carlisle, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Carlisle, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Carlisle. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Carlisle?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Carlisle?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Carlisle.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Carlisle Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "concord",
    name: "Concord",
    zipCodes: ["01742"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Concord, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Concord, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Concord, MA",
    heroSubline:
      "Serving all of Concord with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Concord, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Concord, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Concord. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Concord?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Concord?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Concord.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Concord Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "fayville",
    name: "Fayville",
    zipCodes: ["01745"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.293442,
    lng: -71.502762,
    metaTitle: "Ice Cream Truck Rental in Fayville, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Fayville, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Fayville, MA",
    heroSubline:
      "Serving all of Fayville with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Fayville, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Fayville, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Fayville. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Fayville?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Fayville?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Fayville.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Fayville Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "holliston",
    name: "Holliston",
    zipCodes: ["01746"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Holliston, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Holliston, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Holliston, MA",
    heroSubline:
      "Serving all of Holliston with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Holliston, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Holliston, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Holliston. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Holliston?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Holliston?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Holliston.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Holliston Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "hopedale",
    name: "Hopedale",
    zipCodes: ["01747"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.127515,
    lng: -71.533138,
    metaTitle: "Ice Cream Truck Rental in Hopedale, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Hopedale, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Hopedale, MA",
    heroSubline:
      "Serving all of Hopedale with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Hopedale, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Hopedale, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Hopedale. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Hopedale?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Hopedale?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Hopedale.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Hopedale Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "hopkinton",
    name: "Hopkinton",
    zipCodes: ["01748"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Hopkinton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Hopkinton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Hopkinton, MA",
    heroSubline:
      "Serving all of Hopkinton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Hopkinton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Hopkinton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Hopkinton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Hopkinton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Hopkinton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Hopkinton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Hopkinton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "hudson",
    name: "Hudson",
    zipCodes: ["01749"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Hudson, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Hudson, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Hudson, MA",
    heroSubline: "Serving all of Hudson with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Hudson, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Hudson, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Hudson. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Hudson?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Hudson?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Hudson.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Hudson Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "marlborough",
    name: "Marlborough",
    zipCodes: ["01752"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Marlborough, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Marlborough, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Marlborough, MA",
    heroSubline:
      "Serving all of Marlborough with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Marlborough, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Marlborough, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Marlborough. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Marlborough?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Marlborough?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Marlborough.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Marlborough Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "maynard",
    name: "Maynard",
    zipCodes: ["01754"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Maynard, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Maynard, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Maynard, MA",
    heroSubline:
      "Serving all of Maynard with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Maynard, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Maynard, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Maynard. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Maynard?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Maynard?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Maynard.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Maynard Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "mendon",
    name: "Mendon",
    zipCodes: ["01756"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.100352,
    lng: -71.546961,
    metaTitle: "Ice Cream Truck Rental in Mendon, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Mendon, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Mendon, MA",
    heroSubline: "Serving all of Mendon with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Mendon, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Mendon, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Mendon. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Mendon?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Mendon?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Mendon.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Mendon Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "milford",
    name: "Milford",
    zipCodes: ["01757"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.147087,
    lng: -71.528085,
    metaTitle: "Ice Cream Truck Rental in Milford, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Milford, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Milford, MA",
    heroSubline:
      "Serving all of Milford with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Milford, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Milford, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Milford. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Milford?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Milford?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Milford.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Milford Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "natick",
    name: "Natick",
    zipCodes: ["01760"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Natick, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Natick, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Natick, MA",
    heroSubline: "Serving all of Natick with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Natick, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Natick, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Natick. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Natick?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Natick?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Natick.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Natick Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "sherborn",
    name: "Sherborn",
    zipCodes: ["01770"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Sherborn, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Sherborn, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Sherborn, MA",
    heroSubline:
      "Serving all of Sherborn with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Sherborn, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Sherborn, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Sherborn. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Sherborn?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Sherborn?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Sherborn.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Sherborn Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "southborough",
    name: "Southborough",
    zipCodes: ["01772"],
    county: "Worcester County",
    region: "Massachusetts",
    lat: 42.296842,
    lng: -71.533229,
    metaTitle:
      "Ice Cream Truck Rental in Southborough, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Southborough, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Southborough, MA",
    heroSubline:
      "Serving all of Southborough with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Southborough, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Southborough, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Southborough. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Southborough?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Southborough?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Southborough.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Southborough Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "lincoln",
    name: "Lincoln",
    zipCodes: ["01773"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Lincoln, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Lincoln, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Lincoln, MA",
    heroSubline:
      "Serving all of Lincoln with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Lincoln, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Lincoln, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Lincoln. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Lincoln?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Lincoln?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Lincoln.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Lincoln Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "stow",
    name: "Stow",
    zipCodes: ["01775"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Stow, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Stow, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Stow, MA",
    heroSubline: "Serving all of Stow with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Stow, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Stow, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Stow. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Stow?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Stow?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Stow.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Stow Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "sudbury",
    name: "Sudbury",
    zipCodes: ["01776"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Sudbury, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Sudbury, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Sudbury, MA",
    heroSubline:
      "Serving all of Sudbury with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Sudbury, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Sudbury, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Sudbury. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Sudbury?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Sudbury?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Sudbury.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Sudbury Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "wayland",
    name: "Wayland",
    zipCodes: ["01778"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Wayland, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Wayland, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Wayland, MA",
    heroSubline:
      "Serving all of Wayland with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Wayland, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Wayland, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Wayland. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Wayland?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Wayland?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Wayland.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Wayland Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "woodville",
    name: "Woodville",
    zipCodes: ["01784"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Woodville, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Woodville, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Woodville, MA",
    heroSubline:
      "Serving all of Woodville with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Woodville, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Woodville, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Woodville. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Woodville?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Woodville?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Woodville.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Woodville Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "woburn",
    name: "Woburn",
    zipCodes: ["01801", "01807", "01813", "01815", "01888", "01808"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.488595,
    lng: -71.157271,
    metaTitle: "Ice Cream Truck Rental in Woburn, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Woburn, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Woburn, MA",
    heroSubline: "Serving all of Woburn with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Woburn, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Woburn, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Woburn. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Woburn?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Woburn?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Woburn.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Woburn Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "burlington",
    name: "Burlington",
    zipCodes: ["01803", "01805"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.504844,
    lng: -71.201539,
    metaTitle: "Ice Cream Truck Rental in Burlington, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Burlington, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Burlington, MA",
    heroSubline:
      "Serving all of Burlington with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Burlington, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Burlington, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Burlington. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Burlington?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Burlington?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Burlington.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Burlington Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "andover",
    name: "Andover",
    zipCodes: ["01810", "01812", "01899", "05501", "05544"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.647991,
    lng: -71.165685,
    metaTitle: "Ice Cream Truck Rental in Andover, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Andover, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Andover, MA",
    heroSubline:
      "Serving all of Andover with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Andover, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Andover, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Andover. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Andover?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Andover?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Andover.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Andover Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "billerica",
    name: "Billerica",
    zipCodes: ["01821", "01822"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Billerica, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Billerica, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Billerica, MA",
    heroSubline:
      "Serving all of Billerica with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Billerica, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Billerica, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Billerica. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Billerica?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Billerica?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Billerica.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Billerica Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "chelmsford",
    name: "Chelmsford",
    zipCodes: ["01824"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Chelmsford, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Chelmsford, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Chelmsford, MA",
    heroSubline:
      "Serving all of Chelmsford with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Chelmsford, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Chelmsford, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Chelmsford. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Chelmsford?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Chelmsford?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Chelmsford.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Chelmsford Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "dracut",
    name: "Dracut",
    zipCodes: ["01826"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Dracut, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Dracut, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Dracut, MA",
    heroSubline: "Serving all of Dracut with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Dracut, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Dracut, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Dracut. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Dracut?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Dracut?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Dracut.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Dracut Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "dunstable",
    name: "Dunstable",
    zipCodes: ["01827"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Dunstable, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Dunstable, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Dunstable, MA",
    heroSubline:
      "Serving all of Dunstable with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Dunstable, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Dunstable, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Dunstable. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Dunstable?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Dunstable?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Dunstable.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Dunstable Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "haverhill",
    name: "Haverhill",
    zipCodes: ["01830", "01831", "01832", "01835"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.792639,
    lng: -71.072501,
    metaTitle: "Ice Cream Truck Rental in Haverhill, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Haverhill, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Haverhill, MA",
    heroSubline:
      "Serving all of Haverhill with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Haverhill, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Haverhill, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Haverhill. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Haverhill?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Haverhill?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Haverhill.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Haverhill Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "georgetown",
    name: "Georgetown",
    zipCodes: ["01833"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.72377,
    lng: -70.981298,
    metaTitle: "Ice Cream Truck Rental in Georgetown, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Georgetown, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Georgetown, MA",
    heroSubline:
      "Serving all of Georgetown with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Georgetown, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Georgetown, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Georgetown. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Georgetown?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Georgetown?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Georgetown.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Georgetown Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "groveland",
    name: "Groveland",
    zipCodes: ["01834"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.751074,
    lng: -71.021437,
    metaTitle: "Ice Cream Truck Rental in Groveland, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Groveland, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Groveland, MA",
    heroSubline:
      "Serving all of Groveland with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Groveland, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Groveland, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Groveland. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Groveland?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Groveland?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Groveland.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Groveland Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "lawrence",
    name: "Lawrence",
    zipCodes: ["01840", "01841", "01842", "01843"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.70734,
    lng: -71.161052,
    metaTitle: "Ice Cream Truck Rental in Lawrence, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Lawrence, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Lawrence, MA",
    heroSubline:
      "Serving all of Lawrence with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Lawrence, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Lawrence, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Lawrence. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Lawrence?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Lawrence?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Lawrence.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Lawrence Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "methuen",
    name: "Methuen",
    zipCodes: ["01844"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.73184,
    lng: -71.186915,
    metaTitle: "Ice Cream Truck Rental in Methuen, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Methuen, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Methuen, MA",
    heroSubline:
      "Serving all of Methuen with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Methuen, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Methuen, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Methuen. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Methuen?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Methuen?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Methuen.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Methuen Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-andover",
    name: "North Andover",
    zipCodes: ["01845"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.672835,
    lng: -71.087689,
    metaTitle:
      "Ice Cream Truck Rental in North Andover, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Andover, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Andover, MA",
    heroSubline:
      "Serving all of North Andover with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Andover, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve North Andover, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Andover. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Andover?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Andover?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Andover.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Andover Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "merrimac",
    name: "Merrimac",
    zipCodes: ["01860"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.802441,
    lng: -71.0896,
    metaTitle: "Ice Cream Truck Rental in Merrimac, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Merrimac, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Merrimac, MA",
    heroSubline:
      "Serving all of Merrimac with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Merrimac, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Merrimac, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Merrimac. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Merrimac?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Merrimac?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Merrimac.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Merrimac Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-billerica",
    name: "North Billerica",
    zipCodes: ["01862"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle:
      "Ice Cream Truck Rental in North Billerica, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Billerica, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Billerica, MA",
    heroSubline:
      "Serving all of North Billerica with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Billerica, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve North Billerica, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Billerica. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Billerica?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Billerica?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Billerica.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Billerica Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-chelmsford",
    name: "North Chelmsford",
    zipCodes: ["01863"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle:
      "Ice Cream Truck Rental in North Chelmsford, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Chelmsford, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Chelmsford, MA",
    heroSubline:
      "Serving all of North Chelmsford with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Chelmsford, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve North Chelmsford, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Chelmsford. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Chelmsford?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Chelmsford?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Chelmsford.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Chelmsford Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-reading",
    name: "North Reading",
    zipCodes: ["01864", "01889"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.581332,
    lng: -71.083725,
    metaTitle:
      "Ice Cream Truck Rental in North Reading, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Reading, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Reading, MA",
    heroSubline:
      "Serving all of North Reading with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Reading, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve North Reading, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Reading. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Reading?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Reading?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Reading.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Reading Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "nutting-lake",
    name: "Nutting Lake",
    zipCodes: ["01865"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle:
      "Ice Cream Truck Rental in Nutting Lake, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Nutting Lake, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Nutting Lake, MA",
    heroSubline:
      "Serving all of Nutting Lake with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Nutting Lake, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Nutting Lake, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Nutting Lake. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Nutting Lake?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Nutting Lake?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Nutting Lake.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Nutting Lake Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "pinehurst",
    name: "Pinehurst",
    zipCodes: ["01866"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Pinehurst, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Pinehurst, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Pinehurst, MA",
    heroSubline:
      "Serving all of Pinehurst with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Pinehurst, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Pinehurst, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Pinehurst. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Pinehurst?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Pinehurst?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Pinehurst.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Pinehurst Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "reading",
    name: "Reading",
    zipCodes: ["01867"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.537065,
    lng: -71.107172,
    metaTitle: "Ice Cream Truck Rental in Reading, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Reading, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Reading, MA",
    heroSubline:
      "Serving all of Reading with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Reading, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Reading, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Reading. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Reading?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Reading?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Reading.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Reading Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "tewksbury",
    name: "Tewksbury",
    zipCodes: ["01876"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Tewksbury, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Tewksbury, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Tewksbury, MA",
    heroSubline:
      "Serving all of Tewksbury with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Tewksbury, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Tewksbury, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Tewksbury. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Tewksbury?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Tewksbury?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Tewksbury.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Tewksbury Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "tyngsboro",
    name: "Tyngsboro",
    zipCodes: ["01879"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Tyngsboro, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Tyngsboro, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Tyngsboro, MA",
    heroSubline:
      "Serving all of Tyngsboro with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Tyngsboro, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Tyngsboro, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Tyngsboro. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Tyngsboro?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Tyngsboro?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Tyngsboro.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Tyngsboro Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "wakefield",
    name: "Wakefield",
    zipCodes: ["01880"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.499891,
    lng: -71.068829,
    metaTitle: "Ice Cream Truck Rental in Wakefield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Wakefield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Wakefield, MA",
    heroSubline:
      "Serving all of Wakefield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Wakefield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Wakefield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Wakefield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Wakefield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Wakefield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Wakefield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Wakefield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-boxford",
    name: "West Boxford",
    zipCodes: ["01885"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.635443,
    lng: -70.879123,
    metaTitle:
      "Ice Cream Truck Rental in West Boxford, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Boxford, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Boxford, MA",
    heroSubline:
      "Serving all of West Boxford with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Boxford, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve West Boxford, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Boxford. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in West Boxford?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Boxford?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Boxford.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Boxford Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "westford",
    name: "Westford",
    zipCodes: ["01886"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Westford, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Westford, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Westford, MA",
    heroSubline:
      "Serving all of Westford with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Westford, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Westford, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Westford. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Westford?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Westford?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Westford.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Westford Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "wilmington",
    name: "Wilmington",
    zipCodes: ["01887"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.561782,
    lng: -71.173888,
    metaTitle: "Ice Cream Truck Rental in Wilmington, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Wilmington, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Wilmington, MA",
    heroSubline:
      "Serving all of Wilmington with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Wilmington, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Wilmington, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Wilmington. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Wilmington?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Wilmington?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Wilmington.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Wilmington Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "winchester",
    name: "Winchester",
    zipCodes: ["01890"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.454545,
    lng: -71.148779,
    metaTitle: "Ice Cream Truck Rental in Winchester, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Winchester, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Winchester, MA",
    heroSubline:
      "Serving all of Winchester with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Winchester, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Winchester, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Winchester. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Winchester?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Winchester?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Winchester.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Winchester Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "saugus",
    name: "Saugus",
    zipCodes: ["01906"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.472112,
    lng: -70.997794,
    metaTitle: "Ice Cream Truck Rental in Saugus, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Saugus, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Saugus, MA",
    heroSubline: "Serving all of Saugus with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Saugus, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Saugus, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Saugus. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Saugus?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Saugus?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Saugus.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Saugus Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "swampscott",
    name: "Swampscott",
    zipCodes: ["01907"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.513295,
    lng: -70.905893,
    metaTitle: "Ice Cream Truck Rental in Swampscott, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Swampscott, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Swampscott, MA",
    heroSubline:
      "Serving all of Swampscott with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Swampscott, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Swampscott, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Swampscott. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Swampscott?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Swampscott?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Swampscott.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Swampscott Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "nahant",
    name: "Nahant",
    zipCodes: ["01908"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.427296,
    lng: -70.922442,
    metaTitle: "Ice Cream Truck Rental in Nahant, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Nahant, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Nahant, MA",
    heroSubline: "Serving all of Nahant with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Nahant, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Nahant, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Nahant. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Nahant?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Nahant?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Nahant.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Nahant Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "amesbury",
    name: "Amesbury",
    zipCodes: ["01913"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.853539,
    lng: -70.948211,
    metaTitle: "Ice Cream Truck Rental in Amesbury, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Amesbury, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Amesbury, MA",
    heroSubline:
      "Serving all of Amesbury with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Amesbury, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Amesbury, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Amesbury. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Amesbury?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Amesbury?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Amesbury.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Amesbury Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "beverly",
    name: "Beverly",
    zipCodes: ["01915"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.565145,
    lng: -70.853843,
    metaTitle: "Ice Cream Truck Rental in Beverly, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Beverly, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Beverly, MA",
    heroSubline:
      "Serving all of Beverly with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Beverly, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Beverly, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Beverly. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Beverly?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Beverly?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Beverly.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Beverly Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "boxford",
    name: "Boxford",
    zipCodes: ["01921"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.683256,
    lng: -71.017403,
    metaTitle: "Ice Cream Truck Rental in Boxford, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Boxford, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Boxford, MA",
    heroSubline:
      "Serving all of Boxford with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Boxford, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Boxford, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Boxford. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Boxford?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Boxford?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Boxford.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Boxford Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "byfield",
    name: "Byfield",
    zipCodes: ["01922"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.763216,
    lng: -70.92812,
    metaTitle: "Ice Cream Truck Rental in Byfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Byfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Byfield, MA",
    heroSubline:
      "Serving all of Byfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Byfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Byfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Byfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Byfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Byfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Byfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Byfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "danvers",
    name: "Danvers",
    zipCodes: ["01923"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.577188,
    lng: -70.949245,
    metaTitle: "Ice Cream Truck Rental in Danvers, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Danvers, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Danvers, MA",
    heroSubline:
      "Serving all of Danvers with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Danvers, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Danvers, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Danvers. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Danvers?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Danvers?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Danvers.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Danvers Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "essex",
    name: "Essex",
    zipCodes: ["01929"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.62781,
    lng: -70.780576,
    metaTitle: "Ice Cream Truck Rental in Essex, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Essex, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Essex, MA",
    heroSubline: "Serving all of Essex with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Essex, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Essex, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Essex. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Essex?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Essex?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Essex.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Essex Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "gloucester",
    name: "Gloucester",
    zipCodes: ["01930", "01931"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.630011,
    lng: -70.694179,
    metaTitle: "Ice Cream Truck Rental in Gloucester, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Gloucester, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Gloucester, MA",
    heroSubline:
      "Serving all of Gloucester with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Gloucester, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Gloucester, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Gloucester. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Gloucester?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Gloucester?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Gloucester.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Gloucester Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "hamilton",
    name: "Hamilton",
    zipCodes: ["01936"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.635443,
    lng: -70.879123,
    metaTitle: "Ice Cream Truck Rental in Hamilton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Hamilton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Hamilton, MA",
    heroSubline:
      "Serving all of Hamilton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Hamilton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Hamilton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Hamilton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Hamilton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Hamilton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Hamilton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Hamilton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "hathorne",
    name: "Hathorne",
    zipCodes: ["01937"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.635443,
    lng: -70.879123,
    metaTitle: "Ice Cream Truck Rental in Hathorne, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Hathorne, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Hathorne, MA",
    heroSubline:
      "Serving all of Hathorne with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Hathorne, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Hathorne, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Hathorne. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Hathorne?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Hathorne?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Hathorne.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Hathorne Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "ipswich",
    name: "Ipswich",
    zipCodes: ["01938"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.68571,
    lng: -70.864132,
    metaTitle: "Ice Cream Truck Rental in Ipswich, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Ipswich, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Ipswich, MA",
    heroSubline:
      "Serving all of Ipswich with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Ipswich, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Ipswich, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Ipswich. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Ipswich?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Ipswich?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Ipswich.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Ipswich Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "lynnfield",
    name: "Lynnfield",
    zipCodes: ["01940"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.533732,
    lng: -71.028775,
    metaTitle: "Ice Cream Truck Rental in Lynnfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Lynnfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Lynnfield, MA",
    heroSubline:
      "Serving all of Lynnfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Lynnfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Lynnfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Lynnfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Lynnfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Lynnfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Lynnfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Lynnfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "manchester",
    name: "Manchester",
    zipCodes: ["01944"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.579503,
    lng: -70.755062,
    metaTitle: "Ice Cream Truck Rental in Manchester, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Manchester, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Manchester, MA",
    heroSubline:
      "Serving all of Manchester with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Manchester, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Manchester, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Manchester. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Manchester?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Manchester?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Manchester.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Manchester Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "marblehead",
    name: "Marblehead",
    zipCodes: ["01945"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.56142,
    lng: -70.770768,
    metaTitle: "Ice Cream Truck Rental in Marblehead, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Marblehead, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Marblehead, MA",
    heroSubline:
      "Serving all of Marblehead with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Marblehead, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Marblehead, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Marblehead. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Marblehead?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Marblehead?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Marblehead.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Marblehead Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "middleton",
    name: "Middleton",
    zipCodes: ["01949"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.644942,
    lng: -71.087905,
    metaTitle: "Ice Cream Truck Rental in Middleton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Middleton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Middleton, MA",
    heroSubline:
      "Serving all of Middleton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Middleton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Middleton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Middleton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Middleton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Middleton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Middleton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Middleton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "newburyport",
    name: "Newburyport",
    zipCodes: ["01950"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.80965,
    lng: -70.873196,
    metaTitle: "Ice Cream Truck Rental in Newburyport, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Newburyport, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Newburyport, MA",
    heroSubline:
      "Serving all of Newburyport with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Newburyport, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Newburyport, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Newburyport. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Newburyport?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Newburyport?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Newburyport.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Newburyport Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "newbury",
    name: "Newbury",
    zipCodes: ["01951"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.777524,
    lng: -70.867246,
    metaTitle: "Ice Cream Truck Rental in Newbury, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Newbury, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Newbury, MA",
    heroSubline:
      "Serving all of Newbury with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Newbury, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Newbury, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Newbury. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Newbury?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Newbury?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Newbury.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Newbury Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "salisbury",
    name: "Salisbury",
    zipCodes: ["01952"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.851234,
    lng: -70.865667,
    metaTitle: "Ice Cream Truck Rental in Salisbury, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Salisbury, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Salisbury, MA",
    heroSubline:
      "Serving all of Salisbury with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Salisbury, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Salisbury, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Salisbury. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Salisbury?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Salisbury?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Salisbury.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Salisbury Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "peabody",
    name: "Peabody",
    zipCodes: ["01960", "01961"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.536996,
    lng: -70.973646,
    metaTitle: "Ice Cream Truck Rental in Peabody, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Peabody, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Peabody, MA",
    heroSubline:
      "Serving all of Peabody with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Peabody, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Peabody, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Peabody. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Peabody?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Peabody?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Peabody.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Peabody Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "prides-crossing",
    name: "Prides Crossing",
    zipCodes: ["01965"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.558113,
    lng: -70.825743,
    metaTitle:
      "Ice Cream Truck Rental in Prides Crossing, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Prides Crossing, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Prides Crossing, MA",
    heroSubline:
      "Serving all of Prides Crossing with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Prides Crossing, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Prides Crossing, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Prides Crossing. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Prides Crossing?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Prides Crossing?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Prides Crossing.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Prides Crossing Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "rockport",
    name: "Rockport",
    zipCodes: ["01966"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.657866,
    lng: -70.618057,
    metaTitle: "Ice Cream Truck Rental in Rockport, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Rockport, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Rockport, MA",
    heroSubline:
      "Serving all of Rockport with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Rockport, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Rockport, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Rockport. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Rockport?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Rockport?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Rockport.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Rockport Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "rowley",
    name: "Rowley",
    zipCodes: ["01969"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.716155,
    lng: -70.892754,
    metaTitle: "Ice Cream Truck Rental in Rowley, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Rowley, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Rowley, MA",
    heroSubline: "Serving all of Rowley with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Rowley, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Rowley, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Rowley. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Rowley?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Rowley?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Rowley.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Rowley Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "south-hamilton",
    name: "South Hamilton",
    zipCodes: ["01982"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.626664,
    lng: -70.851125,
    metaTitle:
      "Ice Cream Truck Rental in South Hamilton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in South Hamilton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in South Hamilton, MA",
    heroSubline:
      "Serving all of South Hamilton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves South Hamilton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve South Hamilton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of South Hamilton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in South Hamilton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in South Hamilton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in South Hamilton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck South Hamilton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "topsfield",
    name: "Topsfield",
    zipCodes: ["01983"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.661793,
    lng: -70.954487,
    metaTitle: "Ice Cream Truck Rental in Topsfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Topsfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Topsfield, MA",
    heroSubline:
      "Serving all of Topsfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Topsfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Topsfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Topsfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Topsfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Topsfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Topsfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Topsfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "wenham",
    name: "Wenham",
    zipCodes: ["01984"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.597691,
    lng: -70.8732,
    metaTitle: "Ice Cream Truck Rental in Wenham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Wenham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Wenham, MA",
    heroSubline: "Serving all of Wenham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Wenham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Wenham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Wenham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Wenham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Wenham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Wenham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Wenham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-newbury",
    name: "West Newbury",
    zipCodes: ["01985"],
    county: "Essex County",
    region: "Massachusetts",
    lat: 42.79414,
    lng: -70.971068,
    metaTitle:
      "Ice Cream Truck Rental in West Newbury, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Newbury, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Newbury, MA",
    heroSubline:
      "Serving all of West Newbury with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Newbury, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve West Newbury, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Newbury. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in West Newbury?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Newbury?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Newbury.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Newbury Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "accord",
    name: "Accord",
    zipCodes: ["02018"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.970474,
    lng: -70.701357,
    metaTitle: "Ice Cream Truck Rental in Accord, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Accord, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Accord, MA",
    heroSubline: "Serving all of Accord with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Accord, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Accord, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Accord. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Accord?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Accord?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Accord.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Accord Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "bellingham",
    name: "Bellingham",
    zipCodes: ["02019"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.076501,
    lng: -71.470464,
    metaTitle: "Ice Cream Truck Rental in Bellingham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Bellingham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Bellingham, MA",
    heroSubline:
      "Serving all of Bellingham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Bellingham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Bellingham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Bellingham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Bellingham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Bellingham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Bellingham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Bellingham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "brant-rock",
    name: "Brant Rock",
    zipCodes: ["02020"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 42.081825,
    lng: -70.643868,
    metaTitle: "Ice Cream Truck Rental in Brant Rock, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Brant Rock, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Brant Rock, MA",
    heroSubline:
      "Serving all of Brant Rock with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Brant Rock, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Brant Rock, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Brant Rock. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Brant Rock?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Brant Rock?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Brant Rock.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Brant Rock Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "canton",
    name: "Canton",
    zipCodes: ["02021"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.179146,
    lng: -71.121185,
    metaTitle: "Ice Cream Truck Rental in Canton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Canton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Canton, MA",
    heroSubline: "Serving all of Canton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Canton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Canton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Canton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Canton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Canton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Canton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Canton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "cohasset",
    name: "Cohasset",
    zipCodes: ["02025"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.233938,
    lng: -70.815826,
    metaTitle: "Ice Cream Truck Rental in Cohasset, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Cohasset, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Cohasset, MA",
    heroSubline:
      "Serving all of Cohasset with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Cohasset, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Cohasset, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Cohasset. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Cohasset?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Cohasset?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Cohasset.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Cohasset Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "dedham",
    name: "Dedham",
    zipCodes: ["02026", "02027"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.244733,
    lng: -71.181141,
    metaTitle: "Ice Cream Truck Rental in Dedham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Dedham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Dedham, MA",
    heroSubline: "Serving all of Dedham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Dedham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Dedham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Dedham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Dedham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Dedham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Dedham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Dedham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "dover",
    name: "Dover",
    zipCodes: ["02030"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.236114,
    lng: -71.283072,
    metaTitle: "Ice Cream Truck Rental in Dover, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Dover, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Dover, MA",
    heroSubline: "Serving all of Dover with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Dover, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Dover, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Dover. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Dover?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Dover?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Dover.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Dover Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "east-mansfield",
    name: "East Mansfield",
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.998799,
    lng: -71.200894,
    metaTitle:
      "Ice Cream Truck Rental in East Mansfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in East Mansfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in East Mansfield, MA",
    heroSubline:
      "Serving all of East Mansfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves East Mansfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve East Mansfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of East Mansfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in East Mansfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in East Mansfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in East Mansfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck East Mansfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "east-walpole",
    name: "East Walpole",
    zipCodes: ["02032"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.153786,
    lng: -71.21455,
    metaTitle:
      "Ice Cream Truck Rental in East Walpole, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in East Walpole, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in East Walpole, MA",
    heroSubline:
      "Serving all of East Walpole with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves East Walpole, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve East Walpole, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of East Walpole. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in East Walpole?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in East Walpole?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in East Walpole.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck East Walpole Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "foxboro",
    name: "Foxboro",
    zipCodes: ["02035"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.062204,
    lng: -71.235774,
    metaTitle: "Ice Cream Truck Rental in Foxboro, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Foxboro, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Foxboro, MA",
    heroSubline:
      "Serving all of Foxboro with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Foxboro, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Foxboro, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Foxboro. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Foxboro?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Foxboro?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Foxboro.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Foxboro Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "franklin",
    name: "Franklin",
    zipCodes: ["02038"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.08868,
    lng: -71.404814,
    metaTitle: "Ice Cream Truck Rental in Franklin, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Franklin, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Franklin, MA",
    heroSubline:
      "Serving all of Franklin with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Franklin, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Franklin, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Franklin. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Franklin?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Franklin?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Franklin.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Franklin Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "greenbush",
    name: "Greenbush",
    zipCodes: ["02040"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.970474,
    lng: -70.701357,
    metaTitle: "Ice Cream Truck Rental in Greenbush, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Greenbush, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Greenbush, MA",
    heroSubline:
      "Serving all of Greenbush with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Greenbush, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Greenbush, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Greenbush. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Greenbush?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Greenbush?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Greenbush.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Greenbush Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "green-harbor",
    name: "Green Harbor",
    zipCodes: ["02041"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 42.069642,
    lng: -70.649075,
    metaTitle:
      "Ice Cream Truck Rental in Green Harbor, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Green Harbor, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Green Harbor, MA",
    heroSubline:
      "Serving all of Green Harbor with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Green Harbor, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Green Harbor, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Green Harbor. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Green Harbor?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Green Harbor?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Green Harbor.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Green Harbor Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "hingham",
    name: "Hingham",
    zipCodes: ["02043", "02044"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 42.212105,
    lng: -70.884989,
    metaTitle: "Ice Cream Truck Rental in Hingham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Hingham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Hingham, MA",
    heroSubline:
      "Serving all of Hingham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Hingham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Hingham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Hingham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Hingham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Hingham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Hingham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Hingham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "hull",
    name: "Hull",
    zipCodes: ["02045"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 42.284413,
    lng: -70.873659,
    metaTitle: "Ice Cream Truck Rental in Hull, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Hull, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Hull, MA",
    heroSubline: "Serving all of Hull with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Hull, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Hull, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Hull. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Hull?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Hull?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Hull.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Hull Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "humarock",
    name: "Humarock",
    zipCodes: ["02047"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 42.142836,
    lng: -70.69353,
    metaTitle: "Ice Cream Truck Rental in Humarock, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Humarock, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Humarock, MA",
    heroSubline:
      "Serving all of Humarock with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Humarock, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Humarock, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Humarock. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Humarock?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Humarock?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Humarock.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Humarock Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "mansfield",
    name: "Mansfield",
    zipCodes: ["02048", "02031"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 42.013182,
    lng: -71.218373,
    metaTitle: "Ice Cream Truck Rental in Mansfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Mansfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Mansfield, MA",
    heroSubline:
      "Serving all of Mansfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Mansfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Mansfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Mansfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Mansfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Mansfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Mansfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Mansfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "marshfield",
    name: "Marshfield",
    zipCodes: ["02050"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 42.111805,
    lng: -70.710744,
    metaTitle: "Ice Cream Truck Rental in Marshfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Marshfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Marshfield, MA",
    heroSubline:
      "Serving all of Marshfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Marshfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Marshfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Marshfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Marshfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Marshfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Marshfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Marshfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "marshfield-hills",
    name: "Marshfield Hills",
    zipCodes: ["02051"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 42.151202,
    lng: -70.734146,
    metaTitle:
      "Ice Cream Truck Rental in Marshfield Hills, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Marshfield Hills, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Marshfield Hills, MA",
    heroSubline:
      "Serving all of Marshfield Hills with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Marshfield Hills, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Marshfield Hills, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Marshfield Hills. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Marshfield Hills?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Marshfield Hills?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Marshfield Hills.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Marshfield Hills Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "medfield",
    name: "Medfield",
    zipCodes: ["02052"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.181265,
    lng: -71.309934,
    metaTitle: "Ice Cream Truck Rental in Medfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Medfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Medfield, MA",
    heroSubline:
      "Serving all of Medfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Medfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Medfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Medfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Medfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Medfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Medfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Medfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "medway",
    name: "Medway",
    zipCodes: ["02053"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.156282,
    lng: -71.427663,
    metaTitle: "Ice Cream Truck Rental in Medway, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Medway, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Medway, MA",
    heroSubline: "Serving all of Medway with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Medway, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Medway, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Medway. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Medway?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Medway?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Medway.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Medway Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "millis",
    name: "Millis",
    zipCodes: ["02054"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.165249,
    lng: -71.36126,
    metaTitle: "Ice Cream Truck Rental in Millis, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Millis, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Millis, MA",
    heroSubline: "Serving all of Millis with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Millis, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Millis, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Millis. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Millis?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Millis?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Millis.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Millis Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "minot",
    name: "Minot",
    zipCodes: ["02055"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.970474,
    lng: -70.701357,
    metaTitle: "Ice Cream Truck Rental in Minot, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Minot, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Minot, MA",
    heroSubline: "Serving all of Minot with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Minot, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Minot, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Minot. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Minot?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Minot?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Minot.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Minot Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "norfolk",
    name: "Norfolk",
    zipCodes: ["02056"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.117511,
    lng: -71.331793,
    metaTitle: "Ice Cream Truck Rental in Norfolk, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Norfolk, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Norfolk, MA",
    heroSubline:
      "Serving all of Norfolk with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Norfolk, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Norfolk, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Norfolk. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Norfolk?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Norfolk?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Norfolk.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Norfolk Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-marshfield",
    name: "North Marshfield",
    zipCodes: ["02059"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.970474,
    lng: -70.701357,
    metaTitle:
      "Ice Cream Truck Rental in North Marshfield, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Marshfield, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Marshfield, MA",
    heroSubline:
      "Serving all of North Marshfield with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Marshfield, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve North Marshfield, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Marshfield. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Marshfield?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Marshfield?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Marshfield.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Marshfield Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-scituate",
    name: "North Scituate",
    zipCodes: ["02060"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.970474,
    lng: -70.701357,
    metaTitle:
      "Ice Cream Truck Rental in North Scituate, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Scituate, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Scituate, MA",
    heroSubline:
      "Serving all of North Scituate with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Scituate, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve North Scituate, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Scituate. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Scituate?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Scituate?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Scituate.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Scituate Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "norwell",
    name: "Norwell",
    zipCodes: ["02061"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 42.154145,
    lng: -70.823035,
    metaTitle: "Ice Cream Truck Rental in Norwell, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Norwell, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Norwell, MA",
    heroSubline:
      "Serving all of Norwell with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Norwell, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Norwell, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Norwell. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Norwell?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Norwell?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Norwell.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Norwell Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "norwood",
    name: "Norwood",
    zipCodes: ["02062"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.182798,
    lng: -71.196277,
    metaTitle: "Ice Cream Truck Rental in Norwood, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Norwood, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Norwood, MA",
    heroSubline:
      "Serving all of Norwood with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Norwood, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Norwood, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Norwood. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Norwood?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Norwood?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Norwood.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Norwood Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "ocean-bluff",
    name: "Ocean Bluff",
    zipCodes: ["02065"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 42.097219,
    lng: -70.651567,
    metaTitle: "Ice Cream Truck Rental in Ocean Bluff, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Ocean Bluff, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Ocean Bluff, MA",
    heroSubline:
      "Serving all of Ocean Bluff with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Ocean Bluff, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Ocean Bluff, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Ocean Bluff. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Ocean Bluff?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Ocean Bluff?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Ocean Bluff.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Ocean Bluff Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "scituate",
    name: "Scituate",
    zipCodes: ["02066"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 42.207254,
    lng: -70.770188,
    metaTitle: "Ice Cream Truck Rental in Scituate, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Scituate, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Scituate, MA",
    heroSubline:
      "Serving all of Scituate with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Scituate, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Scituate, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Scituate. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Scituate?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Scituate?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Scituate.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Scituate Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "sharon",
    name: "Sharon",
    zipCodes: ["02067"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.105288,
    lng: -71.184785,
    metaTitle: "Ice Cream Truck Rental in Sharon, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Sharon, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Sharon, MA",
    heroSubline: "Serving all of Sharon with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Sharon, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Sharon, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Sharon. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Sharon?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Sharon?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Sharon.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Sharon Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "sheldonville",
    name: "Sheldonville",
    zipCodes: ["02070"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.180048,
    lng: -71.08923,
    metaTitle:
      "Ice Cream Truck Rental in Sheldonville, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Sheldonville, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Sheldonville, MA",
    heroSubline:
      "Serving all of Sheldonville with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Sheldonville, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Sheldonville, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Sheldonville. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Sheldonville?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Sheldonville?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Sheldonville.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Sheldonville Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "south-walpole",
    name: "South Walpole",
    zipCodes: ["02071"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.100399,
    lng: -71.270933,
    metaTitle:
      "Ice Cream Truck Rental in South Walpole, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in South Walpole, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in South Walpole, MA",
    heroSubline:
      "Serving all of South Walpole with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves South Walpole, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve South Walpole, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of South Walpole. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in South Walpole?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in South Walpole?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in South Walpole.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck South Walpole Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "stoughton",
    name: "Stoughton",
    zipCodes: ["02072"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.118416,
    lng: -71.105733,
    metaTitle: "Ice Cream Truck Rental in Stoughton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Stoughton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Stoughton, MA",
    heroSubline:
      "Serving all of Stoughton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Stoughton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Stoughton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Stoughton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Stoughton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Stoughton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Stoughton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Stoughton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "walpole",
    name: "Walpole",
    zipCodes: ["02081"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.148624,
    lng: -71.255533,
    metaTitle: "Ice Cream Truck Rental in Walpole, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Walpole, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Walpole, MA",
    heroSubline:
      "Serving all of Walpole with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Walpole, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Walpole, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Walpole. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Walpole?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Walpole?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Walpole.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Walpole Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "westwood",
    name: "Westwood",
    zipCodes: ["02090"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.220548,
    lng: -71.199238,
    metaTitle: "Ice Cream Truck Rental in Westwood, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Westwood, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Westwood, MA",
    heroSubline:
      "Serving all of Westwood with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Westwood, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Westwood, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Westwood. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Westwood?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Westwood?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Westwood.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Westwood Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "wrentham",
    name: "Wrentham",
    zipCodes: ["02093"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.054311,
    lng: -71.371169,
    metaTitle: "Ice Cream Truck Rental in Wrentham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Wrentham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Wrentham, MA",
    heroSubline:
      "Serving all of Wrentham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Wrentham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Wrentham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Wrentham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Wrentham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Wrentham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Wrentham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Wrentham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "mattapan",
    name: "Mattapan",
    zipCodes: ["02126"],
    county: "Suffolk County",
    region: "Massachusetts",
    lat: 42.301247,
    lng: -71.105195,
    metaTitle: "Ice Cream Truck Rental in Mattapan, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Mattapan, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Mattapan, MA",
    heroSubline:
      "Serving all of Mattapan with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Mattapan, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Mattapan, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Mattapan. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Mattapan?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Mattapan?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Mattapan.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Mattapan Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "charlestown",
    name: "Charlestown",
    zipCodes: ["02129"],
    county: "Suffolk County",
    region: "Massachusetts",
    lat: 42.382588,
    lng: -71.065287,
    metaTitle: "Ice Cream Truck Rental in Charlestown, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Charlestown, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Charlestown, MA",
    heroSubline:
      "Serving all of Charlestown with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Charlestown, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Charlestown, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Charlestown. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Charlestown?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Charlestown?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Charlestown.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Charlestown Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "jamaica-plain",
    name: "Jamaica Plain",
    zipCodes: ["02130"],
    county: "Suffolk County",
    region: "Massachusetts",
    lat: 42.309661,
    lng: -71.121097,
    metaTitle:
      "Ice Cream Truck Rental in Jamaica Plain, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Jamaica Plain, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Jamaica Plain, MA",
    heroSubline:
      "Serving all of Jamaica Plain with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Jamaica Plain, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Jamaica Plain, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Jamaica Plain. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Jamaica Plain?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Jamaica Plain?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Jamaica Plain.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Jamaica Plain Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "roslindale",
    name: "Roslindale",
    zipCodes: ["02131"],
    county: "Suffolk County",
    region: "Massachusetts",
    lat: 42.284197,
    lng: -71.120896,
    metaTitle: "Ice Cream Truck Rental in Roslindale, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Roslindale, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Roslindale, MA",
    heroSubline:
      "Serving all of Roslindale with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Roslindale, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Roslindale, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Roslindale. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Roslindale?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Roslindale?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Roslindale.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Roslindale Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-roxbury",
    name: "West Roxbury",
    zipCodes: ["02132"],
    county: "Suffolk County",
    region: "Massachusetts",
    lat: 42.277897,
    lng: -71.155833,
    metaTitle:
      "Ice Cream Truck Rental in West Roxbury, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Roxbury, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Roxbury, MA",
    heroSubline:
      "Serving all of West Roxbury with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Roxbury, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve West Roxbury, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Roxbury. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in West Roxbury?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Roxbury?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Roxbury.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Roxbury Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "allston",
    name: "Allston",
    zipCodes: ["02134"],
    county: "Suffolk County",
    region: "Massachusetts",
    lat: 42.357169,
    lng: -71.112646,
    metaTitle: "Ice Cream Truck Rental in Allston, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Allston, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Allston, MA",
    heroSubline:
      "Serving all of Allston with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Allston, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Allston, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Allston. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Allston?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Allston?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Allston.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Allston Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "brighton",
    name: "Brighton",
    zipCodes: ["02135"],
    county: "Suffolk County",
    region: "Massachusetts",
    lat: 42.349768,
    lng: -71.104888,
    metaTitle: "Ice Cream Truck Rental in Brighton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Brighton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Brighton, MA",
    heroSubline:
      "Serving all of Brighton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Brighton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Brighton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Brighton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Brighton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Brighton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Brighton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Brighton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "hyde-park",
    name: "Hyde Park",
    zipCodes: ["02136"],
    county: "Suffolk County",
    region: "Massachusetts",
    lat: 42.254248,
    lng: -71.129321,
    metaTitle: "Ice Cream Truck Rental in Hyde Park, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Hyde Park, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Hyde Park, MA",
    heroSubline:
      "Serving all of Hyde Park with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Hyde Park, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Hyde Park, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Hyde Park. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Hyde Park?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Hyde Park?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Hyde Park.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Hyde Park Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "readville",
    name: "Readville",
    zipCodes: ["02137"],
    county: "Suffolk County",
    region: "Massachusetts",
    lat: 42.338947,
    lng: -70.919635,
    metaTitle: "Ice Cream Truck Rental in Readville, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Readville, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Readville, MA",
    heroSubline:
      "Serving all of Readville with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Readville, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Readville, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Readville. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Readville?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Readville?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Readville.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Readville Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "malden",
    name: "Malden",
    zipCodes: ["02148"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.436545,
    lng: -71.085396,
    metaTitle: "Ice Cream Truck Rental in Malden, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Malden, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Malden, MA",
    heroSubline: "Serving all of Malden with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Malden, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Malden, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Malden. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Malden?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Malden?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Malden.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Malden Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "everett",
    name: "Everett",
    zipCodes: ["02149"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.407396,
    lng: -71.051183,
    metaTitle: "Ice Cream Truck Rental in Everett, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Everett, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Everett, MA",
    heroSubline:
      "Serving all of Everett with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Everett, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Everett, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Everett. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Everett?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Everett?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Everett.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Everett Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "chelsea",
    name: "Chelsea",
    zipCodes: ["02150"],
    county: "Suffolk County",
    region: "Massachusetts",
    lat: 42.378197,
    lng: -71.038894,
    metaTitle: "Ice Cream Truck Rental in Chelsea, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Chelsea, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Chelsea, MA",
    heroSubline:
      "Serving all of Chelsea with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Chelsea, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Chelsea, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Chelsea. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Chelsea?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Chelsea?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Chelsea.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Chelsea Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "winthrop",
    name: "Winthrop",
    zipCodes: ["02152"],
    county: "Suffolk County",
    region: "Massachusetts",
    lat: 42.378447,
    lng: -70.981679,
    metaTitle: "Ice Cream Truck Rental in Winthrop, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Winthrop, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Winthrop, MA",
    heroSubline:
      "Serving all of Winthrop with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Winthrop, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Winthrop, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Winthrop. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Winthrop?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Winthrop?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Winthrop.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Winthrop Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-medford",
    name: "West Medford",
    zipCodes: ["02156"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle:
      "Ice Cream Truck Rental in West Medford, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Medford, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Medford, MA",
    heroSubline:
      "Serving all of West Medford with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Medford, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve West Medford, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Medford. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in West Medford?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Medford?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Medford.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Medford Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "melrose",
    name: "Melrose",
    zipCodes: ["02176"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.458995,
    lng: -71.053095,
    metaTitle: "Ice Cream Truck Rental in Melrose, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Melrose, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Melrose, MA",
    heroSubline:
      "Serving all of Melrose with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Melrose, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Melrose, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Melrose. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Melrose?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Melrose?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Melrose.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Melrose Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "stoneham",
    name: "Stoneham",
    zipCodes: ["02180"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.474595,
    lng: -71.098146,
    metaTitle: "Ice Cream Truck Rental in Stoneham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Stoneham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Stoneham, MA",
    heroSubline:
      "Serving all of Stoneham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Stoneham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Stoneham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Stoneham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Stoneham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Stoneham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Stoneham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Stoneham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "braintree",
    name: "Braintree",
    zipCodes: ["02184", "02185"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.202216,
    lng: -71.005192,
    metaTitle: "Ice Cream Truck Rental in Braintree, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Braintree, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Braintree, MA",
    heroSubline:
      "Serving all of Braintree with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Braintree, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Braintree, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Braintree. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Braintree?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Braintree?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Braintree.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Braintree Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "milton",
    name: "Milton",
    zipCodes: ["02186"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.240598,
    lng: -71.078494,
    metaTitle: "Ice Cream Truck Rental in Milton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Milton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Milton, MA",
    heroSubline: "Serving all of Milton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Milton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Milton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Milton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Milton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Milton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Milton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Milton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "milton-village",
    name: "Milton Village",
    zipCodes: ["02187"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.180048,
    lng: -71.08923,
    metaTitle:
      "Ice Cream Truck Rental in Milton Village, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Milton Village, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Milton Village, MA",
    heroSubline:
      "Serving all of Milton Village with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Milton Village, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Milton Village, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Milton Village. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Milton Village?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Milton Village?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Milton Village.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Milton Village Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "weymouth",
    name: "Weymouth",
    zipCodes: ["02188"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.20794,
    lng: -70.95514,
    metaTitle: "Ice Cream Truck Rental in Weymouth, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Weymouth, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Weymouth, MA",
    heroSubline:
      "Serving all of Weymouth with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Weymouth, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Weymouth, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Weymouth. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Weymouth?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Weymouth?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Weymouth.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Weymouth Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "east-boston",
    name: "East Boston",
    zipCodes: ["02228"],
    county: "Suffolk County",
    region: "Massachusetts",
    lat: 42.375,
    lng: -71.03972,
    metaTitle: "Ice Cream Truck Rental in East Boston, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in East Boston, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in East Boston, MA",
    heroSubline:
      "Serving all of East Boston with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves East Boston, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve East Boston, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of East Boston. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in East Boston?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in East Boston?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in East Boston.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck East Boston Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "avon",
    name: "Avon",
    zipCodes: ["02322"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.126049,
    lng: -71.048216,
    metaTitle: "Ice Cream Truck Rental in Avon, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Avon, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Avon, MA",
    heroSubline: "Serving all of Avon with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Avon, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Avon, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Avon. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Avon?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Avon?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Avon.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Avon Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "bridgewater",
    name: "Bridgewater",
    zipCodes: ["02324", "02325"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.973741,
    lng: -70.976558,
    metaTitle: "Ice Cream Truck Rental in Bridgewater, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Bridgewater, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Bridgewater, MA",
    heroSubline:
      "Serving all of Bridgewater with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Bridgewater, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Bridgewater, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Bridgewater. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Bridgewater?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Bridgewater?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Bridgewater.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Bridgewater Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "bryantville",
    name: "Bryantville",
    zipCodes: ["02327"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 42.040708,
    lng: -70.827245,
    metaTitle: "Ice Cream Truck Rental in Bryantville, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Bryantville, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Bryantville, MA",
    heroSubline:
      "Serving all of Bryantville with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Bryantville, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Bryantville, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Bryantville. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Bryantville?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Bryantville?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Bryantville.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Bryantville Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "carver",
    name: "Carver",
    zipCodes: ["02330"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.896238,
    lng: -70.759689,
    metaTitle: "Ice Cream Truck Rental in Carver, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Carver, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Carver, MA",
    heroSubline: "Serving all of Carver with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Carver, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Carver, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Carver. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Carver?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Carver?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Carver.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Carver Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "duxbury",
    name: "Duxbury",
    zipCodes: ["02331", "02332"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.970474,
    lng: -70.701357,
    metaTitle: "Ice Cream Truck Rental in Duxbury, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Duxbury, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Duxbury, MA",
    heroSubline:
      "Serving all of Duxbury with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Duxbury, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Duxbury, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Duxbury. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Duxbury?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Duxbury?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Duxbury.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Duxbury Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "east-bridgewater",
    name: "East Bridgewater",
    zipCodes: ["02333"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 42.02285,
    lng: -70.931056,
    metaTitle:
      "Ice Cream Truck Rental in East Bridgewater, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in East Bridgewater, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in East Bridgewater, MA",
    heroSubline:
      "Serving all of East Bridgewater with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves East Bridgewater, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve East Bridgewater, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of East Bridgewater. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in East Bridgewater?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in East Bridgewater?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in East Bridgewater.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck East Bridgewater Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "easton",
    name: "Easton",
    zipCodes: ["02334"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 42.023528,
    lng: -71.132397,
    metaTitle: "Ice Cream Truck Rental in Easton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Easton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Easton, MA",
    heroSubline: "Serving all of Easton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Easton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Easton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Easton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Easton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Easton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Easton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Easton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "elmwood",
    name: "Elmwood",
    zipCodes: ["02337"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 42.022225,
    lng: -70.931588,
    metaTitle: "Ice Cream Truck Rental in Elmwood, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Elmwood, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Elmwood, MA",
    heroSubline:
      "Serving all of Elmwood with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Elmwood, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Elmwood, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Elmwood. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Elmwood?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Elmwood?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Elmwood.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Elmwood Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "halifax",
    name: "Halifax",
    zipCodes: ["02338"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.988351,
    lng: -70.860578,
    metaTitle: "Ice Cream Truck Rental in Halifax, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Halifax, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Halifax, MA",
    heroSubline:
      "Serving all of Halifax with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Halifax, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Halifax, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Halifax. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Halifax?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Halifax?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Halifax.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Halifax Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "hanover",
    name: "Hanover",
    zipCodes: ["02339", "02340"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 42.123534,
    lng: -70.851048,
    metaTitle: "Ice Cream Truck Rental in Hanover, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Hanover, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Hanover, MA",
    heroSubline:
      "Serving all of Hanover with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Hanover, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Hanover, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Hanover. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Hanover?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Hanover?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Hanover.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Hanover Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "hanson",
    name: "Hanson",
    zipCodes: ["02341"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 42.055701,
    lng: -70.875936,
    metaTitle: "Ice Cream Truck Rental in Hanson, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Hanson, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Hanson, MA",
    heroSubline: "Serving all of Hanson with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Hanson, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Hanson, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Hanson. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Hanson?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Hanson?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Hanson.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Hanson Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "holbrook",
    name: "Holbrook",
    zipCodes: ["02343"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.144424,
    lng: -71.00289,
    metaTitle: "Ice Cream Truck Rental in Holbrook, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Holbrook, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Holbrook, MA",
    heroSubline:
      "Serving all of Holbrook with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Holbrook, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Holbrook, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Holbrook. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Holbrook?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Holbrook?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Holbrook.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Holbrook Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "middleboro",
    name: "Middleboro",
    zipCodes: ["02344", "02346", "02349"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.970474,
    lng: -70.701357,
    metaTitle: "Ice Cream Truck Rental in Middleboro, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Middleboro, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Middleboro, MA",
    heroSubline:
      "Serving all of Middleboro with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Middleboro, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Middleboro, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Middleboro. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Middleboro?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Middleboro?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Middleboro.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Middleboro Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "manomet",
    name: "Manomet",
    zipCodes: ["02345"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.888198,
    lng: -70.581029,
    metaTitle: "Ice Cream Truck Rental in Manomet, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Manomet, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Manomet, MA",
    heroSubline:
      "Serving all of Manomet with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Manomet, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Manomet, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Manomet. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Manomet?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Manomet?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Manomet.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Manomet Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "lakeville",
    name: "Lakeville",
    zipCodes: ["02348", "02347"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.843757,
    lng: -70.959981,
    metaTitle: "Ice Cream Truck Rental in Lakeville, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Lakeville, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Lakeville, MA",
    heroSubline:
      "Serving all of Lakeville with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Lakeville, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Lakeville, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Lakeville. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Lakeville?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Lakeville?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Lakeville.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Lakeville Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "monponsett",
    name: "Monponsett",
    zipCodes: ["02350"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 42.018525,
    lng: -70.847486,
    metaTitle: "Ice Cream Truck Rental in Monponsett, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Monponsett, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Monponsett, MA",
    heroSubline:
      "Serving all of Monponsett with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Monponsett, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Monponsett, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Monponsett. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Monponsett?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Monponsett?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Monponsett.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Monponsett Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "abington",
    name: "Abington",
    zipCodes: ["02351"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 42.11749,
    lng: -70.959888,
    metaTitle: "Ice Cream Truck Rental in Abington, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Abington, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Abington, MA",
    heroSubline:
      "Serving all of Abington with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Abington, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Abington, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Abington. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Abington?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Abington?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Abington.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Abington Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-carver",
    name: "North Carver",
    zipCodes: ["02355"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.916918,
    lng: -70.801331,
    metaTitle:
      "Ice Cream Truck Rental in North Carver, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Carver, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Carver, MA",
    heroSubline:
      "Serving all of North Carver with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Carver, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve North Carver, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Carver. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Carver?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Carver?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Carver.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Carver Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-easton",
    name: "North Easton",
    zipCodes: ["02356", "02357"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 42.053408,
    lng: -71.12033,
    metaTitle:
      "Ice Cream Truck Rental in North Easton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Easton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Easton, MA",
    heroSubline:
      "Serving all of North Easton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Easton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve North Easton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Easton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Easton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Easton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Easton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Easton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-pembroke",
    name: "North Pembroke",
    zipCodes: ["02358"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.95351,
    lng: -70.713109,
    metaTitle:
      "Ice Cream Truck Rental in North Pembroke, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Pembroke, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Pembroke, MA",
    heroSubline:
      "Serving all of North Pembroke with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Pembroke, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve North Pembroke, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Pembroke. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Pembroke?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Pembroke?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Pembroke.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Pembroke Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "pembroke",
    name: "Pembroke",
    zipCodes: ["02359"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 42.065702,
    lng: -70.800778,
    metaTitle: "Ice Cream Truck Rental in Pembroke, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Pembroke, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Pembroke, MA",
    heroSubline:
      "Serving all of Pembroke with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Pembroke, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Pembroke, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Pembroke. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Pembroke?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Pembroke?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Pembroke.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Pembroke Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "kingston",
    name: "Kingston",
    zipCodes: ["02364"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.979405,
    lng: -70.744813,
    metaTitle: "Ice Cream Truck Rental in Kingston, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Kingston, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Kingston, MA",
    heroSubline:
      "Serving all of Kingston with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Kingston, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Kingston, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Kingston. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Kingston?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Kingston?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Kingston.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Kingston Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "south-carver",
    name: "South Carver",
    zipCodes: ["02366"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.850087,
    lng: -70.704431,
    metaTitle:
      "Ice Cream Truck Rental in South Carver, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in South Carver, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in South Carver, MA",
    heroSubline:
      "Serving all of South Carver with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves South Carver, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve South Carver, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of South Carver. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in South Carver?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in South Carver?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in South Carver.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck South Carver Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "plympton",
    name: "Plympton",
    zipCodes: ["02367"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.96914,
    lng: -70.812299,
    metaTitle: "Ice Cream Truck Rental in Plympton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Plympton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Plympton, MA",
    heroSubline:
      "Serving all of Plympton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Plympton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Plympton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Plympton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Plympton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Plympton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Plympton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Plympton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "randolph",
    name: "Randolph",
    zipCodes: ["02368"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.171467,
    lng: -71.055602,
    metaTitle: "Ice Cream Truck Rental in Randolph, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Randolph, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Randolph, MA",
    heroSubline:
      "Serving all of Randolph with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Randolph, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Randolph, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Randolph. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Randolph?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Randolph?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Randolph.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Randolph Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "rockland",
    name: "Rockland",
    zipCodes: ["02370"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.954199,
    lng: -70.885095,
    metaTitle: "Ice Cream Truck Rental in Rockland, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Rockland, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Rockland, MA",
    heroSubline:
      "Serving all of Rockland with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Rockland, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Rockland, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Rockland. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Rockland?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Rockland?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Rockland.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Rockland Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "south-easton",
    name: "South Easton",
    zipCodes: ["02375"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 42.023199,
    lng: -71.111091,
    metaTitle:
      "Ice Cream Truck Rental in South Easton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in South Easton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in South Easton, MA",
    heroSubline:
      "Serving all of South Easton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves South Easton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve South Easton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of South Easton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in South Easton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in South Easton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in South Easton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck South Easton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-bridgewater",
    name: "West Bridgewater",
    zipCodes: ["02379"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 42.02165,
    lng: -71.023588,
    metaTitle:
      "Ice Cream Truck Rental in West Bridgewater, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Bridgewater, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Bridgewater, MA",
    heroSubline:
      "Serving all of West Bridgewater with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Bridgewater, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve West Bridgewater, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Bridgewater. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in West Bridgewater?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Bridgewater?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Bridgewater.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Bridgewater Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "white-horse-beach",
    name: "White Horse Beach",
    zipCodes: ["02381"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.931602,
    lng: -70.561051,
    metaTitle:
      "Ice Cream Truck Rental in White Horse Beach, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in White Horse Beach, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in White Horse Beach, MA",
    heroSubline:
      "Serving all of White Horse Beach with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves White Horse Beach, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve White Horse Beach, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of White Horse Beach. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in White Horse Beach?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in White Horse Beach?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in White Horse Beach.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck White Horse Beach Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "whitman",
    name: "Whitman",
    zipCodes: ["02382"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 42.0785,
    lng: -70.940837,
    metaTitle: "Ice Cream Truck Rental in Whitman, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Whitman, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Whitman, MA",
    heroSubline:
      "Serving all of Whitman with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Whitman, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Whitman, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Whitman. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Whitman?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Whitman?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Whitman.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Whitman Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "lexington",
    name: "Lexington",
    zipCodes: ["02420", "02421"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.45631,
    lng: -71.21665,
    metaTitle: "Ice Cream Truck Rental in Lexington, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Lexington, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Lexington, MA",
    heroSubline:
      "Serving all of Lexington with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Lexington, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Lexington, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Lexington. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Lexington?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Lexington?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Lexington.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Lexington Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "brookline-village",
    name: "Brookline Village",
    zipCodes: ["02447"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.180048,
    lng: -71.08923,
    metaTitle:
      "Ice Cream Truck Rental in Brookline Village, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Brookline Village, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Brookline Village, MA",
    heroSubline:
      "Serving all of Brookline Village with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Brookline Village, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Brookline Village, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Brookline Village. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Brookline Village?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Brookline Village?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Brookline Village.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Brookline Village Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-waltham",
    name: "North Waltham",
    zipCodes: ["02455"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.404644,
    lng: -71.234086,
    metaTitle:
      "Ice Cream Truck Rental in North Waltham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Waltham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Waltham, MA",
    heroSubline:
      "Serving all of North Waltham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Waltham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve North Waltham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Waltham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Waltham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Waltham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Waltham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Waltham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "new-town",
    name: "New Town",
    zipCodes: ["02456"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in New Town, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in New Town, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in New Town, MA",
    heroSubline:
      "Serving all of New Town with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves New Town, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve New Town, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of New Town. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in New Town?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in New Town?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in New Town.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck New Town Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "babson-park",
    name: "Babson Park",
    zipCodes: ["02457"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.180048,
    lng: -71.08923,
    metaTitle: "Ice Cream Truck Rental in Babson Park, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Babson Park, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Babson Park, MA",
    heroSubline:
      "Serving all of Babson Park with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Babson Park, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Babson Park, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Babson Park. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Babson Park?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Babson Park?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Babson Park.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Babson Park Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "newton-center",
    name: "Newton Center",
    zipCodes: ["02459"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.334146,
    lng: -71.183298,
    metaTitle:
      "Ice Cream Truck Rental in Newton Center, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Newton Center, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Newton Center, MA",
    heroSubline:
      "Serving all of Newton Center with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Newton Center, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Newton Center, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Newton Center. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Newton Center?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Newton Center?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Newton Center.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Newton Center Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "newtonville",
    name: "Newtonville",
    zipCodes: ["02460"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.374296,
    lng: -71.182371,
    metaTitle: "Ice Cream Truck Rental in Newtonville, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Newtonville, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Newtonville, MA",
    heroSubline:
      "Serving all of Newtonville with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Newtonville, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Newtonville, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Newtonville. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Newtonville?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Newtonville?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Newtonville.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Newtonville Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "newton-highlands",
    name: "Newton Highlands",
    zipCodes: ["02461"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.361196,
    lng: -71.205349,
    metaTitle:
      "Ice Cream Truck Rental in Newton Highlands, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Newton Highlands, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Newton Highlands, MA",
    heroSubline:
      "Serving all of Newton Highlands with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Newton Highlands, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Newton Highlands, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Newton Highlands. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Newton Highlands?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Newton Highlands?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Newton Highlands.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Newton Highlands Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "newton-lower-falls",
    name: "Newton Lower Falls",
    zipCodes: ["02462"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.349496,
    lng: -71.209699,
    metaTitle:
      "Ice Cream Truck Rental in Newton Lower Falls, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Newton Lower Falls, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Newton Lower Falls, MA",
    heroSubline:
      "Serving all of Newton Lower Falls with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Newton Lower Falls, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Newton Lower Falls, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Newton Lower Falls. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Newton Lower Falls?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Newton Lower Falls?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Newton Lower Falls.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Newton Lower Falls Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "newton-upper-falls",
    name: "Newton Upper Falls",
    zipCodes: ["02464"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.36599,
    lng: -71.221849,
    metaTitle:
      "Ice Cream Truck Rental in Newton Upper Falls, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Newton Upper Falls, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Newton Upper Falls, MA",
    heroSubline:
      "Serving all of Newton Upper Falls with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Newton Upper Falls, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Newton Upper Falls, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Newton Upper Falls. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Newton Upper Falls?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Newton Upper Falls?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Newton Upper Falls.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Newton Upper Falls Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-newton",
    name: "West Newton",
    zipCodes: ["02465"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.378145,
    lng: -71.213199,
    metaTitle: "Ice Cream Truck Rental in West Newton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Newton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Newton, MA",
    heroSubline:
      "Serving all of West Newton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Newton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve West Newton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Newton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in West Newton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Newton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Newton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Newton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "auburndale",
    name: "Auburndale",
    zipCodes: ["02466"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.346696,
    lng: -71.224957,
    metaTitle: "Ice Cream Truck Rental in Auburndale, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Auburndale, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Auburndale, MA",
    heroSubline:
      "Serving all of Auburndale with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Auburndale, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Auburndale, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Auburndale. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Auburndale?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Auburndale?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Auburndale.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Auburndale Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "chestnut-hill",
    name: "Chestnut Hill",
    zipCodes: ["02467"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.357564,
    lng: -71.211649,
    metaTitle:
      "Ice Cream Truck Rental in Chestnut Hill, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Chestnut Hill, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Chestnut Hill, MA",
    heroSubline:
      "Serving all of Chestnut Hill with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Chestnut Hill, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Chestnut Hill, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Chestnut Hill. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Chestnut Hill?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Chestnut Hill?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Chestnut Hill.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Chestnut Hill Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "waban",
    name: "Waban",
    zipCodes: ["02468"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.327146,
    lng: -71.231534,
    metaTitle: "Ice Cream Truck Rental in Waban, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Waban, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Waban, MA",
    heroSubline: "Serving all of Waban with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Waban, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Waban, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Waban. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Waban?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Waban?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Waban.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Waban Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "watertown",
    name: "Watertown",
    zipCodes: ["02471", "02472", "02477"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Watertown, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Watertown, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Watertown, MA",
    heroSubline:
      "Serving all of Watertown with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Watertown, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Watertown, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Watertown. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Watertown?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Watertown?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Watertown.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Watertown Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "arlington",
    name: "Arlington",
    zipCodes: ["02474", "02476"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.417595,
    lng: -71.159696,
    metaTitle: "Ice Cream Truck Rental in Arlington, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Arlington, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Arlington, MA",
    heroSubline:
      "Serving all of Arlington with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Arlington, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Arlington, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Arlington. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Arlington?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Arlington?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Arlington.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Arlington Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "arlington-heights",
    name: "Arlington Heights",
    zipCodes: ["02475"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle:
      "Ice Cream Truck Rental in Arlington Heights, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Arlington Heights, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Arlington Heights, MA",
    heroSubline:
      "Serving all of Arlington Heights with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Arlington Heights, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Arlington Heights, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Arlington Heights. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Arlington Heights?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Arlington Heights?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Arlington Heights.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Arlington Heights Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "belmont",
    name: "Belmont",
    zipCodes: ["02478"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.412795,
    lng: -71.204399,
    metaTitle: "Ice Cream Truck Rental in Belmont, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Belmont, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Belmont, MA",
    heroSubline:
      "Serving all of Belmont with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Belmont, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Belmont, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Belmont. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Belmont?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Belmont?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Belmont.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Belmont Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "waverley",
    name: "Waverley",
    zipCodes: ["02479"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Waverley, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Waverley, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Waverley, MA",
    heroSubline:
      "Serving all of Waverley with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Waverley, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Waverley, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Waverley. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Waverley?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Waverley?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Waverley.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Waverley Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "wellesley-hills",
    name: "Wellesley Hills",
    zipCodes: ["02481"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.310597,
    lng: -71.274652,
    metaTitle:
      "Ice Cream Truck Rental in Wellesley Hills, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Wellesley Hills, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Wellesley Hills, MA",
    heroSubline:
      "Serving all of Wellesley Hills with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Wellesley Hills, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Wellesley Hills, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Wellesley Hills. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Wellesley Hills?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Wellesley Hills?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Wellesley Hills.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Wellesley Hills Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "wellesley",
    name: "Wellesley",
    zipCodes: ["02482"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.294546,
    lng: -71.299201,
    metaTitle: "Ice Cream Truck Rental in Wellesley, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Wellesley, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Wellesley, MA",
    heroSubline:
      "Serving all of Wellesley with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Wellesley, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Wellesley, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Wellesley. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Wellesley?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Wellesley?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Wellesley.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Wellesley Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "needham",
    name: "Needham",
    zipCodes: ["02492"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.279797,
    lng: -71.25006,
    metaTitle: "Ice Cream Truck Rental in Needham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Needham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Needham, MA",
    heroSubline:
      "Serving all of Needham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Needham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Needham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Needham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Needham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Needham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Needham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Needham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "weston",
    name: "Weston",
    zipCodes: ["02493"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.375925,
    lng: -71.227208,
    metaTitle: "Ice Cream Truck Rental in Weston, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Weston, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Weston, MA",
    heroSubline: "Serving all of Weston with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Weston, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Weston, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Weston. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Weston?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Weston?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Weston.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Weston Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "needham-heights",
    name: "Needham Heights",
    zipCodes: ["02494"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.300147,
    lng: -71.26315,
    metaTitle:
      "Ice Cream Truck Rental in Needham Heights, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Needham Heights, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Needham Heights, MA",
    heroSubline:
      "Serving all of Needham Heights with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Needham Heights, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Needham Heights, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Needham Heights. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Needham Heights?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Needham Heights?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Needham Heights.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Needham Heights Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "nonantum",
    name: "Nonantum",
    zipCodes: ["02495"],
    county: "Middlesex County",
    region: "Massachusetts",
    lat: 42.446396,
    lng: -71.459405,
    metaTitle: "Ice Cream Truck Rental in Nonantum, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Nonantum, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Nonantum, MA",
    heroSubline:
      "Serving all of Nonantum with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Nonantum, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Nonantum, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Nonantum. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Nonantum?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Nonantum?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Nonantum.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Nonantum Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "buzzards-bay",
    name: "Buzzards Bay",
    zipCodes: ["02532", "02542"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.745505,
    lng: -70.590471,
    metaTitle:
      "Ice Cream Truck Rental in Buzzards Bay, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Buzzards Bay, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Buzzards Bay, MA",
    heroSubline:
      "Serving all of Buzzards Bay with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Buzzards Bay, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Buzzards Bay, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Buzzards Bay. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Buzzards Bay?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Buzzards Bay?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Buzzards Bay.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Buzzards Bay Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "cataumet",
    name: "Cataumet",
    zipCodes: ["02534"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.669373,
    lng: -70.62337,
    metaTitle: "Ice Cream Truck Rental in Cataumet, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Cataumet, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Cataumet, MA",
    heroSubline:
      "Serving all of Cataumet with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Cataumet, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Cataumet, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Cataumet. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Cataumet?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Cataumet?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Cataumet.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Cataumet Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "chilmark",
    name: "Chilmark",
    zipCodes: ["02535"],
    county: "Dukes County",
    region: "Massachusetts",
    lat: 41.379034,
    lng: -70.673082,
    metaTitle: "Ice Cream Truck Rental in Chilmark, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Chilmark, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Chilmark, MA",
    heroSubline:
      "Serving all of Chilmark with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Chilmark, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Chilmark, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Chilmark. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Chilmark?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Chilmark?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Chilmark.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Chilmark Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "east-falmouth",
    name: "East Falmouth",
    zipCodes: ["02536"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.662506,
    lng: -70.562843,
    metaTitle:
      "Ice Cream Truck Rental in East Falmouth, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in East Falmouth, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in East Falmouth, MA",
    heroSubline:
      "Serving all of East Falmouth with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves East Falmouth, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve East Falmouth, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of East Falmouth. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in East Falmouth?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in East Falmouth?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in East Falmouth.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck East Falmouth Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "east-sandwich",
    name: "East Sandwich",
    zipCodes: ["02537"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.72832,
    lng: -70.439975,
    metaTitle:
      "Ice Cream Truck Rental in East Sandwich, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in East Sandwich, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in East Sandwich, MA",
    heroSubline:
      "Serving all of East Sandwich with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves East Sandwich, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve East Sandwich, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of East Sandwich. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in East Sandwich?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in East Sandwich?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in East Sandwich.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck East Sandwich Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "east-wareham",
    name: "East Wareham",
    zipCodes: ["02538"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.77544,
    lng: -70.660562,
    metaTitle:
      "Ice Cream Truck Rental in East Wareham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in East Wareham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in East Wareham, MA",
    heroSubline:
      "Serving all of East Wareham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves East Wareham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve East Wareham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of East Wareham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in East Wareham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in East Wareham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in East Wareham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck East Wareham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "edgartown",
    name: "Edgartown",
    zipCodes: ["02539"],
    county: "Dukes County",
    region: "Massachusetts",
    lat: 41.401176,
    lng: -70.552054,
    metaTitle: "Ice Cream Truck Rental in Edgartown, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Edgartown, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Edgartown, MA",
    heroSubline:
      "Serving all of Edgartown with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Edgartown, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Edgartown, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Edgartown. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Edgartown?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Edgartown?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Edgartown.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Edgartown Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "falmouth",
    name: "Falmouth",
    zipCodes: ["02540", "02541"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.614199,
    lng: -70.493263,
    metaTitle: "Ice Cream Truck Rental in Falmouth, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Falmouth, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Falmouth, MA",
    heroSubline:
      "Serving all of Falmouth with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Falmouth, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Falmouth, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Falmouth. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Falmouth?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Falmouth?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Falmouth.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Falmouth Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "woods-hole",
    name: "Woods Hole",
    zipCodes: ["02543"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.593809,
    lng: -70.646442,
    metaTitle: "Ice Cream Truck Rental in Woods Hole, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Woods Hole, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Woods Hole, MA",
    heroSubline:
      "Serving all of Woods Hole with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Woods Hole, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Woods Hole, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Woods Hole. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Woods Hole?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Woods Hole?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Woods Hole.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Woods Hole Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "menemsha",
    name: "Menemsha",
    zipCodes: ["02552"],
    county: "Dukes County",
    region: "Massachusetts",
    lat: 41.379836,
    lng: -70.643092,
    metaTitle: "Ice Cream Truck Rental in Menemsha, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Menemsha, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Menemsha, MA",
    heroSubline:
      "Serving all of Menemsha with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Menemsha, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Menemsha, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Menemsha. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Menemsha?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Menemsha?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Menemsha.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Menemsha Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "monument-beach",
    name: "Monument Beach",
    zipCodes: ["02553"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.67336,
    lng: -70.608047,
    metaTitle:
      "Ice Cream Truck Rental in Monument Beach, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Monument Beach, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Monument Beach, MA",
    heroSubline:
      "Serving all of Monument Beach with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Monument Beach, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Monument Beach, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Monument Beach. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Monument Beach?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Monument Beach?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Monument Beach.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Monument Beach Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "nantucket",
    name: "Nantucket",
    zipCodes: ["02554", "02584"],
    county: "Nantucket County",
    region: "Massachusetts",
    lat: 41.287647,
    lng: -70.08665,
    metaTitle: "Ice Cream Truck Rental in Nantucket, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Nantucket, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Nantucket, MA",
    heroSubline:
      "Serving all of Nantucket with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Nantucket, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Nantucket, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Nantucket. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Nantucket?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Nantucket?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Nantucket.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Nantucket Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-falmouth",
    name: "North Falmouth",
    zipCodes: ["02556"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.652967,
    lng: -70.375475,
    metaTitle:
      "Ice Cream Truck Rental in North Falmouth, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Falmouth, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Falmouth, MA",
    heroSubline:
      "Serving all of North Falmouth with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Falmouth, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve North Falmouth, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Falmouth. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Falmouth?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Falmouth?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Falmouth.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Falmouth Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "oak-bluffs",
    name: "Oak Bluffs",
    zipCodes: ["02557"],
    county: "Dukes County",
    region: "Massachusetts",
    lat: 41.417376,
    lng: -70.560032,
    metaTitle: "Ice Cream Truck Rental in Oak Bluffs, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Oak Bluffs, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Oak Bluffs, MA",
    heroSubline:
      "Serving all of Oak Bluffs with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Oak Bluffs, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Oak Bluffs, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Oak Bluffs. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Oak Bluffs?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Oak Bluffs?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Oak Bluffs.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Oak Bluffs Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "onset",
    name: "Onset",
    zipCodes: ["02558"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.74756,
    lng: -70.658164,
    metaTitle: "Ice Cream Truck Rental in Onset, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Onset, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Onset, MA",
    heroSubline: "Serving all of Onset with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Onset, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Onset, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Onset. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Onset?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Onset?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Onset.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Onset Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "pocasset",
    name: "Pocasset",
    zipCodes: ["02559"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.694771,
    lng: -70.622769,
    metaTitle: "Ice Cream Truck Rental in Pocasset, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Pocasset, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Pocasset, MA",
    heroSubline:
      "Serving all of Pocasset with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Pocasset, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Pocasset, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Pocasset. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Pocasset?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Pocasset?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Pocasset.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Pocasset Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "sagamore",
    name: "Sagamore",
    zipCodes: ["02561"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.770254,
    lng: -70.533664,
    metaTitle: "Ice Cream Truck Rental in Sagamore, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Sagamore, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Sagamore, MA",
    heroSubline:
      "Serving all of Sagamore with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Sagamore, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Sagamore, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Sagamore. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Sagamore?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Sagamore?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Sagamore.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Sagamore Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "sagamore-beach",
    name: "Sagamore Beach",
    zipCodes: ["02562"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.793263,
    lng: -70.519584,
    metaTitle:
      "Ice Cream Truck Rental in Sagamore Beach, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Sagamore Beach, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Sagamore Beach, MA",
    heroSubline:
      "Serving all of Sagamore Beach with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Sagamore Beach, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Sagamore Beach, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Sagamore Beach. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Sagamore Beach?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Sagamore Beach?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Sagamore Beach.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Sagamore Beach Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "sandwich",
    name: "Sandwich",
    zipCodes: ["02563"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.711291,
    lng: -70.477482,
    metaTitle: "Ice Cream Truck Rental in Sandwich, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Sandwich, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Sandwich, MA",
    heroSubline:
      "Serving all of Sandwich with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Sandwich, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Sandwich, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Sandwich. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Sandwich?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Sandwich?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Sandwich.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Sandwich Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "siasconset",
    name: "Siasconset",
    zipCodes: ["02564"],
    county: "Nantucket County",
    region: "Massachusetts",
    lat: 41.273949,
    lng: -70.015545,
    metaTitle: "Ice Cream Truck Rental in Siasconset, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Siasconset, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Siasconset, MA",
    heroSubline:
      "Serving all of Siasconset with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Siasconset, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Siasconset, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Siasconset. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Siasconset?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Siasconset?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Siasconset.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Siasconset Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "silver-beach",
    name: "Silver Beach",
    zipCodes: ["02565"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.799312,
    lng: -70.308662,
    metaTitle:
      "Ice Cream Truck Rental in Silver Beach, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Silver Beach, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Silver Beach, MA",
    heroSubline:
      "Serving all of Silver Beach with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Silver Beach, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Silver Beach, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Silver Beach. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Silver Beach?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Silver Beach?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Silver Beach.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Silver Beach Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "vineyard-haven",
    name: "Vineyard Haven",
    zipCodes: ["02568"],
    county: "Dukes County",
    region: "Massachusetts",
    lat: 41.41595,
    lng: -70.595235,
    metaTitle:
      "Ice Cream Truck Rental in Vineyard Haven, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Vineyard Haven, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Vineyard Haven, MA",
    heroSubline:
      "Serving all of Vineyard Haven with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Vineyard Haven, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Vineyard Haven, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Vineyard Haven. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Vineyard Haven?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Vineyard Haven?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Vineyard Haven.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Vineyard Haven Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "wareham",
    name: "Wareham",
    zipCodes: ["02571"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.760216,
    lng: -70.694662,
    metaTitle: "Ice Cream Truck Rental in Wareham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Wareham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Wareham, MA",
    heroSubline:
      "Serving all of Wareham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Wareham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Wareham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Wareham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Wareham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Wareham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Wareham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Wareham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-chop",
    name: "West Chop",
    zipCodes: ["02573"],
    county: "Dukes County",
    region: "Massachusetts",
    lat: 41.379836,
    lng: -70.643092,
    metaTitle: "Ice Cream Truck Rental in West Chop, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Chop, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Chop, MA",
    heroSubline:
      "Serving all of West Chop with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Chop, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve West Chop, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Chop. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in West Chop?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Chop?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Chop.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Chop Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-falmouth",
    name: "West Falmouth",
    zipCodes: ["02574"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.603946,
    lng: -70.638189,
    metaTitle:
      "Ice Cream Truck Rental in West Falmouth, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Falmouth, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Falmouth, MA",
    heroSubline:
      "Serving all of West Falmouth with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Falmouth, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve West Falmouth, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Falmouth. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in West Falmouth?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Falmouth?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Falmouth.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Falmouth Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-tisbury",
    name: "West Tisbury",
    zipCodes: ["02575"],
    county: "Dukes County",
    region: "Massachusetts",
    lat: 41.42125,
    lng: -70.642806,
    metaTitle:
      "Ice Cream Truck Rental in West Tisbury, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Tisbury, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Tisbury, MA",
    heroSubline:
      "Serving all of West Tisbury with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Tisbury, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve West Tisbury, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Tisbury. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in West Tisbury?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Tisbury?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Tisbury.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Tisbury Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-wareham",
    name: "West Wareham",
    zipCodes: ["02576"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.769863,
    lng: -70.749688,
    metaTitle:
      "Ice Cream Truck Rental in West Wareham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Wareham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Wareham, MA",
    heroSubline:
      "Serving all of West Wareham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Wareham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve West Wareham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Wareham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in West Wareham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Wareham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Wareham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Wareham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "hyannis",
    name: "Hyannis",
    zipCodes: ["02601"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.829813,
    lng: -70.138834,
    metaTitle: "Ice Cream Truck Rental in Hyannis, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Hyannis, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Hyannis, MA",
    heroSubline:
      "Serving all of Hyannis with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Hyannis, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Hyannis, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Hyannis. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Hyannis?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Hyannis?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Hyannis.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Hyannis Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "barnstable",
    name: "Barnstable",
    zipCodes: ["02630"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.697313,
    lng: -70.301394,
    metaTitle: "Ice Cream Truck Rental in Barnstable, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Barnstable, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Barnstable, MA",
    heroSubline:
      "Serving all of Barnstable with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Barnstable, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Barnstable, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Barnstable. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Barnstable?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Barnstable?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Barnstable.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Barnstable Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "brewster",
    name: "Brewster",
    zipCodes: ["02631"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.852997,
    lng: -70.044462,
    metaTitle: "Ice Cream Truck Rental in Brewster, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Brewster, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Brewster, MA",
    heroSubline:
      "Serving all of Brewster with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Brewster, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Brewster, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Brewster. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Brewster?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Brewster?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Brewster.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Brewster Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "centerville",
    name: "Centerville",
    zipCodes: ["02632", "02634", "02636"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.796311,
    lng: -70.175129,
    metaTitle: "Ice Cream Truck Rental in Centerville, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Centerville, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Centerville, MA",
    heroSubline:
      "Serving all of Centerville with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Centerville, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Centerville, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Centerville. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Centerville?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Centerville?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Centerville.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Centerville Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "chatham",
    name: "Chatham",
    zipCodes: ["02633"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.859559,
    lng: -70.0468,
    metaTitle: "Ice Cream Truck Rental in Chatham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Chatham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Chatham, MA",
    heroSubline:
      "Serving all of Chatham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Chatham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Chatham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Chatham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Chatham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Chatham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Chatham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Chatham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "cotuit",
    name: "Cotuit",
    zipCodes: ["02635"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.624341,
    lng: -70.43638,
    metaTitle: "Ice Cream Truck Rental in Cotuit, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Cotuit, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Cotuit, MA",
    heroSubline: "Serving all of Cotuit with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Cotuit, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Cotuit, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Cotuit. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Cotuit?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Cotuit?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Cotuit.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Cotuit Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "cummaquid",
    name: "Cummaquid",
    zipCodes: ["02637"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.701438,
    lng: -70.277212,
    metaTitle: "Ice Cream Truck Rental in Cummaquid, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Cummaquid, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Cummaquid, MA",
    heroSubline:
      "Serving all of Cummaquid with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Cummaquid, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Cummaquid, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Cummaquid. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Cummaquid?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Cummaquid?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Cummaquid.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Cummaquid Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "dennis",
    name: "Dennis",
    zipCodes: ["02638"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.725716,
    lng: -70.089142,
    metaTitle: "Ice Cream Truck Rental in Dennis, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Dennis, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Dennis, MA",
    heroSubline: "Serving all of Dennis with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Dennis, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Dennis, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Dennis. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Dennis?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Dennis?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Dennis.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Dennis Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "dennis-port",
    name: "Dennis Port",
    zipCodes: ["02639"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.750745,
    lng: -70.071836,
    metaTitle: "Ice Cream Truck Rental in Dennis Port, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Dennis Port, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Dennis Port, MA",
    heroSubline:
      "Serving all of Dennis Port with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Dennis Port, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Dennis Port, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Dennis Port. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Dennis Port?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Dennis Port?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Dennis Port.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Dennis Port Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "east-dennis",
    name: "East Dennis",
    zipCodes: ["02641"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.734713,
    lng: -70.20467,
    metaTitle: "Ice Cream Truck Rental in East Dennis, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in East Dennis, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in East Dennis, MA",
    heroSubline:
      "Serving all of East Dennis with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves East Dennis, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve East Dennis, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of East Dennis. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in East Dennis?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in East Dennis?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in East Dennis.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck East Dennis Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "eastham",
    name: "Eastham",
    zipCodes: ["02642"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.850612,
    lng: -70.020648,
    metaTitle: "Ice Cream Truck Rental in Eastham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Eastham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Eastham, MA",
    heroSubline:
      "Serving all of Eastham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Eastham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Eastham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Eastham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Eastham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Eastham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Eastham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Eastham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "east-orleans",
    name: "East Orleans",
    zipCodes: ["02643"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.784308,
    lng: -69.962034,
    metaTitle:
      "Ice Cream Truck Rental in East Orleans, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in East Orleans, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in East Orleans, MA",
    heroSubline:
      "Serving all of East Orleans with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves East Orleans, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve East Orleans, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of East Orleans. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in East Orleans?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in East Orleans?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in East Orleans.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck East Orleans Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "forestdale",
    name: "Forestdale",
    zipCodes: ["02644"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.790031,
    lng: -70.268632,
    metaTitle: "Ice Cream Truck Rental in Forestdale, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Forestdale, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Forestdale, MA",
    heroSubline:
      "Serving all of Forestdale with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Forestdale, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Forestdale, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Forestdale. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Forestdale?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Forestdale?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Forestdale.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Forestdale Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "harwich",
    name: "Harwich",
    zipCodes: ["02645"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.835582,
    lng: -70.043359,
    metaTitle: "Ice Cream Truck Rental in Harwich, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Harwich, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Harwich, MA",
    heroSubline:
      "Serving all of Harwich with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Harwich, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Harwich, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Harwich. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Harwich?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Harwich?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Harwich.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Harwich Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "harwich-port",
    name: "Harwich Port",
    zipCodes: ["02646"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.845717,
    lng: -70.053544,
    metaTitle:
      "Ice Cream Truck Rental in Harwich Port, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Harwich Port, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Harwich Port, MA",
    heroSubline:
      "Serving all of Harwich Port with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Harwich Port, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Harwich Port, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Harwich Port. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Harwich Port?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Harwich Port?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Harwich Port.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Harwich Port Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "hyannis-port",
    name: "Hyannis Port",
    zipCodes: ["02647"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.635004,
    lng: -70.306336,
    metaTitle:
      "Ice Cream Truck Rental in Hyannis Port, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Hyannis Port, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Hyannis Port, MA",
    heroSubline:
      "Serving all of Hyannis Port with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Hyannis Port, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Hyannis Port, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Hyannis Port. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Hyannis Port?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Hyannis Port?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Hyannis Port.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Hyannis Port Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "marstons-mills",
    name: "Marstons Mills",
    zipCodes: ["02648"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.813034,
    lng: -70.246666,
    metaTitle:
      "Ice Cream Truck Rental in Marstons Mills, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Marstons Mills, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Marstons Mills, MA",
    heroSubline:
      "Serving all of Marstons Mills with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Marstons Mills, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Marstons Mills, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Marstons Mills. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Marstons Mills?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Marstons Mills?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Marstons Mills.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Marstons Mills Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "mashpee",
    name: "Mashpee",
    zipCodes: ["02649"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.788337,
    lng: -70.253543,
    metaTitle: "Ice Cream Truck Rental in Mashpee, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Mashpee, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Mashpee, MA",
    heroSubline:
      "Serving all of Mashpee with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Mashpee, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Mashpee, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Mashpee. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Mashpee?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Mashpee?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Mashpee.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Mashpee Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-chatham",
    name: "North Chatham",
    zipCodes: ["02650"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.73497,
    lng: -70.029065,
    metaTitle:
      "Ice Cream Truck Rental in North Chatham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Chatham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Chatham, MA",
    heroSubline:
      "Serving all of North Chatham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Chatham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve North Chatham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Chatham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Chatham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Chatham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Chatham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Chatham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-eastham",
    name: "North Eastham",
    zipCodes: ["02651"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.824264,
    lng: -69.98176,
    metaTitle:
      "Ice Cream Truck Rental in North Eastham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Eastham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Eastham, MA",
    heroSubline:
      "Serving all of North Eastham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Eastham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve North Eastham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Eastham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Eastham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Eastham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Eastham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Eastham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-truro",
    name: "North Truro",
    zipCodes: ["02652"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.931061,
    lng: -70.283584,
    metaTitle: "Ice Cream Truck Rental in North Truro, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Truro, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Truro, MA",
    heroSubline:
      "Serving all of North Truro with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Truro, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve North Truro, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Truro. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in North Truro?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Truro?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Truro.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Truro Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "orleans",
    name: "Orleans",
    zipCodes: ["02653"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.852933,
    lng: -70.01539,
    metaTitle: "Ice Cream Truck Rental in Orleans, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Orleans, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Orleans, MA",
    heroSubline:
      "Serving all of Orleans with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Orleans, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Orleans, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Orleans. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Orleans?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Orleans?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Orleans.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Orleans Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "osterville",
    name: "Osterville",
    zipCodes: ["02655"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.810178,
    lng: -70.191269,
    metaTitle: "Ice Cream Truck Rental in Osterville, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Osterville, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Osterville, MA",
    heroSubline:
      "Serving all of Osterville with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Osterville, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Osterville, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Osterville. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Osterville?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Osterville?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Osterville.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Osterville Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "provincetown",
    name: "Provincetown",
    zipCodes: ["02657"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.888775,
    lng: -70.091057,
    metaTitle:
      "Ice Cream Truck Rental in Provincetown, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Provincetown, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Provincetown, MA",
    heroSubline:
      "Serving all of Provincetown with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Provincetown, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Provincetown, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Provincetown. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Provincetown?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Provincetown?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Provincetown.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Provincetown Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "south-chatham",
    name: "South Chatham",
    zipCodes: ["02659"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.848932,
    lng: -70.030194,
    metaTitle:
      "Ice Cream Truck Rental in South Chatham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in South Chatham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in South Chatham, MA",
    heroSubline:
      "Serving all of South Chatham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves South Chatham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve South Chatham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of South Chatham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in South Chatham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in South Chatham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in South Chatham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck South Chatham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "south-dennis",
    name: "South Dennis",
    zipCodes: ["02660"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.80038,
    lng: -70.089244,
    metaTitle:
      "Ice Cream Truck Rental in South Dennis, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in South Dennis, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in South Dennis, MA",
    heroSubline:
      "Serving all of South Dennis with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves South Dennis, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve South Dennis, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of South Dennis. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in South Dennis?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in South Dennis?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in South Dennis.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck South Dennis Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "south-harwich",
    name: "South Harwich",
    zipCodes: ["02661"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.686205,
    lng: -70.032858,
    metaTitle:
      "Ice Cream Truck Rental in South Harwich, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in South Harwich, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in South Harwich, MA",
    heroSubline:
      "Serving all of South Harwich with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves South Harwich, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve South Harwich, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of South Harwich. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in South Harwich?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in South Harwich?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in South Harwich.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck South Harwich Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "south-orleans",
    name: "South Orleans",
    zipCodes: ["02662"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.756694,
    lng: -69.984123,
    metaTitle:
      "Ice Cream Truck Rental in South Orleans, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in South Orleans, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in South Orleans, MA",
    heroSubline:
      "Serving all of South Orleans with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves South Orleans, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve South Orleans, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of South Orleans. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in South Orleans?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in South Orleans?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in South Orleans.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck South Orleans Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "south-wellfleet",
    name: "South Wellfleet",
    zipCodes: ["02663"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.800531,
    lng: -70.076776,
    metaTitle:
      "Ice Cream Truck Rental in South Wellfleet, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in South Wellfleet, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in South Wellfleet, MA",
    heroSubline:
      "Serving all of South Wellfleet with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves South Wellfleet, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve South Wellfleet, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of South Wellfleet. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in South Wellfleet?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in South Wellfleet?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in South Wellfleet.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck South Wellfleet Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "south-yarmouth",
    name: "South Yarmouth",
    zipCodes: ["02664"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.82412,
    lng: -70.084259,
    metaTitle:
      "Ice Cream Truck Rental in South Yarmouth, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in South Yarmouth, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in South Yarmouth, MA",
    heroSubline:
      "Serving all of South Yarmouth with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves South Yarmouth, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve South Yarmouth, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of South Yarmouth. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in South Yarmouth?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in South Yarmouth?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in South Yarmouth.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck South Yarmouth Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "truro",
    name: "Truro",
    zipCodes: ["02666"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.987377,
    lng: -70.047163,
    metaTitle: "Ice Cream Truck Rental in Truro, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Truro, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Truro, MA",
    heroSubline: "Serving all of Truro with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Truro, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Truro, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Truro. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Truro?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Truro?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Truro.",
      },
    ],
    heroImageQuery: "cinematic ice cream truck Truro Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "wellfleet",
    name: "Wellfleet",
    zipCodes: ["02667"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.821307,
    lng: -70.022806,
    metaTitle: "Ice Cream Truck Rental in Wellfleet, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Wellfleet, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Wellfleet, MA",
    heroSubline:
      "Serving all of Wellfleet with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Wellfleet, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Wellfleet, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Wellfleet. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Wellfleet?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Wellfleet?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Wellfleet.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Wellfleet Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-barnstable",
    name: "West Barnstable",
    zipCodes: ["02668"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.79055,
    lng: -70.201719,
    metaTitle:
      "Ice Cream Truck Rental in West Barnstable, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Barnstable, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Barnstable, MA",
    heroSubline:
      "Serving all of West Barnstable with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Barnstable, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve West Barnstable, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Barnstable. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in West Barnstable?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Barnstable?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Barnstable.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Barnstable Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-chatham",
    name: "West Chatham",
    zipCodes: ["02669"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.698721,
    lng: -70.004937,
    metaTitle:
      "Ice Cream Truck Rental in West Chatham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Chatham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Chatham, MA",
    heroSubline:
      "Serving all of West Chatham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Chatham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve West Chatham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Chatham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in West Chatham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Chatham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Chatham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Chatham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-dennis",
    name: "West Dennis",
    zipCodes: ["02670"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.710855,
    lng: -70.072195,
    metaTitle: "Ice Cream Truck Rental in West Dennis, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Dennis, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Dennis, MA",
    heroSubline:
      "Serving all of West Dennis with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Dennis, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve West Dennis, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Dennis. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in West Dennis?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Dennis?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Dennis.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Dennis Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-harwich",
    name: "West Harwich",
    zipCodes: ["02671"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.846719,
    lng: -70.038282,
    metaTitle:
      "Ice Cream Truck Rental in West Harwich, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Harwich, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Harwich, MA",
    heroSubline:
      "Serving all of West Harwich with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Harwich, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve West Harwich, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Harwich. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in West Harwich?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Harwich?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Harwich.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Harwich Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-hyannisport",
    name: "West Hyannisport",
    zipCodes: ["02672"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.635635,
    lng: -70.323307,
    metaTitle:
      "Ice Cream Truck Rental in West Hyannisport, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Hyannisport, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Hyannisport, MA",
    heroSubline:
      "Serving all of West Hyannisport with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Hyannisport, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve West Hyannisport, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Hyannisport. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in West Hyannisport?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Hyannisport?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Hyannisport.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Hyannisport Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "west-yarmouth",
    name: "West Yarmouth",
    zipCodes: ["02673"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.776105,
    lng: -70.150512,
    metaTitle:
      "Ice Cream Truck Rental in West Yarmouth, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in West Yarmouth, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in West Yarmouth, MA",
    heroSubline:
      "Serving all of West Yarmouth with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves West Yarmouth, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve West Yarmouth, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of West Yarmouth. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in West Yarmouth?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in West Yarmouth?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in West Yarmouth.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck West Yarmouth Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "yarmouth-port",
    name: "Yarmouth Port",
    zipCodes: ["02675"],
    county: "Barnstable County",
    region: "Massachusetts",
    lat: 41.716271,
    lng: -70.135884,
    metaTitle:
      "Ice Cream Truck Rental in Yarmouth Port, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Yarmouth Port, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Yarmouth Port, MA",
    heroSubline:
      "Serving all of Yarmouth Port with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Yarmouth Port, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Yarmouth Port, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Yarmouth Port. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Yarmouth Port?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Yarmouth Port?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Yarmouth Port.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Yarmouth Port Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "assonet",
    name: "Assonet",
    zipCodes: ["02702"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.782993,
    lng: -71.017328,
    metaTitle: "Ice Cream Truck Rental in Assonet, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Assonet, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Assonet, MA",
    heroSubline:
      "Serving all of Assonet with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Assonet, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Assonet, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Assonet. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Assonet?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Assonet?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Assonet.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Assonet Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "attleboro",
    name: "Attleboro",
    zipCodes: ["02703"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.938976,
    lng: -71.302297,
    metaTitle: "Ice Cream Truck Rental in Attleboro, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Attleboro, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Attleboro, MA",
    heroSubline:
      "Serving all of Attleboro with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Attleboro, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Attleboro, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Attleboro. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Attleboro?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Attleboro?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Attleboro.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Attleboro Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "chartley",
    name: "Chartley",
    zipCodes: ["02712"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.756214,
    lng: -71.067062,
    metaTitle: "Ice Cream Truck Rental in Chartley, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Chartley, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Chartley, MA",
    heroSubline:
      "Serving all of Chartley with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Chartley, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Chartley, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Chartley. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Chartley?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Chartley?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Chartley.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Chartley Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "cuttyhunk",
    name: "Cuttyhunk",
    zipCodes: ["02713"],
    county: "Dukes County",
    region: "Massachusetts",
    lat: 41.42178,
    lng: -70.931309,
    metaTitle: "Ice Cream Truck Rental in Cuttyhunk, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Cuttyhunk, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Cuttyhunk, MA",
    heroSubline:
      "Serving all of Cuttyhunk with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Cuttyhunk, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Cuttyhunk, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Cuttyhunk. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Cuttyhunk?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Cuttyhunk?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Cuttyhunk.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Cuttyhunk Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "dartmouth",
    name: "Dartmouth",
    zipCodes: ["02714"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.756214,
    lng: -71.067062,
    metaTitle: "Ice Cream Truck Rental in Dartmouth, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Dartmouth, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Dartmouth, MA",
    heroSubline:
      "Serving all of Dartmouth with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Dartmouth, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Dartmouth, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Dartmouth. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Dartmouth?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Dartmouth?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Dartmouth.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Dartmouth Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "dighton",
    name: "Dighton",
    zipCodes: ["02715"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.817659,
    lng: -71.151787,
    metaTitle: "Ice Cream Truck Rental in Dighton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Dighton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Dighton, MA",
    heroSubline:
      "Serving all of Dighton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Dighton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Dighton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Dighton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Dighton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Dighton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Dighton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Dighton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "east-freetown",
    name: "East Freetown",
    zipCodes: ["02717"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.747358,
    lng: -70.978947,
    metaTitle:
      "Ice Cream Truck Rental in East Freetown, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in East Freetown, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in East Freetown, MA",
    heroSubline:
      "Serving all of East Freetown with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves East Freetown, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve East Freetown, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of East Freetown. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in East Freetown?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in East Freetown?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in East Freetown.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck East Freetown Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "east-taunton",
    name: "East Taunton",
    zipCodes: ["02718"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.871407,
    lng: -71.013148,
    metaTitle:
      "Ice Cream Truck Rental in East Taunton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in East Taunton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in East Taunton, MA",
    heroSubline:
      "Serving all of East Taunton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves East Taunton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve East Taunton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of East Taunton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in East Taunton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in East Taunton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in East Taunton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck East Taunton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "fairhaven",
    name: "Fairhaven",
    zipCodes: ["02719"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.631672,
    lng: -70.870045,
    metaTitle: "Ice Cream Truck Rental in Fairhaven, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Fairhaven, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Fairhaven, MA",
    heroSubline:
      "Serving all of Fairhaven with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Fairhaven, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Fairhaven, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Fairhaven. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Fairhaven?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Fairhaven?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Fairhaven.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Fairhaven Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "fall-river",
    name: "Fall River",
    zipCodes: ["02720", "02721", "02722", "02723", "02724"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.819766,
    lng: -71.165971,
    metaTitle: "Ice Cream Truck Rental in Fall River, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Fall River, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Fall River, MA",
    heroSubline:
      "Serving all of Fall River with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Fall River, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Fall River, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Fall River. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Fall River?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Fall River?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Fall River.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Fall River Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "somerset",
    name: "Somerset",
    zipCodes: ["02725", "02726"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.723851,
    lng: -71.173989,
    metaTitle: "Ice Cream Truck Rental in Somerset, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Somerset, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Somerset, MA",
    heroSubline:
      "Serving all of Somerset with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Somerset, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Somerset, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Somerset. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Somerset?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Somerset?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Somerset.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Somerset Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "marion",
    name: "Marion",
    zipCodes: ["02738"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.736735,
    lng: -70.754015,
    metaTitle: "Ice Cream Truck Rental in Marion, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Marion, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Marion, MA",
    heroSubline: "Serving all of Marion with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Marion, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Marion, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Marion. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Marion?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Marion?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Marion.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Marion Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "mattapoisett",
    name: "Mattapoisett",
    zipCodes: ["02739"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.664976,
    lng: -70.810856,
    metaTitle:
      "Ice Cream Truck Rental in Mattapoisett, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Mattapoisett, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Mattapoisett, MA",
    heroSubline:
      "Serving all of Mattapoisett with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Mattapoisett, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Mattapoisett, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Mattapoisett. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Mattapoisett?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Mattapoisett?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Mattapoisett.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Mattapoisett Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "new-bedford",
    name: "New Bedford",
    zipCodes: ["02740", "02741", "02742", "02744", "02745", "02746"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.633416,
    lng: -70.951045,
    metaTitle: "Ice Cream Truck Rental in New Bedford, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in New Bedford, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in New Bedford, MA",
    heroSubline:
      "Serving all of New Bedford with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves New Bedford, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve New Bedford, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of New Bedford. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in New Bedford?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in New Bedford?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in New Bedford.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck New Bedford Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "acushnet",
    name: "Acushnet",
    zipCodes: ["02743"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.711894,
    lng: -70.908286,
    metaTitle: "Ice Cream Truck Rental in Acushnet, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Acushnet, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Acushnet, MA",
    heroSubline:
      "Serving all of Acushnet with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Acushnet, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Acushnet, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Acushnet. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Acushnet?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Acushnet?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Acushnet.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Acushnet Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-dartmouth",
    name: "North Dartmouth",
    zipCodes: ["02747"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.639261,
    lng: -71.007578,
    metaTitle:
      "Ice Cream Truck Rental in North Dartmouth, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Dartmouth, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Dartmouth, MA",
    heroSubline:
      "Serving all of North Dartmouth with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Dartmouth, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve North Dartmouth, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Dartmouth. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Dartmouth?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Dartmouth?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Dartmouth.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Dartmouth Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "south-dartmouth",
    name: "South Dartmouth",
    zipCodes: ["02748"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.566464,
    lng: -70.984253,
    metaTitle:
      "Ice Cream Truck Rental in South Dartmouth, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in South Dartmouth, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in South Dartmouth, MA",
    heroSubline:
      "Serving all of South Dartmouth with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves South Dartmouth, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve South Dartmouth, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of South Dartmouth. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in South Dartmouth?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in South Dartmouth?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in South Dartmouth.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck South Dartmouth Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-attleboro",
    name: "North Attleboro",
    zipCodes: ["02760", "02761"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.964376,
    lng: -71.326448,
    metaTitle:
      "Ice Cream Truck Rental in North Attleboro, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Attleboro, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Attleboro, MA",
    heroSubline:
      "Serving all of North Attleboro with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Attleboro, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve North Attleboro, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Attleboro. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Attleboro?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Attleboro?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Attleboro.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Attleboro Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "plainville",
    name: "Plainville",
    zipCodes: ["02762"],
    county: "Norfolk County",
    region: "Massachusetts",
    lat: 42.013553,
    lng: -71.334399,
    metaTitle: "Ice Cream Truck Rental in Plainville, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Plainville, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Plainville, MA",
    heroSubline:
      "Serving all of Plainville with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Plainville, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Plainville, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Plainville. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Plainville?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Plainville?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Plainville.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Plainville Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "attleboro-falls",
    name: "Attleboro Falls",
    zipCodes: ["02763"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.972584,
    lng: -71.308229,
    metaTitle:
      "Ice Cream Truck Rental in Attleboro Falls, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Attleboro Falls, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Attleboro Falls, MA",
    heroSubline:
      "Serving all of Attleboro Falls with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Attleboro Falls, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Attleboro Falls, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Attleboro Falls. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Attleboro Falls?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Attleboro Falls?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Attleboro Falls.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Attleboro Falls Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "north-dighton",
    name: "North Dighton",
    zipCodes: ["02764"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.847791,
    lng: -71.155797,
    metaTitle:
      "Ice Cream Truck Rental in North Dighton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in North Dighton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in North Dighton, MA",
    heroSubline:
      "Serving all of North Dighton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves North Dighton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve North Dighton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of North Dighton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in North Dighton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in North Dighton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in North Dighton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck North Dighton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "norton",
    name: "Norton",
    zipCodes: ["02766"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.959149,
    lng: -71.180393,
    metaTitle: "Ice Cream Truck Rental in Norton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Norton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Norton, MA",
    heroSubline: "Serving all of Norton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Norton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Norton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Norton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Norton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Norton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Norton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Norton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "raynham",
    name: "Raynham",
    zipCodes: ["02767"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.9367,
    lng: -71.048941,
    metaTitle: "Ice Cream Truck Rental in Raynham, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Raynham, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Raynham, MA",
    heroSubline:
      "Serving all of Raynham with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Raynham, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Raynham, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Raynham. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Raynham?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Raynham?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Raynham.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Raynham Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "raynham-center",
    name: "Raynham Center",
    zipCodes: ["02768"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.756214,
    lng: -71.067062,
    metaTitle:
      "Ice Cream Truck Rental in Raynham Center, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Raynham Center, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Raynham Center, MA",
    heroSubline:
      "Serving all of Raynham Center with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Raynham Center, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Raynham Center, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Raynham Center. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Raynham Center?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Raynham Center?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Raynham Center.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Raynham Center Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "rehoboth",
    name: "Rehoboth",
    zipCodes: ["02769"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.852989,
    lng: -71.243061,
    metaTitle: "Ice Cream Truck Rental in Rehoboth, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Rehoboth, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Rehoboth, MA",
    heroSubline:
      "Serving all of Rehoboth with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Rehoboth, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Rehoboth, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Rehoboth. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Rehoboth?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Rehoboth?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Rehoboth.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Rehoboth Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "rochester",
    name: "Rochester",
    zipCodes: ["02770"],
    county: "Plymouth County",
    region: "Massachusetts",
    lat: 41.751812,
    lng: -70.846041,
    metaTitle: "Ice Cream Truck Rental in Rochester, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Rochester, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Rochester, MA",
    heroSubline:
      "Serving all of Rochester with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Rochester, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Rochester, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Rochester. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Rochester?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Rochester?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Rochester.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Rochester Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "seekonk",
    name: "Seekonk",
    zipCodes: ["02771"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.840103,
    lng: -71.318995,
    metaTitle: "Ice Cream Truck Rental in Seekonk, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Seekonk, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Seekonk, MA",
    heroSubline:
      "Serving all of Seekonk with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Seekonk, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Seekonk, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Seekonk. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Seekonk?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Seekonk?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Seekonk.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Seekonk Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "swansea",
    name: "Swansea",
    zipCodes: ["02777"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.766629,
    lng: -71.234443,
    metaTitle: "Ice Cream Truck Rental in Swansea, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Swansea, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Swansea, MA",
    heroSubline:
      "Serving all of Swansea with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Swansea, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Swansea, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Swansea. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Swansea?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Swansea?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Swansea.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Swansea Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "berkley",
    name: "Berkley",
    zipCodes: ["02779"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.828249,
    lng: -71.064135,
    metaTitle: "Ice Cream Truck Rental in Berkley, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Berkley, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Berkley, MA",
    heroSubline:
      "Serving all of Berkley with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Berkley, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Berkley, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Berkley. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Berkley?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Berkley?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Berkley.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Berkley Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "taunton",
    name: "Taunton",
    zipCodes: ["02780", "02783"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.858851,
    lng: -71.092827,
    metaTitle: "Ice Cream Truck Rental in Taunton, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Taunton, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Taunton, MA",
    heroSubline:
      "Serving all of Taunton with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Taunton, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Taunton, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Taunton. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Taunton?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Taunton?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Taunton.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Taunton Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "westport",
    name: "Westport",
    zipCodes: ["02790"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.61547,
    lng: -71.079636,
    metaTitle: "Ice Cream Truck Rental in Westport, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Westport, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Westport, MA",
    heroSubline:
      "Serving all of Westport with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Westport, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question: "Do you serve Westport, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Westport. Call 617-999-3803 or get a free quote online.",
      },
      {
        question: "How much does ice cream truck catering cost in Westport?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Westport?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Westport.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Westport Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  {
    slug: "westport-point",
    name: "Westport Point",
    zipCodes: ["02791"],
    county: "Bristol County",
    region: "Massachusetts",
    lat: 41.519104,
    lng: -71.085137,
    metaTitle:
      "Ice Cream Truck Rental in Westport Point, MA | American Legend Ice Cream Truck",
    metaDescription:
      "Premium ice cream truck catering in Westport Point, MA. Birthdays, corporate events & more. Call 617-999-3803.",
    heroHeadline: "Ice Cream Truck Catering in Westport Point, MA",
    heroSubline:
      "Serving all of Westport Point with premium ice cream truck catering.",
    localIntro:
      "American Legend Ice Cream Truck serves Westport Point, MA with professional, premium mobile ice cream catering for birthdays, corporate events, school events, and community celebrations.",
    nearbyAreas: [],
    localFAQs: [
      {
        question:
          "Do you serve Westport Point, MA for ice cream truck rentals?",
        answer:
          "Yes! We serve all of Westport Point. Call 617-999-3803 or get a free quote online.",
      },
      {
        question:
          "How much does ice cream truck catering cost in Westport Point?",
        answer: "Packages start at $190. Request a free quote online.",
      },
      {
        question: "What events do you serve in Westport Point?",
        answer:
          "Birthdays, corporate events, school events, block parties, and all celebrations in Westport Point.",
      },
    ],
    heroImageQuery:
      "cinematic ice cream truck Westport Point Massachusetts golden hour",
    tier: 3,
    isTopCity: false,
    priorityScore: 50,
  },
  // Full 100+ city dataset continued in content/cities/*.json
];

// Helper functions
export function getCityBySlug(slug: string): CityData | undefined {
  return MASSACHUSETTS_CITIES.find((c) => c.slug === slug);
}

export function getTopCities(): CityData[] {
  return MASSACHUSETTS_CITIES.filter((c) => c.isTopCity).sort(
    (a, b) => b.priorityScore - a.priorityScore,
  );
}

export function getTier1Cities(): CityData[] {
  return MASSACHUSETTS_CITIES.filter((c) => c.tier === 1);
}

export function getNearbyAreas(slug: string): CityData[] {
  const city = getCityBySlug(slug);
  if (!city) return [];
  return city.nearbyAreas
    .map((name) =>
      MASSACHUSETTS_CITIES.find(
        (c) => c.name.toLowerCase() === name.toLowerCase(),
      ),
    )
    .filter(Boolean) as CityData[];
}

export function getAllCitySlugs(): string[] {
  return MASSACHUSETTS_CITIES.map((c) => c.slug);
}

// ─── NEW ENGLAND UNIFIED HELPERS ────────────────────────────
// Import and re-export New England data for unified access
export { NEW_ENGLAND_CITIES, NEW_ENGLAND_STATES, CONNECTICUT_CITIES, RHODE_ISLAND_CITIES, NEW_HAMPSHIRE_CITIES, VERMONT_CITIES, MAINE_CITIES } from "./new-england-data";

export function getAllNewEnglandSlugs(): string[] {
  // Import inline to avoid circular deps
  const { NEW_ENGLAND_CITIES } = require("./new-england-data");
  return [...MASSACHUSETTS_CITIES, ...NEW_ENGLAND_CITIES].map((c: CityData) => c.slug);
}
