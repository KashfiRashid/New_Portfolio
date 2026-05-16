# Parpro Consulting — correction run status

Two passes completed. The first pass (earlier today) followed a brief
that foregrounded A/B testing as the case study's differentiator. That
was wrong: your live portfolio at `kashfirashid.com/parpro_consulting.html`
does not mention any test and explicitly names usability testing as
something you would do with more time. The second pass (this one)
stripped every A/B reference and rebuilt the case study around the
truthful spine: research, design, ship under a 3-day constraint, with
the validation gap named in plain language.

The case study now renders at `/projects/parpro-consulting`. No git
operations performed.

## What was removed in this pass

Every A/B testing reference, traced and removed:

| Where | What |
|-------|------|
| `Hero.jsx` | Subtitle line "one redesign we A/B tested before we shipped it"; Stack row stopped including "A/B testing" |
| `Hero.jsx` | `Team` MetaBlock row converted to a `CONFIRM-1` placeholder asking whether the project was solo or two-person |
| `Overview.jsx` | Section headline rewritten; second paragraph stripped of its A/B-test claims |
| `WhatIDid.jsx` | ACTION 04 removed entirely (its only real content was "two people pressure-tested every call" which depends on CONFIRM-1) |
| `WhatIDid.jsx` | ACTION 05 removed entirely (this was the fabricated A/B test block) |
| `WhatIDid.jsx` | Section now shows the three real phases and ends. ACTION 01 mentions the competitor audit and now refers the reader to Research. |
| `Results.jsx` | "The A/B test" amber subsection removed in full |
| `Results.jsx` | StatBlock tile "1 A/B test run" replaced with "0 user tests run" |
| `Reflection.jsx` | Both prior versions deleted: the harsh "shipped without proof" version AND the A/B-test growth version. Replaced with the truthful close from the brief, verbatim. |

A grep over the whole `parpro-consulting/` folder returns **zero** matches
for `a/b test`, `ab test`, or `a-b test`. The only `solo` matches that
remain are inside CONFIRM placeholder copy that explicitly asks you
whether the project was solo or two-person; they are questions, not
claims.

## What was added in this pass

**New Research section.** Sits between Overview and The Original Site
in the section order. Audits Shasha Consulting and HRSBS / Homeroom
as category references, captioned exactly as you specified: "Shasha
Consulting, audited as a category reference" and "HRSBS / Homeroom,
audited as a category reference." Two observations only, one per site:

- Shasha: the consultation CTA repeats across the journey (nav + hero).
- HRSBS / Homeroom: the hero leads with a brand-voice line and illustration, not a stock photo.

Nothing further claimed. No historical state implied.

**Screenshot sourcing.** The Research section loads the two competitor
screenshots directly from your live portfolio:
- `https://kashfirashid.com/media/static_Images/SHasha_Website.png`
- `https://kashfirashid.com/media/static_Images/Hrsbs_Website.png`

Both images link out to the live competitor sites on click. If those
URLs ever break (you move or rename files), drop local copies into
`/parpro/competitor-shasha.png` and `/parpro/competitor-hrsbs.png` and
update the `src` in `Research.jsx`.

**Side nav** gained a `Research` entry between Overview and The Original
Site. `SECTION_IDS` in `ParproConsultingPage.jsx` updated to match.

**The Original Site** now leads with the four-problem framing as
PainPointCards (cleaner than the prose-then-diagram of the previous
build). The `CONFIRM-3` placeholder is rendered at the end of the
intro paragraph asking you to confirm those four match what the
client actually said.

**Design System** now shows explicit evidence: typography sizes
(Display 56, Heading 32, Body 16, Caption 13, Mono 11), spacing scale
(4, 8, 16, 24, 32, 48), component states (Button, Card, Form input,
Nav link). The color row renders a `CONFIRM-2` placeholder asking for
the real tokens from your Figma file.

**Interaction Design** now tags each of the four interaction patterns
with the audited problem it serves: ENTRANCE → Problem 4 (template
brand voice), SCROLL → Problem 2 (static engagement), CLICK → Problem
3 (buried consultation path), HOVER → Problem 2 (static engagement).
Reads at a glance as "each interaction earns its place by tying back
to a problem from the audit."

## The Reflection, verbatim

Both paragraphs:

