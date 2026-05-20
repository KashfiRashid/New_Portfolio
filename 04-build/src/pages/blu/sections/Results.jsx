import { SectionHead } from '../primitives.jsx'

const RESULTS = [
  'Three-act CG animated short, roughly 2 to 3 minutes',
  'Two original 3D environments (Lumaland and The Dims) modeled end to end',
  'Original sound design across atmospheric, diegetic, and Lumaland layers',
  'The wolf antagonist carried entirely through audio and shadow',
  'Screened live at the SFU SIAT showcase, August 13, 2025',
]

export default function Results() {
  return (
    <section id="results" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="RESULTS" title="Shipped, screened, complete." />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200">
        <p>
          BLU shipped on schedule and screened at the SFU SIAT showcase on August 13, 2025. The film is the version below: three acts, both worlds, the wolf you hear but never see.
        </p>
      </div>
      <div className="mt-10">
        {/* TODO: download from Framer and self-host under /public/blu/final-film.mp4 */}
        <video
          src="https://framerusercontent.com/assets/NoENFwrtd8zWYSv7XpEy0C2rQEM.mp4"
          controls
          playsInline
          preload="metadata"
          className="block w-full rounded-lg border border-white/[0.06] bg-black"
        />
        <p className="mt-4 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
          BLU. Final film. Summer 2025.
        </p>
      </div>
      <ul className="mt-12 max-w-[720px] space-y-2 font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">
        {RESULTS.map((result, i) => (
          <li key={i}>{result}</li>
        ))}
      </ul>
    </section>
  )
}
