import { Footer, PageContainer, SectionHeading, SiteHeader } from "@/components/site-shell";

export default function ProfessionalsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]"><SiteHeader /><PageContainer><SectionHeading eyebrow="For professionals" title="Bring thoughtful support into the room" description="Calm Spaces gives qualified professionals and trained peer listeners a clear place to offer support within defined boundaries." /><div className="space-y-4">{[["Requirements", "Credentials, safeguarding expectations, and role-specific verification."], ["Responsibilities", "Respectful communication, privacy awareness, and clear escalation practices."], ["How it works", "Set availability, offer sessions, and support people through the existing role-based workflows."], ["Interested?", "Contact the Calm Spaces team to learn about the current application process."]].map(([title, description]) => <div key={title} className="flex flex-col gap-2 border-t border-[var(--color-border)] py-5 sm:flex-row sm:items-center sm:justify-between"><h3 className="text-2xl text-[var(--color-text)]">{title}</h3><p className="max-w-xl text-sm leading-6 text-[var(--color-muted)]">{description}</p></div>)}</div></PageContainer><Footer /></div>
  );
}
