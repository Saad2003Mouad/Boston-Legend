import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import AnimatedSection from "@/components/shared/AnimatedSection";
import ServicesMarquee from "@/components/home/ServicesMarquee";
import FinalCTA from "@/components/home/FinalCTA";
import BrandCarousel from "@/components/shared/BrandCarousel";
import BlogSection from "@/components/home/BlogSection";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = constructMetadata({
  title: "Ice Cream Truck Services | American Legend Ice Cream Truck",
  description: "From corporate events and weddings to birthday parties and school festivals. Discover how American Legend Ice Cream Truck can elevate your next New England event.",
  url: "/occasions",
});

export const dynamic = "force-dynamic";

export default async function ServicesHubPage() {
  let recentPosts: any[] = [];
  try {
    recentPosts = await prisma.post.findMany({
      where: { status: "PUBLISHED", deletedAt: null },
      orderBy: { publishedAt: "desc" },
      take: 3,
      include: { category: true }
    });
  } catch (err) {
    console.error("[ServicesHub] Failed to fetch posts:", err);
  }

  return (
    <div className="min-h-screen">
      <section className="pt-36 pb-20 text-center px-4" style={{ background: "linear-gradient(135deg, #FFFBF5 0%, #FFF0F4 50%, #FFE1E8 100%)" }}>
        <AnimatedSection className="max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6"
            style={{ background: "rgba(255,78,116,0.15)", color: "#FF4E74" }}
          >
            🍦 All Occasions
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-navy mb-6">
            Services for <span className="text-coral italic font-light">Every</span> Occasion.
          </h1>
          <p className="text-xl text-charcoal/70 mb-8">
            Whether it&apos;s an intimate backyard birthday or a 2,000-person corporate campus event, we have the fleet, the experience, and the premium ice cream to make it perfect.
          </p>
        </AnimatedSection>
      </section>

      {/* All Services List */}
      <ServicesMarquee theme="light" />

      {/* Brand Carousel — white/neutral variant */}
      <BrandCarousel variant="white" topDripColor="#FFE1E8" />

      {/* Our Stories Blog */}
      <BlogSection posts={recentPosts} />

      <FinalCTA />
    </div>
  );
}
