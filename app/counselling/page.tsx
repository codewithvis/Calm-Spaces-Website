import Link from "next/link";
import { ArrowRight, ShieldCheck, Heart, UserCheck, Calendar, Clock, MapPin, LifeBuoy } from "lucide-react";
import { Footer, SiteHeader } from "@/components/site-shell";

export const metadata = {
  title: "Professional Counselling | C.A.L.M Spaces · SGT University",
  description:
    "Confidential, empathetic, and professional psychological counselling services at CEAPS, Room No. 10, A Block, SGT University.",
};

export default function CounsellingPage() {
  const steps = [
    {
      step: "01",
      title: "Self-Initiated or Referred",
      desc: "Reach out via our confidential consultation request form, drop by Room No. 10, or get referred by a mentor or C.A.L.M Companion.",
    },
    {
      step: "02",
      title: "Confidential Intake",
      desc: "A brief, welcoming intake session to understand your context, current emotional load, and scheduling preferences.",
    },
    {
      step: "03",
      title: "One-on-One Sessions",
      desc: "Structured, evidence-based psychological sessions with qualified CEAPS clinical or counselling psychologists.",
    },
    {
      step: "04",
      title: "Integrated Wellness Path",
      desc: "Complement one-on-one sessions with mindful campus walks, expressive art workshops, or self-directed grounding tools.",
    },
  ];

  const focusAreas = [
    "Academic stress, perfectionism & exam anxiety",
    "Adjustment difficulties & campus transition",
    "Interpersonal relationships & family dynamics",
    "Mild-to-moderate depression, sadness & grief",
    "Self-esteem, identity, purpose & personal growth",
    "Sleep regulation, burnout & chronic exhaustion",
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
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>CEAPS Department · Confidential Care</span>
              </div>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-6xl leading-[1.1]">
                Sometimes, Talking to a Professional Helps.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl">
                C.A.L.M Spaces provides university students with a safe, confidential, and judgment-free clinical and psychological counselling pathway operated by the Centre for Experiential &amp; Applied Psychological Sciences (CEAPS).
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-md hover:bg-[var(--calm-purple-deep)] transition"
                >
                  <span>Request a Session</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/find-support#walk-in"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-8 py-4 text-sm font-bold text-[var(--color-text-primary)] hover:bg-[var(--calm-lavender-pale)] transition"
                >
                  <MapPin className="h-4 w-4 text-[var(--color-brand-primary)]" />
                  <span>Room 10 Walk-In Details</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-8 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)] mb-6">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-text-primary)]">
                100% Confidential
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                Your conversations, assessments, and records remain strictly protected within CEAPS professional ethics guidelines. Session data is never shared with academic departments or grades.
              </p>
            </div>

            <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-8 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)] mb-6">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-text-primary)]">
                Empathy &amp; Dignity
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                You will never be judged, lectured, or rushed. We acknowledge the complexities of modern student life and honor your unique background, identity, and lived experience.
              </p>
            </div>

            <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-8 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)] mb-6">
                <UserCheck className="h-6 w-6" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-text-primary)]">
                Qualified Specialists
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                All consultations are supervised and delivered by trained clinical and counseling psychologists from the CEAPS department at SGT University.
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="border-t border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                The Care Pathway
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl text-[var(--color-text-primary)]">
                How Student Counselling Works
              </h2>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s) => (
                <div key={s.step} className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-xs">
                  <span className="font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--calm-purple-light)]">
                    {s.step}
                  </span>
                  <h3 className="mt-3 text-base font-bold text-[var(--color-text-primary)]">{s.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Areas of Support */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-8 sm:p-12 shadow-xs">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl text-[var(--color-text-primary)]">
              Common Topics We Frequently Explore With Students
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {focusAreas.map((area) => (
                <div key={area} className="flex items-center gap-3 rounded-2xl bg-[var(--calm-lavender-pale)]/50 p-4 text-xs font-medium text-[var(--color-text-primary)]">
                  <span className="h-2 w-2 rounded-full bg-[var(--color-brand-primary)] shrink-0" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Emergency disclaimer banner */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[var(--calm-lavender-soft)] bg-[var(--calm-lavender-pale)] p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <LifeBuoy className="h-6 w-6 text-[var(--color-brand-primary)] shrink-0 mt-1" />
                <div>
                  <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                    Need Immediate Crisis or Medical Care?
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                    Counselling sessions require scheduling and are not an emergency service. In case of acute self-harm risk, call Government of India 24/7 National Helplines: <strong>Tele-MANAS (14416)</strong> or <strong>KIRAN (1800-599-0019)</strong>.
                  </p>
                </div>
              </div>
              <Link
                href="/find-support#crisis"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[var(--color-brand-primary)] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[var(--calm-purple-deep)] transition shrink-0"
              >
                <span>Crisis Directory</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
