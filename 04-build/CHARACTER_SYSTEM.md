# Character System — Reference

A complete reference for the autonomous pixel-art companion on kashfirashid.com.
Written as a handoff document: another developer or AI agent should be able to
read this and work on the character confidently.

> Scope: this covers **the character** — the pixel-art sprite companion that
> walks around the page. The **custom cursor** (the dot that follows the mouse)
> is a separate entity rendered by the same `Companion.jsx` file; it has a short
> section at the end but is not the focus here.

---

## 1. What the character is

A small pixel-art person that lives on the site as an autonomous companion. It
is *not* scripted frame-by-frame — it runs a **state machine** driven by a
`requestAnimationFrame` loop. Each frame, the active state's `tick()` decides
where the character moves and what it does. It reacts to the cursor, the page
section, idle time, and direct interaction (you can pick it up and throw it).

Design register: a quiet "2am studio" companion. Voice is lowercase, dry, and
self-aware. It is powered by scripted content (not an LLM at runtime).

---

## 2. File map

All paths under `04-build/src/`.

| File | Role |
|---|---|
| `character/CharacterContext.jsx` | The brain. State machine host, rAF loop, spawn logic, all triggers, the React context provider. |
| `character/states.js` | All 15 state modules (`enter`/`tick`/`exit`), the activity catalog, movement helpers. |
| `character/Character.jsx` | The rendered component. Sprite wrapper, speech bubble, mug overlay, glow, reel handoff, the project-mode vanish effect. |
| `character/CharacterSprite.jsx` | Pixel-sprite renderer — posture → PNG mapping, cross-fade, walk-cycle, idle bob, mirroring. |
| `character/CharacterBubble.jsx` | Speech bubble rendered above the character's head. |
| `character/perches.js` | Valid rest positions ("perches") per page section. |
| `character/reelPools.js` | Reel-clip selection for the three contextual reel triggers. |
| `character/useReelTriggers.js` | Hook with the three reel detectors (bottom-of-page, section-dwell, deep-idle). |
| `character/ReelHandoff.jsx` | Renders the reel video clip while the character has "custody" of it. |
| `character/throwQuips.js` | One-liners spoken when you release the character after a grab. |
| `character/debug/CharacterDebug.jsx` | Debug overlay (`?debug=character`). |
| `companion/Companion.jsx` | Mounts `<Character/>`, the custom cursor, and the mobile toast fallback. |
| `companion/bubbleLibrary.js` | The 60-bubble companion script (entry/hover/click/scroll/idle/exit/returning). |
| `companion/idlePool.js` | Idle content cycle — quips, facts, reel surfaces — for when the visitor is AFK. |

---

## 3. How a frame works

`CharacterContext` owns a mutable `ctxRef` object passed to every state. The rAF
loop, each frame:

1. Syncs live inputs into `ctx` — cursor position/speed, idle state, current
   page section, elapsed time.
2. Runs **global guards**: *chase detection* (only from `idling`/`wandering`/
   `curious`) and a *stuck guard* (force back to `idling` after 60s in one
   state; exempt: `inactive`, `grabbed`, `project_pinned`).
3. Calls the active state's `tick(ctx, dt)`. If it returns a state name, the
   machine transitions (runs the old state's `exit`, the new state's `enter`).
4. Syncs `ctx` back to React state so the component re-renders.

`ctx.position` is the character's **feet** (sprite top = `position.y - size`).
Sprite size: 96px desktop, 72px mobile.

---

## 4. The state machine

`inactive` is the pre-spawn pseudo-state. The 15 real states:

| State | Entered from / trigger | What it does | Exits to |
|---|---|---|---|
| `entering` | spawn (non-reduced-motion) | Walks in from a screen edge to the settle perch. | `greeting` |
| `greeting` | `entering`, or spawn (reduced motion) | Waves for 1.2s. | `idling` |
| `idling` | most states | Stands at a perch. Micro-fidgets toward the cursor. Runs the **activity layer** (§6). | `curious`, `wandering` |
| `wandering` | `idling` (timer 30–60s) | Walks to a different perch (avoids perches within 200px of the cursor), with a mid-walk pause. | `idling` |
| `curious` | `idling` (cursor still within 250px for 3s) | Approaches to ~80px from the cursor, looks 1.5s, decides (50% speaks "...you good?"). | `idling` ⚠️ see §11 |
| `chased` | global (fast cursor moving toward it, within 150px) | Runs to the screen corner farthest from the cursor. | `hiding` |
| `hiding` | `chased` | Tucks against a screen edge for 5–10s, speaks "give me a sec." | `idling` |
| `summoning_reel` | reel trigger fires (§8) | Walks to the lower-right anchor, sits, pauses. | `watching_reel` |
| `watching_reel` | `summoning_reel` | Sits watching the reel clip; occasional head turns; speaks "from last tuesday." | `taking_reel` |
| `taking_reel` | `watching_reel` (reel ends / 20s / visitor active) | Stands, carries the reel off-screen, gone 3–5s, respawns at a random perch. | `idling` |
| `showcasing` | hover a Work/Home project card 2s with the cursor still | Walks to a perch near the card, does a hop + scale + warm glow flourish, acknowledges. | `idling` |
| `grabbed` | mousedown on the character (desktop) | Follows the cursor with a position spring + a rotation pendulum (it swings). | `thrown` (on release) |
| `thrown` | `grabbed` release | ~300ms of release inertia, rotation damps to zero. | `running_away` |
| `running_away` | `thrown` | Runs at 2× walk speed to the perch farthest from the drop point. | `idling` |
| `project_pinned` | entering a `/projects/*` route (§9) | Pinned-corner mode with a teleport quirk. Autonomous behavior is off. | `idling` (on leaving the project page) |

