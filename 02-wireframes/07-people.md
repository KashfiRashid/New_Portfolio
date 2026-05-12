# 07 — People

> Named credits. The page that proves *"this guy actually thinks about people"* by structurally crediting the people who shaped him. Not testimonials. Not a team grid. A list of names with one sentence each.

---

## Purpose

- Make the people-thread structural, not a one-line "I work well with teams" claim
- Credit specific named people for specific specific contributions
- Be the page that returning visitors want to come back to as Kash adds names
- Establish the bar: *the portfolio is a list of names as much as a list of works*

---

## The named list (from the brand book)

Pulled from `/01-brand-book/02-content-well.md` Section 8. Each needs consent confirmation [NEEDS KASH INPUT — Q D].

| # | Name | Relationship | One-line credit |
|---|------|--------------|-----------------|
| 1 | Sazzad Ahmed | longtime collaborator | sound on BLU. the steady voice when the work gets weird. |
| 2 | Tarif Khan | friend / sounding board | the first person who reads everything kash writes. |
| 3 | Tazwar Tarik | voice influence | the writing register on this site is downstream of his. |
| 4 | Sadab Khan | BC Connect team | shipped open ground with kash. |
| 5 | Tawheed Sarker Aakash | BC Connect team | shipped open ground with kash. |
| 6 | Brett Rodrigues | BC Connect team | shipped open ground with kash. |
| 7 | IT Squad team (FIC) | coworkers | tuesday afternoons. live incident triage. helping thread. |
| 8 | Father | family | took the long route from dhaka so kash could take the next one. |

[NEEDS KASH INPUT — Q D] for each: public name / anonymous / ask first. Until consent confirmed, the People page can either:
- Render with placeholders ("a friend who reads everything") for un-confirmed names, OR
- Hold the page private until at least 3-4 names are confirmed

Recommendation: **launch with whatever's confirmed, mark the rest as "more to come."** Better to ship a real People page with 3 names than a fake one with 8.

---

## Layout — Desktop

```
┌─────────────────────────────────────────────────────────────────────┐
│   ← home   ·   people                                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   People                                                            │
│                                                                     │
│   named credits. the site doesn't pretend i did this alone.         │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   [INTRO PARAGRAPH]                                                 │
│                                                                     │
│   [2-3 sentences in Kash's voice. Working draft below.]             │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │  Sazzad Ahmed                                                │  │
│   │  ─────                                                       │  │
│   │  sound on blu. the steady voice when the work gets weird.    │  │
│   │                                                              │  │
│   │  → blu (work)                                                │  │
│   └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │  Tarif Khan                                                  │  │
│   │  ─────                                                       │  │
│   │  the first person who reads everything kash writes.          │  │
│   └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│   ┌──────────────────────────────────────────────────────────────┐  │
│   │  Tazwar Tarik                                                │  │
│   │  ─────                                                       │  │
│   │  the writing register on this site is downstream of his.     │  │
│   │                                                              │  │
│   │  → voice (linked to voice page)                              │  │
│   └──────────────────────────────────────────────────────────────┘  │
│                                                                     │
│   [...continues for confirmed names...]                             │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ─── more to come ───                                              │
│                                                                     │
│   [a quiet line: "i'm asking permission before adding more names    │
│   here. that's the bar."]                                           │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│   [Footer]                                                          │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Elements

### PAGE HEADER

```
People

named credits. the site doesn't pretend i did this alone.
```

→ companion-trigger (entry): bubble #C8
*"this page exists because the alternative — pretending — is worse."*

---

### INTRO PARAGRAPH

Working draft:
> *"this isn't a 'team' page or a 'thanks' page. these are the people who shaped specific work, specific choices, specific years. each one earned a sentence. each one said yes to being on this page."*

The closing line — *"each one said yes to being on this page"* — is the consent-was-asked signal. Visitors notice that.

[NEEDS KASH INPUT] confirm or replace.

---

### NAME CARDS

Each named person is a card. Same structure across all of them.

[ELEMENTS]
- **Name** — display type, sentence case
- **Separator** — small horizontal rule
- **One-line credit** — Kash's voice, lowercase
- **Cross-link** (optional) — `→ blu (work)` or `→ voice` if there's a project / page connection

[BEHAVIOR]
- Hover: card edge accent in visitor's color, subtle lift (2px)
- No click navigation on the card itself — it's a credit, not a profile
- Cross-link arrows: clickable, navigate to the project / page

[NO]
- No photos. (Privacy + the "thinking about people" claim is verbal here, not visual.)
- No social media links. People can find each other if they want.
- No "skills" listed for each person.
- No testimonials. ("They said this nice thing about Kash.")
- No avatars / placeholders even when names are missing.

→ companion-trigger (hover-pause on a name): occasional bubbles #H29–H32
- Tazwar hover: *"the writing on this site is downstream of his."*
- Sazzad hover: *"longest collaborator. blu wouldn't sound like blu without him."*
- Father hover: *"this one's hard to write in one line."*
- IT Squad hover: *"tuesday afternoons. they know."*

---

### "MORE TO COME" footer-of-page

A small closing block.

```
─── more to come ───

