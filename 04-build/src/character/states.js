/**
 * Character state definitions — all 11 behavioral states.
 * Per character-spec.md Section 3.
 *
 * Each state: { name, enter(ctx), tick(ctx, dt) → nextState|null, exit(ctx) }
 *
 * The `speaking` state is NOT here — it's an overlay handled by the bubble system.
 * Any state can speak; speaking doesn't block movement.
 */

import {
  pickRandomPerch, getReelAnchor, nearestPerch,
  getSettlePerch, farthestPerchFrom,
} from './perches.js'

/* ── Speeds (px/s) ─────────────────────────────────────────────────── */
const WALK_SPEED = 80
const CURIOUS_SPEED = 40
const RUN_SPEED = 200
const RUN_SPEED_MAX = 280

/* ── Helpers ───────────────────────────────────────────────────────── */

function moveToward(ctx, targetX, targetY, speed, dt) {
  const dx = targetX - ctx.position.x
  const dy = targetY - ctx.position.y
  const dist = Math.hypot(dx, dy)
  if (dist < 2) return true // arrived

  const step = speed * dt
  if (step >= dist) {
    ctx.position.x = targetX
    ctx.position.y = targetY
    return true
  }

  ctx.position.x += (dx / dist) * step
  ctx.position.y += (dy / dist) * step

  // Face direction of travel
  ctx.facing = dx > 0 ? 'right' : 'left'
  return false
}

function distanceBetween(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min)
}

/* ── States ────────────────────────────────────────────────────────── */

export const entering = {
  name: 'entering',

  enter(ctx) {
    // Pick a random edge (left or right)
    const fromLeft = Math.random() > 0.5
    const vy = ctx.viewport.height * 0.75
    ctx.position.x = fromLeft ? -40 : ctx.viewport.width + 40
    ctx.position.y = vy
    ctx.facing = fromLeft ? 'right' : 'left'
    ctx.posture = 'walking'

    // Target: settle perch
    ctx.stateData.target = getSettlePerch(ctx.perches)
  },

  tick(ctx, dt) {
    const t = ctx.stateData.target
    // Alternate walk frames
    ctx.stateData.walkTimer = (ctx.stateData.walkTimer || 0) + dt
    ctx.posture = ctx.stateData.walkTimer % 0.5 < 0.25 ? 'walking1' : 'walking2'

    const arrived = moveToward(ctx, t.x, t.y, WALK_SPEED, dt)
    if (arrived) return 'greeting'
    return null
  },

  exit(ctx) {
    ctx.stateData.currentPerchId = ctx.stateData.target?.id
  },
}

export const greeting = {
  name: 'greeting',

  enter(ctx) {
    ctx.posture = 'waving'
    // Face cursor
    ctx.facing = ctx.cursorPos.x > ctx.position.x ? 'right' : 'left'
  },

  tick(ctx, dt) {
    // Wave for 1.2s, then transition to idling
    if (ctx.elapsed > 1.2) return 'idling'
    return null
  },

  exit() {},
}

/* ── Activity catalog (patch-activities.md) ────────────────────────── */

const ACTIVITIES = [
  { name: 'laptop_session',  weight: 4, minDur: 10, maxDur: 15 },
  { name: 'peek_reveal',     weight: 2, minDur: 3,  maxDur: 5,  condition: 'isOccludedPerch' },
  { name: 'stretch',         weight: 1, minDur: 1.5, maxDur: 2 },
  { name: 'contemplation',   weight: 2, minDur: 4,  maxDur: 7 },
  { name: 'beverage',        weight: 1, minDur: 4,  maxDur: 6 },
]

/* patch v1.3 §B — activity intelligence.
 *
 * SEQUENCE_BONUSES: multiplier applied to the next pick based on what
 *   just finished. Reads like a script:
 *     after a long laptop session, prefer to stretch or grab a beverage;
 *     after a stretch, prefer to either get back to work or sit and think;
 *     after contemplation, prefer to get back to work.
 *
 * SECTION_BIAS: multiplier based on the current section. Reads like
 *   character voice:
 *     reflective sections (home/voice/origin) → contemplation
 *     work-heavy sections (work/process)      → laptop_session
 *     people-heavy sections (people/HoF)      → beverage
 */
const SEQUENCE_BONUSES = {
  laptop_session: { stretch: 3,        beverage: 2 },
  stretch:        { laptop_session: 2, contemplation: 2 },
  contemplation:  { laptop_session: 2 },
}

const SECTION_BIAS = {
  home:           { contemplation:   1.5 },
  voice:          { contemplation:   1.5 },
  origin:         { contemplation:   1.5 },
  work:           { laptop_session:  2.0 },
  process:        { laptop_session:  2.0 },
  people:         { beverage:        1.5 },
  'hall-of-fame': { beverage:        1.5 },
  eye:            {},
}

