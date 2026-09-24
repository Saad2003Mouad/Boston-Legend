import { prisma } from "./prisma";
import { unstable_cache } from "next/cache";

export const DEFAULT_SETTINGS = {
  companyName: "Boston Legend Ice Cream Truck",
  companyAddress: "38 Woodland Rd, Georgetown, MA 01833",
  companyPhone: "617-999-3803",
  companyEmail: "info@bostonlegendicecreamtruck.com",
  logoUrl: "/images/logo.png",
  faviconUrl: "/favicon.ico",
  businessHours: "Available 24 hours by reservation, 7 days a week",
  serviceRadius: "10",
  travelFeePerMile: "2.50",
  taxRate: "0",
  seoTitle: "Boston Legend Ice Cream Truck - Massachusetts Premier Events",
  seoDescription: "Massachusetts' premier ice cream truck catering service for birthdays, corporate events, weddings, and festivals.",
  facebookUrl: "https://www.facebook.com/BostonLegendIceCream/",
  instagramUrl: "https://instagram.com/bostonlegendicecream",
  bookingAutoApprove: "false",
  aiAssistantName: "Boston Legend AI Concierge",
  aiAssistantSystemPrompt: "You are the highly professional AI Concierge for Boston Legend Ice Cream Truck. You help customers book packages and answer their questions about our ice cream catering across Massachusetts."
};

/**
 * Get all settings combined with defaults (cached for 1 hour).
 */
export const getSettings = unstable_cache(
  async (): Promise<typeof DEFAULT_SETTINGS> => {
    try {
      const records = await prisma.setting.findMany();
      const dict = records.reduce((acc, curr) => {
        acc[curr.key] = curr.value;
        return acc;
      }, {} as Record<string, string>);

      return {
        ...DEFAULT_SETTINGS,
        ...dict,
      };
    } catch (error) {
      console.error("Failed to get settings:", error);
      return DEFAULT_SETTINGS;
    }
  },
  ["site-settings"],
  { revalidate: 3600, tags: ["settings"] }
);

/**
 * Get a specific setting value by key.
 */
export async function getSetting<K extends keyof typeof DEFAULT_SETTINGS>(
  key: K
): Promise<string> {
  try {
    const record = await prisma.setting.findUnique({
      where: { key: key as string },
    });
    return record?.value ?? DEFAULT_SETTINGS[key];
  } catch (error) {
    console.error(`Failed to get setting ${key}:`, error);
    return DEFAULT_SETTINGS[key];
  }
}
