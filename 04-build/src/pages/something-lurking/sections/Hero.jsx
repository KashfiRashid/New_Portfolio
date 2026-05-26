import { MetaBlock, LinkButton } from '../primitives.jsx'

const LINKS = [
  {
    label: 'SFU Showcase ↗',
    href: 'https://www.sfu.ca/siat/showcase/fall-2025-project-showcase/iat-445-something-lurking.html',
  },
  {
    label: 'LinkedIn post ↗',
    href: 'https://www.linkedin.com/posts/kashfi-rashid_vr-dedication-siat-ugcPost-7422011407979798528-gaOW/',
  },
  {
    label: 'Comic PDF ↗',
    href: 'https://www.sfu.ca/content/dam/sfu/siat/Showcase/2025-Fall/IAT-445-Something-Lurking/Something_Lurking_Comic.pdf',
  },
]

export default function Hero() {
  return (
    <section className="scroll-mt-28 py-20 lg:py-32">
      <div className="space-y-12">
        <header className="space-y-8">
          <h1
            className="font-[family-name:var(--font-display)] text-[56px] font-normal text-white lg:text-[96px]"
            style={{ letterSpacing: '-0.03em', lineHeight: '0.95' }}
          >
            Something Lurking
          </h1>
          <p className="max-w-[640px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
            An immersive VR experience set inside an abandoned space station. Jack is the maintenance crew left behind the night the ship starts failing. The captain&rsquo;s radio cuts. The lights die. Something else is aboard. Three engineering teammates built the world and the mechanics. I held the story arc, the design philosophy, and the sound.
          </p>
        </header>

        <img
          src="/something-lurking/poster.png"
          alt="Something Lurking comic poster — an astronaut in a green-smeared helmet against a dark starfield, with the title set above."
          loading="eager"
          className="w-full rounded-xl border border-white/[0.08]"
        />

        <MetaBlock
          rows={[
            { label: 'Team', value: 'Eric Cheng Li · Kento Weil · Michael Kim · Md Kashfi Or Rashid Pranta' },
            { label: 'My roles', value: 'Story arc · Design philosophy · Sound · Iteration' },
            { label: 'Stack', value: 'Unity · Blender · Audacity · Eleven Labs · XR Toolkit' },
            { label: 'Context', value: 'Immersive Environments · SFU SIAT · Fall 2025' },
          ]}
        />

        <div className="flex flex-wrap gap-3">
          {LINKS.map((link) => (
            <LinkButton key={link.href} href={link.href}>
              {link.label}
            </LinkButton>
          ))}
        </div>
      </div>
    </section>
  )
}
