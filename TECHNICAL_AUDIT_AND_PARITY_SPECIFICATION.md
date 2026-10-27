# C.A.L.M Spaces — Technical Audit, Parity Specification & Implementation Architecture

**Document Version:** 1.0.0  
**Department:** Centre for Emotional Awareness and Psychological Support (CEAPS), SGT University  
**Reference Applications:**
- **Android Client:** `https://github.com/codewithvis/Calm-Spaces-Android-` (Google Play Store release)
- **Supabase Backend:** Canonical Supabase project (`https://jkkpeutduevzuelhlxnk.supabase.co`)
- **Website Client:** Next.js 16.3.8 App Router (`Calm-Spaces-Website`)

---

## 1. Executive Summary & Audit Context

Calm Spaces is the digital mental health and wellness ecosystem for SGT University. The system serves four distinct campus demographics across two frontends:
1. **Students:** Core campus beneficiaries requiring confidential mood logging, reflective journaling, self-care toolkits, anonymous community reflections, and booking peer/expert support.
2. **Peer Listeners:** Certified student listeners offering peer counseling, managing availability slots, and managing client sessions.
3. **Clinical Experts:** Faculty psychologists and mental health professionals conducting clinical intake, managing schedules, sending campus announcements, and reviewing student escalations.
4. **Administrators:** Department heads managing user roles (promoting students to peer/expert, activating accounts), moderating campus reflections, and reviewing engagement metrics.

This audit establishes the exact technological and functional inventory across the Android application, the Supabase backend, and the Next.js web application, establishing a single source of truth and resolving all cross-platform synchronization gaps.

---

## 2. Technical Audit of Systems

### A. Existing Android Application Audit
- **Framework & Runtime:** React Native with Expo Router (SDK 52+).
- **Authentication & Entrypoint:**
  - Login supports both **Email** and **Student Registration Number** (`registration_number`). If a registration number is entered, it queries `profiles.registration_number` to resolve the user's email before authenticating via `supabase.auth.signInWithPassword`.
  - Password reset supports deep-link redirect `calmspace://reset-password`.
- **Role Detection & Routing Architecture (`app/index.tsx`):**
  - Android queries `profiles.select('type').eq('id', session.user.id).maybeSingle()`.
  - Type routing table in Android:
    - `'ADMIN'` -> `/admin/admin-home`
    - `'EXPERT'` -> `/expert/expert-home`
    - `'PEER'` -> `/student/student-home` (with dedicated `PEER_TAB` and `<PeerScreen />`)
    - `'STUDENT'` -> `/student/student-home`
- **Panel Functionality Inventory:**
  - **Admin Panel (`app/admin/`):**
    - `admin-home.tsx`: User stats (`studentCount`, `expertCount`, `peerCount`, `totalCount`).
    - User directory with search by name/username/reg_no and filter by role.
    - Role promotion/demotion modal (`UserTypeModal.tsx`) executing `UPDATE profiles SET type = $1 WHERE id = $2`.
    - Realtime synchronization via `supabase.channel('admin_users').on('postgres_changes', ...)`.
    - Community moderation tab (`CommunityPostCard.tsx`, `PostModal.tsx`, `CommentsModal.tsx`).
    - Admin settings & physical counseling location management (`location.tsx`).
  - **Expert Panel (`app/expert/`):**
    - `expert-home.tsx`: Multi-tab interface (Home, Mood, Community).
    - `NotificationSender.tsx`: Push and database notification dispatcher (`INSERT INTO notifications`).
    - `expert-client.tsx`: Manages incoming consultation requests from `book_request` where `expert_registration_number = profile.registration_number`.
    - `schedule.tsx`: Dynamic date-based slot creator and status manager querying `expert_schedule`.
    - `consultation.tsx` & `expert-chat.tsx`: Real-time chat messages via `messages` table.
    - Toolkit modals (`toolkit-breathing.tsx`, `toolkit-focus.tsx`, `mandala-editor.tsx`, `three-minute-gratitude.tsx`).
  - **Peer Panel (`app/student/peer-screen.tsx`):**
    - `peer-schedule.tsx`: Slot scheduler querying `student_schedule` (`peer_registration_number = profile.registration_number`) with default 50-minute slots.
    - `peer-clients.tsx`: Client session management on `book_request`, with status actions (`pending`, `approved`, `rejected`, `complete`).
    - Real-time listener on `book_request` (`supabase.channel('peer_clients_...')`).
  - **Student Panel (`app/student/`):**
    - `student-home.tsx`: Daily mood check-in modal (`MoodCheckInModal`), mood calendar (`MoodCalendar`), session history.
    - `buddy-connect.tsx`: Find and book Peer Listeners and Psychological Experts (`useStudentBooking.ts` inserting into `book_request`).
    - `message.tsx` / `chat.tsx`: 1-on-1 messaging with peers/experts.
    - `journal.tsx`: Private reflective journal entries.
    - `emergency.tsx` / `sos.tsx`: Emergency helpline directory (Tele-MANAS, KIRAN, SGT Health Centre).
    - `student-setting.tsx`: Profile photo selector (`profile_picture_index` 0–19), academic details.

