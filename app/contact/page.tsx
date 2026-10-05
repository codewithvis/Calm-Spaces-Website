import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Footer, PageContainer, SectionHeading, SiteHeader } from "@/components/site-shell";
import { institutionalIdentity } from "@/content/institutional";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <SiteHeader />
      <PageContainer>
        <SectionHeading eyebrow="Contact" title="Support and questions" description="We’re here to help with technical or wellbeing support questions." />

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-primary)] p-6">
            <Mail className="mb-4 h-8 w-8 text-[var(--color-primary)]" />
            <h3 className="text-xl font-semibold">Email</h3>
            {institutionalIdentity.ceapsContact.map((email) => <a key={email} href={`mailto:${email}`} className="mt-2 block text-[var(--color-text-link)] underline underline-offset-4">{email}</a>)}
            <a href={`mailto:${institutionalIdentity.appSupportEmail}`} className="mt-2 block text-[var(--color-text-link)] underline underline-offset-4">{institutionalIdentity.appSupportEmail}</a>
          </div>
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-primary)] p-6">
            <Phone className="mb-4 h-8 w-8 text-[var(--color-primary)]" />
            <h3 className="text-xl font-semibold">Phone</h3>
            <a href={`tel:${institutionalIdentity.universityPhone.replaceAll(" ", "")}`} className="mt-3 block text-[var(--color-text-link)] underline underline-offset-4">{institutionalIdentity.universityPhone}</a>
            <a href={`tel:${institutionalIdentity.appSupportPhone.replaceAll(" ", "")}`} className="mt-2 block text-[var(--color-text-link)] underline underline-offset-4">{institutionalIdentity.appSupportPhone}</a>
          </div>
          <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-primary)] p-6">
            <MapPin className="mb-4 h-8 w-8 text-[var(--color-primary)]" />
            <h3 className="text-xl font-semibold">Campus support</h3>
            {institutionalIdentity.location.lines.map((line) => <p key={line} className="text-sm text-[var(--color-muted)]">{line}</p>)}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-primary)] p-8">
          <p className="text-base text-[var(--color-muted)]">For urgent support or a crisis, use the emergency and safety resources from the app and contact local crisis services immediately.</p>
          <Link href="/sos" className="mt-4 inline-flex rounded-full bg-[var(--color-brand-primary)] px-5 py-2 text-sm font-medium text-white">Open safety resources</Link>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
}
