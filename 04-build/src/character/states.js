/**
 * Character state definitions — all 11 behavioral states.
 * Per character-spec.md Section 3.
 *
 * Each state: { name, enter(ctx), tick(ctx, dt) → nextState|null, exit(ctx) }
 *
 * The `speaking` state is NOT here — it's an overlay handled by the bubble system.
 * Any state can speak; speaking doesn't block movement.
 */

import { pickRandomPerch, getReelAnchor, nearestPerch, getSettlePerch } from './perches.js'

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

function pickActivity(ctx) {
  // Mobile: no activities
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  // Check isOccludedPerch for peek_reveal eligibility
  const currentPerch = ctx.perches.find(p => p.id === ctx.stateData.currentPerchId)
  const isOccludedPerch = currentPerch?.isOccluded || false

  const valid = ACTIVITIES.filter(a => {
    if (a.condition === 'isOccludedPerch' && !isOccludedPerch) return false
    return true
  })

  const total = valid.reduce((s, a) => s + a.weight, 0)
  let r = Math.random() * total
  for (const a of valid) {
    if (r < a.weight) {
      return {
        ...a,
        duration: randomBetween(a.minDur, a.maxDur),
      }
    }
    r -= a.weight
  }
  return { ...valid[0], duration: randomBetween(valid[0].minDur, valid[0].maxDur) }
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

    // Idle reel trigger: visitor idle ≥12s AND reel not shown this session
    if (ctx.isIdle && !ctx.reelShown && ctx.idleDuration >= 12) {
      if (ctx.stateData.activeActivity) endActivity(ctx)
      return 'summoning_reel'
    }

    // Wander trigger: random timer
    ctx.stateData.wanderTimer -= dt
    if (ctx.stateData.wanderTimer <= 0) {
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
    const target = pickRandomPerch(ctx.perches, ctx.stateData.currentPerchId)
    ctx.stateData.target = target
    ctx.stateData.pauseTimer = randomBetween(1.5, 3)
    ctx.stateData.isPaused = false
    ctx.stateData.pauseDone = false
    ctx.stateData.walkTimer = 0
  },

  tick(ctx, dt) {
    const t = ctx.stateData.target

    // Idle reel can interrupt wandering
    if (ctx.isIdle && !ctx.reelShown && ctx.idleDuration >= 12) {
      return 'summoning_reel'
    }

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

    // If visitor goes idle while hiding → emerge for reel
    if (ctx.isIdle && !ctx.reelShown && ctx.idleDuration >= 12) {
      return 'summoning_reel'
    }

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

/* ── Export map ─────────────────────────────────────────────────────── */

const ALL_STATES = {
  entering, greeting, idling, wandering, curious,
  chased, hiding, summoning_reel, watching_reel, taking_reel,
}

export default ALL_STATES
