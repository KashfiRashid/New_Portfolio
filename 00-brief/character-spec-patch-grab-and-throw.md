# character-spec — patch v1.4 (grab, sway, throw, run-away)

> **Drop in `/00-brief/` alongside the other specs.**
> Adds the "pick the character up and throw it" interaction. When the visitor mouse-downs on the character, they can drag it around (with sway physics). When they release, the character runs away to a far perch.
>
> **What this changes**: adds 3 new behavioral states (`grabbed`, `thrown`, `running_away`), input handlers, sway physics, post-release momentum. Builds on top of existing state machine — doesn't break any existing state.
>
> **What stays the same**: all 11 existing states, sprite system, activities, reel custody, bubble logic. New states slot in alongside the existing ones.

---

## What this adds

A direct-manipulation layer for the character. The visitor can:

1. **Click and hold** the character → enters `grabbed` state
2. **Drag it around** → character follows cursor with realistic sway physics (pendulum lag, spring catch-up)
3. **Release** → character is briefly `thrown` (momentum continues), then transitions to `running_away` (sprints to a perch far from where they were dropped)
4. **Recovery** → after running away, normal behavior resumes

This is the wow-mechanic equivalent of Microsoft Office's old "throw Clippy off the screen" gesture, but in a way that feels intentional and on-brand. The character has visible reactions: it sways while held, runs away after release, then recovers.

---

## New states

### `grabbed`

| Property | Spec |
|---|---|
| **Entered when** | `mousedown` on character sprite, AND current state is not in the suppression list (see below) |
| **Posture** | `idle` (no walk/sit/etc.) — the character is being held, not doing anything |
| **Position** | Follows cursor with spring physics + sway (see Section "Sway physics") |
| **Z-index** | Bumped to **60** (above bubbles, modals, everything except cursor) for the duration |
| **Exits when** | `mouseup` anywhere (releases from anywhere, not just on the character) |
| **Cancels** | All other behaviors — pauses activity, suppresses bubble triggers, suppresses reel triggers |

### `thrown`

| Property | Spec |
|---|---|
| **Entered when** | `mouseup` exits the `grabbed` state |
| **Duration** | ~300ms — brief inertia moment |
| **Posture** | `idle` |
| **Position** | Continues moving with the cursor's release velocity, decelerating |
| **Rotation** | Continues swaying briefly, damping out |
| **Z-index** | Falls back to 40 (normal character z-index) |
| **Exits to** | `running_away` (automatic after duration) |

### `running_away`

| Property | Spec |
|---|---|
| **Entered when** | `thrown` completes |
| **Posture** | `running` (uses walk-a/walk-b sprites at fast cadence — 150ms alternation) |
| **Movement** | Walks at 2× normal speed to the **farthest perch from the drop point** |
| **Duration** | Until arrived at far perch |
| **Sound** | None for now (could add a "scampering" SFX later) |
| **Exits to** | `idling` at the destination perch |
| **Behavior** | Suppresses all bubbles and activities until arrived |

---

## Suppression list (states that CANNOT be interrupted by grab)

While the character is in any of these states, `mousedown` on the character is IGNORED (cursor remains in default mode, no grab fires):

