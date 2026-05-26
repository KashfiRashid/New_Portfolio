import { SectionHead, Highlight } from '../primitives.jsx'

const SCREENS = [
  { src: '/trucking-academy/learning-path.png', label: 'Learning', body: 'color-coded progression' },
  { src: '/trucking-academy/job-board.png', label: 'Job board', body: 'vetted employers in-app' },
  { src: '/trucking-academy/community.png', label: 'Community', body: 'mentorship + peer network' },
]

export default function Features() {
  return (
    <section id="features" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="APP FEATURES" title="Three core experiences, one surface." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          <Highlight>Learning, hiring, and community on one navigation.</Highlight> The structured progression makes it feel like school; the job board makes it feel like a career; the forum makes it feel like a trade you&rsquo;re joining.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {SCREENS.map((s) => (
          <figure key={s.label} className="space-y-3">
            <div className="w-full overflow-hidden rounded-lg border border-white/[0.08] bg-zinc-900">
              <img
                src={s.src}
                alt={`${s.label} — ${s.body}`}
                loading="lazy"
                className="block w-full h-auto"
              />
            </div>
            <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
              <span className="text-[#FF6B6B]">{s.label}</span> · {s.body}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
