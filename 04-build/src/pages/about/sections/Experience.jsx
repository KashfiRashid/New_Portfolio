import { ArchiveBlock, ArchiveRow } from '../primitives.jsx'
import Reveal from '../../../components/Reveal.jsx'

/**
 * Experience - structured archive rows. Confirmed from kash-fact-sheet.md.
 * [KASH TO ADD] other roles (fact sheet flags this). Pure ASCII source.
 */
export default function Experience() {
  return (
    <ArchiveBlock id="experience" label="experience">
      <Reveal>
        <div>
          <ArchiveRow
            title="IT Squad Manager"
            sub="Fraser International College / live incident triage, team lead"
            meta="current"
          />
          <p className="font-mono py-4 text-[12px] text-text-faint">
            [ more roles - Kash to add ]
          </p>
        </div>
      </Reveal>
    </ArchiveBlock>
  )
}
