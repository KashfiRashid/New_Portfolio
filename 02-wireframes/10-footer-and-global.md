# 10 — Footer + Global Behaviors

> Footer is the same across every section. Global behaviors (companion, idle layer, persistence reset) apply everywhere. This file is the catch-all for what doesn't belong to a single section.

---

## Footer — Layout

Same on every page. Sits at the bottom, low contrast, generous vertical space above so it doesn't feel cramped.

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   [LARGE VERTICAL SPACING — ~120px]                                 │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   [CHANGELOG LINE]                                                  │
│   the site updates when someone helps make it better.               │
│   last update: 2026-04-12 → see hall of fame                        │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   [SECRET LINE — Caleb-borrowed pattern, low contrast]              │
│   [a small confession that only people who scroll all the way       │
│   down see — see open question 32]                                  │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   [SIGN-OFF + BANGLA]                                               │
│   built at 2am.  ·  ভালোবাসা সহ.                                    │
│   (with love.)                                                      │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   [LAND ACKNOWLEDGMENT]                                             │
│   i work on the unceded territories of the xʷməθkʷəy̓əm,             │
│   sḵwx̱wú7mesh, and səlilwətaɬ Nations.                              │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   [CONTACT + RESET ROW]                                             │
│   contactkashfi@gmail.com  ·  +1 (778) 881 1054                     │
│                                                                     │
│   you're here as: maya · slate ●  →  [reset]                        │
│                                                                     │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   [LINKS ROW]                                                       │
│   linkedin · github · ?other?                                       │
│                                                                     │
│   © 2026 kashfi rashid                                              │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Footer elements, top to bottom

### CHANGELOG LINE

[ELEMENTS]
- One sentence in Kash's voice
- Last-update date pulled from the most recent shipped Hall of Fame entry
- Link to `/hall-of-fame`

[CONTENT]
*"the site updates when someone helps make it better. last update: 2026-04-12 → see hall of fame"*

[BEHAVIOR]
- Date is automatic (server side, pulled from latest shipped entry)
- If no entries yet (v1 launch state), the line reads: *"the site updates when someone helps make it better. nothing shipped yet. you could be first."*

→ companion-trigger (hover on the line): bubble #H34
*"this updates when i ship something. it's not a flex; it's accountability."*

---

### SECRET LINE (Caleb-borrowed pattern)

[NEEDS KASH INPUT — open question 32] which secret to put here. Working candidates:
- A small confession about late-night working
- A line about helping people that fits Kash's voice
- A meta-line about the writing voice itself
- An easter egg phrase that returning visitors collect

[FORMAT]
- Lower contrast than other lines (~0.5 opacity)
- One sentence
- No marker / pointer to it. People who notice, notice.

[EXAMPLES of register, not content]:
- *"if you're reading this, you scrolled all the way down. that's not nothing."*
- *"i write better at 2am. you can probably tell which sections were written then."*
- *"the companion was almost called something cute. i killed it. you're welcome."*

→ companion-trigger (rare, scroll-to-bottom): bubble #X3 (exit-intent territory)
*"you're at the bottom. that's where the small things live."*

---

### SIGN-OFF + BANGLA

[ELEMENTS]
- *"built at 2am."* — sign-off in Kash's voice (locked from `00-overview.md`)
- Bangla pull: *"ভালোবাসা সহ."* (= *"with love."*) — small, italicized, lower contrast
- English translation in caption underneath, smaller and more muted

[CONSTRAINTS]
- This is one of the only Bangla appearances on the site — selective, intentional, lands in the footer where it carries emotional weight
- [NEEDS KASH INPUT] confirm Bangla phrase. *"ভালোবাসা সহ"* is a working candidate; alternatives could be a phrase from Father, or a line from a Bengali song, or something else entirely.
- Typography: Hind Siliguri / Tiro Bangla per `06-visual-direction.md`

---

### LAND ACKNOWLEDGMENT

[CONTENT]
*"i work on the unceded territories of the xʷməθkʷəy̓əm, sḵwx̱wú7mesh, and səlilwətaɬ Nations."*

