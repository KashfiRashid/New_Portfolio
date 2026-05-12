# 06 — Visual Direction

> The 2am studio world rendered out. Color, type, motion, references. Every visual choice on this site is tested against: *does it feel like a working studio at 2am, or does it feel like a designed website pretending to?*

---

## The personal world — locked

Per Q A1: **2am studio environment.**

The site lives inside the late-night working aesthetic. Monitor glow against dark surfaces. Cursor traces on screen. Ambient sound where it fits. Screen recordings of actual late-night work as content. The textures of the time of day when the real work happens.

This isn't a theme to decorate over. It's the *setting*, in the same way Keyaan's site has a campsite-under-stars setting that's only Keyaan's. Visitors should feel like they walked into a quiet room where someone is working.

### Why this world fits Kash specifically

- It's *real*. Most of the work actually happens at 2am. The brief and the chat both reference this rhythm.
- It supports the visual restraint principle. 2am studios are dark, not flashy. Glow is incidental, not feature.
- It supports the companion. A small bubble next to your cursor reads naturally as a quiet aside in a quiet room. The same bubble on a sunlit white background would feel like a tooltip.
- It supports the idle layer. Clips of Kash's actual desk, screen recordings of working sessions, voice notes from late nights — these all live inside the world rather than being decorative.
- It supports the cursor color identity. Visitor colors are more legible against dark surfaces. The 2am world makes the visitor's color *pop* in a way a light theme wouldn't.

### Anti-pattern

The 2am world is **not**:
- A "dark mode" toggle. The dark surface is the default and only mode for v1.
- Cyberpunk. No neon glow excess. No grid lines and chromatic aberration.
- Movie-set "designer working at 2am" theatrics. No coffee cups in frame, no headphones-on-desk stock-photo energy.
- A coding-themed site. We're not styling like a terminal or VS Code.

The world is **quiet, low-saturation, light-as-warmth, work-in-progress.** Closer to the Spendy / FutureSpend bar than to anything dramatic.

---

## Color principles

### Surface palette (the base)

Three surface tones, all dark, all desaturated. Used for backgrounds, cards, modals.

| Token | Approx hex | Use |
|-------|------------|-----|
| `surface.deep` | `#0F1112` | Main page background. Near-black with a hint of blue-warm. |
| `surface.mid` | `#16191B` | Cards, sections, the companion bubble base. |
| `surface.raised` | `#1E2225` | Elevated surfaces (modals, focused project cards, hover states). |

Restraint principle: never more than three surface levels visible at once. If a fourth is needed, redesign the layout so it isn't.

### Text palette

| Token | Approx hex | Use |
|-------|------------|-----|
| `text.primary` | `#E8E6E1` | Body text. Off-white with a slight warm tint. Not pure white. |
| `text.secondary` | `#A8A6A0` | Captions, metadata, companion bubble labels. |
| `text.tertiary` | `#6E6C68` | Muted text, dividers as text, footer fine print. |

### Accent — the warm light spill

The 2am studio has one warm light source (monitor or lamp). The accent palette reflects that — warm, low-saturation, used sparingly.

| Token | Approx hex | Use |
|-------|------------|-----|
| `accent.glow` | `#E8B86A` | The "monitor glow" warm — used for hover highlights, focus rings, key accents. **Used <5% of total visible color.** |
| `accent.glow-soft` | `#E8B86A` at 12% opacity | Soft glow effects, gradient washes behind hero. |

### Visitor color palette (Layer 1 of wow stack — see `05-wow-mechanics.md`)

8–10 colors that work on the dark surface and stay distinguishable from the warm accent. Each is desaturated enough to feel intentional, not pure rainbow.

| Color | Approx hex | Notes |
|-------|------------|-------|
| Crimson | `#D9536F` | Like a warm red brick. |
| Amber | `#E0A14B` | Slight overlap with accent.glow — use sparingly to avoid confusion. |
| Olive | `#A8B36E` | Quiet green. |
| Teal | `#6BA8A8` | Cool, restrained. |
| Slate | `#7C9CC2` | Cool blue, low-saturation. |
| Plum | `#9F7AB3` | Quiet purple. |
| Rose | `#D89A9A` | Soft warm. |
| Sand | `#C9B68B` | Warm neutral. |

