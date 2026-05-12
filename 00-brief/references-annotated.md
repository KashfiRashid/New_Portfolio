# References Annotated — borrow, reject, where it lands

> Cowork: this file is the **decision log** for visual and interactive direction. Before drafting `06-visual-direction.md` or `05-wow-mechanics.md`, read this file end-to-end. The borrow/reject lists are commitments — don't relitigate them. If something feels off, flag it for Kash, don't override it.

---

## How references map to the site

Kash's site composes elements from 5 portfolio inspirations + 1 brand system + 2 visual north stars. **Each reference contributes one specific job — none of them dominate.** The wow factor is the *composition*, not any single move.

| Reference | Job it does | Lands in |
|-----------|------------|----------|
| Harjot Singh | Visitor identity (name + color) | Onboarding, cursor system |
| Abdul Hamoui | AI representation | Companion (cursor-attached) |
| Keyaan Vegdani | Personal visual world | Whole site setting |
| Caleb Wu | Return-visit reward + secret delight | Hall of Fame mechanic, footer |
| Dropbox brand site | Modular system structure | Site architecture (8 sections) |
| Seido | Visual restraint bar | Visual standard (discipline) |
| Spendy / FutureSpend | Visual restraint bar | Visual standard (discipline) |

---

## 1. Harjot Singh

- **Live**: https://portfolio2026-nine-self.vercel.app
- **Repo**: https://github.com/harjotsk03/portfolio2026
- **Stack**: Next.js · Tailwind CSS · GSAP

