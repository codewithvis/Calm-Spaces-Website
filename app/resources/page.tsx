"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BookOpenText,
  Search,
  Filter,
  Bookmark,
  Clock,
  User,
  Sparkles,
  Headphones,
  Video,
  FileText,
  CheckCircle2,
  X,
  Share2,
} from "lucide-react";
import { Footer, SiteHeader } from "@/components/site-shell";
import {
  ResourceItem,
  getBookmarkedResourceIds,
  toggleResourceBookmark,
} from "@/lib/data/resources";
import { useResources } from "@/lib/hooks/useData";

export default function ResourcesPage() {
  const { resources } = useResources();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [showBookmarksOnly, setShowBookmarksOnly] = useState(false);
  const [activeReadingItem, setActiveReadingItem] = useState<ResourceItem | null>(null);

  useEffect(() => {
    setBookmarkedIds(getBookmarkedResourceIds());
  }, []);

  const categories = [
    "All",
    "Stress Management",
    "Mindfulness & Grounding",
    "Emotional Intelligence",
    "Student Well-being",
    "Academic Resilience",
  ];

  const types = ["All", "Article", "Guide", "Audio Reset", "Video", "Downloadable PDF"];

  function handleBookmarkToggle(id: string) {
    const isNowBookmarked = toggleResourceBookmark(id);
    if (isNowBookmarked) {
      setBookmarkedIds([...bookmarkedIds, id]);
    } else {
      setBookmarkedIds(bookmarkedIds.filter((bId) => bId !== id));
    }
  }

  const filtered = resources.filter((res) => {
    const matchesQuery =
      query.trim() === "" ||
      res.title.toLowerCase().includes(query.toLowerCase()) ||
      res.summary.toLowerCase().includes(query.toLowerCase()) ||
      res.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
      res.author.toLowerCase().includes(query.toLowerCase());

    const matchesCat = selectedCategory === "All" || res.category === selectedCategory;
    const matchesType = selectedType === "All" || res.type === selectedType;
    const matchesBookmark = showBookmarksOnly ? bookmarkedIds.includes(res.id) : true;

    return matchesQuery && matchesCat && matchesType && matchesBookmark;
  });

  function getTypeIcon(type: ResourceItem["type"]) {
    switch (type) {
      case "Audio Reset":
        return <Headphones className="h-4 w-4" />;
      case "Video":
        return <Video className="h-4 w-4" />;
      case "Downloadable PDF":
        return <FileText className="h-4 w-4" />;
      case "Article":
      case "Guide":
      default:
        return <BookOpenText className="h-4 w-4" />;
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
                <span>Psycho-Educational Resource Center</span>
              </div>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-6xl leading-[1.1]">
                Evidence-Grounded Insights for Your Well-being.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl">
                Curated by CEAPS psychologists and counselors. Explore practical reading guides, vagal breathing resets, and campus mental health handbooks.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-xs space-y-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-3.5 h-4 w-4 text-[var(--calm-text-muted)]" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles, vagus resets, sleep guides, anxiety toolkits..."
                  className="w-full rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] py-3 pl-11 pr-4 text-xs text-[var(--color-text-primary)] placeholder-[var(--calm-text-muted)] outline-none focus:border-[var(--color-brand-primary)] focus:bg-white transition"
                />
              </div>

              {/* Bookmarked Filter Toggle */}
              <button
                type="button"
                onClick={() => setShowBookmarksOnly(!showBookmarksOnly)}
                className={`inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-xs font-semibold transition shrink-0 ${
                  showBookmarksOnly
                    ? "border-[var(--color-brand-primary)] bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)] font-bold shadow-xs"
                    : "border-[var(--calm-border-soft)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-brand-primary)]"
                }`}
              >
                <Bookmark className={`h-4 w-4 ${showBookmarksOnly ? "fill-[var(--color-brand-primary)]" : ""}`} />
                <span>Saved Bookmarks ({bookmarkedIds.length})</span>
              </button>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
              <span className="font-bold uppercase tracking-wider text-[var(--calm-text-muted)] mr-2 flex items-center gap-1.5">
                <Filter className="h-3.5 w-3.5" />
                Topic:
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

            {/* Format Filter */}
            <div className="flex flex-wrap items-center gap-2 text-xs border-t border-[var(--calm-border-soft)] pt-4">
              <span className="font-bold uppercase tracking-wider text-[var(--calm-text-muted)] mr-2">
                Format:
              </span>
              {types.map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`rounded-full px-3 py-1 font-medium transition ${
                    selectedType === type
                      ? "bg-[var(--calm-purple-deep)] text-white shadow-xs"
                      : "border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] text-[var(--color-text-secondary)] hover:bg-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Resources Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.length > 0 ? (
              filtered.map((res) => {
                const isBookmarked = bookmarkedIds.includes(res.id);

                return (
                  <article
                    key={res.id}
                    id={res.slug}
                    className="group flex flex-col justify-between rounded-3xl border border-[var(--calm-border-soft)] bg-white p-7 shadow-xs hover:border-[var(--color-brand-primary)] hover:shadow-lg transition duration-300"
                  >
                    <div>
                      {/* Top Type & Bookmark button */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
                          {getTypeIcon(res.type)}
                          <span>{res.type}</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-[var(--calm-text-muted)] font-medium">
                            {res.readTime}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleBookmarkToggle(res.id)}
                            aria-label={isBookmarked ? "Remove bookmark" : "Save bookmark"}
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--calm-border-soft)] hover:bg-[var(--calm-lavender-pale)] text-[var(--calm-text-muted)] transition"
                          >
                            <Bookmark
                              className={`h-4 w-4 ${isBookmarked ? "fill-[var(--color-brand-primary)] text-[var(--color-brand-primary)]" : ""}`}
                            />
                          </button>
                        </div>
                      </div>

                      <span className="mt-3 block text-[11px] font-semibold text-[var(--calm-text-muted)] uppercase tracking-wider">
                        {res.category}
                      </span>

                      <h2 className="mt-1 text-xl font-bold tracking-tight text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)] transition">
                        {res.title}
                      </h2>

                      <p className="mt-2.5 text-xs leading-relaxed text-[var(--color-text-secondary)] line-clamp-3">
                        {res.summary}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1">
                        {res.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] px-2 py-0.5 text-[10px] text-[var(--calm-text-muted)]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-7 flex items-center justify-between border-t border-[var(--calm-border-soft)] pt-4 text-xs">
                      <div className="flex items-center gap-1.5 text-[var(--calm-text-muted)]">
                        <User className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
                        <span className="truncate max-w-[130px]">{res.author}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveReadingItem(res)}
                        className="font-bold text-[var(--color-brand-primary)] hover:underline inline-flex items-center gap-1"
                      >
                        <span>Open &amp; Read</span>
                      </button>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="col-span-full rounded-3xl border border-dashed border-[var(--calm-border-soft)] bg-white p-12 text-center">
                <BookOpenText className="mx-auto h-8 w-8 text-[var(--color-brand-primary)]" />
                <h3 className="mt-4 text-lg font-bold text-[var(--color-text-primary)]">
                  No resources found matching your current filters.
                </h3>
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                  Try clearing your search query or toggling off the &ldquo;Saved Bookmarks&rdquo; filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setSelectedCategory("All");
                    setSelectedType("All");
                    setShowBookmarksOnly(false);
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-5 py-2 text-xs font-semibold text-white"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Full Resource Reading Modal */}
        {activeReadingItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--calm-plum-deep)]/65 p-4 backdrop-blur-sm"
            onClick={() => setActiveReadingItem(null)}
          >
            <div
              className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[var(--calm-border-soft)] bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] px-6 py-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
                  {getTypeIcon(activeReadingItem.type)}
                  <span>{activeReadingItem.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleBookmarkToggle(activeReadingItem.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white text-[var(--calm-text-muted)]"
                    title="Bookmark this resource"
                  >
                    <Bookmark
                      className={`h-4 w-4 ${
                        bookmarkedIds.includes(activeReadingItem.id)
                          ? "fill-[var(--color-brand-primary)] text-[var(--color-brand-primary)]"
                          : ""
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveReadingItem(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white text-[var(--calm-text-muted)]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Reader Body */}
              <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
                    {activeReadingItem.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-[var(--calm-text-muted)]">
                    <span>By {activeReadingItem.author} ({activeReadingItem.authorRole})</span>
                    <span>•</span>
                    <span>{activeReadingItem.readTime}</span>
                    <span>•</span>
                    <span>{activeReadingItem.publishedDate}</span>
                  </div>
                </div>

                {/* Key Takeaways Callout */}
                <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] p-5 text-xs text-[var(--color-text-primary)]">
                  <p className="font-bold uppercase tracking-wider text-[var(--color-brand-primary)] mb-2">
                    Key Practical Takeaways:
                  </p>
                  <div className="space-y-1.5">
                    {activeReadingItem.keyTakeaways.map((takeaway, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-brand-primary)] mt-0.5" />
                        <span>{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main Content Paragraphs */}
                <div className="space-y-4 text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
                  {activeReadingItem.content.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>

                {/* Footer disclaimer */}
                <div className="border-t border-[var(--calm-border-soft)] pt-4 text-xs text-[var(--calm-text-muted)]">
                  <p>
                    Published under CEAPS at SGT University. These psycho-educational materials are intended for student well-being and awareness, and do not constitute clinical psychotherapy or medical diagnosis. For one-on-one psychological consultation, visit Room 10.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
