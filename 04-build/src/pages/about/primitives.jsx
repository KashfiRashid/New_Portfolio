/**
 * about/primitives.jsx — shared blocks for the About page.
 *
 * REVISION 3 — fonts now match the rest of the site exactly.
 * Tailwind font families used site-wide:
 *   font-display → Editorial New → Reckless Neue → Georgia → ui-serif
 *                  (Editorial New is unloaded → Georgia is what renders)
 *   font-sans    → Inter (Söhne / Geist Sans / system-ui fallback)
 *   font-mono    → JetBrains Mono (Geist Mono / ui-monospace fallback)
 *
 * Palette stays in the dark 2am studio register.
 */

/* The about-page palette — matched to the site tokens. */
export const ABOUT_INK    = '#E8E6E1' // text.primary
export const ABOUT_MUTED  = '#9C9A95' // text.muted
export const ABOUT_FAINT  = '#6B6963' // text.faint
export const ABOUT_PAPER  = '#0F1112' // surface.deep
export const ABOUT_ACCENT = '#E8B86A' // accent.glow — warm amber
export const ABOUT_GREEN  = ABOUT_ACCENT // legacy alias

/* ----------------------------------------------------------------------- */
/* Layout                                                                  */
/* ----------------------------------------------------------------------- */

export function BlockShell({ id, children, className = '' }) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-[680px] px-6 py-20 md:py-24 ${className}`}
    >
      {children}
    </section>
  )
}

export function WideShell({ id, children, className = '' }) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-[1040px] px-6 py-20 md:py-24 ${className}`}
    >
      {children}
    </section>
  )
}

/* ----------------------------------------------------------------------- */
/* Type — uses tailwind font-* classes that match the rest of the site.    */
/* ----------------------------------------------------------------------- */

export function SerifTitle({ children, className = '' }) {
  return (
    <h2
      className={`font-display mb-6 text-[28px] leading-[1.1] tracking-[-0.01em] text-text-primary md:text-[34px] ${className}`}
    >
      {children}
    </h2>
  )
}

export function SerifHeadline({ children, size = 'lg', className = '' }) {
  const scale =
    size === 'lg'
      ? 'text-[56px] leading-[0.95] md:text-[88px]'
      : 'text-[28px] leading-[1.1] md:text-[40px]'
  return (
    <h1 className={`font-display tracking-[-0.02em] ${scale} ${className}`}>
      {children}
    </h1>
  )
}

export function BodyText({ children, className = '' }) {
  return (
    <p
      className={`font-sans text-text-primary text-[17px] leading-[1.65] ${className}`}
    >
      {children}
    </p>
  )
}

export function BodyProse({ children, className = '' }) {
  return (
    <div
      className={`font-sans text-text-primary space-y-5 text-[17px] leading-[1.65] ${className}`}
    >
      {children}
    </div>
  )
}

export function MonoLine({ children, size = 'sm', className = '' }) {
  const scale = size === 'xs' ? 'text-[11px]' : size === 'md' ? 'text-[14px]' : 'text-[12px]'
  return (
    <p
      className={`font-mono text-text-primary tracking-[0.02em] ${scale} ${className}`}
    >
      {children}
    </p>
  )
}

/**
 * CaptionLine — small italic caption beneath a photo. Uses font-display so
 * it reads as a signed label, not body text.
 */
export function CaptionLine({ children, className = '' }) {
  return (
    <figcaption
      className={`font-display mt-2 text-center text-[14px] italic text-text-muted md:text-[15px] ${className}`}
    >
      {children}
    </figcaption>
  )
}

/* ----------------------------------------------------------------------- */
/* Links                                                                   */
/* ----------------------------------------------------------------------- */

export function QuietLink({ href, children, external = false, className = '' }) {
  const extProps = external
    ? { target: '_blank', rel: 'noopener noreferrer' }
    : {}
  return (
    <a
      href={href}
      {...extProps}
      className={`font-sans text-text-primary underline decoration-[1px] underline-offset-[3px] transition-colors duration-200 hover:decoration-2 hover:text-accent-glow ${className}`}
      style={{ textDecorationColor: ABOUT_ACCENT }}
    >
      {children}
    </a>
  )
}

/* ----------------------------------------------------------------------- */
/* Placeholders                                                            */
/* ----------------------------------------------------------------------- */

export function AssetPlaceholder({
  kind = 'ASSET',
  filename = '',
  dimensions = '',
  description = '',
  aspect = '16 / 9',
  maxWidth = '720px',
  className = '',
}) {
  return (
    <div
      role="img"
      aria-label={`${kind} placeholder. ${description}`}
      className={`mx-auto flex w-full flex-col items-center justify-center gap-1 border border-dashed px-6 py-10 text-center ${className}`}
      style={{
        aspectRatio: aspect,
        maxWidth,
        borderColor: 'rgba(232,230,225,0.18)',
        backgroundColor: 'rgba(232,184,106,0.04)',
      }}
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent-glow">
        {kind} pending
      </span>
      {filename ? (
        <span
          className="font-mono mt-2 px-2 py-1 text-[11px] text-text-primary"
          style={{ backgroundColor: 'rgba(232,230,225,0.06)' }}
        >
          save as: {filename}
        </span>
      ) : null}
      {dimensions ? (
        <span className="font-mono mt-1 text-[11px] text-text-muted">
          {dimensions}
        </span>
      ) : null}
      {description ? (
        <p className="font-sans mt-2 max-w-[420px] text-[13px] leading-[1.5] text-text-muted">
          {description}
        </p>
      ) : null}
    </div>
  )
}

export function CopyPlaceholder({ targetWords = '', note = '', className = '' }) {
  return (
    <div
      className={`border-l-2 py-3 pl-4 ${className}`}
      style={{ borderColor: ABOUT_ACCENT, backgroundColor: 'rgba(232,184,106,0.05)' }}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-glow">
        body copy pending
      </p>
      {targetWords ? (
        <p className="font-mono mt-1 text-[12px] text-text-muted">
          target: {targetWords}
        </p>
      ) : null}
      {note ? (
        <p className="font-sans mt-2 text-[13px] leading-[1.5] text-text-muted">
          {note}
        </p>
      ) : null}
    </div>
  )
}
