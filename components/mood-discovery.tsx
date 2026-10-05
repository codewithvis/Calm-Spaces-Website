"use client";

import Link from "next/link";
import { ArrowRight, BookOpenText, Heart, Leaf, MessageSquareText, Wind } from "lucide-react";
import { useState } from "react";

const moods = [
  { label: "Calm", symbol: "◌", tone: "bg-[#dce8d7]", path: "/wellness", action: "Keep the steadiness" },
  { label: "Good", symbol: "☀", tone: "bg-[#f1e2c5]", path: "/journal", action: "Notice what is helping" },
  { label: "Okay", symbol: "◐", tone: "bg-[#e5e3ee]", path: "/wellness", action: "Take a gentle pause" },
  { label: "Low", symbol: "↓", tone: "bg-[#e4e8e1]", path: "/resources", action: "Find some support" },
  { label: "Overwhelmed", symbol: "~", tone: "bg-[#ead7d0]", path: "/sos", action: "Get support now" },
];

export function MoodDiscovery() {
  const [selectedMood, setSelectedMood] = useState<(typeof moods)[number] | null>(null);

  return (
    <div className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">Start wherever you are</p>
            <h2 className="mt-3 text-4xl leading-tight text-[var(--color-text)] sm:text-5xl">How are you arriving today?</h2>
            <p className="mt-5 max-w-md text-base leading-7 text-[var(--color-muted)]">There is no right answer. Choose what feels closest, and we&apos;ll offer a gentle next step. You don&apos;t need an account to begin.</p>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {moods.map((mood) => {
                const isSelected = selectedMood?.label === mood.label;
                return (
                  <button
                    key={mood.label}
                    type="button"
                    onClick={() => setSelectedMood(mood)}
                    aria-pressed={isSelected}
                    className={`min-h-28 rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:border-[var(--color-sage-strong)] ${mood.tone} ${isSelected ? "border-[var(--color-sage-strong)] ring-2 ring-[var(--color-sage)]" : "border-transparent"}`}
                  >
                    <span className="text-2xl" aria-hidden="true">{mood.symbol}</span>
                    <span className="mt-5 block text-sm font-medium text-[var(--color-text)]">{mood.label}</span>
                  </button>
                );
              })}
            </div>

            {selectedMood ? (
              <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-[var(--color-muted)]">You chose {selectedMood.label.toLowerCase()}.</p>
                  <p className="mt-1 text-lg font-medium text-[var(--color-text)]">{selectedMood.action}</p>
                </div>
                <Link href={selectedMood.path} className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-sage-strong)] px-5 py-3 text-sm font-medium text-white">
                  Take a moment
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <div className="mt-5 flex items-center gap-3 text-sm text-[var(--color-muted)]">
                <Leaf className="h-4 w-4 text-[var(--color-sage-strong)]" />
                You can change direction at any time.
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
    { title: "I want to talk", description: "Find a listening ear or professional support.", href: "/buddy-connect", icon: MessageSquareText },
    { title: "I need to slow down", description: "Try a breathing or grounding activity.", href: "/wellness", icon: Wind },
    { title: "I want to clear my head", description: "Find a small reset for the next few minutes.", href: "/wellness", icon: Wind },
    { title: "I want to understand myself", description: "Check in or write something down.", href: "/mood", icon: BookOpenText },
    { title: "I want to connect", description: "Find community, listening circles, and peer support.", href: "/community", icon: MessageSquareText },
    { title: "I want to create", description: "Make room for expression without needing the right words.", href: "/create", icon: Heart },
    { title: "I want to learn", description: "Explore resources, workshops, and things that might help.", href: "/resources", icon: BookOpenText },
    { title: "I'm not sure", description: "Let a gentle prompt help you choose.", href: "/find-support", icon: Heart },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">A place to begin</p>
        <h2 className="mt-3 text-4xl leading-tight text-[var(--color-text)] sm:text-5xl">What would feel helpful right now?</h2>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {needs.map((need) => {
          const Icon = need.icon;
          return (
            <Link href={need.href} key={need.title} className="group flex items-start gap-5 border-t border-[var(--color-border)] py-5 transition-colors hover:border-[var(--color-sage-strong)]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface-muted)] text-[var(--color-sage-strong)]"><Icon className="h-5 w-5" /></span>
              <span>
                <span className="block text-xl font-medium text-[var(--color-text)]">{need.title}</span>
                <span className="mt-1 block text-sm leading-6 text-[var(--color-muted)]">{need.description}</span>
              </span>
              <ArrowRight className="ml-auto mt-2 h-5 w-5 text-[var(--color-muted)] transition-transform group-hover:translate-x-1" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
