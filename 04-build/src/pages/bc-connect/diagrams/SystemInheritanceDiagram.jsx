/**
 * SystemInheritanceDiagram — each layer constrained by the one above.
 *
 * Engineering-diagram register. Four tiers stacked top to bottom: laws
 * constrain tokens, tokens constrain components, components constrain
 * product surfaces. Signal-green downward arrows between tiers carry the
 * "constrains" relationship.
 *
 * Tiers are rendered same-width (the brief's allowed alternative to the
 * pyramid) because the top tier's sub-label is the longest line; a
 * narrowing pyramid would clip it.
 *
 * Pure inline SVG. Tailwind intent translated to SVG:
 *   zinc-700 #3f3f46 (tier stroke) · zinc-500 #71717a (arrow labels)
 *   zinc-300 #d4d4d8 (sub-labels) · signal #1B6B4F (tier labels, arrows).
 */

const TIERS = [
  {
    label: 'OPEN GROUND LAWS',
    sub: "Earn Your Pixel · Ground Before Signal · Connect Don't Decorate",
  },
  {
    label: 'DESIGN TOKENS',
    sub: 'Color · Type · Spacing · Motion · Radius',
  },
  {
    label: 'COMPONENTS',
    sub: 'BusinessCard · FilterPills · Hero · Navbar · +12 more',
  },
  {
    label: 'PRODUCT SURFACES',
    sub: 'Landing · Directory · Detail · Auth · Dashboard · Admin',
  },
]

const TIER_X = 120
const TIER_W = 560
const TIER_H = 72
const TIER_GAP = 44
const MONO = '"DM Mono", ui-monospace, monospace'
const SANS = '"DM Sans", system-ui, sans-serif'

export default function SystemInheritanceDiagram() {
  return (
    <svg
      viewBox="0 0 800 500"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="inherit-title inherit-desc"
      className="mx-auto block h-auto w-full max-w-[720px]"
      shapeRendering="geometricPrecision"
    >
      <title id="inherit-title">Open Ground system inheritance</title>
      <desc id="inherit-desc">
        Four stacked tiers. Open Ground laws constrain the design tokens,
        the tokens constrain the components, and the components constrain
        the product surfaces.
      </desc>

      {TIERS.map((tier, i) => {
        const y = 24 + i * (TIER_H + TIER_GAP)
        return (
          <g key={tier.label}>
            <rect
              x={TIER_X}
              y={y}
              width={TIER_W}
              height={TIER_H}
              rx="6"
              fill="none"
              stroke="#3f3f46"
              strokeWidth="1"
            />
            <text
              x={TIER_X + 20}
              y={y + 30}
              fill="#1B6B4F"
              fontFamily={MONO}
              fontSize="11"
              letterSpacing="2.2"
            >
              {tier.label}
            </text>
            <text
              x={TIER_X + 20}
              y={y + 54}
              fill="#d4d4d8"
              fontFamily={SANS}
              fontSize="13"
            >
              {tier.sub}
            </text>
            {i < TIERS.length - 1 ? (
              <g>
                <g stroke="#1B6B4F" strokeWidth="2" fill="none">
                  <line x1="400" y1={y + TIER_H + 4} x2="400" y2={y + TIER_H + TIER_GAP - 6} />
                  <path
                    d={`M 400 ${y + TIER_H + TIER_GAP - 6} l -5 -6 m 5 6 l 5 -6`}
                  />
                </g>
                <text
                  x="414"
                  y={y + TIER_H + TIER_GAP / 2 + 3}
                  fill="#71717a"
                  fontFamily={MONO}
                  fontSize="8"
                  letterSpacing="1.2"
                >
                  CONSTRAINS
                </text>
              </g>
            ) : null}
          </g>
        )
      })}
    </svg>
  )
}
