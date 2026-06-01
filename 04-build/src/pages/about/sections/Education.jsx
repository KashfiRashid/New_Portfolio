import { ArchiveBlock, ArchiveRow } from '../primitives.jsx'
import Reveal from '../../../components/Reveal.jsx'

/**
 * Education - single confirmed row from kash-fact-sheet.md. Degree letter
 * not on the fact sheet, so the title stays neutral. Pure ASCII source.
 */
export default function Education() {
  return (
    <ArchiveBlock id="education" label="education">
      <Reveal>
        <ArchiveRow
          title="BSc, Interactive Arts & Technology (SIAT)"
          sub="Simon Fraser University / class of 2026"
          meta="2026"
          last
        />
      </Reveal>
    </ArchiveBlock>
  )
}
