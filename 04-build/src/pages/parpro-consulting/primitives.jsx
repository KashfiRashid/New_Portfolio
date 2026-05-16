import { Link } from 'react-router-dom'

/**
 * Parpro Consulting — case study primitives.
 *
 * Shares the dark-canvas register with the other case studies but
 * carries its own accent: Parpro's redesigned brand coral #EC613B
 * with bright variant #F2885A. The coral is the actual CTA color
 * from the prototype Kashfi designed, so the case study theme color
 * ties to the project's own design system.
 */
export {
  MonoKicker,
  SectionHead,
  MetaBlock,
  AssetPlaceholder,
} from '../bc-connect/primitives.jsx'

export const PARPRO_ACCENT = '#EC613B'
export const PARPRO_ACCENT_BRIGHT = '#F2885A'
export const PARPRO_PLACEHOLDER = '#E8A85A'

export const PARPRO_NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'research', label: 'Research' },
  { id: 'original-site', label: 'The Original Site' },
  { id: 'what-i-did', label: 'What I Did' },
  { id: 'user-flow', label: 'User Flow' },
  { id: 'design-system', label: 'Design System' },
  { id: 'interaction-design', label: 'Interaction Design' },
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
        {PARPRO_NAV.map((item) => {
          const active = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`flex items-center gap-2 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  active ? 'text-[#EC613B]' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span
                  className={`h-1 w-1 shrink-0 rounded-full ${active ? 'bg-[#EC613B]' : 'bg-transparent'}`}
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
      className={`mx-auto max-w-3xl text-center font-[family-name:var(--font-display)] text-xl italic leading-relaxed text-[#F2885A] md:text-2xl ${className}`}
    >
      {children}
    </blockquote>
  )
}

export function PainPointCard({ index, title, children, className = '' }) {
  return (
    <article
      className={`flex flex-col gap-3 border border-white/[0.06] bg-white/[0.02] p-6 ${className}`}
    >
      <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[#F2885A]">
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
        <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.16em] text-[#EC613B]">
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

export function KashToProvide({ label = 'Kash', slot = '', description = '', className = '' }) {
  return (
    <span
      role="note"
      aria-label={`Placeholder, awaiting input from Kashfi: ${slot}. ${description}`}
      className={`mx-1 inline-flex items-baseline gap-2 rounded border border-dashed border-[#E8A85A] bg-[#E8A85A]/[0.06] px-2 py-1 align-baseline font-[family-name:var(--font-mono)] text-[11px] leading-snug text-[#E8A85A] ${className}`}
    >
      <span className="text-[9px] uppercase tracking-[0.18em] opacity-70">{label}:</span>
      <span className="not-italic">{slot}{description ? `: ${description}` : ''}</span>
    </span>
  )
}

export function CaptionedMedia({ children, caption, className = '' }) {
  return (
    <figure className={`space-y-3 ${className}`}>
      {children}
      {caption ? (
        <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-600">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
