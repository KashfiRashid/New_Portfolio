import { SectionHead, Figure, Highlight } from '../primitives.jsx'

export default function DiegeticUI() {
  return (
    <section id="diegetic-ui" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="THE DIEGETIC UI DECISION"
        title="Removing the menus is the easy part."
      />
      <div className="max-w-[720px] space-y-5 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          Early in pre-production the team decided the UI would be fully diegetic. No 2D menus. No floating health bars. No HUD overlays. Inspired by Dead Space, every piece of information lives in the world.
        </p>
        <p>
          What we missed: <Highlight>removing UI does not remove the need for feedback.</Highlight> The diegetic interaction layer was designed early. The diegetic feedback layer was not. We patched it in the final cut: color-based puzzle feedback, highlighted scale buttons, poke interactions instead of unrealistic raycasts.
        </p>
      </div>

      <Figure
        className="mt-16"
        src="/something-lurking/fig-armband-poke.png"
        alt="Two screenshots showing the diegetic UI."
        label="Figure 3"
        caption="Diegetic UI · wrist armband (poke) and external elevator switch"
      />
    </section>
  )
}
