-- ==============================================================================
-- C.A.L.M Spaces · Supabase Seed Data
-- Run this AFTER the schema migration (docs/supabase_schema.sql)
-- via Supabase Dashboard → SQL Editor or `supabase db reset`
-- ==============================================================================

-- 1. INITIATIVES
-- ==============================================================================
INSERT INTO public.initiatives (slug, title, category, tagline, description, full_description, status, cover_image_url, pillars, schedule, location, highlights, department_affiliation, display_order)
VALUES
  ('colour-the-chaos', 'Colour the Chaos', 'Expressive Arts',
   'Expressive arts, mandala painting, and creative emotional release.',
   'An expressive art therapy and mandala session designed to give students a tactile, non-verbal space to release cognitive tension, unwind from academic deadlines, and cultivate emotional lightness.',
   'Colour the Chaos is one of C.A.L.M Spaces'' signature campus initiatives under CEAPS. Designed to bridge art and psychological decompression, this workshop provides students with canvasses, clay, watercolours, and meditative mandalas. Students are guided to engage with the creative process without focusing on artistic perfection, transforming internal pressure into spontaneous visual expression.',
   'PUBLISHED', '/botanical-motif.svg',
   ARRAY['Awareness','Lightness','Movement'],
   'Bi-weekly Wednesdays · 3:30 PM', 'A Block, Room 10 & CEAPS Hall, SGT University',
   ARRAY['No prior artistic skills required; process-oriented rather than outcome-focused','Facilitated by CEAPS psychological counsellors and soft skills trainers','Guided somatic grounding and calming instrumental soundscape','Dedicated reflection and gentle sharing circle at conclusion'],
   'CEAPS · SGT University', 1),

  ('calm-companions', 'C.A.L.M Companions', 'Peer Connection',
   'Trained peer listeners creating safe, judgment-free micro-conversations.',
   'A peer-led emotional support initiative where trained student listeners provide brief, confidential, judgment-free conversations to fellow students navigating stress, isolation, or everyday emotional weight.',
   'C.A.L.M Companions is the heart of peer-to-peer mental health support at SGT University. Selected from diverse faculties and supervised by CEAPS clinical staff, Companions undergo a rigorous 40-hour certification in active listening, emotional first aid, and boundary setting.',
   'PUBLISHED', '/botanical-motif.svg',
   ARRAY['Cultivating','Awareness','Lightness'],
   'Weekday drop-in hours · 10 AM – 4 PM', 'C.A.L.M Spaces Studio, A Block Room 10',
   ARRAY['Trained student listeners providing empathic, non-directive support','40-hour certification program supervised by CEAPS clinical staff','Confidential micro-conversations (15–25 minutes)','Referral pathways to professional counselling when needed'],
   'CEAPS · SGT University', 2),

  ('mindful-mornings', 'Mindful Mornings', 'Mindfulness & Movement',
   'Somatic grounding, breathwork, and guided campus green walks.',
   'A weekly early-morning wellness programme combining diaphragmatic breathwork, sensory grounding techniques, and slow mindful walks across the SGT University campus grounds.',
   'Mindful Mornings invites students to begin their day with intentionality rather than reactive scrolling. Led by CEAPS wellness facilitators, each session opens with a 5-minute body scan, transitions into guided rhythmic walking across the campus central lawns, and closes with a brief gratitude anchoring exercise.',
   'PUBLISHED', '/botanical-motif.svg',
   ARRAY['Cultivating','Movement'],
   'Tuesdays & Thursdays · 8:00 AM', 'Campus Amphitheatre Steps, SGT University',
   ARRAY['No equipment or experience needed — just show up','Guided breathwork and five-sense somatic anchoring','Slow rhythmic outdoor walking on university green spaces','Brief gratitude journaling at conclusion'],
   'CEAPS · SGT University', 3),

  ('resilience-lab', 'Resilience Lab', 'Academic Resilience',
   'Evidence-based workshops on exam anxiety, sleep hygiene, and cognitive resilience.',
   'A psycho-educational workshop series addressing exam anxiety, procrastination patterns, sleep optimisation, and sustainable study stamina using evidence-based psychological tools.',
   'The Resilience Lab is designed for students who want to understand the neuroscience behind their academic stress responses. Through interactive seminars, students learn to identify early hyper-arousal signals, implement Non-Sleep Deep Rest (NSDR) protocols, and develop personalised cognitive stamina plans.',
   'PUBLISHED', '/botanical-motif.svg',
   ARRAY['Awareness','Lightness','Movement'],
   'Monthly deep-dive sessions', 'CEAPS Seminar Hall 2, SGT University',
   ARRAY['Interactive psycho-educational seminars with live demonstrations','Evidence-based tools: NSDR protocols, cognitive defusion, micro-task planning','Guest clinical psychologists and visiting specialists','Personalised take-home resilience blueprints'],
   'CEAPS · SGT University', 4),

  ('awareness-amplified', 'Awareness Amplified', 'Awareness Campaigns',
   'Campus-wide mental health campaigns, empathy walls, and stigma-reduction drives.',
   'Large-scale awareness campaigns across SGT University campus designed to normalise conversations about mental health, reduce stigma, and increase visibility of psychological support resources.',
   'From World Mental Health Day installations to Anti-Stigma Week photo campaigns, Awareness Amplified transforms the SGT University campus into a living conversation about psychological well-being. Past campaigns have included anonymous empathy walls, interactive psycho-educational kiosks, and faculty sensitisation workshops.',
   'PUBLISHED', '/botanical-motif.svg',
   ARRAY['Cultivating','Awareness'],
   'Key calendar dates + special university events', 'Campus-wide, SGT University',
   ARRAY['World Mental Health Day symposia and installations','Interactive anonymous empathy walls and stigma-reduction photo campaigns','Faculty and staff sensitisation workshops','Distributed self-care pocket guides and digital resources'],
   'CEAPS · SGT University', 5)
