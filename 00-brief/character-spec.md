# character-spec.md

> **Status**: v1.0, supersedes the autonomous-behavior portions of `04-companion-spec.md`.
> The bubble library and voice register from `04-companion-spec.md` remain authoritative for *what the character says*. This file defines *how it lives, moves, and interacts*.
> Cowork: on next regen, sync `04-companion-spec.md` to point at this file as the source of truth for character behavior. Do not delete the existing bubble library — bubbles are now spoken *by the character* instead of *by the cursor*, but the content is unchanged.

---

## 1. What this character is

A small autonomous figure that lives on the page. It has its own behavior loop — wandering, idling, occasionally interacting with the visitor — and serves three jobs:

1. **Embodied presence**. It is the *body* of what was previously the cursor companion. When it speaks, bubbles appear above its head (not above the cursor).
2. **Reel custodian**. It brings idle reels into frame and takes them back when the visitor reactivates. The reels are objects it carries, not ambient overlays.
3. **Wow mechanic**. It's the single most distinctive feature of the site. The thing visitors take screenshots of.

References for the *behavior*: Desktop Goose (samperson) — autonomous, surprises you, does its own thing. Auto-Desktop-Goose fork (Fruchtii). Clippy — aware of what you're doing. Stardew Valley NPCs — small but characterful.

References for the *look*: not those. The character looks like Kash's silhouette character (Option A from the prior sketches), rendered in the 2am studio aesthetic — minimal, restrained, dark figure with a warm-accent glow where monitor light would catch it. Not a goose. Not a paperclip. Not pixel-art. Not cartoon. Not cute-mascot.

---

## 2. Visual design constraints

