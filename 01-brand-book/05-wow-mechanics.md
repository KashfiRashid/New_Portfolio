# 05 — Wow Mechanics

> The three interactive layers, integrated end-to-end. Visitor identity, companion, idle layer. Plus the return-visit reward layer. This file is the connective tissue between `04-companion-spec.md` and `06-visual-direction.md`.

---

## Why three layers, not one big trick

Each layer does one specific job. None dominates. The wow is the composition.

| Layer | Reference | The job it does | Where it shows up |
|-------|-----------|------------------|--------------------|
| 1. Visitor identity | Harjot Singh | The visitor *becomes* (named, colored, character) | Onboarding modal · cursor color across whole site · companion uses name and color |
| 2. Companion | Abdul Hamoui (evolved) | The site *speaks* (cursor-attached, contextual) | Across all sections · `04-companion-spec.md` is the full library |
| 3. Personal world | Keyaan Vegdani | The site *exists somewhere* (a setting, not a page) | Whole site visual baseline (2am studio — `06-visual-direction.md`) |
| 4. Return reward | Caleb Wu | The site *remembers* (different on second visit) | Companion recognition · idle reels rotate · changelog visible |

The composition is what differentiates. Single-trick portfolios live or die on the trick. Multi-layered ones reward attention.

---

## Layer 1 — Visitor identity flow

### The mechanic
Visitor enters the site. On first visit, they're prompted to enter a name. They get assigned a color. Their cursor becomes that color. They become a named character inside the site for the rest of the session — and (per persistence decision) potentially for future visits too.

### The flow

```
1. Visitor lands on Home
2. Site renders briefly with default cursor (white or off-white)
3. After ~1s, an inline prompt or soft modal appears:
   "what should I call you while you're here?"
   [name input]
4. Visitor enters name (or skips with "stranger")
5. Color assigned (deterministic from name hash, or random from palette)
6. Cursor color transitions (~400ms) to assigned color
7. Companion fires its first bubble: "hey [name]. you're red. sit anywhere."
8. Onboarding complete. Visitor is now a named character.
```

### Color assignment

Use a small curated palette (8–10 colors) that work against the 2am studio dark surfaces. Assignment is deterministic from name hash — same name produces same color across sessions. **Why deterministic:** a returning visitor whose persistent identity isn't stored (or who clears localStorage) still gets the same color back if they re-enter the same name.

> `[NEEDS KASH INPUT: which palette? See 06-visual-direction.md for the working palette. If Kash hasn't picked, start with the 8-color set proposed there.]`

### Edge cases

- **Visitor skips name entry.** Default name: *"stranger."* Default color: a neutral one from the palette. Companion bubbles still work; just lose the name personalization.
- **Visitor enters something offensive or trolling.** No moderation in v1 — the name is local-only and never published. (Hall of Fame submissions get separate moderation; see `07-hall-of-fame-spec.md`.)
- **Visitor enters a very long name.** Truncate to 20 chars, never break the bubble layout.
- **Visitor changes their name mid-session.** Affordance to change in footer or settings panel. Color updates on change.

### Persistence

Per Q B3 — `[NEEDS KASH INPUT: Q B3 not yet answered. Recommend "Persists with reset option" — localStorage stores name + color, but a small "reset" link in the footer lets visitors start fresh. Returning visitors get recognized by default; opt-out is a click away. This is the most flexible default.]`

If persistence is on: localStorage stores `{name, color, firstVisitDate, visitCount, lastBubbleSession}`. Companion uses these for the returning-visitor triggers.

If persistence is off: each visit is a fresh start. Companion never recognizes returning visitors.

---

## Layer 2 — Companion (cross-reference)

Full spec lives in `04-companion-spec.md`. The integration points with the other layers:

- **Companion uses visitor name.** Bubbles like *"hey [name]. you're red."* require the identity flow to have completed.
- **Companion uses visitor color.** *"hey [name]. your color's still red."* — only fires if persistence is on AND visitor is on a returning visit.
- **Companion drives the idle layer.** The idle reel surfaces when the companion fires an idle-trigger bubble (bubbles 41–48 in `04-companion-spec.md`). The bubble announces the reel — *"want to see what i was working on at 2am last Tuesday?"* — then the reel reveals.
- **Companion respects the visitor's color in its bubble styling.** Subtle 1px left border or accent dot in the visitor's color.

