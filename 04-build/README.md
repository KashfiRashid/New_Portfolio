# /04-build/ — React frontend scaffold

> The portfolio site, scaffolded. React + Vite + Tailwind + framer-motion. Ready for Antigravity (or any agentic coder) to take from here. Brand book is the source of truth: `../01-brand-book/`. Wireframes drive the UI: `../02-wireframes/`.

---

## Quick start

```bash
# from this directory
npm install
npm run dev    # localhost:5173
npm run build  # → dist/
```

Node 18+ recommended. The app has no backend dependency in v1 — Hall of Fame submissions are wired but stub the actual POST.

---

## What's wired and working

The scaffold is **shell-complete**: every section has a route, every wow mechanic has a hook, every companion bubble in the library is callable, every locked decision from the brand book is implemented. What's missing is *content* (Kash's actual words, photos, project case studies) and the *backend* (Hall of Fame API, persistence mirror).

| Layer | Status |
|-------|--------|
| Tailwind tokens (2am studio palette + visitor colors) | done — wired in `tailwind.config.js` |
| Visitor identity flow (`OnboardingModal` + `useVisitorIdentity`) | done — end-to-end with localStorage |
| Color assignment (deterministic from name hash) | done — in `lib/colorAssignment.js` |
| Companion bubble library (60 bubbles across 7 triggers) | done — in `companion/bubbleLibrary.js` |
| Companion rendering (cursor-attached desktop, toast mobile) | done — via framer-motion `AnimatePresence` |
| Frequency rules (8 max/session, 8s cooldown, per-element cap) | done — in `CompanionContext.jsx` |
| Idle detection (12s) | done — in `useIdleDetection.js` |
| Exit-intent | done — in `useExitIntent.js` |
| Returning-visitor recognition (R1/R2/R3 by visit count) | done — in `App.jsx` |
| Routing for all 8 sections + `/work/:slug` | done — `react-router-dom` |
| Footer (changelog, secret, sign-off, Bangla, land ack, reset, links) | done |
| Hall of Fame submission UI (Lego-brick prompts, 280-char limit) | done — frontend; POST is stubbed |
| Reduced-motion respect | done — in `index.css` |
| Date-aware convocation tense pivot (June 10, 2026) | done — in `Origin.jsx` |
| Hall of Fame backend (Supabase + API endpoints) | todo — Claude Code builds against `../01-brand-book/07-hall-of-fame-spec.md` |
| Real content per section | todo — blocked on `[NEEDS KASH INPUT]` markers |
| Final type stack | todo — blocked on Q (font picks) |
| Real visual assets (idle reel clips, photos, project images) | todo — blocked on raw material gathering |

---

## Decisions applied (from brand book + kickoff)

These were locked when scaffolding. Override in code if Kash decides differently.

- **Stack:** React 18 + Vite 5 + Tailwind 3 + framer-motion 11 + react-router-dom 6
- **Hosting target:** Vercel (no platform-specific code yet; portable to Netlify)
- **Persistence:** localStorage with reset option in footer
- **Companion v1:** scripted from `bubbleLibrary.js`, no LLM call. v2 may add Claude API for novel bubbles using the library as voice anchor.
- **Mobile companion:** bottom-anchored toast (full-width minus 16px gutter)
- **Companion frequency:** 5–8 max per session, 8s cooldown, per-element cap, idle reel max 1/session
- **Color palette:** 8 visitor colors, deterministic hash assignment, palette in `lib/visitorColors.js`
- **Featured projects in v1:** BLU · Spectral Bloom · Something Lurking · BC Connect · PitchFlow · ForeSee (6). Us Among AI deferred until role locked.
- **Sections:** all 8 kept separate, no merges
- **Routes:** `/`, `/voice`, `/eye`, `/work`, `/work/:slug`, `/process`, `/people`, `/origin`, `/hall-of-fame`

---

## File map

```
04-build/
├── package.json
├── vite.config.js
├── tailwind.config.js          ← 2am studio tokens, visitor palette, fonts, animations
├── postcss.config.js
├── index.html
├── public/
│   └── favicon.svg             ← placeholder mark
└── src/
    ├── main.jsx                ← bootstrap
    ├── App.jsx                 ← routing, identity, companion provider, idle/exit hooks
    ├── index.css               ← Tailwind base + custom :root + component patterns
    │
    ├── companion/
    │   ├── bubbleLibrary.js    ← 60 bubbles (E×7, H×18, C×8, S×7, I×8, X×6, R×6)
    │   ├── CompanionContext.jsx ← fire(), frequency rules, active state
    │   └── Companion.jsx       ← cursor-attached / toast renderer
    │
    ├── hooks/
    │   ├── useVisitorIdentity.js   ← localStorage + setName + reset + visit count
    │   ├── useIdleDetection.js     ← 12s stillness → callback
    │   └── useExitIntent.js        ← cursor-out-of-viewport → callback (once/session)
    │
    ├── lib/
    │   ├── visitorColors.js    ← 8-color palette
    │   └── colorAssignment.js  ← DJB2 hash → palette index
    │
    ├── components/
    │   ├── OnboardingModal.jsx ← visitor identity flow (soft, non-blocking)
    │   ├── Breadcrumb.jsx      ← "← home · [section]" interior nav
    │   └── Footer.jsx          ← global, every page
    │
    └── sections/
        ├── Home.jsx            ← hero + section entry row + HoF card
        ├── Voice.jsx           ← 5 starter opinion cards (replace with Kash's list)
        ├── Eye.jsx             ← image grid (empty in v1) + reference list
        ├── Work.jsx            ← 6 project cards + older work list
        ├── ProjectPage.jsx     ← /work/:slug — title + meta + hero + 4 sections + tease
        ├── Process.jsx         ← chairs + score + "what this isn't"
        ├── People.jsx          ← 8 named cards (consent-gated)
        ├── Origin.jsx          ← Dhaka / flight / Delta + Bangla pull + convocation
        └── HallOfFame.jsx      ← entry list + Lego-brick submission panel
```

