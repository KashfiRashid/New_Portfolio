/**
 * Perch definitions — valid character rest positions per section.
 * Positions are viewport-relative percentages, resolved to px at render time.
 * Per character-spec.md Section 5.1.
 *
 * Each perch has { id, x (%), y (%) }.
 * Lanes connect perches the character can walk between.
 */

const PERCH_SETS = {
  home: [
    { id: 'home-bl', x: 5, y: 82 },
    { id: 'home-br', x: 92, y: 82 },
    { id: 'home-tl', x: 5, y: 22 },
    { id: 'home-tr', x: 92, y: 22 },
    { id: 'home-ml', x: 5, y: 52 },
    { id: 'home-mr', x: 92, y: 52 },
    { id: 'home-bm', x: 50, y: 90, isOccluded: true },  // behind footer area
  ],
  voice: [
    { id: 'voice-tl', x: 4, y: 25 },
    { id: 'voice-bl', x: 4, y: 78 },
    { id: 'voice-tr', x: 94, y: 25 },
    { id: 'voice-br', x: 94, y: 78 },
  ],
  eye: [
    { id: 'eye-tl', x: 4, y: 25 },
    { id: 'eye-bl', x: 4, y: 78 },
    { id: 'eye-tr', x: 94, y: 25 },
    { id: 'eye-br', x: 94, y: 78 },
  ],
  work: [
    { id: 'work-bl', x: 4, y: 82 },
    { id: 'work-br', x: 94, y: 82 },
    { id: 'work-tl', x: 4, y: 20 },
    { id: 'work-tr', x: 94, y: 20 },
    { id: 'work-cl', x: 5, y: 45, isOccluded: true },   // behind project card grid
    { id: 'work-cr', x: 94, y: 45, isOccluded: true },  // behind project card grid
  ],
  process: [
    { id: 'proc-tr', x: 92, y: 20 },
    { id: 'proc-br', x: 92, y: 80 },
  ],
  people: [
    { id: 'ppl-bl', x: 4, y: 82 },
    { id: 'ppl-br', x: 94, y: 82 },
    { id: 'ppl-tl', x: 4, y: 20 },
    { id: 'ppl-tr', x: 94, y: 20 },
  ],
  origin: [
    { id: 'org-tl', x: 4, y: 25 },
    { id: 'org-bl', x: 4, y: 78 },
    { id: 'org-tr', x: 94, y: 25 },
    { id: 'org-br', x: 94, y: 78 },
  ],
  'hall-of-fame': [
    { id: 'hof-br', x: 92, y: 78 },
    { id: 'hof-bl', x: 4, y: 78 },
    { id: 'hof-tr', x: 92, y: 20 },
    { id: 'hof-bm', x: 50, y: 85, isOccluded: true },  // behind content
  ],
}

/**
 * Map a route pathname to a section key.
 */
export function sectionFromPath(pathname) {
  const p = pathname.replace(/^\//, '').split('/')[0] || 'home'
  // Normalize known sections
  const map = {
    '': 'home',
    'voice': 'voice',
    'eye': 'eye',
    'work': 'work',
    'process': 'process',
    'people': 'people',
    'origin': 'origin',
    'hall-of-fame': 'hall-of-fame',
  }
  return map[p] || 'home'
}

/**
 * Get perches for a section (resolved to px).
 */
export function getPerches(section, vw, vh) {
  const set = PERCH_SETS[section] || PERCH_SETS.home
  return set.map(p => ({
    id: p.id,
    x: (p.x / 100) * vw,
    y: (p.y / 100) * vh,
    isOccluded: !!p.isOccluded,
  }))
}

/**
 * Get the reel spawn anchor position (lower-right of viewport).
 */
export function getReelAnchor(vw, vh) {
  return {
    x: vw - 100,
    y: vh - 140,
  }
}

/**
 * Pick a random perch, optionally excluding the current one.
 */
export function pickRandomPerch(perches, excludeId) {
  const available = excludeId
    ? perches.filter(p => p.id !== excludeId)
    : perches
  if (available.length === 0) return perches[0]
  return available[Math.floor(Math.random() * available.length)]
}

/**
 * Find the nearest perch to a position.
 */
export function nearestPerch(perches, x, y) {
  let best = perches[0]
  let bestDist = Infinity
  for (const p of perches) {
    const d = Math.hypot(p.x - x, p.y - y)
    if (d < bestDist) {
      bestDist = d
      best = p
    }
  }
  return best
}

/**
 * Find the nearest perch to a DOMRect (project card hover targets).
 * Per character-spec-patch-showcase.md §"showcasing" enter step.
 */
export function nearestPerchTo(rect, perches) {
  if (!rect || !perches || perches.length === 0) return null
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  return nearestPerch(perches, cx, cy)
}

/**
 * Find the perch farthest from a point.
 * Per character-spec-patch-grab-and-throw.md §"Running away" — destination
 * selection. After release, the character runs to the perch furthest from
 * where it was dropped so the recovery reads as "running away".
 */
export function farthestPerchFrom(point, perches) {
  if (!point || !perches || perches.length === 0) return null
  let best = perches[0]
  let bestDist = 0
  for (const p of perches) {
    const d = Math.hypot(p.x - point.x, p.y - point.y)
    if (d > bestDist) {
      bestDist = d
      best = p
    }
  }
  return best
}

/**
 * Default settle perch — used for initial entry.
 * Bottom-right area for most sections.
 */
export function getSettlePerch(perches) {
  // Prefer bottom-right
  const br = perches.find(p => p.id.endsWith('-br'))
  return br || perches[perches.length - 1]
}

export default PERCH_SETS
