import { SectionHead } from '../primitives.jsx'

const VENUES = [
  { name: 'Concerts', body: 'Stage visuals that react to the set in real time, with nobody running a visuals desk.' },
  { name: 'Raves', body: 'Light patterns that match the mood and energy of the room, not just the tempo.' },
  { name: 'Streaming', body: 'Producers and streamers get reactive visuals for their content, instantly.' },
  { name: 'Installations', body: 'Galleries and museums get sound-responsive generative environments.' },
]

const ROADMAP = [
  {
    name: 'Wav2CLIP integration',
    body: 'Translate audio straight into the mathematical space images live in, for a tighter read on meaning — the original proposal, picked back up.',
  },
  {
    name: 'SDXL Turbo backgrounds',
    body: 'AI-generated imagery layered behind the particles, refreshing every one to three seconds.',
  },
  {
    name: 'Stage-lighting bridge',
    body: 'Send the visual settings to real stage lights over DMX, the standard protocol for venue lighting, so a physical room reacts the way the screen does.',
  },
  {
    name: 'User evaluation',
    body: 'A formal study — using the Creativity Support Index, an established measure — comparing the AI build against a plain frequency-mapped version.',
  },
]

export default function ScalingVision() {
  return (
    <section id="scaling" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="SCALING VISION" title="Where it goes next." />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          The shipped build is the proof. The roadmap is where the proposal's full ambition lives now, with a working system underneath it instead of a hypothesis.
        </p>
      </div>

      <div className="mt-12">
        <p className="mb-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          Where it runs
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VENUES.map((venue) => (
            <div key={venue.name} className="border border-white/[0.06] bg-white/[0.02] p-6">
              <h3 className="font-[family-name:var(--font-sans)] text-lg font-medium text-white">{venue.name}</h3>
              <p className="mt-2 font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-400">
                {venue.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <p className="mb-6 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          What gets built
        </p>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 md:grid-cols-2">
          {ROADMAP.map((item) => (
            <div key={item.name} className="bg-[#0F1216] p-6">
              <h3 className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.14em] text-[#FF7DA3]">
                {item.name}
              </h3>
              <p className="mt-2 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
