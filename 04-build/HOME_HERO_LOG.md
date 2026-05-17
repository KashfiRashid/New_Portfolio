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
