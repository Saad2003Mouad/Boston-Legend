import { Metadata } from "next";
import { BUSINESS_CONFIG } from "@/lib/config";
import { constructMetadata } from "@/lib/seo";

import HeroSection from "@/components/home/HeroSection";
import ServicesMarquee from "@/components/home/ServicesMarquee";
import BrandCarousel from "@/components/shared/BrandCarousel";
import HowItWorks from "@/components/home/HowItWorks";
import BlogSection from "@/components/home/BlogSection";
import PackagesPreview from "@/components/home/PackagesPreview";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import CityMapSection from "@/components/home/CityMapSection";
import AIConciergeTeaser from "@/components/home/AIConciergeTeaser";
import FinalCTA from "@/components/home/FinalCTA";

import { prisma } from "@/lib/prisma";

export const metadata: Metadata = constructMetadata({
  title: "Boston Legend Ice Cream Truck | Premier Rental & Catering in Massachusetts",
  description: "Massachusetts' premier ice cream truck catering service. Bringing iconic frozen treats, artisan novelties, and legendary sweet celebrations to birthdays, corporate events, and weddings across all of MA.",
});

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let dbPackages: any[] = [];
  try {
    dbPackages = await prisma.package.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' }
    });
  } catch (err) {
    console.error("[Home] Failed to fetch packages:", err);
  }

  const formattedPackages = dbPackages.map((pkg) => {
    let featuresList: string[] = [];
    try {
      featuresList = pkg.features ? JSON.parse(pkg.features) : [];
    } catch {}

    const durationHrs = Math.floor(pkg.durationMins / 60);
    const durationMinsRem = pkg.durationMins % 60;
    const durationLabel = pkg.durationMins === 0 
      ? "Custom Duration" 
      : (durationHrs > 0 ? `${durationHrs}h ` : "") + (durationMinsRem > 0 ? `${durationMinsRem}m` : "") + " Service";

    return {
      id: pkg.id,
      slug: pkg.slug,
      name: pkg.name,
      tagline: pkg.description || "The perfect ice cream experience",
      description: pkg.description || "",
      imageUrl: pkg.imageUrl,
      vehicleType: pkg.serviceType,
      vehicleLabel: pkg.serviceType === "TRUCK" ? "Ice Cream Truck" : pkg.serviceType === "VAN" ? "Premium Van" : "Custom",
      servings: pkg.servings,
      price: pkg.price,
      extraGuestPrice: pkg.extraGuestPrice ?? 5,
      durationMins: pkg.durationMins,
      durationLabel: durationLabel.trim(),
      badge: pkg.badge,
      badgeVariant: pkg.badge === "Most Popular" || pkg.badge?.includes("Value") ? "coral" : (pkg.badge === "Corporate Choice" || pkg.badge?.includes("Luxury") ? "gold" : "mint"),
      features: featuresList,
      isPopular: pkg.badge === "Most Popular",
      isCustom: pkg.serviceType === "CUSTOM",
      sortOrder: pkg.sortOrder,
    };
  });

  const firstTruck = formattedPackages.find(p => p.vehicleType === "TRUCK");
  const firstVan = formattedPackages.find(p => p.vehicleType === "VAN");
  const featuredPackages = [firstTruck, firstVan].filter(Boolean);

  let recentPosts: any[] = [];
  try {
    recentPosts = await prisma.post.findMany({
      where: { status: "PUBLISHED", deletedAt: null },
      orderBy: { publishedAt: "desc" },
      take: 3,
      include: { category: true }
    });
  } catch (err) {
    console.error("[Home] Failed to fetch posts:", err);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 
        Phase 4 Roadmap:
        1. Cinematic Hero
        2. Trust Stats Grid
        3. Dark Services Marquee
        4. How It Works Steps
        5. Image Gallery Strip
        6. Packages Preview (Dark)
        7. Testimonials Carousel
        8. Interactive MA Map
        9. AI Concierge Teaser
        10. Cinematic Final CTA
      */}
      
      <HeroSection />

      <ServicesMarquee limit={5} />
      <BrandCarousel />
      <HowItWorks />
      <BlogSection posts={recentPosts} />
      <PackagesPreview featuredPackages={featuredPackages} />
      <TestimonialsCarousel />
      <CityMapSection />
      <AIConciergeTeaser />
      <FinalCTA />
    </div>
  );
}
