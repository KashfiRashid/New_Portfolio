import { SectionHead, Figure } from '../primitives.jsx'

const HIGHLIGHTS = [
  {
    label: 'Final critique',
    body: 'Playable VR build delivered for the final critique. All three acts, both scales, the diegetic feedback patch shipped.',
  },
  {
    label: 'SFU info session',
    body: 'Presented live at the SFU SIAT Prospective Student Info Session, Fall 2025. Used as a recruitment piece for the program.',
  },
  {
    label: 'Official showcase',
    body: 'Featured on the SFU SIAT Fall 2025 Project Showcase as one of the official Immersive Environments selections.',
  },
]

export default function Results() {
  return (
    <section id="results" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="RESULTS" title="Shipped. Presented. Showcased." />

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 md:grid-cols-3">
        {HIGHLIGHTS.map((h) => (
          <div key={h.label} className="bg-[#0F1216] p-6">
            <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[#6E3FB3]">
              {h.label}
            </p>
            <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">
              {h.body}
            </p>
          </div>
        ))}
      </div>

      <figure className="mt-12 space-y-3">
        <div className="aspect-video w-full overflow-hidden rounded-lg border border-white/[0.08] bg-black">
          <iframe
            src="https://www.youtube.com/embed/eK9rhROT4ds?rel=0"
            title="Something Lurking demo walkthrough"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            loading="lazy"
            className="h-full w-full"
          />
        </div>
        <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          <span className="text-[#9268E0]">Demo</span> &#xB7; full walkthrough &#xB7; final critique cut &#xB7; Fall 2025
        </figcaption>
      </figure>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        <figure className="space-y-3">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/[0.08]">
            <img
              src="/something-lurking/Project-on-table-full.png"
              alt="The Something Lurking demo station at the SFU SIAT Fall 2025 showcase."
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            <span className="text-[#9268E0]">Figure 6</span> &#xB7; demo station, SIAT Fall 2025 showcase
          </figcaption>
        </figure>
        <figure className="space-y-3">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg border border-white/[0.08]">
            <img
              src="/something-lurking/Project-on-table.png"
              alt="The printed Something Lurking comic posters on the showcase table."
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
          </div>
          <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            <span className="text-[#9268E0]">Figure 7</span> &#xB7; printed comic posters
          </figcaption>
        </figure>
      </div>

      <Figure
        className="mt-16"
        src="/something-lurking/fig-art-collage.png"
        alt="The full 3D asset collage from the project report."
        label="Figure 5"
        caption={"The full art set Eric modeled \u00b7 seven scaled environments \u00b7 armband \u00b7 escape pod \u00b7 astronaut"}
      />
    </section>
  )
}
