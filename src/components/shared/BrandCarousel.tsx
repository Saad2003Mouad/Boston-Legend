"use client";

import Image from "next/image";

const brands = [
  { name: "Good Humor", logo: "/images/brands/boston-legend-ice-cream-truck-good-humor.png" },
  { name: "Richie's Italian Ice", logo: "/images/brands/boston-legend-ice-cream-truck-richies-italian-ice.png" },
  { name: "Popsicle", logo: "/images/brands/boston-legend-ice-cream-truck-popsicle.png" },
  { name: "Blue Bunny", logo: "/images/brands/boston-legend-ice-cream-truck-blue-bunny.png" },
  { name: "Hood", logo: "/images/brands/boston-legend-ice-cream-truck-hood.png" },
  { name: "Klondike", logo: "/images/brands/boston-legend-ice-cream-truck-klondike.png" }
];

import MeltingDrip from "@/components/shared/MeltingDrip";

interface BrandCarouselProps {
  topDripColor?: string;
  themeColor?: string;
  variant?: "default" | "white";
}

export default function BrandCarousel({ topDripColor = "#FFF4D6", themeColor, variant = "default" }: BrandCarouselProps = {}) {
  const isWhite = variant === "white";
  const bgColor = isWhite ? "#FFF4D6" : (themeColor || "#C9232D");
  const gradient = isWhite 
    ? "none" 
    : (themeColor ? `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}dd 100%)` : "linear-gradient(135deg, #C9232D 0%, #A31B24 100%)");

  return (
    <div className="relative w-full overflow-hidden" style={{ backgroundColor: bgColor }}>
      {/* Drip coming DOWN from the section above into BrandCarousel */}
      <MeltingDrip
        color={topDripColor}
        height={80}
        variant="right-heavy"
      />

      <section
        className="py-16 overflow-hidden"
        style={{ background: gradient }}
      >
        <div className="container mx-auto px-6 mb-10 text-center relative z-10">
          <h2 
            className={`font-display italic font-light text-[clamp(2.5rem,4vw,3.5rem)] mb-4 leading-tight ${!isWhite ? "text-white" : ""}`}
            style={isWhite ? { color: themeColor || "#C9232D" } : undefined}
          >
            Experience the finest ice cream brands
            <br className="hidden md:block" /> served straight from our trucks!
          </h2>
          <p 
            className={`font-sans text-lg md:text-xl font-medium max-w-2xl mx-auto ${!isWhite ? "text-white/90" : ""}`}
            style={isWhite ? { color: themeColor || "#C9232D", opacity: 0.85 } : undefined}
          >
            We partner with the world&apos;s most beloved ice cream makers to bring you legendary flavors and nostalgic treats.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="relative flex w-full flex-nowrap items-center overflow-hidden z-10">
          {/* We duplicate the content to ensure seamless infinite scrolling */}
          <div className="flex w-max animate-marquee items-center justify-center gap-10 md:gap-16 px-8 py-4">
            {[...brands, ...brands, ...brands].map((brand, idx) => (
              <div key={idx} className="flex-shrink-0 w-24 md:w-36 transition-transform duration-300 hover:scale-110 bg-white rounded-2xl p-4 shadow-md border border-white/60">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={160}
                  height={80}
                  className="w-full h-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

