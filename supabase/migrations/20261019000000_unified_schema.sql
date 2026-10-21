-- ==============================================================================
-- C.A.L.M SPACES · UNIFIED ECOSYSTEM DATABASE MIGRATION
-- Platforms: Next.js Website + React Native Mobile Application + Admin Panel
-- Version: 3.3.0 (Comprehensive Idempotency & Complete Pre-Existing Table Safety)
-- Canonical System of Record: Supabase PostgreSQL
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. ENUMS & DOMAIN TYPES
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM (
    'STUDENT', 
    'PEER_LISTENER', 
    'EXPERT', 
    'CONTENT_EDITOR', 
    'EVENT_MANAGER', 
    'ADMIN', 
    'SUPER_ADMIN'
  );
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE content_status AS ENUM ('DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE event_status AS ENUM ('UPCOMING', 'REGISTRATION_OPEN', 'FULL', 'COMPLETED', 'CANCELLED');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE booking_status AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');
EXCEPTION WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 3. PROFILES (Unified Canonical Identity)
-- Merges Android App Contract + Web App Contract into a Single System of Record
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  full_name TEXT,
  username TEXT UNIQUE,
  role user_role DEFAULT 'STUDENT'::user_role NOT NULL,
  type TEXT DEFAULT 'STUDENT' NOT NULL,
  student_id TEXT,
  registration_number BIGINT,
  department TEXT,
  course TEXT,
  year_of_study TEXT,
  phone_number BIGINT,
  phone TEXT,
  date_of_birth DATE,
  avatar_url TEXT,
  profile_picture_index INT DEFAULT 0,
  bio TEXT,
  is_verified_listener BOOLEAN DEFAULT FALSE NOT NULL,
  is_expert BOOLEAN DEFAULT FALSE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Ensure all columns exist even if public.profiles already pre-existed
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS full_name TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS username TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'STUDENT'::user_role;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'STUDENT';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS student_id TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS registration_number BIGINT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS department TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS course TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS year_of_study TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone_number BIGINT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS date_of_birth DATE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profile_picture_index INT DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_verified_listener BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_expert BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

-- ==============================================================================
-- UNIVERSAL CROSS-PLATFORM IDENTITY RESOLVER
-- Resolves either UUID (auth.uid) OR Registration Number (bigint) seamlessly
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.is_current_user(target_id TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  IF target_id IS NULL OR auth.uid() IS NULL THEN
    RETURN FALSE;
  END IF;

  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND (
      id::TEXT = target_id 
      OR (registration_number IS NOT NULL AND registration_number::TEXT = target_id)
      OR (student_id IS NOT NULL AND student_id = target_id)
    )
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('ADMIN', 'SUPER_ADMIN')
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- Safe custom operators: prevents "operator does not exist: uuid = bigint" in arbitrary SQL
CREATE OR REPLACE FUNCTION public.uuid_equals_bigint(u UUID, b BIGINT)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = u AND registration_number = b
  );
$$ LANGUAGE sql STABLE;

CREATE OR REPLACE FUNCTION public.bigint_equals_uuid(b BIGINT, u UUID)
RETURNS BOOLEAN AS $$
  SELECT public.uuid_equals_bigint(u, b);
$$ LANGUAGE sql STABLE;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_operator o
    JOIN pg_type t1 ON o.oprleft = t1.oid
    JOIN pg_type t2 ON o.oprright = t2.oid
    WHERE o.oprname = '=' AND t1.typname = 'uuid' AND t2.typname = 'int8'
  ) THEN
    CREATE OPERATOR = (
      LEFTARG = UUID,
      RIGHTARG = BIGINT,
      PROCEDURE = public.uuid_equals_bigint,
      COMMUTATOR = =
    );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_operator o
    JOIN pg_type t1 ON o.oprleft = t1.oid
    JOIN pg_type t2 ON o.oprright = t2.oid
    WHERE o.oprname = '=' AND t1.typname = 'int8' AND t2.typname = 'uuid'
  ) THEN
    CREATE OPERATOR = (
      LEFTARG = BIGINT,
      RIGHTARG = UUID,
      PROCEDURE = public.bigint_equals_uuid,
      COMMUTATOR = =
    );
  END IF;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

