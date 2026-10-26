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
    institutionalRole: "Director, CEAPS · Patron, C.A.L.M Spaces",
    department: "C.A.L.M Spaces · SGT University",
    university: "SGT University",
    bio: "Dr. Astha Chaudhry is Director of CEAPS at SGT University and serves as Patron to C.A.L.M Spaces, providing executive guidance and institutional vision to embed holistic well-being into the university learning experience.",
    qualifications: "Director, CEAPS · Patron, C.A.L.M Spaces",
    focusAreas: ["Institutional Well-being Policy", "Educational Innovation", "Student Mentorship Frameworks"],
    responsibilities: [
      "Strategic direction and institutional oversight of C.A.L.M Spaces",
      "Embedding holistic well-being into the student learning experience",
      "Support for campus-wide mental health advocacy and university leadership liaison"
    ],
    isCalmSpacesLead: true,
    avatarColor: "#7436D5",
    email: "helpdesk.calmspaces@sgtuniversity.org",
  },
  {
    id: "ms-parvneet-kaur",
    name: "Ms. Parvneet Kaur",
    category: "Psychological & Wellness",
    primaryRole: "Lead & Coordinator, C.A.L.M Spaces",
    institutionalRole: "Consultant Psychologist and Member, CEAPS · Lead & Coordinator, C.A.L.M Spaces",
    department: "C.A.L.M Spaces · SGT University",
    university: "SGT University",
    bio: "Ms. Parvneet Kaur is Consultant Psychologist and Member at CEAPS, and serves as Lead & Coordinator of C.A.L.M Spaces at SGT University. She leads one-on-one student counselling, support groups, listening circles, and the C.A.L.M Companions peer listening initiative in Room No. 10.",
    qualifications: "Consultant Psychologist and Member, CEAPS",
    focusAreas: ["One on One Counselling", "Support Groups", "Listening Circles", "Peer Support Frameworks"],
    responsibilities: [
      "Direct one-on-one student psychological counselling sessions in Room No. 10",
      "Leading Support Groups and Listening Circles for students",
      "Supervision, mentorship, and training of C.A.L.M Companions (Campus Peer Listeners)",
      "Coordinating the Change Management and Stress Management series"
    ],
    isCalmSpacesLead: true,
    avatarColor: "#5926AA",
    email: "helpdesk.calmspaces@sgtuniversity.org",
  },
  {
    id: "calm-companions-cohort",
    name: "C.A.L.M Companions",
    category: "Peer Coordinators & Volunteers",
    primaryRole: "Campus Peer Listeners Program",
    institutionalRole: "Trained Student Peer Listeners, C.A.L.M Spaces",
    department: "C.A.L.M Spaces · SGT University",
    university: "SGT University",
    bio: "A student-led peer support network trained by C.A.L.M Spaces and CEAPS in compassionate listening, emotional first aid, and safe referrals across SGT University. Companions provide approachable, stigma-free first-contact support.",
    qualifications: "Certified Campus Peer Listeners · Trained by C.A.L.M Spaces",
    focusAreas: ["Peer Empathy", "Active Listening", "Campus Transition Support", "Mental Health De-stigmatization"],
    responsibilities: [
      "Welcoming peers to C.A.L.M Spaces Room No. 10 during drop-in hours",
      "Co-facilitating student Listening Circles with Lead Psychologist",
      "Providing accessible, approachable listening support across campus hubs",
      "Guiding students toward confidential one-on-one counselling when needed"
    ],
    isCalmSpacesLead: true,
    avatarColor: "#A77BE8",
    email: "helpdesk.calmspaces@sgtuniversity.org",
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
