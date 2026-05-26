import {
  WideShell,
  SerifTitle,
  BodyText,
  AssetPlaceholder,
} from '../primitives.jsx'

/**
 * Desk — Block 2, "at the desk".
 *
 * The design-engineer claim, in Kash's voice: design engineer is a workflow,
 * not a job title. Write the spec, design it, build it, ship it, no handoff.
 *
 * Three named ships follow, one short sentence each:
 *   1. BC Connect    — design system + frontend, three-person MERN team,
 *                      20/20 on interim review.
 *   2. Spectral Bloom — solo Three.js + Claude API audio-reactive system,
 *                      presented to the Metacreation Lab.
 *   3. ForeSee       — Mountain Madness 2026, won MLH Best Use of ElevenLabs.
 *
 * Visual: 3-up row of pixel-art thumbnails, 120x120 each.
 */
export default function Desk() {
  return (
    <WideShell id="desk">
      <div className="mx-auto max-w-[680px]">
        <SerifTitle>at the desk</SerifTitle>

        <BodyText className="mb-4">
          Design engineer is a workflow, not a job title. Write the spec,
          design it, build it, ship it. No handoff in the middle.
        </BodyText>
        <BodyText className="mb-4">
          BC Connect: a design system and the frontend, with a three-person
          MERN team, 20/20 on the interim review.
        </BodyText>
        <BodyText className="mb-4">
          Spectral Bloom: a solo Three.js and Claude API audio-reactive
          system, presented to the Metacreation Lab.
        </BodyText>
        <BodyText>
          ForeSee: Mountain Madness 2026, won MLH Best Use of ElevenLabs.
        </BodyText>
      </div>

      {/* 3-up thumbnail row. Placeholders until pixel-art is in /about/ */}
      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <AssetPlaceholder
          kind="thumb"
          filename="/about/thumb-bc-connect.png"
          dimensions="120 × 120 · transparent"
          description="pixel-art thumbnail for BC Connect."
          aspect="1 / 1"
          maxWidth="220px"
        />
        <AssetPlaceholder
          kind="thumb"
          filename="/about/thumb-spectral-bloom.png"
          dimensions="120 × 120 · transparent"
          description="pixel-art thumbnail for Spectral Bloom."
          aspect="1 / 1"
          maxWidth="220px"
        />
        <AssetPlaceholder
          kind="thumb"
          filename="/about/thumb-foresee.png"
          dimensions="120 × 120 · transparent"
          description="pixel-art thumbnail for ForeSee."
          aspect="1 / 1"
          maxWidth="220px"
        />
      </div>
    </WideShell>
  )
}