[NEEDS KASH INPUT] confirm exact phrasing for Delta-area context. Working version pulled from Keyaan's site; verify it's the right wording for Kash's specific location.

[CONSTRAINTS]
- Lowercase consistent with the rest of the footer voice
- Keep proper diacritics in the Nation names — these are not optional
- Don't capitalize over-formally; *"Nations"* is the only word that needs caps per local convention

---

### CONTACT + RESET ROW

[ELEMENTS]
- Email: `contactkashfi@gmail.com`
- Phone: `+1 (778) 881 1054`
- *"you're here as: [name] · [color] ● → [reset]"* — visitor identity affordance

[BEHAVIOR — reset link]
- Click: opens a small confirmation prompt — *"reset your name and color?"* with `[yes, reset]` and `[never mind]`
- On `yes`: clears localStorage entries for `name`, `color`, `firstVisitDate`, `visitCount`. Reloads the page. Onboarding flow re-runs.
- The reset link is the persistence opt-out per the README recommendation

[NO]
- No "Send me a message" form. Email + phone do the contact work.
- No CAPTCHA on the reset (no spam vector — just clears local state)

→ companion-trigger (hover on `[reset]`): bubble #H35
*"reset wipes your name and color. won't break anything."*

---

### LINKS ROW

[ELEMENTS]
- LinkedIn: `linkedin.com/in/[handle]` [NEEDS KASH INPUT — confirm handle]
- GitHub: `github.com/[handle]` [NEEDS KASH INPUT — confirm handle]
- Optional third link [NEEDS KASH INPUT: anything else? Spotify, Read.cv, a personal blog?]
- Copyright: *"© 2026 kashfi rashid"* — lowercase, low contrast

[NO]
- No Twitter / X (unless Kash explicitly wants it; flagged in open question)
- No Instagram (private/personal — out of scope)
- No "follow me" CTAs
- No newsletter signup

---

## Mobile footer

Same content, stacked vertically. Generous line-height. Reset affordance on its own row.

```
┌─────────────────────────────────┐
│                                 │
│ the site updates when someone   │
│ helps make it better.           │
│ last update: 2026-04-12         │
│ → see hall of fame              │
│                                 │
│ [secret line]                   │
│                                 │
│ built at 2am.                   │
│ ভালোবাসা সহ.                    │
│ (with love.)                    │
│                                 │
│ i work on the unceded           │
│ territories of the              │
│ xʷməθkʷəy̓əm, sḵwx̱wú7mesh,       │
│ and səlilwətaɬ Nations.         │
│                                 │
│ contactkashfi@gmail.com         │
│ +1 (778) 881 1054               │
│                                 │
│ you're here as: maya · slate ●  │
│ [reset]                         │
│                                 │
│ linkedin · github               │
│                                 │
│ © 2026 kashfi rashid            │
│                                 │
└─────────────────────────────────┘
```

---

## Global behaviors (apply across all pages)

### COMPANION — global rules

Every page renders the `<Companion />` component at the root. Bubble triggers fire from page-specific event handlers but the rendering is global.

- **Frequency:** max 5–8 bubbles per session, 8s cooldown between bubbles
- **Per-element cap:** max 1 bubble per specific element per session
- **Cursor-attached:** desktop only. Mobile uses bottom-toast pattern.
- **Persistence:** the companion remembers which bubbles fired in `sessionStorage` (per-session, not localStorage)
- **Returning visitor recognition:** triggers bubble category R (Returning) — uses `lastVisitDate` from localStorage

→ Spec: `/01-brand-book/04-companion-spec.md`
→ Implementation: `/04-build/src/companion/`

---

### IDLE LAYER — global rules

The idle reel triggers when:
- Visitor has been still for 12 seconds (no cursor movement, no scroll, no input)
- Companion fires an idle-trigger bubble first
- Reel surfaces ~1s after the bubble

Idle reel max once per session. Subsequent idles can fire bubbles but no new reel.