function pickActivity(ctx) {
  // Mobile: no activities
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  // Check isOccludedPerch for peek_reveal eligibility
  const currentPerch = ctx.perches.find(p => p.id === ctx.stateData.currentPerchId)
  const isOccludedPerch = currentPerch?.isOccluded || false

  // Base filter: respect conditional activities (peek_reveal needs occluded perch).
  let valid = ACTIVITIES.filter(a => {
    if (a.condition === 'isOccludedPerch' && !isOccludedPerch) return false
    return true
  })

  // patch v1.3 §B1 — no-repeat: don't pick the same activity twice in a row.
  // Defensive fallback if filtering empties the pool.
  const last = ctx.lastActivity
  if (last) {
    const filtered = valid.filter(a => a.name !== last)
    if (filtered.length > 0) valid = filtered
  }

  // patch v1.3 §B2 + §B3 — effective weight = base × sequence bonus × section bias.
  const bonuses = SEQUENCE_BONUSES[last] || {}
  const bias    = SECTION_BIAS[ctx.section] || {}
  const weighted = valid.map(a => ({
    ...a,
    effWeight: a.weight * (bonuses[a.name] || 1) * (bias[a.name] || 1),
  }))

  const total = weighted.reduce((s, a) => s + a.effWeight, 0)
  let r = Math.random() * total
  for (const a of weighted) {
    if (r < a.effWeight) {
      // Persist `lastActivity` across activity boundaries so sequencing
      // applies to the NEXT pick. Stored on ctx (not ctx.stateData) so it
      // survives state transitions back into idling.
      ctx.lastActivity = a.name
      return { ...a, duration: randomBetween(a.minDur, a.maxDur) }
    }
    r -= a.effWeight
  }

  // Defensive: never return undefined.
  const fallback = weighted[0] || valid[0]
  ctx.lastActivity = fallback.name
  return { ...fallback, duration: randomBetween(fallback.minDur, fallback.maxDur) }
}

/** Map activity name → posture + props */
function applyActivity(ctx, activity) {
  switch (activity.name) {
    case 'laptop_session':
      ctx.posture = 'laptop_open'
      ctx.activeProps = { laptop: true }
      break
    case 'peek_reveal':
      ctx.posture = 'peeking'
      ctx.activeProps = {}
      ctx.stateData.peekPhase = 'hidden' // hidden → peeking → ducking
      break
    case 'stretch':
      ctx.posture = 'stretching'
      ctx.activeProps = {}
      break
    case 'contemplation':
      ctx.posture = 'contemplating'
      ctx.activeProps = {}
      break
    case 'beverage':
      ctx.posture = 'holding_mug'
      ctx.activeProps = { mug: true }
      break
  }
}

/** Per-frame activity updates (typing bob, peek phases, sip motion) */
function tickActivity(ctx, activity, elapsed, dt) {
  const reducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  switch (activity.name) {
    case 'laptop_session':
      // Subtle head bob for typing rhythm (skip in reduced-motion)
      if (!reducedMotion) {
        const bobPhase = Math.sin(elapsed * 4) * 0.8
        ctx.stateData.headBob = bobPhase
      }
      break

    case 'peek_reveal': {
      // Phase-based animation
      const phase = ctx.stateData.peekPhase
      if (phase === 'hidden' && elapsed > 0.5) {
        ctx.stateData.peekPhase = 'peeking'
        ctx.posture = 'standing'  // reveal full body
      } else if (phase === 'peeking' && elapsed > activity.duration - 1) {
        ctx.stateData.peekPhase = 'ducking'
        ctx.posture = 'peeking'  // duck back down
      }
      break
    }

    case 'stretch':
      // scaleY bounce handled by CharacterSprite
      break

    case 'contemplation':
      // Stillness IS the animation. Nothing to do.
      break

    case 'beverage':
      // Sip motion: raise at 1.5s, hold, lower
      if (!reducedMotion && elapsed > 1.5 && elapsed < 3) {
        ctx.stateData.sipping = true
      } else {
        ctx.stateData.sipping = false
      }
      break
  }
}

/** Clean up activity state */
function endActivity(ctx) {
  ctx.posture = 'standing'
  ctx.activeProps = {}
  ctx.stateData.headBob = 0
  ctx.stateData.peekPhase = null
  ctx.stateData.sipping = false
  ctx.stateData.activeActivity = null
  ctx.stateData.activityElapsed = 0
}

