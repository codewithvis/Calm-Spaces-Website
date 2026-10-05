import { BookOpenText, BrainCircuit, HeartHandshake, MessageSquareText, ShieldCheck, Sparkles } from "lucide-react";
import { Footer, PageContainer, SectionHeading, ShowcaseCard, SiteHeader } from "@/components/site-shell";

const cards = [
  { title: "Mood & self-awareness", description: "Daily check-ins with mood trends, calendar summaries, and supportive prompts.", icon: <HeartHandshake className="h-6 w-6" /> },
  { title: "Journaling", description: "A private reflective space for tracking thoughts, energy, and your lived experience.", icon: <BookOpenText className="h-6 w-6" /> },
  { title: "Mindfulness & grounding", description: "Breathing, focus, movement, and grounding tools to create practical routines.", icon: <BrainCircuit className="h-6 w-6" /> },
  { title: "Creative expression", description: "Mandala coloring and doodling support creative calm and emotional regulation.", icon: <Sparkles className="h-6 w-6" /> },
  { title: "Peer support", description: "Support requests and conversations with peer listeners in a privacy-aware model.", icon: <MessageSquareText className="h-6 w-6" /> },
  { title: "Professional support", description: "Schedule and manage expert sessions with availability and consultation workflows.", icon: <ShieldCheck className="h-6 w-6" /> },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <SiteHeader />
      <PageContainer>
        <SectionHeading
          eyebrow="Features"
          title="An integrated wellbeing experience"
          description="The platform combines reflection, support, and practical coping tools to help people move through challenge with clarity and care."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <ShowcaseCard key={card.title} title={card.title} description={card.description} icon={card.icon} />
          ))}
        </div>
      </PageContainer>
      <Footer />
    </div>
  );
}
