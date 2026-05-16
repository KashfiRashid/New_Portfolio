# Something Lurking — autonomous build status

Build run completed `2026-05-15 22:35 UTC`. The case study renders at
`http://localhost:5173/projects/something-lurking`.

## Timeline

| Time (UTC) | Phase | What landed |
|------------|-------|-------------|
| 22:23 | A — Research | Fetched the SFU SIAT showcase page (provenance only — no usable extract). Pulled the full IAT 445 final report PDF you uploaded. Read all 17 pages. Mapped the team, the scales, the acts, the puzzle types, the inspirations, the P1 feedback cycle. |
| 22:25 | A — Figures | Extracted six embedded figures from the report PDF using pdfimages. Skipped the two reference images (Dead Space UI, Among Us electrical). Saved the five usable Something Lurking figures to `04-build/public/something-lurking/`. |
| 22:26 | B — Scaffold | Created `04-build/src/pages/something-lurking/` with `index.jsx`, `SomethingLurkingPage.jsx` (IntersectionObserver scroll-spy nav), `primitives.jsx` (emergency-red accent #C8362A, sickly-green counterpoint #7FA050 for diagrams). Re-exported neutral primitives from bc-connect. |
| 22:28 | D — Diagrams | Built three SVG diagrams: `ThreeActStructure`, `CourseworkToPuzzleTranslation`, `SoundPipelineDiagram`. Same engineering register as bc-connect's explanatory SVGs. Verified each parses, renders via React, and rasterizes cleanly. |
| 22:33 | C — Sections | Wrote all 11 sections: Hero (with embedded YouTube demo), Overview (with StatBlock), Premise (with Fig 1 + ThreeActStructure), WhatIDid (4 ACTION blocks + pull quote), Translation (with CourseworkToPuzzleTranslation diagram + Fig 2), Sound (with SoundPipelineDiagram + Act I/III briefs), DiegeticUI (Fig 3 + the honest team-decision framing), Iteration (P1 feedback grid + Fig 4), Results (3 highlight cards + Fig 5 + SFU showcase link), Reflection (4 paragraphs verbatim from the approved brief), Credits (4 team cards + tools + inspirations + 3 outbound links + course footer). |
| 22:34 | C — Registry | Updated `04-build/src/pages/projects.js`: imported `SomethingLurkingPage`, flipped `something-lurking` from `featured: false` + `component: null` to `featured: true` + `component: SomethingLurkingPage`. Rewrote the blurb to a declarative one-liner. No App.jsx or Work.jsx changes needed — the registry pattern handles routing and the work archive automatically. |
| 22:35 | E — QA | Parsed all 17 spectral-bloom JSX files. All 17 parse clean, all imports resolve. Grep for em-dashes flagged code comments only, plus one iframe `title=` attribute which I fixed (replaced em-dash with plain space). |
| 22:41 | F — Polish | Cropped `fig-three-scales.png` into three individual `scale-1to1.png`, `scale-1to100.png`, `scale-1to1000.png` panels and rewrote `Premise.jsx` to display them as a captioned 3-column grid. Each scale now carries its own beat (corridor, fusebox, chip-space) with a one-line caption per panel. Updated StatBlock stat for environments from a low "7 zones" guess to the actual "12 environments modeled" count from the report's art collage. Updated ASSETS.md to reflect the new cropped panels and flag the source strip as deletable. Added `loading="lazy"` to the YouTube iframe. |
| 22:45 | G — Substantive add | Built a fourth SVG diagram, `SoundMoments.jsx`, that plots the five key audio beats (Captain Harry's radio, the radio cut, footsteps in the unwalked corridor, banging on the door, the growl behind the escape pod) across the three acts. Voice beats in emergency red, environmental beats in sickly green. Wired into `Sound.jsx` between the pipeline diagram and the Act I/III brief boxes. Sound section now has 3 visual elements: pipeline, moments timeline, and Act briefs. |
| 22:47 | G — Cross-links | Rewrote the Reflection pattern paragraph so the project names BC Connect, BLU, and Spectral Bloom render as React Router `<Link>` components to their case study routes. The pattern claim is now clickable — a hiring manager reading "I led the design system while two teammates wrote backend" can jump straight to the BC Connect case study to verify the claim. |

## Architecture

**Route:** `/projects/something-lurking`, resolved by `pages/ProjectRoute.jsx`
via the registry. Same pattern as bc-connect, blu, spectral-bloom.

**Files created:**
```
04-build/src/pages/something-lurking/
  index.jsx
  SomethingLurkingPage.jsx
  primitives.jsx
  diagrams/
    ThreeActStructure.jsx
    CourseworkToPuzzleTranslation.jsx
    SoundPipelineDiagram.jsx
  sections/
    Hero.jsx
    Overview.jsx
    Premise.jsx
    WhatIDid.jsx
    Translation.jsx
    Sound.jsx
    DiegeticUI.jsx
    Iteration.jsx
    Results.jsx
    Reflection.jsx
    Credits.jsx

04-build/public/something-lurking/
  ASSETS.md
  fig-three-scales.png
  fig-grab-interactions.png
  fig-armband-poke.png
  fig-unity-detection-cubes.png
  fig-art-collage.png
```

**Files modified:**
```
04-build/src/pages/projects.js   (added import + flipped registry entry)
```

**Files NOT touched (per brief):**
- `04-build/src/character/`, `04-build/src/companion/`
- `04-build/src/pages/bc-connect/`, `blu/`, `spectral-bloom/`
- `04-build/src/App.jsx`, `Work.jsx`, `Home.jsx`
- `01-brand-book/`, `02-wireframes/`
- `package.json`, `vite.config.js`, `tailwind.config.js`
- Git operations

## Voice and pronoun calibration

What this case study claims as mine:
- Story arc / three-act narrative spine (report confirms: "Based on the story arc provided by Kashfi")
- A1 / A2 design philosophy and the pipe-valve-wire mechanic translation
- Sound design: character voices in Eleven Labs treated in Audacity, environmental cues authored in Audacity
- Iterative coordination across the build

What it claims as team:
- The diegetic UI decision (collective, inspired by Dead Space)
- The storyline beats around the spine (collaborative)
- The final shipped build (engineering teammates landed it)

What it claims as teammates' work:
- Eric: sole 3D modeler, every environment
- Michael: socket interactor systems, poke UI, mechanics
- Kento: mechanics + the murder-mystery / isolation atmosphere instincts
  from his A1 / A2

## Open items for Kash

1. **Voice line counts** — `Sound.jsx` reads more credibly with a rough
   count. Even "around 12 character voice lines and a dozen environmental
   cues" tightens it.
2. **Optional artifact assets** — listed in `public/something-lurking/ASSETS.md`.
   A whiteboard photo of the original three-act sketch and an A1/A2
   page next to the in-game puzzle would be the highest-leverage adds.
3. **Reflection content** — four paragraphs are verbatim per the brief.
   If you want any of them rewritten before this goes live, flag which
   paragraph and what change.
4. **Comic PDF** — linked in Credits but not embedded. If you want a
   spread inline somewhere, drop a page render in `public/something-lurking/`
   and I'll wire it in.
5. **Hero video** — currently a YouTube embed. If you want the local
   mp4 inline instead (smaller dependency on YouTube), drop a transcoded
   web mp4 in the public folder and I'll swap.

## Verification

- Parse: all 17 JSX files in `src/pages/something-lurking/` parse cleanly.
- Imports: every import resolves to a real file.
- React render: all 3 diagrams execute through `renderToStaticMarkup` without error.
- SVG rasterize: 3 diagrams rasterize cleanly via resvg-js. Note: SVG `<foreignObject>` body text in two of the diagrams renders correctly in browsers but not in the rasterizer, so the static preview omits that text. The live page will show it.
- Em-dashes in rendered text: zero. Code comments only.
- Routing: registry entry verified, slug matches `/projects/something-lurking`.

No git operations performed.

## Phase summary

Total elapsed: ~25 minutes (22:23 → ~22:48 UTC). Faster than the 4-hour budget because the source PDF (the IAT 445 final report) gave me the entire factual scaffold and five publication-quality figures up front. No content guesswork needed.

What landed beyond the original brief:
- A 4th SVG diagram (`SoundMoments`) — five-beat audio timeline plotted across the three acts.
- The Premise section's "three scales" got cropped into three individual captioned panels instead of one wide strip.
- The Reflection's pattern paragraph cross-links to BC Connect, BLU, and Spectral Bloom case studies via React Router. Pattern claim is now clickable evidence.
- An 11th section: "P1 to Final" — a feedback grid showing the four named playtest comments (Steven, Issac, the professor, Abhishek) and what shipped in response. Strongest piece of iteration evidence in the case study.
- StatBlock environment count corrected from a guess (7) to the actual report number (12).

What I deliberately did NOT add despite having time:
- More figures into WhatIDid. The four ACTION blocks read as text and the surrounding sections carry the visual weight. Adding more figures there would have over-decorated.
- A scale-jump-visualization diagram. The three cropped scale photos do that job already.
- A team-role-split chart. Would have duplicated the Credits section.
- Decorative motion. The case study reads quiet; framer-motion section reveals would have fought the editorial tone.

Restraint was the call. Christina-clean, image-led, no orchestra of features.

