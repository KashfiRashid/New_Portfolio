import { SectionHead, StatBlock, PullQuote } from '../primitives.jsx'

const STATS = [
  { value: '4', label: 'team members' },
  { value: '16 weeks', label: 'build duration' },
  { value: '3 scales', label: '1:1 · 1:100 · 1:1000' },
  { value: '3 acts', label: 'narrative structure' },
  { value: '12', label: 'environments modeled' },
  { value: '0 menus', label: 'fully diegetic UI' },
]

export default function Overview() {
  return (
    <section id="overview" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead
        kicker="OVERVIEW"
        title="A failing space station. Two scales. One presence you never see."
      />
      <div className="max-w-[720px] space-y-5 font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          Something Lurking is a VR experience set aboard a degrading spaceship. The player is Jack, a maintenance crew member on the station the night the ship starts failing. To keep the ship alive Jack shrinks to 1:100 and 1:1000 scales, crawling inside fuseboxes and chip-spaces to repair what is breaking.
        </p>
        <p>
          Four people built this for IAT 445 at SFU. Eric was the sole 3D modeler. Michael and Kento built the mechanics and the socket interactors. I drafted the story, argued the design philosophy, and held the sound. Three engineers and one design conscience.
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
