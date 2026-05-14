# Cursor brief — BC Connect case study rebuild (Christina-inspired, designer-led)

> **Drop this file in `/00-brief/cursor-bcconnect-rebuild.md`.**
> Paste the kickoff at the bottom into Cursor as a Plan-mode prompt.
> This is a comprehensive rebuild of the BC Connect case study, replacing the previous Cowork v1 with a Christina-Raganit-inspired structure, real Style Guide content, and Kash's actual designer voice.

---

## Mission (one paragraph)

Rebuild the BC Connect case study page at `04-build/src/pages/bc-connect/` from the ground up. The previous build by an autonomous agent produced solid bones but read like a checklist (13 sections, generic SVG diagrams, fabricated design system tokens). This rebuild replaces it with a tighter, more confident case study modeled on **Christina Raganit's HackerHelper case study** (https://christinaraganit.xyz/projects/hackerhelper) — left-side sticky nav, dark editorial canvas, serif display headlines, big breathing room, numbered solution walkthrough, real screenshots throughout. The content is **Kash's actual designer thinking** pulled from the real BC Connect Style Guide and a direct interview. **This page positions Kash as a working designer with a point of view, not as a student turning in coursework.** IAT 459 is mentioned once in a small credit line at the bottom and nowhere else.

---

## Positioning — read twice

Kash is using this as a portfolio piece for design work. The previous version led with "IAT 459 · Group 21 · Spring 2026" which makes it feel like a school assignment. Christina's case study doesn't do that — it leads with the project, the problem, the work, and only credits the academic context at the bottom in passing.

**Lead with**: BC Connect as a product, Kash's role, the design problem, the designer's thinking, the system that resulted.

**Do NOT lead with**: course code, group number, semester, professor, grade, defense. None of that. If it appears at all, it's in a single small line in the Credits section.

---

## Visual reference

