# Spectral Bloom — case study assets

This folder holds the media for the Spectral Bloom case study
(`src/pages/spectral-bloom/`). Files served from here resolve at
`/spectral-bloom/<filename>` in the app.

## In place and wired up

| File | Used in | Notes |
|------|---------|-------|
| `spectral-bloom-demo.mp4` | Hero | The 1-minute walkthrough (848 × 478). Embedded as an autoplay, muted, looping `<video>`. |
| `spectral-bloom-poster.jpg` | Hero | Poster frame for the video above. |
| `frame-34.jpg` | Under the Hood | Particle-field capture from the demo clip at ~34s. |
| `mode-bloom.jpg` | Five Modes — Bloom | Pulled at ~32s from the 4K source. Dense magenta cloud, green orb. |
| `mode-wave.jpg` | Five Modes — Wave | Pulled at ~30s from the 4K source. Full multi-color waveform terrain. |
| `mode-nebula.jpg` | Five Modes — Nebula | Pulled at ~45s. Quiet moment in the track, sparse particles — replace with a livelier shot if you have one. |
| `mode-helix.jpg` | Five Modes — Helix | Pulled at ~15s from the live-mic section. Full DNA strand. |

## Mode media spec — for the captures you bring

Each mode row renders a 16:9 frame next to the glyph card. The frame
accepts either an image OR a lazy-loaded looping video. Pick whichever
per mode.

**Aspect ratio**: 16:9, exact. Anything else gets letterboxed by `object-cover` and may crop important parts.

**Image** (drop-in still):
- Size: **1920 × 1080**
- Format: JPG (preferred for photographic captures) or PNG
- Target weight: 200–600 KB
- Save as: `mode-<name>.jpg` (e.g. `mode-crystal.jpg`)

**Video** (drop-in looping clip):
- Size: **1920 × 1080**
- Format: **MP4 H.264, no audio**, faststart, yuv420p
- Length: **5–10 seconds**, loopable (start and end frame should match enough that the loop isn't jarring)
- Target weight: 3–8 MB
- Save as: `mode-<name>.mp4` (e.g. `mode-crystal.mp4`)
- Then in `src/pages/spectral-bloom/sections/FiveModes.jsx`, change that mode's `media` entry from `kind: 'image'` to `kind: 'video'` and update `src` accordingly. The `LazyVideo` component handles the rest: it preloads nothing, only starts playing when the row scrolls into view, and pauses the moment it leaves the viewport — exactly the behavior you described.

Quick local transcode command if you have a source clip per mode:
```
ffmpeg -i source.mp4 -vf "scale=1920:1080,fps=30" \
  -c:v libx264 -crf 24 -preset slow -profile:v high \
  -pix_fmt yuv420p -movflags +faststart -an \
  -t 8 mode-<name>.mp4
```

## Crystal still — open item

`mode-crystal.jpg` is missing. The 1-minute demo never settles on
Crystal long enough to pull a clean frame, so the section renders an
`AssetPlaceholder` for it. Drop in your Crystal capture from the IAT 460
deck as `mode-crystal.jpg` at 1920 × 1080.

## Hero video — open item

You uploaded `1min_Update_Spectral_Boom_Better.mp4` (3840 × 2160, ~350 MB).
That is too large to ship as-is, and the sandbox here cannot run an
ffmpeg transcode within its per-command time limit. Transcode locally:

```
ffmpeg -i 1min_Update_Spectral_Boom_Better.mp4 \
  -vf "scale=1920:1080" -c:v libx264 -crf 24 -preset slow \
  -pix_fmt yuv420p -movflags +faststart -an \
  spectral-bloom-demo-better.mp4
```

Save as `spectral-bloom-demo-better.mp4` in this folder, then update
`Hero.jsx` to point at it (plus a matching `spectral-bloom-poster-better.jpg`).
The page currently uses the 848p version which looks fine on most screens.

## Scratch files — safe to delete

`frame-14.jpg`, `frame-24.jpg`, `frame-44.jpg`, `frame-54.jpg` are extra
frames pulled while picking a poster. `spectral-bloom-demo-better.mp4`
is a 48-byte stub from an aborted transcode. Nothing references any of
these. Delete them from File Explorer whenever.

## Open item — Reflection copy

`src/pages/spectral-bloom/sections/Reflection.jsx` carries a draft
reflection written from the project materials. Replace it with your own
words before this goes live.
