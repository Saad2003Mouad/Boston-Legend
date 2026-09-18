import { Metadata } from "next";
import Link from "next/link";
import { MASSACHUSETTS_CITIES, CityData } from "@/lib/cities-data";
import { MapPin, ChevronRight, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Service Areas — All Massachusetts Cities | Boston Legend Ice Cream Truck",
  description:
    "Boston Legend Ice Cream Truck serves 500+ cities, towns, and municipalities across Massachusetts. Find your city and book a premium ice cream truck for your next event.",
};

// Group cities alphabetically
function groupCitiesAlphabetically(cities: CityData[]) {
  return cities.reduce(
    (acc, city) => {
      const letter = city.name.charAt(0).toUpperCase();
      if (!acc[letter]) acc[letter] = [];
      acc[letter].push(city);
      return acc;
    },
    {} as Record<string, CityData[]>
  );
}

export default function CitiesIndexPage() {
  const groupedCities = groupCitiesAlphabetically(MASSACHUSETTS_CITIES);
  const alphabet = Object.keys(groupedCities).sort();
  const totalCities = MASSACHUSETTS_CITIES.length;

  // Stats
  const counties = [...new Set(MASSACHUSETTS_CITIES.map((c) => c.county))].length;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 pb-24 md:pt-40 md:pb-40 bg-navy overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-coral/15 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
          {/* Subtle grid */}
          <svg className="absolute inset-0 w-full h-full opacity-5">
            <defs>
              <pattern id="cities-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cities-grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/20 border border-coral/30 text-coral text-xs font-bold tracking-widest uppercase mb-8">
              <MapPin size={12} />
              All Service Areas
            </div>

            <h1 className="font-display font-light text-[clamp(3rem,6vw,5.5rem)] leading-[1.05] text-cream mb-6 tracking-tighter">
              Serving All of
              <br />
              <span className="italic text-coral">Massachusetts</span>
            </h1>
            <p className="font-sans text-cream/70 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              From Greater Boston to the Berkshires, the North Shore to the South Coast — WE Ice
              Cream Truck proudly serves every corner of the Commonwealth.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6 mt-10">
              {[
                { value: `${totalCities}+`, label: "Cities & Towns" },
                { value: `${counties}`, label: "Counties Covered" },
                { value: "351", label: "Official Municipalities" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-4xl text-coral font-bold">{stat.value}</div>
                  <div className="text-cream/50 text-xs uppercase tracking-widest font-bold mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ALPHABET JUMP MENU (STICKY) ────────────────────────── */}
      <section className="sticky top-[88px] z-30 bg-white/50 backdrop-blur-xl border-b border-navy/10 py-4 shadow-sm">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-wrap gap-1.5 justify-center">
            {alphabet.map((letter) => (
              <a
                key={letter}
                href={`#letter-${letter}`}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-navy/5 text-navy text-sm font-bold hover:bg-coral hover:text-white transition-colors"
              >
                {letter}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIRECTORY LISTING ──────────────────────────────────── */}
      <section className="py-20 md:py-28 relative">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="space-y-20">
            {alphabet.map((letter) => (
              <div key={letter} id={`letter-${letter}`} className="scroll-mt-40">
                {/* Letter Heading */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-navy flex items-center justify-center shrink-0 shadow-lg">
                    <span className="font-display text-3xl text-cream font-bold">{letter}</span>
                  </div>
                  <div className="flex-1 h-px bg-navy/10" />
                  <span className="text-xs text-navy/40 font-bold uppercase tracking-widest">
                    {groupedCities[letter].length} locations
                  </span>
                </div>

                {/* Cities Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {groupedCities[letter]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((city) => (
                      <Link
                        key={city.slug}
                        href={`/cities/${city.slug}`}
                        className="group flex items-center gap-3 px-5 py-4 rounded-2xl bg-white border border-navy/5 hover:border-coral hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
                      >
                        <div className="w-7 h-7 rounded-full bg-coral/10 text-coral flex items-center justify-center shrink-0 group-hover:bg-coral group-hover:text-white transition-colors">
                          <MapPin size={12} />
                        </div>
                        <span className="font-sans font-semibold text-sm text-navy/80 group-hover:text-navy truncate flex-1">
                          {city.name}
                        </span>
                        <ChevronRight
                          size={14}
                          className="text-navy/20 group-hover:text-coral transition-colors shrink-0"
                        />
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-coral/10 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="font-display font-light text-[clamp(2.5rem,5vw,4rem)] text-cream tracking-tighter mb-4">
            Don&apos;t see your city?
          </h2>
          <p className="text-cream/60 text-lg mb-10 max-w-xl mx-auto">
            We travel all across Massachusetts and can accommodate events in nearby areas too. Just
            reach out and we&apos;ll make it work.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-coral text-white font-bold rounded-full hover:bg-white hover:text-navy transition-all duration-300 shadow-xl shadow-coral/20"
          >
            Contact Us →
          </Link>
        </div>
      </section>
    </>
  );
}
