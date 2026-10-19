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
    id: "colour-the-chaos",
    slug: "colour-the-chaos",
    title: "Colour the Chaos",
    category: "Expressive Arts",
    tagline: "Expressive arts, mandala painting, and creative emotional release.",
    description: "An expressive art therapy and mandala session designed to give students a tactile, non-verbal space to release cognitive tension, unwind from academic deadlines, and cultivate emotional lightness.",
    fullDescription: "Colour the Chaos is one of C.A.L.M Spaces' signature campus initiatives under CEAPS. Designed to bridge art and psychological decompression, this workshop provides students with canvasses, clay, watercolours, and meditative mandalas. Students are guided to engage with the creative process without focusing on artistic perfection, transforming internal pressure into spontaneous visual expression.",
    status: "Active",
    coverImage: "/botanical-motif.svg",
    pillars: ["Awareness", "Lightness", "Movement"],
    schedule: "Bi-weekly Wednesdays · 3:30 PM",
    location: "A Block, Room 10 & CEAPS Hall, SGT University",
    highlights: [
      "No prior artistic skills required; process-oriented rather than outcome-focused",
      "Facilitated by CEAPS psychological counsellors and soft skills trainers",
      "Guided somatic grounding and calming instrumental soundscape",
      "Dedicated reflection and gentle sharing circle at conclusion"
    ],
    departmentAffiliation: "CEAPS · SGT University",
    date: "Ongoing 2026",
  },
  {
    id: "listening-circles",
    slug: "listening-circles",
    title: "Listening Circles & Peer Support",
    category: "Peer Connection",
    tagline: "Confidential, respectful peer-facilitated safe spaces.",
    description: "Structured group circles where students can speak without fear of judgment, share the nuanced challenges of university life, and experience empathetic human connection.",
    fullDescription: "Listening Circles bring students together in small, confidential cohorts facilitated by trained C.A.L.M Companions under the supervision of CEAPS psychologists. Whether navigating transition away from home, academic pressure, relational friction, or personal isolation, the circle offers a non-judgmental container where every voice is heard and held in safety.",
    status: "Active",
    coverImage: "/botanical-motif.svg",
    pillars: ["Cultivating", "Awareness", "Lightness"],
    schedule: "Every Thursday · 4:00 PM – 5:15 PM",
    location: "C.A.L.M Spaces Studio, Lower Ground Floor, Room 10",
    highlights: [
      "Strict confidentiality guidelines upheld by all participants",
      "Co-facilitated by student peer listeners with professional oversight",
      "Emphasis on active listening rather than unsolicited advice-giving",
      "Seamless escalation to one-on-one psychological counselling if desired"
    ],
    departmentAffiliation: "C.A.L.M Spaces & CEAPS",
    date: "Semester-round",
  },
  {
    id: "mindful-campus-walks",
    slug: "mindful-campus-walks",
    title: "Mindful Campus Walks & Movement",
    category: "Mindfulness & Movement",
    tagline: "Connecting somatic grounding with natural open environments.",
    description: "Outdoor walking meditations utilizing SGT University's green campus spaces to reconnect attention to sensory presence and breath.",
    fullDescription: "Embodying the 'Movement' pillar of C.A.L.M Spaces, Mindful Campus Walks offer students a structured respite from screen fatigue and indoor classroom confinement. Participants are guided through sensory awareness exercises, rhythmic breathing, and progressive grounding techniques as they traverse designated campus routes.",
    status: "Active",
    coverImage: "/botanical-motif.svg",
    pillars: ["Awareness", "Movement"],
    schedule: "Tuesday Mornings · 8:00 AM – 8:45 AM",
    location: "Campus Amphitheatre & Central Lawns, SGT University",
    highlights: [
      "Gentle physical pacing accessible to all fitness levels",
      "Sensory grounding (5-4-3-2-1 technique in outdoor environments)",
      "Breathing synchronization for nervous system regulation",
      "Helps reset circadian rhythm and morning focus"
    ],
    departmentAffiliation: "CEAPS Department",
    date: "Weekly",
  },
  {
    id: "exam-destress-hub",
    slug: "exam-destress-hub",
    title: "Exam De-stress & Resilience Hub",
    category: "Academic Resilience",
    tagline: "Cognitive reframing, sleep hygiene, and panic management for assessments.",
    description: "Targeted support modules providing psycho-educational toolkits, quick breathing exercises, and drop-in decompression during midterm and end-term exam periods.",
    fullDescription: "Academic evaluations often evoke heightened anxiety and burnout. The Exam De-stress Hub provides targeted psycho-educational resources, physical relaxation stations, and drop-in counsellor check-ins specifically calibrated for exam preparation periods. Students learn practical grounding methods to manage physiological panic responses and maintain perspective.",
    status: "Seasonal",
    coverImage: "/botanical-motif.svg",
    pillars: ["Cultivating", "Lightness"],
    schedule: "Mid-term & End-term Examination Weeks",
    location: "C.A.L.M Spaces Room 10 & Central University Library Foyer",
    highlights: [
      "Drop-in 10-minute nervous system resets between revision sessions",
      "Evidence-based study pacing and cognitive fatigue management",
      "Herbal tea and quiet decompression lounge",
      "Instant access to anxiety reduction flashcards and audio resets"
    ],
    departmentAffiliation: "CEAPS · SGT University",
    date: "Examination Seasons",
  },
  {
    id: "mental-health-awareness-week",
    slug: "mental-health-awareness-week",
    title: "University Mental Health Awareness Week",
    category: "Awareness Campaigns",
    tagline: "Campus-wide dialogues, interactive exhibits, and stigma reduction.",
    description: "An annual collaborative symposium across all SGT faculties, featuring student showcases, expert panel discussions, and wellness resource distributions.",
    fullDescription: "Calm Spaces leads SGT University's annual Mental Health Awareness initiative, uniting departments from Medicine, Allied Health, Humanities, Engineering, and Law. Through creative booths, anonymous reflection walls, expert lectures, and cultural presentations, the initiative breaks the stigma surrounding psychological vulnerability on campus.",
    status: "Upcoming",
    coverImage: "/botanical-motif.svg",
    pillars: ["Cultivating", "Awareness", "Lightness", "Movement"],
    schedule: "Annual Flagship Event",
    location: "Main University Auditorium & Campus Lawns",
    highlights: [
      "Keynote sessions with esteemed mental health practitioners and authors",
      "Interactive myth-busting booths on psychological therapy and peer support",
      "Launch of updated student self-care toolkits and app features",
      "University-wide creative wellness competition"
    ],
    departmentAffiliation: "CEAPS · SGT University",
    date: "October 2026",
  },
  {
    id: "faculty-wellbeing-bridge",
    slug: "faculty-wellbeing-bridge",
    title: "Faculty & Mentor Well-being Bridge",
    category: "Academic Resilience",
    tagline: "Sensitizing educators and mentors to support student mental wellness.",
    description: "Workshops empowering faculty members with early identification skills for student psychological distress, empathetic communication, and referral protocols.",
    fullDescription: "Students often interact most closely with their professors and academic mentors. This program equips university educators with compassionate communication frameworks, helping them notice warning signs of anxiety, withdrawal, or academic distress, and smoothly connect students with C.A.L.M Spaces without stigma.",
    status: "Active",
    coverImage: "/botanical-motif.svg",
    pillars: ["Cultivating", "Awareness"],
    schedule: "Monthly Faculty Development Seminars",
    location: "CEAPS Conference Suite, SGT University",
    highlights: [
      "Non-clinical psychological first-aid guidelines for educators",
      "Standard operating procedures for supportive referral to Room 10",
      "Empathetic feedback techniques and deadline accommodation best practices",
      "Faculty self-care and secondary trauma prevention"
    ],
    departmentAffiliation: "CEAPS Department",
    date: "Monthly",
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
