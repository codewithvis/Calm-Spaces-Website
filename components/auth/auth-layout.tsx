"use client";

import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, HeartHandshake, Sparkles, ArrowLeft, PhoneCall, CheckCircle2 } from "lucide-react";

interface AuthLayoutProps {
  children: React.ReactNode;
  mode: "login" | "signup" | "reset";
}

export function AuthLayout({ children, mode }: AuthLayoutProps) {
  const highlights = [
    {
      icon: ShieldCheck,
      title: "100% Confidential & Secure",
      description: "Private student space protected with end-to-end encryption. Your reflections stay yours.",
    },
    {
      icon: HeartHandshake,
      title: "Peer & Clinical Network",
      description: "Trained student peer listeners and clinical counselors from CEAPS & Faculty of Behavioral Sciences.",
    },
    {
      icon: Sparkles,
      title: "Holistic Mental Well-being",
      description: "Daily mood check-ins, reflective journals, campus wellness workshops, and guided relaxation.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[var(--calm-white-warm)] text-[var(--color-text-primary)] antialiased flex flex-col justify-between selection:bg-[var(--calm-lavender-soft)] selection:text-[var(--calm-purple-deep)]">
      {/* Top Mobile Bar - Guarantees both logos are clean and never overlap */}
      <header className="lg:hidden border-b border-[var(--calm-border-soft)] bg-white/95 px-3 sm:px-5 py-2.5 backdrop-blur-md sticky top-0 z-30 shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
          {/* Back to Home */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-brand-primary)] transition shrink-0"
            aria-label="Back to Calm Spaces Homepage"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          {/* Both Main Logos */}
          <div className="flex items-center gap-2 shrink-0">
            {/* SGT University Logo */}
            <div className="relative h-8 w-auto rounded-lg bg-white p-0.5 border border-[var(--calm-border-soft)] shadow-xs flex items-center justify-center">
              <Image
                src="/sgt-university-logo.jpg"
                alt="SGT University Official Logo"
                width={1022}
                height={386}
                className="h-full w-auto max-w-[85px] sm:max-w-[105px] object-contain"
                priority
              />
            </div>

            {/* Elegant Divider */}
            <div className="h-5 w-px bg-[var(--calm-border-soft)] shrink-0" aria-hidden="true" />

            {/* Calm Spaces Logo */}
            <div className="relative h-8 w-auto rounded-lg bg-white p-0.5 border border-[var(--calm-border-soft)] shadow-xs flex items-center justify-center">
              <Image
                src="/calm-spaces-official-logo.png"
                alt="C.A.L.M Spaces Official Logo"
                width={450}
                height={330}
                className="h-full w-auto max-w-[75px] sm:max-w-[95px] object-contain"
                priority
              />
            </div>
          </div>

          {/* Quick Switch Action */}
          <div className="shrink-0 text-right">
            {mode === "login" ? (
              <Link
                href="/signup"
                className="inline-flex items-center rounded-full bg-[var(--calm-lavender-pale)] px-3 py-1 text-xs font-bold text-[var(--color-brand-primary)] hover:bg-[var(--calm-lavender-soft)] transition"
              >
                Sign Up
              </Link>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center rounded-full bg-[var(--calm-lavender-pale)] px-3 py-1 text-xs font-bold text-[var(--color-brand-primary)] hover:bg-[var(--calm-lavender-soft)] transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Split-Screen Container */}
      <main className="flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-60px)] lg:min-h-screen">
        {/* Left Visual Branding Panel (Desktop) */}
        <section
          aria-label="Calm Spaces community and mission"
          className="hidden lg:flex lg:w-1/2 xl:w-5/12 flex-col justify-between relative overflow-y-auto bg-gradient-to-br from-[#221233] via-[#3B1873] to-[#5926AA] text-white p-8 xl:p-12 selection:bg-[var(--calm-violet-secondary)] selection:text-white"
        >
          {/* Ambient Lighting Gradients */}
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[var(--calm-purple-primary)]/40 blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[var(--calm-pink-blush)]/20 blur-[100px] pointer-events-none" />

          {/* Subtle Botanical Watermark - strictly non-overlapping */}
          <div className="absolute right-0 bottom-6 opacity-10 pointer-events-none select-none z-0">
            <Image
              src="/botanical-motif.svg"
              alt=""
              width={340}
              height={340}
              className="object-contain"
              priority
            />
          </div>

          {/* Top Panel: Official Co-branded Logos */}
          <div className="relative z-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-white/80 hover:text-white transition group mb-6"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to main website</span>
            </Link>

            {/* BOTH Main Logos side-by-side in a glowing card container */}
            <div className="flex items-center gap-3 mb-6 bg-white/10 p-3 rounded-2xl border border-white/20 backdrop-blur-md w-fit shadow-xl">
              {/* SGT University Official Main Logo */}
              <div className="relative h-11 w-auto rounded-xl bg-white p-1.5 shadow-xs flex items-center justify-center shrink-0">
                <Image
                  src="/sgt-university-logo.jpg"
                  alt="SGT University Official Logo"
                  width={1022}
                  height={386}
                  className="h-full w-auto max-w-[130px] xl:max-w-[150px] object-contain"
                  priority
                />
              </div>

              {/* Vertical Divider */}
              <div className="h-8 w-px bg-white/30 shrink-0" aria-hidden="true" />

              {/* Calm Spaces Official Main Logo */}
              <div className="relative h-11 w-auto rounded-xl bg-white p-1 shadow-xs flex items-center justify-center shrink-0">
                <Image
                  src="/calm-spaces-official-logo.png"
                  alt="C.A.L.M Spaces Official Logo"
                  width={450}
                  height={330}
                  className="h-full w-auto max-w-[105px] xl:max-w-[125px] object-contain"
                  priority
                />
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-[11px] font-semibold text-white/90 backdrop-blur-md mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--calm-pink-blush)] animate-pulse" />
              <span>Official Student Emotional & Academic Well-being Hub</span>
            </div>

            <h1 className="text-2xl xl:text-3xl font-bold tracking-tight font-[family-name:var(--font-display)] leading-snug max-w-md text-white">
              {mode === "signup"
                ? "Join a judgment-free space designed for your peace of mind."
                : "Welcome back to your safe sanctuary on campus."}
            </h1>
            <p className="mt-3 text-xs xl:text-sm text-white/80 leading-relaxed max-w-md">
              Whether you need to reflect privately, talk to a peer listener, or book guidance with faculty psychologists, your journey starts here.
            </p>
          </div>

          {/* Middle Panel: Feature Highlights */}
          <div className="relative z-10 my-6 space-y-3.5">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 backdrop-blur-sm transition hover:bg-white/10 hover:border-white/20"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/15 text-[var(--calm-pink-blush)]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-white tracking-wide">{item.title}</h2>
                    <p className="mt-0.5 text-xs text-white/70 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Panel: Institutional Contact Information */}
          <div className="relative z-10 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-[11px] text-white/70">
            <div className="flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 shrink-0">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </span>
              <span>Room 10, Lower Ground Floor, A-Block</span>
            </div>
            <a
              href="tel:18001025661"
              className="inline-flex items-center gap-1.5 text-white hover:text-[var(--calm-pink-blush)] font-semibold transition"
            >
              <PhoneCall className="h-3 w-3 shrink-0" />
              <span>1800 102 5661</span>
            </a>
          </div>
        </section>

        {/* Right Form Interaction Panel - Never overflows or overlaps */}
        <section
          aria-label="Authentication form"
          className="flex-1 flex flex-col items-center justify-start py-8 sm:py-12 px-4 sm:px-8 lg:px-12 xl:px-16 bg-[var(--calm-white-warm)] overflow-y-auto"
        >
          <div className="w-full max-w-lg my-auto">
            {/* Top Desktop navigation row */}
            <div className="hidden lg:flex w-full items-center justify-between pb-6 mb-2">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--calm-text-muted)] hover:text-[var(--color-brand-primary)] transition group"
              >
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                <span>Back to home</span>
              </Link>

              <div className="text-xs text-[var(--calm-text-muted)]">
                {mode === "login" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/signup"
                      className="font-bold text-[var(--color-brand-primary)] hover:underline ml-1"
                    >
                      Create account
                    </Link>
                  </>
                ) : mode === "signup" ? (
                  <>
                    Already registered?{" "}
                    <Link
                      href="/login"
                      className="font-bold text-[var(--color-brand-primary)] hover:underline ml-1"
                    >
                      Sign in
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="font-bold text-[var(--color-brand-primary)] hover:underline"
                  >
                    Return to sign in
                  </Link>
                )}
              </div>
            </div>

            {/* Injected Form Component */}
            {children}

            {/* Bottom Security / Privacy Note */}
            <div className="mt-8 text-center text-xs text-[var(--calm-text-muted)] max-w-md mx-auto">
              <p>
                By accessing Calm Spaces, you adhere to the SGT University student well-being charter and institutional privacy guidelines.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
