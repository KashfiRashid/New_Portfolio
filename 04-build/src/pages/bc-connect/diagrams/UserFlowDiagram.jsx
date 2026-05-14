/**
 * UserFlowDiagram — three roles, three surfaces, progressive disclosure.
 *
 * Engineering-diagram register. Three horizontal lanes (Visitor, Member,
 * Admin). Each lane is the surfaces that role reaches, connected left to
 * right. Short downward arrows between the lanes carry the two role
 * transitions. No sub-label text: the box titles carry the meaning, the
 * diagram reads at a glance.
 *
 * Pure inline SVG. viewBox width 800 to match the other case-study
 * diagrams, capped at max-w-[720px] so it does not balloon. Tailwind
 * intent translated to SVG: zinc-700 #3f3f46 (box stroke), zinc-800
 * #27272a (lane dividers), zinc-200 #e4e4e7 (box titles), zinc-500
 * #71717a (transition labels), signal #1B6B4F (arrows, lane labels).
 */

const LANES = [
  { label: 'VISITOR', boxes: ['Home', 'Directory (read-only)', 'Auth gate'] },
  { label: 'MEMBER', boxes: ['Saved', 'Submit startup', 'Recommendations'] },
  { label: 'ADMIN', boxes: ['Moderation queue', 'Approve / reject', 'Audit log'] },
]

const BOX_X = [170, 385, 600]
const BOX_W = 185
const BOX_H = 44
const LANE_CENTERS = [60, 150, 240]
const MONO = '"DM Mono", ui-monospace, monospace'
const SANS = '"DM Sans", system-ui, sans-serif'

export default function UserFlowDiagram() {
  return (
    <svg
      viewBox="0 0 800 300"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="userflow-title userflow-desc"
      className="mx-auto block h-auto w-full max-w-[720px]"
      shapeRendering="geometricPrecision"
    >
      <title id="userflow-title">BC Connect user flow across three roles</title>
      <desc id="userflow-desc">
        Three lanes. The Visitor lane reaches Home, a read-only directory,
        and an auth gate. Signing up opens the Member lane: saved startups,
        submissions, recommendations. Role promotion opens the Admin lane:
        moderation queue, approve and reject, audit log.
      </desc>

      {/* Lane dividers */}
      <line x1="0" y1="105" x2="800" y2="105" stroke="#27272a" strokeWidth="1" />
      <line x1="0" y1="195" x2="800" y2="195" stroke="#27272a" strokeWidth="1" />

      {/* Role-transition arrows: short, downward, between the lanes */}
      <g stroke="#1B6B4F" strokeWidth="2" fill="none">
        <line x1="58" y1="88" x2="58" y2="118" />
        <path d="M 58 118 l -4 -6 m 4 6 l 4 -6" />
        <line x1="58" y1="178" x2="58" y2="208" />
        <path d="M 58 208 l -4 -6 m 4 6 l 4 -6" />
      </g>
      <text x="70" y="107" fill="#71717a" fontFamily={MONO} fontSize="8" letterSpacing="1">
        SIGN UP
      </text>
      <text x="70" y="197" fill="#71717a" fontFamily={MONO} fontSize="8" letterSpacing="1">
        ROLE PROMOTION
      </text>

      {LANES.map((lane, li) => {
        const cy = LANE_CENTERS[li]
        const by = cy - BOX_H / 2
        return (
          <g key={lane.label}>
            <text
              x="22"
              y={cy + 4}
              fill="#1B6B4F"
              fontFamily={MONO}
              fontSize="11"
              letterSpacing="2"
            >
              {lane.label}
            </text>
            {lane.boxes.map((title, bi) => {
              const bx = BOX_X[bi]
              return (
                <g key={title}>
                  <rect
                    x={bx}
                    y={by}
                    width={BOX_W}
                    height={BOX_H}
                    rx="6"
                    fill="none"
                    stroke="#3f3f46"
                    strokeWidth="1"
                  />
                  <text
                    x={bx + BOX_W / 2}
                    y={cy + 4}
                    textAnchor="middle"
                    fill="#e4e4e7"
                    fontFamily={SANS}
                    fontSize="12"
                  >
                    {title}
                  </text>
                  {bi < 2 ? (
                    <g stroke="#1B6B4F" strokeWidth="2" fill="none">
                      <line x1={bx + BOX_W} y1={cy} x2={BOX_X[bi + 1] - 6} y2={cy} />
                      <path d={`M ${BOX_X[bi + 1] - 6} ${cy} l -5 -4 m 5 4 l -5 4`} />
                    </g>
                  ) : null}
                </g>
              )
            })}
          </g>
        )
      })}
    </svg>
  )
}
