import Link from "next/link";
import { ArrowRight, BookOpenText, Heart, Leaf, MapPin, MessageSquareText, ShieldCheck, Sparkles, UsersRound, Wind } from "lucide-react";
import { Footer, SiteHeader } from "@/components/site-shell";
import { MoodDiscovery, NeedDiscovery } from "@/components/mood-discovery";
import { institutionalIdentity, institutionalTeam } from "@/content/institutional";

const services = [
  { title: "One-on-one counselling", description: "Private, student-focused conversations for academic, personal, relationship, and transition concerns.", href: "/counselling", icon: MessageSquareText },
  { title: "C.A.L.M Companions", description: "Approachable peer-listener support from students who understand campus life.", href: "/calm-companions", icon: UsersRound },
  { title: "Wellness toolkit", description: "Breathing, grounding, focus, gratitude, reflection, and movement-based ways to take a moment.", href: "/wellness", icon: Wind },
  { title: "Resources and workshops", description: "Psycho-educational resources and campus programming to help you understand yourself a little better.", href: "/resources", icon: BookOpenText },
];

export default function HomePage() {
  const lead = institutionalTeam.find((member) => member.id === "parvneet-kaur");

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <SiteHeader />
      <main>
        <section className="border-b border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]">
          <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">
                <span>{institutionalIdentity.name}</span><span aria-hidden="true">/</span><span>CEAPS</span><span aria-hidden="true">/</span><span>SGT University</span>
              </div>
              <h1 className="mt-7 max-w-xl text-[clamp(3.5rem,8vw,6.75rem)] leading-[0.94] tracking-tight text-[var(--color-text-primary)]">You deserve a space to pause.</h1>
              <p className="mt-8 max-w-xl text-xl leading-9 text-[var(--color-text-secondary)]">{institutionalIdentity.shortBio} Take a breath, notice how you&apos;re feeling, and find the support that feels right for you.</p>
              <div className="mt-9 flex flex-wrap gap-4"><Link href="#check-in" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-6 py-3 text-sm font-medium text-white transition hover:bg-[var(--color-brand-primary-hover)]">Find your space <ArrowRight className="h-4 w-4" /></Link><Link href="/find-support" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] px-6 py-3 text-sm font-medium text-[var(--color-text-primary)]">Talk to someone</Link></div>
              <p className="mt-5 text-xs text-[var(--color-text-tertiary)]">A student wellbeing initiative under the aegis of CEAPS at SGT University.</p>
            </div>
            <div className="relative mx-auto w-full max-w-lg lg:justify-self-end">
              <div className="relative overflow-hidden border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-3 shadow-[var(--shadow-lg)] [clip-path:polygon(8%_0,100%_0,100%_88%,88%_100%,0_100%,0_12%)]">
                <div className="flex min-h-[420px] flex-col justify-between bg-[var(--color-brand-primary)] p-7 text-white sm:min-h-[500px] sm:p-10">
                  <div className="flex items-center justify-between text-sm"><span className="font-medium">A space between everything.</span><Leaf className="h-5 w-5" /></div>
                  <div><p className="max-w-sm font-[family-name:var(--font-display)] text-5xl leading-tight sm:text-6xl">Between pressure and pause.</p><p className="mt-6 max-w-sm text-sm leading-6 text-white/80">A place to reflect, reconnect, find support, and build the resilience to navigate university life.</p></div>
                  <div className="flex items-center gap-3 border-t border-white/25 pt-5 text-sm text-white/80"><Heart className="h-4 w-4" /> Take what helps. Leave what doesn&apos;t.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="check-in"><MoodDiscovery /></div>
        <NeedDiscovery />

        <section className="border-y border-[var(--color-border-default)] bg-[var(--color-surface-primary)]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">More than a counselling room</p><h2 className="mt-4 max-w-md text-5xl leading-tight">Support can look different for everyone.</h2></div><div className="grid gap-8 text-base leading-8 text-[var(--color-text-secondary)] sm:grid-cols-2"><p>{institutionalIdentity.officialBio}</p><p>C.A.L.M Spaces brings together counselling, peer support, support groups, listening circles, workshops, psycho-educational resources, reflective practices, and movement-based expressive activities so wellbeing can be part of student life before things feel overwhelming.</p></div></div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><div className="flex flex-col justify-between gap-5 border-b border-[var(--color-border-default)] pb-8 md:flex-row md:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">Ways we can support you</p><h2 className="mt-4 text-5xl leading-tight">Start with what feels possible.</h2></div><Link href="/find-support" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-link)]">Find support <ArrowRight className="h-4 w-4" /></Link></div><div className="mt-8 grid gap-x-8 gap-y-10 md:grid-cols-2">{services.map((service) => { const Icon = service.icon; return <Link href={service.href} key={service.title} className="group border-b border-[var(--color-border-subtle)] pb-8"><Icon className="h-6 w-6 text-[var(--color-brand-primary)]" /><h3 className="mt-5 text-2xl">{service.title}</h3><p className="mt-3 max-w-md text-sm leading-6 text-[var(--color-text-secondary)]">{service.description}</p><ArrowRight className="mt-5 h-4 w-4 text-[var(--color-text-tertiary)] transition-transform group-hover:translate-x-1" /></Link>; })}</div></section>

        <section className="bg-[var(--color-surface-sunken)]"><div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">Built within SGT University</p><h2 className="mt-4 text-5xl leading-tight">A student-facing space with an institutional home.</h2><p className="mt-5 max-w-lg text-base leading-7 text-[var(--color-text-secondary)]">C.A.L.M Spaces operates under the Centre of Excellence for Andragogical and Pedagogical Sciences (CEAPS), connecting student wellbeing with learning, growth, and personal development.</p><div className="mt-8 flex flex-wrap gap-4"><Link href="/about" className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-5 py-3 text-sm font-medium text-white">Our approach <ArrowRight className="h-4 w-4" /></Link><Link href="/team" className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border-default)] px-5 py-3 text-sm font-medium">Meet the team</Link></div></div><div className="grid gap-6 sm:grid-cols-2"><div className="border-t border-[var(--color-border-strong)] pt-5"><ShieldCheck className="h-6 w-6 text-[var(--color-brand-primary)]" /><h3 className="mt-5 text-2xl">Your privacy matters</h3><p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">Sensitive spaces are designed around protected account ownership and the existing security model. Public content never exposes private journal or mood data.</p></div><div className="border-t border-[var(--color-border-strong)] pt-5"><Sparkles className="h-6 w-6 text-[var(--color-brand-primary)]" /><h3 className="mt-5 text-2xl">The CALM framework</h3><p className="mt-3 text-sm leading-6 text-[var(--color-text-secondary)]">{institutionalIdentity.calmPhrase}</p></div></div></div></section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><div className="grid gap-10 border-b border-[var(--color-border-default)] pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">People who make it possible</p><h2 className="mt-4 text-5xl leading-tight">Support grounded in people.</h2></div><div className="flex items-start gap-5"><div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface-sunken)] text-lg">{lead?.name.split(" ").filter(Boolean).slice(-2).map((part) => part[0]).join("")}</div><div><h3 className="text-2xl">{lead?.name}</h3><p className="mt-1 text-sm font-medium text-[var(--color-brand-primary)]">{lead?.role}</p><p className="mt-3 max-w-xl text-sm leading-6 text-[var(--color-text-secondary)]">{lead?.bio}</p><Link href="/team" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-link)]">Meet the people behind C.A.L.M Spaces <ArrowRight className="h-4 w-4" /></Link></div></div></div></section>

        <section className="border-y border-[var(--color-border-default)] bg-[var(--color-bg-secondary)]"><div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">Find us on campus</p><h2 className="mt-4 text-5xl leading-tight">Come find your space.</h2></div><div className="flex gap-5"><MapPin className="h-6 w-6 shrink-0 text-[var(--color-brand-primary)]" /><div><h3 className="text-2xl">{institutionalIdentity.location.name}</h3>{institutionalIdentity.location.lines.map((line) => <p key={line} className="text-sm text-[var(--color-text-secondary)]">{line}</p>)}<p className="mt-5 text-sm leading-6 text-[var(--color-text-secondary)]">Directions, visiting information, and opening hours will be published after official campus confirmation.</p><Link href="/visit-us" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text-link)]">Visit us <ArrowRight className="h-4 w-4" /></Link></div></div></div></section>

        <section className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6 lg:px-8"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-brand-primary)]">Whenever you need it</p><h2 className="mx-auto mt-5 max-w-3xl text-5xl leading-tight">Whatever today feels like, you don&apos;t have to navigate it alone.</h2><div className="mt-9 flex flex-wrap justify-center gap-4"><Link href="/find-support" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-6 py-3 text-sm font-medium text-white">Find your space <ArrowRight className="h-4 w-4" /></Link><Link href="/visit-us" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--color-border-default)] px-6 py-3 text-sm font-medium">Visit C.A.L.M Spaces</Link></div><p className="mt-7 text-xs uppercase tracking-[0.16em] text-[var(--color-text-tertiary)]">C.A.L.M Spaces · CEAPS · SGT University</p></section>
      </main>
      <Footer />
    </div>
  );
}
