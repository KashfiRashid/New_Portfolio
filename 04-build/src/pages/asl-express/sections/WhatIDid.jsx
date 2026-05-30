import { SectionHead, Prose, Highlight } from '../primitives.jsx'

export default function WhatIDid() {
  return (
    <section id="what-i-did" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="My role" title="I handled the front end" />
      <Prose className="max-w-[680px]">
        <p>
          I built the ordering interface in Next.js and shadcn, and wired the three pieces -
          the recognition, the UI, and the ESP32 - into{' '}
          <Highlight>one system that ran in real time.</Highlight>
        </p>
        <p>
          The recognition was my old project, Signify, that I co-built with Hasrat. Rownak
          fine-tuned it for the weekend, Faaiz ran the backend, Riyan built the rig. my part
          was the thing the user actually touches, and making everything behind it talk.
        </p>
        <p className="text-zinc-400">
          The calls I pushed for: confirm with sight, sound, and text at once; keep the
          gesture set small enough that it never fails; never leave the user guessing.
        </p>
      </Prose>
    </section>
  )
}
