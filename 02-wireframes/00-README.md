# Wireframes — Phase 2

> Low-fi structural layouts for every section + onboarding + footer. Markdown-with-ASCII so they're readable without Figma. The Figma file in `/03-design/` will render these out at hi-fi.

---

## What's locked, applied to every wireframe

Pulled from `/01-brand-book/` and Kash's kickoff answers — not re-litigated here.

- **Personal world:** 2am studio (dark surfaces, monitor-glow accent, restrained motion)
- **No traditional top nav.** Section headers self-anchor. Sections discoverable through Home affordances + footer index.
- **Companion is cursor-attached** on desktop, toast-at-bottom on mobile. Rare frequency.
- **Visitor identity flow runs once** on first visit. Cursor color persists across session + future visits (with reset option in footer).
- **Footer is global** — same on every section. Spec in `10-footer-and-global.md`.
- **All 8 sections kept separate** (no merges, per recommendation).
- **Featured Work in v1:** BLU · Spectral Bloom · Something Lurking · BC Connect · PitchFlow · ForeSee. (Us Among AI deferred — role not yet locked.) [NEEDS KASH INPUT to confirm cut]

---

## File map

| # | File | What it covers |
|---|------|----------------|
| 00 | [`00-README.md`](./00-README.md) | This file. |
| 01 | [`01-onboarding-flow.md`](./01-onboarding-flow.md) | Visitor identity prompt, name input, color assignment, first companion bubble. |
| 02 | [`02-home.md`](./02-home.md) | Landing surface. The line, the feeling, entry into 2am studio, navigation affordances. |
| 03 | [`03-voice.md`](./03-voice.md) | Design opinions. The page that earns the *"this guy actually thinks"* feeling. |
| 04 | [`04-eye.md`](./04-eye.md) | Visual taste. Things Kash finds beautiful + curated references. |
| 05 | [`05-work.md`](./05-work.md) | Project list + individual project pages. The 6 featured. |
| 06 | [`06-process.md`](./06-process.md) | How Kash works. AI-as-creative-direction framing. |
| 07 | [`07-people.md`](./07-people.md) | Named credits. Sazzad / Tarif / Tazwar / Sadab / Tawheed / Brett / IT Squad / Father. |
| 08 | [`08-origin.md`](./08-origin.md) | Dhaka → Delta. Selective Bangla. Diaspora-without-template. |
| 09 | [`09-hall-of-fame.md`](./09-hall-of-fame.md) | Public log + Lego-brick submission flow. |
| 10 | [`10-footer-and-global.md`](./10-footer-and-global.md) | Footer (changelog, secret, sign-off, land acknowledgment, reset link, links). Global behaviors. |

---

## Reading conventions used in these files

```
┌──────────────┐    ASCII boxes are layout regions.
│  Region name │
└──────────────┘

[ELEMENT TYPE: short description]   Components.

→ companion-trigger: "bubble copy"   Companion bubble fired here.

[NEEDS KASH INPUT: ...]   Open question that affects this section.
```

Spacing in ASCII is approximate. The Figma file is the source of truth on dimensions.

---

## Cross-references

- `/01-brand-book/03-architecture.md` — section purposes the wireframes are rendering
- `/01-brand-book/04-companion-spec.md` — bubble library (every companion trigger references a bubble ID from there)
- `/01-brand-book/05-wow-mechanics.md` — how visitor identity / companion / idle layer compose
- `/01-brand-book/06-visual-direction.md` — what these wireframes will look like when rendered
- `/01-brand-book/07-hall-of-fame-spec.md` — submission + curation flow
- `/04-build/` — the React app that builds against these

---

*End of wireframes README. Start with `01-onboarding-flow.md`.*
