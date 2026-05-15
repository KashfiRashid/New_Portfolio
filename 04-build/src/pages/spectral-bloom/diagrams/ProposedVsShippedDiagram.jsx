/**
 * ProposedVsShippedDiagram — the scope decision, drawn.
 *
 * Two pipelines side by side. Left: what the proposal called for, a
 * learned cross-modal diffusion stack on a GPU backend, rendered in cool
 * blue and dimmed because it never shipped. Right: what actually shipped,
 * a single-file browser system with Claude as the semantic layer,
 * rendered in magenta at full strength.
 *
 * Same first box, same last intent. The middle is where the six-week
 * judgment call lives.
 *
 * Pure inline SVG. Mono labels, sans sub-labels.
 */

const MONO = '"DM Mono", ui-monospace, monospace'
const SANS = '"DM Sans", system-ui, sans-serif'

const PROPOSED = [
  { label: 'AUDIO IN', sub: 'Live or uploaded' },
  { label: 'WAV2CLIP ENCODER', sub: '3-second windows' },
  { label: 'CLIP EMBEDDING SPACE', sub: '512-dimensional vectors' },
  { label: 'SDXL TURBO', sub: 'Cross-attention injection' },
  { label: 'WEBSOCKET BRIDGE', sub: 'Colab T4 GPU backend' },
]

const SHIPPED = [
  { label: 'AUDIO IN', sub: 'Live mic or audio file' },
  { label: 'WEB AUDIO API', sub: '2048-point FFT' },
  { label: 'CLAUDE API', sub: 'Synesthesia prompt' },
  { label: 'CREATIVE JSON', sub: 'Palette, mood, spread, speed' },
  { label: 'LERP APPLY', sub: '12,000-particle scene' },
]

const BOX_W = 280
const BOX_H = 54
const GAP = 30
const TOP = 64
const L_X = 70
const R_X = 450

function Column({ x, items, accent, dim, heading, headingSub }) {
  return (
    <g opacity={dim ? 0.55 : 1}>
      <text
        x={x}
        y={34}
        fill={accent}
        fontFamily={MONO}
        fontSize="13"
        letterSpacing="2"
        fontWeight="700"
      >
        {heading}
      </text>
      <text x={x} y={50} fill="#71717a" fontFamily={SANS} fontSize="11">
        {headingSub}
      </text>
      {items.map((item, i) => {
        const y = TOP + i * (BOX_H + GAP)
        return (
          <g key={item.label}>
            <rect
              x={x}
              y={y}
              width={BOX_W}
              height={BOX_H}
              rx="6"
              fill={dim ? 'none' : `${accent}0D`}
              stroke={dim ? '#3f3f46' : accent}
              strokeWidth="1"
              strokeDasharray={dim ? '4 3' : '0'}
            />
            <text x={x + 16} y={y + 23} fill={dim ? '#a1a1aa' : accent} fontFamily={MONO} fontSize="11" letterSpacing="1.4">
              {item.label}
            </text>
            <text x={x + 16} y={y + 41} fill="#d4d4d8" fontFamily={SANS} fontSize="12">
              {item.sub}
            </text>
            {i < items.length - 1 ? (
              <g stroke={dim ? '#52525b' : accent} strokeWidth="1.5" fill="none">
                <line x1={x + BOX_W / 2} y1={y + BOX_H + 3} x2={x + BOX_W / 2} y2={y + BOX_H + GAP - 5} />
                <path d={`M ${x + BOX_W / 2} ${y + BOX_H + GAP - 5} l -4 -5 m 4 5 l 4 -5`} />
              </g>
            ) : null}
          </g>
        )
      })}
    </g>
  )
}

export default function ProposedVsShippedDiagram() {
  return (
    <svg
      viewBox="0 0 800 500"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="pivot-title pivot-desc"
      className="mx-auto block h-auto w-full max-w-[760px]"
      shapeRendering="geometricPrecision"
    >
      <title id="pivot-title">Proposed pipeline versus shipped pipeline</title>
      <desc id="pivot-desc">
        Two five-stage pipelines side by side. The proposed pipeline used
        Wav2CLIP, CLIP embeddings, and SDXL Turbo on a Colab GPU backend.
        The shipped pipeline used the Web Audio API and the Claude API
        entirely in the browser. Both start from audio and both end in
        the same generative scene.
      </desc>

      <Column
        x={L_X}
        items={PROPOSED}
        accent="#4F8BFF"
        dim
        heading="PROPOSED"
        headingSub="Learned cross-modal diffusion"
      />
      <Column
        x={R_X}
        items={SHIPPED}
        accent="#FF3D6E"
        dim={false}
        heading="SHIPPED"
        headingSub="Browser-native semantic layer"
      />

      <text
        x="400"
        y="488"
        fill="#71717a"
        fontFamily={SANS}
        fontSize="12.5"
        textAnchor="middle"
      >
        Same thesis: visuals that read meaning, not loudness. A leaner spine, shipped in six weeks.
      </text>
    </svg>
  )
}
