import { MetaBlock, LinkButton } from '../primitives.jsx'

const LINKS = [
  { label: 'SFU showcase', href: 'https://www.sfu.ca/siat/showcase/summer-2024-project-showcase/iat-267-pharmabotics.html' },
  { label: 'GitHub', href: 'https://github.com/harjotsk03/pharmabotics' },
  { label: 'Process video', href: 'https://www.youtube.com/watch?v=q1c3Cv9sw2c' },
]

export default function Hero() {
  return (
    <section className="scroll-mt-28 py-10 lg:py-16">
      <div className="space-y-12">
        <header className="space-y-8">
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[#5EEAD4]">
            15/15 dispenses &middot; SFU SIAT Showcase 2024
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-[56px] font-normal text-white lg:text-[96px]" style={{ letterSpacing: '-0.03em', lineHeight: '0.95' }}>
            PharmaBotics
          </h1>
          <p className="max-w-[680px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
            An autonomous, fingerprint-secured pill dispenser - a full-stack hardware system
            that gets the right medication to the right person at the right time. A React app,
            a Node/Express server, a MongoDB database and an Arduino-driven machine, built by a
            team of three. It dispensed correctly 15 out of 15 times at the SFU showcase.
          </p>
        </header>

        <MetaBlock
          rows={[
            { label: 'My Role', value: 'Dispensing mechanism (3D / Onshape), motion + lid Arduino code, build' },
            { label: 'Team', value: 'Kashfi Rashid / Faaiz Abdullah / Harjot Singh' },
            { label: 'Context', value: 'IAT 267, Intro to Technological Systems - SFU, Summer 2024' },
            { label: 'Result', value: '15/15 successful dispenses at the SFU SIAT Showcase' },
            { label: 'Stack', value: 'React / Node / Express / MongoDB / Arduino Uno + 3 sensors' },
          ]}
        />

        <div className="flex flex-wrap gap-3">
          {LINKS.map((l) => (<LinkButton key={l.href} href={l.href}>{l.label}</LinkButton>))}
        </div>

        <figure>
          <img src="/pharmabotics/machine.png" alt="The PharmaBotics doctor dashboard: patients, their medications, next-dose countdowns, and alerts." loading="eager" className="w-full rounded-xl border border-white/[0.08]" />
          <figcaption className="mt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            The doctor dashboard - every patient, their meds, the next dose, and a live countdown.
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
