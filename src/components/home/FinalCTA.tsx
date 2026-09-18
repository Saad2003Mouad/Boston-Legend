import Link from "next/link";
import { BUSINESS_CONFIG } from "@/lib/config";
import { ArrowRight, Phone, Sparkles, CheckCircle } from "lucide-react";
import MeltingDrip from "@/components/shared/MeltingDrip";

const PERKS = [
  "Free instant quote",
  "No hidden travel fees",
  "100% Satisfaction Guarantee",
  "Licensed & fully insured",
];

interface FinalCTAProps {
  themeColor?: string;
}

export default function FinalCTA({ themeColor }: FinalCTAProps = {}) {
  const bgColor = themeColor || "#FF4E74";
  const gradient = themeColor ? `linear-gradient(135deg, ${themeColor} 0%, ${themeColor}dd 100%)` : "linear-gradient(135deg, #FF4E74 0%, #E63860 100%)";

  return (
    <div className="relative w-full overflow-hidden" style={{ backgroundColor: bgColor }}>
      {/* Vanilla melting drip INTO the strawberry section */}
      <MeltingDrip
        color="#FFFBF5"
        height={100}
        variant="random"
      />

      <section
        className="relative w-full py-16 md:py-32 flex items-center justify-center overflow-hidden"
        style={{ background: gradient }}
      >
        {/* Ambient glows */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.15) 0%, transparent 65%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,251,245,0.10) 0%, transparent 70%)" }}
        />

        <div className="container mx-auto px-5 md:px-10 lg:px-20 relative z-10 text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">

            {/* Badge */}
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[0.68rem] font-black tracking-[0.2em] uppercase mb-7 shadow-sm"
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.4)",
                color: "#FFFBF5",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Bookings Filling Fast
            </span>

            {/* Headline */}
            <h2
              className="font-display font-black tracking-tight leading-[1.05] mb-6"
              style={{
                fontSize: "clamp(2.75rem, 6vw, 5rem)",
                color: "#FFFBF5",
              }}
            >
              Ready for the{" "}
              <span className="italic font-serif" style={{ color: "#FFFBF5", opacity: 0.9 }}>
                Sweetest Event
              </span>
              <br /> of the Year?
            </h2>

            <p
              className="font-sans text-[clamp(1.1rem,1.5vw,1.25rem)] leading-relaxed max-w-2xl mx-auto mb-12 font-medium"
              style={{ color: "rgba(255,251,245,0.9)" }}
            >
              Don&apos;t settle for boring catering. Treat your guests to the legendary Boston ice cream truck experience they&apos;ll be talking about for months.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto mb-12">
              <Link
                href="/book"
                className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 rounded-full font-black text-sm tracking-[0.15em] uppercase transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl bg-[#FFFBF5] text-[#FF4E74]"
              >
                Book Your Truck Now
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              
              <a
                href={`tel:${BUSINESS_CONFIG.contact.phone1.replace(/\D/g, "")}`}
                className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-300 border-2 border-white/30 text-white hover:bg-white/10"
              >
                <Phone className="w-4 h-4" />
                {BUSINESS_CONFIG.contact.phone1}
              </a>
            </div>

            {/* Perks */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              {PERKS.map((perk, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-white/80" />
                  <span className="text-sm font-semibold tracking-wide text-white/90">
                    {perk}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
