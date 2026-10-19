import { getResources } from "./resources";
import { getInitiatives } from "./initiatives";
import { getEvents } from "./events";
import { getTeamMembers } from "./team";

export type ContentStatus = "Draft" | "Review" | "Published" | "Archived";

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category: "General Inquiry" | "Counselling Appointment" | "Workshop Request" | "Faculty Collaboration" | "Feedback";
  subject: string;
  message: string;
  submittedAt: string;
  status: "New" | "In Review" | "Responded" | "Archived";
  notes?: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  subscribedAt: string;
  status: "Active" | "Unsubscribed";
};

export type AuditLogEntry = {
  id: string;
  actor: string;
  action: string;
  entity: "Initiative" | "Event" | "Resource" | "Team" | "Contact" | "Settings";
  entityId: string;
  timestamp: string;
  details: string;
};

export type AdminDashboardMetrics = {
  totalResources: number;
  totalInitiatives: number;
  totalEvents: number;
  upcomingEvents: number;
  teamMembersCount: number;
  contactSubmissionsCount: number;
  newContactSubmissionsCount: number;
  newsletterSubscribersCount: number;
  estimatedCommunityReach: number;
  lastUpdated: string;
};

const initialContactSubmissions: ContactSubmission[] = [
  {
    id: "sub-1",
    name: "Aarav Sharma",
    email: "aarav.sharma@student.sgtuniversity.org",
    phone: "+91 98765 43210",
    category: "Counselling Appointment",
    subject: "Inquiry about drop-in counselling hours in Room 10",
    message: "Hello C.A.L.M Spaces team, I am a 2nd year medical student experiencing frequent anxiety prior to clinical postings. Could I know if I can drop by Room 10 on Tuesday afternoon for a confidential consultation?",
    submittedAt: "2026-10-18T10:30:00Z",
    status: "New",
  },
  {
    id: "sub-2",
    name: "Dr. Ritu Verma",
    email: "ritu.verma@sgtuniversity.org",
    category: "Faculty Collaboration",
    subject: "De-stress workshop for Allied Health students",
    message: "We would love to coordinate with Ms. Parvneet Kaur to host a Colour the Chaos session for our allied health cohort prior to mid-terms.",
    submittedAt: "2026-10-17T14:15:00Z",
    status: "In Review",
  }
];

const initialAuditLogs: AuditLogEntry[] = [
  {
    id: "log-1",
    actor: "Dr. Astha Chaudhry (Super Admin)",
    action: "Published",
    entity: "Resource",
    entityId: "res-managing-overwhelm",
    timestamp: "2026-10-18T09:00:00Z",
    details: "Approved and published academic overwhelm psycho-educational module.",
  },
  {
    id: "log-2",
    actor: "Ms. Parvneet Kaur (Content Editor)",
    action: "Updated",
    entity: "Event",
    entityId: "evt-colour-chaos-oct",
    timestamp: "2026-10-17T11:20:00Z",
    details: "Adjusted seat capacity and confirmed materials for studio room 10.",
  }
];

export function getContactSubmissions(): ContactSubmission[] {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("calm_spaces_contact_submissions");
    if (local) {
      try {
        return JSON.parse(local);
      } catch (err) {
        console.error("Failed to parse local contact submissions", err);
      }
    }
  }
  return initialContactSubmissions;
}

export function submitContactForm(submission: Omit<ContactSubmission, "id" | "submittedAt" | "status">): { success: boolean; message: string } {
  if (typeof window === "undefined") return { success: true, message: "Submission received" };

  const current = getContactSubmissions();
  const newSubmission: ContactSubmission = {
    ...submission,
    id: "sub-" + Date.now(),
    submittedAt: new Date().toISOString(),
    status: "New",
  };
  current.unshift(newSubmission);
  localStorage.setItem("calm_spaces_contact_submissions", JSON.stringify(current));

  recordAuditLog({
    actor: "Visitor (" + submission.email + ")",
    action: "Submitted",
    entity: "Contact",
    entityId: newSubmission.id,
    details: `New inquiry: ${submission.subject} (${submission.category})`,
  });

  return {
    success: true,
    message: "Thank you for reaching out. Your message has been safely received by the C.A.L.M Spaces team. We will respond respectfully within 1–2 working days."
  };
}

