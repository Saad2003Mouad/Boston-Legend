import { BUSINESS_CONFIG } from "@/lib/config";
import { Star, Quote } from "lucide-react";
import MeltingDrip from "@/components/shared/MeltingDrip";

const testimonials = [
  {
    id: 1,
    name: "Sarah M.",
    city: "Boston",
    event: "Wedding",
    rating: 5,
    text: "Having American Legend at our wedding was the highlight of the night! The ice cream was premium, the staff was impeccable, and every guest was talking about it for weeks.",
    avatar: "SM",
    color: "#C9232D",
  },
  {
    id: 2,
    name: "David T.",
    city: "Cambridge",
    event: "Corporate Event",
    rating: 5,
    text: "We booked the Sprinter Van for 150 employees. They served everyone flawlessly in under 90 minutes. Completely stress-free from booking to the last scoop.",
    avatar: "DT",
    color: "#C99A3D",
  },
  {
    id: 3,
    name: "Jessica P.",
    city: "Newton",
    event: "Birthday Party",
    rating: 5,
    text: "The look on my son's face when the truck pulled up was absolutely priceless. The crew was wonderful with the kids. 10/10 would book again.",
    avatar: "JP",
    color: "#123E73",
  },
  {
    id: 4,
    name: "Michael R.",
    city: "Waltham",
    event: "School Fundraiser",
    rating: 5,
    text: "Incredible! They helped us raise over $500 for our school's athletic program in just two hours. Kids loved the huge variety of flavors.",
    avatar: "MR",
    color: "#C9232D",
  },
  {
    id: 5,
    name: "Amanda L.",
    city: "Somerville",
    event: "Block Party",
    rating: 5,
    text: "Our block party wouldn't have been the same without them. Arrived right on time, great energy, and the ice cream was absolutely delicious.",
    avatar: "AL",
    color: "#C99A3D",
  },
  {
    id: 6,
    name: "James K.",
    city: "Lexington",
    event: "Graduation Party",
    rating: 5,
    text: "A huge hit at my daughter's graduation! The vintage truck looked stunning in photos and the staff made every guest feel special.",
    avatar: "JK",
    color: "#123E73",
  },
];

export default function TestimonialsCarousel() {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section
      className="relative w-full overflow-hidden py-16 md:py-32"
      style={{ background: "linear-gradient(180deg, #071B3A 0%, #0A2348 100%)" }}
    >
      {/* Elegant animated wave from the Packages section */}
      <div className="absolute top-0 left-0 right-0 z-0">
        <MeltingDrip
          color="#FFF4D6"
          height={140}
        />
      </div>

      {/* Section header */}
      <div className="container mx-auto px-5 md:px-10 lg:px-20 mb-14 md:mb-18 relative z-10 pt-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[0.68rem] font-black tracking-[0.22em] uppercase mb-5"
              style={{
                background: "rgba(201,154,61,0.15)",
                border: "1px solid rgba(201,154,61,0.3)",
                color: "#C99A3D",
              }}
            >
              Client Stories
            </span>
            <h2
              className="font-display font-black tracking-tight leading-[1.06]"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)", color: "#ffffff" }}
            >
              What Our Clients{" "}
              <span
                className="italic"
                style={{
                  background: "linear-gradient(135deg, #C9232D, #C99A3D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Are Saying
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" style={{ color: "#C99A3D" }} />
              ))}
            </div>
            <div className="text-left">
              <p className="font-black text-lg" style={{ color: "#ffffff" }}>
                {BUSINESS_CONFIG.stats.rating}
                <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>/5.0</span>
              </p>
              <p className="text-xs font-bold" style={{ color: "rgba(255,255,255,0.45)" }}>
                {BUSINESS_CONFIG.stats.reviewCount}+ Reviews
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(90deg, #071B3A, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 pointer-events-none z-10"
        style={{ background: "linear-gradient(-90deg, #0A2348, transparent)" }} />

      {/* Scrolling cards */}
      <div className="flex w-full overflow-hidden">
        <div
          className="flex items-stretch gap-4 md:gap-6 px-4 md:px-6"
          style={{ animation: "marquee 45s linear infinite", width: "max-content" }}
        >
          {doubled.map((t, idx) => (
            <div
              key={`${t.id}-${idx}`}
              className="flex-shrink-0 w-[75vw] sm:w-[300px] md:w-[340px] flex flex-col rounded-[1.5rem] p-5 md:p-7 transition-all duration-300"
              style={{
                background: "#fff",
                border: "1.5px solid rgba(26,16,9,0.06)",
                boxShadow: "0 4px 20px rgba(26,16,9,0.04)",
              }}
            >
              {/* Top: Stars + Quote icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex gap-0.5">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: "#C99A3D" }} />
                  ))}
                </div>
                <Quote className="w-8 h-8" style={{ color: `${t.color}20` }} />
              </div>

              {/* Review text */}
              <p
                className="text-[0.85rem] md:text-[0.95rem] leading-relaxed flex-1 mb-5"
                style={{ color: "rgba(26,16,9,0.70)", fontStyle: "italic" }}
              >
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3" style={{ borderTop: "1px solid rgba(26,16,9,0.06)", paddingTop: "1rem" }}>
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-xs flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <p className="font-bold text-sm" style={{ color: "#071B3A" }}>{t.name}</p>
                  <p className="text-[0.68rem] font-bold uppercase tracking-wider" style={{ color: "rgba(26,16,9,0.40)" }}>
                    {t.event} · {t.city}, MA
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


