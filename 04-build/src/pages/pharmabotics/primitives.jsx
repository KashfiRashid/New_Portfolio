import { Link } from 'react-router-dom'

// PharmaBotics primitives - same shapes as the other case studies so they all
// render as siblings. Accent: teal #14B8A6 with #5EEAD4 bright. Pure ASCII
// source (the editor's on-save formatter truncates files with em-dashes /
// other multibyte glyphs).

export const PHARMA_NAV = [
  { id: 'problem', label: 'The problem' },
  { id: 'ideation', label: 'Ideation' },
  { id: 'what-it-does', label: 'What it does' },
  { id: 'how-it-works', label: 'How it works' },
  { id: 'my-role', label: 'What I built' },
  { id: 'iteration', label: 'Iteration' },
  { id: 'outcome', label: 'Outcome' },
  { id: 'reflection', label: 'Reflection' },
]

export function SideNav({ activeId = '' }) {
  return (
    <nav
      className="fixed left-0 top-12 z-40 hidden h-[calc(100vh-3rem)] w-[220px] flex-col border-r border-white/[0.06] bg-[#0B1211]/95 px-5 py-10 backdrop-blur-sm lg:flex"
      aria-label="Case study sections"
    >
      <Link
        to="/work"
        className="mb-10 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.12em] text-zinc-400 transition-colors hover:text-zinc-200"
      >
        Return
      </Link>
      <ul className="flex flex-col gap-1">
        {PHARMA_NAV.map((item) => {
          const active = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`flex items-center gap-2 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  active ? 'text-[#5EEAD4]' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span
                  className={`h-1 w-1 shrink-0 rounded-full ${active ? 'bg-[#5EEAD4]' : 'bg-transparent'}`}
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
        <h2 className="font-[family-name:var(--font-display)] text-4xl font-normal tracking-tight text-white md:text-5xl lg:text-[56px]">
          {title}
        </h2>
      ) : null}
    </header>
  )
}

export function Prose({ children, className = '' }) {
  return (
    <div className={`space-y-5 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 ${className}`}>
      {children}
    </div>
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
    <mark className={`box-decoration-clone rounded-[3px] bg-[#14B8A6]/25 px-1.5 py-0.5 font-medium text-white ${className}`}>
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
      className="inline-flex items-center gap-1.5 rounded-md border border-[#14B8A6]/40 bg-[#14B8A6]/[0.08] px-4 py-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[#5EEAD4] transition-colors hover:border-[#14B8A6] hover:bg-[#14B8A6]/[0.16] hover:text-white"
    >
      {children}
    </a>
  )
}

// Media placeholder - a clearly-marked slot where Kash drops a real photo or
// video. Keeps the page composed before assets land.
export function MediaSlot({ label = 'media', note = '', aspect = '16 / 9', className = '' }) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#14B8A6]/30 bg-[#14B8A6]/[0.04] px-6 py-10 text-center ${className}`}
      style={{ aspectRatio: aspect }}
      role="img"
      aria-label={`${label} placeholder`}
    >
      <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[#5EEAD4]">
        {label}
      </span>
      {note ? <span className="max-w-[440px] font-[family-name:var(--font-sans)] text-[13px] leading-relaxed text-zinc-400">{note}</span> : null}
    </div>
  )
}

export function Stat({ value, label }) {
  return (
    <div className="border border-white/[0.08] bg-white/[0.02] p-6">
      <div className="font-[family-name:var(--font-display)] text-4xl text-white md:text-5xl">{value}</div>
      <div className="mt-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">{label}</div>
    </div>
  )
}


// Figure / VideoFigure - uniform fixed-aspect media tiles (object-cover) so
// portrait phone photos and landscape screenshots all render consistently,
// matching the ForeSee/BC Connect image discipline.
export function Figure({ src, alt, caption, className = '' }) {
  return (
    <figure className={`self-start ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full rounded-xl border border-white/[0.08]"
      />
      {caption ? (
        <figcaption className="mt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-zinc-500">{caption}</figcaption>
      ) : null}
    </figure>
  )
}

export function VideoFigure({ src, poster, caption, aspect = '16 / 9', className = '' }) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-black" style={{ aspectRatio: aspect }}>
        <video src={src} poster={poster} autoPlay muted loop playsInline preload="metadata" className="h-full w-full object-cover" />
      </div>
      {caption ? (
        <figcaption className="mt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-zinc-500">{caption}</figcaption>
      ) : null}
    </figure>
  )
}
