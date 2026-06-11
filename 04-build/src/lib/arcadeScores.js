// Arcade high scores - GLOBAL leaderboard via Supabase (PostgREST), with a
// localStorage fallback whenever the backend isn't configured or is offline.
//
// One-time setup (see public/arcade-backend.md for the full walkthrough + SQL):
//   1. Create a free project at https://supabase.com
//   2. Run the schema in arcade-backend.md (creates the `scores` table + RLS)
//   3. Put your keys in 04-build/.env.local :
//        VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
//        VITE_SUPABASE_ANON_KEY=eyJhbGci...
//   4. Restart the dev server (env vars load at boot).
//
// The anon/public key is SAFE to ship in the frontend: row-level security only
// allows reading the board and inserting a score - never edits or deletes.

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
const REMOTE = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

// true when the live global board is wired up (the UI uses this for its caption)
export const SCORES_ARE_GLOBAL = REMOTE

const REST = REMOTE ? `${SUPABASE_URL}/rest/v1/scores` : ''
const HEADERS = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
}

const KEY = 'arcade.spaceShooter.scores.v1'
const NAME_KEY = 'arcade.spaceShooter.name'
const MAX = 10

function localScores() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

function saveLocal(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list))
  } catch {
    /* storage unavailable - scores just won't persist */
  }
}

export async function getScores() {
  if (!REMOTE) return localScores()
  try {
    const res = await fetch(
      `${REST}?select=name,score,won,at&order=score.desc&limit=${MAX}`,
      { headers: HEADERS }
    )
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch {
    return localScores() // offline / misconfigured -> fall back to device scores
  }
}

export async function addScore(entry) {
  const clean = {
    name: String(entry.name || 'anon').slice(0, 16),
    score: Math.max(0, Math.floor(entry.score || 0)),
    won: !!entry.won,
    at: entry.at || Date.now(),
  }

  if (!REMOTE) {
    const next = [...localScores(), clean].sort((a, b) => b.score - a.score).slice(0, MAX)
    saveLocal(next)
    return next
  }

  try {
    const res = await fetch(REST, {
      method: 'POST',
      headers: { ...HEADERS, Prefer: 'return=minimal' },
      body: JSON.stringify(clean),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
  } catch {
    // network error - keep a local copy so the player still sees their run
    const next = [...localScores(), clean].sort((a, b) => b.score - a.score).slice(0, MAX)
    saveLocal(next)
    return next
  }

  return getScores() // pull the fresh global top-10 back down
}

export function getSavedName() {
  try {
    return localStorage.getItem(NAME_KEY) || ''
  } catch {
    return ''
  }
}

export function saveName(name) {
  try {
    localStorage.setItem(NAME_KEY, name)
  } catch {
    /* ignore */
  }
}
// end arcadeScores.js
