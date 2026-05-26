# About page — v1 status log

**Route:** `/about`
**Built:** May 26, 2026
**Version:** v1 (with revision pass + theme/cutout fix)
**Next version:** v2 ships May 2027 (footer commitment, non-negotiable)

---

## Revision 3 — May 26, 2026 (later)

Four asks: use all the photos, swap entry image, drop Dhaka-Delta theme,
match site fonts.

### Photo wall — all 10 photos now used, new bento layout
The previous flow-column layout was reading as basic masonry. Replaced
with an explicit 12-col bento grid:

| row | left                  | right                    |
|-----|-----------------------|--------------------------|
| 1   | lake louise (6)       | troy (6)                 |
| 2   | the IT squad at FIC (12, full-width) ||
| 3   | buddies (7)           | the SIAT crowd (5)       |
| 4   | pickup football (6)   | hackathon team (6)       |
| 5   | BSA SFU (5)           | paintball day (7)        |
| 6   | trails (12, full-width landscape) ||

Each photo lives in its own print-frame (thin amber hairline, 5px
padding) at natural aspect — no cropping. Brief lowercase italic
caption (`font-display` italic) sits beneath each. Subtle 0.3° rotate
on hover so the wall feels pinned, not glued.

New photos brought in from `04-build/public/about/`:
- `troy.jpg` (245 KB after resize)
- `me-at-IT-Squad.jpg` (161 KB, was 6.3 MB)
- `my-buddies.jpg` (227 KB)
- `all-friends.jpg` (150 KB)

### Window block — Dhaka-Delta narrative stripped
Removed the entire migration / GMT / 1-3am-working-slot copy block.
Block title also dropped — the portrait + "Hi, I'm Kashfi." caption
carries the section on its own. The two-windows pixel-art placeholder
(which was tied to the migration metaphor) is removed too.

Entry image is now `portrait.png` per Kash's pick (the close headshot).
Body copy is held as a visible `CopyPlaceholder` for Kash to write a
fresh intro that does not reference the origin story.

### Fonts — matched to site
The about page primitives no longer use Instrument Serif / DM Sans /
DM Mono via inline `fontFamily`. Everything is now on the site's
tailwind families:

| primitive    | was             | now (tailwind class) |
|--------------|-----------------|----------------------|
| SerifTitle   | Instrument Serif| `font-display`       |
| SerifHeadline| Instrument Serif| `font-display`       |
| BodyText     | DM Sans         | `font-sans` (Inter)  |
| BodyProse    | DM Sans         | `font-sans`          |
| MonoLine     | DM Mono         | `font-mono` (JetBrains Mono) |
| CaptionLine  | (new)           | `font-display` italic |
| Bangla phrase| inline serif    | `font-bangla` (Hind Siliguri) |

The about page now reads with the same typography as the homepage and
case studies.

### Build verification (revision 3)
`npx vite build` clean — `AboutPage-DHDD8RBw.js` 12.25 KB / 4.37 KB gzip.

### Two additional out-of-scope file repairs (call out)
Two pre-existing files on disk were truncated, blocking the build the
same way `App.jsx` was earlier. Both had orphan `)` and `}` tokens
piled at the end past the real closing brace:
- `04-build/src/pages/us-among-ai/UsAmongAiPage.jsx` — removed 2 orphan
  lines, parses clean now.
- `04-build/src/pages/something-lurking/primitives.jsx` — removed 3
  orphan lines, parses clean now.

Neither edit changes runtime behaviour; they restore files that were
syntactically broken on disk.

---

## Revision 2 — May 26, 2026 (theme + cutout fix)

Kash flagged two problems after the first revision: the white register
felt off, and the Door grid was cropping his photos.

### Theme — flipped to match the rest of the site
`primitives.jsx` was the only file that needed substantive editing.
The three palette constants (`ABOUT_INK`, `ABOUT_PAPER`, `ABOUT_GREEN`)
keep their export names so the downstream sections inherit
automatically — but the values now point at the dark 2am studio
palette:

