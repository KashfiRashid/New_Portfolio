# 05 — Work

> The 6 featured projects. Each is a project card on the index, plus a dedicated project page. The project is the unit of value here, not a "case study" with sections labeled "challenge / solution / results."

---

## Purpose

- Ship the 6 things Kash wants visitors to remember
- Show *what* (briefly), *who shaped it* (named credits), *what changed* (specific moment)
- Give each project a single sentence of voice that earns hover, plus a longer story on the project page
- Replace the kashfirashid.com card-grid pattern with something more curated

---

## v1 featured projects (locked here, [NEEDS KASH INPUT to confirm cut])

1. **BLU** — sound-driven, audio at 0:42 is the centerpiece
2. **Spectral Bloom** — audio-reactive visuals
3. **Something Lurking** — design + dev (working description needed)
4. **BC Connect** — Open Ground design system + 6 frontend features in Antigravity
5. **PitchFlow** — design + role mix tbd
6. **ForeSee** — *"hears futures"* placeholder, real description needed

Deferred from v1 (from the candidate list of 7): **Us Among AI** — role not yet locked.

[NEEDS KASH INPUT] confirm the 6 featured for v1.

---

## /work — index page

### Layout — Desktop

```
┌─────────────────────────────────────────────────────────────────────┐
│   ← home   ·   work                                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Work                                                              │
│                                                                     │
│   six projects. each one taught me something specific.              │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌───────────────────────────────────────────────────────────┐     │
│   │  [LARGE PROJECT CARD #1 — BLU]                            │     │
│   │                                                           │     │
│   │  [hero image / sound waveform visual]                     │     │
│   │                                                           │     │
│   │  BLU                                                      │     │
│   │  proudest of the sound. the moment that matters is 0:42.  │     │
│   │  →                                                        │     │
│   └───────────────────────────────────────────────────────────┘     │
│                                                                     │
│   ┌───────────────────────────────────────────────────────────┐     │
│   │  [PROJECT CARD #2 — Spectral Bloom]                       │     │
│   │                                                           │     │
│   │  [hero image]                                             │     │
│   │                                                           │     │
│   │  Spectral Bloom                                           │     │
│   │  visuals that listen. an experiment in audio-reactive...  │     │
│   │  →                                                        │     │
│   └───────────────────────────────────────────────────────────┘     │
│                                                                     │
│   [...4 more project cards...]                                      │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ─── older work ───                                                │
│                                                                     │
│   • Documentor App                                  [maybe retire]  │
│   • Parpro Consulting                               [maybe retire]  │
│   • Trucking Academy                                [maybe retire]  │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│   [Footer]                                                          │
└─────────────────────────────────────────────────────────────────────┘
```

### Project card elements

[ELEMENTS]
- **Hero visual** — single image, video still, or generative element. No collage of UI screens. One thing, well shot.
- **Project name** — display type
- **One-line voice** — the hot description in Kash's voice
  - BLU: *"proudest of the sound. the moment that matters is 0:42."*
  - Spectral Bloom: *"visuals that listen."*
  - Something Lurking: *"the brief said calm. i shipped quietly unsettling."* [NEEDS KASH INPUT]
  - BC Connect: *"open ground design system + six frontend features built in Antigravity."*
  - PitchFlow: *"the pitch deck that won the room."* [NEEDS KASH INPUT]
  - ForeSee: *"[real description needed]."* [NEEDS KASH INPUT]
- **Right-arrow** — clickable to project page

[BEHAVIOR]
- Hover: card lifts 4px, accent.glow appears as a subtle border on the image side
- Click: navigates to `/work/<slug>`
- Each card is full-width on desktop (single column), not a grid. Scrolling them is a deliberate sequence.

→ companion-trigger (hover-pause on each card): bubbles #H17–H22 — one specific bubble per project
- BLU hover: *"BLU. proudest of the sound. listen at 0:42."*
- Spectral Bloom hover: *"this one taught me to design for ears, not just eyes."*
- Something Lurking hover: *"the brief said 'calm.' i shipped 'quietly unsettling.'"*
- BC Connect hover: *"my first antigravity build. learned how it wants to be used."*
- PitchFlow hover: *"the deck that won the room."*
- ForeSee hover: *"working with sazzad on this one."* [NEEDS KASH INPUT]

---

### OLDER WORK section

Three older projects from kashfirashid.com (Documentor App, Parpro, Trucking Academy). Listed as small links rather than full cards. Each gets a `[NEEDS KASH INPUT]` marker for whether to carry over, retire, or refresh.

```
─── older work ───

• Documentor App                                  [maybe retire]
• Parpro Consulting                               [maybe retire]
• Trucking Academy                                [maybe retire]
```

