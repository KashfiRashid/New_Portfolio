# 03 — Architecture

> The site's eight rooms. What lives in each, how they connect, where the navigation goes. Site is a brand to explore (Dropbox-style modular system), not a CV to scan.

---

## The principle behind the structure

Kash's site borrows its structural backbone from **brand.dropbox.com** — a brand laid out as a system of modules, each its own page. Dropbox does Framework / Voice & Tone / Logo / Typography / Iconography / Color / Imagery / Motion. Kash adapts the *idea*, not the literal sections.

Why this matters: a CV-style site (Projects / About / Contact) tells visitors what to do. A modular brand site invites them to wander. *Wandering is the wow.* The companion fills the rooms with small moments. The sections give the companion places to react to.

---

## The eight rooms

| # | Section | One-line purpose | Key elements |
|---|---------|------------------|--------------|
| 1 | **Home** | First contact. Visitor identity flow. Companion's first words. | Hero (tagline candidate) · name + color onboarding · "currently at" status line · idle layer entry · footer crumb |
| 2 | **Voice** | How Kash writes and thinks. The takes. | 5–10 design opinions · a few longer pieces · companion source material · selected LinkedIn-style writing |
| 3 | **Eye** | The visual world. What Kash finds beautiful. | Sound art clips · BLU stills · generative work · references Kash collects · companion annotations on hover |
| 4 | **Work** | Projects with companion-bubble annotations. | The 6 working projects (BLU, Spectral Bloom, Something Lurking, BC Connect, PitchFlow, ForeSee, Us Among AI) · inline video previews · companion bubbles per project |
| 5 | **Process** | The AI orchestration. *Show* it. | Screen recordings of conducting Antigravity / Stitch / Gemini / Claude · planning docs · iterative sketches |
| 6 | **People** | Helping moments, teammates, family. | Sazzad letter (carefully) · Tarif LinkedIn moment · IT Squad · hackathon team · convocation note when it happens |
| 7 | **Origin** | Dhaka → Delta. Selective Bangla. | The migration thread · 2-3 specific Dhaka memories · convocation moment when relevant · selective Bangla |
| 8 | **Hall of Fame** | Public log of implemented visitor feedback. | Submission flow · curated entries · changelog · who suggested what, what changed |

---

## Section-by-section detail

### 1. Home

**Purpose:** First impression. The visitor identity flow lives here — visitor enters their name on first visit, gets assigned a color, their cursor becomes that color. The companion's first bubble fires. The hero line lands. The idle layer arms itself for later.

**Elements:**
- **Hero** — the tagline candidate (*"Ambitious but executioneery"*) or its remix from `01-voice.md` sample heros 1, 3, or 8. Quote-opener pattern from Dropbox is allowed instead.
- **Name + color onboarding modal or inline prompt.** Soft. *"hey. you'll get a name and a color in a second. doesn't bite."* (See `05-wow-mechanics.md` for full flow.)
- **"Currently at..." status line.** Borrowed from Harjot. Lightweight, makes the site feel current. Kash's version: *"Currently at FIC IT Squad · graduating SFU SIAT June 10 · Delta, BC."* `[NEEDS KASH INPUT: confirm exact phrasing]`
- **Idle layer entry.** When the visitor goes still for 12s, an idle reel surfaces (clip / photo / 2am recording).
- **Companion entry bubble.** Fires after onboarding completes. Sets the conversational tone for the rest of the visit. (See `04-companion-spec.md` Entry triggers.)
- **Subtle visual restraint.** No carousel, no hero video that auto-plays loud, no Lottie loader. The 2am studio aesthetic begins here (see `06-visual-direction.md`).

**What Home does NOT have:**
- A traditional nav bar across the top that lists every section. Use a quieter pattern — the modular sections appear as the visitor scrolls or as the companion suggests.
- A "let's chat" button.
- A skills wall.
- A logos-of-clients-I've-worked-with strip.

---

### 2. Voice

**Purpose:** The page where Kash publishes the takes he'd defend in writing. Companion pulls source material from this section for hover bubbles. Tazwar voice register is most concentrated here.

**Elements:**
- **5–10 design opinions** with one paragraph each. (Starter list in `02-content-well.md` Section 9. Full list still `[NEEDS KASH INPUT]` per Q C1.)
- **A few longer pieces** — these can be expanded LinkedIn posts, newly written reflections, or pulled from the chat-as-content. > `[NEEDS KASH INPUT: which longer pieces does Kash want to write or repurpose for this page?]`
- **A "things I'm watching" or "things I'm reading" sub-section** — optional but very Voice-page. Low-friction way to keep the page alive.
- **Companion bubbles** wired to specific opinions. Hover an opinion → a bubble extends or qualifies it.

**Anti-pattern:** treating this section as a blog. It's not a chronological feed. It's a curated set of takes.

---

### 3. Eye

**Purpose:** The visual world — what Kash finds beautiful and is good at making. The most "show" section, least "tell."

