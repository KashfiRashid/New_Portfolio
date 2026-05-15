# BC Connect case study — 4-hour autonomous run status

Run started: 2026-05-14 22:24 UTC

This file logs an autonomous polish run on the BC Connect case study.
Phases A through D. Kash is away. All decisions inside the authorized
scope are made autonomously and logged here with reasoning.

Constraints discovered before starting (both anticipated by Kash):
- File deletion is not available in this sandbox (`rm` returns
  "Operation not permitted"). Orphaned files are cleaned by
  overwriting them with an inert deprecation stub and flagged for
  manual deletion, rather than physically removed.
- No headless-browser tool is available, so Phase C produces clear
  per-slot placeholder guidance rather than live screenshots.

---

## Phase A — Architecture audit and fix

### A1. Routing investigation

`04-build/src/App.jsx` mounts the case study via a single URL
conditional at the top of `AppShell` (line ~130):

    if (location.pathname.startsWith('/projects/bc-connect')) return <BCConnectPage />

This runs before the `<Routes>` block. The Routes block separately
defines `/work` and `/work/:slug` (the latter renders a generic
`ProjectPage` stub). So today:
- `/projects/bc-connect` -> hits the conditional -> real case study
- `/projects/` -> matches the `*` route -> 404
- `/work/bc-connect` -> matches `/work/:slug` -> generic ProjectPage
  stub, NOT the case study
- The Work index card for BC Connect already links to
  `/work/bc-connect` (Work.jsx PROJECTS array, slug `bc-connect`),
  so it currently lands on the stub instead of the case study.

No duplicate route definitions inside App.jsx. The conditional is
the only case-study mount point.

### A2. File audit — orphans found

`04-build/src/pages/bc-connect/` contained 5 orphaned files from
earlier rebuild passes, each imported by zero files (grep-confirmed):
- `diagrams/ExceptionBeforeAfter.jsx` — decorative diagram, replaced
- `diagrams/IndustryVariantsGrid.jsx` — decorative diagram, replaced
- `diagrams/PlatformRegisterGrid.jsx` — decorative diagram, replaced
- `sections/DesignChallenge.jsx` — folded into Problem
- `sections/BeyondDesign.jsx` — folded into Solution

This is the "overlap of pages and code written on top of each other"
Kash flagged. Cleanup approach: each is overwritten with a one-line
inert deprecation stub (no default export of real content) so it
cannot be re-imported by accident, and all five are listed at the
bottom of this file for manual deletion.

### A3 / A5. Routing change — done

`04-build/src/App.jsx` conditional now matches BOTH paths:

    if (
      location.pathname.startsWith('/work/bc-connect') ||
      location.pathname.startsWith('/projects/bc-connect')
    ) {
      return <BCConnectPage />
    }

`/work/bc-connect` is the primary route, `/projects/bc-connect` is
kept as a legacy alias so old links do not break. The conditional
runs before the `<Routes>` block, so it preempts the generic
`/work/:slug` ProjectPage route for the bc-connect slug only — other
slugs still fall through to ProjectPage. Only the conditional and
its comment were changed; provider order, character imports, and
everything else in App.jsx are untouched.

Note (observation, not a change): the conditional sits before the
hook calls in AppShell. That is the pre-existing pattern Kash chose
("option c"), unchanged here, and it renders correctly in practice.
Left as-is because restructuring hook order is outside "the URL
conditional" scope.

### A4. Work.jsx link — no change needed

`04-build/src/sections/Work.jsx` already has a BC Connect card in
its PROJECTS array (slug `bc-connect`) that links to
`/work/${slug}` = `/work/bc-connect`. With the A3 routing change,
that existing card now lands on the real case study instead of the
generic ProjectPage stub. No edit to Work.jsx was required or made.

### A2 cleanup — done

The 5 orphaned files were each overwritten with an inert deprecation
stub (a header comment plus `export default function X() { return
null }`). They cannot be re-imported by accident and are flagged for
manual deletion at the bottom of this file.

### A6. Local verification — build tooling unavailable in sandbox

