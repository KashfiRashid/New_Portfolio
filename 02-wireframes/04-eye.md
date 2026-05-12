# 04 — Eye

> The visual taste page. Things Kash finds quietly beautiful + 5–10 references he collects. The structural counterweight to Voice (verbal opinion). This page is mostly looking, not reading.

---

## Purpose

- Surface visual taste without claiming to be a designer-influencer
- Show what Kash actually looks at when he's working
- Earn the *"this guy has an eye"* read without vocabulary like "minimalism" or "clean"
- Give Eye a different texture from Voice — image-density vs. text-density

---

## Layout — Desktop

```
┌─────────────────────────────────────────────────────────────────────┐
│   ← home   ·   eye                                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   Eye                                                                │
│                                                                     │
│   things i find quietly beautiful. not curated. just collected.     │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   [GRID — irregular, masonry-style — 8-12 items]                    │
│                                                                     │
│   ┌──────────┐ ┌────────────────────┐ ┌─────────┐                   │
│   │          │ │                    │ │         │                   │
│   │  [img]   │ │      [img]         │ │  [img]  │                   │
│   │          │ │                    │ │         │                   │
│   └──────────┘ └────────────────────┘ └─────────┘                   │
│                                                                     │
│   ┌────────────────┐ ┌──────────┐ ┌────────────────────┐            │
│   │                │ │          │ │                    │            │
│   │     [img]      │ │  [img]   │ │       [img]        │            │
│   │                │ │          │ │                    │            │
│   └────────────────┘ └──────────┘ └────────────────────┘            │
│                                                                     │
│   ┌──────────┐ ┌────────────────┐                                   │
│   │  [img]   │ │     [img]      │                                   │
│   └──────────┘ └────────────────┘                                   │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   [REFERENCES SECTION]                                              │
│                                                                     │
│   ─── references ───                                                │
│                                                                     │
│   • Seido — restraint as a craft                       seido.studio │
│   • Spendy / FutureSpend — typography that breathes   spendy.app    │
│   • [...]                                                           │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│   [Footer]                                                          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Elements

### PAGE HEADER

Same pattern as Voice. Section name + one-line frame.

```
Eye

things i find quietly beautiful. not curated. just collected.
```

→ companion-trigger (entry): bubble #C3
*"these aren't trends. they're just things i kept saving."*

[NO]
- No "moodboard" framing. No "inspiration." Both read as portfolio-template.

---

### IMAGE GRID

8–12 images in an irregular grid. Not a perfect 3-column. Not Pinterest-grid-with-hover-zoom. Each image fills its cell with no caption visible by default.

[ELEMENTS per image]
- Cell with the image (object-fit: cover, no zoom on hover by default)
- Hover state: the image stays, but a small caption fades in below it
- Optional: cursor color tints the cell border on hover (subtle, 2px, accent in visitor's color)

```
[hover state]
┌─────────────────────────┐
│                         │
│        [image]          │
│                         │
└─────────────────────────┘
   ┌─────────────────────┐
   │ caption — small,    │
   │ Kash's voice        │
   └─────────────────────┘
```

[CAPTION CONTENT]
Captions are short. Tazwar register. Examples (placeholders):
- *"film still. the silence before the line lands."*
- *"a magazine spread from 2019 that's still in my notes."*
- *"my grandfather's handwriting."*
- *"a screenshot from a Sazzad project i'm not allowed to talk about."*
- *"the way light falls on the desk at 2am."*

[NEEDS KASH INPUT] the actual 8–12 images and captions. The grid is empty until Q F (raw material inventory) lands. The categories above are placeholders.

[BEHAVIOR]
- No lightbox on click. Images don't expand. (The point is the collection, not the inspection.)
- Optional: click takes you to a source link if there is one (e.g., a designer's portfolio for credit). Source links open in new tab.

→ companion-trigger (hover-pause on a specific image): occasional bubbles — `[NEEDS KASH INPUT: which images get a companion bubble. Recommend: 2-3 of the most personal ones]`

---

### REFERENCES SECTION

Below the grid, a small list of designers / studios / works Kash references.

```
─── references ───