-- Bidirectional Sync Trigger for Profiles (ensures Android & Web remain 100% in sync)
CREATE OR REPLACE FUNCTION public.sync_profile_dual_fields()
RETURNS TRIGGER AS $$
BEGIN
  -- Synchronize Name <-> Full Name
  IF NEW.name IS NOT NULL AND (NEW.full_name IS NULL OR NEW.full_name = '') THEN
    NEW.full_name := NEW.name;
  ELSIF NEW.full_name IS NOT NULL AND (NEW.name IS NULL OR NEW.name = '') THEN
    NEW.name := NEW.full_name;
  END IF;

  -- Synchronize Student ID <-> Registration Number
  IF NEW.registration_number IS NOT NULL AND NEW.student_id IS NULL THEN
    NEW.student_id := NEW.registration_number::TEXT;
  ELSIF NEW.student_id IS NOT NULL AND NEW.student_id ~ '^[0-9]+$' AND NEW.registration_number IS NULL THEN
    NEW.registration_number := NEW.student_id::BIGINT;
  END IF;

  -- Synchronize Department <-> Course
  IF NEW.department IS NOT NULL AND NEW.course IS NULL THEN
    NEW.course := NEW.department;
  ELSIF NEW.course IS NOT NULL AND NEW.department IS NULL THEN
    NEW.department := NEW.course;
  END IF;

  -- Synchronize Role <-> Type
  IF NEW.role IS NOT NULL THEN
    NEW.type := NEW.role::TEXT;
  ELSIF NEW.type IS NOT NULL THEN
    BEGIN
      NEW.role := NEW.type::user_role;
    EXCEPTION WHEN OTHERS THEN
      NEW.role := 'STUDENT'::user_role;
    END;
  END IF;

  NEW.updated_at := TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_sync_profile_fields ON public.profiles;
CREATE TRIGGER trg_sync_profile_fields
BEFORE INSERT OR UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.sync_profile_dual_fields();

-- Auto-provision Profile on Auth Sign Up (Android + Web)
CREATE OR REPLACE FUNCTION public.handle_new_auth_user()
RETURNS TRIGGER AS $$
DECLARE
  v_name TEXT;
  v_username TEXT;
