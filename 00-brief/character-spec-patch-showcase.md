# character-spec — patch v1.1 (showcase state)

> **Drop this file alongside `character-spec.md` in `/00-brief/`.**
> Antigravity reads both. This adds one new behavioral state — `showcasing` — to the character system.
> Reason for separate file: keeps the main spec stable while iterating on additions.

---

## What this adds

A new state called **`showcasing`**. Triggered when the visitor hovers a project card for 2+ seconds without clicking. The character walks to the project, does a small upward flourish to draw attention, then resumes normal behavior.

This is the on-brand translation of the "pixel character pops up to grab attention" pattern — adapted to the 2am studio silhouette aesthetic. Subtle, not theatrical.

---

## State definition

### `showcasing` — fits between `wandering` and `curious` in the state machine

| Property | Spec |
|---|---|
| **Trigger** | Visitor hovers a project card element for ≥2000ms without moving cursor more than 30px |
| **Frequency cap** | Max 2 showcase moments per session, per project. After cap, character ignores hover → reverts to normal. |
| **Movement** | Walks to nearest perch adjacent to the hovered card (~600ms at walking speed) |
| **Posture sequence** | walking → standing → showcasing flourish → standing → look-at-visitor → return |

### Sequence in detail

1. **Approach** (0–600ms) — walks from current perch to nearest perch adjacent to the project card. Faces the card.
2. **Settle** (600–800ms) — comes to a stop, posture transitions to `standing`.
3. **Flourish** (800–1600ms) — `showcasing` posture: 8px upward hop, 1.04× scale, warm-glow accent pulses for 200ms. Holds 800ms total.
4. **Settle back** (1600–2200ms) — returns to `standing`, glow accent fades.
5. **Acknowledge visitor** (2200–3200ms) — turns head toward cursor, holds 1s.
6. **Exit** (3200ms+) — transitions back to `idling` at current position, OR `wandering` if next wander timer is due.

### Posture variant (framer-motion)

```jsx
// In CharacterSprite.jsx, add to existing postureVariants
const postureVariants = {
  // ... existing: standing, walking-1, walking-2, sitting, waving, running

  showcasing: {
    y: [0, -8, -8, -2, 0],
    scale: [1, 1.04, 1.04, 1.01, 1],
    transition: {
      duration: 1.6,
      times: [0, 0.2, 0.6, 0.8, 1],
      ease: 'easeOut'
    }
  }
}
```

### Glow pulse (separate motion overlay)

```jsx
// Layered on top of the sprite during showcasing
<motion.div
  className="character-glow-accent"
  initial={{ opacity: 0 }}
  animate={{
    opacity: state === 'showcasing' ? [0, 0.7, 0.7, 0.3, 0] : 0
  }}
  transition={{
    duration: 1.4,
    times: [0, 0.15, 0.5, 0.8, 1]
  }}
/>
```

The glow is a simple radial gradient (warm cream/amber) at low opacity, ~24px radius, centered behind the character. Subtle, not a sparkle burst.

### State module file

```js
// src/character/states/showcasing.js
export default {
  name: 'showcasing',

  enter(ctx, { targetCardEl }) {
    ctx.targetPosition = nearestPerchTo(targetCardEl);
    ctx.facingTarget = targetCardEl;
    ctx.posture = 'walking';
    ctx.showcaseCount = (ctx.showcaseCount || {});
    ctx.showcaseCount[targetCardEl.id] = (ctx.showcaseCount[targetCardEl.id] || 0) + 1;
  },

  tick(ctx, dt) {
    if (!ctx.atTarget) return null;       // still walking

    const t = ctx.timeInState;
    if (t < 800)        ctx.posture = 'standing';
    else if (t < 1600)  ctx.posture = 'showcasing';
    else if (t < 3200)  ctx.posture = 'standing';
    else                return 'idling';

    return null;
  },

  exit(ctx) {
    ctx.facingTarget = null;
  }
}
```

### Trigger logic in CharacterContext

```jsx
// In CharacterContext.jsx
useEffect(() => {
  if (!hoveredCard) return;
  if (currentState === 'chased' || currentState === 'hiding') return;

  const cap = 2;
  const seenCount = (showcaseCount[hoveredCard.id] || 0);
  if (seenCount >= cap) return;

  const timer = setTimeout(() => {
    if (cursorMovedSinceHover < 30) {
      transitionTo('showcasing', { targetCardEl: hoveredCard });
    }
  }, 2000);

  return () => clearTimeout(timer);
}, [hoveredCard]);
```

---

## State machine — updated diagram

```
                ┌─────────┐
arrive ──────→  │entering │
                └────┬────┘
                     ↓
                ┌─────────┐
                │greeting │
                └────┬────┘
                     ↓
                ┌─────────┐ ←──────────────────┐
       ┌──────→ │ idling  │                    │
       │        └────┬────┘                    │
       │             │                         │
       │     ┌───────┼─────────┬──────────┐    │
       │     ↓       ↓         ↓          ↓    │
       │ ┌──────┐ ┌──────┐ ┌─────────┐┌──────┐ │
       │ │wander│ │curi- │ │showcase ││summon│ │
       │ │      │ │ous   │ │  (NEW)  ││_reel │ │
       │ └──┬───┘ └──┬───┘ └────┬────┘└──┬───┘ │
       │    │        │           │       │     │
       │    │  ┌─────┘           │       ↓     │
       │    │  ↓                 │  ┌────────┐ │
       │    │┌────────┐          │  │watching│ │
       │    ││chased  │          │  │_reel   │ │
       │    │└───┬────┘          │  └───┬────┘ │
       │    │    ↓               │      ↓      │
       │    │┌────────┐          │  ┌────────┐ │
       │    └│hiding  │          │  │taking  │ │
       │     └───┬────┘          │  │_reel   │ │
       │         │               │  └───┬────┘ │
       └─────────┴───────────────┴──────┘      │
                                               │
       (off-screen) ──── respawn ──────────→───┘
```

---

## Definition of done (additions to main spec Section 13)

- [ ] `showcasing` state implemented and observable in debug mode (keyboard shortcut `O` for "showcase")
- [ ] Trigger fires only after 2000ms hover with <30px cursor movement
- [ ] Frequency cap (2 per project per session) enforced
- [ ] Glow accent overlay renders correctly during flourish
- [ ] State respects existing rules: skipped if visitor already chased/hidden, skipped on mobile (no continuous roaming)

---

## Mobile + reduced-motion

- **Mobile**: showcase state does NOT fire on mobile (character isn't roaming continuously per main spec Section 9). On mobile, project hover already shows static information; no character behavior needed.
- **Reduced motion**: showcase still fires but simplified — character appears at perch instantly, glow pulses once (no movement), then disappears. Same logic as other reduced-motion adaptations.

---

## What this changes downstream

- `04-companion-spec.md` — no changes (no new bubbles attached to this state in v1; can add hover-on-project bubbles as a phase-2 enhancement)
- `06-visual-direction.md` — minor: glow accent overlay added as a new visual element, ~24px radius warm radial gradient

---

*End of patch. Drop in `/00-brief/` alongside `character-spec.md`.*
