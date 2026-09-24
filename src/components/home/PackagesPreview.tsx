"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";
import MeltingDrip from "@/components/shared/MeltingDrip";

export default function PackagesPreview({ featuredPackages }: { featuredPackages: any[] }) {

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
    <section className="relative py-16 md:py-32 overflow-hidden bg-cream">
      {/* Cream drip from BlogSection above */}
      <div className="absolute top-0 left-0 right-0 z-0">
        <MeltingDrip
          color="#FFFBF5"
          height={120}
          variant="center-heavy"
        />
      </div>

      <div className="container mx-auto px-5 md:px-12 lg:px-24 relative z-10 pt-10 md:pt-20">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-24 text-center lg:text-left">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-coral/10 text-coral text-xs font-black uppercase tracking-widest mb-4 border border-coral/20">
              <Sparkles className="w-3.5 h-3.5" /> All-Inclusive Catering
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display italic font-light text-[clamp(2.5rem,5vw,4.25rem)] leading-tight text-charcoal mb-4"
            >
              Legendary <span className="text-coral">Ice Cream Packages</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-sans text-charcoal/70 text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed font-medium"
            >
              Choose between our iconic full-size American Legend truck or boutique setup. All packages include trained friendly staff, unlimited smiles, and certified Massachusetts service.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              href="/packages"
              className="group inline-flex items-center gap-3 font-sans font-bold text-charcoal uppercase tracking-widest text-sm bg-white px-8 py-4 rounded-full border-2 border-charcoal/10 hover:border-coral hover:text-coral transition-all shadow-soft hover:shadow-md"
            >
              View All 5 Packages
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
              className={`group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border transition-all duration-300 shadow-xl ${
                pkg.isPopular ? "border-coral shadow-coral/20 relative" : "border-navy/5 shadow-soft"
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute top-0 right-8 bg-coral text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-b-xl shadow-lg z-30">
                  Most Popular Choice
                </div>
              )}

              {/* Card Image with Organic Melting Transition */}
              {pkg.imageUrl && (
                <div className="relative w-full shrink-0 overflow-hidden aspect-square bg-gray-50 flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-black/5 z-10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                  
                  <Image 
                    src={pkg.imageUrl} 
                    alt={`${pkg.name} - American Legend ice cream truck catering package in Massachusetts`} 
                    title={`Rent ${pkg.name} for your event in MA`}
                    fill 
                    className="object-contain p-4 transition-transform duration-700 group-hover:scale-105 drop-shadow-md"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                </div>
              )}

              {/* Card Header */}
              <div className={`relative z-20 px-6 md:px-10 pb-6 md:pb-10 pt-4 border-b ${
                pkg.isPopular ? "bg-coral text-white border-white/10" : "bg-white text-charcoal border-navy/5"
              }`}>
                <div className={`text-xs font-black uppercase tracking-widest mb-3 ${
                  pkg.isPopular ? "text-white/80" : "text-coral"
                }`}>
                  {pkg.durationLabel} · {pkg.servings} Servings Included
                </div>
                <h3 className={`font-display italic font-light text-3xl md:text-4xl mb-2 ${
                  pkg.isPopular ? "text-white" : "text-charcoal"
                }`}>
                  {pkg.name}
                </h3>
                <p className={`text-sm md:text-base font-medium mb-6 min-h-[44px] ${
                  pkg.isPopular ? "text-white/80" : "text-charcoal/70"
                }`}>
                  {pkg.tagline}
                </p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-5xl md:text-6xl font-black tracking-tight ${
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
              <div className="p-6 md:p-10 flex flex-col flex-1 bg-white">
                <ul className="flex flex-col gap-4 mb-8 md:mb-10 flex-1">
                  {pkg.features.slice(0, 4).map((feature: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3.5">
                      <div className="bg-coral/10 p-1.5 rounded-full shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-coral" strokeWidth={3} />
                      </div>
                      <span className="font-sans text-charcoal/85 font-semibold text-[0.95rem]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/book?package=${pkg.slug}`}
                  className={`w-full py-4 rounded-full text-center font-sans font-black text-[0.9rem] tracking-widest uppercase transition-all duration-300 transform active:scale-95 ${
                    pkg.isPopular
                      ? "bg-coral text-white hover:bg-coral/90"
                      : "bg-cream border border-coral text-coral hover:bg-coral hover:text-white"
                  }`}
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

