/**
 * SoundPipelineDiagram — two parallel sound pipelines, one diegetic
 * soundscape. Voices run through Eleven Labs then Audacity then Unity.
 * Environmental cues skip Eleven Labs and go Audacity to Unity directly.
 *
 * Pure inline SVG. Emergency-red accent.
 */

const MONO = '"JetBrains Mono", "Geist Mono", ui-monospace, monospace'
const SANS = 'Inter, "Söhne", system-ui, sans-serif'

const BOX_W = 170
const BOX_H = 60
const GAP = 36

function FlowRow({ y, label, stages, accent }) {
  return (
    <g>
      <text x="30" y={y - 12} fill="#71717a" fontFamily={MONO} fontSize="10" letterSpacing="1.8">
        {label}
      </text>
      {stages.map((stage, i) => {
        const x = 30 + i * (BOX_W + GAP)
        return (
          <g key={stage.label}>
            <rect x={x} y={y} width={BOX_W} height={BOX_H} rx="6" fill={`${accent}10`} stroke={accent} strokeWidth="1" />
            <text x={x + BOX_W / 2} y={y + 26} fill={accent} fontFamily={MONO} fontSize="11" letterSpacing="1.2" textAnchor="middle">
              {stage.label}
            </text>
            <text x={x + BOX_W / 2} y={y + 44} fill="#a1a1aa" fontFamily={SANS} fontSize="11" textAnchor="middle">
              {stage.sub}
            </text>
            {i < stages.length - 1 ? (
              <g stroke={accent} strokeWidth="1.5" fill="none">
                <line x1={x + BOX_W + 6} y1={y + BOX_H / 2} x2={x + BOX_W + GAP - 8} y2={y + BOX_H / 2} />
                <path d={`M ${x + BOX_W + GAP - 8} ${y + BOX_H / 2} l -6 -4 m 6 4 l -6 4`} />
              </g>
            ) : null}
          </g>
        )
      })}
    </g>
  )
}

export default function SoundPipelineDiagram() {
  return (
    <svg
      viewBox="0 0 800 280"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby="sound-title sound-desc"
      className="mx-auto block h-auto w-full max-w-[760px]"
      shapeRendering="geometricPrecision"
    >
      <title id="sound-title">Sound pipeline for voices and environment</title>
      <desc id="sound-desc">
        Two horizontal flows. The voice flow runs Eleven Labs into Audacity
        into Unity. The environmental cue flow runs Audacity into Unity
        directly. Both flows land in the same diegetic soundscape.
      </desc>

      <FlowRow
        y={56}
        label="CHARACTER VOICES (Captain Harry, Jack, the presence)"
        accent="#C8362A"
        stages={[
          { label: 'ELEVEN LABS', sub: 'TTS voice generation' },
          { label: 'AUDACITY', sub: 'Reverb · EQ · pitch' },
          { label: 'UNITY', sub: 'Spatialization · cues' },
        ]}
      />

      <FlowRow
        y={176}
        label="ENVIRONMENTAL CUES (footsteps, alarms, banging, growls)"
        accent="#7FA050"
        stages={[
          { label: 'AUDACITY', sub: 'Authoring · trim · mix' },
          { label: 'UNITY', sub: 'Spatialization · cues' },
        ]}
      />

      <text x="400" y="262" fill="#71717a" fontFamily={SANS} fontSize="12" textAnchor="middle">
        Two pipelines. One diegetic soundscape. The antagonist lives entirely in this layer.
      </text>
    </svg>
  )
}
