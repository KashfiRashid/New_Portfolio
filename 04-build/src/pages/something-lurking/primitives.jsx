import { Link } from 'react-router-dom'

/**
 * Something Lurking — case study primitives.
 *
 * Shares the dark-canvas register with bc-connect, blu, and spectral-bloom
 * (same fonts, same layout rhythm) but carries its own accent: emergency
 * red #C8362A with a bright variant #E85850 and a sickly green #7FA050
 * counterpoint used inside diagrams for the 1:1000 bioluminescent register.
 *
 * Accent-neutral primitives (SectionHead, MonoKicker, MetaBlock) are
 * re-exported straight from bc-connect so there is one source of truth.
 * The accented ones are redefined here in emergency red.
 */
export { SectionHead, MonoKicker, MetaBlock } from '../bc-connect/primitives.jsx'

export const SL_ACCENT = '#C8362A'
export const SL_ACCENT_BRIGHT = '#E85850'
export const SL_COOL = '#7FA050'

export const SL_NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'premise', label: 'The Premise' },
  { id: 'what-i-did', label: 'What I Did' },
  { id: 'translation', label: 'Coursework to Puzzle' },
  { id: 'sound', label: 'Sound as Architecture' },
  { id: 'diegetic-ui', label: 'Diegetic UI' },
  { id: 'iteration', label: 'P1 to Final' },
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
        {SL_NAV.map((item) => {
          const active = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`flex items-center gap-2 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  active ? 'text-[#C8362A]' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span
                  className={`h-1 w-1 shrink-0 rounded-full ${active ? 'bg-[#C8362A]' : 'bg-transparent'}`}
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

export function PullQuote({ children, className = '' }) {
  return (
    <blockquote
      className={`mx-auto max-w-3xl text-center font-[family-name:var(--font-display)] text-xl italic leading-relaxed text-[#E85850] md:text-2xl ${className}`}
    >
      {children}
    </blockquote>
  )
}

export function StepCard({ step, title, children, className = '' }) {
  return (
    <article className={`space-y-6 py-16 ${className}`}>
      <div className="space-y-3">
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[#C8362A]">
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

export function PainPointCard({ index, title, children, className = '' }) {
  return (
    <article
      className={`flex flex-col gap-3 border border-white/[0.06] bg-white/[0.02] p-6 ${className}`}
    >
      <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[#E85850]">
        Pain Point #{index}
      </span>
      {title ? (
        <h3 className="font-[family-name:var(--font-sans)] text-lg font-medium text-white">{title}</h3>
      ) : null}
      <div className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-400">{children}</div>
    </article>
  )
}

/**
 * ActionBlock — the WHAT I DID layout. Numbered, titled, body prose, with
 * room for a single illustrative image below. Matches the StepCard rhythm
 * but stays inline with its evidence.
 */
export function ActionBlock({ n, title, children, className = '' }) {
  return (
    <article className={`space-y-4 ${className}`}>
      <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#C8362A]">
        Action {n}
      </p>
      <h3 className="font-[family-name:var(--font-display)] text-2xl font-normal text-white md:text-3xl">
        {title}
      </h3>
      <div className="max-w-[760px] font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-300 md:text-base">
        {children}
      </div>
    </article>
  )
}

export function StatBlock({ stats = [] }) {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-zinc-800 bg-zinc-800 md:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-[#0F1216] p-6">
          <p className="font-[family-name:var(--font-display)] text-[36px] font-normal leading-none tracking-[-0.02em] text-white lg:text-[48px]">
            {stat.value}
          </p>
          <p className="mt-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  )
}

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
      <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[#E85850]">
        {kind} placeholder
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
      {annotate ? (
        <p className="mt-1 max-w-md font-[family-name:var(--font-sans)] text-xs italic text-zinc-500">
          Annotate: {annotate}
        </p>
      ) : null}
    </div>
  )
}

/**
 * Figure — captioned image, used everywhere the case study lands a real
 * artifact from the project report or the build. The figure number and
 * label echo the academic register the work came from.
 */
export function Figure({ src, alt, caption, label, className = '' }) {
  return (
    <figure className={`space-y-3 ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full rounded-lg border border-white/[0.08]"
      />
      <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-600">
        {label ? <span className="text-[#E85850]">{label}</span> : null}
        {label && caption ? <span className="mx-2 text-zinc-700">·</span> : null}
        {caption ? <span>{caption}</span> : null}
      </figcaption>
    </figure>
  )
}
