// Idle Content Pool
// Source of truth: /01-brand-book/05-wow-mechanics.md + /04-companion-spec.md
//
// Three types of idle content:
//   'quip'  — short companion bubble (funny, observational, or factual)
//   'fact'  — random fact about Kash
//   'reel'  — surfaces a reel clip in the lower-right corner
//
// The idle cycle shuffles through these every ~8s while the visitor
// isn't moving. Movement at any point stops the cycle and dismisses everything.
//
// These are separate from the main bubbleLibrary — the idle pool is specifically
// for the "the visitor went AFK" scenario. Voice is still Kash's, lowercase casual.

const idlePool = [
  // ─── QUIPS (funny / observational) ─────────────────────────────────────

  { type: 'quip', text: "still here? okay. i respect the commitment." },
  { type: 'quip', text: "you stopped moving. either you're reading or you fell asleep." },
  { type: 'quip', text: "are you lost? that's fine. the site's small." },
  { type: 'quip', text: "hmm. too boring, i see." },
  { type: 'quip', text: "i'll just... wait here then." },
  { type: 'quip', text: "this is the longest anyone's stared at this section." },
  { type: 'quip', text: "if you're on your phone right now, i get it." },
  { type: 'quip', text: "the cursor's just sitting there. very zen of you." },
  { type: 'quip', text: "i'm not going anywhere. take your time." },
  { type: 'quip', text: "you know there's more below, right?" },
  { type: 'quip', text: "at this point we're just hanging out. i'm fine with that." },
  { type: 'quip', text: "this silence is kind of nice, actually." },
  { type: 'quip', text: "...you good?" },
  { type: 'quip', text: "the site doesn't bite. you can scroll." },
  { type: 'quip', text: "i built this at 2am. you're viewing it at... whatever time it is for you." },

  // ─── FACTS (random things about Kash) ──────────────────────────────────

  { type: 'fact', text: "random fact: i play football (the real kind) every weekend." },
  { type: 'fact', text: "random fact: i moved from dhaka to delta in 2022. still adjusting to the rain." },
  { type: 'fact', text: "random fact: BLU's sound at 0:42 took three takes. the first two were worse." },
  { type: 'fact', text: "random fact: this site was rewritten three times in my head before i started this version." },
  { type: 'fact', text: "random fact: my friend sazzad is in dhaka. nine years of friendship." },
  { type: 'fact', text: "random fact: i work on the FIC IT Squad. tuesday afternoons disappear into incident triage." },
  { type: 'fact', text: "random fact: the companion you're reading right now is powered by claude. for real." },
  { type: 'fact', text: "random fact: i built spectral bloom to make visuals listen to audio. it worked." },
  { type: 'fact', text: "random fact: the word 'executioneery' isn't real. that's the point." },
  { type: 'fact', text: "random fact: the football pitch taught me about space before any design class did." },
  { type: 'fact', text: "random fact: i'm graduating SFU SIAT june 10, 2026. if you're reading this after, i did it." },
  { type: 'fact', text: "random fact: my dad held two coffees the day i landed at YVR. he got my order right." },

  // ─── REEL SURFACES ─────────────────────────────────────────────────────

  { type: 'reel', text: "want to see what i was working on at 2am last tuesday?", clip: null },
  { type: 'reel', text: "here's a clip from the desk. quiet one.", clip: 'desk-ambient' },
  { type: 'reel', text: "hold on. let me play you something from BLU.", clip: 'blu-0-42' },
  { type: 'reel', text: "this is a sketch from the planning doc. don't look too hard at the handwriting.", clip: 'sketch-scan' },
  { type: 'reel', text: "here's spectral bloom reacting to audio. just watch.", clip: 'spectral-bloom-demo' },
]

/**
 * Get the next idle content item from a weighted random selection.
 * Reels get 3× weight so the character custody mechanic fires more often.
 * First idle content per session is always a reel (if unseen reels remain).
 *
 * @param {Set} seenIds — indices already shown this session
 * @returns {{ type: string, text: string, clip?: string, index: number } | null}
 */
export function getNextIdleContent(seenIds) {
  const available = idlePool
    .map((item, i) => ({ ...item, index: i }))
    .filter(item => !seenIds.has(item.index))

  if (available.length === 0) {
    // Pool exhausted — reset and start over
    return { ...idlePool[Math.floor(Math.random() * idlePool.length)], index: -1, poolReset: true }
  }

  // First idle in session → always pick a reel if available
  if (seenIds.size === 0) {
    const reels = available.filter(item => item.type === 'reel')
    if (reels.length > 0) {
      return reels[Math.floor(Math.random() * reels.length)]
    }
  }

  // Weighted selection: reels get 3× weight
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
