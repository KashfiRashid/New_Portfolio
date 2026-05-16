/**
 * UserFlowDiagram. Five-stage horizontal flow with persistent CTA.
 *
 * Pure inline SVG. Five stage pills connected by signal-green arrows.
 * A persistent "Book consultation" CTA bar sits below all five stages
 * to make the always-visible CTA point explicit.
 *
 * Palette: zinc-700 #3f3f46 (stage stroke), zinc-200 #e4e4e7 (stage
 * label), signal #1B6B4F (arrows, CTA), surface #15171C (fill).
 */

const STAGES = [
  { label: 'LANDING', note: 'hero · value prop' },
  { label: 'SERVICES', note: 'offering preview' },
  { label: 'ABOUT', note: 'trust building' },
  { label: 'CONTACT', note: 'form · phone' },
  { label: 'CONFIRMATION', note: 'booking confirmed' },
]

const MONO = '"DM Mono", ui-monospace, monospace'
const SANS = '"DM Sans", system-ui, sans-serif'

export default function UserFlowDiagram() {
  const stageW = 132
  const stageH = 68
  const gap = 22
  const startX = 24
  const stageY = 60

  return (
    <svg
      viewBox="0 0 800 240"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="parpro-flow-title parpro-flow-desc"
      className="mx-auto block h-auto w-full max-w-[760px]"
      shapeRendering="geometricPrecision"
    >
      <title id="parpro-flow-title">Parpro user flow</title>
      <desc id="parpro-flow-desc">
        Five horizontal stages from Landing through Services, About, and
        Contact to Confirmation. A persistent consultation CTA sits below
        every stage.
      </desc>

      {STAGES.map((stage, i) => {
        const x = startX + i * (stageW + gap)
        return (
          <g key={stage.label}>
            <rect
              x={x}
              y={stageY}
              width={stageW}
              height={stageH}
              rx="6"
              fill="#15171C"
              stroke="#3f3f46"
              strokeWidth="1"
            />
            <text
              x={x + stageW / 2}
              y={stageY + 28}
              textAnchor="middle"
              fill="#e4e4e7"
              fontFamily={MONO}
              fontSize="11"
              letterSpacing="1.5"
            >
              {stage.label}
            </text>
            <text
              x={x + stageW / 2}
              y={stageY + 48}
              textAnchor="middle"
              fill="#71717a"
              fontFamily={SANS}
              fontSize="10"
            >
              {stage.note}
            </text>
            {i < STAGES.length - 1 ? (
              <g stroke="#1B6B4F" strokeWidth="2" fill="none">
                <line
                  x1={x + stageW + 2}
                  y1={stageY + stageH / 2}
                  x2={x + stageW + gap - 4}
                  y2={stageY + stageH / 2}
                />
                <path
                  d={`M ${x + stageW + gap - 4} ${stageY + stageH / 2} l -5 -4 m 5 4 l -5 4`}
                />
              </g>
            ) : null}
          </g>
        )
      })}

      <rect
        x={startX}
        y={stageY + stageH + 36}
        width={5 * stageW + 4 * gap}
        height="38"
        rx="8"
        fill="none"
        stroke="#1B6B4F"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <text
        x={400}
        y={stageY + stageH + 60}
        textAnchor="middle"
        fill="#1B6B4F"
        fontFamily={MONO}
        fontSize="11"
        letterSpacing="2"
      >
        PERSISTENT CTA · BOOK CONSULTATION
      </text>
    </svg>
  )
}