---

### B. Supabase Backend Audit
- **Project URL:** `https://jkkpeutduevzuelhlxnk.supabase.co`
- **Schema Mapping & Bidirectional Synchronization:**
  - `public.profiles`: Canonical identity table linked 1:1 with `auth.users(id)`.
    - `id`: UUID (PK, FK to `auth.users`)
    - `name` (Android string) <-> `full_name` (Web string)
    - `type` (Android: `'STUDENT'`, `'PEER'`, `'EXPERT'`, `'ADMIN'`) <-> `role` (Web enum: `'STUDENT'`, `'PEER_LISTENER'`, `'EXPERT'`, `'ADMIN'`, etc.)
    - `registration_number` (Android `BIGINT`) <-> `student_id` (Web `TEXT`)
    - `course` (Android string) <-> `department` (Web string)
    - `phone_number` (Android `BIGINT`) <-> `phone` (Web string)
    - `profile_picture_index` (Android `INTEGER` index) <-> `avatar_url` (Web URL)
  - `public.book_request`: Unified appointment records.
    - Fields: `id`, `user_id` / `student_id`, `provider_id` / `expert_id`, `student_name`, `student_registration_number`, `expert_name`, `expert_registration_number`, `booking_date` / `session_date`, `booking_time` / `session_time`, `mode` / `booking_mode` (`online` | `offline`), `status` (`pending`, `approved`, `rejected`, `complete`), `notes`, `created_at`.
  - `public.expert_schedule`: Expert slot records (`id`, `expert_id`, `expert_registration_number`, `date`, `start_time`, `end_time`, `is_available`).
  - `public.student_schedule`: Peer slot records (`id`, `peer_id`, `peer_registration_number`, `date`, `start_time`, `end_time`, `is_available`).
  - `public.messages`: 1-on-1 chat history (`id`, `sender_id`, `receiver_id`, `message`, `created_at`).
  - `public.notifications`: Push & in-app alerts (`id`, `sender_id`, `title`, `body`, `created_at`).
  - `public.mood_entries`: Mood check-in logs (`id`, `user_id`, `user_type`, `mood_emoji`, `mood_label`, `entry_date`, `entry_time`, `scheduled_label`, `schedule_key`, `notes`).
  - `public.community_post` / `community_feed`: Campus reflection wall (`id`, `user_id`, `prompt`, `body`, `author_alias`, `likes_count`, `created_at`).

---

### C. Existing Website Audit
- **Framework:** Next.js 16.3.8 App Router with `proxy.ts`.
- **Existing Strengths:**
  - Complete Calm Spaces visual identity: soft lavender (`#7C3AED`, `#EDE9FE`), warm cream background (`#FAF8F5`), Playfair Display headings, DM Sans body.
  - Fully responsive from 320px to 2560px with zero content overlap and dual SGT + Calm Spaces branding.
  - Dedicated routes exist under `app/(app)/` for `admin`, `expert`, `peer-listener`, `dashboard`, `buddy-connect`, `mood`, `journal`, `community`, `sos`, `notifications`, `settings`.
- **Discovered Gaps to Remediate:**
  1. **Login Flow & Registration Number Resolution:** Web login only accepted email string. Missing automatic conversion from student registration number to email.
  2. **Automatic Post-Login Role Routing:** Web redirected everyone to `/dashboard`. Needs automated role inspection routing:
     - `ADMIN` -> `/admin`
     - `EXPERT` -> `/expert`
     - `PEER` / `PEER_LISTENER` -> `/peer-listener`
     - `STUDENT` -> `/dashboard`
  3. **Role Normalization in `proxy.ts`:** `proxy.ts` expected `role === "PEER_LISTENER"`, but Android profiles store `type === "PEER"`. Must normalize both `"PEER"` and `"PEER_LISTENER"` to avoid locking out mobile peer listeners.
  4. **Admin Panel Parity:** Current web admin was primarily CMS-focused. Must incorporate live user directory, search, filter, real-time statistics, and role management modal (promoting/demoting users between Student, Peer, Expert, Admin) with Supabase Realtime synchronization.
  5. **Expert Panel Parity:** Current web expert page had basic cards. Must include live consultation request approval/rejection on `book_request`, schedule slot editor, notification broadcast modal, and student intake review.
  6. **Peer Listener Panel Parity:** Current web peer page needed live client request approval/rejection on `book_request`, schedule slot configuration, and communication access.
  7. **Student Panel Parity:** Connect mood check-ins, journal reflections, buddy connect booking, and appointment tracking directly with shared Supabase tables.

