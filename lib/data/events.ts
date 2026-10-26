export type EventItem = {
  id: string;
  slug: string;
  title: string;
  category: "Workshop" | "Seminar" | "Listening Circle" | "Mindfulness" | "Campaign";
  description: string;
  fullDescription: string;
  date: string; // ISO date YYYY-MM-DD
  formattedDate: string;
  time: string;
  location: string;
  facilitator: string;
  facilitatorRole: string;
  capacity: number;
  registeredCount: number;
  status: "Upcoming" | "Past" | "Registration Open" | "Full";
  coverImage: string;
  tags: string[];
  departmentAffiliation: string;
};

export type EventRegistration = {
  id: string;
  eventId: string;
  eventTitle: string;
  studentName: string;
  studentEmail: string;
  studentId: string;
  facultyDepartment: string;
  registeredAt: string;
  notes?: string;
};

export const defaultEvents: EventItem[] = [
  {
    id: "evt-colour-chaos-oct",
    slug: "colour-the-chaos-october",
    title: "Colour the Chaos: Autumn Mandala & Mindfulness",
    category: "Workshop",
    description: "Unplug from the rush of assignments with guided expressive mandala drawing, rhythmic music, and non-judgmental decompression.",
    fullDescription: "Join the C.A.L.M Spaces team for an afternoon dedicated to creative decompression. Using mandalas, watercolors, and textured pastels, we explore art as an experiential container for releasing cognitive clutter. No artistic expertise is required — this workshop is about breathing, grounding, and making space for yourself.",
    date: "2026-10-28",
    formattedDate: "Wednesday, October 28, 2026",
    time: "3:30 PM – 5:00 PM",
    location: "C.A.L.M Spaces Studio, A Block Room 10, SGT University",
    facilitator: "Ms. Parvneet Kaur & Ms. Vaishnavi",
    facilitatorRole: "Lead Psychologist & Soft Skills Trainer",
    capacity: 25,
    registeredCount: 18,
    status: "Registration Open",
    coverImage: "/botanical-motif.svg",
    tags: ["Expressive Arts", "Mindfulness", "De-stress"],
    departmentAffiliation: "SGT University",
  },
  {
    id: "evt-listening-circle-thurs",
    slug: "thursday-student-listening-circle",
    title: "Student Listening Circle: Navigating Mid-Semester Transitions",
    category: "Listening Circle",
    description: "A small, confidential circle facilitated by trained C.A.L.M Companions and psychological counsellors for open sharing and mutual validation.",
    fullDescription: "Mid-semester can bring unexpected isolation, changing friendships, and academic strain. Our weekly listening circle provides an unhurried, confidential container where SGT University students can express what is truly present without being rushed or offered uninvited fixes.",
    date: "2026-11-05",
    formattedDate: "Thursday, November 5, 2026",
    time: "4:00 PM – 5:15 PM",
    location: "Quiet Reflection Room, A Block, SGT University",
    facilitator: "C.A.L.M Companions Peer Team",
    facilitatorRole: "Supervised by Psychological Faculty",
    capacity: 12,
    registeredCount: 8,
    status: "Registration Open",
    coverImage: "/botanical-motif.svg",
    tags: ["Peer Support", "Safe Space", "Confidential"],
    departmentAffiliation: "C.A.L.M Spaces · SGT University",
  },
  {
    id: "evt-somatic-grounding-walk",
    slug: "morning-mindful-campus-walk",
    title: "Somatic Grounding & Campus Green Walk",
    category: "Mindfulness",
    description: "Start your morning with sensory outdoor grounding, diaphragmatic pacing, and mindful movement across SGT green lawns.",
    fullDescription: "Before classes and screens demand your full attention, gift yourself 45 minutes of movement. Led by our wellness facilitators, this walk combines five-sense somatic anchoring, slow rhythmic pacing, and natural grounding on the university central grounds.",
    date: "2026-11-10",
    formattedDate: "Tuesday, November 10, 2026",
    time: "8:00 AM – 8:45 AM",
    location: "Assemble at Campus Amphitheatre Steps, SGT University",
    facilitator: "C.A.L.M Spaces Wellness Team",
    facilitatorRole: "Movement & Awareness Mentors",
    capacity: 30,
    registeredCount: 14,
    status: "Registration Open",
    coverImage: "/botanical-motif.svg",
    tags: ["Movement", "Grounding", "Outdoor"],
    departmentAffiliation: "SGT University",
  },
  {
    id: "evt-exam-anxiety-resilience",
    slug: "exam-anxiety-and-sleep-hygiene",
    title: "Demystifying Exam Anxiety & Sleep Hygiene Masterclass",
    category: "Seminar",
    description: "Evidence-based psychological tools for regulating cardiovascular panic spikes, optimizing deep rest, and sustaining cognitive clarity.",
    fullDescription: "An interactive seminar providing practical psycho-education on how the autonomic nervous system responds to evaluation stress. Learn how to identify early hyper-arousal, implement NSDR (Non-Sleep Deep Rest) protocols, and maintain cognitive stamina during revision.",
    date: "2026-11-18",
    formattedDate: "Wednesday, November 18, 2026",
    time: "2:00 PM – 3:30 PM",
    location: "Seminar Hall 2, SGT University",
    facilitator: "Dr. Astha Chaudhry & Guest Clinical Psychologist",
    facilitatorRole: "Patron, C.A.L.M Spaces & Visiting Specialist",
    capacity: 60,
    registeredCount: 42,
    status: "Registration Open",
    coverImage: "/botanical-motif.svg",
    tags: ["Exam Prep", "Sleep Hygiene", "Resilience"],
    departmentAffiliation: "SGT University",
  },
  {
    id: "evt-past-orientation-wellbeing",
    slug: "freshers-wellbeing-orientation-2026",
    title: "Freshers' Well-being Orientation: Your Space from Day One",
    category: "Campaign",
    description: "Welcoming the incoming cohort with an introduction to campus psychological resources, mental wellness myth-busting, and peer buddy sign-ups.",
    fullDescription: "An extensive orientation symposium introducing thousands of first-year students to C.A.L.M Spaces, our room location, confidential counselling access, and peer support networks.",
    date: "2026-08-20",
    formattedDate: "Thursday, August 20, 2026",
    time: "10:00 AM – 1:00 PM",
    location: "University Main Auditorium",
    facilitator: "Dr. Astha Chaudhry, Ms. Parvneet Kaur & Wellness Faculty",
    facilitatorRole: "C.A.L.M Spaces Leadership Team",
    capacity: 250,
    registeredCount: 250,
    status: "Past",
    coverImage: "/botanical-motif.svg",
    tags: ["Orientation", "Community", "Welcome"],
    departmentAffiliation: "SGT University",
  },
  {
    id: "evt-past-world-mental-health",
    slug: "world-mental-health-day-symposium",
    title: "World Mental Health Day: Mental Health as a Universal Human Right",
    category: "Campaign",
    description: "Campus-wide awareness campaign, anonymous empathy wall, and interactive psycho-educational kiosk installations.",
    fullDescription: "Commemorating World Mental Health Day across SGT University with over 600 student interactions, expert panel discussions, and distributed self-care pocket guides.",
    date: "2026-10-10",
    formattedDate: "Saturday, October 10, 2026",
    time: "9:30 AM – 4:00 PM",
    location: "Central Campus Plaza & C.A.L.M Spaces Hub",
    facilitator: "C.A.L.M Spaces Coordinators",
    facilitatorRole: "Multidisciplinary Faculty & Student Volunteers",
    capacity: 200,
    registeredCount: 200,
    status: "Past",
    coverImage: "/botanical-motif.svg",
    tags: ["Awareness", "Stigma Reduction", "Campus-Wide"],
    departmentAffiliation: "SGT University",
  }
];