> Three days taught me that a clear process is what makes constraint survivable. With no time to explore every direction, every interaction had to earn its place by tying back to a problem from the audit, not by looking good.
>
> The honest limit is the validation. I designed four interaction patterns I believed in and did not get to put them in front of a user or the client. If I ran this again with more time, the first thing I would add is usability testing. The redesign is a defensible set of decisions, not a proven one, and I want to be exact about which of those two it is.

No em-dashes. No fabricated test. The gap is the texture.

## CONFIRM slots (visible amber notes on the page)

Four slots, each rendered inline as a dashed amber `KashToProvide`
component labelled with its CONFIRM number. Fill these to complete
the case study:

| # | Where | Asking |
|---|-------|--------|
| CONFIRM-1 | Hero MetaBlock `Team` row, WhatIDid intro, Credits second card, Credits footer | Solo, or solo + Benjamin Nichiporik with his role and contribution |
| CONFIRM-2 | DesignSystem evidence grid (color row) | Real color tokens from the Figma file |
| CONFIRM-3 | OriginalSite intro paragraph | Confirm the four-problem framing matches what the client actually said |
| CONFIRM-4 | Credits footer | Event name (Figma file is "FLUI-25") |

Until those are filled, the placeholders are visible on the page so
nothing fabricated can sneak in.

## Asset aspect ratios (carried forward from the previous pass)

| Asset | Native | Set as | Used in |
|-------|--------|--------|---------|
| `final-site.mp4` | 1440 × 1080 | `1440 / 1080` | Hero + Results |
| `original-site.mp4` | 1920 × 922 | `1920 / 922` | Overview |
| `user-flow-original.png` | 2699 × 1470 | `2699 / 1470` | UserFlow |
| `wireframes.png` | 10264 × 6187 | `10264 / 6187` | DesignSystem |
| `mockups.png` | 6145 × 4925 | `6145 / 4925` | DesignSystem |
| Four interaction mp4s | 1440 × 1080 / 1432 × 1078 | matching | InteractionDesign |
| Shasha screenshot | external URL | natural | Research |
| HRSBS screenshot | external URL | natural | Research |

All videos and images use `object-contain` and a black background so
nothing crops or stretches. Wireframes and Mockups stack vertically
at full case-study width so a reader can actually read them.

## Files modified in this pass

```
04-build/src/pages/parpro-consulting/
  ParproConsultingPage.jsx      (Research added to imports, SECTION_IDS, and the main render order)
  primitives.jsx                (KashToProvide now accepts a `label` prop for CONFIRM-N numbering; PARPRO_NAV gained the Research entry)
  sections/
    Hero.jsx                    (Stack row stripped of A/B; Team row is now CONFIRM-1)
    Overview.jsx                (replaced with truthful headline + body; original-site.mp4 moved here from OriginalSite as the inline asset)
    Research.jsx                (NEW — competitor audit with the two screenshots and the two observations)
    OriginalSite.jsx            (four PainPointCards + CONFIRM-3; removed the inline video that now lives in Overview)
    WhatIDid.jsx                (ACTION 04 and ACTION 05 removed; three actions remain; CONFIRM-1 question added to the intro)
    UserFlow.jsx                (headline tightened, caption tightened)
    DesignSystem.jsx            (added typography / color / spacing / components evidence grid; CONFIRM-2 for colors)
    InteractionDesign.jsx       (each pattern now tagged with the audited problem it serves)
    Results.jsx                 (A/B block removed; 0-user-tests stat tile added; honest "what did not happen is validation" copy)
    Reflection.jsx              (verbatim truthful close)
    Credits.jsx                 (one confirmed card for Kash; second card is an amber CONFIRM-1 placeholder; footer is two CONFIRM placeholders)
```

Files NOT touched: every directory outside `parpro-consulting/`.
No App.jsx, no Work.jsx, no package.json, no git.

## One paragraph for the record

The first pass was wrong because it followed a brief that overclaimed.
The truthful Parpro is a constraint-and-craft story with an honest
unvalidated ending, and that is consistent with the rest of your
portfolio: BC Connect names the btn-creative restraint, Something
Lurking names the feedback gap, this one names the validation gap.
Shorter and true beats longer and false. The "0 user tests run" stat
tile is the honest counterpart to the design work and it stays.
