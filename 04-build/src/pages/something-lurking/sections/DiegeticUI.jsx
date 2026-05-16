import { SectionHead, Figure } from '../primitives.jsx'

export default function DiegeticUI() {
  return (
    <section id="diegetic-ui" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="THE DIEGETIC UI DECISION"
        title="Removing the menus is the easy part."
      />
      <div className="max-w-[720px] space-y-5 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          Early in pre-production the team decided the UI would be fully diegetic. No 2D menus. No floating health bars. No HUD overlays. Inspired by Dead Space, where the player's vitals appear on the suit, every piece of information lives in the world. This was a team decision, not my individual call. I want to be clear about that. The instinct to remove the UI was collective.
        </p>
        <p>
          What we missed: removing UI does not remove the need for feedback. The diegetic interaction layer was designed early. The diegetic feedback layer was not. After the P1 review, the professor named audio and visual feedback as the project's clearest weakness, especially around interactable objects. We patched it in the final cut. Color-based puzzle feedback on the fusebox and the chip-space. Highlighted scale buttons. Poke interactions instead of unrealistic raycast button presses. Better armband models.
        </p>
        <p>
          The honest version: we treated "no UI" as the design rule and forgot that no UI just shifts the feedback work elsewhere. Next time I would design the diegetic feedback layer at the same time as the diegetic interaction layer.
        </p>
      </div>

      <Figure
        className="mt-16"
        src="/something-lurking/fig-armband-poke.png"
        alt="Two screenshots showing the diegetic UI. Left: the player using a poke interactor on the wrist-mounted armband. Right: a player pressing an in-world elevator switch labelled 'Activate Elevator'."
        label="Figure 3"
        caption="Diegetic UI · wrist armband (poke) and external elevator switch"
      />
    </section>
  )
}
