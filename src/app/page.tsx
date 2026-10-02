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

import { PACKAGES } from "@/lib/packages-data";

export const metadata: Metadata = constructMetadata({
  description: "New England's premier ice cream truck catering service. Bringing iconic frozen treats, artisan novelties, and legendary sweet celebrations to birthdays, corporate events, and weddings across all 6 states.",
});

export const revalidate = 3600; // Cache page for 1 hour for lightning fast loads

export default async function HomePage() {
  const formattedPackages = PACKAGES.map((pkg) => {
    return {
      id: pkg.id,
      slug: pkg.slug,
      name: pkg.name,
      tagline: pkg.tagline,
      description: pkg.description,
      imageUrl: pkg.imageUrl || `/images/${pkg.vehicleType === "VAN" ? "van" : "truck"}_packages/${pkg.slug}.jpg`,
      vehicleType: pkg.vehicleType,
      vehicleLabel: pkg.vehicleLabel,
      servings: pkg.servings,
      price: pkg.price,
      extraGuestPrice: pkg.extraGuestPrice,
      durationMins: pkg.durationMins,
      durationLabel: pkg.durationLabel,
      badge: pkg.badge,
      badgeVariant: pkg.badgeVariant || (pkg.badge === "Most Popular" || pkg.badge?.includes("Value") ? "coral" : (pkg.badge === "Corporate Choice" || pkg.badge?.includes("Luxury") ? "gold" : "mint")),
      features: pkg.features,
      isPopular: pkg.isPopular,
      isCustom: pkg.isCustom,
      sortOrder: pkg.sortOrder,
    };
  });

  const firstTruck = formattedPackages.find(p => p.vehicleType === "TRUCK");
  const firstVan = formattedPackages.find(p => p.vehicleType === "VAN");
  const featuredPackages = [firstTruck, firstVan].filter(Boolean);

  let recentPosts: any[] = [];
  try {
    recentPosts = await prisma.post.findMany({
      where: {
        status: "PUBLISHED",
        deletedAt: null,
        title: {
          in: [
            "A Refreshing Reset: Ice Cream Trucks at the Job Site",
            "Why Ice Cream Trucks are Perfect for Family Reunions",
            "An Ice Cream Truck Surprise That Makes the Moment Legendary"
          ]
        }
      },
      include: { category: true }
    });
    
    // Sort them exactly as requested or fallback to whatever the db returned if not found
    const targetOrder = [
      "A Refreshing Reset: Ice Cream Trucks at the Job Site",
      "Why Ice Cream Trucks are Perfect for Family Reunions",
      "An Ice Cream Truck Surprise That Makes the Moment Legendary"
    ];
    
    recentPosts.sort((a, b) => {
      const idxA = targetOrder.indexOf(a.title);
      const idxB = targetOrder.indexOf(b.title);
      return idxA - idxB;
    });

    // If for some reason we didn't find all 3, pad with others
    if (recentPosts.length < 3) {
      const extraPosts = await prisma.post.findMany({
        where: {
          status: "PUBLISHED",
          deletedAt: null,
          id: { notIn: recentPosts.map(p => p.id) }
        },
        orderBy: { publishedAt: "desc" },
        take: 3 - recentPosts.length,
        include: { category: true }
      });
      recentPosts = [...recentPosts, ...extraPosts];
    }
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
