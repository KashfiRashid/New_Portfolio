import { Link } from 'react-router-dom'

// Clicker Forge primitives - same shapes as the other case studies (ASL
// Express / BC Connect) so every page renders as a sibling. Accent: bronze
// / antique gold #C8A24B with #E5C877 bright. Pure ASCII source.

export const CF_ACCENT = '#C8A24B'
export const CF_BRIGHT = '#E5C877'

export const CF_NAV = [
  { id: 'overview', label: 'The pitch' },
  { id: 'inspo', label: 'Inspirations' },
  { id: 'paper', label: 'On paper' },
  { id: 'art', label: 'Art direction' },
  { id: 'gameplay', label: 'Scenes' },
  { id: 'stages', label: 'Built in stages' },
  { id: 'architecture', label: 'Under the hood' },
  { id: 'java', label: 'What I learned in Java' },
  { id: 'generative', label: 'Noise & fractals' },
  { id: 'reflection', label: 'Reflection' },
  { id: 'credits', label: 'Credits' },
]

export function SideNav({ activeId = '' }) {
  return (
    <nav
      className="fixed left-0 top-12 z-40 hidden h-[calc(100vh-3rem)] w-[220px] flex-col border-r border-white/[0.06] bg-[#0F0B06]/95 px-5 py-10 backdrop-blur-sm lg:flex"
      aria-label="Case study sections"
    >
      <Link
        to="/work"
        className="mb-10 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.12em] text-zinc-400 transition-colors hover:text-zinc-200"
      >
        Return
      </Link>
      <ul className="flex flex-col gap-1">
        {CF_NAV.map((item) => {
          const active = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`flex items-center gap-2 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  active ? 'text-[#E5C877]' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span
                  className={`h-1 w-1 shrink-0 rounded-full ${active ? 'bg-[#E5C877]' : 'bg-transparent'}`}
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
      {kicker ? <MonoKicker className="text-[#C8A24B]">{kicker}</MonoKicker> : null}
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
    <mark className={`box-decoration-clone rounded-[3px] bg-[#C8A24B]/25 px-1.5 py-0.5 font-medium text-white ${className}`}>
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
      className="inline-flex items-center gap-1.5 rounded-md border border-[#C8A24B]/40 bg-[#C8A24B]/[0.08] px-4 py-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[#E5C877] transition-colors hover:border-[#C8A24B] hover:bg-[#C8A24B]/[0.16] hover:text-white"
    >
      {children}
    </a>
  )
}

export function Tag({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#C8A24B]/30 bg-[#C8A24B]/[0.06] px-3 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[#E5C877]">
      {children}
    </span>
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

export function Figure({ src, alt, caption, aspect = '3 / 2', position = 'center', fit = 'cover', className = '' }) {
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0F0B06]" style={{ aspectRatio: aspect }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`}
          style={{ objectPosition: position }}
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-zinc-500">{caption}</figcaption>
      ) : null}
    </figure>
  )
}

export function VideoFigure({ src, poster, caption, controls = false, aspect = '3 / 2', className = '' }) {
  const playback = controls
    ? { controls: true, preload: 'metadata' }
    : { autoPlay: true, muted: true, loop: true, playsInline: true, preload: 'metadata' }
  return (
    <figure className={className}>
      <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-black" style={{ aspectRatio: aspect }}>
        <video src={src} poster={poster} {...playback} className="h-full w-full object-cover" />
      </div>
      {caption ? (
        <figcaption className="mt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-zinc-500">{caption}</figcaption>
      ) : null}
    </figure>
  )
}

export function YouTubeEmbed({ id, title = 'Demo video', caption = '', className = '' }) {
  return (
    <figure className={className}>
      <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-black" style={{ aspectRatio: '16 / 9' }}>
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-zinc-500">{caption}</figcaption>
      ) : null}
    </figure>
  )
}

export function CodeBlock({ label, children, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-white/[0.08] bg-[#0F0B06] ${className}`}>
      {label ? (
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-[#C8A24B]" aria-hidden />
          <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-400">{label}</span>
        </div>
      ) : null}
      <pre className="overflow-x-auto px-4 py-4 font-[family-name:var(--font-mono)] text-[12.5px] leading-relaxed text-zinc-300">
        <code>{children}</code>
      </pre>
    </div>
  )
}
// trailing sentinel - guards the closing brace above from tail truncation
