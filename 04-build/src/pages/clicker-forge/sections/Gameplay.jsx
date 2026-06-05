import { SectionHead, Prose, VideoFigure } from '../primitives.jsx'

const SCENES = [
  { src: '/clicker-forge/Intro_Scene.png', name: 'Intro', use: 'start or open the guide' },
  { src: '/clicker-forge/InstructionScreen.png', name: 'Instructions', use: 'how to play, tools labeled' },
  { src: '/clicker-forge/Casting_Scene.png', name: 'Smelting room', use: 'smelt copper, pour the blade' },
  { src: '/clicker-forge/Hammering_Scene.png', name: 'Hammering room', use: 'hammer it true, add emblem and grip' },
  { src: '/clicker-forge/Outro.png', name: 'Outro', use: 'forged. restart and forge another' },
]

function SceneCard({ src, name, use }) {
  return (
    <figure>
      <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0F0B06]" style={{ aspectRatio: '4 / 3' }}>
        <img src={src} alt={`${name} scene`} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <figcaption className="mt-2 flex flex-wrap items-baseline gap-x-2">
        <span className="font-[family-name:var(--font-display)] text-lg text-white">{name}</span>
        <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-zinc-500">{use}</span>
      </figcaption>
    </figure>
  )
}

export default function Gameplay() {
  return (
    <section id="gameplay" className="scroll-mt-28 border-t border-white/[0.06] py-16 lg:py-24">
      <SectionHead kicker="The scenes" title="Every screen, and what it is for" />
      <Prose className="mb-10 max-w-[640px]">
        <p>The game walks you from the cold forge to a finished sword. Five screens, each built and drawn by hand.</p>
      </Prose>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SCENES.map((s) => (
          <SceneCard key={s.src} src={s.src} name={s.name} use={s.use} />
        ))}
      </div>

      <div className="mt-12">
        <VideoFigure
          src="/clicker-forge/clicker-forge-play-hq.mp4"
          poster="/clicker-forge/Intro.png"
          controls
          aspect="3 / 2"
          caption="Full walkthrough, start to finished sword, in my own voice."
        />
      </div>
    </section>
  )
}
// end Gameplay.jsx
