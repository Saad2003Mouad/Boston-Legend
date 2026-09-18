import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Our Stories | Boston Legend Ice Cream Truck Boston",
  description: "Real events. Real smiles. Explore stories from birthday parties, corporate events, weddings, and more across Greater Boston with Boston Legend Ice Cream Truck.",
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  "Birthday Parties":   { bg: "bg-pink-50",   text: "text-pink-700",   dot: "bg-pink-400" },
  "Corporate Events":   { bg: "bg-blue-50",   text: "text-blue-700",   dot: "bg-blue-400" },
  "Weddings":           { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-400" },
  "Community Events":   { bg: "bg-green-50",  text: "text-green-700",  dot: "bg-green-400" },
};

function getCategoryStyle(name?: string | null) {
  if (!name) return { bg: "bg-coral/10", text: "text-coral", dot: "bg-coral" };
  return CATEGORY_COLORS[name] || { bg: "bg-coral/10", text: "text-coral", dot: "bg-coral" };
}

export default async function BlogPage() {
  let posts: any[] = [];
  try {
    posts = await prisma.post.findMany({
      where: { status: "PUBLISHED", deletedAt: null },
      orderBy: { publishedAt: "desc" },
      include: { category: true },
    });
  } catch (err) {
    console.error("[Blog] Failed to fetch posts:", err);
  }

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen bg-transparent">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-transparent pt-32 pb-20 px-6">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-10 left-20 w-64 h-64 rounded-full bg-navy blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 rounded-full bg-coral blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-navy/5 backdrop-blur-sm border border-navy/10 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
            <span className="text-navy/80 text-sm font-semibold tracking-wide uppercase">Real Stories</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-navy mb-6 leading-tight">
            Moments That
            <span className="text-coral"> Matter</span>
          </h1>
          <p className="text-xl text-navy/70 max-w-2xl mx-auto leading-relaxed font-medium">
            From backyard birthday parties to corporate summits and wedding receptions — 
            real events, real smiles, all across Greater Boston.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {posts.length === 0 ? (
          <div className="text-center py-32">
            <div className="text-6xl mb-4">🍦</div>
            <h2 className="text-2xl font-black text-navy mb-2">Stories Coming Soon</h2>
            <p className="text-gray-500">We're out making memories — check back shortly!</p>
          </div>
        ) : (
          <>
            {/* ── Featured Post ── */}
            {featured && (
              <div className="mb-16">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-0.5 bg-coral" />
                  <span className="text-coral font-bold text-sm uppercase tracking-widest">Featured Story</span>
                </div>
                <Link href={`/blog/${featured.slug}`} className="group block">
                  <div className="grid md:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                    {/* Image */}
                    <div className="aspect-[4/3] md:aspect-auto relative overflow-hidden bg-gray-100">
                      {featured.featuredImage ? (
                        <img
                          src={featured.featuredImage}
                          alt={featured.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-gradient-to-br from-coral/20 to-navy/20">
                          <span className="text-6xl">🍦</span>
                        </div>
                      )}
                      {featured.category && (() => {
                        const style = getCategoryStyle(featured.category.name);
                        return (
                          <div className="absolute top-5 left-5">
                            <span className={`inline-flex items-center gap-1.5 ${style.bg} ${style.text} px-3 py-1.5 rounded-full text-xs font-bold shadow-sm`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                              {featured.category.name}
                            </span>
                          </div>
                        );
                      })()}
                    </div>
                    {/* Content */}
                    <div className="p-10 flex flex-col justify-center">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                        {featured.publishedAt
                          ? new Date(featured.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                          : ""}
                      </div>
                      <h2 className="text-3xl md:text-4xl font-black text-navy mb-4 leading-tight group-hover:text-coral transition-colors duration-300">
                        {featured.title}
                      </h2>
                      {featured.excerpt && (
                        <p className="text-gray-500 leading-relaxed mb-8 text-base line-clamp-3">
                          {featured.excerpt}
                        </p>
                      )}
                      <div className="inline-flex items-center gap-2 text-coral font-black text-sm group-hover:gap-4 transition-all duration-300">
                        Read Full Story
                        <span className="text-lg">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* ── Category Filter Labels ── */}
            {rest.length > 0 && (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-8 h-0.5 bg-coral" />
                  <span className="text-coral font-bold text-sm uppercase tracking-widest">All Stories</span>
                </div>

                {/* ── Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rest.map((post) => {
                    const style = getCategoryStyle(post.category?.name);
                    return (
                      <Link
                        key={post.id}
                        href={`/blog/${post.slug}`}
                        className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                      >
                        {/* Thumbnail */}
                        <div className="aspect-[16/9] relative overflow-hidden bg-gray-100">
                          {post.featuredImage ? (
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-coral/10 to-navy/10">
                              <span className="text-4xl opacity-50">🍦</span>
                            </div>
                          )}
                          {post.category && (
                            <div className="absolute top-3 left-3">
                              <span className={`inline-flex items-center gap-1.5 ${style.bg} ${style.text} px-2.5 py-1 rounded-full text-[11px] font-bold shadow-sm`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
                                {post.category.name}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-1 p-6">
                          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                              : ""}
                          </div>
                          <h3 className="text-lg font-black text-navy mb-3 leading-snug group-hover:text-coral transition-colors duration-200 line-clamp-2">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-4">
                              {post.excerpt}
                            </p>
                          )}
                          <div className="flex items-center gap-1.5 text-coral font-bold text-sm mt-auto group-hover:gap-3 transition-all duration-200">
                            Read Story <span>→</span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </div>

      {/* ── CTA ── */}
      <section className="bg-navy mt-8 py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
          Ready to Create Your Own Story?
        </h2>
        <p className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
          Book Boston Legend Ice Cream Truck for your next birthday, corporate event, or wedding and let us bring the joy.
        </p>
        <Link
          href="/book"
          className="inline-flex items-center gap-2 bg-coral text-white px-8 py-4 rounded-full font-black text-lg hover:bg-coral/90 transition-colors shadow-lg shadow-coral/30"
        >
          Book Your Event →
        </Link>
      </section>
    </div>
  );
}
