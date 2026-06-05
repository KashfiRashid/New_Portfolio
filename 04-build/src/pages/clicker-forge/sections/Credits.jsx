import { SectionHead, LinkButton } from '../primitives.jsx'

const LINKS = [
  { label: 'SIAT showcase', href: 'https://www.sfu.ca/siat/showcase/summer-2024-project-showcase/iat-265-clicker-forge.html' },
  { label: 'Watch the demo', href: 'https://www.youtube.com/watch?v=L6NHnHL4Y3Q' },
]

const COLS = [
  { label: 'Made by', lines: ['Md Kashfi Or Rashid (solo)', 'Concept, art, code, sound'] },
  { label: 'Built with', lines: ['Java (java.awt Graphics2D)', 'Processing core: PVector + noise', 'Minim audio', 'Figma for all sprites'] },
  { label: 'Sound', lines: ['Boiling metal + fire: self recorded', 'SFX: pond5, Pixabay, Minecraft wiki', 'Music: licensed game soundtracks', 'All sources credited in the readme'] },
]

export default function Credits() {
  return (
    <section id="credits" className="scroll-mt-28 border-t border-white/[0.06] py-16 lg:py-24">
      <SectionHead kicker="Credits" title="Built by hand, end to end" />
      <div className="grid gap-8 border border-white/[0.08] bg-white/[0.02] p-8 md:grid-cols-3">
        {COLS.map((c) => (
          <div key={c.label}>
            <p className="mb-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[#C8A24B]">{c.label}</p>
            <ul className="space-y-1.5 font-[family-name:var(--font-sans)] text-sm leading-relaxed text-zinc-300">
              {c.lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        {LINKS.map((link) => (
          <LinkButton key={link.href} href={link.href}>{link.label}</LinkButton>
        ))}
      </div>
    </section>
  )
}
// end Credits.jsx
