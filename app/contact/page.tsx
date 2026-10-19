"use client";

import { useState, useTransition } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";
import { Footer, SiteHeader } from "@/components/site-shell";
import { submitContactFormAction } from "@/lib/actions/contact";

type ContactCategory =
  | "General Inquiry"
  | "Counselling Request"
  | "Volunteering"
  | "Event Feedback"
  | "Media"
  | "Accessibility"
  | "Other";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState<ContactCategory>("General Inquiry");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<{ success: boolean; text: string } | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setStatus({ success: false, text: "Please fill in all required fields." });
      return;
    }

    startTransition(async () => {
      const res = await submitContactFormAction({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        category,
        subject: subject.trim(),
        message: message.trim(),
      });

      setStatus({ success: res.success, text: res.message });

      if (res.success) {
        setName("");
        setEmail("");
        setPhone("");
        setSubject("");
        setMessage("");
      }
    });
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <SiteHeader />

      <main>
        {/* Header */}
        <section className="border-b border-[var(--calm-border-soft)] bg-gradient-to-b from-white via-[var(--calm-lavender-pale)]/50 to-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                <span>Reach Out To Us</span>
              </div>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-6xl leading-[1.1]">
                We Are Here to Listen &amp; Guide.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl">
                Have questions about counselling, workshop collaborations, or our campus initiatives? Reach out below or visit us directly on campus.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Body */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left: Contact Info & Location */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-primary)]">
                  Campus Presence
                </span>
                <h2 className="mt-2 text-2xl font-bold text-[var(--color-text-primary)] sm:text-3xl">
                  Visit Us in Room No. 10
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  A welcoming, quiet space designed for student decompression, peer chats, and confidential guidance.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3.5 rounded-2xl border border-[var(--calm-border-soft)] bg-white p-5 shadow-xs">
                  <MapPin className="h-5 w-5 text-[var(--color-brand-primary)] shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-sm text-[var(--color-text-primary)]">Campus Location</p>
                    <p className="text-[var(--color-text-secondary)]">A Block, Lower Ground Floor, Room No. 10</p>
                    <p className="text-[var(--color-text-secondary)]">SGT University, Budhera, Gurugram, Haryana — 122505</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl border border-[var(--calm-border-soft)] bg-white p-5 shadow-xs">
                  <Clock className="h-5 w-5 text-[var(--color-brand-primary)] shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-sm text-[var(--color-text-primary)]">Drop-in Studio Hours</p>
                    <p className="text-[var(--color-text-secondary)]">Monday – Friday: 9:00 AM – 5:00 PM</p>
                    <p className="text-[var(--color-text-secondary)]">Saturday: 9:00 AM – 1:00 PM (Appointments &amp; Circles)</p>
                    <p className="text-[var(--calm-text-muted)] italic">Sunday &amp; Gazetted Holidays: Closed</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl border border-[var(--calm-border-soft)] bg-white p-5 shadow-xs">
                  <Mail className="h-5 w-5 text-[var(--color-brand-primary)] shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-sm text-[var(--color-text-primary)]">Official Emails</p>
                    <p><a href="mailto:helpdesk.calmspaces@sgtuniversity.org" className="text-[var(--color-brand-primary)] hover:underline">helpdesk.calmspaces@sgtuniversity.org</a> (Student Inquiries)</p>
                    <p><a href="mailto:ceaps@sgtuniversity.org" className="text-[var(--color-brand-primary)] hover:underline">ceaps@sgtuniversity.org</a> (Department Office)</p>
                    <p><a href="mailto:director.ceaps@sgtuniversity.org" className="text-[var(--color-brand-primary)] hover:underline">director.ceaps@sgtuniversity.org</a> (Director&apos;s Desk)</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 rounded-2xl border border-[var(--calm-border-soft)] bg-white p-5 shadow-xs">
                  <Phone className="h-5 w-5 text-[var(--color-brand-primary)] shrink-0 mt-0.5" />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-sm text-[var(--color-text-primary)]">Telephone Support</p>
                    <p><a href="tel:18001025661" className="text-[var(--color-brand-primary)] hover:underline">1800 102 5661</a> (SGT University Toll-Free)</p>
                    <p><a href="tel:+918527794487" className="text-[var(--color-brand-primary)] hover:underline">+91 85277 94487</a> (C.A.L.M Spaces Help Desk)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Contact Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-8 sm:p-10 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand-primary)]">
                  Direct Inquiry Form
                </span>
                <h3 className="mt-2 text-2xl font-bold text-[var(--color-text-primary)]">
                  Send a Confidential Message
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  Your message goes directly to the CEAPS psychological coordination desk. Non-emergency inquiries receive a response within 1–2 working days.
                </p>

                {status && (
                  <div
                    className={`mt-6 flex items-start gap-3 rounded-2xl border p-4 text-xs ${
                      status.success
                        ? "border-green-200 bg-green-50 text-green-800"
                        : "border-red-200 bg-red-50 text-red-800"
                    }`}
                  >
                    {status.success ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
                    )}
                    <span className="leading-relaxed">{status.text}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5">
                        Your Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        className="w-full rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder-[var(--calm-text-muted)] outline-none focus:border-[var(--color-brand-primary)] focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@student.sgtuniversity.org"
                        className="w-full rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder-[var(--calm-text-muted)] outline-none focus:border-[var(--color-brand-primary)] focus:bg-white transition"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5">
                        Contact Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder-[var(--calm-text-muted)] outline-none focus:border-[var(--color-brand-primary)] focus:bg-white transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5">
                        Inquiry Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="w-full rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-brand-primary)] focus:bg-white transition"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Counselling Appointment">Counselling Appointment</option>
                        <option value="Workshop Request">Workshop Request</option>
                        <option value="Faculty Collaboration">Faculty Collaboration</option>
                        <option value="Feedback">Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Brief subject of your note..."
                      className="w-full rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder-[var(--calm-text-muted)] outline-none focus:border-[var(--color-brand-primary)] focus:bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-text-primary)] mb-1.5">
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your note here with as much or as little detail as feels comfortable..."
                      className="w-full rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder-[var(--calm-text-muted)] outline-none focus:border-[var(--color-brand-primary)] focus:bg-white transition"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isPending}
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-8 text-sm font-bold uppercase tracking-wider text-white shadow-md hover:bg-[var(--color-brand-primary-hover)] disabled:opacity-50 transition"
                    >
                      <Send className="h-4 w-4" />
                      <span>{isPending ? "Sending..." : "Send Message"}</span>
                    </button>
                  </div>
                </form>

                <div className="mt-6 flex items-start gap-2.5 text-[11px] text-[var(--calm-text-muted)] border-t border-[var(--calm-border-soft)] pt-4">
                  <ShieldCheck className="h-4 w-4 text-[var(--color-brand-primary)] shrink-0 mt-0.5" />
                  <span>
                    Your message is handled under CEAPS university privacy ethics. If you are experiencing acute crisis, please call Tele-MANAS at 14416 (24/7 Free).
                  </span>
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
