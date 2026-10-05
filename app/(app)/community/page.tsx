"use client";

import { useState } from "react";
import { AppShell } from "@/components/site-shell";

const starterPosts = [
  { id: 1, prompt: "What helped you get through a difficult week?", author: "Anonymous member", body: "Taking one small thing off my list and telling someone how I was doing." },
  { id: 2, prompt: "A small win worth noticing", author: "Anonymous member", body: "I went outside between classes even though I did not feel like it. It helped more than I expected." },
];

export default function CommunityPage() {
  const [hiddenPosts, setHiddenPosts] = useState<number[]>([]);
  const [reportedPosts, setReportedPosts] = useState<number[]>([]);

  return <AppShell role="Student"><div className="max-w-3xl space-y-8"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">Community</p><h2 className="mt-3 text-4xl text-[var(--color-text)]">A space to connect.</h2><p className="mt-4 text-base leading-7 text-[var(--color-muted)]">Thoughtful conversations, gentle prompts, and room to share without popularity scores. Please protect your privacy and remember this is not emergency care.</p></div><div className="space-y-5">{starterPosts.filter((post) => !hiddenPosts.includes(post.id)).map((post) => <article key={post.id} className="border-t border-[var(--color-border-default)] pt-5"><p className="text-sm text-[var(--color-sage-strong)]">{post.prompt}</p><p className="mt-3 text-xl text-[var(--color-text)]">{post.body}</p><p className="mt-3 text-xs text-[var(--color-muted)]">{post.author}</p><div className="mt-4 flex flex-wrap gap-4 text-xs text-[var(--color-muted)]"><button type="button" onClick={() => setHiddenPosts((current) => [...current, post.id])} className="underline underline-offset-4">Block</button><button type="button" onClick={() => setReportedPosts((current) => current.includes(post.id) ? current : [...current, post.id])} className="underline underline-offset-4">{reportedPosts.includes(post.id) ? "Reported" : "Report"}</button></div></article>)}</div></div></AppShell>;
}
