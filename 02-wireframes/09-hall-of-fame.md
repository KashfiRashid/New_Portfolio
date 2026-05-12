# 09 — Hall of Fame

> The public log + the Lego-brick submission flow. Replaces the contact form. Launches empty. Wireframes here mirror the spec in `/01-brand-book/07-hall-of-fame-spec.md`.

---

## Purpose

- Show the public log of visitor suggestions Kash has actually shipped
- Provide the structured submission UI (Lego-brick prompts, not a scary blank textarea)
- Be the closer of the visit — the structural way the people's-person claim is proved
- Launch state: empty, no fake entries

---

## Layout — Desktop

```
┌─────────────────────────────────────────────────────────────────────┐
│   ← home   ·   hall of fame                                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Hall of Fame                                                      │
│                                                                     │
│   the site got better because these people showed up.               │
│                                                                     │
│   [SUBMIT BUTTON — small, top-right]                                │
│                                                  [+ submit a note]  │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   [ENTRY LIST — empty in v1, populated as Kash ships]               │
│                                                                     │
│   ┌───────────────────────────────────────────────────────────────┐ │
│   │  ●(slate)  Maya                                               │ │
│   │  Section: Work · Shipped 2026-04-12                           │ │
│   │                                                               │ │
│   │  "BLU should have the sound timestamp inline,                 │ │
│   │   not just in the companion."                                 │ │
│   │                                                               │ │
│   │  → Maya was right. moved the 0:42 timestamp inline.           │ │
│   │    it's tighter now.                                          │ │
│   │  ─────                                                        │ │
│   └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│   ┌───────────────────────────────────────────────────────────────┐ │
│   │  ●(teal)  Aaron                                               │ │
│   │  Section: Voice · Shipped 2026-04-08                          │ │
│   │                                                               │ │
│   │  [next entry, same pattern]                                   │ │
│   └───────────────────────────────────────────────────────────────┘ │
│                                                                     │
│   [...continues...]                                                 │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   [v1 EMPTY STATE — visible until first entry ships]                │
│                                                                     │
│   ─── nothing here yet ───                                          │
│                                                                     │
│   [paragraph: "this is the page where the site evolves. it's        │
│   empty at launch on purpose. the first entry ships when            │
│   someone shapes something."]                                        │
│                                                                     │
│   [+ submit a note]                                                 │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│   [Footer]                                                          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Elements

### PAGE HEADER

```
Hall of Fame

the site got better because these people showed up.
```

[ELEMENTS]
- **Section name** — display type, sentence case (note: "Hall of Fame" has caps, breaking pattern intentionally)
- **Sub-line** — one sentence framing
- **Submit button** — small, top-right of the header. Affordance: `[+ submit a note]`

→ companion-trigger (entry): bubble #C10
*"this is what i replaced the contact form with. start at the bottom, scroll up."*

[NEEDS KASH INPUT — Q E2] confirm curation cadence (working: monthly batched). Affects copy on the empty-state and the submit-confirmation bubble.

---

### ENTRY CARDS

Each shipped entry is a card. Same structure throughout.

[ELEMENTS per card]
- **Visitor color dot** — small circle in the visitor's assigned color (●), leftmost
- **Visitor name** — sentence case (or color-only / anonymous per credit_pref)
- **Meta row** — *"Section: Work · Shipped 2026-04-12"* — small, lower contrast, monospace
- **Suggestion (visitor's quote)** — italicized, indented, lower weight
- **Change-note (Kash's voice)** — preceded by `→`, lowercase, this is the actual content visitors come to read
- **Bottom rule** — `─────` separator between entries

[BEHAVIOR]
- Hover on card: subtle accent in visitor's color on the left edge
- No click navigation (entries don't link anywhere — they're the destination)
- Returning visitor finds their own entry: companion bubble *"this one's yours, by the way."* (#R5 in the returning-visitor bucket)

[NO]
- No upvote / like buttons
- No comments / replies
- No "share this entry" social buttons
- No author photos
- No "view all suggestions by Maya" filter (yet — v2 might add)

---

### EMPTY STATE (v1)

Until the first entry ships, the page shows:

```
─── nothing here yet ───

