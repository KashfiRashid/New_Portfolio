# COWORK BRIEF — Kashfi Rashid Portfolio 2026

> **Read this first.** Then read the chat transcript provided alongside. Then read this again. Don't start producing files until you've done all three. The chat is the *thinking*; this brief is the *operating instructions*.

---

## 1. What you're producing

A complete **Brand Book** for Kashfi's new portfolio site (working name: `portfolio2026`).

Final deliverable: a folder of markdown files plus a `/refs/` subfolder of reference images and assets, that designers and developers will use to build the new kashfirashid.com.

**The Brand Book is NOT the website.** It's the source-of-truth document that defines voice, visual system, content, and interactive principles *before* any visual design or code happens. Wireframes, hi-fi design, build, and companion logic all reference this brief.

If anything in this brief contradicts something in the chat transcript, the chat transcript wins — it has more nuance.

---

## 2. How to read this brief

Read in this order:

1. The **chat transcript** (provided as a separate file or pasted into the folder by Kash) — context for every claim below
2. **This brief** — operating instructions
3. The **reference materials** in `/refs/` — what informs voice, visual, and interactive direction

When in doubt, **ask Kash before assuming.** Don't fill gaps with stock brand-book filler. Every claim in the final brand book should trace back to either the chat, the references, or an explicit Kash answer to an open question.

---

## 3. Operating principles (apply throughout)

- **Restraint over flash.** No "AI-generated-looking" UI language. No mesh gradients, glassmorphism for its own sake, auto-bouncing reveals, generic Lottie loaders. Kash's design north stars are Seido and Spendy/FutureSpend — that's the bar for restraint.
- **Iterative and thoughtful.** Plan before producing. Don't generate sections that don't apply to Kash just because brand books "usually have them."
- **Specifics over adjectives.** *"Friend"* is weak. *"Sazzad — close friend of nine years, the one I wrote a refugee protection support letter for"* is the standard.
- **People's-person evidence.** Whenever a section makes an abstract claim ("warm," "helps people," "thinks about users"), produce a structurally proof-able version — named people, real moments, quotes.
- **Voice is Tazwar Tarik–adjacent.** Warm, reflective, slightly understated. Confident but not declarative-shouting. Lowercase casual when natural, not as a tic. (Full voice spec below.)
- **Don't oversell.** If a project went well, say so plainly. If it was messy, say that too. Honesty over polish.

---

## 4. Deliverable structure (the files you will produce)

Produce a folder `/portfolio-2026/01-brand-book/` containing these files. Each is standalone-readable but cross-references the others where relevant.

| # | File | Purpose |
|---|------|---------|
| 0 | `README.md` | Map of the brand book, summary of open questions blocking each downstream phase |
| 1 | `00-overview.md` | Executive summary: who this brand is, what makes it different from every other designer portfolio |
| 2 | `01-voice.md` | Voice principles, do/don't, sample sentences in Kash's voice for hero, about, project descriptions, companion bubbles |
| 3 | `02-content-well.md` | The full content pool — moments, quotes, named people, obsessions, opinions, with `[NEEDS KASH INPUT]` callouts where source material is missing |
| 4 | `03-architecture.md` | Final site sections, what lives in each, navigation hierarchy, IA logic |
| 5 | `04-companion-spec.md` | Detailed companion behavior spec, full bubble script library (target 50+ bubbles across triggers), tone calibration, visual treatment notes |
| 6 | `05-wow-mechanics.md` | Visitor identity flow (name + color + cursor), companion trigger logic, idle layer behavior, all three "wow" levers integrated |
| 7 | `06-visual-direction.md` | Personal world direction, color principles, type candidates, motion principles, references annotated with what to borrow / what to reject |
| 8 | `07-hall-of-fame-spec.md` | Hall of Fame mechanics: visitor submission flow, Kash's curation flow, public display, data model sketch |
| 9 | `08-tool-delegation.md` | Map of which tool runs which task in the build (Antigravity / Stitch / Gemini / Claude chat / Claude cowork / Claude code), with rationale |
| 10 | `09-execution-roadmap.md` | Phased plan with rough timelines, dependencies, definition of done per phase |

When all files exist, write `README.md` last — it summarizes what's in each, which open questions are blocking which downstream phases, and what Kash needs to provide next.

---

## 5. Brand foundation (locked — do not redesign these)

These came from the chat. Treat them as decided. Don't generate alternatives unless Kash explicitly asks.

