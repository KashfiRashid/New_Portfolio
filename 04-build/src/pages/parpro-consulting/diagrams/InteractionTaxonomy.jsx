/**
 * InteractionTaxonomy. 2x2 grid mapping interaction type to problem.
 *
 * Each cell ties one of the four interaction patterns back to a specific
 * audit problem. Caption underneath restates the criterion.
 */

const INTERACTIONS = [
  {
    name: 'ENTRANCE',
    tie: 'Problem 4 · Template brand voice',
    body: 'Cues attention to brand identity on arrival. The first thing a visitor sees is the brand, not a stock photo.',
  },
  {
    name: 'SCROLLING',
    tie: 'Problem 2 · Static engagement',
    body: 'Reveals content progressively as the user moves down. Motion is tied to attention, not to decoration.',
  },
  {
    name: 'CLICK',
    tie: 'Problem 3 · Buried consultation path',
    body: 'Provides immediate CTA feedback for the consultation funnel. Every press confirms direction.',
  },
  {
    name: 'HOVER',
    tie: 'Problem 2 · Static engagement',
    body: 'Previews interactive content to encourage exploration. Surfaces depth before commitment.',
  },
]

export default function InteractionTaxonomy() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {INTERACTIONS.map((item) => (
          <article
            key={item.name}
            className="flex flex-col gap-3 border border-white/[0.06] bg-white/[0.02] p-6"
          >
            <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#4EE0B8]">
              {item.name}
            </span>
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-zinc-500">
              {item.tie}
            </span>
            <p className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-300">
              {item.body}
            </p>
          </article>
        ))}
      </div>
      <p className="mt-4 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
        Each interaction earns its place by tying to a problem. Decoration was not the criterion.
      </p>
    </div>
  )
}