---

## Layer 3 — Personal world (cross-reference)

Full visual rendering lives in `06-visual-direction.md`. The integration points:

- **The 2am studio world is the visual baseline.** Dark surfaces, monitor-glow accent lights, cursor traces, ambient motion. The companion sits inside this baseline as a soft light spill.
- **The idle layer is the most "world-revealing" mechanic.** When the visitor goes idle, what surfaces is *Kash's actual desk content* — screen recordings of late-night sessions, photos of the workspace, voice notes maybe, clip from BLU at 0:42. The world isn't decorative — it's the source of the idle layer's content.
- **Cursor color (Layer 1) sits on top of the dark world surface** — the visitor's color is more visible against the dark base than it would be against a light one. The 2am world supports the identity layer.

---

## Layer 4 — Return-visit reward (Caleb Wu)

### The mechanic
Visitors who come back get *something*. Not stickers (Caleb's pattern feels too sweet for Kash's voice). The Kash version:

1. **Companion remembers them by name and color.**
   First-visit bubble: *"hey [name]. you're red. sit anywhere."*
   Second-visit bubble: *"you're back. the site's a little different than last time."*
   Third-visit bubble: *"third visit. i remember you. that's all i've got, but it counts."*

2. **Different idle reel each visit.**
   The idle layer maintains a small playlist of clips (BLU 0:42, desk shot, sketch scan, planning doc shot, etc.). On return visits, the companion surfaces a clip the visitor hasn't seen yet (or shuffles when the playlist exhausts).

3. **Hall of Fame deltas.**
   If new entries have landed in the Hall of Fame since the visitor's last visit, the companion can mention it (*"hey. someone else left a suggestion since you were here. worth a look."*).

4. **Visible changelog.**
   Footer shows the last-updated date. Not gamified, not a "level up" — just a quiet acknowledgment that the site evolves.

### What we're NOT doing

- No sticker collection (too sweet).
- No leveling-up UI (too gamified).
- No "you've earned a special section" lockboxes (too cute).
- No "your visit count is..." (creepy).

The reward is **recognition**, not gamification.

---

## The idle layer

### Trigger
Visitor stops moving (no cursor movement, no scroll, no input) for **12 seconds.** (Brief mentioned 10–15s; 12 is the v1 default.) This number is tunable.

### Behavior
1. Companion fires an idle-trigger bubble (one of 41–48 in `04-companion-spec.md`).
2. ~1s after the bubble, the idle reel surfaces. Position: lower-right or center, depending on what the bubble suggested. Appearance: soft fade-in, slight upward translate.
3. Reel auto-plays at low volume (or muted with caption). Loops once. Then fades out.
4. Companion does not fire another bubble after the reel ends. Quiet returns.
5. If the visitor moves the cursor during the reel, the reel pauses and dismisses gracefully.

### What goes in the reel

The reel pulls from a curated playlist of short clips (8–15s each):

- **BLU sound 0:42 clip** — actually plays the sound Kash is proudest of
- **Desk / studio recording** — silent, ambient, just the workspace at night
- **Antigravity build session screen recording** — cursor moving through code
- **Sketch / planning doc scroll** — handheld scan, slow pan
- **Spectral Bloom audio-reactive demo** — short loop of the visuals reacting to audio
- **Football clip** — from training, a match, or a diaspora-player highlight (per obsessions)
- **Convocation moment** when it lands (June 10, 2026 — adds to playlist after that date)
- **Voice note** — maybe a 10-second Kash audio note about something specific

> `[NEEDS KASH INPUT: which clips exist already, which need to be made — Q F territory. The playlist is empty until raw material lands.]`

### Curation rules

- **Each clip is short.** 8–15s. Anything longer is a project, not an idle reel.
- **Each clip is specific.** Generic stock clips don't go here. Only Kash's actual material.
- **Each clip can stand alone.** A visitor seeing only one of them should still get something specific about Kash from it.
- **Captions where relevant.** A small one-liner in Kash's voice — *"this is BLU at 0:42. i'm not gonna explain it, just listen."*

### Frequency

