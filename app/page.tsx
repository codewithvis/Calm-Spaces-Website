import Link from "next/link";
import { ArrowRight, BookOpenText, BrainCircuit, HeartHandshake, MessageSquareText, ShieldCheck, Sparkles } from "lucide-react";
import { Footer, SectionHeading, ShowcaseCard, SiteHeader } from "@/components/site-shell";

const features = [
  {
    title: "Mood & self-awareness",
    description: "Track your wellbeing with quick daily check-ins, weekly trends, and calm reflective prompts.",
    icon: <HeartHandshake className="h-6 w-6" />,
  },
  {
    title: "Private journal",
    description: "Capture your thoughts in a secure, personal space designed to support reflection without pressure.",
    icon: <BookOpenText className="h-6 w-6" />,
  },
  {
    title: "Wellness toolkit",
    description: "Use grounding, breathing, focus, and creativity exercises to build small but meaningful recovery rituals.",
    icon: <BrainCircuit className="h-6 w-6" />,
  },
  {
    title: "Peer and expert support",
    description: "Connect with trained listeners, mental-health experts, and support resources when you need a safe next step.",
    icon: <MessageSquareText className="h-6 w-6" />,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(127,86,176,0.12),transparent_52%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Calm, supportive, practical wellbeing
                </div>
                <h1 className="max-w-xl text-5xl font-semibold tracking-tight text-[var(--color-text)] sm:text-6xl">
                  Your safe space for mood tracking, peer support, and mental wellness.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--color-muted)]">
                  Calm Spaces helps students and campus communities build self-awareness, access support, and find helpful tools without losing privacy or clarity.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-[var(--color-primary-strong)]">
                    Get started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link href="/features" className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-6 py-3 text-sm font-medium text-[var(--color-text)]">
                    Explore features
                  </Link>
                </div>
              </div>

              <div className="rounded-[32px] border border-[var(--color-border)] bg-white p-6 shadow-[0_24px_60px_rgba(69,58,96,0.08)]">
                <div className="rounded-[24px] bg-[var(--color-surface)] p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[var(--color-muted)]">Today&apos;s check-in</p>
                      <p className="mt-2 text-2xl font-semibold">Feeling steady</p>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl">🙂</div>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Mood</p>
                      <p className="mt-2 text-2xl font-semibold">8/10</p>
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Journal</p>
                      <p className="mt-2 text-2xl font-semibold">3</p>
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Sessions</p>
                      <p className="mt-2 text-2xl font-semibold">2</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Why Calm Spaces"
            title="Designed around Calm, Awareness, Learning, and Movement"
            description="The platform blends personal wellbeing with real support structures, helping people make sense of their mood and take the next supportive step when needed."
          />
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <ShowcaseCard key={feature.title} title={feature.title} description={feature.description} icon={feature.icon} />
            ))}
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7">
                <ShieldCheck className="mb-4 h-10 w-10 text-[var(--color-primary)]" />
                <h3 className="text-2xl font-semibold">Privacy-first by design</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">Sensitive mood, journal, appointment, and conversation data remains protected behind the same Supabase ownership and RLS model used by the Android app.</p>
              </div>
              <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7">
                <MessageSquareText className="mb-4 h-10 w-10 text-[var(--color-primary)]" />
                <h3 className="text-2xl font-semibold">Human support layers</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">Peer listeners and verified experts sit alongside journaling, resources, and AI guidance without replacing professional care.</p>
              </div>
              <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7">
                <Sparkles className="mb-4 h-10 w-10 text-[var(--color-primary)]" />
                <h3 className="text-2xl font-semibold">Actionable experience</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">Every part of the flow encourages reflection, connection, and next steps that feel realistic and humane.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
