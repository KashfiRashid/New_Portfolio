/**
 * ArchitectureDiagram - hub and spoke. SmelterPanel sits at the centre as the
 * state machine + paint loop + input router; every package hangs off it. The
 * connectors run border-to-border (computed against each box edge) so no line
 * ever crosses a label, and arrowheads point from the hub into each package.
 * Inline SVG, bronze register, ASCII only.
 */
const SANS = '"DM Sans", system-ui, sans-serif'
const MONO = '"DM Mono", ui-monospace, monospace'
const EM = '#C8A24B'
const EM_BRIGHT = '#E5C877'

const HUB = { x: 308, y: 218, w: 204, h: 84 }

const NODES = [
  { x: 36, y: 40, w: 176, h: 62, title: 'SmeltingRoom', sub: 'Smelter, Crucible, Bellows, Steam', note: 'extend abstract Item' },
  { x: 608, y: 40, w: 176, h: 62, title: 'HammerRoom', sub: 'Hammer, HammerBar, Effects' },
  { x: 12, y: 229, w: 168, h: 62, title: 'Factory', sub: 'Abstract + Concrete' },
  { x: 640, y: 229, w: 168, h: 62, title: 'Decorators', sub: 'RoomDecorator chain' },
  { x: 36, y: 418, w: 176, h: 62, title: 'Screens', sub: 'intro / instruction / outro' },
  { x: 608, y: 418, w: 176, h: 62, title: 'util', sub: 'ImageLoader, Minim, Util' },
  { x: 322, y: 426, w: 176, h: 58, title: 'Setup / Text', sub: 'live instruction HUD' },
]

const cx = (r) => r.x + r.w / 2
const cy = (r) => r.y + r.h / 2

// Point on rect border along the ray from the rect centre toward (px, py).
function edge(r, px, py) {
  const mx = cx(r)
  const my = cy(r)
  let dx = px - mx
  let dy = py - my
  if (dx === 0 && dy === 0) return { x: mx, y: my }
  const sx = dx !== 0 ? (r.w / 2) / Math.abs(dx) : Infinity
  const sy = dy !== 0 ? (r.h / 2) / Math.abs(dy) : Infinity
  const s = Math.min(sx, sy)
  return { x: mx + dx * s, y: my + dy * s }
}

export default function ArchitectureDiagram() {
  const hubM = { x: cx(HUB), y: cy(HUB) }
  return (
    <svg
      viewBox="0 0 820 520"
      className="mx-auto w-full max-w-[720px]"
      role="img"
      aria-label="Architecture. SmelterPanel is the central state machine and paint loop. Around it: SmeltingRoom (items extend an abstract Item), HammerRoom, Factory, Decorators, Screens, util, and the Setup text HUD."
    >
      <defs>
        <marker id="cf-arch-ah" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={EM} />
        </marker>
        <radialGradient id="cf-arch-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor={EM} stopOpacity="0.16" />
          <stop offset="1" stopColor={EM} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft glow behind the hub */}
      <ellipse cx={hubM.x} cy={hubM.y} rx="220" ry="150" fill="url(#cf-arch-glow)" />

      {/* connectors: hub edge -> node edge, arrow into the node */}
      {NODES.map((n) => {
        const a = edge(HUB, cx(n), cy(n))
        const b = edge(n, hubM.x, hubM.y)
        return (
          <line
            key={`l-${n.title}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={EM}
            strokeOpacity="0.55"
            strokeWidth="1.5"
            markerEnd="url(#cf-arch-ah)"
          />
        )
      })}

      {/* satellite packages */}
      {NODES.map((n) => (
        <g key={n.title}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="11" fill="#1B160D" stroke="#4a4129" strokeWidth="1" />
          <rect x={n.x} y={n.y} width="3.5" height={n.h} rx="2" fill={EM} fillOpacity="0.6" />
          <text x={n.x + 16} y={n.y + 26} fontFamily={SANS} fontSize="15.5" fill="#e9e7e1">{n.title}</text>
          <text x={n.x + 16} y={n.y + 45} fontFamily={MONO} fontSize="9.5" fill="#a8a297">{n.sub}</text>
          {n.note ? (
            <text x={n.x + 2} y={n.y - 9} fontFamily={MONO} fontSize="9" letterSpacing="0.4" fill={EM_BRIGHT}>{n.note}</text>
          ) : null}
        </g>
      ))}

      {/* hub - opaque so no connector shows through the label */}
      <rect x={HUB.x} y={HUB.y} width={HUB.w} height={HUB.h} rx="14" fill="#241B0E" stroke={EM} strokeWidth="2" />
      <rect x={HUB.x} y={HUB.y} width={HUB.w} height={HUB.h} rx="14" fill="none" stroke={EM} strokeOpacity="0.25" strokeWidth="6" />
      <text x={hubM.x} y={HUB.y + 33} textAnchor="middle" fontFamily={SANS} fontSize="21" fill="#fafafa">SmelterPanel</text>
      <text x={hubM.x} y={HUB.y + 54} textAnchor="middle" fontFamily={MONO} fontSize="10.5" fill={EM_BRIGHT}>state machine + paint + input</text>
      <text x={hubM.x} y={HUB.y + 71} textAnchor="middle" fontFamily={MONO} fontSize="9.5" fill="#a8a297">1,327 lines, ~14 states</text>
    </svg>
  )
}
// end ArchitectureDiagram.jsx
