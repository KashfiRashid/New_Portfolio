# portfolio-2026 — AI agent handoff README

> **You are an AI agent (Cursor, Antigravity, Claude, or similar) that has been handed this repository.**
> Read this entire file before touching anything. It encodes a lot of context that was hard-won across many conversations. Skipping it will cause you to repeat mistakes, override decisions, or rebuild things that already work.

---

## 0. Project at a glance

**Owner**: Kashfi Rashid (referred to as **Kash**), SFU SIAT student, graduating June 10 2026, based in Delta BC, Bangladeshi diaspora.

**What this is**: A personality-driven personal portfolio website (replacing the old `kashfirashid.com`). Built around an autonomous pixel-art character that lives on the site, reacts to the visitor, and gives the brand a distinctive feel.

**Brand promise (locked)**: *"Ambitious but executioneery."* — never soften this tagline. The misshape IS the signal.

**Core feeling the site should produce**: *"this guy actually thinks about people."*

**Personal world (the environmental brand layer)**: 2am studio — restrained, warm-reflective, quiet, focused-but-warm.

---

## 1. How to work with Kash (read this section twice)

Kash has set explicit protocols across the conversations that produced this project. Follow them or you will frustrate him and produce wrong work.

### 1.1 Conversation protocol

**Clarify first, then deliver.** Before producing any substantial file or making any significant code change, briefly confirm what you're about to do. ONE high-leverage clarifying question, not three. Then deliver.

**Format for deliveries**:
1. Brief clarification or acknowledgment (1–3 sentences)
2. The actual deliverable (file, code, or prompt)
3. A **simple numbered list** of next actions, in order

**Tone**: simple words. Direct. Don't bloat. Don't be a sycophant. Don't over-explain things he already understands. Acknowledge mistakes when they happen without spiraling into excessive apology.

**Files vs chat**: substantial deliverables (specs, prompts, code) go in files. Decisions, recommendations, and short answers go in chat. Don't dump 500 lines of markdown in chat — make a file.

**Paste-ready prompts**: when you give Kash a prompt to paste into Cursor/Antigravity/Gemini, format it as a clean code block so he can copy directly. No "modify this part for your situation" — give him the ready-to-go version.

### 1.2 Don't pivot directions without strong reason

Several aesthetic and architectural decisions are LOCKED. They were arrived at through deliberation. Do not re-litigate them without explicit reason from Kash. The locked decisions are in Section 3 below.

### 1.3 Push back when warranted

If Kash proposes something that would hurt the project (e.g., "use GIFs instead of sprites", "make the character bigger", "add bright colors"), explain the tradeoff and recommend the better path. He values honest pushback over agreement. But once he overrides your recommendation, execute his choice.

### 1.4 The "test in browser before optimizing" rule

For anything physics-driven or visual-feel-driven (sway, animation timing, sprite scale, bubble alignment), do not over-spec the numbers. Ship reasonable starting values, then tune after Kash sees it in the browser. Numbers in specs are *starting points*, not gospel.

---

## 2. Tech stack

| Layer | What | Where |
|---|---|---|
| Framework | React 18 (Vite-based) | `04-build/` |
| Styling | Tailwind CSS + custom utilities | `04-build/tailwind.config.js`, `04-build/src/index.css` |
| Animation | framer-motion | Used throughout character system |
| Routing | Standard React (sections as components, not routes for most flow) | `04-build/src/App.jsx` |
| State | React Context + refs for performance-critical paths (character system uses ref-based state machine inside a rAF loop) | `04-build/src/character/CharacterContext.jsx` |
| Asset format | PNG sprites with transparency, image-rendering: pixelated | `04-build/public/character/*.png` |
| Build target | Static site, deployable anywhere |  |
| Repo | `github.com/KashfiRashid/New_Portfolio` | `main` branch is live |

**Dev server**: from `04-build/`, run `npm run dev`. Default URL `http://localhost:5173`. Add `?debug=character` to URL for character debug overlay.

**Production build**: from `04-build/`, run `npm run build`. Outputs to `04-build/dist/`.

---

## 3. Locked decisions — DO NOT re-litigate without explicit Kash override

