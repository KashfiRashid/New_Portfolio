# Something Lurking — case study assets

This folder holds the media for the Something Lurking case study
(`src/pages/something-lurking/`). Files served from here resolve at
`/something-lurking/<filename>` in the app.

## In place and wired up

| File | Used in | Source | Notes |
|------|---------|--------|-------|
| `scale-1to1.png` | The Premise | Cropped from Fig 6 | Corridor at full scale, captioned individually |
| `scale-1to100.png` | The Premise | Cropped from Fig 6 | Fusebox interior at 1:100, red wiring |
| `scale-1to1000.png` | The Premise | Cropped from Fig 6 | Bioluminescent vent shaft at 1:1000 |
| `fig-grab-interactions.png` | Coursework to Puzzle | Project report Fig 4 | Fusebox fuses, sliding door, chip-grid wire puzzle |
| `fig-armband-poke.png` | Diegetic UI | Project report Fig 3 | Wrist armband poke + external elevator switch |
| `fig-unity-detection-cubes.png` | P1 to Final | Project report Fig 5 | Unity Editor hierarchy with detection-cube triggers |
| `fig-art-collage.png` | Results | Project report Fig 7 | The full art set Eric modeled across all locations |
| `fig-three-scales.png` | (none — kept as backup) | Project report Fig 6 source | Uncropped strip; the three `scale-*.png` panels were cropped from this. Safe to delete. |

The hero video is embedded directly from YouTube (`eK9rhROT4ds`).
No local mp4 is needed.

## Optional asset adds — only if you want more visual density

These would strengthen the case study but are not blocking. Each has a
natural home if you decide to capture them.

| Slot | Suggested asset | Where it would live | Save as |
|------|-----------------|----------------------|---------|
| Hero secondary | A poster frame from the demo if you want a still under the video | Hero, below the video | `hero-poster.jpg` (1920×1080) |
| Story board | A whiteboard photo or paper sketch of the original three-act spine | The Premise, above the ThreeActStructure diagram | `story-board.jpg` (1920×1080) |
| A1 / A2 artifact | A page from one of your A1 / A2 documents next to an in-game puzzle | Coursework to Puzzle section | `a1-a2-artifact.png` (1920×1080 or 2400×1500) |
| Audacity session | Screenshot of Audacity with one character voice track + effects chain visible | Sound as Architecture, after the SoundPipelineDiagram | `audacity-session.png` (1920×1080) |
| Comic spread | A spread from the official Something Lurking comic PDF | The Premise as a side note, or Reflection | `comic-spread.png` (any) |

When you drop a file in, edit the matching section file in
`src/pages/something-lurking/sections/` and add a `<Figure ... />` block.
The `Figure` primitive in `primitives.jsx` already exists and takes
`src`, `alt`, `label`, `caption`.

## Source PDF

The five figures wired up came from the official IAT 445 final report
(`IAT445_Group12_Fall25_Final_Report.pdf`, 17 pages, Group 12, Fall 2025).
Higher-resolution renders of every page are at `/tmp/sl-figures/page-XX.png`
inside the sandbox if you want to pull additional crops.

## Voice line counts — open ask

The case study currently says "character voices for Captain Harry and
Jack." If you have a number (rough count of voice lines per act, or
total lines), the Sound as Architecture section reads more credibly
with it. Drop a sentence in `Sound.jsx`.

## Reflection paragraphs

The four Reflection paragraphs in `Reflection.jsx` are verbatim from
the approved brief. The three Q3 paragraphs (iteration love, feedback
gap, cliffhanger) and the pattern-across-three-teams positioning
paragraph are not paraphrased.
