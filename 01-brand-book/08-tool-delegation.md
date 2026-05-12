# 08 — Tool Delegation

> Which tool runs which job in the build, with rationale. Kash is the conductor. Each tool has one job it's best at; assigning correctly means none of them get stretched into work they don't belong in.

---

## The principle

Kash's working framing — pulled directly from the chat — is *"AI as creative direction, not as tool."* That framing applies to delegation, too.

Each tool below isn't a generic LLM wrapper or coding assistant. Each one has a specific shape, and the work assigned to it should fit that shape. Misassigning is the most common mistake — telling Cowork to plan strategy, telling Claude chat to run multi-step doc production, telling Antigravity to write companion copy. All of those *can* happen, but they're worse fits than the right tool.

---

## The tool map

| Job | Tool | Why this tool | Where the output goes |
|-----|------|---------------|------------------------|
| Brand strategy + companion prompt iteration + live ideation | **Claude chat** | Multi-turn back-and-forth, fast course-correction, holds full context within a session | This brand book (via the chat that produced it) · companion prompt iterations |
| Brand book document production (this) | **Claude Cowork** | Reads a folder of inputs, produces structured deliverables across many files, holds the inputs as ground truth | `/portfolio-2026/01-brand-book/` |
| Long-form section copy (Voice / Origin / People / Process) | **Claude Cowork** | Same reason — multi-file, ground-truth-respecting, voice-locked | The actual section copy, written into `/04-build/` content files |
| Visual mood / direction exploration (first-pass) | **Gemini** + **Stitch** | Fast image generation for mood, layout exploration, "what does a 2am studio site feel like" experiments | Mood boards, first-pass layouts → `/03-design/` |
| Hi-fi design system | **Figma** (Stitch first-pass → manual refinement) | Stitch generates starter layouts, Figma is where craft happens | `/03-design/` final files |
| Frontend build (React + Tailwind + framer-motion) | **Antigravity** | Kash has shipped with it (BC Connect), knows how it wants to be used, agentic AI coding fits the iterative-planning style | `/04-build/` repo |
| Companion logic (LLM-powered annotations) | **Claude API** wired into the React app | The companion *is* an LLM, but lives behind a constrained prompt + bubble library | Within the React app — `companion/` module |
| Hall of Fame backend (intake + curation + display) | **Claude Code** | API + DB layer is exactly Claude Code's shape — it's CLI-driven backend work | Backend repo or backend module within the React app |
| Image / asset organization | **Cowork** or **Claude chat** | Cowork for batch organization, chat for ad-hoc decisions | `/00-brief/refs/` and `/04-build/public/` |
| Audio / sound asset prep | **Manual** (DAW — Logic / Reaper / Audition) | This is craft work; AI doesn't add value here. Kash's existing skill handles it | `/04-build/public/sound/` |
| Voice / video clip recording | **Manual** + **iPhone / mirrorless** | Real footage for the idle layer needs Kash actually shooting | `/00-brief/refs/personal/` and `/04-build/public/video/` |

---

## Per-tool detail

### Claude chat

**Used for:** strategic forks, voice calibration, companion prompt engineering, "let's think through this" moments.

**What it's good at:**
- Holding multi-turn context across an evolving idea
- Catching when an answer is wrong and pivoting fast
- Generating multiple options and surfacing trade-offs
- Working at the *thinking* level — before something becomes a deliverable

