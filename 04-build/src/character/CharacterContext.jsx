import {
  createContext, useContext, useCallback, useEffect,
  useMemo, useRef, useState,
} from 'react'
import { useLocation } from 'react-router-dom'
import ALL_STATES from './states.js'
import { getPerches, sectionFromPath, nearestPerchTo } from './perches.js'
import { useReelTriggers } from './useReelTriggers.js'
import { pickReel } from './reelPools.js'
import { pickThrowQuip } from './throwQuips.js'

/**
 * CharacterContext — state machine + context provider.
 * Per character-spec.md Sections 3–6, 8–10.
 *
 * Owns: state machine (11 states), position, facing, posture,
 *       idle speech, reel custody, debug info.
 *
 * The rAF loop calls the active state's tick() each frame.
 * Speaking is overlaid — any state can have a bubble.
 *
 * Spawn timing (per Kash's answers):
 *   - First-time visitor: enters after onboarding completes
 *   - Returning visitor: 2s delay after page load
 *
 * Chase cap: unlimited for v1.
 */

const CharacterContext = createContext(null)

/* ── Speeds & constants ────────────────────────────────────────────── */
const CHASE_SPEED_THRESHOLD = 600 // px/s
const CHASE_DISTANCE_THRESHOLD = 150 // px
const BUBBLE_DURATION = 5000 // ms
const STUCK_GUARD_SECONDS = 60

/* ── patch v1.4 §"Suppression": states during which a grab cannot start.
 *    `entering` is intentionally omitted — grab may interrupt walk-in. */
const GRAB_SUPPRESSION_LIST = new Set([
  'summoning_reel', 'watching_reel', 'taking_reel',
  'showcasing', 'chased', 'hiding',
  // project_pinned: on /projects/* the character is locked to its corner,
  // so it must not be grab-able there.
  'project_pinned',
])

/* ── Reduced-motion check ──────────────────────────────────────────── */
function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/* ── Mobile check ──────────────────────────────────────────────────── */
function isMobileViewport() {
  return typeof window !== 'undefined' && window.innerWidth < 768
}

