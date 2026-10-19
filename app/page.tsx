import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpenText,
  Heart,
  Sparkles,
  MapPin,
  Calendar,
  UsersRound,
  Wind,
  ShieldCheck,
  CheckCircle2,
  Compass,
  MessageSquareText,
  Activity,
  Feather,
} from "lucide-react";
import { Footer, SiteHeader } from "@/components/site-shell";
import { MoodDiscovery, NeedDiscovery } from "@/components/mood-discovery";
import { CalmPhilosophyInteractive } from "@/components/calm-philosophy-interactive";
import { NewsletterCard } from "@/components/newsletter-card";
import { defaultInitiatives } from "@/lib/data/initiatives";
import { defaultEvents } from "@/lib/data/events";
import { defaultResources } from "@/lib/data/resources";
import { officialTeamList } from "@/lib/data/team";
import { institutionalIdentity } from "@/content/institutional";

export default function HomePage() {
  const featuredInitiatives = defaultInitiatives.slice(0, 4);
  const upcomingEvents = defaultEvents.filter((e) => e.status !== "Past").slice(0, 3);
  const featuredResources = defaultResources.slice(0, 4);
  const coreTeam = officialTeamList.slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      {/* SECTION 1 — Sticky Navigation */}
      <SiteHeader />

      <main>
        {/* SECTION 2 — Hero */}
        <section className="relative overflow-hidden border-b border-[var(--calm-border-soft)] bg-gradient-to-b from-white via-[var(--calm-lavender-pale)]/40 to-white py-16 lg:py-28">
          {/* Subtle botanical radiant gradients */}
          <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-[var(--calm-lavender-soft)]/50 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 top-20 h-96 w-96 rounded-full bg-[var(--calm-pink-blush)]/35 blur-3xl" />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-12">
              {/* Left Column: Expressive Typography & CTAs */}
              <div className="lg:col-span-7">
                {/* Institutional Pill */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-4 py-1.5 shadow-xs">
                  <span className="flex h-2 w-2 rounded-full bg-[var(--color-brand-primary)]" />
                  <span className="text-xs font-bold tracking-wider uppercase text-[var(--color-brand-primary)]">
                    CEAPS · SGT University
                  </span>
                </div>

                {/* Hero Headline */}
                <h1 className="mt-6 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-6xl lg:text-7xl leading-[1.08]">
                  Your Mind Deserves a Space to Bloom.
                </h1>

                {/* Supporting Copy */}
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl">
                  A welcoming space to cultivate awareness, embrace lightness and create meaningful movement towards emotional well-being — under the aegis of CEAPS at SGT University.
                </p>

                {/* CTA Hierarchy */}
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link
                    href="#initiatives"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--color-brand-primary)] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md hover:bg-[var(--color-brand-primary-hover)] transition-all hover:scale-[1.02]"
                  >
                    <span>Explore Calm Spaces</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/initiatives"
                    className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-7 py-3.5 text-sm font-semibold text-[var(--color-text-primary)] shadow-xs hover:border-[var(--color-brand-primary)] hover:bg-[var(--calm-lavender-pale)] transition"
                  >
                    <span>Discover Our Initiatives</span>
                  </Link>
                </div>

                {/* Location Quick Trust Tag */}
                <div className="mt-8 flex items-center gap-2.5 text-xs text-[var(--calm-text-muted)]">
                  <MapPin className="h-4 w-4 text-[var(--color-brand-primary)]" />
                  <span>Located at A Block, Lower Ground Floor, Room No. 10 · Walk-ins Welcome</span>
                </div>
              </div>

              {/* Right Column: Authentic Emblem & Botanical Composition */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="relative w-full max-w-md">
                  {/* Subtle blooming backdrop glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[var(--color-brand-primary)]/20 via-[var(--calm-violet-secondary)]/15 to-transparent blur-xl" />

                  {/* Framed Official Logo Card */}
                  <div className="relative overflow-hidden rounded-3xl border border-[var(--calm-border-soft)] bg-white p-5 shadow-xl sm:p-7">
                    <div className="relative aspect-[450/330] w-full overflow-hidden rounded-2xl bg-[var(--calm-lavender-pale)]/50 border border-[var(--calm-border-soft)]/60 flex items-center justify-center p-2">
                      <Image
                        src="/calm-spaces-official-logo.png"
                        alt="C.A.L.M Spaces Official Logo — Cultivating Awareness, Lightness & Movement"
                        width={450}
                        height={330}
                        className="h-full w-full object-contain drop-shadow-sm transition-transform duration-300 hover:scale-105"
                        priority
                      />
                    </div>

                    <div className="mt-5 rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-4 text-xs">
                      <div className="flex items-center justify-between text-[11px] font-bold text-[var(--color-brand-primary)]">
                        <span>C.A.L.M. FRAMEWORK</span>
                        <Sparkles className="h-3.5 w-3.5" />
                      </div>
                      <p className="mt-1 font-medium italic text-[var(--color-text-primary)]">
                        &ldquo;{institutionalIdentity.calmPhrase}&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Public Mood Discovery Interactive Section */}
        <div id="check-in">
          <MoodDiscovery />
        </div>

        {/* SECTION 3 — Introduction */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                <span>Who We Are</span>
              </div>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl leading-tight">
                More Than a Space. A Journey Towards Well-being.
              </h2>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-xl border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] px-3.5 py-1.5 text-xs font-semibold text-[var(--color-brand-primary)]">
                  Holistic Well-being Unit
                </span>
                <span className="rounded-xl border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] px-3.5 py-1.5 text-xs font-semibold text-[var(--color-brand-primary)]">
                  Under CEAPS aegis
                </span>
                <span className="rounded-xl border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] px-3.5 py-1.5 text-xs font-semibold text-[var(--color-brand-primary)]">
                  SGT University Campus
                </span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5 text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
              <p>
                {institutionalIdentity.officialBio}
              </p>
              <p>
                University life brings exciting milestones, but it also introduces transitions, rigorous assessments, and personal uncertainty. Calm Spaces exists so you never have to navigate academic strain or emotional vulnerability alone. Whether you drop by to breathe quietly, participate in an expressive art workshop, or talk through a challenge in complete confidence, this space is yours.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary-hover)] transition"
                >
                  <span>Learn about our mission and institutional framework</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — The C.A.L.M. Philosophy (Interactive) */}
        <CalmPhilosophyInteractive />

        {/* Public Need Discovery (Low-pressure entry points) */}
        <NeedDiscovery />

        {/* SECTION 5 — What We Do */}
        <section className="border-t border-[var(--calm-border-soft)] bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                <span>Our Core Activities</span>
              </div>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
                Support Built for Every Season of Campus Life.
              </h2>
              <p className="mt-3 text-base text-[var(--color-text-secondary)] sm:text-lg">
                We combine psychological education, peer empathy, somatic movement, and quiet reflection.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "One-on-One Counselling",
                  desc: "Private, confidential guidance with CEAPS psychologists in Room 10. For academic pressure, transitions, stress, and emotional regulation.",
                  href: "/counselling",
                  icon: MessageSquareText,
                  badge: "Confidential",
                },
                {
                  title: "C.A.L.M Companions",
                  desc: "Approachable peer support from trained student peer listeners who understand the authentic rhythm of university life.",
                  href: "/calm-companions",
                  icon: UsersRound,
                  badge: "Peer Support",
                },
                {
                  title: "Expressive Arts & Mindful Reset",
                  desc: "Workshops like 'Colour the Chaos', clay modeling, and mandalas to process emotions non-verbally and release mental clutter.",
                  href: "/initiatives#colour-the-chaos",
                  icon: Feather,
                  badge: "Creative Arts",
                },
                {
                  title: "Somatic Grounding & Walks",
                  desc: "Mindful morning campus walks and diaphragmatic breathing sessions across SGT University's green lawns.",
                  href: "/initiatives#mindful-campus-walks",
                  icon: Wind,
                  badge: "Movement",
                },
                {
                  title: "Exam Resilience & De-stress",
                  desc: "Targeted support modules providing sleep hygiene guidelines, test anxiety decompression, and cognitive stamina pacing.",
                  href: "/initiatives#exam-destress-hub",
                  icon: Sparkles,
                  badge: "Academic",
                },
                {
                  title: "Psycho-Educational Resource Hub",
                  desc: "Evidence-based articles, guided audio resets, video exercises, and downloadable student self-care manuals.",
                  href: "/resources",
                  icon: BookOpenText,
                  badge: "Educational",
                },
              ].map((activity) => {
                const AIcon = activity.icon;
                return (
                  <Link
                    key={activity.title}
                    href={activity.href}
                    className="group flex flex-col justify-between rounded-3xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-7 transition duration-300 hover:border-[var(--color-brand-primary)] hover:bg-white hover:shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--calm-lavender-pale)] text-[var(--color-brand-primary)] group-hover:bg-[var(--color-brand-primary)] group-hover:text-white transition duration-200">
                          <AIcon className="h-6 w-6" />
                        </div>
                        <span className="rounded-full border border-[var(--calm-border-soft)] bg-white px-2.5 py-0.5 text-[10px] font-bold text-[var(--color-brand-primary)]">
                          {activity.badge}
                        </span>
                      </div>

                      <h3 className="mt-5 text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)] transition">
                        {activity.title}
                      </h3>
                      <p className="mt-2.5 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                        {activity.desc}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-[var(--color-brand-primary)]">
                      <span>Explore activity</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 6 — Featured Initiatives */}
        <section id="initiatives" className="border-t border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)]/30 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--calm-border-soft)] bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                  <span>Signature Programs</span>
                </div>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
                  Featured Initiatives
                </h2>
                <p className="mt-2 text-base text-[var(--color-text-secondary)]">
                  Living programs designed to embed well-being into SGT student culture.
                </p>
              </div>

              <Link
                href="/initiatives"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)] shadow-xs hover:border-[var(--color-brand-primary)] hover:bg-[var(--calm-lavender-pale)] transition shrink-0"
              >
                <span>View All Initiatives</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredInitiatives.map((init) => (
                <article
                  key={init.id}
                  className="group flex flex-col justify-between rounded-3xl border border-[var(--calm-border-soft)] bg-white p-6 shadow-xs hover:border-[var(--color-brand-primary)] hover:shadow-lg transition duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-[var(--calm-lavender-pale)] px-2.5 py-1 text-[10px] font-bold text-[var(--color-brand-primary)] uppercase tracking-wider">
                        {init.category}
                      </span>
                      <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-md">
                        {init.status}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)] transition">
                      {init.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)] line-clamp-3">
                      {init.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {init.pillars.map((pillar) => (
                        <span
                          key={pillar}
                          className="rounded-md border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] px-2 py-0.5 text-[9.5px] font-medium text-[var(--calm-text-muted)]"
                        >
                          {pillar}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 border-t border-[var(--calm-border-soft)] pt-4">
                    <Link
                      href={`/initiatives#${init.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-brand-primary)] hover:underline"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7 — Meet the Team */}
        <section className="border-t border-[var(--calm-border-soft)] bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                  <span>Guiding Minds</span>
                </div>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
                  Meet the People Behind C.A.L.M Spaces
                </h2>
                <p className="mt-2 text-base text-[var(--color-text-secondary)]">
                  Grounding our work in institutional expertise, psychological care, and empathetic student support.
                </p>
              </div>

              <Link
                href="/team"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)] shadow-xs hover:border-[var(--color-brand-primary)] hover:bg-[var(--calm-lavender-pale)] transition shrink-0"
              >
                <span>Full Team Directory</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {coreTeam.map((member) => (
                <div
                  key={member.id}
                  className="rounded-3xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-7 shadow-xs hover:border-[var(--color-brand-primary)] hover:shadow-md transition"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-white font-[family-name:var(--font-display)] text-xl font-bold shadow-xs"
                      style={{ backgroundColor: member.avatarColor }}
                    >
                      {member.name.split(" ").filter(Boolean).slice(-2).map((p) => p[0]).join("")}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{member.name}</h3>
                      <p className="text-xs font-semibold text-[var(--color-brand-primary)]">{member.primaryRole}</p>
                      <p className="text-[11px] text-[var(--calm-text-muted)]">{member.institutionalRole}</p>
                    </div>
                  </div>

                  <p className="mt-5 text-xs leading-relaxed text-[var(--color-text-secondary)] line-clamp-4">
                    {member.bio}
                  </p>

                  <div className="mt-6 border-t border-[var(--calm-border-soft)] pt-4 text-xs font-semibold text-[var(--color-brand-primary)]">
                    <Link href={`/team#${member.id}`} className="inline-flex items-center gap-1.5 hover:underline">
                      <span>View verified profile</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 8 — Events and Activities */}
        <section className="border-t border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)]/40 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--calm-border-soft)] bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                  <span>Upcoming Programming</span>
                </div>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
                  Events &amp; Workshops
                </h2>
                <p className="mt-2 text-base text-[var(--color-text-secondary)]">
                  Make room on your calendar for what restores you.
                </p>
              </div>

              <Link
                href="/events"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)] shadow-xs hover:border-[var(--color-brand-primary)] hover:bg-[var(--calm-lavender-pale)] transition shrink-0"
              >
                <span>All Campus Events</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col justify-between rounded-3xl border border-[var(--calm-border-soft)] bg-white p-7 shadow-xs hover:border-[var(--color-brand-primary)] hover:shadow-lg transition"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="rounded-full bg-[var(--calm-lavender-pale)] px-3 py-1 font-bold text-[var(--color-brand-primary)]">
                        {event.category}
                      </span>
                      <span className="text-[11px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded-md">
                        {event.status}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-[var(--color-text-primary)]">
                      {event.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)] line-clamp-3">
                      {event.description}
                    </p>

                    <div className="mt-5 space-y-2 text-xs text-[var(--calm-text-muted)] border-t border-[var(--calm-border-soft)] pt-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
                        <span>{event.formattedDate} · {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--calm-border-soft)]">
                    <Link
                      href={`/events#${event.slug}`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--color-brand-primary)] py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-xs hover:bg-[var(--color-brand-primary-hover)] transition"
                    >
                      <span>Register / View Details</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9 — Resource Library Preview */}
        <section className="border-t border-[var(--calm-border-soft)] bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                  <span>Psycho-Educational Center</span>
                </div>
                <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
                  Curated Wellness Resources
                </h2>
                <p className="mt-2 text-base text-[var(--color-text-secondary)]">
                  Practical reads, audio breathing resets, and evidence-based self-care guides.
                </p>
              </div>

              <Link
                href="/resources"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)] shadow-xs hover:border-[var(--color-brand-primary)] hover:bg-[var(--calm-lavender-pale)] transition shrink-0"
              >
                <span>Browse Full Library</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featuredResources.map((res) => (
                <article
                  key={res.id}
                  className="group flex flex-col justify-between rounded-3xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-6 shadow-xs hover:border-[var(--color-brand-primary)] hover:bg-white hover:shadow-lg transition duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
                        {res.type}
                      </span>
                      <span className="text-[11px] text-[var(--calm-text-muted)] font-medium">
                        {res.readTime}
                      </span>
                    </div>

                    <h3 className="mt-3 text-lg font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)] transition">
                      {res.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)] line-clamp-3">
                      {res.summary}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-[var(--calm-border-soft)] pt-4 text-xs font-semibold text-[var(--color-brand-primary)]">
                    <Link href={`/resources#${res.slug}`} className="inline-flex items-center gap-1.5 hover:underline">
                      <span>Read Guide</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 10 & 11 — Student Engagement & Authentic Perspective */}
        <section className="border-t border-[var(--calm-border-soft)] bg-gradient-to-b from-[var(--calm-lavender-pale)]/50 to-white py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--calm-border-soft)] bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                  <span>Student Community</span>
                </div>
                <h2 className="font-[family-name:var(--font-display)] text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-4xl lg:text-5xl">
                  Who is Calm Spaces For?
                </h2>
                <p className="text-base leading-relaxed text-[var(--color-text-secondary)] sm:text-lg">
                  Calm Spaces is not just for moments of deep distress. It is for anyone who has felt exhausted after a long day in the clinical labs, anyone who is second-guessing their progress, anyone who needs 15 minutes of uninterrupted quiet, or anyone who simply wants to share a conversation with an empathetic peer.
                </p>

                <div className="space-y-3 pt-2 text-sm text-[var(--color-text-primary)]">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[var(--color-brand-primary)] shrink-0" />
                    <span>No clinical diagnosis required — accessible to every enrolled SGT student</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[var(--color-brand-primary)] shrink-0" />
                    <span>Strict confidentiality maintained under CEAPS psychological ethics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[var(--color-brand-primary)] shrink-0" />
                    <span>Drop-in lounge in Room 10 with herbal tea, reading nook, and creative space</span>
                  </div>
                </div>
              </div>

              {/* Mission Reflection Quote Card */}
              <div className="lg:col-span-6">
                <div className="rounded-3xl border border-[var(--calm-border-soft)] bg-white p-8 shadow-xl sm:p-10">
                  <span className="font-[family-name:var(--font-display)] text-5xl font-extrabold text-[var(--calm-violet-secondary)]">
                    &ldquo;
                  </span>
                  <p className="mt-2 text-base italic leading-relaxed text-[var(--color-text-primary)] sm:text-lg">
                    In university education, well-being is not separate from academic achievement; it is the ground from which true curiosity, resilience, and personal growth emerge. When a student feels safe to pause and reflect, their capacity to learn expands naturally.
                  </p>

                  <div className="mt-6 flex items-center gap-4 border-t border-[var(--calm-border-soft)] pt-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-brand-primary)] text-white font-bold">
                      AC
                    </div>
                    <div>
                      <p className="font-bold text-[var(--color-text-primary)]">Dr. Astha Chaudhry</p>
                      <p className="text-xs text-[var(--calm-text-muted)]">Professor &amp; Director, CEAPS · Patron, C.A.L.M Spaces</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription Box */}
            <div className="mt-16">
              <NewsletterCard />
            </div>
          </div>
        </section>

        {/* SECTION 12 — Closing CTA */}
        <section className="relative overflow-hidden border-t border-[var(--calm-border-soft)] bg-[var(--calm-plum-deep)] py-20 text-center text-white lg:py-28">
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[var(--color-brand-primary)] blur-3xl" />
            <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-[var(--calm-pink-blush)] blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--calm-violet-secondary)]">
              An Open Invitation
            </span>

            <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight">
              Every Mind Deserves a Little Space.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[var(--calm-lavender-soft)] sm:text-lg">
              Take a moment. Explore, understand and move towards a healthier relationship with yourself. We are right here on campus whenever you feel ready.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/find-support"
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[var(--calm-plum-deep)] shadow-lg hover:bg-[var(--calm-lavender-pale)] transition"
              >
                <span>Connect With Calm Spaces</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/20 transition backdrop-blur-xs"
              >
                <span>Visit Us in Room 10</span>
              </Link>
            </div>

            <p className="mt-8 text-xs uppercase tracking-[0.2em] text-[var(--calm-text-muted)]">
              C.A.L.M Spaces · CEAPS · SGT University
            </p>
          </div>
        </section>
      </main>

      {/* SECTION 13 — Footer */}
      <Footer />
    </div>
  );
}
