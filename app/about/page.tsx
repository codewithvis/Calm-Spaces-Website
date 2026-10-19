import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Heart,
  Compass,
  Sparkles,
  MapPin,
  CheckCircle2,
  UsersRound,
} from "lucide-react";
import { Footer, PageContainer, SiteHeader } from "@/components/site-shell";
import { institutionalIdentity } from "@/content/institutional";

export const metadata = {
  title: "About Calm Spaces | CEAPS · SGT University",
  description: "Learn about C.A.L.M Spaces: our mission, vision, C.A.L.M. philosophy, and our institutional home under CEAPS at SGT University.",
};

export default function AboutPage() {
  const values = [
    {
      title: "Emotional Safety & Non-Judgment",
      desc: "Every interaction, whether in drop-in Room 10, a peer listening circle, or private counselling, is anchored in warmth, dignity, and absolute non-judgment.",
      icon: Heart,
    },
    {
      title: "Institutional & Scientific Grounding",
      desc: "Operating under CEAPS, our resources, psycho-educational workshops, and somatic practices are rooted in evidence-based pedagogical and psychological sciences.",
      icon: ShieldCheck,
    },
    {
      title: "Preventive & Accessible",
      desc: "We believe mental wellness should be part of student daily life before difficulties become overwhelming, eliminating clinical stigma and bureaucratic barriers.",
      icon: Sparkles,
    },
    {
      title: "Holistic Mind-Body Synergy",
      desc: "Cognitive health cannot be separated from physical movement, sensory grounding, creative expression, and authentic community connections.",
      icon: Compass,
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <SiteHeader />

      <main>
        {/* Hero Header */}
        <section className="border-b border-[var(--calm-border-soft)] bg-gradient-to-b from-white via-[var(--calm-lavender-pale)]/50 to-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                <span>About C.A.L.M Spaces</span>
              </div>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-6xl leading-[1.1]">
                Nurturing the Emotional Heart of Campus Life.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl">
                C.A.L.M Spaces is SGT University&apos;s holistic well-being unit, operating under the Centre of Excellence for Andragogical and Pedagogical Sciences (CEAPS) to embed emotional awareness, lightness, and resilience into the student learning experience.
              </p>
            </div>
          </div>
        </section>

        {/* Story & Background */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                Our Foundation
              </span>
              <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
                Born From an Institutional Commitment to Student Well-being.
              </h2>
              <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] p-6">
                <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
                  The Official Hierarchy
                </p>
                <div className="mt-3 flex flex-col gap-2 font-semibold text-sm text-[var(--color-text-primary)]">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-brand-primary)]" />
                    <span>C.A.L.M Spaces (Student Well-being Unit)</span>
                  </div>
                  <div className="flex items-center gap-2 pl-4">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--calm-violet-secondary)]" />
                    <span>CEAPS (Centre of Excellence for Andragogical and Pedagogical Sciences)</span>
                  </div>
                  <div className="flex items-center gap-2 pl-8">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--calm-plum-deep)]" />
                    <span>SGT University (Institutional Authority)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
              <p>
                Higher education is a time of immense intellectual acceleration and personal transformation. At SGT University, students across Medicine, Allied Health, Engineering, Law, Nursing, Commerce, and the Humanities navigate rigorous curricula, competitive examinations, clinical rotations, and transitions into adulthood.
              </p>
              <p>
                Recognizing that academic mastery cannot thrive in isolation from psychological well-being, the university established C.A.L.M Spaces under CEAPS. Rather than viewing mental health merely as an emergency intervention service, C.A.L.M Spaces serves as a preventive sanctuary woven directly into everyday university life.
              </p>
              <p>
                Located centrally on the campus at A Block, Lower Ground Floor, Room No. 10, the space welcomes any student who needs to step back, catch their breath, speak in confidentiality with a qualified psychologist, or connect with trained student peers.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision Cards */}
        <section className="border-y border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Mission */}
              <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-8 sm:p-10 shadow-xs">
                <span className="inline-block rounded-full bg-[var(--calm-lavender-pale)] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
                  Our Mission
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
                  De-stigmatizing Care &amp; Empowering Inner Growth
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
                  To provide accessible, compassionate, and evidence-grounded psychological support for SGT University students through one-on-one counselling, structured peer circles, expressive creative outlets, and psycho-educational resources — cultivating a campus culture where seeking support is seen as an act of wisdom and courage.
                </p>
                <ul className="mt-6 space-y-2 text-xs text-[var(--color-text-primary)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-brand-primary)]" />
                    <span>Ensure confidential, free counselling is within reach of every student</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-brand-primary)]" />
                    <span>Train and mentor student C.A.L.M Companions in active listening</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-brand-primary)]" />
                    <span>Integrate somatic movement and creative arts into campus de-stress routines</span>
                  </li>
                </ul>
              </div>

              {/* Vision */}
              <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-8 sm:p-10 shadow-xs">
                <span className="inline-block rounded-full bg-[var(--calm-lavender-pale)] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
                  Our Vision
                </span>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
                  A Resilient, Mindful University Community
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
                  To establish SGT University as a benchmark institution where emotional intelligence, psychological resilience, and somatic wellness are as central to student formation as academic distinction. We envision a campus where no student feels isolated, misunderstood, or unheard in times of challenge.
                </p>
                <ul className="mt-6 space-y-2 text-xs text-[var(--color-text-primary)]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-brand-primary)]" />
                    <span>Foster sustainable lifelong habits of self-awareness and emotional regulation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-brand-primary)]" />
                    <span>Eliminate mental health stigma through inter-departmental collaboration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-brand-primary)]" />
                    <span>Seamlessly connect digital tools with physical campus spaces</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Organizational Values */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
              Core Principles
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-4xl">
              The Values That Guide Every Interaction
            </h2>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((val) => {
              const VIcon = val.icon;
              return (
                <div
                  key={val.title}
                  className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-7 shadow-xs hover:border-[var(--color-brand-primary)] transition"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)]">
                    <VIcon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[var(--color-text-primary)]">{val.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Campus Physical Space */}
        <section className="border-t border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)]/50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                  Physical Campus Home
                </span>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--color-text-primary)] sm:text-4xl">
                  Visit Us at Room No. 10
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                  Located on the Lower Ground Floor of A Block at SGT University, C.A.L.M Spaces is intentionally designed with soft ambient lighting, comfortable seating, acoustic privacy, and creative corners. Drop in during class breaks, explore our curated reading library, or speak directly with our team.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[var(--color-brand-primary-hover)] transition"
                  >
                    <span>View Visiting Hours &amp; Directions</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link
                    href="/team"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] hover:border-[var(--color-brand-primary)] transition"
                  >
                    <span>Meet the Team</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-3xl border border-[var(--calm-border-soft)] bg-white p-7 shadow-md">
                <div className="flex items-center gap-3 text-[var(--color-brand-primary)]">
                  <MapPin className="h-6 w-6" />
                  <span className="font-bold text-base text-[var(--color-text-primary)]">Location Details</span>
                </div>
                <div className="mt-4 space-y-1 text-sm text-[var(--color-text-secondary)]">
                  <p className="font-semibold text-[var(--color-text-primary)]">C.A.L.M Spaces Studio</p>
                  <p>Room No. 10, Lower Ground Floor, A Block</p>
                  <p>SGT University Campus, Budhera, Gurugram</p>
                  <p>Haryana — 122505, India</p>
                </div>
                <div className="mt-6 border-t border-[var(--calm-border-soft)] pt-4 text-xs text-[var(--calm-text-muted)]">
                  <p>Accessible to all students, staff, and faculty members.</p>
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
