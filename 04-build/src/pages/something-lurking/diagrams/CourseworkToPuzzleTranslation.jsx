/**
 * CourseworkToPuzzleTranslation — the case study's hardest evidence.
 *
 * Left column lists the two prior assignments I argued. Right column
 * shows the in-game puzzles that came from them. Arrows in between.
 * Same engineering-diagram register as bc-connect's explanatory SVGs.
 */

const MONO = '"JetBrains Mono", "Geist Mono", ui-monospace, monospace'
const SANS = 'Inter, "Söhne", system-ui, sans-serif'

const LEFT = [
  {
    label: 'A1 · DESIGN PHILOSOPHY',
    body: 'Scaling without mechanical purpose is empty spectacle. Shrinking needs to do something: retrieve items, reach restricted areas, repair systems.',
  },
  {
    label: 'A2 · MECHANIC PROPOSAL',
    body: 'Pipe and valve manipulation. Hand-driven physical mechanics that the player operates at a smaller scale.',
  },
]

const RIGHT = [
  { label: 'FUSEBOX', sub: '1:100 wire & fuse puzzle' },
  { label: 'CHIP-SPACE', sub: '1:1000 circuit completion' },
  { label: 'VENT VALVES', sub: 'Valve hand-mechanics in flow' },
]

const L_X = 30
const L_W = 320
const R_X = 470
const R_W = 300
const ROW_H = 60
const ROW_GAP = 18

export default function CourseworkToPuzzleTranslation() {
  return (
    <svg
      viewBox="0 0 800 360"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="trans-title trans-desc"
      className="mx-auto block h-auto w-full max-w-[760px]"
      shapeRendering="geometricPrecision"
    >
      <title id="trans-title">Coursework to in-game puzzle translation</title>
      <desc id="trans-desc">
        Two coursework artifacts on the left. Three in-game puzzle systems
        on the right. Arrows show that the puzzles were direct translations
        of the prior design work.
      </desc>

      {/* Column headers */}
      <text x={L_X} y="28" fill="#71717a" fontFamily={MONO} fontSize="10" letterSpacing="2">
        WHAT I ARGUED BEFORE THE PROJECT
      </text>
      <text x={R_X} y="28" fill="#6E3FB3" fontFamily={MONO} fontSize="10" letterSpacing="2" fontWeight="700">
        WHAT SHIPPED IN THE BUILD
      </text>

      {/* Left blocks — coursework */}
      {LEFT.map((item, i) => {
        const y = 50 + i * 130
        return (
          <g key={item.label}>
            <rect x={L_X} y={y} width={L_W} height="106" rx="6" fill="none" stroke="#3f3f46" strokeWidth="1" strokeDasharray="4 3" />
            <text x={L_X + 16} y={y + 24} fill="#a1a1aa" fontFamily={MONO} fontSize="11" letterSpacing="1.4">
              {item.label}
            </text>
            <foreignObject x={L_X + 16} y={y + 36} width={L_W - 32} height="64">
              <p xmlns="http://www.w3.org/1999/xhtml" style={{ margin: 0, fontFamily: SANS, fontSize: '12px', lineHeight: 1.5, color: '#d4d4d8' }}>
                {item.body}
              </p>
            </foreignObject>
          </g>
        )
      })}

      {/* Right blocks — in-game puzzles */}
      {RIGHT.map((item, i) => {
        const y = 50 + i * (ROW_H + ROW_GAP)
        return (
          <g key={item.label}>
            <rect x={R_X} y={y} width={R_W} height={ROW_H} rx="6" fill="#6E3FB314" stroke="#6E3FB3" strokeWidth="1" />
            <text x={R_X + 16} y={y + 24} fill="#6E3FB3" fontFamily={MONO} fontSize="11" letterSpacing="1.4">
              {item.label}
            </text>
            <text x={R_X + 16} y={y + 44} fill="#d4d4d8" fontFamily={SANS} fontSize="12">
              {item.sub}
            </text>
          </g>
        )
      })}

      {/* Arrows from coursework to each puzzle */}
      <g stroke="#6E3FB3" strokeWidth="1.5" fill="none" opacity="0.7">
        {/* A1 (philosophy) feeds all three puzzles — branching arrow */}
        <path d={`M ${L_X + L_W + 4} 100 L 430 100 L 430 80 L ${R_X - 6} 80`} />
        <path d={`M ${R_X - 6} 80 l -6 -4 m 6 4 l -6 4`} />
        <path d={`M 430 100 L 430 158 L ${R_X - 6} 158`} />
        <path d={`M ${R_X - 6} 158 l -6 -4 m 6 4 l -6 4`} />
        <path d={`M 430 100 L 430 236 L ${R_X - 6} 236`} />
        <path d={`M ${R_X - 6} 236 l -6 -4 m 6 4 l -6 4`} />
        {/* A2 (mechanic) feeds the same three more directly */}
        <path d={`M ${L_X + L_W + 4} 232 L 460 232`} strokeDasharray="2 3" />
      </g>

      <text x="400" y="345" fill="#71717a" fontFamily={SANS} fontSize="12" textAnchor="middle">
        Two coursework artifacts. Three in-game puzzles. The line from argument to ship was straight.
      </text>
    </svg>
  )
}