BEGIN
  v_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    SPLIT_PART(NEW.email, '@', 1)
  );
  v_username := COALESCE(
    NEW.raw_user_meta_data->>'username',
    SPLIT_PART(NEW.email, '@', 1) || '_' || SUBSTRING(NEW.id::TEXT, 1, 4)
  );

  INSERT INTO public.profiles (
    id,
    email,
    name,
    full_name,
    username,
    role,
    type,
    student_id,
    department,
    course
  ) VALUES (
    NEW.id,
    NEW.email,
    v_name,
    v_name,
    v_username,
    'STUDENT'::user_role,
    'STUDENT',
    NEW.raw_user_meta_data->>'student_id',
    NEW.raw_user_meta_data->>'department',
    NEW.raw_user_meta_data->>'course'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    full_name = COALESCE(public.profiles.full_name, EXCLUDED.full_name),
    updated_at = TIMEZONE('utc'::text, NOW());

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_auth_user();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles are viewable by authenticated users" ON public.profiles;
CREATE POLICY "Public profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (public.is_current_user(id::TEXT))
  WITH CHECK (public.is_current_user(id::TEXT));

-- ==============================================================================
-- 4. MOOD ENTRIES (Preserving Android & Web Contract)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  user_type TEXT DEFAULT 'STUDENT' NOT NULL,
  mood_emoji TEXT NOT NULL,
  mood_label TEXT NOT NULL,
  entry_date DATE DEFAULT CURRENT_DATE NOT NULL,
  entry_time TIME DEFAULT CURRENT_TIME NOT NULL,
  scheduled_label TEXT DEFAULT 'Unscheduled',
  schedule_key TEXT DEFAULT '',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.mood_entries ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE;
ALTER TABLE public.mood_entries ADD COLUMN IF NOT EXISTS user_type TEXT DEFAULT 'STUDENT';
ALTER TABLE public.mood_entries ADD COLUMN IF NOT EXISTS mood_emoji TEXT DEFAULT '😊';
ALTER TABLE public.mood_entries ADD COLUMN IF NOT EXISTS mood_label TEXT DEFAULT 'Calm';
ALTER TABLE public.mood_entries ADD COLUMN IF NOT EXISTS entry_date DATE DEFAULT CURRENT_DATE;
ALTER TABLE public.mood_entries ADD COLUMN IF NOT EXISTS entry_time TIME DEFAULT CURRENT_TIME;
ALTER TABLE public.mood_entries ADD COLUMN IF NOT EXISTS scheduled_label TEXT DEFAULT 'Unscheduled';
ALTER TABLE public.mood_entries ADD COLUMN IF NOT EXISTS schedule_key TEXT DEFAULT '';
ALTER TABLE public.mood_entries ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.mood_entries ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own mood entries" ON public.mood_entries;
CREATE POLICY "Users can read own mood entries"
  ON public.mood_entries FOR SELECT
  TO authenticated
  USING (public.is_current_user(user_id::TEXT));

DROP POLICY IF EXISTS "Users can insert own mood entries" ON public.mood_entries;
CREATE POLICY "Users can insert own mood entries"
  ON public.mood_entries FOR INSERT
  TO authenticated
  WITH CHECK (public.is_current_user(user_id::TEXT));

DROP POLICY IF EXISTS "Users can delete own mood entries" ON public.mood_entries;
CREATE POLICY "Users can delete own mood entries"
  ON public.mood_entries FOR DELETE
  TO authenticated
  USING (public.is_current_user(user_id::TEXT));

CREATE INDEX IF NOT EXISTS idx_mood_user_date ON public.mood_entries(user_id, entry_date DESC);

-- ==============================================================================
-- 5. JOURNAL ENTRIES (Replaces Local-Only Storage with Cloud Sync)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT,
  content TEXT NOT NULL,
  prompt TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  is_favorite BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.journal_entries ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE;
ALTER TABLE public.journal_entries ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.journal_entries ADD COLUMN IF NOT EXISTS content TEXT DEFAULT '';
ALTER TABLE public.journal_entries ADD COLUMN IF NOT EXISTS prompt TEXT;
ALTER TABLE public.journal_entries ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE public.journal_entries ADD COLUMN IF NOT EXISTS is_favorite BOOLEAN DEFAULT FALSE;
ALTER TABLE public.journal_entries ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());
ALTER TABLE public.journal_entries ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own journal entries" ON public.journal_entries;
CREATE POLICY "Users can manage own journal entries"
  ON public.journal_entries FOR ALL
  TO authenticated
  USING (public.is_current_user(user_id::TEXT))
  WITH CHECK (public.is_current_user(user_id::TEXT));

CREATE INDEX IF NOT EXISTS idx_journal_user_updated ON public.journal_entries(user_id, updated_at DESC);

-- ==============================================================================
-- 6. COMMUNITY POSTS (Android Community Parity)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.community_post (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  prompt TEXT,
  body TEXT NOT NULL,
  author_alias TEXT DEFAULT 'Anonymous Member' NOT NULL,
  is_anonymous BOOLEAN DEFAULT TRUE NOT NULL,
  is_flagged BOOLEAN DEFAULT FALSE NOT NULL,
  likes_count INT DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Crucial: Ensure all community columns exist if table was already created
ALTER TABLE public.community_post ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE;
ALTER TABLE public.community_post ADD COLUMN IF NOT EXISTS prompt TEXT;
ALTER TABLE public.community_post ADD COLUMN IF NOT EXISTS body TEXT DEFAULT '';
ALTER TABLE public.community_post ADD COLUMN IF NOT EXISTS author_alias TEXT DEFAULT 'Anonymous Member';
ALTER TABLE public.community_post ADD COLUMN IF NOT EXISTS is_anonymous BOOLEAN DEFAULT TRUE;
ALTER TABLE public.community_post ADD COLUMN IF NOT EXISTS is_flagged BOOLEAN DEFAULT FALSE;
ALTER TABLE public.community_post ADD COLUMN IF NOT EXISTS flag_reason TEXT;
ALTER TABLE public.community_post ADD COLUMN IF NOT EXISTS likes_count INT DEFAULT 0;
ALTER TABLE public.community_post ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());
ALTER TABLE public.community_post ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

