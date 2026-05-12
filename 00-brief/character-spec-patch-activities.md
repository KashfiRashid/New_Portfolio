# character-spec — patch v1.2 (idle activities)

> **Drop alongside `character-spec.md` and `character-spec-patch-showcase.md` in `/00-brief/`.**
> Antigravity reads all three. This adds *life* to the `idling` state — micro-narratives that play out while the character is at a perch.
> Reason: the v1.0 spec had `idling` as static fidgets only. The character felt present but not *alive*. This patch makes it actually inhabit the 2am studio.

---

## What this adds

A sub-system inside the existing `idling` state. Every 8–15 seconds while idling, the character picks a weighted random **activity** and performs it. After completion, returns to idle baseline (small fidgets), then picks again.

Activities are 2am studio micro-narratives — laptop coding, peeking from behind elements, stretching, contemplating, sipping a late-night beverage. They reinforce the brand by showing the character *living* in the world rather than just standing in it.

---

## Activity catalog (5 in v1)

### 1. `laptop_session` — most common, the main activity
- **Weight**: 4 (highest)
- **Duration**: 10–15 seconds
- **What happens**: character sits cross-legged or transitions to seated posture. Small laptop prop materializes on its lap. Character hunches slightly forward, hands at keys. Subtle head bob (typing rhythm). Monitor glow accent intensifies on character's face/head area during this activity. After duration, laptop closes (small fold animation), character stands.
- **New posture needed**: `laptop_open` — seated, slight forward lean, hands extended at lap level
- **New prop needed**: `laptop` — small dark rectangle (~12×8px) with a warm-glow rect on top half (the screen). Animates open/closed via height transition.
- **Why it matters**: this is the activity that says *"this character is Kash, working."* Should fire most often. Visitors who linger long enough should see it at least once per visit.

### 2. `peek_reveal` — context-aware, conditional
- **Weight**: 2
- **Duration**: 3–5 seconds
- **Condition**: only fires if character's current perch is *behind* a viewport element (project card, image, section header). The character system needs to know which perches have "occlusion" — flag them in `perches.js`.
- **What happens**: character starts fully hidden behind the element (only top of head/silhouette visible). Then peeks fully out (slides up so 2/3 of body is visible), looks left and right, ducks back down.
- **New posture needed**: `peeking` — partial body, head and shoulders only
- **Why it matters**: this is the *"something just moved behind the project card"* moment — peripheral attention catcher.

### 3. `stretch` — palette cleanser
- **Weight**: 1
- **Duration**: 1.5–2 seconds
- **What happens**: character stands (if seated), arms raise overhead in a stretch, holds 800ms, arms drop, returns to idle. Slight scale-y bounce on the stretch (1.0 → 1.06 → 1.0).
- **New posture needed**: `stretching` — arms overhead, body slightly elongated
- **Why it matters**: short and human. The "I've been at this too long" beat. Makes the character feel embodied.

### 4. `contemplation` — slow moment
- **Weight**: 2
- **Duration**: 4–7 seconds
- **What happens**: character (seated) leans head onto one hand, eyes/head pointed away from screen toward middle distance. Holds. Eventually returns to upright. No motion during the hold — stillness IS the animation.
- **New posture needed**: `contemplating` — seated, head tilted, one arm raised supporting head
- **Why it matters**: the most reflective activity. Matches the *"warm-reflective"* voice register at the visual level.

### 5. `beverage` — rare, atmospheric
- **Weight**: 1 (rarest)
- **Duration**: 4–6 seconds
- **What happens**: small mug prop appears in character's hand. Character lifts mug toward head area (sip motion), holds 1.5s, lowers, mug disappears (sets down off-frame). Subtle steam motion above mug during the hold (3 small particle dots rising and fading).
- **New posture needed**: `holding_mug` — standing or seated, one arm raised toward head
- **New prop needed**: `mug` — small rounded shape (~6×6px) with a handle. Warm-fill, slight glow on top to suggest hot drink.
- **Why it matters**: 2am beverage is a *cliché* of late-night work, but the cliché lands. It's the easiest signal of "this person is up late, working."

---

## Architecture — how activities slot into `idling`

### Inside `states/idling.js` — extend the existing module

```js
// Inside the existing idling.js state file

const activities = [
  { name: 'laptop_session', weight: 4, duration: { min: 10000, max: 15000 } },
  { name: 'peek_reveal',    weight: 2, duration: { min: 3000,  max: 5000 },  condition: 'isOccludedPerch' },
  { name: 'stretch',        weight: 1, duration: { min: 1500,  max: 2000 } },
  { name: 'contemplation',  weight: 2, duration: { min: 4000,  max: 7000 } },
  { name: 'beverage',       weight: 1, duration: { min: 4000,  max: 6000 } }
];

export default {
  name: 'idling',

  enter(ctx) {
    ctx.posture = 'standing';
    ctx.activeActivity = null;
    ctx.nextActivityAt = ctx.now + randInt(8000, 15000);
  },

  tick(ctx, dt) {
    // existing transition checks (cursor approach → curious, idle timer → summoning_reel, etc.)
    // ... keep all existing logic ...

    // ACTIVITY LAYER (new in v1.2)
    if (!ctx.activeActivity && ctx.now >= ctx.nextActivityAt) {
      ctx.activeActivity = pickActivity(ctx, activities);
      ctx.activityStartedAt = ctx.now;
      applyActivityPosture(ctx);
    }

    if (ctx.activeActivity) {
      const elapsed = ctx.now - ctx.activityStartedAt;
      if (elapsed >= ctx.activeActivity.duration) {
        endActivity(ctx);
        ctx.nextActivityAt = ctx.now + randInt(8000, 15000);
      } else {
        updateActivityFrame(ctx, elapsed);
      }
    }

    return null;
  },

  exit(ctx) {
    if (ctx.activeActivity) endActivity(ctx);
  }
}

function pickActivity(ctx, list) {
  const valid = list.filter(a => !a.condition || ctx[a.condition]);
  const total = valid.reduce((s, a) => s + a.weight, 0);
  let r = Math.random() * total;
  for (const a of valid) {
    if (r < a.weight) return { ...a, duration: randInt(a.duration.min, a.duration.max) };
    r -= a.weight;
  }
  return valid[0];
}
```

