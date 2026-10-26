import { Footer, PageContainer, SectionHeading, SiteHeader } from "@/components/site-shell";

export const metadata = {
  title: "Terms of Use | C.A.L.M Spaces · SGT University",
  description: "Terms of engagement, community conduct, and non-clinical safety boundaries for C.A.L.M Spaces.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <SiteHeader />
      <PageContainer>
        <SectionHeading
          eyebrow="Terms of Use"
          title="Terms of Engagement &amp; Platform Guidelines"
          description="These terms uphold a safe, respectful, and legally sound community ecosystem across C.A.L.M Spaces."
        />

        <div className="space-y-8 rounded-3xl border border-[var(--calm-border-soft)] bg-white p-8 sm:p-12 shadow-sm text-sm text-[var(--color-text-secondary)] leading-relaxed">
          <div>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">1. Purpose &amp; Educational Boundary</h3>
            <p className="mt-3">
              C.A.L.M Spaces is an official student well-being initiative operated at SGT University. The platform provides educational resources, peer listening circles, and access to campus counselling. <strong>It does not provide emergency medical intervention, psychiatric prescription services, or automated clinical diagnostics.</strong>
            </p>
          </div>

          <div className="border-t border-[var(--calm-border-soft)] pt-6">
            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">2. Community Standards &amp; Conduct</h3>
            <p className="mt-3">
              When participating in campus listening circles, workshops, or community discussions:
            </p>
            <ul className="mt-2 list-disc pl-5 space-y-1.5 text-xs">
              <li>Respect the dignity, privacy, and personal boundaries of fellow students and facilitators.</li>
              <li>Maintain confidentiality: what is shared in circles stays in circles.</li>
              <li>Harassment, hate speech, bullying, defamation, or unauthorized recording is strictly prohibited.</li>
            </ul>
          </div>

          <div className="border-t border-[var(--calm-border-soft)] pt-6">
            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">3. Emergency Situations</h3>
            <p className="mt-3">
              If you or someone around you is in immediate danger of self-harm, severe injury, or acute medical crisis, do not use web forms. Contact national 24/7 helplines such as Tele-MANAS (14416), emergency medical services (108), or campus hospital security immediately.
            </p>
          </div>

          <div className="border-t border-[var(--calm-border-soft)] pt-6">
            <h3 className="text-xl font-bold text-[var(--color-text-primary)]">4. Intellectual Property</h3>
            <p className="mt-3">
              The C.A.L.M Spaces name, official logo emblem, botanical brand assets, and educational publications are intellectual property of SGT University. Unauthorized commercial reproduction is prohibited.
            </p>
          </div>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
}
