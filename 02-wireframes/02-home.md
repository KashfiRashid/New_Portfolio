# 02 — Home

> The first surface after onboarding. Establishes the line, the feeling, the world. Restrained. The companion does most of the heavy lifting on first impression — the layout itself is quiet.

---

## Purpose

- Land the line: *"Ambitious but executioneery."*
- Land the feeling: *"this guy actually thinks about people."*
- Establish the 2am studio world (visual register before content density)
- Offer paths to other sections without traditional nav
- Surface "currently at" status so the site reads as alive

---

## Layout — Desktop

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   [TOP BAR — minimal, no nav]                                       │
│                                                                     │
│   kashfi rashid                                  ↓ scroll for more  │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│                                                                     │
│                                                                     │
│   Ambitious but executioneery.                                      │
│                                                                     │
│   I design and ship. Mostly at 2am. Mostly with                     │
│   AI as the orchestra and me as the conductor.                      │
│                                                                     │
│                                                                     │
│                                                                     │
│   Currently at FIC IT Squad · graduating SFU SIAT June 10           │
│   · Delta, BC                                                       │
│                                                                     │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   [SECTION ENTRY ROW — six small cards, no images yet]              │
│                                                                     │
│   ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐        │
│   │Voice │  │ Eye  │  │Work  │  │Proc. │  │People│  │Origin│        │
│   └──────┘  └──────┘  └──────┘  └──────┘  └──────┘  └──────┘        │
│                                                                     │
│   ┌──────────────────────────────────┐                              │
│   │ Hall of Fame  ──────────────►    │   (full-width, sets it apart) │
│   └──────────────────────────────────┘                              │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   [QUIET MOMENT — ambient detail only]                              │
│                                                                     │
│   A small line: "the site updates when someone helps make it        │
│   better. last update: [date pulled from changelog]"                │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   [FOOTER — see 10-footer-and-global.md]                            │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Elements, top to bottom

### TOP BAR

[ELEMENTS]
- **Name only:** *"kashfi rashid"* — left-aligned, lowercase. No logo, no nav.
- **Scroll affordance:** *"↓ scroll for more"* — right-aligned, fades on scroll. Low contrast.

