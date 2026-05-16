import { SectionHead } from '../primitives.jsx'

const SYSTEM = [
  {
    label: 'Typography',
    rows: [
      'Display 56px',
      'Heading 32px',
      'Body 16px',
      'Caption 13px',
      'Mono 11px',
    ],
  },
  {
    label: 'Color',
    rows: ['Primary', 'Accent', 'Surface', 'Text'],
  },
  {
    label: 'Spacing',
    rows: ['4 / 8 / 16 / 24 / 32 / 48'],
  },
  {
    label: 'Components',
    rows: [
      'Button (default, hover, active)',
      'Card (static, elevated)',
      'Form input (idle, focus, error)',
      'Nav link (idle, active)',
    ],
  },
]

export default function DesignSystem() {
  return (
    <section id="design-system" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="DESIGN SYSTEM"
        title="Wireframes proved the layout. Mockups proved the brand."
      />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          The brand authenticity problem got solved in the mockup phase: typography, a curated palette, spacing, components, and real imagery in place of stock.
        </p>
      </div>

      <dl className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 md:grid-cols-2 lg:grid-cols-4">
        {SYSTEM.map((col) => (
          <div key={col.label} className="flex flex-col gap-3 bg-[#0F1216] p-6">
            <dt className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[#F2885A]">
              {col.label}
            </dt>
            <dd>
              <ul className="space-y-2">
                {col.rows.map((row) => (
                  <li key={row} className="font-[family-name:var(--font-sans)] text-[13px] leading-relaxed text-zinc-300">
                    {row}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-12 space-y-12">
        <figure>
          <img
            src="/parpro/wireframes.png"
            alt="Low-fidelity wireframes for Home, About Us, and Services: layout structure only, no visual treatment."
            loading="lazy"
            className="w-full rounded-lg border border-white/[0.06] bg-black object-contain"
            style={{ aspectRatio: '10264 / 6187' }}
          />
          <figcaption className="mt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-600">
            Wireframes &middot; structure only
          </figcaption>
        </figure>
        <figure>
          <img
            src="/parpro/mockups.png"
            alt="High-fidelity mockups with the applied design system across the same three pages."
            loading="lazy"
            className="w-full rounded-lg border border-white/[0.06] bg-black object-contain"
            style={{ aspectRatio: '6145 / 4925' }}
          />
          <figcaption className="mt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-600">
            Mockups &middot; system applied
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
