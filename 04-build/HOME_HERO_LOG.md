# HomeHero iteration log

Each entry: ISO timestamp · one-line reason.

Scope guarded throughout: changes contained to `src/components/HomeHero.jsx`
and this log. No touch to `App.jsx`, `Character*`, `Companion*`, routing, or
configs. The time engine (`homeHeroSchedule.js`) and the scene-fallback note
are preserved verbatim.

## iter 01 · 2026-05-17 10:42 UTC
Structural pass: added `HOME_HERO_PIN_VH = 2.0` constant; outer section is now
`PIN_VH * 100vh`; inner `sticky top-0 h-screen` frame holds the scene + content.
`scrollYProgress` reused: `contentY` rides `0vh → −110vh` over `[0.05, 0.82]`,
`sceneScale` and `vignetteOpacity` re-armed to fire only in `[0.82, 1]` so the
existing dark scale+vignette release lands at the unpin moment.

## iter 02 · 2026-05-17 10:42 UTC
Clock hierarchy: split engine string at first space — large prominent time
(`font-mono text-3xl md:text-5xl font-medium`, tabular-nums, slight negative
letter-spacing) with `PT · Delta, BC` as a faint mono caption beneath. Reads
as a real wall clock; the right-side scene status stays caption-scale so
nothing competes.

## iter 03 · 2026-05-17 10:42 UTC
Photo slot removed from render: deleted the `flex items-end gap-5` row and
the `<PhotoPlaceholder />` motion wrapper. Function definition kept dormant
behind an eslint disable, in case a real photo ships later. Name block now
stands alone.

## iter 04 · 2026-05-17 10:42 UTC
Single centered identity column: name + identity + voice + status + fallback
note share `mx-auto max-w-2xl` so they ride one aligned measure. "my name is"
label, h1, and paragraphs are left-edge consistent inside the centered column.

## iter 05 · 2026-05-17 10:44 UTC
Clock weight pass: bumped to `text-4xl md:text-5xl lg:text-[3.5rem]
font-semibold`, flattened letter-spacing (tabular-nums alone holds the
width), and pushed `PDT · Delta, BC` from `text-faint` to `text-muted` so the
two tiers read as one wall-clock object rather than time + footnote.

## iter 06 · 2026-05-17 10:46 UTC
Scroll-band smoothing: contentY input is now a 3-point range `[0, 0.06,
0.82]` mapped to `[0vh, 0vh, -110vh]`. Gives the column a brief lingering
beat at the top before the rise, so the eye lands on the name before the
parallax begins. contentOpacity widened to `[0.74, 0.86]` for a softer
handoff into the existing scale+vignette release.

## iter 07 · 2026-05-17 10:48 UTC
Reduced-motion accommodation: when `prefers-reduced-motion: reduce` is on,
section height collapses to `100svh` so the reader doesn't pay the pin's
extra scroll cost for animation they won't see. All transforms already gate
to no-op values for that branch; this just keeps the layout commensurate.

## iter 08 · 2026-05-17 10:50 UTC
Component doc-comment rewritten: now describes the welcome-act pin
mechanics, the unchanged time engine + fallback note, the layer order
inside the sticky, and the reduced-motion branch. No behavior change —
this is just so the next person opening the file isn't blindsided.

## iter 09 · 2026-05-17 12:44 UTC
"Try that once": extended the pin so the held scene stays behind the
entire homepage (cards, HoF, Featured Work, "shipped" line) and the dark
scale+vignette release fires at the footer instead of after the hero.
`HomeHero` now accepts `children`; section height becomes content-driven
when children are passed; the identity content is an absolute overlay on
the first viewport that scrolls away naturally; the rest of Home flows
after the sticky and rises up over the held video. `Home.jsx` wraps all
existing content as children of `HomeHero` (additive — no existing
elements were removed). Release armed at `HOME_HERO_RELEASE_START = 0.88`,
which lands the vignette fully opaque right before the footer enters.

