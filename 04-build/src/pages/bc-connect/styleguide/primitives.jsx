/**
 * BC Connect case study — design-system showcase primitives.
 *
 * The case study runs on a dark canvas (#0F1216). The Open Ground design
 * system is a *white*-themed product. Instead of screenshotting the style
 * guide, we recreate its elements live and frame each one inside an
 * <ExhibitPanel> — a white "museum" surface embedded in the dark page.
 *
 * Inside a panel the world flips to the white product theme (ink text on
 * white ground). Outside it, the dark case-study voice continues — mono
 * kickers and reason notes narrate what the reader is looking at.
 */

/* Open Ground tokens, used verbatim inside the white panels. */
export const OG = {
  white: '#FFFFFF',
  offWhite: '#FAFBFC',
  cloud: '#F3F4F6',
  mist: '#E8EAED',
  fog: '#D1D5DB',
  ink900: '#111218',
  ink700: '#2C2F36',
  ink500: '#4B5162',
  ink400: '#6B7080',
  ink300: '#8B90A0',
  ink200: '#B8BCCA',
  signal: '#1B6B4F',
  signalSoft: '#E6F3EE',
  signalMist: '#D0E8DD',
}

/* ─── PanelChrome — a restrained window bar for "real artifact" credibility ─── */
function PanelChrome({ path }) {
  return (
    <div className="flex items-center gap-3 border-b border-[#E8EAED] bg-[#FAFBFC] px-4 py-2.5">
      <div className="flex shrink-0 gap-1.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-[#E8EAED]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E8EAED]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E8EAED]" />
      </div>
      <span className="min-w-0 flex-1 truncate font-[family-name:var(--font-mono)] text-[11px] tracking-[0.04em] text-[#8B90A0]">
        {path}
      </span>
      <span className="shrink-0 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[#1B6B4F]">
        v3.1
      </span>
    </div>
  )
}

/* ─── ExhibitPanel — the white framed surface the recreations live in ─── */
export function ExhibitPanel({ chrome, grid = false, padded = true, children, className = '' }) {
  return (
    <figure
      className={`m-0 overflow-hidden rounded-2xl bg-white ${className}`}
      style={{ boxShadow: '0 30px 80px -42px rgba(0, 0, 0, 0.9)' }}
    >
      {chrome ? <PanelChrome path={chrome} /> : null}
      <div
        className={padded ? 'p-6 md:p-9' : ''}
        style={
          grid
            ? {
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, #E8EAED 1px, transparent 0)',
                backgroundSize: '22px 22px',
              }
            : undefined
        }
      >
        {children}
      </div>
    </figure>
  )
}

/* ─── PanelHeader — the artifact's own heading, in the white product theme ─── */
export function PanelHeader({ eyebrow, title, children }) {
  return (
    <header className="mb-7">
      {eyebrow ? (
        <p className="mb-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[#1B6B4F]">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="font-[family-name:var(--font-display)] text-[26px] leading-[1.1] tracking-[-0.01em] text-[#111218] md:text-[30px]">
        {title}
      </h3>
      {children ? (
        <p className="mt-2 max-w-[540px] font-[family-name:var(--font-sans)] text-[13px] leading-[1.65] text-[#6B7080]">
          {children}
        </p>
      ) : null}
    </header>
  )
}

/* ─── SpecRow — a mono label / value row inside a panel ─── */
export function SpecRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-[#E8EAED] py-2 last:border-b-0">
      <span className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.12em] text-[#8B90A0]">
        {label}
      </span>
      <span className="text-right font-[family-name:var(--font-mono)] text-[12px] text-[#4B5162]">
        {value}
      </span>
    </div>
  )
}

/* ─── SpecimenGrid — responsive grid for swatches and specimens ─── */
export function SpecimenGrid({ cols = 3, children, className = '' }) {
  const map = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
    5: 'grid-cols-3 sm:grid-cols-5',
    6: 'grid-cols-3 sm:grid-cols-6',
  }
  return (
    <div className={`grid gap-4 ${map[cols] || map[3]} ${className}`}>{children}</div>
  )
}

/* ─── ReasonNote — the case study's "why", spoken on the dark canvas ─── */
export function ReasonNote({ children, className = '' }) {
  return (
    <p
      className={`mt-5 flex gap-3 font-[family-name:var(--font-sans)] text-[15px] leading-relaxed text-zinc-400 ${className}`}
    >
      <span className="mt-[0.6em] h-px w-7 shrink-0 bg-[#1B6B4F]" aria-hidden />
      <span>{children}</span>
    </p>
  )
}

/* ─── ExhibitBlock — the repeating unit: dark kicker + white panel + reason ─── */
export function ExhibitBlock({
  index,
  name,
  chrome,
  grid = false,
  padded = true,
  reason,
  children,
  className = '',
}) {
  return (
    <div className={`scroll-mt-28 ${className}`}>
      <div className="mb-4 flex items-baseline gap-3">
        {index ? (
          <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.16em] text-[#1B6B4F]">
            {index}
          </span>
        ) : null}
        <h4 className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-zinc-500">
          {name}
        </h4>
      </div>
      <ExhibitPanel chrome={chrome} grid={grid} padded={padded}>
        {children}
      </ExhibitPanel>
      {reason ? <ReasonNote>{reason}</ReasonNote> : null}
    </div>
  )
}