ALTER TABLE public.community_post ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Authenticated users can view active community posts" ON public.community_post;
CREATE POLICY "Authenticated users can view active community posts"
  ON public.community_post FOR SELECT
  TO authenticated
  USING (is_flagged = FALSE OR public.is_current_user(user_id::TEXT));

DROP POLICY IF EXISTS "Users can insert community posts" ON public.community_post;
CREATE POLICY "Users can insert community posts"
  ON public.community_post FOR INSERT
  TO authenticated
  WITH CHECK (public.is_current_user(user_id::TEXT));

DROP POLICY IF EXISTS "Users can update own community posts" ON public.community_post;
CREATE POLICY "Users can update own community posts"
  ON public.community_post FOR UPDATE
  TO authenticated
  USING (public.is_current_user(user_id::TEXT))
  WITH CHECK (public.is_current_user(user_id::TEXT));

DROP POLICY IF EXISTS "Admins can moderate community posts" ON public.community_post;
CREATE POLICY "Admins can moderate community posts"
  ON public.community_post FOR ALL
  TO authenticated
  USING (public.is_admin());

CREATE INDEX IF NOT EXISTS idx_community_created ON public.community_post(created_at DESC);

-- ==============================================================================
-- 7. MESSAGING & CHAT (Buddy Connect & Expert Sessions)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_one UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  participant_two UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  conversation_type TEXT DEFAULT 'PEER' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(participant_one, participant_two)
);

ALTER TABLE public.conversations ADD COLUMN IF NOT EXISTS participant_one UUID;
ALTER TABLE public.conversations ADD COLUMN IF NOT EXISTS participant_two UUID;
ALTER TABLE public.conversations ADD COLUMN IF NOT EXISTS conversation_type TEXT DEFAULT 'PEER';
ALTER TABLE public.conversations ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());
ALTER TABLE public.conversations ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Participants can view their conversations" ON public.conversations;
CREATE POLICY "Participants can view their conversations"
  ON public.conversations FOR SELECT
  TO authenticated
  USING (public.is_current_user(participant_one::TEXT) OR public.is_current_user(participant_two::TEXT));

CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Crucial: Explicitly ensure conversation_id and all columns exist before any policy references them
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS conversation_id UUID;
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS sender_id UUID;
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS receiver_id UUID;
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS content TEXT DEFAULT '';
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT FALSE;
ALTER TABLE public.messages ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Participants can view messages" ON public.messages;
CREATE POLICY "Participants can view messages"
  ON public.messages FOR SELECT
  TO authenticated
  USING (
    public.is_current_user(sender_id::TEXT) OR
    (receiver_id IS NOT NULL AND public.is_current_user(receiver_id::TEXT)) OR
    (conversation_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM public.conversations c
      WHERE c.id = messages.conversation_id
      AND (public.is_current_user(c.participant_one::TEXT) OR public.is_current_user(c.participant_two::TEXT))
    ))
  );

DROP POLICY IF EXISTS "Participants can send messages" ON public.messages;
CREATE POLICY "Participants can send messages"
  ON public.messages FOR INSERT
  TO authenticated
  WITH CHECK (
    public.is_current_user(sender_id::TEXT) AND (
      (receiver_id IS NOT NULL) OR
      (conversation_id IS NOT NULL AND EXISTS (
        SELECT 1 FROM public.conversations c
        WHERE c.id = messages.conversation_id
        AND (public.is_current_user(c.participant_one::TEXT) OR public.is_current_user(c.participant_two::TEXT))
      ))
    )
  );

