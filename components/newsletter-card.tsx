"use client";

import { useState, useTransition } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { subscribeNewsletterAction } from "@/lib/actions/contact";

export function NewsletterCard() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [message, setMessage] = useState<{ text: string; success: boolean } | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consent) {
      setMessage({ text: "Please confirm that you agree to receive well-being updates.", success: false });
      return;
    }

    startTransition(async () => {
      const res = await subscribeNewsletterAction(email);
      setMessage({ text: res.message, success: res.success });
      if (res.success) {
        setEmail("");
        setConsent(false);
      }
    });
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[var(--calm-border-soft)] bg-gradient-to-br from-[var(--calm-lavender-pale)] via-white to-[var(--calm-lavender-soft)]/50 p-8 shadow-sm sm:p-12">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
          <Mail className="h-3.5 w-3.5" />
          <span>Stay Connected</span>
        </div>

        <h3 className="mt-4 text-2xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-3xl">
          Quiet Insights for Your Mind.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)] sm:text-base">
          Receive occasional psycho-educational reflections, upcoming workshop dates, and campus wellness announcements from the C.A.L.M Spaces team. No spam, ever.
        </p>

        {message ? (
          <div
            className={`mt-6 flex items-start gap-3 rounded-2xl border p-4 text-sm ${
              message.success
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-200 bg-red-50 text-red-800"
            }`}
          >
            {message.success && <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />}
            <span>{message.text}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-3">
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your university or personal email..."
                className="min-h-12 flex-1 rounded-full border border-[var(--calm-border-soft)] bg-white px-5 text-sm text-[var(--color-text-primary)] placeholder-[var(--calm-text-muted)] outline-none focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/15"
              />
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-6 text-sm font-semibold text-white shadow-sm hover:bg-[var(--color-brand-primary-hover)] transition shrink-0 disabled:opacity-60"
              >
                <span>{isPending ? "Subscribing…" : "Subscribe"}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <label className="flex items-start gap-2.5 text-xs text-[var(--color-text-secondary)] cursor-pointer pt-1">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 rounded border-[var(--calm-border-soft)] text-[var(--color-brand-primary)] focus:ring-[var(--color-brand-primary)]"
              />
              <span>
                I agree to receive student well-being updates from C.A.L.M Spaces. I can unsubscribe anytime.
              </span>
            </label>
          </form>
        )}
      </div>
    </div>
  );
}
