# Cowork brief — BC Connect case study build (8-hour unattended run, v2)

> **Drop this file in `/00-brief/cowork-bcconnect-build.md`** (replaces v1).
> This is a multi-phase brief for an unattended Cowork run of up to 8 hours. Kash will be AFK the entire time. You must self-manage, time-track, and iterate when the primary task is done. Do not idle.
> **v2 update**: Source documents have now been provided. Most `[VERIFY-KASH]` tags from v1 are resolved. Use the embedded facts in this brief as ground truth.

---

## Mission (one paragraph)

Build a deep, polished case study page for **BC Connect** — an IAT 459 group project at SFU SIAT where Kashfi Rashid (Kash) was the **design system lead and frontend architecture lead**. The case study page lives within Kash's portfolio website (`portfolio-2026/04-build/`). Use Abdul Aziz Hamoui's BC Connect case study at `https://abdulhamoui.netlify.app/projects/bc-connect` as **STRUCTURAL inspiration** (the shape of how a case study is told — problem → context → contribution → process → product → reflection), but produce the actual content, visual aesthetic, and voice in **Kash's brand system** (warm 2am-studio palette, v1.1 voice, lead with his design system narrative). Do not copy Abdul's content or color palette — only the structural rhythm.

---

## GROUND-TRUTH FACTS (verified from project documents)

These are now confirmed and should be used as authoritative. No need to tag with `[VERIFY-KASH]` unless something genuinely unclear remains.

