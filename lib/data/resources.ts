export type ResourceItem = {
  id: string;
  slug: string;
  title: string;
  category: "Mental Health Awareness" | "Emotional Intelligence" | "Stress Management" | "Mindfulness & Grounding" | "Self-Awareness" | "Student Well-being" | "Academic Resilience";
  type: "Article" | "Guide" | "Audio Reset" | "Video" | "Downloadable PDF";
  readTime: string;
  summary: string;
  author: string;
  authorRole: string;
  departmentAffiliation: string;
  publishedDate: string;
  tags: string[];
  content: string[];
  keyTakeaways: string[];
  externalUrl?: string;
  downloadUrl?: string;
};

export const defaultResources: ResourceItem[] = [
  {
    id: "res-managing-overwhelm",
    slug: "managing-academic-overwhelm",
    title: "Understanding & Navigating Academic Overwhelm",
    category: "Stress Management",
    type: "Article",
    readTime: "5 min read",
    summary: "A gentle, evidence-grounded framework for recognizing when cognitive pressure is stacking up and how to step back safely.",
    author: "Ms. Parvneet Kaur",
    authorRole: "Lead Psychologist, C.A.L.M Spaces",
    departmentAffiliation: "SGT University",
    publishedDate: "October 14, 2026",
    tags: ["Burnout", "Stress", "Pacing", "Student Well-being"],
    content: [
      "Overwhelm rarely happens in a single moment. More often, it is an accumulation: three upcoming submissions, an unresolved disagreement with a hostel roommate, sleepless nights, and the subtle pressure of feeling like everyone else has things figured out.",
      "In psychology, we refer to cognitive load theory and allostatic load — the wear and tear on the body and nervous system when chronic demands exceed available coping reserves. When this happens, our prefrontal cortex (responsible for planning, decision-making, and emotional regulation) experiences fatigue.",
      "The first step in navigating overwhelm is not pushing through harder. It is radical acknowledgment: 'My nervous system is currently carrying more than its immediate capacity, and that is a biological signal, not a personal failing.'",
      "Try the 'Rule of Three Micro-Tasks': When your assignment list feels paralyzing, do not attempt to look at the entire syllabus. Select just three micro-actions that require 15 minutes each. Complete one, step away for five minutes, and allow your nervous system to register completion."
    ],
    keyTakeaways: [
      "Overwhelm is a physiological signal of depleted reserves, not an intellectual shortcoming.",
      "Differentiate between urgent tasks and tasks that feel falsely urgent due to anxiety.",
      "Use somatic pauses (slow exhalations, drinking water, unclenching jaw) before making scheduling decisions.",
      "C.A.L.M Spaces Room 10 offers drop-in quiet decompression whenever campus noise becomes too heavy."
    ]
  },
  {
    id: "res-diaphragmatic-reset",
    slug: "physiological-sigh-and-diaphragmatic-reset",
    title: "The Physiological Sigh: 3-Minute Autonomic Nervous System Reset",
    category: "Mindfulness & Grounding",
    type: "Audio Reset",
    readTime: "3 min exercise",
    summary: "The fastest scientifically validated breathing technique to down-regulate acute hyper-arousal and restore parasympathetic calm.",
    author: "C.A.L.M Spaces Wellness Team",
    authorRole: "Mindfulness & Movement Faculty",
    departmentAffiliation: "SGT University",
    publishedDate: "October 02, 2026",
    tags: ["Breathing", "Grounding", "Panic Relief", "Somatic"],
    content: [
      "The physiological sigh is an innate mammalian breathing pattern that spontaneously occurs before sleep and during crying. It was thoroughly studied by neurobiologists for its ability to immediately reopen collapsed alveoli in the lungs and rapidly offload excess carbon dioxide.",
      "When anxiety spikes — before an oral presentation, during an examination, or during acute conflict — our breathing tends to become shallow and rapid. By deliberately engaging two quick inhalations through the nose followed by an extended, audible exhalation through the mouth, we trigger the vagus nerve to slow the heart rate within 30 to 60 seconds.",
      "Practice Protocol: Take a deep breath in through your nose, then immediately take a second sharp 'top-off' inhalation. Then, slowly and smoothly, release all the air through your lips like you are sighing with relief. Repeat this pattern 3 to 5 times."
    ],
    keyTakeaways: [
      "Two nasal inhalations + one long oral exhalation = rapid vagal brake activation.",
      "Can be done silently in classrooms, examination halls, or hostel corridors without drawing attention.",
      "Lowers heart rate and dissipates muscle constriction in less than 2 minutes."
    ]
  },
  {
    id: "res-imposter-phenomenon",
    slug: "navigating-imposter-phenomenon-in-higher-education",
    title: "Navigating Imposter Feelings in University Life",
    category: "Emotional Intelligence",
    type: "Article",
    readTime: "7 min read",
    summary: "Why high-achieving students often feel like frauds, and how to disentangle your sense of self-worth from perfectionism.",
    author: "Dr. Astha Chaudhry",
    authorRole: "Patron, C.A.L.M Spaces · SGT University",
    departmentAffiliation: "SGT University",
    publishedDate: "September 28, 2026",
    tags: ["Self-Esteem", "Perfectionism", "Higher Education"],
    content: [
      "When students transition into professional degree programs — whether Medicine, Engineering, Law, Nursing, or Management — they frequently encounter a phenomenon first identified by psychologists Pauline Clance and Suzanne Imes: the internal belief that their achievements are accidental and that exposure is imminent.",
      "At SGT University, we see brilliant, dedicated students who quietly believe everyone else in their batch is inherently smarter, more disciplined, or better prepared. This cognitive distortion is exacerbated by social comparison in peer groups and social media.",
      "It is crucial to remember: Feeling unqualified is an emotion, not an evidentiary fact. When you enter a rigorous academic environment, cognitive discomfort is the actual feeling of new neural connections forming. Growth feels awkward before it feels natural.",
      "Build a 'Reality File': Keep an objective record of tasks you navigated, hurdles you overcame, and positive feedback from mentors. When the imposter voice speaks, counter it with documentary evidence rather than emotional rumination."
    ],
    keyTakeaways: [
      "Imposter phenomenon is common among motivated students entering challenging professional fields.",
      "Feelings of incompetence are not evidence of actual inadequacy.",
      "Talk openly with mentors and peer listeners in C.A.L.M Spaces; naming the feeling significantly reduces its power."
    ]
  },
  {
    id: "res-sleep-hygiene-guide",
    slug: "sleep-hygiene-and-circadian-restoration",
    title: "Circadian Health & Sleep Hygiene for College Students",
    category: "Student Well-being",
    type: "Guide",
    readTime: "6 min read",
    summary: "Practical, hostel-friendly adaptations for improving sleep quality, cognitive consolidation, and emotional stability.",
    author: "C.A.L.M Spaces Psychological Research Unit",
    authorRole: "Student Wellness Researchers",
    departmentAffiliation: "SGT University",
    publishedDate: "September 15, 2026",
    tags: ["Sleep", "Health", "Hostel Life", "Cognition"],
    content: [
      "Sleep is often the first currency students sacrifice when exam schedules intensify or campus social life extends late into the night. However, contemporary cognitive neuroscience shows that memory consolidation, emotional processing, and waste clearance in the brain (the glymphatic system) depend entirely on deep slow-wave and REM sleep cycles.",
      "Living in shared hostel dormitories creates unique sleep challenges: roommates on different schedules, ambient blue light from laptops, and irregular meal timings.",
      "Practical recommendations: 1) Anchor your morning wake-up time within a 30-minute window regardless of bedtime; 2) Get 10 minutes of direct morning sunlight on the university lawns; 3) Use an eye mask and earplugs if sharing a room; 4) Stop caffeine consumption by 2:00 PM."
    ],
    keyTakeaways: [
      "Consistent wake-up time is more critical for circadian rhythm than variable bedtime.",
      "Morning sunlight sets the melatonin release timer for approximately 14 hours later.",
      "Protecting 7 to 8 hours of sleep yields higher exam grades than all-night cramming."
    ]
  },
  {
    id: "res-listening-circle-pdf",
    slug: "peer-support-listening-circle-handbook",
    title: "C.A.L.M Companions: Peer Support & Active Listening Handbook",
    category: "Academic Resilience",
    type: "Downloadable PDF",
    readTime: "12-page manual",
    summary: "Official guidelines for active listening, non-judgmental holding space, psychological boundaries, and emergency referral protocols.",
    author: "C.A.L.M Spaces Editorial Team",
    authorRole: "C.A.L.M Spaces Framework",
    departmentAffiliation: "SGT University",
    publishedDate: "August 2026",
    tags: ["Handbook", "Peer Support", "Guidelines", "Training"],
    content: [
      "This handbook outlines the ethical and practical principles governing the C.A.L.M Companions peer-listener initiative at SGT University.",
      "Modules include: 1. Core Ethics of Confidentiality and Non-Judgment; 2. The Four Pillars of Active Listening; 3. Distinguishing Peer Support from Clinical Psychotherapy; 4. Crisis Protocol and Immediate Escalation Pathways to Professional Services."
    ],
    keyTakeaways: [
      "Peer listeners do not provide clinical therapy or diagnostic assessments.",
      "Complete confidentiality is maintained with the sole exception of immediate risk of self-harm or harm to others.",
      "Comprehensive referral directory for SGT University campus medical and psychological facilities."
    ],
    downloadUrl: "#download-handbook"
  },
  {
    id: "res-somatic-grounding-video",
    slug: "five-senses-somatic-grounding-practice",
    title: "5-4-3-2-1 Sensory Grounding: Step-by-Step Guided Exercise",
    category: "Mindfulness & Grounding",
    type: "Video",
    readTime: "4 min video",
    summary: "Visual and auditory guide for pulling attention out of spiraling worry thoughts and firmly back into present sensory reality.",
    author: "Ms. Vaishnavi",
    authorRole: "Soft Skills Trainer, SGT University",
    departmentAffiliation: "SGT University",
    publishedDate: "August 10, 2026",
    tags: ["Grounding", "Somatic", "Anxiety", "Video Guide"],
    content: [
      "When our mind is caught in anxious catastrophic loops ('What if I fail?', 'What if I am judged?'), the nervous system is reacting to mental images as if they were present physical threats.",
      "Sensory grounding interrupts this loop by demanding immediate cognitive bandwidth for physical sensory perception. Look around your space and name 5 things you can see, touch 4 distinct textures, identify 3 distinct sounds, notice 2 scents, and acknowledge 1 physical sensation or taste."
    ],
    keyTakeaways: [
      "Anchors attention in physical safety rather than mental projections.",
      "Engages concrete sensory pathways to interrupt autonomic panic cascades.",
      "Highly effective in waiting rooms, examination halls, and prior to meetings."
    ]
  }
];

export function getResources(): ResourceItem[] {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("calm_spaces_resources");
    if (local) {
      try {
        return JSON.parse(local);
      } catch (err) {
        console.error("Failed to parse local resources", err);
      }
    }
  }
  return defaultResources;
}

export function getResourceBySlug(slug: string): ResourceItem | undefined {
  const all = getResources();
  return all.find((item) => item.slug === slug);
}

export function getBookmarkedResourceIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("calm_spaces_bookmarks") || "[]");
  } catch {
    return [];
  }
}

export function toggleResourceBookmark(resourceId: string): boolean {
  if (typeof window === "undefined") return false;
  const current = getBookmarkedResourceIds();
  const exists = current.includes(resourceId);
  let updated: string[];
  if (exists) {
    updated = current.filter((id) => id !== resourceId);
  } else {
    updated = [...current, resourceId];
  }
  localStorage.setItem("calm_spaces_bookmarks", JSON.stringify(updated));
  return !exists;
}
