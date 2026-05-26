import { SectionHead } from '../primitives.jsx'

const TEAM = [
  {
    name: 'Md Kashfi Or Rashid Pranta',
    role: 'Designer · Voice Coach UI',
    contribution:
      'Built the emotional bubble: the moving, reacting visual layer of the AI Coach. Designed the breathing idle state, the live audio-synced reaction, and the color and pulse shifts that ride along with what the coach is saying.',
  },
  {
    name: 'Harjot Singh',
    role: 'Backend Architecture · AI Pipeline · AI Coach',
    contribution:
      'Built the four-step AI pipeline (Gemini classification, cost prediction, o3 suggestion engine) and the streaming voice coach backend: GPT-4o-mini and ElevenLabs running in parallel over Server-Sent Events.',
  },
  {
    name: 'Faaiz Abdullah',
    role: 'Project Founder · Build',
    contribution:
      'Started the project. Contributed across the build through the weekend.',
  },
]

export default function Credits() {
  return (
    <section id="credits" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="CREDITS" title="Team." />

      <figure className="mb-12">
        <img
          src="/foresee/team.jpg"
          alt="The ForeSee team at Mountain Madness 2026."
          loading="lazy"
          className="w-full max-w-2xl rounded-lg border border-white/[0.08]"
        />
        <figcaption className="mt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          The team at Mountain Madness 2026, Best Use of ElevenLabs
        </figcaption>
      </figure>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {TEAM.map((m) => (
          <div key={m.name}>
            <h3 className="font-[family-name:var(--font-display)] text-[20px] font-normal text-white">
              {m.name}
            </h3>
            <p className="mt-1 font-[family-name:var(--font-sans)] text-sm text-zinc-400">{m.role}</p>
            <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
              {m.contribution}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
        Mountain Madness 2026 · CSSS × MLH · SFU
      </p>
    </section>
  )
}
