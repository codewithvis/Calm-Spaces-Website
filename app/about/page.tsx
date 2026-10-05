import { PageContainer, SectionHeading, SiteHeader, Footer } from "@/components/site-shell";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <SiteHeader />
      <PageContainer>
        <SectionHeading
          eyebrow="About"
          title="A calm, trusted wellbeing platform built for real support"
          description="Calm Spaces exists to make it easier for students and campus communities to notice patterns, access support, and build practical habits around emotional care."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-[var(--color-border)] bg-white p-8">
            <h3 className="text-2xl font-semibold">Mission</h3>
            <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">To create a safe digital home where people can check in with themselves, access supportive resources, and connect with the right kind of help without feeling overwhelmed.</p>
          </article>
          <article className="rounded-3xl border border-[var(--color-border)] bg-white p-8">
            <h3 className="text-2xl font-semibold">Vision</h3>
            <p className="mt-4 text-base leading-7 text-[var(--color-muted)]">To bring together awareness, learning, movement, and community support in one calm and privacy-conscious platform that feels humane, professional, and easy to rely on.</p>
          </article>
        </div>

        <div className="mt-10 rounded-3xl border border-[var(--color-border)] bg-white p-8">
          <h3 className="text-2xl font-semibold">The CALM philosophy</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {[
              { title: "Cultivating", detail: "Consistent habits that make support easier to access." },
              { title: "Awareness", detail: "Noticing patterns in mood, energy, and wellbeing." },
              { title: "Learning", detail: "Using resources and reflection to build resilience." },
              { title: "Movement", detail: "Taking small actions that help people feel more grounded." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                <p className="text-lg font-semibold">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
}
