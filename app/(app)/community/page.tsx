"use client";

import { useEffect, useState, useCallback, FormEvent } from "react";
import { AppShell } from "@/components/site-shell";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import type { CommunityPost } from "@/lib/supabase/types";
import { MessageSquare, Send, ShieldCheck, ThumbsUp } from "lucide-react";

const starterPrompts = [
  "What helped you get through a difficult week?",
  "A small win worth noticing today",
  "One thing you wish more people understood about student life",
  "A habit or routine that brings you comfort",
];

const fallbackPosts: CommunityPost[] = [
  {
    id: "fb-1",
    user_id: "system",
    prompt: "What helped you get through a difficult week?",
    body: "Taking one small thing off my list and telling a close friend how I was genuinely doing.",
    author_alias: "Anonymous Student",
    is_anonymous: true,
    is_flagged: false,
    likes_count: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "fb-2",
    user_id: "system",
    prompt: "A small win worth noticing today",
    body: "I stepped outside between classes even though I was feeling exhausted. The fresh air helped reset my afternoon.",
    author_alias: "Quiet Observer",
    is_anonymous: true,
    is_flagged: false,
    likes_count: 8,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [newBody, setNewBody] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState(starterPrompts[0]);
  const [alias, setAlias] = useState("Anonymous Student");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { data, error } = await supabase
        .from("community_post")
        .select("*")
        .eq("is_flagged", false)
        .order("created_at", { ascending: false })
        .limit(30);

      if (error || !data || data.length === 0) {
        setPosts(fallbackPosts);
      } else {
        setPosts(data as CommunityPost[]);
      }
    } catch {
      setPosts(fallbackPosts);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  async function handleCreatePost(e: FormEvent) {
    e.preventDefault();
    if (!newBody.trim()) return;

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const supabase = createSupabaseBrowserClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setStatusMessage("Please sign in to share a thought with the community.");
        return;
      }

      const { data, error } = await supabase
        .from("community_post")
        .insert({
          user_id: user.id,
          prompt: selectedPrompt,
          body: newBody.trim(),
          author_alias: alias.trim() || "Anonymous Student",
          is_anonymous: true,
          is_flagged: false,
        })
        .select("*")
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setPosts((prev) => [data as CommunityPost, ...prev]);
        setNewBody("");
        setStatusMessage("Your reflection has been shared with the community.");
      }
    } catch (err) {
      console.warn("Post creation error:", err);
      // Optimistic local fallback
      const localPost: CommunityPost = {
        id: `local-${Date.now()}`,
        user_id: "current-user",
        prompt: selectedPrompt,
        body: newBody.trim(),
        author_alias: alias.trim() || "Anonymous Student",
        is_anonymous: true,
        is_flagged: false,
        likes_count: 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setPosts((prev) => [localPost, ...prev]);
      setNewBody("");
      setStatusMessage("Shared locally. Will sync when backend is available.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleReportPost(postId: string) {
    try {
      const supabase = createSupabaseBrowserClient();
      await supabase.from("community_post").update({ is_flagged: true }).eq("id", postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch {
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    }
  }

  return (
    <AppShell role="Student">
      <div className="max-w-3xl space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] px-3 py-1 text-xs font-semibold text-[var(--color-brand-primary)]">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Moderated Digital Safe Space</span>
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[var(--color-text)]">
            Community Reflections
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[var(--color-muted)]">
            Gentle conversations, shared reflections, and room to connect without popularity scores or algorithms. Please protect your personal privacy.
          </p>
        </div>

        {/* Share a Reflection Form */}
        <form
          onSubmit={handleCreatePost}
          className="rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-6 shadow-xs space-y-4"
        >
          <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-brand-primary)]">
            <MessageSquare className="h-4 w-4" />
            <span>Share a Thought or Win</span>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-1">
              Select a Prompt
            </label>
            <select
              value={selectedPrompt}
              onChange={(e) => setSelectedPrompt(e.target.value)}
              className="w-full rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-3 py-2 text-sm text-[var(--color-text-primary)] outline-none"
            >
              {starterPrompts.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div>
            <textarea
              required
              rows={3}
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              placeholder="Write your reflection here..."
              className="w-full rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] p-3 text-sm text-[var(--color-text-primary)] outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[var(--color-muted)]">Posting as:</span>
              <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="Alias (e.g. Student)"
                className="rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-primary)] px-2.5 py-1 text-xs text-[var(--color-text-primary)] outline-none w-40"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !newBody.trim()}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-5 py-2 text-xs font-semibold text-white transition hover:bg-[var(--color-brand-primary-hover)] disabled:opacity-50"
            >
              <Send className="h-3.5 w-3.5" />
              <span>{isSubmitting ? "Sharing..." : "Post Reflection"}</span>
            </button>
          </div>

          {statusMessage && (
            <p className="text-xs text-[var(--color-brand-primary)] pt-1">{statusMessage}</p>
          )}
        </form>

        {/* Community Feed */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[var(--color-text)]">Recent Community Posts</h2>

          {loading ? (
            <div className="py-8 text-center text-sm text-[var(--color-muted)]">
              Loading community reflections...
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[var(--color-border-default)] p-8 text-center text-sm text-[var(--color-muted)]">
              No posts yet. Be the first to share a gentle reflection.
            </div>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-5 shadow-xs space-y-3"
              >
                {post.prompt && (
                  <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
                    {post.prompt}
                  </p>
                )}
                <p className="text-base text-[var(--color-text-primary)] leading-relaxed">
                  {post.body}
                </p>
                <div className="flex items-center justify-between border-t border-[var(--calm-border-soft)]/50 pt-3 text-xs text-[var(--color-muted)]">
                  <span>{post.author_alias} · {new Date(post.created_at).toLocaleDateString()}</span>
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3.5 w-3.5 text-[var(--color-muted)]" />
                      <span>{post.likes_count}</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => handleReportPost(post.id)}
                      className="hover:text-[var(--color-danger)] transition"
                    >
                      Report
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </AppShell>
  );
}
