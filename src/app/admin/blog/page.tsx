"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, CheckCircle2, Clock, BookCheck, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/admin/blog?t=${Date.now()}`, { cache: "no-store" });
      const json = await res.json();
      if (json.success) setPosts(json.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin/blog/${deleteId}`, { method: "DELETE" });
      const json = await res.json();
      if (json.success) {
        setPosts(posts.filter(p => p.id !== deleteId));
      } else {
        alert(json.error || "Failed to delete post.");
      }
    } catch (e) {
      alert("Error deleting post.");
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    (p.author?.name && p.author.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <div>
          <h1 className="text-3xl font-black text-navy tracking-tight flex items-center gap-3">
            <BookCheck className="w-8 h-8 text-coral drop-shadow-sm" /> Blog & Stories
          </h1>
          <p className="text-sm font-semibold text-gray-400 mt-1 uppercase tracking-wider">Manage your website's articles and event stories</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search posts..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full sm:w-64 pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-sm font-semibold outline-none focus:border-coral focus:ring-4 focus:ring-coral/10 transition-all shadow-sm"
            />
          </div>
          <Link href="/admin/blog/new" className="flex items-center gap-2 px-5 py-3 bg-coral text-white rounded-xl text-sm font-black hover:bg-coral-dark shadow-[0_4px_15px_rgb(255,111,97,0.3)] transition-all hover:-translate-y-0.5 whitespace-nowrap">
            <Plus className="w-4 h-4" /> New Post
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        {loading ? (
          <div className="p-32 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-10 h-10 animate-spin text-coral" />
            <p className="text-sm font-black text-gray-400 uppercase tracking-wider">Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-32 flex flex-col items-center justify-center text-center bg-white/50 border-dashed border border-gray-100/50 m-6 rounded-3xl">
            <div className="w-20 h-20 bg-white rounded-3xl border border-gray-100 shadow-sm flex items-center justify-center mb-5">
              <BookCheck className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-black text-navy mb-1">No posts found</h3>
            <p className="text-sm font-medium text-gray-500 mb-6">You haven't written any blog posts or stories yet.</p>
            <Link href="/admin/blog/new" className="px-6 py-2.5 bg-navy text-white rounded-xl text-sm font-black shadow-md hover:bg-navy/90 transition-colors">
              Write your first post
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider w-[400px]">Post</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Author</th>
                  <th className="px-6 py-5 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-5 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 bg-white/50">
                {filteredPosts.map(post => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {post.featuredImage ? (
                          <div className="w-14 h-14 rounded-2xl relative overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100/50 shadow-inner group-hover:scale-105 transition-transform">
                            <Image src={post.featuredImage} alt={post.title} fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center flex-shrink-0 border border-gray-200/50 shadow-inner group-hover:scale-105 transition-transform">
                            <BookCheck className="w-6 h-6 text-gray-300" />
                          </div>
                        )}
                        <div>
                          <div className="text-base font-black text-navy line-clamp-1">{post.title}</div>
                          <div className="text-xs font-medium text-gray-500 mt-1 line-clamp-1">{post.excerpt || "No excerpt provided"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {post.status === "PUBLISHED" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 shadow-sm">
                          <CheckCircle2 className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider bg-amber-500/10 text-amber-600 border border-amber-500/20 shadow-sm">
                          <Clock className="w-3 h-3" /> Draft
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-black text-navy bg-white rounded-md shadow-sm border border-gray-100 my-4 inline-flex px-3 py-1.5 ml-6">
                      {post.author?.name || "Admin"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-bold text-gray-500 uppercase tracking-wider">
                      {new Date(post.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' }) }
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/admin/blog/${post.id}`} className="p-2.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-colors">
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button onClick={() => setDeleteId(post.id)} className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100">
            <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-5 mx-auto border border-red-100 shadow-inner">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-navy text-center mb-2">Delete Post?</h3>
            <p className="text-sm font-medium text-gray-500 text-center mb-6">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setDeleteId(null)}
                disabled={isDeleting}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-3 rounded-xl bg-red-500 text-white text-sm font-black hover:bg-red-600 shadow-md transition-all hover:-translate-y-0.5 flex items-center justify-center"
              >
                {isDeleting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
