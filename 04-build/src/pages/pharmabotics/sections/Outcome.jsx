import { SectionHead, Prose, Stat, LinkButton, Figure } from '../primitives.jsx'

const NEXT = [
  'Stepper motors for true positional precision',
  'Real authentication and encryption, not ID-matching',
  'Medical-grade fail-safes and audit logging',
  'The regulatory reality of a real medical device',
]
const LINKS = [
  { label: 'SFU showcase', href: 'https://www.sfu.ca/siat/showcase/summer-2024-project-showcase/iat-267-pharmabotics.html' },
  { label: 'GitHub', href: 'https://github.com/harjotsk03/pharmabotics' },
  { label: 'Process video', href: 'https://youtu.be/q1c3Cv9sw2c' },
]

export default function Outcome() {
  return (
    <section id="outcome" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="Outcome" title="It worked - watch it run" />
      <div className="space-y-10">
        <Figure src="/pharmabotics/finished-machine.jpg" alt="The finished PharmaBotics machine - a labeled box with a dispensing bay - at the SFU showcase." caption="The finished machine at the SFU showcase: dispensing bay, LEDs, and the PharmaBotics label." />
        <figure>
          <video src="/pharmabotics/highlight-reel.mp4" poster="/pharmabotics/reel-poster.jpg" controls playsInline preload="metadata" className="w-full rounded-xl border border-white/[0.08]" />
          <figcaption className="mt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-zinc-500">The PharmaBotics highlight reel - login, dispense, confirm.</figcaption>
        </figure>
        <div className="grid gap-3 sm:grid-cols-3">
          <Stat value="15/15" label="successful dispenses at the showcase" />
          <Stat value="3" label="sensors: fingerprint, ultrasonic, pressure" />
          <Stat value="3" label="layers: client, server, Arduino" />
        </div>
        <Prose className="max-w-[700px]">
          <p>
            It is a working prototype, not a product - and I will say so plainly. The enclosure
            is foam board, the motors needed tuning, the auth is ID-matching, and it runs on one
            machine over localhost. It proved the concept end to end and demoed flawlessly; it
            was never built for clinical deployment.
          </p>
          <p>What a real version would need:</p>
        </Prose>
        <ul className="space-y-2 border-l border-[#14B8A6]/40 pl-6">
          {NEXT.map((n) => (<li key={n} className="font-[family-name:var(--font-sans)] text-base leading-relaxed text-zinc-300">{n}</li>))}
        </ul>
        <p className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-400">
          Team: Kashfi Rashid, Faaiz Abdullah, Harjot Singh. IAT 267, Professor Rafael Aries.
        </p>
        <div className="flex flex-wrap gap-3">
          {LINKS.map((l) => (<LinkButton key={l.href} href={l.href}>{l.label}</LinkButton>))}
        </div>
      </div>
    </section>
  )
}
