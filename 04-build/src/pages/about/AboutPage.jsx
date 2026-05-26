import {
  BlockShell,
  MonoLine,
  ABOUT_INK,
} from './primitives.jsx'

import Hero from './sections/Hero.jsx'
import Window from './sections/Window.jsx'
import Desk from './sections/Desk.jsx'
import Library from './sections/Library.jsx'
import Door from './sections/Door.jsx'
import Currently from './sections/Currently.jsx'
import Close from './sections/Close.jsx'

/**
 * AboutPage — /about.
 *
 * Register: matches the rest of the 2am studio dark site. Fonts now
 * use the site's tailwind families (font-display / font-sans / font-mono)
 * so headlines + body + mono read consistent with the homepage and
 * case studies.
 *
 * Block list:
 *   Hero       full-viewport tinted scene-working.mp4
 *   Window     portrait.png intro (no migration narrative)
 *   Desk       design-engineer claim + three named ships
 *   Library    Library of People (text-only)
 *   Door       prose + 10-photo bento wall
 *   Currently  four mono "currently" lines
 *   Close      under 40 words + one quiet /resume.pdf link
 *   PageFoot   Bangla phrase + land acknowledgement + build-by line
 */
export default function AboutPage() {
  return (
    <main className="relative w-full text-text-primary">
      <Hero />
      <Window />
      <Desk />
      <Library />
      <Door />
      <Currently />
      <Close />
      <PageFoot />
    </main>
  )
}

/**
 * PageFoot — Bangla phrase + land acknowledgement + build-by line.
 * Uses the site's font-bangla for the Bangla phrase and font-sans
 * (Inter) for everything else.
 */
function PageFoot() {
  return (
    <BlockShell id="about-foot" className="pt-4 pb-24">
      <div
        className="border-t pt-10"
        style={{ borderColor: 'rgba(232,230,225,0.12)' }}
      >
        <p className="font-bangla text-[18px] italic text-text-primary">
          ভালোবাসা সহ{' '}
          <span className="font-sans not-italic text-[13px] text-text-muted">
            (with love)
          </span>
        </p>

        <p className="font-sans mt-8 max-w-[560px] text-[12px] leading-[1.6] text-text-muted">
          Built and lived on the unceded ancestral territories of the
          xʷməθkʷəy̓əm (Musqueam), Sḵwx̱wú7mesh (Squamish), and
          Səlilwətaɬ (Tsleil-Waututh) Nations.
        </p>

        <MonoLine size="xs" className="mt-6">
          v1, May 2026. v2 ships May 2027.
        </MonoLine>
      </div>
    </BlockShell>
  )
}
