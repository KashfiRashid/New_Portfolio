/**
 * PipelineDiagram - horizontal flow with accurate ownership. A sign moves
 * left to right: Vision (camera + the recognition model, both Kashfi's - the
 * Signify model, refined by Rownak) -> Backend (Faaiz) -> Frontend (Kashfi)
 * -> ESP32 rig (Riyan). Signify, the origin model, feeds the vision block
 * from above. A clean solid loop carries the confirmation back to the user.
 *
 * BC-Connect register: inline SVG, viewBox 820, emerald #10B981, zinc, DM
 * Sans / DM Mono. Short labels, owner chips, no dashes. Kashfi's blocks
 * carry the emerald stroke.
 */
const SANS = '"DM Sans", system-ui, sans-serif'
const MONO = '"DM Mono", ui-monospace, monospace'
const EM = '#10B981'
const EM_BRIGHT = '#6EE7B7'

const NY = 150
const NH = 96
const NW = 176
const NX = [16, 220, 424, 628]

const NODES = [
  { title: 'Vision', sub: 'camera + recognition', who: 'KASHFI / ROWNAK refined', mine: true },
  { title: 'Backend', sub: 'Flask + Gemini', who: 'FAAIZ' },
  { title: 'Frontend', sub: 'order builds live', who: 'KASHFI (ME)', mine: true },
  { title: 'ESP32 rig', sub: 'light, sound, screen', who: 'RIYAN' },
]

export default function PipelineDiagram() {
  const visCx = NX[0] + NW / 2
  return (
    <svg viewBox="0 0 820 412" className="mx-auto w-full max-w-[720px]" role="img"
      aria-label="Pipeline. Signify, the origin recognition model by Kashfi and Hasrat, feeds the vision block (camera plus model, Kashfi, refined by Rownak), then backend (Faaiz), frontend (Kashfi), and the ESP32 rig (Riyan), with a confirmation loop back to the user.">
      <defs>
        <marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={EM} />
        </marker>
      </defs>

      {/* origin: Signify, above the vision block */}
      <rect x="16" y="14" width="248" height="80" rx="10" fill="rgba(16,185,129,0.06)" stroke={EM} strokeWidth="1.3" />
      <text x="36" y="42" fontFamily={SANS} fontSize="17" fill="#e4e4e7">Signify <tspan fontFamily={MONO} fontSize="11" fill="#a1a1aa">/ 2024</tspan></text>
      <text x="36" y="63" fontFamily={MONO} fontSize="10.5" fill="#a1a1aa">my origin recognition model</text>
      <text x="36" y="82" fontFamily={MONO} fontSize="10" letterSpacing="0.6" fill={EM_BRIGHT}>KASHFI + HASRAT</text>
      <line x1={visCx} y1="94" x2={visCx} y2={NY - 2} stroke={EM} strokeWidth="2" markerEnd="url(#ah)" />

      {/* runtime nodes */}
      {NODES.map((n, i) => (
        <g key={n.title}>
          {i < NODES.length - 1 ? (
            <line x1={NX[i] + NW + 2} y1={NY + NH / 2} x2={NX[i + 1] - 2} y2={NY + NH / 2} stroke={EM} strokeWidth="2" markerEnd="url(#ah)" />
          ) : null}
          <rect x={NX[i]} y={NY} width={NW} height={NH} rx="10" fill="#15171C" stroke={n.mine ? EM : '#3f3f46'} strokeWidth={n.mine ? 1.6 : 1} />
          <text x={NX[i] + 18} y={NY + 36} fontFamily={SANS} fontSize="19" fill="#e4e4e7">{n.title}</text>
          <text x={NX[i] + 18} y={NY + 60} fontFamily={MONO} fontSize="11" fill="#a1a1aa">{n.sub}</text>
          <text x={NX[i] + 18} y={NY + 82} fontFamily={MONO} fontSize="9.5" letterSpacing="0.4" fill={n.mine ? EM_BRIGHT : '#71717a'}>{n.who}</text>
        </g>
      ))}

      {/* solid return loop: ESP32 -> back -> vision */}
      <path d={`M ${NX[3] + NW / 2} ${NY + NH} V 350 H ${NX[0] + NW / 2} V ${NY + NH}`} fill="none" stroke={EM} strokeWidth="1.6" markerEnd="url(#ah)" />
      <rect x="290" y="334" width="240" height="32" rx="16" fill="#0B120F" stroke={EM} strokeWidth="1" />
      <text x="410" y="355" textAnchor="middle" fontFamily={MONO} fontSize="11" letterSpacing="1" fill={EM_BRIGHT}>CONFIRMED: SEE / HEAR / READ</text>
    </svg>
  )
}