[BEHAVIOR]
- Hover on a `[maybe retire]` row: companion fires *"the older stuff is here if you want it. less polished. more first-tries."* (#H23)
- Click: navigates to a lightweight legacy project page (or 404 if Kash retires)

[NEEDS KASH INPUT] which of the three carry over, which retire, which get fresh case studies. Until decided, they ship as small links with the old kashfirashid.com images.

---

## /work/<slug> — project pages

Each project page follows the same structure. The structure is *quietly journalistic*, not *case-study-template*.

### Layout — Desktop (single project page)

```
┌─────────────────────────────────────────────────────────────────────┐
│   ← work   ·   blu                                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   BLU                                                               │
│                                                                     │
│   [SHORT META ROW]                                                  │
│   2025–2026  ·  sound design + visuals  ·  with sazzad              │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   [HERO — full-width image or video, no autoplay sound]             │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   The brief in one paragraph                                        │
│   ─────                                                             │
│                                                                     │
│   [paragraph in Kash's voice — what the project was, why it         │
│   existed, who it was for]                                          │
│                                                                     │
│   Inline credit:                                                    │
│   designed with sazzad ahmed (sound), shipped solo on the visuals.  │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   The moment that mattered                                          │
│   ─────                                                             │
│                                                                     │
│   [the specific moment — for BLU, the 0:42 sound]                   │
│                                                                     │
│   ┌──────────────────────────────────────────┐                      │
│   │                                          │                      │
│   │  [audio player - optional]               │                      │
│   │  ▶  blu — 0:42 mark                      │                      │
│   │  ●━━━━━━━━━━━○━━━━━━━━━━━━━━━━           │                      │
│   │                                          │                      │
│   └──────────────────────────────────────────┘                      │
│                                                                     │
│   [paragraph explaining why 0:42 — why this moment matters,         │
│   what choice was made]                                             │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   What I changed                                                    │
│   ─────                                                             │
│                                                                     │
│   [paragraph or 2-3 small images showing iterations,                │
│   trade-offs Kash made]                                             │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   What this taught me                                               │
│   ─────                                                             │
│                                                                     │
│   [1-2 sentences, voice-anchored, ties to a Voice opinion if        │
│   possible]                                                         │
│                                                                     │
│   See also: → opinion #03 in /voice                                 │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   [NEXT PROJECT TEASE]                                              │
│                                                                     │
│   Next: Spectral Bloom →                                            │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│   [Footer]                                                          │
└─────────────────────────────────────────────────────────────────────┘
```

### Project page sections (consistent across all 6)

| Section | Length | Content |
|---------|--------|---------|
| **Title + meta row** | 1 line | Project name, year, role, named collaborators |
| **Hero** | 1 image / video / sound | One thing, well chosen. No collages. |
| **The brief in one paragraph** | 1 paragraph | What it is, why it existed, who it was for. Inline credits at the bottom. |
| **The moment that mattered** | 1-2 paragraphs + media | The specific thing — 0:42 sound for BLU, a particular interaction for BC Connect, etc. |
| **What I changed** | 1 paragraph + 2-3 small images | Iterations, trade-offs, decisions. Reads like a notebook. |
| **What this taught me** | 1-2 sentences | Voice-anchored. Cross-link to a Voice opinion if there is one. |
| **Next project tease** | 1 line | "Next: Spectral Bloom →" — keeps reading flow continuous |

[NO]
- No "Challenge / Solution / Results" headers. Reads as portfolio-template.
- No bullet lists of "deliverables." 
- No client testimonial cards. (Hall of Fame is the structured version.)
- No team grid with avatars. (People page is the structured version.)
- No "Tools used" list with skill icons.

→ companion-triggers per project page:
- Entry: bubble specific to the project
- Hover on hero: bubble specific to the visual
- Click on audio play: bubble *"hold on. listen."*
- Idle: idle reel surfaces if the project has a clip

---

## Layout — Mobile

Stacked, single column. Project cards full-width. Project pages: each section is full-width with generous vertical spacing.

```
┌─────────────────────────────────┐
│ ← home · work                   │
├─────────────────────────────────┤
│                                 │
│ Work                            │
│ six projects. each one taught   │
│ me something specific.          │
│                                 │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ [hero image]                │ │
│ │                             │ │
│ │ BLU                         │ │
│ │ proudest of the sound. the  │ │
│ │ moment that matters is 0:42.│ │
│ │ →                           │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ [hero image]                │ │
│ │ Spectral Bloom              │ │
│ │ visuals that listen.        │ │
│ └─────────────────────────────┘ │
│                                 │
│ ... etc                         │
├─────────────────────────────────┤
│ ─── older work ───              │
│ • Documentor App                │
│ • Parpro Consulting             │
│ • Trucking Academy              │
├─────────────────────────────────┤
│ [Footer]                        │
└─────────────────────────────────┘
```

---

## Companion bubbles on Work (typical visit)

| Trigger | Bubble | When |
|---------|--------|------|
| Entry to /work | C4 — *"six. that's the cut. the rest are below if you want."* | On page load |
| Hover-pause on a project card | H17–H22 — project-specific | On 400ms hover |
| Click into project | C5 — *"this one's longer. take your time."* | On project page load |
| Hover hero of project | H24 — image-specific bubble | On hover |
| Click audio play (BLU only) | C6 — *"hold on. listen."* | On play click |
| Idle on project page | I5 — surfaces idle reel | If visitor stops moving |
| Scroll to "what this taught me" | S3 — *"this one connects to opinion 03 if you've been to voice."* | On reaching section |

Frequency cap: 3 on /work index; 4 on individual project pages.

---

## Anti-patterns

- ❌ Auto-playing video / sound on project page load. (Visitor opts in to hearing BLU.)
- ❌ Image carousels. Visitor controls pace; sequence is intentional, not slideshow.
- ❌ "View Live Site" / "GitHub" buttons stuck to every project. If a link belongs, it's inline in the paragraph.
- ❌ Stat cards (*"500K users / 12% retention / 4.7 rating"*). Numbers without story are noise.
- ❌ Tools-used iconography. The story names the tool when it matters; the icon doesn't add anything.
- ❌ Featured-on-Behance / Awwwards badges. Tier signals belong elsewhere, not here.

---

## Cross-references

- Project content well: `/01-brand-book/02-content-well.md` Section 4
- Voice opinions to cross-link from "What this taught me": `/01-brand-book/02-content-well.md` Section 9
- Hero animation specs: `/01-brand-book/06-visual-direction.md`
- Companion bubbles: `/01-brand-book/04-companion-spec.md`
- Audio handling: project page audio player follows `/01-brand-book/06-visual-direction.md` motion principles (no autoplay, user-gestured)

---

*End of Work wireframe. Continue with `06-process.md`.*
