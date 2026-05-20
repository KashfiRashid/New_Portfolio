# Vanish Effect — Status Log

CSS-driven Goku Instant Transmission teleport for the character's
`project_pinned` mode. One keyframe set, played forward to vanish and
reversed to reappear.

Files in scope: `04-build/src/character/Character.jsx`,
`04-build/src/character/states.js` (constants only),
`04-build/src/character/vanishEffect.css`, plus a TESTING-ONLY trigger in
`04-build/src/character/CharacterContext.jsx` (authorized).

---

## Iterations

**2026-05-20 — Phase A — scaffold complete.**
Created `vanishEffect.css` with the `goku-vanish` keyframe set (0% solid →
33% warming glow → 66% dissolving → 100% gone) and the `goku-particle`
spark keyframes. Vanish = forward playback, reappear = same keyframes
`animation-direction: reverse` — no second animation. Both use
`animation-fill-mode: both` so the seam carries no flash.

**2026-05-20 — Phase A — Character.jsx rewired.**
Removed the `vanish-N.png` image-loader `VanishEffect` entirely. The sprite
now stays MOUNTED through a warp; the teleport is a CSS class
(`goku-warp-vanish` / `goku-warp-reappear`) on a wrapper div around the
sprite. Added `VanishParticles` (12 sparks desktop / 6 mobile, randomized
direction + 0-300ms stagger). `reappearing` is derived from the phase
transition during render (not an effect) so vanish → reappear hands over
with no opacity-1 flicker at the invisible midpoint.

**2026-05-20 — Phase A — states.js.**
Removed `PROJECT_VANISH_FRAME_COUNT` (no file imports it now).
`PROJECT_VANISH_DURATION` kept at 0.5s — it is one warp phase = the vanish
half; the reappear runs the same span at the start of the destination
phase. Full teleport ≈ 1000ms, matching the brief.

**2026-05-20 — Phase A — test trigger.**
Added a TESTING-ONLY `forceProjectWarp` + a `T` keydown listener in
CharacterContext.jsx. Pressing `T` on a `/projects/*` page fast-forwards
the teleport timer (or sets `hoverBack` if parked top-right). Inert off
project pages. Clearly commented for removal.

**Phase A — reduced motion / mobile.**
Reduced motion: classes + particles gated off, teleport snaps (the state
already collapses the warp to instant). Mobile: particle count 12 → 6.

**2026-05-20 — Direction change — frame-based, per Kash.**
Kash staged `vanish-1.png`..`vanish-4.png` in `public/character/` and
confirmed all four frames should be used. Switched off the pure-CSS
approach: `Character.jsx` now swaps the normal sprite for `<VanishFrames>`,
which steps the 4 PNG frames across the warp (1→2→3→4 vanish, 4→3→2→1
reappear) with an opacity fade so the character is fully gone at the
invisible midpoint. The CSS keyframe approach + particle layer were
dropped; `vanishEffect.css` is now unused (sandbox blocked its deletion —
delete manually). `states.js` re-adds `PROJECT_VANISH_FRAME_COUNT = 4`.

**2026-05-20 — Frame assets optimized.**
The four staged frames were 2048×2048, ~13.5 MB total (vanish-3 / vanish-4
were 5.5 MB each — unshippable). Resized to 256×256: now ~316 KB total
(~43× smaller). Note: frame 2 still has a white background — Kash to
re-export it transparent; until then it flashes a white box mid-sequence.

**2026-05-20 — Hybrid + scope corrections, per Kash.**
- T-key trigger DECLINED — reverted entirely out of CharacterContext;
  the protected-files rule holds. Dev iteration now uses option (a):
  PROJECT_TRIP_MIN/MAX temporarily 3/5s in states.js so the teleport
  autoplays. RESTORE to 32/60 in Phase F.
- Hybrid restored — the CSS glow + spark particles are back, tied
  together with the frame art in <VanishEffect>: frame `<img>` carries
  the character, the `goku-warp-*` class adds the opacity dissolve +
  warm glow, <VanishParticles> adds drifting sparks. `vanishEffect.css`
  re-created.
- Mirroring — the vanish frames now `scaleX`-mirror to the character's
  facing, so a teleport to the top-right corner faces left, into the page.

---

## Open — Phases B–E (tuning, watch the autoplay teleport on a project page)

- B: opacity curve / glow intensity — does it read as a deliberate
  teleport, not a fade?
- C: particle count, travel distance, color, fade curve — and whether the
  CSS sparks fight the sparks already in the frame art.
- D: confirm reduced-motion + mobile in the running build.
- E: the midpoint seam — verify the position swap lands on the opacity-0
  frame with zero flicker.

## Phase F — before shipping

- Restore PROJECT_TRIP_MIN/MAX to 32 / 60 in states.js.
- Delete the now-unused vanishEffect... (n/a — vanishEffect.css IS used by
  the hybrid; nothing to delete).