- **Tagline candidate:** *"Ambitious but executioneery."* This is Kash's own phrase from the chat. Pin it. It's a strong contender for the homepage hero, the companion's first words, or a section header. **Do not replace it with something more "professional-sounding."** That would be the wrong instinct here.
- **Core feeling for visitors:** *"This guy actually thinks about people."* Not "professional," not "creative" — that specific feeling. Every section should be tested against whether it reinforces that feeling.
- **Style principles:** Iterative, thoughtful, plans before executing. Ambitious *and* executes — most people are one or the other, Kash is both, and that contradiction is part of his identity. Helps people in every aspect possible.
- **Obsessions to surface:** Football (especially Bangladeshi diaspora players and BFF international recruitment), AI as creative direction (not as a tool — the framing matters), sound art and sound management.

---

## 6. Voice

Kash's voice is similar to **Tazwar Tarik's writing**: warm, reflective, slightly understated. Confident but not loud. Kash has ghostwritten in Tazwar's voice for ENGL101 assignments at Yorkville University, which means his voice and Tazwar's are genuinely close — this is not a stretch comparison.

### Voice characteristics

- **Lowercase-casual when it fits the moment**, not as an across-the-board affectation. Use lowercase for asides and hot takes; switch to sentence case for declarations and bios.
- **Sentences that turn back on themselves** — "I always thought X was Y, until..." rather than punchy declaratives.
- **Specific images and named people** instead of abstractions. *"My friend Sazzad in Dhaka"* not *"a friend back home."*
- **Honest about uncertainty.** Doesn't pretend to know everything. Comfortable saying "I don't know yet" or "I'm still figuring this out."
- **Reflective rather than performative.** Doesn't perform humility, but also doesn't perform brilliance.
- **Doesn't oversell.** If a project went well, says so plainly. If it was messy, says that.

### Voice calibration sources (place in `/refs/voice/`)

- Kash's LinkedIn post (referenced in chat — `[NEEDS KASH INPUT: full text of the post]`)
- Other LinkedIn posts from kashfi-rashid (`[NEEDS KASH INPUT: paste 3-5 more]`)
- Tazwar's ENGL101 writing samples — if Kash can share, useful for triangulation
- The chat transcript itself — Kash's casual unpolished voice is in there

### Anti-patterns (do not write like this — these are dead-on-arrival)

- "Passionate about creating delightful user experiences"
- "I'm a multidisciplinary designer who blends design and technology"
- "Driven by curiosity and a love for clean, intentional design"
- "Bridging the gap between..."
- "Empowering teams to..."
- Anything that could appear on 10,000 other portfolios without changing a word

### Required deliverables in `01-voice.md`

- 10+ sample hero lines in Kash's voice (one will become the actual hero)
- 5+ sample About-section openers
- 10+ sample project description openers
- 50+ companion bubbles (see Section 9 for triggers)
- A "voice cheat sheet" for future contributors: 5 do's, 5 don'ts, with examples

---

## 7. The wow stack (already locked)

Three interactive layers, drawn from three references. Don't propose alternatives — these are decided.

### Layer 1: Visitor identity (Harjot Singh's portfolio)
Visitor enters their name on first visit. They get assigned a color. Their cursor becomes that color. They become a named character inside Kash's world. This identity persists where possible (localStorage / cookies) so returning visitors are recognized.

### Layer 2: Companion (Abdul Hamoui's portfolio, evolved)
Cursor-attached chat bubbles that surface contextual bits when the visitor hovers or clicks. **This is not a chatbot.** Visitors do not type to it. The companion just speaks contextually based on visitor behavior.

### Layer 3: Personal world (Keyaan Vegdani's portfolio)
A visual setting that's only Kash's. Direction TBD — `[NEEDS KASH INPUT: pick from Dhaka-Delta thread / football pitch geometry / sound waveforms / 2am studio environment / something else]`. This decision shapes all visual direction in `06-visual-direction.md`.

---

## 8. Site architecture (proposed — finalize in `03-architecture.md`)

Sections may merge, rename, or shift, but here's the starting structure. Treating Kash like a brand to be explored, not a CV to be scanned.

| Section | Purpose | Notes |
|---------|---------|-------|
| **Home** | Hero + companion entry + idle layer | Tagline lives here; visitor identity flow starts here |
| **Voice** | How Kash writes / thinks | Design opinions, written takes, the source material the companion pulls from |
| **Eye** | Visual world | Sound art, generative work, BLU stills, things Kash finds beautiful |
| **Work** | Projects with companion annotations | Hover triggers companion bubbles with project insight |
| **Process** | The AI orchestration | *Show* Kash conducting Antigravity / Stitch / Gemini / Claude — process as content |
| **People** | Helping moments, teammates, friends, family | The people's-person evidence, structurally |
| **Origin** | Dhaka → Delta | What shifted, what didn't |
| **Hall of Fame** | Public log of visitor design feedback Kash implemented | Separate tab, minimal layout, gets added to over time |

Possible collapses to consider in `03-architecture.md`: *Voice + Eye → "Studio"*; *People + Origin → "World."* Don't decide unilaterally — surface the trade-off and let Kash pick.

