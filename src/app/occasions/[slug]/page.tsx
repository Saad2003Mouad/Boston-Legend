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

  let dbPackages: any[] = [];
  try {
    dbPackages = await prisma.package.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' }
    });
  } catch (err) {
    console.error("[ServicePage] Failed to fetch packages:", err);
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
    console.error("[ServicePage] Failed to fetch posts:", err);
  }

  return (
    <>
      <div className="min-h-screen pt-28 md:pt-32 pb-24">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-charcoal/60">
          <Link href="/" className="hover:text-coral transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/occasions" className="hover:text-coral transition-colors">Services</Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal font-medium">{service.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Content */}
          <AnimatedSection variants={fadeUp} className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-navy mb-6 leading-tight">
              {service.name}
            </h1>
            <p className="text-xl text-coral font-medium mb-6">
              {service.shortDescription}
            </p>
            <p className="text-lg text-charcoal/80 mb-8 leading-relaxed">
              {service.longDescription}
            </p>

            <ul className="space-y-4 mb-10">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="text-coral shrink-0 mt-1" size={20} />
                  <span className="text-charcoal font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <Link 
              href="/book" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-coral text-white font-bold rounded-full hover:bg-navy transition-colors duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              {service.ctaText}
              <ArrowRight size={20} />
            </Link>
          </AnimatedSection>

            {/* Integrated Floating Image */}
            <AnimatedSection variants={fadeUp} className="relative w-full h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center">
              <Image 
                src={service.imagePath} 
                alt={`${service.name} catering by American Legend Ice Cream Truck`}
                fill
                className="object-contain drop-shadow-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </AnimatedSection>
          </div>
        </div>
        <div className="mt-24">
          <BrandCarousel />
        </div>
      </div>

      <BlogSection posts={recentPosts} />
      <PackagesPreview featuredPackages={featuredPackages} />
      <FinalCTA />
    </>
  );
}
