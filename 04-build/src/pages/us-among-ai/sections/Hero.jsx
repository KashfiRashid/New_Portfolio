import { MetaBlock } from '../primitives.jsx'

const LINKS = [
  { label: 'Devpost ↗', href: 'https://devpost.com/software/us-among-ai' },
  {
    label: 'LinkedIn post ↗',
    href: 'https://www.linkedin.com/posts/kashfi-rashid_we-lost-so-bad-oh-wait-april-fools-we-ugcPost-7446434517290070016-NA5V/',
  },
  { label: 'SillyHacks 2026 ↗', href: 'https://sillyhacks-2026.devpost.com/' },
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
            A reverse Turing test, built in 12 hours. You play a human trying to pass as a machine — while an AI auditor watches every keystroke for anything too human. I led the team that designed, built, and shipped it.
          </p>
        </header>
        <MetaBlock
          rows={[
            { label: 'Team', value: 'Kashfi Pranta, Brett Rodrigues, Tawheed Sarker Aakash, Sadab Khan' },
            { label: 'My Role', value: 'Team Lead · Designer · Developer' },
            { label: 'Hackathon', value: 'SillyHacks 2026 (SFU Surge × MLH)' },
            { label: 'Result', value: 'Winner — Best UI' },
            { label: 'Stack', value: 'Next.js, Zustand, Socket.IO, Gemini API' },
            { label: 'Format', value: 'Browser game · built in 12 hours' },
          ]}
        />
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[#3DE8B0] transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
        <img
          src="/us-among-ai/landing.png"
          alt="Us Among AI — the title screen: Pretend to be AI"
          loading="lazy"
          className="w-full rounded-xl border border-white/10"
        />
      </div>
    </section>
  )
}
