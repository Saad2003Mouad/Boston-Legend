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
      <section className="pt-36 pb-20 text-center px-4 bg-navy">
        <AnimatedSection className="max-w-3xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6"
            style={{ background: "rgba(255,255,255,0.1)", color: "#FFF4D6" }}
          >
            🍦 All Occasions
          </div>
          <h1 className="text-[clamp(3rem,5vw,4.5rem)] md:text-6xl font-display font-light text-white mb-6 leading-tight tracking-tight">
            Services for <span className="text-coral italic font-medium">Every</span> Occasion.
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto font-medium">
            Whether it&apos;s an intimate backyard birthday or a 2,000-person corporate campus event, we have the fleet, the experience, and the premium ice cream to make it perfect.
          </p>
        </AnimatedSection>
      </section>

      {/* All Services List */}
      <ServicesMarquee theme="light" />

      {/* Brand Carousel — default variant with cream drip */}
      <BrandCarousel topDripColor="#FFF4D6" />

      {/* Our Stories Blog */}
      <BlogSection posts={recentPosts} />

      <FinalCTA />
    </div>
  );
}
