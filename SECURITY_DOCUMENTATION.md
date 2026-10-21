# C.A.L.M Spaces — Security & Data Protection Specification

## 1. Row Level Security (RLS) Matrix

RLS is enabled on every public table. No client application (web or mobile) can bypass these policies when using the anonymous public API key.

| Table | SELECT Policy | INSERT Policy | UPDATE Policy | DELETE Policy |
|---|---|---|---|---|
| `profiles` | Public read for active users | Handled via trigger / Self insert | Self only (`auth.uid() = id`) | Admin / Self |
| `mood_entries` | Self only (`auth.uid() = user_id`) | Self only (`auth.uid() = user_id`) | Self only | Self only |
| `journal_entries` | Strict Self only (`auth.uid() = user_id`) | Self only (`auth.uid() = user_id`) | Self only | Self only |
| `community_post` | Public read (where `is_flagged = FALSE`) | Authenticated users | Self only or Admin | Admin only |
| `book_request` | Parties only (`user_id = auth.uid() OR provider_id = auth.uid()`) | Authenticated students | Parties only | Parties only |
| `notifications` | Self only (`auth.uid() = user_id`) | System / Authenticated | Self only (`is_read = true`) | Self only |
| `audit_logs` | Admin / Super Admin only | Server-side / Service Role only | Prohibited (Immutable) | Prohibited |
| `contact_submissions` | Admin only | Public submission (Rate limited) | Admin only | Admin only |

---

## 2. Authentication & Credential Architecture

### 2.1 Credential Boundaries
* **`NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_ANON_KEY`**: Client-side publishable key. Granted only limited PostgREST permissions subject to RLS. Safe to embed in web bundles and mobile client binaries.
* **`SUPABASE_SERVICE_ROLE_KEY`**: Privileged key bypassing RLS. Stored exclusively in server environment variables (e.g. Next.js server actions, Supabase Edge Functions). **NEVER** imported in any `"use client"` file or mobile bundle.

### 2.2 Role-Based Access Control (RBAC)
User roles are validated at multiple layers:
1. **Database Layer**: Helper functions `auth.uid()`, `public.get_user_role(auth.uid())` verify role in SQL queries.
2. **Proxy Layer (`proxy.ts`)**: Next.js route proxy inspects decoded session role and restricts administrative routes (`/admin`, `/expert`, `/peer-listener`) from unauthorized students.
3. **API Layer (`/api/v1/*`)**: Verifies caller's session and ownership before performing mutations.

---

## 3. Storage Security & File Protection

* **`avatars` bucket**: Public read access. Upload access is constrained strictly to the authenticated user's dedicated path (`auth.uid()/*`).
* **`journals` bucket**: Private read and write. Requires time-limited Supabase Signed URLs for viewing.
* **File Upload Validation**: Client and server enforce MIME type whitelist and a 5MB size ceiling on avatars.

---

## 4. Privacy & Campus Compliance

* **Anonymous Reflections**: When creating community posts, the student's canonical name is obscured behind an anonymous alias (`author_alias`), preserving campus psychological safety while retaining auditability for administrative flags.
* **Clinical Confidentiality**: Private intake notes and journal entries are inaccessible to peer listeners and general faculty, viewable exclusively by the patient and assigned psychological expert.
