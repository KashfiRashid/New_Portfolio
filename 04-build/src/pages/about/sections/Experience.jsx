import { ArchiveBlock, ArchiveRow } from '../primitives.jsx'
import Reveal from '../../../components/Reveal.jsx'

/**
 * Experience - real professional / leadership roles only.
 * [KASH TO CONFIRM] Fitsomnia title + dates; VP dates. Pure ASCII source.
 */
const ROLES = [
  { title: 'Fitsomnia', sub: '', meta: '' },
  { title: 'VP, Communication', sub: "SFU Bangladesh Students' Alliance", meta: '' },
]

export default function Experience() {
  return (
    <ArchiveBlock id="experience" label="experience">
      <Reveal>
        <div>
          {ROLES.map((r, i) => (
            <ArchiveRow key={r.title} {...r} last={i === ROLES.length - 1} />
          ))}
        </div>
      </Reveal>
    </ArchiveBlock>
  )
}
