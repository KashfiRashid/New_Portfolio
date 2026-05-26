import { Link } from 'react-router-dom'

// ForeSee primitives — same shapes as the other case studies so they all
// render as siblings. Accent: indigo #6366F1 with #A5B4FC bright, matching
// the zinc/white/indigo design system ForeSee actually shipped with.

export const FORESEE_NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'concept', label: 'The Concept' },
  { id: 'what-i-did', label: 'What I Did' },
  { id: 'the-build', label: 'The Build' },
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
        {FORESEE_NAV.map((item) => {
          const active = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`flex items-center gap-2 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  active ? 'text-[#A5B4FC]' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span
                  className={`h-1 w-1 shrink-0 rounded-full ${active ? 'bg-[#A5B4FC]' : 'bg-transparent'}`}
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
      className={`box-decoration-clone rounded-[3px] bg-[#6366F1]/25 px-1.5 py-0.5 font-medium text-white ${className}`}
    >
      {children}
    </mark>
  )
}

export function LinkButton({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-md border border-[#6366F1]/40 bg-[#6366F1]/[0.08] px-4 py-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[#A5B4FC] transition-colors hover:border-[#6366F1] hover:bg-[#6366F1]/[0.16] hover:text-white"
    >
      {children}
    </a>
  )
}
