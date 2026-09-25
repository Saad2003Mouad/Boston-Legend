"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";

export default function BlogSection({ posts = [] }: { posts?: any[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "#FFF4D6" }} id="blog">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-coral/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-mint/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-coral font-bold tracking-wider uppercase text-sm mb-3">Our Stories</h2>
            <h3 className="font-display font-black text-4xl md:text-5xl text-navy mb-6">
              Real Events. <span className="text-coral italic font-light">Real Smiles.</span>
            </h3>
            <p className="text-lg text-gray-500">
              Don't just take our word for it. Explore our recent events and see the joy we bring to celebrations across New England.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="group bg-[#FFFDF8]/60 backdrop-blur-md rounded-3xl border border-gray-100 shadow-xl shadow-navy/5 overflow-hidden hover:shadow-2xl hover:shadow-coral/10 hover:border-coral/20 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={post.featuredImage || "/images/blog/68f61f1bb2531f6cb5a40346_corporate_party_with_ice_cream_truck.jpg"}
                  alt={`${post.title} - American Legend Ice Cream Truck New England Blog`}
                  title={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-4 left-4 bg-[#FFFDF8]/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-navy shadow-sm">
                  {post.category?.name || "Event"}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> 
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-navy mb-3 line-clamp-2 group-hover:text-coral transition-colors">
                  {post.title}
                </h4>
                <p className="text-gray-500 text-sm mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>
                <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-bold text-navy group-hover:text-coral transition-colors mt-auto">
                  Read Full Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


