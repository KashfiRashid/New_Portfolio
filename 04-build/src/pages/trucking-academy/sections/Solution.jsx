import { SectionHead, Highlight } from '../primitives.jsx'

const FEATURES = [
  { title: 'Guided learning path', body: 'Linear, color-coded courses with visual progress so drivers always know what comes next.' },
  { title: 'Bite-sized content', body: 'Short modules and quick quizzes designed for cab time, not classroom time.' },
  { title: 'Community forum', body: 'Connect with experienced drivers nationwide. Mentorship as a feature, not an afterthought.' },
]

export default function Solution() {
  return (
    <section id="solution" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="THE SOLUTION" title="A learning platform, not a marketing site." />
      <div className="mt-8 max-w-[720px] space-y-6 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
        <p>
          <Highlight>Trucking Academy is a mobile app that streamlines the path into a trucking career.</Highlight> Guided learning, community mentorship, and direct connections to vetted employers &#x2014; all three pain points addressed by one product instead of three disconnected services.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 md:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="bg-[#0F1216] p-6">
            <p className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-[0.2em] text-[#8B0000]">{f.title}</p>
            <p className="mt-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
