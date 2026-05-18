/**
 * MicroStepDecomposition — one large task breaking into a sequence.
 *
 * Left: a single large block labeled "STUDY PERMIT PROCESS". A fan-out
 * to the right into six small numbered steps connected in a line,
 * each with a checkmark slot, with a thin progress bar beneath.
 */

const MONO = '"JetBrains Mono", "Geist Mono", ui-monospace, monospace'
const SANS = 'Inter, "Söhne", system-ui, sans-serif'

const STEPS = [
  'Account',
  'Permit upload',
  'Photo',
  'Address',
  'Payment',
  'Submit',
]

const STEP_W = 90
const STEP_GAP = 8
const STEP_X0 = 280
const STEP_Y = 110

export default function MicroStepDecomposition() {
  return (
    <svg
      viewBox="0 0 880 260"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="micro-title micro-desc"
      className="mx-auto block h-auto w-full max-w-[760px]"
      shapeRendering="geometricPrecision"
    >
      <title id="micro-title">One process broken into a sequence of steps</title>
      <desc id="micro-desc">
        On the left, a single large block representing a complex
        government process. On the right, six small sequential steps
        connected with a progress bar beneath them.
      </desc>

      {/* Large source block */}
      <g>
        <rect x="30" y="60" width="200" height="140" rx="8" fill="none" stroke="#3f3f46" strokeWidth="1.2" />
        <text x="130" y="92" fill="#71717a" fontFamily={MONO} fontSize="11" letterSpacing="1.6" textAnchor="middle">
          STUDY PERMIT
        </text>
        <text x="130" y="108" fill="#71717a" fontFamily={MONO} fontSize="11" letterSpacing="1.6" textAnchor="middle">
          PROCESS
        </text>
        {/* visual density inside the block */}
        <g stroke="#52525b" strokeWidth="0.8" fill="none">
          <line x1="50" y1="130" x2="210" y2="130" />
          <line x1="50" y1="140" x2="180" y2="140" />
          <line x1="50" y1="150" x2="200" y2="150" />
          <line x1="50" y1="160" x2="170" y2="160" />
          <line x1="50" y1="170" x2="190" y2="170" />
          <line x1="50" y1="180" x2="160" y2="180" />
        </g>
      </g>

      {/* Decomposition arrow */}
      <g stroke="#E8A53B" strokeWidth="1.2" fill="none" opacity="0.7">
        <line x1="232" y1="130" x2="272" y2="130" />
        <path d="M 272 130 l -6 -4 m 6 4 l -6 4" />
      </g>
      <text x="252" y="120" fill="#71717a" fontFamily={MONO} fontSize="8" letterSpacing="1" textAnchor="middle">
        DECOMPOSED
      </text>

      {/* Sequential steps */}
      {STEPS.map((label, i) => {
        const x = STEP_X0 + i * (STEP_W + STEP_GAP)
        const done = i < 2
        const active = i === 2
        const stroke = done ? '#E8A53B' : active ? '#F4C26B' : '#3f3f46'
        return (
          <g key={label}>
            <rect
              x={x}
              y={STEP_Y}
              width={STEP_W}
              height={56}
              rx="6"
              fill={done ? '#E8A53B20' : active ? '#E8A53B14' : 'none'}
              stroke={stroke}
              strokeWidth="1"
            />
            <text x={x + STEP_W / 2} y={STEP_Y + 22} fill={done ? '#F4C26B' : active ? '#F4C26B' : '#71717a'} fontFamily={MONO} fontSize="9" letterSpacing="1" textAnchor="middle" fontWeight={active ? '700' : '400'}>
              {String(i + 1).padStart(2, '0')}
            </text>
            <text x={x + STEP_W / 2} y={STEP_Y + 40} fill="#d4d4d8" fontFamily={SANS} fontSize="11" textAnchor="middle">
              {label}
            </text>
            {done ? (
              <text x={x + STEP_W - 12} y={STEP_Y + 14} fill="#E8A53B" fontFamily={MONO} fontSize="10" textAnchor="middle">
                ✓
              </text>
            ) : null}
          </g>
        )
      })}

      {/* Progress bar beneath */}
      <line x1={STEP_X0} y1={STEP_Y + 76} x2={STEP_X0 + STEPS.length * (STEP_W + STEP_GAP) - STEP_GAP} y2={STEP_Y + 76} stroke="#3f3f46" strokeWidth="2" />
      <line x1={STEP_X0} y1={STEP_Y + 76} x2={STEP_X0 + 2.5 * (STEP_W + STEP_GAP)} y2={STEP_Y + 76} stroke="#E8A53B" strokeWidth="2" />
      <text x={STEP_X0} y={STEP_Y + 92} fill="#71717a" fontFamily={MONO} fontSize="9" letterSpacing="1">
        2 OF 6 COMPLETE
      </text>

      <text x="400" y="240" fill="#71717a" fontFamily={SANS} fontSize="11" textAnchor="middle" fontStyle="italic">
        The wall becomes a sequence. The sequence shows progress.
      </text>
    </svg>
  )
}
