/**
 * AISynesthesiaFlow — how the Claude layer turns sound into a creative
 * brief. Four stages, left to right: the audio features get snapshotted,
 * Claude reads them as a synesthesia engine, returns a small creative
 * JSON payload, and the visualizer lerps toward it over a few seconds.
 *
 * The loop runs roughly every five seconds. The output is additive: it
 * nudges the generative core, it never replaces it.
 *
 * Pure inline SVG. Engineering-diagram register, magenta accent.
 */

const MONO = '"DM Mono", ui-monospace, monospace'
const SANS = '"DM Sans", system-ui, sans-serif'

const STAGES = [
  { label: 'AUDIO ANALYSIS', sub: 'bass 72 · mid 45', sub2: 'high 20 · beat 90' },
  { label: 'CLAUDE', sub: '"what should this', sub2: 'look like?"' },
  { label: 'CREATIVE BRIEF', sub: 'palette · mood', sub2: 'spread · speed' },
  { label: 'SMOOTH APPLY', sub: 'eased blend', sub2: 'over 2 to 3 seconds' },
]

const BOX_W = 160
const BOX_H = 96
const GAP = 36
const X0 = 26
const Y0 = 56

export default function AISynesthesiaFlow() {
  return (
    <svg
      viewBox="0 0 800 200"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="flow-title flow-desc"
      className="mx-auto block h-auto w-full max-w-[760px]"
      shapeRendering="geometricPrecision"
    >
      <title id="flow-title">The AI synesthesia loop</title>
      <desc id="flow-desc">
        A four-stage left-to-right pipeline. Audio analysis feeds
        Claude, which returns a creative brief of palette, mood,
        spread, and speed. The visualizer applies it with a smooth,
        eased blend. The loop repeats roughly every five seconds.
      </desc>

      <text x={X0} y="28" fill="#FF3D6E" fontFamily={MONO} fontSize="12" letterSpacing="2" fontWeight="700">
        EVERY ~5 SECONDS
      </text>

      {STAGES.map((stage, i) => {
        const x = X0 + i * (BOX_W + GAP)
        const accent = i === 1 ? '#FF3D6E' : '#52525b'
        return (
          <g key={stage.label}>
            <rect
              x={x}
              y={Y0}
              width={BOX_W}
              height={BOX_H}
              rx="6"
              fill={i === 1 ? '#FF3D6E14' : '#ffffff05'}
              stroke={i === 1 ? '#FF3D6E' : '#3f3f46'}
              strokeWidth="1"
            />
            <text x={x + BOX_W / 2} y={Y0 + 30} fill={i === 1 ? '#FF3D6E' : '#d4d4d8'} fontFamily={MONO} fontSize="11" letterSpacing="1.2" textAnchor="middle">
              {stage.label}
            </text>
            <text x={x + BOX_W / 2} y={Y0 + 56} fill="#a1a1aa" fontFamily={SANS} fontSize="12" textAnchor="middle">
              {stage.sub}
            </text>
            <text x={x + BOX_W / 2} y={Y0 + 73} fill="#a1a1aa" fontFamily={SANS} fontSize="12" textAnchor="middle">
              {stage.sub2}
            </text>
            {i < STAGES.length - 1 ? (
              <g stroke="#FF3D6E" strokeWidth="1.5" fill="none">
                <line x1={x + BOX_W + 6} y1={Y0 + BOX_H / 2} x2={x + BOX_W + GAP - 8} y2={Y0 + BOX_H / 2} />
                <path d={`M ${x + BOX_W + GAP - 8} ${Y0 + BOX_H / 2} l -6 -4 m 6 4 l -6 4`} />
              </g>
            ) : null}
          </g>
        )
      })}

      <text x="400" y="184" fill="#71717a" fontFamily={SANS} fontSize="12" textAnchor="middle">
        Additive only. When the AI is not connected, a built-in formula fills the same slot.
      </text>
    </svg>
  )
}