• Seido — restraint as a craft                                seido.studio
• Spendy / FutureSpend — typography that breathes              spendy.app
• [Designer #3] — [why Kash references them]                  [url]
• [Designer #4] — [why]                                       [url]
• [Designer #5] — [why]                                       [url]
```

[ELEMENTS per row]
- **Name** — left-aligned, lowercase
- **One-line "why"** — middle, sentence
- **URL** — right-aligned, monospace, low contrast, opens in new tab

[NO]
- No designer photos. The names carry.
- No "I'm inspired by..." prefix. The header *references* does the work.
- No quotation cards from these designers. Just point at them.

[NEEDS KASH INPUT — Q E + references-annotated.md sections 6/7] full list of 5–10 references with one-line "why" each. Seido + Spendy are placeholders without URLs locked. Without the URLs, the visual restraint bar is held loosely.

---

## Layout — Mobile

Single column. Images stack. Same captions on tap (not hover).

```
┌─────────────────────────────────┐
│ ← home · eye                    │
├─────────────────────────────────┤
│                                 │
│ Eye                             │
│ things i find quietly beautiful.│
│ not curated. just collected.    │
│                                 │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │                             │ │
│ │         [image]             │ │
│ │                             │ │
│ └─────────────────────────────┘ │
│ caption — small, Kash's voice   │
│                                 │
│ ┌─────────────────────────────┐ │
│ │         [image]             │ │
│ └─────────────────────────────┘ │
│ caption                         │
│                                 │
│ ... etc                         │
├─────────────────────────────────┤
│ ─── references ───              │
│                                 │
│ • Seido                         │
│   restraint as a craft          │
│   seido.studio                  │
│                                 │
│ • Spendy / FutureSpend          │
│   typography that breathes      │
│   spendy.app                    │
│                                 │
│ ... etc                         │
├─────────────────────────────────┤
│ [Footer]                        │
└─────────────────────────────────┘
```

On mobile, captions show inline below each image (no hover). References stack into a vertical list.

---

## Companion bubbles on Eye (typical visit)

| Trigger | Bubble | When |
|---------|--------|------|
| Entry | C3 — *"these aren't trends. they're just things i kept saving."* | On page load |
| Hover-pause on personal image | H15 — *"this one i looked at a lot in 2024."* | If image is flagged personal |
| Scroll to references | S2 — *"these are the ones i actually read."* | On reaching `references` |
| Idle | I4 | If visitor stops moving |

Frequency cap: 2–3 bubbles per page-load.

---

## Anti-patterns

- ❌ Pinterest-style hover-zoom with overlay. Too sweet, too template.
- ❌ "Click to view full size" + lightbox. Eye is about the collection feeling, not inspection.
- ❌ Auto-rotating carousel. Visitor controls pace.
- ❌ Tag/filter UI ("show only typography / branding / photography"). The mix is the point.
- ❌ Captions that explain what's in the image. *"a black-and-white photograph of a building"* — useless. Captions are emotional / contextual, not descriptive.
- ❌ "Like" / save buttons. Visitors can save it themselves; this isn't a social platform.

---

## What earns this page

A working Eye page passes this test: a stranger who lands here and only reads the captions still gets *"this person looks at things carefully."* The images are the texture; the captions (Kash's voice attached to image) are what makes it Kash and not a moodboard.

---

## Cross-references

- Sample images / captions framework: `/01-brand-book/02-content-well.md` Section 12 (visual references)
- Reference list (Seido, Spendy, etc.): `/00-brief/references-annotated.md` (sections 6/7 still blank)
- Visual register the page sits inside: `/01-brand-book/06-visual-direction.md`

---

*End of Eye wireframe. Continue with `05-work.md`.*