export function CharacterProvider({ children, identity, isReturning, onboardingDone }) {
  /* ── React state (triggers re-renders for the UI) ──────────────── */
  const [state, setState] = useState('inactive') // 'inactive' until spawn
  const [position, setPositionState] = useState({ x: -100, y: -100 })
  const [facing, setFacingState] = useState('right')
  const [posture, setPostureState] = useState('standing')
  const [charBubble, setCharBubble] = useState(null) // { text, id }
  const [reelActive, setReelActive] = useState(false)
  const [reelClip, setReelClip] = useState(null)
  const [reelCarried, setReelCarried] = useState(false)
  const [visible, setVisible] = useState(false)
  const [debugLog, setDebugLog] = useState([])
  const [activeActivity, setActiveActivity] = useState(null) // current activity name
  const [activeProps, setActiveProps] = useState({})         // { laptop: bool, mug: bool }
  const [pixelInspect, setPixelInspect] = useState(false)    // debug 2x scale toggle
  const [spriteRegistry, setSpriteRegistry] = useState({
    missing: [],   // sprite names that 404'd (e.g., ['walk-a', 'walk-b'])
    loaded: [],    // sprite names that loaded successfully (e.g., ['idle'])
  })
  // patch v1.4 — sway rotation surfaced to React for the sprite transform.
  // Written every rAF tick from ctxRef.current.swayRotation.
  const [swayRotation, setSwayRotation] = useState(0)
  // Project-mode — surfaced to Character.jsx so it can render the Goku
  // vanish effect and enable hover while the character is parked
  // top-right. null off project pages; { phase, warpX, warpY } otherwise.
  const [projectMode, setProjectMode] = useState(null)

  const location = useLocation()
  const section = sectionFromPath(location.pathname)
  // Project case-study routes (/projects/*) put the character into a
  // separate pinned mode — see the project_pinned state in states.js.
  // sectionFromPath coarsely maps these to 'home', so detect the route
  // explicitly here.
  const isProjectPage = location.pathname.startsWith('/projects/')

  /* ── Refs (mutable, no re-renders) ─────────────────────────────── */
  const rafRef = useRef(null)
  const lastTimeRef = useRef(0)
  const stateModuleRef = useRef(null)
  const reelShownRef = useRef(false)
  const bubbleTimerRef = useRef(null)
  const spawnedRef = useRef(false)
  const pausedRef = useRef(false)
  const isMobileRef = useRef(isMobileViewport())
  const reducedMotionRef = useRef(prefersReducedMotion())
  // Project-mode plumbing — live route flag for effects/loops, and the
  // last project phase seen (so the rAF loop only re-renders on change).
  const isProjectPageRef = useRef(isProjectPage)
  const lastProjectPhaseRef = useRef(null)

  // Cursor tracking
  const cursorPosRef = useRef({ x: 400, y: 300 })
  const cursorSpeedRef = useRef(0)
  const prevCursorRef = useRef({ x: 400, y: 300, time: 0 })
  const cursorMovingTowardRef = useRef(false)

  // Idle tracking (set externally by App.jsx)
  const isIdleRef = useRef(false)
  const idleDurationRef = useRef(0)
  const idleStartRef = useRef(0)

  // Reel tracking
  const reelFinishedRef = useRef(false)
  const pendingReelClipRef = useRef(null)

  // Showcase tracking (patch-showcase.md)
  const showcaseCountRef = useRef({})            // { '/work/foo': 1, ... }
  const hoverStateRef = useRef(null)             // { cardId, el, startX, startY, timerId }

  // Sprite registry (debug — see /character/*.png 404 / load state)
  const spriteMissingRef = useRef(new Set())
  const spriteLoadedRef = useRef(new Set())

  // patch v1.3 §A4: reel-trigger plumbing.
  // - seenReelsRef: session-shared set so the three triggers never repeat a clip.
  // - currentSectionRef: lets the rAF loop sync ctx.section without a deps change.
  // - charBubbleRef: lets the rAF loop / hook gates read live bubble state.
  const seenReelsRef = useRef(new Set())
  const currentSectionRef = useRef(section)
  const charBubbleRef = useRef(null)

  // Viewport
  const viewportRef = useRef({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  })

  // Perches (recalculated on section/resize change)
  const perchesRef = useRef([])

  // The mutable context object shared with state tick functions
  const ctxRef = useRef({
    position: { x: -100, y: -100 },
    facing: 'right',
    posture: 'standing',
    activeProps: {},
    cursorPos: { x: 400, y: 300 },
    cursorSpeed: 0,
    cursorMovingToward: false,
    viewport: viewportRef.current,
    perches: [],
    elapsed: 0,
    isIdle: false,
    idleDuration: 0,
    reelShown: false,
    reelFinished: false,
    reelCarried: false,
    // patch v1.3 §A4 + §B: contextual fields synced per frame in the rAF loop.
    section: section,          // current section key (e.g. 'work', 'voice')
    bubbleActive: false,       // true when charBubble != null
    lastActivity: null,        // name of last activity (for no-repeat + sequencing)
    // patch v1.4 — grab/throw scratchpad. Written by grabbed.tick (sway),
    // read by mouseup handler on release, consumed by thrown.tick.
    swayVelocityX: 0,
    swayVelocityY: 0,
    swayRotation: 0,
    swayRotationVelocity: 0,
    releaseVelocityX: 0,
    releaseVelocityY: 0,
    releaseRotation: 0,
    stateData: {},
    // Methods filled below
    speakIdle: () => {},
    triggerReel: () => {},
    dismissReel: () => {},
    setReelShown: () => {},
  })

  /* ── Recalculate perches on section/resize ──────────────────────── */
  useEffect(() => {
    const recalc = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      viewportRef.current = { width: vw, height: vh }
      perchesRef.current = getPerches(section, vw, vh)
      ctxRef.current.viewport = viewportRef.current
      ctxRef.current.perches = perchesRef.current
      isMobileRef.current = isMobileViewport()
    }
    recalc()
    window.addEventListener('resize', recalc)
    return () => window.removeEventListener('resize', recalc)
  }, [section])

  /* ── Cursor tracking ────────────────────────────────────────────── */
  useEffect(() => {
    const handleMove = (e) => {
      const now = performance.now()
      const prev = prevCursorRef.current
      const dt = (now - prev.time) / 1000
      if (dt > 0.01) {
        const dx = e.clientX - prev.x
        const dy = e.clientY - prev.y
        cursorSpeedRef.current = Math.hypot(dx, dy) / dt

        // Check if cursor is moving toward character
        const charPos = ctxRef.current.position
        const toChar = { x: charPos.x - e.clientX, y: charPos.y - e.clientY }
        const dot = dx * toChar.x + dy * toChar.y
        cursorMovingTowardRef.current = dot > 0

        prevCursorRef.current = { x: e.clientX, y: e.clientY, time: now }
      }
      cursorPosRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  /* ── Tab visibility pause ───────────────────────────────────────── */
  useEffect(() => {
    const handler = () => {
      pausedRef.current = document.hidden
    }
    document.addEventListener('visibilitychange', handler)
    return () => document.removeEventListener('visibilitychange', handler)
  }, [])

  /* ── Idle speech ────────────────────────────────────────────────── */
  // patch v1.3 §C4 — one bubble at a time: if a bubble is already on
  // screen, drop the new line silently. Matches the patch's "Option B:
  // drop" recommendation — rarer and quieter than queueing.
  const speakIdle = useCallback((text) => {
    if (charBubbleRef.current) return false
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current)
    const id = `char-${Date.now()}`
    setCharBubble({ text, id })
    bubbleTimerRef.current = setTimeout(() => setCharBubble(null), BUBBLE_DURATION)
    return true
  }, [])

  const speakIdleRef = useRef(speakIdle)
  useEffect(() => { speakIdleRef.current = speakIdle }, [speakIdle])

  /* ── Reel controls ──────────────────────────────────────────────── */
  const triggerReel = useCallback(() => {
    const clip = pendingReelClipRef.current
    setReelActive(true)
    setReelClip(clip)
    setReelCarried(false)
    reelFinishedRef.current = false
  }, [])

  const dismissReel = useCallback(() => {
    setReelActive(false)
    setReelClip(null)
    setReelCarried(false)
    reelFinishedRef.current = true
  }, [])

  const markReelShown = useCallback(() => {
    reelShownRef.current = true
  }, [])

  /* ── Contextual reel firing (patch v1.3 §A4) ────────────────────── */
  // useReelTriggers fires { triggerType, section } when one of its three
  // detectors (bottom-of-page, section dwell, deep idle) crosses its
  // threshold. We pick a clip from the right pool, dedupe against the
  // session-shared seenReelsRef, and transition into the reel sequence.
  const fireContextualReel = useCallback(({ triggerType, section: sec }) => {
    const clip = pickReel(triggerType, sec, seenReelsRef.current)
    if (!clip) {
      console.log(`[CHARACTER] reel trigger ${triggerType} fired but pool exhausted`)
      return
    }
    seenReelsRef.current.add(clip)
    pendingReelClipRef.current = clip
    console.log(`[CHARACTER] reel trigger: ${triggerType} (${sec || '-'}) → ${clip}`)
    // transition is stable (defined below); refer through ref-less reference
    // is fine because useCallback below has empty deps for the same reason.
    transitionRef.current?.('summoning_reel')
  }, [])

  // Forward ref so fireContextualReel (declared before transition) can call it.
  const transitionRef = useRef(null)

  /* ── Transition function ────────────────────────────────────────── */
  const transition = useCallback((nextStateName) => {
    const nextModule = ALL_STATES[nextStateName]
    if (!nextModule) {
      console.warn(`[CHARACTER] Unknown state: ${nextStateName}`)
      return
    }

    const prevName = stateModuleRef.current?.name || 'inactive'

    // Exit current state
    if (stateModuleRef.current?.exit) {
      stateModuleRef.current.exit(ctxRef.current)
    }

    // Setup context for new state
    ctxRef.current.elapsed = 0
    ctxRef.current.stateData = ctxRef.current.stateData || {}

    // Enter new state
    stateModuleRef.current = nextModule
    nextModule.enter(ctxRef.current)

    // Sync React state
    setState(nextStateName)
    setPositionState({ ...ctxRef.current.position })
    setFacingState(ctxRef.current.facing)
    setPostureState(ctxRef.current.posture)

    // Debug log
    const entry = `${prevName} → ${nextStateName}`
    console.log(`[CHARACTER] ${entry}`)
    setDebugLog(prev => [...prev.slice(-19), entry])
  }, [])

  // Keep the ref pointed at the latest transition for fireContextualReel.
  useEffect(() => { transitionRef.current = transition }, [transition])

  /* ── Wire reel triggers (patch v1.3 §A1+§A4) ────────────────────── */
  // Enabled only after spawn, on desktop. The hook's internal `canFire`
  // gate filters out reel-blocking states (chased/hiding/showcasing/the
  // three reel states) and defers deep-idle while a bubble is reading.
  const getStateName = useCallback(() => stateModuleRef.current?.name || 'inactive', [])
  const getBubbleActive = useCallback(() => charBubbleRef.current != null, [])
  useReelTriggers({
    section,
    enabled: visible && !isMobileRef.current && !isProjectPage,
    getState: getStateName,
    isBubbleActive: getBubbleActive,
    fire: fireContextualReel,
  })

  /* ── Spawn logic ────────────────────────────────────────────────── */
  useEffect(() => {
    if (spawnedRef.current) return
    if (!identity) return

    const spawn = () => {
      spawnedRef.current = true
      setVisible(true)

      // Landing directly on a project page — skip the walk-in and go
      // straight to the pinned project state.
      if (isProjectPageRef.current) {
        transition('project_pinned')
        return
      }

      // For reduced motion, skip entering — appear at perch
      if (reducedMotionRef.current) {
        const perches = perchesRef.current
        if (perches.length > 0) {
          const perch = perches[perches.length - 1]
          ctxRef.current.position.x = perch.x
          ctxRef.current.position.y = perch.y
        }
        transition('greeting')
      } else {
        transition('entering')
      }
    }

    if (!onboardingDone && !isReturning) {
      // First-time: wait for onboarding to complete
      // This effect will re-run when onboardingDone flips to true
      return
    }

    if (isReturning) {
      // Returning visitor: 2s delay
      const t = setTimeout(spawn, 2000)
      return () => clearTimeout(t)
    }

    // Onboarding just completed
    if (onboardingDone) {
      const t = setTimeout(spawn, 400) // brief pause after modal closes
      return () => clearTimeout(t)
    }
  }, [identity, isReturning, onboardingDone, transition])

  /* ── Wire ctx methods ───────────────────────────────────────────── */
  useEffect(() => {
    ctxRef.current.speakIdle = speakIdle
    ctxRef.current.triggerReel = triggerReel
    ctxRef.current.dismissReel = dismissReel
    ctxRef.current.setReelShown = markReelShown
  }, [speakIdle, triggerReel, dismissReel, markReelShown])

  /* ── Mirror charBubble into a ref ───────────────────────────────── */
  // The rAF loop and useReelTriggers read live bubble state without
  // re-binding listeners or rebuilding the loop.
  useEffect(() => {
    charBubbleRef.current = charBubble
  }, [charBubble])

  /* ── Main rAF loop ──────────────────────────────────────────────── */
  useEffect(() => {
    if (!visible) return

    lastTimeRef.current = performance.now()

    const loop = (time) => {
      const dt = Math.min((time - lastTimeRef.current) / 1000, 0.1) // cap dt
      lastTimeRef.current = time

      if (pausedRef.current || !stateModuleRef.current) {
        rafRef.current = requestAnimationFrame(loop)
        return
      }

      // Sync mutable ctx
      const ctx = ctxRef.current
      ctx.cursorPos = cursorPosRef.current
      ctx.cursorSpeed = cursorSpeedRef.current
      ctx.cursorMovingToward = cursorMovingTowardRef.current
      ctx.isIdle = isIdleRef.current
      ctx.idleDuration = isIdleRef.current
        ? (performance.now() - idleStartRef.current) / 1000
        : 0
      ctx.reelShown = reelShownRef.current
      ctx.reelFinished = reelFinishedRef.current
      // patch v1.3 §A4 + §B: contextual fields pulled from refs each frame.
      ctx.section = currentSectionRef.current
      ctx.bubbleActive = charBubbleRef.current != null
      ctx.elapsed += dt

      const currentState = stateModuleRef.current.name

      // ── Global chase detection ──
      // patch v1.3 cross-system: suppress chase while a bubble is reading.
      // The visitor should be able to finish a bubble without the character
      // bolting mid-sentence.
      const chasableStates = ['idling', 'wandering', 'curious']
      if (chasableStates.includes(currentState) && !ctx.bubbleActive) {
        const dist = Math.hypot(
          ctx.position.x - ctx.cursorPos.x,
          ctx.position.y - ctx.cursorPos.y
        )
        if (
          ctx.cursorSpeed > CHASE_SPEED_THRESHOLD &&
          dist < CHASE_DISTANCE_THRESHOLD &&
          ctx.cursorMovingToward
        ) {
          transition('chased')
          rafRef.current = requestAnimationFrame(loop)
          return
        }
      }

      // ── Stuck guard ──
      // patch v1.4 §"Edge cases": exempt `grabbed` — long holds are valid
      // (the visitor may be dragging across the page for many seconds).
      if (
        ctx.elapsed > STUCK_GUARD_SECONDS
        && currentState !== 'inactive'
        && currentState !== 'grabbed'
        && currentState !== 'project_pinned'
      ) {
        console.warn(`[CHARACTER] Stuck guard: ${currentState} for ${ctx.elapsed.toFixed(0)}s`)
        transition('idling')
        rafRef.current = requestAnimationFrame(loop)
        return
      }

      // ── State tick ──
      const nextState = stateModuleRef.current.tick(ctx, dt)
      if (nextState) {
        transition(nextState)
      }

      // ── Sync React state (throttled — every 2 frames is fine visually) ──
      setPositionState({ x: ctx.position.x, y: ctx.position.y })
      setFacingState(ctx.facing)
      setPostureState(ctx.posture)
      if (ctx.reelCarried !== undefined) {
        setReelCarried(ctx.reelCarried)
      }
      // Sync activity state
      setActiveActivity(ctx.stateData?.activeActivity?.name || null)
      setActiveProps(ctx.activeProps || {})
      // patch v1.4 — surface sway rotation so the sprite can rotate. Only
      // grabbed/thrown ever write nonzero values; in every other state the
      // value sits at 0 and this set is a no-op for React (same value).
      setSwayRotation(ctx.swayRotation || 0)
      // project-mode — re-render only on phase change, not every frame.
      const proj = ctx.stateData?.project
      const projPhase = proj?.phase || null
      if (projPhase !== lastProjectPhaseRef.current) {
        lastProjectPhaseRef.current = projPhase
        setProjectMode(
          proj ? { phase: projPhase, warpX: proj.warpX, warpY: proj.warpY } : null
        )
      }

      rafRef.current = requestAnimationFrame(loop)
    }

    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [visible, transition])

  /* ── Section change: fade out and reposition ────────────────────── */
  const prevSectionRef = useRef(section)
  useEffect(() => {
    // patch v1.3 §A4: keep currentSectionRef live every render even before
    // spawn, so useReelTriggers reads the right section on its first fire.
    currentSectionRef.current = section

    if (!visible || !spawnedRef.current) return
    if (prevSectionRef.current === section) return
    prevSectionRef.current = section

    // On project pages the project_pinned state owns the character's
    // position; skip the perch repositioning + idling reset entirely.
    if (isProjectPageRef.current) return

    // Recalculate perches then reposition
    const perches = perchesRef.current
    if (perches.length > 0) {
      const perch = perches[Math.floor(Math.random() * perches.length)]
      ctxRef.current.position.x = perch.x
      ctxRef.current.position.y = perch.y
      ctxRef.current.stateData.currentPerchId = perch.id
    }

    // Clear any active bubble
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current)
    setCharBubble(null)

    // Reset to idling
    if (stateModuleRef.current && stateModuleRef.current.name !== 'inactive') {
      transition('idling')
    }
  }, [section, visible, transition])

  /* ── Project-page mode ──────────────────────────────────────────── */
  // On /projects/* the character drops its autonomous behavior and runs
  // the project_pinned state (pinned corner + Goku teleport). Leaving a
  // project page hands control straight back to the normal idling loop.
  useEffect(() => {
    isProjectPageRef.current = isProjectPage
    if (!visible || !spawnedRef.current) return
    const cur = stateModuleRef.current?.name
    if (isProjectPage && cur && cur !== 'project_pinned') {
      transition('project_pinned')
    } else if (!isProjectPage && cur === 'project_pinned') {
      transition('idling')
    }
  }, [isProjectPage, visible, transition])

  /* ── External API ───────────────────────────────────────────────── */

  /** Called by CompanionContext when a section bubble fires */
  // patch v1.3 §C4 + cross-system priority: bubble triggers (priority 4)
  // drop while a higher-priority moment is on-screen — any reel state or
  // showcase. One bubble at a time also applies.
  const BUBBLE_BLOCKING_STATES = useMemo(() => new Set([
    'chased', 'hiding', 'showcasing',
    'summoning_reel', 'watching_reel', 'taking_reel',
    // patch v1.4: bubbles must not spawn during the grab/throw flow.
    'grabbed', 'thrown', 'running_away',
  ]), [])

  const speakBubble = useCallback((text, id) => {
    if (charBubbleRef.current) return false
    const stateName = stateModuleRef.current?.name
    if (stateName && BUBBLE_BLOCKING_STATES.has(stateName)) return false
    if (bubbleTimerRef.current) clearTimeout(bubbleTimerRef.current)
    setCharBubble({ text, id })
    bubbleTimerRef.current = setTimeout(() => setCharBubble(null), BUBBLE_DURATION)
    return true
  }, [BUBBLE_BLOCKING_STATES])

  /** Called by App.jsx idle detection */
  const handleIdleContent = useCallback((content) => {
    if (!content) return
    // patch v1.3 §A2: reels now fire exclusively through useReelTriggers
    // (bottom-of-page / section-dwell / deep-idle). Silently drop any reel
    // items the idle quip-cycle hands us so the priority hierarchy holds.
    if (content.type === 'reel') return
    // Quip or fact — speak it
    speakIdle(content.text)
  }, [speakIdle])

  /** Called by idle detection in App.jsx */
  const setIdleState = useCallback((idle) => {
    isIdleRef.current = idle
    if (idle) {
      idleStartRef.current = performance.now()
    }
    idleDurationRef.current = 0
  }, [])

  /** Get character position for distance gating */
  const getPosition = useCallback(() => {
    return ctxRef.current.position
  }, [])

  /** Called by Character.jsx on mouse-enter while the character is parked
   *  top-right in project mode — sends it warping back to bottom-left.
   *  No-op in any other phase. */
  const onProjectCharacterHover = useCallback(() => {
    const proj = ctxRef.current.stateData?.project
    if (proj && proj.phase === 'tr') {
      proj.hoverBack = true
    }
  }, [])

  /* ── Sprite registry ───────────────────────────────────────────── */

  const markSpriteMissing = useCallback((name) => {
    if (spriteMissingRef.current.has(name)) return
    spriteMissingRef.current.add(name)
    setSpriteRegistry({
      missing: Array.from(spriteMissingRef.current),
      loaded: Array.from(spriteLoadedRef.current),
    })
  }, [])

  const markSpriteLoaded = useCallback((name) => {
    if (spriteLoadedRef.current.has(name)) return
    spriteLoadedRef.current.add(name)
    setSpriteRegistry({
      missing: Array.from(spriteMissingRef.current),
      loaded: Array.from(spriteLoadedRef.current),
    })
  }, [])

  const togglePixelInspect = useCallback(() => {
    setPixelInspect(v => !v)
  }, [])

  /* ── Hover-on-project showcase trigger ─────────────────────────── */
  /* Per character-spec-patch-showcase.md §"Trigger logic":            */
  /*   Visitor dwells on a Work card ≥2000ms with cursor moving <30px. */
  /*   Frequency cap: 2 showcase moments per project per session.      */
  /*   Skipped: on mobile, while chased/hidden/already-showcasing.     */
  useEffect(() => {
    if (typeof document === 'undefined') return
    if (isMobileRef.current) return

    const SHOWCASE_CAP = 2
    const DWELL_MS = 2000
    const MOVE_THRESHOLD_PX = 30
    const SELECTOR = 'a.card-lift[href^="/work/"]'

    const cancelHover = () => {
      const h = hoverStateRef.current
      if (h?.timerId) clearTimeout(h.timerId)
      hoverStateRef.current = null
    }

    const fireShowcase = (cardEl) => {
      const rect = cardEl.getBoundingClientRect()
      const perch = nearestPerchTo(rect, perchesRef.current)
      if (!perch) return
      const cardId = cardEl.getAttribute('href') || cardEl.id || 'unknown'
      ctxRef.current.stateData.showcaseTarget = {
        perch,
        cardId,
        cardRect: rect,
        skipApproach: reducedMotionRef.current,
      }
      showcaseCountRef.current[cardId] = (showcaseCountRef.current[cardId] || 0) + 1
      transition('showcasing')
    }

    const onOver = (e) => {
      const card = e.target?.closest?.(SELECTOR)
      if (!card) return
      if (hoverStateRef.current?.el === card) return

      cancelHover()

      const cardId = card.getAttribute('href') || ''
      if ((showcaseCountRef.current[cardId] || 0) >= SHOWCASE_CAP) return

      const cur = stateModuleRef.current?.name
      if (cur === 'chased' || cur === 'hiding' || cur === 'showcasing') return
      if (cur === 'taking_reel' || cur === 'watching_reel' || cur === 'summoning_reel') return
      // patch v1.4: showcase must not fire while a grab/throw is mid-flight.
      if (cur === 'grabbed' || cur === 'thrown' || cur === 'running_away') return

      const startX = cursorPosRef.current.x
      const startY = cursorPosRef.current.y

      const timerId = setTimeout(() => {
        const dx = cursorPosRef.current.x - startX
        const dy = cursorPosRef.current.y - startY
        if (Math.hypot(dx, dy) > MOVE_THRESHOLD_PX) return
        // Re-check cap and state at fire time
        if ((showcaseCountRef.current[cardId] || 0) >= SHOWCASE_CAP) return
        const stateName = stateModuleRef.current?.name
        if (stateName === 'chased' || stateName === 'hiding' || stateName === 'showcasing') return
        // patch v1.4: don't fire showcase mid grab/throw/recovery.
        if (stateName === 'grabbed' || stateName === 'thrown' || stateName === 'running_away') return
        fireShowcase(card)
      }, DWELL_MS)

      hoverStateRef.current = { cardId, el: card, startX, startY, timerId }
    }

    const onOut = (e) => {
      const card = e.target?.closest?.(SELECTOR)
      if (card && hoverStateRef.current?.el === card) {
        cancelHover()
      }
    }

    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    return () => {
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelHover()
    }
  }, [transition])

  /* ── Grab / Throw input wiring (patch v1.4) ────────────────────── */
  /* mousedown on Character.jsx calls enterGrab. Release: window        */
  /* mouseup + pointerup (same handler) so the drop always runs.        */
  const enterGrab = useCallback(({ clientX, clientY }) => {
    if (isMobileRef.current) return
    const stateName = stateModuleRef.current?.name
    if (stateName && GRAB_SUPPRESSION_LIST.has(stateName)) return
    cursorPosRef.current = { x: clientX, y: clientY }
    ctxRef.current.cursorPos = { x: clientX, y: clientY }
    transition('grabbed')
  }, [transition])

  /* Window-level mouseup. The visitor can release ANYWHERE on the     */
  /* page; bound to window so we don't lose the release if the cursor  */
  /* drifts off the character element while dragging.                  */
  useEffect(() => {
    const endGrab = (e) => {
      if (stateModuleRef.current?.name !== 'grabbed') return
      if (e && typeof e.button === 'number' && e.button !== 0) return
      document.body.style.cursor = ''
      const ctx = ctxRef.current
      ctx.releaseVelocityX = ctx.swayVelocityX
      ctx.releaseVelocityY = ctx.swayVelocityY
      ctx.releaseRotation = ctx.swayRotation
      ctx.stateData.dropPoint = {
        x: ctx.position.x,
        y: ctx.position.y,
      }
      if (!charBubbleRef.current) {
        speakIdleRef.current(pickThrowQuip())
      }
      transitionRef.current?.('thrown')
    }
    window.addEventListener('mouseup', endGrab)
    window.addEventListener('pointerup', endGrab)
    return () => {
      window.removeEventListener('mouseup', endGrab)
      window.removeEventListener('pointerup', endGrab)
    }
  }, [])

  /** Force a full grab → thrown → running_away sequence (debug). */
  // Synthesizes a grab at the current cursor position, then dispatches
  // a real `mouseup` after ~600ms so the natural release path runs.
  const forceGrab = useCallback(() => {
    if (isMobileRef.current) {
      console.log('[CHARACTER DEBUG] Grab disabled on mobile.')
      return
    }
    const stateName = stateModuleRef.current?.name
    if (stateName && GRAB_SUPPRESSION_LIST.has(stateName)) {
      console.log(`[CHARACTER DEBUG] Grab blocked: state '${stateName}' is in suppression list.`)
      return
    }
    const { x, y } = cursorPosRef.current
    document.body.style.cursor = 'grabbing'
    enterGrab({ clientX: x, clientY: y })
    setTimeout(() => {
      window.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
    }, 600)
  }, [enterGrab])

  /** Force a showcase moment on the first available project card (debug). */
  const forceShowcase = useCallback(() => {
    if (typeof document === 'undefined') return
    const card = document.querySelector('a.card-lift[href^="/work/"]')
    if (!card) {
      console.log('[CHARACTER DEBUG] No project card on page. Navigate to /work first.')
      return
    }
    const rect = card.getBoundingClientRect()
    const perch = nearestPerchTo(rect, perchesRef.current)
    if (!perch) return
    const cardId = card.getAttribute('href') || 'debug-card'
    ctxRef.current.stateData.showcaseTarget = {
      perch,
      cardId,
      cardRect: rect,
      skipApproach: reducedMotionRef.current,
    }
    showcaseCountRef.current[cardId] = (showcaseCountRef.current[cardId] || 0) + 1
    transition('showcasing')
  }, [transition])

  /** Force a specific activity (debug only) */
  const forceActivity = useCallback((activityName) => {
    const ctx = ctxRef.current
    if (stateModuleRef.current?.name !== 'idling') {
      // Force to idling first
      transition('idling')
    }
    // Set up the activity directly in stateData
    const activityMap = {
      laptop_session: { name: 'laptop_session', duration: 12 },
      peek_reveal: { name: 'peek_reveal', duration: 4 },
      stretch: { name: 'stretch', duration: 2 },
      contemplation: { name: 'contemplation', duration: 6 },
      beverage: { name: 'beverage', duration: 5 },
    }
    const activity = activityMap[activityName]
    if (!activity) return
    // End any current activity
    ctx.stateData.activeActivity = activity
    ctx.stateData.activityElapsed = 0
    // Apply posture + props
    const postureMap = {
      laptop_session: ['laptop_open', { laptop: true }],
      peek_reveal: ['peeking', {}],
      stretch: ['stretching', {}],
      contemplation: ['contemplating', {}],
      beverage: ['holding_mug', { mug: true }],
    }
    const [postureName, props] = postureMap[activityName]
    ctx.posture = postureName
    ctx.activeProps = props
    console.log(`[CHARACTER DEBUG] Forced activity: ${activityName}`)
  }, [transition])

  const value = useMemo(() => ({
    state,
    position,
    facing,
    posture,
    charBubble,
    reelActive,
    reelClip,
    reelCarried,
    visible,
    debugLog,
    activeActivity,
    activeProps,
    pixelInspect,
    spriteRegistry,
    swayRotation,
    projectMode,
    onProjectCharacterHover,
    speakBubble,
    handleIdleContent,
    setIdleState,
    getPosition,
    dismissReel,
    enterGrab,
    forceActivity,
    forceShowcase,
    forceGrab,
    togglePixelInspect,
    markSpriteMissing,
    markSpriteLoaded,
    reelShown: reelShownRef.current,
  }), [
    state, position, facing, posture, charBubble,
    reelActive, reelClip, reelCarried, visible, debugLog,
    activeActivity, activeProps, pixelInspect, spriteRegistry, swayRotation,
    speakBubble, handleIdleContent, setIdleState, getPosition, dismissReel,
    enterGrab, forceActivity, forceShowcase, forceGrab, togglePixelInspect,
    markSpriteMissing, markSpriteLoaded,
    projectMode, onProjectCharacterHover,
  ])

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  )
}

export function useCharacter() {
  const ctx = useContext(CharacterContext)
  if (!ctx) {
    throw new Error('useCharacter must be used inside <CharacterProvider>')
  }
  return ctx
}
