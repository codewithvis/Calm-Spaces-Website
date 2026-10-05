"use client";

import { useState } from "react";
import { BookOpenText, Clock3, Headphones, PlayCircle, Search, Video } from "lucide-react";
import { Footer, PageContainer, SectionHeading, SiteHeader } from "@/components/site-shell";

const resources = [
  { title: "Managing overwhelm", type: "Article", category: "Stress & overwhelm", icon: <BookOpenText className="h-5 w-5" />, summary: "A gentle framework for noticing when pressure is stacking up." },
  { title: "Calm breathing reset", type: "Audio", category: "Self-care", icon: <Headphones className="h-5 w-5" />, summary: "A short guided exercise built for moments of mental tension." },
  { title: "Mindful reset routine", type: "Video", category: "Emotional wellbeing", icon: <Video className="h-5 w-5" />, summary: "A practical resource to re-ground attention and bring the breath back online." },
  { title: "Restoring attention", type: "Article", category: "Academic pressure", icon: <Clock3 className="h-5 w-5" />, summary: "How to recover focus after a difficult stretch without self-judgment." },
];

export default function ResourcesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...new Set(resources.map((resource) => resource.category))];
  const filteredResources = resources.filter((resource) => `${resource.title} ${resource.summary} ${resource.category}`.toLowerCase().includes(query.toLowerCase()) && (category === "All" || resource.category === category));

  return <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]"><SiteHeader /><PageContainer><SectionHeading eyebrow="Explore" title="Things that might help." description="Find something useful today: a short read, a calming audio, or a gentle reset." /><div className="mb-8 space-y-4 border-y border-[var(--color-border-default)] py-5"><label className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]"><Search className="h-4 w-4" /><span className="sr-only">Search resources</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search resources" className="min-h-11 flex-1 bg-transparent text-base text-[var(--color-text-primary)] outline-none" /></label><div className="flex flex-wrap gap-2">{categories.map((item) => <button type="button" key={item} onClick={() => setCategory(item)} className={`min-h-10 rounded-full border px-3 py-2 text-xs ${category === item ? "border-[var(--color-brand-primary)] bg-[var(--color-mood-calm)] text-[var(--color-text-primary)]" : "border-[var(--color-border-default)] text-[var(--color-text-secondary)]"}`}>{item}</button>)}</div></div>{filteredResources.length ? <div className="grid gap-6 md:grid-cols-2">{filteredResources.map((resource) => <article key={resource.title} className="border-t border-[var(--color-border-default)] pt-5"><div className="mb-4 flex items-center justify-between"><div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">{resource.icon}{resource.type}</div><PlayCircle className="h-5 w-5 text-[var(--color-brand-primary)]" /></div><p className="text-xs text-[var(--color-text-tertiary)]">{resource.category}</p><h3 className="mt-2 text-2xl text-[var(--color-text-primary)]">{resource.title}</h3><p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">{resource.summary}</p></article>)}</div> : <div className="border border-dashed border-[var(--color-border-default)] p-10 text-center"><p className="text-xl text-[var(--color-text-primary)]">Nothing here yet.</p><p className="mt-2 text-sm text-[var(--color-text-secondary)]">Try another search or category.</p></div>}</PageContainer><Footer /></div>;
}
