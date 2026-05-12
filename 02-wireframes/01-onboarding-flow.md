# 01 — Onboarding Flow (Visitor Identity)

> Runs once on first visit. Names the visitor, assigns a color, begins the relationship. ~8 seconds end-to-end if the visitor types fast.

---

## States

### State A — Initial render (T=0 to T=1.2s)

Site renders Home in normal layout. Cursor is the default off-white. Companion is silent.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                                             │
│                                                             │
│                  [Home content rendered]                    │
│                                                             │
│                                                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                  Cursor: default (off-white #E8E6E1)
```

The site is fully usable in this state. If the visitor doesn't engage with the prompt, they're not blocked.

---

### State B — Prompt appears (T=1.2s)

A soft inline prompt fades in. Center-bottom of viewport. Non-modal — the page behind it remains scrollable. Backdrop is *not* dimmed.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                                             │
│                                                             │
│                  [Home content, fully visible]              │
│                                                             │
│         ╭─────────────────────────────────────────╮         │
│         │  what should i call you while you're    │         │
│         │  here?                                  │         │
│         │                                         │         │
│         │  [_______________]   →                  │         │
│         │                                         │         │
│         │  or skip                                │         │
│         ╰─────────────────────────────────────────╯         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

[ELEMENTS]
- **Prompt heading:** *"what should i call you while you're here?"* (lowercase, sentence-fragment, Tazwar register)
- **Text input:** 20-char max. Truncates beyond. Placeholder is faint, no example name (don't suggest a name).
- **Submit affordance:** small arrow `→` to the right of the input. Enter key also submits.
- **Skip link:** *"or skip"* — small, lower-contrast. Links to State D-skip.

[NO]
- No "Welcome!" header. No "Let's get to know you." No emoji. No persuasion.
- No backdrop dim — the site stays present.

---

### State C — Visitor types name (T=2s to T=8s)

Real-time validation: empty string disables submit. Whitespace-only input is treated as empty. Profanity filter is **off** for v1 — names are local-only and never published.

```
         ╭─────────────────────────────────────────╮
         │  what should i call you while you're    │
         │  here?                                  │
         │                                         │
         │  [maya____________]   →                 │
         │                                         │
         │  or skip                                │
         ╰─────────────────────────────────────────╯
```

---

### State D-named — Visitor submits a name (T=8s to T=8.4s)

Color is assigned (deterministic from name hash — see `/04-build/src/lib/colorAssignment.js`). Cursor color transitions over 400ms. Prompt fades out. Companion fires its first bubble.

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                                                             │
│                                                             │
│                  [Home content]                             │
│                                                             │
│                                                             │
│        ╭─────────────────────╮                              │
│        │ hey maya. you're    │                              │
│        │ slate. sit anywhere.│   ← cursor (slate)           │
│        ╰─────────────────────╯                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

→ companion-trigger: bubble #E1 from `/01-brand-book/04-companion-spec.md`
*"hey [name]. you're [color]. sit anywhere."*

[BEHAVIOR]
- Cursor color transition: 400ms ease-out
- Bubble appears 300ms after color transition begins (overlapping animations feel intentional)
- Bubble auto-dismisses after 4s, or on cursor move out of bubble area
- localStorage writes: `{name, color, firstVisitDate, visitCount: 1}`

---

### State D-skip — Visitor skips (T=any time skip is clicked)

Default name: *"stranger."* Default color: a neutral slate from the palette. Companion fires a different first bubble.

```
        ╭─────────────────────────╮
        │ no name. fine.          │
        │ you're slate by default.│
        ╰─────────────────────────╯
```

→ companion-trigger: bubble #E2 (skip variant)
*"no name. fine. you're [default color] by default."*

[NEEDS KASH INPUT: confirm tone of skip-bubble. Working version is dryly accepting; alternative could be warmer.]

---

## Edge cases

| Case | Behavior |
|------|----------|
| Visitor reloads mid-flow | Identity resets; prompt re-appears |
| Visitor enters very long name | Truncated to 20 chars, no error message |
| Visitor enters whitespace only | Treated as skip |
| Visitor enters non-Latin script (Bangla, etc.) | Accepted, hash still works on Unicode codepoints, color assigned normally |
| Returning visitor with persisted identity | This whole flow is skipped — see `/04-build/src/hooks/useVisitorIdentity.js` |
| Visitor clears localStorage and re-enters same name | Same color back (deterministic hash). Visit count resets to 1. |
| Visitor changes name mid-session | Footer "reset" link → re-runs this flow [NEEDS KASH INPUT: confirm reset reruns onboarding vs. just changes name in place] |

---

## Mobile adaptation

```
┌─────────────────────────────────┐
│                                 │
│  [Home content]                 │
│                                 │
│                                 │
│  ╭───────────────────────────╮  │
│  │ what should i call you    │  │
│  │ while you're here?        │  │
│  │                           │  │
│  │ [______________]   →      │  │
│  │                           │  │
│  │ or skip                   │  │
│  ╰───────────────────────────╯  │
│                                 │
└─────────────────────────────────┘
```

Same prompt, full width minus 16px gutter, anchored to the bottom of the viewport. On mobile, the cursor doesn't exist — color shows up as accent on selected elements (button highlights, active form fields, the user's own Hall of Fame submission badge if they leave one).

The first companion bubble on mobile appears as a toast at the bottom of the screen.

---

## Animation specs

| Element | Animation | Duration | Easing |
|---------|-----------|----------|--------|
| Prompt fade-in | opacity 0 → 1, translateY 8px → 0 | 400ms | ease-out |
| Cursor color change | color transition | 400ms | ease-out |
| First bubble appear | opacity 0 → 1, translateY 6px → 0 | 250ms | ease-out |
| Prompt fade-out (after submit) | opacity 1 → 0, translateY 0 → -4px | 200ms | ease-in |
| Bubble dismiss | opacity 1 → 0 | 180ms | ease-in |

No bounce. No spring. No "fun" overshoot.

---

## Cross-references

- Bubble library: `/01-brand-book/04-companion-spec.md` (entry triggers E1–E7)
- Color assignment: `/01-brand-book/06-visual-direction.md` (8-color visitor palette)
- Persistence: `/01-brand-book/05-wow-mechanics.md` and `/04-build/src/hooks/useVisitorIdentity.js`

---

*End of onboarding flow. Continue with `02-home.md`.*