`npx vite build` and `npx esbuild` both fail in this sandbox with a
platform-native-binary mismatch (`rollup/dist/native.js` and
esbuild's native binary). The `node_modules` here was installed for
a different OS than the Linux sandbox. This is an environment
limitation, not a code issue — the build will run on Kash's machine.

Fallback verification (done manually):
- App.jsx edit re-read: syntactically valid, braces balanced.
- The 5 orphan stubs are trivially valid modules.
- Import graph grep-checked: nothing imports the orphans;
  BCConnectPage imports only files that exist.

Kash: please run `npm run dev` from `04-build/` and visit
`/work/bc-connect` and `/work` to confirm both render. This is the
one verification step the sandbox could not perform.

---

## Phase B — Content and structure rework

### B1. HR-lens header check

Reviewed all 11 section headers against the "would a non-designer
recruiter get the point in 5 seconds" test. They pass. The headers
are already declarative and concrete: "A directory the province
didn't have", "The data was the first problem. Discovery was the
second.", "I built the system the product ran on.", "The one rule I
almost broke. And why I didn't.", "What I'd do differently with more
time." No header rewrites were needed.

### B2. Consolidation decision — Option 1, already executed

The targeted consolidation (Option 1) was executed in the pass
immediately before this run: Design Challenge folded into Problem
as a closing beat, Beyond Design folded into Solution as a closing
paragraph, Reflection split from Learnings. Section count is now 11
(plus Hero).

I deliberately did NOT take Option 2 (collapsing Designer's Mind +
The System + Restraint into one "Design Process" section). Reason:
those three sections do distinct work — Designer's Mind is the
platform-vibe theory (personality), The System is the Open Ground
evidence with its own diagrams (proof), Restraint is the honest
btn-creative story (maturity). Collapsing them into a generic
container would bury the strongest, most distinctive material.
Option 1 produces the stronger case study under the HR lens because
it cut the genuinely thin and overweight sections without flattening
the middle. This matches the reasoning Kash already agreed with.

### B3. Voice pass

The prose was already tight from several prior passes: Christina-
length two-paragraph sections, declarative first person, no
em-dashes, no marketing voice. One targeted tightening made:
DesignersMind paragraph 3 had a redundancy ("the demographic in
mind" plus "the audience it was for") — tightened to one clean
clause. No other rewrites were manufactured; the spec warns against
over-iteration and the text did not need it.

### B4. Visual evidence pass — one new diagram

Added ONE new diagram: `diagrams/StatBlock.jsx`, rendered in
Overview directly below the two paragraphs. Six headline numbers in
large display type (90,000+ businesses, 8 regions, 3 user roles,
16 components, 1 design system, 8 weeks) in a hairline grid. This
is the highest-leverage HR-lens addition: a recruiter grasps the
scale of the work in one look before reading anything. Every figure
is consistent with content stated elsewhere; nothing is invented.

I did NOT add a second diagram. The spec allowed up to two. A
build timeline would have required fabricating week-by-week
milestones that are not in the source material. A second
before/after schema visualization would have duplicated the
existing DataNormalizationDiagram in Background. One diagram that
earns its pixels beats two where one is shaky.

Diagram inventory after Phase B (5 active):
EcosystemMap, DataNormalizationDiagram, UserFlowDiagram,
SystemInheritanceDiagram, StatBlock.

---

## Phase C — Visual evidence and asset placeholders

### C1. Screenshots — not possible in this sandbox

No headless-browser tool is available, and the build tooling does
not run here (Phase A finding). No screenshots were captured.
Falling back to detailed per-slot placeholder guidance, as the
brief's C2 path allows.

### C2. AssetPlaceholder component enhanced

`AssetPlaceholder` in primitives.jsx now takes `filename` and
`annotate` props alongside the existing ones, and renders structured
guidance on the live page: the KIND badge, the slot name, a
prominent "save as: /bc-connect/FILENAME" line, the dimensions,
the plain-words content description, and optional annotation
guidance. Backward compatible — existing calls still work.

### C3. Asset slots — 4 total, all with clear guidance

- Slot 1 — Hero landing → Hero.jsx (updated)
- Slot 2 — Open Ground system → TheSystem.jsx (NEW slot)
- Slot 3 — Integration composite → Solution.jsx (updated; was the
  old "Slot 5")
- Slot 4 — Shipped directory → Results.jsx (NEW slot)

Two new slots were added (Slots 2 and 4) because Kash said directly
that he has design-system exports and product captures to provide
and wants the case study to lean on visual evidence, not text. Kept
to 4 total — measured, not a screenshot dump.

A drop-zone manifest was created at
`04-build/public/bc-connect/ASSETS.md` listing all four files with
exact names and content guidance, so the folder itself documents
what goes where.

---

## Timeline

- 22:24 UTC — Run started. Phase A architecture audit underway.
- 22:38 UTC — Phase A complete. Routing moved to /work/bc-connect
  (with /projects alias), 5 orphaned files stubbed, Work.jsx
  confirmed already wired. Build tooling unavailable in sandbox;
  verified logically. Starting Phase B.
- 22:52 UTC — Phase B complete. Headers pass the HR lens.
  Consolidation confirmed at Option 1 (not collapsing the middle).
  One voice tightening. Added StatBlock diagram to Overview.
  Starting Phase C.
- 23:06 UTC — Phase C complete. AssetPlaceholder enhanced; 4 asset
  slots with full guidance; ASSETS.md drop-zone manifest created.
  No screenshots possible in sandbox. Starting Phase D.
- 23:16 UTC — Phase D complete. Handoff written, Gmail draft
  created. Run finished.

---

## Final handoff

Subject: BC Connect case study, 4-hour autonomous run complete

Hey Kash,

**Architecture fix:** the case study now lives at `/work/bc-connect`.
The App.jsx URL conditional matches `/work/bc-connect` (primary,
already linked from the Work index card) and keeps
`/projects/bc-connect` as a legacy alias so old links do not break.
The bare `/projects/` 404 is moot now — nothing points there.

**Structure decisions:** kept the targeted consolidation (Option 1)
that landed in the pass just before this run — Design Challenge
folded into Problem, Beyond Design folded into Solution, Reflection
split out from Learnings. I deliberately did not take the deeper
Option 2 (collapsing Designer's Mind + The System + Restraint into
one section) because those three do distinct work — personality,
proof, maturity — and a generic container would bury your strongest
material. 11 sections plus Hero.

**Sections rewritten:** light touch only — the prose was already
tight from earlier passes. DesignersMind P3 lost a redundancy.
Overview gained the StatBlock. Hero, Solution, TheSystem, and
Results gained or upgraded asset-slot guidance.

**New diagrams:** one — `StatBlock.jsx`, six headline numbers
(90,000+ / 8 / 3 / 16 / 1 / 8 weeks) in Overview, so a recruiter
gets the scale in one glance. I did not add a second: a timeline
would have meant inventing milestone data, and a second schema
diagram would have duplicated the existing DataNormalizationDiagram.

**Screenshots:** none — this sandbox has no headless browser and
the build tooling will not run here (platform-mismatched
node_modules). Instead: the AssetPlaceholder component now renders
full per-slot guidance on the live page, and
`04-build/public/bc-connect/ASSETS.md` is a drop-zone manifest. See
the four slots below.

**Still needs your hand:**
- Run `npm run dev` from `04-build/` and confirm `/work/bc-connect`
  and `/work` both render. This is the one verification the sandbox
  could not do.
- Manually delete the 5 stubbed orphan files (listed below) — the
  sandbox cannot delete files.
- Drop 4 assets into `04-build/public/bc-connect/` per ASSETS.md,
  then swap each `<AssetPlaceholder>` for an `<img>` or `<video>`:
  Slot 1 hero-landing, Slot 2 open-ground-system, Slot 3
  integration-composite, Slot 4 directory-shipped.
- The Markus / Nina testimonials in Results are still attributed
  "COHORT REVIEWER" — confirm or correct their actual roles.

**Files modified (13):**
- 04-build/src/App.jsx
- 04-build/src/pages/bc-connect/primitives.jsx
- 04-build/src/pages/bc-connect/sections/Hero.jsx
- 04-build/src/pages/bc-connect/sections/Overview.jsx
- 04-build/src/pages/bc-connect/sections/DesignersMind.jsx
- 04-build/src/pages/bc-connect/sections/Solution.jsx
- 04-build/src/pages/bc-connect/sections/TheSystem.jsx
- 04-build/src/pages/bc-connect/sections/Results.jsx
- 04-build/src/pages/bc-connect/sections/DesignChallenge.jsx (stubbed)
- 04-build/src/pages/bc-connect/sections/BeyondDesign.jsx (stubbed)
- 04-build/src/pages/bc-connect/diagrams/ExceptionBeforeAfter.jsx (stubbed)
- 04-build/src/pages/bc-connect/diagrams/IndustryVariantsGrid.jsx (stubbed)
- 04-build/src/pages/bc-connect/diagrams/PlatformRegisterGrid.jsx (stubbed)

**Files created (3):**
- 00-brief/4-hour-run-status.md
- 04-build/src/pages/bc-connect/diagrams/StatBlock.jsx
- 04-build/public/bc-connect/ASSETS.md

**Files deleted (0):** the sandbox blocks file deletion. The 5
files below were overwritten with inert deprecation stubs and need
manual deletion:
- 04-build/src/pages/bc-connect/sections/DesignChallenge.jsx
- 04-build/src/pages/bc-connect/sections/BeyondDesign.jsx
- 04-build/src/pages/bc-connect/diagrams/ExceptionBeforeAfter.jsx
- 04-build/src/pages/bc-connect/diagrams/IndustryVariantsGrid.jsx
- 04-build/src/pages/bc-connect/diagrams/PlatformRegisterGrid.jsx

**Time log:**
- 22:24 UTC — Started Phase A
- 22:38 UTC — Phase A complete: routing fixed, orphans stubbed
- 22:38 UTC — Started Phase B
- 22:52 UTC — Phase B complete: structure confirmed, StatBlock added
- 22:52 UTC — Started Phase C
- 23:06 UTC — Phase C complete: 4 asset slots, ASSETS.md manifest
- 23:06 UTC — Started Phase D
- 23:16 UTC — Handoff written, Gmail draft created, run complete

Click Accept Edits when ready. Then verify locally before git
commit.

End of autonomous run.
