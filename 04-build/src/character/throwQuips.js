/**
 * One-liners when the visitor releases the character after a grab.
 * Voice: dry, 2am-studio, self-aware — swap or extend anytime.
 */
const LINES = [
  'okay okay i can walk on my own',
  'that was… a choice.',
  'the conductor does NOT throw the orchestra.',
  'i\'m freelance gravity-wise. let\'s not.',
  'you treat pixels like stress balls and i respect the honesty.',
  'if this is how you lead standups we should talk',
  'noted for the retrospective',
]

const STORAGE_KEY = 'kr.throwQuip.last'

/**
 * Pick a line different from the last one this tab session (best-effort).
 */
export function pickThrowQuip() {
  try {
    const last = sessionStorage.getItem(STORAGE_KEY)
    const pool = last ? LINES.filter(l => l !== last) : LINES
    const pick = pool[Math.floor(Math.random() * pool.length)] || LINES[0]
    sessionStorage.setItem(STORAGE_KEY, pick)
    return pick
  } catch {
    return LINES[Math.floor(Math.random() * LINES.length)]
  }
}