## iter 16 · 2026-05-17 — darken middle, push bottom to ~95% for footer blend
Kash, on screenshots: "letters at the middle aren't visible — overlay
needs to be darker" and "transition feels off to footer." The 22%–62%
range was too light in the upper-middle (where the name sits) and
ended too far short of the footer's solid surface-deep at the bottom.

Scrim is now a 3-stop gradient with the mid stop pulled up to 45% of
the height — gets dark fast in the upper-middle so off-white text
reads cleanly on the busy room, then continues toward near-opaque at
the bottom so the held video meets the footer with no visible seam.

  SCRIM_TOP    = rgba(15, 17, 18, 0.28)
  SCRIM_MID    = rgba(15, 17, 18, 0.58)    @ 45%
  SCRIM_BOTTOM = rgba(15, 17, 18, 0.95)    @ 100%

Approximate wash by viewport position with this curve:
  - clock zone (top 0–15%):  ~28–37%   → clock + status legible
  - kicker / name (35–50%):  ~50–58%   → name reads on the wash
  - lines (55–75%):          ~62–80%   → body text high contrast
  - bottom edge (90–100%):   ~88–95%   → meets surface-deep

At ~95% the held video pixels are 95% of the way to surface-deep, so
the seam between the section's last frame and the footer's first
frame is essentially invisible. The remaining 5% is closed by the
existing scale + vignette release at the bottom of the section.

## iter 15 · 2026-05-17 — constant gradient scrim, no fade
Kash: "why does it light up when I scroll? I want the dark theme to
stay. Gradual gradient — lighter at top, darker at bottom. 20%–60%."

The previous scrim faded to zero past the first viewport so the held
video would read "as itself" behind the editorial. That fade is what
caused the room to brighten on scroll — exactly what Kash didn't want.

Fix:
- Scrim simplified from a 3-gradient stack (vertical + horizontal +
  flat floor) to a single vertical gradient: `SCRIM_TOP ~22%` →
  `SCRIM_BOTTOM ~62%` of surface-deep.
- `scrimOpacity` MotionValue removed. The scrim layer is back to a
  plain `<div>` — no motion, no fade. The wash stays on the video for
  the entire pin.
- `SCRIM_MID`, `SCRIM_LEFT`, `SCRIM_FADE` constants removed (no longer
  used).
- The existing scale + vignette release at `HOME_HERO_RELEASE_START`
  still handles the final dim into the footer.

Result: room reads as "2am studio" the whole time. Lighter at top so
the clock + status are crisp; darker at bottom so the held video
anchors toward surface-deep, blending into the footer that follows.

## iter 14 · 2026-05-17 — full-page pin back, sticky clock kept
Kash confirmed: video should be pinned in the background behind the
entire homepage; footer at the bottom as usual. The earlier revert
(iter 12) was off — this restores the full-page pin and keeps the
sticky clock/status from iter 13.

- `HomeHero` accepts `children` again. Section height becomes content-
  driven when children are passed (`minHeight: 100svh`), so the sticky
  100vh frame inside pins the scene for the entire scroll. Standalone
  fallback (no children) still uses `HOME_HERO_PIN_VH * 100vh`.
- Sticky clock + scene status header preserved from iter 13: pinned at
  the top of the sticky for the entire page scroll, gradient backdrop
  + hairline, fades out through the scale + vignette release at the
  bottom so the chrome doesn't bleed into the footer.
- Identity column (centered name + lines + scroll cue) translates and
  fades by `IDENTITY_FADE_PX = 700` of raw scroll — so by ~700px the
  column is off-screen and the cards rise into place over the held
  video.
- Scrim wrapped in motion.div with `scrimOpacity` (full 0–280px, fades
  to 0 by 700px). Beyond the first viewport the held video reads as
  itself behind the editorial — no dark band, no veil.
- Sticky clock uses inline `initial/animate` (y-only) instead of the
  fadeUp helper, because fadeUp's `initial: { opacity: 0 }` would
  collide with the `stickyHeaderOpacity` MotionValue.
