import Link from "next/link";
import {
  LifeBuoy,
  MessageSquareText,
  UsersRound,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  AlertTriangle,
  Lock,
} from "lucide-react";
import { Footer, SiteHeader } from "@/components/site-shell";

export const metadata = {
  title: "Support Discovery & Care Pathways | C.A.L.M Spaces · SGT University",
  description: "Find confidential psychological support, peer listening, campus counselling in Room 10, and verified 24/7 national mental health helplines.",
};

export default function FindSupportPage() {
  const carePathways = [
    {
      title: "One-on-One Psychological Counselling",
      audience: "For personal, academic, relationship, or mental health distress",
      desc: "Confidential consultations with qualified CEAPS psychologists. A safe, reflective space to unpack chronic anxiety, burnout, grief, or life transitions.",
      access: "Walk-in to Room 10 or email helpdesk.calmspaces@sgtuniversity.org",
      href: "/counselling",
      icon: MessageSquareText,
      badge: "Clinical Care",
    },
    {
      title: "C.A.L.M Companions Peer Listening",
      audience: "For hostel transitions, daily academic stress, or wanting to talk to a peer",
      desc: "Approachable, empathetic active listening provided by trained SGT student peer listeners under professional CEAPS supervision.",
      access: "Weekly drop-in circles or through buddy connect sessions",
      href: "/calm-companions",
      icon: UsersRound,
      badge: "Peer Support",
    },
    {
      title: "Expressive & Somatic Movement",
      audience: "For non-verbal release, mental fatigue, and body-centered grounding",
      desc: "'Colour the Chaos' mandala workshops, mindfulness campus walks, and guided somatic breathing sessions to reset the autonomic nervous system.",
      access: "Check bi-weekly calendar in Initiatives & Events",
      href: "/initiatives",
      icon: LifeBuoy,
      badge: "Mind-Body",
    },
  ];

  const emergencyHelplines = [
    {
      name: "Tele-MANAS (Government of India)",
      number: "14416 / 1800 891 4416",
      details: "Official 24/7 Comprehensive Mental Health Helpline by Ministry of Health & Family Welfare. Toll-free, available in multiple Indian languages.",
      type: "Toll-Free · 24/7",
    },
    {
      name: "KIRAN Mental Health Helpline",
      number: "1800-599-0019",
      details: "Operated by the Ministry of Social Justice and Empowerment for crisis management, early screening, and psychological first-aid.",
      type: "Toll-Free · 24/7",
    },
    {
      name: "Vandrevala Foundation Helpline",
      number: "+91 9999 666 555",
      details: "Experienced mental health counselors providing 24/7 compassionate telephone guidance across India.",
      type: "Nationwide · 24/7",
    },
    {
      name: "SGT University Campus Emergency Health Center",
      number: "1800 102 5661 / Ext. Campus Hospital",
      details: "SGT Hospital & Medical College Emergency Care, located directly on campus for acute medical safety.",
      type: "On-Campus Medical",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <SiteHeader />

      <main>
        {/* Header */}
        <section className="border-b border-[var(--calm-border-soft)] bg-gradient-to-b from-white via-[var(--calm-lavender-pale)]/50 to-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                <span>Care Pathways &amp; Discovery</span>
              </div>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-6xl leading-[1.1]">
                Find the Form of Support That Works for You.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl">
                Support can take many forms: from quiet self-paced breathing resets to confidential talks with a psychologist in Room 10. You do not have to wait until things feel unbearable.
              </p>
            </div>
          </div>
        </section>

        {/* Pathways Grid */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
              University Services
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-extrabold text-[var(--color-text-primary)] sm:text-4xl">
              Available On-Campus Support
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {carePathways.map((path) => {
              const PIcon = path.icon;
              return (
                <div
                  key={path.title}
                  className="flex flex-col justify-between rounded-3xl border border-[var(--calm-border-soft)] bg-white p-8 shadow-xs hover:border-[var(--color-brand-primary)] hover:shadow-lg transition duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)]">
                        <PIcon className="h-7 w-7" />
                      </div>
                      <span className="rounded-full bg-[var(--calm-white-warm)] border border-[var(--calm-border-soft)] px-3 py-1 text-[10px] font-bold text-[var(--color-brand-primary)]">
                        {path.badge}
                      </span>
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-[var(--color-text-primary)]">
                      {path.title}
                    </h3>
                    <p className="mt-1.5 text-xs font-semibold text-[var(--color-brand-primary)]">
                      {path.audience}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                      {path.desc}
                    </p>

                    <div className="mt-6 rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-4 text-xs text-[var(--color-text-primary)] font-medium">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--calm-text-muted)] mb-1">
                        How to Access:
                      </p>
                      <p>{path.access}</p>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-[var(--calm-border-soft)] pt-5">
                    <Link
                      href={path.href}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[var(--color-brand-primary-hover)] transition"
                    >
                      <span>Explore {path.title.split(" ")[0]}</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Emergency & 24/7 Crisis Assistance Notice */}
        <section id="crisis" className="border-y border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)]/50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-red-200 bg-white p-8 sm:p-12 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                  <AlertTriangle className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-red-600">
                    Important Safety Boundary
                  </span>
                  <h2 className="mt-2 text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
                    Immediate Crisis &amp; 24/7 National Emergency Helplines
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    C.A.L.M Spaces website forms and email inboxes are intended for educational and non-emergency appointments. They are monitored during regular university working hours (response time: 1–2 working days). <strong>If you or someone you know is in acute distress or immediate risk of self-harm, please connect directly with the verified 24/7 helplines below.</strong>
                  </p>
                </div>
              </div>

              {/* Helplines List */}
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {emergencyHelplines.map((line) => (
                  <div
                    key={line.name}
                    className="flex flex-col justify-between rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-6"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
                          {line.type}
                        </span>
                        <Phone className="h-4 w-4 text-red-600" />
                      </div>
                      <h3 className="mt-2 text-lg font-bold text-[var(--color-text-primary)]">
                        {line.name}
                      </h3>
                      <p className="mt-1 text-xs text-[var(--color-text-secondary)] leading-relaxed">
                        {line.details}
                      </p>
                    </div>

                    <div className="mt-5 border-t border-[var(--calm-border-soft)] pt-4">
                      <a
                        href={`tel:${line.number.replace(/[^0-9]/g, "")}`}
                        className="inline-flex items-center gap-2 text-base font-extrabold text-[var(--color-brand-primary)] hover:underline"
                      >
                        <Phone className="h-4 w-4" />
                        <span>{line.number}</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Confidentiality & Ethics */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-8 sm:p-10">
            <div className="flex items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)]">
                <Lock className="h-6 w-6" />
              </div>
              <div className="space-y-3 text-xs leading-relaxed text-[var(--color-text-secondary)] sm:text-sm">
                <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                  Your Privacy &amp; Confidentiality Are Protected
                </h3>
                <p>
                  At C.A.L.M Spaces, psychological confidentiality is governed by strict ethical standards set by the CEAPS psychological board. Information shared during one-on-one counselling sessions or peer listening is private. It is never added to your academic transcript, shared with professors, or disclosed to employers.
                </p>
                <p className="text-xs text-[var(--calm-text-muted)]">
                  The only exception mandated by law and clinical ethics occurs if there is an imminent, life-threatening danger to yourself or someone else, in which case appropriate medical care is immediately mobilized.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
