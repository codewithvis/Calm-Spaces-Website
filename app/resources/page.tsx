import { BookOpenText, Clock3, Headphones, PlayCircle, Search, Video } from "lucide-react";
import { Footer, PageContainer, SectionHeading, SiteHeader } from "@/components/site-shell";

const resources = [
  { title: "Managing overwhelm", type: "Article", icon: <BookOpenText className="h-5 w-5" />, summary: "A gentle framework for noticing when pressure is stacking up." },
  { title: "Calm breathing reset", type: "Audio", icon: <Headphones className="h-5 w-5" />, summary: "A short guided exercise built for moments of mental tension." },
  { title: "Mindful reset routine", type: "Video", icon: <Video className="h-5 w-5" />, summary: "A practical resource to re-ground attention and bring the breath back online." },
  { title: "Restoring attention", type: "Article", icon: <Clock3 className="h-5 w-5" />, summary: "How to recover focus after a difficult stretch without self-judgment." },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <SiteHeader />
      <PageContainer>
        <SectionHeading eyebrow="Resources" title="Support that is easy to discover" description="Browse practical, wellbeing-focused content that supports mood awareness, reflection, and sustainable routines." />

        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-[var(--color-border)] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-muted)]">
            <Search className="h-4 w-4" />
            Search resources
          </div>
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">
            <span className="rounded-full border border-[var(--color-border)] px-3 py-1">Articles</span>
            <span className="rounded-full border border-[var(--color-border)] px-3 py-1">Audio</span>
            <span className="rounded-full border border-[var(--color-border)] px-3 py-1">Videos</span>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {resources.map((resource) => (
            <article key={resource.title} className="rounded-3xl border border-[var(--color-border)] bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 rounded-full bg-[var(--color-surface)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-primary)]">
                  {resource.icon}
                  {resource.type}
                </div>
                <PlayCircle className="h-5 w-5 text-[var(--color-primary)]" />
              </div>
              <h3 className="text-2xl font-semibold">{resource.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[var(--color-muted)]">{resource.summary}</p>
            </article>
          ))}
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
}
