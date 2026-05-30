/**
 * SerialProtocol - the real command exchange over USB serial (from server.js
 * + connectarduino.ino). A clean sequence: two endpoints, commands crossing.
 */
const SANS = '"DM Sans", system-ui, sans-serif'
const MONO = '"DM Mono", ui-monospace, monospace'
const T = '#14B8A6'
const TB = '#5EEAD4'

const STEPS = [
  { from: 'server', label: 'check' },
  { from: 'arduino', label: 'Found ID #' },
  { from: 'server', label: 'allowMotion' },
  { from: 'arduino', label: 'objectDetected' },
  { from: 'server', label: 'dispense + lightoff' },
]
const TOP = 64
const BOT = 168
const X0 = 196
const DX = 116

export default function SerialProtocol() {
  const railEnd = X0 + DX * (STEPS.length - 1) + 40
  return (
    <svg viewBox="0 0 820 230" className="mx-auto w-full max-w-[720px]" role="img"
      aria-label="Serial protocol sequence between server and Arduino.">
      <defs>
        <marker id="sp-a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill={T} />
        </marker>
      </defs>

      {/* endpoint chips + rails */}
      <rect x="24" y={TOP - 18} width="120" height="36" rx="8" fill="#15191B" stroke={T} strokeWidth="1.4" />
      <text x="84" y={TOP + 5} textAnchor="middle" fontFamily={MONO} fontSize="12" fill={TB}>SERVER</text>
      <rect x="24" y={BOT - 18} width="120" height="36" rx="8" fill="#15191B" stroke="#3f3f46" />
      <text x="84" y={BOT + 5} textAnchor="middle" fontFamily={MONO} fontSize="12" fill="#a1a1aa">ARDUINO</text>
      <line x1="148" y1={TOP} x2={railEnd} y2={TOP} stroke="#27272a" strokeWidth="1" />
      <line x1="148" y1={BOT} x2={railEnd} y2={BOT} stroke="#27272a" strokeWidth="1" />

      {STEPS.map((s, i) => {
        const x1 = X0 + i * DX
        const x2 = x1 + DX - 24
        const down = s.from === 'server'
        return (
          <g key={i}>
            <line x1={x1} y1={down ? TOP : BOT} x2={x2} y2={down ? BOT : TOP} stroke={T} strokeWidth="2" markerEnd="url(#sp-a)" />
            <text x={(x1 + x2) / 2} y={(TOP + BOT) / 2 + (down ? -6 : 16)} textAnchor="middle" fontFamily={MONO} fontSize="10.5" fill="#d4d4d8">{s.label}</text>
          </g>
        )
      })}
    </svg>
  )
}
