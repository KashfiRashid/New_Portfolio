import { SectionHead, StatBlock, PullQuote, Highlight } from '../primitives.jsx'

const STATS = [
  { value: '4', label: 'team members' },
  { value: '16 weeks', label: 'build duration' },
  { value: '3 scales', label: '1:1 \u00b7 1:100 \u00b7 1:1000' },
  { value: '3 acts', label: 'narrative structure' },
  { value: '12', label: 'environments modeled' },
  { value: '0 menus', label: 'fully diegetic UI' },
]

export default function Overview() {
  return (
    <section id="overview" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="OVERVIEW"
        title="A failing space station. A presence you never see."
      />
      <div className="max-w-[720px] space-y-5 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          Something Lurking is an immersive VR experience set inside an abandoned space station. The player is Jack, the maintenance crew left behind the night the ship starts failing. The captain&rsquo;s radio cuts. The lights die. Something else is aboard.
        </p>
        <p>
          Four people built this for an Immersive Environments project at SFU SIAT. Eric was the sole 3D modeler. Michael and Kento built the mechanics. <Highlight>I drafted the story, argued the design philosophy, and held the sound.</Highlight>
        </p>
      </div>
      <div className="mt-12">
        <StatBlock stats={STATS} />
      </div>
      <div className="mt-16">
        <PullQuote>
          The threat is the part you never see. The antagonist lives in the sound.
        </PullQuote>
      </div>
    </section>
  )
}
