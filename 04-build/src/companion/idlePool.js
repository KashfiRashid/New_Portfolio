// Idle Content Pool
// Source of truth: /01-brand-book/05-wow-mechanics.md + /04-companion-spec.md
//
// Three types of idle content:
//   'quip'  - short companion bubble (funny, observational, or factual)
//   'fact'  - random fact about Kash
//   'reel'  - surfaces a reel clip in the lower-right corner
//
// The idle cycle shuffles through these every ~8s while the visitor
// isn't moving. Movement at any point stops the cycle and dismisses everything.
//
// These are separate from the main bubbleLibrary - the idle pool is specifically
// for the "the visitor went AFK" scenario. Voice is still Kash's, lowercase casual.

const idlePool = [
  // --- QUIPS (AFK / bored - funny, in character) -------------------------

  { type: 'quip', text: "Boisha thakte bhalo lage tai na?" },
  { type: 'quip', text: "still here? okay. i respect the commitment." },
  { type: 'quip', text: "you've been still so long i started naming the pixels." },
  { type: 'quip', text: "three hackathon wins and i still can't get you to scroll. tough crowd." },
  { type: 'quip', text: "you stopped moving. either you're reading or you fell asleep." },
  { type: 'quip', text: "i'm a guide, not a screensaver. though, right now, debatable." },
  { type: 'quip', text: "hmm. too boring, i see." },
  { type: 'quip', text: "the cursor's just sitting there. very zen of you." },
  { type: 'quip', text: "i'll just... wait here then." },
  { type: 'quip', text: "i built this at 2am. you're viewing it at whatever hour this is. solidarity." },
  { type: 'quip', text: "at this point we're just hanging out. i'm fine with that." },
  { type: 'quip', text: "...you good?" },
  { type: 'quip', text: "you know there's more below, right?" },
  { type: 'quip', text: "longest anyone's stared at this section. you win nothing, but you win." },

  // --- FACTS (about Kash - no origin story) ------------------------------

  { type: 'fact', text: "random fact: i won three hackathons - best hardware, best ui, best use of elevenlabs. yes, i'm counting." },
  { type: 'fact', text: "random fact: i'm a design engineer. i design the thing, then i build it." },
  { type: 'fact', text: "random fact: i play football (the real kind) every weekend." },
  { type: 'fact', text: "random fact: BLU's sound at 0:42 took three takes. the first two were worse." },
  { type: 'fact', text: "random fact: this site was rewritten three times in my head before i wrote a line of it." },
  { type: 'fact', text: "random fact: the companion you're reading is powered by claude. for real." },
  { type: 'fact', text: "random fact: i built spectral bloom to make visuals listen to audio. it worked." },
  { type: 'fact', text: "random fact: i mentored at youCode 2026 - teaching is the fastest way to learn twice." },
  { type: 'fact', text: "random fact: SFU SIAT, class of 2026. design engineer, soon for hire." },
  { type: 'fact', text: "random fact: the football pitch taught me about space before any design class did." },

  // --- REEL SURFACES -----------------------------------------------------

  { type: 'reel', text: "want to see what i was working on at 2am last tuesday?", clip: null },
  { type: 'reel', text: "here's a clip from the desk. quiet one.", clip: 'desk-ambient' },
  { type: 'reel', text: "hold on. let me play you something from BLU.", clip: 'blu-0-42' },
  { type: 'reel', text: "this is a sketch from the planning doc. don't look too hard at the handwriting.", clip: 'sketch-scan' },
  { type: 'reel', text: "here's spectral bloom reacting to audio. just watch.", clip: 'spectral-bloom-demo' },
]

/**
 * Get the next idle content item from a weighted random selection.
 * Reels get 3x weight so the character custody mechanic fires more often.
 * First idle content per session is always a reel (if unseen reels remain).
 *
 * @param {Set} seenIds - indices already shown this session
 * @returns {{ type: string, text: string, clip?: string, index: number } | null}
 */
export function getNextIdleContent(seenIds) {
  const available = idlePool
    .map((item, i) => ({ ...item, index: i }))
    .filter(item => !seenIds.has(item.index))

  if (available.length === 0) {
    // Pool exhausted - reset and start over
    return { ...idlePool[Math.floor(Math.random() * idlePool.length)], index: -1, poolReset: true }
  }

  // First idle in session -> always pick a reel if available
  if (seenIds.size === 0) {
    const reels = available.filter(item => item.type === 'reel')
    if (reels.length > 0) {
      return reels[Math.floor(Math.random() * reels.length)]
    }
  }

  // Weighted selection: reels get 3x weight
  const weighted = []
  for (const item of available) {
    const weight = item.type === 'reel' ? 3 : 1
    for (let w = 0; w < weight; w++) {
      weighted.push(item)
    }
  }

  return weighted[Math.floor(Math.random() * weighted.length)]
}

export default idlePool
