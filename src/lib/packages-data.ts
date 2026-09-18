// ============================================================
// PACKAGE DEFINITIONS
// Updated exactly based on user request
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
  badge?: string;
  badgeVariant?: "gold" | "coral" | "mint";
  description: string;
  features: string[];
  isPopular: boolean;
  isCustom: boolean;
  sortOrder: number;
  iconName: string;
  illustrationSlug: string;
};

export const PACKAGES: Package[] = [
  // ─── TRUCK PACKAGES (6 Packages) ─────────────────────────────
  {
    id: "truck-sweet-start",
    slug: "sweet-start",
    name: "Sweet Start",
    tagline: "Perfect for intimate gatherings",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 30,
    price: 250,
    extraGuestPrice: 5,
    durationMins: 45,
    durationLabel: "45 Minute Service",
    description: "A delightful introduction to our classic ice cream truck experience.",
    features: ["Up to 30 Premium Servings included", "45 Minute Service", "Premium Ice Cream Selection", "Extra guests at $5 each"],
    badge: "Great Value",
    badgeVariant: "mint",
    isPopular: false,
    isCustom: false,
    sortOrder: 1,
    iconName: "IceCream",
    illustrationSlug: "truck-30",
  },
  {
    id: "truck-classic-celebration",
    slug: "classic-celebration",
    name: "Classic Celebration",
    tagline: "The neighborhood favorite",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 50,
    price: 340,
    extraGuestPrice: 5,
    durationMins: 45,
    durationLabel: "45 Minute Service",
    description: "Our most traditional ice cream truck package for mid-sized parties.",
    features: ["Up to 50 Premium Servings included", "45 Minute Service", "Premium Ice Cream Selection", "Extra guests at $5 each"],
    isPopular: true,
    isCustom: false,
    sortOrder: 2,
    iconName: "Users",
    illustrationSlug: "truck-50",
  },
  {
    id: "truck-signature-celebration",
    slug: "signature-celebration",
    name: "Signature Celebration",
    tagline: "For memorable moments",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 75,
    price: 425,
    extraGuestPrice: 5,
    durationMins: 45,
    durationLabel: "45 Minute Service",
    description: "A signature experience with plenty of premium treats for everyone.",
    features: ["Up to 75 Premium Servings included", "45 Minute Service", "Premium Ice Cream Selection", "Extra guests at $5 each"],
    badge: "Most Popular",
    badgeVariant: "gold",
    isPopular: true,
    isCustom: false,
    sortOrder: 3,
    iconName: "Star",
    illustrationSlug: "truck-75",
  },
  {
    id: "truck-grand-celebration",
    slug: "grand-celebration",
    name: "Grand Celebration",
    tagline: "The event headliner",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 100,
    price: 495,
    extraGuestPrice: 5,
    durationMins: 45,
    durationLabel: "45 Minute Service",
    description: "A grand scale celebration for school events and large birthdays.",
    features: ["Up to 100 Premium Servings included", "45 Minute Service", "Premium Ice Cream Selection", "Extra guests at $5 each"],
    isPopular: false,
    isCustom: false,
    sortOrder: 4,
    iconName: "PartyPopper",
    illustrationSlug: "truck-100",
  },
  {
    id: "truck-elite-celebration",
    slug: "elite-celebration",
    name: "Elite Celebration",
    tagline: "Extended service for larger crowds",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 150,
    price: 725,
    extraGuestPrice: 5,
    durationMins: 60,
    durationLabel: "1 Hour Service",
    description: "A full hour of premium service handling substantial volume with ease.",
    features: ["Up to 150 Premium Servings included", "1 Hour Service", "Premium Ice Cream Selection", "Extra guests at $5 each"],
    badge: "Corporate Choice",
    badgeVariant: "coral",
    isPopular: false,
    isCustom: false,
    sortOrder: 5,
    iconName: "Trophy",
    illustrationSlug: "truck-150",
  },
  {
    id: "truck-platinum-celebration",
    slug: "platinum-celebration",
    name: "Platinum Celebration",
    tagline: "The ultimate truck experience",
    vehicleType: "TRUCK",
    vehicleLabel: "Ice Cream Truck",
    servings: 200,
    price: 950,
    extraGuestPrice: 5,
    durationMins: 90,
    durationLabel: "1h 30m Service",
    description: "Our largest truck package. Maximum capacity and time for your biggest events.",
    features: ["Up to 200 Premium Servings included", "1h 30m Service", "Premium Ice Cream Selection", "Extra guests at $5 each"],
    isPopular: false,
    isCustom: false,
    sortOrder: 6,
    iconName: "Crown",
    illustrationSlug: "truck-200",
  },

  // ─── VAN PACKAGES (6 Packages) ────────────────────────────────
  {
    id: "van-quick-scoop",
    slug: "quick-scoop",
    name: "Quick Scoop",
    tagline: "Fast, sleek, and delicious",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 30,
    price: 190,
    extraGuestPrice: 5,
    durationMins: 40,
    durationLabel: "40 Minute Service",
    description: "A quick and premium treat delivered from our sleek Sprinter Van.",
    features: ["Up to 30 Premium Servings included", "40 Minute Service", "Premium Ice Cream Selection", "Extra guests at $5 each"],
    isPopular: false,
    isCustom: false,
    sortOrder: 7,
    iconName: "Zap",
    illustrationSlug: "van-30",
  },
  {
    id: "van-party-favorite",
    slug: "party-favorite",
    name: "Party Favorite",
    tagline: "Elevated mid-size events",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 50,
    price: 275,
    extraGuestPrice: 5,
    durationMins: 40,
    durationLabel: "40 Minute Service",
    description: "Perfect for upscale parties that demand a more refined touch.",
    features: ["Up to 50 Premium Servings included", "40 Minute Service", "Premium Ice Cream Selection", "Extra guests at $5 each"],
    badge: "Best Value",
    badgeVariant: "mint",
    isPopular: true,
    isCustom: false,
    sortOrder: 8,
    iconName: "Users",
    illustrationSlug: "van-50",
  },
  {
    id: "van-community-choice",
    slug: "community-choice",
    name: "Community Choice",
    tagline: "The sophisticated celebration",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 75,
    price: 365,
    extraGuestPrice: 5,
    durationMins: 40,
    durationLabel: "40 Minute Service",
    description: "A smart choice for local gatherings and corporate team building.",
    features: ["Up to 75 Premium Servings included", "40 Minute Service", "Premium Ice Cream Selection", "Extra guests at $5 each"],
    isPopular: true,
    isCustom: false,
    sortOrder: 9,
    iconName: "Heart",
    illustrationSlug: "van-75",
  },
  {
    id: "van-festival-favorite",
    slug: "festival-favorite",
    name: "Festival Favorite",
    tagline: "For major premium events",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 100,
    price: 450,
    extraGuestPrice: 5,
    durationMins: 40,
    durationLabel: "40 Minute Service",
    description: "A high-capacity premium van experience for your lively events.",
    features: ["Up to 100 Premium Servings included", "40 Minute Service", "Premium Ice Cream Selection", "Extra guests at $5 each"],
    badge: "Highly Rated",
    badgeVariant: "coral",
    isPopular: false,
    isCustom: false,
    sortOrder: 10,
    iconName: "Star",
    illustrationSlug: "van-100",
  },
  {
    id: "van-big-smile",
    slug: "big-smile-package",
    name: "Big Smile Package",
    tagline: "Premium event service",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 150,
    price: 695,
    extraGuestPrice: 4,
    durationMins: 60,
    durationLabel: "1 Hour Service",
    description: "Impress a massive crowd with our top-tier Sprinter Van service.",
    features: ["Up to 150 Premium Servings included", "1 Hour Service", "Premium Ice Cream Selection", "Extra guests at $4 each"],
    isPopular: false,
    isCustom: false,
    sortOrder: 11,
    iconName: "Smile",
    illustrationSlug: "van-150",
  },
  {
    id: "van-signature-experience",
    slug: "signature-experience",
    name: "Signature Experience",
    tagline: "The grandest premium experience",
    vehicleType: "VAN",
    vehicleLabel: "Sprinter Van",
    servings: 200,
    price: 825,
    extraGuestPrice: 4,
    durationMins: 60,
    durationLabel: "1 Hour Service",
    description: "The pinnacle of our Sprinter Van fleet. Maximum luxury for your biggest events.",
    features: ["Up to 200 Premium Servings included", "1 Hour Service", "Premium Ice Cream Selection", "Extra guests at $4 each"],
    badge: "Maximum Luxury",
    badgeVariant: "gold",
    isPopular: false,
    isCustom: false,
    sortOrder: 12,
    iconName: "Crown",
    illustrationSlug: "van-200",
  },

  // ─── CUSTOM PACKAGE (1 Package) ──────────────────────────────────────
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
    description: "Planning a large-scale event, festival, or something truly unique? Tell us your vision and we'll design a completely custom experience.",
    features: [
      "Custom number of servings",
      "Custom duration & logistics",
      "Multiple vehicles available",
      "Fully customized menu",
      "Dedicated event coordinator",
    ],
    isPopular: false,
    isCustom: true,
    sortOrder: 13,
    iconName: "Map",
    illustrationSlug: "bespoke",
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
  if (mins < 60) return `${mins} Minutes`;
  if (mins === 60) return "1 Hour";
  if (mins % 60 === 0) return `${mins / 60} Hours`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}
