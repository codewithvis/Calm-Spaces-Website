import { Footer, PageContainer, SectionHeading, SiteHeader } from "@/components/site-shell";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <SiteHeader />
      <PageContainer>
        <SectionHeading eyebrow="Terms" title="Terms of use" description="These terms support a safe and respectful community experience for wellbeing support." />

        <div className="space-y-6 rounded-3xl border border-[var(--color-border)] bg-white p-8 text-base leading-7 text-[var(--color-muted)]">
          <p>Calm Spaces is a wellbeing and support platform intended for personal reflection, community support, and access to guidance tools. It is not a substitute for clinical diagnosis, emergency care, or professional medical treatment.</p>
          <p>Users are expected to use the platform respectfully and in a way that protects the privacy and safety of others. The platform may restrict or remove access where abuse, harassment, or unsafe behavior is detected.</p>
          <p>Support requests, expert sessions, and peer conversations should be handled with professionalism, privacy awareness, and clear boundaries. If a user is in immediate danger or a crisis, they should contact local emergency or crisis services immediately.</p>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
}
