"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Mail, ShieldCheck, User, Sparkles, Filter, X } from "lucide-react";
import { Footer, SiteHeader } from "@/components/site-shell";
import { officialTeamList, DetailedTeamMember, TeamRoleCategory } from "@/lib/data/team";

export default function TeamPage() {
  const [selectedCategory, setSelectedCategory] = useState<TeamRoleCategory | "All">("All");
  const [activeModalMember, setActiveModalMember] = useState<DetailedTeamMember | null>(null);

  const categories: Array<TeamRoleCategory | "All"> = [
    "All",
    "Leadership",
    "Psychological & Wellness",
    "Training & Faculty",
    "Peer Coordinators & Volunteers",
  ];

  const filteredTeam = officialTeamList.filter((m) =>
    selectedCategory === "All" ? true : m.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <SiteHeader />

      <main>
        {/* Header */}
        <section className="border-b border-[var(--calm-border-soft)] bg-gradient-to-b from-white via-[var(--calm-lavender-pale)]/50 to-white py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--calm-border-soft)] bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-brand-primary)]">
                <span>The People Behind C.A.L.M Spaces</span>
              </div>
              <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-extrabold tracking-tight text-[var(--color-text-primary)] sm:text-6xl leading-[1.1]">
                Support Grounded in Real People.
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-secondary)] sm:text-xl">
                Our multidisciplinary team brings together educational leadership, psychological expertise, soft skills training, and empathetic student peer mentors across SGT University.
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Grid */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-[var(--calm-border-soft)] pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--calm-text-muted)] mr-2 flex items-center gap-1.5">
              <Filter className="h-3.5 w-3.5" />
              <span>Category:</span>
            </span>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition ${
                  selectedCategory === cat
                    ? "bg-[var(--color-brand-primary)] text-white shadow-xs"
                    : "border border-[var(--calm-border-soft)] bg-white text-[var(--color-text-secondary)] hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Team Cards Grid */}
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredTeam.map((member) => (
              <article
                key={member.id}
                id={member.id}
                className="group flex flex-col justify-between rounded-3xl border border-[var(--calm-border-soft)] bg-white p-7 shadow-xs hover:border-[var(--color-brand-primary)] hover:shadow-xl transition duration-300"
              >
                <div>
                  {/* Top Avatar & Category */}
                  <div className="flex items-start justify-between">
                    <div
                      className="flex h-16 w-16 items-center justify-center rounded-2xl text-white font-[family-name:var(--font-display)] text-xl font-bold shadow-xs group-hover:scale-105 transition"
                      style={{ backgroundColor: member.avatarColor }}
                    >
                      {member.name.split(" ").filter(Boolean).slice(-2).map((p) => p[0]).join("")}
                    </div>
                    <span className="rounded-full bg-[var(--calm-lavender-pale)] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
                      {member.category}
                    </span>
                  </div>

                  {/* Name and Roles */}
                  <div className="mt-5">
                    <h2 className="text-xl font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-brand-primary)] transition">
                      {member.name}
                    </h2>
                    <p className="mt-1 text-xs font-bold text-[var(--color-brand-primary)]">
                      {member.primaryRole}
                    </p>
                    <p className="text-[11px] text-[var(--calm-text-muted)] font-medium">
                      {member.institutionalRole} · {member.department}
                    </p>
                  </div>

                  {/* Bio Preview */}
                  <p className="mt-4 text-xs leading-relaxed text-[var(--color-text-secondary)] line-clamp-3">
                    {member.bio}
                  </p>

                  {/* Focus Areas */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {member.focusAreas.map((focus) => (
                      <span
                        key={focus}
                        className="rounded-md border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] px-2 py-0.5 text-[10px] font-medium text-[var(--color-text-secondary)]"
                      >
                        {focus}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-7 flex items-center justify-between border-t border-[var(--calm-border-soft)] pt-4 text-xs">
                  <button
                    type="button"
                    onClick={() => setActiveModalMember(member)}
                    className="font-bold text-[var(--color-brand-primary)] hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>Read Full Profile</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-[var(--calm-text-muted)] hover:text-[var(--color-brand-primary)]"
                      title={`Email ${member.name}`}
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Institutional Note */}
          <div className="mt-16 rounded-3xl border border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-6 w-6 text-[var(--color-brand-primary)] shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
                <p className="font-bold text-sm text-[var(--color-text-primary)] mb-1">
                  Institutional Profile Governance &amp; Ethical Standards
                </p>
                <p>
                  Professional designations, degrees, and academic roles are authenticated through official CEAPS records and SGT University faculty documentation. All counsellors and peer mentors operate under established psychological confidentiality guidelines. No medical or psychiatric claims are made without certified institutional credentials.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Member Profile Modal */}
        {activeModalMember && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--calm-plum-deep)]/60 p-4 backdrop-blur-sm"
            onClick={() => setActiveModalMember(null)}
          >
            <div
              className="w-full max-w-xl overflow-hidden rounded-3xl border border-[var(--calm-border-soft)] bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between border-b border-[var(--calm-border-soft)] bg-[var(--calm-lavender-pale)] px-6 py-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-primary)]">
                  Verified Team Profile
                </span>
                <button
                  type="button"
                  onClick={() => setActiveModalMember(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-white text-[var(--calm-text-muted)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-2xl text-white font-[family-name:var(--font-display)] text-2xl font-bold"
                    style={{ backgroundColor: activeModalMember.avatarColor }}
                  >
                    {activeModalMember.name.split(" ").filter(Boolean).slice(-2).map((p) => p[0]).join("")}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">
                      {activeModalMember.name}
                    </h3>
                    <p className="text-sm font-bold text-[var(--color-brand-primary)]">
                      {activeModalMember.primaryRole}
                    </p>
                    <p className="text-xs text-[var(--calm-text-muted)]">
                      {activeModalMember.institutionalRole} · {activeModalMember.department}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] mb-2">
                    Biography &amp; Approach
                  </h4>
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {activeModalMember.bio}
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--calm-border-soft)] bg-[var(--calm-white-warm)] p-4 text-xs space-y-1.5">
                  <p><strong className="text-[var(--color-text-primary)]">Qualifications:</strong> {activeModalMember.qualifications}</p>
                  <p><strong className="text-[var(--color-text-primary)]">University Affiliation:</strong> {activeModalMember.university}</p>
                  {activeModalMember.email && (
                    <p><strong className="text-[var(--color-text-primary)]">Contact:</strong> {activeModalMember.email}</p>
                  )}
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-primary)] mb-2">
                    Key Areas of Responsibility
                  </h4>
                  <ul className="space-y-1.5 text-xs text-[var(--color-text-secondary)]">
                    {activeModalMember.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--color-brand-primary)] font-bold">•</span>
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
