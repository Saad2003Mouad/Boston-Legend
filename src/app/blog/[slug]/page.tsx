import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Metadata } from "next";
import MeltingDrip from "@/components/shared/MeltingDrip";
import FinalCTA from "@/components/home/FinalCTA";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  let post: any = null;
  try {
    post = await prisma.post.findUnique({ where: { slug } });
  } catch {}
  
  if (!post || post.status !== "PUBLISHED" || post.deletedAt) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.seoTitle || post.title} | American Legend Ice Cream Truck`,
    description: post.seoDesc || post.excerpt || "",
    openGraph: {
      images: post.featuredImage ? [post.featuredImage] : [],
    }
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let post: any = null;
  try {
    post = await prisma.post.findUnique({
      where: { slug },
      include: { category: true, author: true }
    });
  } catch (err) {
    console.error("[Blog] Failed to fetch post:", err);
  }

  if (!post || post.status !== "PUBLISHED" || post.deletedAt) {
    notFound();
  }

  return (
    <div className="bg-[#FFFDF8] min-h-screen">
      {/* Hero Header */}
      <div className="relative bg-[#FFF4D6] pt-32 pb-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {post.category && (
            <Link href="/blog" className="inline-block mb-6 bg-white text-navy px-5 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-sm hover:shadow-md transition-all">
              {post.category.name}
            </Link>
          )}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-navy leading-[1.1] mb-8 tracking-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-center gap-4 text-sm font-bold text-navy/60 uppercase tracking-wider">
            <span className="text-coral">{post.author?.name || "American Legend Ice Cream Truck"}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-navy/20"></span>
            <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}</span>
          </div>
        </div>
      </div>
      
      {/* Melting Drip Transition */}
      <MeltingDrip color="#FFF4D6" height={80} />

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="max-w-5xl mx-auto px-6 -mt-8 mb-16 relative z-10">
          <div className="aspect-[21/9] md:aspect-[2.5/1] rounded-[2rem] overflow-hidden shadow-2xl relative bg-gray-100 ring-4 ring-white">
            <Image 
              src={post.featuredImage} 
              alt={post.title} 
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
              priority
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pb-20">
        <article className="prose prose-lg md:prose-xl prose-headings:font-black prose-headings:text-navy prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:tracking-tight prose-p:text-navy/80 prose-p:leading-relaxed prose-a:text-coral prose-a:font-bold prose-a:underline-offset-4 hover:prose-a:text-navy transition-colors prose-img:rounded-3xl prose-img:shadow-lg prose-ul:text-navy/80 prose-li:marker:text-coral mx-auto">
          <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>{post.content}</ReactMarkdown>
        </article>

        <div className="mt-20 pt-10 border-t-2 border-navy/5 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/blog" className="group flex items-center gap-3 text-navy font-black uppercase tracking-widest text-sm hover:text-coral transition-colors">
            <span className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center group-hover:bg-coral/10 transition-colors">
              ←
            </span>
            Back to Articles
          </Link>
          
          <div className="flex gap-4">
            <Link href="/book" className="px-8 py-3 rounded-full bg-coral text-white font-black text-sm uppercase tracking-widest hover:bg-navy transition-colors shadow-md hover:shadow-xl transform hover:-translate-y-1">
              Book Our Truck
            </Link>
          </div>
        </div>
      </div>

      <FinalCTA themeColor="#C9232D" topColor="#FFFDF8" />
    </div>
  );
}
