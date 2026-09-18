import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import { BUSINESS_CONFIG } from "@/lib/config";
import { getCityBySlug, MASSACHUSETTS_CITIES, getNearbyAreas } from "@/lib/cities-data";
import { getLocalBusinessSchema, getCityPageSchema, getFAQSchema } from "@/lib/schema";
import { constructMetadata } from "@/lib/seo";
import { MapPin, Star, Calendar, IceCream, Truck, Phone, ArrowRight, ChevronRight, Info } from "lucide-react";
import PackagesPreview from "@/components/home/PackagesPreview";
import FinalCTA from "@/components/home/FinalCTA";
import FAQSection from "@/components/shared/FAQSection";
import BrandCarousel from "@/components/shared/BrandCarousel";
import TestimonialsCarousel from "@/components/home/TestimonialsCarousel";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ slug: string }>;
};

// --- DETERMINISTIC HASH FUNCTION FOR SPINNING ---
function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

// --- PROGRAMMATIC SEO TEXT SPINNERS ---
const H1_TEMPLATES = [
  (city: string) => `Ice Cream Truck Rental in ${city}, MA`,
  (city: string) => `Premium Ice Cream Truck Catering in ${city}`,
  (city: string) => `Book an Ice Cream Truck in ${city}, Massachusetts`,
  (city: string) => `The Best Ice Cream Truck in ${city}, MA`,
  (city: string) => `${city}'s Favorite Ice Cream Truck Rental`,
];

const H2_TEMPLATES = [
  (city: string) => `Bringing Joy to ${city} Events`,
  (city: string) => `Making ${city} Celebrations Unforgettable`,
  (city: string) => `Five-Star Ice Cream Catering in ${city}`,
  (city: string) => `Why ${city} Loves Our Ice Cream Trucks`,
  (city: string) => `Elevate Your Event in ${city}, MA`,
];

const INTRO_TEMPLATES = [
  (city: string) => `Whether you're hosting a massive corporate gathering or an intimate backyard birthday party in ${city}, ${BUSINESS_CONFIG.name} is the premier choice for frozen treats.`,
  (city: string) => `From school events to weddings, our ice cream trucks deliver smiles across ${city}. ${BUSINESS_CONFIG.name} brings nostalgic joy straight to your venue.`,
  (city: string) => `Planning a celebration in ${city}? Let ${BUSINESS_CONFIG.name} handle the dessert. We provide top-tier ice cream truck rentals for all types of events.`,
  (city: string) => `Make your next ${city} event a hit with ${BUSINESS_CONFIG.name}. We specialize in bringing premium ice cream and classic treats to any location in the area.`,
  (city: string) => `${city} residents know that no party is complete without ${BUSINESS_CONFIG.name}. We offer reliable, clean, and fully-stocked ice cream trucks for your special day.`,
];

// --- THEME DEFINITIONS ---
const THEMES = [
  {
    flavor: "Strawberry",
    image: "/images/cities/strawberry.png",
    heroBgClass: "bg-[#FFF0F4]",
    textDarkClass: "text-[#8A1A3A]",
    primaryColorClass: "text-coral",
    bgGlowClass: "bg-coral/20",
    buttonClass: "bg-coral text-white shadow-coral/30 hover:bg-white hover:text-coral",
    badgeClass: "bg-coral/10 border-coral/20 text-coral",
  },
  {
    flavor: "Mint",
    image: "/images/cities/mint.png",
    heroBgClass: "bg-[#F0FFF4]",
    textDarkClass: "text-[#1A5336]",
    primaryColorClass: "text-mint",
    bgGlowClass: "bg-mint/20",
    buttonClass: "bg-mint text-navy shadow-mint/30 hover:bg-white hover:text-mint",
    badgeClass: "bg-mint/10 border-mint/20 text-mint",
  },
  {
    flavor: "Vanilla",
    image: "/images/cities/vanilla.png",
    heroBgClass: "bg-[#FFFDF0]",
    textDarkClass: "text-[#6B5A1A]",
    primaryColorClass: "text-gold",
    bgGlowClass: "bg-gold/20",
    buttonClass: "bg-gold text-navy shadow-gold/30 hover:bg-white hover:text-gold",
    badgeClass: "bg-gold/10 border-gold/20 text-gold",
  },
  {
    flavor: "Blueberry",
    image: "/images/cities/blueberry.png",
    heroBgClass: "bg-[#F0F4FF]",
    textDarkClass: "text-[#1A337A]",
    primaryColorClass: "text-blue-500",
    bgGlowClass: "bg-blue-500/20",
    buttonClass: "bg-blue-500 text-white shadow-blue-500/30 hover:bg-white hover:text-blue-500",
    badgeClass: "bg-blue-500/10 border-blue-500/20 text-blue-500",
  },
  {
    flavor: "Chocolate",
    image: "/images/cities/chocolate.png",
    heroBgClass: "bg-[#FFF5F0]",
    textDarkClass: "text-[#5C2E16]",
    primaryColorClass: "text-amber-700",
    bgGlowClass: "bg-amber-700/20",
    buttonClass: "bg-amber-700 text-white shadow-amber-700/30 hover:bg-white hover:text-amber-700",
    badgeClass: "bg-amber-700/10 border-amber-700/20 text-amber-700",
  },
];

