import { BlockShell, SerifTitle, BodyText, QuietLink } from '../primitives.jsx'

/**
 * Close — Block 6, "by the lamp".
 *
 * Under 40 words. Graduating June 10, 2026. Open to design-engineer
 * roles. One inline quiet-underline link: "resume" linking to /resume.pdf.
 * No download button, no social grid, no large CTA.
 */
export default function Close() {
  return (
    <BlockShell id="close" className="pt-12 pb-16">
      <SerifTitle>by the lamp</SerifTitle>

      <BodyText>
        Graduating June 10, 2026. Open to design-engineer roles. The{' '}
        <QuietLink href="/resume.pdf" external>resume</QuietLink> is here
        if it is useful. Otherwise, the work speaks first.
      </BodyText>
    </BlockShell>
  )
}
