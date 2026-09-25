import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Metadata } from "next";

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
    <div className="bg-transparent min-h-screen pt-24 pb-20">
      {/* Hero Header */}
      <div className="max-w-4xl mx-auto px-6 mb-12 text-center pt-8">
        {post.category && (
          <Link href="/blog" className="inline-block mb-6 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-blue-100 transition-colors">
            {post.category.name}
          </Link>
        )}
        <h1 className="text-4xl md:text-6xl font-black text-navy leading-tight mb-6">
          {post.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-sm font-bold text-gray-500">
          <span className="text-coral">{post.author?.name || "American Legend Ice Cream Truck"}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
          <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}</span>
        </div>
      </div>

      {/* Featured Image */}
      {post.featuredImage && (
        <div className="max-w-5xl mx-auto px-6 mb-16">
          <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl relative bg-gray-100">
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
      <div className="max-w-3xl mx-auto px-6">
        <article className="prose prose-lg md:prose-xl prose-headings:font-black prose-headings:text-navy prose-p:text-gray-600 prose-a:text-coral prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl mx-auto">
          <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>{post.content}</ReactMarkdown>
        </article>

        <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
          <Link href="/blog" className="text-coral font-bold flex items-center gap-2 hover:-translate-x-1 transition-transform">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
