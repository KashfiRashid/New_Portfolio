/**
 * UserFlowDiagram — three roles, progressive access.
 *
 * Engineering-diagram register, Abdul-quality polish. Three stacked tiers
 * read top to bottom: Visitor, Member, Admin. Each tier carries a one-line
 * descriptor of how that role works and the surfaces it unlocks as chips.
 * The "inherits +" tag on Member and Admin makes the progressive-
 * disclosure mechanic explicit: every role is the one above it, plus more.
 *
 * Between tiers, a centered signal-green connector with a bordered "gate"
 * pill marks the transition (sign up, role promotion). The gates are the
 * point: you do not get the next tier for free, you cross into it.
 *
 * Pure inline SVG. viewBox width 800 to match the other case-study
 * diagrams, capped at max-w-[640px]. Colors: zinc-700 #3f3f46 (tier and
 * chip strokes), zinc-500 #71717a (inherits tag), zinc-300 #d4d4d8
 * (descriptor), zinc-200 #e4e4e7 (chip text), signal #1B6B4F (role
 * labels, connectors, gate pills), surface #15171C (tier fill).
 */

const TIERS = [
  {
    role: 'VISITOR',
    inherits: null,
    descriptor: 'Browse the directory. Read-only, no account.',
    surfaces: ['Home', 'Directory', 'Auth gate'],
  },
  {
    role: 'MEMBER',
    inherits: 'VISITOR ACCESS +',
    descriptor: 'Save listings, submit startups, get matched.',
    surfaces: ['Saved', 'Submit startup', 'Recommendations'],
  },
  {
    role: 'ADMIN',
    inherits: 'MEMBER ACCESS +',
    descriptor: 'Moderate submissions and audit every action.',
    surfaces: ['Moderation queue', 'Approve / reject', 'Audit log'],
  },
]

const TRANSITIONS = [
  { label: 'SIGN UP', width: 84 },
  { label: 'ROLE PROMOTION', width: 146 },
]

const TIER_Y = [20, 214, 408]
const TIER_X = 80
const TIER_W = 640
const TIER_H = 130
const CHIP_X = [108, 312, 516]
const CHIP_W = 188
const CHIP_H = 30
const MONO = '"DM Mono", ui-monospace, monospace'
const SANS = '"DM Sans", system-ui, sans-serif'

export default function UserFlowDiagram() {
  return (
    <svg
      viewBox="0 0 800 560"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="userflow-title userflow-desc"
      className="mx-auto block h-auto w-full max-w-[640px]"
      shapeRendering="geometricPrecision"
    >
      <title id="userflow-title">BC Connect roles and progressive access</title>
      <desc id="userflow-desc">
        Three stacked tiers. A Visitor browses the read-only directory.
        Signing up crosses into the Member tier, which inherits Visitor
        access and adds saved listings, submissions, and recommendations.
        Role promotion crosses into the Admin tier, which inherits Member
        access and adds the moderation queue, approvals, and the audit log.
      </desc>

      {/* Connectors and transition gates, drawn first so tiers sit on top */}
      {TRANSITIONS.map((transition, i) => {
        const lineTop = TIER_Y[i] + TIER_H + 4
        const lineBottom = TIER_Y[i + 1] - 6
        const midY = (lineTop + lineBottom) / 2
        return (
          <g key={transition.label}>
            <g stroke="#1B6B4F" strokeWidth="2" fill="none">
              <line x1="400" y1={lineTop} x2="400" y2={lineBottom} />
              <path d={`M 400 ${lineBottom} l -5 -7 m 5 7 l 5 -7`} />
            </g>
            <rect
              x={400 - transition.width / 2}
              y={midY - 13}
              width={transition.width}
              height="26"
              rx="13"
              fill="#0F1216"
              stroke="#1B6B4F"
              strokeWidth="1"
            />
            <text
              x="400"
              y={midY + 4}
              textAnchor="middle"
              fill="#1B6B4F"
              fontFamily={MONO}
              fontSize="9"
              letterSpacing="1.5"
            >
              {transition.label}
            </text>
          </g>
        )
      })}

      {/* Role tiers */}
      {TIERS.map((tier, i) => {
        const ty = TIER_Y[i]
        return (
          <g key={tier.role}>
            <rect
              x={TIER_X}
              y={ty}
              width={TIER_W}
              height={TIER_H}
              rx="10"
              fill="#15171C"
              stroke="#3f3f46"
              strokeWidth="1"
            />
            <text
              x="108"
              y={ty + 40}
              fill="#1B6B4F"
              fontFamily={MONO}
              fontSize="14"
              letterSpacing="2.5"
            >
              {tier.role}
            </text>
            {tier.inherits ? (
              <text
                x="692"
                y={ty + 40}
                textAnchor="end"
                fill="#71717a"
                fontFamily={MONO}
                fontSize="9"
                letterSpacing="1.5"
              >
                {tier.inherits}
              </text>
            ) : null}
            <text
              x="108"
              y={ty + 66}
              fill="#d4d4d8"
              fontFamily={SANS}
              fontSize="13"
            >
              {tier.descriptor}
            </text>
            {tier.surfaces.map((surface, si) => (
              <g key={surface}>
                <rect
                  x={CHIP_X[si]}
                  y={ty + 86}
                  width={CHIP_W}
                  height={CHIP_H}
                  rx="15"
                  fill="none"
                  stroke="#3f3f46"
                  strokeWidth="1"
                />
                <text
                  x={CHIP_X[si] + CHIP_W / 2}
                  y={ty + 86 + 20}
                  textAnchor="middle"
                  fill="#e4e4e7"
                  fontFamily={SANS}
                  fontSize="11"
                >
                  {surface}
                </text>
              </g>
            ))}
          </g>
        )
      })}
    </svg>
  )
}
