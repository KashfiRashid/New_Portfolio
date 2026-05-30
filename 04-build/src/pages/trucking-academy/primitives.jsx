import { Link } from 'react-router-dom'

// Trucking Academy primitives - deep crimson register matching the
// original case study's red dot identity (#8B0000 / #DC143C). Same
// case-study shell as the others.

export const TA_NAV = [
  { id: 'challenge', label: 'The Challenge' },
  { id: 'research', label: 'Research Process' },
  { id: 'insights', label: 'Key Insights' },
  { id: 'journey', label: 'User Journey' },
  { id: 'solution', label: 'The Solution' },
  { id: 'features', label: 'App Features' },
  { id: 'final-design', label: 'Final Design' },
  { id: 'impact', label: 'Impact' },
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
        {TA_NAV.map((item) => {
          const active = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`flex items-center gap-2 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  active ? 'text-[#FF6B6B]' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span
                  className={`h-1 w-1 shrink-0 rounded-full ${active ? 'bg-[#FF6B6B]' : 'bg-transparent'}`}
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
    <p className={`font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-zinc-500 ${className}`}>
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
    <dl className={`grid gap-8 border border-white/[0.08] bg-white/[0.02] p-6 md:grid-cols-3 ${className}`}>
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
    <mark className={`box-decoration-clone rounded-[3px] bg-[#DC143C]/25 px-1.5 py-0.5 font-medium text-white ${className}`}>
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
      className="inline-flex items-center gap-1.5 rounded-md border border-[#DC143C]/40 bg-[#8B0000]/[0.12] px-4 py-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[#FF6B6B] transition-colors hover:border-[#DC143C] hover:bg-[#8B0000]/[0.22] hover:text-white"
    >
      {children}
    </a>
  )
}
