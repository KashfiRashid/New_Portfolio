/**
 * PlannedClassDiagram - the class hierarchy from the written proposal, before
 * any code existed. An abstract base (proposal name: Ingots) with a family of
 * subclasses. Bronze nodes shipped; dashed, dimmed nodes were scoped out. This
 * is the design I drew on paper, annotated with what actually made the build.
 * Inline SVG, bronze register, ASCII only.
 */
const SANS = '"DM Sans", system-ui, sans-serif'
const MONO = '"DM Mono", ui-monospace, monospace'
const EM = '#C8A24B'
const EM_BRIGHT = '#E5C877'
const DIM = '#6b6048'

const ROOT = { x: 300, y: 14, w: 220, h: 72, cx: 410 }
const BUS_Y = 120

const CHILDREN = [
  { cx: 80, title: 'Metals', sub: 'Iron, Copper, Silver', kept: 'Copper' },
  { cx: 244, title: 'Crucible', sub: 'holds molten metal', kept: true },
  { cx: 410, title: 'Molds', sub: 'cast the blade', kept: true },
  { cx: 576, title: 'Hammer', sub: 'shape the metal', kept: true },
  { cx: 740, title: 'Fittings', sub: 'Handle, Pommel', kept: 'Emblem + Grip' },
]
const CW = 140
const CY = 132
const CH = 64

const MOLDS = [
  { cx: 300, title: 'SwordCast', kept: true },
  { cx: 410, title: 'MaceCast', kept: false },
  { cx: 520, title: 'ShieldCast', kept: false },
]
const MW = 100
const MY = 300
const MH = 50

export default function PlannedClassDiagram() {
  return (
    <svg
      viewBox="0 0 820 376"
      className="mx-auto w-full max-w-[720px]"
      role="img"
      aria-label="Planned class hierarchy from the proposal: an abstract base with subclasses for metals, crucible, molds, hammer, and fittings. Molds branch into SwordCast (shipped), MaceCast and ShieldCast (cut). Solid bronze nodes shipped; dashed nodes were scoped out."
    >
      <defs>
        <marker id="cf-pc-ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={EM} />
        </marker>
      </defs>

      {/* root - abstract base */}
      <rect x={ROOT.x} y={ROOT.y} width={ROOT.w} height={ROOT.h} rx="12" fill="rgba(200,162,75,0.10)" stroke={EM} strokeWidth="1.8" />
      <text x={ROOT.cx} y={ROOT.y + 26} textAnchor="middle" fontFamily={MONO} fontSize="10" letterSpacing="1" fill={EM_BRIGHT}>ABSTRACT BASE</text>
      <text x={ROOT.cx} y={ROOT.y + 46} textAnchor="middle" fontFamily={SANS} fontSize="19" fill="#fafafa">Ingots <tspan fontFamily={MONO} fontSize="11" fill="#a1a1aa">-&gt; Item</tspan></text>
      <text x={ROOT.cx} y={ROOT.y + 63} textAnchor="middle" fontFamily={MONO} fontSize="9" fill="#a1a1aa">pos, scale, img, draw, clicked, dragged</text>

      {/* bus */}
      <line x1={ROOT.cx} y1={ROOT.y + ROOT.h} x2={ROOT.cx} y2={BUS_Y - 16} stroke={EM} strokeWidth="1.6" />
      <line x1={CHILDREN[0].cx} y1={BUS_Y - 16} x2={CHILDREN[CHILDREN.length - 1].cx} y2={BUS_Y - 16} stroke={EM} strokeOpacity="0.5" strokeWidth="1.4" />

      {/* children */}
      {CHILDREN.map((c) => {
        const x = c.cx - CW / 2
        return (
          <g key={c.title}>
            <line x1={c.cx} y1={BUS_Y - 16} x2={c.cx} y2={CY} stroke={EM} strokeOpacity="0.5" strokeWidth="1.4" markerEnd="url(#cf-pc-ah)" />
            <rect x={x} y={CY} width={CW} height={CH} rx="9" fill="#1B160D" stroke={EM} strokeWidth="1.2" />
            <text x={c.cx} y={CY + 24} textAnchor="middle" fontFamily={SANS} fontSize="15" fill="#e4e4e7">{c.title}</text>
            <text x={c.cx} y={CY + 41} textAnchor="middle" fontFamily={MONO} fontSize="8.5" fill="#a1a1aa">{c.sub}</text>
            {typeof c.kept === 'string' ? (
              <text x={c.cx} y={CY + 56} textAnchor="middle" fontFamily={MONO} fontSize="8.5" fill={EM_BRIGHT}>shipped: {c.kept}</text>
            ) : null}
          </g>
        )
      })}

      {/* molds subclasses */}
      {MOLDS.map((m) => {
        const x = m.cx - MW / 2
        const stroke = m.kept ? EM : DIM
        return (
          <g key={m.title}>
            <line
              x1={CHILDREN[2].cx}
              y1={CY + CH}
              x2={m.cx}
              y2={MY}
              stroke={m.kept ? EM : DIM}
              strokeOpacity={m.kept ? 0.6 : 0.4}
              strokeWidth="1.3"
              strokeDasharray={m.kept ? '0' : '4 3'}
            />
            <rect x={x} y={MY} width={MW} height={MH} rx="8" fill="#15120B" stroke={stroke} strokeWidth="1.1" strokeDasharray={m.kept ? '0' : '4 3'} />
            <text x={m.cx} y={MY + 24} textAnchor="middle" fontFamily={SANS} fontSize="13.5" fill={m.kept ? '#e4e4e7' : DIM}>{m.title}</text>
            <text x={m.cx} y={MY + 40} textAnchor="middle" fontFamily={MONO} fontSize="8.5" letterSpacing="0.5" fill={m.kept ? EM_BRIGHT : DIM}>
              {m.kept ? 'shipped' : 'cut from scope'}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
