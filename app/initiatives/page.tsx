"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Sparkles, Filter, Calendar, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { Footer, SiteHeader } from "@/components/site-shell";
import { Initiative } from "@/lib/data/initiatives";
import { useInitiatives } from "@/lib/hooks/useData";

export default function InitiativesPage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPillar, setSelectedPillar] = useState<string>("All");

  const { initiatives } = useInitiatives();

  const categories = [
    "All",
    "Expressive Arts",
    "Peer Connection",
    "Mindfulness & Movement",
    "Academic Resilience",
    "Awareness Campaigns",
  ];

  const pillars = ["All", "Cultivating", "Awareness", "Lightness", "Movement"];

  const filtered = initiatives.filter((init) => {
    const matchesQuery =
      query.trim() === "" ||
      init.title.toLowerCase().includes(query.toLowerCase()) ||
      init.description.toLowerCase().includes(query.toLowerCase()) ||
      init.highlights.some((h) => h.toLowerCase().includes(query.toLowerCase()));

    const matchesCat = selectedCategory === "All" || init.category === selectedCategory;
    const matchesPillar =
      selectedPillar === "All" ||
      (init.pillars as string[]).includes(selectedPillar);

    return matchesQuery && matchesCat && matchesPillar;
  });

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <SiteHeader />

      <main>
        {/* Header */}
        <section className="border-b border-[var(--calm-border-soft)] bg-gradient-to-b from-white via-[var(--calm-lavender-pale)]/50 to-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                <span>Living Campus Programs</span>
              </div>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-6xl leading-[1.1]">
                Initiatives That Breathe Life Into Well-being.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl">
                Explore our ongoing campaigns, expressive art spaces, peer listening circles, and somatic movement sessions hosted across SGT University.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Controls Bar */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-xs space-y-5">
            {/* Search Input */}
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-[var(--calm-text-muted)]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search initiatives by title, keywords, or topics..."
                className="w-full rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] py-3.5 pl-12 pr-4 text-sm text-[var(--color-text-primary)] placeholder-[var(--calm-text-muted)] outline-none focus:border-[var(--color-brand-primary)] focus:bg-white transition"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold uppercase tracking-wider text-[var(--calm-text-muted)] mr-2 flex items-center gap-1.5">
                <Filter className="h-3.5 w-3.5" />
                Category:
              </span>
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-3.5 py-1.5 font-medium transition ${
                    selectedCategory === cat
                      ? "bg-[var(--color-brand-primary)] text-white shadow-xs"
                      : "border border-[var(--calm-border-soft)] bg-white text-[var(--color-text-secondary)] hover:bg-[var(--calm-lavender-pale)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Pillar Filter */}
            <div className="flex flex-wrap items-center gap-2 text-xs border-t border-[var(--calm-border-soft)] pt-4">
              <span className="font-bold uppercase tracking-wider text-[var(--calm-text-muted)] mr-2 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                Pillar:
              </span>
              {pillars.map((pillar) => (
                <button
                  type="button"
                  key={pillar}
                  onClick={() => setSelectedPillar(pillar)}
                  className={`rounded-full px-3 py-1 font-medium transition ${
                    selectedPillar === pillar
                      ? "bg-[var(--calm-purple-deep)] text-white shadow-xs"
                      : "border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] text-[var(--color-text-secondary)] hover:bg-white"
                  }`}
                >
                  {pillar}
                </button>
              ))}
            </div>
          </div>

          {/* Initiatives Directory Grid */}
          <div className="mt-12 space-y-10">
            {filtered.length > 0 ? (
              filtered.map((init) => (
                <article
                  key={init.id}
                  id={init.slug}
                  className="overflow-hidden rounded-3xl border border-[var(--calm-border-soft)] bg-white shadow-xs hover:border-[var(--color-brand-primary)] hover:shadow-md transition duration-300"
                >
                  <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:items-start">
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[var(--calm-lavender-pale)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
                          {init.category}
                        </span>
                        <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-[11px] font-semibold text-green-700">
                          {init.status}
                        </span>
                        <span className="text-xs text-[var(--calm-text-muted)] font-medium">
                          {init.departmentAffiliation}
                        </span>
                      </div>

                      <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
                        {init.title}
                      </h2>

                      <p className="text-sm font-semibold italic text-[var(--color-brand-primary)]">
                        {init.tagline}
                      </p>

                      <p className="text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
                        {init.fullDescription}
                      </p>

                      {/* Highlights */}
                      <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-4 sm:p-5">
                        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] mb-2.5">
                          Program Highlights:
                        </p>
                        <div className="grid gap-2 sm:grid-cols-2 text-xs text-[var(--color-text-secondary)]">
                          {init.highlights.map((h, i) => (
                            <div key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-brand-primary)] mt-0.5" />
                              <span>{h}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right schedule & action card */}
                    <div className="lg:col-span-4 rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)]/50 p-6 space-y-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--calm-text-muted)]">
                          C.A.L.M Pillars
                        </span>
                        <div className="mt-1.5 flex flex-wrap gap-1">
                          {init.pillars.map((p) => (
                            <span
                              key={p}
                              className="rounded-md bg-white border border-[var(--calm-border-soft)] px-2.5 py-1 text-xs font-bold text-[var(--color-brand-primary)]"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2 text-xs border-t border-[var(--calm-border-soft)] pt-3">
                        <div className="flex items-start gap-2 text-[var(--color-text-primary)]">
                          <Calendar className="h-4 w-4 shrink-0 text-[var(--color-brand-primary)] mt-0.5" />
                          <div>
                            <p className="font-bold">Schedule:</p>
                            <p className="text-[var(--color-text-secondary)]">{init.schedule}</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2 text-[var(--color-text-primary)]">
                          <MapPin className="h-4 w-4 shrink-0 text-[var(--color-brand-primary)] mt-0.5" />
                          <div>
                            <p className="font-bold">Location:</p>
                            <p className="text-[var(--color-text-secondary)]">{init.location}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Link
                          href="/events"
                          className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[var(--color-brand-primary-hover)] transition"
                        >
                          <span>Check Workshop Dates</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-3xl border border-dashed border-[var(--calm-border-soft)] p-12 text-center bg-white">
                <Sparkles className="mx-auto h-8 w-8 text-[var(--color-brand-primary)]" />
                <h3 className="mt-4 text-lg font-bold text-[var(--color-text-primary)]">
                  No initiatives found matching your filters.
                </h3>
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                  Try clearing your search query or selecting &ldquo;All&rdquo; categories.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setSelectedCategory("All");
                    setSelectedPillar("All");
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-5 py-2 text-xs font-semibold text-white"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
