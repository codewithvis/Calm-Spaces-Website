"use client";

import Link from "next/link";
import { ArrowRight, BookOpenText, Heart, Sparkles, MessageSquareText, Wind } from "lucide-react";
import { useState } from "react";

const moods = [
  { label: "Calm", symbol: "◌", tone: "bg-[#EDE2FA] text-[#5926AA]", path: "/wellness", action: "Keep this steady ground with a gentle reset" },
  { label: "Good", symbol: "☀", tone: "bg-[#F5EFFD] text-[#7436D5]", path: "/journal", action: "Notice what has been nourishing you today" },
  { label: "Okay", symbol: "◐", tone: "bg-[#E8B8DF]/40 text-[#7436D5]", path: "/wellness", action: "Take an unhurried moment to pause" },
  { label: "Low", symbol: "↓", tone: "bg-[#F5EFFD] text-[#5926AA]", path: "/resources", action: "Explore supportive reads and gentle grounding" },
  { label: "Overwhelmed", symbol: "~", tone: "bg-[#FAD9E6] text-[#9B28B8]", path: "/find-support", action: "Reach out to a peer listener or counsellor" },
];

export function MoodDiscovery() {
  const [selectedMood, setSelectedMood] = useState<(typeof moods)[number] | null>(null);

  return (
    <div className="border-y border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)]/50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--calm-border-soft)] bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
              <span>Public Check-in</span>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
              How are you arriving today?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
              There is no right answer and no judgment. Notice what feels closest right now, and we&apos;ll offer a gentle, non-clinical next step. No login required.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {moods.map((mood) => {
                const isSelected = selectedMood?.label === mood.label;
                return (
                  <button
                    key={mood.label}
                    type="button"
                    onClick={() => setSelectedMood(mood)}
                    aria-pressed={isSelected}
                    className={`min-h-32 rounded-2xl border p-4 text-left transition duration-200 hover:-translate-y-1 ${mood.tone} ${
                      isSelected
                        ? "border-[var(--color-brand-primary)] ring-2 ring-[var(--color-brand-primary)] shadow-md"
                        : "border-[var(--calm-border-soft)] hover:shadow-sm"
                    }`}
                  >
                    <span className="text-3xl font-bold" aria-hidden="true">{mood.symbol}</span>
                    <span className="mt-5 block text-sm font-bold text-[var(--color-text-primary)]">{mood.label}</span>
                  </button>
                );
              })}
            </div>

            {selectedMood ? (
              <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-[var(--calm-border-soft)] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-[var(--calm-text-muted)]">
                    You selected: <span className="font-bold text-[var(--color-brand-primary)]">{selectedMood.label}</span>
                  </p>
                  <p className="mt-1 text-base font-semibold text-[var(--color-text-primary)]">
                    {selectedMood.action}
                  </p>
                </div>
                <Link
                  href={selectedMood.path}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-[var(--color-brand-primary-hover)] transition shrink-0"
                >
                  <span>Explore Support</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : (
              <div className="mt-6 flex items-center gap-2.5 text-xs text-[var(--calm-text-muted)]">
                <Sparkles className="h-4 w-4 text-[var(--color-brand-primary)]" />
                <span>Select a mood tile above for an unhurried, gentle recommendation.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function NeedDiscovery() {
  const needs = [
    { title: "I want to talk to someone", description: "Connect with trained student peer listeners or request confidential counselling in Room 10.", href: "/find-support", icon: MessageSquareText },
    { title: "I need to slow down", description: "Try guided physiological sigh breathing, NSDR rest, or 5-4-3-2-1 somatic grounding.", href: "/wellness", icon: Wind },
    { title: "I want to express myself", description: "Explore 'Colour the Chaos', creative mandalas, and non-judgmental expressive arts.", href: "/initiatives#colour-the-chaos", icon: Heart },
    { title: "I want to connect with peers", description: "Join our weekly student listening circles and informal campus wellness walks.", href: "/events", icon: Sparkles },
    { title: "I want to learn & understand", description: "Read psycho-educational articles on academic anxiety, imposter feelings, and sleep.", href: "/resources", icon: BookOpenText },
    { title: "I'm not sure what I need", description: "Browse our compassionate support directory and explore options at your own pace.", href: "/find-support", icon: Heart },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
          <span>Student Support Paths</span>
        </div>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
          What would feel supportive right now?
        </h2>
        <p className="mt-3 text-base text-[var(--color-text-secondary)]">
          Every journey at university looks different. Choose what feels accessible to you today.
        </p>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {needs.map((need) => {
          const Icon = need.icon;
          return (
            <Link
              href={need.href}
              key={need.title}
              className="group flex flex-col justify-between rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-xs hover:border-[var(--color-brand-primary)] hover:shadow-md transition duration-200"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)] group-hover:bg-[var(--color-brand-primary)] group-hover:text-white transition duration-200">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)] transition">
                  {need.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  {need.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[var(--color-brand-primary)]">
                <span>Explore</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
