import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { menuItems } from "@/data/menu";
import FinalCTA from "@/components/home/FinalCTA";
import BrandCarousel from "@/components/shared/BrandCarousel";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return menuItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = menuItems.find((i) => i.slug === slug);

  if (!item) {
    return constructMetadata({
      title: "Not Found",
      description: "The requested ice cream item could not be found.",
    });
  }

  const keywords = [
    item.name,
    item.brand,
    item.category,
    "ice cream truck",
    "boston ice cream",
    "event catering",
    ...item.dietary
  ];

  return constructMetadata({
    title: `${item.name} | Boston Legend Ice Cream Truck Menu`,
    description: item.description,
    url: `/menu/${item.slug}`,
    image: item.image,
    keywords: keywords,
  });
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  "Birthday Parties":   { bg: "bg-pink-50",   text: "text-pink-700",   dot: "bg-pink-400" },
  "Corporate Events":   { bg: "bg-blue-50",   text: "text-blue-700",   dot: "bg-blue-400" },
  "Weddings":           { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-400" },
  "Community Events":   { bg: "bg-green-50",  text: "text-green-700",  dot: "bg-green-400" },
};

function getCategoryStyle(name?: string | null) {
  if (!name) return { bg: "bg-coral/10", text: "text-coral", dot: "bg-coral" };
  return CATEGORY_COLORS[name] || { bg: "bg-coral/10", text: "text-coral", dot: "bg-coral" };
}

const ICE_CREAM_PALETTE = [
  "#E63860", // Strawberry
  "#0EA5E9", // Blue Raspberry
  "#F59E0B", // Mango/Orange
  "#10B981", // Mint
  "#8B5CF6", // Grape
  "#EC4899", // Bubblegum
  "#F43F5E", // Cherry
];

function getThemeColor(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = slug.charCodeAt(i) + ((hash << 5) - hash);
  }
  return ICE_CREAM_PALETTE[Math.abs(hash) % ICE_CREAM_PALETTE.length];
}