export const dynamicParams = true;
export const revalidate = 86400; // 24 hours

// Generate static params for top cities at build time to prevent DB connection exhaustion
export async function generateStaticParams() {
  return MASSACHUSETTS_CITIES.slice(0, 10).map((city) => ({
    slug: city.slug,
  }));
}

// Generate dynamic SEO metadata per city
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  const cityObj = getCityBySlug(slug);

  if (!cityObj) {
    return { title: "City Not Found" };
  }

  return constructMetadata({
    title: `Ice Cream Truck Rental in ${cityObj.name}, MA`,
    description: `Book the best ice cream truck in ${cityObj.name}, Massachusetts. Perfect for birthdays, weddings, corporate events, and parties in ${cityObj.name}.`,
    url: `/cities/${slug}`,
  });
}

const EVENT_TYPES = [
  { icon: "🎂", label: "Birthday Parties" },
  { icon: "🏢", label: "Corporate Events" },
  { icon: "💒", label: "Weddings" },
  { icon: "🎒", label: "School Events" },
  { icon: "🎪", label: "Block Parties" },
  { icon: "📸", label: "Photo Sessions" },
  { icon: "🚀", label: "Launch Parties" },
  { icon: "🎗️", label: "Fundraisers" },
];

export default async function CityPage({ params }: Props) {
  const resolvedParams = await params;
  const city = getCityBySlug(resolvedParams.slug);

  if (!city) {
    notFound();
  }

  const nearbyAreas = getNearbyAreas(city.slug);

  // Deterministic variations
  const seed = hashSlug(city.slug);
  const theme = THEMES[seed % THEMES.length];
  const h1Text = H1_TEMPLATES[seed % H1_TEMPLATES.length](city.name);
  const h2Text = H2_TEMPLATES[(seed + 1) % H2_TEMPLATES.length](city.name);
  const introText = INTRO_TEMPLATES[(seed + 2) % INTRO_TEMPLATES.length](city.name);
  
  // Cache packages fetch to prevent connection exhaustion during static generation of 500+ cities
  const getPackages = unstable_cache(
    async () => {
      try {
        return await prisma.package.findMany({
          where: { isActive: true },
          orderBy: { sortOrder: 'asc' }
        });
      } catch (err) {
        console.error("[CityPage] Failed to fetch packages:", err);
        return [];
      }
    },
    ['active-packages'],
    { revalidate: 3600, tags: ['packages'] }
  );

  const dbPackages = await getPackages();

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
  
  const layoutFlip = seed % 2 === 0;

  // Inject Schemas for this specific city
  const localBusinessSchema = getLocalBusinessSchema();
  const serviceSchema = getCityPageSchema(city);

  const faqs = city.localFAQs.length > 0
    ? city.localFAQs
    : [
        {
          question: `Do you provide ice cream truck rentals in ${city.name}, MA?`,
          answer: `Yes, we proudly serve ${city.name} and the surrounding areas in ${city.county}. We cater to birthday parties, corporate events, and weddings across ${city.name}.`,
        },
        {
          question: `How much does it cost to rent an ice cream truck in ${city.name}?`,
          answer: `Our packages in ${city.name} start at $190. The final price depends on your guest count and package selection. Request a quote for exact pricing.`,
        },
        {
          question: `Are you licensed and insured to operate in ${city.name}?`,
          answer: `Yes, we are fully licensed and hold a $2M liability insurance policy, meeting all requirements for private and public events in ${city.name}, Massachusetts.`,
        },
        {
          question: `How far in advance should I book for a ${city.name} event?`,
          answer: `For weekend events in ${city.name} during the summer, we recommend booking at least 2–4 weeks in advance, though we always try to accommodate last-minute requests when possible.`,
        },
      ];

  const faqSchema = getFAQSchema(faqs);

  return (
    <div className={`min-h-screen overflow-hidden ${theme.heroBgClass}`}>
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-48 overflow-hidden transition-colors duration-500">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-0 right-0 w-[700px] h-[700px] ${theme.bgGlowClass} rounded-full blur-[150px] -translate-y-1/3 translate-x-1/4 transition-colors duration-1000`} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/40 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
            <defs>
              <pattern id="hero-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className={theme.textDarkClass} />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center gap-12">
          
          <div className={`flex-1 text-center md:text-left ${layoutFlip ? 'md:order-2' : ''}`}>
            {/* Breadcrumb */}
            <nav className={`flex items-center justify-center md:justify-start gap-2 ${theme.textDarkClass} opacity-60 text-xs font-bold uppercase tracking-widest mb-8`}>
              <Link href="/" className="hover:opacity-100 transition-opacity">Home</Link>
              <ChevronRight size={12} />
              <Link href="/cities" className="hover:opacity-100 transition-opacity">Service Areas</Link>
              <ChevronRight size={12} />
              <span className={theme.primaryColorClass}>{city.name}</span>
            </nav>

            <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border bg-white/50 backdrop-blur-sm text-xs font-bold tracking-widest uppercase mb-8 ${theme.badgeClass}`}>
              <MapPin size={12} />
              {city.county}
            </div>

            <h1 className={`font-display font-light text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] ${theme.textDarkClass} mb-6 tracking-tighter`}>
              {h1Text.split(city.name)[0]}
              <span className={`italic font-serif ${theme.primaryColorClass}`}>{city.name}</span>
              {h1Text.split(city.name)[1]}
            </h1>

            <p className={`font-sans ${theme.textDarkClass} opacity-80 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl mx-auto md:mx-0`}>
              {city.heroSubline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <Link
                href={`/book?city=${encodeURIComponent(city.name)}`}
                className={`inline-flex items-center gap-3 px-10 py-5 font-bold text-base rounded-full transition-all duration-300 hover:scale-105 ${theme.buttonClass}`}
              >
                Book in {city.name} <ArrowRight size={18} />
              </Link>
              <a
                href={`tel:${BUSINESS_CONFIG.contact.phone1Formatted}`}
                className={`inline-flex items-center gap-3 px-8 py-5 border-2 border-black/10 ${theme.textDarkClass} bg-white/30 backdrop-blur-sm font-bold text-base rounded-full hover:bg-white transition-all duration-300`}
              >
                <Phone size={18} /> {BUSINESS_CONFIG.contact.phone1}
              </a>
            </div>
          </div>

          {/* Dynamic 3D Ice Cream Render */}
          <div className={`flex-1 relative w-full max-w-[450px] aspect-square mx-auto ${layoutFlip ? 'md:order-1' : ''}`}>
            {/* The circular mask to hide the navy corners of the generated image */}
            <div className="absolute inset-4 rounded-full border-[12px] border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] overflow-hidden bg-navy group">
              <Image
                src={theme.image}
                alt={`${theme.flavor} ice cream for ${city.name}`}
                fill
                className="object-cover scale-110 group-hover:scale-125 transition-transform duration-700 ease-out"
                priority
              />
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_50px_rgba(0,0,0,0.3)] pointer-events-none" />
            </div>
            
            {/* Floating decorative elements */}
            <div className={`absolute top-0 right-10 w-24 h-24 rounded-full ${theme.bgGlowClass} blur-xl animate-pulse`} />
            <div className={`absolute bottom-10 left-0 w-32 h-32 rounded-full ${theme.bgGlowClass} blur-2xl animate-pulse delay-700`} />
          </div>

        </div>
      </section>

      {/* ── LOCAL INTRO ──────────────────────────────────────────── */}
      <section className="py-24 md:py-32 relative -mt-16 z-20">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="bg-white rounded-[3rem] shadow-2xl border border-navy/5 p-8 md:p-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Text */}
              <div className={layoutFlip ? 'lg:order-2' : ''}>
                <h2 className="font-display font-light text-[clamp(2rem,4vw,3.5rem)] text-navy tracking-tighter mb-6 leading-tight">
                  {h2Text.split(city.name)[0]}
                  <span className={`italic ${theme.primaryColorClass}`}>{city.name}</span>
                  {h2Text.split(city.name)[1]}
                </h2>
                <p className="font-sans text-navy/70 text-lg leading-relaxed mb-4">
                  {introText}
                </p>
                <p className="font-sans text-navy/70 text-lg leading-relaxed mb-8">
                  {city.localIntro}
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    { icon: <Star size={18} />, text: `Top-Rated in ${city.county}`, color: "text-gold bg-gold/10" },
                    { icon: <Calendar size={18} />, text: "Flexible Scheduling — Weekdays & Weekends", color: `${theme.primaryColorClass} ${theme.bgGlowClass}` },
                    { icon: <Truck size={18} />, text: "Professional Setup & On-Time Arrival", color: "text-navy bg-navy/10" },
                    { icon: <IceCream size={18} />, text: "Premium Ice Cream Selection for All Ages", color: "text-mint bg-mint/10" },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-4 p-4 rounded-2xl bg-cream border border-navy/5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                        {item.icon}
                      </div>
                      <span className="font-sans font-bold text-navy text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Event Types Grid */}
              <div className={layoutFlip ? 'lg:order-1' : ''}>
                <h3 className="font-display text-2xl text-navy font-bold mb-6 flex items-center gap-3">
                  <Info className={theme.primaryColorClass} />
                  Events We Serve in {city.name}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {EVENT_TYPES.map((event) => (
                    <div
                      key={event.label}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-cream hover:bg-navy hover:text-cream transition-all duration-300 group cursor-default border border-navy/5"
                    >
                      <span className="text-2xl">{event.icon}</span>
                      <span className="font-sans font-bold text-navy/80 text-sm group-hover:text-cream transition-colors">
                        {event.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Neighborhoods */}
                {city.neighborhoods && city.neighborhoods.length > 0 && (
                  <div className={`mt-8 p-6 rounded-3xl ${theme.bgGlowClass}`}>
                    <h4 className={`font-display font-bold text-lg mb-4 ${theme.primaryColorClass}`}>
                      Neighborhoods We Serve
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {city.neighborhoods.map((n) => (
                        <span
                          key={n}
                          className="px-3 py-1.5 rounded-full bg-white/50 text-navy text-xs font-bold shadow-sm"
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BRAND CAROUSEL ─────────────────────────────────────────── */}
      <BrandCarousel />

      {/* ── PACKAGES ─────────────────────────────────────────────── */}
      <PackagesPreview featuredPackages={featuredPackages} />

      {/* ── NEARBY AREAS ─────────────────────────────────────────── */}
      {nearbyAreas.length > 0 && (
        <section className="py-20 relative">
          <div className="container mx-auto px-6 md:px-12 max-w-6xl">
            <h2 className="font-display font-light text-[clamp(2rem,3.5vw,3rem)] text-navy tracking-tighter mb-10">
              Also Serving <span className={`italic ${theme.primaryColorClass}`}>Nearby Areas</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {nearbyAreas.map((nearby) => (
                <Link
                  key={nearby.slug}
                  href={`/cities/${nearby.slug}`}
                  className={`group flex items-center gap-2 p-4 bg-white rounded-2xl border border-navy/5 hover:shadow-md transition-all duration-200 hover:border-[var(--hover-color)]`}
                  style={{ '--hover-color': 'currentColor' } as any}
                >
                  <MapPin size={14} className={`${theme.primaryColorClass} shrink-0`} />
                  <span className="font-sans font-bold text-sm text-navy/80 group-hover:text-navy">
                    {nearby.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <TestimonialsCarousel />

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <FAQSection
        title={`FAQ — ${city.name}, MA`}
        subtitle={`Common questions about our ice cream truck service in ${city.name}.`}
        items={faqs}
      />

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <FinalCTA />
    </div>
  );
}
