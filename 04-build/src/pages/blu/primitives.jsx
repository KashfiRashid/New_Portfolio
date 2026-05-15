import { Link } from 'react-router-dom'

// BLU primitives. Same component shapes as BC Connect's primitives.jsx,
// so the two case studies render as siblings. The only swaps are:
//   - signal color: #1B6B4F (BC Connect green) becomes #4FC3F7 (BLU cyan,
//     reading as the feather's glow)
//   - SideNav labels point at BLU's nine section IDs
// Nothing else was added or invented. Image and video embeds in section
// files use raw <img> / <video> with TODO comments inline, matching how
// BC Connect embeds its inline SVG diagrams.

export const BLU_NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'concept', label: 'Concept' },
  { id: 'what-i-did', label: 'What I Did' },
  { id: 'two-worlds', label: 'The Two Worlds' },
  { id: 'sound-as-character', label: 'Sound as Character' },
  { id: 'process', label: 'Process' },
  { id: 'results', label: 'Results' },
  { id: 'reflection', label: 'Reflection' },
  { id: 'credits', label: 'Credits' },
]

export function SideNav({ activeId = '' }) {
  return (
    <nav
      className="fixed left-0 top-0 z-40 hidden h-screen w-[220px] flex-col border-r border-white/[0.06] bg-[#0F1216]/95 px-5 py-10 backdrop-blur-sm lg:flex"
      aria-label="Case study sections"
    >
      <Link
        to="/work"
        className="mb-10 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.12em] text-zinc-400 transition-colors hover:text-zinc-200"
      >
        Return
      </Link>
      <ul className="flex flex-col gap-1">
        {BLU_NAV.map((item) => {
          const active = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`flex items-center gap-2 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  active ? 'text-[#4FC3F7]' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span
                  className={`h-1 w-1 shrink-0 rounded-full ${active ? 'bg-[#4FC3F7]' : 'bg-transparent'}`}
                  aria-hidden
                />
                {item.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export function MonoKicker({ children, className = '' }) {
  return (
    <p
      className={`font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-zinc-500 ${className}`}
    >
      {children}
    </p>
  )
}

export function SectionHead({ kicker, title, className = '' }) {
  return (
    <header className={`mb-10 space-y-4 ${className}`}>
      {kicker ? <MonoKicker>{kicker}</MonoKicker> : null}
      {title ? (
        <h2 className="font-[family-name:var(--font-display)] text-4xl font-normal tracking-tight text-white md:text-5xl lg:text-6xl">
          {title}
        </h2>
      ) : null}
    </header>
  )
}

export function PullQuote({ children, className = '' }) {
  return (
    <blockquote
      className={`mx-auto max-w-3xl text-center font-[family-name:var(--font-display)] text-xl italic leading-relaxed text-[#4FC3F7] md:text-2xl ${className}`}
    >
      {children}
    </blockquote>
  )
}

export function MetaBlock({ rows = [], className = '' }) {
  return (
    <dl
      className={`grid gap-8 border border-white/[0.08] bg-white/[0.02] p-6 md:grid-cols-3 ${className}`}
    >
      {rows.map((row) => (
        <div key={row.label}>
          <dt className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-zinc-500">
            {row.label}
          </dt>
          <dd className="mt-2 font-[family-name:var(--font-sans)] text-sm text-zinc-200">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export function PainPointCard({ index, title, children, className = '' }) {
  return (
    <article
      className={`flex flex-col gap-3 border border-white/[0.06] bg-white/[0.02] p-6 ${className}`}
    >
      <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[#4FC3F7]">
        Pain Point #{index}
      </span>
      {title ? (
        <h3 className="font-[family-name:var(--font-sans)] text-lg font-medium text-white">{title}</h3>
      ) : null}
      <div className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-400">{children}</div>
    </article>
  )
}

export function StepCard({ step, title, children, className = '' }) {
  return (
    <article className={`space-y-6 py-16 ${className}`}>
      <div className="space-y-3">
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[#4FC3F7]">
          {step}
        </p>
        {title ? (
          <h3 className="font-[family-name:var(--font-display)] text-3xl font-normal text-white md:text-4xl">
            {title}
          </h3>
        ) : null}
        <div className="max-w-2xl font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">
          {children}
        </div>
      </div>
    </article>
  )
}

/**
 * AssetPlaceholder. Same primitive shape as BC Connect. BLU uses it for
 * the Reflection block (waiting on Kash's words). The signal accent is
 * BLU cyan instead of BC Connect's mint teal.
 */
export function AssetPlaceholder({
  kind = 'SCREENSHOT',
  slotId = '',
  filename = '',
  dimensions = '',
  description = '',
  annotate = '',
  className = '',
}) {
  return (
    <div
      role="img"
      aria-label={`${kind} placeholder: ${slotId}. ${description}`}
      className={`flex min-h-[220px] flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-zinc-600 bg-zinc-900/40 px-6 py-12 text-center ${className}`}
    >
      <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[#4FC3F7]">
        {kind} placeholder
      </span>
      <span className="mt-1 font-[family-name:var(--font-mono)] text-sm text-zinc-300">
        {slotId}
      </span>
      {filename ? (
        <span className="mt-2 rounded bg-zinc-800/80 px-2 py-1 font-[family-name:var(--font-mono)] text-xs text-zinc-200">
          save as: {filename}
        </span>
      ) : null}
      {dimensions ? (
        <span className="mt-1 font-[family-name:var(--font-mono)] text-xs text-zinc-500">
          {dimensions}
        </span>
      ) : null}
      {description ? (
        <p className="mt-2 max-w-md font-[family-name:var(--font-sans)] text-sm text-zinc-400">
          {description}
        </p>
      ) : null}
      {annotate ? (
        <p className="mt-1 max-w-md font-[family-name:var(--font-sans)] text-xs italic text-zinc-500">
          Annotate: {annotate}
        </p>
      ) : null}
    </div>
  )
}
