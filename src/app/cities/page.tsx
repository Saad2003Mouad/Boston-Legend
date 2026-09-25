import Link from "next/link";
import { MASSACHUSETTS_CITIES, CityData } from "@/lib/cities-data";
import { CONNECTICUT_CITIES, RHODE_ISLAND_CITIES, NEW_HAMPSHIRE_CITIES, VERMONT_CITIES, MAINE_CITIES } from "@/lib/new-england-data";
import { MapPin, ChevronRight, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Service Areas — All New England Cities | American Legend Ice Cream Truck",
  description: "American Legend serves 600+ cities across all 6 New England states: MA, CT, RI, NH, VT, ME. Find your city and book a premium ice cream truck!",
};

function groupCitiesAlphabetically(cities: CityData[]) {
  return cities.reduce((acc, city) => {
    const letter = city.name.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(city);
    return acc;
  }, {} as Record<string, CityData[]>);
}

const STATE_SECTIONS = [
  { code: "MA", name: "Massachusetts", color: "#071B3A", accent: "#C9232D", cities: MASSACHUSETTS_CITIES, description: "Our home state — 500+ cities across the entire Commonwealth" },
  { code: "CT", name: "Connecticut",   color: "#1B4F72", accent: "#2E86C1", cities: CONNECTICUT_CITIES,   description: "From Hartford to Greenwich, New Haven to Stamford" },
  { code: "RI", name: "Rhode Island",  color: "#7B241C", accent: "#C0392B", cities: RHODE_ISLAND_CITIES,  description: "Providence, Newport, Warwick, and coastal Rhode Island" },
  { code: "NH", name: "New Hampshire", color: "#1E8449", accent: "#27AE60", cities: NEW_HAMPSHIRE_CITIES, description: "Manchester, Nashua, Portsmouth, and the Granite State" },
  { code: "VT", name: "Vermont",       color: "#6E2F0A", accent: "#A04000", cities: VERMONT_CITIES,       description: "Burlington, Stowe, and the Green Mountains" },
  { code: "ME", name: "Maine",         color: "#154360", accent: "#1A5276", cities: MAINE_CITIES,         description: "Portland, Kennebunkport, Bangor, and the Maine coast" },
];

export default function CitiesIndexPage() {
  const totalCities = [MASSACHUSETTS_CITIES, CONNECTICUT_CITIES, RHODE_ISLAND_CITIES, NEW_HAMPSHIRE_CITIES, VERMONT_CITIES, MAINE_CITIES].reduce((s, arr) => s + arr.length, 0);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative pt-28 pb-24 md:pt-40 md:pb-40 bg-navy overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-coral/15 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4" />
        </div>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/20 border border-coral/30 text-coral text-xs font-bold tracking-widest uppercase mb-8">
              <MapPin size={12} /> All New England Service Areas
            </div>
            <h1 className="font-display italic font-light text-[clamp(3rem,6vw,5.5rem)] leading-[1.05] text-cream mb-6 tracking-tighter">
              Serving All of<br />
              <span className="text-coral">New England</span>
            </h1>
            <p className="font-sans text-cream/70 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl">
              From the mountains of Vermont to the coasts of Maine, the shores of Rhode Island to the suburbs of Connecticut — American Legend brings legendary ice cream catering to every corner of New England.
            </p>
            <div className="flex flex-wrap gap-8 mt-10">
              {[{ value: `${totalCities}+`, label: "Cities & Towns" }, { value: "6", label: "States Served" }, { value: "All Year", label: "Available" }].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-4xl text-coral font-bold">{stat.value}</div>
                  <div className="text-cream/50 text-xs uppercase tracking-widest font-bold mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATE NAV ── */}
      <section className="bg-cream py-12 md:py-20 border-b border-navy/5 relative z-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-10">
            <h2 className="font-display italic font-light text-3xl md:text-4xl text-navy mb-2">Explore by State</h2>
            <p className="text-navy/50 font-medium text-sm md:text-base">Select a state to browse all served cities &amp; towns</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {STATE_SECTIONS.map((state) => (
              <Link key={state.code} href={`/cities/state/${state.code}`}
                className="group relative px-4 py-8 md:py-10 bg-[#FFFDF8] rounded-[2rem] shadow-soft border border-navy/10 hover:shadow-lift hover:-translate-y-2 hover:border-coral/20 transition-all duration-500 text-center overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-coral/0 via-coral/0 to-coral/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="font-display italic font-light text-5xl md:text-6xl text-navy group-hover:text-coral transition-colors mb-3 tracking-tight leading-none">{state.code}</span>
                  <span className="font-sans text-navy/50 text-xs md:text-sm font-bold uppercase tracking-[0.2em] group-hover:text-navy transition-colors mb-3">{state.name}</span>
                  <span className="flex items-center gap-1 text-coral/0 group-hover:text-coral text-xs font-bold transition-colors duration-300">
                    Browse <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATE SECTIONS ── */}
      {STATE_SECTIONS.map((state, idx) => {
        const grouped = groupCitiesAlphabetically(state.cities);
        const letters = Object.keys(grouped).sort();
        return (
          <section key={state.code} id={`state-${state.code.toLowerCase()}`} className="py-20 md:py-28 scroll-mt-36"
            style={{ background: idx % 2 === 0 ? "#FFF4D6" : "#FFF8EC" }}>
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
              <div className="flex items-center gap-6 mb-14">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-xl"
                  style={{ background: state.color }}>
                  <span className="font-display text-2xl font-black text-white">{state.code}</span>
                </div>
                <div>
                  <h2 className="font-display italic font-bold text-3xl md:text-4xl text-navy">{state.name}</h2>
                  <p className="font-sans text-navy/60 text-sm mt-1">{state.description}</p>
                  <span className="inline-block mt-2 text-xs font-bold text-navy/40 uppercase tracking-widest">{state.cities.length} cities & towns</span>
                </div>
              </div>
              <div className="space-y-12">
                {letters.map((letter) => (
                  <div key={letter}>
                    <div className="flex items-center gap-4 mb-5">
                      <span className="font-display font-black text-2xl" style={{ color: state.accent }}>{letter}</span>
                      <div className="flex-1 h-px bg-navy/10" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                      {grouped[letter].sort((a, b) => a.name.localeCompare(b.name)).map((city) => (
                        <Link key={city.slug} href={`/cities/${city.slug}`}
                          className="group flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-[#FFFDF8] border border-navy/5 hover:border-coral hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 shadow-sm">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: `${state.accent}22`, color: state.accent }}>
                            <MapPin size={11} />
                          </div>
                          <span className="font-sans font-semibold text-sm text-navy/80 group-hover:text-navy truncate flex-1">{city.name}</span>
                          <ChevronRight size={13} className="text-navy/20 group-hover:text-coral transition-colors shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── BOTTOM CTA ── */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-coral/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="font-display italic font-light text-[clamp(2.5rem,5vw,4rem)] text-cream tracking-tighter mb-4">
            Don&apos;t see your city?
          </h2>
          <p className="text-cream/60 text-lg mb-10 max-w-xl mx-auto">
            We travel across all of New England and can accommodate events in nearby areas. Just reach out and we&apos;ll make it work.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-coral text-white font-bold rounded-full hover:bg-white hover:text-navy transition-all duration-300 shadow-xl shadow-coral/20">
            Contact Us &rarr;
          </Link>
        </div>
      </section>
    </>
  );
}