- `summoning_reel`
- `watching_reel`
- `taking_reel`
- `showcasing`
- `entering` (the initial walk-on — let it complete)
- `chased` (already in motion — don't double-up)
- `hiding`

In all other states (`idling`, `wandering`, `curious`, `greeting`, `running_away`, `thrown` itself), the character IS grabbable.

---

## Sway physics

While held, the character should sway as if hanging from the cursor — a small pendulum lag plus a position spring.

### Position spring

The character's rendered position is NOT exactly at the cursor — it lags slightly behind with a spring catch-up.

```js
// Each rAF tick while grabbed:
const targetX = cursorX;
const targetY = cursorY - 40;  // hang offset (cursor at character's "top")

const dx = targetX - charX;
const dy = targetY - charY;

velocityX += dx * SPRING_STRENGTH;       // SPRING_STRENGTH ≈ 0.15
velocityY += dy * SPRING_STRENGTH;

velocityX *= DAMPING;                     // DAMPING ≈ 0.75
velocityY *= DAMPING;

charX += velocityX;
charY += velocityY;
```

Result: the character "catches up" to the cursor over a couple of frames, never quite snapping to it. Fast cursor motion creates a longer lag; slow motion settles in tight.

### Rotation pendulum (the sway)

The sprite rotates slightly based on horizontal cursor velocity — pendulum-like lag.

```js
// Each rAF tick while grabbed:
const cursorVelocityX = cursorX - prevCursorX;  // delta this frame

// Target rotation: opposite direction of motion (lag effect)
const targetRotation = -cursorVelocityX * ROTATION_FACTOR;  // ROTATION_FACTOR ≈ 0.3
const clampedTarget = clamp(targetRotation, -30, 30);  // max ±30deg

// Spring toward target rotation
rotationVelocity += (clampedTarget - rotation) * ROT_SPRING;  // ROT_SPRING ≈ 0.2
rotationVelocity *= ROT_DAMPING;                                // ROT_DAMPING ≈ 0.80
rotation += rotationVelocity;
```

Apply as a CSS transform on the character wrapper: `transform: rotate(${rotation}deg)`.

The character settles back to 0° rotation when the cursor stops moving. Quick flicks produce visible sway oscillation; smooth motion produces gentle lag.

### Whole-pixel concession

For sway, you CAN allow sub-pixel positioning (no `Math.round`) — the position is in motion the whole time, so the eye doesn't see sub-pixel blur. Once `thrown` ends and the character transitions to `running_away`, return to whole-pixel positioning.

---

## Input handling

### Mousedown on character

```js
// In Character.jsx — add to the wrapper or sprite element
const handleMouseDown = (e) => {
  e.preventDefault();
  const suppressed = SUPPRESSION_LIST.includes(ctx.state);
  if (suppressed) return;

  document.body.style.cursor = 'grabbing';
  transitionTo('grabbed', {
    grabOffsetX: e.clientX - ctx.position.x,
    grabOffsetY: e.clientY - ctx.position.y,
    initialCursorX: e.clientX,
    initialCursorY: e.clientY,
  });
};
```

### Mousemove during grabbed (rAF tick)

Handled inside the `grabbed` state's tick function. The cursor position is read from `ctx.cursorPos` (already tracked elsewhere). Apply the sway physics on each frame.

### Mouseup anywhere

```js
useEffect(() => {
  if (ctx.state !== 'grabbed') return;

  const handleMouseUp = (e) => {
    document.body.style.cursor = '';
    // Capture release velocity (already computed in physics)
    transitionTo('thrown', {
      releaseVelocityX: ctx.swayVelocityX,
      releaseVelocityY: ctx.swayVelocityY,
      releaseRotation: ctx.swayRotation,
      dropPoint: { x: ctx.position.x, y: ctx.position.y },
    });
  };

  window.addEventListener('mouseup', handleMouseUp);
  return () => window.removeEventListener('mouseup', handleMouseUp);
}, [ctx.state]);
```

### Cursor style hint

When the visitor hovers the character (and the character is grabbable), change cursor to `grab`. When actively grabbed, change to `grabbing`.

```jsx
// On the character wrapper element
<motion.div
  style={{
    cursor: ctx.state === 'grabbed' ? 'grabbing' : 'grab',
    pointerEvents: SUPPRESSION_LIST.includes(ctx.state) ? 'none' : 'auto',
  }}
  onMouseDown={handleMouseDown}
>
```

---

## Thrown state — release momentum

When `mouseup` fires, the character carries the cursor's release velocity for ~300ms before transitioning to `running_away`.

```js
// Inside thrown state tick
ctx.position.x += ctx.releaseVelocityX;
ctx.position.y += ctx.releaseVelocityY;

ctx.releaseVelocityX *= 0.85;  // deceleration
ctx.releaseVelocityY *= 0.85;

ctx.rotation = ctx.releaseRotation * (1 - ctx.timeInState / 300);  // damp to 0

if (ctx.timeInState > 300) return 'running_away';
```

This brief inertia is what makes the throw feel real — the character doesn't stop instantly at the release point.

---

## Running away — destination selection

When `running_away` begins, pick the perch farthest from the drop point.

```js
function farthestPerchFrom(dropPoint, perches) {
  let best = perches[0], bestDist = 0;
  for (const p of perches) {
    const d = Math.hypot(p.x - dropPoint.x, p.y - dropPoint.y);
    if (d > bestDist) { bestDist = d; best = p; }
  }
  return best;
}
```

Use this to set `ctx.stateData.targetPerch`. The state then walks toward it at 2× normal speed using `running` posture (which maps to walk-a/walk-b sprites alternating fast).

When arrived, transition to `idling`.

---

## Visual reactions

While grabbed:
- Cursor changes to `grabbing`
- Character sways naturally (no facial expression change — the chibi sprite stays the same)
- Z-index bumped to 60 (above bubbles, below cursor)
- Subtle drop shadow under the character to suggest "lift" (optional polish — `filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3))` while grabbed)

While running away:
- Walking sprites alternate at fast cadence (150ms)
- Brief facing direction change at start (toward destination)
- No bubbles fire (suppressed)

---

## Edge cases

| Case | Behavior |
|---|---|
| Visitor drags character outside viewport bounds | Constrain to viewport: `charX = clamp(charX, 0, window.innerWidth - charSize)`. Same for Y. |
| Visitor releases far off-screen | Drop point is clamped, run-away triggers normally |
| Visitor grabs, then page scrolls | Character should detach from page scroll (use viewport-fixed positioning while grabbed) — already true since character uses `position: fixed` |
| Visitor mousedowns on character but moves cursor away before release | Standard grab behavior — character follows cursor wherever it goes |
| Visitor right-clicks instead of left-clicks | Ignore — only respond to primary mouse button |
| Visitor grabs during scroll | Scroll continues, character follows cursor — both work simultaneously |

---

## Mobile + reduced motion

### Mobile

**Skip for v1.** Touch-and-drag introduces complexity (distinguishing tap from drag from scroll, multi-touch handling). The existing mobile rule already suppresses most character behavior. Reconsider for v2 if there's demand.

### Reduced motion

- Sway physics OFF — character follows cursor 1:1 with no spring/rotation
- Thrown state OFF — instant transition to running_away
- Running away animation still happens but without sprite alternation (just static idle sprite at the destination)

---

## Definition of done

- [ ] `grabbed`, `thrown`, `running_away` states added to states.js
- [ ] All three states observable in debug mode (add hotkey `X` for "grab simulation" that synthetically triggers the grab → thrown → running_away sequence at the cursor position)
- [ ] mousedown on character enters `grabbed` (when not in suppression list)
- [ ] mousedown ignored when state is in suppression list (cursor stays default)
- [ ] Cursor changes to `grab` on hover, `grabbing` while held
- [ ] Sway physics implemented: position spring + rotation pendulum, parameters per spec
- [ ] Sub-pixel positioning allowed during grab (no Math.round)
- [ ] Whole-pixel positioning resumed after `thrown` ends
- [ ] mouseup transitions to `thrown` with captured release velocity
- [ ] `thrown` carries momentum ~300ms then exits to `running_away`
- [ ] `running_away` runs at 2× speed to farthest perch from drop point
- [ ] Z-index bumped to 60 during grabbed/thrown, returns to 40 in running_away
- [ ] Drop shadow effect during grabbed (optional polish)
- [ ] Viewport-bound constraint applied to character position during grab
- [ ] All bubble and activity triggers suppressed during grabbed/thrown/running_away
- [ ] Mobile: drag entirely skipped (touchstart/touchmove handlers either absent or pre-empted by mobile rule)
- [ ] Reduced-motion: sway physics disabled, instant transitions

---

## What this changes downstream

- `CharacterSprite.jsx` — needs to accept a rotation prop for the sway (apply via CSS transform on the sprite wrapper)
- `Character.jsx` — adds mousedown handler, cursor style management, optional drop shadow during grab
- `states.js` — three new state modules
- `perches.js` — add `farthestPerchFrom(point, perches)` helper alongside existing `nearestPerchTo`
- `CharacterContext.jsx` — adds grab state tracking refs (swayVelocity, swayRotation, dropPoint, etc.)
- `CharacterDebug.jsx` — adds rotation display, hotkey `X` for synthetic grab test

No changes to: bubbles, activities, sprites, sections, the reel system.

---

## Why this is worth adding

It's the moment when a visitor goes from "this is a cool portfolio with a character" to "wait, I can pick him up?" That's the difference between *seeing* the character and *interacting* with it. The recovery (running away) gives the character a beat of personality — they have a reaction to being thrown, which makes them feel like an actual entity rather than a UI element.

It's also the kind of moment people screenshot and share, which is one of the goals.

---

*End of patch. Drop in `/00-brief/`.*
