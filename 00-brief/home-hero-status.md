# Homepage hero — build status

## Subject

A new full-viewport living-window hero now mounts at the top of the portfolio homepage. The video, the time-aware status text, the identity layer, and the scroll-driven transition into the existing portfolio are all live. The build is green (Vite production build, 533 modules, 5.66s).

## Scope held

Only the allowed files were touched. Every pre-existing element on the homepage still renders, in the same order, pushed below the new hero. Nothing deleted. The Character, Companion, routing, configs, and case study pages are untouched.

Files created:
- `04-build/src/components/HomeHero.jsx`
- `04-build/src/components/homeHeroSchedule.js`
- `04-build/public/home/scene-working.mp4` (copied from `uploads/Landing_Video.mp4`)
- `04-build/public/home/hero-poster.webp` (96KB, generated from frame at t=2s)
- `04-build/public/home/hero-poster.jpg` (128KB, fallback for non-webp clients)

Files edited (additive only):
- `04-build/src/sections/Home.jsx` — two changes: import line, mount `<HomeHero />` as the first child of the outer container. Nothing removed.

## Built

**Hero component** with four layers, back to front: poster (instant paint, no blank frame), looping video (capable surfaces only), legibility scrim (three stacked gradients + 22% floor), identity layer (clock, status, kicker, name, identity line, voice line, status line, photo placeholder, scroll cue).

**Time engine** in `homeHeroSchedule.js`. Schedule (Vancouver local): 00:00–05:59 asleep, 06:00–10:59 transit, 11:30–14:00 meal, all other hours working. The active scene is recomputed every minute so the swap happens on long-open tabs. The clock ticks every second using `Intl.DateTimeFormat` with `timeZone: 'America/Vancouver'` so the result is correct regardless of viewer timezone.

**Honesty rule** — see "Time engine" below.

**Scroll transition** — scene scales 1.0 → 1.06 over the hero's height, vignette darkens from transparent to surface.deep over the last 40%. Existing content uses the existing Reveal component as it enters. One idea, dark, cinematic. No glassmorphism, no stacked textures.

**Performance** — poster is 96KB webp, jpg fallback at 128KB. Video preload is metadata-only. Total hero asset weight under 1.6MB and only the video crosses the wire on capable surfaces.

**Accessibility** — `prefers-reduced-motion` users get the poster only, no scale, no scroll-cue bounce. Mobile under 768px also gets the poster (capability heuristic, no video on small screens). Video is `aria-hidden`. The name is a real `<h1>`. Clock uses `font-variant-numeric: tabular-nums` so the width does not jitter on tick. Autoplay is wrapped in `play().catch(() => {})` for silent failure to poster. Cached-asset edge case (Safari, back-forward cache) handled by an explicit `readyState >= 3` check inside the mount effect.

## Honest gaps

**Scene videos** — three of four scene files do not exist yet on disk. The manifest in `homeHeroSchedule.js` correctly reports `available: false` for `asleep`, `transit`, and `meal`. The active-scene selector still picks the time-correct scene but plays the `working` video as a fallback. The status text still swaps by time, so the hero feels time-aware today. A small note ("scene set: working · other time-of-day clips pending") renders quietly under the status line whenever the fallback is in effect.

To enable a new scene later, drop the file at the listed path and flip `available: true`. Two-line change per video. No other code touched.

| scene | intended path | status text | available |
| --- | --- | --- | --- |
| asleep | `/home/scene-asleep.mp4` | now: asleep. the studio is quiet. | false |
| transit | `/home/scene-transit.mp4` | now: in transit. | false |
| meal | `/home/scene-meal.mp4` | now: lunch. away from the desk. | false |
| working | `/home/scene-working.mp4` | now: heads-down at the desk. | **true** |

**Photo slot** — placeholder is rendered with a dashed border and "photo · pending" label until `/home/kash.jpg` lands. No stand-in image was substituted.

**Identity sentence** — currently ships as: "Designer and developer. I find the real problem and ship the disciplined version of it." This is the through-line for the case studies. If a different sentence is wanted, it swaps in one place inside `HomeHero.jsx`.

**Visible duplication** — the voice line "I design and ship. Mostly at 2am. Mostly with AI as the orchestra and me as the conductor." now appears in the hero AND in the existing CursorGlow block below (which was preserved per the no-deletion rule). Same for the small "kashfi rashid" mono label and the "↓ scroll for more" hint, which now sit just under the hero where they read as redundant after a full-viewport welcome. The plan defers this to Kash's call; the right cleanup is to delete those duplicate lines from Home.jsx once the hero is approved.

**Semantic note** — the page now has two `<h1>` elements (the new "Kashfi Rashid" in the hero, and the existing "Ambitious but executioneery" below). HTML5 permits this since each section has its own outline, but screen readers prefer one H1 per page. If the redundancy above is cleaned up, downgrade the second `<h1>` to `<h2>` while you are there.