export const idling = {
  name: 'idling',

  enter(ctx) {
    ctx.posture = 'standing'
    ctx.activeProps = {}
    ctx.stateData.wanderTimer = randomBetween(30, 60)
    ctx.stateData.fidgetTimer = randomBetween(6, 12)
    ctx.stateData.cursorNearTimer = 0
    // Activity timer: first activity after 8-15s
    ctx.stateData.nextActivityAt = randomBetween(8, 15)
    ctx.stateData.activeActivity = null
    ctx.stateData.activityElapsed = 0
  },

  tick(ctx, dt) {
    // Micro-fidget: look toward cursor periodically (only when no activity)
    if (!ctx.stateData.activeActivity) {
      ctx.stateData.fidgetTimer -= dt
      if (ctx.stateData.fidgetTimer <= 0) {
        ctx.facing = ctx.cursorPos.x > ctx.position.x ? 'right' : 'left'
        ctx.stateData.fidgetTimer = randomBetween(6, 12)
      }
    }

    // Curious trigger: cursor stationary within 250px for 3s
    const distToCursor = distanceBetween(ctx.position, ctx.cursorPos)
    if (distToCursor < 250 && ctx.cursorSpeed < 50) {
      ctx.stateData.cursorNearTimer += dt
      if (ctx.stateData.cursorNearTimer >= 3) {
        if (ctx.stateData.activeActivity) endActivity(ctx)
        return 'curious'
      }
    } else {
      ctx.stateData.cursorNearTimer = 0
    }

    // patch v1.3 §A2: pure-timer reel trigger removed.
    // Reels now fire exclusively through useReelTriggers (bottom-of-page,
    // section dwell, deep idle) — see CharacterContext.fireContextualReel.

    // Wander trigger: random timer.
    // patch v1.3 cross-system: suppress wander while a bubble is reading,
    // so the visitor finishes the bubble before the character walks off.
    ctx.stateData.wanderTimer -= dt
    if (ctx.stateData.wanderTimer <= 0 && !ctx.bubbleActive) {
      if (ctx.stateData.activeActivity) endActivity(ctx)
      return 'wandering'
    }

    // ── ACTIVITY LAYER (patch-activities.md) ───────────────────
    if (!ctx.stateData.activeActivity) {
      ctx.stateData.nextActivityAt -= dt
      if (ctx.stateData.nextActivityAt <= 0) {
        const activity = pickActivity(ctx)
        if (activity) {
          ctx.stateData.activeActivity = activity
          ctx.stateData.activityElapsed = 0
          applyActivity(ctx, activity)
          console.log(`[CHARACTER] activity: ${activity.name} (${activity.duration.toFixed(1)}s)`)
        } else {
          // No valid activity — retry later
          ctx.stateData.nextActivityAt = randomBetween(8, 15)
        }
      }
    }

    if (ctx.stateData.activeActivity) {
      ctx.stateData.activityElapsed += dt
      const activity = ctx.stateData.activeActivity

      if (ctx.stateData.activityElapsed >= activity.duration) {
        endActivity(ctx)
        ctx.stateData.nextActivityAt = randomBetween(8, 15)
      } else {
        tickActivity(ctx, activity, ctx.stateData.activityElapsed, dt)
      }
    }

    return null
  },

  exit(ctx) {
    // Clean cancel any running activity
    if (ctx.stateData.activeActivity) {
      endActivity(ctx)
    }
  },
}

export const wandering = {
  name: 'wandering',

  enter(ctx) {
    // patch v1.3 §D2 — cursor-zone avoidance.
    // Don't pick a destination perch within 200px of the cursor. The
    // character should drift to "the other side of the room", not stroll
    // directly into the visitor's pointer. Also exclude the current perch
    // to guarantee movement. Safety: if every perch is too close to the
    // cursor (small viewport, dense layout), fall back to the full set
    // minus the current perch — never starve.
    const CURSOR_BUFFER = 200
    const currentId = ctx.stateData.currentPerchId
    const candidates = ctx.perches.filter(p => {
      if (p.id === currentId) return false
      const dx = p.x - ctx.cursorPos.x
      const dy = p.y - ctx.cursorPos.y
      return Math.hypot(dx, dy) > CURSOR_BUFFER
    })
    let target
    if (candidates.length > 0) {
      target = candidates[Math.floor(Math.random() * candidates.length)]
    } else {
      // Defensive fallback — use the existing helper which already excludes
      // the current perch.
      target = pickRandomPerch(ctx.perches, currentId)
    }

    ctx.stateData.target = target
    ctx.stateData.pauseTimer = randomBetween(1.5, 3)
    ctx.stateData.isPaused = false
    ctx.stateData.pauseDone = false
    ctx.stateData.walkTimer = 0
  },

  tick(ctx, dt) {
    const t = ctx.stateData.target

    // patch v1.3 §A2: pure-timer reel trigger removed from wandering.

    // Mid-walk pause
    if (!ctx.stateData.pauseDone) {
      ctx.stateData.pauseTimer -= dt
      if (ctx.stateData.pauseTimer <= 0 && !ctx.stateData.isPaused) {
        ctx.stateData.isPaused = true
        ctx.posture = 'standing'
        ctx.stateData.pauseEndTimer = randomBetween(1, 2)
      }
      if (ctx.stateData.isPaused) {
        ctx.stateData.pauseEndTimer -= dt
        if (ctx.stateData.pauseEndTimer <= 0) {
          ctx.stateData.isPaused = false
          ctx.stateData.pauseDone = true
        }
        return null
      }
    }

    // Walk
    ctx.stateData.walkTimer = (ctx.stateData.walkTimer || 0) + dt
    ctx.posture = ctx.stateData.walkTimer % 0.5 < 0.25 ? 'walking1' : 'walking2'

    const arrived = moveToward(ctx, t.x, t.y, WALK_SPEED, dt)
    if (arrived) {
      ctx.stateData.currentPerchId = t.id
      return 'idling'
    }
    return null
  },

  exit() {},
}

