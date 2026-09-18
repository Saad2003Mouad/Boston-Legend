"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Sparkles, Map, IceCream, Truck, Users, Clock, Star, ChevronDown } from "lucide-react";
// Remove hardcoded PACKAGES import since we receive them via props
// import { TRUCK_PACKAGES, VAN_PACKAGES, CUSTOM_PACKAGES, Package } from "@/lib/packages-data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: "easeOut" as const },
  }),
};

export default function PackagesClient({
  truckPackages,
  vanPackages,
  customPackages
}: {
  truckPackages: any[];
  vanPackages: any[];
  customPackages: any[];
}) {
  const [activeTab, setActiveTab] = useState<"truck" | "van">("truck");

  return (
    <div className="min-h-screen font-sans">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="pt-24 sm:pt-32 md:pt-40 pb-10 md:pb-16 px-4 md:px-8 max-w-[1400px] mx-auto relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-coral/5 rounded-full blur-[120px] -z-10" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-mint/10 rounded-full blur-[80px] -z-10" />

        <div className="flex flex-col items-center text-center relative z-10">
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-navy/5 border border-navy/10 text-navy font-bold text-xs sm:text-sm mb-4 sm:mb-6">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-coral" /> Our Packages
          </motion.div>

          <motion.h1 initial="hidden" animate="show" variants={fadeUp} custom={1}
            className="font-display font-black text-3xl sm:text-5xl md:text-7xl text-navy leading-[1.05] sm:leading-[0.9] tracking-tight mb-4 sm:mb-6 italic">
            Choose Your<br /><span className="text-coral">Sweet</span> Celebration
          </motion.h1>

          <motion.p initial="hidden" animate="show" variants={fadeUp} custom={2}
            className="text-sm sm:text-lg md:text-xl text-gray-500 font-medium max-w-2xl leading-relaxed mb-8 md:mb-12 px-2">
            From intimate backyard birthdays to 200-guest festivals — our classic trucks and premium vans deliver the perfect ice cream moment.
          </motion.p>

          {/* Tab switcher */}
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={3}
            className="inline-flex items-center bg-white rounded-full border border-gray-200 shadow-sm p-1 gap-1 max-w-full">
            <button
              onClick={() => setActiveTab("truck")}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-black text-xs sm:text-sm transition-all ${activeTab === "truck" ? "bg-coral text-white shadow-lg shadow-coral/20" : "text-gray-500 hover:text-navy"}`}>
              <IceCream size={15} /> Classic Truck
            </button>
            <button
              onClick={() => setActiveTab("van")}
              className={`flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-black text-xs sm:text-sm transition-all ${activeTab === "van" ? "bg-navy text-white shadow-lg shadow-navy/20" : "text-gray-500 hover:text-navy"}`}>
              <Truck size={15} /> Premium Van
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Package Grid ──────────────────────────────────────────────── */}
      <section className="pb-24 px-4 md:px-8 max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === "truck" ? (
            <motion.div key="truck" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 rounded-2xl bg-coral flex items-center justify-center text-white rotate-3 shadow-xl shadow-coral/25">
                    <IceCream size={26} />
                  </div>
                  <div>
                    <h2 className="font-display font-black text-3xl md:text-4xl text-navy">Classic Truck Packages</h2>
                    <p className="text-gray-400 font-medium">The nostalgic, beloved ice cream truck experience</p>
                  </div>
                </div>
              </div>
              <PackageGrid packages={truckPackages} accentColor="coral" />
            </motion.div>
          ) : (
            <motion.div key="van" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-14 h-14 rounded-2xl bg-navy flex items-center justify-center text-white -rotate-3 shadow-xl shadow-navy/25">
                    <Truck size={26} />
                  </div>
                  <div>
                    <h2 className="font-display font-black text-3xl md:text-4xl text-navy">Premium Van Packages</h2>
                    <p className="text-gray-400 font-medium">Sleek Sprinter Vans for upscale, refined events</p>
                  </div>
                </div>
              </div>
              <PackageGrid packages={vanPackages} accentColor="navy" />
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Custom / Large Events Section ─────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Dark navy background */}
        <div className="absolute inset-0 bg-navy" />
        {/* Decorative glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-coral/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-mint/10 rounded-full blur-[100px]" />

        <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 py-14 sm:py-20 lg:py-28">
          {customPackages.map((pkg) => (
            <div key={pkg.id} className="grid lg:grid-cols-2 gap-8 sm:gap-12 xl:gap-20 items-center">

              {/* Left: Text content */}
              <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#FFD700]/30 bg-[#FFD700]/10 text-[#FFD700] font-black text-xs sm:text-sm mb-4 sm:mb-6 backdrop-blur-md">
                  <Map className="w-4 h-4" /> {pkg.badge}
                </div>

                <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white mb-4 leading-[1.05] sm:leading-[0.95]">
                  {pkg.name}
                </h2>
                <p className="text-base sm:text-lg text-white/60 font-medium mb-6 sm:mb-10 leading-relaxed max-w-lg">
                  {pkg.description}
                </p>

                {/* Features list */}
                <ul className="space-y-4 mb-12">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-coral/20 border border-coral/30 flex items-center justify-center text-coral flex-shrink-0">
                        <Check size={15} strokeWidth={3} />
                      </div>
                      <span className="text-white/90 font-semibold text-base">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Stats row */}
                <div className="flex flex-wrap gap-6 mb-10">
                  <div className="flex items-center gap-2 text-white/50 font-bold text-sm">
                    <Users size={16} className="text-coral" /> 200+ Guests
                  </div>
                  <div className="flex items-center gap-2 text-white/50 font-bold text-sm">
                    <Clock size={16} className="text-coral" /> Custom Duration
                  </div>
                  <div className="flex items-center gap-2 text-white/50 font-bold text-sm">
                    <Star size={16} className="text-[#FFD700]" /> Dedicated Coordinator
                  </div>
                </div>

                <Link
                  href={`/book?package=${pkg.slug}`}
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-coral text-white font-black text-xl hover:bg-[#e05a50] hover:scale-105 transition-all shadow-2xl shadow-coral/30 group"
                >
                  Request Custom Quote
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

                {/* Right: Image */}
              <motion.div
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}
                className="relative aspect-video lg:aspect-[3/2] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent z-10" />
                {/* Bottom label */}
                <div className="absolute bottom-6 left-6 z-20 flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3">
                  <Image src="/images/logo-dark.png" alt="Boston Legend Ice Cream Truck" width={36} height={36} className="rounded-full object-cover" />
                  <div>
                    <div className="text-white font-black text-sm leading-none">Boston Legend Ice Cream Truck</div>
                    <div className="text-white/60 font-medium text-xs mt-0.5">Boston&apos;s Premier Event Service</div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-navy/10 z-10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                
                {/* Main Content */}
                <Image
                  src={pkg.imageUrl || "/images/van_packages/custom_event.jpg"}
                  alt={`${pkg.name} - Custom large ice cream truck catering event in Massachusetts`}
                  title={`Book a custom ${pkg.name} ice cream truck experience in MA`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-4 transition-transform duration-700 group-hover:scale-105 drop-shadow-md bg-gray-50"
                />
              </motion.div>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
}

// ─── Package Grid ─────────────────────────────────────────────────────────────
function PackageGrid({ packages, accentColor }: { packages: any[]; accentColor: "coral" | "navy" }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const btnClass = accentColor === "coral"
    ? "bg-coral text-white hover:bg-[#e05a50] shadow-coral/20"
    : "bg-navy text-white hover:bg-[#1a2a4a] shadow-navy/20";

  const checkClass = accentColor === "coral"
    ? "bg-coral/10 text-coral"
    : "bg-navy/10 text-navy";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {packages.map((pkg, i) => {
        const isOpen = expanded === pkg.id;
        const isHighlight = pkg.isPopular;

        return (
          <motion.div
            key={pkg.id}
            custom={i}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            className={`relative flex flex-col rounded-[2rem] border transition-all duration-300 overflow-hidden group ${
              isHighlight
                ? "border-coral shadow-2xl shadow-coral/15 bg-white"
                : "border-gray-100 shadow-lg shadow-gray-100/80 bg-white hover:shadow-xl hover:border-gray-200"
            }`}
          >
            {/* Popular ribbon */}
            {isHighlight && (
              <div className="absolute top-0 right-8 bg-coral text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-b-xl shadow-lg z-10">
                Most Popular
              </div>
            )}
            {/* Other badges */}
            {pkg.badge && !isHighlight && (
              <div className={`absolute top-0 right-8 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-b-xl shadow-md z-10 ${
                pkg.badgeVariant === "gold" ? "bg-[#FFD700] text-navy"
                : pkg.badgeVariant === "coral" ? "bg-coral text-white"
                : "bg-mint text-navy"
              }`}>
                {pkg.badge}
              </div>
            )}

            {/* Card Image */}
            {pkg.imageUrl && (
              <div className="relative w-full shrink-0 overflow-hidden aspect-square bg-gray-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-navy/5 z-10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                
                {/* Main Content */}
                <Image 
                  src={pkg.imageUrl} 
                  alt={`${pkg.name} - Premium ice cream truck catering package in Massachusetts`} 
                  title={`Reserve our ${pkg.name} for your event in MA`}
                  fill 
                  className="object-contain p-4 transition-transform duration-700 group-hover:scale-105 drop-shadow-md"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Smooth gradient blending into the header */}
                <div className={`absolute bottom-0 left-0 w-full h-1/4 z-10 bg-gradient-to-t ${isHighlight ? "from-navy" : "from-white"} to-transparent pointer-events-none`} />
              </div>
            )}

            {/* Card Header */}
            <div className={`relative z-20 px-5 sm:px-8 pb-6 sm:pb-8 pt-5 sm:pt-6 border-b ${isHighlight ? "bg-navy border-navy/5" : "bg-white border-gray-50"}`}>
              <div className={`text-[11px] sm:text-xs font-black uppercase tracking-widest mb-2 sm:mb-3 ${isHighlight ? "text-coral" : "text-coral"}`}>
                {pkg.durationLabel} · {pkg.servings} Servings
              </div>
              <h3 className={`font-display font-black text-xl sm:text-2xl mb-1 ${isHighlight ? "text-white drop-shadow-sm" : "text-navy"}`}>
                {pkg.name}
              </h3>
              <p className={`text-xs sm:text-sm font-medium mb-4 sm:mb-6 ${isHighlight ? "text-white/70" : "text-gray-500"}`}>
                {pkg.tagline}
              </p>
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl sm:text-5xl font-black tracking-tighter ${isHighlight ? "text-white" : "text-navy"}`}>
                  ${pkg.price}
                </span>
                <span className={`font-bold text-xs sm:text-sm ${isHighlight ? "text-white/40" : "text-gray-400"}`}>
                  base price
                </span>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-5 sm:p-8 flex flex-col flex-grow bg-white">
              {/* Top 2 features always visible */}
              <ul className="space-y-3 mb-4 flex-grow">
                {pkg.features.slice(0, 2).map((f, fi) => (
                  <li key={fi} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${checkClass}`}>
                      <Check size={11} strokeWidth={4} />
                    </div>
                    <span className="text-gray-600 font-semibold text-sm leading-tight">{f}</span>
                  </li>
                ))}

                {/* Expandable additional features */}
                <AnimatePresence>
                  {isOpen && pkg.features.slice(2).map((f, fi) => (
                    <motion.li key={fi + 2}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-start gap-3 overflow-hidden">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${checkClass}`}>
                        <Check size={11} strokeWidth={4} />
                      </div>
                      <span className="text-gray-600 font-semibold text-sm leading-tight">{f}</span>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>

              {/* Expand toggle */}
              {pkg.features.length > 2 && (
                <button onClick={() => setExpanded(isOpen ? null : pkg.id)}
                  className="flex items-center gap-1.5 text-gray-400 hover:text-gray-600 font-bold text-xs mb-5 transition-colors">
                  <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  {isOpen ? "Show less" : `+${pkg.features.length - 2} more features`}
                </button>
              )}

              <Link
                href={`/book?package=${pkg.slug}`}
                className={`w-full py-4 rounded-xl flex items-center justify-center font-black text-base transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] gap-2 group ${btnClass}`}
              >
                Book This Package <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