export default async function MenuItemPage({ params }: PageProps) {
  const { slug } = await params;
  const item = menuItems.find((i) => i.slug === slug);

  if (!item) {
    notFound();
  }

  // Fetch blog posts to show related events
  let recentPosts: any[] = [];
  try {
    const allPosts = await prisma.post.findMany({
      where: { status: "PUBLISHED", deletedAt: null },
      include: { category: true },
    });
    // Shuffle posts and take 3 for variety across item pages
    recentPosts = allPosts.sort(() => 0.5 - Math.random()).slice(0, 3);
  } catch (err) {
    console.error("[Menu Item] Failed to fetch blog posts:", err);
  }

  // JSON-LD structured data for the product
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: item.name,
    image: `https://www.bostonlegendicecream.com${item.image}`,
    description: item.description,
    brand: {
      "@type": "Brand",
      name: item.brand,
    },
    category: item.category,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "127",
      reviewCount: "127",
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Sarah M.",
        },
        reviewBody:
          "Having the Boston Legend Ice Cream Truck at our wedding was the highlight of the night! The ice cream was premium and the staff was so professional.",
      },
    ],
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "3.00",
      highPrice: "9.00",
      offerCount: "20",
      availability: "https://schema.org/InStock",
      url: `https://www.bostonlegendicecream.com/menu/${item.slug}`,
      seller: {
        "@type": "Organization",
        name: "Boston Legend Ice Cream Truck",
      },
    },
  };

  const themeColor = getThemeColor(item.slug);

  return (
    <div className="min-h-screen pt-24 pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pb-16 sm:pb-24">
        {/* Breadcrumb / Back Link */}
        <Link
          href="/menu"
          className="inline-flex items-center text-sm font-bold text-navy/60 hover:text-coral transition-colors mb-8 sm:mb-12"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Menu
        </Link>

        <div className="bg-white/20 backdrop-blur-xl rounded-[2rem] sm:rounded-[3rem] shadow-2xl shadow-navy/10 border border-white/40 overflow-hidden flex flex-col md:flex-row">
          {/* Image Section */}
          <div className="md:w-1/2 p-8 sm:p-12 md:p-16 flex items-center justify-center bg-gradient-to-br from-mint/10 to-blue/5">
            <div className="relative w-full aspect-square max-w-md">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-contain mix-blend-multiply drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="md:w-1/2 p-8 sm:p-12 md:p-16 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-coral/10 text-coral text-xs font-bold uppercase tracking-wider rounded-full">
                {item.category}
              </span>
              <span className="text-navy/40 text-sm font-semibold">
                By {item.brand}
              </span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-navy leading-tight mb-6">
              {item.name}
            </h1>

            <p className="font-sans text-lg text-navy/70 leading-relaxed mb-8">
              {item.description}
            </p>

            <div className="space-y-6 sm:space-y-8">
              {/* Dietary Information */}
              {item.dietary.length > 0 && (
                <div>
                  <h3 className="font-sans font-bold text-navy mb-3 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-mint"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Dietary Badges
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.dietary.map((diet, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-mint/10 text-mint-dark text-xs font-bold rounded-full border border-mint/20"
                      >
                        {diet}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Allergen Information */}
              {item.allergens.length > 0 && (
                <div>
                  <h3 className="font-sans font-bold text-navy mb-3 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-coral"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    Allergen Notice
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.allergens.map((allergen, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-md border border-gray-200"
                      >
                        {allergen.includes("None") ? "Allergy-Friendly" : `Contains: ${allergen}`}
                      </span>
                    ))}
                  </div>
                  {!item.allergens.includes("None (Dairy Free)") && (
                    <p className="text-xs text-navy/40 mt-2">
                      Processed in a facility that may handle other common allergens.
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-10 pt-8 border-t border-navy/5">
              <Link
                href="/packages"
                className="inline-block bg-coral hover:bg-coral-dark text-white font-bold py-4 px-8 rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-coral/30"
              >
                Book Us For Your Event
              </Link>
            </div>
          </div>
        </div>
      </div>

      <BrandCarousel variant="white" themeColor={themeColor} topDripColor="#FFFBF5" />

      {/* Blog Posts Section */}
      {recentPosts.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex justify-between items-end mb-12">
              <div>
                <span className="inline-block py-1 px-3 bg-navy/5 text-navy font-bold text-xs tracking-widest uppercase rounded-full mb-3">
                  See {item.name} in Action
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-navy">
                  Recent <span className="text-coral">Events</span>
                </h2>
              </div>
              <Link href="/blog" className="hidden sm:inline-flex items-center gap-2 text-navy font-bold hover:text-coral transition-colors">
                Explore All Events &rarr;
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recentPosts.map((post) => {
                const style = getCategoryStyle(post.category?.name);
                // Use a default image if featuredImage is missing
                const imageSrc = post.featuredImage || "/images/hero-cinematic.jpg";
                
                return (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="group block bg-white rounded-[2rem] border border-navy/5 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="relative aspect-[4/3] bg-navy/5 overflow-hidden">
                      <Image 
                        src={imageSrc} 
                        alt={post.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                      <div className="absolute top-4 left-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${style.bg} ${style.text} backdrop-blur-md text-xs font-bold uppercase tracking-wider`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                          {post.category?.name || "Event"}
                        </div>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-navy mb-3 line-clamp-2 group-hover:text-coral transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-navy/60 text-sm line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
            
            <div className="mt-8 text-center sm:hidden">
              <Link href="/blog" className="inline-flex items-center justify-center w-full py-4 bg-navy/5 text-navy font-bold rounded-2xl hover:bg-navy/10 transition-colors">
                Explore All Events
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <div className="border-t border-navy/5">
        <FinalCTA themeColor={themeColor} />
      </div>
    </div>
  );
}
