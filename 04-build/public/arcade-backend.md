# The Last Stand - global leaderboard (Supabase)

The arcade board reads/writes through `src/lib/arcadeScores.js`. With no keys it
stays per-device. Add a free Supabase project to make it global.

## 1. Create the project
- Go to https://supabase.com -> New project (free tier is fine).
- Wait for it to provision.

## 2. Create the table + security
Open **SQL Editor** in Supabase and run:

```sql
create table if not exists public.scores (
  id         bigint generated always as identity primary key,
  name       text    not null check (char_length(name) <= 16),
  score      integer not null check (score >= 0 and score < 1000000),
  won        boolean not null default false,
  at         bigint  not null,
  created_at timestamptz not null default now()
);

-- fast top-N reads
create index if not exists scores_score_idx on public.scores (score desc);

-- Row Level Security: anyone may READ the board and SUBMIT a score,
-- but nobody can edit or delete via the public anon key.
alter table public.scores enable row level security;

create policy "public read" on public.scores
  for select using (true);

create policy "public insert" on public.scores
  for insert with check (
    char_length(name) <= 16 and score >= 0 and score < 1000000
  );
```

## 3. Add your keys
In Supabase: **Project Settings -> API**. Copy the **Project URL** and the
**anon / public** key. Then create `04-build/.env.local`:

```
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

(The anon key is meant to be public - RLS above is what protects the data.)

## 4. Restart
Stop and restart `npm run dev` (Vite only reads env vars at boot). The board now
shows everyone's scores. On your host (Vercel/Netlify/etc.) add the same two
env vars in the project settings.

## Notes
- Submissions are open (any client can POST a score). For a portfolio toy board
  that's fine; the CHECK constraints block absurd values. If it ever gets
  spammed, you can add a Supabase Edge Function to gate inserts.
- Without the keys, everything still works locally - scores just persist per
  device, and the board caption says so.
