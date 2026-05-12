import { VISITOR_COLORS, DEFAULT_COLOR } from './visitorColors.js'

// Deterministic name → color via DJB2-like hash, modulo palette size.
// Same name produces same color across sessions / devices. This is intentional —
// per /01-brand-book/05-wow-mechanics.md: a returning visitor whose persistent
// identity isn't stored still gets the same color back if they re-enter the
// same name.

function hashString(str) {
  // DJB2 hash. Simple, fast, well-distributed enough for a 1-of-8 mapping.
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i) // hash * 33 + c
    hash = hash & 0xFFFFFFFF // keep 32-bit
  }
  // Force unsigned
  return Math.abs(hash)
}

/**
 * Assign a color to a name deterministically.
 * @param {string|null|undefined} name — the visitor's entered name. Empty/null
 *   returns the DEFAULT_COLOR (slate, neutral) — visitors who skip onboarding.
 * @returns {object} one entry from VISITOR_COLORS
 */
export function assignColor(name) {
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return DEFAULT_COLOR
  }
  // Normalize — case-insensitive matching, trimmed whitespace.
  // Bangla / non-Latin codepoints work fine; charCodeAt covers Unicode.
  const normalized = name.trim().toLowerCase()
  const idx = hashString(normalized) % VISITOR_COLORS.length
  return VISITOR_COLORS[idx]
}

// Truncate visitor names to 20 chars per the onboarding wireframe.
export function normalizeName(input) {
  if (!input || typeof input !== 'string') return ''
  return input.trim().slice(0, 20)
}