---

## 9. Companion behavior spec (expanded in `04-companion-spec.md`)

The companion is a **version of Kash** — same brain, different form. Lives in the cursor space. Speaks in **short, contextual bubbles** triggered by visitor actions. Visitors do not type to it.

### Trigger taxonomy (build the full library in `04-companion-spec.md`)

- **Entry triggers** (visitor lands on the site, page loads)
- **Hover triggers** (visitor hovers an element — project image, name, section header)
- **Click triggers** (visitor clicks something — project, image, link)
- **Scroll triggers** (visitor scrolls past something without engaging)
- **Idle triggers** (visitor stops moving for 10–15s)
- **Exit-intent triggers** (visitor's cursor moves toward closing the tab)
- **Returning-visitor triggers** (visitor comes back — companion remembers them)

### Sample bubbles (write 50+ in this voice for `04-companion-spec.md`)

- Hover BLU project image → *"the part I'm proudest of is the sound design, listen at 0:42"*
- Click an image → *"third take, the first two were worse"*
- Scroll past About without reading → *"...you skipped the part about me. fair, I made it short."*
- Visitor idle 12s → *"want to see what I was working on at 2am last Tuesday?"* + reveals an idle reel
- Hover Process section → *"I plan things to death before I touch the keyboard. it's a problem and a feature."*
- Returning visitor → *"hey [name], your color's still red. sit anywhere."*

### Companion vibe

Warm, curious, observational, helpful. NOT eager-helpful (Clippy-style annoying). NOT sarcastic. NOT performatively cool. Tone matches the Tazwar/Kash voice — reflective, understated, occasionally self-aware.

### Frequency

Default: rare and high-signal. Not chatty. Quality over quantity. `[NEEDS KASH INPUT: confirm bubble frequency preference — chatty / moderate / rare]`

---

## 10. Content well (raw material — expanded in `02-content-well.md`)

This is the pool sections, companion, and idle layer pull from. Not all of it gets used everywhere — sections curate from it.

### Process moments
- Orchestrating Antigravity / Stitch / Gemini / Claude (chat, cowork, code) — show the conducting visually somehow
- Iterative planning style — restraint, layers, no shipping the first draft
- His Antigravity build experience on BC Connect (Open Ground design system, six frontend features)

### Origin
- Dhaka → Delta, in Canada since 2022
- Convocation June 10, 2026 (SIAT, SFU, Burnaby campus, Ceremony E)
- Bangladeshi diaspora identity
- Father's TRV application for convocation (in progress)

### Obsessions
- Football, especially Bangladeshi diaspora players and BFF international recruitment
- Generative art
- Sound design and sound management (was Immersive Sound Engineer on BLU)
- AI as creative direction (not "AI as tool")

### People (structurally important — these names appear in the People section)
- IT Squad team at Fraser International College (Kash is the manager, leads live incident triage)
- Hackathon teammates: Sadab Khan, Tawheed Sarker Aakash, Brett Rodrigues
- Sazzad — close friend in Bangladesh, refugee protection support letter, 9-year friendship (Case LB04573 — internal context only, do not publish case number)
- Family — father coming for convocation
- Friends across cities — Calgary, Dhaka

`[NEEDS KASH INPUT: which of these people are publicly named on the site? Which prefer anonymity? Anyone needs to be asked for permission first?]`

### Project anchors (use these as hooks for the Work section + companion bubbles)
- **Spectral Bloom** — IAT460, browser-based audio-reactive visual performance, Three.js + Claude API semantic interpretation layer
- **BLU** — IAT343, animated short film, Creative Director + 3D Environment Modeler + Immersive Sound Engineer (iat343blu.framer.website)
- **Something Lurking** — IAT445, scale-based VR space horror in Unity, narrative + planning + sound lead
- **BC Connect** — IAT459, MERN startup directory, Open Ground design system lead, six frontend features in Antigravity
- **PitchFlow** — Standalone, teleprompter-style pitch tracker with voice recognition + Claude API coaching
- **ForeSee** — Mountain Madness 2026, MLH Best Use of ElevenLabs, Designer & Developer
- **Us Among AI** — SillyHacks 2026, reverse Turing test browser game, Best UI

### Opinions and design takes
- Restraint > flash
- AI-generated-looking UI is bad — go for intentional, thoughtful design
- Reference projects he benchmarks against: Seido, Spendy / FutureSpend
- "Ambitious but executioneery" — process matters, planning matters, but you have to actually ship

### Helping moments (the people's-person evidence — `[NEEDS KASH INPUT]`)
- Refugee letter for Sazzad — full context needed for People section anchor
- LinkedIn post Kash referenced in chat — `[NEEDS KASH INPUT: full post text — that post likely *is* the helping-someone story]`
- LinkedIn profile optimization for Tarif Tanweer (CS student at FDU) — small but real example
- Ghostwriting ENGL101 assignments for Tazwar — context-dependent, may or may not surface publicly
- IT Squad live incident triage at FIC — daily helping in a work context

---

## 11. References (place in `/refs/`)

For each reference, document in `06-visual-direction.md` what was borrowed and what was rejected — so future contributors understand the choices, not just the outcomes.

| Reference | URL | What to borrow |
|-----------|-----|----------------|
| Harjot Singh portfolio | github.com/harjotsk03/portfolio2026 | Name + color personalization, visitor-as-character |
| Caleb Wu | calebwu.ca | (Pull URL, document what's distinct) |
| Abdul Hamoui | abdulhamoui.netlify.app | AI-as-spokesperson approach |
| Keyaan Vegdani | keyaanvegdani.com | Personal visual world / setting |
| Dropbox brand site | brand.dropbox.com | Modular system structure, declarative voice, "brand as toolkit" framing |
| Seido | (URL TBD) | Visual restraint bar |
| Spendy / FutureSpend | (URL TBD) | Visual restraint bar |
| Kash's current site | kashfirashid.com | What to *replace* — note specifically what's generic and needs to go |
| Figma Tip cursor-bubble image | (in `/refs/companion/`) | Companion form factor reference |

---

## 12. Open questions for Kash (do not fabricate answers)

Embed these as `[NEEDS KASH INPUT: ...]` callouts in the relevant files. List them all in `README.md` at the end so Kash sees them in one place.

1. The **personal world** direction — Dhaka-Delta thread / football pitch geometry / sound waveforms / 2am studio / something else?
2. **Most recent helping-someone story** — likely the LinkedIn post; need the full text
3. **Domain decision**: Does the new site replace kashfirashid.com, or live at a new URL with the old as a parallel/redirect?
4. **Hall of Fame curation cadence**: weekly / monthly / on-the-fly?
5. **Visitor identity persistence**: cursor color persists across visits, or resets each time?
6. **Companion bubble frequency**: chatty / moderate / rare?
7. **Design opinions for Voice page**: list the 5–10 takes Kash will defend in writing
8. **Photo / video / reel raw material**: what exists already, what needs to be shot or recorded?
9. **People page consent**: who's named, who's anonymized, who needs to be asked?
10. **Languages**: English-only or English + Bangla?
11. **Companion identity**: does it have a name? Or is it just "Kash, but cursor-form"?

---

## 13. Guardrails

- Do not write generic brand book filler ("our mission is to...", "our values are..."). If a section can't be filled with Kash-specific content, flag it as out of scope rather than padding it.
- Do not invent facts about Kash beyond what's in the chat or source files. Mark gaps with `[NEEDS KASH INPUT: ...]`.
- Do not propose visual directions that look AI-generated (rainbow gradients, mesh blobs, generic 3D, Midjourney textures).
- Do not collapse sections to make the brief shorter if the source material justifies the section. Length follows substance, not preference.
- Do not let "professional" overwrite "specific." If a phrase sounds polished but generic, replace it with something more particular.
- Do not write the companion bubbles in marketing voice. They are Kash's actual voice in miniature — short, observational, slightly understated.
- Do not rebuild the brand foundation in Section 5. Those are decisions, not suggestions.

---

## 14. Tool delegation reminder (covered fully in `08-tool-delegation.md`)

For context — this is the toolchain Kash is orchestrating, so the brand book should reference it accurately:

| Job | Tool |
|-----|------|
| Brand strategy + companion prompt iteration + live ideation | Claude chat |
| Brand book document production (this) | **Claude Cowork** |
| Visual mood / direction exploration | Gemini + Stitch |
| Hi-fi design system | Figma (Stitch first-pass → manual refinement) |
| Frontend build (React + Tailwind + framer-motion) | Antigravity |
| Companion logic (LLM-powered annotations) | Claude API in the React app |
| Long-form section copy | Claude Cowork |
| Hall of Fame backend | Claude Code |

---

## 15. When you're done

1. All 10 files in `/portfolio-2026/01-brand-book/` exist and cross-reference each other coherently
2. `README.md` summarizes what's in each file and lists every `[NEEDS KASH INPUT]` callout in one place
3. No filler. No generic brand-book sections that don't apply to Kash. If a section is thin, it's because the source material is thin — flag it, don't pad it
4. Voice section has at least 50 companion bubbles in Kash's actual voice
5. Open questions are surfaced clearly so Kash knows what to answer to unblock the next phase

Then ping Kash with: *"Brand book v1 ready in `/portfolio-2026/01-brand-book/`. [N] open questions to unblock phase 2 — see README.md."*

Don't try to make the brand book "perfect" before handing it back. v1 is a draft for Kash to redline. Iteration happens with him in chat.

---

*End of brief.*