**Elements:**
- **Sound art clips** — BLU 0:42, Spectral Bloom audio-reactive demos, Something Lurking ambient passes. Inline-video pattern borrowed from Keyaan.
- **BLU stills** and behind-the-scenes from environment modeling.
- **Generative work** — Spectral Bloom Three.js, any other audio-reactive experiments.
- **A small "things I find beautiful" subsection** — references Kash collects from elsewhere (designers, posters, photography). > `[NEEDS KASH INPUT: 5–10 references Kash wants featured here]`
- **Companion annotations on hover** — *"this is from week 4 of BLU, before I knew what I was doing yet."*

---

### 4. Work

**Purpose:** Projects with depth, not a card grid. Replaces the standard 3-column case-study layout.

**Elements:**
- **6 working projects** as featured: BLU · Spectral Bloom · Something Lurking · BC Connect · PitchFlow · ForeSee · Us Among AI. (That's 7 — Kash decides which is the cut-line. `[NEEDS KASH INPUT: which 5–6 are featured for v1?]`)
- **Inline video previews** for each (Keyaan-borrowed pattern). Looping silent video > static thumbnail.
- **Each project opens with a single line** in Kash's voice (samples in `01-voice.md`). Companion bubbles fill in detail on hover.
- **Companion bubbles per project** — at least 4–6 bubbles each (hover image, click image, hover title, scroll past, idle on the project section). Full library in `04-companion-spec.md`.
- **Old-portfolio projects (Documentor App, Parpro, Trucking Academy)** — `[NEEDS KASH INPUT: which carry over, which retire]`. If they carry over, they get the same companion treatment as new ones.

**Anti-pattern:** standard "Role / Tools / Year / Link" metadata blocks. Lead with what's interesting.

---

### 5. Process

**Purpose:** *Show* the AI orchestration. Not a section that says "I use AI tools" — a section where the visitor watches Kash actually conducting them.

**Elements:**
- **Screen recordings** of Kash working in Antigravity / Stitch / Gemini / Claude. Short loops, no narration. Caption with the project being worked on.
- **Planning artifacts** — sketches, notebook scans, the BC Connect Open Ground design system spec, the long Something Lurking planning doc, the brand book itself.
- **The "I'm the conductor" framing** — written out as a short section opener in Kash's voice (`01-voice.md` hero sample 5).
- **Tool map** — not a logo wall, but a small annotated diagram of which tool does which job in Kash's flow. (Source: `08-tool-delegation.md`.)
- **Companion bubbles on hover** — *"the planning doc was longer than the game itself"* type lines.

**Why this section matters disproportionately:** in 2026, almost every designer claims to use AI tools. Almost none show it specifically and credibly. This section is where Kash differentiates structurally.

---

### 6. People

**Purpose:** The structural answer to *"this guy actually thinks about people."* Not a credit reel.

**Elements:**
- **Anchor moments** — Sazzad letter (carefully framed, 9-year friendship context, no case number), Tarif LinkedIn optimization, IT Squad incident triage rhythm, hackathon team (Sadab / Tawheed / Brett / Aakash with consent), convocation note for Father.
- **Photo strip** — Harjot-borrowed pattern. Convocation, hackathon team, sound studio, 2am desk, Dhaka shots if available. > `[NEEDS KASH INPUT: photo inventory — Q F + Section D consent]`
- **Companion bubbles** — *"that's Sazzad. I wrote him a refugee protection letter. nine years of friendship in there."*

**Consent rule:** No name appears on this page without explicit consent confirmed in `questions-for-kash.md` Section D. If consent is unclear, the moment is told without the name (*"a friend in Dhaka"*) until consent lands.

---

### 7. Origin

**Purpose:** Dhaka → Delta. The migration thread. The selective-Bangla section.

**Elements:**
- **2-3 specific Dhaka memories** Kash wants surfaced. > `[NEEDS KASH INPUT: which memories]`
- **The convocation moment** when it happens (June 10, 2026). The site can quietly mark the day. Father's TRV is a sub-thread but probably stays internal until it's confirmed.
- **Selective Bangla** — section header, possibly a pull-quote, possibly the convocation note. Used sparingly. > `[NEEDS KASH INPUT: which Bangla phrases / words]`
- **Football as the bridge** — BFF angle, diaspora-players obsession, the *"taught me space before any design class"* line.
- **Companion bubbles** with one or two in Bangla as easter eggs for visitors who'd recognize them.

**Anti-pattern:** generic immigrant-story-template. The Origin section is Kash's, not a category.

---

### 8. Hall of Fame

**Purpose:** Public log of visitor design feedback Kash has actually implemented. Replaces the contact form. Replaces the testimonial wall. Visibly proves the site evolves because of who came through it.

**Elements:**
- **Submission flow** — visitors leave design feedback at the bottom of any section, or via a dedicated flow. Lego-brick prompts (Kash's chat-original idea) instead of a blank textarea. (See `07-hall-of-fame-spec.md` for full mechanics.)
- **Curated entries** — only what Kash has actually shipped lands here. Each entry: the suggestion + who left it (with consent) + what changed.
- **Changelog** — borrowed from Caleb Wu. Visible "last updated" date. Visitors see *that* the site evolves, not just *that it could*.
- **The cumulative effect** — third-time visitors see how much has shifted because of the people who came through. That's the people's-person feeling expressed structurally.

(Full mechanics, submission flow, curation process, and data model in `07-hall-of-fame-spec.md`.)

---

## Navigation logic

**No traditional top nav bar.** That would treat the site like a CV with tabs. Instead:

- **Section transitions are revealed contextually.** As the visitor finishes a section, the next is suggested by the companion or appears in the natural scroll. This is closer to Keyaan's site than to a traditional portfolio.
- **A persistent quiet sidebar or footer-attached menu** — small, low-contrast, lists the eight sections. Not a hero element. The visitor finds it when they want it. Direct jumps allowed.
- **Companion bubbles can suggest sections** — *"want to see the Process section? it's where the AI orchestration lives."*
- **Hall of Fame and Voice are reachable from the footer always.** They're the two "destinations" most likely to bring people back.

---

## Possible merges (decision needed)

The brief mentioned two possible collapses. Surfacing them so Kash decides:

### Option A: Voice + Eye → "Studio"
- **Pro:** They're both "what Kash finds and makes." Combining them produces one richer section.
- **Con:** Voice is text-heavy, Eye is visual-heavy. Combining them dilutes both registers.
- **Recommendation:** Keep separate. They're different registers, and the visitor moves between them differently.

### Option B: People + Origin → "World"
- **Pro:** Both are about Kash's relational and geographical context. Combining them produces a richer "where Kash comes from" page.
- **Con:** People is more present-tense (current friends, current help). Origin is more past-tense (Dhaka, migration). Different temporal registers.
- **Recommendation:** Keep separate, but link them tightly. Origin can end with a transition into People (*"the people who came with me, and the ones I met after"*).

> `[NEEDS KASH INPUT: confirm both stay separate, or pick a merge]`

---

## What's deliberately NOT a section

To prevent drift:

- **No "Resume" page.** If asked, link the PDF in the footer.
- **No "Contact" page.** Hall of Fame replaces it. Email lives in the footer.
- **No "Services" page.** Kash isn't selling services through the site.
- **No "Blog."** Voice absorbs that need.
- **No "Skills."** Process and Work cover that contextually.
- **No standalone "About."** The whole site is about Kash. The bio lives in Origin or in a small block on Home.

---

## Footer

Quiet but layered:

- **The secret footer** (Caleb-borrowed pattern) — something only people who scroll all the way down see. Kash's version: a small confession about late-night working, or about helping people, or about the writing voice. > `[NEEDS KASH INPUT: which secret to put here]`
- **Personal sign-off** — *"Built in Antigravity, Stitch, Figma, and Claude. and a lot of late nights."* (Caleb-pattern, Kash-flavored.)
- **Land acknowledgment** — Vancouver-area, culturally appropriate. *"I work on the unceded territories of the xʷməθkʷəy̓əm, Sḵwx̱wú7mesh, and Səlilwətaɬ Nations."* (Borrowed from Keyaan; verify exact phrasing for Kash's specific Delta-area context.) > `[NEEDS KASH INPUT: confirm wording]`
- **Email link** + **LinkedIn link** + **changelog link** + **Hall of Fame link**.
- **Powered by Claude** label (small, near the bottom — Abdul-borrowed). Tells visitors the companion is real, not faked.

---

## How sections sequence on a typical first visit

This is illustrative, not prescriptive — visitors choose their own path.

```
Home (onboarding + companion entry + idle layer)
  ↓
Voice (read a take or two, hover for companion bubbles)
  ↓
Work (project cards with inline video, companion annotations)
  ↓
Process (screen recordings of orchestration)
  ↓
Eye (visual world clips)
  ↓
People (named moments, photo strip)
  ↓
Origin (Dhaka thread, selective Bangla)
  ↓
Hall of Fame (submit feedback, see changelog)
  ↓
Footer (secret + sign-off)
```

A returning visitor with persistent identity gets a different default: companion greets by name and color, the idle layer surfaces a different reel, the Hall of Fame may show new entries since their last visit.

---

## Data model implications (for the build phase)

Each section is a route. Companion bubbles are component-level. Hall of Fame and visitor identity require backend (see `08-tool-delegation.md`).

```
/                   → Home + onboarding
/voice              → Voice
/eye                → Eye
/work               → Work index
/work/[slug]        → individual project
/process            → Process
/people             → People
/origin             → Origin
/hall-of-fame       → Hall of Fame public log
/hall-of-fame/new   → submission flow
```

> `[NEEDS KASH INPUT: confirm route names — slugs may want shorter or more poetic versions, e.g. /studio instead of /process if any merges happen]`

---

*End of architecture. Continue with `04-companion-spec.md` for the companion behavior and full bubble library.*
