import { SectionHead, ActionBlock, PullQuote } from '../primitives.jsx'

export default function WhatIDid() {
  return (
    <section id="what-i-did" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="WHAT I DID"
        title="Led the vision. Tested the assumption. Held the through-line."
      />

      <div className="mt-12 space-y-16">
        <ActionBlock n="01" title="Defined the design challenge from lived experience, then disowned my own bias.">
          I framed the challenge around cognitive overload because I had felt it. Then I treated my own experience as a hypothesis to test, not a brief to execute. The 45 interviews were the test.
        </ActionBlock>

        <ActionBlock n="02" title="Led the UX direction through rapid sketching.">
          I drove rapid sketching and iteration to set direction. I finalized the design around two concepts: decomposing tasks into micro-steps, and making progress continuously visible. Those two ideas are the entire product thesis.
        </ActionBlock>

        <ActionBlock n="03" title="Directed a team without doing their jobs for them.">
          As UX Lead I held the vision while Mariyam ran research that validated it and Kate refined the UI that delivered it. My job was the through-line: making sure the micro-step logic survived from research into final screens.
        </ActionBlock>

        <ActionBlock n="04" title="Validated with the people I designed for.">
          12 international students tested the app over 2 weeks. 11 of 12 reported satisfied. The people who had the problem confirmed the solution, which is the only validation that counts here.
        </ActionBlock>
      </div>

      <div className="mt-20">
        <PullQuote>
          Personal experience is a design asset only if you are willing to test it against people who are not you.
        </PullQuote>
      </div>
    </section>
  )
}
