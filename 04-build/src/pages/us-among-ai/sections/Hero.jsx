import { MetaBlock, LinkButton } from '../primitives.jsx'

const LINKS = [
  { label: 'Devpost \u2197', href: 'https://devpost.com/software/us-among-ai' },
  {
    label: 'LinkedIn post \u2197',
    href: 'https://www.linkedin.com/posts/kashfi-rashid_we-lost-so-bad-oh-wait-april-fools-we-ugcPost-7446434517290070016-NA5V/',
  },
  { label: 'SillyHacks 2026 \u2197', href: 'https://sillyhacks.sfusurge.com/' },
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
            Us Among AI
          </h1>
          <p className="max-w-[640px] font-[family-name:var(--font-sans)] text-lg leading-relaxed text-zinc-300 lg:text-xl">
            A reverse Turing test, built in 12 hours. You play a human trying to pass as a machine. An AI auditor watches every keystroke for anything too human. I led the team that designed, built, and shipped it.
          </p>
        </header>
        <MetaBlock
          rows={[
            { label: 'Team', value: 'Kashfi Pranta, Brett Rodrigues, Tawheed Sarker Aakash, Sadab Khan' },
            { label: 'My Role', value: 'Team Lead \u00b7 Designer \u00b7 Developer' },
            { label: 'Hackathon', value: 'SillyHacks 2026 (SFU Surge \u00d7 MLH)' },
            { label: 'Result', value: 'Winner, Best UI' },
            { label: 'Stack', value: 'Next.js, Zustand, Socket.IO, Gemini API' },
            { label: 'Format', value: 'Browser game \u00b7 built in 12 hours' },
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
          src="/us-among-ai/landing.png"
          alt="Us Among AI title screen: Pretend to be AI"
          loading="lazy"
          className="w-full rounded-xl border border-white/10"
        />
      </div>
    </section>
  )
}
