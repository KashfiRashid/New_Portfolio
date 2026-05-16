/**
 * SoundMoments — a horizontal timeline showing the five sound beats
 * that carry the story. Labels alternate above and below the timeline
 * so they never overlap. Color tells voice from environment.
 */

const MONO = '"JetBrains Mono", "Geist Mono", ui-monospace, monospace'
const SANS = 'Inter, "Söhne", system-ui, sans-serif'

const MOMENTS = [
  { t: 0.08, label: "Captain Harry's radio",       sub: 'friendly · routine', kind: 'voice', side: 'top' },
  { t: 0.34, label: 'Radio cuts. Silence.',         sub: 'the descent begins',  kind: 'voice', side: 'bottom' },
  { t: 0.52, label: 'Footsteps in the unwalked corridor', sub: 'the presence implied', kind: 'env',   side: 'top' },
  { t: 0.78, label: 'Banging on the door',          sub: 'monster, off-frame',  kind: 'env',   side: 'bottom' },
  { t: 0.94, label: 'The growl behind you',         sub: 'cliffhanger',         kind: 'env',   side: 'top' },
]

const X0 = 60
const X1 = 740
const TIMELINE_Y = 120
const TOP_Y = 50
const BOTTOM_Y = 168

function colorFor(kind) {
  return kind === 'voice' ? '#C8362A' : '#7FA050'
}

export default function SoundMoments() {
  const xAt = (t) => X0 + t * (X1 - X0)
  return (
    <svg
      viewBox="0 0 800 220"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="moments-title moments-desc"
      className="mx-auto block h-auto w-full max-w-[760px]"
      shapeRendering="geometricPrecision"
    >
      <title id="moments-title">Sound beats across the three acts</title>
      <desc id="moments-desc">
        A horizontal timeline showing five sound beats: the friendly
        captain in Act I, the radio cutting at the start of Act II,
        the footsteps and the banging on the door in Act II and III,
        and the final growl behind the escape pod at the very end.
      </desc>

      {/* Act labels along the top */}
      <text x={X0} y="22" fill="#71717a" fontFamily={MONO} fontSize="10" letterSpacing="1.6">
        ACT I
      </text>
      <text x={X0 + 0.33 * (X1 - X0)} y="22" fill="#E85850" fontFamily={MONO} fontSize="10" letterSpacing="1.6">
        ACT II
      </text>
      <text x={X0 + 0.71 * (X1 - X0)} y="22" fill="#C8362A" fontFamily={MONO} fontSize="10" letterSpacing="1.6" fontWeight="700">
        ACT III
      </text>

      {/* Act dividers */}
      <line x1={X0 + 0.33 * (X1 - X0)} y1="28" x2={X0 + 0.33 * (X1 - X0)} y2="200" stroke="#27272a" strokeWidth="1" strokeDasharray="2 4" />
      <line x1={X0 + 0.71 * (X1 - X0)} y1="28" x2={X0 + 0.71 * (X1 - X0)} y2="200" stroke="#27272a" strokeWidth="1" strokeDasharray="2 4" />

      {/* Master timeline */}
      <line x1={X0} y1={TIMELINE_Y} x2={X1} y2={TIMELINE_Y} stroke="#52525b" strokeWidth="1" />

      {/* Moment markers */}
      {MOMENTS.map((m) => {
        const x = xAt(m.t)
        const c = colorFor(m.kind)
        const isTop = m.side === 'top'
        const labelY = isTop ? TOP_Y : BOTTOM_Y
        const subY = isTop ? TOP_Y + 16 : BOTTOM_Y + 16
        const anchor = m.t > 0.85 ? 'end' : m.t < 0.15 ? 'start' : 'middle'
        return (
          <g key={m.label}>
            {/* connector */}
            <line x1={x} y1={TIMELINE_Y} x2={x} y2={isTop ? TOP_Y + 22 : BOTTOM_Y - 12} stroke={c} strokeWidth="1" opacity="0.5" />
            {/* dot on timeline */}
            <circle cx={x} cy={TIMELINE_Y} r="4" fill={c} />
            {/* primary label */}
            <text x={x} y={labelY} fill="#d4d4d8" fontFamily={SANS} fontSize="12" fontWeight="500" textAnchor={anchor}>
              {m.label}
            </text>
            {/* sub label */}
            <text x={x} y={subY} fill={c} fontFamily={MONO} fontSize="9" letterSpacing="1.2" textAnchor={anchor}>
              {m.sub}
            </text>
          </g>
        )
      })}

      <text x="400" y="210" fill="#71717a" fontFamily={SANS} fontSize="11" textAnchor="middle">
        Five beats. The story is mostly what the player hears.
      </text>
    </svg>
  )
}
