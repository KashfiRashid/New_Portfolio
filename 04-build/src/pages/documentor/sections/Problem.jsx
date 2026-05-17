import { SectionHead, AppShot } from '../primitives.jsx'

export default function Problem() {
  return (
    <section id="problem" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="THE PROBLEM I LIVED"
        title="I was the user before I was the designer."
      />
      <div className="max-w-[720px] space-y-5 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          I am an international student. I lived the cognitive overload of dense government websites turning a single task into a stressful, error-prone process.
        </p>
        <p>
          That is not a problem I researched my way into. It is one I started with.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <AppShot
          src="https://kashfirashid.com/media/documentor/Challenges_1.png"
          alt="Screenshot of a typical dense government bureaucracy page, illustrating the cognitive overload an international student faces."
          caption="The wall every international student hits"
        />
        <AppShot
          src="https://kashfirashid.com/media/documentor/Challenges_2.png"
          alt="A second screenshot showing more of the dense, overwhelming layout of typical study-abroad administrative pages."
          caption="Information density without scaffolding"
        />
      </div>
    </section>
  )
}
