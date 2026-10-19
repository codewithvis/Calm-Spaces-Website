"use client";

import { useState } from "react";
import { Sparkles, Eye, Feather, Activity, ArrowRight, CheckCircle2 } from "lucide-react";

type PillarKey = "C" | "A" | "L" | "M";

interface PillarData {
  letter: PillarKey;
  word: string;
  subtitle: string;
  color: string;
  bgLight: string;
  borderColor: string;
  icon: typeof Sparkles;
  description: string;
  campusPractice: string;
  reflectionPrompt: string;
  actionableStep: string;
}

const pillars: PillarData[] = [
  {
    letter: "C",
    word: "Cultivating",
    subtitle: "Nurturing inner resources and emotional foundations",
    color: "#7436D5", // Primary Purple
    bgLight: "#FAF6FE",
    borderColor: "#EDE2FA",
    icon: Sparkles,
    description: "Well-being is not an accidental state of mind; it is an intentional ecosystem we cultivate. At C.A.L.M Spaces, cultivating means creating deliberate conditions — quiet space, empathetic relationships, and compassionate self-talk — where mental clarity and self-worth can take root.",
    campusPractice: "Reflective journaling spaces, guided self-compassion circles, and personal mentorship in Room 10.",
    reflectionPrompt: "What mental habits or environments have been depleting your soil recently, and what single habit would help replenish it?",
    actionableStep: "Dedicate 5 quiet minutes today without social media before starting your academic study block."
  },
  {
    letter: "A",
    word: "Awareness",
    subtitle: "Recognizing thoughts, sensations, and emotional signals",
    color: "#5926AA", // Deep Purple
    bgLight: "#F5EFFD",
    borderColor: "#EAE1F1",
    icon: Eye,
    description: "Awareness brings compassionate attention to what is genuinely present without immediately judging it or suppressing it. Rather than fighting anxiety or fatigue, awareness allows us to notice physiological signals early, before exhaustion turns into unmanageable crisis.",
    campusPractice: "Psycho-educational workshops on autonomic nervous system regulation, 5-4-3-2-1 somatic grounding, and mindful check-ins.",
    reflectionPrompt: "If your body could speak right now, what physical tension or tiredness would it point out?",
    actionableStep: "Take 3 deep physiological sighs (two nasal inhales, one extended mouth exhale) to ground your awareness."
  },
  {
    letter: "L",
    word: "Lightness",
    subtitle: "Releasing unnecessary cognitive burdens and perfectionism",
    color: "#A77BE8", // Secondary Violet
    bgLight: "#FBF7FF",
    borderColor: "#EDE2FA",
    icon: Feather,
    description: "University life often burdens students with heavy expectations: the pressure to constantly perform, compare, and appear invulnerable. Lightness is the conscious practice of setting down burdens that do not belong to you today, softening perfectionism, and embracing playfulness.",
    campusPractice: "'Colour the Chaos' expressive arts, non-judgmental doodle lounge, peer venting circles, and laughter decompression.",
    reflectionPrompt: "What unrealistic expectation are you holding yourself to that you would never demand of a close friend?",
    actionableStep: "Choose one pending task on your to-do list and permit yourself to do it imperfectly."
  },
  {
    letter: "M",
    word: "Movement",
    subtitle: "Channeling energy through somatic, creative, and purposeful action",
    color: "#8E4EE4", // Vibrant Orchid Purple
    bgLight: "#F9F4FE",
    borderColor: "#EAE1F1",
    icon: Activity,
    description: "Emotions are energy in motion. When feelings stay trapped in mental rumination, the body holds chronic stress. Movement honors the physical dimension of well-being through breath, outdoor campus walks, expressive posture, and purposeful community participation.",
    campusPractice: "Morning campus mindfulness walks on SGT green lawns, chair stretches between long laboratory sessions, and movement therapy.",
    reflectionPrompt: "How can you shift your physical posture or location right now to invite fresh circulation into your thinking?",
    actionableStep: "Stand up, stretch your arms above your head, unroll your shoulders, and walk for 3 minutes."
  }
];