---

## 5. Positioning — perches

The character only rests at **perches** — named viewport-relative points
defined per section in `perches.js`. Most sit at the screen edges; some are
flagged `isOccluded` (behind content — used for the `peek_reveal` activity).

Sections with their own perch sets: `home`, `voice`, `eye`, `work`, `process`,
`people`, `origin`, `hall-of-fame`. `sectionFromPath()` maps a route to one of
these; anything unrecognized (including `/projects/*`) falls back to `home`.

Perches are stored as percentages and resolved to pixels at render time, so they
track viewport resizes. Helpers: `pickRandomPerch`, `nearestPerch`,
`nearestPerchTo` (DOMRect), `farthestPerchFrom`, `getSettlePerch`.

---

## 6. The activity layer

While `idling`, the character periodically performs an **activity** (first one
8–15s after idling starts, then on a rolling timer). Catalog (`states.js`):

| Activity | Duration | Notes |
|---|---|---|
| `laptop_session` | 10–15s | Sits and types (subtle head-bob). The most common. |
| `peek_reveal` | 3–5s | Only at `isOccluded` perches — peeks out from behind content. |
| `stretch` | 1.5–2s | Quick stretch. |
| `contemplation` | 4–7s | Sits still. Stillness *is* the animation. |
| `beverage` | 4–6s | Holds a mug (rendered as an inline-SVG overlay) and sips. |

Selection is **weighted random** with three modifiers: no-repeat (won't pick the
same activity twice running), **sequence bonuses** (e.g. after a long laptop
session it favors `stretch`/`beverage`), and **section bias** (reflective
sections favor `contemplation`; work sections favor `laptop_session`; people
sections favor `beverage`).

---

## 7. Spawn, grab/throw

**Spawn timing.** First-time visitor: spawns ~400ms after onboarding completes.
Returning visitor: 2s after page load. Reduced motion skips the walk-in (appears
at a perch and waves). Landing directly on a `/projects/*` route spawns straight
into `project_pinned`.

**Grab / throw / run-away.** On desktop, `mousedown` on the character picks it
up (`grabbed`). It follows the cursor on a spring with a rotation pendulum, so it
swings as you drag. Release (`mouseup` anywhere) → `thrown` (brief inertia) →
`running_away` (bolts to the farthest perch). On release it speaks a line from
`throwQuips.js`. Grab is **suppressed** during: `summoning_reel`, `watching_reel`,
`taking_reel`, `showcasing`, `chased`, `hiding`, `project_pinned`. Disabled on
mobile.

---

## 8. Reels (the custody mechanic)

A "reel" is a short video clip the character fetches and shows in the lower-right
of the viewport. Three contextual triggers (`useReelTriggers.js`):

- **bottom-of-page** — visitor scrolled to the end of a page.
- **section-dwell** — ~40s spent in one section.
- **deep-idle** — ~90s+ idle.

When one fires, `pickReel()` chooses a clip (per-trigger pools live in
`reelPools.js` — currently placeholder, falling back to the `idlePool` reel
clips), and the character transitions `summoning_reel → watching_reel →
taking_reel`. Each clip shows at most once per session. Reels are **disabled in
project-page mode**.

---

## 9. Project-page mode (`project_pinned`)

On any `/projects/*` route the character drops all autonomous behavior and runs
the `project_pinned` state instead. Phases (`ctx.stateData.project.phase`):

- `bl` — pinned bottom-left, counting down to the next trip (random 32–60s).
- `warp_to_tr` — the Goku vanish effect plays; at the end it teleports top-right.
- `tr` — pinned top-right, waiting for a hover.
- `warp_to_bl` — vanish effect plays; teleports back to bottom-left.

Hovering the character while it is parked top-right sends it warping home.
Wandering, reels, grab, and showcase are all suppressed in this mode; speech
bubbles still work.

**Vanish frames.** The teleport plays `/public/character/vanish-1.png …
vanish-N.png` via `<VanishEffect>` in `Character.jsx`. Set the frame count in
`PROJECT_VANISH_FRAME_COUNT` (`states.js`). Until the real frames exist, a
placeholder "poof" plays so the teleport still reads. Tuning lives in `states.js`:
`PROJECT_VANISH_DURATION`, `PROJECT_TRIP_MIN/MAX`, and `projectCorners()` for the
exact anchor points.

---

