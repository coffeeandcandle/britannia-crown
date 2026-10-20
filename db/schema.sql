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
