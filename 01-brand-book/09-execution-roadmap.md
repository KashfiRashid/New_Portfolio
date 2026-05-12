# 09 — Execution Roadmap

> Phased plan to get from this brand book to a shipped site. Rough timelines, dependencies, definition of done per phase. The point isn't to be precise about dates; the point is to make the order legible so Kash knows what to work on when.

---

## The framing

Kash graduates June 10, 2026. The site doesn't have to ship by then, but momentum matters. Two of Kash's references (Harjot, Keyaan) are at the same school on similar timelines — differentiation depends on shipping a site that's distinctive, not just on the *idea* of a distinctive site.

The plan below assumes ~6 phases, each with a clear definition of done. Phases overlap where they can; some are sequential by hard dependency.

**Working principle:** ship phase 1 cleanly, redline, ship phase 2 cleanly. Don't run all phases in parallel — that's how restraint slips.

---

## Phase overview

| Phase | What ships | Tools | Approximate effort |
|-------|------------|-------|---------------------|
| 1. Brand book | This folder, redlined and locked | Claude chat + Cowork | 1–2 weeks |
| 2. Wireframes | Low-fi sketches of all 8 sections + key flows | Figma or paper | 1 week |
| 3. Visual exploration | Mood, color, type pinned | Stitch + Gemini → Figma | 1–2 weeks |
| 4. Hi-fi design | Component library + section designs | Figma | 2–3 weeks |
| 5. Build | Frontend + backend + companion + Hall of Fame | Antigravity + Claude Code | 3–5 weeks |
| 6. Polish + launch | QA, content fill, soft launch | All tools | 1–2 weeks |

**Total rough range:** 9–15 weeks from brand-book-locked to shipped. Variance depends on how much raw material has to be created from scratch (photos, video, sound clips) and how much existing material gets repurposed.

---

## Phase 1 — Brand book (current)

**Goal:** A locked source-of-truth document that informs every downstream phase.

**Deliverables (this folder):**
- `00-overview.md` ✓
- `01-voice.md` ✓
- `02-content-well.md` ✓
- `03-architecture.md` ✓
- `04-companion-spec.md` ✓
- `05-wow-mechanics.md` ✓
- `06-visual-direction.md` ✓
- `07-hall-of-fame-spec.md` ✓
- `08-tool-delegation.md` ✓
- `09-execution-roadmap.md` (this file)
- `README.md` (next)

**Definition of done:**
- All 11 files in `/01-brand-book/` exist and cross-reference coherently
- All blocking `[NEEDS KASH INPUT]` markers (A1, A2 from `questions-for-kash.md`) are resolved
- Kash has redlined v1 and the redlines are merged into v2
- Kash signs off — the brand foundation, voice, architecture, companion spec, wow mechanics, visual direction, Hall of Fame mechanics, and tool delegation are decided

**Things that do NOT block phase 1 completion** (but get filled in over time):
- Seido / Spendy URLs and specifics in `02-content-well.md` and `06-visual-direction.md`
- Full raw material inventory (Q F)
- Hall of Fame curation cadence (Q E2)
- Personal-world specific imagery picks
- Some companion bubbles' final wording
- Friend / teammate consent confirmations (Q D)

These can be `[NEEDS KASH INPUT]` markers in the brand book and get filled progressively.

**Effort:** 1–2 weeks. Most of the work is Kash redlining v1 and answering the open questions.

---

## Phase 2 — Wireframes

**Goal:** Low-fi structural sketches of every section + every key flow. The point isn't aesthetic decisions yet; the point is hierarchy, proportion, and information flow.

**Deliverables:**
- Wireframe per section (8 sections)
- Wireframe for the visitor identity onboarding flow
- Wireframe for the companion bubble at multiple scales (cursor-attached, mobile-toast)
- Wireframe for the Hall of Fame submission flow (Lego-brick prompts)
- Wireframe for the Hall of Fame public log
- Wireframe for footer (changelog, secret, sign-off, links)
- Wireframe for mobile adaptations of each section

**Tool:** Figma (low-fi page) or paper sketches photographed and saved to `/02-wireframes/`.

**Definition of done:**
- Every section has at least one wireframe
- Every key flow (onboarding, submission, return-visit) has a frame sequence
- Mobile adaptations exist for every section
- Kash has reviewed and approved the structural decisions

**Dependencies:** Phase 1 locked.

**Effort:** ~1 week.

---

## Phase 3 — Visual exploration

**Goal:** Pin the visual direction. Mood. Color palette finalized. Type stack picked. Motion principles confirmed.

**Deliverables:**
- Mood board for the 2am studio world (Stitch + Gemini outputs, curated)
- Color palette finalized — surface, text, accent, visitor palette (8–10 colors)
- Type stack picked — body, display, mono, Bangla
- Motion principles confirmed (timing, easing, amplitude)
- 3–5 hero treatment explorations
- Reference annotations updated in `references-annotated.md` (Seido / Spendy specifics filled in)

