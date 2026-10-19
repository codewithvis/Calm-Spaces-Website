"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Search,
  Filter,
  CheckCircle2,
  Users,
  ArrowRight,
} from "lucide-react";
import { Footer, SiteHeader } from "@/components/site-shell";
import { EventItem } from "@/lib/data/events";
import { useEvents } from "@/lib/hooks/useData";
import { EventRegistrationModal } from "@/components/event-registration-modal";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [registeringEvent, setRegisteringEvent] = useState<EventItem | null>(null);

  const { events } = useEvents();

  const categories = ["All", "Workshop", "Seminar", "Listening Circle", "Mindfulness", "Campaign"];

  const filtered = events.filter((e) => {
    const isPast = e.status === "Past";
    const tabMatch = activeTab === "upcoming" ? !isPast : isPast;

    const catMatch = selectedCategory === "All" || e.category === selectedCategory;
    const queryMatch =
      query.trim() === "" ||
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.description.toLowerCase().includes(query.toLowerCase()) ||
      e.location.toLowerCase().includes(query.toLowerCase()) ||
      e.facilitator.toLowerCase().includes(query.toLowerCase());

    return tabMatch && catMatch && queryMatch;
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
                <span>Campus Calendar</span>
              </div>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-6xl leading-[1.1]">
                Workshops, Circles &amp; Awareness Gatherings.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl">
                Free for all SGT University students. Join our peer listening cohorts, expressive arts sessions, and somatic walks designed to restore balance.
              </p>
            </div>
          </div>
        </section>

        {/* Filter & Tab Controls */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            {/* Upcoming vs Past Tabs */}
            <div className="inline-flex rounded-full border border-[var(--calm-border-soft)] bg-white p-1 shadow-xs">
              <button
                type="button"
                onClick={() => setActiveTab("upcoming")}
                className={`rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === "upcoming"
                    ? "bg-[var(--color-brand-primary)] text-white shadow-xs"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                Upcoming Programming
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("past")}
                className={`rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition ${
                  activeTab === "past"
                    ? "bg-[var(--color-brand-primary)] text-white shadow-xs"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                Past Campus Events
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-[var(--calm-text-muted)]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search events or topics..."
                className="w-full rounded-full border border-[var(--calm-border-soft)] bg-white py-2.5 pl-10 pr-4 text-xs text-[var(--color-text-primary)] placeholder-[var(--calm-text-muted)] outline-none focus:border-[var(--color-brand-primary)] transition"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-6 flex flex-wrap items-center gap-2 border-b border-[var(--calm-border-soft)] pb-6 text-xs">
            <span className="font-bold uppercase tracking-wider text-[var(--calm-text-muted)] mr-2 flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5" />
              Filter By Type:
            </span>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 font-medium transition ${
                  selectedCategory === cat
                    ? "bg-[var(--calm-purple-deep)] text-white shadow-xs"
                    : "border border-[var(--calm-border-soft)] bg-white text-[var(--color-text-secondary)] hover:bg-[var(--calm-lavender-pale)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.length > 0 ? (
              filtered.map((event) => {
                const seatsLeft = Math.max(0, event.capacity - event.registeredCount);
                const isFull = seatsLeft <= 0;

                return (
                  <article
                    key={event.id}
                    id={event.slug}
                    className="flex flex-col justify-between rounded-3xl border border-[var(--calm-border-soft)] bg-white p-7 shadow-xs hover:border-[var(--color-brand-primary)] hover:shadow-lg transition duration-300"
                  >
                    <div>
                      {/* Badge bar */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="rounded-full bg-[var(--calm-lavender-pale)] px-3 py-1 font-bold text-[var(--color-brand-primary)]">
                          {event.category}
                        </span>
                        <span
                          className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${
                            event.status === "Past"
                              ? "bg-gray-100 text-gray-700"
                              : isFull
                              ? "bg-amber-50 text-amber-800"
                              : "bg-green-50 text-green-700"
                          }`}
                        >
                          {event.status === "Past" ? "Completed" : isFull ? "Capacity Full" : "Registration Open"}
                        </span>
                      </div>

                      <h2 className="mt-4 text-xl font-bold tracking-tight text-[var(--color-text-primary)]">
                        {event.title}
                      </h2>

                      <p className="mt-2.5 text-xs leading-relaxed text-[var(--color-text-secondary)] line-clamp-3">
                        {event.description}
                      </p>

                      {/* Logistics Info */}
                      <div className="mt-6 space-y-2.5 text-xs text-[var(--color-text-secondary)] border-t border-[var(--calm-border-soft)] pt-4">
                        <div className="flex items-center gap-2.5 text-[var(--color-text-primary)] font-semibold">
                          <Calendar className="h-4 w-4 text-[var(--color-brand-primary)] shrink-0" />
                          <span>{event.formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[var(--calm-text-muted)]">
                          <Clock className="h-4 w-4 text-[var(--color-brand-primary)] shrink-0" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-start gap-2.5 text-[var(--calm-text-muted)]">
                          <MapPin className="h-4 w-4 text-[var(--color-brand-primary)] shrink-0 mt-0.5" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-start gap-2.5 text-[var(--calm-text-muted)]">
                          <User className="h-4 w-4 text-[var(--color-brand-primary)] shrink-0 mt-0.5" />
                          <span>Facilitator: {event.facilitator} ({event.facilitatorRole})</span>
                        </div>
                      </div>

                      {/* Capacity Bar (for upcoming) */}
                      {event.status !== "Past" && (
                        <div className="mt-5 rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-3 text-xs">
                          <div className="flex items-center justify-between font-semibold text-[11px] text-[var(--color-text-primary)] mb-1.5">
                            <span className="flex items-center gap-1.5">
                              <Users className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
                              <span>Cohort Capacity</span>
                            </span>
                            <span>{event.registeredCount} / {event.capacity} enrolled</span>
                          </div>
                          <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--calm-border-soft)]">
                            <div
                              className="h-full rounded-full bg-[var(--color-brand-primary)] transition-all"
                              style={{ width: `${Math.min(100, (event.registeredCount / event.capacity) * 100)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="mt-7 border-t border-[var(--calm-border-soft)] pt-5">
                      {event.status === "Past" ? (
                        <div className="flex items-center justify-between text-xs text-[var(--calm-text-muted)]">
                          <span>Session Archived</span>
                          <Link href="/resources" className="text-[var(--color-brand-primary)] hover:underline font-semibold">
                            View Resources
                          </Link>
                        </div>
                      ) : (
                        <button
                          type="button"
                          disabled={isFull}
                          onClick={() => setRegisteringEvent(event)}
                          className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[var(--color-brand-primary-hover)] disabled:opacity-50 transition"
                        >
                          <span>{isFull ? "Session Full" : "Register For Session"}</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="col-span-full rounded-3xl border border-dashed border-[var(--calm-border-soft)] bg-white p-12 text-center">
                <Calendar className="mx-auto h-8 w-8 text-[var(--color-brand-primary)]" />
                <h3 className="mt-4 text-lg font-bold text-[var(--color-text-primary)]">
                  No {activeTab} events found matching your filter criteria.
                </h3>
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                  Try clearing your search query or switching to {activeTab === "upcoming" ? "Past Campus Events" : "Upcoming Programming"}.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Interactive Registration Modal */}
      <EventRegistrationModal
        event={registeringEvent}
        isOpen={Boolean(registeringEvent)}
        onClose={() => setRegisteringEvent(null)}
      />

      <Footer />
    </div>
  );
}