### Project basics
- **Project name**: BC Connect
- **Course**: IAT 459 (Interactive Arts & Technology), SFU SIAT
- **Group**: Group 21
- **Team**: Abdul Aziz Hamoui, Md Kashfi or Rashid Pranta (Kash), Veeraj Mishra
- **Source files location** (on Kash's machine): `C:\SFU folder\SFU\Spring 26\IAT 459\Final_Project\Files` — three PDFs: technical report (annotated), interim report, final report

### What BC Connect is
- A single-page application (SPA) serving as a **unified directory of British Columbia businesses**, primarily targeted at startups
- Solves the problem of fragmented BC business information — investors scroll LinkedIn, founders rely on word of mouth, regional startups outside Vancouver stay invisible
- Built as a discovery + verification platform with three user roles

### Tech stack
- **Frontend**: Next.js + React, Tailwind CSS, Radix UI, shadcn/ui component library
- **Backend**: Node.js + Express
- **Database**: MongoDB with Mongoose
- **Auth**: JSON Web Tokens (JWT) with bcrypt password hashing
- **Maps**: Leaflet (interactive mapping)
- **Charts**: Recharts (data visualization)

### Three user roles (Visitor / Member / Admin)
- **Visitor (unauthenticated)**: Can view the directory only. No favorites, no submissions, no protected routes. Backend: `optionalAuth.js` middleware allows open requests through.
- **Member (authenticated user)**: Default role on registration. Can save businesses to favorites, submit new listings (pending admin approval), view personalized dashboard with recommendations. Frontend: AuthContext detects valid JWT, populates user state, unlocks features.
- **Admin (privileged user)**: Member with `role: "admin"` in MongoDB. Approves/rejects submissions, deletes any listing, manages member roles (with safeguard preventing self-demotion), views action history audit log. Sees Admin badge in UI.

### Data sources and normalization (the genuine technical challenge)
- Sourced from **City of Vancouver Open Data** and **City of Surrey Open Data** portals
- The two portals used **different schemas** — Vancouver business types vs Surrey NAICS codes
- Built a **data normalization script** in the ingestion pipeline that:
  - Fetched from both portals
  - Mapped Vancouver business types AND Surrey NAICS codes → unified enum (e.g., "Professional Services", "Technology")
  - Standardized address fields (address, city, postalCode)
  - Trimmed/cleaned strings to match Mongoose schema constraints
  - Assigned defaults (`verificationStatus: "pending"`)
- Enabled: consistent filtering by industry/region, list view + map view from same data, cross-city comparison, scalability to additional BC cities

### Features built
- **Landing page**: hero, value proposition, CTA, principles section, stats section
- **Directory page**: business cards + map hybrid view (Leaflet), debounced keyword search across name/description/tags, multi-select industry/region filter pills, pagination
- **Business detail view**: industry-gradient hero, full info grid, status badges
- **Auth flow**: sign-in/register with sliding tab animations, session persistence via localStorage, protected route guards
- **Member dashboard**: personalized greeting, saved businesses, recommendations based on saved items
- **Favorites system**: heart icon, persisted in MongoDB
- **Admin panel**: dashboard analytics (Recharts), moderation queue (approve/reject/delete pending), member management (search, role changes, suspend, delete), admin list, full action history audit log
- **Business submission flow**: Members submit → pending status → Admin approves or rejects
- **RESTful API**: 24 endpoints across auth, businesses, users, admin

### Industry categories (7 total)
Inferable from documents: Professional Services, Technology, and 5 others (the documents don't list all 7 verbatim — if you need to enumerate them in a diagram, list the 2 verified ones and write "+ 5 other industry categories" rather than fabricating).

### What was NOT built (honestly)
- Profile picture upload (deprioritized in favor of core experience, deferred to future update)

---

## KASH'S ROLE — anchor the case study narrative here

This is the **most important section to internalize**. The case study story is Kash's story, not BC Connect's marketing story.

### Kash's specific contributions

From the work distribution sections of both the annotated technical report and the final report:

**Design and architectural foundation (the thing Kash leads with)**:
- Built a full **design system first** — fonts, color palette, spacing tokens, style guide — BEFORE any component work
- Nobody on the team was being graded directly on design system work, but Kash invested in it anyway because he trusted that everything downstream would land better

**Frontend setup and architecture**:
- Migrated the frontend to Next.js and wired all components into the framework
- Set up routing for `/login`, `/register`, `/dashboard` with protected route guards that redirect unauthenticated users
- Integrated the **shadcn/ui component library**

**Authentication UI and state management**:
- Built the **auth UI with sliding tab animations** (auth/page.tsx)
- Created the **Auth Context** (auth-context.tsx) for managing JWT tokens, user state, and localStorage session persistence
- Connected the frontend auth flow to the backend API with JWT token handling

**Core UI components**:
- Navbar
- Business cards
- Hero section
- CTA
- Footer
- Principles section
- Stats section

**Major rewrites and core features**:
- Map logic (Leaflet integration on directory page)
- Profile generation
- API integration fixes
- Navigation and branding (logo, favicon)
- Detail navigation
- Pagination
- Hybrid map view (cards linked to map pins)
- Recommendations UI
- Overall styling polish

### Kash's own reflection (use this for authentic voice tone-setting)

This is Kash's actual writing from the final report. Read it carefully — it shows what he genuinely values and how he frames his contribution. Pull from it for the Reflection section of the case study, in v1.1 voice (you can punch up the directness, but preserve the substance):

> "I came into this project thinking it would be like any other group assignment, but that changed. Instead of jumping straight into components I built a full design system first, fonts, palette, spacing, style guide. Nobody would grade that directly, but I trusted the process and it paid off. Once that foundation was set, everything else came together intentionally. The cards, navigation, map view and none of it was guesswork because the system was already doing the thinking for me. My teammates were genuinely collaborative. I would make a design decision and they would help bring it to life on the functional side. That back and forth made it feel like a real team effort and gave me a much better understanding of how the full stack connects. The hardest part was merge conflicts, multiple branches, different environments, things breaking for no obvious reason. If I could change one thing it would be having more time to implement. The foundation was strong and I know what I would have built on top of it with another week. But the biggest takeaway is this: when you invest early in a strong foundation, you are not wasting time. You are setting up everything that comes after it to land better. I did not expect to feel this way about a course project but I grew into it."

**Key narrative beats to surface**:
- "I built a full design system first" — the differentiator
- "Nobody would grade that directly, but I trusted the process" — discipline
- "The system was already doing the thinking for me" — proof the investment paid off
- "Merge conflicts, multiple branches, different environments" — honest difficulty
- "When you invest early in a strong foundation, you are not wasting time" — the lesson

### Teammates (acknowledge in credits)
- **Abdul Aziz Hamoui**: Project setup, full admin system (dashboard, approvals, audit log, member management), business CRUD + protected routes, data seeding + enrichment + geocoding pipelines, bug fixes, branch/PR management
- **Veeraj Mishra**: MongoDB schemas, backend development (API routes, models, middleware), frontend-backend auth integration, directory filtering + pagination logic, saved businesses + recommendations engine, API bug fixes, DevOps setup

Kash's frame for the team: "library of people, 75% chance I know them" — these are real collaborators worth naming.

---

## Project context — read before starting any task

You are working on Kash's personal portfolio at `portfolio-2026/`. Repository root has `README.md` — this is your primary onboarding document. Read it before doing anything.

- **Tagline (locked, do not soften)**: "Ambitious but executioneery"
- **Personal world**: 2am studio — warm darks, amber/cream highlights, deep navy, NOT bright cartoon, NOT neon, NOT BC Connect's clean modern palette (BC Connect screenshots are reference material for the PROJECT we're documenting, not for the SURROUNDING case study page)
- **Voice (v1.1)**: warm, reflective, declarative. Set up → hit → land. One hedge per piece max. Read `00-brief/01-voice.md` for full spec.

**Voice signatures to weave in where natural** (never force):
- "ambitious but executioneery"
- "library of people, 75% chance I know them"
- "quieter than the rest"
- "built between Dhaka and Delta"

---

## Required reading (do in this order before Task 1)

1. `/README.md` (repo root)
2. `/00-brief/01-voice.md`
3. `/00-brief/00-overview.md`
4. `/00-brief/kash-fact-sheet.md`
5. `/01-brand-book/` (entire folder)
6. `/02-wireframes/` (entire folder)
7. `/04-build/src/sections/` (note visual conventions of existing portfolio sections)
8. `/04-build/tailwind.config.js` (design tokens)
9. `/04-build/src/index.css` (global styles)

**External reference**: `https://abdulhamoui.netlify.app/projects/bc-connect` — STRUCTURAL inspiration only.

**Source documents** (if you have filesystem access to read them):
- `C:\SFU folder\SFU\Spring 26\IAT 459\Final_Project\Files\Final_IAT.pdf`
- `C:\SFU folder\SFU\Spring 26\IAT 459\Final_Project\Files\annotated-Group21_TechnicalReport-1.pdf`
- `C:\SFU folder\SFU\Spring 26\IAT 459\Final_Project\Files\IAT459_Project_Interim.pdf`

All the key facts from those documents are already embedded above in this brief. The path is for traceability and in case you need to re-verify anything.

---

## STRICT — do not touch the following

These are locked. Modifying them will damage the project.

- `04-build/src/character/*` — entire character system
- `04-build/src/companion/*` — entire companion system including `bubbleLibrary.js` (76 protected bubbles)
- `04-build/public/character/*.png` — sprite assets
- `04-build/src/App.jsx` — provider order, do not reorder
- Any spec files in `/00-brief/character-spec*.md` — authoritative, read-only for this task
- `01-brand-book/` — read-only
- `02-wireframes/` — read-only
- `00-brief/01-voice.md`, `00-brief/00-overview.md`, `00-brief/kash-fact-sheet.md` — read-only

**You MAY**: create new files in `04-build/src/pages/bc-connect/` (new directory). You may also add ONE new entry to the Work section listing IF that's needed to link to the case study page.

**You may NOT**: install new npm packages, modify `package.json`, modify build configuration files, commit or push to git.

---

## Time-tracking and reporting requirements (CRITICAL)

Update `/cowork-status-bcconnect.md` at the repo root **every 30 minutes minimum**. Non-negotiable.

**Format** (append, do not overwrite):

```
# Cowork BC Connect build — status log

## Session
Started: [ISO timestamp]
Target end: [Started + 8 hours]
Last update: [ISO timestamp]
Current task: [Section N.M - description]
Current task started: [ISO timestamp]
Elapsed total: [hours:minutes]
Productive time estimate: [hours:minutes]
Idle time / stuck: [hours:minutes]

## Timeline (append one line per ~30 min checkpoint)
- HH:MM [section] [factual one-line summary]
- ...

## Files created/modified this session
- path (lines added approx N)

## Open questions for Kash
- [list of any genuinely uncertain things — should be minimal now that ground truth is provided]

## Iteration log (if primary tasks complete before 8h)
- [refinement passes done]
```

Examples of acceptable timeline lines:
- `14:32 1.1 Read README + voice spec. Sketching hero copy.`
- `15:04 1.3 Design system showcase: palette swatches SVG done. Working on typography spec.`
- `15:37 1.5 Data normalization pipeline diagram complete (Vancouver + Surrey → unified schema, 3 stages). Starting role architecture diagram.`

Do NOT write "Working on stuff" or "Making progress."

---

## Phase structure

### Phase 0 — Orient (target: first 15 minutes)

1. Read all required files
2. Internalize Abdul's structural rhythm and Kash's ground-truth contribution list
3. Create `/cowork-status-bcconnect.md`
4. Write the one-page plan as the first status entry
5. Begin Phase 1

---

### Phase 1 — Primary build (target: hours 0:15 – 4:00)

Build the BC Connect case study page. The section list below is the recommended structure. Adjust as needed for narrative flow.

#### Section 1.1 — Hero / problem framing

- Page title: direct, in Kash's voice
- 2–3 sentence problem statement
- Subtle visual element

Example tone (do NOT use verbatim — generate your own in v1.1 voice):
> *"BC has thousands of startups. Most can't find each other. We built the directory that didn't exist."*

#### Section 1.2 — The discovery gap (problem space diagram)

- React SVG component visualizing the actual problem: scattered data sources, fragmented portals, regional invisibility
- Option A: Map-style diagram showing Vancouver vs Surrey vs other BC regions with disconnected data flows
- Option B: A "before/after" pair showing fragmented → unified
- Option C: Combine — show Vancouver Open Data + Surrey Open Data as two disconnected silos at top, BC Connect as the synthesis below
- Use Kash's palette (warm darks), `shape-rendering="crispEdges"`, no Abdul-green
- Caption in v1.1 voice

#### Section 1.3 — Kash's role & the design system narrative

THIS IS THE CENTERPIECE. Lead with the design system story.

- Open with a direct statement: something like "I built the design system before anyone wrote a component" (rephrase in v1.1 voice)
- 2–3 short paragraphs framing WHY design system first
- Use Kash's reflection text as raw material — punch up the directness, preserve the substance
- Then transition to the broader contribution list (frontend architecture, auth UI, components, map logic, etc.)

#### Section 1.4 — Design system showcase (NEW — Kash's signature contribution)

This section did not exist in Abdul's case study. This is Kash's value add to his own narrative.

Visual representation of the design system Kash built. Could include:
- **Color palette** as SVG swatches with hex values
- **Typography** spec showing font choices, weights, sizes
- **Spacing scale** showing the rhythm used throughout
- **Component primitives** that came out of the system (cards, buttons, badges)
- Pulled together as a single inline SVG "design system at a glance" diagram, OR as several smaller visuals stacked

Note: You don't have the actual hex codes / font names from the BC Connect design system in the source documents. Either:
- Generate plausible placeholders that match the spirit (modern startup directory, professional but warm) and tag with `[VERIFY-KASH]` for actual values
- OR write the section conceptually (what the system did, what components it enabled) without specific token values

Caption: a line in v1.1 voice landing the point — *something like "The system was already doing the thinking by the time we started building."*

#### Section 1.5 — Data normalization pipeline (the technical story)

The real meaty technical challenge. Make a diagram:

- **Inputs**: Vancouver Open Data (with its schema), Surrey Open Data (with its schema)
- **Process**: Normalization script — three stages: Fetch → Transform → Insert
- **Mappings**: NAICS codes → enum categories, raw addresses → standardized fields, etc.
- **Output**: Unified MongoDB Business schema

Note: This was primarily Abdul's work (data seeding + enrichment + geocoding pipelines per the documents), not Kash's. Acknowledge that honestly — frame it as "the technical foundation that made the directory work, built by Abdul, which my design system was designed to surface."

#### Section 1.6 — Three-role architecture (visual)

SVG diagram showing the three roles and what each can do:

- **Visitor** (left column): browse directory only
- **Member** (center column): + favorites, + submissions, + dashboard
- **Admin** (right column): + moderation, + member management, + audit log

Show JWT flow visually: token issued on login → carried in Authorization header → middleware verifies → role gates UI features.

Caption: in v1.1 voice. The auth UI was Kash's territory specifically (sliding tabs, AuthContext, protected routes) — call that out.

#### Section 1.7 — Responsive breakpoint strategy

Reimagined version of Abdul's "Mobile, tablet, desktop" section.

- SVG showing three viewport mockups (desktop / tablet / mobile)
- Skeleton placeholders styled in Kash's palette
- Captions: desktop hierarchy → tablet condensed → mobile stacked
- Note any honest gap: "we shipped desktop and mobile, tablet was a stretch" — actual breakpoint values are `[VERIFY-KASH]` since not in the source docs

#### Section 1.8 — User flow / journey

SVG showing the primary user journey. Given the actual feature set:

`Landing → Auth Page (sign-in/register) → Directory (browse + filter + map) → Business Detail → Favorite → Dashboard → (optional) Submit Listing → Admin Approval`

Or break it into TWO journeys: visitor browse path vs member contribute path.

Caption: one line summarizing the flow.

#### Section 1.9 — Page layouts / final product

2–4 mockup-style SVG representations of key pages:

- Landing (hero + value prop + CTA)
- Directory (cards + map hybrid)
- Business detail (industry-gradient hero + info grid)
- Dashboard (greeting + saved + recommendations) OR Admin panel (analytics + moderation queue)

Each with a one-line caption.

#### Section 1.10 — Reflection / what I'd do differently

2–3 paragraphs in v1.1 voice, anchored on Kash's actual reflection text.

Key beats to land:
- The design-system-first decision and why it paid off
- The honest hard part (merge conflicts, multiple branches, environment issues — Kash mentioned this directly)
- What he'd do with another week (he wanted more time to implement on top of the strong foundation)
- The takeaway: investing in foundation early is not wasted time

Avoid: self-deprecation that erases ("oh it wasn't really much"), over-claiming ("I single-handedly carried the team"), and platitudes.

#### Section 1.11 — Credits

Acknowledge the team honestly:
- Abdul Aziz Hamoui — admin system, backend protected routes, data pipelines
- Veeraj Mishra — backend architecture, MongoDB schemas, API routes
- Course: IAT 459, SFU SIAT

Use the "library of people" signature if it fits naturally.

#### Technical implementation notes

- Page route: `04-build/src/pages/bc-connect/index.jsx` (or match existing routing pattern)
- File structure:
  ```
  04-build/src/pages/bc-connect/
  ├── index.jsx
  ├── sections/
  │   ├── Hero.jsx
  │   ├── DiscoveryGap.jsx
  │   ├── Role.jsx
  │   ├── DesignSystem.jsx           ← NEW vs Abdul's structure
  │   ├── DataPipeline.jsx           ← NEW vs Abdul's structure
  │   ├── ThreeRoles.jsx
  │   ├── Responsive.jsx
  │   ├── UserFlow.jsx
  │   ├── Layouts.jsx
  │   ├── Reflection.jsx
  │   └── Credits.jsx
  └── diagrams/
      ├── DiscoveryGapMap.jsx
      ├── DesignSystemShowcase.jsx
      ├── DataPipelineFlow.jsx
      ├── ThreeRolesMatrix.jsx
      ├── BreakpointStrategy.jsx
      ├── UserJourney.jsx
      └── PageLayout.jsx
  ```
- Tailwind classes matching existing portfolio conventions
- Inline React SVG components, not external .svg files
- framer-motion for reveals matching the rest of the site

---

### Phase 2 — Iteration (target: hours 4:00 – 6:00)

If Phase 1 finishes early, do NOT stop. Iterate in priority order:

1. **Voice polish**: re-read every line. Tighten against v1.1 spec. Remove saccharine, hedging, jargon. Make sure Kash's "design system first" narrative is the through-line.
2. **SVG polish**: thumbnail readability, color contrast, consistent stroke widths, no anti-aliasing artifacts.
3. **Structural review**: read top-to-bottom as a visitor. Does the narrative flow? Setup → tension → resolution? Move sections if needed.
4. **Technical hygiene**: lint mental model, Tailwind tokens not arbitrary values, accessibility basics, three-breakpoint check.

---

### Phase 3 — Stretch (target: hours 6:00 – 8:00)

1. Draft a Work section listing blurb for BC Connect (1–2 sentences, v1.1 voice, frames the project before visitor clicks in)
2. Generate additional supporting diagrams (admin panel architecture, recommendation engine logic flow, etc.)
3. Write a one-pager `supporting-content.md` summary in v1.1 voice
4. If still time after #1–#3: do a fourth iteration pass on copy polish

Do NOT, during Phase 3:
- Touch other case study pages
- Touch character system
- Touch brand book
- Begin work on the previous queue's tasks (separate run)

---

## Stop conditions — pause and finalize

Stop and write final report if ANY trigger fires:

1. **8 hours elapsed** — stop, finalize
2. **Need to modify a protected file** — never do; document, continue with what's possible
3. **Need to install npm package** — stop, document
4. **Need to override a locked brand decision** — don't; document, use default framing
5. **Complete Phase 3 before hour 8** — write final report, then either start a 4th iteration pass on copy polish OR idle until time limit (NOT manufacture work that hurts quality)
6. **Hit unresolvable blocker** — document in detail, mark for Kash's return

### Final report format

```
## Final report
End time: [ISO timestamp]
Total elapsed: [hours:minutes]
Productive time: [hours:minutes]
Idle time: [should be near zero]
Sections completed: [list]
Sections in draft: [list]
Files created: [count, with paths]
Files modified: [count, with paths]
Lines of code added: [approx]
Open questions for Kash: [count, list]
Iteration passes completed: [count]
What I'd do next: [bullets]
Status of Phase 1 / 2 / 3: [complete / partial / not started]
```

---

## Anti-patterns — do NOT do any of these

- ❌ Do NOT modify any file in the strict don't-touch list
- ❌ Do NOT copy Abdul's content verbatim — structural inspiration only
- ❌ Do NOT use Abdul's green palette — use Kash's warm 2am-studio palette
- ❌ Do NOT pivot visual style mid-build
- ❌ Do NOT overclaim Kash's contributions beyond what's documented (design system + frontend architecture is the truth — don't expand it to "everything was Kash")
- ❌ Do NOT underclaim either — the design system contribution is genuinely the differentiator, lead with it confidently
- ❌ Do NOT install npm packages
- ❌ Do NOT modify character/companion/spec systems
- ❌ Do NOT use saccharine voice — v1.1 register only
- ❌ Do NOT sit idle when a phase finishes early — iterate
- ❌ Do NOT exceed 8 hours — stop at limit, document state
- ❌ Do NOT skip 30-minute status updates
- ❌ Do NOT commit or push to git

---

## Expected outputs

When Kash returns, he should see:

**Code outputs** (in `04-build/src/pages/bc-connect/`):
- `index.jsx` — main page, ~11 sections wired
- `sections/` — 11 section component files
- `diagrams/` — 7+ SVG diagram components

**Documentation**:
- `/cowork-status-bcconnect.md` — full timeline + final report

**Optional Phase 3**:
- `04-build/src/pages/bc-connect/supporting-content.md`
- Additional diagram components
- Work section listing blurb (as markdown for Kash to paste)

---

## After-action (informational — not your job)

When Kash returns, he'll review the status log, spot-check open questions, spin up the dev server, view the page at `/projects/bc-connect`, and iterate further in Cursor.

---

## A final note on quality vs efficiency

Kash explicitly said: *"don't be 100% efficient and waste time."*

- Don't sprint to finish early and idle — wasted hours
- Don't perfectionist on one section while others go undrafted
- Calibrate: solid v1 across all sections in Phase 1, polish in Phase 2
- Iteration IS the work, not filler. Treat it as the same craft as the initial build
- If genuinely done with quality work and time remains: stretch tasks. Don't manufacture work that hurts quality. But don't stop either.

Ideal end state at hour 8: complete polished case study page, consistent voice, tight SVG diagrams, minimal flagged uncertainties, clean status log.

---

*Begin Phase 0 now. First action: create `/cowork-status-bcconnect.md` with session-start timestamp.*
