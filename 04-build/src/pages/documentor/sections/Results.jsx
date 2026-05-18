import { SectionHead, StatBlock, PullQuote } from '../primitives.jsx'

const STATS = [
  { value: '45', label: 'interviews' },
  { value: '12+', label: 'countries' },
  { value: '11/12', label: 'testers satisfied' },
]

export default function Results() {
  return (
    <section id="results" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="RESULTS"
        title="The people who had the problem confirmed the solution."
      />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          12 international students tested DocuMentor over 2 weeks. 11 of 12 reported satisfied.
        </p>
      </div>

      <div className="mt-12">
        <StatBlock stats={STATS} />
      </div>

      <div className="mt-16 border-l-2 border-[#E8A53B] pl-6">
        <blockquote className="font-[family-name:var(--font-display)] text-xl italic leading-relaxed text-zinc-200 md:text-2xl">
          Breaking complex tasks into smaller steps transforms the experience. I wish this existed when I was navigating these processes myself.
        </blockquote>
        <p className="mt-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[#F4C26B]">
          Savi Maritini
        </p>
        <p className="mt-1 font-[family-name:var(--font-sans)] text-sm text-zinc-400">
          SFU graduate student
        </p>
      </div>
    </section>
  )
}
