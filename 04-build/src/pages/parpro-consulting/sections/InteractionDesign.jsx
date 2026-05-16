import { SectionHead } from '../primitives.jsx'

const INTERACTIONS = [
  {
    src: '/parpro/entrance-animation.mp4',
    ratio: '1440 / 1080',
    label: 'ENTRANCE',
    problem: 'Problem 4 · template brand voice',
    caption: 'The first thing a visitor sees is the brand, not a stock photo.',
    alt: 'Recorded entrance animation from the Figma prototype: brand identity revealed on load.',
  },
  {
    src: '/parpro/scroll-animation.mp4',
    ratio: '1440 / 1080',
    label: 'SCROLL',
    problem: 'Problem 2 · static engagement',
    caption: 'Content reveals progressively. Motion tied to attention, not decoration.',
    alt: 'Recorded scroll-triggered animations: content surfaces tied to scroll position.',
  },
  {
    src: '/parpro/click-interaction.mp4',
    ratio: '1432 / 1078',
    label: 'CLICK',
    problem: 'Problem 3 · buried consultation path',
    caption: 'Immediate CTA feedback for the consultation funnel.',
    alt: 'Recorded click interactions: CTA feedback states tied to the consultation path.',
  },
  {
    src: '/parpro/hover-interaction.mp4',
    ratio: '1432 / 1078',
    label: 'HOVER',
    problem: 'Problem 2 · static engagement',
    caption: 'Previews interactive content to encourage exploration.',
    alt: 'Recorded hover states: interactive previews surfacing on pointer hover.',
  },
]

export default function InteractionDesign() {
  return (
    <section id="interaction-design" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="INTERACTION DESIGN"
        title="Four interactions. Each tied to a problem, not added for polish."
      />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          Engagement was the top priority after the imagery problem. Each pattern serves a user goal that maps to an audited problem.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {INTERACTIONS.map((item) => (
          <div key={item.src} className="space-y-3">
            <video
              src={item.src}
              autoPlay
              loop
              muted
              playsInline
              aria-label={item.alt}
              className="w-full rounded-lg border border-white/[0.06] bg-black object-contain"
              style={{ aspectRatio: item.ratio }}
            />
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[#EC613B]">
                {item.label}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-zinc-600">
                {item.problem}
              </span>
            </div>
            <p className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-400">
              {item.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
