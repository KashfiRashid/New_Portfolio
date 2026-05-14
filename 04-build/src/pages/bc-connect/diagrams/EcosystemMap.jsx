/**
 * EcosystemMap — the 8-region BC startup ecosystem wheel.
 *
 * Phase 2 of the Christina-inspired rebuild (/00-brief/cursor-bcconnect-rebuild.md).
 * Renders the Background section's diagram: one central node (BC Connect) with
 * eight region nodes arranged around it, connected by spokes.
 *
 * Design laws applied (Open Ground):
 *   - Earn Your Pixel — no ornament. Every node, label, and spoke maps to a
 *     real region or a real relationship. Spatial clarity over decoration.
 *   - Connect, Don't Decorate — the spokes ARE the point: they show eight
 *     regions resolving into one directory.
 *
 * Palette (dark-canvas variant of the real Open Ground tokens):
 *   - signal        #1B6B4F   central node fill
 *   - signal-mist   #D0E8DD   connection spokes (opacity 0.4)
 *   - ink-200       #B8BCCA   region labels
 *   - ink-400       #6B7080   region sub-labels (approximate startup counts)
 *
 * Region startup counts are approximate (~ prefix) — they sum to the ~90k
 * figure the case study cites, weighted toward the Lower Mainland where the
 * real density sits. They are illustrative, not surveyed data.
 *
 * Rendering: root <svg> uses crispEdges so straight spokes stay sharp;
 * each <circle> overrides to geometricPrecision so nodes render as true
 * circles, not octagons.
 */

const CENTER = { x: 400, y: 300 }
// A true circle (single radius) so all eight regions sit at exactly equal
// angular spacing — 45 degrees apart — rather than an ellipse where the
// visual bearings would drift off 45.
const RADIUS = 200

// Eight regions, ordered clockwise from 12 o'clock. Angle is degrees from
// vertical (0 = straight up), converted to a position on the circle. The
// order and the 45-degree step are both load-bearing — do not reorder.
const REGIONS = [
  { name: 'Mainland / Southwest',    count: '~52k startups', angle: 0 },
  { name: 'Vancouver Island / Coast', count: '~14k startups', angle: 45 },
  { name: 'Thompson-Okanagan',       count: '~11k startups', angle: 90 },
  { name: 'Kootenay',                count: '~4k startups',  angle: 135 },
  { name: 'Cariboo',                 count: '~3k startups',  angle: 180 },
  { name: 'North Coast / Nechako',   count: '~2k startups',  angle: 225 },
  { name: 'Northeast',               count: '~2k startups',  angle: 270 },
  { name: 'Peace River',             count: '~2k startups',  angle: 315 },
]

function positionFor(angleDeg) {
  const rad = (angleDeg * Math.PI) / 180
  return {
    x: CENTER.x + RADIUS * Math.sin(rad),
    y: CENTER.y - RADIUS * Math.cos(rad),
  }
}

export default function EcosystemMap() {
  return (
    <svg
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="ecosystem-map-title ecosystem-map-desc"
      className="h-auto w-full"
      shapeRendering="crispEdges"
    >
      <title id="ecosystem-map-title">
        British Columbia&apos;s startup ecosystem, eight regions
      </title>
      <desc id="ecosystem-map-desc">
        Eight BC regions arranged around a central BC Connect node, each
        connected by a spoke. Region density is weighted toward the Lower
        Mainland. The diagram shows eight fragmented regions resolving into
        one shared directory.
      </desc>

      {/* ---- Spokes: drawn first so the nodes sit on top ---- */}
      <g stroke="#D0E8DD" strokeWidth="1" opacity="0.4">
        {REGIONS.map((region) => {
          const p = positionFor(region.angle)
          return (
            <line
              key={`spoke-${region.name}`}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={p.x}
              y2={p.y}
            />
          )
        })}
      </g>

      {/* ---- Region nodes + labels ---- */}
      {REGIONS.map((region) => {
        const p = positionFor(region.angle)
        // Place each label on the OUTER side of its dot, away from the
        // center, so the spoke never crosses the text. Top and side nodes
        // carry the label above the dot; the three bottom nodes (Kootenay,
        // Cariboo, North Coast / Nechako) carry it below. Name stays above
        // count in both cases.
        const isBelowCenter = Math.cos((region.angle * Math.PI) / 180) < 0
        const nameY = isBelowCenter ? p.y + 26 : p.y - 30
        const countY = isBelowCenter ? p.y + 42 : p.y - 14
        return (
          <g key={`region-${region.name}`}>
            <text
              x={p.x}
              y={nameY}
              textAnchor="middle"
              fill="#B8BCCA"
              fontFamily='"DM Mono", ui-monospace, monospace'
              fontSize="13"
            >
              {region.name}
            </text>
            <text
              x={p.x}
              y={countY}
              textAnchor="middle"
              fill="#6B7080"
              fontFamily='"DM Mono", ui-monospace, monospace'
              fontSize="11"
            >
              {region.count}
            </text>
            <circle
              cx={p.x}
              cy={p.y}
              r="6"
              fill="#0F1216"
              stroke="#B8BCCA"
              strokeWidth="1.5"
              shapeRendering="geometricPrecision"
            />
          </g>
        )
      })}

      {/* ---- Central node: BC Connect ---- */}
      <circle
        cx={CENTER.x}
        cy={CENTER.y}
        r="58"
        fill="#1B6B4F"
        shapeRendering="geometricPrecision"
      />
      <text
        x={CENTER.x}
        y={CENTER.y - 2}
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily='"Instrument Serif", Georgia, serif'
        fontSize="26"
      >
        BC Connect
      </text>
      <text
        x={CENTER.x}
        y={CENTER.y + 20}
        textAnchor="middle"
        fill="#D0E8DD"
        fontFamily='"DM Mono", ui-monospace, monospace'
        fontSize="11"
        letterSpacing="0.08em"
      >
        one directory
      </text>
    </svg>
  )
}