**Tools:** Stitch + Gemini for first-pass exploration; Figma for the final palette + type system.

**Definition of done:**
- `06-visual-direction.md` has all `[NEEDS KASH INPUT]` markers in color and type sections resolved
- The mood board is locked — anything inconsistent with it gets rejected in phase 4
- Kash has signed off on the direction

**Dependencies:** Phase 1 locked. Phase 2 wireframes exist (so the visual direction has structure to apply to).

**Effort:** ~1–2 weeks.

---

## Phase 4 — Hi-fi design

**Goal:** Production-ready Figma file Antigravity can build against.

**Deliverables in Figma:**
- `00-foundations/` — type system, color tokens, motion specs, grid
- `01-components/` — every reusable component (button, card, companion bubble, prompt input, name + color onboarding modal, project card with inline video, Hall of Fame entry card, Lego-brick prompt UI, etc.)
- `02-sections/` — every section designed at hi-fi for desktop and mobile (8 sections × 2 = 16 design files minimum)
- `03-flows/` — onboarding, submission, returning-visit, exit-intent flow sequences
- `04-mobile/` — full mobile design system
- Asset exports — icons, illustrations, any custom graphics ready for build

**Tool:** Figma. Stitch for first-pass exploration only — final craft happens manually.

**Definition of done:**
- Every wireframe from phase 2 has a corresponding hi-fi design
- Component library is consistent — no one-off components that should be reusable
- Mobile designs exist for every section
- Antigravity has a clear spec to build against
- Kash has redlined and approved

**Dependencies:** Phase 3 locked.

**Effort:** ~2–3 weeks. This is the most craft-intensive phase.

---

## Phase 5 — Build

**Goal:** A working site that ships everything specified in this brand book.

**Sub-phases (run roughly in parallel where possible):**

### 5a. Frontend foundation (Antigravity)
- Project scaffold (React + Tailwind + framer-motion)
- Routing structure (8 sections + Hall of Fame submission + admin routes)
- Component library from Figma `01-components/`
- 2am studio world visual baseline applied across all sections

### 5b. Visitor identity flow (Antigravity)
- Onboarding modal / inline prompt
- Color assignment (deterministic from name hash)
- Cursor color application across whole site
- localStorage persistence (per Q B3 decision)
- Edge cases — skip, change name, long names, special characters

### 5c. Companion module (Antigravity)
- Bubble component (visual treatment per `06-visual-direction.md`)
- Trigger system (entry, hover, click, scroll, idle, exit-intent, returning)
- Bubble library wired in from `04-companion-spec.md` (scripted v1 — no LLM call)
- Frequency rules and cooldowns
- Mobile toast pattern

### 5d. Idle layer (Antigravity)
- 12s idle detection
- Reel surface — fade + 8px translate
- Playlist of clips, rotation logic
- Sound handling — muted with caption by default
- Exit on cursor movement

### 5e. Hall of Fame (Claude Code backend + Antigravity frontend)
- Submission API
- Rate limiting (1/24h per visitor)
- Email notifications (Resend or SendGrid)
- Admin triage UI (auth-gated)
- Public log page with filter/sort
- Visitor identity sync (localStorage ↔ server)

### 5f. Footer + miscellaneous (Antigravity)
- Changelog display
- Secret footer reveal
- Personal sign-off
- Land acknowledgment
- Email + LinkedIn + Hall of Fame links
- "Powered by Claude" small label

**Definition of done:**
- All components from Figma are built
- All flows work end-to-end (onboarding, submission, return-visit, exit-intent)
- Mobile works
- localStorage persistence works
- Hall of Fame submission flow + admin triage flow both work
- Companion bubbles fire at the right triggers, with the right cooldowns
- Idle reel surfaces correctly and only once per session
- Visual world matches `06-visual-direction.md` — restraint principle holds
- Voice on the page matches `01-voice.md` — no anti-patterns slipped in

**Dependencies:** Phase 4 locked. Raw material (photos, video, sound clips) at least partially gathered.

**Effort:** ~3–5 weeks. Variable based on how much new raw material needs to be created.

---

## Phase 6 — Polish + launch

**Goal:** A site Kash is proud to send to people.

**Deliverables:**
- QA pass — every section, every flow, every device, every browser
- Content fill — replace any remaining placeholder copy with final, voice-locked text
- Asset finalization — final video clips, final photo selections, final Bangla copy in Origin
- Performance pass — load times, image optimization, font loading
- Accessibility pass — keyboard nav, screen reader, reduce-motion, color contrast
- Soft launch — Kash sends it to a small group (5–10 people across friends, peers, target audiences) for redlines
- Final redlines applied
- Public launch — domain decision shipped (per Q E1), old site retired or archived
- Kash announces the new site — LinkedIn post, possibly a small writeup

**Definition of done:**
- Site is live at the chosen domain
- Old site behavior matches Q E1 decision (retired / archived / parallel)
- Hall of Fame is empty but the mechanism is live and tested
- First idle reel content is in place
- Convocation moment (June 10) is either represented or queued for representation
- Kash has sent the link to the soft-launch group and incorporated their feedback
- A small launch post is published

