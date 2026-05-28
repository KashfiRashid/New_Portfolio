import { ArchiveBlock, ArchiveRow } from '../primitives.jsx'
import Reveal from '../../../components/Reveal.jsx'

/**
 * Awards - hackathon wins, confirmed from kash-fact-sheet.md. Each row links
 * to its case study. [KASH TO ADD] other hackathons. Pure ASCII source.
 */
const AWARDS = [
  {
    title: 'MLH Best Use of ElevenLabs',
    sub: 'ForeSee, Mountain Madness 2026 / designer & developer',
    meta: '2026',
    href: '/projects/foresee',
  },
  {
    title: 'Best UI',
    sub: 'Us Among AI, SillyHacks 2026 / reverse Turing-test browser game',
    meta: '2026',
    href: '/projects/us-among-ai',
  },
]

export default function Awards() {
  return (
    <ArchiveBlock id="awards" label="awards">
      <Reveal>
        <div>
          {AWARDS.map((a, i) => (
            <ArchiveRow key={a.title} {...a} last={i === AWARDS.length - 1} />
          ))}
        </div>
      </Reveal>
    </ArchiveBlock>
  )
}