CREATE INDEX IF NOT EXISTS idx_messages_conversation ON public.messages(conversation_id, created_at ASC);

-- ==============================================================================
-- 8. SCHEDULES & APPOINTMENT BOOKING (Android Parity)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.expert_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  expert_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  expert_registration_number BIGINT,
  expert_name TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  mode TEXT DEFAULT 'online' NOT NULL,
  is_booked BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.expert_schedule ADD COLUMN IF NOT EXISTS expert_id UUID;
ALTER TABLE public.expert_schedule ADD COLUMN IF NOT EXISTS expert_registration_number BIGINT;
ALTER TABLE public.expert_schedule ADD COLUMN IF NOT EXISTS expert_name TEXT;
ALTER TABLE public.expert_schedule ADD COLUMN IF NOT EXISTS date DATE;
ALTER TABLE public.expert_schedule ADD COLUMN IF NOT EXISTS start_time TIME;
ALTER TABLE public.expert_schedule ADD COLUMN IF NOT EXISTS end_time TIME;
ALTER TABLE public.expert_schedule ADD COLUMN IF NOT EXISTS mode TEXT DEFAULT 'online';
ALTER TABLE public.expert_schedule ADD COLUMN IF NOT EXISTS is_booked BOOLEAN DEFAULT FALSE;
ALTER TABLE public.expert_schedule ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

ALTER TABLE public.expert_schedule ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone authenticated can view available expert schedules" ON public.expert_schedule;
CREATE POLICY "Anyone authenticated can view available expert schedules"
  ON public.expert_schedule FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Experts can manage own schedule" ON public.expert_schedule;
CREATE POLICY "Experts can manage own schedule"
  ON public.expert_schedule FOR ALL
  TO authenticated
  USING (
    public.is_current_user(expert_id::TEXT) OR 
    (expert_registration_number IS NOT NULL AND public.is_current_user(expert_registration_number::TEXT))
  );

CREATE TABLE IF NOT EXISTS public.student_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  peer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  peer_registration_number BIGINT,
  peer_name TEXT NOT NULL,
  date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  mode TEXT DEFAULT 'online' NOT NULL,
  is_booked BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.student_schedule ADD COLUMN IF NOT EXISTS peer_id UUID;
ALTER TABLE public.student_schedule ADD COLUMN IF NOT EXISTS peer_registration_number BIGINT;
ALTER TABLE public.student_schedule ADD COLUMN IF NOT EXISTS peer_name TEXT;
ALTER TABLE public.student_schedule ADD COLUMN IF NOT EXISTS date DATE;
ALTER TABLE public.student_schedule ADD COLUMN IF NOT EXISTS start_time TIME;
ALTER TABLE public.student_schedule ADD COLUMN IF NOT EXISTS end_time TIME;
ALTER TABLE public.student_schedule ADD COLUMN IF NOT EXISTS mode TEXT DEFAULT 'online';
ALTER TABLE public.student_schedule ADD COLUMN IF NOT EXISTS is_booked BOOLEAN DEFAULT FALSE;
ALTER TABLE public.student_schedule ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

ALTER TABLE public.student_schedule ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone authenticated can view peer listener schedules" ON public.student_schedule;
CREATE POLICY "Anyone authenticated can view peer listener schedules"
  ON public.student_schedule FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Peer listeners can manage own schedule" ON public.student_schedule;
CREATE POLICY "Peer listeners can manage own schedule"
  ON public.student_schedule FOR ALL
  TO authenticated
  USING (
    public.is_current_user(peer_id::TEXT) OR 
    (peer_registration_number IS NOT NULL AND public.is_current_user(peer_registration_number::TEXT))
  );