[NO]
- No top nav with section links. Discovery happens through the section entry row + footer.
- No logo mark.
- No CTA in top-right ("hire me," "let's chat," etc. — those don't exist on this site).

---

### HERO

[ELEMENTS]
- **Headline:** *"Ambitious but executioneery."* — display type, sentence case.  THIS LINE IS LOCKED. Never softened.
- **Sub-line (~2 lines):** opens with what Kash actually does. Working draft: *"I design and ship. Mostly at 2am. Mostly with AI as the orchestra and me as the conductor."*
- **Status line:** *"Currently at FIC IT Squad · graduating SFU SIAT June 10 · Delta, BC"* — small, lower contrast, ascender separators (·). [NEEDS KASH INPUT to confirm exact phrasing]

→ companion-trigger (entry, ~3s after onboarding completes): bubble #E3
*"the line's not a typo. read it again."*

[BEHAVIOR]
- Hero text fades in 400ms after onboarding bubble dismisses.
- Status line fades in 200ms after hero, lower opacity (0.7).
- The cursor over the headline triggers a hover bubble (#H1) — *"this is the line. don't ask."*

---

### SECTION ENTRY ROW

Six small cards in a row (Voice, Eye, Work, Process, People, Origin). Hall of Fame gets its own full-width card below.

```
┌────────────┐
│   Voice    │   ← card label, large
│            │
│   [muted   │   ← one-line preview in Kash's voice
│   preview] │
└────────────┘
```

[ELEMENTS per card]
- **Label** — section name in display type
- **Preview line** — one sentence in Kash's voice, e.g.:
  - Voice: *"opinions i'd actually defend."*
  - Eye: *"things i find quietly beautiful."*
  - Work: *"six projects. each one taught me something specific."*
  - Process: *"how i conduct the orchestra."*
  - People: *"named credits. the site doesn't pretend i did this alone."*
  - Origin: *"dhaka → delta. the long route."*

[BEHAVIOR per card]
- Hover: card lifts 4px, accent.glow (#E8B86A) underlines the label
- Click: navigates to section
- Companion triggers on hover-then-pause: bubble fires after 400ms hover stillness

→ companion-trigger (hover, on each card): bubbles #H2–H7 from `04-companion-spec.md`

---

### HALL OF FAME card

Full-width, distinct from the six cards above. The structural commitment to "people."

```
┌─────────────────────────────────────────────────────────────────┐
│   Hall of Fame                                                  │
│                                                                 │
│   the site got better because these people showed up.           │
│                                  → see what's been shipped      │
└─────────────────────────────────────────────────────────────────┘
```

[BEHAVIOR]
- Hover: subtle border accent in visitor's color
- Click: navigates to `/hall-of-fame`

→ companion-trigger (hover): bubble #H8 — *"this is the closest thing to a contact form i'll let you have."*

---

### QUIET MOMENT (last-update line)

A single sentence near the bottom, before the footer. Low contrast.

> *"the site updates when someone helps make it better. last update: [pulled from changelog]"*

This is ambient. No interaction. It sits there because it makes the site feel alive without demanding attention.

[NEEDS KASH INPUT: confirm this lives on Home or only in footer/Hall of Fame. Recommendation: keep here too — it earns the people's-person frame on first scroll.]

---

## Layout — Mobile

Stacked. Section entry row becomes a vertical list. Hall of Fame card sits below. Hero gets more vertical room.

```
┌─────────────────────────────────┐
│ kashfi rashid             ↓     │
├─────────────────────────────────┤
│                                 │
│ Ambitious but executioneery.    │
│                                 │
│ I design and ship. Mostly at    │
│ 2am. Mostly with AI as the      │
│ orchestra and me as the         │
│ conductor.                      │
│                                 │
│ Currently at FIC IT Squad       │
│ · graduating SFU SIAT June 10   │
│ · Delta, BC                     │
│                                 │
├─────────────────────────────────┤
│ Voice                           │
│ opinions i'd actually defend.   │
├─────────────────────────────────┤
│ Eye                             │
│ things i find quietly beautiful.│
├─────────────────────────────────┤
│ Work                            │
│ six projects. each one taught   │
│ me something specific.          │
├─────────────────────────────────┤
│ Process                         │
│ how i conduct the orchestra.    │
├─────────────────────────────────┤
│ People                          │
│ named credits.                  │
├─────────────────────────────────┤
│ Origin                          │
│ dhaka → delta. the long route.  │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ Hall of Fame              → │ │
│ │ the site got better because │ │
│ │ these people showed up.     │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ [QUIET MOMENT line]             │
├─────────────────────────────────┤
│ [Footer]                        │
└─────────────────────────────────┘
```

---

## Companion bubbles fired on Home (typical first visit)

| Trigger | Bubble | When |
|---------|--------|------|
| Entry (post-onboarding) | E1 — *"hey [name]. you're [color]. sit anywhere."* | T=8.3s |
| Entry (after ~3s on hero) | E3 — *"the line's not a typo. read it again."* | If still on hero |
| Hover (headline) | H1 — *"this is the line. don't ask."* | On hover-pause |
| Hover (one section card) | H2-H7 — section preview in companion voice | On hover-pause |
| Idle (12s) | I1-I8 — surfaces idle reel | If visitor stops moving |
| Exit-intent | X1 — *"leaving? cool. tell a friend, or don't."* | Cursor heads to close |

Frequency cap: max 3 bubbles on Home in one session. Cooldown: 8s between bubbles.

---

## Anti-patterns

- ❌ A photo of Kash in the hero. (No photos on Home — visitors meet the *thinking*, not the face.)
- ❌ "Hi I'm Kashfi 👋." 
- ❌ Skill badges (React / Figma / etc.). Those aren't the brand.
- ❌ A big "View My Work" button. Discovery is the section row.
- ❌ Marquee scrolling text. Anything that reads as portfolio-trick.
- ❌ Dark mode toggle. The site has one register.
- ❌ Particles, mesh gradients, glassmorphism. The 2am world is restrained.

---

## Cross-references

- Voice in `/01-brand-book/01-voice.md`
- Hero copy + sub-line drafted in `/01-brand-book/01-voice.md` (sample hero lines section)
- 2am visual direction: `/01-brand-book/06-visual-direction.md`
- Companion bubbles: `/01-brand-book/04-companion-spec.md`
- Section structure: `/01-brand-book/03-architecture.md`

---

*End of Home wireframe. Continue with `03-voice.md`.*
