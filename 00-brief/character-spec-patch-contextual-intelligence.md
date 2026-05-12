# character-spec — patch v1.3 (contextual intelligence + alignment)

> **Drop in `/00-brief/` alongside the existing specs and patches.**
> This is the "feel intentional, not random" patch. It graduates the character's behavior from time-driven to context-driven.
>
> **What this changes**: trigger logic for reels, activities, and bubbles. Adds viewport/section awareness. Fixes bubble positioning relative to character.
>
> **What stays the same**: state machine architecture, sprite system, all existing states. This patch only changes WHEN and WHERE things fire, not WHAT fires.

---

## What this addresses

After the v2 pixel character shipped, the system mechanically works — character is visible, sprites animate, activities trigger, bubbles fire. But the behavior feels random. Reels appear on timers regardless of what the visitor is doing. Activities pick from a flat weighted list with no awareness of context. Bubbles appear without strong spatial relationship to the character.

This patch makes the character feel like it's *paying attention* to the visitor — not just running its own internal clock.

---

## Section A — Reel trigger intelligence

The reel custody moment is the wow mechanic. Right now it likely fires off the idle detection timer alone. That makes it feel arbitrary. Move it to context-aware triggers.

### A1. Replace pure-idle trigger with three contextual triggers

Currently: idle for X seconds → fire reel. Replace with:

**Trigger 1 — "you read the whole thing"** (bottom-of-page completion)
- Visitor scrolled to within 200px of the document bottom
- Has been on the site for at least 90 seconds (so it's not someone who instant-scrolled)
- This trigger fires AT MOST ONCE PER SESSION — not on every bottom-scroll
- Reel content for this trigger: should feel reflective, slightly grateful — "you read the whole thing" energy

**Trigger 2 — "you're stuck on something"** (long section dwell)
- Visitor has been in the same section for 40+ seconds without clicking anything
- The character notices something stuck them
- Reel content for this trigger: should be relevant to the current section — e.g., dwelling on Work → reel about a Work project; dwelling on People → reel about gratitude/credits
- Fires AT MOST ONCE PER SECTION per session

**Trigger 3 — "you've been here a while"** (deep idle)
- No scroll, no cursor movement, no interaction for 60+ seconds
- Character has been idling visibly in a perch
- Reel content for this trigger: low-stakes ambient — a process clip, a quiet moment, a desk shot
- Cooldown of 3 minutes after each fire to avoid repeated nags

### A2. Remove pure-timer fallback

Don't fire reels purely on elapsed time. If none of the three triggers fire, no reel fires. Trust that visitors who don't trigger any condition aren't ready for a reel anyway.

### A3. Reel queue + selection

Maintain a session-level reel queue per trigger type. When a trigger fires:
- Bottom-of-page trigger → pull from "completion" reel pool
- Section dwell trigger → pull from section-specific reel pool (uses current section name)
- Deep idle trigger → pull from "ambient" reel pool

Track which reels have been shown this session. Never repeat. If the pool is exhausted, that trigger goes silent for the rest of the session.

### A4. Implementation hints

```js
// In CharacterContext.jsx or a new useReelTriggers.js hook

const SESSION_FLAGS = {
  bottomReelFired: false,
  sectionDwellFired: {},  // { 'work': true, 'people': false, ... }
  deepIdleLastFired: 0,
  seenReels: new Set(),
};

// Bottom-of-page detector
useEffect(() => {
  const onScroll = () => {
    if (SESSION_FLAGS.bottomReelFired) return;
    if (Date.now() - sessionStartTime < 90000) return;

    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const distanceFromBottom = docHeight - (scrollY + winHeight);

    if (distanceFromBottom < 200) {
      SESSION_FLAGS.bottomReelFired = true;
      fireReel({ trigger: 'bottom', pool: 'completion' });
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);

// Section dwell detector
useEffect(() => {
  const currentSection = getCurrentSection();  // already tracked elsewhere
  if (!currentSection) return;
  if (SESSION_FLAGS.sectionDwellFired[currentSection]) return;

  const dwellStartTime = Date.now();
  let interacted = false;

  const onInteract = () => { interacted = true; };
  document.addEventListener('click', onInteract);

  const timer = setTimeout(() => {
    if (!interacted && currentSection === getCurrentSection()) {
      SESSION_FLAGS.sectionDwellFired[currentSection] = true;
      fireReel({ trigger: 'dwell', section: currentSection });
    }
  }, 40000);

  return () => {
    clearTimeout(timer);
    document.removeEventListener('click', onInteract);
  };
}, [currentSection]);
```

---

## Section B — Activity intelligence

The 5 idle activities (laptop_session, peek_reveal, stretch, contemplation, beverage) currently use weighted random selection. Add three layers of awareness:

### B1. No-repeat rule

Don't fire the same activity twice in a row. Track the last activity in `ctx.lastActivity`. Exclude it from the weighted selection on the next pick.

### B2. Sequencing rules (post-activity weights)

After certain activities, bias the next selection:
- **After `laptop_session`** (10-15s focus session): 3× weight bonus to `stretch` (natural post-focus stretch), 2× bonus to `beverage` (coffee break)
- **After `stretch`**: 2× weight bonus to `laptop_session` (back to work) or `contemplation` (settle into thinking)
- **After `contemplation`**: 2× bonus to `laptop_session` (acted on the thought)

Apply these bonuses for ONE next selection only, then return to baseline weights.

### B3. Section-aware activity bias

The character's current perch section influences activity probability:

| Current section | Activity weight bias |
|---|---|
| Home, Voice | Slight bias toward `contemplation` (introspective sections) |
| Work, Process | Strong bias toward `laptop_session` (active work sections) |
| People, Hall of Fame | Slight bias toward `beverage` (relational, warm) |
| Origin | Slight bias toward `contemplation` |
| Eye | Balanced (no bias) |

Implement as a multiplier table applied on top of the base weights.

### B4. Implementation hints

```js
// In states.js idling activity selector

function pickActivity(ctx, baseActivities) {
  const valid = baseActivities.filter(a => !a.condition || ctx[a.condition]);

  // 1. No-repeat: filter out last activity
  const candidates = valid.filter(a => a.name !== ctx.lastActivity);

  // 2. Sequencing bonus
  const bonuses = SEQUENCE_BONUSES[ctx.lastActivity] || {};

  // 3. Section bias
  const sectionBias = SECTION_BIAS[ctx.currentSection] || {};

  // Compute effective weights
  const weighted = candidates.map(a => ({
    ...a,
    weight: a.weight * (bonuses[a.name] || 1) * (sectionBias[a.name] || 1)
  }));

  // Pick weighted random as before
  const total = weighted.reduce((s, a) => s + a.weight, 0);
  let r = Math.random() * total;
  for (const a of weighted) {
    if (r < a.weight) {
      ctx.lastActivity = a.name;
      return { ...a, duration: randInt(a.duration.min, a.duration.max) };
    }
    r -= a.weight;
  }
}
```

---

## Section C — Companion bubble alignment

Right now bubbles fire but their position relative to the character may not feel intentional. Three rules to fix:

### C1. Anchor to character, not cursor

Bubbles should appear in a fixed position RELATIVE TO THE CHARACTER's current perch, not relative to the cursor. The visitor's eye should travel: read content → notice character → notice bubble next to character.

Position the bubble:
- **Above the character's head** by default (8–12px gap above the sprite top)
- **Horizontally centered** on the character

### C2. Respect viewport boundaries

If the default "above the head" position would clip off-screen (e.g., character is in top-left corner), flip the bubble below the character instead. Same logic for horizontal — if the bubble would clip the right edge, anchor it to align right with the character. If left edge, align left.

```js
// Pseudocode
function computeBubblePosition(charX, charY, charSize, bubbleSize, viewport) {
  // Default: above, centered
  let bubbleX = charX - bubbleSize.w / 2;
  let bubbleY = charY - charSize - bubbleSize.h - 8;

  // Flip vertically if clipping top
  if (bubbleY < 16) {
    bubbleY = charY + 8;  // below character instead
  }

  // Constrain horizontally
  if (bubbleX < 16) bubbleX = 16;
  if (bubbleX + bubbleSize.w > viewport.width - 16) {
    bubbleX = viewport.width - bubbleSize.w - 16;
  }

  return { x: bubbleX, y: bubbleY };
}
```

### C3. Tail/pointer direction

Add a small triangular tail/pointer on the bubble that points TOWARD the character. The tail's position adjusts based on whether the bubble is above, below, left, or right of the character.

For pixel-art consistency, the tail should be 6-8px, hard edges, same fill color as the bubble background, no anti-aliasing.

### C4. One-bubble-at-a-time rule

Never fire a new bubble while another is still visible. If a new trigger fires during an active bubble, either:
- (Option A) Queue the new bubble to appear after the current one finishes
- (Option B) Drop the new bubble entirely if the trigger isn't time-critical

Recommend Option B — bubbles are ambient, not critical. Dropping is fine.

---

## Section D — Wandering intelligence (lower priority)

Currently the character wanders to random perches. Add subtle intentionality:

### D1. Section-aware wandering

When the visitor scrolls into a new section, the character is more likely to wander to a perch in that section (rather than wandering elsewhere). Probability bias: 60% of wander destinations should be perches in the visitor's current section.

### D2. Cursor-zone avoidance

When picking a new perch, avoid perches within 200px of the cursor position. The character shouldn't wander into the visitor's reading zone uninvited.

### D3. Implementation note

Both D1 and D2 are filters applied to the perch list before random selection. Filter first, then pick weighted random from the remaining set.

---

## Cross-system coordination

### Mutual exclusivity rules

- While `taking_reel`, `watching_reel`, or `summoning_reel` is active → suppress all activity triggers and bubble triggers
- While a bubble is active → suppress state transitions to `chased` or `wandering` (let the visitor read first)
- While `showcasing` is active → suppress all other triggers for the duration

### Priority hierarchy (when multiple triggers fire simultaneously)

1. Showcase trigger (visitor explicitly hovering a project)
2. Bottom-of-page reel trigger
3. Section dwell reel trigger
4. Companion bubble trigger
5. Deep idle reel trigger
6. Random activity selection

Higher-priority triggers cancel lower-priority ones in flight.

---

## Definition of done

- [ ] Bottom-of-page detector fires reel ONCE per session, after 90s minimum, within 200px of doc bottom
- [ ] Section dwell detector fires reel after 40s no-click in same section, once per section per session
- [ ] Deep idle detector fires reel after 60s total inactivity, 3-minute cooldown
- [ ] Pure-timer reel fallback removed — reels only fire on contextual triggers
- [ ] Activity no-repeat enforced (lastActivity excluded from next pick)
- [ ] Activity sequencing bonuses applied (post-laptop → stretch/beverage favored)
- [ ] Section bias applied to activity weights
- [ ] Bubbles anchor to character position, default above head, 8-12px gap
- [ ] Bubbles flip below or shift horizontally to stay in viewport
- [ ] Bubble tail/pointer points to character, pixel-styled
- [ ] One bubble at a time — new triggers dropped during active bubble
- [ ] Wandering biases toward visitor's current section (60% probability)
- [ ] Wandering avoids perches within 200px of cursor
- [ ] Cross-system mutual exclusivity enforced per priority hierarchy

---

## What this doesn't change

- The 11 behavioral states + showcasing — all kept
- The 5 activities (laptop_session, peek_reveal, stretch, contemplation, beverage) — kept
- The 76 companion bubbles in bubbleLibrary.js — kept
- The sprite system — kept
- The state machine architecture — kept

This patch is purely about INTELLIGENCE LAYERED ON TOP of the existing system.

---

## What changes downstream

- May need to add session-specific reel pools (`completion`, `ambient`, plus per-section pools). If reels haven't been defined as content yet, this patch waits on that content work — but the trigger architecture can ship first.
- Bubble UI component needs the tail/pointer addition (small visual change).
- `useIdleDetection.js` may need refactoring to expose scroll/cursor/click activity separately rather than just a single idle flag.

---

*End of patch. Drop in `/00-brief/`.*