**Dependencies:** Phase 5 complete.

**Effort:** ~1–2 weeks.

---

## Critical-path dependencies

The hard dependencies — things that block downstream work:

1. **A1 + A2 answers (personal world + LinkedIn post)** block phase 1 completion.
2. **Phase 1 brand book locked** blocks phases 2 and 3.
3. **Phase 2 wireframes** block phase 4 hi-fi design.
4. **Phase 3 visual direction locked** blocks phase 4 hi-fi design.
5. **Phase 4 hi-fi design** blocks phase 5 build.
6. **Raw material (photos, video, sound clips)** blocks phase 5 idle layer + Eye section.
7. **Hall of Fame backend** blocks phase 5 Hall of Fame submission.
8. **Phase 5 build complete** blocks phase 6 launch.

The biggest under-the-radar dependency is **raw material gathering.** It's not a phase; it's a parallel track that runs from phase 1 to phase 5. If Kash hasn't been collecting screen recordings, desk photos, sound clips, etc., the idle layer and Eye section will be thin at launch.

> `[NEEDS KASH INPUT: when does the raw material gathering start? Recommend: now. Phase 1.]`

---

## Roughly when phases happen (assuming start = "today")

This is illustrative — Kash adjusts based on actual capacity. Two-week phase 1 + sequential phases puts launch in the **8–14 weeks from start** range. School commitments (final year, IAT459 / IAT460 etc.), IT Squad work, and convocation week (June 10 ± 5 days) compress or expand.

| Week | Phase |
|------|-------|
| 1–2 | Phase 1 (brand book lock) |
| 3 | Phase 2 (wireframes) |
| 4–5 | Phase 3 (visual exploration) |
| 6–8 | Phase 4 (hi-fi design) |
| 9–13 | Phase 5 (build) |
| 14–15 | Phase 6 (polish + launch) |

If Kash wants the site live *before* June 10 convocation, this needs ~14 weeks of starting before mid-March. If after convocation is acceptable, the timeline relaxes.

---

## What can compress the timeline

- **Stricter scope.** v1 ships with fewer companion bubbles, fewer idle reels, only 4–5 featured projects instead of 7. Iterate after launch.
- **Skip Hall of Fame backend in v1.** Launch with the Hall of Fame as a "coming soon" placeholder + a manual Google Form. Build the proper backend in v2.
- **Reuse current site assets.** Pull existing project copy and case studies forward where they hold up.
- **Skip visual exploration phase.** Lock the 2am studio direction immediately, go straight to Figma. Loses some craft, gains 1–2 weeks.

## What can extend the timeline

- **Raw material isn't ready.** No 2am screen recordings, no desk photos, no BLU-0:42-clip prepped — adds weeks.
- **Voice doesn't land in v1.** If the voice reads polished-corporate after build, it needs a copy rewrite pass.
- **Hall of Fame is over-engineered.** v1 Hall of Fame backend should be Supabase + 3 endpoints. Anything more is scope creep.
- **Visual direction stays in exploration too long.** Stitch + Gemini are infinite; cap exploration at ~2 weeks and commit.
- **Mobile gets deferred to "later."** Designing desktop-first then retrofitting mobile takes ~50% longer than designing both in phase 4.

---

## Definition of done — the whole site

When the site is ready to be done with, all of the below are true:

- The hero line is *"ambitious but executioneery"* or its locked remix. It's not been softened.
- The first 30 seconds of a visit produce the feeling: *"this guy actually thinks about people."*
- The companion has surfaced 1–2 bubbles and they read in Kash's voice.
- The visitor has a name and a color.
- The visitor can find their way through 8 sections, each with substance.
- The Hall of Fame is live, even if empty.
- The site visibly says *"this is a 2am studio world,"* not *"this is a designer's portfolio template."*
- A returning visitor gets recognized by the companion.
- The Bangla shows up in Origin selectively, not decoratively.
- Kash can show this to 10 people from different audiences (recruiter, peer designer, family member) and each one finds something specific to them.

---

## What happens after launch

- **Hall of Fame fills in.** Real submissions, real shipped changes, real changelog. The site evolves.
- **Idle reels get added.** Convocation footage. New project clips. Voice notes from a particular night.
- **Voice page expands.** New takes. Possibly converted LinkedIn posts.
- **Work section adds new projects** as Kash ships them post-graduation.
- **Companion library grows.** New bubbles for new projects, new returning-visitor lines for recognized regulars.
- **v2 considerations:** LLM-powered companion bubbles (instead of scripted), more Hall of Fame filters, multi-language toggles, etc.

The site is alive. The brand book stays the source of truth — it gets updated as decisions evolve, and downstream phases reference the updated version, not their original snapshot.

---

*End of execution roadmap. Continue to `README.md` for the brand book index and consolidated open-questions list.*
