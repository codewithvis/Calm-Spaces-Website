import Link from "next/link";
import { LifeBuoy, Phone, ShieldAlert, HeartHandshake, ArrowRight, AlertTriangle, Building2, MapPin } from "lucide-react";
import { Footer, SiteHeader } from "@/components/site-shell";

export const metadata = {
  title: "Safety & Crisis Support | C.A.L.M Spaces · SGT University",
  description:
    "Immediate mental health helplines, suicide prevention hotlines, emergency contacts, and campus safety protocols for students.",
};

export default function SafetyPage() {
  const emergencyHelplines = [
    {
      name: "Tele-MANAS (Govt. of India)",
      number: "14416",
      tollFree: "1800 891 4416",
      desc: "24/7 Comprehensive National Tele-Mental Health Programme. Free, multi-lingual support operated by NIMHANS and MoHFW.",
      tag: "24/7 Toll-Free · Multi-lingual",
    },
    {
      name: "KIRAN Helpline",
      number: "1800-599-0019",
      tollFree: "1800-599-0019",
      desc: "24/7 National Mental Health Rehabilitation Helpline by the Ministry of Social Justice & Empowerment.",
      tag: "24/7 Toll-Free · Govt. of India",
    },
    {
      name: "Vandrevala Foundation Helpline",
      number: "+91 9999 666 555",
      tollFree: "9999 666 555",
      desc: "24/7 Professional emotional crisis intervention, psychological counselling, and active de-escalation across India.",
      tag: "24/7 Free · Hindi & English",
    },
    {
      name: "National Emergency Number",
      number: "112",
      tollFree: "112",
      desc: "Single unified emergency number across India for Police, Fire, and Ambulance medical services.",
      tag: "National Emergency Services",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <SiteHeader />

      <main>
        {/* Critical Notice Header */}
        <section className="border-b border-red-200 bg-red-50/60 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-red-700">
                  Critical Safety Notice
                </span>
                <h1 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl text-red-950">
                  Are You or Someone Else in Immediate Danger?
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-red-900 leading-relaxed max-w-3xl">
                  C.A.L.M Spaces and our digital platform are <strong>not emergency or crisis response services</strong>. If you are experiencing thoughts of self-harm, severe distress, or medical emergencies, please immediately contact one of the verified 24/7 helplines below or call <strong>112</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Verified Helplines */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
              Verified Crisis Helplines
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl text-[var(--color-text-primary)]">
              24/7 Free &amp; Confidential Support Lines
            </h2>
            <p className="mt-3 text-sm text-[var(--color-text-secondary)]">
              All numbers below are free of charge, confidential, and staffed by trained mental health professionals and crisis counselors.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {emergencyHelplines.map((item) => (
              <div
                key={item.name}
                className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-7 shadow-xs hover:border-[var(--color-brand-primary)] hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-[var(--calm-lavender-pale)] px-3 py-1 text-[10px] font-bold text-[var(--color-brand-primary)]">
                      {item.tag}
                    </span>
                    <Phone className="h-4 w-4 text-[var(--color-brand-primary)]" />
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl font-bold text-[var(--color-text-primary)]">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 border-t border-[var(--calm-border-soft)] pt-4">
                  <a
                    href={`tel:${item.number.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center justify-between rounded-2xl bg-[var(--calm-lavender-pale)] px-5 py-3 text-sm font-extrabold text-[var(--color-brand-primary)] hover:bg-[var(--calm-lavender-soft)] transition"
                  >
                    <span>Call {item.number}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Campus Physical Emergency */}
        <section className="border-t border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                  On-Campus Protocol
                </span>
                <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-extrabold sm:text-4xl text-[var(--color-text-primary)]">
                  SGT University Campus Support
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  If you are on campus during working hours (9:00 AM – 4:00 PM), visit <strong>Room No. 10, Lower Ground Floor, A Block</strong>. CEAPS clinical staff will provide immediate stabilization and guide you to appropriate care.
                </p>
                <div className="mt-6 space-y-3 text-xs">
                  <div className="flex items-start gap-3 rounded-2xl bg-white p-4 border border-[var(--calm-border-soft)]">
                    <Building2 className="h-5 w-5 text-[var(--color-brand-primary)] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[var(--color-text-primary)]">SGT Hospital &amp; Medical College (On-Campus)</p>
                      <p className="mt-0.5 text-[var(--calm-text-muted)]">
                        24-Hour Emergency Casualty Department is located on campus with medical officers on duty.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-2xl bg-white p-4 border border-[var(--calm-border-soft)]">
                    <MapPin className="h-5 w-5 text-[var(--color-brand-primary)] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[var(--color-text-primary)]">Hostel Warden &amp; Campus Security Control Room</p>
                      <p className="mt-0.5 text-[var(--calm-text-muted)]">
                        Resident students can notify hostel wardens or security for emergency transit to campus hospital.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-8 sm:p-10 shadow-xs">
                <HeartHandshake className="h-8 w-8 text-[var(--color-brand-primary)] mb-4" />
                <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--color-text-primary)]">
                  Supporting a Peer in Crisis
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  If a classmate or friend is overwhelmed, stay with them if safe to do so. Listen without judgment, do not promise complete secrecy regarding physical danger, and encourage them to connect with Tele-MANAS (14416) or visit CEAPS Room No. 10 together.
                </p>
                <div className="mt-6">
                  <Link
                    href="/find-support"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[var(--calm-purple-deep)] transition"
                  >
                    <span>Full Support Directory</span>
                    <ArrowRight className="h-3.5 w-3.5" />
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
