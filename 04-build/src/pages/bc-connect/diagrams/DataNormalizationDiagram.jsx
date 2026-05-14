/**
 * DataNormalizationDiagram — two schemas in, one queryable surface out.
 *
 * Engineering-diagram register. Two municipal input schemas on the left
 * (Vancouver, Surrey) with their raw field names, flowing through
 * signal-green "normalize" arrows into the unified BC Connect schema on
 * the right.
 *
 * Pure inline SVG. Tailwind intent translated to SVG:
 *   zinc-700 #3f3f46 (input box stroke) · zinc-500 #71717a (merge stroke,
 *   arrow labels) · zinc-400 #a1a1aa (raw field labels) · zinc-200
 *   #e4e4e7 (normalized field labels) · signal #1B6B4F (arrows, merge
 *   header).
 */

const INPUTS = [
  {
    header: 'VANCOUVER STARTUP DB',
    fields: ['company_name', 'founded', 'industry_type', 'address'],
  },
  {
    header: 'SURREY CHAMBER',
    fields: ['org_title', 'est_year', 'naics_code', 'location'],
  },
]

const UNIFIED_FIELDS = ['name', 'foundedYear', 'industry', 'coordinates']

const MONO = '"DM Mono", ui-monospace, monospace'
const SANS = '"DM Sans", system-ui, sans-serif'

export default function DataNormalizationDiagram() {
  return (
    <svg
      viewBox="0 0 800 320"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="datanorm-title datanorm-desc"
      className="mx-auto block h-auto w-full max-w-[720px]"
      shapeRendering="geometricPrecision"
    >
      <title id="datanorm-title">Data normalization pipeline</title>
      <desc id="datanorm-desc">
        Two municipal schemas, Vancouver Startup DB and Surrey Chamber,
        each with four raw fields, normalize into one unified BC Connect
        schema with name, foundedYear, industry, and coordinates.
      </desc>

      {/* Input boxes (left) */}
      {INPUTS.map((input, i) => {
        const y = i === 0 ? 24 : 172
        return (
          <g key={input.header}>
            <rect
              x="24"
              y={y}
              width="240"
              height="124"
              rx="6"
              fill="none"
              stroke="#3f3f46"
              strokeWidth="1"
            />
            <text
              x="44"
              y={y + 28}
              fill="#e4e4e7"
              fontFamily={MONO}
              fontSize="11"
              letterSpacing="1.4"
            >
              {input.header}
            </text>
            <line
              x1="44"
              y1={y + 38}
              x2="244"
              y2={y + 38}
              stroke="#27272a"
              strokeWidth="1"
            />
            {input.fields.map((field, fi) => (
              <text
                key={field}
                x="44"
                y={y + 58 + fi * 17}
                fill="#a1a1aa"
                fontFamily={SANS}
                fontSize="13"
              >
                {field}
              </text>
            ))}
          </g>
        )
      })}

      {/* Merge node (right) */}
      <rect
        x="536"
        y="90"
        width="240"
        height="140"
        rx="6"
        fill="none"
        stroke="#71717a"
        strokeWidth="1.5"
      />
      <text
        x="556"
        y="118"
        fill="#1B6B4F"
        fontFamily={MONO}
        fontSize="11"
        letterSpacing="1.4"
      >
        BC CONNECT UNIFIED
      </text>
      <line x1="556" y1="128" x2="756" y2="128" stroke="#27272a" strokeWidth="1" />
      {UNIFIED_FIELDS.map((field, fi) => (
        <text
          key={field}
          x="556"
          y={fi === 0 ? 150 : 150 + fi * 19}
          fill="#e4e4e7"
          fontFamily={SANS}
          fontSize="13"
        >
          {field}
        </text>
      ))}

      {/* Normalize arrows */}
      <g stroke="#1B6B4F" strokeWidth="2" fill="none">
        <path d="M 264 86 L 536 140" />
        <path d="M 536 140 l -8 -1 m 8 1 l -6 5" />
        <path d="M 264 234 L 536 180" />
        <path d="M 536 180 l -8 1 m 8 -1 l -6 -5" />
      </g>
      <text
        x="372"
        y="104"
        fill="#71717a"
        fontFamily={MONO}
        fontSize="9"
        letterSpacing="1.2"
      >
        NORMALIZE
      </text>
      <text
        x="372"
        y="222"
        fill="#71717a"
        fontFamily={MONO}
        fontSize="9"
        letterSpacing="1.2"
      >
        NORMALIZE
      </text>
    </svg>
  )
}
