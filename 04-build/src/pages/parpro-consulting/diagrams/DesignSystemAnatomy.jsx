/**
 * DesignSystemAnatomy. 4 columns of the design system foundations.
 *
 * Typography · Color · Spacing · Components. Restrained card layout with
 * mono labels. Color swatches are TBD placeholders because the actual
 * tokens depend on Kash's finalized palette.
 */

const TYPE_ROWS = [
  { label: 'H1', sample: 'Display 56', size: 'Display · 56px' },
  { label: 'H2', sample: 'Heading 32', size: 'Heading · 32px' },
  { label: 'BODY', sample: 'Body copy 16', size: 'Body · 16px' },
  { label: 'CAPTION', sample: 'Caption 13', size: 'Caption · 13px' },
  { label: 'MONO', sample: 'MONO 11', size: 'Mono · 11px' },
]

const COLOR_TOKENS = [
  { name: 'PRIMARY', note: 'TBD · Kash to provide' },
  { name: 'ACCENT', note: 'TBD · Kash to provide' },
  { name: 'SURFACE', note: 'TBD · Kash to provide' },
  { name: 'TEXT', note: 'TBD · Kash to provide' },
]

const SPACING_STEPS = [4, 8, 16, 24, 32, 48]

const COMPONENT_ROWS = [
  'Button · default · hover · active',
  'Card · static · elevated',
  'Form input · idle · focus · error',
  'Nav link · idle · active',
]

export default function DesignSystemAnatomy() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <article className="flex flex-col gap-3 border border-white/[0.06] bg-white/[0.02] p-6">
        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[#4EE0B8]">
          Typography
        </span>
        <ul className="mt-2 space-y-2">
          {TYPE_ROWS.map((row) => (
            <li key={row.label} className="flex flex-col">
              <span className="font-[family-name:var(--font-sans)] text-[15px] text-white">
                {row.sample}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                {row.size}
              </span>
            </li>
          ))}
        </ul>
      </article>

      <article className="flex flex-col gap-3 border border-white/[0.06] bg-white/[0.02] p-6">
        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[#4EE0B8]">
          Color
        </span>
        <ul className="mt-2 space-y-3">
          {COLOR_TOKENS.map((token) => (
            <li key={token.name} className="flex items-center gap-3">
              <span
                className="h-7 w-7 shrink-0 rounded border border-dashed border-zinc-600 bg-zinc-900/60"
                aria-hidden
              />
              <span className="flex flex-col">
                <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-zinc-300">
                  {token.name}
                </span>
                <span className="font-[family-name:var(--font-sans)] text-xs italic text-zinc-500">
                  {token.note}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </article>

      <article className="flex flex-col gap-3 border border-white/[0.06] bg-white/[0.02] p-6">
        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[#4EE0B8]">
          Spacing
        </span>
        <ul className="mt-2 flex flex-col gap-2">
          {SPACING_STEPS.map((step) => (
            <li key={step} className="flex items-center gap-3">
              <span
                className="h-1.5 shrink-0 rounded-sm bg-zinc-500"
                style={{ width: `${step * 1.5}px` }}
                aria-hidden
              />
              <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-zinc-400">
                {step}px
              </span>
            </li>
          ))}
        </ul>
      </article>

      <article className="flex flex-col gap-3 border border-white/[0.06] bg-white/[0.02] p-6">
        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[#4EE0B8]">
          Components
        </span>
        <ul className="mt-2 space-y-2">
          {COMPONENT_ROWS.map((row) => (
            <li
              key={row}
              className="font-[family-name:var(--font-sans)] text-[13px] leading-relaxed text-zinc-300"
            >
              {row}
            </li>
          ))}
        </ul>
      </article>
    </div>
  )
}