> `[NEEDS KASH INPUT: confirm palette or pick alternates. The hex values are starting points; the principle (desaturated, dark-surface-friendly, distinguishable from accent.glow) is what matters.]`

### Color rules

- **Dark surfaces dominate.** ~80% of total visible canvas.
- **Text is the second-most-visible element.** ~15%.
- **Accent.glow is rare.** <5%, used for emphasis only.
- **Visitor color is the third color event** — present in the cursor, optionally in companion bubble accents, and quietly elsewhere.
- **No saturated brand color.** No rainbow gradients. No mesh blobs. No "default Tailwind blue."
- **No pure white anywhere.** Pure white kills the 2am atmosphere instantly.
- **No pure black either.** Pure black reads as default-OLED rather than chosen-dark.

### Reference for the bar

Look at Spendy / FutureSpend. Look at Seido. Look at how restrained their use of color is. That's the bar. Anything more saturated is wrong for v1.

> `[NEEDS KASH INPUT: Seido + Spendy URLs to lock the bar. fact sheet Section 10 has them blank.]`

---

## Typography

The 2am world wants type that feels intentional, considered, slightly mature. Not trendy. Not display-y.

### Type stack — proposed

| Role | Family candidate | Why |
|------|-------------------|-----|
| Body | **Inter** or **Söhne** or **Geist Sans** | Clean, neutral, very legible at small sizes. The companion bubbles need a body family that reads at 14–16px. |
| Display / Hero | **Söhne Breit**, **Editorial New**, or **Reckless Neue** | A more characterful type for hero lines and section openers. Pulls the warm-reflective register. |
| Mono | **JetBrains Mono** or **Geist Mono** or **Berkeley Mono** | For code samples in Process section, planning doc captions, occasional design-detail moments. |
| Bangla (selective use) | **Hind Siliguri**, **Tiro Bangla**, or **Noto Sans Bengali** | For the Origin section pull-quotes and select moments. > `[NEEDS KASH INPUT: pick — visual restraint principle applies; pick the most legible quiet option]` |

> `[NEEDS KASH INPUT: pick body, display, mono, Bangla. The above are starting candidates that fit the 2am-restraint-quiet brief. If Kash has strong opinions, those override.]`

### Type rules

- **One body family.** No mixing serifs in body copy.
- **Display for the hero only.** Section openers can use display sparingly. Don't apply display family across multiple elements per page.
- **Mono only where it's literal** — code, planning doc captions, possibly small footer fine print. Not used for "designer aesthetic" bullshitting.
- **Bangla appears in Origin section, possibly in select Hall of Fame entries, possibly in select companion bubbles as easter eggs.** It's not used decoratively — it's used where it belongs to the moment.

### Type scale — proposed

```
Hero:       64-80px   display family, tight tracking, line-height 1.05
Heading 1:  44-52px   display or body, 600 weight, line-height 1.1
Heading 2:  28-32px   body family, 600 weight, line-height 1.2
Heading 3:  20-22px   body family, 500 weight, line-height 1.3
Body:       16px      body family, 400 weight, line-height 1.55
Small:      14px      body family, 400 weight, line-height 1.5
Caption:    12px      body family, 400 weight, line-height 1.4, letter-spacing 0.02em
Companion:  15-16px   body family, 400 weight, line-height 1.4
```

These are starting points. The build phase tunes against actual reading.

---

## Motion principles

The 2am world has **slow, low-amplitude motion.** Nothing snappy. Nothing bouncy. The tempo is *late-night-thoughtful*, not *attention-grabbing*.

### Motion rules

- **Default duration:** 250–400ms for most transitions. Faster (150ms) for cursor-attached events. Slower (600ms) for ambient world transitions.
- **Easing:** prefer `ease-out` or custom bezier curves with gentle settling. Avoid `ease-in-out` defaults — they read as "made by a generator."
- **Translate amounts:** small. 4–12px for most reveal animations. Anything more reads as bouncy.
- **No spring physics by default.** framer-motion's `spring` is fine for the cursor-attached companion bubble micro-movements, but no overshoot.
- **No auto-bouncing reveals.** No "fade in from below with a 20px bounce on every section." The site reveals quietly.
- **No Lottie loaders.** Use custom subtle loaders if needed — a single dot pulsing slowly, or just nothing.
- **Cursor traces** — a faint tail behind the cursor, in the visitor's color, fading over ~600ms. Optional ambient flourish; can ship without it in v1.
- **Reduce motion respect** — `prefers-reduced-motion: reduce` removes all parallax, all translates, keeps fades only.

