import { SectionHead, LinkButton } from '../primitives.jsx'

const TEAM = [
  { name: 'Kashfi Rashid', role: 'Front end, camera & the recognition model' },
  { name: 'Md Rownak Diganta', role: 'Refined the recognition model' },
  { name: 'Faaiz Abdullah', role: 'Backend' },
  { name: 'Riyan Roy', role: 'Hardware - the ESP32 rig' },
]

const LINKS = [
  { label: 'Devpost', href: 'https://devpost.com/software/sign2order-touchless-ai-food-ordering-assistant' },
  { label: 'Frontend repo', href: 'https://github.com/KashfiRashid/ASL_Express' },
  { label: 'Backend repo', href: 'https://github.com/faaizja/ASL_Express_Backend' },
  { label: 'Hardware repo', href: 'https://github.com/RiyanRoy02/ASL_Express_Hardware' },
  { label: 'Signify repo', href: 'https://github.com/KashfiRashid/Signify' },
  { label: 'Signify (SFU showcase)', href: 'https://www.sfu.ca/siat/showcase/fall-2024-project-showcase/iat-360-signify.html' },
  { label: 'StormHacks 2025', href: 'https://stormhacks2025.devpost.com/' },
]

export default function Credits() {
  return (
    <section id="credits" className="scroll-mt-28 border-t border-white/[0.06] py-20 lg:py-28">
      <SectionHead kicker="Credits" title="A team project" />
      <div className="space-y-10">
        <figure>
          <img
            src="/asl-express/Team_win.jpg"
            alt="The ASL Express team at StormHacks 2025 after the Best Hardware win."
            loading="lazy"
            className="w-full max-w-2xl rounded-xl border border-white/[0.08]"
          />
          <figcaption className="mt-3 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            StormHacks 2025, after the win.
          </figcaption>
        </figure>

        <ul className="grid gap-4 sm:grid-cols-2">
          {TEAM.map((t) => (
            <li key={t.name} className="border border-white/[0.08] bg-white/[0.02] p-5">
              <div className="font-[family-name:var(--font-sans)] text-base text-white">{t.name}</div>
              <div className="mt-1 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-zinc-500">{t.role}</div>
            </li>
          ))}
        </ul>

        <p className="font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-400">
          Mentored by Harjot Singh. Signify built in IAT 360 with Hasrat Buttar.
        </p>

        <div className="flex flex-wrap gap-3">
          {LINKS.map((l) => (<LinkButton key={l.href} href={l.href}>{l.label}</LinkButton>))}
        </div>
      </div>
    </section>
  )
}
