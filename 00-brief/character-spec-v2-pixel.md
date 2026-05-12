# character-spec-v2-pixel.md

> **This file replaces the visual implementation from `character-spec.md` v1.0, `character-spec-patch-showcase.md`, and `character-spec-patch-activities.md`.**
>
> **What changes**: visual rendering pivots from SVG silhouette to pixel-art sprite. Size increases. Animation approach shifts from path-morphing to sprite-frame-swapping.
>
> **What stays the same**: every behavioral state, the showcasing logic, the 5 idle activities, the reel custody choreography, bubble distance gating, mobile rules, reduced-motion rules, performance budget, definition-of-done items 1–11 from main spec and 12–18 from activities patch. The behavior architecture is correct and stays. Only the visual layer changes.
>
> **For Antigravity**: do NOT throw out CharacterContext.jsx, the state machine, perches.js, or ReelHandoff.jsx. Those work. You're replacing CharacterSprite.jsx and tuning sizes.

---

## 1. Why this changes

V1 shipped a 36px dark silhouette. Kash flagged it as too small to see and not what he asked for. Looking back at the conversation, Kash kept showing pixel-art references (Claude photobooth puppy, samurai frog video) — the silhouette direction was Claude's call, not Kash's. Pivoting to honor what Kash asked for.

The 2am studio brand still applies — it shows up through palette, character outfit, and behavior (working at a laptop, late-night beverage, peeking from behind cards). It does NOT need to come through aesthetic minimalism. Pixel-art with a warm dark palette IS the 2am studio rendered as a character.

Reference points:
- **Stardew Valley NPCs** — scale, refinement, warm palette discipline
- **Pokemon Gen 1–3 sprites** — pixel character readability, recognizable silhouette
- **Claude photobooth puppy card** — front-facing characterful sprite

---

## 2. Visual constraints

| Property | v1 (silhouette) | v2 (pixel-art) |
|----------|----------------|----------------|
| Size desktop | 36px tall | **80–96px tall** |
| Size mobile | 28px tall | **60–72px tall** |
| Style | Dark silhouette + warm accent | **16–32 bit pixel art** |
| Detail | None (no facial features) | **Recognizable face, hoodie, hair** |
| Color | 2 colors max (dark + accent) | **Multi-color but disciplined palette (see below)** |
| Animation | Path morphing | **Sprite frame swap** |
| Source | Code-generated SVG paths | **External PNG sprites with alpha** |

### Pixel discipline (non-negotiable)

- `image-rendering: pixelated` MUST be applied to character render. No browser smoothing.
- Position character on whole-pixel coordinates only (round x/y, no fractional). Sub-pixel positioning destroys pixel-art crispness.
- All sprites must share identical pixel grid alignment.
- No CSS scaling beyond integer multiples (1x, 2x, 3x). If 80px target and sprite is 64px, render at exactly 80px (close to 1.25x — acceptable since pixelated rendering compensates) — but prefer integer multiples where possible.

### Palette — 2am studio applied to pixel-art

| Element | Color guidance |
|---------|----------------|
| Skin | Warm tones matching Kash's reference photo |
| Hair | Match reference photo |
| Hoodie / outerwear | Deep gray, charcoal, or muted color — NOT bright primary |
| Pants | Dark navy, charcoal, or simple jeans |
| Highlight | Warm amber/cream catching the face (monitor glow) |
| Outline | None or very dark — character should read by silhouette + color blocks |

Avoid: bright saturated cartoon colors, neon, kawaii pastels. The character should feel grounded in the same palette as the rest of the site.

---

## 3. Sprite assets needed

Six sprites total. Generated in Gemini using the prompt provided in chat. Stored in `/public/character/` directory.

