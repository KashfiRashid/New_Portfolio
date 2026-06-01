import { BlockShell, SerifTitle, BodyText, QuietLink } from '../primitives.jsx'

/**
 * Close - Block 6, "by the lamp".
 *
 * Under 40 words. Open to design-engineer
 * roles. One inline quiet-underline link: "resume" linking to the resume (Google Drive).
 * No download button, no social grid, no large CTA.
 */
export default function Close() {
  return (
    <BlockShell id="close" className="pt-12 pb-16">
      <SerifTitle>by the lamp</SerifTitle>

      <BodyText>
        Open to design-engineer roles. The{' '}
        <QuietLink href="https://drive.google.com/file/d/1ImK5hPzpbQG3AbjY1k5Qz8_LM1tm6tS2/view?usp=sharing" external>resume</QuietLink> is here
        if it is useful. Otherwise, the work speaks first.
      </BodyText>
    </BlockShell>
  )
}
