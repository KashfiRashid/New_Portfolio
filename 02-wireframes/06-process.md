# 06 — Process

> How Kash works. The page that names the orchestration framing — *AI as creative direction, not as tool*. Reads like a working document, not a methodology pitch.

---

## Purpose

- Make the "AI as conductor / orchestra" framing tangible, not abstract
- Show *which* AI tools play which roles (Antigravity, Claude, Gemini, etc.)
- Establish that this isn't a hype page — it's a working description of a working method
- Give visitors a vocabulary for understanding the rest of the site (Work, Hall of Fame, etc.)

---

## Layout — Desktop

```
┌─────────────────────────────────────────────────────────────────────┐
│   ← home   ·   process                                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Process                                                           │
│                                                                     │
│   how i conduct the orchestra. ai is in the chairs;                 │
│   i'm holding the baton.                                            │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   [INTRO PARAGRAPH]                                                 │
│                                                                     │
│   [3-5 sentences in Kash's voice — what "orchestrating" means       │
│   in practice. Not abstract. Names a project as an example.]        │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   The chairs                                                        │
│   ─────                                                             │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  Antigravity                       [first chair]            │   │
│   │  ships frontend features against a spec. iterative          │   │
│   │  planning, agentic coding. used on bc connect end-to-end.   │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  Claude (chat)                                              │   │
│   │  thinking partner. strategic forks, voice calibration,      │   │
│   │  the place ideas get argued before they become work.        │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  Claude Cowork                                              │   │
│   │  multi-file production. reads a folder, writes a folder.    │   │
│   │  the brand book you'd be reading was made in cowork.        │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  Claude Code                                                │   │
│   │  backend. apis, db layer, infra. cli-first.                 │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  Stitch + Gemini                                            │   │
│   │  first-pass visual exploration. mood, layout experiments.   │   │
│   │  not where final design happens — that's figma + manual.    │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │  Figma + Manual                                             │   │
│   │  hi-fi craft. component thinking. the spec antigravity      │   │
│   │  builds against.                                            │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   The score (a project, end-to-end)                                 │
│   ─────                                                             │
│                                                                     │
│   [a worked example — typically the BC Connect or BLU project]      │
│                                                                     │
│   Monday — strategy        Claude chat                              │
│   Tuesday — visual         Stitch + Gemini → Figma                  │
│   Wednesday — hi-fi        Figma + manual                           │
│   Thursday — build         Antigravity                              │
│   Friday — backend         Claude Code                              │
│   Friday eve — document    Cowork                                   │
│                                                                     │
│   [paragraph: what didn't work, what did, what i'd repeat]          │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   What this isn't                                                   │
│   ─────                                                             │
│                                                                     │
│   [paragraph: short, defensive-against-the-wrong-read.              │
│   "this isn't 'ai writes everything.' the conducting is the work.   │
│   the choices are the work. the tools are the orchestra."]         │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│   [Footer]                                                          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Elements

### PAGE HEADER

```
Process

