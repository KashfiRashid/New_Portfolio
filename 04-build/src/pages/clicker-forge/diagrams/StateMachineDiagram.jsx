/**
 * StateMachineDiagram - the macro game loop SmelterPanel runs as a single
 * state variable. A blade flows left to right through five phases, each with
 * its sub-steps, then a solid loop carries Restart back to the start. Inline
 * SVG, bronze register, ASCII only.
 */
const SANS = '"DM Sans", system-ui, sans-serif'
const MONO = '"DM Mono", ui-monospace, monospace'
const EM = '#C8A24B'
const EM_BRIGHT = '#E5C877'

const NY = 70
const NH = 92
const NW = 146
const GAP = 14
const X0 = 12
const NODES = [
  { title: 'Intro', steps: ['title', 'instructions'] },
  { title: 'Smelt', steps: ['light + melt', 'bellows / smoke', 'pour to cast'] },
  { title: 'Hammer', steps: ['time the bar', 'strike + score', 'fractal hit'] },
  { title: 'Decorate', steps: ['add emblem', 'add grip'] },
  { title: 'Finalize', steps: ['outro', 'restart'] },
]

export default function StateMachineDiagram() {
  const xs = NODES.map((_, i) => X0 + i * (NW + GAP))
  const lastCx = xs[xs.length - 1] + NW / 2
  const firstCx = xs[0] + NW / 2
  return (
    <svg
      viewBox="0 0 808 240"
      className="mx-auto w-full max-w-[720px]"
      role="img"
      aria-label="Game loop state machine: Intro, Smelt, Hammer, Decorate, Finalize, with a Restart loop back to the start."
    >
      <defs>
        <marker id="cf-sm-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={EM} />
        </marker>
      </defs>

      {NODES.map((n, i) => {
        const x = xs[i]
        const mine = i === 1 || i === 2 // smelt + hammer are the heavy custom panels
        return (
          <g key={n.title}>
            {i < NODES.length - 1 ? (
              <line x1={x + NW + 1} y1={NY + NH / 2} x2={xs[i + 1] - 1} y2={NY + NH / 2} stroke={EM} strokeWidth="2" markerEnd="url(#cf-sm-ah)" />
            ) : null}
            <rect x={x} y={NY} width={NW} height={NH} rx="10" fill="#1B160D" stroke={mine ? EM : '#4a4129'} strokeWidth={mine ? 1.6 : 1} />
            <text x={x + 16} y={NY + 28} fontFamily={SANS} fontSize="18" fill="#f4f4f5">{n.title}</text>
            {n.steps.map((s, j) => (
              <text key={s} x={x + 16} y={NY + 48 + j * 15} fontFamily={MONO} fontSize="10" fill="#a1a1aa">
                {s}
              </text>
            ))}
          </g>
        )
      })}

      {/* restart loop */}
      <path
        d={`M ${lastCx} ${NY + NH} V 206 H ${firstCx} V ${NY + NH}`}
        fill="none"
        stroke={EM}
        strokeWidth="1.5"
        markerEnd="url(#cf-sm-ah)"
      />
      <rect x="332" y="190" width="144" height="30" rx="15" fill="#130F09" stroke={EM} strokeWidth="1" />
      <text x="404" y="210" textAnchor="middle" fontFamily={MONO} fontSize="10.5" letterSpacing="1" fill={EM_BRIGHT}>RESTART LOOP</text>
    </svg>
  )
}
