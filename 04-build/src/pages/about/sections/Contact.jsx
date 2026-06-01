import { ArchiveBlock, BodyText, QuietLink } from '../primitives.jsx'
import Reveal from '../../../components/Reveal.jsx'

/**
 * Contact - the close + a clean link row (LinkedIn / GitHub / Email / Resume).
 * Pure ASCII source (formatter-safe). Links from kash-fact-sheet.md + profiles.
 * [KASH CONFIRM] contact email differs from your sign-in email.
 */
const LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kashfi-rashid', external: true },
  { label: 'GitHub',   href: 'https://github.com/KashfiRashid',           external: true },
  { label: 'Email',    href: 'mailto:mailkashfirashid@gmail.com',            external: false },
  { label: 'Resume',   href: 'https://drive.google.com/file/d/1ImK5hPzpbQG3AbjY1k5Qz8_LM1tm6tS2/view?usp=sharing', external: true },
]

export default function Contact() {
  return (
    <ArchiveBlock id="contact" label="say hi">
      <Reveal>
        <BodyText>
          Open to design-engineer roles. The{' '}
          <QuietLink href="https://drive.google.com/file/d/1ImK5hPzpbQG3AbjY1k5Qz8_LM1tm6tS2/view?usp=sharing" external>resume</QuietLink> is here if
          it&apos;s useful. Otherwise, the work speaks first.
        </BodyText>

        <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[13px] tracking-[0.02em]">
          {LINKS.map((l, i) => (
            <span key={l.label} className="inline-flex items-center gap-3">
              <QuietLink href={l.href} external={l.external} className="font-mono">
                {l.label}
              </QuietLink>
              {i < LINKS.length - 1 ? (
                <span aria-hidden="true" className="text-text-faint">/</span>
              ) : null}
            </span>
          ))}
        </div>
      </Reveal>
    </ArchiveBlock>
  )
}
