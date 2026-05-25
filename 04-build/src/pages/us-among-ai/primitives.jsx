import { Link } from 'react-router-dom'

// Us Among AI primitives — same component shapes as the other case
// studies so all the case studies render as siblings. Signal color is
// #3DE8B0 (neon mint — reads as a system terminal "online" glow).

export const US_AMONG_AI_NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'concept', label: 'The Concept' },
  { id: 'what-i-did', label: 'What I Did' },
  { id: 'how-it-plays', label: 'How It Plays' },
  { id: 'the-build', label: 'The Build' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'results', label: 'Results' },
  { id: 'reflection', label: 'Reflection' },
  { id: 'credits', label: 'Credits' },
]

export function SideNav({ activeId = '' }) {
  return (
    <nav
      className="fixed left-0 top-12 z-40 hidden h-[calc(100vh-3rem)] w-[220px] flex-col border-r border-white/[0.06] bg-[#0F1216]/95 px-5 py-10 backdrop-blur-sm lg:flex"
      aria-label="Case study sections"
    >
      <Link
        to="/work"
        className="mb-10 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.12em] text-zinc-400 transition-colors hover:text-zinc-200"
      >
        Return
      </Link>
      <ul className="flex flex-col gap-1">
        {US_AMONG_AI_NAV.map((item) => {
          const active = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`flex items-center gap-2 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  active ? 'text-[#3DE8B0]' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span
                  className={`h-1 w-1 shrink-0 rounded-full ${active ? 'bg-[#3DE8B0]' : 'bg-transparent'}`}
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

export function Highlight({ children, className = '' }) {
  return (
    <mark
      className={`box-decoration-clone rounded-[3px] bg-[#3DE8B0]/20 px-1.5 py-0.5 font-medium text-white ${className}`}
    >
      {children}
    </mark>
  )
}

/**
 * AssetPlaceholder — a dashed slot for a real screenshot. Drop the file
 * in /public/us-among-ai/ with the filename shown, then swap this for an
 * <img src="/us-among-ai/FILENAME" />.
 */
export function AssetPlaceholder({
  slotId = '',
  filename = '',
  dimensions = '',
  description = '',
  className = '',
}) {
  return (
    <div
      role="img"
      aria-label={`Screenshot placeholder: ${slotId}. ${description}`}
      className={`flex min-h-[240px] flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-zinc-600 bg-zinc-900/40 px-6 py-12 text-center ${className}`}
    >
      <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[#3DE8B0]">
        screenshot placeholder
      </span>
      <span className="mt-1 font-[family-name:var(--font-mono)] text-sm text-zinc-300">{slotId}</span>
      {filename ? (
        <span className="mt-2 rounded bg-zinc-800/80 px-2 py-1 font-[family-name:var(--font-mono)] text-xs text-zinc-200">
          save as: {filename}
        </span>
      ) : null}
      {dimensions ? (
        <span className="mt-1 font-[family-name:var(--font-mono)] text-xs text-zinc-500">{dimensions}</span>
      ) : null}
      {description ? (
        <p className="mt-2 max-w-md font-[family-name:var(--font-sans)] text-sm text-zinc-400">{description}</p>
      ) : null}
    </div>
  )
}
