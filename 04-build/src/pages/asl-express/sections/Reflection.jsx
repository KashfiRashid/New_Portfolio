import { SectionHead, Prose, Highlight } from '../primitives.jsx'

export default function Reflection() {
  return (
    <section id="reflection" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="Reflection" title="Model-builder to system-builder" />
      <Prose className="max-w-[700px]">
        <p>
          Signify taught me to build the brain - can a camera read a sign. ASL Express taught
          me the harder thing: <Highlight>making a whole system work for the person in front
          of it.</Highlight> recognition, interface, and hardware are easy to build alone and
          hard to make trust each other in real time. that integration was my job, and the
          part I grew the most on.
        </p>
        <p>
          It started with a gap on a video call with my cousin that I still can&rsquo;t fully
          close. this didn&rsquo;t close it. but it showed me the work I want to keep doing -
          building things that hand people back a little independence.
        </p>
      </Prose>
    </section>
  )
}