Idle reel fires at most **once per session.** If the visitor goes idle a second time, the companion can fire another idle-trigger bubble (text only) but no new reel. (Reel's a finite resource per session — it loses impact if it fires every two minutes.)

---

## How the four layers compose on a typical first visit

```
T=0     Visitor lands. Site renders with default cursor.
T=1.2s  Onboarding prompt appears: "what should I call you?"
T=8s    Visitor enters name. Color assigned. Cursor changes.
T=8.3s  Companion: "hey [name]. you're red. sit anywhere."
T=15s   Visitor scrolls to Voice. Hovers an opinion. Companion: "this is one i'd actually defend."
T=45s   Visitor reaches Work. Hovers BLU image. Companion: "BLU. proudest of the sound. listen at 0:42."
T=1m20s Visitor clicks BLU. Companion: "this one's longer. take your time."
T=2m    Visitor stops moving on the BLU page. Idle 12s.
T=2m12s Companion: "hold on. let me play you something from BLU." → idle reel surfaces with the 0:42 clip.
T=2m25s Reel ends. Companion is quiet.
T=3m    Visitor reaches Hall of Fame. Reads entries. Submits a suggestion or doesn't.
T=4m    Visitor moves cursor toward the close X. Companion (exit-intent): "leaving? cool. tell a friend, or don't."
T=4m05s Visitor closes tab. localStorage retains name + color.

Bubbles fired: 5–6. Idle reel: 1. Companion stayed quiet ~85% of the time.
```

That visit is the brand working as designed. Restraint plus moments of recognition.

---

## How a returning visit feels different

```
T=0     Visitor lands. Persistence kicks in. Cursor is already red. No onboarding.
T=1.5s  Companion: "you're back. the site's a little different than last time."
T=10s   Visitor heads to Hall of Fame. Companion: "someone else left a suggestion since you were here. worth a look."
T=2m    Visitor goes idle. Companion: "new clip in the idle layer. if you stop moving, i'll play it." → different reel than first visit.
```

The site has become a small relationship.

---

## What this all rests on

For any of this to work:

- **The voice has to land.** If `01-voice.md` is wrong, none of these mechanics save it.
- **The visual world has to support it.** The companion bubbles need a dark, restrained surface to sit on (`06-visual-direction.md`). On a generic light theme they'd feel like tooltips.
- **The frequency rules have to be respected.** Rare is rare. If the companion fires too often, the magic erodes within 30 seconds.
- **The technical implementation has to be careful.** Companion bubble timing, fade animations, idle detection, persistence handling — these are small but each one being slightly off compounds. (`08-tool-delegation.md` and `09-execution-roadmap.md` handle the build.)

---

## Mobile considerations

Mobile has no cursor and no hover. The wow stack adapts:

- **Visitor identity** — same flow, name + color still work, color shows up as accent on selected elements (no cursor).
- **Companion** — surfaces as a small toast at the bottom of the screen on equivalent triggers (tap-to-reveal, idle, returning). Dismissible by tap.
- **Idle reel** — same trigger (12s), surfaces in a non-blocking position (lower portion of screen).
- **Personal world** — adapted layout but same visual register (2am world).
- **Return reward** — same logic.

> `[NEEDS KASH INPUT: confirm mobile companion toast pattern. Or specify a different mobile UX for the companion.]`

---

## What can go wrong (and how to push back)

| Failure mode | What it looks like | The fix |
|--------------|--------------------|---------|
| Companion feels chatty | More than 3 bubbles in 30s, or visitor reports feeling interrupted | Tune cooldown, lower per-session cap |
| Identity flow blocks first impression | Visitor closes tab during onboarding | Make the prompt softer, allow skip with default name |
| Idle reel plays sound the visitor didn't expect | Visitor reflexively closes tab | Default to muted with caption; sound opt-in |
| Returning visitor feels surveilled | Visitor expresses creepy-vibes about being remembered | Make the recognition lighter, single-line, never reference visit count beyond "third visit" |
| The whole stack reads as gimmicky | Visitors describe it as "cute tech demo" | Re-check voice. The mechanics are fine; the voice is what makes them feel like Kash and not like a tech showcase |

---

*End of wow mechanics. Continue with `06-visual-direction.md` for the 2am studio world rendered out.*