## 10. The texts

All character speech is **scripted** (not generated at runtime). Voice across
every pool: lowercase, dry, self-aware, specific, "2am studio." Three sources:

### 10a. `companion/bubbleLibrary.js` — 60 bubbles

The main companion script, keyed by ID, grouped into 7 trigger categories:

| Prefix | Trigger | Count | Example |
|---|---|---|---|
| `E` | Entry (page/onboarding) | 7 | "the line's not a typo. read it again." |
| `H` | Hover (specific elements) | ~20 | "BLU. proudest of the sound. listen at 0:42." |
| `C` | Click | ~12 | "this one's longer. take your time." |
| `S` | Scroll milestones | 7 | "a few more below." |
| `I` | Idle | 8 | "no rush. keep reading." |
| `X` | Exit-intent | 6 | "leaving? cool. tell a friend, or don't." |
| `R` | Returning visitor | 6 | "you're back. the site's a little different than last time." |

Each `H` bubble is tied to an element via a `context` string and fired by
`bubbleId` on hover. `{name}` and `{color}` placeholders are substituted with the
visitor's chosen identity via `renderBubbleText()`. Display rules: max 5–8
bubbles per session, 8s cooldown between bubbles, one bubble per element ID per
session.

### 10b. `companion/idlePool.js` — AFK content

Cycles every ~8s while the visitor is idle; any movement stops it. Three types:

- **quips** (15) — observational one-liners, e.g. "you stopped moving. either
  you're reading or you fell asleep."
- **facts** (12) — real things about Kash, e.g. "random fact: i moved from dhaka
  to delta in 2022. still adjusting to the rain."
- **reels** (5) — surface a reel clip, e.g. "hold on. let me play you something
  from BLU." (`clip: 'blu-0-42'`).

Reels get 3× selection weight; the first idle content of a session is always a
reel if one is unseen.

### 10c. `character/throwQuips.js` — 7 throw-release lines

Spoken when the visitor drops the character after a grab. Verbatim:

1. "okay okay i can walk on my own"
2. "that was… a choice."
3. "the conductor does NOT throw the orchestra."
4. "i'm freelance gravity-wise. let's not."
5. "you treat pixels like stress balls and i respect the honesty."
6. "if this is how you lead standups we should talk"
7. "noted for the retrospective"

### 10d. Lines hardcoded in `states.js`

A few are spoken directly by states: `curious` says **"...you good?"** (50%
chance), `hiding` says **"give me a sec."**, `watching_reel` says **"from last
tuesday."**

---

## 11. Known issue — character types "off-grid"

After the `curious` state, the character stops ~80px from wherever the cursor
was — possibly mid-page — and goes straight to `idling`, which then starts a
`laptop_session` activity *at that off-grid spot*. The `curious` code comment
promises a "walk back" that was never implemented (it does `return 'idling'`).

**Recommended fix:** have `curious` return via `wandering` instead of `idling`,
so the character ambles back to a real perch before any activity starts. One
small change in `states.js`.

---

## 12. Sprites & assets

`CharacterSprite.jsx` maps postures → PNG files in `/public/character/`. Files
the character needs: `idle.png`, `walk-a.png`, `walk-b.png`, `sit.png`,
`wave.png`, `sit-laptop.png`, `peek.png`, `stretch.png`. (`running` reuses
`walk-a`; `contemplating` reuses `sit`; `holding_mug`/`showcasing` reuse `idle`.)
All are pixel-art PNGs rendered with `image-rendering: pixelated`; a missing file
404s gracefully to `idle.png`. The mug is an inline SVG. Project mode also needs
`vanish-1.png … vanish-N.png` (see §9).

---

## 13. Tuning constants

| Constant | File | Meaning |
|---|---|---|
| `WALK_SPEED` / `RUN_SPEED` | `states.js` | Movement speeds (px/s). |
| `CHASE_SPEED_THRESHOLD` / `CHASE_DISTANCE_THRESHOLD` | `CharacterContext.jsx` | When a fast cursor triggers `chased`. |
| `BUBBLE_DURATION` | `CharacterContext.jsx` | How long a speech bubble stays up. |
| `STUCK_GUARD_SECONDS` | `CharacterContext.jsx` | Force back to `idling` after this long in one state. |
| `PROJECT_VANISH_FRAME_COUNT` / `PROJECT_VANISH_DURATION` | `states.js` | Goku teleport frame count and warp length. |
| `PROJECT_TRIP_MIN` / `PROJECT_TRIP_MAX` | `states.js` | Seconds between auto-teleports in project mode. |

---

## 14. The custom cursor (separate entity)

`Companion.jsx` also renders a **custom cursor** — the OS pointer is hidden
site-wide (`cursor: none`) and replaced with a dot in the visitor's color.
Position is pixel-locked 1:1 (no spring, no trail). It morphs by context — a dot
by default, an outline ring over links/buttons, a labelled pill over project
links and over media tagged with `data-cursor-label`. It squishes + ripples on
click and breathes gently when the mouse rests. This is independent of the
character state machine.
