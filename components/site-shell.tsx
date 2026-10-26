"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  Menu,
  X,
  ArrowRight,
  LifeBuoy,
  MapPin,
  Mail,
  Phone,
  Heart,
  House,
  BookOpenText,
  Compass,
  UsersRound,
  ShieldCheck,
  Settings2,
  Calendar,
  Sparkles,
  Activity,
} from "lucide-react";
import { BrandLogo, LogoLink } from "@/components/brand-logo";
import { SmartSearchModal } from "@/components/smart-search-modal";
import { AccessibilityToolbar } from "@/components/accessibility-toolbar";
import { SignOutButton } from "@/components/sign-out-button";
import { institutionalIdentity } from "@/content/institutional";

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/team", label: "Our Team" },
    { href: "/initiatives", label: "Initiatives" },
    { href: "/events", label: "Events" },
    { href: "/resources", label: "Resources" },
    { href: "/find-support", label: "Support" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--calm-border-soft)] bg-white/90 backdrop-blur-md transition-all">
        {/* Top institutional ribbon */}
        <div className="border-b border-[var(--calm-border-soft)]/60 bg-[var(--calm-lavender-pale)]/60 px-4 py-1.5 text-[10.5px] font-semibold text-[var(--color-brand-primary)] sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-brand-primary)]" />
              <span>Official Student Well-being Initiative · SGT University</span>
            </div>
            <div className="hidden items-center gap-4 text-[10px] text-[var(--calm-text-muted)] sm:flex">
              <span>Room No. 10, Lower Ground Floor, A Block</span>
              <span>•</span>
              <a href="tel:18001025661" className="hover:text-[var(--color-brand-primary)]">
                Helpline: 1800 102 5661
              </a>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-3 xl:gap-5">
            {/* Logo */}
            <LogoLink variant="full" className="shrink-0" />

            {/* Desktop Navigation Links (shown on xl screens where width permits without crowding) */}
            <nav className="hidden items-center gap-1 xl:flex shrink min-w-0" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-full px-2.5 py-1.5 xl:px-3 xl:py-2 text-xs font-semibold tracking-wide transition whitespace-nowrap ${
                      isActive
                        ? "bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)]"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--calm-white-warm)] hover:text-[var(--color-text-primary)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Action Tools */}
            <div className="flex items-center gap-2 xl:gap-2.5 shrink-0">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search website (Cmd+K)"
                title="Search website (Cmd+K)"
                className="inline-flex h-9 xl:h-10 items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-3 xl:px-3.5 text-xs text-[var(--calm-text-muted)] shadow-xs transition hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)] shrink-0"
              >
                <Search className="h-4 w-4" />
                <span className="hidden xl:inline">Search...</span>
                <kbd className="hidden rounded bg-[var(--calm-lavender-pale)] px-1.5 py-0.5 text-[9px] font-mono text-[var(--color-brand-primary)] xl:inline">
                  ⌘K
                </kbd>
              </button>

              {/* Accessibility Settings */}
              <div className="shrink-0">
                <AccessibilityToolbar />
              </div>

              {/* Sign In CTA */}
              <Link
                href="/login"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[var(--calm-border-soft)] bg-white px-3.5 py-2 text-xs font-bold text-[var(--color-brand-primary)] shadow-xs transition hover:border-[var(--color-brand-primary)] hover:bg-[var(--calm-lavender-pale)] shrink-0"
              >
                <span>Sign In</span>
              </Link>

              {/* Get Support Primary CTA */}
              <Link
                href="/find-support"
                className="hidden md:inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-4 py-2 xl:px-5 xl:py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:bg-[var(--color-brand-primary-hover)] shrink-0 whitespace-nowrap"
              >
                <span>Get Support</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--calm-border-soft)] bg-white text-[var(--color-text-primary)] xl:hidden shrink-0"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="border-b border-[var(--calm-border-soft)] bg-white px-4 py-6 shadow-xl xl:hidden">
            <nav className="space-y-1.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)]"
                        : "text-[var(--color-text-secondary)] hover:bg-[var(--calm-white-warm)] hover:text-[var(--color-text-primary)]"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="h-4 w-4 opacity-50" />
                  </Link>
                );
              })}
            </nav>

            <div className="mt-6 border-t border-[var(--calm-border-soft)] pt-5 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-full border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] py-2.5 text-xs font-bold text-[var(--color-brand-primary)] shadow-xs hover:bg-[var(--calm-lavender-pale)] transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-full border border-[var(--color-brand-primary)] bg-[var(--calm-lavender-pale)] py-2.5 text-xs font-bold text-[var(--color-brand-primary)] shadow-xs hover:bg-[var(--calm-lavender-soft)] transition"
                >
                  Create Account
                </Link>
              </div>

              <Link
                href="/find-support"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] py-3 text-sm font-bold uppercase tracking-wider text-white shadow-sm"
              >
                <span>Get Support</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[var(--calm-text-muted)]">
                <MapPin className="h-3.5 w-3.5" />
                <span>Room No. 10, A Block, SGT University</span>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SmartSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export function PageContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-10 max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export function ShowcaseCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-7 shadow-xs hover:border-[var(--color-brand-primary)] hover:shadow-md transition">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)] mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[var(--color-text-primary)]">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-[var(--color-text-secondary)]">{description}</p>
    </div>
  );
}