→ Spec: `/01-brand-book/05-wow-mechanics.md` Idle layer section
→ Implementation: `/04-build/src/hooks/useIdleDetection.js`

---

### PERSISTENCE — what's stored

```
localStorage:
  identity: { name, color, firstVisitDate, visitCount, lastVisitDate }
  companion: { lastBubbleSession (sessionStorage), bubblesFiredEver (localStorage, capped to last 30) }
  hall_of_fame: { pendingSubmissionId, submittedDates }

sessionStorage:
  companion: { firedThisSession, lastBubbleAt }
  idle: { reelFiredThisSession }
```

[BEHAVIOR]
- Reset link in footer clears `localStorage.identity` only. Companion / HoF state are independent.
- localStorage pings server on each visit to detect changes (e.g., new HoF entry since last visit)

→ Implementation: `/04-build/src/hooks/usePersistence.js`

---

### MOBILE COMPANION — toast pattern

Per the recommendation:
- Bubbles surface as bottom-anchored toast (full-width, 8px from bottom edge, 16px gutters)
- Same library; same triggers; different position
- Dismissible by tap
- Auto-dismiss after 4s

```
┌─────────────────────────────────┐
│                                 │
│   [page content]                │
│                                 │
│                                 │
│                                 │
│ ╭─────────────────────────────╮ │
│ │ hey maya. you're slate.     │ │
│ │ sit anywhere.               │ │
│ ╰─────────────────────────────╯ │
└─────────────────────────────────┘
```

---

### KEYBOARD + ACCESSIBILITY (a11y)

Every interactive surface must:
- Be keyboard-accessible (Tab to navigate, Enter to activate)
- Have visible focus states (use accent.glow #E8B86A as focus ring)
- Have non-color-dependent affordances (don't rely on visitor's color alone for states)
- Companion bubbles: announce via `aria-live="polite"`
- Onboarding modal: trap focus, Esc dismisses (treats as skip)
- Submission panel: same, Esc to cancel

[NEEDS KASH INPUT — confirm a11y bar. Recommendation: WCAG 2.1 AA as the floor, AAA for color contrast where feasible. The 2am dark register is forgiving for contrast since accent colors are bright.]

---

### REDUCED MOTION

Respect `prefers-reduced-motion: reduce`:
- Companion bubbles: opacity-only fade, no translate
- Hover lifts: removed
- Idle reel: still triggers but no fade-in animation; appears instant
- Cursor color transition: instant (no 400ms transition)
- Page section reveals: instant

---

### THEMES (none)

The site has one register: 2am studio. No light mode toggle. No high-contrast mode (the existing tokens already meet AA). No theme switcher in the footer.

---

## Companion bubbles fired in footer

| Trigger | Bubble | When |
|---------|--------|------|
| Hover on changelog line | H34 — *"this updates when i ship something."* | On hover-pause |
| Scroll to footer | X3 — *"you're at the bottom. that's where the small things live."* | On reaching footer (rare, scroll-to-bottom only fires occasionally) |
| Hover on reset | H35 — *"reset wipes your name and color. won't break anything."* | On hover |

---

## Anti-patterns (footer + global)

- ❌ Newsletter signup. Out of scope.
- ❌ Cookie banner with full GDPR copy. (No tracking cookies; the persistence is local-only. A small one-liner if needed: *"this site uses localStorage to remember you. no analytics, no ads, no third parties."*)
- ❌ "Made with [framework]" badges in footer.
- ❌ "Designed by Kashfi Rashid" credit (the whole site is by him; redundant).
- ❌ Social media share buttons in footer.
- ❌ Theme toggle.

---

## Cross-references

- Footer structure source: `/01-brand-book/03-architecture.md`
- Land acknowledgment: `/01-brand-book/03-architecture.md`
- Persistence rules: `/01-brand-book/05-wow-mechanics.md`
- Companion implementation: `/04-build/src/companion/` (after scaffold)
- Hooks: `/04-build/src/hooks/` (after scaffold)

---

*End of footer + global. End of wireframes folder. Continue with the build scaffold in `/04-build/`.*
