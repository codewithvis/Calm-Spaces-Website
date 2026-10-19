import Link from "next/link";
import { MapPin, Mail, Phone, Clock, ArrowRight, ShieldCheck, Heart, Sparkles } from "lucide-react";
import { Footer, SiteHeader } from "@/components/site-shell";

export const metadata = {
  title: "Visit Us | C.A.L.M Spaces · Room 10, A Block, SGT University",
  description:
    "Find C.A.L.M Spaces on campus at Room No. 10, Lower Ground Floor, A Block, SGT University, Budhera, Gurugram.",
};

export default function VisitUsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <SiteHeader />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[var(--calm-border-soft)] bg-gradient-to-b from-white via-[var(--calm-lavender-pale)]/60 to-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                <MapPin className="h-3.5 w-3.5" />
                <span>On-Campus Sanctuary</span>
              </div>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-6xl leading-[1.1]">
                Come Find C.A.L.M Spaces On Campus.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl">
                A quiet, sensory-friendly physical sanctuary on campus where any student or staff member can pause, ground themselves, access mental health resources, or speak with someone.
              </p>
            </div>
          </div>
        </section>

        {/* Location & Visiting Cards */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Campus Physical Address */}
            <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-8 sm:p-10 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)] mb-6">
                <MapPin className="h-6 w-6" />
              </div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-text-primary)]">
                Room No. 10 Sanctuary
              </h2>
              <div className="mt-6 space-y-2 text-sm text-[var(--color-text-secondary)]">
                <p className="font-bold text-[var(--color-text-primary)]">
                  Centre for Experiential &amp; Applied Psychological Sciences (CEAPS)
                </p>
                <p>Room No. 10, Lower Ground Floor</p>
                <p>A Block, SGT University Campus</p>
                <p>Budhera, Gurugram-Badli Road, Gurugram, Haryana 122505</p>
              </div>

              <div className="mt-8 border-t border-[var(--calm-border-soft)] pt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)] mb-2">
                  How to Reach Room 10
                </h3>
                <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  Enter via the main A Block reception. Take the stairs or central elevator down to the Lower Ground floor. Follow the soft purple C.A.L.M signage along the corridor to Room No. 10.
                </p>
              </div>
            </div>

            {/* Operating Hours & Contact */}
            <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-8 sm:p-10 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)] mb-6">
                  <Clock className="h-6 w-6" />
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-text-primary)]">
                  Visiting &amp; Walk-In Hours
                </h2>
                <div className="mt-6 space-y-4 text-xs">
                  <div className="flex justify-between border-b border-[var(--calm-border-soft)] pb-3">
                    <span className="font-medium text-[var(--color-text-secondary)]">Monday – Friday (Walk-ins &amp; Quiet Space)</span>
                    <span className="font-bold text-[var(--color-text-primary)]">9:00 AM – 4:00 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--calm-border-soft)] pb-3">
                    <span className="font-medium text-[var(--color-text-secondary)]">Scheduled Counselling Sessions</span>
                    <span className="font-bold text-[var(--color-text-primary)]">10:00 AM – 3:30 PM</span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--calm-border-soft)] pb-3">
                    <span className="font-medium text-[var(--color-text-secondary)]">Saturday</span>
                    <span className="font-bold text-[var(--color-brand-primary)]">By Prior Appointment Only</span>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="font-medium text-[var(--color-text-secondary)]">Sunday &amp; University Holidays</span>
                    <span className="font-bold text-[var(--calm-text-muted)]">Closed</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-[var(--calm-border-soft)] pt-6 space-y-3">
                <div className="flex items-center gap-3 text-xs text-[var(--color-text-secondary)]">
                  <Mail className="h-4 w-4 text-[var(--color-brand-primary)] shrink-0" />
                  <a href="mailto:ceaps@sgtuniversity.ed.in" className="hover:text-[var(--color-brand-primary)]">
                    ceaps@sgtuniversity.ed.in
                  </a>
                </div>
                <div className="flex items-center gap-3 text-xs text-[var(--color-text-secondary)]">
                  <Phone className="h-4 w-4 text-[var(--color-brand-primary)] shrink-0" />
                  <span>+91 124 2278183 / 2278184 (Ext. CEAPS)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sensory Friendly Amenities */}
        <section className="border-t border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                Sanctuary Amenities
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl text-[var(--color-text-primary)]">
                What Awaits You Inside Room No. 10
              </h2>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-7 shadow-xs">
                <Sparkles className="h-6 w-6 text-[var(--color-brand-primary)] mb-4" />
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">Sensory Calming Environment</h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  Dim warm lighting, acoustic baffling, comfortable floor seating, and noise-cancelling zones designed specifically for neurodivergent or sensory-overloaded students.
                </p>
              </div>

              <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-7 shadow-xs">
                <Heart className="h-6 w-6 text-[var(--calm-pink-blush)] mb-4" />
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">Expressive Art Corner</h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  Free access to sketchbooks, mandala coloring templates, watercolors, clay modeling, and somatic tactile tools for creative somatic release.
                </p>
              </div>

              <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-7 shadow-xs">
                <ShieldCheck className="h-6 w-6 text-[var(--color-brand-primary)] mb-4" />
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">Private Counselling Pods</h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  Soundproof, private spaces for confidential consultations with CEAPS psychologists or quiet one-on-one companion chats.
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
