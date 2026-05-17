/**
 * ResearchSynthesis — funnel from breadth to focus.
 *
 * Left side: 45 small dots representing the interviews, distributed
 * across a wider area (the breadth across 12+ countries). Middle: a
 * narrowing tunnel that visually funnels the breadth into focus.
 * Right: three labeled rectangles for the three pain points.
 */

const MONO = '"JetBrains Mono", "Geist Mono", ui-monospace, monospace'
const SANS = 'Inter, "Söhne", system-ui, sans-serif'

const PAINS = [
  { label: 'INFORMATION OVERLOAD', sub: 'too much, all at once' },
  { label: 'UNCLEAR PROGRESS', sub: 'no sense of where you are' },
  { label: 'COMPLEX NAVIGATION', sub: 'next step never obvious' },
]

// 45 deterministic dots, distributed in a left cluster
function dotPositions() {
  const out = []
  let seed = 1
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  for (let i = 0; i < 45; i++) {
    const x = 30 + rand() * 180
    const y = 30 + rand() * 220
    out.push({ x, y })
  }
  return out
}

const DOTS = dotPositions()

export default function ResearchSynthesis() {
  return (
    <svg
      viewBox="0 0 800 300"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="synth-title synth-desc"
      className="mx-auto block h-auto w-full max-w-[760px]"
      shapeRendering="geometricPrecision"
    >
      <title id="synth-title">45 interviews funneled into three pain points</title>
      <desc id="synth-desc">
        Left, a scattered cluster of 45 dots representing interviews
        across 12 or more countries. Middle, a funnel narrowing the
        breadth into focus. Right, three pain points that emerged in
        nearly every conversation.
      </desc>

      {/* Left header */}
      <text x="120" y="22" fill="#71717a" fontFamily={MONO} fontSize="10" letterSpacing="1.6" textAnchor="middle">
        45 INTERVIEWS · 12+ COUNTRIES
      </text>

      {/* Dots */}
      <g fill="#8B8FF5">
        {DOTS.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r="2.2" opacity="0.6" />
        ))}
      </g>

      {/* Funnel */}
      <g stroke="#5E62E0" strokeWidth="1.2" fill="none" opacity="0.5">
        <line x1="230" y1="40" x2="430" y2="120" />
        <line x1="230" y1="260" x2="430" y2="180" />
      </g>

      {/* Right header */}
      <text x="600" y="22" fill="#5E62E0" fontFamily={MONO} fontSize="10" letterSpacing="1.6" textAnchor="middle" fontWeight="700">
        THREE PAIN POINTS
      </text>

      {/* Pain point cards */}
      {PAINS.map((p, i) => {
        const y = 40 + i * 76
        return (
          <g key={p.label}>
            <rect x="450" y={y} width="320" height="58" rx="6" fill="#5E62E014" stroke="#5E62E0" strokeWidth="1" />
            <text x="466" y={y + 24} fill="#8B8FF5" fontFamily={MONO} fontSize="11" letterSpacing="1.4">
              {p.label}
            </text>
            <text x="466" y={y + 44} fill="#a1a1aa" fontFamily={SANS} fontSize="11" fontStyle="italic">
              {p.sub}
            </text>
          </g>
        )
      })}

      <text x="400" y="290" fill="#71717a" fontFamily={SANS} fontSize="11" textAnchor="middle" fontStyle="italic">
        45 conversations. Three patterns that appeared in nearly all of them.
      </text>
    </svg>
  )
}
