"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  CalendarDays,
  Leaf,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Wind,
} from "lucide-react";
import { AppShell } from "@/components/site-shell";
import { getCurrentProfile, normalizeUserRole, type ProfileRecord } from "@/lib/auth/profile";
import { listMoodEntries, type MoodEntry } from "@/lib/data/mood";

function MoodPattern({ entries }: { entries: MoodEntry[] }) {
  const width = 620;
  const height = 190;
  const padding = 24;

  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  // Calculate average or mapped values per day of week
  const moodScoreMap: Record<string, number> = {
    Calm: 8,
    Good: 9,
    Okay: 6,
    Low: 4,
    Overwhelmed: 2,
    Anxious: 3,
    Hopeful: 7,
  };

  const pointsData = dayLabels.map((day, i) => {
    // Map entries if available, otherwise show neutral reference line
    const match = entries[i % Math.max(1, entries.length)];
    const val = match ? (moodScoreMap[match.mood_label] ?? 6) : 6;
    return { day, value: val };
  });

  const points = pointsData.map((point, index) => {
    const x = padding + (index * (width - padding * 2)) / (pointsData.length - 1);
    const y = height - padding - (point.value / 10) * (height - padding * 2);
    return `${x},${y}`;
  });

  return (
    <div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-52 w-full"
        role="img"
        aria-label="A gentle summary of mood check-ins"
      >
        {[0, 1, 2, 3].map((line) => {
          const y = padding + (line * (height - padding * 2)) / 3;
          return (
            <line
              key={line}
              x1={padding}
              x2={width - padding}
              y1={y}
              y2={y}
              stroke="var(--color-border)"
              strokeDasharray="4 5"
            />
          );
        })}
        <polyline
          fill="none"
          stroke="var(--color-sage-strong)"
          strokeWidth="3"
          points={points.join(" ")}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {pointsData.map((point, index) => {
          const x = padding + (index * (width - padding * 2)) / (pointsData.length - 1);
          const y = height - padding - (point.value / 10) * (height - padding * 2);
          return (
            <g key={point.day}>
              <circle cx={x} cy={y} r="5" fill="var(--color-sage-strong)" />
              <text x={x} y={height - 5} textAnchor="middle" fontSize="11" fill="var(--color-muted)">
                {point.day}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="text-sm leading-6 text-[var(--color-muted)]">
        {entries.length > 0
          ? `You have recorded ${entries.length} check-in${entries.length > 1 ? "s" : ""} recently. Taking time to notice how you feel makes a difference.`
          : "You haven't recorded a check-in this week yet. Whenever you are ready, choose how you're feeling above."}
      </p>
    </div>
  );
}

export default function DashboardPage() {
  const [profile, setProfile] = useState<ProfileRecord | null>(null);
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [greeting, setGreeting] = useState("Welcome back");

  useEffect(() => {
    async function loadData() {
      try {
        const { profile: currentProfile, user } = await getCurrentProfile();
        setProfile(currentProfile);

        const name = currentProfile?.name || currentProfile?.full_name;
        if (name) {
          const hour = new Date().getHours();
          const timeOfDay = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
          setGreeting(`${timeOfDay}, ${name.split(" ")[0]}`);
        } else if (user?.email) {
          setGreeting(`Welcome, ${user.email.split("@")[0]}`);
        }

        if (user) {
          const recentMoods = await listMoodEntries(user.id);
          setMoods(recentMoods);
        }
      } catch (err) {
        console.warn("Dashboard data load error:", err);
      }
    }
    loadData();
  }, []);

  const role = normalizeUserRole(profile?.role || profile?.type);

  return (
    <AppShell role={role}>
      <div className="space-y-8">
        <section className="border-b border-[var(--color-border)] pb-8">
          <p className="text-sm text-[var(--color-muted)]">{greeting}.</p>
          <h2 className="mt-2 max-w-2xl text-4xl leading-tight text-[var(--color-text)] sm:text-5xl">
            How are you feeling today?
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Calm", "Okay", "Low", "Anxious", "Hopeful"].map((mood) => (
              <Link
                href="/mood"
                key={mood}
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm text-[var(--color-text)] transition hover:border-[var(--color-sage-strong)]"
              >
                {mood}
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_8px_24px_rgba(32,51,43,0.04)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">
                  Your week
                </p>
                <h3 className="mt-2 text-2xl text-[var(--color-text)]">A small thing we noticed</h3>
              </div>
              <Leaf className="h-6 w-6 text-[var(--color-sage-strong)]" />
            </div>
            <div className="mt-6">
              <MoodPattern entries={moods} />
            </div>
            <Link
              href="/mood"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-sage-strong)]"
            >
              View your patterns <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-sand)]/55 p-6">
            <Sparkles className="h-6 w-6 text-[var(--color-sage-strong)]" />
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">
              Something for you
            </p>
            <h3 className="mt-2 text-2xl leading-tight text-[var(--color-text)]">
              Try a three-minute breathing reset.
            </h3>
            <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
              A short pause can be enough to make the next moment feel a little more manageable.
            </p>
            <Link
              href="/wellness"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-sage-strong)] px-5 py-3 text-sm font-medium text-white"
            >
              Take a breath <Wind className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">
                Keep going gently
              </p>
              <h3 className="mt-2 text-3xl text-[var(--color-text)]">Continue where you left off</h3>
            </div>
            <Link
              href="/resources"
              className="hidden text-sm font-medium text-[var(--color-sage-strong)] sm:inline-flex"
            >
              Explore more <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/journal"
              className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_8px_24px_rgba(32,51,43,0.04)]"
            >
              <BookOpenText className="h-5 w-5 text-[var(--color-sage-strong)]" />
              <h4 className="mt-7 text-xl text-[var(--color-text)]">Your private journal</h4>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                Write freely and keep your thoughts safe in your space.
              </p>
              <ArrowRight className="mt-5 h-4 w-4 text-[var(--color-muted)] transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/resources"
              className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_8px_24px_rgba(32,51,43,0.04)]"
            >
              <Sparkles className="h-5 w-5 text-[var(--color-sage-strong)]" />
              <h4 className="mt-7 text-xl text-[var(--color-text)]">Read something kind</h4>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                A short guide for when everything feels too much.
              </p>
              <ArrowRight className="mt-5 h-4 w-4 text-[var(--color-muted)] transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/buddy-connect"
              className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_8px_24px_rgba(32,51,43,0.04)]"
            >
              <MessageSquareText className="h-5 w-5 text-[var(--color-sage-strong)]" />
              <h4 className="mt-7 text-xl text-[var(--color-text)]">Talk to someone</h4>
              <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">
                Peer listeners are here when you&apos;d like company.
              </p>
              <ArrowRight className="mt-5 h-4 w-4 text-[var(--color-muted)] transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>

        <section className="grid gap-4 border-t border-[var(--color-border)] pt-8 md:grid-cols-2">
          <div className="flex gap-4 rounded-2xl bg-[var(--color-surface-muted)] p-5">
            <CalendarDays className="h-5 w-5 shrink-0 text-[var(--color-sage-strong)]" />
            <div>
              <h3 className="text-lg text-[var(--color-text)]">Support Appointments</h3>
              <p className="mt-1 text-sm text-[var(--color-muted)]">
                Schedule a consultation with professional psychological counsellors or trained peer listeners.
              </p>
              <Link
                href="/appointments"
                className="mt-3 inline-flex text-sm font-medium text-[var(--color-sage-strong)]"
              >
                View appointments <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="flex gap-4 rounded-2xl bg-[var(--color-surface-muted)] p-5">
            <ShieldCheck className="h-5 w-5 shrink-0 text-[var(--color-sage-strong)]" />
            <div>
              <h3 className="text-lg text-[var(--color-text)]">Your reflections are private.</h3>
              <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">
                Row Level Security guarantees that only you can access your personal check-ins and journal entries.
              </p>
            </div>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