export function CalmPhilosophyInteractive() {
  const [activePillar, setActivePillar] = useState<PillarKey>("C");
  const current = pillars.find((p) => p.letter === activePillar) || pillars[0];
  const Icon = current.icon;

  return (
    <section className="relative overflow-hidden border-y border-[var(--calm-border-soft)] bg-[var(--color-bg-primary)] py-20 lg:py-28">
      {/* Decorative botanical backdrop */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[var(--calm-lavender-soft)]/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-[var(--calm-pink-blush)]/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
            <span>The C.A.L.M. Philosophy</span>
          </div>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-5xl">
            Four Pillars. One Welcoming Journey.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
            Our brand name is our pedagogical promise. Explore how each pillar translates into real, daily student support at SGT University.
          </p>
        </div>

        {/* 4 Interactive Connected Cards */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {pillars.map((pillar) => {
            const PIcon = pillar.icon;
            const isSelected = pillar.letter === activePillar;

            return (
              <button
                type="button"
                key={pillar.letter}
                onClick={() => setActivePillar(pillar.letter)}
                className={`group relative flex flex-col items-start rounded-2xl border p-5 text-left transition-all duration-300 sm:p-7 ${
                  isSelected
                    ? "border-[var(--color-brand-primary)] bg-white shadow-lg ring-2 ring-[var(--color-brand-primary)]/20"
                    : "border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] hover:border-[var(--calm-violet-secondary)] hover:bg-white hover:shadow-sm"
                }`}
              >
                {/* Letter Header */}
                <div className="flex w-full items-center justify-between">
                  <span
                    className="font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl"
                    style={{ color: pillar.color }}
                  >
                    {pillar.letter}
                  </span>
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200"
                    style={{
                      backgroundColor: isSelected ? pillar.color : pillar.bgLight,
                      color: isSelected ? "#FFFFFF" : pillar.color,
                    }}
                  >
                    <PIcon className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-lg font-bold tracking-tight text-[var(--color-text-primary)] sm:text-xl">
                    {pillar.word}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                    {pillar.subtitle}
                  </p>
                </div>

                {/* Active Indicator Bar */}
                <div
                  className="mt-5 h-1 w-full rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: isSelected ? pillar.color : "transparent",
                  }}
                />
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-md sm:p-10 lg:p-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-white font-bold"
                  style={{ backgroundColor: current.color }}
                >
                  {current.letter}
                </span>
                <span className="text-sm font-bold uppercase tracking-widest text-[var(--color-text-secondary)]">
                  Pillar in Action · {current.word}
                </span>
              </div>

              <h3 className="mt-4 text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl lg:text-4xl">
                {current.word}: {current.subtitle}
              </h3>

              <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
                {current.description}
              </p>

              <div className="mt-6 rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] p-4 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-brand-primary)]">
                  How SGT University Brings This to Life:
                </p>
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-[var(--color-text-primary)]">
                  {current.campusPractice}
                </p>
              </div>
            </div>

            {/* Right Interactive Reflection & Micro-Practice */}
            <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-6 sm:p-8 lg:col-span-5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
                <Icon className="h-4 w-4" />
                <span>Take a Moment to Reflect</span>
              </div>

              <div className="mt-4 rounded-xl border border-[var(--calm-lavender-soft)] bg-white p-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-text-tertiary)]">
                  Prompt
                </p>
                <p className="mt-2 text-sm italic leading-relaxed text-[var(--color-text-primary)]">
                  &ldquo;{current.reflectionPrompt}&rdquo;
                </p>
              </div>

              <div className="mt-5 space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)]">
                  Recommended Micro-Practice:
                </p>
                <div className="flex items-start gap-2.5 text-xs text-[var(--color-text-secondary)] leading-relaxed">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[var(--color-brand-primary)] mt-0.5" />
                  <span>{current.actionableStep}</span>
                </div>
              </div>

              <div className="mt-6 border-t border-[var(--calm-border-soft)] pt-5">
                <a
                  href="/resources"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary-hover)] transition"
                >
                  Explore {current.word} Resources <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
