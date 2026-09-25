import { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { constructMetadata } from "@/lib/seo";
import MultiStepQuoteForm from "@/components/quote/MultiStepQuoteForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Logo from "@/components/shared/Logo";

import prisma from "@/lib/prisma";

export const metadata: Metadata = constructMetadata({
  title: "Book Your Event | American Legend Ice Cream Truck",
  description: "Book your ice cream truck or van experience for any event in New England. Easy online booking in just a few steps.",
  url: "/book",
});

function BookingLoading() {
  return (
    <div className="w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-12 flex items-center justify-center min-h-[600px]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-coral border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500 font-medium">Loading your booking form...</p>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ package?: string }>;
}) {
  const params = await searchParams;
  if (!params.package) {
    redirect("/packages");
  }
  let dbPackages: any[] = [];
  try {
    const timeout = new Promise<any[]>((_, reject) =>
      setTimeout(() => reject(new Error("DB timeout")), 15000)
    );
    dbPackages = await Promise.race([
      prisma.package.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      }),
      timeout,
    ]);
  } catch (err) {
    console.error("[Book] Failed to fetch packages (using static fallback):", err);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-sand/30 to-cream flex flex-col relative pb-24 md:pb-0">
      {/* Distraction-free header */}
      <header className="w-full py-4 px-4 md:px-8 border-b border-navy/5 flex items-center justify-between bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <Link
          href="/packages"
          className="inline-flex items-center text-navy font-bold hover:text-coral transition-colors gap-1.5 text-sm sm:text-base"
        >
          <ArrowLeft size={16} />
          <span>Packages</span>
        </Link>
        <Link href="/" className="flex flex-col items-center justify-center text-center">
          <div className="text-xl md:text-3xl font-black text-navy leading-none font-display italic">American Legend</div>
          <div className="text-[10px] md:text-sm font-bold text-coral tracking-widest uppercase mt-0.5 md:mt-1.5">Book Your Event</div>
        </Link>
        <div className="flex items-center gap-1.5 text-xs md:text-sm text-gray-500 font-medium">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="hidden sm:inline">Secure Booking</span>
          <span className="sm:hidden text-[11px] text-green-700 font-semibold">Secure</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center py-6 sm:py-12 px-3 sm:px-6 md:px-8">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-6 sm:mb-10">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-navy mb-2 sm:mb-3">
              Book Your <span className="text-coral">Sweet</span> Experience
            </h1>
            <p className="text-gray-500 text-sm sm:text-lg max-w-xl mx-auto font-medium px-2">
              Fill out this quick form to check availability and get a customized quote for your celebration.
            </p>
          </div>

          <Suspense fallback={<BookingLoading />}>
            <MultiStepQuoteForm dbPackages={dbPackages} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