- Home.jsx wraps all existing content as children of `<HomeHero>…
  </HomeHero>`. Footer stays where it was (rendered by App.jsx after
  the route), so it appears at the bottom as expected.

Tunable constants in one place at the top of `HomeHero.jsx`:
- `HOME_HERO_PIN_VH = 2.0` — standalone-mode height multiplier
- `HOME_HERO_RELEASE_START = 0.88` — when the scale + vignette fires
- `IDENTITY_FADE_PX = 700` — when the name/lines clear the viewport

## iter 13 · 2026-05-17 — pin the clock + status to the top of the hero
Kash: "pin the hero image, make the clock + scene status sticky on top,
arrange them creatively so they don't overlap."

Rearrangement inside the sticky hero frame:
- Clock + scene status extracted from the contentY-translating motion.div
  into a separate absolute container at the top of the sticky (z-20).
  Because they're not inside the translating layer, they STAY at the top
  of the viewport for the whole welcome-act scroll. Clock keeps its
  Heading-1 mono size (~44–52px); scene status keeps its caption register
  on the right.
- A vertical gradient backdrop (78% → 45% → 0% surface-deep) sits behind
  the header so the centered column can slide cleanly underneath as it
  scrolls up — no harsh overlap of identity text and clock digits.
- A faint hairline at the bottom of the header zone (10% off-white,
  feathered at the ends) quietly defines it as a chrome element.
- Centered identity column + scroll cue stay inside the translating
  motion.div with the same contentY + contentOpacity curves. They slide
  under the pinned header (z-20 above z-10) and the gradient backdrop
  handles the visual handoff.
- Scene status is clamped to `max-w-[14rem]` so longer status strings
  ("now: heads-down at the desk.") don't push back into the clock's
  area on narrow tablet widths.
- Sticky header lives inside the sticky frame, so it naturally scrolls
  away when the hero section ends — clock doesn't bleed into the
  editorial below, the hero is still the prologue.

## iter 12 · 2026-05-17 — REVERT iter 09 + iter 11
Kash clarified: the "weird line" wasn't the scrim — it was the empty
gap between the top bar ("kashfi rashid · ↓ scroll for more") and the
editorial headline ("Ambitious but executioneery."). The full-page pin
and the scrim refactor were both misreads on my part.

Reverted:
- Iter 09 (full-page pin variant) — removed `children` prop, removed
  `HOME_HERO_RELEASE_START`, restored `HOME_HERO_PIN_VH * 100vh` section
  height with the reduced-motion `100svh` collapse, moved identity back
  inside the sticky frame, restored `contentY`/`contentOpacity`
  translations, restored `RELEASE_START = 0.82` for the scale + vignette.
- Iter 11 (scrim softening) — restored original heavy scrim values
  (top 35% → mid 55% → bottom 88%, plus left-bias 85% and 22% floor),
  removed the `scrimOpacity` motion value, removed `scrollY`
  destructuring, scrim is back to a plain `<div>` (not motion).
- Home.jsx — removed the `<HomeHero>…</HomeHero>` wrap; HomeHero is
  standalone again, the rest of Home flows as siblings.

Kept (still align with what Kash asked for earlier):
- PST clock label normalization
- Brand-book typography pass (Hero/H1/Body/Small/Caption scale)
- Centered identity column (`mx-auto max-w-2xl`)
- Photo placeholder removed from render

Then addressed the actual ask: trimmed the editorial section's top
padding (`py-24 md:py-32` → `pt-4 pb-24 md:pt-6 md:pb-32`) and tightened
the top bar's `pb-4` → `pb-1`. The headline now sits right under the
top bar, no perceived empty 'div' between them.