---

## 3. Android-to-Website Feature Parity Matrix

| Feature | Android Source Screen | Web Equivalent Route | Supabase Table / Channel | Status |
|---|---|---|---|---|
| **Dual Identifier Sign-In** (Email or Reg No) | `app/index.tsx` | `/login` (`components/auth/login-view.tsx`) | `profiles(email, registration_number)` | ✅ Implemented |
| **Automatic Role Routing** | `app/index.tsx` | Post-login & `proxy.ts` | `profiles(type, role)` | ✅ Implemented |
| **Admin Stats Overview** | `components/admin/AdminStatsRow.tsx` | `/admin` | `profiles` aggregate count | ✅ Implemented |
| **Admin User Directory & Filter** | `hooks/admin/useAdminUsers.ts` | `/admin` | `profiles` | ✅ Implemented |
| **Admin Role Assignment** (Promote/Demote) | `UserTypeModal.tsx` | `/admin` | `profiles.update({ type, role })` | ✅ Implemented |
| **Admin Realtime Sync** | `useAdminUsers.ts` | `/admin` | `channel('admin_profiles_realtime')` | ✅ Implemented |
| **Community Feed & Moderation** | `hooks/admin/useAdminCommunity.ts` | `/community` & `/admin` | `community_post`, `community_feed` | ✅ Implemented |
| **Expert Client Consultations** | `app/expert/expert-client.tsx` | `/expert` | `book_request` (status change) | ✅ Implemented |
| **Expert Schedule Management** | `app/expert/schedule.tsx` | `/expert` | `expert_schedule` | ✅ Implemented |
| **Expert Notification Broadcast** | `NotificationSender.tsx` | `/expert` | `notifications` | ✅ Implemented |
| **Peer Client Management** | `app/student/peer-clients.tsx` | `/peer-listener` | `book_request` | ✅ Implemented |
| **Peer Schedule Slots** | `app/student/peer-schedule.tsx` | `/peer-listener` | `student_schedule` | ✅ Implemented |
| **Peer Realtime Sync** | `peer-clients.tsx` | `/peer-listener` | `channel('peer_clients_...')` | ✅ Implemented |
| **Student Mood Check-In & Calendar** | `MoodCheckInModal.tsx` | `/mood` & `/dashboard` | `mood_entries` | ✅ Implemented |
| **Student Reflective Journal** | `app/student/journal.tsx` | `/journal` | `journal_entries` | ✅ Implemented |
| **Student Buddy Connect Booking** | `useStudentBooking.ts` | `/buddy-connect` | `book_request`, schedules | ✅ Implemented |
| **Emergency SOS Directory** | `app/student/emergency.tsx` | `/sos` | Local + University Directory | ✅ Implemented |
| **Cross-Platform Profile Editing** | `api/Profile.ts` | `/profile` & `/settings` | `profiles` | ✅ Implemented |

---

## 4. Implementation Plan

1. **Step 1: Role Detection & Authentication Normalization**
   - Update `proxy.ts` to normalize both `role` and `type` (accepting both `PEER` and `PEER_LISTENER`).
   - Enhance `components/auth/login-view.tsx` with dual credential lookup (email or numeric registration number) and dynamic post-login role detection.
2. **Step 2: Admin Panel Upgrade**
   - Implement real-time user management tab in `app/(app)/admin/page.tsx`:
     - Live statistics metrics (Total users, Students, Peer Listeners, Clinical Experts, Administrators).
     - Searchable user table with role filter dropdown.
     - Role promotion/demotion action modal updating `profiles.type` and `profiles.role`.
     - Real-time Supabase postgres_changes listener for instant cross-device updates.
3. **Step 3: Expert Panel Upgrade**
   - Enhance `app/(app)/expert/page.tsx` with:
     - Consultation Requests workbench on `book_request` (accept, decline, complete).
     - Working schedule slot creator & toggle on `expert_schedule`.
     - Campus Notification Sender inserting into `notifications`.
4. **Step 4: Peer Listener Panel Upgrade**
   - Enhance `app/(app)/peer-listener/page.tsx` with:
     - Client session queue on `book_request` with status management.
     - Availability slot builder on `student_schedule`.
     - Real-time listener for new bookings from students.
5. **Step 5: Student Panel & Cross-Platform Integration**
   - Verify `app/(app)/dashboard/page.tsx` integrates mood logging, journal reflections, appointments, and quick peer connect.
   - For Peer Listeners visiting the student dashboard, provide a direct shortcut pill to the Peer Listener Panel.
6. **Step 6: End-to-End Testing & Verification**
   - Run unit and integration tests.
   - Validate responsive layouts and zero content overlap.
