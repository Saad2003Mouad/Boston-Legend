// ============================================================
// PACKAGE DEFINITIONS
// Updated exactly based on user request (15 Packages: 7 Truck, 7 Van, 1 Custom)
// ============================================================

export type VehicleType = "TRUCK" | "VAN" | "CUSTOM";

export type Package = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  vehicleType: VehicleType;
  vehicleLabel: string;
  servings: number;
  price: number;
  extraGuestPrice: number;
  durationMins: number;
  durationLabel: string;
  badge?: string | null;
  badgeVariant?: "gold" | "coral" | "mint";
  description: string;
  features: string[];
  isPopular: boolean;
  isCustom: boolean;
  sortOrder: number;
  iconName: string;
  illustrationSlug: string;
  imageUrl?: string; // from seed
};

function generateDescription(name: string, type: VehicleType, servings: number) {
  if (type === "CUSTOM") return "Planning a large-scale event, festival, or something truly unique? Tell us your vision and we'll design a completely custom experience.";
  return `A delightful ${type.toLowerCase()} experience for up to ${servings} guests. Enjoy our premium ice cream selection and nostalgic atmosphere.`;
}

function getDurationLabel(mins: number) {
  if (mins === 0) return "Custom Duration";
  if (mins < 60) return `${mins} Minute Service`;
  if (mins === 60) return "1 Hour Service";
  return `${Math.floor(mins/60)}h ${mins%60}m Service`;
}

