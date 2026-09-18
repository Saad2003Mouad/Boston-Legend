import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getAllServices } from "@/lib/services-data";

export default function ServicesMarquee({ theme = "light", limit }: { theme?: "light" | "dark"; limit?: number }) {
  const allServices = getAllServices();
  const displayedServices = limit ? allServices.slice(0, limit) : allServices;
  const hasMore = limit ? allServices.length > limit : false;
  return (
    <section
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #FFFBF5 0%, #FFF0F4 50%, #FFE1E8 100%)" }}
    >

        <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          
          {/* Section Header */}
          <div className="mb-12 md:mb-24">
            {/* Top row: badge left, button right */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between items-start gap-4 mb-6">
              <div 
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest"
                style={{
                  background: "rgba(255,78,116,0.15)",
                  color: "#FF4E74",
                }}
              >
                <Sparkles className="w-3.5 h-3.5" /> Full Catering Portfolio
              </div>
              {hasMore && (
                <Link
                  href="/occasions"
                  className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border-2 border-[#1A1009]/20 text-[#1A1009] font-bold text-xs sm:text-sm hover:bg-[#FF4E74] hover:border-[#FF4E74] hover:text-white transition-all duration-300"
                >
                  View All Occasions
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
            {/* Heading */}
            <h2 className="font-display font-black text-[clamp(1.9rem,5.5vw,4.75rem)] leading-[1.08] mb-4 sm:mb-6 text-[#1A1009] max-w-3xl">
              Every Celebration.<br />
              <span className="italic font-serif" style={{ color: "#FF4E74" }}>Every Massachusetts City.</span>
            </h2>
            <p className="font-sans text-[clamp(0.95rem,1.4vw,1.25rem)] leading-relaxed max-w-xl" style={{ color: "rgba(26,16,9,0.7)" }}>
              From intimate backyard birthdays of 25 to massive 2,500-guest corporate festivals across Greater Boston. Whenever there&apos;s a reason to celebrate, Boston Legend brings the sweet memories.
            </p>
          </div>

          {/* List layout replacing the marquee for elegance */}
          <div className="flex flex-col border-t border-[rgba(26,16,9,0.08)]">
            {displayedServices.map((svc, index) => (
              <Link 
                key={svc.slug} 
                href={`/occasions/${svc.slug}`}
                className="group flex flex-col md:flex-row items-start md:items-center py-6 md:py-12 border-b border-[rgba(26,16,9,0.08)] gap-4 md:gap-12 transition-all duration-300 hover:bg-[rgba(255,255,255,0.4)] px-3 md:px-4 rounded-3xl -mx-2 md:-mx-4"
              >
                <div 
                  className="font-display font-black text-xl md:text-3xl w-12 md:w-16"
                  style={{ color: "rgba(255,78,116,0.25)" }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="flex-1">
                  <h3 className="font-black text-xl md:text-2xl mb-2 text-[#1A1009] group-hover:text-[#FF4E74] transition-colors">
                    {svc.name}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed" style={{ color: "rgba(26,16,9,0.55)" }}>
                    {svc.shortDescription}
                  </p>
                </div>
                <div className="flex-shrink-0 mt-4 md:mt-0">
                  <div 
                    className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-[rgba(26,16,9,0.15)] text-[#1A1009] flex items-center justify-center transition-all duration-500 group-hover:bg-[#FF4E74] group-hover:border-[#FF4E74] group-hover:text-white"
                  >
                    <ArrowRight className="w-5 h-5 md:w-6 md:h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
        </div>
    </section>
  );
}