**About**: SFU SIAT + CS student (same school as Kash, graduating April 2026 vs Kash's June). Design engineer at Aether Automation, building Study Spotr. The repo includes `CLAUDE.md` and `AGENTS.md` — actively built with AI agents.

**Important note**: The name-input + color-personality feature Kash referenced **does not appear in the public deploy** (as of fetch). It may be in development or on a sub-page. The borrow is the *concept*, not what's literally shipping on Harjot's site today.

**What's actually on the live deploy**:
- Hero: *"my name is HARJOT"* with two HARJOT instances and a "drag the handles" interaction
- Status badge: *"PST · Currently at Aether Automation · Building Study Spotr"*
- Personal photo strip in About (girlfriend, dog Bruno, snowboarding, Man United at London pub)
- Conventional case study cards
- Standard contact form

### BORROW
- **Name + color personalization mechanic** — the feature Kash specifically called out. Visitor enters name → gets assigned a color → cursor becomes that color → they're a named character in Kash's world. (Even if Harjot's deploy doesn't show this yet, take the idea.)
- **The "currently at" status line** — *"Currently at Aether Automation, Building Study Spotr"* is small but smart. Lightweight, low-effort, makes the site feel current. Kash's version: *"Currently at FIC IT Squad, building [thing], graduating June 10."*
- **Personal photo strip in About** — humanizes without being self-indulgent. Kash's version: convocation, hackathon team, sound studio setup, Dhaka shots if applicable, IT Squad in action.

### REJECT
- **The standard contact form** — Kash already has Hall of Fame as the interactive layer. A contact form on top would dilute it. Use a single email link or no form.
- **The case study card grid** — too generic. Kash's project section needs companion bubbles + inline video, not a 3-column grid.
- **The conventional hero copy** ("design engineer creating intuitive and scalable digital products") — fine for Harjot, generic. Kash's hero is *"ambitious but executioneery"* or equivalent.

### Where it lands in Kash's site
- Visitor onboarding flow (name entry, color assignment) — Home
- Cursor system (color-coded across whole site)
- "Currently at..." status line on Home
- Personal photo strip in Origin or People section

---

## 2. Abdul Hamoui

- **URL**: https://abdulhamoui.netlify.app

**About**: Fullstack Developer + UX Designer, Interactive Systems graduate.

**Key observed elements**:
- Hero: *"Building products that understand people."*
- **Digital Twin AI** — "Talk to my Digital Twin" Q&A widget at bottom of page, powered by Gemini, trained on his portfolio. Sample questions: *"What did Abdul ship at Dayforce?"*, *"How does he approach UX research?"*
- *"Claims without evidence are just words"* — every skill linked to a project that proves it
- 7 case studies tagged (Featured / Web Apps / UX Design / Gen AI / ML)
- Skills section with diamond/hex/circle icons, each linked to "Proven in [project]"

### BORROW
- **The AI-as-self concept** — but evolved. Abdul's is a Q&A widget (visitors type questions). Kash's is cursor-attached, contextual, observational. Same root idea (AI represents the designer), different form factor.
- **"Claims without evidence are just words"** — discipline, not a section. Every claim Kash makes ("warm," "thinks about people," "iterative") gets *structurally* linked to a real moment or named person somewhere in the site. Apply this rule everywhere.
- **The "Powered by [LLM]" label** — small detail but important. Tells visitors the AI is real, not a faked chatbot. Kash's companion should be labeled "Powered by Claude" near footer or in About.

### REJECT
- **The Q&A widget format** — Kash's companion is contextual, not interactive. Visitors don't type to it. Using Abdul's widget format would collapse the wow.
- **The certifications wall** ("Consensus Admin - Product Demo Specialist", "Professional Scrum Master") — Kash doesn't lead with credentials. Skip entirely.
- **The generic hero** ("Building products that understand people") — fine for Abdul, blueprint-able. Kash's hero is his actual line.
- **Standard "skills" section organized by category** — Kash's Process and Voice sections cover this terrain better.

### Where it lands in Kash's site
- Companion (cursor-attached version of "AI represents Kash")
- "Powered by Claude" label in footer or About
- Evidence-linked-claims discipline applied across all sections

---

## 3. Keyaan Vegdani

- **URL**: https://keyaanvegdani.com
- **About**: SFU SIAT student (also same school), motion designer. EA visual art design intern, leading visual design at SFU Surge.

**Key observed elements**:
- **The visual world**: campsite, constellations, fire gifs, stars — the site has a *setting*
- **Inline video previews** for each project (`assets/new/stormpreview.mp4`, etc.)
- **Animal Crossing inspiration** acknowledged in footer ("Inspired by many long covid nights on Animal Crossing")
- **Land acknowledgment** in footer (xʷməθkʷəy̓əm, Sḵwx̱wú7mesh, Səlilwətaɬ)
- **Confident declarative hero**: *"Keyaan is a designer using motion driven interactions and stunning visuals to turn imagination into reality."*

### BORROW
- **The "visual world" concept** — the entire site has a *setting* that's only Keyaan's (campsite under stars). Kash's equivalent comes from `questions-for-kash.md` A1 (Dhaka-Delta / football geometry / sound waveforms / 2am studio / something else). The world is what makes it feel like a place, not a website.
- **Inline video previews on project cards** — replaces static thumbnails with looping video. Higher signal, more alive. Kash should have these for BLU sound design clip, Spectral Bloom audio-reactive demo, Something Lurking VR clip, etc.
- **Footer that breaks the fourth wall** — Keyaan reveals his secret origin (Animal Crossing nostalgia). Kash's footer can confess something quiet and personal.
- **Land acknowledgment** — culturally appropriate for Vancouver. Kash should include one.
- **Confident declarative hero pattern** — *"[Name] is a [thing] who [specific verb]."* Kash's version uses *his* verb (executioneery? conducting? helping?), not stock action verbs.

### REJECT
- **Borrowed nostalgia as world theme** — Animal Crossing works for Keyaan because that *is* his secret origin. Kash should not borrow Animal Crossing or any borrowed nostalgia (no Pokémon, no Studio Ghibli, no Y2K computer aesthetic) unless it's genuinely his secret origin.
- **Decorative display typography** — fits Keyaan's motion-art identity but would feel costume-y on Kash's site.
- **Standard nav structure (Work / Motion Reel / About / Resume)** — Kash's modular Dropbox-style sections (Voice / Eye / Process / People / Origin / etc.) are stronger.

### Where it lands in Kash's site
- The personal world (Kash's pick from A1) — biggest visual decision
- Inline video previews on project cards in Work section
- Footer with secret origin / personal note
- Land acknowledgment in footer

---

## 4. Caleb Wu

- **URL**: https://www.calebwu.ca
- **Stack**: Next.js · Claude · Figma
- **About**: Product designer at RevisionDojo (YC F24), previously at Metalab.

**Key observed elements**:
- **Hero**: *"sweating the visual details"* — words interspersed with images of his name letterforms
- **Sticker reward system**: *"Here's a sticker! visit again for another one"* — return-visit reward
- **"Reset sticker progress"** button — opt-out
- **Secret footer**: *"Woah! You found my super secret footer."*
- **Visible changelog**: *"Changelog: March 01 2026"*
- **Project modals** with multi-step nav ("1 of 4 Intro RevisionDojo Axis Consulting Sticker Sheet")
- **Sentimental sign-off**: *"Built with NextJS, Claude, Figma. And a lot of love."*

### BORROW
- **Return-visit reward mechanic** — visitors who come back get *something*. For Kash: companion remembers them by name + color, different idle reel each visit, evolving "level" in visitor identity.
- **Visible changelog** — pairs perfectly with Hall of Fame. Visitors can see *that* the site evolves, not just *that it could*. Last update date visible somewhere on Home or footer.
- **Secret footer** — a delight that rewards scroll. Kash's footer hides something only people who get to the bottom see.
- **Personal sign-off** — *"Built with [tools]. And a lot of love."* humanizing closer. Kash's version: *"Built in Antigravity, Stitch, Figma, and Claude. And too many late nights."*

### REJECT
- **The sticker collection gamification** — sweet but might feel too cute for Kash's voice (warmer-reflective, not sweetly-friendly). Borrow the *return-visit reward idea*, not stickers specifically.
- **The "thanks for stopping by :)" tone** — too sweet for Kash. Closer parallel: *"see you again maybe"* or just nothing.
- **Words-with-images-in-them headline** — cool for Caleb, borrowed if Kash uses it. Different hero treatment.

### Where it lands in Kash's site
- Hall of Fame as changelog mechanic (every implemented suggestion = entry)
- Return-visit recognition through companion (*"hey [name], your color's still red"*)
- Secret-something in footer
- Personal sign-off in footer

---

## 5. Dropbox brand site

- **URL**: https://brand.dropbox.com
- **Built by**: Daybreak Studio (Kiran Patel, Ben Giannis)

**Key observed elements**:
- **8 modular sections**: Framework / Voice & Tone / Logo / Typography / Iconography / Color / Imagery / Motion — each its own page
- **Quote opener**: *"The details are not the details. They make the design."* — Charles Eames
- **Confident declarative writing**: *"At Dropbox, our Brand Guidelines help us infuse everything we make with identity."*
- **Toolkit framing**: *"All of this information is a toolkit. Go use it to make things."*
- **Author credits visible**: Daybreak Studio, individual designers credited

### BORROW
- **Modular brand-as-system structure** — 8 distinct sections, each its own tab/page. This is the architectural backbone of Kash's site (mapped onto Voice / Eye / Process / People / Origin / Work / Hall of Fame / Home).
- **Quote opener** — instead of *"Hi I'm Kashfi,"* start with a quote that means something to him. Companion intros him contextually as visitor explores.
- **Confident declarative voice for section openers** — short, opinionated. Each section starts with a thesis statement.
- **Author credit / toolkit framing** — Kash credits himself + AI tools + collaborators. Reinforces the "I work with AI" identity.

### REJECT
- **Corporate-brand polish in copy** — Dropbox is talking to brand partners; tone is professional-friendly. Kash's tone is warmer-reflective (Tazwar voice). Don't copy the corporate cadence.
- **Literal sections (Logo, Typography, etc.)** — Kash's portfolio isn't a brand guidelines site. Map the *structural idea* onto Kash's actual sections.

### Where it lands in Kash's site
- 8-section architecture (defined in `cowork-brief.md` Section 8)
- Opening quote on Home (in place of standard "Hi I'm")
- Each section's opening line as a thesis statement
- Footer credit ("Built by Kash with Antigravity, Stitch, Claude")

---

## 6. Seido (visual north star)

- **URL**: `[KASH TO ADD]`
- **About**: Kash's visual restraint reference. `[NEEDS KASH INPUT: Specifics — what specifically does Kash want to borrow? Typography choices? Color discipline? Layout rhythm? Motion principles?]`

### BORROW
`[NEEDS KASH INPUT — fill in 2–3 specific moves to take]`

### REJECT
`[NEEDS KASH INPUT — fill in 1–2 things even Seido does that Kash wouldn't]`

---

## 7. Spendy / FutureSpend (visual north star)

- **URL**: `[KASH TO ADD]`
- **About**: Kash's product design north star. `[NEEDS KASH INPUT: Specifics]`

### BORROW
`[NEEDS KASH INPUT]`

### REJECT
`[NEEDS KASH INPUT]`

---

## 8. Anti-reference — kashfirashid.com (current)

- **URL**: https://kashfirashid.com
- **Why it's here**: It's the existing portfolio. Used as anti-reference — what NOT to carry over.

**Key observed elements**:
- *"K."* logo
- Standard nav: Projects / About / Resume
- Hero: photo + *"MD KASHFI"* + *"Hi, I'm Kashfi. From pixels to pull requests, I keep ideas moving."*
- 3 projects: Documentor App, Parpro Consulting, Trucking Academy App
- Closer: *"Designing is collaborative — let's start with a chat."*

### BORROW
- Contact info (email, phone, LinkedIn) — no reason to change those
- `[KASH TO ADD: which projects from current site carry over to new site?]`

### REJECT
- **"From pixels to pull requests, I keep ideas moving"** — generic stock phrase, kill it
- **"K." monogram logo** — fine but conventional, replace with something more specific to Kash
- **Standard nav (Projects / About / Resume)** — replaced by 8-section modular architecture
- **Contact-form-as-closer** — replaced by Hall of Fame
- **3-card project grid** — replaced by Work section with companion annotations + inline video
- **Framing as "UX/UI Designer"** — too narrow. Kash is more — designer + developer + creative director + AI orchestrator. Use a phrase that captures range.

---

## /refs/ folder structure (where to put media)

When Kash adds screenshots, videos, and media to `/00-brief/refs/`, follow this structure:

```
refs/
├── inspirations/
│   ├── harjot/
│   │   ├── 01-hero-name-drag.mp4              ← screen recording of name input/drag
│   │   ├── 02-currently-at-line.png           ← status line screenshot
│   │   └── notes.md                           ← optional: Kash's annotations
│   ├── caleb-wu/
│   │   ├── 01-hero-sweating-details.png
│   │   ├── 02-sticker-reward.mp4
│   │   ├── 03-secret-footer.png
│   │   └── notes.md
│   ├── abdul/
│   │   ├── 01-digital-twin-widget.mp4
│   │   ├── 02-skills-evidence-linked.png
│   │   └── notes.md
│   ├── keyaan/
│   │   ├── 01-campsite-world.png
│   │   ├── 02-inline-video-projects.mp4
│   │   ├── 03-secret-footer-animal-crossing.png
│   │   └── notes.md
│   └── dropbox/
│       ├── 01-modular-sections.png
│       ├── 02-quote-opener.png
│       └── notes.md
├── north-stars/
│   ├── seido/
│   │   ├── 01-[whatever-screenshot].png       ← Kash adds specific moments
│   │   └── notes.md
│   └── spendy/
│       ├── 01-[whatever-screenshot].png
│       └── notes.md
├── voice/
│   ├── linkedin-post-01.txt                   ← full text of the referenced post
│   ├── linkedin-post-02.txt                   ← additional voice samples
│   └── tazwar-writing-sample.txt              ← if Kash can share
├── companion/
│   ├── figma-tip-cursor-bubble.png            ← the @buninux image referenced in chat
│   └── notes.md
├── current-site/
│   ├── 01-homepage.png
│   ├── 02-about-page.png
│   └── 03-projects-grid.png
└── personal/
    ├── photos/                                ← desk, studio, hackathon team, family
    ├── sketches/                              ← raw sketches, notebook scans
    ├── voice-notes/                           ← audio if any
    └── process-recordings/                    ← screen recordings of Kash working
```

### Naming conventions
- Prefix with two-digit number for ordering (`01-`, `02-`)
- Lowercase, hyphens, no spaces
- Describe what the asset *shows*, not what it was called on the source (`hero-name-drag` not `screenshot-2025-11-14-1432`)
- `.mp4` for screen recordings, `.png` for static, `.txt` or `.md` for text

### `notes.md` per reference subfolder
Optional but useful — Kash adds a sentence per asset explaining why he saved it. Cowork reads these for additional context when generating `06-visual-direction.md`.

---

## Summary: the wow stack composed

Kash's site = layered composition. Each reference does one job. The wow is the *combination*.

| Layer | From | What the site does |
|-------|------|--------------------|
| Visitor identity | Harjot | The visitor *becomes* (named, colored, character) |
| Companion | Abdul (evolved) | The site *speaks* (cursor-attached, contextual) |
| Personal world | Keyaan | The site *exists somewhere* (a setting, not a page) |
| Return reward | Caleb | The site *remembers* (different on second visit) |
| System structure | Dropbox | The site *is a system* (modular sections) |
| Visual standard | Seido + Spendy | The site *is restrained* (no AI-default visual) |

Six references, six distinct jobs. Don't let any one dominate.

---

*End of references file. Cowork: ground truth for what to borrow from where.*