export function updateContactSubmissionStatus(id: string, status: ContactSubmission["status"], notes?: string): void {
  if (typeof window === "undefined") return;
  const current = getContactSubmissions();
  const sub = current.find((s) => s.id === id);
  if (sub) {
    sub.status = status;
    if (notes) sub.notes = notes;
    localStorage.setItem("calm_spaces_contact_submissions", JSON.stringify(current));

    recordAuditLog({
      actor: "Admin",
      action: "Status Changed",
      entity: "Contact",
      entityId: id,
      details: `Status changed to ${status}`,
    });
  }
}

export function getNewsletterSubscribers(): NewsletterSubscriber[] {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("calm_spaces_newsletter");
    if (local) {
      try {
        return JSON.parse(local);
      } catch (err) {
        console.error("Failed to parse newsletter subscribers", err);
      }
    }
  }
  return [
    { id: "sub-init-1", email: "student.wellness@sgtuniversity.org", subscribedAt: "2026-10-01", status: "Active" }
  ];
}

export function subscribeToNewsletter(email: string): { success: boolean; message: string } {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail || !cleanEmail.includes("@")) {
    return { success: false, message: "Please enter a valid email address." };
  }

  if (typeof window === "undefined") return { success: true, message: "Subscribed successfully" };

  const current = getNewsletterSubscribers();
  const exists = current.find((s) => s.email === cleanEmail);
  if (exists) {
    if (exists.status === "Active") {
      return { success: false, message: "You are already subscribed to C.A.L.M Spaces updates." };
    } else {
      exists.status = "Active";
      localStorage.setItem("calm_spaces_newsletter", JSON.stringify(current));
      return { success: true, message: "Welcome back! Your subscription has been reactivated." };
    }
  }

  current.push({
    id: "news-" + Date.now(),
    email: cleanEmail,
    subscribedAt: new Date().toISOString(),
    status: "Active"
  });
  localStorage.setItem("calm_spaces_newsletter", JSON.stringify(current));

  return { success: true, message: "Thank you for subscribing! You will receive verified campus well-being updates and workshop announcements." };
}

export function getAuditLogs(): AuditLogEntry[] {
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("calm_spaces_audit_logs");
    if (local) {
      try {
        return JSON.parse(local);
      } catch (err) {
        console.error("Failed to parse audit logs", err);
      }
    }
  }
  return initialAuditLogs;
}

export function recordAuditLog(entry: Omit<AuditLogEntry, "id" | "timestamp">): void {
  if (typeof window === "undefined") return;
  const logs = getAuditLogs();
  const newEntry: AuditLogEntry = {
    ...entry,
    id: "log-" + Date.now(),
    timestamp: new Date().toISOString(),
  };
  logs.unshift(newEntry);
  if (logs.length > 100) logs.pop();
  localStorage.setItem("calm_spaces_audit_logs", JSON.stringify(logs));
}

export function getAdminMetrics(): AdminDashboardMetrics {
  const resources = getResources();
  const initiatives = getInitiatives();
  const events = getEvents();
  const team = getTeamMembers();
  const submissions = getContactSubmissions();
  const subscribers = getNewsletterSubscribers();

  const upcomingEvents = events.filter((e) => e.status !== "Past").length;
  const newSubs = submissions.filter((s) => s.status === "New").length;
  const activeSubscribers = subscribers.filter((s) => s.status === "Active").length;

  return {
    totalResources: resources.length,
    totalInitiatives: initiatives.length,
    totalEvents: events.length,
    upcomingEvents,
    teamMembersCount: team.length,
    contactSubmissionsCount: submissions.length,
    newContactSubmissionsCount: newSubs,
    newsletterSubscribersCount: activeSubscribers,
    estimatedCommunityReach: 1420 + activeSubscribers * 3,
    lastUpdated: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
  };
}
