import { SectionHead, ActionBlock, PullQuote } from '../primitives.jsx'

export default function WhatIDid() {
  return (
    <section id="what-i-did" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="WHAT I DID" title="Four roles for one design conscience." />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          I was the only non-engineer on the team. Eric built the world. Michael and Kento built the mechanics. I held the parts of the project that do not compile.
        </p>
      </div>

      <div className="mt-16 space-y-16">
        <ActionBlock n="01" title="Drafted the story arc the team built around.">
          I wrote the three-act spine before any Unity work started: the routine, the descent, the breach. That spine drove where the fuseboxes had to live, why the captain's radio cuts on cue, where the player meets the cracked helmet, and why the ending lands on a growl from behind the escape pod. The team report says it directly: the location models of the fusebox and the vent were chosen <em>based on the story arc provided by Kashfi</em>.
        </ActionBlock>

        <ActionBlock n="02" title="Translated two earlier design papers into the project's mechanic spine.">
          The first paper argued that scaling without mechanical purpose is empty spectacle. Shrinking has to do something: retrieve items, reach restricted areas, repair systems. The second proposed pipe and valve mechanics, hand-driven manipulation at small scale. Both arguments became the project's puzzle vocabulary. The fusebox at 1:100, the wire and circuit work at 1:1000, the valve and pipe logic in the vents. The puzzles exist because that earlier design work proposed them.
        </ActionBlock>

        <ActionBlock n="03" title="Designed the sound. Built the voices. Held the soundscape.">
          The unseen presence has no visual model. By design. That decision pushed all of the antagonist work into the sound layer. I generated the character voices for Captain Harry and Jack in Eleven Labs and treated them in Audacity to sit inside the ship: reverb for the corridor geometry, EQ to suggest distance through metal walls, low-frequency growls that read as something breathing behind a door. Audacity also handled the environmental cues directly: footsteps, alarms, the banging on the door before the escape pod.
        </ActionBlock>

        <ActionBlock n="04" title="Held the iteration loop across mediums.">
          The project moved through whiteboard ideation, paper sketches, Discord coordination, character roughs, Blender blockouts, color and material decisions, Unity integration, and full playtests. I kept that loop honest. I made sure the story spine stayed visible while the engineers absorbed the mechanic work. Small wins along the way mattered. A voice line that landed. A vent geometry that read clearly at 1:1000.
        </ActionBlock>
      </div>

      <div className="mt-20">
        <PullQuote>
          I held the parts of the project that don't compile.
        </PullQuote>
      </div>
    </section>
  )
}