CREATE TABLE IF NOT EXISTS public.book_request (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  provider_type TEXT NOT NULL,
  slot_id TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  mode TEXT DEFAULT 'online' NOT NULL,
  status TEXT DEFAULT 'CONFIRMED' NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.book_request ADD COLUMN IF NOT EXISTS user_id UUID;
ALTER TABLE public.book_request ADD COLUMN IF NOT EXISTS provider_id UUID;
ALTER TABLE public.book_request ADD COLUMN IF NOT EXISTS provider_type TEXT DEFAULT 'PEER';
ALTER TABLE public.book_request ADD COLUMN IF NOT EXISTS slot_id TEXT;
ALTER TABLE public.book_request ADD COLUMN IF NOT EXISTS booking_date DATE;
ALTER TABLE public.book_request ADD COLUMN IF NOT EXISTS booking_time TEXT;
ALTER TABLE public.book_request ADD COLUMN IF NOT EXISTS mode TEXT DEFAULT 'online';
ALTER TABLE public.book_request ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'CONFIRMED';
ALTER TABLE public.book_request ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.book_request ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());
ALTER TABLE public.book_request ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

ALTER TABLE public.book_request ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own bookings" ON public.book_request;
CREATE POLICY "Users can view own bookings"
  ON public.book_request FOR SELECT
  TO authenticated
  USING (public.is_current_user(user_id::TEXT) OR public.is_current_user(provider_id::TEXT));

DROP POLICY IF EXISTS "Users can create bookings" ON public.book_request;
CREATE POLICY "Users can create bookings"
  ON public.book_request FOR INSERT
  TO authenticated
  WITH CHECK (public.is_current_user(user_id::TEXT));

DROP POLICY IF EXISTS "Users and providers can update booking status" ON public.book_request;
CREATE POLICY "Users and providers can update booking status"
  ON public.book_request FOR UPDATE
  TO authenticated
  USING (public.is_current_user(user_id::TEXT) OR public.is_current_user(provider_id::TEXT));

-- ==============================================================================
-- 9. NOTIFICATIONS & PUSH TOKENS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  category TEXT DEFAULT 'general' NOT NULL,
  is_read BOOLEAN DEFAULT FALSE NOT NULL,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.notifications ADD COLUMN IF NOT EXISTS user_id UUID;
ALTER TABLE public.notifications ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.notifications ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE public.notifications ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'general';
ALTER TABLE public.notifications ADD COLUMN IF NOT EXISTS is_read BOOLEAN DEFAULT FALSE;
ALTER TABLE public.notifications ADD COLUMN IF NOT EXISTS action_url TEXT;
ALTER TABLE public.notifications ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own notifications" ON public.notifications;
CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  TO authenticated
  USING (public.is_current_user(user_id::TEXT));

DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;
CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  TO authenticated
  USING (public.is_current_user(user_id::TEXT));

CREATE TABLE IF NOT EXISTS public.push_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  platform TEXT DEFAULT 'ANDROID' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, token)
);

ALTER TABLE public.push_tokens ADD COLUMN IF NOT EXISTS user_id UUID;
ALTER TABLE public.push_tokens ADD COLUMN IF NOT EXISTS token TEXT;
ALTER TABLE public.push_tokens ADD COLUMN IF NOT EXISTS platform TEXT DEFAULT 'ANDROID';
ALTER TABLE public.push_tokens ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());
ALTER TABLE public.push_tokens ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

ALTER TABLE public.push_tokens ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can register push tokens" ON public.push_tokens;
CREATE POLICY "Users can register push tokens"
  ON public.push_tokens FOR ALL
  TO authenticated
  USING (public.is_current_user(user_id::TEXT))
  WITH CHECK (public.is_current_user(user_id::TEXT));

