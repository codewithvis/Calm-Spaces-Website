import Link from "next/link";
import { Activity, ArrowRight, BriefcaseMedical, Heart, ShieldCheck, Sparkles } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="border-b border-[var(--color-border)] bg-white/80 backdrop-blur-sm sticky top-0 z-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-sm">
              <Heart className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold text-[var(--color-text)]">Calm Spaces</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)]">Wellbeing platform</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink href="/about">About</NavLink>
            <NavLink href="/features">Features</NavLink>
            <NavLink href="/resources">Resources</NavLink>
            <NavLink href="/privacy">Privacy</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="hidden rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text)] sm:inline-flex">
              Sign in
            </Link>
            <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-primary-strong)]">
              Get started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-sm font-medium text-[var(--color-muted)] transition hover:text-[var(--color-text)]">
      {children}
    </Link>
  );
}

export function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">{children}</div>;
}

export function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="mb-8 max-w-2xl">
      {eyebrow ? <div className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">{eyebrow}</div> : null}
      <h2 className="text-3xl font-semibold tracking-tight text-[var(--color-text)] sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">{description}</p> : null}
    </div>
  );
}

export function AppShell({ role = "Student", children }: { role?: string; children: React.ReactNode }) {
  const links = [
    { href: "/dashboard", label: "Home" },
    { href: "/mood", label: "Mood" },
    { href: "/journal", label: "Journal" },
    { href: "/wellness", label: "Wellness" },
    { href: "/ai-assistant", label: "AI assistant" },
    { href: "/buddy-connect", label: "Buddy connect" },
    { href: "/experts", label: "Experts" },
    { href: "/appointments", label: "Appointments" },
    { href: "/profile", label: "Profile" },
    { href: "/settings", label: "Settings" },
    { href: "/sos", label: "Safety" },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-[var(--color-border)] bg-white/90 p-6 backdrop-blur lg:block">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-white">
            <Heart className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold">Calm Spaces</p>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">{role}</p>
          </div>
        </div>

        <nav className="space-y-2">
          {links.map((link) => (
            <Link href={link.href} key={link.href} className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-[var(--color-muted)] transition hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]">
              <span>{link.label}</span>
              <ArrowRight className="h-4 w-4 opacity-60" />
            </Link>
          ))}
        </nav>

        <div className="mt-10 rounded-2xl bg-[var(--color-surface)] p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--color-text)]">
            <ShieldCheck className="h-4 w-4 text-[var(--color-primary)]" />
            Safety
          </div>
          <p className="text-sm text-[var(--color-muted)]">If you need urgent support, access the SOS resources directly.</p>
        </div>
      </aside>

      <main className="lg:ml-72">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]">{role} dashboard</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--color-text)]">Welcome back</h1>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-muted)]">
              <Activity className="h-4 w-4 text-[var(--color-primary)]" />
              Online and ready
            </div>
          </header>
          {children}
        </div>
      </main>
    </div>
  );
}

export function MetricCard({ label, value, helper }: { label: string; value: string; helper: string }) {
  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-white p-5 shadow-sm">
      <p className="text-sm text-[var(--color-muted)]">{label}</p>
      <p className="mt-4 text-3xl font-semibold text-[var(--color-text)]">{value}</p>
      <p className="mt-2 text-sm text-[var(--color-muted)]">{helper}</p>
    </div>
  );
}

export function ShowcaseCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
      <div className="mb-4 inline-flex rounded-2xl bg-[var(--color-surface)] p-3 text-[var(--color-primary)]">{icon}</div>
      <h3 className="text-xl font-semibold text-[var(--color-text)]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{description}</p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-white/80">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-[var(--color-muted)] sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-medium text-[var(--color-text)]">Calm Spaces</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/dashboard">App</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