this is the page where the site evolves. it's empty at launch
on purpose. the first entry ships when someone shapes something.

[+ submit a note]
```

[BEHAVIOR]
- Visible if entry count = 0
- Auto-replaced by entry list as soon as first entry ships
- Companion bubble on entry: bubble #C11 *"empty. for now. you could change that."*

---

### SORT + FILTER (v1: minimal)

[NEEDS KASH INPUT — confirmed default-sort only in v1]

Per the README recommendation: v1 ships with default sort (most recent first), no filter UI. Filters added in v2 once entry count justifies them.

If v1.1 adds filters, the affordance:
```
sort: recent ▾  ·  section: all ▾  ·  visitor: all ▾
```

Small, low-contrast row above the entry list. Skipped in v1.

---

## Submission flow — desktop

Click `[+ submit a note]` opens an inline modal/panel. (Inline preferred over modal — keeps page context.)

### State 1 — Submission panel reveals

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   Hall of Fame    [+ submit a note]                                 │
│                                                                     │
│   ┌─────────────────────────────────────────────────────────────┐   │
│   │                                                             │   │
│   │  what section?                                              │   │
│   │  [Voice] [Eye] [Work] [Process] [People] [Origin]           │   │
│   │  [Hall of Fame] [Other]                                     │   │
│   │                                                             │   │
│   │  what's the issue?                                          │   │
│   │  [Hard to find] [Reads off] [Visual feels off]              │   │
│   │  [Missing something] [Slow / sluggish]                      │   │
│   │  [Doesn't work right] [Other]                               │   │
│   │                                                             │   │
│   │  what would you change?                                     │   │
│   │  ┌─────────────────────────────────────────────────────┐    │   │
│   │  │                                                     │    │   │
│   │  │  [textarea — 280 char limit]                        │    │   │
│   │  │                                                     │    │   │
│   │  └─────────────────────────────────────────────────────┘    │   │
│   │                                                  280/280    │   │
│   │                                                             │   │
│   │  how should i credit you if i ship it?                      │   │
│   │  name: [maya] (prefilled from visitor identity)             │   │
│   │  color: ● slate (prefilled, non-editable)                   │   │
│   │  [ ] just credit my color, not my name                      │   │
│   │  [ ] don't credit me at all                                 │   │
│   │                                                             │   │
│   │                                          [cancel] [send →]  │   │
│   │                                                             │   │
│   └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

[ELEMENTS]
- **Section pill row** — single-select. Selected pill highlights in visitor's color.
- **Issue pill row** — single-select. Same pattern.
- **Free-text textarea** — 280 char limit, character counter bottom-right
- **Credit options** — name + color prefilled, two checkboxes for variants
- **Action row** — `[cancel]` (closes panel, no save) and `[send →]` (submits)

[BEHAVIOR]
- All fields except credit checkboxes are required to enable send
- Submit hits `POST /api/submit` (per `07-hall-of-fame-spec.md`)
- Rate limit: one submission per visitor identity per 24h. If hit, send is disabled with hover tooltip — *"already submitted today. try tomorrow."*

→ companion-trigger (panel reveals): bubble #C12
*"keep it short. if you can't say it in 280, i can't ship it."*

→ companion-trigger (on send): bubble #C13
*"got it. i read every one. only the ones i ship show up here."*

---

### State 2 — Submission confirmation

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   ✓ noted.                                                  │
│                                                             │
│   i'll review this in the next batch. if it ships, you'll   │
│   see it here. if not, no message — but every one gets read.│
│                                                             │
│                                            [back to log]    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

[BEHAVIOR]
- Replaces submission panel after successful POST
- Stays visible until visitor clicks `[back to log]` or scrolls

---

### State 3 — If returning visitor checks for their entry

If the visitor has a pending submission and visits the page:

```
[Top of page]

  Hall of Fame
  the site got better because these people showed up.
                                            [+ submit a note]

  ┌────────────────────────────────────────────────────────┐
  │  ●(slate)  Maya — your submission is in the queue.     │
  │  Section: Work                                         │
  │                                                        │
  │  if i ship it, this becomes a real entry.              │
  └────────────────────────────────────────────────────────┘

  ─── shipped entries ───
  [list]