-- ==============================================================================
-- 10. CMS & INSTITUTIONAL CONTENT (Initiatives, Events, Resources)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.initiatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  tagline TEXT,
  description TEXT NOT NULL,
  full_description TEXT,
  status content_status DEFAULT 'PUBLISHED'::content_status NOT NULL,
  cover_image_url TEXT,
  pillars TEXT[] DEFAULT ARRAY[]::TEXT[],
  schedule TEXT,
  location TEXT,
  highlights TEXT[] DEFAULT ARRAY[]::TEXT[],
  department_affiliation TEXT DEFAULT 'CEAPS · SGT University',
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.initiatives ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.initiatives ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.initiatives ADD COLUMN IF NOT EXISTS tagline TEXT;
ALTER TABLE public.initiatives ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.initiatives ADD COLUMN IF NOT EXISTS full_description TEXT;
ALTER TABLE public.initiatives ADD COLUMN IF NOT EXISTS status content_status DEFAULT 'PUBLISHED'::content_status;
ALTER TABLE public.initiatives ADD COLUMN IF NOT EXISTS cover_image_url TEXT;
ALTER TABLE public.initiatives ADD COLUMN IF NOT EXISTS pillars TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE public.initiatives ADD COLUMN IF NOT EXISTS schedule TEXT;
ALTER TABLE public.initiatives ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE public.initiatives ADD COLUMN IF NOT EXISTS highlights TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE public.initiatives ADD COLUMN IF NOT EXISTS department_affiliation TEXT DEFAULT 'CEAPS · SGT University';
ALTER TABLE public.initiatives ADD COLUMN IF NOT EXISTS display_order INT DEFAULT 0;
ALTER TABLE public.initiatives ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());
ALTER TABLE public.initiatives ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

ALTER TABLE public.initiatives ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published initiatives" ON public.initiatives;
CREATE POLICY "Public can view published initiatives"
  ON public.initiatives FOR SELECT
  USING (status = 'PUBLISHED'::content_status);

DROP POLICY IF EXISTS "Admins and editors can manage initiatives" ON public.initiatives;
CREATE POLICY "Admins and editors can manage initiatives"
  ON public.initiatives FOR ALL
  TO authenticated
  USING (public.is_admin());

CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  full_description TEXT,
  event_date DATE NOT NULL,
  event_time TEXT NOT NULL,
  location TEXT NOT NULL,
  facilitator TEXT NOT NULL,
  facilitator_role TEXT,
  capacity INT DEFAULT 30 NOT NULL,
  registered_count INT DEFAULT 0 NOT NULL,
  status event_status DEFAULT 'REGISTRATION_OPEN'::event_status NOT NULL,
  cover_image_url TEXT,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  department_affiliation TEXT DEFAULT 'CEAPS · SGT University',
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.events ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS description TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS full_description TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS event_date DATE;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS event_time TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS facilitator TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS facilitator_role TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS capacity INT DEFAULT 30;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS registered_count INT DEFAULT 0;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS status event_status DEFAULT 'REGISTRATION_OPEN'::event_status;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS cover_image_url TEXT;
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS department_affiliation TEXT DEFAULT 'CEAPS · SGT University';
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());
ALTER TABLE public.events ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view events" ON public.events;
CREATE POLICY "Public can view events"
  ON public.events FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Admins and event managers can manage events" ON public.events;
CREATE POLICY "Admins and event managers can manage events"
  ON public.events FOR ALL
  TO authenticated
  USING (
    public.is_admin() OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'EVENT_MANAGER'
    )
  );

CREATE TABLE IF NOT EXISTS public.event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  student_name TEXT NOT NULL,
  student_email TEXT NOT NULL,
  student_id TEXT NOT NULL,
  faculty_department TEXT NOT NULL,
  notes TEXT,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(event_id, student_email)
);

ALTER TABLE public.event_registrations ADD COLUMN IF NOT EXISTS event_id UUID;
ALTER TABLE public.event_registrations ADD COLUMN IF NOT EXISTS student_name TEXT;
ALTER TABLE public.event_registrations ADD COLUMN IF NOT EXISTS student_email TEXT;
ALTER TABLE public.event_registrations ADD COLUMN IF NOT EXISTS student_id TEXT;
ALTER TABLE public.event_registrations ADD COLUMN IF NOT EXISTS faculty_department TEXT;
ALTER TABLE public.event_registrations ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE public.event_registrations ADD COLUMN IF NOT EXISTS user_id UUID;
ALTER TABLE public.event_registrations ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can register for events" ON public.event_registrations;
CREATE POLICY "Public can register for events"
  ON public.event_registrations FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view event registrations" ON public.event_registrations;
