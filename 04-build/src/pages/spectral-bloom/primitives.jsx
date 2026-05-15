import { Link } from 'react-router-dom'

/**
 * Spectral Bloom — case study primitives.
 *
 * Shares the bc-connect dark-canvas register (same fonts, same layout
 * rhythm) but carries its own accent: magenta #FF3D6E, with a bright
 * variant #FF7DA3 and an electric-blue counterpoint #4F8BFF used inside
 * diagrams for "before" / cool-side states.
 *
 * Accent-neutral primitives (SectionHead, MonoKicker, MetaBlock) are
 * re-exported straight from bc-connect so there is one source of truth.
 * The accented ones are redefined here in magenta.
 */
export { SectionHead, MonoKicker, MetaBlock } from '../bc-connect/primitives.jsx'

export const SB_ACCENT = '#FF3D6E'
export const SB_ACCENT_BRIGHT = '#FF7DA3'
export const SB_COOL = '#4F8BFF'

export const SB_NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'the-pivot', label: 'The Pivot' },
  { id: 'synesthesia', label: 'Synesthesia Engine' },
  { id: 'audio', label: 'Audio Features' },
  { id: 'modes', label: 'Five Modes' },
  { id: 'engine', label: 'Under the Hood' },
  { id: 'scaling', label: 'Scaling Vision' },
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
        {SB_NAV.map((item) => {
          const active = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`flex items-center gap-2 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  active ? 'text-[#FF3D6E]' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span
                  className={`h-1 w-1 shrink-0 rounded-full ${active ? 'bg-[#FF3D6E]' : 'bg-transparent'}`}
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
      className={`mx-auto max-w-3xl text-center font-[family-name:var(--font-display)] text-xl italic leading-relaxed text-[#FF7DA3] md:text-2xl ${className}`}
    >
      {children}
    </blockquote>
  )
}

export function StepCard({ step, title, children, className = '' }) {
  return (
    <article className={`space-y-6 py-16 ${className}`}>
      <div className="space-y-3">
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[#FF3D6E]">
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
      <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[#FF7DA3]">
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
 * StatBlock — headline numbers at a glance. A non-technical reader should
 * grasp the scale of the build in one look. Every figure traces back to
 * the source (the HTML, the README, the deck). Nothing invented.
 */
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

/**
 * AssetPlaceholder — dashed slot carrying everything Kash needs to drop in
 * a real asset: exact filename, dimensions, plain-words description, and
 * optional annotation guidance. Swap for an <img>/<video> when the file
 * lands in /public/spectral-bloom/.
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
      <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[#FF7DA3]">
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
