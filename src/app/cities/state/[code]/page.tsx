import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ChevronRight } from "lucide-react";
import { MASSACHUSETTS_CITIES, CityData } from "@/lib/cities-data";
import {
  CONNECTICUT_CITIES,
  RHODE_ISLAND_CITIES,
  NEW_HAMPSHIRE_CITIES,
  VERMONT_CITIES,
  MAINE_CITIES,
  NEW_ENGLAND_STATES,
} from "@/lib/new-england-data";

const STATE_DATA: Record<
  string,
  {
    cities: CityData[];
    description: string;
    color: string;
    accent: string;
    highlights: string[];
  }
> = {
  MA: {
    cities: MASSACHUSETTS_CITIES,
    description:
      "Our home state — serving 500+ cities across the entire Bay State, from Boston to the Berkshires.",
    color: "#071B3A",
    accent: "#C9232D",
    highlights: ["Boston", "Cambridge", "Worcester", "Springfield", "Lowell"],
  },
  CT: {
    cities: CONNECTICUT_CITIES,
    description:
      "From Hartford to Greenwich, New Haven to Stamford — all of Connecticut covered.",
    color: "#1B4F72",
    accent: "#2E86C1",
    highlights: ["Hartford", "New Haven", "Stamford", "Bridgeport", "Greenwich"],
  },
  RI: {
    cities: RHODE_ISLAND_CITIES,
    description:
      "Providence, Newport, Warwick, and every coastal Rhode Island community.",
    color: "#7B241C",
    accent: "#C0392B",
    highlights: ["Providence", "Newport", "Warwick", "Cranston", "Pawtucket"],
  },
  NH: {
    cities: NEW_HAMPSHIRE_CITIES,
    description:
      "Manchester, Nashua, Portsmouth, and the entire Granite State.",
    color: "#1E8449",
    accent: "#27AE60",
    highlights: ["Manchester", "Nashua", "Portsmouth", "Concord", "Dover"],
  },
  VT: {
    cities: VERMONT_CITIES,
    description:
      "Burlington, Stowe, Montpelier, and the beautiful Green Mountain communities.",
    color: "#6E2F0A",
    accent: "#A04000",
    highlights: ["Burlington", "Montpelier", "Stowe", "Brattleboro", "Rutland"],
  },
  ME: {
    cities: MAINE_CITIES,
    description:
      "Portland, Kennebunkport, Bangor, and the entire rugged Maine coast.",
    color: "#154360",
    accent: "#1A5276",
    highlights: ["Portland", "Bangor", "Augusta", "Kennebunkport", "Bar Harbor"],
  },
};

function groupCitiesAlphabetically(cities: CityData[]) {
  return cities.reduce((acc, city) => {
    const letter = city.name.charAt(0).toUpperCase();
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(city);
    return acc;
  }, {} as Record<string, CityData[]>);
}

export async function generateStaticParams() {
  return NEW_ENGLAND_STATES.map((s) => ({ code: s.code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const stateInfo = NEW_ENGLAND_STATES.find(
    (s) => s.code === code.toUpperCase()
  );
  if (!stateInfo) return {};
  const data = STATE_DATA[code.toUpperCase()];
  return {
    title: `Ice Cream Truck Rental in ${stateInfo.name} | American Legend`,
    description: `American Legend serves ${data?.cities.length ?? "hundreds of"} cities in ${stateInfo.name}. Premium ice cream truck catering for birthdays, corporate events, weddings, and more. Book now!`,
    openGraph: {
      title: `Ice Cream Truck Rental in ${stateInfo.name} | American Legend`,
      description: data?.description,
    },
  };
}

export default async function StateCitiesPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const upper = code.toUpperCase();
  const stateInfo = NEW_ENGLAND_STATES.find((s) => s.code === upper);
  if (!stateInfo) notFound();

  const data = STATE_DATA[upper];
  const grouped = groupCitiesAlphabetically(data.cities);
  const letters = Object.keys(grouped).sort();

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative pt-28 pb-24 md:pt-40 md:pb-40 overflow-hidden"
        style={{ backgroundColor: data.color }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4 opacity-20"
            style={{ backgroundColor: data.accent }}
          />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 bg-white/5" />
        </div>
        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <Link
            href="/cities"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium mb-8 transition-colors"
          >
            ← All New England States
          </Link>
          <div className="flex items-center gap-6 mb-6">
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center shrink-0 shadow-xl border border-white/10"
              style={{ backgroundColor: `${data.accent}33` }}
            >
              <span className="font-display italic font-light text-4xl md:text-5xl text-white">
                {stateInfo.code}
              </span>
            </div>
            <div>
              <h1 className="font-display italic font-light text-[clamp(2.5rem,5vw,5rem)] leading-tight text-white tracking-tight">
                {stateInfo.name}
              </h1>
              <p className="text-white/60 text-sm md:text-base font-medium mt-1">
                {data.cities.length} cities &amp; towns served
              </p>
            </div>
          </div>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
            {data.description}
          </p>
          {/* Highlight Cities */}
          <div className="flex flex-wrap gap-3">
            {data.highlights.map((city) => (
              <span
                key={city}
                className="px-4 py-2 rounded-full text-sm font-bold border border-white/20 text-white/80"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CITY GRID ── */}
      <section className="py-20 md:py-28" style={{ background: "#FFF4D6" }}>
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="space-y-12">
            {letters.map((letter) => (
              <div key={letter}>
                <div className="flex items-center gap-4 mb-5">
                  <span
                    className="font-display font-black text-2xl"
                    style={{ color: data.accent }}
                  >
                    {letter}
                  </span>
                  <div className="flex-1 h-px bg-navy/10" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                  {grouped[letter]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((city) => (
                      <Link
                        key={city.slug}
                        href={`/cities/${city.slug}`}
                        className="group flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-[#FFFDF8] border border-navy/5 hover:border-coral hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 shadow-sm"
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                          style={{
                            background: `${data.accent}22`,
                            color: data.accent,
                          }}
                        >
                          <MapPin size={11} />
                        </div>
                        <span className="font-sans font-semibold text-sm text-navy/80 group-hover:text-navy truncate flex-1">
                          {city.name}
                        </span>
                        <ChevronRight
                          size={13}
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

      {/* ── OTHER STATES ── */}
      <section className="py-16 bg-navy">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <h2 className="font-display italic font-light text-2xl text-cream mb-8 text-center">
            Explore Other New England States
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {NEW_ENGLAND_STATES.filter((s) => s.code !== upper).map((state) => (
              <Link
                key={state.code}
                href={`/cities/state/${state.code}`}
                className="group flex flex-col items-center gap-2 p-5 rounded-2xl border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all duration-300 text-center"
              >
                <span className="font-display italic font-light text-3xl text-white group-hover:text-cream transition-colors">
                  {state.code}
                </span>
                <span className="text-white/50 text-xs font-bold uppercase tracking-widest">
                  {state.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-[#FFF4D6]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display italic font-light text-3xl md:text-4xl text-navy mb-4">
            Don&apos;t see your city?
          </h2>
          <p className="text-navy/60 text-lg mb-8 max-w-xl mx-auto">
            We travel across all of {stateInfo.name} and beyond. Just reach out
            and we&apos;ll make it work.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-coral text-white font-bold rounded-full hover:bg-navy transition-all duration-300 shadow-xl shadow-coral/20"
          >
            Contact Us →
          </Link>
        </div>
      </section>
    </>
  );
}
