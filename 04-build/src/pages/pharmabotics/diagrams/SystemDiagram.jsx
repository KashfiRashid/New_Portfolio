/**
 * SystemDiagram - the real three-layer architecture (from the repo).
 * React client <-> Node/Express server (+ MongoDB) <-> Arduino, with the
 * sensors and actuators grouped under the board. Inline SVG, teal accent.
 * The Arduino layer is highlighted - it is where my work lives.
 */
const SANS = '"DM Sans", system-ui, sans-serif'
const MONO = '"DM Mono", ui-monospace, monospace'
const T = '#14B8A6'
const TB = '#5EEAD4'

const NODES = [
  { x: 24, title: 'Client', sub: 'React + Tailwind', who: 'doctor & patient UI' },
  { x: 312, title: 'Server', sub: 'Node / Express', who: 'REST + serial bridge' },
  { x: 600, title: 'Arduino Uno', sub: 'the machine', who: 'sensors + motors', mine: true },
]
const NW = 196
const NH = 96
const NY = 28

function chip(x, y, label, accent) {
  return (
    <g key={label + x}>
      <rect x={x} y={y} width="92" height="24" rx="12" fill="#15191B" stroke={accent ? T : '#3f3f46'} />
      <text x={x + 46} y={y + 16} textAnchor="middle" fontFamily={MONO} fontSize="10" fill={accent ? TB : '#a1a1aa'}>{label}</text>
    </g>
  )
}

export default function SystemDiagram() {
  const cy = NY + NH / 2
  return (
    <svg viewBox="0 0 820 360" className="mx-auto w-full max-w-[720px]" role="img"
      aria-label="Three-layer architecture: React client, Node server with MongoDB, Arduino with sensors and actuators.">
      <defs>
        <marker id="sd-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={T} />
        </marker>
      </defs>

      {/* connectors with labels */}
      {[0, 1].map((i) => {
        const x1 = NODES[i].x + NW
        const x2 = NODES[i + 1].x
        const labels = ['REST / JSON', 'USB serial']
        return (
          <g key={i}>
            <line x1={x1 + 2} y1={cy - 8} x2={x2 - 2} y2={cy - 8} stroke={T} strokeWidth="2" markerEnd="url(#sd-a)" />
            <line x1={x2 - 2} y1={cy + 8} x2={x1 + 2} y2={cy + 8} stroke="#3f3f46" strokeWidth="2" markerEnd="url(#sd-a)" />
            <text x={(x1 + x2) / 2} y={cy - 16} textAnchor="middle" fontFamily={MONO} fontSize="9.5" fill="#71717a">{labels[i]}</text>
          </g>
        )
      })}

      {NODES.map((n) => (
        <g key={n.title}>
          <rect x={n.x} y={NY} width={NW} height={NH} rx="12" fill="#15191B" stroke={n.mine ? T : '#3f3f46'} strokeWidth={n.mine ? 1.7 : 1} />
          <text x={n.x + 20} y={NY + 36} fontFamily={SANS} fontSize="21" fill="#e4e4e7">{n.title}</text>
          <text x={n.x + 20} y={NY + 60} fontFamily={MONO} fontSize="12" fill="#a1a1aa">{n.sub}</text>
          <text x={n.x + 20} y={NY + 80} fontFamily={MONO} fontSize="10.5" fill={n.mine ? TB : '#71717a'}>{n.who}</text>
        </g>
      ))}

      {/* MongoDB under server */}
      <line x1={410} y1={NY + NH} x2={410} y2={158} stroke="#3f3f46" strokeWidth="1.5" />
      <ellipse cx="410" cy="170" rx="62" ry="13" fill="#15191B" stroke="#3f3f46" />
      <text x="410" y="174" textAnchor="middle" fontFamily={MONO} fontSize="11" fill="#a1a1aa">MongoDB</text>

      {/* sensors + actuators grouped under Arduino */}
      <line x1={698} y1={NY + NH} x2={698} y2={150} stroke={T} strokeWidth="1.5" />
      <text x={604} y={166} fontFamily={MONO} fontSize="9.5" letterSpacing="1" fill={TB}>SENSORS</text>
      {chip(604, 176, 'fingerprint', true)}
      {chip(604, 206, 'ultrasonic', true)}
      {chip(604, 236, 'pressure', true)}
      <text x={714} y={166} fontFamily={MONO} fontSize="9.5" letterSpacing="1" fill={TB}>ACTUATORS</text>
      {chip(714, 176, 'motors', true)}
      {chip(714, 206, 'LEDs', true)}
      {chip(714, 236, 'lid', true)}
    </svg>
  )
}
