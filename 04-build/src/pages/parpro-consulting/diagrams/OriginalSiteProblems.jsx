/**
 * OriginalSiteProblems. 2x2 grid of the four audit findings.
 *
 * Pure JSX cards, no SVG. Matches the restraint of the BC Connect
 * diagrams: thin strokes, mono kicker labels, dark canvas. Each card
 * carries an index, a title, and a two-line description.
 */

const PROBLEMS = [
  {
    index: '01',
    title: 'STOCK IMAGERY OVERLOAD',
    body: 'Every visual on the original site came from a stock library. Nothing told a visitor what Parpro itself looked like.',
  },
  {
    index: '02',
    title: 'STATIC ENGAGEMENT',
    body: 'No motion, no hover states, no scroll cues. The page sat still while the visitor scrolled past it.',
  },
  {
    index: '03',
    title: 'BURIED CONSULTATION PATH',
    body: 'The primary CTA (book a consultation) was a buried link in a footer block. Most visitors never reached it.',
  },
  {
    index: '04',
    title: 'TEMPLATE BRAND VOICE',
    body: 'Logo aside, the site read as a generic services template. No identity, no authority, no reason to trust.',
  },
]

export default function OriginalSiteProblems() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {PROBLEMS.map((problem) => (
        <article
          key={problem.index}
          className="flex flex-col gap-3 border border-white/[0.06] bg-white/[0.02] p-6"
        >
          <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[#4EE0B8]">
            Problem {problem.index}
          </span>
          <h3 className="font-[family-name:var(--font-sans)] text-base font-medium uppercase tracking-[0.08em] text-white">
            {problem.title}
          </h3>
          <p className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-400">
            {problem.body}
          </p>
        </article>
      ))}
    </div>
  )
}