export const curious = {
  name: 'curious',

  enter(ctx) {
    ctx.stateData.phase = 'approaching' // approaching → looking → deciding
    ctx.stateData.lookTimer = 0
    ctx.posture = 'standing'
  },

  tick(ctx, dt) {
    const dist = distanceBetween(ctx.position, ctx.cursorPos)

    // If cursor moves toward character aggressively → chased
    if (ctx.cursorSpeed > 600 && dist < 150 && ctx.cursorMovingToward) {
      return 'chased'
    }

    if (ctx.stateData.phase === 'approaching') {
      ctx.stateData.walkTimer = (ctx.stateData.walkTimer || 0) + dt
      ctx.posture = ctx.stateData.walkTimer % 0.6 < 0.3 ? 'walking1' : 'walking2'

      // Walk toward cursor, stop at 80px
      if (dist > 80) {
        moveToward(ctx, ctx.cursorPos.x, ctx.cursorPos.y, CURIOUS_SPEED, dt)
      } else {
        ctx.stateData.phase = 'looking'
        ctx.posture = 'standing'
        ctx.facing = ctx.cursorPos.x > ctx.position.x ? 'right' : 'left'
      }
    }

    if (ctx.stateData.phase === 'looking') {
      ctx.stateData.lookTimer += dt
      if (ctx.stateData.lookTimer >= 1.5) {
        ctx.stateData.phase = 'deciding'
      }
    }

    if (ctx.stateData.phase === 'deciding') {
      // 50% chance: speak, 50%: walk back
      if (Math.random() > 0.5 && distanceBetween(ctx.position, ctx.cursorPos) < 250) {
        // Speak a quip and stay
        ctx.speakIdle('...you good?')
      }
      return 'idling'
    }

    return null
  },

  exit(ctx) {
    // Set current perch to nearest
    const nearest = nearestPerch(ctx.perches, ctx.position.x, ctx.position.y)
    ctx.stateData.currentPerchId = nearest.id
  },
}

export const chased = {
  name: 'chased',

  enter(ctx) {
    ctx.posture = 'running'
    // Run to the corner farthest from cursor
    const corners = [
      { x: 30, y: 30 },
      { x: ctx.viewport.width - 30, y: 30 },
      { x: 30, y: ctx.viewport.height - 30 },
      { x: ctx.viewport.width - 30, y: ctx.viewport.height - 30 },
    ]
    let best = corners[0]
    let bestDist = 0
    for (const c of corners) {
      const d = distanceBetween(c, ctx.cursorPos)
      if (d > bestDist) {
        bestDist = d
        best = c
      }
    }
    ctx.stateData.target = best
  },

  tick(ctx, dt) {
    const t = ctx.stateData.target
    // Scale speed based on cursor proximity
    const dist = distanceBetween(ctx.position, ctx.cursorPos)
    const speed = dist < 100 ? RUN_SPEED_MAX : RUN_SPEED

    ctx.stateData.walkTimer = (ctx.stateData.walkTimer || 0) + dt
    ctx.posture = ctx.stateData.walkTimer % 0.3 < 0.15 ? 'running' : 'walking1'

    const arrived = moveToward(ctx, t.x, t.y, speed, dt)
    if (arrived) return 'hiding'
    return null
  },

  exit() {},
}

export const hiding = {
  name: 'hiding',

  enter(ctx) {
    ctx.posture = 'standing'
    ctx.stateData.duration = randomBetween(5, 10)
    ctx.stateData.spokeBubble = false

    // Shift to edge to "peek"
    if (ctx.position.x < ctx.viewport.width / 2) {
      ctx.position.x = -12 // mostly hidden at left edge
    } else {
      ctx.position.x = ctx.viewport.width + 12
    }
  },

  tick(ctx, dt) {
    // Cheeky bubble once
    if (!ctx.stateData.spokeBubble && ctx.elapsed > 1.5) {
      ctx.speakIdle('give me a sec.')
      ctx.stateData.spokeBubble = true
    }

    // patch v1.3 §A2: pure-timer reel trigger removed from hiding.
    // The character emerges only when the hide duration expires; any
    // contextual reel trigger that fires during hiding will be gated
    // out by useReelTriggers' state-set guard.

    if (ctx.elapsed >= ctx.stateData.duration) {
      // Come back to nearest perch
      const np = nearestPerch(ctx.perches, ctx.position.x, ctx.position.y)
      ctx.stateData.currentPerchId = np.id
      ctx.position.x = Math.max(20, Math.min(ctx.viewport.width - 20, ctx.position.x))
      return 'idling'
    }

    return null
  },

  exit() {},
}

