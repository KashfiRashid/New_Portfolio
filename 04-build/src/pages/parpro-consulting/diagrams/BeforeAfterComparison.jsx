/**
 * BeforeAfterComparison. Two stacked columns mapping audit problems to
 * the responses that shipped in the redesign.
 *
 * Four rows, paired before/after. Caption underneath restates the
 * boundary: the artifact addresses each, market response unmeasured.
 */

const PAIRS = [
  {
    before: 'Stock imagery overload',
    after: 'Curated visuals matched to service categories',
  },
  {
    before: 'Static engagement',
    after: 'Four interaction types tied to specific user goals',
  },
  {
    before: 'Buried consultation path',
    after: 'Persistent CTA visible at every flow stage',
  },
  {
    before: 'Template brand voice',
    after: 'Coherent design system with typography, color, spacing tokens',
  },
]

export default function BeforeAfterComparison() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 md:grid-cols-2">
        <div className="bg-[#0F1216] p-6">
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            Before
          </p>
          <ul className="mt-4 space-y-3">
            {PAIRS.map((pair) => (
              <li
                key={pair.before}
                className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-400"
              >
                {pair.before}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[#0F1216] p-6">
          <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[#1B6B4F]">
            After
          </p>
          <ul className="mt-4 space-y-3">
            {PAIRS.map((pair) => (
              <li
                key={pair.after}
                className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-200"
              >
                {pair.after}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-4 text-center font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.2em] text-zinc-500">
        Four problems. Four responses. The artifact addresses each. The market response is unmeasured.
      </p>
    </div>
  )
}