how i conduct the orchestra. ai is in the chairs;
i'm holding the baton.
```

→ companion-trigger (entry): bubble #C7
*"this is the framing i argue for. tools are tools. the conducting matters."*

---

### INTRO PARAGRAPH

3–5 sentences. Sets up the metaphor without explaining it pedantically.

Working draft:
> *"I don't write the whole symphony. I tell the strings when to come in, the brass when to wait, the percussion when to break the silence. That's what working with AI tools looks like for me. It's not 'AI made this.' It's 'I made this with these tools playing these parts.' The chairs below are the orchestra. What I'm doing here is conducting."*

[NEEDS KASH INPUT — Q B/C territory] confirm or replace this paragraph. The metaphor is locked; the specific words can flex.

---

### THE CHAIRS — tool description cards

Each card is one tool, one short description. Reads like program notes.

[ELEMENTS per card]
- **Tool name** — display type
- **Tag** (optional, top-right) — *"first chair"* on Antigravity, *"thinking partner"* on Claude chat, etc. Low contrast, italicized.
- **Description** — 1-2 sentences in Kash's voice

[BEHAVIOR]
- Hover: card edge accent in visitor's color
- No click navigation — these are descriptions, not links

[CONTENT — pulled from `/01-brand-book/08-tool-delegation.md`]

The 6 cards as drafted:

| Tool | Tag | Description |
|------|-----|-------------|
| Antigravity | first chair | *"ships frontend features against a spec. iterative planning, agentic coding. used on bc connect end-to-end."* |
| Claude (chat) | thinking partner | *"strategic forks, voice calibration. the place ideas get argued before they become work."* |
| Claude Cowork | producer | *"multi-file production. reads a folder, writes a folder. the brand book you'd be reading was made in cowork."* |
| Claude Code | infrastructure | *"backend. apis, db layer, infra. cli-first."* |
| Stitch + Gemini | first-pass | *"visual exploration. mood, layout experiments. not where final design happens."* |
| Figma + Manual | craft | *"hi-fi. component thinking. the spec antigravity builds against."* |

[NEEDS KASH INPUT — confirm "first chair" assignment is Antigravity. The brief implied this; lock it.]

→ companion-trigger (hover-pause on a card): occasional bubbles #H25–H28
- Antigravity hover: *"this one's the workhorse. shipped bc connect end-to-end."*
- Cowork hover: *"this brand book was made here, actually."*
- Stitch hover: *"first-pass only. don't ask it for hi-fi."*

---

### THE SCORE (worked example)

A short, dated breakdown of one project's week. Reads like a real schedule, not a methodology table.

[ELEMENTS]
- **Heading** — *"The score (a project, end-to-end)"*
- **Day-by-day list** — Monday → Friday, each row is a phase + tools used
- **Closing paragraph** — what didn't work, what did, what Kash would repeat

[NEEDS KASH INPUT] which project is the worked example. Recommendation: **BC Connect** — Kash already named it as the project where he learned how Antigravity wants to be used. Concrete, grounded.

→ companion-trigger (scroll-into-view): bubble #S4
*"this is what a working week actually looks like. nothing dramatic."*

---

### WHAT THIS ISN'T

A short closing paragraph that pushes back against the wrong read. 2-3 sentences.

Working draft:
> *"this isn't 'ai writes everything.' the conducting is the work. the choices are the work. the tools are the orchestra. if you take the conductor away, the music doesn't play itself; it stops."*

[NO]
- No "transparency about AI usage" boilerplate. Doesn't sound like Kash.
- No "AI is just a tool" platitude. The whole page is the nuanced version of that.
- No defensive list of "things I do without AI." If it matters, name it specifically.

→ companion-trigger (scroll-into-view of the section): bubble #S5
*"i had to write this because people read it wrong otherwise."*

---

## Layout — Mobile

Stacked. Tool cards full-width, single column.

```
┌─────────────────────────────────┐
│ ← home · process                │
├─────────────────────────────────┤
│                                 │
│ Process                         │
│ how i conduct the orchestra.    │
│ ai is in the chairs; i'm        │
│ holding the baton.              │
│                                 │
├─────────────────────────────────┤
│ [intro paragraph]               │
├─────────────────────────────────┤
│ The chairs                      │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Antigravity   [first chair] │ │
│ │ ships frontend features...  │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Claude (chat)               │ │
│ │ thinking partner...         │ │
│ └─────────────────────────────┘ │
│ ... etc                         │
│                                 │
├─────────────────────────────────┤
│ The score                       │
│                                 │
│ Monday — strategy               │
│   Claude chat                   │
│ Tuesday — visual                │
│   Stitch + Gemini → Figma       │
│ Wednesday — hi-fi               │
│   Figma + manual                │
│ Thursday — build                │
│   Antigravity                   │
│ Friday — backend                │
│   Claude Code                   │
│ Friday eve — document           │
│   Cowork                        │
│                                 │
│ [closing paragraph]             │
├─────────────────────────────────┤
│ What this isn't                 │
│ [paragraph]                     │
├─────────────────────────────────┤
│ [Footer]                        │
└─────────────────────────────────┘
```

---

## Companion bubbles on Process (typical visit)

| Trigger | Bubble | When |
|---------|--------|------|
| Entry | C7 — *"this is the framing i argue for."* | On page load |
| Hover-pause on Antigravity card | H25 — *"this one's the workhorse."* | After 400ms hover |
| Hover-pause on Cowork card | H26 — *"this brand book was made here, actually."* | After 400ms hover |
| Scroll into "the score" | S4 — *"this is what a working week actually looks like."* | On reaching section |
| Scroll into "what this isn't" | S5 — *"i had to write this because people read it wrong."* | On reaching section |

Frequency cap: 3 bubbles per page-load.

---

## Anti-patterns

- ❌ "My Workflow" infographic with arrows. Reads as portfolio-template.
- ❌ Lottie animation of a brain with gears. Anything cute about "creativity."
- ❌ Tool logo grid with skill bars. The cards are descriptions, not skill claims.
- ❌ Comparison table — *"AI does X, I do Y."* The metaphor handles this.
- ❌ Long pedagogical "how to use AI in design" essay. This is the *what I do* page, not the *advice* page.
- ❌ Methodology with capital letters — *"The Kashfi Method™."*

---

## What earns this page

The page works if a visitor walks away saying: *"that's the most clear-headed AI-as-tool framing I've read this year."* It earns that by being specific (named tools, working week, BC Connect example) instead of abstract.

---

## Cross-references

- Tool delegation source: `/01-brand-book/08-tool-delegation.md`
- "AI as creative direction" framing: `/01-brand-book/00-overview.md`, `/01-brand-book/02-content-well.md` Section 3
- BC Connect (likely worked example): `/02-wireframes/05-work.md`

---

*End of Process wireframe. Continue with `07-people.md`.*
