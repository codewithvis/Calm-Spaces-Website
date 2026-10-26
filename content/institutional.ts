export const institutionalIdentity = {
  name: "C.A.L.M Spaces",
  fullName: "C.A.L.M Spaces: A Holistic Well-being Unit for Students at SGT University",
  tagline: "Cultivating Awareness, Lightening Stress, and Healing through Movement",
  department: "C.A.L.M Spaces",
  parentDepartment: "Centre of Excellence for Andragogical and Pedagogical Sciences (CEAPS)",
  university: "SGT University",
  officialUrl: "https://sgtuniversity.ac.in/ceaps/calm-spaces",
  shortBio: "C.A.L.M Spaces is a holistic well-being unit for students at SGT University, introduced by CEAPS to support students in navigating academic pressures, personal challenges, and evolving learning methodologies.",
  oneLineBio: "A holistic student well-being sanctuary at SGT University, created to foster self-awareness, mindfulness, and emotional regulation.",
  officialBio: "At SGT University, we recognize that learning extends beyond academics to include emotional resilience, adaptability, and psychological well-being. With this vision, C.A.L.M Spaces—Cultivating Awareness, Lightening Stress, and Healing through Movement—is a sanctuary designed to support students in navigating academic pressures, personal challenges, and evolving learning methodologies. It offers a structured yet flexible environment fostering self-awareness, mindfulness, and emotional regulation through one-on-one counselling, peer support discussions, group sessions, workshops, and psycho-educational resources.",
  extendedBio: "By embedding well-being into the learning experience, C.A.L.M Spaces empowers students to thrive holistically, ensuring they develop resilience, improve focus, and cultivate emotional intelligence essential for academic and personal success. Students engage in activities such as reflective journaling, movement-based expressive sessions, and emotional intelligence development, equipping them with tools to cope effectively with academic and personal demands.",
  aim: "Our aim is to ensure that students have access to a space that supports their learning, overall well-being, and personal growth. Let’s cultivate a culture of adaptability, resilience, and holistic development together!",
  calmPhrase: "Cultivating Awareness, Lightening Stress, and Healing through Movement.",
  location: {
    name: "C.A.L.M Spaces",
    room: "Room No. 10",
    floor: "Lower Ground Floor",
    block: "A Block",
    university: "SGT University",
    city: "Gurugram, Haryana",
    pincode: "122505",
    lines: ["A Block, Lower Ground Floor", "Room No. 10", "SGT University", "Gurugram, Haryana 122505"],
  },
  leadership: {
    patron: {
      name: "Dr. Astha Chaudhry",
      role: "Patron, C.A.L.M Spaces",
      institutionalTitle: "Director, CEAPS",
    },
    lead: {
      name: "Ms. Parvneet Kaur",
      role: "Lead & Coordinator, C.A.L.M Spaces",
      institutionalTitle: "Consultant Psychologist and Member, CEAPS",
    },
  },
  whatWeDo: [
    {
      title: "One on One Counselling",
      description: "Confidential, individualized psychological counselling sessions tailored to student challenges and emotional well-being.",
      icon: "person",
    },
    {
      title: "Support Groups",
      description: "Guided, community-based peer support groups providing shared comfort, collective resilience, and open discussion.",
      icon: "people",
    },
    {
      title: "Listening Circles",
      description: "Structured, non-judgmental circles where students can express themselves freely and be heard in total safety.",
      icon: "chat",
    },
    {
      title: "C.A.L.M Companions - Campus Peer Listeners Program",
      description: "Trained student peer listeners providing approachable first-contact listening support and empathetic guidance across campus.",
      icon: "earbuds",
    },
  ],
  series: [
    {
      title: "Change Management Series",
      description: "Workshops and guided discussions designed to help students adapt smoothly to transitional phases, new semesters, and academic shifts.",
    },
    {
      title: "Stress Management Series",
      description: "Practical psycho-educational and somatic techniques to down-regulate stress, master cognitive pacing, and manage assessment pressures.",
    },
  ],
  universityPhone: "1800 102 5661",
  appSupportEmail: "helpdesk.calmspaces@sgtuniversity.org",
  appSupportPhone: "+91 85277 94487",
  sourceStatus: "Verified against official SGT University C.A.L.M Spaces webpage (https://sgtuniversity.ac.in/ceaps/calm-spaces).",
} as const;

export type InstitutionalTeamMember = {
  id: string;
  name: string;
  role: string;
  organization: string;
  bio: string;
  isCalmSpacesTeam: boolean;
  displayOrder: number;
  sourceStatus: string;
  photograph: null;
  profileUrl: string | null;
};

export const institutionalTeam: InstitutionalTeamMember[] = [
  {
    id: "astha-chaudhry",
    name: "Dr. Astha Chaudhry",
    role: "Director, CEAPS · Patron, C.A.L.M Spaces",
    organization: "SGT University",
    bio: "Dr. Astha Chaudhry is Director of CEAPS at SGT University and serves as Patron to C.A.L.M Spaces, providing executive guidance and institutional vision to embed holistic well-being into the university learning experience.",
    isCalmSpacesTeam: true,
    displayOrder: 1,
    sourceStatus: "official-website-verified",
    photograph: null,
    profileUrl: "https://sgtuniversity.ac.in/ceaps/calm-spaces",
  },
  {
    id: "parvneet-kaur",
    name: "Ms. Parvneet Kaur",
    role: "Consultant Psychologist and Member, CEAPS · Lead & Coordinator, C.A.L.M Spaces",
    organization: "SGT University",
    bio: "Ms. Parvneet Kaur is Consultant Psychologist and Member at CEAPS, and serves as Lead & Coordinator of C.A.L.M Spaces at SGT University, leading student counselling, listening circles, and the C.A.L.M Companions peer listening initiative.",
    isCalmSpacesTeam: true,
    displayOrder: 2,
    sourceStatus: "official-website-verified",
    photograph: null,
    profileUrl: "https://sgtuniversity.ac.in/ceaps/calm-spaces",
  },
];
