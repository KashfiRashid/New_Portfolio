import { SectionHead, ActionBlock, Highlight } from '../primitives.jsx'

export default function WhatIDid() {
  return (
    <section id="what-i-did" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="WHAT I DID" title="Four roles for one design conscience." />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          I was the only non-engineer on the team. Eric built the world. Michael and Kento built the mechanics. <Highlight>I held the parts of the project that don&rsquo;t compile.</Highlight>
        </p>
      </div>

      <div className="mt-16 space-y-16">
        <ActionBlock n="01" title="Drafted the story arc the team built around.">
          I wrote the three-act spine before any Unity work started: the routine, the descent, the breach. That spine drove where the fuseboxes had to live, why the captain&rsquo;s radio cuts on cue, where the player meets the cracked helmet, and why the ending lands on a growl from behind the escape pod.
        </ActionBlock>

        <ActionBlock n="02" title="Designed the sound. Built the voices. Held the soundscape.">
          The unseen presence has no visual model. By design. That decision pushed all of the antagonist work into the sound layer. I generated the character voices for Captain Harry and Jack in Eleven Labs and treated them in Audacity to sit inside the ship.
        </ActionBlock>

        <ActionBlock n="03" title="Held the iteration loop across mediums.">
          The project moved through whiteboard ideation, paper sketches, Discord coordination, character roughs, Blender blockouts, color and material decisions, Unity integration, and full playtests. I kept that loop honest.
        </ActionBlock>
      </div>
    </section>
  )
}