### Posture variants (extend `CharacterSprite.jsx`)

Five new postures to add to the existing variant set:

```jsx
const postureVariants = {
  // existing: standing, walking, sitting, waving, running, showcasing

  laptop_open:    { /* seated lean forward, custom path */ },
  peeking:        { /* partial body, head+shoulders only */ },
  stretching:     { y: 0, scale: [1, 1.06, 1], transition: { duration: 1.6 } },
  contemplating:  { /* seated, head tilt, arm support */ },
  holding_mug:    { /* arm raised toward head */ }
};
```

Each posture is a separate SVG path or a series of paths. Antigravity should commission/produce these as part of Phase 1 (sprite system) — they're not motion variants, they're shape variants that motion transitions between.

### Props (new concept in `CharacterSprite.jsx`)

```jsx
// Inside the character SVG group, conditionally render props

{props.laptop && (
  <motion.g
    initial={{ scaleY: 0 }}
    animate={{ scaleY: 1 }}
    exit={{ scaleY: 0 }}
    transition={{ duration: 0.3 }}
  >
    <rect x="..." y="..." width="12" height="8" fill="#1a1916" />
    <rect x="..." y="..." width="12" height="4" fill="#c8b582" opacity="0.6" />
  </motion.g>
)}

{props.mug && (
  <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    {/* mug body + handle paths */}
    {/* steam particles via motion */}
  </motion.g>
)}
```

Props are toggled by activity logic. `laptop` shows during `laptop_session`; `mug` shows during `beverage`. Both fade out when activity ends.

### Perch metadata (extend `perches.js`)

Some perches need an `isOccluded` flag so `peek_reveal` knows where it can fire.

```js
// perches.js
export const perches = {
  home: [
    { x: '8%',  y: '85%', isOccluded: false },
    { x: '92%', y: '85%', isOccluded: false },
    { x: '50%', y: '92%', isOccluded: true  },  // behind footer area
    // ...
  ],
  work: [
    { x: '5%',  y: '40%', isOccluded: true,  occluderId: 'project-card-1' },
    // ... perches BEHIND project cards, character pops up from behind
  ]
};
```

When the character spawns at an occluded perch, `ctx.isOccludedPerch = true`, which makes `peek_reveal` eligible.

---

## Frequency rules

- One activity at a time per perch session. Character doesn't stack activities.
- After an activity completes, 8–15 second cooldown before next activity.
- If a state transition fires (visitor approaches, idle timer hits, section nav), activity is cleanly cancelled — character stands, props disappear, transitions to new state.
- Activities NEVER fire during: `chased`, `hiding`, `summoning_reel`, `watching_reel`, `taking_reel`, `showcasing`, `entering`, `greeting`. Only `idling`.

---

## Mobile + reduced-motion

- **Mobile**: activities do NOT fire on mobile. Per the main spec, the character only appears at greeting / reel / exit moments — not enough idle time to play activities.
- **Reduced motion**: activities fire but in their *static* form. `laptop_session` shows the character with laptop open, no typing animation. `stretch` is just the stretched posture, no motion. `peek_reveal` shows fully-revealed posture, no peek animation. Visitors with reduced-motion still see the character living in the studio — just without motion-based effects.

---

## Definition of done (additions)

- [ ] All 5 activities implemented and observable in debug mode (keyboard shortcuts: `1` laptop, `2` peek, `3` stretch, `4` contemplate, `5` beverage)
- [ ] Activity selection is weighted random and respects conditions (peek only at occluded perches)
- [ ] Laptop and mug props render correctly, fade in/out on activity start/end
- [ ] All 5 new postures (laptop_open, peeking, stretching, contemplating, holding_mug) added to CharacterSprite.jsx
- [ ] State transitions cleanly cancel active activities (props disappear, posture resets)
- [ ] Reduced-motion fallback: activities show as static postures only
- [ ] Mobile: activities suppressed entirely

---

## What this changes downstream

- `04-companion-spec.md` — could add bubbles tied to activities ("yeah, debugging this all night" during laptop_session). Phase 2 — not in v1.
- `06-visual-direction.md` — new visual elements: laptop prop, mug prop, steam particles. Should be specced for visual consistency with the silhouette aesthetic.
- `bubbleLibrary.js` — no changes in v1.

---

## Why these 5 specifically

The activity list was picked to reinforce the brand at the visual level:

| Activity | What it signals |
|---|---|
| `laptop_session` | *"This person is working."* The default state of the studio. |
| `peek_reveal` | *"This person notices things."* Reinforces the people's-person thread. |
| `stretch` | *"This person is human."* Cuts the polish, adds embodiment. |
| `contemplation` | *"This person reflects."* Matches the warm-reflective voice register. |
| `beverage` | *"This person is up late."* The clichéd-but-true 2am signal. |

If any of these don't land in v1, drop them — don't replace with random alternatives. The activity list shouldn't grow past 6–7 max, or the character starts feeling overcrowded with behavior.

---

*End of patch v1.2. Drop in `/00-brief/`.*