ON CONFLICT (slug) DO NOTHING;


-- 2. EVENTS
-- ==============================================================================
INSERT INTO public.events (slug, title, category, description, full_description, event_date, event_time, location, facilitator, facilitator_role, capacity, registered_count, status, cover_image_url, tags, department_affiliation)
VALUES
  ('colour-the-chaos-october', 'Colour the Chaos: Autumn Mandala & Mindfulness', 'Workshop',
   'Unplug from the rush of assignments with guided expressive mandala drawing, rhythmic music, and non-judgmental decompression.',
   'Join the C.A.L.M Spaces team for an afternoon dedicated to creative decompression. Using mandalas, watercolors, and textured pastels, we explore art as an experiential container for releasing cognitive clutter.',
   '2026-10-28', '3:30 PM – 5:00 PM', 'C.A.L.M Spaces Studio, A Block Room 10, SGT University',
   'Ms. Parvneet Kaur & Ms. Vaishnavi', 'Lead Psychologist & Soft Skills Trainer, CEAPS',
   25, 18, 'REGISTRATION_OPEN', '/botanical-motif.svg',
   ARRAY['Expressive Arts','Mindfulness','De-stress'], 'CEAPS · SGT University'),

  ('thursday-student-listening-circle', 'Student Listening Circle: Navigating Mid-Semester Transitions', 'Listening Circle',
   'A small, confidential circle facilitated by trained C.A.L.M Companions and CEAPS counsellors for open sharing and mutual validation.',
   'Mid-semester can bring unexpected isolation, changing friendships, and academic strain. Our weekly listening circle provides an unhurried, confidential container where SGT University students can express what is truly present.',
   '2026-11-05', '4:00 PM – 5:15 PM', 'Quiet Reflection Room, CEAPS Wing, SGT University',
   'C.A.L.M Companions Peer Team', 'Supervised by CEAPS Psychological Faculty',
   12, 8, 'REGISTRATION_OPEN', '/botanical-motif.svg',
   ARRAY['Peer Support','Safe Space','Confidential'], 'C.A.L.M Spaces · SGT University'),

  ('morning-mindful-campus-walk', 'Somatic Grounding & Campus Green Walk', 'Mindfulness',
   'Start your morning with sensory outdoor grounding, diaphragmatic pacing, and mindful movement across SGT green lawns.',
   'Before classes and screens demand your full attention, gift yourself 45 minutes of movement. Led by our wellness facilitators, this walk combines five-sense somatic anchoring, slow rhythmic pacing, and natural grounding.',
   '2026-11-10', '8:00 AM – 8:45 AM', 'Assemble at Campus Amphitheatre Steps, SGT University',
   'CEAPS Wellness Team', 'Movement & Awareness Mentors',
   30, 14, 'REGISTRATION_OPEN', '/botanical-motif.svg',
   ARRAY['Movement','Grounding','Outdoor'], 'CEAPS Department'),

  ('exam-anxiety-and-sleep-hygiene', 'Demystifying Exam Anxiety & Sleep Hygiene Masterclass', 'Seminar',
   'Evidence-based psychological tools for regulating cardiovascular panic spikes, optimizing deep rest, and sustaining cognitive clarity.',
   'An interactive seminar providing practical psycho-education on how the autonomic nervous system responds to evaluation stress.',
   '2026-11-18', '2:00 PM – 3:30 PM', 'CEAPS Seminar Hall 2, SGT University',
   'Dr. Astha Chaudhry & Guest Clinical Psychologist', 'Director, CEAPS & Visiting Specialist',
   60, 42, 'REGISTRATION_OPEN', '/botanical-motif.svg',
   ARRAY['Exam Prep','Sleep Hygiene','Resilience'], 'CEAPS · SGT University'),

  ('freshers-wellbeing-orientation-2026', 'Freshers'' Well-being Orientation: Your Space from Day One', 'Campaign',
   'Welcoming the incoming cohort with an introduction to campus psychological resources, mental wellness myth-busting, and peer buddy sign-ups.',
   'An extensive orientation symposium introducing thousands of first-year students to C.A.L.M Spaces, our room location, confidential counselling access, and peer support networks.',
   '2026-08-20', '10:00 AM – 1:00 PM', 'University Main Auditorium',
   'Dr. Astha Chaudhry, Ms. Parvneet Kaur & CEAPS Faculty', 'CEAPS Leadership Team',
   250, 250, 'COMPLETED', '/botanical-motif.svg',
   ARRAY['Orientation','Community','Welcome'], 'CEAPS · SGT University'),

  ('world-mental-health-day-symposium', 'World Mental Health Day: Mental Health as a Universal Human Right', 'Campaign',
   'Campus-wide awareness campaign, anonymous empathy wall, and interactive psycho-educational kiosk installations.',
   'Commemorating World Mental Health Day across SGT University with over 600 student interactions, expert panel discussions, and distributed self-care pocket guides.',
   '2026-10-10', '9:30 AM – 4:00 PM', 'Central Campus Plaza & CEAPS Hub',
   'All CEAPS & C.A.L.M Spaces Coordinators', 'Multidisciplinary Faculty & Student Volunteers',
   200, 200, 'COMPLETED', '/botanical-motif.svg',
   ARRAY['Awareness','Stigma Reduction','Campus-Wide'], 'CEAPS · SGT University')
