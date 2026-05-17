# DocuMentor — autonomous build status

The case study renders at `/projects/documentor`. Built in one
session, no git operations performed.

## Angle

Stated once, in Checking My Bias: *the risk of designing for your
own problem is designing only for yourself.* Carried implicitly
elsewhere (Problem I Lived, What I Did action 01, Reflection
paragraph 1). The 45 interviews across 12+ countries are framed
as a bias test, not generic discovery. Every number traces to
the live case study at kashfirashid.com/documentor.html. Nothing
embellished.

If the reframe is sharper than your actual state of mind at the
time, the version in Reflection paragraph 1 ("I started with my
own frustration. I did not let it become the brief.") is the
load-bearing claim. Swap it for "I wanted to be sure the problem
was shared, not only mine" and the rest of the case study still
holds. The facts do not change either way.

## Architecture

Route: `/projects/documentor` (matches the other five case
studies). Registered in `pages/projects.js` with `featured: true`
and `name: 'DocuMentor'` (capital M honouring the brand spelling).
Removed from `OLDER_WORK`. Auto-renders on Home Featured Work
and the Work archive without touching App.jsx or Work.jsx.

## Sections (11)

| Section | Words (est) | Anchor |
|---------|-------------|--------|
| Hero | 30 | title + subtitle + meta + App.png |
| Overview | 43 | one paragraph |
| The Problem I Lived | 47 | first-person, two challenge images |
| Checking My Bias | 67 | two diagrams + PainPoints.png |
| What I Did | 147 | 4 ACTION blocks + pull quote |
| The Micro-Step Model | 30 | two diagrams + 2 app shots |
| The Build | 139 | 4 rows of paired images (sketches → final UI) |
| Features in Motion | 63 | 4 lazy-loaded videos |
| Results | 47 | StatBlock + testimonial |
| Reflection | 103 | three growth-voice paragraphs |
| Credits | 81 | three team cards |
| **Total** | **~800** | ~3.5–4 minute read |

The 800 figure is the upper bound counting all string literals
including alt text and contribution lines. Actual on-screen
reading copy is closer to 500 words. Reading time around
2.5 minutes at standard pace.

## Diagrams (4 explanatory SVGs)

| Diagram | Section | What it argues |
|---------|---------|----------------|
| `BiasCheckDiagram` | Checking My Bias | n=1 to evidenced design, four nodes left to right; first node dashed and tentative, last node solid and confident |
| `ResearchSynthesis` | Checking My Bias | 45 deterministic dots funneling into three pain points |
| `CognitiveOverloadContrast` | Micro-Step Model | Two phone icons side by side; left dense, right one task + progress bar; density gap is the argument |
| `MicroStepDecomposition` | Micro-Step Model | One large process block fans out into six numbered steps with progress underneath |

All four are stroke-and-label only, no color-as-meaning, mobile
readable. Rendered to PNG and visually verified during the build.

## Assets

Hot-linked from `kashfirashid.com/media/documentor/` and
`kashfirashid.com/media/videos/`. The sandbox proxy blocks
direct curl of binary files, so this build uses the same pattern
that already works on Parpro Research: load via remote URL, with
an `onError` handler that swaps to a small `asset pending` note
if a file is missing.

To make the case study self-contained, download these to
`04-build/public/documentor/` on a real machine and swap the
URLs to local paths in `primitives.jsx` constants:

Images (14):
- App.png, Challenges_1.png, Challenges_2.png, PainPoints.png
- sketch_1.png, sketch_2.png
- 1.png, 3.png, 4.png, 5.png, 6.png, 7.png
- App_Stacked.png, Feature-Highlight.png

Videos (4):
- Documentor_Onboarding.mp4
- Documentor_Progress_Tracker.mp4
- Documentor_Step_by_Step.mp4
- Documentor_Language_Preferences.mp4

## Voice

No em-dashes in rendered text. Declarative past tense, first
person for Kashfi's work, "we" for shared work with Kate and
Mariyam, named teammates in Credits. The Reflection stays close
to the live portfolio reflection voice and adds one growth beat
about bias-checking.

## Theme color

Deep indigo `#5E62E0` primary, bright `#8B8FF5` variant. Reads
scholarly and digital, fits "guide for navigating uncertainty."
Distinct from bc-connect green, blu blue, spectral-bloom magenta,
something-lurking red, parpro coral. Selection accent, side-nav
active state, accent kickers, gradient background all use it.

## Files created

```
04-build/src/pages/documentor/
  index.jsx
  DocumentorPage.jsx
  primitives.jsx
  diagrams/
    BiasCheckDiagram.jsx
    ResearchSynthesis.jsx
    CognitiveOverloadContrast.jsx
    MicroStepDecomposition.jsx
  sections/
    Hero.jsx
    Overview.jsx
    Problem.jsx
    BiasCheck.jsx
    WhatIDid.jsx
    MicroStep.jsx
    Build.jsx
    Features.jsx
    Results.jsx
    Reflection.jsx
    Credits.jsx
```

Files modified:
- `04-build/src/pages/projects.js` (added DocumentorPage import + registry entry, removed documentor-app from OLDER_WORK, fixed an existing duplicate ParproConsultingPage import)

## Verification

- All 18 documentor JSX files + projects.js parse clean (babel)
- All imports resolve (every named import maps to a real export)
- Zero null-byte contamination (the Write-truncation bug that hit
  Parpro did not happen here because everything was written via
  shell heredoc from the start)
- All four diagrams rendered to PNG and visually verified
- Em-dash grep: zero hits in rendered text

## Open items

1. Confirm the bias-check angle rings true (or send a softer
   version if it overclaims your state of mind at the time)
2. Optionally download the 14 images + 4 videos locally to make
   the case study self-contained; swap to local URLs in
   `primitives.jsx` constants when you do
3. Verify at `http://localhost:5173/projects/documentor` before
   git commit

No git operations performed.