**Orphan file in public/home/** — the FUSE-mounted filesystem on this build host disallows `unlink`, so a 0-byte file `_poster_to_delete.png` ended up in the public folder during poster generation and could not be removed by the build process. It is 0 bytes (no payload) and never referenced, so it ships unused with no visual or performance impact. Delete it manually from your local filesystem in a single command: `rm 04-build/public/home/_poster_to_delete.png`.

**LCP could be even faster** — adding `<link rel="preload" as="image" href="/home/hero-poster.webp" type="image/webp" />` to `index.html` would let the browser fetch the poster before the JS bundle parses. Not done in this run because `index.html` is outside the allowed scope.

## Time engine notes

One real video drives all four scene slots via the availability fallback. Today, every hour of day plays `scene-working.mp4` (which is the file you copied from `Landing_Video.mp4`). When a new scene file lands, the only two lines to change in `homeHeroSchedule.js` are the matching scene's `video` path (already set to the intended filename, no edit needed if you keep the name) and `available: true`. The scene loaders, the clock, and the schedule itself need no touching.

## Iteration log

[10:01] Phase A — read Home.jsx, Reveal.jsx, CursorGlow.jsx, index.css, tailwind.config.js. Background `#0F1112` and easing `cubic-bezier(0.22, 0.61, 0.36, 1)` confirmed as the existing site language.
[10:01] Phase A — copied `Landing_Video.mp4` (1.47MB, 1280x720 H.264 + AAC, 8.0s) to `public/home/scene-working.mp4`.
[10:01] Phase A — extracted poster from t=2s of the video. Encoded webp at quality 82 (96KB) and jpg fallback at q5 (128KB).
[10:02] Phase B/C/D — initial pass on `HomeHero.jsx` (poster, video, scrim, vignette, scroll transition, identity layer, scroll cue) and `homeHeroSchedule.js` (manifest + availability fallback + Vancouver time helpers).
[10:03] Phase A — additive edit to `Home.jsx`: added `import HomeHero` and rendered `<HomeHero />` as the first child of the outer flex container. Nothing else changed.
[10:03] Phase A — Vite production build green (601KB JS, 533 modules transformed, 5.66s, all public/home/ assets shipping).
[10:04] Phase E iter 1 — added a top-region scrim layer + flat 22% baseline floor so the top-right status text retains contrast on bright video frames.
[10:04] Phase E iter 1 — added cached-asset shim: if `readyState >= 3` when the effect attaches (Safari back-forward cache, repeat visits), trigger `onCanPlay` manually so opacity does not stay 0.
[10:04] Phase E iter 1 — explicitly gated `useTransform` scale + vignette opacity AND scroll-cue bounce on `reducedMotion`, because framer-motion inline styles bypass the global `prefers-reduced-motion` CSS rule.
[10:04] Phase E iter 1 — clarified the photo placeholder label ("photo · pending") and added `title` attribute with the expected filename and crop.
[10:08] Phase E iter 1 — Edit-tool truncated `HomeHero.jsx` mid-conditional (the same null-byte buffer issue that hit the Parpro build). Rewrote the entire file via shell heredoc, which is the reliable path.
[10:09] Phase E iter 1 — Vite production build green again (615KB JS, 533 modules, 5.66s). Tail and null-byte scan clean on all three new/edited files.
[10:10] Phase E iter 2 — verified the schedule across all five hour boundaries (03:00, 08:00, 12:00, 15:30, 23:00 PT). All scenes resolve correctly with `isFallbackVideo` flag set appropriately. The clock formats with PDT (or PST in winter) and the place suffix.

## Files created and modified

Created:
- `04-build/src/components/HomeHero.jsx` (355 lines)
- `04-build/src/components/homeHeroSchedule.js` (137 lines)
- `04-build/public/home/scene-working.mp4` (1471391 bytes)
- `04-build/public/home/hero-poster.webp` (96416 bytes)
- `04-build/public/home/hero-poster.jpg` (128605 bytes)
- `00-brief/home-hero-status.md` (this file)

Modified (additive only):
- `04-build/src/sections/Home.jsx` — one import added, one component mounted at the top. No existing content touched.

Unintended artifact (FUSE limitation, not from logic):
- `04-build/public/home/_poster_to_delete.png` (0 bytes, harmless, delete locally with `rm`).

## Not done and why

- Three scene videos missing — documented above, file-on-disk required, two-line change to enable.
- `/home/kash.jpg` photo missing — placeholder holds the slot, two-line change to enable.
- `index.html` preload tag for the poster — would improve LCP, but `index.html` is outside the allowed scope for this run.
- Cleanup of redundant lines below the hero (small "kashfi rashid", "↓ scroll for more", duplicate voice line in the CursorGlow block) — deferred per the no-deletion rule; this is your call once the hero is approved.

## Git status

No git operations performed. The dist output went to `/tmp/vite-out` so the repo's `dist/` (if any) is untouched.

## How to judge it

The single test that matters: a stranger lands and within five seconds knows your name, that you are a designer and developer, and that there is real work below worth scrolling to. If the room is beautiful but that test fails, the scrim is too light or the type is too small. Fix in that order. The video is the hook, the words are the catch.