---

## How the companion fires (mental model)

Every page calls `useCompanion().fire(bubbleId, { elementId })` from event handlers (mouse-enter, click, page-mount, scroll). The provider checks frequency rules and renders `<Companion />` if allowed.

```
User hovers Voice card on Home
  → onMouseEnter: fire('H2', { elementId: 'home-card-voice' })
  → CompanionContext checks:
      - session cap (8 max)? yes — ok
      - cooldown (8s since last)? yes — ok
      - already fired this elementId? yes — first time
  → setActive({ id: 'H2', text: '...', anchor: cursor })
  → <Companion /> renders bubble at cursor position
  → 4s later: setActive(null), bubble fades out
```

The visitor's color tints the bubble's left border — a 1-2px line picking up `--visitor-color`.

To add a new bubble: edit `bubbleLibrary.js`, then call `fire('NEW_ID', { elementId })` from wherever the trigger lives. The bubble library is the single source for copy.

---

## Known issues / known unknowns

- **Type stack hasn't been picked.** `tailwind.config.js` lists candidate fonts; the system fallback works but isn't loaded from a CDN yet. Once Kash picks (per [NEEDS KASH INPUT — Q on fonts]), add font imports to `index.css`.
- **No tests.** v1 ships without unit tests. Recommended add: vitest + @testing-library/react for hooks and CompanionContext.
- **Hall of Fame submit is stubbed.** Frontend posts nowhere. When Claude Code ships the API, point `HallOfFame.jsx`'s `onSubmit` at `POST /api/submit`.
- **No CMS.** All content is hardcoded in section components. If Kash wants to add Voice opinions or Hall of Fame entries without touching code, a Supabase-backed CMS-lite (or Notion API integration) would land in v1.5.
- **Cursor color isn't a custom cursor.** The `--visitor-color` CSS variable powers selection tint and accent borders; the actual cursor sprite stays native. A custom cursor element rendered via `<Companion />` is a v1.5 candidate.
- **No analytics, no third-party scripts.** Footer copy says so; the codebase backs it up.

---

## Open questions blocking content / build (mirror of `/01-brand-book/README.md`)

The brand book README has the canonical 41-question list. The ones that block *this codebase* specifically (vs. just content):

- **Q (fonts)** — pick body, display, mono, Bangla. Update `tailwind.config.js` and add CDN imports to `index.css`.
- **Q (hosting)** — Vercel is the assumption. If Netlify or other, adjust `vercel.json`-style config.
- **Q (LinkedIn / GitHub handles)** — placeholders in `Footer.jsx`. Replace once confirmed.
- **Q (companion v1 = scripted vs. LLM-powered)** — scaffold assumes scripted. To switch to LLM-powered, replace `getBubble(id)` calls in `CompanionContext.jsx` with a Claude API call using the library as few-shot voice anchor.
- **Q E2 (Hall of Fame curation cadence)** — affects copy in `HallOfFame.jsx` confirmation message. Currently says *"i'll review this in the next batch"* (matches monthly recommendation).
- **Q D (people consent)** — `People.jsx` renders all 8 with `[NEEDS KASH INPUT]` consent flags. Set `consent: 'public'` on confirmed names; render others appropriately or remove.
- **Q E (filter scope on /hall-of-fame)** — v1 is default-sort only. To add filters later, extend `HallOfFame.jsx`.
- **Old-portfolio projects** — Documentor / Parpro / Trucking are listed but flagged. Keep / retire / refresh decision needed before final routing.

---

## Handoff to Antigravity

If passing this to Antigravity to take further:

1. **The spec is layered.** Brand book = constants. Wireframes = layouts + bubble triggers per section. This README = which decisions were made.
2. **The voice is locked.** Don't soften "Ambitious but executioneery." Don't add chatbot framing. Don't make the companion talk more.
3. **The companion library is the voice.** Add new bubbles to `bubbleLibrary.js`, never inline copy in section components.
4. **Don't auto-decide open questions.** Anything marked `[NEEDS KASH INPUT]` stays as that marker until Kash answers.
5. **Coordinate with Claude Code on the backend.** The Hall of Fame API + visitor mirror are out of scope here.

---

## Cross-references

- Brand book index: `../01-brand-book/README.md`
- Voice rules: `../01-brand-book/01-voice.md`
- Companion library spec: `../01-brand-book/04-companion-spec.md`
- Wow mechanics integration: `../01-brand-book/05-wow-mechanics.md`
- Visual direction (color tokens, type, motion): `../01-brand-book/06-visual-direction.md`
- Hall of Fame spec: `../01-brand-book/07-hall-of-fame-spec.md`
- Tool delegation: `../01-brand-book/08-tool-delegation.md`
- Execution roadmap: `../01-brand-book/09-execution-roadmap.md`
- Wireframes: `../02-wireframes/`

---

*built at 2am.*