### Motion reference

- **What to borrow:** Spendy / FutureSpend's low-key transitions. Linear's defaults. Vercel's hover states.
- **What to reject:** any portfolio that uses heavy GSAP timelines for "wow." Auto-playing hero videos. Cursor-following blobs (Kash's cursor-attached companion is precise, not blob-y).

### Idle layer motion

The idle reel surfaces with: 600ms fade + 8px upward translate. Loops at 1× speed once. Fades on movement detection. No bouncing, no parallax, no zoom. The reel speaks for itself.

---

## Imagery and texture

### Photography
- **Kash's actual desk and studio.** Low-light, warm-lamp. Shot vertical or 4:5 for use in cards.
- **Convocation footage** when it lands.
- **Hackathon team photos** with consent.
- **Behind-the-scenes from BLU / Spectral Bloom / etc.**

### Texture
- **Subtle grain or noise on dark surfaces.** ~3% opacity grain texture on `surface.deep`. Stops the dark from looking flat. Inspired by analog film, not by digital glitch.
- **Soft monitor-glow gradients** behind hero or in select transition moments. Always low-opacity, always warm-leaning.

### Anti-textures
- No mesh gradients.
- No glassmorphism (frosted blur for its own sake).
- No 3D blob shapes.
- No glitch effects.
- No "Midjourney-aesthetic" rendered scenes.

---

## References — what to borrow, what to reject

### Borrow from Keyaan Vegdani
- **The world-as-setting principle.** Keyaan's site has a campsite-under-stars; Kash's has a 2am studio. Setting is the visual baseline, not a section.
- **Inline video previews on project cards.** Looping, silent, replacing static thumbnails.
- **Footer that confesses something quiet and personal.** Keyaan's is Animal Crossing nostalgia. Kash's is `[NEEDS KASH INPUT: which secret]`.
- **Land acknowledgment in footer.** Vancouver-area, culturally appropriate.

### Reject from Keyaan
- **Borrowed nostalgia as a world theme.** Animal Crossing is Keyaan's secret origin. Kash's secret origin needs to be Kash's, not borrowed.
- **Decorative display typography.** Keyaan's leans into motion-art. Kash's stays restrained.

### Borrow from Caleb Wu
- **Visible changelog / "Last updated" date** somewhere on Home or in footer.
- **Secret footer** — something only people who scroll all the way down see.
- **Personal sign-off** at the bottom of the site.
- **Return-visit reward concept** (mechanic, not stickers).

### Reject from Caleb Wu
- **Sticker collection** — too sweet for Kash's voice.
- **The "thanks for stopping by :)" tone** — too sweet.
- **Words-with-images-in-them headline** — cool for Caleb, would feel borrowed on Kash.

### Borrow from Harjot Singh
- **Name + color personalization** — full mechanic.
- **"Currently at..." status line** — adapt to Kash's roles.
- **Personal photo strip** in About / Origin / People.

### Reject from Harjot Singh
- **Standard contact form** — Hall of Fame replaces it.
- **Conventional case study card grid** — Kash uses inline-video + companion-annotation.
- **Generic hero copy** — Kash's hero is *"ambitious but executioneery"* or its remix.

### Borrow from Abdul Hamoui
- **AI-as-self framing** — but evolved into cursor-attached companion (not Q&A widget).
- **"Powered by Claude" label** — small, in footer, honest about what powers the companion.
- **Evidence-linked claims discipline** — every "warm" / "thinks about people" claim hard-linked to a real moment.

### Reject from Abdul Hamoui
- **Q&A widget format** — companion is contextual, not interactive.
- **Certifications wall** — Kash doesn't lead with credentials.
- **Standard skills section by category** — Process and Voice cover this terrain better.

### Borrow from Dropbox brand site
- **Modular section architecture** — eight rooms, not three CV tabs.
- **Quote opener** — a meaningful quote on Home instead of *"Hi I'm Kashfi."*
- **Confident declarative section openers.**
- **Author credit / toolkit framing.**

### Reject from Dropbox brand site
- **Corporate-brand polish in copy** — Kash is warmer-reflective, not professional-friendly.
- **Literal sections (Logo, Typography)** — Kash isn't a brand-system page.

### Visual restraint bar — Seido, Spendy / FutureSpend

These are the discipline references. **No visual move on Kash's site is allowed to be more decorated than these.** That's the bar.

> `[NEEDS KASH INPUT: URLs and 2-3 specific moves Kash wants to borrow from each. Without these, the bar is held loosely. References-annotated.md sections 6 and 7 are the canonical home for these notes.]`

---

## What the homepage looks like (rendered out)

A working sketch, in words:

```
[Top of viewport — surface.deep, slight grain, soft warm gradient in upper-right corner like a lamp]

The hero line, in display family, large, off-center to the left:

  Ambitious but
  executioneery.

Below it, smaller, body family, secondary text color:

  Kashfi Rashid · designer, developer, sound person, son.
  Currently at FIC IT Squad · graduating SFU SIAT June 10.

The visitor's cursor enters from where they came from. Default
white-ish. The site has rendered for ~1s. Then a soft inline prompt
appears centered slightly below the hero:

  what should I call you while you're here?
  [_____________]

After name entry: cursor color transitions to the assigned color.
Companion bubble appears next to cursor: "hey [name]. you're red. sit anywhere."

Lower in the viewport — a subtle ambient idle indication. Maybe a
single dot pulsing slowly, or a small "scroll for more" hint.

No nav bar. No "Get in touch" CTA. No carousel. No auto-playing
video. Just the hero, the prompt, the bubble, and the room.
```

That's the v1 home. Restrained on purpose.

---

## What the visual world is *not* doing

To prevent drift:

- Not using GSAP timelines for "wow."
- Not using Three.js for the homepage backdrop. Three.js shows up in Spectral Bloom only.
- Not using mesh gradients anywhere.
- Not using glassmorphism / frosted blur as a theme.
- Not using neon. Not using cyberpunk. Not using Y2K.
- Not using a custom mouse cursor that's anything other than a colored arrow.
- Not using sticky audio that plays on page load.
- Not using a hero video that auto-plays.
- Not using "skills" badges, "tech stack" rows of logos.
- Not using "let's grab coffee ☕" emoji-laced CTAs.

---

## Asset folder structure (cross-reference `references-annotated.md`)

When media lands, it goes in `/00-brief/refs/` per the structure already specified in `references-annotated.md`. Build-phase assets eventually live in `/04-build/`.

For visual direction specifically, the relevant folders:
- `/00-brief/refs/north-stars/seido/` — Seido screenshots and notes
- `/00-brief/refs/north-stars/spendy/` — Spendy / FutureSpend screenshots and notes
- `/00-brief/refs/personal/` — Kash's actual desk, studio, sketches, raw material
- `/00-brief/refs/companion/` — Figma Tip cursor-bubble reference

> `[NEEDS KASH INPUT: actual refs/ folder is currently empty. Build phase will need real assets to lock visual decisions.]`

---

## v1 visual decision summary

| Decision | v1 default | Confidence |
|----------|------------|------------|
| Personal world | 2am studio environment | Locked (Q A1) |
| Surface base | Dark, three levels | High |
| Accent | Warm monitor-glow at <5% | High |
| Visitor palette | 8 desaturated colors | Working — confirm with Kash |
| Body type | Inter / Söhne / Geist Sans | Working — pick one |
| Display type | Söhne Breit / Editorial New / Reckless Neue | Working — pick one |
| Bangla type | Hind Siliguri / Tiro Bangla / Noto Bengali | Working — pick one |
| Motion default | 250–400ms ease-out, low translate | High |
| Idle reel | 12s trigger, 600ms fade-in, single play | High |
| Imagery | Kash's real desk, BLU stills, hackathon photos | Pending raw material |
| Texture | Subtle grain on dark, warm gradient in select moments | High |
| Visual bar | Seido + Spendy / FutureSpend | Locked, but specifics still pending |

---

*End of visual direction. Continue with `07-hall-of-fame-spec.md`.*
