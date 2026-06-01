import { SectionHead, Prose, Figure, Highlight } from '../primitives.jsx'

export default function Why() {
  return (
    <section id="why" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="Why this exists" title="The gap on the call" />
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Prose>
          <p>
            I have <Highlight>a cousin who is mute</Highlight>. I am an international student,
            so for years a video call has been the only way we talk. and every call has the
            same gap in it: <Highlight>he signs, and I don&rsquo;t know ASL</Highlight>. I can
            read his face, his energy, the half of it I&rsquo;ve learned to guess. but{' '}
            <Highlight>the language itself doesn&rsquo;t cross the screen</Highlight>.
          </p>
          <p>
            That gap is small and constant. it is also the most ordinary thing in the world
            for millions of people - not just on calls with family, but at counters, in
            waiting rooms, at drive-thrus, anywhere a normal task quietly assumes you can
            speak or hear.
          </p>
          <p>
            I couldn&rsquo;t close that gap on a phone call. but I could start somewhere
            smaller and real, and build toward it.
          </p>
        </Prose>
        <Figure
          src="/asl-express/image_7.png"
          alt="A late-night video call: a blurred figure signing on a glowing screen, a hand reaching toward it from the dark."
          aspect="4 / 5"
          position="center"
          caption="every call, the same gap."
        />
      </div>
    </section>
  )
}
