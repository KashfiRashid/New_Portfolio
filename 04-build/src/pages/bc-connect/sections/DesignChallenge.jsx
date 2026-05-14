import { MonoKicker } from '../primitives.jsx'

export default function DesignChallenge() {
  return (
    <section id="design-challenge" className="scroll-mt-28 py-20 lg:py-32">
      <div className="flex flex-col items-center text-center">
        <MonoKicker>DESIGN CHALLENGE</MonoKicker>
        <h2 className="mt-6 max-w-[900px] font-[family-name:var(--font-display)] text-[48px] font-normal leading-tight tracking-tight text-white lg:text-[72px]">
          How might we build a single directory of BC's startup ecosystem that respects the data, surfaces the invisible regions, and gets out of the user's way?
        </h2>
      </div>
    </section>
  )
}
