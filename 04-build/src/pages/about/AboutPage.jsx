import { ArchiveBlock, MonoLine } from './primitives.jsx'

import Hero from './sections/Hero.jsx'
import Bio from './sections/Bio.jsx'
import Playground from './sections/Playground.jsx'
import Experience from './sections/Experience.jsx'
import Education from './sections/Education.jsx'
import Awards from './sections/Awards.jsx'
import Contact from './sections/Contact.jsx'

/**
 * AboutPage - /about.  REVISION 7 - full archive rebuild.
 * Caleb Wu / Christina Raganit register: labeled archive blocks, serif
 * (font-display) section labels matching the site, print-frame photo wall.
 *
 * Source is pure ASCII on purpose: the editor's on-save formatter truncates
 * About files that contain em-dashes or Bangla inline. The Bangla phrase and
 * land acknowledgement are unicode escapes; rendered output is identical.
 */
export default function AboutPage() {
  return (
    <main className="relative w-full text-text-primary">
      <Hero />
      <Bio />
      <Playground />
      <Experience />
      <Education />
      <Awards />
      <Contact />
      <PageFoot />
    </main>
  )
}

const BANGLA = '\u09ad\u09be\u09b2\u09cb\u09ac\u09be\u09b8\u09be \u09b8\u09b9'
const LAND = 'Built and lived on the unceded ancestral territories of the x\u02b7m\u0259\u03b8k\u02b7\u0259y\u0313\u0259m (Musqueam), S\u1e35wx\u0331w\u00fa7mesh (Squamish), and S\u0259lilw\u0259ta\u026c (Tsleil-Waututh) Nations.'
const SIGNATURE = 'designed & built by Kashfi Rashid \u2014 in Antigravity, Stitch, Figma & Claude.'

function PageFoot() {
  return (
    <ArchiveBlock id="about-foot" label="" className="pt-4 pb-24">
      <div className="border-t pt-10" style={{ borderColor: 'rgba(232,230,225,0.12)' }}>
        <p className="font-bangla text-[18px] italic text-text-primary">
          {BANGLA}{' '}
          <span className="font-sans not-italic text-[13px] text-text-muted">(with love)</span>
        </p>

        <p className="font-sans mt-8 max-w-[560px] text-[12px] leading-[1.6] text-text-muted">
          {LAND}
        </p>

        <MonoLine size="xs" className="mt-6 text-text-faint">{SIGNATURE}</MonoLine>
        <MonoLine size="xs" className="mt-2 text-text-faint">
          v1, May 2026. v2 ships May 2027.
        </MonoLine>
      </div>
    </ArchiveBlock>
  )
}
