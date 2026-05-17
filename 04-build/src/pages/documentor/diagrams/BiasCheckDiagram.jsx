/**
 * BiasCheckDiagram — the methodological spine of the case study.
 *
 * Four nodes left to right. Node 1 (My experience, n=1) is small and
 * tentative, drawn with a dashed stroke. Node 4 (Design from evidence)
 * is solid and confident. The visual progression from doubt to grounding
 * is the argument.
 */

const MONO = '"JetBrains Mono", "Geist Mono", ui-monospace, monospace'
const SANS = 'Inter, "Söhne", system-ui, sans-serif'

const NODES = [
  { label: 'MY EXPERIENCE', sub: 'n = 1', tentative: true },
  { label: '45 INTERVIEWS', sub: '12+ countries' },
  { label: 'VALIDATED', sub: 'shared problem' },
  { label: 'DESIGN', sub: 'from evidence, not memory', solid: true },
]

const ARROWS = [
  'could be universal, could be just mine',
  'pattern holds',
  'now I can',
]

const BOX_W = 160
const BOX_H = 68
const X0 = 20
const GAP = 36
const Y = 90

export default function BiasCheckDiagram() {
  return (
    <svg
      viewBox="0 0 800 200"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="bias-title bias-desc"
      className="mx-auto block h-auto w-full max-w-[760px]"
      shapeRendering="geometricPrecision"
    >
      <title id="bias-title">From single experience to evidenced design</title>
      <desc id="bias-desc">
        Four-stage horizontal flow. The first node, My Experience with
        n=1, is tentative. The second node, 45 interviews across 12+
        countries, is the bias test. The third node, Validated, confirms
        the shared problem. The fourth node, Design from evidence not
        memory, is the grounded outcome.
      </desc>

      {NODES.map((node, i) => {
        const x = X0 + i * (BOX_W + GAP)
        const stroke = node.solid ? '#8B8FF5' : node.tentative ? '#52525b' : '#71717a'
        const fill = node.solid ? '#5E62E014' : 'none'
        return (
          <g key={node.label}>
            <rect
              x={x}
              y={Y}
              width={BOX_W}
              height={BOX_H}
              rx="6"
              fill={fill}
              stroke={stroke}
              strokeWidth={node.solid ? '1.5' : '1'}
              strokeDasharray={node.tentative ? '4 3' : '0'}
            />
            <text x={x + BOX_W / 2} y={Y + 28} fill={node.solid ? '#8B8FF5' : '#d4d4d8'} fontFamily={MONO} fontSize="11" letterSpacing="1.4" textAnchor="middle">
              {node.label}
            </text>
            <text x={x + BOX_W / 2} y={Y + 48} fill="#a1a1aa" fontFamily={SANS} fontSize="11" textAnchor="middle" fontStyle="italic">
              {node.sub}
            </text>
            {i < NODES.length - 1 ? (
              <g>
                <g stroke="#5E62E0" strokeWidth="1.2" fill="none" opacity="0.6">
                  <line x1={x + BOX_W + 4} y1={Y + BOX_H / 2} x2={x + BOX_W + GAP - 6} y2={Y + BOX_H / 2} />
                  <path d={`M ${x + BOX_W + GAP - 6} ${Y + BOX_H / 2} l -5 -4 m 5 4 l -5 4`} />
                </g>
                <text
                  x={x + BOX_W + GAP / 2}
                  y={Y - 8}
                  fill="#71717a"
                  fontFamily={MONO}
                  fontSize="8"
                  letterSpacing="0.5"
                  textAnchor="middle"
                >
                  {ARROWS[i]}
                </text>
              </g>
            ) : null}
          </g>
        )
      })}

      <text x="400" y="190" fill="#71717a" fontFamily={SANS} fontSize="11" textAnchor="middle" fontStyle="italic">
        The interviews were not discovery. They were a bias test.
      </text>
    </svg>
  )
}
