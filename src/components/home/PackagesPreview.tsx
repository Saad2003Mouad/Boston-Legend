"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";
import MeltingDrip from "@/components/shared/MeltingDrip";

export default function PackagesPreview({ featuredPackages, themeColor, themeBg }: { featuredPackages: any[], themeColor?: string, themeBg?: string }) {
  const accent = themeColor || "#C9232D";
  const sectionBg = themeBg || "#FFF4D6";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, type: "spring" } },
  };

  return (
    <section className="relative py-16 md:py-32 overflow-hidden" style={{ backgroundColor: sectionBg }}>
      {/* Drip from section above */}
      <div className="absolute top-0 left-0 right-0 z-0">
        <MeltingDrip
          color={sectionBg}
          height={120}
        />
      </div>

      <div className="container mx-auto px-5 md:px-12 lg:px-24 relative z-10 pt-10 md:pt-20">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-24 text-center lg:text-left">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-4 border"
              style={{ backgroundColor: `${accent}18`, color: accent, borderColor: `${accent}30` }}
            >
              <Sparkles className="w-3.5 h-3.5" /> All-Inclusive Catering
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display italic font-bold text-[clamp(2.5rem,5vw,4.25rem)] leading-tight text-charcoal mb-4"
            >
              Legendary <span style={{ color: accent }}>Ice Cream Packages</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-sans text-charcoal/70 text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed font-medium"
            >
              Choose between our iconic full-size American Legend truck or boutique setup. All packages include trained friendly staff, unlimited smiles, and certified New England service.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/packages"
              className="group inline-flex items-center gap-3 font-sans font-bold text-charcoal uppercase tracking-widest text-sm bg-white/60 px-8 py-4 rounded-full border-2 border-charcoal/10 transition-all shadow-soft hover:shadow-md"
              style={{ '--hover-color': accent } as any}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = accent; (e.currentTarget as HTMLElement).style.color = accent; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,0,0,0.1)'; (e.currentTarget as HTMLElement).style.color = '#171717'; }}
            >
              View All Packages
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* Package Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto"
        >
          {featuredPackages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group flex flex-col bg-white/70 rounded-[2.5rem] overflow-hidden border transition-all duration-300 shadow-xl"
              style={pkg.isPopular ? { borderColor: accent, boxShadow: `0 20px 60px ${accent}25` } : { borderColor: 'rgba(7,27,58,0.06)' }}
            >
              {pkg.isPopular && (
                <div
                  className="absolute top-0 right-8 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-b-xl shadow-lg z-30"
                  style={{ backgroundColor: accent }}
                >
                  Most Popular Choice
                </div>
              )}

              {/* Card Image with Organic Melting Transition */}
              {pkg.imageUrl && (
                <div className="relative w-full shrink-0 overflow-hidden aspect-square bg-gray-50 flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-black/5 z-10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                  
                  <Image 
                    src={pkg.imageUrl} 
                    alt={`${pkg.name} - American Legend ice cream truck catering package in New England`} 
                    title={`Rent ${pkg.name} for your event in New England`}
                    fill 
                    className="object-contain p-4 transition-transform duration-700 group-hover:scale-105 drop-shadow-md"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                </div>
              )}

              {/* Card Header */}
              <div
                className="relative z-20 px-5 md:px-10 pb-6 md:pb-10 pt-4 border-b"
                style={pkg.isPopular
                  ? { backgroundColor: accent, color: '#fff', borderColor: 'rgba(255,255,255,0.1)' }
                  : { backgroundColor: 'rgba(255,255,255,0.7)', borderColor: 'rgba(7,27,58,0.06)' }
                }
              >
                <div
                  className="text-xs font-black uppercase tracking-widest mb-3"
                  style={{ color: pkg.isPopular ? 'rgba(255,255,255,0.8)' : accent }}
                >
                  {pkg.durationLabel} · {pkg.servings} Servings Included
                </div>
                <h3 className={`font-display italic font-black text-2xl md:text-4xl mb-2 ${
                  pkg.isPopular ? "text-white" : "text-charcoal"
                }`}>
                  {pkg.name}
                </h3>
                <p className={`text-[0.85rem] md:text-base font-medium mb-5 min-h-[44px] ${
                  pkg.isPopular ? "text-white/80" : "text-charcoal/70"
                }`}>
                  {pkg.tagline}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-4xl md:text-6xl font-black tracking-tight ${
                    pkg.isPopular ? "text-white" : "text-charcoal"
                  }`}>
                    ${pkg.price}
                  </span>
                  <span className={`font-bold text-sm ${
                    pkg.isPopular ? "text-white/60" : "text-charcoal/50"
                  }`}>
                    starting price
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 md:p-10 flex flex-col flex-1 bg-[#FFFDF8]">
                <ul className="flex flex-col gap-3 md:gap-4 mb-6 md:mb-10 flex-1">
                  {pkg.features.slice(0, 4).map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3.5">
                      <div className="p-1.5 rounded-full shrink-0 mt-0.5" style={{ backgroundColor: `${accent}18` }}>
                        <Check className="w-4 h-4" strokeWidth={3} style={{ color: accent }} />
                      </div>
                      <span className="font-sans text-charcoal/85 font-semibold text-[0.95rem]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/book?package=${pkg.slug}`}
                  className="w-full py-4 rounded-full text-center font-sans font-black text-[0.9rem] tracking-widest uppercase transition-all duration-300 transform active:scale-95"
                  style={pkg.isPopular
                    ? { backgroundColor: accent, color: '#fff' }
                    : { backgroundColor: 'transparent', border: `1.5px solid ${accent}`, color: accent }
                  }
                  onMouseEnter={e => { if (!pkg.isPopular) { (e.currentTarget as HTMLElement).style.backgroundColor = accent; (e.currentTarget as HTMLElement).style.color = '#fff'; }}}
                  onMouseLeave={e => { if (!pkg.isPopular) { (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; (e.currentTarget as HTMLElement).style.color = accent; }}}
                >
                  Request This Package
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}



