import {
  BlockShell,
  SerifTitle,
  BodyText,
  CopyPlaceholder,
  ABOUT_GREEN,
} from '../primitives.jsx'

/**
 * Library - Block 3, "on the wall".
 *
 * The Library of People. Text-only block, on purpose. The brief is
 * explicit: this is the most specific personality claim and earns the
 * page by being the least decorated.
 *
 * Framing in Kash's voice: at SIAT, the Library of People is what people
 * call him because the network is dense - name someone in the cohort and
 * there is a good chance he knows them or knows who to ask. Then turn it
 * from personality into method.
 *
 * Closes with one anonymized concrete example: the youCode chair moment.
 * Kash confirms exact wording on that example.
 */
export default function Library() {
  return (
    <BlockShell id="library">
      <SerifTitle>on the wall</SerifTitle>

      <BodyText className="mb-4">
        At SIAT, people call me the Library of People. Name someone in the
        cohort and there is a good chance I know them or I know who to ask.
      </BodyText>
      <BodyText className="mb-4">
        That is not personality. It is method. Ideas travel faster across a
        network than they do inside one head. Projects unstick because
        someone solved the problem in a different course last term.
        Mentors and collaborators arrive on time because the introduction
        was already there.
      </BodyText>

      {/*
        One concrete anonymized example - the youCode chair moment.
        Brief gives the seed phrasing in quotes but flags it as
        Kash-to-confirm wording. Holding it as a visible slot.
      */}
      <CopyPlaceholder
        targetWords="20-30 words"
        note='Closing example \u2014 anonymous, concrete. Brief seed: "sitting down at a chair to help a team with a question I didn&apos;t know the answer to, ending up as part of the team for the next two hours." Kash confirm exact wording.'
      />
    </BlockShell>
  )
}
