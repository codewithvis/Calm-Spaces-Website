# C.A.L.M Spaces — Official Web Platform & Ecosystem

**Department:** Centre for Emotional Awareness and Psychological Support (CEAPS), SGT University  
**Architecture:** Next.js 16 (App Router) + Shared Supabase Backend + React Native / Android App Synchronization

---

## 1. Project Overview

**C.A.L.M. Spaces** (Cultivating Awareness, Lightness & Movement) is the official mental health and psychological wellness platform of SGT University. It provides confidential, evidence-based, and student-centered psychological support across web browsers and mobile devices.

This website serves as the authoritative web counterpart to the published [Calm Spaces Android Application](https://github.com/codewithvis/Calm-Spaces-Android-), connecting directly to the **same Supabase project**, sharing identities, permissions, appointments, and real-time data streams.

---

## 2. Four-Panel Role Architecture

The platform provides complete role-based access control (RBAC) across four distinct campus panels:

### 1. Student Panel (`/dashboard`, `/mood`, `/buddy-connect`, `/journal`)
- **Target Demographic:** Undergraduate, postgraduate, and doctoral campus students.
- **Key Features:**
  - One-click daily mood check-ins recorded to `public.mood_entries`.
  - Private, encrypted reflective journal entries (`public.journal_entries`).
  - Buddy Connect: Book drop-in micro-conversations with trained peer listeners.
  - Clinical Consultations: Request psychological intake with faculty psychologists.
  - Anonymous campus reflection wall (`public.community_post`).
  - Emergency SOS directory (Tele-MANAS, KIRAN 1800-599-0019, SGT Health Centre).

### 2. Peer Listener Panel (`/peer-listener`)
- **Target Demographic:** Certified student companions trained under the CEAPS 40-hour active listening protocol.
- **Key Features:**
  - Client Session Management: Review, accept, or decline student peer support requests on `public.book_request`.
  - 50-Minute Listening Slot Scheduler: Configure weekly availability intervals on `public.student_schedule`.
  - Real-time Supabase synchronization on incoming client bookings.
  - Supervised clinical safety escalation to faculty counselors.

### 3. Clinical Expert Panel (`/expert`)
- **Target Demographic:** Licensed faculty psychologists and clinical counselors.
- **Key Features:**
  - Clinical Workbench: Review student intake concerns, approve consultations, and log session completions on `public.book_request`.
  - Custom Schedule Manager: Create, toggle, and delete clinical availability slots on `public.expert_schedule` (Room 10, A Block or Online Video).
  - Campus Notification Broadcast: Dispatch alerts to student devices via `public.notifications`.

### 4. Admin Panel (`/admin`)
- **Target Demographic:** CEAPS Director, department coordinators, and platform administrators.
- **Key Features:**
  - Live 4-Panel Ecosystem Statistics: Real-time counts of total users, students, peer listeners, clinical experts, and administrators.
  - User Directory & Search: Search by name, email, registration number, or course with role filter pills.
  - Cross-Platform Role Management: Promote/demote user account types (`STUDENT`, `PEER`, `EXPERT`, `ADMIN`) with real-time propagation to Android apps.
  - Community Moderation: Review, moderate, and create campus reflection wall prompts.
  - Content Management System (CMS): Manage campus initiatives, psycho-educational workshops, and the resource library.

---

## 3. Shared Supabase Backend & Synchronization

Both the Android application and the website connect to the canonical Supabase project:
- **Supabase URL:** `https://jkkpeutduevzuelhlxnk.supabase.co`
- **Identity & Profiles:** `public.profiles` linked 1:1 with `auth.users(id)`.
  - Automatic column synchronization between Android conventions (`name`, `type`, `registration_number`, `course`, `phone_number`) and Web conventions (`full_name`, `role`, `student_id`, `department`, `phone`).
- **Appointments & Bookings:** `public.book_request` shared across peers and experts.
- **Availability Schedules:** `public.expert_schedule` and `public.student_schedule`.
- **Real-time Notifications:** `public.notifications` and `public.messages`.

---

## 4. Automatic Role Detection & Authentication

- **Dual Credential Sign-In (`/login`):**
  - Users can sign in using their **Institutional Email** or **Numeric Student Registration Number** (e.g., `210101001`).
  - Automatic lookup resolves registration numbers to the canonical auth account.
- **Automatic Panel Routing:**
  - `ADMIN` / `SUPER_ADMIN` $\rightarrow$ `/admin`
  - `EXPERT` $\rightarrow$ `/expert`
  - `PEER` / `PEER_LISTENER` $\rightarrow$ `/peer-listener`
  - `STUDENT` $\rightarrow$ `/dashboard`
- **Edge Route Protection (`proxy.ts`):**
  - Implements Next.js 16 proxy middleware with role validation and session revalidation.

---

## 5. Development & Local Setup

### Prerequisites
- Node.js 18+ (tested with Node 20 / 24)
- npm or pnpm

### Environment Variables (`.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=https://jkkpeutduevzuelhlxnk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Installation & Execution
```bash
# Install dependencies
npm.cmd install

# Run development server
npm.cmd run dev

# Run unit tests
npm.cmd test

# Build production bundle
npm.cmd run build
```

---

## 6. Design System & Accessibility

- **Color Palette:** Curated lavender and purple accents (`#7C3AED`, `#EDE9FE`), warm white surfaces (`#FAF8F5`), soft blush pink, and grounded emerald for peer companionship.
- **Typography:** Playfair Display for headings; DM Sans for interface and body copy.
- **Responsive Guarantee:** Tested and verified from 320px mobile up to 2560px ultra-wide displays with zero overlapping text or interactive controls.