**What it's not good for in this build:**
- Multi-file structured output (Cowork is better — Cowork can read a folder and write a folder; chat is one-conversation)
- Anything that requires reading actual files from disk (chat can read what you paste; Cowork reads what's in the folder)
- Long-running asynchronous tasks

**Rule for Kash:**
Bring strategic forks here. Bring voice calibration here. Bring the companion prompt iteration here. Don't bring multi-file production to chat — kick those to Cowork.

---

### Claude Cowork

**Used for:** brand book production (this), long-form section copy, batch document tasks.

**What it's good at:**
- Reading a folder of source material and producing structured deliverables
- Holding inputs as ground truth across many files
- Following a brief and asking before deviating
- Producing multi-file output that cross-references coherently

**What it's not good for:**
- Strategic ideation (chat is better)
- Real-time iteration on a single sentence (chat is better)
- Tasks where the source material isn't yet in a folder (chat is better — gather first, then hand off)

**Rule for Kash:**
Cowork runs when the source material is collected and the goal is a structured, multi-file output. The brand book is a textbook Cowork task. Future Cowork tasks: writing the actual long-form copy for each section, drafting the README for the build repo, producing a press one-pager or media kit if needed.

**Kickoff discipline:**
- Always read the brief + transcript + supporting files before producing
- Ask before fabricating
- Flag gaps as `[NEEDS KASH INPUT]`, never invent

---

### Antigravity

**Used for:** the React + Tailwind + framer-motion frontend build.

**What it's good at:**
- Agentic coding — give it a feature, it ships the feature
- Working with Kash's iterative planning style — plans first, then executes
- The kind of multi-file frontend work where there's a design spec to follow
- Kash already has BC Connect under his belt, so this isn't a new tool

**What it's not good for in this build:**
- Backend work (Claude Code is better for that)
- Companion content / copy (the words come from this brand book, not from Antigravity)
- Visual design from scratch — needs a Figma file or detailed spec to build against

**Rule for Kash:**
Antigravity ships features against a spec. The spec is this brand book + the Figma file. If something isn't specified, the answer is *"go back to chat or bring it to Kash"* — not *"have Antigravity guess."*

**v1 features Antigravity ships:**
- Modular section architecture (8 sections)
- Visitor identity flow (name + color onboarding)
- Companion module (cursor-attached bubbles, library-driven)
- Idle layer (12s trigger, reel surfaces)
- Hall of Fame public display + submission UI
- Persistence (localStorage)
- Mobile adaptation
- Footer (changelog, secret, sign-off, land acknowledgment, links)

---

### Claude Code

**Used for:** the Hall of Fame backend, any other CLI / API / DB-layer work.

**What it's good at:**
- Backend services — APIs, databases, auth flows
- CLI tooling
- Migrations, scripts, infrastructure
- Working in a terminal-first context

**What it's not good for in this build:**
- Frontend (Antigravity is better)
- Strategy (chat)
- Long-form copy (Cowork)

**Rule for Kash:**
Claude Code handles the backend half of the Hall of Fame and any other infra (deploy scripts, CMS-lite if Voice / Eye need a way for Kash to add content without touching code, etc.).

**v1 services Claude Code builds:**
- Hall of Fame submission API
- Hall of Fame admin / triage UI
- Email notification on submission (Resend or SendGrid)
- Visitor identity persistence layer (sync between localStorage and server-side mirror)
- Auth for admin endpoints (single Kash login)

---

### Stitch + Gemini

**Used for:** first-pass visual exploration. Mood boards. Layout experiments.

**What they're good at:**
- Generating dozens of variations quickly
- Surfacing aesthetic directions Kash might not have considered
- Cheap iteration on mood before Figma
- Visual brainstorming — *"what does a 2am studio look like as a hero treatment"*

**What they're not good for:**
- Final hi-fi design (Figma + manual is better)
- Anything that needs to ship to production
- Voice / copy work
- Anything specified in detail by the brand book (the world is locked to 2am studio; Stitch shouldn't be asked to explore alternatives)

**Rule for Kash:**
Use these for *first-pass exploration only.* They generate mood. Figma turns mood into design. Antigravity turns design into code. The order matters.

---

### Figma

**Used for:** the hi-fi design system, the actual screens visitors will see, the spec Antigravity builds against.

**What it's good at:**
- Final design craft
- Component-level system thinking
- Communicating intent to the build phase
- Being the single source of truth for design

**Rule for Kash:**
Figma file structure should mirror the build:
- `00-foundations/` — type, color, motion, grid
- `01-components/` — buttons, cards, companion bubble, prompt UI
- `02-sections/` — Home, Voice, Eye, Work, Process, People, Origin, Hall of Fame
- `03-flows/` — onboarding, submission, returning visit
- `04-mobile/` — adapted layouts
- `05-explorations/` — Stitch outputs, Gemini outputs, dead ends

Antigravity builds against `01-components/` and `02-sections/`. The rest are reference.

---

### Claude API (in the React app)

**Used for:** the companion's runtime logic (if Kash chooses LLM-powered bubbles in v2).

**What it's for:**
- v1 (recommended): the companion is scripted from the bubble library in `04-companion-spec.md`. No live LLM call. Cheaper, deterministic.
- v2 (later): LLM-powered annotations. The companion asks Claude in real time, with the bubble library as few-shot voice anchor and the trigger context as the prompt input.

**Rule for Kash:**
v1 ships scripted. v2 adds LLM-powered. Don't try to ship LLM-powered in v1 — it adds latency, cost, and unpredictability without proportional brand benefit when the bubble library is the actual voice.

---

## How the tools interact in a typical week

A working week during the build phase, illustrative:

**Monday — Strategy / planning**
Kash and Claude chat: refine the companion's tone for the People section. Decide whether to ship the Hall of Fame admin UI as a Notion-style page or a custom one. Bring 2-3 forks to a clean conclusion.

**Tuesday — Visual exploration**
Kash + Stitch + Gemini: explore three hero treatments. Pick one direction. Save outputs in `/03-design/05-explorations/`.

**Wednesday — Hi-fi design**
Kash in Figma: refine the chosen hero. Build out the visitor identity onboarding modal. Component the companion bubble.

**Thursday — Build**
Kash + Antigravity: ship the onboarding flow + companion bubble component. Wire to localStorage. Test against the spec in `04-companion-spec.md`.

**Friday — Backend**
Kash + Claude Code: build the Hall of Fame submission API. Wire email notifications. Test rate limit.

**Friday evening — Document**
Kash + Cowork: produce the `/04-build/README.md` for the repo, summarize this week's changes, update the changelog file.

That's the orchestration. None of the tools touch each other directly; Kash is the routing layer.

---

## Anti-patterns in delegation

Things that go wrong when tools get misassigned:

1. **Asking Cowork to ideate from scratch.** Cowork's strength is multi-file production from existing source material. If you bring it a blank folder, it produces filler.
2. **Asking chat to write 10 long files in one session.** Chat is for thinking, not for production at scale. Hand to Cowork.
3. **Asking Antigravity to write copy.** Antigravity ships features. The copy belongs in this brand book or in Cowork's output, then handed to Antigravity to render.
4. **Asking Stitch to do hi-fi.** Stitch is for first-pass mood. Figma is where final design happens.
5. **Asking Claude Code to do frontend work.** It can, but Antigravity is better at frontend. Keep Claude Code on backend / infra.
6. **Asking the Claude API to write fresh companion bubbles per visit at runtime in v1.** Adds cost and latency for no proportional brand benefit. Use the scripted library.
7. **Bringing strategic forks to Cowork.** Cowork is good at executing the strategy that's already been decided. Don't ask it to make strategic decisions; it'll either invent badly or proliferate `[NEEDS KASH INPUT]` markers everywhere.

---

## When in doubt — the routing question

If Kash isn't sure which tool to use, the routing question is:

**"What kind of work is this?"**

- *Thinking through* something → chat
- *Producing structured docs* from existing source → Cowork
- *Generating visual mood* fast → Stitch / Gemini
- *Doing final design craft* → Figma + manual
- *Building frontend features* → Antigravity
- *Building backend / API* → Claude Code
- *Adding a runtime LLM call* → Claude API in the app

If the work is more than one of these, route the first part to the right tool and chain. Don't try to do all of it in one place.

---

## Cross-references

- `04-companion-spec.md` — the bubble library that Antigravity wires into the React app
- `05-wow-mechanics.md` — the integration spec across visitor identity, companion, idle layer, return reward
- `06-visual-direction.md` — the visual spec that Figma renders out
- `07-hall-of-fame-spec.md` — the spec Claude Code builds the backend against
- `09-execution-roadmap.md` — the phased plan that ties tools to deliverables in time order

---

*End of tool delegation. Continue with `09-execution-roadmap.md`.*