export const summoning_reel = {
  name: 'summoning_reel',

  enter(ctx) {
    const anchor = getReelAnchor(ctx.viewport.width, ctx.viewport.height)
    ctx.stateData.target = anchor
    ctx.stateData.phase = 'walking' // walking → sitting → pausing → revealing
    ctx.stateData.walkTimer = 0
  },

  tick(ctx, dt) {
    const t = ctx.stateData.target

    if (ctx.stateData.phase === 'walking') {
      ctx.stateData.walkTimer = (ctx.stateData.walkTimer || 0) + dt
      ctx.posture = ctx.stateData.walkTimer % 0.5 < 0.25 ? 'walking1' : 'walking2'

      const arrived = moveToward(ctx, t.x, t.y, WALK_SPEED, dt)
      if (arrived) {
        ctx.stateData.phase = 'sitting'
        ctx.stateData.phaseTimer = 0
      }
    }

    if (ctx.stateData.phase === 'sitting') {
      ctx.posture = 'sitting'
      ctx.stateData.phaseTimer += dt
      if (ctx.stateData.phaseTimer >= 0.6) {
        ctx.stateData.phase = 'pausing'
        ctx.stateData.phaseTimer = 0
      }
    }

    if (ctx.stateData.phase === 'pausing') {
      ctx.stateData.phaseTimer += dt
      if (ctx.stateData.phaseTimer >= 0.8) {
        // Trigger reel appearance
        ctx.triggerReel()
        return 'watching_reel'
      }
    }

    return null
  },

  exit() {},
}

export const watching_reel = {
  name: 'watching_reel',

  enter(ctx) {
    ctx.posture = 'sitting'
    ctx.stateData.headTurnTimer = randomBetween(3, 6)
    ctx.stateData.spokeBubble = false
    ctx.facing = 'left' // watching the reel to the left
  },

  tick(ctx, dt) {
    // Occasional head turn toward cursor
    ctx.stateData.headTurnTimer -= dt
    if (ctx.stateData.headTurnTimer <= 0) {
      ctx.facing = ctx.facing === 'left' ? 'right' : 'left'
      ctx.stateData.headTurnTimer = randomBetween(3, 6)
    }

    // Speak a reel-related bubble once
    if (!ctx.stateData.spokeBubble && ctx.elapsed > 2) {
      ctx.speakIdle('from last tuesday.')
      ctx.stateData.spokeBubble = true
    }

    // Reel ended or visitor reactivated
    if (ctx.reelFinished || (!ctx.isIdle && ctx.elapsed > 1)) {
      return 'taking_reel'
    }

    // Max duration 20s
    if (ctx.elapsed > 20) return 'taking_reel'

    return null
  },

  exit() {},
}

export const taking_reel = {
  name: 'taking_reel',

  enter(ctx) {
    ctx.stateData.phase = 'standing' // standing → carrying → gone
    ctx.stateData.phaseTimer = 0
    ctx.stateData.walkTimer = 0

    // Pick nearest edge to exit
    const x = ctx.position.x
    const vw = ctx.viewport.width
    ctx.stateData.exitX = x < vw / 2 ? -60 : vw + 60
    ctx.stateData.exitY = ctx.position.y
  },

  tick(ctx, dt) {
    if (ctx.stateData.phase === 'standing') {
      ctx.posture = 'standing'
      ctx.stateData.phaseTimer += dt
      if (ctx.stateData.phaseTimer >= 0.6) {
        ctx.stateData.phase = 'carrying'
        ctx.reelCarried = true
      }
    }

    if (ctx.stateData.phase === 'carrying') {
      ctx.stateData.walkTimer = (ctx.stateData.walkTimer || 0) + dt
      ctx.posture = ctx.stateData.walkTimer % 0.5 < 0.25 ? 'walking1' : 'walking2'

      const arrived = moveToward(
        ctx, ctx.stateData.exitX, ctx.stateData.exitY, WALK_SPEED, dt
      )
      if (arrived) {
        ctx.stateData.phase = 'gone'
        ctx.stateData.phaseTimer = 0
        ctx.reelCarried = false
        ctx.dismissReel()
        ctx.setReelShown(true)
      }
    }

    if (ctx.stateData.phase === 'gone') {
      ctx.stateData.phaseTimer += dt
      // Respawn after 3-5s
      if (ctx.stateData.phaseTimer >= randomBetween(3, 5)) {
        const perch = pickRandomPerch(ctx.perches)
        ctx.position.x = perch.x
        ctx.position.y = perch.y
        ctx.stateData.currentPerchId = perch.id
        return 'idling'
      }
    }

    return null
  },

  exit(ctx) {
    ctx.reelCarried = false
  },
}

/* ── Showcasing state (patch-showcase.md) ──────────────────────────── */

