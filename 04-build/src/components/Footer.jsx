import { Link } from 'react-router-dom'
import { useCompanion } from '../companion/CompanionContext.jsx'

/**
 * <Footer /> - global, same on every page.
 * Refined into the 2am-studio archive register: a serif sign-off centerpiece,
 * mono section labels, a two-column contact/links grid, then the quiet meta
 * rule and the scroll-to-the-bottom secret line.
 *
 * Source stays pure ASCII (the on-save formatter truncates multibyte): the
 * Bangla pull and the land acknowledgment are unicode escapes; output is
 * identical. Punctuation uses HTML entities (&rarr; &copy;).
 *
 * @param {object}        props.identity   - visitor identity (name + color)
 * @param {function}      props.onReset    - clears identity, re-triggers welcome
 * @param {string|null}   props.lastUpdate - ISO date of latest shipped HoF entry
 */
const BANGLA = '\u09ad\u09be\u09b2\u09cb\u09ac\u09be\u09b8\u09be \u09b8\u09b9'
const LAND = 'Built on the unceded ancestral territories of the x\u02b7m\u0259\u03b8k\u02b7\u0259y\u0313\u0259m (Musqueam), S\u1e35wx\u0331w\u00fa7mesh (Squamish), and S\u0259lilw\u0259ta\u026c (Tsleil-Waututh) Nations.'

export default function Footer({ identity, onReset, lastUpdate }) {
  const { fire } = useCompanion()

  const handleResetHover = () => fire('H35', { elementId: 'footer-reset-hover' })
  const handleChangelogHover = () => fire('H34', { elementId: 'footer-changelog-hover' })

  const changelogText = 'a space shooter i built in first year. think you can beat the high score?'

  return (
    <footer className="relative mt-32 border-t border-surface-raised pt-20 pb-16">
      {/* Ambient LED line - slow-pulsing warm gradient. Monitor-standby feel. */}
      <div className="footer-ambient-line absolute left-0 right-0 top-0" aria-hidden="true" />

      <div className="mx-auto w-full max-w-3xl px-6">

        {/* Kicker */}
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-faint">
          colophon
        </p>

        {/* Sign-off - the serif centerpiece + Bangla pull */}
        <div className="mt-6">
          <h2 className="font-display text-[40px] leading-[1.0] tracking-[-0.02em] text-text-primary md:text-[56px]">
            built at 2am.
          </h2>
          <p className="mt-3 font-bangla text-[20px] italic text-text-muted md:text-[22px]">
            {BANGLA}{' '}
            <span className="font-sans text-[13px] not-italic text-text-faint">(with love.)</span>
          </p>
        </div>

        {/* Arcade */}
        <p
          className="mt-12 max-w-prose font-sans text-[14px] leading-relaxed text-text-muted"
          onMouseEnter={handleChangelogHover}
        >
          {changelogText}{' '}
          <Link
            to="/arcade"
            className="text-text-primary underline decoration-[1px] underline-offset-4 transition-colors duration-250 hover:text-accent-glow"
          >
            play the arcade &rarr;
          </Link>
        </p>

        {/* Contact | Elsewhere */}
        <div className="mt-12 grid gap-8 border-t border-surface-raised pt-10 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-faint">Contact</p>
            <div className="mt-3 space-y-1.5 font-sans text-[14px] text-text-muted">
              <p>
                <a href="mailto:mailkashfirashid@gmail.com" className="transition-colors duration-250 hover:text-accent-glow">
                  mailkashfirashid@gmail.com
                </a>
              </p>
            </div>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-faint">Elsewhere</p>
            <div className="mt-3 space-y-1.5 font-sans text-[14px] text-text-muted">
              <p>
                <a href="https://www.linkedin.com/in/kashfi-rashid" target="_blank" rel="noopener noreferrer" className="transition-colors duration-250 hover:text-accent-glow">
                  LinkedIn
                </a>
              </p>
              <p>
                <a href="https://github.com/KashfiRashid" target="_blank" rel="noopener noreferrer" className="transition-colors duration-250 hover:text-accent-glow">
                  GitHub
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Land acknowledgment */}
        <p className="mt-12 max-w-prose font-sans text-[12px] leading-relaxed text-text-faint">
          {LAND}
        </p>

        {/* Meta rule: identity + reset / copyright */}
        <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-surface-raised pt-8 font-mono text-[11px] tracking-[0.02em] text-text-faint">
          {identity ? (
            <span>
              you&apos;re here as{' '}
              <span className="text-text-muted">{identity.name}</span>{' '}
              <span
                aria-hidden="true"
                className="inline-block h-2 w-2 rounded-full align-middle"
                style={{ backgroundColor: identity.color.hex }}
              />{' '}
              <button
                onClick={() => {
                  if (confirm('reset your name and color? this re-triggers the welcome.')) {
                    onReset()
                  }
                }}
                onMouseEnter={handleResetHover}
                className="underline underline-offset-4 transition-colors duration-250 hover:text-accent-glow"
              >
                reset
              </button>
            </span>
          ) : null}
          <span className="ml-auto">&copy; 2026 Kashfi Rashid</span>
        </div>

        {/* Secret line - for whoever scrolls all the way down */}
        <p className="mt-10 font-display text-[14px] italic leading-relaxed text-text-faint">
          if you&apos;re reading this, you scrolled all the way down. that&apos;s not nothing.
        </p>

      </div>
    </footer>
  )
}
