import { ArchiveBlock, ArchiveRow } from '../primitives.jsx'
import Reveal from '../../../components/Reveal.jsx'

/**
 * Awards - hackathon wins + the FIC community-engagement scholarship.
 * [KASH TO CONFIRM] exact scholarship name + year. Pure ASCII source.
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
  {
    title: 'Best Hardware',
    sub: 'ASL Express, StormHacks 2025 / front-end + computer vision',
    meta: '2025',
    href: '/projects/asl-express',
  },
  {
    title: 'Community Engagement Scholarship',
    sub: 'Fraser International College',
    meta: '',
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
