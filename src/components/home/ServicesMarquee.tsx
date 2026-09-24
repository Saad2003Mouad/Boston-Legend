import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getAllServices } from "@/lib/services-data";

import MeltingDrip from "@/components/shared/MeltingDrip";

export default function ServicesMarquee({ theme = "light", limit }: { theme?: "light" | "dark"; limit?: number }) {
  const allServices = getAllServices();
  const displayedServices = limit ? allServices.slice(0, limit) : allServices;
  const hasMore = limit ? allServices.length > limit : false;
  
  return (
    <section
      className="py-16 md:py-32 relative overflow-hidden"
      style={{ background: "#FFF4D6" }}
    >
        {/* Elegant animated wave from the Navy Hero Section */}
        <div className="absolute top-0 left-0 right-0 z-0">
          <MeltingDrip color="#071B3A" height={100} />
        </div>

        <div className="container mx-auto px-5 md:px-12 lg:px-24 relative z-10 pt-10">
          
          {/* Section Header */}
          <div className="mb-10 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 md:mb-8"
                style={{
                  background: "rgba(201,35,45,0.1)",
                  color: "#C9232D",
                }}
              >
                <Sparkles className="w-4 h-4" /> 
                <span>Full Catering Portfolio</span>
              </div>
              
              <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] text-[#071B3A]">
                Every Celebration.<br />
                <span className="italic" style={{ color: "#C9232D" }}>Every Mass. City.</span>
              </h2>
            </div>
            
            <div className="flex-shrink-0 mb-2">
              <p className="font-sans text-base md:text-lg leading-relaxed max-w-sm mb-6 font-medium" style={{ color: "rgba(7,27,58,0.7)" }}>
                From intimate backyard birthdays to massive corporate festivals across Greater Boston.
              </p>
              {hasMore && (
                <Link
                  href="/occasions"
                  className="group inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-full bg-[#071B3A] text-white font-bold text-sm uppercase tracking-widest hover:bg-[#C9232D] transition-all duration-400"
                >
                  View All Occasions
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-400" />
                </Link>
              )}
            </div>
          </div>

          {/* Premium List Layout */}
          <div className="flex flex-col border-t-2 border-[#071B3A]/10">
            {displayedServices.map((svc, index) => (
              <Link 
                key={svc.slug} 
                href={`/occasions/${svc.slug}`}
                className="group relative flex flex-col sm:flex-row sm:items-center py-8 md:py-12 border-b border-[#071B3A]/10 transition-colors hover:border-[#C9232D]/30"
              >
                {/* Background hover effect */}
                <div className="absolute inset-0 bg-white/40 scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] -z-10" />

                {/* Number */}
                <div 
                  className="font-display font-black text-3xl md:text-5xl w-16 md:w-24 mb-4 sm:mb-0 transition-colors duration-300"
                  style={{ color: "rgba(7,27,58,0.15)" }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                
                {/* Content */}
                <div className="flex-1 pr-4 md:pr-12">
                  <h3 className="font-display italic font-bold text-3xl md:text-5xl lg:text-6xl mb-2 text-[#071B3A] group-hover:text-[#C9232D] transition-colors duration-300">
                    {svc.name}
                  </h3>
                  <p className="font-sans text-sm md:text-lg font-medium" style={{ color: "rgba(7,27,58,0.6)" }}>
                    {svc.shortDescription}
                  </p>
                </div>
                
                {/* Arrow */}
                <div className="hidden sm:flex flex-shrink-0">
                  <div 
                    className="w-14 h-14 md:w-20 md:h-20 rounded-full border border-[#071B3A]/20 text-[#071B3A] flex items-center justify-center transition-all duration-500 group-hover:bg-[#C9232D] group-hover:border-[#C9232D] group-hover:text-white"
                  >
                    <ArrowRight className="w-6 h-6 md:w-8 md:h-8 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                  </div>
                </div>
                
                {/* Mobile Arrow (Visible only on small screens, positioned in the top right of the card conceptually, or bottom) */}
                <div className="sm:hidden absolute top-8 right-0 text-[#C9232D]">
                  <ArrowRight className="w-6 h-6 -rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          
        </div>
    </section>
  );
}
