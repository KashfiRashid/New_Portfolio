import { useState } from 'react'
import { Link } from 'react-router-dom'

/**
 * DocuMentor — case study primitives.
 *
 * Shares the dark-canvas register with the other case studies but
 * carries its own accent: marigold orange #E8A53B with a bright
 * variant #F4C26B. The marigold reads warm and welcoming — matches
 * the actual DocuMentor app's primary brand color, so the case
 * study theme echoes the product the visitor will see embedded in
 * the diagrams and screenshots. Distinct from bc-connect green,
 * spectral-bloom magenta, blu cyan, something-lurking purple, and
 * parpro coral — none of these warm tones overlap.
 */
export {
  MonoKicker,
  SectionHead,
  MetaBlock,
  AssetPlaceholder,
} from '../bc-connect/primitives.jsx'

export const DOC_ACCENT = '#E8A53B'
export const DOC_ACCENT_BRIGHT = '#F4C26B'

export const DOC_NAV = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem I Lived' },
  { id: 'bias-check', label: 'Checking My Bias' },
  { id: 'what-i-did', label: 'What I Did' },
  { id: 'micro-step', label: 'Micro-Step Model' },
  { id: 'build', label: 'The Build' },
  { id: 'features', label: 'Features in Motion' },
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
        {DOC_NAV.map((item) => {
          const active = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`flex items-center gap-2 py-1.5 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] transition-colors ${
                  active ? 'text-[#F4C26B]' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <span
                  className={`h-1 w-1 shrink-0 rounded-full ${active ? 'bg-[#F4C26B]' : 'bg-transparent'}`}
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
      className={`mx-auto max-w-3xl text-center font-[family-name:var(--font-display)] text-xl italic leading-relaxed text-[#F4C26B] md:text-2xl ${className}`}
    >
      {children}
    </blockquote>
  )
}

export function ActionBlock({ n, title, children, className = '' }) {
  return (
    <article className={`space-y-4 ${className}`}>
      <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[#F4C26B]">
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

export function AppShot({ src, alt, caption, className = '' }) {
  const [failed, setFailed] = useState(false)
  return (
    <figure className={`space-y-3 ${className}`}>
      {failed ? (
        <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-white/[0.02]">
          <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            asset pending
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="w-full rounded-lg border border-white/[0.06] bg-black object-contain"
        />
      )}
      {caption ? (
        <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-600">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

export function AppVideo({ src, caption, className = '' }) {
  const [failed, setFailed] = useState(false)
  return (
    <figure className={`space-y-3 ${className}`}>
      {failed ? (
        <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-white/[0.02]">
          <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            asset pending
          </span>
        </div>
      ) : (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          controls
          onError={() => setFailed(true)}
          className="w-full rounded-lg border border-white/[0.06] bg-black object-contain"
        />
      )}
      {caption ? (
        <figcaption className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-zinc-600">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}