i'm asking permission before adding more names here.
that's the bar.
```

This is the structural admission that the page is incomplete on purpose. It's also a soft invitation — readers who think *"shouldn't [name] be on here?"* understand the answer is *"yes, when [name] says yes."*

[NO]
- No "submit a name" form. Hall of Fame is the structured way visitors engage; People is curated by Kash.

---

## Layout — Mobile

Stacked single column. Cards full-width minus 16px gutter.

```
┌─────────────────────────────────┐
│ ← home · people                 │
├─────────────────────────────────┤
│                                 │
│ People                          │
│ named credits. the site doesn't │
│ pretend i did this alone.       │
│                                 │
├─────────────────────────────────┤
│ [intro paragraph]               │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ Sazzad Ahmed                │ │
│ │ ─────                       │ │
│ │ sound on blu. the steady    │ │
│ │ voice when the work gets    │ │
│ │ weird.                      │ │
│ │ → blu (work)                │ │
│ └─────────────────────────────┘ │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ Tarif Khan                  │ │
│ │ ─────                       │ │
│ │ the first person who reads  │ │
│ │ everything kash writes.     │ │
│ └─────────────────────────────┘ │
│                                 │
│ ... etc                         │
├─────────────────────────────────┤
│ ─── more to come ───            │
│                                 │
│ i'm asking permission before    │
│ adding more names here.         │
│ that's the bar.                 │
├─────────────────────────────────┤
│ [Footer]                        │
└─────────────────────────────────┘
```

---

## Companion bubbles on People (typical visit)

| Trigger | Bubble | When |
|---------|--------|------|
| Entry | C8 — *"this page exists because the alternative — pretending — is worse."* | On page load |
| Hover-pause on Tazwar | H29 — *"the writing on this site is downstream of his."* | After 400ms hover |
| Hover-pause on Sazzad | H30 — *"longest collaborator. blu wouldn't sound like blu without him."* | After 400ms hover |
| Hover-pause on Father | H31 — *"this one's hard to write in one line."* | After 400ms hover |
| Scroll to "more to come" | S6 — *"i'm not adding names without asking. that's the bar."* | On reaching section |

Frequency cap: 3 bubbles per page-load.

---

## Anti-patterns

- ❌ Team grid with avatars + roles. (Reads as "agency about page.")
- ❌ Testimonial cards — *"Kash is the most thoughtful designer I've worked with."* Hall of Fame is the structured version.
- ❌ Headshots / photos. Privacy + register.
- ❌ Twitter / LinkedIn icons next to names. People can be found if needed.
- ❌ "Special thanks to..." outro. Reads as awards-show.
- ❌ Listing 50 names. The page is curated. Better to have 6 named and meaningful than 30 obligatory.
- ❌ A "Friends" or "Mentors" filter UI. Categorization implies hierarchy; this list is flat.

---

## What earns this page

A working People page passes this test: a stranger reads three or four entries and thinks *"this person is a friend before he's a portfolio."* The relationship language earns this — *"the steady voice when the work gets weird,"* *"the first person who reads everything"* — not skill labels.

---

## Privacy + consent rules

- No name on this page without explicit consent
- For non-public-figure names (e.g., Father), use first-name or relationship-only if requested
- If anyone asks to be removed, remove them within 24h. The page exists to honor people, not to credit them against their wishes.
- The consent admission (*"each one said yes to being on this page"*) is part of the page's structure, not a fine-print line

[NEEDS KASH INPUT — Q D] explicit consent mark for each of the 8 names: `public` / `relationship-only` / `anonymous` / `not-yet-asked`. The page renders accordingly.

---

## Cross-references

- Names + relationships source: `/01-brand-book/02-content-well.md` Section 8
- Voice register the credits sit in: `/01-brand-book/01-voice.md`
- Hall of Fame as the visitor-side structural commitment: `/01-brand-book/07-hall-of-fame-spec.md`

---

*End of People wireframe. Continue with `08-origin.md`.*