## iter 11 · 2026-05-17 (screenshot review) — kill the dark band
Kash spotted a visible horizontal "weird line" between the hero zone
and the editorial — a band of darkness across the middle of the
viewport. Diagnosis: the legibility scrim was calibrated for a 100vh
hero (heavy bottom-dark at 88% + left-bias + 22% floor for lower-left
text contrast). With the pin now extending through the entire homepage,
that heavy bottom sat behind the editorial cards forever, reading as
a persistent dark horizontal band.

Fix:
- Scrim simplified to a single gentle vertical gradient (top 30% → mid
  32% → bottom 55%). Removed the left-side darker gradient and the 22%
  baseline floor — both were for the old layout's lower-left identity.
- Scrim wrapped in `motion.div` with `opacity: scrimOpacity` tied to
  `scrollY` (raw px, not progress). Full scrim from 0–200px, fades
  through 200–700px (~one viewport), and is zero past that. Once the
  identity overlay has scrolled off, the held video reads as itself
  behind the editorial sections — no more dark band.
- `useScroll` destructuring now also pulls `scrollY` alongside
  `scrollYProgress`.

## iter 10 · 2026-05-17 16:29 UTC
PST label + typography calibration to the brand book.
- Clock label normalized to "PST" at the display layer (regex on the
  engine's output: `PDT|PST|PT` → `PST`). `homeHeroSchedule.js` still
  emits whatever `Intl.DateTimeFormat` returns; the rewrite is purely
  visual so the actual displayed time stays accurate for Vancouver.
- Type scale aligned with `01-brand-book/06-visual-direction.md`:
  - clock time → `text-[2.75rem] md:text-[3rem] lg:text-[3.25rem]`
    (~44 → 52px, Heading-1 register; was previously creeping toward
    hero-scale at 56px and competing with the name)
  - clock meta → `text-[11px] md:text-xs` (was 10–11px; below caption
    floor)
  - "my name is" kicker → unchanged (12px caption)
  - name h1 → `leading-[1.05]` per spec (was 0.95, which was too tight
    and clipped descenders at large sizes)
  - identity line → `text-base md:text-lg leading-[1.55] max-w-prose`
    (was `text-lg md:text-xl`; that drifted above body register)
  - voice line → `text-base leading-[1.55] max-w-prose` (down from
    `text-base md:text-lg`)
  - status line → `text-sm leading-[1.5]` (Small register; was
    `text-xs md:text-sm`, mixed scales)
  - fallback note → `text-[11px] md:text-xs` (Caption register; was
    10px)
  - scroll cue → `text-[11px] md:text-xs` (was 10px)
- All sizes now match the published scale: Hero 64–80, H1 44–52, Body
  16, Small 14, Caption 12. Restraint principle held.

## state at handoff
- `HomeHero` mode:
  - `children` passed → section is content-driven (`min-h-screen` + sticky
    + children flow). Pin extends through the editorial; release at end.
  - no children → falls back to old behavior: section is
    `HOME_HERO_PIN_VH * 100vh` (or `100svh` under reduced motion); same
    release.
- Release fraction: `HOME_HERO_RELEASE_START = 0.88` — last 12% of section
  scrollYProgress maps `sceneScale 1→1.06` and `vignetteOpacity 0→1`.
- Identity overlay: absolute on the section, first viewport only, scrolls
  with the document (no transform). Pointer-events disabled on the outer
  wrapper, restored on the clock row, identity column, and scroll cue.
- Clock: `font-mono text-4xl md:text-5xl lg:text-[3.5rem] font-semibold`,
  tabular-nums; `PT · Delta, BC` meta in muted mono caption underneath.
- Photo slot: not rendered. `PhotoPlaceholder()` left dormant under an
  eslint-disable so it's recoverable.
- Identity content (name + identity + voice + status + fallback note) is
  in one centered column at `max-w-2xl mx-auto`.
- Time engine (`homeHeroSchedule.js`): untouched. Honest scene-fallback
  note: untouched.
- App.jsx / Character / Companion / routing / configs: untouched.
- `Home.jsx`: touched — wrapped existing content inside `<HomeHero>…
  </HomeHero>` (additive only; no existing elements removed).
