import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import FAQSection from "@/components/shared/FAQSection";
import BrandCarousel from "@/components/shared/BrandCarousel";
import { menuItems } from "@/data/menu";

export const metadata: Metadata = constructMetadata({
  title: "Ice Cream Menu | Boston Legend Ice Cream Truck",
  description:
    "Explore our premium selection of nostalgic and modern pre-packaged ice cream novelties. We carry all your favorites from Good Humor, Popsicle, and more.",
  url: "/menu",
});

const faqs = [
  {
    question: "What makes Boston Legend Ice Cream different?",
    answer:
      "We bring a legendary dessert experience to your event! We specialize in artisan frozen treats, beloved nostalgic novelties, and premium packages (like the Dynasty and All-Star) that turn any gathering into an unforgettable sweet celebration.",
  },
  {
    question: "Can I customize the menu for my event?",
    answer:
      "Absolutely! While our menu highlights our most popular classic and premium options, our trucks can be stocked with specific favorites tailored for your guests. Just let our Boston Legend concierge know your preferences when booking.",
  },
  {
    question: "Are allergy-friendly options available?",
    answer:
      "Yes, the safety and joy of all your guests is our top priority. We always carry a selection of dairy-free, gluten-free, and nut-free treats. Because our novelties are securely pre-packaged, cross-contamination risks are kept to an absolute minimum.",
  },
];

export default function MenuPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-cream">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24 relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 bg-coral/10 text-coral font-bold text-xs sm:text-sm tracking-widest uppercase rounded-full mb-6 border border-coral/20">
            🍦 Boston Legend Menu
          </span>
          <h1 className="font-display italic font-light text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-tight text-charcoal mb-6">
            Legendary Flavors,<br className="hidden sm:block" />
            <span className="text-coral">Timeless Classics.</span>
          </h1>
          <p className="font-sans font-medium text-lg sm:text-xl md:text-2xl text-charcoal/70 max-w-3xl mx-auto leading-relaxed">
            Experience our meticulously curated selection of premium artisan treats and nostalgic ice cream novelties. Perfect for any celebration across Massachusetts.
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-10 sm:py-16 md:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {menuItems.map((item) => (
              <Link href={`/menu/${item.slug}`} key={item.id}>
                <div className="group bg-white p-3 sm:p-4 md:p-5 rounded-2xl sm:rounded-3xl border border-navy/5 hover:border-coral/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer">
                  {item.image && (
                    <div className="aspect-square relative mb-3 sm:mb-4 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-2 sm:p-3">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, 25vw"
                      />
                    </div>
                  )}
                  <h3 className="font-sans font-bold text-xs sm:text-sm md:text-base text-navy leading-tight group-hover:text-coral transition-colors flex-grow">
                    {item.name}
                  </h3>
                  
                  {/* Tags */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {item.dietary.map((diet, i) => (
                      <span key={i} className="text-[10px] font-bold px-2 py-0.5 bg-mint/10 text-mint-dark rounded-full">
                        {diet}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BrandCarousel />

      <FAQSection
        title="Menu Questions"
        subtitle="Common questions about our treats."
        items={faqs}
      />
    </div>
  );
}