export const showcasing = {
  name: 'showcasing',

  enter(ctx) {
    const target = ctx.stateData.showcaseTarget
    if (!target) {
      // Defensive: nothing to showcase, bail to idling next tick
      ctx.stateData.phase = 'exit'
      return
    }

    ctx.stateData.walkTarget = target.perch
    ctx.stateData.cardCenter = {
      x: target.cardRect.left + target.cardRect.width / 2,
      y: target.cardRect.top + target.cardRect.height / 2,
    }
    ctx.stateData.phaseTimer = 0
    ctx.stateData.walkTimer = 0
    ctx.posture = 'standing'

    // Reduced-motion adaptation per patch §"Mobile + reduced-motion":
    //   appear at perch instantly, glow pulses once, skip approach.
    const reducedMotion = typeof window !== 'undefined'
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion || target.skipApproach) {
      ctx.position.x = target.perch.x
      ctx.position.y = target.perch.y
      ctx.facing = ctx.stateData.cardCenter.x > ctx.position.x ? 'right' : 'left'
      ctx.stateData.phase = 'settle'
    } else {
      ctx.stateData.phase = 'approach'
    }
  },

  tick(ctx, dt) {
    ctx.stateData.phaseTimer += dt
    const t = ctx.stateData.phaseTimer
    const phase = ctx.stateData.phase

    if (phase === 'approach') {
      ctx.stateData.walkTimer += dt
      ctx.posture = ctx.stateData.walkTimer % 0.5 < 0.25 ? 'walking1' : 'walking2'
      const target = ctx.stateData.walkTarget
      const arrived = moveToward(ctx, target.x, target.y, WALK_SPEED, dt)
      if (arrived) {
        ctx.stateData.phase = 'settle'
        ctx.stateData.phaseTimer = 0
        ctx.posture = 'standing'
        ctx.facing = ctx.stateData.cardCenter.x > ctx.position.x ? 'right' : 'left'
      }
      return null
    }

    if (phase === 'settle') {
      // Brief 200ms settle before the flourish.
      ctx.posture = 'standing'
      if (t >= 0.2) {
        ctx.stateData.phase = 'flourish'
        ctx.stateData.phaseTimer = 0
      }
      return null
    }

    if (phase === 'flourish') {
      // Posture stays 'standing' — wrapper variant in Character.jsx
      // drives the visual hop+scale, and GlowAccent renders the pulse.
      ctx.posture = 'showcasing'
      if (t >= 0.8) {
        ctx.stateData.phase = 'settle_back'
        ctx.stateData.phaseTimer = 0
      }
      return null
    }

    if (phase === 'settle_back') {
      ctx.posture = 'standing'
      if (t >= 0.6) {
        ctx.stateData.phase = 'ack'
        ctx.stateData.phaseTimer = 0
      }
      return null
    }

    if (phase === 'ack') {
      ctx.facing = ctx.cursorPos.x > ctx.position.x ? 'right' : 'left'
      if (t >= 1.0) return 'idling'
      return null
    }

    // Defensive fallback
    return 'idling'
  },

  exit(ctx) {
    // Snap to nearest perch as the new "currentPerchId" so a follow-up
    // wander/activity uses this position.
    const np = nearestPerch(ctx.perches, ctx.position.x, ctx.position.y)
    if (np) ctx.stateData.currentPerchId = np.id
    ctx.stateData.showcaseTarget = null
    ctx.stateData.phase = null
  },
}

/* ── Grab / Throw / Run-away (patch-grab-and-throw.md v1.4) ────────── */

// Sway physics constants — tuned per patch §"Sway physics".
const SPRING_STRENGTH = 0.15
const SPRING_DAMPING  = 0.75
const ROT_FACTOR      = 0.3
const ROT_SPRING      = 0.2
const ROT_DAMPING     = 0.80
// Vertical offset between cursor and character feet while grabbed.
// `ctx.position.y` is the FEET of the character (top = feet - size). The
// rotation pivot lives at `transformOrigin: 50% 12%` inside the sprite
// (~12% down from the top of the 96px sprite = ~11.5px below the top
// edge). For the cursor to "hold" the head at the pivot, feet must sit
// `size - pivotOffset = 96 - 12 = 84` pixels below the cursor.
// Grab is desktop-only (suppressed on mobile in Character.jsx), so the
// 96px desktop sprite size is the only case to support here.
const HANG_OFFSET_Y   = 84

// Thrown momentum constants.
const THROWN_DURATION = 0.3   // seconds — ~300ms inertia per patch
const THROWN_DECAY    = 0.85  // per-frame velocity decay

// Running-away — 2× normal walk speed per patch.
const RUN_AWAY_SPEED  = WALK_SPEED * 2

function clamp(v, lo, hi) {
  return v < lo ? lo : v > hi ? hi : v
}