| name              | was        | now (matches site tokens)               |
|-------------------|------------|------------------------------------------|
| `ABOUT_INK`       | `#1A1A1A`  | `#E8E6E1` (text.primary)                 |
| `ABOUT_PAPER`     | `#FFFFFF`  | `#0F1112` (surface.deep)                 |
| `ABOUT_GREEN`     | `#1B6B4F`  | `#E8B86A` (accent.glow — warm amber)     |

Two new exports added for clarity going forward: `ABOUT_MUTED`
(`#9C9A95`), `ABOUT_FAINT` (`#6B6963`), `ABOUT_ACCENT` (`#E8B86A`).

`AboutPage.jsx` no longer forces `document.body` to white. The page
inherits surface.deep from the body, so the global noise + vignette +
monitor-glow gradient that live in `index.css` read through every
block. `PageFoot` flipped to light-on-dark — divider rule uses
`rgba(232,230,225,0.12)`, the (with love) parenthetical sits in
`ABOUT_MUTED`.

### Photo cropping — fixed
Two changes:
- **Window — portrait.** Removed the forced `aspect-[3/4]` and
  `object-cover`. The `<img>` is now `block h-auto w-full` inside a
  `max-w-[360px]` figure with a thin amber print-frame. Whatever shape
  Kash's portrait actually is, that is what the reader sees.
- **Door — photo wall.** Switched from a forced-aspect 12-col grid to
  a CSS multi-column flow (`columns-1 sm:columns-2`). Each tile uses
  `break-inside-avoid` and `h-auto`, so no photo is cropped — the
  asymmetric layout emerges from the photos' own aspect ratios
  (tall football vs. landscape hiking vs. ~4:3 community shot). Same
  amber print-frame as the portrait so the page reads as one
  consistent gallery.

### Build verification (revision 2)
`npx vite build` clean — `AboutPage-DTJ1lE5E.js` 12.43 KB / 4.65 KB gzip.

---

## Revision pass — May 26, 2026 (earlier)

Per Kash's three structural changes. Six-block structure, room metaphor,
time-zone math, lowercase voice, white register — all kept.

### What changed
1. **Window block** — portrait photo added at the very top of the block,
   before the body copy. Caption "Hi, I'm Kashfi." (italic Instrument
   Serif, centered). Pattern borrowed from old `about_me.html`. Asset
   wired live at `/about/portrait.jpg` (sourced from `Adventure.jpg` in
   the old repo — the lake-shore outdoor portrait Kash himself chose).
   The two-windows pixel-art frame stays at the foot of the block as
   originally specified.
2. **Door block** — the single pixel football is gone. Replaced with an
   asymmetric 12-col photo grid (5 photos, live):
   - football (col-span-7 row-span-2, tall anchor on the left)
   - hiking (col-span-5)
   - hackathons (col-span-5)
   - community / BSA SFU (col-span-5)
   - extra / paintball (col-span-7)
   Mobile (<sm): all stack to a single full-width column.
3. **Library / Currently / Close / Hero / footer** — unchanged.

### Assets brought in from `github.com/KashfiRashid/Portfolio.git`
All landed in `04-build/public/about/`, resized to max 1600px longest
edge, q80 JPG, EXIF stripped:
- `portrait.jpg` (151 KB, from `Adventure.jpg`)
- `photo-football.jpg` (317 KB, from `Football.jpg`)
- `photo-hiking.jpg` (223 KB, from `Hiking.jpg`)
- `photo-hackathons.jpg` (191 KB, from `Hackathons.jpg`)
- `photo-community.jpg` (90 KB, from `BSA_SFU.jpg`)
- `photo-extra.jpg` (335 KB, from `Paint_Balljpg.jpg`)

**Total weight:** ~1.3 MB across six images. Original repo totalled
~16 MB before resizing. Alt-text borrowed from Kash's old captions.

### Build verification (revision)
`npx vite build` clean — `AboutPage-DeOjGHrX.js` 12.88 KB, 4.68 KB gzip.
All other pages compile.

