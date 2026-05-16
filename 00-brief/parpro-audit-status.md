# Parpro · competitor audit status

## Captures attempted

The sandbox that ran this build cannot screenshot or screen-record
live websites. Two reasons:

1. There is no headless browser available (no Chromium / Playwright / Puppeteer installed in the sandbox image).
2. Direct `curl` to external sites is blocked by the sandbox proxy with HTTP 403. The previous attempt to fetch `Something_Lurking_Comic.pdf` showed the same block; `curl` to `kashfirashid.com/media/static_Images/SHasha_Website.png` also returned 403 in this session.

What the sandbox **could** do is `web_fetch` the HTML of the two live
sites and read it as text. That gave me real evidence to write the
Research copy from, but it is not visual evidence and the brief
requires the visual captures to be real.

## What the sandbox got from each site

**Shasha Consulting (https://shashaconsulting.ca/)** — HTML fetched
successfully. Every claim in the Research finding is confirmed in
the live HTML:

- "Book An Appointment" button in the top header
- "Request A Free Consultation" CTA in the hero
- A "Special Offer" block with "Claim Your Offer Now"
- A "Schedule a Call" link in the footer
- Every CTA routes to `calendly.com/skakooza`
- A "Why Choose Us" 6-item grid (Certified, Scalable, Secure, Transparent, Testimonials, Customer support)
- A "What Our Clients Say" testimonials block with two named clients
- A "Frequently Ask Questions" FAQ section
- "With nearly 15 years of experience in the industry" in the footer

The finding "one action, everywhere · the consultation CTA repeats in
the top bar, the navigation, the hero, a dedicated offer block, and
the footer, all routing to a single booking link" is provably accurate
against the current live site.

**HRSBS / Homeroom (https://www.hrsbs.ca/)** — fetch attempt earlier
in this session returned 403 from the sandbox proxy. The finding
about the brand-voice hero, the named character personas, the staged
intake process, and the credentials (QuickBooks Elite, CPB Canada,
since 2009) is carried forward from your audit brief without
independent confirmation in this session. The Research copy uses
exactly what you wrote.

## What you must capture

Six assets. All specs and target filenames are in
`04-build/public/parpro/AUDIT-ASSETS.md`. Drop the captures into
that folder under the listed filenames and the `Research.jsx`
section picks them up by name. The amber placeholders disappear
the moment a file with the matching path exists.

| Site | File | Status |
|------|------|--------|
| Shasha | `shasha-audit-scroll.mp4` | needed |
| Shasha | `shasha-audit-fullpage.png` | needed |
| Shasha | `shasha-audit-trust.png` | needed |
| HRSBS | `hrsbs-audit-fullpage.png` | needed |
| HRSBS | `hrsbs-audit-identity.png` | needed |
| HRSBS | `hrsbs-audit-process.png` | needed |

## What was not done (per the brief's "do not")

- No old `SHasha_Website.png` or `Hrsbs_Website.png` from your
  portfolio were reused. The Research section references the new
  fresh-capture filenames only.
- No additional competitor analysis was generated beyond the three
  findings in your verbatim copy: Shasha = one-action-everywhere,
  HRSBS = identity-does-the-persuading, shared = nobody uses motion.
- No metric or measurement was attached to any capture.
- No fabricated description was substituted for a real capture. Every
  slot the sandbox could not fill is a visible amber placeholder.
- No git operations.

## What was done

The truthful rewrite of the Parpro case study completed in this
session, on top of the earlier two passes. Summary:

- **Team** updated to four members (Kashfi Rashid, Benjamin Nichiporik, Mariyam, Rahil Virani) in Hero, Overview, and Credits. CONFIRM-1 and CONFIRM-4 placeholders removed everywhere. Footer reads "FLUI-25 hackathon · four-person team · 3-day timeline."
- **Voice** changed from first-person singular to plural ("we") for the team deliverables (audit, flow, wireframes, mockups, design system). Kashfi-owned work (the prototype, the four interaction patterns) stays first-person.
- **Research section** replaced entirely with the verbatim copy from the brief. Three findings, each with its tied problem number, six asset slots, three caption rules, no other analysis.
- **Duplication killed** in three sections:
  - `OriginalSite.jsx` no longer renders `<OriginalSiteProblems />` (the four PainPointCards already say the same thing).
  - `DesignSystem.jsx` no longer renders the duplicate `<dl>` evidence grid (the `<DesignSystemAnatomy />` diagram covers Typography, Color, Spacing, Components in one place).
  - `InteractionDesign.jsx` no longer renders `<InteractionTaxonomy />` (the video grid below already tags each pattern with its audited problem).

## Files modified this pass

```
04-build/src/pages/parpro-consulting/
  sections/
    Hero.jsx              (4-person team, Role line now names the prototype + four patterns)
    Overview.jsx          (we / I split, four people in body)
    Research.jsx          (replaced entirely with verbatim copy + six AssetPlaceholders)
    OriginalSite.jsx      (removed duplicate <OriginalSiteProblems /> diagram)
    WhatIDid.jsx          (we / I split, no CONFIRM-1, three actions only)
    DesignSystem.jsx      (removed duplicate evidence grid, single CONFIRM-2 note below the diagram)
    InteractionDesign.jsx (removed duplicate <InteractionTaxonomy /> diagram)
    Credits.jsx           (4 team cards, no CONFIRM-1 / CONFIRM-4, footer reads FLUI-25 four-person)
04-build/public/parpro/
  AUDIT-ASSETS.md         (new manifest listing the six capture slots)
00-brief/
  parpro-audit-status.md  (this file)
```

## What still pending

- Six audit captures (see manifest)
- CONFIRM-2 color tokens (Design System still references TBD inside the diagram component itself; once you paste real tokens I will edit `DesignSystemAnatomy.jsx` directly and remove the CONFIRM-2 note below it)
- One sentence from you on what Benjamin, Mariyam, and Rahil each actually owned, so each Credits card can move from the honest collective contribution line to a specific one
- Live verification at `http://localhost:5173/projects/parpro-consulting`

## Honest note on capture limits

I do not have the ability to run a browser inside this sandbox. If a
later session is dispatched with Playwright or Puppeteer available
plus permission to hit `shashaconsulting.ca` and `hrsbs.ca`, the
six captures can be produced automatically. As of this run, they
need a human at a keyboard with a screen recorder. The case study
will render with the placeholders until then; nothing fabricated.
