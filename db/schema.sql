-- Client portal schema. Safe to run more than once: `npm run db:migrate`.

CREATE TABLE IF NOT EXISTS staff (
  id          serial PRIMARY KEY,
  email       text NOT NULL UNIQUE,
  name        text NOT NULL,
  -- admin: everything, including staff; consultant: families, sessions and notes; tutor: own sessions and notes
  role        text NOT NULL CHECK (role IN ('admin', 'consultant', 'tutor')),
  active      boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS families (
  id                  serial PRIMARY KEY,
  name                text NOT NULL,
  -- The parent signs in with this address; their login is linked on first visit.
  email               text NOT NULL UNIQUE,
  phone               text,
  timezone            text NOT NULL DEFAULT 'Europe/London',
  consultant_id       integer REFERENCES staff(id) ON DELETE SET NULL,
  clerk_user_id       text UNIQUE,
  stripe_customer_id  text,
  created_at          timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS children (
  id          serial PRIMARY KEY,
  family_id   integer NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  name        text NOT NULL,
  year_group  text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sessions (
  id          serial PRIMARY KEY,
  family_id   integer NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  child_id    integer REFERENCES children(id) ON DELETE SET NULL,
  staff_id    integer REFERENCES staff(id) ON DELETE SET NULL,
  title       text NOT NULL,
  starts_at   timestamptz NOT NULL,
  minutes     integer NOT NULL DEFAULT 60 CHECK (minutes BETWEEN 5 AND 480),
  join_url    text,
  status      text NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS sessions_family_starts ON sessions (family_id, starts_at);
CREATE INDEX IF NOT EXISTS sessions_staff_starts ON sessions (staff_id, starts_at);

CREATE TABLE IF NOT EXISTS session_notes (
  id                 serial PRIMARY KEY,
  session_id         integer NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  author_id          integer REFERENCES staff(id) ON DELETE SET NULL,
  body               text NOT NULL,
  homework           text,
  -- Internal notes stay with staff; shared notes appear in the family's portal.
  shared_with_family boolean NOT NULL DEFAULT true,
  created_at         timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS session_notes_session ON session_notes (session_id);

-- Small key/value store for values set up automatically, such as the Stripe webhook's signing secret.
CREATE TABLE IF NOT EXISTS app_settings (
  key         text PRIMARY KEY,
  value       text NOT NULL,
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Online purchases, recorded by the Stripe webhook so staff can see every order in the portal.
CREATE TABLE IF NOT EXISTS orders (
  id                     serial PRIMARY KEY,
  stripe_session_id      text NOT NULL UNIQUE,
  product_id             text,
  product_name           text NOT NULL,
  amount_pence           integer,
  currency               text NOT NULL DEFAULT 'gbp',
  recurring              boolean NOT NULL DEFAULT false,
  status                 text NOT NULL DEFAULT 'paid' CHECK (status IN ('paid', 'payment_failed', 'cancelled')),
  customer_name          text,
  customer_email         text,
  customer_phone         text,
  child                  text,
  family_id              integer REFERENCES families(id) ON DELETE SET NULL,
  stripe_customer_id     text,
  stripe_subscription_id text,
  created_at             timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS orders_created ON orders (created_at DESC);
CREATE INDEX IF NOT EXISTS orders_subscription ON orders (stripe_subscription_id);

-- CRM: one contact per person (matched by email), with a timeline of everything that happened.
-- Website forms, bookings and online orders add to it automatically; staff add notes and calls.
CREATE TABLE IF NOT EXISTS contacts (
  id               serial PRIMARY KEY,
  name             text NOT NULL,
  email            text NOT NULL,
  phone            text,
  kind             text NOT NULL DEFAULT 'family' CHECK (kind IN ('family', 'ambassador', 'other')),
  stage            text NOT NULL DEFAULT 'new' CHECK (stage IN ('new', 'contacted', 'consultation', 'client', 'closed')),
  owner_id         integer REFERENCES staff(id) ON DELETE SET NULL,
  family_id        integer REFERENCES families(id) ON DELETE SET NULL,
  source           text,
  last_activity_at timestamptz NOT NULL DEFAULT now(),
  created_at       timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS contacts_email ON contacts (lower(email));
CREATE INDEX IF NOT EXISTS contacts_stage ON contacts (stage, last_activity_at DESC);

CREATE TABLE IF NOT EXISTS activities (
  id          serial PRIMARY KEY,
  contact_id  integer NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  type        text NOT NULL CHECK (type IN ('enquiry', 'guide', 'ambassador', 'booking', 'order', 'note', 'call', 'email', 'stage')),
  summary     text NOT NULL,
  details     jsonb NOT NULL DEFAULT '{}',
  staff_id    integer REFERENCES staff(id) ON DELETE SET NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS activities_contact ON activities (contact_id, created_at DESC);

-- Bring existing families and orders into the CRM (runs harmlessly on every deploy).
INSERT INTO contacts (name, email, phone, stage, owner_id, family_id, source, created_at)
SELECT f.name, lower(f.email), f.phone, 'client', f.consultant_id, f.id, 'portal', f.created_at FROM families f
ON CONFLICT (lower(email)) DO UPDATE SET family_id = COALESCE(contacts.family_id, EXCLUDED.family_id);
INSERT INTO contacts (name, email, phone, stage, source, created_at)
SELECT DISTINCT ON (lower(o.customer_email)) COALESCE(o.customer_name, o.customer_email), lower(o.customer_email), o.customer_phone, 'client', 'online order', o.created_at
FROM orders o WHERE o.customer_email IS NOT NULL ORDER BY lower(o.customer_email), o.created_at
ON CONFLICT (lower(email)) DO NOTHING;

-- Attach any online orders to the family with the same email (runs harmlessly on every deploy), so
-- purchases made before a portal account existed show up as soon as that person signs in.
UPDATE orders o SET family_id = f.id
  FROM families f
 WHERE o.family_id IS NULL AND o.customer_email IS NOT NULL AND lower(o.customer_email) = lower(f.email);

-- Lessons families ask for from their portal. An admin approves each one and assigns the tutor or consultant,
-- which creates the lesson; nothing is scheduled until then.
CREATE TABLE IF NOT EXISTS lesson_requests (
  id            serial PRIMARY KEY,
  family_id     integer NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  child_id      integer REFERENCES children(id) ON DELETE SET NULL,
  subject       text NOT NULL,
  details       text,
  preferred     text,
  status        text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'declined')),
  decision_note text,
  handled_by    integer REFERENCES staff(id) ON DELETE SET NULL,
  handled_at    timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS lesson_requests_status ON lesson_requests (status, created_at DESC);
CREATE INDEX IF NOT EXISTS lesson_requests_family ON lesson_requests (family_id, created_at DESC);

-- In-portal video lessons (Daily). One private room per lesson, created the first time someone joins.
ALTER TABLE sessions ADD COLUMN IF NOT EXISTS room_url text;

-- Documents an admin or consultant uploads for a family (reports, plans, letters). Only that family and the team can open them.
CREATE TABLE IF NOT EXISTS documents (
  id          serial PRIMARY KEY,
  family_id   integer NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  title       text NOT NULL,
  note        text,
  filename    text NOT NULL,
  mime        text NOT NULL,
  size        integer NOT NULL,
  data        bytea NOT NULL,
  uploaded_by integer REFERENCES staff(id) ON DELETE SET NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS documents_family ON documents (family_id, created_at DESC);

-- Documents that need a signature from the family, signed in the portal.
ALTER TABLE documents ADD COLUMN IF NOT EXISTS needs_signature boolean NOT NULL DEFAULT false;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS signed_at timestamptz;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS signed_name text;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS signed_ip text;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS signed_agent text;
ALTER TABLE documents ADD COLUMN IF NOT EXISTS signed_hash text;
-- The signed copy: the original PDF with a certificate page added, or just the certificate for other file types.
ALTER TABLE documents ADD COLUMN IF NOT EXISTS signed_data bytea;

-- Weekly hours each tutor, consultant or admin can take paid sessions, in UK time.
-- weekday: 0 Sunday to 6 Saturday; start_min and end_min are minutes after midnight.
CREATE TABLE IF NOT EXISTS availability (
  id         serial PRIMARY KEY,
  staff_id   integer NOT NULL REFERENCES staff(id) ON DELETE CASCADE,
  weekday    smallint NOT NULL CHECK (weekday BETWEEN 0 AND 6),
  start_min  integer NOT NULL CHECK (start_min BETWEEN 0 AND 1440),
  end_min    integer NOT NULL CHECK (end_min BETWEEN 0 AND 1440),
  CHECK (end_min > start_min)
);
CREATE INDEX IF NOT EXISTS availability_staff ON availability (staff_id, weekday);

-- A paid session (strategy session, trial lesson) is booked once into the portal calendar.
ALTER TABLE orders ADD COLUMN IF NOT EXISTS session_id integer REFERENCES sessions(id) ON DELETE SET NULL;

-- Details collected after a pay-first purchase (child, year group, what they need). Null until the family fills them in.
ALTER TABLE orders ADD COLUMN IF NOT EXISTS onboarding jsonb;

-- Who did what in the portal: sign-ins, documents opened or signed, bookings, and who joined or left each online lesson.
CREATE TABLE IF NOT EXISTS activity_log (
  id          bigserial PRIMARY KEY,
  at          timestamptz NOT NULL DEFAULT now(),
  actor_key   text NOT NULL,          -- 'staff:<id>' or 'family:<id>'
  actor_kind  text NOT NULL CHECK (actor_kind IN ('staff', 'family')),
  actor_name  text NOT NULL,
  actor_role  text,
  family_id   integer REFERENCES families(id) ON DELETE CASCADE,
  session_id  integer REFERENCES sessions(id) ON DELETE CASCADE,
  action      text NOT NULL,
  detail      text,
  ip          text,
  agent       text
);
CREATE INDEX IF NOT EXISTS activity_log_at ON activity_log (at DESC);
CREATE INDEX IF NOT EXISTS activity_log_actor ON activity_log (actor_key, at DESC);
CREATE INDEX IF NOT EXISTS activity_log_family ON activity_log (family_id, at DESC);
CREATE INDEX IF NOT EXISTS activity_log_session ON activity_log (session_id, at);

-- What was said on an online call, in short pieces. Each person's browser sends its own microphone to be
-- transcribed (Groq Whisper), and the pieces are merged by time. Staff only.
CREATE TABLE IF NOT EXISTS transcript_segments (
  id         bigserial PRIMARY KEY,
  session_id integer NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  speaker    text NOT NULL,
  said_at    timestamptz NOT NULL,
  body       text NOT NULL
);
CREATE INDEX IF NOT EXISTS transcript_segments_session ON transcript_segments (session_id, said_at);

-- The written-up call: the merged transcript and an AI summary. Staff only until someone on the team reads the
-- summary and chooses to release it to the family.
CREATE TABLE IF NOT EXISTS session_transcripts (
  id                 serial PRIMARY KEY,
  session_id         integer NOT NULL UNIQUE REFERENCES sessions(id) ON DELETE CASCADE,
  transcript         text NOT NULL,
  summary            text,
  summary_error      text,
  released_to_family boolean NOT NULL DEFAULT false,
  created_at         timestamptz NOT NULL DEFAULT now()
);
