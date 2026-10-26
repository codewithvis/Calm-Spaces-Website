export type Initiative = {
  id: string;
  slug: string;
  title: string;
  category: "Expressive Arts" | "Peer Connection" | "Mindfulness & Movement" | "Academic Resilience" | "Awareness Campaigns";
  tagline: string;
  description: string;
  fullDescription: string;
  status: "Active" | "Upcoming" | "Seasonal" | "Completed";
  coverImage: string;
  pillars: Array<"Cultivating" | "Awareness" | "Lightness" | "Movement">;
  schedule: string;
  location: string;
  highlights: string[];
  departmentAffiliation: string;
  date?: string;
};

export const defaultInitiatives: Initiative[] = [
  {
    id: "one-on-one-counselling",
    slug: "one-on-one-counselling",
    title: "One on One Counselling",
    category: "Academic Resilience",
    tagline: "Private, confidential individualized psychological counselling.",
    description: "Personalized counselling sessions providing students with a safe, confidential space to navigate academic strain, personal distress, and emotional challenges.",
    fullDescription: "At C.A.L.M Spaces, One on One Counselling offers students individual, confidential support facilitated by professional psychologists. Whether you are dealing with academic overload, relationship distress, anxiety, or personal hurdles, sessions are tailored to help you build self-awareness, emotional regulation, and effective coping strategies in Room No. 10.",
    status: "Active",
    coverImage: "/botanical-motif.svg",
    pillars: ["Cultivating", "Awareness", "Lightness"],
    schedule: "Monday to Friday · 9:30 AM – 4:30 PM",
    location: "A Block, Lower Ground Floor, Room No. 10, SGT University",
    highlights: [
      "Strict confidentiality maintained in all interactions",
      "One-on-one sessions led by qualified psychological professionals",
      "Tailored strategies for academic stress, emotional regulation, and focus",
      "Walk-ins and scheduled appointments welcome"
    ],
    departmentAffiliation: "C.A.L.M Spaces · SGT University",
    date: "Ongoing",
  },
  {
    id: "support-groups",
    slug: "support-groups",
    title: "Support Groups",
    category: "Peer Connection",
    tagline: "Facilitated peer cohorts navigating shared student challenges.",
    description: "Structured group sessions providing mutual validation, shared experiences, and emotional solidarity for university students.",
    fullDescription: "Support Groups at C.A.L.M Spaces bring together students experiencing common challenges—such as academic transitions, adjusting to hostel life, performance anxiety, or loneliness. Guided by psychological facilitators, these groups create an empathetic community where students realize they are never alone in their struggles.",
    status: "Active",
    coverImage: "/botanical-motif.svg",
    pillars: ["Cultivating", "Awareness", "Lightness"],
    schedule: "Weekly Wednesdays · 3:30 PM – 4:45 PM",
    location: "A Block, Lower Ground Floor, Room No. 10, SGT University",
    highlights: [
      "Safe, respectful group agreements fostering trust and privacy",
      "Facilitated by psychological counsellors and peer mentors",
      "Builds resilience through shared perspectives and peer support",
      "Open to students from all faculties across SGT University"
    ],
    departmentAffiliation: "C.A.L.M Spaces · SGT University",
    date: "Semester-round",
  },
  {
    id: "listening-circles",
    slug: "listening-circles",
    title: "Listening Circles",
    category: "Peer Connection",
    tagline: "Non-judgmental, compassionate active listening containers.",
    description: "Intimate circles where students can express emotions openly, practice active empathetic listening, and be heard without interruption or advice-giving.",
    fullDescription: "Listening Circles are a core offering of C.A.L.M Spaces. They provide a calm, sacred space where students speak honestly about their lived experiences, vulnerabilities, and hopes. Grounded in empathetic presence, participants practice deep listening without judgment or unsolicited advice, fostering deep emotional relief.",
    status: "Active",
    coverImage: "/botanical-motif.svg",
    pillars: ["Awareness", "Lightness", "Movement"],
    schedule: "Every Thursday · 4:00 PM – 5:00 PM",
    location: "C.A.L.M Spaces Studio, Room No. 10, A Block",
    highlights: [
      "Focus on active listening rather than fixing or giving advice",
      "Fosters genuine human connection across campus disciplines",
      "Gentle somatic grounding exercises before and after each circle",
      "Co-facilitated with C.A.L.M Companions under professional supervision"
    ],
    departmentAffiliation: "C.A.L.M Spaces · SGT University",
    date: "Weekly",
  },
  {
    id: "calm-companions",
    slug: "calm-companions",
    title: "C.A.L.M Companions - Campus Peer Listeners Program",
    category: "Peer Connection",
    tagline: "Trained student peer listeners providing first-contact support.",
    description: "A student-led peer support network trained in compassionate listening, emotional first aid, and safe referrals across SGT University.",
    fullDescription: "The C.A.L.M Companions program empowers selected SGT University students to serve as compassionate peer listeners. Trained by CEAPS and C.A.L.M Spaces psychologists, companions provide accessible, stigma-free first-contact support across hostels, libraries, and campus zones, helping peers feel supported and seamlessly connecting them to professional counselling when needed.",
    status: "Active",
    coverImage: "/botanical-motif.svg",
    pillars: ["Cultivating", "Awareness", "Lightness"],
    schedule: "Ongoing Campus-wide Peer Support",
    location: "Room No. 10 & Across Campus Hubs, SGT University",
    highlights: [
      "Rigorous training in active listening and psychological first aid",
      "Relatable peer-to-peer approach reducing stigma around mental health",
      "Immediate, friendly campus presence in student spaces",
      "Direct supervision and guidance from C.A.L.M Spaces leadership"
    ],
    departmentAffiliation: "C.A.L.M Spaces · SGT University",
    date: "Active 2026",
  },
  {
    id: "change-management-series",
    slug: "change-management-series",
    title: "Change Management Series",
    category: "Academic Resilience",
    tagline: "Navigating transitions, academic shifts, and personal adaptability.",
    description: "Specialized workshops supporting students through critical transitions—from school-to-college shifts and career decisions to evolving learning methodologies.",
    fullDescription: "Change is constant in higher education. The Change Management Series equips SGT students with psychological adaptability and emotional flexibility. Sessions address the transition from school to university, curriculum changes, exam preparation pivots, and career transitions, ensuring students manage change with confidence rather than anxiety.",
    status: "Active",
    coverImage: "/botanical-motif.svg",
    pillars: ["Cultivating", "Awareness", "Movement"],
    schedule: "Bi-weekly Sessions · Friday Afternoons",
    location: "A Block, Room No. 10 / Seminar Hall",
    highlights: [
      "Practical cognitive frameworks for managing uncertainty and change",
      "Guidance on adapting to evolving learning methodologies",
      "Goal-setting, habit formation, and resilience toolkits",
      "Interactive group reflections and real-world scenario drills"
    ],
    departmentAffiliation: "C.A.L.M Spaces · SGT University",
    date: "Semester-round",
  },
  {
    id: "stress-management-series",
    slug: "stress-management-series",
    title: "Stress Management Series",
    category: "Mindfulness & Movement",
    tagline: "Practical cognitive, breathing, and somatic tools for decompression.",
    description: "Evidence-based stress reduction modules teaching somatic grounding, mindful movement, and cognitive reframing to lighten academic pressure.",
    fullDescription: "Embodying the 'Lightening Stress, and Healing through Movement' pillar, the Stress Management Series provides hands-on, experiential techniques for nervous system down-regulation. Students learn diaphragmatic breathing, progressive muscle relaxation, somatic walks, and cognitive restructuring to relieve chronic pressure and prevent burnout.",
    status: "Active",
    coverImage: "/botanical-motif.svg",
    pillars: ["Awareness", "Lightness", "Movement"],
    schedule: "Weekly Tuesdays · 4:00 PM – 5:00 PM",
    location: "A Block, Room No. 10 & Central Lawns",
    highlights: [
      "Somatic grounding and movement-based stress release",
      "Diaphragmatic breathing and guided mindfulness resets",
      "Exam stress coping toolkits and sleep hygiene guidance",
      "Take-home micro-practices for daily 5-minute de-stressing"
    ],
    departmentAffiliation: "C.A.L.M Spaces · SGT University",
    date: "Weekly",
  }
];

export function getInitiatives(): Initiative[] {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("calm_spaces_initiatives");
    if (local) {
      try {
        return JSON.parse(local);
      } catch (err) {
        console.error("Failed to parse local initiatives", err);
      }
    }
  }
  return defaultInitiatives;
}

export function getInitiativeBySlug(slug: string): Initiative | undefined {
  const all = getInitiatives();
  return all.find((item) => item.slug === slug);
}

export function saveInitiative(initiative: Initiative): void {
  if (typeof window === "undefined") return;
  const current = getInitiatives();
  const index = current.findIndex((item) => item.id === initiative.id);
  if (index >= 0) {
    current[index] = initiative;
  } else {
    current.unshift(initiative);
  }
  localStorage.setItem("calm_spaces_initiatives", JSON.stringify(current));
}
