import Link from "next/link";
import { ArrowRight, Users, HeartHandshake, ShieldCheck, Sparkles, BookOpen, CheckCircle2 } from "lucide-react";
import { Footer, SiteHeader } from "@/components/site-shell";

export const metadata = {
  title: "C.A.L.M Companions | Peer-to-Peer Support · SGT University",
  description:
    "Trained, supervised student peer listeners creating approachable, empathetic spaces across campus and online.",
};

export default function CalmCompanionsPage() {
  const values = [
    {
      title: "Approachable Lived Experience",
      desc: "Companions are fellow students who genuinely understand hostel living, academic pressures, deadlines, and social adjustments.",
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: "Structured Active Listening",
      desc: "Trained rigorously by CEAPS faculty in non-judgmental reflective listening, emotional de-escalation, and validation.",
      icon: <HeartHandshake className="h-6 w-6" />,
    },
    {
      title: "Strict Safety & Escalation Boundaries",
      desc: "Companions do not diagnose or treat mental illnesses; they provide a listening ear and know exactly when and how to bridge to professional CEAPS care.",
      icon: <ShieldCheck className="h-6 w-6" />,
    },
  ];

  const stepsToBecome = [
    "Annual application open to all 2nd & 3rd year SGT University students",
    "Psychological readiness screening and interview conducted by CEAPS faculty",
    "Comprehensive 30-hour peer counselling & active listening workshop",
    "Continuous bi-weekly clinical supervision with licensed CEAPS psychologists",
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--calm-border-soft)] bg-gradient-to-b from-white via-[var(--calm-lavender-pale)]/60 to-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Peer-to-Peer Support Network</span>
              </div>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-6xl leading-[1.1]">
                Someone Who Understands What Student Life Feels Like.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl">
                C.A.L.M Companions is our peer-support ecosystem. Supervised by the Department of CEAPS, trained student listeners bridge the gap between keeping struggles to yourself and formal psychological therapy.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/team#companions"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-md hover:bg-[var(--calm-purple-deep)] transition"
                >
                  <span>Meet Our Companions</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-8 py-4 text-sm font-bold text-[var(--color-text-primary)] hover:bg-[var(--calm-lavender-pale)] transition"
                >
                  <span>Apply to Become a Companion</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Pillars */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-8 shadow-xs">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)] mb-6">
                  {v.icon}
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-text-primary)]">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Supervision & Training Details */}
        <section className="border-t border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                  Clinical Supervision &amp; Ethics
                </span>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl text-[var(--color-text-primary)]">
                  Peer Warmth Grounded in Professional Boundaries
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  Unlike informal chats, every C.A.L.M Companion operates under the direct mentorship of CEAPS faculty members like Ms. Parvneet Kaur and Ms. Vaishnavi. Companions undergo monthly case debriefs to ensure their own emotional wellness and safeguard student trust.
                </p>
                <div className="mt-8 space-y-3">
                  {stepsToBecome.map((step) => (
                    <div key={step} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-[var(--color-brand-primary)] shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-[var(--color-text-primary)]">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-8 sm:p-10 shadow-xs">
                <span className="inline-block rounded-full bg-[var(--calm-lavender-pale)] px-3 py-1 text-xs font-bold text-[var(--color-brand-primary)]">
                  Interactive Listening Circles
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-text-primary)]">
                  Join a Companion-Led Group Session
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  Prefer connecting in small group settings? C.A.L.M Companions co-host bi-weekly Listening Circles and Colour the Chaos destress sessions in Room No. 10.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/events"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[var(--calm-purple-deep)] transition"
                  >
                    <span>View Circle Schedule</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/initiatives#listening-circles"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-6 py-3 text-xs font-bold text-[var(--color-text-primary)] hover:bg-[var(--calm-lavender-pale)] transition"
                  >
                    <span>Learn About Circles</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
