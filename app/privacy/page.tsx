import { Footer, PageContainer, SectionHeading, SiteHeader } from "@/components/site-shell";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <SiteHeader />
      <PageContainer>
        <SectionHeading eyebrow="Privacy" title="Privacy and data protection" description="Calm Spaces takes a minimum-data and permission-based approach to personal wellbeing information." />

        <div className="space-y-6 rounded-3xl border border-[var(--color-border)] bg-white p-8">
          <div>
            <h3 className="text-xl font-semibold">Scope</h3>
            <p className="mt-3 text-base leading-7 text-[var(--color-muted)]">The platform only collects the information needed for mood tracking, support workflows, and service delivery. This includes profile metadata, mood entries, journaling, bookings, and conversation content only where required by the app&apos;s business rules.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Security</h3>
            <p className="mt-3 text-base leading-7 text-[var(--color-muted)]">Calm Spaces follows a Supabase-backed security model with row-level security, ownership rules, and server-side enforcement for sensitive data. Client-side code must never be treated as an authorization boundary.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Your controls</h3>
            <p className="mt-3 text-base leading-7 text-[var(--color-muted)]">Users can manage profile details, visibility preferences, notification settings, and account deletion through the settings and profile areas of the authenticated experience.</p>
          </div>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
}
