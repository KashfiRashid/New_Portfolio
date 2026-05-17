import { SectionHead, AppVideo } from '../primitives.jsx'

const V = 'https://kashfirashid.com/media/videos'

const FEATURES = [
  {
    src: `${V}/Documentor_Onboarding.mp4`,
    caption: 'Onboarding · orients without overwhelming',
  },
  {
    src: `${V}/Documentor_Progress_Tracker.mp4`,
    caption: 'Progress tracking · the user always knows where they are',
  },
  {
    src: `${V}/Documentor_Step_by_Step.mp4`,
    caption: 'Step-by-step · one action, then the next',
  },
  {
    src: `${V}/Documentor_Language_Preferences.mp4`,
    caption: 'Language preferences · the guide meets the user in their language',
  },
]

export default function Features() {
  return (
    <section id="features" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="FEATURES" title="Four flows. One principle." />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          Every feature applies the same rule: reduce what the user must hold in their head at once.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {FEATURES.map((f) => (
          <AppVideo key={f.src} src={f.src} caption={f.caption} />
        ))}
      </div>
    </section>
  )
}
