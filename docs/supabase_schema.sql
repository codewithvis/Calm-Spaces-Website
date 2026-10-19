-- ==============================================================================
-- C.A.L.M SPACES · CEAPS · SGT UNIVERSITY
-- Production Supabase Database Schema & Migration Specification
-- Version: 2.0.0
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Core Enums
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('STUDENT', 'PEER_LISTENER', 'EXPERT', 'CONTENT_EDITOR', 'EVENT_MANAGER', 'ADMIN', 'SUPER_ADMIN');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE content_status AS ENUM ('DRAFT', 'REVIEW', 'PUBLISHED', 'ARCHIVED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE event_status AS ENUM ('UPCOMING', 'REGISTRATION_OPEN', 'FULL', 'COMPLETED', 'CANCELLED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- ==============================================================================
-- 3. Profiles (Preserving existing Android contract)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  student_id TEXT,
  department TEXT,
  year_of_study TEXT,
  role user_role DEFAULT 'STUDENT'::user_role NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  is_verified_listener BOOLEAN DEFAULT FALSE,
  is_expert BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ==============================================================================
-- 4. Mood Entries (Preserving existing Android contract)
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
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

ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own mood entries"
  ON public.mood_entries FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own mood entries"
  ON public.mood_entries FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_mood_user_date ON public.mood_entries(user_id, entry_date DESC);

-- ==============================================================================
-- 5. Initiatives Directory (CMS Extension)
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

ALTER TABLE public.initiatives ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published initiatives"
  ON public.initiatives FOR SELECT
  USING (status = 'PUBLISHED'::content_status);

CREATE POLICY "Admins and editors can manage initiatives"
  ON public.initiatives FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('ADMIN', 'SUPER_ADMIN', 'CONTENT_EDITOR')
    )
  );

-- ==============================================================================
-- 6. Events & Activities (CMS Extension)
-- ==============================================================================
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

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view events"
  ON public.events FOR SELECT
  USING (true);

CREATE POLICY "Admins and event managers can manage events"
  ON public.events FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('ADMIN', 'SUPER_ADMIN', 'EVENT_MANAGER')
    )
  );

-- ==============================================================================
-- 7. Event Registrations
-- ==============================================================================
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

ALTER TABLE public.event_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can register for events"
  ON public.event_registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view event registrations"
  ON public.event_registrations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('ADMIN', 'SUPER_ADMIN', 'EVENT_MANAGER')
    )
  );

-- ==============================================================================
-- 8. Educational Resources
-- ==============================================================================
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

ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published resources"
  ON public.resources FOR SELECT
  USING (status = 'PUBLISHED'::content_status);

CREATE POLICY "Admins and editors can manage resources"
  ON public.resources FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('ADMIN', 'SUPER_ADMIN', 'CONTENT_EDITOR')
    )
  );

-- ==============================================================================
-- 9. Contact Submissions (Secure Inquiries)
-- ==============================================================================
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

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert contact submissions"
  ON public.contact_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only authorized staff can view contact submissions"
  ON public.contact_submissions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('ADMIN', 'SUPER_ADMIN')
    )
  );

-- ==============================================================================
-- 10. Newsletter Subscriptions
-- ==============================================================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can subscribe to newsletter"
  ON public.newsletter_subscriptions FOR INSERT
  WITH CHECK (true);

-- ==============================================================================
-- 11. Administrative Audit Logs
-- ==============================================================================
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

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view audit logs"
  ON public.audit_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('ADMIN', 'SUPER_ADMIN')
    )
  );