export function getEvents(): EventItem[] {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("calm_spaces_events");
    if (local) {
      try {
        return JSON.parse(local);
      } catch (err) {
        console.error("Failed to parse local events", err);
      }
    }
  }
  return defaultEvents;
}

export function getEventBySlug(slug: string): EventItem | undefined {
  const all = getEvents();
  return all.find((item) => item.slug === slug);
}

export function registerForEvent(registration: Omit<EventRegistration, "id" | "registeredAt">): { success: boolean; message: string; registrationId: string } {
  if (typeof window === "undefined") {
    return { success: true, message: "Registered successfully", registrationId: "mock-" + Date.now() };
  }

  const events = getEvents();
  const event = events.find((e) => e.id === registration.eventId);
  if (!event) {
    return { success: false, message: "Event not found", registrationId: "" };
  }

  if (event.registeredCount >= event.capacity) {
    return { success: false, message: "This session has reached full capacity. Please contact C.A.L.M Spaces for waitlist availability.", registrationId: "" };
  }

  const existingRegs: EventRegistration[] = JSON.parse(localStorage.getItem("calm_spaces_event_registrations") || "[]");
  const alreadyRegistered = existingRegs.some((r) => r.eventId === registration.eventId && r.studentEmail.toLowerCase() === registration.studentEmail.toLowerCase());
  
  if (alreadyRegistered) {
    return { success: false, message: "You have already registered for this event with this email.", registrationId: "" };
  }

  const newReg: EventRegistration = {
    ...registration,
    id: "reg-" + Date.now(),
    registeredAt: new Date().toISOString(),
  };

  existingRegs.push(newReg);
  localStorage.setItem("calm_spaces_event_registrations", JSON.stringify(existingRegs));

  // Increment event registered count
  event.registeredCount += 1;
  if (event.registeredCount >= event.capacity) {
    event.status = "Full";
  }
  saveEvent(event);

  return { success: true, message: "Registration confirmed! You will receive confirmation details at your university email.", registrationId: newReg.id };
}

export function saveEvent(event: EventItem): void {
  if (typeof window === "undefined") return;
  const current = getEvents();
  const index = current.findIndex((item) => item.id === event.id);
  if (index >= 0) {
    current[index] = event;
  } else {
    current.unshift(event);
  }
  localStorage.setItem("calm_spaces_events", JSON.stringify(current));
}
