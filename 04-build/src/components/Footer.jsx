import { Link } from 'react-router-dom'
import { useCompanion } from '../companion/CompanionContext.jsx'

/**
 * <Footer /> — global, same on every page.
 *
 * Per /02-wireframes/10-footer-and-global.md, top-to-bottom:
 *   1. Changelog line (links to /hall-of-fame, last-update date pulled from
 *      latest shipped entry — server-side data; placeholder for v1)
 *   2. Secret line (Caleb-borrowed pattern, low contrast)
 *      [NEEDS KASH INPUT — open question 32]
 *   3. Sign-off ("built at 2am.") + Bangla pull ("ভালোবাসা সহ.")
 *   4. Land acknowledgment (Vancouver-area / unceded territories)
 *      [NEEDS KASH INPUT — confirm wording for Delta]
 *   5. Contact + reset row (email, phone, "you're here as: [name]" + reset)
 *   6. Links row (LinkedIn, GitHub, ©)
 *
 * @param {object} props
 * @param {object} props.identity — visitor identity from useVisitorIdentity
 * @param {function} props.onReset — clears identity, triggers re-onboarding
 * @param {string|null} props.lastUpdate — ISO date of latest shipped HoF entry
 */
export default function Footer({ identity, onReset, lastUpdate }) {
  const { fire } = useCompanion()

  const handleResetHover = () => {
    fire('H35', { elementId: 'footer-reset-hover' })
  }
  const handleChangelogHover = () => {
    fire('H34', { elementId: 'footer-changelog-hover' })
  }

  const changelogText = lastUpdate
    ? `the site updates when someone helps make it better. last update: ${lastUpdate}`
    : 'the site updates when someone helps make it better. nothing shipped yet. you could be first.'

  return (
    <footer className="mt-32 pt-16 pb-12 border-t border-surface-raised relative">
      {/* Ambient LED line — slow-pulsing warm gradient. Monitor standby feel. */}
      <div className="footer-ambient-line absolute top-0 left-0 right-0" aria-hidden="true" />

      <div className="max-w-3xl mx-auto px-6 space-y-10">

        {/* 1. Changelog */}
        <div
          className="text-text-muted text-sm leading-relaxed"
          onMouseEnter={handleChangelogHover}
        >
          <p>
            {changelogText}{' '}
            <Link
              to="/hall-of-fame"
              className="text-text-primary underline-offset-4 hover:underline"
            >
              → see hall of fame
            </Link>
          </p>
        </div>

        {/* 2. Secret line — [NEEDS KASH INPUT — open question 32] */}
        <div className="text-text-faint text-sm italic leading-relaxed max-w-prose">
          <p>
            {/* Placeholder; replace with the chosen secret line */}
            if you&apos;re reading this, you scrolled all the way down. that&apos;s not nothing.
          </p>
        </div>

        {/* 3. Sign-off + Bangla */}
        <div className="text-text-muted text-sm">
          <p className="text-text-primary">
            built at 2am.
            {' · '}
            <span className="font-bangla italic">ভালোবাসা সহ.</span>
          </p>
          <p className="text-text-faint text-xs mt-1">(with love.)</p>
        </div>

        {/* 4. Land acknowledgment */}
        <div className="text-text-muted text-sm leading-relaxed max-w-prose">
          <p>
            i work on the unceded territories of the
            xʷməθkʷəy̓əm, sḵwx̱wú7mesh, and səlilwətaɬ Nations.
          </p>
        </div>

        {/* 5. Contact + reset */}
        <div className="text-text-muted text-sm space-y-2">
          <p>
            <a href="mailto:contactkashfi@gmail.com" className="hover:text-text-primary transition-colors duration-250">
              contactkashfi@gmail.com
            </a>
            {' · '}
            <a href="tel:+17788811054" className="hover:text-text-primary transition-colors duration-250">
              +1 (778) 881 1054
            </a>
          </p>

          {identity && (
            <p className="text-text-faint">
              you&apos;re here as:{' '}
              <span className="text-text-primary">{identity.name}</span>
              {' · '}
              <span className="text-text-primary">{identity.color.label}</span>
              {' '}
              <span
                aria-hidden="true"
                className="inline-block w-2 h-2 rounded-full align-middle"
                style={{ backgroundColor: identity.color.hex }}
              />
              {' → '}
              <button
                onClick={() => {
                  if (confirm('reset your name and color? this re-triggers the welcome.')) {
                    onReset()
                  }
                }}
                onMouseEnter={handleResetHover}
                className="underline underline-offset-4 hover:text-text-primary transition-colors duration-250"
              >
                reset
              </button>
            </p>
          )}
        </div>

        {/* 6. Links + © */}
        <div className="text-text-faint text-sm flex flex-wrap items-center gap-4 pt-6 border-t border-surface-raised">
          {/* [NEEDS KASH INPUT] confirm LinkedIn + GitHub handles */}
          <a
            href="https://linkedin.com/in/kashfirashid"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-muted transition-colors duration-250"
          >
            linkedin
          </a>
          <a
            href="https://github.com/kashfirashid"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text-muted transition-colors duration-250"
          >
            github
          </a>
          <span className="ml-auto">© 2026 kashfi rashid</span>
        </div>

      </div>
    </footer>
  )
}