```

[BEHAVIOR]
- Only this visitor sees their pending row (visitor identity match)
- Pending row fades / changes to live entry on Kash shipping it
- Companion: *"hey. yours is in the queue. monthly review."* (#R6)

[NEEDS KASH INPUT] confirm pending-state visibility to submitter. Recommendation: **show it.** It manages expectations and avoids "did my submission get lost?" anxiety.

---

## Layout — Mobile

```
┌─────────────────────────────────┐
│ ← home · hall of fame           │
├─────────────────────────────────┤
│                                 │
│ Hall of Fame                    │
│ the site got better because     │
│ these people showed up.         │
│                                 │
│ [+ submit a note]               │
│                                 │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ ●(slate)  Maya              │ │
│ │ Work · Shipped 2026-04-12   │ │
│ │                             │ │
│ │ "BLU should have the sound  │ │
│ │  timestamp inline, not just │ │
│ │  in the companion."         │ │
│ │                             │ │
│ │ → Maya was right. moved the │ │
│ │   0:42 timestamp inline.    │ │
│ │   it's tighter now.         │ │
│ └─────────────────────────────┘ │
│                                 │
│ [next entry]                    │
├─────────────────────────────────┤
│ [Footer]                        │
└─────────────────────────────────┘
```

### Mobile submission panel

Same structure, full-screen takeover (modal pattern works better on mobile). Tap to open, swipe-down or `[cancel]` to close.

---

## Companion bubbles on Hall of Fame (typical visit)

| Trigger | Bubble | When |
|---------|--------|------|
| Entry | C10 — *"this is what i replaced the contact form with."* | On page load |
| Submission panel reveals | C12 — *"keep it short. 280 chars."* | On `[+ submit a note]` click |
| Successful submit | C13 — *"got it. i read every one."* | On send |
| First-ever entry shipped (special) | First-entry bubble — *"first entry. that's a first. thanks."* | Only fires once globally, when first entry ships |
| Returning visitor with pending | R6 — *"hey. yours is in the queue."* | On page load if pending exists |
| Empty-state visitor | C11 — *"empty. for now. you could change that."* | If page has no entries |

Frequency cap: 3 bubbles per page-load.

---

## Anti-patterns

- ❌ "Leave a review!" framing. The page is shipped suggestions, not testimonials.
- ❌ Star ratings or thumbs-up icons. The credit dot + name is the only "rating" element.
- ❌ "We value your feedback" copy. Reads as corporate.
- ❌ Auto-publish all submissions. (Curation is what makes the wall trustworthy.)
- ❌ Email collection. No email field on the form.
- ❌ Submit button at the bottom of the page only. Both top and bottom (or sticky) — discovery matters.
- ❌ Aggregating analytics ("12 suggestions this month!"). The page is the names, not the metric.

---

## Edge cases

| Case | Behavior |
|------|----------|
| Visitor submits offensive content | Kash silently passes (doesn't ship). No public message. |
| Visitor hits rate limit | Send button disabled, tooltip: *"already submitted today. try tomorrow."* |
| Visitor has no identity (entered as "stranger") | Submit allowed; entry shows as *"●(slate) stranger"* if shipped |
| Two visitors submit same suggestion | Both credited if Kash ships: *"Maya (slate) and Aaron (teal) both flagged this."* |
| Visitor wants to retract submission | v1: no self-retract UI; they can email Kash. v2 might add retraction. |
| Submission requires Kash to add new content | Kash decides; the entry credits the suggestion if shipped |
| Page is empty for 60+ days | Discovery affordance not visible enough — tune submission entry points; companion mentions HoF in exit-intent (X4 in `04-companion-spec.md`) |

---

## Cross-references

- Full Hall of Fame spec: `/01-brand-book/07-hall-of-fame-spec.md`
- Backend (Claude Code builds): `/01-brand-book/08-tool-delegation.md`
- Companion bubbles: `/01-brand-book/04-companion-spec.md`
- Submission API + DB model: `/01-brand-book/07-hall-of-fame-spec.md` data model section

---

*End of Hall of Fame wireframe. Continue with `10-footer-and-global.md`.*
