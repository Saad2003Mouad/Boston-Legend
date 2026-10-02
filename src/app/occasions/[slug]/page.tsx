import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";
import { getServiceBySlug, getAllServices } from "@/lib/services-data";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { fadeUp } from "@/lib/animations";
import { CheckCircle2, ArrowRight } from "lucide-react";
import BrandCarousel from "@/components/shared/BrandCarousel";
import { prisma } from "@/lib/prisma";
import { PACKAGES } from "@/lib/packages-data";
import PackagesPreview from "@/components/home/PackagesPreview";
import FinalCTA from "@/components/home/FinalCTA";
import BlogSection from "@/components/home/BlogSection";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamicParams = true;
export const revalidate = 86400; // 24 hours

export async function generateStaticParams() {
  const services = getAllServices();
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    return constructMetadata({ title: "Service Not Found" });
  }

  return constructMetadata({
    title: `${service.name} Ice Cream Catering MA | American Legend Ice Cream Truck`,
    description: service.shortDescription,
    url: `/occasions/${service.slug}`,
  });
}

export default async function ServicePage({ params }: ServicePageProps) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  const formattedPackages = PACKAGES.map((pkg) => {
    return {
      id: pkg.id,
      slug: pkg.slug,
      name: pkg.name,
      tagline: pkg.tagline,
      description: pkg.description,
      imageUrl: `/images/${pkg.vehicleType === "VAN" ? "van" : "truck"}_packages/${pkg.slug}.jpg`,
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
      where: { status: "PUBLISHED", deletedAt: null },
      orderBy: { publishedAt: "desc" },
      take: 3,
      include: { category: true }
    });
  } catch (err) {
    console.error("[ServicePage] Failed to fetch posts:", err);
  }

  return (
    <>
      <div className="min-h-screen pt-28 md:pt-36 pb-24 bg-cream">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Content */}
            <AnimatedSection variants={fadeUp} className="max-w-2xl order-2 lg:order-1">
              <h1 className="text-[clamp(3rem,6vw,5rem)] font-display italic font-light text-navy mb-6 leading-[1.1] tracking-tight">
                {service.name}
              </h1>
              <p className="text-xl md:text-2xl text-coral font-medium mb-6 leading-relaxed">
                {service.shortDescription}
              </p>
              <p className="text-lg text-navy/70 mb-10 leading-relaxed font-medium">
                {service.longDescription}
              </p>

              <ul className="space-y-5 mb-10">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="text-gold shrink-0 mt-1" size={24} />
                    <span className="text-navy/80 text-lg font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                href="/packages" 
                className="inline-flex items-center gap-2 px-10 py-5 bg-coral text-white text-lg font-bold rounded-full hover:bg-navy transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 group"
              >
                {service.ctaText}
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </AnimatedSection>

            {/* Integrated Floating Image */}
            <AnimatedSection variants={fadeUp} className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center order-1 lg:order-2 mt-4 lg:mt-0">
              <div className="absolute inset-0 bg-gold/10 rounded-full blur-3xl scale-[0.65] md:scale-75 opacity-50"></div>
              <div className="relative w-full h-full p-2 md:p-6">
                <Image 
                  src={service.imagePath} 
                  alt={`${service.name} catering by American Legend Ice Cream Truck`}
                  fill
                  className="object-contain drop-shadow-2xl relative z-10"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
      
      <BrandCarousel topDripColor="#FFF4D6" />

      <BlogSection posts={recentPosts} />
      <PackagesPreview featuredPackages={featuredPackages} />
      <FinalCTA />
    </>
  );
}