function reducedMotionActive() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const grabbed = {
  name: 'grabbed',

  enter(ctx) {
    ctx.posture = 'standing'
    ctx.activeProps = {}
    ctx.swayVelocityX = 0
    ctx.swayVelocityY = 0
    ctx.swayRotation = 0
    ctx.swayRotationVelocity = 0
    // Seed prev-cursor so the first physics tick computes a zero delta
    // (no spurious rotation kick on grab).
    ctx.stateData.prevCursorX = ctx.cursorPos.x
  },

  tick(ctx) {
    if (reducedMotionActive()) {
      // Reduced motion: character follows cursor 1:1, no rotation.
      ctx.position.x = ctx.cursorPos.x
      ctx.position.y = ctx.cursorPos.y + HANG_OFFSET_Y
      ctx.swayRotation = 0
    } else {
      // Position spring — catches up to cursor over a couple of frames.
      // Feet hang HANG_OFFSET_Y below the cursor so the head sits at the
      // cursor (rotation pivot = "where you're holding it").
      const targetX = ctx.cursorPos.x
      const targetY = ctx.cursorPos.y + HANG_OFFSET_Y
      ctx.swayVelocityX += (targetX - ctx.position.x) * SPRING_STRENGTH
      ctx.swayVelocityY += (targetY - ctx.position.y) * SPRING_STRENGTH
      ctx.swayVelocityX *= SPRING_DAMPING
      ctx.swayVelocityY *= SPRING_DAMPING
      ctx.position.x += ctx.swayVelocityX
      ctx.position.y += ctx.swayVelocityY

      // Rotation pendulum — lags cursor horizontal velocity.
      const cursorVelX = ctx.cursorPos.x - ctx.stateData.prevCursorX
      const targetRot = clamp(-cursorVelX * ROT_FACTOR, -30, 30)
      ctx.swayRotationVelocity += (targetRot - ctx.swayRotation) * ROT_SPRING
      ctx.swayRotationVelocity *= ROT_DAMPING
      ctx.swayRotation += ctx.swayRotationVelocity
    }
    ctx.stateData.prevCursorX = ctx.cursorPos.x

    // Viewport clamp — the character can't be dragged off-screen.
    // `position.y` is feet, so the minimum is `size` (full sprite visible
    // from the top edge). 96 is the desktop sprite size; grab is mobile-off.
    const halfW = 48
    const spriteH = 96
    ctx.position.x = clamp(ctx.position.x, halfW, ctx.viewport.width - halfW)
    ctx.position.y = clamp(ctx.position.y, spriteH, ctx.viewport.height - 4)

    // No auto-transition — `mouseup` listener in CharacterContext
    // captures release velocity and transitions to 'thrown'.
    return null
  },

  exit() {},
}

export const thrown = {
  name: 'thrown',

  enter(ctx) {
    ctx.posture = 'standing'
    ctx.activeProps = {}
    // releaseVelocityX/Y, releaseRotation, stateData.dropPoint are
    // populated by the mouseup handler in CharacterContext before
    // this transition fires.
  },

  tick(ctx) {
    if (reducedMotionActive()) {
      // Skip the inertia beat entirely in reduced motion.
      ctx.swayRotation = 0
      return 'running_away'
    }

    ctx.position.x += ctx.releaseVelocityX
    ctx.position.y += ctx.releaseVelocityY
    ctx.releaseVelocityX *= THROWN_DECAY
    ctx.releaseVelocityY *= THROWN_DECAY

    // Damp rotation linearly back to 0 across the 300ms window.
    const t = Math.min(1, ctx.elapsed / THROWN_DURATION)
    ctx.swayRotation = (ctx.releaseRotation || 0) * (1 - t)

    // Viewport clamp — release can fling past edges; keep on-screen.
    const halfW = 48
    const spriteH = 96
    ctx.position.x = clamp(ctx.position.x, halfW, ctx.viewport.width - halfW)
    ctx.position.y = clamp(ctx.position.y, spriteH, ctx.viewport.height - 4)

    if (ctx.elapsed >= THROWN_DURATION) return 'running_away'
    return null
  },

  exit(ctx) {
    // Clear sway scratchpad so the next state starts clean.
    ctx.swayRotation = 0
    ctx.swayVelocityX = 0
    ctx.swayVelocityY = 0
    ctx.swayRotationVelocity = 0
    ctx.releaseVelocityX = 0
    ctx.releaseVelocityY = 0
    ctx.releaseRotation = 0
  },
}

export const running_away = {
  name: 'running_away',

  enter(ctx) {
    const drop = ctx.stateData.dropPoint || {
      x: ctx.position.x,
      y: ctx.position.y,
    }
    const target = farthestPerchFrom(drop, ctx.perches)
    ctx.stateData.target = target
    if (target) {
      ctx.facing = target.x > ctx.position.x ? 'right' : 'left'
    }
    ctx.stateData.walkTimer = 0
  },

  tick(ctx, dt) {
    const t = ctx.stateData.target
    if (!t) return 'idling'

    if (reducedMotionActive()) {
      // No sprite alternation, no animated walk — snap to destination.
      ctx.position.x = t.x
      ctx.position.y = t.y
      ctx.stateData.currentPerchId = t.id
      return 'idling'
    }

    // 150ms posture swap → 0.15s; 0.3s full cycle for walk-a/walk-b.
    ctx.stateData.walkTimer = (ctx.stateData.walkTimer || 0) + dt
    ctx.posture = ctx.stateData.walkTimer % 0.3 < 0.15
      ? 'walking1'
      : 'walking2'

    const arrived = moveToward(ctx, t.x, t.y, RUN_AWAY_SPEED, dt)
    if (arrived) {
      ctx.stateData.currentPerchId = t.id
      return 'idling'
    }
    return null
  },

  exit(ctx) {
    ctx.stateData.dropPoint = null
  },
}

