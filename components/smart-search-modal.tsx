"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Search, X, BookOpen, Calendar, Sparkles, User, FileText, ArrowRight } from "lucide-react";
import { performUnifiedSearch, SearchResultItem, SearchResultType } from "@/lib/data/search";

interface SmartSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SmartSearchModal({ isOpen, onClose }: SmartSearchModalProps) {
  const [query, setQuery] = useState("");
  const [filterType, setFilterType] = useState<SearchResultType | "All">("All");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open handled by parent or state
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
    } else {
      const searchRes = performUnifiedSearch(query, filterType);
      setResults(searchRes);
    }
  }, [query, filterType]);

  if (!isOpen) return null;

  const popularQueries = [
    "Colour the Chaos",
    "Counselling in Room 10",
    "Listening Circles",
    "Exam anxiety",
    "Dr. Astha Chaudhry",
    "Ms. Parvneet Kaur",
    "Breathing exercise"
  ];

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
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-[var(--calm-plum-deep)]/60 p-4 pt-16 backdrop-blur-sm sm:p-6 sm:pt-24"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-[var(--calm-border-soft)] bg-white shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Unified Search"
      >
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[var(--calm-border-soft)] px-5 py-4">
          <Search className="h-5 w-5 text-[var(--color-brand-primary)]" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, events, initiatives, team, or support..."
            className="ml-3.5 flex-1 bg-transparent text-base text-[var(--color-text-primary)] placeholder-[var(--calm-text-muted)] outline-none"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="mr-2 text-xs text-[var(--calm-text-muted)] hover:text-[var(--color-text-primary)]"
            >
              Clear
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[var(--calm-lavender-pale)] text-[var(--calm-text-muted)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)]/60 px-5 py-2.5 text-xs">
          <span className="text-[11px] font-semibold text-[var(--calm-text-muted)] mr-1">Filter:</span>
          {(["All", "Resource", "Event", "Initiative", "Team", "Page"] as const).map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => setFilterType(type)}
              className={`rounded-full px-3 py-1 font-medium transition ${
                filterType === type
                  ? "bg-[var(--color-brand-primary)] text-white shadow-xs"
                  : "bg-white text-[var(--color-text-secondary)] border border-[var(--calm-border-soft)] hover:bg-[var(--calm-lavender-pale)]"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Results / Empty / Suggestions View */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5">
          {query.trim() === "" ? (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--calm-text-muted)] mb-3">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {popularQueries.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setQuery(item)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] px-3 py-1.5 text-xs text-[var(--color-text-primary)] hover:border-[var(--color-brand-primary)] hover:bg-white transition"
                  >
                    <Search className="h-3 w-3 text-[var(--color-brand-primary)]" />
                    <span>{item}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] p-4 text-xs text-[var(--color-text-secondary)]">
                <p className="font-semibold text-[var(--color-text-primary)]">Quick Keyboard Shortcuts</p>
                <p className="mt-1">
                  Press <kbd className="rounded border bg-white px-1.5 py-0.5 text-[10px] font-mono">Cmd + K</kbd> anywhere to search. Press <kbd className="rounded border bg-white px-1.5 py-0.5 text-[10px] font-mono">Esc</kbd> to dismiss.
                </p>
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-[var(--calm-text-muted)] mb-2">
                Found {results.length} result{results.length > 1 ? "s" : ""}:
              </p>
              {results.map((res) => (
                <Link
                  key={res.id}
                  href={res.url}
                  onClick={onClose}
                  className="group flex items-start gap-3.5 rounded-2xl border border-transparent p-3 hover:border-[var(--calm-border-soft)] hover:bg-[var(--calm-lavender-pale)]/50 transition"
                >
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white border border-[var(--calm-border-soft)] shadow-xs">
                    {getIcon(res.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
                        {res.type}
                      </span>
                      {res.badge && (
                        <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium border border-[var(--calm-border-soft)] text-[var(--color-text-secondary)]">
                          {res.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="mt-0.5 text-sm font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)] transition truncate">
                      {res.title}
                    </h4>
                    <p className="mt-0.5 line-clamp-1 text-xs text-[var(--color-text-secondary)]">
                      {res.snippet}
                    </p>
                  </div>
                  <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-[var(--calm-text-muted)] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-base font-semibold text-[var(--color-text-primary)]">
                No matching results found for &ldquo;{query}&rdquo;
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                Try searching for general keywords like &ldquo;counselling&rdquo;, &ldquo;mindfulness&rdquo;, or &ldquo;workshop&rdquo;.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] px-5 py-3 text-xs text-[var(--calm-text-muted)]">
          <span>Official Calm Spaces Platform Index</span>
          <Link
            href="/find-support"
            onClick={onClose}
            className="font-medium text-[var(--color-brand-primary)] hover:underline"
          >
            Need urgent assistance?
          </Link>
        </div>
      </div>
    </div>
  );
}