| Filename | Purpose | Used by states |
|----------|---------|----------------|
| `idle.png` | Standing front-facing, neutral pose | `idling`, `entering` (default), `wandering` (rest position), `curious` (target) |
| `walk-a.png` | Standing, left leg forward | `entering`, `wandering`, `summoning_reel`, `taking_reel` (frame 1) |
| `walk-b.png` | Standing, right leg forward | All walking states (frame 2 — alternates with walk-a every 200ms) |
| `sit.png` | Seated cross-legged or in chair, neutral | `idling` activity baseline (when seated), `watching_reel` |
| `sit-laptop.png` | Seated with laptop on lap, hands at keys | `idling` activity `laptop_session` |
| `peek.png` | Upper body only — head and shoulders visible | `idling` activity `peek_reveal` |
| `wave.png` | Standing, one arm raised in greeting | `greeting` |
| `stretch.png` | Standing, both arms overhead | `idling` activity `stretch` |

**Iteration notes for Gemini generation:**
- Generate `idle.png` first (the base — get it right before iterating)
- Once base is approved, generate the others one at a time — each prompt references "same character as previous" to maintain consistency
- If a sprite looks off-character, regenerate before moving on
- Anti-aliasing artifacts on edges are common in image gen — use a tool like aseprite or photopea to clean up the alpha channel if needed

**Mug and beverage steam**: render in code (CSS/SVG), not as part of the sprite. Position the mug as an absolutely-positioned element next to the character at the appropriate offset during `beverage` activity. This avoids needing a 7th sprite for the rare beverage activity.

---

## 4. Animation approach (changed from v1)

### Sprite swap, not path morph

Each state/activity has a designated sprite. Transitions between sprites are **cross-fades over 200–300ms**, NOT path morphing. Pixel art doesn't morph — it swaps.

```jsx
// Pseudocode for CharacterSprite.jsx
<motion.div
  key={activeSprite}             // forces remount on sprite change → triggers fade
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.25 }}
>
  <img
    src={`/character/${activeSprite}.png`}
    style={{ imageRendering: 'pixelated' }}
    width={spriteSize}
    height={spriteSize * 1.5}
  />
</motion.div>
```

### Within-state motion

The base sprite gets a subtle **vertical bob** during idle and walking states — sin wave, ±2px, period matching state (faster during walking, slower during idle). This adds life without needing per-frame animation.

For walking specifically, ALSO alternate `walk-a.png` and `walk-b.png` every 200ms during active translation. This is the only state with multi-frame animation in v1; everything else is single-sprite-with-bob.

### Direction (facing left vs right)

`transform: scaleX(-1)` flips the sprite. Same image asset, mirrored at render time. No need to author left-facing variants.

### State-to-sprite mapping

| State | Sprite | Notes |
|-------|--------|-------|
| `entering` | walk-a/walk-b alternating | Walking in from edge |
| `greeting` | wave.png | Held for 1.2s |
| `idling` (base) | idle.png | With subtle bob |
| `idling` (laptop_session activity) | sit-laptop.png | Seated, no bob — typing rhythm via head bob (1px) |
| `idling` (peek_reveal activity) | peek.png | Reveal animation: y translate from +30 to 0 |
| `idling` (stretch activity) | stretch.png | Held 1.5s, scale-y bounce 1→1.06→1 |
| `idling` (contemplation activity) | sit.png | Held 4–7s, completely still |
| `idling` (beverage activity) | sit.png OR idle.png | + animated mug element overlay |
| `wandering` | walk-a/walk-b alternating | |
| `curious` | walk-a/walk-b at half speed | |
| `chased` | walk-a/walk-b at fast cadence (~150ms) | |
| `hiding` | peek.png | |
| `summoning_reel` | walk-a/walk-b | |
| `watching_reel` | sit.png | |
| `taking_reel` | walk-a/walk-b + reel attached as child element | |
| `showcasing` | idle.png | + flourish via y/scale variants (existing showcase posture logic) |

---

## 5. Implementation changes for Antigravity

### Throw out
- All SVG path posture variants in `CharacterSprite.jsx`
- Anything attempting to morph between postures via path data
- The 36px sizing

