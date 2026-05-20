import { SectionHead } from '../primitives.jsx'

const TOOLS = [
  { label: 'Rendering', value: 'Three.js — 3D graphics, running in the browser' },
  { label: 'Audio', value: "Web Audio API — the browser's built-in sound analysis" },
  { label: 'AI layer', value: "Anthropic's Claude as the synesthesia engine" },
]

const LINEAGE = [
  'Wav2CLIP, learning audio representations from CLIP',
  'SonicDiffusion, audio-driven image generation',
  'AudioToken, adapting text-conditioned diffusion for audio',
  'Autolume, the Metacreation Lab GAN visual synthesizer',
  'Creativity Support Index, for measuring co-creative tools',
]

export default function Credits() {
  return (
    <section id="credits" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="CREDITS" title="Solo build." />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[#FF3D6E]">
            Kashfi Rashid
          </p>
          <p className="mt-2 font-[family-name:var(--font-sans)] text-sm text-zinc-400">
            Concept, real-time engine, AI semantic layer, interface, design
          </p>
          <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
            Every part of Spectral Bloom, from the particle math to the prompt that turns Claude into a synesthesia engine, was built solo.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="https://github.com/KashfiRashid/IAT460_SpectralBloom"
              target="_blank"
              rel="noreferrer"
              className="font-[family-name:var(--font-mono)] text-[12px] uppercase tracking-[0.14em] text-[#FF7DA3] underline-offset-4 hover:underline"
            >
              GitHub repo →
            </a>
          </div>
        </div>

        <div>
          <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-zinc-500">
            Tools
          </p>
          <dl className="mt-3 space-y-2">
            {TOOLS.map((tool) => (
              <div key={tool.label} className="flex gap-3">
                <dt className="w-24 shrink-0 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-zinc-600">
                  {tool.label}
                </dt>
                <dd className="font-[family-name:var(--font-sans)] text-sm text-zinc-300">{tool.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-zinc-500">
            Research lineage
          </p>
          <ul className="mt-3 space-y-1.5">
            {LINEAGE.map((line) => (
              <li key={line} className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-400">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-14 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
        Generative AI · SFU SIAT · Spring 2026
      </p>
    </section>
  )
}