/* ── Project-page pinned mode ───────────────────────────────────────────
 *
 * On /projects/* the character stops being autonomous. It sits pinned in
 * the bottom-left corner. Every TRIP_MIN..TRIP_MAX seconds it does a
 * Goku-style teleport up to the top-right corner and waits there; hovering
 * it sends it back to the bottom-left. Wandering, reels, grab, and
 * showcase are all suppressed in this mode (wired in CharacterContext).
 *
 * Phases (ctx.stateData.project.phase):
 *   'bl'         — pinned bottom-left, counting toward the next trip
 *   'warp_to_tr' — vanish effect playing; teleports to top-right at the end
 *   'tr'         — pinned top-right, waiting for a hover
 *   'warp_to_bl' — vanish effect playing; teleports to bottom-left at the end
 *
 * The Goku-style vanish is played by Character.jsx: a sequence of frame
 * images (/public/character/vanish-1.png .. vanish-N.png) stepped across
 * the warp — forward to vanish, reversed (N..1) to reappear. This state
 * only owns the timing and the teleport itself. Reduced motion collapses
 * the warp to instant.
 */

// PROJECT_VANISH_DURATION is the length of ONE warp phase = the vanish half
// of the teleport. The reappear runs for the same span at the start of the
// destination phase, so the full teleport reads as roughly 2x this.
export const PROJECT_VANISH_DURATION = 0.5 // seconds — the vanish half
// Number of vanish-N.png frames in /public/character/. Stepped across the
// warp; reversed for the reappear.
export const PROJECT_VANISH_FRAME_COUNT = 4

// DEV — vanish-effect tuning (Phases B-E): the teleport auto-fires every
// few seconds so the effect can be iterated on autoplay. RESTORE to 32 / 60
// in Phase F, before this ships.
const PROJECT_TRIP_MIN = 3 // seconds pinned before an auto-trip  [DEV: was 32]
const PROJECT_TRIP_MAX = 5 //                                    [DEV: was 60]

/** Bottom-left and top-right anchor points, recomputed from the viewport. */
function projectCorners(ctx) {
  const vw = ctx.viewport.width
  const vh = ctx.viewport.height
  return {
    bl: { x: 70, y: vh - 18 },
    tr: { x: vw - 70, y: 124 },
  }
}

export const project_pinned = {
  name: 'project_pinned',

  enter(ctx) {
    ctx.posture = 'standing'
    ctx.activeProps = {}
    const corners = projectCorners(ctx)
    ctx.position.x = corners.bl.x
    ctx.position.y = corners.bl.y
    ctx.facing = 'right'
    ctx.stateData.project = {
      phase: 'bl',
      timer: 0,
      nextTripAt: randomBetween(PROJECT_TRIP_MIN, PROJECT_TRIP_MAX),
      warpX: corners.bl.x,
      warpY: corners.bl.y,
      hoverBack: false,
    }
  },

  tick(ctx, dt) {
    const proj = ctx.stateData.project
    if (!proj) return 'idling' // defensive — should never happen
    const corners = projectCorners(ctx)
    // Reduced motion collapses the warp to a single tick (instant jump).
    const dur = reducedMotionActive() ? 0 : PROJECT_VANISH_DURATION

    if (proj.phase === 'bl') {
      // Stay pinned — re-assert every frame so a viewport resize tracks.
      ctx.position.x = corners.bl.x
      ctx.position.y = corners.bl.y
      ctx.facing = 'right'
      ctx.posture = 'standing'
      proj.timer += dt
      if (proj.timer >= proj.nextTripAt) {
        proj.warpX = corners.bl.x
        proj.warpY = corners.bl.y
        proj.phase = 'warp_to_tr'
        proj.timer = 0
      }
      return null
    }

    if (proj.phase === 'warp_to_tr') {
      proj.timer += dt
      if (proj.timer >= dur) {
        ctx.position.x = corners.tr.x
        ctx.position.y = corners.tr.y
        ctx.facing = 'left'
        proj.phase = 'tr'
        proj.timer = 0
        proj.hoverBack = false
      }
      return null
    }

    if (proj.phase === 'tr') {
      ctx.position.x = corners.tr.x
      ctx.position.y = corners.tr.y
      ctx.facing = 'left'
      ctx.posture = 'standing'
      // hoverBack is set by onProjectCharacterHover in CharacterContext.
      if (proj.hoverBack) {
        proj.warpX = corners.tr.x
        proj.warpY = corners.tr.y
        proj.phase = 'warp_to_bl'
        proj.timer = 0
      }
      return null
    }

    if (proj.phase === 'warp_to_bl') {
      proj.timer += dt
      if (proj.timer >= dur) {
        ctx.position.x = corners.bl.x
        ctx.position.y = corners.bl.y
        ctx.facing = 'right'
        proj.phase = 'bl'
        proj.timer = 0
        proj.nextTripAt = randomBetween(PROJECT_TRIP_MIN, PROJECT_TRIP_MAX)
        proj.hoverBack = false
      }
      return null
    }

    return null
  },

  exit(ctx) {
    ctx.stateData.project = null
  },
}

/* ── Export map ─────────────────────────────────────────────────────── */

const ALL_STATES = {
  entering, greeting, idling, wandering, curious,
  chased, hiding, summoning_reel, watching_reel, taking_reel,
  showcasing,
  grabbed, thrown, running_away,
  project_pinned,
}

export default ALL_STATES
