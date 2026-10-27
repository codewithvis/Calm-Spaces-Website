"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  Trash2,
  Plus,
  Heart,
  Calendar,
  AlertTriangle,
  RefreshCw,
  Send,
  X,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

interface CommunityPostRecord {
  id: string;
  prompt: string | null;
  body: string;
  author_alias?: string | null;
  likes_count?: number | null;
  created_at: string;
  user_id?: string | null;
}

export function AdminCommunityManagement() {
  const [posts, setPosts] = useState<CommunityPostRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newPrompt, setNewPrompt] = useState("");
  const [newBody, setNewBody] = useState("");
  const [authorAlias, setAuthorAlias] = useState("CEAPS Faculty Desk");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase
        .from("community_post")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.warn("[Admin Community] Error loading posts:", error.message);
      }
      if (data) {
        setPosts(data as CommunityPostRecord[]);
      }
    } catch (err) {
      console.error("[Admin Community] Exception loading posts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();

    const supabase = createSupabaseBrowserClient();
    const channel = supabase
      .channel("admin_community_realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "community_post" },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchPosts]);

  async function handleCreatePostSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newBody.trim()) return;

    setSubmitting(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase.from("community_post").insert([
        {
          user_id: user?.id,
          prompt: newPrompt.trim() || "Campus Mindfulness Reflection",
          body: newBody.trim(),
          author_alias: authorAlias.trim() || "CEAPS Team",
          likes_count: 0,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) throw error;

      setIsCreatingPost(false);
      setNewPrompt("");
      setNewBody("");
      fetchPosts();
    } catch (err: any) {
      alert("Failed to publish post: " + (err.message || "Unknown error"));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDeletePost(id: string) {
    if (!confirm("Are you sure you want to permanently delete this post?")) return;

    setDeletingId(id);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.from("community_post").delete().eq("id", id);
      if (error) throw error;
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      alert("Failed to delete post: " + err.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[var(--calm-border-soft)] bg-white p-4 sm:flex-row sm:items-center sm:justify-between shadow-xs">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)] font-[family-name:var(--font-display)]">
            Campus Reflection Wall Moderation
          </h2>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Live student and faculty reflections from Android and Web.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => fetchPosts()}
            disabled={loading}
            aria-label="Refresh community posts"
            className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--calm-border-soft)] bg-white px-3 py-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-slate-50 transition shadow-xs"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin text-[var(--color-brand-primary)]" : ""}`} />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => setIsCreatingPost(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-brand-primary)] px-4 py-2 text-xs font-bold text-white shadow-xs hover:opacity-95 transition"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Create Campus Prompt</span>
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loading && posts.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-[var(--calm-border-soft)] bg-white p-12 text-center text-sm text-[var(--color-text-secondary)] shadow-xs">
            <RefreshCw className="mx-auto h-6 w-6 animate-spin text-[var(--color-brand-primary)] mb-2" />
            Loading campus reflections...
          </div>
        ) : posts.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-[var(--calm-border-soft)] bg-white p-12 text-center text-sm text-[var(--color-text-secondary)] shadow-xs">
            <MessageSquare className="mx-auto h-8 w-8 text-[var(--calm-text-muted)] mb-2" />
            No community posts recorded yet. Create the first reflection prompt above!
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col justify-between rounded-2xl border border-[var(--calm-border-soft)] bg-white p-5 shadow-xs hover:shadow-md transition"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--calm-lavender-pale)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
                    <Sparkles className="h-2.5 w-2.5" />
                    <span>{post.prompt || "Reflection"}</span>
                  </span>
                  <button
                    onClick={() => handleDeletePost(post.id)}
                    disabled={deletingId === post.id}
                    title="Delete post"
                    aria-label="Delete this post"
                    className="rounded-lg p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-[var(--color-text-primary)] leading-relaxed whitespace-pre-wrap">
                  {post.body}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[var(--calm-border-soft)] flex items-center justify-between text-[11px] text-[var(--calm-text-muted)]">
                <span className="font-medium text-[var(--color-text-secondary)]">
                  by {post.author_alias || "Anonymous"}
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3 text-rose-500 fill-rose-500/20" />
                    <span>{post.likes_count || 0}</span>
                  </span>
                  <span>{new Date(post.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Post Modal */}
      {isCreatingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-[var(--calm-border-soft)] pb-4">
              <h3 className="font-bold text-[var(--color-text-primary)]">Create Campus Prompt / Reflection</h3>
              <button
                onClick={() => setIsCreatingPost(false)}
                className="rounded-lg p-1 text-[var(--calm-text-muted)] hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePostSubmit} className="space-y-4 my-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">
                  Topic / Prompt Title
                </label>
                <input
                  type="text"
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  placeholder="e.g. Midterms Grounding & Breath"
                  className="w-full rounded-xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] px-3 py-2 text-xs sm:text-sm focus:border-[var(--color-brand-primary)] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">
                  Reflection Content
                </label>
                <textarea
                  rows={4}
                  required
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  placeholder="Share a calming message, mindfulness question, or departmental support update..."
                  className="w-full rounded-xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-3 text-xs sm:text-sm focus:border-[var(--color-brand-primary)] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)] mb-1">
                  Display Alias
                </label>
                <input
                  type="text"
                  value={authorAlias}
                  onChange={(e) => setAuthorAlias(e.target.value)}
                  placeholder="CEAPS Faculty Desk"
                  className="w-full rounded-xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] px-3 py-2 text-xs sm:text-sm focus:border-[var(--color-brand-primary)] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--calm-border-soft)]">
                <button
                  type="button"
                  onClick={() => setIsCreatingPost(false)}
                  className="rounded-xl border border-[var(--calm-border-soft)] px-4 py-2 text-xs font-semibold text-[var(--color-text-secondary)] hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !newBody.trim()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-brand-primary)] px-4 py-2 text-xs font-bold text-white shadow-xs hover:opacity-95 disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Publishing...</span>
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      <span>Publish Prompt</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
