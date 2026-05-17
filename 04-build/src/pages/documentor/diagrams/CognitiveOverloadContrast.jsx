/**
 * CognitiveOverloadContrast — before vs. DocuMentor, side by side.
 *
 * Left, a single phone screen icon densely filled with chaotic small
 * elements. Right, the same phone shape with a single clear element
 * and a thin progress bar. The visual density gap is the argument.
 */

const MONO = '"JetBrains Mono", "Geist Mono", ui-monospace, monospace'
const SANS = 'Inter, "Söhne", system-ui, sans-serif'

// Deterministic clutter for the left screen
function clutter() {
  const out = []
  let seed = 7
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  for (let i = 0; i < 22; i++) {
    out.push({
      x: 30 + rand() * 130,
      y: 60 + rand() * 220,
      w: 30 + rand() * 100,
      h: 4 + rand() * 6,
    })
  }
  return out
}
const CLUTTER = clutter()

export default function CognitiveOverloadContrast() {
  return (
    <svg
      viewBox="0 0 800 360"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="cog-title cog-desc"
      className="mx-auto block h-auto w-full max-w-[680px]"
      shapeRendering="geometricPrecision"
    >
      <title id="cog-title">Cognitive load, before and after</title>
      <desc id="cog-desc">
        Two phone screen icons side by side. The left, labelled BEFORE,
        is crowded with overlapping content. The right, labelled
        DOCUMENTOR, shows one element and a progress bar.
      </desc>

      {/* BEFORE phone */}
      <g>
        <text x="120" y="24" fill="#71717a" fontFamily={MONO} fontSize="11" letterSpacing="1.6" textAnchor="middle">
          BEFORE
        </text>
        <text x="120" y="40" fill="#52525b" fontFamily={SANS} fontSize="10" textAnchor="middle" fontStyle="italic">
          every requirement at once
        </text>
        {/* phone frame */}
        <rect x="20" y="50" width="200" height="280" rx="20" fill="none" stroke="#3f3f46" strokeWidth="1.2" />
        {/* notch */}
        <rect x="100" y="55" width="40" height="6" rx="3" fill="#3f3f46" />
        {/* clutter */}
        <g fill="#52525b" opacity="0.7">
          {CLUTTER.map((c, i) => (
            <rect key={i} x={c.x} y={c.y} width={c.w} height={c.h} rx="1" />
          ))}
        </g>
      </g>

      {/* DOCUMENTOR phone */}
      <g>
        <text x="640" y="24" fill="#8B8FF5" fontFamily={MONO} fontSize="11" letterSpacing="1.6" textAnchor="middle" fontWeight="700">
          DOCUMENTOR
        </text>
        <text x="640" y="40" fill="#5E62E0" fontFamily={SANS} fontSize="10" textAnchor="middle" fontStyle="italic">
          one step. progress visible.
        </text>
        {/* phone frame */}
        <rect x="540" y="50" width="200" height="280" rx="20" fill="none" stroke="#5E62E0" strokeWidth="1.2" />
        <rect x="620" y="55" width="40" height="6" rx="3" fill="#5E62E0" />
        {/* progress bar */}
        <rect x="560" y="80" width="160" height="4" rx="2" fill="none" stroke="#3f3f46" strokeWidth="1" />
        <rect x="560" y="80" width="56" height="4" rx="2" fill="#5E62E0" />
        <text x="560" y="100" fill="#71717a" fontFamily={MONO} fontSize="9" letterSpacing="1">
          STEP 2 OF 7
        </text>
        {/* the one task */}
        <rect x="560" y="140" width="160" height="56" rx="6" fill="#5E62E014" stroke="#5E62E0" strokeWidth="1" />
        <text x="572" y="170" fill="#d4d4d8" fontFamily={SANS} fontSize="12">
          Upload your study permit.
        </text>
        <text x="572" y="186" fill="#71717a" fontFamily={MONO} fontSize="9" letterSpacing="1">
          ↑ TAP TO ADD FILE
        </text>
        {/* CTA */}
        <rect x="560" y="270" width="160" height="36" rx="18" fill="#5E62E0" />
        <text x="640" y="293" fill="#0F1216" fontFamily={MONO} fontSize="11" letterSpacing="1.2" textAnchor="middle" fontWeight="700">
          CONTINUE
        </text>
      </g>

      <text x="400" y="350" fill="#71717a" fontFamily={SANS} fontSize="11" textAnchor="middle" fontStyle="italic">
        Same process. Different cognitive load.
      </text>
    </svg>
  )
}
