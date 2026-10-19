import { Footer, PageContainer, SectionHeading, SiteHeader } from "@/components/site-shell";

export const metadata = {
  title: "Privacy Policy | C.A.L.M Spaces · SGT University",
  description: "Transparent privacy practices protecting student well-being, psychological confidentiality, and database ownership rules under CEAPS.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <SiteHeader />
      <PageContainer>
        <SectionHeading
          eyebrow="Privacy Policy"
          title="Privacy, Data Protection &amp; Psychological Ethics"
          description="C.A.L.M Spaces adheres to a strict minimum-data, least-privilege, and permission-based approach to personal wellbeing information."
        />

        <div className="space-y-8 rounded-3xl border border-[var(--calm-border-soft)] bg-white p-8 sm:p-12 shadow-sm text-sm text-[var(--color-text-secondary)] leading-relaxed">
          <div>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">1. Ethical Stance &amp; Purpose</h3>
            <p className="mt-3">
              C.A.L.M Spaces functions under the aegis of the Centre of Excellence for Andragogical and Pedagogical Sciences (CEAPS) at SGT University. We recognize that mental wellness data is deeply personal. Our platform is architected so that public visitors can access resources, toolkits, and information without creating accounts or surrendering identity.
            </p>
          </div>

          <div className="border-t border-[var(--calm-border-soft)] pt-6">
            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">2. Psychological Confidentiality</h3>
            <p className="mt-3">
              Information shared during one-on-one counselling sessions in Room No. 10 or within C.A.L.M Companions peer listening circles is held under professional clinical and ethical secrecy guidelines. It is <strong>never</strong> added to your academic transcript, shared with professors, or disclosed to campus administrative bodies.
            </p>
            <p className="mt-2 text-xs text-[var(--calm-text-muted)]">
              The sole limitation to confidentiality, as governed by Indian law and psychological ethics, occurs if there is an acute, imminent risk of self-harm or harm to others, where emergency medical care must be mobilized to protect life.
            </p>
          </div>

          <div className="border-t border-[var(--calm-border-soft)] pt-6">
            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">3. Data Collected &amp; Architecture</h3>
            <ul className="mt-3 space-y-2 list-disc pl-5 text-xs">
              <li><strong>Public Browsing:</strong> No tracking cookies, no cross-site surveillance scripts. Anonymous mood tile check-ins remain solely in your local browser state.</li>
              <li><strong>Event Registration:</strong> Name, university email, and student ID collected strictly to ensure room capacity and communicate venue confirmations.</li>
              <li><strong>Inquiry Submissions:</strong> Processed through secure server routes and stored in encrypted database modules accessible only to authorized CEAPS administrators.</li>
              <li><strong>Member Accounts:</strong> Profile, journal entries, and private check-ins are protected via PostgreSQL Row Level Security (RLS) ensuring that only your authenticated session can query your records.</li>
            </ul>
          </div>

          <div className="border-t border-[var(--calm-border-soft)] pt-6">
            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">4. Student Rights &amp; Data Deletion</h3>
            <p className="mt-3">
              You retain total ownership of your notes and entries. At any time, you can export your reflections or execute complete account deletion through the account settings panel, which invokes the automated <code className="font-mono text-xs bg-[var(--calm-lavender-pale)] px-1.5 py-0.5 rounded">delete-user-auth</code> service.
            </p>
          </div>

          <div className="border-t border-[var(--calm-border-soft)] pt-6">
            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">5. Contact Regarding Privacy</h3>
            <p className="mt-3">
              If you have any questions or data concerns, contact the CEAPS data steward at <a href="mailto:helpdesk.calmspaces@sgtuniversity.org" className="text-[var(--color-brand-primary)] font-bold hover:underline">helpdesk.calmspaces@sgtuniversity.org</a>.
            </p>
          </div>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
}