ON CONFLICT (slug) DO NOTHING;


-- 3. RESOURCES
-- ==============================================================================
INSERT INTO public.resources (slug, title, category, resource_type, read_time, summary, author, author_role, department_affiliation, published_date, status, tags, content, key_takeaways)
VALUES
  ('managing-academic-overwhelm', 'Understanding & Navigating Academic Overwhelm', 'Stress Management', 'Article', '5 min read',
   'A gentle, evidence-grounded framework for recognizing when cognitive pressure is stacking up and how to step back safely.',
   'Ms. Parvneet Kaur', 'Lead Psychologist, C.A.L.M Spaces · CEAPS', 'CEAPS · SGT University', '2026-10-14', 'PUBLISHED',
   ARRAY['Burnout','Stress','Pacing','Student Well-being'],
   ARRAY['Overwhelm rarely happens in a single moment. More often, it is an accumulation.','In psychology, we refer to cognitive load theory and allostatic load.','The first step in navigating overwhelm is not pushing through harder.','Try the Rule of Three Micro-Tasks.'],
   ARRAY['Overwhelm is a biological signal, not a personal failing','The Rule of Three Micro-Tasks breaks paralysis into 15-minute actions','Sleep is not laziness — it is consolidation','Reaching out is strength, not weakness']),

  ('building-emotional-vocabulary', 'Building Your Emotional Vocabulary', 'Emotional Intelligence', 'Guide', '4 min read',
   'Most students can identify "stressed" or "fine" — but nuanced emotional vocabulary unlocks better self-understanding and communication.',
   'Dr. Astha Chaudhry', 'Director, CEAPS · SGT University', 'CEAPS · SGT University', '2026-10-10', 'PUBLISHED',
   ARRAY['Emotional Intelligence','Self-Awareness','Communication'],
   ARRAY['How often do you describe your emotional state as just "fine" or "stressed"?','Psychologist Marc Brackett (Yale) developed the RULER framework.','When you name what you feel precisely, the amygdala response decreases.','Start a daily 2-minute "Name It to Tame It" practice.'],
   ARRAY['Granular emotional labelling reduces intensity of distress','The RULER framework helps map energy and pleasantness','Name It to Tame It is backed by neuroscience','Journaling with specific emotion words builds lasting self-awareness']),

  ('what-is-a-listening-circle', 'What Happens in a Listening Circle?', 'Mental Health Awareness', 'Article', '3 min read',
   'A transparent overview of what to expect, ground rules, and confidentiality in C.A.L.M Spaces listening circle sessions.',
   'C.A.L.M Companions Team', 'Peer Listener Programme, CEAPS', 'CEAPS · SGT University', '2026-09-28', 'PUBLISHED',
   ARRAY['Peer Support','Safe Space','Confidential'],
   ARRAY['A Listening Circle is not group therapy. It is a facilitated container for shared human experience.','Ground rules ensure safety: no advice-giving, no interrupting, no fixing.','Everything shared in a circle stays in the circle.','You may pass on any round if you are not ready to speak.'],
   ARRAY['Listening circles are not therapy — they are structured peer support','Strict confidentiality is the non-negotiable foundation','You can always pass — participation is never forced','Circles are facilitated by trained C.A.L.M Companions under CEAPS supervision']),

  ('five-minute-grounding-techniques', '5-Minute Grounding Techniques for Exam Season', 'Mindfulness & Grounding', 'Guide', '3 min read',
   'Quick, evidence-based grounding exercises you can do at your desk, in a hostel room, or before entering an exam hall.',
   'CEAPS Wellness Team', 'C.A.L.M Spaces Facilitators', 'CEAPS · SGT University', '2026-09-20', 'PUBLISHED',
   ARRAY['Grounding','Exam Prep','Anxiety','Quick Tools'],
   ARRAY['Grounding reconnects your awareness to the present moment when anxiety projects you into the future.','5-4-3-2-1 Sensory Anchor: Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste.','Box Breathing: Inhale 4 counts, hold 4 counts, exhale 4 counts, hold 4 counts.','Bilateral tapping: Gently alternate tapping your knees or crossing your arms and tapping your shoulders.'],
   ARRAY['5-4-3-2-1 brings your nervous system back to the present moment','Box Breathing regulates the autonomic nervous system in under 2 minutes','Bilateral stimulation activates both brain hemispheres','Consistency matters more than perfection — practice daily for best results']),

  ('understanding-counselling-at-sgt', 'Understanding Counselling at SGT University', 'Student Well-being', 'Article', '4 min read',
   'A comprehensive, reassuring guide to how professional counselling works at the CEAPS department — confidentiality, process, and what to expect in your first session.',
   'Dr. Astha Chaudhry', 'Director, CEAPS · SGT University', 'CEAPS · SGT University', '2026-09-15', 'PUBLISHED',
   ARRAY['Counselling','Confidential','Professional Help','First Session'],
   ARRAY['Professional counselling at CEAPS is completely confidential and free for all SGT University students.','Your first session is an intake conversation — you will not be pressured to share anything you are not ready for.','Sessions are typically 45–50 minutes and scheduled at your convenience.','Everything you share is protected under ethical confidentiality guidelines.'],
   ARRAY['Counselling is free, voluntary, and confidential for all SGT students','Your first session is gentle and exploratory, not interrogative','CEAPS counsellors follow ethical confidentiality guidelines','You can stop or pause at any time — your autonomy is always respected'])
ON CONFLICT (slug) DO NOTHING;

-- ==============================================================================
-- Seed complete. Run `SELECT count(*) FROM public.initiatives;` to verify.
-- ==============================================================================
