"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Image as ImageIcon, Loader2 } from "lucide-react";

export default function NewBlogPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    seoTitle: "",
    seoDesc: "",
    status: "DRAFT",
    categoryId: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return alert("Title and Content are required.");
    
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (json.success) {
        router.push("/admin/blog");
      } else {
        alert(json.error || "Failed to create post.");
      }
    } catch (e) {
      alert("Error creating post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-navy">New Post</h1>
            <p className="text-sm font-medium text-gray-500 mt-1">Create a new blog post or story.</p>
          </div>
        </div>
        <button 
          onClick={handleSubmit} 
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 bg-coral text-white rounded-xl text-sm font-bold hover:bg-coral-dark transition-colors shadow-sm disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Post
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Post Title</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:bg-white focus:border-coral/50 focus:ring-2 focus:ring-coral/10 transition-all"
                placeholder="e.g. 5 Reasons to Hire an Ice Cream Truck..."
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Excerpt (Short Description)</label>
              <textarea 
                value={formData.excerpt}
                onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:bg-white focus:border-coral/50 focus:ring-2 focus:ring-coral/10 transition-all h-24 resize-none"
                placeholder="A brief summary of the post..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Content (Markdown / HTML)</label>
              <textarea 
                value={formData.content}
                onChange={e => setFormData({ ...formData, content: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium outline-none focus:bg-white focus:border-coral/50 focus:ring-2 focus:ring-coral/10 transition-all min-h-[400px]"
                placeholder="Write your story here..."
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-navy border-b border-gray-100 pb-3">Publishing</h3>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 outline-none focus:border-coral/50"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-navy border-b border-gray-100 pb-3">Featured Image</h3>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Image URL</label>
              <div className="relative">
                <ImageIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="url" 
                  value={formData.featuredImage}
                  onChange={e => setFormData({ ...formData, featuredImage: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium outline-none focus:bg-white focus:border-coral/50 focus:ring-2 focus:ring-coral/10 transition-all"
                  placeholder="https://..."
                />
              </div>
            </div>
            {formData.featuredImage && (
              <div className="mt-4 rounded-xl overflow-hidden border border-gray-200 h-40 relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={formData.featuredImage} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">
            <h3 className="font-bold text-navy border-b border-gray-100 pb-3">SEO Optimizations</h3>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">SEO Title</label>
              <input 
                type="text" 
                value={formData.seoTitle}
                onChange={e => setFormData({ ...formData, seoTitle: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium outline-none focus:border-coral/50 focus:ring-2 focus:ring-coral/10 transition-all"
                placeholder="Leave blank to use post title"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">SEO Description</label>
              <textarea 
                value={formData.seoDesc}
                onChange={e => setFormData({ ...formData, seoDesc: e.target.value })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium outline-none focus:border-coral/50 focus:ring-2 focus:ring-coral/10 transition-all h-20 resize-none"
                placeholder="Meta description for Google..."
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
