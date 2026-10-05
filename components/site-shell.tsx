import Link from "next/link";
import { Activity, ArrowRight, BookOpenText, Compass, Heart, House, LifeBuoy, MessageSquareText, Search, Settings2, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { SignOutButton } from "@/components/sign-out-button";
import { institutionalIdentity } from "@/content/institutional";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div>
              <div className="text-lg font-semibold tracking-tight text-[var(--color-text)]">{institutionalIdentity.name}</div>
              <div className="text-[10px] uppercase tracking-[0.16em] text-[var(--color-muted)]">CEAPS · SGT University</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <NavLink href="/about">About</NavLink>
            <NavLink href="/find-support">Find support</NavLink>
            <NavLink href="/wellness">Wellness</NavLink>
            <NavLink href="/resources">Resources</NavLink>
            <NavLink href="/events">Events</NavLink>
            <NavLink href="/contact">Contact</NavLink>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/resources" aria-label="Search resources" className="hidden h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted)] sm:inline-flex">
              <Search className="h-4 w-4" />
            </Link>
            <Link href="/auth/sign-in" className="hidden rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-text)] sm:inline-flex">
              I&apos;m already a member
            </Link>
            <Link href="/find-support" className="inline-flex items-center gap-2 rounded-full bg-[var(--color-sage-strong)] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[var(--color-sage)]">
              Talk to someone
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
  const groups = [
    {
      label: "Your space",
      links: [
        { href: "/dashboard", label: "Home", icon: House },
        { href: "/mood", label: "Check-in", icon: Heart },
        { href: "/patterns", label: "Your patterns", icon: Activity },
        { href: "/journal", label: "Journal", icon: BookOpenText },
      ],
    },
    {
      label: "Explore",
      links: [
        { href: "/wellness", label: "Wellness", icon: Sparkles },
        { href: "/create", label: "Create", icon: Sparkles },
        { href: "/resources", label: "Explore", icon: Compass },
        { href: "/community", label: "Community", icon: UsersRound },
      ],
    },
    {
      label: "Support",
      links: [
        { href: "/talk-space", label: "Talk Space", icon: MessageSquareText },
        { href: "/experts", label: "Experts", icon: ShieldCheck },
        { href: "/appointments", label: "Appointments", icon: Activity },
      ],
    },
    {
      label: "More",
      links: [
        { href: "/saved", label: "Saved", icon: BookOpenText },
        { href: "/notifications", label: "Notifications", icon: Sparkles },
        { href: "/profile", label: "Profile", icon: Heart },
        { href: "/settings", label: "Settings", icon: Settings2 },
        { href: "/sos", label: "Safety", icon: LifeBuoy },
      ],
    },
  ];
  const mobileLinks = [
    { href: "/dashboard", label: "Home", icon: House },
    { href: "/resources", label: "Explore", icon: Compass },
    { href: "/talk-space", label: "Support", icon: MessageSquareText },
    { href: "/journal", label: "Journal", icon: BookOpenText },
    { href: "/profile", label: "Profile", icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:block">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--color-sage)] text-white">
            <Heart className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold">Calm Spaces</p>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">Your space · {role}</p>
          </div>
        </div>

        <nav className="space-y-6">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--color-muted)]">{group.label}</p>
              <div className="space-y-1">
                {group.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link href={link.href} key={link.href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--color-muted)] transition hover:bg-[var(--color-surface-muted)] hover:text-[var(--color-text)]">
                      <Icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-8 rounded-2xl bg-[var(--color-surface-muted)] p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[var(--color-text)]">
            <ShieldCheck className="h-4 w-4 text-[var(--color-sage-strong)]" />
            Your privacy matters
          </div>
          <p className="text-sm text-[var(--color-muted)]">Your journal and check-ins stay within their protected spaces.</p>
          <SignOutButton />
        </div>
      </aside>

      <main className="pb-24 lg:ml-72 lg:pb-0">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-sage-strong)]">{role} · your space</p>
              <h1 className="mt-2 text-4xl tracking-tight text-[var(--color-text)]">Take things one moment at a time.</h1>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-muted)] sm:flex">
              <Activity className="h-4 w-4 text-[var(--color-sage-strong)]" />
              Here when you need it
            </div>
          </header>
          {children}
        </div>
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-[var(--color-border)] bg-[var(--color-surface)] px-2 py-2 lg:hidden">
        {mobileLinks.map((link) => {
          const Icon = link.icon;
          return (
            <Link href={link.href} key={link.href} className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-xl text-[10px] font-medium text-[var(--color-muted)]">
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function MetricCard({ label, value, helper }: { label: string; value: string; helper: string }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 shadow-[0_8px_24px_rgba(32,51,43,0.04)]">
      <p className="text-sm text-[var(--color-muted)]">{label}</p>
      <p className="mt-4 text-3xl font-semibold text-[var(--color-text)]">{value}</p>
      <p className="mt-2 text-sm text-[var(--color-muted)]">{helper}</p>
    </div>
  );
}

export function ShowcaseCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-[0_8px_24px_rgba(32,51,43,0.04)]">
      <div className="mb-4 inline-flex rounded-2xl bg-[var(--color-surface-muted)] p-3 text-[var(--color-sage-strong)]">{icon}</div>
      <h3 className="text-xl font-semibold text-[var(--color-text)]">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{description}</p>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-[var(--color-muted)] sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex items-center gap-3">
            <div><span className="font-medium text-[var(--color-text)]">{institutionalIdentity.name}</span><p className="mt-2 max-w-xs text-sm leading-6">A holistic student well-being space at SGT University, under CEAPS.</p></div>
          </div>
          <div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text)]">Explore</p><div className="space-y-2"><Link className="block" href="/about">About</Link><Link className="block" href="/how-it-works">How it works</Link><Link className="block" href="/for-students">For students</Link><Link className="block" href="/resources">Resources</Link><Link className="block" href="/help">Help center</Link></div></div>
          <div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text)]">Support</p><div className="space-y-2"><Link className="block" href="/safety">Safety</Link><Link className="block" href="/community-guidelines">Community guidelines</Link><Link className="block" href="/contact">Contact</Link><Link className="block" href="/for-professionals">For professionals</Link></div></div>
          <div><p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text)]">Legal</p><div className="space-y-2"><Link className="block" href="/privacy">Privacy</Link><Link className="block" href="/terms">Terms</Link><Link className="block" href="/for-institutions">For institutions</Link><Link className="block" href="/dashboard">Open your space</Link></div></div>
        </div>
      </div>
    </footer>
  );
}