### Replace with
- `<img>` tag pointing to active sprite
- `image-rendering: pixelated` CSS
- Sprite-swap based on state-to-sprite mapping (Section 4)
- 80–96px height on desktop, 60–72px on mobile
- Cross-fade transitions on sprite change (200–300ms)
- Vertical bob animation on wrapper element (sin wave)
- Walk frame alternation during translation states

### Keep unchanged
- `CharacterContext.jsx` — entire state machine
- `perches.js` — perch coordinates and `isOccluded` flags
- `ReelHandoff.jsx` — reel custody logic
- `CharacterBubble.jsx` — bubble system (text shows above sprite, same as before)
- All activity selection logic in `idling` state
- Showcasing trigger logic
- Mobile, reduced-motion, tab-visibility logic

### New files
- `/public/character/idle.png`
- `/public/character/walk-a.png`
- `/public/character/walk-b.png`
- `/public/character/sit.png`
- `/public/character/sit-laptop.png`
- `/public/character/peek.png`
- `/public/character/wave.png`
- `/public/character/stretch.png`

(Kash will provide via Gemini generation.)

### Mug rendering for beverage activity

Don't bake mug into the sprite. Render as a separate small SVG/img element, absolutely positioned next to the character during `beverage` activity. Position offset: ~16px right of character center, ~24px from top. Add 3 small steam particle dots above the mug, animated rising and fading every 800ms.

---

## 6. Behavior — UNCHANGED from v1 + patches

All eleven states (`entering`, `greeting`, `idling`, `wandering`, `curious`, `chased`, `hiding`, `speaking`, `summoning_reel`, `watching_reel`, `taking_reel`) work as specified in `character-spec.md` v1 §3.

The `showcasing` state from `character-spec-patch-showcase.md` works as specified.

The five idle activities (`laptop_session`, `peek_reveal`, `stretch`, `contemplation`, `beverage`) from `character-spec-patch-activities.md` work as specified.

Only the visual rendering of these states changes — the trigger logic, transition rules, and durations stay.

---

## 7. Definition of done — v2 additions

In addition to all DoD items from v1 + patches:

- [ ] Character renders at 80–96px on desktop, clearly visible (not the 36px tiny version)
- [ ] All 8 sprite files load correctly from `/public/character/`
- [ ] `image-rendering: pixelated` applied — sprites visibly pixelated, no smoothing
- [ ] Whole-pixel positioning enforced (no sub-pixel blur)
- [ ] Sprite swap cross-fades smoothly (200–300ms)
- [ ] Walk cycle alternates `walk-a` / `walk-b` every 200ms during translation states
- [ ] Direction mirroring works (`scaleX(-1)` flips sprite for facing change)
- [ ] Vertical bob animation runs on idle/walking states (±2px sin wave)
- [ ] Mug renders as separate element during `beverage` activity, with steam particles
- [ ] Showcase flourish works on the pixel sprite (8px hop + scale + glow accent)
- [ ] Character looks recognizably like Kash (verify against reference photo)

---

## 8. Quick reference for Antigravity prompt

If Antigravity needs a single-line summary of what this changes:

*"Replace the silhouette CharacterSprite implementation with a sprite-swap system using PNG files. Increase character size to 80–96px desktop. Apply `image-rendering: pixelated`. Map each state and activity to a sprite per Section 4. Keep CharacterContext, perches, ReelHandoff, and all behavioral logic unchanged."*

---

## 9. What changes downstream

- `06-visual-direction.md` — needs a v2 patch to reflect pixel-art aesthetic for the character (silhouette guidance was wrong; pixel character coexists with the 2am studio environment)
- `00-overview.md` — minor: the wow stack section mentions "minimal silhouette" which should now read "pixel-art character"
- Visitor pixel-card concept (deferred from earlier in chat) — now thematically *more* aligned. Both use pixel-art. Phase-2 work.

Cowork should sync these on next regen. Not blocking.

---

*End of v2. Drop in `/00-brief/`. Antigravity reads this as the visual authority — v1 main spec + patches remain authoritative for behavior only.*
