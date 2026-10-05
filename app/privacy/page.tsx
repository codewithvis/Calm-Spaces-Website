import { Footer, PageContainer, SectionHeading, SiteHeader } from "@/components/site-shell";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <SiteHeader />
      <PageContainer>
        <SectionHeading eyebrow="Privacy" title="Privacy and data protection" description="Calm Spaces takes a minimum-data and permission-based approach to personal wellbeing information." />

        <div className="space-y-6 rounded-3xl border border-[var(--color-border-default)] bg-[var(--color-surface-primary)] p-8">
          <div>
            <h3 className="text-xl font-semibold">Scope</h3>
            <p className="mt-3 text-base leading-7 text-[var(--color-muted)]">The platform should collect only the information needed for mood tracking, support workflows, and service delivery. The exact data inventory, retention periods, and user rights must be confirmed against the deployed Supabase project and approved institutional policy before launch.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Security</h3>
            <p className="mt-3 text-base leading-7 text-[var(--color-muted)]">The web client is designed for the existing Supabase Auth, row-level security, ownership rules, Storage policies, and server-side Edge Functions. Production privacy claims remain subject to verification against the deployed policies.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Your controls</h3>
            <p className="mt-3 text-base leading-7 text-[var(--color-muted)]">Profile, notification, accessibility, export, and account-deletion controls are being connected to the approved backend and institutional policy. The public site will not claim anonymity or confidentiality beyond those verified guarantees.</p>
          </div>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
}
