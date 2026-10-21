# C.A.L.M Spaces — Migration & Identity Unification Guide

## 1. Migration Goals & Invariants

1. **Zero Data Loss**: Existing registered accounts, mobile database records, and profile details are preserved.
2. **Canonical Identity**: All records pivot to `auth.users(id)` as the canonical UUID.
3. **Dual Compatibility**: Both Android client naming conventions (`name`, `type`, `course`, `registration_number`) and Web client naming conventions (`full_name`, `role`, `department`, `student_id`) coexist seamlessly on `public.profiles`.

---

## 2. Step-by-Step Migration Execution

### Step 1: Execute Schema DDL in Supabase
Run the full migration script in the Supabase SQL Editor:
`supabase/migrations/20261019000000_unified_schema.sql`

This script executes idempotently (`CREATE TABLE IF NOT EXISTS`, `ADD COLUMN IF NOT EXISTS`) and will not drop existing data.

### Step 2: Canonical User Mapping (for pre-existing users)
If users were created directly in legacy SQLite/local mobile storage or separate tables:
1. Provision corresponding `auth.users` identities via Supabase Admin API:
   ```ts
   const { data: user, error } = await supabaseAdmin.auth.admin.createUser({
     email: legacyUser.email,
     password: temporarySecurePassword,
     email_confirm: true,
     user_metadata: {
       full_name: legacyUser.name || legacyUser.full_name,
       role: legacyUser.role || "STUDENT"
     }
   });
   ```
2. The `handle_new_user` trigger automatically instantiates the `public.profiles` row with ID matching `auth.users.id`.
3. If profile data already existed in a separate table, migrate legacy fields:
   ```sql
   UPDATE public.profiles p
   SET 
     registration_number = l.registration_number,
     course = l.course,
     phone_number = l.phone_number
   FROM legacy_profiles l
   WHERE p.email = l.email;
   ```

### Step 3: Dual Column Parity Verification
Verify that the `sync_profile_dual_fields` trigger maintains synchronization:
```sql
-- Test INSERT with Mobile fields
INSERT INTO public.profiles (id, email, name, type, course)
VALUES ('00000000-0000-0000-0000-000000000099', 'test.mobile@sgtuniversity.ac.in', 'Mobile Student', 'student', 'B.Tech CSE')
ON CONFLICT (id) DO NOTHING;

-- Verify Web columns were auto-populated
SELECT id, name, full_name, type, role, course, department 
FROM public.profiles 
WHERE email = 'test.mobile@sgtuniversity.ac.in';
```
*Expected Result*: `full_name` matches `'Mobile Student'`, `role` matches `'STUDENT'`, and `department` matches `'B.Tech CSE'`.

---

## 3. Rollback Procedures

If an unexpected condition arises:

1. **Table-level Rollback**: Since columns were added via `ADD COLUMN IF NOT EXISTS`, existing queries remain valid.
2. **Trigger Rollback**: If trigger performance requires tuning:
   ```sql
   DROP TRIGGER IF EXISTS trigger_sync_profile_dual_fields ON public.profiles;
   ```
3. **Application Layer Resilience**: The Next.js API layer is fully guarded with `isSupabaseConfigured()`. Disabling Supabase credentials will immediately fall back to safe local mock data without downtime.