export const PACKAGES: Package[] = [
  // ─── TRUCK PACKAGES ──────────────────────────────────────────
  {
    id: "truck-patriot",
    slug: "patriot",
    name: "Patriot",
    tagline: "Perfect for intimate gatherings",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 30,
    price: 250,
    extraGuestPrice: 5,
    durationMins: 30,
    durationLabel: getDurationLabel(30),
    badge: "Great Value",
    badgeVariant: "mint",
    description: generateDescription("Patriot", "TRUCK", 30),
    features: ["30 Pieces", "30 Minutes", "Classic American Legend Truck", "Fun music & nostalgic experience", "Professional friendly server"],
    isPopular: false,
    isCustom: false,
    sortOrder: 1,
    iconName: "IceCream",
    illustrationSlug: "truck-30",
    imageUrl: "/images/packages_truck/Patriot_new.png"
  },
  {
    id: "truck-fenway",
    slug: "fenway",
    name: "Fenway",
    tagline: "The neighborhood favorite",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 40,
    price: 295,
    extraGuestPrice: 5,
    durationMins: 30,
    durationLabel: getDurationLabel(30),
    badge: null,
    description: generateDescription("Fenway", "TRUCK", 40),
    features: ["40 Pieces", "30 Minutes", "Classic American Legend Truck", "Fun music & nostalgic experience", "Professional friendly server"],
    isPopular: false,
    isCustom: false,
    sortOrder: 2,
    iconName: "Users",
    illustrationSlug: "truck-50",
    imageUrl: "/images/packages_truck/Fenway_new.png"
  },
  {
    id: "truck-harbor",
    slug: "harbor",
    name: "Harbor",
    tagline: "For memorable moments",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 50,
    price: 325,
    extraGuestPrice: 5,
    durationMins: 30,
    durationLabel: getDurationLabel(30),
    badge: "Most Popular",
    badgeVariant: "gold",
    description: generateDescription("Harbor", "TRUCK", 50),
    features: ["50 Pieces", "30 Minutes", "Classic American Legend Truck", "Fun music & nostalgic experience", "Professional friendly server"],
    isPopular: true,
    isCustom: false,
    sortOrder: 3,
    iconName: "Star",
    illustrationSlug: "truck-75",
    imageUrl: "/images/packages_truck/Harbor_new.png"
  },
  {
    id: "truck-all-star",
    slug: "all-star",
    name: "All-Star",
    tagline: "The event headliner",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 75,
    price: 450,
    extraGuestPrice: 5,
    durationMins: 30,
    durationLabel: getDurationLabel(30),
    badge: null,
    description: generateDescription("All-Star", "TRUCK", 75),
    features: ["75 Pieces", "30 Minutes", "Classic American Legend Truck", "Fun music & nostalgic experience", "Professional friendly server"],
    isPopular: false,
    isCustom: false,
    sortOrder: 4,
    iconName: "PartyPopper",
    illustrationSlug: "truck-100",
    imageUrl: "/images/packages_truck/All-Star_new.png"
  },
  {
    id: "truck-hall-of-fame",
    slug: "hall-of-fame",
    name: "Hall of Fame",
    tagline: "Extended service for larger crowds",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 100,
    price: 525,
    extraGuestPrice: 5,
    durationMins: 45,
    durationLabel: getDurationLabel(45),
    badge: "Corporate Choice",
    badgeVariant: "coral",
    description: generateDescription("Hall of Fame", "TRUCK", 100),
    features: ["100 Pieces", "45 Minutes", "Classic American Legend Truck", "Fun music & nostalgic experience", "Professional friendly server"],
    isPopular: false,
    isCustom: false,
    sortOrder: 5,
    iconName: "Trophy",
    illustrationSlug: "truck-150",
    imageUrl: "/images/packages_truck/Hall_new.png"
  },
  {
    id: "truck-classic-delights",
    slug: "classic-delights",
    name: "Classic Delights",
    tagline: "The ultimate truck experience",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 150,
    price: 800,
    extraGuestPrice: 5,
    durationMins: 60,
    durationLabel: getDurationLabel(60),
    badge: null,
    description: generateDescription("Classic Delights", "TRUCK", 150),
    features: ["150 Pieces", "1 Hour", "Classic American Legend Truck", "Fun music & nostalgic experience", "Professional friendly server"],
    isPopular: false,
    isCustom: false,
    sortOrder: 6,
    iconName: "Crown",
    illustrationSlug: "truck-200",
    imageUrl: "/images/packages_truck/Classic_Delights_new.png"
  },
  {
    id: "truck-dynasty",
    slug: "dynasty",
    name: "Dynasty",
    tagline: "For the biggest celebrations",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 200,
    price: 1050,
    extraGuestPrice: 5,
    durationMins: 60,
    durationLabel: getDurationLabel(60),
    badge: "Ultimate Choice",
    badgeVariant: "gold",
    description: generateDescription("Dynasty", "TRUCK", 200),
    features: ["200 Pieces", "1 Hour", "Classic American Legend Truck", "Fun music & nostalgic experience", "Professional friendly server"],
    isPopular: false,
    isCustom: false,
    sortOrder: 7,
    iconName: "Crown",
    illustrationSlug: "truck-200",
    imageUrl: "/images/packages_truck/Dynasty_new.png"
  },

  // ─── VAN PACKAGES ────────────────────────────────────────────
  {
    id: "van-starter-party",
    slug: "starter-party",
    name: "Starter Party",
    tagline: "Fast, sleek, and delicious",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 30,
    price: 225,
    extraGuestPrice: 5,
    durationMins: 30,
    durationLabel: getDurationLabel(30),
    badge: null,
    description: generateDescription("Starter Party", "VAN", 30),
    features: ["30 Pieces", "30 Minutes", "Premium Sprinter Van", "Elegant experience", "Professional friendly server"],
    isPopular: false,
    isCustom: false,
    sortOrder: 8,
    iconName: "Zap",
    illustrationSlug: "van-30",
    imageUrl: "/images/van_packages/Starter_Party.png"
  },
  {
    id: "van-family-event",
    slug: "family-event",
    name: "Family Event",
    tagline: "Elevated mid-size events",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 40,
    price: 275,
    extraGuestPrice: 5,
    durationMins: 30,
    durationLabel: getDurationLabel(30),
    badge: "Best Value",
    badgeVariant: "mint",
    description: generateDescription("Family Event", "VAN", 40),
    features: ["40 Pieces", "30 Minutes", "Premium Sprinter Van", "Elegant experience", "Professional friendly server"],
    isPopular: true,
    isCustom: false,
    sortOrder: 9,
    iconName: "Users",
    illustrationSlug: "van-50",
    imageUrl: "/images/van_packages/Family_Event.png"
  },
  {
    id: "van-celebration-pack",
    slug: "celebration-pack",
    name: "Celebration Pack",
    tagline: "The sophisticated celebration",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 50,
    price: 325,
    extraGuestPrice: 5,
    durationMins: 30,
    durationLabel: getDurationLabel(30),
    badge: null,
    description: generateDescription("Celebration Pack", "VAN", 50),
    features: ["50 Pieces", "30 Minutes", "Premium Sprinter Van", "Elegant experience", "Professional friendly server"],
    isPopular: false,
    isCustom: false,
    sortOrder: 10,
    iconName: "Heart",
    illustrationSlug: "van-75",
    imageUrl: "/images/van_packages/Celebration_Pack.png"
  },
  {
    id: "van-silver-special",
    slug: "silver-special",
    name: "Silver Special",
    tagline: "For major premium events",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 75,
    price: 425,
    extraGuestPrice: 5,
    durationMins: 45,
    durationLabel: getDurationLabel(45),
    badge: "Highly Rated",
    badgeVariant: "coral",
    description: generateDescription("Silver Special", "VAN", 75),
    features: ["75 Pieces", "45 Minutes", "Premium Sprinter Van", "Elegant experience", "Professional friendly server"],
    isPopular: true,
    isCustom: false,
    sortOrder: 11,
    iconName: "Star",
    illustrationSlug: "van-100",
    imageUrl: "/images/van_packages/Silver_Special.png"
  },
  {
    id: "van-ultimate-party",
    slug: "ultimate-party-package",
    name: "Ultimate Party Package",
    tagline: "Premium event service",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 100,
    price: 495,
    extraGuestPrice: 5,
    durationMins: 45,
    durationLabel: getDurationLabel(45),
    badge: null,
    description: generateDescription("Ultimate Party Package", "VAN", 100),
    features: ["100 Pieces", "45 Minutes", "Premium Sprinter Van", "Elegant experience", "Professional friendly server"],
    isPopular: false,
    isCustom: false,
    sortOrder: 12,
    iconName: "Smile",
    illustrationSlug: "van-150",
    imageUrl: "/images/van_packages/Ultimate_Party_Package.png"
  },
  {
    id: "van-big-smile",
    slug: "big-smile-package",
    name: "Big Smile Package",
    tagline: "The grandest premium experience",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 150,
    price: 725,
    extraGuestPrice: 5,
    durationMins: 45,
    durationLabel: getDurationLabel(45),
    badge: null,
    description: generateDescription("Big Smile Package", "VAN", 150),
    features: ["150 Pieces", "45 Minutes", "Premium Sprinter Van", "Elegant experience", "Professional friendly server"],
    isPopular: false,
    isCustom: false,
    sortOrder: 13,
    iconName: "Crown",
    illustrationSlug: "van-200",
    imageUrl: "/images/van_packages/Big_Smile_Package.png"
  },
  {
    id: "van-school-festival",
    slug: "school-festival",
    name: "School Festival",
    tagline: "Maximum luxury for big events",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 200,
    price: 950,
    extraGuestPrice: 5,
    durationMins: 60,
    durationLabel: getDurationLabel(60),
    badge: "Maximum Luxury",
    badgeVariant: "gold",
    description: generateDescription("School Festival", "VAN", 200),
    features: ["200 Pieces", "1 Hour", "Premium Sprinter Van", "Elegant experience", "Professional friendly server"],
    isPopular: false,
    isCustom: false,
    sortOrder: 14,
    iconName: "Crown",
    illustrationSlug: "van-200",
    imageUrl: "/images/van_packages/School_Festival.png"
  },

  // ─── CUSTOM PACKAGE ──────────────────────────────────────────
  {
    id: "custom-events",
    slug: "custom-events",
    name: "Custom Events",
    tagline: "For crowds over 200+",
    vehicleType: "CUSTOM",
    vehicleLabel: "Custom Event",
    servings: 300,
    price: 0,
    extraGuestPrice: 0,
    durationMins: 0,
    durationLabel: "Custom Duration",
    badge: "200+ Guests",
    badgeVariant: "gold",
    description: generateDescription("Custom Events", "CUSTOM", 300),
    features: ["Custom number of servings", "Custom duration & logistics", "Multiple vehicles available", "Fully customized menu", "Dedicated event coordinator"],
    isPopular: false,
    isCustom: true,
    sortOrder: 15,
    iconName: "Map",
    illustrationSlug: "bespoke",
    imageUrl: "/images/van_packages/Custom_Events.png"
  },
];

export const TRUCK_PACKAGES = PACKAGES.filter((p) => p.vehicleType === "TRUCK");
export const VAN_PACKAGES = PACKAGES.filter((p) => p.vehicleType === "VAN");
export const CUSTOM_PACKAGES = PACKAGES.filter((p) => p.vehicleType === "CUSTOM");

export function getPackageBySlug(slug: string): Package | undefined {
  return PACKAGES.find((p) => p.slug === slug);
}

export function formatDuration(mins: number): string {
  if (mins === 0) return "Custom";
  if (mins < 60) return \`\${mins} Minutes\`;
  if (mins === 60) return "1 Hour";
  if (mins % 60 === 0) return \`\${mins / 60} Hours\`;
  return \`\${Math.floor(mins / 60)}h \${mins % 60}m\`;
}
