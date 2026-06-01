import { ArchiveBlock, BodyText, QuietLink } from '../primitives.jsx'
import Reveal from '../../../components/Reveal.jsx'

/**
 * Bio - opening archive block. Warm first-person prose in Kash's voice;
 * folds in the Library-of-People method, hands off to the photo wall.
 * Pure ASCII source (formatter-safe).
 */
export default function Bio() {
  return (
    <ArchiveBlock id="bio" label="about">
      <Reveal>
        <div className="space-y-5">
          <BodyText>
            I&apos;m Kashfi, Kash to most people. Designer, developer, sound
            person, son. Mostly the same person in each.
          </BodyText>

          <BodyText>
            I work as a design engineer, finishing my BSc at{' '}
            <QuietLink href="https://www.sfu.ca/siat.html" external>
              SFU&apos;s School of Interactive Arts &amp; Technology
            </QuietLink>
            . I design the thing, then build it - I&apos;ve never been good at
            picking a side.
          </BodyText>

          <BodyText>
            At SIAT people call me the Library of People. Name someone in the
            cohort and there&apos;s a good chance I know them, or I know who to
            ask. That&apos;s not personality, it&apos;s method. Ideas travel
            faster across a network than they do inside one head.
          </BodyText>

          <BodyText className="text-text-muted">
            Most of what I make happens around 2am. when i&apos;m not at the
            desk, you can usually find me here:
          </BodyText>
        </div>
      </Reveal>
    </ArchiveBlock>
  )
}
