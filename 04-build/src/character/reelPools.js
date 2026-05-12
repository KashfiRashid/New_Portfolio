// reelPools.js — per-trigger reel selection for v1.3 contextual intelligence.
//
// Per character-spec-patch-contextual-intelligence.md §A3:
//   - Three reel triggers: bottom-of-page ('bottom'), section-dwell ('dwell'),
//     deep-idle ('deepIdle').
//   - Each trigger pulls from a dedicated pool:
//       'bottom'   → POOLS.completion   (reflective, "you read the whole thing")
//       'dwell'    → POOLS.bySection[section]  (relevant to current section)
//       'deepIdle' → POOLS.ambient      (low-stakes, "you've been here a while")
//   - Never repeat a reel within the same session (the caller passes a shared
//     `seen` Set so all three triggers respect each other).
//   - If a trigger's pool is exhausted, that trigger goes silent.
//
// v1.3 ships the trigger ARCHITECTURE. The per-trigger pools are intentionally
// empty placeholders — content lands in a follow-up. Until then we fall back
// to the existing idlePool reel clips so triggers produce something visible.

import idlePool from '../companion/idlePool.js'

const FALLBACK = idlePool
  .filter(item => item.type === 'reel' && item.clip)
  .map(item => item.clip)

const POOLS = {
  completion: [],
  ambient: [],
  bySection: {
    home: [],
    voice: [],
    eye: [],
    work: [],
    process: [],
    people: [],
    origin: [],
    'hall-of-fame': [],
  },
}

/**
 * Pick a reel clip for a contextual trigger.
 *
 * @param {'bottom'|'dwell'|'deepIdle'} triggerType
 * @param {string|null} section — current section (used for 'dwell' trigger)
 * @param {Set<string>} seen   — session-shared "already shown" set
 * @returns {string|null} reel clip identifier, or null if pool exhausted
 */
export function pickReel(triggerType, section, seen) {
  const candidates = []

  if (triggerType === 'bottom') {
    candidates.push(...POOLS.completion)
  } else if (triggerType === 'dwell') {
    candidates.push(...(POOLS.bySection[section] || []))
  } else if (triggerType === 'deepIdle') {
    candidates.push(...POOLS.ambient)
  }

  // Until per-trigger pools have content, fall back to the shared idlePool reels.
  if (candidates.length === 0) {
    candidates.push(...FALLBACK)
  }

  const available = candidates.filter(clip => !seen.has(clip))
  if (available.length === 0) return null
  return available[Math.floor(Math.random() * available.length)]
}

export default { pickReel }
