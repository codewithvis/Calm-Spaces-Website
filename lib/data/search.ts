import { getInitiatives } from "./initiatives";
import { getEvents } from "./events";
import { getResources } from "./resources";
import { getTeamMembers } from "./team";

export type SearchResultType = "Resource" | "Event" | "Initiative" | "Team" | "Page";

export type SearchResultItem = {
  id: string;
  type: SearchResultType;
  title: string;
  category: string;
  snippet: string;
  url: string;
  badge?: string;
};

export const staticPagesIndex: SearchResultItem[] = [
  { id: "page-home", type: "Page", title: "Home — C.A.L.M Spaces", category: "Core Page", snippet: "Your mind deserves a space to bloom. Cultivating Awareness, Lightness & Movement under CEAPS at SGT University.", url: "/" },
  { id: "page-about", type: "Page", title: "About Calm Spaces", category: "Institutional", snippet: "Our mission, vision, C.A.L.M. philosophy, and our institutional foundation under CEAPS at SGT University.", url: "/about" },
  { id: "page-team", type: "Page", title: "Meet the Team", category: "People", snippet: "Meet Dr. Astha Chaudhry, Ms. Parvneet Kaur, Ms. Vaishnavi, CEAPS faculty, and student C.A.L.M Companions.", url: "/team" },
  { id: "page-initiatives", type: "Page", title: "Initiatives Directory", category: "Programs", snippet: "Explore Colour the Chaos, Listening Circles, Mindful Campus Walks, and the Exam De-stress Hub.", url: "/initiatives" },
  { id: "page-events", type: "Page", title: "Campus Events & Workshops", category: "Events", snippet: "Upcoming and past workshops, registration for mindfulness circles, and mental health awareness symposia.", url: "/events" },
  { id: "page-resources", type: "Page", title: "Educational Resource Library", category: "Library", snippet: "Articles, guided audio resets, videos, and downloadable psycho-educational PDF handbooks.", url: "/resources" },
  { id: "page-support", type: "Page", title: "Support & Crisis Assistance", category: "Support", snippet: "How to reach university counselling in Room 10, peer listening, and verified 24/7 national emergency helplines.", url: "/find-support" },
  { id: "page-counselling", type: "Page", title: "One-on-One Counselling", category: "Support", snippet: "Confidential, student-centered psychological guidance with CEAPS psychologists.", url: "/counselling" },
  { id: "page-calm-companions", type: "Page", title: "C.A.L.M Companions Peer Support", category: "Support", snippet: "Approachable peer listening from trained student peers who understand campus life.", url: "/calm-companions" },
  { id: "page-contact", type: "Page", title: "Contact Us & Campus Location", category: "Contact", snippet: "Find us at A Block, Lower Ground Floor, Room 10, SGT University. Emails, phone, and inquiry form.", url: "/contact" },
  { id: "page-accessibility", type: "Page", title: "Accessibility Statement & Controls", category: "Settings", snippet: "WCAG 2.2 AA commitments, font sizing, high contrast, and reduced-motion preferences.", url: "/accessibility" },
  { id: "page-privacy", type: "Page", title: "Privacy Policy", category: "Legal", snippet: "Transparent privacy practices protecting student anonymity, counselling notes, and personal data.", url: "/privacy" },
  { id: "page-terms", type: "Page", title: "Terms of Use", category: "Legal", snippet: "Guidelines for responsible engagement across Calm Spaces digital platform and campus facilities.", url: "/terms" },
];

export function performUnifiedSearch(query: string, filterType?: SearchResultType | "All"): SearchResultItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const results: SearchResultItem[] = [];

  // Search Pages
  for (const page of staticPagesIndex) {
    if (page.title.toLowerCase().includes(q) || page.snippet.toLowerCase().includes(q) || page.category.toLowerCase().includes(q)) {
      results.push(page);
    }
  }

  // Search Resources
  const resources = getResources();
  for (const res of resources) {
    if (
      res.title.toLowerCase().includes(q) ||
      res.summary.toLowerCase().includes(q) ||
      res.category.toLowerCase().includes(q) ||
      res.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({
        id: res.id,
        type: "Resource",
        title: res.title,
        category: res.category,
        snippet: res.summary,
        url: `/resources#${res.slug}`,
        badge: res.type,
      });
    }
  }

  // Search Events
  const events = getEvents();
  for (const evt of events) {
    if (
      evt.title.toLowerCase().includes(q) ||
      evt.description.toLowerCase().includes(q) ||
      evt.category.toLowerCase().includes(q) ||
      evt.location.toLowerCase().includes(q)
    ) {
      results.push({
        id: evt.id,
        type: "Event",
        title: evt.title,
        category: evt.category,
        snippet: `${evt.formattedDate} · ${evt.time} · ${evt.description}`,
        url: `/events#${evt.slug}`,
        badge: evt.status,
      });
    }
  }

  // Search Initiatives
  const initiatives = getInitiatives();
  for (const init of initiatives) {
    if (
      init.title.toLowerCase().includes(q) ||
      init.description.toLowerCase().includes(q) ||
      init.category.toLowerCase().includes(q)
    ) {
      results.push({
        id: init.id,
        type: "Initiative",
        title: init.title,
        category: init.category,
        snippet: init.description,
        url: `/initiatives#${init.slug}`,
        badge: init.status,
      });
    }
  }

  // Search Team
  const team = getTeamMembers();
  for (const member of team) {
    if (
      member.name.toLowerCase().includes(q) ||
      member.primaryRole.toLowerCase().includes(q) ||
      member.institutionalRole.toLowerCase().includes(q) ||
      member.bio.toLowerCase().includes(q)
    ) {
      results.push({
        id: member.id,
        type: "Team",
        title: `${member.name} (${member.primaryRole})`,
        category: member.category,
        snippet: member.bio,
        url: `/team#${member.id}`,
        badge: member.institutionalRole,
      });
    }
  }

  if (filterType && filterType !== "All") {
    return results.filter((item) => item.type === filterType);
  }

  return results;
}