| Decision | Status | Note |
|---|---|---|
| Tagline: "Ambitious but executioneery" | LOCKED | The misshape is the signal. Don't fix the spelling. |
| Core feeling: "this guy actually thinks about people" | LOCKED | All section copy serves this. |
| Personal world: 2am studio environment | LOCKED | Warm darks, amber/cream highlights, deep navy. NOT neon, NOT kawaii pastel, NOT bright cartoon. |
| 8-section structure: Home / Voice / Eye / Work / Process / People / Origin / Hall of Fame | LOCKED | Don't add or remove sections without conversation. |
| Character is pixel-art (chibi-style with headphones) | LOCKED | NOT silhouette (v1 mistake — corrected to v2 pixel-art). NOT video/GIF (architecture is sprite-swap). |
| Character size: 96px desktop, 72px mobile | LOCKED | Smaller looks invisible (the v1 mistake), bigger feels cartoonish. |
| Sprite assets are PNGs, browser swaps them | LOCKED | NOT animated GIFs (heavy + breaks responsiveness). NOT video. |
| Walk cycle uses HARD SWAP (no cross-fade) | LOCKED | Cross-fade matched cadence and made motion look static. Pixel art games use hard swaps. |
| State changes use 250ms cross-fade | LOCKED | Smooth feel for posture transitions (idle → sit, etc.). Only walking is excluded. |
| Bubble alignment: anchored to character, default above, flip-below if clipping | LOCKED | NOT centered to viewport. NOT cursor-attached. |
| Bubble tail: pixel-art SVG with `shape-rendering: crispEdges` | LOCKED | NOT CSS triangle (anti-aliased fringe). |
| Reels fire on contextual triggers, NOT on pure-timer | LOCKED | Three triggers: bottom-of-page, section dwell, deep idle. Never restore the pure-timer fallback. |
| Activities use no-repeat + sequence bonuses + section bias | LOCKED | See `character-spec-patch-contextual-intelligence.md`. |
| Grab interaction: spring physics + pendulum sway + momentum throw + run-away | LOCKED | See `character-spec-patch-grab-and-throw.md`. |
| Visitor cursor system (visitor's own colored dot) | LOCKED | Don't touch. Separate from character. |

---

## 4. Project structure

```
portfolio-2026/
├── README.md                         ← you are here
├── 00-brief/                         ← AUTHORITATIVE SPECS (read these before coding)
│   ├── character-spec.md             ← main character behavioral spec (v1)
│   ├── character-spec-v2-pixel.md    ← visual rewrite (replaces v1 silhouette)
│   ├── character-spec-patch-showcase.md       ← hover-on-project trigger
│   ├── character-spec-patch-activities.md     ← 5 idle activities
│   ├── character-spec-patch-contextual-intelligence.md  ← smart triggers
│   ├── character-spec-patch-grab-and-throw.md ← drag/throw interaction
│   ├── 00-overview.md                ← brand book overview
│   ├── 01-voice.md                   ← voice spec v1.1 (updated to "Tazwar but more direct")
│   ├── gemini-character-prompt.md    ← Gemini sprite generation prompts (8 sprites)
│   ├── kash-fact-sheet.md            ← biographical facts
│   ├── references-annotated.md       ← reference sites with notes
│   ├── questions-for-kash.md         ← open questions (some resolved, some pending)
│   ├── cowork-brief.md               ← original brief sent to Cowork (Anthropic's doc tool)
│   ├── cowork-kickoff-prompt.md      ← prompt template for Cowork runs
│   └── chat-transcript.md            ← original brand discovery chat archive
│
├── 01-brand-book/                    ← Cowork-generated brand book output
│   └── (11 md files covering voice, visual direction, content well, etc.)
│
├── 02-wireframes/                    ← Cowork-generated wireframe specs
│   └── (11 md files, one per section + global)
│
└── 04-build/                         ← React + Vite production build
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── public/
    │   └── character/                ← SPRITE ASSETS (PNG with alpha)
    │       ├── idle.png              (base sprite, generated in Gemini)
    │       ├── walk-a.png            (walking frame 1)
    │       ├── walk-b.png            (walking frame 2, alternates with walk-a)
    │       ├── wave.png              (greeting)
    │       ├── sit.png               (seated baseline)
    │       ├── sit-laptop.png        (seated coding)
    │       ├── peek.png              (upper body only, peeking)
    │       └── stretch.png           (arms overhead — note: this one is missing headphones, low priority to regenerate)
    └── src/
        ├── App.jsx                   ← provider order: CharacterProvider wraps CompanionProvider
        ├── character/                ← THE CHARACTER SYSTEM (this is where complexity lives)
        │   ├── Character.jsx         ← main component, mounted from Companion.jsx
        │   ├── CharacterContext.jsx  ← state machine in rAF loop, all triggers
        │   ├── CharacterSprite.jsx   ← posture-driven sprite renderer, fade, bob, mirror, rotation
        │   ├── CharacterBubble.jsx   ← speech bubble above character, pixel-art tail
        │   ├── ReelHandoff.jsx       ← reel custody choreography
        │   ├── perches.js            ← per-section perch coordinates, nearestPerchTo, farthestPerchFrom
        │   ├── states.js             ← 11 base states + showcasing + grabbed/thrown/running_away
        │   ├── reelPools.js          ← per-trigger reel selection
        │   ├── useReelTriggers.js    ← three contextual reel detectors
        │   ├── throwQuips.js         ← (added by Cursor — small quips during/after grab)
        │   └── debug/
        │       └── CharacterDebug.jsx ← debug overlay (toggle via ?debug=character)
        ├── companion/                ← companion bubble system
        │   ├── Companion.jsx         ← mounts Character + CharacterDebug
        │   ├── CompanionContext.jsx  ← distance gating for bubble triggers
        │   ├── bubbleLibrary.js      ← 76 PROTECTED bubbles (don't modify)
        │   ├── idlePool.js           ← idle quip pool
        │   └── useIdleDetection.js   ← idle timer logic
        └── sections/                 ← page sections (Home, Voice, Eye, Work, Process, People, Origin, HallOfFame)
            └── (one .jsx per section)
```

---

## 5. Character system architecture (the complex part)

The character is the brand's wow mechanic. It's autonomous, stateful, animated, and interactive. **Before changing anything in `04-build/src/character/`, read the relevant spec file from `00-brief/`.**

### 5.1 State machine

The character lives in one of **14 states** at any moment:

| State | Triggered when | Spec file |
|---|---|---|
| `inactive` | Page just loaded, character not yet placed | character-spec.md |
| `entering` | Initial walk-in from edge | character-spec.md |
| `greeting` | Brief wave on arrival | character-spec.md |
| `idling` | Default state at a perch | character-spec.md |
| `wandering` | Periodically picks new perch | character-spec.md |
| `curious` | Approaches cursor when cursor nears | character-spec.md |
| `chased` | Runs away from rapid cursor motion | character-spec.md |
| `hiding` | Tucks behind element after chase | character-spec.md |
| `summoning_reel` | Walks to reel-display position | character-spec.md |
| `watching_reel` | Sits while reel plays | character-spec.md |
| `taking_reel` | Walks reel off-screen | character-spec.md |
| `showcasing` | Hover-on-project flourish | character-spec-patch-showcase.md |
| `grabbed` | Visitor mouse-down + drag | character-spec-patch-grab-and-throw.md |
| `thrown` | Brief momentum after release | character-spec-patch-grab-and-throw.md |
| `running_away` | Runs to far perch after throw | character-spec-patch-grab-and-throw.md |

Inside `idling`, a sub-system picks **idle activities** every 8–15 seconds:
- `laptop_session` (weight 4) — most common
- `peek_reveal` (weight 2, conditional on occluded perch)
- `stretch` (weight 1)
- `contemplation` (weight 2)
- `beverage` (weight 1)

Activity selection has **no-repeat**, **sequencing bonuses** (e.g., laptop_session → stretch favored), and **section bias** (Work/Process favor laptop, People favors beverage). See `character-spec-patch-contextual-intelligence.md` for the multipliers.

### 5.2 Sprite mapping (posture-driven, not state-driven)

The state machine sets `ctx.posture` per frame; the renderer maps posture → sprite filename:

| Posture | Sprite | Used by |
|---|---|---|
| `standing` | `idle.png` | idling, wandering, curious approach base |
| `walking1` / `walking2` | `walk-a.png` / `walk-b.png` | entering, wandering, curious, chased, summoning_reel, taking_reel, running_away |
| `running` | walk-a/walk-b alternating fast | chased, running_away |
| `sitting` | `sit.png` | sitting baseline, watching_reel |
| `waving` | `wave.png` | greeting |
| `laptop_open` | `sit-laptop.png` | laptop_session activity |
| `peeking` | `peek.png` | peek_reveal activity, hiding state |
| `stretching` | `stretch.png` | stretch activity |
| `contemplating` | `sit.png` | contemplation activity (no dedicated sprite — uses sitting) |
| `holding_mug` | `idle.png` + mug overlay | beverage activity (mug rendered separately) |
| `showcasing` | `idle.png` + wrapper variants | showcase flourish (hop + scale + glow on wrapper) |

If a sprite file is missing, the system **gracefully falls back to `idle.png`**. The build does not break. See `CharacterSprite.jsx` `onError` handler.

### 5.3 Animation principles

- **Walk cycle**: HARD swap between walk-a/walk-b every 150-300ms (state-dependent cadence). NO cross-fade — pixel art looks static if cross-faded at the same cadence as the swap.
- **State transitions (idle → sit, sit → wave, etc.)**: 250ms cross-fade via `AnimatePresence`.
- **Vertical bob**: ±2px sin wave on idle states. Suppressed for sitting/laptop/contemplating/peeking.
- **Facing direction**: `transform: scaleX(-1)` mirrors the sprite. Same asset, flipped at render time.
- **Showcase flourish**: 8px hop + 1.04× scale + glow accent applied to wrapper, NOT sprite (so it composes with rotation).
- **Sway during grab**: position spring + rotation pendulum on the sprite wrapper. Sub-pixel positioning ALLOWED during grab/thrown (whole-pixel resumed after).
- **Pixel discipline**: `image-rendering: pixelated` with cross-browser fallback stack. Whole-pixel positioning via `Math.round` for all non-grab states.

### 5.4 Contextual reel triggers

Reels (short video moments) fire on **three contextual conditions**, never on pure idle timer:

1. **Bottom-of-page** — visitor scrolled within 200px of doc bottom AND session is 90+ seconds AND hasn't fired this session. Fires once per session.
2. **Section dwell** — visitor in same section for 40+ seconds without clicking. Fires once per section per session.
3. **Deep idle** — 60s no mousemove/scroll/keydown/touch/wheel/click. 3-min cooldown.

Reel content is selected from per-trigger pools (`completion`, `ambient`, `bySection[section]`) with session-level dedup. Currently pools are EMPTY and fall back to the existing `idlePool` reels. This is intentional — the architecture ships before content is authored.

### 5.5 Debug overlay

Open the site with `?debug=character` to see live state. Hotkeys:

| Key | Action |
|---|---|
| `D` | Toggle overlay |
| `G` | Force greeting state |
| `W` | Force wandering |
| `C` | Force curious |
| `H` | Force chased |
| `R` | Force summoning_reel |
| `I` | Force idling |
| `O` | Force showcasing (project hover) |
| `1` | Force laptop_session activity |
| `2` | Force peek_reveal activity |
| `3` | Force stretch activity |
| `4` | Force contemplation activity |
| `5` | Force beverage activity |
| `X` | Synthesize full grab → thrown → running_away sequence |
| `P` | Toggle 2× pixel inspection view |

---

## 6. PROTECTED — do not modify without explicit Kash override

These files/systems work and have been verified. Don't touch them as part of unrelated work:

- `04-build/src/companion/bubbleLibrary.js` — **76 carefully written bubble strings**. Don't add, remove, or modify entries.
- `04-build/src/companion/CompanionContext.jsx` — distance gating logic for bubbles.
- `04-build/src/companion/useIdleDetection.js` — idle timer hook.
- `04-build/public/character/*.png` — sprite assets. If a sprite needs changing, regenerate in Gemini (see `gemini-character-prompt.md`).
- `04-build/src/App.jsx` — provider order is correct (CharacterProvider wraps CompanionProvider). Don't reorder.
- `04-build/src/sections/*` — section components. Most character interactions use document-level event delegation, NOT per-section listeners.
- The visitor cursor system inside `Companion.jsx` — separate from the character. Don't conflate.
- `OnboardingModal.jsx` (if present) — visitor name + color picker. Don't refactor.

---

## 7. Anti-patterns — things to NOT do

Each of these has been considered and rejected. Don't propose them again unless you have new information.

### 7.1 Aesthetic anti-patterns

- ❌ Don't make the character a silhouette. (v1 mistake, character was too small to see, corrected to v2 pixel-art.)
- ❌ Don't pivot character to GIF or video. The sprite-swap architecture is correct.
- ❌ Don't add cross-fade to walking sprites — kills the alternation.
- ❌ Don't make the character bigger than 96px desktop. It starts looking cartoonish.
- ❌ Don't make the character smaller than 72px mobile. It becomes invisible.
- ❌ Don't add neon, bright cartoon, or kawaii pastel colors anywhere. The 2am studio palette is warm darks + amber/cream highlights.
- ❌ Don't add bouncy/Clippy-eager personality to the companion bubbles. The voice is warm-reflective, observational, quiet.
- ❌ Don't write sweet "thanks for stopping by" copy. Wrong register.
- ❌ Don't soften the "ambitious but executioneery" tagline. The misshape is the signal.

### 7.2 Architectural anti-patterns

- ❌ Don't modify the state machine in `states.js` without a patch spec authorizing it. Use a new patch file.
- ❌ Don't restore the pure-timer reel fallback. Reels fire on contextual triggers only.
- ❌ Don't modify the 11 base states. New states can be ADDED; existing ones aren't to be rewritten.
- ❌ Don't refactor `useIdleDetection.js`. New triggers (like `useReelTriggers.js`) own their own activity listeners.
- ❌ Don't put physics calculations inside React state. Use refs in the rAF loop; mirror to React state only for rendering.
- ❌ Don't put rotation transforms on the outer Character wrapper. Rotation lives on the sprite wrapper inside `CharacterSprite.jsx` so it composes with showcase variants.
- ❌ Don't add per-section event listeners for character behaviors. Use document-level delegation (e.g., showcase hover uses `mouseover` on `a.card-lift[href^="/work/"]`).

### 7.3 Workflow anti-patterns

- ❌ Don't use `git push --force` for routine pushes. Force-push is for rare cases.
- ❌ Don't propose using Higgsfield for character sprites. Higgsfield does cinematic video, not pixel art. Save it for idle reel video content later.
- ❌ Don't propose using Claude (me) to generate character images. I (Claude) can't generate images. Gemini is the image-gen tool.
- ❌ Don't generate all sprites in one Gemini call. Character drifts. Generate one, approve, then iterate using the approved sprite as a reference for the next.
- ❌ Don't optimize physics constants before testing in browser. Tune AFTER seeing the actual feel.

---

## 8. Current state — what's shipped, what's pending

### 8.1 Shipped (as of last commit `e7c85fa`)

- ✅ All 8 sprites generated via Gemini and dropped in `/04-build/public/character/`
- ✅ Character v2 pixel-art system (sprite-swap, posture-driven, image-rendering pixelated, cross-fade for state changes)
- ✅ 11 base behavioral states + showcasing + grab-and-throw (3 new states)
- ✅ 5 idle activities with no-repeat + sequencing bonuses + section bias
- ✅ Contextual reel triggers (3 detectors: bottom-of-page, section dwell, deep idle)
- ✅ Companion bubble alignment with pixel-art tail
- ✅ Grab-and-throw interaction with spring + pendulum physics, momentum release, run-away to far perch
- ✅ Debug overlay with all hotkeys (D/G/W/C/H/R/I/O/X/P/1-5)
- ✅ Cross-browser image-rendering stack
- ✅ Mobile suppression rules
- ✅ Reduced-motion fallbacks

### 8.2 Pending (in priority order)

1. **Tune the sway physics** after Kash records the grab interaction in browser. Constants in `states.js` (SPRING_STRENGTH, ROT_FACTOR, etc.) are starting points only.
2. **Regenerate `stretch.png`** to add headphones (the one inconsistency in the sprite set). Low priority since it's the rarest activity. Use the prompt in `gemini-character-prompt.md` with strong headphones reinforcement.
3. **Author reel content** for the three trigger pools (`completion`, `ambient`, `bySection`). Currently falls back to existing idlePool reels — architecture works, content is thin.
4. **Resolve the 41 open questions** in `01-brand-book/README.md` (LinkedIn post text, people consent for credits, Sazzad's bio details, Spendy/Seido URLs, design opinions list, etc.).
5. **Cowork content regeneration** to inherit voice patch v1.1 (`01-voice.md` was punched up; `02-content-well.md` and `04-companion-spec.md` need to be regenerated to match).
6. **Section content authoring** — Voice section (opinions), Work case studies, Process diagrams, People credits, Origin narrative, Hall of Fame submissions.
7. **Visitor pixel-card moment** (deferred earlier) — when visitor enters name/color, generate a small pixel-art card of them. Phase-2 enhancement.
8. **Higgsfield prompt for idle reel video content** — when reel content phase begins, Higgsfield is the right tool for cinematic 2am-studio video clips.
9. **Mobile experience polish** — currently most character behaviors suppressed on mobile. Greeting + reel + exit moments still fire. Consider what *should* happen on mobile if anything more.

### 8.3 Known issues (non-blocking)

- The `diagnose-*.png` files and `diagnose.mjs` committed to the repo are Cursor diagnostic outputs. Should be `.gitignore`'d but currently aren't critical to remove.
- `npm run lint` fails with a pre-existing ESLint v9 config error (`eslint.config.js` missing). Unrelated to feature work. Fix is to add a flat config file when convenient.
- Vite HMR sometimes warns `Could not Fast Refresh ('getSpriteForPosture' export is incompatible)`. Resolves on hard refresh. No production impact.

---

## 9. Development workflow

### 9.1 Local development

```bash
cd 04-build
npm install                  # first time only
npm run dev                  # starts Vite dev server at http://localhost:5173
```

To see character debug info:
```
http://localhost:5173?debug=character
```

### 9.2 Building for production

```bash
cd 04-build
npm run build                # outputs to 04-build/dist/
```

### 9.3 Git workflow

From the repo root (`portfolio-2026/`), not from inside `04-build/`:

```bash
git add .
git commit -m "feat: descriptive message"
git push origin main
```

Use conventional commit prefixes: `feat:`, `fix:`, `style:`, `refactor:`, `docs:`, `chore:`.

Don't use `--force` unless you specifically need to overwrite history.

The remote is `https://github.com/KashfiRashid/New_Portfolio.git`.

### 9.4 Working with specs and patches

The pattern that's been used successfully for character system changes:

1. **Write a spec/patch file** in `00-brief/` (e.g., `character-spec-patch-XYZ.md`). Use the existing patches as templates — they have Definition of Done sections that drive verification.
2. **Hand the patch file to Cursor or Antigravity** with a clear prompt referencing the file paths and KEEP UNCHANGED constraints.
3. **Cursor runs Plan mode first** — Kash reviews the plan before execution.
4. **Execute and verify** against the patch's Definition of Done.
5. **Commit** with a conventional message.

Never have Cursor execute without a patch file in `00-brief/` if the work is substantial. The patch acts as both spec and audit trail.

### 9.5 Sprite regeneration

If a sprite needs to be regenerated (e.g., wrong pose, missing headphones):

1. Open Gemini
2. Attach the existing `idle.png` (and ideally one other sprite with the feature you're preserving — e.g., `sit.png` for headphones reference)
3. Copy the relevant prompt from `00-brief/gemini-character-prompt.md`
4. Generate, iterate until quality is right
5. Save with the correct filename in `04-build/public/character/`
6. Refresh browser — system loads it automatically (no rebuild needed since it's a public asset)

---

## 10. External tools used in this project

| Tool | Used for | Notes |
|---|---|---|
| **Claude** (claude.ai / claude desktop) | Strategy, spec writing, voice calibration, code review | The conversational thinking partner |
| **Cursor** (cursor.com) | Primary coding agent for the 04-build folder | Uses Plan mode → review → Build |
| **Antigravity** | Alternative coding agent (used early in build) | Equivalent to Cursor for build tasks |
| **Gemini** (gemini.google.com) | Pixel-art sprite generation | One sprite at a time, base sprite as reference |
| **Photopea** (photopea.com) | Free browser-based image editor | Used for sprite cropping/canvas standardization |
| **Cowork** (Anthropic product) | Brand book and wireframe doc generation | Outputs in `01-brand-book/` and `02-wireframes/` |
| **Higgsfield** (higgsfield.ai) | PARKED — for future idle reel video content | Cinematic video gen, not suited for pixel sprites |

---

## 11. Voice and tone quick reference

For any copy you generate (bubble strings, section text, UI labels), match this register. Pulled from `01-voice.md` v1.1.

**The voice is**: warm, reflective, declarative. Set up → hit → land. One hedge per piece max. Tazwar-Tarik-adjacent but more direct.

**Signatures locked** (use these when natural; never force):
- "ambitious but executioneery"
- "made impossible to I'm-possible"
- "library of people" (75% chance I know them)
- "sound person son"
- "quieter than the rest"
- "built between Dhaka and Delta"

**Avoid**:
- Sweet/saccharine ("thanks so much for stopping by!")
- Hedging stack ("I think maybe perhaps...")
- Designer jargon ("user-centric experiential ideation")
- Empty enthusiasm ("super excited to share!")
- Self-deprecation that erases ("just a little side project lol")

**For bubble strings specifically**: see `bubbleLibrary.js`. Match the existing 76. They're observational, quiet, never sycophantic. Examples of the right register:
- *"yeah this section's been rewritten three times"*
- *"that project nearly broke me. worth it."*
- *"don't mind me, just watching you read"*

---

## 12. Key conversations and decision history

For traceability, here's how major decisions were arrived at. Each decision was deliberated, not arbitrary.

- **Why pixel-art chibi character (not silhouette)**: v1 shipped a 36px silhouette that was too small to see. Kash flagged it, multiple references provided (Pokemon Gen 1-3, Stardew Valley, Gamakuchi puppy card). Pivoted to v2 pixel-art per `character-spec-v2-pixel.md`.
- **Why headphones on the character**: Gemini added them as an unscripted detail on the base sprite generation. Kash accepted them — they reinforce the sound-engineer-son / 2am-studio identity. Now part of the locked character.
- **Why no GIFs for animation**: Discussed and rejected. GIFs are heavy, lose responsiveness (character can't react to state changes mid-loop), break visual consistency with sprite-swap architecture. Sprite-swap with state machine is the correct pattern.
- **Why no Higgsfield for character sprites**: Higgsfield generates cinematic video, not pixel-art sprites. Reserved for future idle reel content.
- **Why "ambitious but executioneery" stays misspelled**: It's a Kash-ism. The misshape IS the brand signal. Don't fix it.
- **Why activity selection is weighted-random with no-repeat**: Pure random felt arbitrary. Section bias + sequencing bonuses + no-repeat make it feel intentional without becoming deterministic.
- **Why grab uses spring physics, not direct cursor follow**: Direct follow looks robotic. Spring physics with pendulum sway makes the character feel like a small physical object being held.
- **Why posture-driven sprite mapping (not state-driven)**: states.js already alternates walking1/walking2 at state-appropriate cadences (150ms chased, 250ms normal, 300ms curious). Mapping posture → sprite preserves state-specific timing richness.

---

## 13. If you're a new AI agent reading this for the first time

Quick start checklist:

1. ✅ Read this entire README
2. ✅ Skim `00-brief/character-spec.md` for the behavioral architecture
3. ✅ Skim `00-brief/character-spec-v2-pixel.md` for the visual implementation
4. ✅ Skim `00-brief/01-voice.md` for tone
5. ✅ Read the three patch files (`character-spec-patch-showcase.md`, `-contextual-intelligence.md`, `-grab-and-throw.md`) for state additions
6. ✅ Look at the running site at `localhost:5173?debug=character` to see it in motion
7. ✅ Check the latest commit on `main` to see what just shipped
8. ✅ Read Kash's most recent message in your conversation thread to understand current intent
9. ✅ Apply the protocol from Section 1: clarify first, deliver, then simple list

**If Kash asks you to add a substantial new behavior to the character system**: write a new patch file in `00-brief/character-spec-patch-XYZ.md` first. Use the existing patches as templates. Then hand the patch to a coding agent.

**If Kash asks you to add small content** (new bubble, fix typo, etc.): make the change directly with a brief explanation. Don't over-patch trivial things.

**If you're not sure**: ask one high-leverage clarifying question. Then deliver.

---

## 14. Contact and ownership

- **Owner**: Kashfi Rashid
- **GitHub**: github.com/KashfiRashid
- **Old portfolio**: kashfirashid.com (being replaced by this build)

---

*This README was generated by Claude across multiple conversations. If you find it incomplete or outdated, add to it — don't replace it. Future AI agents will thank you.*

*Last updated: alongside commit `e7c85fa` (grab-and-throw + contextual intelligence patches).*
