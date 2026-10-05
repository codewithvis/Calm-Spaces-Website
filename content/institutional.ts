export const institutionalIdentity = {
  name: "C.A.L.M Spaces",
  department: "Centre of Excellence for Andragogical and Pedagogical Sciences (CEAPS)",
  university: "SGT University",
  shortBio: "C.A.L.M Spaces is SGT University's holistic well-being unit, operating under CEAPS to support students through counselling, peer support, wellness activities, reflective practices and community-based initiatives.",
  oneLineBio: "A holistic student well-being space at SGT University, created to help students pause, connect, reflect and grow.",
  officialBio: "C.A.L.M Spaces is a holistic well-being unit for students at SGT University, functioning under the aegis of the Centre of Excellence for Andragogical and Pedagogical Sciences (CEAPS). It is designed to support students in navigating academic pressures, personal challenges and evolving learning experiences while fostering self-awareness, mindfulness, emotional regulation, resilience and personal growth. C.A.L.M Spaces brings together one-on-one counselling, peer support, support groups, listening circles, workshops, psycho-educational resources, reflective practices and movement-based expressive activities to embed well-being into the student learning experience. Located at A Block, Lower Ground Floor, Room No. 10 at SGT University, the space is designed to provide students with a welcoming environment where they can pause, express, reflect, connect and find the form of support that works for them.",
  calmPhrase: "Cultivating Awareness, Lightening Stress, and Healing through Movement.",
  location: {
    name: "C.A.L.M Spaces",
    lines: ["A Block, Lower Ground Floor", "Room No. 10", "SGT University", "Gurugram, Haryana"],
  },
  ceapsContact: ["ceaps@sgtuniversity.org", "director.ceaps@sgtuniversity.org"],
  universityPhone: "1800 102 5661",
  appSupportEmail: "helpdesk.calmspaces@sgtuniversity.org",
  appSupportPhone: "+91 85277 94487",
  sourceStatus: "Provided in the official institutional addendum; official URL and asset provenance must be verified before launch.",
} as const;

export type InstitutionalTeamMember = {
  id: string;
  name: string;
  role: string;
  organization: string;
  bio: string;
  isCalmSpacesTeam: boolean;
  displayOrder: number;
  sourceStatus: "provided-needs-verification";
  photograph: null;
  profileUrl: null;
};

export const institutionalTeam: InstitutionalTeamMember[] = [
  {
    id: "astha-chaudhry",
    name: "Dr. Astha Chaudhry",
    role: "Professor & Director, CEAPS · Patron, C.A.L.M Spaces",
    organization: "SGT University",
    bio: "Dr. Astha Chaudhry is Professor and Director of the Centre of Excellence for Andragogical and Pedagogical Sciences (CEAPS) at SGT University. She provides institutional leadership and patronage to C.A.L.M Spaces as it works to embed holistic student well-being within the university learning experience.",
    isCalmSpacesTeam: true,
    displayOrder: 1,
    sourceStatus: "provided-needs-verification",
    photograph: null,
    profileUrl: null,
  },
  {
    id: "parvneet-kaur",
    name: "Ms. Parvneet Kaur",
    role: "Psychologist, CEAPS & Lead C.A.L.M Spaces",
    organization: "SGT University",
    bio: "Ms. Parvneet Kaur serves as Psychologist at CEAPS and Lead of C.A.L.M Spaces at SGT University. She leads the day-to-day well-being initiative and works with the team to create accessible, student-centred spaces for reflection, support and personal growth.",
    isCalmSpacesTeam: true,
    displayOrder: 2,
    sourceStatus: "provided-needs-verification",
    photograph: null,
    profileUrl: null,
  },
  {
    id: "vaishnavi",
    name: "Ms. Vaishnavi",
    role: "Soft Skills Trainer · CEAPS",
    organization: "SGT University",
    bio: "Ms. Vaishnavi is a Soft Skills Trainer associated with CEAPS at SGT University. Her work contributes to student development through learning experiences focused on interpersonal skills, communication, confidence and personal development.",
    isCalmSpacesTeam: false,
    displayOrder: 3,
    sourceStatus: "provided-needs-verification",
    photograph: null,
    profileUrl: null,
  },
  {
    id: "arvinder-kaur-pabla",
    name: "Ms. Arvinder Kaur Pabla",
    role: "Deputy Director, CEAPS",
    organization: "SGT University",
    bio: "CEAPS leadership and supporting team member. An approved biography and official profile link are required before publication.",
    isCalmSpacesTeam: false,
    displayOrder: 4,
    sourceStatus: "provided-needs-verification",
    photograph: null,
    profileUrl: null,
  },
  {
    id: "monika-sharma",
    name: "Ms. Monika Sharma",
    role: "Assistant Director, CEAPS",
    organization: "SGT University",
    bio: "CEAPS leadership and supporting team member. An approved biography and official profile link are required before publication.",
    isCalmSpacesTeam: false,
    displayOrder: 5,
    sourceStatus: "provided-needs-verification",
    photograph: null,
    profileUrl: null,
  },
  {
    id: "vinika-chaudhary",
    name: "Dr. Vinika Chaudhary",
    role: "Member & Expert Faculty, CEAPS",
    organization: "SGT University",
    bio: "CEAPS leadership and supporting team member. An approved biography and official profile link are required before publication.",
    isCalmSpacesTeam: false,
    displayOrder: 6,
    sourceStatus: "provided-needs-verification",
    photograph: null,
    profileUrl: null,
  },
];