CREATE POLICY "Admins can view event registrations"
  ON public.event_registrations FOR SELECT
  TO authenticated
  USING (
    public.is_admin() OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'EVENT_MANAGER'
    )
  );

CREATE TABLE IF NOT EXISTS public.resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  read_time TEXT,
  summary TEXT NOT NULL,
  author TEXT NOT NULL,
  author_role TEXT,
  department_affiliation TEXT DEFAULT 'CEAPS · SGT University',
  published_date DATE DEFAULT CURRENT_DATE NOT NULL,
  status content_status DEFAULT 'PUBLISHED'::content_status NOT NULL,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  content TEXT[] DEFAULT ARRAY[]::TEXT[],
  key_takeaways TEXT[] DEFAULT ARRAY[]::TEXT[],
  download_url TEXT,
  external_url TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS resource_type TEXT;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS read_time TEXT;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS summary TEXT;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS author TEXT;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS author_role TEXT;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS department_affiliation TEXT DEFAULT 'CEAPS · SGT University';
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS published_date DATE DEFAULT CURRENT_DATE;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS status content_status DEFAULT 'PUBLISHED'::content_status;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS content TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS key_takeaways TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS download_url TEXT;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS external_url TEXT;
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());
ALTER TABLE public.resources ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view published resources" ON public.resources;
CREATE POLICY "Public can view published resources"
  ON public.resources FOR SELECT
  USING (status = 'PUBLISHED'::content_status);

DROP POLICY IF EXISTS "Admins and editors can manage resources" ON public.resources;
CREATE POLICY "Admins and editors can manage resources"
  ON public.resources FOR ALL
  TO authenticated
  USING (
    public.is_admin() OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'CONTENT_EDITOR'
    )
  );

CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  category TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'New' NOT NULL,
  internal_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS name TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS subject TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS message TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'New';
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS internal_notes TEXT;
ALTER TABLE public.contact_submissions ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can insert contact submissions" ON public.contact_submissions;
CREATE POLICY "Public can insert contact submissions"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Only authorized staff can view contact submissions" ON public.contact_submissions;
CREATE POLICY "Only authorized staff can view contact submissions"
  ON public.contact_submissions FOR SELECT
  TO authenticated
  USING (public.is_admin());

CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.newsletter_subscriptions ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.newsletter_subscriptions ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;
ALTER TABLE public.newsletter_subscriptions ADD COLUMN IF NOT EXISTS subscribed_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can subscribe to newsletter" ON public.newsletter_subscriptions;
CREATE POLICY "Public can subscribe to newsletter"
  ON public.newsletter_subscriptions FOR INSERT
  WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor TEXT NOT NULL,
  actor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.audit_logs ADD COLUMN IF NOT EXISTS actor TEXT;
ALTER TABLE public.audit_logs ADD COLUMN IF NOT EXISTS actor_id UUID;
ALTER TABLE public.audit_logs ADD COLUMN IF NOT EXISTS action TEXT;
ALTER TABLE public.audit_logs ADD COLUMN IF NOT EXISTS entity TEXT;
ALTER TABLE public.audit_logs ADD COLUMN IF NOT EXISTS entity_id TEXT;
ALTER TABLE public.audit_logs ADD COLUMN IF NOT EXISTS details TEXT;
ALTER TABLE public.audit_logs ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW());

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Only admins can view audit logs" ON public.audit_logs;
CREATE POLICY "Only admins can view audit logs"
  ON public.audit_logs FOR SELECT
  TO authenticated
  USING (public.is_admin());

-- Safely add tables to Supabase Realtime publication
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'notifications'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'messages'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'community_post'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.community_post;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'book_request'
  ) THEN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.book_request;
  END IF;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
