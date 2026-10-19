export type TeamRoleCategory = "Leadership" | "Psychological & Wellness" | "Training & Faculty" | "Peer Coordinators & Volunteers";

export type DetailedTeamMember = {
  id: string;
  name: string;
  category: TeamRoleCategory;
  primaryRole: string;
  institutionalRole: string;
  department: string;
  university: string;
  bio: string;
  qualifications: string;
  focusAreas: string[];
  responsibilities: string[];
  isCalmSpacesLead: boolean;
  avatarColor: string;
  email?: string;
};

export const officialTeamList: DetailedTeamMember[] = [
  {
    id: "dr-astha-chaudhry",
    name: "Dr. Astha Chaudhry",
    category: "Leadership",
    primaryRole: "Patron, C.A.L.M Spaces",
    institutionalRole: "Professor & Director, CEAPS",
    department: "Centre of Excellence for Andragogical and Pedagogical Sciences",
    university: "SGT University",
    bio: "Dr. Astha Chaudhry serves as Professor and Director of CEAPS at SGT University, providing visionary institutional leadership and patronage to C.A.L.M Spaces. Her pedagogical leadership embeds emotional resilience, reflective inquiry, and student well-being directly into the university's academic fabric.",
    qualifications: "Ph.D. · Professor in Higher Education & Andragogy",
    focusAreas: ["Institutional Well-being Policy", "Andragogical Innovation", "Student Mentorship Frameworks"],
    responsibilities: [
      "Strategic direction and institutional oversight of C.A.L.M Spaces",
      "Liaison between university deans, CEAPS, and student health initiatives",
      "Academic research on student mental wellness and pedagogical outcomes"
    ],
    isCalmSpacesLead: true,
    avatarColor: "#7436D5",
    email: "director.ceaps@sgtuniversity.org",
  },
  {
    id: "ms-parvneet-kaur",
    name: "Ms. Parvneet Kaur",
    category: "Psychological & Wellness",
    primaryRole: "Lead, C.A.L.M Spaces",
    institutionalRole: "Psychologist, CEAPS",
    department: "Centre of Excellence for Andragogical and Pedagogical Sciences",
    university: "SGT University",
    bio: "Ms. Parvneet Kaur leads the operational and psychological initiatives of C.A.L.M Spaces. As a dedicated psychologist at CEAPS, she oversees individual counselling, facilitates listening circles, supervises the peer-listener program, and curates non-judgmental spaces for student reflection.",
    qualifications: "M.Sc. in Psychology · Certified Psychological Counsellor",
    focusAreas: ["Student Mental Health", "Active Listening Frameworks", "Crisis Support De-escalation", "Expressive Arts"],
    responsibilities: [
      "Direct one-on-one student psychological counselling sessions in Room 10",
      "Supervision and training of student C.A.L.M Companions",
      "Design and execution of campus workshops and listening circles",
      "Confidential student care and safety triage"
    ],
    isCalmSpacesLead: true,
    avatarColor: "#5926AA",
    email: "helpdesk.calmspaces@sgtuniversity.org",
  },
  {
    id: "ms-vaishnavi",
    name: "Ms. Vaishnavi",
    category: "Training & Faculty",
    primaryRole: "Wellness & Expression Facilitator",
    institutionalRole: "Soft Skills Trainer, CEAPS",
    department: "Centre of Excellence for Andragogical and Pedagogical Sciences",
    university: "SGT University",
    bio: "Ms. Vaishnavi is a Soft Skills Trainer with CEAPS at SGT University. Her work enriches student development through interactive experiential workshops focusing on interpersonal communication, emotional intelligence, stress management, and empathetic peer engagement.",
    qualifications: "Certified Trainer & Behavioral Skills Specialist",
    focusAreas: ["Interpersonal Communication", "Emotional Regulation", "Expressive Movement & Arts"],
    responsibilities: [
      "Facilitator for 'Colour the Chaos' and creative wellness workshops",
      "Soft skills training for campus leadership and peer listener cohorts",
      "Interactive psycho-educational group modules"
    ],
    isCalmSpacesLead: true,
    avatarColor: "#A77BE8",
    email: "ceaps@sgtuniversity.org",
  },
  {
    id: "ms-arvinder-kaur-pabla",
    name: "Ms. Arvinder Kaur Pabla",
    category: "Leadership",
    primaryRole: "Institutional Advisor",
    institutionalRole: "Deputy Director, CEAPS",
    department: "Centre of Excellence for Andragogical and Pedagogical Sciences",
    university: "SGT University",
    bio: "Ms. Arvinder Kaur Pabla contributes executive leadership and administrative coordination to CEAPS, supporting the integration of well-being initiatives across faculty schedules and university learning milestones.",
    qualifications: "Senior Educational Administrator & Faculty, CEAPS",
    focusAreas: ["Academic Coordination", "Curricular Integration", "Institutional Quality Standards"],
    responsibilities: [
      "Administrative oversight of CEAPS student programs",
      "Cross-departmental scheduling and campus resource allocation"
    ],
    isCalmSpacesLead: false,
    avatarColor: "#8E4EE4",
    email: "ceaps@sgtuniversity.org",
  },
  {
    id: "ms-monika-sharma",
    name: "Ms. Monika Sharma",
    category: "Leadership",
    primaryRole: "Departmental Coordinator",
    institutionalRole: "Assistant Director, CEAPS",
    department: "Centre of Excellence for Andragogical and Pedagogical Sciences",
    university: "SGT University",
    bio: "Ms. Monika Sharma assists in directing departmental outreach, student-centered initiatives, and collaborative educational research under the CEAPS banner.",
    qualifications: "Assistant Director & Educational Specialist, CEAPS",
    focusAreas: ["Student Engagement", "Community Outreach", "Pedagogical Support"],
    responsibilities: [
      "Coordination of departmental events and inter-faculty wellness outreach",
      "Support for campus-wide mental health awareness campaigns"
    ],
    isCalmSpacesLead: false,
    avatarColor: "#30223D",
    email: "ceaps@sgtuniversity.org",
  },
  {
    id: "dr-vinika-chaudhary",
    name: "Dr. Vinika Chaudhary",
    category: "Training & Faculty",
    primaryRole: "Academic & Research Advisor",
    institutionalRole: "Member & Expert Faculty, CEAPS",
    department: "Centre of Excellence for Andragogical and Pedagogical Sciences",
    university: "SGT University",
    bio: "Dr. Vinika Chaudhary brings scholarly expertise and research methodology to the assessment of student wellness interventions, pedagogical resilience, and educational outcomes at SGT University.",
    qualifications: "Ph.D. · Faculty Member, CEAPS",
    focusAreas: ["Educational Psychology", "Outcome Assessment", "Cognitive Resilience"],
    responsibilities: [
      "Evaluation of well-being program efficacy and student feedback",
      "Advising on psycho-educational literature and resource evidence base"
    ],
    isCalmSpacesLead: false,
    avatarColor: "#5926AA",
    email: "ceaps@sgtuniversity.org",
  },
  {
    id: "student-peer-ambassadors",
    name: "C.A.L.M Companions Student Cohort",
    category: "Peer Coordinators & Volunteers",
    primaryRole: "Student Peer Listeners & Wellness Ambassadors",
    institutionalRole: "SGT University Student Volunteers",
    department: "C.A.L.M Spaces Student Chapter",
    university: "SGT University",
    bio: "A dedicated group of carefully selected and trained student peer listeners representing diverse faculties across SGT University. They provide relatable, approachable first-contact listening support and co-facilitate campus wellness initiatives.",
    qualifications: "Trained in Active Listening, Confidentiality & Crisis Referral by CEAPS",
    focusAreas: ["Peer Empathy", "Hostel & Campus Life Transitions", "Active Listening"],
    responsibilities: [
      "Welcoming peers to C.A.L.M Spaces Room 10 during drop-in hours",
      "Co-hosting weekly student listening circles",
      "Distributing mental wellness toolkits during campus events"
    ],
    isCalmSpacesLead: true,
    avatarColor: "#A77BE8",
  }
];

export function getTeamMembers(): DetailedTeamMember[] {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("calm_spaces_team");
    if (local) {
      try {
        return JSON.parse(local);
      } catch (err) {
        console.error("Failed to parse local team", err);
      }
    }
  }
  return officialTeamList;
}

export function saveTeamMember(member: DetailedTeamMember): void {
  if (typeof window === "undefined") return;
  const current = getTeamMembers();
  const index = current.findIndex((item) => item.id === member.id);
  if (index >= 0) {
    current[index] = member;
  } else {
    current.push(member);
  }
  localStorage.setItem("calm_spaces_team", JSON.stringify(current));
}
