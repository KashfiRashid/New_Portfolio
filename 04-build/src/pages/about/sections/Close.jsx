import { BlockShell, SerifTitle, BodyText, QuietLink } from '../primitives.jsx'

/**
 * Close - Block 6, "by the lamp".
 *
 * Under 40 words. Graduating June 10, 2026. Open to design-engineer
 * roles. One inline quiet-underline link: "resume" linking to the resume (Google Drive).
 * No download button, no social grid, no large CTA.
 */
export default function Close() {
  return (
    <BlockShell id="close" className="pt-12 pb-16">
      <SerifTitle>by the lamp</SerifTitle>

      <BodyText>
        Graduating June 10, 2026. Open to design-engineer roles. The{' '}
        <QuietLink href="https://drive.google.com/file/d/1Xkc3TBm40Nrc7kQFNv8FEMYcAeOPt0xg/view?usp=sharing" external>resume</QuietLink> is here
        if it is useful. Otherwise, the work speaks first.
      </BodyText>
    </BlockShell>
  )
}
