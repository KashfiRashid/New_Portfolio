import { MetaBlock, LinkButton } from '../primitives.jsx'

const LINKS = [
  { label: 'Devpost ↗', href: 'https://devpost.com/software/forsee' },
  {
    label: 'LinkedIn post ↗',
    href: 'https://www.linkedin.com/posts/kashfi-rashid_goated-team-ugcPost-7435081220029370368-Z3rl/',
  },
  { label: 'Mountain Madness 2026 ↗', href: 'https://csss-mountain-madness-2026.devpost.com/' },
  { label: 'GitHub ↗', href: 'https://github.com/harjotsk03/ForeSee' },
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
            ForeSee
          </h1>
          <p className="max-w-[640px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
            A finance app that organizes spending the way your life actually works. Calendar events feed in, AI predicts what they&rsquo;ll cost, and a voice coach gives data-backed advice in real time. Built in a weekend at Mountain Madness 2026. Won Best Use of ElevenLabs.
          </p>
        </header>

        <MetaBlock
          rows={[
            { label: 'Team', value: 'Harjot Singh · Faaiz Abdullah · Md Kashfi Or Rashid Pranta' },
            { label: 'My Role', value: 'Designer · Voice Coach UI (the emotional bubble)' },
            { label: 'Hackathon', value: 'Mountain Madness 2026 (CSSS × MLH, SFU)' },
            { label: 'Result', value: 'Winner, Best Use of ElevenLabs' },
            { label: 'Stack', value: 'React · TypeScript · Express · Supabase · Gemini · GPT-4o-mini · ElevenLabs' },
            { label: 'Track', value: 'RBC Nomi' },
          ]}
        />

        <div className="flex flex-wrap gap-3">
          {LINKS.map((link) => (
            <LinkButton key={link.href} href={link.href}>
              {link.label}
            </LinkButton>
          ))}
        </div>

        <img
          src="/foresee/hero.png"
          alt="ForeSee — the home page showing the social boards with the voice coach surface."
          loading="eager"
          className="w-full rounded-xl border border-white/[0.08]"
        />
      </div>
    </section>
  )
}
