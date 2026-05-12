# 03 — Voice

> The page where Kash's design opinions live. The page that earns the *"this guy actually thinks about people"* feeling. Reads like a notebook, not a manifesto.

---

## Purpose

- Surface 5–10 design opinions Kash will actually defend
- Establish the thinking voice without lecturing
- Give returning visitors something to come back for as Kash adds opinions over time
- Act as the structural counterweight to Eye (which is visual taste; this is verbal opinion)

---

## Layout — Desktop

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   [BREADCRUMB-LIKE ROW]                                             │
│   ← home   ·   voice                                                │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Voice                                                             │
│                                                                     │
│   opinions i'd actually defend. updated when something earns it.    │
│   last added: [date]                                                │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌───────────────────────────────────────────────────────────┐     │
│   │  01                                                       │     │
│   │  AI doesn't make you faster. It makes you wider.          │     │
│   │                                                           │     │
│   │  [paragraph in Kash's voice — 2-4 sentences]              │     │
│   └───────────────────────────────────────────────────────────┘     │
│                                                                     │
│   ┌───────────────────────────────────────────────────────────┐     │
│   │  02                                                       │     │
│   │  Restraint is a craft, not a constraint.                  │     │
│   │                                                           │     │
│   │  [paragraph]                                              │     │
│   └───────────────────────────────────────────────────────────┘     │
│                                                                     │
│   [...continues...]                                                 │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   [LONGER PIECES — optional, below the opinions]                    │
│                                                                     │
│   ─── essays / longer reflections ───                               │
│                                                                     │
│   • [Essay title #1]                                                │
│   • [Essay title #2]                                                │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   [Footer]                                                          │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Elements

### BREADCRUMB ROW

[ELEMENTS]
- *"← home"* link (left)
- *"voice"* current label (low contrast)
- Persistent across sections — pattern repeats on every interior page

[BEHAVIOR]
- Hover on `← home` triggers a tiny back-affordance
- No traditional nav. This row + the section entries on Home are the navigation.

---

### PAGE HEADER

```
Voice

opinions i'd actually defend. updated when something earns it.
last added: 2026-04-12
```

[ELEMENTS]
- **Section name** — display type, sentence case
- **Sub-line** — one sentence that frames the page in Kash's voice
- **Last-added date** — very small, low contrast. Pulled from the most recently dated opinion. Makes the page feel maintained, not abandoned.

→ companion-trigger (entry to Voice page): bubble #C1
*"these are real takes. i had to argue myself into most of them."*

---

### OPINION CARDS

Each opinion is a card. Numbered. Title + 2–4 sentence paragraph in Kash's voice.

```
┌─────────────────────────────────────────────────────────────┐
│  01                                                         │
│  [Opinion title — display type, sentence case]              │
│                                                             │
│  [2-4 sentences. Tazwar register. Specifics over            │
│  adjectives. Lowercase mid-sentence is fine.]               │
│                                                             │
│  ─────                                                      │
│  [optional small footnote — date added, or related project] │
└─────────────────────────────────────────────────────────────┘
```

[ELEMENTS]
- **Number** — 01, 02, 03... two-digit, lower contrast, monospace
- **Title** — display type. The hot take, compressed.
- **Body** — 2–4 sentences. Reads like a notebook entry, not a thesis.
- **Footnote** (optional) — small caption: *"shipped this opinion into BLU's sound design"* or *"learned this from Sazzad in 2024"*

[BEHAVIOR]
- Hover: card edge accent in visitor's color
- Click: nothing, by default. The card is the content. (Anti-pattern: making every card link somewhere.)
- Long-press / desktop hold: companion fires a bubble specific to that opinion (if specified)

→ companion-trigger (hover-pause on a card with specific bubble): bubbles #H9–H14

---

### Sample opinion cards (starter list)

These are starter takes from `/01-brand-book/02-content-well.md` Section 9. They will be replaced by Kash's actual list when [NEEDS KASH INPUT — Q C1] is filled.

```
01  AI doesn't make you faster. It makes you wider.
    The hours don't shrink. The number of directions you can hold
    open at once does. That's a different superpower.

02  Restraint is a craft, not a constraint.
    Subtraction is the harder skill. A site that doesn't show
    everything it can do is the one that gets remembered.

03  The companion isn't a chatbot. It's a presence.
    A chatbot waits for a question. A companion notices what you're
    looking at and says the right small thing.

04  Late nights aren't a flex; they're a workspace.
    I'm not romanticizing the grind. 2am is when the noise stops
    and the work happens. That's a setting, not a virtue.

05  People over deliverables.
    Every project here has a name attached to a person who shaped
    it. The portfolio is a list of names as much as a list of works.
```

[NEEDS KASH INPUT — Q C1] confirm or replace these with Kash's actual 5–10 opinions. The Voice page is published from this list. Without it, Voice ships using starter takes.

---

### LONGER PIECES (essays section)

Below the opinion cards, an optional section for longer-form writing.

```
─── essays / longer reflections ───

  → On orchestrating AI tools as a designer
    (~5 min read · written 2026-03)

  → Why the BLU sound matters at 0:42
    (~3 min read · written 2026-02)

  → [LinkedIn post #1, repurposed]
    (~2 min read · written 2026-01)
```

[ELEMENTS per essay]
- **Title** — sentence case, display weight slightly reduced
- **Meta** — read time + write date in monospace
- **Hover preview:** companion fires a teasing bubble — *"this one's about the tool taking over and me letting it."*

[BEHAVIOR]
- Click: navigates to a dedicated essay route (`/voice/<slug>`)
- Essay pages are simple — title, date, body, back-to-Voice link

[NEEDS KASH INPUT] which longer pieces to include. The LinkedIn post is the most likely v1 candidate. Confirm or list new ones.

---

## Layout — Mobile

Same vertical structure. Opinion cards full-width minus 16px gutter. No two-column layout.

```
┌─────────────────────────────────┐
│ ← home · voice                  │
├─────────────────────────────────┤
│                                 │
│ Voice                           │
│ opinions i'd actually defend.   │
│ updated when something earns it.│
│ last added: 2026-04-12          │
│                                 │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ 01                          │ │
│ │ AI doesn't make you faster. │ │
│ │ It makes you wider.         │ │
│ │                             │ │
│ │ [paragraph]                 │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 02 ...                      │ │
│ └─────────────────────────────┘ │
│                                 │
│ ... etc                         │
├─────────────────────────────────┤
│ ─── essays ───                  │
│                                 │
│ → On orchestrating AI tools     │
│   ~5 min · 2026-03              │
│                                 │
│ → Why the BLU sound matters...  │
├─────────────────────────────────┤
│ [Footer]                        │
└─────────────────────────────────┘
```

Companion appears as bottom-anchored toast.

---

## Companion bubbles on Voice (typical visit)

| Trigger | Bubble | When |
|---------|--------|------|
| Entry | C1 — *"these are real takes. i had to argue myself into most of them."* | On Voice page load |
| Hover-pause on opinion #1 | H9 — opinion-specific | After 400ms hover |
| Scroll past 50% | S1 — *"a few more below."* | If first time |
| Click essay | C2 — *"this one's about the tool taking over and me letting it."* | On essay click |
| Idle (12s on Voice) | I3 — surfaces idle reel | If visitor stops moving |

Frequency cap: max 3 bubbles per page-load on Voice.

---

## Anti-patterns

- ❌ Manifesto framing. *"My Design Philosophy"* / *"What I Stand For"* — reads as portfolio-bro.
- ❌ Numbered like a listicle. The numbers are footnotes; the content is what carries.
- ❌ Pull quotes / huge text. Voice is text density, not graphic moments.
- ❌ Author bio at the top. The visitor knows whose page this is.
- ❌ Comments / reactions. Hall of Fame is the structured way visitors engage.
- ❌ Filling space with stock takes. Better to ship 5 real opinions than 12 mid ones.

---

## What earns this page

The page works only if the opinions are real and specific. A generic *"keep things simple"* opinion poisons the well.

The signal of a working opinion card:
1. It's specific enough that someone could disagree
2. It connects to a project or a person Kash worked with
3. It's something Kash has *actually* said — pulled from chat, LinkedIn, or written down
4. The footnote adds a real anchor (*"learned this from Sazzad"* — not vague)

---

## Cross-references

- Sample opinions: `/01-brand-book/02-content-well.md` Section 9
- Voice principles for the writing: `/01-brand-book/01-voice.md`
- Hover bubbles: `/01-brand-book/04-companion-spec.md` (H9–H14 range)
- Essays repository plan: `/01-brand-book/03-architecture.md`

---

*End of Voice wireframe. Continue with `04-eye.md`.*