### Orphan to clean up
- `04-build/public/about/portrait.png` (1.1 MB). Leftover from the
  initial copy before I converted PNG → JPG (the source was opaque, JPG
  is smaller and matches the brief's `/about/portrait.jpg` slot). Vite
  won't bundle it since nothing references it, but it sits on disk
  unused. The dev environment didn't allow `rm` from the shell. Either
  delete it manually or I can re-attempt with the cowork delete tool on
  request.

---

## Phase log

### Phase A — scaffold (complete)
- `04-build/src/pages/about/primitives.jsx` — shared blocks in the about
  register (white bg, `#1A1A1A` ink, `#1B6B4F` green). Components:
  `BlockShell`, `WideShell`, `SerifTitle`, `SerifHeadline`, `BodyText`,
  `BodyProse`, `MonoLine`, `QuietLink`, `AssetPlaceholder`, `CopyPlaceholder`.
  Fonts wired explicitly via inline `fontFamily` (Instrument Serif, DM Sans,
  DM Mono) — tailwind's `font-display` is avoided because it resolves to
  Editorial New (unloaded) → Georgia.
- `04-build/src/pages/about/sections/` — seven section files, one per block:
  `Hero.jsx`, `Window.jsx`, `Desk.jsx`, `Library.jsx`, `Door.jsx`,
  `Currently.jsx`, `Close.jsx`.
- `04-build/src/pages/about/AboutPage.jsx` — composition + page-foot
  (Bangla phrase, land acknowledgement, build-by line). Forces
  `document.body` to white on mount, restores on unmount, so the dark
  body atmospherics don't bleed at the page edges.
- `04-build/public/about/` — directory created, awaiting asset drops.
- `04-build/src/App.jsx` — line 28 only: lazy import target swapped from
  `./sections/About.jsx` to `./pages/about/AboutPage.jsx`. Existing
  `sections/About.jsx` is untouched on disk; it is simply no longer
  routed.

### Phase B — seed copy (complete)
Kash-confirmed seed text from the brief landed in:
- Hero overlay: "kashfi rashid" + "design engineer. mostly at 2am." +
  "final-year SFU SIAT. graduating June 10, 2026. Delta, BC."
- Window: Dhaka → Delta in 2022, GMT+6 vs GMT-8, the 1-3am family-call
  window as the origin of the 2am working slot.
- Desk: the design-engineer-is-a-workflow framing + three named ships
  (BC Connect, Spectral Bloom, ForeSee) with the exact accomplishments
  from the brief.
- Library: Library of People framing + method conversion (text-only,
  no decoration).
- Door: football thread (Sullivan twins, Farhaan Ali Wahid, BFF
  paperwork, rec/pickup) + pixel-room → real-desk sentence.
- Close: graduating June 10, 2026 + open-to-roles + quiet `/resume.pdf`
  link.
- Page-foot: `ভালোবাসা সহ` + parenthetical translation, land
  acknowledgement, "v1, May 2026. v2 ships May 2027."

### Phase C — visual assets (complete, all pending)
The hero video is the only asset wired live. Every other visual slot
renders as a labeled `AssetPlaceholder` pointing at the exact filename
Kash needs to drop in:
- Hero: `/home/scene-working.mp4` (reused), tinted via `filter:
  saturate(0.85) brightness(0.78)` + a top-to-bottom dark scrim so the
  white headline is legible. Falls back to the existing
  `/home/hero-poster.webp` poster when paused.
- Window: `/about/two-windows.png` — placeholder at 16:9, max 720px.
- Desk: `/about/thumb-bc-connect.png`, `/about/thumb-spectral-bloom.png`,
  `/about/thumb-foresee.png` — three placeholder squares.
- Door: `/about/football.png` — placeholder at 1:1, max 96px.

### Phase D — polish + verification (in progress, last)
- Vertical rhythm: every block uses `py-20 md:py-24` via `BlockShell` /
  `WideShell`. Hero is its own full-viewport beast, no shell.
- Hover state on `QuietLink`: text color flips from `#1A1A1A` to
  `#1B6B4F`; underline thickens from 1px to 2px on hover.
- `prefers-reduced-motion`: hero video reads the media query and pauses
  on `reduce`. Poster image stays visible.
- Mobile reflow at 380px: shells use `px-6`, hero copy uses `max-w-[1100px]
  mx-auto` so the headline does not run off; the Desk thumbnail row is
  `grid-cols-1 sm:grid-cols-3` so it stacks below 640px.
- Build: `npx vite build` clean (587 modules transformed, AboutPage
  chunk 11.39 kB gzipped to 4.27 kB).

---

## Stop-condition checklist

- [x] Page renders end-to-end at `/about`.
- [x] All existing pages still render (build is clean across the full
      page tree — Home, Work, ProjectRoute, HallOfFame, About).
- [x] Every block is either filled with Kash-confirmed seed copy or shows
      a clearly labeled placeholder.
- [x] No fabricated copy. No fabricated assets.
- [x] No git commits.
- [x] Status log written (this file).

---

## ⚠ Out-of-scope file repair (call out before merging)

While building, the existing `04-build/src/App.jsx` was discovered to be
**truncated on disk** at line 290 — missing the closing `)` and `}` of
the `NotFound()` function. This is unrelated to the about route swap
(my edit only changed line 28, the lazy-import target). The truncation
predates this session.

Without the closing braces the entire site fails to build with
`Expected ")" but found end of file`. To unblock the build, I appended
the missing `\n  )\n}\n` at the file's end. Net effect on the file
beyond the route swap: two characters of restored syntax. The
`NotFound` component now compiles as originally intended.

If you'd rather revert this and fix it differently, the diff is
trivial — but the site does need those characters to compile.

---

## Kash punch-list — fill before launch

### Copy (visible `CopyPlaceholder` slots in the page)
- [ ] **Window — closing sentence**. One line linking the Dhaka/Delta
      time-zone math to a current habit. Target: 1 sentence.
- [ ] **Library — youCode chair moment**. Brief seed: "sitting down at a
      chair to help a team with a question I didn't know the answer to,
      ending up as part of the team for the next two hours." Confirm
      exact wording. Target: 20-30 words.
- [ ] **Door — heritage line**. Pick one of the two seeds in the brief
      (PNE BBQ in summer / the Bangla phrase from the footer). One
      sentence only, no essay.
- [ ] **Currently — four mono lines**. Replace the four bracketed
      placeholders in `sections/Currently.jsx` with real values:
      - currently building: [thing]
      - currently learning: [tool or idea]
      - currently listening: [one named album, year]
      - currently reading: [one book]
      Each under 12 words.

### Visual assets (drop into `04-build/public/about/`)
- [x] `/about/portrait.jpg` — wired (Adventure.jpg from old repo, resized).
- [x] `/about/photo-football.jpg` — wired.
- [x] `/about/photo-hiking.jpg` — wired.
- [x] `/about/photo-hackathons.jpg` — wired.
- [x] `/about/photo-community.jpg` — wired (BSA SFU shot).
- [x] `/about/photo-extra.jpg` — wired (paintball).
- [ ] `/about/two-windows.png` — pixel-art, 16:9, max 720px wide.
      Same desk and lamp, left window Dhaka rooftops at dusk, right
      window Delta rain at night, same isometric angle, no character.
- [ ] `/about/thumb-bc-connect.png` — pixel-art, 120 × 120, transparent.
- [ ] `/about/thumb-spectral-bloom.png` — pixel-art, 120 × 120, transparent.
- [ ] `/about/thumb-foresee.png` — pixel-art, 120 × 120, transparent.
- ~~`/about/football.png`~~ — no longer needed; replaced by the
      `near the door` photo grid per revision brief.

### Other
- [ ] `/resume.pdf` — confirm the close-block link target exists at
      `/04-build/public/resume.pdf`. The `<QuietLink>` in `Close.jsx`
      currently points to `/resume.pdf` with `external` (opens in a new
      tab). If the live resume URL is the Google Drive one used elsewhere,
      swap the href.

### Once placeholders are gone
Swap each `<AssetPlaceholder ... />` for a real `<img />` (or `<video />`
for any clip), and replace `<CopyPlaceholder ... />` with `<BodyText>`
holding the confirmed copy. The component files are co-located inside
`pages/about/sections/` for a one-file-per-block edit.
