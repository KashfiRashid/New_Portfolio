/**
 * AudioPipelineDiagram — one FFT pass, six features, six jobs.
 *
 * The Web Audio API runs a 2048-point FFT every frame. From that single
 * pass the engine pulls six features, and each feature drives a specific
 * part of the visual. This diagram is the map between them.
 *
 * A distribution bus fans the FFT output to six feature columns. Pure
 * inline SVG, magenta accent.
 */

const MONO = '"DM Mono", ui-monospace, monospace'
const SANS = '"DM Sans", system-ui, sans-serif'

const FEATURES = [
  { label: 'BASS', range: 'Sub-250 Hz', drives: ['Particle expansion', '& orb scale'] },
  { label: 'MID', range: '250 Hz to 4 kHz', drives: ['Ring opacity', '& rotation'] },
  { label: 'HIGH', range: '4 kHz and up', drives: ['Color temperature', '& camera height'] },
  { label: 'LOUDNESS', range: 'Overall level', drives: ['Camera zoom', '& overall opacity'] },
  { label: 'BRIGHTNESS', range: 'Bright vs. dark', drives: ['Hue shift across', 'all particles'] },
  { label: 'BEAT', range: 'The pulse', drives: ['Running average', 'of recent energy'] },
]

const BOX_W = 118
const STEP = 132
const X0 = 11
const BOX_Y = 96
const BOX_H = 150
const BUS_Y = 78

export default function AudioPipelineDiagram() {
  const centers = FEATURES.map((_, i) => X0 + i * STEP + BOX_W / 2)
  return (
    <svg
      viewBox="0 0 800 270"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="audio-title audio-desc"
      className="mx-auto block h-auto w-full max-w-[760px]"
      shapeRendering="geometricPrecision"
    >
      <title id="audio-title">Audio feature extraction map</title>
      <desc id="audio-desc">
        A single sweep of frequency analysis distributes to six feature
        columns: bass, mid, high, loudness, brightness, and beat. Each
        column lists the part of the visual it drives.
      </desc>

      {/* FFT source box */}
      <rect x="280" y="14" width="240" height="44" rx="6" fill="#FF3D6E14" stroke="#FF3D6E" strokeWidth="1" />
      <text x="400" y="33" fill="#FF3D6E" fontFamily={MONO} fontSize="11" letterSpacing="1.4" textAnchor="middle">
        FREQUENCY ANALYSIS
      </text>
      <text x="400" y="49" fill="#d4d4d8" fontFamily={SANS} fontSize="12" textAnchor="middle">
        2,048 bands, every frame
      </text>

      {/* distribution bus */}
      <g stroke="#FF3D6E" strokeWidth="1.5" fill="none">
        <line x1="400" y1="58" x2="400" y2={BUS_Y} />
        <line x1={centers[0]} y1={BUS_Y} x2={centers[centers.length - 1]} y2={BUS_Y} />
        {centers.map((cx) => (
          <g key={cx}>
            <line x1={cx} y1={BUS_Y} x2={cx} y2={BOX_Y - 6} />
            <path d={`M ${cx} ${BOX_Y - 6} l -4 -5 m 4 5 l 4 -5`} />
          </g>
        ))}
      </g>

      {/* feature columns */}
      {FEATURES.map((f, i) => {
        const x = X0 + i * STEP
        return (
          <g key={f.label}>
            <rect x={x} y={BOX_Y} width={BOX_W} height={BOX_H} rx="6" fill="#ffffff05" stroke="#3f3f46" strokeWidth="1" />
            <text x={x + BOX_W / 2} y={BOX_Y + 26} fill="#FF7DA3" fontFamily={MONO} fontSize="12" letterSpacing="1.2" textAnchor="middle">
              {f.label}
            </text>
            <text x={x + BOX_W / 2} y={BOX_Y + 46} fill="#a1a1aa" fontFamily={SANS} fontSize="10.5" textAnchor="middle">
              {f.range}
            </text>
            <line x1={x + 18} y1={BOX_Y + 62} x2={x + BOX_W - 18} y2={BOX_Y + 62} stroke="#27272a" strokeWidth="1" />
            <text x={x + BOX_W / 2} y={BOX_Y + 82} fill="#52525b" fontFamily={MONO} fontSize="8.5" letterSpacing="1" textAnchor="middle">
              DRIVES
            </text>
            <text x={x + BOX_W / 2} y={BOX_Y + 104} fill="#d4d4d8" fontFamily={SANS} fontSize="11" textAnchor="middle">
              {f.drives[0]}
            </text>
            <text x={x + BOX_W / 2} y={BOX_Y + 120} fill="#d4d4d8" fontFamily={SANS} fontSize="11" textAnchor="middle">
              {f.drives[1]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
