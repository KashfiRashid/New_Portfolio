import { useEffect, useRef, useState } from 'react'
import { getScores, addScore, getSavedName, saveName, SCORES_ARE_GLOBAL } from '../lib/arcadeScores.js'

/**
 * <ArcadeGame /> - the first-year p5.js space shooter, embedded LIVE and
 * playable inline. One click plays it in place. When a run ends, the score
 * posts to the ranked board; if the player hasn't set a handle yet, they're
 * prompted to name themselves before it saves (so the board isn't all "anon").
 * Board is global via Supabase when configured, else local.
 */

const SCANLINES = 'repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 3px)'
const BTN = 'rounded-sm border border-surface-raised px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted transition-colors hover:border-accent-glow hover:text-text-primary'
const RANK_COLOR = ['text-accent-glow', 'text-zinc-300', 'text-[#c9954b]'] // gold / silver / bronze

export default function ArcadeGame() {
  const [scores, setScores] = useState([])
  const [handle, setHandle] = useState('')
  const [highScore, setHighScore] = useState(0)
  const [runId, setRunId] = useState(0)
  const [pending, setPending] = useState(null) // { score, won } awaiting a name
  const [saved, setSaved] = useState(null)      // last score saved, for a confirmation line
  const frameRef = useRef(null)
  const handleRef = useRef('')
  const nameInputRef = useRef(null)

  useEffect(() => { handleRef.current = handle }, [handle])

  useEffect(() => {
    let alive = true
    getScores().then((s) => { if (alive) setScores(s) })
    setHandle(getSavedName() || '')
    try { setHighScore(Number(localStorage.getItem('arcade.highscore')) || 0) } catch { /* */ }

    const onMessage = async (e) => {
      const d = e.data
      if (!d || d.type !== 'arcade:gameover') return
      const sc = Number(d.score) || 0
      setHighScore((h) => Math.max(h, sc))
      if (sc <= 0) return
      const name = handleRef.current.trim()
      if (name) {
        // already named -> save straight away
        const updated = await addScore({ name: name.slice(0, 16), score: sc, won: !!d.win, at: Date.now() })
        if (alive) { setScores(updated); setSaved(sc) }
      } else if (alive) {
        // no handle yet -> prompt them to claim the score
        setPending({ score: sc, won: !!d.win })
        setTimeout(() => { if (nameInputRef.current) nameInputRef.current.focus() }, 60)
      }
    }
    window.addEventListener('message', onMessage)
    return () => { alive = false; window.removeEventListener('message', onMessage) }
  }, [])

  const onHandle = (e) => { const v = e.target.value.slice(0, 16); setHandle(v); saveName(v.trim()) }

  const submitPending = async (asAnon) => {
    if (!pending) return
    const name = (asAnon ? 'anon' : (handle.trim() || 'anon')).slice(0, 16)
    const { score, won } = pending
    setPending(null)
    const updated = await addScore({ name, score, won, at: Date.now() })
    setScores(updated)
    setSaved(score)
  }

  const restart = () => { setPending(null); setSaved(null); setRunId((r) => r + 1) }
  const goFullscreen = () => {
    const f = frameRef.current
    if (!f) return
    try {
      const el = f.contentDocument && f.contentDocument.documentElement
      if (el && el.requestFullscreen) { el.requestFullscreen(); return }
    } catch { /* cross-origin guard - fall through */ }
    const req = f.requestFullscreen || f.webkitRequestFullscreen || f.msRequestFullscreen
    if (req) req.call(f)
  }

  return (
    <div className="mx-auto w-full max-w-[1080px]">
      <div className="mx-auto grid w-full gap-6 lg:w-fit lg:grid-cols-[minmax(0,700px)_340px] lg:items-stretch">
        {/* Game */}
        <div className="flex flex-col">
          <div
            className="relative w-full overflow-hidden rounded-lg border border-surface-raised bg-black"
            style={{ aspectRatio: '1 / 1' }}
            onMouseDown={() => { try { frameRef.current && frameRef.current.focus() } catch (err) { /* */ } }}
          >
            <iframe
              key={runId}
              ref={frameRef}
              src={`/arcade/index.html?r=${runId}`}
              title="Space Shooter"
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              allow="autoplay; fullscreen"
            />
            <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: SCANLINES }} aria-hidden="true" />
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-faint">
              click to play &middot; WASD to fly &middot; space to shoot &middot; F fullscreen &middot; R to restart
            </span>
            <div className="flex shrink-0 gap-2">
              <button onClick={restart} className={BTN}>Restart</button>
              <button onClick={goFullscreen} className={BTN}>Fullscreen</button>
            </div>
          </div>
        </div>

        {/* Scoreboard - one cohesive card */}
        <aside className="flex flex-col overflow-hidden rounded-lg border border-surface-raised">
          <div className="border-b border-surface-raised bg-accent-glow/[0.06] px-5 py-4 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">High score</p>
            <p className="mt-1 font-display text-5xl leading-none text-text-primary">{highScore}</p>
          </div>

          {pending ? (
            /* Run just ended and no handle set - prompt for a name */
            <div className="border-b border-accent-glow/40 bg-accent-glow/[0.07] px-5 py-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent-glow">
                Run over &middot; you scored {pending.score}
              </p>
              <p className="mt-1 text-sm text-text-primary">Enter a name to claim your spot on the board.</p>
              <input
                ref={nameInputRef}
                value={handle}
                onChange={onHandle}
                onKeyDown={(e) => { if (e.key === 'Enter') submitPending(false) }}
                placeholder="your handle"
                maxLength={16}
                className="mt-2.5 w-full rounded-sm border border-accent-glow/50 bg-transparent px-3 py-1.5 text-sm text-text-primary outline-none focus:border-accent-glow"
              />
              <div className="mt-2.5 flex items-center gap-3">
                <button
                  onClick={() => submitPending(false)}
                  className="rounded-sm border border-accent-glow/60 bg-accent-glow/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-glow transition-colors hover:bg-accent-glow/20"
                >
                  Save to board
                </button>
                <button
                  onClick={() => submitPending(true)}
                  className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-faint transition-colors hover:text-text-muted"
                >
                  skip
                </button>
              </div>
            </div>
          ) : (
            <div className="border-b border-surface-raised px-5 py-4">
              <label className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-faint">Playing as</label>
              <input
                value={handle}
                onChange={onHandle}
                placeholder="your handle"
                maxLength={16}
                className="mt-1.5 w-full rounded-sm border border-surface-raised bg-transparent px-3 py-1.5 text-sm text-text-primary outline-none focus:border-accent-glow"
              />
              {saved != null ? (
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-glow">
                  saved {saved} to the board
                </p>
              ) : null}
            </div>
          )}

          <div className="flex flex-1 flex-col px-5 py-4">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint">Leaderboard</p>
            {scores.length === 0 ? (
              <p className="text-text-faint text-sm leading-relaxed">No scores yet. Be the first.</p>
            ) : (
              <ol className="space-y-0.5">
                {scores.slice(0, 7).map((s, i) => (
                  <li
                    key={`${s.at}-${i}`}
                    className={`grid grid-cols-[20px_minmax(0,1fr)_auto] items-baseline gap-3 rounded-sm px-2 py-1.5 ${i === 0 ? 'bg-accent-glow/[0.08]' : ''}`}
                  >
                    <span className={`text-right font-mono text-[12px] tabular-nums ${RANK_COLOR[i] || 'text-text-faint'}`}>{i + 1}</span>
                    <span className="min-w-0 truncate text-text-primary">
                      {s.name}
                      {s.won ? <span className="ml-1.5 align-middle font-mono text-[9px] uppercase tracking-[0.1em] text-accent-glow">boss</span> : null}
                    </span>
                    <span className={`font-mono tabular-nums ${i === 0 ? 'text-accent-glow' : 'text-text-muted'}`}>{s.score}</span>
                  </li>
                ))}
              </ol>
            )}
            <p className="mt-auto pt-4 text-text-faint text-[11px] leading-relaxed">
              {SCORES_ARE_GLOBAL
                ? "Global board - top scores from everyone who's played."
                : 'Saved on this device for now. A live global board is on the way.'}
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
// end ArcadeGame.jsx
