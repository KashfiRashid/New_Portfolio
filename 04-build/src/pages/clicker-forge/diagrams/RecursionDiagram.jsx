/**
 * RecursionDiagram - a faithful render of the hammer shockwave. It runs the
 * exact recursion from HammeringEffect.drawRecursiveFractal in the game: an
 * oval at (x, y, r), then four children at (x +/- r/2, y) and (x, y +/- r/2)
 * with half the radius, depth - 1, and alpha * 0.8. Parametric so the same
 * pattern can be drawn at different scales (a weak strike vs a perfect one).
 * Bronze register, ASCII only.
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

export default function RecursionDiagram({ rootRadius = 70, depth = 4, className = 'mx-auto w-full max-w-[340px]' }) {
  const circles = []
  build(200, 200, rootRadius, 1, depth, circles, 'r')
  // draw larger circles first so smaller rings layer on top, matching the game
  circles.sort((a, b) => b.r - a.r)
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      role="img"
      aria-label="Recursive fractal shockwave from the hammer strike: a ring, then four half-size rings around it, repeated several levels deep."
    >
      {circles.map((c) => (
        <circle
          key={c.key}
          cx={c.x}
          cy={c.y}
          r={c.r}
          fill="none"
          stroke={EM}
          strokeOpacity={c.alpha * 0.85}
          strokeWidth={c.r > 20 ? 1.6 : 1.1}
        />
      ))}
    </svg>
  )
}
// end RecursionDiagram.jsx
