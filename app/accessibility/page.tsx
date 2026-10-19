"use client";

import Link from "next/link";
import { SlidersHorizontal, CheckCircle2, ShieldCheck, ArrowRight, Eye, Type, ZapOff } from "lucide-react";
import { Footer, SiteHeader } from "@/components/site-shell";
import { AccessibilityToolbar } from "@/components/accessibility-toolbar";

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <SiteHeader />

      <main>
        {/* Header */}
        <section className="border-b border-[var(--calm-border-soft)] bg-gradient-to-b from-white via-[var(--calm-lavender-pale)]/50 to-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                <span>Inclusion &amp; Universal Access</span>
              </div>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-6xl leading-[1.1]">
                Accessibility Statement &amp; User Controls
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl">
                C.A.L.M Spaces is committed to providing a digital wellness experience that is accessible, dignified, and usable by everyone, regardless of cognitive, physical, sensory, or situational needs.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Controls Box */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-8 sm:p-12 shadow-sm">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-[var(--calm-border-soft)] pb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
                  Live Browser Customization
                </span>
                <h2 className="mt-2 text-2xl font-bold text-[var(--color-text-primary)]">
                  Personalize Your Reading Experience
                </h2>
                <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                  Adjust typography sizing, toggle high-contrast colors, or halt motion. Preferences persist across all pages.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-[var(--calm-text-muted)]">Toolbar shortcut:</span>
                <AccessibilityToolbar />
              </div>
            </div>

            {/* Standard Commitments */}
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)] mb-4">
                  <Type className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">Typography &amp; Scale</h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  Scalable typography using rem units, generous line-heights (1.6 to 1.8), and clean letter-spacing ensuring high legibility for neurodivergent and low-vision visitors.
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)] mb-4">
                  <Eye className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">WCAG 2.2 AA Contrast</h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  Every text and interactive element maintains a contrast ratio exceeding 4.5:1 against its background. Deep plum on warm white provides crisp, non-fatiguing readability.
                </p>
              </div>

              <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)] mb-4">
                  <ZapOff className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">Respect for Reduced Motion</h3>
                <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                  All animations adhere to system <code className="text-[11px] font-mono bg-white px-1 py-0.5 rounded border">prefers-reduced-motion</code> and user toolbar overrides, eliminating vestibular triggers.
                </p>
              </div>
            </div>

            {/* Compliance Details */}
            <div className="mt-12 space-y-4 text-xs leading-relaxed text-[var(--color-text-secondary)] border-t border-[var(--calm-border-soft)] pt-8">
              <h3 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-wider">
                Compliance Status &amp; Technical Measures
              </h3>
              <p>
                The Calm Spaces digital platform conforms to the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA. Our engineering implementation includes:
              </p>
              <ul className="space-y-1.5 pl-4 list-disc">
                <li>Semantic HTML5 landmarks (<code className="font-mono text-[11px]">&lt;header&gt;</code>, <code className="font-mono text-[11px]">&lt;nav&gt;</code>, <code className="font-mono text-[11px]">&lt;main&gt;</code>, <code className="font-mono text-[11px]">&lt;article&gt;</code>, <code className="font-mono text-[11px]">&lt;footer&gt;</code>)</li>
                <li>Logical keyboard navigation with visible focus rings on all interactive elements</li>
                <li>Descriptive, non-generic alt text for all illustrations, emblems, and visual assets</li>
                <li>Proper form labelling, aria-live regions, and error announcements for screen readers</li>
                <li>Support for full keyboard shortcuts (e.g. Cmd+K / Ctrl+K for search)</li>
              </ul>
            </div>

            {/* Feedback & Assistance */}
            <div className="mt-10 rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] p-6 text-xs text-[var(--color-text-primary)]">
              <p className="font-bold">Accessibility Feedback &amp; Support</p>
              <p className="mt-1 text-[var(--calm-text-muted)]">
                If you encounter any difficulty accessing content or have suggestions for improving accessibility across the Calm Spaces platform, please contact our team at <a href="mailto:helpdesk.calmspaces@sgtuniversity.org" className="text-[var(--color-brand-primary)] font-bold hover:underline">helpdesk.calmspaces@sgtuniversity.org</a>.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