| Property | Spec |
|----------|------|
| Size | 32–40px tall on desktop, 28px on mobile when present |
| Style | Minimal silhouette, dark fill (#1a1916 or similar), warm accent (#c8b582 or similar) where light catches |
| Detail | Low — body, head, suggested arms/legs. No facial features. No facial expressions (mood comes from posture). |
| Color | Two-tone max: dark silhouette + warm accent. The accent suggests monitor glow, late-night light, the 2am studio. |
| Outline | None — the silhouette IS the form. |
| Glow | Optional very subtle ambient glow (1–2px, low opacity) underneath when on dark backgrounds. Helps it read against varied surfaces. |
| Animation style | Smooth, weighted, slightly slow. Not bouncy. Not springy. Walks like a person, not a goose. |

**Anti-patterns to refuse if Antigravity drifts during build:**

- Facial features (eyes, mouth) — no
- Bouncy spring physics — no
- Cartoon body proportions (big head, tiny body) — no
- Bright saturated colors — no
- Multiple costumes / accessories — no
- Speech-bubble-shaped bubble (rounded corners, tail) is fine; comic-style ZAP/POW shapes — no

The character should look like *the same person as the silhouette in the section breaks and the footer*, not a separate mascot character.

---

## 3. Behavioral states

Eleven states. Each has visual posture + movement rule + entry/exit conditions.

### 3.1 `entering`
- **Visual**: walking in from off-screen left or right edge
- **Movement**: walking speed (80 px/s), staying near the bottom 1/3 of viewport
- **Entry**: visitor arrives at site for the first time this session
- **Exit**: reaches a "settle point" near a corner → transitions to `greeting`

### 3.2 `greeting`
- **Visual**: stops, faces the cursor's general direction, raises one arm in a small wave
- **Duration**: 1.2s
- **Speech**: emits one entry bubble (e.g., *"hey. you'll get a name and a color in a second. doesn't bite."*)
- **Exit**: transitions to `idling` after the wave completes

### 3.3 `idling`
- **Visual**: stationary at a "perch" position (one of 4 corners or edges)
- **Animation**: occasional micro-fidgets — looks at cursor, looks back, slight head turn, slight body shift. Every 6–12 seconds.
- **Duration**: stays in this state until a trigger fires
- **Exit triggers**: time → `wandering`, cursor approach → `chased`, prolonged stillness → `curious`, idle timer ≥12s → `summoning_reel`

### 3.4 `wandering`
- **Visual**: walks from current perch to a different perch
- **Movement**: walking speed (80 px/s), follows a path that respects content (doesn't walk through cards, walks around the edges)
- **Trigger**: random, every 30–60s while in `idling`
- **Pause behavior**: occasionally pauses mid-walk for 1–2s, looks at something nearby (a project image, a section header)
- **Exit**: arrives at new perch → `idling`. Or interrupted by `chased` / `summoning_reel`.

### 3.5 `curious`
- **Visual**: slowly walks toward the cursor's current position
- **Movement**: half walking speed (40 px/s)
- **Trigger**: cursor stationary within 250px of character for 3+ seconds
- **Behavior**: gets within 80px of cursor, stops, looks at cursor for 1.5s, then either:
  - Speaks a hover-style bubble (50% chance) → `speaking` then `idling` at new position
  - Walks back to a perch → `idling`
- **Exit**: if cursor moves toward character at any time during approach → immediate `chased`

### 3.6 `chased`
- **Visual**: scampers away from the cursor at running speed
- **Movement**: 200 px/s, faster if cursor is moving aggressively toward it. Slight stretch on direction changes (squash-and-stretch principle but subtle).
- **Trigger**: cursor moves toward character at speed > threshold (~600 px/s) AND distance < 150px
- **Behavior**: runs to opposite corner of viewport, then transitions to `hiding`
- **Exit**: arrives at safe corner → `hiding`

### 3.7 `hiding`
- **Visual**: just barely visible at edge of viewport, peeking
- **Duration**: 5–10 seconds
- **Behavior**: doesn't react to cursor; can emit one cheeky bubble (e.g., *"give me a sec."*)
- **Exit**: timer expires → `idling` at hidden corner. Or if visitor goes idle 12s while character hidden → emerges into `summoning_reel`.

### 3.8 `speaking`
- **Visual**: same posture as previous state; bubble appears above head
- **Duration**: bubble shown for 4–7 seconds (depending on bubble length), then fades
- **Note**: speaking is overlaid on other states — character can speak while idling, while wandering pauses, while watching the reel. It is *not* a state on its own that blocks movement; rather it's a layered behavior.
- **Bubble origin**: from above character's head, not from cursor. Bubble follows character if it moves while speaking. Bubble has subtle tail pointing down at character.
- **Distance rule**: character only speaks when within 250px of cursor. If character is far from cursor, bubble system stays quiet — preserves the "rare speech" principle even though the character itself moves more.

### 3.9 `summoning_reel`
- **Visual**: walks to the designated reel-spawn anchor (default: lower-right of viewport, ~80px from edges)
- **Movement**: walking speed (80 px/s)
- **Trigger**: visitor idle ≥12s AND character not currently chased/hidden
- **Behavior on arrival**: sits down (smooth posture transition), then after 800ms a reel SVG materializes next to character (fades in over 400ms)
- **Exit**: transitions to `watching_reel` once reel is fully visible

### 3.10 `watching_reel`
- **Visual**: seated next to the reel, head turned slightly toward it
- **Animation**: occasional small movements — head turn back to look at cursor briefly, then back to reel
- **Speech**: may emit one or two reel-related bubbles (e.g., *"this is from last tuesday."* / *"watch the lower-left."*)
- **Duration**: until reel finishes (~12–15s) OR visitor reactivates (cursor moves)
- **Exit**: transitions to `taking_reel`

### 3.11 `taking_reel`
- **Visual**: stands up (smooth transition), walks toward viewport edge carrying the reel (reel attaches to character's hand/side)
- **Movement**: walking speed (80 px/s)
- **Behavior**: reel is visible *as carried* until character exits viewport. Reel does not stay behind.
- **Exit**: character exits off-screen → spawns back in at next perch → `idling`

---

## 4. State machine — transitions

```
                ┌─────────┐
arrive ──────→  │entering │
                └────┬────┘
                     ↓
                ┌─────────┐
                │greeting │
                └────┬────┘
                     ↓
                ┌─────────┐ ←──────────────┐
       ┌──────→ │ idling  │                │
       │        └────┬────┘                │
       │             │                     │
       │     ┌───────┼─────────────┐      │
       │     ↓       ↓             ↓      │
       │ ┌──────┐ ┌──────┐  ┌──────────┐  │
       │ │wander│ │curi- │  │summoning │  │
       │ │      │ │ous   │  │_reel     │  │
       │ └──┬───┘ └──┬───┘  └────┬─────┘  │
       │    │        │            │        │
       │    │  ┌─────┘            ↓        │
       │    │  ↓             ┌─────────┐  │
       │    │┌────────┐      │watching │  │
       │    ││chased  │      │_reel    │  │
       │    │└───┬────┘      └────┬────┘  │
       │    │    ↓                ↓        │
       │    │┌────────┐     ┌──────────┐  │
       │    └│hiding  │     │taking    │  │
       │     └───┬────┘     │_reel     │  │
       │         │          └────┬─────┘  │
       └─────────┴───────────────┘        │
                                          │
       (off-screen) ──── respawn ──────→──┘
```

`speaking` is overlaid on whichever movement state is active — not a node in the graph.

---

## 5. Movement mechanics

### 5.1 Pathfinding

The character should respect content boundaries — walking *around* cards, project images, and section headers, not *through* them. Implementation note: keep this simple. Don't build a real pathfinding algorithm. Define a set of valid "perch" positions per section (corners, edges, gaps between cards) and a set of valid "walking lanes" between perches (along the edges of the viewport, mostly). Random wandering picks a perch, then walks along the nearest lane to it.

Recommended perches per section:
- **Home**: 4 corners + 2 edge-mid positions
- **Voice / Eye / Origin** (text-heavy): 2 left edge, 2 right edge
- **Work / People** (card-heavy): edges only, never inside the card grid
- **Process**: top-right (above the orchestration content), bottom-right
- **Hall of Fame**: bottom-right (so it's near where reels normally appear)

### 5.2 Speed

| State | Speed |
|-------|-------|
| Walking (wandering, summoning_reel, taking_reel, entering) | 80 px/s |
| Curious (slow approach) | 40 px/s |
| Chased (run away) | 200 px/s, scaling up to 280 px/s if cursor is aggressive |

### 5.3 Cycles

- **Walk cycle**: 4 frames, ~400ms loop. Legs alternate visibly. Slight body bob (1–2px).
- **Run cycle**: 4 frames, ~250ms loop. More exaggerated leg movement. Slight forward lean.
- **Sit cycle**: posture shift, 600ms transition (stand → seated). No looping animation in seated state itself except micro-head-turns.

If full walk-cycle animation is too much for v1, an acceptable simpler approach: the character translates across the page with a subtle vertical bob (sin wave, ±2px, period matching walking pace), and that reads as "walking" without literal leg animation. The bob alone is fine for v1.

### 5.4 Direction

The character has a "facing" direction (left or right). When walking, faces direction of travel. When idling, faces the cursor (whichever side it's on). Mirror the SVG horizontally to flip — don't author two separate sprites.

---

## 6. Reel custody — exact mechanic

This is the core idle-layer mechanic. Detail matters.

**Setup**
- Reel-spawn anchor: lower-right of viewport, with 80px margin from right edge and 100px from bottom (above where the footer might encroach)
- Reel size: 240px × 160px on desktop, 200px × 130px on mobile
- Reel content: video, image, or animated SVG. Brand book idle reels supply the content.

**Sequence**

1. Visitor goes idle (no cursor movement) for 12s
2. Character (wherever it is) transitions to `summoning_reel`
3. Walks to spawn anchor (path varies; takes 2–4s)
4. Sits down at anchor (600ms posture transition)
5. **800ms pause** — character settled, no reel yet
6. Reel materializes adjacent to character (fades in over 400ms, slight upward y motion of 6px)
7. Character is now in `watching_reel` state
8. Reel content plays (12–15s typical)
9. **Visitor reactivates** (cursor moves) OR **reel ends** — whichever first
10. Character transitions to `taking_reel`
11. Stands (600ms transition)
12. Reel attaches to character's side/hand (becomes a child of the character SVG group)
13. Character walks off-screen toward nearest viewport edge, carrying reel (1.5–2.5s)
14. Both disappear off-screen
15. After 3–5s, character respawns at a perch in `idling` state. Reel is gone.

**Key constraint**: the reel does *not* persist after the character leaves. It exists as long as the character custodies it. This is the key narrative beat — the character brings the moment, the character takes it away.

**Frequency cap**: maximum 1 reel per session. If the visitor goes idle multiple times, character may approach the spawn anchor and look at it, but doesn't summon another reel. This prevents the mechanic from getting old.

---

## 7. Bubble speech — architectural change

This is the change that matters most to `04-companion-spec.md`.

**Old architecture (v1.1):** bubbles appeared at cursor position, spoken by the cursor companion.

**New architecture (v1.2):** bubbles appear *above the character's head*. Spoken by the character. Bubble follows character if it moves during speech.

**Distance rule (preserved from v1.1's "rare and quiet" principle):** the character only speaks when within 250px of the cursor. If the character is far from the cursor (wandering, hiding, in the opposite corner), no bubbles — silence. This preserves the rare/quiet feel even though the character itself moves a lot.

**Speech triggers (mapping the existing bubble library to the new architecture):**

| Existing trigger type | New trigger logic |
|-----------------------|-------------------|
| Entry bubble | Fired during `greeting` state |
| Hover bubble | Fired only if character is within speaking range AND visitor hovers a relevant element |
| Click bubble | Same — only if character is in range |
| Scroll-past bubble | Fired if character can "see" the visitor scrolling past (always, since it's nearby — unless hiding) |
| Idle bubble | Fired during `summoning_reel` or `watching_reel` |
| Exit-intent bubble | Fired when cursor moves toward viewport top edge — character calls out from wherever it is (this is the *one* case where speech fires regardless of distance, because it's the goodbye) |
| Returning-visitor bubble | Fired during `greeting` on return |

**Implementation note**: the existing `bubbleLibrary.js` doesn't need rewriting. The bubble *content* is unchanged. Only the *render position* changes — bubble component now reads character position instead of cursor position. Cowork should patch the trigger logic in `CompanionContext.jsx` to gate bubbles on character distance.

---

## 8. Visitor identity interaction

The visitor's colored cursor stays as is. The character is a separate entity. They interact, they don't merge.

**Specific behavior:**

- The character's accent color is fixed (warm cream/amber, the 2am studio glow color)
- When the character is within 80px of the cursor (very close), its accent **shifts subtly toward the visitor's assigned color** — this is a small acknowledgment, like reflected light. Returns to normal accent when distance grows. This is a *nice-to-have*, defer to v2 if time-constrained.
- When the character speaks, bubbles use the same styling as v1.1 (no visitor-color border). The visitor's color stays *with the visitor*.

**No merging**: the character should never adopt the visitor's name, color, or identity wholesale. Two distinct entities is the brand.

---

## 9. Performance budget

| Concern | Budget |
|---------|--------|
| Frame rate | 60fps on desktop, 30fps acceptable on mobile |
| CPU | Character system should not exceed 4% CPU on a mid-range laptop in steady state |
| Memory | SVG-based, single character instance, < 200KB |
| Battery | On mobile, character should pause when tab is backgrounded (Page Visibility API) |
| Network | No additional network requests beyond the reel content already specified |

**Mobile adaptation**:

- On mobile (< 768px viewport), the character does **not** roam continuously. It only appears in three moments:
  1. **Greeting** — walks in once at start
  2. **Reel custody** — appears for the idle reel mechanic
  3. **Exit-intent** equivalent — when visitor scrolls back to top after deep scroll, character emerges to wave
- Between these moments, the character is hidden (off-screen, no movement, no animation cost).
- Bubbles on mobile fall back to bottom-of-screen toast as currently specced in `04-build`.

**Reduced motion**:

- If `prefers-reduced-motion: reduce` is set, the character system simplifies dramatically:
  - No wandering
  - No chase mechanic
  - Character appears at perch for greeting, then for reel, then exits
  - All transitions instant (no walk cycles, no smooth movement)
  - Bubbles still appear (text accessibility preserved)
- This is not a feature degradation — it's the version that respects the user's preference. Build it as a first-class state, not a fallback.

---

## 10. Edge cases

| Case | Behavior |
|------|----------|
| Section navigation (visitor clicks nav link to new section) | Character fades out at current position, fades in at the new section's nearest perch. Skip walk transition — sections aren't physically adjacent. |
| Modal opens (e.g., visitor clicks a project for detail) | Character sits at a perch outside the modal area. No interaction with modal content. |
| Visitor opens dev tools / window resize | Character recalculates valid perches and lanes. If at an invalid position, walks to nearest valid perch. |
| Tab loses focus (visibility hidden) | All character animation pauses. Resumes from same state when focus returns. |
| Visitor scrolls fast | Character does not get scrolled with content — it's overlaid on the viewport, not on the page. |
| Visitor uses keyboard navigation only | Character continues normal behavior. Not interactive via keyboard. Speech still triggers based on focus events. |
| Multiple reels queued (shouldn't happen given frequency cap, but defensively) | Latest reel takes priority. Earlier reel discarded if not yet shown. |
| Character "stuck" | If a state hasn't transitioned in 60s (bug), force-reset to `idling` at default perch. |
| Visitor on a long-running reel watch is interrupted by section nav | Character takes the reel, walks off, no smooth transition needed. |

---

## 11. Implementation notes for Antigravity

### Architecture suggestion

```
src/character/
├── Character.jsx              ← main component
├── CharacterContext.jsx       ← state machine, context provider
├── states/
│   ├── idling.js
│   ├── wandering.js
│   ├── curious.js
│   ├── chased.js
│   ├── ...etc
├── perches.js                 ← per-section perch coordinates
├── lanes.js                   ← walking paths between perches
├── ReelHandoff.jsx            ← reel custody integration with existing Reel.jsx
└── characterSprite.svg        ← the actual SVG character (or component)
```

### Integration with existing companion system

- **Keep**: `bubbleLibrary.js`, voice and tone rules, frequency caps from `CompanionContext.jsx`
- **Modify**: bubble render position now follows character, not cursor; `CompanionContext.jsx` gates speech on character distance
- **Replace**: cursor-trail logic (already removed) and cursor-attached bubble positioning logic
- **Add**: this entire character system as a new module

### Recommended libraries

- **framer-motion** (already installed) — handles all the smooth state transitions, posture shifts, sit/stand
- **No new dependencies** required. Pathfinding is hand-rolled (perch-to-perch, simple).

### Performance hooks

- Use `requestAnimationFrame` for the walk cycle, not `setInterval`
- Throttle cursor-position checks to 60Hz max
- Use `IntersectionObserver` to know when character would render outside viewport — pause rendering when off-screen
- Set `will-change: transform` on character group only during active movement, not always

### Testing harness

Build a debug mode (toggle via URL `?debug=character`) that:
- Shows current state in a corner overlay
- Visualizes perch positions and walking lanes
- Logs state transitions to console
- Allows manual triggering of states via keyboard shortcuts (g = greeting, c = chased, r = reel, etc.)

---

## 12. Open questions for Kash

- **Character name**: does it have one? Spec defaults to no name (consistent with v1.1's "Kash in cursor form" — though now it's "a body Kash made"). Could call it *kashlet*, *the studio kid*, *2am*, or leave nameless. [NEEDS KASH INPUT]
- **Greeting bubble specifics**: spec uses *"hey. you'll get a name and a color in a second. doesn't bite."* — confirm or replace
- **Frequency cap on chase mechanic**: how many times can a visitor "play tag" with the character before it stops engaging? Default: unlimited (it's the most fun part). Counter-argument: gets old. Spec defaults to unlimited — say if you want a cap.
- **Spawn delay**: when does the character first appear on first visit? Spec says immediately on page load. Alternative: 2s delay after page load (so visitor can orient). [Default: immediate]
- **Hall of Fame interaction**: should the character do anything special on the Hall of Fame page (stands by submissions, gestures at the submit form)? Default: no special behavior, just the normal idling/wandering. [Could be a phase-2 polish]

---

## 13. Definition of done (v1)

The character ships when all of these are true:

- [ ] Character renders correctly across all 8 sections
- [ ] All 11 behavioral states implemented and observable in debug mode
- [ ] Walking, running, sitting, standing posture transitions smooth
- [ ] Cursor-distance speech gating working correctly
- [ ] Reel custody mechanic working end-to-end with frequency cap
- [ ] Mobile adaptation: appears only at greeting + reel + exit moments
- [ ] Reduced-motion mode: simplified, all critical moments preserved
- [ ] Tab visibility pause/resume working
- [ ] No accessibility regressions (keyboard nav still works, screen readers can still navigate the site without character interfering)
- [ ] Performance: stays under 4% CPU on mid-range hardware, 60fps maintained
- [ ] All 76 bubbles in `bubbleLibrary.js` still wire correctly (positions just shifted)
- [ ] Brand book and `04-companion-spec.md` updated to reference this file as ground truth

---

## 14. What this changes downstream

- `04-companion-spec.md` — patch v1.2: bubble architecture section updated, points to this file for autonomous behavior
- `05-wow-mechanics.md` — patch: companion layer now described as "autonomous character + cursor-distance bubbles," not "cursor-attached bubbles"
- `06-visual-direction.md` — patch: character visual constraints added; reels are now objects carried by character, not ambient overlays
- `09-execution-roadmap.md` — patch: phase 4 (build) now includes character system as a major subtask; estimate adds ~5–8 days of build time vs. the prior cursor-only companion

Cowork should pick these up on next regen pass. Until then, this file is the ground truth for everything character-related.

---

*End of character spec. Ready for Antigravity.*
