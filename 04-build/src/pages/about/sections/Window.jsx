import {
  WideShell,
  CopyPlaceholder,
} from '../primitives.jsx'

/**
 * Window - the intro block.
 *
 * REVISION 3 - the Dhaka -> Delta migration narrative is stripped out
 * entirely per Kash's instruction. The block title is also gone; the
 * portrait + "Hi, I'm Kashfi." caption carries the section opener on
 * its own. The two-windows pixel-art placeholder (which was tied to
 * the migration metaphor) is removed.
 *
 * Entry image is portrait.png (the close headshot Kash provided), per
 * his explicit pick.
 *
 * Body copy is left as a visible placeholder - the rule of "no
 * fabricated copy" from the original brief still applies, and now
 * doubly so because the previous seed copy referenced material the
 * page is no longer telling.
 */
export default function Window() {
  return (
    <WideShell id="window">
      {/* PORTRAIT - the section anchor. No title; the photo and its
          caption are the title. */}
      <figure className="mx-auto mb-12 w-full max-w-[360px]">
        <div
          className="relative w-full"
          style={{
            backgroundColor: 'rgba(232,230,225,0.04)',
            border: '1px solid rgba(232,184,106,0.2)',
            padding: '6px',
          }}
        >
          <img
            src="/about/portrait.png"
            alt="Portrait of Kashfi."
            loading="eager"
            decoding="async"
            className="block h-auto w-full"
          />
        </div>
        <figcaption className="font-display mt-4 text-center text-[18px] italic text-text-primary md:text-[20px]">
          Hi, I&apos;m Kashfi.
        </figcaption>
      </figure>

      {/* Intro copy - Kash to write. Two sentences max. Anything he
          wants the reader to know up top that is not autobiography. */}
      <div className="mx-auto max-w-[680px]">
        <CopyPlaceholder
          targetWords="two short sentences"
          note="Intro copy for the top of the page. Kash to write \u2014 no constraints from the previous brief. Anything you want the reader to know up top before the desk / work / wall / door blocks land."
        />
      </div>
    </WideShell>
  )
}
