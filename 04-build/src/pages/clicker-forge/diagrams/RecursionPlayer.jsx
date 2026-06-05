import { useEffect, useMemo, useRef } from 'react'

/**
 * RecursionPlayer - the hammer shockwave, animating by itself. It runs the
 * exact recursion from HammeringEffect (a ring, then four half-size children,
 * four levels deep) and animates it the way the game does: the pattern grows
 * out and fades, then replays at a larger scale. Glancing, weak, solid,
 * perfect, on a loop. Driven by requestAnimationFrame writing straight to the
 * SVG group (no per-frame React render). Respects reduced-motion.
 */
const EM = '#C8A24B'

function build(x, y, r, alpha, depth, acc, key) {
  if (depth === 0) return
  acc.push({ x, y, r, alpha, key })
  const nr = r / 2
  build(x - nr, y, nr, alpha * 0.8, depth - 1, acc, key + 'L')
  build(x + nr, y, nr, alpha * 0.8, depth - 1, acc, key + 'R')
  build(x, y - nr, nr, alpha * 0.8, depth - 1, acc, key + 'U')
  build(x, y + nr, nr, alpha * 0.8, depth - 1, acc, key + 'D')
}

const STAGES = [
  { scale: 0.34, label: 'Glancing strike' },
  { scale: 0.58, label: 'Weak strike' },
  { scale: 0.80, label: 'Solid strike' },
  { scale: 1.00, label: 'Perfect strike' },
]
const GROW = 1150 // ms: grow out and fade
const GAP = 450 // ms: blank beat before the next strike

export default function RecursionPlayer({ className = 'mx-auto w-full max-w-[300px]' }) {
  const circles = useMemo(() => {
    const c = []
    build(200, 200, 84, 1, 4, c, 'r')
    c.sort((a, b) => b.r - a.r)
    return c
  }, [])
  const gRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ease = (t) => 1 - Math.pow(1 - t, 3)
    let raf = 0
    let start = performance.now()
    let idx = 0

    const apply = (scale, opacity, label) => {
      if (gRef.current) {
        gRef.current.setAttribute('transform', `translate(200 200) scale(${scale}) translate(-200 -200)`)
        gRef.current.setAttribute('opacity', String(opacity))
      }
      if (labelRef.current && label) labelRef.current.textContent = label
    }

    if (reduce) {
      apply(STAGES[2].scale, 1, STAGES[2].label)
      return
    }

    const tick = (now) => {
      const elapsed = now - start
      if (elapsed >= GROW + GAP) {
        start = now
        idx = (idx + 1) % STAGES.length
        raf = requestAnimationFrame(tick)
        return
      }
      const stage = STAGES[idx]
      if (elapsed < GROW) {
        const p = elapsed / GROW
        apply(ease(p) * stage.scale, 1 - p * p, stage.label)
      } else {
        apply(0, 0, stage.label)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div className={className}>
      <svg
        viewBox="0 0 400 400"
        className="w-full"
        role="img"
        aria-label="An animated recursive fractal shockwave that expands and fades, then repeats at a larger scale."
      >
        <g ref={gRef} opacity="0">
          {circles.map((c) => (
            <circle
              key={c.key}
              cx={c.x}
              cy={c.y}
              r={c.r}
              fill="none"
              stroke={EM}
              strokeOpacity={c.alpha * 0.85}
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
      </svg>
      <p ref={labelRef} className="mt-1 text-center font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[#E5C877]">
        Perfect strike
      </p>
    </div>
  )
}
