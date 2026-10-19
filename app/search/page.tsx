"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Filter, ArrowRight, BookOpen, Calendar, Sparkles, User, FileText } from "lucide-react";
import { Footer, SiteHeader } from "@/components/site-shell";
import { performUnifiedSearch, SearchResultItem, SearchResultType } from "@/lib/data/search";

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [filterType, setFilterType] = useState<SearchResultType | "All">("All");
  const [results, setResults] = useState<SearchResultItem[]>([]);

  useEffect(() => {
    if (query.trim()) {
      setResults(performUnifiedSearch(query, filterType));
    } else {
      setResults([]);
    }
  }, [query, filterType]);

  function getIcon(type: SearchResultType) {
    switch (type) {
      case "Resource":
        return <BookOpen className="h-4 w-4 text-[var(--color-brand-primary)]" />;
      case "Event":
        return <Calendar className="h-4 w-4 text-[#8E4EE4]" />;
      case "Initiative":
        return <Sparkles className="h-4 w-4 text-[var(--calm-pink-blush)]" />;
      case "Team":
        return <User className="h-4 w-4 text-[var(--calm-purple-deep)]" />;
      case "Page":
      default:
        return <FileText className="h-4 w-4 text-[var(--color-text-tertiary)]" />;
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <SiteHeader />

      <main>
        {/* Header */}
        <section className="border-b border-[var(--calm-border-soft)] bg-gradient-to-b from-white via-[var(--calm-lavender-pale)]/50 to-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                <span>Unified Platform Search</span>
              </div>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-6xl leading-[1.1]">
                Find Resources, Events &amp; Support
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl">
                Search across all psycho-educational articles, campus initiatives, workshops, team biographies, and institutional support pages.
              </p>
            </div>
          </div>
        </section>

        {/* Search Bar & Results */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-xs space-y-4">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-[var(--calm-text-muted)]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type keywords (e.g. Colour the Chaos, counselling, sleep, Astha, Room 10)..."
                className="w-full rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] py-3.5 pl-12 pr-4 text-sm text-[var(--color-text-primary)] placeholder-[var(--calm-text-muted)] outline-none focus:border-[var(--color-brand-primary)] focus:bg-white transition"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 text-xs border-t border-[var(--calm-border-soft)] pt-3">
              <span className="font-bold uppercase tracking-wider text-[var(--calm-text-muted)] mr-2 flex items-center gap-1.5">
                <Filter className="h-3.5 w-3.5" />
                Filter by Type:
              </span>
              {(["All", "Resource", "Event", "Initiative", "Team", "Page"] as const).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`rounded-full px-3.5 py-1.5 font-medium transition ${
                    filterType === type
                      ? "bg-[var(--color-brand-primary)] text-white shadow-xs"
                      : "border border-[var(--calm-border-soft)] bg-white text-[var(--color-text-secondary)] hover:bg-[var(--calm-lavender-pale)]"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Results List */}
          <div className="mt-12 space-y-4">
            {query.trim() === "" ? (
              <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-12 text-center text-xs text-[var(--color-text-secondary)]">
                <Search className="mx-auto h-8 w-8 text-[var(--color-brand-primary)] mb-3" />
                <p className="font-semibold text-sm text-[var(--color-text-primary)]">
                  Enter a keyword above to begin searching.
                </p>
                <p className="mt-1">
                  You can search by initiative names, topic titles, team member names, or care pathways.
                </p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-4">
                <p className="text-xs font-semibold text-[var(--calm-text-muted)]">
                  Showing {results.length} result{results.length > 1 ? "s" : ""} for &ldquo;{query}&rdquo;:
                </p>
                {results.map((res) => (
                  <Link
                    key={res.id}
                    href={res.url}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-xs hover:border-[var(--color-brand-primary)] hover:shadow-md transition"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--calm-lavender-pale)]">
                        {getIcon(res.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
                            {res.type}
                          </span>
                          <span className="rounded-full bg-[var(--calm-white-warm)] border border-[var(--calm-border-soft)] px-2 py-0.5 text-[10px] font-medium text-[var(--calm-text-muted)]">
                            {res.category}
                          </span>
                        </div>
                        <h3 className="mt-1 text-base font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)] transition">
                          {res.title}
                        </h3>
                        <p className="mt-1 text-xs text-[var(--color-text-secondary)] line-clamp-2 leading-relaxed">
                          {res.snippet}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 sm:mt-0 flex items-center gap-1.5 text-xs font-bold text-[var(--color-brand-primary)] shrink-0 self-end sm:self-center">
                      <span>View</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-[var(--calm-border-soft)] bg-white p-12 text-center text-xs text-[var(--color-text-secondary)]">
                <p className="font-semibold text-sm text-[var(--color-text-primary)]">
                  No matching results found for &ldquo;{query}&rdquo;.
                </p>
                <p className="mt-1">
                  Try searching with broader terms or check our <Link href="/resources" className="text-[var(--color-brand-primary)] underline">Resource Library</Link>.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
          <SiteHeader />
          <div className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-semibold text-[var(--calm-text-muted)]">Loading search index...</p>
          </div>
          <Footer />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