**Layout/structure DNA**: Christina Raganit's HackerHelper case study
- URL: https://christinaraganit.xyz/projects/hackerhelper
- Dark canvas (warm dark, not pure black)
- Serif display headlines (Christina uses what looks like a modern serif; we'll use **Instrument Serif** from Kash's real Style Guide since it's already part of his system)
- Sans-serif body (DM Sans from Kash's real Style Guide)
- Left-side sticky nav with section anchors and a "Return" link at the top
- Big section headlines (60–80px display), generous spacing
- Mono kickers ("STEP 1", "STEP 2", "Problem", "Solution") above headlines
- Numbered solution steps with real screenshots
- Three-column layouts for parallel content (e.g., "Pain Point #1 / #2 / #3", "Team / My Roles / Duration")
- Pull quotes for user testimonials / results

**Diagram quality reference**: Abdul Aziz Hamoui's BC Connect case study SVGs
- URL: https://abdulhamoui.netlify.app/projects/bc-connect
- The 8-region ecosystem wheel
- The 3-viewport responsive breakpoint mockup
- The labeled user journey flow

We'll keep diagram quality at Abdul's level but rendered in Kash's palette (warm dark canvas, not Abdul's light green-on-white), and only where they genuinely earn their place. The previous build over-produced diagrams; this rebuild has fewer, better ones.

---

## Source content — ground truth from the real Style Guide

Kash provided a comprehensive Style Guide brief with real production data. All values below are verified, not inferred.

### Design system — Open Ground (this name IS real)

**Three design laws** (the spine of the system):

1. **Earn Your Pixel** — Every element must justify its presence. If it doesn't inform, orient, or delight — remove it. Default to removal.
2. **Ground Before Signal** — Establish spatial clarity with neutral ground before introducing color or emphasis. White space is structure, not emptiness.
3. **Connect, Don't Decorate** — Ornament for aesthetics alone is disallowed. Every line, dot, and gradient should visualize a real relationship.

**Color tokens** (use these exact values in the case study, never invent):

- Ground: `#FFFFFF` white · `#FAFBFC` off-white · `#F3F4F6` cloud · `#E8EAED` mist · `#D1D5DB` fog
- Ink: `#111218` ink-900 · `#2C2F36` ink-700 · `#4B5162` ink-500 · `#6B7080` ink-400 · `#8B90A0` ink-300 · `#B8BCCA` ink-200
- Signal (brand BC green): `#1B6B4F` signal · `#155A42` signal-hover · `#E6F3EE` signal-soft · `#D0E8DD` signal-mist
- Data accents: `#C07A28` amber · `#3568B2` blue · `#7B5EA7` plum · `#B84E5A` rose
- Dark variant accent: `#4EE0B8` teal (only used on dark backgrounds, including this case study page)

**Industry colors** (7 industries, each has bg + text):
- Technology: bg `#EFF2FA` / text `#3568B2`
- Clean Energy: bg `#E6F3EE` / text `#1B6B4F`
- Health & Life: bg `#FDF4EB` / text `#C07A28`
- Media: bg `#F8EEF5` / text `#9B4D83`
- Agriculture: bg `#EEF5E6` / text `#4D7C2A`
- Manufacturing: bg `#FEF8E7` / text `#92700C`
- Professional Services: bg `#F3F4F6` / text `#4B5162`

**Typography** (3 fonts, each with a job):
- DM Sans (UI/body) — *"for doing"*
- Instrument Serif (display) — *"for reading"*
- DM Mono (metadata) — *"for knowing"*

The case study page itself should USE these fonts — they're the same fonts the BC Connect product uses, which is itself a portfolio statement (the case study demonstrates the system).

### Real product features (these shipped):
- Landing with hero + value prop + lattice background
- Directory with cards + Leaflet/Google Maps hybrid view, debounced search, multi-select industry/region filter pills, pagination (50 + view more)
- Business detail with industry-gradient hero + verification badges
- Three-role auth (Visitor / Member / Admin) with JWT
- Favorites/saved system, persisted
- Recommendation engine (3 AI matches with percentage scores)
- Member dashboard (Saved tab + Recommendations tab + editable username)
- Admin panel (stats, moderation queue, member management, audit log)
- 24 REST endpoints
- Data normalization pipeline (Vancouver + Surrey Open Data → unified MongoDB schema)
- Near Me feature (geolocation + Haversine formula + distance display)
- Dynamic SVG industry illustrations
- Google Maps integration with custom styling

### Team
- **Abdul Aziz Hamoui** — Backend & DevOps. Admin system, business CRUD, data seeding + geocoding pipeline, QA.
- **Md Kashfi Ur Rashid Pranta (Kash)** — Frontend Lead & Designer. Design system, auth UI, routing, map + hybrid view, navigation, branding, recommendations UI, plus the "Beyond Design" work list below.
- **Veeraj Mishra** — Backend & Data. MongoDB schemas, API routes, auth integration, filtering/pagination, recommendations engine.

### Tech stack
Next.js 16 · React 19 · Tailwind CSS v4 · Radix UI · Lucide React · Leaflet · Google Maps · Recharts · Node.js · Express · MongoDB · Mongoose · JWT.

---

## Source content — Kash's real interview answers (use these verbatim or punch up)

### The platform-vibe theory (NEW — this is the spine of the case study)

> "I was thinking about platform vibe before I was thinking about pixels. LinkedIn is professional. Instagram is edited personal content. YouTube is fun and trivia. Coursera is professional learning. Discord is connection and collaboration. Reddit and Twitter are unhinged, unfiltered, raw — opinions without bias, no filters.
>
> BC Connect needed to be the LinkedIn / Coursera register — a trustworthy data surface for investors and founders making real decisions. Not Instagram's filtered aesthetic, not Reddit's rawness. So I designed for that vibe. I explored, experimented with fonts and palettes, iterated until something fit the demographic and the platform purpose."

### The doubt + iteration story

> "There were moments where a teammate needed a frontend update so they could test something. I'd ship the placeholder immediately — scaffolding for the purposeful design — and then come back to it later and match it to the system. I doubted my choices sometimes, in the middle of building. Sat with the discomfort, kept exploring, and the reasoning surfaced. The current design reflects those moments."

### The architecture-first team rhythm

> "We set the architecture together before anyone touched code. Planned it as a team, then each took a piece. Always communicated before changing anything — anything one of us touched, the others knew about. The architecture-first approach was load-bearing for the whole project."

### The invisible work / arc

> "I think the extra work I did was making sure everyone stayed communicated and updated. We set the style guide before, set the goal architecture, divided work pre-hand — and it went as planned because of the coordination layer underneath it. When peer critique or the professor's critique exposed gaps — like the cards needing visible industry differentiation — we adjusted fast because the system was already in place to absorb the change."

### The btn-creative honest story (USE THIS VERBATIM as the spine of the Exception section)

**When the decision was made:**
> "Honestly? It was late — probably 11pm or midnight before the demo. I had a fully restrained hero: two pill-shaped buttons, black and green, completely on-system. When I looked at it, it worked. But it didn't *pull*. The whole page was so visually quiet that the primary CTA just sat there. It wasn't earning the conversion it needed to."

**On conversation vs. solo call:**
> "It was mostly a solo call. I showed the team the before/after — restrained vs. the gradient version — and asked if it felt out of place. The consensus was that it didn't, because everything *around* it stayed restrained. The button's energy worked because the rest of the page didn't compete with it. But I won't pretend it was a deeply deliberated team design session — it wasn't."

**On push-back:**
> "Not much push-back in the moment, which I actually think was the problem. When I came back to it for the Style Guide write-up, I had to sit with the uncomfortable reality that it violated all three of my own design laws. That's when I had to ask myself: *am I defending this because it's actually correct, or because I shipped it?*
>
> I landed on: it's defensible, but it's an exception, not a principle. The Style Guide removes it from the component set entirely for that reason — it's documented as a production experiment, not a system element."

**What I'd do differently:**
> "I'd test whether a single-color animated glow — just the signal green pulsing outward — could create the same pull without touching the gradient. That would stay inside the system. The rainbow gradient works, but it's doing a lot. The question I didn't ask rigorously enough at the time was: *what's the minimum amount of exception I need here?*"

**The one-liner that closes the section:**
> *"I made the call under pressure, defended it with a rationale I mostly believe, and then did the more honest work of keeping it out of the design system — because a good exception doesn't become a rule."*

### Beyond Design — the shipping work (the invisible-work + frontend-updates list)

Assigned scope: GPS integration role.

Work shipped beyond the assigned scope, organized into clear buckets:

**Bug fixes nobody else was tracking**
- **The 12-businesses-not-90k bug**: Frontend was calling the wrong URL (`/` instead of `/api`), getting a 404, falling back to hardcoded sample data. Fixed `.env.local`, suddenly the app was showing 90k+ real database records instead of 12 demo entries.
- **Jobs tab nav bug**: Tab was always highlighted regardless of route. Fixed.
- **Map race condition**: Markers were rendering before the map was ready. Added a ready-state gate.

**Features built proactively**
- **Profile Dashboard** (`/profile`): Saved tab (bookmark API), Recommendations tab (3 AI matches with percentage scores from `/recommendations` API), inline-editable username via PATCH.
- **Hybrid map/list view**: Grid + map toggle for logged-in members. Replaced broken Leaflet integration with Google Maps + custom styling.
- **Near Me feature**: `navigator.geolocation` + Haversine formula + distance display ("3 km away") + sorted by closest.
- **Recommended for You** section on home (members only, 3 cards).
- **Pagination**: Loads 50, View More loads next 50.
- **Dynamic SVG illustrations**: Hardcoded industry-based switch, replacing broken external images that were showing placeholder errors.
- **Card click-through**: Cards now route to `/directory/[id]` detail page.
- **Jobs section redesign**: CSS Grid 4 → 2 → 1 columns responsive, filter pills update instantly.
- **Branding**: Nav logo SVG with 90°/180° hover spin, favicon with white background, updated nav icon.

**The coordination work (the invisible arc)**
- **The Helmine ask**: When peer feedback flagged cards with blank images during the demo, Kash drafted a fix (hardcode default images per industry to prevent broken placeholders) and **asked the team on Discord first** before implementing. Collaborative discipline.
- **The cleanup**: Removed the design systems page and 13 unused components when the team agreed they weren't shipping.

This bucket — the bugs, the proactive features, the coordination — is what turns "I designed a directory" into "I shipped a working product."

---

## Case study structure (Christina-inspired, 10 sections + side nav)

### Left sticky side nav (always visible, fixed position)

```
↵ Return

Overview
Background
Problem
Design Challenge
Solution
The System
The Exception
Beyond Design
Results
Learnings
```

Style: mono font, ink-300 inactive, signal active, small chevron/pointer for current section. Christina uses a small "Return" affordance at the top — match that.

### Section 01 — Hero

- **Title** (display 96px / 56px mobile, Instrument Serif): *"BC Connect"* (no qualifier — let the title breathe like Christina's)
- **Subtitle paragraph** (sans 18–20px, ink-300 since we're on dark canvas): 2–3 sentences. Something like:
  > *"A unified directory of British Columbia's startup ecosystem. I led the design system and the frontend that surfaces 90,000+ businesses through one searchable interface — and the late-night decisions that shaped both."*
- **Meta block** (3-column, mono labels + body values, like Christina's "Team / My Roles / Duration"):
  - **My Roles**: Design System Lead · Frontend Architecture Lead
  - **Stack**: Next.js · React · Tailwind · MongoDB · JWT
  - **Duration**: Spring 2026 · 8 weeks
- **Hero image**: real screenshot of the shipped BC Connect landing page (Kash will provide). Treat it as a large image with subtle rounded corners and a thin border.

### Section 02 — Overview

- **Mono overline**: `OVERVIEW`
- **Headline** (display 60–72px, Instrument Serif): *"A directory the province didn't have."* (or Kash's preferred opening — punch up if needed)
- **Body** (sans 18px light, ink-200, max-width 720px): 2 paragraphs.
  - P1: what BC Connect is, what it does
  - P2: Kash's role positioning — *"I led the design system and the frontend. Open Ground (the system) came first; everything else inherited from it."*

### Section 03 — Background

- **Mono overline**: `BACKGROUND`
- **Headline**: *"The BC startup ecosystem is fragmented by design."* (or similar)
- **Body**: 2 paragraphs. BC has thousands of startups across 8 regions. Vancouver and Surrey each publish business data, but in different schemas. Everyone else relies on LinkedIn and word of mouth.
- **Diagram**: The 8-region ecosystem map (reuse the previous build's `DiscoveryGapMap.jsx` but restyle for the dark canvas — warm dark backgrounds, signal-mist for connections, ink-200 for text). Modeled on Abdul's wheel layout but with Kash's palette.
- **Caption** (mono small, ink-400): *"Eight regions. Two open-data portals. Zero shared directory."*

### Section 04 — Problem

- **Mono overline**: `PROBLEM`
- **Headline** (display 60–72px): *"The data was the first problem. Discovery was the second."*
- **Body**: 1 paragraph setting up the three pain points
- **Three-column grid** (Christina-style "Pain Point #1 / #2 / #3"):
  - **PP#1 — Two schemas, no shape**: Vancouver publishes business types. Surrey publishes NAICS codes. Same idea, incompatible structure.
  - **PP#2 — No discovery layer**: Investors scroll LinkedIn. Founders rely on word of mouth. The directory the province needs doesn't exist.
  - **PP#3 — Regional invisibility**: Startups outside the Lower Mainland stay invisible. The Open Data portals only cover the cities that publish.

### Section 05 — Design Challenge

- **Mono overline**: `DESIGN CHALLENGE`
- **Centered headline** (display 56–72px, Instrument Serif, max-width 900px, centered):
  > *"How might we build a single directory of BC's startup ecosystem — searchable, queryable, trustable — that respects the data and gets out of the user's way?"*
- That's the entire section. Christina's pattern: this is a moment, not a paragraph.

### Section 06 — The Designer's Mind (NEW — the platform-vibe section)

- **Mono overline**: `THE DESIGNER'S MIND`
- **Headline**: *"Before pixels, I designed for the platform's vibe."*
- **Body** (3–4 paragraphs):
  - P1: The platform-vibe theory verbatim — every platform has a register (LinkedIn / Instagram / YouTube / Coursera / Discord / Reddit-Twitter examples).
  - P2: BC Connect's register — LinkedIn/Coursera-adjacent. Trustworthy data surface for investors and founders. Not Instagram's filter, not Reddit's rawness.
  - P3: The iteration process — explored, experimented with fonts and palette, kept going until the system fit the demographic and the platform purpose.
- **Optional visual**: a small mono-text grid showing 6 platforms with their one-word vibe tags. Treat as ASCII-art-precise text grid, not a full SVG. (Christina has similar tight typography moments.)

### Section 07 — Solution

- **Mono overline**: `SOLUTION`
- **Headline**: *"What shipped — six flows, one system."*
- **Body**: 1 paragraph: BC Connect ships as a Next.js app with three roles, a Leaflet+Google Maps hybrid view, debounced search, multi-select filters, a Profile Dashboard with AI-driven recommendations, and an admin moderation surface.

Then numbered steps, **Christina-style** (mono "STEP N" label + headline + 1-paragraph body + screenshot):

- **STEP 1 — Landing**: Hero pulls a visitor in. Subhead positions the value. Search bar invites exploration. Lattice background gives spatial structure without competing for attention. → screenshot of production landing
- **STEP 2 — Directory + Map**: Cards in a 3-column grid. Industry-color filter pills. Toggle to map view. Debounced search. Pagination (50 + View More). → screenshot of directory page
- **STEP 3 — Business Detail**: Industry-gradient hero. Verification badge. Full info grid. → screenshot of detail page
- **STEP 4 — Auth Flow**: Sliding tabs between Sign In and Register. AuthContext hydrates from localStorage. Protected route guards redirect anonymous traffic. → screenshot of auth page (with sliding-tab moment if there's a clip)
- **STEP 5 — Member Dashboard**: Saved tab + Recommendations tab (3 AI matches with percentage scores) + editable username. → screenshot of dashboard
- **STEP 6 — Admin Panel**: Moderation queue, member management with role assignment, action audit log. → screenshot of admin panel

Each step: STEP label (mono, signal color) → headline (display 32–40px) → 1 paragraph (sans 16px, ink-200) → screenshot (full-bleed within section, rounded corners, thin border).

### Section 08 — The System (Open Ground)

- **Mono overline**: `THE SYSTEM`
- **Headline**: *"Open Ground — the design system, before anything was built."*
- **Body** (2 paragraphs):
  - P1: I built the system first. Fonts, palette, spacing, the three design laws. Nobody on the team was being graded on that work. I trusted the downstream payoff.
  - P2: By the time we started building components, the system was already doing the thinking. Cards, navigation, hero, map view — none of it was guesswork.

Then a **structured visual block** (NOT a busy SVG):

**The three laws** as 3 cards (Christina's 3-column rhythm):
- **01 — Earn Your Pixel** / Every element justifies its presence. Default to removal.
- **02 — Ground Before Signal** / Spatial clarity first. White space is structure, not emptiness.
- **03 — Connect, Don't Decorate** / Ornament without function isn't allowed. Every line visualizes a relationship.

**Palette swatches** in a horizontal row, real hex codes labeled:
- Signal `#1B6B4F`
- Ink-900 `#111218`
- Mist `#E8EAED`
- Industry accents (small row of 7 swatches, each labeled with industry name)

**Type ramp** showing the three fonts and their jobs:
- *Instrument Serif* — "for reading" (display sample: a large character at 96px)
- DM Sans — "for doing" (UI sample)
- `DM Mono` — "for knowing" (metadata sample)

**Caption** at the bottom (mono small):
> *"Sans for doing. Serif for reading. Mono for knowing."*

Keep this section structurally tight — Christina-clean, not over-decorated.

### Section 09 — The Exception

- **Mono overline**: `THE EXCEPTION`
- **Headline**: *"The one rule I broke. And why I kept it out of the system anyway."*
- **Body**: This section uses Kash's verbatim btn-creative interview answer (from the source content above), structured into 4 paragraphs:
  - P1: When the decision was made (late, 11pm, demo eve)
  - P2: Conversation vs. solo call (mostly solo, team consensus after)
  - P3: The reflection — "Am I defending this because it's correct, or because I shipped it?" Style Guide removes the button from the system.
  - P4: What I'd do differently — "What's the minimum amount of exception I need here?"
- **Pull quote at the end** (Christina-style, large centered text, Instrument Serif italic, signal color):
  > *"A good exception doesn't become a rule."*

Optional: a small visual comparison of the restrained CTA vs. the btn-creative gradient version, side by side. Captioned: *"Before / After."* Only include this if Kash provides screenshots.

### Section 10 — Beyond Design

- **Mono overline**: `BEYOND DESIGN`
- **Headline**: *"The work that wasn't on the brief."*
- **Body** (1 short opening paragraph): I had a defined scope — GPS integration — and the design system. Everything else in this section is what I shipped because the product needed it.

Then a three-bucket layout (parallel to Christina's pain-point columns):

**Bugs I fixed that weren't anyone's job**
- The 12-businesses-not-90k bug — `.env.local` was misconfigured, frontend was getting a 404 and falling back to hardcoded sample data. Fixed, app loaded 90k+ real records.
- Jobs tab nav bug — tab was always highlighted regardless of route.
- Map race condition — markers rendering before the map was ready.

**Features I built proactively**
- Profile Dashboard (Saved + Recommendations + editable username)
- Hybrid map/list view (replaced Leaflet with Google Maps + custom styling)
- Near Me with Haversine distance sorting
- Pagination + dynamic industry SVG illustrations + card click-through + Jobs section redesign

**Coordination work the team felt but didn't see**
- The Helmine ask — drafted a card-image fallback fix, asked Discord before implementing.
- The cleanup — removed design systems page + 13 unused components when scope tightened.
- The architecture-first rhythm — kept the team coordinated so the system absorbed late changes without breaking.

Optional pull quote (one line in voice):
> *"Most of the work nobody graded turned out to be the work that actually shipped the product."*

### Section 11 — Results

- **Mono overline**: `RESULTS`
- **Headline**: *"What the system carried."* (or — if Kash has a feedback quote — lead with that)
- **Body**: 1 paragraph + numbers row.
  - The product shipped on time. 90k+ real records loaded. 24 REST endpoints. 3 user roles. 7 industries. 8 BC regions. The system kept up with three branches, multiple environments, and a deadline.
- **Pull quote** (if available — Kash can drop in feedback from prof, peers, or user testers): Christina-style centered large quote with attribution.

### Section 12 — Learnings (the personal reflection, NOT the 459 version)

- **Mono overline**: `LEARNINGS`
- **Headline**: *"What I took from BC Connect."*
- **Body** (4 paragraphs in flowing prose, not three-column):

  - P1 — On the platform vibe: I won't design without knowing the platform's vibe first. That decision shapes every token after it. Building BC Connect taught me to make that decision out loud, with reasoning, before any pixels.

  - P2 — On systems-first: investing early in a strong foundation isn't waste. The system was already doing the thinking by the time we started building. The cards, navigation, map view — none of it was guesswork because the foundation absorbed the work.

  - P3 — On shipping under pressure: I made a creative-button call at midnight before a demo. I shipped it, defended it, and then did the more honest work of keeping it out of the design system. *Good exceptions don't become rules.* That sentence is the most useful thing I learned this term.

  - P4 — On invisible work: the coordination, the bug fixes, the Discord asks before implementing — none of that goes on a resume bullet. All of it is what actually let the product ship. I'll keep doing it.

- **End on a pull quote** (Instrument Serif, signal color, large centered):
  > *"A good exception doesn't become a rule."*

### Section 13 — Credits

- **Mono overline**: `CREDITS`
- **Headline**: *"The people I built this with."*
- **Body** (2 short paragraphs):
  - **Abdul Aziz Hamoui** — Backend & DevOps. The admin system, business CRUD, the data normalization pipeline that turned two open-data portals into one schema, branch and PR management when things got tangled.
  - **Veeraj Mishra** — Backend & Data. MongoDB schemas, the API layer, frontend ↔ backend auth integration, the saved-businesses and recommendations engine, the API bug fixes nobody else wanted to chase down.
- **Small footer line** at the bottom of the section (mono, ink-400, single line):
  > *"Built for IAT 459 · Simon Fraser University · Spring 2026"*

That's the ONLY mention of the academic context in the entire page. Single line, end of credits.

---

## Technical implementation

### File structure (rebuild — delete previous and start fresh)

The previous Cowork-built case study at `04-build/src/pages/bc-connect/` contained 20 files. Delete them all except `App.jsx` modification (the URL conditional stays). Rebuild from scratch with this structure:

```
04-build/src/pages/bc-connect/
├── index.jsx                          ← main page component, orchestrates side nav + sections
├── BCConnectPage.jsx                  ← page-level wrapper with dark canvas + side nav
├── primitives.jsx                     ← shared (SideNav, SectionHead, MonoKicker, PullQuote, MetaBlock, PainPointCard, StepCard)
│
├── sections/
│   ├── Hero.jsx
│   ├── Overview.jsx
│   ├── Background.jsx
│   ├── Problem.jsx
│   ├── DesignChallenge.jsx
│   ├── DesignersMind.jsx              ← NEW (platform-vibe theory)
│   ├── Solution.jsx                   ← numbered steps walkthrough
│   ├── TheSystem.jsx                  ← Open Ground showcase
│   ├── TheException.jsx               ← btn-creative honest story
│   ├── BeyondDesign.jsx               ← bugs / features / coordination
│   ├── Results.jsx
│   ├── Learnings.jsx
│   └── Credits.jsx
│
├── diagrams/
│   ├── EcosystemMap.jsx               ← restyled for dark canvas, reuse logic from previous DiscoveryGapMap
│   └── ThreeLawsBlock.jsx             ← simple 3-card block, not a full SVG
│   (no other diagrams — keep it tight)
│
└── supporting-content.md              ← updated [VERIFY-KASH] inventory + asset slot index
```

### Visual baseline

- **Canvas**: warm dark — use `bg-[#0F1216]` or `bg-zinc-950` with a 2–4% warm tint via a subtle gradient overlay. NOT pure `bg-black`. NOT brand signal-green.
- **Text base**: `text-zinc-200` for body, `text-zinc-400` for muted/captions, `text-white` for primary headlines, `text-[#1B6B4F]` for signal accents.
- **Section padding**: vertical `py-32` (mobile `py-20`), generous like Christina's.
- **Content column**: `max-w-[860px]` centered, with the side nav fixed on the left of the viewport.
- **Side nav width**: 200–240px on desktop, hidden on mobile (mobile gets a top sticky abbreviated nav or no nav).
- **Typography**: Instrument Serif for all display, DM Sans for body, DM Mono for kickers/metadata. If these fonts aren't already loaded in the portfolio site, add them via Google Fonts in `index.html` or via Tailwind config. NOT a `package.json` install — just a CSS link.

### Side nav behavior

- Sticky to viewport, fixed left
- Each item is an anchor link to its section ID
- Highlight the current section on scroll using `IntersectionObserver`
- "Return" link at top: navigates back to the home page (`/` or wherever the Work section is)
- Style: minimal, monospaced labels, signal color for active, ink-300 for inactive, a small left-side pointer for active section
- On mobile (< 768px), hide the side nav entirely. The page still works as a long scroll.

### Asset placeholders

For every real screenshot/photo/video that Kash will provide later, drop a clear `<AssetPlaceholder kind="..." spec="..." />` component. It should render a dashed-border box with the kind and spec inside, so when Kash views the page he sees exactly what asset needs to go where.

Asset slots needed (Kash will supply files for each — log them in `supporting-content.md`):

1. **Hero screenshot** — full BC Connect landing page (desktop)
2. **STEP 1 screenshot** — landing page or specific hero detail
3. **STEP 2 screenshot** — directory page with cards + map view (a wide screenshot showing both)
4. **STEP 3 screenshot** — a business detail page with the industry gradient hero
5. **STEP 4 screenshot** — auth page (ideally with sliding-tab moment if a clip is available)
6. **STEP 5 screenshot** — member dashboard
7. **STEP 6 screenshot** — admin panel (moderation queue or audit log view)
8. **The Exception comparison (optional)** — side-by-side of restrained CTA vs. btn-creative gradient version
9. **Results pull quote source** (text only, no asset)
10. **Process photos (optional, place in margins or as full-width breakers)** — late-night desk shots, team working, demo day. Use these as breathing-room moments between heavy sections.
11. **Discord screenshots (optional)** — the Helmine card-image moment, the API connection bug discovery, any coordination moment

For each placeholder, the dashed-border box should display:
- `ASSET KIND` (e.g., "SCREENSHOT", "VIDEO", "PHOTO")
- Slot ID (e.g., "Slot 4 — Auth Page")
- Recommended dimensions / aspect ratio
- 1-line description of what the asset should show

### Route

The previous build added a URL conditional in `App.jsx` for `/projects/bc-connect`. Keep that. Don't touch `App.jsx` further.

---

## Plan-mode workflow (Cursor)

This is a substantial refactor + new build. Use Plan mode:

1. **Cursor proposes a plan** based on this brief. The plan should enumerate:
   - Which files to delete (the previous Cowork output)
   - Which files to create (the new structure above)
   - Which fonts/Google Font URLs to add to `index.html` if not present
   - Which existing files to leave alone (App.jsx beyond the existing conditional, all character/companion/brand-book/wireframes/spec files)
2. **Kash reviews the plan**, adjusts if needed, then approves
3. **Cursor executes section by section**:
   - Phase 1: Scaffolding (BCConnectPage + side nav + primitives + index.jsx wiring)
   - Phase 2: Hero, Overview, Background sections
   - Phase 3: Problem, Design Challenge, Designer's Mind
   - Phase 4: Solution (numbered steps with asset placeholders)
   - Phase 5: The System, The Exception
   - Phase 6: Beyond Design, Results, Learnings, Credits
   - Phase 7: Side nav scroll-spy logic, mobile fallback, supporting-content.md update
4. **Kash drops assets** as they become needed (per the placeholder slots)
5. **Voice review** after each section is rendered — Kash reads, flags lines that don't land, Cursor adjusts

Do NOT execute the whole thing as one giant patch. Phase by phase, with browser checks between phases.

---

## STRICT — do not touch the following

- `04-build/src/character/*` — entire character system
- `04-build/src/companion/*` — entire companion system, including `bubbleLibrary.js`
- `04-build/public/character/*.png` — sprite assets
- `04-build/src/App.jsx` — keep the existing URL conditional, do NOT modify or reorder the provider stack
- `04-build/src/sections/*` — including Work.jsx (the listing-blurb update is Kash's call, not yours)
- `01-brand-book/`, `02-wireframes/` — read-only
- `00-brief/character-spec*.md`, `00-brief/01-voice.md`, `00-brief/00-overview.md`, `00-brief/kash-fact-sheet.md` — read-only

You MAY:
- Add a Google Fonts `<link>` tag in `index.html` if Instrument Serif / DM Sans / DM Mono aren't already loaded
- Create new files inside `04-build/src/pages/bc-connect/`
- Delete the previous Cowork-built files inside `04-build/src/pages/bc-connect/` BEFORE replacing them (do this as part of Phase 1, with the file list shown in the plan)

You MAY NOT:
- Install new npm packages (Instrument Serif/DM Sans/DM Mono are via Google Fonts CSS, not npm)
- Modify `package.json`, `vite.config.js`, `tailwind.config.js`
- Commit or push to git
- Touch anything outside `04-build/src/pages/bc-connect/` except the Google Fonts link in `index.html`

---

## Voice spec — punch up where Kash's interview answers are too prose-y for a portfolio page

Kash's interview answers contain the truth but they're sometimes loose for a portfolio page. The case study should preserve his meaning but tighten his lines.

Allowed punch-ups:
- Tighten run-on sentences into set up → hit → land structure
- Replace hedging with declarative ("I think it was kind of" → "It was")
- Compress 3-sentence ideas into 1 strong sentence
- Use sentence fragments where they land (Christina does this)
- Keep his actual phrasing in pull quotes (the platform-vibe paragraph, the btn-creative answer paragraphs, the one-liner)

Forbidden:
- Don't invent facts Kash didn't say
- Don't add corporate / agency / marketing voice
- Don't soften his honest reflections (the "am I defending this because I shipped it" line stays as-is)
- Don't use saccharine — "thrilled to share", "excited to present", "amazing journey" all banned

---

## Expected outputs

When the rebuild completes:

**Code** (in `04-build/src/pages/bc-connect/`):
- All 14 section files + page wrapper + primitives + 2 diagrams
- All asset placeholders rendered as dashed-border slot indicators
- Side nav with scroll-spy
- Dark canvas, real Open Ground tokens, Instrument Serif + DM Sans + DM Mono

**Documentation**:
- `supporting-content.md` — list of asset slots needing files, with each slot's spec
- Plan-mode summary at top of `index.jsx` as a comment

**Browser**:
- `http://localhost:5173/projects/bc-connect` renders the new case study
- Side nav highlights current section on scroll
- All sections render with placeholders where assets aren't yet provided

---

## Asset hand-off — what Kash will provide after the build is scaffolded

Per Kash's note, he can supply:
- Screenshots of every flow (hero, directory, business detail, dashboard, admin panel, auth)
- Process photos (desk shots, team working, demo day)
- Figma exports / sketches (early design tokens, wordmark exploration, layout iterations)
- Short video clips (auth sliding tabs, map view, interaction moments)
- Discord screenshots (team coordination, the Helmine moment, the API bug discovery)
- Demo/defense recording or slides

Workflow:
1. Cursor scaffolds the page with placeholders
2. Kash views the page in the browser and sees exactly which slots need what
3. Kash drops files into `04-build/public/bc-connect/` (a new folder Cursor creates as part of scaffolding)
4. Cursor (or Kash directly) updates each placeholder to reference the real file
5. Final voice review pass

---

*End of brief. Paste the kickoff below into Cursor as a Plan-mode prompt.*

---

## Kickoff for Cursor (paste this into Cursor as a Plan-mode prompt)

```
Plan mode.

Read /00-brief/cursor-bcconnect-rebuild.md completely before doing anything.
Also read /00-brief/01-voice.md and /README.md for voice + locked decisions.

Your job is a full rebuild of the BC Connect case study at
04-build/src/pages/bc-connect/. Replace the existing 20 files from the
previous autonomous run with a new structure modeled on Christina
Raganit's HackerHelper case study (left sticky side nav, dark canvas,
Instrument Serif display, numbered solution walkthrough with real
screenshots, three-column parallel layouts).

Produce a plan with these phases:

Phase 1 — Scaffolding
  - List the 20 existing files to delete
  - List the 14 new section files + page wrapper + primitives + 2 diagrams to create
  - Confirm Google Fonts link addition to index.html if needed
  - Show the side nav component design

Phase 2 — Sections 1-3 (Hero, Overview, Background)
Phase 3 — Sections 4-6 (Problem, Design Challenge, Designer's Mind)
Phase 4 — Solution (numbered STEP 1-6 with asset placeholders)
Phase 5 — The System (Open Ground) + The Exception (btn-creative honest story)
Phase 6 — Beyond Design + Results + Learnings + Credits
Phase 7 — Side nav scroll-spy + mobile fallback + supporting-content.md

Pause for my approval after each phase. Do NOT execute all phases as
a single patch.

Strict scope: only files inside 04-build/src/pages/bc-connect/ and
the Google Fonts link in 04-build/index.html. Nothing else.

Use real Open Ground tokens from the brief (#1B6B4F signal, #111218
ink, etc.). Do not invent values. Do not soften Kash's interview
voice in the Exception or Learnings sections.

This case study is positioned as a portfolio piece for a working
designer, NOT a school project. The only mention of IAT 459 is a
single line at the bottom of Credits. Lead with the work, not the
academic context.

Start with the plan. Do not write any code until I approve the plan.
```
