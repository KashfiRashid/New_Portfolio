import { SectionHead, AppVideo, Highlight } from '../primitives.jsx'

const V = '/documentor'

const FEATURES = [
  {
    src: `${V}/Documentor_Onboarding.mp4`,
    caption: 'Onboarding \u00b7 orients without overwhelming',
  },
  {
    src: `${V}/Documentor_Progress_Tracker.mp4`,
    caption: 'Progress tracking \u00b7 the user always knows where they are',
  },
  {
    src: `${V}/Documentor_Step_by_Step.mp4`,
    caption: 'Step-by-step \u00b7 one action, then the next',
  },
  {
    src: `${V}/Documentor_Language_Preferences.mp4`,
    caption: 'Language preferences \u00b7 the guide meets the user in their language',
  },
]

export default function Features() {
  return (
    <section id="features" className="scroll-mt-28 py-20 lg:py-32">
      <SectionHead kicker="FEATURES" title="Four flows. One principle." />
      <div className="max-w-[720px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-200 lg:text-xl">
        <p>
          Every feature applies the same rule: <Highlight>reduce what the user must hold in their head at once.</Highlight>
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-[720px]">
        {FEATURES.map((f) => (
          <AppVideo key={f.src} src={f.src} caption={f.caption} />
        ))}
      </div>
    </section>
  )
}
