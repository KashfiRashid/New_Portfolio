/**
 * ThreeActStructure — the narrative spine that drove the project.
 *
 * Three horizontal columns. Act I (The Routine), Act II (The Descent),
 * Act III (The Breach). Each column carries its design intent and the
 * scale the player is at. The arc of intensity reads left to right.
 *
 * Pure inline SVG. Emergency-red accent for the spine.
 */

const MONO = '"JetBrains Mono", "Geist Mono", ui-monospace, monospace'
const SANS = 'Inter, "Söhne", system-ui, sans-serif'

const ACTS = [
  {
    n: 'I',
    name: 'THE ROUTINE',
    scale: 'Scale 1:1 → 1:100',
    intent: 'Calm tutorial. Jack fixes a fusebox under the captain\'s friendly radio cover. The ship feels broken but stable.',
  },
  {
    n: 'II',
    name: 'THE DESCENT',
    scale: 'Scale 1:1, flashlight on',
    intent: 'Power dies. The captain\'s radio cuts. Jack finds the captain\'s cracked helmet. Environment guides the player. The ship is more wrong than it looked.',
  },
  {
    n: 'III',
    name: 'THE BREACH',
    scale: 'Scale 1:1000 → escape',
    intent: 'Jack restores power inside the chip-space. Alarms. Banging on the door. Escape pod. The growl that ends the story.',
  },
]

const COL_W = 230
const GAP = 24
const X0 = 30
const TOP = 60

export default function ThreeActStructure() {
  return (
    <svg
      viewBox="0 0 800 320"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="acts-title acts-desc"
      className="mx-auto block h-auto w-full max-w-[760px]"
      shapeRendering="geometricPrecision"
    >
      <title id="acts-title">Three-act narrative structure</title>
      <desc id="acts-desc">
        Three columns reading left to right. Act I, the routine. Act II,
        the descent. Act III, the breach. Each column carries the act
        title, the scale Jack is at, and the design intent of that act.
      </desc>

      {/* Intensity arc — a hairline that rises from left to right */}
      <line x1={X0} y1="44" x2={X0 + 3 * COL_W + 2 * GAP} y2="44" stroke="#27272a" strokeWidth="1" strokeDasharray="3 4" />
      <text x={X0} y="34" fill="#71717a" fontFamily={MONO} fontSize="10" letterSpacing="1.4">
        TENSION →
      </text>

      {ACTS.map((act, i) => {
        const x = X0 + i * (COL_W + GAP)
        const accent = i === 2 ? '#6E3FB3' : i === 1 ? '#9268E0' : '#9CA3AF'
        return (
          <g key={act.n}>
            {/* Act number in display serif */}
            <text x={x + 18} y={TOP + 22} fill={accent} fontFamily={SANS} fontSize="28" fontWeight="300" fontStyle="italic">
              {act.n}
            </text>
            <text x={x + 18} y={TOP + 46} fill={accent} fontFamily={MONO} fontSize="11" letterSpacing="1.6" fontWeight="700">
              {act.name}
            </text>

            {/* Sub-line — scale */}
            <text x={x + 18} y={TOP + 70} fill="#a1a1aa" fontFamily={MONO} fontSize="10" letterSpacing="0.8">
              {act.scale}
            </text>

            {/* Body */}
            <foreignObject x={x + 18} y={TOP + 88} width={COL_W - 36} height={170}>
              <p xmlns="http://www.w3.org/1999/xhtml" style={{
                margin: 0,
                fontFamily: SANS,
                fontSize: '12px',
                lineHeight: 1.5,
                color: '#d4d4d8',
              }}>
                {act.intent}
              </p>
            </foreignObject>

            {/* Column rule */}
            <line x1={x} y1={TOP + 4} x2={x} y2={TOP + 240} stroke={accent} strokeWidth="1.5" opacity="0.6" />
          </g>
        )
      })}

      <text x="400" y="310" fill="#71717a" fontFamily={SANS} fontSize="12" textAnchor="middle">
        The spine I drafted before any Unity work began. It drove where the fuseboxes and vents had to live.
      </text>
    </svg>
  )
}