export function MetricCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-white p-5 shadow-xs">
      <p className="text-xs text-[var(--calm-text-muted)]">{label}</p>
      <p className="mt-3 text-3xl font-extrabold text-[var(--color-text-primary)]">{value}</p>
      <p className="mt-1 text-xs text-[var(--calm-text-muted)]">{helper}</p>
    </div>
  );
}

export function AppShell({ role = "Student", children }: { role?: string; children: React.ReactNode }) {
  const groups = [
    {
      label: "Your Space",
      links: [
        { href: "/dashboard", label: "Home", icon: House },
        { href: "/mood", label: "Check-in", icon: Heart },
        { href: "/patterns", label: "Your Patterns", icon: Activity },
        { href: "/journal", label: "Journal", icon: BookOpenText },
      ],
    },
    {
      label: "Explore",
      links: [
        { href: "/wellness", label: "Wellness", icon: Sparkles },
        { href: "/create", label: "Create", icon: Sparkles },
        { href: "/resources", label: "Resources", icon: Compass },
        { href: "/events", label: "Events", icon: Calendar },
        { href: "/initiatives", label: "Initiatives", icon: Sparkles },
        { href: "/community", label: "Community", icon: UsersRound },
      ],
    },
    {
      label: "Support",
      links: [
        { href: "/talk-space", label: "Talk Space", icon: LifeBuoy },
        { href: "/find-support", label: "Find Support", icon: LifeBuoy },
        { href: "/experts", label: "Experts", icon: ShieldCheck },
        { href: "/appointments", label: "Appointments", icon: Activity },
      ],
    },
    {
      label: "Management",
      links: [
        { href: "/admin", label: "Admin CMS", icon: Settings2 },
        { href: "/saved", label: "Saved", icon: BookOpenText },
        { href: "/profile", label: "Profile", icon: Heart },
        { href: "/sos", label: "Emergency Support", icon: LifeBuoy },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-[var(--calm-border-soft)] bg-white p-6 lg:block">
        <div className="mb-8">
          <LogoLink variant="compact" />
        </div>

        <nav className="space-y-6 overflow-y-auto max-h-[calc(100vh-220px)] pr-2">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--calm-text-muted)]">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.links.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      href={link.href}
                      key={link.href}
                      className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-[var(--color-text-secondary)] transition hover:bg-[var(--calm-lavender-pale)] hover:text-[var(--color-brand-primary)]"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] p-4 text-xs">
          <div className="flex items-center gap-2 font-bold text-[var(--color-brand-primary)] mb-1">
            <ShieldCheck className="h-4 w-4" />
            <span>Role: {role}</span>
          </div>
          <p className="text-[11px] text-[var(--calm-text-muted)] mb-3">Protected under university data standards.</p>
          <SignOutButton />
        </div>
      </aside>

      <main className="pb-24 lg:ml-72 lg:pb-12">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--calm-border-soft)] bg-white text-sm text-[var(--color-text-secondary)]">
      {/* Upper Footer: Brand and verified crisis notice */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <BrandLogo variant="full" showTagline={true} />
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[var(--color-text-secondary)]">
              {institutionalIdentity.officialBio}
            </p>
            <div className="space-y-1.5 text-xs text-[var(--calm-text-muted)] pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[var(--color-brand-primary)] shrink-0" />
                <span>A Block, Lower Ground Floor, Room No. 10, SGT University, Gurugram</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[var(--color-brand-primary)] shrink-0" />
                <a href="mailto:helpdesk.calmspaces@sgtuniversity.org" className="hover:text-[var(--color-brand-primary)]">
                  helpdesk.calmspaces@sgtuniversity.org
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[var(--color-brand-primary)] shrink-0" />
                <a href="tel:18001025661" className="hover:text-[var(--color-brand-primary)]">
                  Toll Free: 1800 102 5661 · Direct: +91 85277 94487
                </a>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="grid grid-cols-3 gap-8 lg:col-span-7">
            {/* Column 1: Explore */}
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-text-primary)]">
                Explore
              </p>
              <ul className="space-y-2.5 text-xs font-medium">
                <li><Link href="/about" className="hover:text-[var(--color-brand-primary)]">About Us</Link></li>
                <li><Link href="/team" className="hover:text-[var(--color-brand-primary)]">Our Team</Link></li>
                <li><Link href="/initiatives" className="hover:text-[var(--color-brand-primary)]">Initiatives</Link></li>
                <li><Link href="/events" className="hover:text-[var(--color-brand-primary)]">Campus Events</Link></li>
                <li><Link href="/resources" className="hover:text-[var(--color-brand-primary)]">Resource Library</Link></li>
                <li><Link href="/dashboard" className="hover:text-[var(--color-brand-primary)]">Student Portal</Link></li>
                <li><Link href="/login" className="hover:text-[var(--color-brand-primary)]">Sign In / Register</Link></li>
              </ul>
            </div>

            {/* Column 2: Support */}
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-text-primary)]">
                Support
              </p>
              <ul className="space-y-2.5 text-xs font-medium">
                <li><Link href="/find-support" className="hover:text-[var(--color-brand-primary)]">Find Support</Link></li>
                <li><Link href="/counselling" className="hover:text-[var(--color-brand-primary)]">Counselling</Link></li>
                <li><Link href="/calm-companions" className="hover:text-[var(--color-brand-primary)]">Peer Listeners</Link></li>
                <li><Link href="/safety" className="hover:text-[var(--color-brand-primary)]">Safety &amp; Ethics</Link></li>
                <li><Link href="/community-guidelines" className="hover:text-[var(--color-brand-primary)]">Community Rules</Link></li>
                <li><Link href="/contact" className="hover:text-[var(--color-brand-primary)]">Contact Us</Link></li>
              </ul>
            </div>

            {/* Column 3: Trust & Legal */}
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[var(--color-text-primary)]">
                Trust &amp; Access
              </p>
              <ul className="space-y-2.5 text-xs font-medium">
                <li><Link href="/accessibility" className="hover:text-[var(--color-brand-primary)]">Accessibility</Link></li>
                <li><Link href="/privacy" className="hover:text-[var(--color-brand-primary)]">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-[var(--color-brand-primary)]">Terms of Use</Link></li>
                <li><Link href="/admin" className="hover:text-[var(--color-brand-primary)]">Admin Panel</Link></li>
                <li><Link href="/for-students" className="hover:text-[var(--color-brand-primary)]">For Students</Link></li>
                <li><Link href="/for-institutions" className="hover:text-[var(--color-brand-primary)]">For Institutions</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Verified Indian Emergency Support Banner */}
        <div className="mt-12 rounded-2xl border border-[var(--calm-lavender-soft)] bg-[var(--calm-lavender-pale)] p-5 text-xs text-[var(--color-text-primary)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <LifeBuoy className="h-5 w-5 shrink-0 text-[var(--color-brand-primary)] mt-0.5" />
              <div>
                <p className="font-bold">Need Immediate Crisis or Emergency Support?</p>
                <p className="mt-0.5 text-[var(--calm-text-muted)]">
                  C.A.L.M Spaces provides educational &amp; non-emergency support. If you are experiencing acute crisis, call Government of India 24/7 Toll-Free Mental Health Helpline: <strong>Tele-MANAS: 14416</strong> or <strong>KIRAN: 1800-599-0019</strong>.
                </p>
              </div>
            </div>
            <Link
              href="/find-support#crisis"
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-[var(--calm-border-soft)] bg-white px-4 py-2 font-bold text-[var(--color-brand-primary)] hover:bg-[var(--calm-lavender-soft)] transition"
            >
              <span>Emergency Directory</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--calm-border-soft)] pt-8 text-xs text-[var(--calm-text-muted)] sm:flex-row">
          <p>© {new Date().getFullYear()} C.A.L.M Spaces · SGT University. All rights reserved.</p>
          <p className="text-[11px]">Cultivating Awareness, Lightness &amp; Movement</p>
        </div>
      </div>
    </footer>
  );
}
